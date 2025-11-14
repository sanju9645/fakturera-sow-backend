import { join } from 'path';
import { query } from '../config/db.js';
import { readFile } from './utils.js';
import {
  generateQueryHash,
  checkQueryHashExists,
  saveQueryHash
} from './ops/db-migrations.js';

/**
 * Read migration file content
 */
export function migrationReadFile(filePath) {
  try {
    return readFile(filePath);
  } catch (error) {
    console.error(`Error reading migration file: ${error.message}`);
    throw error;
  }
}

/**
 * Get migration file path
 */
export function migrationGetPath(__dirname, fileName = 'schema.sql') {
  return join(__dirname, '..', 'migrations', fileName);
}

/**
 * Clean SQL content by removing comments and empty lines
 */
export function migrationCleanSql(sqlContent) {
  return sqlContent
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      // Remove comment-only lines and empty lines
      return trimmed.length > 0 && !trimmed.startsWith('--');
    })
    .join('\n');
}

/**
 * Extract operation name from SQL statement for logging
 */
export function migrationExtractOperationName(statement) {
  const upperStatement = statement.toUpperCase().trim();
  
  if (upperStatement.startsWith('CREATE TABLE')) {
    const match = statement.match(/CREATE TABLE\s+(?:IF NOT EXISTS\s+)?(\w+)/i);
    return match ? `Created table: ${match[1]}` : 'Created table';
  } else if (upperStatement.startsWith('CREATE INDEX')) {
    const match = statement.match(/CREATE INDEX\s+(?:IF NOT EXISTS\s+)?(\w+)/i);
    return match ? `Created index: ${match[1]}` : 'Created index';
  } else if (upperStatement.startsWith('CREATE EXTENSION')) {
    const match = statement.match(/CREATE EXTENSION\s+(?:IF NOT EXISTS\s+)?["']?(\w+)["']?/i);
    return match ? `Created extension: ${match[1]}` : 'Created extension';
  } else if (upperStatement.startsWith('INSERT INTO')) {
    const match = statement.match(/INSERT INTO\s+(\w+)/i);
    return match ? `Inserted data into: ${match[1]}` : 'Inserted data';
  }
  
  return 'Executed statement';
}

/**
 * Split SQL content into individual statements
 * Handles multi-line statements and preserves quoted strings (including dollar-quoting)
 */
export function migrationSplitStatements(cleanedSql) {
  const statements = [];
  let currentStatement = '';
  let inQuotes = false;
  let quoteChar = null;
  let inDollarQuote = false;
  let dollarTag = null;
  let dollarTagBuffer = '';

  for (let i = 0; i < cleanedSql.length; i++) {
    const char = cleanedSql[i];
    const prevChar = i > 0 ? cleanedSql[i - 1] : '';

    // Handle dollar-quoting (e.g., $tag$...$tag$)
    if (char === '$' && !inQuotes) {
      if (!inDollarQuote) {
        // Start of dollar quote - collect the tag
        dollarTagBuffer = '$';
        let j = i + 1;
        while (j < cleanedSql.length && cleanedSql[j] !== '$') {
          dollarTagBuffer += cleanedSql[j];
          j++;
        }
        if (j < cleanedSql.length && cleanedSql[j] === '$') {
          dollarTagBuffer += '$';
          dollarTag = dollarTagBuffer;
          inDollarQuote = true;
          // Add the opening tag to current statement
          currentStatement += dollarTagBuffer;
          i = j; // Skip ahead - the closing $ will be handled in next iteration
          continue;
        }
      } else {
        // We're in a dollar quote and see a $ - check if it's the closing tag
        let potentialTag = '$';
        let j = i + 1;
        // Read characters until we hit $ or exceed tag length
        while (j < cleanedSql.length && cleanedSql[j] !== '$' && potentialTag.length < dollarTag.length) {
          potentialTag += cleanedSql[j];
          j++;
        }
        if (j < cleanedSql.length && cleanedSql[j] === '$') {
          potentialTag += '$';
          if (potentialTag === dollarTag) {
            // Found closing tag - add it and exit dollar quote mode
            currentStatement += potentialTag;
            inDollarQuote = false;
            dollarTag = null;
            dollarTagBuffer = '';
            i = j; // Skip ahead - we've already added the closing tag
            continue;
          }
        }
      }
    }

    // Handle regular quotes (only if not in dollar quote)
    if (!inDollarQuote && (char === '"' || char === "'") && prevChar !== '\\') {
      if (!inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar) {
        inQuotes = false;
        quoteChar = null;
      }
    }

    currentStatement += char;

    // If we hit a semicolon and we're not in quotes or dollar quotes, it's the end of a statement
    if (char === ';' && !inQuotes && !inDollarQuote) {
      const trimmed = currentStatement.trim();
      if (trimmed.length > 0) {
        statements.push(trimmed);
      }
      currentStatement = '';
    }
  }

  // Add any remaining statement
  if (currentStatement.trim().length > 0) {
    statements.push(currentStatement.trim());
  }

  return statements;
}

/**
 * Execute SQL statements with duplicate prevention
 */
export async function migrationExecute(statements) {
  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  console.log(`Found ${statements.length} SQL statements to execute\n`);

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    
    if (!statement || statement.trim().length === 0) {
      continue;
    }
    const queryHash = generateQueryHash(statement);
    const alreadyExecuted = await checkQueryHashExists(queryHash);
    
    if (alreadyExecuted) {
      skippedCount++;
      const operation = migrationExtractOperationName(statement);
      console.log(`${operation} (already executed, skipping)`);
      continue;
    }

    try {
      await query(statement);
      successCount++;
      
      await saveQueryHash(statement, queryHash, null);
      
      const operation = migrationExtractOperationName(statement);
      console.log(`${operation}`);
    } catch (error) {
      errorCount++;
      
      // Store failed execution in db_migrations with error message
      await saveQueryHash(statement, queryHash, error.message);
      
      if (error.message.includes('already exists') || 
          error.message.includes('duplicate') ||
          error.code === '42P07' || // duplicate_table
          error.code === '42P16') { // duplicate_object
        const operation = migrationExtractOperationName(statement);
        console.log(`${operation} (already exists, skipping)`);
      } else {
        console.error(`Error executing statement ${i + 1}:`, error.message);
        console.error(`Statement: ${statement.substring(0, 150)}...`);
      }
    }
  }

  return {
    successCount,
    skippedCount,
    errorCount,
    total: statements.length
  };
}

/**
 * Verify that tables were created
 * @returns {Promise<string[]>} Array of table names
 */
export async function migrationVerifyTables() {
  try {
    const result = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);
    
    return result.rows.map(row => row.table_name);
  } catch (error) {
    console.error('Error verifying tables:', error.message);
    return [];
  }
}

/**
 * Print migration summary
 * @param {Object} summary - Summary object with counts
 */
export function migrationPrintSummary(summary) {
  console.log('\n' + '='.repeat(50));
  console.log('Migration Summary:');
  console.log(`Successful: ${summary.successCount}`);
  console.log(`Skipped (already executed): ${summary.skippedCount}`);
  console.log(`Errors: ${summary.errorCount}`);
  console.log('='.repeat(50));
}

/**
 * Print table verification results
 * @param {string[]} tables - Array of table names
 */
export function migrationPrintVerification(tables) {
  console.log('\nVerifying tables...');
  
  if (tables.length > 0) {
    console.log('Tables created successfully:');
    tables.forEach(table => {
      console.log(`   - ${table}`);
    });
  } else {
    console.log('No tables found. Please check the migration file.');
  }
}

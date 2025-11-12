/**
 * Script to create database tables for fakturera-sow
 * 
 * This script reads the schema.sql file and executes it to create
 * all necessary tables in the PostgreSQL database.
 * 
 * Usage:
 *   node src/tools/create-tables.js
 */

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

import { connectDatabase } from '../config/db.js';
import { ensureDbTweaksTable } from '../lib/ops/db-migrations.js';
import {
  migrationReadFile,
  migrationCleanSql,
  migrationGetPath,
  migrationSplitStatements,
  migrationExecute,
  migrationVerifyTables,
  migrationPrintSummary,
  migrationPrintVerification
} from '../lib/migrations.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Main execution
console.log('Starting table creation...\n');
console.log('Connecting to database...');
await connectDatabase();

await ensureDbTweaksTable();

// Read migration file
const migrationPath = migrationGetPath(__dirname, 'schema.sql');
console.log(`Reading migration file: ${migrationPath}`);
const sqlContent = migrationReadFile(migrationPath);

// Clean SQL content
const cleanedSql = migrationCleanSql(sqlContent);

// Split into statements
const statements = migrationSplitStatements(cleanedSql);

// Execute migrations
const summary = await migrationExecute(statements);

// Print summary
migrationPrintSummary(summary);

// Verify tables were created
const tables = await migrationVerifyTables();
migrationPrintVerification(tables);

console.log('\nTable creation completed!');
process.exit(0);
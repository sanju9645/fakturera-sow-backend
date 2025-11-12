/**
 * Script to run database migrations for fakturera-sow
 * 
 * This script executes schema.sql first to create tables,
 * then executes tweaks.sql to apply seed data and updates.
 * 
 * Usage:
 *   node src/tools/run-tweaks.js
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
console.log('Starting database migrations...\n');
console.log('Connecting to database...');
await connectDatabase();

await ensureDbTweaksTable();

// ============================================
// Step 1: Execute schema.sql
// ============================================
console.log('\n' + '='.repeat(50));
console.log('Step 1: Creating database schema...');
console.log('='.repeat(50));

const schemaPath = migrationGetPath(__dirname, 'schema.sql');
console.log(`Reading schema file: ${schemaPath}`);
const schemaContent = migrationReadFile(schemaPath);

const cleanedSchema = migrationCleanSql(schemaContent);
const schemaStatements = migrationSplitStatements(cleanedSchema);

const schemaSummary = await migrationExecute(schemaStatements);
migrationPrintSummary(schemaSummary);

// ============================================
// Step 2: Execute tweaks.sql
// ============================================
console.log('\n' + '='.repeat(50));
console.log('Step 2: Applying database tweaks...');
console.log('='.repeat(50));

const tweaksPath = migrationGetPath(__dirname, 'tweaks.sql');
console.log(`Reading tweaks file: ${tweaksPath}`);
const tweaksContent = migrationReadFile(tweaksPath);

const cleanedTweaks = migrationCleanSql(tweaksContent);
const tweaksStatements = migrationSplitStatements(cleanedTweaks);

const tweaksSummary = await migrationExecute(tweaksStatements);
migrationPrintSummary(tweaksSummary);

// ============================================
// Final Summary
// ============================================
console.log('\n' + '='.repeat(50));
console.log('Overall Migration Summary:');
console.log('='.repeat(50));
console.log(`Schema - Successful: ${schemaSummary.successCount}, Skipped: ${schemaSummary.skippedCount}, Errors: ${schemaSummary.errorCount}`);
console.log(`Tweaks - Successful: ${tweaksSummary.successCount}, Skipped: ${tweaksSummary.skippedCount}, Errors: ${tweaksSummary.errorCount}`);
console.log('='.repeat(50));

// Verify tables were created
const tables = await migrationVerifyTables();
migrationPrintVerification(tables);

console.log('\nDatabase migrations completed!');
process.exit(0);


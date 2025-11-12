import { readFileSync } from 'fs';

export function readFile(filePath, encoding = 'utf8') {
  try {
    return readFileSync(filePath, encoding);
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    throw error;
  }
}

// scripts/buildMegaBank.js
// Runs the verified 1,500 High-Yield Authenticated Question Vault Generator
import { execSync } from 'child_process';
import path from 'path';

console.log('Generating 1,500 High-Yield CPNS Questions with Authentic Vault Data...');

const scriptPath = path.resolve('scripts/build_complete_mega_vault.py');
execSync(`python3 "${scriptPath}"`, { stdio: 'inherit' });

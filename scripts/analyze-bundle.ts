#!/usr/bin/env bun

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function analyzeBundle() {
  console.log('🔍 Starting bundle analysis...\n');
  
  try {
    // Set the ANALYZE environment variable and run the build
    const { stdout, stderr } = await execAsync('ANALYZE=true bun run build', {
      env: { ...process.env, ANALYZE: 'true' }
    });
    
    if (stderr) {
      console.error('Build warnings/errors:', stderr);
    }
    
    console.log(stdout);
    console.log('\n✅ Bundle analysis complete! Check the generated report in your browser.');
  } catch (error) {
    console.error('❌ Bundle analysis failed:', error);
    process.exit(1);
  }
}

analyzeBundle();
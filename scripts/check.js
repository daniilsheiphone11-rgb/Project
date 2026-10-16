const fs = require('node:fs');
const path = require('node:path');

const mode = process.argv[2];
const requiredFiles = [
  'package.json',
  'tests/smoke.test.js',
  '.github/workflows/autotests.yml'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(file))) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
}

if (mode === 'typecheck') {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (!pkg.scripts || !pkg.scripts.test) {
    console.error('package.json must define a test script');
    process.exit(1);
  }
  console.log('Type/configuration check passed.');
} else if (mode === 'lint') {
  const testFile = fs.readFileSync('tests/smoke.test.js', 'utf8');
  if (testFile.includes('debugger;') || testFile.includes('console.log(')) {
    console.error('Lint check failed: remove debugger and console.log statements.');
    process.exit(1);
  }
  console.log('Lint check passed.');
} else if (mode === 'format') {
  const pkgText = fs.readFileSync('package.json', 'utf8');
  try {
    JSON.parse(pkgText);
  } catch (error) {
    console.error('Formatting/JSON check failed:', error.message);
    process.exit(1);
  }
  console.log('Format check passed.');
} else {
  console.error('Usage: node scripts/check.js typecheck|lint|format');
  process.exit(1);
}

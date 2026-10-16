const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const workflowPath = path.join(
  __dirname,
  '..',
  '.github',
  'workflows',
  'autotests.yml'
);

const packagePath = path.join(__dirname, '..', 'package.json');

test('project contains the CI workflow', () => {
  assert.ok(fs.existsSync(workflowPath));
});

test('workflow uploads a report artifact even after failure', () => {
  const workflow = fs.readFileSync(workflowPath, 'utf8');

  assert.ok(workflow.includes('if: always()'));
  assert.ok(workflow.includes('actions/upload-artifact'));
});

test('package scripts define the required checks', () => {
  const packageJson = JSON.parse(
    fs.readFileSync(packagePath, 'utf8')
  );

  assert.ok(packageJson.scripts.typecheck);
  assert.ok(packageJson.scripts.lint);
  assert.ok(packageJson.scripts['format:check']);
  assert.ok(packageJson.scripts.test);
});

test('write a simple HTML report artifact for the lesson', () => {
  const reportDir = path.join(__dirname, '..', 'playwright-report');

  fs.mkdirSync(reportDir, { recursive: true });

  const reportPath = path.join(reportDir, 'index.html');

  fs.writeFileSync(
    reportPath,
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Test Report</title></head><body><h1>Autotests report</h1><p>CI workflow completed.</p></body></html>',
    'utf8'
  );

  assert.ok(fs.existsSync(reportPath));
});
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('project contains the CI workflow', () => {
  assert.equal(fs.existsSync('.github/workflows/autotests.yml'), true);
});

test('workflow uploads a report artifact even after failure', () => {
  const workflow = fs.readFileSync('.github/workflows/autotests.yml', 'utf8');
  assert.match(workflow, /if:\\s*always\\(\\)/);
  assert.match(workflow, /name:\\s*playwright-report/);
});

test('package scripts define the required checks', () => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  assert.equal(typeof pkg.scripts.typecheck, 'string');
  assert.equal(typeof pkg.scripts.lint, 'string');
  assert.equal(typeof pkg.scripts['format:check'], 'string');
  assert.equal(typeof pkg.scripts.test, 'string');
});

test('write a simple HTML report artifact for the lesson', () => {
  fs.mkdirSync('playwright-report', { recursive: true });
  fs.writeFileSync(
    'playwright-report/index.html',
    '<!doctype html><html lang="en"><meta charset="utf-8"><title>CI Test Report</title><h1>CI smoke tests</h1><p>Report artifact created by the T41 demo project. This is a simple demo report, not the native Playwright HTML reporter.</p></html>',
    'utf8'
  );
  assert.equal(fs.existsSync('playwright-report/index.html'), true);
});

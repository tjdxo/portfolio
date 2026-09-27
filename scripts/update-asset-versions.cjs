// Run after editing CSS or JavaScript, before committing a deployment.
const { readFileSync, writeFileSync } = require('node:fs');
const { createHash } = require('node:crypto');
const { resolve } = require('node:path');

const root = resolve(__dirname, '..');
const htmlPath = resolve(root, 'index.html');
let html = readFileSync(htmlPath, 'utf8');
for (const asset of ['css/style.css', 'js/main.js']) {
  // Normalize line endings so Windows and GitHub produce the same version.
  const content = readFileSync(resolve(root, asset), 'utf8').replace(/\r\n/g, '\n');
  const version = createHash('sha256').update(content).digest('hex').slice(0, 12);
  const escaped = asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  html = html.replace(new RegExp(`\\./${escaped}(?:\\?v=[a-zA-Z0-9-]+)?`, 'g'), `./${asset}?v=${version}`);
  console.log(`${asset}: ${version}`);
}
writeFileSync(htmlPath, html);

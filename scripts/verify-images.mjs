import fs from 'fs';
import path from 'path';

function getFiles(dir, exts) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.next')) {
        results = results.concat(getFiles(fullPath, exts));
      }
    } else {
      if (exts.some(e => fullPath.endsWith(e))) results.push(fullPath);
    }
  }
  return results;
}

const dirsToScan = ['app', 'components', 'lib'];
let allFiles = [];
for (const d of dirsToScan) {
  if (fs.existsSync(d)) {
    allFiles = allFiles.concat(getFiles(d, ['.tsx', '.ts']));
  }
}

const imgRegex = /['"](\/(content-media|images)\/[^'"]+\.(webp|png|jpe?g))['"]/g;

let found = 0;
let missing = 0;
let nonWebp = 0;

for (const f of allFiles) {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    found++;
    const relPath = match[1];
    const absPath = path.join(process.cwd(), 'public', relPath);
    if (!fs.existsSync(absPath)) {
      console.error(`MISSING FILE: ${relPath} in ${f}`);
      missing++;
    } else {
      if (!relPath.endsWith('.webp')) {
        console.warn(`NON-WEBP IMAGE: ${relPath} in ${f}`);
        nonWebp++;
      }
    }
  }
}

console.log(`\n=== Verification Results ===`);
console.log(`Total image references found: ${found}`);
console.log(`Missing files: ${missing}`);
console.log(`Non-WebP references: ${nonWebp}`);
if (missing === 0 && nonWebp === 0) {
  console.log(`All images exist and are in WebP format!`);
}

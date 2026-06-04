const fs = require('fs');
const path = require('path');

const projectRoot = 'C:/Users/zazad/.gemini/antigravity/scratch/kamnuan-com';
const missingDir = path.join(projectRoot, 'scratch/missing_calcs');
const destCalcsDir = path.join(projectRoot, 'components/calcs');
const destDataDir = path.join(projectRoot, 'lib/data');

const files = fs.readdirSync(missingDir);

let copiedTsx = 0;
let copiedJson = 0;

for (const file of files) {
  const srcPath = path.join(missingDir, file);
  const fileExt = path.extname(file);
  const baseName = path.basename(file, fileExt);

  if (fileExt === '.tsx') {
    const destPath = path.join(destCalcsDir, file);
    fs.copyFileSync(srcPath, destPath);
    copiedTsx++;
  } else if (fileExt === '.json') {
    const destPath = path.join(destDataDir, file);
    fs.copyFileSync(srcPath, destPath);
    copiedJson++;
  }
}
console.log(`Copied ${copiedTsx} TSX files and ${copiedJson} JSON files.`);

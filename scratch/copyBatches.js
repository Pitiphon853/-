const fs = require('fs');
const path = require('path');

const projectRoot = 'C:/Users/zazad/.gemini/antigravity/scratch/kamnuan-com';
const scratchDir = path.join(projectRoot, 'scratch');
const destCalcsDir = path.join(projectRoot, 'components/calcs');
const destDataDir = path.join(projectRoot, 'lib/data');

// Create directories if they don't exist
if (!fs.existsSync(destCalcsDir)) fs.mkdirSync(destCalcsDir, { recursive: true });
if (!fs.existsSync(destDataDir)) fs.mkdirSync(destDataDir, { recursive: true });

// Loop through batches 17 to 26
for (let batch = 17; batch <= 26; batch++) {
    const batchFolder = path.join(scratchDir, `calcs_batch_${batch}`);
    if (!fs.existsSync(batchFolder)) {
        console.log(`Folder for batch ${batch} does not exist at ${batchFolder}`);
        continue;
    }

    const files = fs.readdirSync(batchFolder);
    let copiedTsx = 0;
    let copiedJson = 0;

    for (const file of files) {
        const srcPath = path.join(batchFolder, file);
        const fileExt = path.extname(file);
        const baseName = path.basename(file, fileExt);

        if (fileExt === '.tsx') {
            // Rename to match the naming convention: calcs_batch_XX_name.tsx
            const newName = `calcs_batch_${batch}_${baseName}.tsx`;
            const destPath = path.join(destCalcsDir, newName);
            fs.copyFileSync(srcPath, destPath);
            copiedTsx++;
        } else if (fileExt === '.json') {
            // Rename to match the naming convention: calcs_batch_XX_name.json
            const newName = `calcs_batch_${batch}_${baseName}.json`;
            const destPath = path.join(destDataDir, newName);
            fs.copyFileSync(srcPath, destPath);
            copiedJson++;
        }
    }
    console.log(`Batch ${batch}: Copied ${copiedTsx} TSX files and ${copiedJson} JSON files.`);
}

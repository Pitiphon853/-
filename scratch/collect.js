const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\zazad\\.gemini\\antigravity\\brain';
const destTsx = 'C:\\Users\\zazad\\.gemini\\antigravity\\scratch\\kamnuan-com\\components\\calcs';
const destJson = 'C:\\Users\\zazad\\.gemini\\antigravity\\scratch\\kamnuan-com\\lib\\data';

if (!fs.existsSync(destTsx)) fs.mkdirSync(destTsx, { recursive: true });
if (!fs.existsSync(destJson)) fs.mkdirSync(destJson, { recursive: true });

function copyFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            copyFiles(fullPath);
        } else if (fullPath.includes('calcs_batch_') && !fullPath.includes('node_modules')) {
            if (fullPath.endsWith('.tsx')) {
                const target = path.join(destTsx, path.basename(path.dirname(fullPath)) + '_' + item);
                fs.copyFileSync(fullPath, target);
                console.log(`Copied: ${target}`);
            } else if (fullPath.endsWith('.json') && !item.includes('transcript')) {
                const target = path.join(destJson, path.basename(path.dirname(fullPath)) + '_' + item);
                fs.copyFileSync(fullPath, target);
                console.log(`Copied: ${target}`);
            }
        }
    }
}

copyFiles(brainDir);

const fs = require('fs');
const path = require('path');

const calcsDir = 'C:\\Users\\zazad\\.gemini\\antigravity\\scratch\\kamnuan-com\\components\\calcs';
const batchFiles = fs.readdirSync(calcsDir).filter(f => f.startsWith('calcs_batch_') && f.endsWith('.tsx'));

for (const file of batchFiles) {
    const filePath = path.join(calcsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix component declarations to accept `{ lang }: any`
    content = content.replace(/function (\w+)\(\s*\)/g, 'function $1({ lang }: any)');
    content = content.replace(/const (\w+)\s*=\s*\(\s*\)\s*=>/g, 'const $1 = ({ lang }: any) =>');
    
    fs.writeFileSync(filePath, content);
}

console.log("Fixed missing lang props aggressively.");

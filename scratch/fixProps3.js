const fs = require('fs');
const path = require('path');

const calcsDir = 'C:\\Users\\zazad\\.gemini\\antigravity\\scratch\\kamnuan-com\\components\\calcs';
const batchFiles = fs.readdirSync(calcsDir).filter(f => f.startsWith('calcs_batch_') && f.endsWith('.tsx'));

for (const file of batchFiles) {
    if (file === 'calcs_batch_1_Batch1.tsx') continue;
    const filePath = path.join(calcsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // ONLY replace export default function ... () or export function ... ()
    content = content.replace(/export default function (\w+)\(\s*\)/g, 'export default function $1({ lang }: any)');
    content = content.replace(/export function (\w+)\(\s*\)/g, 'export function $1({ lang }: any)');
    content = content.replace(/export const (\w+)\s*=\s*\(\s*\)\s*=>/g, 'export const $1 = ({ lang }: any) =>');
    content = content.replace(/export default const (\w+)\s*=\s*\(\s*\)\s*=>/g, 'export default const $1 = ({ lang }: any) =>');
    
    // Some might have export default ComponentName at the bottom. We need to find `function ComponentName()`
    // We can just find what's exported.
    let exportedComponent = null;
    let match = content.match(/export default (\w+);/);
    if (match) {
        exportedComponent = match[1];
        // Now replace `function ExportedComponent()` or `const ExportedComponent = () =>`
        const regex1 = new RegExp(`function ${exportedComponent}\\(\\s*\\)`);
        const regex2 = new RegExp(`const ${exportedComponent}\\s*=\\s*\\(\\s*\\)\\s*=>`);
        
        content = content.replace(regex1, `function ${exportedComponent}({ lang }: any)`);
        content = content.replace(regex2, `const ${exportedComponent} = ({ lang }: any) =>`);
    }

    fs.writeFileSync(filePath, content);
}

console.log("Safely fixed missing lang props on EXPORTED components only.");

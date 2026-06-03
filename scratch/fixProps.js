const fs = require('fs');
const path = require('path');

const calcsDir = 'C:\\Users\\zazad\\.gemini\\antigravity\\scratch\\kamnuan-com\\components\\calcs';
const batchFiles = fs.readdirSync(calcsDir).filter(f => f.startsWith('calcs_batch_') && f.endsWith('.tsx'));

for (const file of batchFiles) {
    const filePath = path.join(calcsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix component declarations to accept `{ lang }: any`
    content = content.replace(/export default function (\w+)\(\s*\)/g, 'export default function $1({ lang }: any)');
    content = content.replace(/export function (\w+)\(\s*\)/g, 'export function $1({ lang }: any)');
    content = content.replace(/export const (\w+)\s*=\s*\(\s*\)\s*=>/g, 'export const $1 = ({ lang }: any) =>');
    
    // Some might have `({ lang }: { lang: string })` or something already, which is fine.
    // Some might have `(props)` or `{ lang }` but no type. The ones that failed probably had empty `()`.
    
    fs.writeFileSync(filePath, content);
}

console.log("Fixed missing lang props.");

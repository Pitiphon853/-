const fs = require('fs');
const path = require('path');

const scratchDir = 'C:\\Users\\zazad\\.gemini\\antigravity\\scratch\\kamnuan-com\\scratch';
const dirs = fs.readdirSync(scratchDir).filter(f => f.startsWith('calcs_batch_') && fs.statSync(path.join(scratchDir, f)).isDirectory());

for (const d of dirs) {
  const dirPath = path.join(scratchDir, d);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx'));
  for (const f of files) {
    let content = fs.readFileSync(path.join(dirPath, f), 'utf8');
    let orig = content;
    
    // Fix function declarations
    content = content.replace(/export default function (\w+)\(\s*\)/g, 'export default function $1({ lang }: { lang?: any })');
    content = content.replace(/export function (\w+)\(\s*\)/g, 'export function $1({ lang }: { lang?: any })');
    content = content.replace(/export const (\w+)\s*=\s*\(\s*\)\s*=>/g, 'export const $1 = ({ lang }: { lang?: any }) =>');
    
    // Fix SEOFAQ
    content = content.replace(/<SEOFAQ>/g, '<SEOFAQ title={typeof lang === "undefined" ? "FAQs" : (lang === "TH" ? "คำถามที่พบบ่อย" : "FAQs")}>');
    content = content.replace(/question=/g, 'q=');
    content = content.replace(/answer=/g, 'a=');

    // Also check `q=` and `a=` if they are correctly replaced for FAQItem
    
    if (content !== orig) {
      fs.writeFileSync(path.join(dirPath, f), content);
      console.log('Fixed', d, f);
    }
  }
}
console.log('Done fixing props in scratch batches.');

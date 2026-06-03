const fs = require('fs');
const path = require('path');

const dir = 'components/calcs';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Fix the ternary mess:
  // We accidentally did a={lang==="TH"?"Thai":"English":""} />
  // We need to restore it to a={lang==="TH"?"Thai":"English"} />
  // We'll use a regex that matches: `":"([^"]*)":""} />` and replaces it with `":"$1"} />`
  // Actually, let's just replace `":""} />` with `"} />` where there is a preceding `:` in the expression
  
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<FAQItem')) {
      if (lines[i].includes('":"') && lines[i].includes('":""} />')) {
         lines[i] = lines[i].replace(/":""\} \/>/, '"} />');
         changed = true;
      }
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log('Fixed ternary in', file);
  }
}

// Fix imports in ConstructionCalcs2.tsx
const constrPath = path.join(dir, 'ConstructionCalcs2.tsx');
let constrContent = fs.readFileSync(constrPath, 'utf8');
if (constrContent.includes("../../hooks/useLocalState")) {
  constrContent = constrContent.replace("import { useLocalState } from '../../hooks/useLocalState';", "import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem } from './shared';");
  constrContent = constrContent.replace("import { SEOFAQ, FAQItem } from '../SEOFAQ';\r\n", "");
  constrContent = constrContent.replace("import { SEOFAQ, FAQItem } from '../SEOFAQ';\n", "");
  fs.writeFileSync(constrPath, constrContent);
  console.log('Fixed imports in ConstructionCalcs2.tsx');
}

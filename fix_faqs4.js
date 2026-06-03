const fs = require('fs');
const path = require('path');

const dir = 'components/calcs';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<FAQItem')) {
      // Find `a={lang==="TH"?"..."} />` where there is NO colon inside the ternary.
      // We can use a regex: a=\{lang==="TH"\?"([^"]*?)"\} \/>
      // Wait, there might be quotes inside the text.
      // A better regex: a=\{lang==="TH"\?"(.*)"\} \/>
      // This will match `a={lang==="TH"?"Thai text"} />`
      // But if it's `a={lang==="TH"?"Thai":"English"} />`, it will match `Thai":"English`.
      // So we check if the matched string contains `":"` or `":"`.
      const match = lines[i].match(/a=\{lang==="TH"\?"(.*)"\} \/>/);
      if (match) {
         const inner = match[1];
         if (!inner.includes('":"') && !inner.includes('":" ') && !inner.includes('": "')) {
           // It's missing the false branch!
           lines[i] = lines[i].replace(/a=\{lang==="TH"\?"(.*)"\} \/>/, 'a={lang==="TH"?"$1":""} />');
           changed = true;
         }
      }
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log('Fixed missing false branch in', file);
  }
}

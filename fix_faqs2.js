const fs = require('fs');
const path = require('path');

const dir = 'components/calcs';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Undo my previous regex: " : ""} /> -> "} />
  if (content.includes('" : ""} />')) {
    content = content.replace(/" : "\"} \/>/g, '"} />');
    changed = true;
  }

  // 2. Fix a={lang==="TH"?"Thai"} /> to a={lang==="TH"?"Thai":""} />
  // We look for a={lang==="TH"?"...text..."} />
  // where the text does NOT contain `":"` (the delimiter for the false branch)
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<FAQItem')) {
      // Find the a={...} block
      const match = lines[i].match(/a=\{lang==="TH"\?"(.*?)"\} \/>/);
      if (match) {
        const inner = match[1];
        // If it contains ":" followed by English text, it's already a ternary
        // but wait, if it's "Thai":"English", the regex will match `Thai":"English` as `inner`
        if (!inner.includes('":"')) {
          // It's missing the false branch
          lines[i] = lines[i].replace(/a=\{lang==="TH"\?"(.*?)"\} \/>/, 'a={lang==="TH"?"$1":""} />');
          changed = true;
        }
      }
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log('Fixed', file);
  }
}

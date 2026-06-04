const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\zazad\\.gemini\\antigravity\\scratch\\kamnuan-com\\components\\calcs';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const f of files) {
  let content = fs.readFileSync(path.join(dir, f), 'utf8');
  let orig = content;

  content = content.replace(/<SEOFAQ>/g, '<SEOFAQ title={typeof lang === "undefined" ? "FAQs" : (lang === "TH" ? "คำถามที่พบบ่อย" : "FAQs")}>');
  content = content.replace(/question=/g, 'q=');
  content = content.replace(/answer=/g, 'a=');

  if (content !== orig) {
    fs.writeFileSync(path.join(dir, f), content);
    console.log('Fixed', f);
  }
}

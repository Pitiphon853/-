const fs = require('fs');
const path = require('path');

const calcsDir = 'C:/Users/zazad/.gemini/antigravity/scratch/kamnuan-com/components/calcs';
const files = fs.readdirSync(calcsDir).filter(f => f.endsWith('.tsx'));

let modifiedCount = 0;

files.forEach(file => {
  const filePath = path.join(calcsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('ListNumbers')) {
    content = content.replace(/ListNumbers/g, 'ListOrdered');
    fs.writeFileSync(filePath, content);
    console.log(`Replaced ListNumbers with ListOrdered in ${file}`);
    modifiedCount++;
  }
});

console.log(`Successfully updated ${modifiedCount} files.`);

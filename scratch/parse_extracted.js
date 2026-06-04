const fs = require('fs');

const raw = fs.readFileSync('temp_extract.txt', 'utf8');
const lines = raw.split('\n');

const groups = [];
let currentGroup = null;

for (const line of lines) {
  if (line.includes('หมวดที่')) {
    if (currentGroup) groups.push(currentGroup);
    currentGroup = { name: line.trim(), items: [] };
  } else if (line.trim() && currentGroup && line.includes('เครื่องมือ')) {
    currentGroup.items.push(line.trim());
  }
}
if (currentGroup) groups.push(currentGroup);

console.log(`Found ${groups.length} groups.`);
for (const g of groups) {
    console.log(`- ${g.name} (${g.items.length} items)`);
    console.log(`  First 3 items:`);
    for (let i=0; i<Math.min(3, g.items.length); i++) {
        console.log(`    ${g.items[i]}`);
    }
}

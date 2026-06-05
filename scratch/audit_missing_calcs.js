const fs = require('fs');
const path = require('path');

const missingDir = 'C:/Users/zazad/.gemini/antigravity/scratch/kamnuan-com/scratch/missing_calcs';
const mathListPath = 'C:/Users/zazad/.gemini/antigravity/scratch/kamnuan-com/scratch/math_list.txt';

const lines = fs.readFileSync(mathListPath, 'utf8')
  .split('\n')
  .map(l => l.trim())
  .filter(l => l);

const files = fs.readdirSync(missingDir);
const jsonFiles = files.filter(f => f.endsWith('.json'));

const matchedJson = new Set();
const mapping = [];

// For each JSON file, parse it and try to match it to a line in math_list.txt
jsonFiles.forEach(file => {
  try {
    const content = fs.readFileSync(path.join(missingDir, file), 'utf8');
    const parsed = JSON.parse(content);
    const id = parsed.id || '';
    const nameTH = parsed.name?.TH || (typeof parsed.name === 'string' ? parsed.name : '');
    const descTH = parsed.desc?.TH || '';

    // Try to find matching line in math_list.txt
    let matchedIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Clean up strings for comparison
      const cleanLine = line.replace(/[^ก-๙a-zA-Z0-9]/g, '').toLowerCase();
      const cleanName = nameTH.replace(/[^ก-๙a-zA-Z0-9]/g, '').toLowerCase();
      
      if (cleanLine.includes(cleanName) || cleanName.includes(cleanLine) || 
          (cleanLine && cleanName && (cleanLine.indexOf(cleanName) !== -1 || cleanName.indexOf(cleanLine) !== -1))) {
        matchedIndex = i;
        break;
      }
    }

    if (matchedIndex !== -1) {
      mapping[matchedIndex] = {
        file: file,
        id: id,
        nameTH: nameTH,
        line: lines[matchedIndex]
      };
      matchedJson.add(file);
    } else {
      console.log(`Could not find math_list.txt match for file: ${file} ("${nameTH}")`);
    }
  } catch (e) {
    console.error(`Error parsing ${file}:`, e.message);
  }
});

console.log('\n--- Missing Tools ---');
const missingLines = [];
lines.forEach((line, index) => {
  if (!mapping[index]) {
    missingLines.push({ index: index + 1, line: line });
    console.log(`Line ${index + 1}: ${line}`);
  }
});

console.log(`\nTotal lines in list: ${lines.length}`);
console.log(`Matched JSON count: ${matchedJson.size}`);
console.log(`Missing count: ${missingLines.length}`);

// Let's write the missing lines to a temporary file
fs.writeFileSync('C:/Users/zazad/.gemini/antigravity/scratch/kamnuan-com/scratch/unmatched_calcs.json', JSON.stringify(missingLines, null, 2));

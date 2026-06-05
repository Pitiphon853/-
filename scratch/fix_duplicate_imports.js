const fs = require('fs');

const filePath = 'C:/Users/zazad/.gemini/antigravity/scratch/kamnuan-com/components/calculators.tsx';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split(/\r?\n/);

// Pass 1: Parse all named imports (these are definitely conflicts if they match the default imports)
const namedImportNames = new Set();
const namedImportRegex = /import\s+{[^}]+}\s+from\s+"[^"]+"/g;
const namedImportsBlocks = content.match(namedImportRegex) || [];
namedImportsBlocks.forEach(block => {
  const inner = block.match(/{([^}]+)}/)[1];
  const items = inner.split(',').map(i => i.trim());
  items.forEach(item => {
    const parts = item.split(/\s+as\s+/i);
    const name = parts[parts.length - 1].trim();
    if (name) {
      namedImportNames.add(name);
    }
  });
});

console.log('Detected named imports:', Array.from(namedImportNames));

// Pass 2: Line by line processing, keeping track of default import names seen so far
const seenDefaultImports = new Set();
const newLines = [];
let duplicatesFixed = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const importMatch = line.match(/^import\s+(\w+)\s+from\s+"(\.\/calcs\/[^"]+)"/);
  
  if (importMatch) {
    const componentName = importMatch[1];
    const importPath = importMatch[2];
    
    // Check if this component name is a conflict with:
    // 1. A named import (e.g. GPACalculator or PercentileCalculator)
    // 2. An already seen default import
    if (namedImportNames.has(componentName) || seenDefaultImports.has(componentName)) {
      const newComponentName = componentName + 'New';
      console.log(`Renaming conflicting import ${componentName} to ${newComponentName} (Path: ${importPath})`);
      
      newLines.push(`import ${newComponentName} from "${importPath}";`);
      
      // Update case statements below this line
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].includes(`<${componentName} `)) {
          lines[j] = lines[j].replace(`<${componentName} `, `<${newComponentName} `);
        }
      }
      duplicatesFixed++;
      seenDefaultImports.add(newComponentName);
    } else {
      newLines.push(line);
      seenDefaultImports.add(componentName);
    }
  } else {
    newLines.push(line);
  }
}

if (duplicatesFixed > 0) {
  fs.writeFileSync(filePath, newLines.join('\n'));
  console.log(`Successfully fixed ${duplicatesFixed} duplicate imports in calculators.tsx`);
} else {
  console.log('No duplicate imports found.');
}

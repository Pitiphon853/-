const fs = require('fs');
const path = require('path');

// Step 1: Restore original files as the base
const originalToolsData = fs.readFileSync('./scratch/toolsData_original.ts', 'utf8');
const originalCalculators = fs.readFileSync('./scratch/calculators_original.tsx', 'utf8');

// Step 2: Read all new JSON metadata from lib/data (batch 7-16 files)
const dataDir = './lib/data';
const calcsDir = './components/calcs';
const jsonFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f.includes('calcs_batch_'));
const tsxFiles = fs.readdirSync(calcsDir).filter(f => f.endsWith('.tsx') && f.includes('calcs_batch_'));

let newCalcs = [];
for (const file of jsonFiles) {
    try {
        const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) newCalcs.push(...parsed);
        else if (parsed && parsed.id) newCalcs.push(parsed);
    } catch (e) {
        console.error('Error parsing', file, e.message);
    }
}

// Deduplicate by id
const uniqueCalcs = [];
const seenIds = new Set();
for (const c of newCalcs) {
    if (!seenIds.has(c.id)) {
        seenIds.add(c.id);
        uniqueCalcs.push(c);
    }
}
newCalcs = uniqueCalcs;

// Step 3: Build import and case statements for new calculators
let newImports = [];
let newCases = [];
let seenComponents = new Set();

// First, collect existing component names from originalCalculators to avoid duplicates
const existingImports = originalCalculators.match(/import \w+ from/g) || [];
for (const imp of existingImports) {
    const match = imp.match(/import (\w+) from/);
    if (match) seenComponents.add(match[1]);
}

// Also collect existing case IDs
const existingCases = new Set();
const caseMatches = originalCalculators.matchAll(/case "([^"]+)":/g);
for (const m of caseMatches) {
    existingCases.add(m[1]);
}

for (const c of newCalcs) {
    // Skip if already exists in original
    if (existingCases.has(c.id)) {
        console.log(`Skipping ${c.id} - already exists in original`);
        continue;
    }

    // Find matching TSX file
    const matchedFile = tsxFiles.find(f => f.endsWith(`_${c.id}.tsx`)) || tsxFiles.find(f => f.includes(c.id));
    if (!matchedFile) {
        console.log(`No TSX file found for ${c.id}`);
        continue;
    }

    const fileContent = fs.readFileSync(path.join(calcsDir, matchedFile), 'utf8');
    const exportMatch = fileContent.match(/export (?:default )?(?:function|const) (\w+)/);
    if (!exportMatch) {
        console.log(`No export found in ${matchedFile}`);
        continue;
    }

    let componentName = exportMatch[1];
    let importAlias = componentName;
    let count = 1;
    while (seenComponents.has(importAlias)) {
        importAlias = componentName + count;
        count++;
    }
    seenComponents.add(importAlias);

    newImports.push(`import ${importAlias} from "./calcs/${matchedFile.replace('.tsx', '')}";`);
    newCases.push(`      case "${c.id}":\n        return <${importAlias} lang={lang} />;`);
}

// Step 4: Inject into original toolsData.ts
// We need to add new entries to the getCalcs array
const newToolEntries = newCalcs.filter(c => !existingCases.has(c.id)).map(c => {
    return `    { id: "${c.id}", slug: "${c.slug}", name: lang==="TH"?"${c.name?.TH || c.name}":"${c.name?.EN || c.name}", desc: lang==="TH"?"${c.desc?.TH || c.desc}":"${c.desc?.EN || c.desc}", category: "${c.category}", icon: Calculator }`;
}).join(',\n');

// Find the end of the array in original toolsData
let toolsData = originalToolsData;
// Insert new entries before the closing ]; of the array
const lastBracket = toolsData.lastIndexOf('];');
if (lastBracket > -1 && newToolEntries) {
    toolsData = toolsData.slice(0, lastBracket) + ',\n' + newToolEntries + '\n  ];\n};\n\nexport const categories = [\n  "Finance",\n  "Health",\n  "Math",\n  "Conversion",\n  "Technology",\n  "Construction",\n  "Family",\n  "Utility",\n  "Agriculture",\n  "Environment",\n  "Business",\n  "Fortune",\n  "Travel",\n  "Misc"\n];\n';
}

fs.writeFileSync('./lib/toolsData.ts', toolsData);
console.log(`toolsData.ts: Kept original + added ${newCalcs.filter(c => !existingCases.has(c.id)).length} new entries`);

// Step 5: Inject imports and cases into original calculators.tsx
let calcTsx = originalCalculators;

// Add imports after the last existing import
const lastImportIdx = calcTsx.lastIndexOf('import ');
const lastImportEnd = calcTsx.indexOf('\n', lastImportIdx);
if (newImports.length > 0) {
    calcTsx = calcTsx.slice(0, lastImportEnd + 1) + newImports.join('\n') + '\n' + calcTsx.slice(lastImportEnd + 1);
}

// Add cases before the default case
const defaultCaseIdx = calcTsx.indexOf('default:');
if (defaultCaseIdx > -1 && newCases.length > 0) {
    calcTsx = calcTsx.slice(0, defaultCaseIdx) + newCases.join('\n') + '\n      ' + calcTsx.slice(defaultCaseIdx);
}

fs.writeFileSync('./components/calculators.tsx', calcTsx);
console.log(`calculators.tsx: Added ${newImports.length} imports and ${newCases.length} cases`);

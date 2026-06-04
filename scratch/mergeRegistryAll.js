const fs = require('fs');
const path = require('path');

const projectRoot = 'C:/Users/zazad/.gemini/antigravity/scratch/kamnuan-com';
const calcsDir = path.join(projectRoot, 'components/calcs');
const dataDir = path.join(projectRoot, 'lib/data');
const toolsDataFile = path.join(projectRoot, 'lib/toolsData.ts');
const calculatorsFile = path.join(projectRoot, 'components/calculators.tsx');

// --- STEP 1: READ ALL BATCH DATA ---
const jsonFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && !f.includes('metadata'));
const tsxFiles = fs.readdirSync(calcsDir).filter(f => f.endsWith('.tsx') && !f.includes('shared.tsx'));

console.log(`Found ${jsonFiles.length} JSON files and ${tsxFiles.length} TSX files in the project.`);

// Load all JSON tools
const allBatchCalcs = [];
for (const file of jsonFiles) {
    try {
        const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
            allBatchCalcs.push(...parsed);
        } else if (parsed && parsed.id) {
            allBatchCalcs.push(parsed);
        }
    } catch (e) {
        console.error(`Failed to parse ${file}:`, e.message);
    }
}

// Deduplicate json entries by id
const uniqueBatchCalcsMap = new Map();
for (const calc of allBatchCalcs) {
    uniqueBatchCalcsMap.set(calc.id, calc);
}
console.log(`Deduplicated batch calculators: ${uniqueBatchCalcsMap.size}`);


// --- STEP 2: MERGE INTO lib/toolsData.ts ---
let toolsDataContent = fs.readFileSync(toolsDataFile, 'utf8');

// Identify existing IDs in toolsData.ts
const existingIds = new Set();
const idRegex = /id:\s*"([^"]+)"/g;
let match;
while ((match = idRegex.exec(toolsDataContent)) !== null) {
    existingIds.add(match[1]);
}
console.log(`Found ${existingIds.size} existing IDs in toolsData.ts`);

// Find which new tools are missing from toolsData.ts
const missingTools = [];
for (const [id, calc] of uniqueBatchCalcsMap) {
    if (!existingIds.has(id)) {
        missingTools.push(calc);
    }
}
console.log(`Found ${missingTools.length} tools to add to toolsData.ts`);

if (missingTools.length > 0) {
    // Generate code strings for missing tools
    const newToolEntries = missingTools.map(c => {
        const nameTH = c.name?.TH || (typeof c.name === 'string' ? c.name : c.id);
        const nameEN = c.name?.EN || (typeof c.name === 'string' ? c.name : c.id);
        const descTH = c.desc?.TH || (typeof c.desc === 'string' ? c.desc : c.id);
        const descEN = c.desc?.EN || (typeof c.desc === 'string' ? c.desc : c.id);
        
        // Map icon to variable
        const iconName = c.icon || 'Calculator';
        const allowedIcons = ['Heart', 'Zap', 'Utensils', 'Baby', 'BookOpen', 'Sparkles', 'Star', 'Home', 'Coins', 'Plane', 'Car', 'Receipt', 'Calculator', 'Hash', 'Briefcase', 'Clock', 'Lightbulb'];
        const iconVar = allowedIcons.includes(iconName) ? iconName : 'Calculator';

        return `    { id: "${c.id}", slug: "${c.slug || c.id}", name: lang==="TH"?"${nameTH}":"${nameEN}", desc: lang==="TH"?"${descTH}":"${descEN}", category: "${c.category || 'Misc'}", icon: ${iconVar} }`;
    }).join(',\n');

    // Find the closing array bracket of getCalcs (i.e. '];' followed by '};')
    const endRegex = /\];\s*\r?\n\s*\};/;
    const endMatch = toolsDataContent.match(endRegex);
    if (endMatch) {
        const matchIdx = endMatch.index;
        toolsDataContent = toolsDataContent.slice(0, matchIdx) + ',\n' + newToolEntries + '\n  ' + toolsDataContent.slice(matchIdx);
        fs.writeFileSync(toolsDataFile, toolsDataContent);
        console.log(`Successfully added ${missingTools.length} new calculators to toolsData.ts.`);
    } else {
        console.error("Could not find closing bracket patterns in toolsData.ts!");
    }
} else {
    console.log("No new tools to add to toolsData.ts.");
}


// --- STEP 3: MERGE INTO components/calculators.tsx ---
let calculatorsContent = fs.readFileSync(calculatorsFile, 'utf8');

// Scan components/calculators.tsx for existing imports and cases
const importedComponents = new Set();
const importRegex = /import\s+(\w+)\s+from\s+"[^"]+"/g;
while ((match = importRegex.exec(calculatorsContent)) !== null) {
    importedComponents.add(match[1]);
}

const existingCases = new Set();
const caseRegex = /if\s*\(activeCalc\s*===\s*"([^"]+)"\)/g;
while ((match = caseRegex.exec(calculatorsContent)) !== null) {
    existingCases.add(match[1]);
}
console.log(`calculators.tsx has ${importedComponents.size} imports and ${existingCases.size} if statements.`);

// Process batch files to find export names
const newImports = [];
const newCases = [];

for (const calc of uniqueBatchCalcsMap.values()) {
    const id = calc.id;
    if (existingCases.has(id)) {
        continue; // Already registered
    }

    // Find the TSX file in components/calcs
    const tsxFile = tsxFiles.find(f => f.endsWith(`_${id}.tsx`) || f === `${id}.tsx` || f.includes(id));
    if (!tsxFile) {
        console.log(`No TSX file found for calculator ID: ${id}`);
        continue;
    }

    // Read TSX file to extract component name
    try {
        const fileContent = fs.readFileSync(path.join(calcsDir, tsxFile), 'utf8');
        const exportMatch = fileContent.match(/export\s+default\s+function\s+(\w+)/) || 
                            fileContent.match(/export\s+(?:function|const|class)\s+(\w+)/);
        
        if (exportMatch) {
            const componentName = exportMatch[1];
            let importAlias = componentName;
            
            // Check for collision
            if (importedComponents.has(importAlias)) {
                // Determine batch number
                const batchMatch = tsxFile.match(/calcs_batch_(\d+)/);
                const batchNum = batchMatch ? batchMatch[1] : 'New';
                importAlias = `${componentName}Batch${batchNum}`;
            }

            importedComponents.add(importAlias);
            
            // Build statements
            const relativePath = `./calcs/${tsxFile.replace('.tsx', '')}`;
            newImports.push(`import ${importAlias} from "${relativePath}";`);
            newCases.push(`  if (activeCalc === "${id}") return <${importAlias} lang={lang} />;`);
        } else {
            console.log(`No export found in TSX file: ${tsxFile}`);
        }
    } catch (e) {
        console.error(`Failed reading TSX file ${tsxFile}:`, e.message);
    }
}

if (newImports.length > 0) {
    // Insert new imports after the last import line
    let lines = calculatorsContent.split(/\r?\n/);
    let lastImportIdx = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('import ')) {
            lastImportIdx = i;
        }
    }

    if (lastImportIdx !== -1) {
        lines.splice(lastImportIdx + 1, 0, ...newImports);
    } else {
        console.error("Could not find any import lines in calculators.tsx!");
    }

    // Reconstruct the file string
    calculatorsContent = lines.join('\n');

    // Find the end function default return and insert the new cases before it
    const fallbackReturnRegex = /return\s*\(\s*<div\s+className="text-center\s+p-12\s+text-gray-500">/;
    const returnMatch = calculatorsContent.match(fallbackReturnRegex);
    if (returnMatch) {
        const returnIdx = returnMatch.index;
        calculatorsContent = calculatorsContent.slice(0, returnIdx) + newCases.join('\n') + '\n\n  ' + calculatorsContent.slice(returnIdx);
        fs.writeFileSync(calculatorsFile, calculatorsContent);
        console.log(`Successfully added ${newImports.length} imports and ${newCases.length} if cases to calculators.tsx.`);
    } else {
        console.error("Could not find default return statement in calculators.tsx!");
    }
} else {
    console.log("No new cases to add to calculators.tsx.");
}

const fs = require('fs');
const path = require('path');

const calcsDir = 'C:\\Users\\zazad\\.gemini\\antigravity\\scratch\\kamnuan-com\\components\\calcs';
const dataDir = 'C:\\Users\\zazad\\.gemini\\antigravity\\scratch\\kamnuan-com\\lib\\data';
const toolsDataFile = 'C:\\Users\\zazad\\.gemini\\antigravity\\scratch\\kamnuan-com\\lib\\toolsData.ts';
const calculatorsFile = 'C:\\Users\\zazad\\.gemini\\antigravity\\scratch\\kamnuan-com\\components\\calculators.tsx';

let newCalcs = [];

// 1. Parse JSON data
const jsonFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && !f.includes('metadata'));
for (const file of jsonFiles) {
    try {
        const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
            newCalcs.push(...parsed);
        } else if (parsed && parsed.id) {
            newCalcs.push(parsed);
        }
    } catch (e) {
        console.error('Error parsing', file);
    }
}

// deduplicate newCalcs by id
const uniqueCalcs = [];
const seenIds = new Set();
for (const c of newCalcs) {
    if (!seenIds.has(c.id)) {
        seenIds.add(c.id);
        uniqueCalcs.push(c);
    }
}
newCalcs = uniqueCalcs;

// 2. Inject into toolsData.ts
let toolsDataContent = fs.readFileSync(toolsDataFile, 'utf8');

// Also inject missing imports in calculators.tsx
let calcTsxContent = fs.readFileSync(calculatorsFile, 'utf8');
let newImports = [];
let newCases = [];

const tsxFiles = fs.readdirSync(calcsDir).filter(f => f.endsWith('.tsx'));

const calcsString = newCalcs.map(c => {
    // Find matching component file
    const matchedFile = tsxFiles.find(f => f.includes(c.id));
    if (matchedFile) {
        // extract the component name by reading the file
        const fileContent = fs.readFileSync(path.join(calcsDir, matchedFile), 'utf8');
        const exportMatch = fileContent.match(/export (?:default )?(?:function|const) (\w+)/);
        if (exportMatch) {
            const componentName = exportMatch[1];
            newImports.push(`import ${componentName} from "./calcs/${matchedFile.replace('.tsx', '')}";`);
            newCases.push(`      case "${c.id}":\n        return <${componentName} lang={lang} />;\n`);
        } else {
             // fallback
             const varMatch = fileContent.match(/export (?:default )?function (\w+)/);
             if (varMatch) {
                  newImports.push(`import ${varMatch[1]} from "./calcs/${matchedFile.replace('.tsx', '')}";`);
                  newCases.push(`      case "${c.id}":\n        return <${varMatch[1]} lang={lang} />;\n`);
             }
        }
    }

    return `  {
    id: "${c.id}",
    slug: "${c.slug}",
    name: lang === "TH" ? "${c.name?.TH || c.name}" : "${c.name?.EN || c.name}",
    desc: lang === "TH" ? "${c.desc?.TH || c.desc}" : "${c.desc?.EN || c.desc}",
    category: "${c.category}",
    icon: Icons.${c.icon || 'Calculator'}
  }`;
}).join(',\n');

if (calcsString) {
    toolsDataContent = toolsDataContent.replace('export const getCalcs = (lang: Lang): Calculator[] => [', `export const getCalcs = (lang: Lang): Calculator[] => [\n${calcsString},`);
    fs.writeFileSync(toolsDataFile, toolsDataContent);
    console.log(`Added ${newCalcs.length} tools to toolsData.ts`);
}

// 3. Update calculators.tsx
const importInjectionPoint = `import { useTheme } from "./ThemeProvider";`;
calcTsxContent = calcTsxContent.replace(importInjectionPoint, `${importInjectionPoint}\n${newImports.join('\n')}`);

const switchInjectionPoint = `switch (activeCalc) {`;
calcTsxContent = calcTsxContent.replace(switchInjectionPoint, `${switchInjectionPoint}\n${newCases.join('')}`);

fs.writeFileSync(calculatorsFile, calcTsxContent);
console.log(`Updated calculators.tsx with ${newCases.length} cases.`);

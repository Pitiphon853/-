const fs = require('fs');
const path = require('path');
const calcsDir = './components/calcs';
const dataDir = './lib/data';
const toolsDataFile = './lib/toolsData.ts';
const calculatorsFile = './components/calculators.tsx';

const tsxFiles = fs.readdirSync(calcsDir).filter(f => f.endsWith('.tsx'));
const jsonFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && !f.includes('metadata'));

let allCalcs = [];
for (const file of jsonFiles) {
    try {
        const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) allCalcs.push(...parsed);
        else if (parsed && parsed.id) allCalcs.push(parsed);
    } catch (e) {}
}

const uniqueCalcs = [];
const seenIds = new Set();
for (const c of allCalcs) {
    if (!seenIds.has(c.id)) {
        seenIds.add(c.id);
        uniqueCalcs.push(c);
    }
}
allCalcs = uniqueCalcs;

let toolsDataContent = fs.readFileSync(toolsDataFile, 'utf8');
let calcTsxContent = fs.readFileSync(calculatorsFile, 'utf8');

let newCalcs = allCalcs.filter(c => !calcTsxContent.includes('case "' + c.id + '":'));

let newImports = [];
let newCases = [];

const calcsString = newCalcs.map(c => {
    const matchedFile = tsxFiles.find(f => f.includes(c.id));
    if (matchedFile) {
        const fileContent = fs.readFileSync(path.join(calcsDir, matchedFile), 'utf8');
        const exportMatch = fileContent.match(/export (?:default )?(?:function|const) (\w+)/);
        if (exportMatch) {
            newImports.push('import ' + exportMatch[1] + ' from "./calcs/' + matchedFile.replace('.tsx', '') + '";');
            newCases.push('      case "' + c.id + '":\n        return <' + exportMatch[1] + ' lang={lang} />;\n');
        } else {
             const varMatch = fileContent.match(/export (?:default )?function (\w+)/);
             if (varMatch) {
                  newImports.push('import ' + varMatch[1] + ' from "./calcs/' + matchedFile.replace('.tsx', '') + '";');
                  newCases.push('      case "' + c.id + '":\n        return <' + varMatch[1] + ' lang={lang} />;\n');
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
    toolsDataContent = toolsDataContent.replace('export const getCalcs = (lang: Lang): Calculator[] => [', 'export const getCalcs = (lang: Lang): Calculator[] => [\n' + calcsString + ',');
    fs.writeFileSync(toolsDataFile, toolsDataContent);
    console.log('Added ' + newCalcs.length + ' tools to toolsData.ts');
}

const importInjectionPoint = 'import { useTheme } from "./ThemeProvider";';
calcTsxContent = calcTsxContent.replace(importInjectionPoint, importInjectionPoint + '\n' + newImports.join('\n'));

const switchInjectionPoint = 'switch (activeCalc) {';
calcTsxContent = calcTsxContent.replace(switchInjectionPoint, switchInjectionPoint + '\n' + newCases.join(''));

fs.writeFileSync(calculatorsFile, calcTsxContent);
console.log('Updated calculators.tsx with ' + newCases.length + ' cases.');

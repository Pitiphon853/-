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

let newImports = [];
let newCases = [];
let seenComponents = new Set();

const calcsString = allCalcs.map(c => {
    // Exact match using _id.tsx
    let matchedFile = tsxFiles.find(f => f.endsWith(`_${c.id}.tsx`));
    if (!matchedFile) {
        // Fallback exact match
        matchedFile = tsxFiles.find(f => f === `${c.id}.tsx`);
    }
    if (!matchedFile) {
        // Fallback loose match just in case
        matchedFile = tsxFiles.find(f => f.includes(c.id));
    }
    
    if (matchedFile) {
        const fileContent = fs.readFileSync(path.join(calcsDir, matchedFile), 'utf8');
        let componentName = "";
        const exportMatch = fileContent.match(/export (?:default )?(?:function|const) (\w+)/);
        if (exportMatch) {
            componentName = exportMatch[1];
        } else {
             const varMatch = fileContent.match(/export (?:default )?function (\w+)/);
             if (varMatch) {
                  componentName = varMatch[1];
             }
        }
        
        if (componentName) {
             // Deduplicate imports by component name
             let importAlias = componentName;
             let count = 1;
             while (seenComponents.has(importAlias)) {
                 importAlias = componentName + count;
                 count++;
             }
             seenComponents.add(importAlias);

             if (importAlias === componentName) {
                 newImports.push(`import ${componentName} from "./calcs/${matchedFile.replace('.tsx', '')}";`);
             } else {
                 newImports.push(`import ${importAlias} from "./calcs/${matchedFile.replace('.tsx', '')}";`);
             }
             newCases.push(`      case "${c.id}":\n        return <${importAlias} lang={lang} />;\n`);
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

// REWRITE toolsData.ts
const toolsDataTemplate = `import * as Icons from "lucide-react";

export type Lang = "TH" | "EN";

export type Calculator = {
  id: string;
  slug: string;
  name: string;
  desc: string;
  category: string;
  icon: any;
};

export const getCalcs = (lang: Lang): Calculator[] => [
${calcsString}
];

export const categories = [
  "Finance",
  "Health",
  "Science",
  "Conversion",
  "Technology",
  "Construction",
  "Family",
  "Utility",
  "Agriculture",
  "Environment",
  "Business",
  "General"
];
`;
fs.writeFileSync(toolsDataFile, toolsDataTemplate);

// REWRITE calculators.tsx
const calcTsxTemplate = `"use client";
import { useTheme } from "./ThemeProvider";
${newImports.join('\n')}

export const Calculators = ({ activeCalc, lang, setCalc }: { activeCalc: string; lang: any; setCalc: any }) => {
    switch (activeCalc) {
${newCases.join('')}
      default:
        return <div className="text-center p-10 text-gray-500">Calculator not found.</div>;
    }
}
`;
fs.writeFileSync(calculatorsFile, calcTsxTemplate);

console.log('Successfully rebuilt toolsData.ts and calculators.tsx with ' + allCalcs.length + ' tools.');

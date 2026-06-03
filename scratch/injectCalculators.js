const fs = require('fs');
const path = require('path');

const calcsDir = 'C:\\Users\\zazad\\.gemini\\antigravity\\scratch\\kamnuan-com\\components\\calcs';
const calculatorsFile = 'C:\\Users\\zazad\\.gemini\\antigravity\\scratch\\kamnuan-com\\components\\calculators.tsx';

// get all calcs_batch_ files
const batchFiles = fs.readdirSync(calcsDir).filter(f => f.startsWith('calcs_batch_') && f.endsWith('.tsx'));

let newImports = [];
let newCases = [];

for (const file of batchFiles) {
    if (file === 'calcs_batch_1_Batch1.tsx') continue; // Skip the aggregate file if individual files exist

    const content = fs.readFileSync(path.join(calcsDir, file), 'utf8');
    
    // Find component name
    let componentName = null;
    let match = content.match(/export default function (\w+)/);
    if (match) componentName = match[1];
    if (!componentName) {
        match = content.match(/export function (\w+)/);
        if (match) componentName = match[1];
    }
    if (!componentName) {
        match = content.match(/export const (\w+) =/);
        if (match) componentName = match[1];
    }
    if (!componentName) {
        match = content.match(/export default (\w+);/);
        if (match) componentName = match[1];
    }

    if (componentName) {
        let idMatch = file.replace('calcs_batch_', '').replace('.tsx', '');
        idMatch = idMatch.replace(/^\d+_/, ''); // remove batch prefix

        newImports.push(`import ${componentName} from "./calcs/${file.replace('.tsx', '')}";`);
        newCases.push(`  if (activeCalc === "${idMatch}") return <${componentName} lang={lang} />;`);
    } else {
        console.log("Could not find component name in", file);
    }
}

// Since I already injected 40 earlier, I need to restore first or just find the missing ones.
// I will just append the missing ones, but wait, if I run this it will duplicate the 40.
// Let's filter out ones that are already in the file.
let calcTsxContent = fs.readFileSync(calculatorsFile, 'utf8');

let filteredImports = [];
let filteredCases = [];

for (let i = 0; i < newImports.length; i++) {
    if (!calcTsxContent.includes(newImports[i])) {
        filteredImports.push(newImports[i]);
        filteredCases.push(newCases[i]);
    }
}

if (filteredImports.length > 0) {
    const importInjectionPoint = `import { TarotReadingCalculator } from "./calcs/TarotCalcs";`;
    calcTsxContent = calcTsxContent.replace(importInjectionPoint, `${importInjectionPoint}\n${filteredImports.join('\n')}`);

    const switchInjectionPoint = `export function Calculators({ activeCalc, lang, setCalc }: { activeCalc: string, lang: Lang, setCalc: (id: string) => void }) {`;
    calcTsxContent = calcTsxContent.replace(switchInjectionPoint, `${switchInjectionPoint}\n${filteredCases.join('\n')}`);

    fs.writeFileSync(calculatorsFile, calcTsxContent);
    console.log(`Successfully injected ${filteredCases.length} missing tools into calculators.tsx`);
} else {
    console.log("No new tools to inject.");
}

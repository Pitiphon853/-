const fs = require('fs');

let f1 = 'components/calcs/calcs_batch_9_food-carbon-footprint.tsx';
let c1 = fs.readFileSync(f1, 'utf8');
if (!c1.includes('Car,')) {
    c1 = c1.replace(/import \{ (.*?) \} from "lucide-react";/, 'import { $1, Car } from "lucide-react";');
    fs.writeFileSync(f1, c1);
}

let f2 = 'components/calcs/calcs_batch_9_mill-storage-electricity.tsx';
let c2 = fs.readFileSync(f2, 'utf8');
c2 = c2.replace(/totalCost > 0/, 'Number(totalCost) > 0');
fs.writeFileSync(f2, c2);

let f3 = 'components/calculators.tsx';
let c3 = fs.readFileSync(f3, 'utf8');
c3 = c3.replace('export const Calculators = ({ activeCalc, lang }: { activeCalc: string; lang: any }) => {', 'export const Calculators = ({ activeCalc, lang, setCalc }: { activeCalc: string; lang: any; setCalc?: any }) => {');
fs.writeFileSync(f3, c3);

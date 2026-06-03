const fs = require('fs');
let c = fs.readFileSync('components/calcs/ScienceCalcs.tsx', 'utf8');

c = c.replace(/result\.imag\.toLocaleString/g, 'result.imag?.toLocaleString');

fs.writeFileSync('components/calcs/ScienceCalcs.tsx', c);
console.log("Fixed ScienceCalcs.tsx TS error (imag)");

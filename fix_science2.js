const fs = require('fs');
let c = fs.readFileSync('components/calcs/ScienceCalcs.tsx', 'utf8');

c = c.replace(/result\.real\.toLocaleString/g, 'result.real?.toLocaleString');
c = c.replace(/result\.imaginary\.toLocaleString/g, 'result.imaginary?.toLocaleString');

fs.writeFileSync('components/calcs/ScienceCalcs.tsx', c);
console.log("Fixed ScienceCalcs.tsx TS error (real and imaginary)");

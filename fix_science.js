const fs = require('fs');
let c = fs.readFileSync('components/calcs/ScienceCalcs.tsx', 'utf8');

c = c.replace(/result\.x1\.toLocaleString/g, 'result.x1?.toLocaleString');
c = c.replace(/result\.x2\.toLocaleString/g, 'result.x2?.toLocaleString');
c = c.replace(/result\.x\.toLocaleString/g, 'result.x?.toLocaleString');

fs.writeFileSync('components/calcs/ScienceCalcs.tsx', c);
console.log("Fixed ScienceCalcs.tsx TS error");

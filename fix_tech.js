const fs = require('fs');
let c = fs.readFileSync('components/calcs/TechnologyCalcs2.tsx', 'utf8');
c = c.replace(/" : ""\} \/>/g, '"} />');
fs.writeFileSync('components/calcs/TechnologyCalcs2.tsx', c);
console.log("Fixed TechnologyCalcs2.tsx");

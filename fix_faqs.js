const fs = require('fs');
let env = fs.readFileSync('components/calcs/EnvironmentCalcs.tsx', 'utf8');
env = env.replace(/a=\{lang==="TH"\?"([\s\S]*?)"\} \/>/g, 'a={lang==="TH"?"$1" : ""} />');
fs.writeFileSync('components/calcs/EnvironmentCalcs.tsx', env);

let sci = fs.readFileSync('components/calcs/ScienceCalcs.tsx', 'utf8');
sci = sci.replace(/a=\{lang==="TH"\?"([\s\S]*?)"\} \/>/g, 'a={lang==="TH"?"$1" : ""} />');
fs.writeFileSync('components/calcs/ScienceCalcs.tsx', sci);

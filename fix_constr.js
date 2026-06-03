const fs = require('fs');
let c = fs.readFileSync('components/calcs/ConstructionCalcs2.tsx', 'utf8');

// 1. Fix AdPlaceholder
c = c.replace(/<AdPlaceholder \/>/g, '<AdPlaceholder type="in-article" />');

// 2. Fix SEOFAQ title
c = c.replace(/<SEOFAQ>/g, '<SEOFAQ title={lang==="TH"?"FAQ - การคำนวณและประมาณราคางานก่อสร้าง":"Construction & Estimation FAQ"}>');

// 3. Fix FAQItem
// The subagent wrote:
// <FAQItem question="Q">
//    A
// </FAQItem>
// We need to match this across multiple lines.
c = c.replace(/<FAQItem question="([^"]+)">\s*([\s\S]*?)\s*<\/FAQItem>/g, (match, q, a) => {
    // Escape backticks in answer just in case
    const safeA = a.replace(/`/g, '\\`');
    return `<FAQItem q={lang==="TH"?"${q}":""} a={lang==="TH"?\`${safeA}\`:""} />`;
});

fs.writeFileSync('components/calcs/ConstructionCalcs2.tsx', c);
console.log("Fixed ConstructionCalcs2.tsx structure");

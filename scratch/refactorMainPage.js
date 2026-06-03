const fs = require('fs');
const path = require('path');

const mainPagePath = path.join(__dirname, '..', 'components', 'MainPage.tsx');
let content = fs.readFileSync(mainPagePath, 'utf8');

// 1. Change export default function CalculatorHub() to export default function MainPage({ activeSlug = null }: { activeSlug?: string | null })
content = content.replace('export default function CalculatorHub() {', `import { getCalcs } from "../lib/toolsData";\nimport Link from "next/link";\n\nexport default function MainPage({ activeSlug = null }: { activeSlug?: string | null }) {`);

// 2. Remove the internal getCalcs definition. It starts at `const getCalcs = () => [` and ends at `];` before `const filteredCalcs`.
const startStr = 'const getCalcs = () => [';
const startIndex = content.indexOf(startStr);
const endStr = 'const filteredCalcs';
const endIndex = content.indexOf(endStr, startIndex);

const calcsDefinition = content.substring(startIndex, endIndex);
content = content.replace(calcsDefinition, `const allCalcs = getCalcs(lang);\n  `);

// 3. Update state initialization
// We need to set activeCalc based on activeSlug
content = content.replace('const [activeCalc, setActiveCalc] = useState<string | null>(null);', 
`const initialCalc = activeSlug ? allCalcs.find(c => c.slug === activeSlug)?.id || null : null;
  const [activeCalc, setActiveCalc] = useState<string | null>(initialCalc);`);

// 4. Update getCalcs() calls to allCalcs
content = content.replace(/getCalcs\(\)/g, 'allCalcs');

// 5. Change card rendering to use <Link> instead of <motion.div ... onClick>
// Wait, the cards are rendered inside AnimatePresence.
// <motion.div layout key={calc.id} ... onClick={() => setActiveCalc(calc.id)} className="...">
content = content.replace(/onClick=\{\(\) => setActiveCalc\(calc.id\)\}/g, '');
content = content.replace(/<motion.div\s+layout\s+key=\{calc\.id\}/g, '<Link href={`/${calc.slug || calc.id}`}\n                          key={calc.id} legacyBehavior><motion.div layout');
content = content.replace(/<\/motion.div>\s*\)\}\)/g, '</motion.div></Link>\n                      )})');

// Note: The "back" button inside the active calculator view should also use <Link href="/"> instead of onClick={() => setActiveCalc(null)}
content = content.replace(/<button\s+onClick=\{\(\) => setActiveCalc\(null\)\}/g, '<Link href="/"');
content = content.replace(/<ArrowLeft className="w-5 h-5" \/> \{t\.back\}\s*<\/button>/g, '<ArrowLeft className="w-5 h-5" /> {t.back}\n                </Link>');

// We need to fix the <Link> wrapping <motion.div> since legacyBehavior makes the child an <a>.
// Actually, in Next 13/14, <Link> doesn't need legacyBehavior if the child is just a tag, but motion.div might complain. 
// A safer way is to just change motion.div to motion(Link) or just use <Link className={...} ...><motion.div> inside? No, motion.div can't be a direct child of Link without passHref if using legacyBehavior.
// Best in App Router: <Link href={`/${calc.slug}`} className="block"> <motion.div ...> ... </motion.div> </Link> 
// Wait, we can just replace the onClick with a programmatic navigation, but Link is better for SEO. Let's wrap motion.div with Link.

fs.writeFileSync(mainPagePath, content);
console.log("Refactored MainPage.tsx");

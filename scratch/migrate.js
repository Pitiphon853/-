const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '..', 'app', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// Find the start of getCalcs array
const startStr = 'const getCalcs = () => [';
const startIndex = content.indexOf(startStr);
if (startIndex === -1) {
    console.error("Could not find getCalcs");
    process.exit(1);
}

// Find the end of the array
// We know it ends with "  ];" or similar before "const filteredCalcs"
const endStr = 'const filteredCalcs';
const endIndex = content.indexOf(endStr, startIndex);

let getCalcsContent = content.substring(startIndex, endIndex);
// getCalcsContent looks like: const getCalcs = () => [ ... ];

// We want to transform getCalcs into a separate file that exports it
// But we need to add the "slug" property to each object.
// We can use a regex replacement.

// Map of known IDs to existing slugs for SEO preservation
const existingSlugs = {
    "bmi": "คำนวณ-bmi",
    "electric": "คำนวณ-ค่าไฟ-2569",
    "mortgage": "คำนวณ-ผ่อนบ้าน-2569",
    "net-salary": "คำนวณ-เงินเดือนสุทธิ-2569",
    "area-unit": "วิธีแปลงไร่เป็นตารางเมตร",
    "car-loan": "คำนวณค่างวดรถมือสอง",
    "volume-shape": "สูตรหาปริมาตรทรงกระบอก",
    "tax": "คำนวณ-ภาษี-2569" // If exists
};

// Regex to find { id: "something", ... } and inject slug
getCalcsContent = getCalcsContent.replace(/\{\s*id:\s*"([^"]+)",/g, (match, id) => {
    let slug = existingSlugs[id] || `คำนวณ-${id}`;
    return `{ id: "${id}", slug: "${slug}",`;
});

const toolsDataContent = `import { Heart, Zap, Utensils, Baby, BookOpen, Sparkles, Star, Home, Coins, Plane, Car, Receipt, Calculator, Hash, Briefcase, Clock, Lightbulb } from "lucide-react";
import { Lang } from "../components/dictionary";

export const getCalcs = (lang: Lang) => {
    return [
${getCalcsContent.replace('const getCalcs = () => [', '').replace(/^];[\s\S]*$/m, '  ];\n')}
};
`;

const libDir = path.join(__dirname, '..', 'lib');
if (!fs.existsSync(libDir)) fs.mkdirSync(libDir);

fs.writeFileSync(path.join(libDir, 'toolsData.ts'), toolsDataContent);
console.log("Successfully created lib/toolsData.ts");

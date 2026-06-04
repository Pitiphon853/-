const fs = require('fs');
const lines = fs.readFileSync('lib/toolsData.ts', 'utf8').split('\n');

const keywords = [
  'continuous', 'compounding', 'ทบต้นต่อเนื่อง',
  'permutation', 'combination', 'bayes',
  'variance', 'deviation', 'regression',
  'chi-square', 't-test', 'sample size',
  'confidence interval',
  'newton', 'pressure', 'ความดัน',
  'projectile',
  'ohm', 'capacitor', 'wave', 'คลื่น',
  'buffer', 'equilibrium', 'สมดุลเคมี',
  'กำมือ', 'หยิบมือ',
  'เฮกตาร์', 'เอเคอร์',
  'ข้าวสาร', 'น้ำมันปาล์ม', 'mg/mcg',
  'เวลาทำงาน', 'ดีเนียร์', 'เท็กซ์',
  'แกลลอน', 'บาร์เรล', 'ขนาด a',
  'ไพนต์', 'vickers', 'hardness', 'ความแข็ง',
  'ต้อนรับแขก', 'เดลิเวอรี', 'ต้นทุนต่อจาน', 'ร้านกาแฟ',
  'ชงกาแฟ', 'Catering', 'Serving Size', 'เบเกอรี่',
  'น้ำหมัก', 'น้ำแข็ง', 'กรอง/ต้ม', 'วัตถุดิบร้านอาหาร',
  'cost per wear', 'cpw', 'wardrobe', 'skincare',
  'ตัดผม', 'nail', 'เล็บ', 'ทำผม',
  'streaming', 'netflix', 'กาแฟนอกบ้าน', 'บุหรี่',
  'cap rate', 'income approach', 'cost approach',
  'flip', 'airbnb', 'รังวัด', 'dscr',
  'สายไฟ', 'ฟิวส์', 'lpg', 'ซ่อมรถ', 'ทำสีรถ',
  'เครื่องกรองน้ำ', 'ถังแก๊ส', 'ซ่อม ac', 'เสาอากาศ'
];

console.log('--- Matching Lines from toolsData.ts ---');
lines.forEach((line, idx) => {
  const lowerLine = line.toLowerCase();
  const matched = keywords.filter(kw => lowerLine.includes(kw));
  if (matched.length > 0) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});

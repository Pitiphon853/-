const fs = require('fs');
const code = fs.readFileSync('lib/toolsData.ts', 'utf8').toLowerCase();

const keywords = [
  'continuous', 'compounding', 'ทบต้นต่อเนื่อง',
  'permutation', 'combination', 'ความน่าจะเป็น', 'bayes',
  'deviation', 'variance', 'ความแปรปรวน', 'regression', 'สมการถดถอย',
  'chi-square', 't-test', 'sample size', 'กลุ่มตัวอย่าง',
  'confidence interval', 'ช่วงความเชื่อมั่น',
  'newton', 'แรง', 'pressure', 'ความดัน',
  'energy', 'พลังงาน', 'กำลัง', 'horsepower', 'hp',
  'density', 'ความหนาแน่น', 'projectile',
  'ohm', 'capacitor', 'wave', 'คลื่น',
  'buffer', 'equilibrium', 'สมดุลเคมี',
  'ถ้วย', 'ช้อน', 'กำมือ', 'หยิบมือ',
  'วา', 'งาน', 'ไร่', 'ตารางวา',
  'เฮกตาร์', 'เอเคอร์', 'ทองคำ',
  'ข้าวสาร', 'น้ำมันปาล์ม', 'ยา', 'mg/mcg',
  'เวลาทำงาน', 'หลา', 'เมตร', 'ดีเนียร์', 'เท็กซ์',
  'แกลลอน', 'บาร์เรล', 'แกรม', 'ขนาด a', 'ไวน์',
  'ไพนต์', 'vickers', 'hardness', 'ความแข็ง',
  'ต้อนรับแขก', 'เดลิเวอรี', 'ต้นทุนต่อจาน', 'ร้านกาแฟ',
  'ชงกาแฟ', 'Catering', 'Serving Size', 'เบเกอรี่',
  'น้ำหมัก', 'น้ำแข็ง', 'กรอง/ต้ม', 'วัตถุดิบร้านอาหาร',
  'supplement', 'อาหารเสริม',
  'cost per wear', 'cpw', 'wardrobe', 'skincare',
  'ตัดผม', 'nail', 'เล็บ', 'ทำผม', 'gym',
  'streaming', 'netflix', 'กาแฟนอกบ้าน', 'บุหรี่',
  'yield', 'cap rate', 'income approach', 'cost approach',
  'flip', 'airbnb', 'ภาษีที่ดิน', 'รังวัด', 'dscr',
  'สายไฟ', 'ฟิวส์', 'lpg', 'ซ่อมรถ', 'ทำสีรถ',
  'เครื่องกรองน้ำ', 'ถังแก๊ส', 'ซ่อม ac', 'เสาอากาศ'
];

console.log('--- Matches found in toolsData.ts ---');
keywords.forEach(kw => {
  if (code.includes(kw)) {
    console.log(`Keyword "${kw}" matches lines in toolsData.ts!`);
  }
});

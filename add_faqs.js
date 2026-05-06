const fs = require('fs');
const path = require('path');

const filesToProcess = {
  'AgricultureCalcs.tsx': {
    titleTH: 'คำถามที่พบบ่อย (เกษตรกรรม)', titleEN: 'Agriculture FAQ',
    disclaimerTH: 'ปริมาณที่แนะนำเป็นการคำนวณจากสูตรมาตรฐาน สภาพดินและพืชแต่ละชนิดอาจต้องการการดูแลที่ต่างกัน กรุณาปรึกษานักวิชาการเกษตรเพื่อคำแนะนำที่เฉพาะเจาะจง',
    disclaimerEN: 'Recommended amounts are based on standard formulas. Actual soil and crop needs may vary. Please consult an agricultural expert for specific advice.'
  },
  'ConstructionCalcs.tsx': {
    titleTH: 'คำถามที่พบบ่อย (ก่อสร้าง)', titleEN: 'Construction FAQ',
    disclaimerTH: 'การคำนวณนี้เป็นการประเมินวัสดุเบื้องต้นเท่านั้น โครงสร้างจริงอาจมีความคลาดเคลื่อน กรุณาปรึกษาวิศวกรหรือผู้รับเหมามืออาชีพก่อนตัดสินใจสั่งซื้อหรือก่อสร้าง',
    disclaimerEN: 'This calculation is a rough estimate for materials. Actual requirements may vary. Please consult a professional engineer or contractor before purchasing or building.'
  },
  'TechnologyCalcs.tsx': {
    titleTH: 'คำถามที่พบบ่อย (เทคโนโลยี)', titleEN: 'Technology FAQ',
    disclaimerTH: 'ผลลัพธ์นี้เป็นเพียงการประมาณการเบื้องต้น ปัจจัยแวดล้อมเช่นประสิทธิภาพของอุปกรณ์อาจส่งผลต่อผลลัพธ์จริง',
    disclaimerEN: 'This result is a basic estimation. Environmental factors such as device efficiency may affect actual results.'
  },
  'ConversionCalcs2.tsx': {
    titleTH: 'คำถามที่พบบ่อย (ทั่วไป)', titleEN: 'General FAQ',
    disclaimerTH: 'การคำนวณนี้ใช้สูตรมาตรฐานสากล อาจมีการปัดเศษทศนิยมเพื่อความสะดวกในการใช้งาน',
    disclaimerEN: 'This calculation uses standard formulas. Rounding may occur for ease of use.'
  },
  'FinanceCalcs2.tsx': {
    titleTH: 'คำถามที่พบบ่อย (การเงิน)', titleEN: 'Finance FAQ',
    disclaimerTH: 'ผลการคำนวณนี้เป็นการประมาณการตามทฤษฎีเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุนหรือคำแนะนำทางกฎหมาย กรุณาปรึกษาที่ปรึกษาทางการเงินหรือนักบัญชีสำหรับการตัดสินใจขั้นสุดท้าย',
    disclaimerEN: 'This calculation is a theoretical estimate and does not constitute financial or legal advice. Please consult a financial advisor or accountant for your final decisions.'
  },
  'BusinessCalcs2.tsx': {
    titleTH: 'คำถามที่พบบ่อย (ธุรกิจ)', titleEN: 'Business FAQ',
    disclaimerTH: 'ผลการคำนวณนี้เป็นการประมาณการตามทฤษฎีเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุนหรือคำแนะนำทางกฎหมาย กรุณาปรึกษาที่ปรึกษาทางการเงินหรือนักบัญชีสำหรับการตัดสินใจขั้นสุดท้าย',
    disclaimerEN: 'This calculation is a theoretical estimate and does not constitute financial or legal advice. Please consult a financial advisor or accountant for your final decisions.'
  },
  'FamilyCalcs2.tsx': {
    titleTH: 'คำถามที่พบบ่อย (ครอบครัว)', titleEN: 'Family FAQ',
    disclaimerTH: 'ผลลัพธ์นี้ใช้เพื่อการประเมินเบื้องต้นและเพื่อการศึกษาเท่านั้น ไม่สามารถใช้แทนคำแนะนำทางการแพทย์ได้ กรุณาปรึกษาแพทย์ผู้เชี่ยวชาญเพื่อการวินิจฉัยที่แม่นยำ',
    disclaimerEN: 'This result is for estimation and educational purposes only. It does not replace professional medical advice. Please consult a doctor for an accurate diagnosis.'
  },
  'TravelCalcs.tsx': {
    titleTH: 'คำถามที่พบบ่อย (ท่องเที่ยว)', titleEN: 'Travel FAQ',
    disclaimerTH: 'ผลการคำนวณนี้เป็นการประมาณการเบื้องต้น ค่าใช้จ่ายและเวลาเดินทางจริงอาจเปลี่ยนแปลงตามสถานการณ์จริง',
    disclaimerEN: 'This calculation is a rough estimate. Actual travel expenses and time may vary depending on real-world conditions.'
  }
};

const dir = path.join(__dirname, 'components', 'calcs');

for (const [filename, meta] of Object.entries(filesToProcess)) {
  const filepath = path.join(dir, filename);
  if (!fs.existsSync(filepath)) continue;

  let content = fs.readFileSync(filepath, 'utf8');

  // Check and add imports if needed
  if (!content.includes('SEOFAQ')) {
    content = content.replace(/useLocalState, inputClass, labelClass(.*?)} from ".\/shared";/, 'useLocalState, inputClass, labelClass$1, SEOFAQ, FAQItem } from "./shared";');
  } else if (!content.includes('FAQItem')) {
    content = content.replace(/SEOFAQ(.*?)} from ".\/shared";/, 'SEOFAQ, FAQItem$1} from "./shared";');
  }

  // Find all component bodies ending with `</div>\n  );\n}`
  const regex = /(return \([\s\S]*?)(<\/div>\s*?\);\s*?})/g;
  
  content = content.replace(regex, (match, p1, p2) => {
    // If it already has SEOFAQ, skip adding another one, but we might want to check if it's the right one
    if (match.includes('<SEOFAQ')) return match;

    const faqBlock = `
      <div className="mt-8">
        <SEOFAQ title={lang === "TH" ? "${meta.titleTH}" : "${meta.titleEN}"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "${meta.disclaimerTH}" : "${meta.disclaimerEN}"} 
          />
        </SEOFAQ>
      </div>
    `;

    return p1 + faqBlock + p2;
  });

  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`Processed ${filename}`);
}

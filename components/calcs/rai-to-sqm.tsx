import React, { useState } from 'react';
import { Calculator, ArrowRight, ArrowDown } from 'lucide-react';

export default function RaiToSqm({ lang }: any) {
  const [rai, setRai] = useState<number | ''>('');
  
  const sqm = rai !== '' ? rai * 1600 : '';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {lang === 'EN' ? 'Rai to Square Meters Converter' : 'เครื่องมือแปลงไร่เป็นตารางเมตร'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Rai (ไร่)' : 'จำนวนไร่'}
            </label>
            <input
              type="number"
              value={rai}
              onChange={(e) => setRai(e.target.value ? Number(e.target.value) : '')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder={lang === 'EN' ? 'Enter Rai...' : 'ระบุจำนวนไร่...'}
              min="0"
            />
          </div>

          <div className="flex justify-center">
            <div className="hidden md:flex items-center justify-center w-12 h-12 bg-gray-50 rounded-full">
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex md:hidden items-center justify-center w-12 h-12 bg-gray-50 rounded-full mt-4">
              <ArrowDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Square Meters (ตารางเมตร)' : 'จำนวนตารางเมตร'}
            </label>
            <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-gray-900 min-h-[50px] flex items-center">
              {sqm !== '' ? sqm.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '0'}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h2>การแปลงหน่วยพื้นที่จาก ไร่ เป็น ตารางเมตร (Rai to Square Meters)</h2>
        <p>ประเทศไทยมีระบบการวัดพื้นที่ที่เป็นเอกลักษณ์ของตนเอง (ไร่ งาน ตารางวา) แต่ในขณะเดียวกัน การติดต่อธุรกิจกับต่างประเทศ การก่อสร้างอาคาร และการคำนวณพื้นที่ใช้สอยตามหลักสถาปัตยกรรมและวิศวกรรมสากล จำเป็นต้องใช้ระบบเมตริก (Metric System) คือ "ตารางเมตร" การทำความเข้าใจวิธีแปลงหน่วย "ไร่" ให้เป็น "ตารางเมตร" จึงมีความสำคัญอย่างยิ่งในยุคปัจจุบัน</p>
        
        <h3>1 ไร่ เท่ากับกี่ตารางเมตร?</h3>
        <p>เพื่อให้การแปลงหน่วยเป็นไปตามมาตรฐานที่ได้รับการยอมรับ เราต้องเข้าใจความเชื่อมโยงระหว่างหน่วยไทยและหน่วยสากลเสียก่อน โดยมีหลักการเทียบเคียงพื้นฐานคือ <strong>1 ตารางวา เท่ากับ 4 ตารางเมตร</strong></p>
        <p>เนื่องจาก 1 ไร่ มีพื้นที่เท่ากับ 400 ตารางวา ดังนั้นเมื่อต้องการแปลงเป็นตารางเมตร จะต้องนำ 400 ไปคูณด้วย 4 ซึ่งจะได้ผลลัพธ์ว่า <strong>1 ไร่ มีพื้นที่เท่ากับ 1,600 ตารางเมตร</strong></p>
        <ul>
          <li>1 ตารางวา = 4 ตารางเมตร</li>
          <li>1 งาน (100 ตารางวา) = 400 ตารางเมตร</li>
          <li>1 ไร่ (400 ตารางวา) = 1,600 ตารางเมตร</li>
        </ul>
        
        <h3>ทำไมถึงต้องแปลง ไร่ เป็น ตารางเมตร?</h3>
        <p>1. <strong>การออกแบบและก่อสร้างอาคาร:</strong> แบบแปลนบ้าน คอนโดมิเนียม หรือโรงงานอุตสาหกรรม ล้วนถูกออกแบบและคำนวณพื้นที่ในหน่วยตารางเมตร (ตร.ม. หรือ sq.m.) การแปลงขนาดที่ดินจากไร่เป็นตารางเมตร จะช่วยให้สถาปนิกคำนวณอัตราส่วนพื้นที่ว่างต่อพื้นที่อาคารรวม (FAR) และสัดส่วนพื้นที่น้ำซึมผ่านได้ (OSR) ตามกฎหมายผังเมืองได้อย่างถูกต้อง</p>
        <p>2. <strong>การสื่อสารกับชาวต่างชาติ:</strong> ชาวต่างชาติจะไม่คุ้นเคยกับคำว่า "ไร่" หรือ "ตารางวา" หากคุณต้องการขายที่ดิน หรือให้เช่าที่ดินแก่บริษัทข้ามชาติ การระบุพื้นที่เป็น "Square Meters" จะช่วยให้พวกเขาเข้าใจขนาดที่ดินได้ทันที และสามารถเปรียบเทียบกับที่ดินในประเทศอื่นๆ ได้</p>
        <p>3. <strong>การเกษตรสมัยใหม่:</strong> การทำเกษตรแบบแม่นยำ (Precision Agriculture) หรือการติดตั้งระบบน้ำหยด ระบบโซลาร์เซลล์บนพื้นที่เกษตรกรรม อุปกรณ์ต่างๆ มักจะใช้หน่วยตารางเมตรในการคำนวณปริมาณที่ต้องใช้</p>
        
        <h3>สูตรการแปลงหน่วยที่ดิน</h3>
        <p><strong>สูตร:</strong> จำนวนไร่ &times; 1,600 = จำนวนตารางเมตร</p>
        <p><strong>ตัวอย่างการคำนวณ:</strong></p>
        <ul>
          <li>ที่ดินขนาด 2 ไร่ = 2 &times; 1,600 = 3,200 ตารางเมตร</li>
          <li>ที่ดินขนาด 0.5 ไร่ (ครึ่งไร่) = 0.5 &times; 1,600 = 800 ตารางเมตร</li>
          <li>ที่ดินขนาด 10 ไร่ = 10 &times; 1,600 = 16,000 ตารางเมตร</li>
        </ul>
        
        <h3>โปรแกรมคำนวณแปลงหน่วยออนไลน์ของเรา</h3>
        <p>เครื่องมือสำหรับการแปลง "ไร่เป็นตารางเมตร" บนหน้าเว็บนี้ ถูกพัฒนาขึ้นเพื่อความสะดวกสบายของผู้ใช้งานทุกระดับ เพียงกรอกจำนวนไร่ที่ต้องการทราบ ค่าที่เป็นตารางเมตรจะปรากฏขึ้นโดยอัตโนมัติ โดยไม่ต้องพึ่งพาเครื่องคิดเลขหรือจดจำสูตรที่ซับซ้อน</p>
        <p>นอกจากนี้ยังรองรับการป้อนตัวเลขแบบทศนิยม ช่วยให้การแปลงที่ดินที่ไม่เต็มจำนวนไร่ (เช่น 1.45 ไร่) เป็นไปอย่างรวดเร็วและแม่นยำ เครื่องมือนี้จึงเหมาะทั้งสำหรับผู้รับเหมาก่อสร้าง นายหน้าอสังหาริมทรัพย์ วิศวกร และผู้ใช้งานทั่วไปที่ต้องการความรวดเร็วในการแปลงหน่วยที่ดิน</p>
      </article>
    </div>
  );
}

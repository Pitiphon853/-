import React, { useState } from 'react';
import { Calculator, ArrowRight, ArrowDown } from 'lucide-react';

export default function RaiToHectare({ lang }: any) {
  const [rai, setRai] = useState<number | ''>('');
  
  const hectare = rai !== '' ? rai * 0.16 : '';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {lang === 'EN' ? 'Rai to Hectare Converter' : 'เครื่องมือแปลงไร่เป็นเฮกตาร์'}
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
              {lang === 'EN' ? 'Hectare (เฮกตาร์)' : 'จำนวนเฮกตาร์'}
            </label>
            <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-gray-900 min-h-[50px] flex items-center">
              {hectare !== '' ? hectare.toLocaleString(undefined, { maximumFractionDigits: 6 }) : '0'}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h2>การแปลงหน่วยพื้นที่จาก ไร่ เป็น เฮกตาร์ (Rai to Hectare)</h2>
        <p>ในการติดต่อธุรกิจระดับนานาชาติ หรือการจัดการพื้นที่เกษตรกรรมขนาดใหญ่ รวมถึงป่าไม้และอุทยานต่างๆ หน่วยพื้นที่ที่นิยมใช้ในระดับสากลคือ "เฮกตาร์" (Hectare - ha) การเข้าใจความสัมพันธ์ระหว่างหน่วย "ไร่" ซึ่งเป็นหน่วยท้องถิ่นของไทย กับหน่วย "เฮกตาร์" จึงเป็นทักษะที่จำเป็นอย่างยิ่งสำหรับนักลงทุน นักเศรษฐศาสตร์ และผู้ที่ทำงานในองค์กรระหว่างประเทศ</p>
        
        <h3>1 ไร่ เท่ากับกี่เฮกตาร์?</h3>
        <p>เพื่อหาคำตอบนี้ เราต้องเชื่อมโยงผ่านหน่วย "ตารางเมตร" เสียก่อน โดยมีหลักการพื้นฐานที่ต้องจำดังนี้:</p>
        <ul>
          <li>1 ไร่ จะมีพื้นที่เท่ากับ 1,600 ตารางเมตร</li>
          <li>1 เฮกตาร์ จะมีพื้นที่เท่ากับ 10,000 ตารางเมตร</li>
        </ul>
        <p>เมื่อนำมาเปรียบเทียบกัน จะได้สูตรว่า 1 ไร่ เท่ากับ 1,600 หารด้วย 10,000 ซึ่งเท่ากับ <strong>0.16 เฮกตาร์</strong> ในทางกลับกัน หากมีพื้นที่ 1 เฮกตาร์ จะเท่ากับ <strong>6.25 ไร่</strong></p>
        
        <h3>ความสำคัญของการแปลงพื้นที่เป็น "เฮกตาร์"</h3>
        <p>1. <strong>รายงานระดับสากล:</strong> องค์กรอย่าง FAO (องค์การอาหารและเกษตรแห่งสหประชาชาติ) หรือรายงานเศรษฐกิจโลก จะแสดงข้อมูลพื้นที่เพาะปลูก พื้นที่ป่าไม้ เป็นหน่วยเฮกตาร์เสมอ หากไทยต้องการนำเสนอข้อมูลที่ดินให้สากลเข้าใจ ต้องแปลงหน่วยไร่ให้เป็นเฮกตาร์ก่อน</p>
        <p>2. <strong>การลงทุนด้านเกษตรกรรมข้ามชาติ:</strong> นักลงทุนต่างชาติที่ต้องการทำสัญญาสัมปทาน หรือซื้อพื้นที่เพื่อการเกษตรขนาดใหญ่ในภูมิภาคอาเซียน มักจะคำนวณต้นทุนและความคุ้มทุนเป็นรายเฮกตาร์ การคุยธุรกิจโดยใช้หน่วยที่ตรงกันจะทำให้การเจรจาง่ายขึ้น</p>
        <p>3. <strong>การค้าคาร์บอนเครดิต (Carbon Credit):</strong> ในยุคที่โลกให้ความสำคัญกับสิ่งแวดล้อม การประเมินพื้นที่ป่าเพื่อคำนวณปริมาณการกักเก็บคาร์บอน มักจะอ้างอิงพื้นที่เป็นจำนวนเฮกตาร์ การทราบวิธีแปลงไร่เป็นเฮกตาร์จึงช่วยให้เกษตรกรหรือเจ้าของป่าไม้เข้าถึงตลาดคาร์บอนเครดิตได้ง่ายขึ้น</p>
        
        <h3>วิธีการแปลง ไร่ เป็น เฮกตาร์ ด้วยตนเอง</h3>
        <p><strong>สูตร:</strong> จำนวนไร่ &times; 0.16 = จำนวนเฮกตาร์</p>
        <p><strong>ตัวอย่างการคำนวณ:</strong></p>
        <ul>
          <li>ที่ดิน 10 ไร่ = 10 &times; 0.16 = 1.6 เฮกตาร์</li>
          <li>ที่ดิน 50 ไร่ = 50 &times; 0.16 = 8 เฮกตาร์</li>
          <li>ที่ดิน 100 ไร่ = 100 &times; 0.16 = 16 เฮกตาร์</li>
        </ul>
        
        <h3>ใช้โปรแกรมแปลงหน่วยช่วยให้งานง่ายขึ้น</h3>
        <p>การแปลงหน่วยที่มีทศนิยมอาจทำให้สับสนและเกิดข้อผิดพลาดได้ โดยเฉพาะกับที่ดินขนาดใหญ่ระดับหลายพันไร่ เครื่องมือ "แปลงไร่เป็นเฮกตาร์" ออนไลน์ของเรา จึงถูกสร้างมาเพื่อลดข้อผิดพลาดดังกล่าว คุณสามารถกรอกตัวเลขจำนวนไร่ลงไป และระบบจะแสดงผลลัพธ์เป็นเฮกตาร์ให้ทันทีแบบ Real-time โดยมีความแม่นยำสูง รองรับทศนิยมหลายตำแหน่ง สะดวก รวดเร็ว และใช้งานได้ฟรีโดยไม่ต้องติดตั้งแอปพลิเคชัน</p>
      </article>
    </div>
  );
}

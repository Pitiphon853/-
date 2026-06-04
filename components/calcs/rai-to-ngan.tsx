import React, { useState } from 'react';
import { Calculator, ArrowRight, ArrowDown } from 'lucide-react';

export default function RaiToNgan({ lang }: any) {
  const [rai, setRai] = useState<number | ''>('');
  
  const ngan = rai !== '' ? rai * 4 : '';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {lang === 'EN' ? 'Rai to Ngan Converter' : 'เครื่องมือแปลงไร่เป็นงาน'}
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
              {lang === 'EN' ? 'Ngan (งาน)' : 'จำนวนงาน'}
            </label>
            <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-gray-900 min-h-[50px] flex items-center">
              {ngan !== '' ? ngan.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '0'}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h2>การแปลงหน่วยพื้นที่จาก ไร่ เป็น งาน (Rai to Ngan)</h2>
        <p>การวัดพื้นที่ในประเทศไทยมีมาอย่างยาวนาน โดยหน่วยที่คนไทยคุ้นเคยกันดีคือ ไร่ งาน และตารางวา ซึ่งการทำความเข้าใจหน่วยวัดเหล่านี้มีความจำเป็นอย่างยิ่งสำหรับการซื้อขายที่ดิน การทำเกษตรกรรม การก่อสร้าง หรือแม้กระทั่งการจัดการมรดก การแปลงหน่วยพื้นที่จาก "ไร่" เป็น "งาน" เป็นหนึ่งในการคำนวณที่พบได้บ่อยที่สุด</p>
        
        <h3>1 ไร่ เท่ากับกี่งาน?</h3>
        <p>ตามมาตราการวัดพื้นที่ของไทย มีข้อกำหนดที่ชัดเจนว่า <strong>1 ไร่ เท่ากับ 4 งาน</strong> เสมอ ไม่ว่าจะอยู่ในภูมิภาคใดของประเทศ นี่คือมาตรฐานที่ใช้ในกฎหมาย กรมที่ดิน และการระบุขนาดพื้นที่ในโฉนดที่ดิน (น.ส. 4 จ.) ทุกฉบับ นอกจากนี้ยังสามารถเทียบเคียงกับหน่วยอื่นๆ ได้ดังนี้</p>
        <ul>
          <li>1 งาน เท่ากับ 100 ตารางวา</li>
          <li>1 ไร่ เท่ากับ 400 ตารางวา</li>
          <li>1 งาน เท่ากับ 400 ตารางเมตร</li>
          <li>1 ไร่ เท่ากับ 1,600 ตารางเมตร</li>
        </ul>
        
        <h3>ความสำคัญของหน่วย "งาน" ในประเทศไทย</h3>
        <p>ในอดีต คำว่า "งาน" มักจะใช้เรียกปริมาณงานที่เกษตรกร หรือคนงานสามารถทำได้ในหนึ่งวัน เช่น การไถนาให้เสร็จในพื้นที่ขนาดนี้จะใช้เวลาหนึ่งวันพอดี จึงถูกเรียกว่า 1 งาน เมื่อเวลาผ่านไป คำนี้จึงถูกปรับให้เป็นหน่วยมาตรฐานสำหรับการวัดที่ดินอย่างเป็นทางการ</p>
        <p>ในการซื้อขายที่ดิน หรือการระบุขนาดที่ดินในโฉนด หากที่ดินมีขนาดไม่เต็มจำนวนไร่ ส่วนที่เหลือมักจะถูกระบุด้วยหน่วย "งาน" และ "ตารางวา" เพื่อความแม่นยำ เช่น ที่ดินขนาด 1.75 ไร่ จะไม่นิยมเรียกแบบทศนิยม แต่จะระบุเป็น "1 ไร่ 3 งาน" หรือที่ดินขนาด 2.5 ไร่ จะถูกเรียกว่า "2 ไร่ 2 งาน" เป็นต้น</p>
        
        <h3>วิธีการคำนวณแปลงหน่วยจากไร่เป็นงาน</h3>
        <p>การแปลงหน่วยจากไร่เป็นงานนั้นสามารถทำได้ง่ายๆ โดยใช้การคูณด้วย 4 ซึ่งเป็นสูตรพื้นฐานที่ใช้กันทั่วไป</p>
        <p><strong>สูตรการคำนวณ:</strong> จำนวนไร่ &times; 4 = จำนวนงาน</p>
        <p><strong>ตัวอย่างการคำนวณ:</strong></p>
        <ul>
          <li>หากคุณมีที่ดิน 2 ไร่ จะเท่ากับ 2 &times; 4 = 8 งาน</li>
          <li>หากคุณมีที่ดิน 5.5 ไร่ จะเท่ากับ 5.5 &times; 4 = 22 งาน</li>
          <li>หากคุณมีที่ดิน 0.25 ไร่ (เศษหนึ่งส่วนสี่ไร่) จะเท่ากับ 0.25 &times; 4 = 1 งาน</li>
        </ul>
        
        <h3>ประโยชน์ของการใช้งานเครื่องมือแปลงหน่วยพื้นที่ของเรา</h3>
        <p>แม้ว่าการคูณด้วย 4 จะดูเหมือนเป็นเรื่องง่าย แต่ในทางปฏิบัติ เมื่อต้องเจอกับตัวเลขที่มีจุดทศนิยมหลายตำแหน่ง หรือตัวเลขจำนวนมาก การคิดในใจอาจทำให้เกิดความคลาดเคลื่อนได้ เครื่องมือคำนวณแปลงหน่วยจาก "ไร่" เป็น "งาน" (Rai to Ngan Converter) บนเว็บไซต์ของเรา ได้รับการออกแบบมาเพื่อแก้ปัญหานี้โดยเฉพาะ</p>
        <p>ระบบของเราจะทำการประมวลผลทันทีที่คุณกรอกตัวเลขลงไป โดยไม่ต้องกดปุ่มยืนยันใดๆ (Real-time calculation) ช่วยให้คุณได้คำตอบที่ถูกต้องแม่นยำภายในเสี้ยววินาที ไม่ว่าคุณจะเป็นนายหน้าอสังหาริมทรัพย์ที่ต้องการนำเสนอข้อมูลที่ดินให้ลูกค้า เจ้าของที่ดินที่ต้องการแบ่งแปลงที่ดิน หรือนักศึกษาที่ต้องการใช้ในการคำนวณ เครื่องมือนี้ก็พร้อมตอบโจทย์การใช้งานของคุณอย่างเต็มประสิทธิภาพ</p>
        <p>นอกจากนี้ การเข้าใจเรื่องหน่วยพื้นที่ยังช่วยให้การประเมินราคาที่ดินเป็นไปอย่างถูกต้อง เพราะราคาซื้อขายมักจะถูกคำนวณเป็นบาทต่อตารางวา บาทต่องาน หรือบาทต่อไร่ การแปลงหน่วยได้อย่างถูกต้องจึงช่วยป้องกันการเสียเปรียบในการทำธุรกรรม และทำให้การวางแผนการใช้ประโยชน์ที่ดินเป็นไปอย่างคุ้มค่าที่สุด</p>
      </article>
    </div>
  );
}

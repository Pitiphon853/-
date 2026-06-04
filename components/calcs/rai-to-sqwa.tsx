import React, { useState } from 'react';
import { Calculator, ArrowRight, ArrowDown } from 'lucide-react';

export default function RaiToSqwa({ lang }: any) {
  const [rai, setRai] = useState<number | ''>('');
  
  const sqwa = rai !== '' ? rai * 400 : '';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {lang === 'EN' ? 'Rai to Square Wa Converter' : 'เครื่องมือแปลงไร่เป็นตารางวา'}
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
              {lang === 'EN' ? 'Square Wa (ตารางวา)' : 'จำนวนตารางวา'}
            </label>
            <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-gray-900 min-h-[50px] flex items-center">
              {sqwa !== '' ? sqwa.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '0'}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h2>การแปลงหน่วยพื้นที่จาก ไร่ เป็น ตารางวา (Rai to Square Wa)</h2>
        <p>การเข้าใจหน่วยวัดที่ดินในประเทศไทยถือเป็นทักษะที่สำคัญมาก โดยเฉพาะหน่วย "ไร่" และ "ตารางวา" ซึ่งถูกนำมาใช้อย่างแพร่หลายทั้งในระบบราชการ กรมที่ดิน และการซื้อขายอสังหาริมทรัพย์ทั่วไป การแปลงหน่วยจาก "ไร่" เป็น "ตารางวา" เป็นพื้นฐานที่จำเป็นที่สุดในการประเมินมูลค่าที่ดิน</p>
        
        <h3>1 ไร่ เท่ากับกี่ตารางวา?</h3>
        <p>ตามมาตรฐานการวัดพื้นที่ของประเทศไทย <strong>1 ไร่ จะมีค่าเท่ากับ 400 ตารางวา</strong> เสมอ ไม่ว่าจะเป็นที่ดินในกรุงเทพมหานคร หรือในต่างจังหวัด มาตรฐานนี้ถูกกำหนดใช้อย่างเป็นทางการในเอกสารสิทธิ์ทุกประเภท ทั้งโฉนดที่ดิน (น.ส.4) หนังสือรับรองการทำประโยชน์ (น.ส.3) เป็นต้น</p>
        <p>เมื่อเทียบกับหน่วยอื่นๆ จะมีความสัมพันธ์ดังนี้:</p>
        <ul>
          <li>1 งาน เท่ากับ 100 ตารางวา</li>
          <li>4 งาน เท่ากับ 1 ไร่</li>
          <li>1 ตารางวา เท่ากับ 4 ตารางเมตร</li>
          <li>1 ไร่ (400 ตารางวา) จึงเท่ากับ 1,600 ตารางเมตร</li>
        </ul>
        
        <h3>ทำไม "ตารางวา" จึงสำคัญในการซื้อขายที่ดิน?</h3>
        <p>แม้ว่าคนส่วนใหญ่จะนิยมเรียกขนาดที่ดินรวมๆ เป็น "ไร่" แต่เมื่อถึงขั้นตอนการตั้งราคาหรือประเมินราคา การซื้อขายที่ดินในประเทศไทยมักจะใช้ "ราคาต่อตารางวา" เป็นตัวกำหนดมูลค่าที่แท้จริง โดยเฉพาะในเขตเมืองที่มีราคาที่ดินสูง เช่น ที่ดินในกรุงเทพฯ อาจมีราคาตั้งแต่หลักหมื่นไปจนถึงหลักล้านบาท "ต่อตารางวา"</p>
        <p>ดังนั้น การทราบจำนวนตารางวาที่แน่นอนจากจำนวนไร่ จะช่วยให้เราสามารถคำนวณมูลค่ารวมของที่ดินผืนนั้นได้อย่างถูกต้องแม่นยำ ตัวอย่างเช่น หากที่ดินขนาด 2 ไร่ ประกาศขายในราคาตารางวาละ 20,000 บาท ผู้ซื้อจะต้องทราบก่อนว่า 2 ไร่ เท่ากับกี่ตารางวา เพื่อนำมาคูณหาราคาสุทธิ</p>
        
        <h3>วิธีการแปลงไร่เป็นตารางวา</h3>
        <p>สูตรการคิดแปลงหน่วยพื้นที่จากไร่เป็นตารางวานั้นตรงไปตรงมามาก เพียงแค่นำตัวเลขจำนวนไร่ไปคูณด้วย 400</p>
        <p><strong>สูตรการคำนวณ:</strong> จำนวนไร่ &times; 400 = จำนวนตารางวา</p>
        <p><strong>ตัวอย่างเช่น:</strong></p>
        <ul>
          <li>ที่ดินขนาด 1 ไร่ = 1 &times; 400 = 400 ตารางวา</li>
          <li>ที่ดินขนาด 3.5 ไร่ = 3.5 &times; 400 = 1,400 ตารางวา</li>
          <li>ที่ดินขนาด 10 ไร่ = 10 &times; 400 = 4,000 ตารางวา</li>
        </ul>
        
        <h3>ประโยชน์ของการใช้เครื่องมือคำนวณออนไลน์</h3>
        <p>บ่อยครั้งที่ตัวเลขขนาดที่ดินไม่ได้เป็นจำนวนเต็ม เช่น ที่ดิน 1.25 ไร่ หรือ 0.8 ไร่ การคิดเลขในใจอาจทำให้เกิดความผิดพลาดได้ เครื่องมือแปลงหน่วยพื้นที่ "ไร่เป็นตารางวา" ของเราถูกสร้างขึ้นมาเพื่อให้การคำนวณของคุณเป็นเรื่องง่าย รวดเร็ว และไม่มีข้อผิดพลาด</p>
        <p>คุณเพียงแค่ระบุตัวเลขลงในช่องที่กำหนด ระบบจะทำการคำนวณผลลัพธ์เป็น "ตารางวา" ออกมาให้ในพริบตา โดยหน้าต่างการใช้งานถูกออกแบบมาให้ทันสมัย ใช้งานง่ายทั้งบนคอมพิวเตอร์และโทรศัพท์มือถือ เหมาะสำหรับนักธุรกิจอสังหาริมทรัพย์ นายหน้า ที่ปรึกษาการลงทุน หรือเจ้าของที่ดินที่ต้องการคำนวณพื้นที่เพื่อยื่นขอสินเชื่อ การขออนุญาตก่อสร้างอาคาร และการแบ่งแยกโฉนดที่ดิน</p>
        <p>การมีความรู้และการเข้าถึงเครื่องมือที่แม่นยำ จะช่วยเสริมสร้างความมั่นใจในการจัดการกับอสังหาริมทรัพย์ของคุณ ทำให้ทุกการตัดสินใจ ไม่ว่าจะเป็นการซื้อ ขาย หรือพัฒนาที่ดิน ดำเนินไปอย่างมีประสิทธิภาพและถูกต้องตามหลักมาตรฐานสากลและกฎหมายไทย</p>
      </article>
    </div>
  );
}

import React, { useState } from 'react';
import { Calculator, ArrowRight, ArrowDown } from 'lucide-react';

export default function NganToRai({ lang }: any) {
  const [ngan, setNgan] = useState<number | ''>('');
  
  const rai = ngan !== '' ? ngan / 4 : '';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {lang === 'EN' ? 'Ngan to Rai Converter' : 'เครื่องมือแปลงงานเป็นไร่'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Ngan (งาน)' : 'จำนวนงาน'}
            </label>
            <input
              type="number"
              value={ngan}
              onChange={(e) => setNgan(e.target.value ? Number(e.target.value) : '')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder={lang === 'EN' ? 'Enter Ngan...' : 'ระบุจำนวนงาน...'}
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
              {lang === 'EN' ? 'Rai (ไร่)' : 'จำนวนไร่'}
            </label>
            <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-gray-900 min-h-[50px] flex items-center">
              {rai !== '' ? rai.toLocaleString(undefined, { maximumFractionDigits: 6 }) : '0'}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h2>การแปลงหน่วยพื้นที่จาก งาน เป็น ไร่ (Ngan to Rai)</h2>
        <p>นอกจากการแปลงหน่วยจากไร่เป็นงานแล้ว ในชีวิตประจำวันเรามักจะพบเจอสถานการณ์ที่ต้องแปลงพื้นที่จากหน่วย "งาน" กลับมาเป็นหน่วย "ไร่" เช่นเดียวกัน ตัวอย่างเช่น การรวมแปลงที่ดินหลายๆ แปลงที่มีขนาดเป็น "งาน" เข้าด้วยกัน หรือการคำนวณสัดส่วนที่ดินเพื่อใช้ในการกู้ยืมเงินและการจำนอง</p>
        
        <h3>4 งาน เท่ากับ 1 ไร่</h3>
        <p>ตามมาตรฐานการวัดพื้นที่ที่กรมที่ดินกำหนดไว้ <strong>4 งาน จะมีพื้นที่เท่ากับ 1 ไร่</strong> เสมอ ดังนั้นหากคุณมีที่ดินขนาด 1 งาน เมื่อเทียบกลับเป็นไร่ จะมีค่าเท่ากับ 1 หารด้วย 4 หรือ <strong>0.25 ไร่ (เศษหนึ่งส่วนสี่ไร่)</strong></p>
        <p>การเข้าใจการคำนวณแบบย้อนกลับนี้มีประโยชน์มาก เมื่อคุณต้องการทราบว่าที่ดินที่คุณมีอยู่เมื่อคำนวณรวมกันแล้ว จะถึงเกณฑ์ 1 ไร่หรือไม่ เพื่อประโยชน์ในการขอสินเชื่อเกษตรกรหรือการขอรับการสนับสนุนจากภาครัฐ</p>
        
        <h3>สถานการณ์ที่ต้องแปลง "งาน" เป็น "ไร่"</h3>
        <p>1. <strong>การรวมโฉนดที่ดิน:</strong> หากคุณมีโฉนดที่ดินหลายใบที่อยู่ติดกัน เช่น แปลงที่หนึ่งมีขนาด 2 งาน แปลงที่สองมีขนาด 3 งาน เมื่อรวมกันจะได้ 5 งาน คุณสามารถแปลงพื้นที่รวมทั้งหมดกลับเป็นหน่วยไร่ได้ โดยนำ 5 หาร 4 เท่ากับ 1.25 ไร่ หรือเท่ากับ 1 ไร่ 1 งาน</p>
        <p>2. <strong>การคิดอัตราภาษีที่ดิน:</strong> บางครั้งการคำนวณภาษีที่ดินและสิ่งปลูกสร้าง อาจมีการอ้างอิงขนาดพื้นที่รวมในหน่วยไร่ การที่เราทราบขนาดพื้นที่สุทธิในหน่วยไร่แบบทศนิยม จะทำให้การคำนวณภาษีด้วยเครื่องคิดเลขทำได้ง่ายขึ้น</p>
        <p>3. <strong>การเขียนรายงานหรือเอกสารราชการ:</strong> เอกสารราชการบางประเภทนิยมให้ระบุพื้นที่รวมเป็นทศนิยมของหน่วยไร่ เช่น 2.5 ไร่ แทนที่จะเขียนเป็น 2 ไร่ 2 งาน การแปลงหน่วยงานเป็นทศนิยมของไร่จึงเป็นเรื่องที่หลีกเลี่ยงไม่ได้</p>
        
        <h3>สูตรการแปลงหน่วยที่ดิน</h3>
        <p><strong>สูตร:</strong> จำนวนงาน &divide; 4 = จำนวนไร่</p>
        <p><strong>ตัวอย่างการคำนวณ:</strong></p>
        <ul>
          <li>ที่ดินขนาด 2 งาน = 2 &divide; 4 = 0.5 ไร่</li>
          <li>ที่ดินขนาด 6 งาน = 6 &divide; 4 = 1.5 ไร่</li>
          <li>ที่ดินขนาด 10 งาน = 10 &divide; 4 = 2.5 ไร่</li>
        </ul>
        
        <h3>เครื่องมือที่ช่วยให้ชีวิตคุณง่ายขึ้น</h3>
        <p>เพื่อลดความยุ่งยากในการหารเลข โดยเฉพาะเมื่อจำนวนงานเป็นทศนิยม (เช่น 1.5 งาน) คุณสามารถใช้เครื่องมือแปลงหน่วย "งานเป็นไร่" ของเราได้ทันที โปรแกรมจะประมวลผลทันทีที่คุณกรอกตัวเลข และแสดงผลลัพธ์ที่ถูกต้องออกมาเป็นจำนวนไร่แบบทศนิยม เป็นเครื่องมือที่สะดวก ใช้งานง่าย และเหมาะสำหรับทุกคนที่ต้องยุ่งเกี่ยวกับเอกสารที่ดินบ่อยๆ</p>
      </article>
    </div>
  );
}

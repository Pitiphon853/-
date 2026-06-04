'use client'

import React, { useState } from 'react';
import { Calculator, ArrowRight, ArrowDown } from 'lucide-react';

export default function SqFtToSqIn({ lang }: { lang: 'TH' | 'EN' }) {
  const [val, setVal] = useState<string>('');

  const num = parseFloat(val);
  // 1 sq ft = 144 sq in
  const result = isNaN(num) ? null : num * 144;

  const t = {
    title: lang === 'TH' ? 'แปลงตารางฟุตเป็นตารางนิ้ว' : 'Sq Ft to Sq In Converter',
    input: lang === 'TH' ? 'ตารางฟุต (sq ft)' : 'Square Feet (sq ft)',
    output: lang === 'TH' ? 'ตารางนิ้ว (sq in)' : 'Square Inches (sq in)',
    placeholder: lang === 'TH' ? 'ระบุค่า...' : 'Enter value...',
    resultLabel: lang === 'TH' ? 'ผลลัพธ์:' : 'Result:'
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8 flex flex-col">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-blue-600" />
          {t.title}
        </h1>
        
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-2/5">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.input}</label>
            <input
              type="number"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder={t.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-colors"
            />
          </div>
          
          <div className="hidden md:flex justify-center w-full md:w-1/5">
            <ArrowRight className="w-8 h-8 text-gray-400" />
          </div>
          <div className="md:hidden flex justify-center w-full my-2">
            <ArrowDown className="w-6 h-6 text-gray-400" />
          </div>

          <div className="w-full md:w-2/5">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.output}</label>
            <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-semibold min-h-[52px] flex items-center text-lg overflow-x-auto">
              {result !== null ? result.toLocaleString(undefined, { maximumFractionDigits: 6 }) : '-'}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-blue max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex-grow">
        <h2>แปลงตารางฟุตเป็นตารางนิ้ว (Square Feet to Square Inches) อย่างง่ายดาย</h2>
        <p>
          ในการทำงานช่าง การประดิษฐ์ งานไม้งานศิลปะ หรือแม้แต่โปรเจกต์ทำด้วยตัวเอง (DIY) รอบๆ บ้าน 
          การคำนวณพื้นที่และการแปลงหน่วยให้ถูกต้องเหมาะสมนับว่าเป็นก้าวสำคัญที่ช่วยให้ผลงานสำเร็จออกมาอย่างสมบูรณ์แบบ 
          บางครั้งคุณอาจมีข้อมูลขนาดไม้หรือกระดาษที่บอกเป็น "ตารางฟุต" แต่การออกแบบหรือการตัดชิ้นส่วนของคุณต้องใช้ความละเอียดในระดับ "ตารางนิ้ว"
        </p>
        <p>
          บทความนี้จะนำเสนอพื้นฐานง่ายๆ เกี่ยวกับการแปลงหน่วยจาก <strong>ตารางฟุต (Square Feet - sq ft)</strong> ไปเป็น <strong>ตารางนิ้ว (Square Inches - sq in)</strong> 
          ว่าทั้งสองหน่วยมีความเกี่ยวข้องกันอย่างไร และเหตุใดการแปลงตารางฟุตเป็นตารางนิ้วจึงมีสูตรที่หลายคนอาจเข้าใจผิด
        </p>

        <h3>ไขข้อข้องใจ: ตารางฟุตกับตารางนิ้ว</h3>
        <p>
          เรารู้กันดีอยู่แล้วจากระบบการวัดแบบอิมพีเรียล (Imperial System) ว่า 1 ฟุต มีความยาวเท่ากับ 12 นิ้ว 
          ซึ่งสัญชาตญาณแรกของหลายคนที่เพิ่งเริ่มคำนวณพื้นที่อาจคิดว่า 1 ตารางฟุตก็คงเท่ากับ 12 ตารางนิ้ว หรือเปล่า? คำตอบคือ <strong>ไม่ใช่ครับ!</strong>
        </p>
        <p>
          การวัดพื้นที่คือการหาผลคูณของสองมิติ (ความกว้าง &times; ความยาว) ลองจินตนาการถึงสี่เหลี่ยมจัตุรัสที่มีความยาวด้านละ 1 ฟุต 
          เนื่องจากแต่ละด้านยาว 1 ฟุต ซึ่งเทียบเท่ากับ 12 นิ้ว การหาพื้นที่ของสี่เหลี่ยมนี้ในหน่วยตารางนิ้วก็คือการนำ (12 นิ้ว) &times; (12 นิ้ว)
        </p>

        <h3>สูตรการคำนวณอย่างเป็นทางการ</h3>
        <p>
          จากหลักการทางเรขาคณิตด้านบน ทำให้เราได้สูตรการแปลงพื้นที่ระหว่างตารางฟุตและตารางนิ้วที่เป็นสากล ดังนี้:
        </p>
        <blockquote className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-4">
          <p className="font-semibold text-blue-900 m-0">1 ตารางฟุต (sq ft) = 144 ตารางนิ้ว (sq in)</p>
        </blockquote>
        <p>
          เมื่อใดก็ตามที่คุณต้องการแปลงตารางฟุตเป็นตารางนิ้ว คุณเพียงแค่นำตัวเลขตารางฟุตตั้ง แล้วคูณด้วย 144 เท่านั้นเอง
        </p>

        <h3>ตัวอย่างการนำไปใช้จริง</h3>
        <p>
          <strong>ตัวอย่างที่ 1: งานฝีมือและงานผ้า</strong><br />
          สมมติคุณมีแผ่นผ้าขนาด 2 ตารางฟุต และต้องการตัดผ้าใบนี้ให้เป็นชิ้นเล็กๆ ชิ้นละ 1 ตารางนิ้ว คุณจะได้ชิ้นผ้าทั้งหมดกี่ชิ้น?<br />
          วิธีคิด: นำ 2 ตารางฟุต &times; 144 = 288 ตารางนิ้ว<br />
          ดังนั้น คุณจะได้ชิ้นผ้าขนาด 1 ตารางนิ้ว ทั้งหมด 288 ชิ้น
        </p>
        <p>
          <strong>ตัวอย่างที่ 2: งานติดตั้งสติกเกอร์หรือกระเบื้องโมเสก</strong><br />
          หากคุณต้องการปูกระเบื้องโมเสกบนโต๊ะที่มีพื้นที่ 5.5 ตารางฟุต 
          คุณจะต้องการแผ่นกระเบื้องโมเสกที่รวมกันแล้วมีพื้นที่กี่ตารางนิ้ว?<br />
          วิธีคิด: นำ 5.5 &times; 144 = 792 ตารางนิ้ว
        </p>

        <h3>ทำไมถึงต้องใช้เครื่องคิดเลขออนไลน์?</h3>
        <p>
          แม้ว่าการคูณด้วย 144 จะดูไม่ใช่เรื่องยาก แต่เมื่อคุณต้องทำงานกับตัวเลขทศนิยมหลายๆ หลัก หรือต้องทำการแปลงค่ากลับไปกลับมาอย่างต่อเนื่อง 
          การคิดในใจหรือใช้กระดาษทดอาจจะทำให้เสียเวลาและมีความเสี่ยงที่จะผิดพลาดได้ เครื่องมือแปลงหน่วยตารางฟุตเป็นตารางนิ้วแบบออนไลน์ที่เราเตรียมไว้ให้ 
          จึงออกแบบมาเพื่อตอบสนองความรวดเร็วและแม่นยำสูง
        </p>
        <p>
          นอกจากงานช่างและงาน DIY แล้ว การเข้าใจสูตร 1 ตารางฟุต = 144 ตารางนิ้ว ยังมีประโยชน์ในการเรียนรู้วิทยาศาสตร์ คณิตศาสตร์ และฟิสิกส์ 
          เช่น การคำนวณความดัน (Pound per Square Inch หรือ PSI) ก็จำเป็นต้องเข้าใจพื้นฐานการวัดพื้นที่ในหน่วยตารางนิ้วเป็นอย่างดีเช่นกัน 
          เราหวังว่าเครื่องมือนี้จะเป็นประโยชน์ในการประหยัดเวลาการทำงานให้กับทุกท่าน
        </p>
      </article>
    </div>
  );
}

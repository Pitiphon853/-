'use client'

import React, { useState } from 'react';
import { Calculator, ArrowRight, ArrowDown } from 'lucide-react';

export default function SqYdToSqM({ lang }: { lang: 'TH' | 'EN' }) {
  const [val, setVal] = useState<string>('');

  const num = parseFloat(val);
  // 1 sq yard = 0.83612736 sq meters
  const result = isNaN(num) ? null : num * 0.83612736;

  const t = {
    title: lang === 'TH' ? 'แปลงตารางหลาเป็นตารางเมตร' : 'Sq Yd to Sq m Converter',
    input: lang === 'TH' ? 'ตารางหลา (sq yd)' : 'Square Yards (sq yd)',
    output: lang === 'TH' ? 'ตารางเมตร (sq m)' : 'Square Meters (sq m)',
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
        <h2>คู่มือการแปลงตารางหลาเป็นตารางเมตร (Square Yards to Square Meters)</h2>
        <p>
          ในการวัดพื้นที่สำหรับการปูพื้น สนามหญ้า สิ่งทอ หรือพรม คุณอาจเคยพบกับหน่วยวัดพื้นผิวที่เรียกว่า <strong>"ตารางหลา" (Square Yards - sq yd)</strong> 
          ซึ่งเป็นหน่วยวัดในระบบอิมพีเรียลที่ยังคงถูกใช้อย่างแพร่หลายในสหรัฐอเมริกาและสหราชอาณาจักร ในทางกลับกัน 
          ประเทศส่วนใหญ่ทั่วโลกรวมถึงประเทศไทย กลับคุ้นเคยและใช้ <strong>"ตารางเมตร" (Square Meters - sq m)</strong> ในระบบเมตริกเป็นมาตรฐานหลัก
        </p>
        <p>
          การทราบวิธีการแปลงหน่วยระหว่างตารางหลาและตารางเมตร ถือเป็นเรื่องจำเป็นอย่างยิ่ง โดยเฉพาะสำหรับผู้ที่ทำงานเกี่ยวกับการนำเข้าส่งออกวัสดุ 
          การออกแบบภายใน งานภูมิทัศน์จัดสวน หรือแม้แต่การซื้อของออนไลน์ที่ระบุขนาดสินค้าเป็นหน่วยจากฝั่งอเมริกา
        </p>

        <h3>รู้จักกับตารางหลา (Square Yard)</h3>
        <p>
          หลา (Yard) เป็นหน่วยความยาวในระบบอิมพีเรียล โดย 1 หลา เท่ากับ 3 ฟุต หรือ 36 นิ้ว 
          เมื่อพูดถึง "ตารางหลา" จะหมายถึงพื้นที่ของสี่เหลี่ยมจัตุรัสที่มีความยาวแต่ละด้านเท่ากับ 1 หลา 
          หน่วยนี้มักถูกนำไปใช้ในบริบทของการวัดขนาดพรมปูพื้น ขนาดสนามกอล์ฟ หรือขนาดที่ดินบางประเภทในบางประเทศ
        </p>

        <h3>รู้จักกับตารางเมตร (Square Meter)</h3>
        <p>
          ตารางเมตร คือหน่วยวัดพื้นที่พื้นฐานในระบบ SI (International System of Units) ซึ่งหมายถึงสี่เหลี่ยมจัตุรัสที่มีขนาดกว้างและยาวด้านละ 1 เมตร 
          หน่วยตารางเมตรถูกใช้อย่างเป็นทางการในเอกสารราชการ การคำนวณพื้นที่บ้าน คอนโด หรือพื้นที่พาณิชยกรรมในประเทศไทย 
          ตลอดจนข้อมูลในวงการวิทยาศาสตร์และสถาปัตยกรรมระดับสากล
        </p>

        <h3>สูตรและวิธีแปลงตารางหลาเป็นตารางเมตร</h3>
        <p>
          ความสัมพันธ์ระหว่างหลากับเมตรคือ 1 หลา เท่ากับ 0.9144 เมตร ด้วยเหตุนี้ เมื่อนำมายกกำลังสองเพื่อหาพื้นที่ จึงได้สูตรการแปลงดังนี้:
        </p>
        <blockquote className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-4">
          <p className="font-semibold text-blue-900 m-0">1 ตารางหลา (sq yd) = 0.83612736 ตารางเมตร (sq m)</p>
        </blockquote>
        <p>
          ในการแปลงพื้นที่จากตารางหลาไปเป็นตารางเมตร คุณเพียงแค่นำตัวเลขขนาดพื้นที่ในหน่วยตารางหลาที่คุณมี มาคูณด้วย 0.83612736
        </p>

        <h3>ตัวอย่างการนำไปใช้จริง</h3>
        <p>
          <strong>ตัวอย่างที่ 1: การสั่งซื้อพรมปูพื้น</strong><br />
          สมมติคุณสั่งพรมนำเข้าจากต่างประเทศระบุว่ามีขนาด 20 ตารางหลา คุณอยากรู้ว่าพรมนี้จะครอบคลุมพื้นที่กี่ตารางเมตรในบ้านคุณ?<br />
          การคำนวณ: 20 &times; 0.83612736 = 16.7225472<br />
          สรุปได้ว่า พรมผืนนี้มีขนาดพื้นที่ประมาณ 16.72 ตารางเมตร
        </p>
        <p>
          <strong>ตัวอย่างที่ 2: งานจัดสวนและปูหญ้าเทียม</strong><br />
          หากคุณอ่านเจอบทความเกี่ยวกับการจัดสวนแนะนำให้ใช้หญ้าเทียมจำนวน 50 ตารางหลา สำหรับพื้นที่สวนหน้าบ้าน<br />
          การคำนวณ: 50 &times; 0.83612736 = 41.806368<br />
          คุณก็จะทราบทันทีว่า ต้องหาซื้อหญ้าเทียมในประเทศไทยประมาณ 42 ตารางเมตรถึงจะเพียงพอ
        </p>

        <h3>ความสำคัญและข้อสรุป</h3>
        <p>
          แม้ว่าในปัจจุบันเราจะมีสมาร์ทโฟนที่ช่วยกดเครื่องคิดเลขได้อย่างรวดเร็ว แต่การเข้าใจสูตรและค่าคงที่ในการแปลงหน่วยพื้นที่ ก็ทำให้เรารู้ถึงที่มาที่ไปของขนาดพื้นที่อย่างถูกต้อง 
          เครื่องมือคำนวณออนไลน์ที่เราออกแบบมานี้ สามารถช่วยให้คุณประหยัดเวลา ป้องกันความผิดพลาดในการป้อนตัวเลขทศนิยมยาวๆ และแสดงผลลัพธ์ได้อย่างแม่นยำ 
          ทำให้กระบวนการทำงานหรือการคำนวณงบประมาณเกี่ยวกับวัสดุปูพื้นของคุณเป็นไปอย่างราบรื่นและมีประสิทธิภาพสูงสุด
        </p>
      </article>
    </div>
  );
}

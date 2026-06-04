"use client";

import React, { useState } from 'react';
import { Calculator, ArrowRight, RefreshCw, Info } from 'lucide-react';

export default function SqmToSqyd({ lang = 'th' }: any) {
  const [sqm, setSqm] = useState<string>('');
  const [sqyd, setSqyd] = useState<string>('');

  const CONVERSION_RATE = 1.19599005;

  const handleSqmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSqm(val);
    if (!isNaN(Number(val)) && val !== '') {
      setSqyd((Number(val) * CONVERSION_RATE).toFixed(6).replace(/\.?0+$/, ''));
    } else {
      setSqyd('');
    }
  };

  const handleSqydChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSqyd(val);
    if (!isNaN(Number(val)) && val !== '') {
      setSqm((Number(val) / CONVERSION_RATE).toFixed(6).replace(/\.?0+$/, ''));
    } else {
      setSqm('');
    }
  };

  const clearValues = () => {
    setSqm('');
    setSqyd('');
  };

  const isTh = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-8">
      {/* Calculator Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600" />
            {isTh ? 'โปรแกรมแปลงตารางเมตรเป็นตารางหลา' : 'Square Meter to Square Yard Converter'}
          </h2>
          <p className="text-gray-500 mt-2">
            {isTh ? 'แปลงหน่วยพื้นที่จากตารางเมตร (m²) เป็นตารางหลา (sq.yd)' : 'Convert area from square meters (m²) to square yards (sq.yd)'}
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            
            {/* Sqm Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isTh ? 'ตารางเมตร (m²)' : 'Square Meters (m²)'}
              </label>
              <input
                type="number"
                value={sqm}
                onChange={handleSqmChange}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Icon */}
            <div className="flex justify-center md:pt-6">
              <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />
              <div className="md:hidden flex space-x-2 text-gray-400">
                <ArrowRight className="w-6 h-6 rotate-90" />
              </div>
            </div>

            {/* Sqyd Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isTh ? 'ตารางหลา (sq.yd)' : 'Square Yards (sq.yd)'}
              </label>
              <input
                type="number"
                value={sqyd}
                onChange={handleSqydChange}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={clearValues}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              {isTh ? 'ล้างค่า' : 'Clear'}
            </button>
          </div>
        </div>
      </div>

      {/* Article Section */}
      <article className="prose prose-blue max-w-none text-gray-700 space-y-6">
        <section className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            ตารางเมตร (m²) และ ตารางหลา (sq.yd): ความรู้เกี่ยวกับการแปลงหน่วยพื้นที่
          </h3>
          <p>
            เรื่องของหน่วยวัดพื้นที่นั้นมีความหลากหลายและแตกต่างกันไปตามแต่ละภูมิภาคและระบบการวัด สำหรับระบบเมตริก (Metric System) ซึ่งเป็นที่นิยมในระดับสากล จะใช้ <strong>ตารางเมตร (Square Meter - m²)</strong> เป็นหน่วยมาตรฐานในการวัดพื้นที่ ในขณะเดียวกัน สำหรับระบบอิมพีเรียล (Imperial System) ที่มีประวัติศาสตร์ยาวนานและยังคงใช้อยู่ในบางประเทศ เช่น สหราชอาณาจักร หรือในวงการสิ่งทอ จะใช้ <strong>ตารางหลา (Square Yard - sq.yd)</strong> ด้วยเหตุนี้ การรู้วิธีแปลงหน่วยระหว่างตารางเมตรและตารางหลาจึงมีประโยชน์อย่างมากในหลายสถานการณ์
          </p>
          <p>
            <strong>ตารางเมตร (m²)</strong> เป็นพื้นที่ของรูปสี่เหลี่ยมจัตุรัสที่มีความยาวด้านละ 1 เมตร เป็นหน่วยวัดพื้นที่หลักที่ใช้ในชีวิตประจำวันทั่วไป ไม่ว่าจะเป็นขนาดของที่ดิน บ้าน หรือห้องพัก 
            ส่วน <strong>ตารางหลา (sq.yd)</strong> คือพื้นที่ของสี่เหลี่ยมจัตุรัสที่มีความยาวด้านละ 1 หลา (ซึ่ง 1 หลา เท่ากับ 3 ฟุต หรือ 36 นิ้ว หรือประมาณ 0.9144 เมตร) ดังนั้น 1 ตารางหลา จึงมีขนาดเล็กกว่า 1 ตารางเมตรเล็กน้อย
          </p>

          <div className="bg-white p-4 rounded-md shadow-sm my-4 border-l-4 border-blue-500">
            <h4 className="font-semibold text-gray-800 mb-2">อัตราการแปลงหน่วยพื้นฐาน</h4>
            <p className="font-mono text-lg text-center text-blue-700 my-2">
              1 ตารางเมตร (m²) ≈ 1.196 ตารางหลา (sq.yd)
            </p>
            <p className="font-mono text-lg text-center text-blue-700 my-2">
              1 ตารางหลา (sq.yd) ≈ 0.836 ตารางเมตร (m²)
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm mt-3">
              <li><strong>แปลงตารางเมตร เป็น ตารางหลา:</strong> นำค่าตารางเมตรไปคูณด้วย 1.19599</li>
              <li><strong>แปลงตารางหลา เป็น ตารางเมตร:</strong> นำค่าตารางหลาไปคูณด้วย 0.836127</li>
            </ul>
          </div>

          <h4 className="text-lg font-bold text-gray-800 mt-6 mb-3">ประโยชน์ของการแปลงหน่วยตารางเมตรเป็นตารางหลา</h4>
          <p>
            แม้ว่าประเทศไทยจะไม่ได้ใช้หน่วย "ตารางหลา" ในการบอกขนาดของที่ดิน (ไทยนิยมใช้ ตารางวา งาน และ ไร่) แต่เรามักจะพบเห็นหน่วยนี้ได้บ่อยในอุตสาหกรรมเฉพาะทาง เช่น อุตสาหกรรมสิ่งทอ พรมปูพื้น ผ้าม่าน หรือวัสดุตกแต่งภายในบางประเภทที่มีการนำเข้าหรือส่งออกต่างประเทศ การสั่งซื้อผ้าม้วนขนาดใหญ่ หรือพรมจากต่างประเทศ บางครั้งซัพพลายเออร์จะระบุขนาดเป็นตารางหลา
          </p>
          <p>
            หากคุณเป็นผู้ประกอบการ ผู้ออกแบบตกแต่งภายใน หรือแม้แต่บุคคลทั่วไปที่กำลังจะปูพรมหรือหญ้าเทียมใหม่ที่บ้าน การแปลงหน่วยเหล่านี้จากตารางเมตร (ซึ่งคุณวัดจากหน้างาน) เป็นตารางหลา (เพื่อใช้สั่งซื้อ) อย่างถูกต้อง จะช่วยให้คุณประเมินปริมาณวัสดุที่ต้องใช้ได้อย่างแม่นยำ ไม่สั่งซื้อขาดหรือเกินความจำเป็น ช่วยลดต้นทุนได้อย่างมีนัยสำคัญ
          </p>
          <p>
            เพื่อลดความยุ่งยากในการคำนวณและป้องกันความผิดพลาด คุณสามารถใช้ <strong>โปรแกรมแปลงตารางเมตรเป็นตารางหลา</strong> แบบออนไลน์บนเว็บไซต์ของเราได้ฟรี ระบบทำงานด้วยความรวดเร็วและแม่นยำสูง เพียงแค่คุณป้อนตัวเลขพื้นที่ที่ต้องการทราบ ระบบจะแปลงค่ากลับไปกลับมาให้ทันที ทำให้การทำงานในชีวิตประจำวันของคุณสะดวกและรวดเร็วมากยิ่งขึ้น
          </p>
        </section>
      </article>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import { Calculator, ArrowRight, RefreshCw, Info } from 'lucide-react';

export default function SqmToSqft({ lang = 'th' }: any) {
  const [sqm, setSqm] = useState<string>('');
  const [sqft, setSqft] = useState<string>('');

  const CONVERSION_RATE = 10.7639104;

  const handleSqmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSqm(val);
    if (!isNaN(Number(val)) && val !== '') {
      setSqft((Number(val) * CONVERSION_RATE).toFixed(6).replace(/\.?0+$/, ''));
    } else {
      setSqft('');
    }
  };

  const handleSqftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSqft(val);
    if (!isNaN(Number(val)) && val !== '') {
      setSqm((Number(val) / CONVERSION_RATE).toFixed(6).replace(/\.?0+$/, ''));
    } else {
      setSqm('');
    }
  };

  const clearValues = () => {
    setSqm('');
    setSqft('');
  };

  const isTh = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-8">
      {/* Calculator Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600" />
            {isTh ? 'โปรแกรมแปลงตารางเมตรเป็นตารางฟุต' : 'Square Meter to Square Foot Converter'}
          </h2>
          <p className="text-gray-500 mt-2">
            {isTh ? 'แปลงหน่วยพื้นที่จากตารางเมตร (m²) เป็นตารางฟุต (sq.ft)' : 'Convert area from square meters (m²) to square feet (sq.ft)'}
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

            {/* Sqft Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isTh ? 'ตารางฟุต (sq.ft)' : 'Square Feet (sq.ft)'}
              </label>
              <input
                type="number"
                value={sqft}
                onChange={handleSqftChange}
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
            การแปลงหน่วยพื้นที่: ตารางเมตร (m²) และ ตารางฟุต (sq.ft)
          </h3>
          <p>
            ในยุคโลกาภิวัตน์ที่การเชื่อมต่อระหว่างประเทศเป็นเรื่องง่าย การทำความเข้าใจหน่วยวัดที่แตกต่างกันระหว่างระบบเมตริก (Metric System) และระบบอิมพีเรียล (Imperial System) จึงทวีความสำคัญมากขึ้น โดยเฉพาะในเรื่องของอสังหาริมทรัพย์ การก่อสร้าง และสถาปัตยกรรม การแปลงหน่วยระหว่าง <strong>ตารางเมตร (Square Meter - m²)</strong> ซึ่งนิยมใช้ในประเทศไทยและหลายประเทศทั่วโลก กับ <strong>ตารางฟุต (Square Foot - sq.ft)</strong> ซึ่งนิยมใช้ในประเทศสหรัฐอเมริกา สหราชอาณาจักร และประเทศอื่นๆ บางส่วน จึงเป็นสิ่งที่เราพบเจอได้บ่อยครั้ง
          </p>
          <p>
            <strong>ตารางเมตร (m²)</strong> เป็นหน่วยวัดพื้นที่ในระบบ SI (International System of Units) โดยกำหนดว่า 1 ตารางเมตร คือพื้นที่ของสี่เหลี่ยมจัตุรัสที่มีความกว้างและความยาวด้านละ 1 เมตร หน่วยนี้ใช้เป็นมาตรฐานสากลในการระบุพื้นที่ของบ้าน คอนโดมิเนียม และที่ดิน ในขณะที่ <strong>ตารางฟุต (sq.ft)</strong> เป็นหน่วยวัดพื้นที่ในระบบอิมพีเรียลและหน่วยจารีตประเพณีของสหรัฐฯ โดย 1 ตารางฟุต คือพื้นที่ของสี่เหลี่ยมจัตุรัสที่มีความกว้างและความยาวด้านละ 1 ฟุต (หรือ 12 นิ้ว)
          </p>

          <div className="bg-white p-4 rounded-md shadow-sm my-4 border-l-4 border-blue-500">
            <h4 className="font-semibold text-gray-800 mb-2">อัตราส่วนการแปลงหน่วยที่สำคัญ</h4>
            <p className="font-mono text-lg text-center text-blue-700 my-2">
              1 ตารางเมตร (m²) ≈ 10.7639 ตารางฟุต (sq.ft)
            </p>
            <p className="font-mono text-lg text-center text-blue-700 my-2">
              1 ตารางฟุต (sq.ft) ≈ 0.0929 ตารางเมตร (m²)
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm mt-3">
              <li><strong>หากมีพื้นที่เป็นตารางเมตร:</strong> ต้องการแปลงเป็นตารางฟุต ให้นำค่าตารางเมตรไปคูณด้วย 10.7639</li>
              <li><strong>หากมีพื้นที่เป็นตารางฟุต:</strong> ต้องการแปลงเป็นตารางเมตร ให้นำค่าตารางฟุตไปหารด้วย 10.7639 (หรือคูณด้วย 0.0929)</li>
            </ul>
          </div>

          <h4 className="text-lg font-bold text-gray-800 mt-6 mb-3">เมื่อใดที่คุณจำเป็นต้องแปลงหน่วยตารางเมตรเป็นตารางฟุต?</h4>
          <p>
            การแปลงหน่วยระหว่างตารางเมตรและตารางฟุตมักเกิดขึ้นเมื่อคุณต้องการซื้อ ขาย หรือเช่าอสังหาริมทรัพย์ที่มีการเสนอข้อมูลเป็นหน่วยที่ต่างไปจากที่คุณคุ้นเคย ตัวอย่างเช่น การเช่าพื้นที่สำนักงานของบริษัทข้ามชาติในไทย ที่ทางบริษัทแม่อาจต้องการข้อมูลเป็นตารางฟุตเพื่อให้สอดคล้องกับมาตรฐานการประเมินงบประมาณขององค์กร หรือหากคุณกำลังพิจารณาซื้อคอนโดมิเนียมในต่างประเทศ เช่น ในสหรัฐอเมริกาหรืออังกฤษ พื้นที่ส่วนใหญ่จะถูกระบุเป็นตารางฟุต การแปลงกลับมาเป็นตารางเมตรจะช่วยให้คุณจินตนาการขนาดที่แท้จริงได้ง่ายขึ้นเมื่อเทียบกับบ้านหรือที่พักที่คุณเคยอาศัยอยู่ในไทย
          </p>
          <p>
            นอกจากนี้ ในวงการออกแบบภายใน การสั่งซื้อเฟอร์นิเจอร์ หรือวัสดุปูพื้นนำเข้าจากต่างประเทศ เช่น พรม หรือไม้พื้นลามิเนต สินค้าบางชนิดอาจขายและระบุขนาดเป็นตารางฟุต การคำนวณที่แม่นยำจะช่วยลดความผิดพลาดในการสั่งซื้อวัสดุ ช่วยประหยัดทั้งเวลาและค่าใช้จ่าย
          </p>
          <p>
            เพื่อให้การคำนวณของคุณง่าย สะดวก และแม่นยำที่สุด คุณสามารถใช้งานโปรแกรมแปลงหน่วยตารางเมตรเป็นตารางฟุตของเราได้ฟรี ไม่ต้องจำสูตรคำนวณที่ซับซ้อน เพียงแค่กรอกตัวเลข ระบบจะแสดงผลลัพธ์การคำนวณที่แม่นยำในระดับทศนิยมทันที เครื่องมือนี้ออกแบบมาให้ใช้งานง่ายบนทุกอุปกรณ์ พร้อมตอบโจทย์ทุกความต้องการทางคณิตศาสตร์ในชีวิตประจำวันของคุณ
          </p>
        </section>
      </article>
    </div>
  );
}

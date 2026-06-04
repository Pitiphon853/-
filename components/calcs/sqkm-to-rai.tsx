"use client";

import React, { useState } from 'react';
import { Calculator, ArrowRight, RefreshCw, Info } from 'lucide-react';

export default function SqkmToRai({ lang = 'th' }: any) {
  const [sqkm, setSqkm] = useState<string>('');
  const [rai, setRai] = useState<string>('');

  const CONVERSION_RATE = 625; // 1 sq.km = 625 rai

  const handleSqkmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSqkm(val);
    if (!isNaN(Number(val)) && val !== '') {
      setRai((Number(val) * CONVERSION_RATE).toString());
    } else {
      setRai('');
    }
  };

  const handleRaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRai(val);
    if (!isNaN(Number(val)) && val !== '') {
      setSqkm((Number(val) / CONVERSION_RATE).toString());
    } else {
      setSqkm('');
    }
  };

  const clearValues = () => {
    setSqkm('');
    setRai('');
  };

  const isTh = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-8">
      {/* Calculator Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600" />
            {isTh ? 'โปรแกรมแปลงตารางกิโลเมตรเป็นไร่' : 'Square Kilometer to Rai Converter'}
          </h2>
          <p className="text-gray-500 mt-2">
            {isTh ? 'แปลงหน่วยพื้นที่จากตารางกิโลเมตร (km²) เป็น ไร่ (Rai)' : 'Convert area from square kilometers (km²) to rai'}
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            
            {/* Sqkm Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isTh ? 'ตารางกิโลเมตร (km²)' : 'Square Kilometers (km²)'}
              </label>
              <input
                type="number"
                value={sqkm}
                onChange={handleSqkmChange}
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

            {/* Rai Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isTh ? 'ไร่ (Rai)' : 'Rai'}
              </label>
              <input
                type="number"
                value={rai}
                onChange={handleRaiChange}
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
            การแปลงพื้นที่: จาก ตารางกิโลเมตร (km²) เป็น ไร่
          </h3>
          <p>
            การสื่อสารเรื่องขนาดพื้นที่ระหว่างหน่วยสากลและหน่วยไทยท้องถิ่น เป็นเรื่องที่พบเจอได้บ่อยมากในประเทศไทย โดยเฉพาะอย่างยิ่งเมื่อต้องทำความเข้าใจแผนที่ระดับมหภาค ข่าวเกี่ยวกับพื้นที่ป่าไม้ อุทยานแห่งชาติ หรือเขตการปกครองต่างๆ ซึ่งมักจะระบุเป็น <strong>ตารางกิโลเมตร (Square Kilometer)</strong> ในขณะที่ประชาชนคนไทยส่วนใหญ่มีความคุ้นเคยกับการประเมินขนาดพื้นที่เป็น <strong>ไร่ (Rai)</strong> มากกว่า
          </p>
          <p>
            <strong>ตารางกิโลเมตร (km²)</strong> คือหน่วยวัดพื้นที่ในระบบเมตริก ซึ่งเป็นที่ยอมรับและใช้งานในระดับสากล เหมาะสำหรับใช้วัดพื้นที่บริเวณกว้างขวางระดับประเทศหรือจังหวัด ส่วน <strong>ไร่</strong> เป็นหน่วยวัดพื้นที่แบบไทยดั้งเดิมที่ใช้กันอย่างแพร่หลายมาตั้งแต่ในอดีตจนถึงปัจจุบัน โดยเฉพาะในเรื่องของเกษตรกรรม การซื้อขายที่ดิน และอสังหาริมทรัพย์
          </p>

          <div className="bg-white p-4 rounded-md shadow-sm my-4 border-l-4 border-blue-500">
            <h4 className="font-semibold text-gray-800 mb-2">ที่มาและสูตรการแปลง ตารางกิโลเมตร ➔ ไร่</h4>
            <ul className="list-disc list-inside space-y-1 text-sm mb-3">
              <li>เราทราบว่า 1 ตารางกิโลเมตร = 1,000,000 ตารางเมตร</li>
              <li>และตามมาตราวัดพื้นที่ไทย 1 ไร่ = 1,600 ตารางเมตร</li>
              <li>เมื่อนำ 1,000,000 มาหารด้วย 1,600 จะได้ผลลัพธ์เป็น 625</li>
            </ul>
            <p className="font-mono text-xl text-center text-blue-700 my-2 font-bold">
              1 ตารางกิโลเมตร (km²) = 625 ไร่
            </p>
            <p className="text-sm mt-3">
              <strong>วิธีคิดแบบง่ายๆ:</strong>
              <br/>- หากมีพื้นที่เป็น ตารางกิโลเมตร ต้องการแปลงเป็น ไร่ : ให้นำตัวเลขนั้น <strong>คูณด้วย 625</strong>
              <br/>- หากมีพื้นที่เป็น ไร่ ต้องการแปลงกลับเป็น ตารางกิโลเมตร : ให้นำตัวเลขนั้น <strong>หารด้วย 625</strong>
            </p>
          </div>

          <h4 className="text-lg font-bold text-gray-800 mt-6 mb-3">ทำไมจึงต้องแปลงตารางกิโลเมตรเป็นไร่?</h4>
          <p>
            เหตุผลหลักคือ <strong>"ความคุ้นเคยและการมองเห็นภาพที่ชัดเจน"</strong> (Visualization) คนไทยจำนวนมากสามารถจินตนาการขนาดของที่ดิน 10 ไร่ หรือ 100 ไร่ ออกว่ามีขนาดประมาณไหน แต่เมื่อได้ยินคำว่า "พื้นที่ป่าอนุรักษ์ 4 ตารางกิโลเมตร" อาจจะรู้สึกนึกภาพไม่ออก แต่ถ้าเราแปลงด้วยการนำ 4 ไปคูณ 625 จะได้เท่ากับ "2,500 ไร่" ซึ่งจะทำให้เห็นภาพความกว้างใหญ่ไพศาลได้ชัดเจนกว่ามาก
          </p>
          <p>
            นอกจากนี้ ในเชิงนโยบายของรัฐหรือโครงการพัฒนาขนาดใหญ่ เช่น การสร้างนิคมอุตสาหกรรม หรือเขตเศรษฐกิจพิเศษ (EEC) เอกสารราชการในระดับประเทศอาจระบุตัวเลขรวมเป็นตารางกิโลเมตร แต่เมื่อนักลงทุนหรือเกษตรกรในพื้นที่เข้ามามีส่วนร่วม พวกเขาจำเป็นต้องแปลงข้อมูลกลับมาเป็น "ไร่" เพื่อประเมินมูลค่าที่ดิน ราคาประเมิน หรือความคุ้มค่าในการลงทุนได้อย่างเป็นรูปธรรมมากที่สุด
          </p>
          <p>
            เครื่องมือ <strong>โปรแกรมแปลงตารางกิโลเมตรเป็นไร่</strong> ออนไลน์ของเรา จึงถูกออกแบบมาเพื่อเป็นผู้ช่วยที่ดีที่สุดสำหรับคุณ สามารถคำนวณผลลัพธ์ได้แม่นยำ ไม่ต้องจำสูตร ไม่ต้องกลัวคิดเลขผิด พิมพ์ตัวเลขปุ๊บรู้ผลปั๊บ ใช้งานฟรีตลอด 24 ชั่วโมง ช่วยให้ทุกเรื่องที่ดินและพื้นที่เป็นเรื่องง่ายสำหรับทุกคน
          </p>
        </section>
      </article>
    </div>
  );
}

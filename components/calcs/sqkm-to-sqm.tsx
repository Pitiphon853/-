"use client";

import React, { useState } from 'react';
import { Calculator, ArrowRight, RefreshCw, Info } from 'lucide-react';

export default function SqkmToSqm({ lang = 'th' }: any) {
  const [sqkm, setSqkm] = useState<string>('');
  const [sqm, setSqm] = useState<string>('');

  const handleSqkmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSqkm(val);
    if (!isNaN(Number(val)) && val !== '') {
      setSqm((Number(val) * 1000000).toString());
    } else {
      setSqm('');
    }
  };

  const handleSqmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSqm(val);
    if (!isNaN(Number(val)) && val !== '') {
      setSqkm((Number(val) / 1000000).toString());
    } else {
      setSqkm('');
    }
  };

  const clearValues = () => {
    setSqkm('');
    setSqm('');
  };

  const isTh = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-8">
      {/* Calculator Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600" />
            {isTh ? 'โปรแกรมแปลงตารางกิโลเมตรเป็นตารางเมตร' : 'Square Kilometer to Square Meter Converter'}
          </h2>
          <p className="text-gray-500 mt-2">
            {isTh ? 'แปลงหน่วยพื้นที่จากตารางกิโลเมตร (km²) เป็นตารางเมตร (m²)' : 'Convert area from square kilometers (km²) to square meters (m²)'}
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
            การแปลงพื้นที่ขนาดใหญ่: จาก ตารางกิโลเมตร (km²) สู่ ตารางเมตร (m²)
          </h3>
          <p>
            การวัดพื้นที่บนโลกของเรานั้น มีหน่วยวัดหลากหลายให้เลือกใช้ตามความเหมาะสมของขนาดพื้นที่นั้นๆ ในระบบเมตริก (Metric System) ที่เป็นมาตรฐานสากล <strong>ตารางกิโลเมตร (Square Kilometer - km²)</strong> และ <strong>ตารางเมตร (Square Meter - m²)</strong> ถือเป็นหน่วยที่สำคัญที่สุดสองหน่วย โดยมีความสัมพันธ์กันอย่างแนบแน่น การเข้าใจวิธีการแปลงหน่วยระหว่างกันจึงเป็นเรื่องพื้นฐานที่จำเป็น ทั้งในเชิงวิชาการ การสำรวจ และการนำไปประยุกต์ใช้ในชีวิตจริง
          </p>
          <p>
            <strong>ตารางกิโลเมตร (km²)</strong> นิยมใช้ในการแสดงขนาดพื้นที่บริเวณกว้างขวางระดับมหภาค เช่น ขนาดของประเทศ ขนาดพื้นที่อุทยานแห่งชาติ แหล่งน้ำ หรือเขตการปกครองระดับจังหวัด ในขณะที่ <strong>ตารางเมตร (m²)</strong> มักนำไปใช้อธิบายพื้นที่ที่มีความละเอียดอ่อนกว่าและมีขนาดเล็กลงมา เช่น ขนาดที่ดินเพื่อการปลูกสร้าง พื้นที่ใช้สอยในอาคาร หรือขนาดของแปลงเกษตรกรรมย่อยๆ
          </p>

          <div className="bg-white p-4 rounded-md shadow-sm my-4 border-l-4 border-blue-500">
            <h4 className="font-semibold text-gray-800 mb-2">อัตราส่วนการแปลง</h4>
            <p className="font-mono text-lg text-center text-blue-700 my-2">
              1 ตารางกิโลเมตร (km²) = 1,000,000 ตารางเมตร (m²)
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm mt-3">
              <li>เราทราบดีว่า 1 กิโลเมตร เท่ากับ 1,000 เมตร</li>
              <li>พื้นที่สี่เหลี่ยมจัตุรัสขนาด 1 ตารางกิโลเมตร จึงเท่ากับ (1,000 เมตร) x (1,000 เมตร)</li>
              <li>ดังนั้น <strong>หากต้องการแปลง ตารางกิโลเมตร เป็น ตารางเมตร</strong> ให้คูณด้วย 1,000,000 เสมอ</li>
              <li>ในทางกลับกัน <strong>หากต้องการแปลง ตารางเมตร เป็น ตารางกิโลเมตร</strong> ให้หารด้วย 1,000,000</li>
            </ul>
          </div>

          <h4 className="text-lg font-bold text-gray-800 mt-6 mb-3">ทำไมถึงต้องมีการแปลงหน่วยตารางกิโลเมตรเป็นตารางเมตร?</h4>
          <p>
            ลองจินตนาการว่าคุณได้รับข้อมูลเกี่ยวกับพื้นที่ป่าไม้ระดับชุมชนแห่งหนึ่งว่ามีขนาด 5 ตารางกิโลเมตร สำหรับคนทั่วไปอาจจะนึกภาพความกว้างใหญ่ออกได้ยาก แต่ถ้าเราแปลงเป็นตารางเมตร จะได้ 5,000,000 ตารางเมตร ข้อมูลนี้จะเริ่มมีประโยชน์ต่อวิศวกรหรือนักวางแผนชุมชนในทันที เช่น หากพวกเขาต้องการประเมินว่าจะต้องใช้กล้าไม้จำนวนกี่ต้นในการปลูกป่าทดแทน โดยกำหนดระยะห่างการปลูกต่อตารางเมตร การใช้หน่วยตารางเมตรในการคำนวณจะมีความสะดวกและให้ความละเอียดมากกว่า
          </p>
          <p>
            อีกหนึ่งตัวอย่างคือการทำงานขององค์กรปกครองส่วนท้องถิ่น ในภาพรวมพวกเขาอาจดูแลพื้นที่ระดับตารางกิโลเมตร แต่เวลาจัดเก็บภาษีที่ดิน หรือวางผังการก่อสร้างถนนและสาธารณูปโภค การคำนวณจะต้องลงรายละเอียดระดับตารางเมตร (หรือตารางวาในกรณีของไทย) เพื่อความถูกต้องทางกฎหมายและงบประมาณ
          </p>
          <p>
            การคำนวณตัวเลขหลักล้านอาจทำให้เกิดความสับสนหรือข้อผิดพลาดได้ง่าย เครื่องมือ <strong>โปรแกรมแปลงตารางกิโลเมตรเป็นตารางเมตร</strong> ของเราจึงถูกพัฒนาขึ้นมาเพื่อช่วยขจัดปัญหานี้ คุณเพียงแค่กรอกตัวเลขพื้นที่เป็นตารางกิโลเมตร แล้วให้ระบบจัดการคำนวณออกมาเป็นตารางเมตรภายในเสี้ยววินาที ลดภาระการกดเครื่องคิดเลขด้วยตัวเอง และสามารถมั่นใจในความถูกต้องได้เต็มร้อย ใช้งานฟรีและรองรับการใช้งานผ่านมือถือได้อย่างสมบูรณ์แบบ
          </p>
        </section>
      </article>
    </div>
  );
}

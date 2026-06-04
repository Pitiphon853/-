"use client";

import React, { useState } from 'react';
import { Calculator, ArrowRight, RefreshCw, Info } from 'lucide-react';

export default function SqmToSqkm({ lang = 'th' }: any) {
  const [sqm, setSqm] = useState<string>('');
  const [sqkm, setSqkm] = useState<string>('');

  const handleSqmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSqm(val);
    if (!isNaN(Number(val)) && val !== '') {
      setSqkm((Number(val) / 1000000).toString());
    } else {
      setSqkm('');
    }
  };

  const handleSqkmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSqkm(val);
    if (!isNaN(Number(val)) && val !== '') {
      setSqm((Number(val) * 1000000).toString());
    } else {
      setSqm('');
    }
  };

  const clearValues = () => {
    setSqm('');
    setSqkm('');
  };

  const isTh = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-8">
      {/* Calculator Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600" />
            {isTh ? 'โปรแกรมแปลงตารางเมตรเป็นตารางกิโลเมตร' : 'Square Meter to Square Kilometer Converter'}
          </h2>
          <p className="text-gray-500 mt-2">
            {isTh ? 'แปลงหน่วยพื้นที่จากตารางเมตร (m²) เป็นตารางกิโลเมตร (km²)' : 'Convert area from square meters (m²) to square kilometers (km²)'}
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
            การแปลงหน่วยพื้นที่: ตารางเมตร (m²) และ ตารางกิโลเมตร (km²)
          </h3>
          <p>
            การทำความเข้าใจและการแปลงหน่วยพื้นที่ระหว่าง<strong>ตารางเมตร (Square Meter)</strong> และ<strong>ตารางกิโลเมตร (Square Kilometer)</strong> เป็นสิ่งที่มีความสำคัญในหลายด้าน ไม่ว่าจะเป็นทางด้านภูมิศาสตร์ วิศวกรรมโยธา สถาปัตยกรรม การประเมินราคาที่ดิน หรือแม้แต่การศึกษาข้อมูลทางสถิติของประเทศต่างๆ เนื่องจากทั้งสองหน่วยนี้เป็นหน่วยมาตรฐานในระบบเมตริกที่ได้รับการยอมรับและใช้งานอย่างแพร่หลายทั่วโลก
          </p>
          <p>
            ในทางทฤษฎี <strong>ตารางเมตร (m²)</strong> เป็นหน่วยวัดพื้นที่ฐานในระบบ SI (International System of Units) ซึ่งนิยามจากพื้นที่ของสี่เหลี่ยมจัตุรัสที่มีความยาวด้านละ 1 เมตร หน่วยตารางเมตรเหมาะสำหรับการวัดพื้นที่ขนาดเล็กถึงขนาดกลาง เช่น พื้นที่ใช้สอยในบ้าน ขนาดของห้องพัก พื้นที่สวนหน้าบ้าน หรือขนาดของอาคารสำนักงานต่างๆ
          </p>
          <p>
            ในขณะเดียวกัน <strong>ตารางกิโลเมตร (km²)</strong> เป็นหน่วยวัดพื้นที่ที่ใหญ่กว่ามาก โดย 1 กิโลเมตรเท่ากับ 1,000 เมตร ดังนั้นพื้นที่ของสี่เหลี่ยมจัตุรัสที่มีความยาวด้านละ 1 กิโลเมตร จึงเท่ากับ 1,000 เมตร คูณ 1,000 เมตร ซึ่งผลลัพธ์ก็คือ 1,000,000 ตารางเมตร หน่วยตารางกิโลเมตรจึงมักถูกนำมาใช้เพื่อวัดพื้นที่ขนาดใหญ่ระดับมหภาค เช่น พื้นที่ของจังหวัด พื้นที่ประเทศ ขนาดของทวีป พื้นที่ป่าไม้ ลุ่มน้ำ หรือพื้นที่ผิวของโลก
          </p>

          <div className="bg-white p-4 rounded-md shadow-sm my-4 border-l-4 border-blue-500">
            <h4 className="font-semibold text-gray-800 mb-2">สูตรการแปลงหน่วย</h4>
            <p className="font-mono text-lg text-center text-blue-700 my-2">
              1 ตารางกิโลเมตร (km²) = 1,000,000 ตารางเมตร (m²)
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm mt-3">
              <li><strong>หากต้องการแปลงตารางเมตร เป็น ตารางกิโลเมตร:</strong> ให้นำพื้นที่ที่เป็นตารางเมตรหารด้วย 1,000,000</li>
              <li><strong>หากต้องการแปลงตารางกิโลเมตร เป็น ตารางเมตร:</strong> ให้นำพื้นที่ที่เป็นตารางกิโลเมตรคูณด้วย 1,000,000</li>
            </ul>
          </div>

          <h4 className="text-lg font-bold text-gray-800 mt-6 mb-3">ทำไมการแปลงหน่วยนี้จึงสำคัญ?</h4>
          <p>
            การเปลี่ยนหน่วยพื้นที่ไปมาอย่างถูกต้องมีความจำเป็นอย่างยิ่ง ยกตัวอย่างเช่น เมื่อมีการพัฒนาโครงการระดับชาติ การวางผังเมือง มักจะรายงานพื้นที่เป็นตารางกิโลเมตร แต่เมื่อต้องลงรายละเอียดเชิงวิศวกรรมเพื่อคำนวณวัสดุก่อสร้าง จะต้องแปลงพื้นที่เหล่านั้นกลับมาเป็นตารางเมตรเพื่อความแม่นยำในการคำนวณค่าใช้จ่าย หรือในเชิงการเกษตร แม้ว่าประเทศไทยจะนิยมใช้หน่วย "ไร่" (1 ไร่ = 1,600 ตารางเมตร) แต่การสื่อสารกับชาวต่างชาติหรือในรายงานวิชาการระดับนานาชาติ ก็ยังจำเป็นต้องใช้หน่วยตารางเมตรและตารางกิโลเมตรเป็นหลัก
          </p>
          <p>
            ด้วยโปรแกรมแปลงหน่วยตารางเมตรเป็นตารางกิโลเมตรออนไลน์ของเรา คุณสามารถทำการคำนวณได้อย่างรวดเร็ว แม่นยำ และไม่มีค่าใช้จ่าย เพียงแค่กรอกตัวเลขที่ต้องการ ระบบจะทำการคำนวณผลลัพธ์ให้ทันทีแบบเรียลไทม์ ลดข้อผิดพลาดจากการคำนวณด้วยมือหรือเครื่องคิดเลขปกติ นอกจากนี้ยังสามารถใช้คำนวณย้อนกลับจากตารางกิโลเมตรมาเป็นตารางเมตรได้ในเครื่องมือเดียวกัน เพิ่มความสะดวกสบายให้กับนักเรียน นักศึกษา วิศวกร หรือบุคคลทั่วไปที่ต้องการข้อมูลอย่างรวดเร็ว
          </p>
          <p className="text-sm text-gray-500 mt-4 border-t pt-4">
            หมายเหตุ: แม้ว่าระบบแปลงหน่วยจะมีความแม่นยำสูง แต่ในกรณีที่นำไปใช้กับการทำสัญญาทางกฎหมายที่เกี่ยวข้องกับที่ดิน หรือการคำนวณที่มีผลประโยชน์จำนวนมาก ควรมีการตรวจสอบความถูกต้องของข้อมูลจากเอกสารสิทธิ์ราชการเสมอ
          </p>
        </section>
      </article>
    </div>
  );
}

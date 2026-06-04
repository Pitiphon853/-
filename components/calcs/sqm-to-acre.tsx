"use client";

import React, { useState } from 'react';
import { Calculator, ArrowRight, RefreshCw, Info } from 'lucide-react';

export default function SqmToAcre({ lang = 'th' }: any) {
  const [sqm, setSqm] = useState<string>('');
  const [acre, setAcre] = useState<string>('');

  const CONVERSION_RATE = 4046.8564224;

  const handleSqmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSqm(val);
    if (!isNaN(Number(val)) && val !== '') {
      setAcre((Number(val) / CONVERSION_RATE).toFixed(8).replace(/\.?0+$/, ''));
    } else {
      setAcre('');
    }
  };

  const handleAcreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAcre(val);
    if (!isNaN(Number(val)) && val !== '') {
      setSqm((Number(val) * CONVERSION_RATE).toFixed(4).replace(/\.?0+$/, ''));
    } else {
      setSqm('');
    }
  };

  const clearValues = () => {
    setSqm('');
    setAcre('');
  };

  const isTh = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-8">
      {/* Calculator Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600" />
            {isTh ? 'โปรแกรมแปลงตารางเมตรเป็นเอเคอร์' : 'Square Meter to Acre Converter'}
          </h2>
          <p className="text-gray-500 mt-2">
            {isTh ? 'แปลงหน่วยพื้นที่จากตารางเมตร (m²) เป็นเอเคอร์ (Acre)' : 'Convert area from square meters (m²) to acres'}
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

            {/* Acre Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isTh ? 'เอเคอร์ (Acre)' : 'Acres'}
              </label>
              <input
                type="number"
                value={acre}
                onChange={handleAcreChange}
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
            การแปลงหน่วยพื้นที่: ตารางเมตร (m²) เป็น เอเคอร์ (Acre)
          </h3>
          <p>
            การวัดและประเมินขนาดพื้นที่เป็นส่วนสำคัญในงานด้านอสังหาริมทรัพย์ การเกษตรกรรม และการวางผังเมือง แม้ว่าประเทศไทยเราจะคุ้นเคยกับหน่วย ตารางวา งาน และไร่ เป็นหลัก แต่ในระดับสากลแล้ว <strong>ตารางเมตร (Square Meter)</strong> และ <strong>เอเคอร์ (Acre)</strong> เป็นหน่วยวัดพื้นที่ที่ได้รับการใช้งานอย่างกว้างขวาง โดยเฉพาะในกลุ่มประเทศที่ใช้ภาษาอังกฤษเป็นหลัก การรู้วิธีแปลงหน่วยพื้นที่ระหว่างตารางเมตรและเอเคอร์จึงมีประโยชน์มากในการติดต่อสื่อสาร การค้า หรือการศึกษาค้นคว้าข้อมูลระดับโลก
          </p>
          <p>
            <strong>ตารางเมตร (m²)</strong> เป็นหน่วยมาตรฐานในระบบเมตริก (Metric System) ที่นิยมใช้ในการระบุพื้นที่ขนาดเล็กไปจนถึงขนาดกลาง เช่น พื้นที่บ้าน ห้องชุด หรือที่ดินจัดสรรขนาดเล็ก
          </p>
          <p>
            ในทางตรงกันข้าม <strong>เอเคอร์ (Acre)</strong> เป็นหน่วยวัดพื้นที่ในระบบอิมพีเรียล (Imperial System) และระบบการวัดของสหรัฐอเมริกา นิยมใช้วัดที่ดินขนาดใหญ่ โดยเฉพาะที่ดินทางการเกษตร ฟาร์ม ปศุสัตว์ หรืออุทยานต่างๆ ในอดีต 1 เอเคอร์ ถูกกำหนดให้เป็นขนาดพื้นที่ที่ผู้ชายหนึ่งคนและวัวหนึ่งตัวสามารถไถพรวนดินได้ในเวลาหนึ่งวัน
          </p>

          <div className="bg-white p-4 rounded-md shadow-sm my-4 border-l-4 border-blue-500">
            <h4 className="font-semibold text-gray-800 mb-2">ข้อมูลเปรียบเทียบและการแปลงหน่วย</h4>
            <p className="font-mono text-lg text-center text-blue-700 my-2">
              1 เอเคอร์ (Acre) ≈ 4,046.86 ตารางเมตร (m²)
            </p>
            <p className="font-mono text-lg text-center text-blue-700 my-2">
              1 ไร่ (ไทย) = 1,600 ตารางเมตร (m²) 
            </p>
            <p className="font-mono text-lg text-center text-blue-700 my-2">
              ดังนั้น 1 เอเคอร์ จึงมีขนาดประมาณ 2.53 ไร่
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm mt-3">
              <li><strong>การแปลงตารางเมตรเป็นเอเคอร์:</strong> ให้นำพื้นที่ตารางเมตร หารด้วย 4046.86</li>
              <li><strong>การแปลงเอเคอร์เป็นตารางเมตร:</strong> ให้นำพื้นที่เอเคอร์ คูณด้วย 4046.86</li>
            </ul>
          </div>

          <h4 className="text-lg font-bold text-gray-800 mt-6 mb-3">เมื่อไหร่ที่คุณควรใช้โปรแกรมแปลงหน่วยนี้?</h4>
          <p>
            คุณอาจต้องแปลงตารางเมตรเป็นเอเคอร์เมื่ออ่านข่าวเศรษฐกิจระดับโลกเกี่ยวกับการซื้อขายที่ดิน การชดเชยที่ดินทางการเกษตร หรือการวัดพื้นที่ป่าไม้ที่ถูกไฟไหม้ในต่างประเทศ นอกจากนี้ สำหรับนักลงทุนที่สนใจซื้อที่ดินทางการเกษตร หรืออสังหาริมทรัพย์ในประเทศอย่างสหรัฐอเมริกา แคนาดา หรืออังกฤษ ข้อมูลมักจะระบุเป็นหน่วยเอเคอร์ หากคุณไม่คุ้นเคยกับขนาดของเอเคอร์ การนำไปแปลงเป็นตารางเมตร หรือเปรียบเทียบเป็น "ไร่" แบบไทย จะทำให้เห็นภาพขนาดที่ดินได้ชัดเจนยิ่งขึ้น
          </p>
          <p>
            นอกจากนี้ ในวงการการผลิตทางการเกษตร (Agriculture) การวัดผลผลิตหรือคำนวณการใช้ปุ๋ยก็มักมีการเปรียบเทียบผลผลิตต่อเอเคอร์ (Yield per Acre) การทำความเข้าใจหน่วยเหล่านี้จะช่วยให้ผู้ประกอบการในไทยสามารถเปรียบเทียบประสิทธิภาพการผลิตของตนกับมาตรฐานสากลได้
          </p>
          <p>
            เพื่อให้ทุกการแปลงค่าเป็นเรื่องง่ายและไร้ข้อผิดพลาด คุณสามารถใช้งานโปรแกรมแปลงตารางเมตรเป็นเอเคอร์ของเราได้ตลอดเวลา เพียงกรอกค่าตารางเมตร หรือเอเคอร์ ระบบจะทำการแปลงค่าแบบ Real-time ให้ทันทีโดยใช้มาตรฐานการคำนวณที่ถูกต้องแม่นยำ เครื่องมือของเราเปิดให้ใช้งานฟรี เหมาะสำหรับทุกคน ไม่ว่าจะเป็นนักเรียน นักศึกษา เกษตรกร หรือนักลงทุน
          </p>
        </section>
      </article>
    </div>
  );
}

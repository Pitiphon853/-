'use client'

import React, { useState } from 'react';
import { Calculator, ArrowRight, ArrowDown } from 'lucide-react';

export default function AcreToSqM({ lang }: { lang: 'TH' | 'EN' }) {
  const [val, setVal] = useState<string>('');

  const num = parseFloat(val);
  // 1 acre = 4046.85642 sq meters
  const result = isNaN(num) ? null : num * 4046.8564224;

  const t = {
    title: lang === 'TH' ? 'แปลงเอเคอร์เป็นตารางเมตร' : 'Acre to Sq m Converter',
    input: lang === 'TH' ? 'เอเคอร์ (acres)' : 'Acres (ac)',
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
        <h2>แปลงพื้นที่จากหน่วย เอเคอร์ เป็น ตารางเมตร อย่างไรให้แม่นยำ</h2>
        <p>
          เวลาที่คุณต้องรับมือกับการแปลเอกสารที่ดิน สารคดีต่างประเทศ ข่าวสารเศรษฐกิจ หรือโครงการลงทุนด้านอสังหาริมทรัพย์ระดับโลก 
          คุณน่าจะเคยผ่านตากับคำว่า <strong>"เอเคอร์" (Acre)</strong> อย่างแน่นอน เอเคอร์คือหน่วยวัดพื้นที่ที่นิยมใช้ในประเทศที่ใช้ระบบอิมพีเรียล 
          เช่น สหรัฐอเมริกา และสหราชอาณาจักร ขณะที่ในประเทศไทยและอีกหลายๆ ประเทศทั่วโลก จะคุ้นเคยกับระบบเมตริกมากกว่า 
          ซึ่งหน่วยที่ใช้กันเป็นมาตรฐานในการระบุพื้นที่ขนาดใหญ่รองลงมาจากไร่หรือตารางกิโลเมตรก็คือ <strong>"ตารางเมตร" (Square Meter)</strong>
        </p>
        <p>
          เพื่อความเข้าใจที่ตรงกันและลดความคลาดเคลื่อนในการวางแผน การแปลงหน่วยจากเอเคอร์มาเป็นตารางเมตรจึงเป็นสิ่งจำเป็น 
          ในบทความนี้เราจะมาทำความรู้จักที่มาของสองหน่วยนี้ และสูตรที่ใช้ในการแปลงหน่วยกันอย่างละเอียด
        </p>

        <h3>ความหมายของ เอเคอร์ และ ตารางเมตร</h3>
        <p>
          <strong>เอเคอร์ (Acre):</strong> ในประวัติศาสตร์ 1 เอเคอร์คือขนาดของที่ดินที่ชายหนุ่ม 1 คนและวัว 1 ตัวสามารถไถให้เสร็จได้ภายในหนึ่งวัน 
          ในยุคปัจจุบัน เอเคอร์ได้รับการกำหนดมาตรฐานอย่างชัดเจนว่ามีขนาดเท่ากับ 4,840 ตารางหลา หรือ 43,560 ตารางฟุต
        </p>
        <p>
          <strong>ตารางเมตร (Square Meter):</strong> หรือตัวย่อ sq m, m&sup2; คือหน่วยวัดพื้นที่ในระบบ SI (International System of Units) 
          เป็นพื้นที่ของสี่เหลี่ยมจัตุรัสที่มีด้านกว้าง 1 เมตรและยาว 1 เมตร ด้วยความที่เป็นหน่วยในระบบทศนิยม 
          ทำให้ตารางเมตรสามารถคำนวณแปลงเป็นตารางเซนติเมตร ตารางกิโลเมตร ได้อย่างง่ายดาย
        </p>

        <h3>สูตรการแปลงเอเคอร์เป็นตารางเมตร</h3>
        <p>
          เนื่องจาก 1 เอเคอร์มีขนาดใหญ่พอสมควร เมื่อแปลงมาเป็นตารางเมตร ตัวเลขที่ได้จึงมีขนาดหลักพัน โดยค่าที่ได้รับการยอมรับเป็นมาตรฐานสากลในการคูณคือ:
        </p>
        <blockquote className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-4">
          <p className="font-semibold text-blue-900 m-0">1 เอเคอร์ (acre) = 4,046.85642 ตารางเมตร (sq m)</p>
        </blockquote>
        <p>
          เมื่อต้องการแปลงหน่วย เพียงแค่นำตัวเลขเอเคอร์ที่คุณมี คูณด้วย 4,046.85642 (หรืออาจจะปัดเศษใช้ค่า 4,047 เพื่อความรวดเร็วในการประเมินคร่าวๆ)
        </p>

        <h3>ตัวอย่างการนำไปใช้ในชีวิตจริง</h3>
        <p>
          <strong>สถานการณ์ที่ 1: การชมภาพยนตร์หรือสารคดี</strong><br />
          ในสารคดีบอกว่า มีที่ดินส่วนตัวถูกขายไปขนาด 5 เอเคอร์ หากคุณอยากทราบว่ามีขนาดใหญ่แค่ไหนในหน่วยที่คนไทยเข้าใจ 
          วิธีคำนวณคือ นำ 5 &times; 4,046.85642 = 20,234.2821 ตารางเมตร ซึ่งเมื่อทราบเป็นตารางเมตรแล้ว 
          ก็อาจจะนำไปเทียบเป็นไร่ (1 ไร่ = 1,600 ตารางเมตร) จะพบว่า 5 เอเคอร์ มีขนาดใหญ่กว่า 12 ไร่เลยทีเดียว
        </p>
        <p>
          <strong>สถานการณ์ที่ 2: การลงทุนอสังหาริมทรัพย์</strong><br />
          นักลงทุนที่สนใจซื้อโกดังเก็บสินค้าในอเมริกาที่มีพื้นที่แจ้งว่า 1.5 เอเคอร์<br />
          การแปลงเป็นตารางเมตร: 1.5 &times; 4,046.85642 = 6,070.28463 ตารางเมตร<br />
          ทำให้สามารถนำพื้นที่ระดับ 6,000 กว่าตารางเมตรนี้ไปคำนวณหาต้นทุนค่าก่อสร้างต่อตารางเมตร หรือวางแผนจัดสรรพื้นที่ได้อย่างถูกต้อง
        </p>

        <h3>บทสรุป</h3>
        <p>
          การทำความเข้าใจความสัมพันธ์และการแปลงค่าระหว่างเอเคอร์กับตารางเมตร จะช่วยเปิดโลกให้คุณสามารถเข้าถึงและประเมินข้อมูลด้านพื้นที่จากสื่อตะวันตกได้อย่างลึกซึ้งขึ้น 
          ไม่ว่าจะเป็นการทำรายงาน การทำงานวิศวกรรม การแปลภาษา หรือแม้แต่การรับรู้ข่าวสารรอบโลก 
          เครื่องมือแปลงพื้นที่ เอเคอร์เป็นตารางเมตร ที่เตรียมไว้นี้ ใช้งานง่าย ประมวลผลไว 
          และถูกออกแบบมาเพื่อเป็นผู้ช่วยส่วนตัวในการคำนวณตัวเลขที่ยุ่งยากให้กลายเป็นเรื่องง่ายสำหรับทุกคน
        </p>
      </article>
    </div>
  );
}

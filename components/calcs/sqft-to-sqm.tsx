'use client'

import React, { useState } from 'react';
import { Calculator, ArrowRight, ArrowDown } from 'lucide-react';

export default function SqFtToSqM({ lang }: { lang: 'TH' | 'EN' }) {
  const [val, setVal] = useState<string>('');

  const num = parseFloat(val);
  // 1 sq ft = 0.09290304 sq meters
  const result = isNaN(num) ? null : num * 0.09290304;

  const t = {
    title: lang === 'TH' ? 'แปลงตารางฟุตเป็นตารางเมตร' : 'Sq Ft to Sq m Converter',
    input: lang === 'TH' ? 'ตารางฟุต (sq ft)' : 'Square Feet (sq ft)',
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
        <h2>การแปลงตารางฟุตเป็นตารางเมตร (Square Feet to Square Meters)</h2>
        <p>
          ในชีวิตประจำวันหรือในโลกแห่งวิชาชีพและธุรกิจ การวัดพื้นที่ถือเป็นสิ่งที่หลีกเลี่ยงไม่ได้ ไม่ว่าคุณกำลังจะซื้อบ้านใหม่ 
          ตกแต่งภายใน ตรวจสอบแบบแปลนการก่อสร้าง หรือเช่าพื้นที่สำนักงาน คุณมักจะพบเจอกับหน่วยวัดพื้นที่ที่แตกต่างกัน 
          โดยเฉพาะอย่างยิ่งในยุคโลกาภิวัตน์ที่มีการติดต่อสื่อสารและการใช้วัสดุก่อสร้างหรือแบบแปลนจากต่างประเทศ ทำให้เราต้องทำความเข้าใจทั้งระบบอิมพีเรียล (Imperial System) และระบบเมตริก (Metric System)
        </p>
        <p>
          หนึ่งในการแปลงหน่วยพื้นที่ที่พบบ่อยมากที่สุดคือการแปลง <strong>ตารางฟุต (Square Feet หรือ sq ft)</strong> ไปเป็น <strong>ตารางเมตร (Square Meters หรือ sq m)</strong> 
          บทความนี้จะอธิบายถึงความสำคัญของการแปลงหน่วยนี้ พร้อมทั้งให้ข้อมูลเบื้องต้นเกี่ยวกับทั้งสองหน่วย รวมถึงสูตรคำนวณที่แม่นยำ
        </p>

        <h3>ความหมายของตารางฟุต และตารางเมตร</h3>
        <p>
          <strong>ตารางฟุต (Square Foot)</strong> คือหน่วยวัดพื้นที่ในระบบอิมพีเรียลและระบบประเพณีของสหรัฐอเมริกา (US Customary System) 
          1 ตารางฟุตหมายถึงพื้นที่ของสี่เหลี่ยมจัตุรัสที่มีความยาวด้านละ 1 ฟุต (12 นิ้ว) 
          หน่วยวัดนี้ถูกนำมาใช้อย่างแพร่หลายในสหรัฐอเมริกา แคนาดา สหราชอาณาจักร รวมไปถึงประเทศอื่นๆ บางส่วน โดยส่วนใหญ่มักใช้บอกขนาดของห้องพัก 
          ขนาดบ้าน หรือพื้นที่เช่าเชิงพาณิชย์
        </p>
        <p>
          <strong>ตารางเมตร (Square Meter)</strong> คือหน่วยอนุพัทธ์ของพื้นที่ในระบบหน่วยสากล หรือ ระบบเอสไอ (SI System) 
          ถูกกำหนดให้เป็นพื้นที่ของสี่เหลี่ยมจัตุรัสที่มีความยาวด้านละ 1 เมตร ตารางเมตรเป็นหน่วยมาตรฐานสากลที่ประเทศส่วนใหญ่บนโลกรวมถึงประเทศไทยใช้งาน 
          มักพบเห็นได้ทั่วไปในโฉนดที่ดิน การคำนวณพื้นที่ก่อสร้าง สถาปัตยกรรม และวิศวกรรมต่างๆ
        </p>

        <h3>สูตรการแปลงตารางฟุตเป็นตารางเมตร</h3>
        <p>
          การแปลงตารางฟุตให้เป็นตารางเมตรมีความสำคัญเพื่อใช้ในการเปรียบเทียบขนาดหรือการคำนวณต้นทุนการก่อสร้างวัสดุ 
          โดยเราสามารถใช้ความสัมพันธ์ทางคณิตศาสตร์ที่เป็นสากลได้ดังนี้:
        </p>
        <blockquote className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-4">
          <p className="font-semibold text-blue-900 m-0">1 ตารางฟุต (sq ft) = 0.09290304 ตารางเมตร (sq m)</p>
        </blockquote>
        <p>
          เพื่อแปลงค่าพื้นที่จากตารางฟุตเป็นตารางเมตร คุณเพียงแค่นำจำนวนตารางฟุตไปคูณกับ 0.09290304 ซึ่งเป็นค่าคงที่
        </p>
        <p>
          <strong>ตัวอย่างการคำนวณที่ 1:</strong><br />
          สมมติว่าคุณกำลังดูข้อมูลอพาร์ตเมนต์ในต่างประเทศที่มีพื้นที่ 1,000 ตารางฟุต และคุณต้องการทราบว่าอพาร์ตเมนต์นี้มีขนาดกี่ตารางเมตร<br />
          พื้นที่ (ตารางเมตร) = 1,000 &times; 0.09290304<br />
          พื้นที่ (ตารางเมตร) = 92.90304 ตารางเมตร<br />
          ดังนั้น อพาร์ตเมนต์ขนาด 1,000 ตารางฟุต จะมีพื้นที่ประมาณ 93 ตารางเมตร ซึ่งเทียบเท่ากับคอนโดมิเนียมขนาดใหญ่หรือบ้านเดี่ยวขนาดเล็ก
        </p>
        <p>
          <strong>ตัวอย่างการคำนวณที่ 2:</strong><br />
          คุณต้องการซื้อพรมปูพื้นจากอเมริกาที่มีขนาดพื้นที่ 150 ตารางฟุต แล้วต้องการรู้ว่าจะพอดีกับห้องขนาด 15 ตารางเมตรในบ้านคุณหรือไม่<br />
          พื้นที่ (ตารางเมตร) = 150 &times; 0.09290304 = 13.935 ตารางเมตร<br />
          เมื่อแปลงค่าแล้ว พรมจะมีขนาดเกือบ 14 ตารางเมตร ซึ่งสามารถนำมาปูในห้องขนาด 15 ตารางเมตรได้พอดีโดยมีพื้นที่เหลือขอบเล็กน้อย
        </p>

        <h3>ประโยชน์ของการใช้งานเครื่องมือแปลงหน่วยพื้นที่</h3>
        <ul>
          <li><strong>ความรวดเร็วและแม่นยำ:</strong> ลดความเสี่ยงจากการคิดคำนวณด้วยตนเองผิดพลาด เนื่องจากตัวเลข 0.09290304 มีทศนิยมหลายตำแหน่ง</li>
          <li><strong>การประเมินราคาที่ถูกต้อง:</strong> สำหรับสถาปนิก ผู้รับเหมา หรือผู้จำหน่ายวัสดุก่อสร้าง การทราบพื้นที่เป็นตารางเมตรจะช่วยให้ประเมินจำนวนวัสดุ เช่น กระเบื้อง ไม้ลามิเนต หรือสีที่ต้องใช้ได้อย่างถูกต้องตามสเปคที่ขายในไทย</li>
          <li><strong>การสื่อสารที่ชัดเจน:</strong> ช่วยให้การเจรจาธุรกิจหรือการซื้อขายอสังหาริมทรัพย์ระหว่างผู้ใช้งานจากต่างวัฒนธรรมสามารถเข้าใจกันได้บนมาตรฐานเดียวกัน</li>
        </ul>

        <h3>สรุป</h3>
        <p>
          เครื่องมือคำนวณการแปลงตารางฟุตเป็นตารางเมตร ถือเป็นฟีเจอร์พื้นฐานที่ตอบโจทย์ความต้องการทั้งในด้านการอยู่อาศัยและการลงทุน 
          เพียงแค่กรอกตัวเลขตารางฟุตที่คุณมี ระบบก็จะประมวลผลให้คุณได้ค่าเป็นตารางเมตรในทันที ช่วยให้คุณสามารถตัดสินใจเรื่องต่างๆ ที่เกี่ยวกับพื้นที่ได้ง่ายและตรงประเด็นมากขึ้น ไม่ต้องพึ่งพาการกดเครื่องคิดเลขให้วุ่นวายอีกต่อไป
        </p>
      </article>
    </div>
  );
}

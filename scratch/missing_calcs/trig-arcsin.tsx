"use client";

import React, { useState } from 'react';
import { Activity, Calculator, RefreshCw } from 'lucide-react';

export default function TrigArcSin({ lang }: { lang?: 'TH' | 'EN' }) {
  const isTH = lang === 'TH';

  const [value, setValue] = useState<string>('');
  const [resultDeg, setResultDeg] = useState<number | null>(null);
  const [resultRad, setResultRad] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    const num = parseFloat(value);

    if (isNaN(num)) {
      setError(isTH ? 'กรุณากรอกตัวเลขให้ถูกต้อง' : 'Please enter a valid number.');
      setResultDeg(null);
      setResultRad(null);
      return;
    }

    if (num < -1 || num > 1) {
      setError(isTH ? 'ค่าที่กรอกต้องอยู่ในช่วง -1 ถึง 1 เท่านั้น' : 'Value must be between -1 and 1.');
      setResultDeg(null);
      setResultRad(null);
      return;
    }

    const rad = Math.asin(num);
    const deg = rad * (180 / Math.PI);
    
    setResultRad(rad);
    setResultDeg(deg);
  };

  const clear = () => {
    setValue('');
    setResultDeg(null);
    setResultRad(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
          <div className="p-4 bg-sky-50 text-sky-600 rounded-xl">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {isTH ? 'คำนวณอาร์คไซน์ (ArcSin)' : 'ArcSin Calculator'}
            </h2>
            <p className="text-slate-500 mt-1">
              {isTH ? 'หามุมจากค่า sin⁻¹(x) หรือ arcsin' : 'Find angle from sin⁻¹(x) or arcsin'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {isTH ? 'ค่าตัวเลข (อยู่ในช่วง -1 ถึง 1)' : 'Value (Between -1 and 1)'}
              </label>
              <input
                type="number"
                step="0.01"
                min="-1"
                max="1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={isTH ? "เช่น 0.5, 1, -0.5" : "e.g., 0.5, 1, -0.5"}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
              />
            </div>
            
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={calculate}
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Calculator className="w-5 h-5" />
                {isTH ? 'คำนวณ' : 'Calculate'}
              </button>
              <button
                onClick={clear}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                {isTH ? 'ล้างค่า' : 'Clear'}
              </button>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                {isTH ? 'มุม (องศา, °)' : 'Angle (Degrees, °)'}
              </h3>
              <div className="text-4xl md:text-5xl font-bold text-sky-600 break-words">
                {resultDeg !== null ? resultDeg.toLocaleString(undefined, { maximumFractionDigits: 6 }) + '°' : '-'}
              </div>
            </div>
            
            <div className="h-px w-full bg-slate-200"></div>

            <div>
              <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                {isTH ? 'มุม (เรเดียน, rad)' : 'Angle (Radians, rad)'}
              </h3>
              <div className="text-2xl md:text-3xl font-bold text-slate-700 break-words">
                {resultRad !== null ? resultRad.toLocaleString(undefined, { maximumFractionDigits: 6 }) : '-'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose prose-sky max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
        <h2>อาร์คไซน์ (ArcSin) หรือ ไซน์ผกผัน (Inverse Sine) คืออะไร?</h2>
        <p>
          ในขณะที่เราใช้ฟังก์ชันตรีโกณมิติพื้นฐานอย่าง Sine (sin) เพื่อหาอัตราส่วนของด้านสามเหลี่ยมเมื่อเราทราบมุม แต่ในหลายๆ สถานการณ์ เรามักจะพบปัญหาในทางกลับกัน นั่นคือ "เราทราบความยาวด้านของสามเหลี่ยม (รู้อัตราส่วนแล้ว) แต่เราต้องการอยากรู้ว่ามุมนั้นกางกี่องศา?" นี่คือจุดที่ <strong>ฟังก์ชันตรีโกณมิติผกผัน หรือ อินเวอร์สตรีโกณมิติ (Inverse Trigonometry)</strong> เข้ามามีบทบาท โดยฟังก์ชันที่ทำหน้าที่ตรงข้ามกับ Sine ก็คือ <strong>อาร์คไซน์ (ArcSin)</strong> หรือที่มักเขียนในรูปแบบ <strong>sin⁻¹(x)</strong>
        </p>

        <h3>หลักการทำงานของ ArcSin</h3>
        <p>
          ฟังก์ชัน ArcSin จะรับค่าอินพุตเป็น "ตัวเลขที่เป็นผลลัพธ์ของค่า Sine" แล้วแปลงกลับคืนไปเป็น "ค่าของมุม" ที่ทำให้เกิดค่า Sine นั้น ตัวอย่างเช่น:
        </p>
        <ul>
          <li>เรารู้ว่า <strong>sin(30°) = 0.5</strong></li>
          <li>ดังนั้น <strong>arcsin(0.5) = 30°</strong> (หรือเท่ากับ &pi;/6 ในหน่วยเรเดียน)</li>
        </ul>
        <p>
          สมการพื้นฐานของ ArcSin สามารถสรุปได้ว่า: ถ้ายอมรับว่า sin(y) = x ดังนั้นจะได้ว่า y = arcsin(x)
        </p>

        <h3>ข้อจำกัดและเงื่อนไขที่สำคัญ (Domain and Range)</h3>
        <p>
          การใช้งานฟังก์ชัน ArcSin มีเงื่อนไขทางคณิตศาสตร์ที่สำคัญมากสองประการที่คุณต้องจำไว้เสมอ:
        </p>
        <ol>
          <li>
            <strong>โดเมน (Domain) หรือค่าอินพุต:</strong> เนื่องจากค่า Sine ของมุมใดๆ บนโลกไม่ว่ามุมนั้นจะกว้างกี่องศา ค่าผลลัพธ์จะตกอยู่ในช่วง -1 ถึง 1 เท่านั้น ด้วยเหตุนี้ <strong>ค่าที่คุณนำมากรอกในเครื่องคำนวณ ArcSin จะต้องเป็นตัวเลขตั้งแต่ -1 ถึง 1 เท่านั้น</strong> หากคุณกรอกค่าที่มากกว่า 1 หรือน้อยกว่า -1 (เช่น 1.5 หรือ -2) ระบบจะไม่สามารถคำนวณได้และถือว่าเป็นข้อผิดพลาดทางคณิตศาสตร์ (Undefined)
          </li>
          <li>
            <strong>เรนจ์ (Range) หรือผลลัพธ์มุมหลัก (Principal Value):</strong> ในทางทฤษฎี มีมุมนับไม่ถ้วนที่ให้ค่า Sine เท่ากัน (เนื่องจากความลักษณะเป็นคาบของวงกลม) แต่นักคณิตศาสตร์ได้ตกลงกำหนดให้ฟังก์ชัน ArcSin คืนค่า "มุมหลัก" ซึ่งจะถูกจำกัดให้อยู่ในช่วง <strong>-90° ถึง 90°</strong> (หรือ -&pi;/2 ถึง &pi;/2 เรเดียน) เสมอ เพื่อให้การคำนวณมีคำตอบที่เป็นมาตรฐานเดียวกัน
          </li>
        </ol>

        <h3>การนำ ArcSin ไปประยุกต์ใช้งานในชีวิตจริง</h3>
        <p>
          ฟังก์ชัน ArcSin เป็นเครื่องมือสำคัญในงานวิศวกรรม ฟิสิกส์ และดาราศาสตร์ เมื่อต้องการย้อนหาข้อมูลมุมจากค่าระยะทางที่ทราบ:
        </p>
        <ul>
          <li><strong>ฟิสิกส์เชิงกล:</strong> การหามุมความลาดเอียงของพื้นที่ที่ทำให้วัตถุเริ่มไถลลงมา (Friction and Incline planes) โดยเมื่อเราคำนวณอัตราส่วนของแรงที่ทราบแล้ว จะใช้ ArcSin ในการแปลงกลับเป็นมุมของพื้นผิว</li>
          <li><strong>การทหารและขีปนาวุธ:</strong> ใช้หามุมในการยิงปืนใหญ่หรือจรวดให้ตกลงสู่เป้าหมายที่ต้องการ โดยอ้างอิงจากระยะทางที่วัดได้ (ร่วมกับการคำนวณวิถีโค้งพาราโบลา)</li>
          <li><strong>งานช่างไม้และสถาปัตยกรรม:</strong> เมื่อต้องการสร้างหลังคาบ้าน หรือการตัดไม้ให้เข้ามุมพอดี โดยช่างอาจจะทราบความสูงของหลังคา (ด้านตรงข้าม) และความยาวแนวทแยงของหน้าจั่ว การกดเครื่องคิดเลข ArcSin จะช่วยให้ทราบว่าต้องตั้งองศาเลื่อยตัดไม้ที่กี่องศา</li>
        </ul>
        <p>
          เครื่องมือคำนวณ ArcSin บนหน้าเว็บไซต์นี้ ได้ถูกออกแบบมาให้แสดงผลลัพธ์ทั้งในรูปแบบ "องศา" และ "เรเดียน" พร้อมกัน เพื่อให้ครอบคลุมการนำไปประยุกต์ใช้ในทุกรูปแบบการศึกษาและการทำงาน
        </p>
      </article>
    </div>
  );
}

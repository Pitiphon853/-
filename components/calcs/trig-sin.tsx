"use client";

import React, { useState } from 'react';
import { Activity, Calculator, RefreshCw } from 'lucide-react';

export default function TrigSin({ lang }: { lang?: 'TH' | 'EN' }) {
  const isTH = lang === 'TH';

  const [angleDegrees, setAngleDegrees] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [radians, setRadians] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    const degrees = parseFloat(angleDegrees);

    if (isNaN(degrees)) {
      setError(isTH ? 'กรุณากรอกตัวเลขมุมให้ถูกต้อง' : 'Please enter a valid angle.');
      setResult(null);
      setRadians(null);
      return;
    }

    // Convert degrees to radians for Math.sin()
    const rad = degrees * (Math.PI / 180);
    setRadians(rad);
    setResult(Math.sin(rad));
  };

  const clear = () => {
    setAngleDegrees('');
    setResult(null);
    setRadians(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {isTH ? 'คำนวณค่าไซน์ (Sine)' : 'Sine Calculator (sin)'}
            </h2>
            <p className="text-slate-500 mt-1">
              {isTH ? 'หาค่า sin(θ) จากมุมหน่วยองศา' : 'Find sin(θ) from angle in degrees'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {isTH ? 'มุม (องศา, °)' : 'Angle (Degrees, °)'}
              </label>
              <input
                type="number"
                value={angleDegrees}
                onChange={(e) => setAngleDegrees(e.target.value)}
                placeholder={isTH ? "เช่น 30, 45, 90" : "e.g., 30, 45, 90"}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
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

          <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-semibold text-slate-600 mb-4">
              {isTH ? 'ผลลัพธ์ ค่า sin(θ)' : 'Result sin(θ)'}
            </h3>
            <div className="text-5xl font-bold text-blue-600 mb-4 break-all">
              {result !== null 
                ? (Math.abs(result) < 1e-10 ? 0 : result).toLocaleString(undefined, { maximumFractionDigits: 6 }) 
                : '-'}
            </div>
            {radians !== null && (
              <div className="text-slate-500 text-sm mt-2 flex flex-col items-center gap-1">
                <p>sin({angleDegrees}&deg;)</p>
                <p>≈ {radians.toFixed(4)} {isTH ? 'เรเดียน (Radians)' : 'Radians'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose prose-blue max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
        <h2>ค่าไซน์ (Sine) ในวิชาตรีโกณมิติคืออะไร?</h2>
        <p>
          ในรายวิชาคณิตศาสตร์แขนงตรีโกณมิติ (Trigonometry) <strong>ไซน์ (Sine)</strong> ซึ่งมักจะเขียนย่อสั้นๆ ว่า <strong>sin</strong> ถือเป็นหนึ่งในฟังก์ชันตรีโกณมิติพื้นฐานที่มีความสำคัญที่สุด โดยพื้นฐานแล้ว ฟังก์ชันไซน์จะถูกนำมาใช้เพื่ออธิบายความสัมพันธ์ระหว่าง "มุม" ของรูปสามเหลี่ยมมุมฉาก และ "อัตราส่วนความยาวด้าน" ของรูปสามเหลี่ยมนั้นๆ
        </p>

        <h3>ความหมายของ Sine ในรูปสามเหลี่ยมมุมฉาก</h3>
        <p>
          หากเราพิจารณารูปสามเหลี่ยมมุมฉาก (Right Triangle) ที่มีมุมหนึ่งเป็นมุมฉาก (90 องศา) และเราสนใจมุมใดมุมหนึ่งที่ไม่ใช่มุมฉาก (สมมติให้เป็นมุม &theta;) เราสามารถนิยามค่า <strong>sin(&theta;)</strong> ได้จากสูตร:
        </p>
        <p className="text-center font-bold text-lg my-4">
          sin(&theta;) = ข้าม (Opposite) / ฉาก (Hypotenuse)
        </p>
        <ul>
          <li><strong>ข้าม (Opposite):</strong> คือความยาวของด้านที่อยู่ตรงข้ามกับมุม &theta; ที่เราสนใจ</li>
          <li><strong>ฉาก (Hypotenuse):</strong> คือความยาวของด้านที่อยู่ตรงข้ามมุมฉาก (ซึ่งเป็นด้านที่ยาวที่สุดในสามเหลี่ยมเสมอ)</li>
        </ul>

        <h3>ฟังก์ชัน Sine บนวงกลมหนึ่งหน่วย (Unit Circle)</h3>
        <p>
          เมื่อการศึกษาตรีโกณมิติขยายวงกว้างออกไป นอกเหนือจากมุมในสามเหลี่ยมที่จำกัดอยู่แค่ 0 ถึง 90 องศา นักคณิตศาสตร์ได้นิยามค่าไซน์โดยอ้างอิงจาก <strong>วงกลมหนึ่งหน่วย (Unit Circle)</strong> ซึ่งเป็นวงกลมที่มีรัศมี 1 หน่วย และมีจุดศูนย์กลางอยู่ที่จุดกำเนิด (0,0) บนกราฟแกน X-Y
        </p>
        <p>
          ในการวัดมุม &theta; บนวงกลมหนึ่งหน่วย หากเราลากเส้นจากจุดศูนย์กลางทำมุม &theta; กับแกน X ด้านบวก ไปตัดกับเส้นรอบวงกลมที่จุด (x, y) <strong>ค่า y (พิกัด Y) บนจุดตัดนั้นก็คือค่าของ sin(&theta;)</strong> นั่นเอง ด้วยนิยามนี้ ทำให้เราสามารถหาค่าไซน์ของมุมที่มากกว่า 90 องศา หรือแม้กระทั่งมุมที่ติดลบได้ ซึ่งค่าของ sin(&theta;) จะมีค่าแกว่งอยู่ระหว่าง -1 ถึง 1 เสมอ
        </p>

        <h3>ค่า Sine ของมุมพื้นฐานที่ควรจำ (องศา)</h3>
        <p>
          ในการเรียนหรือการทำข้อสอบ มักจะมีการอ้างอิงถึงมุมมาตรฐาน (Standard Angles) ที่มีค่าไซน์แบบจำได้ง่ายๆ ดังนี้:
        </p>
        <ul>
          <li><strong>sin(0°)</strong> = 0</li>
          <li><strong>sin(30°)</strong> = 1/2 หรือ 0.5</li>
          <li><strong>sin(45°)</strong> = &radic;2 / 2 (ประมาณ 0.707)</li>
          <li><strong>sin(60°)</strong> = &radic;3 / 2 (ประมาณ 0.866)</li>
          <li><strong>sin(90°)</strong> = 1</li>
        </ul>

        <h3>การนำค่าไซน์ (Sine) ไปประยุกต์ใช้งานในโลกจริง</h3>
        <p>
          ฟังก์ชันไซน์ไม่ได้เป็นเพียงสูตรในหน้ากระดาษ แต่ถูกนำไปใช้อย่างกว้างขวางในวิทยาศาสตร์และวิศวกรรมศาสตร์ ได้แก่:
        </p>
        <ul>
          <li><strong>ฟิสิกส์คลื่น (Wave Physics):</strong> ปรากฏการณ์ที่เกิดเป็นคาบซ้ำๆ เช่น คลื่นเสียง คลื่นแสง หรือคลื่นน้ำ มักถูกอธิบายด้วย "คลื่นไซน์ (Sine Wave)" หรือฟังก์ชันรูปคลื่นแบบไซนูซอยดัล (Sinusoidal)</li>
          <li><strong>วิศวกรรมไฟฟ้า (Electrical Engineering):</strong> กระแสไฟฟ้าสลับ (AC) ที่เราใช้ในบ้านเรือน มีรูปกราฟแรงดันไฟฟ้าและกระแสที่วิ่งเป็นรูปคลื่นไซน์ตามเวลา</li>
          <li><strong>คอมพิวเตอร์กราฟิกและการทำภาพเคลื่อนไหว (Computer Graphics & Animation):</strong> ใช้ฟังก์ชันไซน์ในการสร้างการเคลื่อนไหวแบบแกว่งไปมา (Oscillation) อย่างนุ่มนวล เช่น อนิเมชั่นของลูกตุ้มนาฬิกา หรือการจำลองผิวน้ำที่พลิ้วไหว</li>
        </ul>
        <p>
          ด้วยเครื่องคำนวณออนไลน์นี้ คุณสามารถแปลงมุมองศา (Degree) เป็นค่าไซน์ (Sine) ได้อย่างแม่นยำรวดเร็วโดยไม่ต้องเปิดตารางคณิตศาสตร์หรือกดเครื่องคิดเลขให้ยุ่งยาก พร้อมทั้งยังช่วยแปลงมุมองศาเป็นหน่วยเรเดียน (Radians) ให้ดูเพื่อเป็นข้อมูลประกอบการอ้างอิงอีกด้วย
        </p>
      </article>
    </div>
  );
}

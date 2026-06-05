"use client";

import React, { useState } from 'react';
import { Activity, Calculator, RefreshCw } from 'lucide-react';

export default function TrigTan({ lang }: { lang?: 'TH' | 'EN' }) {
  const isTH = lang === 'TH';

  const [angleDegrees, setAngleDegrees] = useState<string>('');
  const [result, setResult] = useState<number | string | null>(null);
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

    // Check for undefined values (e.g. 90, 270, -90, etc.)
    // Tangent is undefined when cos(theta) = 0, which happens at 90 + 180k
    if (Math.abs(degrees % 180) === 90) {
      setRadians(degrees * (Math.PI / 180));
      setResult(isTH ? 'หาค่าไม่ได้ (Undefined)' : 'Undefined');
      return;
    }

    // Convert degrees to radians for Math.tan()
    const rad = degrees * (Math.PI / 180);
    setRadians(rad);
    setResult(Math.tan(rad));
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
          <div className="p-4 bg-orange-50 text-orange-600 rounded-xl">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {isTH ? 'คำนวณค่าแทนเจนต์ (Tangent)' : 'Tangent Calculator (tan)'}
            </h2>
            <p className="text-slate-500 mt-1">
              {isTH ? 'หาค่า tan(θ) จากมุมหน่วยองศา' : 'Find tan(θ) from angle in degrees'}
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
                placeholder={isTH ? "เช่น 45, 60" : "e.g., 45, 60"}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
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
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
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
              {isTH ? 'ผลลัพธ์ ค่า tan(θ)' : 'Result tan(θ)'}
            </h3>
            <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-4 break-words w-full">
              {result !== null 
                ? typeof result === 'number' 
                  ? (Math.abs(result) < 1e-10 ? 0 : result).toLocaleString(undefined, { maximumFractionDigits: 6 })
                  : result
                : '-'}
            </div>
            {radians !== null && typeof result === 'number' && (
              <div className="text-slate-500 text-sm mt-2 flex flex-col items-center gap-1">
                <p>tan({angleDegrees}&deg;)</p>
                <p>≈ {radians.toFixed(4)} {isTH ? 'เรเดียน (Radians)' : 'Radians'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose prose-orange max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
        <h2>ค่าแทนเจนต์ (Tangent) ในตรีโกณมิติคืออะไร?</h2>
        <p>
          <strong>แทนเจนต์ (Tangent)</strong> หรือที่เขียนตัวย่อว่า <strong>tan</strong> เป็นฟังก์ชันตรีโกณมิติที่มีบทบาทสำคัญในการบอกความชันและการเอียง เมื่อเปรียบเทียบกับฟังก์ชัน Sine และ Cosine แล้ว Tangent จะไม่ได้เกี่ยวข้องโดยตรงกับความยาวของด้านตรงข้ามมุมฉาก แต่จะมุ่งเน้นไปที่ความสัมพันธ์ของ "ด้านประกอบมุมฉาก" ทั้งสองด้านมากกว่า ซึ่งทำให้ฟังก์ชันนี้มีความเฉพาะตัวและนำไปใช้งานในชีวิตประจำวันได้อย่างกว้างขวาง
        </p>

        <h3>ความหมายของ Tangent จากรูปสามเหลี่ยมมุมฉาก</h3>
        <p>
          ในรูปสามเหลี่ยมมุมฉาก หากเรากำหนดให้มุมที่เราพิจารณาคือมุม &theta; ค่า <strong>tan(&theta;)</strong> จะหาได้จากอัตราส่วนระหว่างความยาวของด้านตรงข้ามมุม &theta; ต่อความยาวของด้านประชิดมุม &theta; ตามสูตร:
        </p>
        <p className="text-center font-bold text-lg my-4">
          tan(&theta;) = ข้าม (Opposite) / ชิด (Adjacent)
        </p>
        <p>
          นอกจากนี้ ในทางคณิตศาสตร์ เรายังสามารถหาค่า Tangent ได้จากการนำค่า Sine มาหารด้วยค่า Cosine ของมุมเดียวกัน ซึ่งเขียนสมการได้ว่า <strong>tan(&theta;) = sin(&theta;) / cos(&theta;)</strong> เสมอ
        </p>

        <h3>พฤติกรรมพิเศษของกราฟ Tangent และค่า Undefined</h3>
        <p>
          สิ่งหนึ่งที่ทำให้ฟังก์ชัน Tangent แตกต่างจากฟังก์ชันอื่นๆ คือ "มันไม่มีขีดจำกัด" (No bounds) ค่า sin และ cos จะมีค่าอยู่ระหว่าง -1 ถึง 1 เสมอ แต่ค่า tan สามารถเป็นจำนวนจริงใดๆ ก็ได้ตั้งแต่ลบอนันต์ (-&infin;) ไปจนถึงบวกอนันต์ (+&infin;)
        </p>
        <p>
          อย่างไรก็ตาม เมื่อมุมมีค่าเท่ากับ 90 องศา หรือ 270 องศา ค่า cos(&theta;) จะมีค่าเท่ากับ 0 ดังนั้นเมื่อแทนในสูตร tan = sin / cos ตัวส่วนจะเป็น 0 ซึ่งในทางคณิตศาสตร์ <strong>ไม่สามารถนิยามได้ (Undefined)</strong> หรือที่เราเรียกว่าค่าอนันต์ (Infinity) กราฟของ Tangent ในมุมเหล่านี้จึงเกิดเส้นกำกับแนวตั้ง (Vertical Asymptote)
        </p>

        <h3>ค่า Tangent ของมุมที่ควรรู้จัก (องศา)</h3>
        <ul>
          <li><strong>tan(0°)</strong> = 0</li>
          <li><strong>tan(30°)</strong> = 1 / &radic;3 (ประมาณ 0.577)</li>
          <li><strong>tan(45°)</strong> = 1 (ความหมายคือ ด้านประกอบมุมฉากทั้งสองด้านมีความยาวเท่ากันพอดี)</li>
          <li><strong>tan(60°)</strong> = &radic;3 (ประมาณ 1.732)</li>
          <li><strong>tan(90°)</strong> = หาค่าไม่ได้ (Undefined)</li>
        </ul>

        <h3>การนำค่าแทนเจนต์ (Tangent) ไปประยุกต์ใช้งาน</h3>
        <p>
          เนื่องจาก Tangent บอกอัตราส่วนระหว่างการเปลี่ยนแปลงแนวตั้ง (ข้าม) และแนวนอน (ชิด) มันจึงเป็นเครื่องมือชั้นเยี่ยมในการหา "ความชัน (Slope)" ของสิ่งต่างๆ
        </p>
        <ul>
          <li><strong>วิศวกรรมการทาง (Highway Engineering):</strong> ใช้คำนวณความชันของถนนหรือเนินเขา (Grade/Gradient) ว่าลาดชันกี่องศา ปลอดภัยต่อการขับขี่หรือไม่</li>
          <li><strong>การหาความสูงของวัตถุ (Height Measurement):</strong> เช่น หากเรายืนห่างจากต้นไม้หรือตึกระยะหนึ่ง แล้ววัดมุมเงยไปที่ยอดต้นไม้ได้ &theta; เราสามารถใช้สูตร ความสูง = ระยะห่าง &times; tan(&theta;) เพื่อหาความสูงของสิ่งนั้นได้ทันทีโดยไม่ต้องปีนขึ้นไปวัด</li>
          <li><strong>ดาราศาสตร์และการเดินเรือ (Astronomy & Navigation):</strong> ใช้ในการคำนวณระยะห่างของดวงดาว หรือคำนวณทิศทางสัมพัทธ์ในแผนที่</li>
        </ul>
        <p>
          เครื่องคิดเลขหาค่าแทนเจนต์ (Tangent Calculator) ที่อยู่ด้านบน ได้ถูกออกแบบมาให้รองรับการคำนวณที่แม่นยำ และจัดการกับกรณีค่าที่หาไม่ได้ (เช่นมุม 90 หรือ 270 องศา) อย่างถูกต้องตามหลักคณิตศาสตร์ ช่วยให้ผู้ใช้สามารถนำไปประกอบการเรียนหรือการทำงานจริงได้อย่างรวดเร็วและไร้ข้อกังวล
        </p>
      </article>
    </div>
  );
}

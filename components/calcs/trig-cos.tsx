"use client";

import React, { useState } from 'react';
import { Activity, Calculator, RefreshCw } from 'lucide-react';

export default function TrigCos({ lang }: { lang?: 'TH' | 'EN' }) {
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

    // Convert degrees to radians for Math.cos()
    const rad = degrees * (Math.PI / 180);
    setRadians(rad);
    setResult(Math.cos(rad));
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
          <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {isTH ? 'คำนวณค่าโคไซน์ (Cosine)' : 'Cosine Calculator (cos)'}
            </h2>
            <p className="text-slate-500 mt-1">
              {isTH ? 'หาค่า cos(θ) จากมุมหน่วยองศา' : 'Find cos(θ) from angle in degrees'}
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
                placeholder={isTH ? "เช่น 30, 45, 60" : "e.g., 30, 45, 60"}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
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
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
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
              {isTH ? 'ผลลัพธ์ ค่า cos(θ)' : 'Result cos(θ)'}
            </h3>
            <div className="text-5xl font-bold text-purple-600 mb-4 break-all">
              {result !== null 
                ? (Math.abs(result) < 1e-10 ? 0 : result).toLocaleString(undefined, { maximumFractionDigits: 6 }) 
                : '-'}
            </div>
            {radians !== null && (
              <div className="text-slate-500 text-sm mt-2 flex flex-col items-center gap-1">
                <p>cos({angleDegrees}&deg;)</p>
                <p>≈ {radians.toFixed(4)} {isTH ? 'เรเดียน (Radians)' : 'Radians'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose prose-purple max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
        <h2>ค่าโคไซน์ (Cosine) ในตรีโกณมิติคืออะไร?</h2>
        <p>
          ในคณิตศาสตร์สาขาตรีโกณมิติ (Trigonometry) นอกเหนือจากค่า Sine แล้ว <strong>โคไซน์ (Cosine)</strong> หรือที่นิยมเรียกย่อๆ ว่า <strong>cos</strong> เป็นอีกหนึ่งฟังก์ชันพื้นฐานที่ขาดไม่ได้ การศึกษาค่าโคไซน์จะช่วยให้เราเข้าใจความสัมพันธ์ของมุมและระยะทางในเชิงรูปทรงเรขาคณิต รวมไปถึงนำไปอธิบายปรากฏการณ์ต่างๆ ในเชิงฟิสิกส์ได้อย่างลึกซึ้ง
        </p>

        <h3>นิยามของ Cosine จากรูปสามเหลี่ยมมุมฉาก</h3>
        <p>
          หากเรามีรูปสามเหลี่ยมมุมฉากอยู่หนึ่งรูป และพิจารณาที่มุมใดมุมหนึ่งที่ไม่ใช่มุมฉาก (ให้ชื่อว่ามุม &theta;) เราสามารถนิยามค่า <strong>cos(&theta;)</strong> ได้จากอัตราส่วนของความยาวด้านสองด้าน ดังนี้:
        </p>
        <p className="text-center font-bold text-lg my-4">
          cos(&theta;) = ชิด (Adjacent) / ฉาก (Hypotenuse)
        </p>
        <ul>
          <li><strong>ชิด (Adjacent):</strong> คือความยาวของด้านประกอบมุมฉากที่อยู่ติดกับมุม &theta; ที่เรากำลังพิจารณา</li>
          <li><strong>ฉาก (Hypotenuse):</strong> คือความยาวของด้านตรงข้ามมุมฉาก ซึ่งมีความยาวมากที่สุดเสมอ</li>
        </ul>
        <p>
          นี่คือที่มาของคำช่วยจำในวิชาคณิตศาสตร์ที่ว่า "ข้าม-ฉาก (sin), ชิด-ฉาก (cos), ข้าม-ชิด (tan)" นั่นเอง
        </p>

        <h3>ความหมายของ Cosine บนวงกลมหนึ่งหน่วย (Unit Circle)</h3>
        <p>
          เมื่อขยายขอบเขตการคำนวณไปยังมุมที่มากกว่า 90 องศา หรือมุมติดลบ เราจะพึ่งพา <strong>วงกลมหนึ่งหน่วย (Unit Circle)</strong> (วงกลมรัศมี 1 หน่วยที่มีจุดศูนย์กลางอยู่ที่ x=0, y=0) เป็นหลัก
        </p>
        <p>
          หากเราลากเส้นทำมุม &theta; องศาจากจุดศูนย์กลางไปตัดที่เส้นขอบของวงกลมหนึ่งหน่วย ณ จุด (x, y) <strong>ค่า x (พิกัด X) บนจุดตัดนั้น จะมีค่าเท่ากับ cos(&theta;) เสมอ</strong> ในขณะที่ค่า y จะเท่ากับ sin(&theta;) รูปแบบนี้อธิบายได้ชัดเจนว่าทำไมค่าโคไซน์ของมุมใดๆ ก็ตามจะไม่มีทางเกินช่วงตั้งแต่ -1 ถึง 1
        </p>

        <h3>ค่า Cosine ของมุมมาตรฐานทั่วไป (องศา)</h3>
        <p>
          เพื่อให้ง่ายต่อการคำนวณและการสอบ นักเรียนมักจะต้องจดจำค่าโคไซน์ของมุมที่พบบ่อยเหล่านี้:
        </p>
        <ul>
          <li><strong>cos(0°)</strong> = 1</li>
          <li><strong>cos(30°)</strong> = &radic;3 / 2 (ประมาณ 0.866)</li>
          <li><strong>cos(45°)</strong> = &radic;2 / 2 (ประมาณ 0.707)</li>
          <li><strong>cos(60°)</strong> = 1/2 หรือ 0.5</li>
          <li><strong>cos(90°)</strong> = 0</li>
        </ul>
        <p>
          สังเกตได้ว่าค่าของ cos จะสวนทางกับ sin ในช่วงมุม 0 ถึง 90 องศา (เช่น cos 0° จะเท่ากับ sin 90° และ cos 60° จะเท่ากับ sin 30°)
        </p>

        <h3>การนำค่าโคไซน์ (Cosine) ไปใช้ประโยชน์</h3>
        <p>
          ฟังก์ชันโคไซน์ถูกนำไปประยุกต์ใช้ในวงการวิทยาศาสตร์และวิศวกรรมมากมาย เช่น:
        </p>
        <ul>
          <li><strong>วิศวกรรมโยธาและสถาปัตยกรรม (Civil Engineering & Architecture):</strong> ใช้คำนวณหาแรงลัพธ์ (Resultant Force) หรือโครงสร้างการรับน้ำหนักในแนวราบ (Horizontal Components) เมื่อโครงสร้างเหล่านั้นทำมุมเอียง</li>
          <li><strong>กฎของโคไซน์ (Law of Cosines):</strong> ใช้เพื่อหาความยาวด้านหรือมุมของรูปสามเหลี่ยมใดๆ ก็ได้ (ไม่จำเป็นต้องเป็นสามเหลี่ยมมุมฉาก) ซึ่งมีความสำคัญต่อการรังวัดที่ดินและแผนที่</li>
          <li><strong>การประมวลผลสัญญาณและภาพ (Signal & Image Processing):</strong> เทคนิคอย่าง Discrete Cosine Transform (DCT) เป็นหัวใจสำคัญของกระบวนการบีบอัดไฟล์ภาพ JPEG และไฟล์วิดีโอที่เราใช้งานกันทุกวันนี้</li>
        </ul>
        <p>
          เครื่องมือ <strong>คำนวณค่าโคไซน์ (Cosine Calculator)</strong> นี้ จะช่วยให้คุณประหยัดเวลาได้อย่างมาก เพียงกรอกตัวเลขมุมเป็นองศา คุณก็จะได้ค่า Cosine พร้อมค่ามุมในหน่วยเรเดียนในเสี้ยววินาที ลดข้อผิดพลาดจากการคำนวณมือได้อย่างเต็มที่
        </p>
      </article>
    </div>
  );
}

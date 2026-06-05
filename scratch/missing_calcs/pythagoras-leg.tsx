"use client";

import React, { useState } from 'react';
import { Triangle, Calculator, RefreshCw } from 'lucide-react';

export default function PythagorasLeg({ lang }: { lang?: 'TH' | 'EN' }) {
  const isTH = lang === 'TH';

  const [hypotenuseC, setHypotenuseC] = useState<string>('');
  const [legA, setLegA] = useState<string>('');
  const [legB, setLegB] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    const c = parseFloat(hypotenuseC);
    const a = parseFloat(legA);

    if (isNaN(c) || isNaN(a)) {
      setError(isTH ? 'กรุณากรอกตัวเลขให้ถูกต้องทั้งสองช่อง' : 'Please enter valid numbers for both fields.');
      setLegB(null);
      return;
    }

    if (c <= 0 || a <= 0) {
      setError(isTH ? 'ความยาวด้านต้องมากกว่า 0' : 'Side lengths must be greater than 0.');
      setLegB(null);
      return;
    }

    if (a >= c) {
      setError(isTH ? 'ด้านตรงข้ามมุมฉาก (C) ต้องยาวกว่าด้านประกอบมุมฉากเสมอ' : 'Hypotenuse (C) must be longer than the leg.');
      setLegB(null);
      return;
    }

    const b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
    setLegB(b);
  };

  const clear = () => {
    setHypotenuseC('');
    setLegA('');
    setLegB(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
            <Triangle className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {isTH ? 'คำนวณด้านประกอบมุมฉาก' : 'Calculate Triangle Leg'}
            </h2>
            <p className="text-slate-500 mt-1">
              {isTH ? 'ทฤษฎีบทพีทาโกรัส: A = √(C² - B²)' : 'Pythagorean Theorem: Leg = √(C² - other Leg²)'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {isTH ? 'ความยาวด้านตรงข้ามมุมฉาก (C)' : 'Hypotenuse Length (C)'}
              </label>
              <input
                type="number"
                value={hypotenuseC}
                onChange={(e) => setHypotenuseC(e.target.value)}
                placeholder={isTH ? "เช่น 5" : "e.g., 5"}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {isTH ? 'ความยาวด้านประกอบมุมฉากที่ทราบค่า (A หรือ B)' : 'Known Leg Length (A or B)'}
              </label>
              <input
                type="number"
                value={legA}
                onChange={(e) => setLegA(e.target.value)}
                placeholder={isTH ? "เช่น 3" : "e.g., 3"}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
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
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
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
              {isTH ? 'ความยาวด้านประกอบมุมฉากที่เหลือ' : 'Missing Leg Length'}
            </h3>
            <div className="text-5xl font-bold text-emerald-600 mb-4 break-all">
              {legB !== null ? legB.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '-'}
            </div>
            {legB !== null && (
              <p className="text-slate-500 text-sm">
                = &radic;({hypotenuseC}² - {legA}²)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose prose-emerald max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
        <h2>การคำนวณหาความยาวด้านประกอบมุมฉากด้วยทฤษฎีบทพีทาโกรัส</h2>
        <p>
          ในการศึกษาวิชาเรขาคณิต ทฤษฎีบทพีทาโกรัส (Pythagorean Theorem) มักถูกใช้บ่อยครั้งเพื่อหาความยาวของด้านที่ยาวที่สุด (ด้านตรงข้ามมุมฉาก) อย่างไรก็ตาม ในสถานการณ์จริงหลายๆ ครั้ง เราอาจจะทราบความยาวของด้านตรงข้ามมุมฉากและด้านประกอบมุมฉากด้านหนึ่งอยู่แล้ว แต่สิ่งที่ยังขาดหายไปและต้องการหาคือ <strong>ความยาวของด้านประกอบมุมฉากที่เหลือ (Missing Leg)</strong> ซึ่งเราสามารถใช้หลักการเดียวกันนี้มาประยุกต์และพลิกแพลงสมการเพื่อหาคำตอบได้อย่างแม่นยำ
        </p>

        <h3>การจัดรูปสมการพีทาโกรัสใหม่ (Rearranging the Formula)</h3>
        <p>
          จากสูตรพื้นฐานของพีทาโกรัสที่ว่า <strong>C² = A² + B²</strong> 
          (โดยที่ C คือด้านตรงข้ามมุมฉาก ส่วน A และ B คือด้านประกอบมุมฉาก) 
          หากเราทราบค่าของ C และ A แต่ต้องการหาค่า B เราสามารถย้ายข้างสมการทางคณิตศาสตร์ได้ดังนี้:
        </p>
        <p>
          <strong>B² = C² - A²</strong>
        </p>
        <p>
          และเมื่อถอดรากที่สอง (Square Root) ออกมา จะได้สูตรสุดท้ายสำหรับหาความยาวด้านที่เหลือคือ:
          <strong>B = &radic;(C² - A²)</strong> 
          (หรือในทางกลับกัน ถ้าต้องการหา A ก็ใช้สูตร A = &radic;(C² - B²))
        </p>

        <h3>ตัวอย่างการคำนวณที่พบได้บ่อย</h3>
        <p>
          สมมติว่าคุณกำลังพาดบันไดที่มีความยาว 13 เมตร (ด้านตรงข้ามมุมฉาก C = 13) ไว้กับกำแพงบ้าน และคุณทราบว่าโคนบันไดอยู่ห่างจากกำแพง 5 เมตร (ด้านประกอบมุมฉากด้านหนึ่ง A = 5) คุณต้องการทราบว่ายอดของบันไดพาดอยู่สูงจากพื้นเท่าใด (ด้านประกอบมุมฉากอีกด้าน B = ?)
        </p>
        <ol>
          <li>นำค่าที่ทราบไปแทนในสูตร: B² = 13² - 5²</li>
          <li>คำนวณกำลังสอง: B² = 169 - 25</li>
          <li>หาผลลบ: B² = 144</li>
          <li>ถอดรากที่สอง: B = &radic;144 = 12</li>
        </ol>
        <p>
          สรุปได้ว่ายอดบันไดพาดอยู่สูงจากพื้น 12 เมตรพอดี (ชุดตัวเลข 5, 12, 13 นี้ก็เป็นชุดตัวเลขพีทาโกรัสที่พบได้บ่อยเช่นกัน)
        </p>

        <h3>ข้อควรระวังในการคำนวณ (Common Pitfalls)</h3>
        <p>
          กฎเหล็กของการหาด้านประกอบมุมฉากคือ <strong>ด้านตรงข้ามมุมฉาก (C) จะต้องยาวกว่าด้านประกอบมุมฉาก (A หรือ B) เสมอ</strong> 
          หากในการคำนวณ คุณพบว่าค่า C น้อยกว่าหรือเท่ากับ A แสดงว่าข้อมูลที่คุณมีอาจจะผิดพลาด เพราะเมื่อนำมาลบกัน (C² - A²) จะได้ค่าติดลบ ซึ่งไม่สามารถถอดรากที่สองในระบบจำนวนจริงได้ เครื่องคิดเลขนี้ได้ออกแบบระบบป้องกันความผิดพลาดดังกล่าวไว้แล้ว โดยจะแจ้งเตือนผู้ใช้งานหากกรอกข้อมูลที่ไม่สมเหตุสมผลทางเรขาคณิต
        </p>

        <h3>ประโยชน์และการนำไปประยุกต์ใช้</h3>
        <p>
          การหาความยาวด้านประกอบมุมฉากมีประโยชน์อย่างมากในงานช่าง งานก่อสร้าง และวิศวกรรม เช่น:
        </p>
        <ul>
          <li><strong>การคำนวณความสูง:</strong> เมื่อทราบระยะทางที่พาดสิ่งของ (ความยาวบันได/นั่งร้าน) และระยะห่างจากฐาน</li>
          <li><strong>การหาพิกัดบนแผนที่:</strong> เมื่อทราบระยะกระจัด (Displacement) และความกว้างหรือยาวในแกน X/Y ไปแล้วด้านหนึ่ง</li>
          <li><strong>งานออกแบบเฟอร์นิเจอร์:</strong> การวัดความยาวของไม้ค้ำยันหรือบานพับที่ต้องรับน้ำหนักในมุม 90 องศา</li>
        </ul>
        <p>
          ด้วยเครื่องมือคำนวณด้านประกอบมุมฉากพีทาโกรัสบนหน้านี้ คุณสามารถกรอกตัวเลขเพื่อหาคำตอบของด้านที่หายไปได้อย่างรวดเร็ว ไม่ต้องเสียเวลาทดเลขหรือกังวลว่าจะย้ายสมการผิด ช่วยให้การทำงานและการเรียนรู้คณิตศาสตร์ของคุณสะดวกสบายมากยิ่งขึ้น
        </p>
      </article>
    </div>
  );
}

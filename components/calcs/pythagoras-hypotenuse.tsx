"use client";

import React, { useState } from 'react';
import { TriangleRight, Calculator, RefreshCw } from 'lucide-react';

export default function PythagorasHypotenuse({ lang }: { lang?: 'TH' | 'EN' }) {
  const isTH = lang === 'TH';

  const [sideA, setSideA] = useState<string>('');
  const [sideB, setSideB] = useState<string>('');
  const [hypotenuse, setHypotenuse] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);

    if (isNaN(a) || isNaN(b)) {
      setError(isTH ? 'กรุณากรอกตัวเลขให้ถูกต้องทั้งสองช่อง' : 'Please enter valid numbers for both sides.');
      setHypotenuse(null);
      return;
    }

    if (a <= 0 || b <= 0) {
      setError(isTH ? 'ความยาวด้านต้องมากกว่า 0' : 'Side lengths must be greater than 0.');
      setHypotenuse(null);
      return;
    }

    const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    setHypotenuse(c);
  };

  const clear = () => {
    setSideA('');
    setSideB('');
    setHypotenuse(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl">
            <TriangleRight className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {isTH ? 'คำนวณด้านตรงข้ามมุมฉาก (C)' : 'Calculate Hypotenuse (C)'}
            </h2>
            <p className="text-slate-500 mt-1">
              {isTH ? 'ทฤษฎีบทพีทาโกรัส: C² = A² + B²' : 'Pythagorean Theorem: C² = A² + B²'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {isTH ? 'ความยาวด้านประกอบมุมฉาก (A)' : 'Leg Length (A)'}
              </label>
              <input
                type="number"
                value={sideA}
                onChange={(e) => setSideA(e.target.value)}
                placeholder={isTH ? "เช่น 3" : "e.g., 3"}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {isTH ? 'ความยาวด้านประกอบมุมฉาก (B)' : 'Leg Length (B)'}
              </label>
              <input
                type="number"
                value={sideB}
                onChange={(e) => setSideB(e.target.value)}
                placeholder={isTH ? "เช่น 4" : "e.g., 4"}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
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
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
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
              {isTH ? 'ความยาวด้านตรงข้ามมุมฉาก (C)' : 'Hypotenuse Length (C)'}
            </h3>
            <div className="text-5xl font-bold text-indigo-600 mb-4 break-all">
              {hypotenuse !== null ? hypotenuse.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '-'}
            </div>
            {hypotenuse !== null && (
              <p className="text-slate-500 text-sm">
                C = &radic;({sideA}² + {sideB}²)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose prose-indigo max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
        <h2>ทฤษฎีบทพีทาโกรัสและการหาความยาวด้านตรงข้ามมุมฉาก (Hypotenuse)</h2>
        <p>
          ทฤษฎีบทพีทาโกรัส (Pythagorean Theorem) เป็นหนึ่งในทฤษฎีบททางคณิตศาสตร์ที่มีชื่อเสียงและมีความสำคัญมากที่สุดในวิชาเรขาคณิต ซึ่งว่าด้วยความสัมพันธ์ระหว่างความยาวของด้านทั้งสามของรูปสามเหลี่ยมมุมฉาก (Right Triangle) โดยทฤษฎีนี้ระบุไว้ว่า "ในรูปสามเหลี่ยมมุมฉากใดๆ กำลังสองของความยาวด้านตรงข้ามมุมฉาก (Hypotenuse) จะเท่ากับผลบวกของกำลังสองของความยาวด้านประกอบมุมฉาก (Legs) ทั้งสองด้าน"
        </p>

        <h3>สูตรพีทาโกรัส (Pythagorean Formula)</h3>
        <p>
          หากเรากำหนดให้:
        </p>
        <ul>
          <li><strong>C</strong> คือ ความยาวของด้านตรงข้ามมุมฉาก (ด้านที่ยาวที่สุดในสามเหลี่ยมมุมฉาก)</li>
          <li><strong>A</strong> และ <strong>B</strong> คือ ความยาวของด้านประกอบมุมฉาก (ด้านที่สร้างมุม 90 องศา)</li>
        </ul>
        <p>
          เราจะได้สมการคณิตศาสตร์ว่า: <strong>C² = A² + B²</strong>
        </p>
        <p>
          ดังนั้น เมื่อเราต้องการหาความยาวของด้าน C (ด้านตรงข้ามมุมฉาก) เราสามารถทำการถอดรากที่สอง (Square Root) ของผลบวกดังกล่าวได้ นั่นคือสมการ: <strong>C = &radic;(A² + B²)</strong>
        </p>

        <h3>ตัวอย่างการคำนวณ</h3>
        <p>
          สมมติว่าเรามีรูปสามเหลี่ยมมุมฉากรูปหนึ่งที่มีความยาวด้านประกอบมุมฉากสองด้านคือ 3 เมตร และ 4 เมตร เราต้องการทราบความยาวของด้านตรงข้ามมุมฉาก
        </p>
        <ol>
          <li>แทนค่าในสูตร: C² = 3² + 4²</li>
          <li>คำนวณกำลังสอง: C² = 9 + 16</li>
          <li>รวมค่า: C² = 25</li>
          <li>ถอดรากที่สอง: C = &radic;25 = 5</li>
        </ol>
        <p>
          ดังนั้น ความยาวของด้านตรงข้ามมุมฉากในตัวอย่างนี้คือ 5 เมตร (นี่คือตัวอย่างของชุดตัวเลขพีทาโกรัสที่เป็นที่รู้จักกันดีคือ 3, 4, 5)
        </p>

        <h3>ประวัติความเป็นมาและที่มาของชื่อ</h3>
        <p>
          ชื่อของทฤษฎีบทนี้ตั้งตามชื่อของ "พีทาโกรัสแห่งซามอส" (Pythagoras of Samos) นักปรัชญาและนักคณิตศาสตร์ชาวกรีกโบราณ แม้ว่าหลักฐานทางประวัติศาสตร์จะบ่งชี้ว่าชนชาติอื่นๆ เช่น ชาวบาบิโลนและชาวจีน อาจจะรู้จักความสัมพันธ์นี้มาก่อนที่พีทาโกรัสจะเกิดก็ตาม แต่พีทาโกรัสและกลุ่มสาวกของเขา (Pythagoreans) ได้รับเครดิตว่าเป็นผู้แรกที่สามารถพิสูจน์ทฤษฎีบทนี้ได้อย่างเป็นระบบทางคณิตศาสตร์
        </p>

        <h3>การนำทฤษฎีบทพีทาโกรัสไปใช้ในชีวิตจริง (Applications)</h3>
        <p>
          การคำนวณหาด้านตรงข้ามมุมฉากมีประโยชน์อย่างมหาศาลและถูกนำไปใช้ในหลายวงการ:
        </p>
        <ul>
          <li><strong>สถาปัตยกรรมและการก่อสร้าง (Architecture & Construction):</strong> ใช้ในการตรวจสอบความตั้งฉากของมุมห้องหรืออาคาร (เช่น การใช้หลักการ 3-4-5 ในการวางผัง) ตลอดจนการคำนวณความยาวของวัสดุที่ต้องใช้พาดในแนวทแยง เช่น บันได โครงหลังคา</li>
          <li><strong>การนำทางและการสำรวจ (Navigation & Surveying):</strong> ใช้ในการคำนวณระยะทางที่สั้นที่สุดระหว่างจุดสองจุดบนแผนที่ในระบบพิกัดคาร์ทีเซียน 2 มิติ รวมถึงการคำนวณระยะทางเดินเรือหรือเครื่องบิน</li>
          <li><strong>วิทยาศาสตร์คอมพิวเตอร์ (Computer Science):</strong> ใช้ในการคำนวณระยะห่างระหว่างจุดในหน้าจอคอมพิวเตอร์ กราฟิก 3 มิติ และในอัลกอริทึมต่างๆ ทางฟิสิกส์เอนจิน (Physics Engine) ในเกม</li>
        </ul>

        <h3>สรุป</h3>
        <p>
          เครื่องมือคำนวณด้านตรงข้ามมุมฉาก (Pythagoras Hypotenuse Calculator) นี้ถูกออกแบบมาเพื่อให้การคำนวณเป็นไปอย่างรวดเร็วและแม่นยำ ไม่ว่าคุณจะเป็นนักเรียนที่ต้องการตรวจคำตอบของการบ้านคณิตศาสตร์ วิศวกรที่ต้องการคำนวณโครงสร้าง หรือบุคคลทั่วไปที่ต้องการหาความยาวทแยงมุมของสิ่งของต่างๆ เพียงแค่กรอกความยาวของด้านประกอบมุมฉากสองด้าน ระบบจะประมวลผลตามสมการ <code>C = &radic;(A² + B²)</code> ออกมาให้ทันที ลดโอกาสความผิดพลาดจากการคิดด้วยมือและประหยัดเวลาได้อย่างมาก
        </p>
      </article>
    </div>
  );
}

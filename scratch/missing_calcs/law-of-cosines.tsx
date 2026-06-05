"use client";

import React, { useState } from 'react';
import { TriangleRight } from 'lucide-react';

export default function LawOfCosines({ lang }: { lang: 'th' | 'en' }) {
  const [solveFor, setSolveFor] = useState<'side' | 'angle'>('side');
  
  // Side scenario: known a, b, angle C -> find c
  const [sideA, setSideA] = useState<string>('');
  const [sideB, setSideB] = useState<string>('');
  const [angleC, setAngleC] = useState<string>('');
  
  // Angle scenario: known a, b, c -> find angle C
  const [sideA2, setSideA2] = useState<string>('');
  const [sideB2, setSideB2] = useState<string>('');
  const [sideC2, setSideC2] = useState<string>('');

  const t = {
    title: lang === 'th' ? 'คำนวณสามเหลี่ยมด้วยกฎของโคไซน์' : 'Law of Cosines Calculator',
    desc: lang === 'th' ? 'หาความยาวด้านหรือมุมโดยใช้กฎของโคไซน์ (c² = a² + b² - 2ab cosC)' : 'Calculate side or angle using the Law of Cosines (c² = a² + b² - 2ab cosC)',
    modeSide: lang === 'th' ? 'หาความยาวด้าน (c)' : 'Find Side c',
    modeAngle: lang === 'th' ? 'หาขนาดมุม (C)' : 'Find Angle C',
    
    labelSideA: lang === 'th' ? 'ความยาวด้าน a' : 'Side a length',
    labelSideB: lang === 'th' ? 'ความยาวด้าน b' : 'Side b length',
    labelSideC: lang === 'th' ? 'ความยาวด้าน c' : 'Side c length',
    labelAngleC: lang === 'th' ? 'มุม C (องศา)' : 'Angle C (degrees)',
    
    resultSide: lang === 'th' ? 'ความยาวด้าน c:' : 'Side c length:',
    resultAngle: lang === 'th' ? 'ขนาดมุม C (องศา):' : 'Angle C (degrees):',
    errorInvalid: lang === 'th' ? 'ค่าที่ระบุไม่สามารถสร้างเป็นสามเหลี่ยมได้' : 'Invalid triangle sides',
  };

  const toRad = (deg: number) => deg * Math.PI / 180;
  const toDeg = (rad: number) => rad * 180 / Math.PI;

  const calculateSide = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const C = parseFloat(angleC);

    if (isNaN(a) || isNaN(b) || isNaN(C) || a <= 0 || b <= 0 || C <= 0 || C >= 180) {
      return null;
    }

    // c^2 = a^2 + b^2 - 2ab cos(C)
    const c2 = a*a + b*b - 2*a*b*Math.cos(toRad(C));
    if (c2 <= 0) return null;
    
    return Math.sqrt(c2).toFixed(4);
  };

  const calculateAngle = () => {
    const a = parseFloat(sideA2);
    const b = parseFloat(sideB2);
    const c = parseFloat(sideC2);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
      return null;
    }

    // Triangle inequality check
    if (a + b <= c || a + c <= b || b + c <= a) {
      return t.errorInvalid;
    }

    // cos(C) = (a^2 + b^2 - c^2) / (2ab)
    const cosC = (a*a + b*b - c*c) / (2*a*b);
    const C = toDeg(Math.acos(cosC));
    
    return C.toFixed(4);
  };

  const resSide = solveFor === 'side' ? calculateSide() : null;
  const resAngle = solveFor === 'angle' ? calculateAngle() : null;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
          <TriangleRight className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t.title}</h2>
          <p className="text-sm text-slate-500">{t.desc}</p>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setSolveFor('side')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${solveFor === 'side' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
        >
          {t.modeSide}
        </button>
        <button
          onClick={() => setSolveFor('angle')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${solveFor === 'angle' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
        >
          {t.modeAngle}
        </button>
      </div>

      <div className="space-y-6">
        {solveFor === 'side' ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelSideA}</label>
                <input type="number" value={sideA} onChange={e => setSideA(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelSideB}</label>
                <input type="number" value={sideB} onChange={e => setSideB(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelAngleC}</label>
                <input type="number" value={angleC} onChange={e => setAngleC(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
            </div>
            {resSide && (
              <div className="p-6 bg-teal-50 rounded-xl border border-teal-100">
                <h3 className="text-sm font-medium text-teal-900 mb-2">{t.resultSide}</h3>
                <p className="text-2xl text-teal-950 font-bold">{resSide}</p>
              </div>
            )}
          </>
        ) : (
          <>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelSideA}</label>
                <input type="number" value={sideA2} onChange={e => setSideA2(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelSideB}</label>
                <input type="number" value={sideB2} onChange={e => setSideB2(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelSideC}</label>
                <input type="number" value={sideC2} onChange={e => setSideC2(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
            </div>
            {resAngle && (
              <div className="p-6 bg-teal-50 rounded-xl border border-teal-100">
                <h3 className="text-sm font-medium text-teal-900 mb-2">{t.resultAngle}</h3>
                <p className="text-2xl text-teal-950 font-bold">{resAngle} &deg;</p>
              </div>
            )}
          </>
        )}
      </div>

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">กฎของโคไซน์ (Law of Cosines) คืออะไร?</h2>
        <p>
          ในทางตรีโกณมิติ <strong>กฎของโคไซน์ (Law of Cosines)</strong> หรือกฎโคไซน์ เป็นสมการที่ใช้อธิบายความสัมพันธ์ระหว่างความยาวด้านทั้งสามของรูปสามเหลี่ยม และค่าโคไซน์ (Cosine) ของมุมมุมหนึ่งในรูปสามเหลี่ยมนั้น 
          อาจกล่าวได้ว่า กฎของโคไซน์นั้นเป็นส่วนขยายของทฤษฎีบทพีทาโกรัส (Pythagorean Theorem) ที่สามารถนำไปใช้กับรูปสามเหลี่ยมใดๆ ก็ได้ ไม่จำกัดเฉพาะสามเหลี่ยมมุมฉากเท่านั้น
        </p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">สูตรกฎของโคไซน์ (Formula)</h3>
        <p>
          เมื่อพิจารณาสามเหลี่ยมที่มีมุม A, B และ C โดยมีความยาวด้านที่อยู่ตรงข้ามเป็น a, b และ c ตามลำดับ กฎของโคไซน์สามารถเขียนในรูปแบบสมการได้ 3 รูปแบบหลักๆ ดังนี้:
        </p>
        <div className="bg-slate-50 p-4 rounded-lg my-4 font-mono space-y-2">
          <p>c&sup2; = a&sup2; + b&sup2; - 2ab &middot; cos(C)</p>
          <p>b&sup2; = a&sup2; + c&sup2; - 2ac &middot; cos(B)</p>
          <p>a&sup2; = b&sup2; + c&sup2; - 2bc &middot; cos(A)</p>
        </div>
        <p>
          จะเห็นได้ว่า หากมุม C เป็นมุมฉาก (90 องศา) ค่าของ cos(90&deg;) จะเท่ากับ 0 ทำให้พจน์สุดท้ายหายไป เหลือเพียง <code>c&sup2; = a&sup2; + b&sup2;</code> ซึ่งก็คือทฤษฎีบทพีทาโกรัสนั่นเอง
        </p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">เมื่อไหร่ที่ควรใช้กฎของโคไซน์?</h3>
        <p>
          การใช้กฎของโคไซน์มักจะถูกนำมาใช้แก้ปัญหาเมื่อเราทราบข้อมูล 2 กรณีหลักๆ (ซึ่งไม่สามารถหาคำตอบด้วยกฎของไซน์ในทันทีได้) ได้แก่:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mb-6">
          <li>
            <strong>ทราบด้าน 2 ด้าน และมุมระหว่างกลาง (SAS):</strong> 
            หากเราทราบความยาวของด้าน a, ด้าน b และมุม C ที่อยู่ระหว่างสองด้านนั้น เราสามารถใช้กฎของโคไซน์เพื่อหาความยาวของด้านที่เหลือ (ด้าน c) ได้ทันที
          </li>
          <li>
            <strong>ทราบด้านทั้ง 3 ด้าน (SSS):</strong> 
            หากเราทราบความยาวของทุกด้าน (a, b, c) แต่ไม่ทราบมุมใดๆ เลย เราสามารถจัดรูปสมการกฎของโคไซน์ใหม่ เพื่อหามุมใดมุมหนึ่งได้ เช่น <code>cos(C) = (a&sup2; + b&sup2; - c&sup2;) / 2ab</code> 
            จากนั้นใช้ฟังก์ชันอาร์กโคไซน์ (arccos) เพื่อหาขนาดมุม
          </li>
        </ol>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">การประยุกต์ใช้ในโลกแห่งความเป็นจริง</h3>
        <p>
          กฎของโคไซน์เป็นเครื่องมือทางคณิตศาสตร์ที่มีประโยชน์อย่างมหาศาล และถูกนำไปใช้งานอย่างกว้างขวางในหลากหลายสาขาอาชีพ เช่น:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>การสำรวจแผนที่และภูมิประเทศ (Surveying):</strong> ใช้คำนวณระยะห่างระหว่างจุดสองจุดที่อยู่ห่างไกลกันหรือมีสิ่งกีดขวาง โดยการวัดระยะและมุมจากจุดอ้างอิง</li>
          <li><strong>การเดินเรือและการบิน (Navigation):</strong> ใช้คำนวณเส้นทางและระยะทางเมื่อเรือหรือเครื่องบินต้องปรับเปลี่ยนทิศทางในมุมใดๆ</li>
          <li><strong>วิศวกรรมโยธาและฟิสิกส์:</strong> ใช้ในการคำนวณหาแรงลัพธ์ (Resultant Force) เมื่อมีแรงสองแรงกระทำต่อวัตถุในมุมต่างๆ</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">สรุปความแตกต่างระหว่างกฎไซน์และกฎโคไซน์</h3>
        <p>
          กฎของไซน์ (Law of Sines) และกฎของโคไซน์ (Law of Cosines) ต่างทำหน้าที่เติมเต็มซึ่งกันและกัน โดยปกติหากเรามีมุมและด้านตรงข้ามอย่างน้อยหนึ่งคู่ที่ทราบค่า เราจะเลือกใช้ <strong>กฎของไซน์</strong> เนื่องจากคำนวณง่ายกว่า 
          แต่ถ้าเราไม่มีคู่ด้านและมุมตรงข้ามที่สมบูรณ์เลย (เช่น กรณี SAS หรือ SSS) เราจะต้องอาศัย <strong>กฎของโคไซน์</strong> เป็นตัวช่วยในการเริ่มต้นการคำนวณครับ
        </p>
      </article>
    </div>
  );
}

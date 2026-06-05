"use client";

import React, { useState } from 'react';
import { Triangle } from 'lucide-react';

export default function LawOfSines({ lang }: { lang: 'th' | 'en' }) {
  const [solveFor, setSolveFor] = useState<'side' | 'angle'>('side');
  
  // Side scenario: known a, A, B -> find b
  const [sideA, setSideA] = useState<string>('');
  const [angleA, setAngleA] = useState<string>('');
  const [angleB, setAngleB] = useState<string>('');
  
  // Angle scenario: known a, b, A -> find B
  const [sideA2, setSideA2] = useState<string>('');
  const [sideB2, setSideB2] = useState<string>('');
  const [angleA2, setAngleA2] = useState<string>('');

  const t = {
    title: lang === 'th' ? 'คำนวณสามเหลี่ยมด้วยกฎของไซน์' : 'Law of Sines Calculator',
    desc: lang === 'th' ? 'คำนวณหาด้านหรือมุมของสามเหลี่ยมโดยใช้กฎของไซน์ (a/sinA = b/sinB)' : 'Calculate side or angle using the Law of Sines (a/sinA = b/sinB)',
    modeSide: lang === 'th' ? 'หาความยาวด้าน (b)' : 'Find a Side (b)',
    modeAngle: lang === 'th' ? 'หาขนาดมุม (B)' : 'Find an Angle (B)',
    
    labelSideA: lang === 'th' ? 'ความยาวด้าน a' : 'Side a length',
    labelAngleA: lang === 'th' ? 'มุม A (องศา)' : 'Angle A (degrees)',
    labelAngleB: lang === 'th' ? 'มุม B (องศา)' : 'Angle B (degrees)',
    labelSideB: lang === 'th' ? 'ความยาวด้าน b' : 'Side b length',
    
    resultSide: lang === 'th' ? 'ความยาวด้าน b:' : 'Side b length:',
    resultAngle: lang === 'th' ? 'ขนาดมุม B (องศา):' : 'Angle B (degrees):',
    errorInvalid: lang === 'th' ? 'ค่าที่ระบุไม่สามารถสร้างเป็นสามเหลี่ยมได้' : 'Invalid values for a triangle',
  };

  const toRad = (deg: number) => deg * Math.PI / 180;
  const toDeg = (rad: number) => rad * 180 / Math.PI;

  const calculateSide = () => {
    const a = parseFloat(sideA);
    const angA = parseFloat(angleA);
    const angB = parseFloat(angleB);

    if (isNaN(a) || isNaN(angA) || isNaN(angB) || a <= 0 || angA <= 0 || angB <= 0 || angA + angB >= 180) {
      return null;
    }

    const b = (a * Math.sin(toRad(angB))) / Math.sin(toRad(angA));
    return b.toFixed(4);
  };

  const calculateAngle = () => {
    const a = parseFloat(sideA2);
    const b = parseFloat(sideB2);
    const angA = parseFloat(angleA2);

    if (isNaN(a) || isNaN(b) || isNaN(angA) || a <= 0 || b <= 0 || angA <= 0 || angA >= 180) {
      return null;
    }

    const sinB = (b * Math.sin(toRad(angA))) / a;
    if (sinB > 1 || sinB < -1) return t.errorInvalid;

    const angB = toDeg(Math.asin(sinB));
    
    // There's an ambiguous case (SSA) where angle could also be 180 - angB, but we'll return primary acute/obtuse.
    return angB.toFixed(4);
  };

  const resSide = solveFor === 'side' ? calculateSide() : null;
  const resAngle = solveFor === 'angle' ? calculateAngle() : null;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-red-50 text-red-600 rounded-xl">
          <Triangle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t.title}</h2>
          <p className="text-sm text-slate-500">{t.desc}</p>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setSolveFor('side')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${solveFor === 'side' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
        >
          {t.modeSide}
        </button>
        <button
          onClick={() => setSolveFor('angle')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${solveFor === 'angle' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
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
                <input type="number" value={sideA} onChange={e => setSideA(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelAngleA}</label>
                <input type="number" value={angleA} onChange={e => setAngleA(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelAngleB}</label>
                <input type="number" value={angleB} onChange={e => setAngleB(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
              </div>
            </div>
            {resSide && (
              <div className="p-6 bg-red-50 rounded-xl border border-red-100">
                <h3 className="text-sm font-medium text-red-900 mb-2">{t.resultSide}</h3>
                <p className="text-2xl text-red-950 font-bold">{resSide}</p>
              </div>
            )}
          </>
        ) : (
          <>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelSideA}</label>
                <input type="number" value={sideA2} onChange={e => setSideA2(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelSideB}</label>
                <input type="number" value={sideB2} onChange={e => setSideB2(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelAngleA}</label>
                <input type="number" value={angleA2} onChange={e => setAngleA2(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
              </div>
            </div>
            {resAngle && (
              <div className="p-6 bg-red-50 rounded-xl border border-red-100">
                <h3 className="text-sm font-medium text-red-900 mb-2">{t.resultAngle}</h3>
                <p className="text-2xl text-red-950 font-bold">{resAngle} &deg;</p>
              </div>
            )}
          </>
        )}
      </div>

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">กฎของไซน์ (Law of Sines) คืออะไร?</h2>
        <p>
          ในทางคณิตศาสตร์สาขาตรีโกณมิติ <strong>กฎของไซน์ (Law of Sines)</strong> หรือกฎไซน์ เป็นสมการที่แสดงความสัมพันธ์ระหว่างความยาวด้านของรูปสามเหลี่ยมกับค่าไซน์ (Sine) ของมุมที่อยู่ตรงข้ามกับด้านนั้นๆ 
          กฎนี้มีความสำคัญอย่างมาก เนื่องจากมันช่วยให้เราสามารถคำนวณหาความยาวด้านหรือขนาดของมุมที่เหลือในรูปสามเหลี่ยม <em>ใดๆ</em> ก็ได้ (ไม่จำกัดเฉพาะสามเหลี่ยมมุมฉาก) หากเรามีข้อมูลที่เพียงพอ
        </p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">สูตรกฎของไซน์ (Formula)</h3>
        <p>
          หากเรากำหนดให้สามเหลี่ยมรูปหนึ่ง มีมุมสามมุมเป็น A, B และ C และมีความยาวของด้านที่อยู่ตรงข้ามกับมุมเหล่านั้นเป็น a, b และ c ตามลำดับ กฎของไซน์จะระบุความสัมพันธ์ไว้ว่า:
        </p>
        <div className="bg-slate-50 p-4 rounded-lg my-4 text-center text-lg font-bold">
          a / sin(A) = b / sin(B) = c / sin(C)
        </div>
        <p>
          นั่นหมายความว่า อัตราส่วนระหว่างความยาวของด้านหนึ่ง กับค่าไซน์ของมุมที่อยู่ตรงข้ามด้านนั้น จะมีค่าเท่ากันเสมอสำหรับทั้งสามคู่ในรูปสามเหลี่ยมเดียวกัน
        </p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">เมื่อไหร่ที่ควรใช้กฎของไซน์?</h3>
        <p>
          เรามักจะใช้กฎของไซน์ในการแก้ปัญหาหรือหาส่วนประกอบของรูปสามเหลี่ยมเมื่อเราทราบข้อมูลใน 2 กรณีหลักๆ ดังนี้:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mb-6">
          <li>
            <strong>ทราบมุม 2 มุม และด้าน 1 ด้าน (AAS หรือ ASA):</strong> 
            หากเราทราบมุมสองมุม เราจะสามารถหามุมที่สามได้เสมอ (เพราะผลรวมมุมภายในสามเหลี่ยมต้องเท่ากับ 180&deg;) จากนั้นจึงใช้กฎของไซน์เพื่อหาความยาวของด้านที่เหลือ
          </li>
          <li>
            <strong>ทราบด้าน 2 ด้าน และมุมที่อยู่ตรงข้ามกับด้านใดด้านหนึ่ง (SSA):</strong> 
            กรณีนี้เราจะใช้กฎของไซน์เพื่อหามุมที่อยู่ตรงข้ามกับอีกด้านหนึ่ง แต่อย่างไรก็ตาม กรณีนี้อาจทำให้เกิดความกำกวม (Ambiguous Case) ซึ่งอาจมีคำตอบได้ 0 แบบ, 1 แบบ หรือ 2 แบบ ขึ้นอยู่กับค่าของด้านและมุมที่ให้มา
          </li>
        </ol>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ตัวอย่างการใช้งาน</h3>
        <p>
          สมมติว่าสามเหลี่ยมรูปหนึ่งมีมุม A = 40&deg;, มุม B = 60&deg; และด้าน a (ตรงข้ามมุม A) ยาว 10 หน่วย เราต้องการหาความยาวของด้าน b (ตรงข้ามมุม B)<br/>
          จากสูตร: <code>a / sin(A) = b / sin(B)</code><br/>
          เราสามารถแทนค่าได้เป็น: <code>10 / sin(40&deg;) = b / sin(60&deg;)</code><br/>
          ดังนั้น <code>b = [10 &times; sin(60&deg;)] / sin(40&deg;)</code> &asymp; 13.47 หน่วย
        </p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ข้อควรระวังเรื่อง Ambiguous Case (SSA)</h3>
        <p>
          ตามที่กล่าวไว้ข้างต้น หากเราทราบข้อมูลแบบ ด้าน-ด้าน-มุม (SSA) การใช้กฎของไซน์เพื่อหามุม B อาจได้ค่า sin(B) ออกมาสมมติเท่ากับ 0.5 
          ในทางคณิตศาสตร์ มุมที่มีค่า sin เท่ากับ 0.5 อาจเป็น 30&deg; หรือ 150&deg; ก็ได้ (มุมแหลมหรือมุมป้าน) ดังนั้นผู้คำนวณจึงต้องพิจารณาบริบทของรูปสามเหลี่ยมด้วยว่ามุมที่เป็นไปได้ควรมีขนาดเท่าใด 
          หรือใช้กฎของโคไซน์ (Law of Cosines) ประกอบการพิจารณาในบางกรณี
        </p>

        <p className="mt-4">
          โปรแกรมคำนวณด้านบนออกแบบมาให้ใช้งานง่าย คุณสามารถเลือกได้ว่าต้องการหาความยาวด้าน หรือ หาขนาดมุม เพียงกรอกค่าที่คุณมีลงไป ระบบจะคำนวณผลลัพธ์ตามกฎของไซน์ให้ทันทีครับ
        </p>
      </article>
    </div>
  );
}

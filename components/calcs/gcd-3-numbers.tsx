"use client";
import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export default function Gcd3Numbers({ lang }: { lang: 'TH' | 'EN' }) {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [num3, setNum3] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<React.ReactNode[]>([]);

  const calculateGCD = () => {
    let a = Math.abs(parseInt(num1));
    let b = Math.abs(parseInt(num2));
    let c = Math.abs(parseInt(num3));

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      setResult(null);
      setSteps([<span key="err">{lang === 'TH' ? "โปรดกรอกตัวเลขให้ครบทั้งสามช่อง" : "Please enter all three numbers."}</span>]);
      return;
    }

    const calcSteps: React.ReactNode[] = [];

    // Helper to calculate GCD of two numbers and return steps
    const getGcdOfTwo = (x: number, y: number, label1: string, label2: string): number => {
      let tempX = x;
      let tempY = y;
      
      if (tempX === 0 && tempY === 0) return 0;
      if (tempX === 0) return tempY;
      if (tempY === 0) return tempX;

      calcSteps.push(<div key={`title-${label1}-${label2}`} className="font-bold text-slate-800 mt-2">หา ห.ร.ม. ของ {x} และ {y}:</div>);
      
      while (tempY !== 0) {
        const temp = tempY;
        const quotient = Math.floor(tempX / tempY);
        const remainder = tempX % tempY;
        calcSteps.push(
          <div key={`${tempX}-${tempY}-${quotient}-${remainder}`} className="ml-4">
            {tempX} = ({tempY} × {quotient}) + {remainder}
          </div>
        );
        tempX = temp;
        tempY = remainder;
      }
      calcSteps.push(<div key={`res-${label1}-${label2}`} className="ml-4 font-semibold text-blue-600 mb-2">→ ห.ร.ม. ของคู่แรกคือ {tempX}</div>);
      return tempX;
    };

    // GCD(a, b, c) = GCD(GCD(a, b), c)
    const gcdAB = getGcdOfTwo(a, b, "จำนวนแรก", "จำนวนที่สอง");
    
    if (gcdAB === 0 && c === 0) {
       setResult(null);
       setSteps([<span key="err2">{lang === 'TH' ? "ไม่สามารถหา ห.ร.ม. ของ 0, 0, 0 ได้" : "GCD of 0, 0, 0 is undefined."}</span>]);
       return;
    }

    calcSteps.push(
      <div key="next-step" className="font-bold text-slate-800 mt-4 border-t pt-4">
        นำผลลัพธ์ที่ได้ ({gcdAB}) มาหา ห.ร.ม. กับจำนวนที่สาม ({c}):
      </div>
    );

    const finalGcd = getGcdOfTwo(gcdAB, c, "ผลลัพธ์แรก", "จำนวนที่สาม");

    setResult(finalGcd);
    calcSteps.push(
      <div key="final-summary" className="font-bold text-lg text-green-700 mt-4 border-t pt-4">
        สรุป: ห.ร.ม. ของ {a}, {b} และ {c} คือ {finalGcd}
      </div>
    );
    setSteps(calcSteps);
  };

  const handleClear = () => {
    setNum1('');
    setNum2('');
    setNum3('');
    setResult(null);
    setSteps([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-100 p-3 rounded-xl">
          <Calculator className="w-6 h-6 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          {lang === 'TH' ? 'เครื่องมือหาตัวหารร่วมมาก (ห.ร.ม.) 3 จำนวน' : 'GCD of 3 Numbers Calculator'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {lang === 'TH' ? 'ตัวเลขที่ 1' : 'Number 1'}
          </label>
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder={lang === 'TH' ? 'ตัวเลขที่ 1' : 'First'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {lang === 'TH' ? 'ตัวเลขที่ 2' : 'Number 2'}
          </label>
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder={lang === 'TH' ? 'ตัวเลขที่ 2' : 'Second'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {lang === 'TH' ? 'ตัวเลขที่ 3' : 'Number 3'}
          </label>
          <input
            type="number"
            value={num3}
            onChange={(e) => setNum3(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder={lang === 'TH' ? 'ตัวเลขที่ 3' : 'Third'}
          />
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={calculateGCD}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {lang === 'TH' ? 'คำนวณ ห.ร.ม.' : 'Calculate GCD'}
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors duration-200"
        >
          {lang === 'TH' ? 'ล้างค่า' : 'Clear'}
        </button>
      </div>

      {steps.length > 0 && (
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            {lang === 'TH' ? 'วิธีทำทีละขั้นตอน (Step-by-step)' : 'Calculation Steps'}
          </h3>
          <div className="space-y-1 bg-white p-4 rounded-lg border border-slate-200 shadow-sm font-mono text-sm md:text-base">
            {steps}
          </div>
          {result !== null && (
            <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-center">
              <div className="text-emerald-700 font-bold text-2xl">
                ห.ร.ม. ของทั้ง 3 จำนวน คือ {result}
              </div>
            </div>
          )}
        </div>
      )}

      {lang === 'TH' && (
        <article className="mt-12 prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">การหาตัวหารร่วมมาก (ห.ร.ม.) ของตัวเลข 3 จำนวน</h2>
          
          <p>
            เราได้เรียนรู้วิธีการหา ห.ร.ม. ของตัวเลขสองจำนวนกันไปแล้ว แต่ในชีวิตจริงหรือโจทย์คณิตศาสตร์ที่ซับซ้อนขึ้น มักจะมีการหา ห.ร.ม. ของตัวเลขหลายๆ จำนวนพร้อมกัน เช่น ตัวเลข 3 จำนวน ซึ่งหลักการพื้นฐานยังคงเหมือนเดิม <strong>ห.ร.ม. ของกลุ่มตัวเลข</strong> คือ จำนวนเต็มบวกที่มีค่ามากที่สุดที่สามารถนำไปหารทุกตัวเลขในกลุ่มนั้นลงตัวโดยไม่เหลือเศษ
          </p>

          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">สูตรและหลักการหา ห.ร.ม. ของตัวเลขมากกว่า 2 จำนวน</h3>
          <p>
            ตามหลักคณิตศาสตร์ การหา ห.ร.ม. ของกลุ่มตัวเลขหลายจำนวน สามารถลดทอนลงมาเป็นการหา ห.ร.ม. ของคู่ตัวเลขได้ โดยอาศัยสมบัติการจัดหมู่ (Associative property) ของ ห.ร.ม. ดังนั้น สูตรในการหา ห.ร.ม. ของ 3 จำนวน (สมมติเป็น A, B และ C) จะสามารถเขียนเป็นสมการได้ดังนี้:
          </p>
          
          <div className="bg-slate-100 p-4 rounded-lg text-center font-mono text-lg font-bold text-slate-800 my-4">
            GCD(A, B, C) = GCD( GCD(A, B), C )
          </div>

          <p>
            <strong>นั่นหมายความว่า:</strong> เราสามารถหา ห.ร.ม. ของ 3 จำนวนได้ โดยเริ่มจากการหา ห.ร.ม. ของตัวเลขสองจำนวนแรกก่อน เมื่อได้ผลลัพธ์มาเท่าไหร่ ให้นำผลลัพธ์นั้นไปหา ห.ร.ม. ต่อกับจำนวนที่สามที่เหลืออยู่ ผลลัพธ์สุดท้ายที่ได้ก็คือ ห.ร.ม. ของทั้ง 3 จำนวนนั่นเอง
          </p>

          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">ตัวอย่างการคำนวณ ห.ร.ม. 3 จำนวน</h3>
          <p>
            สมมติว่าเราต้องการหา ห.ร.ม. ของ <strong>24, 36 และ 60</strong>
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>ขั้นตอนที่ 1:</strong> เลือกตัวเลขสองตัวแรกคือ 24 และ 36 มาหา ห.ร.ม. ก่อน<br/>
              - ตัวประกอบของ 24 คือ 1, 2, 3, 4, 6, 8, 12, 24<br/>
              - ตัวประกอบของ 36 คือ 1, 2, 3, 4, 6, 9, 12, 18, 36<br/>
              - จะเห็นได้ว่าตัวหารร่วมมากที่สุดของ 24 และ 36 คือ <strong>12</strong>
            </li>
            <li>
              <strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์ที่ได้ (12) มาหา ห.ร.ม. กับตัวเลขที่เหลือคือ 60<br/>
              - เราหา ห.ร.ม. ของ 12 และ 60<br/>
              - เนื่องจาก 12 สามารถหาร 60 ลงตัวพอดี (60 ÷ 12 = 5)<br/>
              - ดังนั้น ห.ร.ม. ของ 12 และ 60 คือ <strong>12</strong>
            </li>
            <li>
              <strong>สรุป:</strong> ห.ร.ม. ของ 24, 36 และ 60 จึงมีค่าเท่ากับ <strong>12</strong>
            </li>
          </ol>

          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">ประโยชน์ของการหา ห.ร.ม. 3 จำนวน</h3>
          <p>
            การนำความรู้เรื่อง ห.ร.ม. 3 จำนวนไปประยุกต์ใช้ มีมากมายในชีวิตประจำวัน โดยเฉพาะเกี่ยวกับการแบ่งสรรปันส่วน ตัวอย่างเช่น:
          </p>
          <ul>
            <li><strong>การแบ่งบรรจุภัณฑ์:</strong> สมมติโรงงานมีลูกอมรสสตรอว์เบอร์รี 150 เม็ด รสส้ม 225 เม็ด และรสมะนาว 300 เม็ด ต้องการบรรจุใส่ถุงให้แต่ละถุงมีลูกอมทั้ง 3 รสในจำนวนที่เท่าๆ กัน และให้ได้จำนวนลูกอมต่อถุงมากที่สุด การหา ห.ร.ม. จะช่วยให้ทราบจำนวนลูกอมต่อถุง</li>
            <li><strong>การจัดตารางเวลา:</strong> สำหรับกิจกรรม 3 อย่างที่มีรอบความถี่ต่างกัน ห.ร.ม. หรือในบางกรณีคือ ค.ร.น. จะช่วยหารอบเวลาที่เหมาะสม</li>
            <li><strong>การออกแบบ:</strong> หากมีแผ่นไม้ 3 แผ่นที่มีความยาว 120 ซม., 150 ซม. และ 180 ซม. ต้องการตัดเป็นท่อนที่ยาวที่สุดและทุกท่อนยาวเท่ากันโดยไม่เหลือเศษ ความยาวของแต่ละท่อนก็คือ ห.ร.ม. ของตัวเลขทั้งสามนั่นเอง (ซึ่งคือ 30 ซม.)</li>
          </ul>

          <p>
            โปรแกรมคำนวณ ห.ร.ม. 3 จำนวนบนเว็บนี้ ออกแบบมาเพื่อประหยัดเวลาในการคิดเลขด้วยมือ โดยใช้วิธีขั้นตอนแบบยุคลิด (Euclidean Algorithm) ที่ลดทอนตัวเลขลงมาทีละคู่ ทำให้การแสดงวิธีทำเป็นไปอย่างชัดเจน เข้าใจง่าย และให้ผลลัพธ์ที่ถูกต้อง 100% เสมอ!
          </p>
        </article>
      )}
    </div>
  );
}

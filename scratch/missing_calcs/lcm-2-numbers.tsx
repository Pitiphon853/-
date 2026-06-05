"use client";
import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export default function Lcm2Numbers({ lang }: { lang: 'TH' | 'EN' }) {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<React.ReactNode[]>([]);

  const calculateLCM = () => {
    let a = Math.abs(parseInt(num1));
    let b = Math.abs(parseInt(num2));

    if (isNaN(a) || isNaN(b)) {
      setResult(null);
      setSteps([<span key="err">{lang === 'TH' ? "โปรดกรอกตัวเลขให้ครบทั้งสองช่อง" : "Please enter both numbers."}</span>]);
      return;
    }

    if (a === 0 || b === 0) {
      setResult(0);
      setSteps([<span key="zero">{lang === 'TH' ? "ค.ร.น. ของตัวเลขที่มี 0 รวมอยู่ด้วย จะเท่ากับ 0 เสมอ" : "LCM involving 0 is always 0."}</span>]);
      return;
    }

    const calcSteps: React.ReactNode[] = [];
    
    // Calculate GCD to find LCM using formula: LCM(a,b) = (a * b) / GCD(a,b)
    let tempX = a;
    let tempY = b;
    
    calcSteps.push(
      <div key="formula" className="mb-2 text-slate-700">
        <strong>สูตรการหา ค.ร.น.:</strong> ค.ร.น. = (จำนวนที่ 1 × จำนวนที่ 2) ÷ ห.ร.ม.
      </div>
    );
    calcSteps.push(<div key="gcd-start" className="font-semibold mt-4">1. หา ห.ร.ม. (GCD) ของ {a} และ {b}:</div>);

    while (tempY !== 0) {
      const temp = tempY;
      const quotient = Math.floor(tempX / tempY);
      const remainder = tempX % tempY;
      calcSteps.push(
        <div key={`${tempX}-${tempY}-${quotient}-${remainder}`} className="ml-4 font-mono text-sm md:text-base">
          {tempX} = ({tempY} × {quotient}) + {remainder}
        </div>
      );
      tempX = temp;
      tempY = remainder;
    }
    
    const gcd = tempX;
    calcSteps.push(<div key="gcd-res" className="ml-4 mt-2 font-semibold text-blue-600">→ ห.ร.ม. = {gcd}</div>);

    const lcm = (a * b) / gcd;
    
    calcSteps.push(<div key="lcm-start" className="font-semibold mt-4">2. แทนค่าในสูตรหา ค.ร.น.:</div>);
    calcSteps.push(
      <div key="lcm-calc" className="ml-4 font-mono text-sm md:text-base">
        ค.ร.น. = ({a} × {b}) ÷ {gcd}
      </div>
    );
    calcSteps.push(
      <div key="lcm-calc2" className="ml-4 font-mono text-sm md:text-base">
        ค.ร.น. = {a * b} ÷ {gcd}
      </div>
    );
    
    setResult(lcm);
    setSteps(calcSteps);
  };

  const handleClear = () => {
    setNum1('');
    setNum2('');
    setResult(null);
    setSteps([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-3 rounded-xl">
          <Calculator className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          {lang === 'TH' ? 'เครื่องมือหาคูณร่วมน้อย (ค.ร.น.) 2 จำนวน' : 'LCM of 2 Numbers Calculator'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {lang === 'TH' ? 'ตัวเลขที่ 1' : 'Number 1'}
          </label>
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder={lang === 'TH' ? 'กรอกตัวเลขที่ 1' : 'Enter first number'}
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
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder={lang === 'TH' ? 'กรอกตัวเลขที่ 2' : 'Enter second number'}
          />
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={calculateLCM}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {lang === 'TH' ? 'คำนวณ ค.ร.น.' : 'Calculate LCM'}
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
            {lang === 'TH' ? 'วิธีทำและสูตรการคำนวณ' : 'Steps & Formula'}
          </h3>
          <div className="space-y-1 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            {steps}
          </div>
          {result !== null && (
            <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-center">
              <div className="text-indigo-800 font-bold text-2xl">
                ค.ร.น. = {result}
              </div>
            </div>
          )}
        </div>
      )}

      {lang === 'TH' && (
        <article className="mt-12 prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">คูณร่วมน้อย (ค.ร.น.) คืออะไร และวิธีการหา ค.ร.น. ของเลข 2 จำนวน</h2>
          
          <p>
            <strong>คูณร่วมน้อย (Least Common Multiple - LCM)</strong> หรือที่คนไทยคุ้นเคยกันในชื่อ <strong>ค.ร.น.</strong> คือ จำนวนเต็มบวกที่มีค่าน้อยที่สุดที่สามารถถูกหารด้วยกลุ่มตัวเลขที่เรากำหนดได้ลงตัวพอดี โดยไม่มีเศษเหลือ หรือพูดง่ายๆ ว่าเป็นตัวคูณร่วมกันที่มีค่าน้อยที่สุดนั่นเอง
          </p>

          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">การประยุกต์ใช้ ค.ร.น. ในชีวิตประจำวัน</h3>
          <p>
            ค.ร.น. เป็นแนวคิดทางคณิตศาสตร์ที่มักจะถูกนำมาใช้แก้ปัญหาที่เกี่ยวข้องกับรอบเวลา (Cycles) หรือเหตุการณ์ที่เกิดขึ้นซ้ำๆ ในความถี่ที่ต่างกัน และต้องการหาจุดที่เหตุการณ์เหล่านั้นจะมาบรรจบกันพร้อมกันอีกครั้ง ตัวอย่างเช่น:
          </p>
          <ul>
            <li><strong>การตั้งนาฬิกาปลุกหรือรอบการทำงาน:</strong> สมมติว่าเครื่องจักร A ทำงานทุกๆ 15 นาที เครื่องจักร B ทำงานทุกๆ 25 นาที หากเริ่มต้นพร้อมกัน เครื่องจักรทั้งสองจะทำงานพร้อมกันอีกครั้งเมื่อเวลาผ่านไปเท่าใด? คำตอบคือต้องหา ค.ร.น. ของ 15 และ 25 (ซึ่งคือ 75 นาที)</li>
            <li><strong>การบวกและลบเศษส่วน:</strong> เป็นการใช้งาน ค.ร.น. ที่เราเจอบ่อยที่สุดในสมัยเรียน เมื่อต้องการบวกเศษส่วนที่มีตัวส่วนไม่เท่ากัน เช่น 1/4 + 1/6 เราต้องหา ค.ร.น. ของ 4 และ 6 (คือ 12) เพื่อทำตัวส่วนให้เท่ากันก่อน จึงจะบวกกันได้</li>
            <li><strong>การจัดตารางเวรหรือการพบปะ:</strong> เพื่อนคนแรกมาเยี่ยมทุกๆ 4 วัน เพื่อนคนที่สองมาเยี่ยมทุกๆ 6 วัน วันไหนที่เพื่อนทั้งสองคนจะมาเยี่ยมพร้อมกันอีกครั้ง</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">วิธีหา ค.ร.น. ของตัวเลข 2 จำนวน</h3>
          <p>
            เราสามารถหา ค.ร.น. ได้หลายวิธี ดังนี้:
          </p>
          <ol>
            <li>
              <strong>การเขียนผลคูณ (List of Multiples):</strong>
              เขียนสูตรคูณของแต่ละจำนวนไปเรื่อยๆ จนกว่าจะเจอตัวเลขที่ซ้ำกันเป็นตัวแรก
              <br/>- ผลคูณของ 4 คือ 4, 8, 12, 16, 20, 24...
              <br/>- ผลคูณของ 6 คือ 6, 12, 18, 24...
              <br/>ตัวที่ซ้ำกันตัวแรกคือ 12 ดังนั้น ค.ร.น. = 12
            </li>
            <li>
              <strong>การแยกตัวประกอบ (Prime Factorization):</strong>
              แยกตัวประกอบของทั้งสองจำนวน นำตัวประกอบที่ซ้ำกันมา 1 ตัว และนำตัวประกอบที่ไม่ซ้ำมาทั้งหมด แล้วจับคูณกัน
            </li>
            <li>
              <strong>การใช้ความสัมพันธ์ระหว่าง ห.ร.ม. และ ค.ร.น. (ใช้กันมากในคอมพิวเตอร์):</strong>
              วิธีนี้รวดเร็วและทรงประสิทธิภาพมาก โดยใช้สูตร:
              <div className="bg-slate-100 p-3 rounded my-2 text-center font-bold">
                ค.ร.น.(A, B) = (A × B) ÷ ห.ร.ม.(A, B)
              </div>
              หมายความว่า เพียงแค่คุณหา ห.ร.ม. ได้ คุณก็จะนำมาคำนวณหา ค.ร.น. ต่อได้อย่างง่ายดาย
            </li>
          </ol>

          <p>
            เครื่องมือคำนวณ ค.ร.น. ของเราบนหน้านี้ ใช้วิธีคำนวณผ่าน <strong>ความสัมพันธ์ของ ห.ร.ม. และ ค.ร.น.</strong> เพื่อความแม่นยำและรวดเร็วที่สุด พร้อมทั้งแสดงขั้นตอนอย่างละเอียดให้คุณดูตั้งแต่การหา ห.ร.ม. ด้วยวิธียุคลิด แล้วนำไปเข้าสูตรคำนวณ ค.ร.น. ในขั้นสุดท้าย หวังว่าเครื่องมือนี้จะมีประโยชน์ในการเรียนรู้และการทำงานของคุณ!
          </p>
        </article>
      )}
    </div>
  );
}

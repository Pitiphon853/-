"use client";
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function Lcm3Numbers({ lang }: { lang: 'TH' | 'EN' }) {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [num3, setNum3] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<React.ReactNode[]>([]);

  const calculateLCM = () => {
    let a = Math.abs(parseInt(num1));
    let b = Math.abs(parseInt(num2));
    let c = Math.abs(parseInt(num3));

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      setResult(null);
      setSteps([<span key="err">{lang === 'TH' ? "โปรดกรอกตัวเลขให้ครบทั้งสามช่อง" : "Please enter all three numbers."}</span>]);
      return;
    }

    if (a === 0 || b === 0 || c === 0) {
      setResult(0);
      setSteps([<span key="zero">{lang === 'TH' ? "ค.ร.น. ของตัวเลขที่มี 0 รวมอยู่ด้วย จะเท่ากับ 0 เสมอ" : "LCM involving 0 is always 0."}</span>]);
      return;
    }

    const calcSteps: React.ReactNode[] = [];
    
    // Helper to calculate GCD
    const getGcd = (x: number, y: number): number => {
      let tempX = x;
      let tempY = y;
      while (tempY !== 0) {
        let temp = tempY;
        tempY = tempX % tempY;
        tempX = temp;
      }
      return tempX;
    };

    // Helper to calculate LCM of two numbers and log steps
    const getLcmOfTwo = (x: number, y: number, stepLabel: string): number => {
      const gcdVal = getGcd(x, y);
      const lcmVal = (x * y) / gcdVal;
      
      calcSteps.push(
        <div key={stepLabel} className="mt-4 mb-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
          <div className="font-semibold text-slate-800">{stepLabel}</div>
          <div className="font-mono text-sm md:text-base mt-2">
            ห.ร.ม. ของ {x} และ {y} คือ {gcdVal}
          </div>
          <div className="font-mono text-sm md:text-base">
            ค.ร.น. = ({x} × {y}) ÷ {gcdVal}
          </div>
          <div className="font-mono text-sm md:text-base font-bold text-blue-600 mt-1">
            → ค.ร.น. ได้เท่ากับ {lcmVal}
          </div>
        </div>
      );
      
      return lcmVal;
    };

    calcSteps.push(
      <div key="formula" className="mb-2 text-slate-700">
        <strong>หลักการ:</strong> ค.ร.น. ของ 3 จำนวน คือ ค.ร.น.( ค.ร.น.(จำนวนที่ 1, จำนวนที่ 2), จำนวนที่ 3 )
      </div>
    );

    // LCM(a, b, c) = LCM(LCM(a, b), c)
    const lcmAB = getLcmOfTwo(a, b, `ขั้นที่ 1: หา ค.ร.น. ของคู่แรก (${a} และ ${b})`);
    const finalLcm = getLcmOfTwo(lcmAB, c, `ขั้นที่ 2: นำผลลัพธ์แรก (${lcmAB}) ไปหา ค.ร.น. กับจำนวนที่สาม (${c})`);
    
    setResult(finalLcm);
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
        <div className="bg-purple-100 p-3 rounded-xl">
          <Calculator className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          {lang === 'TH' ? 'เครื่องมือหาคูณร่วมน้อย (ค.ร.น.) 3 จำนวน' : 'LCM of 3 Numbers Calculator'}
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
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            placeholder={lang === 'TH' ? 'ตัวเลขที่ 3' : 'Third'}
          />
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={calculateLCM}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
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
            {lang === 'TH' ? 'ขั้นตอนการคิดแบบยุบเป็นคู่' : 'Calculation Steps'}
          </h3>
          <div className="space-y-1 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            {steps}
          </div>
          {result !== null && (
            <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-100 flex items-center justify-center">
              <div className="text-purple-800 font-bold text-2xl text-center">
                ค.ร.น. ของทั้ง 3 จำนวน <br className="sm:hidden" /> คือ {result}
              </div>
            </div>
          )}
        </div>
      )}

      {lang === 'TH' && (
        <article className="mt-12 prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">การหาคูณร่วมน้อย (ค.ร.น.) ของตัวเลข 3 จำนวน: สูตรและวิธีคิด</h2>
          
          <p>
            เมื่อต้องรับมือกับโจทย์คณิตศาสตร์ที่ซับซ้อนขึ้น หรือปัญหาในชีวิตจริงที่มีตัวแปรเข้ามาเกี่ยวข้องหลายตัว การหา <strong>ค.ร.น. (คูณร่วมน้อย - Least Common Multiple)</strong> ของตัวเลข 2 จำนวนอาจไม่เพียงพอ บ่อยครั้งที่เราจำเป็นต้องหา ค.ร.น. ของตัวเลขตั้งแต่ 3 จำนวนขึ้นไป ซึ่งหลักการพื้นฐานก็ยังคงเหมือนเดิม นั่นคือการหาตัวเลขที่น้อยที่สุดที่ตัวเลขทั้ง 3 ตัวนั้นสามารถหารได้ลงตัวทั้งหมด
          </p>

          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">สูตรการหา ค.ร.น. สำหรับ 3 จำนวน</h3>
          <p>
            เช่นเดียวกับการหา ห.ร.ม. ของกลุ่มตัวเลข การหา ค.ร.น. ก็มีสมบัติการจัดหมู่ (Associative property) เช่นกัน นั่นแปลว่าเราไม่จำเป็นต้องมีสูตรรวบยอดทีเดียว 3 ตัวเลข แต่เราสามารถยุบการคำนวณให้เป็นแบบจับคู่ทีละคู่ได้ตามสูตรด้านล่างนี้:
          </p>

          <div className="bg-slate-100 p-4 rounded-lg text-center font-mono text-lg font-bold text-slate-800 my-4 shadow-sm border border-slate-200">
            LCM(A, B, C) = LCM( LCM(A, B) , C )
          </div>

          <p>
            <strong>อธิบายความหมาย:</strong> เพื่อที่จะหา ค.ร.น. ของ A, B และ C เราจะเริ่มจากการหา ค.ร.น. ของ A และ B ก่อนให้ได้ผลลัพธ์มาหนึ่งตัว จากนั้นให้นำผลลัพธ์นั้นไปตั้งเป็นตัวแปรใหม่ และหา ค.ร.น. ของมันคู่กับ C ต่อไป ผลลัพธ์สุดท้ายที่ได้ก็คือ ค.ร.น. ของทั้งสามจำนวนนั่นเอง
          </p>

          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">ตัวอย่างการคำนวณ ค.ร.น. 3 จำนวน ด้วยวิธีจับคู่</h3>
          <p>
            สมมติว่าเราต้องการหา ค.ร.น. ของ <strong>8, 12 และ 15</strong>
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>ขั้นตอนที่ 1 (หา ค.ร.น. ของคู่แรก):</strong> จับคู่ 8 และ 12<br/>
              - ห.ร.ม. ของ 8 และ 12 คือ 4<br/>
              - นำมาเข้าสูตร ค.ร.น. = (8 × 12) ÷ 4 = 96 ÷ 4 = <strong>24</strong>
            </li>
            <li>
              <strong>ขั้นตอนที่ 2 (หา ค.ร.น. คู่ต่อไป):</strong> นำผลลัพธ์ 24 ไปจับคู่กับตัวเลขที่สามคือ 15<br/>
              - ห.ร.ม. ของ 24 และ 15 คือ 3<br/>
              - นำมาเข้าสูตร ค.ร.น. = (24 × 15) ÷ 3 = 360 ÷ 3 = <strong>120</strong>
            </li>
            <li>
              <strong>สรุปผลลัพธ์:</strong> ค.ร.น. ของ 8, 12 และ 15 คือ <strong>120</strong>
            </li>
          </ol>

          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">เมื่อไหร่ที่เราต้องใช้ ค.ร.น. 3 จำนวนในชีวิตจริง?</h3>
          <p>
            การใช้งาน ค.ร.น. มีความเกี่ยวข้องกับ "รอบเวลา" (Cycle) หรือ "ความถี่" ที่แตกต่างกัน เมื่อมีปัจจัยมากกว่า 2 อย่างเข้ามาเกี่ยวข้อง เช่น:
          </p>
          <ul>
            <li><strong>การเดินรถสาธารณะ:</strong> รถเมล์สาย A ออกทุกๆ 15 นาที, สาย B ออกทุกๆ 20 นาที และรถไฟฟ้าขบวน C ออกทุกๆ 30 นาที หากทั้งหมดเริ่มออกพร้อมกันตอน 8.00 น. จะออกพร้อมกันอีกครั้งในอีกกี่นาที? (คำตอบคือ ค.ร.น. ของ 15, 20, 30 = 60 นาที หรืออีก 1 ชั่วโมงนั่นเอง)</li>
            <li><strong>การกะพริบของหลอดไฟประดับ:</strong> ไฟประดับ 3 สี มีจังหวะกะพริบไม่พร้อมกัน สีแดงกะพริบทุก 2 วินาที, สีเขียว 3 วินาที, สีน้ำเงิน 5 วินาที ค.ร.น. (30 วินาที) จะบอกเราว่าทุกๆ 30 วินาที ไฟทั้งสามสีจะสว่างพร้อมกันพอดี</li>
            <li><strong>การบวกหรือลบเศษส่วน 3 เทอม:</strong> เช่น 1/4 + 1/6 + 1/9 ต้องใช้ ค.ร.น. ของ 4, 6, 9 (คือ 36) เป็นตัวส่วนร่วมก่อนทำการบวก</li>
          </ul>

          <p>
            โปรแกรมบนเว็บไซต์นี้ถูกออกแบบมาเพื่ออำนวยความสะดวกในการคิดเลข โดยใช้หลักการคอมพิวเตอร์ที่แม่นยำ พร้อมแสดงการจับคู่คิดให้เห็นอย่างชัดเจนในแต่ละขั้นตอน หวังว่าจะเป็นเครื่องมือที่ช่วยลดความยุ่งยากในการคำนวณและทำให้เรื่องคณิตศาสตร์เข้าใจง่ายขึ้นสำหรับคุณ!
          </p>
        </article>
      )}
    </div>
  );
}

"use client";
import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export default function Gcd2Numbers({ lang }: { lang: 'TH' | 'EN' }) {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const calculateGCD = () => {
    let a = Math.abs(parseInt(num1));
    let b = Math.abs(parseInt(num2));

    if (isNaN(a) || isNaN(b)) {
      setResult(null);
      setSteps([lang === 'TH' ? "โปรดกรอกตัวเลขให้ครบทั้งสองช่อง" : "Please enter both numbers."]);
      return;
    }

    if (a === 0 && b === 0) {
      setResult(null);
      setSteps([lang === 'TH' ? "ห.ร.ม. ของ 0 และ 0 ไม่นิยาม" : "GCD of 0 and 0 is undefined."]);
      return;
    }

    const calcSteps = [];
    const originalA = a;
    const originalB = b;

    if (a === 0) {
      setResult(b);
      setSteps([`${lang === 'TH' ? 'ห.ร.ม. ของ' : 'GCD of'} 0 ${lang === 'TH' ? 'และ' : 'and'} ${originalB} ${lang === 'TH' ? 'คือ' : 'is'} ${b}`]);
      return;
    }
    if (b === 0) {
      setResult(a);
      setSteps([`${lang === 'TH' ? 'ห.ร.ม. ของ' : 'GCD of'} ${originalA} ${lang === 'TH' ? 'และ' : 'and'} 0 ${lang === 'TH' ? 'คือ' : 'is'} ${a}`]);
      return;
    }

    let x = a;
    let y = b;

    while (y !== 0) {
      const temp = y;
      const quotient = Math.floor(x / y);
      const remainder = x % y;
      calcSteps.push(`${x} = (${y} × ${quotient}) + ${remainder}`);
      x = temp;
      y = remainder;
    }

    setResult(x);
    calcSteps.push(`สรุป: ห.ร.ม. ของ ${originalA} และ ${originalB} คือ ${x}`);
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
        <div className="bg-blue-100 p-3 rounded-xl">
          <Calculator className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          {lang === 'TH' ? 'เครื่องมือหาตัวหารร่วมมาก (ห.ร.ม.) 2 จำนวน' : 'GCD of 2 Numbers Calculator'}
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
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder={lang === 'TH' ? 'กรอกตัวเลขที่ 2' : 'Enter second number'}
          />
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={calculateGCD}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
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
            {lang === 'TH' ? 'ผลลัพธ์และวิธีทำ (Euclidean Algorithm)' : 'Result and Steps'}
          </h3>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-2 text-slate-700 font-mono text-sm md:text-base bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>{step}</span>
              </div>
            ))}
          </div>
          {result !== null && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100 flex items-center gap-4">
              <div className="bg-green-100 text-green-700 font-bold p-3 rounded-lg text-2xl">
                ห.ร.ม. = {result}
              </div>
            </div>
          )}
        </div>
      )}

      {lang === 'TH' && (
        <article className="mt-12 prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">ตัวหารร่วมมาก (ห.ร.ม.) คืออะไรและวิธีหา ห.ร.ม. ของตัวเลข 2 จำนวน</h2>
          
          <p>
            <strong>ตัวหารร่วมมาก (Greatest Common Divisor - GCD)</strong> หรือที่ในภาษาไทยเรียกกันสั้นๆ ว่า <strong>ห.ร.ม.</strong> คือ จำนวนเต็มบวกที่มีค่ามากที่สุดที่สามารถนำไปหารจำนวนเต็มบวกอื่นๆ ตั้งแต่สองจำนวนขึ้นไปได้ลงตัวพอดี ไม่มีเศษเหลือ หรือพูดง่ายๆ คือเป็นตัวเลขที่ใหญ่ที่สุดที่หารตัวเลขกลุ่มนั้นลงตัวทั้งหมด
          </p>

          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">ทำไม ห.ร.ม. ถึงสำคัญ? การประยุกต์ใช้ในชีวิตจริง</h3>
          <p>
            การหา ห.ร.ม. ไม่ได้มีไว้แค่ใช้สอบในวิชาคณิตศาสตร์เท่านั้น แต่ยังมีประโยชน์ในชีวิตประจำวันและการทำงานหลายๆ ด้าน เช่น:
          </p>
          <ul>
            <li><strong>การแบ่งสิ่งของให้เท่าๆ กัน:</strong> สมมติว่าคุณมีส้ม 24 ผล และแอปเปิ้ล 36 ผล ต้องการจัดใส่ตะกร้าให้แต่ละตะกร้ามีผลไม้ชนิดเดียวกันในจำนวนเท่าๆ กัน และให้ได้จำนวนผลไม้ต่อตะกร้ามากที่สุด ห.ร.ม. ของ 24 และ 36 (ซึ่งคือ 12) จะบอกคุณว่าคุณควรใส่ตะกร้าละ 12 ผล</li>
            <li><strong>การทอนเศษส่วนให้เป็นเศษส่วนอย่างต่ำ:</strong> ในทางคณิตศาสตร์ เมื่อต้องการทำให้เศษส่วนเช่น 24/36 เป็นเศษส่วนอย่างต่ำ เราจะนำ ห.ร.ม. ของทั้งตัวเศษและตัวส่วนไปหาร ในที่นี้คือ 12 จะได้ (24÷12)/(36÷12) = 2/3 นั่นเอง</li>
            <li><strong>การออกแบบและจัดสรรพื้นที่:</strong> งานช่าง งานก่อสร้าง หรือการตัดแบ่งกระเบื้อง กระดาษ ให้มีขนาดใหญ่ที่สุดโดยไม่เหลือเศษ</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">วิธีหา ห.ร.ม. ของตัวเลข 2 จำนวน</h3>
          <p>
            โดยทั่วไปแล้ว การหา ห.ร.ม. สามารถทำได้หลายวิธี ได้แก่:
          </p>
          <ol>
            <li>
              <strong>การแยกตัวประกอบ (Prime Factorization):</strong> 
              วิธีนี้ทำได้โดยนำตัวเลขมาแยกตัวประกอบให้อยู่ในรูปผลคูณของจำนวนเฉพาะ จากนั้นดึงตัวประกอบที่ซ้ำกันมาคูณกัน ตัวอย่างเช่น ห.ร.ม. ของ 12 และ 18
              <br/>- 12 = 2 × 2 × 3
              <br/>- 18 = 2 × 3 × 3
              <br/>ตัวที่ซ้ำกันคือ 2 และ 3 ดังนั้น ห.ร.ม. = 2 × 3 = 6
            </li>
            <li>
              <strong>การตั้งหารสั้น:</strong> 
              นำจำนวนที่ต้องการหา ห.ร.ม. มาตั้งหารสั้นด้วยจำนวนเฉพาะที่สามารถหารทุกจำนวนลงตัวไปเรื่อยๆ จนกว่าจะไม่มีจำนวนเฉพาะใดหารทั้งหมดลงตัว นำตัวหารทั้งหมดมาคูณกันจะได้ ห.ร.ม.
            </li>
            <li>
              <strong>ขั้นตอนวิธีแบบยุคลิด (Euclidean Algorithm):</strong>
              วิธีนี้เป็นวิธีที่คอมพิวเตอร์และเครื่องคิดเลขส่วนใหญ่นิยมใช้ เพราะมีประสิทธิภาพสูงและรวดเร็วมาก โดยเฉพาะกับตัวเลขที่มีค่ามากๆ มีขั้นตอนดังนี้:
              <br/>ก) นำตัวเลขที่มากกว่า (สมมติเป็น a) หารด้วยตัวเลขที่น้อยกว่า (สมมติเป็น b)
              <br/>ข) หาเศษที่เกิดจากการหาร
              <br/>ค) ถ้านำเศษไปหารตัวหารเดิม (b) ทำซ้ำไปเรื่อยๆ จนกว่าเศษจะเป็นศูนย์
              <br/>ง) ตัวหารตัวสุดท้ายที่ทำให้เศษเป็นศูนย์ คือ ห.ร.ม.
            </li>
          </ol>

          <p>
            เครื่องมือหาตัวหารร่วมมากบนเว็บไซต์ของเรา ใช้วิธี <strong>ขั้นตอนวิธีแบบยุคลิด (Euclidean Algorithm)</strong> ในการคำนวณ พร้อมทั้งแสดงขั้นตอนการหารแต่ละรอบอย่างละเอียด ช่วยให้คุณทำความเข้าใจที่มาที่ไปของคำตอบได้อย่างชัดเจน เหมาะสำหรับนักเรียน นักศึกษา หรือบุคคลทั่วไปที่ต้องการตรวจสอบความถูกต้องของแบบฝึกหัด หรือใช้แก้ปัญหาในชีวิตประจำวัน เพียงแค่กรอกตัวเลข 2 จำนวน ระบบก็จะคำนวณ ห.ร.ม. ออกมาในเสี้ยววินาที!
          </p>
        </article>
      )}
    </div>
  );
}

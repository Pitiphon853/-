"use client";

import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, AlertTriangle, RefreshCw } from 'lucide-react';

export default function Base10To2({ lang }: any) {
  const isEN = lang === 'en';
  const [inputVal, setInputVal] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<{ quotient: number; remainder: number; original: number }[]>([]);
  const [error, setError] = useState<string>('');

  const t = {
    title: isEN ? 'Decimal to Binary Converter (Base 10 to 2)' : 'เครื่องมือคำนวณแปลงเลขฐาน 10 เป็นเลขฐาน 2',
    desc: isEN ? 'Convert decimal numbers to binary format.' : 'แปลงตัวเลขจากระบบเลขฐานสิบเป็นระบบเลขฐานสองอย่างแม่นยำ',
    labelInput: isEN ? 'Decimal Number (Base 10)' : 'กรอกเลขฐาน 10 (จำนวนเต็มบวก)',
    placeholderInput: isEN ? 'e.g. 25' : 'ตัวอย่าง 25',
    btnConvert: isEN ? 'Convert' : 'แปลงเป็นเลขฐาน 2',
    btnReset: isEN ? 'Clear' : 'ล้างข้อมูล',
    labelResult: isEN ? 'Binary Result (Base 2)' : 'ผลลัพธ์เลขฐาน 2',
    invalidInput: isEN ? 'Please enter a valid positive integer.' : 'กรุณากรอกจำนวนเต็มบวกที่ถูกต้อง',
    explanationTitle: isEN ? 'Step-by-Step Division by 2:' : 'ขั้นตอนการหารด้วย 2 ทีละขั้น:',
    stepQuotient: isEN ? 'Quotient' : 'ผลหาร',
    stepRemainder: isEN ? 'Remainder' : 'เศษเหลือ',
  };

  const handleConvert = () => {
    setError('');
    setResult(null);
    setSteps([]);

    if (!inputVal) {
      return;
    }

    if (!/^\d+$/.test(inputVal)) {
      setError(t.invalidInput);
      return;
    }

    const num = parseInt(inputVal, 10);
    if (isNaN(num) || num < 0) {
      setError(t.invalidInput);
      return;
    }

    if (num === 0) {
      setResult('0');
      setSteps([{ original: 0, quotient: 0, remainder: 0 }]);
      return;
    }

    let temp = num;
    const tempSteps: { quotient: number; remainder: number; original: number }[] = [];
    let binaryStr = '';

    while (temp > 0) {
      const original = temp;
      const remainder = temp % 2;
      const quotient = Math.floor(temp / 2);
      tempSteps.push({ original, quotient, remainder });
      binaryStr = remainder.toString() + binaryStr;
      temp = quotient;
    }

    setResult(binaryStr);
    setSteps(tempSteps);
  };

  const handleClear = () => {
    setInputVal('');
    setResult(null);
    setSteps([]);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-teal-600 to-emerald-700 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-teal-200" />
            <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
          </div>
          <p className="text-teal-100 opacity-90">{t.desc}</p>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">{t.labelInput}</label>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value.trim());
                  setError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleConvert();
                }}
                placeholder={t.placeholderInput}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-lg font-mono"
              />
            </div>

            <div className="hidden md:flex justify-center items-center mt-6 text-gray-400">
              <ArrowRight className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">{t.labelResult}</label>
              <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-lg font-mono h-[54px] flex items-center overflow-x-auto whitespace-nowrap font-bold text-teal-700">
                {result !== null ? result : <span className="text-gray-400 font-normal">-</span>}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleConvert}
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-xl transition-colors w-full sm:w-auto shadow-md flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              {t.btnConvert}
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-8 rounded-xl transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              {t.btnReset}
            </button>
          </div>

          {result !== null && steps.length > 0 && (
            <div className="mt-8 p-4 bg-teal-50 rounded-xl text-teal-900 overflow-x-auto">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-teal-600" />
                {t.explanationTitle}
              </h3>
              <table className="w-full text-left font-mono text-sm border-collapse">
                <thead>
                  <tr className="border-b border-teal-200 text-teal-700">
                    <th className="py-2 px-3">#</th>
                    <th className="py-2 px-3">{isEN ? 'Calculation' : 'ตัวตั้ง ÷ 2'}</th>
                    <th className="py-2 px-3">{t.stepQuotient}</th>
                    <th className="py-2 px-3">{t.stepRemainder}</th>
                  </tr>
                </thead>
                <tbody>
                  {steps.map((step, idx) => (
                    <tr key={idx} className="border-b border-teal-100 hover:bg-teal-100/50">
                      <td className="py-2 px-3 text-teal-600">{idx + 1}</td>
                      <td className="py-2 px-3">{step.original} ÷ 2</td>
                      <td className="py-2 px-3">{step.quotient}</td>
                      <td className="py-2 px-3 font-bold">{step.remainder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 p-3 bg-white rounded-lg border border-teal-100 text-sm">
                <p>
                  {isEN 
                    ? 'Write the remainders from bottom to top to get the binary result:' 
                    : 'อ่านค่าเศษจากล่างขึ้นบน จะได้รหัสเลขฐานสอง:'}{' '}
                  <span className="font-bold text-lg font-mono text-teal-700 bg-teal-50 px-2 py-1 rounded">
                    {result}₂
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-teal max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Info className="w-6 h-6 text-teal-600" />
          การแปลงเลขฐาน 10 เป็นเลขฐาน 2: ความสำคัญ วิธีคิด และการใช้งานในยุคดิจิทัล
        </h2>
        
        <p>
          ระบบเลขฐาน 10 (Decimal Number System) คือระบบตัวเลขที่เราทุกคนคุ้นเคยและใช้กันในชีวิตประจำวัน ไม่ว่าจะเป็นการนับเงิน การคำนวณอายุ หรือการทำธุรกรรมต่างๆ ซึ่งระบบนี้ประกอบด้วยตัวเลขโดด 10 ตัว คือ 0, 1, 2, 3, 4, 5, 6, 7, 8 และ 9 แต่ในทางตรงกันข้าม ระบบคอมพิวเตอร์และวงจรอิเล็กทรอนิกส์ต่างๆ ไม่สามารถเข้าใจระบบฐานสิบนี้ได้โดยตรง เนื่องจากอุปกรณ์เหล่านี้ทำงานด้วยกระแสไฟฟ้าที่มีสถานะเพียง 2 สถานะ คือ "มีกระแสไฟฟ้า" (เปิด / True) และ "ไม่มีกระแสไฟฟ้า" (ปิด / False) ส่งผลให้วิศวกรคอมพิวเตอร์เลือกใช้ <strong>ระบบเลขฐาน 2 (Binary Number System)</strong> ซึ่งมีเพียงตัวเลข 0 และ 1 ในการจัดเก็บและประมวลผลข้อมูล
        </p>

        <h3>ระบบเลขฐาน 2 (Binary) คืออะไร?</h3>
        <p>
          ระบบเลขฐานสองประกอบด้วยสัญลักษณ์สองตัว คือ 0 และ 1 แต่ละหลักของเลขฐานสองจะมีค่าประจำหลักตามเลขยกกำลังของสอง (Base-2 positional system) โดยเริ่มจากขวาไปซ้าย ดังนี้:
        </p>
        <ul>
          <li>ตำแหน่งขวาสุด (หลักหน่วย): 2⁰ = 1</li>
          <li>ตำแหน่งถัดมาทางซ้าย: 2¹ = 2</li>
          <li>ตำแหน่งถัดมาทางซ้าย: 2² = 4</li>
          <li>ตำแหน่งถัดมาทางซ้าย: 2³ = 8</li>
          <li>ตำแหน่งถัดมาทางซ้าย: 2⁴ = 16</li>
        </ul>
        <p>
          ตัวอย่างเช่น เลขฐานสอง <code>11001₂</code> สามารถคิดเป็นเลขฐานสิบได้โดยการกระจายหลัก: (1 × 2⁴) + (1 × 2³) + (0 × 2²) + (0 × 2¹) + (1 × 2⁰) = 16 + 8 + 0 + 0 + 1 = 25 ในทางกลับกัน การแปลงจากเลขฐานสิบไปเป็นเลขฐานสอง มีวิธีการคำนวณที่เรียบง่ายแต่ต้องใช้ความเข้าใจ
        </p>

        <h3>วิธีแปลงเลขฐาน 10 เป็นฐาน 2 ด้วยวิธีการหารสั้น (Repeated Division by 2)</h3>
        <p>
          วิธีที่เป็นที่นิยมและง่ายที่สุดในการแปลงเลขฐานสิบเป็นเลขฐานสองคือ <strong>"วิธีการหารด้วยสองแล้วเขียนเศษ"</strong> โดยมีขั้นตอนดังต่อไปนี้:
        </p>
        <ol>
          <li>นำเลขฐานสิบที่ต้องการตั้ง หารด้วย 2</li>
          <li>จดผลลัพธ์ที่เป็นจำนวนเต็ม (ผลหาร) และเขียนเศษเหลือ (ซึ่งจะมีค่าได้เพียง 0 หรือ 1 เท่านั้น)</li>
          <li>นำผลหารจากขั้นตอนก่อนหน้ามาหารด้วย 2 อีกครั้ง แล้วเขียนเศษเหลือ</li>
          <li>ทำซ้ำขั้นตอนข้างต้นไปเรื่อยๆ จนกว่าผลหารจะมีค่าเป็น 0</li>
          <li>ผลลัพธ์ของเลขฐานสองจะได้จากการนำเศษที่ได้มาเรียงต่อกัน <strong>โดยเริ่มอ่านจากเศษตัวสุดท้าย (ล่างสุด) ขึ้นไปหาเศษตัวแรก (บนสุด)</strong></li>
        </ol>

        <h4>ตัวอย่างการแสดงวิธีทำอย่างละเอียด: แปลงเลข 13 เป็นฐาน 2</h4>
        <p>
          ลองทำตามขั้นตอนการหารต่อไปนี้เพื่อเห็นภาพที่ชัดเจน:
        </p>
        <ul>
          <li><strong>รอบที่ 1:</strong> 13 ÷ 2 ได้ผลหารเป็น 6 เหลือเศษ <strong>1</strong></li>
          <li><strong>รอบที่ 2:</strong> 6 ÷ 2 ได้ผลหารเป็น 3 เหลือเศษ <strong>0</strong></li>
          <li><strong>รอบที่ 3:</strong> 3 ÷ 2 ได้ผลหารเป็น 1 เหลือเศษ <strong>1</strong></li>
          <li><strong>รอบที่ 4:</strong> 1 ÷ 2 ได้ผลหารเป็น 0 เหลือเศษ <strong>1</strong> (การหารเสร็จสิ้นเนื่องจากผลหารเป็น 0)</li>
        </ul>
        <p>
          นำเศษเหลือที่ได้มาเรียงลำดับย้อนกลับจากล่างขึ้นบน: 1, 1, 0, 1<br />
          ดังนั้น เลขฐานสิบ <strong>13</strong> ในระบบเลขฐานสองจึงเท่ากับ <strong>1101₂</strong>
        </p>

        <h3>ประโยชน์ของระบบเลขฐานสองในเทคโนโลยีปัจจุบัน</h3>
        <p>
          การเรียนรู้และใช้เครื่องมือแปลงเลขฐานสิบเป็นฐานสองช่วยส่งเสริมความเข้าใจในโครงสร้างดิจิทัลอย่างละเอียด ทุกคำสั่งโปรแกรมคอมพิวเตอร์ที่เราพิมพ์ หรือภาพถ่ายไฟล์ JPEG และเพลง MP3 ต่างถูกแปลงเป็นสัญญาณรหัสบิต 0 และ 1 ทั้งหมด การเข้าใจความเชื่อมโยงระหว่างตัวเลขฐานสิบที่มนุษย์คุ้นเคยกับฐานสองที่เครื่องจักรเข้าใจ จึงเป็นหัวใจสำคัญของการเขียนโปรแกรมระดับต่ำ (Low-level programming) การออกแบบสถาปัตยกรรมคอมพิวเตอร์ และวิทยาการเข้ารหัสลับ (Cryptography)
        </p>
      </article>
    </div>
  );
}

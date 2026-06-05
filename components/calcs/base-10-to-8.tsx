"use client";

import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, AlertTriangle, RefreshCw } from 'lucide-react';

export default function Base10To8({ lang }: any) {
  const isEN = lang === 'en';
  const [inputVal, setInputVal] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<{ quotient: number; remainder: number; original: number }[]>([]);
  const [error, setError] = useState<string>('');

  const t = {
    title: isEN ? 'Decimal to Octal Converter (Base 10 to 8)' : 'เครื่องมือคำนวณแปลงเลขฐาน 10 เป็นเลขฐาน 8',
    desc: isEN ? 'Convert decimal numbers to octal format.' : 'แปลงตัวเลขจากระบบเลขฐานสิบเป็นระบบเลขฐานแปดอย่างแม่นยำ',
    labelInput: isEN ? 'Decimal Number (Base 10)' : 'กรอกเลขฐาน 10 (จำนวนเต็มบวก)',
    placeholderInput: isEN ? 'e.g. 156' : 'ตัวอย่าง 156',
    btnConvert: isEN ? 'Convert' : 'แปลงเป็นเลขฐาน 8',
    btnReset: isEN ? 'Clear' : 'ล้างข้อมูล',
    labelResult: isEN ? 'Octal Result (Base 8)' : 'ผลลัพธ์เลขฐาน 8',
    invalidInput: isEN ? 'Please enter a valid positive integer.' : 'กรุณากรอกจำนวนเต็มบวกที่ถูกต้อง',
    explanationTitle: isEN ? 'Step-by-Step Division by 8:' : 'ขั้นตอนการหารด้วย 8 ทีละขั้น:',
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
    let octalStr = '';

    while (temp > 0) {
      const original = temp;
      const remainder = temp % 8;
      const quotient = Math.floor(temp / 8);
      tempSteps.push({ original, quotient, remainder });
      octalStr = remainder.toString() + octalStr;
      temp = quotient;
    }

    setResult(octalStr);
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
        <div className="bg-gradient-to-r from-blue-600 to-cyan-700 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-blue-200" />
            <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
          </div>
          <p className="text-blue-100 opacity-90">{t.desc}</p>
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg font-mono"
              />
            </div>

            <div className="hidden md:flex justify-center items-center mt-6 text-gray-400">
              <ArrowRight className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">{t.labelResult}</label>
              <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-lg font-mono h-[54px] flex items-center overflow-x-auto whitespace-nowrap font-bold text-blue-700">
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-colors w-full sm:w-auto shadow-md flex items-center justify-center gap-2"
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
            <div className="mt-8 p-4 bg-blue-50 rounded-xl text-blue-900 overflow-x-auto">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                {t.explanationTitle}
              </h3>
              <table className="w-full text-left font-mono text-sm border-collapse">
                <thead>
                  <tr className="border-b border-blue-200 text-blue-700">
                    <th className="py-2 px-3">#</th>
                    <th className="py-2 px-3">{isEN ? 'Calculation' : 'ตัวตั้ง ÷ 8'}</th>
                    <th className="py-2 px-3">{t.stepQuotient}</th>
                    <th className="py-2 px-3">{t.stepRemainder}</th>
                  </tr>
                </thead>
                <tbody>
                  {steps.map((step, idx) => (
                    <tr key={idx} className="border-b border-blue-100 hover:bg-blue-100/50">
                      <td className="py-2 px-3 text-blue-600">{idx + 1}</td>
                      <td className="py-2 px-3">{step.original} ÷ 8</td>
                      <td className="py-2 px-3">{step.quotient}</td>
                      <td className="py-2 px-3 font-bold">{step.remainder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 p-3 bg-white rounded-lg border border-blue-100 text-sm">
                <p>
                  {isEN 
                    ? 'Write the remainders from bottom to top to get the octal result:' 
                    : 'อ่านค่าเศษจากล่างขึ้นบน จะได้รหัสเลขฐานแปด:'}{' '}
                  <span className="font-bold text-lg font-mono text-blue-700 bg-blue-50 px-2 py-1 rounded">
                    {result}₈
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-blue max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Info className="w-6 h-6 text-blue-600" />
          การแปลงเลขฐาน 10 เป็นเลขฐาน 8: เรียนรู้ความเข้าใจและวิธีคำนวณอย่างถูกต้อง
        </h2>
        
        <p>
          ระบบเลขฐาน 8 (Octal Number System) หรือระบบเลขฐานแปด เป็นหนึ่งในระบบจำนวนประจำตำแหน่งที่มีความสำคัญในการศึกษาวิชาคณิตศาสตร์และวิทยาการคอมพิวเตอร์ แม้ว่าจะไม่ถูกพูดถึงบ่อยเท่ากับระบบเลขฐานสอง (Binary) หรือฐานสิบหก (Hexadecimal) แต่ระบบเลขฐานแปดยังคงมีบทบาทโดดเด่นและช่วยเพิ่มประสิทธิภาพในการคำนวณ รวมถึงใช้สื่อสารกับระบบระดับลึกในทางคอมพิวเตอร์อย่างมีเอกลักษณ์
        </p>

        <h3>ทำความรู้จักระบบเลขฐาน 8 (Octal System)</h3>
        <p>
          ระบบเลขฐาน 8 เป็นระบบตัวเลขที่ประกอบด้วยสัญลักษณ์หรือตัวเลขโดดทั้งหมด 8 ตัว คือ <code>0, 1, 2, 3, 4, 5, 6, 7</code> ระบบนี้จะไม่มีเลข 8 หรือ 9 ในระบบ หลักแต่ละหลักมีค่าประจำตำแหน่งตามพลังงานเลขยกกำลังของ 8 (Base-8 positional system) นับไล่จากขวาไปซ้ายดังนี้:
        </p>
        <ul>
          <li>ตำแหน่งขวาสุด (หลักหน่วย): 8⁰ = 1</li>
          <li>ตำแหน่งถัดมาทางซ้าย: 8¹ = 8</li>
          <li>ตำแหน่งถัดมาทางซ้าย: 8² = 64</li>
          <li>ตำแหน่งถัดมาทางซ้าย: 8³ = 512</li>
        </ul>
        <p>
          เนื่องจากเลข 8 เกิดจาก 2³ (2 ยกกำลัง 3) ระบบเลขฐานแปดจึงมีความสัมพันธ์โดยตรงกับระบบเลขฐานสอง โดยเลขฐานแปด 1 หลัก จะใช้แทนเลขฐานสองได้ 3 บิตพอดี ช่วยให้มนุษย์สามารถเขียนหรืออ่านรหัสฐานสองที่มีความยาวมากได้สั้นลง
        </p>

        <h3>วิธีแปลงเลขฐาน 10 เป็นเลขฐาน 8 (Repeated Division by 8)</h3>
        <p>
          กระบวนการเปลี่ยนตัวเลขฐานสิบเป็นฐานแปดทำได้โดยการหารตัวเลขดังกล่าวด้วย 8 ไปเรื่อยๆ จนกว่าผลหารจะเป็นศูนย์ และเขียนเศษจากการหารในแต่ละขั้นตอน มีกระบวนการปฏิบัติ ดังนี้:
        </p>
        <ol>
          <li>นำเลขฐานสิบตั้ง หารด้วย 8</li>
          <li>บันทึกผลหารที่เป็นจำนวนเต็ม และเศษที่เหลือ (มีค่าตั้งแต่ 0 ถึง 7)</li>
          <li>นำผลหารที่ได้จากข้อก่อนหน้ามาหารด้วย 8 ต่อไป</li>
          <li>ทำซ้ำไปเรื่อยๆ จนกระทั่งผลหารกลายเป็น 0</li>
          <li>รวบรวมเศษเหลือทั้งหมดมาเรียงต่อกัน <strong>โดยเริ่มจากเศษในขั้นตอนสุดท้าย ไล่ขึ้นไปยังเศษในขั้นตอนแรก</strong></li>
        </ol>

        <h4>ตัวอย่างการคำนวณเชิงลึก: แปลงเลข 156 (ฐาน 10) เป็นเลขฐาน 8</h4>
        <p>
          มาดูรายละเอียดแต่ละขั้นตอนในการคำนวณหาร่วมกัน:
        </p>
        <ul>
          <li><strong>ขั้นตอนที่ 1:</strong> 156 ÷ 8 = 19 เหลือเศษ <strong>4</strong></li>
          <li><strong>ขั้นตอนที่ 2:</strong> 19 ÷ 8 = 2 เหลือเศษ <strong>3</strong></li>
          <li><strong>ขั้นตอนที่ 3:</strong> 2 ÷ 8 = 0 เหลือเศษ <strong>2</strong> (เนื่องจากผลหารหลักเป็น 0 จึงหยุดคำนวณ)</li>
        </ul>
        <p>
          เมื่อเรียงผลลัพธ์เศษเหลือจากขั้นตอนสุดท้าย (ล่างสุด) ย้อนขึ้นไป: 2, 3, 4<br />
          ดังนั้น เลขฐานสิบ <strong>156</strong> แปลงค่าได้เป็นเลขฐานแปดคือ <strong>234₈</strong>
        </p>

        <h3>การใช้งานจริงในทางปฏิบัติและระบบปฏิบัติการ</h3>
        <p>
          ตัวอย่างที่ชัดเจนที่สุดของการใช้ระบบเลขฐาน 8 ในปัจจุบัน คือ ระบบปฏิบัติการตระกูล Unix และ Linux ในระบบจัดการไฟล์ (File Permissions) ซึ่งการอนุญาตสิทธิ์เข้าถึงไฟล์ (chmod) จะใช้เลขฐานแปด 3 หลักเพื่อควบคุมการเข้าถึง ตัวอย่างเช่น ค่าสิทธิ์ <code>chmod 755</code> หรือ <code>chmod 644</code> ตัวเลขเหล่านี้สะท้อนถึงการกำหนดสิทธิ์ของเจ้าของ (Owner) กลุ่ม (Group) และบุคคลทั่วไป (Others) อย่างสั้นกระชับ โดยแปลงจากสิทธิ์แบบบิตย่อย (Read, Write, Execute) ได้สะดวกรวดเร็ว การเรียนรู้หลักสูตรคณิตศาสตร์เหล่านี้ผ่านเว็บแปลงเลขฐานออนไลน์ช่วยประหยัดเวลาและป้องกันข้อผิดพลาดทางวิศวกรรมคอมพิวเตอร์ได้อย่างมีประสิทธิภาพ
        </p>
      </article>
    </div>
  );
}

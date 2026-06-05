"use client";

import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, AlertTriangle, RefreshCw } from 'lucide-react';

export default function Base10To16({ lang }: any) {
  const isEN = lang === 'en';
  const [inputVal, setInputVal] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<{ quotient: number; remainder: number; original: number; hexDigit: string }[]>([]);
  const [error, setError] = useState<string>('');

  const t = {
    title: isEN ? 'Decimal to Hexadecimal Converter (Base 10 to 16)' : 'เครื่องมือคำนวณแปลงเลขฐาน 10 เป็นเลขฐาน 16',
    desc: isEN ? 'Convert decimal numbers to hexadecimal format.' : 'แปลงตัวเลขจากระบบเลขฐานสิบเป็นระบบเลขฐานสิบหกอย่างแม่นยำ',
    labelInput: isEN ? 'Decimal Number (Base 10)' : 'กรอกเลขฐาน 10 (จำนวนเต็มบวก)',
    placeholderInput: isEN ? 'e.g. 2026' : 'ตัวอย่าง 2026',
    btnConvert: isEN ? 'Convert' : 'แปลงเป็นเลขฐาน 16',
    btnReset: isEN ? 'Clear' : 'ล้างข้อมูล',
    labelResult: isEN ? 'Hexadecimal Result (Base 16)' : 'ผลลัพธ์เลขฐาน 16',
    invalidInput: isEN ? 'Please enter a valid positive integer.' : 'กรุณากรอกจำนวนเต็มบวกที่ถูกต้อง',
    explanationTitle: isEN ? 'Step-by-Step Division by 16:' : 'ขั้นตอนการหารด้วย 16 ทีละขั้น:',
    stepQuotient: isEN ? 'Quotient' : 'ผลหาร',
    stepRemainder: isEN ? 'Remainder (Dec)' : 'เศษเหลือ (ฐาน 10)',
    stepHex: isEN ? 'Hex Digit' : 'อักขระฐาน 16',
  };

  const getHexDigit = (val: number): string => {
    if (val < 10) return val.toString();
    const map: Record<number, string> = { 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F' };
    return map[val];
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
      setSteps([{ original: 0, quotient: 0, remainder: 0, hexDigit: '0' }]);
      return;
    }

    let temp = num;
    const tempSteps: { quotient: number; remainder: number; original: number; hexDigit: string }[] = [];
    let hexStr = '';

    while (temp > 0) {
      const original = temp;
      const remainder = temp % 16;
      const quotient = Math.floor(temp / 16);
      const hexDigit = getHexDigit(remainder);
      tempSteps.push({ original, quotient, remainder, hexDigit });
      hexStr = hexDigit + hexStr;
      temp = quotient;
    }

    setResult(hexStr);
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
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-purple-200" />
            <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
          </div>
          <p className="text-purple-100 opacity-90">{t.desc}</p>
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-lg font-mono"
              />
            </div>

            <div className="hidden md:flex justify-center items-center mt-6 text-gray-400">
              <ArrowRight className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">{t.labelResult}</label>
              <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-lg font-mono h-[54px] flex items-center overflow-x-auto whitespace-nowrap font-bold text-purple-700">
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
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-xl transition-colors w-full sm:w-auto shadow-md flex items-center justify-center gap-2"
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
            <div className="mt-8 p-4 bg-purple-50 rounded-xl text-purple-900 overflow-x-auto">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-purple-600" />
                {t.explanationTitle}
              </h3>
              <table className="w-full text-left font-mono text-sm border-collapse">
                <thead>
                  <tr className="border-b border-purple-200 text-purple-700">
                    <th className="py-2 px-3">#</th>
                    <th className="py-2 px-3">{isEN ? 'Calculation' : 'ตัวตั้ง ÷ 16'}</th>
                    <th className="py-2 px-3">{t.stepQuotient}</th>
                    <th className="py-2 px-3">{t.stepRemainder}</th>
                    <th className="py-2 px-3">{t.stepHex}</th>
                  </tr>
                </thead>
                <tbody>
                  {steps.map((step, idx) => (
                    <tr key={idx} className="border-b border-purple-100 hover:bg-purple-100/50">
                      <td className="py-2 px-3 text-purple-600">{idx + 1}</td>
                      <td className="py-2 px-3">{step.original} ÷ 16</td>
                      <td className="py-2 px-3">{step.quotient}</td>
                      <td className="py-2 px-3">{step.remainder}</td>
                      <td className="py-2 px-3 font-bold text-purple-700">{step.hexDigit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 p-3 bg-white rounded-lg border border-purple-100 text-sm">
                <p>
                  {isEN 
                    ? 'Write the Hex Digits from bottom to top to get the hexadecimal result:' 
                    : 'อ่านค่าตัวอักษรฐาน 16 จากล่างขึ้นบน จะได้รหัสเลขฐานสิบหก:'}{' '}
                  <span className="font-bold text-lg font-mono text-purple-700 bg-purple-50 px-2 py-1 rounded">
                    {result}₁₆
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-purple max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Info className="w-6 h-6 text-purple-600" />
          การแปลงเลขฐาน 10 เป็นเลขฐาน 16: ความสำคัญ วิธีการหารสั้น และความเชื่อมโยงในคอมพิวเตอร์
        </h2>
        
        <p>
          ระบบเลขฐาน 16 (Hexadecimal Number System) เป็นอีกหนึ่งระบบตัวเลขที่มีบทบาทสำคัญอย่างมากในศาสตร์วิศวกรรมคอมพิวเตอร์ วิทยาการเขียนโปรแกรม และการทำงานของหน่วยประมวลผล หากสังเกตโครงสร้างที่คอมพิวเตอร์ทำงาน คุณจะพบว่าคอมพิวเตอร์ใช้ระบบฐาน 2 ซึ่งประกอบไปด้วย 0 และ 1 ในการทำงาน แต่การที่มนุษย์จะต้องมาคอยอ่านบิตที่ยาวนับสิบๆ หลักอาจทำให้เกิดความสับสนและเหนื่อยล้าได้ ระบบเลขฐาน 16 จึงได้รับการนำเสนอในฐานะ "ตัวแทนกระชับ" สำหรับตัวเลขฐานสอง ทำให้โปรแกรมเมอร์สามารถมองเห็นและวิเคราะห์รหัสสถาปัตยกรรมข้อมูลได้สะดวกขึ้น
        </p>

        <h3>ระบบเลขฐาน 16 (Hexadecimal) คืออะไร?</h3>
        <p>
          ระบบเลขฐาน 16 ใช้สัญลักษณ์แทนตัวเลขโดดทั้งหมด 16 ตัวด้วยกัน โดยเริ่มตั้งแต่ตัวเลข 0 ถึง 9 และตัวอักษรภาษาอังกฤษ A ถึง F เพื่อระบุค่าในปริมาณที่ระบบฐานสิบแทนด้วย 10 ถึง 15 มีรายละเอียดตารางเปรียบเทียบดังนี้:
        </p>
        <ul>
          <li>ตัวเลข 0 ถึง 9: มีค่าตามสัญลักษณ์เดิมในระบบฐาน 10</li>
          <li>อักษร <code>A</code>: มีค่าเท่ากับ 10 ในเลขฐาน 10</li>
          <li>อักษร <code>B</code>: มีค่าเท่ากับ 11 ในเลขฐาน 10</li>
          <li>อักษร <code>C</code>: มีค่าเท่ากับ 12 ในเลขฐาน 10</li>
          <li>อักษร <code>D</code>: มีค่าเท่ากับ 13 ในเลขฐาน 10</li>
          <li>อักษร <code>E</code>: มีค่าเท่ากับ 14 ในเลขฐาน 10</li>
          <li>อักษร <code>F</code>: มีค่าเท่ากับ 15 ในเลขฐาน 10</li>
        </ul>

        <h3>ทำไมต้องแปลงจากฐาน 10 เป็น 16?</h3>
        <p>
          สาเหตุที่ระบบเลขฐาน 16 มีความสำคัญเพราะค่าประจำหลักของเลขฐานสิบหกมีขนาดสัมพันธ์กับสถาปัตยกรรม 8 บิต (1 ไบต์) ของหน่วยความจำอย่างสมบูรณ์แบบ เนื่องจากเลขฐานสิบหกหนึ่งหลักสามารถแสดงสัญลักษณ์ขนาด 4 บิต (เรียกว่า Nibble) ได้อย่างพอดิบพอดี ดังนั้น ข้อมูลขนาด 1 ไบต์ (8 บิต) จึงสามารถแทนค่าได้ด้วยตัวอักษรหรือตัวเลขฐานสิบหกเพียง 2 ตัวเท่านั้น (ตั้งแต่ 00 ถึง FF) ช่วยเพิ่มความอ่านง่ายในการดูเลขตำแหน่งหน่วยความจำ (Memory Address), ค่าสีรหัสเว็บ (เช่น CSS hex code <code>#FFFFFF</code> แทนสีขาว หรือ <code>#FF0000</code> แทนสีแดง), ตลอดจนหมายเลข IPv6 และ MAC Address ของอุปกรณ์เครือข่าย
        </p>

        <h3>ขั้นตอนและสูตรการแปลงเลขฐาน 10 เป็นฐาน 16 ด้วยวิธีหารด้วย 16</h3>
        <p>
          วิธีที่ได้มาตรฐานที่สุดในการแปลงตัวเลข คือการนำเลขฐานสิบมาทำการหารด้วย 16 ซ้ำไปเรื่อยๆ แล้วนำเศษเหลือมาเทียบกับอักขระฐานสิบหก โดยทำตามขั้นตอนนี้:
        </p>
        <ol>
          <li>นำตัวเลขฐานสิบตัวหลักตั้ง หารด้วย 16</li>
          <li>บันทึกผลลัพธ์จำนวนเต็ม (ผลหาร) และเก็บเศษที่เหลือ (มีค่าระหว่าง 0 ถึง 15)</li>
          <li>แปลงเศษเหลือที่มีค่าตั้งแต่ 10-15 ให้กลายเป็นอักษร A-F ตามกฎการจับคู่</li>
          <li>นำผลหารของรอบนั้นเป็นตัวตั้งในการหารด้วย 16 ครั้งถัดไป</li>
          <li>ดำเนินกระบวนการจนกระทั่งผลตั้งมีค่าน้อยกว่า 16 และไม่สามารถหารจำนวนเต็มได้อีกต่อไป (ผลหารเป็น 0)</li>
          <li>นำตัวอักษรและตัวเลขเศษเหลือทั้งหมดมาเรียงต่อกัน <strong>จากผลหารขั้นตอนล่างสุดย้อนกลับขึ้นไปหาเศษขั้นตอนแรกสุด</strong></li>
        </ol>

        <h4>กรณีตัวอย่าง: แปลงเลข 2026 (ฐาน 10) เป็นเลขฐาน 16</h4>
        <p>
          มาลองลงมือทำโจทย์ข้อนี้ทีละหลัก:
        </p>
        <ul>
          <li><strong>ขั้นที่ 1:</strong> 2026 ÷ 16 = 126 เศษ <strong>10</strong> (ซึ่งเทียบได้กับตัวอักษร <strong>A</strong>)</li>
          <li><strong>ขั้นที่ 2:</strong> 126 ÷ 16 = 7 เศษ <strong>14</strong> (ซึ่งเทียบได้กับตัวอักษร <strong>E</strong>)</li>
          <li><strong>ขั้นที่ 3:</strong> 7 ÷ 16 = 0 เศษ <strong>7</strong> (เมื่อผลหารเป็น 0 จึงยุติขั้นตอนการคำนวณ)</li>
        </ul>
        <p>
          รวบรวมตัวอักษรเศษจากล่างขึ้นบน: 7, E, A<br />
          ผลสรุป: เลขฐานสิบ <strong>2026</strong> ในระบบเลขฐานสิบหกมีค่าเท่ากับ <strong>7EA₁₆</strong>
        </p>
      </article>
    </div>
  );
}

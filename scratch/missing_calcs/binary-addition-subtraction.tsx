import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, AlertTriangle, Plus, Minus, Equal } from 'lucide-react';

export default function BinaryArithmetic({ lang }: any) {
  const [binaryA, setBinaryA] = useState('');
  const [binaryB, setBinaryB] = useState('');
  const [operation, setOperation] = useState('add');
  const [resultBin, setResultBin] = useState<string | null>(null);
  const [resultDec, setResultDec] = useState<number | null>(null);
  const [error, setError] = useState('');

  const t = {
    title: lang === 'en' ? 'Binary Addition & Subtraction' : 'เครื่องมือคำนวณการบวกลบเลขฐาน 2',
    inputA: lang === 'en' ? 'First Binary Number' : 'ตัวเลขฐาน 2 ตัวที่ 1',
    inputB: lang === 'en' ? 'Second Binary Number' : 'ตัวเลขฐาน 2 ตัวที่ 2',
    calcBtn: lang === 'en' ? 'Calculate' : 'คำนวณ',
    resultBin: lang === 'en' ? 'Result (Base 2)' : 'ผลลัพธ์ (ฐาน 2)',
    resultDec: lang === 'en' ? 'Result (Base 10)' : 'ผลลัพธ์ (ฐาน 10)',
    invalidBinary: lang === 'en' ? 'Invalid binary number. Please enter only 0 and 1.' : 'รูปแบบเลขฐาน 2 ไม่ถูกต้อง กรุณากรอกเฉพาะ 0 และ 1 เท่านั้น',
    negative: lang === 'en' ? 'Result is negative.' : 'ผลลัพธ์ติดลบ (ในระบบคอมพิวเตอร์มักใช้ Two\'s Complement)',
  };

  const handleCalculate = () => {
    if (!binaryA || !binaryB) {
      setResultBin(null);
      setResultDec(null);
      setError('');
      return;
    }

    if (!/^[01]+$/.test(binaryA) || !/^[01]+$/.test(binaryB)) {
      setError(t.invalidBinary);
      setResultBin(null);
      setResultDec(null);
      return;
    }

    setError('');
    
    // Parse binary to decimal
    const decA = parseInt(binaryA, 2);
    const decB = parseInt(binaryB, 2);
    let decResult = 0;

    if (operation === 'add') {
      decResult = decA + decB;
    } else {
      decResult = decA - decB;
    }

    setResultDec(decResult);

    if (decResult < 0) {
      // Show negative sign before binary
      setResultBin('-' + Math.abs(decResult).toString(2));
      // Alternatively, one could implement Two's complement here, but standard negative sign is easier for general users.
    } else {
      setResultBin(decResult.toString(2));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-blue-200" />
            <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
          </div>
          <p className="text-blue-100 opacity-90">
            {lang === 'en' ? 'Calculate addition and subtraction of binary numbers easily.' : 'คำนวณการบวกและการลบเลขฐานสอง (Binary) ได้อย่างแม่นยำ พร้อมแสดงผลในรูปแบบฐานสิบ'}
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            
            {/* Input Row */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 w-full space-y-2">
                <label className="block text-sm font-medium text-gray-700">{t.inputA}</label>
                <input
                  type="text"
                  value={binaryA}
                  onChange={(e) => {
                    setBinaryA(e.target.value.trim());
                    setError('');
                  }}
                  placeholder="e.g. 1011"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg font-mono text-center md:text-left"
                />
              </div>

              <div className="flex justify-center items-center md:mt-6 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setOperation('add')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${operation === 'add' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setOperation('sub')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${operation === 'sub' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 w-full space-y-2">
                <label className="block text-sm font-medium text-gray-700">{t.inputB}</label>
                <input
                  type="text"
                  value={binaryB}
                  onChange={(e) => {
                    setBinaryB(e.target.value.trim());
                    setError('');
                  }}
                  placeholder="e.g. 101"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg font-mono text-center md:text-left"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={handleCalculate}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-colors w-full md:w-auto shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Equal className="w-5 h-5" />
                {t.calcBtn}
              </button>
            </div>

            {/* Result Row */}
            {resultBin !== null && (
              <div className="mt-4 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col items-center">
                <div className="w-full max-w-sm space-y-4">
                  <div>
                    <span className="text-sm text-blue-600 font-semibold">{t.resultBin}</span>
                    <div className="text-3xl font-mono font-bold text-gray-800 break-all bg-white p-3 rounded-lg border border-blue-100 shadow-sm mt-1 text-center">
                      {resultBin}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-blue-600 font-semibold">{t.resultDec}</span>
                    <div className="text-xl font-mono text-gray-600 break-all bg-white p-3 rounded-lg border border-blue-100 shadow-sm mt-1 text-center">
                      {resultDec}
                    </div>
                  </div>
                  {resultDec !== null && resultDec < 0 && (
                    <p className="text-xs text-orange-600 text-center">{t.negative}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <article className="mt-12 prose prose-blue max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Info className="w-6 h-6 text-blue-500" />
          การบวกและการลบเลขฐาน 2 (Binary Addition & Subtraction)
        </h2>
        
        <p>
          ระบบคอมพิวเตอร์และวงจรดิจิทัลทั้งหมดใช้เลขฐาน 2 (Binary) ในการประมวลผลข้อมูลและคำนวณทางคณิตศาสตร์ เมื่อเราศึกษาเรื่องโครงสร้างคอมพิวเตอร์ (Computer Architecture) หรือวงจรลอจิก (Logic Circuits) พื้นฐานแรกสุดที่ต้องทำความเข้าใจคือวิธีการนำเลขฐาน 2 มาบวกและลบกัน การคำนวณเหล่านี้เป็นพื้นฐานของหน่วยประมวลผลตรรกะและคณิตศาสตร์ หรือ ALU (Arithmetic Logic Unit) ที่ฝังอยู่ใน CPU (Central Processing Unit) ทุกตัว
        </p>

        <h3>หลักการบวกเลขฐาน 2 (Binary Addition)</h3>
        <p>
          การบวกเลขฐาน 2 มีหลักการที่คล้ายคลึงกับการบวกเลขฐาน 10 ทั่วไป แต่เนื่องจากเรามีตัวเลขเพียง 0 และ 1 การทด (Carry) จึงเกิดขึ้นเร็วกว่า กฎพื้นฐานสำหรับการบวกเลขฐาน 2 มีเพียง 4 ข้อดังนี้:
        </p>
        <ul>
          <li><strong>0 + 0 = 0</strong> (ไม่มีตัวทด)</li>
          <li><strong>0 + 1 = 1</strong> (ไม่มีตัวทด)</li>
          <li><strong>1 + 0 = 1</strong> (ไม่มีตัวทด)</li>
          <li><strong>1 + 1 = 0</strong> (มีตัวทด 1 ไปยังบิตถัดไปทางซ้าย)</li>
        </ul>
        <p>
          หากมีตัวทดมาบวกเพิ่มด้วย เช่น <strong>1 + 1 + 1 (ตัวทด) = 1</strong> (และทด 1 ไปหลักถัดไป)
        </p>
        
        <h4>ตัวอย่างการบวก: 1011 + 0101</h4>
        <p>เราเริ่มบวกจากขวาไปซ้าย (LSB ไป MSB):</p>
        <ol>
          <li>หลักที่ 1 (ขวาสุด): 1 + 1 = 0 (ทด 1)</li>
          <li>หลักที่ 2: 1 + 0 + 1(ตัวทด) = 0 (ทด 1)</li>
          <li>หลักที่ 3: 0 + 1 + 1(ตัวทด) = 0 (ทด 1)</li>
          <li>หลักที่ 4 (ซ้ายสุด): 1 + 0 + 1(ตัวทด) = 0 (ทด 1)</li>
        </ol>
        <p>เมื่อมีตัวทดหลักสุดท้าย จะเกิดบิตใหม่ ดังนั้นคำตอบคือ <strong>10000</strong></p>

        <h3>หลักการลบเลขฐาน 2 (Binary Subtraction)</h3>
        <p>
          สำหรับการลบเลขฐาน 2 ด้วยวิธีตั้งลบปกติ จะมีการขอยืม (Borrow) จากหลักถัดไปทางซ้ายหากตัวตั้งน้อยกว่าตัวลบ กฎพื้นฐานคือ:
        </p>
        <ul>
          <li><strong>0 - 0 = 0</strong></li>
          <li><strong>1 - 0 = 1</strong></li>
          <li><strong>1 - 1 = 0</strong></li>
          <li><strong>0 - 1 = 1</strong> (ต้องมีการยืม 1 จากหลักทางซ้ายมา ซึ่งการยืม 1 มาจะทำให้หลักที่ยืมมามีค่าเป็น 2 ในฐาน 10 หรือ 10 ในฐาน 2)</li>
        </ul>

        <h4>ตัวอย่างการลบ: 1010 - 0111</h4>
        <ol>
          <li>หลักที่ 1 (ขวาสุด): 0 - 1 ยืมจากหลักถัดไป (0 กลายเป็น 10 ในฐาน 2 ซึ่งก็คือ 2 ลบ 1 เหลือ 1) คำตอบหลักนี้คือ 1</li>
          <li>หลักที่ 2: เดิมเป็น 1 ถูกยืมไปเหลือ 0 พอจะลบ 1 ก็ต้องยืมหลักถัดไปอีกที แต่หลักถัดไปเป็น 0 เลยต้องข้ามไปยืมหลักหน้าสุด สุดท้ายหลักนี้จะคำนวณได้เป็น 1</li>
          <li>การยืมต่อเป็นทอดๆ อาจทำให้สับสนได้ง่าย นี่จึงเป็นเหตุผลที่คอมพิวเตอร์ไม่ได้ใช้วิธียืมในการลบจริงๆ</li>
        </ol>

        <h3>วิธี 2's Complement สำหรับการลบ (ในระบบคอมพิวเตอร์)</h3>
        <p>
          ด้วยเหตุผลที่วงจรสำหรับการลบโดยการยืมมีความซับซ้อน ระบบคอมพิวเตอร์ส่วนใหญ่จึงแก้ปัญหาด้วยการเปลี่ยนการลบให้เป็นการบวกแทน โดยใช้หลักการที่เรียกว่า <strong>Two's Complement</strong> 
        </p>
        <p>
          เมื่อต้องการลบ A - B คอมพิวเตอร์จะทำโดย A + (-B) ซึ่ง -B จะถูกสร้างโดยการกลับบิตทั้งหมดของ B (0 เป็น 1, 1 เป็น 0) แล้วบวกด้วย 1 วิธีนี้ช่วยให้คอมพิวเตอร์สามารถใช้แค่วงจรบวก (Adder) สำหรับทั้งการบวกและการลบได้ ทำให้ประหยัดทรัพยากรฮาร์ดแวร์ได้อย่างมหาศาล
        </p>
        
        <h3>สรุป</h3>
        <p>
          การบวกลบเลขฐาน 2 เป็นความรู้ที่หลีกเลี่ยงไม่ได้สำหรับโปรแกรมเมอร์ วิศวกรคอมพิวเตอร์ หรือผู้ที่สนใจด้านอิเล็กทรอนิกส์ดิจิทัล เครื่องคำนวณในหน้านี้ถูกสร้างขึ้นมาเพื่อช่วยประหยัดเวลาและลดข้อผิดพลาดจากการคำนวณด้วยมือ ช่วยให้คุณตรวจสอบความถูกต้องของวงจร หรือทวนคำตอบการบ้านได้อย่างมั่นใจ
        </p>
      </article>
    </div>
  );
}

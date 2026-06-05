"use client";

import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, AlertTriangle, RefreshCw, Plus, Minus } from 'lucide-react';

export default function HexAdditionSubtraction({ lang }: any) {
  const isEN = lang === 'en';
  
  const [hex1, setHex1] = useState<string>('');
  const [hex2, setHex2] = useState<string>('');
  const [operation, setOperation] = useState<'add' | 'sub'>('add');
  
  const [resultHex, setResultHex] = useState<string | null>(null);
  const [resultDec, setResultDec] = useState<number | null>(null);
  const [resultBin, setResultBin] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [stepDetails, setStepDetails] = useState<string[]>([]);

  const t = {
    title: isEN ? 'Hexadecimal Addition and Subtraction' : 'เครื่องมือคำนวณการบวกลบเลขฐาน 16',
    desc: isEN ? 'Add or subtract two hexadecimal numbers with step-by-step work.' : 'บวกหรือลบเลขฐาน 16 พร้อมการแสดงขั้นตอนการคิดและผลลัพธ์ในฐานสิบ/สอง',
    labelHex1: isEN ? 'First Hex Number (Base 16)' : 'เลขฐาน 16 ตัวที่หนึ่ง',
    labelHex2: isEN ? 'Second Hex Number (Base 16)' : 'เลขฐาน 16 ตัวที่สอง',
    placeholderHex: isEN ? 'e.g. A3F' : 'เช่น A3F',
    labelOp: isEN ? 'Operation' : 'ตัวดำเนินการ',
    btnCalculate: isEN ? 'Calculate' : 'คำนวณผลลัพธ์',
    btnReset: isEN ? 'Clear' : 'ล้างข้อมูล',
    labelResultHex: isEN ? 'Hex Result (Base 16)' : 'ผลลัพธ์เลขฐาน 16',
    labelResultDec: isEN ? 'Decimal Result (Base 10)' : 'ผลลัพธ์เลขฐาน 10',
    labelResultBin: isEN ? 'Binary Result (Base 2)' : 'ผลลัพธ์เลขฐาน 2',
    invalidHex: isEN ? 'Invalid Hexadecimal format. Use digits 0-9 and letters A-F.' : 'รูปแบบเลขฐาน 16 ไม่ถูกต้อง กรุณาใช้เฉพาะตัวเลข 0-9 และตัวอักษร A-F เท่านั้น',
    explanationTitle: isEN ? 'Step-by-Step Calculation' : 'คำอธิบายขั้นตอนการคิดอย่างละเอียด',
    decEquivalent: isEN ? 'Decimal equivalent calculation:' : 'การคำนวณเทียบเท่าในฐาน 10:',
    emptyInputs: isEN ? 'Please enter both hexadecimal numbers.' : 'กรุณากรอกตัวเลขฐาน 16 ทั้งสองตัวช่อง',
  };

  const validateHex = (str: string) => {
    return /^[0-9A-Fa-f]+$/.test(str);
  };

  const handleCalculate = () => {
    setError('');
    setResultHex(null);
    setResultDec(null);
    setResultBin(null);
    setStepDetails([]);

    const h1 = hex1.trim();
    const h2 = hex2.trim();

    if (!h1 || !h2) {
      setError(t.emptyInputs);
      return;
    }

    if (!validateHex(h1) || !validateHex(h2)) {
      setError(t.invalidHex);
      return;
    }

    const val1 = parseInt(h1, 16);
    const val2 = parseInt(h2, 16);

    let decResult = 0;
    if (operation === 'add') {
      decResult = val1 + val2;
    } else {
      decResult = val1 - val2;
    }

    const isNegative = decResult < 0;
    const absDec = Math.abs(decResult);
    const absHex = absDec.toString(16).toUpperCase();
    const finalHex = isNegative ? '-' + absHex : absHex;
    const finalBin = isNegative ? '-' + absDec.toString(2) : absDec.toString(2);

    setResultHex(finalHex);
    setResultDec(decResult);
    setResultBin(finalBin);

    // Generate step-by-step logic
    const steps: string[] = [];
    steps.push(isEN 
      ? `Convert inputs to decimal: ${h1.toUpperCase()}₁₆ = ${val1}₁₀, and ${h2.toUpperCase()}₁₆ = ${val2}₁₀` 
      : `แปลงค่าข้อมูลนำเข้าเป็นเลขฐาน 10: ${h1.toUpperCase()}₁₆ = ${val1}₁₀ และ ${h2.toUpperCase()}₁₆ = ${val2}₁₀`
    );

    const sign = operation === 'add' ? '+' : '-';
    steps.push(isEN
      ? `Perform decimal operation: ${val1} ${sign} ${val2} = ${decResult}`
      : `คำนวณผลลัพธ์ในฐาน 10: ${val1} ${sign} ${val2} = ${decResult}`
    );

    // Let's do a digit-by-digit simulation if it's non-negative and simple
    if (!isNegative) {
      steps.push(isEN 
        ? `Let's analyze digit-by-digit (right to left) in base 16:`
        : `จำลองการบวกลบทีละตำแหน่งจากขวาไปซ้าย (ฐาน 16):`
      );

      const maxLen = Math.max(h1.length, h2.length);
      const padded1 = h1.toUpperCase().padStart(maxLen, '0');
      const padded2 = h2.toUpperCase().padStart(maxLen, '0');
      
      let carry = 0;
      let borrow = 0;
      const digitCalcs: string[] = [];

      if (operation === 'add') {
        let currentCarry = 0;
        for (let i = maxLen - 1; i >= 0; i--) {
          const d1 = parseInt(padded1[i], 16);
          const d2 = parseInt(padded2[i], 16);
          const sum = d1 + d2 + currentCarry;
          const newCarry = Math.floor(sum / 16);
          const remainder = sum % 16;
          const remHex = remainder.toString(16).toUpperCase();
          
          digitCalcs.unshift(isEN
            ? `Position ${maxLen - 1 - i}: ${padded1[i]} (${d1}) + ${padded2[i]} (${d2})` + 
              (currentCarry > 0 ? ` + Carry (${currentCarry})` : '') + ` = ${sum}. ` +
              (sum >= 16 ? `Since ${sum} >= 16, write down ${remHex} and carry ${newCarry} to next column.` : `Write down ${remHex}, carry 0.`)
            : `ตำแหน่งที่ ${maxLen - i} (จากขวา): ${padded1[i]} (${d1}) + ${padded2[i]} (${d2})` + 
              (currentCarry > 0 ? ` + ตัวทด (${currentCarry})` : '') + ` = ${sum}. ` +
              (sum >= 16 ? `เนื่องจากผลรวม >= 16 ให้เขียน ${remHex} และทด ${newCarry} ไปหลักถัดไป` : `เขียน ${remHex} ตัวทด 0`)
          );
          currentCarry = newCarry;
        }
        if (currentCarry > 0) {
          digitCalcs.push(isEN 
            ? `Final carry of ${currentCarry} written at the leftmost position.` 
            : `ตัวทดตัวสุดท้าย ${currentCarry} ถูกนำมาเขียนไว้ข้างหน้าสุด`
          );
        }
      } else {
        // Subtraction (since decResult >= 0, we know val1 >= val2)
        const digits1 = Array.from(padded1).map(c => parseInt(c, 16));
        const digits2 = Array.from(padded2).map(c => parseInt(c, 16));
        
        for (let i = maxLen - 1; i >= 0; i--) {
          let d1 = digits1[i];
          const d2 = digits2[i];
          
          if (d1 < d2) {
            // Need to borrow
            let j = i - 1;
            while (j >= 0 && digits1[j] === 0) {
              j--;
            }
            if (j >= 0) {
              digits1[j] -= 1;
              for (let k = j + 1; k < i; k++) {
                digits1[k] += 15; // 16 - 1
              }
              d1 += 16;
              digitCalcs.unshift(isEN
                ? `Position ${maxLen - 1 - i}: ${padded1[i]} borrows 16 from left. It becomes ${d1}. ${d1} - ${d2} = ${d1 - d2} (${(d1 - d2).toString(16).toUpperCase()})`
                : `ตำแหน่งที่ ${maxLen - i}: ${padded1[i]} มีค่าน้อยกว่า ${padded2[i]} จึงยืมตัวซ้ายมา 16 กลายเป็น ${d1} -> ${d1} - ${d2} = ${d1 - d2} (${(d1 - d2).toString(16).toUpperCase()})`
              );
            } else {
              digitCalcs.unshift(isEN
                ? `Position ${maxLen - 1 - i}: ${d1} - ${d2} = ${d1 - d2}`
                : `ตำแหน่งที่ ${maxLen - i}: ${d1} - ${d2} = ${d1 - d2}`
              );
            }
          } else {
            digitCalcs.unshift(isEN
              ? `Position ${maxLen - 1 - i}: ${d1} - ${d2} = ${d1 - d2} (${(d1 - d2).toString(16).toUpperCase()})`
              : `ตำแหน่งที่ ${maxLen - i}: ${d1} - ${d2} = ${d1 - d2} (${(d1 - d2).toString(16).toUpperCase()})`
            );
          }
        }
      }
      steps.push(...digitCalcs);
    }

    steps.push(isEN
      ? `Convert the final result ${decResult} back to Hexadecimal: ${finalHex}₁₆`
      : `แปลงผลลัพธ์จากฐาน 10 กลับไปเป็นฐาน 16: ${finalHex}₁₆`
    );

    setStepDetails(steps);
  };

  const handleClear = () => {
    setHex1('');
    setHex2('');
    setResultHex(null);
    setResultDec(null);
    setResultBin(null);
    setError('');
    setStepDetails([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-pink-200" />
            <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
          </div>
          <p className="text-pink-100 opacity-90">{t.desc}</p>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">{t.labelHex1}</label>
              <input
                type="text"
                value={hex1}
                onChange={(e) => {
                  setHex1(e.target.value.replace(/[^0-9a-fA-F]/g, ''));
                  setError('');
                }}
                placeholder={t.placeholderHex}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors text-lg font-mono uppercase"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">{t.labelOp}</label>
              <div className="flex rounded-xl overflow-hidden border border-gray-300 h-[50px]">
                <button
                  type="button"
                  onClick={() => setOperation('add')}
                  className={`flex-1 flex items-center justify-center gap-2 font-bold transition-colors ${operation === 'add' ? 'bg-rose-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                >
                  <Plus className="w-5 h-5" />
                  {isEN ? 'Add' : 'บวก'}
                </button>
                <button
                  type="button"
                  onClick={() => setOperation('sub')}
                  className={`flex-1 flex items-center justify-center gap-2 font-bold transition-colors ${operation === 'sub' ? 'bg-rose-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                >
                  <Minus className="w-5 h-5" />
                  {isEN ? 'Subtract' : 'ลบ'}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">{t.labelHex2}</label>
              <input
                type="text"
                value={hex2}
                onChange={(e) => {
                  setHex2(e.target.value.replace(/[^0-9a-fA-F]/g, ''));
                  setError('');
                }}
                placeholder={t.placeholderHex}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors text-lg font-mono uppercase"
              />
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
              onClick={handleCalculate}
              className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 px-8 rounded-xl transition-colors w-full sm:w-auto shadow-md flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              {t.btnCalculate}
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-8 rounded-xl transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              {t.btnReset}
            </button>
          </div>

          {resultHex !== null && (
            <div className="mt-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
                  <p className="text-sm text-gray-500 mb-1">{t.labelResultHex}</p>
                  <p className="text-2xl font-bold text-rose-700 font-mono">{resultHex}₁₆</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">{t.labelResultDec}</p>
                  <p className="text-2xl font-bold text-gray-800 font-mono">{resultDec}₁₀</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">{t.labelResultBin}</p>
                  <p className="text-xl font-bold text-gray-800 font-mono truncate">{resultBin}₂</p>
                </div>
              </div>

              {stepDetails.length > 0 && (
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 text-gray-800">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-rose-700">
                    <Info className="w-5 h-5" />
                    {t.explanationTitle}
                  </h3>
                  <ul className="space-y-2 font-mono text-sm list-disc pl-5">
                    {stepDetails.map((step, idx) => (
                      <li key={idx} className="leading-relaxed">{step}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-rose max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Info className="w-6 h-6 text-rose-600" />
          การบวกและการลบเลขฐาน 16: ทฤษฎีคณิตศาสตร์ หลักการยืมตัวเลข และความสัมพันธ์ทางคอมพิวเตอร์
        </h2>
        
        <p>
          ในระบบเทคโนโลยีคอมพิวเตอร์ ตัวเลขฐานสิบหก (Hexadecimal Arithmetic) มีความสำคัญอย่างยิ่งต่อการกำหนดหน่วยความจำและการวิเคราะห์รีจิสเตอร์ของซีพียู (CPU registers) ความสามารถในการดำเนินการคณิตศาสตร์ขั้นพื้นฐานอย่าง <strong>การบวกและการลบเลขฐาน 16</strong> เป็นทักษะที่โปรแกรมเมอร์และนักศึกษาด้านวิศวกรรมคอมพิวเตอร์จำเป็นต้องมี เพื่อทำความเข้าใจถึงกระบวนการคำนวณของหน่วยคำนวณและตรรกะ (Arithmetic Logic Unit - ALU) ได้อย่างลึกซึ้ง
        </p>

        <h3>หลักการบวกเลขฐาน 16 (Hexadecimal Addition)</h3>
        <p>
          การบวกเลขฐาน 16 มีความคล้ายคลึงกับการบวกเลขฐาน 10 ที่เราทุกคนคุ้นเคย แต่ข้อแตกต่างสำคัญคือการตั้งหลักพิจารณาค่าน้ำหนักหลักสิบหก เมื่อเราบวกตัวเลขสองตัวในตำแหน่งหลักเดียวกัน:
        </p>
        <ol>
          <li>ทำการเปลี่ยนค่าจากตัวอักษร <code>A-F</code> ให้เป็นเลขฐานสิบก่อนบวก (A=10, B=11, C=12, D=13, E=14, F=15)</li>
          <li>คำนวณผลรวมของคอลัมน์นั้น</li>
          <li>ถ้าผลรวม <strong>น้อยกว่า 16</strong> สามารถเขียนตัวเลขหรือตัวอักษรนั้นๆ ลงใต้คอลัมน์ได้ทันที</li>
          <li>ถ้าผลรวม <strong>เท่ากับ 16 หรือมากกว่า 16</strong> ให้นำผลรวมนั้นลบด้วย 16 เพื่อเก็บค่าเศษหลักหน่วยไว้เขียนลงตำแหน่งผลลัพธ์ และให้ทำการทดค่า (Carry) เท่ากับ 1 ไปยังตำแหน่งหลักทางด้านซ้ายถัดไป</li>
        </ol>

        <h4>ตัวอย่างคณิตศาสตร์การบวก: A3F₁₆ + 1C8₁₆</h4>
        <p>
          ตั้งหลักบวกทีละตำแหน่งจากขวาไปซ้าย:
        </p>
        <ul>
          <li><strong>หลักขวาสุด (หลักที่ 1):</strong> F (15) + 8 = 23. เนื่องจาก 23 &gt;= 16, ให้นำ 23 - 16 = 7. เขียนเลข <strong>7</strong> ในช่องผลลัพธ์ และทด <strong>1</strong> ไปทางซ้าย</li>
          <li><strong>หลักที่ 2:</strong> 3 + C (12) + ตัวทด 1 = 16. เนื่องจาก 16 &gt;= 16, ให้นำ 16 - 16 = 0. เขียนเลข <strong>0</strong> ในช่องผลลัพธ์ และทด <strong>1</strong> ไปทางซ้าย</li>
          <li><strong>หลักที่ 3:</strong> A (10) + 1 + ตัวทด 1 = 12. เนื่องจาก 12 &lt; 16, สามารถเขียนแทนด้วยตัวอักษร <strong>C</strong> ได้ทันที</li>
        </ul>
        <p>
          ดังนั้น ผลบวกจะได้เท่ากับ <strong>C07₁₆</strong>
        </p>

        <h3>หลักการลบเลขฐาน 16 (Hexadecimal Subtraction)</h3>
        <p>
          ทำนองเดียวกันกับการลบเลขฐานสิบ หากตัวตั้งมีค่าน้อยกว่าตัวลบในหลักเดียวกัน เราจำเป็นต้องทำการยืมค่า (Borrow) จากตัวตั้งในหลักถัดไปทางซ้าย แต่จำไว้ว่า <strong>การยืมค่าหนึ่งครั้งในเลขฐานสิบหก จะมีค่าประจำตำแหน่งเท่ากับ 16 ในระบบฐานสิบ</strong>:
        </p>
        <ol>
          <li>หากหลักตัวตั้งมีค่ามากกว่าหรือเท่ากับตัวลบ ให้ทำการลบกันปกติและเขียนผลลัพธ์</li>
          <li>หากหลักตัวตั้งมีค่าน้อยกว่าตัวลบ ให้ไปยืมเลขหลักถัดไปทางซ้ายมา 1 (ค่าของหลักทางซ้ายจะลดลงไป 1) และเพิ่มค่าให้หลักที่เป็นตัวตั้งด้วย 16</li>
          <li>นำค่าใหม่ที่ได้ (ตัวตั้งเดิมบวก 16) มาลบกับตัวลบของหลักนั้น แล้วจดผลลัพธ์</li>
        </ol>

        <h4>ตัวอย่างคณิตศาสตร์การลบ: A3F₁₆ - 1C8₁₆</h4>
        <p>
          ตั้งหลักลบทีละตำแหน่งจากขวาไปซ้าย:
        </p>
        <ul>
          <li><strong>หลักที่ 1:</strong> F (15) - 8 = 7. เขียนเลข <strong>7</strong> ได้ทันที</li>
          <li><strong>หลักที่ 2:</strong> 3 - C (12). เนื่องจาก 3 มีค่าน้อยกว่า 12 จึงต้องยืมค่าจากตัวอักษร A ทางซ้ายมือ ตัวอักษร A (10) จะถูกหักไป 1 เหลือ 9 ส่วนหลักเดิมจะได้เพิ่มขึ้นมา 16 กลายเป็น 3 + 16 = 19. จากนั้นทำกระบวนการลบปกติ: 19 - 12 = 7. เขียนเลข <strong>7</strong> ลงในผลลัพธ์</li>
          <li><strong>หลักที่ 3:</strong> 9 - 1 = 8. เขียนเลข <strong>8</strong> ลงในผลลัพธ์</li>
        </ul>
        <p>
          ดังนั้น ผลลบจะได้เท่ากับ <strong>877₁₆</strong>
        </p>
      </article>
    </div>
  );
}

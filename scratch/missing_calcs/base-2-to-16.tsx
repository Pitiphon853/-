import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, AlertTriangle } from 'lucide-react';

export default function Base2To16({ lang }: any) {
  const [binary, setBinary] = useState('');
  const [hex, setHex] = useState<string | null>(null);
  const [error, setError] = useState('');

  const t = {
    title: lang === 'en' ? 'Binary to Hexadecimal Converter' : 'เครื่องมือคำนวณแปลงเลขฐาน 2 เป็นเลขฐาน 16',
    binaryInput: lang === 'en' ? 'Binary Number (Base 2)' : 'กรอกเลขฐาน 2',
    binaryPlaceholder: lang === 'en' ? 'e.g. 10101111' : 'เช่น 10101111',
    convertBtn: lang === 'en' ? 'Convert' : 'แปลงเป็นเลขฐาน 16',
    result: lang === 'en' ? 'Hexadecimal Result (Base 16)' : 'ผลลัพธ์เลขฐาน 16',
    invalidBinary: lang === 'en' ? 'Invalid binary number. Please enter only 0 and 1.' : 'รูปแบบเลขฐาน 2 ไม่ถูกต้อง กรุณากรอกเฉพาะ 0 และ 1 เท่านั้น',
    explanation: lang === 'en' ? 'Calculation Steps:' : 'ขั้นตอนการแปลง:',
  };

  const handleConvert = () => {
    if (!binary) {
      setHex(null);
      setError('');
      return;
    }

    if (!/^[01]+$/.test(binary)) {
      setError(t.invalidBinary);
      setHex(null);
      return;
    }

    setError('');
    // Ensure we handle very large binary strings by splitting into chunks of 4 from right to left
    let paddedBinary = binary;
    while (paddedBinary.length % 4 !== 0) {
      paddedBinary = '0' + paddedBinary;
    }

    let hexResult = '';
    for (let i = 0; i < paddedBinary.length; i += 4) {
      const chunk = paddedBinary.substring(i, i + 4);
      const dec = parseInt(chunk, 2);
      hexResult += dec.toString(16).toUpperCase();
    }
    setHex(hexResult);
  };

  const generateExplanation = (bin: string, hexResult: string) => {
    if (!bin || !hexResult) return null;
    
    let paddedBinary = bin;
    while (paddedBinary.length % 4 !== 0) {
      paddedBinary = '0' + paddedBinary;
    }

    const steps = [];
    for (let i = 0; i < paddedBinary.length; i += 4) {
      const chunk = paddedBinary.substring(i, i + 4);
      const dec = parseInt(chunk, 2);
      const h = dec.toString(16).toUpperCase();
      steps.push({ chunk, h });
    }

    return (
      <div className="mt-4 p-4 bg-purple-50 rounded-lg text-sm text-purple-900 font-mono overflow-x-auto">
        <p className="font-semibold mb-2">{t.explanation}</p>
        <p className="mb-2">1. จัดกลุ่มเลขฐาน 2 ทีละ 4 บิต (จากขวาไปซ้าย):</p>
        <p className="mb-4 tracking-[0.2em]">{steps.map(s => s.chunk).join(' ')}</p>
        <p className="mb-2">2. แปลงแต่ละกลุ่มเป็นเลขฐาน 16:</p>
        <div className="flex gap-4 mb-4">
          {steps.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span>{s.chunk}</span>
              <span className="text-purple-400">↓</span>
              <span className="font-bold">{s.h}</span>
            </div>
          ))}
        </div>
        <p>3. ผลลัพธ์: <strong>{hexResult}</strong></p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-purple-200" />
            <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
          </div>
          <p className="text-purple-100 opacity-90">
            {lang === 'en' ? 'Quickly convert binary numbers to hexadecimal numbers.' : 'แปลงตัวเลขจากระบบฐานสองเป็นระบบฐานสิบหก จัดกลุ่มทีละ 4 บิตอย่างถูกต้อง'}
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{t.binaryInput}</label>
              <input
                type="text"
                value={binary}
                onChange={(e) => {
                  setBinary(e.target.value.trim());
                  setError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleConvert();
                }}
                placeholder={t.binaryPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-lg font-mono"
              />
            </div>

            <div className="hidden md:flex justify-center items-center mt-6 text-gray-400">
              <ArrowRight className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{t.result}</label>
              <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-lg font-mono h-[54px] flex items-center overflow-x-auto whitespace-nowrap">
                {hex !== null ? hex : <span className="text-gray-400">-</span>}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleConvert}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-xl transition-colors w-full md:w-auto shadow-md hover:shadow-lg"
            >
              {t.convertBtn}
            </button>
          </div>

          {hex !== null && generateExplanation(binary, hex)}
        </div>
      </div>

      <article className="mt-12 prose prose-purple max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Info className="w-6 h-6 text-purple-500" />
          การแปลงเลขฐาน 2 เป็นเลขฐาน 16 (Binary to Hexadecimal)
        </h2>
        
        <p>
          เมื่อต้องทำงานใกล้ชิดกับระบบคอมพิวเตอร์ การเขียนโปรแกรม (Programming) หรือการออกแบบระบบดิจิทัล (Digital Logic Design) เรามักจะพบกับการแสดงผลข้อมูลตัวเลขที่หลากหลาย ระบบเลขฐาน 2 (Binary) เป็นระบบพื้นฐานที่เครื่องคอมพิวเตอร์เข้าใจ ทว่าการอ่านค่าสายอักขระเลข 0 และ 1 ที่ยาวเหยียดนั้นอาจทำให้สายตามนุษย์สับสนและเกิดความผิดพลาดได้ง่าย ด้วยเหตุนี้ ระบบเลขฐาน 16 (Hexadecimal) จึงถูกนำมาใช้เพื่อย่อสายข้อมูลให้สั้นลงและอ่านง่ายขึ้น โดยที่ยังคงความสัมพันธ์เชิงคณิตศาสตร์กับระบบฐาน 2 อย่างสมบูรณ์แบบ
        </p>

        <h3>ระบบเลขฐาน 16 (Hexadecimal System) คืออะไร?</h3>
        <p>
          ระบบเลขฐาน 16 หรือที่นิยมเรียกย่อๆ ว่า Hex เป็นระบบเลขที่ประกอบด้วยสัญลักษณ์ 16 ตัว ได้แก่ ตัวเลข 0-9 (แทนค่า 0 ถึง 9) และตัวอักษรภาษาอังกฤษ A-F (แทนค่า 10 ถึง 15 ตามลำดับ) โดยมีหลักการแทนค่าดังนี้:
        </p>
        <ul>
          <li>A = 10</li>
          <li>B = 11</li>
          <li>C = 12</li>
          <li>D = 13</li>
          <li>E = 14</li>
          <li>F = 15</li>
        </ul>
        <p>
          ข้อดีอย่างหนึ่งของระบบนี้คือ เลขฐาน 16 จำนวน 1 หลัก สามารถแทนค่าของเลขฐาน 2 ได้ถึง 4 หลัก (4 บิต หรือ 1 Nibble) อย่างพอดี ซึ่งสอดคล้องกับขนาดหน่วยความจำพื้นฐานของคอมพิวเตอร์ที่เก็บข้อมูลทีละ 8 บิต (1 Byte) ทำให้เลขฐาน 16 จำนวน 2 หลัก สามารถเขียนแทน 1 Byte ได้อย่างลงตัว เช่น 11111111 ในฐาน 2 สามารถเขียนสั้นๆ ได้ว่า FF ในฐาน 16
        </p>

        <h3>วิธีการแปลงเลขฐาน 2 เป็นเลขฐาน 16</h3>
        <p>
          การแปลงจากฐาน 2 (Binary) ไปยังฐาน 16 (Hexadecimal) มีขั้นตอนที่ตรงไปตรงมาและไม่ต้องผ่านการคำนวณที่ซับซ้อน สามารถทำได้ง่ายๆ โดยอาศัยหลักการจัดกลุ่ม (Grouping) ดังต่อไปนี้:
        </p>
        <ol>
          <li>
            <strong>แบ่งกลุ่มทีละ 4 บิต:</strong> เริ่มจากบิตทางขวาสุด (Least Significant Bit) แบ่งเลขฐาน 2 ออกเป็นกลุ่มละ 4 บิต ไปทางซ้าย
          </li>
          <li>
            <strong>เติมศูนย์ (Padding):</strong> หากกลุ่มซ้ายสุดมีจำนวนบิตไม่ถึง 4 บิต ให้เติม 0 เข้าไปข้างหน้าให้ครบ 4 บิต (การเติม 0 ข้างหน้าไม่ทำให้ค่าของตัวเลขเปลี่ยนไป เหมือนกับ 05 ที่มีค่าเท่ากับ 5)
          </li>
          <li>
            <strong>แปลงทีละกลุ่ม:</strong> นำแต่ละกลุ่มที่ได้ (4 บิต) มาแปลงเป็นเลขฐาน 16 โดยเทียบตามตารางค่าประจำกลุ่ม:
            <ul>
              <li>0000 = 0, 0001 = 1, 0010 = 2, 0011 = 3</li>
              <li>0100 = 4, 0101 = 5, 0110 = 6, 0111 = 7</li>
              <li>1000 = 8, 1001 = 9, 1010 = A, 1011 = B</li>
              <li>1100 = C, 1101 = D, 1110 = E, 1111 = F</li>
            </ul>
          </li>
          <li>
            <strong>นำผลลัพธ์มาเรียงต่อกัน:</strong> เมื่อแปลงทุกกลุ่มเสร็จสิ้น นำสัญลักษณ์ฐาน 16 ที่ได้มาเรียงต่อกันจากซ้ายไปขวา ก็จะได้คำตอบสุดท้าย
          </li>
        </ol>

        <h4>ตัวอย่างที่ 1: แปลง 1010111101 (ฐาน 2) เป็นเลขฐาน 16</h4>
        <p>
          เริ่มจัดกลุ่มทีละ 4 บิตจากขวาไปซ้าย:<br/>
          (10) (1011) (1101)<br/>
          เติม 0 ข้างหน้ากลุ่มแรกให้ครบ 4 บิต:<br/>
          (0010) (1011) (1101)<br/>
          เทียบค่าทีละกลุ่ม:<br/>
          - 0010 = 2<br/>
          - 1011 = B (11 ในฐาน 10)<br/>
          - 1101 = D (13 ในฐาน 10)<br/>
          นำมาต่อกันจะได้คำตอบคือ <strong>2BD</strong>
        </p>

        <h3>ประยุกต์ใช้ในวงการเทคโนโลยี</h3>
        <p>
          การแปลงระหว่างฐาน 2 และฐาน 16 ถูกใช้อย่างแพร่หลายในโลกของไอที เช่น การระบุรหัสสี (Color Code) ในการทำเว็บไซต์ด้วย HTML และ CSS (เช่น #FFFFFF แทนสีขาว, #FF0000 แทนสีแดง), การแสดงผลตำแหน่งหน่วยความจำ (Memory Address) เมื่อเกิดข้อผิดพลาด (Blue Screen of Death ใน Windows มักจะโชว์ Memory Dump เป็นฐาน 16), รวมไปถึงการเข้ารหัสและถอดรหัสข้อมูล เครื่องมือบนหน้านี้จะช่วยให้การทำงานกับระบบตัวเลขที่ดูยุ่งยากกลายเป็นเรื่องง่าย ประหยัดเวลา และมั่นใจได้ในความถูกต้อง
        </p>
      </article>
    </div>
  );
}

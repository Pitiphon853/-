import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, AlertTriangle } from 'lucide-react';

export default function Base2To10({ lang }: any) {
  const [binary, setBinary] = useState('');
  const [decimal, setDecimal] = useState<number | null>(null);
  const [error, setError] = useState('');

  const t = {
    title: lang === 'en' ? 'Binary to Decimal Converter' : 'เครื่องมือคำนวณแปลงเลขฐาน 2 เป็นเลขฐาน 10',
    binaryInput: lang === 'en' ? 'Binary Number (Base 2)' : 'กรอกเลขฐาน 2',
    binaryPlaceholder: lang === 'en' ? 'e.g. 101011' : 'เช่น 101011',
    convertBtn: lang === 'en' ? 'Convert' : 'แปลงเป็นเลขฐาน 10',
    result: lang === 'en' ? 'Decimal Result (Base 10)' : 'ผลลัพธ์เลขฐาน 10',
    invalidBinary: lang === 'en' ? 'Invalid binary number. Please enter only 0 and 1.' : 'รูปแบบเลขฐาน 2 ไม่ถูกต้อง กรุณากรอกเฉพาะ 0 และ 1 เท่านั้น',
    explanation: lang === 'en' ? 'Calculation Method:' : 'วิธีคำนวณ:',
  };

  const handleConvert = () => {
    if (!binary) {
      setDecimal(null);
      setError('');
      return;
    }

    // Validate binary string
    if (!/^[01]+$/.test(binary)) {
      setError(t.invalidBinary);
      setDecimal(null);
      return;
    }

    setError('');
    const dec = parseInt(binary, 2);
    setDecimal(dec);
  };

  const generateExplanation = (bin: string) => {
    if (!bin) return null;
    const parts = [];
    const len = bin.length;
    let sumString = '';
    
    for (let i = 0; i < len; i++) {
      const bit = bin[i];
      const power = len - 1 - i;
      parts.push(`(${bit} × 2^${power})`);
    }

    return (
      <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-800 font-mono overflow-x-auto">
        <p className="font-semibold mb-2">{t.explanation}</p>
        <p>{bin}₂ = {parts.join(' + ')}</p>
        <p className="mt-2">= {decimal}₁₀</p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-blue-200" />
            <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
          </div>
          <p className="text-blue-100 opacity-90">
            {lang === 'en' ? 'Quickly convert binary numbers to decimal numbers.' : 'แปลงตัวเลขจากระบบฐานสองเป็นระบบฐานสิบได้อย่างรวดเร็วและแม่นยำ'}
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg font-mono"
              />
            </div>

            <div className="hidden md:flex justify-center items-center mt-6 text-gray-400">
              <ArrowRight className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{t.result}</label>
              <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-lg font-mono h-[54px] flex items-center overflow-x-auto whitespace-nowrap">
                {decimal !== null ? decimal : <span className="text-gray-400">-</span>}
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-colors w-full md:w-auto shadow-md hover:shadow-lg"
            >
              {t.convertBtn}
            </button>
          </div>

          {decimal !== null && generateExplanation(binary)}
        </div>
      </div>

      <article className="mt-12 prose prose-blue max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Info className="w-6 h-6 text-blue-500" />
          การแปลงเลขฐาน 2 เป็นเลขฐาน 10 (Binary to Decimal)
        </h2>
        
        <p>
          ระบบเลขฐาน 2 (Binary numeral system) และระบบเลขฐาน 10 (Decimal numeral system) เป็นระบบตัวเลขที่มีความสำคัญอย่างมาก โดยเฉพาะในโลกของวิทยาการคอมพิวเตอร์ เทคโนโลยีสารสนเทศ และการใช้ชีวิตประจำวัน มนุษย์เราคุ้นเคยกับระบบเลขฐาน 10 ซึ่งประกอบด้วยตัวเลข 0 ถึง 9 ในขณะที่คอมพิวเตอร์และอุปกรณ์อิเล็กทรอนิกส์ดิจิทัลจะทำงานโดยอาศัยระบบเลขฐาน 2 ซึ่งประกอบด้วยตัวเลขเพียงสองตัวคือ 0 และ 1 (แทนสถานะปิดและเปิด หรือเท็จและจริง) การทำความเข้าใจวิธีการแปลงเลขฐาน 2 เป็นเลขฐาน 10 จึงเป็นพื้นฐานที่สำคัญสำหรับนักเรียน นักศึกษา โปรแกรมเมอร์ วิศวกร และผู้ที่สนใจในศาสตร์ของคอมพิวเตอร์
        </p>

        <h3>ระบบเลขฐาน 10 (Decimal System) คืออะไร?</h3>
        <p>
          เลขฐาน 10 เป็นระบบที่ใช้กันทั่วโลกในชีวิตประจำวัน ประกอบด้วยตัวเลข 10 ตัว ได้แก่ 0, 1, 2, 3, 4, 5, 6, 7, 8 และ 9 แต่ละหลักในจำนวนใดๆ จะมีค่าประจำหลักที่เป็นเลขยกกำลังของ 10 โดยเริ่มจากหลักหน่วยคือ 10^0, หลักสิบคือ 10^1, หลักร้อยคือ 10^2 ตามลำดับจากขวาไปซ้าย
        </p>

        <h3>ระบบเลขฐาน 2 (Binary System) คืออะไร?</h3>
        <p>
          เลขฐาน 2 เป็นระบบพื้นฐานที่วงจรตรรกะในคอมพิวเตอร์ใช้ในการประมวลผลข้อมูล ตัวเลขในระบบนี้มีเพียง 0 กับ 1 เท่านั้น โดยแต่ละหลักเรียกว่า "บิต" (Bit ซึ่งย่อมาจาก Binary Digit) ค่าประจำหลักในเลขฐาน 2 จะเป็นเลขยกกำลังของ 2 เริ่มจากขวาสุดคือ 2^0 (มีค่าเท่ากับ 1), 2^1 (มีค่าเท่ากับ 2), 2^2 (มีค่าเท่ากับ 4), 2^3 (มีค่าเท่ากับ 8) และเพิ่มขึ้นเรื่อยๆ
        </p>

        <h3>หลักการคำนวณและวิธีแปลงเลขฐาน 2 เป็นเลขฐาน 10</h3>
        <p>
          การแปลงจากเลขฐาน 2 เป็นเลขฐาน 10 นั้น สามารถทำได้อย่างเป็นระบบโดยอาศัยคณิตศาสตร์พื้นฐานเกี่ยวกับการบวกและการคูณ มีขั้นตอนดังต่อไปนี้:
        </p>
        <ol>
          <li><strong>ระบุค่าประจำหลัก:</strong> เขียนเลขฐาน 2 ที่ต้องการแปลง แล้วกำหนดค่าประจำหลักให้กับตัวเลขแต่ละตัว โดยเริ่มจากบิตขวาสุด (Least Significant Bit หรือ LSB) ให้มีค่าประจำหลักคือ 2^0 จากนั้นถัดไปทางซ้ายจะเป็น 2^1, 2^2, 2^3 ไปเรื่อยๆ</li>
          <li><strong>คูณด้วยค่าประจำหลัก:</strong> นำตัวเลขในแต่ละหลัก (ซึ่งมีแค่ 0 หรือ 1) ไปคูณกับค่าประจำหลัก (2^n) ของตำแหน่งนั้นๆ</li>
          <li><strong>หาผลรวม:</strong> นำผลคูณที่ได้จากทุกหลักมาบวกเข้าด้วยกัน ผลรวมที่ได้ก็คือตัวเลขในระบบฐาน 10</li>
        </ol>

        <h4>ตัวอย่างการคำนวณ: แปลง 10110 (ฐาน 2) เป็นเลขฐาน 10</h4>
        <p>
          จากตัวเลข 10110 เราจะทำการกระจายค่าประจำหลักจากขวาไปซ้าย ได้ดังนี้:
        </p>
        <ul>
          <li>หลักที่ 1 (ขวาสุด): ตัวเลข 0 &rarr; 0 × 2^0 = 0 × 1 = 0</li>
          <li>หลักที่ 2: ตัวเลข 1 &rarr; 1 × 2^1 = 1 × 2 = 2</li>
          <li>หลักที่ 3: ตัวเลข 1 &rarr; 1 × 2^2 = 1 × 4 = 4</li>
          <li>หลักที่ 4: ตัวเลข 0 &rarr; 0 × 2^3 = 0 × 8 = 0</li>
          <li>หลักที่ 5 (ซ้ายสุด): ตัวเลข 1 &rarr; 1 × 2^4 = 1 × 16 = 16</li>
        </ul>
        <p>
          เมื่อนำผลคูณทั้งหมดมาบวกกัน: 16 + 0 + 4 + 2 + 0 = 22<br/>
          ดังนั้น 10110 ในระบบฐาน 2 มีค่าเท่ากับ 22 ในระบบฐาน 10
        </p>

        <h3>ความสำคัญของการแปลงเลขฐาน 2</h3>
        <p>
          ในยุคดิจิทัลที่ข้อมูลทุกอย่างถูกแปลงให้อยู่ในรูปของรหัสฐาน 2 (Binary Code) ไม่ว่าจะเป็นข้อความ ภาพ เสียง หรือวิดีโอ การเข้าใจระบบฐาน 2 ช่วยให้เราเข้าใจหลักการทำงานของหน่วยความจำ การจัดเก็บไฟล์ ไปจนถึงการสื่อสารข้อมูลผ่านเครือข่ายอินเทอร์เน็ต เครื่องมือคำนวณแปลงเลขฐาน 2 เป็นเลขฐาน 10 นี้ ถูกออกแบบมาเพื่อให้ผู้ใช้งานสามารถตรวจสอบค่า ทำการบ้าน หรือนำไปอ้างอิงในการเขียนโปรแกรมได้อย่างสะดวกรวดเร็ว โดยไม่ต้องมานั่งคำนวณด้วยมือซึ่งอาจเกิดข้อผิดพลาดได้ง่าย
        </p>
      </article>
    </div>
  );
}

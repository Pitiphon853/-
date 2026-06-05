import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, AlertTriangle } from 'lucide-react';

export default function Base16To10({ lang }: any) {
  const [hex, setHex] = useState('');
  const [decimal, setDecimal] = useState<string | null>(null);
  const [error, setError] = useState('');

  const t = {
    title: lang === 'en' ? 'Hexadecimal to Decimal Converter' : 'เครื่องมือคำนวณแปลงเลขฐาน 16 เป็นเลขฐาน 10',
    hexInput: lang === 'en' ? 'Hexadecimal Number (Base 16)' : 'กรอกเลขฐาน 16',
    hexPlaceholder: lang === 'en' ? 'e.g. 1A3F' : 'เช่น 1A3F',
    convertBtn: lang === 'en' ? 'Convert' : 'แปลงเป็นเลขฐาน 10',
    result: lang === 'en' ? 'Decimal Result (Base 10)' : 'ผลลัพธ์เลขฐาน 10',
    invalidHex: lang === 'en' ? 'Invalid hexadecimal number. Please enter only 0-9 and A-F.' : 'รูปแบบเลขฐาน 16 ไม่ถูกต้อง กรุณากรอกเฉพาะ 0-9 และ A-F เท่านั้น',
    explanation: lang === 'en' ? 'Calculation Steps:' : 'วิธีการคำนวณ:',
  };

  const handleConvert = () => {
    if (!hex) {
      setDecimal(null);
      setError('');
      return;
    }

    const cleanHex = hex.trim().toUpperCase();
    if (!/^[0-9A-F]+$/.test(cleanHex)) {
      setError(t.invalidHex);
      setDecimal(null);
      return;
    }

    setError('');
    // Use BigInt to support large hexadecimal numbers accurately
    try {
      const dec = BigInt('0x' + cleanHex).toString(10);
      setDecimal(dec);
    } catch (e) {
      setError('Number is too large or invalid.');
    }
  };

  const generateExplanation = (hexStr: string) => {
    if (!hexStr || !decimal) return null;
    const cleanHex = hexStr.trim().toUpperCase();
    const len = cleanHex.length;
    const parts = [];

    const hexMap: Record<string, string> = {
      A: '10', B: '11', C: '12', D: '13', E: '14', F: '15'
    };

    for (let i = 0; i < len; i++) {
      const char = cleanHex[i];
      const val = hexMap[char] || char;
      const power = len - 1 - i;
      parts.push(`(${val} × 16^${power})`);
    }

    return (
      <div className="mt-4 p-4 bg-emerald-50 rounded-lg text-sm text-emerald-900 font-mono overflow-x-auto">
        <p className="font-semibold mb-2">{t.explanation}</p>
        <p className="mb-2">{cleanHex}₁₆ = {parts.join(' + ')}</p>
        <p className="mt-2 text-lg font-bold">= {decimal}₁₀</p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-emerald-200" />
            <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
          </div>
          <p className="text-emerald-100 opacity-90">
            {lang === 'en' ? 'Quickly convert hexadecimal numbers to decimal numbers.' : 'แปลงตัวเลขจากระบบฐานสิบหก (Hexadecimal) เป็นระบบฐานสิบ (Decimal) ได้อย่างแม่นยำ'}
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{t.hexInput}</label>
              <input
                type="text"
                value={hex}
                onChange={(e) => {
                  setHex(e.target.value.trim().toUpperCase());
                  setError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleConvert();
                }}
                placeholder={t.hexPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg font-mono uppercase"
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
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-xl transition-colors w-full md:w-auto shadow-md hover:shadow-lg"
            >
              {t.convertBtn}
            </button>
          </div>

          {decimal !== null && generateExplanation(hex)}
        </div>
      </div>

      <article className="mt-12 prose prose-emerald max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Info className="w-6 h-6 text-emerald-500" />
          การแปลงเลขฐาน 16 เป็นเลขฐาน 10 (Hexadecimal to Decimal)
        </h2>
        
        <p>
          ระบบเลขฐาน 16 (Hexadecimal) และระบบเลขฐาน 10 (Decimal) เป็นสองระบบตัวเลขที่มีบทบาทสำคัญอย่างมากในชีวิตประจำวันและการทำงานร่วมกับเทคโนโลยีสารสนเทศ สำหรับมนุษย์แล้ว ระบบเลขฐาน 10 เป็นสิ่งที่เราคุ้นเคยกันมาตั้งแต่เด็ก แต่เมื่อเราก้าวเข้าสู่โลกของคอมพิวเตอร์และการเขียนโปรแกรม เรามักจะพบระบบเลขฐาน 16 อยู่บ่อยครั้ง เช่น การระบุรหัสสีบนหน้าเว็บไซต์ ตำแหน่งของหน่วยความจำ หรือแม้กระทั่งรหัสข้อผิดพลาดของระบบปฏิบัติการ ดังนั้น การมีความรู้และความเข้าใจในการแปลงเลขฐาน 16 กลับมาเป็นเลขฐาน 10 ที่มนุษย์ทั่วไปสามารถเข้าใจได้ จึงเป็นทักษะพื้นฐานที่มีประโยชน์อย่างยิ่ง
        </p>

        <h3>ทบทวนระบบเลขฐาน 16 และ 10</h3>
        <p>
          <strong>ระบบเลขฐาน 10 (Decimal System):</strong> เป็นระบบที่มีสัญลักษณ์แทนตัวเลขทั้งหมด 10 ตัว คือ 0, 1, 2, 3, 4, 5, 6, 7, 8 และ 9 หลักการคำนวณจะใช้ฐานเป็น 10 โดยมีค่าประจำหลักเป็นเลขยกกำลังของ 10 (เช่น หลักหน่วยคือ 10^0, หลักสิบคือ 10^1)
        </p>
        <p>
          <strong>ระบบเลขฐาน 16 (Hexadecimal System):</strong> เป็นระบบที่มีสัญลักษณ์ทั้งหมด 16 ตัว โดยยืมตัวเลข 0-9 มาใช้เหมือนระบบฐาน 10 และเพิ่มเติมด้วยตัวอักษรภาษาอังกฤษ A ถึง F เพื่อแทนค่าตั้งแต่ 10 ถึง 15 ตามลำดับ ดังนี้:
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <li>A = 10</li>
          <li>B = 11</li>
          <li>C = 12</li>
          <li>D = 13</li>
          <li>E = 14</li>
          <li>F = 15</li>
        </ul>

        <h3>ขั้นตอนและวิธีแปลงเลขฐาน 16 เป็นเลขฐาน 10</h3>
        <p>
          หลักการแปลงเลขฐาน 16 ไปเป็นเลขฐาน 10 นั้น คล้ายคลึงกับการแปลงเลขฐาน 2 เพียงแต่เราเปลี่ยนตัวคูณจากฐาน 2 เป็นฐาน 16 โดยอาศัยวิธีการ <strong>การคูณด้วยค่าประจำหลัก</strong> ซึ่งมีขั้นตอนง่ายๆ ดังนี้:
        </p>
        <ol>
          <li><strong>แยกแต่ละหลัก:</strong> นำเลขฐาน 16 มาแยกออกเป็นตัวอักษรหรือตัวเลขในแต่ละหลัก</li>
          <li><strong>แปลงตัวอักษรเป็นตัวเลข:</strong> หากพบตัวอักษร A-F ให้แปลงเป็นค่าตัวเลขฐาน 10 (เช่น หากพบ C ให้แทนค่าด้วย 12)</li>
          <li><strong>หาค่าประจำหลัก:</strong> กำหนดค่าของเลขยกกำลังของ 16 ให้แต่ละหลัก โดยเริ่มจากหลักขวาสุดจะเป็น 16^0 (มีค่า = 1), หลักถัดมาทางซ้ายเป็น 16^1 (มีค่า = 16), 16^2 (มีค่า = 256) ต่อไปเรื่อยๆ</li>
          <li><strong>คูณและบวก:</strong> นำตัวเลขของแต่ละหลักมาคูณกับค่าประจำหลัก แล้วนำผลลัพธ์ทั้งหมดมาบวกกัน ผลรวมที่ได้จะเป็นคำตอบในระบบเลขฐาน 10</li>
        </ol>

        <h4>ตัวอย่างการคำนวณ: แปลง 2A5 (ฐาน 16) เป็นเลขฐาน 10</h4>
        <p>
          ตัวเลขคือ 2A5 (แบ่งเป็น 3 หลัก โดยเริ่มนับตำแหน่งจากขวาไปซ้าย ตำแหน่ง 0, 1, 2)
        </p>
        <ul>
          <li><strong>หลักที่ 1 (ขวาสุด, ตำแหน่ง 0):</strong> เลข 5 <br/> 
            5 × 16^0 = 5 × 1 = 5
          </li>
          <li><strong>หลักที่ 2 (ตำแหน่ง 1):</strong> ตัวอักษร A (มีค่า = 10) <br/> 
            10 × 16^1 = 10 × 16 = 160
          </li>
          <li><strong>หลักที่ 3 (ซ้ายสุด, ตำแหน่ง 2):</strong> เลข 2 <br/> 
            2 × 16^2 = 2 × 256 = 512
          </li>
        </ul>
        <p>
          ผลรวมทั้งหมด: 512 + 160 + 5 = <strong>677</strong><br/>
          สรุปว่า 2A5 ในระบบฐาน 16 จะมีค่าเท่ากับ 677 ในระบบฐาน 10
        </p>

        <h3>ทำไมเราถึงต้องใช้เครื่องมือช่วยแปลงเลขฐาน?</h3>
        <p>
          แม้ว่าหลักการคำนวณจะดูตรงไปตรงมา แต่เมื่อเราต้องรับมือกับเลขฐาน 16 ที่มีหลายหลักหรือมีจำนวนมาก การคำนวณด้วยตนเองอาจทำให้เกิดความล่าช้าและมีโอกาสผิดพลาดสูง โดยเฉพาะการยกกำลังของ 16 ที่มีค่าเพิ่มขึ้นอย่างรวดเร็ว (16, 256, 4096, 65536, ...) การใช้เครื่องมือคำนวณ (Calculator) ของเราจะช่วยลดระยะเวลา และยังแสดงวิธีทำทีละขั้นตอนอย่างละเอียด เพื่อเป็นแนวทางให้นักเรียน นักศึกษา และนักพัฒนาซอฟต์แวร์สามารถทบทวนและทำความเข้าใจได้อย่างถูกต้องแม่นยำ
        </p>
      </article>
    </div>
  );
}

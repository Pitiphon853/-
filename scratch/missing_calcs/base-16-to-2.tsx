import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, AlertTriangle } from 'lucide-react';

export default function Base16To2({ lang }: any) {
  const [hex, setHex] = useState('');
  const [binary, setBinary] = useState<string | null>(null);
  const [error, setError] = useState('');

  const t = {
    title: lang === 'en' ? 'Hexadecimal to Binary Converter' : 'เครื่องมือคำนวณแปลงเลขฐาน 16 เป็นเลขฐาน 2',
    hexInput: lang === 'en' ? 'Hexadecimal Number (Base 16)' : 'กรอกเลขฐาน 16',
    hexPlaceholder: lang === 'en' ? 'e.g. F4' : 'เช่น F4',
    convertBtn: lang === 'en' ? 'Convert' : 'แปลงเป็นเลขฐาน 2',
    result: lang === 'en' ? 'Binary Result (Base 2)' : 'ผลลัพธ์เลขฐาน 2',
    invalidHex: lang === 'en' ? 'Invalid hexadecimal number. Please enter only 0-9 and A-F.' : 'รูปแบบเลขฐาน 16 ไม่ถูกต้อง กรุณากรอกเฉพาะ 0-9 และ A-F เท่านั้น',
    explanation: lang === 'en' ? 'Calculation Steps:' : 'ขั้นตอนการแปลง:',
  };

  const hexToBinMap: Record<string, string> = {
    '0': '0000', '1': '0001', '2': '0010', '3': '0011',
    '4': '0100', '5': '0101', '6': '0110', '7': '0111',
    '8': '1000', '9': '1001', 'A': '1010', 'B': '1011',
    'C': '1100', 'D': '1101', 'E': '1110', 'F': '1111'
  };

  const handleConvert = () => {
    if (!hex) {
      setBinary(null);
      setError('');
      return;
    }

    const cleanHex = hex.trim().toUpperCase();
    if (!/^[0-9A-F]+$/.test(cleanHex)) {
      setError(t.invalidHex);
      setBinary(null);
      return;
    }

    setError('');
    let binResult = '';
    for (let i = 0; i < cleanHex.length; i++) {
      binResult += hexToBinMap[cleanHex[i]];
    }
    // Remove leading zeros if not all zeros
    binResult = binResult.replace(/^0+/, '');
    if (binResult === '') binResult = '0';
    
    setBinary(binResult);
  };

  const generateExplanation = (hexStr: string) => {
    if (!hexStr || !binary) return null;
    const cleanHex = hexStr.trim().toUpperCase();
    
    const steps = [];
    for (let i = 0; i < cleanHex.length; i++) {
      const char = cleanHex[i];
      steps.push({ hexChar: char, binStr: hexToBinMap[char] });
    }

    return (
      <div className="mt-4 p-4 bg-orange-50 rounded-lg text-sm text-orange-900 font-mono overflow-x-auto">
        <p className="font-semibold mb-2">{t.explanation}</p>
        <p className="mb-2">1. แยกเลขฐาน 16 ทีละตัวอักษร และแปลงเป็นเลขฐาน 2 ขนาด 4 บิต:</p>
        <div className="flex gap-4 mb-4 flex-wrap">
          {steps.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="font-bold">{s.hexChar}</span>
              <span className="text-orange-400">↓</span>
              <span>{s.binStr}</span>
            </div>
          ))}
        </div>
        <p className="mb-2">2. นำผลลัพธ์มาเรียงต่อกัน:</p>
        <p className="mb-2 tracking-widest">{steps.map(s => s.binStr).join(' ')}</p>
        <p>3. ตัดเลข 0 ข้างหน้าออก (ถ้ามี) ผลลัพธ์: <strong>{binary}</strong></p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-orange-200" />
            <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
          </div>
          <p className="text-orange-100 opacity-90">
            {lang === 'en' ? 'Quickly convert hexadecimal numbers to binary numbers.' : 'แปลงตัวเลขจากระบบฐานสิบหกเป็นระบบฐานสองทีละหลักอย่างถูกต้องและเข้าใจง่าย'}
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-lg font-mono uppercase"
              />
            </div>

            <div className="hidden md:flex justify-center items-center mt-6 text-gray-400">
              <ArrowRight className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{t.result}</label>
              <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-lg font-mono h-[54px] flex items-center overflow-x-auto whitespace-nowrap">
                {binary !== null ? binary : <span className="text-gray-400">-</span>}
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
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-8 rounded-xl transition-colors w-full md:w-auto shadow-md hover:shadow-lg"
            >
              {t.convertBtn}
            </button>
          </div>

          {binary !== null && generateExplanation(hex)}
        </div>
      </div>

      <article className="mt-12 prose prose-orange max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Info className="w-6 h-6 text-orange-500" />
          การแปลงเลขฐาน 16 เป็นเลขฐาน 2 (Hexadecimal to Binary)
        </h2>
        
        <p>
          การสื่อสารระหว่างโปรแกรมเมอร์และสถาปัตยกรรมของคอมพิวเตอร์ (Computer Architecture) มักจะมีความเกี่ยวข้องกับระบบตัวเลขหลายฐานเข้าด้วยกัน โดยเฉพาะอย่างยิ่งระหว่างระบบเลขฐาน 16 (Hexadecimal) และระบบเลขฐาน 2 (Binary) คอมพิวเตอร์ประมวลผลคำสั่งด้วยสัญญาณทางไฟฟ้าที่ถูกแปลเป็น 0 และ 1 (เลขฐาน 2) แต่การอ่านข้อมูลจำนวนมากในรูปแบบ 0 และ 1 นั้น เป็นเรื่องยากสำหรับมนุษย์ จึงมีการใช้เลขฐาน 16 มาช่วยรวบตึงข้อมูลให้กระชับขึ้น การแปลงกลับจากฐาน 16 ไปยังฐาน 2 จึงเป็นพื้นฐานที่สำคัญในด้านวิทยาการคอมพิวเตอร์ เครือข่าย (Networking) และการวิเคราะห์ข้อมูลความปลอดภัย (Cyber Security)
        </p>

        <h3>ความสัมพันธ์อันแน่นแฟ้นระหว่างฐาน 16 และฐาน 2</h3>
        <p>
          ระบบเลขฐาน 16 ประกอบด้วยตัวเลข 0-9 และตัวอักษร A-F ส่วนระบบเลขฐาน 2 ประกอบด้วย 0 และ 1 จุดเด่นที่ทำให้สองระบบนี้ทำงานร่วมกันได้อย่างสมบูรณ์คือ <strong>เลขฐาน 16 จำนวน 1 หลัก จะเทียบเท่ากับเลขฐาน 2 จำนวน 4 บิต (4 bits = 1 Nibble) อย่างพอดิบพอดี</strong> เนื่องจาก 2^4 = 16 นั่นเอง ทำให้เราไม่ต้องใช้วิธีหารสั้นหรือการคำนวณเลขที่ซับซ้อน แต่สามารถใช้ "การเทียบตาราง" เพื่อหาคำตอบได้ทันที
        </p>

        <h3>ตารางแปลงค่าจากฐาน 16 เป็นฐาน 2 (Hex to Binary Table)</h3>
        <p>
          เพื่อให้ง่ายต่อความเข้าใจ เราสามารถพึ่งพาตารางเทียบค่าเบื้องต้นได้ดังต่อไปนี้:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm border-collapse border border-gray-200 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ฐาน 16 (Hex)</th>
                <th className="border border-gray-300 px-4 py-2">ฐาน 2 (Binary)</th>
                <th className="border border-gray-300 px-4 py-2">ฐาน 16 (Hex)</th>
                <th className="border border-gray-300 px-4 py-2">ฐาน 2 (Binary)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">0</td><td className="border border-gray-300 px-4 py-2">0000</td>
                <td className="border border-gray-300 px-4 py-2">8</td><td className="border border-gray-300 px-4 py-2">1000</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">1</td><td className="border border-gray-300 px-4 py-2">0001</td>
                <td className="border border-gray-300 px-4 py-2">9</td><td className="border border-gray-300 px-4 py-2">1001</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2</td><td className="border border-gray-300 px-4 py-2">0010</td>
                <td className="border border-gray-300 px-4 py-2">A</td><td className="border border-gray-300 px-4 py-2">1010</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">3</td><td className="border border-gray-300 px-4 py-2">0011</td>
                <td className="border border-gray-300 px-4 py-2">B</td><td className="border border-gray-300 px-4 py-2">1011</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">4</td><td className="border border-gray-300 px-4 py-2">0100</td>
                <td className="border border-gray-300 px-4 py-2">C</td><td className="border border-gray-300 px-4 py-2">1100</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">5</td><td className="border border-gray-300 px-4 py-2">0101</td>
                <td className="border border-gray-300 px-4 py-2">D</td><td className="border border-gray-300 px-4 py-2">1101</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">0110</td>
                <td className="border border-gray-300 px-4 py-2">E</td><td className="border border-gray-300 px-4 py-2">1110</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">7</td><td className="border border-gray-300 px-4 py-2">0111</td>
                <td className="border border-gray-300 px-4 py-2">F</td><td className="border border-gray-300 px-4 py-2">1111</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>ขั้นตอนการแปลงอย่างง่าย (Step-by-Step)</h3>
        <ol>
          <li><strong>แยกแต่ละหลัก:</strong> ดึงตัวเลขและตัวอักษรในเลขฐาน 16 ออกมาทีละหลัก</li>
          <li><strong>แปลงเป็นฐาน 2 กลุ่มละ 4 บิต:</strong> ใช้ตารางด้านบน เพื่อหาค่าเลขฐาน 2 ให้กับแต่ละหลักที่แยกออกมา โดยต้องเขียนให้ครบ 4 บิตเสมอ (เช่น 3 ต้องเขียนเป็น 0011 ห้ามเขียนแค่ 11)</li>
          <li><strong>นำมาเรียงต่อกัน:</strong> นำกลุ่มบิตที่แปลงแล้วมาต่อกันเป็นสายเดียว (String) จากซ้ายไปขวา</li>
          <li><strong>ลบศูนย์ข้างหน้า:</strong> ในกรณีที่กลุ่มซ้ายสุดมีตัวเลข 0 นำหน้า เราสามารถตัด 0 ทางซ้ายสุดออกได้ (เหมือน 0101 มีค่าเท่ากับ 101) เพื่อให้ได้รูปแบบที่กระชับและถูกต้องตามหลักคณิตศาสตร์</li>
        </ol>

        <h4>ตัวอย่างการคำนวณ: แปลง 3B7 (ฐาน 16) เป็นเลขฐาน 2</h4>
        <p>
          ทำการแยกทีละหลัก และแปลงตามตาราง:<br/>
          - 3 = 0011<br/>
          - B = 1011<br/>
          - 7 = 0111
        </p>
        <p>
          นำมาเรียงต่อกัน: 0011 1011 0111<br/>
          ลบศูนย์ข้างหน้า: 1110110111<br/>
          ดังนั้น 3B7 ในระบบฐาน 16 มีค่าเท่ากับ <strong>1110110111</strong> ในระบบฐาน 2
        </p>

        <h3>สรุป</h3>
        <p>
          การใช้งานเครื่องคำนวณของเราจะช่วยให้กระบวนการแปลงเลขฐานนี้เป็นเรื่องรวดเร็วและไม่มีข้อผิดพลาด เหมาะสำหรับทั้งนักเรียนที่กำลังเรียนรู้วิชาระบบดิจิทัล หรือโปรแกรมเมอร์ที่ต้องการตรวจสอบโค้ดอย่างรวดเร็ว ด้วยฟังก์ชันการแปลงพร้อมขั้นตอนที่แสดงให้เห็นอย่างละเอียด จะช่วยเสริมสร้างความเข้าใจให้ผู้ใช้งานได้มากยิ่งขึ้น
        </p>
      </article>
    </div>
  );
}

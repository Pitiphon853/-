import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function DecimalToScientificNotation({ lang }: any) {
  const [inputVal, setInputVal] = useState<string>('');
  const [sciNote, setSciNote] = useState<{ base: string, exponent: string } | null>(null);

  const calculate = () => {
    const val = parseFloat(inputVal);
    if (!isNaN(val) && val !== 0) {
      const exponent = Math.floor(Math.log10(Math.abs(val)));
      const base = val / Math.pow(10, exponent);
      
      // Handle floating point precision issues nicely (e.g. 1.2000000000000002)
      // Limit to a reasonable precision, but keep it clean
      const cleanBase = parseFloat(base.toFixed(10)).toString();
      
      setSciNote({
        base: cleanBase,
        exponent: exponent.toString()
      });
    } else if (val === 0) {
      setSciNote({
        base: "0",
        exponent: "0"
      });
    } else {
      setSciNote(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-8">
      <div className="flex items-center space-x-4 mb-6">
        <Calculator className="w-8 h-8 text-teal-600" />
        <h1 className="text-2xl font-bold text-gray-800">เครื่องมือแปลงตัวเลขปกติเป็นสัญกรณ์วิทยาศาสตร์</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ระบุตัวเลขปกติ (Decimal Number)</label>
            <input
              type="number"
              step="any"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="เช่น 123000 หรือ 0.00045"
            />
          </div>
          <button
            onClick={calculate}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            แปลงเป็นสัญกรณ์วิทยาศาสตร์
          </button>
        </div>

        <div className="bg-teal-50 p-6 rounded-xl border border-teal-100 flex flex-col items-center justify-center min-h-[160px]">
          {sciNote ? (
            <div className="text-center">
              <p className="text-sm text-teal-600 mb-3">ผลลัพธ์ (สัญกรณ์วิทยาศาสตร์)</p>
              <div className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-2 flex-wrap justify-center">
                <span>{sciNote.base}</span>
                <span>×</span>
                <span>10<sup>{sciNote.exponent}</sup></span>
              </div>
              <p className="mt-4 text-xs text-gray-500 font-mono bg-white px-2 py-1 rounded border">
                {sciNote.base}e{sciNote.exponent}
              </p>
            </div>
          ) : (
            <p className="text-gray-400 italic">กรอกตัวเลขเพื่อดูผลลัพธ์</p>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-slate max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">การแปลงตัวเลขปกติเป็นสัญกรณ์วิทยาศาสตร์</h2>
        <p>
          สัญกรณ์วิทยาศาสตร์ (Scientific Notation) เป็นรูปแบบการเขียนตัวเลขทางคณิตศาสตร์ที่ช่วยให้เราสามารถจัดการกับตัวเลขที่มีขนาดใหญ่มากๆ หรือมีขนาดเล็กมากๆ ได้อย่างสะดวกและเป็นระเบียบมากขึ้น ซึ่งมีประโยชน์อย่างยิ่งในการเรียนวิทยาศาสตร์ ฟิสิกส์ เคมี และการคำนวณทางวิศวกรรม
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">รูปแบบของสัญกรณ์วิทยาศาสตร์</h3>
        <p>
          ตัวเลขที่อยู่ในรูปสัญกรณ์วิทยาศาสตร์จะเขียนอยู่ในรูปของการคูณกันระหว่าง <strong>a × 10<sup>n</sup></strong> โดยมีเงื่อนไขดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>a (สัมประสิทธิ์):</strong> ต้องเป็นตัวเลขตั้งแต่ 1 ขึ้นไป แต่ต้องน้อยกว่า 10 (1 ≤ |a| &lt; 10)</li>
          <li><strong>n (เลขชี้กำลัง):</strong> เป็นจำนวนเต็ม (บวก ลบ หรือศูนย์)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีการแปลงตัวเลขปกติเป็นสัญกรณ์วิทยาศาสตร์ด้วยตนเอง</h3>
        <p>
          หลักการง่ายๆ ในการแปลงตัวเลขธรรมดาให้กลายเป็นสัญกรณ์วิทยาศาสตร์ คือการ <strong>"เลื่อนจุดทศนิยม"</strong> ให้ตัวเลขที่อยู่หน้าจุดทศนิยมมีเพียงหลักเดียว (และต้องไม่ใช่เลขศูนย์)
        </p>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">1. สำหรับตัวเลขที่มากกว่าหรือเท่ากับ 10 (ตัวเลขขนาดใหญ่)</h4>
        <p>
          ให้เลื่อนจุดทศนิยมไปทาง <strong>ซ้ายมือ</strong> จนกว่าจะเหลือตัวเลขหน้าจุดทศนิยมเพียง 1 ตัว 
          <br/>- จำนวนครั้งที่เลื่อนจุดทศนิยมไปทางซ้าย จะกลายมาเป็น <strong>เลขชี้กำลัง (n) ที่เป็นบวก</strong>
        </p>
        <div className="bg-gray-50 p-4 rounded-lg border my-3">
          <strong>ตัวอย่าง: 1,250,000</strong>
          <br/>- เลื่อนจุดทศนิยมไปทางซ้าย 6 ตำแหน่ง จะได้ตัวเลขใหม่คือ 1.25
          <br/>- เนื่องจากเลื่อนไปทางซ้าย 6 ตำแหน่ง เลขชี้กำลังคือ 6
          <br/>- ผลลัพธ์: <strong>1.25 × 10<sup>6</sup></strong>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">2. สำหรับตัวเลขที่น้อยกว่า 1 (ตัวเลขขนาดเล็ก เช่น ทศนิยม)</h4>
        <p>
          ให้เลื่อนจุดทศนิยมไปทาง <strong>ขวามือ</strong> จนกว่าจะผ่านตัวเลขที่ไม่ใช่ศูนย์ตัวแรก 
          <br/>- จำนวนครั้งที่เลื่อนจุดทศนิยมไปทางขวา จะกลายมาเป็น <strong>เลขชี้กำลัง (n) ที่เป็นลบ</strong>
        </p>
        <div className="bg-gray-50 p-4 rounded-lg border my-3">
          <strong>ตัวอย่าง: 0.0000789</strong>
          <br/>- เลื่อนจุดทศนิยมไปทางขวา 5 ตำแหน่งเพื่อให้อยู่หลังเลข 7 จะได้ตัวเลขใหม่คือ 7.89
          <br/>- เนื่องจากเลื่อนไปทางขวา 5 ตำแหน่ง เลขชี้กำลังคือ -5
          <br/>- ผลลัพธ์: <strong>7.89 × 10<sup>-5</sup></strong>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ความสำคัญในการใช้งานจริง</h3>
        <p>
          ในเครื่องคิดเลขทั่วไปหรือโปรแกรมคอมพิวเตอร์ เรามักจะเห็นสัญลักษณ์ <code>E</code> หรือ <code>e</code> (ย่อมาจาก Exponent) เช่น <code>1.25e6</code> ซึ่งมีความหมายเหมือนกับ 1.25 × 10<sup>6</sup> นั่นเอง
          การรู้จักและเข้าใจวิธีเขียนสัญกรณ์วิทยาศาสตร์ จะช่วยลดความผิดพลาดในการจดบันทึกข้อมูลทางสถิติ ข้อมูลในห้องปฏิบัติการ และทำให้การคูณหรือหารตัวเลขจำนวนมากๆ สามารถนำคุณสมบัติของเลขยกกำลังมาประยุกต์ใช้เพื่อคำนวณได้อย่างรวดเร็ว
        </p>
        <p>
          เครื่องมือออนไลน์ชิ้นนี้ถูกสร้างขึ้นเพื่อให้นักเรียน นักศึกษา และนักวิจัย สามารถแปลงค่าตัวเลขยาวๆ ให้อยู่ในรูปมาตรฐานทางวิทยาศาสตร์ได้อย่างรวดเร็ว แม่นยำ โดยไม่ต้องเสียเวลาเลื่อนจุดและนับจำนวนด้วยตัวเอง
        </p>
      </article>
    </div>
  );
}

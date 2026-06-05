import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function ScientificNotationToDecimal({ lang }: any) {
  const [base, setBase] = useState<string>('');
  const [exponent, setExponent] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const b = parseFloat(base);
    const e = parseInt(exponent, 10);
    
    if (!isNaN(b) && !isNaN(e)) {
      // Create scientific notation string and parse it, or calculate directly
      // Since numbers can be very large or small, JavaScript handles them in scientific notation inherently
      // if they pass a certain threshold.
      // We will try to show the full decimal using BigInt for large integers if possible,
      // or toLocaleString with many decimals for small numbers.
      try {
        if (e >= 0 && Number.isInteger(b)) {
           // For simple large integers to avoid e+ notation in output
           const val = BigInt(b) * (10n ** BigInt(e));
           setResult(val.toString());
        } else {
           // Fallback for decimals or negative exponents
           const val = b * Math.pow(10, e);
           // Try to format without "e"
           let strVal = val.toString();
           if (strVal.includes('e')) {
             // formatting huge/tiny floats without scientific notation in JS is tricky,
             // Big.js would be ideal but we stick to vanilla JS
             // We can use Intl.NumberFormat to force decimal format up to maximum supported
             if (e < 0) {
               strVal = val.toFixed(Math.abs(e) + 10).replace(/0+$/, '').replace(/\.$/, '');
             } else {
                // Large number with decimal base
                strVal = val.toLocaleString('fullwide', { useGrouping: false });
             }
           }
           setResult(strVal);
        }
      } catch (err) {
        const val = b * Math.pow(10, e);
        setResult(val.toString());
      }
    } else {
      setResult('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-8">
      <div className="flex items-center space-x-4 mb-6">
        <Calculator className="w-8 h-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-800">เครื่องมือแปลงสัญกรณ์วิทยาศาสตร์เป็นตัวเลขปกติ</h1>
      </div>

      <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xl">
          <div className="flex flex-col w-full md:w-32">
            <label className="text-sm text-gray-600 mb-1">ตัวเลขฐาน (a)</label>
            <input
              type="number"
              step="any"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 w-full"
              placeholder="เช่น 1.23"
            />
          </div>
          <div className="text-gray-600 font-bold mt-4 md:mt-6">× 10 <sup>เลขชี้กำลัง</sup></div>
          <div className="flex flex-col w-full md:w-32">
            <label className="text-sm text-gray-600 mb-1">เลขชี้กำลัง (n)</label>
            <input
              type="number"
              value={exponent}
              onChange={(e) => setExponent(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 w-full"
              placeholder="เช่น 4"
            />
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button
            onClick={calculate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            แปลงเป็นตัวเลขปกติ
          </button>
        </div>

        {result && (
          <div className="mt-8 text-center bg-white p-6 rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
            <p className="text-sm text-gray-500 mb-2">ผลลัพธ์ (รูปแบบตัวเลขปกติ)</p>
            <p className="text-2xl md:text-3xl font-mono text-indigo-700 break-all">{result}</p>
          </div>
        )}
      </div>

      <article className="mt-12 prose prose-slate max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">สัญกรณ์วิทยาศาสตร์ (Scientific Notation) คืออะไร?</h2>
        <p>
          ในทางคณิตศาสตร์ วิทยาศาสตร์ ดาราศาสตร์ และวิศวกรรมศาสตร์ เรามักจะพบเจอกับตัวเลขที่มีขนาดใหญ่มากๆ (เช่น ระยะทางระหว่างดวงดาว หรือจำนวนอะตอมในสสาร) หรือตัวเลขที่มีขนาดเล็กมากๆ (เช่น มวลของอิเล็กตรอน หรือขนาดของแบคทีเรีย) การเขียนตัวเลขเหล่านั้นในรูปแบบปกติจะเต็มไปด้วยเลขศูนย์จำนวนมาก ทำให้ยากต่อการอ่าน เขียน และอาจนำไปสู่ข้อผิดพลาดในการคำนวณได้
        </p>
        <p>
          <strong>สัญกรณ์วิทยาศาสตร์ (Scientific Notation)</strong> หรือบางครั้งเรียกว่ารูปแบบมาตรฐาน จึงถูกคิดค้นขึ้นมาเพื่อแก้ไขปัญหานี้ โดยเป็นการเขียนตัวเลขให้อยู่ในรูปของการคูณกันระหว่างตัวเลขที่มีค่าตั้งแต่ 1 แต่ไม่ถึง 10 กับเลขยกกำลังของ 10
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">รูปแบบของสัญกรณ์วิทยาศาสตร์</h3>
        <p>
          สัญกรณ์วิทยาศาสตร์จะเขียนอยู่ในรูปแบบ: <strong>a × 10<sup>n</sup></strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>a (สัมประสิทธิ์):</strong> เป็นจำนวนจริงที่มีค่าตั้งแต่ 1 ขึ้นไป แต่ต้องน้อยกว่า 10 (1 ≤ |a| &lt; 10) อาจเป็นค่าบวกหรือลบก็ได้</li>
          <li><strong>10:</strong> คือฐานของระบบเลขฐานสิบ</li>
          <li><strong>n (เลขชี้กำลัง):</strong> เป็นจำนวนเต็ม (บวก ลบ หรือศูนย์) ซึ่งเป็นตัวบอกจำนวนตำแหน่งที่จุดทศนิยมถูกเลื่อนไป</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีการแปลงสัญกรณ์วิทยาศาสตร์เป็นตัวเลขปกติ</h3>
        <p>
          การแปลงจากสัญกรณ์วิทยาศาสตร์ (a × 10<sup>n</sup>) กลับมาเป็นตัวเลขปกติ (Decimal Form) สามารถทำได้โดยการเลื่อนจุดทศนิยมของตัวเลขฐาน a ตามค่าของเลขชี้กำลัง n ดังนี้:
        </p>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">1. กรณีที่ n เป็นจำนวนเต็มบวก (n &gt; 0)</h4>
        <p>
          หมายความว่าตัวเลขเดิมเป็นตัวเลขที่มีค่ามาก การแปลงกลับให้ <strong>เลื่อนจุดทศนิยมของ a ไปทางขวา</strong> จำนวน n ตำแหน่ง หากเลื่อนจนสุดตัวเลขแล้ว ให้เติมเลข 0 ต่อท้ายจนครบจำนวนตำแหน่ง
          <br/><em>ตัวอย่าง:</em> 4.56 × 10<sup>5</sup> 
          <br/>เลื่อนจุดไปทางขวา 5 ตำแหน่ง จะได้ 456,000
        </p>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">2. กรณีที่ n เป็นจำนวนเต็มลบ (n &lt; 0)</h4>
        <p>
          หมายความว่าตัวเลขเดิมเป็นตัวเลขที่มีค่าน้อยมาก (น้อยกว่า 1) การแปลงกลับให้ <strong>เลื่อนจุดทศนิยมของ a ไปทางซ้าย</strong> จำนวน |n| ตำแหน่ง (ค่าสัมบูรณ์ของ n) โดยเติมเลข 0 ไว้ข้างหน้า
          <br/><em>ตัวอย่าง:</em> 3.2 × 10<sup>-4</sup> 
          <br/>เลื่อนจุดไปทางซ้าย 4 ตำแหน่ง จะได้ 0.00032
        </p>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">3. กรณีที่ n เป็นศูนย์ (n = 0)</h4>
        <p>
          เนื่องจาก 10<sup>0</sup> = 1 ดังนั้นค่าของตัวเลขปกติจะเท่ากับ a พอดี ไม่ต้องเลื่อนจุดทศนิยม
          <br/><em>ตัวอย่าง:</em> 7.89 × 10<sup>0</sup> = 7.89
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์ของเครื่องมือนี้</h3>
        <p>
          โปรแกรมคำนวณแปลงสัญกรณ์วิทยาศาสตร์เป็นตัวเลขปกติ ถูกออกแบบมาเพื่ออำนวยความสะดวกในการศึกษา การทำงาน หรือการอ่านเปเปอร์ทางวิชาการ ที่ต้องการเห็นค่าที่แท้จริงของตัวเลข โดยระบบจะทำการคำนวณและเลื่อนจุดทศนิยมให้โดยอัตโนมัติ ช่วยลดความผิดพลาดในการนับจำนวนเลขศูนย์หรือเลื่อนตำแหน่งจุดทศนิยมด้วยตัวเอง ซึ่งเป็นเครื่องมือที่มีประโยชน์อย่างมากในการเรียนรู้วิชาวิทยาศาสตร์และคณิตศาสตร์
        </p>
      </article>
    </div>
  );
}

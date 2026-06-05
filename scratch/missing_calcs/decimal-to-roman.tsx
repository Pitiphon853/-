import React, { useState } from 'react';
import { Calculator, Hash, RefreshCw, AlertCircle, BookOpen, Layers } from 'lucide-react';

const ROMAN_VALS = [
  { val: 1000, sym: 'M' },
  { val: 900, sym: 'CM' },
  { val: 500, sym: 'D' },
  { val: 400, sym: 'CD' },
  { val: 100, sym: 'C' },
  { val: 90, sym: 'XC' },
  { val: 50, sym: 'L' },
  { val: 40, sym: 'XL' },
  { val: 10, sym: 'X' },
  { val: 9, sym: 'IX' },
  { val: 5, sym: 'V' },
  { val: 4, sym: 'IV' },
  { val: 1, sym: 'I' }
];

export default function DecimalToRoman({ lang }: any) {
  const [decimalInput, setDecimalInput] = useState<string>('');
  const [result, setResult] = useState<{
    roman: string;
    breakdown: { label: string; value: number; romanPart: string }[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setResult(null);

    const num = parseInt(decimalInput);

    if (isNaN(num)) {
      setError(lang === 'th' ? 'กรุณากรอกตัวเลขจำนวนเต็ม' : 'Please enter a valid integer.');
      return;
    }

    if (num < 1 || num > 3999) {
      setError(
        lang === 'th'
          ? 'ตัวเลขโรมันแบบมาตรฐานรองรับค่าระหวาง 1 ถึง 3,999 เท่านั้น'
          : 'Standard Roman numerals only support values between 1 and 3,999.'
      );
      return;
    }

    let tempNum = num;
    let roman = '';
    const breakdown: { label: string; value: number; romanPart: string }[] = [];

    // Helper for place values
    const thousands = Math.floor(tempNum / 1000) * 1000;
    const hundreds = Math.floor((tempNum % 1000) / 100) * 100;
    const tens = Math.floor((tempNum % 100) / 10) * 10;
    const ones = tempNum % 10;

    const placeValues = [
      { label: lang === 'th' ? 'หลักพัน' : 'Thousands Place', value: thousands },
      { label: lang === 'th' ? 'หลักร้อย' : 'Hundreds Place', value: hundreds },
      { label: lang === 'th' ? 'หลักสิบ' : 'Tens Place', value: tens },
      { label: lang === 'th' ? 'หลักหน่วย' : 'Ones Place', value: ones },
    ];

    const getRomanForValue = (val: number): string => {
      let r = '';
      let remaining = val;
      for (const item of ROMAN_VALS) {
        while (remaining >= item.val) {
          r += item.sym;
          remaining -= item.val;
        }
      }
      return r;
    };

    placeValues.forEach((place) => {
      if (place.value > 0) {
        const part = getRomanForValue(place.value);
        roman += part;
        breakdown.push({
          label: place.label,
          value: place.value,
          romanPart: part,
        });
      }
    });

    setResult({ roman, breakdown });
  };

  const handleReset = () => {
    setDecimalInput('');
    setResult(null);
    setError(null);
  };

  const isTH = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-xl rounded-2xl">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 border-b pb-4">
        <Hash className="w-8 h-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'เครื่องมือแปลงเลขฐานสิบเป็นเลขโรมัน' : 'Decimal to Roman Converter'}
        </h1>
      </div>

      {/* Main UI */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Input */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isTH ? 'ตัวเลขฐานสิบ (ระบุเป็นค่าระหว่าง 1 - 3999)' : 'Decimal Integer (Range 1 - 3999)'}
            </label>
            <input
              type="number"
              value={decimalInput}
              onChange={(e) => setDecimalInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-xl font-mono"
              placeholder={isTH ? 'ตัวอย่าง: 1984' : 'e.g. 1984'}
              min="1"
              max="3999"
              step="1"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={calculate}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              <Calculator className="w-5 h-5" />
              <span>{isTH ? 'แปลงค่า' : 'Convert'}</span>
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200 flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Output */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center border-b pb-2">
              <Layers className="w-5 h-5 mr-2 text-green-500" />
              {isTH ? 'ผลลัพธ์เป็นเลขโรมัน' : 'Roman Numeral Result'}
            </h2>

            {result ? (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                  <div className="text-sm text-gray-500 mb-1">{isTH ? 'ตัวเลขโรมัน (Roman)' : 'Roman Numeral'}</div>
                  <div className="text-4xl font-bold text-indigo-600 font-mono break-all tracking-wider">{result.roman}</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-700 mb-2">{isTH ? 'วิเคราะห์การกระจายตัวเลขตามหลัก:' : 'Breakdown by Place Value:'}</div>
                  <div className="space-y-2 font-mono text-sm">
                    {result.breakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                        <span className="text-gray-500">{item.label}</span>
                        <span className="font-semibold text-gray-850">{item.value.toLocaleString()}</span>
                        <span className="text-indigo-600 font-bold text-lg">{item.romanPart}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-gray-800">
                      <span>{isTH ? 'ผลลัพธ์รวม:' : 'Combined Result:'}</span>
                      <span>
                        {result.breakdown.map(b => b.romanPart).join(' + ')} = {result.roman}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <Hash className="w-16 h-16 mx-auto mb-4 opacity-10" />
                <p className="text-sm">
                  {isTH ? 'ป้อนตัวเลขฐานสิบระหว่าง 1 ถึง 3999 เพื่อคำนวณ' : 'Enter a positive integer up to 3999 to see its Roman numeral notation'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-12 prose prose-indigo max-w-none text-gray-600 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-indigo-600" />
          {isTH ? 'วิธีแปลงเลขฐานสิบปกติให้กลายเป็นเลขโรมัน' : 'How to Convert Decimal Numbers to Roman Numerals'}
        </h2>
        <p className="mb-4">
          การแปลงเลขฐานสิบ (ฮินดูอารบิก) ไปเป็นเลขโรมันเป็นการฝึกทักษะการกระจายตัวเลขตามหลักประจำหลัก (Place value expansion) ซึ่งประกอบไปด้วยหลักพัน หลักร้อย หลักสิบ และหลักหน่วย การแปลงระบบนี้ไม่ได้ทำได้เพียงแค่การแปลงตรงๆ แบบสุ่ม แต่ต้องเข้าใจกฎกติกาการสลับที่และการลดทอนตัวเลขของโรมันโบราณ
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ขั้นตอนวิธีการแปลงด้วยวิธีขยายสัญกรณ์ (Digit-by-Digit Method)</h3>
        <p className="mb-4">
          วิธีที่ดีที่สุดและแม่นยำที่สุดในการแปลงเลขฐานสิบปกติให้เป็นเลขโรมัน คือการแยกองค์ประกอบของตัวเลขออกเป็นแต่ละหลัก เช่น หลักพัน หลักร้อย หลักสิบ และหลักหน่วย จากนั้นให้แปลงทีละส่วนก่อนนำมาเขียนติดกัน:
        </p>
        <p className="mb-4">
          สมมติว่าเราต้องการแปลงตัวเลข <strong>2,749</strong>:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>แยกตามหลักประจำหลัก:</strong> 2,749 = 2,000 + 700 + 40 + 9</li>
          <li><strong>แปลงหลักพัน (2,000):</strong> ตัวอักษร M แทนค่า 1,000 ดังนั้น 2,000 จึงเท่ากับ MM</li>
          <li><strong>แปลงหลักร้อย (700):</strong> ตัวอักษร D แทนค่า 500 และ C แทนค่า 100 ดังนั้น 700 = 500 + 100 + 100 = DCC</li>
          <li><strong>แปลงหลักสิบ (40):</strong> เลข 40 ใช้หลักการลบ นั่นคือ นำ X (10) ไปไว้ข้างหน้า L (50) ซึ่งจะได้ XL</li>
          <li><strong>แปลงหลักหน่วย (9):</strong> เลข 9 ใช้หลักการลบเช่นเดียวกัน นั่นคือ นำ I (1) ไปไว้ข้างหน้า X (10) ซึ่งจะได้ IX</li>
          <li><strong>ประกอบคำตอบเข้าด้วยกัน:</strong> MM + DCC + XL + IX = <strong>MMDCCXLIX</strong></li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ตารางการแปลงสรุปตามประจำหลัก</h3>
        <p className="mb-4">
          ด้านล่างนี้คือกลุ่มของรูปแบบที่ใช้แทนค่าตั้งแต่ 1 ถึง 9 ในแต่ละประจำหลัก:
        </p>
        <div className="overflow-x-auto my-4 text-xs font-mono">
          <table className="min-w-full divide-y divide-gray-200 border text-center">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-1.5 border">หลักประจำหลัก</th>
                <th className="px-2 py-1.5 border">1</th>
                <th className="px-2 py-1.5 border">2</th>
                <th className="px-2 py-1.5 border">3</th>
                <th className="px-2 py-1.5 border">4</th>
                <th className="px-2 py-1.5 border">5</th>
                <th className="px-2 py-1.5 border">6</th>
                <th className="px-2 py-1.5 border">7</th>
                <th className="px-2 py-1.5 border">8</th>
                <th className="px-2 py-1.5 border">9</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-2 py-1.5 border font-semibold">หลักหน่วย</td>
                <td className="px-2 py-1.5 border">I</td>
                <td className="px-2 py-1.5 border">II</td>
                <td className="px-2 py-1.5 border">III</td>
                <td className="px-2 py-1.5 border">IV</td>
                <td className="px-2 py-1.5 border">V</td>
                <td className="px-2 py-1.5 border">VI</td>
                <td className="px-2 py-1.5 border">VII</td>
                <td className="px-2 py-1.5 border">VIII</td>
                <td className="px-2 py-1.5 border">IX</td>
              </tr>
              <tr>
                <td className="px-2 py-1.5 border font-semibold">หลักสิบ</td>
                <td className="px-2 py-1.5 border">X</td>
                <td className="px-2 py-1.5 border">XX</td>
                <td className="px-2 py-1.5 border">XXX</td>
                <td className="px-2 py-1.5 border">XL</td>
                <td className="px-2 py-1.5 border">L</td>
                <td className="px-2 py-1.5 border">LX</td>
                <td className="px-2 py-1.5 border">LXX</td>
                <td className="px-2 py-1.5 border">LXXX</td>
                <td className="px-2 py-1.5 border">XC</td>
              </tr>
              <tr>
                <td className="px-2 py-1.5 border font-semibold">หลักร้อย</td>
                <td className="px-2 py-1.5 border">C</td>
                <td className="px-2 py-1.5 border">CC</td>
                <td className="px-2 py-1.5 border">CCC</td>
                <td className="px-2 py-1.5 border">CD</td>
                <td className="px-2 py-1.5 border">D</td>
                <td className="px-2 py-1.5 border">DC</td>
                <td className="px-2 py-1.5 border">DCC</td>
                <td className="px-2 py-1.5 border">DCCC</td>
                <td className="px-2 py-1.5 border">CM</td>
              </tr>
              <tr>
                <td className="px-2 py-1.5 border font-semibold">หลักพัน</td>
                <td className="px-2 py-1.5 border">M</td>
                <td className="px-2 py-1.5 border">MM</td>
                <td className="px-2 py-1.5 border">MMM</td>
                <td className="px-2 py-1.5 border">-</td>
                <td className="px-2 py-1.5 border">-</td>
                <td className="px-2 py-1.5 border">-</td>
                <td className="px-2 py-1.5 border">-</td>
                <td className="px-2 py-1.5 border">-</td>
                <td className="px-2 py-1.5 border">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ทำไมต้องจำกัดอยู่ที่ตัวเลข 3,999?</h3>
        <p className="mb-4">
          ตัวเลขโรมันระบบมาตรฐานจะมีค่าสูงสุดไม่เกิน 3,999 (MMMCMXCIX) เนื่องจากเราไม่มีระบบเขียนต่อตัวอักษร M เกิน 3 ครั้งตามกฎพื้นฐาน หากต้องการเขียนตัวเลขที่เกินกว่านี้ ในยุคโบราณจะใช้การใส่ขีดขวางด้านบนตัวอักษร (เรียกว่า Vinculum) เพื่อคูณค่าของตัวอักษรนั้นๆ ด้วย 1,000 เช่น V ที่มีขีดด้านบนจะมีค่าเท่ากับ 5,000 หรือ X ที่มีขีดด้านบนจะมีค่าเป็น 10,000 อย่างไรก็ดีในการใช้งานระบบคอมพิวเตอร์ทั่วไปและมาตรฐาน Unicode การใช้ตัวเลขไม่เกิน 3,999 เป็นข้อกำหนดมาตรฐานที่เพียงพอ
        </p>
      </article>
    </div>
  );
}

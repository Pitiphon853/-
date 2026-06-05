import React, { useState } from 'react';
import { Calculator, Hash, RefreshCw, AlertCircle, BookOpen, ListOrdered } from 'lucide-react';

const ROMAN_MAP: Record<string, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

export default function RomanToDecimal({ lang }: any) {
  const [romanInput, setRomanInput] = useState<string>('');
  const [result, setResult] = useState<{
    decimal: number;
    steps: { char: string; val: number; sign: '+' | '-'; desc: string }[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setResult(null);

    const inputCleaned = romanInput.trim().toUpperCase();

    if (!inputCleaned) {
      setError(lang === 'th' ? 'กรุณากรอกตัวเลขโรมัน' : 'Please enter Roman numerals.');
      return;
    }

    // Validation Regex
    const romanRegex = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    if (!romanRegex.test(inputCleaned)) {
      setError(
        lang === 'th'
          ? 'รูปแบบตัวเลขโรมันไม่ถูกต้องตามหลักสากล (เช่น IV, IX, XL, XC, CD, CM) หรือซ้ำตัวอักษรเกินกำหนด'
          : 'Invalid Roman numeral format or repeating characters limit exceeded.'
      );
      return;
    }

    let decimal = 0;
    const steps: { char: string; val: number; sign: '+' | '-'; desc: string }[] = [];

    for (let i = 0; i < inputCleaned.length; i++) {
      const currentVal = ROMAN_MAP[inputCleaned[i]];
      const nextVal = i + 1 < inputCleaned.length ? ROMAN_MAP[inputCleaned[i + 1]] : 0;

      if (currentVal < nextVal) {
        // Subtraction rule (e.g. IV = 5 - 1 = 4)
        decimal -= currentVal;
        steps.push({
          char: inputCleaned[i],
          val: currentVal,
          sign: '-',
          desc: lang === 'th' 
            ? `ลบ ${currentVal} (เพราะ ${inputCleaned[i]} มีค่าน้อยกว่าตัวถัดไปคือ ${inputCleaned[i + 1]})` 
            : `Subtract ${currentVal} (since ${inputCleaned[i]} is less than next char ${inputCleaned[i + 1]})`
        });
      } else {
        // Addition rule
        decimal += currentVal;
        steps.push({
          char: inputCleaned[i],
          val: currentVal,
          sign: '+',
          desc: lang === 'th'
            ? `บวก ${currentVal} (เพราะมีค่ามากกว่าหรือเท่ากับตัวถัดไป)`
            : `Add ${currentVal} (since it is greater than or equal to next char)`
        });
      }
    }

    setResult({ decimal, steps });
  };

  const handleReset = () => {
    setRomanInput('');
    setResult(null);
    setError(null);
  };

  const isTH = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-xl rounded-2xl">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 border-b pb-4">
        <Hash className="w-8 h-8 text-amber-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'เครื่องมือแปลงเลขโรมันเป็นเลขฐานสิบ' : 'Roman to Decimal Converter'}
        </h1>
      </div>

      {/* Main UI */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Input area */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isTH ? 'ตัวเลขโรมัน (เช่น MCMLXXXVI, MMXXIV)' : 'Roman Numeral (e.g., MCMLXXXVI, MMXXIV)'}
            </label>
            <input
              type="text"
              value={romanInput}
              onChange={(e) => setRomanInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-xl font-mono uppercase tracking-widest"
              placeholder="e.g. XIV"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={calculate}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
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

        {/* Output area */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center border-b pb-2">
              <ListOrdered className="w-5 h-5 mr-2 text-green-500" />
              {isTH ? 'ผลการคำนวณเลขฐานสิบ' : 'Decimal Number Result'}
            </h2>

            {result ? (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                  <div className="text-sm text-gray-500 mb-1">{isTH ? 'เลขฐานสิบปกติ' : 'Decimal Integer'}</div>
                  <div className="text-5xl font-bold text-amber-600 font-mono">{result.decimal}</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-700 mb-2">{isTH ? 'ขั้นตอนการคำนวณ:' : 'Calculation Breakdown:'}</div>
                  <div className="max-h-60 overflow-y-auto space-y-2 pr-1 font-mono text-xs">
                    {result.steps.map((step, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                        <span className="font-semibold text-gray-800">{step.char} ({step.val})</span>
                        <span className={`px-2 py-0.5 rounded ${step.sign === '+' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {step.sign} {step.val}
                        </span>
                        <span className="text-gray-500 text-right">{step.desc}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-sm text-gray-800">
                      <span>{isTH ? 'ผลรวมสุทธิ:' : 'Total Sum:'}</span>
                      <span>{result.steps.map(s => `${s.sign}${s.val}`).join(' ')} = {result.decimal}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <Hash className="w-16 h-16 mx-auto mb-4 opacity-10" />
                <p className="text-sm">
                  {isTH ? 'กรอกตัวเลขโรมัน เช่น MMX, IX เพื่อคำนวณเป็นเลขอารบิกปกติ' : 'Enter a Roman numeral like MMX, IX to start converting'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-12 prose prose-amber max-w-none text-gray-600 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-amber-600" />
          {isTH ? 'ระบบตัวเลขโรมันและหลักการแปลงค่าเป็นเลขฐานสิบ' : 'The Roman Numeral System & Conversion Rules'}
        </h2>
        <p className="mb-4">
          ตัวเลขโรมัน (Roman numerals) เป็นระบบตัวเลขโบราณที่ถูกพัฒนาและใช้งานในอาณาจักรโรมันโบราณ โดยการใช้ตัวอักษรละตินผสมกันในการแทนค่าตัวเลข ระบบนี้ยังไม่มีหลัก "ศูนย์" และไม่มีค่าประจำหลัก (Place value) เหมือนเลขฐานสิบปัจจุบัน แต่ใช้หลักการบวกและหลักการหักลบของสัญลักษณ์แทน
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">สัญลักษณ์พื้นฐานของตัวเลขโรมัน</h3>
        <p className="mb-4">
          ตัวเลขโรมันถูกกำหนดด้วยตัวอักษรละติน 7 ตัวหลักที่มีค่าตายตัว ดังนี้:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-gray-200 border text-center font-mono">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border">สัญลักษณ์ (Roman)</th>
                <th className="px-4 py-2 border">ค่าเลขฐานสิบ (Decimal Value)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 border font-bold text-amber-700">I</td>
                <td className="px-4 py-2 border">1</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-bold text-amber-700">V</td>
                <td className="px-4 py-2 border">5</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-bold text-amber-700">X</td>
                <td className="px-4 py-2 border">10</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-bold text-amber-700">L</td>
                <td className="px-4 py-2 border">50</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-bold text-amber-700">C</td>
                <td className="px-4 py-2 border">100</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-bold text-amber-700">D</td>
                <td className="px-4 py-2 border">500</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-bold text-amber-700">M</td>
                <td className="px-4 py-2 border">1,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">กฎในการอ่านและแปลงค่าตัวเลขโรมัน</h3>
        <p className="mb-4">
          เพื่อให้ตัวเลขโรมันแสดงค่าต่างๆ ได้อย่างสมบูรณ์แบบ ได้มีการกำหนดกฎกติกาการเรียงตัวอักษรไว้ดังนี้:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li>
            <strong>หลักการเขียนตัวเลขจากมากไปน้อย (Addition Rule):</strong> หากเขียนตัวอักษรที่มีค่ามากอยู่ข้างหน้าและมีค่าน้อยอยู่ข้างหลัง ให้นำค่ามาบวกกัน เช่น VIII = 5 + 1 + 1 + 1 = 8 หรือ XVII = 10 + 5 + 1 + 1 = 17
          </li>
          <li>
            <strong>หลักการลบ (Subtraction Rule):</strong> หากเขียนตัวอักษรที่มีค่าน้อยไว้หน้าตัวอักษรที่มีค่ามากกว่า ให้นำสัญลักษณ์ที่มีค่าน้อยไปลบออกจากตัวสัญลักษณ์ที่มีค่ามาก โดยมีคู่ที่ได้รับอนุมัติในระบบสากลดังนี้:
            <ul className="list-disc pl-6 mt-1 space-y-1 font-mono text-sm">
              <li>IV = 5 - 1 = 4</li>
              <li>IX = 10 - 1 = 9</li>
              <li>XL = 50 - 10 = 40</li>
              <li>XC = 100 - 10 = 90</li>
              <li>CD = 500 - 100 = 400</li>
              <li>CM = 1000 - 100 = 900</li>
            </ul>
          </li>
          <li>
            <strong>การเขียนซ้ำไม่เกิน 3 ครั้ง:</strong> สัญลักษณ์ I, X, C, M จะไม่มีการเขียนต่อกันเกิน 3 ตัวอักษร เช่น 40 จะไม่เขียนเป็น XXXX แต่ให้เขียนเป็น XL และตัวอักษร V, L, D จะไม่เขียนซ้ำกันเป็นอันขาด (เช่น 10 ไม่เขียน VV แต่ให้เขียน X)
          </li>
        </ol>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">การประยุกต์ใช้งานในปัจจุบัน</h3>
        <p className="mb-4">
          แม้ว่าปัจจุบันมนุษย์เราจะได้เปลี่ยนมาใช้ระบบเลขฮินดูอารบิก (Decimal) เป็นมาตรฐานทั่วไปเนื่องจากเอื้อต่อการทำคณิตศาสตร์และการคิดคำนวณขั้นสูงกว่า แต่ตัวเลขโรมันก็ยังปรากฏอยู่บ่อยครั้งในชีวิตประจำวันเพื่อความสวยงามและการออกแบบ เช่น หน้าปัดนาฬิกาโบราณ, ตัวเลขอ้างอิงลำดับเหตุการณ์ประวัติศาสตร์หรือสงครามโลก, ลำดับบทของวรรณกรรม, ลำดับภาคของภาพยนตร์ (เช่น Star Wars Episode VII), รวมถึงปีที่จดทะเบียนลิขสิทธิ์ของบริษัทสำคัญต่างๆ
        </p>
      </article>
    </div>
  );
}

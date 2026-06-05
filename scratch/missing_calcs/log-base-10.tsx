import React, { useState } from 'react';
import { Calculator, FunctionSquare, LineChart, Info } from 'lucide-react';

export default function LogBase10({ lang }: any) {
  const [x, setX] = useState<string>('');
  const [result, setResult] = useState<number | null | 'error'>(null);

  const calculate = () => {
    const xVal = parseFloat(x);
    if (!isNaN(xVal)) {
      if (xVal > 0) {
        setResult(Math.log10(xVal));
      } else {
        setResult('error');
      }
    } else {
      setResult(null);
    }
  };

  const isTH = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-xl rounded-2xl">
      <div className="flex items-center space-x-3 mb-6 border-b pb-4">
        <FunctionSquare className="w-8 h-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'เครื่องมือคำนวณหาค่าลอการิทึมฐาน 10 (Log Base 10)' : 'Log Base 10 Calculator'}
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isTH ? 'ค่า X (ต้องมากกว่า 0)' : 'Value of X (must be > 0)'}
            </label>
            <input
              type="number"
              value={x}
              onChange={(e) => { setX(e.target.value); if (result !== null) setResult(null); }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-lg font-mono"
              placeholder={isTH ? 'เช่น 100' : 'e.g. 100'}
              step="any"
            />
          </div>
          <button
            onClick={calculate}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>{isTH ? 'คำนวณ log₁₀(x)' : 'Calculate log₁₀(x)'}</span>
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <LineChart className="w-5 h-5 mr-2 text-green-500" />
            {isTH ? 'ผลลัพธ์การคำนวณ' : 'Calculation Result'}
          </h2>
          {result === 'error' ? (
             <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center border border-red-200">
               {isTH ? 'ข้อผิดพลาด: ค่า X ต้องมากกว่า 0 เนื่องจากลอการิทึมของจำนวนลบและศูนย์ไม่สามารถนิยามในระบบจำนวนจริงได้' : 'Error: X must be greater than 0 as logarithms of zero and negative numbers are undefined in real numbers.'}
             </div>
          ) : result !== null ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-sm text-gray-500 mb-2">log₁₀({parseFloat(x)}) = </div>
              <div className="text-4xl font-bold text-indigo-600 break-all font-mono">
                {Number.isInteger(result) ? result : result.toLocaleString('en-US', { maximumFractionDigits: 8 })}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <Info className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>{isTH ? 'กรุณากรอกค่า X เพื่อคำนวณหาค่าลอการิทึม' : 'Enter a value for X to calculate the logarithm'}</p>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-indigo max-w-none text-gray-600">
        <h2 className="text-xl font-bold text-gray-800">{isTH ? 'ลอการิทึมฐาน 10 (Common Logarithm) คืออะไร?' : 'What is Log Base 10 (Common Logarithm)?'}</h2>
        <p>{isTH ? 'ลอการิทึมฐาน 10 (มักเขียนย่อว่า log(x) หรือ lg(x)) หรือที่เรียกกันว่าลอการิทึมสามัญ (Common Logarithm) เป็นเครื่องมือทางคณิตศาสตร์ที่ช่วยให้เราหาได้ว่า เราต้องยกกำลัง 10 ด้วยตัวเลขใด จึงจะได้ผลลัพธ์เป็นค่า x ที่เราต้องการ' : 'The logarithm to base 10 (often written as log(x) or lg(x)), also known as the common logarithm, is a mathematical tool that tells us what power 10 must be raised to in order to obtain a given number x.'}</p>
        <p>{isTH ? 'พูดง่ายๆ คือ ถ้าเรามีสมการ 10ʸ = x ดังนั้น y ก็คือค่าของ log₁₀(x) นั่นเอง ตัวอย่างเช่น 10² = 100 ดังนั้น log₁₀(100) จะเท่ากับ 2' : 'Simply put, if 10ʸ = x, then y is log₁₀(x). For example, since 10² = 100, then log₁₀(100) = 2.'}</p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6">{isTH ? 'ความสำคัญของลอการิทึมฐาน 10' : 'Importance of Base 10 Logarithms'}</h3>
        <p>{isTH ? 'ลอการิทึมฐาน 10 มีประโยชน์อย่างมหาศาลในการบีบอัดสเกลตัวเลขที่กว้างมากๆ ให้อยู่ในรูปแบบที่เข้าใจได้ง่ายขึ้น มนุษย์ใช้ระบบเลขฐาน 10 ทำให้ลอการิทึมฐานนี้สอดคล้องกับสัญชาตญาณในการนับจำนวนของเรา การเพิ่มขึ้นของค่า log 1 หน่วย หมายถึงปริมาณเดิมได้เพิ่มขึ้นถึง 10 เท่า' : 'Base 10 logarithms are immensely useful in compressing extremely wide numerical scales into an easily understandable format. Since humans use a base-10 number system, this logarithm aligns with our counting intuition. An increase of 1 in the log value means the original quantity has increased by a factor of 10.'}</p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6">{isTH ? 'การประยุกต์ใช้งานในชีวิตจริง' : 'Real-world Applications'}</h3>
        <p>{isTH ? 'ลอการิทึมฐาน 10 ถูกนำมาใช้สร้างมาตรวัดมาตรฐานหลายๆ อย่างที่พบได้ในวิทยาศาสตร์และวิศวกรรมศาสตร์ ได้แก่:' : 'Common logarithms are used to create standard scales in science and engineering, including:'}</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>มาตราริกเตอร์ (Richter Scale):</strong> {isTH ? 'ใช้วัดขนาดของแผ่นดินไหว แผ่นดินไหวขนาด 6.0 ตามมาตราริกเตอร์ จะมีคลื่นความสั่นสะเทือนสูงกว่าขนาด 5.0 ถึง 10 เท่า' : 'Used to measure the magnitude of earthquakes. A 6.0 earthquake has wave amplitudes 10 times greater than a 5.0.'}</li>
          <li><strong>ระดับความดังของเสียง (Decibel - dB):</strong> {isTH ? 'ใช้วัดระดับความเข้มของเสียง โดยคำนวณจาก 10 × log₁₀(I/I₀) เสียงที่มีระดับเดซิเบลสูงขึ้น 10 dB จะหมายถึงระดับพลังงานเสียงที่เพิ่มขึ้น 10 เท่า' : 'Used to measure sound intensity level based on 10 × log₁₀(I/I₀). A 10 dB increase means a 10-fold increase in sound energy.'}</li>
          <li><strong>ค่าความเป็นกรด-ด่าง (pH Scale):</strong> {isTH ? 'ในทางเคมี pH ใช้ระบุความเป็นกรดหรือด่างของสารละลาย คำนวณจาก -log₁₀[H⁺] สารละลายที่มี pH 3 จะมีความเป็นกรดมากกว่าสารที่มี pH 4 ถึง 10 เท่า' : 'In chemistry, pH measures acidity or basicity, calculated as -log₁₀[H⁺]. A solution with pH 3 is 10 times more acidic than pH 4.'}</li>
          <li><strong>ความสว่างของดาวฤกษ์ (Stellar Magnitude):</strong> {isTH ? 'นักดาราศาสตร์ใช้สเกลแบบลอการิทึมเพื่อเปรียบเทียบความสว่างของดวงดาวบนท้องฟ้า' : 'Astronomers use a logarithmic scale to compare the brightness of stars.'}</li>
        </ul>

        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mt-6 rounded-r-lg">
          <p className="text-sm text-indigo-900">
            <strong>{isTH ? 'ข้อควรจำ:' : 'Important Note:'}</strong> {isTH ? 'ลอการิทึมของจำนวนจริงบวกเท่านั้นที่มีค่าเป็นจำนวนจริง ลอการิทึมของศูนย์ (0) หรือจำนวนลบจะไม่มีนิยามในระบบจำนวนจริง (แต่อาจพิจารณาในระบบจำนวนเชิงซ้อนได้) นอกจากนี้ log₁₀(1) จะมีค่าเท่ากับ 0 เสมอ' : 'Logarithms are only defined for positive real numbers. Logarithm of zero or negative numbers is undefined in real numbers. Also, log₁₀(1) is always equal to 0.'}
          </p>
        </div>
      </article>
    </div>
  );
}

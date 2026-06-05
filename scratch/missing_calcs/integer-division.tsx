import React, { useState } from 'react';
import { Calculator, Divide, HelpCircle, RefreshCw, BookOpen } from 'lucide-react';

export default function IntegerDivision({ lang }: any) {
  const [dividend, setDividend] = useState<string>('');
  const [divisor, setDivisor] = useState<string>('');
  const [result, setResult] = useState<{
    quotient: number;
    remainder: number;
    steps: string[];
    isNegative: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setResult(null);

    const a = parseInt(dividend);
    const b = parseInt(divisor);

    if (isNaN(a) || isNaN(b)) {
      setError(lang === 'th' ? 'กรุณากรอกตัวเลขจำนวนเต็มที่ถูกต้องทั้งสองช่อง' : 'Please enter valid integers in both fields.');
      return;
    }

    if (b === 0) {
      setError(lang === 'th' ? 'ตัวหารห้ามเป็น 0' : 'Divisor cannot be zero.');
      return;
    }

    // Standard Math.floor division for Euclidean division or truncation division?
    // Let's do standard truncated division (like in JS: a / b truncated to 0, remainder has the sign of dividend)
    // or Euclidean division where remainder is always >= 0.
    // Let's implement standard programming-style integer division (truncated) and show the formula.
    const quotient = Math.trunc(a / b);
    const remainder = a % b;

    const steps = [];
    if (lang === 'th') {
      steps.push(`1. ตั้งหาร: ${a} หารด้วย ${b}`);
      steps.push(`2. หาผลหารที่เป็นจำนวนเต็มสูงสุด: ${b} คูณกับอะไรได้ใกล้เคียง ${a} ที่สุดแต่ไม่เกินค่าสัมบูรณ์ -> ผลหารคือ ${quotient}`);
      steps.push(`3. คำนวณเศษเหลือ: เศษ = ตัวตั้ง - (ผลหาร × ตัวหาร) = ${a} - (${quotient} × ${b}) = ${a} - ${quotient * b} = ${remainder}`);
      steps.push(`4. ตรวจสอบคำตอบ: ${a} = (${b} × ${quotient}) + ${remainder} ซึ่งเท่ากับ ${b * quotient + remainder}`);
    } else {
      steps.push(`1. Setup: Divide ${a} by ${b}`);
      steps.push(`2. Find the largest integer quotient: ${b} multiplied by what gets closest to ${a} without exceeding its absolute value -> Quotient is ${quotient}`);
      steps.push(`3. Calculate the remainder: Remainder = Dividend - (Quotient × Divisor) = ${a} - (${quotient} × ${b}) = ${a} - ${quotient * b} = ${remainder}`);
      steps.push(`4. Verify: ${a} = (${b} × ${quotient}) + ${remainder} which equals ${b * quotient + remainder}`);
    }

    setResult({
      quotient,
      remainder,
      steps,
      isNegative: a * b < 0
    });
  };

  const handleReset = () => {
    setDividend('');
    setDivisor('');
    setResult(null);
    setError(null);
  };

  const isTH = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-xl rounded-2xl">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 border-b pb-4">
        <Divide className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'เครื่องมือคำนวณหาผลหารแบบจำนวนเต็ม (Integer Division)' : 'Integer Division Calculator'}
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Input Panel */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isTH ? 'ตัวตั้ง (Dividend)' : 'Dividend'}
            </label>
            <input
              type="number"
              value={dividend}
              onChange={(e) => setDividend(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg font-mono"
              placeholder={isTH ? 'ตัวอย่าง: 25' : 'e.g. 25'}
              step="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isTH ? 'ตัวหาร (Divisor)' : 'Divisor'}
            </label>
            <input
              type="number"
              value={divisor}
              onChange={(e) => setDivisor(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg font-mono"
              placeholder={isTH ? 'ตัวอย่าง: 4' : 'e.g. 4'}
              step="1"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={calculate}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              <Calculator className="w-5 h-5" />
              <span>{isTH ? 'คำนวณ' : 'Calculate'}</span>
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-3 px-4 rounded-lg transition duration-200"
              title={isTH ? 'ล้างข้อมูล' : 'Reset'}
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center border-b pb-2">
              <HelpCircle className="w-5 h-5 mr-2 text-green-500" />
              {isTH ? 'ผลลัพธ์และเศษเหลือ' : 'Result & Remainder'}
            </h2>

            {result ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                    <div className="text-sm text-gray-500 mb-1">{isTH ? 'ผลหาร (Quotient)' : 'Quotient'}</div>
                    <div className="text-3xl font-bold text-blue-600 font-mono">{result.quotient}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                    <div className="text-sm text-gray-500 mb-1">{isTH ? 'เศษ (Remainder)' : 'Remainder'}</div>
                    <div className="text-3xl font-bold text-orange-600 font-mono">{result.remainder}</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-700 mb-2">{isTH ? 'วิธีการแบ่งกลุ่มหรือหาร:' : 'Step-by-Step Explanation:'}</div>
                  <ul className="text-sm text-gray-600 space-y-1 font-mono">
                    {result.steps.map((step, idx) => (
                      <li key={idx} className="border-b border-gray-50 py-1 last:border-0">{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <Divide className="w-16 h-16 mx-auto mb-4 opacity-10" />
                <p className="text-sm">
                  {isTH ? 'กรอกตัวตั้งและตัวหารเพื่อเริ่มต้นคำนวณ' : 'Enter dividend and divisor to compute quotient and remainder'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-12 prose prose-blue max-w-none text-gray-600 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
          {isTH ? 'การหารแบบจำนวนเต็ม (Integer Division) และเศษเหลือ คืออะไร?' : 'Understanding Integer Division and Remainders'}
        </h2>
        <p className="mb-4">
          การหารแบบจำนวนเต็ม (Integer Division) คือการหารจำนวนเต็มสองจำนวน โดยที่ผลลัพธ์ของการหารจะเป็นจำนวนเต็มเท่านั้น (ไม่มีจุดทศนิยม) ส่วนที่เหลือจากการแบ่งกลุ่มอย่างเท่าๆ กันจะเรียกว่า <strong>เศษเหลือ (Remainder)</strong> ซึ่งมีบทบาทสำคัญอย่างมากในวิชาคณิตศาสตร์และวิทยาการคอมพิวเตอร์
        </p>
        
        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ทฤษฎีบทการหารลงตัวและสมการพื้นฐาน</h3>
        <p className="mb-4">
          ในทางคณิตศาสตร์ ทฤษฎีบทการแบ่งกลุ่มหรือขั้นตอนวิธีการหาร (Division Algorithm) ระบุไว้ว่า สำหรับตัวตั้ง $a$ และตัวหาร $b$ ที่ไม่ใช่ศูนย์ จะมีจำนวนเต็ม $q$ และ $r$ เพียงคู่เดียวที่สอดคล้องกับสมการต่อไปนี้:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg my-4 text-center font-mono text-gray-800 border border-gray-150">
          a = (b &times; q) + r
        </div>
        <p className="mb-4">
          โดยที่เงื่อนไขของเศษเหลือ $r$ จะมีค่าตั้งแต่ 0 ไปจนถึงน้อยกว่าขนาดของตัวหาร $b$ เสมอ ซึ่งสามารถเขียนในรูปอสมการได้ดังนี้:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg my-4 text-center font-mono text-gray-800 border border-gray-150">
          0 &le; r &lt; |b|
        </div>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>a</strong> คือ ตัวตั้ง (Dividend)</li>
          <li><strong>b</strong> คือ ตัวหาร (Divisor)</li>
          <li><strong>q</strong> คือ ผลหารที่เป็นจำนวนเต็ม (Quotient)</li>
          <li><strong>r</strong> คือ เศษเหลือจากการหาร (Remainder)</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ตัวอย่างการหารแบบจำนวนเต็ม</h3>
        <p className="mb-4">
          ยกตัวอย่างการนำ 25 มาหารด้วย 4:
          การหาผลหารจำนวนเต็ม: เราต้องการดูว่า 4 คูณกับอะไรได้ใกล้เคียง 25 ที่สุดโดยไม่เกิน 25 ซึ่งคำตอบคือ 4 &times; 6 = 24 ดังนั้นผลหาร (Quotient) คือ <strong>6</strong>
          การหาเศษเหลือ: นำตัวตั้งลบออกด้วยผลคูณของผลหารและตัวหาร นั่นคือ 25 - (4 &times; 6) = 25 - 24 = 1 ดังนั้นเศษเหลือ (Remainder) คือ <strong>1</strong>
          เมื่อนำมาเข้าสมการตรวจสอบ: 25 = (4 &times; 6) + 1 ซึ่งเป็นจริง
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ความสำคัญและการประยุกต์ใช้งาน</h3>
        <p className="mb-4">
          การหารจำนวนเต็มและหารเอาเศษ (Modulo Operation หรือ % ในโปรแกรมมิ่ง) ถูกใช้อย่างแพร่หลายในหลายมิติ:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>การแปลงหน่วยเวลา:</strong> เช่น แปลงจำนวนนาทีเป็นชั่วโมงและนาทีที่เหลือ เช่น 135 นาที หารด้วย 60 จะได้ 2 ชั่วโมง เศษ 15 นาที</li>
          <li><strong>การจัดกลุ่มและการปันส่วน:</strong> เช่น การแบ่งผลไม้ 100 ผลให้เด็ก 6 คนอย่างเท่าเทียม เด็กจะได้รับคนละ 16 ผล และเหลือเศษ 4 ผล</li>
          <li><strong>การเข้ารหัสลับ (Cryptography):</strong> เลขคณิตมอดูโล (Modular Arithmetic) เป็นพื้นฐานหลักของระบบรักษาความปลอดภัยบนเครือข่ายอินเทอร์เน็ต เช่น อัลกอริทึม RSA</li>
          <li><strong>การตรวจสอบความเป็นคู่/คี่:</strong> ในทางคอมพิวเตอร์ เราใช้วิธีหารเศษด้วย 2 หากเศษเป็น 0 แสดงว่าเป็นเลขคู่ หากเศษเป็น 1 แสดงว่าเป็นเลขคี่</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ข้อจำกัดที่ควรระวัง</h3>
        <p className="mb-4">
          การหารด้วยศูนย์ (Division by zero) ไม่นิยามในทางคณิตศาสตร์ เนื่องจากไม่มีผลคูณใดของ 0 ที่จะกลับไปเท่ากับตัวตั้งที่ไม่ใช่ศูนย์ได้ ดังนั้นระบบจึงไม่ยอมรับการใส่ค่าตัวหารเป็น 0 นอกจากนี้ในการคิดกับจำนวนลบ ผลลัพธ์ของเศษเหลืออาจขึ้นอยู่กับภาษาโปรแกรมหรือวิธีการคำนวณที่เลือกใช้ (เช่น truncated division หรือ floored division) ซึ่งควรทำความเข้าใจให้รอบคอบก่อนนำไปใช้งานจริง
        </p>
      </article>
    </div>
  );
}

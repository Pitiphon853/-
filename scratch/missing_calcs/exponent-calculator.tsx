import React, { useState } from 'react';
import { Calculator, HelpCircle, Info, RefreshCw, Zap } from 'lucide-react';

export default function ExponentCalculator({ lang = 'TH' }: any) {
  const [baseVal, setBaseVal] = useState<string>('2');
  const [exponentVal, setExponentVal] = useState<string>('8');
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<number | null>(256);
  const [steps, setSteps] = useState<string[]>([]);

  const calculateExponent = (xStr: string, yStr: string) => {
    const x = parseFloat(xStr);
    const y = parseFloat(yStr);

    if (isNaN(x) || isNaN(y)) {
      setError(lang === 'TH' ? 'กรุณากรอกตัวเลขฐาน (X) และเลขชี้กำลัง (Y) ให้ถูกต้อง' : 'Please enter valid base (X) and exponent (Y)');
      return;
    }

    if (x === 0 && y === 0) {
      setError(lang === 'TH' ? 'ในทางคณิตศาสตร์ 0 ยกกำลัง 0 ไม่มีนิยาม (Indeterminate form)' : '0 raised to the power of 0 is undefined/indeterminate');
      return;
    }

    if (x === 0 && y < 0) {
      setError(lang === 'TH' ? 'ไม่สามารถหาค่าได้เนื่องจาก 0 ที่มีตัวชี้กำลังเป็นลบจะหารด้วย 0' : 'Division by zero: 0 raised to a negative power is undefined');
      return;
    }

    if (x < 0 && !Number.isInteger(y)) {
      setError(lang === 'TH' ? 'ฐานติดลบและเลขชี้กำลังเป็นทศนิยมอาจได้ผลลัพธ์เป็นจำนวนเชิงซ้อน (Complex Number)' : 'Negative base with fractional exponent results in a complex number');
      return;
    }

    setError('');
    const res = Math.pow(x, y);
    setResult(res);

    // Generate steps
    const stepList: string[] = [];
    stepList.push(`${x} ^ ${y}`);

    if (y === 0) {
      stepList.push(lang === 'TH' ? 'ตามกฎเลขยกกำลัง: จำนวนใดๆ (ที่ไม่ใช่ 0) ยกกำลัง 0 จะมีค่าเท่ากับ 1 เสมอ' : 'By exponent rules: Any non-zero base raised to the power of 0 equals 1.');
      stepList.push(`X^0 = 1 => ${x}^0 = 1`);
    } else if (y === 1) {
      stepList.push(lang === 'TH' ? 'ตามกฎเลขยกกำลัง: จำนวนใดๆ ยกกำลัง 1 จะได้ค่าตัวเองเสมอ' : 'By exponent rules: Any base raised to the power of 1 equals itself.');
      stepList.push(`X^1 = X => ${x}^1 = ${x}`);
    } else if (Number.isInteger(y) && y > 0) {
      if (y <= 15) {
        const expansion = Array(y).fill(x).join(' * ');
        stepList.push(lang === 'TH' ? `คูณฐาน (X) เข้าด้วยกันจำนวน Y ครั้ง:` : `Multiply the base (X) by itself Y times:`);
        stepList.push(`= ${expansion}`);
        stepList.push(`= ${res.toLocaleString()}`);
      } else {
        stepList.push(lang === 'TH' ? `คูณฐาน (${x}) ซ้ำกันทั้งหมด ${y} ครั้ง` : `Multiply the base (${x}) by itself ${y} times`);
        stepList.push(`= ${res.toExponential(6)}`);
      }
    } else if (Number.isInteger(y) && y < 0) {
      const posExponent = Math.abs(y);
      stepList.push(lang === 'TH' ? 'ตามกฎเลขยกกำลัง: เลขชี้กำลังติดลบ ให้กลับเศษเป็นส่วน' : 'By exponent rules: X^-Y = 1 / X^Y');
      stepList.push(`= 1 / (${x}^${posExponent})`);
      if (posExponent <= 15) {
        const expansion = Array(posExponent).fill(x).join(' * ');
        stepList.push(`= 1 / (${expansion})`);
        const intermediate = Math.pow(x, posExponent);
        stepList.push(`= 1 / ${intermediate}`);
      }
      stepList.push(`= ${res}`);
    } else {
      // Fractional exponent
      stepList.push(lang === 'TH' ? 'เลขชี้กำลังเป็นทศนิยม/เศษส่วน:' : 'Fractional exponent:');
      stepList.push(`X^(a/b) = b-th root of (X^a)`);
      stepList.push(`${x}^${y} = ${res}`);
    }

    setSteps(stepList);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculateExponent(baseVal, exponentVal);
  };

  const handleReset = () => {
    setBaseVal('2');
    setExponentVal('8');
    setError('');
    setResult(256);
    setSteps([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Title */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3">
          <Zap className="h-8 w-8" />
          <h1 className="text-2xl md:text-3xl font-bold">
            {lang === 'TH' ? 'เครื่องมือคำนวณเลขยกกำลัง (X^Y)' : 'Exponent Calculator (X^Y)'}
          </h1>
        </div>
        <p className="mt-2 text-orange-100 text-sm md:text-base">
          {lang === 'TH'
            ? 'คำนวณหาผลลัพธ์ของ X ยกกำลัง Y พร้อมวิเคราะห์กฎและแสดงวิธีแก้สมการตามทฤษฎีเลขยกกำลังอย่างละเอียด'
            : 'Find the power of base X raised to exponent Y, including step-by-step expansions and negative/fractional rules.'}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Input Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:col-span-5 space-y-6">
          <div className="flex items-center space-x-2 border-b pb-3">
            <Calculator className="h-5 w-5 text-orange-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              {lang === 'TH' ? 'ใส่ตัวเลขคำนวณ' : 'Setup Inputs'}
            </h2>
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'เลขฐาน (X)' : 'Base (X)'}
              </label>
              <input
                type="number"
                step="any"
                value={baseVal}
                onChange={(e) => setBaseVal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                placeholder="เช่น 2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'เลขชี้กำลัง (Y)' : 'Exponent (Y)'}
              </label>
              <input
                type="number"
                step="any"
                value={exponentVal}
                onChange={(e) => setExponentVal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                placeholder="เช่น 8"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-100">
                {error}
              </div>
            )}

            <div className="flex space-x-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-150 ease-in-out shadow-sm text-center"
              >
                {lang === 'TH' ? 'คำนวณ' : 'Calculate'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-lg transition duration-150 ease-in-out"
                title={lang === 'TH' ? 'ล้างค่า' : 'Reset'}
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Output Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center space-x-2 border-b pb-3 mb-4">
              <Info className="h-5 w-5 text-orange-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                {lang === 'TH' ? 'ผลลัพธ์เลขยกกำลัง' : 'Exponent Results'}
              </h2>
            </div>

            {result !== null && !error ? (
              <div className="space-y-4">
                <div className="bg-orange-50 rounded-xl p-6 text-center border border-orange-100">
                  <span className="block text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1 font-mono">
                    {baseVal}^{exponentVal}
                  </span>
                  <span className="text-3xl md:text-5xl font-black text-orange-950 break-all">
                    {result > 1e12 || result < 1e-6 ? result.toExponential(8) : result.toLocaleString()}
                  </span>
                </div>

                {/* Show Steps */}
                {steps.length > 0 && (
                  <div className="mt-4 space-y-2.5 text-sm text-gray-700">
                    <h3 className="font-bold text-gray-800 text-base">
                      {lang === 'TH' ? 'วิธีคิดอย่างละเอียด:' : 'Step-by-step Solution:'}
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-1 font-mono text-xs md:text-sm border border-gray-200 overflow-x-auto">
                      {steps.map((step, index) => (
                        <div key={index} className={index === 0 ? 'text-gray-900 font-bold mb-1' : 'text-gray-700'}>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <HelpCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                {lang === 'TH' ? 'ป้อนข้อมูลตัวเลขฐาน X และเลขชี้กำลัง Y แล้วกดปุ่มคำนวณ' : 'Enter base X and exponent Y to see results'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thai SEO Article */}
      <article className="prose prose-orange max-w-none bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 text-gray-800 space-y-6">
        <header className="border-b pb-4">
          <h2 className="text-2xl font-bold text-orange-900 mb-2">
            เลขยกกำลัง (Exponent) คืออะไร? สรุปกฎและคุณสมบัติเลขยกกำลังอย่างละเอียด
          </h2>
          <p className="text-gray-500 text-sm">
            ทำความเข้าใจทฤษฎีเลขยกกำลัง วิธีหาผลลัพธ์ของเลขชี้กำลังที่เป็นบวก เป็นลบ และทศนิยม พร้อมตัวอย่างโจทย์และการประยุกต์ใช้งาน
          </p>
        </header>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">1. เลขยกกำลังคืออะไร?</h3>
          <p>
            ในทางคณิตศาสตร์ <strong>เลขยกกำลัง (Exponentiation / Power)</strong> คือ การดำเนินการทางคณิตศาสตร์ที่เขียนอยู่ในรูปของ 
            <strong> X<sup>Y</sup></strong> (อ่านออกเสียงว่า X ยกกำลัง Y) 
            โดยเรียกตัวแปร <strong>X ว่า &ldquo;ฐาน&rdquo; (Base)</strong> และเรียกตัวแปร <strong>Y ว่า &ldquo;เลขชี้กำลัง&rdquo; (Exponent หรือ Index)</strong>
          </p>
          <p>
            ความหมายดั้งเดิมคือ การนำจำนวนที่เป็นฐานมาคูณกันตามจำนวนครั้งของเลขชี้กำลัง เช่น 2<sup>3</sup> มีค่าเท่ากับ 2 &times; 2 &times; 2 = 8 
            โดยการเขียนในรูปเลขยกกำลังช่วยให้ประหยัดเนื้อที่ในการแสดงผลคูณของตัวเลขขนาดใหญ่ เช่น การคำนวณทางวิทยาศาสตร์และดาราศาสตร์
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">2. กฎและสมบัติที่สำคัญของเลขยกกำลัง</h3>
          <p>
            การดำเนินการเกี่ยวกับเลขยกกำลังมีสมบัติพื้นฐานที่ผู้เรียนจำเป็นต้องทราบเพื่อช่วยในการแก้ปัญหาคณิตศาสตร์ ดังนี้:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>การคูณเลขยกกำลังฐานเดียวกัน:</strong> X<sup>a</sup> &times; X<sup>b</sup> = X<sup>a + b</sup></li>
            <li><strong>การหารเลขยกกำลังฐานเดียวกัน:</strong> X<sup>a</sup> / X<sup>b</sup> = X<sup>a - b</sup> (เมื่อ X ไม่เท่ากับ 0)</li>
            <li><strong>เลขยกกำลังซ้อน:</strong> (X<sup>a</sup>)<sup>b</sup> = X<sup>a &times; b</sup></li>
            <li><strong>การกระจายเลขชี้กำลังในการคูณ:</strong> (XY)<sup>a</sup> = X<sup>a</sup> &times; Y<sup>a</sup></li>
            <li><strong>การกระจายเลขชี้กำลังในการหาร:</strong> (X / Y)<sup>a</sup> = X<sup>a</sup> / Y<sup>a</sup></li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">3. กรณีพิเศษของเลขชี้กำลัง</h3>
          <p>
            นอกจากเลขชี้กำลังที่เป็นจำนวนเต็มบวกแล้ว ยังมีกรณีพิเศษของเลขชี้กำลังที่มีข้อกำหนดตามกฎคณิตศาสตร์ ดังนี้:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
              <span className="block font-bold text-orange-950 font-mono text-center">X^0 = 1</span>
              <p className="text-xs text-gray-600 mt-2 text-center">ฐานใดๆ ยกกำลังศูนย์ จะได้ค่าเท่ากับ 1 เสมอ (ยกเว้น 0^0 ไม่มีนิยาม)</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
              <span className="block font-bold text-orange-950 font-mono text-center">X^-n = 1 / X^n</span>
              <p className="text-xs text-gray-600 mt-2 text-center">หากเลขชี้กำลังติดลบ ให้กลับเศษเป็นส่วนเพื่อให้กลายเป็นบวก</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
              <span className="block font-bold text-orange-950 font-mono text-center">X^(1/n) = รากที่ n ของ X</span>
              <p className="text-xs text-gray-600 mt-2 text-center">เลขชี้กำลังเป็นเศษส่วน หมายถึง รากทางคณิตศาสตร์ (Radical)</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">4. ตัวอย่างการคิดวิเคราะห์ทีละขั้นตอน</h3>
          
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
            <div>
              <p className="font-semibold">ตัวอย่างที่ 1: จงคำนวณหาค่าของ 5<sup>-3</sup></p>
              <p className="text-sm mt-1"><strong>วิธีทำ:</strong></p>
              <p className="text-sm">1. ตามกฎเลขชี้กำลังติดลบ: X<sup>-n</sup> = 1 / X<sup>n</sup></p>
              <p className="font-mono text-sm pl-4">5<sup>-3</sup> = 1 / 5<sup>3</sup></p>
              <p className="text-sm">2. คำนวณค่าของตัวส่วน 5<sup>3</sup> = 5 &times; 5 &times; 5 = 125</p>
              <p className="font-mono text-sm pl-4">5<sup>-3</sup> = 1 / 125</p>
              <p className="text-sm">3. แปลงเป็นทศนิยม (1 / 125) = 0.008</p>
              <p className="text-sm"><strong>คำตอบ:</strong> 5<sup>-3</sup> มีค่าเท่ากับ 0.008</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">5. ประโยชน์ของเครื่องมือคำนวณ X ยกกำลัง Y</h3>
          <p>
            เนื่องจากเลขยกกำลังมักจะเติบโตอย่างรวดเร็ว (Exponential Growth) เช่น การคำนวณดอกเบี้ยทบต้น (Compound Interest) 
            หรือการแบ่งตัวของแบคทีเรีย การคูณหาคำตอบด้วยมืออาจจะใช้เวลานานและตกหล่นได้ง่าย 
            เครื่องคำนวณนี้สามารถรองรับการระบุค่าชี้กำลังที่เป็นจำนวนทศนิยมและค่าติดลบได้อย่างรวดเร็ว 
            แสดงลำดับความคิดเพื่อให้แน่ใจว่าได้โครงสร้างคำตอบที่ถูกต้อง เป็นประโยชน์อย่างยิ่งสำหรับการศึกษาในระดับมัธยมและมหาวิทยาลัย
          </p>
        </section>
      </article>
    </div>
  );
}

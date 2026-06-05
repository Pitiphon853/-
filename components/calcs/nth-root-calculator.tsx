import React, { useState } from 'react';
import { Calculator, HelpCircle, Info, RefreshCw, Compass } from 'lucide-react';

export default function NthRootCalculator({ lang = 'TH' }: any) {
  const [numVal, setNumVal] = useState<string>('81');
  const [rootVal, setRootVal] = useState<string>('4');
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<any>({
    inputX: 81,
    inputN: 4,
    decimal: 3,
    hasRealRoot: true,
    steps: [
      'หาค่ารากที่ 4 ของ 81 (⁴√81)',
      'เนื่องจาก 81 เป็นจำนวนบวก และระดับราก (N=4) เป็นเลขคู่ จะได้คำตอบเป็นจำนวนจริงบวก',
      'ตามคำนิยาม: 3 * 3 * 3 * 3 = 81 ดังนั้น ⁴√81 = 3',
      'รากที่ 4 ของ 81 คือ 3'
    ]
  });

  const calculateNthRoot = (xStr: string, nStr: string) => {
    const x = parseFloat(xStr);
    const n = parseFloat(nStr);

    if (isNaN(x) || isNaN(n)) {
      setError(lang === 'TH' ? 'กรุณากรอกข้อมูลตัวเลขให้ถูกต้อง' : 'Please enter valid numbers');
      return;
    }

    if (n <= 0) {
      setError(lang === 'TH' ? 'ระดับราก (N) ต้องมากกว่า 0' : 'Root degree (N) must be greater than 0');
      return;
    }

    setError('');
    const stepList: string[] = [];
    const isNInteger = Number.isInteger(n);
    const isNEven = isNInteger && n % 2 === 0;
    const isNOdd = isNInteger && n % 2 !== 0;

    let finalResult: number | null = null;
    let hasRealRoot = true;

    stepList.push(lang === 'TH' ? `คำนวณรากที่ ${n} ของ ${x}` : `Calculate the ${n}-th root of ${x}`);

    if (x === 0) {
      finalResult = 0;
      stepList.push('รากใดๆ ของ 0 จะมีค่าเท่ากับ 0 เสมอ');
      stepList.push(`√0 = 0`);
    } else if (x < 0) {
      if (isNEven) {
        hasRealRoot = false;
        stepList.push(lang === 'TH' ? `เนื่องจากค่าของ X (${x}) เป็นลบ และระดับราก (N = ${n}) เป็นเลขคู่` : `Since X (${x}) is negative and the root degree (N = ${n}) is even:`);
        stepList.push(lang === 'TH' ? 'จึงไม่มีรากที่ N เป็นจำนวนจริง (ผลลัพธ์เป็นจำนวนเชิงซ้อน)' : 'No real root exists in the real number system (the result is a complex number).');
      } else if (isNOdd) {
        const absX = Math.abs(x);
        finalResult = -Math.pow(absX, 1 / n);
        stepList.push(lang === 'TH' ? `เนื่องจากระดับราก (N = ${n}) เป็นเลขคี่ จึงมีรากของจำนวนลบเป็นจำนวนจริงลบ` : `Since the root degree (N = ${n}) is odd, the root of a negative number is a negative real number.`);
        stepList.push(`รากที่ ${n} ของ ${x} = - (รากที่ ${n} ของ ${absX})`);
        stepList.push(`= - (${Math.pow(absX, 1 / n).toFixed(6)}) = ${finalResult.toFixed(6)}`);
      } else {
        // non-integer root of negative number
        hasRealRoot = false;
        stepList.push(lang === 'TH' ? 'ระดับรากทศนิยมของจำนวนติดลบไม่มีนิยามในจำนวนจริง' : 'Fractional roots of negative numbers do not yield real results.');
      }
    } else {
      // X > 0
      finalResult = Math.pow(x, 1 / n);
      stepList.push(`สูตร: X^(1/N) = ${x}^(1/${n})`);
      
      // Check if it's a perfect power
      let isPerfectPower = false;
      if (isNInteger) {
        const roundedRoot = Math.round(finalResult);
        if (Math.abs(Math.pow(roundedRoot, n) - x) < 1e-9) {
          isPerfectPower = true;
          stepList.push(lang === 'TH' ? `เนื่องจาก ${roundedRoot} คูณกันเอง ${n} ครั้ง ได้ ${x} พอดี` : `Since ${roundedRoot} multiplied by itself ${n} times equals ${x}:`);
          stepList.push(`${roundedRoot}^${n} = ${x} => รากที่ ${n} ของ ${x} คือ ${roundedRoot}`);
          finalResult = roundedRoot; // force exact integer
        }
      }
      
      if (!isPerfectPower) {
        stepList.push(`= ${finalResult.toFixed(8).replace(/\.?0+$/, '')}`);
      }
    }

    setResult({
      inputX: x,
      inputN: n,
      decimal: finalResult,
      hasRealRoot,
      steps: stepList
    });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculateNthRoot(numVal, rootVal);
  };

  const handleReset = () => {
    setNumVal('81');
    setRootVal('4');
    setError('');
    setResult({
      inputX: 81,
      inputN: 4,
      decimal: 3,
      hasRealRoot: true,
      steps: [
        'หาค่ารากที่ 4 ของ 81 (⁴√81)',
        'เนื่องจาก 81 เป็นจำนวนบวก และระดับราก (N=4) เป็นเลขคู่ จะได้คำตอบเป็นจำนวนจริงบวก',
        'ตามคำนิยาม: 3 * 3 * 3 * 3 = 81 ดังนั้น ⁴√81 = 3',
        'รากที่ 4 ของ 81 คือ 3'
      ]
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Title */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3">
          <Compass className="h-8 w-8" />
          <h1 className="text-2xl md:text-3xl font-bold">
            {lang === 'TH' ? 'เครื่องมือคำนวณหารากที่ N (Nth Root)' : 'Nth Root Calculator'}
          </h1>
        </div>
        <p className="mt-2 text-indigo-100 text-sm md:text-base">
          {lang === 'TH'
            ? 'คำนวณหารากลำดับที่ N ของตัวเลข X ถอดรากที่ 4, รากที่ 5 หรือรากใดๆ พร้อมวิเคราะห์เงื่อนไขเลขคู่/คี่อย่างละเอียด'
            : 'Find the N-th root of any real number X, with step-by-step guidance on real and complex root definitions.'}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Input Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:col-span-5 space-y-6">
          <div className="flex items-center space-x-2 border-b pb-3">
            <Calculator className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              {lang === 'TH' ? 'กรอกตัวเลขตั้งค่า' : 'Setup Inputs'}
            </h2>
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'ตัวเลขตั้งต้น (X)' : 'Number (X)'}
              </label>
              <input
                type="number"
                step="any"
                value={numVal}
                onChange={(e) => setNumVal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="เช่น 81"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'ระดับราก (N)' : 'Root Degree (N)'}
              </label>
              <input
                type="number"
                step="any"
                min="0.0001"
                value={rootVal}
                onChange={(e) => setRootVal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="เช่น 4"
                required
              />
              <span className="text-xs text-gray-400 block mt-1">
                {lang === 'TH' ? 'เช่น 2 = รากที่สอง, 3 = รากที่สาม, 4 = รากที่สี่' : 'E.g., 2 for square root, 3 for cube root, etc.'}
              </span>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-100">
                {error}
              </div>
            )}

            <div className="flex space-x-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-150 ease-in-out shadow-sm text-center"
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
              <Info className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                {lang === 'TH' ? 'ผลลัพธ์รากที่ N' : 'Nth Root Results'}
              </h2>
            </div>

            {result !== null && !error ? (
              <div className="space-y-4">
                <div className="bg-indigo-50 rounded-xl p-6 text-center border border-indigo-100">
                  <span className="block text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1 font-mono">
                    {result.inputN}&radic;({result.inputX})
                  </span>
                  <span className="text-2xl md:text-4xl font-black text-indigo-950 break-words">
                    {result.hasRealRoot 
                      ? result.decimal.toFixed(8).replace(/\.?0+$/, '') 
                      : (lang === 'TH' ? 'ไม่ใช่จำนวนจริง (No real root)' : 'No real root')
                    }
                  </span>
                </div>

                {/* Show Steps */}
                {result.steps.length > 0 && (
                  <div className="mt-4 space-y-2.5 text-sm text-gray-700">
                    <h3 className="font-bold text-gray-800 text-base">
                      {lang === 'TH' ? 'ขั้นตอนการคำนวณอย่างละเอียด:' : 'Detailed Math Reasoning:'}
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-1 font-mono text-xs md:text-sm border border-gray-200">
                      {result.steps.map((step: string, index: number) => (
                        <div key={index} className="text-gray-700">
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
                {lang === 'TH' ? 'ป้อนตัวเลข X และระดับราก N เพื่อถอดราก' : 'Enter number X and degree N to calculate'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thai SEO Article */}
      <article className="prose prose-indigo max-w-none bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 text-gray-800 space-y-6">
        <header className="border-b pb-4">
          <h2 className="text-2xl font-bold text-indigo-900 mb-2">
            รากที่ N (Nth Root) คืออะไร? เจาะลึกทฤษฎีและข้อกำหนดสำคัญของรากคณิตศาสตร์
          </h2>
          <p className="text-gray-500 text-sm">
            เรียนรู้บทนิยามของรากที่ N การหารากของตัวเลขที่เป็นจำนวนบวกและติดลบ พร้อมเงื่อนไขสำคัญที่ต้องรู้เมื่อระดับรากเป็นเลขคู่และเลขคี่
          </p>
        </header>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">1. นิยามของรากที่ N (Nth Root)</h3>
          <p>
            ในทางคณิตศาสตร์ <strong>รากที่ N (Nth Root)</strong> ของจำนวนจริง x เขียนแทนด้วยสัญลักษณ์ 
            <strong> <sup>N</sup>&radic;x</strong> คือ จำนวน y ที่เมื่อนำมายกกำลัง N แล้วมีค่าเท่ากับ x หรือแสดงด้วยสมการ:
          </p>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-center font-mono my-4">
            <span className="block text-lg font-bold text-indigo-950">y<sup>N</sup> = x &rArr; y = <sup>N</sup>&radic;x = x<sup>1/N</sup></span>
          </div>
          <p>
            โดยที่ <strong>N คือระดับราก (Index หรือ Degree)</strong> ซึ่งมักกำหนดให้เป็นจำนวนเต็มบวกที่มากกว่าหรือเท่ากับ 1 
            (เช่น N=2 คือรากที่สอง, N=3 คือรากที่สาม, N=4 คือรากที่สี่ เป็นต้น)
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">2. เงื่อนไขและกฎสำคัญเกี่ยวกับระดับรากเลขคู่และเลขคี่</h3>
          <p>
            การหาค่ารากที่ N ของจำนวนจริง มีความละเอียดอ่อนในเรื่องของเครื่องหมายบวกลบ ซึ่งเราสามารถแบ่งกรณีออกตามลักษณะของระดับราก N ได้ดังนี้:
          </p>
          <ul className="list-style-none pl-0 space-y-3">
            <li className="bg-gray-50 p-3 rounded-lg border-l-4 border-indigo-500">
              <strong className="text-indigo-950">กรณีที่ 1: เมื่อ N เป็นเลขคู่ (เช่น 2, 4, 6, 8)</strong>
              <p className="text-sm text-gray-600 mt-1">
                - ถ้า x เป็นจำนวนจริงบวก จะมีรากที่ N ที่เป็นจำนวนจริงสองค่าเสมอ (ค่าบวกและค่าลบ) แต่ค่ากรณฑ์หลักจะตอบค่าบวก 
                ตัวอย่างเช่น รากที่ 4 ของ 16 คือ 2 และ -2 (เนื่องจาก 2⁴ = 16 และ (-2)⁴ = 16)
                <br />
                - ถ้า x เป็นจำนวนจริงลบ <strong>จะไม่มีคำตอบที่เป็นจำนวนจริง</strong> เพราะไม่มีจำนวนจริงใดๆ ที่ยกกำลังเลขคู่แล้วได้ผลลัพธ์เป็นค่าติดลบ
              </p>
            </li>
            <li className="bg-gray-50 p-3 rounded-lg border-l-4 border-indigo-500">
              <strong className="text-indigo-950">กรณีที่ 2: เมื่อ N เป็นเลขคี่ (เช่น 3, 5, 7, 9)</strong>
              <p className="text-sm text-gray-600 mt-1">
                - ไม่ว่า x จะเป็นจำนวนบวกหรือจำนวนลบ <strong>จะมีคำตอบเป็นจำนวนจริงตัวเดียวเสมอ</strong> 
                โดยเครื่องหมายของผลลัพธ์จะเป็นไปตามเครื่องหมายของ x 
                ตัวอย่างเช่น รากที่ 5 ของ 32 คือ 2 (เนื่องจาก 2⁵ = 32) และรากที่ 5 ของ -32 คือ -2 (เนื่องจาก (-2)⁵ = -32)
              </p>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">3. ตัวอย่างการถอดรากที่ N ทีละขั้นตอน</h3>
          <p className="font-semibold">โจทย์ตัวอย่าง: จงหารากที่ 4 ของ 81 (⁴&radic;81)</p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2 text-sm">
            <p><strong>วิธีคิดวิเคราะห์:</strong></p>
            <p>1. ตรวจสอบเงื่อนไข: x = 81 (เป็นบวก) และ N = 4 (เป็นจำนวนคู่) ดังนั้น มีคำตอบในระบบจำนวนจริงแน่นอน</p>
            <p>2. จัดรูปตัวเลข 81 ให้อยู่ในรูปเลขยกกำลังที่มีตัวชี้กำลังเท่ากับ 4:</p>
            <p className="font-mono pl-4">81 = 3 &times; 3 &times; 3 &times; 3 = 3⁴</p>
            <p>3. แทนค่าลงไปในสัญลักษณ์ราก:</p>
            <p className="font-mono pl-4">⁴&radic;81 = ⁴&radic;(3⁴)</p>
            <p>4. ปรับสมการถอดราก: ⁴&radic;(3⁴) = 3<sup>4/4</sup> = 3¹ = 3</p>
            <p><strong>คำตอบ:</strong> รากที่ 4 ของ 81 คือ 3</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">4. ประโยชน์ของเครื่องถอดรากที่ N ออนไลน์</h3>
          <p>
            ในทางคณิตศาสตร์ระดับสูงหรือการประยุกต์ใช้งานจริง เช่น การคำนวณอัตราเติบโตเฉลี่ยสะสมต่อปี (CAGR) ในทางการเงิน 
            สูตรการหาคือ CAGR = (End/Start)<sup>1/n</sup> - 1 ซึ่งจำเป็นต้องถอดรากที่ N ของอัตราส่วนสินทรัพย์ 
            รวมถึงสูตรทางฟิสิกส์ วิศวกรรมศาสตร์ และวิทยาศาสตร์ข้อมูล การคิดหาค่ารากที่ไม่ใช่ค่าลงตัว เช่น รากที่ 5 ของ 150 
            ไม่สามารถหาได้ด้วยวิธีคิดในใจ การมีเครื่องคำนวณรากที่ N แบบออนไลน์ช่วยอำนวยความสะดวก ประหยัดเวลา และให้ผลลัพธ์ทศนิยมที่แม่นยำสูง
          </p>
        </section>
      </article>
    </div>
  );
}

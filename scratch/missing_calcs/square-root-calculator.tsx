import React, { useState } from 'react';
import { Calculator, HelpCircle, Info, RefreshCw, Layers } from 'lucide-react';

export default function SquareRootCalculator({ lang = 'TH' }: any) {
  const [numVal, setNumVal] = useState<string>('25');
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<any>({
    input: 25,
    decimal: 5,
    isPerfect: true,
    simplified: '5',
    isImaginary: false,
    steps: [
      'หาค่ารากที่สองของ 25',
      'เนื่องจาก 5 * 5 = 25 ดังนั้น √25 = 5',
      'ค่ารากที่สองที่เป็นจำนวนจริงบวก (Principal Square Root) คือ 5'
    ]
  });

  const simplifySquareRoot = (n: number): { outer: number; inner: number } => {
    let outer = 1;
    let inner = n;
    const limit = Math.floor(Math.sqrt(n));
    for (let i = limit; i >= 2; i--) {
      if (n % (i * i) === 0) {
        outer = i;
        inner = n / (i * i);
        break;
      }
    }
    return { outer, inner };
  };

  const calculateSquareRoot = (valStr: string) => {
    const val = parseFloat(valStr);
    if (isNaN(val)) {
      setError(lang === 'TH' ? 'กรุณากรอกตัวเลขที่ถูกต้อง' : 'Please enter a valid number');
      return;
    }

    setError('');
    const stepList: string[] = [];
    const isImaginary = val < 0;
    const absVal = Math.abs(val);
    const rootVal = Math.sqrt(absVal);
    const isPerfect = Number.isInteger(rootVal);

    let simplifiedText = '';
    
    if (absVal === 0) {
      simplifiedText = '0';
      stepList.push(lang === 'TH' ? 'รากที่สองของ 0 คือ 0' : 'The square root of 0 is 0');
      stepList.push('√0 = 0');
    } else {
      if (Number.isInteger(absVal)) {
        const { outer, inner } = simplifySquareRoot(absVal);
        if (outer > 1) {
          if (inner === 1) {
            simplifiedText = isImaginary ? `${outer}i` : `${outer}`;
          } else {
            simplifiedText = isImaginary ? `${outer}√${inner} i` : `${outer}√${inner}`;
          }
        } else {
          simplifiedText = isImaginary ? `√${absVal} i` : `√${absVal}`;
        }
      } else {
        simplifiedText = isImaginary ? `√${absVal} i` : `√${absVal}`;
      }

      if (isImaginary) {
        stepList.push(lang === 'TH' ? `ตัวเลขติดลบ (${val}) มีรากที่สองเป็นจำนวนจินตภาพ` : `Negative number (${val}) has an imaginary square root`);
        stepList.push(`√(${val}) = √(${absVal}) * i`);
        if (isPerfect) {
          stepList.push(`เนื่องจาก ${rootVal} * ${rootVal} = ${absVal}`);
          stepList.push(`ดังนั้น √(${absVal}) = ${rootVal}`);
          stepList.push(`คำตอบในรูปจำนวนจินตภาพคือ ${rootVal}i`);
        } else {
          const { outer, inner } = simplifySquareRoot(absVal);
          if (outer > 1) {
            stepList.push(`ถอดสแควรูทของ ${absVal} ในรูปกรณฑ์อย่างง่าย: √(${absVal}) = √(${outer * outer} * ${inner}) = ${outer}√${inner}`);
            stepList.push(`คำตอบในรูปจำนวนจินตภาพคือ ${outer}√${inner} i`);
          }
        }
      } else {
        stepList.push(lang === 'TH' ? `หาค่าสแควรูทของ ${val}` : `Find the square root of ${val}`);
        if (isPerfect) {
          stepList.push(`เนื่องจาก ${rootVal} * ${rootVal} = ${val}`);
          stepList.push(`ดังนั้น √${val} = ${rootVal}`);
        } else {
          if (Number.isInteger(val)) {
            const { outer, inner } = simplifySquareRoot(val);
            if (outer > 1) {
              stepList.push(`แยกตัวประกอบที่เป็นเลขกำลังสองสมบูรณ์: √${val} = √(${outer * outer} * ${inner})`);
              stepList.push(`ถอดสแควรูทของเลขกำลังสองสมบูรณ์ออกข้างนอก: = ${outer}√${inner}`);
            } else {
              stepList.push(lang === 'TH' ? 'ไม่สามารถแยกตัวประกอบกำลังสองสมบูรณ์เพื่อทำเป็นรูปอย่างง่ายได้' : 'Cannot simplify further using perfect square factors');
            }
          }
        }
      }
    }

    setResult({
      input: val,
      decimal: rootVal,
      isPerfect,
      simplified: simplifiedText,
      isImaginary,
      steps: stepList
    });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculateSquareRoot(numVal);
  };

  const handleReset = () => {
    setNumVal('25');
    setError('');
    setResult({
      input: 25,
      decimal: 5,
      isPerfect: true,
      simplified: '5',
      isImaginary: false,
      steps: [
        'หาค่ารากที่สองของ 25',
        'เนื่องจาก 5 * 5 = 25 ดังนั้น √25 = 5',
        'ค่ารากที่สองที่เป็นจำนวนจริงบวก (Principal Square Root) คือ 5'
      ]
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Title */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3">
          <Calculator className="h-8 w-8" />
          <h1 className="text-2xl md:text-3xl font-bold">
            {lang === 'TH' ? 'เครื่องมือคำนวณหารากที่สอง (Square Root)' : 'Square Root Calculator'}
          </h1>
        </div>
        <p className="mt-2 text-teal-100 text-sm md:text-base">
          {lang === 'TH'
            ? 'ถอดรากที่สอง (Square Root) ของตัวเลข แสดงทศนิยมและรูปกรณฑ์อย่างง่าย (Simplified Radical) พร้อมวิธีแปลงเลขจินตภาพ'
            : 'Find the square root, simplify the radical form, and compute imaginary numbers step-by-step.'}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Input Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:col-span-5 space-y-6">
          <div className="flex items-center space-x-2 border-b pb-3">
            <Layers className="h-5 w-5 text-teal-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              {lang === 'TH' ? 'กรอกตัวเลขที่ต้องการถอดราก' : 'Setup Input'}
            </h2>
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'ตัวเลข (X)' : 'Number (X)'}
              </label>
              <input
                type="number"
                step="any"
                value={numVal}
                onChange={(e) => setNumVal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                placeholder="เช่น 25"
                required
              />
              <span className="text-xs text-gray-400 block mt-1">
                {lang === 'TH' ? 'รองรับจำนวนเต็ม ทศนิยม และจำนวนลบ (ผลลัพธ์จะเป็นจำนวนจินตภาพ)' : 'Supports integers, decimals, and negative numbers (imaginary results)'}
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
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-150 ease-in-out shadow-sm text-center"
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
              <Info className="h-5 w-5 text-teal-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                {lang === 'TH' ? 'ผลลัพธ์การคำนวณ' : 'Calculation Results'}
              </h2>
            </div>

            {result !== null && !error ? (
              <div className="space-y-4">
                <div className="bg-teal-50 rounded-xl p-6 text-center border border-teal-100">
                  <span className="block text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1 font-mono">
                    &radic;({result.input})
                  </span>
                  <span className="text-3xl md:text-5xl font-black text-teal-950 break-words">
                    {result.isImaginary 
                      ? `${result.decimal.toFixed(6)} i` 
                      : result.decimal.toFixed(6).replace(/\.?0+$/, '')
                    }
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm font-mono text-center">
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <span className="block text-xs text-gray-500">{lang === 'TH' ? 'รูปกรณฑ์อย่างง่าย' : 'Simplified Form'}</span>
                    <span className="font-bold text-gray-800 text-base">{result.simplified}</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <span className="block text-xs text-gray-500">{lang === 'TH' ? 'กำลังสองสมบูรณ์?' : 'Perfect Square?'}</span>
                    <span className="font-bold text-gray-800 text-base">
                      {result.isPerfect && !result.isImaginary 
                        ? (lang === 'TH' ? 'ใช่' : 'Yes') 
                        : (lang === 'TH' ? 'ไม่ใช่' : 'No')
                      }
                    </span>
                  </div>
                </div>

                {/* Show Steps */}
                {result.steps.length > 0 && (
                  <div className="mt-4 space-y-2.5 text-sm text-gray-700">
                    <h3 className="font-bold text-gray-800 text-base">
                      {lang === 'TH' ? 'วิธีคิดและเหตุผล:' : 'Steps and Explanations:'}
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
                {lang === 'TH' ? 'ป้อนตัวเลข X เพื่อถอดรากที่สอง' : 'Enter number X to calculate square root'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thai SEO Article */}
      <article className="prose prose-teal max-w-none bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 text-gray-800 space-y-6">
        <header className="border-b pb-4">
          <h2 className="text-2xl font-bold text-teal-900 mb-2">
            สแควรูท หรือ รากที่สอง (Square Root) คืออะไร? วิธีถอดรากอย่างง่ายและเป็นขั้นตอน
          </h2>
          <p className="text-gray-500 text-sm">
            บทความสำหรับเรียนรู้เกี่ยวกับนิยามรากที่สอง การถอดรากที่สองของจำนวนจริงบวกและจำนวนจริงลบ พร้อมกับวิธีแปลงรากในรูปกรณฑ์อย่างง่าย
          </p>
        </header>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">1. นิยามของรากที่สอง (Square Root)</h3>
          <p>
            ในทางคณิตศาสตร์ <strong>รากที่สอง (Square Root)</strong> ของจำนวนจริง x คือ จำนวน y ที่เมื่อนำมาคูณตัวเอง (หรือยกกำลังสอง) 
            แล้วได้ผลลัพธ์เท่ากับ x เขียนแทนด้วยสมการ:
          </p>
          <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 text-center font-mono my-4">
            <span className="block text-lg font-bold text-teal-950">y&sup2; = x &rArr; y = &radic;x</span>
          </div>
          <p>
            ตัวอย่างเช่น รากที่สองของ 9 คือ 3 และ -3 เนื่องจากทั้ง 3&sup2; = 9 และ (-3)&sup2; = 9 
            อย่างไรก็ตาม สัญลักษณ์เครื่องหมายกรณฑ์ <strong>&radic;</strong> จะใช้แทนเฉพาะ 
            <strong>รากที่สองที่เป็นจำนวนจริงบวก (Principal Square Root)</strong> เท่านั้น ดังนั้น &radic;9 = 3
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">2. เลขกำลังสองสมบูรณ์ (Perfect Square)</h3>
          <p>
            จำนวนเต็มบวกที่สามารถถอดรากที่สองแล้วได้คำตอบเป็นจำนวนเต็มลงตัวพอดี เราจะเรียกว่า 
            <strong>กำลังสองสมบูรณ์ (Perfect Square)</strong> ตัวอย่างตัวเลขสแควรูทที่เป็นที่นิยมได้แก่:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>&radic;1 = 1 (เนื่องจาก 1 &times; 1 = 1)</li>
            <li>&radic;4 = 2 (เนื่องจาก 2 &times; 2 = 4)</li>
            <li>&radic;9 = 3 (เนื่องจาก 3 &times; 3 = 9)</li>
            <li>&radic;16 = 4 (เนื่องจาก 4 &times; 4 = 16)</li>
            <li>&radic;25 = 5, &radic;36 = 6, &radic;49 = 7, &radic;64 = 8, &radic;81 = 9, &radic;100 = 10</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">3. วิธีทำตัวเลขในรูปกรณฑ์อย่างง่าย (Simplified Radical Form)</h3>
          <p>
            สำหรับตัวเลขที่ไม่ใช่กำลังสองสมบูรณ์ เช่น 8, 12, 18 เรามักจะไม่ตอบเป็นทศนิยมยาวๆ ในวิชาคณิตศาสตร์ 
            แต่จะนิยมจัดรูปให้อยู่ในรูปอย่างง่าย โดยการหาเลขกำลังสองสมบูรณ์ที่ใหญ่ที่สุดที่หารตัวเลขนั้นลงตัว แล้วแยกคิดรากออกมา 
            มีตัวอย่างขั้นตอนดังนี้:
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2 font-mono text-sm">
            <p className="font-semibold text-gray-800">ตัวอย่าง: การทำให้ &radic;12 อยู่ในรูปอย่างง่าย</p>
            <p>1. แยกตัวประกอบของ 12: 12 = 4 &times; 3 (เลือก 4 เนื่องจากเป็นกำลังสองสมบูรณ์)</p>
            <p>2. จัดรูปใหม่อยู่ใต้กรณฑ์: &radic;12 = &radic;(4 &times; 3)</p>
            <p>3. ใช้สมบัติการแยกกรณฑ์: &radic;(4 &times; 3) = &radic;4 &times; &radic;3</p>
            <p>4. ถอดรากของกำลังสองสมบูรณ์: &radic;4 = 2</p>
            <p>5. ผลลัพธ์สุดท้าย: 2&radic;3</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">4. รากที่สองของตัวเลขติดลบ (จำนวนจินตภาพ)</h3>
          <p>
            ในระบบจำนวนจริง เราจะไม่สามารถหารากที่สองของตัวเลขติดลบได้ เนื่องจากไม่มีจำนวนจริงใดๆ ที่คูณกันเองแล้วผลลัพธ์เป็นลบ 
            แต่ในระบบจำนวนเชิงซ้อน (Complex Numbers) เราจะนิยามหน่วยจินตภาพ <strong>i = &radic;(-1)</strong> 
            ทำให้เราสามารถเขียนรากที่สองของจำนวนลบได้ เช่น รากที่สองของ -25 จะเท่ากับ &radic;25 &times; &radic;(-1) = 5i
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">5. ประโยชน์ของสแควรูทในทางปฏิบัติ</h3>
          <p>
            การถอดรากที่สองมีบทบาทในการคำนวณสูตรตรีโกณมิติ เช่น <strong>ทฤษฎีบทพีทาโกรัส</strong> (หาความยาวด้านตรงข้ามมุมฉาก c = &radic;(a&sup2; + b&sup2;)) 
            การคำนวณหาส่วนเบี่ยงเบนมาตรฐาน (Standard Deviation) ในวิชาสถิติ และการวิเคราะห์ทางฟิสิกส์เกี่ยวกับการคำนวณหาความเร็วหรือแรงโน้มถ่วง 
            การใช้เครื่องถอดรากที่สองช่วยลดความยุ่งยากในการเดาและประมาณค่าตัวเลขจำนวนทศนิยม และแปลงให้อยู่ในรูปอย่างง่ายได้ภายในเสี้ยววินาที
          </p>
        </section>
      </article>
    </div>
  );
}

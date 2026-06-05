import React, { useState } from 'react';
import { Calculator, HelpCircle, Info, RefreshCw, Layers } from 'lucide-react';

export default function CubeRootCalculator({ lang = 'TH' }: any) {
  const [numVal, setNumVal] = useState<string>('27');
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<any>({
    input: 27,
    decimal: 3,
    isPerfect: true,
    simplified: '3',
    steps: [
      'หาค่ารากที่สามของ 27',
      'เนื่องจาก 3 * 3 * 3 = 27 ดังนั้น ³√27 = 3',
      'ค่ารากที่สามของ 27 คือ 3'
    ]
  });

  const simplifyCubeRoot = (n: number): { outer: number; inner: number } => {
    let outer = 1;
    let inner = n;
    const limit = Math.floor(Math.pow(n, 1 / 3)) + 1;
    for (let i = limit; i >= 2; i--) {
      const cube = i * i * i;
      if (n % cube === 0) {
        outer = i;
        inner = n / cube;
        break;
      }
    }
    return { outer, inner };
  };

  const calculateCubeRoot = (valStr: string) => {
    const val = parseFloat(valStr);
    if (isNaN(val)) {
      setError(lang === 'TH' ? 'กรุณากรอกตัวเลขที่ถูกต้อง' : 'Please enter a valid number');
      return;
    }

    setError('');
    const stepList: string[] = [];
    const absVal = Math.abs(val);
    const rootVal = Math.cbrt(val);
    const rootAbsVal = Math.cbrt(absVal);
    const isPerfect = Number.isInteger(rootAbsVal);

    let simplifiedText = '';

    if (val === 0) {
      simplifiedText = '0';
      stepList.push(lang === 'TH' ? 'รากที่สามของ 0 คือ 0' : 'The cube root of 0 is 0');
      stepList.push('³√0 = 0');
    } else {
      if (Number.isInteger(absVal)) {
        const { outer, inner } = simplifyCubeRoot(absVal);
        const sign = val < 0 ? '-' : '';
        if (outer > 1) {
          if (inner === 1) {
            simplifiedText = `${sign}${outer}`;
          } else {
            simplifiedText = `${sign}${outer}³√${inner}`;
          }
        } else {
          simplifiedText = `${sign}³√${absVal}`;
        }
      } else {
        simplifiedText = `³√${val}`;
      }

      stepList.push(lang === 'TH' ? `หาค่ารากที่สาม (Cube Root) ของ ${val}` : `Find the cube root of ${val}`);
      if (val < 0) {
        stepList.push(lang === 'TH' ? 'เนื่องจากเป็นตัวเลขติดลบ รากที่สามของจำนวนลบจะได้คำตอบเป็นจำนวนจริงลบ' : 'Since the input is negative, the cube root will also be a negative real number');
        stepList.push(`³√(${val}) = - ³√(${absVal})`);
      }

      if (isPerfect) {
        stepList.push(`เนื่องจาก ${rootAbsVal} * ${rootAbsVal} * ${rootAbsVal} = ${absVal}`);
        stepList.push(`ดังนั้น ³√${absVal} = ${rootAbsVal}`);
        if (val < 0) {
          stepList.push(`คำตอบสุดท้ายคือ -${rootAbsVal}`);
        }
      } else {
        if (Number.isInteger(absVal)) {
          const { outer, inner } = simplifyCubeRoot(absVal);
          if (outer > 1) {
            stepList.push(`แยกตัวประกอบที่มีเลขกำลังสามสมบูรณ์: ³√${absVal} = ³√(${outer * outer * outer} * ${inner})`);
            stepList.push(`ถอดรากที่สามของเลขกำลังสามสมบูรณ์ออกข้างนอก: = ${outer}³√${inner}`);
            if (val < 0) {
              stepList.push(`ผลลัพธ์สุดท้ายเมื่อมีเครื่องหมายลบ: -${outer}³√${inner}`);
            }
          } else {
            stepList.push(lang === 'TH' ? 'ไม่สามารถจัดรูปกรณฑ์อย่างง่ายโดยตัวประกอบกำลังสามสมบูรณ์ได้' : 'Cannot simplify further using perfect cube factors');
          }
        }
      }
    }

    setResult({
      input: val,
      decimal: rootVal,
      isPerfect,
      simplified: simplifiedText,
      steps: stepList
    });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCubeRoot(numVal);
  };

  const handleReset = () => {
    setNumVal('27');
    setError('');
    setResult({
      input: 27,
      decimal: 3,
      isPerfect: true,
      simplified: '3',
      steps: [
        'หาค่ารากที่สามของ 27',
        'เนื่องจาก 3 * 3 * 3 = 27 ดังนั้น ³√27 = 3',
        'ค่ารากที่สามของ 27 คือ 3'
      ]
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Title */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3">
          <Calculator className="h-8 w-8" />
          <h1 className="text-2xl md:text-3xl font-bold">
            {lang === 'TH' ? 'เครื่องมือคำนวณหารากที่สาม (Cube Root)' : 'Cube Root Calculator'}
          </h1>
        </div>
        <p className="mt-2 text-cyan-100 text-sm md:text-base">
          {lang === 'TH'
            ? 'คำนวณหารากที่สาม (Cube Root) ของจำนวนจริง แสดงค่าทศนิยมที่แม่นยำและวิธีจัดรูปกรณฑ์อย่างง่าย (Simplified Radical)'
            : 'Calculate the cube root of any number, find simplified radical form, and view step-by-step methods.'}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Input Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:col-span-5 space-y-6">
          <div className="flex items-center space-x-2 border-b pb-3">
            <Layers className="h-5 w-5 text-cyan-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              {lang === 'TH' ? 'กรอกตัวเลขถอดราก' : 'Setup Input'}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                placeholder="เช่น 27"
                required
              />
              <span className="text-xs text-gray-400 block mt-1">
                {lang === 'TH' ? 'รองรับจำนวนเต็มและทศนิยม ทั้งค่าบวกและค่าลบ' : 'Supports integers, decimals, positive and negative numbers'}
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
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-150 ease-in-out shadow-sm text-center"
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
              <Info className="h-5 w-5 text-cyan-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                {lang === 'TH' ? 'ผลลัพธ์รากที่สาม' : 'Cube Root Results'}
              </h2>
            </div>

            {result !== null && !error ? (
              <div className="space-y-4">
                <div className="bg-cyan-50 rounded-xl p-6 text-center border border-cyan-100">
                  <span className="block text-xs font-semibold text-cyan-600 uppercase tracking-wider mb-1 font-mono">
                    &sup3;&radic;({result.input})
                  </span>
                  <span className="text-3xl md:text-5xl font-black text-cyan-950 break-words">
                    {result.decimal.toFixed(6).replace(/\.?0+$/, '')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm font-mono text-center">
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <span className="block text-xs text-gray-500">{lang === 'TH' ? 'รูปกรณฑ์อย่างง่าย' : 'Simplified Form'}</span>
                    <span className="font-bold text-gray-800 text-base">{result.simplified}</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <span className="block text-xs text-gray-500">{lang === 'TH' ? 'ลูกบาศก์สมบูรณ์?' : 'Perfect Cube?'}</span>
                    <span className="font-bold text-gray-800 text-base">
                      {result.isPerfect 
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
                      {lang === 'TH' ? 'วิธีคำนวณและเหตุผล:' : 'Steps and Explanations:'}
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
                {lang === 'TH' ? 'ป้อนตัวเลข X เพื่อถอดรากที่สาม' : 'Enter number X to calculate cube root'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thai SEO Article */}
      <article className="prose prose-cyan max-w-none bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 text-gray-800 space-y-6">
        <header className="border-b pb-4">
          <h2 className="text-2xl font-bold text-cyan-900 mb-2">
            รากที่สาม (Cube Root) คืออะไร? เรียนรู้นิยาม สูตร และการจัดรูปกรณฑ์อย่างง่าย
          </h2>
          <p className="text-gray-500 text-sm">
            ค้นหาข้อมูลเกี่ยวกับรากที่สามของจำนวนจริงบวกและลบ ค้นหาจำนวนกำลังสามสมบูรณ์ วิธีถอดรากที่สามพร้อมแสดงวิธีทำอย่างละเอียด
          </p>
        </header>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">1. นิยามของรากที่สาม (Cube Root)</h3>
          <p>
            ในทางคณิตศาสตร์ <strong>รากที่สาม (Cube Root)</strong> ของจำนวนจริง x คือ จำนวน y ที่เมื่อนำมาคูณตัวเอง 3 ครั้ง (หรือยกกำลังสาม) 
            แล้วได้ผลลัพธ์เท่ากับ x เขียนแทนด้วยสัญลักษณ์:
          </p>
          <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-100 text-center font-mono my-4">
            <span className="block text-lg font-bold text-cyan-950">y&sup3; = x &rArr; y = &sup3;&radic;x</span>
          </div>
          <p>
            จุดประสงค์ที่แตกต่างอย่างเห็นได้ชัดจากรากที่สองก็คือ <strong>รากที่สามของจำนวนจริงใดๆ จะมีคำตอบเป็นจำนวนจริงเพียงตัวเดียวเสมอ</strong> 
            และรากที่สามของจำนวนลบก็จะมีคำตอบเป็นจำนวนจริงลบด้วยเช่นกัน ตัวอย่างเช่น:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>รากที่สามของ 8 คือ 2 (เนื่องจาก 2 &times; 2 &times; 2 = 8)</li>
            <li>รากที่สามของ -8 คือ -2 (เนื่องจาก (-2) &times; (-2) &times; (-2) = -8)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">2. ลูกบาศก์สมบูรณ์ (Perfect Cube) ที่ควรทราบ</h3>
          <p>
            จำนวนเต็มบวกที่เมื่อนำมาถอดรากที่สามแล้วให้ผลลัพธ์เป็นจำนวนเต็มลงตัวพอดี เรียกว่า <strong>ลูกบาศก์สมบูรณ์ (Perfect Cube)</strong> 
            ค่าตัวอย่างที่พบได้บ่อย ได้แก่:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>&sup3;&radic;1 = 1</li>
            <li>&sup3;&radic;8 = 2</li>
            <li>&sup3;&radic;27 = 3</li>
            <li>&sup3;&radic;64 = 4</li>
            <li>&sup3;&radic;125 = 5</li>
            <li>&sup3;&radic;216 = 6</li>
            <li>&sup3;&radic;343 = 7</li>
            <li>&sup3;&radic;512 = 8</li>
            <li>&sup3;&radic;729 = 9</li>
            <li>&sup3;&radic;1000 = 10</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">3. วิธีการจัดรูปกรณฑ์อย่างง่าย (Simplified Radical Form)</h3>
          <p>
            ในทำนองเดียวกันกับสแควรูท หากตัวเลขของเราไม่ใช่ลูกบาศก์สมบูรณ์ เช่น 24 หรือ 54 เราสามารถจัดให้สวยงาม 
            โดยการหาตัวเลขที่เป็นลูกบาศก์สมบูรณ์ที่ใหญ่ที่สุดที่หารมันลงตัว แยกคำนวณออกมาด้านนอกเครื่องหมายกรณฑ์:
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2 font-mono text-sm">
            <p className="font-semibold text-gray-800">ตัวอย่าง: วิธีการทำ &sup3;&radic;54 ให้เป็นรูปอย่างง่าย</p>
            <p>1. หาตัวประกอบที่เป็นลูกบาศก์สมบูรณ์: 54 = 27 &times; 2 (เลือก 27 เนื่องจาก 3&sup3; = 27)</p>
            <p>2. จัดเขียนในกรณฑ์: &sup3;&radic;54 = &sup3;&radic;(27 &times; 2)</p>
            <p>3. แยกคิดเฉพาะราก: &sup3;&radic;(27 &times; 2) = &sup3;&radic;27 &times; &sup3;&radic;2</p>
            <p>4. ถอดรากที่สามของ 27 ได้ 3: = 3 &times; &sup3;&radic;2</p>
            <p>5. คำตอบกรณฑ์อย่างง่าย: 3&sup3;&radic;2</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">4. ประโยชน์และความแตกต่างกับการหารากอื่นๆ</h3>
          <p>
            รากที่สามมีความสำคัญในโจทย์ปัญหาเกี่ยวกับ <strong>ปริมาตรทรงลูกบาศก์ (Volume of Cube)</strong> 
            เนื่องจากสูตรของปริมาตรคือ V = s&sup3; (ด้านกำลังสาม) หากเราต้องการทราบความยาวด้านของลูกบาศก์เมื่อทราบค่าปริมาตร 
            เราจะถอดรากที่สามของปริมาตรนั้น: s = &sup3;&radic;V 
            นอกจากนี้ ในทางฟิสิกส์ การคำนวณเกี่ยวกับคาบวงโคจรของดาวเคราะห์และมวลความหนาแน่นก็นิยมใช้รากที่สาม 
            เครื่องคำนวณออนไลน์จะสามารถแปลงค่าผลลัพธ์ทศนิยมที่ละเอียดยิบและจัดรูปกรณฑ์ทำให้ประหยัดเวลาได้อย่างยิ่ง
          </p>
        </section>
      </article>
    </div>
  );
}

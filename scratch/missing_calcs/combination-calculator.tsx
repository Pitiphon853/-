import React, { useState } from 'react';
import { Calculator, HelpCircle, Info, RefreshCw, Layers } from 'lucide-react';

export default function CombinationCalculator({ lang = 'TH' }: any) {
  const [nVal, setNVal] = useState<string>('7');
  const [rVal, setRVal] = useState<string>('3');
  const [allowRepetitive, setAllowRepetitive] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<number | null>(35);
  const [steps, setSteps] = useState<any>({
    n: 7,
    r: 3,
    formula: 'C(n, r) = n! / (r! * (n-r)!)',
    substituted: 'C(7, 3) = 7! / (3! * 4!)',
    expansion: '7 * 6 * 5 / (3 * 2 * 1)',
    numerator: 210,
    denominator: 6,
    result: 35
  });

  const calculateCombination = (n: number, r: number, repeat: boolean) => {
    if (isNaN(n) || isNaN(r)) {
      setError(lang === 'TH' ? 'กรุณากรอกตัวเลขให้ถูกต้อง' : 'Please enter valid numbers');
      return;
    }
    if (n < 0 || r < 0) {
      setError(lang === 'TH' ? 'ค่า n และ r ต้องไม่ติดลบ' : 'n and r must be non-negative');
      return;
    }
    if (!repeat && r > n) {
      setError(lang === 'TH' ? 'ค่า r ต้องไม่มากกว่า n สำหรับการจัดหมู่แบบปกติ' : 'r cannot be greater than n for standard combination');
      return;
    }
    if (n > 500 || r > 500) {
      setError(lang === 'TH' ? 'กรุณากรอกค่าไม่เกิน 500 เพื่อป้องกันระบบค้าง' : 'Please enter values less than 500 to prevent system lag');
      return;
    }

    setError('');

    if (repeat) {
      // H(n, r) = C(n+r-1, r)
      const adjustedN = n + r - 1;
      const res = nCr(adjustedN, r);
      setResult(res);
      
      // Calculate steps
      const formulaStr = 'H(n, r) = C(n+r-1, r) = (n+r-1)! / (r! * (n-1)!)';
      const substitutedStr = `H(${n}, ${r}) = C(${adjustedN}, ${r}) = ${adjustedN}! / (${r}! * ${adjustedN - r}!)`;
      
      setSteps({
        n,
        r,
        formula: formulaStr,
        substituted: substitutedStr,
        expansion: getExpansionText(adjustedN, r),
        result: res,
        isRepeat: true,
        adjustedN
      });
    } else {
      const res = nCr(n, r);
      setResult(res);
      
      setSteps({
        n,
        r,
        formula: 'C(n, r) = n! / (r! * (n-r)!)',
        substituted: `C(${n}, ${r}) = ${n}! / (${r}! * ${n - r}!)`,
        expansion: getExpansionText(n, r),
        result: res,
        isRepeat: false
      });
    }
  };

  const nCr = (n: number, r: number): number => {
    if (r < 0 || r > n) return 0;
    if (r === 0 || r === n) return 1;
    let adjustedR = r;
    if (adjustedR > n / 2) adjustedR = n - adjustedR;
    let res = 1;
    for (let i = 1; i <= adjustedR; i++) {
      res = res * (n - adjustedR + i) / i;
    }
    return Math.round(res);
  };

  const getExpansionText = (n: number, r: number) => {
    if (r === 0) return '1';
    let adjustedR = r;
    if (adjustedR > n / 2) adjustedR = n - adjustedR;
    
    const numTerms = [];
    const denTerms = [];
    for (let i = 0; i < adjustedR; i++) {
      numTerms.push(n - i);
      denTerms.push(adjustedR - i);
    }
    return `${numTerms.join(' * ')} / (${denTerms.join(' * ')})`;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCombination(parseInt(nVal), parseInt(rVal), allowRepetitive);
  };

  const handleReset = () => {
    setNVal('7');
    setRVal('3');
    setAllowRepetitive(false);
    setError('');
    setResult(35);
    setSteps({
      n: 7,
      r: 3,
      formula: 'C(n, r) = n! / (r! * (n-r)!)',
      substituted: 'C(7, 3) = 7! / (3! * 4!)',
      expansion: '7 * 6 * 5 / (3 * 2 * 1)',
      result: 35
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Title */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3">
          <Calculator className="h-8 w-8" />
          <h1 className="text-2xl md:text-3xl font-bold">
            {lang === 'TH' ? 'เครื่องมือคำนวณวิธีการจัดหมู่ (Combination)' : 'Combination Calculator (nCr)'}
          </h1>
        </div>
        <p className="mt-2 text-blue-100 text-sm md:text-base">
          {lang === 'TH'
            ? 'คำนวณหาจำนวนวิธีการเลือกสิ่งของ r ชิ้น จากทั้งหมด n ชิ้น โดยไม่สนใจลำดับของการเลือก'
            : 'Calculate the number of ways to choose r items from a set of n items where order does not matter.'}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Input Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:col-span-5 space-y-6">
          <div className="flex items-center space-x-2 border-b pb-3">
            <Layers className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              {lang === 'TH' ? 'ตั้งค่าการคำนวณ' : 'Calculation Setup'}
            </h2>
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'จำนวนสิ่งของทั้งหมด (n)' : 'Total number of items (n)'}
              </label>
              <input
                type="number"
                min="0"
                max="500"
                value={nVal}
                onChange={(e) => setNVal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="เช่น 7"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'จำนวนสิ่งของที่เลือก (r)' : 'Number of items to choose (r)'}
              </label>
              <input
                type="number"
                min="0"
                max="500"
                value={rVal}
                onChange={(e) => setRVal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="เช่น 3"
                required
              />
            </div>

            {/* Repetitive checkbox */}
            <div className="flex items-center space-x-2 py-2">
              <input
                type="checkbox"
                id="allow-repeat"
                checked={allowRepetitive}
                onChange={(e) => setAllowRepetitive(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="allow-repeat" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                {lang === 'TH' ? 'อนุญาตให้เลือกซ้ำได้ (With Repetition)' : 'Allow repetition (with replacement)'}
              </label>
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
                {lang === 'TH' ? 'ผลลัพธ์การจัดหมู่' : 'Combination Result'}
              </h2>
            </div>

            {result !== null && !error ? (
              <div className="space-y-4">
                <div className="bg-indigo-50 rounded-xl p-6 text-center border border-indigo-100">
                  <span className="block text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
                    {allowRepetitive 
                      ? (lang === 'TH' ? 'จำนวนวิธีจัดหมู่ (แบบเลือกซ้ำได้)' : 'Number of Combinations (with repetition)') 
                      : (lang === 'TH' ? 'จำนวนวิธีจัดหมู่ (แบบปกติ)' : 'Number of Combinations (without repetition)')
                    }
                  </span>
                  <span className="text-4xl md:text-5xl font-black text-indigo-900 break-words">
                    {result.toLocaleString()}
                  </span>
                  <span className="block text-sm text-indigo-700 mt-2">
                    {lang === 'TH' ? 'วิธี' : 'ways'}
                  </span>
                </div>

                {/* Show Steps */}
                {steps && (
                  <div className="mt-4 space-y-2.5 text-sm text-gray-700">
                    <h3 className="font-bold text-gray-800 text-base">
                      {lang === 'TH' ? 'วิธีคิดอย่างละเอียด:' : 'Step-by-step Solution:'}
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-2 font-mono text-xs md:text-sm border border-gray-200">
                      <div>
                        <span className="text-blue-700 font-semibold">สูตร:</span> {steps.formula}
                      </div>
                      <div>
                        <span className="text-blue-700 font-semibold">แทนค่า:</span> {steps.substituted}
                      </div>
                      <div>
                        <span className="text-blue-700 font-semibold">การคำนวณขั้นต้น:</span> {steps.expansion}
                      </div>
                      <div className="border-t pt-2 mt-2 font-semibold text-gray-900">
                        {lang === 'TH' ? 'ผลลัพธ์สุดท้าย:' : 'Final Result:'} {steps.result.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <HelpCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                {lang === 'TH' ? 'ป้อนข้อมูล n และ r แล้วกดปุ่มคำนวณ' : 'Enter n and r to see calculations'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thai SEO Article */}
      <article className="prose prose-indigo max-w-none bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 text-gray-800 space-y-6">
        <header className="border-b pb-4">
          <h2 className="text-2xl font-bold text-indigo-900 mb-2">
            วิธีจัดหมู่ (Combination) คืออะไร? พร้อมสูตรคำนวณ nCr อย่างละเอียด
          </h2>
          <p className="text-gray-500 text-sm">
            เรียนรู้และเข้าใจคณิตศาสตร์เรื่องการจัดหมู่ สูตร nCr วิธีจัดกลุ่มสิ่งของโดยไม่สนใจลำดับ พร้อมตัวอย่างและวิธีทำ
          </p>
        </header>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">1. นิยามและแนวคิดของการจัดหมู่ (Combination)</h3>
          <p>
            ในวิชาคณิตศาสตร์และสถิติ <strong>การจัดหมู่ (Combination)</strong> คือ การเลือกกลุ่มสิ่งของจำนวน r ชิ้น 
            ออกมาจากสิ่งของที่มีความแตกต่างกันทั้งหมดจำนวน n ชิ้น โดยมีกฎเกณฑ์ที่สำคัญมากที่สุดคือ 
            <strong className="text-indigo-600"> &ldquo;ไม่ถือลำดับเป็นสำคัญ&rdquo;</strong> หมายความว่า 
            การเลือกสิ่งของกลุ่มเดิมในลำดับที่ต่างกัน จะนับเป็นเพียง 1 วิธีเท่านั้น ตัวอย่างเช่น การเลือกผู้แทน 2 คน 
            จากพนักงาน 3 คน (A, B, C) การเลือกได้กลุ่ม A และ B (AB) จะมีค่าเท่ากับการเลือกได้กลุ่ม B และ A (BA) 
            เนื่องจากได้คนกลุ่มเดียวกันมาทำงาน
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">2. สูตรสำหรับการคำนวณการจัดหมู่</h3>
          <p>
            การคำนวณจำนวนวิธีจัดหมู่ของสิ่งของที่แตกต่างกัน n ชิ้น โดยเลือกคราวละ r ชิ้น (โดยไม่มีการเลือกซ้ำ) 
            สามารถเขียนแทนด้วยสัญลักษณ์ <strong>C(n, r)</strong> หรือ <strong>nCr</strong> หรือ <strong>{"(n)"} over {"(r)"}</strong> 
            โดยมีสูตรดังนี้:
          </p>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-center font-mono my-4">
            <span className="block text-lg font-bold text-indigo-950">C(n, r) = n! / (r! &times; (n - r)!)</span>
          </div>
          <p className="text-sm text-gray-600">
            * หมายเหตุ: เครื่องหมายอัศเจรีย์ (!) หมายถึง <strong>แฟกทอเรียล (Factorial)</strong> คือผลคูณของจำนวนเต็มบวกตั้งแต่ 1 ถึงจำนวนนั้นๆ 
            เช่น 4! = 4 &times; 3 &times; 2 &times; 1 = 24 และมีข้อตกลงทางคณิตศาสตร์ให้ 0! = 1
          </p>
          <p className="mt-2">
            นอกจากนี้ หากอนุญาตให้สิ่งของที่เลือกแต่ละชิ้นสามารถเลือกซ้ำกันได้ (Combination with Repetition) 
            เราจะใช้สูตรการคำนวณจัดหมู่ที่มีการซ้ำ ซึ่งระบุด้วยสัญลักษณ์ H(n, r) หรือคิดเป็น C(n + r - 1, r) ดังนี้:
          </p>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-center font-mono my-4">
            <span className="block text-lg font-bold text-indigo-950">H(n, r) = (n + r - 1)! / (r! &times; (n - 1)!)</span>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">3. ความแตกต่างระหว่าง Combination และ Permutation</h3>
          <p>
            หลายคนมักสับสนระหว่าง <strong>การจัดหมู่ (Combination)</strong> และ <strong>การจัดลำดับ (Permutation)</strong> 
            ความแตกต่างพื้นฐานอยู่ที่ &ldquo;ความสำคัญของลำดับ&rdquo;
          </p>
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200 mt-2">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">หัวข้อเปรียบเทียบ</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">การจัดหมู่ (Combination: nCr)</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">การจัดลำดับ (Permutation: nPr)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              <tr>
                <td className="px-4 py-2 font-medium">ความสำคัญของลำดับ</td>
                <td className="px-4 py-2">ไม่สำคัญ (AB และ BA ถือเป็น 1 วิธี)</td>
                <td className="px-4 py-2">สำคัญมาก (AB และ BA ถือเป็นคนละวิธีกัน)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">สูตรการคำนวณ</td>
                <td className="px-4 py-2">n! / (r!(n-r)!)</td>
                <td className="px-4 py-2">n! / (n-r)!</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">ตัวอย่างโจทย์</td>
                <td className="px-4 py-2">การจัดทีมฟุตบอล, การแจกไพ่, การจับสลากรางวัล</td>
                <td className="px-4 py-2">การตั้งรหัสผ่าน, การสลับที่นั่งบนม้านั่งยาว, การมอบรางวัลอันดับ 1, 2, 3</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">4. ตัวอย่างการแสดงวิธีทำ</h3>
          <p className="font-semibold">โจทย์ตัวอย่าง: ต้องการเลือกคณะกรรมการนักเรียน 3 คน จากผู้สมัครทั้งหมด 7 คน จะมีวิธีจัดหมู่ที่แตกต่างกันทั้งหมดกี่วิธี?</p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
            <p><strong>วิธีคิด:</strong></p>
            <p>จากโจทย์ จะพบว่ามีคนให้เลือกทั้งหมด n = 7 คน และต้องการเลือกมา r = 3 คน</p>
            <p>เนื่องจากการตั้งคณะกรรมการไม่ได้ระบุตำแหน่ง (สลับคนในกลุ่มก็เป็นกรรมการชุดเดิม) ลำดับจึงไม่สำคัญ จึงใช้สูตรการจัดหมู่ C(n, r)</p>
            <p className="font-mono">C(7, 3) = 7! / (3! &times; (7 - 3)!)</p>
            <p className="font-mono">C(7, 3) = 7! / (3! &times; 4!)</p>
            <p className="font-mono">C(7, 3) = (7 &times; 6 &times; 5 &times; 4!) / ((3 &times; 2 &times; 1) &times; 4!)</p>
            <p>ตัดตัวร่วม 4! ออก จะได้:</p>
            <p className="font-mono">C(7, 3) = (7 &times; 6 &times; 5) / (3 &times; 2 &times; 1)</p>
            <p className="font-mono">C(7, 3) = 210 / 6 = 35 วิธี</p>
            <p><strong>คำตอบ:</strong> มีวิธีจัดเลือกคณะกรรมการทั้งหมด 35 วิธี</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">5. ประโยชน์ของเครื่องมือคำนวณออนไลน์ nCr</h3>
          <p>
            เมื่อต้องคำนวณกับตัวเลขที่มีค่าสูงๆ เช่น n = 50 หรือ n = 100 การกดคำนวณแฟกทอเรียลด้วยมือจะเป็นเรื่องที่เสียเวลาและมีโอกาสเกิดความผิดพลาดได้สูงมาก 
            เครื่องคำนวณ nCr ออนไลน์นี้ถูกออกแบบมาเพื่อช่วยให้นักเรียน นักศึกษา และนักสถิติ 
            สามารถหาคำตอบได้อย่างแม่นยำ รวดเร็ว พร้อมทั้งแสดงลำดับขั้นตอนอย่างเป็นระบบ ทำให้สามารถนำไปอ้างอิงและประยุกต์ใช้ในการบ้านหรือโครงการวิเคราะห์ข้อมูลได้อย่างไร้กังวล
          </p>
        </section>
      </article>
    </div>
  );
}

import React, { useState } from 'react';
import { Calculator, HelpCircle, Info, RefreshCw, Layers } from 'lucide-react';

export default function PermutationCalculator({ lang = 'TH' }: any) {
  const [nVal, setNVal] = useState<string>('6');
  const [rVal, setRVal] = useState<string>('3');
  const [allowRepetitive, setAllowRepetitive] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<number | null>(120);
  const [steps, setSteps] = useState<any>({
    n: 6,
    r: 3,
    formula: 'P(n, r) = n! / (n-r)!',
    substituted: 'P(6, 3) = 6! / (6-3)! = 6! / 3!',
    expansion: '6 * 5 * 4',
    result: 120
  });

  const calculatePermutation = (n: number, r: number, repeat: boolean) => {
    if (isNaN(n) || isNaN(r)) {
      setError(lang === 'TH' ? 'กรุณากรอกตัวเลขให้ถูกต้อง' : 'Please enter valid numbers');
      return;
    }
    if (n < 0 || r < 0) {
      setError(lang === 'TH' ? 'ค่า n และ r ต้องไม่ติดลบ' : 'n and r must be non-negative');
      return;
    }
    if (!repeat && r > n) {
      setError(lang === 'TH' ? 'ค่า r ต้องไม่มากกว่า n สำหรับการจัดลำดับแบบปกติ' : 'r cannot be greater than n for standard permutation');
      return;
    }
    if (n > 500 || r > 500) {
      setError(lang === 'TH' ? 'กรุณากรอกค่าไม่เกิน 500 เพื่อป้องกันระบบค้าง' : 'Please enter values less than 500 to prevent system lag');
      return;
    }

    setError('');

    if (repeat) {
      // P = n^r
      const res = Math.pow(n, r);
      setResult(res);
      
      const formulaStr = 'P_repeat(n, r) = n^r';
      const substitutedStr = `P(${n}, ${r}) = ${n}^${r}`;
      const expansionStr = Array(r).fill(n).join(' * ');
      
      setSteps({
        n,
        r,
        formula: formulaStr,
        substituted: substitutedStr,
        expansion: expansionStr,
        result: res,
        isRepeat: true
      });
    } else {
      const res = nPr(n, r);
      setResult(res);
      
      setSteps({
        n,
        r,
        formula: 'P(n, r) = n! / (n-r)!',
        substituted: `P(${n}, ${r}) = ${n}! / (${n} - ${r})! = ${n}! / ${n - r}!`,
        expansion: getExpansionText(n, r),
        result: res,
        isRepeat: false
      });
    }
  };

  const nPr = (n: number, r: number): number => {
    if (r < 0 || r > n) return 0;
    let res = 1;
    for (let i = 0; i < r; i++) {
      res = res * (n - i);
    }
    return res;
  };

  const getExpansionText = (n: number, r: number) => {
    if (r === 0) return '1';
    const terms = [];
    for (let i = 0; i < r; i++) {
      terms.push(n - i);
    }
    return terms.join(' * ');
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculatePermutation(parseInt(nVal), parseInt(rVal), allowRepetitive);
  };

  const handleReset = () => {
    setNVal('6');
    setRVal('3');
    setAllowRepetitive(false);
    setError('');
    setResult(120);
    setSteps({
      n: 6,
      r: 3,
      formula: 'P(n, r) = n! / (n-r)!',
      substituted: 'P(6, 3) = 6! / (6-3)! = 6! / 3!',
      expansion: '6 * 5 * 4',
      result: 120
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Title */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3">
          <Calculator className="h-8 w-8" />
          <h1 className="text-2xl md:text-3xl font-bold">
            {lang === 'TH' ? 'เครื่องมือคำนวณวิธีการจัดลำดับ (Permutation)' : 'Permutation Calculator (nPr)'}
          </h1>
        </div>
        <p className="mt-2 text-teal-100 text-sm md:text-base">
          {lang === 'TH'
            ? 'คำนวณหาจำนวนวิธีการสลับสับเปลี่ยนและการจัดลำดับสิ่งของ r ชิ้น จากทั้งหมด n ชิ้น โดยคำนึงถึงลำดับเป็นสำคัญ'
            : 'Calculate the number of ways to arrange r items from a set of n items where order does matter.'}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Input Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:col-span-5 space-y-6">
          <div className="flex items-center space-x-2 border-b pb-3">
            <Layers className="h-5 w-5 text-emerald-600" />
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                placeholder="เช่น 6"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'จำนวนสิ่งของที่จะจัดหมู่/เรียง (r)' : 'Number of items to arrange (r)'}
              </label>
              <input
                type="number"
                min="0"
                max="500"
                value={rVal}
                onChange={(e) => setRVal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
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
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
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
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-150 ease-in-out shadow-sm text-center"
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
              <Info className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                {lang === 'TH' ? 'ผลลัพธ์การจัดลำดับ' : 'Permutation Result'}
              </h2>
            </div>

            {result !== null && !error ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 rounded-xl p-6 text-center border border-emerald-100">
                  <span className="block text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
                    {allowRepetitive 
                      ? (lang === 'TH' ? 'จำนวนวิธีจัดลำดับ (แบบสลับซ้ำได้)' : 'Number of Permutations (with repetition)') 
                      : (lang === 'TH' ? 'จำนวนวิธีจัดลำดับ (แบบปกติ)' : 'Number of Permutations (without repetition)')
                    }
                  </span>
                  <span className="text-4xl md:text-5xl font-black text-emerald-900 break-words">
                    {result.toLocaleString()}
                  </span>
                  <span className="block text-sm text-emerald-700 mt-2">
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
      <article className="prose prose-emerald max-w-none bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 text-gray-800 space-y-6">
        <header className="border-b pb-4">
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">
            การจัดลำดับ (Permutation) คืออะไร? พร้อมสูตรคำนวณ nPr อย่างละเอียด
          </h2>
          <p className="text-gray-500 text-sm">
            ทำความเข้าใจความหมายของการจัดลำดับ สูตรคำนวณ nPr ความแตกต่างกับ Combination และการนำไปใช้ในชีวิตประจำวัน
          </p>
        </header>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">1. การจัดลำดับ (Permutation) คืออะไร?</h3>
          <p>
            ในทางสถิติศาสตร์และคณิตศาสตร์แบบไม่ต่อเนื่อง <strong>การจัดลำดับ หรือ วิธีสับเปลี่ยนสิ่งของ (Permutation)</strong> คือ 
            การนำสิ่งของจำนวนหนึ่งหรือทั้งหมดมาจัดวางเรียงแถวในแนวเส้นตรง โดยจุดที่ต่างกับเรื่องการจัดหมู่คือ 
            <strong className="text-emerald-600"> &ldquo;ลำดับหรือตำแหน่งเป็นสิ่งสำคัญมาก&rdquo;</strong> 
            ตัวอย่างง่ายๆ เช่น การสลับตัวอักษร 3 ตัว คือ A, B และ C หากเราสลับตำแหน่งจะพบว่า 
            ABC, ACB, BAC, BCA, CAB และ CBA เป็นวิธีที่แตกต่างกันทั้งหมด 6 วิธี แม้ว่าตัวอักษรที่เป็นองค์ประกอบจะเหมือนกันก็ตาม 
            เหตุผลเพราะการวางสลับที่ถือเป็นคนละกรณี
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">2. สูตรสำหรับการคำนวณวิธีเรียงสับเปลี่ยน nPr</h3>
          <p>
            สำหรับการเลือกสิ่งของที่แตกต่างกัน n ชิ้น มาสลับเปลี่ยนในตำแหน่งแถวตรงจำนวน r ชิ้น (โดยไม่ให้มีการเลือกสิ่งของซ้ำ) 
            เราแทนด้วยสัญลักษณ์ <strong>P(n, r)</strong> หรือ <strong>nPr</strong> โดยมีสูตรทางคณิตศาสตร์คือ:
          </p>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-center font-mono my-4">
            <span className="block text-lg font-bold text-emerald-950">P(n, r) = n! / (n - r)!</span>
          </div>
          <p>
            โดยที่ n คือจำนวนสิ่งของที่มีให้เลือกทั้งหมด และ r คือจำนวนที่ต้องการนำมาจัดเรียงตำแหน่ง 
            สัญลักษณ์ (!) คือ แฟกทอเรียล (เช่น n! = n &times; (n-1) &times; ... &times; 1)
          </p>
          <p className="mt-2">
            นอกจากนี้ หากอนุญาตให้เกิดการเลือกซ้ำขึ้นมาได้ (เช่น การตั้งรหัสผ่าน 4 หลักด้วยตัวเลข 0-9 ซึ่งใช้เลขซ้ำได้) 
            จำนวนวิธีจะคำนวณได้โดยการคูณจำนวนที่เลือกได้ในแต่ละหลักเท่ากับ n เสมอ มีสูตรเป็น:
          </p>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-center font-mono my-4">
            <span className="block text-lg font-bold text-emerald-950">P_repeat(n, r) = n^r</span>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">3. ตัวอย่างโจทย์และวิธีเรียงสับเปลี่ยนในชีวิตจริง</h3>
          <p>
            ลองนึกภาพสถานการณ์ทั่วไปในชีวิตประจำวันที่ต้องนำทฤษฎีการจัดลำดับมาคิดวิเคราะห์:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>การแข่งขันทศกรีฑา:</strong> มีนักกีฬา 10 คน ลงสนามเพื่อชิงเหรียญทอง เหรียญเงิน และเหรียญทองแดง (จัดลำดับ 3 อันดับแรก) วิธีที่เป็นไปได้คือ P(10, 3)</li>
            <li><strong>การตั้งรหัสผ่านตู้เซฟ:</strong> รหัสเซฟมี 4 ตำแหน่ง ประกอบด้วยเลข 1, 2, 3, 4, 5 โดยห้ามใช้เลขซ้ำกัน วิธีคิดสลับสับเปลี่ยนรหัสคือ P(5, 4)</li>
            <li><strong>การเรียงลำดับหนังสือบนชั้น:</strong> มีหนังสือประเภทวิทย์ 5 เล่ม นำมาจัดวางบนชั้นวางยาว จะจัดเรียงได้ 5! = 120 วิธี</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">4. แสดงวิธีคำนวณแบบทีละขั้นตอน</h3>
          <p className="font-semibold">โจทย์ตัวอย่าง: ต้องการเลือกตัวแทน 2 คนมาทำหน้าที่ ประธาน และ รองประธาน จากสมาชิกชมรมทั้งหมด 6 คน จะมีวิธีเลือกที่ต่างกันกี่วิธี?</p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
            <p><strong>วิธีคิด:</strong></p>
            <p>จากโจทย์ n = 6 (สมาชิกทั้งหมด) และต้องการเลือกมาสลับสับเปลี่ยนตำแหน่ง r = 2 คน (ประธาน และ รองประธาน)</p>
            <p>เนื่องจากตำแหน่งมีผลต่างกันอย่างชัดเจน (A เป็นประธาน B เป็นรองประธาน แตกต่างกับ B เป็นประธาน A เป็นรองประธาน) ลำดับจึงสำคัญ จึงใช้สูตรการจัดลำดับ P(n, r)</p>
            <p className="font-mono">P(6, 2) = 6! / (6 - 2)!</p>
            <p className="font-mono">P(6, 2) = 6! / 4!</p>
            <p className="font-mono">P(6, 2) = (6 &times; 5 &times; 4!) / 4!</p>
            <p>ตัดตัวร่วม 4! ออก จะได้:</p>
            <p className="font-mono">P(6, 2) = 6 &times; 5 = 30 วิธี</p>
            <p><strong>คำตอบ:</strong> มีวิธีจัดเลือกบุคคลทำหน้าที่ตำแหน่งดังกล่าวได้ทั้งหมด 30 วิธี</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">5. ทำไมการใช้เครื่องคำนวณออนไลน์จึงเป็นเรื่องดี?</h3>
          <p>
            การมีตัวช่วยคำนวณแบบออนไลน์ช่วยลดความผิดพลาดในการคูณตัวเลขยาวๆ เช่น เมื่อ n และ r สูงขึ้นเกิน 10 
            ตัวเลขผลลัพธ์จะกระโดดขึ้นสูงระดับแสนหรือล้าน เครื่องมือนี้ไม่เพียงแต่ให้ผลลัพธ์สุดท้ายที่แม่นยำ 
            แต่ยังมีตรรกะเบื้องหลังและการตีแจกแจงวิเคราะห์สูตรให้เห็นเด่นชัด เหมาะสมสำหรับกลุ่มนักเรียนที่ใช้ศึกษาทบทวน 
            และนักคิดวิเคราะห์ระดับอาชีพที่มองหาความรวดเร็วและเป็นมืออาชีพ
          </p>
        </section>
      </article>
    </div>
  );
}

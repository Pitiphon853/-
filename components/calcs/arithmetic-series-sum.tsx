import React, { useState } from 'react';
import { Calculator, HelpCircle, Info, RefreshCw, BarChart } from 'lucide-react';

export default function ArithmeticSeriesSum({ lang = 'TH' }: any) {
  const [mode, setMode] = useState<'diff' | 'last'>('diff');
  const [a1Val, setA1Val] = useState<string>('1');
  const [nVal, setNVal] = useState<string>('10');
  const [dVal, setDVal] = useState<string>('2'); // Common difference
  const [anVal, setAnVal] = useState<string>('19'); // Last term
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<any>({
    a1: 1,
    n: 10,
    d: 2,
    an: 19,
    sum: 100,
    steps: []
  });

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const a1 = parseFloat(a1Val);
    const n = parseInt(nVal);
    
    if (isNaN(a1) || isNaN(n)) {
      setError(lang === 'TH' ? 'กรุณากรอกข้อมูลให้ถูกต้อง' : 'Please enter valid inputs');
      return;
    }
    if (n <= 0) {
      setError(lang === 'TH' ? 'จำนวนพจน์ (n) ต้องเป็นจำนวนเต็มบวกมากกว่า 0' : 'Number of terms (n) must be a positive integer');
      return;
    }
    if (n > 1000000) {
      setError(lang === 'TH' ? 'จำนวนพจน์มีค่าสูงเกินไป' : 'Number of terms is too large');
      return;
    }

    setError('');
    const stepsList: string[] = [];

    if (mode === 'diff') {
      const d = parseFloat(dVal);
      if (isNaN(d)) {
        setError(lang === 'TH' ? 'กรุณากรอกผลต่างร่วม (d) ให้ถูกต้อง' : 'Please enter a valid common difference (d)');
        return;
      }

      // Sn = n / 2 * [2*a1 + (n - 1)*d]
      const an = a1 + (n - 1) * d;
      const sum = (n / 2) * (2 * a1 + (n - 1) * d);

      stepsList.push(lang === 'TH' ? 'ขั้นตอนการคำนวณด้วยสูตร Sn = (n / 2) * [2a1 + (n - 1)d]' : 'Calculation steps using Sn = (n / 2) * [2a1 + (n - 1)d]:');
      stepsList.push(`1. แทนค่าข้อมูล: a1 = ${a1}, d = ${d}, n = ${n}`);
      stepsList.push(`2. คำนวณพจน์ที่ n (an) = a1 + (n - 1) * d`);
      stepsList.push(`   an = ${a1} + (${n} - 1) * ${d}`);
      stepsList.push(`   an = ${a1} + ${n - 1} * ${d} = ${an}`);
      stepsList.push(`3. คำนวณผลรวม Sn = (${n} / 2) * [2 * ${a1} + (${n} - 1) * ${d}]`);
      stepsList.push(`   Sn = ${n / 2} * [${2 * a1} + ${n - 1} * ${d}]`);
      stepsList.push(`   Sn = ${n / 2} * [${2 * a1} + ${(n - 1) * d}]`);
      stepsList.push(`   Sn = ${n / 2} * [${2 * a1 + (n - 1) * d}] = ${sum}`);

      setResult({ a1, n, d, an, sum, steps: stepsList });
    } else {
      const an = parseFloat(anVal);
      if (isNaN(an)) {
        setError(lang === 'TH' ? 'กรุณากรอกพจน์สุดท้าย (an) ให้ถูกต้อง' : 'Please enter a valid last term (an)');
        return;
      }

      // Sn = n / 2 * (a1 + an)
      const sum = (n / 2) * (a1 + an);
      const d = n > 1 ? (an - a1) / (n - 1) : 0;

      stepsList.push(lang === 'TH' ? 'ขั้นตอนการคำนวณด้วยสูตร Sn = (n / 2) * (a1 + an)' : 'Calculation steps using Sn = (n / 2) * (a1 + an):');
      stepsList.push(`1. แทนค่าข้อมูล: a1 = ${a1}, an = ${an}, n = ${n}`);
      stepsList.push(`2. คำนวณผลรวม Sn = (${n} / 2) * (${a1} + ${an})`);
      stepsList.push(`   Sn = ${n / 2} * (${a1 + an})`);
      stepsList.push(`   Sn = ${sum}`);
      if (n > 1) {
        stepsList.push(`3. หาผลต่างร่วม d = (an - a1) / (n - 1)`);
        stepsList.push(`   d = (${an} - ${a1}) / (${n} - 1) = ${d.toFixed(4)}`);
      }

      setResult({ a1, n, d, an, sum, steps: stepsList });
    }
  };

  const handleReset = () => {
    setA1Val('1');
    setNVal('10');
    setDVal('2');
    setAnVal('19');
    setError('');
    setResult({
      a1: 1,
      n: 10,
      d: 2,
      an: 19,
      sum: 100,
      steps: []
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Title */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3">
          <BarChart className="h-8 w-8" />
          <h1 className="text-2xl md:text-3xl font-bold">
            {lang === 'TH' ? 'เครื่องมือคำนวณผลรวมอนุกรมเลขคณิต' : 'Arithmetic Series Sum Calculator'}
          </h1>
        </div>
        <p className="mt-2 text-purple-100 text-sm md:text-base">
          {lang === 'TH'
            ? 'คำนวณหาผลรวม N พจน์แรกของอนุกรมเลขคณิต แสดงวิธีทำและสูตรคำนวณโดยใช้ผลต่างร่วม (d) หรือพจน์ที่ N (an)'
            : 'Find the sum of the first N terms of an arithmetic progression step-by-step.'}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Input Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:col-span-5 space-y-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setMode('diff')}
              className={`flex-1 text-xs md:text-sm font-semibold py-2 px-3 rounded-lg transition ${
                mode === 'diff' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {lang === 'TH' ? 'ใช้ผลต่างร่วม (d)' : 'Using Difference (d)'}
            </button>
            <button
              type="button"
              onClick={() => setMode('last')}
              className={`flex-1 text-xs md:text-sm font-semibold py-2 px-3 rounded-lg transition ${
                mode === 'last' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {lang === 'TH' ? 'ใช้พจน์สุดท้าย (an)' : 'Using Last Term (an)'}
            </button>
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'พจน์แรก (a₁)' : 'First Term (a₁)'}
              </label>
              <input
                type="number"
                step="any"
                value={a1Val}
                onChange={(e) => setA1Val(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="เช่น 1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'จำนวนพจน์ทั้งหมด (n)' : 'Number of Terms (n)'}
              </label>
              <input
                type="number"
                min="1"
                value={nVal}
                onChange={(e) => setNVal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="เช่น 10"
                required
              />
            </div>

            {mode === 'diff' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'TH' ? 'ผลต่างร่วม (d)' : 'Common Difference (d)'}
                </label>
                <input
                  type="number"
                  step="any"
                  value={dVal}
                  onChange={(e) => setDVal(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="เช่น 2"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'TH' ? 'พจน์สุดท้าย (a_n)' : 'Last Term (a_n)'}
                </label>
                <input
                  type="number"
                  step="any"
                  value={anVal}
                  onChange={(e) => setAnVal(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="เช่น 19"
                  required
                />
              </div>
            )}

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
                {lang === 'TH' ? 'ผลรวมอนุกรม (S_n)' : 'Series Sum Results (S_n)'}
              </h2>
            </div>

            {result.sum !== null && !error ? (
              <div className="space-y-4">
                <div className="bg-indigo-50 rounded-xl p-6 text-center border border-indigo-100">
                  <span className="block text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
                    {lang === 'TH' ? `ผลรวม ${result.n} พจน์แรก` : `Sum of first ${result.n} terms`}
                  </span>
                  <span className="text-4xl md:text-5xl font-black text-indigo-900 break-words">
                    {result.sum.toLocaleString()}
                  </span>
                </div>

                {/* Show values overview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-center">
                  <div className="bg-gray-50 p-2 rounded-lg border">
                    <span className="block text-gray-500">a₁</span>
                    <span className="font-bold text-gray-800">{result.a1}</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border">
                    <span className="block text-gray-500">n</span>
                    <span className="font-bold text-gray-800">{result.n}</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border">
                    <span className="block text-gray-500">d</span>
                    <span className="font-bold text-gray-800">{Number(result.d).toFixed(2)}</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border">
                    <span className="block text-gray-500">a_n</span>
                    <span className="font-bold text-gray-800">{result.an}</span>
                  </div>
                </div>

                {/* Show Steps */}
                {result.steps.length > 0 && (
                  <div className="mt-4 space-y-2.5 text-sm text-gray-700">
                    <h3 className="font-bold text-gray-800 text-base">
                      {lang === 'TH' ? 'วิธีคิดอย่างละเอียด:' : 'Step-by-step Solution:'}
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-1 font-mono text-xs md:text-sm border border-gray-200 overflow-x-auto whitespace-pre">
                      {result.steps.map((step: string, index: number) => (
                        <div key={index} className={index === 0 ? 'text-gray-900 font-semibold mb-2' : ''}>
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
                {lang === 'TH' ? 'ป้อนพจน์เริ่มต้น จำนวนพจน์ และเงื่อนไขเพื่อดูผลการคำนวณ' : 'Enter values and press calculate to view steps'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thai SEO Article */}
      <article className="prose prose-indigo max-w-none bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 text-gray-800 space-y-6">
        <header className="border-b pb-4">
          <h2 className="text-2xl font-bold text-indigo-900 mb-2">
            เจาะลึก อนุกรมเลขคณิต (Arithmetic Series) และสูตรการบวกรวม N พจน์แรก
          </h2>
          <p className="text-gray-500 text-sm">
            ทำความเข้าใจความสัมพันธ์ของลำดับเลขคณิต สูตรผลต่างร่วม (d) และวิธีคำนวณหาราคาผลบวกรวมอย่างแม่นยำด้วยตัวอย่างประกอบ
          </p>
        </header>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">1. อนุกรมเลขคณิต (Arithmetic Series) คืออะไร?</h3>
          <p>
            ในทางคณิตศาสตร์ <strong>ลำดับเลขคณิต (Arithmetic Progression: AP)</strong> คือ ลำดับของตัวเลขที่ผลต่างระหว่างพจน์ที่อยู่ติดกัน
            มีค่าคงที่เสมอ ซึ่งค่าคงที่นี้เรียกว่า <strong>ผลต่างร่วม (Common Difference)</strong> เขียนแทนด้วยตัวแปร <strong>d</strong> 
            เช่น ลำดับ 1, 3, 5, 7, 9 ซึ่งมีผลต่างร่วม d = 2
          </p>
          <p>
            เมื่อเรานำสมาชิกแต่ละพจน์ของลำดับเลขคณิตนี้มา <strong>บวกต่อกันเป็นผลรวม</strong> เราจะเรียกผลบวกนั้นว่า 
            <strong>อนุกรมเลขคณิต (Arithmetic Series)</strong> เช่น 1 + 3 + 5 + 7 + 9 ซึ่งได้ผลรวมเท่ากับ 25
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">2. สูตรหลักในการคำนวณอนุกรมเลขคณิต</h3>
          <p>
            ในการหาผลรวม N พจน์แรก (แทนด้วยสัญลักษณ์ <strong>Sn</strong>) เรามีวิธีหาคำตอบได้ 2 สูตรหลัก 
            ขึ้นอยู่กับข้อมูลโจทย์ที่มีให้:
          </p>

          <div className="space-y-4 my-4">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <span className="block text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">สูตรที่ 1: เมื่อทราบ พจน์แรก (a₁) ผลต่างร่วม (d) และจำนวนพจน์ (n)</span>
              <span className="block text-lg font-bold text-indigo-950 font-mono text-center">Sn = (n / 2) &times; [2a₁ + (n - 1)d]</span>
            </div>

            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <span className="block text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">สูตรที่ 2: เมื่อทราบ พจน์แรก (a₁) พจน์สุดท้าย (an) และจำนวนพจน์ (n)</span>
              <span className="block text-lg font-bold text-indigo-950 font-mono text-center">Sn = (n / 2) &times; (a₁ + an)</span>
            </div>
          </div>

          <p>
            ความเชื่อมโยงของทั้งสองสูตรนี้เกิดจากพจน์ทั่วไปของลำดับเลขคณิตที่ระบุว่า:
            <span className="font-mono font-semibold"> an = a₁ + (n - 1)d</span> เมื่อนำสมการนี้ไปแทนค่าในสูตรที่ 2 
            จะได้สูตรที่ 1 ออกมานั่นเอง
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">3. ตัวอย่างการแสดงวิธีทำทีละขั้น</h3>
          
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
            <div>
              <p className="font-semibold">ตัวอย่างที่ 1: หาผลรวมของเลขคี่ตั้งแต่ 1 ถึง 19 (1 + 3 + 5 + ... + 19)</p>
              <p className="text-sm mt-1"><strong>วิธีวิเคราะห์โจทย์:</strong></p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>พจน์แรก a₁ = 1</li>
                <li>พจน์สุดท้าย an = 19</li>
                <li>ผลต่างร่วม d = 2 (เนื่องจาก 3 - 1 = 2)</li>
                <li>หาจำนวนพจน์ (n): จากสูตร an = a₁ + (n - 1)d จะได้ 19 = 1 + (n - 1) &times; 2 &rArr; 18 = 2(n - 1) &rArr; n - 1 = 9 &rArr; n = 10</li>
              </ul>
              <p className="text-sm mt-2"><strong>แทนค่าลงในสูตรที่ 2:</strong></p>
              <p className="font-mono text-sm pl-4">Sn = (n / 2) &times; (a₁ + an)</p>
              <p className="font-mono text-sm pl-4">S₁₀ = (10 / 2) &times; (1 + 19)</p>
              <p className="font-mono text-sm pl-4">S₁₀ = 5 &times; 20 = 100</p>
              <p className="text-sm"><strong>คำตอบ:</strong> ผลรวมคือ 100</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">4. การนำลำดับและอนุกรมไปใช้งานจริง</h3>
          <p>
            อนุกรมเลขคณิตพบเจอได้บ่อยมากในระบบวิเคราะห์วางแผนการเงินและชีวิตประจำวัน เช่น:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>การเก็บออมเงินขั้นบันได:</strong> หากเราออมเงินวันแรก 1 บาท วันที่สอง 2 บาท วันที่สาม 3 บาท เพิ่มขึ้นเรื่อยๆ วันละ 1 บาท จนครบ 365 วัน ยอดออมทั้งหมดจะหาได้ด้วยสูตรอนุกรมเลขคณิต (เท่ากับ 66,795 บาท)</li>
            <li><strong>การคำนวณชำระค่างวด:</strong> การชำระหนี้สินแบบเงินต้นลดต้นดอกเบี้ยลด หรือค่างวดของระบบสมาชิกที่เป็นบันไดราคา</li>
            <li><strong>การกระจายและจัดสรรสิ่งของ:</strong> การเรียงเก้าอี้ในหอประชุมใหญ่ที่แต่ละแถวตอนลึกจะมีจำนวนเก้าอี้เพิ่มขึ้นทีละคงที่</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">5. ทำไมต้องใช้เครื่องช่วยคำนวณออนไลน์?</h3>
          <p>
            ในข้อสอบมักจะมีโจทย์ตัวเลขที่ซับซ้อน หรือกรณีที่ต้องการหาผลรวมของพจน์ที่สูงมาก เช่น 10,000 พจน์แรก 
            การคำนวณด้วยตนเองมีความเสี่ยงสูงที่จะคิดเลขผิดระหว่างทาง เครื่องคำนวณนี้ช่วยคำนวณพร้อมจำลองภาพขั้นตอน 
            การจัดแจงสมการเพื่อให้ผู้ใช้งานได้เรียนรู้วิธีคิดที่แม่นยำควบคู่ไปกับความสะดวกรวดเร็ว
          </p>
        </section>
      </article>
    </div>
  );
}

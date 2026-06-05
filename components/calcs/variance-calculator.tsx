import React, { useState } from 'react';
import { Calculator, RefreshCw, BarChart2, Info, FileText, AlertCircle } from 'lucide-react';

export default function VarianceCalculator({ lang = 'TH' }: any) {
  const [inputData, setInputData] = useState<string>('6, 9, 12, 15, 18, 20');
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<{
    n: number;
    sum: number;
    mean: number;
    sumSqDev: number;
    popVariance: number;
    sampleVariance: number;
    popSD: number;
    sampleSD: number;
    tableData: { val: number; dev: number; devSq: number }[];
  } | null>(null);

  const calculateVariance = () => {
    setError('');
    setResults(null);

    // Parse input
    const numbers = inputData
      .split(/[\s,;\n]+/)
      .map(num => num.trim())
      .filter(num => num !== '')
      .map(num => Number(num));

    if (numbers.length === 0) {
      setError(lang === 'EN' ? 'Please enter at least two numbers.' : 'กรุณากรอกข้อมูลตัวเลขอย่างน้อย 2 ตัว');
      return;
    }

    if (numbers.length < 2) {
      setError(
        lang === 'EN'
          ? 'Variance calculations require at least 2 numbers to compute sample variance (which divides by n - 1).'
          : 'การคำนวณความแปรปรวนจำเป็นต้องมีข้อมูลอย่างน้อย 2 ตัว เพื่อประมวลผลความแปรปรวนกลุ่มตัวอย่าง (หารด้วย n - 1)'
      );
      return;
    }

    if (numbers.some(num => isNaN(num))) {
      setError(lang === 'EN' ? 'The input contains invalid numbers.' : 'ข้อมูลที่กรอกมีค่าที่ไม่ใช่ตัวเลข กรุณาตรวจสอบอีกครั้ง');
      return;
    }

    const n = numbers.length;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / n;

    // Table data and sum of squared deviations
    let sumSqDev = 0;
    const tableData = numbers.map(val => {
      const dev = val - mean;
      const devSq = dev * dev;
      sumSqDev += devSq;
      return {
        val,
        dev: Number(dev.toFixed(6)),
        devSq: Number(devSq.toFixed(6))
      };
    });

    const popVariance = sumSqDev / n;
    const sampleVariance = sumSqDev / (n - 1);
    const popSD = Math.sqrt(popVariance);
    const sampleSD = Math.sqrt(sampleVariance);

    setResults({
      n,
      sum: Number(sum.toFixed(6)),
      mean: Number(mean.toFixed(6)),
      sumSqDev: Number(sumSqDev.toFixed(6)),
      popVariance: Number(popVariance.toFixed(6)),
      sampleVariance: Number(sampleVariance.toFixed(6)),
      popSD: Number(popSD.toFixed(6)),
      sampleSD: Number(sampleSD.toFixed(6)),
      tableData
    });
  };

  const loadExample = (exampleType: string) => {
    if (exampleType === 'grades') {
      setInputData('3.5, 4.0, 2.8, 3.2, 3.7');
    } else if (exampleType === 'revenue') {
      setInputData('12000, 15400, 11200, 16800, 14300, 13900');
    } else {
      setInputData('6, 9, 12, 15, 18, 20');
    }
  };

  const handleReset = () => {
    setInputData('');
    setResults(null);
    setError('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-50 rounded-2xl shadow-sm border border-slate-100">
      {/* Title block */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-violet-700 text-white rounded-xl">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            {lang === 'EN' ? 'Variance Calculator' : 'เครื่องคำนวณค่าความแปรปรวน (Variance)'}
          </h1>
          <p className="text-sm text-slate-500">
            {lang === 'EN'
              ? 'Calculate both sample and population variance with step-by-step steps.'
              : 'คำนวณหาค่าความแปรปรวน (Variance) ทั้งแบบกลุ่มตัวอย่างและแบบประชากร พร้อมแสดงวิธีทำอย่างละเอียด'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Input Panel */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {lang === 'EN' ? 'Enter Dataset (n >= 2)' : 'ป้อนชุดข้อมูล (n >= 2)'}
            </label>
            <p className="text-xs text-slate-400 mb-2">
              {lang === 'EN'
                ? 'Separate numbers by comma (,), space, or new line.'
                : 'คั่นด้วยเครื่องหมายจุลภาค (,), เว้นวรรค หรือขึ้นบรรทัดใหม่'}
            </p>
            <textarea
              className="w-full h-32 px-3 py-2 text-slate-700 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
              placeholder="e.g., 6, 9, 12, 15, 18, 20"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
          </div>

          {/* Quick Examples */}
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-medium text-slate-500">
              {lang === 'EN' ? 'Quick Examples:' : 'ข้อมูลตัวอย่าง:'}
            </span>
            <button
              onClick={() => loadExample('grades')}
              className="px-2.5 py-1 text-xs bg-violet-50 hover:bg-violet-100 text-violet-700 rounded-md transition-colors"
            >
              {lang === 'EN' ? 'GPA Scores (5 students)' : 'เกรดเฉลี่ย (5 คน)'}
            </button>
            <button
              onClick={() => loadExample('revenue')}
              className="px-2.5 py-1 text-xs bg-violet-50 hover:bg-violet-100 text-violet-700 rounded-md transition-colors"
            >
              {lang === 'EN' ? 'Daily Revenue (6 days)' : 'รายได้ประจำวัน (6 วัน)'}
            </button>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={calculateVariance}
              className="flex-1 py-2.5 px-4 bg-violet-700 hover:bg-violet-800 text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
            >
              <Calculator className="w-4 h-4" />
              <span>{lang === 'EN' ? 'Calculate Variance' : 'คำนวณความแปรปรวน'}</span>
            </button>
            <button
              onClick={handleReset}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm transition-colors flex items-center justify-center"
              title={lang === 'EN' ? 'Clear all inputs' : 'ล้างข้อมูล'}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Info panel */}
        <div className="bg-gradient-to-br from-violet-950 to-slate-900 text-violet-100 p-5 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Info className="w-5 h-5 text-violet-300" />
              <h3 className="font-semibold text-white">
                {lang === 'EN' ? 'What is Variance?' : 'ความแปรปรวน คืออะไร?'}
              </h3>
            </div>
            <p className="text-xs text-violet-200/90 leading-relaxed">
              {lang === 'EN'
                ? 'Variance measures how far a set of numbers is spread out from their average value. It is the average of the squared differences from the mean.'
                : 'ความแปรปรวน (Variance) คือมาตรวัดสถิติที่ใช้บอกการกระจายตัวของข้อมูล โดยคำนวณจากค่าเฉลี่ยของส่วนเบี่ยงเบนยกกำลังสอง ค่าความแปรปรวนที่มากกว่าแปลว่าข้อมูลมีการกระจายตัวห่างจากค่าเฉลี่ยมากยิ่งขึ้น'}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-violet-800">
            <h4 className="text-xs font-semibold text-violet-300 uppercase tracking-wider mb-2">
              {lang === 'EN' ? 'Formulas Reference' : 'สูตรความแปรปรวน'}
            </h4>
            <div className="text-[10px] font-mono space-y-1 bg-violet-950/40 p-2.5 rounded border border-violet-800/40">
              <p>Sample Variance: s² = Σ(x - x̄)² / (n - 1)</p>
              <p>Pop. Variance: σ² = Σ(x - μ)² / N</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results output */}
      {results && (
        <div className="space-y-6">
          {/* Main Variance Output Card */}
          <div className="bg-violet-50 border border-violet-200/60 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="border-b md:border-b-0 md:border-r border-violet-200/60 pb-4 md:pb-0 md:pr-6">
                <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider block mb-1">
                  {lang === 'EN' ? 'Sample Variance (s²)' : 'ความแปรปรวนกลุ่มตัวอย่าง (s²)'}
                </span>
                <span className="text-3xl font-extrabold text-violet-950 block">{results.sampleVariance}</span>
                <span className="text-xs text-slate-500 mt-1 block">
                  {lang === 'EN' ? 'Divisor: n - 1 (Unbiased estimate)' : 'ตัวหาร: n - 1 (สำหรับกลุ่มตัวอย่าง)'}
                </span>
              </div>
              <div className="pb-4 md:pb-0 md:pl-6">
                <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider block mb-1">
                  {lang === 'EN' ? 'Population Variance (σ²)' : 'ความแปรปรวนประชากร (σ²)'}
                </span>
                <span className="text-3xl font-extrabold text-violet-950 block">{results.popVariance}</span>
                <span className="text-xs text-slate-500 mt-1 block">
                  {lang === 'EN' ? 'Divisor: N (Entire group)' : 'ตัวหาร: N (สำหรับข้อมูลประชากรทั้งหมด)'}
                </span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="mt-6 pt-6 border-t border-violet-200/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-white rounded-lg border border-violet-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  {lang === 'EN' ? 'Mean (x̄ / μ)' : 'ค่าเฉลี่ย'}
                </span>
                <span className="text-sm font-bold text-slate-700">{results.mean}</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-violet-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  {lang === 'EN' ? 'Data Count (n)' : 'จำนวนข้อมูล (n)'}
                </span>
                <span className="text-sm font-bold text-slate-700">{results.n}</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-violet-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  {lang === 'EN' ? 'Sample S.D. (s)' : 'S.D. กลุ่มตัวอย่าง'}
                </span>
                <span className="text-sm font-bold text-slate-700">{results.sampleSD}</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-violet-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  {lang === 'EN' ? 'Population S.D. (σ)' : 'S.D. ประชากร'}
                </span>
                <span className="text-sm font-bold text-slate-700">{results.popSD}</span>
              </div>
            </div>
          </div>

          {/* Deviation Table */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center">
              <BarChart2 className="w-4 h-4 text-violet-500 mr-2" />
              {lang === 'EN' ? 'Deviation Calculation Details' : 'ตารางแยกส่วนเบี่ยงเบนยกกำลังสอง'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="py-2.5 px-4 font-semibold">{lang === 'EN' ? 'Data (x)' : 'ข้อมูล (x)'}</th>
                    <th className="py-2.5 px-4 font-semibold">{lang === 'EN' ? 'Deviation (x - Mean)' : 'ผลต่างจากค่าเฉลี่ย (x - Mean)'}</th>
                    <th className="py-2.5 px-4 font-semibold">{lang === 'EN' ? 'Squared Dev. (x - Mean)²' : 'ผลต่างกำลังสอง (x - Mean)²'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {results.tableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2 px-4">{row.val}</td>
                      <td className="py-2 px-4">{row.dev}</td>
                      <td className="py-2 px-4">{row.devSq}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-semibold text-slate-800">
                    <td className="py-3 px-4 font-sans">{lang === 'EN' ? 'Sum of Squares (SS)' : 'ผลรวมกำลังสอง (SS)'}</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">{results.sumSqDev}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Calculations Detailed Steps */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center">
              <FileText className="w-4 h-4 text-violet-500 mr-2" />
              {lang === 'EN' ? 'Step-by-Step Calculation' : 'แสดงรายละเอียดวิธีการทำทีละขั้นตอน'}
            </h3>
            <div className="space-y-6 text-sm text-slate-600">
              <div className="border-l-2 border-slate-200 pl-4 py-1">
                <h4 className="font-semibold text-slate-700">
                  1. {lang === 'EN' ? 'Calculate Mean' : 'หาค่าเฉลี่ยเลขคณิต (Mean)'}
                </h4>
                <p className="font-mono mt-1 text-xs">Mean = {results.sum} / {results.n} = {results.mean}</p>
              </div>

              <div className="border-l-2 border-slate-200 pl-4 py-1">
                <h4 className="font-semibold text-slate-700">
                  2. {lang === 'EN' ? 'Calculate Sum of Squares (SS)' : 'หาผลรวมส่วนเบี่ยงเบนกำลังสอง (Sum of Squares - SS)'}
                </h4>
                <p className="font-mono mt-1 text-xs">SS = &Sigma;(x - Mean)&sup2; = {results.sumSqDev}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-2 border-violet-400 pl-4 py-1">
                  <h4 className="font-semibold text-violet-800">
                    {lang === 'EN' ? 'Sample Variance Step' : 'หาความแปรปรวนกลุ่มตัวอย่าง (s²)'}
                  </h4>
                  <p className="text-xs mt-1">
                    {lang === 'EN'
                      ? 'Divide Sum of Squares by (n - 1):'
                      : 'หารผลรวมกำลังสองด้วยองศาอิสระ (n - 1):'}
                  </p>
                  <p className="font-mono mt-1 text-xs">
                    s&sup2; = {results.sumSqDev} / ({results.n} - 1) = {results.sumSqDev} / {results.n - 1} = {results.sampleVariance}
                  </p>
                </div>
                <div className="border-l-2 border-blue-400 pl-4 py-1">
                  <h4 className="font-semibold text-blue-800">
                    {lang === 'EN' ? 'Population Variance Step' : 'หาความแปรปรวนประชากร (σ²)'}
                  </h4>
                  <p className="text-xs mt-1">
                    {lang === 'EN'
                      ? 'Divide Sum of Squares by N:'
                      : 'หารผลรวมกำลังสองด้วยขนาดประชากรทั้งหมด N:'}
                  </p>
                  <p className="font-mono mt-1 text-xs">
                    &sigma;&sup2; = {results.sumSqDev} / {results.n} = {results.popVariance}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEO Article */}
      <hr className="my-8 border-slate-200" />
      <article className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-4">
        <h2 className="text-xl font-bold text-slate-800 mb-3">
          ความแปรปรวน (Variance) คืออะไร? เจาะลึกสูตรการคำนวณและข้อแตกต่างในการใช้งานจริง
        </h2>
        <p>
          ในทางสถิติและการวิเคราะห์ข้อมูลเชิงลึก <strong>ความแปรปรวน (Variance)</strong> คือ มาตรวัดสถิติที่ใช้ในการระบุระดับการกระจายตัวของข้อมูลดิบ 
          โดยประเมินจากความห่างของข้อมูลแต่ละตัวเทียบกับค่าเฉลี่ย ความแปรปรวนมีสัญลักษณ์แทนคือ <strong>s&sup2;</strong> (สำหรับกลุ่มตัวอย่าง) 
          และ <strong>&sigma;&sup2;</strong> (สำหรับกลุ่มประชากรทั้งหมด)
        </p>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          สูตรความแปรปรวนประชากร (Population Variance) vs กลุ่มตัวอย่าง (Sample Variance)
        </h3>
        <p>
          การเลือกใช้สูตรความแปรปรวนมีความแตกต่างอย่างชัดเจน ขึ้นอยู่กับความกว้างและข้อจำกัดของชุดข้อมูลดิบที่เราเก็บมาได้:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>1. ความแปรปรวนของประชากร (Population Variance - &sigma;&sup2;):</strong> 
            ใช้เมื่อข้อมูลนั้นเป็นข้อมูลทั้งหมดของสมาชิกประชากรที่เรากำลังศึกษา (เช่น ยอดขายสุทธิของร้านค้าในแต่ละวันครบ 12 เดือน)
            <div className="font-mono bg-slate-100 p-2 rounded text-xs mt-1">สูตร: &sigma;&sup2; = &Sigma; (x_i - &mu;)&sup2; / N</div>
          </li>
          <li>
            <strong>2. ความแปรปรวนของกลุ่มตัวอย่าง (Sample Variance - s&sup2;):</strong> 
            ใช้เมื่อเราต้องการสุ่มตัวอย่างเพียงบางส่วนมาหาค่า และอ้างอิงกลับไปยังกลุ่มประชากรใหญ่ (เช่น สุ่มกรอกรายได้ประชากร 1,000 คนจากคนกรุงเทพฯ 6 ล้านคน)
            <div className="font-mono bg-slate-100 p-2 rounded text-xs mt-1">สูตร: s&sup2; = &Sigma; (x_i - x̄)&sup2; / (n - 1)</div>
          </li>
        </ul>
        <p>
          การใช้ <strong>n - 1</strong> ในการหารข้อมูลกลุ่มตัวอย่างแทนที่จะเป็น n เป็นข้อกำหนดทางคณิตศาสตร์ที่เรียกว่า <em>Bessel's correction</em> 
          ที่ช่วยลดอคติจากการประมาณค่า ทำให้ค่าความแปรปรวนที่คำนวณได้มีความใกล้เคียงกับความเป็นจริงของประชากรมากขึ้น
        </p>

        <h3 className="text-lg font-semibold text-slate-805 mt-4">
          ความสัมพันธ์ของ ความแปรปรวน (Variance) และส่วนเบี่ยงเบนมาตรฐาน (Standard Deviation)
        </h3>
        <p>
          ความแปรปรวนและส่วนเบี่ยงเบนมาตรฐานมีความเชื่อมโยงกันอย่างเหนียวแน่น:
        </p>
        <p>
          <strong>ส่วนเบี่ยงเบนมาตรฐาน (S.D.) = &radic;ความแปรปรวน (Variance)</strong>
        </p>
        <p>
          ข้อแตกต่างที่สำคัญคือหน่วยของผลลัพธ์ เนื่องจากความแปรปรวนใช้วิธียกกำลังสองเพื่อกำจัดค่าติดลบ ทำให้หน่วยผลลัพธ์เป็นกำลังสองไปด้วย (เช่น บาทกำลังสอง, เมตรกำลังสอง) 
          ซึ่งยากต่อการนำมาอธิบายในโลกความจริง การถอดสแควรูทของความแปรปรวนกลับมาเป็นส่วนเบี่ยงเบนมาตรฐานจึงทำให้ตัวเลขกลับมาอยู่ในรูปของหน่วยเดี่ยวที่จับต้องได้จริง
        </p>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          ประโยชน์ของการใช้เครื่องคำนวณค่าความแปรปรวนออนไลน์
        </h3>
        <p>
          สำหรับผู้ใช้งานทั่วไป นักการตลาด หรือนักเรียนวิชาสถิติ การบวกลบเศษส่วนและการยกกำลังสองข้อมูลหลายตัวมักใช้เวลาสูงและมีอัตราการคำนวณตกหล่นบ่อย 
          เครื่องคำนวณค่าความแปรปรวน (Variance Calculator) นี้จะช่วยให้สามารถกรอกข้อมูลทั้งหมดได้อย่างเสรีในรูปแบบคั่นด้วยจุลภาค 
          แล้วระบบจะแจกแจงผลต่างและผลบวกกำลังสอง (Sum of Squares) พร้อมประมวลผลทั้งแบบตัวอย่างและประชากรควบคู่กันทันที ช่วยเพิ่มความแม่นยำ 100% 
          และอำนวยความสะดวกในการศึกษาสถิติเปรียบเทียบในชิ้นงานวิจัยต่าง ๆ
        </p>
      </article>
    </div>
  );
}

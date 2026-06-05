import React, { useState } from 'react';
import { Calculator, RefreshCw, BarChart2, Info, FileText, AlertCircle } from 'lucide-react';

export default function SampleStandardDeviation({ lang = 'TH' }: any) {
  const [inputData, setInputData] = useState<string>('4, 8, 11, 12, 15, 20');
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<{
    n: number;
    df: number;
    sum: number;
    mean: number;
    sumSqDev: number;
    variance: number;
    sd: number;
    tableData: { val: number; dev: number; devSq: number }[];
  } | null>(null);

  const calculateSampleSD = () => {
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
          ? 'Sample standard deviation requires at least 2 data points (n >= 2) to compute variance with degrees of freedom (n - 1).'
          : 'การหาค่าเบี่ยงเบนมาตรฐานกลุ่มตัวอย่าง จำเป็นต้องมีข้อมูลอย่างน้อย 2 ตัวขึ้นไป (n >= 2) เพื่อหลีกเลี่ยงการหารด้วยศูนย์ (n - 1)'
      );
      return;
    }

    if (numbers.some(num => isNaN(num))) {
      setError(lang === 'EN' ? 'The input contains invalid numbers.' : 'ข้อมูลที่กรอกมีค่าที่ไม่ใช่ตัวเลข กรุณาตรวจสอบอีกครั้ง');
      return;
    }

    const n = numbers.length;
    const df = n - 1;
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

    const variance = sumSqDev / df;
    const sd = Math.sqrt(variance);

    setResults({
      n,
      df,
      sum: Number(sum.toFixed(6)),
      mean: Number(mean.toFixed(6)),
      sumSqDev: Number(sumSqDev.toFixed(6)),
      variance: Number(variance.toFixed(6)),
      sd: Number(sd.toFixed(6)),
      tableData
    });
  };

  const loadExample = (exampleType: string) => {
    if (exampleType === 'weights') {
      setInputData('62.5, 64.2, 59.8, 70.1, 65.4');
    } else if (exampleType === 'clicks') {
      setInputData('250, 310, 280, 295, 305, 275');
    } else {
      setInputData('4, 8, 11, 12, 15, 20');
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
        <div className="p-3 bg-violet-600 text-white rounded-xl">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            {lang === 'EN' ? 'Sample Standard Deviation Calculator' : 'เครื่องคำนวณส่วนเบี่ยงเบนมาตรฐานกลุ่มตัวอย่าง (Sample S.D.)'}
          </h1>
          <p className="text-sm text-slate-500">
            {lang === 'EN'
              ? 'Calculate the S.D. and variance for a sample dataset using Bessel\'s correction (n - 1).'
              : 'คำนวณหาส่วนเบี่ยงเบนมาตรฐาน (S.D.) และความแปรปรวน (Variance) สำหรับตัวอย่างข้อมูลดิบ (หารด้วย n - 1)'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Input Panel */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {lang === 'EN' ? 'Enter Sample Data (n >= 2)' : 'ป้อนข้อมูลกลุ่มตัวอย่าง (n >= 2)'}
            </label>
            <p className="text-xs text-slate-400 mb-2">
              {lang === 'EN'
                ? 'Separate numbers by comma (,), space, or new line.'
                : 'คั่นด้วยเครื่องหมายจุลภาค (,), เว้นวรรค หรือขึ้นบรรทัดใหม่'}
            </p>
            <textarea
              className="w-full h-32 px-3 py-2 text-slate-700 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
              placeholder="e.g., 4, 8, 11, 12, 15, 20"
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
              onClick={() => loadExample('weights')}
              className="px-2.5 py-1 text-xs bg-violet-50 hover:bg-violet-100 text-violet-700 rounded-md transition-colors"
            >
              {lang === 'EN' ? 'Body Weights (5 people)' : 'น้ำหนักตัว (5 คน)'}
            </button>
            <button
              onClick={() => loadExample('clicks')}
              className="px-2.5 py-1 text-xs bg-violet-50 hover:bg-violet-100 text-violet-700 rounded-md transition-colors"
            >
              {lang === 'EN' ? 'Website Clicks (6 days)' : 'ยอดคลิกเว็บ (6 วัน)'}
            </button>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={calculateSampleSD}
              className="flex-1 py-2.5 px-4 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
            >
              <Calculator className="w-4 h-4" />
              <span>{lang === 'EN' ? 'Calculate Sample S.D.' : 'คำนวณค่า S.D. กลุ่มตัวอย่าง'}</span>
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
        <div className="bg-gradient-to-br from-violet-900 to-slate-900 text-violet-100 p-5 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Info className="w-5 h-5 text-violet-300" />
              <h3 className="font-semibold text-white">
                {lang === 'EN' ? 'Sample S.D.' : 'S.D. กลุ่มตัวอย่าง คืออะไร?'}
              </h3>
            </div>
            <p className="text-xs text-violet-200/90 leading-relaxed">
              {lang === 'EN'
                ? 'Used when the dataset is a sample representing a larger population. We divide by (n - 1) to provide an unbiased estimate, which corrects for the tendency to underestimate population variance.'
                : 'ใช้เมื่อข้อมูลที่มีอยู่เป็นเพียงส่วนหนึ่งที่ถูกสุ่มมาจากกลุ่มประชากรที่ใหญ่กว่า การหารด้วย n - 1 (Bessel\'s correction) ช่วยลดอคติในการประเมินความแปรปรวนของประชากรให้เกิดความแม่นยำสูงสุด'}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-violet-800">
            <h4 className="text-xs font-semibold text-violet-300 uppercase tracking-wider mb-2">
              {lang === 'EN' ? 'Sample Formula' : 'สูตรคำนวณ'}
            </h4>
            <div className="text-[11px] font-mono space-y-1 bg-violet-950/50 p-2.5 rounded border border-violet-800/40">
              <p>x̄ = &Sigma; x / n</p>
              <p>s&sup2; = &Sigma; (x - x̄)&sup2; / (n - 1)</p>
              <p>s = &radic;s&sup2;</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results output */}
      {results && (
        <div className="space-y-6">
          {/* S.D. Result Summary Card */}
          <div className="bg-violet-50 border border-violet-200/60 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-violet-200/60 pb-4 md:pb-0 md:pr-6">
                <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider block mb-1">
                  {lang === 'EN' ? 'Sample S.D. (s)' : 'ส่วนเบี่ยงเบนมาตรฐานตัวอย่าง (s)'}
                </span>
                <span className="text-4xl font-extrabold text-violet-950">{results.sd}</span>
              </div>
              <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-white rounded-lg border border-violet-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    {lang === 'EN' ? 'Sample Variance (s²)' : 'ความแปรปรวน (s²)'}
                  </span>
                  <span className="text-lg font-bold text-slate-700">{results.variance}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-violet-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    {lang === 'EN' ? 'Mean (x̄)' : 'ค่าเฉลี่ยตัวอย่าง (x̄)'}
                  </span>
                  <span className="text-lg font-bold text-slate-700">{results.mean}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-violet-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    {lang === 'EN' ? 'Sample Size (n)' : 'จำนวนตัวอย่าง (n)'}
                  </span>
                  <span className="text-lg font-bold text-slate-700">{results.n}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-violet-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    {lang === 'EN' ? 'Deg. of Freedom (n-1)' : 'ชั้นแห่งความเป็นอิสระ'}
                  </span>
                  <span className="text-lg font-bold text-slate-700">{results.df}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deviation Table */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center">
              <BarChart2 className="w-4 h-4 text-violet-500 mr-2" />
              {lang === 'EN' ? 'Deviation Calculation Details' : 'ตารางแสดงความเบี่ยงเบนรายจุดข้อมูล'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="py-2.5 px-4 font-semibold">{lang === 'EN' ? 'Data (x)' : 'ข้อมูล (x)'}</th>
                    <th className="py-2.5 px-4 font-semibold">{lang === 'EN' ? 'Deviation (x - x̄)' : 'ผลต่างจากค่าเฉลี่ย (x - x̄)'}</th>
                    <th className="py-2.5 px-4 font-semibold">{lang === 'EN' ? 'Squared Dev. (x - x̄)²' : 'ผลต่างยกกำลังสอง (x - x̄)²'}</th>
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
                    <td className="py-3 px-4 font-sans">{lang === 'EN' ? 'Total Sum (Σ)' : 'ผลรวมทั้งหมด (Σ)'}</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">{results.sumSqDev}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Step-by-Step Explanation */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center">
              <FileText className="w-4 h-4 text-violet-500 mr-2" />
              {lang === 'EN' ? 'Step-by-Step Calculation' : 'วิธีทำแสดงการคำนวณทีละขั้นตอน'}
            </h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex space-x-3 items-start border-l-2 border-slate-200 pl-4 py-1">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                <div>
                  <h4 className="font-semibold text-slate-700">{lang === 'EN' ? 'Calculate the Sample Mean (x̄)' : 'คำนวณหาค่าเฉลี่ยเลขคณิตกลุ่มตัวอย่าง (x̄)'}</h4>
                  <p className="font-mono mt-1 text-xs">
                    x̄ = &Sigma; x / n = {results.sum} / {results.n} = {results.mean}
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 items-start border-l-2 border-slate-200 pl-4 py-1">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                <div>
                  <h4 className="font-semibold text-slate-700">{lang === 'EN' ? 'Calculate Sum of Squared Deviations' : 'หาผลรวมของผลต่างกำลังสอง (Sum of Squared Deviations)'}</h4>
                  <p className="font-mono mt-1 text-xs">
                    &Sigma; (x - x̄)&sup2; = {results.sumSqDev}
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 items-start border-l-2 border-slate-200 pl-4 py-1">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                <div>
                  <h4 className="font-semibold text-slate-700">{lang === 'EN' ? 'Calculate Sample Variance (s²)' : 'หาค่าความแปรปรวนของกลุ่มตัวอย่าง (s²)'}</h4>
                  <p className="font-mono mt-1 text-xs">
                    s&sup2; = &Sigma; (x - x̄)&sup2; / (n - 1) = {results.sumSqDev} / ({results.n} - 1) = {results.sumSqDev} / {results.df} = {results.variance}
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 items-start border-l-2 border-slate-200 pl-4 py-1">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                <div>
                  <h4 className="font-semibold text-slate-700">{lang === 'EN' ? 'Find Sample Standard Deviation (s)' : 'คำนวณหาส่วนเบี่ยงเบนมาตรฐานกลุ่มตัวอย่าง (s)'}</h4>
                  <p className="font-mono mt-1 text-xs">
                    s = &radic;s&sup2; = &radic;{results.variance} = {results.sd}
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
          ส่วนเบี่ยงเบนมาตรฐานกลุ่มตัวอย่าง (Sample Standard Deviation) คืออะไร? ความสำคัญของตัวหาร n - 1
        </h2>
        <p>
          ในการศึกษาสถิติเชิงอนุมาน (Inferential Statistics) เรามักไม่สามารถเข้าถึงข้อมูลของประชากรทั้งหมดได้เนื่องจากข้อจำกัดทางเวลาและต้นทุน 
          ด้วยเหตุนี้ นักวิจัยจึงมักใช้ข้อมูลจากการสุ่ม <strong>กลุ่มตัวอย่าง (Sample)</strong> มาวิเคราะห์ ค่าที่ได้จะนำมาคำนวณ 
          <strong>ส่วนเบี่ยงเบนมาตรฐานกลุ่มตัวอย่าง (Sample Standard Deviation - s)</strong> ซึ่งทำหน้าที่ประมาณการค่าเบี่ยงเบนมาตรฐานของประชากรจริง
        </p>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          ทำไมสูตรกลุ่มตัวอย่างต้องหารด้วย n - 1? เจาะลึก Bessel's Correction
        </h3>
        <p>
          หากเราใช้สูตรประชากร (ซึ่งหารด้วยจำนวนข้อมูลทั้งหมด n) มาคำนวณหากลุ่มตัวอย่าง ค่าความแปรปรวนที่ได้มักจะต่ำกว่าความเป็นจริง (Underestimate) 
          เนื่องจากตัวอย่างที่สุ่มออกมามักจะมีค่ากระจุกตัวอยู่ใกล้ค่าเฉลี่ยของตัวเองมากกว่าค่าเฉลี่ยจริงของประชากร 
          เพื่อความถูกต้อง นักคณิตศาสตร์ชื่อ ฟรีดริช เบสเซล (Friedrich Bessel) จึงเสนอสูตรปรับปรุงโดยปรับเปลี่ยนตัวหารให้เป็น <strong>n - 1</strong>
        </p>
        <p>
          การลบด้วย 1 ในตัวหารเรียกว่า <strong>องศาอิสระ (Degrees of Freedom - df)</strong> ซึ่งแสดงถึงจำนวนชิ้นข้อมูลที่มีอิสระในการแปรผันหลังจากการกำหนดค่าเฉลี่ยแล้ว 
          ตัวแก้ไขนี้ช่วยผลักดันให้ผลลัพธ์ของค่าความแปรปรวน (s&sup2;) และค่าส่วนเบี่ยงเบนมาตรฐาน (s) สูงขึ้นเล็กน้อย เพื่อสร้างตัวประมาณค่าที่ไม่เอนเอียง (Unbiased Estimator) 
          ของการกระจายตัวในประชากรที่แท้จริง
        </p>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          สูตรการคำนวณหาส่วนเบี่ยงเบนมาตรฐานกลุ่มตัวอย่าง
        </h3>
        <div className="bg-slate-100 p-4 rounded-lg font-mono text-slate-800 space-y-2">
          <p className="font-bold">s = &radic;[ &Sigma; (x_i - x̄)&sup2; / (n - 1) ]</p>
          <p>อธิบายตัวแปร:</p>
          <p>&bull; s = ส่วนเบี่ยงเบนมาตรฐานของกลุ่มตัวอย่าง</p>
          <p>&bull; x_i = ข้อมูลกลุ่มตัวอย่างแต่ละตัว</p>
          <p>&bull; x̄ (x-bar) = ค่าเฉลี่ยเลขคณิตของกลุ่มตัวอย่าง (x̄ = &Sigma;x_i / n)</p>
          <p>&bull; n = ขนาดกลุ่มตัวอย่าง (จำนวนข้อมูลทั้งหมด)</p>
          <p>&bull; n - 1 = ชั้นแห่งความเป็นอิสระ (Degrees of Freedom)</p>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          ขั้นตอนการคำนวณส่วนเบี่ยงเบนมาตรฐานกลุ่มตัวอย่างแบบทีละขั้นตอน
        </h3>
        <p>
          ในการคำนวณสถิตินี้ด้วยตนเอง มีขั้นตอนดังต่อไปนี้:
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>หาค่าเฉลี่ย (x̄):</strong> นำค่าข้อมูลทั้งหมดบวกกันแล้วหารด้วยจำนวนตัวอย่าง (n)</li>
          <li><strong>หาค่าความเบี่ยงเบน:</strong> นำข้อมูลแต่ละตัวตั้งแล้วลบด้วยค่าเฉลี่ย (x_i - x̄) สังเกตว่าผลรวมความเบี่ยงเบนดิบของข้อมูลทั้งหมดจะมีค่าเป็น 0 เสมอ</li>
          <li><strong>ยกกำลังสองความเบี่ยงเบน:</strong> นำผลต่างที่ได้ยกกำลังสอง (x_i - x̄)&sup2; เพื่อเปลี่ยนค่าลบให้เป็นค่าบวกทั้งหมด</li>
          <li><strong>หาผลรวมกำลังสอง:</strong> นำค่าผลต่างกำลังสองทั้งหมดมาบวกกัน (&Sigma; (x_i - x̄)&sup2;)</li>
          <li><strong>หารด้วย n - 1:</strong> นำผลรวมที่ได้หารด้วยจำนวนกลุ่มตัวอย่างลบหนึ่ง จะได้ค่าความแปรปรวนกลุ่มตัวอย่าง (s&sup2;)</li>
          <li><strong>ถอดสแควรูท:</strong> ถอดรากที่สองของผลหาร จะได้ส่วนเบี่ยงเบนมาตรฐาน (s) ในหน่วยวัดเดียวกับข้อมูลตั้งต้น</li>
        </ol>
      </article>
    </div>
  );
}

import React, { useState } from 'react';
import { Calculator, RefreshCw, BarChart2, Info, FileText, AlertCircle } from 'lucide-react';

export default function PopulationStandardDeviation({ lang = 'TH' }: any) {
  const [inputData, setInputData] = useState<string>('10, 20, 30, 45, 50');
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<{
    n: number;
    sum: number;
    mean: number;
    sumSqDev: number;
    variance: number;
    sd: number;
    tableData: { val: number; dev: number; devSq: number }[];
  } | null>(null);

  const calculateSD = () => {
    setError('');
    setResults(null);

    // Parse input
    const numbers = inputData
      .split(/[\s,;\n]+/)
      .map(num => num.trim())
      .filter(num => num !== '')
      .map(num => Number(num));

    if (numbers.length === 0) {
      setError(lang === 'EN' ? 'Please enter at least one valid number.' : 'กรุณากรอกข้อมูลตัวเลขอย่างน้อย 1 ตัว');
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

    const variance = sumSqDev / n;
    const sd = Math.sqrt(variance);

    setResults({
      n,
      sum: Number(sum.toFixed(6)),
      mean: Number(mean.toFixed(6)),
      sumSqDev: Number(sumSqDev.toFixed(6)),
      variance: Number(variance.toFixed(6)),
      sd: Number(sd.toFixed(6)),
      tableData
    });
  };

  const loadExample = (exampleType: string) => {
    if (exampleType === 'scores') {
      setInputData('85, 90, 78, 92, 88, 76, 95');
    } else if (exampleType === 'production') {
      setInputData('102, 98, 105, 100, 99, 101, 103, 97');
    } else {
      setInputData('12, 15, 18, 11, 20');
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
        <div className="p-3 bg-blue-600 text-white rounded-xl">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            {lang === 'EN' ? 'Population Standard Deviation Calculator' : 'เครื่องคำนวณส่วนเบี่ยงเบนมาตรฐานประชากร (Population S.D.)'}
          </h1>
          <p className="text-sm text-slate-500">
            {lang === 'EN'
              ? 'Calculate the S.D. and variance for an entire population dataset.'
              : 'คำนวณหาส่วนเบี่ยงเบนมาตรฐาน (S.D.) และความแปรปรวน (Variance) สำหรับข้อมูลระดับประชากร'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Input Panel */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {lang === 'EN' ? 'Enter Population Data (N)' : 'ป้อนข้อมูลประชากรทั้งหมด (N)'}
            </label>
            <p className="text-xs text-slate-400 mb-2">
              {lang === 'EN'
                ? 'Separate numbers by comma (,), space, or new line.'
                : 'คั่นด้วยเครื่องหมายจุลภาค (,), เว้นวรรค หรือขึ้นบรรทัดใหม่'}
            </p>
            <textarea
              className="w-full h-32 px-3 py-2 text-slate-700 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="e.g., 10, 20, 30, 45, 50"
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
              onClick={() => loadExample('scores')}
              className="px-2.5 py-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
            >
              {lang === 'EN' ? 'Exam Scores (7 students)' : 'คะแนนสอบ (7 คน)'}
            </button>
            <button
              onClick={() => loadExample('production')}
              className="px-2.5 py-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
            >
              {lang === 'EN' ? 'Production Units (8 days)' : 'ยอดผลิตรายวัน (8 วัน)'}
            </button>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={calculateSD}
              className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
            >
              <Calculator className="w-4 h-4" />
              <span>{lang === 'EN' ? 'Calculate Population S.D.' : 'คำนวณค่า S.D. ประชากร'}</span>
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
        <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-blue-100 p-5 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Info className="w-5 h-5 text-blue-300" />
              <h3 className="font-semibold text-white">
                {lang === 'EN' ? 'Population S.D.' : 'S.D. ประชากร คืออะไร?'}
              </h3>
            </div>
            <p className="text-xs text-blue-200/90 leading-relaxed">
              {lang === 'EN'
                ? 'Used when the dataset represents the entire group of interest (Population). We divide by N instead of (N - 1) because we have complete data for every member of the population.'
                : 'ใช้เมื่อข้อมูลที่มีอยู่ครอบคลุมสมาชิกทุกหน่วยในกลุ่มประชากรที่ศึกษา (ไม่มีการสุ่มกลุ่มตัวอย่าง) การคำนวณจึงหารด้วย N เพื่อสะท้อนค่าการกระจายของกลุ่มทั้งหมดอย่างแท้จริง'}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-blue-800">
            <h4 className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">
              {lang === 'EN' ? 'Population Formula' : 'สูตรคำนวณ'}
            </h4>
            <div className="text-[11px] font-mono space-y-1 bg-blue-950/50 p-2.5 rounded border border-blue-800/40">
              <p>&mu; = &Sigma; x / N</p>
              <p>&sigma;&sup2; = &Sigma; (x - &mu;)&sup2; / N</p>
              <p>&sigma; = &radic;&sigma;&sup2;</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results output */}
      {results && (
        <div className="space-y-6">
          {/* S.D. Result Summary Card */}
          <div className="bg-blue-50 border border-blue-200/60 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-blue-200/60 pb-4 md:pb-0 md:pr-6">
                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider block mb-1">
                  {lang === 'EN' ? 'Population S.D. (σ)' : 'ส่วนเบี่ยงเบนมาตรฐานประชากร (σ)'}
                </span>
                <span className="text-4xl font-extrabold text-blue-950">{results.sd}</span>
              </div>
              <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-white rounded-lg border border-blue-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    {lang === 'EN' ? 'Variance (σ²)' : 'ความแปรปรวน (σ²)'}
                  </span>
                  <span className="text-lg font-bold text-slate-700">{results.variance}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-blue-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    {lang === 'EN' ? 'Mean (μ)' : 'ค่าเฉลี่ยประชากร (μ)'}
                  </span>
                  <span className="text-lg font-bold text-slate-700">{results.mean}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-blue-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    {lang === 'EN' ? 'Sum (Σx)' : 'ผลรวมข้อมูล (Σx)'}
                  </span>
                  <span className="text-lg font-bold text-slate-700">{results.sum}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-blue-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    {lang === 'EN' ? 'Size (N)' : 'ขนาดประชากร (N)'}
                  </span>
                  <span className="text-lg font-bold text-slate-700">{results.n}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deviation Table & Calculation Details */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center">
              <BarChart2 className="w-4 h-4 text-blue-500 mr-2" />
              {lang === 'EN' ? 'Deviation Calculation Details' : 'ตารางแจกแจงค่าความเบี่ยงเบนรายบุคคล'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="py-2.5 px-4 font-semibold">{lang === 'EN' ? 'Data (x)' : 'ข้อมูล (x)'}</th>
                    <th className="py-2.5 px-4 font-semibold">{lang === 'EN' ? 'Deviation (x - μ)' : 'ผลต่างจากค่าเฉลี่ย (x - μ)'}</th>
                    <th className="py-2.5 px-4 font-semibold">{lang === 'EN' ? 'Squared Dev. (x - μ)²' : 'ผลต่างยกกำลังสอง (x - μ)²'}</th>
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
              <FileText className="w-4 h-4 text-blue-500 mr-2" />
              {lang === 'EN' ? 'Step-by-Step Calculation' : 'วิธีทำแสดงการคำนวณทีละขั้นตอน'}
            </h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex space-x-3 items-start border-l-2 border-slate-200 pl-4 py-1">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                <div>
                  <h4 className="font-semibold text-slate-700">{lang === 'EN' ? 'Calculate the Population Mean (μ)' : 'คำนวณหาค่าเฉลี่ยเลขคณิตประชากร (μ)'}</h4>
                  <p className="font-mono mt-1 text-xs">
                    &mu; = &Sigma; x / N = {results.sum} / {results.n} = {results.mean}
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 items-start border-l-2 border-slate-200 pl-4 py-1">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                <div>
                  <h4 className="font-semibold text-slate-700">{lang === 'EN' ? 'Calculate Sum of Squared Deviations' : 'หาผลรวมของผลต่างกำลังสอง (Sum of Squared Deviations)'}</h4>
                  <p className="font-mono mt-1 text-xs">
                    &Sigma; (x - &mu;)&sup2; = {results.sumSqDev}
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 items-start border-l-2 border-slate-200 pl-4 py-1">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                <div>
                  <h4 className="font-semibold text-slate-700">{lang === 'EN' ? 'Calculate Population Variance (σ²)' : 'หาค่าความแปรปรวนของประชากร (σ²)'}</h4>
                  <p className="font-mono mt-1 text-xs">
                    &sigma;&sup2; = &Sigma; (x - &mu;)&sup2; / N = {results.sumSqDev} / {results.n} = {results.variance}
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 items-start border-l-2 border-slate-200 pl-4 py-1">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                <div>
                  <h4 className="font-semibold text-slate-700">{lang === 'EN' ? 'Find Population Standard Deviation (σ)' : 'คำนวณหาส่วนเบี่ยงเบนมาตรฐาน (σ)'}</h4>
                  <p className="font-mono mt-1 text-xs">
                    &sigma; = &radic;&sigma;&sup2; = &radic;{results.variance} = {results.sd}
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
          เจาะลึกส่วนเบี่ยงเบนมาตรฐานประชากร (Population Standard Deviation) และวิธีการคำนวณที่ถูกต้อง
        </h2>
        <p>
          ในทางสถิติและการวิเคราะห์ข้อมูล <strong>ส่วนเบี่ยงเบนมาตรฐานประชากร (Population Standard Deviation)</strong> หรือสัญลักษณ์แทนด้วยอักษรกรีกตัวเล็กคือ <strong>ซิกมา (sigma - &sigma;)</strong> 
          คือตัววัดทางสถิติที่ใช้วัดปริมาณการกระจายตัวของชุดข้อมูลทั้งหมดออกจากค่าเฉลี่ยประชากร (&mu;) ค่าส่วนเบี่ยงเบนมาตรฐานที่ต่ำบ่งชี้ว่าข้อมูลส่วนใหญ่อยู่ใกล้กับค่าเฉลี่ย 
          ในขณะที่ค่าที่สูงแสดงว่าข้อมูลมีความกระจัดกระจายและห่างจากค่าเฉลี่ยมาก
        </p>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          ความแตกต่างสำคัญระหว่าง ส่วนเบี่ยงเบนมาตรฐานประชากร (Population S.D.) และกลุ่มตัวอย่าง (Sample S.D.)
        </h3>
        <p>
          ความเข้าใจผิดที่เกิดขึ้นบ่อยครั้งที่สุดในการคำนวณสถิติคือการเลือกสูตรส่วนเบี่ยงเบนมาตรฐานระหว่าง "ประชากร" และ "กลุ่มตัวอย่าง" 
          ความแตกต่างเชิงทฤษฎีนี้มีผลต่อสูตรคำนวณอย่างชัดเจน:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>ประชากร (Population):</strong> หมายถึงชุดข้อมูลทั้งหมดที่เราต้องการศึกษา เช่น หากเราวิจัยคะแนนสอบของนักเรียนห้อง ม.6/1 และเรามีคะแนนครบทุกคนทั้ง 40 คน ข้อมูลนี้ถือเป็นประชากรทั้งหมด การหาค่าเบี่ยงเบนมาตรฐานในสูตรจะทำการหารด้วยจำนวน N (ขนาดประชากรทั้งหมด)</li>
          <li><strong>กลุ่มตัวอย่าง (Sample):</strong> หมายถึงกลุ่มย่อยที่ดึงมาจากประชากรเพื่อการอ้างอิง เช่น สุ่มประชากรนักเรียนมา 10 คนจากทั้งโรงเรียน ในทางคณิตศาสตร์ สูตรสำหรับกลุ่มตัวอย่างจะต้องหารด้วย N - 1 (เรียกว่าการแก้ไขของเบสเซล - Bessel's correction) เพื่อชดเชยค่าความคลาดเคลื่อนและความไม่แน่นอนจากการไม่ได้เก็บข้อมูลทั้งหมด</li>
        </ul>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          สูตรทางคณิตศาสตร์ของส่วนเบี่ยงเบนมาตรฐานประชากร
        </h3>
        <p>
          สูตรคำนวณหาส่วนเบี่ยงเบนมาตรฐานระดับประชากรถูกนิยามดังนี้:
        </p>
        <div className="bg-slate-100 p-4 rounded-lg font-mono text-slate-800 space-y-2">
          <p className="font-bold">&sigma; = &radic;[ &Sigma; (x_i - &mu;)&sup2; / N ]</p>
          <p>เมื่อ:</p>
          <p>&bull; &sigma; (Sigma) = ค่าเบี่ยงเบนมาตรฐานของประชากร</p>
          <p>&bull; x_i = สมาชิกข้อมูลตัวที่ i ในชุดประชากร</p>
          <p>&bull; &mu; (Mu) = ค่าเฉลี่ยเลขคณิตประชากร (&mu; = &Sigma;x_i / N)</p>
          <p>&bull; N = จำนวนสมาชิกทั้งหมดในประชากร</p>
          <p>&bull; &Sigma; (Sigma ใหญ่) = ผลรวม</p>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          ทำไมเราต้องหาค่าเฉลี่ย (&mu;) และความแปรปรวน (&sigma;&sup2;) ก่อนหา S.D.?
        </h3>
        <p>
          กระบวนการหาส่วนเบี่ยงเบนมาตรฐานประกอบด้วยขั้นตอนที่เกี่ยวเนื่องกัน <strong>ความแปรปรวน (Variance - &sigma;&sup2;)</strong> คือ ค่าเฉลี่ยของกำลังสองของส่วนเบี่ยงเบนจากค่าเฉลี่ยเลขคณิต 
          เนื่องจากผลลัพธ์ของความแปรปรวนมีหน่วยวัดเป็นกำลังสอง (เช่น คะแนนสอบยกกำลังสอง หรือความสูงตารางเซนติเมตร) ซึ่งทำให้เข้าใจยากในการตีความจริง 
          การคำนวณขั้นสุดท้ายโดยการถอดสแควรูท (Square Root) ของความแปรปรวนจึงเกิดขึ้นเพื่อให้หน่วยกลับมาอยู่ในระดับปกติเดียวกับชุดข้อมูลเริ่มต้น (เช่น คะแนนเฉลี่ย หรือเซนติเมตร) 
          การใช้ระบบคำนวณนี้ช่วยให้ลดความยุ่งยากในการบวกลบเลขยกกำลังสองจำนวนมาก ป้องกันข้อผิดพลาดของทศนิยม และประหยัดเวลาอย่างเป็นระบบ
        </p>
      </article>
    </div>
  );
}

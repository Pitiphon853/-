import React, { useState } from 'react';
import { Calculator, RefreshCw, BarChart2, Info, FileText, AlertCircle } from 'lucide-react';

export default function MedianCalculator({ lang = 'TH' }: any) {
  const [inputData, setInputData] = useState<string>('12, 5, 22, 17, 8, 19, 35, 12, 10');
  const [sortedData, setSortedData] = useState<number[]>([]);
  const [median, setMedian] = useState<number | null>(null);
  const [steps, setSteps] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [stats, setStats] = useState<{ mean: number; min: number; max: number; count: number } | null>(null);

  const calculateMedian = () => {
    setError('');
    setMedian(null);
    setSortedData([]);
    setSteps([]);
    setStats(null);

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
    const sorted = [...numbers].sort((a, b) => a - b);
    setSortedData(sorted);

    // Basic Stats
    const sum = sorted.reduce((acc, curr) => acc + curr, 0);
    const mean = Number((sum / n).toFixed(4));
    const min = sorted[0];
    const max = sorted[n - 1];
    setStats({ mean, min, max, count: n });

    // Median logic
    let calculatedMedian = 0;
    const calculationSteps: any[] = [];

    calculationSteps.push({
      title: lang === 'EN' ? 'Step 1: Count the total number of elements (N)' : 'ขั้นตอนที่ 1: นับจำนวนข้อมูลทั้งหมด (N)',
      description: lang === 'EN' ? `Total count (N) = ${n}` : `จำนวนข้อมูลทั้งหมด (N) = ${n} ตัว`
    });

    calculationSteps.push({
      title: lang === 'EN' ? 'Step 2: Sort the data in ascending order' : 'ขั้นตอนที่ 2: เรียงลำดับข้อมูลจากน้อยไปมาก',
      description: sorted.join(', ')
    });

    if (n % 2 !== 0) {
      // Odd number of elements
      const middleIdx = Math.floor(n / 2);
      calculatedMedian = sorted[middleIdx];

      calculationSteps.push({
        title: lang === 'EN' ? 'Step 3: Find the middle position' : 'ขั้นตอนที่ 3: หาตำแหน่งกึ่งกลาง',
        description: lang === 'EN' 
          ? `Since N (${n}) is odd, the median is at position (N + 1) / 2 = (${n} + 1) / 2 = ${middleIdx + 1}`
          : `เนื่องจากจำนวนข้อมูล N (${n}) เป็นจำนวนคี่ ค่ามัธยฐานจะอยู่ในตำแหน่งที่ (N + 1) / 2 = (${n} + 1) / 2 = ตำแหน่งที่ ${middleIdx + 1}`
      });

      calculationSteps.push({
        title: lang === 'EN' ? 'Step 4: Identify the median value' : 'ขั้นตอนที่ 4: ระบุค่ามัธยฐาน',
        description: lang === 'EN'
          ? `The value at position ${middleIdx + 1} is ${calculatedMedian}`
          : `ค่าในตำแหน่งที่ ${middleIdx + 1} คือ ${calculatedMedian}`
      });
    } else {
      // Even number of elements
      const mid1 = sorted[n / 2 - 1];
      const mid2 = sorted[n / 2];
      calculatedMedian = (mid1 + mid2) / 2;

      calculationSteps.push({
        title: lang === 'EN' ? 'Step 3: Find the two middle positions' : 'ขั้นตอนที่ 3: หาตำแหน่งกึ่งกลางร่วม 2 ตำแหน่ง',
        description: lang === 'EN'
          ? `Since N (${n}) is even, the median is the average of the elements at positions N/2 (${n/2}) and (N/2) + 1 (${n/2 + 1}).`
          : `เนื่องจากจำนวนข้อมูล N (${n}) เป็นจำนวนคู่ ค่ามัธยฐานจะเป็นค่าเฉลี่ยของข้อมูลในตำแหน่งที่ N/2 (${n/2}) และ (N/2) + 1 (${n/2 + 1})`
      });

      calculationSteps.push({
        title: lang === 'EN' ? 'Step 4: Get the values at those positions' : 'ขั้นตอนที่ 4: ดึงค่าในตำแหน่งกึ่งกลางทั้งสอง',
        description: lang === 'EN'
          ? `Value at position ${n/2} = ${mid1}, and Value at position ${n/2 + 1} = ${mid2}`
          : `ค่าในตำแหน่งที่ ${n/2} คือ ${mid1} และตำแหน่งที่ ${n/2 + 1} คือ ${mid2}`
      });

      calculationSteps.push({
        title: lang === 'EN' ? 'Step 5: Calculate the average of these two values' : 'ขั้นตอนที่ 5: หาค่าเฉลี่ยของตัวเลขทั้งสองตัว',
        description: lang === 'EN'
          ? `Median = (${mid1} + ${mid2}) / 2 = ${calculatedMedian}`
          : `มัธยฐาน = (${mid1} + ${mid2}) / 2 = ${calculatedMedian}`
      });
    }

    setMedian(calculatedMedian);
    setSteps(calculationSteps);
  };

  const loadExample = (exampleType: string) => {
    if (exampleType === 'odd') {
      setInputData('45, 12, 85, 34, 9, 21, 67');
    } else if (exampleType === 'even') {
      setInputData('10, 20, 15, 30, 25, 40, 35, 5');
    } else {
      setInputData('5.5, -2.1, 8.4, 0, 12.3, 7.9, -1.5');
    }
  };

  const handleReset = () => {
    setInputData('');
    setSortedData([]);
    setMedian(null);
    setSteps([]);
    setError('');
    setStats(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-50 rounded-2xl shadow-sm border border-slate-100">
      {/* Title block */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-indigo-600 text-white rounded-xl">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            {lang === 'EN' ? 'Median Calculator' : 'เครื่องคำนวณค่ามัธยฐาน (Median)'}
          </h1>
          <p className="text-sm text-slate-500">
            {lang === 'EN' 
              ? 'Find the middle value of your data set with step-by-step calculation.' 
              : 'หาค่ากึ่งกลางของข้อมูล (มัธยฐาน) พร้อมแสดงวิธีการคำนวณและเรียงข้อมูลทีละขั้นตอน'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Input Panel */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {lang === 'EN' ? 'Enter Dataset' : 'ป้อนชุดข้อมูล'}
            </label>
            <p className="text-xs text-slate-400 mb-2">
              {lang === 'EN'
                ? 'Separate numbers by comma (,), space, or new line.'
                : 'คั่นด้วยเครื่องหมายจุลภาค (,), เว้นวรรค หรือขึ้นบรรทัดใหม่'}
            </p>
            <textarea
              className="w-full h-32 px-3 py-2 text-slate-700 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              placeholder="e.g., 10, 20, 30, 40"
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
              onClick={() => loadExample('odd')}
              className="px-2.5 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md transition-colors"
            >
              {lang === 'EN' ? 'Odd N (7 items)' : 'จำนวนข้อมูลคี่ (7 ตัว)'}
            </button>
            <button
              onClick={() => loadExample('even')}
              className="px-2.5 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md transition-colors"
            >
              {lang === 'EN' ? 'Even N (8 items)' : 'จำนวนข้อมูลคู่ (8 ตัว)'}
            </button>
            <button
              onClick={() => loadExample('decimal')}
              className="px-2.5 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md transition-colors"
            >
              {lang === 'EN' ? 'Decimals/Negatives' : 'ทศนิยมและค่าติดลบ'}
            </button>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={calculateMedian}
              className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
            >
              <Calculator className="w-4 h-4" />
              <span>{lang === 'EN' ? 'Calculate Median' : 'คำนวณมัธยฐาน'}</span>
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
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-indigo-100 p-5 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Info className="w-5 h-5 text-indigo-300" />
              <h3 className="font-semibold text-white">
                {lang === 'EN' ? 'What is Median?' : 'มัธยฐาน คืออะไร?'}
              </h3>
            </div>
            <p className="text-xs text-indigo-200/90 leading-relaxed">
              {lang === 'EN'
                ? 'The Median is the middle number in a sorted, ascending or descending, list of numbers and can be more descriptive of that data set than the average.'
                : 'มัธยฐาน (Median) คือค่าที่อยู่ตรงกลางของชุดข้อมูลเมื่อนำมาจัดเรียงลำดับจากน้อยไปมากหรือมากไปน้อย เป็นค่ากลางทางสถิติที่มีข้อดีคือ ไม่ได้รับผลกระทบจากค่าที่สูงหรือต่ำผิดปกติ (Outliers)'}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-indigo-800/80">
            <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">
              {lang === 'EN' ? 'Median Formulas' : 'สูตรการหาตำแหน่งมัธยฐาน'}
            </h4>
            <div className="text-xs font-mono space-y-1 bg-indigo-950/50 p-2 rounded border border-indigo-800/40">
              <p>Position (Odd N) = (N + 1) / 2</p>
              <p>Position (Even N) = N/2 &amp; (N/2) + 1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results and Steps */}
      {median !== null && (
        <div className="space-y-6">
          {/* Highlight Result Card */}
          <div className="bg-indigo-50 border border-indigo-200/60 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-indigo-200/60 pb-4 md:pb-0 md:pr-6 flex flex-col justify-center">
                <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider block mb-1">
                  {lang === 'EN' ? 'Calculated Median' : 'ค่ามัธยฐาน (Median)'}
                </span>
                <span className="text-4xl font-extrabold text-indigo-900">{median}</span>
              </div>
              <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-white rounded-lg border border-indigo-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    {lang === 'EN' ? 'Count (N)' : 'จำนวน (N)'}
                  </span>
                  <span className="text-lg font-bold text-slate-700">{stats?.count}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-indigo-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    {lang === 'EN' ? 'Mean (Average)' : 'ค่าเฉลี่ย (Mean)'}
                  </span>
                  <span className="text-lg font-bold text-slate-700">{stats?.mean}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-indigo-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    {lang === 'EN' ? 'Min Value' : 'ค่าน้อยที่สุด'}
                  </span>
                  <span className="text-lg font-bold text-slate-700">{stats?.min}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-indigo-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    {lang === 'EN' ? 'Max Value' : 'ค่ามากที่สุด'}
                  </span>
                  <span className="text-lg font-bold text-slate-700">{stats?.max}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sorted Visual Block */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center">
              <BarChart2 className="w-4 h-4 text-indigo-500 mr-2" />
              {lang === 'EN' ? 'Sorted Data Visualizer' : 'ภาพแสดงการเรียงลำดับชุดข้อมูล'}
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {sortedData.map((val, idx) => {
                const isMiddle = 
                  sortedData.length % 2 !== 0 
                    ? idx === Math.floor(sortedData.length / 2)
                    : idx === (sortedData.length / 2 - 1) || idx === (sortedData.length / 2);
                return (
                  <div
                    key={idx}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold flex flex-col items-center justify-center transition-all ${
                      isMiddle
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 scale-105 border border-indigo-700'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <span className="text-lg">{val}</span>
                    <span className={`text-[9px] mt-0.5 ${isMiddle ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {lang === 'EN' ? `Pos ${idx + 1}` : `ตัวที่ ${idx + 1}`}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-slate-400 mt-3 italic">
              * {lang === 'EN' ? 'The highlighted elements are the center of the sorted data.' : 'แถบสีน้ำเงินคือตัวเลขที่อยู่ตำแหน่งกึ่งกลางของข้อมูล'}
            </p>
          </div>

          {/* Steps Explanation */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center">
              <FileText className="w-4 h-4 text-indigo-500 mr-2" />
              {lang === 'EN' ? 'Detailed Calculation Steps' : 'ขั้นตอนการแสดงวิธีทำอย่างละเอียด'}
            </h3>
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex space-x-3 items-start border-l-2 border-slate-200 pl-4 py-1">
                  <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700">{step.title}</h4>
                    <p className="text-sm text-slate-600 font-mono mt-1 whitespace-pre-line">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SEO Article */}
      <hr className="my-8 border-slate-200" />
      <article className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-4">
        <h2 className="text-xl font-bold text-slate-800 mb-3">
          มัธยฐาน (Median) คืออะไร? เจาะลึกสูตรการคำนวณและบทบาทในทางสถิติวิทยา
        </h2>
        <p>
          ในทางสถิติศาสตร์ <strong>มัธยฐาน (Median)</strong> หรือค่าวิตถาร คือ ค่ากลางของชุดข้อมูลที่ได้จากการจัดเรียงข้อมูลทั้งหมดจากน้อยที่สุดไปหามากที่สุด (หรือจากมากที่สุดไปหาน้อยที่สุด) 
          และเลือกเอาค่าที่อยู่ตำแหน่งกึ่งกลางพอดีมาเป็นตัวแทน ค่ามัธยฐานทำหน้าที่เป็นตัวแบ่งแยกชุดข้อมูลออกเป็นสองส่วนเท่า ๆ กัน โดยครึ่งหนึ่งของจำนวนข้อมูลจะมีค่าน้อยกว่าหรือเท่ากับค่ามัธยฐาน 
          และอีกครึ่งหนึ่งจะมีค่ามากกว่าหรือเท่ากับค่ามัธยฐาน
        </p>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          ความแตกต่างระหว่าง ค่าเฉลี่ย (Mean) มัธยฐาน (Median) และฐานนิยม (Mode)
        </h3>
        <p>
          ค่ากลางของข้อมูลที่เป็นที่นิยมมีอยู่ 3 ตัวหลัก ๆ ได้แก่ ค่าเฉลี่ยเลขคณิต (Arithmetic Mean), มัธยฐาน (Median) และฐานนิยม (Mode) 
          ซึ่งแต่ละตัวมีข้อดีและข้อจำกัดในการใช้งานที่แตกต่างกัน:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>ค่าเฉลี่ยเลขคณิต (Mean):</strong> คำนวณจากการนำข้อมูลทุกตัวบวกกันแล้วหารด้วยจำนวนข้อมูลทั้งหมด มีข้อเสียคือ หากในชุดข้อมูลมีค่าที่ต่ำมากหรือสูงมากผิดปกติ (Outliers) เช่น ข้อมูลเงินเดือนของพนักงานทั่วไปที่มีประธานบริษัทปนอยู่ ค่าเฉลี่ยจะถูกดึงให้สูงขึ้นจนไม่สะท้อนความเป็นจริงของคนส่วนใหญ่</li>
          <li><strong>มัธยฐาน (Median):</strong> เนื่องจากใช้ตำแหน่งในการระบุค่า จึงตัดปัญหาเรื่อง Outliers ออกไปได้โดยสิ้นเชิง เหมาะสำหรับการวัดมูลค่าบ้าน รายได้ประชากร หรือคะแนนสอบที่มีการกระจายตัวแบบเบ้</li>
          <li><strong>ฐานนิยม (Mode):</strong> คือ ข้อมูลที่มีความถี่สูงสุดหรือปรากฏบ่อยครั้งที่สุด เหมาะสำหรับข้อมูลเชิงคุณภาพ เช่น สีที่เป็นที่นิยมที่สุด ไซส์เสื้อผ้าที่ขายดีที่สุด</li>
        </ul>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          สูตรและขั้นตอนการหาค่ามัธยฐาน (สำหรับข้อมูลที่ไม่ได้แจกแจงความถี่)
        </h3>
        <p>
          การหาค่ามัธยฐานมีขั้นตอนสำคัญดังต่อไปนี้:
        </p>
        
        <div className="bg-slate-100 p-4 rounded-lg font-mono text-slate-800 space-y-3">
          <p className="font-bold">ขั้นตอนที่ 1: เรียงลำดับข้อมูล (Sorting)</p>
          <p>จัดเรียงข้อมูลดิบทั้งหมดจากน้อยไปมาก</p>
          
          <p className="font-bold">ขั้นตอนที่ 2: หาตำแหน่งกึ่งกลางของข้อมูล (Position Finder)</p>
          <p>สูตรตำแหน่งของมัธยฐานสำหรับข้อมูลจำนวน N ตัว คือ: ตำแหน่งมัธยฐาน = (N + 1) / 2</p>

          <p className="font-bold">ขั้นตอนที่ 3: ระบุค่าตามประเภทจำนวนข้อมูล</p>
          <p>• กรณีจำนวนข้อมูล N เป็นจำนวนคี่ (เช่น N = 7): ตำแหน่งที่ได้จะเป็นจำนวนเต็มพอดี เช่น (7 + 1) / 2 = 4 ค่ามัธยฐานคือข้อมูลในลำดับที่ 4</p>
          <p>• กรณีจำนวนข้อมูล N เป็นจำนวนคู่ (เช่น N = 8): ตำแหน่งที่ได้จะเป็นทศนิยม .5 เช่น (8 + 1) / 2 = 4.5 ค่ามัธยฐานหาได้โดยการนำค่าในตำแหน่งที่ 4 และตำแหน่งที่ 5 มารวมกันแล้วหารด้วยสอง</p>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          ทำไมการใช้ เครื่องคำนวณค่ามัธยฐาน (Median Calculator) จึงมีประโยชน์?
        </h3>
        <p>
          เมื่อต้องเผชิญกับชุดข้อมูลขนาดใหญ่ การจัดเรียงและนับหาตำแหน่งข้อมูลด้วยมือเป็นเรื่องที่เสียเวลาและมีโอกาสเกิดความผิดพลาดได้ง่าย เครื่องมือคำนวณค่ามัธยฐานนี้ได้รับการออกแบบมาเพื่อแก้ไขปัญหาดังกล่าว 
          โดยประมวลผลการเรียงลำดับ แยกข้อมูลคี่-คู่ นำเสนอขั้นตอนการคำนวณทีละขั้น และช่วยคำนวณหาค่าเฉลี่ย ค่าต่ำสุด-สูงสุดไปพร้อม ๆ กัน 
          ช่วยอำนวยความสะดวกแก่นักเรียน นักศึกษา นักวิจัย และนักวิเคราะห์ข้อมูลในการคำนวณสถิติเบื้องต้นได้อย่างรวดเร็วและถูกต้องแม่นยำ 100%
        </p>
      </article>
    </div>
  );
}

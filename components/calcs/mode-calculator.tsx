import React, { useState } from 'react';
import { Calculator, RefreshCw, BarChart2, Info, FileText, AlertCircle } from 'lucide-react';

export default function ModeCalculator({ lang = 'TH' }: any) {
  const [inputData, setInputData] = useState<string>('5, 8, 12, 5, 17, 8, 8, 19, 12, 8, 5');
  const [modes, setModes] = useState<number[]>([]);
  const [frequencies, setFrequencies] = useState<{ value: number; count: number }[]>([]);
  const [maxCount, setMaxCount] = useState<number>(0);
  const [modeType, setModeType] = useState<string>(''); // unimodal, bimodal, multimodal, nomode
  const [error, setError] = useState<string>('');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const calculateMode = () => {
    setError('');
    setModes([]);
    setFrequencies([]);
    setMaxCount(0);
    setModeType('');
    setIsCalculated(false);

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

    // Calculate frequencies
    const freqMap: { [key: number]: number } = {};
    numbers.forEach(num => {
      freqMap[num] = (freqMap[num] || 0) + 1;
    });

    const freqArray = Object.keys(freqMap).map(key => ({
      value: Number(key),
      count: freqMap[Number(key)]
    }));

    // Sort by count descending, then value ascending
    freqArray.sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.value - b.value;
    });

    const maxFreq = freqArray[0]?.count || 0;
    const allSameFreq = freqArray.every(item => item.count === freqArray[0].count);

    let detectedModes: number[] = [];
    let detectedType = '';

    if (maxFreq === 1) {
      detectedType = 'nomode';
    } else if (allSameFreq) {
      // If all items have the same frequency, traditionally there's no mode
      detectedType = 'nomode';
    } else {
      detectedModes = freqArray
        .filter(item => item.count === maxFreq)
        .map(item => item.value);

      if (detectedModes.length === 1) {
        detectedType = 'unimodal';
      } else if (detectedModes.length === 2) {
        detectedType = 'bimodal';
      } else {
        detectedType = 'multimodal';
      }
    }

    setFrequencies(freqArray);
    setMaxCount(maxFreq);
    setModes(detectedModes);
    setModeType(detectedType);
    setIsCalculated(true);
  };

  const loadExample = (exampleType: string) => {
    if (exampleType === 'unimodal') {
      setInputData('4, 7, 3, 8, 7, 9, 7, 2, 10, 7');
    } else if (exampleType === 'bimodal') {
      setInputData('3, 5, 8, 3, 9, 8, 12, 3, 8, 2');
    } else if (exampleType === 'nomode') {
      setInputData('11, 23, 45, 67, 89, 90');
    }
  };

  const handleReset = () => {
    setInputData('');
    setModes([]);
    setFrequencies([]);
    setMaxCount(0);
    setModeType('');
    setError('');
    setIsCalculated(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-50 rounded-2xl shadow-sm border border-slate-100">
      {/* Title block */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-teal-600 text-white rounded-xl">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            {lang === 'EN' ? 'Mode Calculator' : 'เครื่องคำนวณค่าฐานนิยม (Mode)'}
          </h1>
          <p className="text-sm text-slate-500">
            {lang === 'EN'
              ? 'Find the most frequently occurring value(s) in your dataset.'
              : 'หาข้อมูลที่ปรากฏขึ้นบ่อยครั้งที่สุดในชุดข้อมูล (ค่าความถี่สูงสุด)'}
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
              className="w-full h-32 px-3 py-2 text-slate-700 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              placeholder="e.g., 5, 8, 12, 5, 17, 8"
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
              onClick={() => loadExample('unimodal')}
              className="px-2.5 py-1 text-xs bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-md transition-colors"
            >
              {lang === 'EN' ? 'Single Mode (Unimodal)' : 'ฐานนิยมเดี่ยว (Unimodal)'}
            </button>
            <button
              onClick={() => loadExample('bimodal')}
              className="px-2.5 py-1 text-xs bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-md transition-colors"
            >
              {lang === 'EN' ? 'Two Modes (Bimodal)' : 'ฐานนิยมสองค่า (Bimodal)'}
            </button>
            <button
              onClick={() => loadExample('nomode')}
              className="px-2.5 py-1 text-xs bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-md transition-colors"
            >
              {lang === 'EN' ? 'No Mode' : 'ไม่มีฐานนิยม'}
            </button>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={calculateMode}
              className="flex-1 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
            >
              <Calculator className="w-4 h-4" />
              <span>{lang === 'EN' ? 'Calculate Mode' : 'คำนวณฐานนิยม'}</span>
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
        <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-teal-100 p-5 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Info className="w-5 h-5 text-teal-300" />
              <h3 className="font-semibold text-white">
                {lang === 'EN' ? 'What is Mode?' : 'ฐานนิยม คืออะไร?'}
              </h3>
            </div>
            <p className="text-xs text-teal-200/90 leading-relaxed">
              {lang === 'EN'
                ? 'The Mode is the value that appears most frequently in a data set. A dataset may have one mode (unimodal), more than one mode (bimodal/multimodal), or no mode at all.'
                : 'ฐานนิยม (Mode) คือข้อมูลที่มีความถี่สูงสุด หรือจำนวนที่ซ้ำกันมากที่สุดในชุดข้อมูลหนึ่ง ๆ ฐานนิยมสามารถมีค่าเดียว (Unimodal), หลายค่า (Bimodal/Multimodal) หรือไม่มีเลยก็ได้ หากข้อมูลทุกตัวมีความถี่เท่ากันหมด'}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-teal-850">
            <h4 className="text-xs font-semibold text-teal-300 uppercase tracking-wider mb-2">
              {lang === 'EN' ? 'Key Classifications' : 'การจำแนกประเภทฐานนิยม'}
            </h4>
            <ul className="text-[11px] space-y-1 text-teal-200/80 list-disc pl-4">
              <li><strong>Unimodal:</strong> {lang === 'EN' ? '1 distinct mode' : 'มีฐานนิยมค่าเดียว'}</li>
              <li><strong>Bimodal:</strong> {lang === 'EN' ? '2 distinct modes' : 'มีฐานนิยม 2 ค่า'}</li>
              <li><strong>Multimodal:</strong> {lang === 'EN' ? '3+ modes' : 'มีฐานนิยมตั้งแต่ 3 ค่าขึ้นไป'}</li>
              <li><strong>No Mode:</strong> {lang === 'EN' ? 'All values occur equally' : 'ข้อมูลไม่ซ้ำกัน หรือความถี่เท่ากันทั้งหมด'}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {isCalculated && (
        <div className="space-y-6">
          {/* Main Mode Output Card */}
          <div className="bg-teal-50 border border-teal-200/60 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-teal-200/60 pb-4 md:pb-0 md:pr-6 flex flex-col justify-center">
                <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider block mb-1">
                  {lang === 'EN' ? 'Calculated Mode' : 'ค่าฐานนิยม (Mode)'}
                </span>
                {modeType === 'nomode' ? (
                  <span className="text-2xl font-bold text-slate-500">
                    {lang === 'EN' ? 'No Mode' : 'ไม่มีฐานนิยม'}
                  </span>
                ) : (
                  <span className="text-4xl font-extrabold text-teal-900">
                    {modes.join(', ')}
                  </span>
                )}
              </div>
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-white rounded-lg border border-teal-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    {lang === 'EN' ? 'Frequency' : 'ความถี่ (จำนวนที่ซ้ำ)'}
                  </span>
                  <span className="text-lg font-bold text-slate-700">
                    {modeType === 'nomode' ? '-' : `${maxCount} ${lang === 'EN' ? 'times' : 'ครั้ง'}`}
                  </span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-teal-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    {lang === 'EN' ? 'Type of Mode' : 'ประเภทฐานนิยม'}
                  </span>
                  <span className="text-sm font-bold text-slate-700 capitalize">
                    {modeType === 'unimodal' && (lang === 'EN' ? 'Unimodal (1 Mode)' : 'ฐานนิยมเดี่ยว')}
                    {modeType === 'bimodal' && (lang === 'EN' ? 'Bimodal (2 Modes)' : 'ฐานนิยมคู่')}
                    {modeType === 'multimodal' && (lang === 'EN' ? 'Multimodal (3+ Modes)' : 'หลายฐานนิยม')}
                    {modeType === 'nomode' && (lang === 'EN' ? 'No Mode' : 'ไม่มีฐานนิยม')}
                  </span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-teal-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    {lang === 'EN' ? 'Total Unique Values' : 'จำนวนข้อมูลที่ไม่ซ้ำ'}
                  </span>
                  <span className="text-lg font-bold text-slate-700">{frequencies.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Frequency Table & Simple Chart Visualizer */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center">
              <BarChart2 className="w-4 h-4 text-teal-500 mr-2" />
              {lang === 'EN' ? 'Frequency Distribution & Visualizer' : 'ตารางแจกแจงความถี่และกราฟแสดงผล'}
            </h3>
            
            <div className="space-y-3">
              {frequencies.map((item, idx) => {
                const isMode = modes.includes(item.value);
                const percent = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                
                return (
                  <div key={idx} className="flex items-center space-x-3 text-sm">
                    <div className="w-16 font-mono text-right font-semibold text-slate-700">
                      {item.value}
                    </div>
                    <div className="flex-1 bg-slate-100 h-6 rounded-md overflow-hidden relative border border-slate-100">
                      <div
                        className={`h-full transition-all duration-500 rounded-md ${
                          isMode 
                            ? 'bg-teal-500 shadow-sm border-r border-teal-600' 
                            : 'bg-slate-300'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                      <span className="absolute inset-y-0 left-2 flex items-center text-xs font-medium text-slate-800">
                        {item.count} {lang === 'EN' ? 'occurrences' : 'ครั้ง'}
                      </span>
                    </div>
                    <div className="w-20 text-xs font-semibold text-slate-400">
                      {isMode && (
                        <span className="text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                          Mode
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SEO Article */}
      <hr className="my-8 border-slate-200" />
      <article className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-4">
        <h2 className="text-xl font-bold text-slate-800 mb-3">
          ฐานนิยม (Mode) คืออะไร? สรุปวิธีการหาและกรณีการใช้งานจริงในวิชาสถิติ
        </h2>
        <p>
          ในทางสถิติศาสตร์ <strong>ฐานนิยม (Mode)</strong> คือ ค่ากลางของข้อมูลที่มีความถี่ในการเกิดขึ้นมากที่สุด หรือตัวเลขที่ปรากฏขึ้นซ้ำกันบ่อยที่สุดในชุดข้อมูลนั้น ๆ 
          ฐานนิยมเป็นหนึ่งในมาตรวัดแนวโน้มเข้าสู่ส่วนกลาง (Measures of Central Tendency) ร่วมกับค่าเฉลี่ยเลขคณิต (Arithmetic Mean) และมัธยฐาน (Median)
        </p>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          คุณลักษณะเด่นและข้อดีเฉพาะตัวของฐานนิยม
        </h3>
        <p>
          ฐานนิยมมีจุดเด่นหลัก ๆ ที่เหนือกว่าค่ากลางตัวอื่น ๆ ดังนี้:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>ใช้ได้กับข้อมูลเชิงคุณภาพ (Nominal Data):</strong> ไม่เหมือนกับ Mean หรือ Median ที่ต้องนำมาคำนวณบวก ลบ คูณ หาร ซึ่งทำได้กับข้อมูลเชิงตัวเลขเท่านั้น ฐานนิยมสามารถนำมาประยุกต์ใช้หาข้อมูลชนิดข้อความได้ เช่น สีรถยนต์ที่คนไทยนิยมขับมากที่สุด หรือสาขาของสินค้าที่มียอดสั่งซื้อสูงสุด</li>
          <li><strong>ไม่ได้รับผลกระทบจากค่าสุดโต่ง (Outliers):</strong> เช่นเดียวกับมัธยฐาน ข้อมูลที่มีค่าสูงหรือต่ำผิดปกติมากๆ จะไม่มีอิทธิพลต่อความถี่สูงสุดของค่าอื่นๆ ในข้อมูล</li>
          <li><strong>เข้าใจง่ายและใช้งานได้จริง:</strong> ในแง่ธุรกิจการค้า การหาว่าไซส์รองเท้าขนาดใดขายดีที่สุด (ฐานนิยม) มีความสำคัญเชิงปฏิบัติการมากกว่าการคำนวณหาค่าเฉลี่ยของไซส์รองเท้าทั้งหมด</li>
        </ul>

        <h3 className="text-lg font-semibold text-slate-850 mt-4">
          ประเภทการจำแนกค่าฐานนิยมของชุดข้อมูล
        </h3>
        <p>
          ชุดข้อมูลต่าง ๆ สามารถมีความถี่ของข้อมูลซ้ำกันในหลายมิติ ทำให้แบ่งลักษณะฐานนิยมออกเป็น 4 รูปแบบหลัก:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Unimodal (ฐานนิยมเดี่ยว):</strong> ชุดข้อมูลที่มีตัวเลขหนึ่งเดียวที่ซ้ำมากที่สุด เช่น [2, 3, 3, 4, 5] ฐานนิยมคือ 3 (มีความถี่เป็น 2)</li>
          <li><strong>Bimodal (ฐานนิยมคู่):</strong> ชุดข้อมูลที่มีค่าซ้ำสูงสุดเท่ากัน 2 ค่า เช่น [1, 2, 2, 3, 4, 4, 5] ฐานนิยมคือ 2 และ 4 (มีความถี่เท่ากันคือ 2 ครั้ง)</li>
          <li><strong>Multimodal (ฐานนิยมหลายค่า):</strong> ชุดข้อมูลที่มีความถี่สูงสุดซ้ำกันมากกว่า 2 ค่าขึ้นไป</li>
          <li><strong>No Mode (ไม่มีฐานนิยม):</strong> เกิดขึ้นเมื่อข้อมูลทุกตัวปรากฏขึ้นเพียงครั้งเดียวเท่ากันทั้งหมด เช่น [10, 20, 30, 40] หรือในกรณีที่ข้อมูลทุกตัวมีความถี่เท่ากันหมด เช่น [2, 2, 4, 4, 6, 6] ซึ่งไม่สะท้อนค่ากลางใดเด่นชัด</li>
        </ol>

        <h3 className="text-lg font-semibold text-slate-800 mt-4">
          การประยุกต์ใช้งานและประโยชน์ของเครื่องมือคำนวณฐานนิยมออนไลน์
        </h3>
        <p>
          เครื่องมือคำนวณค่าฐานนิยม (Mode Calculator) เป็นระบบช่วยประมวลผลข้อมูลสถิติพื้นฐาน เพียงกรอกชุดข้อมูลที่ระบุด้วยเครื่องหมายจุลภาค 
          ระบบจะวิเคราะห์ค่านับ (Count) แจกแจงความถี่ และคำนวณหาประเภทของฐานนิยมทันที เหมาะสำหรับคุณครู นักเรียน 
          และผู้ทำวิจัยที่ต้องการวิเคราะห์คำตอบจากแบบสอบถาม (เช่น สรุปคะแนนประเมินที่คนเลือกตอบมากที่สุด) หรือใช้ในกระบวนการจัดเก็บคลังสินค้า (Inventory Management) 
          เพื่อดูว่าสินค้าชิ้นใดได้รับความนิยมสั่งซื้อสูงสุดในแต่ละรอบบิล
        </p>
      </article>
    </div>
  );
}

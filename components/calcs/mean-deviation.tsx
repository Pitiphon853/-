import React, { useState } from 'react';
import { MinusCircle, Calculator, RefreshCw, Info } from 'lucide-react';

export default function MeanDeviationCalculator({ lang }: any) {
  const [inputData, setInputData] = useState('12, 15, 18, 20, 22, 25, 28');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const arr = inputData.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const n = arr.length;
    if (n < 2) {
      setResult({ error: "โปรดป้อนตัวเลขอย่างน้อย 2 ตัว" });
      return;
    }

    // Calculations based on Mean
    const mean = arr.reduce((a, b) => a + b, 0) / n;
    const madFromMean = arr.reduce((a, b) => a + Math.abs(b - mean), 0) / n;
    
    // Calculations based on Median
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(n / 2);
    const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    const madFromMedian = arr.reduce((a, b) => a + Math.abs(b - median), 0) / n;

    // Coefficient of Mean Deviation
    const coefMDMean = madFromMean / mean;
    const coefMDMedian = madFromMedian / median;

    setResult({
      n,
      mean: mean.toFixed(4),
      madFromMean: madFromMean.toFixed(4),
      coefMDMean: coefMDMean.toFixed(4),
      median: median.toFixed(4),
      madFromMedian: madFromMedian.toFixed(4),
      coefMDMedian: coefMDMedian.toFixed(4),
      error: null
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-amber-50 rounded-xl">
          <MinusCircle className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">เครื่องคำนวณส่วนเบี่ยงเบนเฉลี่ย (Mean Deviation)</h1>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          ป้อนชุดข้อมูล (คั่นด้วยเครื่องหมายจุลภาค ,)
        </label>
        <textarea
          rows={3}
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
          placeholder="เช่น 10, 20, 30, 40, 50"
        />
        
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={calculate}
            className="flex-1 min-w-[200px] bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>คำนวณส่วนเบี่ยงเบนเฉลี่ย</span>
          </button>
          <button
            onClick={() => { setInputData(''); setResult(null); }}
            className="flex-1 min-w-[150px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>ล้างค่า</span>
          </button>
        </div>
      </div>

      {result && !result.error && (
        <div className="bg-amber-50 rounded-xl p-6 mb-8 border border-amber-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2" /> ผลการคำนวณ
          </h2>
          <div className="mb-4 text-sm text-slate-600">จำนวนข้อมูล (n) = {result.n}</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-100">
              <h3 className="font-semibold text-slate-800 border-b pb-2 mb-3">วัดจากค่าเฉลี่ย (Mean)</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-slate-500">ค่าเฉลี่ยเลขคณิต (Mean)</div>
                  <div className="text-xl font-medium">{result.mean}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">ส่วนเบี่ยงเบนเฉลี่ย (M.D.)</div>
                  <div className="text-2xl font-bold text-amber-600">{result.madFromMean}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">สัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย</div>
                  <div className="text-lg font-medium">{result.coefMDMean}</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-100">
              <h3 className="font-semibold text-slate-800 border-b pb-2 mb-3">วัดจากมัธยฐาน (Median)</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-slate-500">มัธยฐาน (Median)</div>
                  <div className="text-xl font-medium">{result.median}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">ส่วนเบี่ยงเบนเฉลี่ย (M.D.)</div>
                  <div className="text-2xl font-bold text-amber-600">{result.madFromMedian}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">สัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย</div>
                  <div className="text-lg font-medium">{result.coefMDMedian}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {result && result.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-100">
          {result.error}
        </div>
      )}

      <article className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 mt-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold mb-4">ส่วนเบี่ยงเบนเฉลี่ย (Mean Deviation) คืออะไร? สถิติพื้นฐานเพื่อการวัดความเบี่ยงเบนจากค่ากลาง</h2>
        <p>
          ในการวัดการกระจายของข้อมูล <strong>ส่วนเบี่ยงเบนเฉลี่ย (Mean Deviation ย่อว่า M.D.)</strong> หรือหลายคนเรียกว่า <em>ส่วนเบี่ยงเบนสัมบูรณ์เฉลี่ย (Mean Absolute Deviation หรือ MAD)</em> เป็นหนึ่งในค่าวัดทางสถิติที่สำคัญ ช่วยให้เราทราบว่าโดยเฉลี่ยแล้ว ข้อมูลแต่ละตัวในชุดนั้น อยู่ห่างจาก "ค่ากลาง" มากน้อยเพียงใด ยิ่งค่าส่วนเบี่ยงเบนเฉลี่ยมีค่ามาก แสดงว่าข้อมูลมีการกระจายตัวสูง (เกาะกลุ่มน้อย) หากมีค่าน้อย แสดงว่าข้อมูลเกาะกลุ่มกันแน่นอยู่รอบๆ ค่ากลาง
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ทำไมถึงต้องมี "สัมบูรณ์" (Absolute)?</h3>
        <p>
          หากเรานำข้อมูลทุกตัวมาลบด้วยค่าเฉลี่ยเฉยๆ แล้วจับบวกกัน ตามกฎทางคณิตศาสตร์แล้ว ผลรวมของความเบี่ยงเบนรอบค่าเฉลี่ยเลขคณิตจะ <strong>เท่ากับ 0 เสมอ</strong> (Σ(x - x̄) = 0) เพราะค่าที่มากกว่าค่าเฉลี่ยและน้อยกว่าค่าเฉลี่ยจะหักล้างกันไปจนหมด เพื่อแก้ปัญหานี้ เราจึงต้องใส่ <strong>ค่าสัมบูรณ์ (Absolute Value, สัญลักษณ์ | |)</strong> ให้กับผลลัพธ์การลบแต่ละตัว เพื่อบังคับให้ทุกระยะห่างเป็นค่าบวกทั้งหมดก่อนนำมาหาค่าเฉลี่ยนั่นเอง
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">สูตรที่ใช้คำนวณ (Formulas)</h3>
        <p>
          การหาส่วนเบี่ยงเบนเฉลี่ยสามารถวัดระยะห่างจาก "ค่าเฉลี่ย (Mean)" หรือ "มัธยฐาน (Median)" ก็ได้ (บางครั้งอาจใช้ฐานนิยม แต่น้อยมาก)
        </p>
        <p><strong>1. ส่วนเบี่ยงเบนเฉลี่ยรอบค่าเฉลี่ย (Mean Deviation from Mean):</strong></p>
        <p className="bg-slate-50 p-4 rounded-lg my-3 font-mono text-sm text-center">
          M.D.(Mean) = Σ |x<sub>i</sub> - x̄| / N
        </p>
        <p>
          โดยที่ x<sub>i</sub> คือข้อมูลแต่ละตัว, x̄ คือค่าเฉลี่ยเลขคณิตของข้อมูล, และ N คือจำนวนข้อมูลทั้งหมด
        </p>

        <p><strong>2. ส่วนเบี่ยงเบนเฉลี่ยรอบมัธยฐาน (Mean Deviation from Median):</strong></p>
        <p className="bg-slate-50 p-4 rounded-lg my-3 font-mono text-sm text-center">
          M.D.(Median) = Σ |x<sub>i</sub> - Median| / N
        </p>
        <p>
          หลักการตามทฤษฎีสถิติระบุว่า ผลรวมของค่าสัมบูรณ์ความเบี่ยงเบนรอบ "มัธยฐาน" จะมีค่าน้อยที่สุดเสมอเมื่อเทียบกับจุดอื่นๆ ดังนั้นการคำนวณ M.D. จากมัธยฐานจึงเป็นวิธีที่ดีที่สุดในทางทฤษฎี แต่ในทางปฏิบัติคนมักนิยมใช้การเบี่ยงเบนจากค่าเฉลี่ยมากกว่า
        </p>

        <p className="mt-4">
          นอกจากนี้ หากเราต้องการเปรียบเทียบการกระจายของข้อมูล 2 ชุดที่หน่วยไม่เหมือนกัน (เช่น น้ำหนักเป็นกิโลกรัม เทียบกับส่วนสูงเป็นเซนติเมตร) เราต้องคำนวณ <strong>สัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย (Coefficient of Mean Deviation)</strong> โดยเอาค่า M.D. ไปหารด้วยค่ากลางที่ใช้เป็นฐาน (Mean หรือ Median) ทำให้ได้ค่าที่เป็นสัดส่วนปราศจากหน่วย
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ข้อดีของการใช้ส่วนเบี่ยงเบนเฉลี่ย</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>เข้าใจง่าย:</strong> การอธิบายว่า "โดยเฉลี่ยแล้ว ข้อมูลห่างจากค่ากลางเท่าไหร่" เป็นสิ่งที่เข้าใจได้สัญชาตญาณ (Intuitive) มากกว่าการใช้ส่วนเบี่ยงเบนมาตรฐาน (SD) ที่ต้องยกกำลังสองและถอดรูท</li>
          <li><strong>ใช้ข้อมูลครบทุกตัว:</strong> แตกต่างจากพิสัย (Range) หรือส่วนเบี่ยงเบนควอไทล์ (Quartile Deviation) ที่ใช้ข้อมูลเพียงบางตัว M.D. นำข้อมูลทุกจุดมาพิจารณาร่วมด้วย</li>
          <li><strong>ได้รับผลกระทบจากค่าสุดโต่ง (Outliers) น้อยกว่าความแปรปรวน:</strong> เนื่องจากไม่มีการนำผลต่างไปยกกำลังสอง (เหมือนใน SD) ค่า Outliers จึงไม่ได้ถูกขยายให้มีอิทธิพลจนเกินควร</li>
        </ul>
        <p className="mt-4">
          ใช้เครื่องมือคำนวณของเราด้านบนเพื่อหาส่วนเบี่ยงเบนเฉลี่ยได้ทันที ทั้งรอบค่าเฉลี่ยและมัธยฐาน ช่วยลดข้อผิดพลาดในการคำนวณด้วยมือ และเพิ่มความรวดเร็วในการวิเคราะห์ข้อมูลของคุณได้อย่างมีประสิทธิภาพ!
        </p>
      </article>
    </div>
  );
}

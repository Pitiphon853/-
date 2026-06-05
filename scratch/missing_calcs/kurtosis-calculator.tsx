import React, { useState } from 'react';
import { BarChart2, Calculator, RefreshCw, Info } from 'lucide-react';

export default function KurtosisCalculator({ lang }: any) {
  const [inputData, setInputData] = useState('12, 15, 14, 19, 25, 27, 31');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const arr = inputData.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const n = arr.length;
    if (n < 4) {
      setResult({ error: "โปรดป้อนตัวเลขอย่างน้อย 4 ตัวสำหรับการคำนวณกลุ่มตัวอย่าง" });
      return;
    }

    const mean = arr.reduce((a, b) => a + b, 0) / n;
    
    // Population Kurtosis (Excess)
    const popVar = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
    let m4 = 0;
    for(let i=0; i<n; i++) {
        m4 += Math.pow((arr[i] - mean), 4);
    }
    m4 = m4 / n;
    const popKurtosis = (m4 / Math.pow(popVar, 2)) - 3; 

    // Sample Kurtosis (Excess - matches Excel's KURT)
    const sampleVar = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1);
    const s = Math.sqrt(sampleVar);
    let sum4 = 0;
    for(let i=0; i<n; i++) {
       sum4 += Math.pow((arr[i] - mean)/s, 4);
    }
    const sampleKurtosis = ((n * (n+1)) / ((n-1)*(n-2)*(n-3))) * sum4 - (3 * Math.pow(n-1, 2))/((n-2)*(n-3));

    let interpretation = "";
    if (sampleKurtosis > 0.5) interpretation = "การแจกแจงมีความโด่งมาก (Leptokurtic / Heavy tails)";
    else if (sampleKurtosis < -0.5) interpretation = "การแจกแจงมีความแบนราบ (Platykurtic / Light tails)";
    else interpretation = "การแจกแจงมีความโด่งปกติใกล้เคียงโค้งปกติ (Mesokurtic)";

    setResult({
      n,
      mean: mean.toFixed(4),
      sampleKurtosis: sampleKurtosis.toFixed(6),
      popKurtosis: popKurtosis.toFixed(6),
      interpretation,
      error: null
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-indigo-50 rounded-xl">
          <BarChart2 className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">เครื่องมือคำนวณหาค่าความโด่ง (Kurtosis)</h1>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          ป้อนชุดข้อมูล (คั่นด้วยเครื่องหมายจุลภาค ,)
        </label>
        <textarea
          rows={3}
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          placeholder="เช่น 10, 20, 30, 40, 50"
        />
        
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={calculate}
            className="flex-1 min-w-[200px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>คำนวณค่าความโด่ง</span>
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
        <div className="bg-indigo-50 rounded-xl p-6 mb-8 border border-indigo-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-bold text-indigo-900 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2" /> ผลการคำนวณ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-50">
              <div className="text-sm text-slate-500 mb-1">จำนวนข้อมูล (n)</div>
              <div className="text-2xl font-semibold text-slate-800">{result.n}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-50">
              <div className="text-sm text-slate-500 mb-1">ค่าเฉลี่ย (Mean)</div>
              <div className="text-2xl font-semibold text-slate-800">{result.mean}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-50">
              <div className="text-sm text-slate-500 mb-1">ความโด่งส่วนเกินตัวอย่าง (Sample Excess Kurtosis)</div>
              <div className="text-2xl font-bold text-indigo-600">{result.sampleKurtosis}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-50">
              <div className="text-sm text-slate-500 mb-1">ความโด่งส่วนเกินประชากร (Pop. Excess Kurtosis)</div>
              <div className="text-2xl font-semibold text-slate-800">{result.popKurtosis}</div>
            </div>
          </div>
          <div className="mt-4 bg-white p-4 rounded-lg shadow-sm border border-indigo-50">
            <div className="text-sm text-slate-500 mb-1">การแปลผล:</div>
            <div className="text-lg font-medium text-slate-800">{result.interpretation}</div>
          </div>
        </div>
      )}

      {result && result.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-100">
          {result.error}
        </div>
      )}

      <article className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 mt-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold mb-4">ความโด่ง (Kurtosis) คืออะไร? สถิติเพื่อการวิเคราะห์ลักษณะหางของการแจกแจง</h2>
        <p>
          ในทางสถิติศาสตร์ <strong>ความโด่ง (Kurtosis)</strong> คือค่าวัดรูปทรงของการแจกแจงความน่าจะเป็น (Probability Distribution) โดยในอดีตมักจะเข้าใจผิดว่าความโด่งคือการวัด "ความแหลม" ของยอดกราฟ แต่ในความจริงแล้ว ตามนิยามทางคณิตศาสตร์สมัยใหม่ ความโด่งคือมาตรวัดที่เน้นไปที่ <strong>"น้ำหนักของหาง (Tails) หรือค่าสุดโต่ง (Outliers)"</strong> ของการแจกแจงมากกว่าส่วนยอด หากข้อมูลมีค่าความโด่งสูง แสดงว่าข้อมูลชุดนั้นมีค่าสุดโต่งหรือส่วนหางที่หนากว่าการแจกแจงแบบปกติ (Normal Distribution)
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ประเภทของความโด่ง (Types of Kurtosis)</h3>
        <p>
          การวัดความโด่งในซอฟต์แวร์ทางสถิติ (เช่น Excel, SPSS) มักใช้ <em>ความโด่งส่วนเกิน (Excess Kurtosis)</em> ซึ่งเป็นการนำค่า Kurtosis ปกติมาลบด้วย 3 (ค่าของโค้งปกติ) เพื่อให้การเปรียบเทียบกับโค้งปกติทำได้ง่าย โดยใช้ค่า 0 เป็นเกณฑ์ แบ่งออกได้ 3 รูปแบบคือ:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>Mesokurtic (เมโซเคอร์ติก):</strong> เมื่อค่า Excess Kurtosis ≈ 0 การแจกแจงจะมีความโด่งและหางเทียบเท่ากับการแจกแจงแบบปกติเป๊ะ ข้อมูลจะไม่ได้รวมตัวกันสุดโต่งและไม่ได้แบนราบเกินไป</li>
          <li><strong>Leptokurtic (เลปโตเคอร์ติก):</strong> เมื่อค่า Excess Kurtosis &gt; 0 การแจกแจงมี "หางหนา (Heavy tails)" หมายความว่ามีโอกาสเกิดค่าสุดโต่งหรือค่าที่ห่างจากค่าเฉลี่ยมากๆ ได้สูงกว่าปกติ กราฟมักจะมียอดที่แหลมสูงพุ่งขึ้นตรงกลางและหางยาวออกไปไกลกว่าโค้งปกติ</li>
          <li><strong>Platykurtic (แพลตีเคอร์ติก):</strong> เมื่อค่า Excess Kurtosis &lt; 0 การแจกแจงมี "หางบาง (Light tails)" ข้อมูลมักจะเกาะกลุ่มกัน ไม่ค่อยมีค่าสุดโต่งที่หลุดวงโคจรไปไกลๆ กราฟจะมีลักษณะยอดค่อนข้างแบนราบและหางสั้นกว่าโค้งปกติ</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">สูตรที่ใช้คำนวณค่าความโด่ง (Formulas)</h3>
        <p>
          การคำนวณหาค่าความโด่งส่วนเกิน (Excess Kurtosis) แบ่งเป็น 2 สูตรเช่นเดียวกับสถิติตัวอื่นๆ:
        </p>
        <p><strong>1. สูตรความโด่งประชากร (Population Excess Kurtosis):</strong></p>
        <p className="bg-slate-50 p-4 rounded-lg my-3 font-mono text-sm text-center">
          G₂ = [ Σ(x<sub>i</sub> - μ)⁴ / (N × σ⁴) ] - 3
        </p>
        <p>
          โดยที่ μ คือค่าเฉลี่ย, σ คือส่วนเบี่ยงเบนมาตรฐานประชากร, และ N คือขนาดประชากร
        </p>

        <p><strong>2. สูตรความโด่งกลุ่มตัวอย่าง (Sample Excess Kurtosis):</strong></p>
        <p className="bg-slate-50 p-4 rounded-lg my-3 font-mono text-sm text-center">
          g₂ = [ n(n+1) / ((n-1)(n-2)(n-3)) ] × Σ( (x<sub>i</sub> - x̄)/s )⁴ - [ 3(n-1)² / ((n-2)(n-3)) ]
        </p>
        <p>
          นี่คือสูตรที่โปรแกรม Excel (ฟังก์ชัน <code>KURT</code>) ใช้คำนวณ เป็นสูตรที่มีการปรับค่า Bias ให้ลดลง เหมาะสำหรับการใช้คำนวณข้อมูลจากการสุ่มตัวอย่าง เครื่องมือบนเว็บไซต์นี้ของเราก็ใช้สูตรนี้เป็นหลักในการคำนวณ Sample Kurtosis
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ทำไมการรู้ค่าความโด่งจึงมีความสำคัญ?</h3>
        <p>
          ในทางปฏิบัติ การวัดความโด่งมีความสำคัญอย่างมากในด้านบริหารความเสี่ยง (Risk Management) ทางการเงิน หากพอร์ตการลงทุนหนึ่งมีค่าความโด่งสูง (Leptokurtic) หมายความว่าแม้ผลตอบแทนส่วนใหญ่จะเกาะกลุ่มกัน แต่ก็มีโอกาสเผชิญกับ <strong>"เหตุการณ์สุดวิสัย หรือ Black Swan"</strong> ได้สูง ซึ่งผลตอบแทนอาจจะบวกมหาศาล หรือติดลบรุนแรงได้อย่างไม่คาดคิด ดังนั้นนักลงทุนและนักวิเคราะห์ความเสี่ยงจึงมักนำค่า Kurtosis และ Skewness มาใช้วิเคราะห์ร่วมกันเพื่อประเมินความเสี่ยงที่แท้จริงของการลงทุน นอกเหนือจากนี้ยังใช้ในการตรวจสอบสมมติฐาน (Assumptions) ก่อนนำข้อมูลเข้าสู่กระบวนการสถิติเชิงอนุมานต่างๆ อีกด้วย
        </p>
      </article>
    </div>
  );
}

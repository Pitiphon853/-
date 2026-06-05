import React, { useState } from 'react';
import { TrendingUp, Calculator, RefreshCw, Info } from 'lucide-react';

export default function SkewnessCalculator({ lang }: any) {
  const [inputData, setInputData] = useState('12, 15, 14, 19, 25, 27, 31');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const arr = inputData.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const n = arr.length;
    if (n < 3) {
      setResult({ error: "โปรดป้อนตัวเลขอย่างน้อย 3 ตัว" });
      return;
    }

    const mean = arr.reduce((a, b) => a + b, 0) / n;
    
    // Sample
    const sampleVar = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1);
    const sampleStdDev = Math.sqrt(sampleVar);
    let sampleSumCube = 0;
    for(let i=0; i<n; i++) {
        sampleSumCube += Math.pow((arr[i] - mean) / sampleStdDev, 3);
    }
    const sampleSkewness = (n / ((n - 1) * (n - 2))) * sampleSumCube;

    // Population
    const popVar = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
    const popStdDev = Math.sqrt(popVar);
    let popSumCube = 0;
    for(let i=0; i<n; i++) {
        popSumCube += Math.pow((arr[i] - mean) / popStdDev, 3);
    }
    const popSkewness = (1 / n) * popSumCube;

    let interpretation = "";
    if (sampleSkewness > 0.5) interpretation = "ข้อมูลมีความเบ้ขวา (Positive Skewness) อย่างชัดเจน";
    else if (sampleSkewness < -0.5) interpretation = "ข้อมูลมีความเบ้ซ้าย (Negative Skewness) อย่างชัดเจน";
    else interpretation = "ข้อมูลค่อนข้างสมมาตร (Symmetrical Distribution)";

    setResult({
      n,
      mean: mean.toFixed(4),
      sampleSkewness: sampleSkewness.toFixed(6),
      popSkewness: popSkewness.toFixed(6),
      interpretation,
      error: null
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-blue-50 rounded-xl">
          <TrendingUp className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">เครื่องมือคำนวณหาค่าความเบ้ (Skewness)</h1>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          ป้อนชุดข้อมูล (คั่นด้วยเครื่องหมายจุลภาค ,)
        </label>
        <textarea
          rows={3}
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="เช่น 10, 20, 30, 40, 50"
        />
        
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={calculate}
            className="flex-1 min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>คำนวณค่าความเบ้</span>
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
        <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2" /> ผลการคำนวณ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-50">
              <div className="text-sm text-slate-500 mb-1">จำนวนข้อมูล (n)</div>
              <div className="text-2xl font-semibold text-slate-800">{result.n}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-50">
              <div className="text-sm text-slate-500 mb-1">ค่าเฉลี่ย (Mean)</div>
              <div className="text-2xl font-semibold text-slate-800">{result.mean}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-50">
              <div className="text-sm text-slate-500 mb-1">ค่าความเบ้กลุ่มตัวอย่าง (Sample Skewness)</div>
              <div className="text-2xl font-bold text-blue-600">{result.sampleSkewness}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-50">
              <div className="text-sm text-slate-500 mb-1">ค่าความเบ้ประชากร (Population Skewness)</div>
              <div className="text-2xl font-semibold text-slate-800">{result.popSkewness}</div>
            </div>
          </div>
          <div className="mt-4 bg-white p-4 rounded-lg shadow-sm border border-blue-50">
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
        <h2 className="text-2xl font-bold mb-4">ความเบ้ (Skewness) คืออะไร? สุดยอดคู่มือทำความเข้าใจรูปทรงการกระจายของข้อมูล</h2>
        <p>
          ในทางสถิติศาสตร์ <strong>ความเบ้ (Skewness)</strong> คือค่าวัดความไม่สมมาตร (Asymmetry) ของการแจกแจงความน่าจะเป็นของตัวแปรสุ่มรอบค่าเฉลี่ยของตัวมันเอง หากเรานำข้อมูลมาสร้างฮิสโตแกรม (Histogram) หรือเส้นโค้งการแจกแจง เราจะเห็นได้ว่าข้อมูลบางชุดไม่ได้เป็นรูประฆังคว่ำที่สมมาตรกันเป๊ะๆ เสมอไป บางครั้งข้อมูลอาจจะเทไปทางซ้าย หรือเทไปทางขวา การที่เราจะระบุว่ามันเทไปทางไหนและมากเท่าใดนั้น เราใช้ค่า "ความเบ้" ในการระบุนั่นเอง
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ประเภทของความเบ้ (Types of Skewness)</h3>
        <p>
          ค่าความเบ้สามารถเป็นบวก เป็นลบ หรือเป็นศูนย์ก็ได้ โดยสามารถแบ่งลักษณะของการกระจายข้อมูลได้เป็น 3 ประเภทหลัก ๆ ดังนี้:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>ความเบ้ขวา (Positive Skewness หรือ Right-Skewed):</strong> เกิดขึ้นเมื่อหางของกราฟลากยาวไปทางขวามากกว่าทางซ้าย ในกรณีนี้ ส่วนใหญ่ข้อมูลจะกระจุกตัวอยู่ทางซ้าย (ค่าต่ำ) และมีค่าที่สูงผิดปกติ (Outliers) อยู่ทางขวา ส่งผลให้ <em>ค่าเฉลี่ย (Mean) &gt; มัธยฐาน (Median) &gt; ฐานนิยม (Mode)</em></li>
          <li><strong>ความเบ้ซ้าย (Negative Skewness หรือ Left-Skewed):</strong> เกิดขึ้นเมื่อหางของกราฟลากยาวไปทางซ้ายมากกว่าทางขวา ข้อมูลส่วนใหญ่จะกระจุกตัวอยู่ทางขวา (ค่าสูง) และมีค่าต่ำที่ดึงกราฟไปทางซ้าย ส่งผลให้ <em>ค่าเฉลี่ย (Mean) &lt; มัธยฐาน (Median) &lt; ฐานนิยม (Mode)</em></li>
          <li><strong>สมมาตร (Symmetrical Distribution หรือ Zero Skewness):</strong> รูปทรงกราฟจะเป็นระฆังคว่ำสมมาตรกันทั้งซ้ายและขวา ค่าความเบ้จะเท่ากับ 0 (หรือใกล้เคียง 0 มากๆ) ในกรณีนี้ <em>ค่าเฉลี่ย = มัธยฐาน = ฐานนิยม</em></li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">สูตรการคำนวณค่าความเบ้ (Formulas for Skewness)</h3>
        <p>
          ในการคำนวณ เราสามารถแบ่งเป็น 2 กรณีคือ การคำนวณสำหรับ "ประชากร (Population)" และ "กลุ่มตัวอย่าง (Sample)"
        </p>
        <p><strong>1. ความเบ้ของประชากร (Population Skewness):</strong></p>
        <p className="bg-slate-50 p-4 rounded-lg my-3 font-mono text-sm text-center">
          Skewness (Population) = Σ(x<sub>i</sub> - μ)³ / (N × σ³)
        </p>
        <p>
          โดยที่ μ คือค่าเฉลี่ยของประชากร, σ คือส่วนเบี่ยงเบนมาตรฐานของประชากร, และ N คือจำนวนข้อมูลทั้งหมดของประชากร
        </p>

        <p><strong>2. ความเบ้ของกลุ่มตัวอย่าง (Sample Skewness):</strong> (มักเป็นค่าที่โปรแกรมอย่าง Excel, SPSS หรือเครื่องมือนี้ใช้เป็นหลัก)</p>
        <p className="bg-slate-50 p-4 rounded-lg my-3 font-mono text-sm text-center">
          Skewness (Sample) = [n / ((n-1)(n-2))] × Σ( (x<sub>i</sub> - x̄) / s )³
        </p>
        <p>
          โดยที่ x̄ คือค่าเฉลี่ยของกลุ่มตัวอย่าง, s คือส่วนเบี่ยงเบนมาตรฐานของกลุ่มตัวอย่าง, และ n คือขนาดของกลุ่มตัวอย่าง สูตรนี้มีการปรับแก้ (Bias correction) ทำให้เหมาะสมกับการประมาณค่าของประชากรจากกลุ่มตัวอย่าง
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ความสำคัญและการนำไปใช้งาน</h3>
        <p>
          การทราบค่าความเบ้มีประโยชน์อย่างมหาศาลในการวิเคราะห์ข้อมูล โดยเฉพาะในสายงานวิทยาศาสตร์ข้อมูล (Data Science) สถิติ และการเงิน ตัวอย่างเช่น:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ด้านการเงินและการลงทุน:</strong> ผลตอบแทนของหุ้นมักมีการแจกแจงที่ไม่สมมาตร นักลงทุนมักชอบพอร์ตการลงทุนที่มีความเบ้เป็นบวก (Positive Skewness) เพราะหมายถึงมีโอกาสที่จะได้ผลตอบแทนสูงปรี๊ด ในขณะที่ความเสี่ยงทางลบถูกจำกัดไว้</li>
          <li><strong>การประเมินความเหมาะสมของโมเดลสถิติ:</strong> โมเดลสถิติหรือ Machine Learning หลายแบบมีสมมติฐานว่าข้อมูลต้องมีการแจกแจงแบบปกติ (Normal Distribution) หากเราพบว่าข้อมูลมีความเบ้สูง เราอาจจะต้องทำการแปลงข้อมูล (Data Transformation) เช่น การหาค่า Log, Square Root หรือ Box-Cox Transformation เพื่อลดความเบ้ลงก่อนนำไปสร้างโมเดล</li>
        </ul>
        <p>
          เครื่องมือคำนวณหาค่าความเบ้ (Skewness Calculator) ของเราออกแบบมาให้ใช้งานง่าย เพียงแค่ใส่ชุดข้อมูลลงไป ระบบก็จะคำนวณหาทั้งความเบ้ของประชากรและความเบ้ของกลุ่มตัวอย่าง พร้อมทั้งแปลผลให้อัตโนมัติ ทำให้ผู้ใช้งานทุกระดับสามารถนำผลลัพธ์ไปใช้งานได้อย่างมั่นใจ ไม่ว่าจะนำไปใช้ในการเรียน ทำวิจัย หรือวิเคราะห์ข้อมูลเชิงลึกในธุรกิจก็ตาม
        </p>
      </article>
    </div>
  );
}

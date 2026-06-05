import React, { useState } from 'react';
import { Activity, Calculator, RefreshCw, Info } from 'lucide-react';

export default function QuartileDeviationCalculator({ lang }: any) {
  const [inputData, setInputData] = useState('15, 20, 25, 30, 35, 40, 45, 50, 55');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let arr = inputData.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    if (arr.length < 3) {
      setResult({ error: "โปรดป้อนตัวเลขอย่างน้อย 3 ตัว" });
      return;
    }

    // Sort array
    arr.sort((a, b) => a - b);
    const n = arr.length;

    // Helper for quartiles (using interpolation method similar to Excel's QUARTILE.INC)
    const getQuartile = (sortedArr: number[], q: number) => {
      const pos = (sortedArr.length - 1) * q;
      const base = Math.floor(pos);
      const rest = pos - base;
      if (sortedArr[base + 1] !== undefined) {
        return sortedArr[base] + rest * (sortedArr[base + 1] - sortedArr[base]);
      } else {
        return sortedArr[base];
      }
    };

    const q1 = getQuartile(arr, 0.25);
    const q3 = getQuartile(arr, 0.75);
    const iqr = q3 - q1;
    const qd = iqr / 2;
    const cqd = (q3 - q1) / (q3 + q1); // Coefficient of Quartile Deviation

    setResult({
      sortedArr: arr.join(', '),
      n,
      q1: q1.toFixed(4),
      q3: q3.toFixed(4),
      iqr: iqr.toFixed(4),
      qd: qd.toFixed(4),
      cqd: cqd.toFixed(4),
      error: null
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-teal-50 rounded-xl">
          <Activity className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">เครื่องคำนวณส่วนเบี่ยงเบนควอไทล์ (Quartile Deviation)</h1>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          ป้อนชุดข้อมูล (คั่นด้วยเครื่องหมายจุลภาค ,)
        </label>
        <textarea
          rows={3}
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
          placeholder="เช่น 10, 20, 30, 40, 50"
        />
        
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={calculate}
            className="flex-1 min-w-[200px] bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>คำนวณ</span>
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
        <div className="bg-teal-50 rounded-xl p-6 mb-8 border border-teal-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-bold text-teal-900 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2" /> ผลการคำนวณ
          </h2>
          <div className="mb-4 text-sm text-slate-600 bg-white p-3 rounded-lg border border-teal-50 break-words">
            <strong>ข้อมูลที่เรียงลำดับแล้ว:</strong> {result.sortedArr}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-50">
              <div className="text-sm text-slate-500 mb-1">ควอไทล์ที่ 1 (Q1)</div>
              <div className="text-2xl font-semibold text-slate-800">{result.q1}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-50">
              <div className="text-sm text-slate-500 mb-1">ควอไทล์ที่ 3 (Q3)</div>
              <div className="text-2xl font-semibold text-slate-800">{result.q3}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-50">
              <div className="text-sm text-slate-500 mb-1">พิสัยระหว่างควอไทล์ (IQR)</div>
              <div className="text-2xl font-semibold text-slate-800">{result.iqr}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-50 lg:col-span-2">
              <div className="text-sm text-slate-500 mb-1">ส่วนเบี่ยงเบนควอไทล์ (Quartile Deviation)</div>
              <div className="text-3xl font-bold text-teal-600">{result.qd}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-50">
              <div className="text-sm text-slate-500 mb-1">สัมประสิทธิ์ส่วนเบี่ยงเบนควอไทล์</div>
              <div className="text-2xl font-semibold text-slate-800">{result.cqd}</div>
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
        <h2 className="text-2xl font-bold mb-4">ส่วนเบี่ยงเบนควอไทล์ (Quartile Deviation) คืออะไร? สุดยอดวิธีวัดการกระจายของข้อมูลที่ไม่แคร์ค่าสุดโต่ง</h2>
        <p>
          ในการวัดการกระจายของข้อมูลทางสถิติ หลายคนคุ้นเคยกับ "ส่วนเบี่ยงเบนมาตรฐาน (Standard Deviation)" ซึ่งเป็นตัวชี้วัดยอดฮิต แต่จุดอ่อนสำคัญของส่วนเบี่ยงเบนมาตรฐานคือมันอ่อนไหวต่อ <strong>ค่าสุดโต่ง (Outliers)</strong> มาก หากมีข้อมูลบางตัวที่มากเกินไปหรือน้อยเกินไป จะทำให้ค่าการกระจายที่ได้บิดเบือนจากความเป็นจริงไปทันที นี่จึงเป็นจุดที่ <strong>ส่วนเบี่ยงเบนควอไทล์ (Quartile Deviation)</strong> หรือในอีกชื่อหนึ่งคือ <em>Semi-Interquartile Range</em> ก้าวเข้ามามีบทบาท
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">นิยามและการทำงานของส่วนเบี่ยงเบนควอไทล์</h3>
        <p>
          ส่วนเบี่ยงเบนควอไทล์ (Quartile Deviation ย่อว่า QD) คือค่าที่ใช้วัดการกระจายตัวของข้อมูลโดยอาศัยหลักการของการหาตำแหน่งของข้อมูลที่เรียกว่า <strong>ควอไทล์ (Quartiles)</strong> ซึ่งก็คือการแบ่งข้อมูลที่เรียงลำดับจากน้อยไปมากออกเป็น 4 ส่วนเท่าๆ กัน
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Q1 (ควอไทล์ที่ 1):</strong> จุดที่แบ่งข้อมูล 25% แรกออกจาก 75% ที่เหลือ</li>
          <li><strong>Q2 (ควอไทล์ที่ 2 หรือมัธยฐาน):</strong> จุดที่แบ่งข้อมูล 50%</li>
          <li><strong>Q3 (ควอไทล์ที่ 3):</strong> จุดที่แบ่งข้อมูล 75% แรกออกจาก 25% ที่มีค่าสูงสุด</li>
        </ul>
        <p>
          การวัดการกระจายวิธีนี้ จะสนใจเฉพาะช่วงตรงกลางของข้อมูล นั่นคือระยะห่างระหว่าง Q3 กับ Q1 ซึ่งเรียกว่า <em>พิสัยระหว่างควอไทล์ (Interquartile Range หรือ IQR)</em> และนำมาหารสองเพื่อหาค่าเฉลี่ยความกว้าง ทำให้ได้ค่า Quartile Deviation นั่นเอง
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">สูตรที่ใช้คำนวณ (Formulas)</h3>
        <p>สูตรในการคำนวณหาส่วนเบี่ยงเบนควอไทล์นั้นเรียบง่ายและตรงไปตรงมา ดังนี้:</p>
        <p className="bg-slate-50 p-4 rounded-lg my-3 font-mono text-sm text-center">
          Quartile Deviation (QD) = (Q3 - Q1) / 2
        </p>
        <p>
          นอกจากนี้ ยังมี <strong>สัมประสิทธิ์ของส่วนเบี่ยงเบนควอไทล์ (Coefficient of Quartile Deviation)</strong> ซึ่งเป็นค่าวัดการกระจายสัมพัทธ์ (Relative Measure of Dispersion) ใช้สำหรับเปรียบเทียบการกระจายของข้อมูล 2 ชุดที่มีหน่วยต่างกัน หรือมีค่าเฉลี่ยต่างกันมาก คำนวณได้จาก:
        </p>
        <p className="bg-slate-50 p-4 rounded-lg my-3 font-mono text-sm text-center">
          Coefficient of QD = (Q3 - Q1) / (Q3 + Q1)
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ข้อดีและข้อจำกัดที่ควรทราบ</h3>
        <p><strong>ข้อดีเด่นๆ ของ Quartile Deviation:</strong></p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li><strong>ทนทานต่อ Outliers:</strong> เนื่องจากไม่ได้นำข้อมูล 25% ที่ต่ำสุด และ 25% ที่สูงสุดมาคิด ทำให้ค่าผิดปกติสุดโต่งไม่มีผลกระทบต่อผลลัพธ์</li>
          <li><strong>คำนวณและเข้าใจง่าย:</strong> อธิบายแนวคิดให้คนทั่วไปเข้าใจได้ง่ายกว่าค่าความแปรปรวนหรือส่วนเบี่ยงเบนมาตรฐาน</li>
          <li><strong>เหมาะกับข้อมูลปลายเปิด (Open-ended classes):</strong> หากตารางแจกแจงความถี่เป็นแบบปลายเปิด (เช่น "น้อยกว่า 10" หรือ "มากกว่า 100") เราจะไม่สามารถหา SD ได้ แต่ยังหา Quartile Deviation ได้ปกติ</li>
        </ul>
        <p><strong>ข้อจำกัด:</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>เนื่องจากไม่ใช้ข้อมูลทุกตัวมาคำนวณ จึงอาจมองข้ามลักษณะการกระจายบางอย่างไป</li>
          <li>ไม่เหมาะกับการนำไปวิเคราะห์ทางสถิติขั้นสูงต่อ (Algebraic manipulation) เมื่อเทียบกับ Standard Deviation</li>
        </ul>
        <p className="mt-4">
          ด้วยเครื่องคิดเลขออนไลน์ฟรีของเรา คุณสามารถหาค่า Q1, Q3, พิสัยระหว่างควอไทล์ (IQR) และส่วนเบี่ยงเบนควอไทล์ (QD) ได้อย่างแม่นยำภายในพริบตา เหมาะสำหรับนักเรียน นักศึกษา หรือนักวิจัยที่ต้องการตรวจสอบข้อมูลอย่างรวดเร็วโดยไม่ต้องคำนวณมือให้ปวดหัว!
        </p>
      </article>
    </div>
  );
}

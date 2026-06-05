import React, { useState } from 'react';
import { AlertCircle, Calculator, RefreshCw, Info } from 'lucide-react';

export default function OutliersCalculator({ lang }: any) {
  const [inputData, setInputData] = useState('10, 12, 15, 14, 19, 20, 22, 21, 85, 23, 25, 9');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let arr = inputData.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    if (arr.length < 4) {
      setResult({ error: "โปรดป้อนตัวเลขอย่างน้อย 4 ตัวเพื่อการคำนวณที่เหมาะสม" });
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
    
    // Limits
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    // Extreme Limits (Outer Fences)
    const extremeLowerBound = q1 - 3 * iqr;
    const extremeUpperBound = q3 + 3 * iqr;

    // Identify outliers
    const mildOutliers = arr.filter(x => (x < lowerBound && x >= extremeLowerBound) || (x > upperBound && x <= extremeUpperBound));
    const extremeOutliers = arr.filter(x => x < extremeLowerBound || x > extremeUpperBound);
    const allOutliers = [...mildOutliers, ...extremeOutliers];

    setResult({
      sortedArr: arr.join(', '),
      n,
      q1: q1.toFixed(4),
      q3: q3.toFixed(4),
      iqr: iqr.toFixed(4),
      lowerBound: lowerBound.toFixed(4),
      upperBound: upperBound.toFixed(4),
      extremeLowerBound: extremeLowerBound.toFixed(4),
      extremeUpperBound: extremeUpperBound.toFixed(4),
      allOutliers: allOutliers.length > 0 ? allOutliers.join(', ') : 'ไม่มีค่าผิดปกติในชุดข้อมูลนี้',
      mildOutliersCount: mildOutliers.length,
      extremeOutliersCount: extremeOutliers.length,
      error: null
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-rose-50 rounded-xl">
          <AlertCircle className="w-8 h-8 text-rose-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">เครื่องคำนวณหาค่าผิดปกติ (Outliers Calculator)</h1>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          ป้อนชุดข้อมูล (คั่นด้วยเครื่องหมายจุลภาค ,)
        </label>
        <textarea
          rows={3}
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
          placeholder="เช่น 10, 15, 20, 25, 150"
        />
        
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={calculate}
            className="flex-1 min-w-[200px] bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>ค้นหาค่าผิดปกติ</span>
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
        <div className="bg-rose-50 rounded-xl p-6 mb-8 border border-rose-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-bold text-rose-900 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2" /> ผลการวิเคราะห์ Outliers (Tukey's Fences)
          </h2>
          
          <div className="bg-white p-5 rounded-xl border border-rose-200 mb-6 shadow-sm">
            <h3 className="font-semibold text-rose-800 mb-2">ค่าผิดปกติที่พบ (Identified Outliers):</h3>
            <div className={`text-xl font-bold ${result.allOutliers === 'ไม่มีค่าผิดปกติในชุดข้อมูลนี้' ? 'text-slate-600' : 'text-rose-600'}`}>
              {result.allOutliers}
            </div>
            {result.allOutliers !== 'ไม่มีค่าผิดปกติในชุดข้อมูลนี้' && (
              <div className="mt-2 text-sm text-slate-600 flex space-x-4">
                <span>แบบอ่อน (Mild): {result.mildOutliersCount} ตัว</span>
                <span>แบบรุนแรง (Extreme): {result.extremeOutliersCount} ตัว</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-50">
              <div className="text-sm text-slate-500 mb-1">ควอไทล์ที่ 1 (Q1)</div>
              <div className="text-lg font-semibold">{result.q1}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-50">
              <div className="text-sm text-slate-500 mb-1">ควอไทล์ที่ 3 (Q3)</div>
              <div className="text-lg font-semibold">{result.q3}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-50">
              <div className="text-sm text-slate-500 mb-1">พิสัยระหว่างควอไทล์ (IQR)</div>
              <div className="text-lg font-semibold">{result.iqr}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-50">
              <div className="text-sm text-slate-500 mb-1">จำนวนข้อมูล (n)</div>
              <div className="text-lg font-semibold">{result.n}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-l-amber-400">
              <h4 className="font-semibold text-slate-800 mb-2">ขอบเขตปกติ (Inner Fences)</h4>
              <p className="text-sm text-slate-600 mb-1">ค่าที่อยู่นอกขอบเขตนี้ถือเป็น Mild Outliers</p>
              <div className="flex justify-between mt-2 pt-2 border-t border-slate-100">
                <span className="text-sm">ขอบเขตล่าง: <strong className="text-amber-600">{result.lowerBound}</strong></span>
                <span className="text-sm">ขอบเขตบน: <strong className="text-amber-600">{result.upperBound}</strong></span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-l-rose-500">
              <h4 className="font-semibold text-slate-800 mb-2">ขอบเขตสุดโต่ง (Outer Fences)</h4>
              <p className="text-sm text-slate-600 mb-1">ค่าที่อยู่นอกขอบเขตนี้ถือเป็น Extreme Outliers</p>
              <div className="flex justify-between mt-2 pt-2 border-t border-slate-100">
                <span className="text-sm">ขอบเขตล่าง: <strong className="text-rose-600">{result.extremeLowerBound}</strong></span>
                <span className="text-sm">ขอบเขตบน: <strong className="text-rose-600">{result.extremeUpperBound}</strong></span>
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
        <h2 className="text-2xl font-bold mb-4">ค่าผิดปกติ (Outliers) คืออะไร? สุดยอดคู่มือการคัดกรองข้อมูลแปลกปลอมด้วย IQR</h2>
        <p>
          ในการวิเคราะห์ข้อมูลหรือวิจัยทางสถิติ ปัญหาหนึ่งที่นักวิเคราะห์เจอบ่อยที่สุดคือ <strong>ค่าผิดปกติ หรือ Outliers</strong> ซึ่งหมายถึงจุดข้อมูลที่มีค่าสูงเกินไปหรือต่ำเกินไปจนผิดสังเกตเมื่อเทียบกับข้อมูลส่วนใหญ่ในชุดเดียวกัน เช่น สมมติว่าคะแนนสอบของคนในห้องส่วนใหญ่อยู่ที่ 50 - 70 คะแนน แต่จู่ๆ มีคนหนึ่งได้ 5 คะแนน หรือได้ 99 คะแนน ค่าเหล่านี้คือ Outlier ที่หากเราไม่จัดการให้ดีก่อนนำไปวิเคราะห์ มันอาจจะทำให้ค่าเฉลี่ย (Mean) บิดเบือนไปจากความเป็นจริงอย่างรุนแรง โมเดลพยากรณ์พังทลาย และนำไปสู่ข้อสรุปที่ผิดพลาดได้
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">วิธีหา Outliers ด้วยเทคนิคของ Tukey (Interquartile Range Method)</h3>
        <p>
          วิธีการที่ได้รับความนิยม แข็งแกร่ง และใช้ในแผนภาพกล่อง (Boxplot) กันอย่างแพร่หลาย คือการใช้วิธี <strong>Tukey's Fences</strong> ซึ่งอาศัยหลักการของ <em>พิสัยระหว่างควอไทล์ (Interquartile Range - IQR)</em> มาเป็นตัวกำหนดขอบเขตที่ยอมรับได้ (Fences) ของข้อมูล วิธีนี้มีข้อดีคือไม่จำเป็นต้องสมมติว่าข้อมูลมีการแจกแจงแบบปกติ (Normal Distribution) เสมอไป
        </p>

        <h4 className="text-lg font-medium mt-4 mb-2">ขั้นตอนและสูตรในการคำนวณ</h4>
        <ol className="list-decimal pl-6 space-y-3 mb-4">
          <li><strong>หาค่า Q1 และ Q3:</strong> เรียงข้อมูลจากน้อยไปมาก แล้วหาจุดแบ่งควอไทล์ที่ 1 (25%) และควอไทล์ที่ 3 (75%)</li>
          <li><strong>คำนวณ IQR:</strong> หาค่าพิสัยระหว่างควอไทล์ โดยใช้สูตร <code>IQR = Q3 - Q1</code></li>
          <li><strong>กำหนดขอบเขตปกติ (Inner Fences):</strong>
            <ul className="list-disc pl-5 mt-1 text-sm bg-slate-50 p-3 rounded-lg">
              <li>ขอบเขตล่าง (Lower Bound) = <code>Q1 - (1.5 × IQR)</code></li>
              <li>ขอบเขตบน (Upper Bound) = <code>Q3 + (1.5 × IQR)</code></li>
            </ul>
            ข้อมูลใดที่น้อยกว่าขอบเขตล่าง หรือมากกว่าขอบเขตบน จะถือว่าเป็น <em>ค่าผิดปกติแบบอ่อน (Mild Outlier)</em>
          </li>
          <li><strong>กำหนดขอบเขตสุดโต่ง (Outer Fences):</strong>
            <ul className="list-disc pl-5 mt-1 text-sm bg-slate-50 p-3 rounded-lg">
              <li>ขอบเขตล่างแบบสุดโต่ง = <code>Q1 - (3 × IQR)</code></li>
              <li>ขอบเขตบนแบบสุดโต่ง = <code>Q3 + (3 × IQR)</code></li>
            </ul>
            ข้อมูลใดที่หลุดรอดกรอบนี้ไปอีก จะถือว่าเป็น <em>ค่าผิดปกติแบบรุนแรง (Extreme Outlier)</em>
          </li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">เจอ Outliers แล้วควรทำอย่างไร?</h3>
        <p>
          เมื่อเครื่องมือของเราค้นพบ Outliers ให้คุณแล้ว ไม่ได้หมายความว่าคุณจะต้อง <strong>"ลบ"</strong> พวกมันทิ้งเสมอไป การตัดสินใจจัดการกับ Outlier ต้องพิจารณาจากบริบท:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ความผิดพลาดในการเก็บข้อมูล (Data Entry Error):</strong> เช่น พิมพ์อายุ 25 ปี เป็น 250 ปี กรณีนี้ควรแก้ไขค่าให้ถูกต้องหรือตัดทิ้งหากแก้ไม่ได้</li>
          <li><strong>ความผิดปกติของระบบหรือเครื่องมือวัด:</strong> เช่น เซ็นเซอร์รวน กรณีนี้ควรพิจารณาตัดทิ้ง</li>
          <li><strong>เป็นความจริงตามธรรมชาติ (Natural Outlier):</strong> เช่น ข้อมูลรายได้ของประชากรที่มีมหาเศรษฐีรวมอยู่ด้วย ข้อมูลเหล่านี้เป็นความจริงและมีประโยชน์ในการวิเคราะห์ กรณีนี้อาจจะไม่ตัดทิ้ง แต่อาจใช้วิธีแปลงข้อมูล (Data Transformation เช่น Log transform) หรือใช้สถิติที่ทนทานต่อ Outlier เช่นใช้ค่ามัธยฐานแทนค่าเฉลี่ย</li>
        </ul>
        <p className="mt-4">
          ด้วยเครื่องคิดเลขหา Outliers แบบออนไลน์ฟรีเครื่องนี้ คุณสามารถป้อนชุดข้อมูลดิบลงไปได้อย่างสะดวกรวดเร็ว ระบบจะทำการประมวลผล หาขอบเขต Fences ต่างๆ และคัดกรองตัวเลขที่ผิดปกติออกมาให้คุณเห็นได้อย่างชัดเจนในทันที ประหยัดเวลาและเพิ่มความถูกต้องแม่นยำให้กับการเตรียมข้อมูล (Data Preprocessing) ของคุณอย่างแน่นอน!
        </p>
      </article>
    </div>
  );
}

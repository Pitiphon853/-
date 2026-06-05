import React, { useState } from 'react';
import { Calculator, LineChart, Info, AlertCircle } from 'lucide-react';

export default function PearsonCorrelation({ lang }: any) {
  const [xValues, setXValues] = useState('');
  const [yValues, setYValues] = useState('');
  const [resultR, setResultR] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const calculatePearson = () => {
    setErrorMsg('');
    const xArray = xValues.split(',').map(val => parseFloat(val.trim())).filter(val => !isNaN(val));
    const yArray = yValues.split(',').map(val => parseFloat(val.trim())).filter(val => !isNaN(val));

    if (xArray.length === 0 || yArray.length === 0) {
      setErrorMsg(lang === 'EN' ? 'Please enter numeric values.' : 'กรุณาระบุตัวเลขที่ถูกต้อง');
      setResultR(null);
      return;
    }

    if (xArray.length !== yArray.length) {
      setErrorMsg(lang === 'EN' ? 'The number of X and Y values must be equal.' : 'จำนวนข้อมูลของ X และ Y ต้องเท่ากัน');
      setResultR(null);
      return;
    }

    if (xArray.length < 2) {
      setErrorMsg(lang === 'EN' ? 'At least 2 pairs of data are required.' : 'ต้องมีข้อมูลอย่างน้อย 2 คู่');
      setResultR(null);
      return;
    }

    const n = xArray.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

    for (let i = 0; i < n; i++) {
      sumX += xArray[i];
      sumY += yArray[i];
      sumXY += xArray[i] * yArray[i];
      sumX2 += xArray[i] ** 2;
      sumY2 += yArray[i] ** 2;
    }

    const numerator = (n * sumXY) - (sumX * sumY);
    const denominator = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));

    if (denominator === 0) {
      setResultR(NaN);
    } else {
      setResultR(numerator / denominator);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-rose-700 flex items-center justify-center gap-3">
        <LineChart className="w-8 h-8" />
        {lang === 'EN' ? 'Pearson Correlation (r)' : 'โปรแกรมคำนวณสัมประสิทธิ์สหสัมพันธ์เพียร์สัน'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
          <h2 className="text-xl font-semibold mb-4 text-rose-800 flex items-center gap-2">
            <Info className="w-5 h-5" />
            {lang === 'EN' ? 'Data Input' : 'ข้อมูลสำหรับการคำนวณ'}
          </h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {lang === 'EN' 
                ? 'Enter comma-separated values (e.g. 1.2, 3.4, 5)' 
                : 'ระบุตัวเลขโดยคั่นด้วยเครื่องหมายจุลภาค (เช่น 1, 2.5, 3)'}
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'EN' ? 'Variable X' : 'ตัวแปร X (ตัวแปรอิสระ)'}
              </label>
              <textarea
                rows={3}
                value={xValues}
                onChange={(e) => setXValues(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none resize-none"
                placeholder="10, 15, 20, 25, 30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'EN' ? 'Variable Y' : 'ตัวแปร Y (ตัวแปรตาม)'}
              </label>
              <textarea
                rows={3}
                value={yValues}
                onChange={(e) => setYValues(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none resize-none"
                placeholder="2, 4, 5, 8, 10"
              />
            </div>
            
            {errorMsg && (
              <div className="flex items-center gap-2 text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errorMsg}
              </div>
            )}

            <button
              onClick={calculatePearson}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              {lang === 'EN' ? 'Calculate Correlation (r)' : 'คำนวณหาค่า r'}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-rose-600" />
            {lang === 'EN' ? 'Correlation Result' : 'ผลลัพธ์สหสัมพันธ์'}
          </h2>
          {resultR !== null ? (
            <div className="text-center w-full">
              <span className="block text-sm text-gray-500 uppercase tracking-wider mb-2">
                {lang === 'EN' ? 'Pearson\'s r' : 'ค่าสัมประสิทธิ์สหสัมพันธ์ (r)'}
              </span>
              <div className="text-5xl font-bold text-rose-600 mb-6">
                {isNaN(resultR) ? 'Undefined' : resultR.toFixed(4)}
              </div>
              
              {!isNaN(resultR) && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-700 text-left">
                  <p><strong>{lang === 'EN' ? 'Interpretation:' : 'การแปลความหมาย:'}</strong></p>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                      {lang === 'EN' ? 'Direction: ' : 'ทิศทาง: '}
                      {resultR > 0 
                        ? (lang === 'EN' ? 'Positive correlation (as X increases, Y increases)' : 'เชิงบวก (X เพิ่ม Y เพิ่ม)')
                        : resultR < 0
                        ? (lang === 'EN' ? 'Negative correlation (as X increases, Y decreases)' : 'เชิงลบ (X เพิ่ม Y ลด)')
                        : (lang === 'EN' ? 'No linear direction' : 'ไม่มีความสัมพันธ์เชิงเส้น')}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                      {lang === 'EN' ? 'Strength: ' : 'ระดับความสัมพันธ์: '}
                      {Math.abs(resultR) >= 0.8 ? (lang === 'EN' ? 'Strong' : 'สูงมาก')
                        : Math.abs(resultR) >= 0.6 ? (lang === 'EN' ? 'Moderate to Strong' : 'สูง')
                        : Math.abs(resultR) >= 0.4 ? (lang === 'EN' ? 'Moderate' : 'ปานกลาง')
                        : Math.abs(resultR) >= 0.2 ? (lang === 'EN' ? 'Weak' : 'ต่ำ')
                        : (lang === 'EN' ? 'Very Weak or None' : 'ต่ำมากหรือไม่มีความสัมพันธ์')}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <LineChart className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>{lang === 'EN' ? 'Enter X and Y pairs to calculate correlation.' : 'ระบุข้อมูล X และ Y เพื่อคำนวณสหสัมพันธ์'}</p>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-rose max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">สัมประสิทธิ์สหสัมพันธ์เพียร์สัน (Pearson Correlation) คืออะไร?</h2>
        
        <p>
          ในการศึกษาวิจัยหรือการวิเคราะห์ข้อมูลทางสถิติ บ่อยครั้งที่เราต้องการทราบว่า <em>"ตัวแปรสองตัวมีความสัมพันธ์กันหรือไม่?"</em> เช่น ความสัมพันธ์ระหว่างจำนวนชั่วโมงที่อ่านหนังสือกับคะแนนสอบ หรือความสัมพันธ์ระหว่างงบประมาณโฆษณากับยอดขาย เป็นต้น 
        </p>
        
        <p>
          เครื่องมือทางสถิติที่ได้รับความนิยมมากที่สุดในการวัดความสัมพันธ์เชิงเส้นตรง (Linear Relationship) ระหว่างตัวแปรเชิงปริมาณสองตัว (Continuous Variables) คือ <strong>สัมประสิทธิ์สหสัมพันธ์ของเพียร์สัน (Pearson Correlation Coefficient)</strong> ซึ่งมักจะแทนด้วยสัญลักษณ์ <strong>r</strong>
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">การตีความหมายของค่า r</h3>
        <p>
          ค่าสหสัมพันธ์ของเพียร์สัน (r) จะมีค่าอยู่ระหว่าง <strong>-1 ถึง 1 เสมอ</strong> โดยพิจารณาได้จาก 2 ส่วนคือ เครื่องหมาย (บวก/ลบ) และ ขนาดของตัวเลข:
        </p>

        <h4 className="text-lg font-medium mt-4 mb-2 text-gray-800">1. ทิศทางของความสัมพันธ์ (ดูจากเครื่องหมาย)</h4>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>เครื่องหมายบวก (+):</strong> มีความสัมพันธ์ในทิศทางเดียวกัน (Positive Correlation) หมายความว่า หากตัวแปรหนึ่งเพิ่มขึ้น อีกตัวแปรหนึ่งมักจะเพิ่มขึ้นตามไปด้วย เช่น ส่วนสูงกับน้ำหนัก</li>
          <li><strong>เครื่องหมายลบ (-):</strong> มีความสัมพันธ์ในทิศทางตรงกันข้าม (Negative Correlation) หมายความว่า หากตัวแปรหนึ่งเพิ่มขึ้น อีกตัวแปรหนึ่งมักจะลดลง เช่น ความเร็วในการขับรถกับระยะเวลาที่ใช้เดินทาง</li>
        </ul>

        <h4 className="text-lg font-medium mt-4 mb-2 text-gray-800">2. ขนาดหรือความแรงของความสัมพันธ์ (ดูจากตัวเลข)</h4>
        <p>
          เกณฑ์การประเมินระดับความสัมพันธ์ (โดยไม่สนเครื่องหมาย) นิยมใช้เกณฑ์คร่าวๆ ดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>0.80 – 1.00 :</strong> มีความสัมพันธ์ระดับสูงมาก (Very Strong)</li>
          <li><strong>0.60 – 0.79 :</strong> มีความสัมพันธ์ระดับสูง (Strong)</li>
          <li><strong>0.40 – 0.59 :</strong> มีความสัมพันธ์ระดับปานกลาง (Moderate)</li>
          <li><strong>0.20 – 0.39 :</strong> มีความสัมพันธ์ระดับต่ำ (Weak)</li>
          <li><strong>0.00 – 0.19 :</strong> มีความสัมพันธ์ระดับต่ำมาก หรือไม่มีความสัมพันธ์เลย (Very Weak or None)</li>
        </ul>
        <p>
          <em>* ค่า r = 0 หมายความว่า ไม่มีความสัมพันธ์เชิงเส้นตรงเลย (แต่ไม่ได้หมายความว่าไม่มีความสัมพันธ์ในรูปแบบอื่น เช่น เส้นโค้ง)</em>
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">ข้อควรระวังในการใช้งาน (Correlation is not Causation)</h3>
        <p>
          กฎทองของการวิเคราะห์สหสัมพันธ์คือ <strong>"สหสัมพันธ์ ไม่ใช่ความเป็นเหตุเป็นผล" (Correlation does not imply Causation)</strong> การที่ตัวแปร A และตัวแปร B มีความสัมพันธ์กันสูง ไม่ได้หมายความว่า A เป็นสาเหตุให้เกิด B เสมอไป อาจเป็นไปได้ว่า B ทำให้เกิด A หรืออาจมีตัวแปร C ที่เป็นสาเหตุทำให้เกิดทั้ง A และ B ขึ้นพร้อมกันก็ได้ การจะสรุปความเป็นเหตุเป็นผลได้ ต้องอาศัยการทดลองที่มีการควบคุมอย่างรัดกุมเท่านั้น
        </p>
      </article>
    </div>
  );
}

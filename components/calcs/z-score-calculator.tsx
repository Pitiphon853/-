import React, { useState } from 'react';
import { Calculator, BarChart, Info } from 'lucide-react';

export default function ZScoreCalculator({ lang }: any) {
  const [xValue, setXValue] = useState('');
  const [meanValue, setMeanValue] = useState('');
  const [sdValue, setSdValue] = useState('');
  const [zScore, setZScore] = useState<number | null>(null);

  const calculateZScore = () => {
    const x = parseFloat(xValue);
    const mean = parseFloat(meanValue);
    const sd = parseFloat(sdValue);
    if (!isNaN(x) && !isNaN(mean) && !isNaN(sd) && sd !== 0) {
      setZScore((x - mean) / sd);
    } else {
      setZScore(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700 flex items-center justify-center gap-3">
        <Calculator className="w-8 h-8" />
        {lang === 'EN' ? 'Z-Score Calculator' : 'โปรแกรมคำนวณค่า Z-Score'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <h2 className="text-xl font-semibold mb-4 text-indigo-800 flex items-center gap-2">
            <Info className="w-5 h-5" />
            {lang === 'EN' ? 'Input Data' : 'ข้อมูลสำหรับการคำนวณ'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'EN' ? 'Raw Score (X)' : 'คะแนนดิบ (X)'}
              </label>
              <input
                type="number"
                value={xValue}
                onChange={(e) => setXValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder={lang === 'EN' ? 'Enter raw score' : 'ระบุคะแนนดิบ'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'EN' ? 'Population Mean (μ)' : 'ค่าเฉลี่ย (μ)'}
              </label>
              <input
                type="number"
                value={meanValue}
                onChange={(e) => setMeanValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder={lang === 'EN' ? 'Enter mean' : 'ระบุค่าเฉลี่ย'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'EN' ? 'Standard Deviation (σ)' : 'ส่วนเบี่ยงเบนมาตรฐาน (σ)'}
              </label>
              <input
                type="number"
                value={sdValue}
                onChange={(e) => setSdValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder={lang === 'EN' ? 'Enter standard deviation' : 'ระบุส่วนเบี่ยงเบนมาตรฐาน'}
              />
            </div>
            <button
              onClick={calculateZScore}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              {lang === 'EN' ? 'Calculate Z-Score' : 'คำนวณ Z-Score'}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-indigo-600" />
            {lang === 'EN' ? 'Calculation Result' : 'ผลลัพธ์การคำนวณ'}
          </h2>
          {zScore !== null ? (
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-600 mb-4">{zScore.toFixed(4)}</div>
              <p className="text-gray-600 text-sm">
                {lang === 'EN'
                  ? 'This is your standardized Z-score.'
                  : 'นี่คือค่า Z-score มาตรฐานที่คำนวณได้จากข้อมูลของคุณ'}
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-700 text-left">
                <p><strong>{lang === 'EN' ? 'Interpretation:' : 'การแปลผล:'}</strong></p>
                <p className="mt-1">
                  {zScore > 0 
                    ? (lang === 'EN' ? 'The score is above the mean.' : 'คะแนนนี้มีค่าสูงกว่าค่าเฉลี่ยของกลุ่ม')
                    : zScore < 0 
                    ? (lang === 'EN' ? 'The score is below the mean.' : 'คะแนนนี้มีค่าต่ำกว่าค่าเฉลี่ยของกลุ่ม')
                    : (lang === 'EN' ? 'The score is exactly the mean.' : 'คะแนนนี้มีค่าเท่ากับค่าเฉลี่ยพอดี')}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <BarChart className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>{lang === 'EN' ? 'Please enter valid inputs and click calculate.' : 'โปรดระบุข้อมูลให้ครบถ้วนและกดคำนวณ'}</p>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-indigo max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">คะแนนมาตรฐาน Z-Score คืออะไร? การคำนวณและการนำไปใช้ในทางสถิติ</h2>
        
        <p>
          ในทางสถิติและการวิเคราะห์ข้อมูล <strong>Z-Score (คะแนนมาตรฐานซี)</strong> เป็นตัวชี้วัดที่สำคัญอย่างยิ่งในการเปรียบเทียบข้อมูลที่มีหน่วยหรือมาตรวัดแตกต่างกัน Z-Score จะช่วยบอกเราว่าค่าข้อมูลจุดหนึ่งๆ (Raw Score) อยู่ห่างจากค่าเฉลี่ย (Mean) ของกลุ่มข้อมูลนั้นเป็นระยะทางกี่เท่าของส่วนเบี่ยงเบนมาตรฐาน (Standard Deviation)
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">สูตรการคำนวณ Z-Score</h3>
        <p>
          สูตรพื้นฐานที่ใช้ในการคำนวณ Z-Score สำหรับประชากร คือ:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center font-serif text-xl my-4">
          Z = (X - μ) / σ
        </div>
        <p>โดยที่:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Z</strong> คือ คะแนนมาตรฐาน Z-Score ที่เราต้องการหา</li>
          <li><strong>X</strong> คือ คะแนนดิบ (Raw Score) หรือค่าข้อมูลที่เราต้องการตรวจสอบ</li>
          <li><strong>μ (มิว)</strong> คือ ค่าเฉลี่ยของประชากร (Population Mean)</li>
          <li><strong>σ (ซิกม่า)</strong> คือ ส่วนเบี่ยงเบนมาตรฐานของประชากร (Population Standard Deviation)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">ประโยชน์ของ Z-Score ในการวิเคราะห์ข้อมูล</h3>
        <p>
          การแปลงคะแนนดิบให้เป็น <strong>Z-Score</strong> มีประโยชน์อย่างมากในหลายๆ ด้าน ดังนี้:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>การเปรียบเทียบข้ามกลุ่ม:</strong> สมมติว่าคุณได้คะแนนสอบวิชาคณิตศาสตร์ 80 คะแนน และวิชาภาษาอังกฤษ 70 คะแนน หากดูแค่คะแนนดิบอาจจะคิดว่าคุณเก่งคณิตศาสตร์มากกว่า แต่ถ้าคะแนนเฉลี่ยวิชาคณิตศาสตร์คือ 85 และภาษาอังกฤษคือ 60 เมื่อแปลงเป็น Z-Score อาจพบว่าในวิชาภาษาอังกฤษคุณอยู่ในระดับที่สูงกว่าเมื่อเทียบกับเพื่อนในชั้น</li>
          <li><strong>การหาค่าความน่าจะเป็น:</strong> Z-Score ถูกนำไปใช้ร่วมกับตารางการแจกแจงปกติมาตรฐาน (Standard Normal Distribution Table) เพื่อหาพื้นที่ใต้โค้ง ซึ่งหมายถึงความน่าจะเป็นหรือเปอร์เซ็นไทล์ของข้อมูลนั้นๆ</li>
          <li><strong>การตรวจสอบข้อมูลผิดปกติ (Outliers):</strong> ในทาง Data Science มักใช้ Z-Score ในการกรองข้อมูลที่ผิดปกติ หากค่าใดมี Z-Score มากกว่า 3 หรือน้อยกว่า -3 (±3) มักถูกพิจารณาว่าเป็น Outlier</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">การตีความหมายของ Z-Score</h3>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Z-Score = 0 :</strong> ค่าข้อมูลนั้นมีค่าเท่ากับค่าเฉลี่ยของกลุ่มพอดี</li>
          <li><strong>Z-Score เป็นบวก (+) :</strong> ค่าข้อมูลนั้นมีค่าสูงกว่าค่าเฉลี่ย ยิ่งมีค่าบวกมาก ยิ่งแสดงว่าอยู่สูงกว่ากลุ่มส่วนใหญ่</li>
          <li><strong>Z-Score เป็นลบ (-) :</strong> ค่าข้อมูลนั้นมีค่าต่ำกว่าค่าเฉลี่ย</li>
        </ul>

        <p>
          ด้วยเครื่องมือคำนวณ Z-Score ด้านบน คุณสามารถหาค่า Z-Score ได้อย่างรวดเร็วและแม่นยำ เพียงแค่ระบุค่าคะแนนดิบ ค่าเฉลี่ย และส่วนเบี่ยงเบนมาตรฐาน ไม่ว่าคุณจะเป็นนักเรียน นักศึกษา ที่กำลังทำแบบฝึกหัดสถิติ หรือนักวิเคราะห์ข้อมูลที่ต้องการตรวจสอบการกระจายตัวของข้อมูล เครื่องมือนี้จะช่วยอำนวยความสะดวกให้คุณได้อย่างเต็มประสิทธิภาพ
        </p>
      </article>
    </div>
  );
}

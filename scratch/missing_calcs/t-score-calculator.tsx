import React, { useState } from 'react';
import { Calculator, BarChart2, Info } from 'lucide-react';

export default function TScoreCalculator({ lang }: any) {
  const [xValue, setXValue] = useState('');
  const [meanValue, setMeanValue] = useState('');
  const [sdValue, setSdValue] = useState('');
  const [tScore, setTScore] = useState<number | null>(null);
  const [zScore, setZScore] = useState<number | null>(null);

  const calculateTScore = () => {
    const x = parseFloat(xValue);
    const mean = parseFloat(meanValue);
    const sd = parseFloat(sdValue);
    if (!isNaN(x) && !isNaN(mean) && !isNaN(sd) && sd !== 0) {
      const z = (x - mean) / sd;
      const t = 50 + 10 * z;
      setZScore(z);
      setTScore(t);
    } else {
      setZScore(null);
      setTScore(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700 flex items-center justify-center gap-3">
        <Calculator className="w-8 h-8" />
        {lang === 'EN' ? 'T-Score Calculator' : 'โปรแกรมคำนวณค่า T-Score'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
            <Info className="w-5 h-5" />
            {lang === 'EN' ? 'Data Inputs' : 'ข้อมูลสำหรับการคำนวณ'}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={lang === 'EN' ? 'Enter raw score' : 'ระบุคะแนนดิบ'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'EN' ? 'Mean (μ)' : 'ค่าเฉลี่ย (μ)'}
              </label>
              <input
                type="number"
                value={meanValue}
                onChange={(e) => setMeanValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={lang === 'EN' ? 'Enter standard deviation' : 'ระบุส่วนเบี่ยงเบนมาตรฐาน'}
              />
            </div>
            <button
              onClick={calculateTScore}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              {lang === 'EN' ? 'Calculate T-Score' : 'คำนวณ T-Score'}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-blue-600" />
            {lang === 'EN' ? 'Results' : 'ผลลัพธ์'}
          </h2>
          {tScore !== null && zScore !== null ? (
            <div className="text-center w-full">
              <div className="mb-6">
                <span className="block text-sm text-gray-500 uppercase tracking-wider mb-1">
                  {lang === 'EN' ? 'Calculated T-Score' : 'ค่า T-Score'}
                </span>
                <span className="text-5xl font-bold text-blue-600">{tScore.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-4">
                <span className="block text-sm text-gray-500 uppercase tracking-wider mb-1">
                  {lang === 'EN' ? 'Intermediate Z-Score' : 'ค่า Z-Score เริ่มต้น'}
                </span>
                <span className="text-2xl font-semibold text-gray-700">{zScore.toFixed(4)}</span>
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-700 text-left">
                <p><strong>{lang === 'EN' ? 'Insight:' : 'การแปลผล:'}</strong></p>
                <p className="mt-1">
                  {tScore &gt;= 50 
                    ? (lang === 'EN' ? 'The score is equal to or above the average (T=50).' : 'คะแนนอยู่ในระดับค่าเฉลี่ยหรือสูงกว่าค่าเฉลี่ย (T ≥ 50)')
                    : (lang === 'EN' ? 'The score is below the average (T<50).' : 'คะแนนอยู่ในระดับต่ำกว่าค่าเฉลี่ย (T < 50)')}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <BarChart2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>{lang === 'EN' ? 'Please complete the fields to calculate.' : 'โปรดกรอกข้อมูลเพื่อดูผลลัพธ์ T-Score'}</p>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-blue max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">T-Score คืออะไร? ทำไมจึงเป็นที่นิยมในการวัดผลการศึกษา</h2>
        
        <p>
          ในการวัดและประเมินผลทางการศึกษา รวมถึงการทดสอบทางจิตวิทยาและแบบทดสอบมาตรฐานต่างๆ เรามักจะได้ยินคำว่า <strong>T-Score (คะแนนที)</strong> เป็นประจำ T-Score คือคะแนนมาตรฐานอีกรูปแบบหนึ่งที่ถูกสร้างขึ้นเพื่อแก้ปัญหาบางประการของคะแนน Z-Score โดยเฉพาะปัญหาเรื่องคะแนนติดลบและทศนิยมที่อาจทำให้ผู้สอบเกิดความสับสนหรือรู้สึกไม่ดีกับคะแนนของตนเอง
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">สูตรการคำนวณ T-Score</h3>
        <p>
          หลักการของ T-Score คือการแปลงค่า Z-Score ให้อยู่ในรูปแบบที่เข้าใจง่ายขึ้น โดยกำหนดให้มีค่าเฉลี่ย (Mean) เท่ากับ 50 และมีส่วนเบี่ยงเบนมาตรฐาน (SD) เท่ากับ 10 สูตรการคำนวณคือ:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center font-serif text-xl my-4">
          T = 50 + 10Z
        </div>
        <p>หรือเขียนแบบเต็มๆ ได้ว่า:</p>
        <div className="bg-gray-100 p-4 rounded-lg text-center font-serif text-xl my-4">
          T = 50 + 10[(X - μ) / σ]
        </div>
        <p>โดยที่:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>T</strong> คือ คะแนนมาตรฐาน T-Score</li>
          <li><strong>Z</strong> คือ คะแนนมาตรฐาน Z-Score</li>
          <li><strong>X</strong> คือ คะแนนดิบของการสอบ</li>
          <li><strong>μ</strong> คือ คะแนนเฉลี่ยของกลุ่ม</li>
          <li><strong>σ</strong> คือ ส่วนเบี่ยงเบนมาตรฐานของกลุ่ม</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">ข้อดีของการใช้ T-Score แทนคะแนนดิบ</h3>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>ตัดปัญหาคะแนนติดลบ:</strong> ใน Z-Score ผู้ที่ได้คะแนนต่ำกว่าค่าเฉลี่ยจะได้คะแนนติดลบ แต่สำหรับ T-Score จะมีการบวก 50 เข้าไป ทำให้คะแนนส่วนใหญ่ของผู้สอบอยู่ในช่วง 20 ถึง 80 ซึ่งเป็นค่าบวกทั้งหมด</li>
          <li><strong>เปรียบเทียบข้ามรายวิชาได้:</strong> เช่นเดียวกับ Z-Score การแปลงคะแนนเป็น T-Score ช่วยให้สามารถเปรียบเทียบผลสัมฤทธิ์ทางการเรียนระหว่างวิชาที่มีความยากง่ายต่างกันได้ อย่างยุติธรรม</li>
          <li><strong>แปลความหมายง่าย:</strong> ผู้ประเมินสามารถจำหลักการง่ายๆ ได้ว่า T=50 คือค่าเฉลี่ยตรงกลางพอดี ใครได้มากกว่า 50 ถือว่าเก่งกว่าคนส่วนใหญ่ ใครได้ต่ำกว่า 50 ถือว่ายังต้องพัฒนา</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">การกระจายตัวของ T-Score</h3>
        <p>
          ในการแจกแจงแบบปกติ (Normal Distribution) คะแนน T-Score ส่วนใหญ่ (ประมาณ 68%) จะกระจุกตัวอยู่ระหว่าง T=40 ถึง T=60 และมีคนจำนวนน้อยมากที่จะได้คะแนนสูงเกิน T=80 หรือต่ำกว่า T=20 ดังนั้น หากคุณได้คะแนน T-Score ในระดับ 60 หรือ 70 ขึ้นไป ถือว่าคุณทำผลงานได้อยู่ในระดับท็อปของกลุ่มแล้ว
        </p>

        <p>
          เครื่องมือคำนวณ T-Score ที่เราจัดเตรียมไว้ให้นี้ จะช่วยแปลงคะแนนดิบของคุณเป็น T-Score ได้ทันที เพียงแค่คุณทราบคะแนนของตนเอง คะแนนเฉลี่ยของชั้นเรียน และค่าความเบี่ยงเบนมาตรฐาน ซึ่งมีประโยชน์อย่างมากสำหรับครูผู้สอนในการประเมินตัดเกรด หรือนักเรียนที่ต้องการรู้ตำแหน่งที่แท้จริงของตนเองในระดับชั้น
        </p>
      </article>
    </div>
  );
}

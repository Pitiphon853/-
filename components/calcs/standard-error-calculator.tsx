import React, { useState } from 'react';
import { Calculator, Target, Info } from 'lucide-react';

export default function StandardErrorCalculator({ lang }: any) {
  const [sdValue, setSdValue] = useState('');
  const [nValue, setNValue] = useState('');
  const [seResult, setSeResult] = useState<number | null>(null);

  const calculateSE = () => {
    const sd = parseFloat(sdValue);
    const n = parseFloat(nValue);
    if (!isNaN(sd) && !isNaN(n) && n > 0) {
      setSeResult(sd / Math.sqrt(n));
    } else {
      setSeResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-700 flex items-center justify-center gap-3">
        <Calculator className="w-8 h-8" />
        {lang === 'EN' ? 'Standard Error Calculator' : 'โปรแกรมคำนวณความคลาดเคลื่อนมาตรฐาน (SE)'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
          <h2 className="text-xl font-semibold mb-4 text-purple-800 flex items-center gap-2">
            <Info className="w-5 h-5" />
            {lang === 'EN' ? 'Input Parameters' : 'ข้อมูลพารามิเตอร์'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'EN' ? 'Standard Deviation (s or σ)' : 'ส่วนเบี่ยงเบนมาตรฐาน (SD)'}
              </label>
              <input
                type="number"
                value={sdValue}
                onChange={(e) => setSdValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder={lang === 'EN' ? 'Enter standard deviation' : 'ระบุส่วนเบี่ยงเบนมาตรฐาน'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'EN' ? 'Sample Size (n)' : 'ขนาดกลุ่มตัวอย่าง (n)'}
              </label>
              <input
                type="number"
                value={nValue}
                onChange={(e) => setNValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder={lang === 'EN' ? 'Enter sample size (> 0)' : 'ระบุขนาดกลุ่มตัวอย่าง (ต้องมากกว่า 0)'}
              />
            </div>
            <button
              onClick={calculateSE}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              {lang === 'EN' ? 'Calculate SE' : 'คำนวณ Standard Error'}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            {lang === 'EN' ? 'Result (Standard Error of the Mean)' : 'ผลลัพธ์ (ความคลาดเคลื่อนมาตรฐาน)'}
          </h2>
          {seResult !== null ? (
            <div className="text-center w-full">
              <span className="block text-sm text-gray-500 uppercase tracking-wider mb-2">
                {lang === 'EN' ? 'Standard Error (SE)' : 'ค่าความคลาดเคลื่อนมาตรฐาน (SE)'}
              </span>
              <div className="text-5xl font-bold text-purple-600 mb-6">{seResult.toFixed(4)}</div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-700 text-left">
                <p><strong>{lang === 'EN' ? 'What this means:' : 'ความหมายของผลลัพธ์:'}</strong></p>
                <p className="mt-1">
                  {lang === 'EN' 
                    ? 'This value estimates how far the sample mean is likely to be from the true population mean. A smaller SE indicates that the sample mean is a more accurate reflection of the population mean.' 
                    : 'ค่านี้แสดงถึงความคลาดเคลื่อนโดยประมาณระหว่างค่าเฉลี่ยของกลุ่มตัวอย่างและค่าเฉลี่ยของประชากรจริง ยิ่งค่า SE ต่ำ หมายถึงกลุ่มตัวอย่างมีความแม่นยำในการเป็นตัวแทนประชากรมากขึ้น'}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <Target className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>{lang === 'EN' ? 'Please fill in standard deviation and sample size.' : 'โปรดระบุส่วนเบี่ยงเบนมาตรฐานและขนาดกลุ่มตัวอย่าง'}</p>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-purple max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ความคลาดเคลื่อนมาตรฐาน (Standard Error) คืออะไร และทำไมจึงสำคัญในงานวิจัย?</h2>
        
        <p>
          ในการทำงานวิจัยหรือการสำรวจทางสถิติ เรามักจะไม่สามารถเก็บข้อมูลจากประชากรทั้งหมด (Population) ได้ จึงจำเป็นต้องสุ่มเก็บข้อมูลจากกลุ่มตัวอย่าง (Sample) แทน เมื่อเราคำนวณค่าเฉลี่ยจากกลุ่มตัวอย่าง เรามักจะเกิดคำถามขึ้นว่า <em>"ค่าเฉลี่ยของกลุ่มตัวอย่างนี้ ใกล้เคียงกับค่าเฉลี่ยที่แท้จริงของประชากรทั้งหมดมากน้อยเพียงใด?"</em>
        </p>
        
        <p>
          เครื่องมือที่จะช่วยตอบคำถามนี้คือ <strong>ความคลาดเคลื่อนมาตรฐาน (Standard Error หรือ SE)</strong> ซึ่งเป็นค่าที่ใช้บอกความแม่นยำในการประมาณค่าพารามิเตอร์ของประชากรจากกลุ่มตัวอย่าง โดยเฉพาะอย่างยิ่ง <strong>ความคลาดเคลื่อนมาตรฐานของค่าเฉลี่ย (Standard Error of the Mean - SEM)</strong>
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">สูตรการคำนวณความคลาดเคลื่อนมาตรฐาน (SE)</h3>
        <p>
          การคำนวณความคลาดเคลื่อนมาตรฐานของค่าเฉลี่ย สามารถทำได้โดยใช้ส่วนเบี่ยงเบนมาตรฐาน (SD) หารด้วยรากที่สองของขนาดกลุ่มตัวอย่าง (n):
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center font-serif text-xl my-4">
          SE = SD / √n
        </div>
        <p>โดยที่:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>SE</strong> คือ ความคลาดเคลื่อนมาตรฐาน (Standard Error)</li>
          <li><strong>SD</strong> คือ ส่วนเบี่ยงเบนมาตรฐาน (Standard Deviation) ของกลุ่มตัวอย่างหรือประชากร</li>
          <li><strong>n</strong> คือ ขนาดของกลุ่มตัวอย่าง (Sample Size)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">ความแตกต่างระหว่าง Standard Deviation (SD) และ Standard Error (SE)</h3>
        <p>
          หลายคนมักสับสนระหว่างสองคำนี้ ความจริงแล้วทั้งคู่มีความแตกต่างกันอย่างชัดเจน:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>SD (ส่วนเบี่ยงเบนมาตรฐาน)</strong> ใช้บอกการกระจายตัวของข้อมูลว่า แต่ละค่าข้อมูลอยู่ห่างจากค่าเฉลี่ยมากน้อยแค่ไหน เป็นการอธิบายลักษณะของข้อมูลชุดนั้นโดยตรง</li>
          <li><strong>SE (ความคลาดเคลื่อนมาตรฐาน)</strong> ใช้บอกว่า ค่าเฉลี่ยของกลุ่มตัวอย่างที่เราสุ่มมานั้น มีแนวโน้มจะคลาดเคลื่อนไปจากค่าเฉลี่ยของประชากรจริงมากน้อยแค่ไหน เป็นเรื่องของความน่าเชื่อถือของการสุ่มตัวอย่าง</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">การลดค่าความคลาดเคลื่อนมาตรฐาน</h3>
        <p>
          จากสูตรการคำนวณ <code>SE = SD / √n</code> จะเห็นได้ว่า ตัวหารคือรากที่สองของ n (ขนาดกลุ่มตัวอย่าง) ดังนั้น <strong>ยิ่งเราเก็บข้อมูลกลุ่มตัวอย่าง (n) มากขึ้นเท่าไร ค่า SE ก็จะยิ่งลดลงเท่านั้น</strong> ซึ่งหมายถึงผลการวิจัยหรือค่าเฉลี่ยที่เราคำนวณได้ จะมีความแม่นยำและใกล้เคียงกับความเป็นจริงของประชากรมากขึ้น
        </p>
        <p>
          ดังนั้น ในการออกแบบการวิจัยหรือการสำรวจโพลต่างๆ หากต้องการให้ผลลัพธ์มีความน่าเชื่อถือสูง ผู้วิจัยจึงต้องคำนวณหาขนาดกลุ่มตัวอย่างที่เหมาะสม เพื่อให้ค่าความคลาดเคลื่อนมาตรฐาน (SE) อยู่ในเกณฑ์ที่ยอมรับได้นั่นเอง
        </p>
      </article>
    </div>
  );
}

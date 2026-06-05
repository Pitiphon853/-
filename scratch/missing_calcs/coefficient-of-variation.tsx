import React, { useState } from 'react';
import { Calculator, Percent, Info } from 'lucide-react';

export default function CoefficientOfVariation({ lang }: any) {
  const [meanValue, setMeanValue] = useState('');
  const [sdValue, setSdValue] = useState('');
  const [cvResult, setCvResult] = useState<number | null>(null);

  const calculateCV = () => {
    const mean = parseFloat(meanValue);
    const sd = parseFloat(sdValue);
    if (!isNaN(mean) && !isNaN(sd) && mean !== 0) {
      setCvResult((sd / mean) * 100);
    } else {
      setCvResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-emerald-700 flex items-center justify-center gap-3">
        <Calculator className="w-8 h-8" />
        {lang === 'EN' ? 'Coefficient of Variation (CV)' : 'โปรแกรมคำนวณสัมประสิทธิ์ความแปรผัน'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h2 className="text-xl font-semibold mb-4 text-emerald-800 flex items-center gap-2">
            <Info className="w-5 h-5" />
            {lang === 'EN' ? 'Data Inputs' : 'ข้อมูลสำหรับการคำนวณ'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'EN' ? 'Standard Deviation (σ or s)' : 'ส่วนเบี่ยงเบนมาตรฐาน (SD)'}
              </label>
              <input
                type="number"
                value={sdValue}
                onChange={(e) => setSdValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder={lang === 'EN' ? 'Enter standard deviation' : 'ระบุส่วนเบี่ยงเบนมาตรฐาน'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'EN' ? 'Mean (μ or x̄)' : 'ค่าเฉลี่ย (Mean)'}
              </label>
              <input
                type="number"
                value={meanValue}
                onChange={(e) => setMeanValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder={lang === 'EN' ? 'Enter mean (cannot be 0)' : 'ระบุค่าเฉลี่ย (ต้องไม่เป็น 0)'}
              />
            </div>
            <button
              onClick={calculateCV}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              {lang === 'EN' ? 'Calculate CV' : 'คำนวณ CV'}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
            <Percent className="w-5 h-5 text-emerald-600" />
            {lang === 'EN' ? 'CV Result' : 'ผลลัพธ์สัมประสิทธิ์ความแปรผัน'}
          </h2>
          {cvResult !== null ? (
            <div className="text-center w-full">
              <div className="mb-2">
                <span className="block text-sm text-gray-500 uppercase tracking-wider mb-1">
                  {lang === 'EN' ? 'Coefficient of Variation' : 'สัมประสิทธิ์ความแปรผัน (CV)'}
                </span>
                <div className="flex justify-center items-end gap-2">
                  <span className="text-5xl font-bold text-emerald-600">{cvResult.toFixed(2)}</span>
                  <span className="text-2xl font-semibold text-gray-500 pb-1">%</span>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-700 text-left">
                <p><strong>{lang === 'EN' ? 'Interpretation:' : 'การแปลผล:'}</strong></p>
                <p className="mt-1">
                  {cvResult &lt; 10 
                    ? (lang === 'EN' ? 'Low variance. The data points are very close to the mean.' : 'มีความแปรผันต่ำ ข้อมูลเกาะกลุ่มกันใกล้เคียงกับค่าเฉลี่ยมาก')
                    : cvResult &lt; 30
                    ? (lang === 'EN' ? 'Moderate variance. The data shows normal spread.' : 'มีความแปรผันปานกลาง ข้อมูลมีการกระจายตัวตามปกติ')
                    : (lang === 'EN' ? 'High variance. The data points are widely spread out.' : 'มีความแปรผันสูง ข้อมูลมีการกระจายตัวออกจากค่าเฉลี่ยค่อนข้างมาก')}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <Percent className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>{lang === 'EN' ? 'Please complete the fields and avoid zero mean.' : 'โปรดกรอกข้อมูลให้ครบถ้วน (ค่าเฉลี่ยต้องไม่เป็นศูนย์)'}</p>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-emerald max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">สัมประสิทธิ์ความแปรผัน (Coefficient of Variation - CV) คืออะไร?</h2>
        
        <p>
          ในการวิเคราะห์ข้อมูลทางสถิติ บ่อยครั้งที่เราต้องการเปรียบเทียบการกระจายตัวของข้อมูลสองชุดขึ้นไป หากข้อมูลทั้งสองชุดมีหน่วยวัดเดียวกันและมีค่าเฉลี่ยใกล้เคียงกัน เราสามารถใช้ส่วนเบี่ยงเบนมาตรฐาน (Standard Deviation - SD) ในการเปรียบเทียบได้โดยตรง แต่หากข้อมูลมีหน่วยวัดต่างกัน (เช่น น้ำหนักเป็นกิโลกรัมเทียบกับส่วนสูงเป็นเซนติเมตร) หรือมีค่าเฉลี่ยต่างกันมาก การใช้ SD เพียงอย่างเดียวจะไม่สามารถให้ภาพที่ถูกต้องได้
        </p>

        <p>
          นี่คือจุดที่ <strong>สัมประสิทธิ์ความแปรผัน (Coefficient of Variation ย่อว่า CV)</strong> เข้ามามีบทบาทสำคัญ CV เป็นการวัดการกระจายสัมพัทธ์ (Relative Dispersion) ซึ่งไม่มีหน่วย ทำให้เราสามารถนำไปใช้เปรียบเทียบความแปรผันของข้อมูลต่างชุดกันได้อย่างสมเหตุสมผล
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">สูตรการคำนวณ CV</h3>
        <p>
          การคำนวณสัมประสิทธิ์ความแปรผันทำได้โดยการนำส่วนเบี่ยงเบนมาตรฐานมาหารด้วยค่าเฉลี่ย และมักจะคูณด้วย 100 เพื่อแสดงผลในรูปแบบเปอร์เซ็นต์ (%):
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center font-serif text-xl my-4">
          CV = (SD / Mean) × 100
        </div>
        <p>โดยที่:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>CV</strong> คือ สัมประสิทธิ์ความแปรผัน (แสดงเป็นร้อยละ)</li>
          <li><strong>SD</strong> คือ ส่วนเบี่ยงเบนมาตรฐาน (Standard Deviation)</li>
          <li><strong>Mean</strong> คือ ค่าเฉลี่ยของข้อมูล (ไม่อาจเป็น 0 ได้)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">ตัวอย่างการใช้งาน CV ในชีวิตจริง</h3>
        <p>
          สมมติว่าคุณเป็นนักลงทุนที่กำลังพิจารณาหุ้น 2 ตัว:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>หุ้น A:</strong> ราคาเฉลี่ย 50 บาท มีส่วนเบี่ยงเบนมาตรฐาน 5 บาท</li>
          <li><strong>หุ้น B:</strong> ราคาเฉลี่ย 500 บาท มีส่วนเบี่ยงเบนมาตรฐาน 20 บาท</li>
        </ul>
        <p>
          ถ้าดูแค่ส่วนเบี่ยงเบนมาตรฐาน หุ้น B (20) ดูมีความผันผวนมากกว่าหุ้น A (5) แต่ถ้าเราลองคำนวณ CV:
          <br/>
          CV ของหุ้น A = (5 / 50) × 100 = 10%
          <br/>
          CV ของหุ้น B = (20 / 500) × 100 = 4%
        </p>
        <p>
          จะเห็นได้ว่า เมื่อเทียบสัดส่วนความผันผวนกับราคาเฉลี่ยแล้ว หุ้น A กลับมีความผันผวนสัมพัทธ์ (ความเสี่ยง) ที่สูงกว่าหุ้น B อย่างชัดเจน นี่คือประโยชน์ของ CV ที่ช่วยให้นักลงทุนสามารถเปรียบเทียบความเสี่ยงต่อผลตอบแทนที่คาดหวังได้อย่างถูกต้อง
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">การตีความหมายของค่า CV</h3>
        <p>
          โดยทั่วไป ยิ่งค่า CV ต่ำ หมายถึงข้อมูลมีการเกาะกลุ่มอยู่ใกล้กับค่าเฉลี่ยมาก (มีความสม่ำเสมอสูงหรือความเสี่ยงต่ำ) ในขณะที่ค่า CV ที่สูง บ่งชี้ว่าข้อมูลมีการกระจายตัวออกห่างจากค่าเฉลี่ยมาก (มีความสม่ำเสมอต่ำหรือความเสี่ยงสูง) เกณฑ์ในการตัดสินว่า CV สูงหรือต่ำมักขึ้นอยู่กับบริบทและลักษณะของข้อมูลในสายงานนั้นๆ
        </p>
      </article>
    </div>
  );
}

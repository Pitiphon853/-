import React, { useState } from 'react';
import { Calculator, Percent, ArrowRight, Info, BookOpen } from 'lucide-react';

export default function PercentDifferenceCalculator({ lang }: any) {
  const [val1, setVal1] = useState<string>('');
  const [val2, setVal2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculateDifference = () => {
    const num1 = parseFloat(val1);
    const num2 = parseFloat(val2);

    if (!isNaN(num1) && !isNaN(num2)) {
      if (num1 === 0 && num2 === 0) {
        setResult(0);
        return;
      }
      
      const diff = Math.abs(num1 - num2);
      const avg = (Math.abs(num1) + Math.abs(num2)) / 2;
      
      if (avg === 0) {
        setResult(null); // Edge case handles
      } else {
        const percentDiff = (diff / avg) * 100;
        setResult(percentDiff);
      }
    } else {
      setResult(null);
    }
  };

  const isTH = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="p-3 bg-pink-50 rounded-xl text-pink-600">
            <Percent className="w-8 h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {isTH ? 'เครื่องมือคำนวณความแตกต่างเป็นเปอร์เซ็นต์' : "Percent Difference Calculator"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'ค่าที่ 1 (Value 1)' : 'Value 1'}
                </label>
                <input
                  type="number"
                  value={val1}
                  onChange={(e) => setVal1(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="e.g. 50"
                />
              </div>
              <div className="hidden md:flex text-gray-300 mt-6">
                <ArrowRight className="w-6 h-6" />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'ค่าที่ 2 (Value 2)' : 'Value 2'}
                </label>
                <input
                  type="number"
                  value={val2}
                  onChange={(e) => setVal2(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="e.g. 70"
                />
              </div>
            </div>

            <button
              onClick={calculateDifference}
              className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-pink-200 mt-4"
            >
              {isTH ? 'คำนวณความแตกต่าง' : 'Calculate Difference'}
            </button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
            {result !== null ? (
              <div className="text-center space-y-4">
                <h3 className="text-lg font-medium text-gray-500">
                  {isTH ? 'ความแตกต่างร้อยละ (Percent Difference)' : "Percent Difference"}
                </h3>
                <div className="text-5xl font-bold text-pink-600 flex items-center justify-center gap-2">
                  {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  <span className="text-3xl text-pink-400">%</span>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 flex flex-col items-center">
                <Calculator className="w-12 h-12 mb-3 text-gray-300" />
                <p>{isTH ? 'กรอกตัวเลขทั้งสองค่าเพื่อดูผลลัพธ์' : 'Enter both values to see the difference'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-6">
          <BookOpen className="w-6 h-6 text-pink-600" />
          การหาความแตกต่างระหว่างสองค่าเป็นเปอร์เซ็นต์ (Percent Difference)
        </h2>
        
        <p>
          ในชีวิตประจำวันหรือในทางธุรกิจ เรามักจะต้องเปรียบเทียบตัวเลขสองตัวอยู่เสมอ เช่น การเปรียบเทียบยอดขายของเดือนนี้กับเดือนที่แล้ว หรือการเปรียบเทียบผลการทดลองสองครั้ง การบอกความแตกต่างเป็นเพียง "ตัวเลข" เฉยๆ (เช่น ต่างกัน 10) อาจไม่สามารถสื่อความหมายได้อย่างชัดเจนว่าความแตกต่างนั้น "มาก" หรือ "น้อย" เพียงใด การแปลงความแตกต่างนั้นให้กลายเป็น <strong>เปอร์เซ็นต์ หรือ ร้อยละ (Percent Difference)</strong> จึงเป็นวิธีที่ช่วยให้เข้าใจสัดส่วนของความแตกต่างได้ดียิ่งขึ้น
        </p>

        <h3>Percent Difference คืออะไร?</h3>
        <p>
          Percent Difference (ความแตกต่างเป็นเปอร์เซ็นต์) เป็นการวัดความแตกต่างระหว่างค่าสองค่าที่ไม่ได้เจาะจงว่าค่าใดเป็น "ค่าเริ่มต้น" หรือ "ค่าดั้งเดิม" โดยใช้วิธีการหาค่าเฉลี่ยของทั้งสองค่ามาเป็นฐาน (Base) ในการคำนวณ เพื่อให้ได้ตัวเลขที่ยุติธรรม ไม่เอนเอียงไปทางค่าใดค่าหนึ่ง 
        </p>
        <p>
          สิ่งนี้แตกต่างจาก <em>"การเปลี่ยนแปลงเป็นเปอร์เซ็นต์" (Percent Change)</em> ซึ่งจะมีค่าเริ่มต้นที่ชัดเจน เช่น ราคาหุ้นขึ้นจาก 100 บาทเป็น 120 บาท (มีทิศทางเก่าและใหม่ชัดเจน) แต่ Percent Difference มักจะใช้กับค่าที่อยู่บนความเท่าเทียมกัน เช่น การวัดความสูงของคนสองคนเพื่อดูว่าต่างกันกี่เปอร์เซ็นต์
        </p>

        <h3>สูตรการคำนวณความแตกต่างร้อยละ (Formula)</h3>
        <p>สูตรที่ใช้เป็นมาตรฐานในการหา Percent Difference คือการนำค่าสัมบูรณ์ของผลต่างของตัวเลขสองตัว หารด้วยค่าเฉลี่ยของตัวเลขทั้งสองนั้น แล้วคูณด้วย 100</p>
        <div className="bg-pink-50 p-6 rounded-xl my-6 text-center font-serif text-xl border border-pink-100">
          Percent Difference = ( |a - b| / ((|a| + |b|) / 2) ) × 100%
        </div>
        <ul>
          <li><strong>a, b</strong> คือ ตัวเลขหรือค่าทั้งสองที่เราต้องการนำมาเปรียบเทียบ</li>
          <li><strong>|a - b|</strong> คือ ค่าสัมบูรณ์ (Absolute Value) ของผลต่าง ซึ่งหมายความว่าเราเอาตัวไหนตั้งลบตัวไหนก็จะได้ผลลัพธ์เป็นบวกเสมอ</li>
          <li><strong>((|a| + |b|) / 2)</strong> คือ ค่าเฉลี่ยของค่าสัมบูรณ์ของทั้งสองค่านั้น</li>
        </ul>

        <h3>ตัวอย่างการคำนวณในสถานการณ์จริง</h3>
        <p>
          สมมติว่าคุณต้องการเปรียบเทียบจำนวนประชากรของสองหมู่บ้าน ซึ่งหมู่บ้าน A มีประชากร 2,500 คน และหมู่บ้าน B มีประชากร 3,000 คน และคุณอยากรู้ว่าทั้งสองหมู่บ้านนี้มีจำนวนประชากรแตกต่างกันกี่เปอร์เซ็นต์ (โดยไม่ได้ยึดหมู่บ้านใดเป็นหลัก)
        </p>
        <ol>
          <li>หาผลต่าง: |2,500 - 3,000| = |-500| = 500</li>
          <li>หาค่าเฉลี่ย: (2,500 + 3,000) / 2 = 2,750</li>
          <li>คำนวณเปอร์เซ็นต์ความแตกต่าง: (500 / 2,750) × 100% ≈ <strong>18.18%</strong></li>
        </ol>
        <p>สรุปได้ว่า จำนวนประชากรของทั้งสองหมู่บ้านมีความแตกต่างกันประมาณ 18.18%</p>

        <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg my-6">
          <h4 className="flex items-center gap-2 font-bold text-gray-800 m-0 mb-2">
            <Info className="w-5 h-5" />
            ข้อสังเกตเพิ่มเติม
          </h4>
          <p className="text-gray-700 m-0 text-sm">
            การคำนวณด้วยวิธีนี้จะให้ผลลัพธ์ที่เหมือนกันเสมอ ไม่ว่าคุณจะนำค่าใดมากรอกเป็น ค่าที่ 1 หรือ ค่าที่ 2 ก็ตาม เพราะสูตรใช้ "ค่าสัมบูรณ์" (Absolute Value) มาช่วยจัดการเรื่องเครื่องหมายติดลบ จึงเหมาะมากสำหรับการเปรียบเทียบความแตกต่างระหว่างของสองสิ่งแบบไม่มีทิศทาง (No specific order of subtraction)
          </p>
        </div>
      </article>
    </div>
  );
}

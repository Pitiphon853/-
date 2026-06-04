import React, { useState } from 'react';
import { Square, Calculator, RefreshCw, ArrowRight } from 'lucide-react';

export default function AreaRhombusCalculator({ lang = 'TH' }: any) {
  const [method, setMethod] = useState<'diagonal' | 'base-height'>('diagonal');
  const [d1, setD1] = useState<string>('');
  const [d2, setD2] = useState<string>('');
  const [base, setBase] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    setResult(null);

    if (method === 'diagonal') {
      const valD1 = parseFloat(d1);
      const valD2 = parseFloat(d2);
      if (isNaN(valD1) || isNaN(valD2) || valD1 <= 0 || valD2 <= 0) {
        setError(lang === 'EN' ? 'Please enter valid positive numbers for both diagonals.' : 'กรุณากรอกความยาวเส้นทแยงมุมที่ถูกต้องและมากกว่า 0');
        return;
      }
      setResult((valD1 * valD2) / 2);
    } else {
      const valBase = parseFloat(base);
      const valHeight = parseFloat(height);
      if (isNaN(valBase) || isNaN(valHeight) || valBase <= 0 || valHeight <= 0) {
        setError(lang === 'EN' ? 'Please enter valid positive numbers for base and height.' : 'กรุณากรอกค่าฐานและความสูงที่ถูกต้องและมากกว่า 0');
        return;
      }
      setResult(valBase * valHeight);
    }
  };

  const reset = () => {
    setD1('');
    setD2('');
    setBase('');
    setHeight('');
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
          <Square className="w-6 h-6 rotate-45" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'EN' ? 'Rhombus Area Calculator' : 'เครื่องคิดเลขพื้นที่สี่เหลี่ยมขนมเปียกปูน'}
        </h2>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {lang === 'EN' ? 'Select Calculation Method' : 'เลือกวิธีคำนวณ'}
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              checked={method === 'diagonal'}
              onChange={() => { setMethod('diagonal'); reset(); }}
              className="form-radio text-blue-600 h-4 w-4"
            />
            <span>{lang === 'EN' ? 'Diagonals (d1, d2)' : 'ใช้เส้นทแยงมุม'}</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              checked={method === 'base-height'}
              onChange={() => { setMethod('base-height'); reset(); }}
              className="form-radio text-blue-600 h-4 w-4"
            />
            <span>{lang === 'EN' ? 'Base & Height' : 'ใช้ฐานและความสูง'}</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {method === 'diagonal' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'EN' ? 'Diagonal 1 (d1)' : 'ความยาวเส้นทแยงมุมเส้นที่ 1 (d1)'}
              </label>
              <input
                type="number"
                value={d1}
                onChange={(e) => setD1(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'EN' ? 'Diagonal 2 (d2)' : 'ความยาวเส้นทแยงมุมเส้นที่ 2 (d2)'}
              </label>
              <input
                type="number"
                value={d2}
                onChange={(e) => setD2(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'EN' ? 'Base' : 'ความยาวฐาน'}
              </label>
              <input
                type="number"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'EN' ? 'Height' : 'ความสูง'}
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </>
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="flex space-x-4 pt-4">
          <button
            onClick={calculate}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>{lang === 'EN' ? 'Calculate' : 'คำนวณ'}</span>
          </button>
          <button
            onClick={reset}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>{lang === 'EN' ? 'Reset' : 'เริ่มใหม่'}</span>
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <ArrowRight className="w-5 h-5 text-blue-500 mr-2" />
            {lang === 'EN' ? 'Calculation Result' : 'ผลการคำนวณ'}
          </h3>
          <div className="text-4xl font-bold text-blue-600">
            {result.toLocaleString('en-US', { maximumFractionDigits: 4 })}
            <span className="text-xl text-gray-600 ml-2 font-normal">
              {lang === 'EN' ? 'square units' : 'ตารางหน่วย'}
            </span>
          </div>
          
          <div className="mt-4 text-gray-600 text-sm">
            <strong>{lang === 'EN' ? 'Formula used:' : 'สูตรที่ใช้:'}</strong>{' '}
            {method === 'diagonal' 
              ? (lang === 'EN' ? 'Area = (d1 × d2) / 2' : 'พื้นที่ = (เส้นทแยงมุมที่ 1 × เส้นทแยงมุมที่ 2) / 2')
              : (lang === 'EN' ? 'Area = Base × Height' : 'พื้นที่ = ฐาน × สูง')}
          </div>
        </div>
      )}

      {lang === 'TH' && (
        <article className="mt-12 prose prose-blue max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">การหาพื้นที่สี่เหลี่ยมขนมเปียกปูน (Rhombus Area) และคุณสมบัติที่สำคัญ</h2>
          
          <p>
            การหา <strong>พื้นที่สี่เหลี่ยมขนมเปียกปูน</strong> (Rhombus Area) เป็นหนึ่งในหัวข้อสำคัญทางคณิตศาสตร์เรขาคณิตที่สามารถนำไปประยุกต์ใช้ในชีวิตประจำวันและงานทางวิศวกรรมหรือสถาปัตยกรรมต่างๆ ได้อย่างมากมาย รูปสี่เหลี่ยมขนมเปียกปูน (Rhombus) คือ รูปสี่เหลี่ยมที่มีความยาวของด้านเท่ากันทั้งสี่ด้าน และมุมที่อยู่ตรงข้ามกันมีขนาดเท่ากัน แต่ไม่ได้บังคับว่าทุกมุมต้องเป็นมุมฉากเหมือนสี่เหลี่ยมจัตุรัส ด้วยคุณสมบัติที่โดดเด่นนี้ การหาพื้นที่จึงสามารถทำได้หลากหลายวิธีขึ้นอยู่กับข้อมูลที่เรามีอยู่
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. การหาพื้นที่โดยใช้เส้นทแยงมุม (Diagonals)</h3>
          <p>
            วิธีแรกและเป็นที่นิยมที่สุดคือการใช้ <strong>เส้นทแยงมุม</strong> หากเราทราบความยาวของเส้นทแยงมุมทั้งสองเส้น ซึ่งในรูปสี่เหลี่ยมขนมเปียกปูน เส้นทแยงมุมจะตัดกันเป็นมุมฉาก (90 องศา) เสมอ และแบ่งครึ่งซึ่งกันและกัน สูตรที่ใช้คือ การนำความยาวของเส้นทแยงมุมทั้งสองเส้นมาคูณกันแล้วหารด้วยสอง หรือเขียนเป็นสูตรทางคณิตศาสตร์ว่า:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg my-4 text-center font-semibold">
            พื้นที่ = (1/2) × (ผลคูณของความยาวเส้นทแยงมุม)<br />
            หรือ A = (d1 × d2) / 2
          </div>
          <p>
            วิธีนี้เหมาะอย่างยิ่งสำหรับการออกแบบหรือการทำโครงสร้างที่มีการวัดระยะจากจุดกึ่งกลางหรือระยะตัดขวางของรูปสี่เหลี่ยม เช่น โครงว่าว หรือการจัดวางผังลายกระเบื้อง
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. การหาพื้นที่โดยใช้ฐานและความสูง (Base and Height)</h3>
          <p>
            วิธีที่สองคือการใช้ <strong>ฐานและความสูง</strong> เช่นเดียวกับรูปสี่เหลี่ยมด้านขนาน (Parallelogram) หากเราทราบความยาวของด้านใดด้านหนึ่ง (ซึ่งทุกด้านยาวเท่ากันอยู่แล้ว จึงใช้ด้านใดเป็นฐานก็ได้) และทราบความสูงตั้งฉากจากฐานนั้นไปยังด้านตรงข้าม (ความสูงคือระยะตั้งฉากระหว่างคู่ขนาน) สูตรที่ใช้คือ:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg my-4 text-center font-semibold">
            พื้นที่ = ฐาน × สูง<br />
            หรือ A = b × h
          </div>
          <p>
            วิธีนี้มักจะใช้เมื่อเราวัดขนาดของพื้นที่ตามขอบด้านนอกและมีระยะตั้งฉากที่วัดได้ง่าย เช่น การหาพื้นที่ที่ดิน การปูพื้น หรือการตัดวัสดุแผ่นเรียบในงานช่าง
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">คุณสมบัติอื่นๆ ของสี่เหลี่ยมขนมเปียกปูน</h3>
          <p>
            คุณสมบัติที่น่าสนใจเพิ่มเติมของสี่เหลี่ยมขนมเปียกปูนคือ เส้นทแยงมุมนอกจากจะตัดกันเป็นมุมฉากแล้ว ยังทำหน้าที่เป็นเส้นแบ่งครึ่งมุม (Angle bisectors) ของมุมยอดทั้งสี่มุมอีกด้วย ซึ่งเป็นสมบัติที่มีประโยชน์มากในการคำนวณหาระยะทางหรือมุมในวิชาตรีโกณมิติ นอกจากนี้ สี่เหลี่ยมจัตุรัสทุกรูปถือว่าเป็นสี่เหลี่ยมขนมเปียกปูนรูปแบบหนึ่ง (เพราะมีด้านเท่ากัน 4 ด้าน) แต่สี่เหลี่ยมขนมเปียกปูนไม่จำเป็นต้องเป็นสี่เหลี่ยมจัตุรัสเสมอไป
          </p>
          <p>
            การทำความเข้าใจรูปทรงเรขาคณิตชนิดนี้ไม่เพียงแต่ช่วยให้สอบผ่านวิชาคณิตศาสตร์เท่านั้น แต่ยังเป็นการฝึกกระบวนการคิดเชิงตรรกะและการมองภาพเรขาคณิตในใจได้อย่างแม่นยำ เครื่องคำนวณที่เราพัฒนาขึ้นนี้ สามารถช่วยให้คุณหาคำตอบได้อย่างรวดเร็วและถูกต้อง ไม่ว่าคุณจะเลือกใช้วิธีการคำนวณแบบใดก็ตาม ทั้งนี้เพื่อลดข้อผิดพลาดที่อาจเกิดขึ้นจากการคำนวณด้วยมือ และประหยัดเวลาในการทำงานจริงได้อย่างดีเยี่ยม
          </p>
        </article>
      )}
    </div>
  );
}

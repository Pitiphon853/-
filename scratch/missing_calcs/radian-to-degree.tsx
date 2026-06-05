"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, Orbit, ArrowRight } from 'lucide-react';

export default function RadianToDegree({ lang }: any) {
  const [radian, setRadian] = useState<string>('');
  const [degree, setDegree] = useState<string | null>(null);

  const calculate = () => {
    let radVal = radian.trim();
    // Allow users to input "pi" or "π" 
    radVal = radVal.toLowerCase().replace('π', 'pi');
    
    let numericValue = 0;
    
    if (radVal.includes('pi')) {
      const multiplier = radVal.replace('pi', '').trim();
      const multVal = multiplier === '' || multiplier === '-' ? parseFloat(multiplier + '1') : parseFloat(multiplier);
      if (isNaN(multVal)) {
        setDegree(lang === 'EN' ? 'Invalid input.' : 'รูปแบบไม่ถูกต้อง');
        return;
      }
      numericValue = multVal * Math.PI;
    } else {
      numericValue = parseFloat(radVal);
    }

    if (isNaN(numericValue)) {
      setDegree(lang === 'EN' ? 'Please enter a valid number or terms with pi (e.g., 2pi).' : 'กรุณากรอกตัวเลข หรือค่าที่มี pi (เช่น 2pi)');
      return;
    }

    const deg = numericValue * (180 / Math.PI);
    // limit decimal places to avoid floating point precision issues for exact pi values
    const roundedDeg = Math.round(deg * 10000000) / 10000000;
    setDegree(roundedDeg.toString());
  };

  const clear = () => {
    setRadian('');
    setDegree(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
              <Orbit className="h-8 w-8" />
              {lang === 'EN' ? 'Radian to Degree Converter' : 'เครื่องมือแปลงเรเดียนเป็นองศา'}
            </h2>
            <p className="text-blue-100 opacity-90">
              {lang === 'EN' ? 'Easily convert angles from radians to degrees.' : 'แปลงค่ามุมจากเรเดียน (Radian) ให้เป็นองศา (Degree) ได้รวดเร็วและแม่นยำ'}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-8 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {lang === 'EN' ? 'Angle in Radians (e.g., 1.5, pi, 2pi)' : 'มุมในหน่วยเรเดียน (เช่น 1.5, pi, 2pi)'}
            </label>
            <input
              type="text"
              value={radian}
              onChange={(e) => setRadian(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && calculate()}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg"
              placeholder="e.g., 3.14159 or pi"
            />
            <p className="text-sm text-gray-500">
              {lang === 'EN' ? 'Tip: You can use "pi" or "π" for exact mathematical inputs.' : 'เคล็ดลับ: คุณสามารถพิมพ์ "pi" หรือ "π" แทนค่าพายได้โดยตรง'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={calculate}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Calculator className="h-5 w-5" />
              {lang === 'EN' ? 'Convert to Degrees' : 'แปลงเป็นองศา'}
            </button>
            <button
              onClick={clear}
              className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-medium text-lg transition-colors"
            >
              {lang === 'EN' ? 'Clear' : 'ล้างค่า'}
            </button>
          </div>

          {degree !== null && (
            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 transition-all text-center">
              <p className="text-sm font-medium text-blue-600 mb-2">
                {lang === 'EN' ? 'Conversion Result' : 'ผลลัพธ์การแปลงค่า'}
              </p>
              {!isNaN(parseFloat(degree)) ? (
                <>
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-gray-800 text-lg sm:text-xl font-medium mb-4">
                    <span>{radian} <span className="text-sm text-gray-500">rad</span></span>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                    <span>{degree}°</span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold text-blue-700">
                    {degree}°
                  </div>
                  <p className="text-blue-800 mt-2">
                    {lang === 'EN' ? 'Degrees' : 'องศา (Degrees)'}
                  </p>
                </>
              ) : (
                <p className="text-red-500 font-medium text-lg">{degree}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <article className="prose prose-blue max-w-none bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          เครื่องมือแปลงมุมจากเรเดียนเป็นองศา (Radian to Degree Converter)
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          ในการศึกษาวิชาคณิตศาสตร์และฟิสิกส์ การวัดขนาดของมุมสามารถทำได้ 2 หน่วยหลักๆ คือ <strong>องศา (Degree)</strong> และ <strong>เรเดียน (Radian)</strong> บ่อยครั้งที่เรามักจะคุ้นเคยกับหน่วยองศามากกว่า เพราะใช้ในชีวิตประจำวัน เช่น มุมฉาก 90 องศา หรือมุมรอบวงกลม 360 องศา แต่ในทางคณิตศาสตร์ระดับสูง หรือในสมการทางฟิสิกส์ หน่วยเรเดียนกลับเป็นหน่วยมาตรฐานที่ถูกใช้งานอย่างกว้างขวาง ดังนั้น <strong>เครื่องมือแปลงเรเดียนเป็นองศา (Radian to Degree Converter)</strong> จึงเป็นตัวช่วยสำคัญที่จะทำให้คุณเข้าใจความสัมพันธ์ของมุมในสองระบบนี้ได้อย่างง่ายดาย
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">เรเดียน (Radian) คืออะไร?</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          <strong>เรเดียน (Radian)</strong> เป็นหน่วยวัดมุมมาตรฐาน (SI unit) ซึ่งนิยามจากอัตราส่วนระหว่างความยาวส่วนโค้งของวงกลม (Arc length) กับรัศมีของวงกลม (Radius) มุมขนาด 1 เรเดียน จะมีขนาดเท่ากับมุมที่จุดศูนย์กลางของวงกลมที่รองรับด้วยความยาวส่วนโค้งที่เท่ากับรัศมีพอดี เนื่องจากเส้นรอบวงของวงกลมมีค่าเท่ากับ 2πr ดังนั้น มุมรอบวงกลมหนึ่งรอบจึงมีขนาดเท่ากับ 2π เรเดียน ซึ่งเทียบเท่ากับ 360 องศาในระบบหน่วยองศานั่นเอง
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">สูตรการแปลงหน่วยเรเดียนเป็นองศา</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          ความสัมพันธ์ระหว่างเรเดียนและองศาเป็นความสัมพันธ์แบบสัดส่วนตรง โดยมีอัตราส่วนหลักคือ π เรเดียน = 180 องศา ดังนั้น หากคุณต้องการแปลงค่าจากเรเดียนไปเป็นองศา คุณสามารถใช้สูตรคณิตศาสตร์ดังนี้:
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
          <p className="font-mono text-lg text-center font-bold text-gray-800">
            องศา (Degree) = เรเดียน (Radian) × (180 / π)
          </p>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">
          <strong>ตัวอย่างการคำนวณ:</strong><br/>
          หากคุณต้องการแปลงค่า π/2 เรเดียน ให้เป็นองศา<br/>
          วิธีคิด: (π/2) × (180 / π) = 180 / 2 = <strong>90 องศา</strong><br/>
          <em>ซึ่งก็คือมุมฉากนั่นเอง เป็นค่าที่เราคุ้นเคยกันดี</em>
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">ตารางเปรียบเทียบมุมมาตรฐาน (เรเดียนและองศา)</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b border-gray-200 text-left font-semibold text-gray-700">มุมในหน่วยเรเดียน (Radian)</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left font-semibold text-gray-700">มุมในหน่วยองศา (Degree)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="py-2 px-4 border-b border-gray-100">π / 6</td><td className="py-2 px-4 border-b border-gray-100">30°</td></tr>
              <tr><td className="py-2 px-4 border-b border-gray-100 bg-gray-50">π / 4</td><td className="py-2 px-4 border-b border-gray-100 bg-gray-50">45°</td></tr>
              <tr><td className="py-2 px-4 border-b border-gray-100">π / 3</td><td className="py-2 px-4 border-b border-gray-100">60°</td></tr>
              <tr><td className="py-2 px-4 border-b border-gray-100 bg-gray-50">π / 2</td><td className="py-2 px-4 border-b border-gray-100 bg-gray-50">90°</td></tr>
              <tr><td className="py-2 px-4 border-b border-gray-100">π</td><td className="py-2 px-4 border-b border-gray-100">180°</td></tr>
              <tr><td className="py-2 px-4 border-b border-gray-100 bg-gray-50">2π</td><td className="py-2 px-4 border-b border-gray-100 bg-gray-50">360°</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">จุดเด่นของเครื่องมือแปลงหน่วยของเรา</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          เครื่องมือนี้ถูกสร้างมาเพื่ออำนวยความสะดวกในการแก้สมการทางตรีโกณมิติ หรือการประมวลผลข้อมูลทางฟิสิกส์ ข้อดีที่ทำให้เครื่องมือของเราเหนือกว่าคือ <strong>ความสามารถในการพิมพ์คำว่า "pi" หรือ "π" ลงไปได้โดยตรง</strong> โดยไม่ต้องมานั่งจำค่า 3.14159... ให้ยุ่งยาก ทำให้สามารถหาค่ามุมได้อย่างแม่นยำ ไม่ว่าคุณจะเป็นนักศึกษาที่ต้องการตรวจสอบคำตอบของการบ้าน หรือวิศวกรที่ต้องการความรวดเร็วในการแปลงค่า เครื่องมือ Radian to Degree Converter เครื่องนี้จะเป็นผู้ช่วยที่ยอดเยี่ยมสำหรับคุณ!
        </p>
      </article>
    </div>
  );
}

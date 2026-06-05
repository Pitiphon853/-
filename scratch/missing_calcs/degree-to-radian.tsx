"use client";

import React, { useState } from 'react';
import { Calculator, Orbit, ArrowRight } from 'lucide-react';

export default function DegreeToRadian({ lang }: any) {
  const [degree, setDegree] = useState<string>('');
  const [radian, setRadian] = useState<string | null>(null);
  const [radianPi, setRadianPi] = useState<string | null>(null);

  const calculate = () => {
    const numericValue = parseFloat(degree);

    if (isNaN(numericValue)) {
      setRadian(lang === 'EN' ? 'Please enter a valid number.' : 'กรุณากรอกตัวเลขที่ถูกต้อง');
      setRadianPi(null);
      return;
    }

    const rad = numericValue * (Math.PI / 180);
    setRadian(rad.toString());

    // Calculate fraction of pi
    const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
    let num = numericValue;
    let den = 180;
    
    // Convert to integers if it's a decimal (basic handling for common simple fractions)
    if (num % 1 !== 0) {
      num = num * 10;
      den = den * 10;
    }

    const divisor = Math.abs(gcd(num, den));
    const finalNum = num / divisor;
    const finalDen = den / divisor;

    if (finalNum === 0) {
      setRadianPi('0');
    } else if (finalNum === 1 && finalDen === 1) {
      setRadianPi('π');
    } else if (finalNum === -1 && finalDen === 1) {
      setRadianPi('-π');
    } else if (finalDen === 1) {
      setRadianPi(`${finalNum}π`);
    } else if (finalNum === 1) {
      setRadianPi(`π/${finalDen}`);
    } else if (finalNum === -1) {
      setRadianPi(`-π/${finalDen}`);
    } else {
      setRadianPi(`${finalNum}π/${finalDen}`);
    }
  };

  const clear = () => {
    setDegree('');
    setRadian(null);
    setRadianPi(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-fuchsia-700 p-6 sm:p-8 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
              <Orbit className="h-8 w-8" />
              {lang === 'EN' ? 'Degree to Radian Converter' : 'เครื่องมือแปลงองศาเป็นเรเดียน'}
            </h2>
            <p className="text-purple-100 opacity-90">
              {lang === 'EN' ? 'Easily convert angles from degrees to radians.' : 'แปลงค่ามุมจากองศา (Degree) ให้เป็นเรเดียน (Radian) ได้รวดเร็วและแม่นยำ'}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-8 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {lang === 'EN' ? 'Angle in Degrees (e.g., 90, 180)' : 'มุมในหน่วยองศา (เช่น 90, 180)'}
            </label>
            <input
              type="number"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && calculate()}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
              placeholder="180"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={calculate}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Calculator className="h-5 w-5" />
              {lang === 'EN' ? 'Convert to Radians' : 'แปลงเป็นเรเดียน'}
            </button>
            <button
              onClick={clear}
              className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-medium text-lg transition-colors"
            >
              {lang === 'EN' ? 'Clear' : 'ล้างค่า'}
            </button>
          </div>

          {radian !== null && (
            <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200 transition-all text-center">
              <p className="text-sm font-medium text-purple-600 mb-2">
                {lang === 'EN' ? 'Conversion Result' : 'ผลลัพธ์การแปลงค่า'}
              </p>
              {!isNaN(parseFloat(radian)) ? (
                <>
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-gray-800 text-lg sm:text-xl font-medium mb-4">
                    <span>{degree}°</span>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                    <span>{radianPi} <span className="text-sm text-gray-500">rad</span></span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold text-purple-700 mb-4">
                    {radianPi}
                  </div>
                  <div className="bg-white/60 p-4 rounded-lg inline-block border border-purple-100">
                    <p className="text-purple-800 font-medium">
                      {lang === 'EN' ? 'Decimal Value:' : 'ค่าแบบทศนิยม:'} 
                    </p>
                    <p className="text-2xl text-purple-900 font-semibold">{parseFloat(radian).toFixed(6)}</p>
                  </div>
                </>
              ) : (
                <p className="text-red-500 font-medium text-lg">{radian}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <article className="prose prose-purple max-w-none bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          เครื่องมือแปลงมุมจากองศาเป็นเรเดียน (Degree to Radian Converter)
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          แม้ว่าในชีวิตประจำวันเราจะคุ้นเคยกับหน่วย <strong>องศา (Degree)</strong> เป็นอย่างมาก ไม่ว่าจะเป็นมุมของโต๊ะ 90 องศา หรือการกลับตัว 180 องศา แต่เมื่อก้าวเข้าสู่การเรียนคณิตศาสตร์ระดับสูง ฟิสิกส์ หรือวิศวกรรมศาสตร์ หน่วยองศากลับไม่ตอบโจทย์ในการคำนวณที่ซับซ้อน หน่วยมาตรฐานที่ถูกนำมาใช้แทนคือ <strong>เรเดียน (Radian)</strong> ดังนั้น <strong>เครื่องมือแปลงองศาเป็นเรเดียน (Degree to Radian Converter)</strong> จึงเป็นสิ่งจำเป็นพื้นฐานสำหรับนักเรียน นักศึกษา และนักวิจัยในการทำความเข้าใจและแก้สมการต่างๆ
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">ทำไมต้องแปลงองศาเป็นเรเดียน?</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          เหตุผลหลักที่ต้องใช้เรเดียนในวิชาคณิตศาสตร์ชั้นสูง เช่น แคลคูลัส (Calculus) คือ เรเดียนเป็นตัวเลขที่เป็น "จำนวนจริง" ไม่มีมิติ (Dimensionless) ซึ่งทำให้การหาอนุพันธ์ (Derivative) และปริพันธ์ (Integral) ของฟังก์ชันตรีโกณมิติ เช่น sin(x), cos(x) มีรูปแบบที่เรียบง่ายและเป็นธรรมชาติ หากเราใช้หน่วยองศาในแคลคูลัส สูตรต่างๆ จะมีค่าคงที่ (π/180) โผล่ออกมาให้ยุ่งยากเสมอ ด้วยเหตุนี้ การแปลงองศาให้เป็นเรเดียนจึงเป็นก้าวแรกที่สำคัญของการเรียนคณิตศาสตร์ขั้นสูง
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">สูตรการแปลงหน่วยองศาเป็นเรเดียน</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          เช่นเดียวกับการแปลงกลับ ความสัมพันธ์ของทั้งสองหน่วยนี้มีอัตราส่วนตายตัว โดย 180 องศา จะมีค่าเท่ากับ π เรเดียน ดังนั้น สูตรการแปลงค่าจึงง่ายมาก:
        </p>
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6 rounded-r-lg">
          <p className="font-mono text-lg text-center font-bold text-gray-800">
            เรเดียน (Radian) = องศา (Degree) × (π / 180)
          </p>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">
          <strong>ตัวอย่างการคำนวณ:</strong><br/>
          หากคุณต้องการแปลงค่ามุม 60 องศา ให้เป็นเรเดียน<br/>
          วิธีคิด: 60 × (π / 180) = π / 3<br/>
          <em>ดังนั้น มุม 60 องศา มีค่าเท่ากับ π/3 เรเดียน</em>
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">ตารางเปรียบเทียบมุมมาตรฐาน (องศาและเรเดียน)</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b border-gray-200 text-left font-semibold text-gray-700">มุมในหน่วยองศา (Degree)</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left font-semibold text-gray-700">มุมในหน่วยเรเดียน (Radian)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="py-2 px-4 border-b border-gray-100">30°</td><td className="py-2 px-4 border-b border-gray-100">π / 6</td></tr>
              <tr><td className="py-2 px-4 border-b border-gray-100 bg-gray-50">45°</td><td className="py-2 px-4 border-b border-gray-100 bg-gray-50">π / 4</td></tr>
              <tr><td className="py-2 px-4 border-b border-gray-100">60°</td><td className="py-2 px-4 border-b border-gray-100">π / 3</td></tr>
              <tr><td className="py-2 px-4 border-b border-gray-100 bg-gray-50">90°</td><td className="py-2 px-4 border-b border-gray-100 bg-gray-50">π / 2</td></tr>
              <tr><td className="py-2 px-4 border-b border-gray-100">180°</td><td className="py-2 px-4 border-b border-gray-100">π</td></tr>
              <tr><td className="py-2 px-4 border-b border-gray-100 bg-gray-50">360°</td><td className="py-2 px-4 border-b border-gray-100 bg-gray-50">2π</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">ฟีเจอร์เด่นของเครื่องมือ Degree to Radian Converter</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          เพื่อตอบโจทย์ผู้ใช้งานทางคณิตศาสตร์อย่างแท้จริง เครื่องมือของเราไม่ได้แค่คำนวณและแสดงผลออกมาเป็นตัวเลขทศนิยม (เช่น 3.1415...) เท่านั้น แต่ยังมีความสามารถในการ <strong>แปลงผลลัพธ์ให้อยู่ในรูปของเศษส่วนของ π (Fraction of Pi)</strong> อย่างเช่น π/2, 2π/3 ได้โดยอัตโนมัติ! ฟีเจอร์นี้ช่วยให้ผู้เรียนและครูผู้สอนสามารถนำผลลัพธ์ไปใช้งานต่อในสมการตรีโกณมิติได้อย่างไร้รอยต่อ และยังลดความผิดพลาดจากการปัดเศษทศนิยมอีกด้วย
        </p>
      </article>
    </div>
  );
}

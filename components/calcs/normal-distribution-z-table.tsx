"use client";

import React, { useState } from 'react';
import { Calculator, Info, LineChart } from 'lucide-react';

export default function NormalDistributionZTable({ lang }: any) {
  const isTH = lang === 'th' || lang === 'TH';
  
  const [zScore, setZScore] = useState<string>('');
  const [areaLeft, setAreaLeft] = useState<number | null>(null);
  const [areaRight, setAreaRight] = useState<number | null>(null);
  const [areaBetween, setAreaBetween] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  // Error function approximation
  const erf = (x: number): number => {
    const sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  };

  const normalCDF = (z: number): number => {
    return 0.5 * (1 + erf(z / Math.SQRT2));
  };

  const calculate = () => {
    setError('');
    setAreaLeft(null);
    setAreaRight(null);
    setAreaBetween(null);

    const z = parseFloat(zScore);

    if (isNaN(z)) {
      setError(isTH ? 'กรุณาระบุค่า Z-Score ที่ถูกต้อง' : 'Please enter a valid Z-Score');
      return;
    }

    const left = normalCDF(z);
    const right = 1 - left;
    const between = (z >= 0) ? left - 0.5 : 0.5 - left;

    setAreaLeft(left);
    setAreaRight(right);
    setAreaBetween(Math.abs(between));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
          <LineChart size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isTH ? 'ตารางพื้นที่ใต้เส้นโค้งปกติ (Z-Table)' : 'Normal Distribution Z-Table'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isTH ? 'คำนวณหาพื้นที่ใต้เส้นโค้งการแจกแจงแบบปกติ' : 'Calculate the area under the normal distribution curve'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? 'ค่า Z-Score (คะแนนมาตรฐาน)' : 'Z-Score'}
            </label>
            <input
              type="number"
              value={zScore}
              onChange={(e) => setZScore(e.target.value)}
              placeholder="e.g. 1.96"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              step="0.01"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={calculate}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors mt-2"
          >
            <Calculator size={20} />
            <span>{isTH ? 'คำนวณพื้นที่' : 'Calculate Area'}</span>
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Info size={20} className="mr-2 text-blue-500" />
            {isTH ? 'ผลลัพธ์พื้นที่ใต้เส้นโค้ง' : 'Area Results'}
          </h3>
          
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">
                {isTH ? 'พื้นที่ทางซ้ายของ Z (P(X < Z))' : 'Area to the left (P(X < Z))'}
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {areaLeft !== null ? areaLeft.toFixed(4) : '-'}
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">
                {isTH ? 'พื้นที่ทางขวาของ Z (P(X > Z))' : 'Area to the right (P(X > Z))'}
              </p>
              <p className="text-xl font-bold text-gray-700">
                {areaRight !== null ? areaRight.toFixed(4) : '-'}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">
                {isTH ? 'พื้นที่ระหว่าง 0 ถึง Z' : 'Area between 0 and Z'}
              </p>
              <p className="text-xl font-bold text-gray-700">
                {areaBetween !== null ? areaBetween.toFixed(4) : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-12 pt-8 border-t border-gray-200 prose prose-blue max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          การแจกแจงแบบปกติ (Normal Distribution) และตาราง Z (Z-Table)
        </h2>
        
        <p>
          ในการศึกษาวิชาสถิติ <strong>การแจกแจงแบบปกติ (Normal Distribution)</strong> ถือเป็นการแจกแจงความน่าจะเป็นที่สำคัญที่สุด และถูกนำมาใช้มากที่สุดในทางปฏิบัติ กราฟของการแจกแจงปกติจะมีลักษณะคล้าย "รูประฆังคว่ำ" (Bell-shaped curve) ที่มีความสมมาตร โดยจุดกึ่งกลางที่สูงที่สุดของกราฟคือค่าเฉลี่ย (Mean) มัธยฐาน (Median) และฐานนิยม (Mode) ซึ่งทั้งสามค่าจะตกอยู่ที่จุดเดียวกันพอดี ข้อมูลในธรรมชาติและสังคมศาสตร์ส่วนใหญ่ เช่น ส่วนสูงของคน น้ำหนัก คะแนนสอบ มักจะมีการกระจายตัวแบบนี้
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เส้นโค้งปกติมาตรฐาน (Standard Normal Curve)</h3>
        <p>
          เนื่องจากข้อมูลแต่ละชุดมีค่าเฉลี่ย (μ) และส่วนเบี่ยงเบนมาตรฐาน (σ) ที่แตกต่างกัน การจะเปรียบเทียบข้อมูลคนละชุดจึงเป็นไปได้ยาก นักสถิติจึงได้สร้าง <strong>การแจกแจงปกติมาตรฐาน (Standard Normal Distribution)</strong> ขึ้นมา โดยการแปลงข้อมูลดิบ (X) ให้กลายเป็น <strong>คะแนนมาตรฐาน (Z-score)</strong> เพื่อให้ค่าเฉลี่ยกลายเป็น 0 และส่วนเบี่ยงเบนมาตรฐานกลายเป็น 1 ซึ่งสามารถแปลงได้โดยใช้สูตร:
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center text-lg">
          Z = (X - μ) / σ
        </div>
        
        <p>
          โดยที่:<br/>
          <strong>Z</strong> = คะแนนมาตรฐาน (Z-Score)<br/>
          <strong>X</strong> = ค่าของข้อมูลที่เราสนใจ<br/>
          <strong>μ (มิว)</strong> = ค่าเฉลี่ยของประชากร<br/>
          <strong>σ (ซิกมา)</strong> = ส่วนเบี่ยงเบนมาตรฐานของประชากร
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">พื้นที่ใต้เส้นโค้งคืออะไร?</h3>
        <p>
          ตามหลักการทางสถิติ พื้นที่ใต้เส้นโค้งปกติทั้งหมดจะมีค่าเท่ากับ 1.0 (หรือ 100%) พื้นที่ในแต่ละส่วนที่ถูกแบ่งโดยค่า Z จะบอกถึง <strong>"ความน่าจะเป็น (Probability)"</strong> หรือสัดส่วนของข้อมูลที่ตกอยู่ในช่วงนั้นๆ 
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>กฎ Empirical (กฎ 68-95-99.7):</strong> เป็นกฎที่ช่วยให้เราประมาณการได้ว่า ข้อมูลประมาณ 68% จะตกอยู่ในช่วง Z = -1 ถึง 1, ข้อมูลประมาณ 95% จะตกอยู่ในช่วง Z = -2 ถึง 2, และข้อมูล 99.7% จะตกอยู่ในช่วง Z = -3 ถึง 3</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การใช้งานเครื่องมือ Z-Table</h3>
        <p>
          ในอดีต การจะหาพื้นที่ใต้เส้นโค้งหรือความน่าจะเป็นจากค่า Z จะต้องเปิดหาจากตารางกระดาษที่เรียกว่า "ตาราง Z (Z-Table)" ซึ่งมีความยุ่งยากในการอ่านค่าทศนิยม แต่เครื่องมือคำนวณของเราจะช่วยให้คุณได้ผลลัพธ์ที่แม่นยำรวดเร็ว เพียงแค่กรอกค่า Z-Score ลงไป โปรแกรมจะคำนวณและแสดงผลลัพธ์ให้คุณถึง 3 รูปแบบ:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mb-6">
          <li><strong>พื้นที่ทางซ้าย P(X &lt; Z):</strong> คือความน่าจะเป็นที่ข้อมูลจะมีค่าน้อยกว่า Z (Cumulative Probability)</li>
          <li><strong>พื้นที่ทางขวา P(X &gt; Z):</strong> คือความน่าจะเป็นที่ข้อมูลจะมีค่ามากกว่า Z (คำนวณจาก 1 - พื้นที่ทางซ้าย)</li>
          <li><strong>พื้นที่ระหว่าง 0 ถึง Z:</strong> คือสัดส่วนของข้อมูลที่อยู่ระหว่างค่าเฉลี่ย (Z=0) กับจุด Z ที่กำหนด</li>
        </ol>
        
        <p>
          <strong>ตัวอย่างการนำไปใช้:</strong> หากคะแนนสอบของนักเรียนห้องหนึ่งมีการแจกแจงแบบปกติ มีค่าเฉลี่ย 60 คะแนน ส่วนเบี่ยงเบนมาตรฐาน 10 คะแนน ถ้านักเรียนคนหนึ่งสอบได้ 75 คะแนน จะมีค่า Z = (75 - 60) / 10 = 1.50 เมื่อนำค่า Z=1.50 มากรอกในเครื่องมือ จะได้พื้นที่ทางซ้ายเท่ากับ 0.9332 หมายความว่านักเรียนคนนี้สอบได้คะแนนสูงกว่า 93.32% ของนักเรียนทั้งห้อง (Percentile ที่ 93) นั่นเอง
        </p>
      </article>
    </div>
  );
}

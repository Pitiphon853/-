"use client";

import React, { useState } from 'react';
import { Triangle, Calculator, Info } from 'lucide-react';

export default function EquilateralTriangleHeight({ lang }: any) {
  const isTH = lang === 'th' || lang === 'TH';
  const [side, setSide] = useState<string>('');
  const [height, setHeight] = useState<number | null>(null);
  const [area, setArea] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    setHeight(null);
    setArea(null);

    const s = parseFloat(side);

    if (isNaN(s) || s <= 0) {
      setError(isTH ? 'กรุณากรอกความยาวด้านที่มากกว่า 0' : 'Please enter a side length greater than 0');
      return;
    }

    const h = (Math.sqrt(3) / 2) * s;
    const a = (Math.sqrt(3) / 4) * s * s;

    setHeight(h);
    setArea(a);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
          <Triangle size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isTH ? 'คำนวณส่วนสูงสามเหลี่ยมด้านเท่า' : 'Equilateral Triangle Height Calculator'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isTH ? 'หาความสูงและพื้นที่ของรูปสามเหลี่ยมด้านเท่า' : 'Calculate height and area of an equilateral triangle'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isTH ? 'ความยาวด้าน (a)' : 'Side Length (a)'}
            </label>
            <div className="relative">
              <input
                type="number"
                value={side}
                onChange={(e) => setSide(e.target.value)}
                placeholder={isTH ? 'ระบุความยาวด้าน...' : 'Enter side length...'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                min="0"
                step="any"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <button
            onClick={calculate}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            <Calculator size={20} />
            <span>{isTH ? 'คำนวณ' : 'Calculate'}</span>
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Info size={20} className="mr-2 text-blue-500" />
            {isTH ? 'ผลลัพธ์' : 'Results'}
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">{isTH ? 'ส่วนสูง (h)' : 'Height (h)'}</p>
              <p className="text-3xl font-bold text-blue-600">
                {height !== null ? height.toFixed(4) : '-'}
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">{isTH ? 'พื้นที่ (Area)' : 'Area'}</p>
              <p className="text-2xl font-bold text-green-600">
                {area !== null ? area.toFixed(4) : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-12 pt-8 border-t border-gray-200 prose prose-blue max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          การคำนวณหาส่วนสูงของรูปสามเหลี่ยมด้านเท่า (Equilateral Triangle Height)
        </h2>
        
        <p>
          รูปสามเหลี่ยมด้านเท่า (Equilateral Triangle) เป็นหนึ่งในรูปเรขาคณิตพื้นฐานที่มีลักษณะพิเศษคือ ด้านทั้งสามมีความยาวเท่ากันทั้งหมด 
          และมุมภายในทั้งสามมุมมีขนาดเท่ากันคือ 60 องศา ด้วยคุณสมบัติที่สมมาตรอย่างสมบูรณ์แบบนี้ ทำให้การคำนวณหาค่าต่างๆ 
          เช่น ส่วนสูง พื้นที่ หรือเส้นรอบรูป สามารถทำได้อย่างง่ายดายโดยอาศัยเพียงความยาวของด้านเพียงด้านเดียวเท่านั้น
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการหาความสูงของสามเหลี่ยมด้านเท่า</h3>
        <p>
          เมื่อเราลากเส้นส่วนสูงจากมุมใดมุมหนึ่งไปยังด้านตรงข้าม เส้นส่วนสูงนี้จะแบ่งครึ่งด้านตรงข้ามและตั้งฉากกับด้านนั้น 
          ทำให้เกิดรูปสามเหลี่ยมมุมฉากสองรูปที่เท่ากันทุกประการ ซึ่งเราสามารถใช้ทฤษฎีบทพีทาโกรัส (Pythagorean Theorem) 
          ในการพิสูจน์หาสูตรส่วนสูงได้ ดังนี้:
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center text-lg">
          h = (√3 / 2) × a
        </div>
        
        <p>
          โดยที่:<br/>
          <strong>h</strong> = ความยาวของส่วนสูง (Height)<br/>
          <strong>a</strong> = ความยาวของด้าน (Side Length)<br/>
          <strong>√3 / 2</strong> ≈ 0.866025
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การหาพื้นที่ของสามเหลี่ยมด้านเท่า</h3>
        <p>
          จากสูตรพื้นฐานของการหาพื้นที่รูปสามเหลี่ยมทั่วไปคือ <code>Area = (1/2) × ฐาน × สูง</code> เมื่อเรานำสูตรความสูง 
          <code>h = (√3 / 2) × a</code> และให้ฐานมีความยาวเท่ากับ <code>a</code> มาแทนค่า จะได้สูตรสำเร็จรูปสำหรับหาพื้นที่ของรูปสามเหลี่ยมด้านเท่าดังนี้:
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center text-lg">
          Area = (√3 / 4) × a²
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการคำนวณ</h3>
        <p>
          สมมติว่าเรามีรูปสามเหลี่ยมด้านเท่าที่มีความยาวด้าน 10 เซนติเมตร (a = 10)<br/>
          <strong>หาความสูง:</strong><br/>
          h = (√3 / 2) × 10<br/>
          h ≈ 0.866 × 10 = 8.66 เซนติเมตร<br/>
          <br/>
          <strong>หาพื้นที่:</strong><br/>
          Area = (√3 / 4) × 10²<br/>
          Area = (√3 / 4) × 100<br/>
          Area ≈ 0.433 × 100 = 43.3 ตารางเซนติเมตร
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์และการประยุกต์ใช้งาน</h3>
        <p>
          การคำนวณหาส่วนสูงและพื้นที่ของสามเหลี่ยมด้านเท่ามีความสำคัญอย่างยิ่งในหลายสาขาวิชา ทั้งในด้านวิศวกรรมศาสตร์ 
          สถาปัตยกรรม การออกแบบโครงสร้าง ไปจนถึงการคำนวณทางฟิสิกส์ โครงสร้างรูปสามเหลี่ยมด้านเท่ามักถูกนำมาใช้ในงานที่ต้องการความแข็งแรง
          และความสมดุล เช่น โครงถักสะพาน (Truss) หอคอยส่งสัญญาณ หรือแม้กระทั่งการออกแบบลวดลายกราฟิก การเข้าใจและจดจำสูตรเหล่านี้ได้ 
          จะช่วยให้การทำงานด้านการคำนวณรวดเร็วและแม่นยำมากยิ่งขึ้น โดยไม่ต้องเสียเวลาวาดรูปหรือใช้เครื่องมือวัดความยาวจริง
        </p>
        <p>
          เครื่องมือคำนวณส่วนสูงสามเหลี่ยมด้านเท่าออนไลน์นี้ ถูกออกแบบมาเพื่ออำนวยความสะดวกให้กับนักเรียน นักศึกษา 
          ช่างเทคนิค และผู้ที่สนใจทั่วไป เพียงแค่ระบุความยาวด้าน ระบบจะทำการคำนวณทั้งความสูงและพื้นที่ออกมาให้ทันทีอย่างแม่นยำ
          ลดข้อผิดพลาดจากการกดเครื่องคิดเลขด้วยตนเอง
        </p>
      </article>
    </div>
  );
}

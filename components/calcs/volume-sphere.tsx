'use client'

import React, { useState } from 'react';
import { Calculator, Circle, RefreshCw, BookOpen, PenTool } from 'lucide-react';

export default function VolumeSphere({ lang }: any) {
  const [radius, setRadius] = useState<string>('');
  const [volume, setVolume] = useState<number | null>(null);

  const calculateVolume = () => {
    const r = parseFloat(radius);
    if (!isNaN(r) && r > 0) {
      const v = (4 / 3) * Math.PI * Math.pow(r, 3);
      setVolume(v);
    } else {
      setVolume(null);
    }
  };

  const clearValues = () => {
    setRadius('');
    setVolume(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-xl space-y-8">
      {/* Calculator Section */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <Circle className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            {lang === 'EN' ? 'Sphere Volume Calculator' : 'เครื่องมือคำนวณหาปริมาตรทรงกลม'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Radius (r)' : 'รัศมี (r)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  placeholder={lang === 'EN' ? 'Enter radius' : 'ระบุรัศมี'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={calculateVolume}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                {lang === 'EN' ? 'Calculate' : 'คำนวณ'}
              </button>
              <button
                onClick={clearValues}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                {lang === 'EN' ? 'Clear' : 'ล้างค่า'}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {lang === 'EN' ? 'Result (Volume)' : 'ผลลัพธ์ (ปริมาตร)'}
            </h3>
            {volume !== null ? (
              <div>
                <p className="text-4xl font-bold text-blue-600 truncate">
                  {volume.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </p>
                <p className="text-gray-500 mt-2 text-sm">
                  {lang === 'EN' ? 'Cubic units' : 'ลูกบาศก์หน่วย'}
                </p>
              </div>
            ) : (
              <p className="text-gray-400 italic">
                {lang === 'EN' ? 'Enter radius and click calculate' : 'กรุณาระบุรัศมีแล้วกดคำนวณ'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose max-w-none text-gray-700 space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800 m-0">ความรู้เบื้องต้นเกี่ยวกับการคำนวณปริมาตรทรงกลม</h2>
        </div>

        <p>
          ทรงกลม (Sphere) เป็นรูปทรงเรขาคณิตสามมิติที่มีความสมมาตรอย่างสมบูรณ์แบบ
          โดยทุกจุดบนพื้นผิวของทรงกลมจะมีระยะห่างจากจุดศูนย์กลางเท่ากันเสมอ
          ระยะห่างที่ว่านี้คือ &quot;รัศมี&quot; (Radius) ของทรงกลม
          ในชีวิตประจำวันเราสามารถพบเห็นวัตถุที่มีลักษณะเป็นทรงกลมได้ทั่วไป เช่น ลูกฟุตบอล ลูกบาสเกตบอล ลูกโลก หรือแม้กระทั่งดวงดาวต่างๆ ในอวกาศ
          การหาปริมาตรของทรงกลมมีความสำคัญอย่างมากในหลายสาขาวิชา ทั้งคณิตศาสตร์ ฟิสิกส์ วิศวกรรมศาสตร์ และการออกแบบผลิตภัณฑ์
        </p>

        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <PenTool className="w-5 h-5 text-blue-500" />
          สูตรการหาปริมาตรทรงกลม
        </h3>

        <p>
          การคำนวณหาปริมาตรของทรงกลมสามารถทำได้โดยใช้สูตรทางคณิตศาสตร์ที่เป็นมาตรฐานสากล ซึ่งค้นพบโดยอาร์คิมิดีส (Archimedes) นักคณิตศาสตร์ชาวกรีกโบราณ
          สูตรนี้มีความสัมพันธ์โดยตรงกับรัศมีของทรงกลม ดังนี้:
        </p>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center text-xl font-semibold text-blue-700 my-6">
          V = (4/3) × π × r³
        </div>

        <p>โดยที่ตัวแปรแต่ละตัวมีความหมายดังต่อไปนี้:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>V (Volume)</strong> หมายถึง ปริมาตรของทรงกลม มีหน่วยเป็นลูกบาศก์ (เช่น ลูกบาศก์เซนติเมตร, ลูกบาศก์เมตร)</li>
          <li><strong>π (Pi)</strong> คือ ค่าคงที่ทางคณิตศาสตร์ มีค่าประมาณ 3.14159 หรือ 22/7</li>
          <li><strong>r (Radius)</strong> คือ รัศมีของทรงกลม (ระยะทางจากจุดศูนย์กลางไปยังพื้นผิวของทรงกลม)</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800">ความสำคัญและการประยุกต์ใช้ในชีวิตจริง</h3>
        <p>
          การทราบวิธีคำนวณปริมาตรทรงกลมไม่ได้จำกัดอยู่แค่ในห้องเรียนเท่านั้น แต่ยังมีการนำไปประยุกต์ใช้ในชีวิตประจำวันและอุตสาหกรรมต่างๆ มากมาย
          ยกตัวอย่างเช่น ในอุตสาหกรรมการผลิตลูกบอลหรือลูกเปตอง วิศวกรจำเป็นต้องคำนวณปริมาตรเพื่อประเมินปริมาณวัสดุที่ต้องใช้และน้ำหนักของผลิตภัณฑ์
          ในด้านการแพทย์และเภสัชกรรม การคำนวณปริมาตรของเซลล์หรือยาที่เป็นรูปทรงกลมมีความจำเป็นอย่างยิ่งสำหรับการวิจัยและการรักษาโรค
          นอกจากนี้ ในวงการดาราศาสตร์ การหาปริมาตรของดาวเคราะห์ก็อาศัยหลักการและสูตรเดียวกันนี้
        </p>

        <p>
          ด้วยโปรแกรมคำนวณหาปริมาตรทรงกลมออนไลน์ของเรา ผู้ใช้สามารถหาผลลัพธ์ได้อย่างรวดเร็วและแม่นยำ เพียงแค่ระบุค่ารัศมี ระบบจะทำการคำนวณปริมาตรให้ทันที 
          ช่วยประหยัดเวลาและลดโอกาสผิดพลาดจากการคำนวณด้วยมือ เครื่องมือนี้ออกแบบมาให้ใช้งานง่าย รองรับทั้งบนคอมพิวเตอร์และโทรศัพท์มือถือ เหมาะสำหรับนักเรียน นักศึกษา 
          หรือผู้ที่ทำงานในสายวิชาชีพที่ต้องเกี่ยวข้องกับการคำนวณเชิงเรขาคณิต 
        </p>
      </article>
    </div>
  );
}

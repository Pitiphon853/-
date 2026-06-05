'use client'

import React, { useState } from 'react';
import { Calculator, Triangle, RefreshCw, BookOpen, PenTool } from 'lucide-react';

export default function VolumePyramid({ lang }: any) {
  const [baseWidth, setBaseWidth] = useState<string>('');
  const [baseLength, setBaseLength] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [volume, setVolume] = useState<number | null>(null);

  const calculateVolume = () => {
    const w = parseFloat(baseWidth);
    const l = parseFloat(baseLength);
    const h = parseFloat(height);
    if (!isNaN(w) && w > 0 && !isNaN(l) && l > 0 && !isNaN(h) && h > 0) {
      const v = (1 / 3) * (w * l) * h;
      setVolume(v);
    } else {
      setVolume(null);
    }
  };

  const clearValues = () => {
    setBaseWidth('');
    setBaseLength('');
    setHeight('');
    setVolume(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-xl space-y-8">
      {/* Calculator Section */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <Triangle className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            {lang === 'EN' ? 'Rectangular Pyramid Volume Calculator' : 'เครื่องมือคำนวณหาปริมาตรพีระมิดฐานสี่เหลี่ยม'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Base Width (w)' : 'ความกว้างฐาน (w)'}
              </label>
              <input
                type="number"
                value={baseWidth}
                onChange={(e) => setBaseWidth(e.target.value)}
                placeholder={lang === 'EN' ? 'Enter width' : 'ระบุความกว้าง'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Base Length (l)' : 'ความยาวฐาน (l)'}
              </label>
              <input
                type="number"
                value={baseLength}
                onChange={(e) => setBaseLength(e.target.value)}
                placeholder={lang === 'EN' ? 'Enter length' : 'ระบุความยาว'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Height (h)' : 'ความสูงตรง (h)'}
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={lang === 'EN' ? 'Enter height' : 'ระบุความสูง'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex gap-4 pt-2">
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

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center h-full min-h-[250px]">
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
                {lang === 'EN' ? 'Enter base width, length and height to calculate' : 'กรุณาระบุความกว้าง ความยาว และความสูงตรง แล้วกดคำนวณ'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose max-w-none text-gray-700 space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800 m-0">ความรู้เกี่ยวกับการหาปริมาตรพีระมิดฐานสี่เหลี่ยม</h2>
        </div>

        <p>
          พีระมิด (Pyramid) เป็นรูปทรงเรขาคณิตสามมิติที่โดดเด่นและเป็นที่รู้จักกันดี โดยเฉพาะเมื่อเรานึกถึงสถาปัตยกรรมระดับโลกอย่างพีระมิดแห่งอียิปต์ 
          ลักษณะเฉพาะของพีระมิดคือการมี "ฐาน" เป็นรูปหลายเหลี่ยม และมีผิวข้างเป็นรูปสามเหลี่ยมที่ไปบรรจบกันที่จุดยอด (Apex) เพียงจุดเดียว 
          สำหรับพีระมิดที่เราพบเห็นกันบ่อยที่สุดคือ <strong>พีระมิดฐานสี่เหลี่ยม</strong> (Rectangular / Square Pyramid) 
          ซึ่งฐานอาจเป็นรูปสี่เหลี่ยมจัตุรัสหรือสี่เหลี่ยมผืนผ้าก็ได้
        </p>

        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <PenTool className="w-5 h-5 text-blue-500" />
          สูตรการหาปริมาตรพีระมิดฐานสี่เหลี่ยม
        </h3>

        <p>
          หลักการในการหาปริมาตรของพีระมิดทุกชนิด จะมีความคล้ายคลึงกับทรงกรวย นั่นคือ ปริมาตรของพีระมิดจะมีค่าเท่ากับ "หนึ่งในสาม" 
          ของปริมาตรรูปทรงปริซึมที่มีพื้นที่ฐานและความสูงเท่ากัน ดังนั้น สูตรในการคำนวณปริมาตรพีระมิดฐานสี่เหลี่ยมจึงเขียนได้ดังนี้:
        </p>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center text-xl font-semibold text-blue-700 my-6">
          V = (1/3) × พื้นที่ฐาน × ความสูงตรง<br />
          หรือ V = (1/3) × (กว้าง × ยาว) × ความสูงตรง
        </div>

        <p>อธิบายตัวแปรในสมการ:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>V (Volume)</strong> คือ ปริมาตรของพีระมิด (มีหน่วยเป็นลูกบาศก์)</li>
          <li><strong>พื้นที่ฐาน (Base Area)</strong> คือ ผลคูณของความกว้างและความยาวของฐานสี่เหลี่ยม (กว้าง × ยาว)</li>
          <li><strong>ความสูงตรง (Height)</strong> คือ ระยะทางที่ลากเป็นเส้นตรงและตั้งฉากจากจุดยอดของพีระมิดลงมายังจุดศูนย์กลางของฐานสี่เหลี่ยม</li>
        </ul>
        <p className="text-sm text-red-600">
          <em>ข้อควรระวัง: เช่นเดียวกับทรงกรวย ในการหาปริมาตรจะต้องใช้ "ความสูงตรง" เท่านั้น ห้ามใช้ความสูงเอียง (Slant height) หรือความยาวของสันพีระมิดมาคำนวณ</em>
        </p>

        <h3 className="text-xl font-bold text-gray-800">การนำสูตรไปใช้ในสถานการณ์จริง</h3>
        <p>
          แม้ว่าในชีวิตประจำวันเราอาจไม่ได้สร้างพีระมิดขนาดใหญ่บ่อยนัก แต่รูปทรงพีระมิดฐานสี่เหลี่ยมถูกนำมาใช้ในงานออกแบบสถาปัตยกรรมยุคใหม่หลายแห่ง 
          เช่น หลังคาทรงปั้นหยา เต็นท์พักแรม และบรรจุภัณฑ์สินค้าบางประเภท การคำนวณปริมาตรจึงมีความสำคัญในการหาความจุกระจายแสง 
          ความสามารถในการบรรจุสิ่งของ หรือการคำนวณโหลดการรับน้ำหนักของโครงสร้าง
        </p>

        <p>
          โปรแกรมคำนวณหาปริมาตรพีระมิดฐานสี่เหลี่ยมของเรา ได้รับการพัฒนาให้ใช้งานง่ายและสะดวกรวดเร็วที่สุด 
          คุณเพียงแค่ต้องทราบขนาดความกว้างและความยาวของฐาน พร้อมกับความสูงตรงของพีระมิด 
          นำตัวเลขเหล่านั้นมากรอกลงในช่อง เครื่องมือจะประมวลผลคำนวณผ่านสูตร (1/3) × กว้าง × ยาว × สูง 
          และแสดงผลลัพธ์ปริมาตรที่แม่นยำออกมาให้คุณนำไปใช้งานต่อได้อย่างมั่นใจ ลดความยุ่งยากและเวลาในการกดเครื่องคิดเลขลงได้เป็นอย่างมาก
        </p>
      </article>
    </div>
  );
}

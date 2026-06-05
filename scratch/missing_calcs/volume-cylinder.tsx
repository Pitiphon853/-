'use client'

import React, { useState } from 'react';
import { Calculator, Cylinder, RefreshCw, BookOpen, PenTool } from 'lucide-react';

export default function VolumeCylinder({ lang }: any) {
  const [radius, setRadius] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [volume, setVolume] = useState<number | null>(null);

  const calculateVolume = () => {
    const r = parseFloat(radius);
    const h = parseFloat(height);
    if (!isNaN(r) && r > 0 && !isNaN(h) && h > 0) {
      const v = Math.PI * Math.pow(r, 2) * h;
      setVolume(v);
    } else {
      setVolume(null);
    }
  };

  const clearValues = () => {
    setRadius('');
    setHeight('');
    setVolume(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-xl space-y-8">
      {/* Calculator Section */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <Cylinder className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            {lang === 'EN' ? 'Cylinder Volume Calculator' : 'เครื่องมือคำนวณหาปริมาตรทรงกระบอก'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Radius (r)' : 'รัศมีฐาน (r)'}
              </label>
              <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                placeholder={lang === 'EN' ? 'Enter radius' : 'ระบุรัศมีฐาน'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Height (h)' : 'ความสูง (h)'}
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
                {lang === 'EN' ? 'Enter radius and height to calculate' : 'กรุณาระบุรัศมีและความสูงแล้วกดคำนวณ'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose max-w-none text-gray-700 space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800 m-0">ความรู้เกี่ยวกับการคำนวณหาปริมาตรทรงกระบอก</h2>
        </div>

        <p>
          ทรงกระบอก (Cylinder) เป็นรูปทรงเรขาคณิตสามมิติที่มีฐานสองข้างเป็นรูปวงกลมที่ขนานกันและมีขนาดเท่ากัน 
          โดยมีผิวข้างที่โค้งเรียบเชื่อมระหว่างฐานทั้งสอง ตัวอย่างของวัตถุที่เป็นทรงกระบอกในชีวิตประจำวัน ได้แก่ แก้วน้ำ ท่อประปา กระป๋องน้ำอัดลม 
          เสาอาคารทรงกลม หรือถังเก็บน้ำมัน การเข้าใจรูปทรงเรขาคณิตนี้มีความสำคัญมากในหลายบริบท ไม่ว่าจะเป็นวิศวกรรม สถาปัตยกรรม 
          หรือแม้กระทั่งการปรุงอาหารและการทำขนม
        </p>

        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <PenTool className="w-5 h-5 text-blue-500" />
          สูตรการหาปริมาตรทรงกระบอก
        </h3>

        <p>
          การหาปริมาตรของทรงกระบอก คือการหาพื้นที่ของฐาน (ซึ่งเป็นรูปวงกลม) แล้วนำไปคูณกับความสูงของทรงกระบอกนั้น 
          ด้วยหลักการนี้ เราจะได้สูตรคณิตศาสตร์ที่ใช้ในการหาปริมาตรดังนี้:
        </p>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center text-xl font-semibold text-blue-700 my-6">
          V = π × r² × h
        </div>

        <p>โดยที่ตัวแปรแต่ละตัวมีความหมายดังนี้:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>V (Volume)</strong> หมายถึง ปริมาตรของทรงกระบอก มีหน่วยเป็นลูกบาศก์ เช่น ลูกบาศก์เมตร (m³) หรือ ลูกบาศก์เซนติเมตร (cm³)</li>
          <li><strong>π (Pi)</strong> คือ ค่าพาย ซึ่งเป็นค่าคงที่ มีค่าประมาณ 3.14159 หรือ 22/7</li>
          <li><strong>r (Radius)</strong> คือ รัศมีของฐานทรงกระบอก (ระยะจากจุดศูนย์กลางวงกลมไปยังขอบ)</li>
          <li><strong>h (Height)</strong> คือ ความสูงของทรงกระบอก (ระยะห่างระหว่างฐานทั้งสอง)</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800">การประยุกต์ใช้งานในชีวิตประจำวันและภาคอุตสาหกรรม</h3>
        <p>
          การคำนวณปริมาตรทรงกระบอกมีการนำไปใช้งานอย่างกว้างขวางในหลากหลายด้าน เช่น:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>อุตสาหกรรมบรรจุภัณฑ์:</strong> การออกแบบกระป๋องบรรจุอาหารหรือเครื่องดื่ม ต้องคำนวณปริมาตรเพื่อความจุที่ถูกต้องแม่นยำ</li>
          <li><strong>วิศวกรรมโยธาและชลประทาน:</strong> ใช้คำนวณความจุของท่อระบายน้ำ ท่อส่งน้ำ หรือถังเก็บกักน้ำทรงกลม</li>
          <li><strong>อุตสาหกรรมยานยนต์:</strong> การคำนวณความจุกระบอกสูบในเครื่องยนต์ (CC ของเครื่องยนต์) ซึ่งส่งผลต่อพละกำลังและอัตราการสิ้นเปลืองเชื้อเพลิง</li>
          <li><strong>การแพทย์:</strong> ใช้คำนวณปริมาตรของยาในหลอดฉีดยา หรือปริมาณของเหลวในหลอดทดลอง</li>
        </ul>

        <p>
          เครื่องมือคำนวณหาปริมาตรทรงกระบอกออนไลน์ของเรา ถูกออกแบบมาเพื่ออำนวยความสะดวกให้คุณสามารถหาปริมาตรได้อย่างรวดเร็ว 
          ไม่ต้องยุ่งยากกับการกดเครื่องคิดเลขซ้ำหลายรอบ เพียงแค่ใส่ค่ารัศมีของฐานและความสูง เครื่องมือจะแสดงผลลัพธ์ที่แม่นยำในทันที 
          ช่วยประหยัดเวลาและลดข้อผิดพลาดในการคำนวณได้เป็นอย่างดี เหมาะสำหรับทุกคนที่ต้องการคำตอบที่รวดเร็วและเชื่อถือได้
        </p>
      </article>
    </div>
  );
}

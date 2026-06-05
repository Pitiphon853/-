'use client'

import React, { useState } from 'react';
import { Calculator, Triangle, RefreshCw, BookOpen, PenTool } from 'lucide-react';

export default function VolumeCone({ lang }: any) {
  const [radius, setRadius] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [volume, setVolume] = useState<number | null>(null);

  const calculateVolume = () => {
    const r = parseFloat(radius);
    const h = parseFloat(height);
    if (!isNaN(r) && r > 0 && !isNaN(h) && h > 0) {
      const v = (1 / 3) * Math.PI * Math.pow(r, 2) * h;
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
          <Triangle className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            {lang === 'EN' ? 'Cone Volume Calculator' : 'เครื่องมือคำนวณหาปริมาตรทรงกรวย'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Radius of base (r)' : 'รัศมีฐาน (r)'}
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
                {lang === 'EN' ? 'Enter radius and height to calculate' : 'กรุณาระบุรัศมีฐานและความสูงตรงแล้วกดคำนวณ'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose max-w-none text-gray-700 space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800 m-0">ทำความเข้าใจการคำนวณหาปริมาตรทรงกรวย</h2>
        </div>

        <p>
          ทรงกรวย (Cone) เป็นรูปทรงเรขาคณิตสามมิติที่มีฐานเป็นรูปวงกลมและมียอดแหลม 
          พื้นผิวของทรงกรวยจะค่อยๆ สอบเข้าหากันจากฐานไปยังจุดยอด (Apex) สิ่งของรอบตัวเราที่มีลักษณะเป็นทรงกรวย 
          ได้แก่ หมวกปาร์ตี้ กรวยจราจร โคนไอศกรีม หรือแม้แต่ภูเขาไฟบางลูก 
          การคำนวณหาปริมาตรของทรงกรวยมีความสำคัญอย่างมากในเชิงคณิตศาสตร์และวิศวกรรม เนื่องจากใช้เพื่อหาความจุหรือพื้นที่ว่างภายในรูปทรงนั้นๆ
        </p>

        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <PenTool className="w-5 h-5 text-blue-500" />
          สูตรการหาปริมาตรทรงกรวย
        </h3>

        <p>
          สิ่งหนึ่งที่น่าสนใจในทางคณิตศาสตร์คือ ปริมาตรของทรงกรวยจะมีค่าเท่ากับ "หนึ่งในสาม" ของปริมาตรทรงกระบอกที่มีฐานและความสูงเท่ากัน
          ดังนั้นสูตรในการหาปริมาตรทรงกรวยจึงมีหน้าตาคล้ายกับสูตรทรงกระบอก เพียงแต่ต้องหารด้วย 3 (หรือคูณด้วย 1/3) เข้าไป ดังนี้:
        </p>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center text-xl font-semibold text-blue-700 my-6">
          V = (1/3) × π × r² × h
        </div>

        <p>โดยที่ตัวแปรในสมการประกอบไปด้วย:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>V (Volume)</strong> คือ ปริมาตรของทรงกรวย (มีหน่วยเป็นลูกบาศก์)</li>
          <li><strong>π (Pi)</strong> คือ ค่าพาย (ประมาณ 3.14159)</li>
          <li><strong>r (Radius)</strong> คือ รัศมีของวงกลมที่เป็นฐานของทรงกรวย</li>
          <li><strong>h (Height)</strong> คือ ความสูงตรง (ระยะห่างตั้งฉากจากจุดยอดมายังจุดศูนย์กลางของฐาน)</li>
        </ul>
        <p className="text-sm text-red-600">
          <em>หมายเหตุ: ความสูงที่นำมาคำนวณปริมาตรคือ "ความสูงตรง" ไม่ใช่ "ความสูงเอียง" (Slant height)</em>
        </p>

        <h3 className="text-xl font-bold text-gray-800">ทำไมเราถึงต้องคำนวณปริมาตรทรงกรวย?</h3>
        <p>
          ความรู้เกี่ยวกับการหาปริมาตรทรงกรวยสามารถนำไปประยุกต์ใช้ในหลากหลายอุตสาหกรรม ตัวอย่างที่เห็นได้ชัดเจนคือ ในอุตสาหกรรมอาหาร 
          ใช้เพื่อคำนวณปริมาณแป้งและครีมที่จะบรรจุลงในโคนไอศกรีม หรือในการเกษตร ใช้คำนวณปริมาตรของกองเมล็ดพืชหรือกองดินทราย 
          ซึ่งตามธรรมชาติเมื่อเทลงบนพื้นจะก่อตัวขึ้นเป็นรูปทรงคล้ายกรวย 
          นอกจากนี้ วิศวกรยังใช้สูตรนี้คำนวณความจุของไซโลรูปกรวย หรือถังพักวัสดุที่มีก้นรูปกรวย เพื่อให้สามารถคาดคะเนปริมาณวัสดุที่เก็บไว้ได้แม่นยำ
        </p>

        <p>
          หากคุณต้องการคำนวณปริมาตรทรงกรวยอย่างรวดเร็วและไม่ต้องการจำสูตร 
          เครื่องมือคำนวณปริมาตรทรงกรวยของเราพร้อมเป็นตัวช่วยให้คุณ เพียงระบุค่ารัศมีฐานและค่าความสูงตรง 
          ระบบจะทำการคำนวณปริมาตรที่ถูกต้องออกมาในชั่วพริบตา เหมาะสำหรับนักเรียนที่ต้องการตรวจคำตอบการบ้าน 
          หรือผู้ใช้งานทั่วไปที่ต้องนำผลลัพธ์ไปประยุกต์ใช้งานจริง
        </p>
      </article>
    </div>
  );
}

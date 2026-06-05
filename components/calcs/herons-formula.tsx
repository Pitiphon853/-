"use client";

import React, { useState } from 'react';
import { BoxSelect } from 'lucide-react';

export default function HeronsFormula({ lang }: { lang: 'th' | 'en' }) {
  const [sideA, setSideA] = useState<string>('');
  const [sideB, setSideB] = useState<string>('');
  const [sideC, setSideC] = useState<string>('');

  const t = {
    title: lang === 'th' ? 'คำนวณพื้นที่สามเหลี่ยมด้วยสูตรของเฮรอน' : "Heron's Formula Calculator",
    desc: lang === 'th' ? 'หาพื้นที่สามเหลี่ยมจากความยาวทั้งสามด้าน' : 'Find triangle area from three side lengths',
    labelSideA: lang === 'th' ? 'ความยาวด้าน a' : 'Side a length',
    labelSideB: lang === 'th' ? 'ความยาวด้าน b' : 'Side b length',
    labelSideC: lang === 'th' ? 'ความยาวด้าน c' : 'Side c length',
    resultArea: lang === 'th' ? 'พื้นที่สามเหลี่ยม:' : 'Triangle Area:',
    resultS: lang === 'th' ? 'ค่ากึ่งรอบรูป (s):' : 'Semiperimeter (s):',
    errorInvalid: lang === 'th' ? 'ความยาวด้านไม่สามารถประกอบเป็นสามเหลี่ยมได้' : 'Lengths cannot form a valid triangle',
  };

  const calculateArea = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
      return null;
    }

    if (a + b <= c || a + c <= b || b + c <= a) {
      return { error: t.errorInvalid };
    }

    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    return { area: area.toFixed(4), s: s.toFixed(4) };
  };

  const result = calculateArea();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
          <BoxSelect className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t.title}</h2>
          <p className="text-sm text-slate-500">{t.desc}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelSideA}</label>
            <input type="number" value={sideA} onChange={e => setSideA(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelSideB}</label>
            <input type="number" value={sideB} onChange={e => setSideB(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelSideC}</label>
            <input type="number" value={sideC} onChange={e => setSideC(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
          </div>
        </div>

        {result && 'error' in result && (
          <p className="text-red-500 text-sm">{result.error}</p>
        )}

        {result && !('error' in result) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-amber-50 rounded-xl border border-amber-100">
              <h3 className="text-sm font-medium text-amber-900 mb-2">{t.resultS}</h3>
              <p className="text-2xl text-amber-950 font-bold">{result.s}</p>
            </div>
            <div className="p-6 bg-amber-50 rounded-xl border border-amber-100">
              <h3 className="text-sm font-medium text-amber-900 mb-2">{t.resultArea}</h3>
              <p className="text-2xl text-amber-950 font-bold">{result.area}</p>
            </div>
          </div>
        )}
      </div>

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">สูตรของเฮรอน (Heron's Formula) สำหรับหาพื้นที่สามเหลี่ยม</h2>
        <p>
          ตามปกติแล้ว เมื่อเราต้องการหาพื้นที่ของรูปสามเหลี่ยม เรามักจะคุ้นเคยกับสูตรพื้นฐานที่ท่องกันมาตั้งแต่เด็ก นั่นคือ <strong>&frac12; &times; ฐาน &times; สูง</strong> 
          แต่ในความเป็นจริง การวัดความสูงของรูปสามเหลี่ยมในพื้นที่จริง (เช่น ที่ดิน) อาจเป็นเรื่องยากหรือไม่สามารถทำได้โดยง่ายนัก 
          นี่คือจุดที่ <strong>สูตรของเฮรอน (Heron's Formula)</strong> เข้ามามีบทบาทสำคัญ เนื่องจากช่วยให้เราคำนวณพื้นที่ได้โดยใช้เพียงแค่ <em>ความยาวของด้านทั้งสาม</em> เท่านั้น
        </p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ที่มาและสูตรการคำนวณ</h3>
        <p>
          สูตรนี้ตั้งชื่อตาม <strong>เฮรอนแห่งอะเล็กซานเดรีย (Heron of Alexandria)</strong> นักคณิตศาสตร์ชาวกรีกโบราณ 
          โดยสูตรจะประกอบไปด้วย 2 ขั้นตอนหลักในการคำนวณ ได้แก่:
        </p>
        
        <ol className="list-decimal pl-6 space-y-4 mb-6">
          <li>
            <strong>การหาค่ากึ่งรอบรูป (Semiperimeter, s):</strong><br />
            ก่อนอื่นต้องหาผลรวมของความยาวด้านทั้งสาม (a, b, c) แล้วหารด้วยสองเพื่อหาความยาวครึ่งหนึ่งของเส้นรอบรูป 
            <div className="bg-slate-50 p-4 rounded-lg my-2 font-mono">
              s = (a + b + c) / 2
            </div>
          </li>
          <li>
            <strong>การแทนค่าในสูตรพื้นที่:</strong><br />
            นำค่า <code>s</code> ที่ได้ไปคำนวณในสมการหลัก ซึ่งอยู่ภายใต้เครื่องหมายรากที่สอง (Square Root)
            <div className="bg-slate-50 p-4 rounded-lg my-2 font-mono">
              พื้นที่ (Area) = &radic;[ s(s - a)(s - b)(s - c) ]
            </div>
          </li>
        </ol>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">อสมการสามเหลี่ยม (Triangle Inequality)</h3>
        <p>
          ก่อนที่จะใช้สูตรของเฮรอนได้ มีกฎเหล็กทางเรขาคณิตที่สำคัญมาก นั่นคือ <strong>ความยาวของด้านทั้งสามจะต้องสามารถประกอบเป็นรูปสามเหลี่ยมได้จริง</strong> 
          ตาม "อสมการสามเหลี่ยม" ที่กล่าวว่า <em>ผลบวกของความยาวสองด้านใดๆ ย่อมต้องมากกว่าความยาวของด้านที่สามเสมอ</em> 
          (a+b &gt; c, a+c &gt; b, b+c &gt; a) หากไม่เข้าเงื่อนไขนี้ จะไม่สามารถเกิดเป็นรูปสามเหลี่ยมได้ และถ้าฝืนนำไปคำนวณในสูตรเฮรอน ค่าที่อยู่ใต้รากที่สองจะติดลบหรือเป็นศูนย์
        </p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ประโยชน์และการประยุกต์ใช้งานในชีวิตจริง</h3>
        <p>
          สูตรของเฮรอนเป็นเครื่องมือที่ทรงพลังและมีประโยชน์อย่างยิ่งในหลากหลายสาขาอาชีพ:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            <strong>การรังวัดและการประเมินที่ดิน (Land Surveying):</strong> ที่ดินของจริงมักไม่ได้เป็นสี่เหลี่ยมเป๊ะๆ นายช่างรังวัดจะแบ่งพื้นที่ออกเป็นรูปสามเหลี่ยมหลายๆ รูป วัดระยะห่างระหว่างจุดเสาเข็มรอบด้าน แล้วใช้สูตรเฮรอนคำนวณพื้นที่แต่ละส่วนก่อนนำมารวมกัน
          </li>
          <li>
            <strong>สถาปัตยกรรมและงานก่อสร้าง:</strong> ใช้ในการคำนวณพื้นที่ของโครงสร้างหลังคา วัสดุปูพื้น หรือกระจกที่มีรูปทรงเป็นสามเหลี่ยมด้านไม่เท่า
          </li>
          <li>
            <strong>คอมพิวเตอร์กราฟิกส์:</strong> ในเกมหรือโปรแกรม 3 มิติ โพลีกอน (Polygon) บนโมเดล 3D มักถูกแบ่งออกเป็นสามเหลี่ยมย่อยเพื่อคำนวณพื้นที่ผิว การตกกระทบของแสง หรือการชน (Collision Detection)
          </li>
        </ul>

        <p className="mt-4">
          หากคุณมีตัวเลขความยาวด้านของพื้นที่ใดๆ โปรแกรมคำนวณด้านบนสามารถช่วยคุณหาค่า s และขนาดพื้นที่ออกมาได้อย่างรวดเร็วและแม่นยำ เพียงแค่ระบุความยาวให้ครบทั้ง 3 ด้านครับ
        </p>
      </article>
    </div>
  );
}

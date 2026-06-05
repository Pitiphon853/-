"use client";

import React, { useState } from 'react';
import { Hexagon } from 'lucide-react';

export default function PolygonInteriorAngleSum({ lang }: { lang: 'th' | 'en' }) {
  const [sides, setSides] = useState<number | ''>('');

  const t = {
    title: lang === 'th' ? 'คำนวณผลรวมมุมภายในรูปหลายเหลี่ยม' : 'Polygon Interior Angle Sum',
    desc: lang === 'th' ? 'หาผลรวมมุมภายใน และมุมแต่ละมุมของรูปหลายเหลี่ยมปกติ' : 'Calculate interior angles sum and individual angle for regular polygons',
    inputSides: lang === 'th' ? 'จำนวนด้าน (n)' : 'Number of sides (n)',
    resultSum: lang === 'th' ? 'ผลรวมมุมภายในทั้งหมด:' : 'Sum of interior angles:',
    resultEach: lang === 'th' ? 'ขนาดของแต่ละมุม (สำหรับรูปหลายเหลี่ยมด้านเท่า):' : 'Each interior angle (for regular polygon):',
    error: lang === 'th' ? 'รูปหลายเหลี่ยมต้องมีจำนวนด้านอย่างน้อย 3 ด้าน' : 'A polygon must have at least 3 sides',
  };

  const calculate = () => {
    if (typeof sides !== 'number' || sides < 3) return null;
    
    const sum = (sides - 2) * 180;
    const each = sum / sides;

    return {
      sum,
      each
    };
  };

  const result = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
          <Hexagon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t.title}</h2>
          <p className="text-sm text-slate-500">{t.desc}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t.inputSides}
          </label>
          <input
            type="number"
            value={sides}
            onChange={(e) => setSides(e.target.value === '' ? '' : Number(e.target.value))}
            min="3"
            step="1"
            className="w-full sm:w-1/2 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            placeholder={lang === 'th' ? 'เช่น 5 สำหรับรูปห้าเหลี่ยม' : 'e.g., 5 for pentagon'}
          />
        </div>

        {typeof sides === 'number' && sides < 3 && (
          <p className="text-red-500 text-sm">{t.error}</p>
        )}

        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
              <h3 className="text-sm font-medium text-purple-900 mb-2">{t.resultSum}</h3>
              <p className="text-2xl text-purple-950 font-bold">
                {result.sum.toLocaleString()} &deg;
              </p>
            </div>
            <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
              <h3 className="text-sm font-medium text-purple-900 mb-2">{t.resultEach}</h3>
              <p className="text-2xl text-purple-950 font-bold">
                {Number.isInteger(result.each) ? result.each : result.each.toFixed(2)} &deg;
              </p>
            </div>
          </div>
        )}
      </div>

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">ผลรวมของมุมภายในรูปหลายเหลี่ยม (Sum of Interior Angles of a Polygon)</h2>
        <p>
          ในทางเรขาคณิต <strong>รูปหลายเหลี่ยม (Polygon)</strong> คือรูปทรงแบนราบแบบปิดที่ประกอบด้วยด้านที่เป็นเส้นตรงตั้งแต่ 3 เส้นขึ้นไป (เช่น รูปสามเหลี่ยม สี่เหลี่ยม ห้าเหลี่ยม) 
          คุณสมบัติพื้นฐานที่สำคัญอย่างหนึ่งของการศึกษาเรื่องรูปหลายเหลี่ยมก็คือ <strong>ผลรวมของมุมภายใน (Sum of Interior Angles)</strong> 
          ซึ่งมีสูตรทางคณิตศาสตร์ที่ชัดเจนและสามารถพิสูจน์ได้อย่างง่ายดายผ่านการแบ่งรูปหลายเหลี่ยมออกเป็นรูปสามเหลี่ยมย่อยๆ
        </p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">สูตรการหาผลรวมมุมภายใน</h3>
        <p>
          สำหรับรูปหลายเหลี่ยมใดๆ ที่มีจำนวนด้านเท่ากับ <code>n</code> ด้าน (โดยที่ n &ge; 3) ผลรวมของมุมภายในทั้งหมดสามารถคำนวณได้จากสูตร:
        </p>
        <div className="bg-slate-50 p-4 rounded-lg my-4 text-center text-lg font-bold">
          ผลรวมมุมภายใน = (n - 2) &times; 180&deg;
        </div>
        <p>
          <strong>ตัวอย่างการคำนวณ:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>รูปสามเหลี่ยม (n=3):</strong> (3 - 2) &times; 180&deg; = 1 &times; 180&deg; = 180&deg;</li>
          <li><strong>รูปสี่เหลี่ยม (n=4):</strong> (4 - 2) &times; 180&deg; = 2 &times; 180&deg; = 360&deg;</li>
          <li><strong>รูปห้าเหลี่ยม (n=5):</strong> (5 - 2) &times; 180&deg; = 3 &times; 180&deg; = 540&deg;</li>
          <li><strong>รูปหกเหลี่ยม (n=6):</strong> (6 - 2) &times; 180&deg; = 4 &times; 180&deg; = 720&deg;</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ที่มาของสูตร (ทำไมต้อง n - 2)</h3>
        <p>
          ถ้าเราวาดรูปหลายเหลี่ยมใดๆ ขึ้นมา แล้วเลือกจุดยอดมุมจุดหนึ่ง ลากเส้นทแยงมุมจากจุดยอดนั้นไปยังจุดยอดอื่นๆ ที่ไม่ติดกัน เราจะสามารถแบ่งรูปหลายเหลี่ยมนั้นออกเป็นรูปสามเหลี่ยมย่อยๆ ได้จำนวน <code>n - 2</code> รูปเสมอ
          เรารู้ว่าผลรวมมุมภายในของรูปสามเหลี่ยมแต่ละรูปเท่ากับ 180 องศา ดังนั้นเมื่อนำจำนวนรูปสามเหลี่ยมทั้งหมดมาคูณด้วย 180 ก็จะได้ผลรวมของมุมภายในทั้งหมดของรูปหลายเหลี่ยมนั้นนั่นเอง
        </p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">การหามุมแต่ละมุมในรูปหลายเหลี่ยมด้านเท่า (Regular Polygon)</h3>
        <p>
          <strong>รูปหลายเหลี่ยมด้านเท่ามุมเท่า (Regular Polygon)</strong> คือรูปหลายเหลี่ยมที่ทุกด้านมีความยาวเท่ากัน และทุกมุมมีขนาดเท่ากัน (เช่น รูปสี่เหลี่ยมจัตุรัส, รูปห้าเหลี่ยมด้านเท่า) 
          ดังนั้น หากเราทราบผลรวมของมุมภายในทั้งหมดแล้ว เราสามารถหาขนาดของแต่ละมุมได้ง่ายๆ โดยการนำผลรวมมุมภายในหารด้วยจำนวนด้าน (หรือจำนวนมุม) <code>n</code>
        </p>
        <div className="bg-slate-50 p-4 rounded-lg my-4 text-center text-lg font-bold">
          ขนาดของแต่ละมุม = [(n - 2) &times; 180&deg;] / n
        </div>
        <p>
          ตัวอย่างเช่น รูปหกเหลี่ยมด้านเท่า (n=6) จะมีผลรวมมุมภายใน 720&deg; ดังนั้นมุมแต่ละมุมจะมีขนาดเท่ากับ 720&deg; / 6 = 120&deg; เป็นต้น
        </p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ความสัมพันธ์กับมุมภายนอก (Exterior Angles)</h3>
        <p>
          เกร็ดความรู้เพิ่มเติมคือ ไม่ว่ารูปหลายเหลี่ยม(แบบนูนหรือ Convex Polygon) นั้นจะมีจำนวนด้านกี่ด้านก็ตาม <strong>ผลรวมของมุมภายนอกทั้งหมดจะเท่ากับ 360 องศาเสมอ</strong> 
          ซึ่งในกรณีที่เป็นรูปหลายเหลี่ยมด้านเท่า มุมภายนอกแต่ละมุมจะเท่ากับ 360&deg; / n และแน่นอนว่า มุมภายใน + มุมภายนอก ที่จุดยอดเดียวกันจะต้องรวมกันได้ 180 องศา (มุมตรง) เสมอ
        </p>

        <p className="mt-4">
          เครื่องมือคำนวณด้านบนสามารถช่วยคุณคำนวณหาทั้งผลรวมของมุมภายในและขนาดของมุมแต่ละมุมได้อย่างแม่นยำและรวดเร็ว เพียงแค่ป้อนจำนวนด้านที่ต้องการระบบก็จะแสดงผลลัพธ์ให้ทันทีครับ
        </p>
      </article>
    </div>
  );
}

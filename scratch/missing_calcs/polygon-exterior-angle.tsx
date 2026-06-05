"use client";

import React, { useState } from 'react';
import { Calculator, Info, AlertTriangle, RefreshCw, Shapes } from 'lucide-react';

export default function PolygonExteriorAngle({ lang }: any) {
  const isEN = lang === 'en';

  const [sides, setSides] = useState<string>('');
  const [extAngleDeg, setExtAngleDeg] = useState<number | null>(null);
  const [extAngleRad, setExtAngleRad] = useState<number | null>(null);
  const [intAngleDeg, setIntAngleDeg] = useState<number | null>(null);
  const [intAngleRad, setIntAngleRad] = useState<number | null>(null);
  const [sumIntAngle, setSumIntAngle] = useState<number | null>(null);
  
  const [error, setError] = useState<string>('');
  const [showSteps, setShowSteps] = useState<boolean>(false);

  const t = {
    title: isEN ? 'Polygon Exterior Angle Calculator' : 'เครื่องมือคำนวณมุมภายนอกของรูป N เหลี่ยม',
    desc: isEN ? 'Calculate the individual exterior and interior angles of a regular N-sided polygon.' : 'คำนวณหามุมภายนอกและมุมภายในของรูปหลายเหลี่ยมด้านเท่ามุมเท่าขนาด N ด้าน',
    labelSides: isEN ? 'Number of Sides (N)' : 'จำนวนเหลี่ยม / จำนวนด้าน (N)',
    placeholderSides: isEN ? 'e.g. 5, 6, 8' : 'เช่น 5, 6, 8',
    btnCalculate: isEN ? 'Calculate Angles' : 'คำนวณมุม',
    btnReset: isEN ? 'Clear' : 'ล้างข้อมูล',
    resultExt: isEN ? 'Exterior Angle (Each)' : 'มุมภายนอก (แต่ละมุม)',
    resultInt: isEN ? 'Interior Angle (Each)' : 'มุมภายใน (แต่ละมุม)',
    resultSumInt: isEN ? 'Sum of Interior Angles' : 'ผลรวมของมุมภายในทั้งหมด',
    resultSumExt: isEN ? 'Sum of Exterior Angles' : 'ผลรวมของมุมภายนอกทั้งหมด',
    invalidSides: isEN ? 'A polygon must have at least 3 sides. Please enter a valid integer.' : 'รูปหลายเหลี่ยมต้องมีจำนวนด้านอย่างน้อย 3 ด้านขึ้นไป กรุณากรอกจำนวนเต็มที่ถูกต้อง',
    stepTitle: isEN ? 'Calculation Formulas & Explanation' : 'สูตรและวิธีการคำนวณทีละขั้น:',
  };

  const handleCalculate = () => {
    setError('');
    setExtAngleDeg(null);
    setExtAngleRad(null);
    setIntAngleDeg(null);
    setIntAngleRad(null);
    setSumIntAngle(null);
    setShowSteps(false);

    const n = parseInt(sides, 10);
    if (isNaN(n) || n < 3) {
      setError(t.invalidSides);
      return;
    }

    // Each exterior angle = 360 / N
    const extDeg = 360 / n;
    const extRad = (2 * Math.PI) / n;

    // Each interior angle = 180 - extDeg
    const intDeg = 180 - extDeg;
    const intRad = Math.PI - extRad;

    // Sum of interior angles = (N - 2) * 180
    const sumInt = (n - 2) * 180;

    setExtAngleDeg(extDeg);
    setExtAngleRad(extRad);
    setIntAngleDeg(intDeg);
    setIntAngleRad(intRad);
    setSumIntAngle(sumInt);
    setShowSteps(true);
  };

  const handleClear = () => {
    setSides('');
    setExtAngleDeg(null);
    setExtAngleRad(null);
    setIntAngleDeg(null);
    setIntAngleRad(null);
    setSumIntAngle(null);
    setError('');
    setShowSteps(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-amber-600 to-orange-700 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Shapes className="w-8 h-8 text-amber-200" />
            <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
          </div>
          <p className="text-amber-100 opacity-90">{t.desc}</p>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">{t.labelSides}</label>
                <input
                  type="number"
                  value={sides}
                  onChange={(e) => {
                    setSides(e.target.value);
                    setError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCalculate();
                  }}
                  placeholder={t.placeholderSides}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-lg font-mono"
                  min="3"
                  step="1"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-3 justify-start">
                <button
                  onClick={handleCalculate}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  {t.btnCalculate}
                </button>
                <button
                  onClick={handleClear}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium p-3 rounded-xl transition-colors flex items-center justify-center"
                  title={t.btnReset}
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {extAngleDeg !== null && intAngleDeg !== null && sumIntAngle !== null ? (
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <p className="text-xs font-semibold text-gray-500 mb-1">{t.resultExt}</p>
                      <p className="text-xl font-bold text-amber-700 font-mono">
                        {Number(extAngleDeg.toFixed(4))}°
                      </p>
                      <p className="text-xs text-amber-600 font-mono mt-1">
                        {Number(extAngleRad?.toFixed(4))} rad
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 mb-1">{t.resultInt}</p>
                      <p className="text-xl font-bold text-gray-800 font-mono">
                        {Number(intAngleDeg.toFixed(4))}°
                      </p>
                      <p className="text-xs text-gray-500 font-mono mt-1">
                        {Number(intAngleRad?.toFixed(4))} rad
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 mb-1">{t.resultSumExt}</p>
                      <p className="text-lg font-bold text-gray-800 font-mono">360°</p>
                      <p className="text-xs text-gray-500 font-mono mt-1">2π rad</p>
                    </div>

                    <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                      <p className="text-xs font-semibold text-gray-500 mb-1">{t.resultSumInt}</p>
                      <p className="text-lg font-bold text-amber-700 font-mono">{sumIntAngle}°</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-center text-gray-400 font-mono text-sm">
                  {isEN ? 'Enter the number of sides and click Calculate to view results.' : 'กรอกจำนวนด้านและกดคำนวณเพื่อแสดงรายละเอียดผลลัพธ์มุมต่างๆ'}
                </div>
              )}
            </div>
          </div>

          {/* Explanation Step */}
          {showSteps && extAngleDeg !== null && intAngleDeg !== null && (
            <div className="mt-8 p-5 bg-amber-50 rounded-2xl border border-amber-100 text-amber-950">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-600" />
                {t.stepTitle}
              </h3>
              <div className="space-y-4 font-mono text-sm leading-relaxed">
                <div>
                  <p className="font-semibold text-gray-800">1. การคำนวณหามุมภายนอกในแต่ละมุม (Each Exterior Angle):</p>
                  <p className="pl-4">
                    ทฤษฎีระบุว่าผลรวมมุมภายนอกของรูปหลายเหลี่ยมใดๆ มีค่าเท่ากับ 360 องศาเสมอ<br />
                    มุมภายนอกแต่ละมุม = 360° ÷ N (จำนวนด้าน)<br />
                    มุมภายนอกแต่ละมุม = 360° ÷ {sides} = <span className="font-bold text-amber-700">{Number(extAngleDeg.toFixed(4))}°</span>
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">2. การคำนวณหามุมภายในในแต่ละมุม (Each Interior Angle):</p>
                  <p className="pl-4">
                    เนื่องจากมุมภายในและมุมภายนอกของแต่ละมุมจะประกอบกันเป็นเส้นตรง (180 องศา)<br />
                    มุมภายในแต่ละมุม = 180° - มุมภายนอกแต่ละมุม<br />
                    มุมภายในแต่ละมุม = 180° - {Number(extAngleDeg.toFixed(4))}° = <span className="font-bold text-amber-700">{Number(intAngleDeg.toFixed(4))}°</span>
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">3. ผลรวมของมุมภายในทั้งหมด (Sum of Interior Angles):</p>
                  <p className="pl-4">
                    สูตร: (N - 2) × 180°<br />
                    ผลรวมมุมภายใน = ({sides} - 2) × 180° = {parseInt(sides) - 2} × 180° = <span className="font-bold text-amber-700">{sumIntAngle}°</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-amber max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Info className="w-6 h-6 text-amber-600" />
          มุมภายนอกของรูปหลายเหลี่ยม N ด้าน (Regular Polygon Exterior Angle): นิยาม ทฤษฎีบท และตัวอย่างวิธีทำ
        </h2>
        
        <p>
          ในวิชาเรขาคณิต (Geometry) การศึกษาคุณสมบัติของรูปหลายเหลี่ยมเป็นแกนกลางหลักในการทำความเข้าใจมิติและการออกแบบ โครงสร้างรูปเรขาคณิตที่เป็นระบบที่สุดคือ <strong>รูปหลายเหลี่ยมด้านเท่ามุมเท่า (Regular Polygon)</strong> ซึ่งหมายถึงรูปหลายเหลี่ยมที่มีความยาวของด้านเท่ากันทุกด้าน และมีขนาดของมุมภายในเท่ากันทุกมุม นอกเหนือจากมุมภายใน (Interior Angle) แล้ว อีกส่วนประกอบหนึ่งที่มีความสำคัญในการคำนวณแนวคิดโครงสร้างและเส้นรอบรูปคือ <strong>มุมภายนอก (Exterior Angle)</strong>
        </p>

        <h3>มุมภายนอกของรูปหลายเหลี่ยมคืออะไร?</h3>
        <p>
          หากเราลากเส้นต่อด้านใดด้านหนึ่งของรูปหลายเหลี่ยมออกไปทางด้านนอก มุมที่อยู่ระหว่างส่วนต่อของด้านนั้นกับด้านที่อยู่ติดกันจะเรียกว่า <strong>มุมภายนอก</strong> คุณสมบัติที่น่าสนใจที่สุดในทางคณิตศาสตร์คือ ไม่ว่ารูปหลายเหลี่ยมนั้นจะเป็นรูปสามเหลี่ยม สี่เหลี่ยม ห้าเหลี่ยม หรือรูปหลายเหลี่ยมที่มีจำนวนด้านมากเพียงใดก็ตาม <strong>ผลรวมของมุมภายนอกของรูปหลายเหลี่ยมโค้ง (Convex Polygon) ใดๆ จะมีค่าคงที่เสมอคือ 360 องศา (หรือ 2&pi; เรเดียน)</strong>
        </p>

        <h3>สูตรคำนวณหามุมภายนอกในแต่ละมุมของรูป N เหลี่ยมด้านเท่า</h3>
        <p>
          เนื่องจากรูปหลายเหลี่ยมด้านเท่ามุมเท่ามีด้านทั้งหมด N ด้าน และมีมุมภายนอกที่เท่ากันทั้งหมด N มุม ดังนั้นเราจึงสามารถหามุมภายนอกแต่ละมุมได้โดยการนำ 360 องศา หารด้วยจำนวนด้าน N:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center text-lg">
          มุมภายนอกแต่ละมุม = 360° / N
        </div>
        <p>
          ความสัมพันธ์ระหว่างมุมภายนอกและมุมภายในคือ ทั้งสองมุมนี้รวมกันจะได้มุมบนเส้นตรงพอดี (Straight Angle) ซึ่งมีขนาด 180 องศา ส่งผลให้:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center text-md">
          มุมภายในแต่ละมุม = 180° - มุมภายนอกแต่ละมุม
        </div>

        <h3>ตารางตัวอย่างการคำนวณตามจำนวนด้าน N</h3>
        <p>
          ลองมาดูตัวอย่างการคำนวณหามุมภายนอกของรูปหลายเหลี่ยมทั่วไป:
        </p>
        <ul>
          <li><strong>รูปสามเหลี่ยมด้านเท่า (N = 3):</strong> มุมภายนอก = 360° ÷ 3 = 120° (มุมภายใน = 180° - 120° = 60°)</li>
          <li><strong>รูปสี่เหลี่ยมจัตุรัส (N = 4):</strong> มุมภายนอก = 360° ÷ 4 = 90° (มุมภายใน = 180° - 90° = 90°)</li>
          <li><strong>รูปห้าเหลี่ยมด้านเท่า (N = 5):</strong> มุมภายนอก = 360° ÷ 5 = 72° (มุมภายใน = 180° - 72° = 108°)</li>
          <li><strong>รูปหกเหลี่ยมด้านเท่า (N = 6):</strong> มุมภายนอก = 360° ÷ 6 = 60° (มุมภายใน = 180° - 60° = 120°)</li>
          <li><strong>รูปแปดเหลี่ยมด้านเท่า (N = 8):</strong> มุมภายนอก = 360° ÷ 8 = 45° (มุมภายใน = 180° - 45° = 135°)</li>
        </ul>

        <h3>การนำไปประยุกต์ใช้ในทางปฏิบัติ</h3>
        <p>
          ความเข้าใจในเรื่องมุมภายนอกมีประโยชน์อย่างมากในอุตสาหกรรมการสถาปัตยกรรมและวิศวกรรมการก่อสร้าง เช่น การปูพื้นกระเบื้องลวดลายต่างๆ (Tessellation) เนื่องจากสถาปนิกจำเป็นต้องคำนวณว่ามุมของกระเบื้องแต่ละรูปทรงจะประกบกันได้สนิท 360 องศาพอดีโดยไม่มีช่องว่างหรือไม่ นอกจากนี้ ในการเขียนโปรแกรมกราฟิกส์ หรือการสั่งการหุ่นยนต์เคลื่อนที่ตามเส้นขอบรูปทรงเรขาคณิต (เช่น หุ่นยนต์วาดรูป) หุ่นยนต์จะต้องหันตัวตามทิศทางมุมภายนอกเพื่อเปลี่ยนเส้นทางเดินในจุดเลี้ยวแต่ละมุมอย่างถูกต้อง
        </p>
      </article>
    </div>
  );
}

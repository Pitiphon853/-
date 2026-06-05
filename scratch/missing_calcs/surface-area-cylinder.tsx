"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Columns } from 'lucide-react';

export default function SurfaceAreaCylinder({ lang }: any) {
  const [inputType, setInputType] = useState<'radius' | 'diameter'>('radius');
  const [dimensionValue, setDimensionValue] = useState<string>('3');
  const [cylinderHeight, setCylinderHeight] = useState<string>('10');
  const [error, setError] = useState<string | null>(null);

  // Results
  const [radius, setRadius] = useState<number | null>(3);
  const [height, setHeight] = useState<number | null>(10);
  const [singleBaseArea, setSingleBaseArea] = useState<number | null>(28.27433);
  const [twoBasesArea, setTwoBasesArea] = useState<number | null>(56.54867);
  const [lateralArea, setLateralArea] = useState<number | null>(188.49556);
  const [totalSurfaceArea, setTotalSurfaceArea] = useState<number | null>(245.04423);
  const [volume, setVolume] = useState<number | null>(282.74334);

  const calculate = () => {
    setError(null);
    const dVal = parseFloat(dimensionValue);
    const hVal = parseFloat(cylinderHeight);

    if (dimensionValue.trim() === '' || cylinderHeight.trim() === '') {
      setRadius(null);
      setHeight(null);
      setSingleBaseArea(null);
      setTwoBasesArea(null);
      setLateralArea(null);
      setTotalSurfaceArea(null);
      setVolume(null);
      return;
    }

    if (isNaN(dVal) || dVal <= 0 || isNaN(hVal) || hVal <= 0) {
      setError(lang === 'EN' ? 'All dimensions must be positive numbers.' : 'ขนาดสัดส่วนทั้งหมดต้องเป็นตัวเลขจำนวนบวกที่มากกว่า 0');
      setRadius(null);
      setHeight(null);
      setSingleBaseArea(null);
      setTwoBasesArea(null);
      setLateralArea(null);
      setTotalSurfaceArea(null);
      setVolume(null);
      return;
    }

    const r = inputType === 'radius' ? dVal : dVal / 2;
    const h = hVal;

    const baseArea = Math.PI * r * r;
    const basesArea2 = 2 * baseArea;
    const latArea = 2 * Math.PI * r * h;
    const totalArea = basesArea2 + latArea;
    const vol = baseArea * h;

    setRadius(r);
    setHeight(h);
    setSingleBaseArea(baseArea);
    setTwoBasesArea(basesArea2);
    setLateralArea(latArea);
    setTotalSurfaceArea(totalArea);
    setVolume(vol);
  };

  useEffect(() => {
    calculate();
  }, [inputType, dimensionValue, cylinderHeight, lang]);

  const clearFields = () => {
    setDimensionValue('');
    setCylinderHeight('');
    setRadius(null);
    setHeight(null);
    setSingleBaseArea(null);
    setTwoBasesArea(null);
    setLateralArea(null);
    setTotalSurfaceArea(null);
    setVolume(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-700 p-6 sm:p-8 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
              <Columns className="h-8 w-8" />
              {lang === 'EN' ? 'Cylinder Surface Area Calculator' : 'เครื่องมือคำนวณพื้นที่ผิวทรงกระบอก'}
            </h2>
            <p className="text-teal-100 opacity-90">
              {lang === 'EN' 
                ? 'Calculate total surface area (including bases and lateral area) of a cylinder.' 
                : 'คำนวณพื้นที่ผิวฝาปิดบนล่าง พื้นที่ผิวโค้งข้าง และปริมาตรรวมของทรงกระบอก'}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Inputs Section */}
            <div className="space-y-6">
              {/* Radio Group for Radius/Diameter */}
              <div className="flex bg-gray-100 p-1.5 rounded-xl gap-1">
                <button
                  type="button"
                  onClick={() => setInputType('radius')}
                  className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
                    inputType === 'radius' 
                      ? 'bg-white text-teal-700 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {lang === 'EN' ? 'Radius (r)' : 'รัศมีฐาน (r)'}
                </button>
                <button
                  type="button"
                  onClick={() => setInputType('diameter')}
                  className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
                    inputType === 'diameter' 
                      ? 'bg-white text-teal-700 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {lang === 'EN' ? 'Diameter (d)' : 'เส้นผ่านศูนย์กลาง (d)'}
                </button>
              </div>

              {/* Input dimension */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {inputType === 'radius' 
                    ? (lang === 'EN' ? 'Base Radius (r)' : 'รัศมีฐานวงกลม (r)') 
                    : (lang === 'EN' ? 'Base Diameter (d)' : 'เส้นผ่านศูนย์กลางฐานวงกลม (d)')}
                </label>
                <input
                  type="number"
                  step="any"
                  value={dimensionValue}
                  onChange={(e) => setDimensionValue(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all text-lg"
                  placeholder="e.g. 3"
                />
              </div>

              {/* Height Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {lang === 'EN' ? 'Cylinder Height (h)' : 'ความสูงของทรงกระบอก (h)'}
                </label>
                <input
                  type="number"
                  step="any"
                  value={cylinderHeight}
                  onChange={(e) => setCylinderHeight(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all text-lg"
                  placeholder="e.g. 10"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={clearFields}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  {lang === 'EN' ? 'Clear' : 'ล้างค่า'}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-medium">
                  {error}
                </div>
              )}
            </div>

            {/* Visual SVG cylinder preview */}
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">
                {lang === 'EN' ? 'Cylinder 3D Model' : 'แบบจำลองทรงกระบอกสามมิติ'}
              </h3>
              
              <div className="relative w-44 h-44 bg-white rounded-2xl shadow-inner border border-gray-200 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Bottom Fill shadow */}
                  <path d="M 20 25 L 20 75 A 30 10 0 0 0 80 75 L 80 25 A 30 10 0 0 1 20 25 Z" fill="#ccfbf1" opacity="0.6" />
                  
                  {/* Top Face ellipse */}
                  <ellipse cx="50" cy="25" rx="30" ry="10" fill="#99f6e4" stroke="#0d9488" strokeWidth="1.5" />
                  
                  {/* Vertical outer border lines */}
                  <line x1="20" y1="25" x2="20" y2="75" stroke="#0d9488" strokeWidth="1.5" />
                  <line x1="80" y1="25" x2="80" y2="75" stroke="#0d9488" strokeWidth="1.5" />
                  
                  {/* Bottom Face ellipses */}
                  <path d="M 20 75 A 30 10 0 0 0 80 75" fill="none" stroke="#0d9488" strokeWidth="1.5" />
                  <path d="M 80 75 A 30 10 0 0 0 20 75" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="3,3" />

                  {/* Radius vector on top */}
                  <line x1="50" y1="25" x2="80" y2="25" stroke="#0f766e" strokeWidth="1.5" strokeDasharray="2,1" />
                  <circle cx="50" cy="25" r="2" fill="#0f766e" />
                  <circle cx="80" cy="25" r="2" fill="#0f766e" />

                  {/* Height helper */}
                  <line x1="85" y1="25" x2="85" y2="75" stroke="#0d9488" strokeWidth="1" strokeDasharray="3,2" />
                </svg>
                {radius && height && (
                  <div className="absolute bottom-2 flex gap-4 text-[10px] font-mono font-bold text-teal-800">
                    <span>r = {radius.toFixed(2)}</span>
                    <span>h = {height.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center max-w-xs">
                {lang === 'EN' 
                  ? 'Visual representation of the cylinder. Includes top base, bottom base, and curved side.' 
                  : 'แบบจำลองประกอบด้วย ฝาบน ฝาล่าง และแผ่นม้วนผิวโค้งด้านข้าง'}
              </p>
            </div>
          </div>

          {/* Results section */}
          {radius !== null && height !== null && singleBaseArea !== null && twoBasesArea !== null && lateralArea !== null && totalSurfaceArea !== null && volume !== null && !error && (
            <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
              <h3 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                {lang === 'EN' ? 'Calculation Results' : 'ผลการคำนวณทั้งหมด'}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                {/* Single Base */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-teal-100 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'One Base Area' : 'พื้นที่ฐาน (1 ฝา)'}
                  </span>
                  <span className="text-md sm:text-lg font-black text-teal-700">{singleBaseArea.toFixed(4)}</span>
                </div>

                {/* Both Bases */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-teal-100 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Two Bases Area' : 'พื้นที่ฐานรวม (2 ฝา)'}
                  </span>
                  <span className="text-md sm:text-lg font-black text-cyan-700">{twoBasesArea.toFixed(4)}</span>
                </div>

                {/* Lateral Area */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-teal-100 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Lateral Area' : 'พื้นที่ผิวโค้งข้าง'}
                  </span>
                  <span className="text-md sm:text-lg font-black text-indigo-700">{lateralArea.toFixed(4)}</span>
                </div>

                {/* Volume */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-teal-100 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Volume (V)' : 'ปริมาตรทรงกระบอก'}
                  </span>
                  <span className="text-md sm:text-lg font-black text-purple-700">{volume.toFixed(4)}</span>
                </div>
              </div>

              {/* Total Area highlighted */}
              <div className="bg-white p-4 rounded-xl border border-teal-200 text-center shadow-md">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  {lang === 'EN' ? 'Total Surface Area (With Bases)' : 'พื้นที่ผิวรวมทั้งหมด (รวมฝาปิดสองด้าน)'}
                </span>
                <span className="text-3xl font-black text-teal-600">{totalSurfaceArea.toFixed(5)}</span>
                <span className="text-xs text-gray-500 ml-1">unit²</span>
              </div>

              {/* Steps */}
              <div className="mt-4 pt-4 border-t border-teal-200/50 text-sm text-teal-800 space-y-1">
                <p>
                  <strong>{lang === 'EN' ? 'Calculation Steps:' : 'ขั้นตอนการแสดงวิธีทำ:'}</strong>
                </p>
                <p>
                  &bull; {lang === 'EN' ? 'Radius (r)' : 'รัศมีฐาน (r)'} = {radius.toFixed(4)}, {lang === 'EN' ? 'Height (h)' : 'ความสูง (h)'} = {height.toFixed(4)}
                </p>
                <p>
                  &bull; {lang === 'EN' ? 'Base Area (Top + Bottom):' : 'พื้นที่ฝาปิดสองด้าน:'} 2 &times; &pi; &times; r² = 2 &times; 3.14159 &times; {radius.toFixed(4)}² = {twoBasesArea.toFixed(4)}
                </p>
                <p>
                  &bull; {lang === 'EN' ? 'Lateral Surface Area (Sides):' : 'พื้นที่ผิวข้างรูปทรงกระบอก:'} 2 &times; &pi; &times; r &times; h = 2 &times; 3.14159 &times; {radius.toFixed(4)} &times; {height.toFixed(4)} = {lateralArea.toFixed(4)}
                </p>
                <p>
                  &bull; {lang === 'EN' ? 'Total Surface Area:' : 'พื้นที่ผิวทั้งหมดรวมฝาปิด:'} {twoBasesArea.toFixed(4)} (ฝาปิด) + {lateralArea.toFixed(4)} (ผิวข้าง) = {totalSurfaceArea.toFixed(4)}
                </p>
                <p>
                  &bull; {lang === 'EN' ? 'Volume:' : 'ปริมาตรความจุ:'} &pi; &times; r² &times; h = 3.14159 &times; {radius.toFixed(4)}² &times; {height.toFixed(4)} = {volume.toFixed(4)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Thai Article */}
      <article className="prose prose-teal max-w-none bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">
          การคำนวณพื้นที่ผิวทรงกระบอกรวมฝาปิด (Cylinder Surface Area) และการประยุกต์ใช้งาน
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          <strong>ทรงกระบอก (Cylinder)</strong> คือ รูปทรงเรขาคณิตสามมิติที่มีหน้าตัดหัวท้ายเป็นรูปวงกลมสองวงที่ขนานกันและมีขนาดเท่ากันทุกประการ และมีผิวโค้งด้านข้างเชื่อมต่อระหว่างหน้าตัดทั้งสอง เมื่อเราพูดถึง <strong>พื้นที่ผิวของทรงกระบอกรวมฝาปิด</strong> จะหมายถึงผลรวมของพื้นที่ผิวภายนอกทั้งหมด ซึ่งประกอบไปด้วยหน้าสัมผัส 2 ส่วนหลักคือ พื้นที่หน้าตัดทรงกลมทั้งสองด้าน (ฝาบนและฝาล่าง) และพื้นที่ผิวโค้งโดยรอบตัวกระบอก
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">เจาะลึกสูตรการหาพื้นที่ผิวทรงกระบอก</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          เพื่อให้เข้าใจที่มาของสูตรได้อย่างถ่องแท้ เราจำเป็นต้องแยกชิ้นส่วนของทรงกระบอกออกเป็นชิ้นๆ ดังนี้:
        </p>
        
        <ul className="list-disc pl-6 text-gray-700 space-y-4 mb-6">
          <li>
            <strong>1. พื้นที่ฐานวงกลมรวม 2 ด้าน (Two Bases Area):</strong> เนื่องจากฐานทั้งฝาปิดด้านบนและด้านล่างเป็นรูปวงกลมที่มีรัศมี r เท่ากัน และสูตรพื้นที่วงกลมคือ &pi;r² ดังนั้นพื้นที่ฝาปิดรวม 2 ด้านจึงเท่ากับ:
            <div className="bg-teal-50 border-l-4 border-teal-500 p-2 my-1 font-mono text-sm font-semibold">
              พื้นที่ฐาน 2 ด้าน = 2 &times; &pi; &times; r²
            </div>
          </li>
          <li>
            <strong>2. พื้นที่ผิวข้าง (Lateral Surface Area):</strong> หากเราลองคลี่แผ่นผิวโค้งด้านข้างของทรงกระบอกออก จะได้เป็นแผ่นรูปสี่เหลี่ยมผืนผ้าที่มีความกว้างเท่ากับส่วนสูง h ของทรงกระบอก และมีความยาวเท่ากับ <em>"เส้นรอบวงของฐานวงกลม"</em> ซึ่งก็คือ 2&pi;r ดังนั้น พื้นที่ผิวข้างจึงเท่ากับ:
            <div className="bg-teal-50 border-l-4 border-teal-500 p-2 my-1 font-mono text-sm font-semibold">
              พื้นที่ผิวข้าง = 2 &times; &pi; &times; r &times; h
            </div>
          </li>
          <li>
            <strong>3. พื้นที่ผิวทั้งหมดรวมฝาปิด (Total Surface Area):</strong> เกิดจากผลรวมของทั้งสองส่วนข้างต้น:
            <div className="bg-teal-50 border-l-4 border-teal-600 p-3 my-2 font-mono text-md font-extrabold text-teal-950 text-center">
              พื้นที่ผิวรวมทั้งหมด = (2 &times; &pi; &times; r²) + (2 &times; &pi; &times; r &times; h) = 2&pi;r(r + h)
            </div>
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">ตัวอย่างการคิดคำนวณแบบแสดงวิธีทำ</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>โจทย์:</strong> ต้องการออกแบบกระป๋องเก็บน้ำชาร้อนทรงกระบอกซึ่งมีรัศมีฐาน 5 เซนติเมตร และมีความสูง 14 เซนติเมตร จะต้องใช้แผ่นสแตนเลสที่มีพื้นที่อย่างน้อยเท่าใดในการผลิต (กำหนดให้ &pi; &approx; 3.14)
        </p>
        <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
          <li><strong>คำนวณพื้นที่ฐาน 2 ฝา (บน-ล่าง):</strong>
            <br /> พื้นที่ฐาน = 2 &times; 3.14 &times; 5² = 2 &times; 3.14 &times; 25 = 157 ตารางเซนติเมตร
          </li>
          <li><strong>คำนวณพื้นที่ผิวข้างกระป๋อง:</strong>
            <br /> พื้นที่ผิวข้าง = 2 &times; 3.14 &times; 5 &times; 14 = 3.14 &times; 140 = 439.6 ตารางเซนติเมตร
          </li>
          <li><strong>คำนวณพื้นที่ผิวรวมทั้งหมด:</strong>
            <br /> พื้นที่ผิวรวมทั้งหมด = 157 + 439.6 = 596.6 ตารางเซนติเมตร
          </li>
          <li><strong>คำตอบ:</strong> จะต้องใช้แผ่นสแตนเลสมีพื้นที่อย่างน้อยประมาณ 596.6 ตารางเซนติเมตรในการตัดทำกระป๋องชา</li>
        </ol>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">ประโยชน์ของสูตรทรงกระบอกในภาคอุตสาหกรรม</h3>
        <p className="text-gray-700 leading-relaxed">
          ในอุตสาหกรรมการผลิต <strong>อาหารกระป๋องและเครื่องดื่มบรรจุเสร็จ</strong> วิศวกรจะใช้การคำนวณพื้นที่ผิวทรงกระบอกนี้เพื่อประเมินปริมาณวัสดุแผ่นโลหะ อลูมิเนียม หรือสังกะสีที่จะต้องจัดซื้อและป้อนเข้าสู่สายพานตัดเจาะ เพื่อหาขนาดตัดที่คุ้มค่าที่สุดและลดเศษขยะแผ่นโลหะให้เหลือน้อยที่สุด และใน <strong>งานก่อสร้างและงานสีระบบท่อระบายความร้อน</strong> การรู้พื้นที่ผิวสัมผัสภายนอกของท่อน้ำยาหรือท่อส่งแก๊สช่วยทำให้ผู้รับเหมาพ่นสารป้องกันความร้อนหรือสารพ่นกันการเกิดสนิม สามารถประเมินปริมาตรสีเคลือบที่ต้องใช้รวมถึงค่าแรงได้อย่างมีประสิทธิภาพ ป้องกันความเสี่ยงงบประมาณบานปลาย
        </p>
      </article>
    </div>
  );
}

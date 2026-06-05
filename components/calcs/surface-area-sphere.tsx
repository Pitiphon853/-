"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Circle } from 'lucide-react';

export default function SurfaceAreaSphere({ lang }: any) {
  const [calcMode, setCalcMode] = useState<'radius' | 'diameter' | 'surface'>('radius');
  const [inputValue, setInputValue] = useState<string>('5');
  const [error, setError] = useState<string | null>(null);

  // Results
  const [radius, setRadius] = useState<number | null>(5);
  const [diameter, setDiameter] = useState<number | null>(10);
  const [surfaceArea, setSurfaceArea] = useState<number | null>(314.15926);
  const [volume, setVolume] = useState<number | null>(523.59877);

  const calculate = () => {
    setError(null);
    const val = parseFloat(inputValue);

    if (inputValue.trim() === '') {
      setRadius(null);
      setDiameter(null);
      setSurfaceArea(null);
      setVolume(null);
      return;
    }

    if (isNaN(val) || val <= 0) {
      setError(lang === 'EN' ? 'Please enter a valid positive number.' : 'กรุณากรอกตัวเลขจำนวนบวกที่มากกว่า 0');
      setRadius(null);
      setDiameter(null);
      setSurfaceArea(null);
      setVolume(null);
      return;
    }

    let r = 0;

    if (calcMode === 'radius') {
      r = val;
    } else if (calcMode === 'diameter') {
      r = val / 2;
    } else if (calcMode === 'surface') {
      r = Math.sqrt(val / (4 * Math.PI));
    }

    setRadius(r);
    setDiameter(r * 2);
    setSurfaceArea(4 * Math.PI * r * r);
    setVolume((4 / 3) * Math.PI * Math.pow(r, 3));
  };

  useEffect(() => {
    calculate();
  }, [calcMode, inputValue, lang]);

  const handleModeChange = (mode: 'radius' | 'diameter' | 'surface') => {
    setCalcMode(mode);
    if (mode === 'radius') {
      setInputValue('5');
    } else if (mode === 'diameter') {
      setInputValue('10');
    } else if (mode === 'surface') {
      setInputValue('314.16');
    }
  };

  const clearFields = () => {
    setInputValue('');
    setRadius(null);
    setDiameter(null);
    setSurfaceArea(null);
    setVolume(null);
    setError(null);
  };

  // SVG representation scale factor
  const getScale = () => {
    if (!radius) return 1;
    const normal = radius / 5;
    return Math.max(0.4, Math.min(1.3, normal));
  };

  const scale = getScale();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 sm:p-8 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
              <Circle className="h-8 w-8" />
              {lang === 'EN' ? 'Sphere Surface Area Calculator' : 'เครื่องมือคำนวณพื้นที่ผิวทรงกลม'}
            </h2>
            <p className="text-blue-100 opacity-90">
              {lang === 'EN' 
                ? 'Calculate sphere surface area, volume, and diameter from various inputs.' 
                : 'หาพื้นที่ผิว ปริมาตร และมิติต่างๆ ของทรงกลมได้อย่างง่ายดาย'}
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-gray-200 bg-gray-50/50">
          <button
            onClick={() => handleModeChange('radius')}
            className={`flex-1 py-4 text-center font-semibold text-sm transition-colors border-b-2 ${
              calcMode === 'radius' 
                ? 'border-blue-500 text-blue-600 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
            }`}
          >
            {lang === 'EN' ? 'By Radius (r)' : 'คำนวณด้วย รัศมี (r)'}
          </button>
          <button
            onClick={() => handleModeChange('diameter')}
            className={`flex-1 py-4 text-center font-semibold text-sm transition-colors border-b-2 ${
              calcMode === 'diameter' 
                ? 'border-blue-500 text-blue-600 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
            }`}
          >
            {lang === 'EN' ? 'By Diameter (d)' : 'คำนวณด้วย เส้นผ่านศูนย์กลาง (d)'}
          </button>
          <button
            onClick={() => handleModeChange('surface')}
            className={`flex-1 py-4 text-center font-semibold text-sm transition-colors border-b-2 ${
              calcMode === 'surface' 
                ? 'border-blue-500 text-blue-600 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
            }`}
          >
            {lang === 'EN' ? 'By Surface Area (A)' : 'คำนวณย้อนกลับด้วย พื้นที่ผิว (A)'}
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Input panel */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {calcMode === 'radius' && (lang === 'EN' ? 'Radius (r)' : 'รัศมีของทรงกลม (r)')}
                  {calcMode === 'diameter' && (lang === 'EN' ? 'Diameter (d)' : 'เส้นผ่านศูนย์กลาง (d)')}
                  {calcMode === 'surface' && (lang === 'EN' ? 'Surface Area (A)' : 'พื้นที่ผิวของทรงกลม (A)')}
                </label>
                <input
                  type="number"
                  step="any"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg"
                  placeholder="e.g. 5"
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

            {/* Visual SVG sphere preview with 3D gradient */}
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">
                {lang === 'EN' ? 'Sphere 3D Model' : 'แบบจำลองทรงกลมสามมิติ'}
              </h3>
              
              <div className="relative w-44 h-44 bg-white rounded-2xl shadow-inner border border-gray-200 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#93c5fd" />
                      <stop offset="40%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1e3a8a" />
                    </radialGradient>
                  </defs>
                  
                  <g transform={`translate(50, 50) scale(${scale}) translate(-50, -50)`}>
                    {/* The 3D Gradient Shaded Sphere */}
                    <circle cx="50" cy="50" r="40" fill="url(#sphereGrad)" />
                    
                    {/* Horizontal Equator (dashed) */}
                    <ellipse cx="50" cy="50" rx="40" ry="12" fill="none" stroke="#bfdbfe" strokeWidth="1" strokeDasharray="3,2" opacity="0.8" />
                    
                    {/* Vertical Meridian (dashed) */}
                    <ellipse cx="50" cy="50" rx="12" ry="40" fill="none" stroke="#bfdbfe" strokeWidth="1" strokeDasharray="3,2" opacity="0.8" />

                    {/* Radius indicator line */}
                    <line x1="50" y1="50" x2="90" y2="50" stroke="#f8fafc" strokeWidth="2" strokeDasharray="2,2" />
                    <circle cx="50" cy="50" r="2" fill="#ffffff" />
                    <circle cx="90" cy="50" r="2.5" fill="#ffffff" />
                  </g>
                </svg>
                {radius && (
                  <span className="absolute bottom-2 text-xs font-mono font-bold text-blue-700">
                    r = {radius.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center max-w-xs">
                {lang === 'EN' 
                  ? 'Visual representation of the sphere. The dotted line shows the radius (r).' 
                  : 'แบบจำลองทรงกลมสามมิติ โดยมีเส้นประสีขาวแสดงระยะความยาวรัศมี (r)'}
              </p>
            </div>
          </div>

          {/* Results section */}
          {radius !== null && diameter !== null && surfaceArea !== null && volume !== null && !error && (
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                {lang === 'EN' ? 'Calculation Results' : 'ผลลัพธ์การคำนวณทั้งหมด'}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Radius */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-blue-100 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Radius (r)' : 'รัศมี (r)'}
                  </span>
                  <span className="text-lg font-black text-blue-700">{radius.toFixed(4)}</span>
                </div>

                {/* Diameter */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-blue-100 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Diameter (d)' : 'เส้นผ่านศูนย์กลาง (d)'}
                  </span>
                  <span className="text-lg font-black text-cyan-700">{diameter.toFixed(4)}</span>
                </div>

                {/* Surface Area */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-blue-100 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Surface Area (A)' : 'พื้นที่ผิว (A)'}
                  </span>
                  <span className="text-lg font-black text-indigo-700">{surfaceArea.toFixed(4)}</span>
                </div>

                {/* Volume */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-blue-100 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Volume (V)' : 'ปริมาตร (V)'}
                  </span>
                  <span className="text-lg font-black text-purple-700">{volume.toFixed(4)}</span>
                </div>
              </div>

              {/* Steps */}
              <div className="mt-4 pt-4 border-t border-blue-200/50 text-sm text-blue-800 space-y-1">
                <p>
                  <strong>{lang === 'EN' ? 'Steps and Formulas:' : 'ขั้นตอนการคำนวณและสูตร:'}</strong>
                </p>
                {calcMode === 'radius' && (
                  <p>
                    {lang === 'EN' ? '1. Use input radius directly:' : '1. ใช้รัศมีที่ผู้ใช้ระบุโดยตรง:'} r = {radius.toFixed(4)}
                  </p>
                )}
                {calcMode === 'diameter' && (
                  <p>
                    {lang === 'EN' ? '1. Calculate radius from diameter:' : '1. หารัศมีจากเส้นผ่านศูนย์กลาง:'} r = d / 2 = {inputValue} / 2 = {radius.toFixed(4)}
                  </p>
                )}
                {calcMode === 'surface' && (
                  <p>
                    {lang === 'EN' ? '1. Calculate radius from surface area:' : '1. ค้นหารัศมีด้วยการคำนวณกลับจากพื้นที่ผิว:'} r = &radic;(A / 4&pi;) = &radic;({inputValue} / 12.56637) = {radius.toFixed(4)}
                  </p>
                )}
                <p>
                  2. {lang === 'EN' ? 'Calculate Surface Area:' : 'คำนวณพื้นที่ผิว:'} A = 4 &times; &pi; &times; r² = 4 &times; 3.14159 &times; {radius.toFixed(4)}² = {surfaceArea.toFixed(4)}
                </p>
                <p>
                  3. {lang === 'EN' ? 'Calculate Volume:' : 'คำนวณปริมาตร:'} V = (4/3) &times; &pi; &times; r³ = 1.33333 &times; 3.14159 &times; {radius.toFixed(4)}³ = {volume.toFixed(4)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Thai Article */}
      <article className="prose prose-blue max-w-none bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">
          การคำนวณหาพื้นที่ผิวของทรงกลม (Sphere Surface Area) และทฤษฎีเรขาคณิตที่เกี่ยวข้อง
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          <strong>ทรงกลม (Sphere)</strong> คือ รูปทรงเรขาคณิตสามมิติที่สมมาตรอย่างสมบูรณ์แบบในทุกมิติ โดยนิยามทางคณิตศาสตร์ ทรงกลมถูกสร้างขึ้นมาจากเซตของจุดทั้งหมดในพื้นที่สามมิติที่มีระยะห่างเท่าๆ กันจากจุดศูนย์กลางจุดหนึ่ง ซึ่งระยะทางคงที่ดังกล่าวเรียกว่า <strong>รัศมี (Radius: r)</strong> และเส้นที่ลากผ่านจุดศูนย์กลางเชื่อมขอบทั้งสองด้านเรียกว่า <strong>เส้นผ่านศูนย์กลาง (Diameter: d)</strong> การหาพื้นที่สัมผัสภายนอกทั้งหมดเรียกว่า <strong>พื้นที่ผิวของทรงกลม</strong> ซึ่งมีสูตรและวิธีการคำนวณเฉพาะที่มีความสำคัญยิ่งในดาราศาสตร์ ฟิสิกส์ และวิศวกรรมการผลิต
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">สูตรคำนวณพื้นที่ผิวของทรงกลม</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          สูตรในการหาพื้นที่ผิวของทรงกลมมีความสัมพันธ์กับรัศมี r และค่าคงที่ทางคณิตศาสตร์อย่าง &pi; (พาย ซึ่งมีค่าประมาณ 3.14159 หรือ 22/7) โดยมีโครงสร้างสูตรดังนี้:
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg font-mono text-center text-lg font-semibold text-blue-900">
          พื้นที่ผิว (Surface Area) = 4 &times; &pi; &times; r²
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          ในขณะที่สูตรการคำนวณหาปริมาตร (มวลความจุภายใน) ของทรงกลมคือ:
        </p>
        <div className="bg-blue-50 border-l-4 border-cyan-500 p-4 mb-6 rounded-r-lg font-mono text-center text-lg font-semibold text-cyan-900">
          ปริมาตร (Volume) = (4 / 3) &times; &pi; &times; r³
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">การคำนวณกลับเพื่อหาตัวแปรอื่น (Reverse Calculation)</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          ในทางปฏิบัติ บางครั้งเราทราบปริมาณพื้นที่ผิวรอบนอก และจำเป็นต้องระบุขนาดสัดส่วนการผลิต เช่น ความยาวรัศมี เราสามารถย้ายสมการเพื่อคำนวณกลับได้ดังนี้:
        </p>
        <div className="bg-blue-50 border-l-4 border-indigo-500 p-4 mb-6 rounded-r-lg font-mono text-center text-lg font-semibold text-indigo-900">
          รัศมี (r) = &radic;[ พื้นที่ผิว (A) / (4 &times; &pi;) ]
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">ตัวอย่างโจทย์แสดงการคำนวณจริง</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>ตัวอย่าง:</strong> ต้องการหาพื้นที่ผิวสัมผัสภายนอกของลูกโลกจำลองซึ่งมีเส้นผ่านศูนย์กลางยาว 20 เซนติเมตร
        </p>
        <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
          <li><strong>หารัศมี (r):</strong> เนื่องจากข้อมูลระบุเป็นเส้นผ่านศูนย์กลาง 20 ซม. ดังนั้น รัศมี r = 20 / 2 = 10 เซนติเมตร</li>
          <li><strong>คำนวณพื้นที่ผิว:</strong> เข้าสูตร A = 4 &times; &pi; &times; 10²
            <br /> A &approx; 4 &times; 3.14159 &times; 100
            <br /> A &approx; 1,256.64 ตารางเซนติเมตร
          </li>
          <li><strong>คำตอบ:</strong> ลูกโลกจำลองนี้มีพื้นที่ผิวทั้งหมดประมาณ 1,256.64 ตารางเซนติเมตร</li>
        </ol>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">ความสำคัญทางวิศวกรรมและปรากฏการณ์ธรรมชาติ</h3>
        <p className="text-gray-700 leading-relaxed">
          ในเชิงฟิสิกส์ รูปทรงกลมเป็นรูปทรงที่มีคุณสมบัติเฉพาะที่ยอดเยี่ยม คือเป็น <strong>"รูปทรงที่มีสัดส่วนพื้นที่ผิวภายนอกน้อยที่สุด เมื่อเทียบกับปริมาตรบรรจุภายในที่เท่ากัน"</strong> ด้วยเหตุนี้ ถังเก็บแก๊สแรงดันสูง ถังเก็บสารเคมี ตลอดจนดวงดาวขนาดใหญ่ในจักรวาล (ที่ยุบตัวด้วยแรงโน้มถ่วงรอบทิศทางอย่างเท่าเทียม) จึงมีลักษณะเป็นทรงกลมตามธรรมชาติ การใช้รูปทรงกลมในถังแก๊สช่วยกระจายแรงดันได้อย่างสม่ำเสมอ ลดความเสี่ยงในการระเบิดที่มักจะเกิดตามรอยต่อหรือมุมแหลมของรูปทรงสี่เหลี่ยม และช่วยประหยัดวัตถุดิบในการสร้างผนังหุ้มถังได้อย่างสมบูรณ์แบบ
        </p>
      </article>
    </div>
  );
}

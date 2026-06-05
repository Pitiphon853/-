"use client";

import React, { useState, useEffect } from 'react';
import { Compass, Calculator, RotateCcw, HelpCircle } from 'lucide-react';

export default function TrigArcCos({ lang }: any) {
  const [inputValue, setInputValue] = useState<string>('0.5');
  const [error, setError] = useState<string | null>(null);
  const [degrees, setDegrees] = useState<number | null>(60);
  const [radians, setRadians] = useState<number | null>(Math.PI / 3);
  const [piFraction, setPiFraction] = useState<string | null>('π/3');

  const calculateArcCos = (valStr: string) => {
    if (valStr.trim() === '') {
      setDegrees(null);
      setRadians(null);
      setPiFraction(null);
      setError(null);
      return;
    }

    const val = parseFloat(valStr);
    if (isNaN(val)) {
      setError(lang === 'EN' ? 'Please enter a valid number.' : 'กรุณากรอกตัวเลขที่ถูกต้อง');
      setDegrees(null);
      setRadians(null);
      setPiFraction(null);
      return;
    }

    if (val < -1 || val > 1) {
      setError(lang === 'EN' ? 'Input must be between -1 and 1' : 'ค่าต้องอยู่ระหว่าง -1 ถึง 1');
      setDegrees(null);
      setRadians(null);
      setPiFraction(null);
      return;
    }

    setError(null);
    const rad = Math.acos(val);
    const deg = rad * (180 / Math.PI);

    setRadians(rad);
    setDegrees(deg);

    // Approximate fraction of Pi for display
    const ratio = rad / Math.PI;
    const commonFractions = [
      { r: 0, text: '0' },
      { r: 1/6, text: 'π/6' },
      { r: 1/4, text: 'π/4' },
      { r: 1/3, text: 'π/3' },
      { r: 1/2, text: 'π/2' },
      { r: 2/3, text: '2π/3' },
      { r: 3/4, text: '3π/4' },
      { r: 5/6, text: '5π/6' },
      { r: 1, text: 'π' }
    ];

    let foundFraction = false;
    for (const f of commonFractions) {
      if (Math.abs(ratio - f.r) < 0.001) {
        setPiFraction(f.text);
        foundFraction = true;
        break;
      }
    }
    if (!foundFraction) {
      setPiFraction(`${ratio.toFixed(4)}π`);
    }
  };

  useEffect(() => {
    calculateArcCos(inputValue);
  }, [inputValue, lang]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearFields = () => {
    setInputValue('');
    setDegrees(null);
    setRadians(null);
    setPiFraction(null);
    setError(null);
  };

  // Helper for drawing unit circle project representation
  const getCircleCoordinates = () => {
    if (degrees === null) return { x: 50, y: 50, px: 50, py: 50 };
    // SVG coordinates centered at (50, 50) with radius 40
    // cos(theta) is standard X axis direction.
    // In SVG, Y axis points down, so we invert Y coordinate to make positive angle look counter-clockwise (going up)
    const angleRad = degrees * (Math.PI / 180);
    const radius = 40;
    const x = 50 + radius * Math.cos(angleRad);
    const y = 50 - radius * Math.sin(angleRad); // negative because Y goes down in SVG
    const px = 50 + radius * Math.cos(angleRad); // projection on X axis
    const py = 50;
    return { x, y, px, py };
  };

  const { x, y, px, py } = getCircleCoordinates();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
              <Compass className="h-8 w-8 animate-spin-slow" />
              {lang === 'EN' ? 'ArcCos (Inverse Cosine) Calculator' : 'เครื่องมือคำนวณตรีโกณมิติย้อนกลับ ArcCos'}
            </h2>
            <p className="text-blue-100 opacity-90">
              {lang === 'EN' 
                ? 'Find the angle whose cosine is a given number.' 
                : 'คำนวณหาค่ามุมในหน่วยองศาและเรเดียนจากอัตราส่วนโคไซน์ (Cosine)'}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Input fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {lang === 'EN' ? 'Cosine Value (x) [-1 to 1]' : 'ค่าโคไซน์ (x) [ระว่าง -1 ถึง 1]'}
                </label>
                <input
                  type="number"
                  step="any"
                  min="-1"
                  max="1"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg"
                  placeholder="e.g. 0.5"
                />
              </div>

              {/* Slider for interactive use */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex justify-between">
                  <span>{lang === 'EN' ? 'Interactive Slider' : 'เลื่อนเพื่อปรับค่าแบบเรียลไทม์'}</span>
                  <span className="font-mono font-bold text-blue-600">{parseFloat(inputValue || '0').toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.01"
                  value={inputValue === '' ? '0' : inputValue}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1 font-mono">
                  <span>-1.0</span>
                  <span>0.0</span>
                  <span>1.0</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={clearFields}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  {lang === 'EN' ? 'Reset' : 'ล้างค่า'}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-medium">
                  {error}
                </div>
              )}
            </div>

            {/* Visual circle preview */}
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">
                {lang === 'EN' ? 'Unit Circle Visualization' : 'ภาพจำลองบนวงกลมหนึ่งหน่วย'}
              </h3>
              
              <div className="relative w-44 h-44 bg-white rounded-full shadow-inner border border-gray-200 flex items-center justify-center">
                {/* SVG for circle */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Axis lines */}
                  <line x1="10" y1="50" x2="90" y2="50" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="50" y1="10" x2="50" y2="90" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* The outer circle */}
                  <circle cx="50" cy="50" r="40" stroke="#9ca3af" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
                  
                  {degrees !== null && (
                    <>
                      {/* Arc for Angle */}
                      <path
                        d={`M 90 50 A 40 40 0 ${degrees > 180 ? 1 : 0} 0 ${x} ${y}`}
                        fill="none"
                        stroke="#bfdbfe"
                        strokeWidth="8"
                        opacity="0.5"
                      />
                      
                      {/* Cosine projection (horizontal line) */}
                      <line x1="50" y1="50" x2={px} y2={py} stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                      
                      {/* Radial line */}
                      <line x1="50" y1="50" x2={x} y2={y} stroke="#2563eb" strokeWidth="2.5" />
                      
                      {/* Projection vertical helper */}
                      <line x1={x} y1={y} x2={px} y2={py} stroke="#9ca3af" strokeWidth="1" strokeDasharray="2,2" />
                      
                      {/* Angle point */}
                      <circle cx={x} cy={y} r="4" fill="#2563eb" />
                    </>
                  )}
                  {/* Origin */}
                  <circle cx="50" cy="50" r="2.5" fill="#374151" />
                </svg>
                
                <span className="absolute bottom-2 text-[10px] font-semibold text-red-500">
                  x (cos) = {parseFloat(inputValue || '0').toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center max-w-xs">
                {lang === 'EN' 
                  ? 'The blue line indicates the angle, and the red line represents the cosine value on the X-axis.' 
                  : 'เส้นสีน้ำเงินคือทิศทางของมุม เส้นสีแดงแสดงระยะค่าโคไซน์บนแกน X'}
              </p>
            </div>
          </div>

          {/* Results Section */}
          {degrees !== null && radians !== null && (
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                {lang === 'EN' ? 'Calculation Results' : 'ผลลัพธ์การคำนวณ'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Result Degrees */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 text-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Degrees' : 'องศา (Degrees)'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-blue-700">
                    {degrees.toFixed(4)}°
                  </span>
                </div>

                {/* Result Radians Decimal */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 text-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Radians (Decimal)' : 'เรเดียน (ทศนิยม)'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-indigo-700">
                    {radians.toFixed(5)} rad
                  </span>
                </div>

                {/* Result Radians in Pi */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 text-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Pi Representation' : 'ในรูปของค่า π'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-purple-700">
                    {piFraction}
                  </span>
                </div>
              </div>

              {/* Steps/Explanation */}
              <div className="mt-4 pt-4 border-t border-blue-200/50 text-sm text-blue-800 space-y-1">
                <p>
                  <strong>{lang === 'EN' ? 'Formula:' : 'สูตรคำนวณ:'}</strong> y = arccos(x) &rArr; cos(y) = x
                </p>
                <p>
                  <strong>{lang === 'EN' ? 'Calculated angle in Radians:' : 'มุมที่คำนวณได้ในหน่วยเรเดียน:'}</strong> arccos({inputValue}) = {radians.toFixed(6)} rad
                </p>
                <p>
                  <strong>{lang === 'EN' ? 'Convert to Degrees:' : 'แปลงเป็นหน่วยองศา:'}</strong> {radians.toFixed(6)} &times; (180 / π) = {degrees.toFixed(4)}°
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Thai Article */}
      <article className="prose prose-blue max-w-none bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">
          ทำความเข้าใจฟังก์ชัน ArcCos (Inverse Cosine) และการหาค่ามุมย้อนกลับ
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          ในวิชาคณิตศาสตร์ โดยเฉพาะบทเรียนด้าน <strong>ตรีโกณมิติ (Trigonometry)</strong> เรามักคุ้นเคยกับฟังก์ชันพื้นฐานอย่าง Cosine (โคไซน์ หรือ cos) ซึ่งเป็นการป้อนขนาดของมุมเพื่อคำนวณหาอัตราส่วนของ <em>"ความยาวด้านประชิดมุม หารด้วย ความยาวด้านตรงข้ามมุมฉาก"</em> ของรูปสามเหลี่ยมมุมฉาก แต่ในทางกลับกัน หากสิ่งที่คุณทราบคือค่าอัตราส่วนดังกล่าว และต้องการหาคำตอบว่ามุมนั้นมีขนาดกี่องศาหรือกี่เรเดียน ฟังก์ชันที่จะช่วยให้เราได้คำตอบนี้คือ <strong>ArcCos (Arccosine)</strong> หรือที่เขียนแทนด้วยสัญลักษณ์ <strong>cos<sup>-1</sup>(x)</strong>
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">โดเมนและเรนจ์ของฟังก์ชัน ArcCos ที่ควรรู้</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          เนื่องจากฟังก์ชัน Cosine ปกติ มีขอบเขตค่าผลลัพธ์อยู่ระหว่าง -1 ถึง 1 เสมอ (สำหรับจำนวนจริงใดๆ) ส่งผลให้ฟังก์ชันย้อนกลับอย่าง ArcCos มีข้อจำกัดที่สำคัญอย่างยิ่งด้านคณิตศาสตร์ ดังนี้:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>
            <strong>โดเมน (Domain):</strong> ค่าอินพุต (x) ที่จะนำมาหาค่า ArcCos ได้นั้น จะต้องอยู่ในช่วงปิด <strong>[-1, 1]</strong> หรือกล่าวคือ <code>{"-1 <= x <= 1"}</code> เท่านั้น หากป้อนค่าอื่นนอกเหนือจากนี้ เช่น 1.5 หรือ -2 จะไม่สามารถหาคำตอบในระบบจำนวนจริงได้ (เกิดข้อผิดพลาดทางคณิตศาสตร์)
          </li>
          <li>
            <strong>เรนจ์ (Range):</strong> เพื่อให้ฟังก์ชันผกผันนี้ให้ผลลัพธ์เพียงค่าเดียวที่ชัดเจน นักคณิตศาสตร์จึงกำหนดขอบเขตของผลลัพธ์ (มุม y) ให้อยู่ในช่วง <strong>[0, π] เรเดียน</strong> หรือเทียบเท่ากับ <strong>0 ถึง 180 องศา</strong> เสมอ
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">สูตรและความสัมพันธ์ทางคณิตศาสตร์</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          ความสัมพันธ์หลักของฟังก์ชันนี้สามารถสรุปได้ง่ายๆ ดังนี้:
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg font-mono text-center text-lg font-semibold text-blue-900">
          y = arccos(x) &nbsp;&hArr;&nbsp; cos(y) = x
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          เมื่อเราคำนวณหาค่ามุมในหน่วยเรเดียนได้แล้ว และต้องการแปลงเป็นหน่วยองศาที่เข้าใจง่ายในชีวิตประจำวัน สามารถใช้สูตรความสัมพันธ์ต่อไปนี้:
        </p>
        <div className="bg-blue-50 border-l-4 border-indigo-500 p-4 mb-6 rounded-r-lg font-mono text-center text-lg font-semibold text-indigo-900">
          มุม (องศา) = มุม (เรเดียน) &times; (180 / &pi;)
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">ตารางค่ามุมมาตรฐานของ ArcCos</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          เพื่อความรวดเร็วในการทำงานหรือทำข้อสอบ ต่อไปนี้คือตัวอย่างค่ามุมมาตรฐานที่เป็นที่รู้จักกันดี:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-200 text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b font-bold text-gray-700">ค่าอัตราส่วน x</th>
                <th className="py-3 px-4 border-b font-bold text-gray-700">มุมในหน่วยเรเดียน (Radians)</th>
                <th className="py-3 px-4 border-b font-bold text-gray-700">มุมในหน่วยองศา (Degrees)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b font-mono">1</td>
                <td className="py-2 px-4 border-b">0</td>
                <td className="py-2 px-4 border-b">0°</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-gray-50/50">
                <td className="py-2 px-4 border-b font-mono">&radic;3 / 2 (~0.866)</td>
                <td className="py-2 px-4 border-b">&pi; / 6</td>
                <td className="py-2 px-4 border-b">30°</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b font-mono">&radic;2 / 2 (~0.707)</td>
                <td className="py-2 px-4 border-b">&pi; / 4</td>
                <td className="py-2 px-4 border-b">45°</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-gray-50/50">
                <td className="py-2 px-4 border-b font-mono">0.5</td>
                <td className="py-2 px-4 border-b">&pi; / 3</td>
                <td className="py-2 px-4 border-b">60°</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b font-mono">0</td>
                <td className="py-2 px-4 border-b">&pi; / 2</td>
                <td className="py-2 px-4 border-b">90°</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-gray-50/50">
                <td className="py-2 px-4 border-b font-mono">-0.5</td>
                <td className="py-2 px-4 border-b">2&pi; / 3</td>
                <td className="py-2 px-4 border-b">120°</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b font-mono">-1</td>
                <td className="py-2 px-4 border-b">&pi;</td>
                <td className="py-2 px-4 border-b">180°</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">การประยุกต์ใช้งานในวิทยาศาสตร์และวิศวกรรม</h3>
        <p className="text-gray-700 leading-relaxed">
          ฟังก์ชันผกผันของโคไซน์มีบทบาทสำคัญในหลากหลายอุตสาหกรรม ตัวอย่างที่เด่นชัดที่สุด ได้แก่ <strong>การคำนวณหามุมระหว่างเวกเตอร์สองตัว</strong> ในงานกราฟิกสามมิติและการพัฒนาเกมคอมพิวเตอร์ ซึ่งใช้หลักการ Dot Product ของเวกเตอร์ที่มีสูตรสัมพันธ์กับ Cosine นอกจากนี้ยังใช้ในระบบนำทางและการบิน (เช่น การหามุมเงยและพิกัดทิศทาง) รวมไปถึงระบบวิเคราะห์โครงสร้างวิศวกรรมโยธา เพื่อประเมินทิศทางแรงและการกระจายน้ำหนักของสะพานและอาคารสูง
        </p>
      </article>
    </div>
  );
}

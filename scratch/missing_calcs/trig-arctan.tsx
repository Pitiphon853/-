"use client";

import React, { useState, useEffect } from 'react';
import { Compass, Calculator, RotateCcw } from 'lucide-react';

export default function TrigArcTan({ lang }: any) {
  const [inputValue, setInputValue] = useState<string>('1');
  const [error, setError] = useState<string | null>(null);
  const [degrees, setDegrees] = useState<number | null>(45);
  const [radians, setRadians] = useState<number | null>(Math.PI / 4);
  const [piFraction, setPiFraction] = useState<string | null>('π/4');

  const calculateArcTan = (valStr: string) => {
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

    setError(null);
    const rad = Math.atan(val);
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
      { r: -1/6, text: '-π/6' },
      { r: -1/4, text: '-π/4' },
      { r: -1/3, text: '-π/3' },
      { r: -1/2, text: '-π/2' }
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
    calculateArcTan(inputValue);
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

  // Helper for drawing triangle representation based on height/base ratio
  const getTriangleCoords = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return { hX: 80, hY: 50, bX: 80, bY: 80, oX: 20, oY: 80 };
    // Base is fixed from x=20 to x=70 (length = 50)
    // Height is 50 * value
    // Let's cap the visual height representation to avoid clipping
    const visualValue = Math.max(-2, Math.min(2, val));
    const oX = 20;
    const oY = 50; // shift center to 50
    const bX = 70;
    const bY = 50;
    const hX = 70;
    const hY = 50 - 25 * visualValue; // negative because Y goes down in SVG
    return { hX, hY, bX, bY, oX, oY };
  };

  const { hX, hY, bX, bY, oX, oY } = getTriangleCoords();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 sm:p-8 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
              <Compass className="h-8 w-8" />
              {lang === 'EN' ? 'ArcTan (Inverse Tangent) Calculator' : 'เครื่องมือคำนวณตรีโกณมิติย้อนกลับ ArcTan'}
            </h2>
            <p className="text-emerald-100 opacity-90">
              {lang === 'EN' 
                ? 'Find the angle whose tangent is a given number.' 
                : 'คำนวณหาค่ามุมในหน่วยองศาและเรเดียนจากอัตราส่วนแทนเจนต์ (Tangent)'}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Input fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {lang === 'EN' ? 'Tangent Value (x) [Any number]' : 'ค่าแทนเจนต์ (x) [สามารถป้อนจำนวนจริงใดๆ ก็ได้]'}
                </label>
                <input
                  type="number"
                  step="any"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all text-lg"
                  placeholder="e.g. 1"
                />
              </div>

              {/* Slider for interactive use */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex justify-between">
                  <span>{lang === 'EN' ? 'Interactive Slider (Quick adjust)' : 'เลื่อนเพื่อปรับค่าแบบรวดเร็ว'}</span>
                  <span className="font-mono font-bold text-emerald-600">{parseFloat(inputValue || '0').toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.05"
                  value={inputValue === '' ? '0' : inputValue}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1 font-mono">
                  <span>-5.0</span>
                  <span>0.0</span>
                  <span>5.0</span>
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

            {/* Visual triangle preview */}
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">
                {lang === 'EN' ? 'Geometric Visualization' : 'ภาพจำลองเรขาคณิตสามเหลี่ยม'}
              </h3>
              
              <div className="relative w-44 h-44 bg-white rounded-2xl shadow-inner border border-gray-200 flex items-center justify-center">
                {/* SVG for triangle */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Grid / Reference Lines */}
                  <line x1="20" y1="50" x2="80" y2="50" stroke="#f3f4f6" strokeWidth="1" />
                  
                  {/* Base line */}
                  <line x1={oX} y1={oY} x2={bX} y2={bY} stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
                  
                  {/* Height line */}
                  <line x1={bX} y1={bY} x2={hX} y2={hY} stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                  
                  {/* Hypotenuse line */}
                  <line x1={oX} y1={oY} x2={hX} y2={hY} stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
                  
                  {/* Right angle indicator */}
                  {parseFloat(inputValue) !== 0 && (
                    <path
                      d={parseFloat(inputValue) > 0 
                        ? `M 65 50 L 65 45 L 70 45`
                        : `M 65 50 L 65 55 L 70 55`
                      }
                      fill="none"
                      stroke="#9ca3af"
                      strokeWidth="1"
                    />
                  )}
                  
                  {/* Origin point marker */}
                  <circle cx={oX} cy={oY} r="3" fill="#10b981" />
                  <circle cx={hX} cy={hY} r="3" fill="#ef4444" />
                </svg>
                
                <span className="absolute left-6 bottom-16 text-[10px] font-bold text-emerald-600">
                  Base = 1
                </span>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] font-bold text-red-500">
                  Height = {parseFloat(inputValue || '0').toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center max-w-xs">
                {lang === 'EN' 
                  ? 'The green hypotenuse represents the resulting angle from the base (1) and height (x).' 
                  : 'เส้นแทยงมุมสีเขียวจะกางออกเป็นมุมตามอัตราส่วนระหว่างความสูง (สีแดง) และฐาน (สีเทา)'}
              </p>
            </div>
          </div>

          {/* Results Section */}
          {degrees !== null && radians !== null && (
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                {lang === 'EN' ? 'Calculation Results' : 'ผลลัพธ์การคำนวณ'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Result Degrees */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100 text-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Degrees' : 'องศา (Degrees)'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-700">
                    {degrees.toFixed(4)}°
                  </span>
                </div>

                {/* Result Radians Decimal */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100 text-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Radians (Decimal)' : 'เรเดียน (ทศนิยม)'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-teal-700">
                    {radians.toFixed(5)} rad
                  </span>
                </div>

                {/* Result Radians in Pi */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100 text-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Pi Representation' : 'ในรูปของค่า π'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-indigo-700">
                    {piFraction}
                  </span>
                </div>
              </div>

              {/* Steps/Explanation */}
              <div className="mt-4 pt-4 border-t border-emerald-200/50 text-sm text-emerald-800 space-y-1">
                <p>
                  <strong>{lang === 'EN' ? 'Formula:' : 'สูตรคำนวณ:'}</strong> y = arctan(x) &rArr; tan(y) = x
                </p>
                <p>
                  <strong>{lang === 'EN' ? 'Calculated angle in Radians:' : 'มุมที่คำนวณได้ในหน่วยเรเดียน:'}</strong> arctan({inputValue}) = {radians.toFixed(6)} rad
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
      <article className="prose prose-emerald max-w-none bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">
          ทำความเข้าใจฟังก์ชัน ArcTan (Inverse Tangent) และวิธีการคำนวณหามุม
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          ในวิชาตรีโกณมิติและคณิตศาสตร์ประยุกต์ ฟังก์ชัน <strong>ArcTan (Arctangent)</strong> หรือที่มักเขียนแทนด้วยสัญลักษณ์ <strong>arctan(x)</strong> หรือ <strong>tan<sup>-1</sup>(x)</strong> เป็นฟังก์ชันตรีโกณมิติย้อนกลับที่มีประโยชน์อย่างยิ่ง หน้าที่หลักของมันคือการแปลงค่าอัตราส่วนความยาวของด้าน <em>"ตรงข้ามมุม (Opposite) หารด้วย ประชิดมุม (Adjacent)"</em> ของรูปสามเหลี่ยมมุมฉาก กลับมาให้เป็นขนาดของมุมจริงในหน่วยองศาหรือเรเดียน ซึ่งเป็นคู่ตรงข้ามโดยตรงกับฟังก์ชัน Tangent (tan) ปกติ
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">ทำไมโดเมนของ ArcTan จึงไม่มีข้อจำกัด?</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          ความแตกต่างที่เด่นชัดที่สุดประการหนึ่งระหว่าง ArcTan กับฟังก์ชันผกผันอื่นๆ เช่น ArcCos หรือ ArcSin ก็คือ <strong>ขอบเขตของโดเมน (Domain)</strong>:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>
            <strong>โดเมน (Domain):</strong> คือ เซตของจำนวนจริงทั้งหมด <strong>(-&infin;, +&infin;)</strong> นั่นหมายความว่า คุณสามารถหาค่า ArcTan ของจำนวนจริงใดๆ ก็ได้ ไม่ว่าจะเป็นตัวเลขบวกที่มากมหาศาล ตัวเลขติดลบ หรือศูนย์ เนื่องจากในรูปสามเหลี่ยมมุมฉาก ด้านตรงข้ามและด้านประชิดสามารถมีอัตราส่วนความยาวเท่าใดก็ได้โดยไม่มีขีดจำกัด
          </li>
          <li>
            <strong>เรนจ์ (Range):</strong> เพื่อรักษานิยามความเป็นฟังก์ชันทางคณิตศาสตร์ ผลลัพธ์ของ ArcTan จะถูกจำกัดให้อยู่ในช่วงเปิด <strong>(-&pi;/2, &pi;/2) เรเดียน</strong> หรือเทียบเท่ากับช่วง <strong>-90 องศา ถึง +90 องศา</strong> (ไม่รวม -90° และ +90°)
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">สูตรคณิตศาสตร์พื้นฐาน</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          ความสัมพันธ์ที่อธิบายถึงฟังก์ชัน ArcTan มีดังนี้:
        </p>
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-6 rounded-r-lg font-mono text-center text-lg font-semibold text-emerald-950">
          y = arctan(x) &nbsp;&hArr;&nbsp; tan(y) = x
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          และเมื่อต้องการเปลี่ยนคำตอบจากค่าเรเดียนให้กลายเป็นค่ามุมองศาที่เราเข้าใจได้ง่าย:
        </p>
        <div className="bg-emerald-50 border-l-4 border-teal-500 p-4 mb-6 rounded-r-lg font-mono text-center text-lg font-semibold text-teal-950">
          มุม (องศา) = มุม (เรเดียน) &times; (180 / &pi;)
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">ตารางเปรียบเทียบค่า ArcTan ที่พบบ่อย</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          ตัวอย่างค่าแทนเจนต์และมุมที่ตอบรับกันที่พบเจอบ่อยในวิชาเรียน:
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
                <td className="py-2 px-4 border-b font-mono">0</td>
                <td className="py-2 px-4 border-b">0</td>
                <td className="py-2 px-4 border-b">0°</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-gray-50/50">
                <td className="py-2 px-4 border-b font-mono">1 / &radic;3 (~0.577)</td>
                <td className="py-2 px-4 border-b">&pi; / 6</td>
                <td className="py-2 px-4 border-b">30°</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b font-mono">1</td>
                <td className="py-2 px-4 border-b">&pi; / 4</td>
                <td className="py-2 px-4 border-b">45°</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-gray-50/50">
                <td className="py-2 px-4 border-b font-mono">&radic;3 (~1.732)</td>
                <td className="py-2 px-4 border-b">&pi; / 3</td>
                <td className="py-2 px-4 border-b">60°</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b font-mono">-1</td>
                <td className="py-2 px-4 border-b">-&pi; / 4</td>
                <td className="py-2 px-4 border-b">-45°</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">การประยุกต์ใช้ในวงการพัฒนาซอฟต์แวร์และการนำทาง</h3>
        <p className="text-gray-700 leading-relaxed">
          ในเชิงปฏิบัติ ฟังก์ชัน ArcTan เป็นหัวใจสำคัญของฟังก์ชัน <code>atan2(y, x)</code> ที่ใช้ในภาษาคอมพิวเตอร์เกือบทุกภาษา เพื่อคำนวณหามุมทิศทาง (Bearing หรือ Heading) จากจุดพิกัดสองมิติโดยสามารถแยกแยะความแตกต่างในทั้ง 4 ควอแดรนท์ (Quadrants) ได้อย่างแม่นยำ ซึ่งทำให้คอมพิวเตอร์สามารถรู้ว่ามุมพิกัดหันไปทางทิศใด เช่น ระบบกล้องวงจรปิดหมุนตามเป้าหมาย ยานพาหนะขับเคลื่อนอัตโนมัติหักเลี้ยวทิศทาง ตลอดจนการพัฒนาตัวละครในเกมสามมิติให้หันหน้าไปหาเป้าหมายของผู้เล่นได้อย่างถูกต้องและเป็นธรรมชาติ
        </p>
      </article>
    </div>
  );
}

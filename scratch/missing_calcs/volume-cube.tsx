"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Box } from 'lucide-react';

export default function VolumeCube({ lang }: any) {
  const [calcMode, setCalcMode] = useState<'side' | 'volume' | 'surface'>('side');
  const [inputValue, setInputValue] = useState<string>('5');
  const [error, setError] = useState<string | null>(null);

  // Calculated Results
  const [sideLength, setSideLength] = useState<number | null>(5);
  const [volume, setVolume] = useState<number | null>(125);
  const [surfaceArea, setSurfaceArea] = useState<number | null>(150);
  const [spaceDiagonal, setSpaceDiagonal] = useState<number | null>(8.66025);
  const [faceDiagonal, setFaceDiagonal] = useState<number | null>(7.07107);

  const calculate = () => {
    setError(null);
    const val = parseFloat(inputValue);

    if (inputValue.trim() === '') {
      setSideLength(null);
      setVolume(null);
      setSurfaceArea(null);
      setSpaceDiagonal(null);
      setFaceDiagonal(null);
      return;
    }

    if (isNaN(val) || val <= 0) {
      setError(lang === 'EN' ? 'Value must be a positive number.' : 'ค่าที่ระบุต้องเป็นตัวเลขจำนวนบวกที่มากกว่า 0');
      setSideLength(null);
      setVolume(null);
      setSurfaceArea(null);
      setSpaceDiagonal(null);
      setFaceDiagonal(null);
      return;
    }

    let a = 0;

    if (calcMode === 'side') {
      a = val;
    } else if (calcMode === 'volume') {
      a = Math.cbrt(val);
    } else if (calcMode === 'surface') {
      a = Math.sqrt(val / 6);
    }

    setSideLength(a);
    setVolume(a * a * a);
    setSurfaceArea(6 * a * a);
    setSpaceDiagonal(a * Math.sqrt(3));
    setFaceDiagonal(a * Math.sqrt(2));
  };

  useEffect(() => {
    calculate();
  }, [calcMode, inputValue, lang]);

  const handleModeChange = (mode: 'side' | 'volume' | 'surface') => {
    setCalcMode(mode);
    if (mode === 'side') {
      setInputValue('5');
    } else if (mode === 'volume') {
      setInputValue('125');
    } else if (mode === 'surface') {
      setInputValue('150');
    }
  };

  const clearFields = () => {
    setInputValue('');
    setSideLength(null);
    setVolume(null);
    setSurfaceArea(null);
    setSpaceDiagonal(null);
    setFaceDiagonal(null);
    setError(null);
  };

  // Helper for dynamic isometric cube sizing
  const getCubeScale = () => {
    if (!sideLength) return 1;
    // Normalize side length for visual scaling, cap between 0.4 and 1.3
    const normal = sideLength / 5;
    return Math.max(0.4, Math.min(1.3, normal));
  };

  const scale = getCubeScale();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 sm:p-8 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
              <Box className="h-8 w-8" />
              {lang === 'EN' ? 'Cube Volume & Surface Calculator' : 'เครื่องมือคำนวณลูกบาศก์'}
            </h2>
            <p className="text-purple-100 opacity-90">
              {lang === 'EN' 
                ? 'Calculate volume, surface area, and diagonals of a cube with reverse support.' 
                : 'คำนวณปริมาตร พื้นที่ผิว และเส้นแทยงมุมของรูปทรงลูกบาศก์ในพริบตา'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50/50">
          <button
            onClick={() => handleModeChange('side')}
            className={`flex-1 py-4 text-center font-semibold text-sm transition-colors border-b-2 ${
              calcMode === 'side' 
                ? 'border-purple-500 text-purple-600 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
            }`}
          >
            {lang === 'EN' ? 'By Side Length' : 'หาจากความยาวด้าน'}
          </button>
          <button
            onClick={() => handleModeChange('volume')}
            className={`flex-1 py-4 text-center font-semibold text-sm transition-colors border-b-2 ${
              calcMode === 'volume' 
                ? 'border-purple-500 text-purple-600 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
            }`}
          >
            {lang === 'EN' ? 'By Volume' : 'หาจากปริมาตร'}
          </button>
          <button
            onClick={() => handleModeChange('surface')}
            className={`flex-1 py-4 text-center font-semibold text-sm transition-colors border-b-2 ${
              calcMode === 'surface' 
                ? 'border-purple-500 text-purple-600 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
            }`}
          >
            {lang === 'EN' ? 'By Surface Area' : 'หาจากพื้นที่ผิว'}
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Input panel */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {calcMode === 'side' && (lang === 'EN' ? 'Side Length (a)' : 'ความยาวด้านของลูกบาศก์ (a)')}
                  {calcMode === 'volume' && (lang === 'EN' ? 'Volume (V)' : 'ปริมาตรลูกบาศก์ (V)')}
                  {calcMode === 'surface' && (lang === 'EN' ? 'Total Surface Area (S)' : 'พื้นที่ผิวรวมทั้งหมด (S)')}
                </label>
                <input
                  type="number"
                  step="any"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
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

            {/* Isometric SVG cube representation */}
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">
                {lang === 'EN' ? 'Isometric Model' : 'แบบจำลองสามมิติ (Isometric)'}
              </h3>
              
              <div className="relative w-44 h-44 bg-white rounded-2xl shadow-inner border border-gray-200 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <g transform={`translate(50, 50) scale(${scale}) translate(-50, -50)`}>
                    {/* Top Face */}
                    <polygon points="50,20 80,35 50,50 20,35" fill="#e9d5ff" stroke="#a855f7" strokeWidth="1.5" />
                    {/* Left Face */}
                    <polygon points="20,35 50,50 50,80 20,65" fill="#d8b4fe" stroke="#a855f7" strokeWidth="1.5" />
                    {/* Right Face */}
                    <polygon points="50,50 80,35 80,65 50,80" fill="#c084fc" stroke="#a855f7" strokeWidth="1.5" />
                  </g>
                </svg>
                {sideLength && (
                  <span className="absolute bottom-2 text-xs font-mono font-bold text-purple-700">
                    a = {sideLength.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center max-w-xs">
                {lang === 'EN' 
                  ? 'Visual representation of the cube scaling dynamically based on dimensions.' 
                  : 'รูปทรงลูกบาศก์จะย่อขยายขนาดแปรผันตามสัดส่วนคณิตศาสตร์ของความยาวด้าน'}
              </p>
            </div>
          </div>

          {/* Results section */}
          {sideLength !== null && volume !== null && surfaceArea !== null && !error && (
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
              <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                {lang === 'EN' ? 'Calculation Results' : 'ผลลัพธ์การคำนวณทั้งหมด'}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {/* Side */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-purple-100 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Side Length (a)' : 'ความยาวด้าน'}
                  </span>
                  <span className="text-lg font-black text-purple-700">{sideLength.toFixed(3)}</span>
                </div>

                {/* Volume */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-purple-100 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Volume (V)' : 'ปริมาตร (V)'}
                  </span>
                  <span className="text-lg font-black text-indigo-700">{volume.toFixed(3)}</span>
                </div>

                {/* Surface */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-purple-100 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Surface Area (S)' : 'พื้นที่ผิว (S)'}
                  </span>
                  <span className="text-lg font-black text-fuchsia-700">{surfaceArea.toFixed(3)}</span>
                </div>

                {/* Space diag */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-purple-100 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Space Diag (d)' : 'แทยงมุมรูปทรง'}
                  </span>
                  <span className="text-lg font-black text-sky-700">{spaceDiagonal ? spaceDiagonal.toFixed(3) : '-'}</span>
                </div>

                {/* Face diag */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-purple-100 text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Face Diag' : 'แทยงมุมระนาบ'}
                  </span>
                  <span className="text-lg font-black text-blue-700">{faceDiagonal ? faceDiagonal.toFixed(3) : '-'}</span>
                </div>
              </div>

              {/* Steps */}
              <div className="mt-4 pt-4 border-t border-purple-200/50 text-sm text-purple-800 space-y-1">
                <p>
                  <strong>{lang === 'EN' ? 'Mathematical Steps:' : 'ขั้นตอนและสูตรที่ใช้:'}</strong>
                </p>
                {calcMode === 'side' && (
                  <p>
                    {lang === 'EN' ? 'Given Side length' : 'ทราบความยาวด้าน'} (a) = {sideLength.toFixed(4)}
                  </p>
                )}
                {calcMode === 'volume' && (
                  <p>
                    {lang === 'EN' ? 'Calculate Side length from Volume:' : 'ถอดรากที่สามของปริมาตรเพื่อหาด้าน:'} a = ³&radic;V = ³&radic;{inputValue} = {sideLength.toFixed(4)}
                  </p>
                )}
                {calcMode === 'surface' && (
                  <p>
                    {lang === 'EN' ? 'Calculate Side length from Surface Area:' : 'หาความยาวด้านจากพื้นที่ผิวรวม:'} a = &radic;(S / 6) = &radic;({inputValue} / 6) = {sideLength.toFixed(4)}
                  </p>
                )}
                <p>
                  &bull; {lang === 'EN' ? 'Volume' : 'หาปริมาตร'}: V = a³ = {sideLength.toFixed(4)}³ = {volume.toFixed(4)}
                </p>
                <p>
                  &bull; {lang === 'EN' ? 'Surface Area' : 'หาพื้นที่ผิว'}: S = 6a² = 6 &times; {sideLength.toFixed(4)}² = {surfaceArea.toFixed(4)}
                </p>
                <p>
                  &bull; {lang === 'EN' ? 'Space Diagonal' : 'หาเส้นแทยงมุมภายในกล่อง'}: d = a&radic;3 = {sideLength.toFixed(4)} &times; 1.73205 = {spaceDiagonal ? spaceDiagonal.toFixed(4) : '-'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Thai Article */}
      <article className="prose prose-purple max-w-none bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">
          ทำความเข้าใจสูตรปริมาตรลูกบาศก์ (Cube Volume) และโครงสร้างรูปทรงลูกเต๋า
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          <strong>ลูกบาศก์ (Cube)</strong> หรือมักเรียกกันทั่วไปว่ารูปทรงกล่องสี่เหลี่ยมด้านเท่า คือหนึ่งในรูปทรงเรขาคณิตสามมิติที่เป็นสากลและมีความสมมาตรสูงสุดเป็นไปตามกฎของพลาโตนิค (Platonic Solid) โดยคุณสมบัติพิเศษเด่นชัดของรูปทรงลูกบาศก์ คือการประกอบด้วยผิวหน้าเรียบ 6 ด้านที่เป็น <em>"รูปสี่เหลี่ยมจัตุรัสขนาดเท่ากันทั้งหมด"</em> มีมุมที่บรรจบกันเป็นมุมฉาก (90 องศา) ทั้งหมด และความยาวด้านของขอบทั้ง 12 ด้านจะเท่ากันทุกประการ การรู้วิธีหาปริมาตรและพื้นที่ผิวจึงมีบทบาทอย่างยิ่งในเชิงวิชาการและการประยุกต์ใช้ในอุตสาหกรรมจริง
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">สูตรคณิตศาสตร์พื้นฐานในการคำนวณลูกบาศก์</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          เนื่องจากมิติความกว้าง ความยาว และความสูงของลูกบาศก์มีความยาวเท่ากันคือ a สูตรคำนวณค่าต่างๆ จึงสั้นและจำได้ง่ายมาก:
        </p>
        
        <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
          <li>
            <strong>1. สูตรปริมาตร (Volume):</strong> ปริมาตรหมายถึงมวลที่เก็บอยู่ภายในรูปทรงสามมิติ
            <div className="bg-purple-50 border-l-4 border-purple-500 p-2 my-1 font-mono text-sm font-semibold">
              V = a &times; a &times; a = a³
            </div>
          </li>
          <li>
            <strong>2. สูตรพื้นที่ผิวทั้งหมด (Total Surface Area):</strong> เนื่องจากลูกบาศก์มีผิวสัมผัสภายนอกทั้งหมด 6 ด้าน และแต่ละด้านเป็นรูปสี่เหลี่ยมจัตุรัสที่มีพื้นที่เท่ากับ a²
            <div className="bg-purple-50 border-l-4 border-purple-500 p-2 my-1 font-mono text-sm font-semibold">
              S = 6 &times; a²
            </div>
          </li>
          <li>
            <strong>3. เส้นแทยงมุมมุมฉากทะลุผ่านศูนย์กลาง (Space Diagonal):</strong> เป็นความยาวเส้นตรงที่สั้นที่สุดที่ต่อจากมุมหนึ่งของกล่องพาดผ่านกึ่งกลางไปหามุมฝั่งตรงข้ามในแนวสามมิติ
            <div className="bg-purple-50 border-l-4 border-purple-500 p-2 my-1 font-mono text-sm font-semibold">
              d = a &times; &radic;3 (~1.732 &times; a)
            </div>
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">วิธีการหาค่าแบบย้อนกลับ (Reverse Calculation)</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          บ่อยครั้งในการทำโจทย์สมการคณิตศาสตร์หรือการวัดขนาดจริงในโรงงานอุตสาหกรรม เราอาจไม่ได้เริ่มต้นข้อมูลด้วยความยาวด้าน แต่เริ่มต้นด้วยตัวเลขปริมาตรหรือพื้นที่ผิวแทน ซึ่งเราสามารถแก้สมการย้อนกลับได้ดังนี้:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>
            <strong>เมื่อทราบเพียงปริมาตร (V):</strong> สามารถถอดหาค่าความยาวด้าน (a) ได้ด้วยการคำนวณรากที่สามของปริมาตร <code>a = ³&radic;V</code>
          </li>
          <li>
            <strong>เมื่อทราบเพียงพื้นที่ผิวรวม (S):</strong> หาความยาวด้าน (a) โดยหารพื้นที่ผิวด้วย 6 แล้วถอดสแควรูท (รากที่สอง) <code>a = &radic;(S / 6)</code>
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">การนำไปใช้จริงในชีวิตประจำวัน</h3>
        <p className="text-gray-700 leading-relaxed">
          ใน <strong>ระบบขนส่งและคลังสินค้า (Logistics)</strong> การคำนวณปริมาตรลูกบาศก์ช่วยให้เจ้าหน้าที่สามารถประเมินพื้นที่ว่างในรถคอนเทนเนอร์หรือโกดังสินค้าในการบรรทุกกล่องสินค้าเพื่อประหยัดต้นทุนน้ำมันสูงสุด นอกจากนี้ใน <strong>วิชาเคมีและวัสดุศาสตร์</strong> โครงสร้างตาข่ายคริสตัลรูปแบบลูกบาศก์ (Cubic Crystal System) เช่น เกลือแกง (NaCl) หรือทองคำ ได้ใช้หลักเรขาคณิตของลูกบาศก์นี้คำนวณหาความหนาแน่นมวลอะตอมและแรงยึดเหนี่ยวโมเลกุลในเนื้อวัสดุอย่างเป็นวิทยาศาสตร์
        </p>
      </article>
    </div>
  );
}

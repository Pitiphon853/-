"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Layers } from 'lucide-react';

export default function VolumeTriangularPrism({ lang }: any) {
  const [activeTab, setActiveTab] = useState<'standard' | 'heron' | 'direct'>('standard');
  
  // Tab 1: Standard Base & Height
  const [baseWidth, setBaseWidth] = useState<string>('6');
  const [triangleHeight, setTriangleHeight] = useState<string>('4');
  
  // Tab 2: Heron's Formula (3 sides)
  const [sideA, setSideA] = useState<string>('3');
  const [sideB, setSideB] = useState<string>('4');
  const [sideC, setSideC] = useState<string>('5');

  // Tab 3: Direct Base Area
  const [directBaseArea, setDirectBaseArea] = useState<string>('12');

  // Common: Prism Height
  const [prismHeight, setPrismHeight] = useState<string>('10');

  // Outputs
  const [baseAreaResult, setBaseAreaResult] = useState<number | null>(null);
  const [volumeResult, setVolumeResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    const pH = parseFloat(prismHeight);

    if (isNaN(pH) || pH <= 0) {
      setError(lang === 'EN' ? 'Prism height must be a positive number.' : 'ความสูงของปริซึมต้องเป็นตัวเลขที่มากกว่า 0');
      setBaseAreaResult(null);
      setVolumeResult(null);
      return;
    }

    if (activeTab === 'standard') {
      const bW = parseFloat(baseWidth);
      const tH = parseFloat(triangleHeight);

      if (isNaN(bW) || bW <= 0 || isNaN(tH) || tH <= 0) {
        setError(lang === 'EN' ? 'Triangle base width and height must be positive numbers.' : 'ความกว้างฐานและส่วนสูงของสามเหลี่ยมต้องเป็นตัวเลขที่มากกว่า 0');
        setBaseAreaResult(null);
        setVolumeResult(null);
        return;
      }

      const area = 0.5 * bW * tH;
      const vol = area * pH;
      setBaseAreaResult(area);
      setVolumeResult(vol);

    } else if (activeTab === 'heron') {
      const a = parseFloat(sideA);
      const b = parseFloat(sideB);
      const c = parseFloat(sideC);

      if (isNaN(a) || a <= 0 || isNaN(b) || b <= 0 || isNaN(c) || c <= 0) {
        setError(lang === 'EN' ? 'All side lengths must be positive numbers.' : 'ความยาวด้านทั้งหมดต้องเป็นตัวเลขที่มากกว่า 0');
        setBaseAreaResult(null);
        setVolumeResult(null);
        return;
      }

      // Triangle inequality theorem: sum of two sides must be strictly greater than the third side
      if (a + b <= c || a + c <= b || b + c <= a) {
        setError(lang === 'EN' ? 'Invalid side lengths. The sum of any two sides must be greater than the third side.' : 'ความยาวด้านไม่ถูกต้อง: ผลรวมของด้านสองด้านใดๆ ต้องมากกว่าด้านที่สาม');
        setBaseAreaResult(null);
        setVolumeResult(null);
        return;
      }

      const s = (a + b + c) / 2;
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      const vol = area * pH;
      setBaseAreaResult(area);
      setVolumeResult(vol);

    } else if (activeTab === 'direct') {
      const bArea = parseFloat(directBaseArea);

      if (isNaN(bArea) || bArea <= 0) {
        setError(lang === 'EN' ? 'Base area must be a positive number.' : 'พื้นที่ฐานต้องเป็นตัวเลขที่มากกว่า 0');
        setBaseAreaResult(null);
        setVolumeResult(null);
        return;
      }

      const vol = bArea * pH;
      setBaseAreaResult(bArea);
      setVolumeResult(vol);
    }
  };

  useEffect(() => {
    calculate();
  }, [activeTab, baseWidth, triangleHeight, sideA, sideB, sideC, directBaseArea, prismHeight, lang]);

  const resetFields = () => {
    setBaseWidth('6');
    setTriangleHeight('4');
    setSideA('3');
    setSideB('4');
    setSideC('5');
    setDirectBaseArea('12');
    setPrismHeight('10');
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-indigo-700 p-6 sm:p-8 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
              <Layers className="h-8 w-8" />
              {lang === 'EN' ? 'Triangular Prism Volume Calculator' : 'เครื่องมือคำนวณปริมาตรปริซึมสามเหลี่ยม'}
            </h2>
            <p className="text-sky-100 opacity-90">
              {lang === 'EN' 
                ? 'Calculate the volume of a triangular prism with different input styles.' 
                : 'คำนวณหาปริมาตรของรูปทรงสามมิติปริซึมสามเหลี่ยมตามขนาดที่ป้อน'}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50/50">
          <button
            onClick={() => setActiveTab('standard')}
            className={`flex-1 py-4 text-center font-semibold text-sm transition-colors border-b-2 ${
              activeTab === 'standard' 
                ? 'border-sky-500 text-sky-600 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
            }`}
          >
            {lang === 'EN' ? 'Base & Height' : 'ฐาน & สูงสามเหลี่ยม'}
          </button>
          <button
            onClick={() => setActiveTab('heron')}
            className={`flex-1 py-4 text-center font-semibold text-sm transition-colors border-b-2 ${
              activeTab === 'heron' 
                ? 'border-sky-500 text-sky-600 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
            }`}
          >
            {lang === 'EN' ? '3 Sides of Base' : 'ด้านทั้ง 3 ของฐาน'}
          </button>
          <button
            onClick={() => setActiveTab('direct')}
            className={`flex-1 py-4 text-center font-semibold text-sm transition-colors border-b-2 ${
              activeTab === 'direct' 
                ? 'border-sky-500 text-sky-600 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
            }`}
          >
            {lang === 'EN' ? 'Base Area' : 'พื้นที่ฐานโดยตรง'}
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Input Side */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-700 text-md">
                {lang === 'EN' ? 'Base Dimensions' : 'ป้อนข้อมูลขนาดส่วนฐาน'}
              </h3>
              
              {activeTab === 'standard' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {lang === 'EN' ? 'Base Width (b)' : 'ความกว้างฐานสามเหลี่ยม (b)'}
                    </label>
                    <input
                      type="number"
                      value={baseWidth}
                      onChange={(e) => setBaseWidth(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
                      placeholder="e.g. 6"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {lang === 'EN' ? 'Triangle Height (h)' : 'ความสูงของรูปสามเหลี่ยม (h)'}
                    </label>
                    <input
                      type="number"
                      value={triangleHeight}
                      onChange={(e) => setTriangleHeight(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
                      placeholder="e.g. 4"
                    />
                  </div>
                </>
              )}

              {activeTab === 'heron' && (
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      {lang === 'EN' ? 'Side A' : 'ความยาวด้าน A'}
                    </label>
                    <input
                      type="number"
                      value={sideA}
                      onChange={(e) => setSideA(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
                      placeholder="3"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      {lang === 'EN' ? 'Side B' : 'ความยาวด้าน B'}
                    </label>
                    <input
                      type="number"
                      value={sideB}
                      onChange={(e) => setSideB(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
                      placeholder="4"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      {lang === 'EN' ? 'Side C' : 'ความยาวด้าน C'}
                    </label>
                    <input
                      type="number"
                      value={sideC}
                      onChange={(e) => setSideC(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
                      placeholder="5"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'direct' && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {lang === 'EN' ? 'Base Area (A)' : 'พื้นที่ฐานโดยตรง (A)'}
                  </label>
                  <input
                    type="number"
                    value={directBaseArea}
                    onChange={(e) => setDirectBaseArea(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
                    placeholder="e.g. 12"
                  />
                </div>
              )}
            </div>

            {/* Height Side */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-700 text-md">
                {lang === 'EN' ? 'Prism Height' : 'ป้อนข้อมูลส่วนสูงของปริซึม'}
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {lang === 'EN' ? 'Prism Height / Length (H)' : 'ความสูง/ความยาวของแท่งปริซึม (H)'}
                </label>
                <input
                  type="number"
                  value={prismHeight}
                  onChange={(e) => setPrismHeight(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
                  placeholder="e.g. 10"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={resetFields}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  {lang === 'EN' ? 'Reset to Defaults' : 'ล้างค่าเริ่มต้น'}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Results section */}
          {baseAreaResult !== null && volumeResult !== null && !error && (
            <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100">
              <h3 className="text-lg font-bold text-sky-900 mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                {lang === 'EN' ? 'Prism Volume Result' : 'ผลการคำนวณปริมาตร'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-sky-100">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Base Area' : 'พื้นที่หน้าตัดฐาน'}
                  </span>
                  <span className="text-2xl font-black text-indigo-700">
                    {baseAreaResult.toFixed(4)}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">unit²</span>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-sky-100">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {lang === 'EN' ? 'Total Volume' : 'ปริมาตรปริซึมทั้งหมด'}
                  </span>
                  <span className="text-3xl font-black text-sky-700">
                    {volumeResult.toFixed(4)}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">unit³</span>
                </div>
              </div>

              {/* Dynamic steps description */}
              <div className="mt-4 pt-4 border-t border-sky-200/50 text-sm text-sky-800 space-y-1">
                <p>
                  <strong>{lang === 'EN' ? 'Calculation Steps:' : 'ขั้นตอนการคำนวณ:'}</strong>
                </p>
                {activeTab === 'standard' && (
                  <p>
                    1. {lang === 'EN' ? 'Calculate Base Area:' : 'หาพื้นที่ฐานสามเหลี่ยม:'} 0.5 &times; {baseWidth} &times; {triangleHeight} = {baseAreaResult.toFixed(2)}
                  </p>
                )}
                {activeTab === 'heron' && (
                  <p>
                    1. {lang === 'EN' ? 'Calculate Base Area (Heron\'s):' : 'หาพื้นที่ฐานสามเหลี่ยม (สูตรเฮรอน):'} s = ({sideA} + {sideB} + {sideC})/2 = {(parseFloat(sideA)+parseFloat(sideB)+parseFloat(sideC))/2}; Area = &radic;(s(s-a)(s-b)(s-c)) = {baseAreaResult.toFixed(4)}
                  </p>
                )}
                {activeTab === 'direct' && (
                  <p>
                    1. {lang === 'EN' ? 'Using direct base area:' : 'ใช้พื้นที่ฐานที่ผู้ใช้กรอกโดยตรง:'} {directBaseArea}
                  </p>
                )}
                <p>
                  2. {lang === 'EN' ? 'Calculate Volume:' : 'คำนวณปริมาตร:'} {baseAreaResult.toFixed(4)} &times; {prismHeight} (H) = {volumeResult.toFixed(4)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Thai Article */}
      <article className="prose prose-sky max-w-none bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">
          สูตรคำนวณหาปริมาตรปริซึมสามเหลี่ยม (Triangular Prism Volume)
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          <strong>ปริซึมสามเหลี่ยม (Triangular Prism)</strong> คือ รูปทรงเรขาคณิตสามมิติที่มีหน้าตัดหรือฐานหัวท้ายเป็นรูปสามเหลี่ยมที่ขนานกันและมีขนาดเท่ากันทุกประการ ส่วนด้านข้างที่เชื่อมระหว่างฐานทั้งสองจะเป็นรูปสี่เหลี่ยมผืนผ้า (หรือรูปสี่เหลี่ยมด้านขนาน) จำนวน 3 ด้าน การคำนวณหา <strong>ปริมาตรปริซึมสามเหลี่ยม</strong> จึงเป็นเรื่องสำคัญพื้นฐานในการเรียนวิชาคณิตศาสตร์เรขาคณิต ฟิสิกส์ ตลอดจนงานก่อสร้างออกแบบโครงสร้างหลังคาและอาคาร
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">สูตรทั่วไปในการคำนวณปริมาตรปริซึม</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          ปริมาตรของปริซึมทุกประเภทสามารถหาได้จากหลักการพื้นฐานเดียวกันคือ การนำพื้นที่หน้าตัด (ฐาน) มาคูณเข้ากับความสูงหลักหรือความยาวของแท่งปริซึมนั้นๆ ดังสูตร:
        </p>
        <div className="bg-sky-50 border-l-4 border-sky-500 p-4 mb-6 rounded-r-lg font-mono text-center text-lg font-semibold text-sky-900">
          ปริมาตร (Volume) = พื้นที่ฐาน (Base Area) &times; ความสูงของปริซึม (Prism Height)
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">วิธีการหาพื้นที่ฐานสามเหลี่ยมในแต่ละกรณี</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          เนื่องจากรูปแบบข้อมูลที่ได้รับอาจแตกต่างกันออกไป เครื่องมือคำนวณนี้จึงถูกออกแบบมาให้รองรับการคำนวณพื้นที่หน้าตัดฐานสามเหลี่ยมได้ 3 แนวทางหลัก ดังนี้:
        </p>
        
        <ol className="list-decimal pl-6 text-gray-700 space-y-4 mb-6">
          <li>
            <strong>กรณีที่ 1: ทราบฐานสามเหลี่ยม (b) และส่วนสูงสามเหลี่ยม (h)</strong><br />
            เป็นสูตรดั้งเดิมที่เราคุ้นเคยดีในการคำนวณพื้นที่สามเหลี่ยมสองมิติ:
            <div className="bg-sky-50 border-l-4 border-indigo-500 p-2 my-2 font-mono text-sm">
              พื้นที่ฐาน = 0.5 &times; ความกว้างฐาน (b) &times; ความสูงสามเหลี่ยม (h)
            </div>
          </li>
          <li>
            <strong>กรณีที่ 2: ทราบความยาวด้านทั้งสามของฐาน (a, b, c) - สูตรของเฮรอน (Heron's Formula)</strong><br />
            มีประโยชน์อย่างยิ่งเมื่อไม่ทราบความสูงของมุมฉากด้านในสามเหลี่ยม แต่ทราบขนาดจริงของทั้ง 3 ด้าน:
            <div className="bg-sky-50 border-l-4 border-indigo-500 p-2 my-2 font-mono text-sm">
              s = (a + b + c) / 2<br />
              พื้นที่ฐาน = &radic;(s &times; (s - a) &times; (s - b) &times; (s - c))
            </div>
            <em>หมายเหตุ: ความยาวด้านทั้ง 3 ต้องสอดคล้องกับกฎอสมการสามเหลี่ยม กล่าวคือ ผลรวมของความยาวด้านสองด้านใดๆ จะต้องมากกว่าความยาวของด้านที่สามเสมอ</em>
          </li>
          <li>
            <strong>กรณีที่ 3: ทราบพื้นที่ฐานโดยตรง (Base Area)</strong><br />
            หากคุณคำนวณพื้นที่ฐานสามเหลี่ยมเสร็จสิ้นแล้ว หรือมีระบุไว้ในโจทย์ปัญหา สามารถนำมาคูณกับความสูงของปริซึมได้ทันที
          </li>
        </ol>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">ตัวอย่างการแสดงวิธีทำอย่างละเอียด</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>โจทย์:</strong> จงหาปริมาตรของกล่องของเล่นรูปปริซึมสามเหลี่ยม ซึ่งมีฐานสามเหลี่ยมกว้าง 8 เซนติเมตร มีความสูงของฐานสามเหลี่ยม 5 เซนติเมตร และความยาวของตัวกล่องปริซึมเท่ากับ 12 เซนติเมตร
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li><strong>ขั้นแรก: หาพื้นที่ของสามเหลี่ยมฐาน</strong><br />
            พื้นที่ฐาน = 0.5 &times; 8 &times; 5 = 20 ตารางเซนติเมตร
          </li>
          <li><strong>ขั้นสอง: หาปริมาตรปริซึมสามเหลี่ยม</strong><br />
            ปริมาตร = พื้นที่ฐาน &times; ความยาวปริซึม = 20 &times; 12 = 240 ลูกบาศก์เซนติเมตร
          </li>
          <li><strong>คำตอบ:</strong> กล่องของเล่นนี้มีปริมาตรทั้งหมด 240 ลูกบาศก์เซนติเมตร (cm³)</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">ประโยชน์ในอุตสาหกรรมการก่อสร้างและบรรจุภัณฑ์</h3>
        <p className="text-gray-700 leading-relaxed">
          ในชีวิตจริง ปริซึมสามเหลี่ยมนำมาใช้ในการออกแบบ <strong>หลังคาจั่ว</strong> ของที่พักอาศัย การทราบปริมาตรรูปจั่วช่วยให้นักออกแบบคำนวณการหมุนเวียนของมวลอากาศเพื่อติดตั้งเครื่องปรับอากาศได้อย่างมีประสิทธิภาพ และใน <strong>อุตสาหกรรมบรรจุภัณฑ์</strong> เช่น กล่องแบรนด์ Toblerone ที่เป็นเอกลักษณ์ การคำนวณปริมาตรทำให้สามารถควบคุมปริมาณเนื้อสินค้าที่จะบรรจุภายในได้อย่างละเอียดและแม่นยำที่สุด ช่วยลดมลพิษจากกล่องที่เหลือทิ้งและลดต้นทุนขนส่งได้อย่างยั่งยืน
        </p>
      </article>
    </div>
  );
}

import React, { useState } from 'react';
import { Hexagon, Calculator, RefreshCw, ArrowRight } from 'lucide-react';

export default function AreaHexagonCalculator({ lang = 'TH' }: any) {
  const [side, setSide] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    setResult(null);

    const valSide = parseFloat(side);
    if (isNaN(valSide) || valSide <= 0) {
      setError(lang === 'EN' ? 'Please enter a valid positive number for the side length.' : 'กรุณากรอกความยาวด้านที่ถูกต้องและมากกว่า 0');
      return;
    }

    // Formula: Area = (3 * sqrt(3) / 2) * a^2
    const area = ((3 * Math.sqrt(3)) / 2) * Math.pow(valSide, 2);
    setResult(area);
  };

  const reset = () => {
    setSide('');
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
          <Hexagon className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'EN' ? 'Regular Hexagon Area Calculator' : 'เครื่องคิดเลขพื้นที่หกเหลี่ยมด้านเท่า'}
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {lang === 'EN' ? 'Side Length (a)' : 'ความยาวด้าน (a)'}
          </label>
          <input
            type="number"
            value={side}
            onChange={(e) => setSide(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="flex space-x-4 pt-4">
          <button
            onClick={calculate}
            className="flex-1 bg-yellow-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>{lang === 'EN' ? 'Calculate' : 'คำนวณ'}</span>
          </button>
          <button
            onClick={reset}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>{lang === 'EN' ? 'Reset' : 'เริ่มใหม่'}</span>
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="mt-8 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <ArrowRight className="w-5 h-5 text-yellow-600 mr-2" />
            {lang === 'EN' ? 'Calculation Result' : 'ผลการคำนวณ'}
          </h3>
          <div className="text-4xl font-bold text-yellow-600">
            {result.toLocaleString('en-US', { maximumFractionDigits: 4 })}
            <span className="text-xl text-gray-600 ml-2 font-normal">
              {lang === 'EN' ? 'square units' : 'ตารางหน่วย'}
            </span>
          </div>
          
          <div className="mt-4 text-gray-600 text-sm">
            <strong>{lang === 'EN' ? 'Formula used:' : 'สูตรที่ใช้:'}</strong>{' '}
            {lang === 'EN' ? 'Area = (3√3 / 2) × a²' : 'พื้นที่ = (3√3 / 2) × a²'}
          </div>
        </div>
      )}

      {lang === 'TH' && (
        <article className="mt-12 prose prose-yellow max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">การหาพื้นที่รูปหกเหลี่ยมด้านเท่ามุมเท่า (Regular Hexagon Area)</h2>
          
          <p>
            ในบรรดารูปทรงเรขาคณิตทั้งหมด <strong>รูปหกเหลี่ยมด้านเท่ามุมเท่า</strong> (Regular Hexagon) ถือเป็นหนึ่งในรูปทรงที่มีความน่าสนใจและมีประสิทธิภาพสูงสุดในการจัดสรรพื้นที่ รูปหกเหลี่ยมด้านเท่าประกอบด้วยด้าน 6 ด้านที่ยาวเท่ากันทุกประการ และมีมุมภายในทั้ง 6 มุมที่มีขนาดเท่ากันคือ 120 องศา ผลรวมของมุมภายในทั้งหมดจะเท่ากับ 720 องศา รูปทรงนี้ได้รับการขนานนามว่าเป็น "สถาปัตยกรรมแห่งธรรมชาติ" เนื่องจากเราสามารถพบเห็นได้บ่อยครั้งในปรากฏการณ์ทางธรรมชาติ
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการหาพื้นที่หกเหลี่ยมด้านเท่า</h3>
          <p>
            การหาพื้นที่ของรูปหกเหลี่ยมด้านเท่านั้น แท้จริงแล้วสามารถคิดได้อย่างเรียบง่ายด้วยการแบ่งรูปหกเหลี่ยมออกเป็นรูปสามเหลี่ยมด้านเท่าจำนวน 6 รูป โดยลากเส้นจากจุดศูนย์กลางไปยังมุมยอดทั้ง 6 มุม เมื่อเราทราบพื้นที่ของสามเหลี่ยมด้านเท่า 1 รูป ก็นำมาคูณด้วย 6 สูตรทางคณิตศาสตร์ที่ใช้กันอย่างแพร่หลายคือ:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg my-4 text-center font-semibold">
            พื้นที่ = (3√3 / 2) × a²<br />
            หรือ พื้นที่ ≈ 2.5980762 × a²
          </div>
          <p>
            โดยที่ a คือ ความยาวของด้านใดด้านหนึ่งของรูปหกเหลี่ยม สูตรนี้ช่วยให้การคำนวณทำได้อย่างรวดเร็ว ไม่ว่าจะเป็นการหาพื้นที่ขนาดเล็กหรือใหญ่เพียงใด
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ความมหัศจรรย์ของรูปหกเหลี่ยมในธรรมชาติ</h3>
          <p>
            ธรรมชาติได้ใช้รูปหกเหลี่ยมในการสร้างสรรค์สิ่งต่างๆ มากมาย ตัวอย่างที่เห็นได้ชัดเจนที่สุดคือ <strong>รังผึ้ง (Honeycomb)</strong> ผึ้งสร้างรังในรูปหกเหลี่ยมเนื่องจากเป็นรูปทรงที่สามารถนำมาต่อกันได้สนิทโดยไม่มีช่องว่างหลงเหลือ (Tessellation) และใช้วัสดุ (ขี้ผึ้ง) น้อยที่สุดในการสร้างพื้นที่กักเก็บน้ำหวานได้มากที่สุด นอกจากรังผึ้งแล้ว เรายังพบรูปหกเหลี่ยมได้ในเกล็ดหิมะ (Snowflakes) ดวงตาของแมลงบางชนิด และเสาหินบะซอลต์ตามธรรมชาติ เช่น Giant's Causeway ในไอร์แลนด์เหนือ ซึ่งเกิดจากการเย็นตัวของลาวา
          </p>
          <p>
            ในทางวิศวกรรมและการออกแบบมนุษย์ได้เลียนแบบความแข็งแกร่งนี้มาใช้ในการสร้างโครงสร้างรังผึ้ง (Honeycomb Structure) เพื่อเสริมความแข็งแรงให้กับวัสดุที่มีน้ำหนักเบา เช่น ชิ้นส่วนของเครื่องบิน โครงของรถยนต์ ไปจนถึงกระดานเกม (Board games) ที่ใช้ช่องหกเหลี่ยมเพื่อให้ทิศทางการเดินหรือการขยายอาณาเขตทำได้หลากหลายทิศทางและยุติธรรมกว่าช่องสี่เหลี่ยม
          </p>
          <p>
            เครื่องคำนวณพื้นที่รูปหกเหลี่ยมด้านเท่าที่เราจัดทำขึ้นนี้ จะช่วยลดความยุ่งยากในการกดเครื่องคิดเลขเพื่อหาค่าสแควร์รูท เพียงแค่คุณทราบความยาวของด้าน 1 ด้าน ก็สามารถรู้พื้นที่รวมทั้งหมดได้อย่างรวดเร็วและแม่นยำ เครื่องมือนี้จึงมีประโยชน์อย่างยิ่งสำหรับวิศวกร สถาปนิก นักออกแบบ และนักเรียนนักศึกษาที่ต้องทำความเข้าใจและนำไปประยุกต์ใช้งานจริง
          </p>
        </article>
      )}
    </div>
  );
}

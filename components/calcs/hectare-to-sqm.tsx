import React, { useState } from 'react';
import { Calculator, ArrowLeftRight, HelpCircle } from 'lucide-react';

export default function HectareToSqm({ lang }: { lang: 'TH' | 'EN' }) {
  const [inputValue, setInputValue] = useState<string>('');
  const [direction, setDirection] = useState<'h2s' | 's2h'>('h2s');

  // 1 Hectare = 10,000 Square Meters
  const MULTIPLIER = 10000;

  const calculate = (val: number) => {
    if (direction === 'h2s') {
      return val * MULTIPLIER;
    } else {
      return val / MULTIPLIER;
    }
  };

  const val = parseFloat(inputValue);
  const isValid = !isNaN(val) && val >= 0;
  const result = isValid ? calculate(val) : 0;

  const getLabel = (isInput: boolean) => {
    if (direction === 'h2s') {
      return isInput 
        ? (lang === 'TH' ? 'เฮกตาร์ (ha)' : 'Hectares (ha)')
        : (lang === 'TH' ? 'ตารางเมตร (ตร.ม.)' : 'Square Meters (sqm)');
    } else {
      return isInput 
        ? (lang === 'TH' ? 'ตารางเมตร (ตร.ม.)' : 'Square Meters (sqm)')
        : (lang === 'TH' ? 'เฮกตาร์ (ha)' : 'Hectares (ha)');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {lang === 'TH' ? 'แปลงเฮกตาร์ ⇄ ตารางเมตร' : 'Hectare ⇄ Sqm Converter'}
            </h1>
          </div>
          <button
            onClick={() => setDirection(d => d === 'h2s' ? 's2h' : 'h2s')}
            className="flex items-center justify-center space-x-2 text-sm font-medium text-indigo-700 bg-indigo-50 px-4 py-2.5 rounded-lg hover:bg-indigo-100 transition-colors self-start sm:self-auto border border-indigo-200"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>{lang === 'TH' ? 'สลับการแปลงหน่วย' : 'Swap Conversion'}</span>
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {lang === 'TH' ? 'ระบุตัวเลข' : 'Enter value'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full pl-4 pr-24 py-4 text-xl bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium text-gray-800 shadow-sm"
                  placeholder="0"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500 font-medium">
                  {direction === 'h2s' ? 'ha' : 'sqm'}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-indigo-800 mb-2">
                {lang === 'TH' ? 'ผลลัพธ์' : 'Result'}
              </label>
              <div className="relative">
                <div className="w-full pl-4 pr-24 py-4 text-2xl bg-indigo-50 rounded-lg border border-indigo-200 font-bold text-indigo-700 overflow-x-auto whitespace-nowrap shadow-inner">
                  {isValid ? result.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '0'}
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-indigo-500 font-bold">
                  {direction === 'h2s' ? 'sqm' : 'ha'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start space-x-3 text-sm text-gray-600 bg-white p-4 rounded-lg border border-gray-100">
          <HelpCircle className="w-5 h-5 flex-shrink-0 text-gray-400 mt-0.5" />
          <p>
            {lang === 'TH' 
              ? '1 เฮกตาร์ (Hectare) มีค่าเท่ากับ 10,000 ตารางเมตร (Square Meters) หรือเท่ากับพื้นที่ขนาด 100 เมตร x 100 เมตร' 
              : '1 Hectare is exactly equal to 10,000 Square Meters, equivalent to an area of 100m x 100m.'}
          </p>
        </div>
      </div>

      {/* SEO Article */}
      <article className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100 prose prose-indigo max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          ความสัมพันธ์ระหว่าง "เฮกตาร์" (Hectare) กับ "ตารางเมตร" (Square Meter) ทำไมถึงจำง่ายที่สุด?
        </h2>
        
        <p>
          ระบบมาตราวัดพื้นที่ในทางสากลนั้น มีหน่วยที่ถูกนำมาใช้งานกันอย่างแพร่หลายในหลากหลายระดับ ตั้งแต่การวัดพื้นที่เล็กๆ ในระดับเซนติเมตร ไปจนถึงการวัดอาณาเขตของประเทศในระดับตารางกิโลเมตร แต่เมื่อพูดถึงการวัดที่ดินทางการเกษตร สวนสาธารณะ หรือพื้นที่โครงการขนาดใหญ่ หน่วยที่ได้รับการยอมรับและใช้งานมากที่สุดคือ <strong>ตารางเมตร (Square Meter)</strong> และ <strong>เฮกตาร์ (Hectare)</strong> ซึ่งทั้งสองหน่วยนี้มีความเกี่ยวข้องกันโดยตรงใน <em>ระบบเมตริก (Metric System)</em>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">พื้นฐานของหน่วยตารางเมตร (Sqm)</h3>
        <p>
          <strong>ตารางเมตร</strong> (สัญลักษณ์: m², Sqm หรือ ตร.ม.) เป็นหน่วยวัดพื้นที่ฐานในระบบ SI (International System of Units) ซึ่งนิยามมาจากการนำพื้นที่ของสี่เหลี่ยมจัตุรัสที่มีความยาวด้านละ 1 เมตร มาคูณกัน (1 เมตร × 1 เมตร = 1 ตารางเมตร) หน่วยนี้เหมาะมากสำหรับการวัดพื้นที่ภายในบ้าน คอนโดมิเนียม หรือที่ดินขนาดเล็ก
        </p>
        <p>
          อย่างไรก็ตาม เมื่อเราต้องจัดการกับพื้นที่ที่มีขนาดใหญ่มาก เช่น ฟาร์มเกษตรกรรมหลายร้อยไร่ หรือพื้นที่ป่าสงวน การใช้หน่วยตารางเมตรเพียงอย่างเดียวจะทำให้เกิดตัวเลขที่มีศูนย์หลายตัว (เช่น 5,000,000 ตารางเมตร) ซึ่งทำให้ยากต่อการจดจำ การอ่าน และการทำความเข้าใจ จึงมีการนำหน่วย <strong>"เฮกตาร์"</strong> เข้ามาใช้งานทดแทนนั่นเอง
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เจาะลึกหน่วย เฮกตาร์ (Hectare)</h3>
        <p>
          <strong>เฮกตาร์</strong> (สัญลักษณ์: ha) ถูกนิยามให้มีพื้นที่เท่ากับ 10,000 ตารางเมตรพอดี หากจะจินตนาการให้เห็นภาพง่ายๆ ให้ลองนึกถึงสนามฟุตบอล หรือที่ดินรูปสี่เหลี่ยมจัตุรัสที่มีความกว้าง 100 เมตร และความยาว 100 เมตร (100m × 100m = 10,000 m²)
        </p>
        <p>
          ด้วยความที่ระบบเมตริกเป็นระบบที่ใช้ฐาน 10 (Decimal system) การแปลงค่าไปมาระหว่างเฮกตาร์และตารางเมตรจึงเป็นเรื่องที่ทำได้ง่ายดายที่สุด เพียงแค่เติมหรือตัดเลขศูนย์ 4 ตัวเท่านั้น:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700 font-medium">
          <li>แปลง เฮกตาร์ เป็น ตารางเมตร : ให้ <strong>คูณด้วย 10,000</strong></li>
          <li>แปลง ตารางเมตร เป็น เฮกตาร์ : ให้ <strong>หารด้วย 10,000</strong></li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการเปรียบเทียบในชีวิตจริง</h3>
        <p>
          เพื่อให้เห็นภาพของพื้นที่ 1 เฮกตาร์ได้ชัดเจนขึ้น ลองมาดูการเปรียบเทียบกับสถานที่จริง:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>สนามฟุตบอลมาตรฐาน:</strong> สนามฟุตบอลที่ใช้ในการแข่งขันระดับนานาชาติมักจะมีขนาดประมาณ 7,140 ตารางเมตร (กว้าง 68 ม. × ยาว 105 ม.) ดังนั้น 1 เฮกตาร์ จะมีขนาดใหญ่กว่าสนามฟุตบอลเล็กน้อย (ประมาณ 1.4 สนามฟุตบอล)</li>
          <li><strong>การเปรียบเทียบกับหน่วยไทย:</strong> ดังที่เราทราบดีว่า 1 ไร่ = 1,600 ตารางเมตร ดังนั้น 1 เฮกตาร์ (10,000 ตร.ม.) จึงเท่ากับ 6.25 ไร่ พอดี</li>
          <li><strong>การเทียบกับตารางกิโลเมตร:</strong> 1 ตารางกิโลเมตร มีค่าเท่ากับ 1,000,000 ตารางเมตร ซึ่งถ้าแปลงเป็นเฮกตาร์ ก็จะเท่ากับ 100 เฮกตาร์ นั่นเอง</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การใช้งานจริงในปัจจุบัน</h3>
        <p>
          แม้ว่าในประเทศไทย การซื้อขายที่ดินทั่วไปจะยังคงใช้หน่วย ไร่-งาน-ตารางวา แต่ในการติดต่อธุรกิจกับชาวต่างชาติ การทำรายงานผลกระทบสิ่งแวดล้อม (EIA) โครงการก่อสร้างอุตสาหกรรมขนาดใหญ่ หรือรายงานข้อมูลเชิงสถิติทางภูมิศาสตร์ หน่วยงานต่างๆ ทั้งภาครัฐและเอกชน มักจะใช้หน่วยตารางเมตรหรือเฮกตาร์เป็นมาตรฐานเพื่อป้องกันความสับสน
        </p>
        <p>
          การมี <strong>โปรแกรมคำนวณแปลงหน่วยเฮกตาร์และตารางเมตร</strong> ติดตัวไว้ ไม่ว่าจะเป็นบนเว็บไซต์หรือมือถือ จะช่วยประหยัดเวลาและลดความผิดพลาดจากการตกหล่นของจุดทศนิยมหรือการนับเลขศูนย์ผิดพลาดได้อย่างมีประสิทธิภาพ เพียงพิมพ์ค่าที่คุณมีลงไปในช่องรับข้อมูล เครื่องมือนี้ก็จะแสดงผลลัพธ์การแปลงหน่วยที่ถูกต้องและแม่นยำให้คุณทันที
        </p>
      </article>
    </div>
  );
}

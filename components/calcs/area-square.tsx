import React, { useState } from 'react';
import { Square, ArrowRight, Ruler } from 'lucide-react';

export default function AreaSquare({ lang }: { lang: 'TH' | 'EN' }) {
  const [side, setSide] = useState<string>('');
  const [unit, setUnit] = useState<string>('เมตร (m)');

  const s = parseFloat(side);
  const isValid = !isNaN(s) && s >= 0;
  
  // Formulas
  const area = isValid ? s * s : 0;
  const perimeter = isValid ? 4 * s : 0;
  const diagonal = isValid ? s * Math.sqrt(2) : 0;

  const units = lang === 'TH' 
    ? ['เมตร (m)', 'เซนติเมตร (cm)', 'มิลลิเมตร (mm)', 'นิ้ว (in)', 'ฟุต (ft)']
    : ['Meters (m)', 'Centimeters (cm)', 'Millimeters (mm)', 'Inches (in)', 'Feet (ft)'];

  const getDisplayUnit = () => {
    return unit.split(' ')[0];
  };

  const unitSymbol = unit.match(/\((.*?)\)/)?.[1] || '';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600">
            <Square className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {lang === 'TH' ? 'คำนวณพื้นที่สี่เหลี่ยมจัตุรัส' : 'Square Area Calculator'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {lang === 'TH' ? 'หน่วยการวัด' : 'Measurement Unit'}
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all font-medium text-gray-700"
              >
                {units.map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {lang === 'TH' ? 'ความยาวด้าน (Side Length)' : 'Side Length'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={side}
                  onChange={(e) => setSide(e.target.value)}
                  className="w-full pl-4 pr-16 py-4 text-xl bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all shadow-sm"
                  placeholder="0"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 font-medium">
                  {unitSymbol}
                </div>
              </div>
            </div>

            {/* Visualizer */}
            <div className="pt-6 flex justify-center pb-2">
              <div 
                className="border-2 border-pink-400 bg-pink-50 flex items-center justify-center relative shadow-inner"
                style={{ width: '160px', height: '160px' }}
              >
                {isValid ? (
                  <div className="flex flex-col items-center">
                    <span className="text-pink-600 font-bold">{s}</span>
                    <span className="text-pink-400 text-xs">{unitSymbol}</span>
                  </div>
                ) : (
                  <Ruler className="text-pink-300 w-8 h-8 opacity-50" />
                )}
                
                {/* Labels */}
                {isValid && (
                  <>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-pink-600">
                      {s}
                    </div>
                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-xs font-medium text-pink-600">
                      {s}
                    </div>
                    {/* Diagonal line representation */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" className="text-pink-600" strokeDasharray="4" />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-pink-600 p-6 rounded-xl text-white shadow-md h-full flex flex-col justify-center space-y-6">
            <div>
              <h2 className="text-pink-200 text-sm font-medium uppercase tracking-wider mb-2 flex items-center">
                <Square className="w-4 h-4 mr-2" />
                {lang === 'TH' ? 'พื้นที่สี่เหลี่ยมจัตุรัส' : 'Area'}
              </h2>
              <div className="text-4xl sm:text-5xl font-bold mb-1 break-words">
                {isValid ? area.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '0'}
              </div>
              <div className="text-pink-200 font-medium text-lg">
                {lang === 'TH' ? `ตาราง${getDisplayUnit()}` : `Square ${getDisplayUnit()}`}
              </div>
            </div>

            <div className="w-full h-px bg-pink-400/50"></div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-pink-200 text-xs font-medium uppercase tracking-wider mb-1">
                  {lang === 'TH' ? 'ความยาวรอบรูป' : 'Perimeter'}
                </h2>
                <div className="text-xl font-semibold">
                  {isValid ? perimeter.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '0'}
                </div>
                <div className="text-pink-200 text-xs">{getDisplayUnit()}</div>
              </div>
              <div>
                <h2 className="text-pink-200 text-xs font-medium uppercase tracking-wider mb-1">
                  {lang === 'TH' ? 'ความยาวเส้นทแยงมุม' : 'Diagonal'}
                </h2>
                <div className="text-xl font-semibold">
                  {isValid ? diagonal.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '0'}
                </div>
                <div className="text-pink-200 text-xs">{getDisplayUnit()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100 prose prose-pink max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          สี่เหลี่ยมจัตุรัส (Square): ความสมบูรณ์แบบทางเรขาคณิต และวิธีคำนวณพื้นที่แบบง่ายๆ
        </h2>
        
        <p>
          ในโลกของเรขาคณิต หากจะกล่าวถึงรูปทรงที่มีความสมมาตรและสมบูรณ์แบบที่สุด <strong>"สี่เหลี่ยมจัตุรัส" (Square)</strong> คงเป็นคำตอบแรกที่หลายคนนึกถึง ด้วยความโดดเด่นที่ทุกด้านยาวเท่ากัน และทุกมุมเป็นมุมฉาก การหาระยะหรือคำนวณ <strong>พื้นที่สี่เหลี่ยมจัตุรัส</strong> จึงมีความง่ายและตรงไปตรงมามากที่สุดเมื่อเทียบกับรูปทรงอื่นๆ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำความรู้จักคุณสมบัติเฉพาะของสี่เหลี่ยมจัตุรัส</h3>
        <p>
          รูปสี่เหลี่ยมจัตุรัสเป็นรูปเรขาคณิต 2 มิติที่จัดอยู่ในหมวดหมู่ของสี่เหลี่ยมมุมฉากและสี่เหลี่ยมขนมเปียกปูนในเวลาเดียวกัน โดยมีคุณสมบัติที่น่าสนใจดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>ด้านทุกด้านยาวเท่ากัน:</strong> ไม่ว่าจะวัดด้านซ้าย ขวา บน หรือล่าง จะมีความยาวเท่ากันเสมอ</li>
          <li><strong>มุมทุกมุมเป็นมุมฉาก:</strong> มุมภายในทั้ง 4 มุม มีขนาด 90 องศา รวมกันได้ 360 องศา</li>
          <li><strong>เส้นทแยงมุมพิเศษ:</strong> เส้นทแยงมุมสองเส้นจะยาวเท่ากัน ตัดกันเป็นมุมฉาก (90 องศา) และแบ่งครึ่งซึ่งกันและกันอย่างลงตัว</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการคำนวณพื้นที่สี่เหลี่ยมจัตุรัส</h3>
        <p>
          การหาพื้นที่ของสี่เหลี่ยมจัตุรัสนั้น ใช้หลักการเดียวกับสี่เหลี่ยมผืนผ้า (กว้าง × ยาว) แต่เนื่องจากด้านกว้างและด้านยาวของสี่เหลี่ยมจัตุรัสมีขนาดเท่ากัน เราจึงเรียกมันรวมๆ ว่า "ความยาวด้าน" (Side) สูตรจึงออกมาเรียบง่ายดังนี้:
        </p>
        <blockquote className="bg-pink-50 border-l-4 border-pink-500 p-4 my-4 rounded-r-lg font-bold text-lg text-pink-900 text-center">
          พื้นที่ = ด้าน × ด้าน<br/>
          (หรือ พื้นที่ = ด้าน²)
        </blockquote>
        <p>
          ตัวอย่างเช่น: หากคุณมีกระเบื้องปูพื้นรูปสี่เหลี่ยมจัตุรัส ที่มีความยาวด้านละ 0.6 เมตร พื้นที่ของกระเบื้องแผ่นนี้คือ <code>0.6 × 0.6 = 0.36 ตารางเมตร</code>
        </p>
        
        <p>
          นอกจากนี้ ในบางกรณีหากคุณทราบเพียงความยาวของ "เส้นทแยงมุม" คุณก็สามารถหาพื้นที่ได้เช่นกัน โดยใช้สูตร:<br/>
          <code>พื้นที่ = (1/2) × ผลคูณของเส้นทแยงมุม</code>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การคำนวณความยาวรอบรูปและเส้นทแยงมุม</h3>
        <p>
          นอกจากการหาพื้นที่แล้ว สิ่งที่มักจะถูกคำนวณควบคู่กันไปคือ <strong>ความยาวรอบรูป (Perimeter)</strong> ซึ่งก็หาได้ง่ายมาก เพียงนำความยาวของด้าน 1 ด้าน มาคูณด้วย 4:
        </p>
        <p className="bg-gray-50 p-3 rounded font-mono text-sm inline-block mb-4">ความยาวรอบรูป = 4 × ความยาวด้าน</p>
        
        <p>
          สำหรับ <strong>ความยาวเส้นทแยงมุม (Diagonal)</strong> สามารถคำนวณได้โดยอิงจากทฤษฎีบทพีทาโกรัส โดยสูตรคือ นำความยาวด้านมาคูณด้วยรากที่สองของสอง (√2 ≈ 1.414):
        </p>
        <p className="bg-gray-50 p-3 rounded font-mono text-sm inline-block mb-4">เส้นทแยงมุม = ความยาวด้าน × √2</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์ของการใช้งาน</h3>
        <p>
          การคำนวณพื้นที่สี่เหลี่ยมจัตุรัสพบได้บ่อยในงานสถาปัตยกรรม งานตกแต่งภายใน เช่น การปูกระเบื้อง การทำฝ้าเพดาน หรือการจัดแบ่งพื้นที่แปลงเกษตรกรรมให้เป็นบล็อกจัตุรัสเพื่อความสวยงามและการจัดการที่ง่าย 
        </p>
        <p>
          หากคุณไม่อยากปวดหัวกับการคูณเลขหรือถอดสแควร์รูท (√2) เพื่อหาเส้นทแยงมุม <strong>โปรแกรมคำนวณสี่เหลี่ยมจัตุรัส</strong> ของเราสามารถช่วยคุณได้ เพียงแค่กรอกความยาวด้านเพียงด้านเดียว ระบบจะคำนวณทั้งพื้นที่รวม ความยาวรอบรูป และความยาวเส้นทแยงมุมออกมาให้คุณครบจบในพริบตาเดียว!
        </p>
      </article>
    </div>
  );
}

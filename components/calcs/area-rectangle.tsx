import React, { useState } from 'react';
import { Calculator, Maximize, MousePointer2 } from 'lucide-react';

export default function AreaRectangle({ lang }: { lang: 'TH' | 'EN' }) {
  const [width, setWidth] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [unit, setUnit] = useState<string>('เมตร (m)');

  const w = parseFloat(width);
  const l = parseFloat(length);
  const isValid = !isNaN(w) && !isNaN(l) && w >= 0 && l >= 0;
  
  const area = isValid ? w * l : 0;
  const perimeter = isValid ? 2 * (w + l) : 0;

  const units = lang === 'TH' 
    ? ['เมตร (m)', 'เซนติเมตร (cm)', 'นิ้ว (in)', 'ฟุต (ft)', 'วา (wa)']
    : ['Meters (m)', 'Centimeters (cm)', 'Inches (in)', 'Feet (ft)', 'Wa (wa)'];

  const getDisplayUnit = () => {
    return unit.split(' ')[0]; // Returns just 'เมตร' or 'Meters'
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
            <Maximize className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {lang === 'TH' ? 'คำนวณพื้นที่สี่เหลี่ยมผืนผ้า' : 'Rectangle Area Calculator'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-3 space-y-5 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {lang === 'TH' ? 'หน่วยการวัด' : 'Measurement Unit'}
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all font-medium text-gray-700"
              >
                {units.map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {lang === 'TH' ? 'ความกว้าง (Width)' : 'Width'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full pl-4 pr-16 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 text-sm">
                    {unit.match(/\((.*?)\)/)?.[1] || ''}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {lang === 'TH' ? 'ความยาว (Length)' : 'Length'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full pl-4 pr-16 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 text-sm">
                    {unit.match(/\((.*?)\)/)?.[1] || ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Visualizer */}
            <div className="pt-4 flex justify-center">
              <div 
                className="border-2 border-dashed border-purple-300 bg-purple-50 flex items-center justify-center relative transition-all duration-300"
                style={{ 
                  width: isValid ? '200px' : '150px', 
                  height: isValid ? (l > w ? '250px' : (l === w ? '200px' : '120px')) : '100px',
                  maxWidth: '100%',
                  maxHeight: '250px'
                }}
              >
                {isValid ? (
                  <span className="text-purple-600 font-medium text-sm text-center px-2">
                    {w} x {l} {unit.match(/\((.*?)\)/)?.[1] || ''}
                  </span>
                ) : (
                  <MousePointer2 className="text-purple-300 w-8 h-8 opacity-50" />
                )}
                
                {/* Labels for visualization */}
                {isValid && (
                  <>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-500">
                      {lang === 'TH' ? 'กว้าง' : 'W'}: {w}
                    </div>
                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-xs text-gray-500 whitespace-nowrap">
                      {lang === 'TH' ? 'ยาว' : 'L'}: {l}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-purple-600 p-6 rounded-xl text-white shadow-md h-full flex flex-col justify-center">
              <h2 className="text-purple-200 text-sm font-medium uppercase tracking-wider mb-2">
                {lang === 'TH' ? 'พื้นที่ทั้งหมด' : 'Total Area'}
              </h2>
              <div className="text-4xl sm:text-5xl font-bold mb-1 break-words">
                {isValid ? area.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '0'}
              </div>
              <div className="text-purple-200 font-medium">
                {lang === 'TH' ? `ตาราง${getDisplayUnit()}` : `Square ${getDisplayUnit()}`}
              </div>

              <div className="w-full h-px bg-purple-500/50 my-6"></div>

              <h2 className="text-purple-200 text-sm font-medium uppercase tracking-wider mb-2">
                {lang === 'TH' ? 'ความยาวรอบรูป' : 'Perimeter'}
              </h2>
              <div className="text-2xl font-semibold mb-1">
                {isValid ? perimeter.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '0'}
              </div>
              <div className="text-purple-200 text-sm">
                {getDisplayUnit()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100 prose prose-purple max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          สูตรคำนวณพื้นที่สี่เหลี่ยมผืนผ้า (Rectangle Area): กว้าง x ยาว นำไปใช้อะไรได้บ้าง?
        </h2>
        
        <p>
          ในบรรดารูปทรงเรขาคณิตทั้งหมด <strong>"สี่เหลี่ยมผืนผ้า" (Rectangle)</strong> ถือเป็นรูปทรงที่เราพบเห็นและต้องข้องเกี่ยวด้วยมากที่สุดในชีวิตประจำวัน ไม่ว่าจะเป็นรูปทรงของสมาร์ทโฟนที่คุณกำลังถืออยู่ รูปแบบของหน้าจอคอมพิวเตอร์ ประตู หน้าต่าง ห้องนอน ไปจนถึงโฉนดที่ดินที่คุณครอบครอง ล้วนมีพื้นฐานมาจากรูปสี่เหลี่ยมผืนผ้าทั้งสิ้น การทำความเข้าใจวิธี <strong>คำนวณพื้นที่สี่เหลี่ยมผืนผ้า</strong> จึงเป็นทักษะคณิตศาสตร์พื้นฐานที่มีประโยชน์อย่างมาก
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">คุณสมบัติของรูปสี่เหลี่ยมผืนผ้า</h3>
        <p>
          ก่อนที่จะไปคำนวณพื้นที่ เรามาทำความเข้าใจคุณสมบัติที่สำคัญของรูปสี่เหลี่ยมผืนผ้ากันก่อน เพื่อให้แยกแยะออกจากรูปสี่เหลี่ยมชนิดอื่นๆ ได้:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>มีมุมทั้งสี่เป็นมุมฉาก:</strong> มุมทุกมุมกาง 90 องศาเป๊ะ</li>
          <li><strong>ด้านตรงข้ามยาวเท่ากันและขนานกัน:</strong> ด้านกว้างสองด้านจะมีความยาวเท่ากัน และด้านยาวสองด้านก็จะมีความยาวเท่ากัน</li>
          <li><strong>เส้นทแยงมุมยาวเท่ากัน:</strong> หากลากเส้นจากมุมหนึ่งไปยังมุมตรงข้าม เส้นทแยงมุมทั้งสองเส้นจะยาวเท่ากันและตัดแบ่งครึ่งซึ่งกันและกัน</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการหาพื้นที่สี่เหลี่ยมผืนผ้า</h3>
        <p>
          การหาพื้นที่ของรูปสี่เหลี่ยมผืนผ้านั้น เป็นคณิตศาสตร์ที่จำง่ายที่สุด เพราะมีสูตรที่ตายตัวและใช้กันมาอย่างยาวนาน นั่นคือ:
        </p>
        <blockquote className="bg-purple-50 border-l-4 border-purple-500 p-4 my-4 rounded-r-lg font-bold text-lg text-purple-900 text-center">
          พื้นที่ = ความกว้าง × ความยาว<br/>
          (Area = Width × Length)
        </blockquote>
        <p>
          ผลลัพธ์ที่ได้จากการคูณ จะมีหน่วยเป็น <strong>"ตาราง" (Square)</strong> นำหน้าหน่วยวัดเดิมเสมอ เช่น ถ้านำด้านกว้าง (เมตร) มาคูณ ด้านยาว (เมตร) ผลลัพธ์ก็จะได้เป็น ตารางเมตร (ตร.ม.) 
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์และการประยุกต์ใช้งานในชีวิตจริง</h3>
        <p>
          คุณอาจจะสงสัยว่า การคำนวณพื้นที่กว้างคูณยาวนี้ จะได้นำมาใช้จริงเมื่อใด? คำตอบคือ ใช้อยู่ตลอดเวลาในงานช่าง งานตกแต่งบ้าน และการคำนวณต้นทุน ตัวอย่างเช่น:
        </p>
        <ol className="list-decimal pl-6 space-y-4 mb-6">
          <li>
            <strong>การปูกระเบื้องพื้นห้อง:</strong> หากคุณมีห้องขนาดกว้าง 4 เมตร ยาว 5 เมตร เมื่อนำเข้าสูตร <code>4 × 5 = 20</code> คุณจะทราบทันทีว่าห้องนี้มีพื้นที่ 20 ตารางเมตร จากนั้นคุณก็นำตัวเลขนี้ไปคำนวณว่าต้องซื้อกระเบื้องกี่กล่องถึงจะพอดี
          </li>
          <li>
            <strong>การทาสีผนังกำแพง:</strong> ผนังกำแพงบ้านก็คือสี่เหลี่ยมผืนผ้าแนวตั้ง หากกำแพงยาว 6 เมตร และสูง (เสมือนเป็นความกว้าง) 2.5 เมตร พื้นที่ผนังที่จะต้องทาสีคือ <code>6 × 2.5 = 15 ตารางเมตร</code> ช่วยให้คุณคำนวณปริมาณถังสีที่ต้องซื้อได้อย่างแม่นยำ
          </li>
          <li>
            <strong>การคำนวณขนาดที่ดิน:</strong> หากโฉนดระบุว่าที่ดินของคุณเป็นรูปสี่เหลี่ยมผืนผ้า กว้าง 20 วา ยาว 40 วา พื้นที่ทั้งหมดคือ <code>20 × 40 = 800 ตารางวา</code> (หรือเท่ากับ 2 ไร่) ทำให้ง่ายต่อการประเมินราคาซื้อขาย
          </li>
          <li>
            <strong>การตัดเย็บและงานคราฟต์:</strong> การคำนวณพื้นที่ของผืนผ้า กว้างคูณยาว เพื่อประเมินว่าต้องใช้ผ้ากี่ตารางนิ้วหรือกี่ตารางเซนติเมตรในการทำกระเป๋าหรือเสื้อผ้า
          </li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สรุป</h3>
        <p>
          สูตร <strong>กว้าง × ยาว</strong> เป็นหัวใจหลักของเรขาคณิตพื้นฐานที่ไม่ควรมองข้าม แม้การกดเครื่องคิดเลขทั่วไปจะทำได้ แต่อาจเกิดความสับสนเรื่องหน่วยวัดที่แตกต่างกัน โปรแกรม <strong>เครื่องคิดเลขหาพื้นที่สี่เหลี่ยมผืนผ้า</strong> ที่เราเตรียมไว้ให้นี้ ถูกออกแบบมาเพื่อให้คุณเลือกหน่วยการวัดได้ตามต้องการ ไม่ว่าจะเป็นเมตร เซนติเมตร หรือนิ้ว พร้อมคำนวณพื้นที่สุทธิและ <em>ความยาวรอบรูป (Perimeter)</em> ให้เสร็จสรรพในที่เดียว ช่วยให้การวางแผนงานต่างๆ ของคุณเป็นเรื่องง่ายและไร้ข้อผิดพลาด
        </p>
      </article>
    </div>
  );
}

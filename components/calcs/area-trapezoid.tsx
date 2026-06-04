import React, { useState } from 'react';
import { Box, Calculator, Info, CheckCircle2 } from 'lucide-react';

export default function AreaTrapezoid({ lang = 'th' }: any) {
  const [base1, setBase1] = useState<string>('');
  const [base2, setBase2] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [area, setArea] = useState<number | null>(null);

  const t = {
    title: lang === 'en' ? 'Trapezoid Area Calculator' : 'โปรแกรมคำนวณพื้นที่สี่เหลี่ยมคางหมู',
    base1: lang === 'en' ? 'Parallel Side A' : 'ด้านคู่ขนาน A',
    base2: lang === 'en' ? 'Parallel Side B' : 'ด้านคู่ขนาน B',
    height: lang === 'en' ? 'Height' : 'ความสูง (ระยะห่างระหว่างเส้นขนาน)',
    calculate: lang === 'en' ? 'Calculate Area' : 'คำนวณพื้นที่',
    result: lang === 'en' ? 'Area of the Trapezoid' : 'พื้นที่สี่เหลี่ยมคางหมู',
    unit: lang === 'en' ? 'square units' : 'ตารางหน่วย',
    placeholderA: lang === 'en' ? 'Enter side A length' : 'ความยาวด้าน A',
    placeholderB: lang === 'en' ? 'Enter side B length' : 'ความยาวด้าน B',
    placeholderH: lang === 'en' ? 'Enter height' : 'ความสูง',
  };

  const calculate = () => {
    const a = parseFloat(base1);
    const b = parseFloat(base2);
    const h = parseFloat(height);
    if (!isNaN(a) && !isNaN(b) && !isNaN(h) && a >= 0 && b >= 0 && h > 0) {
      setArea(0.5 * (a + b) * h);
    } else {
      setArea(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
        <div className="bg-orange-600 p-6 text-white text-center">
          <Box className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">{t.title}</h1>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.base1}</label>
                <input
                  type="number"
                  value={base1}
                  onChange={(e) => setBase1(e.target.value)}
                  placeholder={t.placeholderA}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  min="0"
                  step="any"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.base2}</label>
                <input
                  type="number"
                  value={base2}
                  onChange={(e) => setBase2(e.target.value)}
                  placeholder={t.placeholderB}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  min="0"
                  step="any"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.height}</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={t.placeholderH}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  min="0"
                  step="any"
                />
              </div>
              <button
                onClick={calculate}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <Calculator className="w-5 h-5" />
                {t.calculate}
              </button>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-orange-100">
              <h3 className="text-lg font-medium text-orange-900 mb-2">{t.result}</h3>
              {area !== null ? (
                <div>
                  <div className="text-4xl font-bold text-orange-700 mb-2">
                    {area.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </div>
                  <div className="text-orange-600 font-medium">{t.unit}</div>
                </div>
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <Info className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm">โปรดกรอกความยาวด้านคู่ขนานทั้งสองด้าน<br/>และความสูงให้ครบถ้วน</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-orange max-w-none text-gray-700 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Info className="w-6 h-6 text-orange-600" />
          การหาพื้นที่รูปสี่เหลี่ยมคางหมู (Trapezoid)
        </h2>
        
        <p>
          รูปสี่เหลี่ยมคางหมู (Trapezoid หรือ Trapezium) คือรูปสี่เหลี่ยมชนิดหนึ่งที่น่าสนใจและพบเห็นได้บ่อยในชีวิตประจำวัน 
          เอกลักษณ์ที่โดดเด่นของมันคือการมี <strong>"ด้านที่ขนานกันเพียง 1 คู่"</strong> เท่านั้น ส่วนด้านที่เหลืออีกสองด้านจะไม่ขนานกัน 
          เรามักจะเห็นรูปทรงนี้บ่อยครั้งในงานสถาปัตยกรรม เช่น รูปทรงของหลังคาบ้าน สะพานข้ามแม่น้ำ หรือแม้กระทั่งกระเป๋าถือสตรี 
          การคำนวณพื้นที่ของสี่เหลี่ยมคางหมูจึงมีประโยชน์อย่างมากในการประเมินพื้นที่ใช้สอย การคำนวณหาปริมาตรวัสดุ และการจัดสรรพื้นที่ในที่ดินที่มีรูปร่างไม่เป็นสี่เหลี่ยมมุมฉาก
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">สูตรการหาพื้นที่สี่เหลี่ยมคางหมู</h3>
        <p>
          ด้วยลักษณะที่ด้านคู่ขนานมีความยาวไม่เท่ากัน การหาพื้นที่จึงใช้วิธีการนำความยาวของด้านที่ขนานกันมาบวกกัน แล้วหาค่าเฉลี่ย 
          จากนั้นจึงนำไปคูณกับความสูง (ระยะทางตั้งฉากระหว่างด้านคู่ขนาน) ซึ่งเขียนเป็นสูตรคณิตศาสตร์ได้ดังนี้:
        </p>
        <div className="bg-orange-50 p-4 rounded-lg my-4 text-center font-bold text-lg text-orange-800 border border-orange-200">
          พื้นที่สี่เหลี่ยมคางหมู = 1/2 × ผลบวกของความยาวด้านคู่ขนาน × ความสูง
        </div>
        <p>
          หรือเขียนเป็นสูตรสัญลักษณ์ได้ว่า: <strong>Area = 0.5 × (a + b) × h</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li><strong>a และ b:</strong> ความยาวของด้านที่ขนานกันทั้งสองด้าน (Parallel sides)</li>
          <li><strong>h (Height):</strong> ความสูง หรือระยะห่างตั้งฉากระหว่างด้านคู่ขนานทั้งสองเส้น</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">ที่มาของสูตรที่เข้าใจง่าย</h3>
        <p>
          หากเรานำรูปสี่เหลี่ยมคางหมูสองรูปที่มีขนาดเท่ากันทุกประการ มาคว่ำหัวชนกันและต่อกันที่ด้านที่ไม่ขนาน 
          รูปทรงใหม่ที่เกิดขึ้นจะกลายเป็น "รูปสี่เหลี่ยมด้านขนาน" ขนาดใหญ่ที่มีฐานยาวเท่ากับ (a + b) และมีความสูงเท่ากับ h 
          พื้นที่ของสี่เหลี่ยมด้านขนานนี้คือ ฐาน × สูง = (a + b) × h 
          และเนื่องจากรูปนี้ประกอบขึ้นจากสี่เหลี่ยมคางหมู 2 รูป พื้นที่ของสี่เหลี่ยมคางหมู 1 รูปจึงเท่ากับครึ่งหนึ่ง หรือ 1/2 × (a + b) × h นั่นเอง
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">ตัวอย่างการคำนวณในชีวิตจริง</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">ตัวอย่างที่ 1: การซื้อขายที่ดิน</h4>
            <p>นายก. มีที่ดินแปลงหนึ่งเป็นรูปสี่เหลี่ยมคางหมู ด้านหน้าติดถนนยาว 40 วา ด้านหลังขนานกับถนนยาว 30 วา และระยะความลึกตั้งฉากจากด้านหน้าถึงด้านหลังคือ 20 วา ที่ดินแปลงนี้มีพื้นที่กี่ตารางวา?</p>
            <p className="mt-2 text-gray-600">
              วิธีทำ:<br/>
              ด้านคู่ขนาน a = 40, b = 30<br/>
              ความสูง h = 20<br/>
              พื้นที่ = 1/2 × (40 + 30) × 20<br/>
              พื้นที่ = 1/2 × 70 × 20<br/>
              พื้นที่ = 35 × 20 = 700 ตารางวา
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">ตัวอย่างที่ 2: การทาสีผนังใต้หลังคา</h4>
            <p>ช่างทาสีต้องการประเมินพื้นที่ผนังใต้จั่วหลังคาซึ่งมีรูปทรงเป็นสี่เหลี่ยมคางหมู ด้านบนกว้าง 4 เมตร ด้านล่างกว้าง 8 เมตร และมีความสูง 3 เมตร</p>
            <p className="mt-2 text-gray-600">
              วิธีทำ:<br/>
              พื้นที่ = 1/2 × (4 + 8) × 3<br/>
              พื้นที่ = 1/2 × 12 × 3<br/>
              พื้นที่ = 6 × 3 = 18 ตารางเมตร
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">การประยุกต์ใช้งานด้านต่างๆ</h3>
        <ul className="space-y-3 mt-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>วิศวกรรมโยธาและชลประทาน:</strong> รูปหน้าตัดของคลองส่งน้ำหรือคันดินกั้นน้ำ มักถูกออกแบบให้เป็นรูปสี่เหลี่ยมคางหมูเพื่อความแข็งแรงของตลิ่ง การหาพื้นที่หน้าตัดช่วยในการคำนวณปริมาณดินขุดหรือปริมาณน้ำที่กักเก็บได้</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>งานสถาปัตยกรรม:</strong> หลังคาทรงปั้นหยา (Hip Roof) จะมีแผ่นหลังคาสองด้านที่มีรูปทรงเป็นสี่เหลี่ยมคางหมู การคำนวณพื้นที่จึงจำเป็นสำหรับการสั่งซื้อกระเบื้องมุงหลังคา</span>
          </li>
        </ul>

        <div className="mt-8 p-6 bg-orange-50 rounded-xl border border-orange-200">
          <h4 className="font-bold text-orange-800 mb-2">ข้อควรระวังสำคัญ</h4>
          <p className="text-orange-900 text-sm">
            ในการแทนค่าลงในสูตร <strong>ต้องใช้ค่า "ความสูง (h)" ที่เป็นระยะทางเส้นตั้งฉาก (มุม 90 องศา) ระหว่างด้านคู่ขนานทั้งสองเส้นเท่านั้น</strong> 
            ห้ามนำความยาวของด้านข้างที่เอียงมาใช้แทนค่าความสูงอย่างเด็ดขาด เพราะจะทำให้ผลลัพธ์ที่ได้ผิดพลาด 
            นอกจากนี้ ควรบวกความยาวของด้านคู่ขนานทั้งสองด้าน (a + b) ให้เสร็จสมบูรณ์ก่อน แล้วจึงนำไปคูณกับความสูงและคูณด้วย 1/2 หรือหารด้วย 2
          </p>
        </div>
      </article>
    </div>
  );
}

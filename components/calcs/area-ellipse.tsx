import React, { useState } from 'react';
import { CircleOff, Calculator, Info, CheckCircle2 } from 'lucide-react';

export default function AreaEllipse({ lang = 'th' }: any) {
  const [axisA, setAxisA] = useState<string>('');
  const [axisB, setAxisB] = useState<string>('');
  const [area, setArea] = useState<number | null>(null);

  const t = {
    title: lang === 'en' ? 'Ellipse Area Calculator' : 'โปรแกรมคำนวณพื้นที่วงรี',
    axisA: lang === 'en' ? 'Semi-major Axis (a)' : 'กึ่งแกนเอก (a - ครึ่งหนึ่งของความยาวที่สุด)',
    axisB: lang === 'en' ? 'Semi-minor Axis (b)' : 'กึ่งแกนโท (b - ครึ่งหนึ่งของความกว้างที่สุด)',
    calculate: lang === 'en' ? 'Calculate Area' : 'คำนวณพื้นที่',
    result: lang === 'en' ? 'Area of the Ellipse' : 'พื้นที่วงรี',
    unit: lang === 'en' ? 'square units' : 'ตารางหน่วย',
    placeholderA: lang === 'en' ? 'Enter axis a length' : 'กรอกความยาวกึ่งแกนเอก',
    placeholderB: lang === 'en' ? 'Enter axis b length' : 'กรอกความยาวกึ่งแกนโท',
  };

  const calculate = () => {
    const a = parseFloat(axisA);
    const b = parseFloat(axisB);
    if (!isNaN(a) && !isNaN(b) && a > 0 && b > 0) {
      setArea(Math.PI * a * b);
    } else {
      setArea(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
        <div className="bg-teal-600 p-6 text-white text-center">
          <CircleOff className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">{t.title}</h1>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.axisA}</label>
                <input
                  type="number"
                  value={axisA}
                  onChange={(e) => setAxisA(e.target.value)}
                  placeholder={t.placeholderA}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:teal-blue-500 focus:border-teal-500 transition-colors"
                  min="0"
                  step="any"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.axisB}</label>
                <input
                  type="number"
                  value={axisB}
                  onChange={(e) => setAxisB(e.target.value)}
                  placeholder={t.placeholderB}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  min="0"
                  step="any"
                />
              </div>
              <button
                onClick={calculate}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <Calculator className="w-5 h-5" />
                {t.calculate}
              </button>
            </div>

            <div className="bg-teal-50 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-teal-100">
              <h3 className="text-lg font-medium text-teal-900 mb-2">{t.result}</h3>
              {area !== null ? (
                <div>
                  <div className="text-4xl font-bold text-teal-700 mb-2">
                    {area.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </div>
                  <div className="text-teal-600 font-medium">{t.unit}</div>
                </div>
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <Info className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm">โปรดกรอกความยาวกึ่งแกนเอกและกึ่งแกนโท<br/>เพื่อคำนวณพื้นที่</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-teal max-w-none text-gray-700 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Info className="w-6 h-6 text-teal-600" />
          ทำความรู้จักวงรีและการคำนวณพื้นที่วงรี
        </h2>
        
        <p>
          วงรี (Ellipse) เป็นรูปทรงเรขาคณิตที่เกิดจากการตัดกรวยกลมตรงด้วยระนาบที่เอียงทำมุมกับแกนของกรวย 
          คุณอาจมองว่าวงรีคือวงกลมที่ถูกยืดหรือบีบออกไปด้านใดด้านหนึ่ง รูปทรงวงรีมีความสำคัญอย่างมากในหลายสาขาวิชา 
          โดยเฉพาะในวิชาฟิสิกส์และดาราศาสตร์ ดังที่โยฮันเนส เคปเลอร์ ได้ค้นพบว่าดาวเคราะห์ในระบบสุริยะต่างก็โคจรรอบดวงอาทิตย์เป็นรูปวงรี 
          ดังนั้นการทำความเข้าใจรูปทรงและวิธีการคำนวณพื้นที่ของวงรีจึงเป็นการเปิดประตูสู่การไขความลับของจักรวาลและธรรมชาติรอบตัวเรา
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">องค์ประกอบที่สำคัญของวงรี</h3>
        <p>
          ต่างจากวงกลมที่มีรัศมีเพียงค่าเดียวที่เท่ากันหมดทุกทิศทาง วงรีจะมีความกว้างและความยาวที่ไม่เท่ากัน ซึ่งเราเรียกว่า "แกน" โดยวงรีมีแกนหลัก 2 แกน ได้แก่:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>แกนเอก (Major Axis):</strong> เส้นผ่าศูนย์กลางที่ยาวที่สุดของวงรี ผ่านจุดศูนย์กลางและจุดโฟกัสทั้งสองจุด</li>
          <li><strong>กึ่งแกนเอก (Semi-major Axis, a):</strong> ครึ่งหนึ่งของความยาวแกนเอก เปรียบเสมือน "รัศมียาว" ของวงรี</li>
          <li><strong>แกนโท (Minor Axis):</strong> เส้นผ่าศูนย์กลางที่สั้นที่สุดของวงรี ตั้งฉากกับแกนเอกและผ่านจุดศูนย์กลาง</li>
          <li><strong>กึ่งแกนโท (Semi-minor Axis, b):</strong> ครึ่งหนึ่งของความยาวแกนโท เปรียบเสมือน "รัศมีสั้น" ของวงรี</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">สูตรการหาพื้นที่วงรี</h3>
        <p>
          การหาพื้นที่ของวงรีนั้นมีความคล้ายคลึงกับการหาพื้นที่วงกลม (πr²) เพียงแต่เปลี่ยนจากการนำรัศมีมาคูณตัวเอง 
          เป็นการนำกึ่งแกนเอก (a) และกึ่งแกนโท (b) มาคูณกันแทน ดังนี้:
        </p>
        <div className="bg-teal-50 p-4 rounded-lg my-4 text-center font-bold text-lg text-teal-800 border border-teal-200">
          พื้นที่วงรี = π × a × b
        </div>
        <p>
          ข้อสังเกตที่น่าสนใจคือ หากความยาวของ a และ b มีค่าเท่ากัน วงรีรูปนั้นก็จะกลายเป็นรูปวงกลมที่สมบูรณ์ 
          และสูตร π × a × b ก็จะกลายร่างเป็น π × r × r หรือ πr² นั่นเอง
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">ตัวอย่างการคำนวณ</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">ตัวอย่างที่ 1: การคำนวณพื้นที่สระว่ายน้ำทรงวงรี</h4>
            <p>โรงแรมแห่งหนึ่งมีสระว่ายน้ำทรงวงรี โดยวัดความยาวที่สุด (แกนเอก) ได้ 20 เมตร และวัดความกว้างที่สุด (แกนโท) ได้ 10 เมตร พื้นที่ผิวน้ำของสระนี้คือเท่าใด?</p>
            <p className="mt-2 text-gray-600">
              วิธีทำ:<br/>
              ขั้นตอนที่ 1: หากึ่งแกนเอก (a) = 20 / 2 = 10 เมตร<br/>
              ขั้นตอนที่ 2: หากึ่งแกนโท (b) = 10 / 2 = 5 เมตร<br/>
              ขั้นตอนที่ 3: แทนค่าในสูตร พื้นที่ = π × a × b<br/>
              พื้นที่ = 3.14159 × 10 × 5<br/>
              พื้นที่ = 3.14159 × 50 ≈ 157.08 ตารางเมตร
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">ตัวอย่างที่ 2: โต๊ะประชุมวงรี</h4>
            <p>โต๊ะประชุมตัวหนึ่งมีกึ่งแกนเอกยาว 1.5 เมตร และกึ่งแกนโทยาว 0.8 เมตร พื้นที่ของหน้าโต๊ะประชุมนี้มีค่าเท่าใด?</p>
            <p className="mt-2 text-gray-600">
              วิธีทำ:<br/>
              a = 1.5, b = 0.8<br/>
              พื้นที่ = π × a × b<br/>
              พื้นที่ = 3.14159 × 1.5 × 0.8<br/>
              พื้นที่ = 3.14159 × 1.2 ≈ 3.77 ตารางเมตร
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">การประยุกต์ใช้งานในโลกความจริง</h3>
        <ul className="space-y-3 mt-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>สถาปัตยกรรมและการตกแต่งภายใน:</strong> การคำนวณพื้นที่เพดานโดมทรงวงรี โต๊ะรับประทานอาหาร หรือพื้นที่ลานจัดแสดงสินค้า เพื่อประเมินวัสดุและงบประมาณในการก่อสร้าง</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>วิศวกรรมการบินและอวกาศ:</strong> การคำนวณพื้นที่หน้าตัดของปีกเครื่องบิน หรือการคำนวณพื้นที่วงโคจรของดาวเทียมที่โคจรรอบโลกเป็นรูปวงรี</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>ทัศนมาตรศาสตร์ (Optics):</strong> การคำนวณพื้นที่หน้าตัดของลำแสงเลเซอร์หรือเลนส์แว่นตาที่มักจะมีลักษณะเป็นวงรีเพื่อความสวยงามและรับกับรูปหน้า</span>
          </li>
        </ul>

        <div className="mt-8 p-6 bg-teal-50 rounded-xl border border-teal-200">
          <h4 className="font-bold text-teal-800 mb-2">จุดที่ควรระวังเป็นพิเศษ</h4>
          <p className="text-teal-900 text-sm">
            ความผิดพลาดอันดับต้นๆ ในการคำนวณพื้นที่วงรี คือการนำค่าความยาวทั้งหมดของวงรี (แกนเอก) และความกว้างทั้งหมด (แกนโท) 
            มาคูณกันโดยตรงในสูตร ซึ่งสูตรที่ถูกต้องนั้นต้องการค่า <strong>"กึ่งแกน" (ครึ่งหนึ่งของความยาวและความกว้าง)</strong> เท่านั้น 
            ดังนั้น ก่อนทำการคำนวณ ให้ตรวจสอบข้อมูลที่ได้รับให้แน่ใจว่าโจทย์กำหนดความยาวแบบเต็มแกน หรือครึ่งแกนมาให้ 
            หากเป็นเต็มแกน ต้องหารด้วย 2 เสมอก่อนนำไปเข้าสูตร π × a × b
          </p>
        </div>
      </article>
    </div>
  );
}

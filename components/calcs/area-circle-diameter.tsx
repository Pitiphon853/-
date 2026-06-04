import React, { useState } from 'react';
import { CircleDot, Calculator, Info, CheckCircle2 } from 'lucide-react';

export default function AreaCircleDiameter({ lang = 'th' }: any) {
  const [diameter, setDiameter] = useState<string>('');
  const [area, setArea] = useState<number | null>(null);

  const t = {
    title: lang === 'en' ? 'Circle Area Calculator (Diameter)' : 'โปรแกรมคำนวณพื้นที่วงกลม (เส้นผ่านศูนย์กลาง)',
    diameter: lang === 'en' ? 'Diameter (d)' : 'เส้นผ่านศูนย์กลาง (d)',
    calculate: lang === 'en' ? 'Calculate Area' : 'คำนวณพื้นที่',
    result: lang === 'en' ? 'Area of the Circle' : 'พื้นที่วงกลม',
    unit: lang === 'en' ? 'square units' : 'ตารางหน่วย',
    placeholder: lang === 'en' ? 'Enter diameter' : 'กรอกความยาวเส้นผ่านศูนย์กลาง',
  };

  const calculate = () => {
    const d = parseFloat(diameter);
    if (!isNaN(d) && d > 0) {
      const r = d / 2;
      setArea(Math.PI * Math.pow(r, 2));
    } else {
      setArea(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
        <div className="bg-purple-600 p-6 text-white text-center">
          <CircleDot className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">{t.title}</h1>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.diameter}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={diameter}
                    onChange={(e) => setDiameter(e.target.value)}
                    placeholder={t.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    min="0"
                    step="any"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  เส้นผ่านศูนย์กลางคือระยะทางจากขอบด้านหนึ่งไปยังขอบอีกด้านหนึ่ง โดยลากผ่านจุดศูนย์กลาง
                </p>
              </div>
              <button
                onClick={calculate}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                {t.calculate}
              </button>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-purple-100">
              <h3 className="text-lg font-medium text-purple-900 mb-2">{t.result}</h3>
              {area !== null ? (
                <div>
                  <div className="text-4xl font-bold text-purple-700 mb-2">
                    {area.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </div>
                  <div className="text-purple-600 font-medium">{t.unit}</div>
                </div>
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <Info className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm">โปรดกรอกความยาวเส้นผ่านศูนย์กลาง<br/>เพื่อคำนวณพื้นที่</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-purple max-w-none text-gray-700 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Info className="w-6 h-6 text-purple-600" />
          การคำนวณพื้นที่วงกลมจากเส้นผ่านศูนย์กลาง
        </h2>
        
        <p>
          ในหลายสถานการณ์ของชีวิตประจำวันและการทำงานจริง เรามักจะทราบค่า "เส้นผ่านศูนย์กลาง (Diameter)" ของวัตถุทรงกลมหรือวงกลมมากกว่าค่า "รัศมี (Radius)" 
          เช่น เมื่อเราต้องการวัดความกว้างของปากท่อน้ำ ความกว้างของหน้ายางรถยนต์ หรือขนาดของกระทะ การวัดจากขอบด้านหนึ่งทะลุผ่านจุดกึ่งกลางไปยังขอบอีกด้านหนึ่งนั้นทำได้ง่ายกว่าการหาจุดกึ่งกลางที่แน่นอนแล้ววัดออกไปที่ขอบ 
          ดังนั้น การรู้วิธีคำนวณพื้นที่วงกลมจากเส้นผ่านศูนย์กลางจึงมีประโยชน์อย่างยิ่งและช่วยลดขั้นตอนในการทำงานลงได้
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">สูตรการคำนวณพื้นที่วงกลมจากเส้นผ่านศูนย์กลาง</h3>
        <p>
          เนื่องจากเส้นผ่านศูนย์กลางมีความยาวเป็นสองเท่าของรัศมี (d = 2r หรือ r = d/2) เมื่อเรานำค่า r = d/2 ไปแทนในสูตรพื้นที่วงกลมปกติ (พื้นที่ = πr²) 
          เราจะได้สูตรใหม่สำหรับการคำนวณจากเส้นผ่านศูนย์กลางโดยตรง ดังนี้:
        </p>
        <div className="bg-purple-50 p-4 rounded-lg my-4 text-center font-bold text-lg text-purple-800 border border-purple-200">
          พื้นที่วงกลม = π × (d/2)² หรือ พื้นที่วงกลม = (π × d²) / 4
        </div>
        <p>
          ความหมายของตัวแปรในสูตร:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>π (พาย):</strong> ค่าคงตัวทางคณิตศาสตร์ มีค่าประมาณ 3.14159...</li>
          <li><strong>d (เส้นผ่านศูนย์กลาง):</strong> ระยะทางเส้นตรงที่ยาวที่สุดที่ลากจากขอบวงกลมฝั่งหนึ่ง ผ่านจุดศูนย์กลาง ไปยังขอบอีกฝั่งหนึ่ง (Diameter)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">ตัวอย่างวิธีการคำนวณ</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">ตัวอย่างที่ 1: การปูหญ้าบริเวณน้ำพุ</h4>
            <p>เทศบาลต้องการปูหญ้าเทียมรอบลานน้ำพุวงกลม วัดความกว้างจากขอบถึงขอบ (เส้นผ่านศูนย์กลาง) ได้ 14 เมตร จะต้องซื้อหญ้าเทียมพื้นที่เท่าใด?</p>
            <p className="mt-2 text-gray-600">
              วิธีทำ:<br/>
              ขั้นตอนที่ 1: หารัศมี r = d / 2 = 14 / 2 = 7 เมตร<br/>
              ขั้นตอนที่ 2: ใช้สูตร พื้นที่ = π × r²<br/>
              พื้นที่ = (22/7) × (7)²<br/>
              พื้นที่ = (22/7) × 49 = 154 ตารางเมตร
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">ตัวอย่างที่ 2: การคำนวณพื้นที่หน้าตัดของเสาเข็ม</h4>
            <p>เสาเข็มคอนกรีตทรงกระบอกมีเส้นผ่านศูนย์กลาง 0.8 เมตร พื้นที่หน้าตัดของเสาเข็มต้นนี้มีค่าเท่าใด?</p>
            <p className="mt-2 text-gray-600">
              วิธีทำ (ใช้สูตรตรง):<br/>
              พื้นที่ = (π × d²) / 4<br/>
              พื้นที่ = (3.14159 × 0.8²) / 4<br/>
              พื้นที่ = (3.14159 × 0.64) / 4<br/>
              พื้นที่ = 2.0106 / 4 ≈ 0.5026 ตารางเมตร
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">การใช้งานจริงในภาคอุตสาหกรรมต่างๆ</h3>
        <ul className="space-y-3 mt-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>งานท่อประปาและท่อส่งก๊าซ:</strong> ท่อต่างๆ มักถูกระบุสเปคด้วยขนาดเส้นผ่านศูนย์กลาง (เช่น ท่อขนาด 2 นิ้ว, 4 นิ้ว) การคำนวณพื้นที่หน้าตัดจะช่วยบอกอัตราการไหลสูดสุดที่ท่อสามารถรับได้</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>งานกลึงและงานโลหะ:</strong> ชิ้นงานที่เป็นเพลาหรือกระบอกสูบจะวัดขนาดได้ง่ายจากเส้นผ่านศูนย์กลางภายนอก การรู้พื้นที่หน้าตัดช่วยในการคำนวณน้ำหนักและแรงเค้นของวัสดุ</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>ดาราศาสตร์:</strong> เราสามารถสังเกตและวัดได้เพียงเส้นผ่านศูนย์กลางเชิงมุมของดวงดาวหรือปล่องภูเขาไฟบนดวงจันทร์ เพื่อนำมาคำนวณหาพื้นที่ผิวจริงที่สังเกตเห็นจากโลก</span>
          </li>
        </ul>

        <div className="mt-8 p-6 bg-purple-50 rounded-xl border border-purple-200">
          <h4 className="font-bold text-purple-800 mb-2">เคล็ดลับเพื่อหลีกเลี่ยงความผิดพลาด</h4>
          <p className="text-purple-900 text-sm">
            ความผิดพลาดที่พบบ่อยที่สุดคือการนำเส้นผ่านศูนย์กลาง (d) ไปใช้แทนค่ารัศมี (r) ในสูตร πr² โดยตรง ซึ่งจะทำให้พื้นที่ที่ได้มีขนาดใหญ่เกินความจริงถึง 4 เท่า 
            ดังนั้น หากคุณวัดความกว้างทั้งหมดของวงกลมมา (เส้นผ่านศูนย์กลาง) อย่าลืมหาร 2 เพื่อให้ได้รัศมีก่อนนำไปยกกำลังสอง หรือหากจะใช้สูตรที่คำนวณจากเส้นผ่านศูนย์กลางโดยตรง 
            ต้องมั่นใจว่าใช้สูตร <strong>(π × d²) / 4</strong> อย่างถูกต้องและต้องหารด้วย 4 ในขั้นตอนสุดท้ายเสมอ
          </p>
        </div>
      </article>
    </div>
  );
}

import React, { useState } from 'react';
import { Circle, Calculator, Info, CheckCircle2 } from 'lucide-react';

export default function AreaCircleRadius({ lang = 'th' }: any) {
  const [radius, setRadius] = useState<string>('');
  const [area, setArea] = useState<number | null>(null);

  const t = {
    title: lang === 'en' ? 'Circle Area Calculator (Radius)' : 'โปรแกรมคำนวณพื้นที่วงกลม (จากรัศมี)',
    radius: lang === 'en' ? 'Radius (r)' : 'รัศมี (r)',
    calculate: lang === 'en' ? 'Calculate Area' : 'คำนวณพื้นที่',
    result: lang === 'en' ? 'Area of the Circle' : 'พื้นที่วงกลม',
    unit: lang === 'en' ? 'square units' : 'ตารางหน่วย',
    placeholder: lang === 'en' ? 'Enter radius' : 'กรอกความยาวรัศมี',
  };

  const calculate = () => {
    const r = parseFloat(radius);
    if (!isNaN(r) && r > 0) {
      setArea(Math.PI * Math.pow(r, 2));
    } else {
      setArea(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
        <div className="bg-rose-600 p-6 text-white text-center">
          <Circle className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">{t.title}</h1>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.radius}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    placeholder={t.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                    min="0"
                    step="any"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  รัศมีคือระยะทางจากจุดศูนย์กลางไปยังขอบของวงกลม
                </p>
              </div>
              <button
                onClick={calculate}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                {t.calculate}
              </button>
            </div>

            <div className="bg-rose-50 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-rose-100">
              <h3 className="text-lg font-medium text-rose-900 mb-2">{t.result}</h3>
              {area !== null ? (
                <div>
                  <div className="text-4xl font-bold text-rose-700 mb-2">
                    {area.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </div>
                  <div className="text-rose-600 font-medium">{t.unit}</div>
                </div>
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <Info className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm">โปรดกรอกความยาวของรัศมี<br/>เพื่อคำนวณพื้นที่</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-rose max-w-none text-gray-700 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Info className="w-6 h-6 text-rose-600" />
          เรียนรู้วิธีการคำนวณพื้นที่วงกลมจากรัศมี
        </h2>
        
        <p>
          วงกลม (Circle) ถือเป็นรูปทรงเรขาคณิตพื้นฐานที่มีความสมบูรณ์แบบมากที่สุดในธรรมชาติ 
          และถูกประยุกต์ใช้อย่างแพร่หลายในโลกแห่งความเป็นจริง ไม่ว่าจะเป็นวงล้อของยานพาหนะ หน้าปัดนาฬิกา เหรียญ หรือแม้แต่ดาวเคราะห์ 
          การคำนวณหาพื้นที่ของวงกลมจึงเป็นทักษะทางคณิตศาสตร์ที่จำเป็นและนำไปใช้ประโยชน์ได้อย่างมากมายมหาศาล 
          ทั้งในงานด้านวิศวกรรม สถาปัตยกรรม การออกแบบอุตสาหกรรม ตลอดจนในชีวิตประจำวันทั่วไป
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">สูตรการหาพื้นที่วงกลมด้วยรัศมี</h3>
        <p>
          หากเราทราบค่า "รัศมี" ซึ่งหมายถึงระยะห่างจากจุดศูนย์กลางของวงกลมลากไปจรดเส้นรอบวง 
          เราสามารถใช้สูตรคณิตศาสตร์ที่เป็นสากลและแม่นยำในการคำนวณหาพื้นที่ได้ ดังนี้:
        </p>
        <div className="bg-rose-50 p-4 rounded-lg my-4 text-center font-bold text-lg text-rose-800 border border-rose-200">
          พื้นที่วงกลม = π × r²
        </div>
        <p>
          องค์ประกอบของสูตร:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>π (พาย):</strong> เป็นค่าคงตัวทางคณิตศาสตร์ที่เป็นอัตราส่วนระหว่างเส้นรอบวงต่อเส้นผ่านศูนย์กลาง มีค่าประมาณ 3.14159... หรือ 22/7</li>
          <li><strong>r (รัศมี):</strong> คือระยะห่างจากจุดศูนย์กลางถึงขอบของวงกลม (Radius)</li>
          <li><strong>r² (อาร์กำลังสอง):</strong> หมายถึง การนำค่ารัศมีมาคูณตัวมันเอง (r × r)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">ค่า π (พาย) มีความสำคัญอย่างไร?</h3>
        <p>
          ค่า π เป็นหัวใจสำคัญของรูปทรงวงกลม ไม่ว่าวงกลมนั้นจะมีขนาดใหญ่เท่าจักรวาลหรือเล็กเท่าอะตอม 
          อัตราส่วนระหว่างเส้นรอบวงกับเส้นผ่านศูนย์กลางจะยังคงเท่ากับค่า π เสมอ ในการคำนวณระดับทั่วไป 
          เรามักใช้ค่า 3.14 หรือ 22/7 ก็เพียงพอ แต่ในระดับโปรแกรมคำนวณนี้ เราใช้ค่า π จากระบบของคอมพิวเตอร์ (Math.PI) 
          ที่มีความละเอียดสูงระดับทศนิยมหลายสิบตำแหน่ง เพื่อให้ผลลัพธ์มีความแม่นยำสูงสุด
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">ตัวอย่างวิธีการคำนวณ</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">ตัวอย่างที่ 1: การคำนวณพื้นที่ลานอเนกประสงค์</h4>
            <p>โรงเรียนแห่งหนึ่งต้องการเทปูนเพื่อสร้างลานกิจกรรมทรงวงกลม ซึ่งมีรัศมีจากจุดศูนย์กลางยาว 10 เมตร ลานนี้จะมีพื้นที่เท่าใด?</p>
            <p className="mt-2 text-gray-600">
              วิธีทำ:<br/>
              สูตรพื้นที่ = π × r²<br/>
              พื้นที่ = 3.14159 × (10)²<br/>
              พื้นที่ = 3.14159 × 100<br/>
              พื้นที่ ≈ 314.159 ตารางเมตร
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">ตัวอย่างที่ 2: การคำนวณหน้าตัดท่อน้ำ</h4>
            <p>ท่อส่งน้ำขนาดใหญ่มีรัศมีภายใน 0.5 เมตร ต้องการทราบพื้นที่หน้าตัดเพื่อคำนวณอัตราการไหลของน้ำ</p>
            <p className="mt-2 text-gray-600">
              วิธีทำ:<br/>
              พื้นที่ = π × r²<br/>
              พื้นที่ = 3.14159 × (0.5)²<br/>
              พื้นที่ = 3.14159 × 0.25<br/>
              พื้นที่ ≈ 0.785 ตารางเมตร
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">ประโยชน์และการประยุกต์ใช้</h3>
        <ul className="space-y-3 mt-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>งานวิศวกรรมโยธาและชลประทาน:</strong> การคำนวณพื้นที่หน้าตัดของท่อระบายน้ำ คลองส่งน้ำทรงกลม หรือเสาเข็มคอนกรีตเสริมเหล็ก</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>อุตสาหกรรมอาหาร:</strong> การคำนวณขนาดและพื้นที่ของพิซซ่า เค้ก หรือจาน เพื่อกำหนดปริมาณวัตถุดิบและราคาขายที่เหมาะสม</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>การออกแบบเครื่องจักร:</strong> การคำนวณพื้นที่ของกระบอกสูบ ลูกสูบ แกนเพลา ลูกปืนกลม หรือชิ้นส่วนหมุนต่างๆ ภายในเครื่องยนต์</span>
          </li>
        </ul>

        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h4 className="font-bold text-blue-800 mb-2">ข้อควรระวังสำคัญ</h4>
          <p className="text-blue-900 text-sm">
            ผู้คนจำนวนมากมักสับสนระหว่าง <strong>"รัศมี (Radius)"</strong> และ <strong>"เส้นผ่านศูนย์กลาง (Diameter)"</strong> 
            สูตรพื้นที่วงกลม πr² จะใช้ได้กับค่า "รัศมี" เท่านั้น หากคุณมีค่าเส้นผ่านศูนย์กลาง คุณจะต้องนำค่านั้นมาหารด้วย 2 เสียก่อนจึงจะได้ค่ารัศมี 
            นอกจากนี้ อย่าลืมว่า r² หมายถึง นำค่ารัศมีมาคูณกันสองครั้ง (r × r) ไม่ใช่นำค่ารัศมีมาคูณด้วย 2 (r × 2) เด็ดขาด
          </p>
        </div>
      </article>
    </div>
  );
}

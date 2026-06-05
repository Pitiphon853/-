import React, { useState, useEffect } from 'react';
import { PieChart, Calculator, Info, Target, Settings, Activity } from 'lucide-react';

export default function SectorAreaCalculator({ lang }: { lang: any }) {
  const isTH = lang === 'TH';
  const [radius, setRadius] = useState<string>('');
  const [angle, setAngle] = useState<string>('');
  const [angleUnit, setAngleUnit] = useState<'degree' | 'radian'>('degree');
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const r = parseFloat(radius);
    const a = parseFloat(angle);

    if (isNaN(r) || isNaN(a) || r <= 0 || a <= 0) {
      setResult(null);
      return;
    }

    let sectorArea = 0;
    if (angleUnit === 'degree') {
      sectorArea = (a / 360) * Math.PI * r * r;
    } else {
      sectorArea = 0.5 * r * r * a;
    }

    setResult(sectorArea);
  }, [radius, angle, angleUnit]);

  const handleClear = () => {
    setRadius('');
    setAngle('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 md:p-8 text-white text-center">
          <PieChart className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {isTH ? 'เครื่องคำนวณพื้นที่เซกเตอร์' : 'Sector Area Calculator'}
          </h1>
          <p className="text-orange-100 text-lg">
            {isTH ? 'หาพื้นที่ส่วนหนึ่งของวงกลม (คล้ายชิ้นพิซซ่า) อย่างแม่นยำ' : 'Find the area of a circular sector accurately'}
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'รัศมีของวงกลม (r)' : 'Radius (r)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder={isTH ? 'ระบุรัศมี (เช่น 5)' : 'Enter radius (e.g., 5)'}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Activity className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {isTH ? 'มุมที่จุดศูนย์กลาง' : 'Central Angle'}
                  </label>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setAngleUnit('degree')}
                      className={`text-xs px-2 py-1 rounded-md font-medium transition-colors ${
                        angleUnit === 'degree' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {isTH ? 'องศา' : 'Degrees'}
                    </button>
                    <button
                      onClick={() => setAngleUnit('radian')}
                      className={`text-xs px-2 py-1 rounded-md font-medium transition-colors ${
                        angleUnit === 'radian' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {isTH ? 'เรเดียน' : 'Radians'}
                    </button>
                  </div>
                </div>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder={isTH ? 'ระบุมุม' : 'Enter angle'}
                />
              </div>

              <button
                onClick={handleClear}
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2 mt-4"
              >
                <Settings className="w-5 h-5" />
                {isTH ? 'ล้างค่า' : 'Clear'}
              </button>
            </div>

            <div className="bg-orange-50 rounded-2xl p-6 flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-orange-900 mb-6 flex items-center gap-2">
                <Calculator className="w-6 h-6" />
                {isTH ? 'ผลการคำนวณ' : 'Results'}
              </h3>
              
              {result !== null ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100 text-center">
                  <div className="text-sm text-orange-600 mb-2">{isTH ? 'พื้นที่เซกเตอร์ (Sector Area)' : 'Sector Area (A)'}</div>
                  <div className="text-4xl font-bold text-gray-900 break-all">
                    {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8 flex flex-col items-center">
                  <Target className="w-12 h-12 text-orange-200 mb-3" />
                  <p>{isTH ? 'กรุณาระบุรัศมีและมุมให้ครบถ้วนเพื่อดูผลลัพธ์' : 'Enter radius and angle to see results'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-orange max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Info className="w-7 h-7 text-orange-600" />
          ทำความรู้จักกับพื้นที่เซกเตอร์ของวงกลม (Sector Area)
        </h2>
        
        <p>
          หากเราพูดถึง <strong>"เซกเตอร์ของวงกลม" (Circular Sector)</strong> หลายคนอาจจะนึกภาพไม่ออกในทันที แต่ถ้าให้จินตนาการถึง <strong>"ชิ้นพิซซ่า"</strong> หรือ <strong>"เค้กที่ถูกตัดแบ่ง"</strong> เชื่อว่าทุกคนจะร้องอ๋อทันที! ในทางเรขาคณิต เซกเตอร์คือพื้นที่ส่วนหนึ่งของวงกลมที่ถูกล้อมรอบด้วยรัศมี 2 เส้น และส่วนโค้งของวงกลม (Arc) ที่เชื่อมระหว่างปลายรัศมีทั้งสองเส้นนั้น
        </p>

        <h3>เซกเตอร์ (Sector) vs เซกเมนต์ (Segment)</h3>
        <p>
          หลายคนมักสับสนระหว่างเซกเตอร์กับเซกเมนต์ของวงกลม 
          <strong>เซกเตอร์ (Sector)</strong> จะมีรูปร่างเหมือนชิ้นพิซซ่า คือเริ่มตัดจากจุดศูนย์กลางออกไปยังขอบวงกลม 
          ในขณะที่ <strong>เซกเมนต์ (Segment)</strong> คือพื้นที่ที่เกิดจากการลากเส้นตรง (คอร์ด) ตัดผ่านวงกลม ทำให้ได้พื้นที่ที่มีลักษณะเหมือนพระจันทร์เสี้ยว หรือส่วนโค้งที่ถูกตัดทอน ดังนั้นการคำนวณหาพื้นที่ของสองรูปทรงนี้จึงแตกต่างกันอย่างสิ้นเชิง
        </p>

        <h3>สูตรการหาพื้นที่เซกเตอร์ (Sector Area Formulas)</h3>
        <p>
          ในการคำนวณหาพื้นที่เซกเตอร์ (Area, A) ตัวแปรสำคัญที่เราต้องรู้คือ <strong>รัศมี (r)</strong> และ <strong>มุมที่จุดศูนย์กลาง (&theta;)</strong> 
          ซึ่งมุมนี้สามารถวัดได้ 2 แบบ คือ แบบองศา และ แบบเรเดียน ทำให้สูตรการคำนวณแบ่งออกเป็น 2 กรณี:
        </p>

        <ul>
          <li>
            <strong>หากมุม &theta; มีหน่วยเป็นองศา (Degrees):</strong> 
            <br />
            <code>A = (&theta; / 360) &times; &pi;r&sup2;</code>
            <br />
            (สูตรนี้เข้าใจง่ายมาก เพราะ <code>&pi;r&sup2;</code> คือพื้นที่วงกลมทั้งหมด และ <code>&theta; / 360</code> คือสัดส่วนของชิ้นพิซซ่าเทียบกับวงกลมเต็มวง)
          </li>
          <li>
            <strong>หากมุม &theta; มีหน่วยเป็นเรเดียน (Radians):</strong>
            <br />
            <code>A = &frac12; &times; r&sup2; &times; &theta;</code>
            <br />
            (สูตรนี้เป็นสูตรสั้นๆ ที่มักใช้ในการคำนวณทางฟิสิกส์หรือคณิตศาสตร์ระดับสูง)
          </li>
        </ul>

        <h3>การนำความรู้เรื่องเซกเตอร์ไปใช้ในชีวิตจริง</h3>
        <p>
          แม้ว่าเซกเตอร์จะดูเป็นเรื่องทฤษฎี แต่เรากลับพบเห็นการใช้งานของมันอยู่ตลอดเวลาในชีวิตประจำวัน:
        </p>
        <ol>
          <li><strong>แผนภูมิรูปวงกลม (Pie Charts):</strong> ในการนำเสนอข้อมูล สถิติ หรือสัดส่วนทางการตลาด เรามักใช้แผนภูมิวงกลม การที่คอมพิวเตอร์แบ่งชิ้นส่วนของกราฟให้มีขนาดตามเปอร์เซ็นต์ที่ถูกต้องได้ ก็มาจากการคำนวณพื้นที่และมุมของเซกเตอร์นี่เอง</li>
          <li><strong>การแบ่งที่ดินและการเกษตร:</strong> ในบางพื้นที่ที่มีการแบ่งสรรปันส่วนที่ดินเป็นลักษณะวงกลม (เช่น ระบบชลประทานแบบ Center Pivot) การคำนวณพื้นที่เพื่อใส่ปุ๋ยหรือให้น้ำพืชพรรณในแต่ละโซน ต้องใช้สูตรพื้นที่เซกเตอร์</li>
          <li><strong>การออกแบบและสถาปัตยกรรม:</strong> สถาปนิกที่ต้องการออกแบบห้องโถงโค้ง ลานแสดงสินค้า หรือเวทีที่มีรูปร่างเป็นส่วนหนึ่งของวงกลม จำเป็นต้องหาพื้นที่ใช้สอย (Square meters) เพื่อคำนวณวัสดุปูพื้นและงบประมาณ</li>
          <li><strong>ระยะการมองเห็นของกล้องวงจรปิด:</strong> มุมมอง (Field of View) ของเลนส์กล้อง หรือรัศมีเซนเซอร์จับการเคลื่อนไหว มักมีลักษณะกวาดเป็นรูปเซกเตอร์ การคำนวณพื้นที่นี้ช่วยให้วิศวกรประเมินจุดบอด (Blind spot) ด้านความปลอดภัยได้</li>
        </ol>

        <p>
          เครื่องคำนวณพื้นที่เซกเตอร์ที่เราออกแบบมานี้ สามารถช่วยให้คุณหาคำตอบได้อย่างรวดเร็วและแม่นยำ ไม่ว่าคุณจะเลือกใช้หน่วยมุมเป็นองศาหรือเรเดียน เพียงแค่ใส่ค่าตัวเลขลงไป ระบบก็จะประมวลผลพื้นที่ออกมาให้ทันที ช่วยประหยัดเวลาและลดความซับซ้อนในการกดเครื่องคิดเลขได้อย่างมาก
        </p>
      </article>
    </div>
  );
}

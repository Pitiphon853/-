import React, { useState, useEffect } from 'react';
import { CircleDashed, Calculator, Info, Target, Settings, Activity } from 'lucide-react';

export default function ArcLengthCalculator({ lang }: { lang: any }) {
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

    let arcLength = 0;
    if (angleUnit === 'degree') {
      arcLength = 2 * Math.PI * r * (a / 360);
    } else {
      arcLength = r * a;
    }

    setResult(arcLength);
  }, [radius, angle, angleUnit]);

  const handleClear = () => {
    setRadius('');
    setAngle('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-700 p-6 md:p-8 text-white text-center">
          <CircleDashed className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {isTH ? 'เครื่องคำนวณความยาวส่วนโค้ง' : 'Arc Length Calculator'}
          </h1>
          <p className="text-emerald-100 text-lg">
            {isTH ? 'หาความยาวส่วนโค้งของวงกลมตามมุมที่กำหนด' : 'Find the arc length of a circle given the central angle'}
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
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder={isTH ? 'ระบุรัศมี (เช่น 10)' : 'Enter radius (e.g., 10)'}
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
                        angleUnit === 'degree' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {isTH ? 'องศา' : 'Degrees'}
                    </button>
                    <button
                      onClick={() => setAngleUnit('radian')}
                      className={`text-xs px-2 py-1 rounded-md font-medium transition-colors ${
                        angleUnit === 'radian' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'
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
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
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

            <div className="bg-emerald-50 rounded-2xl p-6 flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-emerald-900 mb-6 flex items-center gap-2">
                <Calculator className="w-6 h-6" />
                {isTH ? 'ผลการคำนวณ' : 'Results'}
              </h3>
              
              {result !== null ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 text-center">
                  <div className="text-sm text-emerald-600 mb-2">{isTH ? 'ความยาวส่วนโค้ง (Arc Length)' : 'Arc Length (s)'}</div>
                  <div className="text-4xl font-bold text-gray-900 break-all">
                    {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8 flex flex-col items-center">
                  <Target className="w-12 h-12 text-emerald-200 mb-3" />
                  <p>{isTH ? 'กรุณาระบุรัศมีและมุมให้ครบถ้วนเพื่อดูผลลัพธ์' : 'Enter radius and angle to see results'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-emerald max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Info className="w-7 h-7 text-emerald-600" />
          ความยาวส่วนโค้งของวงกลม (Arc Length) คืออะไร?
        </h2>
        
        <p>
          ในทางเรขาคณิต <strong>"ส่วนโค้งของวงกลม" (Arc of a Circle)</strong> หมายถึงส่วนใดส่วนหนึ่งที่อยู่บนเส้นรอบวงของวงกลม หากเรานึกภาพพิซซ่าถาดกลม ส่วนโค้งก็คือขอบขนมปังของพิซซ่าชิ้นที่เราตัดออกมานั่นเอง การคำนวณหา <strong>"ความยาวส่วนโค้ง" (Arc Length)</strong> จึงมีความสำคัญมากเมื่อเราต้องการทราบระยะทางที่โค้งงอไปตามแนววงกลม 
          ซึ่งไม่ใช่เพียงแค่เส้นตรงธรรมดา การวัดระยะทางในแนวโค้งนี้ถูกประยุกต์ใช้ในหลากหลายสาขาวิชา ทั้งคณิตศาสตร์ ฟิสิกส์ วิศวกรรม และดาราศาสตร์
        </p>

        <h3>ปัจจัยสำคัญในการคำนวณความยาวส่วนโค้ง</h3>
        <p>
          เพื่อที่จะหาความยาวของส่วนโค้งได้ เราจำเป็นต้องรู้ข้อมูล 2 ประการหลักๆ ได้แก่:
        </p>
        <ol>
          <li><strong>รัศมีของวงกลม (Radius, r):</strong> ระยะทางจากจุดศูนย์กลางไปยังเส้นรอบวงวงกลม</li>
          <li><strong>มุมที่จุดศูนย์กลาง (Central Angle, &theta;):</strong> มุมที่เกิดจากการลากเส้นตรงจากจุดศูนย์กลางไปยังปลายทั้งสองข้างของส่วนโค้งนั้นๆ ซึ่งสามารถวัดหน่วยเป็น <strong>องศา (Degrees)</strong> หรือ <strong>เรเดียน (Radians)</strong> ก็ได้</li>
        </ol>

        <h3>สูตรการหาความยาวส่วนโค้ง (Arc Length Formulas)</h3>
        <p>
          สูตรที่จะเลือกใช้ขึ้นอยู่กับหน่วยของมุมที่จุดศูนย์กลางที่เรากำหนด:
        </p>
        <ul>
          <li>
            <strong>กรณีมุมมีหน่วยเป็นองศา (Degrees):</strong> 
            สูตรคือ <code>s = 2&pi;r &times; (&theta; / 360)</code>
            <br/>(อธิบาย: 2&pi;r คือความยาวรอบวงทั้งหมด และเรานำมาคูณกับสัดส่วนของมุม &theta; เทียบกับมุมทั้งหมด 360 องศา)
          </li>
          <li>
            <strong>กรณีมุมมีหน่วยเป็นเรเดียน (Radians):</strong>
            สูตรจะง่ายและสั้นกว่ามาก คือ <code>s = r &times; &theta;</code>
            <br/>(อธิบาย: เนื่องจากเรเดียนคือหน่วยที่เกิดจากอัตราส่วนของความยาวส่วนโค้งต่อรัศมีอยู่แล้ว)
          </li>
        </ul>

        <h3>เรเดียนกับองศา แตกต่างกันอย่างไร?</h3>
        <p>
          องศา (Degrees) เป็นหน่วยวัดมุมที่เราคุ้นเคยกันดี โดย 1 วงกลมเต็มจะเท่ากับ 360 องศา ส่วน เรเดียน (Radians) เป็นหน่วยวัดมุมในระบบมาตรฐานสากล (SI) ที่นักคณิตศาสตร์นิยมใช้มากกว่า เนื่องจากมันเชื่อมโยงกับความยาวของเส้นรอบวงโดยตรง 
          ความสัมพันธ์ของทั้งสองหน่วยคือ วงกลม 1 วงเท่ากับ 360 องศา และเท่ากับ 2&pi; เรเดียน (ประมาณ 6.28 เรเดียน) ดังนั้น 180 องศา จะมีค่าเท่ากับ &pi; เรเดียนพอดี
        </p>

        <h3>การนำความรู้เรื่องความยาวส่วนโค้งไปใช้งานจริง</h3>
        <p>
          เราอาจจะไม่รู้ตัวว่าคณิตศาสตร์เรื่องส่วนโค้งถูกซ่อนอยู่ในเทคโนโลยีและสิ่งก่อสร้างรอบตัวเรามากมาย:
        </p>
        <ul>
          <li><strong>วิศวกรรมโยธาและการก่อสร้าง:</strong> การออกแบบสะพานโค้ง ถนนทางโค้ง หรืออุโมงค์ วิศวกรต้องคำนวณความยาวส่วนโค้งอย่างแม่นยำเพื่อหาจำนวนวัสดุที่ต้องใช้ และให้แน่ใจว่ารัศมีโค้งปลอดภัยสำหรับยานพาหนะ</li>
          <li><strong>การคำนวณทางดาราศาสตร์:</strong> การหาระยะทางการโคจรของดาวเทียม หรือดาวเคราะห์ตามแนววงโคจร ซึ่งเป็นวิถีโค้งรอบดาวฤกษ์หรือโลก</li>
          <li><strong>การแข่งขันกรีฑา:</strong> ลู่วิ่งในสนามแข่งขันไม่ได้เป็นทางตรงทั้งหมด การหาจุดเริ่มต้นของนักวิ่งในลู่ที่อยู่รอบนอกเพื่อให้ระยะทางรวมเท่ากับลู่ด้านใน ต้องอาศัยการคำนวณความยาวส่วนโค้งที่แม่นยำ</li>
          <li><strong>งานอุตสาหกรรม:</strong> การดัดเหล็ก ดัดท่อ หรือการตัดแผ่นโลหะให้โค้งงอตามสเปคที่ลูกค้าต้องการ</li>
        </ul>

        <p>
          การใช้ <strong>เครื่องคำนวณความยาวส่วนโค้ง</strong> นี้ จะช่วยให้คุณประหยัดเวลาและลดข้อผิดพลาดในการคำนวณด้วยตนเอง ไม่ว่าคุณจะต้องการทำงานส่งครู ทำโครงงาน หรือแม้แต่ทำงานวิศวกรรมขั้นสูง เครื่องมือนี้ก็พร้อมเป็นผู้ช่วยให้คุณได้คำตอบที่ถูกต้องอย่างรวดเร็ว
        </p>
      </article>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Circle, Calculator, Info, Target, Settings, ArrowRight, Activity } from 'lucide-react';

export default function CircumferenceCalculator({ lang }: { lang: any }) {
  const isTH = lang === 'TH';
  const [inputType, setInputType] = useState<'radius' | 'diameter'>('radius');
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [area, setArea] = useState<number | null>(null);

  useEffect(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val <= 0) {
      setResult(null);
      setArea(null);
      return;
    }

    let radius = val;
    if (inputType === 'diameter') {
      radius = val / 2;
    }

    const circumference = 2 * Math.PI * radius;
    const circleArea = Math.PI * radius * radius;
    setResult(circumference);
    setArea(circleArea);
  }, [inputValue, inputType]);

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8 text-white text-center">
          <Circle className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {isTH ? 'เครื่องคำนวณความยาวเส้นรอบวง' : 'Circumference Calculator'}
          </h1>
          <p className="text-blue-100 text-lg">
            {isTH ? 'คำนวณหาความยาวเส้นรอบวงและพื้นที่ของวงกลมอย่างง่ายดาย' : 'Easily calculate the circumference and area of a circle'}
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'เลือกข้อมูลที่ทราบ' : 'Select known value'}
                </label>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setInputType('radius')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      inputType === 'radius' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {isTH ? 'รัศมี (r)' : 'Radius (r)'}
                  </button>
                  <button
                    onClick={() => setInputType('diameter')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      inputType === 'diameter' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {isTH ? 'เส้นผ่านศูนย์กลาง (d)' : 'Diameter (d)'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? `ระบุ${inputType === 'radius' ? 'รัศมี' : 'เส้นผ่านศูนย์กลาง'}` : `Enter ${inputType}`}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder={isTH ? 'ระบุตัวเลข (เช่น 5)' : 'Enter number (e.g., 5)'}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Activity className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <button
                onClick={handleClear}
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Settings className="w-5 h-5" />
                {isTH ? 'ล้างค่า' : 'Clear'}
              </button>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-6 flex items-center gap-2">
                <Calculator className="w-6 h-6" />
                {isTH ? 'ผลการคำนวณ' : 'Results'}
              </h3>
              
              {result !== null ? (
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                    <div className="text-sm text-blue-600 mb-1">{isTH ? 'ความยาวเส้นรอบวง (Circumference)' : 'Circumference (C)'}</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                    <div className="text-sm text-blue-600 mb-1">{isTH ? 'พื้นที่วงกลม (Area)' : 'Area (A)'}</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {area?.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8 flex flex-col items-center">
                  <Target className="w-12 h-12 text-blue-200 mb-3" />
                  <p>{isTH ? 'กรุณาระบุตัวเลขที่มากกว่า 0 เพื่อดูผลลัพธ์' : 'Enter a positive number to see results'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-blue max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Info className="w-7 h-7 text-blue-600" />
          ความรู้เบื้องต้นเกี่ยวกับเส้นรอบวงของวงกลม (Circumference)
        </h2>
        
        <p>
          รูปทรงเรขาคณิตในวิชาคณิตศาสตร์นั้นมีหลากหลายรูปแบบ แต่ <strong>"วงกลม" (Circle)</strong> ถือเป็นหนึ่งในรูปทรงพื้นฐานที่มีความสำคัญและถูกนำมาใช้งานในชีวิตประจำวันอย่างแพร่หลาย ไม่ว่าจะเป็นในด้านการออกแบบ การก่อสร้าง งานวิศวกรรม หรือแม้กระทั่งสิ่งของเครื่องใช้ใกล้ตัวอย่างเช่น ล้อรถยนต์ นาฬิกา หรือท่อน้ำ 
          การเข้าใจหลักการคำนวณที่เกี่ยวข้องกับวงกลมจึงเป็นพื้นฐานที่มีความจำเป็นอย่างยิ่ง โดยเฉพาะอย่างยิ่ง <strong>"ความยาวเส้นรอบวง" (Circumference)</strong>
        </p>

        <h3>ความยาวเส้นรอบวงคืออะไร?</h3>
        <p>
          ความยาวเส้นรอบวง คือ ระยะทางทั้งหมดที่ลากไปตามขอบหรือขอบเขตภายนอกของวงกลมจนบรรจบเป็นวง หากเปรียบเทียบกับรูปทรงเหลี่ยม มันก็คือ "ความยาวรอบรูป" (Perimeter) นั่นเอง แต่สำหรับรูปวงกลม เราจะมีคำศัพท์เฉพาะคือ Circumference 
          การที่เราจะหาความยาวนี้ได้ เราจำเป็นต้องอาศัยค่าคงที่ทางคณิตศาสตร์ที่โด่งดังระดับโลก ซึ่งก็คือค่า <strong>พาย (&pi;)</strong>
        </p>

        <h3>สูตรการคำนวณเส้นรอบวง</h3>
        <p>
          ในการคำนวณหาความยาวเส้นรอบวงของวงกลม เราสามารถคำนวณได้ 2 วิธีหลักๆ ขึ้นอยู่กับข้อมูลที่เรามี ได้แก่:
        </p>
        <ul>
          <li>
            <strong>กรณีที่ทราบค่ารัศมี (r):</strong> <code>C = 2 &times; &pi; &times; r</code><br />
            (รัศมี หรือ Radius คือระยะห่างจากจุดศูนย์กลางไปยังขอบของวงกลม)
          </li>
          <li>
            <strong>กรณีที่ทราบค่าเส้นผ่านศูนย์กลาง (d):</strong> <code>C = &pi; &times; d</code><br />
            (เส้นผ่านศูนย์กลาง หรือ Diameter คือระยะจากขอบด้านหนึ่งไปยังขอบอีกด้านหนึ่งโดยลากผ่านจุดศูนย์กลาง ซึ่งจะมีค่าเท่ากับ 2 เท่าของรัศมี หรือ d = 2r)
          </li>
        </ul>

        <h3>ทำความรู้จักกับค่า &pi; (Pi)</h3>
        <p>
          ค่าพาย (&pi;) เป็นค่าคงตัวทางคณิตศาสตร์ที่เกิดจากอัตราส่วนระหว่างความยาวเส้นรอบวงของวงกลมต่อความยาวเส้นผ่านศูนย์กลางของวงกลมนั้น ไม่ว่าวงกลมจะเล็กหรือใหญ่แค่ไหน อัตราส่วนนี้จะมีค่าเท่าเดิมเสมอ 
          ค่าของ &pi; เป็นจำนวนอตรรกยะ หมายความว่ามันมีทศนิยมที่ไม่สิ้นสุดและไม่ซ้ำ โดยค่าประมาณที่เรามักจะใช้ในการคำนวณทั่วไปคือ <strong>3.14159</strong> หรือ <strong>22/7</strong> 
          อย่างไรก็ตาม ในการคำนวณทางวิทยาศาสตร์และวิศวกรรมที่ต้องการความแม่นยำสูง จะมีการใช้ทศนิยมของค่า &pi; ในจำนวนตำแหน่งที่มากขึ้น
        </p>

        <h3>การนำความรู้เรื่องเส้นรอบวงไปใช้ในชีวิตประจำวัน</h3>
        <p>
          ความเข้าใจในเรื่องของเส้นรอบวงวงกลมถูกประยุกต์ใช้ในหลากหลายอุตสาหกรรม ยกตัวอย่างเช่น:
        </p>
        <ol>
          <li><strong>อุตสาหกรรมยานยนต์:</strong> การคำนวณเส้นรอบวงของล้อรถมีผลต่อความเร็ว ระยะทางที่แสดงบนหน้าปัดรถยนต์ หากเราเปลี่ยนขนาดล้อรถให้ใหญ่ขึ้นหรือเล็กลงโดยไม่ได้ปรับตั้งค่าหน้าปัด ความเร็วที่แสดงจะคลาดเคลื่อนจากความเป็นจริง</li>
          <li><strong>การก่อสร้างและระบบท่อ:</strong> ในงานวิศวกรรมระบบท่อ การหาความกว้างรอบท่อเพื่อเลือกขนาดฉนวนหุ้มท่อ หรือปริมาณของเหลวที่ไหลผ่านท่อ ต้องใช้พื้นฐานเรื่องวงกลมอย่างหลีกเลี่ยงไม่ได้</li>
          <li><strong>การออกแบบแฟชั่นและเครื่องประดับ:</strong> การวัดขนาดนิ้วเพื่อทำแหวน หรือขนาดข้อมือเพื่อทำกำไล ล้วนใช้หลักการของเส้นรอบวง</li>
          <li><strong>ดาราศาสตร์:</strong> นักดาราศาสตร์ใช้สมการเกี่ยวกับเส้นรอบวงเพื่อคำนวณวงโคจรของดวงดาวรอบดวงอาทิตย์ หรือระยะทางการเดินทางของดาวเทียมในอวกาศ</li>
        </ol>

        <p>
          จากที่กล่าวมาข้างต้น จะเห็นได้ว่าการคำนวณเส้นรอบวงนั้นเป็นมากกว่าแค่สูตรในห้องเรียน แต่เป็นกุญแจสำคัญที่ทำให้เราเข้าใจโลกรอบตัวและช่วยสร้างสรรค์นวัตกรรมใหม่ๆ เครื่องมือคำนวณเส้นรอบวงนี้จึงถูกออกแบบมาเพื่อให้คุณสามารถหาค่าความยาวเส้นรอบวงและพื้นที่วงกลมได้อย่างแม่นยำและรวดเร็ว เพียงแค่กรอกค่ารัศมีหรือเส้นผ่านศูนย์กลางเท่านั้น
        </p>
      </article>
    </div>
  );
}

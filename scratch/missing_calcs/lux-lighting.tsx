import React, { useState } from 'react';
import { Sun, Lightbulb, Grid, RefreshCw } from 'lucide-react';

export default function LuxLighting({ lang = 'EN' }: any) {
  const isTH = lang === 'TH';

  const [mode, setMode] = useState<'calc' | 'convert'>('calc');

  // Calc State
  const [area, setArea] = useState<number>(20);
  const [unit, setUnit] = useState<'sqm' | 'sqft'>('sqm');
  const [roomType, setRoomType] = useState<number>(500); // Lux value
  const [customLux, setCustomLux] = useState<number>(500);

  // Convert State
  const [convertValue, setConvertValue] = useState<number>(100);
  const [convertFrom, setConvertFrom] = useState<'lux' | 'fc'>('lux');

  const roomOptions = [
    { labelEN: 'Bedroom', labelTH: 'ห้องนอน', lux: 150 },
    { labelEN: 'Living Room', labelTH: 'ห้องนั่งเล่น', lux: 200 },
    { labelEN: 'Kitchen', labelTH: 'ห้องครัว', lux: 400 },
    { labelEN: 'Bathroom', labelTH: 'ห้องน้ำ', lux: 300 },
    { labelEN: 'Office / Study', labelTH: 'ห้องทำงาน / อ่านหนังสือ', lux: 500 },
    { labelEN: 'Workshop', labelTH: 'ห้องปฏิบัติการช่าง', lux: 750 },
    { labelEN: 'Custom', labelTH: 'กำหนดเอง', lux: -1 },
  ];

  const targetLux = roomType === -1 ? customLux : roomType;
  
  // 1 sq meter = 10.7639 sq feet
  const areaInSqm = unit === 'sqm' ? area : area / 10.7639;
  const requiredLumens = targetLux * areaInSqm;

  // Conversion
  // 1 Foot-candle = 10.7639 Lux
  const convertedLux = convertFrom === 'lux' ? convertValue : convertValue * 10.7639;
  const convertedFc = convertFrom === 'fc' ? convertValue : convertValue / 10.7639;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-yellow-100 rounded-lg">
          <Sun className="w-6 h-6 text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isTH ? 'คำนวณความสว่าง (Lux / Lumens)' : 'Lighting Calculator (Lux / Lumens)'}
        </h2>
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setMode('calc')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
            mode === 'calc'
              ? 'bg-yellow-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isTH ? 'คำนวณจำนวนหลอดไฟ (Lumens)' : 'Calculate Required Lumens'}
        </button>
        <button
          onClick={() => setMode('convert')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
            mode === 'convert'
              ? 'bg-yellow-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isTH ? 'แปลงหน่วย Lux / Foot-candle' : 'Convert Lux / Foot-candle'}
        </button>
      </div>

      {mode === 'calc' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-yellow-50 p-6 rounded-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? 'เลือกประเภทห้อง' : 'Select Room Type'}
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"
              >
                {roomOptions.map((opt) => (
                  <option key={opt.labelEN} value={opt.lux}>
                    {isTH ? opt.labelTH : opt.labelEN} {opt.lux !== -1 && `(${opt.lux} Lux)`}
                  </option>
                ))}
              </select>
            </div>

            {roomType === -1 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'ระบุค่าความสว่างเป้าหมาย (Lux)' : 'Target Illuminance (Lux)'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={customLux}
                  onChange={(e) => setCustomLux(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"
                />
              </div>
            )}

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'พื้นที่ห้อง' : 'Room Area'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Grid className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"
                  />
                </div>
              </div>
              <div className="w-32">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'หน่วย' : 'Unit'}
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as 'sqm' | 'sqft')}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"
                >
                  <option value="sqm">ตร.ม. (m²)</option>
                  <option value="sqft">ตร.ฟุต (ft²)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100 flex flex-col justify-center text-center">
            <Lightbulb className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-gray-500 font-medium mb-2">
              {isTH ? 'ปริมาณแสงสว่างที่ต้องการ (Lumens)' : 'Required Total Lumens'}
            </h3>
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {Math.round(requiredLumens).toLocaleString()} <span className="text-xl text-gray-500 font-normal">lm</span>
            </div>
            <p className="text-sm text-gray-400">
              {isTH 
                ? 'คำแนะนำ: นำค่า Lumens นี้ไปหารด้วยค่า Lumens ของหลอดไฟที่คุณจะซื้อ เพื่อหาจำนวนหลอดที่ต้องใช้' 
                : 'Tip: Divide this number by the Lumens rating of your chosen light bulb to get the number of bulbs needed.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-2xl text-center">
          <div className="flex items-center justify-between mb-8">
            <div className="w-5/12">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {convertFrom === 'lux' ? 'Lux' : 'Foot-candle (fc)'}
              </label>
              <input
                type="number"
                value={convertValue}
                onChange={(e) => setConvertValue(Number(e.target.value) || 0)}
                className="w-full text-center px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none text-xl font-bold"
              />
            </div>
            
            <button 
              onClick={() => setConvertFrom(convertFrom === 'lux' ? 'fc' : 'lux')}
              className="p-3 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-100 text-gray-600"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            <div className="w-5/12">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {convertFrom === 'lux' ? 'Foot-candle (fc)' : 'Lux'}
              </label>
              <div className="w-full text-center px-4 py-3 bg-gray-200 border border-gray-300 rounded-xl text-xl font-bold text-gray-700">
                {convertFrom === 'lux' ? convertedFc.toFixed(2) : convertedLux.toFixed(2)}
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            1 Foot-candle ≈ 10.764 Lux
          </p>
        </div>
      )}

      <div className="mt-12 bg-white rounded-2xl">
        {isTH ? (
          <article className="prose prose-yellow max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ทำความเข้าใจความสว่าง: Lux, Lumens และ Foot-candle</h2>
            <p>
              การออกแบบแสงสว่างภายในบ้านหรือสถานที่ทำงานเป็นสิ่งสำคัญที่มักถูกมองข้าม แสงสว่างที่เหมาะสมไม่เพียงแต่ช่วยเรื่องความสวยงามและมองเห็นได้ชัดเจนเท่านั้น แต่ยังส่งผลต่ออารมณ์ สุขภาพสายตา และประสิทธิภาพในการทำงานอีกด้วย ในการเลือกซื้อหลอดไฟหรือออกแบบแสงสว่าง เรามักจะเจอคำศัพท์ 3 คำนี้ ได้แก่ <strong>ลูเมน (Lumens)</strong>, <strong>ลักซ์ (Lux)</strong> และ <strong>ฟุตแคนเดิล (Foot-candle)</strong>
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Lumens vs Lux ต่างกันอย่างไร?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>ลูเมน (Lumens - lm):</strong> คือหน่วยวัด <em>ปริมาณแสงสว่างทั้งหมด</em> ที่หลอดไฟเปล่งออกมา ยิ่งค่าลูเมนมาก หลอดไฟดวงนั้นก็ยิ่งสว่างมาก (เทียบได้กับปริมาณน้ำที่พ่นออกจากสายยาง)
              </li>
              <li>
                <strong>ลักซ์ (Lux - lx):</strong> คือหน่วยวัด <em>ความสว่างที่ตกลงบนพื้นที่</em> (Illuminance) โดย 1 Lux เท่ากับ 1 ลูเมนต่อตารางเมตร (1 lm/m²) ดังนั้น แม้หลอดไฟจะมีลูเมนเท่าเดิม แต่ถ้านำไปติดในห้องที่กว้างขึ้น ค่า Lux ที่ได้ก็จะลดลง (เทียบได้กับความเปียกของพื้นเมื่อโดนน้ำ)
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Foot-candle คืออะไร?</h3>
            <p>
              <strong>Foot-candle (fc)</strong> เป็นหน่วยวัดความสว่างที่นิยมใช้ในฝั่งอเมริกา โดยนิยามจากความสว่างของแสงเทียน 1 เล่มที่ตกกระทบลงบนพื้นที่ในรัศมี 1 ฟุต การแปลงหน่วยสามารถทำได้ง่ายๆ คือ <strong>1 Foot-candle มีค่าประมาณ 10.76 ลักซ์</strong> เครื่องมือนี้จึงมีฟังก์ชันแปลงหน่วยเพื่ออำนวยความสะดวกให้ผู้ที่อ่านแบบฝรั่ง
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">การคำนวณหาจำนวนหลอดไฟที่ต้องใช้</h3>
            <p>
              หากคุณต้องการทราบว่าห้องๆ หนึ่งควรติดหลอดไฟกี่ดวง สามารถทำตามขั้นตอนได้ดังนี้:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>กำหนดค่า Lux เป้าหมาย:</strong> แต่ละห้องต้องการความสว่างไม่เท่ากัน เช่น ห้องนอนต้องการแสงสลัวๆ เพื่อการพักผ่อน (150 Lux) ในขณะที่ห้องทำงานหรืออ่านหนังสือต้องการแสงสว่างที่ชัดเจน (500 Lux)</li>
              <li><strong>คำนวณพื้นที่ห้อง:</strong> หาพื้นที่เป็นตารางเมตร (กว้าง × ยาว)</li>
              <li><strong>หาค่า Lumens รวม:</strong> เอาค่า Lux × พื้นที่ตารางเมตร = จำนวน Lumens ทั้งหมดที่ต้องการ</li>
              <li><strong>หาจำนวนหลอดไฟ:</strong> นำค่า Lumens รวมไปหารกับค่า Lumens ของหลอดไฟที่คุณจะซื้อ (ดูได้จากข้างกล่อง) ตัวอย่างเช่น ห้องทำงานต้องการ 10,000 Lumens หากใช้หลอดไฟ LED ที่มีค่า 1,000 Lumens ก็จะต้องใช้หลอดไฟทั้งหมด 10 หลอด</li>
            </ol>
            
            <p className="mt-4">
              <em>หมายเหตุ:</em> การคำนวณนี้เป็นค่าประมาณการเบื้องต้น ในความเป็นจริงอาจต้องเผื่อค่าการสะท้อนแสงของผนัง (สีเข้มดูดซับแสง สีอ่อนสะท้อนแสง) ความสูงของเพดาน และรูปแบบของโคมไฟด้วย
            </p>
          </article>
        ) : (
          <article className="prose prose-yellow max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Illuminance: Lux, Lumens, and Foot-candles</h2>
            <p>
              Lighting design is a critical aspect of creating a comfortable and functional space. Whether you're setting up a home office or designing a workshop, understanding the terminology—specifically Lumens, Lux, and Foot-candles—is essential.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Lumens vs. Lux</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Lumens (lm):</strong> Measure the total amount of visible light emitted by a source. The higher the lumen rating, the brighter the bulb.</li>
              <li><strong>Lux (lx):</strong> Measures illuminance, or the amount of light that falls on a surface. One lux is equal to one lumen per square meter. If you place the same light bulb in a larger room, the lux level will be lower because the light is spread over a larger area.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">What is a Foot-candle?</h3>
            <p>
              A <strong>Foot-candle (fc)</strong> is a non-SI unit of illuminance widely used in the United States. It represents the illuminance cast on a surface by a one-candela source one foot away. One foot-candle is approximately equal to 10.76 lux. Our calculator provides a quick toggle to convert between these two units.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">How to Calculate Required Lighting</h3>
            <p>
              To figure out how many light fixtures you need for a room:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Determine Target Lux:</strong> Different tasks require different light levels (e.g., 150 lux for a bedroom, 500 lux for an office).</li>
              <li><strong>Calculate Area:</strong> Find your room's square footage or square meters.</li>
              <li><strong>Find Total Lumens:</strong> Multiply your target lux by the area in square meters. This gives you the total required lumens.</li>
              <li><strong>Determine Bulbs:</strong> Divide the total required lumens by the lumen output of your chosen bulb (found on the packaging) to get the number of bulbs needed.</li>
            </ol>
            <p className="mt-4">
              <em>Note:</em> This calculation provides a solid baseline. Real-world results will vary based on wall colors, ceiling height, and fixture design.
            </p>
          </article>
        )}
      </div>
    </div>
  );
}

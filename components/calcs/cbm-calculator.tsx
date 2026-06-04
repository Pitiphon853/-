import React, { useState } from 'react';
import { Box, Calculator, Info, Ruler, Package, RefreshCw, Layers } from 'lucide-react';

export default function CbmCalculator({ lang }: any) {
  const isTH = lang === 'TH';

  const [length, setLength] = useState<number | ''>('');
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [unit, setUnit] = useState<string>('cm');
  const [quantity, setQuantity] = useState<number | ''>(1);
  const [weight, setWeight] = useState<number | ''>('');

  const calculate = () => {
    const l = Number(length) || 0;
    const w = Number(width) || 0;
    const h = Number(height) || 0;
    const q = Number(quantity) || 1;
    const wt = Number(weight) || 0;

    let multiplier = 1;
    if (unit === 'cm') multiplier = 0.01;
    if (unit === 'inch') multiplier = 0.0254;
    if (unit === 'mm') multiplier = 0.001;

    // Volume per item in Cubic Meters
    const volPerItem = (l * multiplier) * (w * multiplier) * (h * multiplier);
    const totalCbm = volPerItem * q;
    const totalWeight = wt * q;

    // Standard Volumetric Weight calculation
    // Air Freight: 1 CBM = 167 kg
    // Sea Freight: 1 CBM = 1000 kg
    const vwAir = totalCbm * 167;
    const vwSea = totalCbm * 1000;

    return {
      totalCbm: totalCbm.toFixed(4),
      totalWeight: totalWeight.toFixed(2),
      vwAir: vwAir.toFixed(2),
      vwSea: vwSea.toFixed(2)
    };
  };

  const results = calculate();

  const resetFields = () => {
    setLength('');
    setWidth('');
    setHeight('');
    setQuantity(1);
    setWeight('');
    setUnit('cm');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="bg-indigo-600 p-6 text-white flex items-center gap-3">
          <Box className="w-8 h-8" />
          <h2 className="text-2xl font-bold">
            {isTH ? 'เครื่องมือคำนวณ CBM (ลูกบาศก์เมตร)' : 'CBM Calculator'}
          </h2>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-slate-50 p-5 rounded-xl space-y-4 border border-slate-100">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-indigo-500" />
                  {isTH ? 'ขนาดของสินค้า (ต่อชิ้น)' : 'Dimensions (Per Item)'}
                </h3>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="cm">Centimeter (cm)</option>
                  <option value="m">Meter (m)</option>
                  <option value="inch">Inch (in)</option>
                  <option value="mm">Millimeter (mm)</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">{isTH ? 'ยาว (Length)' : 'Length'}</label>
                  <input
                    type="number"
                    min="0"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">{isTH ? 'กว้าง (Width)' : 'Width'}</label>
                  <input
                    type="number"
                    min="0"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">{isTH ? 'สูง (Height)' : 'Height'}</label>
                  <input
                    type="number"
                    min="0"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl space-y-4 border border-slate-100">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-500" />
                {isTH ? 'จำนวนและน้ำหนัก' : 'Quantity & Weight'}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">{isTH ? 'จำนวนชิ้น / กล่อง' : 'Quantity'}</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">{isTH ? 'น้ำหนักต่อชิ้น (กก.)' : 'Weight per item (kg)'}</label>
                  <input
                    type="number"
                    min="0"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={resetFields}
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              {isTH ? 'ล้างข้อมูล' : 'Reset'}
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 h-full flex flex-col justify-center">
              <div className="text-center mb-8">
                <p className="text-indigo-600 font-semibold mb-2">{isTH ? 'ปริมาตรสุทธิ (Total Volume)' : 'Total Volume'}</p>
                <div className="text-5xl font-bold text-indigo-900 mb-2">
                  {results.totalCbm} <span className="text-2xl text-indigo-600">CBM</span>
                </div>
                <p className="text-sm text-indigo-500">
                  {isTH ? 'ลูกบาศก์เมตร' : 'Cubic Meters'}
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
                  <span className="text-slate-600 font-medium">{isTH ? 'น้ำหนักรวม (Total Weight)' : 'Total Weight'}</span>
                  <span className="font-bold text-lg text-slate-800">{results.totalWeight} kg</span>
                </div>
                
                <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
                  <span className="text-slate-600 font-medium flex items-center gap-2">
                    {isTH ? 'น้ำหนักเชิงปริมาตร (ขนส่งทางเรือ)' : 'Volumetric Weight (Sea)'}
                  </span>
                  <span className="font-bold text-lg text-blue-600">{results.vwSea} kg</span>
                </div>

                <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
                  <span className="text-slate-600 font-medium flex items-center gap-2">
                    {isTH ? 'น้ำหนักเชิงปริมาตร (ขนส่งทางอากาศ)' : 'Volumetric Weight (Air)'}
                  </span>
                  <span className="font-bold text-lg text-sky-500">{results.vwAir} kg</span>
                </div>
              </div>
              
              <div className="mt-6 flex items-start gap-2 text-xs text-indigo-600 bg-indigo-100/50 p-3 rounded-lg">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  {isTH 
                    ? 'บริษัทขนส่งจะเปรียบเทียบระหว่าง "น้ำหนักจริง" และ "น้ำหนักเชิงปริมาตร" แล้วเลือกใช้ค่าที่มากกว่าในการคิดค่าบริการขนส่ง'
                    : 'Couriers will compare "Actual Weight" and "Volumetric Weight" and use the higher value to calculate shipping costs.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="prose prose-slate max-w-none mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 border-b pb-4">CBM คืออะไร? การคำนวณ CBM สำคัญอย่างไรกับการขนส่งสินค้า</h2>
          
          <p className="text-lg text-slate-700 leading-relaxed">
            <strong>CBM (Cubic Meter)</strong> หรือ <strong>ลูกบาศก์เมตร</strong> คือหน่วยวัดปริมาตรที่ใช้กันอย่างแพร่หลายในอุตสาหกรรมโลจิสติกส์และการขนส่งสินค้าระหว่างประเทศ ไม่ว่าจะเป็นการนำเข้า-ส่งออกทางเรือ (Sea Freight) หรือทางอากาศ (Air Freight) รวมถึงการขนส่งทางบก การคำนวณ CBM เป็นสิ่งจำเป็นมาก เพราะบริษัทขนส่งจะใช้ค่านี้ในการประเมินพื้นที่ระวางสินค้าและคิดค่าบริการขนส่งได้อย่างถูกต้องแม่นยำ
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">วิธีคำนวณ CBM ด้วยตัวเอง</h3>
          <p className="text-slate-700">
            สูตรการคำนวณ CBM หรือปริมาตรของสินค้า สามารถทำได้ง่ายๆ โดยการนำความกว้าง ความยาว และความสูงของกล่องบรรจุภัณฑ์มาคูณกัน (ในหน่วยเมตร) 
            <br/><br/>
            <strong>สูตร: กว้าง (m) x ยาว (m) x สูง (m) = CBM (ลูกบาศก์เมตร)</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>หากวัดเป็น <strong>เซนติเมตร (cm)</strong> ให้ใช้สูตร: (กว้าง x ยาว x สูง) / 1,000,000 = CBM</li>
            <li>หากวัดเป็น <strong>มิลลิเมตร (mm)</strong> ให้ใช้สูตร: (กว้าง x ยาว x สูง) / 1,000,000,000 = CBM</li>
            <li>หากวัดเป็น <strong>นิ้ว (inch)</strong> ให้แปลงเป็นเซนติเมตรก่อน (1 นิ้ว = 2.54 ซม.) แล้วค่อยคำนวณตามสูตรเซนติเมตร</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">ทำไมถึงต้องมีการคิด "น้ำหนักเชิงปริมาตร" (Volumetric Weight)?</h3>
          <p className="text-slate-700 leading-relaxed">
            ในวงการขนส่งไม่ได้ดูแค่ "น้ำหนักจริง" (Actual Weight) ของสินค้าอย่างเดียว ลองจินตนาการว่าคุณส่ง "หมอนสำลี" จำนวน 1 คันรถบรรทุก หมอนมีน้ำหนักเบามาก แต่กลับกินพื้นที่เต็มคันรถ หากบริษัทขนส่งคิดค่าส่งตามน้ำหนักจริงเพียงอย่างเดียว ก็จะขาดทุนมหาศาล ด้วยเหตุนี้จึงต้องมี <strong>น้ำหนักเชิงปริมาตร (Volumetric Weight / Dimensional Weight)</strong> เพื่อนำมาเปรียบเทียบกับน้ำหนักจริง โดยหลักการคือ <strong>บริษัทขนส่งจะเลือกเก็บค่าบริการจากค่าที่มากกว่า</strong> เพื่อความเป็นธรรมต่อผู้ให้บริการและผู้ใช้บริการ
          </p>
          
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 my-6">
            <h4 className="font-semibold text-lg text-slate-800 mb-3">มาตรฐานการแปลง CBM เป็นน้ำหนักเชิงปริมาตร</h4>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li><strong>การขนส่งทางเรือ (Sea Freight / LCL):</strong> 1 CBM มักจะเทียบเท่ากับน้ำหนัก 1,000 กิโลกรัม (1 ตัน)</li>
              <li><strong>การขนส่งทางอากาศ (Air Freight):</strong> 1 CBM มักจะเทียบเท่ากับน้ำหนัก 167 กิโลกรัม</li>
              <li><strong>การขนส่งทางรถยนต์ (Truck / Land Freight):</strong> 1 CBM มักจะเทียบเท่ากับน้ำหนัก 333 กิโลกรัม (อาจแตกต่างกันไปตามผู้ให้บริการ)</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">ตัวอย่างการคิดค่าขนส่ง</h3>
          <p className="text-slate-700 leading-relaxed">
            สมมติว่าคุณส่งสินค้าทางอากาศ 1 กล่อง ขนาด 50x50x50 ซม. และมีน้ำหนักจริง 15 กิโลกรัม
            <br/>
            1. คำนวณ CBM: (50 x 50 x 50) / 1,000,000 = 0.125 CBM
            <br/>
            2. แปลงเป็นน้ำหนักเชิงปริมาตรทางอากาศ: 0.125 x 167 = 20.87 กิโลกรัม
            <br/>
            3. เปรียบเทียบ: น้ำหนักจริง 15 กก. {"<"} น้ำหนักเชิงปริมาตร 20.87 กก.
            <br/>
            <strong>สรุป:</strong> สายการบินจะคิดค่าระวางขนส่งของคุณที่น้ำหนัก 21 กิโลกรัม (ปัดเศษขึ้น) เพราะน้ำหนักเชิงปริมาตรมากกว่าน้ำหนักจริงนั่นเอง
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">เคล็ดลับการลดต้นทุนขนส่ง</h3>
          <p className="text-slate-700 leading-relaxed">
            เนื่องจากปริมาตรมีผลโดยตรงต่อค่าขนส่ง การแพ็คสินค้าให้กะทัดรัดที่สุด (Optimization) หรือลดพื้นที่ว่างในกล่อง (Void space) จะช่วยลดค่า CBM ลงได้ ซึ่งส่งผลให้คุณประหยัดค่าขนส่งได้อย่างเป็นกอบเป็นกำ โดยเฉพาะอย่างยิ่งการส่งออกสินค้าระหว่างประเทศที่ค่าขนส่งมีราคาสูง การเลือกใช้เครื่องมือ <strong>โปรแกรมคำนวณ CBM ออนไลน์</strong> จะช่วยให้คุณประเมินต้นทุนได้รวดเร็วและแม่นยำยิ่งขึ้น ก่อนที่จะติดต่อบริษัท Forwarder เพื่อจองระวางเรือหรือเครื่องบินต่อไป
          </p>
        </article>
      )}
    </div>
  );
}

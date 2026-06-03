import React, { useState, useEffect } from 'react';
import { Home, Map, Hammer, Calculator, Coins, ShieldCheck, ThermometerSun } from 'lucide-react';

const ROOF_TYPES = [
  { id: 'metal', name: 'เมทัลชีท (Metal Sheet)', defaultCost: 600, desc: 'รวมฉนวน PE น้ำหนักเบา ติดตั้งไว' },
  { id: 'corrugated', name: 'กระเบื้องลอนคู่ (Fibre Cement)', defaultCost: 400, desc: 'ราคาประหยัด ทนทานมาตรฐาน' },
  { id: 'concrete', name: 'กระเบื้องคอนกรีต (ซีแพค)', defaultCost: 750, desc: 'สวยงาม แข็งแรง แต่มีน้ำหนักมาก' },
  { id: 'ceramic', name: 'กระเบื้องเซรามิก (Excella)', defaultCost: 1200, desc: 'พรีเมียม สีไม่ซีดจาง สะท้อนความร้อนดี' },
  { id: 'shingle', name: 'หลังคาชิงเกิ้ลรูฟ (Asphalt Shingle)', defaultCost: 1000, desc: 'สไตล์ฝรั่ง สวยงาม น้ำหนักเบา' },
  { id: 'custom', name: 'กำหนดราคาเอง', defaultCost: 0, desc: 'ใส่ราคาเหมาต่อตารางเมตรที่คุณทราบ' },
];

export default function RoofReplacementCost({ lang }: any) {
  const [area, setArea] = useState<number | ''>('');
  const [roofType, setRoofType] = useState<string>('concrete');
  const [customCost, setCustomCost] = useState<number | ''>(750);
  
  const [includeDemolition, setIncludeDemolition] = useState<boolean>(true);
  const [demolitionCost, setDemolitionCost] = useState<number | ''>(100);
  
  const [includeInsulation, setIncludeInsulation] = useState<boolean>(true);
  const [insulationCost, setInsulationCost] = useState<number | ''>(150);

  // Update custom cost when changing roof type
  useEffect(() => {
    if (roofType !== 'custom') {
      const selected = ROOF_TYPES.find(r => r.id === roofType);
      if (selected) {
        setCustomCost(selected.defaultCost);
      }
    }
  }, [roofType]);

  const calculateCosts = () => {
    const a = Number(area) || 0;
    const materialLaborCost = Number(customCost) || 0;
    const demoCost = Number(demolitionCost) || 0;
    const insulCost = Number(insulationCost) || 0;

    if (a > 0) {
      const roofCostTotal = a * materialLaborCost;
      const totalDemo = includeDemolition ? a * demoCost : 0;
      const totalInsul = includeInsulation ? a * insulCost : 0;

      const grandTotal = roofCostTotal + totalDemo + totalInsul;

      return {
        roofCostTotal,
        totalDemo,
        totalInsul,
        grandTotal,
        costPerSqm: grandTotal / a
      };
    }
    return null;
  };

  const results = calculateCosts();
  const selectedRoof = ROOF_TYPES.find(r => r.id === roofType);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-stone-100 text-stone-700 rounded-xl">
            <Home className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            คำนวณงบประมาณเปลี่ยนหลังคา
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                พื้นที่หลังคา (ตารางเมตร)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value) || '')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-all"
                  placeholder="เช่น 120"
                  min="1"
                />
                <Map className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">พื้นที่หลังคาจะมากกว่าพื้นที่บ้านเล็กน้อย (เผื่อชายคา)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ประเภทวัสดุหลังคา (รวมค่าแรงติดตั้ง)
              </label>
              <select
                value={roofType}
                onChange={(e) => setRoofType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-all bg-white"
              >
                {ROOF_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              {selectedRoof && roofType !== 'custom' && (
                <p className="text-xs text-gray-500 mt-1">{selectedRoof.desc}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ราคาเหมาวัสดุ + ค่าแรง (บาท / ตร.ม.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={customCost}
                  onChange={(e) => {
                    setCustomCost(Number(e.target.value) || '');
                    if (roofType !== 'custom') setRoofType('custom');
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-all"
                  min="0"
                />
                <Coins className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="includeDemo"
                  checked={includeDemolition}
                  onChange={(e) => setIncludeDemolition(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-stone-600 focus:ring-stone-500"
                />
                <div className="flex-1">
                  <label htmlFor="includeDemo" className="font-medium text-gray-800 block cursor-pointer">
                    มีงานรื้อถอนหลังคาเก่า
                  </label>
                  {includeDemolition && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-500">ค่ารื้อถอน:</span>
                      <input
                        type="number"
                        value={demolitionCost}
                        onChange={(e) => setDemolitionCost(Number(e.target.value) || '')}
                        className="w-24 px-2 py-1 text-sm rounded border border-gray-200"
                        min="0"
                      />
                      <span className="text-sm text-gray-500">บ./ตร.ม.</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="includeInsul"
                  checked={includeInsulation}
                  onChange={(e) => setIncludeInsulation(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-stone-600 focus:ring-stone-500"
                />
                <div className="flex-1">
                  <label htmlFor="includeInsul" className="font-medium text-gray-800 block cursor-pointer">
                    ปูฉนวนกันความร้อนใต้หลังคา
                  </label>
                  {includeInsulation && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-500">ค่าแผ่นฟอยล์/ฉนวน:</span>
                      <input
                        type="number"
                        value={insulationCost}
                        onChange={(e) => setInsulationCost(Number(e.target.value) || '')}
                        className="w-24 px-2 py-1 text-sm rounded border border-gray-200"
                        min="0"
                      />
                      <span className="text-sm text-gray-500">บ./ตร.ม.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          <div className="bg-stone-50 rounded-2xl p-6 h-fit sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-stone-600" />
              สรุปงบประมาณเปลี่ยนหลังคา
            </h3>
            
            {results ? (
              <div className="space-y-4">
                
                <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">ค่าวัสดุและติดตั้งหลังคาใหม่</span>
                    <span className="font-medium">฿{results.roofCostTotal.toLocaleString()}</span>
                  </div>
                  
                  {includeDemolition && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-1"><Hammer className="w-3 h-3"/> ค่ารื้อถอนของเก่า</span>
                      <span className="font-medium text-orange-600">฿{results.totalDemo.toLocaleString()}</span>
                    </div>
                  )}
                  
                  {includeInsulation && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-1"><ThermometerSun className="w-3 h-3"/> ค่าฉนวนกันความร้อน</span>
                      <span className="font-medium text-blue-600">฿{results.totalInsul.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="bg-stone-800 text-white p-5 rounded-xl shadow-sm mt-4 text-center relative overflow-hidden">
                  <ShieldCheck className="absolute -right-4 -bottom-4 w-24 h-24 text-white opacity-5" />
                  <p className="text-sm text-stone-300 mb-1 relative z-10">งบประมาณรวมทั้งโครงการ (ประเมิน)</p>
                  <p className="text-4xl font-bold relative z-10">
                    ฿{results.grandTotal.toLocaleString()}
                  </p>
                  <p className="text-xs text-stone-400 mt-2 relative z-10">
                    เฉลี่ย ฿{results.costPerSqm.toLocaleString(undefined, { maximumFractionDigits: 0 })} / ตารางเมตร
                  </p>
                </div>

                <p className="text-xs text-gray-500 text-center mt-2 px-4">
                  *ราคานี้เป็นการประเมินเบื้องต้น ยังไม่รวมโครงหลังคา (เหล็ก) ในกรณีที่โครงเก่าผุพังต้องเปลี่ยนใหม่
                </p>
              </div>
            ) : (
              <div className="h-full min-h-[250px] flex flex-col items-center justify-center text-gray-400 bg-white rounded-xl border border-dashed border-gray-300 p-6 text-center">
                <Home className="w-12 h-12 mb-3 text-gray-300" />
                <p>กรุณาระบุพื้นที่หลังคา (ตร.ม.)</p>
                <p className="text-sm">เพื่อประเมินค่าใช้จ่ายเบื้องต้น</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Section */}
      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">เปลี่ยนหลังคาบ้านใหม่ ต้องเตรียมงบเท่าไหร่? (Roof Replacement Cost)</h2>
        
        <p>ปัญหา "หลังคารั่ว" เป็นฝันร้ายของคนมีบ้าน เมื่อถึงจุดที่การปะแก้หรือทากันซึมไม่สามารถช่วยได้อีกต่อไป การ <strong>"เปลี่ยนหลังคาใหม่ทั้งผืน" (Roof Replacement)</strong> คือทางออกที่เด็ดขาดและคุ้มค่าที่สุดในระยะยาว แต่การรื้อหลังคาเก่าและมุงใหม่เป็นงานใหญ่ที่มีค่าใช้จ่ายสูง การประเมินงบประมาณ (Roof Replacement Cost) เอาไว้ล่วงหน้า จะช่วยให้เจ้าของบ้านสามารถวางแผนการเงินและเลือกวัสดุได้อย่างเหมาะสม</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ปัจจัยหลักที่กำหนดราคา "เปลี่ยนหลังคา"</h3>
        <p>ค่าใช้จ่ายในการเปลี่ยนหลังคาไม่ได้มีแค่ค่ากระเบื้องอย่างเดียว แต่ประกอบไปด้วยตัวแปรหลักๆ 4 ส่วน คือ:</p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>พื้นที่หลังคา (ตารางเมตร):</strong> สังเกตว่าพื้นที่หลังคาจะ "กว้างกว่า" พื้นที่ใช้สอยภายในบ้านเสมอ เพราะต้องเผื่อชายคาที่ยื่นออกไปบังแดดบังฝน (ประมาณ 1-1.5 เมตรโดยรอบ)</li>
          <li><strong>ชนิดของวัสดุมุงหลังคา:</strong> เป็นส่วนที่ทำให้ราคาแตกต่างกันมากที่สุด
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              <li><em>เมทัลชีท (Metal Sheet):</em> ราคาประหยัด ติดตั้งไว น้ำหนักเบา ไม่เป็นภาระโครงสร้าง แต่อาจมีเสียงดังเวลาฝนตก</li>
              <li><em>กระเบื้องลอนคู่:</em> วัสดุยอดฮิตคู่บ้านคนไทยมานาน ทนทาน ราคาไม่แพง</li>
              <li><em>กระเบื้องคอนกรีต (เช่น ซีแพคโมเนีย):</em> สวยงาม มีให้เลือกหลายสี แต่ "น้ำหนักมาก" หากโครงหลังคาเดิมเป็นไม้หรือเหล็กบาง อาจต้องเสริมโครงสร้าง</li>
              <li><em>กระเบื้องเซรามิก:</em> เกรดพรีเมียม สวย เงางาม สีไม่ซีดจางและไม่อมความร้อน แต่ราคาสูง</li>
            </ul>
          </li>
          <li><strong>ค่าแรงรื้อถอนและขนทิ้ง:</strong> หลังคาเก่าต้องถูกรื้อและนำไปทิ้งอย่างถูกวิธี ซึ่งมีค่าแรงช่างและค่ารถกระบะขนเศษวัสดุ (ปกติคิดเหมาตามตารางเมตร)</li>
          <li><strong>ความสมบูรณ์ของ "โครงหลังคาเดิม":</strong> สำคัญมาก! หากรื้อหลังคาออกมาแล้วพบว่าโครงเหล็กเป็นสนิมผุ หรือโครงไม้ปลวกกิน คุณจำเป็นต้องเสียค่าใช้จ่ายในการซ่อมแซมหรือเปลี่ยนโครงเหล็กใหม่ทั้งหมด ซึ่งอาจทำให้งบบานปลายได้</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">คำแนะนำก่อนตัดสินใจเปลี่ยนหลังคา</h3>
        <p><strong>1. เช็คโครงสร้างก่อนเลือกวัสดุ:</strong> หากบ้านเดิมใช้หลังคาลอนคู่หรือเมทัลชีท (ซึ่งเบา) แล้วอยากเปลี่ยนไปใช้กระเบื้องคอนกรีต (ซึ่งหนักมาก) ต้องให้วิศวกรประเมินว่าโครงสร้างบ้านและโครงเหล็กเดิมรับน้ำหนักไหวหรือไม่ หากไม่ไหว เมทัลชีทบุฉนวน หรือกระเบื้องหลังคายางมะตอย (Shingle Roof) อาจเป็นทางเลือกที่ดีกว่า</p>
        <p><strong>2. อย่าลืม "ฉนวนกันความร้อน":</strong> เมื่อรื้อหลังคาใหม่ทั้งที ถือเป็นโอกาสทองในการปูแผ่นสะท้อนความร้อนใต้แป หรือวางฉนวนกันความร้อนใยแก้วเหนือฝ้าเพดาน แม้จะเพิ่มเงินอีกนิดหน่อย (ประมาณ 100-200 บาท/ตร.ม.) แต่ช่วยให้บ้านเย็นลงอย่างเห็นได้ชัดและประหยัดค่าแอร์ไปได้ตลอดชีวิตการใช้งาน</p>
        <p><strong>3. เลือกผู้รับเหมาที่มีรับประกัน:</strong> งานหลังคาเป็นงานที่วัดกันที่ "ฝีมือและประสบการณ์" ควรเลือกผู้รับเหมาหรือบริษัทที่มีความเชี่ยวชาญโดยเฉพาะ และต้องมีการ <em>"รับประกันผลงานการรั่วซึม"</em> อย่างน้อย 1-5 ปี หลังการติดตั้ง</p>
      </article>
    </div>
  );
}

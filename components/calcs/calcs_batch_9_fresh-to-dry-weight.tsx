import React, { useState } from 'react';
import { Scale, Calculator, RotateCcw, Info, Droplets, Sun } from 'lucide-react';

export default function FreshToDryWeight({ lang }: { lang: 'TH' | 'EN' }) {
  const [freshWeight, setFreshWeight] = useState<number | ''>(1000);
  const [initialMoisture, setInitialMoisture] = useState<number | ''>(25);
  const [targetMoisture, setTargetMoisture] = useState<number | ''>(14);

  const t = {
    title: lang === 'TH' ? 'คำนวณน้ำหนักผลผลิตสดเป็นแห้ง' : 'Fresh to Dry Weight Converter',
    freshWeight: lang === 'TH' ? 'น้ำหนักผลสด (กิโลกรัม)' : 'Fresh Weight (kg)',
    initialMoisture: lang === 'TH' ? 'ความชื้นเริ่มต้น (%)' : 'Initial Moisture (%)',
    targetMoisture: lang === 'TH' ? 'ความชื้นเป้าหมาย (%)' : 'Target Moisture (%)',
    calculate: lang === 'TH' ? 'คำนวณ' : 'Calculate',
    reset: lang === 'TH' ? 'เริ่มใหม่' : 'Reset',
    result: lang === 'TH' ? 'น้ำหนักผลผลิตแห้งโดยประมาณ' : 'Estimated Dry Weight',
    waterLost: lang === 'TH' ? 'น้ำหนักน้ำที่ระเหยออก' : 'Water Weight Lost',
    unit: lang === 'TH' ? 'กก.' : 'kg',
    errorMoisture: lang === 'TH' ? 'ความชื้นเป้าหมายต้องน้อยกว่าความชื้นเริ่มต้น และไม่เกิน 100%' : 'Target moisture must be less than initial and < 100%',
  };

  const isError = Number(targetMoisture) >= Number(initialMoisture) || Number(initialMoisture) >= 100 || Number(targetMoisture) >= 100 || Number(targetMoisture) < 0 || Number(initialMoisture) < 0;

  // Formula: Dry Weight = Fresh Weight * (100 - Initial Moisture) / (100 - Target Moisture)
  const calculateDryWeight = () => {
    if (!freshWeight || !initialMoisture || !targetMoisture || isError) return 0;
    return (Number(freshWeight) * (100 - Number(initialMoisture))) / (100 - Number(targetMoisture));
  };

  const dryWeight = calculateDryWeight();
  const waterLost = Number(freshWeight) - dryWeight;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-orange-100 rounded-lg">
            <Scale className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                {t.freshWeight}
              </label>
              <input
                type="number"
                value={freshWeight}
                onChange={(e) => setFreshWeight(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                min="0"
                placeholder="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                {t.initialMoisture}
              </label>
              <input
                type="number"
                value={initialMoisture}
                onChange={(e) => setInitialMoisture(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                min="0"
                max="99"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Sun className="w-4 h-4 text-yellow-500" />
                {t.targetMoisture}
              </label>
              <input
                type="number"
                value={targetMoisture}
                onChange={(e) => setTargetMoisture(e.target.value ? Number(e.target.value) : '')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${isError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'}`}
                min="0"
                max="99"
                placeholder="14"
              />
              {isError && (
                <p className="mt-1 text-sm text-red-500">{t.errorMoisture}</p>
              )}
            </div>

            <button
              onClick={() => {
                setFreshWeight(1000);
                setInitialMoisture(25);
                setTargetMoisture(14);
              }}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t.reset}
            </button>
          </div>

          <div className="bg-orange-50 rounded-xl p-6 flex flex-col justify-center items-center text-center space-y-6 border border-orange-100">
            <div className="w-full space-y-2">
              <p className="text-orange-800 text-sm font-medium">{t.result}</p>
              <p className="text-5xl font-bold text-orange-600">
                {!isError && freshWeight ? dryWeight.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '0.00'}
                <span className="text-2xl text-orange-500 ml-2">{t.unit}</span>
              </p>
            </div>
            
            {!isError && freshWeight && waterLost > 0 && (
              <div className="w-full pt-6 border-t border-orange-200">
                <p className="text-orange-700 text-sm mb-1 flex items-center justify-center gap-2">
                  <Droplets className="w-4 h-4" />
                  {t.waterLost}
                </p>
                <p className="text-2xl font-bold text-blue-500">
                  {waterLost.toLocaleString('en-US', { maximumFractionDigits: 2 })} {t.unit}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose prose-orange max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {lang === 'TH' ? 'การคำนวณน้ำหนักผลผลิตสดเป็นแห้ง (Fresh to Dry Weight)' : 'Calculating Fresh to Dry Weight in Agriculture'}
        </h2>
        
        {lang === 'TH' ? (
          <>
            <p>
              ในกระบวนการจัดการหลังการเก็บเกี่ยว (Post-harvest management) การลดความชื้นหรือการอบแห้งเป็นขั้นตอนที่สำคัญมากสำหรับสินค้าเกษตรหลายชนิด เช่น ข้าวเปลือก ข้าวโพด เมล็ดกาแฟ ถั่ว หรือแม้แต่สมุนไพร เพื่อยืดอายุการเก็บรักษา ป้องกันการเกิดเชื้อรา และให้ได้มาตรฐานความชื้นตามที่ตลาดต้องการ
            </p>

            <h3>ทำไมต้องคำนวณน้ำหนักน้ำที่หายไป?</h3>
            <ul>
              <li><strong>การประเมินราคาและรายได้:</strong> โรงสีหรือผู้รับซื้อจะหักลดน้ำหนักตามความชื้นที่เกินมาตรฐาน การทราบน้ำหนักแห้งล่วงหน้าช่วยให้เกษตรกรคำนวณรายได้สุทธิได้อย่างแม่นยำ</li>
              <li><strong>การวางแผนคลังสินค้า:</strong> สินค้าที่แห้งแล้วจะมีน้ำหนักและปริมาตรลดลง ช่วยในการคำนวณพื้นที่จัดเก็บและค่าใช้จ่ายในการขนส่ง</li>
              <li><strong>ควบคุมประสิทธิภาพการอบแห้ง:</strong> หากใช้อุปกรณ์อบแห้ง การรู้น้ำหนักน้ำที่ต้องระเหยออก (Water loss) ช่วยประเมินค่าพลังงานไฟฟ้าหรือเชื้อเพลิงที่ต้องใช้ได้</li>
            </ul>

            <h3>หลักการคำนวณและการคงอยู่ของมวลแห้ง (Dry Matter)</h3>
            <p>
              หลักการสำคัญคือ เมื่อเรานำผลผลิตไปตากแดดหรือเข้าตู้อบ สิ่งที่ระเหยออกไปมีเพียง "น้ำ" เท่านั้น ส่วนที่เป็นเนื้อสารหรือ "มวลแห้ง (Dry Matter)" จะยังคงอยู่เท่าเดิมเสมอ 
            </p>
            <p>สมการในการคำนวณจึงตั้งอยู่บนพื้นฐานว่า:<br/>
              <strong>น้ำหนักมวลแห้งก่อนอบ = น้ำหนักมวลแห้งหลังอบ</strong>
            </p>
            
            <h3>สูตรคำนวณ (Formula)</h3>
            <p className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <strong>น้ำหนักแห้ง = น้ำหนักสด × [ (100 - ความชื้นเริ่มต้น) / (100 - ความชื้นเป้าหมาย) ]</strong>
            </p>
            <p>
              <strong>ตัวอย่าง:</strong> คุณมีข้าวเปลือกสดน้ำหนัก 1,000 กิโลกรัม วัดความชื้นได้ 25% ต้องการอบให้เหลือความชื้นมาตรฐาน 14% จะเหลือน้ำหนักเท่าไร?
            </p>
            <ul>
              <li>น้ำหนักสด = 1,000 กก.</li>
              <li>ความชื้นเริ่มต้น = 25%</li>
              <li>ความชื้นเป้าหมาย = 14%</li>
            </ul>
            <p>
              แทนค่า: 1,000 × [ (100 - 25) / (100 - 14) ] <br/>
              = 1,000 × (75 / 86) <br/>
              = 1,000 × 0.872 <br/>
              = <strong>872.09 กิโลกรัม</strong>
            </p>
            <p>
              แปลว่า น้ำหนักข้าวเปลือกจะหายไป (เป็นน้ำที่ระเหย) ประมาณ 127.91 กิโลกรัม เครื่องมือ <em>Fresh to Dry Weight Converter</em> ของเราถูกออกแบบมาให้คำนวณกระบวนการนี้โดยอัตโนมัติ เพียงแค่กรอกตัวเลข คุณก็จะได้คำตอบทันที ช่วยให้งานบัญชีฟาร์มง่ายขึ้นกว่าเดิม
            </p>
          </>
        ) : (
          <>
            <p>
              In post-harvest management, reducing the moisture content of agricultural commodities—such as paddy rice, corn, coffee beans, soybeans, and herbs—is a critical step. Drying extends shelf life, prevents fungal growth (like aflatoxin), and ensures the product meets market standards.
            </p>

            <h3>Why Calculate Moisture Shrinkage?</h3>
            <ul>
              <li><strong>Revenue Estimation:</strong> Buyers and mills apply weight discounts for excess moisture. Knowing the final dry weight allows farmers to accurately project their net revenue.</li>
              <li><strong>Storage and Logistics Planning:</strong> Dried products weigh less and often take up less volume, which is essential for calculating storage space and freight costs.</li>
              <li><strong>Drying Efficiency:</strong> If you are using mechanical dryers, knowing the exact amount of water that needs to be evaporated (water loss) helps in estimating the energy or fuel costs required.</li>
            </ul>

            <h3>The Principle of Dry Matter Conservation</h3>
            <p>
              The fundamental principle behind moisture shrinkage calculations is that during the drying process, only water evaporates. The solid component of the crop, known as <strong>Dry Matter</strong>, remains constant.
            </p>
            <p>Therefore, the calculation is based on the equation:<br/>
              <strong>Initial Dry Matter Weight = Final Dry Matter Weight</strong>
            </p>
            
            <h3>The Formula</h3>
            <p className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <strong>Final Weight = Initial Weight × [ (100 - Initial Moisture %) / (100 - Target Moisture %) ]</strong>
            </p>
            <p>
              <strong>Example Calculation:</strong> You harvested 1,000 kg of fresh corn with an initial moisture content of 25%. You need to dry it down to a safe storage moisture level of 14%. What will the final weight be?
            </p>
            <ul>
              <li>Fresh Weight = 1,000 kg</li>
              <li>Initial Moisture = 25%</li>
              <li>Target Moisture = 14%</li>
            </ul>
            <p>
              Applying the formula: 1,000 × [ (100 - 25) / (100 - 14) ] <br/>
              = 1,000 × (75 / 86) <br/>
              = 1,000 × 0.872 <br/>
              = <strong>872.09 kg</strong>
            </p>
            <p>
              This means you will lose approximately 127.91 kg of water weight during drying. Our <em>Fresh to Dry Weight Converter</em> is designed to automate this math for you. Simply input your weights and moisture percentages, and the calculator will instantly provide the estimated dry weight and water lost, streamlining your farm management tasks.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

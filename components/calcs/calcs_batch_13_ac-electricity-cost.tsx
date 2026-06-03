import React, { useState } from 'react';
import { Zap, Calculator } from 'lucide-react';

export default function ACElectricityCost({ lang }: any) {
  const isTH = lang === 'TH';
  const [btu, setBtu] = useState<number>(12000);
  const [seer, setSeer] = useState<number>(18);
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [electricityRate, setElectricityRate] = useState<number>(4.5); // THB per unit

  // Calculation logic based on EGAT formula:
  // Power (kW) = BTU / (SEER * 1000)
  // Units per day = Power * hoursPerDay
  // Note: For Inverter ACs, the compressor doesn't run at 100% all the time. 
  // The actual power consumption is usually lower. 
  // We apply a typical load factor (e.g. 70% for inverter, or just base on SEER)
  // SEER (Seasonal Energy Efficiency Ratio) already accounts for seasonal operation.
  // Power input (Watts) = BTU / SEER
  
  const powerWatts = btu / seer;
  const unitsPerDay = (powerWatts / 1000) * hoursPerDay;
  const costPerDay = unitsPerDay * electricityRate;
  const costPerMonth = costPerDay * 30;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Zap className="w-8 h-8 text-yellow-500" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'คำนวณค่าไฟแอร์' : 'Air Conditioner Electricity Cost Calculator'}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ขนาดแอร์ (BTU)' : 'AC Size (BTU)'}</label>
            <select value={btu} onChange={(e) => setBtu(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400">
              <option value="9000">9,000 BTU</option>
              <option value="12000">12,000 BTU</option>
              <option value="15000">15,000 BTU</option>
              <option value="18000">18,000 BTU</option>
              <option value="24000">24,000 BTU</option>
              <option value="30000">30,000 BTU</option>
              <option value="36000">36,000 BTU</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ค่าประหยัดพลังงาน (SEER)' : 'SEER Rating'}</label>
            <input type="number" step="0.1" value={seer} onChange={(e) => setSeer(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400" />
            <p className="text-xs text-gray-500 mt-1">{isTH ? '* ดูได้จากฉลากเบอร์ 5 (ยิ่งสูงยิ่งประหยัดไฟ)' : '* Check Label No.5 (Higher is better)'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ชั่วโมงการเปิดใช้งาน (ชม./วัน)' : 'Usage (Hours/Day)'}</label>
            <input type="number" value={hoursPerDay} onChange={(e) => setHoursPerDay(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ค่าไฟ (บาท/หน่วย)' : 'Electricity Rate (THB/Unit)'}</label>
            <input type="number" step="0.1" value={electricityRate} onChange={(e) => setElectricityRate(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400" />
            <p className="text-xs text-gray-500 mt-1">{isTH ? '* ค่าไฟบ้านทั่วไปประมาณ 4.5 - 5 บาท' : '* Typical residential rate is 4.5 - 5 THB'}</p>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-yellow-900 mb-6">{isTH ? 'สรุปประเมินค่าไฟแอร์' : 'Estimated AC Electricity Cost'}</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'ใช้ไฟฟ้าเฉลี่ย' : 'Power Usage'}:</span>
              <span>{unitsPerDay.toFixed(2)} {isTH ? 'หน่วย/วัน' : 'Units/Day'}</span>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
              <span className="block text-sm text-gray-600 mb-1">{isTH ? 'ค่าไฟต่อวัน (โดยประมาณ)' : 'Cost per Day'}</span>
              <span className="text-2xl font-bold text-gray-800">฿{costPerDay.toFixed(2)}</span>
            </div>

            <div className="bg-yellow-400 p-4 rounded-lg shadow-sm text-yellow-900">
              <span className="block text-sm opacity-80 mb-1">{isTH ? 'ค่าไฟต่อเดือน (30 วัน)' : 'Cost per Month (30 days)'}</span>
              <span className="text-5xl font-extrabold">฿{costPerMonth.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              <p className="text-xs mt-2 opacity-70">{isTH ? '* เป็นเพียงการประเมินเบื้องต้น อาจคลาดเคลื่อนตามอุณหภูมิห้องจริง' : '* Rough estimate. Actual cost depends on room temperature.'}</p>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-10 prose prose-yellow max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isTH ? 'เปิดแอร์กี่ชั่วโมง เสียค่าไฟเท่าไหร่? ทำความรู้จักกับค่า SEER' : 'Understanding Your AC Electricity Bill'}
        </h2>
        {isTH ? (
          <>
            <p>เครื่องปรับอากาศหรือ "แอร์" เป็นเครื่องใช้ไฟฟ้าที่กินไฟมากที่สุดในบ้าน โดยเฉพาะในประเทศไทยที่มีอากาศร้อนตลอดปี หลายคนมักสงสัยว่าเปิดแอร์ตอนกลางคืนเดือนละกี่บาท หรือการซื้อแอร์ระบบ Inverter ที่มีฉลากเบอร์ 5 ห้าดาว จะช่วยประหยัดไฟได้จริงหรือไม่</p>
            <h3>ค่า SEER คืออะไร?</h3>
            <p><strong>SEER (Seasonal Energy Efficiency Ratio)</strong> หรือ ค่าประสิทธิภาพการทำความเย็นตามฤดูกาล เป็นตัวเลขที่ระบุบนฉลากประหยัดไฟเบอร์ 5 บอกให้รู้ว่าแอร์ตัวนั้นกินไฟมากน้อยแค่ไหน ยิ่งค่า SEER สูง ยิ่งหมายความว่าแอร์ตัวนั้นประหยัดไฟได้ดีเยี่ยม แอร์อินเวอร์เตอร์รุ่นใหม่ๆ มักจะมีค่า SEER ตั้งแต่ 18 ถึง 24 ขึ้นไป ในขณะที่แอร์รุ่นเก่าอาจมีค่า SEER เพียง 12-13 เท่านั้น</p>
            <h3>ปัจจัยที่ทำให้ค่าไฟแอร์แพงขึ้นกว่าที่ประเมิน</h3>
            <ul>
              <li><strong>การตั้งอุณหภูมิ:</strong> การตั้งอุณหภูมิต่ำกว่า 25 องศาเซลเซียส จะทำให้คอมเพรสเซอร์ทำงานหนักขึ้น (ลด 1 องศา กินไฟเพิ่มประมาณ 10%)</li>
              <li><strong>ขนาด BTU ไม่เหมาะกับห้อง:</strong> แอร์เล็กเกินไปจะทำงานหนักตลอดเวลา ทำให้กินไฟมาก แอร์ใหญ่เกินไปก็จะตัดบ่อยและสิ้นเปลืองพลังงานตอนสตาร์ท</li>
              <li><strong>ไม่ล้างแอร์:</strong> ฝุ่นที่เกาะแผ่นกรองและคอยล์เย็น จะขัดขวางการระบายความเย็น ทำให้แอร์กินไฟเพิ่มขึ้น ควรล้างแอร์อย่างน้อยทุก 6 เดือน</li>
              <li><strong>สภาพอากาศภายนอกและแสงแดด:</strong> หากห้องโดนแดดบ่าย หรือเปิดประตูเข้าออกบ่อยๆ จะทำให้สูญเสียความเย็น แอร์จึงต้องทำงานชดเชยตลอดเวลา</li>
            </ul>
            <p>คุณสามารถใช้เครื่องคำนวณของเราเพื่อประเมินค่าไฟแอร์รายเดือนเบื้องต้นได้ โดยใช้ค่า BTU และค่า SEER จากแคตตาล็อกหรือฉลากเบอร์ 5 เพื่อช่วยในการตัดสินใจเปรียบเทียบก่อนซื้อแอร์ตัวใหม่ ว่ารุ่นที่แพงกว่า (แต่ SEER สูงกว่า) จะคุ้มค่าไฟในระยะยาวหรือไม่</p>
          </>
        ) : (
          <p>Air conditioners are typically the largest contributors to your electricity bill. The energy efficiency of an AC is measured by its SEER (Seasonal Energy Efficiency Ratio) rating, found on the energy label. A higher SEER rating means the AC is more energy-efficient. Modern inverter ACs usually have high SEER ratings. While they may cost more upfront, they save significant money on electricity bills in the long run. Use our calculator to estimate your monthly AC running costs by inputting your AC's BTU size, SEER rating, and daily usage hours.</p>
        )}
      </article>
    </div>
  );
}

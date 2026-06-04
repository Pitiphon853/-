
"use client";
import { useState } from "react";
import { Calculator, Battery, Sun, BatteryCharging } from "lucide-react";

export default function SolarBatterySizing({ lang }: any) {
  const [dailyUsage, setDailyUsage] = useState<number>(15);
  const [solarSize, setSolarSize] = useState<number>(5);
  const [peakSunHours, setPeakSunHours] = useState<number>(4.5);
  const [backupHours, setBackupHours] = useState<number>(6);
  const [dod, setDod] = useState<number>(80);
  const [batteryVoltage, setBatteryVoltage] = useState<number>(48);
  const [batteryType, setBatteryType] = useState<string>("lifepo4");

  const solarProduction = solarSize * peakSunHours * 0.85; // kWh/day with 85% efficiency
  const excessSolar = Math.max(0, solarProduction - dailyUsage * 0.6); // 60% used during daytime
  const nightUsage = dailyUsage * 0.4; // 40% used at night

  // Battery sizing
  const requiredEnergy = (nightUsage / (dod / 100)); // kWh
  const backupEnergy = (dailyUsage / 24) * backupHours / (dod / 100);
  const recommendedKwh = Math.max(requiredEnergy, backupEnergy);
  const batteryAh = (recommendedKwh * 1000) / batteryVoltage;

  // Cost estimation
  const costPerKwh = batteryType === "lifepo4" ? 12000 : batteryType === "lead" ? 5000 : 18000;
  const estimatedCost = recommendedKwh * costPerKwh;

  // Cycle life
  const cycleLife = batteryType === "lifepo4" ? 4000 : batteryType === "lead" ? 800 : 6000;
  const yearLife = cycleLife / 365;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-600 text-white rounded-xl p-2"><Battery className="w-6 h-6" /></div>
          <h2 className="text-xl font-bold text-gray-800">คำนวณขนาดแบตเตอรี่ Solar</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">การใช้ไฟรายวัน (kWh/วัน)</label>
              <input
                type="number"
                value={dailyUsage}
                onChange={(e) => setDailyUsage(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
                min={0}
                step={0.5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ขนาดแผง Solar (kWp)</label>
              <input
                type="number"
                value={solarSize}
                onChange={(e) => setSolarSize(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
                min={0}
                step={0.5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Peak Sun Hours (ชม./วัน)</label>
              <input
                type="number"
                value={peakSunHours}
                onChange={(e) => setPeakSunHours(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
                min={1}
                max={8}
                step={0.5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">สำรองไฟฉุกเฉิน (ชม.)</label>
              <input
                type="number"
                value={backupHours}
                onChange={(e) => setBackupHours(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ชนิดแบตเตอรี่</label>
              <select
                value={batteryType}
                onChange={(e) => setBatteryType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
              >
                <option value="lifepo4">LiFePO4 (ลิเธียมฟอสเฟต)</option>
                <option value="lead">Lead-Acid (กรดตะกั่ว)</option>
                <option value="ternary">NMC/Ternary Lithium</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">DOD - Depth of Discharge (%)</label>
              <input
                type="number"
                value={dod}
                onChange={(e) => setDod(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
                min={30}
                max={100}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">แรงดันแบตเตอรี่ (V)</label>
              <select
                value={batteryVoltage}
                onChange={(e) => setBatteryVoltage(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
              >
                <option value={12}>12V</option>
                <option value={24}>24V</option>
                <option value={48}>48V</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow space-y-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <BatteryCharging className="w-5 h-5 text-green-600" /> ผลการคำนวณ
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-yellow-50 rounded-xl p-4">
            <p className="text-sm text-gray-600"><Sun className="inline w-4 h-4 mr-1" />ผลิตไฟได้/วัน</p>
            <p className="text-xl font-bold text-yellow-600">{solarProduction.toFixed(1)} kWh</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">ใช้ไฟกลางคืน (ประมาณ 40%)</p>
            <p className="text-xl font-bold text-blue-600">{nightUsage.toFixed(1)} kWh</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-700 mb-3">ขนาดแบตเตอรี่แนะนำ</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600">ความจุ</p>
              <p className="text-2xl font-bold text-green-600">{recommendedKwh.toFixed(1)} kWh</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600">แอมป์-ชั่วโมง ({batteryVoltage}V)</p>
              <p className="text-2xl font-bold text-green-600">{batteryAh.toFixed(0)} Ah</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600">อายุการใช้งาน</p>
              <p className="text-2xl font-bold text-green-600">~{yearLife.toFixed(1)} ปี</p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
          <p className="text-sm text-emerald-700">ประมาณการค่าแบตเตอรี่</p>
          <p className="text-2xl font-bold text-emerald-600">฿{estimatedCost.toLocaleString("th-TH", { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-gray-500 mt-1">(~฿{costPerKwh.toLocaleString()}/kWh • {cycleLife.toLocaleString()} รอบ)</p>
        </div>
      </div>

      <article className="prose max-w-none bg-white rounded-2xl border border-gray-200 p-6 shadow">
        <h2>คำนวณขนาดแบตเตอรี่ Solar Cell ให้พอดีกับบ้านคุณ</h2>
        <p>
          การติดตั้งระบบโซลาร์เซลล์พร้อมแบตเตอรี่กักเก็บพลังงาน (Energy Storage) กำลังเป็นเทรนด์ที่ได้รับความนิยมอย่างมากในประเทศไทย
          เนื่องจากค่าไฟฟ้าที่สูงขึ้นและราคาแบตเตอรี่ที่ลดลงอย่างต่อเนื่อง โดยเฉพาะแบตเตอรี่ LiFePO4 ที่มีอายุการใช้งานยาวนานถึง 10 ปีขึ้นไป
        </p>

        <h3>ทำไมต้องมีแบตเตอรี่?</h3>
        <p>
          ระบบโซลาร์ออนกริดแบบไม่มีแบตเตอรี่จะผลิตไฟได้เฉพาะช่วงกลางวัน หากคุณใช้ไฟส่วนใหญ่ช่วงกลางคืน ไฟจากโซลาร์จะถูกส่งกลับเข้าสายส่ง
          ซึ่งการไฟฟ้ารับซื้อในราคาต่ำ การติดแบตเตอรี่จะช่วยเก็บไฟส่วนเกินไว้ใช้ตอนกลางคืน ลดการพึ่งพาไฟจากกริด และยังสามารถสำรองไฟฉุกเฉินได้ด้วย
        </p>

        <h3>วิธีคำนวณขนาดแบตเตอรี่</h3>
        <p>
          ขั้นตอนหลัก: 1) คำนวณพลังงานที่ต้องเก็บ โดยดูจากไฟที่ใช้ช่วงกลางคืน (ประมาณ 40% ของการใช้ไฟทั้งวัน)
          2) หารด้วย DOD (Depth of Discharge) ที่แนะนำ ซึ่ง LiFePO4 สามารถ DOD ได้ถึง 80-90% ส่วน Lead-Acid แนะนำ DOD ไม่เกิน 50%
          3) เผื่อสำรองไฟฉุกเฉินตามต้องการ เช่น หากต้องการสำรองไฟ 6 ชั่วโมง ให้คำนวณพลังงานที่ต้องใช้ในช่วงดังกล่าว
        </p>

        <h3>เปรียบเทียบแบตเตอรี่แต่ละชนิด</h3>
        <p>
          LiFePO4 เป็นตัวเลือกยอดนิยมสำหรับบ้านพักอาศัย ราคาประมาณ 10,000-15,000 บาท/kWh อายุรอบชาร์จ 4,000-6,000 รอบ
          ปลอดภัยสูง ไม่ระเบิด ส่วน Lead-Acid ราคาถูกกว่า 4,000-6,000 บาท/kWh แต่มีอายุสั้นกว่า 600-1,000 รอบ
          และต้องดูแลรักษามากกว่า NMC/Ternary Lithium มีความหนาแน่นพลังงานสูงกว่า แต่ราคาแพงกว่าและปลอดภัยน้อยกว่า LiFePO4
        </p>

        <h3>ข้อควรพิจารณาก่อนซื้อแบตเตอรี่</h3>
        <p>
          ควรเลือกแบตเตอรี่จากแบรนด์ที่น่าเชื่อถือและมีรับประกันยาว ตรวจสอบว่า Inverter รองรับการทำงานกับแบตเตอรี่ที่เลือก
          พิจารณาความคุ้มค่าระยะยาว โดยคำนวณต้นทุนต่อ kWh ต่อรอบชาร์จ และอย่าลืมเผื่อพื้นที่ติดตั้งที่มีอากาศถ่ายเทดี
          เครื่องคำนวณด้านบนจะช่วยให้คุณประเมินขนาดแบตเตอรี่ที่เหมาะสมกับบ้านคุณได้อย่างรวดเร็ว
        </p>
      </article>
    </div>
  );
}

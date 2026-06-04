
"use client";
import { useState } from "react";
import { Calculator, Sun, Zap, AlertTriangle } from "lucide-react";

export default function SolarInverterSizing({ lang }: any) {
  const [solarKwp, setSolarKwp] = useState<number>(5);
  const [maxLoad, setMaxLoad] = useState<number>(4000);
  const [hasAC, setHasAC] = useState<boolean>(true);
  const [acWatt, setAcWatt] = useState<number>(1500);
  const [acCount, setAcCount] = useState<number>(2);
  const [hasBattery, setHasBattery] = useState<boolean>(true);
  const [systemType, setSystemType] = useState<string>("hybrid");
  const [phase, setPhase] = useState<string>("single");

  // Calculations
  const acTotalWatt = hasAC ? acWatt * acCount : 0;
  const totalLoad = maxLoad + acTotalWatt;

  // Inverter sizing: generally 1:1 to 1.3:1 ratio with solar panels
  const minInverterBySolar = solarKwp * 1000; // minimum = panel size
  const recommendedBySolar = solarKwp * 1000 * 1.1; // 10% margin
  const minInverterByLoad = totalLoad * 1.25; // 25% margin over max load for surges

  const recommendedSize = Math.max(recommendedBySolar, minInverterByLoad);
  const recommendedKw = recommendedSize / 1000;

  // Standard inverter sizes
  const standardSizes = [3, 5, 6, 8, 10, 12, 15, 20, 25, 30];
  const selectedSize = standardSizes.find((s) => s >= recommendedKw) || standardSizes[standardSizes.length - 1];

  // Cost estimation
  const costPerKw = systemType === "hybrid" ? 8000 : systemType === "ongrid" ? 5000 : 6000;
  const estimatedCost = selectedSize * costPerKw;

  const oversizeRatio = (selectedSize * 1000) / (solarKwp * 1000);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6 shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-500 text-white rounded-xl p-2"><Zap className="w-6 h-6" /></div>
          <h2 className="text-xl font-bold text-gray-800">คำนวณขนาด Inverter Solar</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ขนาดแผง Solar (kWp)</label>
              <input
                type="number"
                value={solarKwp}
                onChange={(e) => setSolarKwp(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
                min={1}
                step={0.5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ประเภทระบบ</label>
              <select
                value={systemType}
                onChange={(e) => setSystemType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
              >
                <option value="hybrid">Hybrid (มีแบตเตอรี่)</option>
                <option value="ongrid">On-Grid (ไม่มีแบตเตอรี่)</option>
                <option value="offgrid">Off-Grid (ไม่ต่อกริด)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ไฟเฟส</label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
              >
                <option value="single">1 เฟส (220V)</option>
                <option value="three">3 เฟส (380V)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">โหลดสูงสุดอื่นๆ (W)</label>
              <input
                type="number"
                value={maxLoad}
                onChange={(e) => setMaxLoad(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
                min={0}
                step={100}
              />
              <p className="text-xs text-gray-500 mt-1">ไม่รวมแอร์</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hasAC}
              onChange={(e) => setHasAC(e.target.checked)}
              className="w-4 h-4 rounded text-orange-500"
              id="hasAc"
            />
            <label htmlFor="hasAc" className="text-sm text-gray-700">มีเครื่องปรับอากาศ</label>
          </div>

          {hasAC && (
            <div className="grid grid-cols-2 gap-4 bg-orange-50/50 rounded-lg p-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">วัตต์แอร์/ตัว</label>
                <input
                  type="number"
                  value={acWatt}
                  onChange={(e) => setAcWatt(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
                  min={0}
                  step={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">จำนวน (ตัว)</label>
                <input
                  type="number"
                  value={acCount}
                  onChange={(e) => setAcCount(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
                  min={0}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow space-y-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-orange-600" /> ผลการคำนวณ
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">โหลดรวมสูงสุด</p>
            <p className="text-xl font-bold text-orange-600">{totalLoad.toLocaleString()} W</p>
            <p className="text-xs text-gray-500">{hasAC ? `(แอร์ ${acTotalWatt.toLocaleString()}W + อื่นๆ ${maxLoad.toLocaleString()}W)` : `โหลดทั้งหมด`}</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">ขนาดต่ำสุดตามแผง</p>
            <p className="text-xl font-bold text-amber-600">{(minInverterBySolar / 1000).toFixed(1)} kW</p>
            <p className="text-xs text-gray-500">อัตราส่วน 1:1 กับแผง</p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <p className="text-sm text-green-700 mb-1">ขนาด Inverter แนะนำ</p>
          <p className="text-4xl font-bold text-green-600">{selectedSize} kW</p>
          <p className="text-sm text-gray-600 mt-2">{systemType === "hybrid" ? "Hybrid" : systemType === "ongrid" ? "On-Grid" : "Off-Grid"} • {phase === "single" ? "1 เฟส" : "3 เฟส"}</p>
          <p className="text-xs text-gray-500 mt-1">อัตราส่วน Inverter/Panel = {oversizeRatio.toFixed(2)}:1</p>
        </div>

        {oversizeRatio > 1.5 && (
          <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-yellow-700">อัตราส่วน Inverter/Panel สูงกว่า 1.5 — อาจเพิ่มขนาดแผงโซลาร์ให้คุ้มค่ามากขึ้น</p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-sm text-blue-700">ประมาณการค่า Inverter</p>
          <p className="text-2xl font-bold text-blue-600">฿{estimatedCost.toLocaleString("th-TH")}</p>
          <p className="text-xs text-gray-500">(~฿{costPerKw.toLocaleString()}/kW)</p>
        </div>
      </div>

      <article className="prose max-w-none bg-white rounded-2xl border border-gray-200 p-6 shadow">
        <h2>วิธีเลือกขนาด Inverter Solar ให้เหมาะกับบ้านคุณ</h2>
        <p>
          Inverter หรือเครื่องแปลงไฟ เป็นหัวใจสำคัญของระบบโซลาร์เซลล์ ทำหน้าที่แปลงไฟฟ้ากระแสตรง (DC) จากแผงโซลาร์
          ให้เป็นไฟฟ้ากระแสสลับ (AC) ที่เครื่องใช้ไฟฟ้าในบ้านสามารถใช้งานได้ การเลือกขนาด Inverter ที่เหมาะสมเป็นสิ่งสำคัญมาก
          เพราะหากเล็กเกินไปจะไม่สามารถรองรับโหลดได้ แต่หากใหญ่เกินไปก็สิ้นเปลืองค่าใช้จ่าย
        </p>

        <h3>หลักการเลือกขนาด Inverter</h3>
        <p>
          กฎพื้นฐานคือขนาด Inverter ควรมีกำลังอย่างน้อยเท่ากับขนาดแผงโซลาร์ (อัตราส่วน 1:1) เช่น แผงโซลาร์ 5 kWp ควรใช้ Inverter
          อย่างน้อย 5 kW ในทางปฏิบัตินิยมเผื่อ 10-20% เพื่อรองรับ surge load ของเครื่องปรับอากาศ ตู้เย็น และปั๊มน้ำที่ต้องใช้กำลังสูงขณะเริ่มทำงาน
        </p>

        <h3>ประเภทของ Inverter</h3>
        <p>
          On-Grid Inverter เหมาะสำหรับระบบที่ต่อกับสายส่งการไฟฟ้า ราคาประหยัดที่สุด แต่จะหยุดทำงานเมื่อไฟดับ
          Hybrid Inverter สามารถทำงานร่วมกับแบตเตอรี่ได้ สำรองไฟได้เมื่อไฟดับ ราคาแพงกว่า
          Off-Grid Inverter สำหรับระบบอิสระที่ไม่ต่อกริด เหมาะกับพื้นที่ห่างไกล
        </p>

        <h3>ข้อพิจารณาเพิ่มเติม</h3>
        <p>
          เลือก Inverter ที่มีค่า efficiency สูง (มากกว่า 96%) รองรับ MPPT หลาย string สำหรับแผงที่หันหลายทิศ
          ตรวจสอบว่ารองรับการเชื่อมต่อ WiFi สำหรับ monitoring รับประกันอย่างน้อย 5 ปี
          สำหรับบ้าน 1 เฟส ขนาด 3-8 kW เป็นขนาดที่นิยม ส่วนบ้าน 3 เฟส ควรเริ่มที่ 8 kW ขึ้นไป
          เครื่องคำนวณด้านบนจะช่วยให้คุณประเมินขนาด Inverter ที่เหมาะสมกับระบบโซลาร์และโหลดไฟฟ้าของบ้านคุณได้อย่างแม่นยำ
        </p>
      </article>
    </div>
  );
}

import React, { useState } from "react";
import { 
  useLocalState, 
  inputClass, 
  labelClass, 
  SEOFAQ, 
  FAQItem, 
  CalculationSteps, 
  ExportResult 
} from "./shared";
import { 
  Zap, 
  Activity, 
  Home, 
  Flame, 
  Wrench, 
  Car, 
  Droplets, 
  Clock, 
  Radio, 
  ShieldAlert 
} from "lucide-react";

// ==========================================
// 1. WireGaugeSizing
// ==========================================
export function WireGaugeSizing({ lang }: any) {
  const [loadWatts, setLoadWatts] = useLocalState("wire_load_watts", "3500");
  const [phase, setPhase] = useLocalState("wire_phase", "single");
  const [powerFactor, setPowerFactor] = useLocalState("wire_pf", "1.0");
  const [distance, setDistance] = useLocalState("wire_distance", "30");
  const [installMethod, setInstallMethod] = useLocalState("wire_install", "conduit");

  const watts = parseFloat(loadWatts) || 0;
  const pf = parseFloat(powerFactor) || 1.0;
  const dist = parseFloat(distance) || 0;
  const V = phase === "single" ? 220 : 380;

  // Calculate current (Amps)
  let current = 0;
  if (watts > 0) {
    if (phase === "single") {
      current = watts / (V * pf);
    } else {
      current = watts / (Math.sqrt(3) * V * pf);
    }
  }

  // Recommended wire size (copper) based on ampacity and installation method
  let wireSize = 1.5;
  let ampCapacity = 14;

  const wireTable = installMethod === "conduit" 
    ? [
        { size: 1.5, amp: 11 },
        { size: 2.5, amp: 15 },
        { size: 4.0, amp: 20 },
        { size: 6.0, amp: 26 },
        { size: 10.0, amp: 36 },
        { size: 16.0, amp: 48 },
        { size: 25.0, amp: 63 },
        { size: 35.0, amp: 77 },
        { size: 50.0, amp: 93 },
      ]
    : [
        { size: 1.5, amp: 16 },
        { size: 2.5, amp: 21 },
        { size: 4.0, amp: 29 },
        { size: 6.0, amp: 37 },
        { size: 10.0, amp: 51 },
        { size: 16.0, amp: 68 },
        { size: 25.0, amp: 90 },
        { size: 35.0, amp: 110 },
        { size: 50.0, amp: 135 },
      ];

  const matched = wireTable.find(w => w.amp >= current);
  if (matched) {
    wireSize = matched.size;
    ampCapacity = matched.amp;
  } else {
    wireSize = 50.0;
    ampCapacity = wireTable[wireTable.length - 1].amp;
  }

  // Resistance per km for copper wire
  const rTable: Record<number, number> = {
    1.5: 12.1,
    2.5: 7.41,
    4.0: 4.61,
    6.0: 3.08,
    10.0: 1.83,
    16.0: 1.15,
    25.0: 0.727,
    35.0: 0.524,
    50.0: 0.387
  };

  const R = rTable[wireSize] || 0.387;

  // Voltage drop
  let vDrop = 0;
  if (phase === "single") {
    vDrop = (2 * current * dist * R) / 1000;
  } else {
    vDrop = (Math.sqrt(3) * current * dist * R) / 1000;
  }

  const vDropPercent = V > 0 ? (vDrop / V) * 100 : 0;
  const isDropTooHigh = vDropPercent > 3;

  // Find next size up if voltage drop is too high
  let recommendedSize = wireSize;
  if (isDropTooHigh) {
    const sizes = Object.keys(rTable).map(Number).sort((a,b)=>a-b);
    const currentIndex = sizes.indexOf(wireSize);
    for (let i = currentIndex + 1; i < sizes.length; i++) {
      const tempSize = sizes[i];
      const tempR = rTable[tempSize];
      const tempVDrop = phase === "single"
        ? (2 * current * dist * tempR) / 1000
        : (Math.sqrt(3) * current * dist * tempR) / 1000;
      if ((tempVDrop / V) * 100 <= 3) {
        recommendedSize = tempSize;
        break;
      }
      recommendedSize = tempSize; // Fallback to largest
    }
  }

  const isTH = lang === "TH";

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10 p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 rounded-2xl">
            <Zap className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {isTH ? "คำนวณขนาดสายไฟตามกระแส" : "Wire Gauge Sizing Calculator"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {isTH ? "หาขนาดสายไฟทองแดงที่ปลอดภัยตามโหลดไฟฟ้าและระยะทาง" : "Find safe copper wire size based on load and distance"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className={labelClass}>{isTH ? "กำลังไฟฟ้า (วัตต์ / Watts)" : "Electrical Load (Watts)"}</label>
              <input
                type="number"
                value={loadWatts}
                onChange={(e) => setLoadWatts(e.target.value)}
                className={inputClass}
                placeholder="เช่น 3500"
              />
            </div>

            <div>
              <label className={labelClass}>{isTH ? "ระบบไฟฟ้า (Phase)" : "Electrical Phase"}</label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                className={inputClass}
              >
                <option value="single">{isTH ? "1 เฟส (220V - ไฟบ้านทั่วไป)" : "1 Phase (220V)"}</option>
                <option value="three">{isTH ? "3 เฟส (380V - โรงงาน/อุตสาหกรรม)" : "3 Phase (380V)"}</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>{isTH ? "ตัวประกอบกำลัง (PF)" : "Power Factor"}</label>
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  max="1.0"
                  value={powerFactor}
                  onChange={(e) => setPowerFactor(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>{isTH ? "ระยะทางสายไฟ (เมตร)" : "Cable Length (m)"}</label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{isTH ? "รูปแบบการเดินสายไฟ" : "Installation Method"}</label>
              <select
                value={installMethod}
                onChange={(e) => setInstallMethod(e.target.value)}
                className={inputClass}
              >
                <option value="conduit">{isTH ? "ร้อยท่อเกาะผนัง/ฝังดิน" : "In Conduit"}</option>
                <option value="air">{isTH ? "เดินลอยในอากาศ (ระบายความร้อนดีกว่า)" : "Free Air / Open Wiring"}</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div id="wire-sizing-result" className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {isTH ? "ผลการคำนวณ" : "Calculation Results"}
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "กระแสไฟฟ้าที่ไหลในวงจร" : "Design Current"}</span>
                  <span className="font-extrabold text-gray-900 dark:text-white text-lg">{current.toFixed(2)} A</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "ขนาดสายไฟขั้นต่ำ (ตามกระแส)" : "Min Wire Size (by Ampacity)"}</span>
                  <span className="font-extrabold text-blue-600 dark:text-blue-400 text-lg">{wireSize} sq.mm.</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "แรงดันไฟฟ้าตกในสาย (Voltage Drop)" : "Voltage Drop"}</span>
                  <span className="font-bold text-gray-950 dark:text-white">{vDrop.toFixed(2)} V ({vDropPercent.toFixed(2)}%)</span>
                </div>

                <div className="p-4 rounded-xl mt-4 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-white/5">
                  <span className="block text-xs text-gray-400 dark:text-gray-500 mb-1">
                    {isTH ? "คำแนะนำขนาดสายไฟที่ควรติดตั้งจริง (รวมเผื่อไฟตก)" : "Recommended Wire Size to Install (Includes Voltage Drop)"}
                  </span>
                  <span className="text-2xl font-black text-green-600 dark:text-green-400">
                    {recommendedSize} sq.mm.
                  </span>
                  {isDropTooHigh && (
                    <p className="text-xs text-red-500 mt-1">
                      {isTH ? "* เพิ่มขนาดจากสายปกติเพื่อไม่ให้ไฟตกเกิน 3%" : "* Size increased to prevent >3% voltage drop over distance."}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ExportResult elementId="wire-sizing-result" fileName="wire-gauge-sizing-result" lang={lang} />
            </div>
          </div>
        </div>

        <CalculationSteps
          title={isTH ? "หลักเกณฑ์การคำนวณขนาดสายไฟ" : "Calculation Steps"}
          steps={isTH ? [
            "หาค่ากระแสไฟฟ้า: สำหรับ 1 เฟส I = Watts / (220 * PF) และสำหรับ 3 เฟส I = Watts / (1.732 * 380 * PF)",
            "เปรียบเทียบตารางมาตรฐาน: หาพิกัดการนำกระแสของสายไฟทองแดง (ตามวิธีติดตั้ง) ว่าจะต้องทนกระแสได้ไม่ต่ำกว่ากระแสคำนวณ",
            "คำนวณแรงดันตก (Voltage Drop): V_drop = Factor * I * (Distance/1000) * R (โดย Factor = 2 สำหรับ 1 เฟส และ 1.732 สำหรับ 3 เฟส)",
            "ประเมินเปอร์เซ็นต์แรงดันตก: หากเกิน 3% ระบบจะเสนอแนะให้ปรับขนาดสายใหญ่ขึ้นทีละขั้นจนกว่าแรงดันตกจะน้อยกว่า 3% เพื่อป้องกันเครื่องใช้ไฟฟ้าชำรุด"
          ] : [
            "Find Current: Single phase I = Watts / (220 * PF) | Three phase I = Watts / (1.732 * 380 * PF)",
            "Check Ampacity Tables: Find minimum copper wire size that supports the computed current.",
            "Calculate Voltage Drop: V_drop = Factor * I * (Distance/1000) * R (Factor=2 for 1-phase, 1.732 for 3-phase)",
            "Recommend Upgrade: If voltage drop exceeds 3%, size up the wire until it falls below 3%."
          ]}
        />

        <SEOFAQ title={isTH ? "คำถามที่พบบ่อยและข้อมูลน่ารู้เกี่ยวกับขนาดสายไฟ" : "Wire Sizing FAQs"}>
          <FAQItem
            q="1. ทำไมการคำนวณขนาดสายไฟให้ถูกต้องจึงสำคัญ?"
            a="การเลือกขนาดสายไฟ (Wire Gauge Sizing) มีความจำเป็นอย่างยิ่งต่อความปลอดภัยในชีวิตและทรัพย์สิน หากสายไฟมีขนาดเล็กเกินไป (Undersized) เมื่อเทียบกับกระแสไฟฟ้าที่ไหลผ่าน สายไฟจะเกิดความร้อนสะสมสูงจนวัสดุฉนวนพีวีซีละลาย ซึ่งเป็นสาเหตุหลักของการเกิดไฟฟ้าลัดวงจรและเพลิงไหม้ นอกจากนี้ สายไฟที่เล็กเกินไปจะทำให้เกิดแรงดันไฟฟ้าตกสูง ส่งผลให้เครื่องใช้ไฟฟ้าได้รับแรงดันไม่เพียงพอ ทำงานได้ไม่เต็มประสิทธิภาพ และอาจชำรุดเสียหายได้เร็วกว่าปกติ"
          />
          <FAQItem
            q="2. วิธีการเดินสายไฟมีผลต่อการทนกระแสอย่างไร?"
            a="วิธีการติดตั้งสายไฟมีผลกระทบโดยตรงต่อการระบายความร้อนของตัวนำ ตัวอย่างเช่น หากเราเดินสายไฟร้อยท่อฝังผนังหรือฝังดิน (Conduit Installation) การระบายความร้อนจะทำได้ยากกว่าการเดินลอยในอากาศ (Free Air Installation) ส่งผลให้สายไฟชนิดเดียวกัน ขนาดเท่ากัน มีพิกัดกระแสปลอดภัยที่ต่ำลงเมื่อติดตั้งในท่อ ดังนั้น การคำนวณจึงต้องระบุวิธีติดตั้งให้ถูกต้องเพื่ออิงค่าพิกัดกระแสตามข้อกำหนดมาตรฐานของการไฟฟ้านครหลวงและการไฟฟ้าส่วนภูมิภาค (อ้างอิง มอก. 11-2553)"
          />
          <FAQItem
            q="3. แรงดันไฟตก (Voltage Drop) คืออะไร และควบคุมให้อยู่ในเกณฑ์เท่าไร?"
            a="แรงดันไฟตก คือการสูญเสียแรงดันไฟฟ้าบางส่วนไปในสายไฟเนื่องจากความต้านทานของโลหะทองแดง โดยเฉพาะอย่างยิ่งเมื่อเดินสายไฟเป็นระยะทางไกลๆ (เช่น เกิน 30-50 เมตรขึ้นไป) มาตรฐานการออกแบบระบบไฟฟ้าทั่วไปกำหนดให้แรงดันไฟตกต้องไม่เกิน 3% ของแรงดันใช้งานปกติ (เช่น ไม่เกิน 6.6 โวลต์สำหรับระบบ 220V) หากคำนวณแล้วพบว่าไฟตกเกินกว่าเกณฑ์ดังกล่าว จำเป็นต้องขยับขนาดสายไฟให้ใหญ่ขึ้นเพื่อลดความต้านทาน แม้ว่าขนาดสายไฟเดิมจะสามารถทนกระแสไฟฟ้าได้แล้วก็ตาม"
          />
          <FAQItem
            q="4. สายไฟ THW, VAF และ NYY ต่างกันอย่างไร?"
            a="สายไฟแต่ละประเภทมีการออกแบบเปลือกฉนวนที่แตกต่างกันเพื่อตอบสนองการใช้งานแต่ละรูปแบบ: 1) สาย VAF เป็นสายแบนสำหรับเดินเกาะผนังภายในบ้าน ห้ามร้อยท่อและห้ามฝังดิน 2) สาย THW เป็นสายกลมแกนเดี่ยวใช้สำหรับร้อยท่อสายไฟ มีชั้นฉนวนชั้นเดียว ห้ามเดินฝังดินโดยตรง 3) สาย NYY เป็นสายกลมมีฉนวนหนาหลายชั้น ทนทานต่อสภาพแวดล้อมได้ดีเยี่ยม สามารถเดินใต้ดิน ฝังดินโดยตรง หรือร้อยท่อฝังดินได้"
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// ==========================================
// 2. FuseBreakerSizing
// ==========================================
export function FuseBreakerSizing({ lang }: any) {
  const [loadWatts, setLoadWatts] = useLocalState("breaker_load_watts", "4500");
  const [loadType, setLoadType] = useLocalState("breaker_load_type", "heater");
  const [phase, setPhase] = useLocalState("breaker_phase", "single");

  const watts = parseFloat(loadWatts) || 0;
  const V = phase === "single" ? 220 : 380;

  // Compute current
  let current = 0;
  if (watts > 0) {
    if (phase === "single") {
      current = watts / V;
    } else {
      current = watts / (Math.sqrt(3) * V);
    }
  }

  // Safety margins: 125% for continuous load, 175% or 200% for motor loads
  const multiplier = loadType === "motor" ? 1.75 : 1.25;
  const minBreakerCurrent = current * multiplier;

  // Standard Breaker Sizes in Thailand
  const standardBreakers = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125];
  let recommendedBreaker = standardBreakers.find(b => b >= minBreakerCurrent) || 125;
  if (minBreakerCurrent > 125) {
    recommendedBreaker = Math.ceil(minBreakerCurrent);
  }

  // Recommended min copper wire size (sq.mm.) to match the breaker (under conduit rules)
  let matchedWire = 1.5;
  if (recommendedBreaker <= 11) matchedWire = 1.5;
  else if (recommendedBreaker <= 15) matchedWire = 2.5;
  else if (recommendedBreaker <= 20) matchedWire = 4.0;
  else if (recommendedBreaker <= 26) matchedWire = 6.0;
  else if (recommendedBreaker <= 36) matchedWire = 10.0;
  else if (recommendedBreaker <= 48) matchedWire = 16.0;
  else if (recommendedBreaker <= 63) matchedWire = 25.0;
  else if (recommendedBreaker <= 77) matchedWire = 35.0;
  else matchedWire = 50.0;

  const isTH = lang === "TH";

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10 p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-2xl">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {isTH ? "คำนวณขนาดฟิวส์และเบรกเกอร์" : "Fuse & Breaker Sizing Calculator"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {isTH ? "ป้องกันสายไฟไหม้และการใช้ไฟเกินด้วยการเลือกเบรกเกอร์ให้ตรงสเปก" : "Prevent electrical hazards by selecting the right breaker size"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className={labelClass}>{isTH ? "กำลังไฟฟ้าของอุปกรณ์ (วัตต์)" : "Device Load (Watts)"}</label>
              <input
                type="number"
                value={loadWatts}
                onChange={(e) => setLoadWatts(e.target.value)}
                className={inputClass}
                placeholder="เช่น 4500"
              />
            </div>

            <div>
              <label className={labelClass}>{isTH ? "ประเภทของภาระไฟฟ้า (Load Type)" : "Load Type"}</label>
              <select
                value={loadType}
                onChange={(e) => setLoadType(e.target.value)}
                className={inputClass}
              >
                <option value="heater">{isTH ? "เครื่องทำความร้อน / น้ำอุ่น (มีกระแสสม่ำเสมอ)" : "Resistive (Water Heater / Kettle)"}</option>
                <option value="motor">{isTH ? "มอเตอร์ / เครื่องปรับอากาศ / ปั๊ม (กระแสสตาร์ตสูง)" : "Inductive / Motor (AC, Water Pump)"}</option>
                <option value="general">{isTH ? "เครื่องใช้ไฟฟ้าทั่วไป / แสงสว่าง" : "General Lighting & Socket"}</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>{isTH ? "แรงดันไฟฟ้าระบบ" : "System Voltage"}</label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                className={inputClass}
              >
                <option value="single">{isTH ? "1 เฟส (220V)" : "1 Phase (220V)"}</option>
                <option value="three">{isTH ? "3 เฟส (380V)" : "3 Phase (380V)"}</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div id="breaker-sizing-result" className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {isTH ? "ขนาดเบรกเกอร์และฟิวส์ที่แนะนำ" : "Sizing Recommendations"}
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "กระแสไฟฟ้าปกติของอุปกรณ์" : "Normal Operating Current"}</span>
                  <span className="font-bold text-gray-950 dark:text-white">{current.toFixed(2)} A</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "พิกัดขั้นต่ำเผื่อค่าความปลอดภัย" : "Minimum Sizing Requirement"}</span>
                  <span className="font-bold text-gray-950 dark:text-white">{minBreakerCurrent.toFixed(2)} A</span>
                </div>

                <div className="p-4 rounded-xl mt-4 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-white/5 text-center">
                  <span className="block text-xs text-gray-400 dark:text-gray-500 mb-1">
                    {isTH ? "ขนาดเซอร์กิตเบรกเกอร์ที่ควรใช้" : "Recommended Circuit Breaker"}
                  </span>
                  <span className="text-3xl font-black text-red-600 dark:text-red-400">
                    {recommendedBreaker} A
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-center">
                  <span className="block text-xs text-blue-600 dark:text-blue-400 mb-1">
                    {isTH ? "ขนาดสายไฟทองแดงขั้นต่ำที่ต้องใช้ร่วมกัน" : "Min Safe Wire Size (Copper)"}
                  </span>
                  <span className="text-xl font-bold text-blue-800 dark:text-blue-300">
                    {matchedWire} sq.mm.
                  </span>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {isTH ? "* ห้ามใช้สายไฟขนาดเล็กกว่านี้เด็ดขาดเพราะสายจะไหม้ก่อนเบรกเกอร์ทริป" : "* Never use a smaller wire, otherwise the wire will melt before the breaker trips."}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ExportResult elementId="breaker-sizing-result" fileName="fuse-breaker-sizing-result" lang={lang} />
            </div>
          </div>
        </div>

        <CalculationSteps
          title={isTH ? "สูตรและวิธีการหาขนาดเบรกเกอร์" : "Calculation Formulas"}
          steps={isTH ? [
            "คำนวณหากระแสไฟฟ้าของโหลด (I) ในหน่วยแอมแปร์: I = วัตต์ / (แรงดันไฟฟ้า)",
            "คำนวณหาพิกัดความปลอดภัยของกระแสใช้งานปกติ: โหลดต่อเนื่องหรือทั่วไปคูณ 1.25 (125%) และ มอเตอร์คูณ 1.75 (175%) เพื่อรองรับกระแสกระชากขณะสตาร์ต",
            "เลือกขนาดเบรกเกอร์มาตรฐานตัวแรกที่ใหญ่กว่าหรือเท่ากับค่าพิกัดความปลอดภัยที่คำนวณได้",
            "ตรวจสอบพิกัดการทนกระแสของสายไฟที่ต่อจากเบรกเกอร์ ต้องมีพิกัดกระแสที่มากกว่าขนาดของเบรกเกอร์เสมอ"
          ] : [
            "Calculate operating current: I = Watts / Voltage.",
            "Apply safety multipliers: 1.25x for general continuous loads or 1.75x for motor starter surges.",
            "Match with standard circuit breaker sizes: [10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125] Amps.",
            "Verify that the downstream wire ampacity is greater than or equal to the breaker rating to prevent wire fire."
          ]}
        />

        <SEOFAQ title={isTH ? "คู่มือและคำถามพบบ่อยเกี่ยวกับการเลือกขนาดเซอร์กิตเบรกเกอร์" : "Fuse & Breaker Sizing FAQs"}>
          <FAQItem
            q="1. เซอร์กิตเบรกเกอร์ทำหน้าที่อะไร และทำไมต้องคำนวณ?"
            a="เซอร์กิตเบรกเกอร์ (Circuit Breaker) มีหน้าที่หลักสองประการ คือ ป้องกันกระแสไฟฟ้าเกินขนาด (Overload) และป้องกันไฟฟ้าลัดวงจร (Short Circuit) เพื่อป้องกันความเสียหายที่อาจเกิดขึ้นกับระบบสายไฟและอาคาร การเลือกขนาดเบรกเกอร์ที่ใหญ่เกินไป (Oversized) จะทำให้เบรกเกอร์ไม่ยอมตัดการทำงานแม้ว่าจะมีกระแสไฟไหลเกินในสายไฟจนสายร้อนจัดและเกิดไฟไหม้ ส่วนการเลือกขนาดเบรกเกอร์ที่เล็กเกินไป (Undersized) จะทำให้อุปกรณ์สับสวิตช์ลงบ่อย (Breaker Tripping) ทั้งที่เป็นการใช้งานเครื่องใช้ไฟฟ้าตามปกติ"
          />
          <FAQItem
            q="2. ทำไมกระแสเบรกเกอร์ต้องมีขนาดใหญ่กว่ากระแสเครื่องใช้ไฟฟ้า 1.25 เท่า?"
            a="การเผื่อขนาดไว้ที่ 1.25 เท่า (หรือ 125%) ของกระแสไฟฟ้าปกติ เป็นข้อกำหนดตามมาตรฐานความปลอดภัยไฟฟ้าสากลและมาตรฐาน วสท. เพื่อรองรับการทำงานของเครื่องใช้ไฟฟ้าประเภทโหลดต่อเนื่อง (Continuous Load) ที่ทำงานติดต่อกันตั้งแต่ 3 ชั่วโมงขึ้นไป ซึ่งจะก่อให้เกิดความร้อนสะสมในสายไฟและตัวเบรกเกอร์ การเผื่อค่าช่วยลดปัญหา 'ทริปเทียม' (Nuisance Tripping) ที่เกิดขึ้นจากความร้อนสะสมในตัวโลหะสปริงของเบรกเกอร์"
          />
          <FAQItem
            q="3. โหลดชนิดมอเตอร์ (Inductive Load) แตกต่างจากโหลดทั่วไปอย่างไร?"
            a="เครื่องใช้ไฟฟ้าที่มีโครงสร้างของมอเตอร์ เช่น แอร์ ปั๊มน้ำ ตู้เย็น เครื่องซักผ้า จะมีกระแสไฟฟ้าพุ่งขึ้นสูงกว่าปกติชั่วขณะ (Inrush Current) หรือกระแสสตาร์ต ซึ่งสูงถึง 3-5 เท่าของกระแสทำงานปกติ แม้จะเป็นเวลาเพียงเสี้ยววินาที แต่ก็ทำให้เบรกเกอร์ตัดวงจรได้ หากเลือกประเภทเบรกเกอร์ไม่สอดคล้อง ดังนั้นในระบบบ้านจึงแนะนำให้เลือกใช้เบรกเกอร์ Type C ซึ่งรองรับไฟกระชากช่วงสั้นได้ดีกว่า และเผื่อขนาดกระแสคำนวณเพิ่มขึ้น 1.75 เท่า"
          />
          <FAQItem
            q="4. ข้อควรระวังที่สุดในการอัปเกรดเซอร์กิตเบรกเกอร์คืออะไร?"
            a="ข้อพึงระวังขั้นสูงสุด: ห้ามเปลี่ยนเซอร์กิตเบรกเกอร์ให้มีขนาดใหญ่ขึ้นโดยไม่เปลี่ยนสายไฟตามเป็นอันขาด! ตัวอย่างเช่น หากเบรกเกอร์ขนาด 16A ทริปบ่อยจากการเปิดเครื่องทำน้ำอุ่น แล้วเราแก้ปัญหาด้วยการเปลี่ยนเบรกเกอร์เป็นขนาด 32A โดยยังใช้สายไฟขนาด 2.5 ตารางมิลลิเมตรเท่าเดิม สายไฟจะรับภาระกระแสสูงเกินตัวจนฉนวนละลายและเกิดไฟไหม้ ก่อนที่เบรกเกอร์ 32A จะรู้ตัวและตัดไฟ"
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// ==========================================
// 3. LpgPipeSizing
// ==========================================
export function LpgPipeSizing({ lang }: any) {
  const [loadVal, setLoadVal] = useLocalState("lpg_load", "100000");
  const [loadUnit, setLoadUnit] = useLocalState("lpg_unit", "btu");
  const [length, setLength] = useLocalState("lpg_length", "10");
  const [pressure, setPressure] = useLocalState("lpg_pressure", "low");

  const rawLoad = parseFloat(loadVal) || 0;
  const len = parseFloat(length) || 0;

  // Convert to BTU/hr
  let btuLoad = 0;
  if (loadUnit === "btu") btuLoad = rawLoad;
  else if (loadUnit === "kw") btuLoad = rawLoad * 3412.142;
  else if (loadUnit === "kghr") btuLoad = rawLoad * 50000; // 1 kg/hr of LPG yields ~50k BTU/hr

  // Logic to determine gas pipe sizes (Copper O.D. or Black Steel Schedule 40 Nom)
  let recommendedCopper = '1/2" O.D.';
  let recommendedSteel = '1/2" NPT';
  let flowRateKgHr = btuLoad / 50000;

  if (pressure === "low") {
    // Low pressure (2.8 kPa) has higher pressure drop. Needs larger pipes.
    if (len <= 10) {
      if (btuLoad <= 30000) {
        recommendedCopper = '3/8" (9.5 mm) O.D.';
        recommendedSteel = '1/2" (15 mm) NPT';
      } else if (btuLoad <= 80000) {
        recommendedCopper = '1/2" (12.7 mm) O.D.';
        recommendedSteel = '1/2" (15 mm) NPT';
      } else if (btuLoad <= 150000) {
        recommendedCopper = '5/8" (15.8 mm) O.D.';
        recommendedSteel = '3/4" (20 mm) NPT';
      } else if (btuLoad <= 300000) {
        recommendedCopper = '3/4" (19.0 mm) O.D.';
        recommendedSteel = '3/4" (20 mm) NPT';
      } else {
        recommendedCopper = '7/8" (22.2 mm) O.D. หรือมากกว่า';
        recommendedSteel = '1" (25 mm) NPT';
      }
    } else {
      if (btuLoad <= 20000) {
        recommendedCopper = '3/8" (9.5 mm) O.D.';
        recommendedSteel = '1/2" (15 mm) NPT';
      } else if (btuLoad <= 50000) {
        recommendedCopper = '1/2" (12.7 mm) O.D.';
        recommendedSteel = '1/2" (15 mm) NPT';
      } else if (btuLoad <= 110000) {
        recommendedCopper = '5/8" (15.8 mm) O.D.';
        recommendedSteel = '3/4" (20 mm) NPT';
      } else if (btuLoad <= 200000) {
        recommendedCopper = '3/4" (19.0 mm) O.D.';
        recommendedSteel = '3/4" (20 mm) NPT';
      } else {
        recommendedCopper = '7/8" (22.2 mm) O.D. หรือมากกว่า';
        recommendedSteel = '1" (25 mm) NPT';
      }
    }
  } else {
    // Medium / High pressure has less pressure drop constraint. Can use smaller pipes.
    if (btuLoad <= 100000) {
      recommendedCopper = '3/8" (9.5 mm) O.D.';
      recommendedSteel = '1/2" (15 mm) NPT';
    } else if (btuLoad <= 300000) {
      recommendedCopper = '1/2" (12.7 mm) O.D.';
      recommendedSteel = '1/2" (15 mm) NPT';
    } else if (btuLoad <= 600000) {
      recommendedCopper = '5/8" (15.8 mm) O.D.';
      recommendedSteel = '3/4" (20 mm) NPT';
    } else {
      recommendedCopper = '3/4" (19.0 mm) O.D.';
      recommendedSteel = '1" (25 mm) NPT';
    }
  }

  const isTH = lang === "TH";

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10 p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-2xl">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {isTH ? "คำนวณขนาดท่อแก๊ส LPG" : "LPG Gas Pipe Sizing Calculator"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {isTH ? "หาขนาดท่อทองแดงและท่อเหล็กที่ปลอดภัยต่อปริมาณการไหลของแก๊ส" : "Find appropriate gas pipe size for LPG appliances"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className={labelClass}>{isTH ? "ปริมาณการใช้แก๊สของอุปกรณ์" : "Gas Consumption"}</label>
                <input
                  type="number"
                  value={loadVal}
                  onChange={(e) => setLoadVal(e.target.value)}
                  className={inputClass}
                  placeholder="เช่น 100000"
                />
              </div>
              <div>
                <label className={labelClass}>{isTH ? "หน่วยวัด" : "Unit"}</label>
                <select
                  value={loadUnit}
                  onChange={(e) => setLoadUnit(e.target.value)}
                  className={inputClass}
                >
                  <option value="btu">BTU/hr</option>
                  <option value="kw">kW</option>
                  <option value="kghr">kg/hr</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>{isTH ? "ความยาวท่อรวมข้อต่อ (เมตร)" : "Total Pipe Length (meters)"}</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>{isTH ? "ประเภทแรงดันใช้งาน" : "Operating Pressure Type"}</label>
              <select
                value={pressure}
                onChange={(e) => setPressure(e.target.value)}
                className={inputClass}
              >
                <option value="low">{isTH ? "แรงดันต่ำ (Low Pressure - เตาบ้าน/2.8 kPa)" : "Low Pressure (Standard Cooker / 2.8 kPa)"}</option>
                <option value="high">{isTH ? "แรงดันปานกลาง-สูง (Medium/High Pressure - ร้านอาหาร KB5)" : "Medium/High Pressure (KB5 Burner)"}</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div id="lpg-sizing-result" className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {isTH ? "ขนาดท่อแนะนำตามเกณฑ์ความปลอดภัย" : "Pipe Sizing Recommendation"}
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "ปริมาณความร้อนคำนวณ" : "Equivalent Heat Output"}</span>
                  <span className="font-bold text-gray-950 dark:text-white">{btuLoad.toLocaleString()} BTU/hr</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "อัตราสิ้นเปลืองแก๊สเฉลี่ย" : "LPG Flow Rate"}</span>
                  <span className="font-bold text-gray-950 dark:text-white">{flowRateKgHr.toFixed(2)} kg/hr</span>
                </div>

                <div className="p-4 rounded-xl mt-4 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-white/5">
                  <span className="block text-xs text-gray-400 dark:text-gray-500 mb-1">
                    {isTH ? "ขนาดท่อทองแดงชนิดอ่อน (Copper Tube - O.D.)" : "Copper Tubing (Outer Diameter)"}
                  </span>
                  <span className="text-xl font-extrabold text-orange-600 dark:text-orange-400">
                    {recommendedCopper}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-white/5">
                  <span className="block text-xs text-gray-400 dark:text-gray-500 mb-1">
                    {isTH ? "ขนาดท่อเหล็กดำแป๊ปแก๊ส (Black Steel Pipe Sch. 40)" : "Black Steel Pipe (Schedule 40)"}
                  </span>
                  <span className="text-xl font-extrabold text-gray-700 dark:text-gray-300">
                    {recommendedSteel}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ExportResult elementId="lpg-sizing-result" fileName="lpg-pipe-sizing-result" lang={lang} />
            </div>
          </div>
        </div>

        <CalculationSteps
          title={isTH ? "เกณฑ์การคำนวณและประเมินท่อแก๊ส" : "Calculation Guidelines"}
          steps={isTH ? [
            "แปลงกำลังไฟจากอุปกรณ์ทั้งหมดให้อยู่ในหน่วย BTU/hr (1 kW = 3,412 BTU/hr, 1 kg/hr = 50,000 BTU/hr)",
            "ประเมินแรงดันใช้งาน: ระบบแรงดันต่ำมีแรงขับเคลื่อนน้อย ท่อจึงจำเป็นต้องมีขนาดใหญ่กว่าเพื่อป้องกันความดันแก๊สตกปลายสาย",
            "เทียบตารางระยะทาง: ใช้ความยาวท่อรวมไปหาพิกัดพอร์ตจ่ายตามหลักมาตรฐาน NFPA 54 สำหรับก๊าซปิโตรเลียมเหลว",
            "หากระบบมีเตาแก๊สหลายตัว ให้คิดกำลังรวม (Simultaneous Heat Load) ก่อนนำมาเปิดตารางคำนวณหาขนาดท่อหลัก"
          ] : [
            "Convert input load units to BTU/hr (1 kW = 3,412 BTU/hr, 1 kg/hr = 50,000 BTU/hr).",
            "Analyze pressure type: Low pressure requires wider pipe diameters to prevent unacceptable pressure drop at the burner.",
            "Look up sizing guidelines matching standard NFPA 54 tables for LPG piping.",
            "If multiple burners share a pipe, design size for the total maximum simultaneous load."
          ]}
        />

        <SEOFAQ title={isTH ? "สาระน่ารู้เรื่องการเดินท่อแก๊ส LPG และคำถามพบบ่อย" : "LPG Piping FAQs"}>
          <FAQItem
            q="1. การเลือกขนาดท่อแก๊ส LPG สำคัญอย่างไรต่อประสิทธิภาพเตาแก๊ส?"
            a="การเลือกขนาดท่อแก๊ส (LPG Pipe Sizing) มีผลกระทบโดยตรงต่อประสิทธิภาพการทำความร้อนและความปลอดภัย หากท่อแก๊สมีขนาดเล็กเกินไป แรงดันแก๊สที่ปลายท่อจะตกลงมาก ส่งผลให้เตาแก๊สทำงานได้ไม่แรง หรือไฟแรงไม่สม่ำเสมอ โดยเฉพาะในร้านอาหารหรือระบบครัวอุตสาหกรรมที่ต้องเปิดใช้เตาแก๊สหลายตัวพร้อมกัน และท่อแก๊สที่เล็กไปยังเพิ่มความเร็วของไอแก๊สในระบบจนอาจสร้างเสียงดังหรือความเค้นในท่อได้"
          />
          <FAQItem
            q="2. ทำไมถึงแนะนำท่อทองแดง และท่อเหล็กดำ?"
            a="มาตรฐานระบบแก๊สหุงต้มทั่วไปไม่อนุญาตให้ใช้ท่อพีวีซีหรือท่อสังกะสีธรรมดาเนื่องจากแก๊ส LPG มีผลทำให้ยาง/พลาสติกบางประเภทกรอบแตกง่าย และต้องการโครงสร้างวัสดุที่ทนทานสูง ท่อทองแดงเกรด L/K (Copper Tubing) เป็นที่นิยมเนื่องจากทนแรงดันได้ดี ไร้รอยต่อ และดัดโค้งได้ง่ายเหมาะกับบ้าน ส่วนท่อเหล็กดำเกรดหนาไร้ตะเข็บ (ASTM A53 Schedule 40) นิยมใช้ในร้านอาหารและอุตสาหกรรมเนื่องจากมีความแข็งแกร่งทนทานต่อแรงกระแทกจากภายนอกได้สูง"
          />
          <FAQItem
            q="3. ความแตกต่างระหว่างระบบแก๊สแรงดันต่ำและแรงดันสูงคืออะไร?"
            a="1) ระบบแรงดันต่ำ (Low Pressure, ~2.8 kPa) ใช้สำหรับเตาบ้านทั่วไป ตู้อบแก๊ส หรือหัวเตาแบบวงกลมธรรมดา มีความปลอดภัยสูงแต่ต้องการขนาดท่อที่ใหญ่กว่า 2) ระบบแรงดันปานกลาง-สูง (Medium/High Pressure, ~10-20 psi หรือสูงกว่า) มักจะใช้กับเตาร้านอาหารแบบเร่งไฟ หรือเตาจีน (KB5) ซึ่งมีแรงดันสูงจากเรกูเลเตอร์ ส่งผลให้แก๊สไหลเร็วขึ้นและสามารถใช้ท่อแก๊สที่มีขนาดเล็กลงได้ดีขึ้น"
          />
          <FAQItem
            q="4. วิธีทดสอบการรั่วซึมของท่อแก๊สอย่างปลอดภัยหลังจากติดตั้งทำอย่างไร?"
            a="ห้ามใช้ไฟแช็กหรือเปลวไฟมาตรวจหารอยรั่วเด็ดขาด! วิธีที่ง่ายและปลอดภัยที่สุดสำหรับงานบ้านคือ 'การทดสอบด้วยฟองสบู่' โดยผสมน้ำยาล้างจานกับน้ำสะอาดให้เกิดฟองลูบไปตามข้อต่อต่างๆ หากเกิดฟองสบู่ปูดพองขึ้นมาแสดงว่ามีแก๊สรั่ว ส่วนในงานระบบที่เป็นทางการ ช่างจะใช้การทดสอบแรงดันลม (Pneumatic Pressure Testing) หรือ Leak Test ด้วยเกจวัดแรงดันโดยทิ้งไว้อย่างน้อย 15-30 นาทีเพื่อเช็กการตกของระดับเกจ"
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// ==========================================
// 4. DiyVsShopCarRepair
// ==========================================
export function DiyVsShopCarRepair({ lang }: any) {
  const [shopParts, setShopParts] = useLocalState("diy_shop_parts", "2500");
  const [shopLabor, setShopLabor] = useLocalState("diy_shop_labor", "1200");
  const [diyParts, setDiyParts] = useLocalState("diy_parts", "1800");
  const [diyTools, setDiyTools] = useLocalState("diy_tools", "500");
  const [diyTime, setDiyTime] = useLocalState("diy_time", "3");
  const [hourlyRate, setHourlyRate] = useLocalState("diy_hourly_rate", "200");

  const sParts = parseFloat(shopParts) || 0;
  const sLabor = parseFloat(shopLabor) || 0;
  const dParts = parseFloat(diyParts) || 0;
  const dTools = parseFloat(diyTools) || 0;
  const dTime = parseFloat(diyTime) || 0;
  const hRate = parseFloat(hourlyRate) || 0;

  const totalShop = sParts + sLabor;
  const totalDiyDirect = dParts + dTools;
  const opportunityCost = dTime * hRate;
  const totalDiyTrue = totalDiyDirect + opportunityCost;

  const cashSavings = totalShop - totalDiyDirect;
  const trueSavings = totalShop - totalDiyTrue;

  const isTH = lang === "TH";

  let recommendation = "";
  if (trueSavings > 1500) {
    recommendation = isTH 
      ? "คุ้มค่ามากสำหรับการลงมือทำเอง! ส่วนต่างราคาคุ้มกับความพยายามและต้นทุนเวลาของคุณ" 
      : "Highly Recommended for DIY! You will save a substantial amount even considering your time.";
  } else if (trueSavings > 0) {
    recommendation = isTH 
      ? "คุ้มค่าพอสมควร แนะนำให้ลองซ่อมเองเพื่อสะสมทักษะและได้เป็นเจ้าของเครื่องมือช่างชิ้นใหม่" 
      : "Moderately worth it. Great chance to learn and keep the new tools for future use.";
  } else {
    recommendation = isTH 
      ? "ส่งซ่อมอู่อาจดีกว่า! ค่าเครื่องมือหรือค่าเวลาในการทำงานของคุณสูงกว่าการจ้างมืออาชีพทำ" 
      : "Better take it to the shop. Opportunity costs or tool costs exceed professional labor.";
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10 p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl">
            <Wrench className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {isTH ? "เปรียบเทียบซ่อมรถเอง vs อู่" : "DIY vs Professional Auto Repair"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {isTH ? "คำนวณและชั่งน้ำหนักว่าการลงมือซ่อมแซมรถยนต์เองประหยัดเงินได้จริงแค่ไหน" : "Calculate and decide if repairing your vehicle yourself is worth it"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
              <h4 className="font-bold text-gray-800 dark:text-white mb-2 text-sm">{isTH ? "1. ใบเสนอราคาของอู่/ศูนย์" : "1. Professional Shop Quote"}</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">{isTH ? "ค่าอะไหล่ (บาท)" : "Parts Cost"}</label>
                  <input
                    type="number"
                    value={shopParts}
                    onChange={(e) => setShopParts(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">{isTH ? "ค่าแรง (บาท)" : "Labor Cost"}</label>
                  <input
                    type="number"
                    value={shopLabor}
                    onChange={(e) => setShopLabor(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
              <h4 className="font-bold text-gray-800 dark:text-white mb-2 text-sm">{isTH ? "2. ค่าใช้จ่ายประเมินงาน DIY" : "2. DIY Estimation"}</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">{isTH ? "ค่าอะไหล่ DIY (บาท)" : "DIY Parts Cost"}</label>
                  <input
                    type="number"
                    value={diyParts}
                    onChange={(e) => setDiyParts(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">{isTH ? "ค่าซื้อเครื่องมือใหม่" : "New Tools Cost"}</label>
                  <input
                    type="number"
                    value={diyTools}
                    onChange={(e) => setDiyTools(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
              <h4 className="font-bold text-gray-800 dark:text-white mb-2 text-sm">{isTH ? "3. เวลาและมูลค่าชั่วโมงทำงาน" : "3. Time & Opportunity Value"}</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">{isTH ? "เวลาที่ต้องใช้ (ชั่วโมง)" : "DIY Time (Hours)"}</label>
                  <input
                    type="number"
                    value={diyTime}
                    onChange={(e) => setDiyTime(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">{isTH ? "ค่าเสียโอกาส/ชม. (บาท)" : "Hourly Rate (THB)"}</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div id="diy-vs-shop-result" className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {isTH ? "วิเคราะห์ความคุ้มค่า" : "Cost Analysis"}
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "ค่าใช้จ่ายรวมจ้างอู่" : "Total Shop Cost"}</span>
                  <span className="font-bold text-gray-950 dark:text-white">{totalShop.toLocaleString()} THB</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "ค่าใช้จ่ายจ่ายจริง DIY (อะไหล่+เครื่องมือ)" : "Total DIY Out-of-pocket"}</span>
                  <span className="font-bold text-gray-950 dark:text-white">{totalDiyDirect.toLocaleString()} THB</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "ประหยัดเงินสดสุทธิ (Cash Saved)" : "Net Cash Saved"}</span>
                  <span className="font-extrabold text-green-600 dark:text-green-400 text-lg">+{cashSavings.toLocaleString()} THB</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5 text-xs text-gray-400">
                  <span>{isTH ? "ต้นทุนค่าเสียเวลาชั่วโมงทำงาน" : "Opportunity Cost of Time"}</span>
                  <span>{opportunityCost.toLocaleString()} THB</span>
                </div>

                <div className="p-4 rounded-xl mt-4 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-white/5 text-center">
                  <span className="block text-xs text-gray-400 dark:text-gray-500 mb-1">
                    {isTH ? "เงินประหยัดสุทธิเมื่อหักต้นทุนเวลาแล้ว (True Savings)" : "True Savings (Time Deducted)"}
                  </span>
                  <span className={`text-2xl font-black ${trueSavings > 0 ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
                    {trueSavings.toLocaleString()} THB
                  </span>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-xs text-blue-800 dark:text-blue-200 rounded-xl leading-relaxed">
                  <strong>{isTH ? "ข้อแนะนำ: " : "Advice: "}</strong> {recommendation}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ExportResult elementId="diy-vs-shop-result" fileName="diy-vs-shop-repair-result" lang={lang} />
            </div>
          </div>
        </div>

        <SEOFAQ title={isTH ? "คู่มือวิเคราะห์ความคุ้มค่าของการซ่อมรถเองกับการพึ่งพาช่าง" : "DIY vs Shop Repair FAQs"}>
          <FAQItem
            q="1. วิธีคิดค่าเสียโอกาส (Opportunity Cost) ในการซ่อมรถเองทำอย่างไร?"
            a="ค่าเสียโอกาสคิดจาก 'เวลาที่คุณต้องใช้ในการทำงานชิ้นนี้คูณด้วยรายได้ต่อชั่วโมงปกติของคุณ' ตัวอย่างเช่น หากคุณมีรายได้เฉลี่ยชั่วโมงละ 200 บาท และต้องใช้เวลาซ่อมรถยนต์ 5 ชั่วโมง เท่ากับคุณมีต้นทุนเวลา (Time Cost) อยู่ที่ 1,000 บาท หากคุณสามารถใช้วันหยุดนั้นทำงานเสริมอื่นได้ เงิน 1,000 บาทนี้คือต้นทุนจริงที่คุณสูญเสียไป การนำต้นทุนเวลามาคิดร่วมด้วยช่วยตอบคำถามว่าคุณควรลงมือเอง หรือจ่ายค่าแรงให้อู่ทำงานแทนเพื่อประหยัดพลังงานชีวิต"
          />
          <FAQItem
            q="2. งานซ่อมรถยนต์แบบใดที่คนทั่วไปสามารถเริ่มต้นทำเองได้ (DIY)?"
            a="งานบำรุงรักษาพื้นฐานที่ไม่จำเป็นต้องใช้เครื่องมือพิเศษขนาดใหญ่หรือลิฟต์ยกรถและมีความเสี่ยงต่ำ ได้แก่: 1) การเปลี่ยนน้ำมันเครื่องและไส้กรอง 2) การเปลี่ยนไส้กรองอากาศและไส้กรองแอร์ในห้องโดยสาร 3) การเปลี่ยนใบปัดน้ำฝน 4) การเปลี่ยนหัวเทียน 5) การสลับยางรถยนต์ และ 6) การเปลี่ยนแบตเตอรี่ งานเหล่านี้มีคู่มือการทำที่เข้าใจง่ายตามวิดีโอทั่วไปและอะไหล่สามารถสั่งซื้อออนไลน์ได้ในราคาไม่แพง"
          />
          <FAQItem
            q="3. งานประเภทไหนที่ห้ามลงมือทำเองเด็ดขาดและควรส่งช่างมืออาชีพ?"
            a="หลีกเลี่ยงงานซ่อมแซมที่มีความซับซ้อน เกี่ยวข้องกับระบบความปลอดภัยขั้นสูง หรือต้องการเครื่องมือวัดวิเคราะห์เฉพาะทางสูง เช่น: 1) การผ่าเกียร์อัตโนมัติหรือเปลี่ยนชุดคลัตช์ 2) งานซ่อมแซมระบบเบรก ABS คาลิปเปอร์รั่ว 3) งานปรับตั้งแกนล้อและศูนย์ถ่วงล้อ 4) การซ่อมกล่อง ECU และระบบสายไฟเดินเครื่องยนต์หลัก 5) งานแอร์รถยนต์ที่ต้องดูดและเติมน้ำยาระบบปิด และ 6) งานตัวถังที่กระทบโครงสร้างหลักนิรภัยเนื่องจากการลงมือทำเองผิดวิธีอาจส่งผลร้ายแรงต่ออุบัติเหตุได้"
          />
          <FAQItem
            q="4. เครื่องมือช่าง (Tooling Cost) ที่ซื้อมา มีวิธีคิดจุดคุ้มทุนอย่างไร?"
            a="เมื่อคุณเริ่มทำ DIY ซ่อมรถครั้งแรก คุณมักต้องซื้อชุดประแจ ชุดแม่แรง หรือเครื่องมือเฉพาะด้าน ซึ่งทำให้งบแรกเริ่มสูงเกือบเท่าจ้างอู่ อย่างไรก็ตาม จุดเด่นที่สำคัญของการทำ DIY คือ 'เครื่องมือเหล่านั้นจะอยู่ติดตัวคุณตลอดไป' และสามารถนำไปใช้ในการซ่อมครั้งที่สอง สาม หรือสี่โดยไม่มีต้นทุนเพิ่มอีก ดังนั้นหากเครื่องมือชิ้นนั้นนำกลับมาใช้ซ้ำได้บ่อย การลงทุนซื้อในครั้งแรกจึงถือเป็นสินทรัพย์ถาวรที่คุ้มค่าในระยะยาว"
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// ==========================================
// 5. CarPaintingCost
// ==========================================
export function CarPaintingCost({ lang }: any) {
  const [carSize, setCarSize] = useLocalState("paint_car_size", "medium");
  const [paintQuality, setPaintQuality] = useLocalState("paint_quality", "premium");
  const [resprayType, setResprayType] = useLocalState("paint_type", "panel");
  const [numPanels, setNumPanels] = useLocalState("paint_panels", "1");

  const pCount = parseInt(numPanels) || 1;
  const isTH = lang === "TH";

  // Base rates definition
  const baseRates: Record<string, { panel: number; exterior: number; full: number }> = {
    small: { panel: 1800, exterior: 16000, full: 24000 },
    medium: { panel: 2200, exterior: 20000, full: 30000 },
    large: { panel: 2600, exterior: 25000, full: 36000 },
    pickup: { panel: 2400, exterior: 22000, full: 33000 },
  };

  const qualityMultiplier: Record<string, number> = {
    standard: 0.9,
    premium: 1.2,
    ceramic: 1.6,
  };

  const activeRates = baseRates[carSize] || baseRates.medium;
  const activeMult = qualityMultiplier[paintQuality] || 1.2;

  let calculatedBase = 0;
  if (resprayType === "panel") {
    calculatedBase = activeRates.panel * pCount;
  } else if (resprayType === "exterior") {
    calculatedBase = activeRates.exterior;
  } else {
    calculatedBase = activeRates.full;
  }

  const finalCost = calculatedBase * activeMult;
  const rangeLow = finalCost * 0.9;
  const rangeHigh = finalCost * 1.15;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10 p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-2xl">
            <Car className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {isTH ? "คำนวณราคาพ่นสีรถยนต์" : "Car Painting Cost Estimator"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {isTH ? "ประมาณราคาก่อนส่งอู่พ่นสี ทั้งแบบซ่อมเคลมรายชิ้นและสาดสีทั้งคัน" : "Estimate vehicle respray budgets by size and paint specifications"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className={labelClass}>{isTH ? "ขนาดของตัวรถ" : "Vehicle Size"}</label>
              <select
                value={carSize}
                onChange={(e) => setCarSize(e.target.value)}
                className={inputClass}
              >
                <option value="small">{isTH ? "เล็ก (เช่น Yaris, Jazz, Eco-Car)" : "Small / Eco Car"}</option>
                <option value="medium">{isTH ? "กลาง (เช่น Civic, Altis, Mazda 3)" : "Medium / Sedan"}</option>
                <option value="large">{isTH ? "ใหญ่ (เช่น Camry, CR-V, SUV)" : "Large / D-Segment & SUV"}</option>
                <option value="pickup">{isTH ? "กระบะ / Pick-up (แคป / 4 ประตู)" : "Pick-up Truck"}</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>{isTH ? "รูปแบบการพ่นสี" : "Respray Method"}</label>
              <select
                value={resprayType}
                onChange={(e) => setResprayType(e.target.value)}
                className={inputClass}
              >
                <option value="panel">{isTH ? "พ่นเฉพาะจุด / เป็นรายชิ้น" : "Panel-by-panel"}</option>
                <option value="exterior">{isTH ? "พ่นสีภายนอกทั้งคัน (สาดสีเดิม)" : "Exterior Only (Full Body)"}</option>
                <option value="full">{isTH ? "พ่นใน-นอก รื้อเบาะพ่นกลับสี" : "Full Body (Inside & Out / Color Change)"}</option>
              </select>
            </div>

            {resprayType === "panel" && (
              <div>
                <label className={labelClass}>{isTH ? "จำนวนชิ้นส่วนที่จะพ่น (ชิ้น)" : "Number of Panels to Paint"}</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={numPanels}
                  onChange={(e) => setNumPanels(e.target.value)}
                  className={inputClass}
                />
              </div>
            )}

            <div>
              <label className={labelClass}>{isTH ? "เกรดและคุณภาพสี" : "Paint Grade & Quality"}</label>
              <select
                value={paintQuality}
                onChange={(e) => setPaintQuality(e.target.value)}
                className={inputClass}
              >
                <option value="standard">{isTH ? "เกรดทั่วไป (สี 2K แบรนด์ทั่วไป เน้นประหยัด)" : "Standard 2K (Economy)"}</option>
                <option value="premium">{isTH ? "เกรดแบรนด์ยุโรป (Dupont/Glasurit ทนทานสูง)" : "Premium 2K (Glasurit / OEM Spec)"}</option>
                <option value="ceramic">{isTH ? "พ่นแลกเกอร์เซรามิก (กันรอยขีดข่วน เงางามพิเศษ)" : "Ceramic Clear Coat (Scratch Resistant)"}</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div id="paint-cost-result" className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {isTH ? "ราคาประมาณการจากท้องตลาด" : "Estimated Price Range"}
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "ชิ้นส่วนหลักที่เลือก" : "Respray Type"}</span>
                  <span className="font-bold text-gray-950 dark:text-white">
                    {resprayType === "panel" ? `${isTH ? "จำนวน " : ""}${pCount}${isTH ? " ชิ้น" : " panels"}` : (resprayType === "exterior" ? (isTH ? "ภายนอกทั้งคัน" : "Exterior Only") : (isTH ? "นอก-ใน รื้อพ่นกลับสี" : "Full Change"))}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "ระดับคุณภาพของชั้นสี" : "Selected Grade"}</span>
                  <span className="font-bold text-gray-950 dark:text-white">
                    {paintQuality === "standard" ? (isTH ? "ประหยัด (2K)" : "Economy") : (paintQuality === "premium" ? (isTH ? "พรีเมียมยุโรป" : "Premium OEM") : (isTH ? "แลกเกอร์เซรามิกเงาพิเศษ" : "Ceramic Coating"))}
                  </span>
                </div>

                <div className="p-5 rounded-2xl mt-4 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-white/5 text-center">
                  <span className="block text-xs text-gray-400 dark:text-gray-500 mb-1">
                    {isTH ? "ช่วงราคาค่าบริการโดยประมาณ" : "Estimated Total Budget"}
                  </span>
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 block mb-1">
                    {rangeLow.toLocaleString(undefined, {maximumFractionDigits: 0})} - {rangeHigh.toLocaleString(undefined, {maximumFractionDigits: 0})} บาท
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">
                    {isTH ? "* รวมขั้นตอนขัดเตรียมผิวลบรอยขีดข่วนเบื้องต้นแล้ว" : "* Includes surface preparation and minor scratch correction."}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ExportResult elementId="paint-cost-result" fileName="car-painting-cost-result" lang={lang} />
            </div>
          </div>
        </div>

        <CalculationSteps
          title={isTH ? "โครงสร้างการประเมินราคาพ่นสีรถ" : "Pricing Structure"}
          steps={isTH ? [
            "ประเมินตามขนาดรถ: ตัวรถที่ใหญ่ขึ้นหมายถึงปริมาณสีเคลือบเงาที่ต้องใช้มากขึ้น และพื้นที่ขัดเตรียมงานที่เพิ่มขึ้น",
            "คิดตามประเภทพ่น: การพ่นเป็นชิ้น (เช่น บังโคลน กันชน) จะมีอัตราเฉลี่ยต่อชิ้นคงที่ ส่วนการกลับสีภายนอก-ภายในจะมีขั้นตอนรื้อถอดประตู ฝากระโปรง และเครื่องยนต์ซึ่งต้องใช้ช่างชำนาญการทำให้ค่าแรงพุ่งสูง",
            "ตัวคูณคุณภาพสี: สีเกรดทั่วไปมีเนื้อสีบางกว่าและหมองเร็วกว่า ส่วนแบรนด์สีชั้นนำ เช่น Glasurit หรือระบบ 2K แท้แบบแห้งช้าจะทำให้ราคาสูงขึ้น",
            "การคำนวณเบื้องต้นนี้คือการประเมินราคาอู่สีมาตรฐาน ไม่รวมกรณีตัวถังเดิมพุ มีสนิมลึก หรือเคยเกิดอุบัติเหตุชนหนักยุบตัวซึ่งต้องมีค่าเคาะดึงชิ้นงานเพิ่ม"
          ] : [
            "Size Calculation: Larger vehicles consume more primers, basecoats, and clearcoats.",
            "Method Type: Painting single parts has static pricing, whereas a color-change respray requires intensive labor to dismantle doors, engine bay, and interiors.",
            "Quality Multiplier: Standard paints cost less but degrade faster; slow-cure premium European paints or ceramic clearcoats yield a higher price.",
            "Exclusions: Estimates do not include deep rust remediation, custom body kit fabrication, or heavy frame pulling."
          ]}
        />

        <SEOFAQ title={isTH ? "ไขข้อข้องใจเรื่องทำสีรถยนต์และคำถามที่พบบ่อย" : "Car Painting FAQs"}>
          <FAQItem
            q="1. สีรถยนต์แบบ 2K และ 1K ต่างกันอย่างไร?"
            a="สี 1K คือสีแห้งเร็วที่ทำงานด้วยการระเหยของทินเนอร์เพียงอย่างเดียว เมื่อทินเนอร์หมดไปสีจะแห้ง แต่ความแข็งแรง ทนทาน และแรงยึดเกาะต่ำมาก ปัจจุบันนิยมใช้พ่นซ่อมชั่วคราวเท่านั้น ส่วนสี 2K (Two-Component) คือสีพ่นมาตรฐานสูงที่แห้งตัวด้วยปฏิกิริยาทางเคมีระหว่างเนื้อสีกับสารเร่งปฏิกิริยา (Hardener/Catalyst) ทำให้เกิดฟิล์มสีที่เหนียว แข็งแกร่ง ทนความร้อน รอยขีดข่วน แสงแดด และกรดจากมูลนกได้ดีเยี่ยมยาวนานหลายปี"
          />
          <FAQItem
            q="2. ทำไมอู่ทำสีรถยนต์บางที่ราคาถูก บางที่ราคาแพงมาก?"
            a="ความแตกต่างของราคาเกิดจาก 3 ปัจจัยหลัก: 1) เกรดวัสดุเคมี เช่น ยี่ห้อของสีรองพื้น เนื้อสีชั้นกลาง แลคเกอร์ และทินเนอร์ที่ผสม 2) ฝีมือการเตรียมพื้นผิว หากอู่ลอกสีเดิมออกจนถึงเหล็ก ขัดแต่งโป๊วอย่างละเอียด จะให้ชิ้นงานที่เรียบเนียนยาวนานไม่ปูดพอง 3) ห้องอบสีมาตรฐาน อู่ราคาถูกมักพ่นสีกลางแจ้งทำให้มีฝุ่นเกาะและชั้นแลคเกอร์ด้านไว ส่วนอู่มาตรฐานจะมีห้องอบระบบปิดป้องกันฝุ่นและควบคุมความชื้นความร้อนขณะอบสี"
          />
          <FAQItem
            q="3. ขั้นตอนการพ่นสีแบบสาดภายนอก กับ รื้อพ่นกลับสี ต่างกันอย่างไร?"
            a="การสาดสีภายนอก (Exterior Respray) คือการขัดเตรียมผิวภายนอกและปิดเทปกาวจุดที่ไม่พ่น เช่น ขอบยาง กระจก จากนั้นจึงพ่นสีทับผิวเดิม เหมาะสำหรับเปลี่ยนสีเดิมที่โทรมให้สดใหม่ ส่วนการรื้อพ่นกลับสี (Full Color Change) คือการรื้อถอดอุปกรณ์ในห้องโดยสาร ห้องเครื่อง ประตู ฝากระโปรงออกทั้งหมด เพื่อให้สอดส่องพ่นสีได้ทุกซอกมุมของโครงสร้างเดิม วิธีนี้ให้ชิ้นงานที่เนียนเหมือนรถออกจากโรงงาน แต่ต้องใช้ฝีมือการรื้อประกอบสูงเพื่อไม่ให้เกิดเสียงก๊อกแก๊กในรถภายหลัง"
          />
          <FAQItem
            q="4. พ่นแลกเกอร์เซรามิก (Ceramic Clear Coat) มีประโยชน์อย่างไร คุ้มค่าไหม?"
            a="แลคเกอร์เซรามิก คือแลคเกอร์เกรดพิเศษสุดที่มีอนุภาคนาโนเซรามิกผสมอยู่ ช่วยให้ฟิล์มเคลือบหน้าสุดมีค่าความแข็งเหนียวที่สูงมาก ทำให้ทนทานต่อการขีดข่วนจากเศษดิน หิน ขนแมว หรือรอยจากการล้างรถได้ดีกว่าแลคเกอร์ทั่วไป 3-5 เท่า ทั้งยังรักษาระดับความเงาฉ่ำประกายได้ยาวนานเป็นทศวรรษ เหมาะอย่างยิ่งสำหรับผู้ที่ใช้รถสีดำ สีเข้ม หรือต้องการปกป้องสีรถอย่างดีที่สุด"
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// ==========================================
// 6. HomeAdditionCost
// ==========================================
export function HomeAdditionCost({ lang }: any) {
  const [additionArea, setAdditionArea] = useLocalState("addition_area", "15");
  const [additionType, setAdditionType] = useLocalState("addition_type", "kitchen");
  const [pileType, setPileType] = useLocalState("addition_pile", "micro");
  const [finishingGrade, setFinishingGrade] = useLocalState("addition_grade", "premium");

  const area = parseFloat(additionArea) || 0;
  const isTH = lang === "TH";

  // Configuration factors
  const pileBaseRates: Record<string, number> = {
    slab: 8000,
    sixMeter: 12500,
    micro: 18500,
  };

  const typeMultipliers: Record<string, number> = {
    kitchen: 1.35,  // counter, plumbing, gas, exhaust
    room: 1.10,     // walls, windows, electricity
    garage: 0.85,    // columns, concrete floor, light roofing
    deck: 0.65,      // lightweight patio, tile/wood flooring
  };

  const gradeMultipliers: Record<string, number> = {
    standard: 0.9,
    premium: 1.25,
    luxury: 1.75,
  };

  const baseRate = pileBaseRates[pileType] || 12500;
  const typeMult = typeMultipliers[additionType] || 1.10;
  const gradeMult = gradeMultipliers[finishingGrade] || 1.25;

  const totalEstimate = area * baseRate * typeMult * gradeMult;

  // Breakdown percentages
  const foundationShare = 0.28;
  const structureShare = 0.35;
  const wallFloorShare = 0.18;
  const utilityShare = 0.10;
  const finishingShare = 0.09;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10 p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl">
            <Home className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {isTH ? "คำนวณค่าต่อเติมบ้าน" : "Home Addition Cost Estimator"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {isTH ? "ประเมินค่าวัสดุและค่าแรงในการต่อเติมครัวหลังบ้าน โรงรถ หรือห้องอเนกประสงค์" : "Estimate structural, foundation, and finishing costs for house extensions"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className={labelClass}>{isTH ? "พื้นที่ส่วนต่อเติม (ตารางเมตร)" : "Addition Area (sq.m.)"}</label>
              <input
                type="number"
                value={additionArea}
                onChange={(e) => setAdditionArea(e.target.value)}
                className={inputClass}
                placeholder="เช่น 15"
              />
            </div>

            <div>
              <label className={labelClass}>{isTH ? "รูปแบบการใช้งาน" : "Extension Type"}</label>
              <select
                value={additionType}
                onChange={(e) => setAdditionType(e.target.value)}
                className={inputClass}
              >
                <option value="kitchen">{isTH ? "ห้องครัวไทยหลังบ้าน (มีปูกระเบื้อง ท่อน้ำทิ้ง เตา)" : "Thai Wet Kitchen"}</option>
                <option value="room">{isTH ? "ห้องนอน / ห้องนั่งเล่น เพิ่มเติม" : "Living/Bedroom"}</option>
                <option value="garage">{isTH ? "โรงจอดรถ / หลังคาคลุมรถ" : "Garage / Carport"}</option>
                <option value="deck">{isTH ? "เฉลียงระเบียงนั่งเล่นนอกบ้าน" : "Open Terrace / Deck"}</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>{isTH ? "ประเภทของฐานรากเสาเข็ม" : "Foundation & Piling Type"}</label>
              <select
                value={pileType}
                onChange={(e) => setPileType(e.target.value)}
                className={inputClass}
              >
                <option value="micro">{isTH ? "เข็มไมโครไพล์ (เหล็ก/คอนกรีตสปัน - เจาะลึก ทรุดน้อยที่สุด)" : "Spun Micropile (Deep, Minimal Sinking)"}</option>
                <option value="sixMeter">{isTH ? "เข็มกลุ่ม 6 เมตร (เข็มสั้นตัวไอ - ทรุดตามดินกทม.)" : "6m I-Shape Group Pile (Medium Sinking)"}</option>
                <option value="slab">{isTH ? "เทคอนกรีตวางบนพื้นตรง (Slab-on-ground - โครงสร้างมีโอกาสทรุดแยก)" : "Slab-on-ground (No Piles - Sinks with Soil)"}</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>{isTH ? "เกรดวัสดุและงานตกแต่งภายใน" : "Finishing Grade"}</label>
              <select
                value={finishingGrade}
                onChange={(e) => setFinishingGrade(e.target.value)}
                className={inputClass}
              >
                <option value="standard">{isTH ? "เกรดประหยัด (เน้นใช้งานทั่วไป วัสดุมาตรฐาน)" : "Economy / Standard"}</option>
                <option value="premium">{isTH ? "เกรดพรีเมียม (วัสดุแบรนด์ดัง ผนังสองชั้น ฝ้าหลุม)" : "Premium / Mid-High"}</option>
                <option value="luxury">{isTH ? "เกรดพรีเมียมหรู (ท็อปหินควอตซ์/แกรนิต ระบบไฟสมาร์ต)" : "Luxury / High-End"}</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div id="addition-cost-result" className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {isTH ? "ประมาณการงบประมาณรวม" : "Budget Estimate Summary"}
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-white/5 text-center">
                  <span className="block text-xs text-gray-400 dark:text-gray-500 mb-1">
                    {isTH ? "ประมาณการค่าใช้จ่ายสุทธิ" : "Total Estimated Budget"}
                  </span>
                  <span className="text-3xl font-black text-amber-600 dark:text-amber-400">
                    {totalEstimate.toLocaleString(undefined, {maximumFractionDigits: 0})} บาท
                  </span>
                  <span className="block text-[10px] text-gray-400 mt-2">
                    {isTH ? `(คิดเป็นเฉลี่ยประมาณ ${(totalEstimate / (area || 1)).toLocaleString(undefined, {maximumFractionDigits: 0})} บาท / ตร.ม.)` : `(Average rate: ${(totalEstimate / (area || 1)).toLocaleString(undefined, {maximumFractionDigits: 0})} THB/sq.m.)`}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <h4 className="font-bold text-gray-700 dark:text-gray-300">{isTH ? "สัดส่วนงบประมาณแบ่งตามหมวดหมู่:" : "Estimated Cost Breakdown:"}</h4>
                  <div className="flex justify-between py-1 border-b border-gray-200/50 dark:border-white/5 text-gray-500 dark:text-gray-400">
                    <span>{isTH ? "งานเสาเข็มและดิน (28%)" : "Piles & Foundation"}</span>
                    <span className="font-bold text-gray-950 dark:text-white">{(totalEstimate * foundationShare).toLocaleString(undefined, {maximumFractionDigits: 0})} บาท</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200/50 dark:border-white/5 text-gray-500 dark:text-gray-400">
                    <span>{isTH ? "โครงสร้างเหล็ก/ปูนและหลังคา (35%)" : "Structure & Roofing"}</span>
                    <span className="font-bold text-gray-950 dark:text-white">{(totalEstimate * structureShare).toLocaleString(undefined, {maximumFractionDigits: 0})} บาท</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200/50 dark:border-white/5 text-gray-500 dark:text-gray-400">
                    <span>{isTH ? "ผนัง ประตู หน้าต่าง และพื้น (18%)" : "Walls, Doors & Flooring"}</span>
                    <span className="font-bold text-gray-950 dark:text-white">{(totalEstimate * wallFloorShare).toLocaleString(undefined, {maximumFractionDigits: 0})} บาท</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200/50 dark:border-white/5 text-gray-500 dark:text-gray-400">
                    <span>{isTH ? "ระบบประปา สุขาภิบาล ไฟฟ้า (10%)" : "Plumbing & Electrical"}</span>
                    <span className="font-bold text-gray-950 dark:text-white">{(totalEstimate * utilityShare).toLocaleString(undefined, {maximumFractionDigits: 0})} บาท</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200/50 dark:border-white/5 text-gray-500 dark:text-gray-400">
                    <span>{isTH ? "งานสีและสถาปัตยกรรม (9%)" : "Painting & Finishes"}</span>
                    <span className="font-bold text-gray-950 dark:text-white">{(totalEstimate * finishingShare).toLocaleString(undefined, {maximumFractionDigits: 0})} บาท</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ExportResult elementId="addition-cost-result" fileName="home-addition-cost-result" lang={lang} />
            </div>
          </div>
        </div>

        <CalculationSteps
          title={isTH ? "ขั้นตอนและโครงสร้างการต่อเติม" : "Construction Stages"}
          steps={isTH ? [
            "เลือกเสาเข็มที่เหมาะกับพื้นที่: เข็มไมโครไพล์เจาะลึกประมาณ 18-21 เมตรถึงชั้นดินเหนียวแข็ง (ทราย) ป้องกันโครงสร้างใหม่ทรุดตัวแยกออกจากตัวบ้านเดิม",
            "คูณตามฟังก์ชันการใช้งาน: งานครัวใช้น้ำเยอะ มีเตาหนัก และควันอาหาร จึงต้องการการติดตั้งเคาน์เตอร์ ระบบระบายน้ำเสีย และเครื่องดูดควัน ทำให้ราคาต่อตารางเมตรสูงกว่าห้องนอนที่เป็นงานผนังทึบธรรมดา",
            "การคำนวณข้างต้นเป็นประมาณการโดยอ้างอิงราคาตลาดรับเหมาของไทยปีล่าสุด ค่านี้นับเป็นราคาเริ่มต้น และไม่รวมกรณีงานรื้อถอนต้นไม้เดิมขนาดใหญ่ การซ่อมท่อน้ำทิ้งใต้ดิน หรือข้อกำหนดกฎหมายพิเศษในบางพื้นที่"
          ] : [
            "Piling Type Selection: Micro-piles penetrate 18-21 meters into the load-bearing sand layer, yielding the lowest differential settlement.",
            "Function Multiplier: Kitchens require gas plumbing, ventilation hoods, robust drainage, and heavy work counters, resulting in higher per-square-meter rates than standard dry bedrooms.",
            "Exclusions: Budget estimates assume a clean site, and exclude structural demolition, clearing large trees, or structural repairs to the main building."
          ]}
        />

        <SEOFAQ title={isTH ? "ข้อแนะนำการต่อเติมบ้านอย่างปลอดภัยไม่ให้ทรุดร้าว" : "Home Addition FAQs"}>
          <FAQItem
            q="1. ปัญหาการต่อเติมบ้านแล้วทรุดร้าวแยกตัว เกิดจากอะไร และแก้ไขอย่างไร?"
            a="การร้าวแยกตัวเกิดจากดินทรุดตัวไม่เท่ากัน (Differential Settlement) ระหว่างโครงสร้างบ้านเดิมซึ่งมักจะตอกเสาเข็มลึกถึงชั้นดินแข็ง (ประมาณ 18-21 เมตร) กับส่วนต่อเติมใหม่ที่หากช่างตอกเพียงเสาเข็มสั้น 6 เมตร หรือไม่ใส่เสาเข็มเลย ส่วนใหม่จะทรุดลงอย่างรวดเร็ว (ดินกทม. ทรุดเฉลี่ย 1-2 ซม. ต่อปี) วิธีป้องกันคือ: 1) ใช้เสาเข็มไมโครไพล์กดลึกเท่าตัวบ้านเดิม 2) หากจำเป็นต้องใช้เข็มสั้น ต้องตัดข้อต่อโครงสร้างระหว่างตัวบ้านเดิมและส่วนต่อเติมออกจากกันเด็ดขาด (Joint) โดยอุดด้วยวัสดุประเภทยืดหยุ่น เช่น PU Sealant ห้ามฝากคานเชื่อมระหว่างสองส่วนร่วมกัน"
          />
          <FAQItem
            q="2. เสาเข็มไมโครไพล์ (Micropile) ทำไมถึงเป็นตัวเลือกที่ดีที่สุดสำหรับการต่อเติม?"
            a="เสาเข็มไมโครไพล์มีลักษณะเป็นท่อนสั้นนำมาเชื่อมต่อกันขณะตอก สามารถใช้เครื่องจักรขนาดเล็กหรือปั้นจั่นขนาดพกพาขับเคลื่อนเข้ามาทำในพื้นที่จำกัดได้ เช่น บริเวณซอกแคบหลังบ้าน โดยไม่ทำให้เกิดแรงสั่นสะเทือนรบกวนบ้านข้างเคียงจนกำแพงพังเสียหาย และสามารถตอกลงไปลึกจนสุดที่ชั้นทรายเหนียว (ชั้นเดียวกับฐานรากหลักของบ้านเดี่ยว) ทำให้โครงสร้างต่อเติมใหม่ไม่มีทางทรุดตัวเร็วเหมือนดินรอบนอก"
          />
          <FAQItem
            q="3. ข้อกำหนดทางกฎหมายที่ต้องรู้เกี่ยวกับการต่อเติมบ้านมีอะไรบ้าง?"
            a="พระราชบัญญัติควบคุมอาคาร พ.ศ. 2522 กำหนดให้การก่อสร้างต่อเติมมีกฎระยะถอยร่นที่ชัดเจน: 1) ผนังที่มีหน้าต่างหรือช่องแสงใดๆ ต้องห่างจากแนวเขตที่ดินบ้านข้างเคียงไม่น้อยกว่า 2 เมตร 2) ผนังทึบต้องห่างจากแนวเขตไม่น้อยกว่า 50 ซม. (แต่สามารถชิดเขตได้หากมีหนังสือยินยอมเป็นลายลักษณ์อักษรจากเพื่อนบ้าน) 3) ต้องมีสัดส่วนพื้นที่ว่างสีเขียวไม่ต่ำกว่าเกณฑ์ของเทศบาลกำหนด เพื่อความปลอดภัยจากการลุกลามของอัคคีภัย"
          />
          <FAQItem
            q="4. การต่อเติมแบบ Slab-on-ground เหมาะกับโครงสร้างรูปแบบใด?"
            a="โครงสร้างระบบ Slab-on-ground หรือเทพื้นคอนกรีตวางตรงกับแผ่นดินรอบตัวบ้านโดยไม่มีเสาเข็มรองรับแรงดึงใดๆ เหมาะสำหรับการทำพื้นลานภายนอกที่จอดรถลานปูกลางแจ้ง หรือระเบียงนั่งเล่นน้ำหนักเบาที่ไม่มีหลังคาเชื่อมยึดกับผนังบ้าน การใช้โครงสร้างนี้สำหรับงานครัวทึบมุงหลังคาหนาเป็นอันตรายอย่างยิ่ง เพราะน้ำหนักตัวผนังจะทำให้แผ่นพื้นเอียงทรุดดึงเอากำแพงหลักทรุดแตกร้าวอย่างรุนแรง"
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// ==========================================
// 7. WaterFilterSizing
// ==========================================
export function WaterFilterSizing({ lang }: any) {
  const [peopleCount, setPeopleCount] = useLocalState("water_people", "4");
  const [usageType, setUsageType] = useLocalState("water_usage_type", "drinking");
  const [waterSource, setWaterSource] = useLocalState("water_source", "tap");

  const people = parseInt(peopleCount) || 1;
  const isTH = lang === "TH";

  // Standard domestic water usage specs in Thailand:
  // Drinking: 3 L/person/day
  // Whole-house: 180 L/person/day
  const factor = usageType === "drinking" ? 3 : 180;
  const rawNeed = people * factor;
  const totalNeedWithMargin = rawNeed * 1.25; // 25% safety margin

  // Recommendations logic
  let techRecommend = "";
  let sizeRecommend = "";
  let maintenanceTip = "";

  if (usageType === "drinking") {
    if (waterSource === "tap") {
      techRecommend = isTH 
        ? "ระบบ Ultra Filtration (UF) หรือระบบ Reverse Osmosis (RO) แบบ 5 ขั้นตอน" 
        : "5-Stage Ultra Filtration (UF) or Reverse Osmosis (RO) system";
      sizeRecommend = isTH 
        ? "เมมเบรนขนาดกำลังผลิต 50-75 GPD (แกลลอนต่อวัน) พร้อมถังแรงดันสำรอง" 
        : "50-75 GPD (Gallons Per Day) Membrane with pressurized storage tank";
      maintenanceTip = isTH 
        ? "เปลี่ยนไส้กรองหยาบ (PP) และคาร์บอน (Carbon) ทุกๆ 3-6 เดือน เมมเบรนทุก 1-2 ปี" 
        : "Replace PP sediment & carbon block pre-filters every 3-6 months, Membrane every 12-24 months.";
    } else {
      techRecommend = isTH 
        ? "ระบบ Reverse Osmosis (RO) ร่วมกับสารกรอง Resin เพื่อลดหินปูนและความกระด้าง" 
        : "Reverse Osmosis (RO) combined with a resin softener pre-filter";
      sizeRecommend = isTH 
        ? "เมมเบรนขนาด 100 GPD ขึ้นไป เพื่อป้องกันการอุดตันเร็วจากสารละลายในน้ำบาดาล" 
        : "100+ GPD membrane to handle higher Total Dissolved Solids (TDS)";
      maintenanceTip = isTH 
        ? "ล้างเกลือเรซิ่นทุกเดือน เปลี่ยนสารกรองหยาบทุก 2-3 เดือนเนื่องจากน้ำบาดาลมีตะกอนสูง" 
        : "Regenerate resin with brine solution monthly; replace pre-filters every 2-3 months due to heavy sediment.";
    }
  } else {
    // Whole house utility water
    if (waterSource === "tap") {
      techRecommend = isTH 
        ? "ถังกรองสารกลุ่ม Activated Carbon + Sediment PP Filter (บิ๊กบลู 10 หรือ 20 นิ้ว)" 
        : "Activated Carbon Vessel + Big Blue Sediment Filter (10\" or 20\")";
      sizeRecommend = isTH 
        ? "ถังไฟเบอร์กลาส (FRP) ขนาด 8x44 นิ้ว หรือ 10x54 นิ้ว พร้อมวาล์วล้างกึ่งอัตโนมัติ" 
        : "FRP Vessel size 8\"x44\" or 10\"x54\" depending on peak flow rate";
      maintenanceTip = isTH 
        ? "ทำความสะอาด Backwash ล้างย้อนสารคาร์บอนทุกๆ 1-2 สัปดาห์ และเปลี่ยนสารกรองทุก 1-2 ปี" 
        : "Perform Backwash on the carbon media every 1-2 weeks; replace carbon media every 1-2 years.";
    } else {
      techRecommend = isTH 
        ? "ถังกรองมัลติมีเดีย (ทราย, แมงกานีสกำจัดเหล็ก) ร่วมกับถังกรองเรซิ่นลดตะกรัน" 
        : "Multi-media filter (Sand + Manganese for Iron) followed by a Resin softener";
      sizeRecommend = isTH 
        ? "ถังคู่ไฟเบอร์กลาส (FRP) ขนาด 10x54 นิ้ว จ่ายน้ำต่อเนื่องด้วยอัตราไหล 1,000-1,500 ลิตร/ชม." 
        : "Dual FRP 10\"x54\" columns, supporting flow rate of 1,000 - 1,500 Liters/hour";
      maintenanceTip = isTH 
        ? "ต้องล้างย้อน Backwash และใช้น้ำเกลือล้างฟื้นสภาพเรซิ่นสัปดาห์ละหนึ่งครั้ง" 
        : "Requires weekly backwashing of Manganese media and brine regeneration of Resin.";
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10 p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl">
            <Droplets className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {isTH ? "คำนวณขนาดเครื่องกรองน้ำ" : "Water Filter Sizing Calculator"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {isTH ? "ประเมินปริมาณการใช้น้ำของครอบครัวและเทคโนโลยีสารกรองน้ำที่ตอบโจทย์" : "Determine water consumption needs and matching filtration system specs"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className={labelClass}>{isTH ? "จำนวนสมาชิกผู้อยู่อาศัย (คน)" : "Household Size (People)"}</label>
              <input
                type="number"
                min="1"
                max="50"
                value={peopleCount}
                onChange={(e) => setPeopleCount(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>{isTH ? "ประเภทการใช้งานน้ำกรอง" : "Filtration Objective"}</label>
              <select
                value={usageType}
                onChange={(e) => setUsageType(e.target.value)}
                className={inputClass}
              >
                <option value="drinking">{isTH ? "น้ำกรองบริโภค (ดื่ม ปรุงอาหาร)" : "Drinking & Cooking Water"}</option>
                <option value="wholehouse">{isTH ? "น้ำกรองใช้ทั้งบ้าน (อาบ ซักผ้า อุปโภค)" : "Whole-House Utility Water"}</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>{isTH ? "แหล่งน้ำดิบเริ่มต้น" : "Source Water Type"}</label>
              <select
                value={waterSource}
                onChange={(e) => setWaterSource(e.target.value)}
                className={inputClass}
              >
                <option value="tap">{isTH ? "น้ำประปาเมือง (มีคลอรีน ตะกอนแขวนลอยน้อย)" : "Municipal Tap Water"}</option>
                <option value="ground">{isTH ? "น้ำบาดาล / น้ำบ่อส่วนตัว (หินปูน กลิ่น สนิมเหล็กสูง)" : "Well / Underground Water"}</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div id="water-filter-result" className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {isTH ? "สเปกเครื่องกรองน้ำแนะนำ" : "Sizing & Tech Specifications"}
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "ปริมาณน้ำใช้ต่อวัน" : "Daily Water Needs"}</span>
                  <span className="font-bold text-gray-950 dark:text-white">{rawNeed.toLocaleString()} {isTH ? "ลิตร" : "Liters"}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "ขนาดผลิตแนะนำเผื่อสำรอง" : "Recommended Flow Capacity"}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{totalNeedWithMargin.toFixed(0)} {isTH ? "ลิตร/วัน" : "L/day"}</span>
                </div>

                <div className="p-4 rounded-xl mt-4 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-white/5">
                  <span className="block text-xs text-gray-400 dark:text-gray-500 mb-1">
                    {isTH ? "เทคโนโลยีการกรองที่เหมาะสม" : "Recommended Technology"}
                  </span>
                  <span className="text-sm font-extrabold text-gray-950 dark:text-white leading-tight block">
                    {techRecommend}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-white/5">
                  <span className="block text-xs text-gray-400 dark:text-gray-500 mb-1">
                    {isTH ? "ขนาดตัวเรือน/เมมเบรนที่แนะนำ" : "Recommended Vessel / Membrane Size"}
                  </span>
                  <span className="text-sm font-bold text-gray-950 dark:text-white block">
                    {sizeRecommend}
                  </span>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-xs text-blue-800 dark:text-blue-200 rounded-xl">
                  <strong>{isTH ? "ข้อแนะนำการดูแลรักษา: " : "Maintenance Tip: "}</strong> {maintenanceTip}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ExportResult elementId="water-filter-result" fileName="water-filter-sizing-result" lang={lang} />
            </div>
          </div>
        </div>

        <CalculationSteps
          title={isTH ? "เกณฑ์การประมาณการระบบกรองน้ำ" : "Sizing Parameters"}
          steps={isTH ? [
            "ประมาณความต้องการใช้น้ำรายวัน: น้ำดื่มคิดอัตราเฉลี่ย 3 ลิตร/คน/วัน, น้ำใช้ทั่วไปอิงสถิติการประปานครหลวงที่ 180 ลิตร/คน/วัน",
            "เผื่อสัมประสิทธิ์ความปลอดภัย 1.25 เพื่อรับรองปริมาณการใช้งานช่วงที่มีกิจกรรมหนาแน่นหรือรองรับแขกผู้มาเยือน",
            "วิเคราะห์สารปนเปื้อนในน้ำดิบ: น้ำประปามีการบำบัดฆ่าเชื้อด้วยคลอรีนเน้นการกรองคาร์บอนกำจัดกลิ่นสารอินทรีย์เคมี ส่วนน้ำบาดาลมักมีตะกอนดินเหนียว สนิมเหล็ก และหินปูนสูง จึงต้องใช้สารกรองเรซิ่นล้างความแข็งกระด้างร่วมด้วย"
          ] : [
            "Estimate daily requirements: 3 liters/person/day for consumption, 180 liters/person/day for domestic utility.",
            "Apply a 1.25 safety factor to size the membrane/vessels for peak usage times.",
            "Water Source Evaluation: Municipal tap water requires carbon to clear chlorine and chemical odor. Well water contains high levels of dissolved iron, lime, and silt, requiring manganese and resin softener media."
          ]}
        />

        <SEOFAQ title={isTH ? "แนวทางการเลือกเครื่องกรองน้ำเพื่อสุขภาพและความปลอดภัยในบ้าน" : "Water Filtration FAQs"}>
          <FAQItem
            q="1. ระบบกรองน้ำแบบ RO และ UF ต่างกันอย่างไร เลือกแบบไหนดี?"
            a="1) ระบบ Reverse Osmosis (RO) มีความละเอียดในการกรองสูงที่สุดถึง 0.0001 ไมครอน สามารถกรองสารละลาย แบคทีเรีย ไวรัส โลหะหนัก และเกลือแร่ต่างๆ ออกจนหมด ได้น้ำสะอาดบริสุทธิ์เกือบ 100% เหมาะกับพื้นที่ที่น้ำประปาเค็ม น้ำกร่อย หรือน้ำบาดาล 2) ระบบ Ultra Filtration (UF) มีความละเอียดประมาณ 0.01 ไมครอน กรองสิ่งสกปรกและเชื้อโรคได้ดีแต่ไม่กรองเอาเกลือแร่ตามธรรมชาติออก น้ำที่ได้จึงยังมีแร่ธาตุหลงเหลืออยู่ ระบบ UF ไม่ต้องใช้ไฟฟ้าและไม่ก่อให้เกิดน้ำทิ้ง เหมาะสำหรับบ้านที่ใช้น้ำประปาส่วนภูมิภาคหรือนครหลวงปกติอยู่แล้ว"
          />
          <FAQItem
            q="2. สารกรองน้ำคาร์บอน เรซิ่น และแมงกานีส มีหน้าที่แตกต่างกันอย่างไร?"
            a="สารกรองแต่ละชนิดทำหน้าที่จับสิ่งเจือปนที่แตกต่างกันตามหลักเคมี: 1) สาร Activated Carbon ทำหน้าที่กรองดักกลิ่น สี คลอรีน สารอินทรีย์ และสารเคมีปราบศัตรูพืช 2) สารกรอง Resin ทำหน้าที่แลกเปลี่ยนประจุประสมเพื่อกำจัดไอออนแคลเซียมและแมกนีเซียม ซึ่งเป็นตัวการสำคัญที่ก่อให้เกิดหินปูนและตะกรันในน้ำ 3) สารกรอง Manganese Sand ทำหน้าที่เร่งการออกซิเดชันเพื่อเปลี่ยนรูปเหล็กและสนิมโลหะในน้ำที่เป็นสนิมแดงให้เป็นตะกอนขนาดใหญ่เพื่อดักกรองออกง่ายขึ้น"
          />
          <FAQItem
            q="3. ทำไมน้ำกรองจากระบบ RO ถึงมีน้ำทิ้ง และต้องทิ้งในสัดส่วนเท่าไร?"
            a="ระบบ RO ทำงานโดยใช้ปั๊มแรงดันสูงดันน้ำผ่านเยื่อแผ่นกรองเมมเบรนที่มีรูพรุนเล็กมากเป็นพิเศษเพื่อคัดกรองสารปนเปื้อน โมเลกุลของน้ำที่สะอาดเท่านั้นที่จะผ่านเยื่อเมมเบรนไปได้ ส่วนน้ำที่พาสารแขวนลอยเข้มข้นโลหะหนักจะไม่สามารถผ่านไปได้และจะถูกล้างออกจากระบบเพื่อป้องกันการอุดตันของแผ่นกรอง ซึ่งเราเรียกว่า 'น้ำทิ้ง' (Wastewater) อัตราส่วนน้ำทิ้งปกติจะอยู่ที่ประมาณ 60% ถึง 70% ของปริมาณน้ำดิบที่ป้อนเข้า ซึ่งเป็นอัตราแลกเปลี่ยนที่คุ้มค่าเพื่อน้ำดื่มที่สะอาดที่สุด"
          />
          <FAQItem
            q="4. วิธีสังเกตเมื่อไรที่ไส้กรองหมดอายุและต้องเปลี่ยนสารกรองน้ำ?"
            a="คุณสามารถสังเกตสิ่งบ่งชี้เหล่านี้: 1) อัตราไหลของน้ำกรองช้าลงอย่างเห็นได้ชัด (ไส้กรองเริ่มอุดตันด้วยคราบดินโคลน) 2) กลิ่นคลอรีนเริ่มกลับมาในน้ำกรอง (คาร์บอนเริ่มหมดสภาพการดูดซับ) 3) รสชาติของน้ำกรองเปลี่ยนไป มีกลิ่นอับหรือกระด้างขึ้น 4) มีคราบตะกรันสีขาวเกาะที่ปลายก๊อกหรือในกาน้ำร้อน (สารกรองเรซิ่นเสื่อมสภาพ) โดยปกติแนะนำให้ตั้งปฏิทินตรวจเช็กทุก 6 เดือน"
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// ==========================================
// 8. GasCylinderDuration
// ==========================================
export function GasCylinderDuration({ lang }: any) {
  const [cylinderSize, setCylinderSize] = useLocalState("gas_cylinder_size", "15");
  const [burnerCount, setBurnerCount] = useLocalState("gas_burners", "1");
  const [burnerPower, setBurnerPower] = useLocalState("gas_power", "medium");
  const [dailyUseTime, setDailyUseTime] = useLocalState("gas_daily_time", "45");

  const size = parseFloat(cylinderSize) || 15;
  const count = parseInt(burnerCount) || 1;
  const minutes = parseFloat(dailyUseTime) || 0;
  const isTH = lang === "TH";

  // Gas consumption rate per hour of continuous use per burner (kg/hr)
  // Small: 0.12 kg/hr | Medium: 0.24 kg/hr | Large (high pressure KB5): 0.45 kg/hr
  const powerRates: Record<string, number> = {
    small: 0.12,
    medium: 0.24,
    large: 0.45,
  };

  const currentRate = powerRates[burnerPower] || 0.24;
  const totalHourlyCons = currentRate * count;
  const dailyUseHours = minutes / 60;
  const dailyConsumption = totalHourlyCons * dailyUseHours;

  const totalBurnHours = size / (totalHourlyCons || 0.24);
  const expectedDays = size / (dailyConsumption || 0.1);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10 p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-2xl">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {isTH ? "คำนวณระยะเวลาใช้ถังแก๊ส" : "LPG Gas Cylinder Duration"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {isTH ? "ประเมินว่าถังแก๊สหุงต้มของคุณจะใช้งานได้นานกี่วันตามพฤติกรรมการเปิดเตา" : "Estimate how many days your gas cylinder will last based on cooking habits"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className={labelClass}>{isTH ? "ขนาดของถังแก๊ส (กิโลกรัม)" : "Cylinder Size (kg)"}</label>
              <select
                value={cylinderSize}
                onChange={(e) => setCylinderSize(e.target.value)}
                className={inputClass}
              >
                <option value="4">{isTH ? "4 กิโลกรัม (ถังปิคนิค / ถังเล็ก)" : "4 kg (Picnic / Camping)"}</option>
                <option value="11.5">{isTH ? "11.5 กิโลกรัม (ขนาดกลางพิเศษ)" : "11.5 kg"}</option>
                <option value="15">{isTH ? "15 กิโลกรัม (ถังมาตรฐานประจำบ้าน)" : "15 kg (Standard Household)"}</option>
                <option value="48">{isTH ? "48 กิโลกรัม (ถังใหญ่คู่ / ร้านอาหาร)" : "48 kg (Commercial / Large)"}</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>{isTH ? "จำนวนหัวเตาที่เปิดใช้งานพร้อมกัน" : "Active Burners"}</label>
              <input
                type="number"
                min="1"
                max="6"
                value={burnerCount}
                onChange={(e) => setBurnerCount(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>{isTH ? "ประเภทเตา / กำลังไฟ" : "Burner Power Grade"}</label>
              <select
                value={burnerPower}
                onChange={(e) => setBurnerPower(e.target.value)}
                className={inputClass}
              >
                <option value="small">{isTH ? "เตาแก๊สขนาดพกพา / เตาแก๊สกระป๋อง / อุ่นแก๊ส (0.12 kg/ชม.)" : "Low Power (0.12 kg/hr)"}</option>
                <option value="medium">{isTH ? "เตาแก๊สอินฟราเรด / เตาหัวเตาคู่บ้านทั่วไป (0.24 kg/ชม.)" : "Medium / Home Cooker (0.24 kg/hr)"}</option>
                <option value="large">{isTH ? "หัวเตาฟู่เร่งไฟด่วน (KB5 / เตาทำอาหารร้านค้า) (0.45 kg/ชม.)" : "High Power / KB5 Restaurant style (0.45 kg/hr)"}</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>{isTH ? "เวลาเปิดใช้งานเฉลี่ยต่อวัน (นาที)" : "Average Daily Cooking Time (minutes)"}</label>
              <input
                type="number"
                value={dailyUseTime}
                onChange={(e) => setDailyUseTime(e.target.value)}
                className={inputClass}
                placeholder="เช่น 45"
              />
            </div>
          </div>

          {/* Results */}
          <div id="gas-duration-result" className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {isTH ? "ประมาณการอายุการใช้งาน" : "Estimated Duration"}
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "อัตราการจ่ายแก๊สของเตา" : "Hourly Consumption"}</span>
                  <span className="font-bold text-gray-950 dark:text-white">{totalHourlyCons.toFixed(2)} kg/hr</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "การสิ้นเปลืองเฉลี่ยต่อวัน" : "Daily Consumption"}</span>
                  <span className="font-bold text-gray-950 dark:text-white">{dailyConsumption.toFixed(3)} kg/day</span>
                </div>

                <div className="p-4 rounded-xl mt-4 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-white/5">
                  <span className="block text-xs text-gray-400 dark:text-gray-500 mb-1">
                    {isTH ? "จำนวนวันที่ถังแก๊สจะอยู่ได้" : "Estimated Lifespan of Cylinder"}
                  </span>
                  <span className="text-3xl font-black text-red-600 dark:text-red-400">
                    {expectedDays.toFixed(1)} {isTH ? "วัน" : "Days"}
                  </span>
                  <span className="block text-[10px] text-gray-400 mt-2">
                    {isTH ? `* หรือคิดเป็นชั่วโมงเปิดต่อเนื่องรวม ${totalBurnHours.toFixed(1)} ชั่วโมง` : `* Equivalent to ${totalBurnHours.toFixed(1)} continuous hours.`}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ExportResult elementId="gas-duration-result" fileName="gas-cylinder-duration-result" lang={lang} />
            </div>
          </div>
        </div>

        <CalculationSteps
          title={isTH ? "วิธีการคิดระยะเวลาถังแก๊ส" : "Gas Duration Calculation"}
          steps={isTH ? [
            "ค้นหาปริมาณเนื้อแก๊สในถัง: ถังทั่วไปในไทยจะระบุน้ำหนักสุทธิเฉพาะแก๊ส เช่น 15 กิโลกรัม (ไม่รวมน้ำหนักเหล็กตัวถัง)",
            "ประเมินค่าการใช้แก๊ส (Consumption Rate): เตาบ้านมาตรฐานกินแก๊สเฉลี่ย 0.24 กิโลกรัมต่อการเปิดใช้งานเต็มพิกัด 1 ชั่วโมง",
            "คิดอัตราการใช้ต่อวัน: นำชั่วโมงการเปิดทำอาหารเฉลี่ยต่อวันไปคูณพิกัดการสิ้นเปลือง",
            "หารปริมาณแก๊สในถังด้วยปริมาณการใช้ต่อวัน เพื่อประเมินจำนวนวันที่ถังแก๊สจะหมดลง"
          ] : [
            "Identify LPG net weight in the cylinder: (e.g. 15 kg for typical home tanks, excluding steel weight).",
            "Estimate fuel consumption rate: Standard home burner burns ~0.24 kg of gas per hour of continuous operation.",
            "Multiply hourly burn rate by the daily operating hours to find daily consumption in kg.",
            "Divide total gas weight by daily consumption rate to get expected usage duration in days."
          ]}
        />

        <SEOFAQ title={isTH ? "คู่มือความปลอดภัยและการประหยัดก๊าซหุงต้ม LPG ในครัวเรือน" : "Gas Cylinder FAQs"}>
          <FAQItem
            q="1. วิธีสังเกตระดับแก๊สหุงต้มที่เหลืออยู่ภายในถังทำอย่างไร?"
            a="เนื่องจากก๊าซ LPG ถูกอัดให้เป็นของเหลวภายใต้แรงดันสูงภายในถังเหล็กหนา วิธีเช็กระดับแก๊สทำได้โดย: 1) การชั่งน้ำหนัก โดยชั่งถังแก๊สแล้วลบออกด้วยน้ำหนักตัวถังเปล่า (Tare Weight ซึ่งมีสลักนูนบอกไว้ที่หูถัง เช่น 16.5 kg) น้ำหนักที่เหลือคือเนื้อแก๊ส 2) ลูบด้วยน้ำเปล่าหรือมือสัมผัสตัวถัง โดยลูบน้ำล้างจานชื้นๆ ด้านข้างถัง จุดที่มีแก๊สของเหลวอยู่จะเย็นและทำให้น้ำแห้งช้ากว่าส่วนบนที่เป็นไอแก๊ส 3) ดูจากลักษณะความแรงของเปลวไฟและความดันของไฟเตาแก๊ส"
          />
          <FAQItem
            q="2. ทำไมเปลวไฟเตาแก๊สจึงเปลี่ยนจากสีฟ้าเป็นสีแดง/เหลือง และสิ้นเปลืองเพิ่มขึ้นไหม?"
            a="เปลวไฟสีฟ้าแสดงถึงการเผาไหม้ที่สมบูรณ์แบบ (Complete Combustion) ซึ่งให้อุณหภูมิความร้อนสูงสุดและประหยัดแก๊สที่สุด หากไฟเปลี่ยนเป็นสีเหลืองหรือแดง แสดงว่าการผสมอากาศกับแก๊สไม่เหมาะสม (แก๊สมากกว่าอากาศ) หรือหัวเตามีคราบเขม่าสกปรกอุดตัน ส่งผลให้อุณหภูมิไฟต่ำลง ทำความร้อนได้ช้า เปลืองแก๊สมากขึ้น และทำให้ก้นหม้อดำอีกด้วย แก้ไขได้โดยการปรับช่องจูนอากาศด้านล่างหัวเตาแก๊ส"
          />
          <FAQItem
            q="3. เรกูเลเตอร์ (Regulator) หัวปรับความดันแก๊สแรงดันต่ำและสูง ต่างกันอย่างไร?"
            a="1) หัวปรับแรงดันต่ำ (Low Pressure Regulator) ออกแบบสำหรับจ่ายแก๊สแรงดันสม่ำเสมอและค่อนข้างเบา ปลอดภัยสูง เหมาะสำหรับต่อเข้ากับเตาแก๊สบ้าน เตาอินฟราเรด หรือตู้อบแก๊ส 2) หัวปรับแรงดันสูง (High Pressure Regulator) จ่ายแก๊สแรงดันสูงรุนแรง มีวาล์วจูนเพื่อเร่งไฟให้ฟู่ มักใช้กับเตาฟู่ร้านอาหารหรืองานผัดผักไฟแดง (KB5) ห้ามนำหัวปรับแรงดันสูงมาต่อพ่วงกับเตาบ้านทั่วไปเด็ดขาดเพราะจะทำให้สายหลุด รั่ว หรือเปลวไฟพุ่งไหม้จนเป็นอันตราย"
          />
          <FAQItem
            q="4. ข้อปฏิบัติเพื่อความปลอดภัยสูงสุดในการจัดตั้งถังแก๊สภายในครัวมีอะไรบ้าง?"
            a="1) ตั้งถังแก๊สไว้ในพื้นที่เรียบ แข็งแรง และมีอากาศถ่ายเทสะดวก 2) ไม่จัดเก็บถังแก๊สในลักษณะแนวนอนหรือนอนราบ 3) วางถังแก๊สให้ห่างจากหัวเตา เปลวไฟ หรือแหล่งความร้อนอื่นๆ อย่างน้อย 1.5 เมตร 4) เช็กความสมบูรณ์ของสายยางนำแก๊สทุก 2 ปี และไม่ควรใช้สายยางที่แห้งแตกกรอบ 5) ปิดวาล์วถังแก๊สทุกครั้งหลังจากเสร็จสิ้นการทำอาหาร เพื่อป้องกันแก๊สค้างท่อและรั่วซึมสะสมในห้องครัว"
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// ==========================================
// 9. AcRepairCost
// ==========================================
export function AcRepairCost({ lang }: any) {
  const [acType, setAcType] = useLocalState("ac_type", "wall");
  const [acSize, setAcSize] = useLocalState("ac_size", "medium");
  
  // Selected services state
  const [clean, setClean] = useLocalState("ac_serv_clean", true);
  const [chemical, setChemical] = useLocalState("ac_serv_chemical", false);
  const [gas, setGas] = useLocalState("ac_serv_gas", false);
  const [waterLeak, setWaterLeak] = useLocalState("ac_serv_leak", false);
  const [fanMotor, setFanMotor] = useLocalState("ac_serv_motor", false);
  const [capacitor, setCapacitor] = useLocalState("ac_serv_cap", false);

  const isTH = lang === "TH";

  // Base service prices
  let costClean = acType === "wall" ? 600 : (acType === "ceiling" ? 1000 : 1300);
  let costChemical = acType === "wall" ? 1500 : (acType === "ceiling" ? 2200 : 2800);
  let costGas = 800;
  let costLeak = 600;
  let costMotor = 3000;
  let costCap = 900;

  // Size multipliers
  const sizeMult = acSize === "small" ? 1.0 : (acSize === "medium" ? 1.15 : 1.35);

  let totalCost = 0;
  if (clean) totalCost += costClean;
  if (chemical) totalCost += costChemical;
  if (gas) totalCost += costGas;
  if (waterLeak) totalCost += costLeak;
  if (fanMotor) totalCost += costMotor;
  if (capacitor) totalCost += costCap;

  const finalCost = totalCost * sizeMult;
  const rangeLow = finalCost * 0.9;
  const rangeHigh = finalCost * 1.15;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10 p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-2xl">
            <Wrench className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {isTH ? "คำนวณค่าบริการซ่อมแอร์" : "AC Repair & Cleaning Cost Estimator"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {isTH ? "ตรวจสอบงบประมาณประเมินราคากลางค่าล้างและซ่อมแอร์บ้านทั่วไป" : "Estimate expected maintenance costs for home air conditioners"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className={labelClass}>{isTH ? "ประเภทเครื่องปรับอากาศ" : "Air Conditioner Type"}</label>
              <select
                value={acType}
                onChange={(e) => setAcType(e.target.value)}
                className={inputClass}
              >
                <option value="wall">{isTH ? "แอร์ติดผนัง (Wall Type - ทั่วไป)" : "Wall-Mounted (Standard)"}</option>
                <option value="ceiling">{isTH ? "แอร์แขวนใต้ฝ้า / ตั้งพื้น" : "Ceiling / Suspended Type"}</option>
                <option value="cassette">{isTH ? "แอร์ฝังฝ้า 4 ทิศทาง (Cassette Type)" : "4-Way Cassette Type"}</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>{isTH ? "ขนาดของแอร์ (BTU)" : "AC Size (BTU)"}</label>
              <select
                value={acSize}
                onChange={(e) => setAcSize(e.target.value)}
                className={inputClass}
              >
                <option value="small">{isTH ? "เล็ก (< 12,000 BTU)" : "Small (< 12k BTU)"}</option>
                <option value="medium">{isTH ? "กลาง (12,000 - 24,000 BTU)" : "Medium (12k - 24k BTU)"}</option>
                <option value="large">{isTH ? "ใหญ่ (> 24,000 BTU)" : "Large (> 24k BTU)"}</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>{isTH ? "เลือกบริการที่จำเป็น" : "Select Needed Services"}</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={clean}
                    onChange={(e) => setClean(e.target.checked)}
                    className="rounded border-gray-300 dark:border-white/10 text-teal-600 focus:ring-teal-500"
                  />
                  <span>{isTH ? "ล้างแอร์แบบปกติประจำปี" : "Regular Cleaning / Wash"}</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={chemical}
                    onChange={(e) => setChemical(e.target.checked)}
                    className="rounded border-gray-300 dark:border-white/10 text-teal-600 focus:ring-teal-500"
                  />
                  <span>{isTH ? "ล้างใหญ่ถอดคอยล์ด้วยน้ำยาเคมี" : "Chemical Deep Clean (Dismantle)"}</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={gas}
                    onChange={(e) => setGas(e.target.checked)}
                    className="rounded border-gray-300 dark:border-white/10 text-teal-600 focus:ring-teal-500"
                  />
                  <span>{isTH ? "เติมน้ำยาแอร์ (กรณีระบบมีรอยรั่วซึม)" : "Refrigerant Refill / Charge"}</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={waterLeak}
                    onChange={(e) => setWaterLeak(e.target.checked)}
                    className="rounded border-gray-300 dark:border-white/10 text-teal-600 focus:ring-teal-500"
                  />
                  <span>{isTH ? "แก้ไขปัญหาแอร์น้ำหยด / ท่อน้ำทิ้งตัน" : "Water Leak / Clogged Drain Fix"}</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={fanMotor}
                    onChange={(e) => setFanMotor(e.target.checked)}
                    className="rounded border-gray-300 dark:border-white/10 text-teal-600 focus:ring-teal-500"
                  />
                  <span>{isTH ? "เปลี่ยนมอเตอร์พัดลม (คอยล์เย็น/ร้อน)" : "Replace Fan Motor (Indoor/Outdoor)"}</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={capacitor}
                    onChange={(e) => setCapacitor(e.target.checked)}
                    className="rounded border-gray-300 dark:border-white/10 text-teal-600 focus:ring-teal-500"
                  />
                  <span>{isTH ? "เปลี่ยนแคปสตาร์ต (Capacitor Run)" : "Replace Compressor Run Capacitor"}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results */}
          <div id="ac-repair-result" className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {isTH ? "ช่วงราคาค่าบริการโดยประมาณ" : "Estimated Cost Range"}
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "ประเภทเครื่องปรับอากาศ" : "AC System Type"}</span>
                  <span className="font-bold text-gray-950 dark:text-white">
                    {acType === "wall" ? (isTH ? "ติดผนัง" : "Wall Mounted") : (acType === "ceiling" ? (isTH ? "แขวนใต้ฝ้า" : "Ceiling Suspended") : (isTH ? "ฝังฝ้า 4 ทิศทาง" : "4-Way Cassette"))}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "ตัวคูณขนาดกำลังทำความเย็น" : "Size Factor"}</span>
                  <span className="font-bold text-gray-950 dark:text-white">x{sizeMult.toFixed(2)}</span>
                </div>

                <div className="p-5 rounded-2xl mt-4 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-white/5 text-center">
                  <span className="block text-xs text-gray-400 dark:text-gray-500 mb-1">
                    {isTH ? "ช่วงราคาค่าแรงรวมค่าอะไหล่ประเมิน" : "Estimated Service Charge"}
                  </span>
                  <span className="text-3xl font-black text-teal-600 dark:text-teal-400 block mb-1">
                    {rangeLow.toLocaleString(undefined, {maximumFractionDigits: 0})} - {rangeHigh.toLocaleString(undefined, {maximumFractionDigits: 0})} บาท
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">
                    {isTH ? "* เป็นราคากลางประเมินเบื้องต้น ไม่รวมค่าเดินทางในพื่นที่ห่างไกล" : "* Estimate only. Transport or crane hire not included."}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ExportResult elementId="ac-repair-result" fileName="ac-repair-cost-result" lang={lang} />
            </div>
          </div>
        </div>

        <CalculationSteps
          title={isTH ? "แนวทางการคิดราคาล้างและซ่อมแอร์" : "AC Service Costing Breakdown"}
          steps={isTH ? [
            "แยกประเภทของแอร์: แอร์แขวนหรือแอร์ฝังฝ้า 4 ทิศทาง จะถอดรื้อยากกว่าและเสี่ยงน้ำท่วมห้องมากกว่าแอร์ติดผนังทั่วไป ค่าแรงจึงแพงกว่า",
            "ตัวคูณขนาดบีทียู (BTU Size Multiplier): แอร์ขนาดใหญ่คอยล์จะหนา กว้าง และใช้น้ำยาเยอะขึ้น ช่างต้องใช้แรงและเวลาเป่าล้างนานขึ้น",
            "การคำนวณราคานี้เป็นเกณฑ์เฉลี่ยมาตรฐานตลาดกรุงเทพฯ และปริมณฑล สำหรับอู่ช่างแอร์ทั่วไป ไม่ใช่ราคาประเมินจากศูนย์บริการแบรนด์เนมอย่างเป็นทางการ"
          ] : [
            "Differentiate AC Type: Cassette and suspended models require delicate teardowns and complex water containment setups, which drives up labor rates compared to standard wall units.",
            "BTU Sizing Multiplier: Larger evaporators and condensers are physically larger and utilize more refrigerant volume, taking more labor hours to properly flush and pressure-test.",
            "Exclusions: These rates represent independent HVAC technician averages in Thailand, rather than official manufacturer service center premium fees."
          ]}
        />

        <SEOFAQ title={isTH ? "ความรู้เรื่องการบำรุงรักษาแอร์บ้านและคำถามที่พบบ่อย" : "AC Maintenance FAQs"}>
          <FAQItem
            q="1. ควรล้างแอร์บ้านบ่อยแค่ไหน และการไม่ล้างแอร์ส่งผลเสียอย่างไร?"
            a="โดยทั่วไปแนะนำให้ล้างแอร์ปีละ 2 ครั้ง หรือทุกๆ 6 เดือน หากห้องตั้งอยู่ในจุดที่มีฝุ่นเยอะ ใกล้ถนน หรือบ้านเลี้ยงสัตว์ อาจต้องล้างบ่อยขึ้นทุกๆ 3-4 เดือน การไม่ล้างแอร์จะทำให้คอยล์เย็นอุดตันด้วยฝุ่นละออง ส่งผลให้ลมแอร์พัดออกไม่สะดวก แอร์ทำงานหนักขึ้น คอมเพรสเซอร์ตัดยาก เปลืองค่าไฟมากกว่าปกติถึง 15-20% และยังเป็นแหล่งสะสมของแบคทีเรียและเชื้อราส่งผลเสียต่อระบบทางเดินหายใจ"
          />
          <FAQItem
            q="2. น้ำยาแอร์พร่อง/หมดบ่อยไหม จำเป็นต้องเติมทุกครั้งที่ล้างแอร์หรือไม่?"
            a="นี่คือความเข้าใจผิดและช่องทางโกงยอดฮิต! ระบบน้ำยาแอร์เป็นระบบท่อปิด (Closed System) น้ำยาแอร์จะไหลเวียนอยู่ภายในท่อโดยไม่ระเหยหรือหมดไปเองเหมือนน้ำมันรถยนต์ หากไม่มีจุดรั่วซึม แอร์บางเครื่องอาจใช้งานได้ยาวนานกว่า 10 ปีโดยไม่ต้องเติมน้ำยาแอร์เพิ่มเลย ดังนั้น ช่างแอร์ที่ดีจะต้องตรวจวัดค่าแรงดันด้วยเกจ หากแรงดันตกแสดงว่าระบบมีจุดรั่ว ต้องหาจุดรั่วและซ่อมรอยรั่วก่อนจะเติมแก๊สเพิ่มกลับเข้าไปใหม่"
          />
          <FAQItem
            q="3. สาเหตุหลักของอาการแอร์มีน้ำหยดออกด้านหน้าตัวเครื่องเกิดจากอะไร?"
            a="สาเหตุที่พบบ่อยที่สุดกว่า 90% คือ 'ท่อน้ำทิ้งตัน' (Clogged Condensate Drain) เนื่องจากฝุ่นละอองในห้องผสมกับน้ำค้างในถาดรองน้ำจนกลายเป็นวุ้นยางเหนียวๆ ไปอุดตันรูท่อน้ำทิ้ง ทำให้น้ำระบายออกไม่ทันจนเอ่อล้นออกมาด้านหน้านอกตัวเครื่อง อาการนี้สามารถแก้ไขได้ง่ายด้วยการใช้เครื่องเป่าลมแรงหรือปั๊มน้ำดันไล่คราบวุ้นอุดตันออกไป หรือการล้างแอร์ใหญ่ล้างถาดรองระบายน้ำทิ้งให้สะอาด"
          />
          <FAQItem
            q="4. อาการเสียจากตัวเก็บประจุรัน (Run Capacitor) หรือแคปรัน เสีย สังเกตอย่างไร?"
            a="เมื่อแคปรันเสียหรือเสื่อมสภาพ อาการที่เห็นได้ชัดเจนคือ 'แอร์มีแต่ลมร้อนพัดออกมาจากตัวเครื่องภายใน' โดยเมื่อสังเกตที่พัดลมคอยล์ร้อนนอกบ้านจะพบว่าพัดลมยังหมุนทำงานตามปกติ แต่คอมเพรสเซอร์กลับเงียบหรือพยายามจะสตาร์ตแล้วดับ (มีเสียงอือฮือสั้นๆ แล้วตัดตัว) อาการนี้มักเกิดในฤดูร้อนเนื่องจากแรงดันไฟฟ้ากระชากและตัวเก็บประจุสะสมความร้อนสูงจนหัวนูนปูด สามารถซ่อมแซมได้เร็วและราคาไม่แพงเพียงสลับเปลี่ยนตัวเก็บประจุค่าฟารัดเท่าเดิม"
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// ==========================================
// 10. AntennaLengthFrequency
// ==========================================
export function AntennaLengthFrequency({ lang }: any) {
  const [frequency, setFrequency] = useLocalState("antenna_freq", "145.0");
  const [antennaType, setAntennaType] = useLocalState("antenna_type", "dipole");
  const [velocityFactor, setVelocityFactor] = useLocalState("antenna_vf", "0.95");

  const freq = parseFloat(frequency) || 145.0;
  const vf = parseFloat(velocityFactor) || 0.95;
  const isTH = lang === "TH";

  // Wavelength = speed of light / frequency
  // Speed of light in vacuum is approx 299.792 million m/s
  const speedOfLight = 299.792;
  const lambda = freq > 0 ? speedOfLight / freq : 0;
  const lambdaV = lambda * vf;

  let totalLengthM = 0;
  let elementLengthM = 0;
  let elementDesc = "";

  if (antennaType === "dipole") {
    // Half-wave dipole: Total length = lambda/2, each leg = lambda/4
    totalLengthM = lambdaV / 2;
    elementLengthM = lambdaV / 4;
    elementDesc = isTH ? "ความยาวแขนแต่ละข้าง (2 แขน)" : "Each arm length (2 arms total)";
  } else if (antennaType === "monopole") {
    // Quarter-wave monopole: Radiator = lambda/4, Ground radials = lambda/4 * 1.05
    totalLengthM = lambdaV / 4;
    elementLengthM = lambdaV / 4 * 1.05;
    elementDesc = isTH ? "ความยาวขากราวด์เพลนเฉียงลง (Ground Radials)" : "Ground radials length (slanted down)";
  } else {
    // Yagi folded dipole active element (approx 0.47 * lambda)
    totalLengthM = lambdaV * 0.47;
    elementLengthM = totalLengthM / 2;
    elementDesc = isTH ? "ความยาวแขนแต่ละด้านของห่วงขับ" : "Each side of folded loop";
  }

  // Convert to centimeters and inches
  const totalLengthCm = totalLengthM * 100;
  const elementLengthCm = elementLengthM * 100;

  const totalLengthIn = totalLengthCm / 2.54;
  const elementLengthIn = elementLengthCm / 2.54;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10 p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl">
            <Radio className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {isTH ? "คำนวณขนาดเสาอากาศวิทยุ" : "Antenna Length Calculator"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {isTH ? "คำนวณหาความยาวของเสาอากาศทองเหลือง/อลูมิเนียมตามความถี่รับส่งวิทยุ" : "Calculate physical dimensions of RF antennas based on target frequency"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className={labelClass}>{isTH ? "ความถี่เป้าหมายที่ต้องการรับส่ง (MHz)" : "Target Frequency (MHz)"}</label>
              <input
                type="number"
                step="0.01"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className={inputClass}
                placeholder="เช่น 145.0"
              />
              <span className="text-[10px] text-gray-400 block mt-1">
                {isTH 
                  ? "ตัวอย่าง: วิทยุสมัครเล่น 144-146 | วิทยุชุมชน FM 88-108 | โทรทัศน์ดิจิตอล 500-800 | สัญญาณ LoRa 920-925" 
                  : "Examples: Ham radio 145 | FM broadcast 100 | Digital TV 650 | LoRa IoT 920"}
              </span>
            </div>

            <div>
              <label className={labelClass}>{isTH ? "ประเภทของเสาอากาศ" : "Antenna Design Type"}</label>
              <select
                value={antennaType}
                onChange={(e) => setAntennaType(e.target.value)}
                className={inputClass}
              >
                <option value="dipole">{isTH ? "ครึ่งคลื่นไดโพล (Half-wave Dipole - เสายอดฮิต)" : "Half-Wave Dipole"}</option>
                <option value="monopole">{isTH ? "หนึ่งในสี่คลื่นโมโนโพล (Quarter-wave Ground Plane)" : "Quarter-Wave Ground Plane"}</option>
                <option value="yagi">{isTH ? "แผงสายอากาศยากิ (Yagi Folder Dipole Driver)" : "Yagi Driver Element"}</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>{isTH ? "ตัวประกอบความเร็วคลื่นในโลหะตัวนำ (Velocity Factor)" : "Velocity Factor (VF)"}</label>
              <input
                type="number"
                step="0.01"
                min="0.5"
                max="1.0"
                value={velocityFactor}
                onChange={(e) => setVelocityFactor(e.target.value)}
                className={inputClass}
              />
              <span className="text-[10px] text-gray-400 block mt-1">
                {isTH 
                  ? "ลวดทองแดงเปลือย ~0.95 | อลูมิเนียมแป๊ปกลม ~0.94-0.96 | สายโคแอกเชียลแกน PE ~0.66" 
                  : "Bare copper ~0.95 | Aluminum tubing ~0.95 | Coax PE dielectric ~0.66"}
              </span>
            </div>
          </div>

          {/* Results */}
          <div id="antenna-length-result" className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {isTH ? "ขนาดทางกายภาพเสาอากาศ" : "Calculated Dimensions"}
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "ความยาวคลื่นจริง (Wavelength / λ)" : "Wavelength (λ)"}</span>
                  <span className="font-bold text-gray-950 dark:text-white">{lambda.toFixed(3)} {isTH ? "เมตร" : "meters"}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">{isTH ? "ความยาวคลื่นปรับปรุงความเร็วโลหะ" : "Velocity-Adjusted λ"}</span>
                  <span className="font-bold text-gray-950 dark:text-white">{lambdaV.toFixed(3)} {isTH ? "เมตร" : "meters"}</span>
                </div>

                <div className="p-4 rounded-xl mt-4 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-white/5">
                  <span className="block text-xs text-gray-400 dark:text-gray-500 mb-1">
                    {antennaType === "dipole" 
                      ? (isTH ? "ความยาวรวมของเสาไดโพลทั้งหมด (Total Length)" : "Total Dipole Antenna Length") 
                      : (antennaType === "monopole" 
                        ? (isTH ? "ความยาวของวิปเสาอากาศหลัก (Radiator Length)" : "Active Whip Radiator Length")
                        : (isTH ? "ความยาวรอบวงห่วงยากิไดรเวอร์" : "Yagi Driver Loop Length"))}
                  </span>
                  <span className="text-2xl font-black text-blue-600 dark:text-blue-400 block">
                    {totalLengthCm.toFixed(1)} ซม. ({totalLengthIn.toFixed(2)} นิ้ว)
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-white/5">
                  <span className="block text-xs text-gray-400 dark:text-gray-500 mb-1">
                    {elementDesc}
                  </span>
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-300 block">
                    {elementLengthCm.toFixed(1)} ซม. ({elementLengthIn.toFixed(2)} นิ้ว)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ExportResult elementId="antenna-length-result" fileName="antenna-dimensions-result" lang={lang} />
            </div>
          </div>
        </div>

        <CalculationSteps
          title={isTH ? "หลักฟิสิกส์คลื่นวิทยุและการจูนขนาดเสา" : "RF Physics & Calculation Formulas"}
          steps={isTH ? [
            "คำนวณหาความยาวคลื่นในสุญญากาศ: Wavelength (เมตร) = 299.792 / ความถี่ (MHz)",
            "ปรับแก้มูลค่าความต่างเมื่อเคลื่อนในโลหะตัวนำ: คูณค่าความยาวคลื่นด้วยค่า Velocity Factor (VF) ของวัสดุที่ใช้ทำเสาอากาศ เพื่อหาระยะความเร็วคลื่นที่ไหลช้าลงในตัวนำทองแดงหรืออลูมิเนียม",
            "กรณีเสาไดโพลครึ่งคลื่น (Half-wave Dipole): ตัวเสาต้องการความยาวรวมเท่ากับความยาวคลื่นลดทอนความเร็วหารด้วย 2 และตัดแบ่งแกนทองเหลืองออกเป็นสองข้างเท่ากัน แต่ละข้างยาวเท่ากับคลื่นส่วนสี่ (Wavelength / 4)"
          ] : [
            "Calculate Wavelength in free space: Wavelength (m) = 299.792 / Frequency (MHz).",
            "Apply Material Velocity Factor (VF): Multiply wavelength by the conductor's VF (e.g. 0.95) to adjust for propagation delay inside metal elements.",
            "Dipole Antenna Dimensions: A standard half-wave dipole is divided into two separate radiating arms, each cut exactly at a quarter-wavelength (λ/4) of the tuned frequency."
          ]}
        />

        <SEOFAQ title={isTH ? "คู่มือและคำถามพบบ่อยเกี่ยวกับการคำนวณความยาวสายอากาศวิทยุ" : "Radio Antenna FAQs"}>
          <FAQItem
            q="1. ค่า Velocity Factor (VF) คืออะไร และมีความสำคัญอย่างไรต่อการทำเสาอากาศ?"
            a="Velocity Factor (VF) หรือ ตัวประกอบความเร็ว คือ อัตราส่วนความเร็วของกระแสไฟฟ้าคลื่นวิทยุเมื่อเดินทางเคลื่อนที่ภายในวัสดุโลหะตัวนำ (เช่น ท่ออลูมิเนียม ลวดทองเหลือง) เทียบกับความเร็วแสงในสุญญากาศ เนื่องจากกระแสคลื่นวิทยุจะเคลื่อนที่ช้าลงประมาณ 3% ถึง 8% เมื่อเดินทางบนผิวโลหะตัวนำที่หนาหนืดกว่าสุญญากาศ ดังนั้น หากเราไม่นำตัวคูณนี้มาร่วมประเมิน (โดยทั่วไปนิยมใช้ค่า 0.95) ความยาวเสาอากาศที่วัดได้จะยาวเกินไป ทำให้เสาเกิดการสะท้อนพลังงานกลับ (SWR สูง) และรับส่งสัญญาณได้ไม่ดี"
          />
          <FAQItem
            q="2. ค่า SWR (Standing Wave Ratio) คืออะไร และส่งผลอย่างไรกับการรับส่ง?"
            a="SWR คือ อัตราส่วนกำลังคลื่นสะท้อนกลับในสายนำสัญญาณวิทยุ ค่า SWR ที่ดีที่สุดและในอุดมคติคือ 1:1 หรือใกล้เคียง ซึ่งหมายความว่ากำลังส่งทั้งหมดจากเครื่องวิทยุถูกนำไปแปลงออกเป็นคลื่นแพร่ในอากาศทั้งหมด หากตัดขนาดความยาวเสาอากาศไม่ตรงกับความถี่ใช้งาน ค่า SWR จะสูงขึ้น (เช่น เกิน 2.0 หรือ 3.0) ส่งผลให้คลื่นสะท้อนกลับมาเป็นความร้อนทำให้อุปกรณ์ชิปปลายทางของเครื่องส่งวิทยุเสียหายหรือเครื่องไหม้ได้"
          />
          <FAQItem
            q="3. เสาไดโพล (Dipole) และเสาจีพี (Ground Plane Monopole) แตกต่างกันอย่างไร?"
            a="1) เสาไดโพล (Dipole) ประกอบด้วยท่อนตัวนำสองท่อนวางแยกขั้วสมมาตรกัน (ขั้วบวกและขั้วลบ) ไม่จำเป็นต้องสร้างระนาบดินกราวด์ มีทิศทางการแพร่กระจายสัญญาณคล้ายรูปโดนัทแนวนอน 2) เสาจีพี (Ground Plane) มีท่อนตัวนำแนวตั้งตรงหนึ่งท่อน (Radiator) และมีท่อกราวด์เอียงลงทำมุมรอบตัวเปรียบเสมือนระนาบดินจำลอง นิยมใช้งานบนยานพาหนะหรือดาดฟ้าอาคารเนื่องจากมีโครงข่ายมุมกว้าง 360 องศาแบบ Omni-directional"
          />
          <FAQItem
            q="4. ทำไมเสาอากาศส่งความถี่ 145 MHz (วิทยุสมัครเล่น) จึงยาวกว่าเสาสัญญาณ Wi-Fi (2.4 GHz)?"
            a="ความยาวทางกายภาพของเสาอากาศถูกกำหนดโดยสัดส่วนความถี่และแรงดันคลื่นวิทยุโดยตรงตามสูตรฟิสิกส์ ซึ่งระบุว่าความยาวคลื่นจะแปรผกผันกับความถี่วิทยุ กล่าวคือ ยิ่งความถี่ต่ำเท่าไร ความยาวคลื่นก็จะยิ่งยาวขึ้นเท่านั้น (ความถี่ 145 MHz มีความยาวคลื่นประมาณ 2 เมตร เสาจึงยาว 50 ซม.) แต่สัญญาณ Wi-Fi ที่ความถี่สูงมาก 2400 MHz (2.4 GHz) จะมีความยาวคลื่นสั้นมากเพียง 12.5 เซนติเมตร ทำให้เสาอากาศวิพขนาดจริงสั้นเหลือเพียง 3 เซนติเมตรเท่านั้น"
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

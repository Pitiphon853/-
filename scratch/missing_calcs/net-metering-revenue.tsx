import React, { useState } from 'react';
import { Wallet, Sun, Zap, TrendingUp, Info } from 'lucide-react';

export default function NetMeteringRevenue({ lang = 'TH' }: any) {
  const [capacity, setCapacity] = useState<number>(5); // kW
  const [sunlightHours, setSunlightHours] = useState<number>(4.5); // hrs/day
  const [sellPercentage, setSellPercentage] = useState<number>(30); // %
  const [sellRate, setSellRate] = useState<number>(2.20); // Baht/kWh

  // Calculations
  const dailyGen = capacity * sunlightHours;
  const monthlyGen = dailyGen * 30; // kWh/month
  const kwhSoldMonthly = monthlyGen * (sellPercentage / 100);
  const kwhSelfUseMonthly = monthlyGen - kwhSoldMonthly;
  
  const monthlyRevenue = kwhSoldMonthly * sellRate;
  const yearlyRevenue = monthlyRevenue * 12;

  const t = {
    TH: {
      title: "คำนวณรายได้ขายไฟคืน (Net Metering)",
      systemCapacity: "ขนาดระบบโซลาร์เซลล์ (kW)",
      sunlightHours: "ชั่วโมงแดดเฉลี่ยต่อวัน (ชั่วโมง)",
      sellPercentage: "สัดส่วนไฟที่คาดว่าจะขายคืน (%)",
      sellRate: "ราคารับซื้อไฟ (บาท/หน่วย)",
      results: "ประมาณการรายได้",
      monthlyRev: "รายได้ต่อเดือน",
      yearlyRev: "รายได้ต่อปี",
      monthlyGen: "ผลิตไฟได้ต่อเดือน",
      soldAmount: "จำนวนไฟที่ขายคืน",
      selfUseAmount: "จำนวนไฟที่ใช้เอง",
      kwh: "หน่วย",
      baht: "บาท",
      infoSell: "ขายไฟ",
      infoUse: "ใช้เอง",
      seoTitle: "คำนวณรายได้ขายไฟคืนโครงการโซลาร์ภาคประชาชน (Net Metering)",
      seoH2_1: "โครงการโซลาร์ภาคประชาชนคืออะไร ได้เงินจริงไหม?",
      seoP_1: "โครงการโซลาร์ภาคประชาชน เป็นนโยบายส่งเสริมให้ประชาชนทั่วไปที่มีการติดตั้งระบบโซลาร์เซลล์บนหลังคา (Solar Rooftop) สามารถนำไฟฟ้าที่ผลิตได้ 'ส่วนเกิน' จากการใช้งานภายในบ้าน ไปขายคืนให้กับระบบโครงข่ายไฟฟ้าของการไฟฟ้านครหลวง (กฟน.) หรือการไฟฟ้าส่วนภูมิภาค (กฟภ.) ได้ ในอัตรารับซื้อที่กำหนด (ปัจจุบันอยู่ที่ 2.20 บาทต่อหน่วย) เครื่องมือนี้ช่วยให้คุณประเมินรายได้เบื้องต้นว่าในแต่ละเดือน หากคุณมีไฟเหลือและขายคืน จะได้เงินกลับมาเท่าไหร่",
      seoH2_2: "ต้องทำอย่างไรถึงจะขายไฟคืนได้?",
      seoP_2: "1. ต้องเป็นผู้ใช้ไฟฟ้าประเภท 1 (บ้านอยู่อาศัย) \n2. ติดตั้งระบบโซลาร์เซลล์ตามมาตรฐานที่กำหนดและใช้อุปกรณ์ที่ผ่านการรับรอง \n3. ยื่นเรื่องขออนุญาตขนานไฟและขายไฟคืนกับหน่วยงานการไฟฟ้าในพื้นที่ \n4. เปลี่ยนมิเตอร์เป็นแบบดิจิทัลที่สามารถอ่านค่าไฟไหลย้อนกลับได้ (Bidirectional Meter) โดยการไฟฟ้าจะเป็นผู้ดำเนินการ \n5. เซ็นสัญญาซื้อขายไฟฟ้า",
      seoH2_3: "ทำไมราคารับซื้อไฟถึงถูกกว่าราคาที่ซื้อจากการไฟฟ้า?",
      seoP_3: "หลายคนอาจสงสัยว่าทำไมเราซื้อไฟจากการไฟฟ้าหน่วยละประมาณ 4-5 บาท แต่พอขายคืนกลับได้แค่ 2.20 บาท เหตุผลหลักคือ โครงสร้างค่าไฟที่เราซื้อนั้นรวมค่าสายส่ง ค่าบำรุงรักษา และต้นทุนการผลิตไฟฟ้าในภาพรวมของประเทศแล้ว ในขณะที่ไฟที่เราขายคืนถือเป็นเพียง 'พลังงานดิบ' ที่จ่ายเข้าสู่ระบบ ดังนั้น การติดตั้งโซลาร์เซลล์ที่คุ้มค่าที่สุดคือ 'การเน้นผลิตเพื่อใช้เอง' ในช่วงกลางวันให้มากที่สุด เพื่อลดการซื้อไฟแพงๆ ส่วนการขายคืนควรเป็นเพียงทางเลือกสำหรับ 'ไฟส่วนเกิน' เท่านั้น",
      seoH2_4: "ข้อจำกัดและข้อควรระวัง",
      seoP_4: "การรับซื้อไฟคืนในโครงการนี้มีระยะเวลาสัญญากำหนดไว้ (เช่น 10 ปี) และขนาดกำลังการผลิตติดตั้งต้องไม่เกินที่การไฟฟ้ากำหนด (มักจะไม่เกิน 10 kW สำหรับระบบ 1 เฟส และ 50 kW สำหรับ 3 เฟส) นอกจากนี้ รายได้ที่ได้จากการขายไฟอาจต้องนำไปรวมคำนวณภาษีเงินได้บุคคลธรรมดาด้วย"
    },
    EN: {
      title: "Net Metering Revenue Calculator",
      systemCapacity: "Solar System Capacity (kW)",
      sunlightHours: "Avg. Sunlight Hours/Day",
      sellPercentage: "Percentage of Power Sold (%)",
      sellRate: "Feed-in Tariff (Baht/kWh)",
      results: "Estimated Revenue",
      monthlyRev: "Monthly Revenue",
      yearlyRev: "Yearly Revenue",
      monthlyGen: "Monthly Generation",
      soldAmount: "Power Sold to Grid",
      selfUseAmount: "Self-Consumed Power",
      kwh: "kWh",
      baht: "Baht",
      infoSell: "Sell",
      infoUse: "Use",
      seoTitle: "Net Metering Revenue Calculator (Solar Rooftop)",
      seoH2_1: "What is the Solar Net Metering Program?",
      seoP_1: "The solar net metering program allows residential users who install solar rooftop systems to sell their 'excess' generated electricity back to the grid (MEA or PEA) at a fixed feed-in tariff (currently 2.20 Baht/kWh in Thailand). This calculator helps you estimate your potential monthly and yearly revenue if you plan to sell excess power back.",
      seoH2_2: "How to participate and sell power back?",
      seoP_2: "1. Must be a residential electricity user (Type 1). \n2. Install a standardized solar system with certified equipment. \n3. Apply for parallel connection and selling permits with the local utility. \n4. The utility will replace your meter with a Bidirectional Meter to track both inflow and outflow of power. \n5. Sign the power purchase agreement.",
      seoH2_3: "Why is the feed-in tariff lower than the retail electricity rate?",
      seoP_3: "When buying electricity from the grid (around 4-5 Baht/kWh), the price includes generation costs, transmission lines, and grid maintenance. The power you sell back is treated as 'raw energy', thus priced lower (2.20 Baht/kWh). Therefore, the most cost-effective way to use solar is to maximize daytime self-consumption to offset expensive grid electricity, treating the feed-in tariff purely as a bonus for any unavoidable excess.",
      seoH2_4: "Limitations and Considerations",
      seoP_4: "The program typically involves a long-term contract (e.g., 10 years). There are capacity limits for residential installations (e.g., max 10 kW for single-phase, 50 kW for three-phase). Note that income generated from selling electricity might be subject to personal income tax."
    }
  };

  const text = t[lang as keyof typeof t] || t.TH;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-2">
          <Wallet className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{text.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{text.systemCapacity}</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{text.sunlightHours}</label>
            <input
              type="number"
              value={sunlightHours}
              onChange={(e) => setSunlightHours(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              min="1"
              max="12"
              step="0.1"
            />
          </div>

          <div className="pt-4 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {text.sellPercentage} ({sellPercentage}%)
            </label>
            <input
              type="range"
              value={sellPercentage}
              onChange={(e) => setSellPercentage(Number(e.target.value))}
              className="w-full accent-green-500"
              min="0"
              max="100"
              step="1"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0% ({text.infoUse})</span>
              <span>100% ({text.infoSell})</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{text.sellRate}</label>
            <input
              type="number"
              value={sellRate}
              onChange={(e) => setSellRate(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              min="0"
              step="0.1"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
            <h3 className="text-lg font-semibold text-green-800 mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              {text.results}
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl shadow-sm text-center">
                <div className="text-sm text-gray-500 mb-1">{text.monthlyRev}</div>
                <div className="text-4xl font-bold text-green-600 mb-1">
                  {monthlyRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-sm text-gray-400">{text.baht}</div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
                <div className="text-gray-600 font-medium">{text.yearlyRev}</div>
                <div className="text-xl font-bold text-green-700">
                  {yearlyRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })} <span className="text-sm font-normal text-gray-500">{text.baht}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-3 rounded-xl shadow-sm text-center border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">{text.soldAmount}</div>
                  <div className="font-semibold text-blue-600">
                    {kwhSoldMonthly.toFixed(0)} {text.kwh}
                  </div>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm text-center border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">{text.selfUseAmount}</div>
                  <div className="font-semibold text-amber-600">
                    {kwhSelfUseMonthly.toFixed(0)} {text.kwh}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 leading-relaxed">
              {lang === 'EN' 
                ? "Revenue estimates are based on averages. Actual generation varies by weather. Net metering requires utility approval and specific meter installation."
                : "การประเมินรายได้เป็นเพียงค่าเฉลี่ยเบื้องต้น การขายไฟจริงต้องผ่านการอนุมัติและเปลี่ยนมิเตอร์จากการไฟฟ้า และรายได้อาจแปรผันตามปริมาณแสงแดดในแต่ละเดือน"
              }
            </p>
          </div>
        </div>
      </div>

      <article className="mt-12 prose prose-stone max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{text.seoTitle}</h2>
        <p className="mb-6 leading-relaxed">{text.seoP_1}</p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">{text.seoH2_2}</h3>
        <p className="mb-6 leading-relaxed whitespace-pre-line">{text.seoP_2}</p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">{text.seoH2_3}</h3>
        <p className="mb-6 leading-relaxed">{text.seoP_3}</p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">{text.seoH2_4}</h3>
        <p className="mb-6 leading-relaxed">{text.seoP_4}</p>
      </article>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Bird, Coins, TrendingUp, Sun } from "lucide-react";

export default function BroilerChickenFarmCalculator({ lang }: { lang: "TH" | "EN" }) {
  const [birdsStocked, setBirdsStocked] = useState<number>(10000); // จำนวนตัวเข้าเลี้ยง ต่อโรงเรือน
  const [survivalRate, setSurvivalRate] = useState<number>(95); // เปอร์เซ็นต์รอด
  const [averageWeight, setAverageWeight] = useState<number>(2.4); // กก. ต่อตัว เมื่อจับ
  const [pricePerKg, setPricePerKg] = useState<number>(42); // บาท ต่อ กก.

  // Costs (Per Batch ~ 40-45 days)
  const [chickCost, setChickCost] = useState<number>(150000); // ค่าลูกไก่เนื้อ
  const [feedCost, setFeedCost] = useState<number>(550000); // ค่าอาหารไก่
  const [vaccineCost, setVaccineCost] = useState<number>(15000); // ค่ายาและวัคซีน
  const [electricityCost, setElectricityCost] = useState<number>(20000); // ค่าไฟและน้ำ (โรงเรือน EVAP)
  const [beddingCost, setBeddingCost] = useState<number>(10000); // ค่าแกลบ/วัสดุรองพื้น
  const [laborCost, setLaborCost] = useState<number>(15000); // ค่าแรงคนเลี้ยง/จับไก่
  const [otherCost, setOtherCost] = useState<number>(5000);

  // Calculations
  const totalBirdsHarvested = birdsStocked * (survivalRate / 100);
  const totalYieldKg = totalBirdsHarvested * averageWeight;
  
  const totalRevenue = totalYieldKg * pricePerKg;
  
  const totalCost = chickCost + feedCost + vaccineCost + electricityCost + beddingCost + laborCost + otherCost;
  
  const netProfit = totalRevenue - totalCost;
  const costPerKg = totalYieldKg > 0 ? totalCost / totalYieldKg : 0;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-red-700 flex items-center justify-center gap-2">
        <Bird className="w-8 h-8" />
        {lang === "EN" ? "Broiler Chicken Farm Profit Calculator" : "เครื่องมือคำนวณต้นทุนและกำไรฟาร์มไก่เนื้อ"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-red-50 p-4 rounded-xl border border-red-100">
            <h2 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
              <Sun className="w-5 h-5" />
              {lang === "EN" ? "Production Data (Per Batch)" : "ข้อมูลการผลิต (ต่อ 1 รุ่น / 1 โรงเรือน)"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Number of Chicks Stocked" : "จำนวนไก่ที่ลงเลี้ยง (ตัว)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={birdsStocked}
                  onChange={(e) => setBirdsStocked(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Survival Rate (%)" : "อัตรารอด (%)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={survivalRate}
                    onChange={(e) => setSurvivalRate(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Avg. Weight/Bird (Kg)" : "น้ำหนักจับเฉลี่ย (กก./ตัว)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={averageWeight}
                    onChange={(e) => setAverageWeight(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Selling Price (THB/Kg)" : "ราคาขาย (บาท/กก.)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={pricePerKg}
                  onChange={(e) => setPricePerKg(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="p-3 bg-white rounded-lg border border-red-200">
                <p className="text-sm text-red-800 font-medium flex flex-col sm:flex-row sm:justify-between">
                  <span>{lang === "EN" ? "Estimated Harvest Weight:" : "คาดการณ์น้ำหนักไก่รวม:"}</span> 
                  <span className="text-lg font-bold">{totalYieldKg.toLocaleString(undefined, { maximumFractionDigits: 1 })} กก.</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <h2 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5" />
              {lang === "EN" ? "Costs per Batch (THB)" : "ต้นทุนรวมต่อรุ่น (บาท)"}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Day-old Chicks" : "ค่าลูกไก่"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={chickCost}
                    onChange={(e) => setChickCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Chicken Feed" : "ค่าอาหารไก่"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={feedCost}
                    onChange={(e) => setFeedCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Vaccine / Meds" : "ค่ายาและวัคซีน"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={vaccineCost}
                    onChange={(e) => setVaccineCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Electricity/Water" : "ค่าไฟและน้ำ"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={electricityCost}
                    onChange={(e) => setElectricityCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Bedding (Rice husks)" : "ค่าแกลบ/วัสดุรองพื้น"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={beddingCost}
                    onChange={(e) => setBeddingCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Labor Cost" : "ค่าแรงงาน"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={laborCost}
                    onChange={(e) => setLaborCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Other Costs" : "ค่าใช้จ่ายอื่นๆ"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={otherCost}
                    onChange={(e) => setOtherCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit sticky top-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-red-600" />
            {lang === "EN" ? "Financial Summary (per Batch)" : "สรุปผลการเงิน (ต่อรุ่น)"}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">{lang === "EN" ? "Total Revenue" : "รายรับรวม"}</span>
              <span className="text-xl font-bold text-green-600">
                {totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿
              </span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">{lang === "EN" ? "Total Cost" : "ต้นทุนรวม"}</span>
              <span className="text-xl font-bold text-red-500">
                {totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600 font-semibold">{lang === "EN" ? "Net Profit" : "กำไรสุทธิรวม"}</span>
              <span className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">{lang === "EN" ? "Production Cost (per Kg)" : "ต้นทุนการผลิต (บาท/กก.)"}</span>
              <span className={`text-lg font-semibold ${costPerKg < pricePerKg ? 'text-green-600' : 'text-red-600'}`}>
                {costPerKg.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">{lang === "EN" ? "Return on Investment (ROI)" : "ผลตอบแทนจากการลงทุน (ROI)"}</span>
              <span className={`text-lg font-semibold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {roi.toFixed(2)} %
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <div className="mt-12 prose max-w-none">
        <h2 className="text-2xl font-bold text-red-800 mb-4">
          การวิเคราะห์ต้นทุนและบริหารกำไรฟาร์มไก่เนื้อ (Broiler Farm Management)
        </h2>
        <p>
          อุตสาหกรรมการเลี้ยงไก่เนื้อของไทยมีความก้าวหน้าและเป็นที่ยอมรับในระดับโลก การเลี้ยงไก่เนื้อในปัจจุบันส่วนใหญ่เป็นการเลี้ยงในระบบโรงเรือนปิดปรับอากาศ (EVAP - Evaporative Cooling System) เพื่อควบคุมอุณหภูมิ ป้องกันโรคระบาด และเร่งการเจริญเติบโตให้ได้ตามเป้าหมาย โดยเฉลี่ยแล้วไก่เนื้อหนึ่งรุ่นจะใช้เวลาเลี้ยงเพียง 40-45 วัน ก็สามารถจับขายได้ ทำให้ใน 1 ปี เกษตรกรสามารถทำรอบการเลี้ยงได้ถึง 5-6 รุ่น
        </p>

        <h3 className="text-xl font-semibold text-red-700 mt-6 mb-3">
          เจาะลึกโครงสร้างต้นทุนฟาร์มไก่เนื้อต่อ 1 รุ่น
        </h3>
        <p>
          ในการเลี้ยงแต่ละรุ่น เกษตรกรต้องแบกรับต้นทุนหลักๆ ดังต่อไปนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ค่าอาหารไก่ (Feed Cost):</strong> เป็นต้นทุนมหาศาลที่สุด คิดเป็น 60-70% ของต้นทุนทั้งหมด การจัดการให้อาหารไก่เนื้อต้องคำนึงถึง <strong>ค่า FCR (Feed Conversion Ratio)</strong> หรืออัตราแลกเนื้อ หากไก่กินอาหารแล้วน้ำหนักตัวเพิ่มขึ้นได้มาตรฐาน (FCR ต่ำ) ก็จะช่วยประหยัดค่าอาหารและเพิ่มกำไรได้มาก</li>
          <li><strong>ค่าลูกไก่ (Day-old Chicks):</strong> เป็นต้นทุนคงที่ต่อรุ่น การได้ลูกไก่จากโรงฟักที่มีมาตรฐาน จะทำให้ลูกไก่แข็งแรงและมีอัตราการรอดตายสูง</li>
          <li><strong>ค่าไฟฟ้าและพลังงาน:</strong> ระบบโรงเรือน EVAP ต้องอาศัยพัดลมดูดอากาศและปั๊มน้ำหล่อเย็นแผ่นแพด (Cooling Pad) ตลอด 24 ชั่วโมง รวมถึงไฟกกลูกไก่ในช่วงแรกเกิด ทำให้ค่าไฟเป็นหนึ่งในต้นทุนแฝงที่สูงมาก</li>
          <li><strong>ค่ายา วัคซีน และวัสดุรองพื้น (แกลบ):</strong> เพื่อป้องกันโรคและรักษาสุขภาพเท้าและหน้าอกไก่ไม่ให้เกิดรอยช้ำหรือบาดแผล</li>
        </ul>

        <h3 className="text-xl font-semibold text-red-700 mt-6 mb-3">
          เคล็ดลับการสร้างกำไรในฟาร์มไก่เนื้อ
        </h3>
        <p>
          นอกจากการควบคุมค่า FCR แล้ว สิ่งที่กำหนดความสำเร็จของการเลี้ยงไก่เนื้อคือ <strong>"เปอร์เซ็นต์การรอดชีวิต"</strong> และ <strong>"น้ำหนักจับเฉลี่ย"</strong> 
          <br /><br />
          ไก่เนื้อเป็นสัตว์ที่ไวต่อสภาพอากาศและความเครียด หากระบบระบายอากาศขัดข้องเพียงไม่กี่ชั่วโมง อาจทำให้ไก่น็อกตายยกเล้าได้ การมีเครื่องปั่นไฟสำรองและมีผู้ดูแลอย่างใกล้ชิดจึงจำเป็นอย่างยิ่ง สำหรับเกษตรกรที่เลี้ยงแบบพันธสัญญา (Contract Farming) กับบริษัทใหญ่ ราคาขายและค่าอาหารอาจถูกกำหนดไว้ล่วงหน้า กำไรของท่านจึงขึ้นอยู่กับ "ประสิทธิภาพการจัดการฟาร์ม" ล้วนๆ
        </p>

        <h3 className="text-xl font-semibold text-red-700 mt-6 mb-3">
          การประเมินจุดคุ้มทุนด้วยโปรแกรม
        </h3>
        <p>
          โปรแกรมคำนวณกำไรฟาร์มไก่เนื้อนี้ จะช่วยให้เกษตรกรสามารถเช็ค <strong>"ต้นทุนการผลิตต่อกิโลกรัม" (Cost per Kg)</strong> ได้อย่างรวดเร็ว โดยนำต้นทุนทั้งหมดมาหารด้วยน้ำหนักไก่รวมที่จับได้ หากต้นทุนส่วนนี้ต่ำกว่าราคาขายที่ท่านตกลงไว้ (หรือราคาตลาด) ส่วนต่างที่ได้ก็คือกำไรสุทธิเข้ากระเป๋าของท่านนั่นเอง การทำบันทึกและจำลองต้นทุนผ่านโปรแกรม จะช่วยให้ท่านวางแผนสั่งซื้ออาหารและประเมินผลกำไรแต่ละรอบได้อย่างมั่นใจยิ่งขึ้น
        </p>
      </div>
    </div>
  );
}

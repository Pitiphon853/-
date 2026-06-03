"use client";

import React, { useState } from "react";
import { Waves, Coins, TrendingUp, Droplet } from "lucide-react";

export default function WhiteShrimpFarmCalculator({ lang }: { lang: "TH" | "EN" }) {
  const [pondArea, setPondArea] = useState<number>(1); // ไร่ ต่อ 1 บ่อ
  const [stockingDensity, setStockingDensity] = useState<number>(100000); // ตัว ต่อไร่ (ลูกกุ้ง)
  const [survivalRate, setSurvivalRate] = useState<number>(70); // เปอร์เซ็นต์รอด
  const [harvestSize, setHarvestSize] = useState<number>(60); // จำนวนตัว ต่อ กิโลกรัม
  const [pricePerKg, setPricePerKg] = useState<number>(140); // บาท ต่อ กก.

  // Costs (Per Crop ~ 3-4 months)
  const [postLarvaeCost, setPostLarvaeCost] = useState<number>(12000); // ค่าลูกกุ้ง ต่อบ่อ
  const [feedCost, setFeedCost] = useState<number>(150000); // ค่าอาหารกุ้ง (คิดรวมเป็นก้อนต่อบ่อ)
  const [electricityCost, setElectricityCost] = useState<number>(30000); // ค่าไฟ (เครื่องตีน้ำ/ปั๊มน้ำ)
  const [chemicalCost, setChemicalCost] = useState<number>(20000); // ค่ายา/แร่ธาตุ/จุลินทรีย์/สารปรับสภาพน้ำ
  const [laborCost, setLaborCost] = useState<number>(15000); // ค่าจ้างแรงงานดูแลต่อรอบ
  const [pondPrepCost, setPondPrepCost] = useState<number>(10000); // ค่าเตรียมบ่อ/ลอกเลน
  const [otherCost, setOtherCost] = useState<number>(5000);

  // Calculations
  const totalShrimpHarvested = stockingDensity * pondArea * (survivalRate / 100);
  const totalYieldKg = totalShrimpHarvested / harvestSize;
  
  const totalRevenue = totalYieldKg * pricePerKg;
  
  const totalCost = postLarvaeCost + feedCost + electricityCost + chemicalCost + laborCost + pondPrepCost + otherCost;
  
  const netProfit = totalRevenue - totalCost;
  const costPerKg = totalYieldKg > 0 ? totalCost / totalYieldKg : 0;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-700 flex items-center justify-center gap-2">
        <Waves className="w-8 h-8" />
        {lang === "EN" ? "White Shrimp Farm Profit Calculator" : "เครื่องมือคำนวณต้นทุนและกำไรฟาร์มกุ้งขาว"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h2 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <Droplet className="w-5 h-5" />
              {lang === "EN" ? "Production Data (Per Pond/Crop)" : "ข้อมูลการเลี้ยง (ต่อ 1 บ่อ / 1 ครอป)"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Pond Size (Rai)" : "ขนาดบ่อ (ไร่)"}
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={pondArea}
                  onChange={(e) => setPondArea(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "PL Stocking/Rai" : "จำนวนลูกกุ้ง (ตัว/ไร่)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stockingDensity}
                    onChange={(e) => setStockingDensity(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Harvest Size (pcs/Kg)" : "ไซส์จับ (ตัว/กก.)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={harvestSize}
                    onChange={(e) => setHarvestSize(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium">
                  {lang === "EN" ? "Estimated Harvest:" : "คาดการณ์ผลผลิต:"} <span className="text-lg font-bold">{totalYieldKg.toLocaleString(undefined, { maximumFractionDigits: 1 })} กก.</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-100">
            <h2 className="text-lg font-semibold text-cyan-800 mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5" />
              {lang === "EN" ? "Costs per Crop (THB)" : "ต้นทุนรวมต่อรอบการเลี้ยง (บาท)"}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Post Larvae (PL)" : "ค่าลูกกุ้ง (PL)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={postLarvaeCost}
                    onChange={(e) => setPostLarvaeCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Shrimp Feed" : "ค่าอาหารกุ้ง"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={feedCost}
                    onChange={(e) => setFeedCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Electricity / Aeration" : "ค่าไฟฟ้า (เครื่องตีน้ำ)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={electricityCost}
                    onChange={(e) => setElectricityCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Minerals & Probiotics" : "ค่ายา/แร่ธาตุ/จุลินทรีย์"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={chemicalCost}
                    onChange={(e) => setChemicalCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Labor Cost" : "ค่าจ้างแรงงานดูแล"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={laborCost}
                    onChange={(e) => setLaborCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Pond Prep / Cleaning" : "ค่าเตรียมบ่อ/ลอกเลน"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={pondPrepCost}
                    onChange={(e) => setPondPrepCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit sticky top-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            {lang === "EN" ? "Financial Summary" : "สรุปผลการเงิน (ต่อบ่อ / รอบ)"}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">{lang === "EN" ? "Total Revenue" : "รายรับรวม"}</span>
              <span className="text-xl font-bold text-blue-600">
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
              <span className={`text-2xl font-bold ${netProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
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
              <span className={`text-lg font-semibold ${roi >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {roi.toFixed(2)} %
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <div className="mt-12 prose max-w-none">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          การบริหารต้นทุนและกำไร ในการทำฟาร์มกุ้งขาวแวนนาไม (White Shrimp Farming)
        </h2>
        <p>
          การเลี้ยงกุ้งขาวแวนนาไม เป็นหนึ่งในอุตสาหกรรมสัตว์น้ำที่มีมูลค่าสูงและสร้างรายได้หลักให้กับประเทศไทย อย่างไรก็ตาม อาชีพนี้มาพร้อมกับความเสี่ยงสูง (High Risk, High Return) ทั้งในเรื่องของโรคระบาด (เช่น EMS, ขี้ขาว) สภาพอากาศ และราคาตลาดโลกที่ผันผวน ดังนั้น <strong>การคำนวณและบริหารจัดการต้นทุนการเลี้ยงกุ้ง</strong> อย่างแม่นยำ จึงเป็นปัจจัยชี้ขาดความอยู่รอดและกำไรของเกษตรกรผู้เลี้ยงกุ้ง
        </p>

        <h3 className="text-xl font-semibold text-blue-700 mt-6 mb-3">
          เจาะลึกโครงสร้างต้นทุนฟาร์มกุ้ง (ต่อ 1 ครอป / 1 รอบการเลี้ยง)
        </h3>
        <p>
          ในการเลี้ยงกุ้งแต่ละรอบ (ใช้เวลาประมาณ 3-4 เดือน หรือ 90-120 วัน) จะมีโครงสร้างต้นทุนหลักดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ค่าอาหารกุ้ง (Feed Cost):</strong> ถือเป็นต้นทุนที่หนักที่สุด คิดเป็นประมาณ 50-60% ของต้นทุนทั้งหมด การจัดการให้อาหารอย่างมีประสิทธิภาพ (พิจารณาค่า FCR - Feed Conversion Ratio) โดยไม่เหลือทิ้ง ไม่เพียงแต่ช่วยประหยัดเงิน แต่ยังช่วยรักษาสภาพน้ำไม่ให้เน่าเสีย</li>
          <li><strong>ค่าไฟฟ้า (Electricity Cost):</strong> กุ้งขาวเป็นสัตว์ที่ต้องการออกซิเจนละลายน้ำ (DO) สูงมาก การเดินเครื่องตีน้ำ (Paddle wheels) และระบบเติมอากาศตลอดยี่สิบสี่ชั่วโมง จึงมีส่วนแบ่งต้นทุนที่สูงเป็นอันดับสอง</li>
          <li><strong>ค่าลูกกุ้ง (PL - Post Larvae):</strong> การเลือกซื้อลูกกุ้งสายพันธุ์ดี โตไว ต้านทานโรค จากโรงเพาะฟักที่ได้มาตรฐาน แม้จะราคาสูงกว่าปกติเล็กน้อยแต่จะส่งผลดีต่ออัตรารอดและลดความเสี่ยงขาดทุนได้มาก</li>
          <li><strong>ค่ายา แร่ธาตุ และสารปรับสภาพน้ำ:</strong> เพื่อรักษาสมดุลของแพลงก์ตอน ความเป็นกรดด่าง (pH) และเสริมสร้างความแข็งแรงของเปลือกกุ้ง (เช่น การสาดแร่ธาตุ ปูนขาว และการใช้จุลินทรีย์ ปม.1)</li>
        </ul>

        <h3 className="text-xl font-semibold text-blue-700 mt-6 mb-3">
          ตัวแปรที่กำหนด "กำไร" ของคนเลี้ยงกุ้ง
        </h3>
        <p>
          สมการกำไรของการเลี้ยงกุ้งไม่ได้ซับซ้อน แต่ควบคุมได้ยาก ปัจจัยหลักคือ <strong>"อัตรารอด" (Survival Rate)</strong> และ <strong>"ไซส์จับ" (ตัว/กิโลกรัม)</strong> 
          <br /><br />
          หากบริหารจัดการน้ำและอาหารได้ดี กุ้งมีอัตรารอดสูงถึง 70-80% และเลี้ยงจนได้ไซส์ใหญ่ (เช่น 40-50 ตัว/กก.) เกษตรกรจะสามารถขายได้ในราคาที่สูงมาก แต่หากกุ้งป่วย ต้องบังคับจับก่อนกำหนด (ไซส์เล็ก เช่น 80-100 ตัว/กก.) รายได้ก็อาจจะไม่ครอบคลุมต้นทุนค่าอาหารและค่าไฟที่เสียไป
        </p>

        <h3 className="text-xl font-semibold text-blue-700 mt-6 mb-3">
          การหาจุดคุ้มทุนด้วยโปรแกรมคำนวณ
        </h3>
        <p>
          โปรแกรมนี้ช่วยให้ท่านสามารถจำลองสถานการณ์ (Scenario) ได้อย่างง่ายดาย เช่น หากเราปล่อยกุ้งความหนาแน่นเท่านี้ และคาดหวังอัตรารอดที่ 70% <strong>ต้นทุนการผลิตต่อกิโลกรัม</strong> ของเราจะอยู่ที่เท่าไหร่? ตัวเลขนี้ (Cost per Kg) สำคัญมาก เพราะหากราคาตลาดลงมาแตะหรือต่ำกว่าต้นทุนการผลิตของเรา เราจะได้วางแผนปรับลดความหนาแน่น หรือหาทางลดต้นทุนในรอบการเลี้ยงถัดไปได้อย่างทันท่วงที
        </p>
      </div>
    </div>
  );
}

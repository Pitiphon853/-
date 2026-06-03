"use client";

import React, { useState } from "react";
import { Trees, Coins, TrendingUp, Sun } from "lucide-react";

export default function MangoFarmingCalculator({ lang }: { lang: "TH" | "EN" }) {
  const [area, setArea] = useState<number>(10); // ไร่
  const [yieldPerRai, setYieldPerRai] = useState<number>(1500); // กก. ต่อไร่ ต่อปี
  const [pricePerKg, setPricePerKg] = useState<number>(25); // บาท ต่อ กก.

  // Costs (Per Year per Rai)
  const [fertilizerCost, setFertilizerCost] = useState<number>(1500); // ค่าปุ๋ย
  const [chemicalCost, setChemicalCost] = useState<number>(2500); // ค่ายาฆ่าแมลง/เชื้อรา/ฮอร์โมน/สารราด
  const [baggingCost, setBaggingCost] = useState<number>(1200); // ค่าถุงห่อ และ ค่าแรงห่อมะม่วง
  const [laborCost, setLaborCost] = useState<number>(1000); // ค่าตัดแต่งกิ่ง ตัดหญ้า
  const [harvestCost, setHarvestCost] = useState<number>(1000); // ค่าเก็บเกี่ยวและคัดเกรด
  const [otherCost, setOtherCost] = useState<number>(500);

  const totalRevenue = area * yieldPerRai * pricePerKg;
  
  const costPerRai = fertilizerCost + chemicalCost + baggingCost + laborCost + harvestCost + otherCost;
  const totalCost = area * costPerRai;
  
  const netProfit = totalRevenue - totalCost;
  const profitPerRai = netProfit / area;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-yellow-600 flex items-center justify-center gap-2">
        <Trees className="w-8 h-8" />
        {lang === "EN" ? "Mango Farming Profit Calculator" : "เครื่องมือคำนวณต้นทุนและกำไรสวนมะม่วง"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
            <h2 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center gap-2">
              <Sun className="w-5 h-5" />
              {lang === "EN" ? "Production Data (Per Year)" : "ข้อมูลการผลิต (ต่อปี)"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Farming Area (Rai)" : "พื้นที่สวนมะม่วง (ไร่)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Estimated Yield (Kg/Rai/Year)" : "ผลผลิตเฉลี่ย (กิโลกรัม/ไร่/ปี)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={yieldPerRai}
                  onChange={(e) => setYieldPerRai(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Average Selling Price (THB/Kg)" : "ราคาขายเฉลี่ย (บาท/กิโลกรัม)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={pricePerKg}
                  onChange={(e) => setPricePerKg(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
            <h2 className="text-lg font-semibold text-amber-800 mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5" />
              {lang === "EN" ? "Costs per Rai per Year (THB)" : "ต้นทุนต่อไร่ ต่อปี (บาท)"}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Fertilizer" : "ค่าปุ๋ย"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={fertilizerCost}
                    onChange={(e) => setFertilizerCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Chemicals/Hormones" : "ค่ายา/ฮอร์โมน/สารราด"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={chemicalCost}
                    onChange={(e) => setChemicalCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Bagging (Materials & Labor)" : "ค่าถุงห่อ + แรงงานห่อ"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={baggingCost}
                    onChange={(e) => setBaggingCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Pruning/Weeding Labor" : "ค่าตัดแต่งกิ่ง/ตัดหญ้า"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={laborCost}
                    onChange={(e) => setLaborCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Harvesting/Grading" : "ค่าเก็บเกี่ยว/คัดเกรด"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={harvestCost}
                    onChange={(e) => setHarvestCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Other Costs" : "ค่าใช้จ่ายอื่นๆ"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={otherCost}
                    onChange={(e) => setOtherCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit sticky top-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-yellow-600" />
            {lang === "EN" ? "Annual Financial Summary" : "สรุปผลการเงินรายปี"}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">{lang === "EN" ? "Total Annual Revenue" : "รายรับรวมต่อปี"}</span>
              <span className="text-xl font-bold text-green-600">
                {totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿
              </span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">{lang === "EN" ? "Total Annual Cost" : "ต้นทุนรวมต่อปี"}</span>
              <span className="text-xl font-bold text-red-500">
                {totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600 font-semibold">{lang === "EN" ? "Net Annual Profit" : "กำไรสุทธิรวมต่อปี"}</span>
              <span className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">{lang === "EN" ? "Profit per Rai/Year" : "กำไรต่อไร่ ต่อปี"}</span>
              <span className={`text-lg font-semibold ${profitPerRai >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {profitPerRai.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿
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
        <h2 className="text-2xl font-bold text-yellow-800 mb-4">
          การวิเคราะห์ต้นทุนและกำไรจากการทำสวนมะม่วงเชิงพาณิชย์
        </h2>
        <p>
          มะม่วง เป็นไม้ผลเศรษฐกิจที่มีศักยภาพการส่งออกสูงมาก ทั้งมะม่วงน้ำดอกไม้สีทอง มะม่วงเขียวเสวย และมะม่วงฟ้าลั่น การทำสวนมะม่วงเชิงพาณิชย์ให้ประสบความสำเร็จ ไม่ใช่แค่การปล่อยให้ต้นออกผลตามธรรมชาติ แต่ต้องอาศัยเทคโนโลยีการเกษตรและการวางแผน <strong>คำนวณต้นทุน-กำไร</strong> อย่างรอบคอบ เพื่อผลิตมะม่วงให้ได้เกรดพรีเมียม ตรงตามความต้องการของตลาด
        </p>

        <h3 className="text-xl font-semibold text-yellow-700 mt-6 mb-3">
          เจาะลึกโครงสร้างต้นทุนสวนมะม่วงในวัยให้ผลผลิต
        </h3>
        <p>
          เมื่อต้นมะม่วงโตเต็มที่และเริ่มให้ผลผลิตอย่างเต็มเม็ดเต็มหน่วย ต้นทุนรายปีจะแบ่งออกเป็นหมวดหมู่หลักๆ ดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ค่ายา สารเคมี และฮอร์โมน:</strong> เป็นต้นทุนที่สูงเป็นอันดับต้นๆ ของสวนมะม่วง เริ่มตั้งแต่การใช้ <strong>"สารราดมะม่วง" (Paclobutrazol)</strong> เพื่อควบคุมการแตกใบอ่อนและกระตุ้นการออกดอก การฉีดพ่นฮอร์โมนบำรุงช่อดอก ไปจนถึงยาป้องกันเชื้อรา (เช่น โรคแอนแทรกโนส) และยาฆ่าแมลง (เช่น เพลี้ยจักจั่น)</li>
          <li><strong>ค่าถุงห่อและแรงงานห่อมะม่วง:</strong> การ "ห่อมะม่วง" เป็นกระบวนการที่ขาดไม่ได้สำหรับมะม่วงเกรดส่งออก (โดยเฉพาะน้ำดอกไม้) เพื่อให้ผิวเนียนสวย สีเหลืองทอง ปราศจากรอยแมลงเจาะ ถือเป็นต้นทุนค่าแรงและค่าวัสดุที่ค่อนข้างสูงแต่คุ้มค่ามากกับราคาขายที่เพิ่มขึ้น</li>
          <li><strong>ค่าตัดแต่งกิ่ง (Pruning):</strong> หลังการเก็บเกี่ยว ต้องมีการตัดแต่งกิ่งให้ทรงพุ่มโปร่ง แสงแดดส่องถึง เพื่อลดการสะสมของโรคและเตรียมพร้อมสำหรับรอบการผลิตถัดไป</li>
          <li><strong>ค่าปุ๋ยบำรุงต้นและผล:</strong> การใส่ปุ๋ยอินทรีย์ควบคู่กับปุ๋ยเคมีตามระยะการเติบโต จะช่วยให้ผลมะม่วงมีขนาดใหญ่และรสชาติดี</li>
        </ul>

        <h3 className="text-xl font-semibold text-yellow-700 mt-6 mb-3">
          กลยุทธ์การทำ "มะม่วงนอกฤดู" เพื่อเพิ่มกำไร
        </h3>
        <p>
          ราคามะม่วงในฤดูกาล (ช่วงเดือนเมษายน-พฤษภาคม) มักจะตกต่ำเนื่องจากผลผลิตล้นตลาด ชาวสวนมืออาชีพจึงนิยมทำ <strong>"มะม่วงนอกฤดู"</strong> โดยการใช้สารควบคุมการเจริญเติบโต เพื่อบังคับให้มะม่วงออกผลในช่วงที่ตลาดขาดแคลน (เช่น ช่วงปลายปีหรือต้นปี) ซึ่งจะทำให้ <strong>ราคาขายเฉลี่ยต่อกิโลกรัมสูงขึ้นหลายเท่าตัว</strong> แม้ว่าจะมีต้นทุนการดูแลที่เพิ่มขึ้น แต่เมื่อนำมาคำนวณกำไรสุทธิแล้ว จะพบว่าให้ผลตอบแทนจากการลงทุน (ROI) ที่สูงกว่ามาก
        </p>

        <h3 className="text-xl font-semibold text-yellow-700 mt-6 mb-3">
          การประยุกต์ใช้โปรแกรมคำนวณ
        </h3>
        <p>
          เกษตรกรสามารถใช้โปรแกรมนี้ในการจำลองสถานการณ์ เช่น หากตั้งเป้าผลิตมะม่วงเกรด A จะต้องเพิ่มต้นทุนค่าห่อผลและค่าฮอร์โมนเท่าใด และเมื่อเทียบกับราคาขายเกรดพรีเมียมแล้ว กำไรต่อไร่จะเพิ่มขึ้นคุ้มค่าหรือไม่ ข้อมูลเหล่านี้จะเป็นเครื่องมือชั้นดีในการตัดสินใจและบริหารจัดการสวนมะม่วงให้เกิดประสิทธิภาพสูงสุด
        </p>
      </div>
    </div>
  );
}

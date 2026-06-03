"use client";

import React, { useState } from "react";
import { Sprout, Coins, TrendingUp, Tractor } from "lucide-react";

export default function CassavaFarmingCalculator({ lang }: { lang: "TH" | "EN" }) {
  const [area, setArea] = useState<number>(10); // ไร่
  const [yieldPerRai, setYieldPerRai] = useState<number>(4000); // กก. ต่อไร่ (4 ตัน)
  const [pricePerKg, setPricePerKg] = useState<number>(3.0); // บาท ต่อ กก. (ขึ้นกับ % แป้ง)

  // Costs
  const [stemCost, setStemCost] = useState<number>(400); // ค่าท่อนพันธุ์ บาท ต่อไร่
  const [landPrepCost, setLandPrepCost] = useState<number>(1000); // ค่าไถ/ยกร่อง
  const [fertilizerCost, setFertilizerCost] = useState<number>(1200); // ค่าปุ๋ย/ยา
  const [laborCost, setLaborCost] = useState<number>(800); // ค่าปลูก/กำจัดหญ้า
  const [harvestCost, setHarvestCost] = useState<number>(1500); // ค่าขุดมัน/บรรทุก
  const [otherCost, setOtherCost] = useState<number>(300);

  const totalRevenue = area * yieldPerRai * pricePerKg;
  
  const costPerRai = stemCost + landPrepCost + fertilizerCost + laborCost + harvestCost + otherCost;
  const totalCost = area * costPerRai;
  
  const netProfit = totalRevenue - totalCost;
  const profitPerRai = netProfit / area;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-emerald-700 flex items-center justify-center gap-2">
        <Sprout className="w-8 h-8" />
        {lang === "EN" ? "Cassava Farming Profit Calculator" : "เครื่องมือคำนวณต้นทุนและกำไรปลูกมันสำปะหลัง"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
            <h2 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
              <Tractor className="w-5 h-5" />
              {lang === "EN" ? "Production Data" : "ข้อมูลการผลิต"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Farming Area (Rai)" : "พื้นที่ปลูก (ไร่)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Estimated Yield (Kg/Rai)" : "ผลผลิตเฉลี่ย (กิโลกรัม/ไร่)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={yieldPerRai}
                  onChange={(e) => setYieldPerRai(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-xs text-gray-500 mt-1">{lang === "EN" ? "Note: 1 Ton = 1,000 Kg" : "หมายเหตุ: 1 ตัน = 1,000 กิโลกรัม"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Selling Price (THB/Kg)" : "ราคาขาย (บาท/กิโลกรัม)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={pricePerKg}
                  onChange={(e) => setPricePerKg(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
            <h2 className="text-lg font-semibold text-amber-800 mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5" />
              {lang === "EN" ? "Costs per Rai (THB)" : "ต้นทุนต่อไร่ (บาท)"}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Cassava Stems" : "ค่าท่อนพันธุ์"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stemCost}
                    onChange={(e) => setStemCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Land Prep" : "ค่าเตรียมดิน/ยกร่อง"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={landPrepCost}
                    onChange={(e) => setLandPrepCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Fertilizer/Chemicals" : "ค่าปุ๋ย/ยา/ฮอร์โมน"}
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
                    {lang === "EN" ? "Labor/Weeding" : "ค่าแรงปลูก/ฉีดยา"}
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
                    {lang === "EN" ? "Harvesting/Transport" : "ค่าขุดมัน/ขนส่ง"}
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
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            {lang === "EN" ? "Financial Summary" : "สรุปผลการเงิน"}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">{lang === "EN" ? "Total Revenue" : "รายรับรวม"}</span>
              <span className="text-xl font-bold text-emerald-600">
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
              <span className={`text-2xl font-bold ${netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {netProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">{lang === "EN" ? "Profit per Rai" : "กำไรต่อไร่"}</span>
              <span className={`text-lg font-semibold ${profitPerRai >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {profitPerRai.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">{lang === "EN" ? "Return on Investment (ROI)" : "ผลตอบแทนจากการลงทุน (ROI)"}</span>
              <span className={`text-lg font-semibold ${roi >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {roi.toFixed(2)} %
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <div className="mt-12 prose max-w-none">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">
          การวิเคราะห์และคำนวณต้นทุน-กำไร ในการปลูกมันสำปะหลังให้ได้ผลผลิตสูง
        </h2>
        <p>
          มันสำปะหลัง เป็นพืชเศรษฐกิจสำคัญของประเทศไทยที่มีการส่งออกเป็นอันดับต้นๆ ของโลก ทั้งในรูปแบบของมันเส้น มันอัดเม็ด และแป้งมันสำปะหลัง ด้วยคุณสมบัติที่ทนแล้งและเติบโตได้ในดินหลายประเภท ทำให้มันสำปะหลังเป็นที่นิยมอย่างแพร่หลาย อย่างไรก็ตาม การปลูกให้ได้ผลผลิตต่อไร่สูงและมีกำไรคุ้มค่านั้น ต้องอาศัยการวางแผนและคำนวณ <strong>ต้นทุนการปลูกมันสำปะหลัง</strong> อย่างรัดกุม
        </p>

        <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">
          เจาะลึกโครงสร้างต้นทุนการปลูกมันสำปะหลัง
        </h3>
        <p>
          ปัจจัยต้นทุนหลักๆ ของการปลูกมันสำปะหลังที่เกษตรกรต้องคำนึงถึง ได้แก่:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ค่าท่อนพันธุ์:</strong> ควรเลือกสายพันธุ์ที่เหมาะสมกับสภาพดินและให้เปอร์เซ็นต์แป้งสูง เช่น พันธุ์ระยอง เกษตรศาสตร์ หรือห้วยบง การใช้ท่อนพันธุ์ที่สะอาด ปราศจากโรค (เช่น โรคใบด่างมันสำปะหลัง) จะช่วยลดความเสี่ยงขาดทุนได้มหาศาล</li>
          <li><strong>ค่าเตรียมดิน:</strong> มันสำปะหลังเป็นพืชลงหัว การไถระเบิดดินดานและการยกร่องให้สูงจะช่วยให้หัวมันขยายตัวได้ดี ถือเป็นการลงทุนที่คุ้มค่า</li>
          <li><strong>ค่าปุ๋ยและสารเคมี:</strong> การใส่ปุ๋ยเคมีหรือปุ๋ยอินทรีย์ตามค่าวิเคราะห์ดิน จะช่วยลดต้นทุนค่าปุ๋ยส่วนเกิน และให้ธาตุอาหารตรงกับความต้องการของพืช</li>
          <li><strong>ค่าแรงงานและกำจัดวัชพืช:</strong> ในช่วง 1-3 เดือนแรก การคุมวัชพืชมีความสำคัญมาก หากปล่อยให้หญ้ารก หัวมันจะไม่โต ซึ่งอาจใช้สารเคมีคุมหญ้าหรือใช้แรงงานคน/เครื่องจักรกล</li>
          <li><strong>ค่าเก็บเกี่ยวและขนส่ง:</strong> มักคิดเป็นราคาเหมาต่อตันหรือต่อไร่ การวางแผนขุดมันในช่วงเวลาที่ราคาดีจะช่วยเพิ่มส่วนต่างกำไรได้</li>
        </ul>

        <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">
          เปอร์เซ็นต์แป้ง ตัวแปรสำคัญกำหนดราคา
        </h3>
        <p>
          การขายมันสำปะหลังสด ลานมันหรือโรงแป้งจะทำการวัด <strong>"เปอร์เซ็นต์แป้ง"</strong> เป็นเกณฑ์ในการรับซื้อ โดยปกติจะอิงมาตรฐานที่ 25% หากมันสำปะหลังมีเปอร์เซ็นต์แป้งสูงกว่า 25% ก็จะได้ราคาบวกเพิ่ม ในทางกลับกัน หากขุดมันอ่อน (อายุไม่ถึง 10-12 เดือน) หรือเก็บเกี่ยวในช่วงฤดูฝน เปอร์เซ็นต์แป้งจะลดลง ทำให้ถูกหักราคา ดังนั้น การยืดเวลาขุดมันให้เหมาะสมจึงเป็นกลยุทธ์สำคัญในการเพิ่มรายได้
        </p>

        <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">
          ทำไมถึงต้องใช้โปรแกรมคำนวณกำไร?
        </h3>
        <p>
          เครื่องมือคำนวณต้นทุนและกำไรปลูกมันสำปะหลังที่จัดทำขึ้นนี้ ช่วยให้เกษตรกรสามารถใส่ตัวเลขการประเมินต่างๆ เช่น ผลผลิตเฉลี่ยที่คาดหวัง และราคาขาย เพื่อจำลองสถานการณ์ (Scenario) ล่วงหน้า ว่าหากต้นทุนเพิ่มขึ้น หรือราคาตลาดผันผวน ท่านจะยังมีกำไรสุทธิอยู่เท่าใด และมีผลตอบแทนจากการลงทุน (ROI) คุ้มค่ากับแรงกายและแรงใจที่ทุ่มเทไปตลอดทั้งปีหรือไม่ 
        </p>
      </div>
    </div>
  );
}

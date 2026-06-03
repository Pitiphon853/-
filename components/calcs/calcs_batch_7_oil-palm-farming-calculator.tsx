"use client";

import React, { useState } from "react";
import { Trees, Coins, TrendingUp, Droplet } from "lucide-react";

export default function OilPalmFarmingCalculator({ lang }: { lang: "TH" | "EN" }) {
  const [area, setArea] = useState<number>(20); // ไร่
  const [yieldPerRai, setYieldPerRai] = useState<number>(3.5); // ตัน ต่อไร่ ต่อปี
  const [pricePerKg, setPricePerKg] = useState<number>(5.5); // บาท ต่อ กก.

  // Costs (Per Year per Rai)
  const [fertilizerCost, setFertilizerCost] = useState<number>(2500); // ค่าปุ๋ย ต่อไร่/ปี (ปาล์มกินปุ๋ยเยอะ)
  const [weedControlCost, setWeedControlCost] = useState<number>(800); // ค่ากำจัดวัชพืช
  const [pruningCost, setPruningCost] = useState<number>(500); // ค่าแต่งทางใบ
  const [harvestCostPerTon, setHarvestCostPerTon] = useState<number>(500); // ค่าแทงปาล์ม/เก็บร่วง (บาท/ตัน)
  const [otherCost, setOtherCost] = useState<number>(400);

  // Convert yield to Kg for revenue calculation
  const totalYieldKg = area * yieldPerRai * 1000;
  const totalYieldTon = area * yieldPerRai;

  const totalRevenue = totalYieldKg * pricePerKg;
  
  // Harvest cost is dependent on yield
  const totalHarvestCost = totalYieldTon * harvestCostPerTon;
  const fixedCostPerRai = fertilizerCost + weedControlCost + pruningCost + otherCost;
  
  const totalCost = (area * fixedCostPerRai) + totalHarvestCost;
  
  const netProfit = totalRevenue - totalCost;
  const profitPerRai = netProfit / area;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-orange-700 flex items-center justify-center gap-2">
        <Trees className="w-8 h-8" />
        {lang === "EN" ? "Oil Palm Farming Profit Calculator" : "เครื่องมือคำนวณต้นทุนและกำไรสวนปาล์มน้ำมัน"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <h2 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
              <Droplet className="w-5 h-5" />
              {lang === "EN" ? "Production Data (Per Year)" : "ข้อมูลการผลิต (ต่อปี)"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Farming Area (Rai)" : "พื้นที่สวนปาล์ม (ไร่)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Estimated Yield (Tons/Rai/Year)" : "ผลผลิตเฉลี่ย (ตัน/ไร่/ปี)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={yieldPerRai}
                  onChange={(e) => setYieldPerRai(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
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
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
            <h2 className="text-lg font-semibold text-amber-800 mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5" />
              {lang === "EN" ? "Costs per Year (THB)" : "ต้นทุนการจัดการต่อปี (บาท)"}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Fertilizer (per Rai)" : "ค่าปุ๋ย (ต่อไร่)"}
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
                    {lang === "EN" ? "Weed Control (per Rai)" : "ค่ากำจัดหญ้า (ต่อไร่)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={weedControlCost}
                    onChange={(e) => setWeedControlCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Pruning (per Rai)" : "ค่าแต่งทางใบ (ต่อไร่)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={pruningCost}
                    onChange={(e) => setPruningCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Other Costs (per Rai)" : "ค่าใช้จ่ายอื่นๆ (ต่อไร่)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={otherCost}
                    onChange={(e) => setOtherCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="col-span-2 mt-2 pt-2 border-t border-amber-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Harvesting Cost (per TON)" : "ค่าแทงปาล์ม+เก็บร่วง (ต่อตัน)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={harvestCostPerTon}
                    onChange={(e) => setHarvestCostPerTon(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-xs text-amber-700 mt-1">
                    {lang === "EN" ? `Total Harvest Cost: ${totalHarvestCost.toLocaleString()} THB` : `รวมค่าตัดปาล์มทั้งปี: ${totalHarvestCost.toLocaleString()} บาท`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit sticky top-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-orange-600" />
            {lang === "EN" ? "Annual Financial Summary" : "สรุปผลการเงินรายปี"}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">{lang === "EN" ? "Total Annual Revenue" : "รายรับรวมต่อปี"}</span>
              <span className="text-xl font-bold text-orange-600">
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
              <span className={`text-2xl font-bold ${netProfit >= 0 ? 'text-orange-600' : 'text-red-600'}`}>
                {netProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">{lang === "EN" ? "Profit per Rai/Year" : "กำไรต่อไร่ ต่อปี"}</span>
              <span className={`text-lg font-semibold ${profitPerRai >= 0 ? 'text-orange-600' : 'text-red-600'}`}>
                {profitPerRai.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">{lang === "EN" ? "Monthly Average Profit" : "กำไรเฉลี่ยต่อเดือน"}</span>
              <span className={`text-lg font-semibold ${netProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {(netProfit / 12).toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <div className="mt-12 prose max-w-none">
        <h2 className="text-2xl font-bold text-orange-800 mb-4">
          การวิเคราะห์ต้นทุนและกำไรสวนปาล์มน้ำมัน: เคล็ดลับการจัดการเพื่อผลผลิตสูงสุด
        </h2>
        <p>
          ปาล์มน้ำมัน เป็นพืชเศรษฐกิจที่ให้ผลตอบแทนต่อเนื่องและยาวนานกว่า 20-25 ปี การทำสวนปาล์มน้ำมันให้ได้กำไรสูงสุด ไม่ได้อยู่ที่การมีพื้นที่ปลูกจำนวนมากเท่านั้น แต่อยู่ที่การ <strong>เพิ่มผลผลิตต่อไร่</strong> และการบริหารจัดการ <strong>ต้นทุนการปลูกปาล์ม</strong> อย่างมีประสิทธิภาพ โดยเฉพาะการจัดการเรื่อง "ปุ๋ย" ซึ่งเป็นหัวใจสำคัญของพืชชนิดนี้
        </p>

        <h3 className="text-xl font-semibold text-orange-700 mt-6 mb-3">
          โครงสร้างต้นทุนหลักของสวนปาล์มน้ำมัน (ช่วงให้ผลผลิตแล้ว)
        </h3>
        <p>
          สำหรับปาล์มที่โตเต็มที่และอยู่ในวัยให้ผลผลิต ต้นทุนส่วนใหญ่จะหมุนเวียนเป็นรายปี โดยสามารถแบ่งออกได้ดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ค่าปุ๋ย:</strong> ถือเป็นต้นทุนที่สูงที่สุด (มักจะมากกว่า 50% ของต้นทุนทั้งหมด) ปาล์มน้ำมันเป็นพืชที่ต้องการธาตุอาหารสูงมาก ทั้งธาตุหลัก (N-P-K) และธาตุรอง (แมกนีเซียม, โบรอน) การใส่ปุ๋ยตามค่าวิเคราะห์ดินและใบ จะช่วยลดต้นทุนปุ๋ยส่วนเกินและทะลายปาล์มมีน้ำหนักดีขึ้น</li>
          <li><strong>ค่าจ้างเก็บเกี่ยว (แทงปาล์มและเก็บร่วง):</strong> มักจะคิดราคาเหมาเป็น "บาท/ตัน" ยิ่งปาล์มต้นสูงมาก ค่าแทงปาล์มก็จะยิ่งแพงขึ้นตามความยากง่าย</li>
          <li><strong>ค่าตัดแต่งทางใบ (Pruning):</strong> การแต่งทางใบที่แห้งหรือเป็นโรคออก จะช่วยให้ต้นปาล์มโปร่ง เก็บเกี่ยวง่าย และลดที่สะสมของหนูหรือศัตรูพืช</li>
          <li><strong>ค่ากำจัดวัชพืช:</strong> เพื่อไม่ให้หญ้าแย่งปุ๋ยและน้ำ และเพื่อให้คนงานสามารถเดินแทงปาล์มและเก็บลูกร่วงได้สะดวก</li>
        </ul>

        <h3 className="text-xl font-semibold text-orange-700 mt-6 mb-3">
          ปัจจัยที่ส่งผลต่อราคาขาย (บาท/กิโลกรัม)
        </h3>
        <p>
          นอกจากกลไกตลาดโลกแล้ว ราคาที่ลานเทรับซื้อปาล์มจะขึ้นอยู่กับ <strong>"คุณภาพของทะลายปาล์ม"</strong> เป็นหลัก โรงงานสกัดน้ำมันปาล์มต้องการผลปาล์มที่สุกพอดี (มีเปอร์เซ็นต์น้ำมันสูง) หากเกษตรกรตัดปาล์มดิบหรือปาล์มกึ่งสุกกึ่งดิบไปขาย จะถูกลานเทหักราคา หรือหากลูกปาล์มร่วงที่พื้นไม่ได้เก็บไปขายให้หมด ก็เท่ากับทิ้งเงินรายได้ไปอย่างน่าเสียดาย
        </p>

        <h3 className="text-xl font-semibold text-orange-700 mt-6 mb-3">
          ประโยชน์ของโปรแกรมคำนวณกำไรสวนปาล์ม
        </h3>
        <p>
          โปรแกรมนี้ถูกออกแบบมาเพื่อให้เกษตรกรชาวสวนปาล์มสามารถประเมิน <strong>รายรับและรายจ่ายตลอดทั้งปี</strong> ได้อย่างรวดเร็ว โดยแยกระบบการคิดค่าใช้จ่ายออกเป็น ต้นทุนคงที่ต่อไร่ (ค่าปุ๋ย, ค่ายา) และต้นทุนแปรผันตามผลผลิต (ค่าจ้างตัดปาล์มต่อตัน) ทำให้ได้ตัวเลขกำไรสุทธิและกำไรเฉลี่ยต่อเดือนที่ใกล้เคียงความจริงมากที่สุด ช่วยให้ท่านวางแผนการเงินและตัดสินใจลงทุนระบบน้ำหรือการจัดการปุ๋ยในปีถัดไปได้อย่างมั่นใจ
        </p>
      </div>
    </div>
  );
}

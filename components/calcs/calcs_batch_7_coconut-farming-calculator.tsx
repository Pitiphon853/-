"use client";

import React, { useState } from "react";
import { Palmtree, Coins, TrendingUp, Sun } from "lucide-react";

export default function CoconutFarmingCalculator({ lang }: { lang: "TH" | "EN" }) {
  const [area, setArea] = useState<number>(10); // ไร่
  const [yieldPerRai, setYieldPerRai] = useState<number>(3000); // ลูก ต่อไร่ ต่อปี
  const [pricePerNut, setPricePerNut] = useState<number>(12); // บาท ต่อ ลูก

  // Costs (Per Year per Rai)
  const [fertilizerCost, setFertilizerCost] = useState<number>(2000); // ค่าปุ๋ย/เกลือ ต่อไร่/ปี
  const [weedControlCost, setWeedControlCost] = useState<number>(1000); // ค่ากำจัดวัชพืช/ลอกร่องสวน
  const [pestControlCost, setPestControlCost] = useState<number>(800); // ค่ายากำจัดแมลง/ด้วง
  const [harvestCostPerNut, setHarvestCostPerNut] = useState<number>(2); // ค่าจ้างตัด/สอย (บาท/ลูก)
  const [otherCost, setOtherCost] = useState<number>(500);

  const totalYieldNuts = area * yieldPerRai;
  const totalRevenue = totalYieldNuts * pricePerNut;
  
  const totalHarvestCost = totalYieldNuts * harvestCostPerNut;
  const fixedCostPerRai = fertilizerCost + weedControlCost + pestControlCost + otherCost;
  
  const totalCost = (area * fixedCostPerRai) + totalHarvestCost;
  
  const netProfit = totalRevenue - totalCost;
  const profitPerRai = netProfit / area;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-emerald-700 flex items-center justify-center gap-2">
        <Palmtree className="w-8 h-8" />
        {lang === "EN" ? "Coconut Farming Profit Calculator" : "เครื่องมือคำนวณต้นทุนและกำไรสวนมะพร้าว"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
            <h2 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
              <Sun className="w-5 h-5" />
              {lang === "EN" ? "Production Data (Per Year)" : "ข้อมูลการผลิต (ต่อปี)"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Farming Area (Rai)" : "พื้นที่สวนมะพร้าว (ไร่)"}
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
                  {lang === "EN" ? "Estimated Yield (Nuts/Rai/Year)" : "ผลผลิตเฉลี่ย (ผล/ไร่/ปี)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={yieldPerRai}
                  onChange={(e) => setYieldPerRai(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {lang === "EN" ? "*A good fragrant coconut farm yields 3,000-4,000 nuts/rai/year." : "*สวนมะพร้าวน้ำหอมที่สมบูรณ์ให้ผลผลิต 3,000-4,000 ผล/ไร่/ปี"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Average Selling Price (THB/Nut)" : "ราคาขายเฉลี่ย (บาท/ผล)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={pricePerNut}
                  onChange={(e) => setPricePerNut(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-lime-50 p-4 rounded-xl border border-lime-100">
            <h2 className="text-lg font-semibold text-lime-800 mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5" />
              {lang === "EN" ? "Costs per Year (THB)" : "ต้นทุนการจัดการต่อปี (บาท)"}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Fertilizer/Salt (per Rai)" : "ค่าปุ๋ย/เกลือ (ต่อไร่)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={fertilizerCost}
                    onChange={(e) => setFertilizerCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Weed Control (per Rai)" : "ค่าตัดหญ้า/ลอกร่อง (ต่อไร่)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={weedControlCost}
                    onChange={(e) => setWeedControlCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Pest Control (per Rai)" : "ค่ายากำจัดด้วง/แมลง (ต่อไร่)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={pestControlCost}
                    onChange={(e) => setPestControlCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                  />
                </div>
                <div className="col-span-2 mt-2 pt-2 border-t border-lime-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Harvesting Cost (per Nut)" : "ค่าจ้างตัด/สอย (บาท/ผล)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={harvestCostPerNut}
                    onChange={(e) => setHarvestCostPerNut(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                  />
                  <p className="text-xs text-lime-700 mt-1">
                    {lang === "EN" ? `Total Harvest Cost: ${totalHarvestCost.toLocaleString()} THB` : `รวมค่าจ้างตัดมะพร้าวทั้งปี: ${totalHarvestCost.toLocaleString()} บาท`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit sticky top-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            {lang === "EN" ? "Annual Financial Summary" : "สรุปผลการเงินรายปี"}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">{lang === "EN" ? "Total Annual Revenue" : "รายรับรวมต่อปี"}</span>
              <span className="text-xl font-bold text-emerald-600">
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
              <span className={`text-2xl font-bold ${netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {netProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">{lang === "EN" ? "Profit per Rai/Year" : "กำไรต่อไร่ ต่อปี"}</span>
              <span className={`text-lg font-semibold ${profitPerRai >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
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
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">
          การวิเคราะห์ต้นทุนและกำไรจากการทำสวนมะพร้าว (มะพร้าวน้ำหอมและมะพร้าวแกง)
        </h2>
        <p>
          มะพร้าว เป็นพืชเศรษฐกิจที่ได้รับความนิยมสูงมากในปัจจุบัน โดยเฉพาะ <strong>"มะพร้าวน้ำหอม"</strong> ที่มีความต้องการในตลาดส่งออกสูงมาก และ <strong>"มะพร้าวแกง"</strong> ที่เป็นส่วนประกอบหลักในอาหารไทย การทำสวนมะพร้าวเมื่อต้นเริ่มให้ผลผลิตแล้ว จะสามารถเก็บเกี่ยวได้ทุกๆ 20 วัน (ประมาณ 18 รอบต่อปี) ทำให้เกษตรกรมีรายได้หมุนเวียนเข้ามาอย่างสม่ำเสมอ การ <strong>คำนวณต้นทุนและกำไร</strong> จะช่วยให้มองเห็นภาพรวมและจุดคุ้มทุนของการทำสวนได้อย่างชัดเจน
        </p>

        <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">
          โครงสร้างต้นทุนประจำปีของการทำสวนมะพร้าว
        </h3>
        <p>
          สำหรับสวนมะพร้าวที่อยู่ในวัยให้ผลผลิตเต็มที่ จะมีค่าใช้จ่ายหรือต้นทุนการดูแลรักษาในแต่ละปี ดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ค่าปุ๋ยและธาตุอาหาร:</strong> มะพร้าวต้องการธาตุอาหารครบถ้วนเพื่อให้จั่นดกและลูกใหญ่ สูตรปุ๋ยยอดนิยมมักจะเป็นสูตรเสมอ หรือสูตรตัวท้ายสูง นอกจากนี้ เกษตรกรนิยมโรย <strong>"เกลือสมุทร"</strong> รอบโคนต้นปีละ 1-2 ครั้ง เพื่อเพิ่มความหวานและความหอมให้น้ำมะพร้าว</li>
          <li><strong>ค่าจ้างตัด/สอยมะพร้าว:</strong> มักคิดราคาเหมาเป็น "บาทต่อผล" หรือเป็นเปอร์เซ็นต์ ซึ่งในพื้นที่ที่ขาดแคลนแรงงาน ค่าแรงส่วนนี้อาจปรับตัวสูงขึ้น</li>
          <li><strong>การกำจัดศัตรูพืช:</strong> ศัตรูตัวฉกาจของมะพร้าวคือ "ด้วงแรด" และ "ด้วงงวง" หากปล่อยให้ระบาดจะทำลายยอดจนต้นตายได้ การป้องกันมีทั้งการใช้สารเคมี จุลินทรีย์ และการดูแลสวนไม่ให้เป็นแหล่งเพาะพันธุ์</li>
          <li><strong>การจัดการสวนและวัชพืช:</strong> เช่น การตัดหญ้าเพื่อความสะดวกในการปฏิบัติงาน การลอกเลนหรือขุดลอกร่องสวน (กรณีสวนยกร่อง) เพื่อนำโคลนตมซึ่งอุดมด้วยแร่ธาตุขึ้นมาโปะที่โคนต้นมะพร้าว</li>
        </ul>

        <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">
          การบริหารความเสี่ยงด้านราคามะพร้าว
        </h3>
        <p>
          ราคามะพร้าวมีความผันผวนไปตามฤดูกาล โดยในช่วงฤดูร้อนที่อากาศแห้งแล้ง มะพร้าวมักจะออกผลน้อยแต่ความต้องการบริโภคสูง ทำให้ราคาพุ่งสูงขึ้น ในขณะที่ฤดูฝนผลผลิตมักจะล้นตลาด การทำ <strong>"มะพร้าวนอกฤดู"</strong> โดยการให้น้ำและปุ๋ยอย่างสม่ำเสมอในช่วงหน้าแล้ง จะช่วยให้ชาวสวนสามารถเก็บผลผลิตไปขายในช่วงที่ราคาแพงที่สุดได้
        </p>

        <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">
          วิธีใช้โปรแกรมคำนวณกำไรสวนมะพร้าว
        </h3>
        <p>
          เพื่อให้ได้ตัวเลขที่ใกล้เคียงความเป็นจริงที่สุด ท่านสามารถประเมินผลผลิตต่อไร่ (เช่น 3,000 ลูก/ไร่/ปี) และกรอกราคาขายเฉลี่ยตลอดทั้งปี โปรแกรมจะคำนวณแยก <strong>ต้นทุนคงที่ต่อไร่</strong> (ค่าปุ๋ย, ค่ายา) และ <strong>ต้นทุนผันแปร</strong> (ค่าตัดมะพร้าวคิดตามจำนวนผล) มารวมกันเพื่อหาต้นทุนทั้งหมด จากนั้นจึงแสดงผลกำไรสุทธิออกมาเป็นรายปีและค่าเฉลี่ยรายเดือน ช่วยให้ชาวสวนมะพร้าวประเมินกระแสเงินสดและวางแผนการลงทุนในปีต่อๆ ไปได้อย่างมีประสิทธิภาพ
        </p>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Sprout, Coins, TrendingUp, Tractor } from "lucide-react";

export default function SugarcaneFarmingCalculator({ lang }: { lang: "TH" | "EN" }) {
  const [area, setArea] = useState<number>(20); // ไร่
  const [yieldPerRai, setYieldPerRai] = useState<number>(12); // ตัน ต่อไร่
  const [pricePerTon, setPricePerTon] = useState<number>(1200); // บาท ต่อ ตัน (อิงค่าความหวาน CCS 10)

  // Costs
  const [seedCost, setSeedCost] = useState<number>(1200); // ค่าพันธุ์อ้อย บาท ต่อไร่ (กรณีปลูกใหม่)
  const [landPrepCost, setLandPrepCost] = useState<number>(1500); // ค่าเตรียมดิน/ไถ/ยกร่อง
  const [fertilizerCost, setFertilizerCost] = useState<number>(2000); // ค่าปุ๋ย/ยาคุมหญ้า
  const [laborCost, setLaborCost] = useState<number>(1000); // ค่าแรงปลูก/ดูแลรักษา
  const [harvestCost, setHarvestCost] = useState<number>(2500); // ค่าตัดอ้อยและค่าบรรทุกต่อไร่ หรือประเมิน
  const [otherCost, setOtherCost] = useState<number>(500);

  const totalRevenue = area * yieldPerRai * pricePerTon;
  
  const costPerRai = seedCost + landPrepCost + fertilizerCost + laborCost + harvestCost + otherCost;
  const totalCost = area * costPerRai;
  
  const netProfit = totalRevenue - totalCost;
  const profitPerRai = netProfit / area;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-purple-700 flex items-center justify-center gap-2">
        <Tractor className="w-8 h-8" />
        {lang === "EN" ? "Sugarcane Farming Profit Calculator" : "เครื่องมือคำนวณต้นทุนและกำไรปลูกอ้อย"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
            <h2 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
              <Sprout className="w-5 h-5" />
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
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Estimated Yield (Tons/Rai)" : "ผลผลิตเฉลี่ย (ตัน/ไร่)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={yieldPerRai}
                  onChange={(e) => setYieldPerRai(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Selling Price (THB/Ton)" : "ราคาขาย (บาท/ตัน)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={pricePerTon}
                  onChange={(e) => setPricePerTon(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-xs text-purple-600 mt-1">
                  {lang === "EN" ? "*Price usually depends on CCS value" : "*ราคาประเมินเบื้องต้น อาจปรับเปลี่ยนตามค่าความหวาน (CCS)"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
            <h2 className="text-lg font-semibold text-pink-800 mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5" />
              {lang === "EN" ? "Costs per Rai (THB)" : "ต้นทุนต่อไร่ (บาท)"}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Sugarcane Seed/Stems" : "ค่าพันธุ์อ้อย"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={seedCost}
                    onChange={(e) => setSeedCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Land Preparation" : "ค่าเตรียมดิน"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={landPrepCost}
                    onChange={(e) => setLandPrepCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Fertilizer/Chemicals" : "ค่าปุ๋ย/สารเคมี"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={fertilizerCost}
                    onChange={(e) => setFertilizerCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Labor/Maintenance" : "ค่าแรงงาน/ดูแล"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={laborCost}
                    onChange={(e) => setLaborCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Harvest/Transport" : "ค่าตัด/บรรทุกอ้อย"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={harvestCost}
                    onChange={(e) => setHarvestCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">
                {lang === "EN" ? "*If ratoon cane (year 2-3), seed and land prep costs are usually 0." : "*กรณีเป็นอ้อยตอ (ปีที่ 2-3) ค่าพันธุ์และค่าเตรียมดินมักจะลดลงหรือเป็นศูนย์"}
              </p>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit sticky top-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            {lang === "EN" ? "Financial Summary" : "สรุปผลการเงิน"}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">{lang === "EN" ? "Total Revenue" : "รายรับรวม"}</span>
              <span className="text-xl font-bold text-purple-600">
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
              <span className={`text-2xl font-bold ${netProfit >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
                {netProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">{lang === "EN" ? "Profit per Rai" : "กำไรต่อไร่"}</span>
              <span className={`text-lg font-semibold ${profitPerRai >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
                {profitPerRai.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">{lang === "EN" ? "Return on Investment (ROI)" : "ผลตอบแทนจากการลงทุน (ROI)"}</span>
              <span className={`text-lg font-semibold ${roi >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
                {roi.toFixed(2)} %
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <div className="mt-12 prose max-w-none">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">
          คู่มือการคำนวณต้นทุนและกำไรปลูกอ้อย: เคล็ดลับสู่ความสำเร็จของชาวไร่อ้อย
        </h2>
        <p>
          อ้อยเป็นพืชเศรษฐกิจระดับชาติที่รัฐบาลให้ความสำคัญ เนื่องจากอุตสาหกรรมน้ำตาลและพลังงานทดแทน (เอทานอล) พึ่งพาผลผลิตอ้อยเป็นวัตถุดิบหลัก การปลูกอ้อยหนึ่งครั้งสามารถเก็บเกี่ยวได้หลายปี (เรียกว่า อ้อยปลูกใหม่ และ อ้อยตอ) ทำให้โครงสร้างต้นทุนในแต่ละปีมีความแตกต่างกัน การทำความเข้าใจและ <strong>คำนวณต้นทุนปลูกอ้อยต่อไร่</strong> จึงเป็นสิ่งจำเป็นสำหรับชาวไร่อ้อยทุกคน
        </p>

        <h3 className="text-xl font-semibold text-purple-700 mt-6 mb-3">
          การวิเคราะห์ต้นทุน: อ้อยปลูกใหม่ vs อ้อยตอ
        </h3>
        <p>
          ในการปลูกอ้อย ต้นทุนจะสูงที่สุดใน "ปีแรก" หรือ <strong>อ้อยปลูกใหม่</strong> เนื่องจากมีค่าใช้จ่ายเต็มรูปแบบ:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ค่าพันธุ์อ้อย:</strong> ต้องมีการจัดซื้อท่อนพันธุ์และค่าขนส่ง</li>
          <li><strong>ค่าเตรียมดิน:</strong> การไถระเบิดดินดาน ไถดะ ไถแปร และยกร่อง เพื่อให้รากอ้อยหยั่งลึกได้ดี</li>
          <li><strong>ค่าแรงปลูก:</strong> อาจใช้แรงงานคนหรือเครื่องจักร (รถปลูกอ้อย)</li>
        </ul>
        <p className="mt-4">
          ส่วนใน "ปีที่ 2 และ 3" หรือ <strong>อ้อยตอ</strong> ต้นทุนค่าพันธุ์และค่าเตรียมดินจะลดลงเป็นศูนย์ ทำให้ต้นทุนเฉลี่ยต่อไร่ต่ำลงและกำไรสุทธิสูงขึ้น หากชาวไร่สามารถบำรุงรักษาอ้อยตอให้ผลผลิตไม่ลดลงมากนัก จะเป็นช่วงปีที่ทำกำไรได้ดีที่สุด
        </p>

        <h3 className="text-xl font-semibold text-purple-700 mt-6 mb-3">
          ปัจจัยที่กำหนดราคาอ้อย: ค่า CCS และนโยบายรัฐ
        </h3>
        <p>
          ราคาอ้อยที่ชาวไร่ได้รับ ไม่ได้ตายตัวเพียงแค่ราคาต่อตันน้ำหนัก แต่ขึ้นอยู่กับ <strong>ค่าความหวาน (CCS - Commercial Cane Sugar)</strong> โรงงานน้ำตาลจะประเมินค่า CCS มาตรฐานที่ระดับ 10 หากอ้อยของท่านมีความหวานสูงกว่ามาตรฐาน ก็จะได้รับเงินค่าความหวานเพิ่มขึ้นต่อหน่วย นอกจากนี้ยังมีเรื่องของ "อ้อยสด" และ "อ้อยไฟไหม้" ซึ่งรัฐบาลและโรงงานมีนโยบายหักเงินอ้อยไฟไหม้ และให้เงินสนับสนุนเพิ่มสำหรับผู้ที่ตัดอ้อยสด เพื่อลดปัญหาฝุ่น PM 2.5
        </p>

        <h3 className="text-xl font-semibold text-purple-700 mt-6 mb-3">
          เทคนิคการเพิ่มกำไรจากการปลูกอ้อย
        </h3>
        <p>
          1. <strong>ตัดอ้อยสด:</strong> แม้ค่าแรงตัดอ้อยสดจะสูงกว่า แต่เงินเพิ่มที่ได้จากรัฐและโรงงาน รวมกับใบอ้อยที่คลุมดินช่วยรักษาความชื้นและกลายเป็นปุ๋ยในฤดูกาลถัดไป จะคุ้มค่ากว่ามากในระยะยาว<br /><br />
          2. <strong>การจัดการน้ำ:</strong> การใช้ระบบน้ำหยดในไร่อ้อย สามารถเพิ่มผลผลิตจาก 10-12 ตัน/ไร่ ไปเป็น 18-20 ตัน/ไร่ ได้ ซึ่งเมื่อหักลบต้นทุนระบบน้ำแล้ว ยังถือว่าให้ผลตอบแทน (ROI) ที่คุ้มค่า<br /><br />
          3. <strong>การใส่ปุ๋ยตามค่าวิเคราะห์ดิน:</strong> ช่วยลดต้นทุนปุ๋ยเคมีส่วนเกิน และทำให้ต้นอ้อยได้รับธาตุอาหารที่จำเป็นตรงจุด
        </p>

        <p className="mt-6 text-gray-700">
          การใช้งานเครื่องมือคำนวณกำไรปลูกอ้อยนี้ จะช่วยให้ท่านสามารถจำลองตัวเลขประเมินรายรับรายจ่ายล่วงหน้า เพื่อการวางแผนการเงินในรอบปีเพาะปลูกได้อย่างแม่นยำยิ่งขึ้น
        </p>
      </div>
    </div>
  );
}

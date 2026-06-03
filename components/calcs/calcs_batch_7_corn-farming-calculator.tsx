"use client";

import React, { useState } from "react";
import { Tractor, Sprout, Coins, TrendingUp } from "lucide-react";

export default function CornFarmingCalculator({ lang }: { lang: "TH" | "EN" }) {
  const [area, setArea] = useState<number>(10); // ไร่
  const [yieldPerRai, setYieldPerRai] = useState<number>(1200); // กก. ต่อไร่
  const [pricePerKg, setPricePerKg] = useState<number>(8.5); // บาท ต่อ กก.

  // Costs
  const [seedCost, setSeedCost] = useState<number>(500); // บาท ต่อไร่
  const [landPrepCost, setLandPrepCost] = useState<number>(800);
  const [fertilizerCost, setFertilizerCost] = useState<number>(1500);
  const [laborCost, setLaborCost] = useState<number>(1000);
  const [harvestCost, setHarvestCost] = useState<number>(600); // ค่าเกี่ยวหรือเก็บ ต่อไร่
  const [otherCost, setOtherCost] = useState<number>(300);

  const totalRevenue = area * yieldPerRai * pricePerKg;
  
  const costPerRai = seedCost + landPrepCost + fertilizerCost + laborCost + harvestCost + otherCost;
  const totalCost = area * costPerRai;
  
  const netProfit = totalRevenue - totalCost;
  const profitPerRai = netProfit / area;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-green-700 flex items-center justify-center gap-2">
        <Tractor className="w-8 h-8" />
        {lang === "EN" ? "Corn Farming Profit Calculator" : "เครื่องมือคำนวณต้นทุนและกำไรปลูกข้าวโพด"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded-xl border border-green-100">
            <h2 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
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
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
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
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <h2 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5" />
              {lang === "EN" ? "Costs per Rai (THB)" : "ต้นทุนต่อไร่ (บาท)"}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Seed Cost" : "ค่าเมล็ดพันธุ์"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={seedCost}
                    onChange={(e) => setSeedCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Land Prep" : "ค่าเตรียมดิน"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={landPrepCost}
                    onChange={(e) => setLandPrepCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Fertilizer/Chemicals" : "ค่าปุ๋ย/ยา"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={fertilizerCost}
                    onChange={(e) => setFertilizerCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Labor/Maintenance" : "ค่าแรงงานดูแล"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={laborCost}
                    onChange={(e) => setLaborCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Harvesting" : "ค่าเก็บเกี่ยว"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={harvestCost}
                    onChange={(e) => setHarvestCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
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
            <TrendingUp className="w-6 h-6 text-green-600" />
            {lang === "EN" ? "Financial Summary" : "สรุปผลการเงิน"}
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
              <span className="text-sm text-gray-500">{lang === "EN" ? "Profit per Rai" : "กำไรต่อไร่"}</span>
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
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          การวิเคราะห์ต้นทุนและกำไรจากการปลูกข้าวโพดเลี้ยงสัตว์และข้าวโพดหวาน
        </h2>
        <p>
          การปลูกข้าวโพดเป็นหนึ่งในอาชีพเกษตรกรรมที่ได้รับความนิยมอย่างมากในประเทศไทย ทั้งข้าวโพดเลี้ยงสัตว์ (Field Corn) และข้าวโพดหวาน (Sweet Corn) เนื่องจากเป็นพืชอายุสั้น ใช้น้ำน้อยเมื่อเทียบกับการทำนา และตลาดยังมีความต้องการอย่างต่อเนื่อง อย่างไรก็ตาม การจะประสบความสำเร็จและมีผลกำไรที่ยั่งยืน เกษตรกรจำเป็นต้องมีการวางแผน <strong>คำนวณต้นทุนและกำไรในการปลูกข้าวโพด</strong> อย่างละเอียด เพื่อลดความเสี่ยงในการขาดทุน
        </p>

        <h3 className="text-xl font-semibold text-green-700 mt-6 mb-3">
          โครงสร้างต้นทุนการปลูกข้าวโพดต่อไร่
        </h3>
        <p>
          การคำนวณต้นทุนการปลูกข้าวโพดนั้น จะแตกต่างกันไปตามสภาพพื้นที่และวิธีการจัดการ แต่โดยหลักแล้วต้นทุนสามารถแบ่งออกได้เป็น 2 ประเภทใหญ่ๆ คือ ต้นทุนผันแปรและต้นทุนคงที่ สำหรับโปรแกรมคำนวณข้างต้น เราได้รวบรวมต้นทุนหลักๆ ดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ค่าเตรียมดิน:</strong> รวมถึงค่าไถดะ ไถแปร และยกร่อง ยิ่งพื้นที่ที่มีหญ้าหรือวัชพืชมาก อาจมีค่าใช้จ่ายในส่วนนี้เพิ่มขึ้น</li>
          <li><strong>ค่าเมล็ดพันธุ์:</strong> การเลือกเมล็ดพันธุ์ลูกผสมที่มีคุณภาพจะให้ผลผลิตที่ดี ทนทานต่อโรค ซึ่งราคาอาจสูงกว่าพันธุ์ทั่วไปแต่คุ้มค่าในระยะยาว</li>
          <li><strong>ค่าปุ๋ยเคมีและสารกำจัดศัตรูพืช:</strong> ข้าวโพดต้องการธาตุอาหารในแต่ละช่วงการเจริญเติบโต (เช่น ปุ๋ยรองพื้น และปุ๋ยแต่งหน้า) รวมถึงสารป้องกันหนอนกระทู้ข้าวโพดลายจุด ซึ่งเป็นศัตรูสำคัญ</li>
          <li><strong>ค่าแรงงาน:</strong> ครอบคลุมตั้งแต่ค่าแรงปลูก ค่าแรงฉีดพ่นสารเคมี และค่าดูแลรักษาทั่วไป</li>
          <li><strong>ค่าเก็บเกี่ยว:</strong> ปัจจุบันนิยมใช้รถเกี่ยวข้าวโพดเพื่อความรวดเร็วและลดต้นทุนค่าแรงคน</li>
        </ul>

        <h3 className="text-xl font-semibold text-green-700 mt-6 mb-3">
          ปัจจัยที่ส่งผลต่อกำไรและผลผลิต
        </h3>
        <p>
          ในการปลูกข้าวโพดเพื่อให้ได้กำไรสูงสุด (Net Profit) ไม่ใช่แค่การลดต้นทุนเท่านั้น แต่คือการเพิ่มผลผลิตต่อไร่ (Yield) ให้สูงที่สุดภายใต้สภาพแวดล้อมที่เหมาะสม ปัจจัยหลักๆ ได้แก่:
          <br /><br />
          <strong>1. ฤดูกาลปลูกและปริมาณน้ำ:</strong> ข้าวโพดสามารถปลูกได้ทั้งฤดูฝน (อาศัยน้ำฝน) และฤดูแล้ง (ปลูกหลังนา อาศัยน้ำชลประทาน) การปลูกในฤดูแล้งหากน้ำเพียงพอมักจะได้ผลผลิตที่ดีกว่า เนื่องจากวัชพืชและโรคแมลงรบกวนน้อยกว่า
          <br /><br />
          <strong>2. ราคาตลาดรับซื้อ:</strong> ราคาข้าวโพดเลี้ยงสัตว์ขึ้นอยู่กับกลไกตลาดโลกและนโยบายของรัฐบาล เกษตรกรควรติดตามข่าวสารราคาอย่างใกล้ชิด และอาจพิจารณาเข้าร่วมโครงการเกษตรพันธสัญญา (Contract Farming) เพื่อประกันราคาขั้นต่ำ
          <br /><br />
          <strong>3. ความชื้นของเมล็ด (สำหรับข้าวโพดเลี้ยงสัตว์):</strong> พ่อค้ารับซื้อมักจะหักความชื้น หากเกษตรกรสามารถตากข้าวโพดลดความชื้นก่อนขายได้ จะได้ราคาต่อกิโลกรัมที่สูงกว่าการขายข้าวโพดสด
        </p>

        <h3 className="text-xl font-semibold text-green-700 mt-6 mb-3">
          วิธีใช้งานเครื่องมือคำนวณกำไรข้าวโพด
        </h3>
        <p>
          เครื่องมือนี้ถูกออกแบบมาให้ใช้งานง่าย เพียงแค่กรอกข้อมูลในส่วนของ <strong>ข้อมูลการผลิต</strong> (เช่น จำนวนไร่, ผลผลิตที่คาดหวังต่อไร่, ราคาขายต่อกิโลกรัม) และ <strong>ต้นทุนต่อไร่</strong> ระบบจะทำการคำนวณรายรับทั้งหมด, ต้นทุนรวม, กำไรสุทธิ, กำไรเฉลี่ยต่อไร่ และที่สำคัญคือ <strong>ผลตอบแทนจากการลงทุน (ROI)</strong> ให้โดยอัตโนมัติ ซึ่งจะช่วยให้ท่านมองเห็นภาพรวมของกระแสเงินสด และประเมินความเสี่ยงก่อนเริ่มต้นฤดูกาลเพาะปลูกได้อย่างมีประสิทธิภาพ
        </p>
      </div>
    </div>
  );
}

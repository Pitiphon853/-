"use client";

import React, { useState } from "react";
import { Trees, Coins, TrendingUp, Leaf } from "lucide-react";

export default function RubberTreeFarmingCalculator({ lang }: { lang: "TH" | "EN" }) {
  const [area, setArea] = useState<number>(15); // ไร่
  const [yieldPerRai, setYieldPerRai] = useState<number>(250); // กก. ต่อไร่ ต่อปี
  const [pricePerKg, setPricePerKg] = useState<number>(50); // บาท ต่อ กก. (ยางก้อนถ้วย/น้ำยาง)

  // Costs (Per Year)
  const [fertilizerCost, setFertilizerCost] = useState<number>(1500); // ค่าปุ๋ย ต่อไร่/ปี
  const [weedControlCost, setWeedControlCost] = useState<number>(800); // ค่าตัดหญ้า/ยาฆ่าหญ้า
  const [equipmentCost, setEquipmentCost] = useState<number>(500); // ค่าวัสดุอุปกรณ์ น้ำกรด ถ้วย
  const [laborCost, setLaborCost] = useState<number>(4000); // ค่าจ้างกรีด/แบ่งปันผล
  const [otherCost, setOtherCost] = useState<number>(500);

  const totalRevenue = area * yieldPerRai * pricePerKg;
  
  const costPerRai = fertilizerCost + weedControlCost + equipmentCost + laborCost + otherCost;
  const totalCost = area * costPerRai;
  
  const netProfit = totalRevenue - totalCost;
  const profitPerRai = netProfit / area;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-emerald-800 flex items-center justify-center gap-2">
        <Trees className="w-8 h-8" />
        {lang === "EN" ? "Rubber Tree Farming Profit Calculator" : "เครื่องมือคำนวณต้นทุนและกำไรสวนยางพารา"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
            <h2 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              {lang === "EN" ? "Production Data (Per Year)" : "ข้อมูลการผลิต (ต่อปี)"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Farming Area (Rai)" : "พื้นที่สวนยาง (ไร่)"}
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
                  {lang === "EN" ? "Estimated Yield (Kg/Rai/Year)" : "ผลผลิตเฉลี่ย (กิโลกรัม/ไร่/ปี)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={yieldPerRai}
                  onChange={(e) => setYieldPerRai(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {lang === "EN" ? "*Usually dry rubber or cup lump weight" : "*น้ำหนักยางก้อนถ้วย หรือ น้ำยางสด หรือ ยางแผ่น"}
                </p>
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
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
            <h2 className="text-lg font-semibold text-teal-800 mb-4 flex items-center gap-2">
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Weed Control" : "ค่ากำจัดวัชพืช"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={weedControlCost}
                    onChange={(e) => setWeedControlCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Materials (Acid, Cups)" : "ค่าวัสดุ (น้ำกรด, จอก)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={equipmentCost}
                    onChange={(e) => setEquipmentCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Tapping Labor / Share" : "ค่าจ้างกรีด/แบ่งเปอร์เซ็นต์"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={laborCost}
                    onChange={(e) => setLaborCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">
                {lang === "EN" ? "*If you tap yourself, you can set labor cost to 0 to see pure profit." : "*หากเจ้าของสวนกรีดเอง ให้ใส่ค่าจ้างกรีดเป็น 0 เพื่อดูกำไรสุทธิเต็มจำนวน"}
              </p>
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
          การประเมินต้นทุนและกำไรสวนยางพารา: วางแผนรายได้ระยะยาวอย่างยั่งยืน
        </h2>
        <p>
          ยางพารา เป็นพืชเศรษฐกิจหลักของภาคใต้และภาคตะวันออกของไทย และปัจจุบันได้ขยายพื้นที่ปลูกไปทั่วประเทศ การทำสวนยางพารานั้นเป็นการลงทุนระยะยาว ต้นยางจะเริ่มให้ผลผลิต (เปิดกรีดได้) เมื่ออายุประมาณ 7 ปีขึ้นไป และสามารถกรีดต่อเนื่องได้ยาวนาน 20-25 ปี การคำนวณ <strong>ต้นทุนและกำไรจากการทำสวนยางพารา</strong> ในช่วงที่เปิดกรีดแล้ว จึงมีความสำคัญต่อการบริหารจัดการกระแสเงินสดรายปีของเกษตรกร
        </p>

        <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">
          โครงสร้างต้นทุนสวนยางพาราที่เปิดกรีดแล้ว
        </h3>
        <p>
          เมื่อต้นยางเข้าสู่ระยะเปิดกรีด ต้นทุนส่วนใหญ่จะเป็นต้นทุนการดำเนินงาน (Operating Costs) รายปี ได้แก่:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ค่าจ้างกรีดยาง:</strong> เป็นต้นทุนที่สูงที่สุดหากเจ้าของสวนไม่ได้กรีดเอง โดยทั่วไปมักใช้ระบบแบ่งปันผลประโยชน์ เช่น แบ่ง 60:40 (เจ้าของสวน 60 ผู้กรีด 40) หรือ 50:50 ขึ้นอยู่กับข้อตกลงและราคาตลาด</li>
          <li><strong>ค่าปุ๋ยบำรุงต้น:</strong> ยางพาราที่ถูกกรีดเอาน้ำยางออกไปทุกวัน จำเป็นต้องได้รับปุ๋ยทดแทนเพื่อรักษาเปอร์เซ็นต์น้ำยางและสภาพต้นไม่ให้ทรุดโทรม แนะนำให้ใส่ปีละ 2 ครั้ง (ต้นฤดูฝนและปลายฤดูฝน)</li>
          <li><strong>ค่ากำจัดวัชพืช:</strong> การดูแลสวนให้เตียนโล่งนอกจากจะทำงานง่ายแล้ว ยังช่วยลดความชื้นสะสมซึ่งเป็นสาเหตุของโรคเชื้อราต่างๆ เช่น โรคเส้นดำ โรคหน้ายางตายนึ่ง</li>
          <li><strong>ค่าวัสดุอุปกรณ์:</strong> เช่น น้ำกรดสำหรับทำยางก้อนถ้วย จอกยาง ลวดรัด ถ้วยรอง ถือเป็นต้นทุนสิ้นเปลืองที่ต้องซื้อเติมอยู่เสมอ</li>
        </ul>

        <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">
          ประเภทของผลผลิตยางและผลกระทบต่อรายได้
        </h3>
        <p>
          เกษตรกรสามารถเลือกขายผลผลิตได้หลายรูปแบบ ซึ่งมีราคาและต้นทุนการจัดการต่างกัน:
          <br /><br />
          <strong>1. ยางก้อนถ้วย (Cup Lump):</strong> ทำง่ายที่สุด ต้นทุนแรงงานต่ำ ไม่ต้องใช้เครื่องจักร แต่ราคาขายมักจะต่ำกว่ารูปแบบอื่น และมีการหักเปอร์เซ็นต์ความชื้น
          <br /><br />
          <strong>2. น้ำยางสด (Fresh Latex):</strong> ไม่ต้องใช้น้ำกรด แต่ต้องรีบนำไปขายที่จุดรับซื้อภายในวันเดียวกันเพื่อไม่ให้น้ำยางบูด ราคาดีกว่ายางก้อนถ้วยเล็กน้อย
          <br /><br />
          <strong>3. ยางแผ่นดิบ (Unsmoked Sheet):</strong> ได้ราคาสูงที่สุด แต่ต้องใช้เวลาและแรงงานในการรีดแผ่นและตากแห้ง รวมถึงต้องมีเครื่องรีดยาง
        </p>

        <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">
          ประโยชน์ของการใช้โปรแกรมคำนวณกำไร
        </h3>
        <p>
          เครื่องมือนี้ช่วยให้ชาวสวนยางสามารถประเมิน <strong>กำไรสุทธิรายปีและรายเดือน</strong> ได้อย่างรวดเร็ว โดยเฉพาะในช่วงที่ราคายางมีความผันผวน การทราบจุดคุ้มทุน (Break-even Point) จะช่วยให้เกษตรกรตัดสินใจได้ว่า ในช่วงที่ราคาตกต่ำ ควรจ้างกรีดต่อ หรือหยุดพักหน้ายาง หรือเจ้าของสวนควรลงมือกรีดเองเพื่อลดต้นทุนค่าแรง
        </p>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Trees, Coins, TrendingUp, Sprout } from "lucide-react";

export default function BananaFarmingCalculator({ lang }: { lang: "TH" | "EN" }) {
  const [area, setArea] = useState<number>(5); // ไร่
  const [plantsPerRai, setPlantsPerRai] = useState<number>(400); // ต้น/เครือ ต่อไร่
  const [pricePerBunch, setPricePerBunch] = useState<number>(150); // บาท ต่อ เครือ

  // Costs (Per Crop Cycle ~ 9-12 months)
  const [suckerCost, setSuckerCost] = useState<number>(4000); // ค่าหน่อพันธุ์/ต้นกล้า ต่อไร่ (เช่น 400 ต้น x 10 บาท)
  const [landPrepCost, setLandPrepCost] = useState<number>(1500); // ค่าเตรียมดิน/ขุดหลุม ต่อไร่
  const [fertilizerCost, setFertilizerCost] = useState<number>(2500); // ค่าปุ๋ย/ยา/น้ำ
  const [propCost, setPropCost] = useState<number>(2000); // ค่าไม้ค้ำเครือกล้วย/เชือกผูก (สำคัญสำหรับกล้วยหอม)
  const [laborCost, setLaborCost] = useState<number>(1500); // ค่าแรงงานดูแล/ตัดหญ้า
  const [harvestCost, setHarvestCost] = useState<number>(1000); // ค่าตัด/ขนย้าย
  const [otherCost, setOtherCost] = useState<number>(500); // ค่าถุงห่อเครือ ฯลฯ

  // Assuming 90% survival/yield rate
  const yieldRate = 0.9;
  const totalYieldBunches = area * plantsPerRai * yieldRate;
  
  const totalRevenue = totalYieldBunches * pricePerBunch;
  
  const costPerRai = suckerCost + landPrepCost + fertilizerCost + propCost + laborCost + harvestCost + otherCost;
  const totalCost = area * costPerRai;
  
  const netProfit = totalRevenue - totalCost;
  const profitPerRai = netProfit / area;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-yellow-600 flex items-center justify-center gap-2">
        <Sprout className="w-8 h-8" />
        {lang === "EN" ? "Banana Farming Profit Calculator" : "เครื่องมือคำนวณต้นทุนและกำไรปลูกกล้วย"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
            <h2 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center gap-2">
              <Trees className="w-5 h-5" />
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
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Plants per Rai" : "จำนวนต้นที่ปลูก (ต่อไร่)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={plantsPerRai}
                  onChange={(e) => setPlantsPerRai(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {lang === "EN" ? "*Calculation assumes a 90% successful yield rate." : "*ระบบประเมินว่าสามารถรอดและเก็บเกี่ยวได้ 90% ของจำนวนต้นที่ปลูก"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "EN" ? "Selling Price per Bunch (THB)" : "ราคาขายเฉลี่ยต่อเครือ (บาท)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={pricePerBunch}
                  onChange={(e) => setPricePerBunch(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <h2 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5" />
              {lang === "EN" ? "Costs per Rai per Crop (THB)" : "ต้นทุนต่อไร่ ต่อรอบการปลูก (บาท)"}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Suckers / Seedlings" : "ค่าหน่อกล้วย"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={suckerCost}
                    onChange={(e) => setSuckerCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Land Preparation" : "ค่าเตรียมดิน/ขุดหลุม"}
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
                    {lang === "EN" ? "Fertilizer & Water" : "ค่าปุ๋ย/ระบบน้ำ"}
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
                    {lang === "EN" ? "Props (Bamboo) / Ties" : "ค่าไม้ค้ำ/เชือกโยง"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={propCost}
                    onChange={(e) => setPropCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Labor / Weeding" : "ค่าแรงงานดูแล"}
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
                    {lang === "EN" ? "Harvesting" : "ค่าตัด/ขนย้าย"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={harvestCost}
                    onChange={(e) => setHarvestCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "EN" ? "Other Costs (Bags for bunch, etc.)" : "ค่าใช้จ่ายอื่นๆ (เช่น ถุงห่อเครือ)"}
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
            <TrendingUp className="w-6 h-6 text-yellow-600" />
            {lang === "EN" ? "Financial Summary" : "สรุปผลการเงิน (ต่อรอบการปลูก)"}
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
        <h2 className="text-2xl font-bold text-yellow-800 mb-4">
          การวิเคราะห์ต้นทุนและกำไรจากการปลูกกล้วย (กล้วยน้ำว้าและกล้วยหอม)
        </h2>
        <p>
          กล้วย เป็นผลไม้ที่อยู่คู่คนไทยมาอย่างยาวนาน ปลูกง่าย โตไว และเป็นที่ต้องการของตลาดตลอดปี ทั้งสำหรับการบริโภคสดและแปรรูป สายพันธุ์ที่นิยมปลูกเพื่อการค้าหลักๆ ได้แก่ <strong>กล้วยน้ำว้า</strong> และ <strong>กล้วยหอมทอง</strong> การวางแผนและ <strong>คำนวณต้นทุนปลูกกล้วย</strong> จะช่วยให้เกษตรกรสามารถบริหารจัดการเงินทุนได้อย่างมีประสิทธิภาพ และเพิ่มโอกาสในการทำกำไร
        </p>

        <h3 className="text-xl font-semibold text-yellow-700 mt-6 mb-3">
          โครงสร้างต้นทุนการปลูกกล้วย
        </h3>
        <p>
          การปลูกกล้วย 1 รอบ (ตั้งแต่ปลูกจนถึงเก็บเกี่ยว ใช้เวลาประมาณ 9-12 เดือน) มีต้นทุนหลักที่ควรนำมาคำนวณ ได้แก่:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ค่าหน่อพันธุ์/ต้นกล้าเพาะเลี้ยงเนื้อเยื่อ:</strong> การใช้ต้นกล้าเนื้อเยื่อจะช่วยให้กล้วยเจริญเติบโตสม่ำเสมอ ออกเครือพร้อมกัน และปลอดโรค (เช่น โรคตายพราย) แต่อาจมีราคาสูงกว่าหน่อกล้วยทั่วไป</li>
          <li><strong>ค่าไม้ค้ำหรือเชือกโยง:</strong> เป็นสิ่งที่ขาดไม่ได้เลยโดยเฉพาะ <strong>กล้วยหอม</strong> เนื่องจากเครือมีน้ำหนักมาก หากมีลมพัดหรือฝนตกหนัก ต้นกล้วยอาจหักกลางต้นก่อนเก็บเกี่ยวได้ </li>
          <li><strong>ค่าถุงห่อเครือ:</strong> เพื่อป้องกันแมลงวันทองเจาะผิว ป้องกันรอยขีดข่วน ทำให้ผิวกล้วยสวยเนียน เป็นที่ต้องการของตลาดพรีเมียมและห้างสรรพสินค้า</li>
          <li><strong>ค่าปุ๋ยและระบบน้ำ:</strong> กล้วยชอบน้ำแต่ไม่ชอบน้ำขัง การมีระบบน้ำสปริงเกอร์หรือน้ำหยดจะช่วยให้ผลผลิตดีในช่วงหน้าแล้ง การให้ปุ๋ยคอกร่วมกับปุ๋ยเคมีจะทำให้ลูกใหญ่ หวีดก</li>
        </ul>

        <h3 className="text-xl font-semibold text-yellow-700 mt-6 mb-3">
          เคล็ดลับการเพิ่มมูลค่าและกำไรจากสวนกล้วย
        </h3>
        <p>
          นอกจากการขายกล้วยเป็นเครือหรือเป็นหวีแล้ว เกษตรกรสามารถเพิ่มรายได้จากการขาย <strong>"ใบตอง"</strong> (โดยเฉพาะกล้วยตานีหรือกล้วยน้ำว้า) ขายปลีกล้วย และขาย <strong>"หน่อกล้วย"</strong> ให้กับผู้ที่สนใจนำไปปลูกต่อได้อีกด้วย 
          <br /><br />
          นอกจากนี้ การวางแผน "การไว้หน่อ" อย่างถูกวิธี (โดยทั่วไปจะปล่อยหน่อทดแทนไว้ 1-2 หน่อต่อกอ) จะทำให้หลังจากการตัดเครือแรกไปแล้ว ต้นใหม่สามารถเจริญเติบโตขึ้นมาให้ผลผลิตในรอบที่ 2 และ 3 ได้ทันที โดยแทบไม่ต้องเสียค่าหน่อพันธุ์และค่าเตรียมดินใหม่เลย ถือเป็นการลดต้นทุนในปีถัดไปได้อย่างมหาศาล
        </p>

        <h3 className="text-xl font-semibold text-yellow-700 mt-6 mb-3">
          ประโยชน์ของการใช้เครื่องมือคำนวณ
        </h3>
        <p>
          โปรแกรมจำลองการคำนวณนี้ จะช่วยให้ท่านกรอกตัวเลขจำนวนต้นที่ปลูก และราคาตลาด เพื่อคาดการณ์รายรับและหักลบต้นทุนต่างๆ ออกมาเป็น <strong>กำไรสุทธิ</strong> ต่อรอบการผลิต ท่านสามารถปรับเปลี่ยนตัวเลขเช่น ค่าแรง หรือค่าหน่อพันธุ์ เพื่อหาจุดที่คุ้มทุนที่สุดก่อนเริ่มลงมือปลูกจริง
        </p>
      </div>
    </div>
  );
}

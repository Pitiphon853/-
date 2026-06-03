import React, { useState } from 'react';
import { Calculator, DollarSign, Egg, Bird, Info } from 'lucide-react';

export default function LayerChickenFarmProfitCost({ lang }: { lang: any }) {
  const [chickens, setChickens] = useState(1000);
  const [chickenCost, setChickenCost] = useState(150);
  const [feedPerDay, setFeedPerDay] = useState(115);
  const [feedPrice, setFeedPrice] = useState(15);
  const [days, setDays] = useState(365);
  const [medCost, setMedCost] = useState(10);
  const [otherCosts, setOtherCosts] = useState(20000);
  const [layRate, setLayRate] = useState(85);
  const [eggPrice, setEggPrice] = useState(3.5);
  const [cullPrice, setCullPrice] = useState(40);

  const totalChickenCost = chickens * chickenCost;
  const totalFeedKg = (chickens * feedPerDay * days) / 1000;
  const totalFeedCost = totalFeedKg * feedPrice;
  const totalMedCost = chickens * medCost;
  
  const totalCost = totalChickenCost + totalFeedCost + totalMedCost + otherCosts;

  const totalEggs = (chickens * layRate / 100) * days;
  const totalEggRevenue = totalEggs * eggPrice;
  const totalCullRevenue = chickens * cullPrice;
  
  const totalRevenue = totalEggRevenue + totalCullRevenue;
  const profit = totalRevenue - totalCost;
  const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;
  
  const costPerEgg = totalEggs > 0 ? (totalCost - totalCullRevenue) / totalEggs : 0;

  const t = lang === 'EN' ? {
    title: "Layer Chicken Farm Profit/Cost Calculator",
    inputs: "Farm Parameters",
    chickens: "Number of Chickens",
    chickenCost: "Pullet Cost (Baht/bird)",
    feedPerDay: "Feed per Bird/Day (g)",
    feedPrice: "Feed Price (Baht/kg)",
    days: "Rearing Period (Days)",
    medCost: "Medication/Vaccine (Baht/bird)",
    otherCosts: "Other Costs (Water, Electricity, Labor) (Baht)",
    layRate: "Laying Rate (%)",
    eggPrice: "Average Egg Price (Baht/egg)",
    cullPrice: "Cull Hen Selling Price (Baht/bird)",
    summary: "Financial Summary",
    totalCost: "Total Cost",
    totalRevenue: "Total Revenue",
    profit: "Net Profit",
    roi: "ROI (%)",
    costPerEgg: "Cost per Egg",
    baht: "Baht",
    eggs: "eggs",
    totalEggs: "Total Egg Production",
    desc: "Calculate comprehensive costs and profits for a layer chicken farm."
  } : {
    title: "โปรแกรมคำนวณต้นทุน-กำไร ฟาร์มไก่ไข่",
    inputs: "ข้อมูลฟาร์ม",
    chickens: "จำนวนไก่ (ตัว)",
    chickenCost: "ราคาไก่สาว (บาท/ตัว)",
    feedPerDay: "ปริมาณอาหาร/ตัว/วัน (กรัม)",
    feedPrice: "ราคาอาหารไก่ (บาท/กก.)",
    days: "ระยะเวลาการเลี้ยง (วัน)",
    medCost: "ค่ายา/วัคซีน (บาท/ตัว)",
    otherCosts: "ค่าใช้จ่ายอื่นๆ (น้ำ, ไฟ, แรงงาน) (บาท)",
    layRate: "อัตราการไข่เฉลี่ย (%)",
    eggPrice: "ราคาไข่ไก่เฉลี่ย (บาท/ฟอง)",
    cullPrice: "ราคาขายไก่ปลดระวาง (บาท/ตัว)",
    summary: "สรุปผลการเงิน",
    totalCost: "ต้นทุนรวม",
    totalRevenue: "รายได้รวม",
    profit: "กำไรสุทธิ",
    roi: "ผลตอบแทนการลงทุน (ROI)",
    costPerEgg: "ต้นทุนไข่ต่อฟอง",
    baht: "บาท",
    eggs: "ฟอง",
    totalEggs: "ผลผลิตไข่รวม",
    desc: "ประเมินต้นทุน รายได้ และกำไรของการทำฟาร์มไก่ไข่อย่างละเอียด"
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
          <Egg className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
          <p className="text-gray-500">{t.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Bird className="w-5 h-5 text-orange-500" />
            {t.inputs}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.chickens}</label>
              <input type="number" value={chickens} onChange={(e) => setChickens(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.chickenCost}</label>
                <input type="number" value={chickenCost} onChange={(e) => setChickenCost(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.cullPrice}</label>
                <input type="number" value={cullPrice} onChange={(e) => setCullPrice(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.feedPerDay}</label>
                <input type="number" value={feedPerDay} onChange={(e) => setFeedPerDay(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.feedPrice}</label>
                <input type="number" value={feedPrice} onChange={(e) => setFeedPrice(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.days}</label>
                <input type="number" value={days} onChange={(e) => setDays(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.layRate}</label>
                <input type="number" value={layRate} onChange={(e) => setLayRate(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.medCost}</label>
                <input type="number" value={medCost} onChange={(e) => setMedCost(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.eggPrice}</label>
                <input type="number" step="0.1" value={eggPrice} onChange={(e) => setEggPrice(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.otherCosts}</label>
              <input type="number" value={otherCosts} onChange={(e) => setOtherCosts(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-green-500" />
            {t.summary}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">{t.totalCost}</span>
              <span className="font-semibold">{totalCost.toLocaleString(undefined, {maximumFractionDigits: 2})} {t.baht}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">{t.totalEggs}</span>
              <span className="font-semibold">{totalEggs.toLocaleString(undefined, {maximumFractionDigits: 0})} {t.eggs}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-gray-600">{t.totalRevenue}</span>
              <span className="font-semibold text-green-600">{totalRevenue.toLocaleString(undefined, {maximumFractionDigits: 2})} {t.baht}</span>
            </div>

            <div className={`flex justify-between items-center p-4 rounded-lg text-lg ${profit >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <span className="font-semibold">{t.profit}</span>
              <span className="font-bold">{profit.toLocaleString(undefined, {maximumFractionDigits: 2})} {t.baht}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <div className="text-xs text-gray-500 mb-1">{t.roi}</div>
                <div className={`font-semibold ${roi >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {roi.toFixed(2)}%
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg text-center">
                <div className="text-xs text-gray-500 mb-1">{t.costPerEgg}</div>
                <div className="font-semibold text-purple-600">
                  {costPerEgg.toFixed(2)} {t.baht}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-orange max-w-none mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          คู่มือการคำนวณต้นทุนและกำไร ฟาร์มไก่ไข่
        </h2>
        
        <p className="mb-4">
          การทำฟาร์มไก่ไข่เป็นหนึ่งในธุรกิจเกษตรที่ได้รับความนิยมสูง เนื่องจากไข่ไก่เป็นอาหารโปรตีนราคาประหยัดที่ตลาดมีความต้องการอย่างต่อเนื่องและสม่ำเสมอ แต่อย่างไรก็ตาม การทำฟาร์มไก่ไข่ให้ประสบความสำเร็จนั้น ไม่ใช่เพียงแค่การเลี้ยงไก่ให้ออกไข่แล้วนำไปขาย แต่ผู้ประกอบการจะต้องมีความเข้าใจอย่างลึกซึ้งเกี่ยวกับการบริหารจัดการ <strong>ต้นทุน</strong> และการพยากรณ์ <strong>กำไร</strong> เพื่อลดความเสี่ยงจากการขาดทุนและเพิ่มผลกำไรสูงสุด
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          องค์ประกอบของต้นทุนฟาร์มไก่ไข่
        </h3>
        <p className="mb-4">
          การเริ่มต้นและการดำเนินการฟาร์มไก่ไข่ มีต้นทุนหลักๆ ที่ผู้เลี้ยงต้องพิจารณา ดังนี้:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>ต้นทุนไก่สาว:</strong> โดยทั่วไปเกษตรกรนิยมซื้อ "ไก่สาว" อายุประมาณ 16-18 สัปดาห์เข้ามาเลี้ยง เพื่อให้ไก่พร้อมไข่ได้ในเวลาไม่นาน ราคาไก่สาวจะแปรผันตามสายพันธุ์และช่วงเวลา</li>
          <li><strong>ต้นทุนค่าอาหาร:</strong> เป็นต้นทุนที่สูงที่สุดในการทำฟาร์มไก่ไข่ (คิดเป็น 60-70% ของต้นทุนรวม) ไก่ไข่ 1 ตัวจะกินอาหารประมาณ 110-120 กรัมต่อวัน หากอาหารไก่ราคาแพงขึ้น จะส่งผลกระทบต่อต้นทุนรวมอย่างมาก</li>
          <li><strong>ค่ายาและวัคซีน:</strong> สิ่งสำคัญในการป้องกันโรคระบาด การฉีดวัคซีนตามโปรแกรมและการให้วิตามินจะช่วยรักษาสุขภาพของแม่ไก่</li>
          <li><strong>ค่าใช้จ่ายอื่นๆ (Overhead costs):</strong> เช่น ค่าน้ำมันเชื้อเพลิง ค่าไฟฟ้า ค่าน้ำบาดาล ค่าแรงงาน และค่าบำรุงรักษาโรงเรือน</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          การวิเคราะห์รายได้ของฟาร์ม
        </h3>
        <p className="mb-4">
          รายได้หลักของฟาร์มไก่ไข่มาจาก 2 แหล่งหลัก ได้แก่:
        </p>
        <ol className="list-decimal pl-6 mb-4 space-y-2">
          <li><strong>รายได้จากการขายไข่:</strong> ขึ้นอยู่กับ "อัตราการไข่" (Laying Rate) โดยไก่สายพันธุ์ดีในสภาพแวดล้อมที่เหมาะสมอาจให้อัตราไข่สูงถึง 85-90% ในช่วงพีค จำนวนไข่ที่ได้คูณกับราคาขายหน้าฟาร์มคือรายได้หลักของคุณ</li>
          <li><strong>รายได้จากการขายไก่ปลดระวาง:</strong> เมื่อเลี้ยงไก่ไปจนอายุประมาณ 72-80 สัปดาห์ อัตราการไข่จะลดลงจนไม่คุ้มค่าอาหาร เกษตรกรจะทำการ "ปลดระวาง" หรือขายเป็นไก่เนื้อออกสู่ตลาด ซึ่งเงินส่วนนี้สามารถนำมาหมุนเวียนในการซื้อไก่สาวรุ่นต่อไปได้</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          เทคนิคการเพิ่มผลกำไร
        </h3>
        <p className="mb-4">
          ผู้เลี้ยงสามารถเพิ่มกำไรได้โดยการควบคุม <strong>ต้นทุนไข่ต่อฟอง</strong> ให้ต่ำกว่าราคาตลาด วิธีการคือการให้อาหารที่มีคุณภาพ ไม่สูญเปล่า การออกแบบโรงเรือนที่ดี (เช่น โรงเรือนระบบปิด Evap) จะช่วยลดความเครียดของไก่ ทำให้อัตราการไข่คงที่แม้ในฤดูร้อน นอกจากนี้ การทำบัญชีฟาร์มอย่างสม่ำเสมอ โดยใช้เครื่องมือคำนวณเช่น <em>โปรแกรมคำนวณต้นทุน-กำไร ฟาร์มไก่ไข่</em> ที่เราออกแบบมานี้ จะช่วยให้คุณเห็นภาพรวมทางการเงินและสามารถตัดสินใจปรับปรุงการเลี้ยงได้ทันท่วงที
        </p>
        <p>
          ท้ายที่สุด การลงทุนฟาร์มไก่ไข่จำเป็นต้องอาศัยการประเมิน ROI (ผลตอบแทนการลงทุน) อย่างรอบคอบ หากคุณสามารถบริหารจัดการต้นทุนค่าอาหารได้ดี และรักษาอัตราการรอดชีวิต/อัตราการไข่ของแม่ไก่ไว้ในระดับมาตรฐาน ธุรกิจนี้ก็จะสร้างรายได้ที่มั่นคงให้กับคุณในระยะยาว
        </p>
      </article>
    </div>
  );
}

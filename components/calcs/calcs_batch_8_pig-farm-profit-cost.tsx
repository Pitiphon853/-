import React, { useState } from 'react';
import { Calculator, DollarSign, Target, Activity, Info } from 'lucide-react';

export default function PigFarmProfitCost({ lang }: { lang: any }) {
  const [pigs, setPigs] = useState(100);
  const [pigletCost, setPigletCost] = useState(1800);
  const [feedTotal, setFeedTotal] = useState(250); // kg per pig per cycle
  const [feedPrice, setFeedPrice] = useState(16); // baht per kg
  const [medCost, setMedCost] = useState(250); // per pig
  const [otherCosts, setOtherCosts] = useState(10000); // per cycle
  const [harvestWeight, setHarvestWeight] = useState(100); // kg per pig
  const [pigPrice, setPigPrice] = useState(70); // baht per kg
  const [mortalityRate, setMortalityRate] = useState(3); // percent

  const livePigs = pigs * (1 - mortalityRate / 100);
  
  const totalPigletCost = pigs * pigletCost;
  // Assumption: dead pigs still consumed half their feed, simplified as full feed for all started pigs or partial. 
  // Let's use feed for total pigs started to be conservative.
  const totalFeedCost = pigs * feedTotal * feedPrice; 
  const totalMedCost = pigs * medCost;
  
  const totalCost = totalPigletCost + totalFeedCost + totalMedCost + otherCosts;

  const totalHarvestWeight = livePigs * harvestWeight;
  const totalRevenue = totalHarvestWeight * pigPrice;
  
  const profit = totalRevenue - totalCost;
  const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;
  
  const costPerKg = totalHarvestWeight > 0 ? totalCost / totalHarvestWeight : 0;

  const t = lang === 'EN' ? {
    title: "Pig Farm Profit/Cost Calculator",
    inputs: "Farm Parameters",
    pigs: "Number of Piglets",
    pigletCost: "Piglet Cost (Baht/head)",
    feedTotal: "Total Feed per Pig (kg/cycle)",
    feedPrice: "Feed Price (Baht/kg)",
    medCost: "Medication & Vaccines (Baht/head)",
    otherCosts: "Other Costs (Water, Power, Labor) (Baht)",
    harvestWeight: "Harvest Weight (kg/head)",
    pigPrice: "Selling Price (Baht/kg)",
    mortalityRate: "Mortality Rate (%)",
    summary: "Financial Summary",
    totalCost: "Total Cost",
    totalRevenue: "Total Revenue",
    profit: "Net Profit",
    roi: "ROI (%)",
    costPerKg: "Cost per kg",
    livePigs: "Pigs Harvested",
    baht: "Baht",
    desc: "Calculate comprehensive costs, revenues, and profit margins for a commercial pig farm."
  } : {
    title: "โปรแกรมคำนวณต้นทุน-กำไร ฟาร์มสุกร (หมูขุน)",
    inputs: "ข้อมูลฟาร์ม",
    pigs: "จำนวนลูกหมู (ตัว)",
    pigletCost: "ราคาลูกหมูหย่านม (บาท/ตัว)",
    feedTotal: "ปริมาณอาหารตลอดรุ่น (กก./ตัว)",
    feedPrice: "ราคาอาหารเฉลี่ย (บาท/กก.)",
    medCost: "ค่ายาและวัคซีน (บาท/ตัว)",
    otherCosts: "ค่าใช้จ่ายอื่นๆ (น้ำ,ไฟ,แรงงาน) (บาท/รุ่น)",
    harvestWeight: "น้ำหนักจับขาย (กก./ตัว)",
    pigPrice: "ราคาหมูหน้าฟาร์ม (บาท/กก.)",
    mortalityRate: "อัตราสูญเสีย/ตาย (%)",
    summary: "สรุปผลการเงิน",
    totalCost: "ต้นทุนรวม",
    totalRevenue: "รายได้รวม",
    profit: "กำไรสุทธิ",
    roi: "ผลตอบแทนการลงทุน (ROI)",
    costPerKg: "ต้นทุนต่อกิโลกรัม (บาท/กก.)",
    livePigs: "จำนวนหมูที่รอดจับขาย",
    baht: "บาท",
    desc: "ประเมินต้นทุน รายรับ และกำไรสุทธิของการทำฟาร์มหมูขุนใน 1 รอบการผลิต"
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-pink-100 text-pink-600 rounded-lg">
          <Activity className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
          <p className="text-gray-500">{t.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-pink-50 p-6 rounded-xl border border-pink-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-pink-500" />
            {t.inputs}
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.pigs}</label>
                <input type="number" value={pigs} onChange={(e) => setPigs(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.mortalityRate}</label>
                <input type="number" value={mortalityRate} onChange={(e) => setMortalityRate(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.pigletCost}</label>
                <input type="number" value={pigletCost} onChange={(e) => setPigletCost(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.medCost}</label>
                <input type="number" value={medCost} onChange={(e) => setMedCost(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.feedTotal}</label>
                <input type="number" value={feedTotal} onChange={(e) => setFeedTotal(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.feedPrice}</label>
                <input type="number" value={feedPrice} onChange={(e) => setFeedPrice(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.harvestWeight}</label>
                <input type="number" value={harvestWeight} onChange={(e) => setHarvestWeight(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.pigPrice}</label>
                <input type="number" value={pigPrice} onChange={(e) => setPigPrice(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.otherCosts}</label>
              <input type="number" value={otherCosts} onChange={(e) => setOtherCosts(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:outline-none" />
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
              <span className="text-gray-600">{t.livePigs}</span>
              <span className="font-semibold">{Math.floor(livePigs).toLocaleString()} ตัว</span>
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
                <div className="text-xs text-gray-500 mb-1">{t.costPerKg}</div>
                <div className="font-semibold text-purple-600">
                  {costPerKg.toFixed(2)} {t.baht}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-pink max-w-none mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          การวิเคราะห์ต้นทุนและกำไรจากการเลี้ยงหมูขุน
        </h2>
        
        <p className="mb-4">
          อุตสาหกรรมการเลี้ยงสุกรหรือ "หมูขุน" เป็นหนึ่งในเสาหลักของภาคปศุสัตว์ไทย ความต้องการเนื้อหมูเพื่อการบริโภคมีอยู่ตลอดปีทำให้เป็นอาชีพที่สร้างรายได้เป็นกอบเป็นกำให้แก่เกษตรกรจำนวนมาก อย่างไรก็ตาม การจะดำเนินธุรกิจฟาร์มหมูให้ประสบความสำเร็จและมีกำไรอย่างยั่งยืนนั้น เกษตรกรจำเป็นต้องมีการวางแผนการเงินและวิเคราะห์ต้นทุน (Cost Analysis) อย่างรัดกุม โดยเฉพาะต้นทุนด้านอาหารสัตว์ที่ผันผวน
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          โครงสร้างต้นทุนฟาร์มหมูขุน
        </h3>
        <p className="mb-4">
          ใน 1 รอบการเลี้ยง (ประมาณ 4-5 เดือนนับจากลูกหมูหย่านมจนถึงน้ำหนักจับขายประมาณ 100-110 กิโลกรัม) ต้นทุนจะถูกแบ่งออกเป็นส่วนหลักๆ ดังนี้:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>ลูกหมูหย่านม (สายพันธุ์):</strong> ต้นทุนเริ่มต้นในการจัดหาลูกหมู สายพันธุ์ที่ดีจะโตไว กินอาหารเก่ง และให้อัตราแลกเนื้อ (FCR) ที่ดี ซึ่งจะส่งผลโดยตรงต่อต้นทุนอาหารในระยะยาว</li>
          <li><strong>ค่าอาหารหมู:</strong> คิดเป็น 60-75% ของต้นทุนทั้งหมด หมูขุน 1 ตัวจะกินอาหารตั้งแต่เล็กจนจับขายรวมประมาณ 250-280 กิโลกรัม การจัดการอาหารไม่ให้หกหล่นและการเลือกสูตรอาหารที่เหมาะสมตามช่วงอายุจึงเป็นกุญแจสำคัญสู่ความคุ้มทุน</li>
          <li><strong>ค่ายา วัคซีน และเวชภัณฑ์:</strong> เพื่อป้องกันโรคระบาดที่อาจสร้างความสูญเสียมหาศาล เช่น โรค PRRS หรือ ASF รวมถึงค่าวิตามินต่างๆ</li>
          <li><strong>ค่าใช้จ่ายเบ็ดเตล็ด:</strong> ค่าน้ำ ค่าไฟ ค่าแก๊สสำหรับกกหมูเล็ก ค่าแรงงาน และค่าเสื่อมโรงเรือน</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          จุดคุ้มทุนและปัจจัยเสี่ยง
        </h3>
        <p className="mb-4">
          ปัจจัยที่จะเป็นตัวชี้วัดความสำเร็จคือ <strong>"ต้นทุนต่อกิโลกรัม" (Cost per kg)</strong> หากคำนวณออกมาแล้วว่าต้นทุนของคุณอยู่ที่ 65 บาท/กิโลกรัม แต่ราคาหมูหน้าฟาร์มในตลาดอยู่ที่ 70 บาท/กิโลกรัม นั่นหมายถึงคุณมีกำไร 5 บาทต่อกิโลกรัม แต่หากราคาร่วงลงไปต่ำกว่าต้นทุน ฟาร์มจะเริ่มขาดทุนทันที
        </p>
        <p className="mb-4">
          นอกจากราคาตลาดแล้ว <strong>อัตราการสูญเสีย (Mortality Rate)</strong> เป็นอีกหนึ่งความเสี่ยง หากดูแลระบบไบโอซีเคียวริตี้ (Biosecurity) ไม่ดี หรืออากาศแปรปรวน หมูอาจล้มตาย ซึ่งทุกตัวที่ตายหมายถึงการสูญเสียทั้งค่าตัวหมูและค่าอาหารที่กินเข้าไปแล้ว
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          โปรแกรมคำนวณต้นทุน-กำไร
        </h3>
        <p className="mb-4">
          เครื่องมือคำนวณที่เราจัดทำขึ้นนี้ (Pig Farm Profit Calculator) ช่วยให้คุณสามารถกรอกตัวเลขจริงของฟาร์ม เพื่อประเมินสถานการณ์ล่วงหน้า โดยสามารถทดลองปรับเปลี่ยนราคาอาหาร หรือปรับราคารับซื้อ เพื่อจำลองสถานการณ์และดูผลกระทบต่อกำไรสุทธิ (Net Profit) และผลตอบแทนการลงทุน (ROI) สิ่งนี้จะช่วยให้เกษตรกรสามารถตัดสินใจได้ว่าควรเพิ่มประสิทธิภาพในจุดใด เช่น อาจต้องเปลี่ยนผู้จำหน่ายอาหาร หรือต้องปรับปรุงระบบคอกให้หมูเจริญเติบโตได้ดีขึ้น
        </p>
      </article>
    </div>
  );
}

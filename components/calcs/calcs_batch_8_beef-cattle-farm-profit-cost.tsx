import React, { useState } from 'react';
import { Calculator, DollarSign, Activity, TrendingUp } from 'lucide-react';

export default function BeefCattleFarmProfitCost({ lang }: { lang: any }) {
  const [cattle, setCattle] = useState(10);
  const [calfCost, setCalfCost] = useState(25000);
  const [months, setMonths] = useState(6);
  const [concentrateCostPerMonth, setConcentrateCostPerMonth] = useState(900);
  const [roughageCostPerMonth, setRoughageCostPerMonth] = useState(300);
  const [medCost, setMedCost] = useState(500); // total per head
  const [otherCosts, setOtherCosts] = useState(10000); // total per cycle
  const [harvestWeight, setHarvestWeight] = useState(550); // kg
  const [pricePerKg, setPricePerKg] = useState(100);

  const totalCalfCost = cattle * calfCost;
  const totalFeedCost = cattle * (concentrateCostPerMonth + roughageCostPerMonth) * months;
  const totalMedCost = cattle * medCost;
  
  const totalCost = totalCalfCost + totalFeedCost + totalMedCost + otherCosts;

  const totalRevenue = cattle * harvestWeight * pricePerKg;
  
  const profit = totalRevenue - totalCost;
  const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;
  
  const raisingCostPerHead = (totalFeedCost + totalMedCost + otherCosts) / (cattle || 1);

  const t = lang === 'EN' ? {
    title: "Beef Cattle Farm Profit/Cost Calculator",
    inputs: "Farm Parameters",
    cattle: "Number of Cattle (heads)",
    calfCost: "Feeder Cattle Cost (Baht/head)",
    months: "Fattening Period (months)",
    concentrateCostPerMonth: "Concentrate Feed (Baht/head/month)",
    roughageCostPerMonth: "Roughage/Grass (Baht/head/month)",
    medCost: "Medicine/Vaccine (Baht/head/cycle)",
    otherCosts: "Other Costs (Water, Power, Labor) (Baht)",
    harvestWeight: "Harvest Weight (kg/head)",
    pricePerKg: "Selling Price (Baht/kg)",
    summary: "Financial Summary",
    totalCost: "Total Cost",
    totalRevenue: "Total Revenue",
    profit: "Net Profit",
    roi: "ROI (%)",
    raisingCostPerHead: "Raising Cost per Head (excl. animal cost)",
    baht: "Baht",
    desc: "Calculate comprehensive costs, revenues, and profit margins for a beef cattle fattening farm."
  } : {
    title: "โปรแกรมคำนวณต้นทุน-กำไร ฟาร์มโคเนื้อ (โคขุน)",
    inputs: "ข้อมูลฟาร์มโคเนื้อ",
    cattle: "จำนวนโคขุน (ตัว)",
    calfCost: "ราคาโคต้นน้ำ/โครุ่น (บาท/ตัว)",
    months: "ระยะเวลาขุน (เดือน)",
    concentrateCostPerMonth: "ค่าอาหารข้น (บาท/ตัว/เดือน)",
    roughageCostPerMonth: "ค่าอาหารหยาบ/หญ้า (บาท/ตัว/เดือน)",
    medCost: "ค่ายาและวัคซีน (บาท/ตัว/รอบ)",
    otherCosts: "ค่าใช้จ่ายอื่นๆ (น้ำ,ไฟ,คนงาน) (บาท/รอบ)",
    harvestWeight: "น้ำหนักเฉลี่ยตอนจับขาย (กก./ตัว)",
    pricePerKg: "ราคาโคเนื้อมีชีวิต (บาท/กก.)",
    summary: "สรุปผลการเงิน",
    totalCost: "ต้นทุนรวม",
    totalRevenue: "รายได้รวม",
    profit: "กำไรสุทธิ",
    roi: "ผลตอบแทนการลงทุน (ROI)",
    raisingCostPerHead: "ต้นทุนการเลี้ยงต่อตัว (ไม่รวมค่าตัวโค)",
    baht: "บาท",
    desc: "ประเมินต้นทุน ค่าอาหาร และกำไรสุทธิของการเลี้ยงโคเนื้อหรือโคขุนใน 1 รอบการผลิต"
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
          <Activity className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
          <p className="text-gray-500">{t.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-500" />
            {t.inputs}
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.cattle}</label>
                <input type="number" value={cattle} onChange={(e) => setCattle(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.months}</label>
                <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.calfCost}</label>
              <input type="number" value={calfCost} onChange={(e) => setCalfCost(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.concentrateCostPerMonth}</label>
                <input type="number" value={concentrateCostPerMonth} onChange={(e) => setConcentrateCostPerMonth(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.roughageCostPerMonth}</label>
                <input type="number" value={roughageCostPerMonth} onChange={(e) => setRoughageCostPerMonth(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.harvestWeight}</label>
                <input type="number" value={harvestWeight} onChange={(e) => setHarvestWeight(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.pricePerKg}</label>
                <input type="number" value={pricePerKg} onChange={(e) => setPricePerKg(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.medCost}</label>
                <input type="number" value={medCost} onChange={(e) => setMedCost(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.otherCosts}</label>
                <input type="number" value={otherCosts} onChange={(e) => setOtherCosts(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            {t.summary}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">{t.totalCost}</span>
              <span className="font-semibold">{totalCost.toLocaleString(undefined, {maximumFractionDigits: 2})} {t.baht}</span>
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
              <div className="p-3 bg-orange-50 rounded-lg text-center">
                <div className="text-xs text-gray-500 mb-1">{t.raisingCostPerHead}</div>
                <div className="font-semibold text-orange-600">
                  {Math.round(raisingCostPerHead).toLocaleString()} {t.baht}/ตัว
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-amber max-w-none mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          การวิเคราะห์ต้นทุนและกำไรจากการทำฟาร์มโคเนื้อ (โคขุน)
        </h2>
        
        <p className="mb-4">
          การเลี้ยงโคเนื้อและโคขุนเป็นหนึ่งในอาชีพเกษตรกรรมที่ได้รับความสนใจอย่างต่อเนื่อง เนื่องจากความต้องการบริโภคเนื้อวัวทั้งในประเทศและต่างประเทศมีการเติบโต อีกทั้งเนื้อวัวคุณภาพดียังสามารถขายได้ในราคาสูง อย่างไรก็ตาม การเลี้ยงโคขุนให้ได้กำไรนั้นจำเป็นต้องใช้เงินลงทุนสูงในระยะเริ่มต้น และใช้ระยะเวลาการเลี้ยงหลายเดือน ผู้เลี้ยงจึงต้องมีการบริหารจัดการฟาร์มที่ดีเยี่ยม โดยเฉพาะในด้านการจัดการ "ต้นทุนอาหาร" เพื่อให้เกิดความคุ้มค่าสูงสุด
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          องค์ประกอบหลักของต้นทุนฟาร์มโคเนื้อ
        </h3>
        <p className="mb-4">
          สำหรับเกษตรกรที่เลี้ยงแบบ "ซื้อมา-ขุน-ขายไป" ต้นทุนสามารถแบ่งออกเป็นหมวดหมู่หลักๆ ได้ดังนี้:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>ต้นทุนโคต้นน้ำ (โครุ่น):</strong> เป็นรายจ่ายก้อนใหญ่ที่สุดในตอนเริ่มต้น เกษตรกรมักจะซื้อโคที่มีโครงสร้างดี น้ำหนักประมาณ 200-300 กิโลกรัม เข้ามาขุนต่อ ราคาจะแปรผันตามสายพันธุ์ (เช่น ชาร์โรเลส์, แองกัส, บราห์มัน) และรูปร่าง</li>
          <li><strong>ต้นทุนค่าอาหาร:</strong> แบ่งเป็นอาหารหยาบ (เช่น หญ้าสด หญ้าหมัก ฟางข้าว) ซึ่งเป็นอาหารหลักที่ขาดไม่ได้ และ อาหารข้น (หัวอาหาร) ที่ช่วยเร่งการเจริญเติบโต สร้างกล้ามเนื้อและไขมันแทรก การจัดสมดุลระหว่างอาหารหยาบและอาหารข้นจะช่วยให้วัวโตไวในต้นทุนที่ต่ำลง</li>
          <li><strong>ค่ายา เวชภัณฑ์ และวัคซีน:</strong> โคที่ซื้อเข้ามาใหม่จำเป็นต้องมีการถ่ายพยาธิ ฉีดวัคซีนป้องกันโรคปากและเท้าเปื่อย และบำรุงวิตามิน เพื่อลดความเสี่ยงต่อโรคและอัตราการตาย</li>
          <li><strong>ต้นทุนดำเนินการอื่นๆ:</strong> เช่น ค่าจ้างคนงานทำความสะอาดคอก ค่าน้ำประปา ค่าไฟฟ้า ค่าขนส่ง และค่าเสื่อมโรงเรือน</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          เคล็ดลับการเพิ่มกำไรในการเลี้ยงโคขุน
        </h3>
        <p className="mb-4">
          จุดชี้วัดว่าฟาร์มจะได้กำไรหรือขาดทุนอยู่ที่ <strong>"อัตราการแลกเนื้อ" (FCR - Feed Conversion Ratio)</strong> และ <strong>"อัตราการเจริญเติบโตต่อวัน" (ADG - Average Daily Gain)</strong> หากวัวกินอาหาร 10 กิโลกรัมแล้วน้ำหนักตัวเพิ่มขึ้นได้มาก ย่อมหมายถึงความคุ้มค่าที่สูงขึ้น ผู้เลี้ยงสามารถเพิ่มกำไรได้โดย:
        </p>
        <ol className="list-decimal pl-6 mb-4 space-y-2">
          <li><strong>การใช้วัตถุดิบในท้องถิ่น:</strong> การนำเปลือกสับปะรด กากมันสำปะหลัง หรือกากเบียร์ มาผสมเป็นอาหาร TMR (Total Mixed Ration) จะช่วยลดต้นทุนค่าอาหารข้นสำเร็จรูปได้อย่างมหาศาล</li>
          <li><strong>การคัดเลือกสายพันธุ์:</strong> โคพันธุ์ลูกผสมยุโรปจะมีการเติบโตดีกว่าโคพื้นเมืองเมื่อได้รับการขุนอย่างเต็มที่</li>
          <li><strong>ระยะเวลาขุนที่เหมาะสม:</strong> โดยปกติจะขุนประมาณ 4-6 เดือน (Short-term) หรือมากกว่า 12 เดือน (Long-term สำหรับเนื้อพรีเมียม) การเลี้ยงนานเกินไปหลังจากที่วัวโตเต็มที่แล้ว จะทำให้สิ้นเปลืองอาหารเพราะน้ำหนักจะไม่เพิ่มขึ้นในอัตราที่คุ้มค่าอีกต่อไป</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          โปรแกรมคำนวณต้นทุน-กำไร ฟาร์มโคเนื้อ
        </h3>
        <p className="mb-4">
          ด้วย <em>โปรแกรมคำนวณต้นทุน-กำไร ฟาร์มโคเนื้อ</em> ที่เราพัฒนาขึ้นนี้ คุณสามารถกรอกราคาโคต้นน้ำ ค่าอาหารเฉลี่ยต่อเดือน และราคาขาย เพื่อจำลองภาพรวมทางการเงินได้ทันที เครื่องมือนี้จะช่วยคำนวณ "ต้นทุนการเลี้ยงต่อตัว" ทำให้คุณทราบได้ว่าตลอดระยะเวลาการขุน คุณใช้เงินไปเท่าไร และเมื่อขายออกไปแล้วจะได้กำไรสุทธิกี่บาท เป็นตัวช่วยสำคัญในการตัดสินใจก่อนลงทุนซื้อโคล็อตใหม่เข้าฟาร์มได้อย่างมั่นใจ
        </p>
      </article>
    </div>
  );
}

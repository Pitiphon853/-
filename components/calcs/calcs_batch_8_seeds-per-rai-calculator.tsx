import React, { useState } from 'react';
import { Calculator, CheckCircle2, Sprout } from 'lucide-react';

export default function SeedsPerRaiCalculator({ lang }: { lang: any }) {
  const [rowSpacing, setRowSpacing] = useState(75); // cm
  const [plantSpacing, setPlantSpacing] = useState(25); // cm
  const [areaRai, setAreaRai] = useState(1);
  const [seedsPerHole, setSeedsPerHole] = useState(1);
  const [germinationRate, setGerminationRate] = useState(85); // percent
  const [seedsPerKg, setSeedsPerKg] = useState(3000); // e.g. corn approx 3000-4000 seeds/kg

  // 1 Rai = 1600 sqm
  // spacing in meters
  const rowSpacingM = rowSpacing / 100;
  const plantSpacingM = plantSpacing / 100;
  
  const areaSqm = areaRai * 1600;
  
  // Plants/Holes per Rai = 1600 / (rowSpacingM * plantSpacingM)
  const holesPerRai = (rowSpacingM > 0 && plantSpacingM > 0) ? 1600 / (rowSpacingM * plantSpacingM) : 0;
  const totalHoles = holesPerRai * areaRai;
  
  const pureSeedsNeeded = totalHoles * seedsPerHole;
  // Account for germination rate
  const totalSeedsNeeded = germinationRate > 0 ? pureSeedsNeeded / (germinationRate / 100) : 0;
  
  const totalSeedWeightKg = seedsPerKg > 0 ? totalSeedsNeeded / seedsPerKg : 0;

  const t = lang === 'EN' ? {
    title: "Seeds per Rai Calculator",
    inputs: "Planting Parameters",
    rowSpacing: "Row Spacing (cm)",
    plantSpacing: "Plant Spacing (cm)",
    areaRai: "Planting Area (Rai)",
    seedsPerHole: "Seeds per Hole",
    germinationRate: "Germination Rate (%)",
    seedsPerKg: "Seeds per kg",
    summary: "Calculation Results",
    holesPerRai: "Holes per Rai",
    totalHoles: "Total Holes",
    totalSeedsNeeded: "Total Seeds Needed",
    totalSeedWeightKg: "Total Seed Weight (kg)",
    desc: "Calculate the exact number of plants and amount of seeds required per Rai based on plant spacing."
  } : {
    title: "โปรแกรมคำนวณปริมาณเมล็ดพันธุ์ต่อไร่",
    inputs: "ข้อมูลระยะปลูก",
    rowSpacing: "ระยะห่างระหว่างแถว (ซม.)",
    plantSpacing: "ระยะห่างระหว่างต้น (ซม.)",
    areaRai: "พื้นที่ปลูก (ไร่)",
    seedsPerHole: "จำนวนเมล็ดต่อหลุม",
    germinationRate: "อัตราการงอก (%)",
    seedsPerKg: "จำนวนเมล็ดต่อกิโลกรัม",
    summary: "ผลการคำนวณ",
    holesPerRai: "จำนวนหลุมต่อไร่",
    totalHoles: "จำนวนหลุมทั้งหมด",
    totalSeedsNeeded: "จำนวนเมล็ดที่ต้องใช้ทั้งหมด",
    totalSeedWeightKg: "น้ำหนักเมล็ดพันธุ์ที่ต้องใช้ (กก.)",
    desc: "คำนวณจำนวนต้นต่อไร่ และปริมาณเมล็ดพันธุ์ที่ต้องใช้ตามระยะปลูก เพื่อประเมินต้นทุน"
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
          <Sprout className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
          <p className="text-gray-500">{t.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-500" />
            {t.inputs}
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.rowSpacing}</label>
                <input type="number" value={rowSpacing} onChange={(e) => setRowSpacing(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.plantSpacing}</label>
                <input type="number" value={plantSpacing} onChange={(e) => setPlantSpacing(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.areaRai}</label>
                <input type="number" value={areaRai} onChange={(e) => setAreaRai(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.seedsPerHole}</label>
                <input type="number" value={seedsPerHole} onChange={(e) => setSeedsPerHole(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.germinationRate}</label>
                <input type="number" value={germinationRate} onChange={(e) => setGerminationRate(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.seedsPerKg}</label>
                <input type="number" value={seedsPerKg} onChange={(e) => setSeedsPerKg(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            {t.summary}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">{t.holesPerRai}</span>
              <span className="font-semibold">{Math.round(holesPerRai).toLocaleString()} หลุม</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">{t.totalHoles}</span>
              <span className="font-semibold">{Math.round(totalHoles).toLocaleString()} หลุม</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-800">{t.totalSeedsNeeded}</span>
              <span className="font-semibold text-blue-800">{Math.ceil(totalSeedsNeeded).toLocaleString()} เมล็ด</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-emerald-100 rounded-lg text-lg">
              <span className="font-semibold text-emerald-800">{t.totalSeedWeightKg}</span>
              <span className="font-bold text-emerald-800">{totalSeedWeightKg.toFixed(2)} กก.</span>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-emerald max-w-none mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          การคำนวณปริมาณเมล็ดพันธุ์และจำนวนต้นต่อไร่ สำคัญอย่างไรในงานเกษตร
        </h2>
        
        <p className="mb-4">
          สำหรับเกษตรกรผู้ปลูกพืชไร่ พืชผัก หรือแม้แต่ไม้ผล การทราบจำนวนต้นหรือจำนวนหลุมที่จะสามารถปลูกได้ในพื้นที่ 1 ไร่ (ซึ่งมีขนาดเท่ากับ 1,600 ตารางเมตร) ถือเป็นพื้นฐานที่สำคัญที่สุดในการวางแผนการเกษตร เนื่องจากจะส่งผลโดยตรงต่อการสั่งซื้อเมล็ดพันธุ์ การคำนวณต้นทุนปุ๋ย ค่ายา และการคาดการณ์ผลผลิตที่จะได้รับในอนาคต
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          ทำไมต้องมีระยะปลูก (ระยะห่างระหว่างแถว x ระยะห่างระหว่างต้น) ?
        </h3>
        <p className="mb-4">
          พืชแต่ละชนิดมีความต้องการพื้นที่ในการเจริญเติบโต การแผ่กิ่งก้าน และการหยั่งรากหาอาหารที่แตกต่างกัน การกำหนดระยะปลูกที่เหมาะสมจะช่วยให้:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>ลดการแย่งอาหารและแสงแดด:</strong> พืชที่ปลูกชิดเกินไปจะแย่งแสงแดดกัน ทำให้ต้นสูงชะลูด ลำต้นอ่อนแอ และให้ผลผลิตต่ำ</li>
          <li><strong>ระบายอากาศได้ดี:</strong> ลดความชื้นสะสมในแปลง ซึ่งเป็นสาเหตุหลักของการเกิดโรคราและศัตรูพืช</li>
          <li><strong>สะดวกต่อการจัดการ:</strong> ระยะแถวที่พอเหมาะช่วยให้เกษตรกรหรือเครื่องจักร (เช่น รถไถ รถเกี่ยว เครื่องพ่นยา) สามารถเดินเข้าไปทำงานในแปลงได้โดยไม่ทำให้ต้นพืชเสียหาย</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          ตัวแปรสำคัญในการคำนวณเมล็ดพันธุ์
        </h3>
        <p className="mb-4">
          นอกจากการหาระยะปลูกแล้ว การเตรียมเมล็ดพันธุ์ยังต้องพิจารณาตัวแปรอื่นๆ ร่วมด้วย ได้แก่:
        </p>
        <ol className="list-decimal pl-6 mb-4 space-y-2">
          <li><strong>จำนวนเมล็ดต่อหลุม:</strong> พืชบางชนิดปลูกหลุมละ 1 ต้น แต่บางชนิดอาจต้องหยอด 2-3 เมล็ดเผื่อเลือกต้นที่แข็งแรงที่สุด หรือปลูกเป็นกอ</li>
          <li><strong>อัตราการงอก (Germination Rate):</strong> เมล็ดพันธุ์ในท้องตลาดมักระบุอัตราการงอกไว้ข้างซอง (เช่น 85% หรือ 90%) เราจำเป็นต้องเผื่อจำนวนเมล็ดให้ครอบคลุมส่วนที่ไม่งอกด้วย เพื่อให้ได้จำนวนต้นตามเป้าหมาย</li>
          <li><strong>ขนาดและน้ำหนักของเมล็ด:</strong> เมล็ดพืชแต่ละชนิดมีขนาดต่างกันมาก การรู้ว่าเมล็ด 1 กิโลกรัมมีประมาณกี่เมล็ด จะช่วยให้สามารถแปลงจำนวนเมล็ดที่ต้องใช้เป็น "น้ำหนัก" หรือจำนวนถุงที่ต้องไปซื้อที่ร้านค้าเกษตรได้อย่างแม่นยำ</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          ประโยชน์ของโปรแกรมคำนวณ
        </h3>
        <p className="mb-4">
          โปรแกรม <em>คำนวณปริมาณเมล็ดพันธุ์ต่อไร่</em> ของเรา ถูกออกแบบมาเพื่อแก้ปัญหาการกะเกณฑ์ด้วยสายตา ซึ่งมักนำไปสู่การซื้อเมล็ดพันธุ์มากเกินไป (ทำให้เปลืองต้นทุนโดยใช่เหตุ) หรือน้อยเกินไป (ทำให้ต้องเสียเวลาและค่าเดินทางไปซื้อเพิ่ม) เพียงแค่คุณกรอกข้อมูลระยะปลูก พื้นที่ และรายละเอียดของเมล็ดพันธุ์ ระบบจะคำนวณปริมาณกิโลกรัมที่ต้องใช้ให้ทันที ช่วยให้การบริหารจัดการฟาร์มของคุณมีความเป็นมืออาชีพ ประหยัดเวลา และควบคุมงบประมาณได้อย่างมีประสิทธิภาพสูงสุด
        </p>
      </article>
    </div>
  );
}

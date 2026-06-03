import React, { useState } from 'react';
import { Calculator, Waves, PenTool, Droplets } from 'lucide-react';

export default function DripIrrigationCost({ lang }: { lang: any }) {
  const [areaRai, setAreaRai] = useState(1);
  const [rowSpacing, setRowSpacing] = useState(1.5); // meters
  const [tapePrice, setTapePrice] = useState(1200); // baht per roll (1000m)
  const [tapeLengthPerRoll, setTapeLengthPerRoll] = useState(1000); // meters
  const [fittingsCost, setFittingsCost] = useState(1500); // baht per rai
  const [mainPipeCost, setMainPipeCost] = useState(3000); // baht per rai

  // 1 Rai = 1600 sqm
  // Assuming square-ish field, length of drip tape = Area / row spacing
  const tapeLengthMeters = rowSpacing > 0 ? (areaRai * 1600) / rowSpacing : 0;
  
  const rollsNeeded = tapeLengthPerRoll > 0 ? Math.ceil(tapeLengthMeters / tapeLengthPerRoll) : 0;
  const totalTapeCost = rollsNeeded * tapePrice;
  
  const totalFittingsCost = areaRai * fittingsCost;
  const totalMainPipeCost = areaRai * mainPipeCost;
  
  const totalCost = totalTapeCost + totalFittingsCost + totalMainPipeCost;
  const costPerRai = areaRai > 0 ? totalCost / areaRai : 0;

  const t = lang === 'EN' ? {
    title: "Drip Irrigation Cost Calculator",
    inputs: "System Parameters",
    areaRai: "Area (Rai)",
    rowSpacing: "Row Spacing (Meters)",
    tapePrice: "Drip Tape Price (Baht/roll)",
    tapeLengthPerRoll: "Tape Length per Roll (m)",
    fittingsCost: "Fittings & Valves (Baht/Rai)",
    mainPipeCost: "Main Pipe/PVC Cost (Baht/Rai)",
    summary: "System Cost Summary",
    tapeLengthMeters: "Total Tape Length Needed (m)",
    rollsNeeded: "Drip Tape Rolls Needed",
    totalTapeCost: "Total Tape Cost",
    totalCost: "Total System Cost",
    costPerRai: "Average Cost per Rai",
    baht: "Baht",
    desc: "Calculate the required materials and estimated costs for setting up a drip irrigation system."
  } : {
    title: "โปรแกรมออกแบบและคำนวณค่าใช้จ่าย ระบบน้ำหยด",
    inputs: "ข้อมูลแปลงพืช",
    areaRai: "พื้นที่ปลูก (ไร่)",
    rowSpacing: "ระยะห่างระหว่างแถวพืช (เมตร)",
    tapePrice: "ราคาเทปน้ำหยด (บาท/ม้วน)",
    tapeLengthPerRoll: "ความยาวเทปต่อม้วน (เมตร)",
    fittingsCost: "ค่าอุปกรณ์หัวต่อ/วาล์ว (บาท/ไร่)",
    mainPipeCost: "ค่าท่อเมน PVC โดยประมาณ (บาท/ไร่)",
    summary: "สรุปค่าใช้จ่ายระบบน้ำหยด",
    tapeLengthMeters: "ความยาวเทปน้ำหยดรวม (เมตร)",
    rollsNeeded: "จำนวนม้วนเทปที่ต้องใช้",
    totalTapeCost: "ค่าเทปน้ำหยดรวม",
    totalCost: "ต้นทุนระบบน้ำหยดทั้งหมด",
    costPerRai: "เฉลี่ยต้นทุนต่อไร่",
    baht: "บาท",
    desc: "คำนวณความยาวเทปน้ำหยดที่ต้องใช้และประเมินงบประมาณในการติดตั้งระบบน้ำหยด"
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
          <Waves className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
          <p className="text-gray-500">{t.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <PenTool className="w-5 h-5 text-blue-500" />
            {t.inputs}
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.areaRai}</label>
                <input type="number" value={areaRai} onChange={(e) => setAreaRai(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.rowSpacing}</label>
                <input type="number" step="0.1" value={rowSpacing} onChange={(e) => setRowSpacing(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.tapeLengthPerRoll}</label>
                <input type="number" value={tapeLengthPerRoll} onChange={(e) => setTapeLengthPerRoll(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.tapePrice}</label>
                <input type="number" value={tapePrice} onChange={(e) => setTapePrice(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.fittingsCost}</label>
                <input type="number" value={fittingsCost} onChange={(e) => setFittingsCost(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.mainPipeCost}</label>
                <input type="number" value={mainPipeCost} onChange={(e) => setMainPipeCost(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-500" />
            {t.summary}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">{t.tapeLengthMeters}</span>
              <span className="font-semibold">{Math.round(tapeLengthMeters).toLocaleString()} เมตร</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg text-cyan-800">
              <span>{t.rollsNeeded}</span>
              <span className="font-semibold">{rollsNeeded} ม้วน</span>
            </div>

            <div className="border-t pt-4 mt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">{t.totalTapeCost}</span>
                <span className="font-medium">{totalTapeCost.toLocaleString()} {t.baht}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">ค่าอุปกรณ์และท่อเมน</span>
                <span className="font-medium">{(totalFittingsCost + totalMainPipeCost).toLocaleString()} {t.baht}</span>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-blue-100 rounded-lg text-lg">
              <span className="font-semibold text-blue-800">{t.totalCost}</span>
              <span className="font-bold text-blue-800">{totalCost.toLocaleString()} {t.baht}</span>
            </div>

            <div className="text-right text-sm text-gray-500 mt-2">
              {t.costPerRai}: <span className="font-semibold text-gray-700">{Math.round(costPerRai).toLocaleString()} {t.baht}/ไร่</span>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-blue max-w-none mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          การออกแบบและประเมินค่าใช้จ่ายสำหรับระบบน้ำหยดทางการเกษตร
        </h2>
        
        <p className="mb-4">
          น้ำคือปัจจัยที่สำคัญที่สุดในการทำเกษตรกรรม ในยุคที่สภาพอากาศแปรปรวน ภัยแล้งยาวนาน และต้นทุนค่าพลังงานสูบน้ำสูงขึ้น <strong>"ระบบน้ำหยด" (Drip Irrigation System)</strong> จึงกลายเป็นเทคโนโลยีการให้น้ำที่ได้รับความนิยมอย่างแพร่หลาย ทั้งในพืชไร่ (เช่น อ้อย มันสำปะหลัง ข้าวโพด) และพืชผักผลไม้ เพราะเป็นระบบที่จ่ายน้ำตรงสู่บริเวณรากพืชโดยตรง ทำให้ประหยัดน้ำได้มากกว่าระบบสปริงเกลอร์หรือการปล่อยน้ำท่วมแปลงถึง 50-70%
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          ข้อดีของการใช้ระบบน้ำหยด
        </h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>ประหยัดน้ำและพลังงาน:</strong> ลดการระเหยทิ้ง และสามารถใช้ปั๊มน้ำขนาดเล็กลงได้เนื่องจากระบบต้องการแรงดันต่ำ</li>
          <li><strong>ให้ปุ๋ยพร้อมกับน้ำ (Fertigation):</strong> สามารถผสมปุ๋ยเกล็ดหรือปุ๋ยน้ำละลายไปกับระบบน้ำหยดได้เลย ทำให้พืชได้รับธาตุอาหารสม่ำเสมอ ประหยัดค่าแรงงานในการหว่านปุ๋ย</li>
          <li><strong>ลดปัญหาวัชพืช:</strong> บริเวณระหว่างแถวพืชจะแห้ง ทำให้วัชพืชไม่มีน้ำสำหรับเจริญเติบโต</li>
          <li><strong>พืชโตไวและผลผลิตสม่ำเสมอ:</strong> ดินไม่แน่นทึบ รากพืชหายใจได้ดี และได้รับความชื้นคงที่ตลอดเวลา</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          หลักการคำนวณอุปกรณ์ระบบน้ำหยด
        </h3>
        <p className="mb-4">
          การติดตั้งระบบน้ำหยดมีต้นทุนที่เกษตรกรต้องประเมินล่วงหน้า โดยองค์ประกอบหลักที่ใช้งบประมาณมากที่สุดมักจะเป็น <strong>"เทปน้ำหยด"</strong> ปริมาณความยาวของเทปน้ำหยดจะขึ้นอยู่กับ <em>"ระยะห่างระหว่างแถวปลูก"</em> เป็นหลัก 
        </p>
        <p className="mb-4">
          สูตรพื้นฐานในการคำนวณความยาวเทปคือ การนำพื้นที่ปลูก (เช่น 1 ไร่ = 1,600 ตารางเมตร) หารด้วยระยะห่างระหว่างแถว (เมตร) เช่น หากปลูกอ้อยระยะห่าง 1.5 เมตร จะต้องใช้เทปน้ำหยด 1,600 / 1.5 = 1,066 เมตรต่อไร่ เทปน้ำหยด 1 ม้วนตามท้องตลาดมักมีความยาว 1,000 เมตร แปลว่าต้องใช้ประมาณ 1 ม้วนเศษต่อไร่
        </p>
        <p className="mb-4">
          นอกจากเทปน้ำหยดแล้ว ยังต้องมีต้นทุนของ <strong>ท่อเมน ท่อรอง (PVC หรือ PE)</strong> และ <strong>อุปกรณ์ข้อต่อ/วาล์ว (Fittings)</strong> ซึ่งจะแปรผันตามรูปทรงของแปลงและจำนวนบล็อกการให้น้ำ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          ใช้โปรแกรมประเมินค่าใช้จ่าย
        </h3>
        <p className="mb-4">
          <em>โปรแกรมออกแบบและคำนวณค่าใช้จ่ายระบบน้ำหยด</em> สร้างขึ้นมาเพื่อช่วยเกษตรกรวางแผนงบประมาณ เพียงระบุระยะแถวพืชและพื้นที่ โปรแกรมจะคำนวณความยาวเทปที่ต้องซื้อ รวมถึงรวมต้นทุนท่อเมนและข้อต่อเบื้องต้นออกมาเป็น "ต้นทุนเฉลี่ยต่อไร่" ทำให้คุณสามารถตัดสินใจเปรียบเทียบกับผลผลิตที่จะเพิ่มขึ้นได้อย่างแม่นยำ และรู้ว่าต้องเตรียมเงินลงทุนก้อนแรกเท่าไร
        </p>
      </article>
    </div>
  );
}

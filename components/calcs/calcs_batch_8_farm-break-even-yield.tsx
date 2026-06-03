import React, { useState } from 'react';
import { Calculator, Target, TrendingUp, AlertCircle } from 'lucide-react';

export default function FarmBreakEvenYield({ lang }: { lang: any }) {
  const [totalCostPerRai, setTotalCostPerRai] = useState(4500); // Baht per Rai
  const [expectedPrice, setExpectedPrice] = useState(8.5); // Baht per kg
  const [actualYield, setActualYield] = useState(800); // kg per Rai

  // Break-even Yield = Total Cost / Price
  const breakEvenYieldKg = expectedPrice > 0 ? totalCostPerRai / expectedPrice : 0;
  const breakEvenYieldTon = breakEvenYieldKg / 1000;

  // Actual Performance
  const actualRevenue = actualYield * expectedPrice;
  const profitLoss = actualRevenue - totalCostPerRai;
  const isProfitable = profitLoss >= 0;

  const t = lang === 'EN' ? {
    title: "Farm Break-even Yield Calculator",
    inputs: "Farm Projections",
    totalCostPerRai: "Total Cost (Baht/Rai)",
    expectedPrice: "Expected Selling Price (Baht/kg)",
    actualYield: "Expected/Actual Yield (kg/Rai)",
    summary: "Break-even Analysis",
    breakEvenTarget: "Break-even Yield Target",
    breakEvenYieldKg: "kg / Rai",
    breakEvenYieldTon: "Tons / Rai",
    performance: "Performance Simulation",
    actualRevenue: "Estimated Revenue",
    profitLoss: "Estimated Profit/Loss",
    bahtRai: "Baht / Rai",
    desc: "Calculate the exact crop yield required to cover all costs and avoid losses."
  } : {
    title: "ปริมาณผลผลิตที่ต้องขายเพื่อคืนทุน (Break-even Yield)",
    inputs: "ข้อมูลต้นทุนและราคา",
    totalCostPerRai: "ต้นทุนรวมทั้งหมด (บาท/ไร่)",
    expectedPrice: "ราคาขายที่คาดหวัง (บาท/กก.)",
    actualYield: "ผลผลิตที่คาดว่าจะได้จริง (กก./ไร่)",
    summary: "วิเคราะห์จุดคุ้มทุน",
    breakEvenTarget: "เป้าหมายผลผลิตขั้นต่ำ (จุดคุ้มทุน)",
    breakEvenYieldKg: "กิโลกรัม / ไร่",
    breakEvenYieldTon: "ตัน / ไร่",
    performance: "จำลองผลกำไร/ขาดทุน",
    actualRevenue: "รายได้ประมาณการ",
    profitLoss: "กำไร/ขาดทุน สุทธิ",
    bahtRai: "บาท / ไร่",
    desc: "คำนวณหาปริมาณผลผลิตขั้นต่ำที่ต้องทำให้ได้ต่อไร่ เพื่อให้คุ้มทุนและไม่ขาดทุน"
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 text-green-600 rounded-lg">
          <Target className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
          <p className="text-gray-500">{t.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-gray-600" />
            {t.inputs}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.totalCostPerRai}</label>
              <input type="number" value={totalCostPerRai} onChange={(e) => setTotalCostPerRai(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none" />
              <p className="text-xs text-gray-400 mt-1">*รวมค่าเตรียมดิน เมล็ดพันธุ์ ปุ๋ย ยา ค่าแรง และค่าเสื่อมอุปกรณ์</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.expectedPrice}</label>
              <input type="number" step="0.1" value={expectedPrice} onChange={(e) => setExpectedPrice(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <label className="block text-sm font-medium text-blue-700 mb-1">{t.actualYield}</label>
              <input type="number" value={actualYield} onChange={(e) => setActualYield(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none bg-blue-50" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              {t.summary}
            </h2>

            <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg mb-6">
              <div className="text-sm text-orange-800 mb-2 font-medium">{t.breakEvenTarget}</div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-orange-600">{Math.ceil(breakEvenYieldKg).toLocaleString()}</span>
                <span className="text-orange-700 font-medium mb-1">{t.breakEvenYieldKg}</span>
              </div>
              <div className="text-sm text-orange-600 mt-1">
                (หรือ {breakEvenYieldTon.toFixed(2)} {t.breakEvenYieldTon})
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className={`w-5 h-5 ${isProfitable ? 'text-green-500' : 'text-red-500'}`} />
              {t.performance}
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">{t.actualRevenue}</span>
                <span className="font-semibold text-gray-800">{actualRevenue.toLocaleString()} {t.bahtRai}</span>
              </div>

              <div className={`flex justify-between items-center p-4 rounded-lg text-lg ${isProfitable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <span className="font-semibold">{t.profitLoss}</span>
                <span className="font-bold">{profitLoss.toLocaleString()} {t.bahtRai}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-green max-w-none mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          จุดคุ้มทุนผลผลิต (Break-even Yield): กุญแจสู่การอยู่รอดของเกษตรกร
        </h2>
        
        <p className="mb-4">
          ปัญหาคลาสสิกของเกษตรกรไทยคือ เมื่อถึงฤดูเก็บเกี่ยวกลับพบว่า "ขายผลผลิตแล้วได้เงินไม่พอจ่ายค่าปุ๋ยค่ายา" สาเหตุหลักไม่ได้มาจากโชคชะตา แต่มาจากการขาดการวางแผนทางตัวเลขก่อนลงมือปลูก การทำความเข้าใจ <strong>"จุดคุ้มทุนของปริมาณผลผลิต" (Break-even Yield)</strong> จึงเป็นเหมือนเข็มทิศชี้ทางรอด ไม่ให้เกษตรกรต้องตกอยู่ในสภาวะขาดทุนซ้ำซาก
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          Break-even Yield คืออะไร?
        </h3>
        <p className="mb-4">
          ในทางเศรษฐศาสตร์เกษตร Break-even Yield คือ <em>"ปริมาณผลผลิตขั้นต่ำที่สุดที่คุณต้องทำให้ได้ต่อไร่ เพื่อให้รายได้เท่ากับต้นทุนพอดี (ไม่กำไรและไม่ขาดทุน)"</em> 
        </p>
        <p className="mb-4">
          สมการในการคำนวณนั้นเรียบง่ายมาก: <br/>
          <strong>จุดคุ้มทุน (กก./ไร่) = ต้นทุนรวมทั้งหมด (บาท/ไร่) ÷ ราคาขายที่คาดหวัง (บาท/กก.)</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          นำไปใช้จริงได้อย่างไร?
        </h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>กรณีที่ 1 (ประเมินความเป็นไปได้):</strong> สมมติว่าคุณคำนวณต้นทุนทำนาได้ 4,500 บาท/ไร่ และคาดว่าข้าวจะขายได้กิโลกรัมละ 8.5 บาท เมื่อกดเครื่องคิดเลข จะพบว่าคุณต้องทำข้าวให้ได้ <strong>530 กก./ไร่</strong> จึงจะคุ้มทุน หากพื้นที่ของคุณโดยปกติเคยทำได้แค่ 400 กก./ไร่ คุณจะรู้ตัวทันทีว่า "ถ้าขืนปลูกแบบเดิม ขาดทุนแน่นอน" คุณจึงต้องตัดสินใจลดต้นทุน หรือหาทางเพิ่มผลผลิตให้ได้ก่อนที่จะลงมือปลูก</li>
          <li><strong>กรณีที่ 2 (รับมือความผันผวนของราคา):</strong> หากจู่ๆ ราคาตลาดตกลงมาเหลือ 7 บาท/กก. จุดคุ้มทุนของคุณจะขยับขึ้นไปเป็น 642 กก./ไร่ ทันที การรู้ตัวเลขนี้ทำให้คุณรู้เป้าหมายว่าต้องอัดปุ๋ยหรือดูแลเป็นพิเศษแค่ไหน เพื่อดันผลผลิตให้ถึงเกณฑ์ให้ได้</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          เปลี่ยนจากการ "ลุ้น" เป็นการ "วางแผน"
        </h3>
        <p className="mb-4">
          <em>โปรแกรมคำนวณปริมาณผลผลิตเพื่อคืนทุน</em> ช่วยลดความยุ่งยากในการจดบัญชี ด้วยการให้คุณกรอกเพียง 2 ตัวเลขคือ ต้นทุนรวม และ ราคาขาย ระบบจะบอกเป้าหมายขั้นต่ำที่คุณต้องไปให้ถึง พร้อมทั้งมีฟังก์ชั่น "จำลองผลกำไร" โดยให้คุณลองใส่ตัวเลขผลผลิตที่คุณมั่นใจว่าจะทำได้ เพื่อดูว่าท้ายที่สุดแล้ว ในฤดูกาลนี้คุณจะเหลือกำไรเข้ากระเป๋ากี่บาท การเปลี่ยนวิถีเกษตรจากการ "ลุ้นเอาดาบหน้า" มาเป็น "การบริหารจัดการตัวเลข" คือหนทางเดียวที่จะสร้างความยั่งยืนในอาชีพเกษตรกรได้อย่างแท้จริง
        </p>
      </article>
    </div>
  );
}

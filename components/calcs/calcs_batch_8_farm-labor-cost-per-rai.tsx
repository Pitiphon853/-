import React, { useState } from 'react';
import { Calculator, Users, Clock, Coins } from 'lucide-react';

export default function FarmLaborCostPerRai({ lang }: { lang: any }) {
  const [dailyWage, setDailyWage] = useState(350); // Baht per person
  const [workers, setWorkers] = useState(5); // Number of people
  const [daysWorked, setDaysWorked] = useState(3); // Days
  const [areaCompleted, setAreaCompleted] = useState(10); // Rai

  const totalLaborCost = dailyWage * workers * daysWorked;
  const costPerRai = areaCompleted > 0 ? totalLaborCost / areaCompleted : 0;
  
  // Work efficiency: Rai per person per day
  const efficiency = (workers > 0 && daysWorked > 0) ? areaCompleted / (workers * daysWorked) : 0;

  const t = lang === 'EN' ? {
    title: "Farm Labor Cost per Rai Calculator",
    inputs: "Labor Parameters",
    dailyWage: "Daily Wage (Baht/person)",
    workers: "Number of Workers",
    daysWorked: "Days Worked",
    areaCompleted: "Area Completed (Rai)",
    summary: "Cost & Efficiency Analysis",
    totalLaborCost: "Total Labor Cost",
    costPerRai: "Labor Cost per Rai",
    efficiency: "Work Efficiency",
    efficiencyUnit: "Rai / Person / Day",
    baht: "Baht",
    desc: "Calculate the exact labor cost per Rai and measure the work efficiency of your farm workers."
  } : {
    title: "คำนวณค่าจ้างแรงงานเกษตรต่อไร่",
    inputs: "ข้อมูลการจ้างงาน",
    dailyWage: "ค่าจ้างรายวัน (บาท/คน/วัน)",
    workers: "จำนวนคนงาน (คน)",
    daysWorked: "จำนวนวันที่จ้าง (วัน)",
    areaCompleted: "พื้นที่ที่ทำงานเสร็จ (ไร่)",
    summary: "วิเคราะห์ต้นทุนและประสิทธิภาพ",
    totalLaborCost: "ค่าแรงงานรวมทั้งหมด",
    costPerRai: "ต้นทุนค่าแรงต่อไร่",
    efficiency: "ประสิทธิภาพการทำงาน",
    efficiencyUnit: "ไร่ / คน / วัน",
    baht: "บาท",
    desc: "ประเมินต้นทุนค่าแรงงานเฉลี่ยต่อไร่ และวัดประสิทธิภาพการทำงานของคนงานเกษตร"
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
          <Users className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
          <p className="text-gray-500">{t.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            {t.inputs}
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.dailyWage}</label>
                <input type="number" value={dailyWage} onChange={(e) => setDailyWage(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.workers}</label>
                <input type="number" value={workers} onChange={(e) => setWorkers(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.daysWorked}</label>
                <input type="number" value={daysWorked} onChange={(e) => setDaysWorked(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.areaCompleted}</label>
                <input type="number" value={areaCompleted} onChange={(e) => setAreaCompleted(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-500" />
            {t.summary}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">{t.totalLaborCost}</span>
              <span className="font-semibold text-gray-800">{totalLaborCost.toLocaleString()} {t.baht}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-amber-100 rounded-lg text-lg">
              <span className="font-semibold text-amber-900">{t.costPerRai}</span>
              <span className="font-bold text-amber-700">{Math.round(costPerRai).toLocaleString()} {t.baht}/ไร่</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100 mt-4">
              <span className="text-blue-800 text-sm font-medium">{t.efficiency}</span>
              <span className="font-semibold text-blue-700">
                {efficiency.toFixed(2)} {t.efficiencyUnit}
              </span>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-amber max-w-none mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          การบริหารจัดการ "ต้นทุนค่าแรง" หัวใจสำคัญของเกษตรกรรมไทย
        </h2>
        
        <p className="mb-4">
          ในโครงสร้างต้นทุนการทำเกษตรกรรม <strong>"ค่าแรงงาน"</strong> มักเป็นรายจ่ายที่สูงเป็นอันดับต้นๆ รองจากค่าปุ๋ยและยา ไม่ว่าจะเป็นการจ้างแรงงานถอนหญ้า ตัดอ้อย เกี่ยวข้าว หรือเก็บเกี่ยวผลไม้ ปัญหาที่เกษตรกรส่วนใหญ่พบคือ ค่าแรงขั้นต่ำปรับตัวสูงขึ้นทุกปี ในขณะที่ราคาผลผลิตยังคงผันผวน การบริหารจัดการและคำนวณต้นทุนค่าแรงให้แม่นยำจึงเป็นเรื่องที่หลีกเลี่ยงไม่ได้
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          ความแตกต่างระหว่าง "จ้างรายวัน" กับ "จ้างเหมา"
        </h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>การจ้างรายวัน (Daily Wage):</strong> เป็นรูปแบบที่คุ้นเคยที่สุด เหมาะสำหรับงานที่ต้องอาศัยความประณีต เช่น การตัดแต่งกิ่ง หรือเก็บผลไม้ที่บอบช้ำง่าย แต่ข้อเสียคือ หากผู้รับจ้างทำงานช้า (อู้งาน) ต้นทุนต่อไร่ของเกษตรกรจะพุ่งสูงขึ้นทันที</li>
          <li><strong>การจ้างเหมา (Piece-rate / Contract):</strong> คือการจ่ายเงินตามปริมาณงานที่ทำได้ เช่น จ้างตัดอ้อยตันละ 150 บาท หรือจ้างถอนหญ้าไร่ละ 500 บาท วิธีนี้ทำให้เกษตรกรควบคุมต้นทุนต่อไร่ได้คงที่ 100% แต่ต้องแลกมากับการที่คนงานอาจเร่งทำงานจนขาดความระมัดระวัง</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          ทำไมต้องรู้ "ต้นทุนค่าแรงต่อไร่" และ "ประสิทธิภาพ (Efficiency)"
        </h3>
        <p className="mb-4">
          หากคุณจ้างคนงานรายวัน คุณจะรู้ตัวเลขแน่ชัดว่าวันนี้ต้องจ่ายเงินกี่บาท แต่คุณอาจไม่รู้ว่างานที่ได้ <em>คุ้มค่า</em> หรือไม่ การแปลงค่าจ้างรายวันให้เป็น <strong>"ต้นทุนค่าแรงต่อไร่"</strong> จะช่วยให้คุณนำไปรวมกับค่าปุ๋ย ค่ายา และคำนวณหาต้นทุนรวมของพืชผลได้อย่างถูกต้อง
        </p>
        <p className="mb-4">
          นอกจากนี้ ตัวเลข <strong>"ประสิทธิภาพการทำงาน" (ไร่/คน/วัน)</strong> ยังเป็นเกณฑ์วัดที่สำคัญ หากคุณบันทึกข้อมูลไว้ คุณจะรู้ว่างานดายหญ้าปกติ 1 คนทำได้ 0.5 ไร่ต่อวัน หากครั้งหน้านำทีมงานชุดใหม่มาแล้วพบว่า 1 คนทำได้แค่ 0.3 ไร่ต่อวัน คุณจะทราบทันทีว่าเกิดปัญหาความล่าช้าขึ้น และนำไปสู่การตัดสินใจว่าครั้งต่อไปควรเปลี่ยนทีมงาน หรือเปลี่ยนไปใช้วิธีการจ้างเหมาแทน
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          เครื่องมือประเมินความคุ้มค่า
        </h3>
        <p className="mb-4">
          <em>โปรแกรมคำนวณค่าจ้างแรงงานเกษตรต่อไร่</em> ของเรา สร้างขึ้นมาให้ใช้งานง่าย เพียงแค่ใส่ข้อมูลเบื้องต้นที่คุณทราบอยู่แล้ว (จำนวนคน ค่าจ้าง จำนวนวัน และงานที่ได้) โปรแกรมจะตีแผ่ตัวเลขความคุ้มค่าออกมาให้เห็นภาพชัดเจน ช่วยให้เกษตรกรสามารถประเมินผลการทำงานของลูกจ้าง และใช้เป็นฐานข้อมูลในการต่อรองราคาหรือวางแผนการจ้างงานในฤดูกาลถัดไปได้อย่างมืออาชีพ
        </p>
      </article>
    </div>
  );
}

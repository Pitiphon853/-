"use client";

import React, { useState } from "react";
import { Clock, Calculator, Info, Settings2, Plus, Sigma } from "lucide-react";

export default function MultiRateOT({ lang }: { lang?: string }) {
  const isEn = lang === "en";

  const [salary, setSalary] = useState<string>("");
  const [workingHours, setWorkingHours] = useState<string>("8");
  
  const [hours15, setHours15] = useState<string>("");
  const [hours20, setHours20] = useState<string>("");
  const [hours30, setHours30] = useState<string>("");

  const numSalary = parseFloat(salary) || 0;
  const numWorkingHours = parseFloat(workingHours) || 8;
  
  const numH15 = parseFloat(hours15) || 0;
  const numH20 = parseFloat(hours20) || 0;
  const numH30 = parseFloat(hours30) || 0;

  // Assuming standard 30 days divisor for monthly salary to daily wage
  const dailyRate = numSalary / 30;
  const hourlyRate = numWorkingHours > 0 ? dailyRate / numWorkingHours : 0;

  const ot15Amount = hourlyRate * 1.5 * numH15;
  const ot20Amount = hourlyRate * 2.0 * numH20;
  const ot30Amount = hourlyRate * 3.0 * numH30;

  const totalOtHours = numH15 + numH20 + numH30;
  const totalOtAmount = ot15Amount + ot20Amount + ot30Amount;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(isEn ? 'en-US' : 'th-TH', { 
      style: 'decimal', 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    }).format(val);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6 text-amber-600" />
          {isEn ? "Multi-Rate OT Calculator" : "คำนวณ OT หลายอัตรา (1.5x, 2x, 3x)"}
        </h2>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6">
          <div className="flex items-center gap-2 mb-4 text-slate-700 font-semibold">
            <Settings2 className="w-5 h-5 text-slate-500" />
            {isEn ? "Base Salary Settings" : "ตั้งค่าฐานเงินเดือน"}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {isEn ? "Full Monthly Salary (THB)" : "เงินเดือนเต็มเดือน (บาท)"}
              </label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="e.g. 25000"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {isEn ? "Working Hours per Day" : "ชั่วโมงทำงานต่อวัน (ปกติคือ 8)"}
              </label>
              <input
                type="number"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                placeholder="8"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>
          {numSalary > 0 && (
            <div className="mt-4 flex gap-4 text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
              <div>
                <span className="opacity-70">{isEn ? "Calculated Hourly Rate:" : "ฐานรายได้ต่อชั่วโมง:"}</span> 
                <span className="font-semibold text-amber-700 ml-2">{formatCurrency(hourlyRate)} {isEn ? "THB/hr" : "บาท/ชม."}</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 mb-8">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {isEn ? "Enter Overtime Hours (OT)" : "กรอกจำนวนชั่วโมงล่วงเวลา (OT)"}
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-slate-200 rounded-xl p-4 bg-white relative overflow-hidden group hover:border-amber-300 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-blue-700 text-lg mb-1">OT 1.5x</div>
              <div className="text-xs text-slate-500 mb-3 h-8">
                {isEn ? "OT on normal working days" : "ทำ OT วันทำงานปกติ (หลังเลิกงาน)"}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={hours15}
                  onChange={(e) => setHours15(e.target.value)}
                  placeholder="0"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-right"
                />
                <span className="text-sm text-slate-500">{isEn ? "hrs" : "ชม."}</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-white relative overflow-hidden group hover:border-amber-300 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-green-700 text-lg mb-1">OT 2.0x</div>
              <div className="text-xs text-slate-500 mb-3 h-8">
                {isEn ? "Normal work on holidays" : "ทำงานในวันหยุด (เวลาปกติ)"}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={hours20}
                  onChange={(e) => setHours20(e.target.value)}
                  placeholder="0"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-right"
                />
                <span className="text-sm text-slate-500">{isEn ? "hrs" : "ชม."}</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-white relative overflow-hidden group hover:border-amber-300 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-purple-700 text-lg mb-1">OT 3.0x</div>
              <div className="text-xs text-slate-500 mb-3 h-8">
                {isEn ? "OT on holidays" : "ทำ OT วันหยุด (นอกเวลาปกติ)"}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={hours30}
                  onChange={(e) => setHours30(e.target.value)}
                  placeholder="0"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-right"
                />
                <span className="text-sm text-slate-500">{isEn ? "hrs" : "ชม."}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-600 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Calculator className="w-32 h-32" />
          </div>
          
          <h3 className="text-lg font-medium text-amber-100 mb-6 relative z-10 flex items-center gap-2">
            <Sigma className="w-5 h-5" />
            {isEn ? "OT Calculation Summary" : "สรุปยอดเงินค่าล่วงเวลา"}
          </h3>
          
          <div className="space-y-3 relative z-10 mb-6">
            <div className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <span>{isEn ? "OT 1.5x Amount" : "ยอด OT 1.5 เท่า"}</span>
              <span className="font-medium">{formatCurrency(ot15Amount)} {isEn ? "THB" : "บาท"}</span>
            </div>
            <div className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <span>{isEn ? "OT 2.0x Amount" : "ยอด OT 2.0 เท่า"}</span>
              <span className="font-medium">{formatCurrency(ot20Amount)} {isEn ? "THB" : "บาท"}</span>
            </div>
            <div className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <span>{isEn ? "OT 3.0x Amount" : "ยอด OT 3.0 เท่า"}</span>
              <span className="font-medium">{formatCurrency(ot30Amount)} {isEn ? "THB" : "บาท"}</span>
            </div>
          </div>
          
          <div className="border-t border-amber-400/50 pt-4 mt-2 relative z-10">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
              <div>
                <div className="text-amber-200 text-sm mb-1">{isEn ? "Total OT Hours" : "รวมเวลาทำ OT ทั้งหมด"}</div>
                <div className="text-2xl font-bold">{totalOtHours} <span className="text-base font-normal text-amber-200">{isEn ? "hrs" : "ชั่วโมง"}</span></div>
              </div>
              <div className="text-right">
                <div className="text-amber-200 text-sm mb-1">{isEn ? "Total OT Pay" : "รวมเงิน OT ทั้งสิ้น"}</div>
                <div className="text-4xl font-bold">{formatCurrency(totalOtAmount)} <span className="text-xl font-normal text-amber-200">{isEn ? "THB" : "บาท"}</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-slate-500 flex items-start gap-1">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>
            {isEn ? 
              "Note: Standard HR calculation uses Salary/30 for Daily Rate. Some companies may use Actual Days or different daily divisors. Check with your HR if you notice slight discrepancies." : 
              "หมายเหตุ: ระบบใช้วิธีหาร 30 วันเพื่อหาฐานรายได้ต่อวัน ซึ่งเป็นวิธีมาตรฐานของ HR และกฎหมายแรงงานไทย หากบริษัทของคุณใช้วิธีหารด้วยจำนวนวันจริงในเดือน ยอดอาจแตกต่างกันเล็กน้อย"}
          </p>
        </div>
      </div>

      <article className="prose prose-slate max-w-none p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
        <h2>{isEn ? "Understanding Overtime (OT) Rates in Thailand" : "ทำความเข้าใจอัตราค่าล่วงเวลา (OT) ในประเทศไทย"}</h2>
        <p>
          {isEn ? 
            "Overtime pay, commonly referred to as OT, is an extra compensation provided to employees who work beyond their standard working hours or on standard holidays. In Thailand, the Labor Protection Act clearly defines the calculation rates to protect employee rights and ensure fair compensation." : 
            "ค่าล่วงเวลา หรือที่คนทำงานมักเรียกกันติดปากว่า OT (Overtime) คือเงินชดเชยพิเศษที่นายจ้างจ่ายให้กับพนักงานที่ทำงานเกินเวลาทำงานปกติ หรือทำงานในวันหยุดพักผ่อน ในประเทศไทย พระราชบัญญัติคุ้มครองแรงงานได้กำหนดอัตราการจ่ายเงินค่าล่วงเวลาไว้อย่างชัดเจน เพื่อปกป้องสิทธิของลูกจ้างและรับรองว่าทุกคนจะได้รับค่าตอบแทนที่ยุติธรรมต่อหยาดเหงื่อแรงกายที่เสียไป"}
        </p>

        <h3>{isEn ? "The 3 Multipliers of Overtime Pay" : "อัตราตัวคูณ OT ทั้ง 3 ระดับ มีอะไรบ้าง?"}</h3>
        <p>
          {isEn ? 
            "Calculating your OT pay can be confusing if you don't know the difference between working after hours on a weekday versus working on a Sunday. Here is a breakdown of the three rates:" : 
            "การคำนวณเงิน OT อาจเป็นเรื่องสับสนสำหรับพนักงานหลายคน โดยเฉพาะเมื่อไม่ทราบความแตกต่างระหว่างการอยู่ทำ OT หลังเลิกงานในวันธรรมดา กับการถูกเรียกมาทำงานในวันอาทิตย์ ซึ่งตามกฎหมายแรงงานไทยจะแบ่งอัตราตัวคูณออกเป็น 3 ระดับ ดังนี้:"}
        </p>

        <ul>
          <li>
            <strong>{isEn ? "OT 1.5x (Working on normal days, after normal hours)" : "OT อัตรา 1.5 เท่า (ทำงานในวันปกติ นอกเวลาทำงาน)"}</strong>
            <br />
            {isEn ? 
              "This is the most common form of OT. If your regular hours are 9:00 AM to 6:00 PM, and you are asked to stay until 9:00 PM on a Tuesday, those extra 3 hours are calculated at 1.5 times your hourly rate." : 
              "เป็นรูปแบบ OT ที่พบเจอได้บ่อยที่สุด ตัวอย่างเช่น หากเวลาทำงานปกติของคุณคือ 9:00 ถึง 18:00 น. วันจันทร์ถึงศุกร์ และหัวหน้าขอให้อยู่ปั่นงานต่อจนถึง 21:00 น. ในวันอังคาร ชั่วโมงการทำงานพิเศษ 3 ชั่วโมงนี้ จะได้รับค่าตอบแทนในอัตรา 1.5 เท่าของรายได้ต่อชั่วโมงของคุณ"}
          </li>
          
          <li>
            <strong>{isEn ? "OT 2.0x (Working on standard holidays during normal hours)" : "OT อัตรา 2.0 เท่า (ทำงานในวันหยุด ภายในช่วงเวลาปกติ)"}</strong>
            <br />
            {isEn ? 
              "If you are requested to work on your scheduled day off (e.g., Saturday or Sunday) or a public holiday during your normal 9-to-6 shift, you get paid 2 times your hourly rate. (Note: for daily wage workers, it's strictly 2x extra, but for monthly salary workers who already get paid for the holiday, they usually receive an additional 1x, making the total compensation for that day effectively 2x)." : 
              "หากคุณถูกเรียกให้มาทำงานในวันหยุดประจำสัปดาห์ (เช่น วันเสาร์-อาทิตย์) หรือวันหยุดนักขัตฤกษ์ โดยทำในช่วงเวลาทำงานปกติ (เช่น 9:00 ถึง 18:00 น.) คุณจะได้รับค่าทำงานในวันหยุดในอัตรา 2 เท่า (หมายเหตุ: สำหรับพนักงานรายเดือน เนื่องจากคุณได้รับเงินเดือนในวันหยุดนั้นอยู่แล้ว 1 เท่าตามกฎหมาย บริษัทจึงมักจะจ่ายเพิ่มให้อีก 1 เท่า เพื่อให้รวมเป็น 2 เท่าตามเกณฑ์)"}
          </li>

          <li>
            <strong>{isEn ? "OT 3.0x (Working on standard holidays, after normal hours)" : "OT อัตรา 3.0 เท่า (ทำงานในวันหยุด นอกเวลาทำงานปกติ)"}</strong>
            <br />
            {isEn ? 
              "This is the highest rate. If you work on a holiday (already receiving the holiday rate) and you stay past your standard hours (e.g., past 6:00 PM), those extra evening hours on the holiday are paid at 3 times your standard hourly rate." : 
              "เป็นอัตราค่าตอบแทนที่สูงที่สุด หากคุณมาทำงานในวันหยุด และยังต้องอยู่ทำ OT ลากยาวเกินกว่าเวลาเลิกงานปกติ (เช่น ทำเกินเวลา 18:00 น. ในวันอาทิตย์) ชั่วโมงที่ล่วงเวลาเหล่านั้นจะต้องได้รับค่าตอบแทนสูงถึง 3 เท่าของรายได้ต่อชั่วโมง"}
          </li>
        </ul>

        <h3>{isEn ? "How to calculate your Hourly Rate" : "วิธีคิดฐานเงินเดือนต่อชั่วโมง (Hourly Rate)"}</h3>
        <p>
          {isEn ? 
            "Before applying the multipliers, you must find your base hourly rate. The standard labor formula takes your Monthly Salary, divides it by 30 (to get your daily wage, regardless of the month), and then divides it by your standard daily working hours (usually 8). For example: Salary 24,000 / 30 = 800 THB/day. 800 / 8 = 100 THB/hour. Then you apply the 1.5x, 2x, or 3x depending on the situation." : 
            "ก่อนที่คุณจะนำตัวคูณไปใช้ คุณต้องหา 'ฐานรายได้ต่อชั่วโมง' ของคุณเสียก่อน สูตรมาตรฐานที่ใช้อ้างอิงตามกฎหมายแรงงานคือ นำเงินเดือนเต็มเดือน หารด้วย 30 (เพื่อให้เป็นรายได้ต่อวัน โดยไม่ต้องสนใจว่าเดือนนั้นมีกี่วัน) จากนั้นหารด้วยชั่วโมงการทำงานปกติ (ส่วนใหญ่คือ 8 ชั่วโมง) ตัวอย่างเช่น เงินเดือน 24,000 / 30 = ได้รายได้วันละ 800 บาท นำ 800 / 8 = ได้ฐานชั่วโมงละ 100 บาท จากนั้นจึงนำ 100 บาทนี้ไปคูณ 1.5, 2.0 หรือ 3.0 ตามเงื่อนไขการทำ OT ของคุณนั่นเอง"}
        </p>
      </article>
    </div>
  );
}

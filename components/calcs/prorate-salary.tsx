"use client";

import React, { useState } from "react";
import { Wallet, Calculator, Info, FileText } from "lucide-react";

export default function ProrateSalary({ lang }: { lang?: string }) {
  const isEn = lang === "en";

  const [salary, setSalary] = useState<string>("");
  const [method, setMethod] = useState<"fixed30" | "actual">("fixed30");
  const [daysInMonth, setDaysInMonth] = useState<string>("31");
  const [daysWorked, setDaysWorked] = useState<string>("");

  const numSalary = parseFloat(salary) || 0;
  const numDaysInMonth = parseInt(daysInMonth) || 30;
  const numDaysWorked = parseFloat(daysWorked) || 0;

  let baseDays = method === "fixed30" ? 30 : numDaysInMonth;
  let dailyRate = numSalary / (baseDays || 1);
  let proratedSalary = dailyRate * numDaysWorked;

  // Format currency
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
          <Wallet className="w-6 h-6 text-emerald-600" />
          {isEn ? "Prorated Salary Calculator" : "คำนวณเงินเดือนแบบ Prorate"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {isEn ? "Full Monthly Salary (THB)" : "เงินเดือนเต็มเดือน (บาท)"}
            </label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g. 30000"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {isEn ? "Days Worked" : "จำนวนวันที่ทำงานจริง"}
            </label>
            <input
              type="number"
              value={daysWorked}
              onChange={(e) => setDaysWorked(e.target.value)}
              placeholder="e.g. 15"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            {isEn ? "Calculation Method (Divisor)" : "วิธีหารฐานจำนวนวันในเดือน"}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setMethod("fixed30")}
              className={`p-4 border rounded-xl flex items-start gap-3 transition-colors ${
                method === "fixed30" 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${method === "fixed30" ? "border-emerald-600" : "border-slate-300"}`}>
                {method === "fixed30" && <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full" />}
              </div>
              <div className="text-left">
                <div className="font-semibold">{isEn ? "Fixed 30 Days" : "หาร 30 วันคงที่"}</div>
                <div className="text-xs mt-1 opacity-80">
                  {isEn ? "Standard for most Thai labor laws/HR." : "มาตรฐานที่ใช้กันทั่วไปตามกฎหมายแรงงาน/HR"}
                </div>
              </div>
            </button>

            <button
              onClick={() => setMethod("actual")}
              className={`p-4 border rounded-xl flex items-start gap-3 transition-colors ${
                method === "actual" 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${method === "actual" ? "border-emerald-600" : "border-slate-300"}`}>
                {method === "actual" && <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full" />}
              </div>
              <div className="text-left w-full">
                <div className="font-semibold">{isEn ? "Actual Days in Month" : "หารตามจำนวนวันจริงในเดือนนั้น"}</div>
                {method === "actual" && (
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={daysInMonth}
                      onChange={(e) => setDaysInMonth(e.target.value)}
                      className="w-20 p-1 border border-slate-300 rounded text-center text-sm"
                      placeholder="31"
                    />
                    <span className="text-sm opacity-80">{isEn ? "days" : "วัน"} (28, 29, 30, 31)</span>
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-600" />
            {isEn ? "Result" : "ผลการคำนวณ"}
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-600">{isEn ? "Daily Rate" : "รายได้ต่อวัน"}</span>
              <span className="font-medium text-slate-800">{formatCurrency(dailyRate)} {isEn ? "THB" : "บาท"}</span>
            </div>
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-600">{isEn ? "Calculation Formula" : "สูตรที่ใช้"}</span>
              <span className="text-sm text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">
                ({formatCurrency(numSalary)} / {baseDays}) × {numDaysWorked}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-bold text-slate-800">{isEn ? "Prorated Salary" : "เงินเดือนที่ได้รับ"}</span>
              <span className="text-3xl font-bold text-emerald-600">{formatCurrency(proratedSalary)} <span className="text-lg text-emerald-600/70">{isEn ? "THB" : "บาท"}</span></span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-slate-500 flex items-start gap-1">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>
            {isEn ? 
              "Note: This is gross salary before tax (WHT) and social security deductions. Please consult your HR department for company-specific calculation rules." : 
              "หมายเหตุ: จำนวนเงินนี้เป็นเพียงรายได้ก่อนหักภาษี ณ ที่จ่าย (WHT) และประกันสังคม กรุณาตรวจสอบระเบียบการคำนวณของบริษัทท่านกับฝ่ายบุคคล (HR) อีกครั้ง"}
          </p>
        </div>
      </div>

      <article className="prose prose-slate max-w-none p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
        <h2>{isEn ? "What is Prorated Salary Calculation?" : "การคำนวณเงินเดือนแบบ Prorate คืออะไร?"}</h2>
        <p>
          {isEn ? 
            "Prorated salary calculation refers to adjusting a full-time employee's pay to reflect the actual number of days they worked during a specific pay period. This calculation is essential in various scenarios, most commonly when a new employee starts mid-month, an employee resigns before the month ends, or when someone takes unpaid leave." : 
            "การคำนวณเงินเดือนแบบ Prorate (โพรเรต) คือ การคิดเงินเดือนตามสัดส่วนระยะเวลา หรือตามจำนวนวันที่พนักงานทำงานจริงในเดือนนั้นๆ แทนที่จะจ่ายเงินเดือนเต็มจำนวนตามปกติ การคำนวณแบบนี้มีความจำเป็นและพบได้บ่อยในกรณีที่ มีพนักงานเข้าทำงานใหม่ระหว่างเดือน พนักงานลาออกก่อนสิ้นเดือน หรือกรณีที่มีการลางานโดยไม่ได้รับค่าจ้าง (Leave Without Pay) เป็นต้น"}
        </p>
        
        <h3>{isEn ? "Why Do We Need to Calculate Prorate Salary?" : "ทำไมถึงต้องมีการคิดเงินเดือนตามสัดส่วน (Prorate)?"}</h3>
        <p>
          {isEn ? 
            "The fundamental principle of employment is fairness: employees are compensated for the time and labor they provide. When an employee doesn't work a full month, it's not feasible for the employer to pay the entire monthly salary. Prorating ensures an exact, fair calculation for both the company and the employee. Furthermore, calculating prorated salaries accurately is a crucial HR compliance task that aligns with labor regulations." : 
            "หลักการพื้นฐานของการจ้างงานคือความยุติธรรม พนักงานจะได้รับค่าตอบแทนตามเวลาและแรงงานที่ได้มอบให้กับบริษัท เมื่อพนักงานไม่ได้ทำงานเต็มเดือน การจ่ายเงินเดือนเต็มจำนวนจึงไม่สมเหตุสมผลสำหรับนายจ้าง การคิดแบบ Prorate จะช่วยให้เกิดความยุติธรรมกับทั้งสองฝ่าย บริษัทก็จ่ายค่าจ้างตามความเป็นจริง พนักงานก็ได้รับเงินตามสัดส่วนที่ตนได้ลงแรงไป นอกจากนี้ ความถูกต้องในการคำนวณยังเป็นเรื่องสำคัญสำหรับงาน HR เพื่อให้สอดคล้องกับกฎหมายแรงงานและระเบียบข้อบังคับของบริษัท"}
        </p>

        <h3>{isEn ? "How to Divide: By 30 Days or Actual Days?" : "หาร 30 วัน หรือ หารตามวันจริงในเดือน?"}</h3>
        <p>
          {isEn ? 
            "One of the most common questions in Thai payroll is what to use as the divisor to find the daily rate. There are generally two methods:" : 
            "หนึ่งในคำถามที่พบบ่อยที่สุดเกี่ยวกับการทำเงินเดือนในประเทศไทยคือ ควรใช้ตัวเลขใดเป็น 'ตัวหาร' เพื่อหาฐานเงินเดือนรายวัน ซึ่งโดยทั่วไปจะมี 2 วิธีหลักๆ ดังนี้:"}
        </p>
        <ul>
          <li>
            <strong>{isEn ? "Fixed 30 Days Method" : "วิธีหาร 30 วัน (Fixed 30 Days)"}</strong>: 
            {isEn ? 
              " This is standard practice based on Thai labor law guidance. Even if the month has 28, 29, or 31 days, the divisor remains 30. It simplifies payroll and creates a consistent daily rate across the year." : 
              " เป็นวิธีมาตรฐานที่อ้างอิงตามแนวทางกฎหมายแรงงานไทย แม้ว่าเดือนนั้นจะมี 28, 29 หรือ 31 วัน ก็จะใช้ 30 เป็นตัวหารเสมอ วิธีนี้ช่วยให้การคำนวณเงินเดือนง่ายขึ้น และทำให้พนักงานมีฐานรายได้ต่อวันคงที่เท่ากันทุกเดือน"}
          </li>
          <li>
            <strong>{isEn ? "Actual Days in Month Method" : "วิธีหารตามจำนวนวันจริงในเดือน (Actual Days)"}</strong>: 
            {isEn ? 
              " The salary is divided by the exact number of days in that month (e.g., divided by 31 in August). This method creates fluctuating daily rates depending on the month. While less common for standard monthly salaries, some companies use it based on their specific internal policies." : 
              " เงินเดือนจะถูกหารด้วยจำนวนวันที่มีอยู่จริงในเดือนนั้นๆ เช่น เดือนสิงหาคมจะหารด้วย 31 เดือนกุมภาพันธ์หารด้วย 28 หรือ 29 วิธีนี้จะทำให้ฐานเงินเดือนต่อวันของพนักงานในแต่ละเดือนไม่เท่ากัน แม้จะไม่ค่อยเป็นที่นิยมเท่าวิธีแรก แต่ก็มีบางบริษัทที่ใช้ตามนโยบายภายใน"}
          </li>
        </ul>
        <p>
          {isEn ? 
            "Most HR systems and labor inspectors prefer the 30-day divisor for monthly wage earners to ensure fairness and compliance, but always consult your company's employee handbook for your exact policy." : 
            "ในทางปฏิบัติ ฝ่ายบุคคล (HR) และพนักงานตรวจแรงงานส่วนใหญ่มักจะแนะนำให้ใช้ตัวหาร 30 วัน สำหรับพนักงานที่รับเงินเดือนเป็นรายเดือน เพื่อความโปร่งใสและเป็นมาตรฐานเดียวกัน แต่อย่างไรก็ตาม ควรตรวจสอบนโยบายหรือคู่มือพนักงานของบริษัทคุณอีกครั้งเพื่อความแน่ใจ"}
        </p>

        <h3>{isEn ? "Don't Forget Deductions!" : "อย่าลืมเรื่องการหักเงินต่างๆ!"}</h3>
        <p>
          {isEn ? 
            "The calculation shown by this tool provides the Gross Prorated Salary. In a real-world payroll run, this amount will be subject to Social Security deductions (usually 5% up to a cap) and Withholding Tax (WHT) depending on the employee's income bracket." : 
            "เครื่องมือนี้ช่วยคำนวณจำนวนเงินก่อนหักภาษี (Gross Salary) ในความเป็นจริงเมื่อถึงเวลาจ่ายเงินเดือน จำนวนเงินที่คำนวณได้นี้จะต้องถูกนำไปหักเงินสมทบกองทุนประกันสังคม (ปกติคือ 5% ของรายได้ แต่ไม่เกินเพดานที่กำหนด) และการหักภาษีเงินได้บุคคลธรรมดา ณ ที่จ่าย (WHT) ตามฐานรายได้ของพนักงานแต่ละคน ดังนั้น ยอดเงินโอนสุทธิ (Net Pay) ที่พนักงานจะได้รับจริงจึงอาจน้อยกว่าตัวเลขที่แสดงในเครื่องมือนี้เล็กน้อย"}
        </p>
      </article>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Car, CalendarDays, Clock, DollarSign, Calculator } from "lucide-react";

export default function MonthlyParkingCalculator({ lang }: { lang: "TH" | "EN" }) {
  const [dailyRate, setDailyRate] = useState<number | "">(150);
  const [workDays, setWorkDays] = useState<number | "">(22);
  const [monthlyPass, setMonthlyPass] = useState<number | "">(2500);

  // For hourly parking option
  const [isHourly, setIsHourly] = useState<boolean>(false);
  const [hourlyRate, setHourlyRate] = useState<number | "">(40);
  const [hoursPerDay, setHoursPerDay] = useState<number | "">(9);
  const [freeHours, setFreeHours] = useState<number | "">(0);

  const t = {
    title: lang === "TH" ? "เครื่องคิดเลขค่าที่จอดรถรายเดือน" : "Monthly Parking Cost Calculator",
    parkingMode: lang === "TH" ? "รูปแบบการคิดค่าจอดรถรายวัน" : "Daily Parking Rate Mode",
    flatRate: lang === "TH" ? "ราคาเหมาจ่ายต่อวัน" : "Flat Rate per Day",
    hourlyMode: lang === "TH" ? "คิดตามรายชั่วโมง" : "Hourly Rate",
    dailyRate: lang === "TH" ? "ค่าจอดรถแบบเหมาต่อวัน (บาท)" : "Flat Daily Rate (THB)",
    hourlyRate: lang === "TH" ? "ค่าจอดรถต่อชั่วโมง (บาท)" : "Hourly Rate (THB)",
    hours: lang === "TH" ? "ชั่วโมงที่จอดต่อวัน" : "Hours Parked per Day",
    freeHours: lang === "TH" ? "ชั่วโมงจอดฟรีต่อวัน" : "Free Hours per Day",
    workDays: lang === "TH" ? "จำนวนวันที่จอดต่อเดือน (วัน)" : "Parking Days per Month",
    monthlyPass: lang === "TH" ? "ค่าที่จอดรถแบบเหมาจ่ายรายเดือน (บาท)" : "Monthly Parking Pass (THB)",
    results: lang === "TH" ? "ผลการเปรียบเทียบ" : "Comparison Results",
    dailyTotal: lang === "TH" ? "รวมค่าจอดแบบรายวัน/ชั่วโมง" : "Total Cost if Paid Daily",
    monthlyTotal: lang === "TH" ? "จ่ายแบบเหมาเดือน" : "Cost if Paid Monthly",
    betterOption: lang === "TH" ? "ทางเลือกที่คุ้มค่ากว่า:" : "Better Option:",
    saveAmount: lang === "TH" ? "ประหยัดเงินได้" : "You Save",
    thb: lang === "TH" ? "บาท/เดือน" : "THB/month",
    monthlyWin: lang === "TH" ? "เหมาจ่ายรายเดือนคุ้มกว่า!" : "Monthly Pass is better!",
    dailyWin: lang === "TH" ? "จ่ายรายวัน/ชั่วโมงคุ้มกว่า!" : "Paying Daily is better!",
    equal: lang === "TH" ? "ทั้งสองแบบค่าใช้จ่ายเท่ากัน" : "Both options cost the same.",
  };

  const calculate = () => {
    let costPerDay = 0;
    
    if (isHourly) {
      const hRate = Number(hourlyRate) || 0;
      const hPark = Number(hoursPerDay) || 0;
      const fHours = Number(freeHours) || 0;
      const chargeableHours = Math.max(0, hPark - fHours);
      costPerDay = chargeableHours * hRate;
    } else {
      costPerDay = Number(dailyRate) || 0;
    }

    const wDays = Number(workDays) || 0;
    const mPass = Number(monthlyPass) || 0;

    const totalDailyCost = costPerDay * wDays;
    const difference = totalDailyCost - mPass;

    return { totalDailyCost, mPass, difference };
  };

  const { totalDailyCost, mPass, difference } = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-3 rounded-full text-purple-600">
          <Calculator size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              {t.parkingMode}
            </label>
            <div className="flex gap-4 mb-4">
              <button
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  !isHourly ? "bg-purple-600 text-white shadow" : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setIsHourly(false)}
              >
                {t.flatRate}
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  isHourly ? "bg-purple-600 text-white shadow" : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setIsHourly(true)}
              >
                {t.hourlyMode}
              </button>
            </div>

            {!isHourly ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <DollarSign size={16} className="text-gray-400" />
                  {t.dailyRate}
                </label>
                <input
                  type="number"
                  value={dailyRate}
                  onChange={(e) => setDailyRate(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  min="0"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <DollarSign size={16} className="text-gray-400" />
                    {t.hourlyRate}
                  </label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    {t.hours}
                  </label>
                  <input
                    type="number"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    min="0"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.freeHours}
                  </label>
                  <input
                    type="number"
                    value={freeHours}
                    onChange={(e) => setFreeHours(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    min="0"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <CalendarDays size={16} className="text-gray-400" />
                {t.workDays}
              </label>
              <input
                type="number"
                value={workDays}
                onChange={(e) => setWorkDays(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                min="1"
                max="31"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Car size={16} className="text-gray-400" />
                {t.monthlyPass}
              </label>
              <input
                type="number"
                value={monthlyPass}
                onChange={(e) => setMonthlyPass(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 sticky top-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              {t.results}
            </h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
                <span className="text-gray-500 text-sm mb-1">{t.dailyTotal}</span>
                <span className="text-xl font-semibold text-gray-800">
                  {totalDailyCost.toLocaleString("en-US")} {t.thb}
                </span>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
                <span className="text-gray-500 text-sm mb-1">{t.monthlyTotal}</span>
                <span className="text-xl font-semibold text-gray-800">
                  {mPass.toLocaleString("en-US")} {t.thb}
                </span>
              </div>

              <div className={`p-4 rounded-lg shadow-sm border ${difference > 0 ? "bg-green-50 border-green-200" : difference < 0 ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}>
                <span className="block text-sm font-medium text-gray-600 mb-1">{t.betterOption}</span>
                <span className={`block text-lg font-bold mb-2 ${difference > 0 ? "text-green-700" : difference < 0 ? "text-blue-700" : "text-gray-700"}`}>
                  {difference > 0 ? t.monthlyWin : difference < 0 ? t.dailyWin : t.equal}
                </span>
                {difference !== 0 && (
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-black/10">
                    <span className="text-sm font-medium text-gray-600">{t.saveAmount}</span>
                    <span className="text-xl font-bold text-gray-900">
                      {Math.abs(difference).toLocaleString("en-US")} {t.thb}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-12 prose prose-purple max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ค่าที่จอดรถ: รูรั่วทางการเงินที่คนมีรถมักมองข้าม
        </h2>
        <p>
          สำหรับคนวัยทำงานที่ต้องขับรถเข้าไปทำงานในตัวเมืองหรือย่านธุรกิจ (CBD) ปฏิเสธไม่ได้เลยว่า <strong>"ค่าที่จอดรถ"</strong> เป็นหนึ่งในค่าใช้จ่ายหลักที่หลีกเลี่ยงได้ยาก แม้ว่าบางบริษัทจะมีสวัสดิการที่จอดรถให้พนักงาน แต่สำหรับใครหลายคนที่ต้องหาที่จอดรถเอง ค่าใช้จ่ายส่วนนี้อาจกลายเป็นรูรั่วทางการเงินก้อนใหญ่ หากเราไม่ได้คำนวณและวางแผนให้ดี
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เปรียบเทียบความคุ้มค่า: จอดรายวัน vs เหมาจ่ายรายเดือน</h3>
        <p>
          ลานจอดรถและอาคารสำนักงานส่วนใหญ่มักมีตัวเลือกให้ผู้ใช้บริการ 2 รูปแบบหลักๆ คือ การจ่ายเป็นรายชั่วโมง/รายวัน และการสมัครสมาชิกแบบเหมาจ่ายรายเดือน ซึ่งแต่ละแบบก็มีความเหมาะสมกับรูปแบบการใช้งานที่แตกต่างกันไป:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>การจอดแบบรายวันหรือรายชั่วโมง:</strong> เหมาะสำหรับผู้ที่ไม่ได้เข้าออฟฟิศทุกวัน (เช่น ทำงานแบบ Hybrid, เข้าออฟฟิศเพียงสัปดาห์ละ 2-3 วัน) หรือผู้ที่มีการขับรถออกไปพบลูกค้าภายนอกบ่อยครั้ง การจ่ายตามจริงที่คุณจอดอาจช่วยประหยัดเงินได้มากกว่า</li>
          <li><strong>การจอดแบบเหมาจ่ายรายเดือน (Monthly Pass):</strong> เหมาะอย่างยิ่งสำหรับพนักงานที่ต้องเข้าออฟฟิศ 5 วันต่อสัปดาห์ (ประมาณ 20-22 วันต่อเดือน) แม้ว่าเงินก้อนแรกที่ต้องจ่ายในแต่ละเดือนจะดูสูง แต่เมื่อหารเฉลี่ยออกมาเป็นรายวันแล้ว มักจะถูกกว่าการกดบัตรจอดรถรายชั่วโมงอย่างเห็นได้ชัด</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีใช้งานเครื่องคิดเลขค่าที่จอดรถ</h3>
        <p>
          เพื่อไม่ให้คุณต้องมานั่งจดบันทึกและกดเครื่องคิดเลขให้วุ่นวาย เราได้พัฒนา <em>เครื่องคิดเลขค่าใช้จ่ายที่จอดรถรายเดือน</em> ขึ้นมาเพื่อเป็นผู้ช่วยส่วนตัวของคุณ:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>เลือกรูปแบบการคำนวณ:</strong> หากที่จอดรถของคุณเป็นแบบเหมาวัน ให้เลือก "ราคาเหมาจ่ายต่อวัน" แต่ถ้าคิดเป็นรายชั่วโมง ให้เลือก "คิดตามรายชั่วโมง" (คุณสามารถระบุชั่วโมงที่จอดฟรีได้ด้วย หากที่จอดรถมีโปรโมชั่นประทับตราจากอาคาร)</li>
          <li><strong>ระบุจำนวนวันที่ใช้งาน:</strong> ใส่จำนวนวันที่คุณต้องขับรถไปจอดใน 1 เดือน (ปกติจะอยู่ที่ 20-22 วันสำหรับคนทำงานประจำ)</li>
          <li><strong>ใส่ราคาเหมาจ่ายรายเดือน:</strong> ใส่ค่าบริการที่จอดรถแบบรายเดือนที่ทางอาคารเสนอมา</li>
        </ol>
        <p>
          เมื่อคุณกรอกข้อมูลครบถ้วน ระบบจะทำการคำนวณเปรียบเทียบให้ทันทีว่า หากคุณจ่ายรายวันยอดรวมทั้งเดือนจะเป็นเท่าไหร่ เทียบกับการจ่ายรายเดือนแล้ว แบบไหนที่ <strong>"คุ้มค่ากว่า"</strong> พร้อมทั้งบอกส่วนต่างของเงินที่คุณจะประหยัดได้
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ข้อคิดเพิ่มเติมในการเลือกที่จอดรถ</h3>
        <p>
          นอกจากเรื่องราคาแล้ว อย่าลืมพิจารณาถึง <strong>"ความปลอดภัยและระยะทาง"</strong> ประกอบด้วย ลานจอดรถที่ราคาถูกกว่าอาจอยู่ไกลและต้องเสียค่ามอเตอร์ไซค์รับจ้างต่อเข้ามาที่ทำงาน ซึ่งเมื่อนำมารวมกันแล้วอาจแพงกว่าที่จอดรถใต้ตึก นอกจากนี้ ที่จอดรถที่มีหลังคาคุ้มแดดคุ้มฝนและมี รปภ. ดูแล ย่อมดีกว่าการจอดริมถนนหรือลานดินที่อาจเสี่ยงต่อการถูกเฉี่ยวชนหรือโจรกรรม
        </p>
        <p>
          ลองใช้เครื่องมือของเราคำนวณดูตั้งแต่วันนี้ คุณอาจพบว่าเพียงแค่เปลี่ยนวิธีการจ่ายค่าที่จอดรถ คุณก็จะมีเงินเหลือเก็บเพิ่มขึ้นหลักพันบาทต่อเดือนเลยทีเดียว!
        </p>
      </article>
    </div>
  );
}

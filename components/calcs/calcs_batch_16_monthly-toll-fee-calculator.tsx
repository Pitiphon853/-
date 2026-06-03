"use client";

import React, { useState } from "react";
import { Navigation, Wallet, CalendarDays, PlusCircle, Trash2 } from "lucide-react";

export default function TollFeeCalculator({ lang }: { lang: "TH" | "EN" }) {
  const [trips, setTrips] = useState([{ id: 1, name: "ขาไป", cost: 50 }, { id: 2, name: "ขากลับ", cost: 50 }]);
  const [daysPerMonth, setDaysPerMonth] = useState<number | "">(22);
  const [extraWeekendTrips, setExtraWeekendTrips] = useState<number | "">(500);

  const t = {
    title: lang === "TH" ? "เครื่องคิดเลขค่าทางด่วน/ค่าผ่านทางต่อเดือน" : "Monthly Toll Fee Calculator",
    tripName: lang === "TH" ? "จุดผ่านทาง/ด่าน" : "Toll Plaza / Trip",
    cost: lang === "TH" ? "ราคา (บาท)" : "Cost (THB)",
    addTrip: lang === "TH" ? "เพิ่มด่านทางด่วน" : "Add Toll Plaza",
    days: lang === "TH" ? "จำนวนวันที่ใช้ทางด่วนไปทำงาน (วัน/เดือน)" : "Work Commute Days per Month",
    extra: lang === "TH" ? "ค่าทางด่วนอื่นๆ ในวันหยุด/เสาร์-อาทิตย์ (บาท/เดือน)" : "Extra Weekend Tolls (THB/month)",
    results: lang === "TH" ? "สรุปค่าทางด่วนของคุณ" : "Toll Fee Summary",
    dailyToll: lang === "TH" ? "ค่าทางด่วนรายวัน (ไป-กลับ)" : "Daily Commute Toll",
    monthlyWorkToll: lang === "TH" ? "เฉพาะวันทำงาน" : "Work Days Only",
    monthlyTotal: lang === "TH" ? "รวมค่าทางด่วนรายเดือนทั้งหมด" : "Total Monthly Toll",
    annualTotal: lang === "TH" ? "ประเมินค่าทางด่วนรายปี" : "Estimated Annual Toll",
    topupRec: lang === "TH" ? "แนะนำการเติมเงิน EasyPass/M-Flow" : "EasyPass / M-Flow Top-up Recommendation",
    topupMsg: lang === "TH" ? "ควรเติมเงินอย่างน้อยเดือนละ" : "Recommended monthly top-up:",
    thb: lang === "TH" ? "บาท" : "THB",
  };

  const addTrip = () => {
    setTrips([...trips, { id: Date.now(), name: `ด่าน ${trips.length + 1}`, cost: 0 }]);
  };

  const removeTrip = (id: number) => {
    setTrips(trips.filter((t) => t.id !== id));
  };

  const updateTrip = (id: number, field: string, value: string | number) => {
    setTrips(trips.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const calculate = () => {
    const dailyCommute = trips.reduce((sum, trip) => sum + (Number(trip.cost) || 0), 0);
    const days = Number(daysPerMonth) || 0;
    const extra = Number(extraWeekendTrips) || 0;

    const monthlyWork = dailyCommute * days;
    const monthlyTotal = monthlyWork + extra;
    const annualTotal = monthlyTotal * 12;

    // Recommend top up to nearest 500
    const topupRec = Math.ceil(monthlyTotal / 500) * 500;

    return { dailyCommute, monthlyWork, monthlyTotal, annualTotal, topupRec };
  };

  const { dailyCommute, monthlyWork, monthlyTotal, annualTotal, topupRec } = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
          <Navigation size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3 space-y-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">{lang === "TH" ? "ระบุด่านทางด่วนที่ผ่านใน 1 วัน (ไป-กลับ)" : "Toll plazas passed in 1 day (round trip)"}</h3>
            
            <div className="space-y-3 mb-4">
              {trips.map((trip) => (
                <div key={trip.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={trip.name}
                    onChange={(e) => updateTrip(trip.id, "name", e.target.value)}
                    placeholder={t.tripName}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  />
                  <div className="relative w-32">
                    <input
                      type="number"
                      value={trip.cost === 0 ? "" : trip.cost}
                      onChange={(e) => updateTrip(trip.id, "cost", e.target.value === "" ? 0 : Number(e.target.value))}
                      placeholder={t.cost}
                      className="w-full p-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                      min="0"
                    />
                    <span className="absolute right-3 top-2 text-gray-400 text-sm">฿</span>
                  </div>
                  {trips.length > 1 && (
                    <button
                      onClick={() => removeTrip(trip.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={addTrip}
              className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <PlusCircle size={16} /> {t.addTrip}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <CalendarDays size={16} className="text-gray-400" />
                {t.days}
              </label>
              <input
                type="number"
                value={daysPerMonth}
                onChange={(e) => setDaysPerMonth(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                min="1" max="31"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Wallet size={16} className="text-gray-400" />
                {t.extra}
              </label>
              <input
                type="number"
                value={extraWeekendTrips}
                onChange={(e) => setExtraWeekendTrips(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 sticky top-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              {t.results}
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-indigo-200/50">
                <span className="text-gray-600">{t.dailyToll}</span>
                <span className="font-semibold text-gray-800">{dailyCommute.toLocaleString()} {t.thb}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-indigo-200/50">
                <span className="text-gray-600">{t.monthlyWorkToll}</span>
                <span className="font-semibold text-gray-800">{monthlyWork.toLocaleString()} {t.thb}</span>
              </div>

              <div className="bg-indigo-600 p-4 rounded-lg shadow-sm flex flex-col mt-4">
                <span className="text-indigo-100 font-medium mb-1">{t.monthlyTotal}</span>
                <span className="text-3xl font-bold text-white">
                  {monthlyTotal.toLocaleString()} <span className="text-lg font-normal text-indigo-200">{t.thb}</span>
                </span>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center mt-2">
                <span className="text-gray-500 text-sm mb-1">{t.annualTotal}</span>
                <span className="text-xl font-bold text-gray-800">
                  {annualTotal.toLocaleString()} {t.thb}
                </span>
              </div>

              {monthlyTotal > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4 text-center">
                  <p className="text-sm font-medium text-blue-800 mb-1">{t.topupRec}</p>
                  <p className="text-xs text-blue-600 mb-2">{t.topupMsg}</p>
                  <span className="inline-block bg-blue-600 text-white font-bold py-1 px-3 rounded-full text-lg">
                    {topupRec.toLocaleString()} {t.thb}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className="mt-12 prose prose-indigo max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ค่าทางด่วน: รายจ่ายประจำที่ต้องวางแผนให้ดี
        </h2>
        <p>
          สำหรับคนกรุงเทพฯ และปริมณฑล หรือผู้ที่อาศัยอยู่ในหัวเมืองใหญ่ <strong>"ทางด่วน" (Expressway)</strong> และมอเตอร์เวย์ ถือเป็นเส้นทางเลือดหลักที่ช่วยย่นระยะเวลาการเดินทาง ฝ่าฟันการจราจรที่ติดขัดอย่างหนักในชั่วโมงเร่งด่วน แต่ความสะดวกรวดเร็วนี้ก็แลกมาด้วยต้นทุนค่าผ่านทาง ซึ่งเมื่อนำมาคำนวณรวมกันเป็นรายเดือนหรือรายปีแล้ว อาจกลายเป็นค่าใช้จ่ายก้อนใหญ่ที่เป็นภาระทางการเงินได้หากไม่ได้มีการวางแผนล่วงหน้า
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เจาะลึกพฤติกรรมการใช้ทางด่วน</h3>
        <p>
          การเดินทางไป-กลับที่ทำงานของแต่ละคนมีความซับซ้อนแตกต่างกัน บางคนอาจขึ้นทางด่วนเพียงต่อเดียวจ่าย 50 บาทจบ แต่หลายคนโดยเฉพาะผู้ที่อยู่ชานเมือง อาจต้องเชื่อมต่อทางด่วนหลายสาย เช่น ขึ้นมอเตอร์เวย์ ต่อทางด่วนขั้นที่ 1 แล้วไปลงทางด่วนขั้นที่ 2 ทำให้ค่าใช้จ่ายในขาเดียวอาจสูงถึง 100-150 บาท เมื่อรวมไปและกลับอาจตกวันละ 200-300 บาทเลยทีเดียว
        </p>
        <p>
          นอกจากค่าทางด่วนในวันทำงานแล้ว เรายังมักจะมีค่าใช้จ่ายส่วนนี้ในวันหยุดสุดสัปดาห์ ไม่ว่าจะเป็นการขับรถเข้าเมืองไปเดินห้างสรรพสินค้า พาครอบครัวไปทานข้าว หรือเดินทางไปเที่ยวต่างจังหวัด ซึ่งเมื่อนำมารวมกับค่าทางด่วนในวันทำงาน ยอดรวมต่อเดือนอาจพุ่งสูงกว่าค่าน้ำมันเสียอีก!
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมต้องใช้เครื่องคิดเลขค่าทางด่วน?</h3>
        <p>
          การใช้ <em>เครื่องคิดเลขค่าทางด่วน/ค่าผ่านทางต่อเดือน</em> จะช่วยให้คุณเห็นภาพรวมและสามารถบริหารจัดการเงินได้อย่างมีประสิทธิภาพมากขึ้น:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>คำนวณต้นทุนต่อวันที่แม่นยำ:</strong> ด้วยฟีเจอร์การเพิ่มด่านหลายด่าน คุณสามารถระบุค่าผ่านทางในแต่ละจุดได้อย่างละเอียด ไม่พลาดตกหล่นแม้แต่ด่านเดียว</li>
          <li><strong>วางแผนการเติมเงิน (Top-up Planning):</strong> ในยุคที่ทุกคนหันมาใช้ระบบเก็บค่าผ่านทางอัตโนมัติอย่าง EasyPass หรือ M-Flow การรู้ยอดใช้จ่ายโดยประมาณต่อเดือน จะช่วยให้คุณสามารถ <strong>"ตั้งค่าเติมเงินอัตโนมัติ" (Auto Top-up)</strong> หรือเติมเงินก้อนใหญ่ทีเดียวให้เพียงพอต่อการใช้งานทั้งเดือน ช่วยลดปัญหากวนใจเมื่อขับเข้าด่านแล้วเงินไม่พอ และป้องกันการถูกปรับในกรณีของ M-Flow</li>
          <li><strong>ประเมินความคุ้มค่าของเส้นทาง:</strong> เมื่อคุณเห็นค่าทางด่วนรวมต่อเดือน คุณอาจนำไปประกอบการตัดสินใจว่า การตื่นเช้าขึ้นอีกสัก 30 นาทีเพื่อวิ่งเส้นทางปกติ หรือหลีกเลี่ยงการขึ้นด่านที่ราคาแพง จะช่วยประหยัดเงินได้เดือนละเท่าไหร่ คุ้มค่ากับความเหนื่อยล้าที่เพิ่มขึ้นหรือไม่</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">คำแนะนำในการใช้งาน M-Flow และ EasyPass</h3>
        <p>
          ปัจจุบันระบบ M-Flow (ระบบจัดเก็บค่าผ่านทางอัตโนมัติแบบไม่มีไม้กั้น) เริ่มเปิดใช้งานในหลายเส้นทาง ซึ่งให้ความสะดวกสบายรถไม่ต้องชะลอตัว แต่สิ่งที่ต้องระวังคือ <strong>หากลืมชำระเงินภายในเวลาที่กำหนด จะมีค่าปรับที่สูงมาก</strong> ดังนั้นการสมัครสมาชิกและผูกบัตรเครดิต หรือเติมเงินเข้าระบบให้เพียงพอตามที่เครื่องคิดเลขของเราแนะนำ (บัดเศษเป็นหลักร้อยหรือห้าร้อย) จะช่วยให้การเดินทางของคุณลื่นไหล ไร้กังวล และไม่ต้องมาปวดหัวกับบิลค่าปรับย้อนหลังอย่างแน่นอน
        </p>
      </article>
    </div>
  );
}

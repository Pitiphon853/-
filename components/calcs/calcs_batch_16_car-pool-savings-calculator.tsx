"use client";

import React, { useState } from "react";
import { Users, Car, MapPin, Fuel, Banknote } from "lucide-react";

export default function CarPoolCalculator({ lang }: { lang: "TH" | "EN" }) {
  const [distance, setDistance] = useState<number | "">(30);
  const [fuelEfficiency, setFuelEfficiency] = useState<number | "">(15);
  const [fuelPrice, setFuelPrice] = useState<number | "">(35);
  const [extraCosts, setExtraCosts] = useState<number | "">(100);
  const [daysPerMonth, setDaysPerMonth] = useState<number | "">(20);
  const [passengers, setPassengers] = useState<number | "">(3);

  const t = {
    title: lang === "TH" ? "เครื่องคิดเลขค่าใช้จ่าย Car Pool" : "Car Pool Savings Calculator",
    distance: lang === "TH" ? "ระยะทางไป-กลับต่อวัน (กม.)" : "Round-trip Distance per day (km)",
    fuelEff: lang === "TH" ? "อัตราสิ้นเปลืองน้ำมัน (กม./ลิตร)" : "Fuel Efficiency (km/l)",
    fuelPrice: lang === "TH" ? "ราคาน้ำมัน (บาท/ลิตร)" : "Fuel Price (THB/l)",
    extraCosts: lang === "TH" ? "ค่าทางด่วน/ค่าที่จอดรถต่อวัน (บาท)" : "Toll/Parking per day (THB)",
    days: lang === "TH" ? "จำนวนวันเดินทางต่อเดือน" : "Commute Days per month",
    passengers: lang === "TH" ? "จำนวนคนใน Car Pool (รวมคนขับ)" : "Number of People (including driver)",
    results: lang === "TH" ? "ผลการคำนวณ" : "Results",
    soloCost: lang === "TH" ? "ค่าใช้จ่ายหากขับคนเดียว/เดือน" : "Solo Cost per month",
    carpoolCost: lang === "TH" ? "ค่าใช้จ่ายแบบ Car Pool ต่อคน/เดือน" : "Carpool Cost per person/month",
    savings: lang === "TH" ? "คุณประหยัดเงินได้/เดือน" : "You Save per month",
    thb: lang === "TH" ? "บาท" : "THB",
  };

  const calculate = () => {
    const d = Number(distance) || 0;
    const eff = Number(fuelEfficiency) || 1;
    const price = Number(fuelPrice) || 0;
    const extra = Number(extraCosts) || 0;
    const days = Number(daysPerMonth) || 0;
    const pax = Number(passengers) || 1;

    const dailyFuelCost = (d / eff) * price;
    const dailyTotalCost = dailyFuelCost + extra;
    const monthlySolo = dailyTotalCost * days;
    const monthlyCarpool = monthlySolo / pax;
    const monthlySavings = monthlySolo - monthlyCarpool;

    return { monthlySolo, monthlyCarpool, monthlySavings };
  };

  const { monthlySolo, monthlyCarpool, monthlySavings } = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
          <Users size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <MapPin size={16} className="text-gray-400" />
              {t.distance}
            </label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Fuel size={16} className="text-gray-400" />
              {t.fuelEff}
            </label>
            <input
              type="number"
              value={fuelEfficiency}
              onChange={(e) => setFuelEfficiency(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              min="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Banknote size={16} className="text-gray-400" />
              {t.fuelPrice}
            </label>
            <input
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Banknote size={16} className="text-gray-400" />
              {t.extraCosts}
            </label>
            <input
              type="number"
              value={extraCosts}
              onChange={(e) => setExtraCosts(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.days}
            </label>
            <input
              type="number"
              value={daysPerMonth}
              onChange={(e) => setDaysPerMonth(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              min="1"
              max="31"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Users size={16} className="text-gray-400" />
              {t.passengers}
            </label>
            <input
              type="number"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              min="1"
            />
          </div>
        </div>

        <div>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 sticky top-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Car className="text-blue-500" />
              {t.results}
            </h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                <span className="text-gray-600">{t.soloCost}</span>
                <span className="text-lg font-semibold text-gray-800">
                  {monthlySolo.toLocaleString("en-US", { maximumFractionDigits: 0 })} {t.thb}
                </span>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 flex justify-between items-center">
                <span className="text-gray-600">{t.carpoolCost}</span>
                <span className="text-xl font-bold text-blue-600">
                  {monthlyCarpool.toLocaleString("en-US", { maximumFractionDigits: 0 })} {t.thb}
                </span>
              </div>

              <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200 flex justify-between items-center">
                <span className="text-green-800 font-medium">{t.savings}</span>
                <span className="text-2xl font-bold text-green-600">
                  {monthlySavings.toLocaleString("en-US", { maximumFractionDigits: 0 })} {t.thb}
                </span>
              </div>
            </div>
            {Number(passengers) === 1 && (
              <p className="mt-4 text-sm text-red-500 text-center">
                {lang === "TH" 
                  ? "เพิ่มจำนวนคนใน Car Pool เพื่อดูจำนวนเงินที่ประหยัดได้" 
                  : "Increase the number of passengers to see your savings."}
              </p>
            )}
          </div>
        </div>
      </div>

      <article className="mt-12 prose prose-blue max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          การทำ Car Pool: ทางเลือกอัจฉริยะเพื่อประหยัดเงินและลดโลกร้อน
        </h2>
        <p>
          ในยุคที่ราคาน้ำมันมีความผันผวนและปัญหาจราจรในเมืองใหญ่ยังคงเป็นเรื่องที่ท้าทาย <strong>การทำ Car Pool (คาร์พูล)</strong> หรือการเดินทางร่วมกันในเส้นทางเดียวกัน กำลังกลายเป็นทางเลือกที่ได้รับความนิยมอย่างมาก ไม่ใช่เพียงแค่เทรนด์หรือกระแสชั่วคราว แต่เป็นวิธีการที่ชาญฉลาดในการบริหารจัดการค่าใช้จ่ายส่วนบุคคลและช่วยเหลือสังคมไปพร้อมๆ กัน หากคุณยังลังเลว่าการแบ่งปันที่นั่งในรถจะคุ้มค่าหรือไม่ บทความนี้จะพาคุณไปสำรวจประโยชน์และวิธีการเริ่มต้นอย่างเจาะลึก
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไม Car Pool ถึงช่วยประหยัดเงินได้มหาศาล?</h3>
        <p>
          เมื่อเราพูดถึงค่าใช้จ่ายในการเดินทางด้วยรถยนต์ส่วนตัว หลายคนมักนึกถึงแค่ <strong>"ค่าน้ำมัน"</strong> แต่ในความเป็นจริงแล้วยังมีค่าใช้จ่ายแฝงอื่นๆ ที่เราต้องแบกรับในทุกๆ วัน เช่น ค่าทางด่วน ค่าที่จอดรถ ไปจนถึงค่าสึกหรอของรถยนต์ (Maintenance) เมื่อคุณใช้รถคนเดียว คุณต้องรับภาระค่าใช้จ่ายเหล่านี้ 100% เต็ม แต่เมื่อคุณมีเพื่อนร่วมทางหรือเพื่อนร่วมงานที่ไปทางเดียวกัน ค่าใช้จ่ายเหล่านี้จะถูกหารแบ่งตามจำนวนคน
        </p>
        <p>
          ตัวอย่างเช่น หากค่าเดินทางไป-กลับทำงานของคุณ (รวมค่าน้ำมัน ค่าทางด่วน และค่าที่จอดรถ) ตกอยู่ที่วันละ 300 บาท ทำงาน 20 วันต่อเดือน คุณจะมีค่าใช้จ่ายสูงถึง 6,000 บาท/เดือน แต่ถ้าคุณหาเพื่อนร่วมทางได้อีก 3 คน รวมคุณเป็น 4 คน ค่าใช้จ่ายจะเหลือเพียงคนละ 1,500 บาท/เดือน ซึ่งทำให้คุณ <strong>ประหยัดเงินไปได้ถึง 4,500 บาท/เดือน หรือ 54,000 บาท/ปี!</strong> เงินจำนวนนี้สามารถนำไปลงทุน เป็นเงินออม หรือใช้จ่ายในส่วนอื่นที่จำเป็นได้สบายๆ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์ที่มากกว่าแค่เรื่องเงิน</h3>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ลดปัญหาความเครียดบนท้องถนน:</strong> การมีเพื่อนคุยระหว่างทาง ช่วยให้การเผชิญกับรถติดไม่น่าเบื่อและลดความเครียดจากการขับขี่ได้ นอกจากนี้หากสามารถสลับกันขับได้ ยิ่งช่วยลดความเหนื่อยล้าได้อย่างมาก</li>
          <li><strong>เป็นมิตรกับสิ่งแวดล้อม:</strong> รถ 1 คันปล่อยก๊าซคาร์บอนไดออกไซด์ (CO2) จำนวนมหาศาล การที่คน 4 คนนั่งรถคันเดียวกันแทนที่จะขับรถ 4 คัน เท่ากับว่าเราช่วยลดปริมาณมลพิษฝุ่น PM 2.5 และก๊าซเรือนกระจกบนท้องถนนลงได้ถึง 75%</li>
          <li><strong>ช่วยลดปัญหาการจราจร:</strong> หากหลายองค์กรรณรงค์ให้พนักงานทำคาร์พูล จำนวนรถยนต์บนท้องถนนในช่วงเวลาเร่งด่วนจะลดลงอย่างเห็นได้ชัด ส่งผลให้การจราจรคล่องตัวมากขึ้น</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เริ่มทำ Car Pool อย่างไรให้เวิร์ค?</h3>
        <p>
          การเริ่มต้นนั้นไม่ยากอย่างที่คิด คุณอาจเริ่มจากการสอบถามเพื่อนร่วมงานที่อยู่หมู่บ้านเดียวกัน โซนเดียวกัน หรือทางผ่าน เพื่อจัดสรรตารางการเดินทาง หรืออาจใช้แอปพลิเคชันสำหรับ Carpool ที่เริ่มมีให้บริการในไทย เพื่อค้นหาเพื่อนร่วมทางที่มีการยืนยันตัวตนเพื่อความปลอดภัย 
        </p>
        <p>
          สิ่งสำคัญคือ <strong>การตกลงเรื่องค่าใช้จ่ายให้ชัดเจนตั้งแต่แรก</strong> เพื่อหลีกเลี่ยงความอึดอัดใจในภายหลัง คุณสามารถใช้ <em>เครื่องคิดเลขคำนวณค่าใช้จ่าย Car Pool</em> ของเรา เพื่อหารตัวเลขที่ยุติธรรมสำหรับทุกคน เพียงกรอกระยะทาง อัตราสิ้นเปลืองน้ำมัน ค่าน้ำมัน และค่าทางด่วน ระบบจะคำนวณยอดที่แต่ละคนต้องจ่ายออกมาให้อย่างแม่นยำ
        </p>
        <p>
          สรุปแล้ว การทำคาร์พูลเป็นหนึ่งในไลฟ์สไตล์แบบ "Win-Win Situation" ที่ได้ประโยชน์ทั้งตัวคุณเอง เพื่อนร่วมทาง และสิ่งแวดล้อม ลองเปิดใจรับพฤติกรรมการเดินทางแบบใหม่ แล้วคุณจะพบว่าการเดินทางไปทำงานในแต่ละวันนั้น สนุกและประหยัดขึ้นกว่าเดิมมากเลยทีเดียว!
        </p>
      </article>
    </div>
  );
}

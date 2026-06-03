"use client";

import React, { useState } from "react";
import { MapPin, Calendar, Fuel, Banknote, Clock, Route } from "lucide-react";

export default function AnnualCommuteCalculator({ lang }: { lang: "TH" | "EN" }) {
  const [oneWayDistance, setOneWayDistance] = useState<number | "">(25);
  const [daysPerWeek, setDaysPerWeek] = useState<number | "">(5);
  const [weeksPerYear, setWeeksPerYear] = useState<number | "">(48);
  const [fuelEff, setFuelEff] = useState<number | "">(12);
  const [fuelPrice, setFuelPrice] = useState<number | "">(35);
  const [dailyExtra, setDailyExtra] = useState<number | "">(150);
  const [avgSpeed, setAvgSpeed] = useState<number | "">(30);

  const t = {
    title: lang === "TH" ? "คำนวณค่าใช้จ่ายและระยะทางไป-กลับทำงานต่อปี" : "Annual Commute Cost Calculator",
    distance: lang === "TH" ? "ระยะทางขาไปทางเดียว (กม.)" : "One-way Distance (km)",
    days: lang === "TH" ? "วันที่เดินทางต่อสัปดาห์" : "Commute Days per week",
    weeks: lang === "TH" ? "สัปดาห์ที่ทำงานต่อปี (หักวันหยุด/ลางาน)" : "Work Weeks per year",
    fuelEff: lang === "TH" ? "อัตราสิ้นเปลืองรถยนต์ (กม./ลิตร)" : "Fuel Efficiency (km/l)",
    fuelPrice: lang === "TH" ? "ราคาน้ำมัน (บาท/ลิตร)" : "Fuel Price (THB/l)",
    extra: lang === "TH" ? "ค่าทางด่วน/ที่จอดรถต่อวัน (บาท)" : "Daily Toll/Parking (THB)",
    speed: lang === "TH" ? "ความเร็วเฉลี่ย (กม./ชม.)" : "Average Speed (km/h)",
    results: lang === "TH" ? "สรุปผลการเดินทางตลอด 1 ปี" : "Your Annual Commute Summary",
    totalDist: lang === "TH" ? "ระยะทางรวมที่ขับ" : "Total Distance Driven",
    totalFuel: lang === "TH" ? "ค่าน้ำมันรวม" : "Total Fuel Cost",
    totalExtra: lang === "TH" ? "ค่าทางด่วน/ที่จอดรถรวม" : "Total Extra Costs",
    grandTotal: lang === "TH" ? "ค่าใช้จ่ายรวมทั้งหมด" : "Grand Total Cost",
    timeSpent: lang === "TH" ? "เวลาที่เสียไปบนถนน" : "Time Spent Commuting",
    km: lang === "TH" ? "กิโลเมตร" : "km",
    thb: lang === "TH" ? "บาท" : "THB",
    hours: lang === "TH" ? "ชั่วโมง" : "hours",
    daysUnit: lang === "TH" ? "วัน" : "days",
  };

  const calculate = () => {
    const dWay = Number(oneWayDistance) || 0;
    const dWeek = Number(daysPerWeek) || 0;
    const wYear = Number(weeksPerYear) || 0;
    const eff = Number(fuelEff) || 1;
    const price = Number(fuelPrice) || 0;
    const extra = Number(dailyExtra) || 0;
    const speed = Number(avgSpeed) || 30;

    const roundTripDaily = dWay * 2;
    const daysPerYear = dWeek * wYear;
    
    const annualDist = roundTripDaily * daysPerYear;
    const annualFuelLiters = annualDist / eff;
    const annualFuelCost = annualFuelLiters * price;
    const annualExtraCost = extra * daysPerYear;
    
    const totalCost = annualFuelCost + annualExtraCost;

    const totalHours = annualDist / (speed > 0 ? speed : 1);
    const totalDays24h = totalHours / 24;

    return { annualDist, annualFuelCost, annualExtraCost, totalCost, totalHours, totalDays24h };
  };

  const { annualDist, annualFuelCost, annualExtraCost, totalCost, totalHours, totalDays24h } = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-100 p-3 rounded-full text-red-600">
          <Route size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                {t.distance}
              </label>
              <input
                type="number"
                value={oneWayDistance}
                onChange={(e) => setOneWayDistance(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                {t.days}
              </label>
              <input
                type="number"
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                min="1" max="7"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.weeks}
              </label>
              <input
                type="number"
                value={weeksPerYear}
                onChange={(e) => setWeeksPerYear(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                min="1" max="52"
              />
              <p className="text-xs text-gray-500 mt-1">
                {lang === "TH" ? "*ปกติ 1 ปีมี 52 สัปดาห์ (หักวันหยุด/ลางานเหลือประมาณ 48)" : "*Usually 52 weeks/year (minus holidays ≈ 48)"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Fuel size={16} className="text-gray-400" />
                {t.fuelEff}
              </label>
              <input
                type="number"
                value={fuelEff}
                onChange={(e) => setFuelEff(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                min="1"
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
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Banknote size={16} className="text-gray-400" />
              {t.extra}
            </label>
            <input
              type="number"
              value={dailyExtra}
              onChange={(e) => setDailyExtra(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              {t.speed}
            </label>
            <input
              type="number"
              value={avgSpeed}
              onChange={(e) => setAvgSpeed(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              min="1"
            />
            <p className="text-xs text-gray-500 mt-1">
              {lang === "TH" ? "*รถติดในเมืองเฉลี่ย 15-20 กม./ชม. ชานเมือง 30-50 กม./ชม." : "*City traffic avg 15-20 km/h, suburbs 30-50 km/h"}
            </p>
          </div>
        </div>

        <div>
          <div className="bg-red-50 p-6 rounded-xl border border-red-100 sticky top-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              {t.results}
            </h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                <span className="text-gray-600 font-medium">{t.totalDist}</span>
                <span className="text-lg font-bold text-gray-800">
                  {annualDist.toLocaleString("en-US")} <span className="text-sm font-normal text-gray-500">{t.km}</span>
                </span>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                <span className="text-gray-600">{t.totalFuel}</span>
                <span className="text-lg font-semibold text-gray-800">
                  {annualFuelCost.toLocaleString("en-US", { maximumFractionDigits: 0 })} <span className="text-sm font-normal text-gray-500">{t.thb}</span>
                </span>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                <span className="text-gray-600">{t.totalExtra}</span>
                <span className="text-lg font-semibold text-gray-800">
                  {annualExtraCost.toLocaleString("en-US", { maximumFractionDigits: 0 })} <span className="text-sm font-normal text-gray-500">{t.thb}</span>
                </span>
              </div>

              <div className="bg-red-600 p-4 rounded-lg shadow-sm flex flex-col mt-4">
                <span className="text-red-100 font-medium mb-1">{t.grandTotal}</span>
                <span className="text-3xl font-bold text-white">
                  {totalCost.toLocaleString("en-US", { maximumFractionDigits: 0 })} <span className="text-lg font-normal text-red-200">{t.thb}</span>
                </span>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-200 flex flex-col">
                <span className="text-orange-800 font-medium mb-1 flex items-center gap-2">
                  <Clock size={16} /> {t.timeSpent}
                </span>
                <span className="text-xl font-bold text-orange-600">
                  {totalHours.toLocaleString("en-US", { maximumFractionDigits: 0 })} {t.hours}
                </span>
                <span className="text-sm text-orange-500 mt-1">
                  ( {lang === "TH" ? "เท่ากับนั่งอยู่ในรถติดต่อกัน" : "Equal to sitting in car non-stop for"} <strong>{totalDays24h.toFixed(1)} {t.daysUnit}</strong> )
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-12 prose prose-red max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          เปิดสถิติการเดินทาง: คุณใช้เวลาและเงินไปกับการไปทำงานเท่าไหร่ใน 1 ปี?
        </h2>
        <p>
          ในแต่ละวัน ชีวิตคนวัยทำงานส่วนใหญ่หมดไปกับ <strong>"การเดินทาง"</strong> ตั้งแต่ก้าวเท้าออกจากบ้านจนถึงที่ทำงาน หลายคนอาจคุ้นชินกับค่าใช้จ่ายรายวันที่ดูเหมือนจะไม่มากนัก เช่น ค่าน้ำมันวันละ 100 บาท ค่าทางด่วนอีก 100 บาท แต่คุณเคยลองนำตัวเลขเหล่านี้มาคูณด้วยจำนวนวันที่คุณไปทำงานตลอดทั้งปีหรือไม่? ผลลัพธ์ที่ได้อาจทำให้คุณต้องตกใจ เพราะมันคือเงินก้อนใหญ่ที่สามารถนำไปทำอย่างอื่นได้มากมาย
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมถึงควรคำนวณค่าเดินทางแบบรายปี?</h3>
        <p>
          การมองเห็นภาพรวมของค่าใช้จ่ายระยะยาว (Annual Cost) มีประโยชน์อย่างมากในการวางแผนทางการเงินและการตัดสินใจครั้งสำคัญในชีวิต เช่น:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>พิจารณาการย้ายที่อยู่อาศัย:</strong> หากคุณพบว่าค่าเดินทางต่อปีของคุณสูงถึงหลักแสนบาท การตัดสินใจเช่าคอนโดมิเนียมหรือซื้อบ้านที่อยู่ใกล้ที่ทำงานมากขึ้น อาจกลายเป็นทางเลือกที่คุ้มค่ากว่าเมื่อนำมาหักลบกับค่าเดินทางและเวลาที่ประหยัดได้</li>
          <li><strong>ตัดสินใจเปลี่ยนงาน:</strong> การได้เงินเดือนเพิ่มขึ้น 3,000 บาท/เดือน อาจดูน่าสนใจ แต่ถ้าที่ทำงานใหม่ทำให้คุณต้องเสียค่าเดินทางเพิ่มขึ้นเดือนละ 4,000 บาท การย้ายงานครั้งนี้อาจทำให้คุณ "ขาดทุน" โดยไม่รู้ตัว การใช้ <em>เครื่องคำนวณระยะทางและค่าใช้จ่ายไป-กลับทำงานต่อปี</em> จะช่วยให้คุณเห็นตัวเลขสุทธิที่แท้จริง</li>
          <li><strong>วางแผนงบประมาณบำรุงรักษารถยนต์:</strong> หากระยะทางรวมต่อปีของคุณสูงเกิน 20,000 กิโลเมตร คุณจะต้องวางแผนเผื่อค่าใช้จ่ายในการเช็คระยะ เปลี่ยนถ่ายน้ำมันเครื่อง และเปลี่ยนยางรถยนต์ให้ถี่ขึ้น</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เวลาคือต้นทุนที่แพงที่สุด</h3>
        <p>
          นอกเหนือจากเรื่องของจำนวนเงินแล้ว <strong>"เวลา"</strong> เป็นอีกหนึ่งต้นทุนแฝงที่หลายคนมองข้าม เครื่องมือคำนวณของเรามีฟีเจอร์คำนวณระยะเวลาที่คุณต้องเสียไปบนท้องถนนใน 1 ปี (Time Spent Commuting) โดยอ้างอิงจากความเร็วเฉลี่ยในการขับขี่
        </p>
        <p>
          ลองจินตนาการดูว่า หากคุณต้องใช้เวลาเดินทางไป-กลับวันละ 2 ชั่วโมง ทำงาน 240 วันต่อปี นั่นหมายความว่าคุณต้องเสียเวลาไปถึง 480 ชั่วโมงต่อปี <strong>ซึ่งเทียบเท่ากับการนั่งอยู่ในรถตลอด 24 ชั่วโมงต่อเนื่องกันถึง 20 วัน!</strong> เวลาเหล่านี้น่าจะนำไปใช้พักผ่อน ออกกำลังกาย หรือพัฒนาทักษะใหม่ๆ ได้อย่างมากมาย
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เทคนิคการลดค่าใช้จ่ายและประหยัดเวลา</h3>
        <p>
          เมื่อคุณทราบตัวเลขที่แท้จริงแล้ว ลองหาวิธีปรับเปลี่ยนพฤติกรรมเพื่อลดต้นทุนเหล่านี้ดู เช่น:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>พิจารณา Car Pool:</strong> หาเพื่อนร่วมงานหรือคนรู้จักที่มีเส้นทางเดียวกันเพื่อแชร์ค่าน้ำมันและค่าทางด่วน</li>
          <li><strong>เจรจาขอทำงานแบบ Hybrid:</strong> หากลักษณะงานเอื้ออำนวย การขอ Work from Home สัปดาห์ละ 1-2 วัน จะช่วยลดค่าใช้จ่ายและเวลาเดินทางรายปีลงได้อย่างมีนัยสำคัญ</li>
          <li><strong>เปรียบเทียบการเดินทางสาธารณะ:</strong> ลองคำนวณดูว่าหากเปลี่ยนไปใช้รถไฟฟ้า รถเมล์ หรือเรือโดยสาร แม้จะดูหลายต่อ แต่ถ้ารวมกันแล้วถูกกว่าและควบคุมเวลาได้ดีกว่าก็อาจเป็นทางเลือกที่น่าสนใจ</li>
        </ul>
        <p>
          อย่าปล่อยให้ค่าเดินทางและรถติดขโมยทั้งเงินและเวลาในชีวิตของคุณไปเงียบๆ มาเริ่มต้นคำนวณและวางแผนชีวิตใหม่ตั้งแต่วันนี้ เพื่ออนาคตทางการเงินและคุณภาพชีวิตที่ดีขึ้นของคุณเอง!
        </p>
      </article>
    </div>
  );
}

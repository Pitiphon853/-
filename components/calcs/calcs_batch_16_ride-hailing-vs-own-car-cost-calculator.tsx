"use client";

import React, { useState } from "react";
import { CarFront, Smartphone, ShieldCheck, Wrench, Fuel, Car, Info, Calculator, CalendarDays } from "lucide-react";

export default function RideHailingVsOwnCarCalculator({ lang }: { lang: "TH" | "EN" }) {
  // Own Car Inputs
  const [carInstallment, setCarInstallment] = useState<number | "">(12000);
  const [insuranceTax, setInsuranceTax] = useState<number | "">(20000); // per year
  const [maintenance, setMaintenance] = useState<number | "">(10000); // per year
  const [fuelParkingToll, setFuelParkingToll] = useState<number | "">(6000); // per month

  // Ride Hailing Inputs
  const [avgTripCost, setAvgTripCost] = useState<number | "">(150);
  const [tripsPerWeek, setTripsPerWeek] = useState<number | "">(14); // 2 trips a day * 7 days

  const t = {
    title: lang === "TH" ? "เปรียบเทียบค่าใช้จ่าย เรียกรถ vs รถส่วนตัว" : "Ride Hailing vs Own Car Cost",
    ownCar: lang === "TH" ? "ค่าใช้จ่ายรถยนต์ส่วนตัว" : "Own Car Costs",
    rideHailing: lang === "TH" ? "ค่าใช้จ่ายแอปเรียกรถ (Grab, LineMan, ฯลฯ)" : "Ride Hailing Costs (Grab, Uber, etc.)",
    installment: lang === "TH" ? "ค่างวดรถ (บาท/เดือน)" : "Car Installment (THB/mo)",
    insTax: lang === "TH" ? "ค่าประกันภัย+พรบ+ภาษี (บาท/ปี)" : "Insurance + Tax (THB/year)",
    maintenance: lang === "TH" ? "ค่าบำรุงรักษา/เช็คระยะ (บาท/ปี)" : "Maintenance/Service (THB/year)",
    dailyRunning: lang === "TH" ? "ค่าน้ำมัน+ที่จอด+ทางด่วน (บาท/เดือน)" : "Fuel + Parking + Tolls (THB/mo)",
    avgTrip: lang === "TH" ? "ค่าโดยสารเฉลี่ยต่อเที่ยว (บาท)" : "Average Trip Cost (THB)",
    tripsWeek: lang === "TH" ? "จำนวนเที่ยวที่เรียกต่อสัปดาห์" : "Trips per week",
    results: lang === "TH" ? "ผลการเปรียบเทียบ (ต่อเดือน)" : "Monthly Comparison Results",
    ownCarTotal: lang === "TH" ? "รวมค่าใช้จ่ายรถส่วนตัว" : "Total Own Car Cost",
    rideTotal: lang === "TH" ? "รวมค่าเรียกรถ" : "Total Ride Hailing Cost",
    thb: lang === "TH" ? "บาท/เดือน" : "THB/mo",
    diffText: lang === "TH" ? "ส่วนต่างค่าใช้จ่าย" : "Cost Difference",
    ownCarWins: lang === "TH" ? "รถยนต์ส่วนตัวคุ้มกว่า!" : "Owning a car is cheaper!",
    rideWins: lang === "TH" ? "ใช้แอปเรียกรถคุ้มกว่า!" : "Ride hailing is cheaper!",
    equal: lang === "TH" ? "ค่าใช้จ่ายพอๆ กัน" : "Costs are roughly equal.",
    saveText: lang === "TH" ? "ประหยัดกว่าเดือนละ" : "Cheaper by",
  };

  const calculate = () => {
    // Car
    const monthlyInstallment = Number(carInstallment) || 0;
    const monthlyInsTax = (Number(insuranceTax) || 0) / 12;
    const monthlyMaint = (Number(maintenance) || 0) / 12;
    const monthlyRunning = Number(fuelParkingToll) || 0;
    
    const totalCarMonthly = monthlyInstallment + monthlyInsTax + monthlyMaint + monthlyRunning;

    // Ride
    const tripCost = Number(avgTripCost) || 0;
    const tripsWk = Number(tripsPerWeek) || 0;
    // Average 4.33 weeks per month
    const totalRideMonthly = tripCost * tripsWk * 4.333;

    const diff = Math.abs(totalCarMonthly - totalRideMonthly);

    return { totalCarMonthly, totalRideMonthly, diff };
  };

  const { totalCarMonthly, totalRideMonthly, diff } = calculate();

  const isRideCheaper = totalRideMonthly < totalCarMonthly;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
        <div className="bg-teal-100 p-3 rounded-full text-teal-600">
          <Calculator size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Own Car Section */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
            <CarFront className="text-blue-600" />
            {t.ownCar}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-2">
                <Car size={16} className="text-blue-500" />
                {t.installment}
              </label>
              <input
                type="number"
                value={carInstallment}
                onChange={(e) => setCarInstallment(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                min="0"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-blue-500" />
                  {t.insTax}
                </label>
                <input
                  type="number"
                  value={insuranceTax}
                  onChange={(e) => setInsuranceTax(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-2">
                  <Wrench size={16} className="text-blue-500" />
                  {t.maintenance}
                </label>
                <input
                  type="number"
                  value={maintenance}
                  onChange={(e) => setMaintenance(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1 flex items-center gap-2">
                <Fuel size={16} className="text-blue-500" />
                {t.dailyRunning}
              </label>
              <input
                type="number"
                value={fuelParkingToll}
                onChange={(e) => setFuelParkingToll(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Ride Hailing Section */}
        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
          <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
            <Smartphone className="text-green-600" />
            {t.rideHailing}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-900 mb-1 flex items-center gap-2">
                <CarFront size={16} className="text-green-500" />
                {t.avgTrip}
              </label>
              <input
                type="number"
                value={avgTripCost}
                onChange={(e) => setAvgTripCost(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-900 mb-1 flex items-center gap-2">
                <CalendarDays size={16} className="text-green-500" />
                {t.tripsWeek}
              </label>
              <input
                type="number"
                value={tripsPerWeek}
                onChange={(e) => setTripsPerWeek(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                min="0"
              />
              <p className="text-xs text-green-700 mt-2 flex items-start gap-1">
                <Info size={14} className="shrink-0 mt-0.5" />
                {lang === "TH" 
                  ? "ตัวอย่าง: ไปทำงาน 5 วัน (ไป-กลับ) = 10 เที่ยว + ไปเที่ยววันหยุด 4 เที่ยว รวมเป็น 14 เที่ยวต่อสัปดาห์" 
                  : "Example: 5 days work commute (round) = 10 trips + Weekend outings 4 trips = 14 trips/week"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{t.results}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-t-blue-500">
            <p className="text-gray-500 font-medium mb-2">{t.ownCarTotal}</p>
            <p className="text-3xl font-bold text-blue-700">
              {totalCarMonthly.toLocaleString("en-US", { maximumFractionDigits: 0 })} <span className="text-base font-normal text-gray-500">{t.thb}</span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-t-green-500">
            <p className="text-gray-500 font-medium mb-2">{t.rideTotal}</p>
            <p className="text-3xl font-bold text-green-700">
              {totalRideMonthly.toLocaleString("en-US", { maximumFractionDigits: 0 })} <span className="text-base font-normal text-gray-500">{t.thb}</span>
            </p>
          </div>
        </div>

        <div className={`mt-8 inline-block p-6 rounded-xl border-2 ${
          diff === 0 ? "bg-gray-100 border-gray-300" :
          isRideCheaper ? "bg-green-100 border-green-400" : "bg-blue-100 border-blue-400"
        }`}>
          <h4 className={`text-xl font-bold mb-2 ${
            diff === 0 ? "text-gray-700" :
            isRideCheaper ? "text-green-800" : "text-blue-800"
          }`}>
            {diff === 0 ? t.equal : isRideCheaper ? t.rideWins : t.ownCarWins}
          </h4>
          {diff > 0 && (
            <p className="text-gray-700 text-lg">
              {t.saveText} <strong className="text-2xl">{diff.toLocaleString("en-US", { maximumFractionDigits: 0 })}</strong> {lang === "TH" ? "บาท" : "THB"}
            </p>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-teal max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ซื้อรถส่วนตัว หรือ เรียกแอป (Ride-Hailing) แบบไหนดีกว่ากัน?
        </h2>
        <p>
          คำถามยอดฮิตของคนยุคใหม่ที่เพิ่งเริ่มทำงาน หรือผู้ที่กำลังลังเลว่าจะซื้อรถยนต์คันแรกดีหรือไม่ คือ <strong>"เราควรซื้อรถขับเอง หรือใช้บริการเรียกรถผ่านแอปพลิเคชันอย่าง Grab, LineMan, Bolt ดี?"</strong> เมื่อมองเผินๆ การจ่ายค่าโดยสารครั้งละ 100-200 บาททุกวันดูเป็นเงินที่สิ้นเปลือง และหลายคนมีความเชื่อที่ว่า "ซื้อรถเองดีกว่า ได้รถเป็นของตัวเอง" แต่เมื่อนำตัวเลขค่าใช้จ่ายทั้งหมดมากางดูจริงๆ ผลลัพธ์อาจไม่เป็นอย่างที่คุณคิดเสมอไป
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เจาะลึก "ต้นทุนที่ซ่อนอยู่" ของการมีรถส่วนตัว</h3>
        <p>
          คนที่ไม่มีรถมักจะมองเห็นเพียงแค่ <strong>"ค่างวดรถ"</strong> และ <strong>"ค่าน้ำมัน"</strong> แต่ในความเป็นจริง การเป็นเจ้าของรถยนต์ 1 คัน มีค่าใช้จ่ายแฝง (Hidden Costs) ตามมาอีกมากมาย ได้แก่:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ค่าประกันภัยรถยนต์:</strong> ประกันชั้น 1 มักมีราคาเฉลี่ยอยู่ที่ 15,000 - 25,000 บาทต่อปี ขึ้นอยู่กับรุ่นรถ</li>
          <li><strong>ค่าภาษีและ พ.ร.บ.:</strong> เป็นสิ่งที่ต้องจ่ายทุกปีตามกฎหมาย</li>
          <li><strong>ค่าบำรุงรักษา (Maintenance):</strong> การเช็คระยะ เปลี่ยนถ่ายน้ำมันเครื่อง เปลี่ยนยาง ผ้าเบรก และแบตเตอรี่ ซึ่งเมื่อรถหมดการรับประกัน ค่าใช้จ่ายส่วนนี้มักจะเพิ่มสูงขึ้น</li>
          <li><strong>ค่าที่จอดรถและทางด่วน:</strong> หากคุณทำงานในย่านศูนย์กลางธุรกิจ (CBD) ค่าที่จอดรถรายเดือนอาจสูงถึง 2,000 - 3,000 บาท</li>
          <li><strong>ค่าเสื่อมราคา (Depreciation):</strong> ทันทีที่คุณขับรถออกจากโชว์รูม มูลค่ารถจะลดลงทันทีประมาณ 10-20% และลดลงเรื่อยๆ ทุกปี (แม้จะไม่ใช่เงินสดที่จ่ายออกไปทุกเดือน แต่เป็นความมั่งคั่งของคุณที่ลดลง)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ความยืดหยุ่นของการใช้แอปเรียกรถ (Ride-Hailing)</h3>
        <p>
          ในทางกลับกัน การใช้บริการ Ride-Hailing แม้จะต้องจ่ายเงินเป็นรายครั้งและอาจมีความผันผวนของราคาตามช่วงเวลา (Surge Pricing) แต่ก็มีข้อดีที่น่าสนใจ:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ไม่ต้องรับภาระหนี้ระยะยาว:</strong> ไม่ต้องผ่อนรถ 4-7 ปี หากเดือนไหนคุณเดินทางน้อย หรือ Work From Home คุณก็แทบไม่ต้องเสียค่าใช้จ่ายส่วนนี้เลย</li>
          <li><strong>ไม่ต้องปวดหัวเรื่องที่จอดรถ:</strong> คุณสามารถลงรถหน้าอาคารสำนักงานหรือห้างสรรพสินค้าได้เลย ไม่ต้องวนหาที่จอดให้เสียเวลา และไม่ต้องเสียค่าจอดรถ</li>
          <li><strong>นำเวลาไปทำอย่างอื่นได้:</strong> ระหว่างนั่งรถ คุณสามารถตอบอีเมล อ่านหนังสือ หรือแม้แต่งีบหลับพักผ่อนได้ ซึ่งดีกว่าการต้องมานั่งเครียดหลังพวงมาลัยตอนรถติด</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สรุปแล้วแบบไหนคุ้มกว่า?</h3>
        <p>
          คำตอบของเรื่องนี้ <strong>"ไม่มีกฎตายตัว"</strong> ขึ้นอยู่กับไลฟ์สไตล์ของแต่ละคน หากคุณเป็นคนที่ต้องเดินทางไปพบลูกค้าหลายที่ในหนึ่งวัน อาศัยอยู่ชานเมืองที่เรียกรถยาก หรือมีครอบครัวที่ต้องพาไปไหนมาไหน การซื้อรถส่วนตัวย่อมตอบโจทย์และคุ้มค่ากว่า 
        </p>
        <p>
          แต่หากคุณเป็นคนโสด อาศัยอยู่ในเมือง ใกล้แนวรถไฟฟ้า นานๆ จะออกไปเที่ยวต่างจังหวัดสักครั้ง การผสมผสานระหว่างการนั่งรถไฟฟ้า รถสาธารณะ และการเรียก Ride-Hailing ในวันที่จำเป็น มักจะมีค่าใช้จ่ายโดยรวมที่ <strong>ถูกกว่าการผ่อนรถยนต์ส่วนตัวอย่างมาก</strong> 
        </p>
        <p>
          ลองใช้ <em>เครื่องมือเปรียบเทียบค่าใช้จ่าย เรียกรถ vs รถส่วนตัว</em> ของเรา โดยใส่ตัวเลขตามความเป็นจริงในชีวิตคุณ แล้วคุณอาจจะได้คำตอบที่ชัดเจนขึ้นว่า ทางเลือกไหนคือทางเลือกที่ชาญฉลาดที่สุดสำหรับสถานะทางการเงินของคุณในตอนนี้
        </p>
      </article>
    </div>
  );
}

import React, { useState } from 'react';
import { Zap, Fuel, BatteryCharging, ArrowRight } from 'lucide-react';

export default function EvCostPerKmCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  // EV params
  const [batteryCapacity, setBatteryCapacity] = useState(60); // kWh
  const [evRange, setEvRange] = useState(400); // km per charge
  const [electricityRate, setElectricityRate] = useState(4.5); // THB/kWh (Home charging TOU)

  // ICE params
  const [fuelEconomy, setFuelEconomy] = useState(15); // km/L
  const [fuelPrice, setFuelPrice] = useState(38); // THB/L

  // Usage
  const [monthlyKm, setMonthlyKm] = useState(1500);

  // Calculations
  const evKwhPerKm = batteryCapacity / evRange;
  const evCostPerKm = evKwhPerKm * electricityRate;
  
  const iceCostPerKm = fuelPrice / fuelEconomy;

  const savingPerKm = iceCostPerKm - evCostPerKm;
  const monthlySavings = savingPerKm * monthlyKm;
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-8 h-8 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'TH' ? 'เปรียบเทียบค่าพลังงาน EV vs รถน้ำมัน' : 'EV vs ICE Energy Cost Calculator'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* EV Section */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <div className="flex items-center gap-2 mb-4 text-blue-800">
            <BatteryCharging className="w-6 h-6" />
            <h3 className="text-lg font-bold">{lang === 'TH' ? 'รถยนต์ไฟฟ้า (EV)' : 'Electric Vehicle (EV)'}</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-blue-800 mb-1">{lang === 'TH' ? 'ความจุแบตเตอรี่ (kWh)' : 'Battery Capacity (kWh)'}</label>
              <input type="number" value={batteryCapacity} onChange={(e) => setBatteryCapacity(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-blue-800 mb-1">{lang === 'TH' ? 'ระยะทางที่วิ่งได้จริงต่อชาร์จ (กม.)' : 'Real-world Range (km)'}</label>
              <input type="number" value={evRange} onChange={(e) => setEvRange(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-blue-800 mb-1">{lang === 'TH' ? 'ค่าไฟเฉลี่ย (บาท/หน่วย)' : 'Electricity Rate (THB/kWh)'}</label>
              <input type="number" step="0.1" value={electricityRate} onChange={(e) => setElectricityRate(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
              <p className="text-xs mt-1 text-blue-600">{lang === 'TH' ? '*มิเตอร์ TOU ชาร์จกลางคืนประมาณ 2.6 - 4.5 บาท' : '*TOU off-peak is around 2.6 - 4.5 THB'}</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-blue-200">
            <p className="text-sm text-blue-800">{lang === 'TH' ? 'ค่าไฟต่อกิโลเมตร' : 'Cost per km'}</p>
            <p className="text-3xl font-bold text-blue-600">฿{evCostPerKm.toFixed(2)}</p>
          </div>
        </div>

        {/* ICE Section */}
        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
          <div className="flex items-center gap-2 mb-4 text-stone-800">
            <Fuel className="w-6 h-6" />
            <h3 className="text-lg font-bold">{lang === 'TH' ? 'รถยนต์น้ำมัน (ICE)' : 'Internal Combustion Engine (ICE)'}</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-stone-700 mb-1">{lang === 'TH' ? 'อัตราสิ้นเปลืองน้ำมัน (กม./ลิตร)' : 'Fuel Economy (km/L)'}</label>
              <input type="number" step="0.1" value={fuelEconomy} onChange={(e) => setFuelEconomy(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-stone-700 mb-1">{lang === 'TH' ? 'ราคาน้ำมัน (บาท/ลิตร)' : 'Fuel Price (THB/L)'}</label>
              <input type="number" step="0.1" value={fuelPrice} onChange={(e) => setFuelPrice(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-200">
            <p className="text-sm text-stone-700">{lang === 'TH' ? 'ค่าน้ำมันต่อกิโลเมตร' : 'Cost per km'}</p>
            <p className="text-3xl font-bold text-stone-600">฿{iceCostPerKm.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 mb-8">
        <h3 className="text-xl font-bold text-emerald-800 mb-4 text-center">
          {lang === 'TH' ? 'ส่วนต่างความประหยัด (Savings)' : 'Estimated Savings'}
        </h3>
        
        <div className="max-w-md mx-auto mb-6">
          <label className="block text-sm font-medium text-emerald-800 mb-2 text-center">
            {lang === 'TH' ? 'ระยะทางที่คุณขับรถต่อเดือน (กิโลเมตร)' : 'Distance driven per month (km)'}
          </label>
          <input 
            type="number" 
            value={monthlyKm} 
            onChange={(e) => setMonthlyKm(Number(e.target.value))} 
            className="w-full px-4 py-3 text-lg text-center border-2 border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{lang === 'TH' ? 'ประหยัดต่อกิโลเมตร' : 'Save per km'}</p>
            <p className="text-xl font-bold text-emerald-600">฿{savingPerKm.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-emerald-400">
            <p className="text-sm text-gray-500 mb-1">{lang === 'TH' ? 'ประหยัดต่อเดือน' : 'Save per Month'}</p>
            <p className="text-2xl font-bold text-emerald-600">฿{Math.round(monthlySavings).toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{lang === 'TH' ? 'ประหยัดต่อปี' : 'Save per Year'}</p>
            <p className="text-xl font-bold text-emerald-600">฿{Math.round(yearlySavings).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          รถยนต์ไฟฟ้า (EV) ประหยัดกว่ารถน้ำมันจริงหรือ?
        </h2>
        <p>
          หนึ่งในเหตุผลหลักที่คนตัดสินใจเปลี่ยนมาใช้รถยนต์ไฟฟ้า (EV) คือ <strong>"ค่าใช้จ่ายด้านพลังงาน"</strong> ที่มีราคาถูกกว่าน้ำมันเชื้อเพลิงอย่างเห็นได้ชัด 
          แต่ตัวเลขความประหยัดที่แท้จริงนั้น ขึ้นอยู่กับพฤติกรรมการขับขี่และการชาร์จไฟของแต่ละบุคคล
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">วิธีคิดค่าไฟของรถ EV อย่างง่าย</h3>
        <p>
          การคำนวณอัตราสิ้นเปลืองของรถ EV มักจะดูที่ "กิโลวัตต์ชั่วโมงต่อกิโลเมตร" (kWh/km) หรือบางค่ายใช้ "กิโลเมตรต่อกิโลวัตต์ชั่วโมง" (km/kWh) 
          ตัวอย่างเช่น รถ EV แบตเตอรี่ 60 kWh วิ่งได้จริง 400 กิโลเมตร เท่ากับใช้ไฟ 0.15 kWh ต่อกิโลเมตร 
          หากคุณชาร์จไฟที่บ้านช่วงกลางคืน (TOU Off-peak) ค่าไฟประมาณหน่วยละ 3 บาท ต้นทุนการวิ่งของคุณจะอยู่ที่เพียง <strong>0.45 บาทต่อกิโลเมตร</strong> เท่านั้น
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ปัจจัยที่ทำให้ต้นทุน EV แพงขึ้น</h3>
        <p>
          แม้ชาร์จที่บ้านจะถูกมาก แต่หากคุณต้องเดินทางไกลและชาร์จไฟตามสถานีชาร์จสาธารณะ (DC Fast Charge) 
          ค่าไฟอาจกระโดดไปถึง 7.5 - 9 บาทต่อหน่วย ซึ่งจะทำให้ต้นทุนขยับขึ้นไปเป็น <strong>1.1 - 1.5 บาทต่อกิโลเมตร</strong> 
          (ใกล้เคียงกับรถยนต์ไฮบริดที่ประหยัดน้ำมันมากๆ)
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">คำแนะนำสำหรับผู้ที่กำลังลังเล</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ระยะทางคือจุดคุ้มทุน:</strong> ยิ่งคุณใช้รถเยอะ (เช่น ขับวันละ 50-100 กม. ขึ้นไป) คุณยิ่งคืนทุนส่วนต่างราคารถได้เร็วขึ้น</li>
          <li><strong>ความพร้อมเรื่องการชาร์จ:</strong> รถ EV จะตอบโจทย์สูงสุดเมื่อคุณสามารถติด Wall Charger ที่บ้านและชาร์จทิ้งไว้ตอนกลางคืนได้</li>
          <li><strong>ค่าเสื่อมราคาและประกัน:</strong> อย่าลืมนำค่าเบี้ยประกันชั้น 1 ของรถ EV ที่มักจะแพงกว่ารถน้ำมันประมาณ 20-30% มาหักลบกับค่าน้ำมันที่ประหยัดได้ เพื่อดูจุดคุ้มทุนโดยรวม (TCO)</li>
        </ul>
      </article>
    </div>
  );
}

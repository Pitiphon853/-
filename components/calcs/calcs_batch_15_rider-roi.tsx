import React, { useState } from 'react';
import { Bike, DollarSign, Clock, AlertTriangle } from 'lucide-react';

export default function RiderRoiCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  // Investment
  const [motorcycleCost, setMotorcycleCost] = useState(50000);
  const [gearCost, setGearCost] = useState(3000); // Box, Jacket, Phone holder etc.
  
  // Income
  const [tripsPerDay, setTripsPerDay] = useState(25);
  const [avgIncomePerTrip, setAvgIncomePerTrip] = useState(45);
  const [daysWorkedPerMonth, setDaysWorkedPerMonth] = useState(26);

  // Expenses
  const [fuelPerDay, setFuelPerDay] = useState(100);
  const [foodPerDay, setFoodPerDay] = useState(150);
  const [maintenanceMonthly, setMaintenanceMonthly] = useState(1000);
  const [phoneInternetMonthly, setPhoneInternetMonthly] = useState(500);

  // Calculations
  const totalInvestment = motorcycleCost + gearCost;
  
  const dailyGrossIncome = tripsPerDay * avgIncomePerTrip;
  const monthlyGrossIncome = dailyGrossIncome * daysWorkedPerMonth;

  const dailyExpenses = fuelPerDay + foodPerDay;
  const monthlyExpenses = (dailyExpenses * daysWorkedPerMonth) + maintenanceMonthly + phoneInternetMonthly;

  const monthlyNetIncome = monthlyGrossIncome - monthlyExpenses;
  
  // Payback period in months
  const paybackMonths = monthlyNetIncome > 0 ? totalInvestment / monthlyNetIncome : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Bike className="w-8 h-8 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'TH' ? 'คำนวณรายได้และจุดคุ้มทุน ไรเดอร์ส่งอาหาร' : 'Delivery Rider ROI & Income Calculator'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          {/* Investment */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">{lang === 'TH' ? '1. เงินลงทุนเริ่มต้น' : '1. Initial Investment'}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'ราคารถมอเตอร์ไซค์ (บาท)' : 'Motorcycle Cost'}</label>
                <input type="number" value={motorcycleCost} onChange={(e) => setMotorcycleCost(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'ค่าอุปกรณ์ (กล่อง, เสื้อ, ขาจับมือถือ)' : 'Gear Cost (Box, Jacket, etc.)'}</label>
                <input type="number" value={gearCost} onChange={(e) => setGearCost(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
            </div>
          </div>

          {/* Work Output */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">{lang === 'TH' ? '2. เป้าหมายรายได้' : '2. Income Target'}</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'จำนวนรอบ/วัน' : 'Trips/Day'}</label>
                  <input type="number" value={tripsPerDay} onChange={(e) => setTripsPerDay(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'รายได้เฉลี่ย/รอบ' : 'Avg Income/Trip'}</label>
                  <input type="number" value={avgIncomePerTrip} onChange={(e) => setAvgIncomePerTrip(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'จำนวนวันที่วิ่งงาน/เดือน' : 'Working Days/Month'}</label>
                <input type="number" value={daysWorkedPerMonth} max="31" onChange={(e) => setDaysWorkedPerMonth(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">{lang === 'TH' ? '3. ค่าใช้จ่าย' : '3. Expenses'}</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'ค่าน้ำมัน/วัน' : 'Fuel/Day'}</label>
                <input type="number" value={fuelPerDay} onChange={(e) => setFuelPerDay(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'ค่ากิน/วัน' : 'Food/Day'}</label>
                <input type="number" value={foodPerDay} onChange={(e) => setFoodPerDay(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'ค่าบำรุงรถ/เดือน' : 'Maint./Month'}</label>
                <input type="number" value={maintenanceMonthly} onChange={(e) => setMaintenanceMonthly(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'ค่าเน็ตมือถือ/เดือน' : 'Internet/Month'}</label>
                <input type="number" value={phoneInternetMonthly} onChange={(e) => setPhoneInternetMonthly(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-green-50 rounded-2xl p-6 border border-green-200 sticky top-6">
            <h3 className="text-xl font-bold text-green-800 mb-6 text-center">
              {lang === 'TH' ? 'ผลลัพธ์การทำงาน' : 'Performance Results'}
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                <span className="text-gray-600">{lang === 'TH' ? 'รายรับรวม/เดือน' : 'Gross Income (Mo)'}</span>
                <span className="font-bold text-gray-800">฿{monthlyGrossIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                <span className="text-gray-600">{lang === 'TH' ? 'ต้นทุนรวม/เดือน' : 'Total Expenses (Mo)'}</span>
                <span className="font-bold text-rose-500">-฿{monthlyExpenses.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-md text-center border-2 border-green-400 mb-6">
              <p className="text-sm font-medium text-gray-500 mb-1">
                {lang === 'TH' ? 'กำไรสุทธิ (เงินเหลือเก็บ)/เดือน' : 'Net Profit per Month'}
              </p>
              <p className={`text-4xl font-bold ${monthlyNetIncome > 0 ? 'text-green-600' : 'text-rose-600'}`}>
                ฿{monthlyNetIncome.toLocaleString()}
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-800">
                  {lang === 'TH' ? 'ระยะเวลาคืนทุน (ROI)' : 'Payback Period'}
                </p>
                <p className="text-xs text-indigo-600 mt-1">
                  {lang === 'TH' ? `จากทุนเริ่มต้น ฿${totalInvestment.toLocaleString()}` : `For ฿${totalInvestment.toLocaleString()} investment`}
                </p>
              </div>
              <div className="text-right">
                {monthlyNetIncome > 0 ? (
                  <p className="text-2xl font-bold text-indigo-700">
                    {paybackMonths.toFixed(1)} {lang === 'TH' ? 'เดือน' : 'Months'}
                  </p>
                ) : (
                  <p className="text-rose-600 font-bold">{lang === 'TH' ? 'ขาดทุน' : 'Loss'}</p>
                )}
              </div>
            </div>

            {monthlyNetIncome < 15000 && monthlyNetIncome > 0 && (
              <div className="mt-4 flex gap-2 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p>{lang === 'TH' ? 'รายได้สุทธิต่ำกว่า 15,000 บาท/เดือน อาจไม่เพียงพอต่อการดำรงชีพในบางพื้นที่' : 'Net income is below 15,000 THB/month. Consider adjusting trips or expenses.'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          เปิดสถิติอาชีพไรเดอร์: วิ่งงานอย่างไรให้คุ้มค่าเหนื่อย?
        </h2>
        <p>
          อาชีพ "ไรเดอร์ส่งอาหาร" (Food Delivery Rider) เป็นหนึ่งในอาชีพอิสระที่ได้รับความนิยมสูงมาก 
          เนื่องจากสมัครง่าย ไม่จำกัดวุฒิ และมีอิสระในการเลือกเวลาทำงาน แต่เหรียญย่อมมีสองด้านเสมอ 
          รายได้ที่เห็นว่าเข้ากระเป๋าทุกวัน แท้จริงแล้วยังมี <strong>"ต้นทุนแฝง"</strong> ที่หลายคนมักลืมนำมาหักลบ
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">เข้าใจรายได้และต้นทุนที่แท้จริง</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>รายได้ (Gross Income):</strong> มาจากค่ารอบพื้นฐาน โบนัสตามจำนวนรอบ (Incentive) และทิปจากลูกค้า</li>
          <li><strong>ต้นทุนคงที่ (Fixed Costs):</strong> ค่าผ่อนมอเตอร์ไซค์ ค่าแพ็กเกจอินเทอร์เน็ตมือถือที่ต้องใช้งานตลอดเวลา และค่าเปลี่ยนถ่ายน้ำมันเครื่อง/ยาง ตามระยะทาง</li>
          <li><strong>ต้นทุนผันแปร (Variable Costs):</strong> ค่าน้ำมันเชื้อเพลิงที่ผันผวนตามราคาน้ำมันโลก และค่ากินอยู่ระหว่างวัน</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">ระยะเวลาคืนทุน (Payback Period)</h3>
        <p>
          หากคุณต้องซื้อรถมอเตอร์ไซค์คันใหม่เพื่อมาขับไรเดอร์โดยเฉพาะ การคำนวณหาระยะเวลาคืนทุนเป็นสิ่งสำคัญมาก 
          เช่น หากรถราคา 50,000 บาท และคุณเหลือกำไรสุทธิเดือนละ 10,000 บาท แปลว่าคุณต้องขับรถตากแดดตากฝนถึง 5 เดือน 
          กว่าจะได้ทุนค่ารถคืน หลังจากเดือนที่ 6 เป็นต้นไปถึงจะเรียกว่าเป็นกำไรจริงๆ
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">เคล็ดลับเพิ่มกำไรสุทธิ (Maximize Net Profit)</h3>
        <p>
          การจะเพิ่มเงินเหลือเก็บในแต่ละเดือน มีเพียง 2 วิธี คือ "เพิ่มรายได้" หรือ "ลดต้นทุน"
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ลดค่าน้ำมัน:</strong> การขับรถด้วยความเร็วคงที่ ไม่เบิ้ลเครื่อง หรือพิจารณาเปลี่ยนไปใช้ <strong>รถมอเตอร์ไซค์ไฟฟ้า (EV)</strong> อาจช่วยลดต้นทุนค่าน้ำมันได้ถึง 50-70%</li>
          <li><strong>ทำงานช่วง Peak Time:</strong> การวิ่งงานในช่วงเวลาพักเที่ยง (11.00-13.00 น.) และช่วงเย็น (17.00-20.00 น.) มักจะได้ค่ารอบที่สูงกว่าปกติ หรือมีโบนัสพิเศษ</li>
          <li><strong>ห่อข้าวไปกินเอง:</strong> ค่าใช้จ่ายที่ไรเดอร์หมดไปเยอะที่สุดรองจากน้ำมันคือ "ค่ากิน" การเตรียมน้ำดื่มและข้าวกล่องไปเอง ช่วยประหยัดเงินได้เดือนละ 1,500 - 3,000 บาท</li>
          <li><strong>รักษาสุขภาพ:</strong> อาชีพนี้ร่างกายคือต้นทุนหลัก หากป่วยจนทำงานไม่ได้ รายได้จะกลายเป็นศูนย์ทันที ดังนั้นควรพักผ่อนให้เพียงพอและทำประกันอุบัติเหตุเผื่อไว้ด้วย</li>
        </ul>
      </article>
    </div>
  );
}

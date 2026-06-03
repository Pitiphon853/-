import React, { useState } from 'react';
import { Truck, Calculator, Map, Fuel } from 'lucide-react';

export default function TruckCostCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  // Inputs
  const [distanceKm, setDistanceKm] = useState(500); // One way or round trip
  const [tripsPerMonth, setTripsPerMonth] = useState(15);
  
  // Variable Costs
  const [fuelConsumption, setFuelConsumption] = useState(3.5); // km/L (Trucks use 3-5 km/L)
  const [fuelPrice, setFuelPrice] = useState(32); // THB/L
  const [tollFee, setTollFee] = useState(500); // per trip
  const [driverWageTrip, setDriverWageTrip] = useState(1500); // per trip

  // Fixed Costs (Monthly)
  const [truckInstallment, setTruckInstallment] = useState(35000);
  const [insuranceTaxMonthly, setInsuranceTaxMonthly] = useState(4000); // 48k/year
  const [maintenanceMonthly, setMaintenanceMonthly] = useState(10000);
  
  // Freight Rate
  const [freightRatePerTrip, setFreightRatePerTrip] = useState(15000);

  // Calculations per trip
  const fuelCostPerTrip = (distanceKm / fuelConsumption) * fuelPrice;
  const variableCostPerTrip = fuelCostPerTrip + tollFee + driverWageTrip;
  
  // Total Monthly Calculations
  const totalMonthlyVariableCost = variableCostPerTrip * tripsPerMonth;
  const totalMonthlyFixedCost = truckInstallment + insuranceTaxMonthly + maintenanceMonthly;
  const totalMonthlyCost = totalMonthlyVariableCost + totalMonthlyFixedCost;

  const totalMonthlyRevenue = freightRatePerTrip * tripsPerMonth;
  const totalMonthlyProfit = totalMonthlyRevenue - totalMonthlyCost;

  const costPerKm = totalMonthlyCost / (distanceKm * tripsPerMonth);
  const costPerTrip = totalMonthlyCost / tripsPerMonth;
  const profitMargin = totalMonthlyRevenue > 0 ? (totalMonthlyProfit / totalMonthlyRevenue) * 100 : 0;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Truck className="w-8 h-8 text-slate-700" />
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'TH' ? 'คำนวณต้นทุนธุรกิจรถบรรทุกรับจ้าง' : 'Truck Operating Cost Calculator'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Route Data */}
        <div className="bg-slate-50 p-5 rounded-xl border">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <Map className="w-5 h-5" /> {lang === 'TH' ? '1. ข้อมูลเส้นทางและรายได้' : '1. Route & Revenue'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">{lang === 'TH' ? 'ระยะทาง/เที่ยว (กม.)' : 'Distance/Trip (km)'}</label>
              <input type="number" value={distanceKm} onChange={(e) => setDistanceKm(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">{lang === 'TH' ? 'จำนวนเที่ยว/เดือน' : 'Trips/Month'}</label>
              <input type="number" value={tripsPerMonth} onChange={(e) => setTripsPerMonth(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">{lang === 'TH' ? 'ค่าจ้างขนส่ง/เที่ยว (บาท)' : 'Freight Rate/Trip (THB)'}</label>
              <input type="number" value={freightRatePerTrip} onChange={(e) => setFreightRatePerTrip(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md font-semibold text-green-700" />
            </div>
          </div>
        </div>

        {/* Variable Costs */}
        <div className="bg-slate-50 p-5 rounded-xl border">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <Fuel className="w-5 h-5" /> {lang === 'TH' ? '2. ต้นทุนผันแปร (ต่อเที่ยว)' : '2. Variable Costs (Per Trip)'}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-600 mb-1">{lang === 'TH' ? 'อัตราสิ้นเปลือง (กม./ลิตร)' : 'Fuel Economy (km/L)'}</label>
                <input type="number" step="0.1" value={fuelConsumption} onChange={(e) => setFuelConsumption(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">{lang === 'TH' ? 'ราคาน้ำมัน (บาท/ลิตร)' : 'Fuel Price (THB/L)'}</label>
                <input type="number" step="0.1" value={fuelPrice} onChange={(e) => setFuelPrice(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">{lang === 'TH' ? 'ค่าทางด่วน/ชั่งน้ำหนัก (บาท)' : 'Tolls/Weighing (THB)'}</label>
              <input type="number" value={tollFee} onChange={(e) => setTollFee(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">{lang === 'TH' ? 'ค่าจ้างคนขับ+เด็กท้ายรถ (บาท)' : 'Driver Wages (THB)'}</label>
              <input type="number" value={driverWageTrip} onChange={(e) => setDriverWageTrip(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>

        {/* Fixed Costs */}
        <div className="bg-slate-50 p-5 rounded-xl border">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5" /> {lang === 'TH' ? '3. ต้นทุนคงที่ (ต่อเดือน)' : '3. Fixed Costs (Monthly)'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">{lang === 'TH' ? 'ค่างวดรถบรรทุก (บาท)' : 'Truck Installment (THB)'}</label>
              <input type="number" value={truckInstallment} onChange={(e) => setTruckInstallment(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">{lang === 'TH' ? 'เฉลี่ยประกัน+ภาษี+พ.ร.บ. (บาท)' : 'Insurance & Tax (Avg/Mo)'}</label>
              <input type="number" value={insuranceTaxMonthly} onChange={(e) => setInsuranceTaxMonthly(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">{lang === 'TH' ? 'กันเงินค่าซ่อมบำรุง/ยาง (บาท)' : 'Maint. & Tires Reserve'}</label>
              <input type="number" value={maintenanceMonthly} onChange={(e) => setMaintenanceMonthly(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Results Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-sm text-slate-500 mb-1">{lang === 'TH' ? 'ต้นทุนวิ่งรถเฉลี่ย (ต่อกม.)' : 'Average Cost per km'}</p>
          <p className="text-2xl font-bold text-slate-800">฿{costPerKm.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-sm text-slate-500 mb-1">{lang === 'TH' ? 'ต้นทุนรวมทั้งหมด (ต่อเที่ยว)' : 'Total Cost per Trip'}</p>
          <p className="text-2xl font-bold text-slate-800">฿{Math.round(costPerTrip).toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-sm text-slate-500 mb-1">{lang === 'TH' ? 'รายได้รวม (ต่อเดือน)' : 'Total Monthly Revenue'}</p>
          <p className="text-2xl font-bold text-blue-600">฿{totalMonthlyRevenue.toLocaleString()}</p>
        </div>
        <div className={`p-4 rounded-xl border shadow-sm ${totalMonthlyProfit > 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <p className="text-sm font-medium mb-1">{lang === 'TH' ? 'กำไรสุทธิ (ต่อเดือน)' : 'Net Profit (Monthly)'}</p>
          <p className={`text-2xl font-bold ${totalMonthlyProfit > 0 ? 'text-green-700' : 'text-red-700'}`}>
            ฿{Math.round(totalMonthlyProfit).toLocaleString()}
          </p>
          <p className="text-xs mt-1">Margin: {profitMargin.toFixed(1)}%</p>
        </div>
      </div>

      <article className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          การบริหารต้นทุนธุรกิจรถบรรทุกรับจ้าง
        </h2>
        <p>
          ธุรกิจขนส่งด้วยรถบรรทุกเป็นฟันเฟืองสำคัญของระบบเศรษฐกิจ แต่ผู้ประกอบการรายย่อยมักประสบปัญหา <strong>"วิ่งงานแทบตาย แต่ทำไมไม่เหลือเงิน"</strong> 
          สาเหตุหลักมาจากการประเมินต้นทุนที่ผิดพลาด โดยมักจะคิดแค่ค่าน้ำมันและค่าแรงคนขับ แต่ลืมคำนวณต้นทุนแฝงอื่นๆ เข้าไปในค่าขนส่งด้วย
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">โครงสร้างต้นทุนที่เถ้าแก่ต้องรู้</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ต้นทุนผันแปร (Variable Costs):</strong> เกิดขึ้นเมื่อรถวิ่งเท่านั้น เช่น ค่าน้ำมัน (ต้นทุนหลัก 30-40%) ค่าทางด่วน ค่าจ้างคนขับตามเที่ยว ค่าปะยาง</li>
          <li><strong>ต้นทุนคงที่ (Fixed Costs):</strong> วิ่งหรือไม่วิ่งก็ต้องจ่าย เช่น ค่างวดรถ ประกันภัย พ.ร.บ. ภาษีป้ายทะเบียน และเงินเดือนพนักงานประจำ</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">กับดักการตั้งราคา (Pricing Trap)</h3>
        <p>
          หลายคนตั้งราคาค่ารับจ้างขนส่งโดยอิงจาก "ราคาตลาด" หรือกดราคาเพื่อแย่งลูกค้า (Price War) 
          การรู้ <strong>"ต้นทุนต่อกิโลเมตร" (Cost per Km)</strong> ของรถตัวเอง จะเป็นเกราะป้องกันไม่ให้คุณรับงานที่วิ่งแล้วขาดทุน 
          หากราคาที่ลูกค้าเสนอมาต่ำกว่าต้นทุนต่อกิโลเมตรของคุณ (เมื่อรวมค่าเสื่อมและค่างวดแล้ว) การจอดรถทิ้งไว้อาจเจ็บตัวน้อยกว่า
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">การบริหารจัดการน้ำมัน</h3>
        <p>
          ค่าน้ำมันคือต้นทุนที่ใหญ่ที่สุด การปรับเปลี่ยนพฤติกรรมเพียงเล็กน้อยส่งผลต่อกำไรมหาศาล:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ควบคุมความเร็ว:</strong> การขับรถบรรทุกที่ความเร็ว 80 กม./ชม. ประหยัดน้ำมันกว่าการขับ 100 กม./ชม. ถึง 15-20%</li>
          <li><strong>ลดการติดเครื่องจอดทิ้ง (Idling):</strong> การจอดรถติดเครื่องเปิดแอร์นอนกินน้ำมันประมาณ 2-3 ลิตรต่อชั่วโมง</li>
          <li><strong>บำรุงรักษาตามระยะ:</strong> ลมยางที่อ่อนเกินไป กรองอากาศที่ตัน ทำให้เครื่องยนต์ทำงานหนักและกินน้ำมันมากขึ้น</li>
        </ul>
      </article>
    </div>
  );
}

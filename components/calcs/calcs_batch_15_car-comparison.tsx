import React, { useState } from 'react';
import { ArrowRightLeft, Car } from 'lucide-react';

export default function CarComparisonCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  const [carA, setCarA] = useState({
    name: 'รถยนต์ A',
    price: 800000,
    downPayment: 200000,
    interestRate: 2.5,
    loanYears: 5,
    insuranceYearly: 20000,
    maintenanceYearly: 10000,
    fuelMonthly: 4000
  });

  const [carB, setCarB] = useState({
    name: 'รถยนต์ B',
    price: 1200000,
    downPayment: 300000,
    interestRate: 2.0,
    loanYears: 5,
    insuranceYearly: 25000,
    maintenanceYearly: 15000,
    fuelMonthly: 3000 // Maybe a hybrid, so lower fuel
  });

  const calcMetrics = (car: typeof carA) => {
    const principal = car.price - car.downPayment;
    const totalInterest = principal * (car.interestRate / 100) * car.loanYears;
    const monthlyPayment = (principal + totalInterest) / (car.loanYears * 12);
    
    const yearlyRunningCost = car.insuranceYearly + car.maintenanceYearly + (car.fuelMonthly * 12);
    const yearlyTotalCost = (monthlyPayment * 12) + yearlyRunningCost;

    return {
      monthlyPayment,
      yearlyRunningCost,
      yearlyTotalCost,
      totalInterest
    };
  };

  const resA = calcMetrics(carA);
  const resB = calcMetrics(carB);

  const handleCarChange = (setCar: any, field: string, value: string | number) => {
    setCar((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <ArrowRightLeft className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'TH' ? 'เปรียบเทียบค่าใช้จ่ายรถยนต์' : 'Car Comparison'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Car A */}
        <div className="p-6 bg-gray-50 rounded-xl border">
          <input
            type="text"
            value={carA.name}
            onChange={(e) => handleCarChange(setCarA, 'name', e.target.value)}
            className="w-full text-xl font-bold mb-4 bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none"
          />
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'ราคารถ (บาท)' : 'Price'}</label>
              <input type="number" value={carA.price} onChange={(e) => handleCarChange(setCarA, 'price', Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'เงินดาวน์ (บาท)' : 'Down Payment'}</label>
              <input type="number" value={carA.downPayment} onChange={(e) => handleCarChange(setCarA, 'downPayment', Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'ดอกเบี้ย (%)' : 'Interest (%)'}</label>
                <input type="number" step="0.1" value={carA.interestRate} onChange={(e) => handleCarChange(setCarA, 'interestRate', Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'ระยะเวลาผ่อน (ปี)' : 'Loan (Years)'}</label>
                <input type="number" value={carA.loanYears} onChange={(e) => handleCarChange(setCarA, 'loanYears', Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'ประกันภัย/ปี (บาท)' : 'Insurance/Yr'}</label>
              <input type="number" value={carA.insuranceYearly} onChange={(e) => handleCarChange(setCarA, 'insuranceYearly', Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'บำรุงรักษา/ปี (บาท)' : 'Maintenance/Yr'}</label>
              <input type="number" value={carA.maintenanceYearly} onChange={(e) => handleCarChange(setCarA, 'maintenanceYearly', Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'ค่าน้ำมัน/เดือน (บาท)' : 'Fuel/Month'}</label>
              <input type="number" value={carA.fuelMonthly} onChange={(e) => handleCarChange(setCarA, 'fuelMonthly', Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>

        {/* Car B */}
        <div className="p-6 bg-gray-50 rounded-xl border">
          <input
            type="text"
            value={carB.name}
            onChange={(e) => handleCarChange(setCarB, 'name', e.target.value)}
            className="w-full text-xl font-bold mb-4 bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none"
          />
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'ราคารถ (บาท)' : 'Price'}</label>
              <input type="number" value={carB.price} onChange={(e) => handleCarChange(setCarB, 'price', Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'เงินดาวน์ (บาท)' : 'Down Payment'}</label>
              <input type="number" value={carB.downPayment} onChange={(e) => handleCarChange(setCarB, 'downPayment', Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'ดอกเบี้ย (%)' : 'Interest (%)'}</label>
                <input type="number" step="0.1" value={carB.interestRate} onChange={(e) => handleCarChange(setCarB, 'interestRate', Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'ระยะเวลาผ่อน (ปี)' : 'Loan (Years)'}</label>
                <input type="number" value={carB.loanYears} onChange={(e) => handleCarChange(setCarB, 'loanYears', Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'ประกันภัย/ปี (บาท)' : 'Insurance/Yr'}</label>
              <input type="number" value={carB.insuranceYearly} onChange={(e) => handleCarChange(setCarB, 'insuranceYearly', Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'บำรุงรักษา/ปี (บาท)' : 'Maintenance/Yr'}</label>
              <input type="number" value={carB.maintenanceYearly} onChange={(e) => handleCarChange(setCarB, 'maintenanceYearly', Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{lang === 'TH' ? 'ค่าน้ำมัน/เดือน (บาท)' : 'Fuel/Month'}</label>
              <input type="number" value={carB.fuelMonthly} onChange={(e) => handleCarChange(setCarB, 'fuelMonthly', Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
        <h3 className="text-xl font-bold text-indigo-900 mb-6 text-center">
          {lang === 'TH' ? 'ผลการเปรียบเทียบ' : 'Comparison Results'}
        </h3>
        
        <div className="grid grid-cols-3 gap-4 text-center font-medium mb-4">
          <div className="text-gray-500">{lang === 'TH' ? 'รายการ' : 'Item'}</div>
          <div className="text-indigo-800">{carA.name}</div>
          <div className="text-indigo-800">{carB.name}</div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center bg-white p-3 rounded-lg shadow-sm items-center">
            <div className="text-sm text-gray-600">{lang === 'TH' ? 'ค่างวดรายเดือน' : 'Monthly Payment'}</div>
            <div className={`font-bold ${resA.monthlyPayment < resB.monthlyPayment ? 'text-green-600' : 'text-gray-800'}`}>
              ฿{resA.monthlyPayment.toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
            <div className={`font-bold ${resB.monthlyPayment < resA.monthlyPayment ? 'text-green-600' : 'text-gray-800'}`}>
              ฿{resB.monthlyPayment.toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center bg-white p-3 rounded-lg shadow-sm items-center">
            <div className="text-sm text-gray-600">{lang === 'TH' ? 'ค่าใช้จ่ายซ่อม/เติมน้ำมัน (ต่อปี)' : 'Running Cost (Yr)'}</div>
            <div className={`font-bold ${resA.yearlyRunningCost < resB.yearlyRunningCost ? 'text-green-600' : 'text-gray-800'}`}>
              ฿{resA.yearlyRunningCost.toLocaleString()}
            </div>
            <div className={`font-bold ${resB.yearlyRunningCost < resA.yearlyRunningCost ? 'text-green-600' : 'text-gray-800'}`}>
              ฿{resB.yearlyRunningCost.toLocaleString()}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center bg-white p-3 rounded-lg shadow-sm items-center">
            <div className="text-sm text-gray-600">{lang === 'TH' ? 'ดอกเบี้ยรวมทั้งหมด' : 'Total Interest'}</div>
            <div className={`font-bold ${resA.totalInterest < resB.totalInterest ? 'text-green-600' : 'text-gray-800'}`}>
              ฿{resA.totalInterest.toLocaleString()}
            </div>
            <div className={`font-bold ${resB.totalInterest < resA.totalInterest ? 'text-green-600' : 'text-gray-800'}`}>
              ฿{resB.totalInterest.toLocaleString()}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center bg-indigo-100 p-4 rounded-lg shadow-sm items-center border border-indigo-200">
            <div className="font-bold text-indigo-900">{lang === 'TH' ? 'รวมค่าใช้จ่ายต่อปี (ผ่อน+ใช้งาน)' : 'Total Yearly Cost'}</div>
            <div className={`text-xl font-bold ${resA.yearlyTotalCost < resB.yearlyTotalCost ? 'text-green-700' : 'text-indigo-900'}`}>
              ฿{resA.yearlyTotalCost.toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
            <div className={`text-xl font-bold ${resB.yearlyTotalCost < resA.yearlyTotalCost ? 'text-green-700' : 'text-indigo-900'}`}>
              ฿{resB.yearlyTotalCost.toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-indigo-700">
          * {lang === 'TH' ? 'ตัวเลขสีเขียวคือฝั่งที่ประหยัดกว่า' : 'Green numbers indicate the more economical choice.'}
        </div>
      </div>

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          เปรียบเทียบรถยนต์ 2 คัน: วิธีตัดสินใจให้คุ้มค่าที่สุด
        </h2>
        <p>
          การเลือกซื้อรถยนต์สักคันเป็นเรื่องที่ต้องคิดอย่างรอบคอบ โดยเฉพาะเมื่อเรามี "ตัวเลือกในใจ" อยู่ 2-3 รุ่น 
          หลายครั้งเรามักจะตัดสินใจจาก <strong>รูปลักษณ์</strong> และ <strong>ราคาตัวรถ</strong> เป็นหลัก 
          แต่ถ้าเจาะลึกลงไปถึงค่าใช้จ่ายระยะยาว รถที่ราคาถูกกว่าอาจมีค่าบำรุงรักษาและค่าน้ำมันที่แพงกว่าในภายหลังก็เป็นได้
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">เปรียบเทียบจากมุมมองค่าใช้จ่าย (Cost Analysis)</h3>
        <p>การใช้เครื่องมือเปรียบเทียบด้านบน ช่วยให้คุณมองเห็นภาพรวมได้ชัดเจนขึ้น โดยพิจารณาจาก 2 ส่วนหลักๆ:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Fixed Cost (ต้นทุนคงที่):</strong> ได้แก่ ค่าผ่อนรายเดือน ซึ่งคำนวณจากราคารถ หักเงินดาวน์ และบวกดอกเบี้ยตามระยะเวลาผ่อน ค่าประกันภัย และภาษีประจำปี</li>
          <li><strong>Variable Cost (ต้นทุนผันแปร):</strong> คือค่าใช้จ่ายที่เกิดขึ้นตามการใช้งาน เช่น ค่าน้ำมันเชื้อเพลิง ค่าทางด่วน ค่าที่จอดรถ รวมถึงค่าบำรุงรักษาตามระยะทาง</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">กรณีศึกษาที่พบบ่อย (Use Cases)</h3>
        <p>
          <strong>1. รถน้ำมัน (ICE) vs รถไฮบริด/ไฟฟ้า (EV):</strong> รถ EV มักจะมีราคาสูงกว่า แต่ค่าน้ำมัน/ค่าชาร์จไฟต่อเดือนถูกกว่ามาก 
          การเปรียบเทียบค่าใช้จ่ายรายปีจะช่วยตอบได้ว่า "ส่วนต่างของค่าน้ำมัน" สามารถชดเชย "ค่างวดที่แพงกว่า" ได้หรือไม่
        </p>
        <p>
          <strong>2. รถป้ายแดง vs รถมือสอง:</strong> รถมือสองราคาถูกกว่าแน่นอน แต่ดอกเบี้ยไฟแนนซ์สำหรับรถมือสองมักจะสูงกว่ารถใหม่ 
          รวมถึงอาจมีค่าซ่อมบำรุงที่มากกว่า การคำนวณเปรียบเทียบจะช่วยให้รู้ว่าซื้อแบบไหนคุ้มกว่ากันในภาพรวม
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">เคล็ดลับการตัดสินใจ</h3>
        <p>
          นอกเหนือจากเรื่องเงินแล้ว อย่าลืมพิจารณาความคุ้มค่าในด้านอื่นๆ เช่น ความปลอดภัย ความสะดวกสบาย ขนาดพื้นที่ใช้สอย 
          และที่สำคัญคือ <strong>บริการหลังการขาย (After-sales Service)</strong> เพราะรถยนต์เป็นสิ่งที่เราต้องใช้งานไปอีกหลายปี 
          การเลือกรถที่มีศูนย์บริการใกล้บ้านและอะไหล่หาง่าย จะช่วยลดปวดหัวในระยะยาวได้มาก
        </p>
      </article>
    </div>
  );
}

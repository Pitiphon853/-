import React, { useState } from 'react';
import { CarFront, DollarSign, Fuel, Wrench, Shield, TrendingDown } from 'lucide-react';

export default function CarTcoCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  const [purchasePrice, setPurchasePrice] = useState(800000);
  const [downPayment, setDownPayment] = useState(200000);
  const [loanTermYears, setLoanTermYears] = useState(5);
  const [interestRate, setInterestRate] = useState(3.0);
  
  const [insuranceYearly, setInsuranceYearly] = useState(20000);
  const [maintenanceYearly, setMaintenanceYearly] = useState(15000);
  const [taxYearly, setTaxYearly] = useState(2000);
  const [fuelMonthly, setFuelMonthly] = useState(4000);
  
  const [ownershipYears, setOwnershipYears] = useState(5);
  const [resaleValue, setResaleValue] = useState(400000);

  const calculateTCO = () => {
    // Loan Calculation (Flat Rate)
    const principal = purchasePrice - downPayment;
    const totalInterest = principal * (interestRate / 100) * loanTermYears;
    const totalLoanCost = principal + totalInterest;
    
    // Total running costs for ownership years
    const totalInsurance = insuranceYearly * ownershipYears;
    const totalMaintenance = maintenanceYearly * ownershipYears;
    const totalTax = taxYearly * ownershipYears;
    const totalFuel = fuelMonthly * 12 * ownershipYears;
    
    const totalRunningCosts = totalInsurance + totalMaintenance + totalTax + totalFuel;
    
    // Depreciation cost = Purchase Price - Resale Value
    const depreciationCost = purchasePrice - resaleValue;
    
    // TCO
    const totalCostOfOwnership = downPayment + totalLoanCost + totalRunningCosts - resaleValue;
    const tcoPerYear = totalCostOfOwnership / ownershipYears;
    const tcoPerMonth = tcoPerYear / 12;

    return {
      totalCostOfOwnership,
      tcoPerYear,
      tcoPerMonth,
      breakdown: {
        depreciationCost,
        loanInterest: totalInterest,
        totalRunningCosts,
        totalInsurance,
        totalMaintenance,
        totalTax,
        totalFuel
      }
    };
  };

  const results = calculateTCO();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <CarFront className="w-6 h-6 text-blue-600" />
            {lang === 'TH' ? 'ข้อมูลรถยนต์และค่าใช้จ่าย' : 'Car Data & Expenses'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'ราคารถ (บาท)' : 'Car Price (THB)'}
              </label>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'TH' ? 'เงินดาวน์ (บาท)' : 'Down Payment (THB)'}
                </label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'TH' ? 'ดอกเบี้ยรถใหม่ (%)' : 'Interest Rate (%)'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'TH' ? 'ระยะเวลาผ่อน (ปี)' : 'Loan Term (Years)'}
                </label>
                <input
                  type="number"
                  value={loanTermYears}
                  onChange={(e) => setLoanTermYears(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'TH' ? 'ค่าน้ำมัน/เดือน (บาท)' : 'Fuel/Month (THB)'}
                </label>
                <input
                  type="number"
                  value={fuelMonthly}
                  onChange={(e) => setFuelMonthly(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'TH' ? 'ประกัน/ปี' : 'Insurance/Yr'}
                </label>
                <input
                  type="number"
                  value={insuranceYearly}
                  onChange={(e) => setInsuranceYearly(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'TH' ? 'บำรุงรักษา/ปี' : 'Maint./Yr'}
                </label>
                <input
                  type="number"
                  value={maintenanceYearly}
                  onChange={(e) => setMaintenanceYearly(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'TH' ? 'ภาษี+พ.ร.บ./ปี' : 'Tax/Yr'}
                </label>
                <input
                  type="number"
                  value={taxYearly}
                  onChange={(e) => setTaxYearly(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'TH' ? 'ถือครองกี่ปี' : 'Ownership (Years)'}
                </label>
                <input
                  type="number"
                  value={ownershipYears}
                  onChange={(e) => setOwnershipYears(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'TH' ? 'ราคาขายต่อคาดการณ์' : 'Estimated Resale Value'}
                </label>
                <input
                  type="number"
                  value={resaleValue}
                  onChange={(e) => setResaleValue(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">
              {lang === 'TH' ? 'ผลการคำนวณ TCO' : 'TCO Results'}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-blue-600">{lang === 'TH' ? 'ต้นทุนรวมทั้งหมดตลอดการถือครอง' : 'Total Cost for Ownership Period'}</p>
                <p className="text-3xl font-bold text-blue-900">
                  ฿{results.totalCostOfOwnership.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-200">
                <div>
                  <p className="text-sm text-blue-600">{lang === 'TH' ? 'เฉลี่ยต่อปี' : 'Average Per Year'}</p>
                  <p className="text-xl font-bold text-blue-800">
                    ฿{results.tcoPerYear.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">{lang === 'TH' ? 'เฉลี่ยต่อเดือน' : 'Average Per Month'}</p>
                  <p className="text-xl font-bold text-blue-800">
                    ฿{results.tcoPerMonth.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">{lang === 'TH' ? 'ค่าเสื่อมราคา' : 'Depreciation'}</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                ฿{results.breakdown.depreciationCost.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">{lang === 'TH' ? 'ดอกเบี้ยจ่าย' : 'Total Interest'}</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                ฿{results.breakdown.loanInterest.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <Fuel className="w-4 h-4" />
                <span className="text-sm font-medium">{lang === 'TH' ? 'ค่าน้ำมันรวม' : 'Total Fuel'}</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                ฿{results.breakdown.totalFuel.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <Wrench className="w-4 h-4" />
                <span className="text-sm font-medium">{lang === 'TH' ? 'ค่าบำรุง+ประกัน' : 'Maint. & Ins.'}</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                ฿{(results.breakdown.totalInsurance + results.breakdown.totalMaintenance).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          TCO (Total Cost of Ownership) คืออะไร? และทำไมจึงสำคัญในการซื้อรถ
        </h2>
        <p>
          หลายคนเมื่อนึกถึงการซื้อรถยนต์ มักจะให้ความสำคัญกับ "ราคาซื้อ" (Purchase Price) และ "ยอดผ่อนต่อเดือน" เท่านั้น 
          แต่ในความเป็นจริง การเป็นเจ้าของรถหนึ่งคันมีค่าใช้จ่ายแอบแฝงอื่นๆ ตามมาอีกมากมาย ซึ่งเรียกรวมกันว่า 
          <strong>Total Cost of Ownership (TCO)</strong> หรือ ต้นทุนความเป็นเจ้าของทั้งหมด
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">องค์ประกอบหลักของ TCO</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ค่าเสื่อมราคา (Depreciation):</strong> นี่คือต้นทุนที่ใหญ่ที่สุดที่คนมักมองไม่เห็น เมื่อคุณซื้อรถราคา 1 ล้านบาท และขายได้ 5 แสนบาทในอีก 5 ปีข้างหน้า เท่ากับว่าคุณมีต้นทุนค่าเสื่อม 5 แสนบาท</li>
          <li><strong>ดอกเบี้ยสินเชื่อ (Loan Interest):</strong> หากคุณจัดไฟแนนซ์ ดอกเบี้ยที่จ่ายไปตลอดอายุสัญญาถือเป็นต้นทุนด้วยเช่นกัน (โดยเฉพาะดอกเบี้ยรถใหม่ที่เป็นแบบ Flat Rate)</li>
          <li><strong>ค่าน้ำมันหรือพลังงาน (Fuel/Energy):</strong> เป็นค่าใช้จ่ายรายเดือนที่ต้องจ่ายเป็นประจำ ขึ้นอยู่กับระยะทางที่คุณขับและการบริโภคพลังงานของตัวรถ</li>
          <li><strong>ค่าบำรุงรักษา (Maintenance):</strong> การเช็คระยะ เปลี่ยนถ่ายน้ำมันเครื่อง ยาง แบตเตอรี่ และอะไหล่สึกหรอต่างๆ</li>
          <li><strong>ค่าประกันภัยและภาษี (Insurance & Tax):</strong> ประกันภัยชั้น 1, ภาษีประจำปี และ พ.ร.บ.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">วิธีใช้งานเครื่องคำนวณ TCO</h3>
        <p>
          เครื่องมือนี้ช่วยให้คุณเห็นภาพรวมค่าใช้จ่าย "ที่แท้จริง" ตลอดระยะเวลาที่คุณตั้งใจจะใช้งานรถคันนี้
          เพียงกรอกข้อมูล ราคารถ เงินดาวน์ ดอกเบี้ย รวมถึงค่าใช้จ่ายรายเดือน/รายปี และราคาขายต่อที่คาดหวัง
          ระบบจะคำนวณออกมาเป็นต้นทุนเฉลี่ยต่อเดือน ทำให้คุณสามารถประเมินกำลังซื้อของตัวเองได้แม่นยำขึ้น ว่าเงินเดือนของคุณพอเพียงกับการครอบครองรถคันนี้จริงๆ หรือไม่ ไม่ใช่แค่พอจ่ายค่าผ่อนเท่านั้น
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ประโยชน์ของการประเมิน TCO</h3>
        <p>
          การรู้ TCO ช่วยให้คุณสามารถเปรียบเทียบระหว่างรถ 2 รุ่นได้อย่างชัดเจน เช่น รถรุ่น A ราคาถูกกว่าแต่ซดน้ำมันและราคาขายต่อตกมาก 
          เมื่อเทียบกับรถรุ่น B ที่แพงกว่าเล็กน้อยแต่ประหยัดน้ำมันและราคาขายต่อแข็งแรงกว่า ในระยะยาว รถรุ่น B อาจมี TCO ที่ต่ำกว่าและคุ้มค่ากว่าในการลงทุน
        </p>
      </article>
    </div>
  );
}

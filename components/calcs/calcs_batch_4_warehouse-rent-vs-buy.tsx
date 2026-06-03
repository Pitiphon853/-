import React, { useState } from 'react';
import { Warehouse, Home, Key, TrendingUp, TrendingDown, Info, Calculator } from 'lucide-react';

export default function WarehouseRentVsBuy({ lang }: any) {
  const [inputs, setInputs] = useState({
    area: 1000,
    timeHorizon: 10,       // years
    // Rent
    rentPerSqm: 150,       // THB/sqm/month
    rentIncrease: 3,       // % per year
    // Buy
    landCost: 5000000,
    constructionCost: 10000000,
    maintenancePerYear: 100000,
    propertyAppreciation: 3 // % per year (Land+Building value growth)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: Number(e.target.value) }));
  };

  // 1. Calculate Rent Option Cash Flows (Accumulated over time)
  let totalRentCost = 0;
  let currentMonthlyRent = inputs.rentPerSqm * inputs.area;
  
  for (let year = 1; year <= inputs.timeHorizon; year++) {
    totalRentCost += (currentMonthlyRent * 12);
    // Increase rent for next year
    currentMonthlyRent = currentMonthlyRent * (1 + inputs.rentIncrease / 100);
  }

  // 2. Calculate Buy Option Cash Flows
  const initialInvestment = inputs.landCost + inputs.constructionCost;
  const totalMaintenanceCost = inputs.maintenancePerYear * inputs.timeHorizon;
  const totalBuyCashOutflow = initialInvestment + totalMaintenanceCost;

  // Expected Value of Property after N years
  // FV = PV * (1 + r)^n
  const propertyFutureValue = initialInvestment * Math.pow(1 + inputs.propertyAppreciation / 100, inputs.timeHorizon);

  // Net Cost of Buying = Total Outflow - Value of Asset at the end
  const netBuyCost = totalBuyCashOutflow - propertyFutureValue;

  const formatNumber = (num: number) => num.toLocaleString('th-TH', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="space-y-8 p-4 md:p-6 bg-slate-50 text-slate-800">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Warehouse className="w-8 h-8 text-amber-600" />
          <h2 className="text-2xl font-bold text-slate-800">เปรียบเทียบ เช่า vs ซื้อ คลังสินค้า (ระยะ {inputs.timeHorizon} ปี)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-slate-100 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Calculator className="w-5 h-5" /> ข้อมูลพื้นฐาน
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">พื้นที่ใช้งาน (ตร.ม.)</label>
                  <input type="number" name="area" value={inputs.area} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ระยะเวลาประเมิน (ปี)</label>
                  <input type="number" name="timeHorizon" value={inputs.timeHorizon} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-blue-900 flex items-center gap-2">
                <Key className="w-5 h-5" /> กรณีเช่า (Rent)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ค่าเช่าเริ่มต้น (บาท/ตร.ม./เดือน)</label>
                  <input type="number" name="rentPerSqm" value={inputs.rentPerSqm} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">อัตราค่าเช่าขึ้นต่อปี (%)</label>
                  <input type="number" name="rentIncrease" value={inputs.rentIncrease} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-emerald-900 flex items-center gap-2">
                <Home className="w-5 h-5" /> กรณีซื้อที่ดินสร้างเอง (Buy/Build)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">มูลค่าที่ดิน (บาท)</label>
                  <input type="number" name="landCost" value={inputs.landCost} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ค่าก่อสร้างคลังสินค้า (บาท)</label>
                  <input type="number" name="constructionCost" value={inputs.constructionCost} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ค่าบำรุงรักษาต่อปี (บาท)</label>
                  <input type="number" name="maintenancePerYear" value={inputs.maintenancePerYear} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ราคาอสังหาฯ เติบโตต่อปี (%)</label>
                  <input type="number" name="propertyAppreciation" value={inputs.propertyAppreciation} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">สรุปความคุ้มค่าทางการเงิน (ใน {inputs.timeHorizon} ปี)</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <Key className="w-4 h-4" /> ทางเลือก 1: เช่า
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex justify-between">
                    <span>จ่ายค่าเช่าสะสม</span>
                    <span className="font-semibold">{formatNumber(totalRentCost)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-200">
                    <span className="font-bold">ต้นทุนสุทธิ (Net Cost)</span>
                    <span className="font-bold text-lg text-blue-700">{formatNumber(totalRentCost)}</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">*เงินจ่ายทิ้ง ไม่ได้ครอบครองทรัพย์สิน</p>
                </div>
              </div>

              <div className="bg-emerald-100 p-4 rounded-xl border border-emerald-200">
                <div className="text-sm font-bold text-emerald-900 mb-3 flex items-center gap-2">
                  <Home className="w-4 h-4" /> ทางเลือก 2: สร้างเอง
                </div>
                <div className="space-y-2 text-sm text-emerald-800">
                  <div className="flex justify-between">
                    <span>เงินลงทุน + ค่าซ่อมบำรุง</span>
                    <span className="font-semibold">{formatNumber(totalBuyCashOutflow)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600">
                    <span>หัก มูลค่าทรัพย์สินที่เพิ่มขึ้น</span>
                    <span>- {formatNumber(propertyFutureValue)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-emerald-200">
                    <span className="font-bold">ต้นทุนสุทธิ (Net Cost)</span>
                    <span className={`font-bold text-lg ${netBuyCost < 0 ? 'text-green-700' : 'text-emerald-700'}`}>
                      {formatNumber(netBuyCost)}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-600 mt-2">
                    {netBuyCost < 0 ? '*มูลค่าอสังหาฯ สูงกว่าเงินที่จ่ายไป (กำไร)' : '*ต้นทุนสุทธิหลังหักมูลค่าทรัพย์สิน'}
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-xl border ${totalRentCost > netBuyCost ? 'bg-emerald-50 border-emerald-200' : 'bg-blue-50 border-blue-200'}`}>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> 
                คำแนะนำทางบัญชี/การเงิน
              </h3>
              <p className="text-slate-700">
                เมื่อมองในระยะยาว {inputs.timeHorizon} ปี การ <strong>{totalRentCost > netBuyCost ? 'ซื้อ/สร้างเอง (Buy)' : 'เช่า (Rent)'}</strong> มีต้นทุนสุทธิต่ำกว่า (ประหยัดกว่า) อยู่ที่ <strong>{formatNumber(Math.abs(totalRentCost - netBuyCost))}</strong> บาท
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 text-sm text-amber-800 flex items-start gap-2">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>
                การคำนวณนี้เปรียบเทียบในแง่ของ "ความมั่งคั่งสุทธิ" (Net Wealth/Cost) ยังไม่รวมถึงต้นทุนทางการเงิน (ดอกเบี้ยกู้ยืม) ต้นทุนค่าเสียโอกาสของเงินทุน (Opportunity Cost) และสิทธิประโยชน์ทางภาษี (ค่าเสื่อมราคา vs ค่าเช่าตัดค่าใช้จ่าย)
              </p>
            </div>
          </div>
        </div>
      </div>

      <article className="prose max-w-none bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">เช่า vs สร้างโกดังเอง: ทางเลือกไหนคุ้มค่ากว่ากัน?</h2>
        
        <p>เมื่อธุรกิจเติบโตจนถึงจุดที่ต้องการพื้นที่คลังสินค้า (Warehouse) เพิ่มขึ้น คำถามคลาสสิกของผู้บริหารคือ "เราควรเช่าโกดังต่อไปเรื่อยๆ หรือควรซื้อที่ดินสร้างเองดี?" คำตอบของเรื่องนี้ไม่มีสูตรตายตัว แต่ขึ้นอยู่กับสถานะทางการเงิน กลยุทธ์องค์กร และกรอบเวลาในการประเมิน</p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ข้อดีและข้อเสียของการ "เช่า (Rent)"</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-700">ข้อดี</h4>
            <ul className="list-disc pl-5 text-sm mt-2">
              <li><strong>รักษากระแสเงินสด (Cash Flow):</strong> ไม่ต้องใช้เงินก้อนใหญ่ ทำให้มีกระแสเงินสดหมุนเวียนไปลงทุนในธุรกิจหลัก (Core Business) ที่ให้ผลตอบแทนเร็วกว่า</li>
              <li><strong>ความยืดหยุ่นสูง:</strong> สามารถขยายหรือลดขนาดพื้นที่ หรือย้ายทำเลได้ง่ายเมื่อหมดสัญญา</li>
              <li><strong>ค่าใช้จ่ายคงที่ประเมินง่าย:</strong> เจ้าของโกดังมักรับผิดชอบค่าซ่อมบำรุงโครงสร้างหลัก</li>
            </ul>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-red-700">ข้อเสีย</h4>
            <ul className="list-disc pl-5 text-sm mt-2">
              <li><strong>ค่าเช่าเพิ่มขึ้นตามสัญญา:</strong> ปกติมักจะมีการปรับขึ้นค่าเช่าทุก 3 ปี ทำให้ต้นทุนคงที่สูงขึ้นในระยะยาว</li>
              <li><strong>เงินจ่ายทิ้ง (Sunk Cost):</strong> จ่ายค่าเช่าไปสิบปี ก็ไม่ได้ครอบครองสินทรัพย์ใดๆ</li>
              <li><strong>ความเสี่ยงจากเจ้าของพื้นที่:</strong> อาจไม่ต่อสัญญา หรือขอปรับขึ้นค่าเช่าสูงกว่าความเป็นจริง</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ข้อดีและข้อเสียของการ "ซื้อ/สร้างเอง (Buy)"</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-emerald-700">ข้อดี</h4>
            <ul className="list-disc pl-5 text-sm mt-2">
              <li><strong>การสะสมความมั่งคั่ง:</strong> มูลค่าที่ดินและสิ่งปลูกสร้าง (Capital Gain) มักจะเติบโตขึ้นในระยะยาว สามารถนำไปเป็นหลักทรัพย์ค้ำประกันเงินกู้ในอนาคตได้</li>
              <li><strong>ออกแบบได้ตรงใจ (Customization):</strong> สามารถสร้างโครงสร้างพื้นฐานเฉพาะทาง เช่น ห้องเย็น ชั้นวางอัตโนมัติ ให้เหมาะกับธุรกิจ 100%</li>
              <li><strong>ต้นทุนคงที่ในระยะยาว:</strong> เมื่อผ่อนหมด ธุรกิจจะไม่มีภาระค่าเช่า ทำให้ความสามารถในการแข่งขันระยะยาวดีขึ้น</li>
            </ul>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-red-700">ข้อเสีย</h4>
            <ul className="list-disc pl-5 text-sm mt-2">
              <li><strong>ใช้เงินลงทุนเริ่มต้นมหาศาล (CAPEX):</strong> หากกู้ธนาคารก็จะมีภาระดอกเบี้ยระยะยาว</li>
              <li><strong>ขาดความยืดหยุ่น:</strong> หากธุรกิจเปลี่ยนทิศทาง การขายโกดังทิ้งเพื่อย้ายทำเล อาจใช้เวลานานและมีสภาพคล่องต่ำ</li>
              <li><strong>ภาระผูกพัน:</strong> ต้องรับผิดชอบค่าเสื่อมราคา ประกันภัย ภาษีที่ดิน และค่าซ่อมบำรุงทั้งหมดเอง</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">จุดตัดสินใจ (Break-even Analysis)</h3>
        <p>ในมุมมองทางการเงิน หากบริษัทประเมินว่าจะต้องใช้พื้นที่โกดังนี้ใน <strong>ระยะเวลาเกิน 7-10 ปีขึ้นไป</strong> การ "สร้างเอง" มักจะคุ้มค่ากว่าเมื่อนำมูลค่าอสังหาริมทรัพย์ที่เพิ่มขึ้นมาคำนวณหักลบ (Net Present Value) แต่ถ้าคาดการณ์ว่าจะใช้เพียง 3-5 ปี หรือธุรกิจยังมีความผันผวนสูง การ "เช่า" จะเป็นทางเลือกที่ปลอดภัยกว่าและช่วยลดความเสี่ยงด้านสภาพคล่องได้ดีที่สุด</p>
      </article>
    </div>
  );
}

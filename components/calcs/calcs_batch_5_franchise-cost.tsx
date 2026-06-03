import React, { useState } from 'react';
import { Store, Calculator, DollarSign, Wallet, PieChart, Info, Percent } from 'lucide-react';

export default function FranchiseCostCalculator({ lang }: any) {
  const [franchiseFee, setFranchiseFee] = useState<number>(300000);
  const [constructionCost, setConstructionCost] = useState<number>(800000);
  const [equipmentCost, setEquipmentCost] = useState<number>(400000);
  const [initialInventory, setInitialInventory] = useState<number>(100000);
  const [depositRent, setDepositRent] = useState<number>(150000);
  const [workingCapital, setWorkingCapital] = useState<number>(300000);
  
  const [royaltyFee, setRoyaltyFee] = useState<number>(5);
  const [marketingFee, setMarketingFee] = useState<number>(3);

  // Total Calculation
  const totalInvestment = franchiseFee + constructionCost + equipmentCost + initialInventory + depositRent + workingCapital;

  // Percentages for UI
  const getPercent = (value: number) => totalInvestment > 0 ? ((value / totalInvestment) * 100).toFixed(1) : '0';

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-sm">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-teal-100 text-teal-600 rounded-full mx-auto mb-4">
          <Store className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Total Franchise Cost Calculator</h2>
        <p className="text-gray-600">คำนวณงบประมาณการลงทุนทั้งหมด สำหรับการเปิดร้านแฟรนไชส์ 1 สาขา</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <Calculator className="w-5 h-5 mr-2 text-teal-500" />
            รายการค่าใช้จ่ายเริ่มต้น (Initial Costs)
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ค่าธรรมเนียมแฟรนไชส์แรกเข้า (Franchise Fee)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={franchiseFee}
                  onChange={(e) => setFranchiseFee(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ค่าตกแต่งและก่อสร้างร้าน (Build-out)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={constructionCost}
                  onChange={(e) => setConstructionCost(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ค่าอุปกรณ์และระบบ POS (Equipment & System)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={equipmentCost}
                  onChange={(e) => setEquipmentCost(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ค่าวัตถุดิบและแพ็กเกจจิ้งงวดแรก (Initial Inventory)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={initialInventory}
                  onChange={(e) => setInitialInventory(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">เงินมัดจำค่าเช่าที่ดิน/ตึก (Rent Deposit)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={depositRent}
                  onChange={(e) => setDepositRent(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">เงินทุนหมุนเวียนสำรอง (Working Capital)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Wallet className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={workingCapital}
                  onChange={(e) => setWorkingCapital(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">แนะนำให้เตรียมเผื่อไว้ 3-6 เดือนของค่าใช้จ่ายรายเดือน</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
            <h3 className="text-lg font-semibold text-teal-900 mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              สรุปงบลงทุนทั้งหมด
            </h3>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-teal-100 mb-6 text-center">
              <p className="text-sm text-gray-500 mb-2">เงินทุนรวมที่ต้องเตรียม (Total Investment)</p>
              <p className="text-4xl font-bold text-teal-700">
                ฿{totalInvestment.toLocaleString()}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ค่าธรรมเนียมแรกเข้า</span>
                <span className="font-medium text-gray-900">฿{franchiseFee.toLocaleString()} ({getPercent(franchiseFee)}%)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ก่อสร้าง & ตกแต่ง</span>
                <span className="font-medium text-gray-900">฿{constructionCost.toLocaleString()} ({getPercent(constructionCost)}%)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">อุปกรณ์ & ระบบ</span>
                <span className="font-medium text-gray-900">฿{equipmentCost.toLocaleString()} ({getPercent(equipmentCost)}%)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">วัตถุดิบ & สินค้า</span>
                <span className="font-medium text-gray-900">฿{initialInventory.toLocaleString()} ({getPercent(initialInventory)}%)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">มัดจำพื้นที่ & ทุนหมุนเวียน</span>
                <span className="font-medium text-gray-900">฿{(depositRent + workingCapital).toLocaleString()} ({getPercent(depositRent + workingCapital)}%)</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
              <Info className="w-4 h-4 mr-2" /> ค่าใช้จ่ายรายเดือนหลังเปิดร้าน (Ongoing Fees)
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-blue-800 mb-1">Royalty Fee (%)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Percent className="w-3 h-3 text-blue-400" />
                  </div>
                  <input
                    type="number"
                    value={royaltyFee}
                    onChange={(e) => setRoyaltyFee(Number(e.target.value))}
                    className="w-full pl-7 pr-2 py-1.5 border border-blue-200 rounded text-sm bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-blue-800 mb-1">Marketing Fee (%)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Percent className="w-3 h-3 text-blue-400" />
                  </div>
                  <input
                    type="number"
                    value={marketingFee}
                    onChange={(e) => setMarketingFee(Number(e.target.value))}
                    className="w-full pl-7 pr-2 py-1.5 border border-blue-200 rounded text-sm bg-white"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-blue-700 mt-2">
              * หักจากยอดขาย (Gross Sales) ทุกเดือน
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-teal max-w-none">
        <h2>อยากซื้อแฟรนไชส์ ต้องเตรียมเงินเท่าไหร่? (Total Franchise Cost)</h2>
        <p>
          เวลาที่คุณเห็นโฆษณาขายแฟรนไชส์ตามสื่อต่างๆ มักจะพาดหัวด้วยคำว่า <strong>"ลงทุนเริ่มต้นเพียง 100,000 บาท!"</strong> แต่ในความเป็นจริง ตัวเลขนั้นมักจะเป็นแค่ <strong>Franchise Fee (ค่าธรรมเนียมแรกเข้า)</strong> อย่างเดียว ซึ่งเป็นข้อผิดพลาดที่มือใหม่หลายคนเจอ คือเตรียมเงินมาพอดีเป๊ะ แล้วมาตกม้าตายเพราะไม่มีเงินสร้างร้านหรือไม่มีเงินหมุน!
        </p>
        <p>
          ดังนั้น การประเมินงบลงทุน <strong>Total Initial Investment</strong> (เงินลงทุนทั้งหมดก่อนเปิดร้าน) จึงสำคัญที่สุด มาดูกันว่าจริงๆ แล้วคุณต้องควักกระเป๋าจ่ายค่าอะไรบ้าง
        </p>

        <h3>โครงสร้างเงินลงทุนแฟรนไชส์เบื้องต้น</h3>
        <ol>
          <li><strong>Franchise Fee (ค่าธรรมเนียมแรกเข้า):</strong> เป็นค่าซื้อสิทธิ์ในการใช้เครื่องหมายการค้า (แบรนด์), สูตรลับ, ระบบการทำงาน และการฝึกอบรม (จ่ายครั้งเดียว)</li>
          <li><strong>Construction & Decoration (ค่าก่อสร้างและตกแต่ง):</strong> ค่าออกแบบ, ผู้รับเหมาทำร้าน, ป้ายหน้าร้าน ซึ่งราคาจะแปรผันตามขนาดพื้นที่ร้าน บางแบรนด์มีรูปแบบ Kiosk เล็กๆ ก็จะถูกกว่าแบบ Cafe</li>
          <li><strong>Equipment & System (เครื่องจักร อุปกรณ์ และระบบ):</strong> เครื่องชงกาแฟ, ตู้เย็น, เตาอบ, อุปกรณ์ครัว รวมถึงระบบคิดเงิน POS และระบบกล้องวงจรปิด</li>
          <li><strong>Initial Inventory (วัตถุดิบและสินค้าล็อตแรก):</strong> ของที่ต้องสั่งมาตุนไว้เพื่อขายในเดือนแรก เช่น แก้วพลาสติก, เมล็ดกาแฟ, ไซรัป, หรือสต็อกเสื้อผ้า</li>
          <li><strong>Rent Deposit (เงินประกันพื้นที่เช่า):</strong> การเช่าพื้นที่ในห้างหรือตึกแถว มักเรียกเก็บเงินมัดจำล่วงหน้า 2-3 เดือน (ซึ่งเป็นเงินก้อนใหญ่ที่หลายคนลืมคิด)</li>
          <li><strong>Working Capital (เงินทุนหมุนเวียน):</strong> เงินสดสำรองที่ต้องเตรียมไว้จ่ายค่าจ้างพนักงาน ค่าน้ำค่าไฟ ค่าเช่าที่ ในช่วง 3-6 เดือนแรกที่ร้านอาจจะยังขาดทุนหรือยังไม่คืนทุน (สำคัญมาก!)</li>
        </ol>

        <h3>นอกจากเงินก้อนแรกแล้ว ยังมี "ค่าต๋ง" รายเดือน (Ongoing Fees)</h3>
        <p>
          ธุรกิจแฟรนไชส์ที่มีมาตรฐาน (Standard Franchise) นอกจากเก็บเงินก้อนแรกแล้ว จะมีการเก็บเปอร์เซ็นต์จากยอดขายรายเดือนด้วย ซึ่งคุณต้องนำไปคำนวณในต้นทุนรายเดือนของคุณ:
        </p>
        <ul>
          <li><strong>Royalty Fee:</strong> ค่าธรรมเนียมสิทธิ์การใช้แบรนด์และการดูแลสนับสนุนระบบจากบริษัทแม่ (มักอยู่ที่ 3-6% ของยอดขาย)</li>
          <li><strong>Marketing Fee:</strong> ค่าส่วนกลางเพื่อนำไปทำการตลาดโปรโมทแบรนด์ในภาพรวม (มักอยู่ที่ 1-3% ของยอดขาย)</li>
        </ul>

        <h3>ข้อแนะนำก่อนตัดสินใจซื้อแฟรนไชส์</h3>
        <p>
          ก่อนเซ็นสัญญา คุณควรขอดู <strong>เอกสาร FDD (Franchise Disclosure Document)</strong> หรือสอบถามตารางแจกแจงค่าใช้จ่ายอย่างละเอียด (Itemized Cost Breakdown) จากเจ้าของแบรนด์ ว่าค่าก่อสร้างใครเป็นคนทำ? บังคับซื้อวัตถุดิบทุกอย่างไหม? เพื่อให้คุณเตรียมหาแหล่งเงินทุนได้อย่างถูกต้อง ไม่ว่าจะเป็นเงินเก็บส่วนตัว หรือการขอสินเชื่อ SME จากธนาคารก็ตาม
        </p>
      </div>
    </div>
  );
}

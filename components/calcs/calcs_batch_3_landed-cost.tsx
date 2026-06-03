import React, { useState } from 'react';
import { Ship, DollarSign, Percent, Calculator, Info } from 'lucide-react';

const LandedCostCalculator = ({ lang }: any) => {
  const [productCost, setProductCost] = useState<number>(10000);
  const [shippingCost, setShippingCost] = useState<number>(2000);
  const [customsDuty, setCustomsDuty] = useState<number>(5); // percentage
  const [insuranceCost, setInsuranceCost] = useState<number>(500);
  const [otherFees, setOtherFees] = useState<number>(300);
  const [unitCount, setUnitCount] = useState<number>(100);

  const dutyAmount = (productCost + shippingCost + insuranceCost) * (customsDuty / 100);
  const totalLandedCost = productCost + shippingCost + dutyAmount + insuranceCost + otherFees;
  const landedCostPerUnit = unitCount > 0 ? totalLandedCost / unitCount : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <Ship className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Landed Cost Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Cost (ราคาสินค้า)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={productCost}
                onChange={(e) => setProductCost(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Cost (ค่าขนส่ง)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={shippingCost}
                onChange={(e) => setShippingCost(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customs Duty (อากรขาเข้า %)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Percent className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={customsDuty}
                onChange={(e) => setCustomsDuty(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insurance (ค่าประกันภัย)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={insuranceCost}
                onChange={(e) => setInsuranceCost(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Fees (ค่าธรรมเนียมอื่นๆ)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={otherFees}
                onChange={(e) => setOtherFees(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Units (จำนวนชิ้น)</label>
            <input
              type="number"
              value={unitCount}
              onChange={(e) => setUnitCount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl flex flex-col justify-center space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Landed Cost</h3>
            <div className="text-4xl font-bold text-blue-600">
              ฿{totalLandedCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-blue-600 mt-2">ต้นทุนรวมทั้งหมด</p>
          </div>

          <div className="border-t border-blue-200 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-800 font-medium">Landed Cost Per Unit:</span>
              <span className="text-xl font-bold text-blue-600">
                ฿{landedCostPerUnit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>
            <p className="text-xs text-blue-600 text-right">ต้นทุนต่อชิ้น</p>
          </div>

          <div className="bg-white p-4 rounded-lg text-sm space-y-2 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Product Cost:</span>
              <span className="font-medium">฿{productCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping & Insurance:</span>
              <span className="font-medium">฿{(shippingCost + insuranceCost).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Customs Duty:</span>
              <span className="font-medium">฿{dutyAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Other Fees:</span>
              <span className="font-medium">฿{otherFees.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-blue max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Landed Cost (ต้นทุนสินค้านำเข้า) คืออะไร?</h2>
        <p>
          <strong>Landed Cost</strong> หรือต้นทุนสินค้าเมื่อถึงมือ (หรือโกดัง) คือผลรวมของค่าใช้จ่ายทั้งหมดที่เกิดขึ้นในการนำสินค้าจากโรงงานผู้ผลิตหรือผู้ขายต้นทาง มาจนถึงสถานที่ของผู้ซื้อหรือจุดหมายปลายทาง การคำนวณ Landed Cost ที่ถูกต้องมีความสำคัญอย่างยิ่งสำหรับธุรกิจนำเข้าและส่งออก (Import/Export) รวมถึงธุรกิจอีคอมเมิร์ซที่ต้องสั่งสินค้าจากต่างประเทศ เนื่องจากหากคำนวณผิดพลาด อาจทำให้การตั้งราคาขายขาดทุนได้โดยไม่รู้ตัว
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ส่วนประกอบของ Landed Cost</h3>
        <p>การคำนวณ Landed Cost ที่สมบูรณ์แบบจะต้องนำเอาค่าใช้จ่ายแอบแฝงทั้งหมดมารวมด้วย โดยทั่วไปจะประกอบด้วย:</p>
        <ul>
          <li><strong>Product Cost (ราคาสินค้า)</strong> - ต้นทุนค่าสินค้าที่จ่ายให้กับผู้ผลิตหรือซัพพลายเออร์</li>
          <li><strong>Shipping & Freight (ค่าขนส่ง)</strong> - ค่าใช้จ่ายในการขนส่ง ไม่ว่าจะเป็นทางเรือ (Sea Freight) ทางอากาศ (Air Freight) หรือทางรถ</li>
          <li><strong>Customs & Duties (อากรขาเข้าและภาษี)</strong> - ภาษีศุลกากร ซึ่งแต่ละประเภทสินค้าจะพิกัดอัตราอากร (HS Code) ที่แตกต่างกันออกไป (ในไทยอาจต้องรวม VAT 7% ด้วยหากจะคำนวณต้นทุนเงินสด)</li>
          <li><strong>Insurance (ค่าประกันภัย)</strong> - ค่าเบี้ยประกันภัยสินค้าระหว่างการขนส่ง เพื่อป้องกันความเสี่ยงจากสินค้าสูญหายหรือเสียหาย</li>
          <li><strong>Other Fees (ค่าธรรมเนียมอื่นๆ)</strong> - เช่น ค่าธรรมเนียมธนาคาร ค่าธรรมเนียมพิธีการศุลกากร (Customs Clearance) ค่าใช้จ่ายที่ท่าเรือ (Port Charges) หรือค่าจัดเก็บ (Storage fees)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการคำนวณ Landed Cost</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4">
          <p className="font-mono text-center font-semibold text-blue-700">
            Total Landed Cost = Product Cost + Shipping + Customs Duties + Insurance + Other Fees
          </p>
        </div>
        <p>
          เมื่อได้ Total Landed Cost (ต้นทุนรวม) แล้ว ให้นำมาหารด้วยจำนวนชิ้นของสินค้า (Number of Units) เพื่อหา <strong>Landed Cost Per Unit (ต้นทุนต่อชิ้น)</strong> ซึ่งเป็นตัวเลขที่จะนำไปใช้ตั้งราคาขายปลีกหรือประเมินอัตรากำไร (Profit Margin)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมการรู้ Landed Cost ที่แม่นยำจึงสำคัญ?</h3>
        <p>
          หลายธุรกิจที่เพิ่งเริ่มต้นมักจะมองแค่ราคาสินค้าหน้าโรงงาน (FOB price) แล้วนำมาตั้งราคาขายทันที ซึ่งเป็นความผิดพลาดที่พบบ่อย การละเลยค่าใช้จ่ายในการขนส่ง ภาษีนำเข้า หรือแม้แต่ความผันผวนของอัตราแลกเปลี่ยน อาจทำให้อัตรากำไรสุทธิ (Net Profit Margin) ของคุณกลายเป็นติดลบ การคำนวณ Landed Cost ล่วงหน้าช่วยให้:
        </p>
        <ul>
          <li><strong>ตั้งราคาขายได้อย่างเหมาะสม (Pricing Strategy)</strong>: ให้ครอบคลุมต้นทุนทั้งหมดและมีกำไรตามเป้าหมาย</li>
          <li><strong>เปรียบเทียบซัพพลายเออร์ (Supplier Comparison)</strong>: สินค้าราคาถูกจากบางประเทศอาจมีค่าขนส่งและภาษีนำเข้าที่สูงกว่า ทำให้ต้นทุนสุดท้ายแพงกว่าการซื้อจากซัพพลายเออร์ในประเทศ</li>
          <li><strong>วิเคราะห์ความคุ้มค่า (Profitability Analysis)</strong>: ช่วยประเมินว่าสินค้านี้คุ้มค่าที่จะนำเข้ามาขายหรือไม่</li>
        </ul>
        
        <p className="mt-4 text-sm text-gray-500">
          อ้างอิง: หลักการบัญชีและการค้าระหว่างประเทศว่าด้วยการคำนวณต้นทุนสินค้าคงคลัง (Inventory Valuation) และแนวทางจากกรมศุลกากร
        </p>
      </div>
    </div>
  );
};

export default LandedCostCalculator;

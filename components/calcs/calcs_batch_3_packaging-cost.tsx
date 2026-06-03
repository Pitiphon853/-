import React, { useState } from 'react';
import { Package, DollarSign, Box, Calculator } from 'lucide-react';

const PackagingCostCalculator = ({ lang }: any) => {
  const [primaryPackaging, setPrimaryPackaging] = useState<number>(5.0);
  const [secondaryPackaging, setSecondaryPackaging] = useState<number>(2.5);
  const [insertsCost, setInsertsCost] = useState<number>(1.0);
  const [labelsCost, setLabelsCost] = useState<number>(0.5);
  const [laborCostPerUnit, setLaborCostPerUnit] = useState<number>(3.0);
  const [unitsProduced, setUnitsProduced] = useState<number>(1000);

  const totalCostPerUnit = primaryPackaging + secondaryPackaging + insertsCost + labelsCost + laborCostPerUnit;
  const totalPackagingCost = totalCostPerUnit * unitsProduced;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <Package className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Packaging Cost per Unit Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Packaging (บรรจุภัณฑ์ชั้นแรก/ต่อชิ้น)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={primaryPackaging}
                onChange={(e) => setPrimaryPackaging(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">เช่น ขวด, กระปุก, ถุงฟอยล์ ที่สัมผัสสินค้าโดยตรง</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Packaging (บรรจุภัณฑ์ชั้นที่สอง/ต่อชิ้น)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={secondaryPackaging}
                onChange={(e) => setSecondaryPackaging(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">เช่น กล่องกระดาษใส่ขวด, หีบห่อภายนอก</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Inserts & Padding (วัสดุกันกระแทก/ต่อชิ้น)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={insertsCost}
                onChange={(e) => setInsertsCost(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Labels & Stickers (ฉลากและสติ๊กเกอร์/ต่อชิ้น)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={labelsCost}
                onChange={(e) => setLabelsCost(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Labor Cost (ค่าแรงแพ็ค/ต่อชิ้น)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={laborCostPerUnit}
                onChange={(e) => setLaborCostPerUnit(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Production Volume (จำนวนที่ผลิต)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Box className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={unitsProduced}
                onChange={(e) => setUnitsProduced(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-xl flex flex-col justify-center space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Total Packaging Cost / Unit</h3>
            <div className="text-5xl font-bold text-indigo-600">
              ฿{totalCostPerUnit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-indigo-600 mt-2">ต้นทุนบรรจุภัณฑ์ต่อชิ้น</p>
          </div>

          <div className="border-t border-indigo-200 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-indigo-800 font-medium">Total Batch Cost:</span>
              <span className="text-xl font-bold text-indigo-600">
                ฿{totalPackagingCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <p className="text-xs text-indigo-600 text-right">ต้นทุนรวมสำหรับ {unitsProduced.toLocaleString()} ชิ้น</p>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Cost Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Materials:</span>
                <span className="font-medium">
                  {((primaryPackaging + secondaryPackaging + insertsCost + labelsCost) / totalCostPerUnit * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${((primaryPackaging + secondaryPackaging + insertsCost + labelsCost) / totalCostPerUnit * 100)}%` }}></div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Labor:</span>
                <span className="font-medium">
                  {(laborCostPerUnit / totalCostPerUnit * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${(laborCostPerUnit / totalCostPerUnit * 100)}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-indigo max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">ต้นทุนบรรจุภัณฑ์ (Packaging Cost per Unit) สำคัญอย่างไร?</h2>
        <p>
          บรรจุภัณฑ์ (Packaging) ไม่ได้ทำหน้าที่เพียงแค่ปกป้องสินค้าให้อยู่ในสภาพสมบูรณ์เท่านั้น แต่ยังเป็น "นักขายไร้เสียง" ที่ช่วยสร้างภาพลักษณ์และเพิ่มมูลค่าให้กับแบรนด์ (Brand Value) อย่างไรก็ตาม <strong>ต้นทุนบรรจุภัณฑ์ (Packaging Cost)</strong> เป็นหนึ่งในต้นทุนแฝงที่ผู้ประกอบการมักจะมองข้ามหรือคำนวณได้ไม่ครบถ้วน ทำให้กำไรต่อชิ้น (Unit Economics) น้อยกว่าที่คาดการณ์ไว้
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">องค์ประกอบของต้นทุนบรรจุภัณฑ์</h3>
        <p>การคำนวณ Packaging Cost ต่อ 1 ชิ้นของสินค้า (Per Unit) อย่างละเอียด จะประกอบด้วยองค์ประกอบหลักๆ ดังนี้:</p>
        <ul>
          <li><strong>Primary Packaging (บรรจุภัณฑ์ปฐมภูมิ):</strong> สิ่งที่สัมผัสกับสินค้าโดยตรง เช่น ขวดเซรั่ม, กระปุกครีม, ซองขนม เป็นต้น</li>
          <li><strong>Secondary Packaging (บรรจุภัณฑ์ทุติยภูมิ):</strong> กล่องกระดาษหรือวัสดุห่อหุ้มชั้นนอกที่ใส่บรรจุภัณฑ์ปฐมภูมิอีกที ช่วยในการจัดเรียงและสื่อสารการตลาด</li>
          <li><strong>Inserts & Padding (วัสดุกันกระแทกและคู่มือ):</strong> บับเบิ้ลกันกระแทก, โฟม, แผ่นพับคู่มือการใช้งาน, การ์ดขอบคุณ (Thank you card)</li>
          <li><strong>Labels & Stickers (ฉลากและสติ๊กเกอร์):</strong> สติ๊กเกอร์ติดหน้ากล่อง, ฉลากบาร์โค้ด, ฉลาก สคบ.</li>
          <li><strong>Labor Cost (ค่าแรงในการบรรจุ):</strong> ต้นทุนเวลาและแรงงานของพนักงานในการประกอบ พับกล่อง และแพ็คสินค้า</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการคำนวณ</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4">
          <p className="font-mono text-center font-semibold text-indigo-700">
            Packaging Cost per Unit = Primary + Secondary + Inserts + Labels + Labor per Unit
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">หลักการบริหารต้นทุนบรรจุภัณฑ์</h3>
        <p>
          ตามหลักเศรษฐศาสตร์ธุรกิจ สัดส่วนต้นทุนบรรจุภัณฑ์ไม่ควรสูงจนเกินไปเมื่อเทียบกับต้นทุนตัวสินค้าจริง (COGS) โดยทั่วไปสำหรับสินค้าอุปโภคบริโภค (FMCG) ต้นทุนบรรจุภัณฑ์อาจอยู่ที่ <strong>9% ถึง 10% ของราคาขายปลีก</strong> แต่สำหรับสินค้าพรีเมียมหรือเครื่องสำอาง สัดส่วนนี้อาจพุ่งสูงถึง 15-20% เพื่อสร้างความประทับใจเมื่อแกะกล่อง (Unboxing Experience)
        </p>
        <p><strong>วิธีลดต้นทุนบรรจุภัณฑ์:</strong></p>
        <ol>
          <li><strong>Economies of Scale:</strong> การสั่งผลิตจำนวนมากขึ้นเพื่อลดต้นทุนต่อหน่วย (Unit Cost)</li>
          <li><strong>Standardization:</strong> ใช้ขนาดกล่องหรือบรรจุภัณฑ์ที่เป็นมาตรฐาน ไม่สั่งทำพิเศษ (Custom) หากไม่จำเป็น</li>
          <li><strong>Automation:</strong> ลดค่าแรงแพ็ค (Labor Cost) โดยใช้เครื่องจักรหรือปรับการออกแบบกล่องให้ประกอบง่ายที่สุด (Crash-lock bottom)</li>
        </ol>
        
        <p className="mt-4 text-sm text-gray-500">
          อ้างอิง: ทฤษฎีการจัดการซัพพลายเชน (Supply Chain Management) และคู่มือการคำนวณต้นทุนการผลิต (Manufacturing Costing)
        </p>
      </div>
    </div>
  );
};

export default PackagingCostCalculator;

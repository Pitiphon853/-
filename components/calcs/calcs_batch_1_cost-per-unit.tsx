import React, { useState } from 'react';
import { Factory, Cog } from 'lucide-react';

export default function CostPerUnit({ lang }: any) {
  const [fixedCosts, setFixedCosts] = useState<number | string>('');
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<number | string>('');
  const [unitsProduced, setUnitsProduced] = useState<number | string>('');

  const fixed = Number(fixedCosts) || 0;
  const variablePerUnit = Number(variableCostPerUnit) || 0;
  const units = Number(unitsProduced) || 0;

  const totalVariableCost = variablePerUnit * units;
  const totalCost = fixed + totalVariableCost;
  
  const costPerUnit = units > 0 ? totalCost / units : 0;
  const fixedCostPerUnit = units > 0 ? fixed / units : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-slate-100 rounded-full">
          <Factory className="w-8 h-8 text-slate-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">เครื่องมือคำนวณต้นทุนต่อหน่วย (Cost per Unit)</h1>
          <p className="text-gray-500">สำหรับธุรกิจผลิตสินค้า ประเมินต้นทุนรวมต่อการผลิต 1 ชิ้น</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-sm font-bold text-gray-800 mb-1">ต้นทุนคงที่รวม (Total Fixed Costs)</label>
            <p className="text-xs text-gray-500 mb-2">เช่น ค่าเช่าโรงงาน, เงินเดือนพนักงานประจำ, ค่าเสื่อมเครื่องจักร</p>
            <input
              type="number"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-slate-500"
              placeholder="เช่น 50000"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-sm font-bold text-gray-800 mb-1">ต้นทุนผันแปรต่อหน่วย (Variable Cost per Unit)</label>
            <p className="text-xs text-gray-500 mb-2">เช่น ค่าวัตถุดิบ 1 ชิ้น, ค่าบรรจุภัณฑ์</p>
            <input
              type="number"
              value={variableCostPerUnit}
              onChange={(e) => setVariableCostPerUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-slate-500"
              placeholder="เช่น 15"
            />
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <label className="block text-sm font-bold text-blue-900 mb-1">จำนวนการผลิต (Units Produced)</label>
            <input
              type="number"
              value={unitsProduced}
              onChange={(e) => setUnitsProduced(e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="เช่น 1000"
            />
          </div>
        </div>

        <div className="bg-slate-800 text-white rounded-xl p-6 flex flex-col justify-center relative overflow-hidden">
          <Cog className="absolute -right-6 -bottom-6 w-32 h-32 text-slate-700 opacity-50" />
          
          <h2 className="text-xl font-semibold mb-6 text-slate-300 z-10">ผลการคำนวณต้นทุน</h2>
          
          <div className="space-y-6 z-10">
            <div className="flex justify-between items-end border-b border-slate-600 pb-2">
              <span className="text-slate-400">ต้นทุนผันแปรรวม:</span>
              <span className="text-lg">{totalVariableCost.toLocaleString()} บาท</span>
            </div>
            
            <div className="flex justify-between items-end border-b border-slate-600 pb-2">
              <span className="text-slate-400">ต้นทุนรวมทั้งหมด (Total Cost):</span>
              <span className="text-xl font-bold">{totalCost.toLocaleString()} บาท</span>
            </div>

            <div className="pt-4">
              <div className="text-center bg-slate-700 rounded-lg p-4">
                <p className="text-slate-300 mb-1 text-sm uppercase tracking-wider">ต้นทุนต่อหน่วย (Cost per Unit)</p>
                <p className="text-4xl font-bold text-blue-400">
                  {costPerUnit > 0 ? costPerUnit.toLocaleString(undefined, {maximumFractionDigits: 2}) : '0.00'} 
                  <span className="text-lg text-slate-400 ml-2">บาท/ชิ้น</span>
                </p>
              </div>
            </div>

            {units > 0 && (
              <div className="text-xs text-slate-400 text-center mt-2">
                *ประกอบด้วย: ต้นทุนผันแปร {variablePerUnit} บาท + ส่วนแบ่งต้นทุนคงที่ {fixedCostPerUnit.toLocaleString(undefined, {maximumFractionDigits: 2})} บาท
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-200" />

      <article className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">การคำนวณต้นทุนต่อหน่วย (Cost per Unit) สำหรับธุรกิจผลิตสินค้า</h2>
        
        <p>
          ในการผลิตสินค้าไม่ว่าจะเป็นเบเกอรี่ เสื้อผ้า หรือของใช้ ปัญหาคลาสสิกของเจ้าของกิจการคือ <strong>"ตั้งราคาขายไม่ถูก เพราะไม่รู้ต้นทุนที่แท้จริง"</strong> 
          หลายคนนำแค่ค่าวัตถุดิบมาคิดเป็นต้นทุน และลืมนำรายจ่ายประจำอย่างค่าเช่าที่หรือค่าจ้างพนักงานมาถัวเฉลี่ยลงไปในสินค้าด้วย ทำให้สุดท้ายขายดีแต่ไม่มีกำไร 
          การคำนวณ ต้นทุนต่อหน่วย (Cost per Unit) อย่างถูกต้องจึงเป็นหัวใจหลักของการตั้งราคา
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">โครงสร้างของต้นทุนการผลิต</h3>
        <p>การจะหาต้นทุนต่อหน่วยได้ คุณต้องแยกประเภทของค่าใช้จ่ายออกเป็น 2 ส่วนหลักๆ ก่อน:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ต้นทุนคงที่ (Fixed Costs):</strong> คือรายจ่ายที่เกิดขึ้นแน่นอน ไม่ว่าคุณจะผลิตสินค้าหรือไม่ หรือผลิตมากแค่ไหนก็ตาม เช่น ค่าเช่าโรงงาน เงินเดือนพนักงานประจำ ค่าประกันภัย ค่าเบี้ยปรับ ค่าเสื่อมราคากล้องวงจรปิด เป็นต้น</li>
          <li><strong>ต้นทุนผันแปร (Variable Costs):</strong> คือรายจ่ายที่จะเพิ่มขึ้นตามปริมาณการผลิต ผลิตมากจ่ายมาก ผลิตน้อยจ่ายน้อย เช่น ค่าวัตถุดิบ (แป้ง น้ำตาล เนื้อสัตว์) ค่ากล่องแพ็กเกจจิ้ง ค่าส่งของ ค่าไฟ (ส่วนที่ใช้เดินเครื่องจักร)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการคำนวณ Cost per Unit</h3>
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center">
          ต้นทุนรวมทั้งหมด = ต้นทุนคงที่รวม + (ต้นทุนผันแปรต่อหน่วย × จำนวนชิ้นที่ผลิต)<br/>
          <strong>ต้นทุนต่อหน่วย = ต้นทุนรวมทั้งหมด / จำนวนชิ้นที่ผลิต</strong>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมยอดผลิตถึงสำคัญ (Economy of Scale)</h3>
        <p>
          เมื่อคุณพิจารณาสูตรคำนวณ คุณจะพบว่า <em>"ส่วนแบ่งต้นทุนคงที่"</em> ต่อสินค้า 1 ชิ้น จะลดลงเรื่อยๆ เมื่อคุณผลิตในปริมาณที่มากขึ้น 
          ตัวอย่างเช่น คุณมีค่าเช่าโรงงานเดือนละ 50,000 บาท 
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>ถ้าเดือนนี้คุณผลิตสินค้า 1,000 ชิ้น สินค้าทุกชิ้นจะต้องแบกค่าเช่าโรงงานชิ้นละ <strong>50 บาท</strong></li>
          <li>แต่ถ้าคุณเร่งการผลิตได้เป็น 5,000 ชิ้น สินค้าแต่ละชิ้นจะแบกค่าเช่าโรงงานเพียงชิ้นละ <strong>10 บาท</strong> เท่านั้น!</li>
        </ul>
        <p>
          ปรากฏการณ์นี้เรียกว่า <strong>การประหยัดต่อขนาด (Economy of Scale)</strong> ซึ่งอธิบายว่าทำไมโรงงานขนาดใหญ่ที่ผลิตระดับแมส (Mass Production) ถึงสามารถทำต้นทุนต่อหน่วยได้ถูกกว่าผู้ผลิตรายเล็กอย่างมหาศาล
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">คำแนะนำในการนำไปใช้</h3>
        <p>
          เมื่อคุณทราบ "ต้นทุนต่อหน่วย" ที่แท้จริงแล้ว คุณสามารถนำตัวเลขนี้ไปเป็นฐานในการบวกกำไร (Markup) เพื่อตั้งราคาขายปลีก หรือราคาส่งได้อย่างมั่นใจ 
          และหากคุณพบว่าต้นทุนต่อหน่วยสูงเกินไปกว่าราคาตลาด คุณก็จะมีโจทย์ชัดเจนว่าจะต้องไปเจรจาลดค่าวัตถุดิบ (Variable) หรือต้องกระตุ้นยอดขายเพื่อเพิ่มการผลิตให้คุ้มค่าใช้จ่ายประจำ (Fixed)
        </p>
      </article>
    </div>
  );
}

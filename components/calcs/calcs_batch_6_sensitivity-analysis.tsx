import React, { useState } from 'react';
import { Activity, BarChart, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const SensitivityAnalysisCalculator = ({ lang }: any) => {
  // Base scenario
  const [baseVolume, setBaseVolume] = useState<number>(10000);
  const [basePrice, setBasePrice] = useState<number>(500);
  const [baseVarCost, setBaseVarCost] = useState<number>(300);
  const [fixedCost, setFixedCost] = useState<number>(1000000);

  // Scenarios (% change)
  const [volChange, setVolChange] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [costChange, setCostChange] = useState<number>(0);

  // Calculations Base
  const baseRevenue = baseVolume * basePrice;
  const baseTotalVarCost = baseVolume * baseVarCost;
  const baseProfit = baseRevenue - baseTotalVarCost - fixedCost;
  const baseMargin = baseRevenue > 0 ? (baseProfit / baseRevenue) * 100 : 0;

  // Calculations New
  const newVolume = baseVolume * (1 + volChange / 100);
  const newPrice = basePrice * (1 + priceChange / 100);
  const newVarCost = baseVarCost * (1 + costChange / 100);
  
  const newRevenue = newVolume * newPrice;
  const newTotalVarCost = newVolume * newVarCost;
  const newProfit = newRevenue - newTotalVarCost - fixedCost;
  const newMargin = newRevenue > 0 ? (newProfit / newRevenue) * 100 : 0;

  const profitDiff = newProfit - baseProfit;
  const profitChangePercent = baseProfit !== 0 ? (profitDiff / Math.abs(baseProfit)) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6 text-rose-600">
        <Activity className="w-8 h-8 mr-3" />
        <h1 className="text-2xl font-bold">เครื่องมือวิเคราะห์ความอ่อนไหว (Sensitivity Analysis)</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2">สถานการณ์ฐาน (Base Case)</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700">ปริมาณขาย (หน่วย)</label>
                <input type="number" value={baseVolume} onChange={(e) => setBaseVolume(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-rose-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">ราคาขายต่อหน่วย (บาท)</label>
                <input type="number" value={basePrice} onChange={(e) => setBasePrice(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-rose-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">ต้นทุนผันแปรต่อหน่วย (บาท)</label>
                <input type="number" value={baseVarCost} onChange={(e) => setBaseVarCost(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-rose-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">ต้นทุนคงที่รวม (บาท)</label>
                <input type="number" value={fixedCost} onChange={(e) => setFixedCost(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-rose-500" />
              </div>
            </div>
          </div>

          <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
            <h3 className="font-semibold text-rose-800 mb-3 border-b border-rose-200 pb-2">ทดสอบสมมติฐาน (What-If Scenarios)</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <label className="text-gray-700">เปลี่ยนแปลงปริมาณขาย: <span className="font-bold text-rose-700">{volChange > 0 ? '+' : ''}{volChange}%</span></label>
                  <span className="text-gray-500 text-xs">คาดการณ์: {newVolume.toLocaleString()} หน่วย</span>
                </div>
                <input type="range" min="-50" max="50" step="1" value={volChange} onChange={(e) => setVolChange(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-600" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <label className="text-gray-700">เปลี่ยนแปลงราคาขาย: <span className="font-bold text-rose-700">{priceChange > 0 ? '+' : ''}{priceChange}%</span></label>
                  <span className="text-gray-500 text-xs">คาดการณ์: ฿{newPrice.toLocaleString()} /หน่วย</span>
                </div>
                <input type="range" min="-30" max="30" step="1" value={priceChange} onChange={(e) => setPriceChange(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-600" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <label className="text-gray-700">เปลี่ยนแปลงต้นทุนผันแปร: <span className="font-bold text-rose-700">{costChange > 0 ? '+' : ''}{costChange}%</span></label>
                  <span className="text-gray-500 text-xs">คาดการณ์: ฿{newVarCost.toLocaleString()} /หน่วย</span>
                </div>
                <input type="range" min="-30" max="50" step="1" value={costChange} onChange={(e) => setCostChange(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-600" />
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={() => {setVolChange(0); setPriceChange(0); setCostChange(0);}} className="text-sm text-rose-600 hover:text-rose-800 underline">รีเซ็ตค่าทั้งหมด</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg h-full">
            <h3 className="text-lg font-semibold mb-6 flex items-center border-b border-gray-600 pb-3">
              <BarChart className="w-5 h-5 mr-2" /> เปรียบเทียบผลกำไร
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="bg-gray-700 p-3 rounded-md">
                <p className="text-gray-400 mb-1">กำไรสถานการณ์ฐาน</p>
                <p className={`text-xl font-bold ${baseProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ฿{baseProfit.toLocaleString(undefined, {maximumFractionDigits: 0})}
                </p>
                <p className="text-xs text-gray-400 mt-1">Net Margin: {baseMargin.toFixed(1)}%</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-md border border-rose-500">
                <p className="text-gray-400 mb-1">กำไรสถานการณ์ใหม่</p>
                <p className={`text-xl font-bold ${newProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ฿{newProfit.toLocaleString(undefined, {maximumFractionDigits: 0})}
                </p>
                <p className="text-xs text-gray-400 mt-1">Net Margin: {newMargin.toFixed(1)}%</p>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-md text-center">
              <p className="text-gray-400 text-sm mb-2">ผลกระทบต่อกำไร (Impact on Profit)</p>
              <div className="flex justify-center items-center">
                {profitDiff > 0 ? (
                  <ArrowUpRight className="w-8 h-8 text-green-500 mr-2" />
                ) : profitDiff < 0 ? (
                  <ArrowDownRight className="w-8 h-8 text-red-500 mr-2" />
                ) : (
                  <Minus className="w-8 h-8 text-gray-400 mr-2" />
                )}
                <span className={`text-3xl font-bold ${profitDiff > 0 ? 'text-green-500' : profitDiff < 0 ? 'text-red-500' : 'text-gray-300'}`}>
                  {profitDiff > 0 ? '+' : ''}{profitDiff.toLocaleString(undefined, {maximumFractionDigits: 0})} 
                </span>
              </div>
              <p className={`mt-1 font-medium ${profitDiff > 0 ? 'text-green-400' : profitDiff < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                ({profitChangePercent > 0 ? '+' : ''}{profitChangePercent.toFixed(2)}%)
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-gray-400 border-t border-gray-600 pt-4">
              <div className="flex justify-between">
                <span>รายได้รวมใหม่:</span>
                <span>฿{newRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ต้นทุนรวมใหม่:</span>
                <span>฿{(newTotalVarCost + fixedCost).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 prose max-w-none text-gray-800 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4 text-rose-700">การวิเคราะห์ความอ่อนไหว (Sensitivity Analysis) คืออะไร?</h2>
        <p>
          ในการวางแผนธุรกิจหรือการวิเคราะห์การลงทุน ผู้บริหารมักจะสร้าง "สถานการณ์ฐาน (Base Case)" ขึ้นมาโดยอิงจากสมมติฐานที่คาดว่าจะเป็นไปได้มากที่สุด แต่ในโลกแห่งความเป็นจริง ตัวแปรต่างๆ มักจะไม่เป็นไปตามที่คิดไว้ เช่น เศรษฐกิจตกต่ำทำให้ยอดขายลด ต้นทุนวัตถุดิบแพงขึ้นกะทันหัน หรือคู่แข่งดัมพ์ราคาทำให้เราต้องลดราคาตาม
        </p>
        <p>
          <strong>การวิเคราะห์ความอ่อนไหว (Sensitivity Analysis)</strong> หรือที่มักเรียกกันว่าการทำ <em>"What-If Analysis"</em> คือ เครื่องมือที่ช่วยตอบคำถามว่า <strong>"ถ้าสมมติฐานตัวใดตัวหนึ่งเปลี่ยนแปลงไป จะส่งผลกระทบต่อผลกำไร (หรือ NPV) ของโครงการมากน้อยแค่ไหน?"</strong>
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ประโยชน์ของการทำ Sensitivity Analysis</h3>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>ระบุความเสี่ยงหลัก (Identify Key Risks):</strong> ช่วยให้ทราบว่าตัวแปรใดมีอิทธิพลต่อกำไรมากที่สุด เช่น การลดราคาสินค้าเพียง 5% อาจทำให้กำไรหายไปถึง 30% ผู้บริหารจะได้รู้ว่าการรักษาระดับราคาคือเรื่องคอขาดบาดตาย</li>
          <li><strong>การประเมินสถานการณ์ (Scenario Planning):</strong> สามารถจำลองสถานการณ์ที่เลวร้ายที่สุด (Worst-case scenario) เพื่อดูว่าถ้าเกิดเหตุการณ์นั้น บริษัทจะยังคงมีกำไรหรือสามารถเอาตัวรอดได้หรือไม่</li>
          <li><strong>เพิ่มความมั่นใจในการตัดสินใจ:</strong> ข้อมูลที่ได้ช่วยเสริมให้แผนธุรกิจมีความรัดกุมรอบคอบมากขึ้น เวลาเสนอแผนให้นักลงทุนหรือธนาคาร จะทำให้เห็นว่าเราได้เตรียมการรับมือความเสี่ยงไว้แล้ว</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">ตัวแปรหลักที่มักนำมาวิเคราะห์</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>ปริมาณการขาย (Sales Volume):</strong> ความต้องการตลาดที่อาจผันผวนตามเศรษฐกิจหรือฤดูกาล</li>
          <li><strong>ราคาขาย (Selling Price):</strong> การแข่งขันด้านราคาในตลาด และความอ่อนไหวต่อราคาของผู้บริโภค (Price Elasticity)</li>
          <li><strong>ต้นทุนผันแปร (Variable Costs):</strong> เช่น ราคาวัตถุดิบที่อาจแพงขึ้น อัตราแลกเปลี่ยน หรือค่าขนส่ง</li>
          <li><strong>ต้นทุนคงที่ (Fixed Costs):</strong> เช่น การขึ้นค่าเช่าที่ หรือค่าแรงงานขั้นต่ำขั้นพื้นฐาน</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">ข้อสังเกตจากโมเดลธุรกิจ (Operating Leverage)</h3>
        <p>
          ธุรกิจที่มีสัดส่วนต้นทุนคงที่สูง (High Fixed Costs) เช่น โรงงานอุตสาหกรรม หรือสายการบิน มักจะ <strong>"อ่อนไหว" (Sensitive)</strong> ต่อการเปลี่ยนแปลงของยอดขายมาก หมายความว่าถ้ายอดขายลดลงนิดเดียว กำไรจะฮวบลงอย่างหนัก ในทางกลับกัน ถ้ายอดขายเพิ่มขึ้น กำไรก็จะกระโดดขึ้นอย่างมหาศาลเช่นกัน การเข้าใจจุดนี้จะช่วยให้จัดโครงสร้างต้นทุนได้เหมาะสมกับบริบทของธุรกิจ
        </p>
      </div>
    </div>
  );
};

export default SensitivityAnalysisCalculator;

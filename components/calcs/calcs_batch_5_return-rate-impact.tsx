import React, { useState } from 'react';
import { RotateCcw, Calculator, DollarSign, Percent, TrendingDown, AlertTriangle, PackageX } from 'lucide-react';

export default function ReturnRateImpactCalculator({ lang }: any) {
  const [monthlyOrders, setMonthlyOrders] = useState<number>(1000);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(1000);
  const [cogsPercent, setCogsPercent] = useState<number>(40);
  const [returnRate, setReturnRate] = useState<number>(5);
  const [processingCost, setProcessingCost] = useState<number>(100);
  const [salvageValuePercent, setSalvageValuePercent] = useState<number>(80);

  // Calculations
  const totalRevenue = monthlyOrders * averageOrderValue;
  const returnedOrdersCount = monthlyOrders * (returnRate / 100);
  const grossProfitBeforeReturns = totalRevenue * (1 - cogsPercent / 100);

  // Cost of returns
  const lostRevenue = returnedOrdersCount * averageOrderValue;
  const cogsPerOrder = averageOrderValue * (cogsPercent / 100);
  
  const productLossCost = returnedOrdersCount * cogsPerOrder * (1 - salvageValuePercent / 100);
  const totalProcessingCost = returnedOrdersCount * processingCost;
  
  const totalCostOfReturns = productLossCost + totalProcessingCost;
  const netGrossProfit = grossProfitBeforeReturns - totalCostOfReturns;
  const profitMarginLossPercent = totalRevenue > 0 ? (totalCostOfReturns / totalRevenue) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-sm">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full mx-auto mb-4">
          <RotateCcw className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Return Rate Impact Calculator</h2>
        <p className="text-gray-600">คำนวณความเสียหายและต้นทุนแฝงจากการตีกลับ / คืนสินค้า</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <Calculator className="w-5 h-5 mr-2 text-red-500" />
            ข้อมูลออเดอร์และการตีกลับ
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ออเดอร์ต่อเดือน</label>
              <input
                type="number"
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ยอดขายเฉลี่ย (AOV)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={averageOrderValue}
                  onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">ต้นทุนสินค้า (COGS %)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Percent className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="number"
                value={cogsPercent}
                onChange={(e) => setCogsPercent(Number(e.target.value))}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 space-y-4">
            <h4 className="text-sm font-semibold text-gray-600 flex items-center">
              <PackageX className="w-4 h-4 mr-2" /> อัตราและค่าใช้จ่ายในการตีกลับ
            </h4>
            
            <div>
              <label className="block text-sm text-gray-700 mb-1">เปอร์เซ็นต์การตีกลับ / คืนของ (Return Rate %)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Percent className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">ค่าดำเนินการต่อ 1 ชิ้น (ค่าส่งไป-กลับ, ค่ากล่อง)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={processingCost}
                  onChange={(e) => setProcessingCost(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">สภาพสินค้าที่ขายต่อได้ (Salvage Value %)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Percent className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={salvageValuePercent}
                  onChange={(e) => setSalvageValuePercent(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">เช่น ตีกลับมาแล้วของพัง 20% แปลว่าเอามาขายใหม่ได้ 80%</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-red-50 p-6 rounded-xl border border-red-100">
            <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
              <TrendingDown className="w-5 h-5 mr-2" />
              ผลกระทบต่อกำไร (Impact Summary)
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-red-100/50">
                <span className="text-red-800">จำนวนออเดอร์ที่ตีกลับ</span>
                <span className="font-semibold text-red-900">
                  {Math.round(returnedOrdersCount)} ออเดอร์
                </span>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
                <p className="text-sm text-gray-500 mb-1">ต้นทุนสูญเปล่ารวม (Total Cost of Returns)</p>
                <p className="text-3xl font-bold text-red-600">
                  ฿{totalCostOfReturns.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className="mt-2 text-xs text-gray-500 flex flex-col gap-1">
                  <span>• ค่าจัดส่งไป-กลับ/แพ็คเกจ: ฿{totalProcessingCost.toLocaleString()}</span>
                  <span>• มูลค่าสินค้าเสียหายที่ขายต่อไม่ได้: ฿{productLossCost.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg shadow-sm text-white">
                  <p className="text-sm text-gray-400 mb-1">ยอดขายที่หายไป (Lost Revenue)</p>
                  <p className="text-xl font-bold">฿{lostRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-red-600 p-4 rounded-lg shadow-sm text-white">
                  <p className="text-sm text-white/80 mb-1">กำไร Margin ที่ลดลง</p>
                  <p className="text-xl font-bold">-{profitMarginLossPercent.toFixed(2)}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-orange-800">
              <strong>ข้อคิด:</strong> ออเดอร์ที่ตีกลับ 1 ชิ้น คุณไม่ได้เสียแค่ "ค่าส่ง" แต่คุณเสีย "โอกาสในการขาย" สินค้าชิ้นนั้นให้คนอื่น แถมยังเสียค่ากล่อง, เทปกาว, ค่าแรงแอดมินที่เสียเวลาแพ็ค และที่แย่ที่สุดคือสินค้าอาจพังจนกลับมาขายต่อไม่ได้
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-red max-w-none">
        <h2>ทำไม "อัตราตีกลับ" (Return Rate) ถึงเป็นฆาตกรเงียบของธุรกิจ E-Commerce?</h2>
        <p>
          สำหรับธุรกิจขายของออนไลน์ โดยเฉพาะกลุ่มที่ใช้ระบบ "เก็บเงินปลายทาง" (COD - Cash on Delivery) หรือธุรกิจเสื้อผ้าแฟชั่น ปัญหา <strong>สินค้าตีกลับ (Returns / Rejects)</strong> เป็นเรื่องที่หลีกเลี่ยงไม่ได้ หลายร้านค้าสนใจแต่ยอดขาย (Revenue) หรือจำนวนออเดอร์ที่พุ่งสูงขึ้น แต่กลับมองข้าม "ต้นทุนแฝง" มหาศาลที่ซ่อนอยู่ในการตีกลับ ซึ่งหากไม่ควบคุมให้ดี อาจทำให้ธุรกิจ <strong>"ยิ่งขาย ยิ่งขาดทุน"</strong> ได้
        </p>

        <h3>ต้นทุนแฝงของสินค้าตีกลับ (The Hidden Cost of Returns)</h3>
        <p>
          เมื่อสินค้า 1 ชิ้นถูกตีกลับหรือลูกค้ายกเลิก/ปฏิเสธรับของ คุณไม่ได้แค่ชวดเงินค่าสินค้านั้น แต่คุณยังมี "ค่าปรับ/ต้นทุนสูญเปล่า" ที่ต้องจ่ายจริง ดังนี้:
        </p>
        <ol>
          <li><strong>ค่าจัดส่งไปและกลับ (Shipping Costs):</strong> บางบริษัทขนส่งคิดค่าส่งขาไป และหากตีกลับอาจมีคิดค่าตีกลับหรือหักเปอร์เซ็นต์ (แล้วแต่นโยบายบริษัทขนส่ง)</li>
          <li><strong>ค่าบรรจุภัณฑ์ (Packaging):</strong> กล่องกระดาษ, บับเบิ้ลกันกระแทก, เทปกาว ที่แกะแล้วมักจะนำกลับมาใช้ใหม่ไม่ได้</li>
          <li><strong>ค่าเสียโอกาสและค่าเสื่อม (Product Loss / Depreciation):</strong> สินค้าบางประเภท (เช่น อาหาร, ต้นไม้) หากตีกลับมาคือ "ทิ้ง 100%" ส่วนสินค้าทั่วไป อาจมีกล่องบุบ ขาด เลอะ หรือตกรุ่น ทำให้ต้องนำมาจัดโปรโมชันลดราคา (Salvage Value)</li>
          <li><strong>ค่าแรงงาน (Labor Cost):</strong> ตั้งแต่แอดมินตอบแชท, คนแพ็คของ, ไปจนถึงคนที่ต้องมานั่งแกะกล่องเช็คสภาพของตีกลับแล้วเอาเข้าสต็อกใหม่</li>
        </ol>

        <h3>วิเคราะห์ผลกระทบต่อกำไรสุทธิ</h3>
        <p>
          ลองจินตนาการว่าคุณมีกำไรสุทธิ (Net Margin) อยู่ที่ออเดอร์ละ 100 บาท แต่การตีกลับ 1 ครั้ง ทำให้คุณเสียค่าส่งแพ็คเกจไป-กลับ 60 บาท และกล่องพังอีก 10 บาท (รวม 70 บาท)
          <br/><br/>
          นั่นหมายความว่า <strong>คุณต้องขายออเดอร์ใหม่ให้สำเร็จอีก 1 ออเดอร์ เพียงเพื่อจะมาชดเชย "ค่าใช้จ่าย" ของออเดอร์ที่ตีกลับไป 1 ออเดอร์นั้น!</strong>
        </p>

        <h3>วิธีลดอัตราการตีกลับให้ต่ำที่สุด</h3>
        <ul>
          <li><strong>ยืนยันออเดอร์ COD เสมอ:</strong> สำหรับลูกค้าเก็บเงินปลายทาง ควรให้แอดมินโทรคอนเฟิร์ม หรือส่ง SMS/Line แจ้งเตือนล่วงหน้า 1 วันก่อนของไปถึง เพื่อลดการปฏิเสธการรับ</li>
          <li><strong>แสดงรายละเอียดสินค้าให้เป๊ะที่สุด:</strong> รูปภาพต้องสีตรงปก มีตารางไซส์ (Size Chart) ที่ชัดเจน, บอกขนาดเป็นเซนติเมตร เพื่อลดปัญหา "ใส่ไม่ได้" หรือ "ไม่เหมือนในรูป"</li>
          <li><strong>แพ็คสินค้าให้แน่นหนา:</strong> ลดการเสียหายระหว่างขนส่ง ซึ่งเป็นสาเหตุหลักที่ลูกค้าขอเคลมหรือคืนเงิน</li>
          <li><strong>แบนลูกค้าที่มีประวัติเสีย:</strong> หากแพลตฟอร์มของคุณทำได้ หรือใช้ระบบหลังบ้าน (CRM) ให้แบล็คลิสต์ หรือบังคับให้ลูกค้าที่เคยตีกลับบ่อยๆ ต้อง "โอนเงินเต็มจำนวน" เท่านั้น ไม่ให้ใช้ COD</li>
        </ul>

        <p>
          การติดตาม Return Rate หรือ COD Reject Rate เป็นประจำ (ควรทำให้ต่ำกว่า 3-5% หากเป็นไปได้) คือเกราะป้องกันผลกำไรของคุณให้ปลอดภัยและเติบโตได้อย่างยั่งยืน
        </p>
      </div>
    </div>
  );
}

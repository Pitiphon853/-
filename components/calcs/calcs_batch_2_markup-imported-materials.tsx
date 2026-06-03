import React, { useState } from 'react';
import { Package, Truck, Percent, CircleDollarSign } from 'lucide-react';

export default function MarkupImportedMaterials({ lang }: any) {
  const [productCost, setProductCost] = useState<number | ''>(10000);
  const [shippingCost, setShippingCost] = useState<number | ''>(2000);
  const [importDutyRate, setImportDutyRate] = useState<number | ''>(10);
  const [markupRate, setMarkupRate] = useState<number | ''>(40);
  const [exchangeRate, setExchangeRate] = useState<number | ''>(35.5);

  // Convert to THB if values are considered foreign. For simplicity in UI, we'll assume inputs are already in base currency or users input THB.
  // Let's add an option to treat productCost & shipping as Foreign Currency
  const [isForeignCurrency, setIsForeignCurrency] = useState<boolean>(false);

  const rate = isForeignCurrency ? (Number(exchangeRate) || 1) : 1;
  const costTHB = (Number(productCost) || 0) * rate;
  const shippingTHB = (Number(shippingCost) || 0) * rate;
  
  const dutyRate = Number(importDutyRate) || 0;
  const markup = Number(markupRate) || 0;

  // CIF = Cost + Insurance + Freight (Simplified here as Cost + Shipping)
  const cifValue = costTHB + shippingTHB; 
  
  // Import Duty = CIF * Duty Rate
  const importDuty = cifValue * (dutyRate / 100);
  
  // Total Landed Cost (excluding VAT, as VAT is usually a pass-through for VAT-registered biz, but impacts margin if not)
  const landedCost = cifValue + importDuty;
  
  // Selling Price = Landed Cost * (1 + Markup)
  const sellingPrice = landedCost * (1 + (markup / 100));
  
  // Gross Profit
  const profit = sellingPrice - landedCost;
  
  // Profit Margin (%)
  const marginRate = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Package className="mr-2" />
          คำนวณต้นทุนสินค้านำเข้าและราคาขาย (Import & Markup)
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              checked={isForeignCurrency}
              onChange={(e) => setIsForeignCurrency(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-5 h-5 cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700">คำนวณด้วยสกุลเงินต่างประเทศ (ต้องคูณอัตราแลกเปลี่ยน)</span>
          </div>

          {isForeignCurrency && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                อัตราแลกเปลี่ยน (บาท ต่อ 1 หน่วยสกุลเงินต่างประเทศ)
              </label>
              <input
                type="number"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 bg-yellow-50"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ค่าสินค้า (Product Cost)
              </label>
              <input
                type="number"
                value={productCost}
                onChange={(e) => setProductCost(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ค่าขนส่งและประกันภัย (Freight & Insurance)
              </label>
              <input
                type="number"
                value={shippingCost}
                onChange={(e) => setShippingCost(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                อัตราภาษีนำเข้า / อากรขาเข้า (%)
              </label>
              <input
                type="number"
                value={importDutyRate}
                onChange={(e) => setImportDutyRate(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Markup ที่ต้องการบวกเพิ่ม (%)
              </label>
              <input
                type="number"
                value={markupRate}
                onChange={(e) => setMarkupRate(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mt-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">สรุปต้นทุนนำเข้า (Landed Cost)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>มูลค่า CIF (ค่าสินค้า + ขนส่ง)</span>
                <span>฿{cifValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>อากรขาเข้า ({dutyRate}%)</span>
                <span>+ ฿{importDuty.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 border-t pt-2 mt-2">
                <span>รวมต้นทุนสุทธิ (Landed Cost)</span>
                <span>฿{landedCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <p className="text-xs text-gray-500 text-right">* ยังไม่รวมภาษีมูลค่าเพิ่ม (VAT) ขาเข้า 7%</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">การตั้งราคาขาย</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-blue-200 pb-2">
                <span className="text-blue-900">กำไรสุทธิต่อชิ้น (Gross Profit)</span>
                <span className="font-semibold text-green-600">฿{profit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between items-center border-b border-blue-200 pb-2">
                <span className="text-blue-900">อัตรากำไร (Profit Margin)</span>
                <span className="font-semibold text-blue-900">{marginRate.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-blue-900 font-bold text-lg">ราคาขายแนะนำ (Selling Price)</span>
                <span className="text-3xl font-bold text-blue-900">฿{sellingPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md prose max-w-none">
        <h2>การคำนวณต้นทุนสินค้านำเข้า และการตั้งราคาด้วย Markup</h2>
        <p>การทำธุรกิจนำเข้าสินค้าจากต่างประเทศ (Import Business) เป็นหนึ่งในธุรกิจที่ได้รับความนิยมสูง อย่างไรก็ตาม ผู้ประกอบการหลายรายมักพลาดเรื่องการตั้งราคาขาย เพราะคำนวณต้นทุนผิดพลาด โดยมักคิดเพียงแค่ "ค่าสินค้า + ค่าขนส่ง" เท่านั้น แต่ในความเป็นจริง การนำเข้าสินค้าอย่างถูกต้องตามกฎหมายยังมี "ต้นทุนแฝง" อื่นๆ อีกหลายประการ โดยเฉพาะ <strong>อากรขาเข้า (Import Duty)</strong></p>
        
        <h3>ต้นทุนนำเข้าที่แท้จริง (Landed Cost) คืออะไร?</h3>
        <p>Landed Cost คือ ต้นทุนทั้งหมดที่เกิดขึ้นตั้งแต่การสั่งซื้อสินค้าจากต่างประเทศ จนกระทั่งสินค้าส่งมาถึงโกดังหรือสถานที่ของผู้ซื้อ ประกอบไปด้วย:</p>
        <ol>
          <li><strong>ค่าสินค้า (Product Cost):</strong> ราคาของตัวสินค้าที่ตกลงกับผู้ขาย (Supplier) มักเป็นราคา FOB (Free On Board) หรือ EXW (Ex Works)</li>
          <li><strong>ค่าขนส่งระหว่างประเทศและประกันภัย (Freight & Insurance):</strong> ค่าใช้จ่ายในการนำของลงเรือหรือเครื่องบิน รวมถึงประกันภัยระหว่างขนส่ง</li>
          <li><strong>อากรขาเข้า (Import Duty):</strong> ภาษีที่กรมศุลกากรเรียกเก็บเมื่อนำสินค้าเข้าประเทศ โดยจะคิดจากฐานราคา <strong>CIF (Cost + Insurance + Freight)</strong> เสมอ อัตราอากรขาเข้าจะแตกต่างกันไปตามประเภทสินค้า (HS Code) ซึ่งอาจมีตั้งแต่ 0% ไปจนถึงกว่า 30% หรือมากกว่านั้น</li>
        </ol>
        <p><em>หมายเหตุ: ภาษีมูลค่าเพิ่ม (VAT) 7% ที่ต้องจ่ายตอนนำเข้า มักจะไม่ถูกนำมารวมใน "ต้นทุนตั้งราคา" หากธุรกิจของคุณจดทะเบียนภาษีมูลค่าเพิ่ม เพราะสามารถนำไปใช้เป็นภาษีซื้อ (Input Tax) เพื่อหักล้างกับภาษีขาย (Output Tax) ได้ แต่ถ้าไม่ได้จดทะเบียน VAT จะต้องนับเป็นต้นทุนด้วย</em></p>

        <h3>ความแตกต่างระหว่าง Markup และ Margin</h3>
        <p>เมื่อเราทราบ Landed Cost หรือต้นทุนสุทธิแล้ว ขั้นตอนต่อไปคือการบวกกำไรเพื่อตั้งราคาขาย ซึ่งมี 2 คำศัพท์ที่มักทำให้สับสน คือ Markup และ Margin:</p>
        <ul>
          <li><strong>Markup (การบวกราคาเพิ่มจากต้นทุน):</strong> คือสัดส่วนของกำไรเมื่อเทียบกับ <strong>ต้นทุน</strong> <br/><em>สูตร: Markup % = (กำไร / ต้นทุน) x 100</em><br/>เช่น ต้นทุน 100 บาท ต้องการ Markup 40% ราคาขายคือ 100 + (100 * 40%) = 140 บาท</li>
          <li><strong>Margin (อัตรากำไรขั้นต้น):</strong> คือสัดส่วนของกำไรเมื่อเทียบกับ <strong>ราคาขาย</strong> <br/><em>สูตร: Margin % = (กำไร / ราคาขาย) x 100</em><br/>ในกรณีข้างต้น กำไร 40 บาท ราคาขาย 140 บาท Margin จะเท่ากับ (40 / 140) x 100 = 28.57%</li>
        </ul>

        <h3>ทำไมการตั้งราคาให้ถูกต้องจึงสำคัญ?</h3>
        <p>การคำนวณ Landed Cost ที่แม่นยำและการเลือกใช้ Markup ที่เหมาะสม จะช่วยให้คุณเห็น <strong>"กำไรที่แท้จริง"</strong> และไม่เผลอขายสินค้าตัดราคาจนตัวเองขาดทุน นอกจากนี้ ควรเผื่อพื้นที่ของ Markup สำหรับเป็นส่วนลด (Discount), ค่าการตลาด, แคมเปญส่งเสริมการขาย, และค่าธรรมเนียมแพลตฟอร์ม (Shopee, Lazada, TikTok) เพื่อให้ธุรกิจสามารถอยู่รอดและเติบโตได้อย่างยั่งยืน</p>
      </div>
    </div>
  );
}

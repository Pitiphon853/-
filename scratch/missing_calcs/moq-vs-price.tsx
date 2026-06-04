"use client";

import React, { useState } from "react";
import { BarChart, TrendingDown, TrendingUp, AlertCircle, ShoppingCart } from "lucide-react";

export default function MoqVsPrice({ lang = "th" }: any) {
  const [opt1Qty, setOpt1Qty] = useState<number>(100);
  const [opt1Price, setOpt1Price] = useState<number>(50);
  const [opt1Shipping, setOpt1Shipping] = useState<number>(1000);

  const [opt2Qty, setOpt2Qty] = useState<number>(500);
  const [opt2Price, setOpt2Price] = useState<number>(40);
  const [opt2Shipping, setOpt2Shipping] = useState<number>(3000);

  const calcOption = (qty: number, price: number, shipping: number) => {
    const q = qty || 0;
    const p = price || 0;
    const s = shipping || 0;
    const totalCost = (q * p) + s;
    const unitCost = q > 0 ? totalCost / q : 0;
    return { totalCost, unitCost };
  };

  const opt1 = calcOption(opt1Qty, opt1Price, opt1Shipping);
  const opt2 = calcOption(opt2Qty, opt2Price, opt2Shipping);

  const isOpt2CheaperPerUnit = opt2.unitCost < opt1.unitCost;
  const unitSavings = Math.abs(opt1.unitCost - opt2.unitCost);
  const percentSavings = opt1.unitCost > 0 ? (unitSavings / opt1.unitCost) * 100 : 0;
  
  const additionalInvestment = opt2.totalCost - opt1.totalCost;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-purple-100 rounded-full">
          <BarChart className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          {lang === "en" ? "MOQ vs Price Calculator" : "เปรียบเทียบ MOQ กับ ราคา (ความคุ้มค่า)"}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Option 1 */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center border-b pb-2">
            <ShoppingCart className="w-5 h-5 mr-2" />
            {lang === "en" ? "Option 1 (Lower Qty)" : "ทางเลือกที่ 1 (จำนวนน้อย / ไม่ติด MOQ)"}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === "en" ? "Quantity (pcs)" : "จำนวน (ชิ้น)"}
              </label>
              <input
                type="number"
                min="1"
                value={opt1Qty}
                onChange={(e) => setOpt1Qty(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === "en" ? "Price per unit" : "ราคาต่อชิ้น"}
              </label>
              <input
                type="number"
                min="0"
                value={opt1Price}
                onChange={(e) => setOpt1Price(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === "en" ? "Total Shipping/Extra Cost" : "ค่าส่ง/ค่าใช้จ่ายอื่นๆ รวม"}
              </label>
              <input
                type="number"
                min="0"
                value={opt1Shipping}
                onChange={(e) => setOpt1Shipping(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">{lang === "en" ? "Total Cost:" : "ต้นทุนรวม:"}</span>
              <span className="font-bold">{opt1.totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="text-gray-800 font-semibold">{lang === "en" ? "Cost per Unit:" : "ต้นทุนต่อชิ้น:"}</span>
              <span className="font-bold text-purple-600">{opt1.unitCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
          </div>
        </div>

        {/* Option 2 */}
        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center border-b border-purple-200 pb-2">
            <ShoppingCart className="w-5 h-5 mr-2" />
            {lang === "en" ? "Option 2 (Higher Qty / MOQ)" : "ทางเลือกที่ 2 (จำนวนมาก / ติด MOQ)"}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === "en" ? "Quantity (pcs)" : "จำนวน (ชิ้น)"}
              </label>
              <input
                type="number"
                min="1"
                value={opt2Qty}
                onChange={(e) => setOpt2Qty(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === "en" ? "Price per unit" : "ราคาต่อชิ้น"}
              </label>
              <input
                type="number"
                min="0"
                value={opt2Price}
                onChange={(e) => setOpt2Price(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === "en" ? "Total Shipping/Extra Cost" : "ค่าส่ง/ค่าใช้จ่ายอื่นๆ รวม"}
              </label>
              <input
                type="number"
                min="0"
                value={opt2Shipping}
                onChange={(e) => setOpt2Shipping(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">{lang === "en" ? "Total Cost:" : "ต้นทุนรวม:"}</span>
              <span className="font-bold">{opt2.totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="text-gray-800 font-semibold">{lang === "en" ? "Cost per Unit:" : "ต้นทุนต่อชิ้น:"}</span>
              <span className="font-bold text-purple-600">{opt2.unitCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="bg-gray-900 rounded-2xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6 text-center text-gray-200">
          {lang === "en" ? "Analysis & Recommendation" : "วิเคราะห์ความคุ้มค่า"}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">{lang === "en" ? "Additional Investment" : "เงินลงทุนที่ต้องจ่ายเพิ่ม"}</p>
            <p className="text-2xl font-bold text-blue-400">
              {additionalInvestment > 0 ? "+" : ""}{additionalInvestment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">{lang === "en" ? "Cost diff per unit" : "ส่วนต่างต้นทุนต่อชิ้น"}</p>
            <div className="flex justify-center items-center">
              {isOpt2CheaperPerUnit ? (
                <TrendingDown className="w-5 h-5 text-green-400 mr-2" />
              ) : (
                <TrendingUp className="w-5 h-5 text-red-400 mr-2" />
              )}
              <p className={`text-2xl font-bold ${isOpt2CheaperPerUnit ? 'text-green-400' : 'text-red-400'}`}>
                {unitSavings.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">{lang === "en" ? "Cost Reduction %" : "ประหยัดต้นทุนไป (ต่อชิ้น)"}</p>
            <p className={`text-2xl font-bold ${isOpt2CheaperPerUnit ? 'text-green-400' : 'text-red-400'}`}>
              {isOpt2CheaperPerUnit ? "-" : "+"}{percentSavings.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-start bg-gray-800 p-4 rounded-xl border border-gray-700">
          <AlertCircle className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-300 leading-relaxed">
            {lang === "en" ? (
              <>
                <strong>Conclusion: </strong> 
                Option 2 requires an additional investment of <strong>{additionalInvestment.toLocaleString()}</strong>. 
                In return, the cost per unit is 
                {isOpt2CheaperPerUnit ? ` reduced by ${unitSavings.toFixed(2)} (${percentSavings.toFixed(2)}%).` : ` increased by ${unitSavings.toFixed(2)}.`}
                {isOpt2CheaperPerUnit && additionalInvestment > 0 ? " Ensure you have enough demand to sell the extra inventory before deciding to bulk buy." : ""}
              </>
            ) : (
              <>
                <strong>สรุปการตัดสินใจ: </strong> 
                การเลือกทางเลือกที่ 2 ต้องใช้เงินลงทุนเพิ่ม <strong>{additionalInvestment.toLocaleString()}</strong> บาท 
                แต่จะทำให้ต้นทุนเฉลี่ยต่อชิ้น 
                {isOpt2CheaperPerUnit ? `ลดลง ${unitSavings.toFixed(2)} บาท (ถูกลง ${percentSavings.toFixed(2)}%)` : `แพงขึ้น ${unitSavings.toFixed(2)} บาท`}
                {isOpt2CheaperPerUnit && additionalInvestment > 0 ? " ทั้งนี้ ควรพิจารณาความสามารถในการระบายสินค้าคงคลัง (Stock) เพื่อไม่ให้เงินทุนจม ก่อนตัดสินใจซื้อจำนวนมากตาม MOQ" : ""}
              </>
            )}
          </p>
        </div>
      </div>

      {/* SEO Article */}
      <div className="mt-12 prose max-w-none border-t pt-8">
        <h2>MOQ คืออะไร? และซื้อเยอะคุ้มกว่าจริงไหม?</h2>
        <p>
          ในการสั่งผลิตหรือสั่งซื้อสินค้าจากโรงงาน โดยเฉพาะการนำเข้าจากจีน (Alibaba, 1688) หรือแม้แต่โรงงานในไทย คำศัพท์หนึ่งที่คุณจะเจอบ่อยมากคือ <strong>MOQ (Minimum Order Quantity)</strong> ซึ่งหมายถึง "ขั้นต่ำในการสั่งซื้อ" ที่โรงงานกำหนดไว้ หากสั่งไม่ถึงยอดนี้ โรงงานจะไม่รับผลิตหรือไม่ให้ราคาขายส่ง
        </p>

        <h3>ทำไมโรงงานต้องมี MOQ?</h3>
        <p>
          โรงงานอุตสาหกรรมมีต้นทุนคงที่ (Fixed Costs) ในการเดินสายพานการผลิตแต่ละครั้ง เช่น การตั้งค่าเครื่องจักร, การทำแม่พิมพ์ (Mold), ค่าแรงงานเริ่มต้น ซึ่งหากผลิตจำนวนน้อยเกินไป ต้นทุนเฉลี่ยต่อชิ้นจะสูงมากจนไม่คุ้มค่า โรงงานจึงต้องกำหนด MOQ เพื่อให้ครอบคลุมต้นทุนตั้งต้นเหล่านี้และเหลือกำไร
        </p>

        <h3>ยิ่งซื้อเยอะ ยิ่งถูกลง (Economies of Scale)</h3>
        <p>
          นี่คือกฎพื้นฐานของการทำธุรกิจ เมื่อเราซื้อสินค้าในจำนวนที่มากขึ้น (ถึงเกณฑ์ MOQ) ราคาต่อชิ้นที่โรงงานเสนอจะถูกลงอย่างเห็นได้ชัด นอกจากนี้ ค่าขนส่งต่อชิ้น (Shipping cost per unit) มักจะลดลงด้วยเมื่อจัดส่งแบบเหมาตู้ (FCL) หรือเหมาพาเลท
        </p>

        <h3>ความเสี่ยงของการซื้อตาม MOQ (กับดักเงินจม)</h3>
        <p>
          แม้ว่าการซื้อจำนวนมากจะทำให้ "ต้นทุนต่อชิ้น" ถูกลง แต่ผู้ประกอบการมือใหม่หลายคนมักพลาดตกหลุมพรางนี้ นั่นคือการ <strong>"ซื้อเกินความสามารถในการขาย"</strong> 
        </p>
        <ul>
          <li><strong>เงินทุนจม (Sunk Cost):</strong> แทนที่จะเอาเงินไปหมุนทำการตลาด กลับต้องเอามาจมกับสต๊อกสินค้าหลังบ้าน</li>
          <li><strong>ค่าเสียโอกาส (Opportunity Cost):</strong> เงินที่ติดอยู่ในสต๊อก อาจนำไปลงทุนกับสินค้าตัวอื่นที่กำลังเป็นกระแสได้ดีกว่า</li>
          <li><strong>ต้นทุนการจัดเก็บ (Holding Cost):</strong> สินค้าเยอะขึ้น ต้องใช้พื้นที่โกดังใหญ่ขึ้น อาจต้องจ้างคนดูแลเพิ่ม และสินค้าบางชนิดมีวันหมดอายุ หรือตกเทรนด์ได้ง่าย</li>
        </ul>

        <h3>วิธีใช้งานเครื่องมือประเมินความคุ้มค่า MOQ</h3>
        <p>
          เพื่อแก้ปัญหาการตัดสินใจยากลำบาก เราจึงสร้างเครื่องมือ "เปรียบเทียบ MOQ กับ ราคา" ขึ้นมา ให้คุณกรอกเปรียบเทียบระหว่าง <strong>"การสั่งจำนวนน้อย (ทดลองตลาด)"</strong> กับ <strong>"การสั่งตาม MOQ (เพื่อเอาราคาถูก)"</strong>
        </p>
        <p>
          เครื่องมือจะช่วยคำนวณว่า คุณต้องจ่ายเงินก้อนเพิ่มขึ้นเท่าไหร่ และต้นทุนต่อชิ้นถูกลงกี่เปอร์เซ็นต์ หากต้นทุนต่อชิ้นถูกลงเพียง 5-10% แต่ต้องจ่ายเงินก้อนเพิ่มเป็นแสน การสั่งจำนวนน้อยในช่วงแรกอาจเป็นทางเลือกที่ปลอดภัยกว่า แต่ถ้าการสั่งแบบ MOQ ทำให้ต้นทุนลดลงถึง 40-50% และคุณมั่นใจในช่องทางการขาย การยอมลงทุนก้อนใหญ่ก็เป็นทางเลือกที่ช่วยเพิ่มกำไรมหาศาล
        </p>
      </div>
    </div>
  );
}

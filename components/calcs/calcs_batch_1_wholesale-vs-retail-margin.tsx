import React, { useState } from 'react';
import { Tags } from 'lucide-react';

export default function WholesaleVsRetailMargin({ lang }: any) {
  const [cogs, setCogs] = useState<number | string>('');
  const [wholesaleMargin, setWholesaleMargin] = useState<number | string>('');
  const [retailMargin, setRetailMargin] = useState<number | string>('');

  const cost = Number(cogs) || 0;
  const wMargin = Number(wholesaleMargin) || 0;
  const rMargin = Number(retailMargin) || 0;

  const wholesalePrice = wMargin < 100 ? cost / (1 - wMargin / 100) : 0;
  const manufacturerProfit = wholesalePrice - cost;

  const retailPrice = rMargin < 100 ? wholesalePrice / (1 - rMargin / 100) : 0;
  const retailerProfit = retailPrice - wholesalePrice;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-purple-100 rounded-full">
          <Tags className="w-8 h-8 text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">คำนวณราคาส่งและราคาปลีก (Wholesale vs Retail Margin)</h1>
          <p className="text-gray-500">คำนวณการตั้งราคาขายและกำไรสำหรับผู้ผลิตและผู้ค้าปลีก</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ต้นทุนสินค้าต่อชิ้น (COGS)</label>
          <input
            type="number"
            value={cogs}
            onChange={(e) => setCogs(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="เช่น 100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">กำไรผู้ผลิตที่ต้องการ (%)</label>
          <input
            type="number"
            value={wholesaleMargin}
            onChange={(e) => setWholesaleMargin(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="เช่น 30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">กำไรผู้ค้าปลีกที่ต้องการ (%)</label>
          <input
            type="number"
            value={retailMargin}
            onChange={(e) => setRetailMargin(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="เช่น 40"
          />
        </div>
      </div>

      {cost > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
            <h2 className="text-lg font-bold text-purple-900 mb-4 text-center">สำหรับผู้ผลิต (Manufacturer)</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">ต้นทุนสินค้า (COGS):</span>
                <span className="font-semibold">{cost.toLocaleString(undefined, {maximumFractionDigits: 2})} บาท</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-bold text-gray-800">ราคาขายส่ง (Wholesale Price):</span>
                <span className="font-bold text-purple-700">{wholesalePrice.toLocaleString(undefined, {maximumFractionDigits: 2})} บาท</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-purple-200">
                <span className="text-gray-600">กำไรต่อชิ้น (Profit):</span>
                <span className="font-semibold text-green-600">+{manufacturerProfit.toLocaleString(undefined, {maximumFractionDigits: 2})} บาท</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h2 className="text-lg font-bold text-indigo-900 mb-4 text-center">สำหรับผู้ค้าปลีก (Retailer)</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">ต้นทุนรับมา (Wholesale Price):</span>
                <span className="font-semibold">{wholesalePrice.toLocaleString(undefined, {maximumFractionDigits: 2})} บาท</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-bold text-gray-800">ราคาขายปลีก (Retail Price):</span>
                <span className="font-bold text-indigo-700">{retailPrice.toLocaleString(undefined, {maximumFractionDigits: 2})} บาท</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-indigo-200">
                <span className="text-gray-600">กำไรต่อชิ้น (Profit):</span>
                <span className="font-semibold text-green-600">+{retailerProfit.toLocaleString(undefined, {maximumFractionDigits: 2})} บาท</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <hr className="my-8 border-gray-200" />

      <article className="prose prose-purple max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ความแตกต่างระหว่างกำไรขายส่งและขายปลีก (Wholesale vs Retail Margin)</h2>
        
        <p>
          ในการตั้งราคาสินค้า ผู้ประกอบการมักจะสับสนระหว่างการบวกกำไรเพิ่มจากต้นทุน (Markup) กับการคิดอัตรากำไรจากราคาขาย (Margin) 
          โดยเฉพาะเมื่อธุรกิจมีการผลิตสินค้าเพื่อขายส่งให้ตัวแทนจำหน่าย (Wholesale) และตัวแทนจำหน่ายนำไปขายปลีกให้ลูกค้าทั่วไป (Retail) 
          การคำนวณและแบ่งสัดส่วนกำไรให้ถูกต้องจึงมีความสำคัญอย่างมาก
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Margin คืออะไร และต่างจาก Markup อย่างไร?</h3>
        <p>
          <strong>Markup (การบวกราคาเพิ่ม):</strong> คือการนำต้นทุนมาบวกเปอร์เซ็นต์กำไรที่ต้องการ เช่น ต้นทุน 100 บาท อยากบวก Markup 50% ราคาขายคือ 100 + (100 * 50%) = 150 บาท<br/>
          <strong>Margin (อัตรากำไรขั้นต้น):</strong> คือสัดส่วนกำไรเมื่อเทียบกับ <em>ราคาขาย</em> เช่น หากคุณต้องการ Margin 50% จากสินค้าต้นทุน 100 บาท ราคาขายจะไม่ใช่ 150 บาท แต่ต้องเป็น 200 บาท เพราะกำไร 100 บาท คิดเป็น 50% ของราคาขาย 200 บาทนั่นเอง
        </p>
        <p>สูตรการหา Margin คือ: <code>ราคาขาย = ต้นทุน / (1 - Margin%)</code></p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การตั้งราคาขายส่ง (Wholesale Price)</h3>
        <p>
          สำหรับผู้ผลิตหรือเจ้าของแบรนด์ คุณจะต้องคำนวณต้นทุนสินค้า (COGS) ซึ่งรวมค่าวัตถุดิบ ค่าแรง และค่าใช้จ่ายในการผลิตทั้งหมด จากนั้นกำหนด <strong>Wholesale Margin</strong> หรือกำไรที่คุณต้องการเมื่อขายล็อตใหญ่ 
          โดยปกติ Wholesale Margin จะต่ำกว่า Retail Margin เนื่องจากเป็นการขายทีละจำนวนมากๆ (Volume Sales) ทำให้ประหยัดค่าการตลาดและค่าบริหารจัดการได้มาก
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การตั้งราคาขายปลีก (Retail Price หรือ MSRP)</h3>
        <p>
          สำหรับผู้ค้าปลีก (Retailer) จะรับซื้อสินค้ามาในราคาขายส่ง (Wholesale Price) ซึ่งถือเป็น "ต้นทุน" ของพวกเขา จากนั้นผู้ค้าปลีกจะต้องบวก <strong>Retail Margin</strong> เข้าไป 
          โดยปกติตัวเลขนี้จะอยู่ระหว่าง 30% ถึง 50% (บางวงการอาจสูงถึง 60-70%) เพื่อให้ครอบคลุมค่าเช่าที่หน้าร้าน ค่าพนักงานขาย ค่าน้ำไฟ และค่าการตลาด 
          ราคาที่ได้ออกมานี้มักจะเป็น "ราคาขายปลีกที่แนะนำ" (MSRP - Manufacturer's Suggested Retail Price)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ข้อควรระวังในการกำหนดโครงสร้างราคา</h3>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>อย่าให้ส่วนแบ่งร้านค้าน้อยเกินไป:</strong> หากคุณตั้ง Retail Margin ให้น้อยเกินไป ร้านค้าหรือตัวแทนจำหน่ายจะไม่มีแรงจูงใจในการเชียร์ขายสินค้าของคุณ</li>
          <li><strong>ระวังสงครามราคา:</strong> หากคุณเปิดรับตัวแทนแบบขายส่ง แต่คุณเองก็ตั้งหน้าร้านขายปลีก (Direct-to-Consumer) ด้วย คุณต้องขายในราคา Retail Price เท่ากับตัวแทน ห้ามตัดราคาตัวแทนเด็ดขาด</li>
          <li><strong>คำนวณภาษีมูลค่าเพิ่ม (VAT):</strong> อย่าลืมว่าถ้าคุณอยู่ในระบบ VAT โครงสร้างราคาข้างต้นมักจะคำนวณก่อนรวม VAT เพื่อให้เห็นกำไรเนื้อแท้จริงๆ</li>
        </ul>
      </article>
    </div>
  );
}

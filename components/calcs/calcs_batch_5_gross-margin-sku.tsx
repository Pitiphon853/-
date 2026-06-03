import React, { useState } from 'react';
import { Package, Calculator, DollarSign, Tag, TrendingUp, AlertCircle, Percent } from 'lucide-react';

export default function GrossMarginSkuCalculator({ lang }: any) {
  const [sellingPrice, setSellingPrice] = useState<number>(1500);
  const [productCost, setProductCost] = useState<number>(500);
  const [packagingCost, setPackagingCost] = useState<number>(50);
  const [shippingCost, setShippingCost] = useState<number>(80);
  const [platformFeePercent, setPlatformFeePercent] = useState<number>(5);

  const platformFee = sellingPrice * (platformFeePercent / 100);
  const totalCogs = productCost + packagingCost + shippingCost + platformFee;
  const grossProfit = sellingPrice - totalCogs;
  
  const grossMarginPercent = sellingPrice > 0 ? (grossProfit / sellingPrice) * 100 : 0;
  const markupPercent = totalCogs > 0 ? (grossProfit / totalCogs) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-sm">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-full mx-auto mb-4">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Gross Margin per SKU Calculator</h2>
        <p className="text-gray-600">คำนวณกำไรขั้นต้น และอัตรากำไร (Margin) ต่อสินค้า 1 ชิ้น</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <Tag className="w-5 h-5 mr-2 text-amber-500" />
            โครงสร้างราคาและต้นทุน
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ราคาขาย (Selling Price)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-semibold text-amber-900 bg-amber-50"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 space-y-4">
            <h4 className="text-sm font-semibold text-gray-600">ต้นทุนขายต่อหน่วย (COGS)</h4>
            
            <div>
              <label className="block text-sm text-gray-700 mb-1">ต้นทุนสินค้า / ผลิต (Product Cost)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={productCost}
                  onChange={(e) => setProductCost(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">ค่ากล่อง / บรรจุภัณฑ์ (Packaging Cost)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">ค่าจัดส่ง / Fulfillment (Shipping Cost)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={shippingCost}
                  onChange={(e) => setShippingCost(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">ค่าธรรมเนียม Platform / ตัดบัตร (%)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Percent className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={platformFeePercent}
                  onChange={(e) => setPlatformFeePercent(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                คิดเป็นเงิน: ฿{platformFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
            <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              สรุปกำไรขั้นต้น
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-amber-100/50">
                <span className="text-gray-600">ต้นทุนรวมทั้งหมด (Total COGS)</span>
                <span className="font-semibold text-gray-800">
                  ฿{totalCogs.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
                <p className="text-sm text-gray-500 mb-1">กำไรขั้นต้นต่อชิ้น (Gross Profit)</p>
                <p className={`text-3xl font-bold ${grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ฿{grossProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg shadow-sm text-white ${grossMarginPercent >= 30 ? 'bg-amber-600' : grossMarginPercent >= 0 ? 'bg-orange-500' : 'bg-red-600'}`}>
                  <p className="text-sm text-white/80 mb-1">Gross Margin</p>
                  <p className="text-2xl font-bold">{grossMarginPercent.toFixed(1)}%</p>
                  <p className="text-xs text-white/70 mt-1">จากราคาขาย</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-sm text-white">
                  <p className="text-sm text-gray-400 mb-1">Markup</p>
                  <p className="text-2xl font-bold">{markupPercent.toFixed(1)}%</p>
                  <p className="text-xs text-gray-400 mt-1">จากต้นทุนรวม</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              <strong>ข้อควรรู้:</strong> กำไรขั้นต้น (Gross Profit) ยังไม่ใช่กำไรสุทธิ เพราะคุณยังต้องนำเงินก้อนนี้ไปหักลบกับ <strong>ค่าใช้จ่ายคงที่</strong> (Fixed Costs) เช่น ค่าโฆษณา, เงินเดือนพนักงาน, ค่าเช่าที่ ก่อนจึงจะเหลือกำไรสุทธิ (Net Profit)
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-amber max-w-none">
        <h2>Gross Margin คืออะไร? ทำไมพ่อค้าแม่ค้าออนไลน์ต้องคำนวณให้แม่น</h2>
        <p>
          ในการตั้งราคาขายสินค้า หรือที่เรียกว่า Pricing Strategy ปัญหาคลาสสิกที่เจ้าของแบรนด์และคนขายของออนไลน์มักเจอคือ <strong>"ขายดี แต่ทำไมไม่มีกำไร"</strong> สาเหตุส่วนใหญ่เกิดจากการคำนวณ <strong>Gross Margin (อัตรากำไรขั้นต้น)</strong> ไม่ครบถ้วน โดยมักจะลืมบวก "ต้นทุนแฝง" เข้าไปในโครงสร้างราคาด้วย
        </p>

        <h3>Gross Margin vs Markup ต่างกันอย่างไร?</h3>
        <p>
          นักธุรกิจหลายคนสับสนระหว่างสองคำนี้ ซึ่งการจำสลับกันอาจทำให้เข้าใจตัวเลขกำไรผิดไปอย่างมหาศาล:
        </p>
        <ul>
          <li><strong>Gross Margin (อัตรากำไรขั้นต้น):</strong> คือ สัดส่วนของ "กำไร" เมื่อเทียบกับ "ราคาขาย" (Selling Price) ตัวเลขนี้จะมีค่าไม่เกิน 100% เสมอ</li>
          <li><strong>Markup (อัตราส่วนบวกเพิ่ม):</strong> คือ สัดส่วนของ "กำไร" เมื่อเทียบกับ "ต้นทุน" (Cost) ซึ่งสามารถมากกว่า 100% ได้ (เช่น ต้นทุน 100 บาท ขาย 300 บาท = Markup 200%)</li>
        </ul>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-center my-4 border border-gray-200">
          สูตร Margin = (ราคาขาย - ต้นทุนรวม) ÷ ราคาขาย × 100 <br/>
          สูตร Markup = (ราคาขาย - ต้นทุนรวม) ÷ ต้นทุนรวม × 100
        </div>
        <p>
          เวลาแพลตฟอร์ม E-commerce (เช่น Shopee, Lazada, TikTok) หรือนักบัญชีพูดถึง % การหักค่าธรรมเนียม <strong>พวกเขาจะหักจาก "ราคาขาย" เสมอ</strong> ดังนั้นการพูดคุยธุรกิจ เราจึงนิยมใช้ <strong>Gross Margin</strong> เป็นมาตรฐานครับ
        </p>

        <h3>ต้นทุนแฝง (COGS) ที่มักลืมคำนวณลงไปในแต่ละ SKU</h3>
        <p>
          Cost of Goods Sold (COGS) หรือ ต้นทุนขายต่อหน่วย ไม่ได้มีแค่ค่าสั่งทำสินค้าจากโรงงานเท่านั้น แต่คุณต้องคำนวณให้ครอบคลุมถึงมือลูกค้าด้วย:
        </p>
        <ol>
          <li><strong>Product Cost:</strong> ค่าผลิต, ค่าสั่งซื้อสินค้า (รวมภาษีนำเข้าและค่าขนส่งจากโรงงานมายังโกดังของคุณ)</li>
          <li><strong>Packaging Cost:</strong> กล่องพัสดุ, บับเบิ้ลกันกระแทก, เทปกาว, การ์ดขอบคุณ, สติ๊กเกอร์แปะหน้ากล่อง</li>
          <li><strong>Fulfillment & Shipping:</strong> ค่าจัดส่งพัสดุ (หากคุณส่งฟรี), ค่าจ้างแพ็คของต่อชิ้น</li>
          <li><strong>Platform & Payment Fee:</strong> ค่าธรรมเนียมคอมมิชชันของแพลตฟอร์ม, ค่าธรรมเนียมรูดบัตรเครดิต, ค่าธรรมเนียมชำระเงินปลายทาง (COD) ซึ่งปัจจุบันมักอยู่ระดับ 5% - 15% ของราคาขาย</li>
        </ol>

        <h3>Gross Margin เท่าไหร่ถึงจะดี? (เกณฑ์มาตรฐานธุรกิจ)</h3>
        <p>
          ไม่มีตัวเลขตายตัวว่า Margin เท่าไหร่ถึงจะดีที่สุด เพราะขึ้นอยู่กับประเภทสินค้า แต่โดยทั่วไป (Rules of Thumb):
        </p>
        <ul>
          <li><strong>สินค้าแฟชั่นและเครื่องสำอาง:</strong> ควรมี Gross Margin 60% - 80% (เพราะต้นทุนการทำการตลาดและตีมแบรนด์สูงมาก)</li>
          <li><strong>อาหารเสริม (Supplements):</strong> ควรมี 70% - 85%</li>
          <li><strong>อุปกรณ์อิเล็กทรอนิกส์ (Gadgets):</strong> มักจะอยู่ที่ 20% - 40% (แข่งขันสูง ราคาเป็นเรื่องเซนซิทีฟ อาศัยขายจำนวนเยอะ)</li>
          <li><strong>สินค้าอุปโภคบริโภคทั่วไป (FMCG):</strong> มักอยู่ที่ 30% - 50%</li>
        </ul>

        <p>
          หากคำนวณแล้วพบว่า Gross Margin ของคุณต่ำกว่า 30% คุณอาจจะเหนื่อยมากในการซื้อโฆษณา (Ads) เพราะกำไรที่เหลือจะไม่พอจ่ายค่า Customer Acquisition Cost (CAC) วิธีแก้คือ คุณต้อง <strong>"ขึ้นราคา"</strong> หรือหาทาง <strong>"ลดต้นทุนรวม (COGS)"</strong> ลงเท่านั้น
        </p>
      </div>
    </div>
  );
}

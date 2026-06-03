import React, { useState } from 'react';
import { ShoppingCart, Percent, DollarSign, TrendingDown } from 'lucide-react';

const GMVCalculator = ({ lang }: any) => {
  const [gmv, setGmv] = useState<number>(1000000);
  const [returns, setReturns] = useState<number>(50000); // Amount
  const [platformFee, setPlatformFee] = useState<number>(5); // Percentage
  const [marketingSubsidies, setMarketingSubsidies] = useState<number>(20000); // Amount
  const [shippingDiscount, setShippingDiscount] = useState<number>(15000); // Amount

  const feeAmount = gmv * (platformFee / 100);
  const netRevenue = gmv - returns - feeAmount - marketingSubsidies - shippingDiscount;
  const takeRate = gmv > 0 ? ((gmv - netRevenue) / gmv) * 100 : 0;
  const netMargin = gmv > 0 ? (netRevenue / gmv) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <ShoppingCart className="w-8 h-8 text-fuchsia-600" />
        <h2 className="text-2xl font-bold text-gray-800">GMV vs Net Revenue Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GMV (ยอดขายรวมบนแพลตฟอร์ม)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={gmv}
                onChange={(e) => setGmv(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 font-semibold text-gray-900"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Gross Merchandise Value ก่อนหักค่าใช้จ่ายใดๆ</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-500" /> Deductions (รายการหัก)
            </h4>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Returns & Cancellations (สินค้าตีกลับ/ยกเลิก)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={returns}
                  onChange={(e) => setReturns(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Platform Fee % (ค่าธรรมเนียมแพลตฟอร์ม)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Percent className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={platformFee}
                  onChange={(e) => setPlatformFee(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Marketing Subsidies (ส่วนลด/คูปอง ที่ผู้ขายออก)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={marketingSubsidies}
                  onChange={(e) => setMarketingSubsidies(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Shipping Discount (ช่วยค่าส่ง)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={shippingDiscount}
                  onChange={(e) => setShippingDiscount(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-fuchsia-50 p-6 rounded-xl flex flex-col justify-center border border-fuchsia-100">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-fuchsia-800 mb-2">Net Revenue (รายได้สุทธิ)</h3>
            <div className="text-4xl font-bold text-fuchsia-700">
              ฿{netRevenue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-fuchsia-600 mt-2">เงินจริงที่จะได้รับเข้ากระเป๋า</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600 font-medium">Initial GMV:</span>
              <span className="font-semibold">฿{gmv.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-red-500 text-sm">
              <span>Total Deductions:</span>
              <span>- ฿{(gmv - netRevenue).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm pt-2">
              <span className="text-gray-600">Effective Take Rate:</span>
              <span className="font-bold text-gray-800">{takeRate.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Net Margin (to GMV):</span>
              <span className="font-bold text-green-600">{netMargin.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-fuchsia max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">ความแตกต่างระหว่าง GMV และ Net Revenue</h2>
        <p>
          ในยุคของการขายของออนไลน์และ E-Commerce บนแพลตฟอร์มอย่าง Shopee, Lazada หรือ TikTok Shop ตัวเลขยอดขายที่โชว์บนหน้า Dashboard มักจะเป็นตัวเลข <strong>GMV (Gross Merchandise Value)</strong> ซึ่งอาจทำให้พ่อค้าแม่ค้าออนไลน์เข้าใจผิดว่านั่นคือ "รายได้จริง" ของตัวเอง การแยกความแตกต่างระหว่าง GMV และ Net Revenue จึงเป็นเรื่องที่คอขาดบาดตายในการทำธุรกิจ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">GMV (Gross Merchandise Value) คืออะไร?</h3>
        <p>
          <strong>GMV</strong> คือมูลค่ารวมของสินค้าที่ถูกกดสั่งซื้อผ่านแพลตฟอร์มในช่วงเวลาหนึ่ง เป็นตัวเลขที่บอกถึง "ขนาดการซื้อขายรวม" (Transaction Volume) <em>ก่อน</em>ที่จะหักค่าใช้จ่ายใดๆ ทั้งสิ้น ตัวเลขนี้มักจะดูสวยงามและแพลตฟอร์มชอบนำมาโปรโมทตอนแคมเปญ Double Day แต่มันไม่ใช่รายได้จริงที่บริษัทจะได้รับ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Net Revenue (รายได้สุทธิ) คืออะไร?</h3>
        <p>
          <strong>Net Revenue</strong> คือเงินรายได้ที่แท้จริงที่ธุรกิจจะได้รับโอนเข้าบัญชีธนาคาร (Actual Cash Received) หลังจากที่นำ GMV ไปหักลบรายการต่างๆ ออกไปแล้ว ได้แก่:
        </p>
        <ul>
          <li><strong>Returns & Cancellations:</strong> สินค้าที่ถูกลูกค้าตีกลับหรือกดยกเลิกออเดอร์ ซึ่ง GMV มักจะนับรวมไปแล้วตอนที่ลูกค้ากดสั่ง</li>
          <li><strong>Platform Fees / Commission:</strong> ค่าคอมมิชชันและค่าธรรมเนียมธุรกรรมการชำระเงินที่แพลตฟอร์มเรียกเก็บ (Take Rate)</li>
          <li><strong>Marketing Subsidies & Vouchers:</strong> คูปองส่วนลด โค้ดส่งฟรี หรือการอุดหนุนราคา ที่ผู้ขายเป็นคนออกค่าใช้จ่ายเอง</li>
          <li><strong>Shipping Fees:</strong> ค่าจัดส่งที่ผู้ขายต้องแบกรับหรือช่วยจ่ายแทนลูกค้า</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมการรู้ Net Revenue ถึงสำคัญ?</h3>
        <p>
          การหลงดีใจกับตัวเลข GMV ที่สูงเกินจริง อาจนำไปสู่หายนะทางการเงินได้ เพราะเมื่อคุณต้องจ่ายค่าโฆษณา (Ad Spend) หรือซื้อสต็อกสินค้า (COGS) คุณต้องใช้เงินสดจริง (Net Revenue) ไม่ใช่เงินในจินตนาการ (GMV)
        </p>
        <p>
          นอกจากนี้ การติดตามส่วนต่างระหว่างสองค่านี้ หรือที่เรียกว่า <strong>Effective Take Rate</strong> (เปอร์เซ็นต์ส่วนสูญเสีย) จะช่วยให้คุณประเมินได้ว่า คุณกำลังเสียค่าธรรมเนียมแฝงให้กับแพลตฟอร์มมากเกินไปหรือไม่ และช่วยในการปรับราคาสินค้า (Pricing Strategy) ให้ครอบคลุมรอยรั่วเหล่านี้ เพื่อรักษาอัตรากำไร (Profit Margin) ให้อยู่รอดได้ในระยะยาว
        </p>
        
        <p className="mt-4 text-sm text-gray-500">
          อ้างอิง: รูปแบบโมเดลธุรกิจของ E-Commerce (Marketplace Business Model) และมาตรฐานการรับรู้รายได้ทางการบัญชี
        </p>
      </div>
    </div>
  );
};

export default GMVCalculator;

import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

export default function CreditCardMdrFee({ lang }: any) {
  const [salesAmount, setSalesAmount] = useState<number | ''>(1000);
  const [productCost, setProductCost] = useState<number | ''>(600);
  const [mdrRate, setMdrRate] = useState<number | ''>(2.5);
  const [includeVatOnMdr, setIncludeVatOnMdr] = useState<boolean>(true);

  const sales = Number(salesAmount) || 0;
  const cost = Number(productCost) || 0;
  const mdr = Number(mdrRate) || 0;

  const baseMdrFee = sales * (mdr / 100);
  const vatOnMdr = includeVatOnMdr ? baseMdrFee * 0.07 : 0;
  const totalMdrFee = baseMdrFee + vatOnMdr;

  const netReceive = sales - totalMdrFee;
  const originalProfit = sales - cost;
  const netProfit = netReceive - cost;

  // Withholding tax calculation (optional, usually 1% or 3% depending on business structure, but standard EDC is often 1% if it's a corporate entity)
  // We'll just show info about it, keeping calc simple for MDR impact

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <CreditCard className="mr-2" />
          คำนวณผลกระทบค่าธรรมเนียมรูดบัตร (MDR)
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ราคาสินค้า/บริการ (บาท)
              </label>
              <input
                type="number"
                value={salesAmount}
                onChange={(e) => setSalesAmount(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ต้นทุนสินค้า (บาท)
              </label>
              <input
                type="number"
                value={productCost}
                onChange={(e) => setProductCost(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                อัตราค่าธรรมเนียมรูดบัตร (MDR) %
              </label>
              <input
                type="number"
                value={mdrRate}
                step="0.1"
                onChange={(e) => setMdrRate(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="เช่น 2.5 หรือ 3"
              />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeVatOnMdr}
                  onChange={(e) => setIncludeVatOnMdr(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-5 h-5"
                />
                <span className="text-sm font-medium text-gray-700">คำนวณภาษีมูลค่าเพิ่ม (VAT 7%) บนค่าธรรมเนียม MDR</span>
              </label>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-md mt-6 border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-3">สรุปค่าธรรมเนียมที่ร้านค้าต้องเสีย</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>ค่าธรรมเนียม MDR ({mdrRate}%)</span>
                <span>฿{baseMdrFee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              {includeVatOnMdr && (
                <div className="flex justify-between">
                  <span>VAT 7% ของค่าธรรมเนียม</span>
                  <span>฿{vatOnMdr.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-red-700 border-t border-red-200 pt-2 mt-2">
                <span>รวมค่าธรรมเนียมสุทธิที่ถูกหัก</span>
                <span>฿{totalMdrFee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">ผลกระทบต่อกำไรของร้านค้า</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span>ยอดเงินที่ลูกค้าจ่าย</span>
                <span>฿{sales.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-blue-200 pb-2">
                <span>ยอดเงินที่ร้านค้าได้รับจริง (โอนเข้าบัญชี)</span>
                <span className="font-semibold text-blue-800">฿{netReceive.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-3 rounded border shadow-sm">
                  <div className="text-xs text-gray-500 mb-1">กำไรกรณีรับเงินสด</div>
                  <div className="text-lg font-bold text-gray-800">
                    ฿{originalProfit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </div>
                  <div className="text-xs text-gray-500">Margin: {sales > 0 ? ((originalProfit / sales) * 100).toFixed(1) : 0}%</div>
                </div>
                <div className="bg-white p-3 rounded border shadow-sm">
                  <div className="text-xs text-blue-600 mb-1 font-semibold">กำไรกรณีลูกค้ารูดบัตร</div>
                  <div className={`text-lg font-bold ${netProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ฿{netProfit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </div>
                  <div className="text-xs text-gray-500">Margin: {sales > 0 ? ((netProfit / sales) * 100).toFixed(1) : 0}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md prose max-w-none">
        <h2>ทำความเข้าใจค่าธรรมเนียมรูดบัตร (MDR)</h2>
        <p>ในยุคสังคมไร้เงินสด (Cashless Society) การเปิดรับชำระเงินด้วยบัตรเครดิตถือเป็นหนึ่งในกลยุทธ์สำคัญที่จะช่วยดึงดูดลูกค้าและเพิ่มยอดขายให้กับร้านค้า อย่างไรก็ตาม สิ่งที่ร้านค้าต้องแลกมาก็คือ <strong>MDR (Merchant Discount Rate)</strong> หรือค่าธรรมเนียมที่ผู้ให้บริการเครื่องรูดบัตร (EDC) หรือ Payment Gateway หักออกจากยอดขายทุกครั้งที่มีการทำรายการ</p>
        
        <h3>MDR คิดอย่างไร และประกอบด้วยอะไรบ้าง?</h3>
        <p>MDR คือค่าธรรมเนียมที่เป็นเปอร์เซ็นต์ (มักจะอยู่ระหว่าง 1.5% - 3.0% ขึ้นอยู่กับประเภทธุรกิจ ประเภทของบัตร และผู้ให้บริการ) โดยปกติแล้ว ค่าธรรมเนียม MDR ที่ร้านค้าถูกหัก จะถูกนำไปแบ่งจ่ายให้กับ 3 ฝ่ายหลักๆ ได้แก่:</p>
        <ol>
          <li><strong>ธนาคารผู้ออกบัตร (Issuing Bank):</strong> ได้รับส่วนแบ่งมากที่สุด (เรียกว่า Interchange Fee) เพื่อเป็นค่าความเสี่ยง ค่าดำเนินการ และต้นทุนในการให้สิทธิประโยชน์ต่างๆ แก่ผู้ถือบัตร</li>
          <li><strong>เครือข่ายบัตร (Card Network):</strong> เช่น Visa, Mastercard, JCB เพื่อเป็นค่าใช้จ่ายในการประมวลผลธุรกรรมผ่านเครือข่าย</li>
          <li><strong>ธนาคารผู้ให้บริการรับบัตร (Acquiring Bank):</strong> ธนาคารที่วางเครื่อง EDC ให้กับร้านค้าของคุณ ได้รับส่วนแบ่งเพื่อครอบคลุมต้นทุนระบบและการให้บริการ</li>
        </ol>

        <h3>ระวัง! ค่าธรรมเนียม MDR มี VAT 7%</h3>
        <p>ผู้ประกอบการหลายท่านมักจะคำนวณแค่ว่า "รูดบัตรเสีย 3%" แต่ในความเป็นจริง ค่าธรรมเนียมที่ธนาคารหักนั้นถือเป็น "ค่าบริการ" ซึ่งตามกฎหมายจะต้องมีการบวกภาษีมูลค่าเพิ่ม (VAT) อีก 7% ของค่าธรรมเนียมนั้นเข้าไปด้วย</p>
        <p>ตัวอย่างเช่น: รูดบัตร 10,000 บาท MDR 3%<br/>
        - ค่าธรรมเนียม MDR = 300 บาท<br/>
        - VAT 7% ของค่าธรรมเนียม (300 x 7%) = 21 บาท<br/>
        - รวมค่าธรรมเนียมสุทธิที่ร้านถูกหัก = 321 บาท (ไม่ใช่แค่ 300 บาท)</p>

        <h3>ผลกระทบของ MDR ต่อกำไรของร้านค้า (Profit Margin)</h3>
        <p>การโดนหัก MDR จะส่งผลกระทบโดยตรงต่อ <strong>"กำไรสุทธิ"</strong> (Net Profit) ของร้านค้า ไม่ใช่แค่กระทบยอดขาย เพราะต้นทุนสินค้า (Cost of Goods Sold) ของร้านค้านั้นคงที่คงเดิม</p>
        <p>ลองพิจารณาธุรกิจที่มีอัตรากำไรขั้นต้นน้อยๆ (Low Margin Business) เช่น สินค้าไอที ที่มีอัตรากำไรเพียง 10% หากลูกค้าซื้อคอมพิวเตอร์ 30,000 บาท ต้นทุน 27,000 บาท กำไรเบื้องต้นคือ 3,000 บาท<br/>
        หากลูกค้ารูดบัตรโดนหัก MDR 3% (บวก VAT เป็น 3.21%) จะโดนหักไป 963 บาท<br/>
        นั่นหมายความว่า <strong>กำไรของร้านค้าจะหายไปถึงเกือบ 1 ใน 3</strong> (จาก 3,000 เหลือ 2,037 บาท)</p>

        <h3>กลยุทธ์การรับมือสำหรับร้านค้า</h3>
        <ul>
          <li><strong>บวกต้นทุน MDR เข้าไปในราคาสินค้า:</strong> การปรับราคาสินค้าให้ครอบคลุมค่าธรรมเนียมบัตรเครดิตไปเลย ถือเป็นวิธีที่โปร่งใสและถูกต้องตามกฎของเครือข่ายบัตร (ซึ่งมักจะห้ามร้านค้าคิด Surcharge จากลูกค้าที่รูดบัตร) แล้วอาจใช้วิธีให้ "ส่วนลดพิเศษเงินสด" แทน</li>
          <li><strong>กำหนดขั้นต่ำในการรูดบัตร:</strong> สำหรับสินค้าราคาถูกมากๆ การรับบัตรเครดิตอาจไม่คุ้มกับต้นทุนการจัดการ ร้านค้าอาจกำหนดว่ายอดซื้อต้องเกิน 500 บาทขึ้นไปจึงจะรับบัตร</li>
          <li><strong>เจรจาต่อรองเรท MDR:</strong> หากร้านค้ามี Transaction Volume หรือยอดรูดรวมต่อเดือนที่สูงมาก สามารถนำตัวเลขนี้ไปเจรจาขอลดอัตรา MDR กับธนาคารผู้ให้บริการได้</li>
        </ul>
      </div>
    </div>
  );
}

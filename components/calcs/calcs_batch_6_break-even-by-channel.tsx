import React, { useState } from 'react';
import { Store, ShoppingCart, Scale, Info } from 'lucide-react';

const BreakEvenChannelCalculator = ({ lang }: any) => {
  const [productPrice, setProductPrice] = useState<number>(1000);
  const [productCost, setProductCost] = useState<number>(400);

  // Retail (Offline) Parameters
  const [retailFixedCost, setRetailFixedCost] = useState<number>(50000); // Rent, staff
  const [retailVariableCost, setRetailVariableCost] = useState<number>(0); // e.g. packaging

  // Online Parameters
  const [onlineFixedCost, setOnlineFixedCost] = useState<number>(10000); // Software, basic ads
  const [onlinePlatformFee, setOnlinePlatformFee] = useState<number>(12); // % fee
  const [onlineShippingCost, setOnlineShippingCost] = useState<number>(50); // absorbed by seller

  // Retail calculations
  const retailContributionMargin = productPrice - productCost - retailVariableCost;
  const retailBreakEvenUnits = retailContributionMargin > 0 ? Math.ceil(retailFixedCost / retailContributionMargin) : 0;
  const retailBreakEvenRevenue = retailBreakEvenUnits * productPrice;

  // Online calculations
  const onlineFeeAmount = (productPrice * onlinePlatformFee) / 100;
  const onlineVariableCostTotal = productCost + onlineFeeAmount + onlineShippingCost;
  const onlineContributionMargin = productPrice - onlineVariableCostTotal;
  const onlineBreakEvenUnits = onlineContributionMargin > 0 ? Math.ceil(onlineFixedCost / onlineContributionMargin) : 0;
  const onlineBreakEvenRevenue = onlineBreakEvenUnits * productPrice;

  // Indifference point (where both channels yield the same profit)
  // Retail Profit = Online Profit
  // (Unit * retailCM) - RetailFixed = (Unit * onlineCM) - OnlineFixed
  // Unit * (retailCM - onlineCM) = RetailFixed - OnlineFixed
  // Unit = (RetailFixed - OnlineFixed) / (retailCM - onlineCM)
  let indifferencePoint = 0;
  if (retailContributionMargin !== onlineContributionMargin) {
    indifferencePoint = (retailFixedCost - onlineFixedCost) / (retailContributionMargin - onlineContributionMargin);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6 text-sky-600">
        <Scale className="w-8 h-8 mr-3" />
        <h1 className="text-2xl font-bold">เครื่องมือเปรียบเทียบจุดคุ้มทุน (หน้าร้าน vs ออนไลน์)</h1>
      </div>

      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">ข้อมูลสินค้าพื้นฐาน</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700">ราคาขายต่อชิ้น (บาท)</label>
            <input type="number" value={productPrice} onChange={(e) => setProductPrice(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-sky-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">ต้นทุนผลิต/รับมา ต่อชิ้น (บาท)</label>
            <input type="number" value={productCost} onChange={(e) => setProductCost(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-sky-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Retail Section */}
        <div className="border border-blue-200 rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3 border-b border-blue-200 flex items-center">
            <Store className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-bold text-blue-800">ช่องทางหน้าร้าน (Retail / Offline)</h3>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm text-gray-700">ค่าใช้จ่ายคงที่ต่อเดือน (ค่าเช่า, เงินเดือน) ฿</label>
              <input type="number" value={retailFixedCost} onChange={(e) => setRetailFixedCost(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-700">ต้นทุนผันแปรอื่นๆ ต่อชิ้น (เช่น ถุงหิ้ว) ฿</label>
              <input type="number" value={retailVariableCost} onChange={(e) => setRetailVariableCost(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-blue-500" />
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">กำไรส่วนเกิน (Contribution Margin):</span>
                <span className="font-semibold text-blue-600">฿{retailContributionMargin} / ชิ้น</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">จุดคุ้มทุน (Units):</span>
                <span className="font-bold text-gray-800">{retailBreakEvenUnits.toLocaleString()} ชิ้น/เดือน</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ยอดขายคุ้มทุน (Revenue):</span>
                <span className="font-bold text-blue-700">฿{retailBreakEvenRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Online Section */}
        <div className="border border-orange-200 rounded-lg overflow-hidden">
          <div className="bg-orange-50 px-4 py-3 border-b border-orange-200 flex items-center">
            <ShoppingCart className="w-5 h-5 text-orange-600 mr-2" />
            <h3 className="font-bold text-orange-800">ช่องทางออนไลน์ (E-commerce / Social)</h3>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm text-gray-700">ค่าใช้จ่ายคงที่ต่อเดือน (ค่าแอดขั้นต่ำ, ระบบ) ฿</label>
              <input type="number" value={onlineFixedCost} onChange={(e) => setOnlineFixedCost(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-orange-500" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700">ค่าธรรมเนียม %</label>
                <input type="number" value={onlinePlatformFee} onChange={(e) => setOnlinePlatformFee(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">ค่าส่ง/แพ็ค (ที่ร้านออก) ฿</label>
                <input type="number" value={onlineShippingCost} onChange={(e) => setOnlineShippingCost(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-orange-500" />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">กำไรส่วนเกิน (Contribution Margin):</span>
                <span className="font-semibold text-orange-600">฿{onlineContributionMargin} / ชิ้น</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">จุดคุ้มทุน (Units):</span>
                <span className="font-bold text-gray-800">{onlineBreakEvenUnits.toLocaleString()} ชิ้น/เดือน</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ยอดขายคุ้มทุน (Revenue):</span>
                <span className="font-bold text-orange-700">฿{onlineBreakEvenRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {indifferencePoint > 0 && (
        <div className="bg-sky-50 p-6 rounded-lg border border-sky-200 mb-8 text-center">
          <h3 className="text-lg font-bold text-sky-800 mb-2">จุดตัดสินใจเลือกช่องทาง (Indifference Point)</h3>
          <p className="text-gray-700 mb-4">
            หากคุณคาดว่าจะขายได้ <strong className="text-2xl text-sky-600 mx-2">{Math.ceil(indifferencePoint).toLocaleString()}</strong> ชิ้นต่อเดือน
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
            <div className="bg-white p-3 rounded shadow-sm flex-1 max-w-xs border border-blue-100">
              <p className="font-semibold text-gray-600">ถ้ายอดขายน้อยกว่านี้</p>
              <p className="text-orange-600 font-bold mt-1">ขายออนไลน์ได้กำไรดีกว่า</p>
              <p className="text-xs text-gray-500 mt-1">(เพราะต้นทุนคงที่ต่ำกว่า)</p>
            </div>
            <div className="bg-white p-3 rounded shadow-sm flex-1 max-w-xs border border-orange-100">
              <p className="font-semibold text-gray-600">ถ้ายอดขายมากกว่านี้</p>
              <p className="text-blue-600 font-bold mt-1">เปิดหน้าร้านได้กำไรดีกว่า</p>
              <p className="text-xs text-gray-500 mt-1">(เพราะกำไรต่อชิ้นสูงกว่า ไม่โดนหัก %)</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 prose max-w-none text-gray-800 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4 text-sky-700">วิเคราะห์จุดคุ้มทุนแยกตามช่องทาง: หน้าร้าน VS ออนไลน์</h2>
        <p>
          ในยุคที่ผู้ประกอบการสามารถเลือกได้ว่าจะเปิดหน้าร้านแบบดั้งเดิม (Retail Store) หรือขายออนไลน์ (E-commerce) คำถามยอดฮิตคือ <strong>"ขายช่องทางไหนคุ้มกว่ากัน?"</strong> การใช้เครื่องมือวิเคราะห์จุดคุ้มทุนและโครงสร้างต้นทุน จะช่วยให้คุณตัดสินใจได้ด้วยตัวเลข ไม่ใช่แค่ความรู้สึก
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ความแตกต่างของโครงสร้างต้นทุน (Cost Structure)</h3>
        
        <h4 className="text-lg font-medium mt-4 mb-2 text-blue-700">1. ช่องทางหน้าร้าน (Retail / Offline)</h4>
        <p>
          ลักษณะเด่นของหน้าร้านคือ <strong>ต้นทุนคงที่ (Fixed Costs) สูง แต่ต้นทุนผันแปร (Variable Costs) ต่ำ</strong>
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>ต้นทุนคงที่สูง:</strong> คุณต้องจ่ายค่าเช่าที่ ค่าตกแต่งร้าน ค่าไฟ และเงินเดือนพนักงานประจำ ไม่ว่าจะขายของได้กี่ชิ้นก็ตาม</li>
          <li><strong>กำไรส่วนเกินต่อชิ้น (Contribution Margin) สูง:</strong> เมื่อลูกค้าเดินมาซื้อที่ร้าน คุณได้รับเงินเต็มเม็ดเต็มหน่วย ไม่ต้องหัก % ให้แพลตฟอร์ม และไม่ต้องจ่ายค่ากล่อง/ค่าขนส่งแพงๆ</li>
        </ul>
        <p><em>ผลลัพธ์:</em> จุดคุ้มทุน (Break-even Point) จะสูง หมายความว่าต้องขายให้ได้จำนวนมากถึงจะไม่ขาดทุน แต่ถ้าผ่านจุดคุ้มทุนไปแล้ว กำไรจะเติบโตอย่างรวดเร็ว (High Operating Leverage)</p>

        <h4 className="text-lg font-medium mt-4 mb-2 text-orange-700">2. ช่องทางออนไลน์ (Online / E-commerce)</h4>
        <p>
          ลักษณะเด่นของออนไลน์คือ <strong>ต้นทุนคงที่ต่ำ แต่ต้นทุนผันแปรสูง</strong>
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>ต้นทุนคงที่ต่ำ:</strong> ไม่ต้องจ่ายค่าเช่าที่แพงๆ ทำงานจากที่บ้านหรือโกดังเล็กๆ ได้</li>
          <li><strong>กำไรส่วนเกินต่อชิ้นต่ำ:</strong> ทุกออเดอร์ที่ขายได้ จะถูกหักค่าธรรมเนียมแพลตฟอร์ม (Platform Fee / Commission) 5-15% และมีต้นทุนค่าแพ็คและค่าขนส่งที่บางครั้งร้านต้องออกเองหรืออุดหนุน</li>
        </ul>
        <p><em>ผลลัพธ์:</em> จุดคุ้มทุนต่ำ เริ่มต้นธุรกิจง่าย โอกาสขาดทุนหนักๆ มีน้อย แต่เมื่อขายได้เยอะมากๆ กำไรอาจจะไม่พุ่งเท่าหน้าร้าน เพราะโดนหักต้นทุนผันแปรทุกๆ ชิ้น</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">จุดตัดสินใจเลือกช่องทาง (Indifference Point)</h3>
        <p>
          เครื่องมือนี้มีการคำนวณ <strong>Indifference Point</strong> หรือจุดที่ทั้งสองช่องทางสร้างกำไรได้เท่ากันพอดี ซึ่งเป็นตัวเลขปริมาณการขาย (หน่วย) ที่สำคัญมาก:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>หากคุณเป็นแบรนด์ใหม่ หรือประเมินว่ายอดขายต่อเดือนจะ <strong>"น้อยกว่า"</strong> จุดนี้: การเน้น <strong>ออนไลน์</strong> จะปลอดภัยกว่าและกำไรดีกว่า</li>
          <li>หากคุณมีฐานลูกค้าชัดเจน หรือมั่นใจว่ายอดขายจะ <strong>"มากกว่า"</strong> จุดนี้แน่ๆ: การเปิด <strong>หน้าร้าน</strong> หรือขยายสาขา จะทำให้คุณเหลือสัดส่วนกำไรที่มากกว่าในระยะยาว</li>
        </ul>
        
        <p className="mt-6 bg-sky-50 border-l-4 border-sky-400 p-4 text-sm rounded">
          <strong>บทสรุป (Omnichannel):</strong> ในโลกธุรกิจยุคใหม่ แบรนด์ที่ประสบความสำเร็จมักไม่เลือกอย่างใดอย่างหนึ่ง แต่ใช้ <em>Omnichannel</em> โดยใช้ออนไลน์เพื่อเข้าถึงลูกค้าหน้าใหม่ (Acquisition) และใช้หน้าร้านเพื่อสร้างประสบการณ์และให้บริการลูกค้าประจำ (Retention) ควบคู่กันไป
        </p>
      </div>
    </div>
  );
};

export default BreakEvenChannelCalculator;

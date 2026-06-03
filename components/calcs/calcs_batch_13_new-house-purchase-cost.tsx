import React, { useState } from 'react';
import { Home, Calculator, DollarSign, Info } from 'lucide-react';

export default function NewHousePurchaseCost({ lang }: any) {
  const isTH = lang === 'TH';
  const [housePrice, setHousePrice] = useState<number>(3000000);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(10);
  const [transferFeePct, setTransferFeePct] = useState<number>(1);
  const [mortgageFeePct, setMortgageFeePct] = useState<number>(1);
  const [meterFee, setMeterFee] = useState<number>(15000);
  const [commonAreaFee, setCommonAreaFee] = useState<number>(50);
  const [landSize, setLandSize] = useState<number>(50);
  const [advanceMonths, setAdvanceMonths] = useState<number>(36);

  const loanAmount = housePrice * (1 - downPaymentPct / 100);
  const downPaymentAmt = housePrice * (downPaymentPct / 100);
  const transferFee = housePrice * (transferFeePct / 100);
  const mortgageFee = loanAmount * (mortgageFeePct / 100);
  const commonAreaTotal = commonAreaFee * landSize * advanceMonths;
  const totalCashNeeded = downPaymentAmt + transferFee + mortgageFee + meterFee + commonAreaTotal;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Home className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'เครื่องคำนวณค่าใช้จ่ายซื้อบ้านมือหนึ่ง' : 'New House Purchase Cost Calculator'}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? 'ราคาบ้าน (บาท)' : 'House Price (THB)'}
            </label>
            <input
              type="number"
              value={housePrice}
              onChange={(e) => setHousePrice(Number(e.target.value))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? 'เงินดาวน์ (%)' : 'Down Payment (%)'}
            </label>
            <input
              type="number"
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isTH ? 'ค่าโอนส่วนผู้ซื้อ (%)' : 'Transfer Fee (%)'}
              </label>
              <input
                type="number"
                value={transferFeePct}
                onChange={(e) => setTransferFeePct(Number(e.target.value))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isTH ? 'ค่าจดจำนอง (%)' : 'Mortgage Fee (%)'}
              </label>
              <input
                type="number"
                value={mortgageFeePct}
                onChange={(e) => setMortgageFeePct(Number(e.target.value))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? 'ค่าประกันมิเตอร์น้ำ-ไฟ (บาท)' : 'Meter Deposit (THB)'}
            </label>
            <input
              type="number"
              value={meterFee}
              onChange={(e) => setMeterFee(Number(e.target.value))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-xs">
                {isTH ? 'ส่วนกลาง/ตร.ว.' : 'Fee/Sq.w.'}
              </label>
              <input
                type="number"
                value={commonAreaFee}
                onChange={(e) => setCommonAreaFee(Number(e.target.value))}
                className="w-full p-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-xs">
                {isTH ? 'ขนาด (ตร.ว.)' : 'Size (Sq.w.)'}
              </label>
              <input
                type="number"
                value={landSize}
                onChange={(e) => setLandSize(Number(e.target.value))}
                className="w-full p-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-xs">
                {isTH ? 'จ่ายล่วงหน้า (เดือน)' : 'Advance (Mo)'}
              </label>
              <input
                type="number"
                value={advanceMonths}
                onChange={(e) => setAdvanceMonths(Number(e.target.value))}
                className="w-full p-2 border rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            {isTH ? 'สรุปค่าใช้จ่ายวันโอน' : 'Summary on Transfer Day'}
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'เงินดาวน์' : 'Down Payment'}:</span>
              <span>฿{downPaymentAmt.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'ค่าธรรมเนียมการโอน' : 'Transfer Fee'}:</span>
              <span>฿{transferFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'ค่าจดจำนอง' : 'Mortgage Fee'}:</span>
              <span>฿{mortgageFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'ค่ามิเตอร์น้ำ-ไฟ' : 'Meter Deposit'}:</span>
              <span>฿{meterFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'ค่าส่วนกลางล่วงหน้า' : 'Advance Common Fee'}:</span>
              <span>฿{commonAreaTotal.toLocaleString()}</span>
            </div>
            <div className="pt-4 mt-4 border-t border-blue-200">
              <div className="flex justify-between font-bold text-xl text-blue-700">
                <span>{isTH ? 'รวมเงินก้อนที่ต้องเตรียม' : 'Total Cash Required'}:</span>
                <span>฿{totalCashNeeded.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-10 prose prose-blue max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isTH ? 'เจาะลึกค่าใช้จ่ายซื้อบ้านมือหนึ่ง คุณต้องเตรียมเงินก้อนเท่าไหร่ในวันโอน?' : 'Understanding New House Purchase Costs'}
        </h2>
        {isTH ? (
          <>
            <p>การตัดสินใจซื้อบ้านมือหนึ่งเป็นก้าวสำคัญของชีวิต แต่นอกเหนือจากราคาบ้านที่คุณต้องพิจารณาแล้ว "ค่าใช้จ่ายในวันโอนกรรมสิทธิ์" ถือเป็นอีกหนึ่งเรื่องสำคัญที่มักทำให้คนซื้อบ้านหลายคนต้องปวดหัวหรือสะดุด เพราะหากเตรียมเงินไม่พอ อาจทำให้การซื้อขายล่าช้า หรือต้องไปกู้หนี้ยืมสินเพิ่มได้ บทความนี้จะพาคุณไปทำความรู้จักกับค่าใช้จ่ายซื้อบ้านมือหนึ่งแบบครบถ้วน ให้คุณวางแผนการเงินได้อย่างมั่นใจ</p>
            <h3>1. เงินดาวน์บ้าน (Down Payment)</h3>
            <p>เงินดาวน์คือเงินก้อนแรกที่คุณต้องจ่ายให้กับโครงการ หากคุณกู้ธนาคารได้ไม่เต็ม 100% โดยทั่วไปจะอยู่ที่ 5-10% ของราคาบ้าน แม้บางโครงการจะจัดโปรโมชั่น "กู้ 100%" แต่การมีเงินดาวน์จะช่วยลดภาระดอกเบี้ยระยะยาวของคุณได้อย่างมาก</p>
            <h3>2. ค่าธรรมเนียมการโอนกรรมสิทธิ์ (Transfer Fee)</h3>
            <p>ตามกฎหมาย ค่าธรรมเนียมการโอนจะอยู่ที่ 2% ของราคาประเมินหรือราคาซื้อขาย (ใช้ราคาที่สูงกว่า) แต่ในกรณีโครงการบ้านมือหนึ่ง มักจะตกลงแบ่งจ่ายคนละครึ่ง (1%) หรือบางโครงการอาจมีโปรโมชั่นฟรีค่าโอนให้คุณเลยก็ได้ อย่าลืมสอบถามโครงการให้ชัดเจน</p>
            <h3>3. ค่าจดจำนอง (Mortgage Fee)</h3>
            <p>หากคุณกู้เงินซื้อบ้าน จะต้องเสียค่าจดจำนอง 1% ของวงเงินกู้ (สูงสุดไม่เกิน 200,000 บาท) ซึ่งเงินส่วนนี้มักตกเป็นภาระของผู้ซื้อ แต่ในบางช่วงเวลา รัฐบาลอาจมีมาตรการกระตุ้นอสังหาฯ โดยลดค่าจดจำนองลงเหลือ 0.01% ซึ่งช่วยประหยัดเงินได้หลายหมื่นบาท</p>
            <h3>4. ค่ามิเตอร์น้ำและมิเตอร์ไฟฟ้า (Utility Deposits)</h3>
            <p>คุณต้องเตรียมเงินค่าประกันมิเตอร์และค่าติดตั้งมิเตอร์น้ำและไฟ ซึ่งมักจะเรียกเก็บในวันโอน โดยทั่วไปจะอยู่ที่ประมาณ 10,000 - 15,000 บาท ขึ้นอยู่กับขนาดแอมป์และนโยบายของการประปาและไฟฟ้าในแต่ละพื้นที่</p>
            <h3>5. ค่าส่วนกลางล่วงหน้า (Advance Common Area Fee)</h3>
            <p>หมู่บ้านจัดสรรจะมีค่าบำรุงรักษาส่วนกลาง ซึ่งคิดตามขนาดพื้นที่บ้าน (ตร.ว.) โครงการส่วนใหญ่จะเรียกเก็บล่วงหน้า 1-3 ปีในวันโอนกรรมสิทธิ์ เพื่อเป็นกองทุนในการดูแลหมู่บ้านในช่วงแรก ตัวอย่างเช่น ค่าส่วนกลาง 50 บาท/ตร.ว./เดือน บ้าน 50 ตร.ว. จ่ายล่วงหน้า 3 ปี = 50 * 50 * 36 = 90,000 บาท</p>
            <h3>สรุป</h3>
            <p>เมื่อรวมค่าใช้จ่ายทั้งหมดนี้ คุณจะเห็นได้ว่าแม้จะกู้บ้านผ่านแล้ว แต่คุณยังต้องเตรียมเงินก้อนไว้อีกอย่างน้อยประมาณ 3-5% ของราคาบ้านเพื่อเป็นค่าใช้จ่ายในวันโอน (ไม่รวมเงินดาวน์และค่าตกแต่ง) การใช้เครื่องคำนวณค่าใช้จ่ายซื้อบ้านมือหนึ่งของเรา จะช่วยให้คุณเห็นภาพรวมและตัวเลขที่ชัดเจน เพื่อให้การซื้อบ้านในฝันของคุณราบรื่นและไม่มีสะดุด</p>
          </>
        ) : (
          <p>Buying a new house involves several upfront costs beyond just the property price and down payment. Transfer fees, mortgage registration fees, utility meter deposits, and advance common area fees can add up significantly. Our calculator helps you estimate the exact total cash you need to prepare for the transfer day, ensuring a smooth and stress-free property acquisition.</p>
        )}
      </article>
    </div>
  );
}

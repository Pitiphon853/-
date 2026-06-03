import React, { useState } from 'react';
import { Building, Calculator, DollarSign } from 'lucide-react';

export default function CondoPurchaseCost({ lang }: any) {
  const isTH = lang === 'TH';
  const [condoPrice, setCondoPrice] = useState<number>(2500000);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(10);
  const [transferFeePct, setTransferFeePct] = useState<number>(1);
  const [mortgageFeePct, setMortgageFeePct] = useState<number>(1);
  const [meterFee, setMeterFee] = useState<number>(5000);
  const [roomSize, setRoomSize] = useState<number>(30);
  const [sinkingFundPerSqM, setSinkingFundPerSqM] = useState<number>(500);
  const [commonAreaFeePerSqM, setCommonAreaFeePerSqM] = useState<number>(45);
  const [advanceMonths, setAdvanceMonths] = useState<number>(12);

  const loanAmount = condoPrice * (1 - downPaymentPct / 100);
  const downPaymentAmt = condoPrice * (downPaymentPct / 100);
  const transferFee = condoPrice * (transferFeePct / 100);
  const mortgageFee = loanAmount * (mortgageFeePct / 100);
  const sinkingFund = roomSize * sinkingFundPerSqM;
  const commonAreaTotal = roomSize * commonAreaFeePerSqM * advanceMonths;
  
  const totalCashNeeded = downPaymentAmt + transferFee + mortgageFee + meterFee + sinkingFund + commonAreaTotal;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Building className="w-8 h-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'เครื่องคำนวณค่าใช้จ่ายซื้อคอนโด' : 'Condo Purchase Cost Calculator'}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? 'ราคาคอนโด (บาท)' : 'Condo Price (THB)'}
            </label>
            <input type="number" value={condoPrice} onChange={(e) => setCondoPrice(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'เงินดาวน์ (%)' : 'Down Payment (%)'}</label>
              <input type="number" value={downPaymentPct} onChange={(e) => setDownPaymentPct(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ขนาดห้อง (ตร.ม.)' : 'Size (Sq.m.)'}</label>
              <input type="number" value={roomSize} onChange={(e) => setRoomSize(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ค่าโอนส่วนผู้ซื้อ (%)' : 'Transfer Fee (%)'}</label>
              <input type="number" value={transferFeePct} onChange={(e) => setTransferFeePct(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ค่าจดจำนอง (%)' : 'Mortgage Fee (%)'}</label>
              <input type="number" value={mortgageFeePct} onChange={(e) => setMortgageFeePct(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ค่าประกันมิเตอร์ไฟฟ้า (บาท)' : 'Meter Deposit (THB)'}</label>
            <input type="number" value={meterFee} onChange={(e) => setMeterFee(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-xs">{isTH ? 'กองทุน/ตร.ม.' : 'Sinking Fund'}</label>
              <input type="number" value={sinkingFundPerSqM} onChange={(e) => setSinkingFundPerSqM(Number(e.target.value))} className="w-full p-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-xs">{isTH ? 'ส่วนกลาง/ตร.ม.' : 'Common Fee'}</label>
              <input type="number" value={commonAreaFeePerSqM} onChange={(e) => setCommonAreaFeePerSqM(Number(e.target.value))} className="w-full p-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-xs">{isTH ? 'ล่วงหน้า (เดือน)' : 'Advance (Mo)'}</label>
              <input type="number" value={advanceMonths} onChange={(e) => setAdvanceMonths(Number(e.target.value))} className="w-full p-2 border rounded-lg text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <h2 className="text-xl font-semibold text-indigo-900 mb-4">{isTH ? 'สรุปค่าใช้จ่ายวันโอน' : 'Summary on Transfer Day'}</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700"><span>{isTH ? 'เงินดาวน์' : 'Down Payment'}:</span><span>฿{downPaymentAmt.toLocaleString()}</span></div>
            <div className="flex justify-between text-gray-700"><span>{isTH ? 'ค่าธรรมเนียมการโอน' : 'Transfer Fee'}:</span><span>฿{transferFee.toLocaleString()}</span></div>
            <div className="flex justify-between text-gray-700"><span>{isTH ? 'ค่าจดจำนอง' : 'Mortgage Fee'}:</span><span>฿{mortgageFee.toLocaleString()}</span></div>
            <div className="flex justify-between text-gray-700"><span>{isTH ? 'ค่ากองทุนส่วนกลาง' : 'Sinking Fund'}:</span><span>฿{sinkingFund.toLocaleString()}</span></div>
            <div className="flex justify-between text-gray-700"><span>{isTH ? 'ค่าส่วนกลางล่วงหน้า' : 'Advance Common Fee'}:</span><span>฿{commonAreaTotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-gray-700"><span>{isTH ? 'ค่ามิเตอร์ไฟฟ้า' : 'Meter Deposit'}:</span><span>฿{meterFee.toLocaleString()}</span></div>
            <div className="pt-4 mt-4 border-t border-indigo-200">
              <div className="flex justify-between font-bold text-xl text-indigo-700">
                <span>{isTH ? 'รวมเงินก้อนที่ต้องเตรียม' : 'Total Cash Required'}:</span>
                <span>฿{totalCashNeeded.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-10 prose prose-indigo max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isTH ? 'คู่มือเตรียมพร้อม! ค่าใช้จ่ายซื้อคอนโด วันโอนกรรมสิทธิ์ต้องจ่ายอะไรบ้าง?' : 'Guide to Condo Purchase Costs in Thailand'}
        </h2>
        {isTH ? (
          <>
            <p>สำหรับคนที่กำลังจะซื้อคอนโด ไม่ว่าจะเป็นเพื่ออยู่อาศัยเองหรือเพื่อการลงทุน สิ่งที่สำคัญไม่แพ้กับการเลือกทำเลและการขอสินเชื่อ คือการเตรียมเงินก้อนสำหรับ "ค่าใช้จ่ายวันโอนกรรมสิทธิ์" เพราะค่าใช้จ่ายเหล่านี้เป็นเงินสดที่คุณต้องควักกระเป๋าจ่ายในวันรับมอบห้อง หากเตรียมเงินไม่พอ อาจทำให้คุณพลาดโอกาสหรือต้องวุ่นวายหาเงินฉุกเฉินได้ บทความนี้จะสรุปค่าใช้จ่ายทั้งหมดที่คุณควรรู้ก่อนซื้อคอนโด</p>
            <h3>1. เงินดาวน์ (Down Payment)</h3>
            <p>เงินดาวน์คือเงินส่วนต่างระหว่างราคาคอนโดกับวงเงินที่คุณกู้ได้จากธนาคาร โดยปกติคอนโดใหม่มักจะให้ผ่อนดาวน์ไปเรื่อยๆ จนกว่าโครงการจะสร้างเสร็จ แต่ถ้าเป็นคอนโดพร้อมอยู่ คุณอาจต้องจ่ายเป็นเงินก้อน 10-20% ของราคาห้อง หรือหากคุณกู้ได้ 100% ก็อาจไม่ต้องจ่ายในส่วนนี้</p>
            <h3>2. ค่าธรรมเนียมการโอนและค่าจดจำนอง</h3>
            <p>ค่าโอนกรรมสิทธิ์คิดเป็น 2% ของราคาประเมิน ซึ่งปกติโครงการและผู้ซื้อจะแบ่งกันจ่ายคนละ 1% ส่วนค่าจดจำนอง (กรณีขอสินเชื่อ) จะคิดที่ 1% ของวงเงินกู้ อย่างไรก็ตาม รัฐบาลมักจะมีมาตรการลดหย่อนค่าโอนและค่าจดจำนองให้กับอสังหาฯ ที่ราคาไม่เกินเกณฑ์ที่กำหนด (เช่น ลดเหลือ 0.01%) ซึ่งช่วยประหยัดเงินได้หลายหมื่นบาท</p>
            <h3>3. ค่ากองทุนส่วนกลาง (Sinking Fund)</h3>
            <p>ข้อนี้เป็นค่าใช้จ่ายเฉพาะสำหรับการซื้อคอนโดใหม่ โดยจะเก็บเพียง "ครั้งเดียว" ในวันโอนกรรมสิทธิ์ เพื่อเป็นกองทุนสำรองของนิติบุคคลในการซ่อมแซมใหญ่ในอนาคต เช่น ทาสีตึกใหม่ เปลี่ยนลิฟต์ อัตราค่ากองทุนมักอยู่ที่ 300 - 600 บาทต่อตารางเมตร ขึ้นอยู่กับระดับของคอนโด ยิ่งห้องใหญ่ก็ยิ่งต้องจ่ายเยอะ</p>
            <h3>4. ค่าส่วนกลางล่วงหน้า (Common Area Fee)</h3>
            <p>ค่าใช้จ่ายในการดูแลพื้นที่ส่วนกลาง เช่น สระว่ายน้ำ ฟิตเนส รปภ. แม่บ้าน โดยจะเก็บเป็นรายเดือนตามขนาดพื้นที่ห้อง (บาท/ตร.ม./เดือน) แต่ในวันโอนกรรมสิทธิ์ โครงการส่วนใหญ่มักจะเรียกเก็บล่วงหน้า 1 ปี (12 เดือน) เพื่อเป็นเงินหมุนเวียนในการบริหารโครงการ</p>
            <h3>5. ค่ารักษามิเตอร์ไฟฟ้า</h3>
            <p>ผู้ซื้อจะต้องจ่ายค่าประกันการใช้ไฟฟ้าและค่าดำเนินการเปลี่ยนชื่อมิเตอร์ ซึ่งมักจะอยู่หลักพันบาท (ประมาณ 3,000 - 5,000 บาท)</p>
            <h3>สรุป</h3>
            <p>การซื้อคอนโดมีค่าใช้จ่ายแฝงที่คุณต้องเตรียมเป็นเงินก้อนในวันโอนกรรมสิทธิ์ ประมาณ 3-5% ของราคาคอนโด (ไม่รวมเงินดาวน์) คุณสามารถใช้เครื่องคำนวณของเราเพื่อประเมินตัวเลขล่วงหน้า ช่วยให้คุณวางแผนการเงินได้อย่างรัดกุมและเป็นเจ้าของคอนโดได้อย่างมีความสุข ไร้กังวลเรื่องเงินช็อต!</p>
          </>
        ) : (
          <p>When buying a condo, you need to prepare cash for the transfer day. This includes the transfer fee, mortgage fee, a one-time sinking fund contribution, advance common area fees for the first year, and meter deposits. Use our calculator to accurately estimate your total out-of-pocket costs.</p>
        )}
      </article>
    </div>
  );
}

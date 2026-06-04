import React, { useState, useEffect } from 'react';
import { Calculator, Home, ArrowRight, DollarSign, PiggyBank, Percent, AlertCircle } from 'lucide-react';

export default function HomeRefinanceSavings({ lang }: any) {
  const isTH = lang === 'th';

  const [balance, setBalance] = useState<number>(3000000);
  const [oldRate, setOldRate] = useState<number>(6.5);
  const [oldTerm, setOldTerm] = useState<number>(20);
  
  const [newRate, setNewRate] = useState<number>(3.5);
  const [newTerm, setNewTerm] = useState<number>(20);
  const [refinanceCost, setRefinanceCost] = useState<number>(35000);

  const [result, setResult] = useState<{
    oldMonthly: number;
    newMonthly: number;
    monthlySavings: number;
    totalSavings: number;
    breakEvenMonths: number;
    isWorthIt: boolean;
  } | null>(null);

  useEffect(() => {
    calculate();
  }, [balance, oldRate, oldTerm, newRate, newTerm, refinanceCost]);

  const pmt = (ratePerPeriod: number, periods: number, presentValue: number) => {
    if (ratePerPeriod === 0) return presentValue / periods;
    return (presentValue * ratePerPeriod * Math.pow(1 + ratePerPeriod, periods)) / 
           (Math.pow(1 + ratePerPeriod, periods) - 1);
  };

  const calculate = () => {
    const rOld = (oldRate / 100) / 12;
    const nOld = oldTerm * 12;
    
    const rNew = (newRate / 100) / 12;
    const nNew = newTerm * 12;

    if (balance <= 0 || oldTerm <= 0 || newTerm <= 0) {
      setResult(null);
      return;
    }

    const oldMonthly = pmt(rOld, nOld, balance);
    const newMonthly = pmt(rNew, nNew, balance);

    const oldTotalCost = oldMonthly * nOld;
    const newTotalCost = (newMonthly * nNew) + refinanceCost;

    const totalSavings = oldTotalCost - newTotalCost;
    const monthlySavings = oldMonthly - newMonthly;
    
    let breakEvenMonths = 0;
    if (monthlySavings > 0 && refinanceCost > 0) {
      breakEvenMonths = refinanceCost / monthlySavings;
    }

    setResult({
      oldMonthly,
      newMonthly,
      monthlySavings,
      totalSavings,
      breakEvenMonths,
      isWorthIt: totalSavings > 0
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
          <Home className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isTH ? "คำนวณยอดรีไฟแนนซ์บ้าน ส่วนต่างความคุ้มค่า" : "Home Refinance Savings Calculator"}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-50 p-5 rounded-xl space-y-4 border border-gray-100">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm">1</span>
              {isTH ? "ข้อมูลสินเชื่อเดิม" : "Current Loan Information"}
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isTH ? "ยอดหนี้คงเหลือ (บาท)" : "Current Loan Balance (THB)"}
              </label>
              <input
                type="number"
                value={balance || ''}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isTH ? "ดอกเบี้ยปัจจุบัน (%)" : "Current Rate (%)"}
                </label>
                <input
                  type="number"
                  value={oldRate || ''}
                  onChange={(e) => setOldRate(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isTH ? "เวลาที่เหลือ (ปี)" : "Remaining (Years)"}
                </label>
                <input
                  type="number"
                  value={oldTerm || ''}
                  onChange={(e) => setOldTerm(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-xl space-y-4 border border-blue-100">
            <h3 className="font-semibold text-blue-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-sm">2</span>
              {isTH ? "ข้อมูลสินเชื่อใหม่ (รีไฟแนนซ์)" : "New Loan Information (Refinance)"}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  {isTH ? "ดอกเบี้ยใหม่ (%)" : "New Rate (%)"}
                </label>
                <input
                  type="number"
                  value={newRate || ''}
                  onChange={(e) => setNewRate(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  {isTH ? "เวลาผ่อนใหม่ (ปี)" : "New Term (Years)"}
                </label>
                <input
                  type="number"
                  value={newTerm || ''}
                  onChange={(e) => setNewTerm(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                {isTH ? "ค่าใช้จ่ายในการรีไฟแนนซ์ (บาท)" : "Refinance Costs (THB)"}
              </label>
              <input
                type="number"
                value={refinanceCost || ''}
                onChange={(e) => setRefinanceCost(Number(e.target.value))}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <p className="text-xs text-blue-600 mt-1">
                {isTH ? "* เช่น ค่าประเมิน, ค่าจดจำนอง, ค่าอากรแสตมป์" : "* e.g., Appraisal, Mortgage, Stamp duty"}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl h-full border border-blue-100 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              {isTH ? "ผลการเปรียบเทียบ" : "Comparison Result"}
            </h3>

            {result ? (
              <div className="space-y-6 flex-grow flex flex-col">
                <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-center w-5/12">
                    <p className="text-xs text-gray-500 mb-1">{isTH ? "ผ่อนเดิม/เดือน" : "Old Monthly"}</p>
                    <p className="text-lg font-bold text-gray-700">
                      {result.oldMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="w-2/12 flex justify-center text-gray-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <div className="text-center w-5/12">
                    <p className="text-xs text-blue-600 mb-1 font-medium">{isTH ? "ผ่อนใหม่/เดือน" : "New Monthly"}</p>
                    <p className="text-lg font-bold text-blue-700">
                      {result.newMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>

                {result.monthlySavings > 0 ? (
                  <div className="bg-green-100 text-green-800 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-200 rounded-lg">
                        <PiggyBank className="w-6 h-6 text-green-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{isTH ? "ประหยัดค่างวดได้เดือนละ" : "Monthly Savings"}</p>
                        <p className="text-2xl font-bold">
                          {result.monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-base font-normal">{isTH ? "บาท" : "THB"}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-100 text-red-800 p-4 rounded-xl border border-red-200">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-6 h-6" />
                      <p className="font-medium text-sm">
                        {isTH ? "ค่างวดใหม่สูงกว่าค่างวดเดิม" : "New monthly payment is higher"}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                    <p className="text-xs text-gray-500 mb-1">{isTH ? "ประหยัดเงินทั้งหมด" : "Total Lifetime Savings"}</p>
                    <p className={`text-xl font-bold ${result.totalSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                    <p className="text-xs text-gray-500 mb-1">{isTH ? "จุดคุ้มทุน (เดือน)" : "Break-even (Months)"}</p>
                    <p className="text-xl font-bold text-gray-800">
                      {result.breakEvenMonths > 0 ? Math.ceil(result.breakEvenMonths) : '-'}
                    </p>
                  </div>
                </div>

                {!result.isWorthIt && (
                  <p className="text-sm text-red-600 text-center mt-2">
                    {isTH ? "* การรีไฟแนนซ์ครั้งนี้อาจไม่คุ้มค่า เพราะค่าใช้จ่ายรวมสูงกว่าเดิม" : "* Refinancing may not be worth it due to higher total costs."}
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-12 prose prose-sm md:prose-base max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isTH ? "รีไฟแนนซ์บ้าน (Refinance) คืออะไร? คุ้มค่าจริงไหมที่ต้องย้ายแบงก์" : "Home Refinancing: Is It Really Worth the Switch?"}
        </h2>
        
        {isTH ? (
          <>
            <p>
              สำหรับคนที่มีบ้านหรือคอนโดที่กำลังผ่อนชำระอยู่ คำว่า "รีไฟแนนซ์" (Refinance) น่าจะเป็นคำที่ได้ยินบ่อยเมื่อผ่อนไปได้สักระยะหนึ่ง โดยปกติแล้วหลังจากผ่านช่วงโปรโมชั่นดอกเบี้ยต่ำในช่วง 3 ปีแรก อัตราดอกเบี้ยมักจะปรับตัวสูงขึ้น (ลอยตัว หรือ MRR) ทำให้ค่างวดที่จ่ายในแต่ละเดือนถูกนำไปตัดเงินต้นน้อยลง แต่ไปจ่ายเป็นดอกเบี้ยมากขึ้น การรีไฟแนนซ์จึงเข้ามาเป็นทางออกสำคัญ
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การรีไฟแนนซ์บ้านคืออะไร?</h3>
            <p>
              การรีไฟแนนซ์บ้าน คือการขอกู้เงินจากสถาบันการเงินแห่งใหม่ (หรือการขอสินเชื่อก้อนใหม่จากธนาคารเดิมที่เรียกว่า Retention) เพื่อนำไปปลดหนี้สินเชื่อบ้านก้อนเดิมที่มีอยู่ จุดประสงค์หลักก็คือเพื่อ <strong>"ลดอัตราดอกเบี้ย"</strong> ให้ต่ำลง หรืออาจจะเป็นการขยายระยะเวลาในการผ่อนชำระเพื่อให้ค่างวดต่อเดือนลดลง ช่วยเพิ่มสภาพคล่องทางการเงินได้
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สิ่งที่ต้องพิจารณาก่อนตัดสินใจรีไฟแนนซ์</h3>
            <p>
              แม้ว่าการรีไฟแนนซ์จะได้ดอกเบี้ยที่ถูกลง แต่ไม่ได้แปลว่าจะคุ้มค่าเสมอไป เพราะการย้ายธนาคารมักจะมี "ค่าใช้จ่ายแฝง" (Refinance Costs) ตามมาด้วย เช่น:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>ค่าจดจำนองใหม่:</strong> ปกติคิดที่ 1% ของยอดวงเงินกู้ (บางธนาคารอาจมีโปรโมชั่นฟรีค่าจดจำนอง)</li>
              <li><strong>ค่าประเมินราคาหลักประกัน:</strong> ประมาณ 2,000 - 3,000 บาท ขึ้นอยู่กับธนาคาร</li>
              <li><strong>ค่าอากรแสตมป์:</strong> 0.05% ของวงเงินกู้ หรือสูงสุดไม่เกิน 10,000 บาท</li>
              <li><strong>เบี้ยประกันอัคคีภัย:</strong> ต้องทำใหม่หากกรมธรรม์เดิมสิ้นสุดหรือยกเลิก</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีคิดความคุ้มค่าและจุดคุ้มทุน</h3>
            <p>
              หลักการง่ายๆ ในการตรวจสอบว่าควรย้ายธนาคารหรือไม่ คือการเปรียบเทียบ <strong>"ส่วนต่างดอกเบี้ยที่ประหยัดได้"</strong> กับ <strong>"ค่าใช้จ่ายในการรีไฟแนนซ์"</strong> โดยเครื่องมือคำนวณด้านบนจะช่วยหา "จุดคุ้มทุน (Break-even Point)" ซึ่งหมายถึงจำนวนเดือนที่คุณต้องผ่อนกับธนาคารใหม่เพื่อให้ส่วนลดค่างวดชดเชยค่าใช้จ่ายที่จ่ายไปตอนย้ายธนาคารจนหมด
            </p>
            <p>
              ตัวอย่างเช่น หากคุณเสียค่าใช้จ่ายในการรีไฟแนนซ์ไป 30,000 บาท แต่คุณประหยัดค่างวดได้เดือนละ 2,000 บาท จุดคุ้มทุนของคุณคือ 15 เดือน (30,000 ÷ 2,000) หมายความว่าหลังจากเดือนที่ 15 เป็นต้นไป คุณจึงจะได้กำไรจากการประหยัดค่างวดอย่างแท้จริง หากคุณมีแผนจะขายบ้านก่อน 15 เดือน การรีไฟแนนซ์อาจไม่ใช่ทางเลือกที่ดีที่สุด
            </p>
            <p>
              อย่าลืมสอบถามธนาคารเดิมถึงความเป็นไปได้ในการขอขอลดดอกเบี้ย (Retention) ก่อนตัดสินใจรีไฟแนนซ์ เนื่องจากจะประหยัดค่าใช้จ่ายเรื่องค่าจดจำนองและค่าธรรมเนียมอื่นๆ ได้มาก แม้อัตราดอกเบี้ยอาจจะไม่ลดลงเท่ากับธนาคารใหม่ แต่เมื่อคำนวณรวมความคุ้มค่าแล้ว อาจจะเป็นทางเลือกที่สะดวกและประหยัดกว่า
            </p>
          </>
        ) : (
          <>
            <p>
              For those paying off a mortgage, "Refinancing" is a term you often hear after a few years. Typically, after the initial 3-year promotional low-interest period ends, the interest rate shifts to a higher floating rate (like MRR). This means your monthly payments contribute less to the principal and more towards interest. Refinancing offers a crucial way out.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">What is Home Refinancing?</h3>
            <p>
              Home refinancing means taking out a new loan from a different financial institution (or securing a new loan package from your current bank, often called "Retention") to pay off your existing mortgage. The primary goal is to <strong>reduce your interest rate</strong>. It can also be used to extend the loan term, thereby lowering your monthly payments and increasing your financial liquidity.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Things to Consider Before Refinancing</h3>
            <p>
              While refinancing might offer a lower interest rate, it’s not always a guaranteed money-saver because moving your loan often incurs "hidden costs" (Refinance Costs), such as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>New Mortgage Registration Fee:</strong> Typically 1% of the loan amount (though some banks offer promotions to waive this).</li>
              <li><strong>Appraisal Fee:</strong> Around 2,000 - 3,000 THB, depending on the bank.</li>
              <li><strong>Stamp Duty:</strong> 0.05% of the loan amount, capped at 10,000 THB.</li>
              <li><strong>Fire Insurance:</strong> You may need to purchase a new policy.</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How to Calculate If It's Worth It</h3>
            <p>
              The simple rule for deciding whether to switch banks is comparing the <strong>"interest saved"</strong> against the <strong>"refinancing costs."</strong> The calculator above helps you find the "Break-even Point." This refers to the number of months you need to stay with the new loan for the monthly savings to cover the upfront costs you paid to switch.
            </p>
            <p>
              For example, if your refinancing costs are 30,000 THB but you save 2,000 THB a month on payments, your break-even point is 15 months (30,000 ÷ 2,000). This means that after the 15th month, you actually start profiting from the savings. If you plan to sell the house before 15 months, refinancing wouldn't be a wise choice.
            </p>
            <p>
              Don't forget to ask your current bank about loan retention (lowering your current rate) before making a move. Retention saves you the hefty 1% mortgage registration fee and other hassles. Even if the offered rate isn't as low as a competitor's, the overall cost savings might make it the better and more convenient option.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

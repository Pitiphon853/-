import React, { useState, useEffect } from 'react';
import { Calculator, CreditCard, AlertCircle, Info } from 'lucide-react';

export default function CreditCardMinimumPayment({ lang }: any) {
  const isTH = lang === 'th';
  
  const [balance, setBalance] = useState<number>(50000);
  const [interestRate, setInterestRate] = useState<number>(16);
  const [minPaymentRate, setMinPaymentRate] = useState<number>(8);
  const [minFixedAmount, setMinFixedAmount] = useState<number>(500);

  const [result, setResult] = useState<{
    months: number;
    totalInterest: number;
    totalPaid: number;
    isInfinite: boolean;
  } | null>(null);

  useEffect(() => {
    calculate();
  }, [balance, interestRate, minPaymentRate, minFixedAmount]);

  const calculate = () => {
    let currentBalance = balance;
    let rate = interestRate / 100;
    let minRate = minPaymentRate / 100;
    let minFixed = minFixedAmount;
    let months = 0;
    let totalInterest = 0;
    let isInfinite = false;

    if (currentBalance <= 0 || rate < 0 || minRate <= 0) {
      setResult({ months: 0, totalInterest: 0, totalPaid: currentBalance, isInfinite: false });
      return;
    }

    while (currentBalance > 0 && months < 1200) {
      let interest = currentBalance * (rate / 12);
      let payment = Math.max(currentBalance * minRate, minFixed);
      
      if (payment <= interest && currentBalance > 0) {
        isInfinite = true;
        break;
      }
      
      if (currentBalance + interest <= payment) {
        payment = currentBalance + interest;
        totalInterest += interest;
        currentBalance = 0;
      } else {
        totalInterest += interest;
        currentBalance = currentBalance + interest - payment;
      }
      months++;
    }

    if (months >= 1200) {
      isInfinite = true;
    }

    setResult({
      months: isInfinite ? 0 : months,
      totalInterest,
      totalPaid: balance + totalInterest,
      isInfinite
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-100 text-red-600 rounded-xl">
          <CreditCard className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isTH ? "คำนวณระยะเวลาปลดหนี้บัตรเครดิต (จ่ายขั้นต่ำ)" : "Credit Card Minimum Payment Calculator"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? "ยอดหนี้บัตรเครดิตคงเหลือ (บาท)" : "Outstanding Balance (THB)"}
            </label>
            <input
              type="number"
              value={balance || ''}
              onChange={(e) => setBalance(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              placeholder="50000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? "อัตราดอกเบี้ยต่อปี (%)" : "Annual Interest Rate (%)"}
            </label>
            <input
              type="number"
              value={interestRate || ''}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              placeholder="16"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? "อัตราจ่ายขั้นต่ำ (%)" : "Minimum Payment Rate (%)"}
            </label>
            <input
              type="number"
              value={minPaymentRate || ''}
              onChange={(e) => setMinPaymentRate(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              placeholder="8"
            />
            <p className="text-xs text-gray-500 mt-1">
              {isTH ? "* ปัจจุบันแบงก์ชาติกำหนดขั้นต่ำที่ 8% (ปี 2567)" : "* BOT current minimum is 8% (2024)"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? "ยอดจ่ายขั้นต่ำสุด (บาท)" : "Minimum Fixed Amount (THB)"}
            </label>
            <input
              type="number"
              value={minFixedAmount || ''}
              onChange={(e) => setMinFixedAmount(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              placeholder="500"
            />
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl h-full border border-red-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-red-600" />
              {isTH ? "ผลการคำนวณ" : "Calculation Result"}
            </h3>

            {result && result.isInfinite ? (
              <div className="bg-red-200 text-red-800 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">{isTH ? "คำเตือน: ยอดหนี้ไม่มีวันหมด!" : "Warning: Infinite Debt!"}</p>
                  <p className="text-sm mt-1">
                    {isTH 
                      ? "ยอดจ่ายขั้นต่ำของคุณน้อยกว่าดอกเบี้ยที่เกิดขึ้นในแต่ละเดือน ทำให้ยอดหนี้เพิ่มขึ้นเรื่อยๆ" 
                      : "Your minimum payment is less than the monthly interest, causing the balance to grow endlessly."}
                  </p>
                </div>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-red-50">
                  <p className="text-sm text-gray-500 mb-1">{isTH ? "ระยะเวลาผ่อนชำระ" : "Payoff Time"}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-red-600">
                      {Math.floor(result.months / 12) > 0 && (
                        <>{Math.floor(result.months / 12)} <span className="text-lg text-gray-600">{isTH ? "ปี" : "Years"}</span> </>
                      )}
                      {result.months % 12} <span className="text-lg text-gray-600">{isTH ? "เดือน" : "Months"}</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-red-50">
                    <p className="text-sm text-gray-500 mb-1">{isTH ? "ดอกเบี้ยรวม" : "Total Interest"}</p>
                    <p className="text-xl font-bold text-gray-800">
                      {result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{isTH ? "บาท" : "THB"}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-red-50">
                    <p className="text-sm text-gray-500 mb-1">{isTH ? "รวมจ่ายทั้งสิ้น" : "Total Paid"}</p>
                    <p className="text-xl font-bold text-gray-800">
                      {result.totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{isTH ? "บาท" : "THB"}</p>
                  </div>
                </div>

                <div className="mt-4 bg-yellow-50 text-yellow-800 p-3 rounded-lg text-sm flex items-start gap-2 border border-yellow-200">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    {isTH 
                      ? "การจ่ายเพียงขั้นต่ำทำให้คุณเสียดอกเบี้ยจำนวนมากและใช้เวลานานกว่าจะหมดหนี้ ควรจ่ายให้มากกว่าขั้นต่ำเพื่อลดต้นลดดอก" 
                      : "Paying only the minimum costs you a lot in interest and takes longer. Pay more to save money and time."}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <article className="mt-12 prose prose-sm md:prose-base max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isTH ? "ความน่ากลัวของการจ่ายบัตรเครดิตขั้นต่ำ: กับดักหนี้ที่หลายคนไม่รู้" : "The Danger of Credit Card Minimum Payments: A Debt Trap"}
        </h2>
        
        {isTH ? (
          <>
            <p>
              การใช้บัตรเครดิตเป็นเรื่องที่สะดวกสบายและมอบสิทธิประโยชน์มากมายหากใช้งานอย่างถูกวิธี แต่หนึ่งในข้อผิดพลาดทางการเงินที่พบบ่อยที่สุดคือ "การจ่ายบัตรเครดิตขั้นต่ำ" หลายคนเลือกที่จะจ่ายเพียงยอดขั้นต่ำที่ระบุไว้ในใบแจ้งหนี้เพื่อรักษาสภาพคล่องทางการเงินในแต่ละเดือน โดยอาจไม่รู้เลยว่ากำลังเดินเข้าสู่กับดักหนี้สินที่อาจใช้เวลาหลายปีกว่าจะหลุดพ้น
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การจ่ายขั้นต่ำคืออะไร?</h3>
            <p>
              ยอดจ่ายขั้นต่ำ (Minimum Payment) คือจำนวนเงินที่น้อยที่สุดที่ธนาคารหรือสถาบันการเงินผู้ให้บริการบัตรเครดิตอนุญาตให้คุณชำระในแต่ละรอบบิล เพื่อให้บัญชีของคุณยังคงสถานะปกติและไม่ถือว่าผิดนัดชำระหนี้ โดยทั่วไปในประเทศไทย อัตราการจ่ายขั้นต่ำจะอยู่ที่ 8% ของยอดเงินต้นคงค้าง (ตามมาตรการชั่วคราวของธนาคารแห่งประเทศไทย) และมีกำหนดขั้นต่ำสุดเป็นตัวเลขที่แน่นอน เช่น ไม่ต่ำกว่า 500 บาท
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมการจ่ายขั้นต่ำถึงอันตราย?</h3>
            <p>
              เมื่อคุณจ่ายเพียงยอดขั้นต่ำ เงินจำนวนนั้นจะถูกนำไปหัก "ดอกเบี้ย" ที่เกิดขึ้นในรอบบิลนั้นก่อน ส่วนที่เหลือจึงจะนำไปหัก "เงินต้น" เนื่องจากดอกเบี้ยบัตรเครดิตมักจะค่อนข้างสูง (สูงสุดที่ 16% ต่อปีในปัจจุบัน) ทำให้เงินที่คุณจ่ายไปถูกนำไปตัดเงินต้นเพียงเล็กน้อย ยอดหนี้คงเหลือจึงลดลงช้ามาก
            </p>
            <p>
              นอกจากนี้ เมื่อยอดหนี้ลดลง ยอดจ่ายขั้นต่ำในเดือนถัดไปก็จะลดลงตามไปด้วย (เพราะคิดเป็นเปอร์เซ็นต์ของยอดคงเหลือ) ยิ่งทำให้การผ่อนชำระลากยาวออกไปอีก ส่งผลให้ดอกเบี้ยสะสมพอกพูนจนในบางครั้งยอดดอกเบี้ยรวมทั้งหมดอาจสูงกว่าเงินต้นที่เรารูดไปในตอนแรกเสียอีก
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีปลดหนี้บัตรเครดิตให้เร็วขึ้น</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>จ่ายให้มากกว่าขั้นต่ำเสมอ:</strong> แม้จะเพิ่มขึ้นเพียง 1,000 หรือ 2,000 บาทต่อเดือน ก็สามารถลดระยะเวลาผ่อนชำระและประหยัดดอกเบี้ยได้มหาศาล</li>
              <li><strong>หยุดสร้างหนี้เพิ่ม:</strong> หากคุณอยู่ในช่วงที่กำลังเคลียร์หนี้บัตรเครดิต ควรหยุดใช้บัตรนั้นๆ ชั่วคราวเพื่อไม่ให้ยอดเงินต้นเพิ่มขึ้น</li>
              <li><strong>รีไฟแนนซ์หรือสินเชื่อส่วนบุคคล:</strong> หากดอกเบี้ยบัตรเครดิตสูงเกินไป ลองพิจารณาขอสินเชื่อส่วนบุคคลที่มีอัตราดอกเบี้ยต่ำกว่า เพื่อนำไปโปะปิดบัตรเครดิต (Debt Consolidation)</li>
              <li><strong>ใช้โบนัสหรือเงินก้อน:</strong> หากมีรายได้พิเศษ เช่น โบนัสประจำปี หรือเงินคืนภาษี ให้นำมาโปะหนี้บัตรเครดิตเป็นอันดับแรก</li>
            </ul>
            <p>
              โปรแกรมคำนวณระยะเวลาปลดหนี้บัตรเครดิต (จ่ายขั้นต่ำ) ด้านบน จะช่วยให้คุณเห็นภาพชัดเจนว่า หากคุณยังคงมีพฤติกรรมการจ่ายเพียงยอดขั้นต่ำ คุณจะต้องติดอยู่กับวงจรหนี้นี้ไปอีกกี่เดือนและกี่ปี รวมทั้งต้องเสียดอกเบี้ยไปอีกเท่าไหร่ การตระหนักรู้ถึงตัวเลขเหล่านี้คือจุดเริ่มต้นที่ดีที่สุดในการปรับเปลี่ยนพฤติกรรมทางการเงินของคุณ เพื่ออิสรภาพทางการเงินที่แท้จริงในอนาคต
            </p>
          </>
        ) : (
          <>
            <p>
              Using a credit card is convenient and offers many benefits when used correctly. However, one of the most common financial mistakes is making only the "minimum payment" on credit card balances. Many people choose to pay just the minimum amount indicated on their statement to maintain monthly liquidity, without realizing they might be stepping into a debt trap that could take years to escape.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">What is a Minimum Payment?</h3>
            <p>
              The minimum payment is the lowest amount your bank or credit card issuer allows you to pay for each billing cycle to keep your account in good standing and avoid default status. In Thailand, the standard minimum payment rate is typically around 8% of the outstanding balance (subject to current Bank of Thailand regulations), often with a fixed minimum floor amount, such as 500 THB.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Why is Paying the Minimum Dangerous?</h3>
            <p>
              When you pay only the minimum, that amount is first applied to the "interest" accrued during the billing cycle. Only the remainder goes toward reducing the "principal." Because credit card interest rates are relatively high (currently up to 16% per year in Thailand), very little of your minimum payment actually reduces the original debt. The outstanding balance decreases at a snail's pace.
            </p>
            <p>
              Furthermore, as the balance decreases slightly, the calculated minimum payment for the next month also decreases (since it's a percentage of the balance). This stretches the repayment period out even further. Over time, the accumulated interest can snowball to the point where you end up paying significantly more in interest than the original purchase amount.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How to Pay Off Credit Card Debt Faster</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Always Pay More Than the Minimum:</strong> Even adding just 1,000 or 2,000 THB extra per month can dramatically reduce your payoff time and save you a fortune in interest.</li>
              <li><strong>Stop Adding New Debt:</strong> While you are actively trying to clear your credit card debt, temporarily stop using the card to prevent the principal from growing.</li>
              <li><strong>Refinance or Debt Consolidation:</strong> If your credit card interest is too high, consider taking out a personal loan with a lower interest rate to pay off the credit card completely.</li>
              <li><strong>Use Windfalls Wisely:</strong> Apply any extra income, such as an annual bonus or a tax refund, directly toward paying down your credit card balance first.</li>
            </ul>
            <p>
              The Credit Card Minimum Payment Calculator above helps you clearly visualize the reality of your debt. By entering your balance and interest rate, you can see exactly how many months and years you will be stuck in this debt cycle if you continue paying only the minimum, and exactly how much money you will waste on interest. Being aware of these numbers is the best starting point for changing your financial habits and achieving true financial freedom.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

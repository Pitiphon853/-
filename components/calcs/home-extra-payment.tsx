import React, { useState, useEffect } from 'react';
import { Calculator, Banknote, CalendarDays, TrendingDown, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomeExtraPayment({ lang }: any) {
  const isTH = lang === 'th';

  const [balance, setBalance] = useState<number>(3000000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(25000);
  const [extraPayment, setExtraPayment] = useState<number>(5000);

  const [result, setResult] = useState<{
    originalMonths: number;
    originalInterest: number;
    newMonths: number;
    newInterest: number;
    monthsSaved: number;
    interestSaved: number;
    error: string | null;
  } | null>(null);

  useEffect(() => {
    calculate();
  }, [balance, interestRate, monthlyPayment, extraPayment]);

  const calculate = () => {
    if (balance <= 0 || interestRate <= 0 || monthlyPayment <= 0 || extraPayment < 0) {
      setResult(null);
      return;
    }

    const ratePerMonth = (interestRate / 100) / 12;
    const minRequiredPayment = balance * ratePerMonth;
    
    if (monthlyPayment <= minRequiredPayment) {
      setResult({
        originalMonths: 0,
        originalInterest: 0,
        newMonths: 0,
        newInterest: 0,
        monthsSaved: 0,
        interestSaved: 0,
        error: isTH 
          ? "ค่างวดปกติน้อยกว่าดอกเบี้ยต่อเดือน ทำให้ยอดหนี้ไม่ลดลง (โปรดเพิ่มค่างวด)" 
          : "Regular payment is less than monthly interest. Debt will never be paid off."
      });
      return;
    }

    // Function to calculate payoff time and total interest
    const simulatePayoff = (principal: number, payment: number) => {
      let currentBal = principal;
      let months = 0;
      let totalInt = 0;

      while (currentBal > 0 && months < 1200) { // Limit to 100 years
        const interest = currentBal * ratePerMonth;
        if (currentBal + interest <= payment) {
          totalInt += interest;
          currentBal = 0;
        } else {
          totalInt += interest;
          currentBal = currentBal + interest - payment;
        }
        months++;
      }
      return { months, totalInt };
    };

    const original = simulatePayoff(balance, monthlyPayment);
    const updated = simulatePayoff(balance, monthlyPayment + extraPayment);

    setResult({
      originalMonths: original.months,
      originalInterest: original.totalInt,
      newMonths: updated.months,
      newInterest: updated.totalInt,
      monthsSaved: original.months - updated.months,
      interestSaved: original.totalInt - updated.totalInt,
      error: null
    });
  };

  const formatTime = (totalMonths: number) => {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    if (years === 0) return `${months} ${isTH ? 'เดือน' : 'm'}`;
    if (months === 0) return `${years} ${isTH ? 'ปี' : 'y'}`;
    return `${years} ${isTH ? 'ปี' : 'y'} ${months} ${isTH ? 'เดือน' : 'm'}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
          <Banknote className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isTH ? "คำนวณยอดโปะบ้าน หมดหนี้เร็วขึ้นกี่ปี" : "Home Extra Payment Calculator"}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? "ยอดหนี้บ้านคงเหลือ (บาท)" : "Current Balance (THB)"}
            </label>
            <input
              type="number"
              value={balance || ''}
              onChange={(e) => setBalance(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? "อัตราดอกเบี้ยต่อปี (%)" : "Interest Rate (%)"}
            </label>
            <input
              type="number"
              value={interestRate || ''}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? "ค่างวดปกติที่จ่ายทุกเดือน (บาท)" : "Regular Monthly Payment (THB)"}
            </label>
            <input
              type="number"
              value={monthlyPayment || ''}
              onChange={(e) => setMonthlyPayment(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-emerald-700 mb-1">
              {isTH ? "ยอดโปะเพิ่มต่อเดือน (บาท)" : "Extra Monthly Payment (THB)"}
            </label>
            <input
              type="number"
              value={extraPayment || ''}
              onChange={(e) => setExtraPayment(Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-emerald-50 text-emerald-900 font-semibold"
            />
          </div>
        </div>

        <div>
          <div className="bg-gray-50 p-6 rounded-2xl h-full border border-gray-200 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-gray-600" />
              {isTH ? "ผลการคำนวณ" : "Results"}
            </h3>

            {result?.error ? (
              <div className="bg-red-100 text-red-800 p-4 rounded-xl text-sm">
                {result.error}
              </div>
            ) : result ? (
              <div className="space-y-6 flex-grow flex flex-col">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-xl text-white shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-4 -mt-4 opacity-20">
                    <CheckCircle2 className="w-24 h-24" />
                  </div>
                  <p className="text-emerald-100 text-sm mb-1">{isTH ? "คุณจะหมดหนี้เร็วขึ้น" : "You will save"}</p>
                  <p className="text-3xl font-bold mb-4">{formatTime(result.monthsSaved)}</p>
                  
                  <p className="text-emerald-100 text-sm mb-1">{isTH ? "ประหยัดดอกเบี้ยไปได้" : "Interest saved"}</p>
                  <p className="text-2xl font-bold">
                    {result.interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-base font-normal">{isTH ? "บาท" : "THB"}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      {isTH ? "ผ่อนแบบเดิม" : "Original Time"}
                    </p>
                    <p className="font-semibold text-gray-800">{formatTime(result.originalMonths)}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <p className="text-xs text-emerald-600 mb-2 flex items-center gap-1 font-medium">
                      <TrendingDown className="w-4 h-4" />
                      {isTH ? "ผ่อนแบบโปะเพิ่ม" : "New Time"}
                    </p>
                    <p className="font-semibold text-emerald-700">{formatTime(result.newMonths)}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-500">{isTH ? "ดอกเบี้ยที่ต้องจ่ายแบบเดิม" : "Original Interest"}</span>
                    <span className="font-medium">{result.originalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-emerald-600 font-medium">{isTH ? "ดอกเบี้ยที่ต้องจ่ายแบบใหม่" : "New Interest"}</span>
                    <span className="font-bold text-emerald-700">{result.newInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <article className="mt-12 prose prose-sm md:prose-base max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isTH ? "พลังของการ 'โปะบ้าน': จ่ายเพิ่มนิดเดียว ชีวิตเปลี่ยนได้จริงหรือ?" : "The Power of Extra Payments: Can It Really Change Your Mortgage?"}
        </h2>
        
        {isTH ? (
          <>
            <p>
              การเป็นหนี้บ้านมักจะเป็นหนี้ก้อนใหญ่ที่สุดและใช้เวลาผ่อนนานที่สุดในชีวิตของคนส่วนใหญ่ (โดยทั่วไปคือ 20-30 ปี) เมื่อคุณดูใบเสร็จค่างวดในแต่ละเดือน คุณอาจจะตกใจที่พบว่าเงินหลายหมื่นบาทที่คุณจ่ายไปนั้น ถูกนำไปตัดเป็น "ดอกเบี้ย" เสียครึ่งหนึ่งหรือมากกว่านั้น และส่วนที่ไปลด "เงินต้น" มีเพียงนิดเดียว นี่คือเหตุผลที่การ <strong>"โปะบ้าน"</strong> (ทำ Extra Payment) เข้ามามีบทบาทสำคัญ
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การโปะบ้านทำงานอย่างไร?</h3>
            <p>
              หลักการทำงานของสินเชื่อบ้านส่วนใหญ่ในประเทศไทยคือการคิดดอกเบี้ยแบบ <strong>ลดต้นลดดอก (Effective Rate)</strong> ซึ่งหมายความว่า ดอกเบี้ยในเดือนถัดไปจะถูกคำนวณจาก "ยอดเงินต้นคงเหลือ" ของเดือนปัจจุบัน
            </p>
            <p>
              ดังนั้น หากคุณจ่ายค่างวดปกติและจ่ายเพิ่ม (โปะ) อีกส่วนหนึ่ง เงินส่วนที่จ่ายเพิ่มนี้จะถูกนำไป <strong>หักเงินต้นแบบ 100%</strong> (เพราะดอกเบี้ยของเดือนนั้นถูกหักจากค่างวดปกติไปหมดแล้ว) เมื่อเงินต้นลดลงอย่างรวดเร็ว ดอกเบี้ยที่เกิดในเดือนต่อๆ ไปก็จะลดลงตาม ทำให้ค่างวดในอนาคตมีน้ำหนักไปตัดเงินต้นได้มากขึ้นเรื่อยๆ เกิดเป็นผลกระทบแบบลูกโซ่ที่ทรงพลัง
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">แค่หลักพัน ก็ประหยัดได้หลักล้าน</h3>
            <p>
              หลายคนคิดว่าการโปะบ้านจะต้องใช้เงินก้อนใหญ่ทีละมากๆ แต่ความเป็นจริงแล้ว การโปะอย่างสม่ำเสมอทุกเดือน แม้เพียงเดือนละ 1,000 - 5,000 บาท ก็สามารถสร้างความเปลี่ยนแปลงที่มหาศาลได้ ลองใช้เครื่องคำนวณด้านบนเพื่อดูว่า การจ่ายเพิ่มแค่ 10-20% ของค่างวดปกติ สามารถช่วยร่นระยะเวลาผ่อนไปได้ 5-10 ปี และประหยัดดอกเบี้ยไปได้หลายแสนหรือเป็นล้านบาท!
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เทคนิคการโปะบ้านให้มีประสิทธิภาพสูงสุด</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>โปะพร้อมค่างวด:</strong> หลายธนาคารให้คุณจ่ายยอดโปะในวันเดียวกันหรือพร้อมกับค่างวดปกติได้เลย เพื่อให้แน่ใจว่ายอดโปะนั้นไปตัดเงินต้นทั้งหมด</li>
              <li><strong>ใช้โบนัสโปะก้อนใหญ่:</strong> หากได้เงินก้อนจากโบนัสประจำปี การนำมาโปะบ้านเพียงปีละ 1 ครั้ง ก็ช่วยลดยอดเงินต้นได้มหาศาล</li>
              <li><strong>รีไฟแนนซ์ควบคู่กับการโปะ:</strong> การย้ายแบงก์เพื่อได้ดอกเบี้ยต่ำลง แล้วยังคงจ่ายค่างวดด้วย "จำนวนเงินเท่าเดิม" ส่วนต่างที่เกิดขึ้นจะกลายเป็นการโปะโดยอัตโนมัติ โดยที่คุณไม่ต้องควักกระเป๋าเพิ่ม</li>
            </ul>
            <p>
              อิสรภาพทางการเงินอยู่ใกล้กว่าที่คุณคิด การมีวินัยในการโปะบ้านแม้เพียงเล็กน้อยในวันนี้ จะช่วยให้คุณหมดหนี้และได้โฉนดบ้านมาครอบครองได้เร็วขึ้นอย่างแน่นอน
            </p>
          </>
        ) : (
          <>
            <p>
              A mortgage is usually the largest debt and takes the longest time to pay off in most people's lives (typically 20-30 years). When you look at your monthly statement, you might be shocked to find that half or more of your payment goes towards "interest," and only a small fraction reduces the "principal." This is exactly why making an <strong>"extra payment"</strong> plays such a vital role.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How Do Extra Payments Work?</h3>
            <p>
              Most home loans in Thailand are calculated on an <strong>Effective Rate (reducing balance)</strong> basis. This means the interest for the upcoming month is calculated strictly on the "remaining principal balance" of the current month.
            </p>
            <p>
              Therefore, if you pay your regular monthly installment and add an extra amount, that extra payment goes <strong>100% towards reducing the principal</strong> (since the regular payment has already covered that month's interest). When your principal decreases rapidly, the interest generated in subsequent months also decreases. This allows more of your future regular payments to attack the principal, creating a powerful compounding effect.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Small Amounts Lead to Massive Savings</h3>
            <p>
              Many people assume that to make a dent in a mortgage, you need to make massive lump-sum payments. In reality, consistently making extra payments every month—even just 1,000 to 5,000 THB—can cause a monumental shift. Try using the calculator above; adding just 10-20% on top of your regular payment can shave 5-10 years off your loan term and save you hundreds of thousands, or even millions, in interest!
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Tips for Effective Extra Payments</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Pay on the Same Day:</strong> Many banks recommend making your extra payment on the exact same day as your regular payment to ensure 100% of it applies directly to the principal.</li>
              <li><strong>Use Windfalls:</strong> If you receive an annual bonus or tax refund, applying a lump sum once a year dramatically reduces your principal balance.</li>
              <li><strong>Combine with Refinancing:</strong> If you refinance to a lower interest rate, continue paying your <em>old</em> monthly payment amount. The difference automatically acts as an extra principal payment without impacting your current cash flow.</li>
            </ul>
            <p>
              Financial freedom is closer than you think. Building the discipline to make even small extra payments on your mortgage today guarantees you'll be debt-free and hold the title deed to your home much sooner.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

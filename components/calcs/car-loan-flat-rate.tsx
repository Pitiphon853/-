import React, { useState, useEffect } from 'react';
import { Calculator, Car, Banknote, Percent, Calendar } from 'lucide-react';

export default function CarLoanFlatRate({ lang }: any) {
  const isTH = lang === 'th';

  const [carPrice, setCarPrice] = useState<number>(800000);
  const [downType, setDownType] = useState<'percent' | 'amount'>('percent');
  const [downPercent, setDownPercent] = useState<number>(20);
  const [downAmount, setDownAmount] = useState<number>(160000);
  
  const [interestRate, setInterestRate] = useState<number>(2.5);
  const [termYears, setTermYears] = useState<number>(5);

  const [result, setResult] = useState<{
    downPaymentValue: number;
    financedAmount: number;
    interestPerYear: number;
    totalInterest: number;
    totalLoan: number;
    monthlyPayment: number;
  } | null>(null);

  // Sync down payment fields
  useEffect(() => {
    if (downType === 'percent') {
      setDownAmount(carPrice * (downPercent / 100));
    } else {
      setDownPercent((downAmount / carPrice) * 100);
    }
  }, [carPrice, downPercent, downAmount, downType]);

  useEffect(() => {
    calculate();
  }, [carPrice, downType, downPercent, downAmount, interestRate, termYears]);

  const calculate = () => {
    let dpValue = downType === 'percent' ? carPrice * (downPercent / 100) : downAmount;
    
    if (carPrice <= 0 || dpValue < 0 || interestRate < 0 || termYears <= 0) {
      setResult(null);
      return;
    }

    if (dpValue > carPrice) dpValue = carPrice;

    const financedAmount = carPrice - dpValue;
    const interestPerYear = financedAmount * (interestRate / 100);
    const totalInterest = interestPerYear * termYears;
    const totalLoan = financedAmount + totalInterest;
    const monthlyPayment = totalLoan / (termYears * 12);

    setResult({
      downPaymentValue: dpValue,
      financedAmount,
      interestPerYear,
      totalInterest,
      totalLoan,
      monthlyPayment
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
          <Car className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isTH ? "คำนวณค่างวดผ่อนรถใหม่ (Flat Rate)" : "New Car Loan Calculator"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? "ราคารถ (บาท)" : "Car Price (THB)"}
            </label>
            <input
              type="number"
              value={carPrice || ''}
              onChange={(e) => setCarPrice(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-end mb-1">
              <label className="block text-sm font-medium text-gray-700">
                {isTH ? "เงินดาวน์" : "Down Payment"}
              </label>
              <div className="flex space-x-2">
                <button 
                  className={`text-xs px-2 py-1 rounded ${downType === 'percent' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
                  onClick={() => setDownType('percent')}
                >
                  %
                </button>
                <button 
                  className={`text-xs px-2 py-1 rounded ${downType === 'amount' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
                  onClick={() => setDownType('amount')}
                >
                  THB
                </button>
              </div>
            </div>
            
            {downType === 'percent' ? (
              <div className="relative">
                <input
                  type="number"
                  value={downPercent || ''}
                  onChange={(e) => setDownPercent(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <span className="absolute right-4 top-2.5 text-gray-500">%</span>
              </div>
            ) : (
              <input
                type="number"
                value={downAmount || ''}
                onChange={(e) => setDownAmount(Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isTH ? "ดอกเบี้ยต่อปี (%)" : "Interest Rate (%)"}
              </label>
              <input
                type="number"
                value={interestRate || ''}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isTH ? "ระยะเวลา (ปี)" : "Term (Years)"}
              </label>
              <select
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(y => (
                  <option key={y} value={y}>{y} {isTH ? 'ปี' : 'Years'} ({y * 12} {isTH ? 'งวด' : 'months'})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-6 rounded-2xl h-full border border-blue-100 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              {isTH ? "ยอดผ่อนชำระ" : "Payment Result"}
            </h3>

            {result ? (
              <div className="space-y-4 flex-grow flex flex-col">
                <div className="bg-blue-600 text-white p-5 rounded-xl text-center shadow-md">
                  <p className="text-blue-100 text-sm mb-1">{isTH ? "ผ่อนเดือนละ" : "Monthly Payment"}</p>
                  <p className="text-4xl font-bold">
                    {result.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-blue-200 mt-1">{isTH ? "บาท / เดือน" : "THB / Month"}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white p-3 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500">{isTH ? "เงินดาวน์" : "Down Payment"}</p>
                    <p className="font-semibold text-gray-800">{result.downPaymentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500">{isTH ? "ยอดจัด (ยอดกู้)" : "Financed Amount"}</p>
                    <p className="font-semibold text-blue-700">{result.financedAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500">{isTH ? "ดอกเบี้ยรวม" : "Total Interest"}</p>
                    <p className="font-semibold text-red-600">{result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500">{isTH ? "ยอดรวมทั้งสิ้น" : "Total Loan"}</p>
                    <p className="font-semibold text-gray-800">{result.totalLoan.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <article className="mt-12 prose prose-sm md:prose-base max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isTH ? "ความเข้าใจผิดเรื่องดอกเบี้ยรถใหม่: ดอกเบี้ยคงที่ (Flat Rate) คืออะไร?" : "Understanding New Car Loans: What is a Flat Interest Rate?"}
        </h2>
        
        {isTH ? (
          <>
            <p>
              เมื่อเราเดินเข้าไปในโชว์รูมเพื่อซื้อรถป้ายแดง เซลล์มักจะเสนอโปรโมชั่นดอกเบี้ยต่ำ เช่น "ดอกเบี้ยเพียง 1.99% ต่อปี!" ตัวเลขนี้ฟังดูน้อยมากเมื่อเทียบกับดอกเบี้ยบ้าน (ที่มักจะ 3-6%) แต่สิ่งที่หลายคนอาจไม่รู้คือ การคิดดอกเบี้ยของสินเชื่อรถยนต์นั้นใช้ระบบ <strong>"Flat Rate" (อัตราดอกเบี้ยคงที่)</strong> ซึ่งแตกต่างจากระบบลดต้นลดดอก (Effective Rate) ของสินเชื่อบ้านอย่างสิ้นเชิง
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ดอกเบี้ยแบบ Flat Rate คิดอย่างไร?</h3>
            <p>
              ในระบบ Flat Rate ดอกเบี้ยทั้งหมดที่คุณต้องจ่ายตลอดอายุสัญญา จะถูกคำนวณล่วงหน้าตั้งแต่วันแรกจาก "ยอดเงินกู้เต็มจำนวน" และจะถูกนำไปบวกเข้ากับเงินต้นทันที จากนั้นจึงหารเฉลี่ยเท่าๆ กันตามจำนวนเดือนที่คุณเลือกผ่อน
            </p>
            <p>
              <strong>สูตรคำนวณง่ายๆ:</strong> <br />
              ดอกเบี้ยทั้งหมด = ยอดจัด (ราคารถ - เงินดาวน์) × อัตราดอกเบี้ย % × จำนวนปีที่ผ่อน <br />
              ค่างวดต่อเดือน = (ยอดจัด + ดอกเบี้ยทั้งหมด) ÷ จำนวนเดือนที่ผ่อน
            </p>
            <p>
              หมายความว่า แม้คุณจะผ่อนไปจนยอดเงินต้นเหลือน้อยแค่ไหน ดอกเบี้ยก็ถูกคิดจากยอดตั้งต้นไปเรียบร้อยแล้ว นี่คือเหตุผลว่าทำไมดอกเบี้ยรถ 2% แบบ Flat Rate ถึงเทียบเท่ากับดอกเบี้ยแบบลดต้นลดดอกที่เกือบๆ 4%
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เงินดาวน์และระยะเวลาผ่อน มีผลอย่างไร?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>เงินดาวน์ (Down Payment):</strong> ยิ่งวางเงินดาวน์สูง ยอดจัด (ยอดกู้) ก็จะน้อยลง ทำให้ฐานในการคำนวณดอกเบี้ยน้อยลงตามไปด้วย ปกติแล้วไฟแนนซ์มักจะอนุมัติง่ายขึ้นและให้ดอกเบี้ยถูกลงหากดาวน์ 20-25% ขึ้นไป</li>
              <li><strong>ระยะเวลาผ่อน (Term):</strong> การผ่อนนาน (เช่น 72 หรือ 84 งวด) อาจทำให้ค่างวดต่อเดือนดูถูกลง แต่คุณจะเสีย "ดอกเบี้ยรวม" มหาศาล แถมรถยนต์ยังเป็นสินทรัพย์ที่เสื่อมราคาเร็ว บางครั้งผ่อนยังไม่หมด ราคารถในตลาดอาจร่วงลงไปต่ำกว่าหนี้คงเหลือแล้ว (สภาวะหนี้ท่วมมูลค่ารถ)</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">โปะรถได้ไหม? ลดดอกเบี้ยหรือเปล่า?</h3>
            <p>
              กฎหมายใหม่ (สคบ.) ระบุว่าหากคุณนำเงินก้อนมา "ปิดบัญชี" ก่อนกำหนด (โปะปิดยอดทั้งหมดทีเดียว) ไฟแนนซ์จะต้องให้ส่วนลดดอกเบี้ยที่ยังไม่ถึงกำหนดชำระ อย่างน้อย 50-100% (ขึ้นอยู่กับช่วงเวลาที่ปิดบัญชี) แต่หากคุณแค่ "โปะเพิ่มบางส่วน" ในแต่ละเดือน จะไม่ช่วยให้ดอกเบี้ยลดลงหรือผ่อนหมดเร็วขึ้นเหมือนการผ่อนบ้าน เพราะดอกเบี้ยได้ถูกคิดรวมไปหมดแล้ว
            </p>
          </>
        ) : (
          <>
            <p>
              When you walk into a showroom for a brand-new car, salespeople often highlight incredibly low promotional interest rates, like "Only 1.99% per year!" This sounds very low compared to a mortgage rate. However, what many buyers don't realize is that auto loans are calculated using a <strong>"Flat Rate" system</strong>, which behaves entirely differently from the "Effective Rate" (reducing balance) system used for home loans.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How Does Flat Rate Work?</h3>
            <p>
              In a Flat Rate system, the total interest you will pay over the entire lifespan of the loan is calculated upfront on day one, based on the original "full loan amount." This total interest is immediately added to the principal. The grand total is then simply divided by the number of months in your loan term.
            </p>
            <p>
              <strong>The Simple Formula:</strong><br />
              Total Interest = Financed Amount × Interest Rate % × Number of Years<br />
              Monthly Payment = (Financed Amount + Total Interest) ÷ Number of Months
            </p>
            <p>
              This means that even as your principal balance decreases over the years, you are still paying interest calculated on the initial full amount. This is why a 2% flat rate is mathematically roughly equivalent to a 4% effective rate.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">The Impact of Down Payments and Terms</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Down Payment:</strong> A higher down payment reduces the financed amount, thereby shrinking the base on which interest is calculated. Lenders often offer better interest rates and easier approvals if you put down 20-25% or more.</li>
              <li><strong>Loan Term:</strong> Stretching the loan over a long period (e.g., 6 or 7 years) makes the monthly payment look affordable. However, you will pay a massive amount in total interest. Cars depreciate quickly; taking a long loan risks putting you "underwater"—where you owe more than the car is actually worth.</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Can You Pay Off the Loan Early?</h3>
            <p>
              Under Thai consumer protection laws, if you decide to pay off the entire remaining balance in one lump sum before the term ends (early settlement), the finance company must provide a discount on the unearned interest, usually between 50% to 100% depending on when you settle. However, simply making <em>small extra payments</em> each month does not reduce your interest or shorten the loan term, because the interest was already fixed into the contract at the beginning.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

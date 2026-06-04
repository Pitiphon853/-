import React, { useState, useEffect } from 'react';
import { Calculator, CarFront, FileText, Banknote, HelpCircle } from 'lucide-react';

export default function CarLoanUsedCar({ lang }: any) {
  const isTH = lang === 'th';

  const [carPrice, setCarPrice] = useState<number>(500000);
  const [downType, setDownType] = useState<'percent' | 'amount'>('percent');
  const [downPercent, setDownPercent] = useState<number>(20);
  const [downAmount, setDownAmount] = useState<number>(100000);
  
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [termYears, setTermYears] = useState<number>(5);

  const [result, setResult] = useState<{
    financedAmount: number;
    totalInterest: number;
    monthlyBeforeVat: number;
    vatPerMonth: number;
    totalMonthlyVat: number;
  } | null>(null);

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
    
    const totalLoanBeforeVat = financedAmount + totalInterest;
    const monthlyBeforeVat = totalLoanBeforeVat / (termYears * 12);
    
    const vatPerMonth = monthlyBeforeVat * 0.07;
    const totalMonthlyVat = monthlyBeforeVat + vatPerMonth;

    setResult({
      financedAmount,
      totalInterest,
      monthlyBeforeVat,
      vatPerMonth,
      totalMonthlyVat
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
          <CarFront className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isTH ? "คำนวณค่างวดรถมือสอง (รวม VAT 7%)" : "Used Car Loan Calculator (with VAT)"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? "ราคารถมือสอง (บาท)" : "Used Car Price (THB)"}
            </label>
            <input
              type="number"
              value={carPrice || ''}
              onChange={(e) => setCarPrice(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-end mb-1">
              <label className="block text-sm font-medium text-gray-700">
                {isTH ? "เงินดาวน์" : "Down Payment"}
              </label>
              <div className="flex space-x-2">
                <button 
                  className={`text-xs px-2 py-1 rounded ${downType === 'percent' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}
                  onClick={() => setDownType('percent')}
                >
                  %
                </button>
                <button 
                  className={`text-xs px-2 py-1 rounded ${downType === 'amount' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
                <span className="absolute right-4 top-2.5 text-gray-500">%</span>
              </div>
            ) : (
              <input
                type="number"
                value={downAmount || ''}
                onChange={(e) => setDownAmount(Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7].map(y => (
                  <option key={y} value={y}>{y} {isTH ? 'ปี' : 'Years'} ({y * 12} {isTH ? 'งวด' : 'months'})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl h-full border border-orange-100 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-600" />
              {isTH ? "สรุปค่างวด" : "Payment Result"}
            </h3>

            {result ? (
              <div className="space-y-4 flex-grow flex flex-col">
                <div className="bg-orange-600 text-white p-5 rounded-xl text-center shadow-md">
                  <p className="text-orange-100 text-sm mb-1">{isTH ? "ยอดผ่อนสุทธิ (รวม VAT)" : "Total Monthly (with VAT)"}</p>
                  <p className="text-4xl font-bold">
                    {result.totalMonthlyVat.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-orange-200 mt-1">{isTH ? "บาท / เดือน" : "THB / Month"}</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-orange-100 space-y-3 mt-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{isTH ? "ค่างวดปกติ (ยังไม่รวม VAT)" : "Monthly (Before VAT)"}</span>
                    <span className="font-semibold text-gray-700">{result.monthlyBeforeVat.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-3">
                    <span className="text-gray-500 flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {isTH ? "ภาษีมูลค่าเพิ่ม 7%" : "VAT 7%"}
                    </span>
                    <span className="font-semibold text-orange-600">+{result.vatPerMonth.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-600 font-medium">{isTH ? "ยอดจัด (ยอดกู้)" : "Financed Amount"}</span>
                    <span className="font-bold text-gray-800">{result.financedAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-600 font-medium">{isTH ? "ดอกเบี้ยรวมตลอดสัญญา" : "Total Interest"}</span>
                    <span className="font-bold text-red-600">{result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                <div className="mt-auto bg-amber-100 text-amber-800 p-3 rounded-lg text-xs flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    {isTH 
                      ? "การซื้อรถมือสองผ่านไฟแนนซ์ จะต้องเสียภาษีมูลค่าเพิ่ม (VAT 7%) ในค่างวดทุกเดือน เนื่องจากถือเป็นการให้บริการทางการเงิน" 
                      : "Used car financing in Thailand is subject to a 7% Value Added Tax on each monthly installment."}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <article className="mt-12 prose prose-sm md:prose-base max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isTH ? "เรื่องน่ารู้ก่อนจัดไฟแนนซ์รถมือสอง: ทำไมต้องเสีย VAT 7% เพิ่ม?" : "What to Know About Used Car Loans: The 7% VAT Surprise"}
        </h2>
        
        {isTH ? (
          <>
            <p>
              ตลาดรถยนต์มือสองเป็นทางเลือกที่น่าสนใจสำหรับผู้ที่ต้องการรถยนต์ในราคาที่ประหยัดกว่ารถป้ายแดงมาก แต่สำหรับคนที่ตั้งใจจะ "จัดไฟแนนซ์" เพื่อผ่อนรถมือสอง มีค่าใช้จ่ายหนึ่งที่มักจะทำให้หลายคนสับสนและรู้สึกว่าค่างวดแพงกว่าที่คิด นั่นคือ <strong>ภาษีมูลค่าเพิ่ม (VAT 7%)</strong>
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมรถป้ายแดงไม่มี VAT แต่รถมือสองมี?</h3>
            <p>
              จริงๆ แล้ว รถป้ายแดง "มี VAT" รวมอยู่ในราคาขายที่โชว์รูมตั้งไว้ตั้งแต่แรกแล้ว ดังนั้นเวลาเอาไปจัดไฟแนนซ์ ไฟแนนซ์จึงนำราคาสุทธิ (ที่รวม VAT แล้ว) ไปคำนวณค่างวดได้เลย คุณจึงไม่ต้องจ่าย VAT เพิ่มในค่างวดอีก
            </p>
            <p>
              ในทางกลับกัน รถยนต์มือสองเคยถูกจ่าย VAT ไปแล้วในตอนที่เป็นรถใหม่มือหนึ่ง เมื่อมีการนำมาขายต่อเป็นมือสอง ไม่ว่าจะเป็นการขายเต็นท์หรือขายดาวน์ ราคารถที่ตกลงกันจะเป็นราคา "รถเปล่า" แต่ตามกฎหมาย เมื่อสถาบันการเงิน (ไฟแนนซ์) เข้ามาทำสัญญา "เช่าซื้อ" กับคุณ บริการเช่าซื้อนี้ถือเป็นการให้บริการที่ต้องเสียภาษีมูลค่าเพิ่ม ทำให้ไฟแนนซ์ต้องเรียกเก็บ VAT 7% จากคุณ <strong>"เพิ่มเข้าไปในค่างวดแต่ละเดือน"</strong>
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีคิดค่างวดรถมือสอง</h3>
            <p>
              การคำนวณจะเริ่มเหมือนรถใหม่ทุกประการ คือใช้ระบบ Flat Rate (ดอกเบี้ยคงที่) 
            </p>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
              <li>หายอดจัด: ราคารถ - เงินดาวน์ = ยอดจัด</li>
              <li>หาดอกเบี้ยรวม: ยอดจัด × อัตราดอกเบี้ย × จำนวนปี</li>
              <li>หาค่างวดก่อน VAT: (ยอดจัด + ดอกเบี้ยรวม) ÷ จำนวนเดือน</li>
              <li><strong>บวก VAT 7%: ค่างวดก่อน VAT × 1.07 = ค่างวดสุทธิที่คุณต้องจ่ายจริง</strong></li>
            </ol>
            <p>
              นอกจากเรื่อง VAT 7% แล้ว อัตราดอกเบี้ยรถมือสองยังมักจะ "สูงกว่า" รถป้ายแดง (เฉลี่ย 4% - 8% แล้วแต่ปีรถ) และรถยิ่งเก่า ดอกเบี้ยยิ่งแพง เพราะไฟแนนซ์มองว่ามีความเสี่ยงสูงกว่า
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ซื้อรถมือสองด้วยเงินสด vs จัดไฟแนนซ์</h3>
            <p>
              หากคุณมีกำลังทรัพย์เพียงพอ <strong>การซื้อรถมือสองด้วยเงินสดเป็นทางเลือกที่คุ้มค่าที่สุด</strong> เพราะคุณจะไม่ต้องเสียดอกเบี้ยที่แพงกว่าปกติ และ <strong>ไม่ต้องเสีย VAT 7% เลยแม้แต่บาทเดียว</strong> แต่หากจำเป็นต้องจัดไฟแนนซ์ เครื่องคำนวณด้านบนจะช่วยให้คุณเห็นตัวเลขค่างวดที่แท้จริง (รวม VAT แล้ว) เพื่อให้คุณวางแผนการเงินได้แม่นยำยิ่งขึ้น ไม่ต้องไปช็อกกับยอดผ่อนที่เต็นท์รถแจ้งในภายหลัง
            </p>
          </>
        ) : (
          <>
            <p>
              The used car market is a fantastic option for those seeking a vehicle at a much lower price point than a brand-new car. However, if you plan to get an auto loan (finance) for a used car in Thailand, there's a specific cost that catches many buyers off guard and inflates the monthly payment: <strong>the 7% Value Added Tax (VAT)</strong>.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Why Do Used Cars Have Extra VAT, But New Cars Don't?</h3>
            <p>
              In reality, the showroom price of a brand-new car <em>already includes VAT</em>. When a finance company calculates your loan for a new car, they use the VAT-inclusive price, so there are no extra taxes added to your monthly installment.
            </p>
            <p>
              Conversely, a used car's agreed purchase price (whether buying from a dealer or a private seller) does not include VAT, as the VAT was paid when it was originally sold new. However, Thai law dictates that entering into a "hire-purchase" agreement with a financial institution constitutes a service. Therefore, the finance company is legally required to charge 7% VAT on <strong>every single monthly installment</strong> you pay.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How Used Car Payments Are Calculated</h3>
            <p>
              The initial calculation works identically to a new car loan, using the Flat Rate interest system:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
              <li>Financed Amount = Car Price - Down Payment</li>
              <li>Total Interest = Financed Amount × Interest Rate × Number of Years</li>
              <li>Monthly Payment (Before VAT) = (Financed Amount + Total Interest) ÷ Number of Months</li>
              <li><strong>Final Monthly Payment = Monthly Payment (Before VAT) × 1.07</strong></li>
            </ol>
            <p>
              In addition to the mandatory VAT, it's important to remember that used car interest rates are significantly higher than new car rates (typically 4% to 8%, depending on the car's age). The older the car, the higher the rate, as lenders view older assets as higher risk.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Cash vs. Financing</h3>
            <p>
              If you have the liquidity, <strong>buying a used car with cash is undoubtedly the smartest financial move</strong>. By paying cash, you completely bypass the high flat-rate interest and, crucially, <strong>you do not pay the 7% VAT at all</strong>. But if financing is necessary, the calculator above helps you see the actual, final monthly figure you will be billed (VAT included), so you can budget accurately and avoid any nasty surprises at the dealership.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

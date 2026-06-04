import React, { useState } from 'react';
import { PiggyBank, Info, TrendingUp, Wallet } from 'lucide-react';

export default function NsfSavingsCalculator({ lang }: any) {
  const isTH = lang === 'TH';

  const [currentAge, setCurrentAge] = useState<number | ''>(25);
  const [yearlyContribution, setYearlyContribution] = useState<number | ''>(12000);
  const [expectedReturn, setExpectedReturn] = useState<number | ''>(3.0);

  const calculateSavings = () => {
    if (typeof currentAge !== 'number' || typeof yearlyContribution !== 'number' || typeof expectedReturn !== 'number') return null;
    if (currentAge >= 60 || currentAge < 15) return null;

    const cappedContribution = Math.min(Math.max(yearlyContribution, 50), 30000); // Min 50, Max 30k per year
    const rate = expectedReturn / 100;

    let totalPrincipal = 0;
    let totalGovMatch = 0;
    let totalInterest = 0;
    let currentBalance = 0;

    for (let age = currentAge; age < 60; age++) {
      let govMatch = 0;
      
      // Calculate government match based on age brackets (latest rules: max 1,800/yr for all brackets)
      if (age <= 30) {
        govMatch = Math.min(cappedContribution * 0.5, 1800);
      } else if (age <= 50) {
        govMatch = Math.min(cappedContribution * 0.8, 1800);
      } else {
        govMatch = Math.min(cappedContribution * 1.0, 1800);
      }

      // Add to running totals
      totalPrincipal += cappedContribution;
      totalGovMatch += govMatch;

      // Add yearly contribution and match to balance
      currentBalance += (cappedContribution + govMatch);

      // Calculate annual interest (simplified end-of-year calculation)
      const interestForYear = currentBalance * rate;
      totalInterest += interestForYear;
      currentBalance += interestForYear;
    }

    // Estimate monthly pension (very rough estimate: Total Balance / 240 months (20 years))
    // NSF actually uses an annuity factor, but this is a common approximation
    const estimatedMonthlyPension = currentBalance / 240;

    return {
      totalPrincipal,
      totalGovMatch,
      totalInterest,
      totalBalance: currentBalance,
      estimatedMonthlyPension,
      cappedContribution
    };
  };

  const result = calculateSavings();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-br from-cyan-50 to-blue-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-600 rounded-lg text-white">
              <PiggyBank size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isTH ? "คำนวณเงินออม กอช. เมื่ออายุครบ 60 ปี" : "NSF Savings Calculator (Age 60)"}
            </h2>
          </div>
          <p className="text-gray-600">
            {isTH 
              ? "จำลองผลตอบแทนและเงินบำนาญที่คุณจะได้รับจาก กองทุนออมแห่งชาติ (กอช.) ตามอัตราสมทบใหม่ล่าสุด" 
              : "Simulate your total savings and pension from the National Savings Fund (NSF) using the latest matching rates."}
          </p>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "อายุของคุณปัจจุบัน (ปี)" : "Current Age (Years)"}
              </label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-lg"
                placeholder={isTH ? "15 - 59 ปี" : "15 - 59 years"}
                min={15}
                max={59}
              />
              {(typeof currentAge === 'number' && (currentAge < 15 || currentAge >= 60)) && (
                 <p className="text-red-500 text-xs mt-2">{isTH ? "อายุต้องอยู่ระหว่าง 15 ถึง 59 ปี" : "Age must be between 15 and 59"}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "ตั้งใจจะออมปีละกี่บาท?" : "Yearly Contribution (THB)"}
              </label>
              <input
                type="number"
                value={yearlyContribution}
                onChange={(e) => setYearlyContribution(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-lg"
                placeholder={isTH ? "สูงสุด 30,000 บาท/ปี" : "Max 30,000 THB/year"}
              />
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <Info size={14} className="mt-0.5 shrink-0" />
                {isTH ? "ออมได้ตั้งแต่ 50 - 30,000 บาท/ปี" : "Can save from 50 - 30,000 THB/year"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "ผลตอบแทนที่คาดหวัง (% ต่อปี)" : "Expected Annual Return (%)"}
              </label>
              <input
                type="number"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-lg"
                placeholder={isTH ? "เช่น 3.0" : "e.g. 3.0"}
              />
              <p className="text-xs text-gray-500 mt-2">
                {isTH ? "อัตราผลตอบแทนเฉลี่ยของ กอช. มักอยู่ระหว่าง 2% - 4% ต่อปี" : "Historical average return is around 2% - 4% per year."}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 flex flex-col justify-center border border-gray-100">
            {result ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-gray-500 font-medium mb-2">
                    {isTH ? "ประมาณการเงินก้อนทั้งหมด ณ อายุ 60 ปี" : "Total Estimated Balance at 60"}
                  </h3>
                  <div className="text-4xl font-bold text-cyan-600">
                    {result.totalBalance.toLocaleString('en-US', { maximumFractionDigits: 0 })} <span className="text-xl text-gray-600 font-normal">{isTH ? "บาท" : "THB"}</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center gap-1.5"><Wallet size={16} className="text-gray-400" /> {isTH ? "เงินออมของคุณ:" : "Your Principal:"}</span>
                    <span className="font-semibold text-gray-800">{result.totalPrincipal.toLocaleString('en-US', { maximumFractionDigits: 0 })} {isTH ? "บาท" : "THB"}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center gap-1.5"><TrendingUp size={16} className="text-blue-500" /> {isTH ? "รัฐสมทบให้:" : "Gov Matching:"}</span>
                    <span className="font-semibold text-blue-600">+{result.totalGovMatch.toLocaleString('en-US', { maximumFractionDigits: 0 })} {isTH ? "บาท" : "THB"}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center gap-1.5"><TrendingUp size={16} className="text-green-500" /> {isTH ? "ผลตอบแทนสะสม:" : "Interest Earned:"}</span>
                    <span className="font-semibold text-green-600">+{result.totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })} {isTH ? "บาท" : "THB"}</span>
                  </div>
                </div>

                <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100 text-center">
                  <h4 className="text-sm font-medium text-cyan-800 mb-1">
                    {isTH ? "คาดการณ์เงินบำนาญรายเดือน" : "Estimated Monthly Pension"}
                  </h4>
                  <div className="text-2xl font-bold text-cyan-700">
                    ~{result.estimatedMonthlyPension.toLocaleString('en-US', { maximumFractionDigits: 0 })} {isTH ? "บาท/เดือน" : "THB/mo"}
                  </div>
                  <p className="text-xs text-cyan-600 mt-2">
                    {isTH ? "*หากบำนาญคำนวณได้น้อยกว่า 600 บาท/เดือน กอช. จะจ่ายเดือนละ 600 บาท จนกว่าเงินจะหมดบัญชี" : "*If pension is under 600 THB/mo, NSF pays 600 THB/mo until balance is depleted."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 h-full flex flex-col items-center justify-center">
                <PiggyBank size={48} className="mb-4 opacity-50" />
                <p>{isTH ? "กรุณากรอกอายุระหว่าง 15-59 ปี" : "Please enter age between 15-59"}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isTH && (
        <article className="prose prose-cyan max-w-none bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">กองทุนออมแห่งชาติ (กอช.) คืออะไร ทำไมถึงน่าออม?</h2>
          
          <p>
            <strong>กองทุนออมแห่งชาติ (กอช.)</strong> เป็นกองทุนบำนาญแห่งชาติที่รัฐบาลจัดตั้งขึ้น 
            เพื่อสร้างความมั่นคงในยามเกษียณให้กับ "แรงงานนอกระบบ" หรือผู้ที่ประกอบอาชีพอิสระ 
            ที่ไม่มีสวัสดิการบำเหน็จบำนาญจากรัฐหรือนายจ้าง (เช่น พ่อค้าแม่ค้า, ฟรีแลนซ์, เกษตรกร, นักศึกษา) 
            โดยมีจุดเด่นที่สุดคือ <strong>"รัฐช่วยออม"</strong> (หรือเงินสมทบจากรัฐบาล) 
            ซึ่งถือเป็นสิทธิประโยชน์พิเศษที่คุณไม่สามารถหาได้จากบัญชีเงินฝากออมทรัพย์ทั่วไป
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">อัตราการออมและเงินสมทบจากรัฐ (อัปเดตใหม่)</h3>
          <p>
            ปัจจุบัน กอช. ได้ปรับเพิ่มเพดานการส่งเงินสะสมให้สูงขึ้นเป็น <strong>สูงสุด 30,000 บาทต่อปี</strong> (จากเดิม 13,200 บาท) 
            และรัฐยังช่วยสมทบให้ตามช่วงอายุ ดังนี้:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-3">
            <li>
              <strong>อายุ 15 - 30 ปี:</strong> รัฐสมทบให้ 50% ของเงินออม 
              <span className="text-blue-600 font-medium"> (แต่สูงสุดไม่เกิน 1,800 บาท/ปี)</span>
            </li>
            <li>
              <strong>อายุ &gt;30 - 50 ปี:</strong> รัฐสมทบให้ 80% ของเงินออม 
              <span className="text-blue-600 font-medium"> (แต่สูงสุดไม่เกิน 1,800 บาท/ปี)</span>
            </li>
            <li>
              <strong>อายุ &gt;50 - 60 ปี:</strong> รัฐสมทบให้ 100% ของเงินออม 
              <span className="text-blue-600 font-medium"> (แต่สูงสุดไม่เกิน 1,800 บาท/ปี)</span>
            </li>
          </ul>

          <div className="bg-amber-50 p-4 rounded-lg my-4 border border-amber-200 text-amber-900">
            <strong>ทริคการออมให้คุ้มค่าที่สุด:</strong> เนื่องจากรัฐสมทบสูงสุดที่ 1,800 บาทต่อปี 
            หมายความว่าในกลุ่มอายุ 50-60 ปี แค่ออมปีละ 1,800 บาท ก็จะได้เงินแถมฟรีจากรัฐอีก 1,800 บาททันที (คิดเป็นผลตอบแทน 100% เลยทีเดียว!) 
            แต่หากต้องการมีเงินก้อนตอนเกษียณมากขึ้น ก็สามารถออมเพิ่มได้สูงสุดถึง 30,000 บาทต่อปีตามกำลังทรัพย์
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">รูปแบบการจ่ายเงินคืนเมื่ออายุ 60 ปี</h3>
          <p>
            เมื่อสมาชิกอายุครบ 60 ปีบริบูรณ์ กอช. จะนำเงินทั้งหมด (เงินออมของคุณ + เงินที่รัฐสมทบ + ผลตอบแทนสะสม) 
            มาคำนวณและจ่ายคืนให้ในรูปแบบ <strong>"บำนาญรายเดือน"</strong> ไปตลอดชีวิต โดยมีหลักการจ่ายดังนี้:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>หากยอดเงินสะสมทั้งหมด สามารถคำนวณแบ่งจ่ายรายเดือนได้ <strong>มากกว่า 600 บาทต่อเดือน</strong>: คุณจะได้รับบำนาญตามจำนวนนั้นไปตลอดชีวิต (แม้เงินในบัญชีจะหมดแล้ว รัฐก็จะจ่ายต่อไปให้)</li>
            <li>หากยอดเงินสะสมทั้งหมด คำนวณแบ่งจ่ายรายเดือนได้ <strong>น้อยกว่า 600 บาทต่อเดือน</strong>: กอช. จะจ่ายให้คุณเดือนละ 600 บาท จนกว่าเงินก้อนนั้นจะหมดบัญชี (กลายเป็นบำนาญแบบมีระยะเวลาจำกัด)</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">ข้อดีอื่นๆ ของ กอช. ที่ควรรู้</h3>
          <p>
            นอกจากการได้เงินสมทบจากรัฐแล้ว เงินออมใน กอช. ยังมีข้อดีอีกหลายด้าน เช่น:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>รัฐบาลค้ำประกันผลตอบแทน:</strong> กอช. รับประกันผลตอบแทนขั้นต่ำ ว่าต้องไม่น้อยกว่าอัตราดอกเบี้ยเงินฝากประจำ 12 เดือน ของ 7 ธนาคารพาณิชย์ขนาดใหญ่</li>
            <li><strong>ลดหย่อนภาษีได้:</strong> เงินสะสมที่คุณส่งเข้า กอช. สามารถนำไปหักลดหย่อนภาษีเงินได้บุคคลธรรมดาประจำปีได้เต็มจำนวน ตามที่จ่ายจริงสูงสุด 30,000 บาท</li>
            <li><strong>ยืดหยุ่นสูง:</strong> ไม่บังคับว่าต้องส่งเงินทุกเดือน หรือส่งเท่ากันทุกปี มีเงินมากก็ออมมาก มีน้อยก็ออมน้อย ปีไหนขาดส่งก็ไม่ถูกตัดสิทธิ (เพียงแต่ปีที่ไม่ได้ส่ง จะไม่ได้รับเงินสมทบจากรัฐเท่านั้น)</li>
          </ul>
        </article>
      )}
    </div>
  );
}

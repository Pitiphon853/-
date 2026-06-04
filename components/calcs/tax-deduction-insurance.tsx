import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck, HeartPulse, UserPlus, Calculator, PiggyBank } from 'lucide-react';

export default function TaxDeductionInsurance({ lang }: any) {
  const isTH = lang === 'th' || lang === 'TH';

  const [income, setIncome] = useState<number | ''>('');
  const [lifeIns, setLifeIns] = useState<number | ''>('');
  const [healthIns, setHealthIns] = useState<number | ''>('');
  const [parentHealthIns, setParentHealthIns] = useState<number | ''>('');
  const [pensionIns, setPensionIns] = useState<number | ''>('');

  const [result, setResult] = useState<any>(null);

  const calculateDeduction = () => {
    const inc = Number(income) || 0;
    const life = Number(lifeIns) || 0;
    const health = Number(healthIns) || 0;
    const parent = Number(parentHealthIns) || 0;
    const pension = Number(pensionIns) || 0;

    // Health (Self): Max 25,000
    const allowedHealth = Math.min(health, 25000);

    // Life + Health (Self): Max 100,000
    const combinedLifeHealth = life + allowedHealth;
    const allowedLifeAndHealth = Math.min(combinedLifeHealth, 100000);

    // Health (Parents): Max 15,000
    const allowedParent = Math.min(parent, 15000);

    // Pension: Max 15% of income or 200,000 (whichever is lower)
    const maxPensionByIncome = inc * 0.15;
    let allowedPension = Math.min(pension, maxPensionByIncome, 200000);

    // Unused 100k quota can be used by Pension (but let's keep it simple as normally reported: allowedPension separate)
    // Actually, if life+health < 100k, the remaining can be used for pension up to 100k.
    const remainingFirst100k = Math.max(0, 100000 - allowedLifeAndHealth);
    let extraPensionFromFirst100k = 0;
    
    if (pension > allowedPension) {
      const excessPension = pension - allowedPension;
      extraPensionFromFirst100k = Math.min(excessPension, remainingFirst100k);
    }

    const totalPensionDeduction = allowedPension + extraPensionFromFirst100k;
    const finalFirst100kDeduction = allowedLifeAndHealth + extraPensionFromFirst100k;

    const totalDeduction = finalFirst100kDeduction + allowedParent + allowedPension;

    setResult({
      healthDeduction: allowedHealth,
      lifeHealthDeduction: finalFirst100kDeduction,
      parentDeduction: allowedParent,
      pensionDeduction: totalPensionDeduction,
      totalDeduction: totalDeduction
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isTH ? 'คำนวณสิทธิลดหย่อนภาษีประกันชีวิต/สุขภาพ' : 'Life & Health Insurance Tax Deduction Calculator'}
            </h1>
            <p className="text-gray-500 mt-1">
              {isTH ? 'ตรวจสอบสิทธิลดหย่อนภาษีสูงสุดจากเบี้ยประกันของคุณ' : 'Check your maximum tax deduction rights from insurance premiums'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? 'รายได้ทั้งปี (บาท)' : 'Annual Income (THB)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">THB</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {isTH ? '*ใช้คำนวณสิทธิสูงสุดของประกันบำนาญ' : '*Used for calculating max pension insurance rights'}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
                {isTH ? 'เบี้ยประกันชีวิตทั่วไป (บาท)' : 'General Life Insurance Premium'}
              </h3>
              <input
                type="number"
                value={lifeIns}
                onChange={(e) => setLifeIns(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-red-500" />
                {isTH ? 'เบี้ยประกันสุขภาพตัวเอง (บาท)' : 'Self Health Insurance Premium'}
              </h3>
              <input
                type="number"
                value={healthIns}
                onChange={(e) => setHealthIns(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="0"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-green-500" />
                {isTH ? 'เบี้ยประกันสุขภาพบิดามารดา (บาท)' : 'Parents Health Insurance Premium'}
              </h3>
              <input
                type="number"
                value={parentHealthIns}
                onChange={(e) => setParentHealthIns(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="0"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-purple-500" />
                {isTH ? 'เบี้ยประกันบำนาญ (บาท)' : 'Pension Insurance Premium'}
              </h3>
              <input
                type="number"
                value={pensionIns}
                onChange={(e) => setPensionIns(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="0"
              />
            </div>

            <button
              onClick={calculateDeduction}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Calculator className="w-5 h-5" />
              {isTH ? 'คำนวณสิทธิลดหย่อน' : 'Calculate Deductions'}
            </button>
          </div>

          <div>
            {result ? (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 h-full border border-blue-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  {isTH ? 'สรุปสิทธิลดหย่อนภาษี' : 'Tax Deduction Summary'}
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">{isTH ? 'สิทธิประกันชีวิต + สุขภาพ (สูงสุด 100,000)' : 'Life + Health (Max 100,000)'}</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {result.lifeHealthDeduction.toLocaleString()} <span className="text-base font-normal text-gray-500">THB</span>
                    </p>
                    {result.healthDeduction > 0 && (
                      <p className="text-xs text-gray-400 mt-1">
                        {isTH ? `(รวมสุขภาพตัวเอง ${result.healthDeduction.toLocaleString()} บ.)` : `(Incl. self health ${result.healthDeduction.toLocaleString()} THB)`}
                      </p>
                    )}
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">{isTH ? 'สิทธิประกันสุขภาพบิดามารดา (สูงสุด 15,000)' : 'Parents Health (Max 15,000)'}</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {result.parentDeduction.toLocaleString()} <span className="text-base font-normal text-gray-500">THB</span>
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">{isTH ? 'สิทธิประกันบำนาญ' : 'Pension Insurance'}</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {result.pensionDeduction.toLocaleString()} <span className="text-base font-normal text-gray-500">THB</span>
                    </p>
                  </div>

                  <div className="bg-blue-600 p-6 rounded-xl shadow-md text-white mt-6">
                    <p className="text-sm text-blue-100 mb-1">{isTH ? 'รวมสิทธิลดหย่อนภาษีจากประกันทั้งหมด' : 'Total Insurance Tax Deduction'}</p>
                    <p className="text-4xl font-bold">
                      {result.totalDeduction.toLocaleString()} <span className="text-lg font-medium text-blue-200">THB</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-6 h-full border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
                <HeartHandshake className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  {isTH ? 'กรอกข้อมูลและกดคำนวณ' : 'Enter details and calculate'}
                </h3>
                <p className="text-gray-400 text-sm max-w-[250px]">
                  {isTH ? 'เพื่อดูสรุปสิทธิการลดหย่อนภาษีสูงสุดที่คุณสามารถใช้ได้จากประกันแต่ละประเภท' : 'To see your maximum allowable tax deductions from each insurance type'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-blue max-w-none text-gray-700 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          คู่มือการลดหย่อนภาษีด้วยประกันชีวิตและประกันสุขภาพ: วางแผนการเงินอย่างชาญฉลาด
        </h2>
        
        <p>
          การทำประกันชีวิตและประกันสุขภาพไม่เพียงแต่ให้ความคุ้มครองในยามฉุกเฉินหรือเจ็บป่วยเท่านั้น แต่ยังเป็นเครื่องมือสำคัญในการ <strong>ลดหย่อนภาษีเงินได้บุคคลธรรมดา</strong> ที่ได้รับความนิยมอย่างมากในประเทศไทย การวางแผนซื้อประกันที่เหมาะสมสามารถช่วยให้คุณประหยัดภาษีได้หลักหมื่นถึงหลักแสนบาทต่อปี พร้อมกับสร้างหลักประกันความมั่นคงให้กับชีวิตของคุณและคนที่คุณรัก
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          1. ประกันชีวิตทั่วไปและประกันสุขภาพตัวเอง
        </h3>
        <p>
          เบี้ยประกันชีวิตแบบทั่วไปที่มีระยะเวลาคุ้มครองตั้งแต่ 10 ปีขึ้นไป สามารถนำมาหักลดหย่อนภาษีได้ตามที่จ่ายจริง สูงสุดไม่เกิน <strong>100,000 บาท</strong> นอกจากนี้ หากคุณมีเบี้ยประกันสุขภาพตัวเอง สามารถนำมารวมลดหย่อนได้ตามที่จ่ายจริง สูงสุดไม่เกิน <strong>25,000 บาท</strong> 
        </p>
        <p>
          <em>ข้อควรระวัง:</em> เมื่อรวมเบี้ยประกันสุขภาพตัวเองกับเบี้ยประกันชีวิตทั่วไปแล้ว ยอดรวมการหักลดหย่อนจะต้องไม่เกิน 100,000 บาท ตัวอย่างเช่น หากคุณจ่ายเบี้ยประกันชีวิต 80,000 บาท และประกันสุขภาพ 25,000 บาท คุณจะลดหย่อนได้เพียง 100,000 บาท ไม่ใช่ 105,000 บาท
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          2. ประกันสุขภาพบิดามารดา
        </h3>
        <p>
          การดูแลสุขภาพของพ่อแม่นอกจากจะได้ความกตัญญูแล้ว ยังได้สิทธิประโยชน์ทางภาษีด้วย โดยเบี้ยประกันสุขภาพของบิดามารดา (ทั้งของตัวเราเองและของคู่สมรสที่ไม่มีรายได้) สามารถนำมาลดหย่อนได้ตามที่จ่ายจริง <strong>สูงสุดไม่เกิน 15,000 บาท</strong> 
        </p>
        <p>
          เงื่อนไขสำคัญคือ บิดามารดาจะต้องมีรายได้ในปีภาษีนั้นไม่เกิน 30,000 บาท และบุตรหลายคนสามารถหารแบ่งสิทธิลดหย่อนนี้ได้ตามสัดส่วนที่จ่ายจริง
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          3. ประกันชีวิตแบบบำนาญ (Pension Insurance)
        </h3>
        <p>
          สำหรับผู้ที่ต้องการวางแผนเกษียณอายุ ประกันชีวิตแบบบำนาญตอบโจทย์อย่างยิ่ง เบี้ยประกันบำนาญสามารถลดหย่อนได้ <strong>15% ของเงินได้ที่ต้องเสียภาษี สูงสุดไม่เกิน 200,000 บาท</strong> และเมื่อรวมกับกองทุนเพื่อการเกษียณอื่นๆ เช่น RMF, SSF, กองทุนสำรองเลี้ยงชีพ (PVD), กบข., และกองทุนการออมแห่งชาติ (NSF) ยอดรวมทั้งหมดจะต้อง <strong>ไม่เกิน 500,000 บาท</strong>
        </p>
        <p>
          ที่น่าสนใจคือ หากคุณยังใช้สิทธิประกันชีวิตทั่วไปไม่ครบ 100,000 บาท คุณสามารถนำเบี้ยประกันบำนาญส่วนเกิน ไปโปะในโควตาของประกันชีวิตทั่วไปได้อีกด้วย ทำให้สิทธิลดหย่อนรวมสูงสุดจากประกันชีวิตทั่วไป+สุขภาพ และประกันบำนาญ อาจสูงถึง 300,000 บาท
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          คำแนะนำในการวางแผนซื้อประกันเพื่อลดหย่อนภาษี
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>สำรวจความคุ้มครองที่จำเป็นก่อน:</strong> อย่าซื้อประกันเพียงเพื่อลดหย่อนภาษีเท่านั้น ให้ประเมินว่าตัวเองมีความเสี่ยงด้านใด เช่น ขาดสวัสดิการค่ารักษาพยาบาล (เน้นประกันสุขภาพ) หรือเป็นเสาหลักของครอบครัว (เน้นประกันชีวิต)</li>
          <li><strong>คำนวณฐานภาษีของตัวเอง:</strong> หากคุณอยู่ในฐานภาษีที่สูง (เช่น 20% หรือ 25% ขึ้นไป) การลดหย่อนผ่านประกันบำนาญหรือ RMF จะช่วยประหยัดภาษีได้เป็นจำนวนมาก</li>
          <li><strong>ตรวจสอบสิทธิรวม 500,000 บาท:</strong> ก่อนตัดสินใจซื้อประกันบำนาญ ให้เช็คยอดเงินสมทบกองทุน PVD หรือ กบข. ของคุณก่อน เพื่อไม่ให้ซื้อเกินสิทธิรวม 5 แสนบาท ซึ่งเป็นเพดานของกลุ่มเกษียณ</li>
        </ul>
        
        <p className="mt-4">
          การใช้ <em>โปรแกรมคำนวณสิทธิลดหย่อนภาษีประกัน</em> บนเว็บไซต์ของเรา จะช่วยให้คุณเห็นภาพรวมตัวเลขสิทธิที่คุณสามารถใช้ได้อย่างชัดเจนและถูกต้องตามหลักเกณฑ์ของกรมสรรพากร ช่วยให้การวางแผนภาษีช่วงปลายปีของคุณเป็นเรื่องง่ายขึ้น ไม่ต้องปวดหัวกับตัวเลขและการคำนวณที่ซับซ้อนอีกต่อไป
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { TrendingUp, Calculator, DollarSign, PieChart } from 'lucide-react';

export default function TaxDeductionSSF({ lang }: any) {
  const isTH = lang === 'th' || lang === 'TH';

  const [income, setIncome] = useState<number | ''>('');
  const [ssfAmount, setSsfAmount] = useState<number | ''>('');
  const [otherRetirementFunds, setOtherRetirementFunds] = useState<number | ''>('');

  const [result, setResult] = useState<any>(null);

  const calculateDeduction = () => {
    const inc = Number(income) || 0;
    const ssf = Number(ssfAmount) || 0;
    const others = Number(otherRetirementFunds) || 0;

    // SSF limit: 30% of income, max 200,000
    const maxByIncome = inc * 0.3;
    const maxSsfLimit = Math.min(maxByIncome, 200000);
    
    // Group limit: max 500,000
    const remainingGroupLimit = Math.max(0, 500000 - others);
    
    const finalAllowedSsf = Math.min(ssf, maxSsfLimit, remainingGroupLimit);

    setResult({
      maxByIncome,
      maxSsfLimit,
      remainingGroupLimit,
      allowedDeduction: finalAllowedSsf,
      excessAmount: ssf > finalAllowedSsf ? ssf - finalAllowedSsf : 0
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="p-4 bg-green-50 text-green-600 rounded-xl">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isTH ? 'คำนวณสิทธิลดหย่อนภาษีกองทุน SSF' : 'SSF Tax Deduction Calculator'}
            </h1>
            <p className="text-gray-500 mt-1">
              {isTH ? 'ตรวจสอบสิทธิลดหย่อนสูงสุดจากกองทุนรวมเพื่อการออม (SSF)' : 'Check maximum deduction rights from Super Savings Fund (SSF)'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                {isTH ? 'รายได้รวมทั้งปี (บาท)' : 'Total Annual Income (THB)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">THB</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                {isTH ? 'ยอดเงินซื้อกองทุน SSF (บาท)' : 'SSF Purchase Amount (THB)'}
              </label>
              <input
                type="number"
                value={ssfAmount}
                onChange={(e) => setSsfAmount(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-green-500" />
                {isTH ? 'เงินกองทุนเกษียณอื่นๆ รวมกัน (บาท)' : 'Other Retirement Funds Total (THB)'}
              </label>
              <input
                type="number"
                value={otherRetirementFunds}
                onChange={(e) => setOtherRetirementFunds(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                {isTH 
                  ? '*เช่น RMF, กบข., Provident Fund, ประกันบำนาญ, กอช. (เพื่อเช็คเพดาน 500,000 บ.)' 
                  : '*e.g., RMF, Provident Fund, Pension Insurance (to check 500k limit)'}
              </p>
            </div>

            <button
              onClick={calculateDeduction}
              className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors mt-4"
            >
              <Calculator className="w-5 h-5" />
              {isTH ? 'คำนวณสิทธิ SSF' : 'Calculate SSF Deduction'}
            </button>
          </div>

          <div>
            {result ? (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 h-full border border-green-100 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  {isTH ? 'ผลการคำนวณสิทธิ SSF' : 'SSF Deduction Result'}
                </h3>
                
                <div className="space-y-4 flex-grow">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-green-50">
                    <p className="text-sm text-gray-500 mb-1">{isTH ? 'สิทธิสูงสุดจากรายได้ (30%)' : 'Max by Income (30%)'}</p>
                    <p className="text-lg font-semibold text-gray-700">
                      {result.maxByIncome.toLocaleString()} <span className="text-sm font-normal text-gray-400">THB</span>
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm border border-green-50">
                    <p className="text-sm text-gray-500 mb-1">{isTH ? 'เพดาน SSF (ไม่เกิน 200,000)' : 'SSF Cap (Max 200k)'}</p>
                    <p className="text-lg font-semibold text-gray-700">
                      {result.maxSsfLimit.toLocaleString()} <span className="text-sm font-normal text-gray-400">THB</span>
                    </p>
                  </div>

                  {result.excessAmount > 0 && (
                    <div className="bg-red-50 p-4 rounded-xl shadow-sm border border-red-100">
                      <p className="text-sm text-red-600 mb-1">{isTH ? 'ยอดซื้อที่เกินสิทธิ (ไม่สามารถลดหย่อนได้)' : 'Excess Amount (Non-deductible)'}</p>
                      <p className="text-lg font-semibold text-red-700">
                        {result.excessAmount.toLocaleString()} <span className="text-sm font-normal text-red-400">THB</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-green-600 p-6 rounded-xl shadow-md text-white mt-6">
                  <p className="text-sm text-green-100 mb-1">{isTH ? 'สิทธิ SSF ที่สามารถลดหย่อนได้จริง' : 'Allowed SSF Tax Deduction'}</p>
                  <p className="text-4xl font-bold">
                    {result.allowedDeduction.toLocaleString()} <span className="text-lg font-medium text-green-200">THB</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-6 h-full border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
                <TrendingUp className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  {isTH ? 'กรอกรายได้และยอดซื้อกองทุน' : 'Enter income and purchase amount'}
                </h3>
                <p className="text-gray-400 text-sm max-w-[250px]">
                  {isTH ? 'เพื่อคำนวณสิทธิการลดหย่อนภาษีจากกองทุน SSF ของคุณ' : 'To calculate your SSF tax deduction rights'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-green max-w-none text-gray-700 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          คู่มือลดหย่อนภาษีด้วยกองทุนรวมเพื่อการออม (SSF) ฉบับสมบูรณ์
        </h2>
        
        <p>
          กองทุนรวมเพื่อการออม หรือ <strong>Super Savings Fund (SSF)</strong> เป็นหนึ่งในเครื่องมือลดหย่อนภาษีที่ได้รับความนิยมอย่างมากในหมู่คนวัยทำงานที่ต้องการออมเงินระยะยาว พร้อมกับได้รับสิทธิประโยชน์ทางภาษีในเวลาเดียวกัน กองทุน SSF ถูกตั้งขึ้นมาเพื่อส่งเสริมให้ประชาชนมีการออมเงินระยะยาวผ่านตลาดทุน โดยมีเงื่อนไขและสิทธิประโยชน์ที่น่าสนใจมากมาย
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          เงื่อนไขการลดหย่อนภาษีด้วยกองทุน SSF
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>วงเงินสิทธิลดหย่อน:</strong> สามารถนำเงินลงทุนในกองทุน SSF มาหักลดหย่อนภาษีได้ตามที่จ่ายจริง แต่ต้องไม่เกิน <strong>30% ของเงินได้พึงประเมินที่ต้องเสียภาษี</strong> และสูงสุดไม่เกิน <strong>200,000 บาท</strong> ต่อปี</li>
          <li><strong>เงื่อนไขการถือครอง:</strong> ต้องถือครองหน่วยลงทุนไม่น้อยกว่า <strong>10 ปีเต็มนับจากวันที่ซื้อ (นับแบบวันชนวัน)</strong> ไม่ใช่นับแบบปีปฏิทิน หากขายก่อนกำหนดจะผิดเงื่อนไขและต้องคืนภาษีที่ได้รับการลดหย่อนพร้อมเงินเพิ่ม</li>
          <li><strong>เพดานกลุ่มเกษียณอายุ 500,000 บาท:</strong> เมื่อรวมยอดเงินลงทุนใน SSF กับกองทุนเพื่อการเกษียณอื่นๆ เช่น RMF, กองทุนสำรองเลี้ยงชีพ (Provident Fund), กบข., กองทุนสงเคราะห์ครูโรงเรียนเอกชน, กองทุนการออมแห่งชาติ (กอช.) และประกันชีวิตแบบบำนาญ รวมกันทั้งหมดจะต้องไม่เกิน <strong>500,000 บาท</strong></li>
          <li><strong>ไม่มีขั้นต่ำในการซื้อ:</strong> ไม่มีการกำหนดเงินซื้อขั้นต่ำ และไม่ต้องซื้อต่อเนื่องทุกปี (ปีไหนซื้อ ปีนั้นก็ได้ลดหย่อนภาษี)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          ใครที่เหมาะกับการซื้อกองทุน SSF?
        </h3>
        <p>
          กองทุน SSF เหมาะสำหรับผู้ที่มีรายได้ถึงเกณฑ์ต้องเสียภาษี และมีเป้าหมายการลงทุนในระยะกลางถึงยาว (10 ปีขึ้นไป) โดยมีนโยบายการลงทุนให้เลือกหลากหลาย ทั้งกองทุนรวมตราสารหนี้ กองทุนรวมตราสารทุน (หุ้นไทยและต่างประเทศ) กองทุนรวมผสม หรือกองทุนทางเลือก ทำให้ผู้ลงทุนสามารถเลือกความเสี่ยงและผลตอบแทนที่ตรงกับจริตและเป้าหมายทางการเงินของตนเองได้อย่างอิสระ แตกต่างจาก LTF ในอดีตที่เน้นลงทุนในหุ้นไทยเป็นหลัก
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          ข้อควรระวังในการลงทุน SSF
        </h3>
        <p>
          หลายคนมักพลาดในเรื่องของ <em>"ระยะเวลาการถือครอง"</em> จำไว้เสมอว่า SSF นับแบบ <strong>"วันชนวัน"</strong> (10 ปีเต็ม) ตัวอย่างเช่น หากคุณซื้อกองทุน SSF ในวันที่ 15 ธันวาคม 2567 คุณจะสามารถขายคืนได้ถูกต้องตามเงื่อนไขในวันที่ 16 ธันวาคม 2577 เป็นต้นไป ห้ามขายก่อนเด็ดขาด ไม่เช่นนั้นนอกจากจะต้องคืนภาษีแล้ว อาจถูกสรรพากรเรียกเก็บเงินเพิ่ม (ดอกเบี้ยปรับ) อีกด้วย
        </p>
        <p>
          และที่สำคัญที่สุด ก่อนตัดสินใจซื้อ ควรใช้ <strong>เครื่องมือคำนวณสิทธิลดหย่อนภาษีกองทุน SSF</strong> ของเรา เพื่อตรวจสอบเพดาน 30% ของรายได้ และเพดานรวม 500,000 บาทให้แม่นยำ ป้องกันการซื้อเกินสิทธิ ซึ่งเงินส่วนที่ซื้อเกินไปนั้นจะไม่สามารถนำมาลดหย่อนภาษีได้ และยังต้องติดเงื่อนไขการถือครอง 10 ปีอีกด้วย
        </p>
      </div>
    </div>
  );
}

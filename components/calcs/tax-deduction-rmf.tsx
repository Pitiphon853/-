import React, { useState } from 'react';
import { Briefcase, Calculator, DollarSign, PieChart, Info } from 'lucide-react';

export default function TaxDeductionRMF({ lang }: any) {
  const isTH = lang === 'th' || lang === 'TH';

  const [income, setIncome] = useState<number | ''>('');
  const [rmfAmount, setRmfAmount] = useState<number | ''>('');
  const [otherRetirementFunds, setOtherRetirementFunds] = useState<number | ''>('');

  const [result, setResult] = useState<any>(null);

  const calculateDeduction = () => {
    const inc = Number(income) || 0;
    const rmf = Number(rmfAmount) || 0;
    const others = Number(otherRetirementFunds) || 0;

    // RMF limit: 30% of income, max 500,000
    const maxByIncome = inc * 0.3;
    const maxRmfLimit = Math.min(maxByIncome, 500000);
    
    // Group limit: max 500,000
    const remainingGroupLimit = Math.max(0, 500000 - others);
    
    const finalAllowedRmf = Math.min(rmf, maxRmfLimit, remainingGroupLimit);

    setResult({
      maxByIncome,
      maxRmfLimit,
      remainingGroupLimit,
      allowedDeduction: finalAllowedRmf,
      excessAmount: rmf > finalAllowedRmf ? rmf - finalAllowedRmf : 0
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl">
            <Briefcase className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isTH ? 'คำนวณสิทธิลดหย่อนภาษีกองทุน RMF' : 'RMF Tax Deduction Calculator'}
            </h1>
            <p className="text-gray-500 mt-1">
              {isTH ? 'ตรวจสอบสิทธิลดหย่อนสูงสุดจากกองทุนรวมเพื่อการเลี้ยงชีพ (RMF)' : 'Check maximum deduction rights from Retirement Mutual Fund (RMF)'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-indigo-500" />
                {isTH ? 'รายได้รวมทั้งปี (บาท)' : 'Total Annual Income (THB)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">THB</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-500" />
                {isTH ? 'ยอดเงินซื้อกองทุน RMF (บาท)' : 'RMF Purchase Amount (THB)'}
              </label>
              <input
                type="number"
                value={rmfAmount}
                onChange={(e) => setRmfAmount(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-indigo-500" />
                {isTH ? 'เงินกองทุนเกษียณอื่นๆ รวมกัน (บาท)' : 'Other Retirement Funds Total (THB)'}
              </label>
              <input
                type="number"
                value={otherRetirementFunds}
                onChange={(e) => setOtherRetirementFunds(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                {isTH 
                  ? '*เช่น SSF, กบข., Provident Fund, ประกันบำนาญ, กอช. (เพื่อเช็คเพดาน 500,000 บ.)' 
                  : '*e.g., SSF, Provident Fund, Pension Insurance (to check 500k limit)'}
              </p>
            </div>

            <button
              onClick={calculateDeduction}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors mt-4"
            >
              <Calculator className="w-5 h-5" />
              {isTH ? 'คำนวณสิทธิ RMF' : 'Calculate RMF Deduction'}
            </button>
          </div>

          <div>
            {result ? (
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 h-full border border-indigo-100 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  {isTH ? 'ผลการคำนวณสิทธิ RMF' : 'RMF Deduction Result'}
                </h3>
                
                <div className="space-y-4 flex-grow">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-50">
                    <p className="text-sm text-gray-500 mb-1">{isTH ? 'สิทธิสูงสุดจากรายได้ (30%)' : 'Max by Income (30%)'}</p>
                    <p className="text-lg font-semibold text-gray-700">
                      {result.maxByIncome.toLocaleString()} <span className="text-sm font-normal text-gray-400">THB</span>
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-50">
                    <p className="text-sm text-gray-500 mb-1">{isTH ? 'เพดาน RMF และกลุ่มเกษียณ' : 'RMF & Retirement Group Cap'}</p>
                    <p className="text-lg font-semibold text-gray-700">
                      {Math.min(500000, result.remainingGroupLimit).toLocaleString()} <span className="text-sm font-normal text-gray-400">THB</span>
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

                <div className="bg-indigo-600 p-6 rounded-xl shadow-md text-white mt-6">
                  <p className="text-sm text-indigo-100 mb-1">{isTH ? 'สิทธิ RMF ที่สามารถลดหย่อนได้จริง' : 'Allowed RMF Tax Deduction'}</p>
                  <p className="text-4xl font-bold">
                    {result.allowedDeduction.toLocaleString()} <span className="text-lg font-medium text-indigo-200">THB</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-6 h-full border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
                <Info className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  {isTH ? 'กรอกรายได้และยอดซื้อกองทุน' : 'Enter income and purchase amount'}
                </h3>
                <p className="text-gray-400 text-sm max-w-[250px]">
                  {isTH ? 'เพื่อคำนวณสิทธิการลดหย่อนภาษีจากกองทุน RMF ของคุณ' : 'To calculate your RMF tax deduction rights'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-indigo max-w-none text-gray-700 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          กองทุน RMF (Retirement Mutual Fund) คืออะไร? และลดหย่อนภาษีได้อย่างไร?
        </h2>
        
        <p>
          <strong>กองทุนรวมเพื่อการเลี้ยงชีพ หรือ RMF (Retirement Mutual Fund)</strong> เป็นกองทุนที่จัดตั้งขึ้นเพื่อส่งเสริมให้คนไทยมีการออมเงินไว้ใช้จ่ายในยามเกษียณอายุ โดยรัฐบาลให้สิทธิประโยชน์ทางภาษีเป็นแรงจูงใจในการลงทุน ถือเป็นหนึ่งในเครื่องมือลดหย่อนภาษีสุดคลาสสิกที่ได้รับความนิยมมาอย่างยาวนาน โดยเฉพาะผู้ที่มีฐานภาษีสูง หรือผู้ที่ต้องการสร้างความมั่นคงในวัยเกษียณอย่างแท้จริง
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          เงื่อนไขและสิทธิประโยชน์ทางภาษีของกองทุน RMF
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>วงเงินสิทธิลดหย่อน:</strong> สามารถลดหย่อนได้ตามที่จ่ายจริง สูงสุด <strong>30% ของเงินได้พึงประเมินที่ต้องเสียภาษี</strong> และต้อง <strong>ไม่เกิน 500,000 บาท</strong> ต่อปี</li>
          <li><strong>เพดานรวมกลุ่มเกษียณ:</strong> เมื่อนำเงินลงทุนใน RMF ไปรวมกับกองทุนเพื่อการเกษียณอื่นๆ ได้แก่ กองทุน SSF, กองทุนสำรองเลี้ยงชีพ (PVD), กบข., กองทุนสงเคราะห์ครูโรงเรียนเอกชน, กองทุนการออมแห่งชาติ (กอช.) และประกันชีวิตแบบบำนาญ ยอดรวมทั้งหมดจะต้อง <strong>ไม่เกิน 500,000 บาท</strong></li>
          <li><strong>ขั้นต่ำในการลงทุน:</strong> ปัจจุบัน <em>ไม่มีการกำหนดจำนวนเงินขั้นต่ำ</em> ในการซื้อแล้ว (แต่บางบลจ. อาจกำหนดขั้นต่ำในการเปิดบัญชีครั้งแรก เช่น 500 บาท)</li>
          <li><strong>เงื่อนไขการลงทุน:</strong> ไม่บังคับว่าต้องซื้อทุกปี แต่แนะนำให้ซื้อต่อเนื่องหากต้องการสร้างวินัยการออมเพื่อวัยเกษียณอย่างแท้จริง</li>
          <li><strong>เงื่อนไขการขายคืน:</strong> จะสามารถขายคืนหน่วยลงทุนและได้รับสิทธิประโยชน์ทางภาษีครบถ้วน ก็ต่อเมื่อ <strong>ลงทุนมาแล้วไม่น้อยกว่า 5 ปี (นับแบบวันชนวัน) และมีอายุครบ 55 ปีบริบูรณ์</strong> เท่านั้น</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          ข้อควรระวังในการลงทุนกองทุน RMF
        </h3>
        <p>
          สิ่งสำคัญที่สุดของการลงทุนใน RMF คือ <strong>"ห้ามขายก่อนอายุ 55 ปี และห้ามขายก่อนลงทุนครบ 5 ปี"</strong> หากคุณผิดเงื่อนไขนี้ คุณจะต้องคืนเงินภาษีที่ได้รับการลดหย่อนมาทั้งหมด (สำหรับ 5 ปีล่าสุด) พร้อมจ่ายเงินเพิ่ม (ดอกเบี้ยปรับ) ให้กับกรมสรรพากรอีกด้วย ดังนั้น เงินที่จะนำมาลงทุนใน RMF ควรเป็น "เงินเย็น" ที่ตั้งใจจะเก็บไว้ใช้ยามเกษียณจริงๆ
        </p>
        <p>
          ก่อนตัดสินใจซื้อ RMF ในแต่ละปี โดยเฉพาะช่วงปลายปี ควรคำนวณวงเงินให้แม่นยำ การใช้ <strong>โปรแกรมคำนวณสิทธิลดหย่อนภาษี RMF</strong> จะช่วยให้คุณเห็นตัวเลขสูงสุดที่คุณสามารถซื้อได้โดยไม่เกินเพดาน 30% ของรายได้ และไม่เกินเพดาน 500,000 บาท เมื่อรวมกับกองทุนอื่นๆ ช่วยให้การวางแผนภาษีของคุณมีประสิทธิภาพสูงสุดและไม่ผิดพลาด
        </p>
      </div>
    </div>
  );
}

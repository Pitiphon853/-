import React, { useState } from 'react';
import { Leaf, Calculator, DollarSign, Info } from 'lucide-react';

export default function TaxDeductionThaiESG({ lang }: any) {
  const isTH = lang === 'th' || lang === 'TH';

  const [income, setIncome] = useState<number | ''>('');
  const [thaiesgAmount, setThaiesgAmount] = useState<number | ''>('');

  const [result, setResult] = useState<any>(null);

  const calculateDeduction = () => {
    const inc = Number(income) || 0;
    const esg = Number(thaiesgAmount) || 0;

    // ThaiESG new limit: 30% of income, max 300,000
    const maxByIncome = inc * 0.3;
    const maxEsgLimit = Math.min(maxByIncome, 300000);
    
    const finalAllowedEsg = Math.min(esg, maxEsgLimit);

    setResult({
      maxByIncome,
      maxEsgLimit,
      allowedDeduction: finalAllowedEsg,
      excessAmount: esg > finalAllowedEsg ? esg - finalAllowedEsg : 0
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="p-4 bg-teal-50 text-teal-600 rounded-xl">
            <Leaf className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isTH ? 'คำนวณสิทธิลดหย่อนภาษีกองทุน ThaiESG' : 'ThaiESG Tax Deduction Calculator'}
            </h1>
            <p className="text-gray-500 mt-1">
              {isTH ? 'ตรวจสอบสิทธิลดหย่อนสูงสุดจากกองทุน Thai ESG (เกณฑ์ใหม่)' : 'Check maximum deduction rights from Thai ESG funds (New rules)'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-teal-500" />
                {isTH ? 'รายได้รวมทั้งปี (บาท)' : 'Total Annual Income (THB)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">THB</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-teal-500" />
                {isTH ? 'ยอดเงินซื้อกองทุน ThaiESG (บาท)' : 'ThaiESG Purchase Amount (THB)'}
              </label>
              <input
                type="number"
                value={thaiesgAmount}
                onChange={(e) => setThaiesgAmount(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="0"
              />
            </div>

            <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 flex items-start gap-3">
              <Info className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-teal-800">
                {isTH 
                  ? 'กองทุน ThaiESG ได้รับสิทธิลดหย่อนแยกต่างหาก วงเงินไม่รวมในเพดาน 500,000 บาทของกลุ่มกองทุนเกษียณอายุ (RMF/SSF)' 
                  : 'ThaiESG deduction is completely separate and not included in the 500,000 THB retirement fund cap.'}
              </p>
            </div>

            <button
              onClick={calculateDeduction}
              className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors mt-4"
            >
              <Calculator className="w-5 h-5" />
              {isTH ? 'คำนวณสิทธิ ThaiESG' : 'Calculate ThaiESG Deduction'}
            </button>
          </div>

          <div>
            {result ? (
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 h-full border border-teal-100 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  {isTH ? 'ผลการคำนวณสิทธิ ThaiESG' : 'ThaiESG Deduction Result'}
                </h3>
                
                <div className="space-y-4 flex-grow">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-teal-50">
                    <p className="text-sm text-gray-500 mb-1">{isTH ? 'สิทธิสูงสุดจากรายได้ (30%)' : 'Max by Income (30%)'}</p>
                    <p className="text-lg font-semibold text-gray-700">
                      {result.maxByIncome.toLocaleString()} <span className="text-sm font-normal text-gray-400">THB</span>
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm border border-teal-50">
                    <p className="text-sm text-gray-500 mb-1">{isTH ? 'เพดาน ThaiESG (เกณฑ์ใหม่ ไม่เกิน 3 แสน)' : 'ThaiESG Cap (New rule max 300k)'}</p>
                    <p className="text-lg font-semibold text-gray-700">
                      {Math.min(300000, result.maxEsgLimit).toLocaleString()} <span className="text-sm font-normal text-gray-400">THB</span>
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

                <div className="bg-teal-600 p-6 rounded-xl shadow-md text-white mt-6">
                  <p className="text-sm text-teal-100 mb-1">{isTH ? 'สิทธิ ThaiESG ที่สามารถลดหย่อนได้จริง' : 'Allowed ThaiESG Tax Deduction'}</p>
                  <p className="text-4xl font-bold">
                    {result.allowedDeduction.toLocaleString()} <span className="text-lg font-medium text-teal-200">THB</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-6 h-full border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
                <Leaf className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  {isTH ? 'กรอกรายได้และยอดซื้อกองทุน' : 'Enter income and purchase amount'}
                </h3>
                <p className="text-gray-400 text-sm max-w-[250px]">
                  {isTH ? 'เพื่อคำนวณสิทธิการลดหย่อนภาษีจากกองทุน ThaiESG ของคุณ' : 'To calculate your ThaiESG tax deduction rights'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-teal max-w-none text-gray-700 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ทำความรู้จัก กองทุน Thai ESG กับเกณฑ์การลดหย่อนภาษีใหม่ที่น่าสนใจกว่าเดิม!
        </h2>
        
        <p>
          <strong>กองทุนรวมไทยเพื่อความยั่งยืน หรือ Thai ESG (Thailand ESG Fund)</strong> เป็นกองทุนลดหย่อนภาษีน้องใหม่ที่รัฐบาลและ ก.ล.ต. ผลักดันให้เกิดขึ้น เพื่อสนับสนุนการลงทุนในกิจการของไทยที่ดำเนินธุรกิจโดยคำนึงถึงสิ่งแวดล้อม (Environment) สังคม (Social) และบรรษัทภิบาล (Governance) ซึ่งล่าสุดในปี 2567 ได้มีการปรับปรุงหลักเกณฑ์ใหม่ให้มีความน่าสนใจและจูงใจนักลงทุนมากขึ้น ถือเป็นโอกาสดีสำหรับผู้ที่กำลังมองหาตัวช่วยลดหย่อนภาษีเพิ่มเติมนอกเหนือจาก RMF และ SSF
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          อัปเดต! สิทธิประโยชน์ทางภาษีใหม่ของ Thai ESG
        </h3>
        <p>
          ตามมติคณะรัฐมนตรีล่าสุด ได้มีการปรับปรุงเงื่อนไขของกองทุน Thai ESG ใหม่ให้สิทธิประโยชน์ที่สูงขึ้น ดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>เพิ่มวงเงินลดหย่อนภาษีสูงสุด:</strong> สามารถนำเงินลงทุนไปหักลดหย่อนภาษีได้ <strong>สูงสุด 30% ของเงินได้พึงประเมิน แต่ไม่เกิน 300,000 บาท</strong> (จากเดิมที่กำหนดไว้ไม่เกิน 100,000 บาท)</li>
          <li><strong>ลดระยะเวลาการถือครอง:</strong> ต้องถือครองหน่วยลงทุน <strong>ไม่น้อยกว่า 5 ปี (นับแบบวันชนวัน)</strong> (จากเดิมที่กำหนดไว้ 8 ปี) นับเป็นข่าวดีสำหรับผู้ที่ไม่ต้องการล็อกเงินไว้นานจนเกินไป</li>
          <li><strong>ไม่รวมกับโควตากองทุนเกษียณอายุ:</strong> <em>จุดเด่นที่สำคัญที่สุด!</em> วงเงินลดหย่อนของ Thai ESG จำนวน 300,000 บาทนี้ <strong>แยกออกมาต่างหาก</strong> ไม่ถูกนำไปรวมกับเพดาน 500,000 บาท ของกลุ่มกองทุนเพื่อการเกษียณอายุ (RMF, SSF, PVD, กบข., ประกันบำนาญ ฯลฯ) หมายความว่า หากคุณซื้อกองทุนกลุ่มเกษียณเต็มสิทธิ 5 แสนบาทแล้ว คุณยังสามารถซื้อ Thai ESG เพิ่มเพื่อลดหย่อนภาษีได้อีกสูงสุด 3 แสนบาท!</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          กองทุน Thai ESG นำเงินไปลงทุนในอะไรบ้าง?
        </h3>
        <p>
          นโยบายการลงทุนของ Thai ESG จะเน้นลงทุนในสินทรัพย์ที่ออกโดยกิจการในประเทศไทยที่มีความโดดเด่นด้าน ESG เท่านั้น ตัวอย่างเช่น:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>หุ้นไทยในดัชนี SET ESG Ratings ที่ผ่านเกณฑ์การประเมินด้านความยั่งยืน</li>
          <li>ตราสารหนี้เพื่ออนุรักษ์สิ่งแวดล้อม (Green Bond) ตราสารหนี้เพื่อความยั่งยืน (Sustainability Bond) หรือตราสารหนี้ส่งเสริมความยั่งยืน (Sustainability-linked Bond) ที่ออกโดยภาครัฐหรือเอกชนไทย</li>
          <li>โทเคนดิจิทัลเพื่อการลงทุนที่มีการระดมทุนไปใช้ในโครงการที่เกี่ยวข้องกับ ESG</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          การวางแผนใช้สิทธิลดหย่อนภาษีอย่างคุ้มค่า
        </h3>
        <p>
          การที่มีกองทุน Thai ESG เข้ามา ช่วยเพิ่มพื้นที่ในการลดหย่อนภาษีให้แก่ผู้ที่มีรายได้สูงและฐานภาษีสูงได้อย่างมาก อย่างไรก็ตาม ก่อนที่จะลงทุน ควรศึกษาเป้าหมายการลงทุนของตนเอง และประเมินความเสี่ยงที่รับได้ เนื่องจากกองทุน Thai ESG มีนโยบายลงทุนในหุ้นและตราสารหนี้ไทยเป็นหลัก 
        </p>
        <p>
          เพื่อไม่ให้ผิดพลาดในการคำนวณเงินลงทุน คุณสามารถใช้ <strong>เครื่องมือคำนวณสิทธิลดหย่อนภาษีกองทุน Thai ESG</strong> บนเว็บไซต์ของเรา เพื่อดูยอดเงินสูงสุดที่คุณสามารถนำไปลดหย่อนได้อย่างถูกต้องแม่นยำ ป้องกันการซื้อเกินสิทธิ ซึ่งเงินส่วนที่เกินจะไม่สามารถนำมาลดหย่อนภาษีได้
        </p>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Calculator, Home, AlertTriangle, Wallet, PieChart } from 'lucide-react';

export default function HiddenHomeCosts({ lang }: any) {
  const isTH = lang === 'th';

  const [propertyPrice, setPropertyPrice] = useState<number>(3000000);
  const [loanAmount, setLoanAmount] = useState<number>(3000000);
  
  const [transferFeeRate, setTransferFeeRate] = useState<number>(1); // Usually 2%, but often buyer pays 1%
  const [mortgageFeeRate, setMortgageFeeRate] = useState<number>(1);
  const [stampDutyRate, setStampDutyRate] = useState<number>(0.5); // 0.5% stamp or 3.3% specific business tax
  
  const [appraisalFee, setAppraisalFee] = useState<number>(3000);
  const [commonAreaFee, setCommonAreaFee] = useState<number>(20000);
  const [meterFee, setMeterFee] = useState<number>(15000);

  const [result, setResult] = useState<{
    transferFee: number;
    mortgageFee: number;
    stampDuty: number;
    totalHiddenCosts: number;
  } | null>(null);

  useEffect(() => {
    calculate();
  }, [propertyPrice, loanAmount, transferFeeRate, mortgageFeeRate, stampDutyRate, appraisalFee, commonAreaFee, meterFee]);

  const calculate = () => {
    if (propertyPrice <= 0) {
      setResult(null);
      return;
    }

    const transferFee = propertyPrice * (transferFeeRate / 100);
    const mortgageFee = loanAmount * (mortgageFeeRate / 100);
    const stampDuty = propertyPrice * (stampDutyRate / 100);
    
    const totalHiddenCosts = transferFee + mortgageFee + stampDuty + appraisalFee + commonAreaFee + meterFee;

    setResult({
      transferFee,
      mortgageFee,
      stampDuty,
      totalHiddenCosts
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isTH ? "คำนวณต้นทุนแฝงซื้อบ้าน (วันโอน)" : "Hidden Home Costs Calculator"}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-50 p-5 rounded-xl space-y-4 border border-gray-100">
            <h3 className="font-semibold text-gray-800">{isTH ? "ข้อมูลหลักประกัน" : "Property Details"}</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isTH ? "ราคาซื้อขาย / ราคาประเมิน (บาท)" : "Property Price (THB)"}
              </label>
              <input
                type="number"
                value={propertyPrice || ''}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isTH ? "ยอดขอกู้ (บาท)" : "Loan Amount (THB)"}
              </label>
              <input
                type="number"
                value={loanAmount || ''}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>

          <div className="bg-purple-50 p-5 rounded-xl space-y-4 border border-purple-100">
            <h3 className="font-semibold text-purple-800">{isTH ? "อัตราค่าธรรมเนียม (%)" : "Fee Rates (%)"}</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-purple-900 mb-1">
                  {isTH ? "ค่าโอน" : "Transfer"}
                </label>
                <input
                  type="number"
                  value={transferFeeRate}
                  onChange={(e) => setTransferFeeRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-purple-200 rounded-lg outline-none"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-purple-900 mb-1">
                  {isTH ? "ค่าจดจำนอง" : "Mortgage"}
                </label>
                <input
                  type="number"
                  value={mortgageFeeRate}
                  onChange={(e) => setMortgageFeeRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-purple-200 rounded-lg outline-none"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-purple-900 mb-1">
                  {isTH ? "อากรแสตมป์" : "Stamp Duty"}
                </label>
                <input
                  type="number"
                  value={stampDutyRate}
                  onChange={(e) => setStampDutyRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-purple-200 rounded-lg outline-none"
                  step="0.1"
                />
              </div>
            </div>
            <p className="text-xs text-purple-600">
              {isTH ? "* ค่าโอนปกติ 2% (แบ่งจ่ายคนละ 1%), จดจำนอง 1%, อากรแสตมป์ 0.5% (หรือภาษีธุรกิจเฉพาะ 3.3%)" : "* Normal Transfer 2%, Mortgage 1%, Stamp Duty 0.5%"}
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl space-y-4 border border-gray-100">
            <h3 className="font-semibold text-gray-800">{isTH ? "ค่าใช้จ่ายอื่นๆ (บาท)" : "Other Costs (THB)"}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isTH ? "ค่าประเมินบ้าน" : "Appraisal Fee"}
                </label>
                <input
                  type="number"
                  value={appraisalFee || ''}
                  onChange={(e) => setAppraisalFee(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isTH ? "ค่าส่วนกลางล่วงหน้า" : "Common Area Fee"}
                </label>
                <input
                  type="number"
                  value={commonAreaFee || ''}
                  onChange={(e) => setCommonAreaFee(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isTH ? "ค่ามิเตอร์น้ำ-ไฟ" : "Meter Installation"}
                </label>
                <input
                  type="number"
                  value={meterFee || ''}
                  onChange={(e) => setMeterFee(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-6 rounded-2xl h-full border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-purple-600" />
              {isTH ? "สรุปค่าใช้จ่ายวันโอน" : "Total Closing Costs"}
            </h3>

            {result ? (
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-purple-100 text-center mb-6">
                  <p className="text-sm text-gray-500 mb-2">{isTH ? "ต้องเตรียมเงินสดทั้งหมดประมาณ" : "Total Cash Needed"}</p>
                  <p className="text-4xl font-bold text-purple-700">
                    {result.totalHiddenCosts.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{isTH ? "บาท" : "THB"}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700 flex items-center gap-2">
                    <PieChart className="w-4 h-4" />
                    {isTH ? "รายละเอียดค่าใช้จ่าย" : "Cost Breakdown"}
                  </h4>
                  
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100">
                    <span className="text-sm text-gray-600">{isTH ? "ค่าธรรมเนียมการโอน" : "Transfer Fee"}</span>
                    <span className="font-semibold">{result.transferFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100">
                    <span className="text-sm text-gray-600">{isTH ? "ค่าจดจำนอง" : "Mortgage Registration"}</span>
                    <span className="font-semibold">{result.mortgageFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100">
                    <span className="text-sm text-gray-600">{isTH ? "ค่าอากรแสตมป์ / ภาษี" : "Stamp Duty / Tax"}</span>
                    <span className="font-semibold">{result.stampDuty.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100">
                    <span className="text-sm text-gray-600">{isTH ? "ค่าประเมินราคา" : "Appraisal Fee"}</span>
                    <span className="font-semibold">{(appraisalFee || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100">
                    <span className="text-sm text-gray-600">{isTH ? "ค่าส่วนกลางล่วงหน้า" : "Common Area Fee"}</span>
                    <span className="font-semibold">{(commonAreaFee || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100">
                    <span className="text-sm text-gray-600">{isTH ? "ค่ามิเตอร์น้ำ-ไฟ" : "Meter Installation"}</span>
                    <span className="font-semibold">{(meterFee || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <article className="mt-12 prose prose-sm md:prose-base max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isTH ? "เตรียมตัวให้พร้อม: ล้วงลึก 'ต้นทุนแฝง' วันโอนบ้านที่หลายคนพลาด" : "Be Prepared: Uncovering the 'Hidden Costs' of Buying a Home"}
        </h2>
        
        {isTH ? (
          <>
            <p>
              การซื้อบ้านสักหลังไม่ได้จบแค่การเตรียมเงินดาวน์หรือการขอสินเชื่อให้ผ่านเท่านั้น หลายคนที่กู้บ้านผ่านแล้วกลับต้องมาตกใจและวุ่นวายหาเงินสดใน "วันโอนกรรมสิทธิ์" ณ กรมที่ดิน เพราะมีค่าใช้จ่ายหลายรายการที่ไม่ได้ถูกรวมอยู่ในยอดเงินกู้ และต้องชำระด้วยเงินสดหรือแคชเชียร์เช็ค เราเรียกสิ่งเหล่านี้ว่า "ต้นทุนแฝง" (Hidden Costs)
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ค่าใช้จ่ายหลักๆ ในวันโอนมีอะไรบ้าง?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>ค่าธรรมเนียมการโอน (2% ของราคาประเมิน):</strong> ตามกฎหมายจะอยู่ที่ 2% แต่ส่วนใหญ่มักจะตกลงแบ่งจ่ายกันคนละครึ่งระหว่างผู้ซื้อและผู้ขาย (ฝ่ายละ 1%) ยกเว้นในช่วงที่มีมาตรการรัฐกระตุ้นอสังหาฯ อาจลดเหลือ 0.01%</li>
              <li><strong>ค่าจดจำนอง (1% ของยอดกู้):</strong> จ่ายให้กับกรมที่ดินเพื่อจดทะเบียนว่าบ้านหลังนี้ติดจำนองกับธนาคารใด หากซื้อด้วยเงินสดจะไม่มีค่าใช้จ่ายส่วนนี้ (บางช่วงอาจมีมาตรการลดเหลือ 0.01%)</li>
              <li><strong>ค่าอากรแสตมป์ (0.5%):</strong> จ่ายในกรณีที่ผู้ขายครอบครองบ้านเกิน 5 ปี หรือมีชื่อในทะเบียนบ้านเกิน 1 ปี แต่หากครอบครองไม่ถึงเกณฑ์ จะต้องเสีย "ภาษีธุรกิจเฉพาะ" 3.3% แทน (ผู้ขายมักเป็นคนรับผิดชอบ แต่ควรตกลงกันให้ชัดเจน)</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ค่าใช้จ่ายเพิ่มเติมจากโครงการ (หากซื้อบ้านใหม่)</h3>
            <p>
              หากคุณซื้อบ้านมือหนึ่งจากโครงการจัดสรร คุณอาจต้องเตรียมเงินสำหรับค่าใช้จ่ายเบ็ดเตล็ดเพิ่มเติมในวันโอน เช่น:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>ค่าส่วนกลางล่วงหน้า:</strong> โครงการมักจะเรียกเก็บล่วงหน้า 1-3 ปี ขึ้นอยู่กับขนาดพื้นที่และราคาต่อตารางวา</li>
              <li><strong>ค่าประกันและติดตั้งมิเตอร์น้ำ-ไฟฟ้า:</strong> ประมาณ 10,000 - 20,000 บาท ขึ้นอยู่กับขนาดของมิเตอร์ที่ขอ</li>
              <li><strong>ค่าจดทะเบียนนิติบุคคล (ถ้ามี):</strong> กองทุนแรกเข้าสำหรับดูแลหมู่บ้าน</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การรับมือกับค่าใช้จ่ายแฝง</h3>
            <p>
              ก่อนถึงวันโอน คุณควรตรวจสอบกับโครงการหรือผู้ขายให้ชัดเจนว่า ใครรับผิดชอบค่าใช้จ่ายส่วนไหนบ้าง และใช้เครื่องคำนวณด้านบนเพื่อกะประมาณ "ตัวเลขเงินสด" ที่ต้องเตรียมไว้ล่วงหน้า การเผื่อเงินสดไว้ประมาณ 3-5% ของราคาบ้าน จะช่วยให้การโอนกรรมสิทธิ์บ้านในฝันของคุณราบรื่น ไร้ความกังวล
            </p>
          </>
        ) : (
          <>
            <p>
              Buying a home isn't just about saving for a down payment or getting mortgage approval. Many buyers are caught off guard on the "transfer day" at the Land Office when they are suddenly hit with multiple fees that weren't included in their loan amount. These require immediate payment, usually via cashier's check or cash, and are commonly known as "Hidden Costs."
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">What are the Main Closing Costs?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Transfer Fee (2% of Appraised Value):</strong> By law, this is 2%. However, it's customary for the buyer and seller to split this 50/50 (1% each). Occasionally, government stimulus measures may reduce this to 0.01%.</li>
              <li><strong>Mortgage Registration Fee (1% of Loan Amount):</strong> Paid to the Land Department to register the bank's lien on the property. Cash buyers do not pay this. (Sometimes reduced to 0.01% by government measures).</li>
              <li><strong>Stamp Duty (0.5%):</strong> Applicable if the seller has owned the property for over 5 years or has been on the house registration for over 1 year. Otherwise, a "Specific Business Tax" of 3.3% applies. (Usually paid by the seller, but verify in your contract).</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Additional Developer Fees (for New Homes)</h3>
            <p>
              If you are purchasing a brand-new home from a developer, you must also prepare funds for additional miscellaneous fees upon transfer:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Advance Common Area Fee:</strong> Developers typically collect 1 to 3 years in advance, calculated based on your property size.</li>
              <li><strong>Utility Meter Installation:</strong> Deposits and installation for water and electricity meters, usually around 10,000 to 20,000 THB.</li>
              <li><strong>Juristic Person Sinking Fund:</strong> A one-time initial contribution to the housing estate's emergency fund.</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How to Prepare</h3>
            <p>
              Well before the transfer date, confirm explicitly with the developer or seller who is responsible for which fees. Use the calculator above to estimate the precise amount of cash you need to prepare. As a rule of thumb, keeping 3-5% of the property purchase price in liquid cash will ensure that the transfer of your dream home goes smoothly and without stressful surprises.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calculator, AlertTriangle, CheckCircle } from 'lucide-react';

const NpvIrrCalculator = ({ lang }: any) => {
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [discountRate, setDiscountRate] = useState<number>(10);
  const [cashFlows, setCashFlows] = useState<number[]>([30000, 30000, 30000, 30000, 30000]);

  const handleCashFlowChange = (index: number, value: string) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index] = Number(value);
    setCashFlows(newCashFlows);
  };

  const addYear = () => {
    setCashFlows([...cashFlows, 0]);
  };

  const removeYear = () => {
    if (cashFlows.length > 1) {
      const newCashFlows = [...cashFlows];
      newCashFlows.pop();
      setCashFlows(newCashFlows);
    }
  };

  // Calculation logic
  const calculateNPV = (rate: number, investment: number, flows: number[]) => {
    let npv = -investment;
    for (let i = 0; i < flows.length; i++) {
      npv += flows[i] / Math.pow(1 + rate, i + 1);
    }
    return npv;
  };

  const calculateIRR = (investment: number, flows: number[]) => {
    let low = -0.99;
    let high = 10.0; // 1000%
    const tolerance = 0.00001;
    
    // Check if IRR is possible (sum of cashflows must exceed investment to have positive IRR, or at least have a sign change)
    const totalFlow = flows.reduce((a, b) => a + b, 0);
    if (totalFlow === 0 && investment === 0) return 0;
    
    for(let i=0; i<100; i++) {
        let mid = (low + high) / 2;
        let npv = calculateNPV(mid, investment, flows);
        if (Math.abs(npv) < tolerance) return mid * 100;
        if (npv > 0) {
            low = mid; 
        } else {
            high = mid; 
        }
    }
    return ((low + high) / 2) * 100;
  };

  const rateDecimal = discountRate / 100;
  const npv = calculateNPV(rateDecimal, initialInvestment, cashFlows);
  const irr = calculateIRR(initialInvestment, cashFlows);

  const isAcceptable = npv > 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6 text-emerald-600">
        <TrendingUp className="w-8 h-8 mr-3" />
        <h1 className="text-2xl font-bold">เครื่องมือคำนวณ NPV และ IRR</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">เงินลงทุนเริ่มต้น (Year 0)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">฿</span>
                </div>
                <input
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">อัตราคิดลด (Discount Rate / WACC) %</label>
              <input
                type="number"
                value={discountRate}
                onChange={(e) => setDiscountRate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500"
                min="0"
                step="0.1"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">กระแสเงินสดรับสุทธิรายปี (Cash Flows)</h3>
              <div className="space-x-2">
                <button onClick={removeYear} className="px-2 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200">- ลดปี</button>
                <button onClick={addYear} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-sm hover:bg-emerald-200">+ เพิ่มปี</button>
              </div>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {cashFlows.map((flow, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="w-16 text-sm font-medium text-gray-600">ปีที่ {index + 1}</span>
                  <input
                    type="number"
                    value={flow}
                    onChange={(e) => handleCashFlowChange(index, e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:ring-emerald-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Calculator className="w-5 h-5 mr-2" /> ผลการวิเคราะห์โครงการ
            </h3>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-md shadow-sm border border-emerald-100">
                <p className="text-sm text-gray-500 font-medium mb-1">มูลค่าปัจจุบันสุทธิ (NPV)</p>
                <div className={`text-3xl font-bold ${npv >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  ฿{npv.toLocaleString(undefined, {maximumFractionDigits: 2})}
                </div>
                <p className="text-xs text-gray-500 mt-1">Net Present Value</p>
              </div>

              <div className="bg-white p-4 rounded-md shadow-sm border border-emerald-100">
                <p className="text-sm text-gray-500 font-medium mb-1">อัตราผลตอบแทนภายใน (IRR)</p>
                <div className="text-3xl font-bold text-blue-600">
                  {irr.toLocaleString(undefined, {maximumFractionDigits: 2})}%
                </div>
                <p className="text-xs text-gray-500 mt-1">Internal Rate of Return</p>
              </div>

              <div className={`p-4 rounded-md flex items-start ${isAcceptable ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                {isAcceptable ? (
                  <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold">{isAcceptable ? 'น่าลงทุน (Accept)' : 'ไม่น่าลงทุน (Reject)'}</h4>
                  <p className="text-sm mt-1">
                    {isAcceptable 
                      ? `โครงการนี้มี NPV เป็นบวก (+฿${npv.toLocaleString(undefined, {maximumFractionDigits: 0})}) และมี IRR (${irr.toFixed(2)}%) ซึ่งมากกว่าอัตราคิดลด (${discountRate}%) ถือว่าสร้างมูลค่าเพิ่มให้กิจการ`
                      : `โครงการนี้มี NPV ติดลบ และมี IRR (${irr.toFixed(2)}%) ซึ่งน้อยกว่าอัตราคิดลดต้นทุน (${discountRate}%) ทำให้ความมั่งคั่งของกิจการลดลง`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 prose max-w-none text-gray-800 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4 text-emerald-700">NPV และ IRR คืออะไร? กุญแจสำคัญในการประเมินการลงทุน</h2>
        <p>
          ในการตัดสินใจลงทุนทำโครงการใดโครงการหนึ่ง ไม่ว่าจะเป็นการซื้อเครื่องจักรใหม่ การเปิดสาขาใหม่ หรือการพัฒนาซอฟต์แวร์ ผู้บริหารมักจะพิจารณาจากตัวชี้วัดทางการเงินสองตัวที่สำคัญที่สุด นั่นคือ <strong>มูลค่าปัจจุบันสุทธิ (NPV)</strong> และ <strong>อัตราผลตอบแทนภายใน (IRR)</strong> เครื่องมือทั้งสองนี้ใช้แนวคิดของ "มูลค่าของเงินตามเวลา (Time Value of Money)" หมายความว่า เงิน 100 บาทในวันนี้ มีค่ามากกว่าเงิน 100 บาทในอีก 1 ปีข้างหน้า
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">1. มูลค่าปัจจุบันสุทธิ (Net Present Value : NPV)</h3>
        <p>
          <strong>NPV</strong> คือ การนำกระแสเงินสดที่จะได้รับในอนาคตทั้งหมด มาคิดลด (Discount) กลับมาเป็นมูลค่าของเงินในปัจจุบัน แล้วนำไปหักลบกับเงินลงทุนเริ่มต้น
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>NPV &gt; 0 (เป็นบวก):</strong> โครงการสร้างผลตอบแทนได้มากกว่าต้นทุนของเงินทุน (คุ้มค่า ควรลงทุน)</li>
          <li><strong>NPV = 0:</strong> โครงการคืนทุนพอดี ไม่ได้กำไรและไม่ขาดทุนเชิงเศรษฐศาสตร์</li>
          <li><strong>NPV &lt; 0 (ติดลบ):</strong> โครงการผลตอบแทนน้อยกว่าต้นทุนเงินทุน (ไม่ควรลงทุน เพราะทำให้มูลค่าบริษัทลดลง)</li>
        </ul>
        <p>
          <em>อัตราคิดลด (Discount Rate)</em> ที่นำมาใช้คำนวณ มักจะใช้ต้นทุนเงินทุนถัวเฉลี่ยถ่วงน้ำหนัก (WACC) หรืออัตราผลตอบแทนขั้นต่ำที่บริษัทคาดหวัง
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">2. อัตราผลตอบแทนภายในโครงการ (Internal Rate of Return : IRR)</h3>
        <p>
          <strong>IRR</strong> คือ อัตราคิดลด (Discount Rate) ที่ทำให้ NPV ของโครงการเท่ากับ 0 พอดี พูดง่ายๆ คือเป็น "อัตราผลตอบแทนเฉลี่ยต่อปี" ที่โครงการนี้สามารถทำได้
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>IRR &gt; อัตราคิดลด (WACC):</strong> ควรลงทุน เพราะผลตอบแทนที่ได้ สูงกว่าต้นทุนทางการเงิน</li>
          <li><strong>IRR &lt; อัตราคิดลด (WACC):</strong> ไม่ควรลงทุน เพราะได้ผลตอบแทนไม่คุ้มค่าเหนื่อยหรือดอกเบี้ยที่ต้องจ่าย</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">ความแตกต่างและข้อควรระวัง</h3>
        <p>
          แม้ NPV และ IRR จะใช้ประเมินโครงการได้ดีทั้งคู่ แต่ในบางกรณีอาจให้ผลสรุปที่ขัดแย้งกัน (เช่น โครงการ A มี NPV สูงกว่า แต่โครงการ B มี IRR สูงกว่า) ซึ่งเรียกว่า Mutually Exclusive Projects ในกรณีนี้ <strong>นักการเงินมักจะแนะนำให้ยึด NPV เป็นหลัก</strong> เพราะเป้าหมายสูงสุดของธุรกิจคือการสร้างความมั่งคั่งให้สูงสุด (Maximize Wealth) ซึ่งวัดเป็นจำนวนเงินได้อย่างชัดเจนผ่าน NPV
        </p>
        <p>
          นอกจากนี้ IRR ยังมีข้อจำกัด เช่น หากโครงการมีกระแสเงินสดสลับบวกสลับลบในหลายๆ ปี (Non-conventional cash flows) อาจทำให้คำนวณหาค่า IRR ได้หลายค่า ซึ่งจะนำไปสู่การตีความที่ผิดพลาดได้
        </p>
      </div>
    </div>
  );
};

export default NpvIrrCalculator;

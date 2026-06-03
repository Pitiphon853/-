import React, { useState } from 'react';
import { Tractor, Calculator, RotateCcw, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export default function FarmLandRentRoi({ lang }: { lang: 'TH' | 'EN' }) {
  const [area, setArea] = useState<number | ''>(10);
  const [rentCost, setRentCost] = useState<number | ''>(1500); // per area unit
  const [yieldPerArea, setYieldPerArea] = useState<number | ''>(800); // kg
  const [pricePerYield, setPricePerYield] = useState<number | ''>(10); // per kg
  const [otherCosts, setOtherCosts] = useState<number | ''>(4000); // per area unit

  const t = {
    title: lang === 'TH' ? 'คำนวณค่าเช่าที่ดินเกษตร เทียบกำไร' : 'Farm Land Rent ROI',
    area: lang === 'TH' ? 'พื้นที่เช่า (ไร่ / Acre)' : 'Rented Area (Rai / Acre)',
    rentCost: lang === 'TH' ? 'ค่าเช่าต่อหน่วยพื้นที่' : 'Rent per Area Unit',
    yieldPerArea: lang === 'TH' ? 'ผลผลิตที่คาดหวังต่อพื้นที่ (กก.)' : 'Expected Yield per Area (kg)',
    pricePerYield: lang === 'TH' ? 'ราคาขายต่อหน่วยผลผลิต' : 'Price per Yield Unit',
    otherCosts: lang === 'TH' ? 'ต้นทุนอื่นๆ ต่อพื้นที่ (ปุ๋ย ยา แรงงาน)' : 'Other Costs per Area (Fertilizer, Labor)',
    calculate: lang === 'TH' ? 'คำนวณ' : 'Calculate',
    reset: lang === 'TH' ? 'เริ่มใหม่' : 'Reset',
    revenue: lang === 'TH' ? 'รายได้รวม' : 'Total Revenue',
    totalCosts: lang === 'TH' ? 'ต้นทุนรวม' : 'Total Costs',
    profit: lang === 'TH' ? 'กำไร/ขาดทุน สุทธิ' : 'Net Profit/Loss',
    roi: lang === 'TH' ? 'ผลตอบแทนการลงทุน (ROI)' : 'Return on Investment (ROI)',
    unit: lang === 'TH' ? 'บาท' : 'Unit',
    profitable: lang === 'TH' ? 'คุ้มค่าที่จะลงทุน' : 'Profitable',
    loss: lang === 'TH' ? 'ขาดทุน ไม่แนะนำ' : 'Loss-making',
  };

  const calculateFinancials = () => {
    const a = Number(area) || 0;
    const rent = Number(rentCost) || 0;
    const yld = Number(yieldPerArea) || 0;
    const price = Number(pricePerYield) || 0;
    const costs = Number(otherCosts) || 0;

    const totalRevenue = a * yld * price;
    const totalRent = a * rent;
    const totalOtherCosts = a * costs;
    const totalCosts = totalRent + totalOtherCosts;
    const netProfit = totalRevenue - totalCosts;
    const roi = totalCosts > 0 ? (netProfit / totalCosts) * 100 : 0;

    return { totalRevenue, totalCosts, netProfit, roi };
  };

  const { totalRevenue, totalCosts, netProfit, roi } = calculateFinancials();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-amber-100 rounded-lg">
            <Tractor className="w-6 h-6 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.area}
              </label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                min="0"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.rentCost}
                </label>
                <input
                  type="number"
                  value={rentCost}
                  onChange={(e) => setRentCost(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.otherCosts}
                </label>
                <input
                  type="number"
                  value={otherCosts}
                  onChange={(e) => setOtherCosts(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.yieldPerArea}
                </label>
                <input
                  type="number"
                  value={yieldPerArea}
                  onChange={(e) => setYieldPerArea(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.pricePerYield}
                </label>
                <input
                  type="number"
                  value={pricePerYield}
                  onChange={(e) => setPricePerYield(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  min="0"
                />
              </div>
            </div>

            <button
              onClick={() => {
                setArea(10);
                setRentCost(1500);
                setYieldPerArea(800);
                setPricePerYield(10);
                setOtherCosts(4000);
              }}
              className="w-full mt-4 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t.reset}
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">{t.revenue}</span>
                <span className="text-lg font-semibold text-green-600">
                  {totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">{t.totalCosts}</span>
                <span className="text-lg font-semibold text-red-600">
                  {totalCosts.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="pt-2">
                <span className="block text-sm text-gray-500 mb-1">{t.profit}</span>
                <div className={`text-4xl font-bold flex items-center gap-2 ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {netProfit >= 0 ? <TrendingUp className="w-8 h-8" /> : <TrendingDown className="w-8 h-8" />}
                  {Math.abs(netProfit).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-500">{t.roi}:</span>
                <span className={`font-bold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {roi.toFixed(2)}%
                </span>
                <span className={`text-sm px-2 py-1 rounded-full ${roi > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {roi > 0 ? t.profitable : t.loss}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose prose-amber max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {lang === 'TH' ? 'ก่อนตัดสินใจเช่าที่ดินเกษตร: ทำไมต้องคำนวณความคุ้มค่า (ROI)?' : 'Before Renting Farm Land: Why You Must Calculate ROI'}
        </h2>
        
        {lang === 'TH' ? (
          <>
            <p>
              การขยายพื้นที่เพาะปลูกด้วยการ <strong>เช่าที่ดิน</strong> เป็นหนึ่งในวิธีที่เกษตรกรนิยมใช้เพื่อเพิ่มผลผลิตและรายได้ โดยไม่ต้องใช้เงินก้อนใหญ่ในการซื้อที่ดิน อย่างไรก็ตาม การเช่าที่ดินย่อมมาพร้อมกับต้นทุนคงที่ (Fixed Cost) ที่ต้องจ่ายไม่ว่าปีนั้นผลผลิตจะดีหรือไม่ก็ตาม ดังนั้น การประเมินความคุ้มค่า หรือ <strong>ผลตอบแทนการลงทุน (ROI - Return on Investment)</strong> จึงเป็นก้าวแรกที่สำคัญที่สุดก่อนจรดปากกาเซ็นสัญญาเช่า
            </p>

            <h3>องค์ประกอบของต้นทุนในการเช่าทำเกษตร</h3>
            <p>เพื่อประเมินกำไรขาดทุนอย่างแม่นยำ คุณต้องทราบตัวเลขเหล่านี้:</p>
            <ul>
              <li><strong>ค่าเช่าที่ดิน (Land Rent):</strong> ต้นทุนหลักที่มักจะจ่ายรายปีหรือรายฤดูกาล</li>
              <li><strong>ต้นทุนผันแปรอื่นๆ (Variable Costs):</strong> ได้แก่ ค่าเมล็ดพันธุ์, ค่าปุ๋ย, ค่ายา, ค่าแรงงาน, ค่าน้ำมัน และค่าจ้างรถไถ/รถเกี่ยว</li>
              <li><strong>ผลผลิตที่คาดหวัง (Expected Yield):</strong> ปริมาณผลผลิตเฉลี่ยที่พื้นที่นั้นๆ สามารถทำได้ต่อไร่ (อ้างอิงจากสถิติของพื้นที่)</li>
              <li><strong>ราคาขายคาดการณ์ (Expected Price):</strong> ราคาตลาดที่คาดว่าจะขายได้เมื่อถึงฤดูเก็บเกี่ยว</li>
            </ul>

            <h3>วิธีการคำนวณกำไรและ ROI</h3>
            <p>
              สมมติว่าคุณต้องการเช่าที่นา 10 ไร่ ค่าเช่าไร่ละ 1,500 บาท/ปี<br/>
              ต้นทุนทำนา (ปุ๋ย/ยา/แรงงาน) ประมาณ 4,000 บาท/ไร่<br/>
              คาดว่าจะได้ข้าว 800 กิโลกรัม/ไร่ และขายได้ในราคา 10 บาท/กิโลกรัม
            </p>

            <ol>
              <li><strong>รายได้รวม:</strong> 10 ไร่ × 800 กก. × 10 บาท = <strong>80,000 บาท</strong></li>
              <li><strong>ต้นทุนรวม:</strong> (ค่าเช่า 1,500 + ต้นทุน 4,000) × 10 ไร่ = <strong>55,000 บาท</strong></li>
              <li><strong>กำไรสุทธิ:</strong> รายได้ 80,000 - ต้นทุน 55,000 = <strong>25,000 บาท</strong></li>
            </ol>
            
            <p>
              <strong>การคิดเป็นเปอร์เซ็นต์ ROI:</strong><br/>
              ROI = (กำไรสุทธิ ÷ ต้นทุนรวม) × 100<br/>
              = (25,000 ÷ 55,000) × 100 = <strong>45.45%</strong>
            </p>
            <p>
              หมายความว่า ทุกๆ เงินลงทุน 100 บาท คุณจะได้กำไรกลับมา 45.45 บาท ซึ่งถือเป็นการลงทุนที่คุ้มค่า
            </p>

            <h3>ความเสี่ยงที่ต้องระวัง (Risk Factors)</h3>
            <p>
              แม้การคำนวณบนกระดาษจะดูกำไรดี แต่การเกษตรมีความเสี่ยงเสมอ หากคุณเผื่อใจในเรื่อง <strong>ราคาผลผลิตตกต่ำ</strong> หรือ <strong>ภัยแล้งน้ำท่วม</strong> ที่ทำให้ผลผลิตไม่ได้ตามเป้า (ตัวแปร Yield และ Price ลดลง) คุณอาจพบว่ากำไรหดหาย หรือถึงขั้นติดลบ
            </p>
            <p>
              ดังนั้น แนะนำให้ใช้เครื่องมือ <em>Farm Land Rent ROI Calculator</em> ของเรา เพื่อทดลองใส่ตัวเลขจำลองในสถานการณ์ที่แย่ที่สุด (Worst-case scenario) เช่น ลดผลผลิตลง 20% หรือลดราคาลง 20% หากผลลัพธ์ยังคงมีกำไรหรืออย่างน้อยเท่าทุน การเช่าที่ดินแปลงนั้นก็ถือเป็นการตัดสินใจที่ปลอดภัย
            </p>
          </>
        ) : (
          <>
            <p>
              Expanding your agricultural operation through <strong>renting farmland</strong> is a common strategy to increase production without the massive capital required to purchase land. However, renting introduces a substantial fixed cost that must be paid regardless of whether it’s a good or bad crop year. Evaluating the <strong>Return on Investment (ROI)</strong> is the most crucial step before signing any lease agreement.
            </p>

            <h3>Components of Farming Costs on Rented Land</h3>
            <p>To accurately project profitability, you must estimate the following parameters:</p>
            <ul>
              <li><strong>Land Rent:</strong> The fixed cost usually paid annually, per acre or per hectare.</li>
              <li><strong>Variable Operating Costs:</strong> Seeds, fertilizers, pesticides, labor, fuel, and machinery rental or maintenance.</li>
              <li><strong>Expected Yield:</strong> The historical or projected average production amount per unit of area for that specific land.</li>
              <li><strong>Expected Market Price:</strong> The anticipated selling price of your commodity at harvest time.</li>
            </ul>

            <h3>How to Calculate Profit and ROI</h3>
            <p>
              Let's look at an example. You want to rent 10 acres of land. Rent is $150 per acre.<br/>
              Operating costs are $400 per acre.<br/>
              You expect a yield of 800 units per acre, selling at $1.00 per unit.
            </p>

            <ol>
              <li><strong>Total Revenue:</strong> 10 acres × 800 units × $1.00 = <strong>$8,000</strong></li>
              <li><strong>Total Costs:</strong> (Rent $150 + Ops $400) × 10 acres = <strong>$5,500</strong></li>
              <li><strong>Net Profit:</strong> Revenue $8,000 - Costs $5,500 = <strong>$2,500</strong></li>
            </ol>
            
            <p>
              <strong>Calculating the ROI Percentage:</strong><br/>
              ROI = (Net Profit ÷ Total Costs) × 100<br/>
              = ($2,500 ÷ $5,500) × 100 = <strong>45.45%</strong>
            </p>
            <p>
              This means for every $100 invested (in rent and costs), you generate $45.45 in profit, which indicates a very healthy investment.
            </p>

            <h3>Mind the Risks (Sensitivity Analysis)</h3>
            <p>
              Paper math often looks great, but agriculture is inherently risky. What happens if a drought cuts your yield by 20%? Or if global markets crash and prices drop by 20%? Because rent remains fixed, these variables directly impact your bottom line.
            </p>
            <p>
              We highly recommend using our <em>Farm Land Rent ROI Calculator</em> to perform a sensitivity analysis. Test a "worst-case scenario" by lowering your expected yield and price. If the calculator still shows a breakeven or slight profit, that land lease is a financially secure decision.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

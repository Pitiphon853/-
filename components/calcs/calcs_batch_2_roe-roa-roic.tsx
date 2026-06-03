import React, { useState } from 'react';
import { TrendingUp, Info } from 'lucide-react';

export default function RoeRoaRoic({ lang }: any) {
  const [netIncome, setNetIncome] = useState<number | ''>(1500000);
  const [totalAssets, setTotalAssets] = useState<number | ''>(12000000);
  const [totalEquity, setTotalEquity] = useState<number | ''>(5000000);
  const [totalDebt, setTotalDebt] = useState<number | ''>(4000000);
  const [cash, setCash] = useState<number | ''>(1000000);
  
  const ni = Number(netIncome) || 0;
  const assets = Number(totalAssets) || 0;
  const equity = Number(totalEquity) || 0;
  const debt = Number(totalDebt) || 0;
  const cashVal = Number(cash) || 0;

  // Invested Capital = Debt + Equity - Cash (Simplified approach)
  // Or: Total Assets - Current Liabilities + Short Term Debt
  // We'll use the financing approach: Total Equity + Interest-Bearing Debt - Cash
  const investedCapital = debt + equity - cashVal;

  const roa = assets > 0 ? (ni / assets) * 100 : 0;
  const roe = equity > 0 ? (ni / equity) * 100 : 0;
  
  // NOPAT usually used for ROIC, but for simple visualization, we can use Net Income (or Operating Profit * (1-Tax))
  // Here we use Net Income as a proxy for simplicity, noting it in the UI
  const roic = investedCapital > 0 ? (ni / investedCapital) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <TrendingUp className="mr-2" />
          เครื่องมือคำนวณอัตราผลตอบแทน ROE / ROA / ROIC
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                กำไรสุทธิ (Net Income)
              </label>
              <input
                type="number"
                value={netIncome}
                onChange={(e) => setNetIncome(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                สินทรัพย์รวม (Total Assets)
              </label>
              <input
                type="number"
                value={totalAssets}
                onChange={(e) => setTotalAssets(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ส่วนของผู้ถือหุ้น (Total Equity)
              </label>
              <input
                type="number"
                value={totalEquity}
                onChange={(e) => setTotalEquity(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                หนี้สินที่มีภาระดอกเบี้ย (Total Interest-Bearing Debt)
              </label>
              <input
                type="number"
                value={totalDebt}
                onChange={(e) => setTotalDebt(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เงินสดและรายการเทียบเท่า (Cash)
              </label>
              <input
                type="number"
                value={cash}
                onChange={(e) => setCash(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200 text-center">
            <h3 className="text-sm font-semibold text-blue-800 mb-1">ROA</h3>
            <p className="text-xs text-blue-600 mb-2">Return on Assets</p>
            <div className="text-3xl font-bold text-blue-900">{roa.toFixed(2)}%</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-md border border-green-200 text-center">
            <h3 className="text-sm font-semibold text-green-800 mb-1">ROE</h3>
            <p className="text-xs text-green-600 mb-2">Return on Equity</p>
            <div className="text-3xl font-bold text-green-900">{roe.toFixed(2)}%</div>
          </div>

          <div className="bg-purple-50 p-4 rounded-md border border-purple-200 text-center">
            <h3 className="text-sm font-semibold text-purple-800 mb-1">ROIC</h3>
            <p className="text-xs text-purple-600 mb-2">Return on Invested Capital</p>
            <div className="text-3xl font-bold text-purple-900">{roic.toFixed(2)}%</div>
            <p className="text-[10px] text-purple-500 mt-1">*ใช้สูตรอย่างง่าย Net Income / (Debt+Equity-Cash)</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md prose max-w-none">
        <h2>ทำความเข้าใจ 3 อัตราส่วนผลตอบแทนยอดฮิต: ROE, ROA และ ROIC</h2>
        <p>ในการประเมินประสิทธิภาพการดำเนินงานและการทำกำไรของธุรกิจ (Profitability Ratios) นักลงทุนและผู้บริหารมักจะมองหาตัวเลขที่บอกได้ว่า "บริษัทนำเงินทุนไปสร้างผลตอบแทนได้คุ้มค่าแค่ไหน" ซึ่งตัวเลข 3 ตัวที่เป็นเหมือนเข็มทิศทางการเงิน ได้แก่ ROA, ROE และ ROIC แม้ทั้ง 3 ตัวจะวัดผลตอบแทนเหมือนกัน แต่มุมมองและฐานการคิดนั้นแตกต่างกันอย่างสิ้นเชิง</p>
        
        <h3>1. ROA (Return on Assets) - อัตราผลตอบแทนจากสินทรัพย์</h3>
        <p><strong>สูตร:</strong> กำไรสุทธิ (Net Income) / สินทรัพย์รวม (Total Assets)</p>
        <p><strong>ความหมาย:</strong> ROA บอกเราว่า ทุกๆ 100 บาทที่บริษัทนำไปลงทุนซื้อสินทรัพย์ (เครื่องจักร, สินค้าคงคลัง, อาคาร, เงินสด) สามารถสร้าง "กำไร" กลับมาได้กี่บาท อัตราส่วนนี้สะท้อนถึง <strong>ความสามารถในการบริหารทรัพยากรที่มีอยู่</strong> ยิ่ง ROA สูง แสดงว่าผู้บริหารเก่งในการนำสินทรัพย์ไปสร้างรายได้</p>
        <p><em>ข้อควรระวัง:</em> ROA ของธุรกิจแต่ละประเภทไม่เหมือนกัน ธุรกิจบริการอาจมี ROA สูงเพราะใช้สินทรัพย์น้อย ในขณะที่ธุรกิจโรงงานอุตสาหกรรม (Asset-heavy) มักมี ROA ต่ำกว่า ดังนั้นควรเปรียบเทียบ ROA กับบริษัทในอุตสาหกรรมเดียวกันเท่านั้น</p>

        <h3>2. ROE (Return on Equity) - อัตราผลตอบแทนจากส่วนของผู้ถือหุ้น</h3>
        <p><strong>สูตร:</strong> กำไรสุทธิ (Net Income) / ส่วนของผู้ถือหุ้น (Total Equity)</p>
        <p><strong>ความหมาย:</strong> ROE คือตัวเลขที่ "ผู้ถือหุ้น" สนใจมากที่สุด เพราะมันบอกว่า เงินลงทุนของเจ้าของทุกๆ 100 บาท บริษัทสามารถนำไปสร้างกำไรกลับมาให้เจ้าของได้กี่บาท บริษัทที่มี ROE สูงๆ มักจะสามารถเติบโตได้เร็วโดยไม่ต้องขอเพิ่มทุนจากผู้ถือหุ้นบ่อยๆ</p>
        <p><em>ข้อควรระวัง:</em> ROE ที่สูง อาจเกิดจาก "การกู้หนี้มาลงทุนเยอะ" (Leverage) หากบริษัทมีหนี้สูงมาก ส่วนของผู้ถือหุ้นจะเล็กลง ทำให้คำนวณ ROE ออกมาสูงผิดปกติ ซึ่งแฝงมากับความเสี่ยงทางการเงินที่สูงขึ้นเช่นกัน (สามารถวิเคราะห์ลึกลงไปได้ด้วย DuPont Analysis)</p>

        <h3>3. ROIC (Return on Invested Capital) - อัตราผลตอบแทนจากเงินทุนหมุนเวียน</h3>
        <p><strong>สูตร (แบบง่าย):</strong> กำไรสุทธิ หรือ NOPAT / (หนี้สินที่มีดอกเบี้ย + ส่วนของผู้ถือหุ้น - เงินสด)</p>
        <p><strong>ความหมาย:</strong> ROIC เป็นตัวเลขที่ตัดความบิดเบือนของ ROE และ ROA ออกไป โดยโฟกัสเฉพาะ "เงินทุนที่นำไปใช้ดำเนินกิจการจริงๆ" (Invested Capital) ซึ่งประกอบด้วยเงินของเจ้าของรวมกับเงินกู้ยืมที่มีดอกเบี้ย และหักเงินสดส่วนเกินที่นอนนิ่งอยู่ในธนาคารออกไป</p>
        <p>หาก ROIC ของบริษัท สูงกว่าต้นทุนทางการเงิน (WACC - Weighted Average Cost of Capital) นั่นแปลว่า <strong>บริษัทกำลังสร้างมูลค่าเพิ่ม (Value Creation) ให้กับธุรกิจ</strong> แต่ถ้า ROIC ต่ำกว่า WACC แปลว่ายิ่งดำเนินกิจการไป มูลค่าของบริษัทยิ่งหดหาย</p>

        <h3>บทสรุป</h3>
        <ul>
          <li><strong>ROA:</strong> ดูว่าผู้บริหารใช้ "สินทรัพย์" เก่งแค่ไหน</li>
          <li><strong>ROE:</strong> ดูว่าบริษัทสร้างผลตอบแทนให้ "เจ้าของ/ผู้ถือหุ้น" ได้คุ้มค่าหรือไม่</li>
          <li><strong>ROIC:</strong> ดูว่าบริษัทนำ "เงินทุนทั้งหมดที่หามาได้" ไปหมุนเวียนสร้างผลตอบแทนได้ชนะต้นทุนดอกเบี้ยหรือเปล่า</li>
        </ul>
        <p>การนำทั้ง 3 ตัวเลขนี้มาพิจารณาประกอบกัน จะช่วยให้มองเห็นภาพรวมของสุขภาพทางการเงินและความสามารถในการแข่งขันของบริษัทได้อย่างทะลุปรุโปร่งมากยิ่งขึ้น</p>
      </div>
    </div>
  );
}

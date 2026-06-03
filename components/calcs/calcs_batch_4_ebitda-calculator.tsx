import React, { useState } from 'react';
import { BarChart3, Calculator, DollarSign, PieChart, TrendingUp } from 'lucide-react';

export default function EbitdaCalculator({ lang }: any) {
  const [inputs, setInputs] = useState({
    revenue: 5000000,
    netIncome: 500000,
    interest: 100000,
    taxes: 150000,
    depreciation: 200000,
    amortization: 50000
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: Number(e.target.value) }));
  };

  // EBITDA Calculation
  const ebitda = inputs.netIncome + inputs.interest + inputs.taxes + inputs.depreciation + inputs.amortization;
  
  // EBIT Calculation
  const ebit = inputs.netIncome + inputs.interest + inputs.taxes;

  // Margins
  const ebitdaMargin = inputs.revenue > 0 ? (ebitda / inputs.revenue) * 100 : 0;
  const netMargin = inputs.revenue > 0 ? (inputs.netIncome / inputs.revenue) * 100 : 0;

  const formatNumber = (num: number) => num.toLocaleString('th-TH', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const formatDecimal = (num: number) => num.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-8 p-4 md:p-6 bg-slate-50 text-slate-800">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-800">เครื่องมือคำนวณ EBITDA</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-blue-900 flex items-center gap-2">
                <Calculator className="w-5 h-5" /> งบกำไรขาดทุน (Income Statement)
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">รายได้รวม (Total Revenue)</label>
                  <input type="number" name="revenue" value={inputs.revenue} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                
                <div className="h-px w-full bg-blue-200 my-2"></div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">กำไรสุทธิ (Net Income)</label>
                  <input type="number" name="netIncome" value={inputs.netIncome} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-white" />
                  <p className="text-xs text-slate-500 mt-1">กำไรบรรทัดสุดท้าย (Bottom Line)</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg space-y-4 border border-slate-200">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <DollarSign className="w-5 h-5" /> รายการบวกกลับ (Add-backs)
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">ดอกเบี้ยจ่าย (Interest)</label>
                    <input type="number" name="interest" value={inputs.interest} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">ภาษีเงินได้ (Taxes)</label>
                    <input type="number" name="taxes" value={inputs.taxes} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">ค่าเสื่อมราคา (Depreciation)</label>
                    <input type="number" name="depreciation" value={inputs.depreciation} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">ค่าตัดจำหน่าย (Amortization)</label>
                    <input type="number" name="amortization" value={inputs.amortization} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
              <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 text-blue-800 opacity-50" />
              <h3 className="text-blue-200 font-medium mb-1 relative z-10">EBITDA (กำไรก่อนหักดอกเบี้ย ภาษี และค่าเสื่อมฯ)</h3>
              <div className="text-4xl font-bold mb-4 relative z-10">
                {formatNumber(ebitda)} <span className="text-xl font-normal text-blue-300">฿</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-800/50 relative z-10">
                <div>
                  <div className="text-blue-300 text-sm">EBIT (Operating Profit)</div>
                  <div className="text-xl font-semibold">{formatNumber(ebit)} ฿</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-slate-600" />
                <h3 className="font-semibold text-slate-800">เปรียบเทียบอัตรากำไร (Margin)</h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-blue-700">EBITDA Margin</span>
                    <span className="font-bold text-blue-700">{formatDecimal(ebitdaMargin)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(ebitdaMargin, 100)}%` }}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">แสดงความสามารถในการทำกำไรจาก "การดำเนินงานล้วนๆ"</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-emerald-600">Net Profit Margin</span>
                    <span className="font-bold text-emerald-600">{formatDecimal(netMargin)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${Math.min(netMargin, 100)}%` }}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">กำไรบรรทัดสุดท้าย หลังหักค่าใช้จ่ายทางการเงินและภาษีทั้งหมด</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 text-sm text-amber-900">
              <strong>ที่มาของสูตร:</strong><br />
              EBITDA = กำไรสุทธิ + ดอกเบี้ยจ่าย + ภาษีเงินได้ + ค่าเสื่อมราคา + ค่าตัดจำหน่าย
            </div>

          </div>
        </div>
      </div>

      <article className="prose max-w-none bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">EBITDA คืออะไร? ทำไมถึงสำคัญในการประเมินมูลค่ากิจการ</h2>
        
        <p>เวลาอ่านงบการเงินหรือฟังข่าวการควบรวมกิจการ (M&A) เรามักจะได้ยินคำว่า <strong>EBITDA (อีบิทดา)</strong> อยู่บ่อยครั้ง ตัวเลขนี้แม้จะไม่ได้ถูกบังคับให้แสดงในงบการเงินมาตรฐาน (GAAP/TFRS) แต่กลับเป็นตัวชี้วัดที่นักลงทุนและนายธนาคารให้ความสำคัญเป็นอันดับต้นๆ</p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">EBITDA ย่อมาจากอะไร?</h3>
        <p>EBITDA ย่อมาจาก <strong>Earnings Before Interest, Taxes, Depreciation, and Amortization</strong> แปลเป็นไทยว่า <em>"กำไรก่อนหักดอกเบี้ย ภาษี ค่าเสื่อมราคา และค่าตัดจำหน่าย"</em></p>
        <p>เพื่อหาค่า EBITDA เรามักจะเริ่มจาก <strong>"กำไรสุทธิ (Net Income)"</strong> ที่อยู่บรรทัดล่างสุดของงบกำไรขาดทุน แล้วนำค่าใช้จ่าย 4 ตัวข้างต้น <strong>บวกกลับเข้าไป</strong></p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ทำไมต้อง "บวกกลับ" (Add-backs) ค่าใช้จ่ายเหล่านี้?</h3>
        <p>จุดประสงค์หลักของ EBITDA คือการวัด <strong>"ความสามารถในการทำกำไรจากการดำเนินงานหลักจริงๆ (Core Operational Profitability)"</strong> โดยตัดปัจจัยเรื่องโครงสร้างทุนและนโยบายทางบัญชีออกไป:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Interest (ดอกเบี้ย):</strong> ดอกเบี้ยเกิดจากวิธีที่บริษัทจัดหาเงินทุน (กู้เงินเยอะ vs ใช้เงินทุนตัวเอง) ไม่ได้เกี่ยวกับว่าบริษัทขายของเก่งแค่ไหน</li>
          <li><strong>Taxes (ภาษี):</strong> อัตราภาษีขึ้นอยู่กับกฎหมาย นโยบายรัฐ หรือสิทธิประโยชน์ (BOI) ซึ่งบริษัทควบคุมไม่ได้โดยตรง</li>
          <li><strong>Depreciation (ค่าเสื่อมราคา):</strong> เป็นค่าใช้จ่ายทางบัญชีของสินทรัพย์ที่มีตัวตน (เช่น โรงงาน เครื่องจักร) ซึ่งไม่ได้เกิดการจ่าย "เงินสด" ออกไปจริงๆ ในปีนั้น</li>
          <li><strong>Amortization (ค่าตัดจำหน่าย):</strong> เป็นค่าใช้จ่ายทางบัญชีของสินทรัพย์ที่ไม่มีตัวตน (เช่น ลิขสิทธิ์ สิทธิบัตร โปรแกรมคอมพิวเตอร์) ซึ่งก็ไม่ใช่รายจ่ายที่เป็นเงินสดเช่นกัน</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ประโยชน์ของ EBITDA</h3>
        
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800">1. ใช้เปรียบเทียบบริษัทในอุตสาหกรรมเดียวกัน (Apple to Apple)</h4>
            <p className="text-sm mt-1">ทำให้เราเปรียบเทียบบริษัท A (กู้เงินเยอะ มีค่าเสื่อมโรงงานสูง) กับบริษัท B (ไม่กู้เงินเลย เช่าโรงงาน) ได้อย่างยุติธรรมว่าใครบริหารงานหลักได้เก่งกว่ากัน</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800">2. ตัวแทนของกระแสเงินสด (Proxy for Cash Flow)</h4>
            <p className="text-sm mt-1">เนื่องจากได้บวกกลับค่าเสื่อมราคาและค่าตัดจำหน่าย (ซึ่งเป็น Non-cash items) กลับมาแล้ว EBITDA จึงมักถูกใช้เพื่อประเมินกระแสเงินสดคร่าวๆ ว่าบริษัทมีเงินสดเหลือพอไปจ่ายหนี้หรือไม่</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800">3. ใช้ประเมินมูลค่ากิจการ (Valuation)</h4>
            <p className="text-sm mt-1">ในการซื้อขายกิจการ มักจะประเมินมูลค่าด้วย <strong>EV/EBITDA Multiple</strong> เช่น การซื้อกิจการในราคา 8 เท่าของ EBITDA (หมายความว่า ถ้าผลประกอบการคงที่ ต้องใช้เวลา 8 ปีถึงจะคืนทุนจากการดำเนินงาน)</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ข้อควรระวัง</h3>
        <p>วอร์เรน บัฟเฟตต์ (Warren Buffett) เคยวิจารณ์ EBITDA ไว้ว่า <em>"ผู้บริหารคิดว่าการซื้อเครื่องจักรและลงทุนมันฟรีหรือไง?"</em> เพราะ EBITDA ไม่สนใจค่าเสื่อมราคา ทำให้บริษัทที่มีการลงทุนหนักๆ (Capital Intensive) เช่น โทรคมนาคม หรือ สายการบิน อาจดูเหมือนมีกำไรสวยหรู (EBITDA สูง) แต่แท้จริงแล้วต้องนำเงินสดไปซื้อเครื่องจักรใหม่ตลอดเวลา ดังนั้นจึงควรดู EBITDA ควบคู่ไปกับ <strong>กระแสเงินสดอิสระ (Free Cash Flow)</strong> เสมอ</p>

      </article>
    </div>
  );
}

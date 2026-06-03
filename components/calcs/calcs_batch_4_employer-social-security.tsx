import React, { useState } from 'react';
import { ShieldPlus, Calculator, Users, Info, Building } from 'lucide-react';

export default function EmployerSocialSecurity({ lang }: any) {
  const [inputs, setInputs] = useState({
    employeesBelowMax: 5,   // Employees earning <= 15,000
    avgSalaryBelowMax: 12000,
    employeesAboveMax: 10,  // Employees earning > 15,000
    avgSalaryAboveMax: 35000,
    wcfRate: 0.2 // กองทุนเงินทดแทน rate % (0.2 - 1.0)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: Number(e.target.value) }));
  };

  const MIN_WAGE_BASE = 1650;
  const MAX_WAGE_BASE = 15000;
  const WCF_MAX_BASE_PER_YEAR = 240000; // 20,000 baht per month cap per employee for WCF

  // SSO Calculation (5%)
  // For below max:
  const baseBelow = Math.max(MIN_WAGE_BASE, inputs.avgSalaryBelowMax);
  const ssoPerEmpBelow = baseBelow * 0.05;
  const totalSsoBelow = ssoPerEmpBelow * inputs.employeesBelowMax;

  // For above max:
  const ssoPerEmpAbove = MAX_WAGE_BASE * 0.05; // 750 max
  const totalSsoAbove = ssoPerEmpAbove * inputs.employeesAboveMax;

  const totalMonthlySso = totalSsoBelow + totalSsoAbove;
  const totalYearlySso = totalMonthlySso * 12;

  // WCF Calculation (varies %, calculated annually)
  // WCF cap is 20,000 per month (240,000 per year) per employee
  const wcfBaseBelow = Math.min(inputs.avgSalaryBelowMax, 20000) * 12;
  const totalWcfBelow = (wcfBaseBelow * inputs.employeesBelowMax) * (inputs.wcfRate / 100);

  const wcfBaseAbove = Math.min(inputs.avgSalaryAboveMax, 20000) * 12;
  const totalWcfAbove = (wcfBaseAbove * inputs.employeesAboveMax) * (inputs.wcfRate / 100);

  const totalYearlyWcf = totalWcfBelow + totalWcfAbove;

  const totalEmployees = inputs.employeesBelowMax + inputs.employeesAboveMax;
  const totalPayrollYearly = ((inputs.avgSalaryBelowMax * inputs.employeesBelowMax) + (inputs.avgSalaryAboveMax * inputs.employeesAboveMax)) * 12;
  
  const totalEmployerBurdenYearly = totalYearlySso + totalYearlyWcf;
  const burdenPercentage = (totalEmployerBurdenYearly / totalPayrollYearly) * 100;

  const formatNumber = (num: number) => num.toLocaleString('th-TH', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const formatDecimal = (num: number) => num.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-8 p-4 md:p-6 bg-slate-50 text-slate-800">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <ShieldPlus className="w-8 h-8 text-teal-600" />
          <h2 className="text-2xl font-bold text-slate-800">คำนวณต้นทุนสวัสดิการภาคบังคับ (ประกันสังคม & กองทุนเงินทดแทน)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-teal-50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-teal-900 flex items-center gap-2">
                <Users className="w-5 h-5" /> จำนวนพนักงานและฐานเงินเดือน
              </h3>
              
              <div className="space-y-4">
                <div className="p-3 border border-teal-200 rounded bg-white">
                  <h4 className="text-sm font-bold text-slate-700 mb-2">กลุ่มที่ 1: เงินเดือนไม่เกิน 15,000 บาท</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">จำนวนพนักงาน (คน)</label>
                      <input type="number" name="employeesBelowMax" value={inputs.employeesBelowMax} onChange={handleChange} className="w-full px-3 py-1.5 border rounded" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">เงินเดือนเฉลี่ย (บาท/เดือน)</label>
                      <input type="number" name="avgSalaryBelowMax" value={inputs.avgSalaryBelowMax} onChange={handleChange} className="w-full px-3 py-1.5 border rounded" />
                    </div>
                  </div>
                </div>

                <div className="p-3 border border-teal-200 rounded bg-white">
                  <h4 className="text-sm font-bold text-slate-700 mb-2">กลุ่มที่ 2: เงินเดือนเกิน 15,000 บาท</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">จำนวนพนักงาน (คน)</label>
                      <input type="number" name="employeesAboveMax" value={inputs.employeesAboveMax} onChange={handleChange} className="w-full px-3 py-1.5 border rounded" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">เงินเดือนเฉลี่ย (บาท/เดือน)</label>
                      <input type="number" name="avgSalaryAboveMax" value={inputs.avgSalaryAboveMax} onChange={handleChange} className="w-full px-3 py-1.5 border rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Building className="w-5 h-5 text-slate-500" /> อัตราเงินสมทบกองทุนเงินทดแทน
              </h3>
              <div className="p-4 border rounded-lg bg-white">
                <label className="block text-sm font-medium text-slate-700 mb-2">อัตราเงินสมทบตามความเสี่ยงธุรกิจ (%)</label>
                <select name="wcfRate" value={inputs.wcfRate} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mb-2">
                  <option value={0.2}>0.2% (พาณิชยกรรม, บริการ, สำนักงาน)</option>
                  <option value={0.5}>0.5% (อุตสาหกรรมเบา)</option>
                  <option value={0.8}>0.8% (ก่อสร้าง, ขนส่ง)</option>
                  <option value={1.0}>1.0% (อุตสาหกรรมหนัก, เหมืองแร่)</option>
                </select>
                <p className="text-xs text-slate-500">เรียกเก็บปีละ 1 ครั้ง ฐานสูงสุดไม่เกิน 240,000 บาท/คน/ปี</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">สรุปภาระค่าใช้จ่ายของนายจ้าง</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                <div className="text-sm font-semibold text-slate-700 mb-1">เงินสมทบประกันสังคม (ต่อเดือน)</div>
                <div className="text-2xl font-bold text-slate-800">{formatNumber(totalMonthlySso)} ฿</div>
                <div className="text-xs text-slate-500 mt-1">รวมทั้งบริษัท ({totalEmployees} คน)</div>
              </div>

              <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                <div className="text-sm font-semibold text-slate-700 mb-1">กองทุนเงินทดแทน (ต่อปี)</div>
                <div className="text-2xl font-bold text-slate-800">{formatNumber(totalYearlyWcf)} ฿</div>
                <div className="text-xs text-slate-500 mt-1">เรท {inputs.wcfRate}%</div>
              </div>
            </div>

            <div className="bg-teal-50 p-5 rounded-xl border border-teal-200 shadow-sm">
              <h4 className="font-bold text-teal-900 mb-4">งบประมาณสวัสดิการภาคบังคับ รายปี (Annual Budget)</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">เงินสมทบประกันสังคมสะสม 12 เดือน</span>
                  <span className="font-medium">{formatNumber(totalYearlySso)} ฿</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">กองทุนเงินทดแทนรายปี</span>
                  <span className="font-medium">{formatNumber(totalYearlyWcf)} ฿</span>
                </div>
                
                <div className="border-t border-teal-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-teal-900">รวมต้นทุนสวัสดิการที่นายจ้างต้องจ่าย</span>
                    <span className="text-2xl font-bold text-teal-700">{formatNumber(totalEmployerBurdenYearly)} ฿</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border p-4 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-slate-700">สัดส่วนต้นทุนสวัสดิการ ต่อ ฐานเงินเดือน</div>
                <div className="text-xs text-slate-500">ต้นทุนแฝง (On-cost) ที่เพิ่มขึ้นจากการจ้างงาน</div>
              </div>
              <div className="text-xl font-bold text-emerald-600">{formatDecimal(burdenPercentage)}%</div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 text-sm text-amber-800 flex items-start gap-2">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>นี่คือส่วนที่ <strong>นายจ้างต้องควักกระเป๋าจ่ายสมทบ</strong> นอกเหนือจากเงินเดือนพนักงาน (ไม่รวมส่วนที่หักจากเงินเดือนพนักงาน 5%)</p>
            </div>
          </div>
        </div>
      </div>

      <article className="prose max-w-none bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">ต้นทุนแฝงที่นายจ้างต้องรู้: ประกันสังคม และ กองทุนเงินทดแทน</h2>
        
        <p>เมื่อบริษัทจ้างพนักงาน 1 คน ต้นทุนที่บริษัทต้องจ่ายไม่ได้มีเพียงแค่ "เงินเดือน" หรือค่าจ้างเพียวๆ เท่านั้น แต่ยังมี <strong>สวัสดิการภาคบังคับตามกฎหมาย (Statutory Benefits)</strong> ที่นายจ้างมีหน้าที่ต้องนำส่งเข้ากองทุนของรัฐ ซึ่งถือเป็นต้นทุนแฝง (On-costs) ที่ฝ่ายบุคคลและเจ้าของกิจการต้องนำมาคำนวณในการตั้งงบประมาณ (Payroll Budget) ด้วย</p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">1. กองทุนประกันสังคม (Social Security Fund)</h3>
        <p>กองทุนประกันสังคมให้ความคุ้มครองพนักงานในกรณีเจ็บป่วย คลอดบุตร ทุพพลภาพ ตาย สงเคราะห์บุตร ชราภาพ และว่างงาน</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>อัตรานำส่ง:</strong> นายจ้างต้องสมทบ <strong>5%</strong> ของฐานเงินเดือนลูกจ้าง (ในขณะเดียวกันก็หักจากลูกจ้างอีก 5% เพื่อนำส่งพร้อมกัน)</li>
          <li><strong>ฐานการคำนวณ:</strong> คิดจากฐานเงินเดือนขั้นต่ำ 1,650 บาท และ <strong>สูงสุดไม่เกิน 15,000 บาท</strong></li>
          <li><strong>เพดานการจ่าย:</strong> นั่นหมายความว่า หากพนักงานเงินเดือน 30,000 บาท นายจ้างก็จ่ายสมทบสูงสุดเพียง <strong>750 บาท/เดือน</strong> เท่านั้น (15,000 x 5%)</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">2. กองทุนเงินทดแทน (Workmen's Compensation Fund)</h3>
        <p>กองทุนเงินทดแทน เป็นกองทุนที่คุ้มครองพนักงานกรณีที่ประสบอันตราย เจ็บป่วย สูญเสียอวัยวะ ทุพพลภาพ หรือตาย <strong>"อันเนื่องมาจากการทำงานให้นายจ้าง"</strong> โดยตรง <em>(ต่างจากประกันสังคมที่คุ้มครองนอกเวลางานด้วย)</em></p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ผู้จ่าย:</strong> <strong>นายจ้างเป็นผู้จ่ายแต่เพียงผู้เดียว</strong> (ห้ามหักจากเงินเดือนลูกจ้างเด็ดขาด)</li>
          <li><strong>อัตรานำส่ง:</strong> จ่ายปีละ 1 ครั้ง โดยอัตราจะอยู่ระหว่าง <strong>0.2% ถึง 1.0%</strong> ขึ้นอยู่กับระดับความเสี่ยงของประเภทธุรกิจ (เช่น งานออฟฟิศความเสี่ยงต่ำ จ่าย 0.2% งานก่อสร้างหรือเหมืองแร่ จ่าย 1.0%)</li>
          <li><strong>ฐานการคำนวณ:</strong> คิดจากค่าจ้างทั้งปี โดยมีเพดานสูงสุดที่ <strong>240,000 บาท/ปี</strong> (หรือเทียบเท่าฐานเงินเดือน 20,000 บาท/เดือน)</li>
          <li><strong>ระบบ Experience Rating:</strong> หากในปีที่ผ่านมา พนักงานของบริษัทไม่มีการเบิกเคลมกองทุนเงินทดแทนเลย ในปีที่ 4 เป็นต้นไป นายจ้างจะได้รับส่วนลดอัตราเงินสมทบเพื่อเป็นรางวัลจูงใจให้รักษาระบบความปลอดภัยในการทำงาน</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ทำไมการคำนวณเรื่องนี้ถึงสำคัญ?</h3>
        <p>สำหรับบริษัทขนาดเล็กอาจจะดูเป็นเงินไม่มาก แต่สำหรับโรงงานหรือบริษัทที่มีพนักงานหลักร้อยหรือหลักพันคน ยอดเงินสมทบประกันสังคมและกองทุนเงินทดแทนรวมกันสามารถสูงถึงหลายล้านบาทต่อปี การละเลยไม่ทำความเข้าใจหรือนำส่งล่าช้า จะมีเบี้ยปรับและเงินเพิ่ม (Surcharge) ในอัตรา 2% ต่อเดือนของจำนวนเงินที่ต้องนำส่ง ซึ่งเป็นการสูญเสียที่ไม่จำเป็น</p>
      </article>
    </div>
  );
}

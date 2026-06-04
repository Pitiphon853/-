import React, { useState } from 'react';
import { Calculator, DollarSign, Wallet, FileText, Info } from 'lucide-react';

export default function NetIncomeAfterTaxCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  const [income, setIncome] = useState<number | ''>('');
  const [socialSecurity, setSocialSecurity] = useState<number | ''>(9000);
  const [providentFund, setProvidentFund] = useState<number | ''>('');
  const [otherDeductions, setOtherDeductions] = useState<number | ''>('');

  const t = {
    title: lang === 'TH' ? 'คำนวณเงินได้สุทธิหลังหักค่าลดหย่อน' : 'Net Income & Tax Calculator',
    incomeLabel: lang === 'TH' ? 'รายได้รวมทั้งปี (เงินเดือน โบนัส)' : 'Total Yearly Income',
    deductionsTitle: lang === 'TH' ? 'ค่าลดหย่อนพื้นฐาน (บาท)' : 'Basic Deductions (THB)',
    personalDeduct: lang === 'TH' ? 'ค่าลดหย่อนส่วนตัว (60,000 บาท)' : 'Personal Deduction (60k)',
    socialSecurityLabel: lang === 'TH' ? 'ประกันสังคม (สูงสุด 9,000)' : 'Social Security (Max 9k)',
    providentFundLabel: lang === 'TH' ? 'กองทุนสำรองเลี้ยงชีพ / กบข.' : 'Provident Fund',
    otherDeductionsLabel: lang === 'TH' ? 'ค่าลดหย่อนอื่นๆ รวม (เช่น ประกัน, RMF, SSF)' : 'Other Deductions',
    results: lang === 'TH' ? 'สรุปการคำนวณภาษี' : 'Tax Summary',
    grossIncome: lang === 'TH' ? 'เงินได้พึงประเมินรวม' : 'Gross Income',
    expenseDeduct: lang === 'TH' ? 'หักค่าใช้จ่าย (50% ไม่เกิน 100,000)' : 'Expenses (50% max 100k)',
    totalDeductions: lang === 'TH' ? 'รวมหักค่าลดหย่อน' : 'Total Deductions',
    netIncome: lang === 'TH' ? 'เงินได้สุทธิ (Net Income)' : 'Net Taxable Income',
    taxAmount: lang === 'TH' ? 'ภาษีที่ต้องชำระโดยประมาณ' : 'Estimated Tax Amount',
    effectiveTaxRate: lang === 'TH' ? 'อัตราภาษีที่แท้จริง' : 'Effective Tax Rate',
  };

  const calculateTax = () => {
    const totalIncome = Number(income) || 0;
    
    // Calculate expenses for Salary 40(1): 50% but max 100,000
    const expenses = Math.min(totalIncome * 0.5, 100000);
    
    // Deductions
    const personalDeduction = 60000; // Fixed
    const sso = Math.min(Number(socialSecurity) || 0, 9000);
    const provident = Number(providentFund) || 0;
    const others = Number(otherDeductions) || 0;
    
    const totalDeduct = personalDeduction + sso + provident + others;
    
    // Net Income
    let net = totalIncome - expenses - totalDeduct;
    if (net < 0) net = 0;
    
    // Calculate Tax
    let tax = 0;
    let remainingNet = net;

    // Tax brackets
    if (remainingNet > 5000000) {
      tax += (remainingNet - 5000000) * 0.35;
      remainingNet = 5000000;
    }
    if (remainingNet > 2000000) {
      tax += (remainingNet - 2000000) * 0.30;
      remainingNet = 2000000;
    }
    if (remainingNet > 1000000) {
      tax += (remainingNet - 1000000) * 0.25;
      remainingNet = 1000000;
    }
    if (remainingNet > 750000) {
      tax += (remainingNet - 750000) * 0.20;
      remainingNet = 750000;
    }
    if (remainingNet > 500000) {
      tax += (remainingNet - 500000) * 0.15;
      remainingNet = 500000;
    }
    if (remainingNet > 300000) {
      tax += (remainingNet - 300000) * 0.10;
      remainingNet = 300000;
    }
    if (remainingNet > 150000) {
      tax += (remainingNet - 150000) * 0.05;
      remainingNet = 150000;
    }
    // 0 - 150,000 is tax free (0%)

    const effectiveRate = totalIncome > 0 ? (tax / totalIncome) * 100 : 0;

    return {
      totalIncome,
      expenses,
      totalDeduct,
      net,
      tax,
      effectiveRate
    };
  };

  const { totalIncome, expenses, totalDeduct, net, tax, effectiveRate } = calculateTax();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 flex items-center justify-center gap-3">
        <Wallet className="w-8 h-8 text-emerald-500" />
        {t.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              {t.incomeLabel}
            </label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="เช่น 600000"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all text-lg"
            />
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">{t.deductionsTitle}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{t.personalDeduct}</label>
                <input type="text" disabled value="60,000" className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-md text-gray-500 dark:text-gray-300 cursor-not-allowed" />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{t.socialSecurityLabel}</label>
                <input
                  type="number"
                  value={socialSecurity}
                  onChange={(e) => setSocialSecurity(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{t.providentFundLabel}</label>
                <input
                  type="number"
                  value={providentFund}
                  onChange={(e) => setProvidentFund(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{t.otherDeductionsLabel}</label>
                <input
                  type="number"
                  value={otherDeductions}
                  onChange={(e) => setOtherDeductions(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800 flex flex-col">
          <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-300 mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            {t.results}
          </h3>
          
          <div className="space-y-4 flex-grow">
            <div className="flex justify-between items-center py-2 border-b border-emerald-200 dark:border-emerald-800">
              <span className="text-gray-600 dark:text-gray-400">{t.grossIncome}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-emerald-200 dark:border-emerald-800">
              <span className="text-gray-600 dark:text-gray-400">{t.expenseDeduct}</span>
              <span className="font-semibold text-red-500 dark:text-red-400">
                -{expenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-emerald-200 dark:border-emerald-800">
              <span className="text-gray-600 dark:text-gray-400">{t.totalDeductions}</span>
              <span className="font-semibold text-red-500 dark:text-red-400">
                -{totalDeduct.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-3 bg-emerald-100 dark:bg-emerald-800/50 px-4 rounded-lg mt-2">
              <span className="font-bold text-emerald-900 dark:text-emerald-100">{t.netIncome}</span>
              <span className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                {net.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-emerald-100 dark:border-emerald-700">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">{t.taxAmount}</span>
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">{t.effectiveTaxRate}</span>
                <span className="font-semibold text-gray-600 dark:text-gray-300">{effectiveRate.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lang === 'TH' && (
        <article className="mt-12 prose prose-emerald dark:prose-invert max-w-none">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <FileText className="w-7 h-7 text-emerald-500" />
              เงินได้สุทธิ คืออะไร? ทำไมถึงสำคัญในการเสียภาษี
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              หลายคนมักสับสนระหว่าง <strong>"รายได้รวม (Gross Income)"</strong> และ <strong>"เงินได้สุทธิ (Net Income)"</strong> 
              เวลาที่เรายื่นภาษีเงินได้บุคคลธรรมดาประจำปี กรมสรรพากรไม่ได้นำรายได้ทั้งหมดที่เราหามาได้ทั้งปีไปคูณอัตราภาษีทันที 
              แต่กฎหมายอนุญาตให้เรานำรายได้นั้นมาหัก "ค่าใช้จ่าย" และ "ค่าลดหย่อน" ต่างๆ ออกก่อน 
              ส่วนที่เหลือสุดท้ายนี้แหละที่เราเรียกว่า <strong>"เงินได้สุทธิ"</strong> ซึ่งจะเป็นฐานในการคำนวณภาษี
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">สูตรการคำนวณเงินได้สุทธิ</h3>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-xl text-center shadow-sm border border-emerald-100 dark:border-gray-600 mb-6 font-medium text-lg text-emerald-800 dark:text-emerald-300">
              รายได้รวมทั้งปี - หักค่าใช้จ่าย - หักค่าลดหย่อน = เงินได้สุทธิ
            </div>

            <ul className="space-y-4 mb-6 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5 text-emerald-700 dark:text-emerald-300 font-bold text-sm">1</div>
                <div>
                  <strong>รายได้รวมทั้งปี (เงินได้พึงประเมิน):</strong> สำหรับพนักงานประจำหรือมนุษย์เงินเดือน (มาตรา 40(1)) จะรวมถึง เงินเดือน โบนัส ค่าล่วงเวลา (OT) และสวัสดิการอื่นๆ ที่เป็นตัวเงิน
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5 text-emerald-700 dark:text-emerald-300 font-bold text-sm">2</div>
                <div>
                  <strong>หักค่าใช้จ่าย:</strong> กฎหมายให้สิทธิหักค่าใช้จ่ายสำหรับเงินเดือนได้แบบเหมา 50% ของรายได้ แต่จำกัด <strong>สูงสุดไม่เกิน 100,000 บาท</strong> 
                  (แปลว่าถ้ารายได้คุณเกิน 200,000 บาทต่อปี คุณก็หักค่าใช้จ่ายได้สูงสุดแค่ 100,000 บาท)
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5 text-emerald-700 dark:text-emerald-300 font-bold text-sm">3</div>
                <div>
                  <strong>หักค่าลดหย่อน:</strong> นี่คือสิทธิประโยชน์ที่รัฐมอบให้ เพื่อบรรเทาภาระภาษี เช่น ค่าลดหย่อนส่วนตัว 60,000 บาท (ทุกคนได้สิทธินี้), ประกันสังคม (สูงสุด 9,000 บาท), กองทุนสำรองเลี้ยงชีพ, ประกันชีวิต, SSF, RMF, ดอกเบี้ยบ้าน และอื่นๆ อีกมากมาย
                </div>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">อัตราภาษีเงินได้บุคคลธรรมดา (แบบขั้นบันได)</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              เมื่อได้ "เงินได้สุทธิ" มาแล้ว จะนำมาเทียบกับตารางอัตราภาษี ซึ่งประเทศไทยใช้อัตราแบบก้าวหน้า (ยิ่งรายได้สูง ยิ่งเสียภาษีเปอร์เซ็นต์สูงขึ้น) 
              ข้อดีคือ <strong>เงินได้สุทธิ 150,000 บาทแรก ได้รับการยกเว้นภาษี!</strong>
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300 border-collapse">
                <thead>
                  <tr className="bg-emerald-50 dark:bg-emerald-900/50 border-b border-emerald-100 dark:border-emerald-800">
                    <th className="p-3">เงินได้สุทธิ (บาท)</th>
                    <th className="p-3">อัตราภาษี</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3">0 - 150,000</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">ยกเว้น (0%)</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3">150,001 - 300,000</td>
                    <td className="p-3">5%</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3">300,001 - 500,000</td>
                    <td className="p-3">10%</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3">500,001 - 750,000</td>
                    <td className="p-3">15%</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3">750,001 - 1,000,000</td>
                    <td className="p-3">20%</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3">1,000,001 - 2,000,000</td>
                    <td className="p-3">25%</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3">2,000,001 - 5,000,000</td>
                    <td className="p-3">30%</td>
                  </tr>
                  <tr>
                    <td className="p-3">5,000,001 ขึ้นไป</td>
                    <td className="p-3">35%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-lg">
              <Info className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>เคล็ดลับคนรวย:</strong> คนที่วางแผนภาษีเก่งๆ จะพยายามหา "ค่าลดหย่อน" มาเพิ่มเติมอย่างถูกกฎหมาย เพื่อกด "เงินได้สุทธิ" ให้ลดลงไปอยู่ในฐานภาษีที่ต่ำกว่า ซึ่งจะช่วยประหยัดเงินค่าภาษีได้เป็นหลักหมื่นถึงหลักแสนบาทต่อปี
              </p>
            </div>
            
          </div>
        </article>
      )}
    </div>
  );
}

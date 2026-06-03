import React, { useState } from 'react';
import { TrendingUp, Calculator, PiggyBank } from 'lucide-react';

export default function CondoRentVsBuyToLetROI({ lang }: any) {
  const isTH = lang === 'TH';
  const [condoPrice, setCondoPrice] = useState<number>(3000000);
  const [setupCost, setSetupCost] = useState<number>(200000);
  const [monthlyRent, setMonthlyRent] = useState<number>(15000);
  const [commonFeeYearly, setCommonFeeYearly] = useState<number>(18000);
  const [vacancyMonths, setVacancyMonths] = useState<number>(1);
  const [agencyFeeMonths, setAgencyFeeMonths] = useState<number>(1);

  const totalInvestment = condoPrice + setupCost;
  const grossIncome = monthlyRent * (12 - vacancyMonths);
  const totalExpenses = commonFeeYearly + (agencyFeeMonths * monthlyRent);
  const netIncome = grossIncome - totalExpenses;
  const roi = (netIncome / totalInvestment) * 100;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-8 h-8 text-emerald-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'คำนวณกำไรซื้อคอนโดปล่อยเช่า (ROI)' : 'Condo Buy-to-Let ROI Calculator'}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ราคาคอนโดรวมวันโอน (บาท)' : 'Condo Price + Transfer Costs'}</label>
            <input type="number" value={condoPrice} onChange={(e) => setCondoPrice(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ค่าตกแต่ง/เฟอร์นิเจอร์ (บาท)' : 'Furnishing & Setup Cost'}</label>
            <input type="number" value={setupCost} onChange={(e) => setSetupCost(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ค่าเช่าที่คาดหวัง (บาท/เดือน)' : 'Expected Monthly Rent'}</label>
            <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ค่าส่วนกลาง (บาท/ปี)' : 'Yearly Common Fee'}</label>
            <input type="number" value={commonFeeYearly} onChange={(e) => setCommonFeeYearly(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ห้องว่างไม่มีคนเช่า (เดือน/ปี)' : 'Vacancy (Months/Year)'}</label>
              <input type="number" value={vacancyMonths} onChange={(e) => setVacancyMonths(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ค่านายหน้า (เดือน)' : 'Agency Fee (Months)'}</label>
              <input type="number" value={agencyFeeMonths} onChange={(e) => setAgencyFeeMonths(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-emerald-900 mb-4">{isTH ? 'ผลตอบแทนการลงทุน (ROI)' : 'Return on Investment'}</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700"><span>{isTH ? 'เงินลงทุนรวม' : 'Total Investment'}:</span><span>฿{totalInvestment.toLocaleString()}</span></div>
            <div className="flex justify-between text-gray-700"><span>{isTH ? 'รายได้ต่อปี' : 'Yearly Income'}:</span><span className="text-green-600">฿{grossIncome.toLocaleString()}</span></div>
            <div className="flex justify-between text-gray-700"><span>{isTH ? 'รายจ่ายต่อปี' : 'Yearly Expenses'}:</span><span className="text-red-500">฿{totalExpenses.toLocaleString()}</span></div>
            <div className="flex justify-between font-bold text-gray-800"><span>{isTH ? 'กำไรสุทธิต่อปี' : 'Net Annual Profit'}:</span><span>฿{netIncome.toLocaleString()}</span></div>
            <div className="pt-6 mt-4 border-t border-emerald-200">
              <div className="text-center">
                <span className="block text-sm text-gray-600 mb-1">{isTH ? 'ผลตอบแทน (Net Yield/ROI)' : 'Net Yield / ROI'}</span>
                <span className="text-5xl font-extrabold text-emerald-600">{roi.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-10 prose prose-emerald max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isTH ? 'การคำนวณความคุ้มค่า ซื้อคอนโดปล่อยเช่า (Buy to Let) ได้กำไรจริงหรือ?' : 'Condo Rent vs Buy to Let ROI Analysis'}
        </h2>
        {isTH ? (
          <>
            <p>การลงทุนในอสังหาริมทรัพย์ โดยเฉพาะ "การซื้อคอนโดเพื่อปล่อยเช่า (Buy to Let)" เป็นหนึ่งในวิธีสร้างรายได้แบบ Passive Income ที่ได้รับความนิยม แต่หลายคนมักมองแค่ตัวเลขค่าเช่ารายเดือน จนลืมคำนวณต้นทุนแฝงและค่าใช้จ่ายที่เกิดขึ้นจริง ทำให้ผลตอบแทนหรือ ROI (Return on Investment) ที่คาดหวังไม่เป็นไปตามเป้า บทความนี้จะพาคุณเจาะลึกวิธีการประเมินผลกำไรที่แท้จริง</p>
            <h3>ต้นทุนที่ต้องนำมาคิด (Total Investment)</h3>
            <p>ต้นทุนของคุณไม่ใช่แค่ราคาหน้าสัญญาของคอนโด แต่ต้องรวมถึงค่าใช้จ่ายในวันโอนกรรมสิทธิ์ เช่น ค่าจดจำนอง ค่ากองทุน และที่สำคัญที่สุดคือ "ค่าตกแต่งและเครื่องใช้ไฟฟ้า" เพื่อให้ห้องพร้อมปล่อยเช่า หากคุณแต่งห้องแพงเกินไป ต้นทุนจะสูงและทำให้จุดคุ้มทุนยาวนานขึ้น</p>
            <h3>รายได้และรายจ่ายรายปี</h3>
            <p>ในการคำนวณรายได้ คุณต้องเผื่อใจสำหรับ "เดือนที่ว่าง (Vacancy)" ด้วย ไม่มีคอนโดไหนที่มีคนเช่าเต็ม 12 เดือนทุกปีตลอดไป การประเมินแบบปลอดภัยควรเผื่อเวลาหาคนเช่าใหม่ประมาณ 1 เดือนต่อปี นอกจากนี้ หากคุณพึ่งพาเอเจนซี่ (Agent) ในการหาคนเช่า คุณจะต้องจ่ายค่านายหน้า 1 เดือนสำหรับสัญญาเช่า 1 ปี ซึ่งนับเป็นรายจ่ายสำคัญ</p>
            <p>อย่าลืมหักลบ "ค่าส่วนกลางรายปี" ซึ่งเป็นต้นทุนคงที่ (Fixed Cost) ที่เจ้าของห้องต้องจ่ายให้นิติบุคคล แม้ห้องจะว่างก็ตาม และหากเป็นไปได้ ควรเผื่อค่าใช้จ่ายในการซ่อมแซมเล็กๆ น้อยๆ ระหว่างปีไว้ด้วย</p>
            <h3>Net Yield และ ROI ที่ดีควรเป็นเท่าไหร่?</h3>
            <p>ผลตอบแทนสุทธิ (Net Yield) ที่เหมาะสมสำหรับการลงทุนคอนโดปล่อยเช่าในปัจจุบัน ควรอยู่ที่ประมาณ 4% - 6% ขึ้นไป หากผลตอบแทนนี้น้อยกว่าดอกเบี้ยเงินกู้บ้าน (กรณีที่คุณกู้ธนาคารมาซื้อ) คุณอาจจะกำลังขาดทุนเงินสด (Negative Cash Flow) หรือที่เรียกว่าต้องควักเนื้อจ่ายค่าผ่อนทุกเดือน</p>
            <h3>สรุป</h3>
            <p>ก่อนตัดสินใจซื้อคอนโดเพื่อลงทุน ให้ใช้เครื่องคำนวณจำลองสถานการณ์นี้ เพื่อดูตัวเลขกำไรสุทธิ หาก Net Yield อยู่ในเกณฑ์ที่ดี และทำเลนั้นมีโอกาสที่ราคาคอนโดจะเติบโตในอนาคต (Capital Gain) การซื้อคอนโดปล่อยเช่าก็ถือเป็นการลงทุนที่สร้างความมั่งคั่งระยะยาวได้อย่างยั่งยืน</p>
          </>
        ) : (
          <p>Investing in a condo to rent out is a popular strategy for passive income. However, true profitability requires calculating Net Yield or ROI, factoring in hidden costs like furnishing, common fees, agency fees, and vacancy periods. A good net ROI should generally beat local mortgage interest rates to ensure positive cash flow. Use our tool to accurately assess the financial viability of your property investment.</p>
        )}
      </article>
    </div>
  );
}

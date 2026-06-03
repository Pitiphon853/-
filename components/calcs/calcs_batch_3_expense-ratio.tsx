import React, { useState } from 'react';
import { PieChart, DollarSign, Wallet, ArrowDownRight } from 'lucide-react';

const ExpenseRatioCalculator = ({ lang }: any) => {
  const [totalRevenue, setTotalRevenue] = useState<number>(5000000);
  const [operatingExpenses, setOperatingExpenses] = useState<number>(1500000);
  const [cogs, setCogs] = useState<number>(2000000); // Optional field if they want net vs gross

  const totalExpenses = operatingExpenses + cogs;
  const opexRatio = totalRevenue > 0 ? (operatingExpenses / totalRevenue) * 100 : 0;
  const totalExpenseRatio = totalRevenue > 0 ? (totalExpenses / totalRevenue) * 100 : 0;
  const netIncome = totalRevenue - totalExpenses;
  const netProfitMargin = totalRevenue > 0 ? (netIncome / totalRevenue) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <PieChart className="w-8 h-8 text-rose-600" />
        <h2 className="text-2xl font-bold text-gray-800">Expense Ratio Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Revenue (รายได้รวม)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={totalRevenue}
                onChange={(e) => setTotalRevenue(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Operating Expenses - OPEX (ค่าใช้จ่ายในการดำเนินงาน)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ArrowDownRight className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={operatingExpenses}
                onChange={(e) => setOperatingExpenses(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">เช่น ค่าการตลาด, เงินเดือนพนักงานออฟฟิศ, ค่าเช่า, ค่าน้ำไฟ</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cost of Goods Sold - COGS (ต้นทุนขาย/ต้นทุนทางตรง)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Wallet className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={cogs}
                onChange={(e) => setCogs(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">ต้นทุนวัตถุดิบหรือสินค้าที่ซื้อมาขายไป (ใส่ 0 หากเป็นธุรกิจบริการล้วน)</p>
          </div>
        </div>

        <div className="bg-rose-50 p-6 rounded-xl flex flex-col justify-center border border-rose-100">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-rose-800 mb-2">Operating Expense Ratio (OER)</h3>
            <div className="text-5xl font-bold text-rose-600">
              {opexRatio.toFixed(2)}%
            </div>
            <p className="text-sm text-rose-700 mt-2">สัดส่วนค่าใช้จ่ายดำเนินงานต่อรายได้</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">Total Expense Ratio:</span>
                <span className="font-bold text-gray-800">{totalExpenseRatio.toFixed(2)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: `${Math.min(totalExpenseRatio, 100)}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-right">รวม COGS + OPEX</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-semibold text-green-800">Net Profit Margin</h4>
                <p className="text-xs text-green-600">อัตรากำไรสุทธิ</p>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {netProfitMargin.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-rose max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Expense Ratio (อัตราส่วนค่าใช้จ่าย) คืออะไร?</h2>
        <p>
          <strong>Expense Ratio</strong> หรืออัตราส่วนค่าใช้จ่าย เป็นตัวชี้วัดทางการเงินที่นำค่าใช้จ่ายไปเทียบกับรายได้รวม เพื่อดูว่าบริษัทมีภาระค่าใช้จ่ายคิดเป็นกี่เปอร์เซ็นต์ของรายได้ ยิ่งอัตราส่วนนี้ต่ำ แสดงว่าบริษัทมีการบริหารจัดการต้นทุนที่ดีและสร้างกำไรได้อย่างมีประสิทธิภาพ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Operating Expense Ratio (OER)</h3>
        <p>
          หนึ่งในอัตราส่วนที่ผู้บริหารให้ความสำคัญที่สุดคือ <strong>Operating Expense Ratio (OER)</strong> ซึ่งจะโฟกัสเฉพาะ <strong>"ค่าใช้จ่ายในการดำเนินงาน" (OPEX - Operating Expenses)</strong> เช่น ค่าโฆษณา เงินเดือนพนักงานออฟฟิศ ค่าเช่า ค่าน้ำ ค่าไฟ (SG&A - Selling, General and Administrative Expenses) โดยไม่รวมต้นทุนขาย (COGS)
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4 flex justify-center text-lg">
          <div className="text-center font-mono font-semibold text-rose-700">
            OER = ( Operating Expenses / Total Revenue ) × 100
          </div>
        </div>

        <p>
          <strong>ตัวอย่าง:</strong> หากบริษัทมีรายได้ 5,000,000 บาท และมีค่าใช้จ่ายดำเนินงาน 1,500,000 บาท ค่า OER จะเท่ากับ 30% หมายความว่าทุกๆ รายได้ 100 บาท บริษัทต้องเสียไปกับค่าบริหารจัดการ 30 บาท
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์ของการวิเคราะห์ Expense Ratio</h3>
        <ul>
          <li><strong>ควบคุมต้นทุน (Cost Control):</strong> ช่วยให้ผู้บริหารเห็นภาพรวมว่าค่าใช้จ่ายในส่วนใดที่โป่งพองเกินไป และควรปรับลด (Cut cost) ตรงไหน</li>
          <li><strong>เปรียบเทียบกับคู่แข่ง (Benchmarking):</strong> หาก OER ของบริษัทคุณสูงกว่าคู่แข่งในอุตสาหกรรมเดียวกัน อาจหมายความว่าโครงสร้างองค์กรของคุณเทอะทะ หรือมีประสิทธิภาพการขายต่ำกว่ามาตรฐาน</li>
          <li><strong>พยากรณ์ความสามารถในการทำกำไร (Profitability Trend):</strong> หากรายได้โตขึ้น แต่ OER เพิ่มขึ้นในอัตราที่เร็วกว่า เป็นสัญญาณเตือนว่าการเติบโตนี้อาจไม่ยั่งยืน (Negative Operating Leverage)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ข้อควรระวัง</h3>
        <p>
          อัตราส่วนนี้อาจแตกต่างกันอย่างมากในแต่ละอุตสาหกรรม ธุรกิจเทคโนโลยี (SaaS) อาจมี OPEX สูง (ค่าการตลาดและ R&D) แต่มี COGS ต่ำมาก ในขณะที่ธุรกิจค้าปลีกอาจมี OPEX ต่ำ แต่ COGS สูง ดังนั้นควรเปรียบเทียบอัตราส่วนนี้กับบริษัทที่มีโมเดลธุรกิจคล้ายคลึงกัน หรือเปรียบเทียบกับผลงานในอดีตของบริษัทเอง
        </p>
        
        <p className="mt-4 text-sm text-gray-500">
          อ้างอิง: การวิเคราะห์อัตราส่วนทางการเงิน (Financial Ratio Analysis) และหลักการบริหารงบประมาณ (Budget Management)
        </p>
      </div>
    </div>
  );
};

export default ExpenseRatioCalculator;

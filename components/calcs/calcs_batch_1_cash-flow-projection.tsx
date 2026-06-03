import React, { useState } from 'react';
import { LineChart, DollarSign } from 'lucide-react';

export default function CashFlowProjection({ lang }: any) {
  const [startingBalance, setStartingBalance] = useState<number | string>('');
  const [avgRevenue, setAvgRevenue] = useState<number | string>('');
  const [revenueGrowth, setRevenueGrowth] = useState<number | string>('0');
  const [avgExpense, setAvgExpense] = useState<number | string>('');
  const [expenseGrowth, setExpenseGrowth] = useState<number | string>('0');

  const initialBalance = Number(startingBalance) || 0;
  const initialRev = Number(avgRevenue) || 0;
  const revGrowth = Number(revenueGrowth) || 0;
  const initialExp = Number(avgExpense) || 0;
  const expGrowth = Number(expenseGrowth) || 0;

  const calculateProjection = () => {
    let currentBalance = initialBalance;
    let currentRev = initialRev;
    let currentExp = initialExp;
    const schedule = [];

    for (let month = 1; month <= 12; month++) {
      const netCashFlow = currentRev - currentExp;
      const endBalance = currentBalance + netCashFlow;

      schedule.push({
        month,
        startBalance: currentBalance,
        inflow: currentRev,
        outflow: currentExp,
        netCashFlow,
        endBalance,
      });

      currentBalance = endBalance;
      currentRev = currentRev * (1 + revGrowth / 100);
      currentExp = currentExp * (1 + expGrowth / 100);
    }
    return schedule;
  };

  const schedule = (initialRev > 0 || initialExp > 0 || initialBalance > 0) ? calculateProjection() : [];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-emerald-100 rounded-full">
          <LineChart className="w-8 h-8 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">เครื่องมือประมาณการกระแสเงินสด 12 เดือน (Cash Flow Projection)</h1>
          <p className="text-gray-500">คาดการณ์เงินสดรับ จ่าย และยอดคงเหลือในแต่ละเดือน</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">ยอดเงินสดคงเหลือยกมา (Starting Balance)</label>
          <input
            type="number"
            value={startingBalance}
            onChange={(e) => setStartingBalance(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="เช่น 500000"
          />
        </div>
        
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <h3 className="font-semibold text-gray-800 flex items-center"><DollarSign className="w-5 h-5 mr-1 text-green-600" /> กระแสเงินสดรับ (Inflows)</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">รายรับเดือนแรก</label>
            <input
              type="number"
              value={avgRevenue}
              onChange={(e) => setAvgRevenue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="เช่น 100000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">อัตราการเติบโตต่อเดือน (%)</label>
            <input
              type="number"
              value={revenueGrowth}
              onChange={(e) => setRevenueGrowth(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="เช่น 2"
            />
          </div>
        </div>

        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <h3 className="font-semibold text-gray-800 flex items-center"><DollarSign className="w-5 h-5 mr-1 text-red-600" /> กระแสเงินสดจ่าย (Outflows)</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">รายจ่ายเดือนแรก</label>
            <input
              type="number"
              value={avgExpense}
              onChange={(e) => setAvgExpense(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="เช่น 80000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">อัตราการเติบโตของรายจ่ายต่อเดือน (%)</label>
            <input
              type="number"
              value={expenseGrowth}
              onChange={(e) => setExpenseGrowth(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="เช่น 1"
            />
          </div>
        </div>
      </div>

      {schedule.length > 0 && (
        <div className="mb-8 overflow-x-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">ตารางประมาณการ 12 เดือน</h2>
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">เดือนที่</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase">ยอดยกมา</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase">รับเข้า</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase">จ่ายออก</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase">สุทธิ</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase">ยอดยกไป</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedule.map((row) => (
                <tr key={row.month} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-900 font-medium">{row.month}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-gray-600">{Math.round(row.startBalance).toLocaleString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-green-600">+{Math.round(row.inflow).toLocaleString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-red-600">-{Math.round(row.outflow).toLocaleString()}</td>
                  <td className={`px-4 py-3 whitespace-nowrap text-right font-medium ${row.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {row.netCashFlow >= 0 ? '+' : ''}{Math.round(row.netCashFlow).toLocaleString()}
                  </td>
                  <td className={`px-4 py-3 whitespace-nowrap text-right font-bold ${row.endBalance < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                    {Math.round(row.endBalance).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {schedule.some(r => r.endBalance < 0) && (
            <p className="text-red-600 text-sm mt-2">
              * คำเตือน: มียอดยกไป (ยอดเงินสดคงเหลือปลายเดือน) ติดลบในบางเดือน แสดงถึงความเสี่ยงด้านสภาพคล่อง
            </p>
          )}
        </div>
      )}

      <hr className="my-8 border-gray-200" />

      <article className="prose prose-emerald max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">การทำประมาณการกระแสเงินสด 12 เดือน (12-Month Cash Flow Projection) มีประโยชน์อย่างไร</h2>
        
        <p>
          "กำไรคือเรื่องจริงทางทฤษฎี แต่เงินสดคือความเป็นจริงในทางปฏิบัติ" ประโยคนี้เป็นความจริงที่สุดในการทำธุรกิจ บางบริษัทมีกำไรมหาศาลในงบกำไรขาดทุน 
          แต่กลับต้องปิดกิจการเพียงเพราะ <strong>"ขาดเงินสดหมุนเวียน"</strong> การทำงบประมาณการกระแสเงินสดล่วงหน้า (Cash Flow Projection) จึงเป็นเครื่องมือช่วยชีวิตที่คุณขาดไม่ได้
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Cash Flow Projection คืออะไร?</h3>
        <p>
          การประมาณการกระแสเงินสด คือการคาดเดาและบันทึกข้อมูลเงินสดที่คุณคาดว่าจะ "รับเข้า" และ "จ่ายออก" ในแต่ละเดือนล่วงหน้า (มักทำล่วงหน้า 12 เดือน) 
          เพื่อให้เห็นภาพว่าในแต่ละช่วงเวลา ธุรกิจของคุณจะมีเงินสดเหลืออยู่ในบัญชี (Cash Balance) เท่าไร เพียงพอต่อการดำเนินกิจการหรือไม่
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ส่วนประกอบสำคัญของการทำประมาณการ</h3>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ยอดยกมา (Starting Balance):</strong> ยอดเงินสดในบัญชีที่คุณมีอยู่ ณ ต้นเดือน</li>
          <li><strong>เงินสดรับ (Cash Inflows):</strong> เงินที่ได้รับเข้ามาจริงๆ ไม่ว่าจะเป็นยอดขายเงินสด การเก็บหนี้จากลูกหนี้การค้า เงินกู้ยืมที่ได้รับ หรือเงินเพิ่มทุน</li>
          <li><strong>เงินสดจ่าย (Cash Outflows):</strong> เงินที่ต้องจ่ายออกไปจริงๆ เช่น ค่าวัตถุดิบ เงินเดือน ค่าเช่า ค่าน้ำไฟ ภาษี และการผ่อนชำระหนี้สิน</li>
          <li><strong>กระแสเงินสดสุทธิ (Net Cash Flow):</strong> เงินสดรับ ลบด้วย เงินสดจ่าย</li>
          <li><strong>ยอดยกไป (Ending Balance):</strong> ยอดยกมา บวกกับ กระแสเงินสดสุทธิ ซึ่งจะถูกยกไปเป็น "ยอดยกมา" ของเดือนถัดไป</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมธุรกิจ SME ถึงต้องทำ?</h3>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>พยากรณ์จุดวิกฤตทางการเงินล่วงหน้า:</strong> ทำให้คุณเห็นล่วงหน้าว่าเดือนไหนที่ยอดเงินสดติดลบ (เงินช็อต) ซึ่งมักเกิดในเดือนที่มีรายจ่ายพิเศษ เช่น จ่ายโบนัส หรือซื้อสต็อกล็อตใหญ่ ทำให้คุณเตรียมขอสินเชื่อหรือหาแหล่งเงินทุนได้ทันท่วงที</li>
          <li><strong>วางแผนการลงทุน:</strong> หากตารางแสดงให้เห็นว่ามีเงินสดเหลือเฟือในบางเดือน คุณก็สามารถวางแผนนำเงินสดนั้นไปลงทุนให้เกิดผลตอบแทน หรือวางแผนซื้อเครื่องจักรใหม่โดยไม่กระทบสภาพคล่อง</li>
          <li><strong>การขอสินเชื่อ:</strong> ธนาคารและนักลงทุนมักจะขอดู Cash Flow Projection เสมอ เพื่อประเมินความสามารถในการชำระหนี้ของคุณว่าจะมีเงินสดเพียงพอจ่ายค่างวดในแต่ละเดือนหรือไม่</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เคล็ดลับการทำประมาณการให้แม่นยำ</h3>
        <p>
          การทำประมาณการที่ดี ต้องตั้งอยู่บนพื้นฐานความเป็นจริง (Conservative) ไม่มองโลกในแง่ดีเกินไป ควรประเมินรายรับให้ต่ำกว่าที่คาดหวังเล็กน้อย และประเมินรายจ่ายให้สูงเผื่อฉุกเฉินเอาไว้ 
          รวมถึงต้องนำปัจจัยเรื่อง "ระยะเวลาการเก็บหนี้" (Credit Term) มาคิดด้วย เช่น ขายของเดือนมกราคม แต่ลูกค้าเครดิต 30 วัน เงินสดรับจะเกิดขึ้นในเดือนกุมภาพันธ์ ไม่ใช่เดือนมกราคม
        </p>
      </article>
    </div>
  );
}

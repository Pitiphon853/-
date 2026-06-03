import React, { useState } from 'react';
import { CalendarClock, DollarSign, TrendingUp, Briefcase } from 'lucide-react';

const DSOCalculator = ({ lang }: any) => {
  const [accountsReceivable, setAccountsReceivable] = useState<number>(500000);
  const [totalCreditSales, setTotalCreditSales] = useState<number>(3000000);
  const [daysInPeriod, setDaysInPeriod] = useState<number>(365);

  const dso = totalCreditSales > 0 ? (accountsReceivable / totalCreditSales) * daysInPeriod : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <CalendarClock className="w-8 h-8 text-emerald-600" />
        <h2 className="text-2xl font-bold text-gray-800">DSO (Days Sales Outstanding) Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Accounts Receivable (ลูกหนี้การค้า)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={accountsReceivable}
                onChange={(e) => setAccountsReceivable(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">ยอดลูกหนี้การค้าคงค้าง ณ สิ้นงวด</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Credit Sales (ยอดขายเชื่อสุทธิ)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={totalCreditSales}
                onChange={(e) => setTotalCreditSales(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">ยอดขายที่ให้เครดิตเทอมทั้งหมดในรอบระยะเวลา</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Days in Period (จำนวนวันในรอบระยะเวลา)
            </label>
            <select
              value={daysInPeriod}
              onChange={(e) => setDaysInPeriod(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={30}>1 Month (30 วัน)</option>
              <option value={90}>1 Quarter (90 วัน)</option>
              <option value={365}>1 Year (365 วัน)</option>
            </select>
          </div>
        </div>

        <div className="bg-emerald-50 p-6 rounded-xl flex flex-col justify-center items-center text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <Briefcase className="w-10 h-10 text-emerald-500" />
          </div>
          <h3 className="text-lg font-semibold text-emerald-800 mb-2">Days Sales Outstanding</h3>
          <div className="text-6xl font-bold text-emerald-600 mb-2">
            {dso.toFixed(1)}
          </div>
          <p className="text-lg font-medium text-emerald-700">วัน (Days)</p>
          <p className="text-sm text-emerald-600 mt-4 px-4">
            โดยเฉลี่ยแล้ว ธุรกิจของคุณใช้เวลา {dso.toFixed(0)} วัน ในการเก็บเงินจากลูกค้าหลังจากที่ขายสินค้าไปแล้ว
          </p>
        </div>
      </div>

      <div className="mt-12 prose prose-emerald max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">DSO (Days Sales Outstanding) คืออะไร?</h2>
        <p>
          <strong>Days Sales Outstanding (DSO)</strong> หรือ <strong>ระยะเวลาเก็บหนี้เฉลี่ย</strong> คือตัวชี้วัดทางการเงิน (Financial Metric) ที่ใช้คำนวณหาจำนวนวันโดยเฉลี่ยที่บริษัทใช้ในการจัดเก็บรายได้ (เก็บเงิน) หลังจากการขายสินค้าหรือบริการด้วยระบบเงินเชื่อ (Credit Sales) ยิ่งค่า DSO ต่ำเท่าไหร่ ยิ่งแปลว่าบริษัทมีความสามารถในการตามเก็บหนี้ได้รวดเร็วและมีกระแสเงินสดหมุนเวียนที่ดี
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการคำนวณ DSO</h3>
        <p>การคำนวณ DSO สามารถทำได้โดยใช้สูตรมาตรฐานดังนี้:</p>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4 flex justify-center text-lg">
          <div className="text-center font-mono font-semibold text-emerald-700">
            DSO = ( Accounts Receivable / Total Credit Sales ) × Number of Days
          </div>
        </div>
        <p>
          <strong>ตัวอย่าง:</strong> หากบริษัทมียอดลูกหนี้การค้า (AR) ปลายปีอยู่ที่ 500,000 บาท และมียอดขายเชื่อตลอดทั้งปี (365 วัน) เท่ากับ 3,000,000 บาท <br/>
          DSO = (500,000 / 3,000,000) × 365 = <strong>60.8 วัน</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">DSO ที่ดีควรอยู่ที่เท่าไหร่?</h3>
        <p>
          โดยทั่วไป <strong>ค่า DSO ที่ต่ำกว่า 45 วัน ถือว่าเป็นเกณฑ์ที่ดี</strong> (ขึ้นอยู่กับอุตสาหกรรม) หาก DSO สูงเกินไป (เช่น 90 หรือ 120 วัน) อาจส่งสัญญาณเตือนว่า:
        </p>
        <ul>
          <li>บริษัทกำลังเผชิญกับปัญหาในการเก็บเงินจากลูกค้า</li>
          <li>ลูกค้าอาจไม่มีความสามารถในการชำระหนี้ (ความเสี่ยงหนี้สูญ)</li>
          <li>นโยบายการให้เครดิตของบริษัทอาจหละหลวมเกินไป</li>
        </ul>
        <p>
          อย่างไรก็ตาม ต้องเปรียบเทียบกับเงื่อนไขการชำระเงิน (Credit Terms) ที่บริษัทตั้งไว้ด้วย หากบริษัทให้เครดิตลูกค้า 30 วัน (Net 30) แต่ค่า DSO อยู่ที่ 60 วัน แปลว่าลูกค้าจ่ายเงินล่าช้ากว่ากำหนดไปถึง 30 วัน ซึ่งจะกระทบต่อสภาพคล่อง (Liquidity) ของธุรกิจอย่างแน่นอน
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์ของการติดตาม DSO</h3>
        <p>
          การวิเคราะห์ Days Sales Outstanding เป็นส่วนสำคัญของการจัดการเงินทุนหมุนเวียน (Working Capital Management) หากธุรกิจสามารถลด DSO ลงได้ จะช่วยปลดล็อคกระแสเงินสด (Cash Flow) ที่จมอยู่กับลูกหนี้การค้า ให้นำกลับมาหมุนเวียนใช้จ่าย ลงทุน หรือจ่ายปันผลได้อย่างรวดเร็ว ผู้บริหารและนักวิเคราะห์ทางการเงินจึงนิยมใช้ DSO คู่กับ <strong>DIO (Days Inventory Outstanding)</strong> และ <strong>DPO (Days Payable Outstanding)</strong> เพื่อคำนวณวงจรเงินสด (Cash Conversion Cycle)
        </p>
        
        <p className="mt-4 text-sm text-gray-500">
          อ้างอิง: หลักการบัญชีและการวิเคราะห์งบการเงิน (Financial Statement Analysis) ตัวชี้วัดประสิทธิภาพการจัดการลูกหนี้
        </p>
      </div>
    </div>
  );
};

export default DSOCalculator;

import React, { useState } from 'react';
import { FileText, DollarSign } from 'lucide-react';

export default function SimplifiedPL({ lang }: any) {
  const [revenue, setRevenue] = useState<number | string>('');
  const [cogs, setCogs] = useState<number | string>('');
  const [opex, setOpex] = useState<number | string>('');
  const [interest, setInterest] = useState<number | string>('');
  const [tax, setTax] = useState<number | string>('');

  const rev = Number(revenue) || 0;
  const costOfGoods = Number(cogs) || 0;
  const operatingExpense = Number(opex) || 0;
  const intExpense = Number(interest) || 0;
  const taxExpense = Number(tax) || 0;

  const grossProfit = rev - costOfGoods;
  const operatingProfit = grossProfit - operatingExpense; 
  const ebt = operatingProfit - intExpense;
  const netProfit = ebt - taxExpense;

  const grossMargin = rev > 0 ? (grossProfit / rev) * 100 : 0;
  const netMargin = rev > 0 ? (netProfit / rev) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-full">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">เครื่องมือทำงบกำไรขาดทุนอย่างง่าย (Simplified P&L)</h1>
          <p className="text-gray-500">สรุปรายได้ ค่าใช้จ่าย และผลกำไรเบื้องต้นของธุรกิจ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <label className="block text-sm font-bold text-green-800 mb-1">รายได้จากการขาย (Sales Revenue)</label>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              placeholder="0"
            />
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100 space-y-3">
            <div>
              <label className="block text-sm font-medium text-red-800 mb-1">ต้นทุนขาย/ต้นทุนสินค้า (COGS)</label>
              <input
                type="number"
                value={cogs}
                onChange={(e) => setCogs(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-800 mb-1">ค่าใช้จ่ายในการดำเนินงาน (SG&A / Opex)</label>
              <input
                type="number"
                value={opex}
                onChange={(e) => setOpex(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
                placeholder="ค่าเช่า, เงินเดือน, การตลาด ฯลฯ"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ดอกเบี้ยจ่าย (Interest)</label>
              <input
                type="number"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ภาษีเงินได้ (Taxes)</label>
              <input
                type="number"
                value={tax}
                onChange={(e) => setTax(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 text-white rounded-xl overflow-hidden flex flex-col">
          <div className="p-6 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold">งบกำไรขาดทุน (P&L)</h2>
            <DollarSign className="w-6 h-6 text-gray-400" />
          </div>
          <div className="p-6 space-y-4 flex-1">
            <div className="flex justify-between items-end pb-2 border-b border-gray-700">
              <span className="text-gray-400">รายได้จากการขาย</span>
              <span className="text-lg font-medium">{rev.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-end pb-2 border-b border-gray-700">
              <span className="text-red-400">หัก: ต้นทุนขาย (COGS)</span>
              <span className="text-lg text-red-400">({costOfGoods.toLocaleString()})</span>
            </div>
            <div className="flex justify-between items-end pb-2 font-bold text-blue-300">
              <span>กำไรขั้นต้น (Gross Profit)</span>
              <span>{grossProfit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-end pb-2 border-b border-gray-700 mt-4">
              <span className="text-red-400">หัก: ค่าใช้จ่ายดำเนินงาน</span>
              <span className="text-lg text-red-400">({operatingExpense.toLocaleString()})</span>
            </div>
            <div className="flex justify-between items-end pb-2 font-bold text-purple-300">
              <span>กำไรจากการดำเนินงาน</span>
              <span>{operatingProfit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-end pb-2 border-b border-gray-700 mt-4">
              <span className="text-red-400 text-sm">หัก: ดอกเบี้ย และ ภาษี</span>
              <span className="text-red-400">({(intExpense + taxExpense).toLocaleString()})</span>
            </div>
            <div className="flex justify-between items-end pt-4 font-bold text-2xl text-green-400 mt-auto">
              <span>กำไรสุทธิ (Net Profit)</span>
              <span>{netProfit.toLocaleString()}</span>
            </div>
          </div>
          {rev > 0 && (
            <div className="bg-gray-900 p-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-gray-400 text-xs uppercase">อัตรากำไรขั้นต้น</p>
                <p className="text-lg font-bold text-blue-300">{grossMargin.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase">อัตรากำไรสุทธิ</p>
                <p className="text-lg font-bold text-green-400">{netMargin.toFixed(2)}%</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <hr className="my-8 border-gray-200" />

      <article className="prose prose-blue max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">งบกำไรขาดทุนอย่างง่าย (Simplified P&L) สำหรับธุรกิจ SME</h2>
        
        <p>
          "ขายดีจนเจ๊ง" ไม่ใช่แค่คำเปรียบเปรย แต่เป็นเรื่องจริงที่เกิดขึ้นบ่อยมากในหมู่ธุรกิจ SME หลายคนเห็นยอดเงินโอนเข้าบัญชีเยอะๆ ก็คิดว่าธุรกิจกำลังรุ่งเรือง 
          แต่พอนำรายจ่ายทั้งหมดมาหักลบจริงๆ กลับพบว่า <strong>"ขาดทุน"</strong> ดังนั้น การทำ <strong>งบกำไรขาดทุน (Profit and Loss Statement หรือ P&L)</strong> 
          จึงเป็นสิ่งที่ผู้ประกอบการทุกคนหลีกเลี่ยงไม่ได้
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">P&L คืออะไร?</h3>
        <p>
          งบกำไรขาดทุน คือรายงานทางการเงินที่สรุป <strong>รายได้ (Revenues)</strong> <strong>ต้นทุน (Costs)</strong> และ <strong>ค่าใช้จ่าย (Expenses)</strong> 
          ที่เกิดขึ้นในช่วงเวลาหนึ่ง (เช่น รายเดือน รายไตรมาส หรือรายปี) เพื่อแสดงให้เห็นถึงความสามารถในการทำกำไรของกิจการ 
          ตัวเลขบรรทัดสุดท้าย (Bottom Line) ของ P&L คือ <strong>กำไรสุทธิ (Net Profit)</strong> หรือ ขาดทุนสุทธิ (Net Loss)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">โครงสร้างของงบกำไรขาดทุนอย่างง่าย</h3>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>รายได้จากการขาย (Sales Revenue):</strong> เงินทั้งหมดที่หามาได้จากการขายสินค้าหรือบริการ</li>
          <li><strong>ต้นทุนขาย (Cost of Goods Sold - COGS):</strong> ต้นทุนทางตรงที่เกิดจากการผลิตสินค้า เช่น ค่าวัตถุดิบ ค่ากล่องบรรจุภัณฑ์ หรือราคาทุนของสินค้าที่ซื้อมาขายไป</li>
          <li><strong>กำไรขั้นต้น (Gross Profit):</strong> นำ รายได้ ลบ ต้นทุนขาย ตัวเลขนี้แสดงว่าสินค้าของคุณมีส่วนต่างราคามากพอไหม</li>
          <li><strong>ค่าใช้จ่ายในการดำเนินงาน (Operating Expenses - OPEX):</strong> ค่าใช้จ่ายทางอ้อม หรือค่าบริหารงาน เช่น ค่าเช่า ค่าน้ำค่าไฟ เงินเดือนพนักงานออฟฟิศ ค่าโฆษณา</li>
          <li><strong>กำไรจากการดำเนินงาน (Operating Profit):</strong> นำ กำไรขั้นต้น ลบ ค่าใช้จ่ายในการดำเนินงาน นี่คือกำไรที่เกิดจากความเก่งในการทำธุรกิจล้วนๆ (ยังไม่รวมภาระหนี้และภาษี)</li>
          <li><strong>กำไรสุทธิ (Net Profit):</strong> นำ กำไรจากการดำเนินงาน ไปหักลบ ดอกเบี้ยจ่ายและภาษีที่ต้องจ่ายรัฐ จะได้เงินเหลือสุทธิเข้ากระเป๋าเจ้าของ</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ความหมายของอัตราส่วน (Margin)</h3>
        <p>
          ตัวเลขที่เป็น "จำนวนเงิน" อาจบอกไม่ได้ทั้งหมด คุณควรดูที่เป็น "เปอร์เซ็นต์" หรือ Margin ด้วย:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>อัตรากำไรขั้นต้น (Gross Profit Margin):</strong> สะท้อนอำนาจในการตั้งราคา หากอัตรานี้ต่ำเกินไป (เช่น ต่ำกว่า 20-30%) คุณจะทำธุรกิจเหนื่อยมาก เพราะไม่มีช่องว่างเหลือพอให้ไปจ่ายค่าเช่าและค่าโฆษณา</li>
          <li><strong>อัตรากำไรสุทธิ (Net Profit Margin):</strong> สะท้อนประสิทธิภาพโดยรวมทั้งหมด โดยทั่วไปธุรกิจ SME ควรมีกำไรสุทธิประมาณ 10% - 20% ของยอดขาย (ขึ้นอยู่กับประเภทธุรกิจ) หากต่ำกว่านี้อาจแปลว่าแบกค่าใช้จ่ายประจำเยอะเกินไป</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">บทสรุป</h3>
        <p>
          ไม่ต้องรอให้สำนักงานบัญชีสรุปงบให้ตอนปลายปี ผู้ประกอบการควรฝึกทำงบ P&L แบบง่ายๆ ด้วยตัวเองทุกเดือน เพื่อใช้เป็นกระดานคะแนน (Scoreboard) ในการประเมินสุขภาพธุรกิจ 
          และปรับเปลี่ยนแผนการตลาด หรือลดต้นทุนได้ทันท่วงทีก่อนที่ธุรกิจจะประสบปัญหาขาดทุนสะสม
        </p>
      </article>
    </div>
  );
}

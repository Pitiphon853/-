import React, { useState } from 'react';
import { Repeat, Calculator, DollarSign, TrendingUp, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function SaasMrrArrCalculator({ lang }: any) {
  const [startingMRR, setStartingMRR] = useState<number>(50000);
  const [newMRR, setNewMRR] = useState<number>(10000);
  const [expansionMRR, setExpansionMRR] = useState<number>(5000);
  const [churnedMRR, setChurnedMRR] = useState<number>(3000);
  const [contractionMRR, setContractionMRR] = useState<number>(1000);

  // Calculations
  const totalAddedMRR = newMRR + expansionMRR;
  const totalLostMRR = churnedMRR + contractionMRR;
  const netNewMRR = totalAddedMRR - totalLostMRR;
  const netMRR = startingMRR + netNewMRR;
  
  const arr = netMRR * 12;
  const mrrGrowthRate = startingMRR > 0 ? (netNewMRR / startingMRR) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-sm">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mx-auto mb-4">
          <Repeat className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">SaaS MRR / ARR Calculator</h2>
        <p className="text-gray-600">คำนวณรายได้ประจำรายเดือน (MRR) และรายปี (ARR) ของธุรกิจ Subscription</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <Calculator className="w-5 h-5 mr-2 text-indigo-500" />
            ข้อมูลรายได้ต่อเดือน
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">รายได้ประจำเดือนที่แล้ว (Starting MRR)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={startingMRR}
                onChange={(e) => setStartingMRR(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ยอดใหม่ (New MRR)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                </div>
                <input
                  type="number"
                  value={newMRR}
                  onChange={(e) => setNewMRR(Number(e.target.value))}
                  className="w-full pl-9 pr-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">อัปเกรด (Expansion)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                </div>
                <input
                  type="number"
                  value={expansionMRR}
                  onChange={(e) => setExpansionMRR(Number(e.target.value))}
                  className="w-full pl-9 pr-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ลูกค้ายกเลิก (Churn)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                </div>
                <input
                  type="number"
                  value={churnedMRR}
                  onChange={(e) => setChurnedMRR(Number(e.target.value))}
                  className="w-full pl-9 pr-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ดาวน์เกรด (Contraction)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                </div>
                <input
                  type="number"
                  value={contractionMRR}
                  onChange={(e) => setContractionMRR(Number(e.target.value))}
                  className="w-full pl-9 pr-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              สรุปรายได้ (Revenue Summary)
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-50">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-500">รายได้สุทธิเดือนนี้ (Net MRR)</p>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${netNewMRR >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {netNewMRR >= 0 ? '+' : ''}{mrrGrowthRate.toFixed(2)}%
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  ฿{netMRR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  ความเคลื่อนไหว: {netNewMRR >= 0 ? '+' : ''}{netNewMRR.toLocaleString()} ฿ (Net New MRR)
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4 rounded-lg shadow-sm text-white">
                <p className="text-sm text-indigo-100 mb-1">รายได้ประจำรายปี (ARR)</p>
                <p className="text-4xl font-bold">
                  ฿{arr.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-indigo-200 mt-2">
                  * คำนวณโดย นำ Net MRR ของเดือนปัจจุบัน × 12
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-indigo max-w-none">
        <h2>MRR และ ARR คืออะไร? หัวใจสำคัญของธุรกิจ SaaS</h2>
        <p>
          สำหรับธุรกิจโมเดลสมัครสมาชิก (Subscription Business) หรือซอฟต์แวร์ให้บริการ (SaaS - Software as a Service) การวัดความสำเร็จจะไม่ได้ดูที่ "ยอดขาย" รายครั้งเหมือนการขายสินค้าทั่วไป แต่จะโฟกัสไปที่ <strong>"รายได้ประจำ"</strong> ที่คาดการณ์ได้อย่างต่อเนื่อง ซึ่งตัวชี้วัดที่สำคัญที่สุดคือ <strong>MRR</strong> และ <strong>ARR</strong>
        </p>

        <h3>1. MRR (Monthly Recurring Revenue)</h3>
        <p>
          MRR คือ <strong>รายได้ประจำรายเดือน</strong> หมายถึงเม็ดเงินที่คุณสามารถคาดหวังได้ว่าลูกค้าจะจ่ายให้คุณในทุกๆ เดือน การคำนวณ MRR ที่แม่นยำจะช่วยให้ธุรกิจรู้ว่ามีกระแสเงินสดเข้ามาเท่าไหร่ และนำไปสู่การวางแผนงบประมาณที่ถูกต้อง
        </p>
        <p>ส่วนประกอบสำคัญในการหา Net MRR ของแต่ละเดือน ได้แก่:</p>
        <ul>
          <li><strong>Starting MRR:</strong> รายได้ประจำที่ยกมาจากเดือนที่แล้ว</li>
          <li><strong>New MRR (+):</strong> รายได้ใหม่จากลูกค้าที่เพิ่งสมัครใช้งานในเดือนนี้</li>
          <li><strong>Expansion MRR (+):</strong> รายได้เพิ่มจากลูกค้าเก่า (เช่น อัปเกรดแพ็กเกจให้แพงขึ้น, ซื้อฟีเจอร์เพิ่ม หรือเพิ่มจำนวนผู้ใช้งาน)</li>
          <li><strong>Contraction MRR (-):</strong> รายได้ที่ลดลงจากลูกค้าเก่า (ดาวน์เกรดแพ็กเกจ, ขอลดราคา)</li>
          <li><strong>Churned MRR (-):</strong> รายได้ที่หายไปจากลูกค้าที่ "ยกเลิก" การใช้งานในเดือนนี้</li>
        </ul>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-center my-4 border border-gray-200 text-sm md:text-base overflow-x-auto">
          Net MRR = Starting MRR + (New MRR + Expansion MRR) - (Churned MRR + Contraction MRR)
        </div>

        <h3>2. ARR (Annual Recurring Revenue)</h3>
        <p>
          ARR คือ <strong>รายได้ประจำรายปี</strong> เป็นการนำ MRR ปัจจุบันมาทำให้เป็นรายปี (Annualized) เพื่อให้เห็นภาพรวมของธุรกิจในสเกลระดับปี มักใช้ในการประเมินมูลค่าบริษัท (Company Valuation) ในกลุ่มสตาร์ทอัพโดยเฉพาะในระดับ Series A ขึ้นไป
        </p>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-center my-4 border border-gray-200 text-lg">
          ARR = Net MRR ของเดือนปัจจุบัน × 12
        </div>

        <h3>ทำไม Expansion MRR และ Churn ถึงสำคัญมาก?</h3>
        <p>
          ในวงการ SaaS มีคำกล่าวว่า <strong>"การหาลูกค้าใหม่แพงกว่าการรักษาลูกค้าเก่าเสมอ"</strong> 
          <br/><br/>
          หาก <strong>Churn Rate</strong> (อัตรายกเลิก) ของคุณสูง ธุรกิจของคุณจะเหมือนถังน้ำรั่ว เติมลูกค้าใหม่เข้ามาเท่าไหร่รายได้รวม (Net MRR) ก็ไม่โต ในทางกลับกัน หากคุณโฟกัสการทำ <strong>Expansion MRR</strong> ให้ลูกค้าเก่าใช้งานมากขึ้นและจ่ายเงินให้คุณมากขึ้น คุณสามารถสร้าง "Negative Churn" (สภาวะที่รายได้จากลูกค้าเก่าที่อัปเกรด มีมากกว่ารายได้จากลูกค้าเก่าที่ยกเลิก) ซึ่งเป็นเคล็ดลับที่ทำให้บริษัทยักษ์ใหญ่เติบโตอย่างก้าวกระโดด
        </p>

        <h3>ประโยชน์ของการติดตาม MRR/ARR</h3>
        <ul>
          <li><strong>คาดการณ์กระแสเงินสด (Cash Flow Forecasting):</strong> ช่วยให้คุณรู้ล่วงหน้าว่าเดือนหน้าจะมีเงินเข้าแน่ๆ เท่าไหร่ สามารถจ้างพนักงานเพิ่ม หรือเพิ่มงบการตลาดได้ไหม</li>
          <li><strong>ประเมินมูลค่ากิจการ:</strong> นักลงทุนหรือ VC มักจะตีมูลค่า (Valuation) ธุรกิจ SaaS เป็นจำนวนเท่า (Multiple) ของตัวเลข ARR</li>
          <li><strong>วัดประสิทธิภาพทีม:</strong> แบ่งแยกชัดเจนว่า ทีมเซลส์หา New MRR ได้ตามเป้าไหม และทีม Customer Success รักษาลูกค้า (ลด Churn) และทำ Expansion ได้ดีหรือไม่</li>
        </ul>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { MonitorSmartphone, Store } from 'lucide-react';

export default function PosSystemComparison({ lang }: any) {
  const [estMonthlySales, setEstMonthlySales] = useState<number | ''>(150000);

  // POS A: แบบซื้อขาด หรือ มีค่าแรกเข้า + ค่ารายเดือน (Traditional / Pro POS)
  const [hwCostA, setHwCostA] = useState<number | ''>(25000);
  const [monthlyFeeA, setMonthlyFeeA] = useState<number | ''>(1500);
  const [txnFeeRateA, setTxnFeeRateA] = useState<number | ''>(0); 
  
  // POS B: แบบเครื่องฟรี/ค่าแรกเข้าต่ำ + หักเปอร์เซ็นต์ GP (Cloud POS / Delivery App Partner)
  const [hwCostB, setHwCostB] = useState<number | ''>(0);
  const [monthlyFeeB, setMonthlyFeeB] = useState<number | ''>(0);
  const [txnFeeRateB, setTxnFeeRateB] = useState<number | ''>(2.0); // 2% GP on total sales or specific sales

  const annualSales = (Number(estMonthlySales) || 0) * 12;

  // Calculate Year 1 Cost
  const totalA1 = (Number(hwCostA) || 0) + ((Number(monthlyFeeA) || 0) * 12) + (annualSales * ((Number(txnFeeRateA) || 0) / 100));
  const totalB1 = (Number(hwCostB) || 0) + ((Number(monthlyFeeB) || 0) * 12) + (annualSales * ((Number(txnFeeRateB) || 0) / 100));

  // Calculate Year 2 Cost (Exclude Hardware Cost usually)
  const totalA2 = ((Number(monthlyFeeA) || 0) * 12) + (annualSales * ((Number(txnFeeRateA) || 0) / 100));
  const totalB2 = ((Number(monthlyFeeB) || 0) * 12) + (annualSales * ((Number(txnFeeRateB) || 0) / 100));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <MonitorSmartphone className="mr-2" />
          เปรียบเทียบต้นทุนระบบ POS รายปี
        </h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-md">
            <label className="block text-sm font-medium text-blue-900 mb-1">
              ยอดขายประมาณการต่อเดือน (บาท)
            </label>
            <input
              type="number"
              value={estMonthlySales}
              onChange={(e) => setEstMonthlySales(Number(e.target.value))}
              className="w-full md:w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="เช่น 150000"
            />
            <p className="text-xs text-blue-700 mt-2">* ยอดขายรวมต่อปี: ฿{annualSales.toLocaleString()}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* POS A */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <Store className="w-5 h-5 mr-2" /> ระบบ A (แบบซื้อขาด/จ่ายรายเดือน)
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">ค่าอุปกรณ์/แรกเข้า (จ่ายครั้งเดียว)</label>
                  <input
                    type="number"
                    value={hwCostA}
                    onChange={(e) => setHwCostA(Number(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">ค่าบริการซอฟต์แวร์ (ต่อเดือน)</label>
                  <input
                    type="number"
                    value={monthlyFeeA}
                    onChange={(e) => setMonthlyFeeA(Number(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">ส่วนแบ่งยอดขาย/ค่าธรรมเนียมต่อรายการ (%)</label>
                  <input
                    type="number"
                    value={txnFeeRateA}
                    step="0.1"
                    onChange={(e) => setTxnFeeRateA(Number(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* POS B */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <Store className="w-5 h-5 mr-2" /> ระบบ B (แบบหัก GP / เช่าใช้)
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">ค่าอุปกรณ์/แรกเข้า (จ่ายครั้งเดียว)</label>
                  <input
                    type="number"
                    value={hwCostB}
                    onChange={(e) => setHwCostB(Number(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">ค่าบริการซอฟต์แวร์ (ต่อเดือน)</label>
                  <input
                    type="number"
                    value={monthlyFeeB}
                    onChange={(e) => setMonthlyFeeB(Number(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">ส่วนแบ่งยอดขาย/ค่าธรรมเนียมต่อรายการ (%)</label>
                  <input
                    type="number"
                    value={txnFeeRateB}
                    step="0.1"
                    onChange={(e) => setTxnFeeRateB(Number(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 border-t pt-6">
            <h3 className="text-xl font-bold mb-4">ผลการเปรียบเทียบต้นทุน</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 border-b">รายการ</th>
                    <th className="p-3 border-b text-right text-blue-900">ระบบ A</th>
                    <th className="p-3 border-b text-right text-blue-900">ระบบ B</th>
                    <th className="p-3 border-b text-center">สรุป</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border-b">ต้นทุนปีที่ 1 (รวมค่าแรกเข้า)</td>
                    <td className="p-3 border-b text-right font-semibold">฿{totalA1.toLocaleString()}</td>
                    <td className="p-3 border-b text-right font-semibold">฿{totalB1.toLocaleString()}</td>
                    <td className="p-3 border-b text-center text-sm">
                      {totalA1 < totalB1 ? <span className="text-green-600 font-bold">A ถูกกว่า ฿{(totalB1 - totalA1).toLocaleString()}</span> : totalB1 < totalA1 ? <span className="text-green-600 font-bold">B ถูกกว่า ฿{(totalA1 - totalB1).toLocaleString()}</span> : 'เท่ากัน'}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border-b">ต้นทุนปีที่ 2 เป็นต้นไป (ต่อปี)</td>
                    <td className="p-3 border-b text-right font-semibold">฿{totalA2.toLocaleString()}</td>
                    <td className="p-3 border-b text-right font-semibold">฿{totalB2.toLocaleString()}</td>
                    <td className="p-3 border-b text-center text-sm">
                      {totalA2 < totalB2 ? <span className="text-green-600 font-bold">A ถูกกว่า ฿{(totalB2 - totalA2).toLocaleString()}</span> : totalB2 < totalA2 ? <span className="text-green-600 font-bold">B ถูกกว่า ฿{(totalA2 - totalB2).toLocaleString()}</span> : 'เท่ากัน'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md prose max-w-none">
        <h2>การเลือกซื้อระบบ POS: ระหว่างแบบ "ซื้อขาด" กับ "หัก GP"</h2>
        <p>ระบบ POS (Point of Sale) หรือระบบจัดการหน้าร้าน เป็นหัวใจสำคัญของธุรกิจค้าปลีกและร้านอาหารในยุคปัจจุบัน นอกจากการรับชำระเงินแล้ว ระบบ POS ยังช่วยจัดการสต๊อกสินค้า เก็บข้อมูลลูกค้า (CRM) และวิเคราะห์ยอดขาย อย่างไรก็ตาม โมเดลการคิดราคาของระบบ POS ในท้องตลาดมีความหลากหลายมาก การเลือกผิดอาจหมายถึงการเสียต้นทุนบานปลายในระยะยาว</p>
        
        <h3>โมเดลราคาของระบบ POS ในปัจจุบัน</h3>
        <p>หลักๆ แล้ว เราสามารถแบ่งโครงสร้างต้นทุนของระบบ POS ได้เป็น 2 กลุ่มใหญ่ ได้แก่:</p>
        
        <h4>1. โมเดลแบบซื้อขาดอุปกรณ์ + ค่ารายเดือน (Traditional / SaaS POS)</h4>
        <p>โมเดลนี้ผู้ประกอบการจะต้องจ่ายเงินก้อนแรกเพื่อซื้อ Hardware (เช่น หน้าจอสัมผัส, ลิ้นชักเก็บเงิน, เครื่องพิมพ์ใบเสร็จ) ซึ่งอาจมีราคาตั้งแต่ 10,000 ไปจนถึง 40,000 บาท และต้องจ่ายค่า Software รายเดือน (Subscription) ในระดับหลักร้อยถึงหลักพันบาท แต่ข้อดีคือ <strong>ไม่มีการหักเปอร์เซ็นต์จากยอดขาย</strong> (ยกเว้นค่าธรรมเนียมรูดบัตรปกติ)</p>

        <h4>2. โมเดลแบบเครื่องฟรี/ราคาถูก แต่หักเปอร์เซ็นต์ GP (Cloud / Platform POS)</h4>
        <p>โมเดลนี้มักมากับแพลตฟอร์ม Delivery หรือ Payment Gateway บางราย ที่เสนอให้ยืมเครื่อง POS ไปใช้ฟรีๆ หรือให้ซื้อในราคาที่ถูกมาก ไม่มีค่าบริการรายเดือน แต่แลกกับการที่ <strong>ระบบจะหักเปอร์เซ็นต์ส่วนแบ่งยอดขาย (GP) ทุกรายการ</strong> หรือเฉพาะรายการที่ชำระผ่านช่องทางที่กำหนด (เช่น หัก 1-3% ทุก Transaction)</p>

        <h3>เปรียบเทียบความคุ้มค่า: จุดคุ้มทุน (Break-Even Point)</h3>
        <p>จากเครื่องมือคำนวณด้านบน จะเห็นได้ว่า <strong>"ยอดขายต่อเดือน"</strong> คือตัวแปรสำคัญที่สุดในการตัดสินใจ</p>
        <ul>
          <li><strong>สำหรับร้านที่เพิ่งเริ่มต้น (ยอดขายยังไม่สูง):</strong> โมเดลแบบหักเปอร์เซ็นต์ (ระบบ B) อาจดูน่าสนใจกว่า เพราะช่วยลดภาระค่าใช้จ่ายก้อนแรก (CAPEX) และไม่มี Fixed Cost รายเดือน หากขายไม่ได้ก็ไม่เสียเงิน</li>
          <li><strong>สำหรับร้านที่มีฐานลูกค้าและยอดขายสูง (High Volume):</strong> โมเดลแบบซื้อขาดและจ่ายรายเดือนฟิกซ์เรท (ระบบ A) มักจะคุ้มค่ากว่าในระยะยาว (ปีที่ 2 เป็นต้นไป) เพราะเมื่อยอดขายสูงขึ้น การโดนหักเป็นเปอร์เซ็นต์ (แม้จะแค่ 1-2%) ก็อาจกลายเป็นจำนวนเงินที่สูงกว่าค่า Hardware และค่า Software รายเดือนเสียอีก</li>
        </ul>

        <h3>ข้อควรระวังอื่นๆ นอกเหนือจากเรื่องราคา</h3>
        <p>การเลือก POS ไม่ควรดูแค่ตัวเลขค่าใช้จ่ายเพียงอย่างเดียว แต่ต้องพิจารณาปัจจัยแวดล้อมเหล่านี้ด้วย:</p>
        <ol>
          <li><strong>ความเป็นเจ้าของข้อมูล (Data Ownership):</strong> ระบบ POS บางตัวที่ผูกกับแพลตฟอร์มอาจไม่เปิดให้คุณส่งออกข้อมูลลูกค้า (Export Data) ไปใช้ในระบบอื่นได้อย่างอิสระ</li>
          <li><strong>การผสานระบบ (Integration):</strong> ระบบเชื่อมต่อกับโปรแกรมบัญชี, ระบบสะสมแต้ม หรือแพลตฟอร์ม Delivery อื่นๆ ได้สะดวกหรือไม่</li>
          <li><strong>บริการหลังการขาย (Support):</strong> หากระบบล่มในวันหยุด หรือช่วงเวลาที่ลูกค้าแน่นร้าน ผู้ให้บริการมีทีมงานพร้อมช่วยเหลือและเปลี่ยนเครื่องให้ทันทีหรือไม่</li>
        </ol>
        <p>ผู้ประกอบการควรประเมินยอดขายล่วงหน้า (Forecast) อย่างน้อย 1-3 ปี แล้วนำมาเปรียบเทียบต้นทุนรวม (Total Cost of Ownership) เพื่อหาสิ่งที่คุ้มค่าและตอบโจทย์การเติบโตของธุรกิจมากที่สุด</p>
      </div>
    </div>
  );
}

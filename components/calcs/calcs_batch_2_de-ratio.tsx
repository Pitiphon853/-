import React, { useState } from 'react';
import { Scale } from 'lucide-react';

export default function DeRatio({ lang }: any) {
  const [totalDebt, setTotalDebt] = useState<number | ''>(2500000);
  const [totalEquity, setTotalEquity] = useState<number | ''>(1000000);
  
  const debt = Number(totalDebt) || 0;
  const equity = Number(totalEquity) || 0;

  const deRatio = equity > 0 ? debt / equity : 0;
  const debtPercentage = (debt + equity) > 0 ? (debt / (debt + equity)) * 100 : 0;
  const equityPercentage = (debt + equity) > 0 ? (equity / (debt + equity)) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Scale className="mr-2" />
          คำนวณอัตราส่วนหนี้สินต่อทุน (D/E Ratio)
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                หนี้สินรวม (Total Debt)
              </label>
              <input
                type="number"
                value={totalDebt}
                onChange={(e) => setTotalDebt(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ส่วนของผู้ถือหุ้น (Total Equity)
              </label>
              <input
                type="number"
                value={totalEquity}
                onChange={(e) => setTotalEquity(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-md mt-6 border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">อัตราส่วนหนี้สินต่อทุน (D/E Ratio)</h3>
              <div className="text-4xl font-bold text-blue-700 my-2">{deRatio.toFixed(2)} เท่า</div>
              <p className="text-sm text-gray-600">
                {deRatio > 2 
                  ? 'ความเสี่ยงทางการเงินสูง (หนี้สินมากกว่าทุน 2 เท่าขึ้นไป)' 
                  : deRatio > 1 
                  ? 'มีภาระหนี้สูงกว่าเงินทุน (โครงสร้างค่อนข้างมีความเสี่ยง)' 
                  : 'ความเสี่ยงทางการเงินต่ำ (เงินทุนสูงกว่าภาระหนี้)'}
              </p>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-6 flex overflow-hidden">
              <div 
                className="bg-red-400 h-6 flex items-center justify-center text-xs text-white font-bold" 
                style={{ width: `${debtPercentage}%` }}
              >
                {debtPercentage > 10 ? `หนี้ ${debtPercentage.toFixed(1)}%` : ''}
              </div>
              <div 
                className="bg-green-500 h-6 flex items-center justify-center text-xs text-white font-bold" 
                style={{ width: `${equityPercentage}%` }}
              >
                {equityPercentage > 10 ? `ทุน ${equityPercentage.toFixed(1)}%` : ''}
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>สัดส่วนหนี้สิน</span>
              <span>สัดส่วนเงินทุน</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md prose max-w-none">
        <h2>อัตราส่วนหนี้สินต่อทุน (Debt-to-Equity Ratio: D/E) คืออะไร?</h2>
        <p><strong>D/E Ratio</strong> หรือ อัตราส่วนหนี้สินต่อส่วนของผู้ถือหุ้น เป็นหนึ่งในอัตราส่วนทางการเงินที่สำคัญที่สุดในการประเมิน <strong>"ความเสี่ยงทางการเงิน" (Financial Risk)</strong> และโครงสร้างเงินทุน (Capital Structure) ของบริษัท อัตราส่วนนี้แสดงให้เห็นว่า กิจการใช้เงินทุนจากการกู้ยืม (หนี้สิน) มากน้อยเพียงใดเมื่อเทียบกับเงินลงทุนของเจ้าของ (ส่วนของผู้ถือหุ้น)</p>
        
        <h3>วิธีการอ่านค่า D/E Ratio</h3>
        <p><strong>สูตร:</strong> หนี้สินรวม (Total Debt) / ส่วนของผู้ถือหุ้น (Total Equity)</p>
        <ul>
          <li><strong>D/E Ratio &lt; 1:</strong> (ตัวเลขต่ำกว่า 1 เท่า) หมายความว่า บริษัทใช้เงินทุนของตัวเองมากกว่าเงินกู้ยืม ถือว่ามีโครงสร้างทางการเงินที่แข็งแกร่ง ปลอดภัย และมีความเสี่ยงต่ำ หากเกิดวิกฤตเศรษฐกิจ บริษัทจะสามารถรับแรงกระแทกได้ดีกว่าเพราะไม่มีภาระดอกเบี้ยจ่ายที่สูง</li>
          <li><strong>D/E Ratio = 1:</strong> หมายความว่า บริษัทมีหนี้สินเท่ากับเงินทุนพอดี (สัดส่วน 50:50)</li>
          <li><strong>D/E Ratio &gt; 1:</strong> (เช่น 2 หรือ 3 เท่า) หมายความว่า บริษัทมีหนี้สินมากกว่าเงินทุนหลายเท่า (Highly Leveraged) แม้การกู้เงินมาลงทุนจะช่วยเพิ่มผลตอบแทนต่อส่วนของผู้ถือหุ้น (ROE) ได้ในช่วงเศรษฐกิจดี แต่ก็แลกมาด้วยความเสี่ยงที่สูงมาก หากกำไรลดลง อาจนำไปสู่การขาดสภาพคล่องและล้มละลายได้</li>
        </ul>

        <h3>D/E Ratio ที่ดีควรเป็นเท่าไหร่?</h3>
        <p>ไม่มีตัวเลขตายตัวที่ถือว่า "ดีที่สุด" เพราะขึ้นอยู่กับธรรมชาติของแต่ละอุตสาหกรรม (Industry Norm)</p>
        <ul>
          <li><strong>อุตสาหกรรมที่ต้องลงทุนสูง (Capital Intensive):</strong> เช่น โรงไฟฟ้า, โทรคมนาคม, อสังหาริมทรัพย์ หรือธนาคารพาณิชย์ มักจะมี D/E Ratio ที่สูงเป็นปกติ (อาจสูงถึง 2-5 เท่า) เนื่องจากจำเป็นต้องใช้เงินกู้ระยะยาวมาลงทุนในโครงสร้างพื้นฐาน</li>
          <li><strong>อุตสาหกรรมบริการหรือเทคโนโลยี:</strong> มักจะมี D/E Ratio ที่ต่ำ (น้อยกว่า 1 เท่า) เพราะไม่ต้องลงทุนซื้อเครื่องจักรหรือสร้างโรงงานขนาดใหญ่</li>
        </ul>
        <p>อย่างไรก็ตาม ในมุมมองของธนาคารหรือสถาบันการเงินที่ปล่อยสินเชื่อ โดยทั่วไปแล้วธนาคารมักจะไม่ค่อยสบายใจหากบริษัทมี D/E Ratio เกินกว่า 2.0 ถึง 2.5 เท่า เพราะมองว่าหนี้เริ่มล้นพ้นตัวแล้ว (นั่นคือเจ้าหนี้มีความเสี่ยงมากกว่าตัวเจ้าของกิจการเสียอีก)</p>

        <h3>ข้อควรระวังในการวิเคราะห์</h3>
        <p>แม้ D/E Ratio รวมจะบอกภาพกว้างได้ แต่ในการวิเคราะห์เชิงลึก นักวิเคราะห์มักจะแยกคำนวณเฉพาะ <strong>"หนี้สินที่มีภาระดอกเบี้ย" (Interest-Bearing Debt)</strong> เช่น เงินกู้ธนาคาร หรือหุ้นกู้ แทนการใช้หนี้สินรวมทั้งหมด เนื่องจากหนี้สินบางประเภท เช่น "เจ้าหนี้การค้า" (Trade Payables) หรือ "รายได้จดสภาพ" เป็นหนี้สินที่ไม่มีดอกเบี้ย และเกิดจากการดำเนินธุรกิจตามปกติ ไม่ใช่การกู้ยืมมาเพื่อสร้างความเติบโต</p>
        <p>หากคุณเป็นเจ้าของธุรกิจ การรักษาระดับ D/E Ratio ให้อยู่ในเกณฑ์ที่เหมาะสม จะช่วยให้ต้นทุนทางการเงิน (WACC) ต่ำลง และสามารถขอสินเชื่อจากธนาคารได้ง่ายขึ้นในยามที่ต้องการขยายกิจการ</p>
      </div>
    </div>
  );
}

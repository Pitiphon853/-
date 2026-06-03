import React, { useState } from 'react';
import { Calculator, MousePointerClick, TrendingUp, AlertCircle, DollarSign, Percent } from 'lucide-react';

export default function AcceptableCPCCalculator({ lang }: any) {
  const [sellingPrice, setSellingPrice] = useState<number>(1000);
  const [costOfGoods, setCostOfGoods] = useState<number>(400);
  const [conversionRate, setConversionRate] = useState<number>(2);

  const profitPerSale = sellingPrice - costOfGoods;
  const maxCpcBreakEven = profitPerSale * (conversionRate / 100);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-sm">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto mb-4">
          <MousePointerClick className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Acceptable CPC Calculator</h2>
        <p className="text-gray-600">คำนวณต้นทุนต่อคลิกสูงสุดที่คุณจ่ายได้โดยไม่ขาดทุน</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <Calculator className="w-5 h-5 mr-2 text-blue-500" />
            ข้อมูลสินค้าและผลลัพธ์
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ราคาขายต่อหน่วย (Selling Price)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ต้นทุนสินค้าต่อหน่วย (Cost of Goods Sold)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={costOfGoods}
                onChange={(e) => setCostOfGoods(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">อัตราการปิดการขาย (Conversion Rate %)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Percent className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">เช่น 100 คลิก ได้ 2 ออเดอร์ = 2%</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              สรุปผลการคำนวณ
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-50">
                <p className="text-sm text-gray-500 mb-1">กำไรต่อหน่วย (Profit per Sale)</p>
                <p className="text-2xl font-bold text-gray-900">
                  ฿{profitPerSale.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-lg shadow-sm text-white">
                <p className="text-sm text-blue-100 mb-1">Acceptable CPC (จุดคุ้มทุนค่าคลิก)</p>
                <p className="text-3xl font-bold">
                  ฿{maxCpcBreakEven.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-blue-100 mt-2">
                  * หากค่าคลิกแพงกว่านี้ คุณจะขาดทุนจากการยิงแอด
                </p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-orange-800">
              <strong>คำแนะนำ:</strong> ในความเป็นจริง คุณควรตั้งเป้า CPC ให้ต่ำกว่า Acceptable CPC เพื่อให้มี "กำไรสุทธิ" หลังจากหักค่าโฆษณาแล้ว หากค่าคลิกเท่ากับ Acceptable CPC พอดี แปลว่าคุณทำงานเหนื่อยฟรี (เท่าทุน)
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-blue max-w-none">
        <h2>Acceptable CPC คืออะไร? ทำไมคนยิงแอดต้องรู้</h2>
        <p>
          ในการทำโฆษณาออนไลน์ (Digital Advertising) ไม่ว่าจะเป็น Facebook Ads, Google Ads หรือ TikTok Ads ปัญหาหนึ่งที่นักการตลาดและเจ้าของธุรกิจพบเจอคือ <strong>"เราควรจ่ายค่าคลิกเท่าไหร่ถึงจะไม่ขาดทุน?"</strong> คำตอบของคำถามนี้คือค่าที่เรียกว่า <strong>Acceptable CPC</strong> (Acceptable Cost Per Click) หรือค่าคลิกที่ยอมรับได้นั่นเอง
        </p>

        <h3>สูตรการคำนวณ Acceptable CPC</h3>
        <p>
          หลักการในการหาค่าคลิกสูงสุดที่เราสามารถจ่ายได้โดยไม่เจ็บตัว (ถึงจุดคุ้มทุนพอดี) จะอ้างอิงจาก 2 ปัจจัยหลัก ได้แก่ กำไรต่อออเดอร์ และ โอกาสในการขาย (Conversion Rate) โดยมีสูตรการคำนวณดังนี้:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-center my-4 border border-gray-200 text-lg">
          Acceptable CPC = กำไรต่อการขาย 1 ครั้ง × Conversion Rate
        </div>
        <p>
          <strong>ตัวอย่างเช่น:</strong> สินค้าของคุณมีราคาขาย 1,000 บาท ต้นทุนสินค้า 400 บาท แปลว่าคุณได้กำไรขั้นต้น 600 บาทต่อออเดอร์ หากเว็บไซต์ของคุณมี Conversion Rate อยู่ที่ 2% (คนเข้าเว็บ 100 คน ซื้อ 2 คน)
          <br/><br/>
          คำนวณ: 600 × 2% = 12 บาท
          <br/><br/>
          แปลว่า ค่าคลิก (CPC) สูงสุดที่คุณยอมจ่ายได้คือ 12 บาทต่อคลิก หากคุณจ่ายแพงกว่า 12 บาท คุณจะเริ่มขาดทุนทันที
        </p>

        <h3>ความสำคัญของ Conversion Rate ต่อค่าแอด</h3>
        <p>
          สังเกตได้ว่า <strong>Conversion Rate</strong> หรืออัตราการแปลง มีผลโดยตรงต่อค่าโฆษณาที่คุณสามารถแข่งขันได้ หากคุณและคู่แข่งขายสินค้าคล้ายกัน กำไรเท่ากัน แต่หน้า Sale Page ของคู่แข่งทำได้น่าเชื่อถือกว่า ทำให้มี Conversion Rate 4% ในขณะที่คุณมีแค่ 2% คู่แข่งจะสามารถประมูลสู้ค่าคลิกได้สูงสุดถึง 24 บาท (ยอมจ่ายค่าแอดได้แพงกว่า) โดยที่เขายังไม่ขาดทุน ในขณะที่คุณสู้ราคาได้แค่ 12 บาท
        </p>
        <p>
          การเพิ่ม Conversion Rate (เช่น การทำ A/B Testing, การเขียน Copywriting ให้น่าดึงดูด, การโหลดหน้าเว็บที่เร็วขึ้น) จึงเป็นวิธีที่ดีที่สุดในการเพิ่มเพดาน Acceptable CPC ทำให้คุณสามารถเอาชนะการประมูลโฆษณาในตลาดที่มีการแข่งขันสูงได้
        </p>

        <h3>ข้อควรระวังในการใช้ Acceptable CPC</h3>
        <ul>
          <li><strong>อย่าประมูลเท่ากับ Acceptable CPC เด็ดขาด:</strong> ค่า Acceptable CPC คือจุด "คุ้มทุน" (Break-even) หมายความว่ารายได้จะพอดีกับรายจ่าย หากคุณตั้งเป้าค่าคลิกเท่ากับค่านี้ คุณจะไม่ได้กำไรเลยแม้แต่บาทเดียว ควรตั้งเป้า CPC ให้ต่ำกว่าค่านี้เสมอเพื่อให้เหลือกำไรสุทธิ (Net Profit)</li>
          <li><strong>อย่าลืมคิดต้นทุนแฝง:</strong> ในการคำนวณกำไรต่อออเดอร์ ต้องมั่นใจว่าคุณได้หักต้นทุนสินค้า, ค่ากล่อง, ค่าแพ็ค, ค่าจัดส่ง และค่าธรรมเนียม Platform เรียบร้อยแล้ว หากคิดแต่ต้นทุนการผลิต จะทำให้ Acceptable CPC ผิดเพี้ยน และอาจนำไปสู่การขาดทุนจริง</li>
          <li><strong>Lifetime Value (LTV):</strong> สำหรับธุรกิจที่มีการซื้อซ้ำสูง (เช่น อาหารเสริม หรือ ซอฟต์แวร์แบบรายเดือน) บางครั้งธุรกิจอาจยอมจ่ายค่า CPC สูงกว่า Acceptable CPC ของออเดอร์แรก (ยอมขาดทุนในการขายครั้งแรก) เพื่อหวังกำไรจากการซื้อซ้ำในอนาคต (LTV)</li>
        </ul>

        <p>
          การทราบค่า Acceptable CPC ของแคมเปญโฆษณา ช่วยให้นักการตลาดสามารถตั้งงบประมาณและปรับแต่ง Bid Strategy ในแพลตฟอร์มต่างๆ ได้อย่างแม่นยำ ลดความเสี่ยงในการเผาเงินทิ้ง และเพิ่มความมั่นใจในการขยายสเกล (Scaling) ธุรกิจของคุณได้อย่างยั่งยืน
        </p>
      </div>
    </div>
  );
}

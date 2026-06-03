import React, { useState } from 'react';
import { Store, Calculator, ArrowUpRight } from 'lucide-react';

export default function RetailSpaceRentRoi({ lang }: any) {
  const [rent, setRent] = useState<number | string>('');
  const [setupCost, setSetupCost] = useState<number | string>('');
  const [profitPerSale, setProfitPerSale] = useState<number | string>('');
  const [estimatedSales, setEstimatedSales] = useState<number | string>('');

  const monthlyRent = Number(rent) || 0;
  const initialSetup = Number(setupCost) || 0;
  const profit = Number(profitPerSale) || 0;
  const sales = Number(estimatedSales) || 0;

  const monthlyGrossProfit = profit * sales;
  const monthlyNetProfit = monthlyGrossProfit - monthlyRent;
  const breakEvenSales = profit > 0 ? Math.ceil(monthlyRent / profit) : 0;
  const paybackMonths = monthlyNetProfit > 0 ? (initialSetup / monthlyNetProfit) : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-orange-100 rounded-full">
          <Store className="w-8 h-8 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">คำนวณความคุ้มค่าของการเช่าพื้นที่ร้าน (Retail Space Rent ROI)</h1>
          <p className="text-gray-500">ประเมินกำไรและจุดคุ้มทุนจากการเช่าหน้าร้านหรือบูธสินค้า</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ค่าเช่าพื้นที่ต่อเดือน (Monthly Rent)</label>
            <input
              type="number"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="เช่น 30000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ค่าใช้จ่ายเริ่มต้น (ตกแต่ง, วางมัดจำ)</label>
            <input
              type="number"
              value={setupCost}
              onChange={(e) => setSetupCost(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="เช่น 150000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">กำไรเฉลี่ยต่อบิล/ต่อชิ้น (Average Profit per Sale)</label>
            <input
              type="number"
              value={profitPerSale}
              onChange={(e) => setProfitPerSale(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="เช่น 200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">จำนวนบิลที่คาดว่าจะขายได้ต่อเดือน</label>
            <input
              type="number"
              value={estimatedSales}
              onChange={(e) => setEstimatedSales(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="เช่น 500"
            />
          </div>
        </div>

        <div className="bg-orange-50 p-6 rounded-xl flex flex-col justify-center">
          <h2 className="text-lg font-bold text-orange-900 mb-4 border-b border-orange-200 pb-2">ผลการประเมิน</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">กำไรสุทธิหลังหักค่าเช่า:</span>
              <span className={`text-xl font-bold ${monthlyNetProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {monthlyNetProfit.toLocaleString()} บาท/เดือน
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-700">จุดคุ้มทุนค่าเช่ารายเดือน:</span>
              <span className="font-semibold text-gray-900">
                {breakEvenSales.toLocaleString()} บิล/เดือน
              </span>
            </div>
            <div className="text-xs text-gray-500 text-right mt-1">
              (เฉลี่ย {Math.ceil(breakEvenSales / 30)} บิล/วัน)
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-orange-200">
              <span className="text-gray-700">ระยะเวลาคืนทุนค่าตกแต่ง:</span>
              <span className="font-semibold text-orange-700">
                {paybackMonths > 0 ? `${paybackMonths.toFixed(1)} เดือน` : 'ไม่มีวันคืนทุน'}
              </span>
            </div>
          </div>
          
          {monthlyNetProfit < 0 && profit > 0 && (
             <div className="mt-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg">
               คุณขาดทุน! ยอดขายที่คุณประเมินไว้ไม่เพียงพอจ่ายค่าเช่ารายเดือน ต้องเพิ่มยอดขายให้ได้เกิน {breakEvenSales} บิล ถึงจะเริ่มมีกำไร
             </div>
          )}
        </div>
      </div>

      <hr className="my-8 border-gray-200" />

      <article className="prose prose-orange max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">การคำนวณความคุ้มค่าของการเช่าพื้นที่ร้านค้า (Retail Space Rent ROI) ทำได้อย่างไร</h2>
        
        <p>
          สำหรับธุรกิจแบบออฟไลน์ หรือการขยายสาขาหน้าร้าน (Physical Store) "ค่าเช่าพื้นที่" มักจะเป็นต้นทุนคงที่ (Fixed Cost) ที่สูงที่สุดรองลงมาจากค่าแรงพนักงาน 
          การตัดสินใจเช่าพื้นที่ในห้างสรรพสินค้า ตลาดนัด หรือตึกแถว จึงมีความเสี่ยงสูงมากหากไม่ได้คำนวณตัวเลขและประเมินความคุ้มทุนล่วงหน้า
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เป้าหมายหลักของการคำนวณหน้าร้าน</h3>
        <p>การประเมินเพื่อเปิดหน้าร้านใหม่ มีคำถามสำคัญที่คุณต้องตอบให้ได้ 2 ข้อ:</p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>แต่ละวัน/เดือน ต้องขายให้ได้กี่ชิ้น (กี่บิล) ถึงจะพอจ่ายค่าเช่า?</strong> นี่คือการหาจุดคุ้มทุนรายเดือน (Monthly Break-Even)</li>
          <li><strong>เงินค่าตกแต่งร้าน หรือค่ามัดจำ จะได้คืนเมื่อไหร่?</strong> นี่คือการหาระยะเวลาคืนทุนสำหรับการลงทุนก้อนแรก (Payback Period for Setup)</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีการคำนวณเบื้องต้น</h3>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>กำไรต่อชิ้น (Profit per Sale):</strong> นำราคาขายหักลบด้วยต้นทุนสินค้า (ยังไม่รวมค่าเช่าและพนักงาน)</li>
          <li><strong>จุดคุ้มทุนค่าเช่ารายเดือน:</strong> นำค่าเช่าเดือนนั้น มาหารด้วยกำไรต่อชิ้น จะได้ตัวเลขว่าต้องขายกี่ชิ้นถึงจะพอจ่ายค่าเช่า (ถ้าอยากให้แม่นยำขึ้น ควรนำเงินเดือนพนักงานประจำร้านไปรวมกับค่าเช่าด้วย)</li>
          <li><strong>กำไรสุทธิรายเดือน:</strong> นำ (กำไรต่อชิ้น x จำนวนที่คาดว่าจะขายได้) - ค่าเช่า</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการใช้งานจริง</h3>
        <p>
          สมมติคุณขายชานมไข่มุก กำไรแก้วละ 25 บาท ค่าเช่าพื้นที่ห้าง 30,000 บาทต่อเดือน<br/>
          จุดคุ้มทุน = 30,000 / 25 = 1,200 แก้วต่อเดือน<br/>
          เมื่อนำมาหาร 30 วัน จะตกอยู่ที่ <strong>40 แก้วต่อวัน</strong>
        </p>
        <p>
          ตัวเลข "40 แก้วต่อวัน" นี้จะช่วยให้คุณประเมินความเป็นจริงได้ง่ายขึ้น หากคุณไปสำรวจทำเลแล้วพบว่ามีคนเดินผ่านน้อยมาก โอกาสที่จะขายได้ 40 แก้วแทบไม่มี คุณก็จะได้ตัดสินใจยกเลิกการเช่าพื้นที่นั้นก่อนที่จะเสียเงินมัดจำ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">กฎ 10% ถึง 15% (Rent-to-Sales Ratio)</h3>
        <p>
          ในวงการธุรกิจค้าปลีก มีเกณฑ์มาตรฐาน (Rule of Thumb) อย่างหนึ่งที่นิยมใช้กันคือ <strong>ค่าเช่าที่ดินหรือหน้าร้าน ไม่ควรเกิน 10% - 15% ของยอดขายรวมทั้งหมด</strong> 
          (ในกรณีของร้านอาหารอาจจะอยู่ที่ประมาณ 10-20%) หากพื้นที่ที่คุณจะเช่ามีราคาสูงมากจนทำให้สัดส่วนค่าเช่าพุ่งทะลุเกิน 20% ของยอดขายที่คาดหวัง ธุรกิจของคุณจะเหนื่อยมาก เพราะกำไรสุทธิแทบจะไม่เหลือเลย
        </p>
      </article>
    </div>
  );
}

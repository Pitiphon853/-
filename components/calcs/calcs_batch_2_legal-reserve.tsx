import React, { useState } from 'react';
import { PiggyBank } from 'lucide-react';

export default function LegalReserveCalculator({ lang }: any) {
  const [registeredCapital, setRegisteredCapital] = useState<number | ''>(1000000);
  const [currentReserve, setCurrentReserve] = useState<number | ''>(0);
  const [netProfit, setNetProfit] = useState<number | ''>(500000);

  const maxReserve = registeredCapital !== '' ? Number(registeredCapital) * 0.1 : 0;
  const remainingReserveNeeded = Math.max(0, maxReserve - (Number(currentReserve) || 0));
  
  let requiredReserveThisYear = 0;
  if (netProfit !== '' && remainingReserveNeeded > 0) {
    const minReserve = Number(netProfit) * 0.05;
    requiredReserveThisYear = Math.min(minReserve, remainingReserveNeeded);
  }

  const finalReserve = (Number(currentReserve) || 0) + requiredReserveThisYear;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <PiggyBank className="mr-2" />
          คำนวณทุนสำรองตามกฎหมาย (Legal Reserve)
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ทุนจดทะเบียนบริษัท (บาท)
              </label>
              <input
                type="number"
                value={registeredCapital}
                onChange={(e) => setRegisteredCapital(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="เช่น 1,000,000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ทุนสำรองที่มีอยู่แล้ว (บาท)
              </label>
              <input
                type="number"
                value={currentReserve}
                onChange={(e) => setCurrentReserve(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="เช่น 0"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              กำไรสุทธิประจำปีนี้ (บาท)
            </label>
            <input
              type="number"
              value={netProfit}
              onChange={(e) => setNetProfit(Number(e.target.value))}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="เช่น 500,000"
            />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md mt-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">ผลการคำนวณการจัดสรรกำไร</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-blue-200 pb-2">
                <span className="text-blue-900">เพดานทุนสำรองตามกฎหมาย (10% ของทุนจดทะเบียน)</span>
                <span className="font-semibold text-blue-900">฿{maxReserve.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between items-center text-red-600 border-b border-blue-200 pb-2">
                <span>ยอดที่ยังขาดอีก</span>
                <span className="font-semibold">฿{remainingReserveNeeded.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-blue-900 font-bold">เงินสำรองที่ต้องจัดสรรในปีนี้ (5% ของกำไรสุทธิ)</span>
                <span className="text-2xl font-bold text-blue-900">฿{requiredReserveThisYear.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="text-sm text-blue-700 mt-2 text-right">
                รวมทุนสำรองสะสมหลังจัดสรร: ฿{finalReserve.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md prose max-w-none">
        <h2>ทุนสำรองตามกฎหมาย (Legal Reserve) คืออะไร?</h2>
        <p>ทุนสำรองตามกฎหมาย หรือ <strong>Legal Reserve</strong> คือ เงินส่วนหนึ่งของกำไรสุทธิประจำปีที่กฎหมายบังคับให้บริษัทจำกัดต้องกันเอาไว้เป็นเงินสำรองของกิจการ ห้ามนำไปจ่ายเป็นเงินปันผลให้แก่ผู้ถือหุ้นจนกว่าจะครบตามเกณฑ์ที่กฎหมายกำหนด เพื่อเป็นหลักประกันความมั่นคงทางการเงินของบริษัท และสร้างความเชื่อมั่นให้กับเจ้าหนี้ บุคคลภายนอก รวมถึงผู้มีส่วนได้เสียในการดำเนินธุรกิจ</p>
        
        <h3>ข้อกำหนดตามประมวลกฎหมายแพ่งและพาณิชย์</h3>
        <p>ตามประมวลกฎหมายแพ่งและพาณิชย์ มาตรา 1160 และ มาตรา 1202 ได้ระบุหลักเกณฑ์เกี่ยวกับการจัดสรรกำไรเป็นทุนสำรองไว้ ดังนี้:</p>
        <ul>
          <li><strong>ทุกครั้งที่มีการประกาศจ่ายเงินปันผล</strong> บริษัทจะต้องจัดสรรเงินทุนสำรองไว้ไม่น้อยกว่า <strong>1 ใน 20 ของจำนวนผลกำไร (หรือ 5% ของกำไรสุทธิ)</strong></li>
          <li>ต้องจัดสรรเช่นนี้ไปเรื่อยๆ จนกว่าทุนสำรองนั้นจะมียอดรวมถึง <strong>1 ใน 10 ของจำนวนทุนจดทะเบียนของบริษัท (หรือ 10% ของทุนจดทะเบียน)</strong> เว้นแต่ข้อบังคับของบริษัทจะกำหนดไว้สูงกว่านี้</li>
        </ul>

        <h3>ตัวอย่างการคำนวณ</h3>
        <p>สมมติว่า บริษัท เอ จำกัด มีทุนจดทะเบียน 1,000,000 บาท ในปีปัจจุบันมีกำไรสุทธิ 500,000 บาท และเตรียมจะประกาศจ่ายปันผล</p>
        <ul>
          <li>เพดานเงินสำรองสูงสุดที่กฎหมายต้องการ คือ 10% ของ 1,000,000 = 100,000 บาท</li>
          <li>ในปีนี้ บริษัทต้องจัดสรร 5% ของกำไร 500,000 บาท = 25,000 บาท เข้าเป็นทุนสำรองตามกฎหมาย</li>
          <li>กำไรส่วนที่เหลือหลังหักสำรอง (500,000 - 25,000 = 475,000 บาท) จึงสามารถนำไปจัดสรรเป็นเงินปันผลให้แก่ผู้ถือหุ้นได้</li>
        </ul>
        <p>หากในปีถัดไปบริษัทมีกำไรมหาศาล และ 5% ของกำไรนั้นมากกว่า "ส่วนที่ขาด" ของเพดานทุนสำรอง ให้บริษัทจัดสรรเงินสำรองเพียงแค่ <strong>เท่ากับส่วนที่ขาดให้ครบ 10% ของทุนจดทะเบียนเท่านั้น</strong> ไม่จำเป็นต้องหักเต็ม 5% ของกำไร</p>

        <h3>ทุนสำรองตามกฎหมายนำไปใช้ทำอะไรได้บ้าง?</h3>
        <p>จุดประสงค์หลักของเงินทุนสำรองนี้คือเพื่อความมั่นคง ดังนั้น กฎหมายจึงไม่อนุญาตให้นำมาจ่ายเป็นเงินปันผล อย่างไรก็ตาม บริษัทสามารถนำทุนสำรองนี้ไปใช้ประโยชน์ได้ในบางกรณี เช่น:</p>
        <ol>
          <li><strong>ชดเชยผลขาดทุนสะสม:</strong> หากกิจการมีผลขาดทุนสะสม สามารถนำเงินสำรองตามกฎหมายมาล้างขาดทุนสะสมได้ (ตามมติที่ประชุมผู้ถือหุ้น)</li>
          <li><strong>เพิ่มทุน:</strong> สามารถนำเงินทุนสำรองแปลงเป็นทุนจดทะเบียนเพิ่มเติมโดยการออกหุ้นปันผลให้แก่ผู้ถือหุ้นได้ (หากเกินกว่าเพดาน 10% ที่กฎหมายกำหนด หรือขึ้นอยู่กับกฎระเบียบเพิ่มเติม)</li>
        </ol>

        <h3>บทสรุปสำหรับผู้ประกอบการ</h3>
        <p>การจัดสรรทุนสำรองตามกฎหมายไม่ใช่เพียงแค่การทำตามข้อบังคับเท่านั้น แต่เป็นเครื่องสะท้อนถึงวินัยทางการเงินและธรรมาภิบาลขององค์กร (Corporate Governance) การกันเงินกำไรส่วนหนึ่งไว้จะช่วยให้กิจการมีกันชน (Buffer) เมื่อต้องเผชิญกับวิกฤตเศรษฐกิจ หรือปัญหาขาดทุนในอนาคต ผู้บริหารและนักบัญชีจึงต้องตรวจสอบให้แน่ใจว่าได้ทำการหักเงินสำรองอย่างถูกต้องทุกครั้งก่อนที่จะมีมติอนุมัติจ่ายเงินปันผล</p>
      </div>
    </div>
  );
}

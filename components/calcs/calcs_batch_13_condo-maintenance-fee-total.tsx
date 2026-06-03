import React, { useState } from 'react';
import { Building, Calculator } from 'lucide-react';

export default function CondoMaintenanceFeeTotal({ lang }: any) {
  const isTH = lang === 'TH';
  const [feePerSqM, setFeePerSqM] = useState<number>(45);
  const [roomSize, setRoomSize] = useState<number>(35);
  const [months, setMonths] = useState<number>(12);
  const [parkingFeeMonthly, setParkingFeeMonthly] = useState<number>(0);
  const [otherFeesYearly, setOtherFeesYearly] = useState<number>(0);

  const baseMaintenanceFee = feePerSqM * roomSize * months;
  const totalParkingFee = parkingFeeMonthly * months;
  const totalCost = baseMaintenanceFee + totalParkingFee + otherFeesYearly;
  
  const averageMonthly = totalCost / (months > 0 ? months : 1);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Building className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'เครื่องคำนวณค่าส่วนกลางคอนโด' : 'Condo Maintenance Fee Calculator'}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ค่าส่วนกลาง (บาท/ตร.ม./เดือน)' : 'Fee (THB/Sq.m/Mo)'}</label>
              <input type="number" value={feePerSqM} onChange={(e) => setFeePerSqM(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ขนาดห้อง (ตร.ม.)' : 'Room Size (Sq.m)'}</label>
              <input type="number" value={roomSize} onChange={(e) => setRoomSize(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'จำนวนเดือนที่จ่าย (เดือน)' : 'Months to Pay'}</label>
            <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ค่าที่จอดรถ (บาท/เดือน) *ถ้ามี' : 'Parking Fee (THB/Mo) *If any'}</label>
            <input type="number" value={parkingFeeMonthly} onChange={(e) => setParkingFeeMonthly(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ค่าใช้จ่ายอื่นๆ ต่อปี (บาท)' : 'Other Yearly Fees (THB)'}</label>
            <input type="number" value={otherFeesYearly} onChange={(e) => setOtherFeesYearly(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">{isTH ? 'สรุปยอดที่ต้องชำระ' : 'Total Payment Summary'}</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'ค่าส่วนกลางพื้นฐาน' : 'Base Maintenance Fee'}:</span>
              <span>฿{baseMaintenanceFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'ค่าที่จอดรถรวม' : 'Total Parking Fee'}:</span>
              <span>฿{totalParkingFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'ค่าใช้จ่ายอื่นๆ' : 'Other Fees'}:</span>
              <span>฿{otherFeesYearly.toLocaleString()}</span>
            </div>
            
            <div className="pt-4 mt-4 border-t border-blue-200">
              <div className="flex flex-col text-right">
                <span className="text-sm text-gray-600 mb-1">{isTH ? 'ยอดรวมทั้งหมด' : 'Grand Total'}</span>
                <span className="text-4xl font-extrabold text-blue-700">฿{totalCost.toLocaleString()}</span>
              </div>
              <div className="mt-4 bg-white p-3 rounded-lg text-center shadow-sm">
                <span className="text-sm text-gray-500">{isTH ? 'เฉลี่ยตกเดือนละ' : 'Average per month'}: </span>
                <span className="font-semibold text-gray-800">฿{averageMonthly.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-10 prose prose-blue max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isTH ? 'ค่าส่วนกลางคอนโด คืออะไร? ทำไมคนซื้อคอนโดถึงห้ามมองข้าม' : 'Understanding Condo Maintenance Fees'}
        </h2>
        {isTH ? (
          <>
            <p>เมื่อคุณตัดสินใจซื้อคอนโดมิเนียม นอกเหนือจากค่าผ่อนแบงก์รายเดือนแล้ว ยังมี "ค่าส่วนกลาง" (Maintenance Fee หรือ Common Area Fee) ที่คุณต้องจ่ายเป็นประจำทุกปีให้กับนิติบุคคล ค่าใช้จ่ายส่วนนี้มีความสำคัญอย่างยิ่ง เพราะเป็นเงินทุนในการดูแลรักษาและบริหารจัดการโครงการทั้งหมด</p>
            <h3>ค่าส่วนกลางเอาไปทำอะไรบ้าง?</h3>
            <ul>
              <li><strong>ค่าจ้างบุคลากร:</strong> เงินเดือนของนิติบุคคล, รปภ. รักษาความปลอดภัย, แม่บ้านทำความสะอาด, ช่างประจำอาคาร และคนสวน</li>
              <li><strong>ค่าสาธารณูปโภคส่วนกลาง:</strong> ค่าไฟฟ้าแสงสว่างทางเดิน, ค่าไฟฟ้ายกของและลิฟต์โดยสาร, ค่าน้ำประปาสำหรับรดน้ำต้นไม้และสระว่ายน้ำ</li>
              <li><strong>ค่าบำรุงรักษาอุปกรณ์:</strong> การดูแลรักษาสระว่ายน้ำ, ฟิตเนส, ระบบฉีดน้ำดับเพลิง, ระบบกล้องวงจรปิด (CCTV) และระบบเข้าออกอาคาร (Keycard/Face Scan)</li>
              <li><strong>ค่าใช้จ่ายเบ็ดเตล็ด:</strong> ค่าเก็บขยะ, ค่าประกันภัยอาคาร และอื่นๆ</li>
            </ul>
            <h3>วิธีการคำนวณ</h3>
            <p>นิติบุคคลจะคิดค่าส่วนกลางตาม "ขนาดพื้นที่ห้อง" ของคุณ (ตารางเมตร) ยกตัวอย่างเช่น คอนโดกำหนดค่าส่วนกลางที่ 45 บาท/ตร.ม./เดือน หากห้องคุณขนาด 35 ตร.ม. คุณจะต้องจ่ายเดือนละ 1,575 บาท หรือปีละ 18,900 บาท ยิ่งห้องใหญ่ ก็ยิ่งจ่ายเยอะ</p>
            <h3>ทำไมบางที่เก็บค่าที่จอดรถเพิ่ม?</h3>
            <p>คอนโดในยุคใหม่บางแห่ง (โดยเฉพาะทำเลกลางเมือง) อาจมีการแยก "ค่าที่จอดรถรายเดือน" ออกจากค่าส่วนกลาง เพื่อความเป็นธรรมกับผู้ที่ไม่ได้ใช้รถยนต์ส่วนตัว หากคุณนำรถมาจอดจะต้องเสียค่าบริการรายเดือนเพิ่มต่างหาก ซึ่งมักจะอยู่ที่ 300 - 1,000 บาทต่อเดือน</p>
            <p>การใช้เครื่องคำนวณนี้จะช่วยให้คุณประเมินค่าใช้จ่ายล่วงหน้า เพื่อเตรียมเงินก้อนสำหรับจ่ายค่าส่วนกลางรายปีได้อย่างสบายใจ ไม่กระทบสภาพคล่องทางการเงินของคุณ</p>
          </>
        ) : (
          <p>Condo maintenance fees (or common area fees) are essential recurring costs paid by owners to the building's juristic person. These funds cover the upkeep of shared facilities like the pool, gym, elevators, security, and cleaning services. The fee is usually calculated based on your unit's size (per square meter). Some modern condos also charge a separate monthly fee for car parking. Use our calculator to accurately estimate your annual condo maintenance expenses so you can budget accordingly.</p>
        )}
      </article>
    </div>
  );
}

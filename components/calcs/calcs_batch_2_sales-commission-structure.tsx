import React, { useState } from 'react';
import { Target } from 'lucide-react';

export default function SalesCommissionStructure({ lang }: any) {
  const [salesRevenue, setSalesRevenue] = useState<number | ''>(500000);
  const [baseSalary, setBaseSalary] = useState<number | ''>(20000);
  const [isTiered, setIsTiered] = useState<boolean>(true);
  
  // Flat rate
  const [flatRate, setFlatRate] = useState<number | ''>(3);

  // Tiered
  const [tier1Target, setTier1Target] = useState<number | ''>(100000);
  const [tier1Rate, setTier1Rate] = useState<number | ''>(1);
  const [tier2Target, setTier2Target] = useState<number | ''>(300000);
  const [tier2Rate, setTier2Rate] = useState<number | ''>(3);
  const [tier3Rate, setTier3Rate] = useState<number | ''>(5);

  const revenue = Number(salesRevenue) || 0;
  let commission = 0;
  let tier1Comm = 0;
  let tier2Comm = 0;
  let tier3Comm = 0;

  if (!isTiered) {
    commission = revenue * ((Number(flatRate) || 0) / 100);
  } else {
    const t1T = Number(tier1Target) || 0;
    const t1R = Number(tier1Rate) || 0;
    const t2T = Number(tier2Target) || 0;
    const t2R = Number(tier2Rate) || 0;
    const t3R = Number(tier3Rate) || 0;

    if (revenue <= t1T) {
      tier1Comm = revenue * (t1R / 100);
    } else if (revenue <= t2T) {
      tier1Comm = t1T * (t1R / 100);
      tier2Comm = (revenue - t1T) * (t2R / 100);
    } else {
      tier1Comm = t1T * (t1R / 100);
      tier2Comm = (t2T - t1T) * (t2R / 100);
      tier3Comm = (revenue - t2T) * (t3R / 100);
    }
    commission = tier1Comm + tier2Comm + tier3Comm;
  }

  const totalCompensation = (Number(baseSalary) || 0) + commission;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Target className="mr-2" />
          เครื่องมือคำนวณค่าคอมมิชชั่นพนักงานขาย
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ยอดขายที่ทำได้ (Sales Revenue)
              </label>
              <input
                type="number"
                value={salesRevenue}
                onChange={(e) => setSalesRevenue(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เงินเดือนพื้นฐาน (Base Salary)
              </label>
              <input
                type="number"
                value={baseSalary}
                onChange={(e) => setBaseSalary(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex items-center space-x-4 mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={!isTiered}
                  onChange={() => setIsTiered(false)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">อัตราคงที่ (Flat Rate)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={isTiered}
                  onChange={() => setIsTiered(true)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">แบบขั้นบันได (Tiered)</span>
              </label>
            </div>

            {!isTiered ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เปอร์เซ็นต์ค่าคอมมิชชั่น (%)
                </label>
                <input
                  type="number"
                  value={flatRate}
                  step="0.1"
                  onChange={(e) => setFlatRate(Number(e.target.value))}
                  className="w-full md:w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : (
              <div className="space-y-3 bg-gray-50 p-4 rounded-md border">
                <div className="grid grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">ยอดขายตั้งแต่ 0 ถึง (บาท)</label>
                    <input
                      type="number"
                      value={tier1Target}
                      onChange={(e) => setTier1Target(Number(e.target.value))}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">ได้คอมมิชชั่น (%)</label>
                    <input
                      type="number"
                      value={tier1Rate}
                      step="0.1"
                      onChange={(e) => setTier1Rate(Number(e.target.value))}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">ยอดขายส่วนที่เกิน {Number(tier1Target).toLocaleString()} ถึง (บาท)</label>
                    <input
                      type="number"
                      value={tier2Target}
                      onChange={(e) => setTier2Target(Number(e.target.value))}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">ได้คอมมิชชั่น (%)</label>
                    <input
                      type="number"
                      value={tier2Rate}
                      step="0.1"
                      onChange={(e) => setTier2Rate(Number(e.target.value))}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">ยอดขายส่วนที่เกิน {Number(tier2Target).toLocaleString()} ขึ้นไป</label>
                    <input
                      type="text"
                      disabled
                      value="-"
                      className="w-full p-2 border rounded-md bg-gray-100 text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">ได้คอมมิชชั่น (%)</label>
                    <input
                      type="number"
                      value={tier3Rate}
                      step="0.1"
                      onChange={(e) => setTier3Rate(Number(e.target.value))}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-md mt-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">สรุปรายได้พนักงานขาย</h3>
            
            {isTiered && (
              <div className="mb-4 text-sm text-gray-700 space-y-1">
                <p>รายละเอียดการคำนวณคอมมิชชั่น:</p>
                <div className="flex justify-between pl-4"><span>ขั้นที่ 1:</span> <span>฿{tier1Comm.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
                <div className="flex justify-between pl-4"><span>ขั้นที่ 2:</span> <span>฿{tier2Comm.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
                <div className="flex justify-between pl-4"><span>ขั้นที่ 3:</span> <span>฿{tier3Comm.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-blue-200 pb-2">
                <span className="text-blue-900">เงินเดือนพื้นฐาน (Base Salary)</span>
                <span className="font-semibold text-blue-900">฿{(Number(baseSalary) || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between items-center border-b border-blue-200 pb-2">
                <span className="text-blue-900">ค่าคอมมิชชั่นที่ทำได้ (Commission)</span>
                <span className="font-semibold text-green-600">฿{commission.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-blue-900 font-bold text-lg">รวมรายได้สุทธิ (Total Compensation)</span>
                <span className="text-3xl font-bold text-blue-900">฿{totalCompensation.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md prose max-w-none">
        <h2>โครงสร้างค่าคอมมิชชั่น (Sales Commission Structure) แบบไหนดีที่สุด?</h2>
        <p>ทีมขายหรือ Sales เป็นฟันเฟืองสำคัญที่ขับเคลื่อนรายได้ให้กับองค์กร การออกแบบ "โครงสร้างค่าคอมมิชชั่น" (Commission Structure) ที่เหมาะสมและเป็นธรรม จึงเป็นกุญแจสำคัญในการสร้างแรงจูงใจให้เซลส์อยากทำยอดขายให้ทะลุเป้าหมาย และยังช่วยรักษาพนักงานเก่งๆ ให้อยู่กับบริษัทได้นานขึ้น</p>
        
        <h3>ประเภทของโครงสร้างค่าคอมมิชชั่นที่นิยมใช้</h3>
        <p>ในการคำนวณผลตอบแทนให้พนักงานขาย ส่วนใหญ่จะแบ่งออกเป็น 2 รูปแบบหลัก ได้แก่:</p>
        
        <h4>1. ค่าคอมมิชชั่นแบบอัตราคงที่ (Flat Rate / Straight Commission)</h4>
        <p>เป็นวิธีที่เข้าใจง่ายที่สุด โดยพนักงานจะได้เปอร์เซ็นต์ส่วนแบ่งจากทุกๆ ยอดขายที่ทำได้ในอัตราที่เท่ากันเสมอ ไม่ว่าจะขายได้น้อยหรือมาก เช่น กำหนดไว้ที่ 3% หากขายได้ 100,000 บาท ก็ได้ 3,000 บาท หากขายได้ 1,000,000 บาท ก็ได้ 30,000 บาท</p>
        <ul>
          <li><strong>ข้อดี:</strong> คำนวณง่าย โปร่งใส เซลส์สามารถคาดการณ์รายได้ตัวเองได้ชัดเจน</li>
          <li><strong>ข้อเสีย:</strong> อาจขาดแรงจูงใจในการ "ฮึด" เพื่อทำยอดให้ทะลุเป้าสูงๆ (Stretch Goal) เพราะไม่ว่าจะขายเพิ่มแค่ไหน อัตราคูณก็ยังเท่าเดิม</li>
        </ul>

        <h4>2. ค่าคอมมิชชั่นแบบขั้นบันได (Tiered Commission)</h4>
        <p>เป็นรูปแบบที่ถูกออกแบบมาเพื่อกระตุ้นให้เซลส์ผลักดันตัวเองให้ทำยอดได้สูงขึ้นไปเรื่อยๆ โดยจะมีการแบ่งระดับ (Tier) ของยอดขาย ยิ่งขายยอดทะลุไปอยู่ในขั้นที่สูงขึ้น เปอร์เซ็นต์ที่ได้ใน "ส่วนที่เกิน" ก็จะยิ่งสูงขึ้น (Progressive rate)</p>
        <p>ตัวอย่างเช่น:
          <br/>- ยอดขาย 0 - 100,000 บาท ได้ 1%
          <br/>- ยอดขาย 100,001 - 300,000 บาท ได้ 3%
          <br/>- ยอดขาย 300,001 บาทขึ้นไป ได้ 5%
        </p>
        <ul>
          <li><strong>ข้อดี:</strong> สร้างแรงกระตุ้น (Incentive) ได้อย่างยอดเยี่ยม เพราะเซลส์จะพยายามทำยอดให้ข้าม Tier เพื่อไปเอาเปอร์เซ็นต์ที่สูงกว่า</li>
          <li><strong>ข้อเสีย:</strong> คำนวณซับซ้อนกว่า หากตั้งเป้า (Target) ของแต่ละขั้นไม่สอดคล้องกับความเป็นจริง (เช่น สูงเกินไปจนเป็นไปไม่ได้) เซลส์อาจจะถอดใจตั้งแต่ต้น</li>
        </ul>

        <h3>ความสมดุลระหว่าง Base Salary และ Commission (Pay Mix)</h3>
        <p>นอกจากโครงสร้างเปอร์เซ็นต์แล้ว อีกหนึ่งสิ่งที่ต้องพิจารณาคือ "สัดส่วนระหว่างเงินเดือนพื้นฐานกับค่าคอมมิชชั่น" (Pay Mix) เช่น:</p>
        <ul>
          <li><strong>สัดส่วน 80/20 (เงินเดือน 80% คอมมิชชั่น 20%):</strong> เหมาะกับงานขายที่ต้องเน้นการบริการลูกค้าหลังการขาย ใช้เวลาในการปิดการขายนาน (Long Sales Cycle) หรือเป็น Account Executive ที่ต้องดูแลลูกค้าระยะยาว</li>
          <li><strong>สัดส่วน 50/50 หรือต่ำกว่า (เน้นคอมมิชชั่น):</strong> เหมาะกับงานขายที่อาศัยปริมาณสูง (High Volume) สินค้าซื้อง่ายขายคล่อง หรือสายงาน Telesales การให้คอมมิชชั่นสูงๆ จะช่วยคัดกรองพนักงานที่เก่งงานขายจริงๆ ออกมาได้</li>
        </ul>

        <h3>สรุปสำหรับเจ้าของธุรกิจ</h3>
        <p>ไม่มีโครงสร้างค่าคอมมิชชั่นใดที่ดีที่สุดสำหรับทุกบริษัท การออกแบบโครงสร้างนี้ต้องพิจารณาจากอัตรากำไร (Margin) ของสินค้า รูปแบบการขาย (B2B หรือ B2C) และพฤติกรรมของลูกค้า การจำลองตัวเลข (Simulation) โดยใช้เครื่องมือคำนวณด้านบนเพื่อประเมินสถานการณ์ Worst-case และ Best-case จะช่วยให้คุณตั้งงบประมาณและออกแบบ Incentive ได้อย่างมีประสิทธิภาพ</p>
      </div>
    </div>
  );
}

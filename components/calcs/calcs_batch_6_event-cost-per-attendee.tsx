import React, { useState } from 'react';
import { Users, DollarSign, PieChart, Info } from 'lucide-react';

const EventCostCalculator = ({ lang }: any) => {
  const [attendees, setAttendees] = useState<number>(100);
  
  // Fixed Costs
  const [venueCost, setVenueCost] = useState<number>(20000);
  const [marketingCost, setMarketingCost] = useState<number>(5000);
  const [staffCost, setStaffCost] = useState<number>(10000);
  const [otherFixed, setOtherFixed] = useState<number>(5000);
  
  // Variable Costs (Per Attendee)
  const [foodPerPerson, setFoodPerPerson] = useState<number>(500);
  const [swagPerPerson, setSwagPerPerson] = useState<number>(200);
  const [otherVariable, setOtherVariable] = useState<number>(100);

  // Calculations
  const totalFixedCost = venueCost + marketingCost + staffCost + otherFixed;
  const totalVariableCost = (foodPerPerson + swagPerPerson + otherVariable) * attendees;
  const totalCost = totalFixedCost + totalVariableCost;
  const costPerAttendee = totalCost / (attendees || 1);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6 text-purple-600">
        <Users className="w-8 h-8 mr-3" />
        <h1 className="text-2xl font-bold">เครื่องมือคำนวณต้นทุนงานอีเวนต์ต่อหัว (Event Cost per Attendee)</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <label className="block text-sm font-bold text-purple-800 mb-2">จำนวนผู้เข้าร่วมงานโดยประมาณ (คน)</label>
            <input
              type="number"
              value={attendees}
              onChange={(e) => setAttendees(Number(e.target.value))}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
              min="1"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">ต้นทุนคงที่ (Fixed Costs)</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700">ค่าเช่าสถานที่ (บาท)</label>
                <input type="number" value={venueCost} onChange={(e) => setVenueCost(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">ค่าการตลาดและโปรโมท (บาท)</label>
                <input type="number" value={marketingCost} onChange={(e) => setMarketingCost(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">ค่าจ้างพนักงาน/วิทยากร (บาท)</label>
                <input type="number" value={staffCost} onChange={(e) => setStaffCost(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">ค่าใช้จ่ายคงที่อื่นๆ (บาท)</label>
                <input type="number" value={otherFixed} onChange={(e) => setOtherFixed(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-purple-500" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">ต้นทุนผันแปรต่อหัว (Variable Costs per Person)</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700">ค่าอาหารและเครื่องดื่ม ต่อหัว (บาท)</label>
                <input type="number" value={foodPerPerson} onChange={(e) => setFoodPerPerson(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">ค่าของที่ระลึก/เอกสาร ต่อหัว (บาท)</label>
                <input type="number" value={swagPerPerson} onChange={(e) => setSwagPerPerson(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">ค่าใช้จ่ายผันแปรอื่นๆ ต่อหัว (บาท)</label>
                <input type="number" value={otherVariable} onChange={(e) => setOtherVariable(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-purple-500" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2" /> สรุปงบประมาณ
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">รวมต้นทุนคงที่ (Fixed Costs):</span>
                <span className="font-semibold text-gray-800">฿{totalFixedCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">รวมต้นทุนผันแปร ({attendees} คน):</span>
                <span className="font-semibold text-gray-800">฿{totalVariableCost.toLocaleString()}</span>
              </div>
              
              <div className="pt-4 pb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-700 font-bold">ต้นทุนรวมทั้งหมด:</span>
                  <span className="text-xl font-bold text-purple-700">฿{totalCost.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-purple-600 p-4 rounded-lg text-white text-center mt-4">
                <p className="text-purple-100 text-sm mb-1">ต้นทุนเฉลี่ยต่อผู้เข้าร่วม 1 คน</p>
                <p className="text-3xl font-bold">฿{costPerAttendee.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
              </div>
            </div>

            <div className="mt-4 flex items-start text-xs text-gray-500 bg-white p-3 rounded border">
              <Info className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500" />
              <p>หากคุณต้องการขายบัตรเข้างาน ควรตั้งราคาให้สูงกว่า "{costPerAttendee.toLocaleString(undefined, {maximumFractionDigits: 0})} บาท" เพื่อให้คุ้มทุน (Break-even)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 prose max-w-none text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">การคำนวณต้นทุนงานอีเวนต์ต่อหัว (Event Cost per Attendee) คืออะไร?</h2>
        <p>
          ในการจัดงานอีเวนต์ สัมมนา งานเลี้ยง หรือการจัดคอนเสิร์ต ไม่ว่าขนาดเล็กหรือขนาดใหญ่ สิ่งที่สำคัญที่สุดในการวางแผนงบประมาณคือการประเมิน <strong>ต้นทุนงานอีเวนต์ต่อหัว (Event Cost per Attendee)</strong> อย่างแม่นยำ เพราะตัวเลขนี้จะเป็นตัวกำหนดทั้งเรื่องการตั้งราคาขายตั๋วเข้างาน การหาสปอนเซอร์ หรือแม้แต่การตัดลดงบประมาณในส่วนที่ไม่จำเป็นออกไป เพื่อไม่ให้เกิดภาวะงบปานปลาย (Over Budget)
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">โครงสร้างต้นทุนของการจัดงานอีเวนต์</h3>
        <p>เพื่อคำนวณต้นทุนต่อหัวได้อย่างถูกต้อง เราต้องแบ่งค่าใช้จ่ายทั้งหมดออกเป็น 2 ประเภทหลัก ได้แก่:</p>
        
        <h4 className="text-lg font-medium mt-4 mb-2">1. ต้นทุนคงที่ (Fixed Costs)</h4>
        <p>
          คือค่าใช้จ่ายที่เกิดขึ้นแน่นอน ไม่ว่าจะมีคนมาร่วมงานกี่คนก็ตาม แม้จะมีคนมาแค่ 10 คน หรือมาเต็มความจุ 1,000 คน ค่าใช้จ่ายนี้ก็จะไม่เปลี่ยนแปลง เช่น:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>ค่าเช่าสถานที่จัดการ (Venue Rental) และค่าตกแต่ง</li>
          <li>ค่าเครื่องเสียง แสง สี (AV Equipment)</li>
          <li>ค่าการตลาด ค่าโฆษณาประชาสัมพันธ์</li>
          <li>ค่าจ้างพิธีกร วิทยากร ผู้แสดง และพนักงานควบคุมงาน</li>
          <li>ค่าประกันภัย และใบอนุญาตต่างๆ</li>
        </ul>

        <h4 className="text-lg font-medium mt-4 mb-2">2. ต้นทุนผันแปร (Variable Costs)</h4>
        <p>
          คือค่าใช้จ่ายที่แปรผันตามจำนวนคนที่มาร่วมงาน ยิ่งคนมาเยอะ ต้นทุนส่วนนี้ก็จะยิ่งสูงขึ้น ซึ่งปกติจะคิดเป็น "ต่อหัว" เช่น:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>ค่าอาหารและเครื่องดื่มต่อคน (F&B / Catering)</li>
          <li>ของที่ระลึก ถุงผ้า เอกสารประกอบการสัมมนา (Swag & Materials)</li>
          <li>ป้ายชื่อสายคล้องคอ (Badges & Lanyards)</li>
          <li>ส่วนแบ่งแพลตฟอร์มขายตั๋ว (Ticketing fees) คิดตามจำนวนตั๋วที่ขายได้</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">สูตรการคำนวณต้นทุนต่อหัว</h3>
        <div className="bg-gray-100 p-4 rounded-md my-4 font-mono text-sm">
          <p>รวมต้นทุนคงที่ = ค่าเช่าสถานที่ + ค่าการตลาด + ค่าจ้างพนักงาน + ค่าคงที่อื่นๆ</p>
          <p>รวมต้นทุนผันแปร = (ค่าอาหารต่อหัว + ค่าของที่ระลึกต่อหัว) × จำนวนผู้ร่วมงาน</p>
          <p>ต้นทุนรวมทั้งหมด = รวมต้นทุนคงที่ + รวมต้นทุนผันแปร</p>
          <br/>
          <p className="font-bold text-purple-700">ต้นทุนต่อหัว = ต้นทุนรวมทั้งหมด ÷ จำนวนผู้ร่วมงาน</p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">การประยุกต์ใช้เพื่อความสำเร็จของงาน</h3>
        <p>เมื่อคุณทราบต้นทุนต่อหัวที่แท้จริงแล้ว คุณสามารถนำไปใช้วางแผนกลยุทธ์ต่างๆ ได้ดังนี้:</p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>การหาราคาคุ้มทุน (Break-Even Pricing):</strong> หากต้นทุนต่อหัวของคุณคือ 1,500 บาท และคุณไม่มีสปอนเซอร์ คุณจะต้องขายบัตรอย่างน้อยในราคา 1,500 บาท เพื่อไม่ให้ขาดทุน</li>
          <li><strong>การกำหนดแพ็กเกจสปอนเซอร์ (Sponsorship Tiers):</strong> หากคุณจัดงานฟรี (เช่น งานของบริษัท) การรู้ต้นทุนต่อหัวจะช่วยให้รู้ว่าต้องหาสปอนเซอร์มารองรับงบประมาณเท่าไรถึงจะเพียงพอ</li>
          <li><strong>กลยุทธ์ด้านจำนวนคน (Economies of Scale):</strong> เนื่องจากต้นทุนคงที่ถูกหารด้วยจำนวนคนที่มากขึ้น ยิ่งคุณดึงดูดคนมาร่วมงานได้มาก ต้นทุนเฉลี่ยต่อหัวก็จะยิ่งลดลง และส่วนต่างกำไรก็จะมากขึ้น</li>
        </ol>
        
        <p className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <strong>Tip สำหรับผู้จัดงาน:</strong> ควรกันงบสำรองฉุกเฉิน (Contingency Fund) ไว้ประมาณ 10-15% ของต้นทุนรวมเสมอ เผื่อกรณีค่าใช้จ่ายบานปลายที่ไม่ได้คาดคิด เช่น ค่าล่วงเวลาของพนักงานสถานที่ หรือค่าอาหารสำหรับผู้ติดตาม
        </p>
      </div>
    </div>
  );
};

export default EventCostCalculator;

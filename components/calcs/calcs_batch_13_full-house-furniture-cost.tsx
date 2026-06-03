import React, { useState } from 'react';
import { Sofa, Calculator } from 'lucide-react';

export default function FullHouseFurnitureCost({ lang }: any) {
  const isTH = lang === 'TH';
  const [livingRoom, setLivingRoom] = useState<number>(30000);
  const [diningRoom, setDiningRoom] = useState<number>(15000);
  const [masterBed, setMasterBed] = useState<number>(40000);
  const [secondBed, setSecondBed] = useState<number>(20000);
  const [appliances, setAppliances] = useState<number>(60000);
  const [curtains, setCurtains] = useState<number>(30000);
  const [misc, setMisc] = useState<number>(10000);

  const totalCost = livingRoom + diningRoom + masterBed + secondBed + appliances + curtains + misc;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Sofa className="w-8 h-8 text-teal-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'ประเมินงบเฟอร์นิเจอร์ตกแต่งบ้าน' : 'Full House Furniture Cost Estimator'}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ห้องนั่งเล่น (โซฟา, ชั้นทีวี, โต๊ะกลาง)' : 'Living Room (Sofa, TV Unit, etc.)'}</label>
            <input type="number" value={livingRoom} onChange={(e) => setLivingRoom(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ห้องทานอาหาร (โต๊ะ, เก้าอี้)' : 'Dining Room (Table, Chairs)'}</label>
            <input type="number" value={diningRoom} onChange={(e) => setDiningRoom(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ห้องนอนมาสเตอร์ (เตียง, ที่นอน, ตู้เสื้อผ้า)' : 'Master Bedroom (Bed, Mattress, Wardrobe)'}</label>
            <input type="number" value={masterBed} onChange={(e) => setMasterBed(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ห้องนอนเล็ก (เตียง, ตู้เสื้อผ้า)' : 'Second Bedroom'}</label>
            <input type="number" value={secondBed} onChange={(e) => setSecondBed(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'เครื่องใช้ไฟฟ้า (ทีวี, ตู้เย็น, ซักผ้า)' : 'Appliances (TV, Fridge, Washer)'}</label>
            <input type="number" value={appliances} onChange={(e) => setAppliances(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ผ้าม่าน/มู่ลี่' : 'Curtains/Blinds'}</label>
              <input type="number" value={curtains} onChange={(e) => setCurtains(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ของตกแต่งจิปาถะ' : 'Misc. Decor'}</label>
              <input type="number" value={misc} onChange={(e) => setMisc(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
        </div>

        <div className="bg-teal-50 p-6 rounded-xl border border-teal-100 flex flex-col">
          <h2 className="text-xl font-semibold text-teal-900 mb-4">{isTH ? 'สรุปงบประมาณตกแต่ง' : 'Furnishing Budget Summary'}</h2>
          <div className="space-y-3 flex-1">
            <div className="flex justify-between text-gray-700"><span>{isTH ? 'ห้องนั่งเล่น' : 'Living Room'}:</span><span>฿{livingRoom.toLocaleString()}</span></div>
            <div className="flex justify-between text-gray-700"><span>{isTH ? 'ห้องทานอาหาร' : 'Dining Room'}:</span><span>฿{diningRoom.toLocaleString()}</span></div>
            <div className="flex justify-between text-gray-700"><span>{isTH ? 'ห้องนอนมาสเตอร์' : 'Master Bedroom'}:</span><span>฿{masterBed.toLocaleString()}</span></div>
            <div className="flex justify-between text-gray-700"><span>{isTH ? 'ห้องนอนเล็ก' : 'Second Bedroom'}:</span><span>฿{secondBed.toLocaleString()}</span></div>
            <div className="flex justify-between text-gray-700"><span>{isTH ? 'เครื่องใช้ไฟฟ้า' : 'Appliances'}:</span><span>฿{appliances.toLocaleString()}</span></div>
            <div className="flex justify-between text-gray-700"><span>{isTH ? 'ผ้าม่านและอื่นๆ' : 'Curtains & Misc'}:</span><span>฿{(curtains + misc).toLocaleString()}</span></div>
          </div>
          <div className="pt-4 mt-4 border-t border-teal-200">
            <div className="flex flex-col text-right">
              <span className="text-sm text-gray-600 mb-1">{isTH ? 'ยอดรวมประเมินเบื้องต้น' : 'Total Estimated Budget'}</span>
              <span className="text-4xl font-extrabold text-teal-700">฿{totalCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-10 prose prose-teal max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isTH ? 'ซื้อบ้านใหม่ต้องเตรียมงบค่าเฟอร์นิเจอร์เท่าไหร่?' : 'Budgeting for Furnishing a New House'}
        </h2>
        {isTH ? (
          <>
            <p>อาการ "บ้านบาน" มักเกิดขึ้นกับคนซื้อบ้านใหม่ เพราะนอกจากค่าบ้านและค่าโอนแล้ว "ค่าตกแต่งและซื้อเฟอร์นิเจอร์เข้าบ้าน" ถือเป็นก้อนใหญ่ที่หลายคนลืมวางแผน การลิสต์รายการแยกตามห้องและกำหนดงบประมาณ (Budgeting) จะช่วยให้คุณคุมงบได้และไม่ใช้จ่ายเกินตัว</p>
            <h3>รายการหลักที่ต้องเตรียม</h3>
            <p><strong>1. ห้องนั่งเล่นและทานอาหาร (Living & Dining):</strong> ถือเป็นหน้าตาของบ้าน งบมักหมดไปกับโซฟาดีๆ สักตัว (ประมาณ 10,000 - 30,000 บาท) ชั้นวางทีวี และชุดโต๊ะทานข้าว</p>
            <p><strong>2. ห้องนอนมาสเตอร์ (Master Bedroom):</strong> ห้องที่คุณใช้เวลามากที่สุด ควรให้ความสำคัญกับ "ที่นอน (Mattress)" คุณภาพดีเพื่อสุขภาพหลัง ซึ่งอาจมีราคาสูงถึง 15,000 - 30,000 บาท ไม่รวมโครงเตียงและตู้เสื้อผ้าขนาดใหญ่</p>
            <p><strong>3. เครื่องใช้ไฟฟ้า (Appliances):</strong> เป็นหมวดหมู่ที่กินงบประมาณค่อนข้างเยอะ สิ่งที่ขาดไม่ได้คือ โทรทัศน์, ตู้เย็น, เครื่องซักผ้า, และไมโครเวฟ หากซื้อพร้อมกันหลายชิ้น แนะนำให้รอดูโปรโมชั่นจากห้างสรรพสินค้าจะช่วยประหยัดได้มาก</p>
            <p><strong>4. ผ้าม่าน (Curtains):</strong> เป็นสิ่งที่คนมักลืมคิด แต่สำหรับบ้านเดี่ยวที่มีหน้าต่างหลายบาน การสั่งตัดผ้าม่านทั้งหลังอาจมีมูลค่าสูงตั้งแต่ 20,000 ไปจนถึงหลักแสนบาทเลยทีเดียว!</p>
            <h3>คำแนะนำ</h3>
            <p>ไม่จำเป็นต้องซื้อเฟอร์นิเจอร์ทั้งหมดให้ครบภายในวันเดียว คุณสามารถใช้เครื่องประเมินงบประมาณของเราเพื่อจัดลำดับความสำคัญ โดยเริ่มจากชิ้นที่ "จำเป็นต้องใช้ทันที" เช่น เตียงนอน ตู้เย็น และผ้าม่าน ส่วนของตกแต่งเล็กๆ น้อยๆ สามารถทยอยซื้อตามมาทีหลังได้</p>
          </>
        ) : (
          <p>Furnishing a new home can quickly become expensive if not planned properly. Breaking down the budget room by room helps you control costs. Key expenses usually include living room seating, a high-quality mattress for the master bedroom, essential appliances (fridge, washing machine, TV), and whole-house curtains. Use our tool to set realistic budgets for each category, prioritize essential items, and avoid overspending as you settle into your new home.</p>
        )}
      </article>
    </div>
  );
}

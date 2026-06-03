import React, { useState } from 'react';
import { PlugZap, Calculator, Wrench, Settings, BatteryCharging, Info } from 'lucide-react';

export default function EVChargerInstallationCost({ lang }: any) {
  const [chargerCost, setChargerCost] = useState<number>(25000);
  const [laborCost, setLaborCost] = useState<number>(15000); // Cabling & Installation
  const [meterUpgradeCost, setMeterUpgradeCost] = useState<number>(5000); // PEA/MEA fee for TOU or larger meter
  const [breakerCost, setBreakerCost] = useState<number>(3000); // New consumer unit / RCBO

  const totalCost = chargerCost + laborCost + meterUpgradeCost + breakerCost;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-sky-100 p-3 rounded-full text-sky-600">
          <PlugZap size={28} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {lang === 'EN' ? 'Home EV Charger Installation Cost' : 'โปรแกรมคำนวณค่าติดตั้งเครื่องชาร์จ EV ที่บ้าน'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5 bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-100">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'EV Charger Unit Price (Baht)' : 'ราคาเครื่องชาร์จ EV (บาท)'}
            </label>
            <input
              type="number"
              min="0"
              value={chargerCost}
              onChange={(e) => setChargerCost(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">
              {lang === 'EN' ? 'Usually free if bundled with a new car purchase.' : 'หากแถมมากับตัวรถ ให้กรอก 0'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Labor & Cabling Cost (Baht)' : 'ค่าแรงเดินสายไฟและติดตั้ง (บาท)'}
            </label>
            <input
              type="number"
              min="0"
              value={laborCost}
              onChange={(e) => setLaborCost(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Meter Upgrade / TOU Fee (Baht)' : 'ค่าธรรมเนียมขอขยายมิเตอร์ / เปลี่ยน TOU (บาท)'}
            </label>
            <input
              type="number"
              min="0"
              value={meterUpgradeCost}
              onChange={(e) => setMeterUpgradeCost(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Breaker & Consumer Unit (Baht)' : 'ค่าเบรกเกอร์กันดูด (RCBO) / ตู้ไฟย่อย (บาท)'}
            </label>
            <input
              type="number"
              min="0"
              value={breakerCost}
              onChange={(e) => setBreakerCost(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
            />
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl p-6 text-white shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calculator size={24} />
              {lang === 'EN' ? 'Total Installation Cost' : 'สรุปค่าใช้จ่ายทั้งหมด'}
            </h2>
            
            <div className="space-y-4">
              
              <div className="flex justify-between items-center text-sky-100 text-sm">
                <div className="flex items-center gap-2"><BatteryCharging size={16}/> {lang === 'EN' ? 'Charger Unit' : 'ค่าเครื่องชาร์จ'}</div>
                <span>{chargerCost.toLocaleString()} ฿</span>
              </div>
              <div className="flex justify-between items-center text-sky-100 text-sm">
                <div className="flex items-center gap-2"><Wrench size={16}/> {lang === 'EN' ? 'Labor & Cables' : 'ค่าแรงและสายไฟ'}</div>
                <span>{laborCost.toLocaleString()} ฿</span>
              </div>
              <div className="flex justify-between items-center text-sky-100 text-sm">
                <div className="flex items-center gap-2"><Settings size={16}/> {lang === 'EN' ? 'Electrical Upgrades' : 'อัปเกรดระบบไฟ/มิเตอร์'}</div>
                <span>{(meterUpgradeCost + breakerCost).toLocaleString()} ฿</span>
              </div>

              <div className="h-px w-full bg-white/30 my-4"></div>

              <div className="bg-white/20 p-4 rounded-lg flex flex-col items-center border border-sky-300/50 py-5">
                <span className="font-semibold text-sky-100 mb-2">
                  {lang === 'EN' ? 'Total Upfront Investment' : 'เงินลงทุนเริ่มต้นทั้งหมด'}
                </span>
                <div className="text-4xl font-extrabold text-white text-center">
                  {totalCost.toLocaleString()} <span className="text-base font-normal">฿</span>
                </div>
              </div>

            </div>
            
            <div className="mt-4 text-xs text-sky-100 flex items-start gap-2">
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <p>
                {lang === 'EN'
                  ? 'Costs vary based on cable length, brand of charger, and specific household electrical setups. Always consult a certified electrician.'
                  : 'ค่าใช้จ่ายจริงขึ้นอยู่กับระยะสายไฟ ยี่ห้อเครื่องชาร์จ และสภาพระบบไฟเดิมของบ้าน ควรปรึกษาช่างไฟฟ้าที่ได้รับใบอนุญาตเสมอ'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-sky max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          การเตรียมตัวและค่าใช้จ่ายในการติดตั้งเครื่องชาร์จ EV ที่บ้าน
        </h2>
        <p>
          สำหรับผู้ที่เพิ่งตัดสินใจซื้อรถยนต์ไฟฟ้า (EV) สิ่งสำคัญอันดับต้นๆ ที่ต้องวางแผนคือ <strong>"การชาร์จรถที่บ้าน"</strong> (Home Charging) เพราะกว่า 80% ของการชาร์จรถ EV มักจะเกิดขึ้นที่บ้านในเวลากลางคืน การมีสถานีชาร์จหรือ EV Charger เป็นของตัวเอง จึงตอบโจทย์ทั้งความสะดวกสบายและความประหยัด แต่ก่อนที่จะติดตั้งได้นั้น บ้านของเราจำเป็นต้องได้รับการตรวจเช็กและปรับปรุงระบบไฟฟ้าเสียก่อน เพื่อความปลอดภัยสูงสุด
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4 ส่วนประกอบหลักของค่าใช้จ่ายในการติดตั้ง</h3>
        <p>
          การประเมินค่าใช้จ่ายในการติดตั้ง EV Charger สามารถแบ่งออกเป็น 4 ส่วนหลักๆ ได้แก่:
        </p>

        <ul className="list-disc pl-6 space-y-4 mb-4">
          <li>
            <strong>1. ค่าเครื่องชาร์จ (EV Charger Unit):</strong> 
            หรือที่เรียกเป็นทางการว่า Wallbox เครื่องชาร์จแบบ AC ที่ใช้ตามบ้านมักจะมีขนาด 7.4 kW (Single Phase) หรือ 11 kW / 22 kW (3-Phase) ราคาเฉพาะตัวเครื่องมักจะอยู่ที่ประมาณ 20,000 - 50,000 บาท ขึ้นอยู่กับยี่ห้อและฟังก์ชันสมาร์ท <em>(ข่าวดีคือ ค่ายรถยนต์ส่วนใหญ่มักจะแถมเครื่องชาร์จและฟรีค่าติดตั้งระยะมาตรฐานมาพร้อมกับการซื้อรถใหม่)</em>
          </li>
          
          <li>
            <strong>2. ค่าแรงติดตั้งและเดินสายไฟ (Labor & Cabling Cost):</strong> 
            การติดตั้งต้องเดินสายไฟใหม่แยกตรงจากตู้เมน (MDB) มายังจุดติดตั้งเครื่องชาร์จ ค่าใช้จ่ายส่วนนี้จะผันแปรตาม <strong>"ระยะทาง"</strong> ของสายไฟ หากจุดจอดรถอยู่ไกลจากตู้เมน หรือต้องร้อยท่อฝังดิน ค่าใช้จ่ายส่วนนี้จะสูงขึ้น (โดยปกติประมาณ 10,000 - 20,000 บาท)
          </li>

          <li>
            <strong>3. ค่าขอขยายมิเตอร์ หรือ เปลี่ยนเป็นมิเตอร์ TOU:</strong> 
            เพื่อรองรับการดึงกระแสไฟที่สูงขึ้นอย่างต่อเนื่อง (รถ EV มักดึงกระแสไฟ 32 แอมป์ ต่อเนื่องหลายชั่วโมง) การไฟฟ้า (กฟน. หรือ กฟภ.) แนะนำให้บ้านที่ใช้รถ EV ควรมีมิเตอร์ขนาดอย่างน้อย <strong>30(100) แอมป์</strong> หรือเปลี่ยนเป็นมิเตอร์ 3 เฟส 15(45) แอมป์ นอกจากนี้ การขอเปลี่ยนเป็นมิเตอร์แบบ <strong>TOU (Time of Use)</strong> เพื่อชาร์จไฟช่วงกลางคืนในราคาประหยัด จะมีค่าธรรมเนียมจากการไฟฟ้าอยู่ที่ประมาณ 3,000 - 7,000 บาท
          </li>

          <li>
            <strong>4. อุปกรณ์ป้องกันอันตราย (Breaker & Consumer Unit):</strong> 
            ตามมาตรฐานการติดตั้งระบบชาร์จยานยนต์ไฟฟ้า วงจรของเครื่องชาร์จ <strong>ต้องแยกอิสระจากวงจรอื่น</strong> และต้องติดตั้งเครื่องตัดไฟรั่ว (RCD) ชนิด Type B หรือ Type A + อุปกรณ์ตรวจจับ DC Leakage เพื่อป้องกันไฟฟ้ารั่วไหลที่เป็นอันตรายถึงชีวิต รวมถึงสายดิน (Ground) ที่ต้องตอกแท่งกราวด์แยกเฉพาะอีกด้วย ค่าอุปกรณ์ป้องกันในส่วนนี้มักจะอยู่ที่ 3,000 - 6,000 บาท
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">คำแนะนำเพื่อความปลอดภัยสูงสุด</h3>
        <p>
          ระบบไฟฟ้าของบ้านเป็นเรื่องละเอียดอ่อนและเกี่ยวข้องกับความปลอดภัยโดยตรง การติดตั้ง EV Charger ไม่ใช่แค่การเสียบปลั๊กไฟธรรมดา เพราะรถดึงไฟหนักมากและต่อเนื่องยาวนาน หากสายไฟขนาดเล็กเกินไป หรือจุดเชื่อมต่อหลวม อาจก่อให้เกิดความร้อนสะสมและเพลิงไหม้ได้ 
        </p>
        <p>
          ดังนั้น คุณควรเลือกใช้บริการจาก <strong>ช่างไฟฟ้าหรือบริษัทรับติดตั้งที่ผ่านการอบรมและได้รับใบรับรองการติดตั้งระบบชาร์จรถ EV เท่านั้น</strong> และควรเลือกเครื่องชาร์จที่ได้รับมาตรฐาน มอก. หรือมาตรฐานความปลอดภัยระดับสากล เพื่อให้คุณชาร์จรถทิ้งไว้ข้ามคืนได้อย่างหลับสนิทและไร้กังวล
        </p>
      </div>
    </div>
  );
}

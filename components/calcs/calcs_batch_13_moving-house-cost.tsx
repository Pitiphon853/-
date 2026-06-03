import React, { useState } from 'react';
import { Truck, Calculator, Package } from 'lucide-react';

export default function MovingHouseCost({ lang }: any) {
  const isTH = lang === 'TH';
  const [distanceKm, setDistanceKm] = useState<number>(20);
  const [truckType, setTruckType] = useState<string>('4wheel'); // 4wheel, 6wheel
  const [hasMovers, setHasMovers] = useState<boolean>(true);
  const [numMovers, setNumMovers] = useState<number>(2);
  const [packingBoxes, setPackingBoxes] = useState<number>(20);
  const [dismantleFee, setDismantleFee] = useState<number>(1500);

  // Constants
  const truckBaseRate = truckType === '4wheel' ? 800 : 2500;
  const truckPerKm = truckType === '4wheel' ? 15 : 30;
  const moverRate = 500;
  const boxRate = 50;

  const transportationCost = truckBaseRate + (distanceKm * truckPerKm);
  const moverCost = hasMovers ? numMovers * moverRate : 0;
  const packingCost = packingBoxes * boxRate;
  const totalCost = transportationCost + moverCost + packingCost + dismantleFee;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Truck className="w-8 h-8 text-orange-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'ประเมินค่าใช้จ่ายย้ายบ้าน' : 'Moving House Cost Calculator'}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ประเภทรถรับจ้าง' : 'Truck Type'}</label>
            <select 
              value={truckType} 
              onChange={(e) => setTruckType(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="4wheel">{isTH ? 'รถกระบะ 4 ล้อ (เหมาะกับหอพัก/คอนโด)' : '4-Wheel Pickup'}</option>
              <option value="6wheel">{isTH ? 'รถบรรทุก 6 ล้อ (เหมาะกับบ้าน/ของชิ้นใหญ่)' : '6-Wheel Truck'}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ระยะทางโดยประมาณ (กม.)' : 'Distance (km)'}</label>
            <input type="number" value={distanceKm} onChange={(e) => setDistanceKm(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <label className="flex items-center space-x-2 cursor-pointer mb-3">
              <input type="checkbox" checked={hasMovers} onChange={(e) => setHasMovers(e.target.checked)} className="rounded text-orange-600 focus:ring-orange-500" />
              <span className="font-medium text-gray-700">{isTH ? 'ต้องการพนักงานยกของ' : 'Need Movers'}</span>
            </label>
            {hasMovers && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">{isTH ? 'จำนวนคนยกของ (คน)' : 'Number of Movers'}</label>
                <input type="number" value={numMovers} onChange={(e) => setNumMovers(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'กล่องแพ็คของ (ใบ)' : 'Packing Boxes'}</label>
              <input type="number" value={packingBoxes} onChange={(e) => setPackingBoxes(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ค่าถอดประกอบแอร์/เฟอร์ฯ' : 'Dismantling Fee'}</label>
              <input type="number" value={dismantleFee} onChange={(e) => setDismantleFee(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
          <h2 className="text-xl font-semibold text-orange-900 mb-4">{isTH ? 'สรุปประเมินค่าใช้จ่าย' : 'Cost Estimation Summary'}</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'ค่ารถและระยะทาง' : 'Transport & Distance'}:</span>
              <span>฿{transportationCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'ค่าพนักงานยกของ' : 'Movers Fee'}:</span>
              <span>฿{moverCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'ค่ากล่อง/อุปกรณ์แพ็ค' : 'Packing Materials'}:</span>
              <span>฿{packingCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'ค่าถอดประกอบเฟอร์นิเจอร์' : 'Dismantling/Assembly'}:</span>
              <span>฿{dismantleFee.toLocaleString()}</span>
            </div>
            <div className="pt-4 mt-4 border-t border-orange-200">
              <div className="flex justify-between font-bold text-2xl text-orange-700">
                <span>{isTH ? 'ยอดรวมโดยประมาณ' : 'Estimated Total'}:</span>
                <span>฿{totalCost.toLocaleString()}</span>
              </div>
              <p className="text-xs text-orange-600 mt-2 text-right">
                {isTH ? '* เป็นการประเมินเบื้องต้น ราคาจริงขึ้นอยู่กับผู้ให้บริการ' : '* Rough estimate. Actual price depends on providers.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-10 prose prose-orange max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isTH ? 'เตรียมงบเท่าไหร่ดี? คู่มือประเมินค่าใช้จ่ายย้ายบ้านและคอนโด' : 'Planning Your Moving House Costs'}
        </h2>
        {isTH ? (
          <>
            <p>การย้ายที่อยู่อาศัย ไม่ว่าจะเป็นการย้ายหอพัก คอนโด หรือย้ายบ้านทั้งหลัง เป็นเรื่องที่ต้องใช้ทั้งแรงกายและงบประมาณ หลายคนมักกังวลว่าค่าใช้จ่ายจะบานปลาย บทความนี้จะชี้แจงองค์ประกอบหลักของค่าย้ายบ้าน เพื่อให้คุณเตรียมงบและต่อรองราคากับบริษัทรับจ้างย้ายบ้านได้อย่างเหมาะสม</p>
            <h3>1. ขนาดของรถรับจ้างและระยะทาง</h3>
            <p>ปัจจัยหลักที่สุดคือ "ประเภทรถ" หากคุณอยู่คอนโดหรือหอพักและมีของไม่มาก รถกระบะ 4 ล้อ (ทั้งแบบตู้ทึบหรือคอก) มักจะเพียงพอ โดยมีราคาเหมาเริ่มต้นที่หลักร้อยถึงพันต้นๆ แต่หากเป็นการย้ายบ้านที่มีเฟอร์นิเจอร์ชิ้นใหญ่ เช่น โซฟา ตู้เสื้อผ้า ตู้เย็นขนาดใหญ่ จำเป็นต้องใช้รถบรรทุก 6 ล้อ ซึ่งเริ่มต้นที่ประมาณ 2,500 - 3,500 บาท นอกจากนี้ระยะทางกิโลเมตรที่เพิ่มขึ้น จะถูกบวกเพิ่มตามเรทของแต่ละบริษัท</p>
            <h3>2. พนักงานยกของ (Movers)</h3>
            <p>การย้ายของชิ้นใหญ่เป็นเรื่องอันตรายหากทำเอง การจ้างพนักงานยกของจึงเป็นทางเลือกที่ดี อัตราค่าแรงมักตกอยู่ที่ 400 - 600 บาทต่อคน หากอยู่คอนโดที่ไม่มีลิฟต์ หรือบ้านที่มีหลายชั้น อาจต้องเพิ่มจำนวนคนเพื่อความรวดเร็วและป้องกันของเสียหาย</p>
            <h3>3. ค่าอุปกรณ์แพ็คของและกล่องกระดาษ</h3>
            <p>อย่ามองข้ามค่ากล่องลูกฟูก บับเบิ้ลกันกระแทก และเทปกาว หากคุณแพ็คของเองอาจจะควบคุมงบส่วนนี้ได้ แต่หากใช้บริการแพ็คของจากบริษัท จะมีการคิดค่าบริการเพิ่มเติมทั้งค่าแรงและค่าวัสดุ</p>
            <h3>4. ค่าถอดและประกอบ (Dismantling & Assembly)</h3>
            <p>เฟอร์นิเจอร์บางชิ้น เช่น ตู้เสื้อผ้าแบรนด์เนม เตียงนอน หรือเครื่องปรับอากาศ (แอร์) ไม่สามารถยกไปทั้งชิ้นได้ ต้องอาศัยช่างผู้เชี่ยวชาญในการถอดและไปประกอบใหม่ที่ปลายทาง ซึ่งจะมีค่าบริการเสริมแยกต่างหาก</p>
            <h3>สรุป</h3>
            <p>การวางแผนและประเมินค่าใช้จ่ายล่วงหน้าผ่านเครื่องคำนวณค่าย้ายบ้าน จะช่วยให้คุณคัดกรองสิ่งของที่ไม่จำเป็นออกไปได้บ้าง (เคลียร์ของก่อนย้าย) เพื่อประหยัดพื้นที่รถและลดแรงงานคนยก ทำให้การย้ายเข้าสู่บ้านใหม่ของคุณราบรื่นและคุมงบได้อยู่หมัด</p>
          </>
        ) : (
          <p>Moving house involves multiple cost factors including transportation distance, vehicle size, manual labor, packing materials, and dismantling/assembly fees for large furniture or appliances. Using a 4-wheel pickup is cost-effective for small condos, while a 6-wheel truck is necessary for full house relocations. Use our tool to estimate your total moving budget and avoid unexpected expenses on moving day.</p>
        )}
      </article>
    </div>
  );
}

import React, { useState } from 'react';
import { Car, Calculator, BatteryCharging, MapPin, Zap, Info } from 'lucide-react';

export default function EVChargingCost({ lang }: any) {
  const [batteryCapacity, setBatteryCapacity] = useState<number>(60); // kWh
  const [range, setRange] = useState<number>(400); // km per full charge
  const [electricityRate, setElectricityRate] = useState<number>(5.0); // Baht/kWh

  // Calculations
  const costPerFullCharge = batteryCapacity * electricityRate;
  const costPerKm = costPerFullCharge / range;
  const costPer100Km = costPerKm * 100;
  const energyEfficiency = (batteryCapacity / range) * 100; // kWh per 100km

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
          <Car size={28} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {lang === 'EN' ? 'EV Charging Cost Calculator' : 'โปรแกรมคำนวณต้นทุนการชาร์จรถ EV'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5 bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-100">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Battery Capacity (kWh)' : 'ความจุแบตเตอรี่ (kWh)'}
            </label>
            <input
              type="number"
              min="1"
              value={batteryCapacity}
              onChange={(e) => setBatteryCapacity(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Estimated Range per Full Charge (km)' : 'ระยะทางที่วิ่งได้ต่อการชาร์จเต็ม (กิโลเมตร)'}
            </label>
            <input
              type="number"
              min="1"
              value={range}
              onChange={(e) => setRange(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Electricity Rate (Baht/kWh)' : 'อัตราค่าไฟฟ้า (บาท/หน่วย)'}
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={electricityRate}
              onChange={(e) => setElectricityRate(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">
              {lang === 'EN' 
                ? 'Tip: TOU meter rates at night can be as low as 2.6 Baht/kWh.' 
                : 'คำแนะนำ: หากใช้มิเตอร์ TOU ชาร์จช่วงกลางคืน (Off-Peak) ค่าไฟอาจเหลือเพียง ~2.6 บาท/หน่วย'}
            </p>
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calculator size={24} />
              {lang === 'EN' ? 'Cost & Efficiency Results' : 'ผลลัพธ์ค่าใช้จ่ายและประสิทธิภาพ'}
            </h2>
            
            <div className="space-y-4">
              
              <div className="bg-white/10 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BatteryCharging size={20} className="text-indigo-200" />
                  <span>{lang === 'EN' ? 'Cost per Full Charge (0-100%)' : 'ค่าไฟชาร์จเต็ม (0-100%)'}</span>
                </div>
                <div className="text-lg font-semibold text-right">
                  {costPerFullCharge.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-sm font-normal">฿</span>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap size={20} className="text-yellow-300" />
                  <span>{lang === 'EN' ? 'Energy Efficiency' : 'อัตราการสิ้นเปลืองพลังงาน'}</span>
                </div>
                <div className="text-lg font-semibold text-right">
                  {energyEfficiency.toLocaleString(undefined, { maximumFractionDigits: 1 })} <span className="text-sm font-normal">kWh/100km</span>
                </div>
              </div>

              <div className="bg-white/20 p-4 rounded-lg flex flex-col items-center border border-indigo-300/50 mt-2 py-5">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={20} className="text-indigo-100" />
                  <span className="font-semibold text-indigo-100">
                    {lang === 'EN' ? 'Driving Cost per 100 km' : 'ค่าใช้จ่ายในการวิ่ง 100 กิโลเมตร'}
                  </span>
                </div>
                <div className="text-4xl font-extrabold text-white text-center">
                  {costPer100Km.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-base font-normal">฿</span>
                </div>
                <div className="mt-2 text-sm text-indigo-200 bg-black/20 px-3 py-1 rounded-full">
                  {lang === 'EN' ? 'or' : 'หรือ'} {costPerKm.toFixed(2)} {lang === 'EN' ? 'Baht/km' : 'บาท/กิโลเมตร'}
                </div>
              </div>

            </div>
            
            <div className="mt-4 text-xs text-indigo-100 flex items-start gap-2">
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <p>
                {lang === 'EN'
                  ? 'Real-world range and efficiency depend on driving habits, AC usage, weather, and charging loss (typically ~10% loss during AC charging).'
                  : 'ระยะทางจริงขึ้นอยู่กับพฤติกรรมการขับขี่ การใช้แอร์ สภาพอากาศ และการสูญเสียพลังงานระหว่างชาร์จ (มักจะสูญเสียราว 10% สำหรับการชาร์จแบบ AC)'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-indigo max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ทำไมรถยนต์ไฟฟ้า (EV) ถึงช่วยคุณประหยัดเงินได้มากกว่าที่คิด?
        </h2>
        <p>
          ในยุคที่ราคาน้ำมันเชื้อเพลิงมีความผันผวนและมีแนวโน้มปรับตัวสูงขึ้นอย่างต่อเนื่อง รถยนต์พลังงานไฟฟ้า 100% หรือ <strong>EV (Electric Vehicle)</strong> ได้กลายมาเป็นกระแสหลักที่ผู้คนให้ความสนใจ ไม่เพียงแต่ช่วยลดการปล่อยมลพิษทางอากาศ แต่เหตุผลหลักที่ดึงดูดผู้ใช้งานจำนวนมากคือ <strong>"ค่าใช้จ่ายในการเดินทางที่ถูกกว่ารถยนต์สันดาปอย่างเห็นได้ชัด"</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เข้าใจหน่วยวัดของรถ EV</h3>
        <p>
          หากเราคุ้นเคยกับรถน้ำมันที่วัดความจุถังน้ำมันเป็น "ลิตร" และวัดอัตราสิ้นเปลืองเป็น "กิโลเมตร/ลิตร" สำหรับรถ EV เราจะใช้หน่วยดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ความจุแบตเตอรี่ (Battery Capacity):</strong> วัดเป็นหน่วย กิโลวัตต์-ชั่วโมง (kWh) เปรียบเสมือนขนาดของถังน้ำมัน รถ EV ทั่วไปในตลาดมักมีความจุตั้งแต่ 40 kWh ไปจนถึง 90+ kWh</li>
          <li><strong>อัตราสิ้นเปลืองพลังงาน (Energy Efficiency):</strong> มักจะระบุเป็น "กิโลวัตต์-ชั่วโมง ต่อ 100 กิโลเมตร (kWh/100km)" ยิ่งตัวเลขนี้ต่ำ แปลว่ารถวิ่งได้ประหยัดไฟมาก</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีคำนวณต้นทุนการชาร์จ</h3>
        <p>
          การคำนวณค่าไฟสำหรับการชาร์จรถ EV นั้นง่ายมาก เพียงแค่นำ <strong>ขนาดความจุแบตเตอรี่</strong> คูณด้วย <strong>อัตราค่าไฟฟ้าต่อหน่วย</strong> 
        </p>
        <p>
          <em>ตัวอย่างเช่น:</em> รถ EV แบตเตอรี่ขนาด 60 kWh ชาร์จไฟบ้านปกติเรตหน่วยละ 5 บาท การชาร์จจาก 0-100% จะเสียค่าไฟประมาณ 300 บาท หากรถคันนี้วิ่งได้ระยะทาง 400 กิโลเมตรต่อการชาร์จเต็ม จะตกกิโลเมตรละ (300 / 400) = <strong>0.75 บาท/กิโลเมตร</strong> หรือ 75 บาท ต่อระยะทาง 100 กิโลเมตร ซึ่งถูกกว่ารถยนต์น้ำมันทั่วไป (ที่มักตกกิโลเมตรละ 2-3 บาท) หลายเท่าตัว!
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เคล็ดลับการชาร์จให้ประหยัดยิ่งขึ้นด้วยมิเตอร์ TOU</h3>
        <p>
          จุดเด่นสำคัญของการใช้รถ EV ในประเทศไทยคือ การขอเปลี่ยนมิเตอร์ไฟฟ้าที่บ้านเป็นแบบ <strong>TOU (Time of Use)</strong> ซึ่งจะคิดค่าไฟในอัตราที่ต่างกันตามช่วงเวลา:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ช่วง Peak (จันทร์-ศุกร์ 09:00 - 22:00 น.):</strong> ค่าไฟจะแพงกว่าปกติ (ประมาณ 5.2 - 5.8 บาท/หน่วย)</li>
          <li><strong>ช่วง Off-Peak (หลัง 22:00 น. จนถึงเช้า และตลอดวันหยุดเสาร์-อาทิตย์):</strong> ค่าไฟจะถูกลงเหลือเพียง <strong>ประมาณ 2.6 บาท/หน่วย</strong></li>
        </ul>
        <p>
          หากคุณเสียบสายชาร์จทิ้งไว้ข้ามคืนในช่วง Off-Peak ต้นทุนการวิ่งของคุณจะลดลงเหลือเพียง <strong>กิโลเมตรละประมาณ 0.3 - 0.5 บาทเท่านั้น!</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ข้อควรระวังในการประเมินระยะทาง</h3>
        <p>
          เช่นเดียวกับรถน้ำมัน ตัวเลขระยะทางวิ่งที่ระบุจากสเปกโรงงาน (เช่น มาตรฐาน NEDC หรือ WLTP) มักจะสูงกว่าการใช้งานจริงเล็กน้อย เนื่องจากสภาพการขับขี่จริงบนท้องถนน มีทั้งการเร่งแซง การเปิดเครื่องปรับอากาศสู้กับอากาศร้อนจัด และพฤติกรรมการเหยียบเบรก ล้วนส่งผลต่อการกินไฟของแบตเตอรี่ทั้งสิ้น นอกจากนี้ในกระบวนการแปลงกระแสไฟ AC จากไฟบ้านเข้าสู่แบตเตอรี่รถ อาจมีการสูญเสียพลังงาน (Charging Loss) ประมาณ 10% ซึ่งโปรแกรมจำลองเบื้องต้นอาจยังไม่ได้รวมปัจจัยยิบย่อยเหล่านี้ไว้ทั้งหมด แต่ก็เพียงพอให้เห็นภาพรวมที่ชัดเจนของความคุ้มค่า
        </p>
        <p>
          การหันมาใช้รถ EV นอกจากจะดีต่อเงินในกระเป๋าของคุณในระยะยาวแล้ว ยังเป็นส่วนสำคัญในการช่วยประเทศลดการนำเข้าน้ำมันดิบ และผลักดันสังคมไปสู่การเดินทางที่ปราศจากมลพิษ (Zero Emission) อย่างแท้จริง
        </p>
      </div>
    </div>
  );
}

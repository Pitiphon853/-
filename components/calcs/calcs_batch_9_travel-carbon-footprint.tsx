import React, { useState } from 'react';
import { Car, Train, Plane, Bus, Calculator, RotateCcw, Leaf } from 'lucide-react';

export default function TravelCarbonFootprint({ lang }: { lang: 'TH' | 'EN' }) {
  const [distance, setDistance] = useState<number | ''>(100);
  const [vehicle, setVehicle] = useState<string>('car_petrol');

  const t = {
    title: lang === 'TH' ? 'คำนวณคาร์บอนฟุตพริ้นท์การเดินทาง' : 'Travel Carbon Footprint Calculator',
    distance: lang === 'TH' ? 'ระยะทาง (กิโลเมตร)' : 'Distance (km)',
    vehicle: lang === 'TH' ? 'ประเภทพาหนะ' : 'Vehicle Type',
    calculate: lang === 'TH' ? 'คำนวณ' : 'Calculate',
    reset: lang === 'TH' ? 'เริ่มใหม่' : 'Reset',
    result: lang === 'TH' ? 'ปริมาณคาร์บอนที่ปล่อย (kg CO2e)' : 'Carbon Emissions (kg CO2e)',
    treeEquivalent: lang === 'TH' ? 'เทียบเท่าต้นไม้ดูดซับคาร์บอน 1 ปี' : 'Tree absorption eq. (trees/year)',
    treeUnit: lang === 'TH' ? 'ต้น' : 'trees',
    vehicles: {
      car_petrol: lang === 'TH' ? 'รถยนต์ส่วนบุคคล (เบนซิน)' : 'Car (Petrol)',
      car_diesel: lang === 'TH' ? 'รถยนต์ส่วนบุคคล (ดีเซล)' : 'Car (Diesel)',
      car_ev: lang === 'TH' ? 'รถยนต์ไฟฟ้า (EV)' : 'Electric Vehicle (EV)',
      bus: lang === 'TH' ? 'รถประจำทาง / รถทัวร์' : 'Bus / Coach',
      train: lang === 'TH' ? 'รถไฟฟ้า (BTS/MRT/รถไฟ)' : 'Train / Subway',
      plane: lang === 'TH' ? 'เครื่องบิน (เที่ยวบินในประเทศ)' : 'Airplane (Domestic)',
    }
  };

  // Emission factors kg CO2e per passenger-km (approximate values for general education)
  const emissionFactors: Record<string, number> = {
    car_petrol: 0.19,
    car_diesel: 0.17,
    car_ev: 0.05, // Accounts for grid electricity generation
    bus: 0.10,
    train: 0.04,
    plane: 0.25,
  };

  const getVehicleIcon = (type: string) => {
    if (type.includes('car')) return <Car className="w-5 h-5 text-gray-500" />;
    if (type.includes('bus')) return <Bus className="w-5 h-5 text-gray-500" />;
    if (type.includes('train')) return <Train className="w-5 h-5 text-gray-500" />;
    if (type.includes('plane')) return <Plane className="w-5 h-5 text-gray-500" />;
    return <Car className="w-5 h-5 text-gray-500" />;
  };

  const emissions = (Number(distance) || 0) * emissionFactors[vehicle];
  // 1 tree absorbs ~21 kg CO2 per year
  const trees = emissions / 21;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-100 rounded-lg">
            <Leaf className="w-6 h-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.distance}
              </label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                min="0"
                placeholder="100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.vehicle}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {getVehicleIcon(vehicle)}
                </div>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white"
                >
                  {Object.entries(t.vehicles).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                setDistance(100);
                setVehicle('car_petrol');
              }}
              className="w-full mt-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t.reset}
            </button>
          </div>

          <div className="bg-emerald-50 rounded-xl p-6 flex flex-col justify-center items-center text-center space-y-6 border border-emerald-100">
            <div className="w-full">
              <p className="text-emerald-800 text-sm font-medium mb-2">{t.result}</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-emerald-600">
                  {emissions.toLocaleString('en-US', { maximumFractionDigits: 1 })}
                </span>
                <span className="text-lg text-emerald-700 font-medium">kg</span>
              </div>
            </div>
            
            {emissions > 0 && (
              <div className="w-full pt-4 border-t border-emerald-200/60">
                <p className="text-gray-600 text-sm mb-2">{t.treeEquivalent}</p>
                <div className="flex items-center justify-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span className="text-2xl font-bold text-gray-800">
                    {Math.ceil(trees)}
                  </span>
                  <span className="text-gray-600">{t.treeUnit}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose prose-emerald max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {lang === 'TH' ? 'ทำความรู้จักคาร์บอนฟุตพริ้นท์การเดินทาง (Travel Carbon Footprint)' : 'Understanding Your Travel Carbon Footprint'}
        </h2>
        
        {lang === 'TH' ? (
          <>
            <p>
              ในยุคที่ปัญหาโลกร้อน (Global Warming) และการเปลี่ยนแปลงสภาพภูมิอากาศ (Climate Change) ทวีความรุนแรงขึ้น คำว่า <strong>"คาร์บอนฟุตพริ้นท์" (Carbon Footprint)</strong> ได้กลายเป็นมาตรวัดสำคัญที่บอกว่ากิจกรรมในชีวิตประจำวันของเรา ปล่อยก๊าซเรือนกระจกสู่ชั้นบรรยากาศมากน้อยเพียงใด และหนึ่งในกิจกรรมที่ปล่อยก๊าซคาร์บอนไดออกไซด์ (CO2) มากที่สุดคือ <strong>"การเดินทาง"</strong>
            </p>

            <h3>การเดินทางแต่ละประเภท สร้างมลพิษต่างกันอย่างไร?</h3>
            <p>
              ยานพาหนะแต่ละชนิดมีการใช้เชื้อเพลิงและประสิทธิภาพในการขนส่งผู้โดยสารที่แตกต่างกัน การเลือกวิธีเดินทางจึงส่งผลโดยตรงต่อปริมาณก๊าซ CO2 ที่ปล่อยออกมา (คิดเป็นหน่วย กิโลกรัมคาร์บอนไดออกไซด์เทียบเท่า ต่อผู้โดยสาร 1 กิโลเมตร หรือ kg CO2e/pkm):
            </p>
            <ul>
              <li><strong>เครื่องบิน:</strong> มีอัตราการปล่อยคาร์บอนสูงสุด โดยเฉพาะช่วง Take-off และ Landing การบินระยะสั้นจึงมีรอยเท้าคาร์บอนต่อกิโลเมตรสูงกว่าการบินข้ามทวีป</li>
              <li><strong>รถยนต์ส่วนบุคคลนั่งคนเดียว:</strong> ปล่อยคาร์บอนสูงมากต่อหัว เนื่องจากเผาผลาญน้ำมันฟอสซิล (เบนซิน/ดีเซล) เพื่อขับเคลื่อนน้ำหนักรถทั้งคันเพื่อคนๆ เดียว</li>
              <li><strong>รถยนต์ไฟฟ้า (EV):</strong> ไม่มีการปล่อยไอเสียที่ปลายท่อ (Zero Tailpipe Emission) แต่ยังมีคาร์บอนแฝงจากกระบวนการผลิตไฟฟ้าที่นำมาชาร์จ (ขึ้นอยู่กับสัดส่วนพลังงานสะอาดของประเทศนั้นๆ)</li>
              <li><strong>ระบบขนส่งสาธารณะ (รถไฟ/รถไฟฟ้า/รถบัส):</strong> เป็นทางเลือกที่เป็นมิตรต่อสิ่งแวดล้อมมากที่สุด เนื่องจากสามารถหารเฉลี่ยการปล่อยคาร์บอนให้กับผู้โดยสารจำนวนมากในคราวเดียวกัน รถไฟฟ้ามักมีคาร์บอนฟุตพริ้นท์ต่ำที่สุด</li>
            </ul>

            <h3>ต้นไม้กับการดูดซับคาร์บอน</h3>
            <p>
              เพื่อช่วยให้เห็นภาพที่ชัดเจนขึ้น เรามักเปรียบเทียบการปล่อยคาร์บอนกับความสามารถในการดูดซับของต้นไม้ โดยเฉลี่ย <strong>ต้นไม้ยืนต้น 1 ต้น สามารถดูดซับก๊าซ CO2 ได้ประมาณ 9 - 21 กิโลกรัมต่อปี</strong> (ขึ้นอยู่กับชนิดพืชและช่วงอายุ) 
            </p>
            <p>
              ดังนั้น หากคุณขับรถยนต์เบนซินระยะทาง 100 กิโลเมตร ปล่อยคาร์บอนประมาณ 19 กิโลกรัม นั่นหมายความว่าคุณต้องการต้นไม้ 1 ต้น เติบโตเป็นเวลา 1 ปีเต็ม เพื่อดูดซับมลพิษจากการเดินทางเพียงทริปเดียวของคุณ!
            </p>

            <h3>วิธีง่ายๆ ในการลด Travel Carbon Footprint</h3>
            <ol>
              <li><strong>Carpooling ทางเดียวกันไปด้วยกัน:</strong> การเพิ่มผู้โดยสารในรถยนต์จาก 1 คน เป็น 2 คน ช่วยลดคาร์บอนฟุตพริ้นท์ต่อหัวลงได้ถึงครึ่งหนึ่ง</li>
              <li><strong>ใช้ระบบขนส่งสาธารณะ:</strong> เปลี่ยนจากรถยนต์มานั่งรถไฟฟ้าหรือรถบัสสัปดาห์ละ 1-2 วัน</li>
              <li><strong>การประชุมออนไลน์:</strong> ลดการเดินทางติดต่อธุรกิจข้ามจังหวัดหรือข้ามประเทศด้วยการ Video Conference</li>
              <li><strong>Active Transport:</strong> สำหรับระยะทางใกล้ๆ การเดิน หรือปั่นจักรยาน ถือเป็นการเดินทางแบบ Zero Carbon อย่างแท้จริง พร้อมได้สุขภาพที่ดีด้วย</li>
            </ol>
            <p>
              ใช้ <em>เครื่องคำนวณคาร์บอนฟุตพริ้นท์การเดินทาง</em> ของเรา เพื่อสร้างความตระหนักรู้และร่วมเป็นส่วนหนึ่งในการลดภาระให้กับโลกใบนี้!
            </p>
          </>
        ) : (
          <>
            <p>
              As global warming and climate change accelerate, the term <strong>"Carbon Footprint"</strong> has become a crucial metric for understanding how our daily activities impact the atmosphere. Among these activities, <strong>transportation and travel</strong> are consistently ranked as some of the highest contributors to personal greenhouse gas emissions.
            </p>

            <h3>How Different Modes of Transport Impact the Planet</h3>
            <p>
              Not all vehicles are created equal. The efficiency of a vehicle and how many passengers it carries directly determines its emissions per passenger-kilometer (kg CO2e/pkm):
            </p>
            <ul>
              <li><strong>Airplanes:</strong> Flying, especially short domestic flights, produces the highest emissions per passenger. The massive fuel burn required for take-off and landing is distributed over a shorter distance.</li>
              <li><strong>Single-Occupancy Cars (Petrol/Diesel):</strong> Driving a conventional combustion-engine car alone has a massive footprint because the engine burns fossil fuels to move heavy steel just to transport one person.</li>
              <li><strong>Electric Vehicles (EVs):</strong> While they produce zero tailpipe emissions, they still have a carbon footprint associated with the electricity grid that charges them. However, they are significantly cleaner than fossil-fuel cars.</li>
              <li><strong>Public Transit (Trains/Buses):</strong> These are the most eco-friendly options. The emissions of a massive engine are divided among dozens or hundreds of passengers. Electric trains and subways typically have the lowest carbon footprint of all motorized transport.</li>
            </ul>

            <h3>The Tree Absorption Equivalent</h3>
            <p>
              To make carbon emissions easier to visualize, we often compare them to the carbon sequestration capability of trees. On average, <strong>a mature tree absorbs about 21 kg of CO2 per year</strong>.
            </p>
            <p>
              Therefore, if a 100 km trip in a petrol car emits around 19 kg of CO2, it requires one full tree working for an entire year just to offset that single journey!
            </p>

            <h3>Simple Ways to Reduce Your Travel Carbon Footprint</h3>
            <ol>
              <li><strong>Carpooling:</strong> Simply adding one more passenger to your car cuts the per-person carbon footprint in half.</li>
              <li><strong>Embrace Public Transit:</strong> Swapping a car commute for the train or bus just 1 or 2 days a week makes a massive difference over a year.</li>
              <li><strong>Virtual Meetings:</strong> Replace cross-country business flights with video conferencing whenever possible.</li>
              <li><strong>Active Transport:</strong> For short distances, walking or cycling is true Zero-Carbon travel, with added health benefits.</li>
            </ol>
            <p>
              Use our <em>Travel Carbon Footprint Calculator</em> before planning your next trip to make conscious, planet-friendly decisions!
            </p>
          </>
        )}
      </article>
    </div>
  );
}

import React, { useState } from 'react';
import { Utensils, Droplets, Wind, Car, Droplet } from 'lucide-react';

export default function DietEnvironment({ lang = 'TH' }: any) {
  const isTH = lang === 'TH';

  // Servings per week (1 serving ~ 100g-150g)
  const [beef, setBeef] = useState<number>(2);
  const [pork, setPork] = useState<number>(4);
  const [poultry, setPoultry] = useState<number>(5);
  const [fish, setFish] = useState<number>(3);
  const [dairyEggs, setDairyEggs] = useState<number>(7);
  const [plantBased, setPlantBased] = useState<number>(3);

  // Approximate impact per serving
  // CO2 in kg, Water in Liters
  const impactData = {
    beef: { co2: 6.0, water: 1500 },
    pork: { co2: 1.2, water: 600 },
    poultry: { co2: 0.8, water: 430 },
    fish: { co2: 1.0, water: 300 },
    dairyEggs: { co2: 0.8, water: 400 },
    plantBased: { co2: 0.2, water: 150 }
  };

  const calculateImpact = () => {
    // Weekly impact
    let weeklyCo2 = 
      beef * impactData.beef.co2 +
      pork * impactData.pork.co2 +
      poultry * impactData.poultry.co2 +
      fish * impactData.fish.co2 +
      dairyEggs * impactData.dairyEggs.co2 +
      plantBased * impactData.plantBased.co2;
      
    let weeklyWater = 
      beef * impactData.beef.water +
      pork * impactData.pork.water +
      poultry * impactData.poultry.water +
      fish * impactData.fish.water +
      dairyEggs * impactData.dairyEggs.water +
      plantBased * impactData.plantBased.water;

    // Yearly impact
    const yearlyCo2 = weeklyCo2 * 52;
    const yearlyWater = weeklyWater * 52;

    // Equivalencies
    // Avg petrol car emits ~0.12 kg CO2 per km
    const drivingKm = yearlyCo2 / 0.12;
    // Avg 10-min shower uses ~80 liters of water
    const showers = yearlyWater / 80;

    return {
      yearlyCo2: Math.round(yearlyCo2),
      yearlyWater: Math.round(yearlyWater),
      drivingKm: Math.round(drivingKm),
      showers: Math.round(showers)
    };
  };

  const results = calculateImpact();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <Utensils className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isTH ? "เครื่องคำนวณผลกระทบต่อสิ่งแวดล้อมจากอาหาร" : "Diet Environmental Impact"}
            </h1>
            <p className="text-gray-500 mt-1">
              {isTH ? "คำนวณรอยเท้าคาร์บอน (Carbon Footprint) และการใช้น้ำจากพฤติกรรมการกินของคุณ" : "Calculate the carbon and water footprint of your dietary choices."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="font-semibold text-gray-800">
              {isTH ? "จำนวนมื้อ/จาน ที่คุณทานต่อสัปดาห์ (โดยประมาณ)" : "Servings per week (Approx. 100-150g per serving)"}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isTH ? "เนื้อวัว/เนื้อแกะ" : "Beef / Mutton"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={beef}
                  onChange={(e) => setBeef(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isTH ? "เนื้อหมู" : "Pork"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={pork}
                  onChange={(e) => setPork(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isTH ? "เนื้อไก่/เป็ด" : "Poultry"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={poultry}
                  onChange={(e) => setPoultry(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isTH ? "ปลา/อาหารทะเล" : "Fish / Seafood"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={fish}
                  onChange={(e) => setFish(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isTH ? "ไข่/ผลิตภัณฑ์นม" : "Eggs / Dairy"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={dairyEggs}
                  onChange={(e) => setDairyEggs(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isTH ? "โปรตีนพืช (เต้าหู้/ถั่ว)" : "Plant-based Protein"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={plantBased}
                  onChange={(e) => setPlantBased(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 border border-green-100 flex flex-col justify-center">
            <h2 className="text-xl font-bold text-green-900 mb-6 border-b border-green-200 pb-4">
              {isTH ? "ผลกระทบต่อปีของคุณ" : "Your Yearly Impact"}
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white text-gray-700 rounded-lg shrink-0 mt-1 shadow-sm">
                  <Wind className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-green-800">{isTH ? "ปริมาณก๊าซเรือนกระจก (CO2e)" : "Greenhouse Gas Emissions (CO2e)"}</p>
                  <p className="text-2xl font-black text-gray-900">{results.yearlyCo2.toLocaleString()} <span className="text-lg font-medium text-gray-500">kg</span></p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Car className="w-3 h-3" /> {isTH ? `เทียบเท่ากับการขับรถ ${results.drivingKm.toLocaleString()} กิโลเมตร` : `Equivalent to driving ${results.drivingKm.toLocaleString()} km`}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-white text-blue-500 rounded-lg shrink-0 mt-1 shadow-sm">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-green-800">{isTH ? "ปริมาณการใช้น้ำ (Water Footprint)" : "Water Footprint"}</p>
                  <p className="text-2xl font-black text-gray-900">{results.yearlyWater.toLocaleString()} <span className="text-lg font-medium text-gray-500">{isTH ? "ลิตร" : "Liters"}</span></p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Droplet className="w-3 h-3" /> {isTH ? `เทียบเท่ากับการอาบน้ำ ${results.showers.toLocaleString()} ครั้ง` : `Equivalent to taking ${results.showers.toLocaleString()} showers`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="prose prose-green max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2>มื้ออาหารของคุณ ส่งผลต่อโลกใบนี้อย่างไร?</h2>
          <p>
            เรามักได้ยินแคมเปญรณรงค์ให้ลดการใช้พลาสติก ปิดไฟเมื่อไม่ใช้ หรือใช้ถุงผ้าเพื่อช่วยโลก ซึ่งทั้งหมดนั้นเป็นสิ่งที่ดีมาก แต่คุณรู้หรือไม่ว่า หนึ่งในปัจจัยที่ส่งผลกระทบต่อสิ่งแวดล้อมมากที่สุดกลับอยู่บนจานอาหารของเรานี่เอง!
          </p>

          <h3>ทำไม "เนื้อสัตว์" ถึงทำร้ายโลก?</h3>
          <p>
            อุตสาหกรรมปศุสัตว์เป็นหนึ่งในแหล่งปล่อยก๊าซเรือนกระจกที่ใหญ่ที่สุดในโลก โดยเฉพาะสัตว์เคี้ยวเอื้องอย่าง <strong>"วัว" และ "แกะ"</strong> 
            กระบวนการย่อยอาหารของสัตว์เหล่านี้จะปล่อยก๊าซมีเทน (Methane) ซึ่งเป็นก๊าซเรือนกระจกที่มีความรุนแรงกว่าคาร์บอนไดออกไซด์ (CO2) ถึง 28 เท่าเมื่อเทียบในระยะเวลา 100 ปี
          </p>
          <p>
            นอกจากเรื่องก๊าซเรือนกระจกแล้ว การผลิตเนื้อสัตว์ยังใช้น้ำมหาศาล (Water Footprint) คุณอาจแปลกใจถ้ารู้ว่า เนื้อวัว 1 กิโลกรัม ต้องใช้น้ำในการผลิตเฉลี่ยถึง 15,000 ลิตร! น้ำเหล่านี้ไม่ได้มาจากวัวดื่มเพียงอย่างเดียว แต่ส่วนใหญ่หมดไปกับการปลูกพืชอาหารสัตว์ (เช่น ข้าวโพด ถั่วเหลือง) ที่ต้องนำมาเลี้ยงพวกมันเป็นเวลานานนับปีกว่าจะได้ขนาดที่พร้อมส่งโรงฆ่าสัตว์
          </p>

          <h3>Plant-based Diet ทางเลือกที่โลกยิ้ม</h3>
          <p>
            เมื่อเปรียบเทียบกันแล้ว การผลิตโปรตีนจากพืช เช่น เต้าหู้ ถั่ว หรือโปรตีนเกษตร ปล่อยคาร์บอนฟุตพริ้นท์น้อยกว่าเนื้อวัวถึง 10-50 เท่า และใช้น้ำน้อยกว่ามาก เนื่องจากเราสามารถนำพืชเหล่านั้นมาบริโภคได้โดยตรง ไม่ต้องผ่านกระบวนการแปลงพืชให้เป็นเนื้อสัตว์ที่สูญเสียพลังงานและทรัพยากรไประหว่างทางมหาศาล
          </p>

          <h3>ไม่ต้องเป็นวีแกน (Vegan) ก็ช่วยโลกได้</h3>
          <p>
            หลายคนคิดว่าถ้าอยากช่วยโลกเรื่องอาหาร ต้องเลิกกินเนื้อสัตว์อย่างเด็ดขาด ซึ่งอาจฟังดูเป็นเรื่องยากและฝืนไลฟ์สไตล์เกินไป แต่ความจริงแล้ว คุณสามารถสร้างความเปลี่ยนแปลงที่ยิ่งใหญ่ได้ด้วยวิธีง่ายๆ ที่เรียกว่า <strong>"Flexitarian"</strong> หรือการกินมังสวิรัติแบบยืดหยุ่น:
          </p>
          <ul>
            <li><strong>Meatless Monday:</strong> งดทานเนื้อสัตว์แค่ 1 วันต่อสัปดาห์ หากคน 1 คนทำสิ่งนี้ จะสามารถประหยัดน้ำได้นับหมื่นลิตรต่อปี และลดคาร์บอนได้เทียบเท่ากับการไม่ขับรถหลายร้อยกิโลเมตร</li>
            <li><strong>เปลี่ยนชนิดของเนื้อสัตว์:</strong> หากคุณยังอยากทานเนื้อ ลองเปลี่ยนจาก "เนื้อวัว" มาเป็น "เนื้อไก่ หรือ หมู" เพราะสัตว์ปีกและสุกรมีวงจรชีวิตที่สั้นกว่าและกินอาหารน้อยกว่า จึงมีรอยเท้าคาร์บอนและการใช้น้ำที่ต่ำกว่าวัวอย่างเห็นได้ชัด</li>
            <li><strong>ลดขยะอาหาร (Food Waste):</strong> นอกจากการเลือกชนิดอาหารแล้ว การทานให้หมดจานและไม่ทิ้งขยะอาหาร ก็เป็นอีกหนึ่งวิธีสำคัญ เพราะอาหารที่ถูกทิ้งในหลุมฝังกลบจะเน่าเสียและปล่อยก๊าซมีเทนสู่ชั้นบรรยากาศเช่นกัน</li>
          </ul>

          <h3>สรุป</h3>
          <p>
            ทุกๆ คำที่คุณเลือกตักเข้าปาก ไม่ได้ส่งผลต่อสุขภาพร่างกายของคุณเพียงอย่างเดียว แต่ยังส่งผลถึงสุขภาพของโลกใบนี้ด้วย เครื่องคำนวณรอยเท้าคาร์บอนจากอาหารนี้ ทำหน้าที่เป็นเพียงกระจกสะท้อนให้เห็นว่าพฤติกรรมการกินของเราใช้ทรัพยากรโลกไปเท่าไร ลองปรับลดเนื้อสัตว์ลงนิด เพิ่มผักขึ้นหน่อย คุณอาจจะค้นพบเมนูใหม่ๆ ที่อร่อย ดีต่อสุขภาพ และดีต่อโลกไปพร้อมๆ กัน
          </p>
        </article>
      )}
    </div>
  );
}

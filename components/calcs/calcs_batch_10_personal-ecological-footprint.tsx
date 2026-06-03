import React, { useState } from 'react';
import { Globe, Calculator, Footprints, AlertCircle, Info } from 'lucide-react';

export default function PersonalEcologicalFootprint({ lang }: any) {
  const [diet, setDiet] = useState<number>(2.5); // global hectares base
  const [transport, setTransport] = useState<number>(1.5);
  const [housing, setHousing] = useState<number>(1.2);
  const [goods, setGoods] = useState<number>(1.0);

  // Total footprint in Global Hectares (gha)
  const totalGha = diet + transport + housing + goods;
  
  // Earths needed (Global average biocapacity is approx 1.6 gha per person)
  // Let's use a standard 1.7 gha for "1 Earth" to make the calculation straightforward.
  const earthsNeeded = totalGha / 1.7;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-teal-100 p-3 rounded-full text-teal-600">
          <Footprints size={28} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {lang === 'EN' ? 'Personal Ecological Footprint' : 'โปรแกรมคำนวณรอยเท้านิเวศส่วนตัว (Ecological Footprint)'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5 bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-100">
          
          {/* Diet */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Diet & Food Habits' : 'พฤติกรรมการทานอาหาร'}
            </label>
            <select
              value={diet}
              onChange={(e) => setDiet(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
            >
              <option value="1.0">{lang === 'EN' ? 'Vegan (Plant-based mostly)' : 'มังสวิรัติ (ทานพืชเป็นหลัก)'}</option>
              <option value="1.5">{lang === 'EN' ? 'Vegetarian (Dairy/Eggs allowed)' : 'มังสวิรัติ (ทานไข่/นม)'}</option>
              <option value="2.5">{lang === 'EN' ? 'Average Meat Eater (1-2 times/day)' : 'ทานเนื้อสัตว์ปานกลาง (1-2 มื้อต่อวัน)'}</option>
              <option value="3.5">{lang === 'EN' ? 'Heavy Meat Eater (Almost every meal)' : 'ทานเนื้อสัตว์เยอะ (แทบทุกมื้อ)'}</option>
            </select>
          </div>

          {/* Transport */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Primary Transportation' : 'การเดินทางหลัก'}
            </label>
            <select
              value={transport}
              onChange={(e) => setTransport(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
            >
              <option value="0.5">{lang === 'EN' ? 'Walking / Cycling / Public Transit' : 'เดิน / จักรยาน / ขนส่งสาธารณะ'}</option>
              <option value="1.5">{lang === 'EN' ? 'Motorcycle or Short Car Trips' : 'มอเตอร์ไซค์ หรือขับรถยนต์ระยะใกล้'}</option>
              <option value="2.5">{lang === 'EN' ? 'Car Commuter (Regular usage)' : 'ขับรถยนต์เป็นประจำทุกวัน'}</option>
              <option value="4.0">{lang === 'EN' ? 'Frequent Car & Air Travel' : 'ขับรถยนต์บ่อยมาก และขึ้นเครื่องบินเป็นประจำ'}</option>
            </select>
          </div>

          {/* Housing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Housing Energy & Size' : 'ขนาดที่พักอาศัยและการใช้พลังงาน'}
            </label>
            <select
              value={housing}
              onChange={(e) => setHousing(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
            >
              <option value="0.8">{lang === 'EN' ? 'Small apartment, Energy Efficient' : 'อพาร์ตเมนต์ขนาดเล็ก ประหยัดไฟ'}</option>
              <option value="1.2">{lang === 'EN' ? 'Medium house, Average Energy' : 'บ้านขนาดกลาง ใช้ไฟระดับทั่วไป'}</option>
              <option value="2.5">{lang === 'EN' ? 'Large standalone house, High Energy' : 'บ้านเดี่ยวหลังใหญ่ เปิดแอร์เยอะ'}</option>
            </select>
          </div>

          {/* Goods & Waste */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Goods, Services & Waste' : 'การบริโภคสินค้าและการจัดการขยะ'}
            </label>
            <select
              value={goods}
              onChange={(e) => setGoods(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
            >
              <option value="0.5">{lang === 'EN' ? 'Minimalist, High Recycling' : 'บริโภคน้อยมาก รีไซเคิลเป็นประจำ'}</option>
              <option value="1.0">{lang === 'EN' ? 'Average consumer, Some Recycling' : 'บริโภคทั่วไป แยกขยะบ้าง'}</option>
              <option value="2.0">{lang === 'EN' ? 'High consumer, Rare Recycling' : 'ซื้อของใหม่บ่อยมาก ไม่ค่อยแยกขยะ'}</option>
            </select>
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl p-6 text-white shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calculator size={24} />
              {lang === 'EN' ? 'Your Footprint Results' : 'ผลลัพธ์รอยเท้านิเวศของคุณ'}
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Footprints size={20} className="text-teal-200" />
                  <span>{lang === 'EN' ? 'Total Footprint' : 'รอยเท้านิเวศรวม'}</span>
                </div>
                <div className="text-xl font-bold text-right">
                  {totalGha.toFixed(1)} <span className="text-sm font-normal">gha</span>
                </div>
              </div>

              <div className="bg-white/20 p-4 rounded-lg flex flex-col justify-center items-center border border-teal-300/50 py-6">
                <Globe size={48} className={`mb-3 ${earthsNeeded > 1.5 ? 'text-red-300' : 'text-green-300'}`} />
                <span className="font-semibold mb-1 text-center">
                  {lang === 'EN' 
                    ? 'If everyone lived like you, we would need' 
                    : 'ถ้าทุกคนบนโลกใช้ชีวิตแบบคุณ เราจะต้องมี'}
                </span>
                <div className="text-4xl font-extrabold text-center mt-2">
                  {earthsNeeded.toFixed(1)} <span className="text-lg font-normal">{lang === 'EN' ? 'Earths' : 'โลก'}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-teal-100 flex items-start gap-2">
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <p>
                {lang === 'EN'
                  ? 'Values in Global Hectares (gha) are simplified estimates. 1 Earth biocapacity is roughly 1.7 gha per person.'
                  : 'ค่าผลลัพธ์เป็นโกลบอลเฮกตาร์ (gha) แบบประเมินเบื้องต้น ความสามารถในการรองรับของโลก 1 ใบ อยู่ที่ประมาณ 1.7 gha ต่อคน'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-teal max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Ecological Footprint คืออะไร ทำไมเราต้องใส่ใจ?
        </h2>
        <p>
          คุณเคยสงสัยหรือไม่ว่า ไลฟ์สไตล์หรือการใช้ชีวิตประจำวันของคุณ ทั้งการกิน การเดินทาง การใช้ไฟฟ้า และการจับจ่ายใช้สอย เบียดเบียนทรัพยากรธรรมชาติของโลกไปมากน้อยเพียงใด? แนวคิดที่ใช้ในการวัดผลกระทบเหล่านี้เรียกว่า <strong>รอยเท้านิเวศ (Ecological Footprint)</strong> ซึ่งเป็นการเปรียบเทียบ "ความต้องการทรัพยากร" ของมนุษย์ กับ "ความสามารถในการสร้างทรัพยากรทดแทน" ของธรรมชาติ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">หน่วยวัดโกลบอลเฮกตาร์ (Global Hectares - gha)</h3>
        <p>
          รอยเท้านิเวศถูกวัดเป็นหน่วยพื้นที่ที่เรียกว่า <strong>โกลบอลเฮกตาร์ (gha)</strong> ซึ่งเป็นพื้นที่มาตรฐานที่สะท้อนถึงความสามารถเฉลี่ยของโลกในการผลิตทรัพยากรชีวภาพและการดูดซับของเสีย (โดยเฉพาะก๊าซคาร์บอนไดออกไซด์) ข้อมูลจากเครือข่ายรอยเท้านิเวศโลก (Global Footprint Network) ระบุว่า ปัจจุบันความสามารถในการรองรับ (Biocapacity) ของโลกอยู่ที่ประมาณ <strong>1.6 - 1.7 gha ต่อประชากร 1 คน</strong> 
        </p>
        <p>
          แต่ในความเป็นจริง ประชากรโลกโดยเฉลี่ยมีรอยเท้านิเวศสูงถึง 2.7 gha ต่อคน ซึ่งหมายความว่า เรากำลังใช้ทรัพยากรเกินกว่าที่โลกจะสร้างทดแทนได้ทัน เรากำลัง "กู้ยืม" ทรัพยากรจากอนาคตของลูกหลานมาใช้ และนั่นคือสาเหตุหลักของวิกฤตสิ่งแวดล้อมที่เราเผชิญอยู่ ทั้งการสูญเสียความหลากหลายทางชีวภาพ ป่าไม้ลดลง และภาวะโลกร้อน
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ปัจจัยหลักที่ส่งผลต่อ Ecological Footprint ของคุณ</h3>
        <p>
          การประเมินรอยเท้านิเวศส่วนตัวจะถูกแบ่งออกเป็น 4 หมวดหมู่หลักๆ ที่เชื่อมโยงกับวิถีชีวิตของเรา:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>อาหาร (Diet & Food):</strong> การบริโภคเนื้อสัตว์ (โดยเฉพาะเนื้อวัว) มีรอยเท้านิเวศที่สูงมาก เนื่องจากต้องใช้พื้นที่กว้างใหญ่ในการปลูกพืชอาหารสัตว์และใช้น้ำจำนวนมหาศาล การหันมาทานพืชผักมากขึ้น (Plant-based diet) ช่วยลด Footprint ได้อย่างชัดเจน</li>
          <li><strong>การเดินทาง (Transportation):</strong> การขับรถยนต์ส่วนตัวทุกวัน โดยเฉพาะรถที่ใช้น้ำมันเชื้อเพลิง เป็นแหล่งสร้างคาร์บอนฟุตพริ้นท์ขนาดใหญ่ การเปลี่ยนไปใช้ระบบขนส่งสาธารณะ การปั่นจักรยาน หรือใช้รถยนต์ไฟฟ้า (EV) จะช่วยลดผลกระทบในส่วนนี้</li>
          <li><strong>ที่พักอาศัย (Housing):</strong> ขนาดของบ้านและการใช้พลังงานในบ้าน (การเปิดแอร์ การใช้เครื่องใช้ไฟฟ้า) หากบ้านมีขนาดใหญ่และใช้ไฟเยอะ ยิ่งต้องการพื้นที่ป่าไม้เพื่อดูดซับคาร์บอนไดออกไซด์จากการผลิตไฟฟ้ามากขึ้น</li>
          <li><strong>สินค้าและบริการ (Goods & Waste):</strong> พฤติกรรมการช้อปปิ้ง ซื้อของใหม่บ่อยๆ แบบ Fast Fashion ไปจนถึงการไม่คัดแยกขยะ ล้วนเพิ่มภาระให้กับการจัดการขยะและการขุดค้นทรัพยากรใหม่มาผลิตสินค้า</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ถ้าทุกคนใช้ชีวิตแบบคุณ โลก 1 ใบจะพอหรือไม่?</h3>
        <p>
          ไฮไลท์สำคัญของโปรแกรมคำนวณของเรา คือการนำตัวเลขรอยเท้านิเวศรวมของคุณมาคำนวณกลับว่า <em>"หากประชากรทุกคนบนโลกมีไลฟ์สไตล์เหมือนคุณเป๊ะ เราจะต้องมีโลกกี่ใบเพื่อผลิตทรัพยากรให้เพียงพอ?"</em> 
        </p>
        <p>
          หากผลลัพธ์ของคุณออกมาเกิน 1.0 แปลว่าวิถีชีวิตปัจจุบันของคุณ <strong>"ไม่ยั่งยืน (Unsustainable)"</strong> ในระยะยาว แต่ไม่ต้องตกใจไป! เป้าหมายของการคำนวณไม่ได้มีไว้เพื่อจับผิด แต่เพื่อให้คุณตระหนักรู้ว่ากิจกรรมส่วนไหนในชีวิตที่สร้างภาระต่อโลกมากที่สุด เพื่อที่คุณจะได้เริ่มต้นปรับเปลี่ยนพฤติกรรมเล็กๆ น้อยๆ เช่น ทานเนื้อสัตว์ให้น้อยลงสักหนึ่งมื้อต่อสัปดาห์ ลดการซื้อของที่ไม่จำเป็น หรือเปลี่ยนหลอดไฟเป็น LED ทุกการกระทำเล็กๆ ของคุณเมื่อรวมกันแล้ว สามารถช่วยลดขนาดของรอยเท้านิเวศและต่ออายุให้โลกใบนี้ได้อย่างมหาศาล
        </p>
      </div>
    </div>
  );
}

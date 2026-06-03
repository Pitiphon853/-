import React, { useState } from 'react';
import { Tractor, Calculator, Wind, Globe, Info } from 'lucide-react';

export default function LivestockMethaneEmissions({ lang }: any) {
  const [dairyCows, setDairyCows] = useState<number>(0);
  const [beefCattle, setBeefCattle] = useState<number>(0);
  const [pigs, setPigs] = useState<number>(0);
  const [sheep, setSheep] = useState<number>(0);

  // Approximate kg CH4 per head per year
  const EMISSION_DAIRY = 100;
  const EMISSION_BEEF = 60;
  const EMISSION_PIG = 1.5;
  const EMISSION_SHEEP = 8;

  // Global Warming Potential (GWP) of Methane compared to CO2 over 100 years is ~28
  const METHANE_GWP = 28;

  const totalMethane = 
    (dairyCows * EMISSION_DAIRY) + 
    (beefCattle * EMISSION_BEEF) + 
    (pigs * EMISSION_PIG) + 
    (sheep * EMISSION_SHEEP);

  const totalCO2e = totalMethane * METHANE_GWP;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-stone-100 p-3 rounded-full text-stone-600">
          <Tractor size={28} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {lang === 'EN' ? 'Livestock Methane Emissions Calculator' : 'โปรแกรมคำนวณปริมาณมีเทนจากฟาร์มปศุสัตว์'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5 bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-100">
          
          <p className="text-sm text-gray-600 mb-4">
            {lang === 'EN' 
              ? 'Enter the number of animals in your farm to estimate annual methane emissions.' 
              : 'ระบุจำนวนสัตว์เลี้ยงในฟาร์มของคุณเพื่อประเมินการปล่อยก๊าซมีเทนต่อปี'}
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Dairy Cows (Head)' : 'วัวนม (ตัว)'}
            </label>
            <input
              type="number"
              min="0"
              value={dairyCows}
              onChange={(e) => setDairyCows(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Beef Cattle (Head)' : 'วัวเนื้อ (ตัว)'}
            </label>
            <input
              type="number"
              min="0"
              value={beefCattle}
              onChange={(e) => setBeefCattle(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Pigs / Swine (Head)' : 'หมู / สุกร (ตัว)'}
            </label>
            <input
              type="number"
              min="0"
              value={pigs}
              onChange={(e) => setPigs(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Sheep (Head)' : 'แกะ (ตัว)'}
            </label>
            <input
              type="number"
              min="0"
              value={sheep}
              onChange={(e) => setSheep(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-all"
            />
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-stone-600 to-stone-800 rounded-xl p-6 text-white shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calculator size={24} />
              {lang === 'EN' ? 'Annual Emission Results' : 'ผลการปล่อยก๊าซต่อปี'}
            </h2>
            
            <div className="space-y-4">
              
              <div className="bg-white/10 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wind size={20} className="text-stone-300" />
                  <span>{lang === 'EN' ? 'Methane (CH₄) Produced' : 'ก๊าซมีเทนที่ปล่อยออกมา'}</span>
                </div>
                <div className="text-xl font-bold text-right">
                  {totalMethane.toLocaleString()} <span className="text-sm font-normal">kg CH₄/yr</span>
                </div>
              </div>

              <div className="bg-stone-500/30 p-4 rounded-lg flex flex-col items-center border border-stone-400/50 mt-2 py-6">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={20} className="text-stone-200" />
                  <span className="font-semibold text-stone-100">
                    {lang === 'EN' ? 'CO₂ Equivalent (CO₂e)' : 'เทียบเท่าการปล่อยคาร์บอน (CO₂e)'}
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-white text-center">
                  {totalCO2e.toLocaleString()} <span className="text-base font-normal">kg CO₂e/yr</span>
                </div>
              </div>

            </div>
            
            <div className="mt-4 text-xs text-stone-200 flex items-start gap-2">
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <p>
                {lang === 'EN'
                  ? 'Methane is a potent greenhouse gas. 1 kg of Methane traps roughly 28 times more heat than 1 kg of CO2 over a 100-year period.'
                  : 'มีเทนเป็นก๊าซเรือนกระจกที่รุนแรงมาก มีเทน 1 กก. กักเก็บความร้อนได้มากกว่า CO2 1 กก. ถึง 28 เท่าในช่วงเวลา 100 ปี'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-stone max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ฟาร์มปศุสัตว์และก๊าซมีเทน: ภัยเงียบต่อสภาพภูมิอากาศโลก
        </h2>
        <p>
          เมื่อพูดถึงสาเหตุของภาวะโลกร้อน (Global Warming) คนส่วนใหญ่มักจะพุ่งเป้าไปที่ควันจากท่อไอเสียรถยนต์ โรงงานอุตสาหกรรม หรือการเผาไหม้ถ่านหิน แต่แท้จริงแล้ว ภาคการเกษตร โดยเฉพาะ <strong>"การทำฟาร์มปศุสัตว์ (Livestock Farming)"</strong> ถือเป็นหนึ่งในแหล่งกำเนิดก๊าซเรือนกระจกที่ใหญ่ที่สุดของโลก โดยก๊าซตัวการสำคัญที่ถูกปล่อยออกมาคือ <strong>ก๊าซมีเทน (Methane - CH₄)</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ก๊าซมีเทนมาจากไหน?</h3>
        <p>
          ก๊าซมีเทนจากฟาร์มปศุสัตว์หลักๆ มาจาก 2 แหล่งกำเนิด:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>กระบวนการย่อยอาหารของสัตว์เคี้ยวเอื้อง (Enteric Fermentation):</strong> 
            สัตว์เคี้ยวเอื้อง เช่น วัวนม วัวเนื้อ แกะ และแพะ มีกระเพาะอาหารหลายห้องที่เต็มไปด้วยจุลินทรีย์ที่ช่วยหมักและย่อยสลายหญ้า ในระหว่างกระบวนการหมักนี้ จุลินทรีย์จะสร้างก๊าซมีเทนขึ้นมา และสัตว์จะปล่อยก๊าซนี้ออกมาสู่บรรยากาศผ่านการ <strong>"เรอ (Burping)"</strong> (ซึ่งเป็นสัดส่วนที่สูงมาก) และการผายลม
          </li>
          <li>
            <strong>การจัดการมูลสัตว์ (Manure Management):</strong> 
            เมื่อมูลของสัตว์ เช่น หมู วัว หรือไก่ ถูกนำไปกองรวมกันหรือเก็บกักในบ่อบำบัดที่มีสภาพไร้ออกซิเจน (Anaerobic conditions) แบคทีเรียจะย่อยสลายสารอินทรีย์ในมูลและปล่อยก๊าซมีเทนออกมา
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมก๊าซมีเทนถึงน่ากลัว? (CO₂ Equivalent)</h3>
        <p>
          แม้ว่าปริมาณก๊าซมีเทนในชั้นบรรยากาศจะมีน้อยกว่าก๊าซคาร์บอนไดออกไซด์ (CO₂) มาก แต่มีเทนกลับมีประสิทธิภาพในการ <strong>กักเก็บความร้อน (Global Warming Potential - GWP) ได้ดีกว่า CO₂ ถึงประมาณ 28 เท่า</strong> (เมื่อเทียบในช่วงเวลา 100 ปี) นั่นหมายความว่า การปล่อยก๊าซมีเทน 1 กิโลกรัม จะส่งผลกระทบต่ออุณหภูมิโลกเทียบเท่ากับการปล่อยคาร์บอนไดออกไซด์ (CO₂e) ถึง 28 กิโลกรัม! 
        </p>
        <p>
          ตัวอย่างเช่น วัวนม 1 ตัว สามารถปล่อยก๊าซมีเทนได้ถึง 100 กิโลกรัมต่อปี ซึ่งเทียบเท่ากับการปล่อย CO₂ เกือบ 3 ตัน! (หรือเท่ากับการขับรถยนต์เฉลี่ยตลอดทั้งปี)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">แนวทางในการลดก๊าซมีเทนจากฟาร์ม</h3>
        <p>
          ปัจจุบัน วงการเกษตรและปศุสัตว์ทั่วโลกกำลังตื่นตัวและพยายามหาวิธีลดการปล่อยก๊าซมีเทนผ่านนวัตกรรมต่างๆ เช่น:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>การปรับปรุงสูตรอาหารสัตว์:</strong> การผสมสาหร่ายทะเลสีแดง กระเทียม หรือสารสกัดเฉพาะบางชนิดลงในอาหารวัว สามารถช่วยลดการทำงานของจุลินทรีย์ที่สร้างมีเทนในกระเพาะวัวได้ถึง 30-80%</li>
          <li><strong>การทำระบบไบโอแก๊ส (Biogas):</strong> การนำมูลสัตว์เข้าสู่ระบบหมักก๊าซชีวภาพแบบปิด เพื่อดักจับก๊าซมีเทนไม่ให้หลุดรอดสู่ชั้นบรรยากาศ แล้วนำก๊าซนั้นไปเผาไหม้เพื่อผลิตเป็นกระแสไฟฟ้าใช้ภายในฟาร์ม ถือเป็นการเปลี่ยนตัวการโลกร้อนให้กลายเป็นพลังงานสะอาด</li>
          <li><strong>การปรับปรุงพันธุ์สัตว์:</strong> การคัดเลือกสายพันธุ์วัวที่มีประสิทธิภาพการย่อยอาหารดี และมีอายุการเจริญเติบโตสั้นลง ทำให้ปล่อยก๊าซมีเทนน้อยลงตลอดอายุขัย</li>
        </ul>

        <p>
          โปรแกรม <strong>คำนวณปริมาณมีเทนจากฟาร์มปศุสัตว์</strong> นี้ ถูกพัฒนาขึ้นเพื่อให้เกษตรกรและผู้ที่สนใจสามารถประเมิน "คาร์บอนฟุตพริ้นท์" เบื้องต้นของฟาร์มตนเองได้ นำไปสู่ความตระหนักรู้และการวางแผนจัดการฟาร์มให้เป็นมิตรต่อสิ่งแวดล้อมมากยิ่งขึ้น นอกจากนี้ ในมุมของผู้บริโภค การลดปริมาณการบริโภคเนื้อวัวลงเพียงเล็กน้อย ก็มีส่วนช่วยลดการปล่อยก๊าซมีเทนในระดับโลกได้อย่างมีนัยสำคัญ
        </p>
      </div>
    </div>
  );
}

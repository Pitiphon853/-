import React, { useState } from 'react';
import { TreeDeciduous, Calculator, Leaf, Wind, Info } from 'lucide-react';

export default function TreeCO2OffsetCalculator({ lang }: any) {
  const [treeCount, setTreeCount] = useState<number>(10);
  const [treeType, setTreeType] = useState<string>('general');
  const [years, setYears] = useState<number>(1);

  // Approximate CO2 absorption in kg per tree per year
  const absorptionRates: Record<string, number> = {
    general: 15,
    mangrove: 25,
    fast_growing: 20,
    fruit: 10,
    large: 100 // large mature trees can absorb a lot more over a whole year, but let's keep it simple
  };

  const currentRate = absorptionRates[treeType] || 15;
  const yearlyAbsorption = treeCount * currentRate;
  const totalAbsorption = yearlyAbsorption * years;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
          <TreeDeciduous size={28} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {lang === 'EN' ? 'Tree CO₂ Offset Calculator' : 'โปรแกรมคำนวณปริมาณ CO₂ ที่ต้นไม้ดูดซับ'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5 bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Number of Trees' : 'จำนวนต้นไม้ (ต้น)'}
            </label>
            <input
              type="number"
              min="1"
              value={treeCount}
              onChange={(e) => setTreeCount(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Type of Tree (Approximate)' : 'ประเภทของต้นไม้ (โดยประมาณ)'}
            </label>
            <select
              value={treeType}
              onChange={(e) => setTreeType(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            >
              <option value="general">{lang === 'EN' ? 'General Tree (~15 kg CO₂/yr)' : 'ต้นไม้ทั่วไป (~15 กก. CO₂/ปี)'}</option>
              <option value="mangrove">{lang === 'EN' ? 'Mangrove (~25 kg CO₂/yr)' : 'ต้นไม้ป่าชายเลน เช่น โกงกาง (~25 กก. CO₂/ปี)'}</option>
              <option value="fast_growing">{lang === 'EN' ? 'Fast-growing Tree (~20 kg CO₂/yr)' : 'ไม้ยืนต้นโตเร็ว เช่น ยูคาลิปตัส (~20 กก. CO₂/ปี)'}</option>
              <option value="fruit">{lang === 'EN' ? 'Fruit Tree (~10 kg CO₂/yr)' : 'ไม้ผลทั่วไป (~10 กก. CO₂/ปี)'}</option>
              <option value="large">{lang === 'EN' ? 'Mature Large Tree (~100 kg CO₂/yr)' : 'ไม้ยืนต้นขนาดใหญ่ที่มีอายุมาก (~100 กก. CO₂/ปี)'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Years of Growth' : 'ระยะเวลาการเติบโต (ปี)'}
            </label>
            <input
              type="number"
              min="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-6 text-white shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calculator size={24} />
              {lang === 'EN' ? 'Carbon Offset Results' : 'ผลการคำนวณการดูดซับ CO₂'}
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf size={20} className="text-emerald-200" />
                  <span>{lang === 'EN' ? 'Total CO₂ Absorbed / Year' : 'ปริมาณดูดซับ CO₂ ต่อปี'}</span>
                </div>
                <div className="text-xl font-bold text-right">
                  {yearlyAbsorption.toLocaleString()} <span className="text-sm font-normal">kg</span>
                </div>
              </div>

              <div className="bg-white/20 p-4 rounded-lg flex items-center justify-between border border-emerald-300/50">
                <div className="flex items-center gap-2">
                  <Wind size={20} className="text-blue-100" />
                  <span className="font-semibold">{lang === 'EN' ? `Total Absorbed over ${years} Years` : `ปริมาณดูดซับรวมใน ${years} ปี`}</span>
                </div>
                <div className="text-3xl font-extrabold text-right">
                  {totalAbsorption.toLocaleString()} <span className="text-base font-normal">kg CO₂</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-emerald-100 flex items-start gap-2">
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <p>
                {lang === 'EN'
                  ? 'Values are rough estimates. Actual CO2 sequestration depends heavily on tree species, age, climate, soil condition, and health.'
                  : 'ตัวเลขนี้เป็นเพียงการประมาณการเบื้องต้น ปริมาณการดูดซับ CO₂ จริงขึ้นอยู่กับสายพันธุ์ของต้นไม้ อายุ สภาพอากาศ สภาพดิน และความสมบูรณ์ของต้นไม้'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-emerald max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ทำไมการปลูกต้นไม้ถึงเป็นกุญแจสำคัญในการลดก๊าซคาร์บอนไดออกไซด์ (CO₂)?
        </h2>
        <p>
          ในยุคที่ทั่วโลกกำลังเผชิญกับวิกฤตการเปลี่ยนแปลงสภาพภูมิอากาศ (Climate Change) หรือที่เรารู้จักกันในชื่อภาวะโลกร้อน ก๊าซคาร์บอนไดออกไซด์ (CO₂) ถือเป็นหนึ่งในก๊าซเรือนกระจกตัวร้ายที่มีปริมาณสูงที่สุดจากการทำกิจกรรมของมนุษย์ ไม่ว่าจะเป็นการเผาไหม้เชื้อเพลิงฟอสซิล การขนส่ง หรือโรงงานอุตสาหกรรม วิธีที่ธรรมชาติสร้างขึ้นมาเพื่อรับมือกับปัญหานี้ได้ดีที่สุดและยั่งยืนที่สุดคือ <strong>"การปลูกต้นไม้"</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">กระบวนการมหัศจรรย์: การสังเคราะห์ด้วยแสง (Photosynthesis)</h3>
        <p>
          ต้นไม้เปรียบเสมือนปอดของโลกและเครื่องฟอกอากาศขนาดใหญ่ที่ทำงานด้วยกลไกทางธรรมชาติ ผ่านกระบวนการที่เรียกว่าการสังเคราะห์ด้วยแสง ในเวลากลางวัน ต้นไม้จะดูดซับก๊าซคาร์บอนไดออกไซด์จากอากาศเข้าไปทางปากใบ ผสมกับน้ำที่ดูดขึ้นมาจากราก และใช้พลังงานจากแสงอาทิตย์เพื่อเปลี่ยนส่วนผสมเหล่านี้ให้กลายเป็นน้ำตาล (เพื่อเป็นอาหารในการเจริญเติบโต) พร้อมกับคาย <strong>ก๊าซออกซิเจน (O₂)</strong> ที่เป็นประโยชน์ต่อการหายใจของสิ่งมีชีวิตทุกชนิดกลับคืนสู่อากาศ
        </p>
        <p>
          ก๊าซคาร์บอน (Carbon) ที่ถูกดูดซับไว้นั้นไม่ได้หายไปไหน แต่จะถูกกักเก็บ (Carbon Sequestration) ไว้ในรูปของมวลชีวภาพ (Biomass) ไม่ว่าจะเป็นเนื้อไม้ กิ่งก้าน ใบ และราก ยิ่งต้นไม้มีขนาดใหญ่และมีอายุยืนยาวมากเท่าไหร่ ก็ยิ่งเป็นคลังเก็บคาร์บอนที่ดีเยี่ยมมากเท่านั้น
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ต้นไม้แต่ละประเภทดูดซับ CO₂ ได้ไม่เท่ากัน</h3>
        <p>
          ปริมาณการดูดซับคาร์บอนไดออกไซด์ของต้นไม้นั้นแตกต่างกันไปตามปัจจัยหลายอย่าง เช่น สายพันธุ์ อัตราการเจริญเติบโต และสภาพแวดล้อมที่ปลูก ตัวอย่างเช่น:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ต้นไม้ยืนต้นทั่วไป:</strong> สามารถดูดซับ CO₂ ได้เฉลี่ยประมาณ 9 - 15 กิโลกรัมต่อปีต่อต้น เมื่อโตเต็มที่</li>
          <li><strong>ต้นไม้โตเร็ว:</strong> เช่น ไม้ตระกูลกระถินณรงค์ ยูคาลิปตัส สะเดา มีอัตราการสร้างเนื้อไม้เร็ว จึงดูดซับคาร์บอนได้สูงในช่วงแรกของการเจริญเติบโต (ประมาณ 20 กก./ปี)</li>
          <li><strong>ป่าชายเลน (Mangrove):</strong> เช่น ต้นโกงกาง แสม ถือเป็นแชมป์ในการดูดซับและกักเก็บคาร์บอน (Blue Carbon) โดยสามารถกักเก็บคาร์บอนลงสู่ชั้นดินโคลนได้มากกว่าป่าบกทั่วไปถึง 3-4 เท่า! การปลูกป่าชายเลนจึงช่วยชดเชยคาร์บอนได้อย่างมีประสิทธิภาพสูง</li>
          <li><strong>ไม้ยืนต้นขนาดใหญ่ (Mature Trees):</strong> ต้นไม้ที่มีอายุมากและมีขนาดลำต้นใหญ่โต สามารถดูดซับและกักเก็บคาร์บอนไว้ในลำต้นได้เป็นหลักหลายสิบถึงร้อยกิโลกรัมต่อปี การรักษาต้นไม้ใหญ่เดิมไว้จึงสำคัญไม่แพ้การปลูกใหม่</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์ของโปรแกรมคำนวณการดูดซับ CO₂</h3>
        <p>
          โปรแกรม <strong>คำนวณปริมาณ CO₂ ที่ต้นไม้ดูดซับ (Tree CO₂ Offset Calculator)</strong> ของเรา ถูกออกแบบมาเพื่อให้ประชาชนทั่วไป องค์กร หรือภาคธุรกิจ สามารถประเมินศักยภาพการชดเชยคาร์บอน (Carbon Offset) จากโครงการปลูกต้นไม้ของตนเองได้อย่างง่ายดาย เพียงระบุจำนวนต้นไม้ ประเภท และจำนวนปีที่คาดหวัง ระบบจะแสดงผลรวมของปริมาณ CO₂ ที่ถูกดูดซับออกจากชั้นบรรยากาศ 
        </p>
        <p>
          ข้อมูลนี้ไม่เพียงแต่ใช้เพื่อสร้างความตระหนักรู้ส่วนบุคคล แต่ยังสามารถใช้เป็นตัวเลขเบื้องต้นในการทำรายงานความยั่งยืน (Sustainability Report) โครงการ CSR หรือการตั้งเป้าหมายสู่ความเป็นกลางทางคาร์บอน (Carbon Neutrality) และ Net Zero ได้อีกด้วย
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ก้าวต่อไปเพื่อโลกที่ยั่งยืน</h3>
        <p>
          แม้ว่าการปลูกต้นไม้จะเป็นเครื่องมือที่ดี แต่สิ่งสำคัญที่สุดในการแก้ปัญหาโลกร้อนคือ <strong>การลดการปล่อยก๊าซเรือนกระจกที่ต้นทาง</strong> ควบคู่ไปกับการเพิ่มพื้นที่สีเขียว มาร่วมกันปลูกต้นไม้ตั้งแต่วันนี้ เพื่อสร้างร่มเงา คืนความสมดุลให้ธรรมชาติ และส่งมอบโลกที่น่าอยู่ให้แก่ลูกหลานของเราในอนาคต
        </p>
      </div>
    </div>
  );
}

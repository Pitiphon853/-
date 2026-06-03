import React, { useState } from 'react';
import { Recycle, Trash2, Calculator, RotateCcw, TreePine } from 'lucide-react';

export default function RecycledWasteImpact({ lang }: { lang: 'TH' | 'EN' }) {
  const [plastic, setPlastic] = useState<number | ''>(5);
  const [paper, setPaper] = useState<number | ''>(10);
  const [glass, setGlass] = useState<number | ''>(2);
  const [metal, setMetal] = useState<number | ''>(1);
  const [timeframe, setTimeframe] = useState<number>(12); // months

  const t = {
    title: lang === 'TH' ? 'คำนวณผลกระทบจากการรีไซเคิลขยะ' : 'Recycled Waste Impact Calculator',
    subtitle: lang === 'TH' ? 'ระบุน้ำหนักขยะที่คัดแยกได้ต่อเดือน (กิโลกรัม)' : 'Enter sorted waste per month (kg)',
    plastic: lang === 'TH' ? 'พลาสติก (ขวด PET, ถุง)' : 'Plastics (PET bottles, bags)',
    paper: lang === 'TH' ? 'กระดาษ (ลัง, เอกสาร)' : 'Paper (Cardboard, documents)',
    glass: lang === 'TH' ? 'แก้ว (ขวด, โหล)' : 'Glass (Bottles, jars)',
    metal: lang === 'TH' ? 'โลหะ/อลูมิเนียม (กระป๋อง)' : 'Metal / Aluminum (Cans)',
    timeframe: lang === 'TH' ? 'ระยะเวลาที่ทำต่อเนื่อง' : 'Duration of recycling',
    months: lang === 'TH' ? 'เดือน' : 'Months',
    year: lang === 'TH' ? '1 ปี' : '1 Year',
    reset: lang === 'TH' ? 'เริ่มใหม่' : 'Reset',
    result: lang === 'TH' ? 'ก๊าซเรือนกระจกที่ลดได้รวม' : 'Total Avoided GHG Emissions',
    treeEquivalent: lang === 'TH' ? 'เทียบเท่าปลูกต้นไม้' : 'Equivalent to planting',
    trees: lang === 'TH' ? 'ต้น' : 'trees',
  };

  // Avoided emissions factors (kg CO2e reduced per kg of recycled material)
  // Approximate values comparing recycling vs virgin material production + landfill
  const factors = {
    plastic: 1.5,
    paper: 0.9,
    glass: 0.3,
    metal: 4.0, // Aluminum recycling saves a massive amount of energy
  };

  const calculateImpact = () => {
    const p = Number(plastic) || 0;
    const pa = Number(paper) || 0;
    const g = Number(glass) || 0;
    const m = Number(metal) || 0;

    const monthlySaved = (p * factors.plastic) + (pa * factors.paper) + (g * factors.glass) + (m * factors.metal);
    const totalSaved = monthlySaved * timeframe;
    const equivalentTrees = totalSaved / 21; // 1 tree absorbs ~21 kg CO2/year

    return { totalSaved, equivalentTrees };
  };

  const { totalSaved, equivalentTrees } = calculateImpact();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Recycle className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        </div>
        <p className="text-gray-500 mb-6 ml-14">{t.subtitle}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.plastic}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={plastic}
                    onChange={(e) => setPlastic(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                  <span className="absolute right-3 top-2 text-gray-400 text-sm">kg</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.paper}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={paper}
                    onChange={(e) => setPaper(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                  <span className="absolute right-3 top-2 text-gray-400 text-sm">kg</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.metal}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={metal}
                    onChange={(e) => setMetal(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                  <span className="absolute right-3 top-2 text-gray-400 text-sm">kg</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.glass}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={glass}
                    onChange={(e) => setGlass(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                  <span className="absolute right-3 top-2 text-gray-400 text-sm">kg</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.timeframe}
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value={1}>1 {t.months}</option>
                <option value={6}>6 {t.months}</option>
                <option value={12}>{t.year}</option>
                <option value={60}>5 {t.year.replace('1', '')}</option>
              </select>
            </div>

            <button
              onClick={() => {
                setPlastic(5);
                setPaper(10);
                setGlass(2);
                setMetal(1);
                setTimeframe(12);
              }}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t.reset}
            </button>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 flex flex-col justify-center items-center text-center space-y-6 border border-blue-100">
            <div className="w-full">
              <p className="text-blue-800 text-sm font-medium mb-2">{t.result}</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-blue-600">
                  {totalSaved.toLocaleString('en-US', { maximumFractionDigits: 1 })}
                </span>
                <span className="text-lg text-blue-700 font-medium">kg CO2e</span>
              </div>
            </div>
            
            {totalSaved > 0 && (
              <div className="w-full pt-4 border-t border-blue-200/60">
                <p className="text-gray-600 text-sm mb-2">{t.treeEquivalent}</p>
                <div className="flex items-center justify-center gap-2">
                  <TreePine className="w-6 h-6 text-green-600" />
                  <span className="text-3xl font-bold text-gray-800">
                    {Math.ceil(equivalentTrees)}
                  </span>
                  <span className="text-gray-600">{t.trees}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose prose-blue max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {lang === 'TH' ? 'แยกขยะ = ลดโลกร้อน: ค้นพบพลังของการรีไซเคิล' : 'Sorting Waste = Cooling the Earth: Discover the Power of Recycling'}
        </h2>
        
        {lang === 'TH' ? (
          <>
            <p>
              เราทุกคนรู้ดีว่าการ "แยกขยะ" เป็นสิ่งที่ดีต่อสิ่งแวดล้อม แต่คุณเคยสงสัยไหมว่า ขวดพลาสติก กระป๋องโค้ก หรือลังกระดาษที่คุณแยกไว้ในแต่ละวัน สามารถช่วยลดปัญหา <strong>ก๊าซเรือนกระจก (Greenhouse Gas)</strong> และสภาวะโลกร้อนได้อย่างเป็นรูปธรรมแค่ไหน?
            </p>

            <h3>ทำไมการรีไซเคิลถึงช่วยลดคาร์บอนได้?</h3>
            <p>
              การลดการปล่อยก๊าซคาร์บอนไดออกไซด์ (Avoided Emissions) จากการรีไซเคิล เกิดจาก 2 ปัจจัยหลัก:
            </p>
            <ol>
              <li><strong>ลดการสกัดทรัพยากรใหม่ (Virgin Materials):</strong> การผลิตของใหม่จากธรรมชาติ เช่น การขุดเจาะน้ำมันเพื่อทำพลาสติก หรือการทำเหมืองแร่เพื่อสกัดอลูมิเนียม ต้องใช้พลังงานมหาศาลและปล่อยมลพิษเยอะมาก การนำวัสดุเก่ามาหลอมใหม่ใช้พลังงานน้อยกว่าหลายเท่าตัว</li>
              <li><strong>ลดการเน่าเสียในบ่อขยะ (Landfill Avoidance):</strong> ขยะบางประเภทโดยเฉพาะกระดาษ หากถูกทิ้งทับถมในบ่อขยะ จะเกิดการย่อยสลายแบบไร้ออกซิเจน สร้าง "ก๊าซมีเทน" ซึ่งเป็นก๊าซเรือนกระจกที่รุนแรงกว่า CO2 หลายเท่า การนำกระดาษไปรีไซเคิลจึงช่วยตัดวงจรนี้</li>
            </ol>

            <h3>พลังที่ซ่อนอยู่ในวัสดุแต่ละประเภท</h3>
            <ul>
              <li><strong>กระป๋องอลูมิเนียม (Metal):</strong> เป็นแชมเปี้ยนของการลดคาร์บอน! การรีไซเคิลอลูมิเนียมใช้พลังงานน้อยกว่าการสกัดแร่ใหม่ถึง 95% กระป๋องทุกใบที่คุณแยก จึงเท่ากับการประหยัดพลังงานมหาศาล</li>
              <li><strong>พลาสติก (Plastics):</strong> พลาสติกทำจากปิโตรเลียม การรีไซเคิลขวด PET หรือถุงพลาสติก 1 กิโลกรัม ช่วยลดการปล่อยคาร์บอนได้ประมาณ 1.5 กิโลกรัม CO2e</li>
              <li><strong>กระดาษ (Paper):</strong> การรีไซเคิลกระดาษไม่เพียงแต่ช่วยรักษาต้นไม้ (ซึ่งเป็นแหล่งดูดซับคาร์บอน) แต่ยังช่วยลดมลพิษจากกระบวนการฟอกเยื่อกระดาษในโรงงานอีกด้วย</li>
              <li><strong>แก้ว (Glass):</strong> แม้แก้วจะมีน้ำหนักมากและใช้พลังงานในการหลอมสูง แต่การนำเศษแก้ว (Cullet) ไปหลอมใหม่ก็ยังใช้ความร้อนน้อยกว่าการหลอมทรายแก้วใหม่ ล้วนๆ</li>
            </ul>

            <p>
              หลายคนอาจมองว่าการคัดแยกขยะในครัวเรือนเป็นเรื่องเล็กน้อย แต่หากคุณใช้เครื่องมือ <em>คำนวณผลกระทบจากการรีไซเคิลขยะ</em> ด้านบน คุณจะพบว่าระยะเวลาเพียง 1 ปี ขยะที่คุณคัดแยกสามารถเทียบเท่ากับการ <strong>"ปลูกต้นไม้ใหญ่"</strong> หลายต้นให้โลกใบนี้ได้เลย เริ่มคัดแยกขยะตั้งแต่วันนี้ เพื่อสร้างผลกระทบที่ยิ่งใหญ่ในวันข้างหน้า!
            </p>
          </>
        ) : (
          <>
            <p>
              We all know that "sorting waste" is good for the environment. But have you ever wondered how your daily act of separating plastic bottles, soda cans, and cardboard boxes tangibly reduces <strong>Greenhouse Gas (GHG)</strong> emissions and combats global warming?
            </p>

            <h3>How Does Recycling Reduce Carbon Emissions?</h3>
            <p>
              The "Avoided Emissions" generated by recycling stem from two primary mechanisms:
            </p>
            <ol>
              <li><strong>Avoiding Virgin Material Extraction:</strong> Manufacturing products from scratch using virgin raw materials—like drilling for oil to make virgin plastic or mining bauxite for aluminum—requires colossal amounts of energy and fossil fuels. Melting down and reusing existing materials uses a fraction of that energy.</li>
              <li><strong>Diverting from Landfills:</strong> When biodegradable waste (like paper and cardboard) gets buried in a landfill, it decomposes anaerobically (without oxygen). This process releases <strong>Methane</strong>, a greenhouse gas significantly more potent than CO2. Recycling paper entirely removes this methane source.</li>
            </ol>

            <h3>The Hidden Power of Different Materials</h3>
            <ul>
              <li><strong>Aluminum/Metal Cans:</strong> The undisputed champion of carbon reduction! Recycling aluminum uses 95% less energy than producing it from virgin ore. Every single can you recycle represents a massive energy saving.</li>
              <li><strong>Plastics:</strong> Plastics are derived from petroleum. Recycling 1 kg of PET bottles or plastic bags prevents approximately 1.5 kg of CO2e from entering the atmosphere compared to making new plastic.</li>
              <li><strong>Paper:</strong> Recycling paper not only saves living trees (which actively absorb carbon) but also avoids the highly energy-intensive and chemical-heavy process of pulping fresh wood.</li>
              <li><strong>Glass:</strong> While glass is heavy and requires high heat to melt, using recycled glass chips (cullet) in the furnace still requires less thermal energy than melting raw silica sand.</li>
            </ul>

            <p>
              Household waste sorting might seem like a small, insignificant chore. However, if you input your estimated monthly recycling into our <em>Recycled Waste Impact Calculator</em>, you will see that over just one year, your actions can have the equivalent environmental impact of <strong>planting several mature trees</strong>! Start sorting today to make a massive impact tomorrow.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

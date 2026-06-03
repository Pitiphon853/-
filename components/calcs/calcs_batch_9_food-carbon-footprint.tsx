import React, { useState } from 'react';
import { Utensils, Leaf, Beef, Calculator, RotateCcw, Drumstick, Car } from 'lucide-react';

export default function FoodCarbonFootprint({ lang }: { lang: 'TH' | 'EN' }) {
  const [amount, setAmount] = useState<number | ''>(1);
  const [foodType, setFoodType] = useState<string>('beef');

  const t = {
    title: lang === 'TH' ? 'คำนวณคาร์บอนฟุตพริ้นท์ของอาหาร' : 'Food Carbon Footprint Calculator',
    amount: lang === 'TH' ? 'ปริมาณอาหาร (กิโลกรัม)' : 'Food Amount (kg)',
    foodType: lang === 'TH' ? 'ประเภทอาหาร' : 'Food Type',
    calculate: lang === 'TH' ? 'คำนวณ' : 'Calculate',
    reset: lang === 'TH' ? 'เริ่มใหม่' : 'Reset',
    result: lang === 'TH' ? 'ปริมาณคาร์บอน (kg CO2e)' : 'Carbon Emissions (kg CO2e)',
    kmEquivalent: lang === 'TH' ? 'เทียบเท่าการขับรถยนต์ (กม.)' : 'Equivalent to driving a car (km)',
    unitKm: lang === 'TH' ? 'กม.' : 'km',
    foods: {
      beef: lang === 'TH' ? 'เนื้อวัว (Beef)' : 'Beef',
      lamb: lang === 'TH' ? 'เนื้อแกะ (Lamb)' : 'Lamb',
      pork: lang === 'TH' ? 'เนื้อหมู (Pork)' : 'Pork',
      chicken: lang === 'TH' ? 'เนื้อไก่ (Chicken)' : 'Chicken',
      fish: lang === 'TH' ? 'ปลา (Farmed Fish)' : 'Farmed Fish',
      cheese: lang === 'TH' ? 'ชีส (Cheese)' : 'Cheese',
      eggs: lang === 'TH' ? 'ไข่ไก่ (Eggs)' : 'Eggs',
      rice: lang === 'TH' ? 'ข้าว (Rice)' : 'Rice',
      tofu: lang === 'TH' ? 'เต้าหู้ (Tofu)' : 'Tofu',
      veg: lang === 'TH' ? 'ผักสดทั่วไป (Vegetables)' : 'Vegetables',
      fruit: lang === 'TH' ? 'ผลไม้ (Fruits)' : 'Fruits',
    }
  };

  // Approximate kg CO2e per kg of food product (Source: Our World in Data / Poore & Nemecek 2018)
  const emissionFactors: Record<string, number> = {
    beef: 99.48, // Extremely high due to methane from ruminants and land use
    lamb: 39.72,
    cheese: 23.88,
    pork: 12.31,
    fish: 13.63,
    chicken: 9.87,
    eggs: 4.67,
    rice: 4.45, // High for plants due to methane from flooded paddies
    tofu: 3.16,
    veg: 0.5,
    fruit: 1.05,
  };

  const getFoodIcon = (type: string) => {
    if (['beef', 'lamb', 'pork'].includes(type)) return <Beef className="w-5 h-5 text-red-500" />;
    if (['chicken', 'eggs'].includes(type)) return <Drumstick className="w-5 h-5 text-orange-500" />;
    if (['cheese', 'fish'].includes(type)) return <Utensils className="w-5 h-5 text-blue-500" />;
    return <Leaf className="w-5 h-5 text-green-500" />;
  };

  const emissions = (Number(amount) || 0) * emissionFactors[foodType];
  
  // A typical petrol car emits ~0.19 kg CO2 per km.
  const drivingEquivalent = emissions / 0.19;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-100 rounded-lg">
            <Utensils className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.amount}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                min="0"
                step="0.1"
                placeholder="1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.foodType}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {getFoodIcon(foodType)}
                </div>
                <select
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-white"
                >
                  {Object.entries(t.foods).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                setAmount(1);
                setFoodType('beef');
              }}
              className="w-full mt-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t.reset}
            </button>
          </div>

          <div className="bg-red-50 rounded-xl p-6 flex flex-col justify-center items-center text-center space-y-6 border border-red-100">
            <div className="w-full">
              <p className="text-red-800 text-sm font-medium mb-2">{t.result}</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-red-600">
                  {emissions.toLocaleString('en-US', { maximumFractionDigits: 1 })}
                </span>
                <span className="text-lg text-red-700 font-medium">kg</span>
              </div>
            </div>
            
            {emissions > 0 && (
              <div className="w-full pt-4 border-t border-red-200/60">
                <p className="text-gray-600 text-sm mb-2">{t.kmEquivalent}</p>
                <div className="flex items-center justify-center gap-2">
                  <Car className="w-5 h-5 text-gray-500" />
                  <span className="text-2xl font-bold text-gray-800">
                    {drivingEquivalent.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-gray-600">{t.unitKm}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose prose-red max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {lang === 'TH' ? 'อาหารที่เรากิน กระทบโลกแค่ไหน? เข้าใจ Food Carbon Footprint' : 'How Your Diet Impacts the Planet: Understanding Food Carbon Footprints'}
        </h2>
        
        {lang === 'TH' ? (
          <>
            <p>
              หลายคนอาจไม่ทราบว่า <strong>ระบบอาหาร (Food System)</strong> ตั้งแต่การเกษตร การทำปศุสัตว์ การแปรรูป ไปจนถึงการขนส่ง มีสัดส่วนในการปล่อยก๊าซเรือนกระจกสูงถึง 26% หรือ 1 ใน 4 ของการปล่อยก๊าซเรือนกระจกทั้งหมดบนโลก สิ่งที่เราเลือกตักเข้าปากในทุกๆ มื้อ จึงมีผลกระทบโดยตรงต่อสภาวะโลกร้อน (Global Warming) อย่างหลีกเลี่ยงไม่ได้
            </p>

            <h3>ทำไมเนื้อวัวถึงมีคาร์บอนฟุตพริ้นท์สูงที่สุด?</h3>
            <p>
              หากคุณใช้เครื่องคำนวณด้านบนเปรียบเทียบระหว่าง <strong>"เนื้อวัว (Beef)"</strong> 1 กิโลกรัม กับ <strong>"เต้าหู้ (Tofu)"</strong> 1 กิโลกรัม คุณจะพบตัวเลขที่ต่างกันอย่างน่าตกใจ เนื้อวัวปล่อยก๊าซเรือนกระจกมากกว่าเกือบ 30 เท่า! สาเหตุหลักมาจาก:
            </p>
            <ul>
              <li><strong>ก๊าซมีเทน (Methane):</strong> วัวและแกะเป็นสัตว์เคี้ยวเอื้อง (Ruminants) กระบวนการย่อยอาหารของพวกมันทำให้เกิดการเรอและตดเป็นก๊าซมีเทน ซึ่งมีฤทธิ์ทำให้โลกร้อนรุนแรงกว่า CO2 ถึง 25-28 เท่า</li>
              <li><strong>การใช้พื้นที่ (Land Use Change):</strong> การปศุสัตว์ขนาดใหญ่ต้องใช้พื้นที่มหาศาล ทั้งสำหรับเลี้ยงสัตว์และปลูกพืชอาหารสัตว์ ทำให้เกิดการตัดไม้ทำลายป่า (Deforestation)</li>
              <li><strong>ความไม่มีประสิทธิภาพในการแปลงอาหาร:</strong> วัวต้องกินอาหารปริมาณมหาศาลเพื่อสร้างโปรตีนเพียง 1 กิโลกรัมให้มนุษย์บริโภค เทียบกับไก่หรือหมูที่ใช้อาหารน้อยกว่ามาก</li>
            </ul>

            <h3>Plant-based Diet: ทางรอดของโลก?</h3>
            <p>
              อาหารที่มาจากพืช (Plant-based) เช่น ผัก ผลไม้ ถั่ว และธัญพืช มีค่าคาร์บอนฟุตพริ้นท์ที่ต่ำมาก เนื่องจากพืชอาศัยการสังเคราะห์แสงดึง CO2 จากอากาศมาสร้างการเจริญเติบโต การลดการบริโภคเนื้อสัตว์ (โดยเฉพาะเนื้อแดง) แล้วหันมาเพิ่มสัดส่วนโปรตีนจากพืช จึงเป็นหนึ่งในการลงมือทำที่ง่ายและทรงพลังที่สุดที่บุคคลธรรมดาจะช่วยกู้โลกได้
            </p>

            <h3>ข้อยกเว้นที่น่าสนใจ: "ข้าว"</h3>
            <p>
              แม้ข้าว (Rice) จะเป็นพืช แต่กลับมีคาร์บอนฟุตพริ้นท์สูงกว่าข้าวสาลีหรือเต้าหู้ สาเหตุมาจาก <strong>นาข้าวที่มีน้ำขัง</strong> ทำให้เกิดแบคทีเรียย่อยสลายอินทรียวัตถุแบบไร้ออกซิเจน ซึ่งก่อให้เกิดก๊าซมีเทนลอยสู่ชั้นบรรยากาศนั่นเอง (ปัจจุบันเกษตรกรจึงเริ่มหันมาใช้วิธีทำนาแบบเปียกสลับแห้งเพื่อลดปัญหานี้)
            </p>

            <p>
              <strong>ลองนึกภาพ:</strong> การกินสเต็กเนื้อวัวชิ้นใหญ่ 1 กิโลกรัม ปล่อยคาร์บอนเทียบเท่ากับการขับรถยนต์น้ำมันไปไกลเกือบ 500 กิโลเมตร! มื้อต่อไปของคุณ ลองใช้เครื่องมือ <em>คำนวณคาร์บอนฟุตพริ้นท์อาหาร</em> ของเรา เพื่อประกอบการตัดสินใจเลือกมื้ออร่อยที่เป็นมิตรกับสิ่งแวดล้อมมากขึ้นกันเถอะ
            </p>
          </>
        ) : (
          <>
            <p>
              Many people are surprised to learn that the global <strong>Food System</strong>—encompassing agriculture, livestock rearing, processing, and transportation—accounts for approximately 26%, or a quarter, of global greenhouse gas emissions. What you choose to put on your plate every day directly and significantly impacts global warming and climate change.
            </p>

            <h3>Why Does Beef Have the Highest Carbon Footprint?</h3>
            <p>
              If you use our calculator to compare 1 kg of <strong>Beef</strong> with 1 kg of <strong>Tofu</strong>, the difference is staggering. Beef produces nearly 30 times more emissions! There are three primary reasons for this:
            </p>
            <ul>
              <li><strong>Methane Emissions (Enteric Fermentation):</strong> Cows and sheep are ruminants. Their digestive process involves microbial fermentation, causing them to burp large amounts of methane—a greenhouse gas that is 25-28 times more potent than CO2 at trapping heat.</li>
              <li><strong>Land Use Change:</strong> Large-scale beef production requires immense tracts of land for both grazing and growing animal feed (like soy and corn). This leads to widespread deforestation, destroying the planet's natural carbon sinks.</li>
              <li><strong>Feed Conversion Inefficiency:</strong> Cattle require a massive amount of caloric input (feed) to produce just 1 kg of edible protein for humans, making them far less efficient than poultry or pork.</li>
            </ul>

            <h3>The Power of Plant-Based Diets</h3>
            <p>
              Plant-based foods like vegetables, fruits, legumes, and grains inherently have low carbon footprints because they grow by absorbing CO2 from the atmosphere via photosynthesis. Reducing meat consumption (especially red meat) and shifting towards plant-based protein is scientifically recognized as one of the single most effective actions an individual can take to reduce their environmental impact.
            </p>

            <h3>An Interesting Exception: Rice</h3>
            <p>
              You might notice that Rice has a higher footprint than other plant foods like wheat or tofu. This is because traditional rice cultivation involves flooding paddies. The flooded, oxygen-free soils create the perfect environment for microbes that generate methane gas. (This is why agricultural scientists are pushing for "Alternate Wetting and Drying" farming techniques).
            </p>

            <p>
              <strong>Perspective:</strong> Eating 1 kilogram of beef generates roughly the same amount of greenhouse gases as driving an average petrol car for nearly 500 kilometers! Next time you plan a meal or go grocery shopping, use our <em>Food Carbon Footprint Calculator</em> to make informed, Earth-friendly culinary choices.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

// 11. FruitFermentationFormula
export function FruitFermentationFormula({ lang }: { lang: any }) {
  const [fruitWeight, setFruitWeight] = useState<number>(3);
  const [ratioType, setRatioType] = useState<string>("standard3110");
  const [sugarRatio, setSugarRatio] = useState<number>(1);
  const [waterRatio, setWaterRatio] = useState<number>(10);
  const [fruitRatio, setFruitRatio] = useState<number>(3);
  const [fermentType, setFermentType] = useState<string>("bio");

  const calculate = () => {
    let sRatio = 1;
    let wRatio = 10;
    let fRatio = 3;

    if (ratioType === "standard3110") {
      sRatio = 1;
      wRatio = 10;
      fRatio = 3;
    } else if (ratioType === "cider") {
      sRatio = 0.15; // approximate cider sugar additions if needed
      wRatio = 2.5; // low water for rich juice
      fRatio = 1;
    } else {
      sRatio = sugarRatio;
      wRatio = waterRatio;
      fRatio = fruitRatio;
    }

    const sugarWeight = fRatio > 0 ? fruitWeight * (sRatio / fRatio) : 0;
    const waterVolume = fRatio > 0 ? fruitWeight * (wRatio / fRatio) : 0;
    const yeastNeeded = fermentType !== "bio" ? (waterVolume * 0.3) : 0; // ~0.3g per L

    // Fermentation details
    let timeRange = "3 - 6 months";
    let alcoholPotential = "0% (Non-alcoholic)";
    let tempRange = "20°C - 30°C";

    if (fermentType === "cider") {
      timeRange = "2 - 4 weeks";
      alcoholPotential = "4.5% - 7.5% ABV";
      tempRange = "15°C - 22°C";
    } else if (fermentType === "wine") {
      timeRange = "4 - 8 weeks";
      alcoholPotential = "11.0% - 14.0% ABV";
      tempRange = "18°C - 24°C";
    } else if (fermentType === "vinegar") {
      timeRange = "1 - 3 months";
      alcoholPotential = "0.5% - 1.5% ABV";
      tempRange = "25°C - 32°C";
    }

    return {
      sugarWeight: sugarWeight.toFixed(2),
      waterVolume: waterVolume.toFixed(1),
      yeastNeeded: yeastNeeded.toFixed(1),
      timeRange,
      alcoholPotential,
      tempRange
    };
  };

  const results = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
          <Utensils className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">
            {lang === "TH" ? "เครื่องมือคำนวณสูตรน้ำหมักผลไม้" : "Fruit Fermentation Formula Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "คำนวณน้ำหนักน้ำตาล ปริมาณน้ำ และยีสต์ที่ต้องใช้สำหรับการหมักผลไม้แต่ละรูปแบบ" : "Calculate sugar, water, and yeast ratios for fruit fermentations and cider."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "น้ำหนักผลไม้ที่ต้องการหมัก (กก.)" : "Fruit Weight (kg)"}</label>
            <input 
              type="number" 
              className={inputClass} 
              value={fruitWeight} 
              onChange={(e) => setFruitWeight(Math.max(0.1, parseFloat(e.target.value) || 0))} 
            />
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "สูตรและสัดส่วนที่ใช้งาน" : "Ratio Formula"}</label>
            <select 
              className={inputClass} 
              value={ratioType} 
              onChange={(e) => setRatioType(e.target.value)}
            >
              <option value="standard3110">{lang === "TH" ? "หมักเอนไซม์ชีวภาพ (ผลไม้ 3 : น้ำตาล 1 : น้ำ 10)" : "Bio-enzyme (Fruit 3 : Sugar 1 : Water 10)"}</option>
              <option value="cider">{lang === "TH" ? "ไซเดอร์ผลไม้สูตรเข้มข้น (ผลไม้ 1 : น้ำตาล 0.15 : น้ำ 2.5)" : "Concentrated Cider (Fruit 1 : Sugar 0.15 : Water 2.5)"}</option>
              <option value="custom">{lang === "TH" ? "กำหนดสัดส่วนเอง (Custom Ratio)" : "Custom Ratio"}</option>
            </select>
          </div>

          {ratioType === "custom" && (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className={labelClass}>{lang === "TH" ? "ผลไม้ (ส่วน)" : "Fruit (parts)"}</label>
                <input 
                  type="number" 
                  className={inputClass} 
                  value={fruitRatio} 
                  onChange={(e) => setFruitRatio(Math.max(0.1, parseFloat(e.target.value) || 1))} 
                />
              </div>
              <div>
                <label className={labelClass}>{lang === "TH" ? "น้ำตาล (ส่วน)" : "Sugar (parts)"}</label>
                <input 
                  type="number" 
                  className={inputClass} 
                  value={sugarRatio} 
                  onChange={(e) => setSugarRatio(Math.max(0, parseFloat(e.target.value) || 0))} 
                />
              </div>
              <div>
                <label className={labelClass}>{lang === "TH" ? "น้ำสะอาด (ส่วน)" : "Water (parts)"}</label>
                <input 
                  type="number" 
                  className={inputClass} 
                  value={waterRatio} 
                  onChange={(e) => setWaterRatio(Math.max(0, parseFloat(e.target.value) || 0))} 
                />
              </div>
            </div>
          )}

          <div>
            <label className={labelClass}>{lang === "TH" ? "รูปแบบและวัตถุประสงค์การหมัก" : "Fermentation Type"}</label>
            <select 
              className={inputClass} 
              value={fermentType} 
              onChange={(e) => setFermentType(e.target.value)}
            >
              <option value="bio">{lang === "TH" ? "หมักเอนไซม์ชีวภาพ (ใช้ฉีดพ่น / ซักล้าง / ดับกลิ่น)" : "Bio-enzyme (Cleaning/Agri)"}</option>
              <option value="cider">{lang === "TH" ? "หมักทำไซเดอร์ดื่มง่ายแอลกอฮอล์ต่ำ (Cider)" : "Cider (Low ABV)"}</option>
              <option value="wine">{lang === "TH" ? "หมักทำไวน์ผลไม้รสเข้มเข้มข้น (Fruit Wine)" : "Fruit Wine (High ABV)"}</option>
              <option value="vinegar">{lang === "TH" ? "หมักทำน้ำส้มสายชูเพื่อสุขภาพ (Vinegar)" : "Fruit Vinegar"}</option>
            </select>
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col justify-between border border-emerald-100 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {lang === "TH" ? "📋 สรุปปริมาณวัตถุดิบและสภาวะหมัก" : "📋 Recipe & Fermentation Summary"}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "น้ำตาลทราย/น้ำผึ้งที่ต้องใช้:" : "Required Sugar:"}</span>
                <span className="font-bold text-gray-800 dark:text-white text-md">{results.sugarWeight} kg</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "น้ำสะอาดที่ต้องเติม:" : "Required Clean Water:"}</span>
                <span className="font-bold text-gray-800 dark:text-white text-md">{results.waterVolume} L</span>
              </div>
              {fermentType !== "bio" && (
                <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ปริมาณยีสต์ผงแนะนำ:" : "Recommended Yeast:"}</span>
                  <span className="font-bold text-gray-800 dark:text-white">{results.yeastNeeded} g</span>
                </div>
              )}
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ระยะเวลาการหมักเฉลี่ย:" : "Fermentation Time:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.timeRange}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ระดับแอลกอฮอล์ประเมิน:" : "Est. Alcohol ABV:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.alcoholPotential}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "อุณหภูมิควบคุมแนะนำ:" : "Target Temperature:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.tempRange}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalculationSteps 
        steps={lang === "TH" ? [
          "คำนวณสัดส่วนตามสัดส่วนคูณ: นำน้ำหนักผลไม้มาหารด้วยจำนวนสัดส่วนผลไม้เพื่อให้ได้ค่าน้ำหนัก 1 ส่วน",
          "หาน้ำหนักน้ำตาลทรายและน้ำดื่ม: นำน้ำหนัก 1 ส่วนที่คำนวณไว้มาคูณสัดส่วนส่วนผสมอื่นตามความต้องการ",
          "ประเมินปริมาณยีสต์ผง: สำหรับการหมักเพื่อดื่ม ควรเลือกใช้ยีสต์ไวน์และบวกเพิ่ม 0.3 กรัมต่อน้ำดื่มทุกๆ 1 ลิตร",
          "กำหนดสภาพแวดล้อม: ควบคุมสภาวะอุณหภูมิและหลีกเลี่ยงอากาศที่เย็นหรือร้อนจัดเพื่อไม่ให้จุลินทรีย์หยุดทำงาน"
        ] : [
          "Determine the base unit weight by dividing the fruit weight by the fruit ratio parts.",
          "Multiply the base unit weight by the sugar and water ratio parts to get target weights.",
          "Estimate yeast: For edible ferments, calculate yeast addition of roughly 0.3g per liter of water.",
          "Ensure setup control: Limit temperature exposure to prevent active yeast or bacteria from dying."
        ]} 
      />

      <SEOFAQ>
        <FAQItem 
          question="สูตรหมักผลไม้แบบเอนไซม์ชีวภาพ 3:1:10 คืออะไร และใช้น้ำตาลอะไรชงชงถึงปลอดภัย?"
          answer="สูตร 3:1:10 คือสัดส่วนน้ำหนักมาตรฐานระดับโลกในการหมักน้ำเอนไซม์ชีวภาพ (Bio-enzyme) หรือน้ำหมักขยะอินทรีย์ ประกอบด้วย: ผลไม้/ผักสดปัดเศษ 3 ส่วน น้ำตาลทรายแดงหรือกากน้ำตาล (Molasses) 1 ส่วน และน้ำสะอาดปราศจากคลอรีน 10 ส่วน น้ำตาลทรายแดงและกากน้ำตาลจะมีสารอาหารและแร่ธาตุแฝงอยู่มากซึ่งเป็นแหล่งพลังงานชั้นดีของแบคทีเรียแลคโตบาซิลลัส ช่วยให้การย่อยสลายเป็นไปอย่างสมบูรณ์แบบโดยไม่ต้องใช้เชื้อสังเคราะห์เพิ่มเติม"
        />
        <FAQItem 
          question="ทำไมการทำไวน์ผลไม้หรือไซเดอร์ (Cider) ถึงจำเป็นต้องใส่ยีสต์เฉพาะทาง แทนที่จะปล่อยธรรมชาติ?"
          answer="การปล่อยให้หมักเองตามธรรมชาติ (Wild fermentation) จะพึ่งพาจุลินทรีย์ท้องถิ่นในอากาศ ซึ่งมีความไม่เสถียรสูงและเสี่ยงต่อการเกิดเชื้อราหรือแบคทีเรียสร้างกรดส้มทำให้รสชาติบูดเปรี้ยว การใส่ยีสต์สำหรับทำไวน์โดยเฉพาะ (Wine/Cider Yeast) ที่ผ่านการเพาะเลี้ยงในห้องแล็บจะช่วยควบคุมสายพันธุ์การเปลี่ยนน้ำตาลให้เป็นแอลกอฮอล์ที่แน่นอน ให้คุณภาพรสชาติตามเป้าหมาย ลดปริมาณสารพิษเมทานอล และช่วยให้ได้ความใสของเครื่องดื่มที่ดีขึ้น"
        />
        <FAQItem 
          question="จะสังเกตความแตกต่างอย่างไรระหว่างถังหมักที่ปกติกับการหมักที่ปนเปื้อนเชื้อโรค?"
          answer="ถังหมักที่ปกติ: จะต้องเกิดฟองก๊าซคาร์บอนไดออกไซด์ปุดขึ้นมาเป็นระยะอย่างช้าๆ ในช่วงสัปดาห์แรกๆ น้ำหมักมีกลิ่นหอมเปรี้ยวอมหวานคล้ายแอลกอฮอล์หรือกลิ่นเหล้าผลไม้ ส่วนถังหมักที่ปนเปื้อนเสีย: จะมีกลิ่นเหม็นเน่า กลิ่นน้ำเน่า หรือเหม็นเปรี้ยวแหลมรุนแรงคล้ายถุงเท้าเปียกชื้น มีฝ้าเชื้อราสีดำ สีเขียว หรือสีส้มเกิดขึ้นที่ผิวหน้าผลไม้ หากพบฝ้าราสีเข้มเหล่านี้ควรเทน้ำหมักทิ้งทันทีเพราะเป็นสารพิษที่เป็นอันตรายต่อสุขภาพ"
        />
        <FAQItem 
          question="ประโยชน์ของน้ำส้มสายชูหมักผลไม้ (Fruit Vinegar) และการหมักแบบข้ามขั้นต่างจากเอนไซม์อย่างไร?"
          answer="การทำน้ำส้มสายชูหมัก (เช่น Apple Cider Vinegar) คือปฏิกิริยาหมัก 2 ขั้นตอน (Double Fermentation) ขั้นแรก ยีสต์จะเปลี่ยนน้ำตาลในผลไม้เป็นแอลกอฮอล์จนได้ไวน์ผลไม้ จากนั้นแบคทีเรียกรดอะซิติก (Acetic Acid Bacteria) จะเปลี่ยนแอลกอฮอล์นั้นให้เป็นกรดส้มอะซิติกที่มีประโยชน์สูงต่อระบบย่อยอาหาร ช่วยคุมเบาหวานและไขมัน ต่างจากเอนไซม์ชีวภาพเกษตรที่เป้าหมายเน้นการสลายโปรตีนและอินทรียวัตถุเพื่อทำเป็นน้ำปุ๋ยบำรุงพืชดิน"
        />
      </SEOFAQ>
    </div>
  );
}

// 12. EventIceEstimator
export function EventIceEstimator({ lang }: { lang: any }) {
  const [guests, setGuests] = useState<number>(80);
  const [duration, setDuration] = useState<number>(4);
  const [weather, setWeather] = useState<string>("warm");
  const [usageType, setUsageType] = useState<string>("drinksChilling");
  const [bagSize, setBagSize] = useState<number>(10);

  const calculate = () => {
    // Base ice in kg per person per hour
    let baseRate = 0.2;
    if (weather === "cool") baseRate = 0.15;
    else if (weather === "veryhot") baseRate = 0.35;

    // Additional rate based on usage
    let addition = 0.05;
    if (usageType === "drinksChilling") addition = 0.15;
    else if (usageType === "heavy") addition = 0.25;

    const totalRate = baseRate + addition;
    const totalIce = guests * duration * totalRate;
    const totalBags = Math.ceil(totalIce / bagSize);

    return {
      totalIce: totalIce.toFixed(1),
      totalBags: totalBags,
      perPerson: (totalIce / guests).toFixed(1)
    };
  };

  const results = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
          <RefreshCw className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">
            {lang === "TH" ? "เครื่องมือคำนวณปริมาณน้ำแข็งสำหรับงานเลี้ยง" : "Event Ice Quantity Estimator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "ประเมินจำนวนกระสอบน้ำแข็งที่ต้องสั่งซื้อตามจำนวนแขก สภาพอากาศ และระดับความต้องการใช้งาน" : "Estimate total bags of ice required for cooling beverages and guest drinks."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "จำนวนผู้เข้าร่วมงาน (คน)" : "Guest Count"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={guests} 
                onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ระยะเวลาจัดงาน (ชั่วโมง)" : "Duration (Hours)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={duration} 
                onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 0))} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "สภาพอากาศ / สถานที่" : "Weather/Season"}</label>
              <select 
                className={inputClass} 
                value={weather} 
                onChange={(e) => setWeather(e.target.value)}
              >
                <option value="cool">{lang === "TH" ? "ห้องแอร์ / อากาศเย็น (~22°C)" : "Indoor AC (~22°C)"}</option>
                <option value="warm">{lang === "TH" ? "อุณหภูมิปกติทั่วไป (~28°C)" : "Standard Outdoor (~28°C)"}</option>
                <option value="veryhot">{lang === "TH" ? "ฤดูร้อนแดดจัด / กลางแจ้งร้อน" : "Very Hot Summer Outdoor"}</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ขนาดบรรจุกระสอบ (กก.)" : "Bag Weight Option"}</label>
              <select 
                className={inputClass} 
                value={bagSize} 
                onChange={(e) => setBagSize(parseInt(e.target.value) || 10)}
              >
                <option value="5">5 kg</option>
                <option value="10">10 kg</option>
                <option value="15">15 kg</option>
                <option value="20">20 kg</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "ระดับและวัตถุประสงค์การชงใช้" : "Usage Type"}</label>
            <select 
              className={inputClass} 
              value={usageType} 
              onChange={(e) => setUsageType(e.target.value)}
            >
              <option value="drinksOnly">{lang === "TH" ? "ใส่แก้วเครื่องดื่มบริการอย่างเดียว" : "Drinking cups service only"}</option>
              <option value="drinksChilling">{lang === "TH" ? "ใส่แก้วดื่มด้วย และแช่ขวดกระป๋องในถังน้ำแข็ง" : "Drinking + Chilling cans/bottles"}</option>
              <option value="heavy">{lang === "TH" ? "ปาร์ตี้บาร์เทนเดอร์หนัก / แช่ถังเบียร์ขนาดใหญ่" : "Heavy drinking & Large keg cooling"}</option>
            </select>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col justify-between border border-blue-100 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {lang === "TH" ? "❄️ ปริมาณน้ำแข็งที่ควรสั่งซื้อ" : "❄️ Suggested Ice Order"}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "น้ำหนักน้ำแข็งสุทธิรวม:" : "Total Ice Needed:"}</span>
                <span className="font-bold text-gray-800 dark:text-white text-md">{results.totalIce} kg</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "จำนวนกระสอบที่แนะนำสั่งซื้อ:" : "Number of Bags Needed:"}</span>
                <span className="font-bold text-lg text-blue-600 dark:text-blue-400">{results.totalBags} {lang === "TH" ? "กระสอบ" : "bags"}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "เฉลี่ยการบริโภคต่อคน:" : "Average per Person:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.perPerson} kg</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 text-xs text-blue-700 dark:text-blue-400">
              * {lang === "TH" ? "ข้อแนะ: ในวันจัดงาน น้ำแข็งจะมีการละลายทิ้งตามธรรมชาติประมาณ 20-30% ระหว่างขนย้ายและจัดเก็บ ควรเตรียมถังน้ำแข็งโฟมหรือตู้แช่เก็บความเย็นเพื่อลดการสูญเสีย" : "Catering tip: Expect 20-30% natural melting loss during transit and storage. Use well-insulated coolers to minimize melting."}
            </div>
          </div>
        </div>
      </div>

      <CalculationSteps 
        steps={lang === "TH" ? [
          "กำหนดสัดส่วนความต้องการน้ำแข็งเบื้องต้นต่อหัวต่อชั่วโมงตามเงื่อนไขอากาศ (เช่น อากาศอบอุ่นทั่วไปเท่ากับ 0.2 กิโลกรัม)",
          "บวกเพิ่มตัวแปรแช่เครื่องดื่ม: หากใช้แช่ขวดหรือกระป๋องเบียร์ด้วย ให้คูณหรือบวกเพิ่มความต้องการน้ำแข็งอีก 0.15 กิโลกรัมต่อหัว",
          "คำนวณยอดน้ำหนักรวม: ปริมาณน้ำแข็งรวม = แขก * ชั่วโมงการจัดงาน * (อัตราพื้นฐาน + ค่าเพิ่มตามรูปแบบ)",
          "แปลงเป็นจำนวนกระสอบ: นำยอดน้ำหนักสุทธิหารขนาดบรรจุของถุงจำหน่ายในท้องถิ่น และปัดเศษขึ้นเสมอกันเพื่อความเพียงพอ"
        ] : [
          "Select the baseline ice usage rate per hour according to weather conditions (e.g. 0.2kg/hr for warm weather).",
          "Apply utilization offsets: Add extra capacity if ice will be used for soaking beers and chilling kegs.",
          "Compute total gross kilograms: Guests * Duration * (Base rate + Usage offset).",
          "Convert to local bag counts: Divide total weight by selected bag capacity (e.g. 10kg) and round up."
        ]} 
      />

      <SEOFAQ>
        <FAQItem 
          question="การจัดเตรียมน้ำแข็งสำหรับคน 1 คนในงานเลี้ยงต้องใช้สัดส่วนมาตรฐานเท่าใด?"
          answer="เกณฑ์ประเมินสากลของสมาคมจัดเลี้ยงกำหนดว่า ควรเตรียมน้ำแข็งสำหรับบริโภคใส่แก้วไว้ที่ประมาณ 0.5 กิโลกรัม (ครึ่งกิโล) ต่อคน สำหรับงานเลี้ยงที่มีระยะเวลา 3-4 ชั่วโมง แต่หากเป็นงานปาร์ตี้กลางแจ้งและต้องใช้แช่กระป๋องเครื่องดื่มหรือแช่ขวดเบียร์ไวน์ร่วมด้วยในลังน้ำแข็งขนาดใหญ่ ควรเตรียมเพิ่มเป็น 1 ถึง 1.5 กิโลกรัมต่อคน การมีน้ำแข็งมากเกินไปยังคงดีกว่าน้ำแข็งหมดกลางคันที่ทำให้งานเลี้ยงขาดรสชาติ"
        />
        <FAQItem 
          question="น้ำแข็งประเภทต่างๆ เช่น น้ำแข็งหลอด น้ำแข็งยูนิต และน้ำแข็งบด มีความเหมาะสมต่อการใช้ในงานเลี้ยงต่างกันอย่างไร?"
          answer="น้ำแข็งแต่ละประเภทมีคุณสมบัติเฉพาะตัว: 1) น้ำแข็งหลอดเล็ก/ยูนิต: ละลายได้ช้า เหมาะสมที่สุดสำหรับใส่แก้วเครื่องดื่มน้ำอัดลมและวิสกี้โซดา 2) น้ำแข็งบดละเอียด: มีพื้นที่ผิวสัมผัสมาก ละลายเร็วแต่ให้ความเย็นจัดฉับพลัน เหมาะสำหรับการนำไปโปะแช่ขวดเบียร์หรืออาหารทะเลให้เย็นเฉียบ และ 3) น้ำแข็งก้อนเหลี่ยมสี่เหลี่ยม (Ice cube เกรดพรีเมียม): ละลายช้ามากที่สุด ให้ความโปร่งใสสวยงาม เหมาะมากกับแก้วค็อกเทลหรือกาแฟสกัดเย็นคุณภาพดี"
        />
        <FAQItem 
          question="สภาพอากาศและการจัดวางถังเก็บน้ำแข็งส่งผลกระทบต่ออัตราการสูญเสียจากการละลายอย่างไร?"
          answer="อุณหภูมิภายนอกที่สูงขึ้นทุกๆ 5 องศาเซลเซียสจะเร่งอัตราการละลายน้ำแข็งเร็วขึ้นเกือบ 30% อีกทั้งการวางถังน้ำแข็งไว้ในบริเวณลมโกรกแรงหรือโดนแสงแดดส่องโดยตรงจะทำให้ก๊าซละลายตัวเร็วขึ้นมาก การเลือกใช้กระติกเก็บความเย็นที่มีฉนวนหนา (เช่น ถังคูลเลอร์ระบบ Roto-molded) และการจัดวางถังไว้ในที่ร่มมีหลังคากลบจะช่วยปกป้องน้ำแข็งให้อยู่ครบถ้วนตามระยะเวลางานชั่วโมงจัดงาน"
        />
        <FAQItem 
          question="จะจัดการนำน้ำแข็งที่เหลือจำนวนมากหลังเสร็จงานเลี้ยงไปใช้ประโยชน์อะไรได้บ้างเพื่อลดความสูญเสีย?"
          answer="น้ำแข็งที่เหลือแต่ยังไม่ได้แกะถุง สามารถนำไปเก็บรักษาไว้ในช่องแช่ฟรีซตู้เย็นต่อ หรือใช้ในการแช่ผักสด เนื้อสัตว์แช่แข็งที่แพ็คกลับบ้าน หากแกะถุงแล้วละลายเป็นน้ำเย็นเฉียบ สามารถนำไปรดน้ำต้นไม้ในสวนได้ทันที ซึ่งช่วยประหยัดค่าน้ำอุปโภคได้ดี หรือนำไปใช้สำหรับการบ่มผักผลไม้สดเพื่อเตรียมสับเปลี่ยนทำอาหารมื้อเช้าในวันถัดไป"
        />
      </SEOFAQ>
    </div>
  );
}

// 13. DrinkingWaterCost
export function DrinkingWaterCost({ lang }: { lang: any }) {
  const [familySize, setFamilySize] = useState<number>(3);
  const [dailyIntake, setDailyIntake] = useState<number>(2.0);
  const [packPrice, setPackPrice] = useState<number>(55); // 6x1.5L = 9L
  const [gallonPrice, setGallonPrice] = useState<number>(85); // 18.9L gallon
  
  const [filterInitialCost, setFilterInitialCost] = useState<number>(5500);
  const [filterAnnualCost, setFilterAnnualCost] = useState<number>(1500);

  const calculate = () => {
    const dailyVolume = familySize * dailyIntake;
    const monthlyVolume = dailyVolume * 30;
    const annualVolume = dailyVolume * 365;

    // Option A: Bottled Water pack (6 bottles of 1.5L = 9 Liters)
    const packLiters = 9;
    const monthlyPackCost = (monthlyVolume / packLiters) * packPrice;
    const annualPackCost = (annualVolume / packLiters) * packPrice;

    // Option B: Gallon refilling (18.9 Liters per bottle)
    const gallonLiters = 18.9;
    const monthlyGallonCost = (monthlyVolume / gallonLiters) * gallonPrice;
    const annualGallonCost = (annualVolume / gallonLiters) * gallonPrice;

    // Option C: Water filtration system
    // Year 1: Initial purchase + annual filters
    const filterYear1Cost = filterInitialCost + filterAnnualCost;
    const filterYear2To5Cost = filterAnnualCost;

    // Savings calculations (Year 1 and 5 years total)
    const totalPack5Years = annualPackCost * 5;
    const totalGallon5Years = annualGallonCost * 5;
    const totalFilter5Years = filterInitialCost + (filterAnnualCost * 5);

    const savingPack5Years = totalPack5Years - totalFilter5Years;
    const savingGallon5Years = totalGallon5Years - totalFilter5Years;

    return {
      monthlyVolume: monthlyVolume.toFixed(0),
      annualVolume: annualVolume.toFixed(0),
      monthlyPack: monthlyPackCost.toFixed(0),
      annualPack: annualPackCost.toFixed(0),
      monthlyGallon: monthlyGallonCost.toFixed(0),
      annualGallon: annualGallonCost.toFixed(0),
      filterYear1: filterYear1Cost.toFixed(0),
      filterYear2: filterYear2To5Cost.toFixed(0),
      totalPack5Years: totalPack5Years.toFixed(0),
      totalFilter5Years: totalFilter5Years.toFixed(0),
      savingPack5Years: savingPack5Years.toFixed(0),
      savingGallon5Years: savingGallon5Years.toFixed(0),
      isFilterSavesPack: savingPack5Years > 0
    };
  };

  const results = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400">
          <Clock className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">
            {lang === "TH" ? "เปรียบเทียบค่าใช้จ่ายน้ำดื่ม" : "Drinking Water Cost Comparison Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "คำนวณและเปรียบเทียบต้นทุนระหว่างการซื้อน้ำขวดแพ็ค น้ำถัง และการใช้เครื่องกรองน้ำเพื่อการประหยัดระยะยาว" : "Compare monthly and annual expenses of buying bottled water vs water filters."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <h3 className="font-bold text-gray-700 dark:text-gray-300 border-b pb-1">🥤 อัตราการใช้น้ำสะอาด (Usage Profile)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "จำนวนสมาชิกในครอบครัว (คน)" : "Family Size (people)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={familySize} 
                onChange={(e) => setFamilySize(Math.max(1, parseInt(e.target.value) || 1))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ปริมาณดื่มต่อคนต่อวัน (ลิตร)" : "Daily Intake per Person (L)"}</label>
              <input 
                type="number" 
                step="0.1"
                className={inputClass} 
                value={dailyIntake} 
                onChange={(e) => setDailyIntake(Math.max(0.1, parseFloat(e.target.value) || 2.0))} 
              />
            </div>
          </div>

          <h3 className="font-bold text-gray-700 dark:text-gray-300 border-b pb-1 mt-4">📦 ทางเลือกน้ำขวดและน้ำถัง (Bottled Options)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ราคาน้ำขวดแพ็ค (฿/แพ็ค 6x1.5L)" : "Pack Price (฿ for 6x1.5L)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={packPrice} 
                onChange={(e) => setPackPrice(Math.max(1, parseFloat(e.target.value) || 1))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ราคาน้ำถังขนาดใหญ่ (฿/ถัง 18.9L)" : "Gallon Refill Price (฿/18.9L)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={gallonPrice} 
                onChange={(e) => setGallonPrice(Math.max(1, parseFloat(e.target.value) || 1))} 
              />
            </div>
          </div>

          <h3 className="font-bold text-gray-700 dark:text-gray-300 border-b pb-1 mt-4">🔧 ทางเลือกเครื่องกรองน้ำ (Filter Option)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าติดตั้งซื้อเครื่องกรองแรกเริ่ม" : "Initial System Cost (฿)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={filterInitialCost} 
                onChange={(e) => setFilterInitialCost(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าเปลี่ยนไส้กรองเฉลี่ยรายปี" : "Annual Filter Replacement (฿)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={filterAnnualCost} 
                onChange={(e) => setFilterAnnualCost(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col justify-between border border-indigo-100 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {lang === "TH" ? "🏁 ตารางเปรียบเทียบงบน้ำดื่ม" : "🏁 Financial Impact Comparison"}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ความต้องการใช้น้ำดื่มต่อปี:" : "Annual Water Volume needed:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.annualVolume} Liters</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "1) น้ำขวดแพ็ค (รายปี):" : "Bottled Water (Annual):"}</span>
                <span className="font-bold text-gray-800 dark:text-white text-rose-600 dark:text-rose-400">฿{results.annualPack}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "2) น้ำถัง 18.9L (รายปี):" : "Gallon Water (Annual):"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.annualGallon}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "3) เครื่องกรองน้ำ (ปีแรก/ปีถัดไป):" : "Water Filter (Yr 1 / Yr 2+):"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.filterYear1} / ฿{results.filterYear2}</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white dark:bg-gray-800 border border-indigo-100 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                {lang === "TH" ? "💰 ผลประโยชน์รวมสะสมในระยะเวลา 5 ปี" : "💰 5-Year Total Cost & Savings"}
              </p>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {lang === "TH" ? `ต้นทุนสะสมน้ำขวดแพ็ค: ฿${results.totalPack5Years}` : `5-Yr Bottled Pack Cost: ฿${results.totalPack5Years}`}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {lang === "TH" ? `ต้นทุนสะสมเครื่องกรองน้ำ: ฿${results.totalFilter5Years}` : `5-Yr Filter System Cost: ฿${results.totalFilter5Years}`}
                </p>
                <p className="text-md font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                  {results.isFilterSavesPack 
                    ? (lang === "TH" ? `เครื่องกรองน้ำประหยัดเงินรวมได้ ฿${results.savingPack5Years}!` : `Filtration saves you ฿${results.savingPack5Years} total!`)
                    : (lang === "TH" ? "โปรดป้อนราคาเพื่อคำนวณการประหยัด" : "Please adjust prices to compute savings.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalculationSteps 
        steps={lang === "TH" ? [
          "คำนวณน้ำสุทธิที่คนในบ้านดื่มรวมกันต่อปี: เอาจำนวนคน คูณปริมาณดื่มต่อคน แล้วคูณด้วย 365 วัน",
          "ประเมินค่าใช้จ่ายซื้อน้ำขวด: นำน้ำรวมมาเฉลี่ยหักน้ำขวดแพ็ค (แพ็คละ 9 ลิตร) แล้วคูณราคาแพ็คเกจ",
          "คำนวณยอดเงินสะสมซื้อเครื่องกรองน้ำ: ปีแรกบวกค่าอุปกรณ์ติดตั้งและไส้กรองแรก เริ่มปีต่อๆ ไปคิดเฉพาะไส้เปลี่ยนประจำปี",
          "เปรียบเทียบผลลัพธ์สะสม 5 ปี: ประเมินส่วนต่างเงินประหยัดรวมเพื่อแสดงผลการตัดสินใจลงมือติดตั้งที่ลดภาระรายเดือน"
        ] : [
          "Determine family's annual consumption: Multiply size by daily intake per capita and then by 365.",
          "Compute bottled pack expenses: Divide annual liters by 9 (liters in a pack) and multiply by package price.",
          "Track filtration setup expenses: Combine base system cost and filter swap costs across year 1, and only filter swaps in later years.",
          "Compare five-year net savings: Show the aggregate financial difference of using a filtration system over bottled options."
        ]} 
      />

      <SEOFAQ>
        <FAQItem 
          question="การใช้เครื่องกรองน้ำคุ้มค่ากว่าการซื้อน้ำขวดแพ็คพลาสติกมากน้อยเพียงใด?"
          answer="เครื่องกรองน้ำดื่มสามารถช่วยประหยัดเงินให้คุณและครอบครัวได้นับหมื่นบาทต่อปี สำหรับครอบครัวขนาดกลางที่มีสมาชิก 3-4 คน การซื้อน้ำขวดแพ็คขนาด 1.5 ลิตรมาดื่มจะมีค่าใช้จ่ายเฉลี่ยราว 800 - 1,200 บาทต่อเดือน หรือประมาณ 10,000 - 14,000 บาทต่อปี ขณะที่เครื่องกรองน้ำคุณภาพปานกลางจะใช้ทุนเริ่มแรกรวมค่าเปลี่ยนไส้กรองในปีถัดไปเฉลี่ยเพียงปีละ 1,500 - 2,500 บาทเท่านั้น จึงคืนทุนได้ในเวลาเพียง 6 เดือนแรก"
        />
        <FAQItem 
          question="น้ำดื่มประปาในเขตกรุงเทพฯ และปริมณฑล ปลอดภัยพอที่จะใช้เครื่องกรองน้ำชงชงดื่มจริงหรือ?"
          answer="ความจริงแล้ว น้ำประปาที่ผลิตจากการประปานครหลวงได้รับมาตรฐานความสะอาดเทียบเท่าเกณฑ์น้ำดื่มขององค์การอนามัยโลก (WHO) แต่ปัญหาความเสี่ยงมักเกิดจากคราบสกปรก คราบสนิม และสารตะกอนแขวนลอยในท่อนำส่งส่วนกลางที่ชำรุดทรุดโทรมตามกาลเวลา รวมถึงสภาพความสะอาดของถังพักน้ำในบ้าน การติดตั้งเครื่องกรองน้ำดื่มในบ้านอย่างเช่นระบบ RO หรือ UF จึงเป็นด่านปกป้องและขจัดคลอรีน กลิ่น และตะกอนปนเปื้อนที่มีประสิทธิภาพสูง ปลอดภัยต่อร่างกาย 100%"
        />
        <FAQItem 
          question="ระบบเครื่องกรองน้ำประปา RO, UF, และ UV มีความต่างและข้อดี-ข้อเสียอย่างไรบ้าง?"
          answer="ความแตกต่างหลักคือขนาดช่องว่างการกรอง: 1) ระบบ RO (Reverse Osmosis): กรองละเอียดที่สุดถึง 0.0001 ไมครอน ขจัดทุกโมเลกุลปนเปื้อน โซเดียม คาร์บอเนต ผลลัพธ์เป็นน้ำดื่มบริสุทธิ์สะอาดที่สุด แต่จะมีน้ำเสียทิ้งจากการกรองประมาณ 50% 2) ระบบ UF (Ultra Filtration): ความละเอียด 0.01 ไมครอน กรองเชื้อโรคได้ดีแต่ยังเก็บรักษาแร่ธาตุธรรมชาติไว้ในน้ำ ไม่ต้องใช้ไฟฟ้าและไม่มีน้ำเสียทิ้ง 3) ระบบ UV (Ultra Violet): ใช้รังสีแสงในการฆ่าเชื้อแบคทีเรียและไวรัส มักทำงานร่วมกับไส้กรองคาร์บอน"
        />
        <FAQItem 
          question="นอกเหนือจากผลดีทางด้านการเงิน การใช้เครื่องกรองน้ำมีส่วนช่วยสิ่งแวดล้อมอย่างไร?"
          answer="ครอบครัว 3 คนดื่มน้ำประมาณ 2,200 ลิตรต่อปี หากซื้อผ่านน้ำขวดพลาสติกขนาด 1.5 ลิตร จะก่อขยะขวดพลาสติก (PET) จำนวนมากถึง 1,400-1,500 ขวดต่อปี ซึ่งขยะพลาสติกเหล่านี้ใช้เวลาสลายตัวนานกว่า 450 ปีและส่วนใหญ่ลงท้ายด้วยการก่อมลพิษไมโครพลาสติกในทะเล การใช้เครื่องกรองน้ำร่วมกับขวดน้ำเก็บอุณหภูมิส่วนตัวจึงเป็นทางออกที่ช่วยลดการปล่อยคาร์บอนฟุตพริ้นท์และช่วยรักษาสิ่งแวดล้อมโลกได้อย่างมีประสิทธิภาพสูงสุด"
        />
      </SEOFAQ>
    </div>
  );
}

// 14. WeeklyRestaurantStock
export function WeeklyRestaurantStock({ lang }: { lang: any }) {
  const [dailySales, setDailySales] = useState<number>(60);
  const [usagePerDish, setUsagePerDish] = useState<number>(120); // grams
  const [leadTime, setLeadTime] = useState<number>(3); // days
  const [safetyDays, setSafetyDays] = useState<number>(2); // days
  const [stockOnHand, setStockOnHand] = useState<number>(5000); // grams

  const calculate = () => {
    const dailyDemand = dailySales * usagePerDish;
    const weeklyDemand = dailyDemand * 7;
    const safetyStock = dailyDemand * safetyDays;
    const reorderPoint = (dailyDemand * leadTime) + safetyStock;
    const suggestOrder = (weeklyDemand + safetyStock) - stockOnHand;
    const finalSuggestOrder = suggestOrder > 0 ? suggestOrder : 0;

    return {
      dailyDemandKg: (dailyDemand / 1000).toFixed(2),
      weeklyDemandKg: (weeklyDemand / 1000).toFixed(2),
      safetyStockKg: (safetyStock / 1000).toFixed(2),
      reorderPointKg: (reorderPoint / 1000).toFixed(2),
      suggestOrderKg: (finalSuggestOrder / 1000).toFixed(2)
    };
  };

  const results = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">
            {lang === "TH" ? "คำนวณปริมาณวัตถุดิบร้านอาหาร" : "Weekly Restaurant Stock & Reorder Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "คำนวณปริมาณความต้องการวัตถุดิบ จุดสั่งซื้อใหม่ และสต็อกเพื่อความปลอดภัยป้องกันวัตถุดิบขาดแคลน" : "Determine raw material demand, safety stock level, and reorder threshold."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ยอดขายเป้าหมายต่อวัน (จาน)" : "Daily Dish Sales"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={dailySales} 
                onChange={(e) => setDailySales(Math.max(0, parseInt(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ปริมาณที่ใช้ต่อจาน (กรัม/มล.)" : "Qty per Serving (g)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={usagePerDish} 
                onChange={(e) => setUsagePerDish(Math.max(1, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className={labelClass}>{lang === "TH" ? "เวลารอของ (วัน)" : "Lead Time (days)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={leadTime} 
                onChange={(e) => setLeadTime(Math.max(0, parseInt(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "วันสำรองสต็อก (วัน)" : "Safety Stock (days)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={safetyDays} 
                onChange={(e) => setSafetyDays(Math.max(0, parseInt(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ปริมาณคลังที่มี (กรัม)" : "Current Stock (g)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={stockOnHand} 
                onChange={(e) => setStockOnHand(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col justify-between border border-emerald-100 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {lang === "TH" ? "📊 สรุปความต้องการคลังสต็อก" : "📊 Inventory Threshold & Order Quantity"}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ความต้องการใช้ต่อวัน:" : "Daily Ingredient Demand:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.dailyDemandKg} kg</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ปริมาณสำรองปลอดภัย (Safety):" : "Safety Stock Level:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.safetyStockKg} kg</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400 font-bold text-amber-600 dark:text-amber-400">{lang === "TH" ? "จุดต่ำสุดที่ต้องสั่งเพิ่ม (Reorder Point):" : "Reorder Threshold:"}</span>
                <span className="font-extrabold text-amber-600 dark:text-amber-400">{results.reorderPointKg} kg</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-700 dark:text-gray-300 font-bold">{lang === "TH" ? "ปริมาณที่แนะนำสั่งซื้อใหม่สัปดาห์นี้:" : "Suggested Order Quantity:"}</span>
                <span className="font-black text-lg text-emerald-600 dark:text-emerald-400">
                  {results.suggestOrderKg === "0.00" ? (lang === "TH" ? "มีพอแล้ว ไม่ต้องสั่ง" : "Stock Sufficient") : `${results.suggestOrderKg} kg`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalculationSteps 
        steps={lang === "TH" ? [
          "คำนวณความต้องการใช้วัตถุดิบประจำวัน: ยอดขายรายวัน (จาน) คูณกับ น้ำหนักวัตถุดิบเฉลี่ยที่ใช้ต่อ 1 จาน",
          "ประเมินปริมาณสต็อกฉุกเฉิน (Safety Stock): นำความต้องการใช้วันละกิโลกรัม คูณกับจำนวนวันเผื่อขนส่งช้าหรือขายดีพิเศษ",
          "วิเคราะห์จุด Reorder Point (จุดสั่งของเพิ่ม): (ความต้องการใช้ระหว่างรอขนส่งใน Lead Time) + ปริมาณสต็อกสำรอง",
          "หาข้อสรุปจำนวนสั่งซื้อที่ต้องการ: (ความต้องการสัปดาห์นี้ + ปริมาณสำรองความปลอดภัย) หักลบสต็อกที่ยังมีพร้อมใช้หน้าเตา"
        ] : [
          "Calculate daily ingredient demand: Daily dish sales * ingredient weight used per serving.",
          "Identify safety stock reserves: Daily demand * designated buffer days for shipping delays or high sales.",
          "Determine reorder point: (Daily demand * lead time days) + safety stock.",
          "Deduce purchase order amount: (Weekly demand + safety stock) - current stock-on-hand."
        ]} 
      />

      <SEOFAQ>
        <FAQItem 
          question="ทำไมระบบ Safety Stock (สต็อกสำรองเพื่อความปลอดภัย) ถึงมีความสำคัญมากในร้านอาหาร?"
          answer="Safety Stock คือตัวเลขปริมาณวัตถุดิบสำรองที่ร้านเก็บไว้เพื่อรับมือกับปัญหาที่คาดเดาไม่ได้ 2 ประการ: 1) ความผันผวนของยอดขาย เช่น ในวันที่ร้านขายดีขึ้นพิเศษ 20-30% หรือมีจองโต๊ะกลุ่มใหญ่เข้ามาปุบปับ และ 2) ปัญหาฝั่งผู้ผลิตขนส่ง เช่น ซัพพลายเออร์ส่งสินค้าช้ากว่ากำหนด 1-2 วันเนื่องจากสภาพอากาศหรือการจราจรติดขัด หากไม่มีสต็อกสำรองตรงนี้จะทำให้ร้านสูญเสียโอกาสขายและทำให้ลูกค้าเสียความรู้สึก"
        />
        <FAQItem 
          question="วิธีประยุกต์ใช้ Reorder Point (จุดสั่งซื้อใหม่) ในการทำงานครัวประจำวันทำอย่างไร?"
          answer="ผู้จัดการร้านควรทำป้ายบอกระดับน้ำหนักวัตถุดิบ (เช่น แถบสีแดงติดที่ถังแป้งหรือป้ายกระดาษข้างตู้อาหารสด) เมื่อพนักงานในครัวตักวัตถุดิบจนลดลงมาแตะขีดระดับ Reorder Point ที่คำนวณไว้ จะเป็นสัญญาณอัตโนมัติแจ้งเตือนทันทีว่าถึงเวลาทำเอกสารสั่งซื้อชุดใหม่ส่งไปซัพพลายเออร์ ซึ่งจะช่วยป้องกันวัตถุดิบหมดกลางคันโดยไม่เพิ่มภาระพื้นที่จัดเก็บตู้แช่"
        />
        <FAQItem 
          question="ปัญหาการสั่งวัตถุดิบมากเกินไป (Overstocking) ส่งผลกระทบด้านใดกับร้านอาหารบ้าง?"
          answer="การเก็บสต็อกของสดไว้มากเกินความต้องการส่งผลเสียโดยตรง 3 ประการ: 1) ต้นทุนจม (Sunk capital): เงินสดของร้านถูกนำไปเปลี่ยนเป็นวัตถุดิบค้างคลังทำให้ขาดกระแสเงินสดหมุนเวียน 2) ขยะของเน่าเสีย (Food waste): ผักสด ผลไม้ นม หรือเนื้อสัตว์จะเริ่มเหี่ยวเฉาหมดอายุตามอายุไข 3) พื้นที่เก็บจำกัด: ตู้แช่แข็งทำงานหนักขึ้น กินไฟสูงขึ้น และจัดของระบบเข้าก่อนออกก่อน (FIFO) ได้ยากจนเกิดความวุ่นวาย"
        />
        <FAQItem 
          question="จะสามารถลดระยะเวลารอจัดส่งสินค้า (Lead Time) จากคู่ค้าได้อย่างไรบ้าง?"
          answer="เราสามารถลดเวลารอสินค้าลงได้ผ่านแนวทาง: 1) เปลี่ยนไปใช้ซัพพลายเออร์ในท้องถิ่นที่อยู่ใกล้ร้านเพื่อการจัดส่งด่วนพิเศษ 2) จัดตารางทำความตกลงการจัดส่งที่ชัดเจนและแน่นอนเป็นรายสัปดาห์ (เช่น จัดส่งทุกๆ วันจันทร์และวันพฤหัสบดี) 3) หาคู่ค้าสำรองอย่างน้อย 1-2 แหล่งในพื้นที่ตลาดใกล้เคียง และ 4) ใช้แพลตฟอร์มบริหารซัพพลายเชนร่วมกันเพื่อประมวลคำสั่งซื้อส่งตรงอัตโนมัติเมื่อระบบเตือน Reorder Point"
        />
      </SEOFAQ>
    </div>
  );
}

// 15. MonthlySupplementCost
export function MonthlySupplementCost({ lang }: { lang: any }) {
  const [supplements, setSupplements] = useState<any[]>([
    { name: "วิตามินซี / Vitamin C", price: 350, totalPills: 60, dailyDosage: 1 },
    { name: "น้ำมันปลา / Fish Oil", price: 590, totalPills: 90, dailyDosage: 2 },
    { name: "เวย์โปรตีน / Whey Protein (servings)", price: 1200, totalPills: 30, dailyDosage: 1 }
  ]);

  const addRow = () => {
    setSupplements([...supplements, { name: "", price: 0, totalPills: 1, dailyDosage: 1 }]);
  };

  const removeRow = (index: number) => {
    const next = [...supplements];
    next.splice(index, 1);
    setSupplements(next);
  };

  const updateRow = (index: number, key: string, val: any) => {
    const next = [...supplements];
    next[index][key] = val;
    setSupplements(next);
  };

  const calculate = () => {
    let totalDaily = 0;
    const itemsDetail = supplements.map((item) => {
      const price = parseFloat(item.price) || 0;
      const pills = parseFloat(item.totalPills) || 1;
      const dosage = parseFloat(item.dailyDosage) || 0;

      const pricePerUnit = pills > 0 ? price / pills : 0;
      const dailyCost = pricePerUnit * dosage;
      totalDaily += dailyCost;

      const monthlyCost = dailyCost * 30;
      const annualCost = dailyCost * 365;
      const bottleLastsDays = dosage > 0 ? Math.floor(pills / dosage) : 0;

      return {
        ...item,
        dailyCost: dailyCost.toFixed(2),
        monthlyCost: monthlyCost.toFixed(0),
        annualCost: annualCost.toFixed(0),
        bottleLastsDays
      };
    });

    const totalMonthly = totalDaily * 30;
    const totalAnnual = totalDaily * 365;

    return {
      itemsDetail,
      totalDaily: totalDaily.toFixed(2),
      totalMonthly: totalMonthly.toFixed(0),
      totalAnnual: totalAnnual.toFixed(0)
    };
  };

  const results = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-2xl text-red-600 dark:text-red-400">
          <Flame className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">
            {lang === "TH" ? "เครื่องมือคำนวณค่าใช้จ่ายอาหารเสริม" : "Monthly Supplement Cost Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "คำนวณต้นทุนการกินวิตามินและผลิตภัณฑ์อาหารเสริมต่างๆ ต่อเม็ด ต่อวัน รายเดือน และงบประเมินรายปี" : "Calculate and manage your supplement budget per pill, day, month, and year."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-700 dark:text-gray-300">{lang === "TH" ? "รายการวิตามิน/อาหารเสริมที่ทาน" : "Supplements Details"}</h3>
            <button 
              onClick={addRow} 
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs flex items-center gap-1 transition"
            >
              <Plus className="w-3.5 h-3.5" /> {lang === "TH" ? "เพิ่มอาหารเสริม" : "Add Row"}
            </button>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {supplements.map((item, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl relative">
                <input 
                  type="text" 
                  placeholder={lang === "TH" ? "ชื่ออาหารเสริม" : "Supplement Name"} 
                  className={`${inputClass} sm:col-span-1`} 
                  value={item.name} 
                  onChange={(e) => updateRow(index, "name", e.target.value)} 
                />
                <input 
                  type="number" 
                  placeholder={lang === "TH" ? "ราคาขวดกระปุก (฿)" : "Bottle Price (฿)"} 
                  className={inputClass} 
                  value={item.price || ""} 
                  onChange={(e) => updateRow(index, "price", e.target.value)} 
                />
                <input 
                  type="number" 
                  placeholder={lang === "TH" ? "จำนวนเม็ดรวมในขวด" : "Total Pills/Capsules"} 
                  className={inputClass} 
                  value={item.totalPills || ""} 
                  onChange={(e) => updateRow(index, "totalPills", e.target.value)} 
                />
                <div className="flex gap-1">
                  <input 
                    type="number" 
                    placeholder={lang === "TH" ? "ปริมาณที่ทานต่อวัน (เม็ด)" : "Daily Dose"} 
                    className={inputClass} 
                    value={item.dailyDosage || ""} 
                    onChange={(e) => updateRow(index, "dailyDosage", e.target.value)} 
                  />
                  <button 
                    onClick={() => removeRow(index)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col justify-between border border-red-100 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {lang === "TH" ? "💰 งบประมาณค่าอาหารเสริม" : "💰 Supplement Budget Summary"}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ค่าใช้จ่ายเฉลี่ยต่อวัน:" : "Daily Average Cost:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.totalDaily}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400 font-bold text-red-600 dark:text-red-400">{lang === "TH" ? "ยอดเฉลี่ยจ่ายรายเดือน:" : "Monthly Budget Total:"}</span>
                <span className="font-extrabold text-lg text-red-600 dark:text-red-400">฿{results.totalMonthly}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ยอดจ่ายสะสมรายปี:" : "Annual Budget Total:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.totalAnnual}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-2">{lang === "TH" ? "🔍 รายละเอียดอายุการหมดของแต่ละกระปุก" : "🔍 Bottle Lifespan Details"}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {results.itemsDetail.map((item, idx) => (
            <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs space-y-1">
              <p className="font-bold text-gray-800 dark:text-white">{item.name || `Supplement #${idx+1}`}</p>
              <p className="text-gray-600 dark:text-gray-400">{lang === "TH" ? `กินได้ประมาณ: ${item.bottleLastsDays} วัน` : `Lasts: ${item.bottleLastsDays} days`}</p>
              <p className="text-gray-600 dark:text-gray-400">{lang === "TH" ? `เฉลี่ยต่อเดือน: ฿${item.monthlyCost}` : `Monthly: ฿${item.monthlyCost}`}</p>
            </div>
          ))}
        </div>
      </div>

      <CalculationSteps 
        steps={lang === "TH" ? [
          "คำนวณราคาเฉลี่ยต่อหนึ่งหน่วยเม็ด/ครั้ง: ราคาขวด หารด้วยจำนวนรวมเม็ดแคปซูลทั้งหมดในบรรจุภัณฑ์",
          "ประเมินค่าใช้จ่ายต่อวัน: เอาจำนวนราคาต่อเม็ด คูณด้วยปริมาณโดสความต้องการที่ต้องทานตามระบุหน้าซอง",
          "หาข้อสรุปงบประมาณสะสมรายเดือนและรายปี: เอาค่าตอบรายวัน คูณ 30 วันสำหรับรายเดือน และคูณ 365 สำหรับรายปี",
          "ประเมินระยะเวลาขวดหมดอายุ: เอาจำนวนเม็ดในขวด หารด้วยปริมาณเม็ดที่กินแต่ละวัน เพื่อใช้วางแผนการต่อสต็อกล่วงหน้า"
        ] : [
          "Calculate cost per individual pill: Divide the bottle price by the total capsules count.",
          "Identify daily expense: Multiply single pill cost by the recommended daily dosage.",
          "Determine monthly & annual totals: Multiply daily cost by 30 days and 365 days respectively.",
          "Predict replenishing dates: Divide total capsule capacity by daily dosage to find how many days each bottle lasts."
        ]} 
      />

      <SEOFAQ>
        <FAQItem 
          question="วิตามินและอาหารเสริม (Supplements) จำเป็นต่อร่างกายสำหรับคนยุคใหม่จริงหรือไม่?"
          answer="สำหรับผู้ที่รับประทานอาหารครบ 5 หมู่ในสัดส่วนที่เหมาะสมและไม่มีปัญหาด้านการดูดซึมสารอาหาร อาหารเสริมส่วนใหญ่จะไม่ใช่สิ่งจำเป็นอย่างยิ่งยวด อย่างไรก็ตาม ด้วยไลฟ์สไตล์ของคนเมืองในยุคปัจจุบันที่พึ่งพาอาหารจานด่วนเป็นหลัก ขาดการออกกำลังกาย หรือกลุ่มคนทำงานออฟฟิศที่ไม่เจอแสงแดดเลย (เสี่ยงขาดวิตามิน D) การทานวิตามินเสริมบางชนิด เช่น วิตามินบีรวม วิตามินซี หรือน้ำมันปลาจึงเป็นตัวเลือกเสริมที่ช่วยเติมเต็มสุขภาพและฟื้นฟูร่างกายได้ดี"
        />
        <FAQItem 
          question="มีกลยุทธ์ใดบ้างที่จะช่วยประหยัดงบในการซื้อวิตามินและอาหารเสริมในแต่ละเดือน?"
          answer="วิธีประหยัดเงินที่ชาญฉลาดคือ: 1) ซื้อวิตามินขนาดประปุกใหญ่ (Value Pack) ซึ่งช่วยให้ต้นทุนต่อเม็ดลดต่ำลงอย่างมาก 2) หลีกเลี่ยงการซื้อยี่ห้อที่มีราคาสูงโดยไม่จำเป็นโดยใช้วิธีเปรียบเทียบปริมาณตัวยาสำคัญ (Active Ingredients) หลังขวดแทน 3) มุ่งเน้นทานเฉพาะวิตามินที่ร่างกายต้องการจริงๆ ผ่านการตรวจเลือดวิเคราะห์ประเมินสุขภาพ และ 4) สมัครรับระบบบริการสั่งซื้ออัตโนมัติ (Subscribe & Save) ของร้านค้าชั้นนำเพื่อให้ได้ส่วนลดเพิ่มเติม"
        />
        <FAQItem 
          question="เพราะเหตุใดปริมาณสารอาหารบางชนิดในอาหารเสริมถึงสูงกว่า 100% Thai RDI และเป็นอันตรายหรือไม่?"
          answer="Thai RDI คือปริมาณขั้นต่ำที่แนะนำต่อวันเพื่อไม่ให้ร่างกายเกิดโรคขาดสารอาหาร แต่อาหารเสริมระดับพรีเมียมมักใส่ปริมาณที่สูงขึ้น (เช่น วิตามินซี 1,000 มก. ซึ่งคิดเป็นกว่า 1,000% RDI) เพื่อหวังผลทางด้านสารต้านอนุมูลอิสระและการสร้างภูมิคุ้มกัน ทั้งนี้ สำหรับวิตามินกลุ่มที่ละลายในน้ำ (เช่น วิตามินซีและบีรวม) ร่างกายจะสามารถขับส่วนเกินออกทางปัสสาวะได้โดยไม่สะสมเป็นพิษ แต่สำหรับวิตามินละลายในไขมัน (A, D, E, K) ควรระวังการทานเกินขนาดเนื่องจากสะสมในตับและเนื้อเยื่อได้ยาวนาน"
        />
        <FAQItem 
          question="การรับประทานอาหารมื้อหลักให้ครบถ้วน มีประสิทธิภาพดีกว่าการพึ่งพาวิตามินเม็ดอย่างไร?"
          answer="การรับประทานผัก ผลไม้สด และเนื้อสัตว์ในมื้ออาหารปกติ ร่างกายจะได้รับสารอาหารควบคู่ไปกับสารอาหารรองตามธรรมชาติ (Phytonutrients) และใยอาหาร (Fiber) ซึ่งทำงานส่งเสริมประสิทธิภาพการดูดซึมของลำไส้ได้ดีกว่าวิตามินสังเคราะห์แบบเม็ดเดี่ยว นอกจากนี้ อาหารจากธรรมชาติยังมีความเสี่ยงต่อการสะสมสารพิษเกินขนาดยากกว่า วิตามินเม็ดควรเป็นตัวเลือกช่วยเสริมเมื่ออาหารหลักไม่เพียงพอเท่านั้น ไม่ใช่สิ่งทดแทนมื้ออาหารหลัก"
        />
      </SEOFAQ>
    </div>
  );
}

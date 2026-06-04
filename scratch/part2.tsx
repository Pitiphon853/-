// 6. CoffeeBrewingRatio
export function CoffeeBrewingRatio({ lang }: { lang: any }) {
  const [method, setMethod] = useState<string>("v60");
  const [inputType, setInputType] = useState<string>("coffee");
  const [coffeeWeight, setCoffeeWeight] = useState<number>(15);
  const [waterVolume, setWaterVolume] = useState<number>(225);
  const [customRatio, setCustomRatio] = useState<number>(15);

  const getRatio = () => {
    switch (method) {
      case "espresso": return 2;
      case "v60": return 15;
      case "frenchpress": return 12;
      case "coldbrew": return 10;
      case "custom": return customRatio;
      default: return 15;
    }
  };

  const calculate = () => {
    const ratio = getRatio();
    let computedWater = waterVolume;
    let computedCoffee = coffeeWeight;

    if (inputType === "coffee") {
      computedWater = coffeeWeight * ratio;
    } else {
      computedCoffee = ratio > 0 ? (waterVolume / ratio) : 0;
    }

    // Recommendations based on brewing method
    let grindSize = lang === "TH" ? "ปานกลาง (Medium)" : "Medium";
    let temp = "90°C - 94°C";
    let time = "2:30 - 3:00 mins";

    if (method === "espresso") {
      grindSize = lang === "TH" ? "ละเอียดมาก (Fine)" : "Fine";
      temp = "90°C - 93°C";
      time = "25 - 30 secs";
    } else if (method === "frenchpress") {
      grindSize = lang === "TH" ? "หยาบ (Coarse)" : "Coarse";
      temp = "92°C - 96°C";
      time = "4:00 mins";
    } else if (method === "coldbrew") {
      grindSize = lang === "TH" ? "หยาบมาก (Extra Coarse)" : "Extra Coarse";
      temp = lang === "TH" ? "อุณหภูมิห้อง / น้ำเย็น" : "Room Temp / Cold";
      time = "12 - 24 hours";
    }

    return {
      coffeeG: computedCoffee.toFixed(1),
      waterMl: computedWater.toFixed(0),
      ratio: `1:${ratio}`,
      grindSize,
      temp,
      time
    };
  };

  const results = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl text-amber-600 dark:text-amber-400">
          <Coffee className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">
            {lang === "TH" ? "เครื่องมือคำนวณสัดส่วนชงกาแฟ" : "Coffee Brewing Ratio Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "คำนวณอัตราส่วนน้ำต่อเมล็ดกาแฟ เพื่อรสชาติที่สมบูรณ์แบบตามมาตรฐานสากล" : "Calculate perfect coffee-to-water ratios for drip, espresso, and cold brew."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "วิธีการชงกาแฟ" : "Brewing Method"}</label>
            <select 
              className={inputClass} 
              value={method} 
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="v60">{lang === "TH" ? "ดริป (Drip / V60) - สัดส่วน 1:15" : "Drip / V60 (1:15)"}</option>
              <option value="espresso">{lang === "TH" ? "เอสเพรสโซ่ (Espresso) - สัดส่วน 1:2" : "Espresso (1:2)"}</option>
              <option value="frenchpress">{lang === "TH" ? "เฟรนช์เพรส (French Press) - สัดส่วน 1:12" : "French Press (1:12)"}</option>
              <option value="coldbrew">{lang === "TH" ? "สกัดเย็น (Cold Brew) - สัดส่วน 1:10" : "Cold Brew (1:10)"}</option>
              <option value="custom">{lang === "TH" ? "กำหนดสัดส่วนเอง (Custom Ratio)" : "Custom Ratio"}</option>
            </select>
          </div>

          {method === "custom" && (
            <div>
              <label className={labelClass}>{lang === "TH" ? "สัดส่วนที่ต้องการ (1 : X)" : "Custom Ratio (1 : X)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={customRatio} 
                onChange={(e) => setCustomRatio(Math.max(1, parseFloat(e.target.value) || 1))} 
              />
            </div>
          )}

          <div>
            <label className={labelClass}>{lang === "TH" ? "เกณฑ์ที่ใช้ป้อนค่า" : "Input Type"}</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm cursor-pointer">
                <input 
                  type="radio" 
                  name="ratioInputType" 
                  value="coffee" 
                  checked={inputType === "coffee"}
                  onChange={() => setInputType("coffee")}
                />
                {lang === "TH" ? "น้ำหนักกาแฟ (กรัม)" : "Coffee Weight (g)"}
              </label>
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm cursor-pointer">
                <input 
                  type="radio" 
                  name="ratioInputType" 
                  value="water" 
                  checked={inputType === "water"}
                  onChange={() => setInputType("water")}
                />
                {lang === "TH" ? "ปริมาณน้ำ (มิลลิลิตร)" : "Water Volume (ml)"}
              </label>
            </div>
          </div>

          {inputType === "coffee" ? (
            <div>
              <label className={labelClass}>{lang === "TH" ? "น้ำหนักเมล็ด/ผงกาแฟ (กรัม)" : "Coffee Weight (grams)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={coffeeWeight} 
                onChange={(e) => {
                  const val = Math.max(0.1, parseFloat(e.target.value) || 0);
                  setCoffeeWeight(val);
                  setWaterVolume(val * getRatio());
                }} 
              />
            </div>
          ) : (
            <div>
              <label className={labelClass}>{lang === "TH" ? "ปริมาณน้ำที่ใช้ชง (มล.)" : "Water Volume (ml)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={waterVolume} 
                onChange={(e) => {
                  const val = Math.max(1, parseFloat(e.target.value) || 0);
                  setWaterVolume(val);
                  const ratio = getRatio();
                  setCoffeeWeight(ratio > 0 ? val / ratio : 0);
                }} 
              />
            </div>
          )}
        </div>

        <div className="bg-amber-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col justify-between border border-amber-100 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {lang === "TH" ? "☕ สูตรชงกาแฟแนะนำ" : "☕ Brew Recipe Guide"}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "น้ำหนักกาแฟที่ใช้:" : "Coffee Required:"}</span>
                <span className="font-bold text-gray-800 dark:text-white text-md">{results.coffeeG} g</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "น้ำหนัก/ปริมาตรน้ำ:" : "Water Required:"}</span>
                <span className="font-bold text-gray-800 dark:text-white text-md">{results.waterMl} ml (g)</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ขนาดการบด (Grind Size):" : "Grind Size:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.grindSize}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "อุณหภูมิน้ำชง:" : "Water Temp:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.temp}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ระยะเวลาสกัดรวม:" : "Target Brew Time:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.time}</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-amber-700 dark:text-amber-400 mt-4 bg-amber-100/50 dark:bg-amber-900/20 p-3 rounded-lg">
            * {lang === "TH" ? "ความรู้: การชงกาแฟดริปใช้น้ำหนักน้ำชงเป็นหน่วยกรัมเทียบเท่ามิลลิลิตร (น้ำ 1 มล. มีน้ำหนักประมาณ 1 กรัม)" : "Tip: In specialty coffee, water is measured in grams. 1ml of water is roughly equal to 1g."}
          </div>
        </div>
      </div>

      <CalculationSteps 
        steps={lang === "TH" ? [
          "เลือกวิธีสกัดกาแฟที่ต้องการ เพื่อกำหนดค่าสัดส่วนน้ำต่อกาแฟมาตรฐาน (เช่น ดริป V60 เท่ากับ 1:15)",
          "ระบุค่าเริ่มต้นเป็นน้ำหนักกาแฟ หรือปริมาณน้ำตามอุปกรณ์แก้วเสิร์ฟที่คุณมี",
          "คำนวณปริมาณตรงกันข้ามโดยอาศัยตัวคูณอัตราส่วน: น้ำ = กาแฟ * สัดส่วน, กาแฟ = น้ำ / สัดส่วน",
          "ปฏิบัติตามคำแนะนำของขนาดการบด อุณหภูมิน้ำ และเวลาสกัดเพื่อผลลัพธ์ที่ดีที่สุด"
        ] : [
          "Choose your preferred brewing method to select a default coffee-to-water ratio (e.g., V60 drip is 1:15).",
          "Input either the exact coffee dose or target beverage volume you want to make.",
          "Perform calculations using the ratio: Water = Coffee * Ratio; Coffee = Water / Ratio.",
          "Apply recommendations for grind size, water temperature, and extraction time to brew."
        ]} 
      />

      <SEOFAQ>
        <FAQItem 
          question="สัดส่วนการชงกาแฟ (Brewing Ratio) คืออะไร และมีความสำคัญอย่างไรต่อรสชาติ?"
          answer="Brewing Ratio คืออัตราส่วนระหว่างปริมาณผงกาแฟต่อน้ำที่ใช้ในการชง (คิดเป็นหน่วยน้ำหนักกรัม) ถือเป็นกุญแจสำคัญที่กำหนดความเข้มข้น (Strength) และอัตราการสกัดสารละลายรสชาติต่างๆ ออกมาจากผงกาแฟ (Extraction Rate) สัดส่วนที่ไม่เหมาะสม เช่น ใส่น้ำมากเกินไปจะส่งผลให้รสชาติกาแฟจืดและมีความขมไหม้จากการสกัดที่เกินพอดี (Over-extraction) ขณะที่ใส่น้ำน้อยเกินไปจะสกัดรสเปรี้ยวเค็มออกมาเด่นเกินไปและมีสัมผัสที่หนืดเหนียวจนอึดอัด (Under-extraction)"
        />
        <FAQItem 
          question="ทำไมแต่ละวิธีการชง เช่น Espresso, Drip, Cold Brew จึงใช้ Brewing Ratio ต่างกัน?"
          answer="ความแตกต่างของสัดส่วนเกิดจากกลไกการสกัดและขนาดบดของอุปกรณ์ชงแต่ละชนิด: 1) Espresso ใช้แรงดันสูงสกัดผ่านผงกาแฟบดละเอียดมากในเวลารวดเร็ว จึงใช้สัดส่วนเข้มข้นที่สุดประมาณ 1:2 เพื่อดึงเอาน้ำมันเนื้อครีมา (Crema) ออกมาเข้มข้น 2) Drip / V60 สกัดโดยอาศัยแรงโน้มถ่วงผ่านกระดาษกรอง จึงใช้สัดส่วนมาตรฐาน 1:15 เพื่อให้ได้รสสัมผัสที่สะอาดและดื่มง่าย 3) Cold Brew แช่กาแฟทิ้งไว้เป็นเวลานานด้วยน้ำเย็น จึงใช้สัดส่วน 1:10 หรือเข้มกว่าเพื่อทำเป็นหัวน้ำเชื่อมกาแฟเข้มข้นไว้ผสมน้ำหรือนมทีหลัง"
        />
        <FAQItem 
          question="จะปรับระดับ Brewing Ratio อย่างไรเมื่อรู้สึกว่ากาแฟที่ชงออกมามีรสชาติเปรี้ยวเกินไปหรือขมเกินไป?"
          answer="หากกาแฟมีรสชาติเปรี้ยวฝาดหยาบ (มักเกิดจากการสกัดไม่สมบูรณ์ Under-extracted) ให้ลองปรับสัดส่วนชงโดยการเพิ่มปริมาณน้ำขึ้นเล็กน้อย (เช่น จาก 1:14 เป็น 1:15) หรือบดผงกาแฟให้ละเอียดขึ้นเพื่อเพิ่มพื้นที่ผิวสัมผัสกับน้ำ แต่หากกาแฟมีรสขมแห้งคอ (สกัดมากเกินไป Over-extracted) ให้ปรับลดปริมาณน้ำลง (เช่น จาก 1:16 เป็น 1:15) หรือชงด้วยอุณหภูมิน้ำที่ต่ำลงเล็กน้อย"
        />
        <FAQItem 
          question="การใช้น้ำหนักเป็นหน่วยกรัมในการชงกาแฟมีประโยชน์มากกว่าการใช้ช้อนตวงหรือแก้วตวงอย่างไร?"
          answer="การใช้ปริมาตร (ช้อนหรือแก้วตวง) มีความคลาดเคลื่อนสูงมาก เนื่องจากเมล็ดกาแฟแต่ละชนิดมีความหนาแน่นและขนาดคั่วที่ไม่เท่ากัน เมล็ดคั่วอ่อนจะมีน้ำหนักมากกว่าเมล็ดคั่วเข้มในปริมาตรช้อนตวงที่เท่ากัน การหันมาใช้ตาชั่งดิจิทัลชั่งน้ำหนักผงกาแฟและน้ำเป็นหน่วยกรัม (1 กรัมของน้ำบริสุทธิ์เท่ากับ 1 มิลลิลิตร) จะช่วยรักษาระดับมาตรฐานของรสชาติกาแฟให้คงที่สม่ำเสมอในทุกแก้วที่คุณชง"
        />
      </SEOFAQ>
    </div>
  );
}

// 7. WineAgingPotency
export function WineAgingPotency({ lang }: { lang: any }) {
  const [wineType, setWineType] = useState<string>("boldred");
  const [priceTier, setPriceTier] = useState<string>("mid");
  const [storageCondition, setStorageCondition] = useState<string>("cellar");
  const [vintageYear, setVintageYear] = useState<number>(new Date().getFullYear() - 3);

  const calculate = () => {
    const currentYear = new Date().getFullYear();
    const currentAge = Math.max(0, currentYear - vintageYear);

    // Base aging potential in years
    let basePotential = 3;
    if (wineType === "lightred") {
      if (priceTier === "everyday") basePotential = 1;
      else if (priceTier === "mid") basePotential = 3;
      else if (priceTier === "premium") basePotential = 6;
      else basePotential = 12;
    } else if (wineType === "boldred") {
      if (priceTier === "everyday") basePotential = 2;
      else if (priceTier === "mid") basePotential = 5;
      else if (priceTier === "premium") basePotential = 12;
      else basePotential = 25;
    } else if (wineType === "drywhite") {
      if (priceTier === "everyday") basePotential = 1;
      else if (priceTier === "mid") basePotential = 2;
      else if (priceTier === "premium") basePotential = 5;
      else basePotential = 10;
    } else if (wineType === "sweetwhite") {
      if (priceTier === "everyday") basePotential = 3;
      else if (priceTier === "mid") basePotential = 7;
      else if (priceTier === "premium") basePotential = 18;
      else basePotential = 40;
    } else if (wineType === "sparkling") {
      if (priceTier === "everyday") basePotential = 1;
      else if (priceTier === "mid") basePotential = 3;
      else if (priceTier === "premium") basePotential = 6;
      else basePotential = 15;
    } else if (wineType === "fortified") {
      if (priceTier === "everyday") basePotential = 4;
      else if (priceTier === "mid") basePotential = 10;
      else if (priceTier === "premium") basePotential = 22;
      else basePotential = 50;
    }

    // Storage condition multiplier
    let multiplier = 1.0;
    if (storageCondition === "room") {
      multiplier = 0.45; // ages faster and spoils
    } else if (storageCondition === "fluctuating") {
      multiplier = 0.15; // degrades rapidly
    }

    const adjustedPotential = Math.round(basePotential * multiplier * 10) / 10;
    const remainingLife = adjustedPotential - currentAge;

    let status = lang === "TH" ? "ช่วงเวลาดื่มที่ดีที่สุด (Peak Window)" : "Peak Window";
    let colorClass = "text-emerald-600 dark:text-emerald-400";
    let desc = lang === "TH" 
      ? "ไวน์อยู่ในช่วงรสชาติกลมกล่อม โครงสร้างแอลกอฮอล์ แทนนิน และผลไม้สมดุลดีที่สุด ควรเปิดขวดดื่มได้แล้ว" 
      : "The wine is at its best. Flavors are well-integrated and balanced.";

    if (remainingLife > 3) {
      status = lang === "TH" ? "ยังเยาว์วัย / สามารถเก็บต่อได้ (Youthful / Hold)" : "Youthful / Hold";
      colorClass = "text-blue-600 dark:text-blue-400";
      desc = lang === "TH" 
        ? "ไวน์ยังสามารถพัฒนาความซับซ้อนของกลิ่นและรสชาติได้อีก แทนนินยังค่อนข้างฝาดและเด่นชัด" 
        : "Still developing complex aromas. Tannins might feel robust.";
    } else if (remainingLife <= 0 && remainingLife > -2) {
      status = lang === "TH" ? "ควรดื่มทันที (Drink Now)" : "Drink Now";
      colorClass = "text-amber-600 dark:text-amber-400";
      desc = lang === "TH" 
        ? "รสผลไม้เริ่มแผ่วลงและเข้าใกล้ช่วงท้ายของอายุไขของไวน์ ควรรีบนำมาเปิดดื่มก่อนจะจืดชืด" 
        : "Fruit flavors are fading. Consume soon before quality drops.";
    } else if (remainingLife <= -2) {
      status = lang === "TH" ? "เลยจุดสูงสุด / อาจเริ่มเสื่อมสภาพ (Past Peak / Fading)" : "Past Peak / Fading";
      colorClass = "text-rose-600 dark:text-rose-400";
      desc = lang === "TH" 
        ? "ไวน์เลยช่วงเวลาอร่อยที่สุดไปนานแล้ว รสผลไม้จืดจางลงมาก อาจมีกลิ่นน้ำส้มสายชูหรือแบนเกินไป" 
        : "The wine has aged past its peak. May taste flat or oxidized.";
    }

    return {
      currentAge,
      basePotential,
      adjustedPotential,
      remainingLife: remainingLife.toFixed(1),
      status,
      colorClass,
      desc
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
            {lang === "TH" ? "เครื่องมือคำนวณระยะเวลาเก็บรักษาไวน์" : "Wine Aging Potency & Cellaring Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "คำนวณช่วงเวลาดื่มที่ดีที่สุดของไวน์ตามประเภท คุณภาพ และสภาพแวดล้อมในการจัดเก็บ" : "Predict wine's peak drinking window based on variety, tier, and storage quality."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ประเภทของไวน์" : "Wine Type"}</label>
            <select 
              className={inputClass} 
              value={wineType} 
              onChange={(e) => setWineType(e.target.value)}
            >
              <option value="boldred">{lang === "TH" ? "ไวน์แดงบอดี้เข้ม (Cabernet, Syrah, Nebbiolo)" : "Bold Red (Cabernet, Syrah)"}</option>
              <option value="lightred">{lang === "TH" ? "ไวน์แดงบอดี้เบา (Pinot Noir, Gamay)" : "Light Red (Pinot Noir, Gamay)"}</option>
              <option value="drywhite">{lang === "TH" ? "ไวน์ขาวแบบดราย (Chardonnay, Sauvignon Blanc)" : "Dry White (Chardonnay, Sauv Blanc)"}</option>
              <option value="sweetwhite">{lang === "TH" ? "ไวน์ขาวหวาน / หวานจัด (Riesling Sweet, Sauternes)" : "Sweet White (Riesling, Sauternes)"}</option>
              <option value="sparkling">{lang === "TH" ? "สปาร์คกลิ้งไวน์ / แชมเปญ (Champagne, Prosecco)" : "Sparkling Wine / Champagne"}</option>
              <option value="fortified">{lang === "TH" ? "ไวน์หวานเพิ่มแอลกอฮอล์ (Port, Sherry, Madeira)" : "Fortified Wine (Port, Sherry)"}</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "เกรดและระดับราคาของไวน์" : "Price / Quality Tier"}</label>
            <select 
              className={inputClass} 
              value={priceTier} 
              onChange={(e) => setPriceTier(e.target.value)}
            >
              <option value="everyday">{lang === "TH" ? "เกรดทั่วไปดื่มได้ทุกวัน (ต่ำกว่า 500 บาท)" : "Everyday Drinking (<500B)"}</option>
              <option value="mid">{lang === "TH" ? "ระดับกลางมาตรฐาน (500 - 1,500 บาท)" : "Mid-range (500 - 1500B)"}</option>
              <option value="premium">{lang === "TH" ? "ระดับพรีเมียม / บ่มสะสม (1,500 - 5,000 บาท)" : "Premium Collector (1500 - 5000B)"}</option>
              <option value="collector">{lang === "TH" ? "ระดับสะสมรุ่นพิเศษพิเศษ (5,000 บาทขึ้นไป)" : "Grand Cru / Icon Collection (5000B+)"}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ปีที่ระบุข้างขวด (Vintage)" : "Vintage Year"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={vintageYear} 
                onChange={(e) => setVintageYear(Math.max(1700, parseInt(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "สถานที่เก็บรักษาไวน์" : "Storage Conditions"}</label>
              <select 
                className={inputClass} 
                value={storageCondition} 
                onChange={(e) => setStorageCondition(e.target.value)}
              >
                <option value="cellar">{lang === "TH" ? "ตู้แช่ไวน์ / ห้องแช่เย็นควบคุม (12-15°C)" : "Wine Cellar / Fridge (12-15°C)"}</option>
                <option value="room">{lang === "TH" ? "ห้องปรับอากาศสม่ำเสมอ (~25°C)" : "Air-conditioned Room (~25°C)"}</option>
                <option value="fluctuating">{lang === "TH" ? "อุณหภูมิปกติภายนอก ร้อนชื้นผันแปร" : "Ambient Hot/Fluctuating Temp"}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col justify-between border border-red-100 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {lang === "TH" ? "🍷 สถานะการบ่มของไวน์" : "🍷 Cellar Lifecycle Result"}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "อายุของไวน์ปัจจุบัน:" : "Current Wine Age:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.currentAge} {lang === "TH" ? "ปี" : "years"}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ระยะเวลาเก็บเป้าหมายสูงสุด:" : "Adjusted Aging Potential:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.adjustedPotential} {lang === "TH" ? "ปี" : "years"}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "สถานะปัจจุบัน:" : "Current Status:"}</span>
                <span className={`font-extrabold text-md ${results.colorClass}`}>{results.status}</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 mt-2 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {results.desc}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalculationSteps 
        steps={lang === "TH" ? [
          "คำนวณอายุจริงของไวน์: นำปีคริสต์ศักราชปัจจุบัน หักลบด้วยปี Vintage ของไวน์ที่ระบุบนขวด",
          "ประเมินอายุขัยพื้นฐาน (Base Aging Potential): กำหนดระยะเวลาน่าจะเก็บตามสายพันธุ์ผลไม้องุ่นและระดับราคาสินค้า",
          "ปรับทอนตามปัจจัยอุณหภูมิ: อุณหภูมิการเก็บที่สูงและผันผวน จะเร่งปฏิกิริยาออกซิเดชั่นทำให้ขีดจำกัดอายุเก็บลดลงลงอย่างรวดเร็ว (สูงสุดหดตัวลง 85%)",
          "สรุปผลการประเมินอายุคงเหลือ: เปรียบเทียบอายุจริงกับศักยภาพเก็บหลังหักทอน เพื่อสรุปว่าควรเปิดขวดดื่มทันทีหรือบ่มสะสมต่อไปได้"
        ] : [
          "Determine the current age: Subtract the wine's vintage year from the current year.",
          "Identify baseline potential: Assign default shelf-life values based on grape variety and price tiers.",
          "Apply storage factor: High or fluctuating ambient temperatures accelerate aging, reducing the cellaring window by up to 85%.",
          "Deduce remaining cellar life: Compare actual age with calculated potency to establish the drinking recommendations."
        ]} 
      />

      <SEOFAQ>
        <FAQItem 
          question="ไวน์ยิ่งเก็บไว้นาน รสชาติจะยิ่งหรูหราและดีขึ้นสำหรับทุกขวดจริงหรือไม่?"
          answer="เป็นความเข้าใจผิดที่พบบ่อยมาก ไวน์มากกว่า 90-95% ทั่วโลกถูกผลิตขึ้นมาเพื่อให้เปิดดื่มทันทีภายใน 1-3 ปีหลังจากบรรจุขวด มีไวน์เพียงส่วนน้อยที่มีราคาสูง โครงสร้างของกรดและแทนนินหนาแน่น มีแอลกอฮอล์และระดับความหวานที่เหมาะสมเท่านั้นที่จะบ่มพัฒนาในขวดให้ได้รสสัมผัสที่ดีขึ้นตามกาลเวลา การเก็บไวน์ราคาระดับเริ่มต้นไว้นานเกินไปจะทำให้ไวน์สูญเสียกลิ่นผลไม้หอมสดชื่นไปโดยสิ้นเชิง"
        />
        <FAQItem 
          question="สภาพแวดล้อมที่เหมาะสมที่สุดในการเก็บรักษาไวน์ (Wine Storage) เป็นอย่างไร?"
          answer="สภาพแวดล้อมในอุดมคติสำหรับการรักษาไวน์มีกฎเหล็ก 4 ประการ: 1) อุณหภูมิคงที่อยู่ราวๆ 12°C ถึง 16°C ห้ามมีความผันผวนของความเย็นและความร้อนสลับไปมา 2) ความชื้นสัมพัทธ์ในอากาศเฉลี่ย 60-70% เพื่อป้องกันไม่ให้จุกคอร์กแห้งหดตัวจนลมเข้าขวด 3) ปราศจากแสงสว่างโดยเฉพาะแสงแดดที่มีรังสี UV คอยเร่งความเสื่อมโทรมของรสชาติ และ 4) ป้องกันการสั่นสะเทือนของขวดไวน์เพื่อป้องกันไม่ให้ตะกอนฟุ้งกระจายจนเกิดปฏิกิริยาทางเคมีล้มเหลว"
        />
        <FAQItem 
          question="อุณหภูมิห้องปกติในประเทศไทยที่ไม่เปิดเครื่องปรับอากาศ จะส่งผลอย่างไรต่อไวน์?"
          answer="อุณหภูมิห้องปกติในประเทศไทยที่สูงเกิน 30°C ร่วมกับความชื้นที่ไม่นิ่ง จะเป็นตัวเร่งการแก่ตัวของไวน์อย่างเป็นภัยพิบัติ ปฏิกิริยาเคมีภายในขวดจะเกิดเร็วขึ้นเป็นสองเท่า ไวน์จะเริ่มมีปัญหากลิ่นอับคล้ายผลไม้เน่าแห้ง หรือมีปฏิกิริยาออกซิเดชั่น (Oxidized) คล้ายน้ำส้มสายชู รวมถึงอาจทำให้จุกคอร์กแห้งกรอบและถูกแรงดันดันออกมา ไวน์ที่ควรเก็บได้ 10 ปีอาจเสื่อมลงในเวลาไม่ถึง 1 ปีหากเก็บไว้ในห้องร้อนชื้นจัด"
        />
        <FAQItem 
          question="วิธีสังเกตด้วยตนเองว่าไวน์ขวดที่เก็บไว้นานเริ่มเสียหรือบ่มนานเกินอายุไปแล้ว?"
          answer="จุดสังเกตแรกคือลักษณะภายนอก: หากสีของไวน์แดงเริ่มเปลี่ยนเป็นโทนน้ำตาลอิฐอมเหลือง หรือสีของไวน์ขาวเปลี่ยนเป็นทองเข้มอมน้ำตาลคล้ายชาเข้ม แสดงว่ามีอากาศซึมเข้าไป จุดสังเกตที่สองคือกลิ่น: หากได้กลิ่นคล้ายถั่วไหม้ น้ำยาล้างเล็บ หรือกลิ่นเปรี้ยวแหลมของน้ำส้มสายชู และจุดสังเกตสุดท้ายเมื่อชิม: รสชาติจะจืดชืด แบน ไม่มีรสมิติของผลไม้ และมีความฝาดแห้งกร้านแบบไม่มีความนุ่มนวล"
        />
      </SEOFAQ>
    </div>
  );
}

// 8. CateringCostEstimator
export function CateringCostEstimator({ lang }: { lang: any }) {
  const [guests, setGuests] = useState<number>(100);
  const [foodHeadPrice, setFoodHeadPrice] = useState<number>(350);
  const [drinkHeadPrice, setDrinkHeadPrice] = useState<number>(80);
  const [setupFee, setSetupFee] = useState<number>(5000);
  const [transportFee, setTransportFee] = useState<number>(2000);
  const [staffFee, setStaffFee] = useState<number>(3000);
  const [serviceCharge, setServiceCharge] = useState<number>(10);
  const [vat, setVat] = useState<number>(7);

  const calculate = () => {
    const fbCost = guests * (foodHeadPrice + drinkHeadPrice);
    const subtotal1 = fbCost + setupFee + transportFee + staffFee;
    const serviceChargeAmt = subtotal1 * (serviceCharge / 100);
    const subtotal2 = subtotal1 + serviceChargeAmt;
    const vatAmt = subtotal2 * (vat / 100);
    const totalCost = subtotal2 + vatAmt;
    const costPerGuest = guests > 0 ? (totalCost / guests) : 0;

    return {
      fbCost: fbCost.toLocaleString(),
      subtotal1: subtotal1.toLocaleString(),
      serviceChargeAmt: serviceChargeAmt.toLocaleString(),
      subtotal2: subtotal2.toLocaleString(),
      vatAmt: vatAmt.toLocaleString(),
      totalCost: totalCost.toLocaleString(),
      costPerGuest: costPerGuest.toFixed(2)
    };
  };

  const results = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">
            {lang === "TH" ? "เครื่องมือคำนวณค่าจัดเลี้ยง (Catering Cost)" : "Catering Cost & Invoice Estimator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "ประเมินงบประมาณรวมของการจัดงานเลี้ยง อาหาร เครื่องดื่ม ค่าแรง ค่าบริการ และภาษี" : "Calculate total catering cost including headcounts, setup, staff, service charge, and VAT."}
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
              <label className={labelClass}>{lang === "TH" ? "ค่าอาหารหัวละ (บาท)" : "Food per Head (฿)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={foodHeadPrice} 
                onChange={(e) => setFoodHeadPrice(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าเครื่องดื่มหัวละ (บาท)" : "Drinks per Head (฿)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={drinkHeadPrice} 
                onChange={(e) => setDrinkHeadPrice(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าเดินทาง/ขนส่ง (บาท)" : "Transportation Fee (฿)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={transportFee} 
                onChange={(e) => setTransportFee(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าจัดเตรียมสถานที่/เช่าเต็นท์" : "Setup & Equipment Rent"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={setupFee} 
                onChange={(e) => setSetupFee(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าแรงพนักงานบริการหน้างาน" : "Staff Wages"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={staffFee} 
                onChange={(e) => setStaffFee(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าบริการ Service Charge (%)" : "Service Charge (%)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={serviceCharge} 
                onChange={(e) => setServiceCharge(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ภาษีมูลค่าเพิ่ม VAT (%)" : "VAT (%)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={vat} 
                onChange={(e) => setVat(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col justify-between border border-indigo-100 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {lang === "TH" ? "🧾 ใบประเมินราคารวม" : "🧾 Estimated Invoice Details"}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ราคารวมอาหาร+เครื่องดื่ม:" : "Food & Beverage Cost:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.fbCost}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ค่าดำเนินการพื้นฐาน:" : "Logistics & Labor Subtotal:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.subtotal1}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "Service Charge:" : "Service Charge Amt:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.serviceChargeAmt}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ภาษีมูลค่าเพิ่ม (VAT):" : "VAT Amount:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.vatAmt}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-gray-700 dark:text-gray-300 font-extrabold">{lang === "TH" ? "ยอดสุทธิชำระจริง:" : "Total Net Cost:"}</span>
                <span className="font-black text-xl text-indigo-600 dark:text-indigo-400">฿{results.totalCost}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-dashed dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "เฉลี่ยต่อคนตกคนละ:" : "Average per Guest:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.costPerGuest}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalculationSteps 
        steps={lang === "TH" ? [
          "คำนวณราคายอด F&B: เอาจำนวนหัวคูณกับราคาค่าอาหารและค่าเครื่องดื่มต่อหัว",
          "หาผลรวมค่าใช้จ่ายรอบแรก (Subtotal 1): นำผล F&B มารวมกับค่าบริการขนส่งพัสดุจัดเลี้ยง ค่าเช่าอุปกรณ์แต่งงานเลี้ยง และค่าแรงคนเสิร์ฟ",
          "คิดราคา Service Charge และภาษี: นำ Subtotal 1 มาคูณร้อยละ Service Charge แล้วบวกเข้าไป ก่อนนำผลรวมไปคิดภาษีมูลค่าเพิ่มร้อยละ 7",
          "หารเฉลี่ยค่าใช้จ่าย: เอาค่ารวมสุทธิหารด้วยจำนวนหัวเพื่อให้ได้ราคาต่อคนในการจัดเลี้ยงจริง"
        ] : [
          "Compute food & beverage total: Multiply the head count by the sum of food and drink rates per guest.",
          "Find logistics subtotal: Add F&B total to logistical setup fees, transport, and server wages.",
          "Factor in tax & service: Apply the service charge rate to the subtotal, then calculate the VAT on the new sum.",
          "Deduce average cost: Divide final net payment by guest headcount to find average per capita cost."
        ]} 
      />

      <SEOFAQ>
        <FAQItem 
          question="ค่าจัดเลี้ยงนอกสถานที่ (Catering Service) มักประกอบด้วยค่าอะไรบ้าง?"
          answer="ปกติค่าใช้จ่ายในการทำ Catering จะถูกแจกแจงเป็น 4 ส่วนประกอบหลัก ได้แก่: 1) ค่าบริการอาหารและเครื่องดื่มแบบคิดราคาต่อหัว (Per Head Rate) 2) ค่าจัดพื้นที่ อุปกรณ์ โต๊ะ เก้าอี้ ผ้าคลุม จานชาม ถ้วยช้อน และค่าดอกไม้ตกแต่ง 3) ค่าใช้จ่ายเดินทางโลจิสติกส์ของทีมขนของและรถตู้ทำครัว และ 4) ค่าพนักงานคอยบริการตักอาหาร เดินเสิร์ฟ และคอยรวบจานล้าง"
        />
        <FAQItem 
          question="ทำไมจัดอาหารเลี้ยงแบบ Cocktail จึงควบคุมงบประมาณได้ง่ายกว่าการเลือกแบบบุฟเฟต์?"
          answer="อาหารแนว Cocktail เป็นจานขนาดเล็ก หยิบทานสะดวก (Finger food) ซึ่งผู้ให้บริการจัดเลี้ยงสามารถเตรียมส่วนผสมได้ตรงตามจำนวนชิ้นจำกัดได้ง่าย อีกทั้งการบริการประเภทนี้ไม่จำเป็นต้องใช้โต๊ะ เก้าอี้แบบเป็นทางการสำหรับแขกทุกคน ทำให้ประหยัดค่าเช่าพานพาหนะจัดเลี้ยงและประหยัดพื้นที่จัดตั้งได้เป็นอย่างดี อย่างไรก็ตาม หากเป็นงานระยะเวลา 3-4 ชั่วโมงยาวนาน แขกมักหยิบทานเรื่อยๆ ทำให้ปริมาณความต้องการชิ้นอาหารพุ่งขึ้นจนอาจแพงกว่าค่าบุฟเฟต์ปกติได้"
        />
        <FAQItem 
          question="การคิด Service Charge 10% และ VAT 7% ของบริการจัดเลี้ยงมีกฎเกณฑ์การคิดอย่างไร?"
          answer="การคิดภาษีและค่าบริการจัดเลี้ยงมีลำดับขั้นตอนคือ: นำต้นทุนค่าใช้จ่ายงานทั้งหมด (อาหาร + เครื่องดื่ม + ค่าแรง + ค่ารถ) มารวมเป็นยอดก่อนภาษี จากนั้นนำยอดนี้ไปคำนวณ Service Charge 10% ก่อน แล้วนำผลลัพธ์ที่ได้จากการบวก Service Charge มารวมกัน จึงนำไปคำนวณภาษีมูลค่าเพิ่ม (VAT) 7% ต่ออีกหนึ่งรอบ ซึ่งเป็นวิธีคำนวณตามมาตรฐานธุรกิจโรงแรมและการจัดเลี้ยง"
        />
        <FAQItem 
          question="มีเทคนิคหรือแนวทางใดที่จะช่วยประหยัดงบจัดเลี้ยงได้โดยที่งานยังดูหรูหรา?"
          answer="แนวทางยอดฮิตในการคุมงบจัดเลี้ยงคือ: 1) ปรับระดับการเลือก F&B โดยเน้นอาหารจานคาร์โบไฮเดรตที่มีหน้าตาน่ากินและอิ่มง่าย เช่น พาสต้าข้าวผัดคุณภาพดี เสริมกับเนื้อสัตว์ชิ้นขนาดกลาง 2) นำเข้าแอลกอฮอล์ ไวน์ หรือน้ำหวานเองจากร้านขายส่งภายนอก เพื่อไม่เสียค่าบริการเปิดขวด (Corkage Fee) ของแบรนด์ และ 3) เลือกจัดงานในช่วงนอกเทศกาลการจัดเลี้ยง (Off-peak season) เพื่อเจรจาขอลดค่าขนส่งและค่าเช่าอุปกรณ์ลงได้ดี"
        />
      </SEOFAQ>
    </div>
  );
}

// 9. ServingSizeCalories
export function ServingSizeCalories({ lang }: { lang: any }) {
  const [packageWeight, setPackageWeight] = useState<number>(500);
  const [packageCalories, setPackageCalories] = useState<number>(2000);
  const [servingSize, setServingSize] = useState<number>(50);
  const [protein100g, setProtein100g] = useState<number>(10);
  const [carbs100g, setCarbs100g] = useState<number>(60);
  const [fat100g, setFat100g] = useState<number>(5);

  const calculate = () => {
    const totalServings = servingSize > 0 ? packageWeight / servingSize : 0;
    const caloriesPerServing = totalServings > 0 ? packageCalories / totalServings : 0;
    
    // Nutrition per serving
    const proteinServing = (protein100g / 100) * servingSize;
    const carbsServing = (carbs100g / 100) * servingSize;
    const fatServing = (fat100g / 100) * servingSize;

    // Estimated energy breakdown
    const pKcal = proteinServing * 4;
    const cKcal = carbsServing * 4;
    const fKcal = fatServing * 9;
    const totalMacronutrientKcal = pKcal + cKcal + fKcal;

    return {
      totalServings: totalServings.toFixed(1),
      caloriesPerServing: caloriesPerServing.toFixed(0),
      proteinServing: proteinServing.toFixed(1),
      carbsServing: carbsServing.toFixed(1),
      fatServing: fatServing.toFixed(1),
      macronutrientKcal: totalMacronutrientKcal.toFixed(0)
    };
  };

  const results = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-2xl text-red-600 dark:text-red-400">
          <Scale className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">
            {lang === "TH" ? "คำนวณแคลอรี่ต่อหน่วยบริโภค" : "Serving Size Calories & Macros Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "แปลงข้อมูลโภชนาการข้างบรรจุภัณฑ์เพื่อหาจำนวนแคลอรี่และสารอาหารต่อหนึ่งมื้อกินจริง" : "Convert nutritional labels to find calories and macros per individual serving."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <h3 className="font-bold text-gray-700 dark:text-gray-300 border-b pb-1">📦 ข้อมูลจากหน้าฉลาก (Label Information)</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "น้ำหนักสุทธิทั้งบรรจุภัณฑ์ (g)" : "Net Weight (g)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={packageWeight} 
                onChange={(e) => setPackageWeight(Math.max(1, parseFloat(e.target.value) || 1))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "พลังงานแคลอรี่ทั้งหมด (kcal)" : "Total Calories (kcal)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={packageCalories} 
                onChange={(e) => setPackageCalories(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "หนึ่งหน่วยบริโภคเป้าหมาย (g)" : "Target Serving Size (g)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={servingSize} 
                onChange={(e) => setServingSize(Math.max(1, parseFloat(e.target.value) || 1))} 
              />
            </div>
          </div>

          <h3 className="font-bold text-gray-700 dark:text-gray-300 border-b pb-1 mt-4">🍎 สารอาหารเฉลี่ยต่อ 100 กรัม (Nutrients per 100g)</h3>
          
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className={labelClass}>{lang === "TH" ? "โปรตีน (กรัม)" : "Protein (g)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={protein100g} 
                onChange={(e) => setProtein100g(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "คาร์บ (กรัม)" : "Carbs (g)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={carbs100g} 
                onChange={(e) => setCarbs100g(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ไขมัน (กรัม)" : "Fat (g)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={fat100g} 
                onChange={(e) => setFat100g(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col justify-between border border-red-100 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {lang === "TH" ? "🍽️ ข้อมูลต่อหนึ่งหน่วยบริโภคจริง" : "🍽️ Calculated Values per Portion"}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "จำนวนเสิร์ฟทั้งหมดต่อซอง:" : "Total Servings in pack:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.totalServings} {lang === "TH" ? "หน่วย" : "servings"}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400 font-bold text-red-600 dark:text-red-400">{lang === "TH" ? "พลังงานต่อหนึ่งมื้อบริโภค:" : "Calories per serving:"}</span>
                <span className="font-extrabold text-lg text-red-600 dark:text-red-400">{results.caloriesPerServing} kcal</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "โปรตีนต่อเสิร์ฟ:" : "Protein per serving:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.proteinServing} g</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "คาร์โบไฮเดรตต่อเสิร์ฟ:" : "Carbohydrates per serving:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.carbsServing} g</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ไขมันต่อเสิร์ฟ:" : "Fat per serving:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.fatServing} g</span>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 leading-normal">
              💡 {lang === "TH" ? "การกระจายแคลอรี่จากสารอาหารหลักคิดเป็น:" : "Calculated calorie distribution from macros:"} <strong>{results.macronutrientKcal} kcal</strong> {lang === "TH" ? "(โปรตีน 4 kcal/g, คาร์บ 4 kcal/g, ไขมัน 9 kcal/g)" : "(4-4-9 rule)"}
            </div>
          </div>
        </div>
      </div>

      <CalculationSteps 
        steps={lang === "TH" ? [
          "คำนวณจำนวนครั้งการกินต่อซอง: หารน้ำหนักสุทธิทั้งหมดของแพ็คเกจ ด้วยขนาดของหนึ่งหน่วยบริโภคเป้าหมาย",
          "ประเมินแคลอรี่ต่อมื้อ: หารพลังงานแคลอรี่รวมของห่อ ด้วยปริมาณครั้งของการกิน เพื่อให้ได้แคลอรี่รายครั้ง",
          "คำนวณปริมาณกรัมของแต่ละสารอาหารหลัก: นำปริมาณโภชนาการต่อ 100 กรัม คูณด้วยร้อยละสัดส่วนน้ำหนักชงเสิร์ฟจริง",
          "ตรวจสอบแคลอรี่รวมจากสารอาหาร (สูตร 4-4-9): โปรตีนคูณ 4, คาร์บคูณ 4, ไขมันคูณ 9 เพื่อยืนยันความถูกต้อง"
        ] : [
          "Divide packaging net weight by the target serving size to find the total servings per package.",
          "Divide total package calories by the number of servings to get the energy value per single serving.",
          "Determine macro weights: Scale the per-100g protein, carbs, and fat weights to the serving weight.",
          "Verify the calorie output using the Atwater general factors: 4 kcal/g for protein/carbs, and 9 kcal/g for fat."
        ]} 
      />

      <SEOFAQ>
        <FAQItem 
          question="หนึ่งหน่วยบริโภค (Serving Size) บนหน้าฉลากโภชนาการแตกต่างจากน้ำหนักสุทธิอย่างไร?"
          answer="หนึ่งหน่วยบริโภค (Serving Size) คือปริมาณสารอาหารที่ผู้ผลิตแนะนำให้รับประทานต่อหนึ่งมื้อกินเพื่อความปลอดภัยและดีต่อสุขภาพ เช่น ถุงมันฝรั่งทอดมีน้ำหนักสุทธิรวม 100 กรัม แต่แนะนำหนึ่งหน่วยบริโภคไว้ที่ 30 กรัม (ประมาณ 1 ใน 3 ซอง) ดังนั้น ตัวเลขปริมาณพลังงาน สารเคมี โซเดียม และน้ำตาลที่ปรากฏต่อหน่วยโภชนาการ จะต้องคูณด้วยจำนวนส่วนเสิร์ฟหากกินหมดทั้งถุง"
        />
        <FAQItem 
          question="แคลอรี่จากโปรตีน คาร์โบไฮเดรต และไขมัน มีหลักการคำนวณพลังงานที่แตกต่างกันอย่างไร?"
          answer="สารอาหารหลัก (Macronutrients) ทั้ง 3 ชนิดให้พลังงานแก่ร่างกายไม่เท่ากัน โดยมีหลักสากลดังนี้: โปรตีน 1 กรัม ให้พลังงาน 4 กิโลแคลอรี่, คาร์โบไฮเดรต 1 กรัม ให้พลังงาน 4 กิโลแคลอรี่ และไขมัน 1 กรัม ให้พลังงานสูงถึง 9 กิโลแคลอรี่ การรู้ส่วนผสมของอาหารจะช่วยให้เราจำกัดเป้าหมายและหลีกเลี่ยงพลังงานส่วนเกินที่อาจก่อปัญหาไขมันสะสมในเส้นเลือด"
        />
        <FAQItem 
          question="เพราะเหตุใดอาหารบางประเภทจึงชี้แจงค่าปริมาณโซเดียมและน้ำตาลต่อซองสูงมาก?"
          answer="อาหารแปรรูปมักใช้สารเพิ่มรสชาติ เช่น ผงชูรส เกลือแกง และน้ำตาลทรายปริมาณมากในการยืดอายุเก็บรักษาและกระตุ้นการทาน ตัวเลขโซเดียมมักจะถูกระบุต่อหนึ่งหน่วยบริโภคเพื่อไม่ให้ดูน่ากลัวเกินไป แต่หากทานหมดซองปริมาณโซเดียมอาจเกินระดับปริมาณแนะนำต่อวัน (2,000 มิลลิกรัม) ซึ่งทำให้ไตทำงานหนักและเสี่ยงต่อสภาวะความดันโลหิตสูง"
        />
        <FAQItem 
          question="เคล็ดลับการอ่านฉลากโภชนาการสำหรับคนที่ต้องการลดน้ำหนักหรือสร้างกล้ามเนื้อคืออะไร?"
          answer="สำหรับผู้ที่ต้องการควบคุมอาหาร: 1) ตรวจสอบจำนวนเสิร์ฟทั้งหมดต่อกล่อง (Servings Per Container) เพื่อคำนวณอัตราส่วนการกินจริง 2) สังเกตปริมาณโปรตีนที่สูงเพื่อช่วยเสริมสร้างกล้ามเนื้อ 3) หลีกเลี่ยงอาหารที่มีไขมันทรานส์ (Trans Fat) และ 4) ตรวจสอบเปอร์เซ็นต์ปริมาณสารอาหารแนะนำต่อวัน (% Daily Value) โดยโซเดียมและไขมันอิ่มตัวไม่ควรเกิน 20% ของระดับความต้องการต่อวัน"
        />
      </SEOFAQ>
    </div>
  );
}

// 10. BakeryCostEstimator
export function BakeryCostEstimator({ lang }: { lang: any }) {
  const [yieldPieces, setYieldPieces] = useState<number>(10);
  const [ingredients, setIngredients] = useState<any[]>([
    { name: "แป้งสาลี / Flour", packagePrice: 45, packageSize: 1000, amountUsed: 500 },
    { name: "เนยสด / Butter", packagePrice: 180, packageSize: 1000, amountUsed: 200 },
    { name: "น้ำตาลทราย / Sugar", packagePrice: 30, packageSize: 1000, amountUsed: 150 },
    { name: "ไข่ไก่ / Eggs", packagePrice: 120, packageSize: 30, amountUsed: 4 } // 30 eggs pack
  ]);
  const [singlePackaging, setSinglePackaging] = useState<number>(3);
  const [laborHours, setLaborHours] = useState<number>(1.5);
  const [laborRate, setLaborRate] = useState<number>(80);
  const [overhead, setOverhead] = useState<number>(20);
  const [profitMargin, setProfitMargin] = useState<number>(40);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", packagePrice: 0, packageSize: 1, amountUsed: 0 }]);
  };

  const removeIngredient = (index: number) => {
    const next = [...ingredients];
    next.splice(index, 1);
    setIngredients(next);
  };

  const updateIngredient = (index: number, key: string, val: any) => {
    const next = [...ingredients];
    next[index][key] = val;
    setIngredients(next);
  };

  const calculate = () => {
    let baseIngredientCost = 0;
    ingredients.forEach((item) => {
      const price = parseFloat(item.packagePrice) || 0;
      const size = parseFloat(item.packageSize) || 1;
      const amount = parseFloat(item.amountUsed) || 0;
      baseIngredientCost += (price / size) * amount;
    });

    const laborCost = laborHours * laborRate;
    const batchTotalCost = baseIngredientCost + laborCost + overhead;
    const pieceProductionCost = yieldPieces > 0 ? (batchTotalCost / yieldPieces) : 0;
    const pieceTotalCostWithPack = pieceProductionCost + singlePackaging;
    
    // Selling price based on profit margin
    // Price = Cost / (1 - Margin/100)
    const sellingPrice = profitMargin < 100 ? (pieceTotalCostWithPack / (1 - profitMargin / 100)) : 0;
    const profitPerPiece = sellingPrice - pieceTotalCostWithPack;

    return {
      ingredientsCost: baseIngredientCost.toFixed(2),
      laborCost: laborCost.toFixed(2),
      batchTotalCost: batchTotalCost.toFixed(2),
      pieceProductionCost: pieceProductionCost.toFixed(2),
      pieceTotalCostWithPack: pieceTotalCostWithPack.toFixed(2),
      sellingPrice: sellingPrice.toFixed(2),
      profitPerPiece: profitPerPiece.toFixed(2)
    };
  };

  const results = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
          <Scale className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">
            {lang === "TH" ? "เครื่องมือคำนวณต้นทุนเบเกอรี่" : "Bakery & Recipe Cost Estimator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "คำนวณงบประมาณทำขนมสูตรต่างๆ รายชิ้น กำหนดกำไร และราคาแนะนำเพื่อความมั่นคงธุรกิจโฮมเมด" : "Break down custom recipe baking cost per unit, set targets, and output retail pricing."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-700 dark:text-gray-300">{lang === "TH" ? "ส่วนผสมในการทำต่อหนึ่งสูตร (Batch Ingredients)" : "Ingredients in Recipe Batch"}</h3>
            <button 
              onClick={addIngredient} 
              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs flex items-center gap-1 transition"
            >
              <Plus className="w-3.5 h-3.5" /> {lang === "TH" ? "เพิ่มส่วนผสม" : "Add Ingredient"}
            </button>
          </div>

          <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
            {ingredients.map((item, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl relative">
                <input 
                  type="text" 
                  placeholder={lang === "TH" ? "ชื่อวัตถุดิบ" : "Ingredient"} 
                  className={`${inputClass} sm:col-span-1`} 
                  value={item.name} 
                  onChange={(e) => updateIngredient(index, "name", e.target.value)} 
                />
                <input 
                  type="number" 
                  placeholder={lang === "TH" ? "ราคาแพ็คเกจ (฿)" : "Price (฿)"} 
                  className={inputClass} 
                  value={item.packagePrice || ""} 
                  onChange={(e) => updateIngredient(index, "packagePrice", e.target.value)} 
                />
                <input 
                  type="number" 
                  placeholder={lang === "TH" ? "ปริมาณรวมแพ็ค (g/ml)" : "Weight/Volume"} 
                  className={inputClass} 
                  value={item.packageSize || ""} 
                  onChange={(e) => updateIngredient(index, "packageSize", e.target.value)} 
                />
                <div className="flex gap-1">
                  <input 
                    type="number" 
                    placeholder={lang === "TH" ? "ปริมาณที่สูตรต้องการ" : "Recipe Amount"} 
                    className={inputClass} 
                    value={item.amountUsed || ""} 
                    onChange={(e) => updateIngredient(index, "amountUsed", e.target.value)} 
                  />
                  <button 
                    onClick={() => removeIngredient(index)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div>
              <label className={labelClass}>{lang === "TH" ? "จำนวนชิ้นต่อสูตร" : "Yield (pieces)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={yieldPieces} 
                onChange={(e) => setYieldPieces(Math.max(1, parseInt(e.target.value) || 1))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่ากล่อง/แพ็คเกจต่อชิ้น" : "Pkg Cost / Piece"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={singlePackaging} 
                onChange={(e) => setSinglePackaging(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าไฟเตาอบ/น้ำต่อสูตร" : "Overhead / Batch"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={overhead} 
                onChange={(e) => setOverhead(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "กำไรเป้าหมาย (%)" : "Profit Target (%)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={profitMargin} 
                onChange={(e) => setProfitMargin(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "เวลาที่ใช้ชง/อบ (ชั่วโมง)" : "Labor Hours"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={laborHours} 
                onChange={(e) => setLaborHours(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าแรงตัวเอง (บาท/ชั่วโมง)" : "Labor Rate (฿/hr)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={laborRate} 
                onChange={(e) => setLaborRate(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col justify-between border border-emerald-100 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {lang === "TH" ? "🍰 สรุปต้นทุนและราคาขาย" : "🍰 Cost Analysis Output"}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ต้นทุนวัตถุดิบรวมต่อสูตร:" : "Ingredients cost per batch:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.ingredientsCost}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ค่าแรงชงอบต่อสูตร:" : "Labor Cost per batch:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.laborCost}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400 font-bold text-emerald-700 dark:text-emerald-400">{lang === "TH" ? "ต้นทุนผลิตจริงต่อชิ้น:" : "Production Cost per piece:"}</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">฿{results.pieceProductionCost}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ต้นทุนรวมบรรจุภัณฑ์ต่อชิ้น:" : "Total Cost with Pkg:"}</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">฿{results.pieceTotalCostWithPack}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ราคาขายขั้นต่ำแนะนำ:" : "Suggested Retail Price:"}</span>
                <span className="font-black text-lg text-emerald-600 dark:text-emerald-400">฿{results.sellingPrice}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "กำไรสุทธิต่อชิ้น:" : "Net Profit per Piece:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.profitPerPiece}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalculationSteps 
        steps={lang === "TH" ? [
          "คำนวณมูลค่าวัตถุดิบทั้งหมดต่อถาดชิ้นงาน: นำสัดส่วนส่วนผสมคูณราคาซื้อหน่วยจริงเพื่อหายอดจ่ายรวมของแป้ง เนย น้ำตาล",
          "ประเมินค่าแรงแฝงและค่าไฟฟ้า: นำจำนวนชั่วโมงที่ลงมือทำจริง คูณกับอัตราค่าแรงที่คุณพึงได้รับรายชั่วโมง บวกกับค่าไฟประเมินในการอบ",
          "คิดต้นทุนเฉลี่ยรายหน่วย: นำค่าใช้จ่ายรวมทั้งหมดของสูตรนั้นหารด้วยจำนวนชิ้นผลงานที่ผลิตได้จริง เพื่อหาต้นทุนดิบรายชิ้น",
          "หาจุดตั้งราคาขาย: เอาต้นทุนบวกค่าบรรจุภัณฑ์ แล้วคำนวณกับกำไรส่วนต่างที่คาดหวังผ่านสูตรคณิตศาสตร์เปอร์เซ็นต์มาร์จิ้น"
        ] : [
          "Find total raw material costs: Multiply package unit costs by exact recipe weights used in the baking batch.",
          "Add labor and electrical overhead: Multiply hours of hands-on labor by your hourly wage, and add oven utility costs.",
          "Compute unit cost: Divide the entire batch cost by the number of units generated to find the base piece cost.",
          "Determine final sales price: Factor in the box/wrapper cost, and apply your target margin calculation."
        ]} 
      />

      <SEOFAQ>
        <FAQItem 
          question="ทำไมการทำเบเกอรี่โฮมเมดขายถึงต้องคิดคำนวณค่าแรงตัวเอง (Labor Cost) ลงในต้นทุน?"
          answer="นักอบขนมมือใหม่หลายคนมักไม่คิดค่าแรงตัวเองเพราะทำในครัวบ้านและทำเพื่อความรัก ทำให้ตั้งราคาขนมไว้ต่ำมากจนดูเหมือนได้กำไรดีจากต้นทุนวัตถุดิบ แต่เมื่อใดก็ตามที่เริ่มขยายกิจการและไม่มีเวลาทำเองจนต้องจ้างพนักงานพาร์ทไทม์หรือลูกมือ ร้านจะตกอยู่ในสภาวะขาดทุนทันทีเนื่องจากโครงสร้างราคาไม่มีที่ว่างสำหรับค่าจ้างพนักงาน การคิดค่าแรงตัวเองตั้งแต่เริ่มต้นจะทำให้ราคาสมเหตุสมผลและสะท้อนคุณค่างานฝีมือที่แท้จริง"
        />
        <FAQItem 
          question="จะสามารถคำนวณหรือประเมินค่าไฟฟ้าในการอบขนม (Oven Utility Cost) ให้ใกล้เคียงความจริงอย่างไร?"
          answer="หลักการคำนวณค่าไฟเตาอบง่ายๆ คือ: 1) ดูอัตราการกินไฟของเตาอบ (มีหน่วยเป็นกิโลวัตต์ หรือวัตต์ที่หารด้วย 1,000 เช่น เตาอบขนาด 2,000 วัตต์ เท่ากับ 2 กิโลวัตต์) 2) คูณด้วยจำนวนชั่วโมงที่ใช้งานจริงในการอบ (เช่น อบเป็นเวลา 1.5 ชั่วโมง จะกินไฟเท่ากับ 2 * 1.5 = 3 หน่วยหรือยูนิต) 3) คูณด้วยค่าไฟฟ้าราคาเฉลี่ยต่อหน่วยของการไฟฟ้า (สมมติเฉลี่ยหน่วยละ 4.5 บาท จะได้ค่าไฟเตาอบรวมเท่ากับ 3 * 4.5 = 13.5 บาทต่อถาด)"
        />
        <FAQItem 
          question="อัตราส่วนกำไรขั้นต้น (Profit Margin Target) ที่คาดหวังสำหรับขนมปังและเค้กควรตั้งไว้เท่าไหร่?"
          answer="สำหรับธุรกิจเบเกอรี่ อัตราส่วนกำไรขั้นต้น (Gross Profit Margin) ที่แนะนำควรตั้งไว้ที่ 40% ถึง 60% ของราคาขาย (นั่นคือราคาขายแนะนำจะอยู่ราวๆ 2 ถึง 2.5 เท่าของต้นทุนผลิตรวม) เนื่องจากขนมสดมีอายุการจัดเก็บสั้น (Shelf-life short) มีโอกาสเกิดของเน่าเสียค้างสต็อกหรือเสียหายขณะนำไปจัดส่งได้ง่าย กำไรเป้าหมายที่สูงพอจะช่วยรองรับความเสี่ยงตรงนี้"
        />
        <FAQItem 
          question="มีเทคนิคการเพิ่มกำไรให้กับธุรกิจทำขนมโฮมเมดได้อย่างไรบ้าง?"
          answer="วิธีการเพิ่มกำไรที่ได้ผลดีมีดังนี้: 1) ค้นหาช่องทางซื้อวัตถุดิบยกลังหรือยกกระสอบจากยี่ปั๊วค้าส่งแป้งและเนย 2) ออกแบบบรรจุภัณฑ์และสติกเกอร์ให้น่าดึงดูดใจเพื่อเพิ่มคุณค่าที่มองเห็น (Perceived Value) ทำให้ปรับราคาขายขึ้นได้ 3) วางแผนการอบขนมเป็นล็อตใหญ่พร้อมๆ กันเพื่อประหยัดไฟวอร์มเตาอบ และ 4) ปล่อยเมนูขนมพิเศษประจำฤดูกาล (Seasonal items) ที่มีต้นทุนวัตถุดิบต่ำแต่ทำราคาได้สูง"
        />
      </SEOFAQ>
    </div>
  );
}

import React, { useState } from 'react';
import { Utensils, ShoppingBag, Wallet, Flame, ArrowRight, CheckCircle } from 'lucide-react';

export default function FoodDeliveryVsCooking({ lang = 'TH' }: any) {
  // Delivery Inputs
  const [mealsPerDay, setMealsPerDay] = useState<number>(2); // meals
  const [mealPrice, setMealPrice] = useState<number>(80); // Baht/meal
  const [deliveryFee, setDeliveryFee] = useState<number>(15); // Baht/meal
  const [deliveryDays, setDeliveryDays] = useState<number>(30); // days/month

  // Cooking Inputs
  const [meatPerWeek, setMeatPerWeek] = useState<number>(500); // Baht/week
  const [vegPerWeek, setVegPerWeek] = useState<number>(200); // Baht/week
  const [ricePerMonth, setRicePerMonth] = useState<number>(200); // Baht/month
  const [seasoningPerMonth, setSeasoningPerMonth] = useState<number>(150); // Baht/month
  const [utilitiesPerMonth, setUtilitiesPerMonth] = useState<number>(100); // Baht/month (gas, elec)

  // Calculations
  const dailyDeliveryCost = (mealPrice + deliveryFee) * mealsPerDay;
  const monthlyDeliveryCost = dailyDeliveryCost * deliveryDays;

  const monthlyCookingCost = (meatPerWeek * 4.3) + (vegPerWeek * 4.3) + ricePerMonth + seasoningPerMonth + utilitiesPerMonth;

  const diff = Math.abs(monthlyDeliveryCost - monthlyCookingCost);
  const isCookingCheaper = monthlyCookingCost < monthlyDeliveryCost;

  const t = {
    TH: {
      title: "เปรียบเทียบ สั่งเดลิเวอรี่ vs ทำกินเอง",
      deliverySection: "สายสั่งเดลิเวอรี่ (Delivery)",
      cookingSection: "สายเข้าครัวทำเอง (Cooking)",
      mealsPerDay: "สั่งวันละกี่มื้อ (มื้อ)",
      mealPrice: "ราคาอาหารเฉลี่ยต่อมื้อ (บาท)",
      deliveryFee: "ค่าส่ง/ทิปเฉลี่ยต่อมื้อ (บาท)",
      deliveryDays: "จำนวนวันที่สั่งต่อเดือน (วัน)",
      meatPerWeek: "ค่าเนื้อสัตว์/ไข่ ต่อสัปดาห์ (บาท)",
      vegPerWeek: "ค่าผัก/ผลไม้ ต่อสัปดาห์ (บาท)",
      ricePerMonth: "ค่าข้าวสาร/คาร์บ ต่อเดือน (บาท)",
      seasoningPerMonth: "ค่าเครื่องปรุง/น้ำมัน ต่อเดือน (บาท)",
      utilitiesPerMonth: "ค่าแก๊ส/ค่าไฟ คาดคะเนต่อเดือน (บาท)",
      results: "เปรียบเทียบค่าใช้จ่ายรายเดือน",
      monthlyDelivery: "รวมค่าสั่งอาหาร",
      monthlyCooking: "รวมค่าทำอาหาร",
      savingTitle: "ทางเลือกที่ประหยัดเงินกว่า",
      saveText: "ประหยัดกว่าเดือนละ",
      baht: "บาท/เดือน",
      deliveryWinner: "สั่งเดลิเวอรี่",
      cookingWinner: "ทำอาหารกินเอง",
      seoTitle: "สั่งเดลิเวอรี่ หรือ ซื้อของมาทำกินเอง แบบไหนประหยัดเงินกว่ากัน?",
      seoH2_1: "ยุคข้าวยากหมากแพง ทำกินเองประหยัดกว่าจริงหรือ?",
      seoP_1: "หลายคนมีความเชื่อว่าการซื้อวัตถุดิบมาทำอาหารกินเองที่บ้าน ช่วยประหยัดเงินได้มากกว่าการกดสั่งอาหารผ่านแอปพลิเคชัน (Food Delivery) อย่าง LINE MAN, Grab, หรือ Foodpanda ซึ่งโดยส่วนใหญ่แล้วก็มักจะเป็นความจริงหากคุณทำอาหารทานเป็นประจำ แต่ถ้าคุณทำกินเองแค่อาทิตย์ละครั้ง วัตถุดิบอาจเน่าเสียและกลายเป็นต้นทุนที่แพงกว่าการสั่งข้าวกล่อง เครื่องมือนี้จึงออกแบบมาเพื่อช่วยคำนวณเปรียบเทียบค่าใช้จ่ายที่แท้จริงในแต่ละเดือน",
      seoH2_2: "ต้นทุนแฝงของการสั่งเดลิเวอรี่",
      seoP_2: "1. ค่าจัดส่ง (Delivery Fee) ที่บวกเพิ่มในแต่ละรอบ \n2. ราคาอาหารในแอปมักจะแพงกว่าหน้าร้าน (GP Markup) ประมาณ 20-30% \n3. โปรโมชั่นล่อใจที่ทำให้เราสั่งเกินความจำเป็น (Minimum Order) \nแม้จะมีความสะดวกสบายส่งตรงถึงหน้าประตู แต่หากสั่งวันละ 2-3 มื้อทุกวัน เงินจำนวนนี้เมื่อรวมเป็นรายเดือนอาจเทียบเท่ากับค่าผ่อนรถได้เลยทีเดียว",
      seoH2_3: "ต้นทุนแฝงของการทำอาหารเอง",
      seoP_3: "1. ค่าเดินทางไปตลาดหรือซูเปอร์มาร์เก็ต \n2. ค่าแก๊สหุงต้ม หรือค่าไฟฟ้า (หากใช้เตาแม่เหล็กไฟฟ้า) \n3. ค่าเครื่องปรุงรสต่างๆ ที่ต้องซื้อตุนไว้ \n4. 'เวลา' และ 'แรงงาน' ที่เสียไปกับการเตรียมของ ปรุงอาหาร และล้างจาน \nข้อดีที่สำคัญของการทำอาหารเองคือ เราสามารถควบคุมคุณภาพ ความสะอาด และปริมาณโซเดียมหรือน้ำตาลได้ ซึ่งส่งผลดีต่อสุขภาพในระยะยาว",
      seoH2_4: "เคล็ดลับทำอาหารกินเองให้คุ้มค่าที่สุด",
      seoP_4: "หากอยากให้การทำอาหารกินเองประหยัดที่สุด แนะนำให้ใช้วิธี 'Meal Prep' หรือการทำอาหารทีละเยอะๆ แล้วแบ่งใส่กล่องแช่ตู้เย็นไว้กินหลายมื้อ ซึ่งจะช่วยประหยัดทั้งเวลา ค่าไฟ และลดปัญหาการซื้อวัตถุดิบมาแล้วใช้ไม่หมดจนต้องทิ้ง"
    },
    EN: {
      title: "Food Delivery vs Cooking Calculator",
      deliverySection: "Food Delivery",
      cookingSection: "Home Cooking",
      mealsPerDay: "Meals ordered per day",
      mealPrice: "Average meal price (Baht)",
      deliveryFee: "Average delivery fee (Baht)",
      deliveryDays: "Days ordered per month",
      meatPerWeek: "Meat/Protein per week (Baht)",
      vegPerWeek: "Vegetables per week (Baht)",
      ricePerMonth: "Rice/Carbs per month (Baht)",
      seasoningPerMonth: "Seasonings/Oil per month (Baht)",
      utilitiesPerMonth: "Est. Gas/Elec per month (Baht)",
      results: "Monthly Expense Comparison",
      monthlyDelivery: "Total Delivery Cost",
      monthlyCooking: "Total Cooking Cost",
      savingTitle: "More Cost-Effective Option",
      saveText: "Saves per month",
      baht: "Baht/mo",
      deliveryWinner: "Food Delivery",
      cookingWinner: "Home Cooking",
      seoTitle: "Food Delivery vs Home Cooking: Which saves more money?",
      seoH2_1: "Does cooking at home really save money?",
      seoP_1: "It's a common belief that buying groceries to cook at home is much cheaper than ordering food via delivery apps. While generally true for regular cooking, if you only cook once a week, spoiled ingredients can make it more expensive than ordering out. This calculator helps you compare the actual monthly costs based on your habits.",
      seoH2_2: "Hidden Costs of Food Delivery",
      seoP_2: "1. Delivery fees added to each order. \n2. App prices are often marked up 20-30% compared to dine-in. \n3. Minimum order promotions encourage over-ordering. \nWhile extremely convenient, ordering 2-3 times daily can accumulate to a monthly expense equivalent to a car installment.",
      seoH2_3: "Hidden Costs of Cooking",
      seoP_3: "1. Travel costs to supermarkets/markets. \n2. Utilities (Gas/Electricity). \n3. Stocking up on various seasonings. \n4. 'Time' and 'Energy' spent prepping, cooking, and washing dishes. \nThe major advantage of home cooking is complete control over ingredients, hygiene, and health (less sodium/sugar).",
      seoH2_4: "Tips to maximize cooking savings",
      seoP_4: "To make home cooking truly cost-effective, try 'Meal Prepping'. Cooking in large batches and portioning it into containers for the week saves time, utilities, and minimizes food waste."
    }
  };

  const text = t[lang as keyof typeof t] || t.TH;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-2">
          <ShoppingBag className="w-8 h-8 text-orange-600" />
          <span className="mx-2 text-orange-300 font-bold">VS</span>
          <Utensils className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{text.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Delivery Inputs */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 space-y-6">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-800">{text.deliverySection}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.mealsPerDay}</label>
              <input
                type="number"
                value={mealsPerDay}
                onChange={(e) => setMealsPerDay(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.deliveryDays}</label>
              <input
                type="number"
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                min="1"
                max="31"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{text.mealPrice}</label>
            <input
              type="number"
              value={mealPrice}
              onChange={(e) => setMealPrice(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{text.deliveryFee}</label>
            <input
              type="number"
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              min="0"
            />
          </div>
        </div>

        {/* Cooking Inputs */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 space-y-6">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
            <Flame className="w-5 h-5 text-emerald-500" />
            <h2 className="text-lg font-semibold text-gray-800">{text.cookingSection}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.meatPerWeek}</label>
              <input
                type="number"
                value={meatPerWeek}
                onChange={(e) => setMeatPerWeek(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.vegPerWeek}</label>
              <input
                type="number"
                value={vegPerWeek}
                onChange={(e) => setVegPerWeek(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.ricePerMonth}</label>
              <input
                type="number"
                value={ricePerMonth}
                onChange={(e) => setRicePerMonth(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.seasoningPerMonth}</label>
              <input
                type="number"
                value={seasoningPerMonth}
                onChange={(e) => setSeasoningPerMonth(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{text.utilitiesPerMonth}</label>
            <input
              type="number"
              value={utilitiesPerMonth}
              onChange={(e) => setUtilitiesPerMonth(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-orange-50 rounded-3xl p-6 sm:p-8 border border-orange-100 relative overflow-hidden">
        <h3 className="text-xl font-bold text-orange-900 mb-8">{text.results}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className={`bg-white p-6 rounded-2xl shadow-sm border-2 transition-all ${!isCookingCheaper ? 'border-orange-400' : 'border-transparent'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="text-gray-500 font-medium">{text.monthlyDelivery}</div>
              {!isCookingCheaper && <CheckCircle className="w-5 h-5 text-orange-500" />}
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {monthlyDeliveryCost.toLocaleString('en-US', { maximumFractionDigits: 0 })} <span className="text-base font-normal text-gray-500">{text.baht.split('/')[0]}</span>
            </div>
          </div>

          <div className={`bg-white p-6 rounded-2xl shadow-sm border-2 transition-all ${isCookingCheaper ? 'border-emerald-400' : 'border-transparent'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="text-gray-500 font-medium">{text.monthlyCooking}</div>
              {isCookingCheaper && <CheckCircle className="w-5 h-5 text-emerald-500" />}
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {monthlyCookingCost.toLocaleString('en-US', { maximumFractionDigits: 0 })} <span className="text-base font-normal text-gray-500">{text.baht.split('/')[0]}</span>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white shadow-md ${isCookingCheaper ? 'bg-emerald-500' : 'bg-orange-500'}`}>
          <div>
            <div className="opacity-90 text-sm mb-1">{text.savingTitle}</div>
            <div className="text-2xl font-bold flex items-center gap-2">
              {isCookingCheaper ? <Utensils className="w-6 h-6" /> : <ShoppingBag className="w-6 h-6" />}
              {isCookingCheaper ? text.cookingWinner : text.deliveryWinner}
            </div>
          </div>
          <div className="text-center sm:text-right bg-black/10 rounded-xl px-6 py-3">
            <div className="opacity-90 text-sm mb-1">{text.saveText}</div>
            <div className="text-2xl font-bold flex items-center justify-center sm:justify-end gap-1">
              {diff.toLocaleString('en-US', { maximumFractionDigits: 0 })} <span className="text-base font-normal">{text.baht}</span>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-12 prose prose-stone max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{text.seoTitle}</h2>
        <p className="mb-6 leading-relaxed">{text.seoP_1}</p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">{text.seoH2_2}</h3>
        <p className="mb-6 leading-relaxed whitespace-pre-line">{text.seoP_2}</p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">{text.seoH2_3}</h3>
        <p className="mb-6 leading-relaxed whitespace-pre-line">{text.seoP_3}</p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">{text.seoH2_4}</h3>
        <p className="mb-6 leading-relaxed">{text.seoP_4}</p>
      </article>
    </div>
  );
}

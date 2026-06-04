"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  inputClass, 
  labelClass, 
  SEOFAQ, 
  FAQItem, 
  CalculationSteps 
} from "./shared";
import { 
  Utensils, Coffee, Clock, Scale, Flame, RefreshCw, 
  Plus, Trash2, HelpCircle, DollarSign, ShoppingCart, Info, TrendingUp
} from "lucide-react";

// 1. GuestFoodEstimator
export function GuestFoodEstimator({ lang }: { lang: any }) {
  const [guests, setGuests] = useState<number>(50);
  const [eventType, setEventType] = useState<string>("buffet");
  const [duration, setDuration] = useState<number>(3);
  const [appetite, setAppetite] = useState<string>("average");

  const calculate = () => {
    let foodMultiplier = 0.45; // kg of food per person total
    let drinkMultiplier = 0.35; // liters per person per hour
    let iceMultiplier = 0.5; // kg per person

    if (eventType === "cocktail") {
      foodMultiplier = 0.25;
      drinkMultiplier = 0.45;
    } else if (eventType === "sitdown") {
      foodMultiplier = 0.55;
      drinkMultiplier = 0.3;
    } else if (eventType === "party") {
      foodMultiplier = 0.5;
      drinkMultiplier = 0.5;
      iceMultiplier = 0.8;
    }

    if (appetite === "light") {
      foodMultiplier *= 0.8;
    } else if (appetite === "heavy") {
      foodMultiplier *= 1.25;
    }

    // Adjust for duration (longer duration = more food & drink consumption)
    const durationFactor = 1 + (duration - 2) * 0.12;
    const adjustedFood = foodMultiplier * guests * durationFactor;
    const adjustedDrinks = drinkMultiplier * guests * duration;
    const adjustedIce = iceMultiplier * guests * (1 + (duration - 2) * 0.15);

    // Appetizers (pieces)
    const appetizers = eventType === "cocktail" 
      ? Math.ceil(guests * duration * (appetite === "heavy" ? 6 : appetite === "light" ? 4 : 5))
      : Math.ceil(guests * 2.5);

    return {
      foodKg: adjustedFood.toFixed(1),
      drinksLiters: adjustedDrinks.toFixed(1),
      iceKg: adjustedIce.toFixed(1),
      appetizers: appetizers
    };
  };

  const results = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl text-amber-600 dark:text-amber-400">
          <Utensils className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">
            {lang === "TH" ? "เครื่องมือคำนวณปริมาณอาหารจัดเลี้ยง" : "Catering Guest Food Estimator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "คำนวณปริมาณอาหาร เครื่องดื่ม และน้ำแข็งที่ต้องเตรียมสำหรับจำนวนแขกอย่างแม่นยำ" : "Estimate total food, drinks, and ice volume needed for your guests."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "จำนวนแขก (คน)" : "Number of Guests"}</label>
            <input 
              type="number" 
              className={inputClass} 
              value={guests} 
              onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 0))} 
            />
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "ประเภทของงานจัดเลี้ยง" : "Event Type"}</label>
            <select 
              className={inputClass} 
              value={eventType} 
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="buffet">{lang === "TH" ? "บุฟเฟต์ (Buffet)" : "Buffet"}</option>
              <option value="cocktail">{lang === "TH" ? "ค็อกเทล / งานสังสรรค์ชิ้นเล็ก" : "Cocktail Party"}</option>
              <option value="sitdown">{lang === "TH" ? "โต๊ะจีน / เซ็ตคอร์สเสิร์ฟโต๊ะ" : "Sit-down Dinner"}</option>
              <option value="party">{lang === "TH" ? "งานปาร์ตี้เครื่องดื่ม / สังสรรค์เน้นสนุก" : "Drinking Party"}</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "ระยะเวลาจัดงาน (ชั่วโมง)" : "Event Duration (Hours)"}</label>
            <input 
              type="number" 
              className={inputClass} 
              value={duration} 
              onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 0))} 
            />
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "ระดับการกินของแขก" : "Guest Appetite Level"}</label>
            <select 
              className={inputClass} 
              value={appetite} 
              onChange={(e) => setAppetite(e.target.value)}
            >
              <option value="light">{lang === "TH" ? "กินน้อย / เน้นคุย" : "Light"}</option>
              <option value="average">{lang === "TH" ? "กินปานกลาง / ทั่วไป" : "Average"}</option>
              <option value="heavy">{lang === "TH" ? "เน้นกินจุ / กินจริงจัง" : "Heavy"}</option>
            </select>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col justify-between border border-amber-100 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {lang === "TH" ? "📊 สรุปปริมาณที่ควรจัดเตรียม" : "📊 Estimated Quantity Summary"}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "น้ำหนักอาหารรวม:" : "Total Food Weight:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.foodKg} kg</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ปริมาณของเล่น / ออร์เดิร์ฟ:" : "Appetizers / Finger Food:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.appetizers} {lang === "TH" ? "ชิ้น" : "pieces"}</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "เครื่องดื่มรวม:" : "Total Beverages:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.drinksLiters} L</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ปริมาณน้ำแข็งที่ต้องใช้:" : "Ice Required:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.iceKg} kg</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-amber-700 dark:text-amber-400 mt-4 bg-amber-100/50 dark:bg-amber-900/20 p-3 rounded-lg">
            * {lang === "TH" ? "ข้อแนะนำ: ควรเตรียมอาหารและเครื่องดื่มเผื่อไว้ 10-15% เสมอ ป้องกันกรณีฉุกเฉินและมีแขกเดินทางมาเพิ่มเติม" : "Note: We recommend adding 10-15% extra to prevent shortfalls and accommodate unexpected walk-ins."}
          </div>
        </div>
      </div>

      <CalculationSteps 
        steps={lang === "TH" ? [
          "คำนวณปริมาณอาหารขั้นต้น: แขกทั่วไปจะบริโภคอาหารเฉลี่ยคนละ 450-550 กรัม สำหรับระยะเวลา 2 ชั่วโมงแรก",
          "ปรับระดับตามความจุความอยากอาหาร: ปรับตัวแปรคูณลดลง 20% สำหรับแขกกินน้อย และคูณเพิ่ม 25% สำหรับแขกกินจุ",
          "คำนวณชั่วโมงจัดงาน: หากจัดงานเกิน 2 ชั่วโมง ปริมาณอาหารจะถูกคูณเพิ่ม 12% ต่อทุกๆ 1 ชั่วโมงที่เพิ่มขึ้น",
          "คำนวณเครื่องดื่ม: ใช้อัตรา 350 มล. ต่อคนต่อชั่วโมง และน้ำแข็ง 0.5 กก. ถึง 0.8 กก. ต่อคนเพื่อการแช่เย็น"
        ] : [
          "Calculate base food weight: Average consumption is 450g-550g per person for the first 2 hours.",
          "Adjust by appetite: Reduce by 20% for light eaters, and increase by 25% for heavy eaters.",
          "Factor in duration: For events longer than 2 hours, add 12% food volume for each additional hour.",
          "Calculate drinks & ice: Estimate 350ml of drinks per person per hour and 0.5kg-0.8kg of ice per guest."
        ]} 
      />

      <SEOFAQ>
        <FAQItem 
          question="วิธีการประเมินปริมาณอาหารสำหรับงานจัดเลี้ยงตามจำนวนแขกมีหลักการอย่างไร?"
          answer="การประเมินปริมาณอาหารจัดเลี้ยงเบื้องต้นจะต้องคำนึงถึงประเภทของงานเลี้ยงเป็นหลัก โดยทั่วไปสามารถแบ่งออกได้เป็น: 1) งานค็อกเทล (Cocktail Party) เน้นอาหารชิ้นพอดีคำ ควรเตรียมอาหารประมาณ 5-7 ชิ้นต่อคนต่อชั่วโมง สำหรับงานที่มีระยะเวลา 2-3 ชั่วโมง และเพิ่มเป็น 10-12 ชิ้นต่อคนหากเป็นงานยาวหรือจัดแทนมื้ออาหารหลัก 2) งานบุฟเฟต์ (Buffet) หรืออาหารตักเอง ควรเตรียมอาหารเฉลี่ยประมาณ 400-500 กรัมต่อคน (แบ่งเป็นเนื้อสัตว์ 150-200 กรัม ผักและคาร์โบไฮเดรตอย่างละ 150 กรัม) 3) งานโต๊ะจีนหรือเซ็ตคอร์ส (Sit-down Dinner) ปริมาณจะถูกควบคุมตามจำนวนจานของร้านอาหารอยู่แล้ว แต่ควรเตรียมเผื่อสำหรับแขกที่อาจมาเพิ่มประมาณ 5-10% เสมอ เพื่อลดความเสี่ยงที่อาหารจะไม่เพียงพอ"
        />
        <FAQItem 
          question="ปัจจัยสำคัญใดบ้างที่ส่งผลต่อการเปลี่ยนแปลงของปริมาณการบริโภคอาหารและน้ำดื่ม?"
          answer="ปัจจัยสำคัญที่ผู้จัดงานเลี้ยงห้ามมองข้ามคือ: 1) ช่วงเวลาจัดงาน: หากจัดงานตรงกับเวลาอาหารหลัก เช่น มื้อกลางวันหรือมื้อเย็น แขกจะรับประทานอาหารปริมาณมากกว่าการจัดงานในช่วงบ่ายหรือช่วงค่ำหลังมื้ออาหาร 2) ระยะเวลาของงาน: ยิ่งงานจัดยาวเท่าไหร่ ปริมาณการบริโภคอาหารและเครื่องดื่มก็จะเพิ่มขึ้นตามชั่วโมง โดยเฉพาะเครื่องดื่มและของทานเล่น 3) ความหลากหลายของแขก: กลุ่มวัยรุ่นหรือคนทำงานรุ่นใหม่มักจะรับประทานอาหารในปริมาณที่มากกว่ากลุ่มผู้สูงอายุหรือเด็กเล็ก และ 4) ประเภทของงานและกิจกรรม: งานที่มีการเต้นรำหรือการเคลื่อนไหวร่างกายเยอะ จะทำให้แขกหิวและรับประทานเยอะขึ้น"
        />
        <FAQItem 
          question="การเตรียมปริมาณเครื่องดื่ม น้ำอัดลม และน้ำดื่ม สำหรับงานเลี้ยงต้องใช้สัดส่วนเท่าใด?"
          answer="เครื่องดื่มเป็นสิ่งที่ขาดไม่ได้และมักหมดเร็วกว่าที่คิด หลักการคำนวณง่ายๆ คือ แขก 1 คนจะดื่มน้ำประมาณ 1-2 แก้ว (ประมาณ 250-500 มิลลิลิตร) ในชั่วโมงแรก และประมาณ 1 แก้วในชั่วโมงถัดๆ ไป สำหรับงานทั่วไปที่ไม่มีแอลกอฮอล์ ควรเตรียมน้ำดื่มสะอาดเฉลี่ย 500-750 มิลลิลิตรต่อคน และน้ำหวานหรือน้ำอัดลมอีกประมาณ 300 มิลลิลิตรต่อคน หากเป็นงานที่มีเครื่องดื่มแอลกอฮอล์ เช่น เบียร์หรือไวน์ ควรเตรียมเบียร์ประมาณ 2-3 กระป๋องต่อคน สำหรับงาน 3 ชั่วโมง หรือไวน์ 1 ขวดต่อแขกทุกๆ 2-3 คน การเตรียมเผื่อไว้จะช่วยลดความติดขัดในงานจัดเลี้ยงได้เป็นอย่างดี"
        />
        <FAQItem 
          question="เคล็ดลับการจัดการกับปัญหาอาหารเหลือในงานเลี้ยง (Food Waste Reduction) มีอะไรบ้าง?"
          answer="เพื่อไม่ให้เกิดการสูญเสียอาหารและประหยัดงบประมาณ ควรปฏิบัติ ดังนี้: 1) ทำการยืนยันจำนวนแขก (RSVP) ที่แน่นอนก่อนวันงานอย่างน้อย 3-5 วัน 2) เลือกจัดอาหารแบบบุฟเฟต์ที่มีเมนูหลากหลายแต่ปริมาณพอดี แทนที่จะเน้นเมนูเดียวในปริมาณมหาศาล 3) พูดคุยกับผู้ให้บริการจัดเลี้ยง (Caterer) เพื่อตกลงเรื่องการห่ออาหารที่เหลือกลับบ้าน หรือจัดเตรียมกล่องบรรจุภัณฑ์สะอาดไว้ล่วงหน้า และ 4) จัดแบ่งพื้นที่วางอาหารแยกเป็นโซน เพื่อให้อาหารที่ยังไม่ได้ตักเสิร์ฟสามารถเก็บรักษาในอุณหภูมิที่เหมาะสมและนำไปบริโภคต่อได้ปลอดภัย ถือเป็นเทคนิคสำคัญที่ช่วยรักษาสิ่งแวดล้อมและลดรายจ่าย"
        />
      </SEOFAQ>
    </div>
  );
}

// 2. CookingVsDelivery
export function CookingVsDelivery({ lang }: { lang: any }) {
  const [deliveryPrice, setDeliveryPrice] = useState<number>(150);
  const [deliveryFee, setDeliveryFee] = useState<number>(30);
  const [ingredientCost, setIngredientCost] = useState<number>(60);
  const [prepTime, setPrepTime] = useState<number>(30);
  const [cleanTime, setCleanTime] = useState<number>(15);
  const [hourlyRate, setHourlyRate] = useState<number>(100);
  const [utilityCost, setUtilityCost] = useState<number>(10);

  const calculate = () => {
    const deliveryTotal = deliveryPrice + deliveryFee;
    const totalCookingTime = prepTime + cleanTime;
    const timeValue = (totalCookingTime / 60) * hourlyRate;
    
    const cookingBaseTotal = ingredientCost + utilityCost;
    const cookingWithTimeTotal = cookingBaseTotal + timeValue;

    const diffBase = deliveryTotal - cookingBaseTotal;
    const diffWithTime = deliveryTotal - cookingWithTimeTotal;

    return {
      deliveryTotal: deliveryTotal.toFixed(2),
      cookingBaseTotal: cookingBaseTotal.toFixed(2),
      cookingWithTimeTotal: cookingWithTimeTotal.toFixed(2),
      timeValue: timeValue.toFixed(2),
      diffBase: diffBase.toFixed(2),
      diffWithTime: diffWithTime.toFixed(2),
      isCookingSavesBase: diffBase > 0,
      isCookingSavesWithTime: diffWithTime > 0
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
            {lang === "TH" ? "เปรียบเทียบทำอาหารเอง vs เดลิเวอรี่" : "Cooking vs Delivery Comparison"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "เปรียบเทียบต้นทุนวัตถุดิบและมูลค่าเวลา เพื่อตัดสินใจเลือกความคุ้มค่าสูงสุด" : "Compare meal costs including prep time value vs buying food delivery."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <h3 className="font-bold text-gray-700 dark:text-gray-300 border-b pb-1">🏍️ ฝั่งเดลิเวอรี่ (Delivery)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ราคาอาหารต่อมื้อ (บาท)" : "Meal Price (฿)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={deliveryPrice} 
                onChange={(e) => setDeliveryPrice(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าส่งเดลิเวอรี่ (บาท)" : "Delivery Fee (฿)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={deliveryFee} 
                onChange={(e) => setDeliveryFee(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>

          <h3 className="font-bold text-gray-700 dark:text-gray-300 border-b pb-1 mt-4">🍳 ฝั่งทำอาหารเอง (Cooking at Home)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าวัตถุดิบอาหาร (บาท)" : "Ingredients Cost (฿)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={ingredientCost} 
                onChange={(e) => setIngredientCost(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าแก๊ส/น้ำ/ไฟ (บาท)" : "Utilities per Meal (฿)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={utilityCost} 
                onChange={(e) => setUtilityCost(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className={labelClass}>{lang === "TH" ? "เวลาเตรียม (นาที)" : "Prep Time (min)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={prepTime} 
                onChange={(e) => setPrepTime(Math.max(0, parseInt(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "เวลาล้างจาน (นาที)" : "Cleanup (min)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={cleanTime} 
                onChange={(e) => setCleanTime(Math.max(0, parseInt(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "มูลค่าเวลา (บาท/ชม.)" : "Time Value (฿/hr)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={hourlyRate} 
                onChange={(e) => setHourlyRate(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col justify-between border border-indigo-100 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {lang === "TH" ? "🏁 ผลลัพธ์การเปรียบเทียบ" : "🏁 Comparison Result"}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ยอดรวมสั่งเดลิเวอรี่:" : "Delivery Total Cost:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.deliveryTotal}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ทำเอง (คิดเฉพาะวัตถุดิบ):" : "Cooking (Ingredients only):"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.cookingBaseTotal}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "มูลค่าเวลาที่เสียไปชง/ล้าง:" : "Value of prep/clean time:"}</span>
                <span className="font-bold text-gray-500 dark:text-gray-400">฿{results.timeValue}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ทำเอง (รวมมูลค่าเวลาด้วย):" : "Cooking (Including Time):"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.cookingWithTimeTotal}</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white dark:bg-gray-800 border border-indigo-100 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {lang === "TH" ? "💡 สรุปความคุ้มค่าทางการเงิน:" : "💡 Financial Summary:"}
              </p>
              <p className="text-md font-bold mt-1 text-indigo-600 dark:text-indigo-400">
                {results.isCookingSavesBase 
                  ? (lang === "TH" ? `ทำอาหารเองประหยัดเงินได้ ฿${results.diffBase} ต่อมื้อ` : `Cooking saves you ฿${results.diffBase} per meal`)
                  : (lang === "TH" ? `สั่งเดลิเวอรี่ประหยัดกว่า ฿${Math.abs(parseFloat(results.diffBase)).toFixed(2)}` : `Delivery is ฿${Math.abs(parseFloat(results.diffBase)).toFixed(2)} cheaper`)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {lang === "TH" 
                  ? `ถ้ารวมค่าเสียเวลา (มูลค่าเวลาของคุณที่ใช้เตรียมอาหารและล้างจาน) การทำอาหารเองจะ${results.isCookingSavesWithTime ? `ยังประหยัดได้ ฿${results.diffWithTime}` : `แพงกว่าสั่งเดลิเวอรี่ ฿${Math.abs(parseFloat(results.diffWithTime)).toFixed(2)}`}`
                  : `When factoring in time value, cooking is ${results.isCookingSavesWithTime ? `still cheaper by ฿${results.diffWithTime}` : `more expensive by ฿${Math.abs(parseFloat(results.diffWithTime)).toFixed(2)}`}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <CalculationSteps 
        steps={lang === "TH" ? [
          "คำนวณยอดจ่ายจริงเดลิเวอรี่: นำราคาอาหารต่อจานบวกด้วยค่าจัดส่งของแอปพลิเคชันเดลิเวอรี่",
          "คำนวณต้นทุนการทำอาหารพื้นฐาน: นำค่าวัตถุดิบมารวมกับค่าสาธารณูปโภค เช่น ค่าแก๊ส ค่าไฟ ค่าน้ำต่อมื้อ",
          "ประเมินมูลค่าเวลา: แปลงเวลาเตรียมวัตถุดิบและทำความสะอาดหลังทำเป็นชั่วโมง นำมาคูณกับอัตราค่าตอบแทนรายชั่วโมงที่คุณประเมินตนเอง",
          "เปรียบเทียบผลลัพธ์: นำยอดเงินจ่ายจริงและยอดเงินรวมมูลค่าเวลามาเปรียบเทียบเพื่อหาจุดที่ประหยัดและคุ้มค่ากับความสุขของคุณที่สุด"
        ] : [
          "Calculate total delivery cost: Add the meal base price to the app delivery fee.",
          "Calculate base cooking cost: Add raw ingredient costs to utilities per meal (gas, water, electricity).",
          "Estimate time value: Convert total preparation and clean up time to hours, then multiply by your hourly rate.",
          "Compare outcomes: Compare physical cash differences vs total opportunity cost to decide the best path."
        ]} 
      />

      <SEOFAQ>
        <FAQItem 
          question="การคำนวณเปรียบเทียบต้นทุนอาหารด้วยวิธีนี้มีจุดประสงค์อะไร?"
          answer="จุดประสงค์หลักคือการช่วยประเมินพฤติกรรมการบริโภคอาหาร เพื่อพิจารณาว่าระหว่างการทำอาหารกินเองที่บ้าน (Home Cooking) กับการสั่งซื้อผ่านผู้ให้บริการเดลิเวอรี่ (Delivery) แบบไหนมีค่าใช้จ่ายคุ้มค่าเงินและคุ้มค่าเวลามากที่สุด โดยคิดวิเคราะห์อย่างรอบด้านจากทั้งค่าวัตถุดิบจริง ค่าบริการจัดส่ง และมูลค่าทางเศรษฐกิจของเวลาที่เราสูญเสียไปกับการลงมือปรุงอาหารและเก็บกวาดล้างอุปกรณ์"
        />
        <FAQItem 
          question="มูลค่าของเวลา (Time Value) สำคัญอย่างไรในการเปรียบเทียบกับการสั่งอาหาร?"
          answer="มูลค่าเวลาเป็นต้นทุนทางอ้อมหรือค่าเสียโอกาส (Opportunity Cost) ที่สำคัญมาก หลายคนรู้สึกว่าทำอาหารเองประหยัดกว่า แต่ต้องแลกมาด้วยการเตรียมวัตถุดิบ 30 นาที และล้างจานอีก 15 นาที รวมเป็น 45 นาที หากนำเวลานี้ไปทำงานเสริมหรือพักผ่อนเพื่อฟื้นฟูร่างกาย การสั่งอาหารเดลิเวอรี่ที่ใช้เวลาเลือกเพียง 2 นาทีอาจเป็นทางเลือกที่ส่งเสริมประสิทธิภาพชีวิตดีกว่า การคำนวณต้นทุนเวลารายชั่วโมงจะสะท้อนความคุ้มค่าที่แท้จริงตามไลฟ์สไตล์ของแต่ละคน"
        />
        <FAQItem 
          question="มีคำแนะนำอะไรบ้างที่จะช่วยให้การทำอาหารกินเองที่บ้านประหยัดเวลาและคุ้มค่าที่สุด?"
          answer="เพื่อให้การทำอาหารเองมีความคุ้มค่ามากกว่าเดลิเวอรี่ ควรเลือกใช้วิธี: 1) การทำอาหารชุดใหญ่ (Meal Prep) ในคราวเดียวแล้วแบ่งบรรจุกล่องแช่แข็งสำหรับทั้งสัปดาห์ ซึ่งช่วยเฉลี่ยเวลาล้างและเตรียมวัตถุดิบให้ลดลงต่อมื้ออย่างมาก 2) เลือกเมนูที่วัตถุดิบไม่ซับซ้อน เช่น เมนูต้ม เมนูอบ ที่สามารถปล่อยทิ้งไว้ได้โดยไม่ต้องเฝ้าหน้าเตา และ 3) ซื้อวัตถุดิบปริมาณมากจากตลาดค้าส่งเพื่อลดราคาต่อชิ้นลง วิธีเหล่านี้จะลดทั้งต้นทุนวัตถุดิบและต้นทุนเวลาไปพร้อมกัน"
        />
        <FAQItem 
          question="ต้นทุนแฝงอื่นๆ นอกเหนือจากเงินค่าส่งและวัตถุดิบที่มักลืมคำนวณมีอะไรอีกบ้าง?"
          answer="ต้นทุนแฝงของการทำอาหารเองคือ ค่าน้ำล้างจาน ค่าแก๊สหุงต้ม ค่ากระดาษทิชชู่ อุปกรณ์เครื่องปรุงรสพื้นฐาน (น้ำมัน น้ำปลา ซอส) รวมถึงเสื่อมราคาของเครื่องครัว (เตาอบ ตู้เย็น เครื่องปั่น) ขณะที่ต้นทุนแฝงของเดลิเวอรี่คือ ค่าบริการแพลตฟอร์มเพิ่มเติม (Markup Price) ที่ร้านค้าชาร์จเพิ่มจากปกติ 20-30% บนแอป และความเสี่ยงต่อสุขภาพจากอาหารที่ปริมาณผงชูรสหรือน้ำมันสูงกว่าที่เราปรุงด้วยตนเอง"
        />
      </SEOFAQ>
    </div>
  );
}

// 3. CostPerPlate
export function CostPerPlate({ lang }: { lang: any }) {
  const [ingredients, setIngredients] = useState<any[]>([
    { name: "เนื้อไก่ / Chicken", packagePrice: 150, packageWeight: 1000, amountUsed: 150 },
    { name: "ข้าวหอมมะลิ / Rice", packagePrice: 45, packageWeight: 1000, amountUsed: 100 },
    { name: "น้ำมันพืช / Oil", packagePrice: 50, packageWeight: 1000, amountUsed: 15 },
    { name: "เครื่องปรุงรส / Seasoning", packagePrice: 30, packageWeight: 500, amountUsed: 10 }
  ]);
  const [targetFoodCost, setTargetFoodCost] = useState<number>(30);
  const [wastePercent, setWastePercent] = useState<number>(5);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", packagePrice: 0, packageWeight: 1, amountUsed: 0 }]);
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
    let baseCost = 0;
    ingredients.forEach((item) => {
      const pPrice = parseFloat(item.packagePrice) || 0;
      const pWeight = parseFloat(item.packageWeight) || 1;
      const amt = parseFloat(item.amountUsed) || 0;
      baseCost += (pPrice / pWeight) * amt;
    });

    const costWithWaste = baseCost * (1 + wastePercent / 100);
    const suggestedPrice = targetFoodCost > 0 ? (costWithWaste / (targetFoodCost / 100)) : 0;
    const profit = suggestedPrice - costWithWaste;
    const grossMargin = suggestedPrice > 0 ? (profit / suggestedPrice) * 100 : 0;

    return {
      baseCost: baseCost.toFixed(2),
      costWithWaste: costWithWaste.toFixed(2),
      suggestedPrice: suggestedPrice.toFixed(2),
      profit: profit.toFixed(2),
      grossMargin: grossMargin.toFixed(1)
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
            {lang === "TH" ? "เครื่องมือคำนวณต้นทุนอาหารต่อจาน" : "Cost per Plate & Food Cost Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "ประเมินต้นทุนวัตถุดิบดิบ รวมค่าสูญเสีย และตั้งราคาขายหน้าร้านให้มีกำไรชัวร์" : "Calculate dish ingredient costs, factor in waste, and find profitable menu pricing."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-700 dark:text-gray-300">{lang === "TH" ? "รายการวัตถุดิบต่อหนึ่งหน่วยบริโภค" : "Ingredients List per Portion"}</h3>
            <button 
              onClick={addIngredient} 
              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs flex items-center gap-1 transition"
            >
              <Plus className="w-3.5 h-3.5" /> {lang === "TH" ? "เพิ่มวัตถุดิบ" : "Add Ingredient"}
            </button>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {ingredients.map((item, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl relative">
                <input 
                  type="text" 
                  placeholder={lang === "TH" ? "ชื่อวัตถุดิบ" : "Ingredient Name"} 
                  className={`${inputClass} sm:col-span-1`} 
                  value={item.name} 
                  onChange={(e) => updateIngredient(index, "name", e.target.value)} 
                />
                <input 
                  type="number" 
                  placeholder={lang === "TH" ? "ราคายกแพ็ค (฿)" : "Pack Price (฿)"} 
                  className={inputClass} 
                  value={item.packagePrice || ""} 
                  onChange={(e) => updateIngredient(index, "packagePrice", e.target.value)} 
                />
                <input 
                  type="number" 
                  placeholder={lang === "TH" ? "ปริมาณรวมแพ็ค (g/ml)" : "Pack Weight (g/ml)"} 
                  className={inputClass} 
                  value={item.packageWeight || ""} 
                  onChange={(e) => updateIngredient(index, "packageWeight", e.target.value)} 
                />
                <div className="flex gap-1">
                  <input 
                    type="number" 
                    placeholder={lang === "TH" ? "ปริมาณที่ใช้ (g/ml)" : "Amount Used"} 
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

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div>
              <label className={labelClass}>{lang === "TH" ? "สัดส่วนต้นทุนเป้าหมาย (%)" : "Target Food Cost (%)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={targetFoodCost} 
                onChange={(e) => setTargetFoodCost(Math.max(1, parseFloat(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "เปอร์เซ็นต์สูญเสียวัตถุดิบ (%)" : "Waste/Yield Loss (%)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={wastePercent} 
                onChange={(e) => setWastePercent(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col justify-between border border-emerald-100 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {lang === "TH" ? "💰 ผลการประเมินราคาต่อจาน" : "💰 Plate Cost Calculations"}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ต้นทุนวัตถุดิบสุทธิ:" : "Net Raw Cost:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.baseCost}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ต้นทุนรวมสูญเสีย (Waste):" : "Cost with Waste factored:"}</span>
                <span className="font-bold text-gray-800 dark:text-white text-rose-600 dark:text-rose-400">฿{results.costWithWaste}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ราคาแนะนำตั้งหน้าร้าน:" : "Suggested Retail Price:"}</span>
                <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">฿{results.suggestedPrice}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "กำไรขั้นต้นสุทธิ:" : "Gross Profit per Plate:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.profit}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "อัตรากำไรขั้นต้น (Margin):" : "Gross Profit Margin:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">{results.grossMargin}%</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-emerald-700 dark:text-emerald-400 mt-4 bg-emerald-100/50 dark:bg-emerald-900/20 p-3 rounded-lg">
            * {lang === "TH" ? "หมายเหตุ: ต้นทุนนี้ยังไม่รวมค่าแรงช่าง ค่าพลังงาน และค่าเช่าหน้าร้าน ซึ่งควรแยกคิดเป็นสัดส่วนต่างหาก" : "Note: This base calculator only reflects ingredients. Labor, rent, and overhead should be allocated separately."}
          </div>
        </div>
      </div>

      <CalculationSteps 
        steps={lang === "TH" ? [
          "คำนวณต้นทุนต่อหน่วยวัตถุดิบ: นำราคาของแพคเกจ หารด้วยน้ำหนักหรือปริมาณทั้งหมด เพื่อให้ได้ราคาต่อกรัมหรือต่อมิลลิลิตร",
          "คำนวณต้นทุนที่ถูกใช้งานจริง: นำอัตราต้นทุนต่อหน่วยมาคูณกับปริมาณความต้องการใช้ตามสูตรการปรุงอาหารจริง",
          "บวกเพิ่มค่าความเสียหาย (Waste Factor): นำต้นทุนรวมวัตถุดิบมาคูณกับร้อยละการเกิดของเสีย (การตัดแต่ง กระดูก หนัง เศษผัก)",
          "กำหนดราคาขายเป้าหมาย: ใช้หลักการเอาต้นทุนรวมความสูญเสีย หารด้วยร้อยละสัดส่วนต้นทุนเป้าหมายที่ต้องการ (เช่น 30% หรือ 0.3)"
        ] : [
          "Determine unit cost for each ingredient: Divide the package price by its total net weight/volume.",
          "Multiply by recipe amounts: Multiply the unit cost by the weight of ingredient used in the recipe.",
          "Apply waste adjustment: Multiply total ingredient costs by the estimated prep/scrap waste rate (e.g. 5%).",
          "Compute sale price: Divide final food cost with waste by your target food cost percentage (e.g. 30% is 0.3)."
        ]} 
      />

      <SEOFAQ>
        <FAQItem 
          question="อัตราส่วนต้นทุนวัตถุดิบ (Food Cost Percentage) ที่เหมาะสมสำหรับร้านอาหารทั่วไปคือเท่าใด?"
          answer="ในอุตสาหกรรมร้านอาหาร อัตราส่วนต้นทุนอาหารที่แนะนำโดยทั่วไปจะอยู่ระหว่าง 25% ถึง 35% ของราคาขาย ทั้งนี้ขึ้นอยู่กับประเภทของร้านอาหารและรูปแบบบริการ เช่น ร้านอาหารฟาสต์ฟู้ดหรือคาเฟ่เครื่องดื่มมักคุมต้นทุนวัตถุดิบได้ต่ำกว่า 25-30% ขณะที่ร้านอาหารบุฟเฟต์หรืออาหารประเภทซีฟู้ดระดับพรีเมียมอาจมีสัดส่วนต้นทุนขยับสูงถึง 35-40% แต่จะไปประหยัดที่ส่วนของค่าบริการแทน"
        />
        <FAQItem 
          question="เพราะเหตุใดเราจึงต้องนำ เปอร์เซ็นต์สูญเสีย (Yield Loss / Waste %) มาคำนวณด้วย?"
          answer="เมื่อซื้อวัตถุดิบมา เช่น ผักสด หรือเนื้อสัตว์ เรามักไม่สามารถใช้ประโยชน์ได้ 100% เช่น ต้องตัดแต่งส่วนราก ปอกเปลือก หรือแกะกระดูกออก ของเสียเหล่านี้เรียกว่า Yield Loss หากเราซื้อหมูมา 1 กิโลกรัม ราคา 200 บาท แต่ใช้ทำอาหารได้จริงเพียง 800 กรัม เท่ากับว่าต้นทุนที่แท้จริงจะเพิ่มขึ้นเป็น 250 บาทต่อกิโลกรัม การไม่คิดเปอร์เซ็นต์สูญเสียจะส่งผลให้ต้นทุนจริงสูงกว่างบการเงินและทำให้ร้านอาหารขาดทุนได้ง่าย"
        />
        <FAQItem 
          question="นอกจากต้นทุนวัตถุดิบแล้ว การตั้งราคาอาหารต้องคำนึงถึงต้นทุนส่วนใดอีกบ้าง?"
          answer="การตั้งราคาขายหน้าร้านอาหารนอกจากราคาวัตถุดิบดิบแล้ว ยังมีต้นทุนหลัก 3 ส่วน (Prime Cost Structure) ได้แก่: 1) ต้นทุนแรงงาน (Labor Cost) คือเงินเดือนพนักงานและตัวผู้ประกอบการเอง 2) ต้นทุนดำเนินการคงที่และผันแปร (Overhead) เช่น ค่าเช่าพื้นที่ ค่าน้ำ ค่าไฟ ค่าโฆษณาทำการตลาด ค่าบริการระบบ POS และ 3) อัตรากำไรที่ต้องการ (Profit Margin) เพื่อเป็นทุนสำรองขยายกิจการและผลตอบแทนการลงทุน"
        />
        <FAQItem 
          question="วิธีคิดประหยัดต้นทุนค่าอาหารต่อจานโดยไม่กระทบคุณภาพแบรนด์มีวิธีการอย่างไร?"
          answer="เราสามารถควบคุมต้นทุนอาหารได้ผ่านกลยุทธ์ต่างๆ เช่น: 1) ทำสัญญาซื้อขายระยะยาวหรือหาแหล่งวัตถุดิบสำรองเพื่อต่อรองราคาแบบขายส่ง 2) ออกแบบเมนูที่ใช้วัตถุดิร่วมกันได้ดี (Menu Engineering) เพื่อลดปัญหาการเน่าเสียและวัตถุดิบค้างคลัง 3) ชั่งตวงวัดวัตถุดิบทุกครั้งก่อนปรุงเสิร์ฟเพื่อรักษาระดับมาตรฐานของจาน และ 4) จัดตารางทำความสะอาดตู้เย็นระบบ FIFO เพื่อลดของเหลือทิ้งให้เป็นศูนย์"
        />
      </SEOFAQ>
    </div>
  );
}

// 4. CoffeeShopStartupCost
export function CoffeeShopStartupCost({ lang }: { lang: any }) {
  const [rentDeposit, setRentDeposit] = useState<number>(60000);
  const [renovation, setRenovation] = useState<number>(150000);
  const [espressoMachine, setEspressoMachine] = useState<number>(120000);
  const [otherEquipment, setOtherEquipment] = useState<number>(50000);
  const [furniturePos, setFurniturePos] = useState<number>(40000);
  const [initialStock, setInitialStock] = useState<number>(20000);
  const [licensesMarketing, setLicensesMarketing] = useState<number>(15000);
  
  const [monthlyExpense, setMonthlyExpense] = useState<number>(50000);
  const [workingCapitalMonths, setWorkingCapitalMonths] = useState<number>(3);

  const calculate = () => {
    const fixedStartup = rentDeposit + renovation + espressoMachine + otherEquipment + furniturePos + initialStock + licensesMarketing;
    const workingCapital = monthlyExpense * workingCapitalMonths;
    const totalCapital = fixedStartup + workingCapital;

    return {
      fixedStartup: fixedStartup.toLocaleString(),
      workingCapital: workingCapital.toLocaleString(),
      totalCapital: totalCapital.toLocaleString()
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
            {lang === "TH" ? "คำนวณค่าใช้จ่ายเปิดร้านกาแฟ" : "Coffee Shop Startup Cost Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "ประเมินเม็ดเงินลงทุนก้อนแรกในการทำร้านกาแฟ พร้อมคำนวณเงินทุนสำรองหมุนเวียน" : "Estimate total investment and monthly working capital for starting your coffee shop."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <h3 className="font-bold text-gray-700 dark:text-gray-300 border-b pb-1">🏢 งบลงทุนเริ่มต้น (Fixed Assets & Startup Expenses)</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่ามัดจำ/ล่วงหน้าค่าเช่า" : "Rent Deposit"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={rentDeposit} 
                onChange={(e) => setRentDeposit(Math.max(0, parseInt(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่ารีโนเวทและตกแต่ง" : "Renovation & Decor"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={renovation} 
                onChange={(e) => setRenovation(Math.max(0, parseInt(e.target.value) || 0))} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "เครื่องชงและเครื่องบด" : "Espresso Machine / Grinder"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={espressoMachine} 
                onChange={(e) => setEspressoMachine(Math.max(0, parseInt(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "อุปกรณ์ครัวอื่นๆ (ตู้เย็น/ปั่น)" : "Other Kitchen Gear"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={otherEquipment} 
                onChange={(e) => setOtherEquipment(Math.max(0, parseInt(e.target.value) || 0))} 
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <label className={labelClass}>{lang === "TH" ? "เฟอร์นิเจอร์/POS" : "Furniture & POS"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={furniturePos} 
                onChange={(e) => setFurniturePos(Math.max(0, parseInt(e.target.value) || 0))} 
              />
            </div>
            <div className="col-span-1">
              <label className={labelClass}>{lang === "TH" ? "สต็อกแรกเริ่ม" : "Initial Stock"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={initialStock} 
                onChange={(e) => setInitialStock(Math.max(0, parseInt(e.target.value) || 0))} 
              />
            </div>
            <div className="col-span-1">
              <label className={labelClass}>{lang === "TH" ? "ค่าใบอนุญาต/การตลาด" : "Licenses/Promo"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={licensesMarketing} 
                onChange={(e) => setLicensesMarketing(Math.max(0, parseInt(e.target.value) || 0))} 
              />
            </div>
          </div>

          <h3 className="font-bold text-gray-700 dark:text-gray-300 border-b pb-1 mt-4">💰 เงินทุนสำรองหมุนเวียน (Operating Working Capital)</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าใช้จ่ายต่อเดือน (บาท)" : "Monthly Operating Cost (฿)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={monthlyExpense} 
                onChange={(e) => setMonthlyExpense(Math.max(0, parseInt(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "จำนวนเดือนที่สำรอง (เดือน)" : "Reserve Months"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={workingCapitalMonths} 
                onChange={(e) => setWorkingCapitalMonths(Math.max(1, parseInt(e.target.value) || 0))} 
              />
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col justify-between border border-amber-100 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {lang === "TH" ? "📊 สรุปงบประมาณตั้งต้นร้านกาแฟ" : "📊 Budget Allocation Summary"}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "งบลงทุนแรกเริ่มคงที่:" : "Initial Fixed Investment:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.fixedStartup}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "เงินทุนหมุนเวียนที่แนะนำสำรอง:" : "Working Capital Reserve:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.workingCapital}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-gray-700 dark:text-gray-300 font-extrabold">{lang === "TH" ? "ยอดเงินที่ต้องเตรียมรวม:" : "Total Required Capital:"}</span>
                <span className="font-black text-xl text-amber-600 dark:text-amber-400">฿{results.totalCapital}</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white dark:bg-gray-800 border border-amber-100 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300">
              <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">{lang === "TH" ? "⚠️ คำเตือนสำคัญสำหรับการบริหารงบ" : "⚠️ Key Budget Management Tip"}</p>
              {lang === "TH" 
                ? "เกือบ 50% ของร้านกาแฟที่ปิดตัวในปีแรก เกิดจากการขาดเงินทุนหมุนเวียน (Working Capital) สำหรับจ่ายค่าเช่าและเงินเดือนพนักงานในช่วงเริ่มต้นที่ฐานลูกค้ายังไม่นิ่ง ไม่ใช่เพราะเงินไม่พอซื้อเครื่องชงกาแฟ"
                : "Nearly 50% of cafes fail in the first year due to inadequate working capital for rent and staff payroll while building a loyal customer base, not from the cost of the espresso machine itself."}
            </div>
          </div>
        </div>
      </div>

      <CalculationSteps 
        steps={lang === "TH" ? [
          "รวมค่าใช้จ่ายการลงทุนสินทรัพย์ถาวร: หาผลรวมของค่ามัดจำสถานที่ รีโนเวทตกแต่ง เครื่องชงเครื่องบดกาแฟ อุปกรณ์ครัว และเฟอร์นิเจอร์ทั้งหมด",
          "ประเมินค่าใช้จ่ายในการเปิดตัว: บวกสต็อกถั่วกาแฟ นม แก้ว บรรจุภัณฑ์เริ่มต้น ค่าทำการตลาดเปิดร้าน และค่าธรรมเนียมขอใบอนุญาตธุรกิจ",
          "คำนวณเงินทุนหมุนเวียนขั้นต่ำ: คาดการณ์ค่าใช้จ่ายคงที่รายเดือน (ค่าเช่า ค่าจ้างพนักงาน ค่าน้ำค่าไฟ) แล้วคูณด้วยระยะเวลาที่ต้องการสำรองเผื่อขาดทุน (ปกติ 3-6 เดือน)",
          "สรุปความต้องการใช้เงินทุน: นำยอดจัดหาอุปกรณ์ตั้งตัวบวกเข้ากับเงินสำรองหมุนเวียน จะได้จำนวนเงินทุนแท้จริงที่พร้อมเริ่มเปิดร้าน"
        ] : [
          "Sum fixed asset investments: Total the costs of rent deposit, shop interior design, espresso machine, and appliances.",
          "Add startup/launch expenses: Add costs for initial inventory, licenses, business registration, and grand opening promotions.",
          "Calculate minimum working capital: Multiply total projected monthly operating expenses by the target reserve months (typically 3-6 months).",
          "Compute total capital requirements: Add the startup expenses and the cash reserves together for the final budget."
        ]} 
      />

      <SEOFAQ>
        <FAQItem 
          question="เปิดร้านกาแฟขนาดเล็ก (Slow Bar หรือ Moka Pot) ต้องเตรียมเงินทุนเท่าไหร่?"
          answer="สำหรับร้านกาแฟขนาดเล็กมาก เช่น แนว Slow bar, คีออส หรือซุ้มแบบสั่งกลับบ้าน (Takeaway) งบประมาณเริ่มต้นอาจจะอยู่ราวๆ 50,000 ถึง 150,000 บาท เนื่องจากไม่เน้นค่าแต่งร้านหรูหรา และสามารถเลือกใช้เครื่องชงกาแฟดริปหรือ Moka pot ที่ต้นทุนไม่สูงมาก แต่ถ้าต้องการเปิดร้านประเภทมีที่นั่ง มีการตกแต่งที่สวยงาม ใช้เครื่องชงกาแฟเอสเพรสโซ่เกรดพาณิชย์ (Commercial) งบประมาณเฉลี่ยจะเริ่มที่ 300,000 ถึง 700,000 บาทขึ้นไป"
        />
        <FAQItem 
          question="สัดส่วนการจัดสรรเงินทุน (Budget Allocation) ที่เหมาะสมสำหรับร้านกาแฟควรแบ่งอย่างไร?"
          answer="หลักการกระจายเงินทุนที่ดีควรแบ่งเป็นสัดส่วนดังนี้: 1) การก่อสร้าง รีโนเวท และงานตกแต่ง 30-40% 2) เครื่องชงกาแฟ เครื่องบด และอุปกรณ์เคาน์เตอร์บาร์ 25-30% 3) อุปกรณ์ตกแต่งระบบไอทีและเฟอร์นิเจอร์ 10% 4) สต็อกแรกเริ่มและงบการตลาด 5% และ 5) เงินสำรองหมุนเวียนหล่อเลี้ยงร้านอย่างน้อย 3-6 เดือน 20-30% การมีโครงสร้างงบประมาณที่ดีช่วยลดการสะดุดทางการเงินได้มาก"
        />
        <FAQItem 
          question="เพราะเหตุใดเงินทุนสำรองหมุนเวียน (Working Capital) ถึงเป็นสิ่งชี้ชะตาร้านกาแฟ?"
          answer="ช่วง 3-6 เดือนแรกของการเปิดร้านเป็นช่วงสร้างฐานลูกค้าและแบรนด์ ยังไม่สามารถการันตีได้ว่าจะทำกำไรได้ตั้งแต่เดือนแรก เงินทุนสำรองหมุนเวียนนี้มีไว้เพื่อจ่ายค่าใช้จ่ายที่หลีกเลี่ยงไม่ได้ เช่น ค่าเช่าหน้าร้าน ค่าแรงพนักงาน และค่าวัตถุดิบรายเดือน หากไม่มีเงินก้อนนี้สำรองไว้ เมื่อร้านกาแฟเจอเดือนที่ยอดขายตกลงหรือติดขัด จะทำให้เกิดสภาวะขาดสภาพคล่องและต้องปิดกิจการลงในที่สุด"
        />
        <FAQItem 
          question="มีค่าใช้จ่ายแฝงหรือปัญหาใดบ้างที่ผู้ประกอบการมักพบระหว่างดำเนินการเปิดร้าน?"
          answer="ค่าใช้จ่ายแฝงที่มักถูกลืมมีเพียบ เช่น: 1) ค่าปรับปรุงระบบน้ำและระบบไฟ โดยเฉพาะเครื่องชงกาแฟเอสเพรสโซ่ขนาดใหญ่ที่ต้องการกำลังไฟสูงและระบบกรองน้ำละเอียดลดตะกรัน 2) ค่าธรรมเนียมลิขสิทธิ์เปิดเพลงในร้าน 3) ค่าใช้จ่ายขอใบอนุญาตประกอบกิจการอาหารและเครื่องดื่มจากหน่วยงานท้องถิ่น และ 4) ต้นทุนสูญเสียจากการทดลองชงซ้ำๆ ในการปรับตั้งค่าเครื่องบดกาแฟในช่วงสัปดาห์แรก"
        />
      </SEOFAQ>
    </div>
  );
}

// 5. CoffeeMenuPricing
export function CoffeeMenuPricing({ lang }: { lang: any }) {
  const [coffeeDose, setCoffeeDose] = useState<number>(18);
  const [coffeePricePerKg, setCoffeePricePerKg] = useState<number>(550);
  const [milkVolume, setMilkVolume] = useState<number>(120);
  const [milkPricePerLiter, setMilkPricePerLiter] = useState<number>(60);
  const [syrupCost, setSyrupCost] = useState<number>(4);
  const [packagingCost, setPackagingCost] = useState<number>(6);
  const [otherIngredients, setOtherIngredients] = useState<number>(2);
  const [targetBeverageCostPercent, setTargetBeverageCostPercent] = useState<number>(25);

  const calculate = () => {
    const beanCostPerG = coffeePricePerKg / 1000;
    const coffeeCost = coffeeDose * beanCostPerG;
    
    const milkCostPerMl = milkPricePerLiter / 1000;
    const milkCost = milkVolume * milkCostPerMl;

    const totalCostPerCup = coffeeCost + milkCost + syrupCost + packagingCost + otherIngredients;
    const suggestedPrice = targetBeverageCostPercent > 0 ? (totalCostPerCup / (targetBeverageCostPercent / 100)) : 0;
    const profitPerCup = suggestedPrice - totalCostPerCup;

    return {
      coffeeCost: coffeeCost.toFixed(2),
      milkCost: milkCost.toFixed(2),
      totalCost: totalCostPerCup.toFixed(2),
      suggestedPrice: suggestedPrice.toFixed(2),
      profitPerCup: profitPerCup.toFixed(2)
    };
  };

  const results = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl text-amber-600 dark:text-amber-400">
          <DollarSign className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">
            {lang === "TH" ? "คำนวณราคาขายเมนูกาแฟ" : "Coffee Menu Pricing & Cost Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "คำนวณต้นทุนต่อแก้วอย่างละเอียด ชั่งน้ำหนักกาแฟ ปริมาณนม บรรจุภัณฑ์ และตั้งราคาขายตามกำไรเป้าหมาย" : "Break down single cup ingredient costs and determine optimal menu prices."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <h3 className="font-bold text-gray-700 dark:text-gray-300 border-b pb-1">🥤 ข้อมูลสัดส่วนและราคาวัตถุดิบ (Ingredient Input)</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ปริมาณผงกาแฟต่อแก้ว (กรัม)" : "Coffee Dose (g)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={coffeeDose} 
                onChange={(e) => setCoffeeDose(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ราคาเมล็ดกาแฟ (บาท/กก.)" : "Coffee Price (฿/kg)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={coffeePricePerKg} 
                onChange={(e) => setCoffeePricePerKg(Math.max(1, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ปริมาณนมที่ใช้ต่อแก้ว (มล.)" : "Milk Volume (ml)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={milkVolume} 
                onChange={(e) => setMilkVolume(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ราคานมสด (บาท/ลิตร)" : "Milk Price (฿/Liter)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={milkPricePerLiter} 
                onChange={(e) => setMilkPricePerLiter(Math.max(1, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าไซรัป/สารหวาน" : "Syrup Cost (฿)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={syrupCost} 
                onChange={(e) => setSyrupCost(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าแก้ว/ฝา/หลอด" : "Packaging (฿)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={packagingCost} 
                onChange={(e) => setPackagingCost(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ส่วนผสมอื่นๆ/น้ำแข็ง" : "Ice/Other (฿)"}</label>
              <input 
                type="number" 
                className={inputClass} 
                value={otherIngredients} 
                onChange={(e) => setOtherIngredients(Math.max(0, parseFloat(e.target.value) || 0))} 
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "สัดส่วนต้นทุนวัตถุดิบเป้าหมาย (%)" : "Target Beverage Cost (%)"}</label>
            <input 
              type="number" 
              className={inputClass} 
              value={targetBeverageCostPercent} 
              onChange={(e) => setTargetBeverageCostPercent(Math.max(1, parseFloat(e.target.value) || 0))} 
            />
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col justify-between border border-amber-100 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {lang === "TH" ? "🏆 สรุปต้นทุนและราคาขายแนะนำ" : "🏆 Drink Cost & Pricing Summary"}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ต้นทุนเมล็ดกาแฟ:" : "Coffee Bean Cost:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.coffeeCost}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ต้นทุนนมสด:" : "Milk Cost:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.milkCost}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400 font-bold text-rose-600 dark:text-rose-400">{lang === "TH" ? "ต้นทุนวัตถุดิบรวมต่อแก้ว:" : "Total Cost per Cup:"}</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">฿{results.totalCost}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ราคาตั้งขายแนะนำ:" : "Suggested Retail Price:"}</span>
                <span className="font-extrabold text-lg text-emerald-600 dark:text-emerald-400">฿{results.suggestedPrice}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "กำไรขั้นต้นวัตถุดิบต่อแก้ว:" : "Gross Profit per Cup:"}</span>
                <span className="font-bold text-gray-800 dark:text-white">฿{results.profitPerCup}</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-amber-700 dark:text-amber-400 mt-4 bg-amber-100/50 dark:bg-amber-900/20 p-3 rounded-lg">
            * {lang === "TH" ? "สถิติร้านค้า: ต้นทุนแก้ว ฝา และสติกเกอร์บางครั้งอาจมีมูลค่าสูงพอๆ กับกาแฟเอสเพรสโซ่ ควรพิจารณาเลือกผู้ค้าส่งแพคเกจที่มีราคาคุ้มค่า" : "Fun Fact: Packaging (cup, lid, straw, sticker) often costs as much as the espresso shot. Keep packaging costs optimized!"}
          </div>
        </div>
      </div>

      <CalculationSteps 
        steps={lang === "TH" ? [
          "คำนวณต้นทุนเมล็ดกาแฟต่อแก้ว: นำราคาเมล็ดกาแฟต่อกิโลกรัม หารด้วย 1,000 กรัม เพื่อให้ได้ราคาต่อกรัม แล้วคูณด้วยปริมาณกรัมผงกาแฟที่ใช้ชง (เช่น 18 กรัม สำหรับดับเบิ้ลช็อต)",
          "คำนวณต้นทุนนมสด: นำราคานมต่อลิตร หารด้วย 1,000 มล. เพื่อคิดราคาต่อมิลลิลิตร แล้วคูณด้วยปริมาณนมจริงตามสัดส่วนในสูตรแก้วนั้นๆ",
          "รวมต้นทุนส่วนประกอบทั้งหมด: หาผลบวกของเมล็ดกาแฟ นมสด ไซรัป แก้วบรรจุภัณฑ์ ฝาหลอด และต้นทุนเล็กน้อยอย่างน้ำแข็งน้ำต้มสะอาด",
          "กำหนดราคาเพื่อรักษาอัตรากำไร: นำต้นทุนรวมต่อแก้ว หารด้วยสัดส่วนร้อยละของ Beverage Cost ที่เป้าหมายตั้งไว้ (เช่น 25% คือ 0.25)"
        ] : [
          "Compute bean cost per serving: Divide price per kg by 1000 to get cost per gram, then multiply by dose weight (e.g. 18g).",
          "Compute milk cost: Divide price per liter by 1000 to get cost per ml, then multiply by milk volume in the recipe (e.g. 120ml).",
          "Sum all components: Add coffee cost, milk cost, syrup, plastic cup, lid, straw, sleeve, water, and ice.",
          "Apply pricing margin: Divide total unit cost by your target beverage cost percentage (e.g., 25% is 0.25) to find the retail price."
        ]} 
      />

      <SEOFAQ>
        <FAQItem 
          question="ทำไมร้านกาแฟถึงจำเป็นต้องคิดต้นทุนแก้ว ฝา และหลอด แยกออกมาต่างหาก?"
          answer="เพราะสิ่งเหล่านี้คือต้นทุนบรรจุภัณฑ์ (Packaging Cost) ซึ่งเป็นต้นทุนผันแปรโดยตรงตามแก้วที่จำหน่ายออกไป บ่อยครั้งที่ผู้ประกอบการลืมนำค่าแก้วพลาสติกเนื้อหนาพิเศษ (PP/PET) ฝาโดมพิมพ์โลโก้แบรนด์ แผ่นสติกเกอร์กันน้ำ และปลอกสวมแก้วกระดาษ (Sleeve) มารวมคำนวณ ทำให้เกิดการประเมินราคาต่ำเกินจริง และกำไรที่ตั้งใจไว้หายไปราวๆ 5-10 บาทต่อแก้วเลยทีเดียว"
        />
        <FAQItem 
          question="สัดส่วนต้นทุนเครื่องดื่ม (Beverage Cost Percentage) ที่แนะนำควรอยู่ที่ประมาณเท่าใด?"
          answer="สำหรับร้านเครื่องดื่มและกาแฟ สัดส่วนต้นทุนวัตถุดิบและแก้วต่อหน่วย (Food/Beverage Cost) ควรจำกัดให้อยู่ระหว่าง 20% ถึง 30% ของราคาขายเป้าหมาย (เพื่อให้มีกำไรขั้นต้น 70-80%) สาเหตุหลักเนื่องจากเครื่องดื่มมีความยุ่งยากในการบริหารการล้างทำความสะอาดสูง อุปกรณ์มีมูลค่าการบำรุงรักษาสูง (เช่นการเปลี่ยนไส้เครื่องกรองน้ำ การล้างหัวชงเครื่องเอสเพรสโซ่)"
        />
        <FAQItem 
          question="วิธีการตั้งราคาเมนูกาแฟร้อน กาแฟเย็น และกาแฟปั่น ให้เหมาะสมกับแบรนด์ร้านคืออะไร?"
          answer="การตั้งราคาควรใช้เกณฑ์ต้นทุนบวกกับภาพลักษณ์ของคู่แข่งในตลาด (Market Pricing Structure) โดยทั่วไป: 1) กาแฟร้อน: มีต้นทุนน้ำนมและกาแฟปานกลาง เสิร์ฟปริมาณแก้วเล็กกว่า (8 ออนซ์) จึงมักตั้งราคาต่ำสุด 2) กาแฟเย็น: มีปริมาณที่มากกว่า (16 หรือ 22 ออนซ์) มีต้นทุนน้ำแข็งและนมที่สูงขึ้น จึงตั้งราคาบวกเพิ่มจากร้อน 10-15 บาท และ 3) กาแฟปั่น: มีต้นทุนเวลาทำสูงสุด ต้องใช้นมข้นหวานไซรัปเพิ่มเติม และมีค่าบำรุงรักษาเครื่องปั่นพลังสูงเพิ่ม จึงตั้งราคาสูงที่สุด"
        />
        <FAQItem 
          question="หากต้องการปรับปรุงอัตรากำไร (Margin) ของเมนูกาแฟให้เพิ่มขึ้น ควรทำอย่างไร?"
          answer="ทำได้ 4 วิธีหลัก: 1) เพิ่มขนาดออร์เดอร์เพื่อซื้อเมล็ดกาแฟยกกระสอบและนมสดยกพาสเจอร์ไรส์เพื่อให้ได้ส่วนลดปริมาณ 2) ปรับแต่งการตลาดในการขายพ่วงเบเกอรี่/ขนมปังเพื่อกระจายต้นทุนคงที่ 3) ลดการหกรั่วไหลหรือสูญเสียน้ำนมดิบระหว่างสตรีมมิ่งผ่านการเทรนบาริสต้าอย่างเหมาะสม และ 4) ปรับโครงสร้างราคาเมนูกาแฟชนิดพรีเมียม (เช่น Single Origin เมล็ดพิเศษ) เพื่อจับกลุ่มกลุ่มเป้าหมายที่มีกำลังจ่ายเพิ่มขึ้น"
        />
      </SEOFAQ>
    </div>
  );
}

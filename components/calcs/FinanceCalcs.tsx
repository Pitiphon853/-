"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, CalculationSteps, NumericInput } from "./shared";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

// 2. Discount
export function DiscountCalculator({ lang }: { lang: Lang }) {
  const [price, setPrice] = useLocalState("disc_price", "");
  const [discount, setDiscount] = useLocalState("disc_amount", "");
  const [result, setResult] = useState<{saved: number, finalPrice: number} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (p > 0 && d >= 0) {
      const saved = p * (d / 100);
      setResult({ saved, finalPrice: p - saved });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-400">{lang === "TH" ? "เปอร์เซ็นต์ส่วนลด" : "Discount Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-6 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ราคาสินค้า" : "Original Price"}</label>
            <NumericInput value={price} onChange={setPrice} required className={`${inputClass} focus:ring-green-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ส่วนลด (%)" : "Discount (%)"}</label>
            <input type="number" value={discount} onChange={e=>setDiscount(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded-xl hover:bg-green-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 grid grid-cols-2 gap-4">
          <div className="p-6 bg-red-100 dark:bg-red-500/20 rounded-xl text-center border border-red-200 dark:border-red-500/30">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{lang === "TH" ? "ประหยัดไป" : "You Save"}</p>
            <div className="text-3xl font-black text-red-600 dark:text-red-400">-{result.saved.toLocaleString()}</div>
          </div>
          <div className="p-6 bg-green-100 dark:bg-green-500/20 rounded-xl text-center border border-green-200 dark:border-green-500/30">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{lang === "TH" ? "จ่ายจริง" : "Final Price"}</p>
            <div className="text-3xl font-black text-green-600 dark:text-green-400">{result.finalPrice.toLocaleString()}</div>
          </div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — การคำนวณส่วนลด":"Discount Calculation FAQ"}>
          <FAQItem q={lang==="TH"?"เปอร์เซ็นต์ส่วนลดคืออะไร?":"What is a discount percentage?"} a={lang==="TH"?"เปอร์เซ็นต์ส่วนลด คือ สัดส่วนของราคาที่ถูกหักออกไปจากราคาเต็ม โดยคิดเทียบจาก 100 ส่วน เช่น สินค้าลดราคา 20% หมายความว่า หากสินค้ามีราคาเต็ม 100 บาท คุณจะได้ลดราคา 20 บาท และจ่ายจริงเพียง 80 บาท":"A discount percentage is the portion of the original price deducted, based on 100 parts. For example, a 20% discount means if an item costs $100, you save $20 and pay only $80."} />
          <FAQItem q={lang==="TH"?"สูตรคำนวณส่วนลดทำอย่างไร?":"How to calculate a discount?"} a={lang==="TH"?"สูตรการคำนวณเงินที่ประหยัดได้คือ: (ราคาเต็ม × เปอร์เซ็นต์ส่วนลด) ÷ 100 ส่วนราคาสุทธิที่ต้องจ่ายคือ: ราคาเต็ม - เงินที่ประหยัดได้ หรือคิดแบบเร็วคือ ราคาเต็ม × ((100 - เปอร์เซ็นต์ส่วนลด) ÷ 100)":"The formula to find the amount saved is: (Original Price × Discount %) ÷ 100. The final price is: Original Price - Amount Saved. A faster way is: Original Price × ((100 - Discount %) ÷ 100)."} />
          <FAQItem q={lang==="TH"?"ส่วนลด 50% + 20% (On Top) คือลด 70% ใช่ไหม?":"Is a 50% + 20% discount equal to 70%?"} a={lang==="TH"?"ไม่ใช่ครับ! การลดแบบ On Top จะคิดทีละขั้น ตัวอย่าง: สินค้าราคา 1,000 บาท ลด 50% เหลือ 500 บาท จากนั้นนำ 500 บาทมาลดอีก 20% (ลดไป 100 บาท) จะเหลือ 400 บาท เท่ากับว่าลดจริงไป 60% ไม่ใช่ 70%":"No! 'On Top' discounts are applied sequentially. Example: $1000 item at 50% off is $500. Then taking 20% off the $500 saves another $100, making the final price $400. That's a total 60% discount, not 70%."} />
          <FAQItem q={lang==="TH"?"จะรู้ได้อย่างไรว่าส่วนลดไหนคุ้มกว่ากัน?":"How to compare different discount offers?"} a={lang==="TH"?"โปรโมชั่น 'ซื้อ 1 แถม 1' เทียบเท่ากับการลด 50% ต่อชิ้น ส่วนโปร 'ซื้อ 2 แถม 1' เทียบเท่ากับการลด 33.33% หากเจอโปร 'ชิ้นที่สองลด 50%' จะเทียบเท่ากับการลด 25% เมื่อซื้อสองชิ้น ควรคำนวณเป็นเปอร์เซ็นต์รวมเพื่อเปรียบเทียบ":"'Buy 1 Get 1 Free' equals a 50% discount per item. 'Buy 2 Get 1 Free' equals 33.33%. 'Buy 1, get the 2nd at 50% off' equals a 25% discount overall. Convert offers to overall percentages to compare effectively."} />
          <FAQItem q={lang==="TH"?"โปรโมชั่น Cash Back กับ Discount ต่างกันอย่างไร?":"Cash Back vs. Discount?"} a={lang==="TH"?"Discount (ส่วนลด) คือการลดราคาทันทีหน้าบิล ส่วน Cash Back (เครดิตเงินคืน) คือคุณต้องจ่ายราคาเต็มไปก่อน แล้วระบบ (เช่น บัตรเครดิต) จะคืนเงินให้ในภายหลัง ซึ่งหากมีเงินสดจำกัด การรับ Discount ทันทีจะดีกว่า":"A Discount reduces the price immediately at checkout. Cash Back means you pay full price first, and the system (e.g., credit card) refunds the money later. If cash is tight, immediate discounts are better."} />
          <FAQItem q={lang==="TH"?"การขึ้นราคาก่อนแล้วค่อยลด (Price Anchoring) คืออะไร?":"What is Price Anchoring?"} a={lang==="TH"?"เป็นเทคนิคการตลาด (Psychological Pricing) ที่ร้านค้าอาจตั้งราคาป้ายให้สูงเกินจริง (เช่น ตั้ง 2,000 บาท แล้วแปะป้ายลด 50% เหลือ 1,000 บาท) เพื่อให้ผู้บริโภครู้สึกว่าได้สินค้าราคาถูกมาก ทั้งที่ราคาจริงอาจจะแค่ 1,000 บาทอยู่แล้ว":"It's a psychological marketing technique where stores artificially inflate the original price (e.g., setting it at $200, then offering 50% off to sell at $100) to make consumers feel they are getting a massive bargain."} />
          <FAQItem q={lang==="TH"?"ควรคำนวณ VAT (ภาษีมูลค่าเพิ่ม) ก่อนหรือหลังหักส่วนลด?":"Calculate VAT before or after discount?"} a={lang==="TH"?"ตามหลักสรรพากร การคำนวณภาษีมูลค่าเพิ่ม (VAT 7% ในไทย) จะต้องคำนวณ 'หลังจาก' หักส่วนลดการค้าเรียบร้อยแล้ว ตัวอย่าง: สินค้า 100 บาท ลด 10 บาท เหลือ 90 บาท จะต้องคิด VAT 7% จากฐาน 90 บาท":"By standard accounting rules, Value Added Tax (VAT) must be calculated 'AFTER' trade discounts are applied. E.g., a $100 item with a $10 discount is $90. VAT is calculated based on the $90 final price."} />
          <FAQItem q={lang==="TH"?"โค้ดส่วนลด Shopee / Lazada กดเครื่องคิดเลขอย่างไร?":"How to calculate e-commerce discounts?"} a={lang==="TH"?"ในแอปมักมี 'ส่วนลดร้านค้า' + 'ส่วนลดแพลตฟอร์ม' + 'ส่วนลดค่าส่ง' ให้คุณนำราคาสินค้า หักส่วนลดร้านค้าก่อน จากนั้นค่อยหักส่วนลดแพลตฟอร์ม (ซึ่งอาจมีเพดานสูงสุด เช่น ลด 15% สูงสุด 300 บาท) แล้วบวกค่าส่งสุทธิ":"Apps usually have 'Store Discount' + 'Platform Discount' + 'Shipping Discount'. Deduct the store discount first, then the platform discount (watch out for maximum caps, e.g., 15% off max $10), and finally add net shipping."} />
          <FAQItem q={lang==="TH"?"ทำไมบางทีใช้ส่วนลด 100 บาท คุ้มกว่าส่วนลด 20%?":"When is a flat discount better than a percentage?"} a={lang==="TH"?"ขึ้นอยู่กับราคาสินค้า! หากสินค้ามีราคา 300 บาท ใช้ส่วนลด 20% จะประหยัดไป 60 บาท ซึ่งสู้คูปองลด 100 บาทไม่ได้ แต่ถ้าสินค้านราคา 1,000 บาท ส่วนลด 20% จะประหยัดถึง 200 บาท ซึ่งคุ้มกว่าคูปอง 100 บาท":"It depends on the original price! For a $30 item, a 20% discount saves $6, so a flat $10 coupon is better. But for a $100 item, 20% saves $20, making it much better than a flat $10 coupon."} />
          <FAQItem q={lang==="TH"?"ใช้เครื่องคำนวณนี้กับสกุลเงินอื่นได้ไหม?":"Can I use this calculator for other currencies?"} a={lang==="TH"?"ได้แน่นอนครับ! ตัวเลขที่คำนวณเป็นเพียงสัดส่วนทางคณิตศาสตร์ คุณสามารถใส่ราคาเป็นหน่วย บาท, ดอลลาร์, เยน หรือสกุลเงินใดก็ได้ ผลลัพธ์ส่วนลดที่ได้ก็จะออกเป็นสกุลเงินนั้นๆ ตามความตั้งใจของคุณ":"Absolutely! The calculation is purely mathematical proportion. You can enter the original price in Baht, Dollars, Yen, or any currency. The resulting savings and final price will naturally be in that same currency."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 3. Car Loan
export function CarLoanCalculator({ lang }: { lang: Lang }) {
  const [price, setPrice] = useLocalState("car_price", "");
  const [down, setDown] = useLocalState("car_down", "");
  const [interest, setInterest] = useLocalState("car_int", "");
  const [years, setYears] = useLocalState("car_years", "5");
  const [result, setResult] = useState<{monthly: number, totalInt: number} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(price);
    const d = parseFloat(down || "0");
    const i = parseFloat(interest);
    const y = parseInt(years);
    if (p > 0) {
      const finance = p - d;
      const totalInt = finance * (i / 100) * y;
      const monthly = (finance + totalInt) / (y * 12);
      setResult({ monthly: Math.ceil(monthly), totalInt: Math.ceil(totalInt) });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-500">{lang === "TH" ? "ผ่อนรถยนต์" : "Car Loan Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ราคารถ" : "Car Price"}</label>
          <NumericInput value={price} onChange={setPrice} required className={`${inputClass} focus:ring-green-500`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "เงินดาวน์" : "Down Payment"}</label>
            <NumericInput value={down} onChange={setDown} className={`${inputClass} focus:ring-green-500`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ดอกเบี้ยต่อปี (%)" : "Interest Rate (%)"}</label>
            <input type="number" step="0.1" value={interest} onChange={e=>setInterest(e.target.value)} required className={`${inputClass} focus:ring-green-500`} />
          </div>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ระยะเวลาผ่อน (ปี)" : "Years"}</label>
          <select value={years} onChange={e=>setYears(e.target.value)} className={`${inputClass} focus:ring-green-500`}>
            {[3,4,5,6,7,8].map(y => <option key={y} value={y}>{y} {lang === "TH" ? "ปี" : "Years"}</option>)}
          </select>
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded-xl hover:bg-green-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-green-50 dark:bg-green-900/10 rounded-xl text-center border border-green-200 dark:border-green-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-1">{lang === "TH" ? "ยอดผ่อนชำระต่อเดือน" : "Monthly Payment"}</p>
          <div className="text-5xl font-black text-green-600 dark:text-green-400 mb-2">{result.monthly.toLocaleString()}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang === "TH" ? "FAQ — สินเชื่อและไฟแนนซ์รถยนต์" : "Car Loan FAQ"}>
          <FAQItem q={lang==="TH"?"ไฟแนนซ์รถยนต์คิดดอกเบี้ยแบบไหน?":"How is car loan interest calculated?"} a={lang==="TH"?"ไฟแนนซ์รถยนต์ในประเทศไทยมักคิดดอกเบี้ยแบบ 'เงินต้นคงที่' (Flat Rate) หมายความว่าดอกเบี้ยจะถูกคำนวณจากเงินต้นเริ่มต้นทั้งหมดและคูณด้วยจำนวนปีที่ผ่อน แตกต่างจากสินเชื่อบ้านที่คิดแบบ 'ลดต้นลดดอก' (Effective Rate)":"Car loans in Thailand typically use a 'Flat Rate' interest method. The interest is calculated on the total original principal multiplied by the loan term in years. This differs from mortgages, which use an 'Effective Rate' (declining balance)."} />
          <FAQItem q={lang==="TH"?"สูตรคำนวณดอกเบี้ยแบบ Flat Rate คืออะไร?":"What is the Flat Rate formula?"} a={lang==="TH"?"สูตรคือ: ดอกเบี้ยทั้งหมด = ยอดจัดไฟแนนซ์ × อัตราดอกเบี้ยต่อปี (%) × จำนวนปีที่ผ่อน จากนั้นนำ ยอดจัดไฟแนนซ์ + ดอกเบี้ยทั้งหมด แล้วหารด้วยจำนวนงวด (เดือน) เพื่อหาค่างวดต่อเดือน":"Formula: Total Interest = Loan Amount × Annual Interest Rate (%) × Loan Term (Years). To find the monthly payment, calculate (Loan Amount + Total Interest) ÷ Total Number of Months."} />
          <FAQItem q={lang==="TH"?"ค่างวดรถที่แสดง รวม VAT หรือยัง?":"Does the monthly payment include VAT?"} a={lang==="TH"?"สำหรับ 'รถยนต์ใหม่ป้ายแดง' ดอกเบี้ยที่แจ้งมักจะยังไม่รวม VAT 7% ในบางกรณี (ตามนโยบายไฟแนนซ์) แต่สำหรับ 'รถยนต์มือสอง' ค่างวดแต่ละเดือนจะต้องบวก VAT 7% เพิ่มเข้าไปด้วยเสมอ ทำให้ค่างวดจริงสูงกว่าที่คำนวณได้ตอนแรก":"For 'new cars', the quoted rates usually don't have separate VAT on payments (it's in the car price). However, for 'used cars', a 7% VAT is ALWAYS added to the monthly installment, making the actual payment higher than the base calculation."} />
          <FAQItem q={lang==="TH"?"ควรวางเงินดาวน์ (Down Payment) เท่าไหร่ดี?":"How much down payment should I make?"} a={lang==="TH"?"โดยทั่วไปแนะนำให้วางเงินดาวน์อย่างน้อย 20-25% ของราคารถ เพื่อหลีกเลี่ยงการต้องจ่ายค่าเบี้ยประกันสินเชื่อ (ผู้ค้ำประกัน) และยิ่งดาวน์เยอะ ยอดจัดจะน้อยลง ทำให้เสียดอกเบี้ยรวมน้อยลงตามไปด้วย":"It is generally recommended to put down at least 20-25% of the car's price. This often eliminates the need for a guarantor. A larger down payment reduces the loan principal, thereby significantly reducing total interest paid."} />
          <FAQItem q={lang==="TH"?"ยอดจัดไฟแนนซ์ (Loan Amount) คืออะไร?":"What is the Loan Amount?"} a={lang==="TH"?"ยอดจัดไฟแนนซ์ คือ ราคารถสุทธิหลังจากหักเงินดาวน์ออกแล้ว ซึ่งก็คือจำนวนเงินที่คุณไปขอกู้ยืมจากธนาคารหรือบริษัทไฟแนนซ์นั่นเอง (ยิ่งยอดจัดสูง ยิ่งเสียดอกเบี้ยเยอะ)":"The Loan Amount is the net price of the car after subtracting your down payment. This is the actual amount you are borrowing from the bank or financial institution (higher loan amount = more interest)."} />
          <FAQItem q={lang==="TH"?"โปะหนี้รถยนต์ (ปิดบัญชีก่อนกำหนด) คุ้มไหม?":"Is it worth paying off a car loan early?"} a={lang==="TH"?"กฎหมายใหม่ (สคบ.) ระบุว่าหากผู้เช่าซื้อต้องการปิดบัญชีก่อนกำหนด ไฟแนนซ์จะต้องให้ส่วนลดดอกเบี้ยที่ยังไม่ถึงกำหนดชำระ อย่างน้อย 60-100% ขึ้นอยู่กับงวดที่ผ่อนไปแล้ว (เช่น ผ่อนเกิน 2/3 ของงวดทั้งหมด จะได้ลดดอกเบี้ย 100%)":"New consumer protection laws state that if you pay off a car loan early, the financier must discount the unearned interest by 60-100%, depending on how much of the term has passed (e.g., passing 2/3 of the term yields a 100% discount on remaining interest)."} />
          <FAQItem q={lang==="TH"?"ทำไมดอกเบี้ยรถมือสองถึงแพงกว่ารถใหม่?":"Why are used car interest rates higher?"} a={lang==="TH"?"ไฟแนนซ์มองว่ารถมือสองมีความเสี่ยงสูงกว่ารถใหม่ ทั้งในแง่ของการเสื่อมสภาพ มูลค่าซากที่ลดลงรวดเร็ว และโอกาสเป็นหนี้สูญที่มากกว่า อัตราดอกเบี้ยรถมือสองจึงมักสูงกว่ารถใหม่ 1-3% ต่อปี":"Financiers view used cars as higher risk due to depreciation, unknown mechanical histories, and higher default rates. Thus, used car interest rates are typically 1-3% higher annually compared to new cars."} />
          <FAQItem q={lang==="TH"?"ระยะเวลาผ่อน (Loan Term) ที่เหมาะสมคือเท่าไหร่?":"What is the ideal loan term?"} a={lang==="TH"?"ระยะเวลาที่เหมาะสมคือ 48 - 60 เดือน (4-5 ปี) การผ่อนนานถึง 72 หรือ 84 เดือน (6-7 ปี) จะทำให้คุณเสียดอกเบี้ยบานตะไท และมักจะเจอปัญหา 'มูลค่ารถต่ำกว่าหนี้คงเหลือ' (Underwater Loan) หากต้องการขายรถกลางคัน":"The ideal term is 48-60 months (4-5 years). Stretching it to 72 or 84 months drastically increases total interest and risks an 'Underwater Loan' (owing more than the car is worth) if you need to sell it prematurely."} />
          <FAQItem q={lang==="TH"?"รีไฟแนนซ์รถยนต์ (Auto Refinancing) คืออะไร?":"What is Auto Refinancing?"} a={lang==="TH"?"คือการนำรถที่กำลังผ่อนอยู่ หรือผ่อนหมดแล้ว ไปขอสินเชื่อก้อนใหม่กับสถาบันการเงินเดิมหรือใหม่ เพื่อนำเงินก้อนมาใช้จ่าย หรือเพื่อยืดระยะเวลาผ่อนให้ค่างวดต่อเดือนถูกลง (แต่แลกมากับการเสียดอกเบี้ยเพิ่มในระยะยาว)":"It means taking out a new loan on a car you are currently paying off (or own outright) with a bank. It’s used to get cash out or lower monthly payments by extending the term (though it increases long-term interest)."} />
          <FAQItem q={lang==="TH"?"นอกจากค่างวด มีค่าใช้จ่ายแอบแฝงอะไรอีกบ้าง?":"Are there hidden costs besides the monthly payment?"} a={lang==="TH"?"ก่อนซื้อรถ ควรเผื่อเงินสำหรับ: 1) ประกันภัยชั้น 1 (ปีละ 15k-25k) 2) ภาษีและพ.ร.บ. (ปีละ 1.5k-3k) 3) ค่าบำรุงรักษาและเช็คระยะ (ปีละ 5k-10k) 4) ค่าน้ำมัน/ไฟฟ้า ซึ่งรวมแล้วอาจสูงถึง 30-50% ของค่างวดรถ":"Before buying, budget for: 1) Comprehensive Insurance (15-25K/yr), 2) Road Tax & Compulsory Insurance (1.5-3K/yr), 3) Maintenance (5-10K/yr), and 4) Fuel/Electricity. These can add up to 30-50% on top of your monthly payment."} />
      </SEOFAQ>
    </div>
  );
}

// 4. Mortgage
export function MortgageCalculator({ lang }: { lang: Lang }) {
  const [loan, setLoan] = useLocalState("mort_loan", "");
  const [interest, setInterest] = useLocalState("mort_int", "");
  const [years, setYears] = useLocalState("mort_y", "30");
  const [result, setResult] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const P = parseFloat(loan);
    const r = parseFloat(interest) / 100 / 12;
    const n = parseFloat(years) * 12;
    if (P > 0 && r > 0 && n > 0) {
      const m = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setResult(Math.ceil(m));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-400">{lang === "TH" ? "คำนวณเงินกู้/บ้าน" : "Mortgage Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ยอดเงินกู้" : "Loan Amount"}</label>
          <NumericInput value={loan} onChange={setLoan} required className={`${inputClass} focus:ring-green-400`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ดอกเบี้ยต่อปี (%)" : "Interest Rate (%)"}</label>
            <input type="number" step="0.1" value={interest} onChange={e=>setInterest(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ระยะเวลา (ปี)" : "Years"}</label>
            <input type="number" value={years} onChange={e=>setYears(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded-xl hover:bg-green-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-green-50 dark:bg-green-900/30 rounded-xl text-center border border-green-200 dark:border-green-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "ยอดผ่อนชำระต่อเดือน" : "Monthly Payment"}</p>
          <div className="text-5xl font-black text-green-600 dark:text-green-400">{result.toLocaleString()}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang === "TH" ? "สินเชื่อบ้าน (FAQ)" : "Mortgage FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ดอกเบี้ยบ้านคิดแบบไหน?" : "How is mortgage interest calculated?"}
          a={lang === "TH" ? "สินเชื่อบ้านในไทยส่วนใหญ่คิดดอกเบี้ยแบบ ลดต้นลดดอก (Effective Rate) หมายความว่ายิ่งคุณโปะเงินต้นมาก ดอกเบี้ยในงวดถัดไปก็จะลดลงตาม" : "Effective Rate (Reducing Balance)."}
        />
      </SEOFAQ>
    </div>
  );
}

// 5. Compound Interest
export function CompoundInterest({ lang }: { lang: Lang }) {
  const [principal, setPrincipal] = useLocalState("ci_principal", "10000");
  const [monthlyAddition, setMonthlyAddition] = useLocalState("ci_monthly", "1000");
  const [years, setYears] = useLocalState("ci_years", "10");
  const [rate, setRate] = useLocalState("ci_rate", "5");
  const [frequency, setFrequency] = useLocalState("ci_freq", "12"); // 12 for monthly
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalInvested, setTotalInvested] = useState<number>(0);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(principal) || 0;
    const pmt = parseFloat(monthlyAddition) || 0;
    const y = parseInt(years) || 10;
    const r = (parseFloat(rate) || 0) / 100;
    const n = parseInt(frequency) || 12;

    let currentBalance = p;
    let totalContribution = p;
    const yearlyData = [];

    for (let year = 1; year <= y; year++) {
      for (let period = 1; period <= n; period++) {
        currentBalance *= (1 + r / n);
        if (n === 12) {
          currentBalance += pmt;
          totalContribution += pmt;
        } else if (n === 1 && period === 1) {
          currentBalance += (pmt * 12);
          totalContribution += (pmt * 12);
        }
      }
      yearlyData.push({
        year: year,
        balance: Math.round(currentBalance),
        invested: totalContribution
      });
    }

    setData(yearlyData);
    setTotal(Math.round(currentBalance));
    setTotalInvested(totalContribution);
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-500">{lang === "TH" ? "ดอกเบี้ยทบต้น" : "Compound Interest"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "เงินต้น" : "Initial Principal"}</label>
            <NumericInput value={principal} onChange={setPrincipal} required className={`${inputClass} focus:ring-green-500`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "เงินสมทบต่อเดือน" : "Monthly Contribution"}</label>
            <NumericInput value={monthlyAddition} onChange={setMonthlyAddition} className={`${inputClass} focus:ring-green-500`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ระยะเวลา (ปี)" : "Years to Grow"}</label>
            <input type="number" value={years} onChange={e=>setYears(e.target.value)} required className={`${inputClass} focus:ring-green-500`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ผลตอบแทนคาดหวังต่อปี (%)" : "Interest Rate (%)"}</label>
            <input type="number" step="0.1" value={rate} onChange={e=>setRate(e.target.value)} required className={`${inputClass} focus:ring-green-500`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded-xl hover:bg-green-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณการเติบโต" : "Calculate Growth"}</button>
      </form>

      {total > 0 && data.length > 0 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-500/30 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-bold mb-1">{lang === "TH" ? "เงินรวมทั้งหมด" : "Total Balance"}</p>
              <div className="text-3xl font-black text-green-600 dark:text-green-400">{total.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-bold mb-1">{lang === "TH" ? "กำไรจากดอกเบี้ย" : "Total Interest"}</p>
              <div className="text-2xl font-black text-gray-900 dark:text-white">{(total - totalInvested).toLocaleString()}</div>
            </div>
          </div>

          <div className="h-64 w-full bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="year" fontSize={12} tickMargin={10} />
                <YAxis width={60} tickFormatter={(value) => value > 1000000 ? (value/1000000).toFixed(1)+'M' : value > 1000 ? (value/1000).toFixed(0)+'k' : value} fontSize={12} />
                <RechartsTooltip formatter={(value) => typeof value === "number" ? value.toLocaleString() : String(value)} />
                <Line type="monotone" dataKey="balance" name={lang==="TH"?"ยอดรวม":"Balance"} stroke="#22c55e" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="invested" name={lang==="TH"?"เงินต้น":"Principal"} stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "ดอกเบี้ยทบต้น (FAQ)" : "Compound Interest FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ดอกเบี้ยทบต้นคืออะไร?" : "What is compound interest?"}
          a={lang === "TH" ? "ดอกเบี้ยทบต้น (Compound Interest) คือ การที่เราได้ดอกเบี้ยจากเงินต้น และในปีถัดไป ดอกเบี้ยนั้นจะถูกนำไปรวมกับเงินต้นเพื่อนำมาคำนวณเป็นดอกเบี้ยของปีต่อไป ทำให้เงินเติบโตแบบก้าวกระโดด (Exponential) หรือที่อัลเบิร์ต ไอน์สไตน์ เรียกว่าเป็น สิ่งมหัศจรรย์อันดับ 8 ของโลก" : "Interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods."}
        />
        <FAQItem 
          q={lang === "TH" ? "วิธีคิดดอกเบี้ยทบต้นด้วยตัวเอง ทำอย่างไร?" : "How to calculate manually?"}
          a={lang === "TH" ? "สูตรคือ A = P(1 + r/n)^(nt) โดยที่ A = เงินรวม, P = เงินต้น, r = ดอกเบี้ยต่อปี, n = จำนวนครั้งที่ทบต้นใน 1 ปี, t = จำนวนปี" : "Formula: A = P(1 + r/n)^(nt)"}
        />
      </SEOFAQ>
    </div>
  );
}

// 6. Bill Splitter
export function BillSplitter({ lang }: { lang: Lang }) {
  const [subtotal, setSubtotal] = useLocalState("bill_subtotal", "");
  const [serviceCharge, setServiceCharge] = useLocalState("bill_service", "10");
  const [hasVat, setHasVat] = useLocalState("bill_has_vat", true);
  const [people, setPeople] = useLocalState("bill_people", "2");
  
  // Custom items for specific people
  const [specials, setSpecials] = useState<{name: string, price: string}[]>([]);
  const [result, setResult] = useState<any>(null);

  const addSpecial = () => setSpecials([...specials, {name: `เพื่อน ${specials.length + 1}`, price: ""}]);
  const updateSpecial = (index: number, field: "name"|"price", val: string) => {
    const newSpecials = [...specials];
    newSpecials[index][field] = val;
    setSpecials(newSpecials);
  };
  const removeSpecial = (index: number) => {
    setSpecials(specials.filter((_, i) => i !== index));
  };

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const st = parseFloat(subtotal) || 0;
    const sc = parseFloat(serviceCharge) || 0;
    const pc = parseInt(people) || 1;

    // Calculate total multiplier (Service Charge + VAT)
    let totalMultiplier = 1;
    let serviceAmt = st * (sc / 100);
    let vatAmt = 0;
    if (hasVat) {
      vatAmt = (st + serviceAmt) * 0.07;
    }
    const finalTotal = st + serviceAmt + vatAmt;

    // Ratio to apply to special items (to add their fair share of SC and VAT)
    const ratio = finalTotal / st;

    let specialTotalAdjusted = 0;
    const processedSpecials = specials.map(s => {
      const p = parseFloat(s.price) || 0;
      const adjusted = p * ratio;
      specialTotalAdjusted += adjusted;
      return { name: s.name || "Special", pay: adjusted };
    });

    const remainingTotal = finalTotal - specialTotalAdjusted;
    const remainingPeople = pc - specials.length;
    let normalPay = 0;
    if (remainingPeople > 0 && remainingTotal > 0) {
      normalPay = remainingTotal / remainingPeople;
    }

    setResult({
      finalTotal,
      normalPay,
      remainingPeople,
      processedSpecials
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-500">{lang === "TH" ? "หารค่าอาหาร" : "Bill Splitter"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ราคาอาหารรวม (Subtotal)" : "Subtotal"}</label>
          <NumericInput value={subtotal} onChange={setSubtotal} required className={`${inputClass} focus:ring-green-500`} placeholder={lang==="TH"?"ก่อนบวก SC/VAT":"Before SC/VAT"} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "Service Charge (%)" : "Service Charge (%)"}</label>
            <select value={serviceCharge} onChange={e=>setServiceCharge(e.target.value)} className={inputClass}>
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
            </select>
          </div>
          <div className="flex items-end pb-3">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700 dark:text-gray-300">
              <input type="checkbox" checked={hasVat} onChange={e=>setHasVat(e.target.checked)} className="w-5 h-5 text-green-500 rounded border-gray-300 focus:ring-green-500" />
              {lang === "TH" ? "+ VAT 7%" : "+ VAT 7%"}
            </label>
          </div>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "จำนวนคนทั้งหมด" : "Total People"}</label>
          <input type="number" min="1" value={people} onChange={e=>setPeople(e.target.value)} required className={`${inputClass} focus:ring-green-500`} />
        </div>

        {/* Special Menu Items */}
        <div className="pt-4 border-t border-gray-200 dark:border-white/10">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
              {lang === "TH" ? "มีคนสั่งแยก / จ่ายไม่เท่าเพื่อน?" : "Someone paying separately?"}
            </label>
            <button type="button" onClick={addSpecial} className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">+ {lang==="TH"?"เพิ่ม":"Add"}</button>
          </div>
          
          <div className="space-y-3">
            {specials.map((s, idx) => (
              <div key={idx} className="flex gap-2">
                <input type="text" value={s.name} onChange={e=>updateSpecial(idx, "name", e.target.value)} placeholder={lang==="TH"?"ชื่อ":"Name"} className={`${inputClass} flex-1 py-2 text-sm`} />
                <NumericInput value={s.price} onChange={(val)=>updateSpecial(idx, "price", val)} placeholder={lang==="TH"?"ราคาเมนู":"Price"} className={`${inputClass} w-24 py-2 text-sm`} />
                <button type="button" onClick={()=>removeSpecial(idx)} className="text-red-500 p-2 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 rounded">X</button>
              </div>
            ))}
          </div>
          {specials.length > 0 && <p className="text-xs text-gray-500 mt-2">*ระบบจะนำราคาแยกนี้ไปรวมคำนวณ SC และ VAT ให้อัตโนมัติ (และจะลบจำนวนคนเหล่านี้ออกจากกองกลาง)</p>}
        </div>

        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded-xl hover:bg-green-600 transition-colors shadow-md mt-4">{lang === "TH" ? "คำนวณยอดหาร" : "Split the Bill"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border-2 border-green-200 dark:border-green-500/30 text-center shadow-neo">
            <p className="text-gray-600 dark:text-gray-400 font-bold mb-2">{lang === "TH" ? "ยอดรวมสุทธิ (Net Total)" : "Net Total"}</p>
            <div className="text-4xl font-black text-gray-900 dark:text-white mb-6">฿ {result.finalTotal.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</div>
            
            <div className="space-y-3 mt-4 text-left">
              {result.remainingPeople > 0 && (
                <div className="flex justify-between items-center p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                  <span className="font-bold text-gray-700 dark:text-gray-300">{lang==="TH"?"คนทั่วไปจ่าย (กองกลาง)":"Standard split"} <span className="text-xs text-gray-400">x{result.remainingPeople}</span></span>
                  <span className="text-xl font-black text-green-600 dark:text-green-400">฿ {Math.ceil(result.normalPay).toLocaleString()}</span>
                </div>
              )}
              
              {result.processedSpecials.map((s: any, i: number) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                  <span className="font-bold text-gray-700 dark:text-gray-300">{s.name} <span className="text-xs font-normal text-purple-500 ml-2">*(รวม SC/VAT)*</span></span>
                  <span className="text-xl font-black text-purple-600 dark:text-purple-400">฿ {Math.ceil(s.pay).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">*ปัดเศษขึ้นเพื่อป้องกันยอดเงินขาด</p>
          </div>
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "หารค่าอาหาร (FAQ)" : "Bill Splitter FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "Service Charge คิดจากยอดไหน?" : "How is Service Charge calculated?"}
          a={lang === "TH" ? "ส่วนใหญ่ Service Charge 10% จะคิดจากราคาอาหารดิบ (Subtotal) ก่อนนำยอดรวมทั้งหมดไปคิด VAT 7% อีกครั้ง หรือที่เรียกกันว่า ++ (Net = (Price + 10%) + 7%)" : "Service charge is typically applied to the subtotal, and then VAT is applied to the combined amount (Subtotal + SC)."}
        />
        <FAQItem 
          q={lang === "TH" ? "ถ้ามีเพื่อนสั่งเบียร์หรือเมนูแพงๆ จะหารยังไงให้แฟร์?" : "How to fairly split when someone orders expensive items?"}
          a={lang === "TH" ? "คุณสามารถใช้ฟังก์ชัน 'คนสั่งแยก' ด้านบน โดยใส่ราคาเมนูนั้นๆ ระบบของเราจะนำยอดนั้นไปบวก SC และ VAT ตามสัดส่วนอย่างยุติธรรม และหักเพื่อนคนนั้นออกจากกองกลางอัตโนมัติ" : "Use our 'Someone paying separately' feature. The system will correctly apply the proportional SC and VAT to their specific items."}
        />
      </SEOFAQ>
    </div>
  );
}

// 7. Currency Converter
export function CurrencyConverter({ lang }: { lang: Lang }) {
  const [amount, setAmount] = useLocalState("cur_amount", "1000");
  const [fromCur, setFromCur] = useLocalState("cur_from", "USD");
  const [toCur, setToCur] = useLocalState("cur_to", "THB");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("");

  const currencies = ["THB", "USD", "JPY", "KRW", "EUR", "CNY", "GBP", "SGD"];

  useEffect(() => {
    // Fetch live rates
    fetch("https://open.er-api.com/v6/latest/THB")
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          // data.rates is relative to THB. So THB = 1. USD = ~0.028
          setRates(data.rates);
          setLastUpdate(data.time_last_update_utc);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch rates", err);
        // Fallback mock rates
        setRates({
          THB: 1, USD: 0.028, JPY: 4.15, KRW: 38.5, EUR: 0.026, CNY: 0.20, GBP: 0.022, SGD: 0.038
        });
        setLoading(false);
      });
  }, []);

  const swap = () => {
    const temp = fromCur;
    setFromCur(toCur);
    setToCur(temp);
  };

  let result = 0;
  let rateInfo = 0;
  if (!loading && rates[fromCur] && rates[toCur]) {
    // Math: amount / rateFrom * rateTo 
    // Wait, if THB base: 1 THB = 0.028 USD
    // If convert 10 USD to THB: 10 / 0.028 = 357 THB
    const amt = parseFloat(amount) || 0;
    const inTHB = amt / rates[fromCur];
    result = inTHB * rates[toCur];
    rateInfo = (1 / rates[fromCur]) * rates[toCur];
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-500">{lang === "TH" ? "แปลงสกุลเงิน" : "Currency Converter"}</h2>
      <p className="text-sm text-gray-500 mb-6">{lang === "TH" ? "อัพเดตรายวันด้วย API จริง" : "Live daily exchange rates"}</p>
      
      <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-6">
        <label className={labelClass}>{lang === "TH" ? "จำนวนเงิน" : "Amount"}</label>
        <NumericInput value={amount} onChange={setAmount} className={`${inputClass} text-2xl font-bold text-center h-16 focus:ring-green-500`} />
        
        <div className="flex items-center gap-4 mt-6">
          <div className="flex-1">
            <label className={labelClass}>{lang === "TH" ? "จากสกุลเงิน" : "From"}</label>
            <select value={fromCur} onChange={e=>setFromCur(e.target.value)} className={inputClass}>
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          
          <button onClick={swap} className="mt-6 p-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-full transition-transform hover:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-300"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg>
          </button>

          <div className="flex-1">
            <label className={labelClass}>{lang === "TH" ? "เป็นสกุลเงิน" : "To"}</label>
            <select value={toCur} onChange={e=>setToCur(e.target.value)} className={inputClass}>
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}>
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-500/30 p-8 rounded-2xl text-center shadow-neo">
          {loading ? (
            <div className="animate-pulse flex space-x-4 justify-center">
              <div className="h-10 bg-green-200 dark:bg-green-700 rounded w-1/2"></div>
            </div>
          ) : (
            <>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-bold mb-2">{amount || 0} {fromCur} =</p>
              <div className="text-5xl font-black text-green-600 dark:text-green-400 mb-2">
                {result.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} <span className="text-2xl">{toCur}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">1 {fromCur} = {rateInfo.toFixed(4)} {toCur}</p>
            </>
          )}
        </div>
      </motion.div>

      <SEOFAQ title={lang === "TH" ? "เครื่องแปลงสกุลเงิน (FAQ)" : "Currency Converter FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "อัตราแลกเปลี่ยนเชื่อถือได้ไหม?" : "Is the exchange rate reliable?"}
          a={lang === "TH" ? "ข้อมูลของเราดึงมาจาก Exchange Rate API แบบวันต่อวัน ซึ่งอ้างอิงจากอัตราแลกเปลี่ยนกลาง เหมาะสำหรับการประเมินและอ้างอิงเบื้องต้น (ธนาคารอาจจะมีค่าธรรมเนียมซื้อขายเพิ่มเติม)" : "We use daily exchange rates from a public API. It's accurate for mid-market estimations."}
        />
      </SEOFAQ>
    </div>
  );
}

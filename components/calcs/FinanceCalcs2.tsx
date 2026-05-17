"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, NumericInput, CalculationSteps } from "./shared";

// 1. Savings Goal
export function SavingsGoalCalculator({ lang }: { lang: Lang }) {
  const [goal, setGoal] = useLocalState("sav_goal", "");
  const [monthly, setMonthly] = useLocalState("sav_mon", "");

  const months = parseFloat(goal) / parseFloat(monthly);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "เป้าหมายการออม" : "Savings Goal"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "จำนวนเงินเป้าหมาย" : "Goal Amount"}</label><NumericInput value={goal} onChange={setGoal} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "เงินออมต่อเดือน" : "Monthly Savings"}</label><NumericInput value={monthly} onChange={setMonthly} className={inputClass} /></div>
      </div>
      {goal && monthly && !isNaN(months) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "เวลาที่ใช้ (เดือน)" : "Months Needed"}</p>
          <div className="text-4xl font-black text-green-600">{Math.ceil(months)} {lang==="TH"?"เดือน":"Months"}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ภาษีเงินได้":"Income Tax FAQ"}>
          <FAQItem q={lang==="TH"?"อัตราภาษีเงินได้บุคคลธรรมดาไทยปี 2024 เท่าไร?":"What are Thailand's personal income tax rates in 2024?"} a={lang==="TH"?"ภาษีแบบขั้นบันได: 0-150,000 = ยกเว้น | 150,001-300,000 = 5% | 300,001-500,000 = 10% | 500,001-750,000 = 15% | 750,001-1,000,000 = 20% | 1,000,001-2,000,000 = 25% | 2,000,001-5,000,000 = 30% | 5,000,001+ = 35% หักค่าใช้จ่าย 50% ไม่เกิน 100,000 บาท | อ้างอิง: กรมสรรพากร — อัตราภาษีเงินได้บุคคลธรรมดา (2024).":"Progressive rates: 0-150K exempt, 150-300K 5%, 300-500K 10%, 500-750K 15%, 750K-1M 20%, 1-2M 25%, 2-5M 30%, 5M+ 35%. 50% expense deduction up to 100K. | Source: Thai Revenue Dept. (2024)."} />
          <FAQItem q={lang==="TH"?"ลดหย่อนภาษีได้อะไรบ้าง?":"What tax deductions are available?"} a={lang==="TH"?"ค่าลดหย่อนหลัก: ส่วนตัว 60,000 | คู่สมรส 60,000 | บุตร 30,000/คน | ประกันสังคม สูงสุด 9,000 | ประกันชีวิต สูงสุด 100,000 | กองทุน SSF/RMF สูงสุด 30% ของรายได้ | ดอกเบี้ยบ้าน สูงสุด 100,000 | เงินบริจาค 2 เท่า (ไม่เกิน 10%) | อ้างอิง: กรมสรรพากร — รายการลดหย่อนภาษี ปีภาษี 2024.":"Main deductions: Personal 60K, Spouse 60K, Child 30K each, Social Security max 9K, Life insurance max 100K, SSF/RMF max 30% income, Home loan interest max 100K, Donations 2x (max 10%). | Source: Thai Revenue Dept. (2024)."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 2. Inflation
export function InflationCalculator({ lang }: { lang: Lang }) {
  const [amount, setAmount] = useLocalState("inf_amt", "");
  const [rate, setRate] = useLocalState("inf_rate", "3");
  const [years, setYears] = useLocalState("inf_yrs", "10");

  // Future Cost = Amount * (1 + Rate/100)^Years
  const future = parseFloat(amount) * Math.pow(1 + parseFloat(rate)/100, parseFloat(years));

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "คำนวณเงินเฟ้อ" : "Inflation Impact"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "มูลค่าปัจจุบัน" : "Current Amount"}</label><NumericInput value={amount} onChange={setAmount} className={inputClass} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "อัตราเงินเฟ้อ (%)" : "Inflation Rate (%)"}</label><input type="number" value={rate} onChange={e=>setRate(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "จำนวนปี" : "Years"}</label><input type="number" value={years} onChange={e=>setYears(e.target.value)} className={inputClass} /></div>
        </div>
      </div>
      {amount && rate && years && !isNaN(future) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "มูลค่าในอนาคต (ที่ต้องจ่าย)" : "Future Cost"}</p>
          <div className="text-4xl font-black text-green-600">{future.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ดอกเบี้ยทบต้น":"Compound Interest FAQ"}>
          <FAQItem q={lang==="TH"?"ดอกเบี้ยทบต้นทำงานอย่างไร?":"How does compound interest work?"} a={lang==="TH"?"ดอกเบี้ยทบต้นคือดอกเบี้ยที่คิดจากเงินต้น+ดอกเบี้ยสะสม สูตร: A = P(1+r/n)^(nt) เช่น ฝาก 100,000 บาท ดอกเบี้ย 5%/ปี ทบต้นรายเดือน 10 ปี = 164,701 บาท (ดอกเบี้ยเดี่ยวได้แค่ 150,000) Albert Einstein เรียกว่า 'สิ่งมหัศจรรย์อันดับ 8 ของโลก' | อ้างอิง: Investopedia — Compound Interest; SEC — Compound Interest Calculator.":"Interest on principal + accumulated interest. Formula: A = P(1+r/n)^(nt). E.g., 100K at 5%/yr compounded monthly for 10 yrs = 164,701 (simple interest = only 150K). | Source: Investopedia; SEC."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 3. Salary to Hourly
export function SalaryToHourlyCalculator({ lang }: { lang: Lang }) {
  const [salary, setSalary] = useLocalState("sal_amt", "");
  const [hours, setHours] = useLocalState("sal_hrs", "40"); // weekly
  
  const hourly = parseFloat(salary) / (parseFloat(hours) * 52); // Assuming annual salary

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "แปลงเงินเดือนเป็นรายชั่วโมง" : "Salary to Hourly"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "เงินเดือน (รายปี)" : "Annual Salary"}</label><NumericInput value={salary} onChange={setSalary} className={inputClass} placeholder={lang==="TH"?"ถ้าเป็นรายเดือนให้คูณ 12 ก่อน":"Yearly total"} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ชั่วโมงทำงาน (ต่อสัปดาห์)" : "Hours per Week"}</label><input type="number" value={hours} onChange={e=>setHours(e.target.value)} className={inputClass} /></div>
      </div>
      {salary && hours && !isNaN(hourly) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "รายได้ต่อชั่วโมง" : "Hourly Rate"}</p>
          <div className="text-4xl font-black text-green-600">{hourly.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — แปลงสกุลเงิน":"Currency FAQ"}>
          <FAQItem q={lang==="TH"?"แลกเงินที่ไหนได้เรทดีที่สุด?":"Where to get the best exchange rate?"} a={lang==="TH"?"เรทดีที่สุด: 1) ร้านแลกเงินเอกชน (SuperRich, Vasu) เรทดีกว่าธนาคาร 2-5% 2) ธนาคาร (สาขาสนามบินเรทแย่ที่สุด) 3) บัตร Debit ถอน ATM ต่างประเทศ (ดูค่า FX Fee) หลีกเลี่ยงการแลกที่สนามบินและโรงแรม | อ้างอิง: ธนาคารแห่งประเทศไทย — อัตราแลกเปลี่ยนอ้างอิง; XE.com.":"Best rates: 1) Licensed money changers (SuperRich, Vasu) 2-5% better than banks 2) Banks (airport branches worst) 3) Debit cards abroad (check FX fees). Avoid airport/hotel exchanges. | Source: Bank of Thailand; XE.com."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 4. Net Worth
export function NetWorthCalculator({ lang }: { lang: Lang }) {
  const [assets, setAssets] = useLocalState("nw_assets", "");
  const [liab, setLiab] = useLocalState("nw_liab", "");
  
  const nw = parseFloat(assets) - parseFloat(liab);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "ความมั่งคั่งสุทธิ" : "Net Worth"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ทรัพย์สินรวม (Assets)" : "Total Assets"}</label><NumericInput value={assets} onChange={setAssets} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "หนี้สินรวม (Liabilities)" : "Total Liabilities"}</label><NumericInput value={liab} onChange={setLiab} className={inputClass} /></div>
      </div>
      {assets && liab && !isNaN(nw) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "ความมั่งคั่งสุทธิ" : "Net Worth"}</p>
          <div className={`text-4xl font-black ${nw >= 0 ? "text-green-600" : "text-red-500"}`}>{nw.toLocaleString()}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — เงินเฟ้อ":"Inflation FAQ"}>
          <FAQItem q={lang==="TH"?"เงินเฟ้อส่งผลต่อเงินออมอย่างไร?":"How does inflation affect savings?"} a={lang==="TH"?"เงินเฟ้อทำให้อำนาจซื้อลดลง เช่น เงินเฟ้อ 3%/ปี เงิน 1,000,000 บาทวันนี้จะมีอำนาจซื้อเท่ากับ 744,094 บาทใน 10 ปี และ 553,676 บาทใน 20 ปี ดังนั้นดอกเบี้ยออมทรัพย์ 0.5%/ปี จริงๆ แล้วขาดทุน 2.5%/ปี | อ้างอิง: ธนาคารแห่งประเทศไทย — เป้าหมายเงินเฟ้อ; สำนักงานสถิติแห่งชาติ — ดัชนีราคาผู้บริโภค (CPI).":"Inflation reduces purchasing power. At 3%/yr, 1M THB today = 744K in 10 yrs, 554K in 20 yrs. So 0.5% savings interest actually loses 2.5%/yr in real terms. | Source: Bank of Thailand; Thai National Statistical Office — CPI."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 5. Debt Payoff
export function DebtPayoffCalculator({ lang }: { lang: Lang }) {
  const [debt, setDebt] = useLocalState("dp_debt", "");
  const [interest, setInterest] = useLocalState("dp_int", "");
  const [payment, setPayment] = useLocalState("dp_pay", "");
  
  let months = 0;
  let totalInterest = 0;
  
  const p = parseFloat(debt);
  const r = parseFloat(interest) / 100 / 12;
  const m = parseFloat(payment);
  
  if (p > 0 && r >= 0 && m > 0) {
    if (r === 0) {
      months = p / m;
    } else if (m > p * r) {
      months = -Math.log(1 - (p * r) / m) / Math.log(1 + r);
      totalInterest = (months * m) - p;
    } else {
      months = Infinity;
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "วางแผนปลดหนี้" : "Debt Payoff Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ยอดหนี้คงเหลือ" : "Total Debt Balance"}</label>
          <NumericInput value={debt} onChange={setDebt} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "อัตราดอกเบี้ยต่อปี (%)" : "Annual Interest Rate (%)"}</label>
          <input type="number" step="0.1" value={interest} onChange={e=>setInterest(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ยอดผ่อนต่อเดือนที่ตั้งใจ" : "Monthly Payment"}</label>
          <NumericInput value={payment} onChange={setPayment} className={inputClass} />
        </div>
      </div>
      
      {p > 0 && m > 0 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className={`mt-6 p-6 rounded-xl text-center border ${months === Infinity ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          {months === Infinity ? (
            <div className="text-xl font-bold text-red-600">{lang==="TH"?"ยอดผ่อนน้อยกว่าดอกเบี้ย! หนี้จะไม่ลดลง":"Payment is less than interest! Debt will never be paid off."}</div>
          ) : (
            <>
              <p className="text-gray-500 mb-2">{lang === "TH" ? "ระยะเวลาปลดหนี้โดยประมาณ" : "Estimated Time to Payoff"}</p>
              <div className="text-4xl font-black text-green-600 mb-2">
                {Math.ceil(months)} {lang==="TH"?"เดือน":"Months"} 
                <span className="text-lg font-normal text-gray-500 block">
                  (~{(months/12).toFixed(1)} {lang==="TH"?"ปี":"Years"})
                </span>
              </div>
              <div className="text-sm text-gray-600 mt-4">
                {lang==="TH"?"ดอกเบี้ยรวมที่ต้องจ่าย:":"Total Interest Paid:"} <span className="font-bold">฿{Math.ceil(totalInterest).toLocaleString()}</span>
              </div>
            </>
          )}
        </motion.div>
      )}

      <div className="mt-8">
        <CalculationSteps 
          steps={lang === "TH" ? [
            "สูตรไม่มีดอกเบี้ย: จำนวนเดือน = ยอดหนี้ / ยอดผ่อน",
            "สูตรมีดอกเบี้ย: จำนวนเดือน = -log(1 - (ยอดหนี้ × ดอกเบี้ยรายเดือน) / ยอดผ่อน) / log(1 + ดอกเบี้ยรายเดือน)",
            "หากยอดผ่อน < ดอกเบี้ยรายเดือนที่เกิดขึ้น หนี้จะไม่ลดลง (ระยะเวลาปลดหนี้ = Infinity)"
          ] : [
            "0% Interest: Months = Debt / Monthly Payment",
            "With Interest: Months = -log(1 - (Debt × Monthly Rate) / Payment) / log(1 + Monthly Rate)",
            "If Payment < Monthly Interest, debt will never be paid off (Months = Infinity)"
          ]}
        />
        <SEOFAQ title={lang==="TH"?"FAQ — การวางแผนปลดหนี้":"Debt Payoff FAQ"}>
        <FAQItem q={lang==="TH"?"ดอกเบี้ยบ้านและดอกเบี้ยบัตรเครดิตคิดเหมือนกันไหม?":"Is mortgage interest calculated the same as credit cards?"} a={lang==="TH"?"ไม่เหมือนกัน ดอกเบี้ยบัตรเครดิต/สินเชื่อบุคคลมักเป็นแบบ 'ลดต้นลดดอก' คิดเป็นรายวัน ส่วนดอกเบี้ยบ้านก็ลดต้นลดดอกแต่เรทถูกกว่ามาก (มักจะ 3-6% ต่อปีเทียบกับบัตรเครดิต 16-25% ต่อปี).":"Both are usually amortized (reducing balance), but credit card rates are much higher (16-25% p.a.) compared to mortgages (3-6% p.a.) and credit card interest is calculated daily."} />
        <FAQItem q={lang==="TH"?"วิธีปลดหนี้แบบ Snowball คืออะไร?":"What is the Snowball debt payoff method?"} a={lang==="TH"?"Snowball Method คือการเรียงลำดับจ่ายหนี้จาก 'ก้อนที่เล็กที่สุดไปก้อนใหญ่ที่สุด' (โดยจ่ายขั้นต่ำก้อนอื่นไว้) เพื่อสร้างกำลังใจเมื่อเห็นหนี้ก้อนเล็กถูกปิดไปทีละก้อน เหมาะสำหรับคนที่ต้องการแรงจูงใจ.":"Snowball Method focuses on paying off the smallest debt balances first while paying minimums on others. It provides quick psychological wins and motivation."} />
        <FAQItem q={lang==="TH"?"วิธีปลดหนี้แบบ Avalanche คืออะไร?":"What is the Avalanche debt payoff method?"} a={lang==="TH"?"Avalanche Method คือการเรียงลำดับจ่ายหนี้จาก 'ก้อนที่ดอกเบี้ยแพงที่สุดไปก้อนที่ถูกที่สุด' วิธีนี้จะช่วยประหยัดเงินค่าดอกเบี้ยได้มากที่สุดและปลดหนี้ได้เร็วที่สุดในทางคณิตศาสตร์.":"Avalanche Method focuses on paying off debts with the highest interest rates first. Mathematically, it saves the most money and pays off debt the fastest."} />
        <FAQItem q={lang==="TH"?"จ่ายแค่ 'ขั้นต่ำ' บัตรเครดิต ดีหรือไม่?":"Is it okay to only pay the 'minimum' on credit cards?"} a={lang==="TH"?"ไม่ดีอย่างยิ่ง! การจ่ายขั้นต่ำจะทำให้เงินที่จ่ายไปตัดแต่ดอกเบี้ย (แถมดอกเบี้ยเดินทุกวัน) ยอดต้นลดลงช้ามาก อาจต้องใช้เวลาเป็นสิบปีในการปลดหนี้ และเสียดอกเบี้ยมหาศาล.":"Never just pay the minimum if you can help it. Most of your payment goes to interest, drastically extending your payoff timeline to years or decades while costing you a fortune."} />
        <FAQItem q={lang==="TH"?"รีไฟแนนซ์ (Refinance) ช่วยลดหนี้ได้ไหม?":"Does refinancing help reduce debt?"} a={lang==="TH"?"ได้ การรีไฟแนนซ์คือการย้ายหนี้ไปสถาบันการเงินที่ให้ดอกเบี้ยถูกกว่า ทำให้ยอดผ่อนต่อเดือนลดลง หรือเงินไปตัดเงินต้นมากขึ้น (นิยมทำกับหนี้บ้าน หรือการรวมหนี้บัตรเครดิต).":"Yes, refinancing moves your debt to a lender with a lower interest rate. This lowers monthly payments and puts more money toward the principal. Very common for mortgages."} />
        <FAQItem q={lang==="TH"?"หนี้เสีย (NPL) คืออะไร?":"What is an NPL (Non-Performing Loan)?"} a={lang==="TH"?"หนี้เสีย หรือ NPL คือสินเชื่อที่ค้างชำระติดต่อกันเกิน 90 วัน หรือ 3 งวด หากปล่อยให้เป็น NPL จะถูกบันทึกในเครดิตบูโร ทำให้กู้เงิน หรือทำธุรกรรมทางการเงินในอนาคตได้ยากมาก.":"An NPL is a loan that is in default or close to being in default (usually 90 days past due). It ruins your credit score and makes future borrowing extremely difficult."} />
        <FAQItem q={lang==="TH"?"เครดิตบูโร (Credit Bureau) เก็บข้อมูลกี่ปี?":"How long does Credit Bureau keep your history?"} a={lang==="TH"?"ในประเทศไทย บริษัท ข้อมูลเครดิตแห่งชาติ จะเก็บประวัติการชำระหนี้ของคุณย้อนหลัง 36 เดือน (3 ปี) ดังนั้นหากเคยมีประวัติเสีย ต้องสร้างวินัยการจ่ายใหม่ต่อเนื่อง 3 ปี ประวัติเก่าจึงจะถูกลบ.":"In Thailand, the National Credit Bureau keeps your payment history for the past 36 months (3 years). Good behavior over 3 years will push out old negative marks."} />
        <FAQItem q={lang==="TH"?"ถ้าจ่ายหนี้ไม่ไหวจริงๆ ควรทำอย่างไร?":"What to do if I absolutely cannot pay my debts?"} a={lang==="TH"?"อย่าหนี! ให้รีบติดต่อธนาคารหรือเจ้าหนี้ทันทีเพื่อขอ 'ประนอมหนี้' (Debt Restructuring) เช่น ขอขยายเวลาผ่อน หรือขอลดดอกเบี้ย ธนาคารส่วนใหญ่ยินดีเจรจาดีกว่าปล่อยให้เป็นหนี้เสีย.":"Do not run away! Contact your bank immediately to request 'Debt Restructuring' (e.g., lower rates, extended terms). Banks prefer negotiating over letting it become an NPL."} />
        <FAQItem q={lang==="TH"?"ทำไมเครื่องคำนวณบอกว่า 'หนี้จะไม่ลดลง'?":"Why does the calculator say 'Debt will never be paid off'?"} a={lang==="TH"?"เพราะ 'ยอดผ่อนต่อเดือน' ที่คุณกรอก น้อยกว่า 'ดอกเบี้ยรายเดือน' ที่เพิ่มขึ้น ทำให้คุณจ่ายหนี้ไม่ทันดอกเบี้ยที่งอกออกมา ยอดหนี้จะพอกพูนขึ้นเรื่อยๆ (ติดลบ).":"Because the 'Monthly Payment' you entered is smaller than the monthly interest generated. You aren't even covering the interest, so the debt will grow infinitely."} />
        <FAQItem q={lang==="TH"?"ควรเก็บเงินฉุกเฉินก่อน หรือ โปะหนี้ก่อน?":"Should I save an emergency fund or pay off debt first?"} a={lang==="TH"?"ควรมีเงินฉุกเฉินเบื้องต้น (เช่น 10,000-30,000 บาท หรือพอดำรงชีพ 1 เดือน) ไว้ก่อน เพื่อป้องกันการกลับไปรูดบัตรก่อหนี้เพิ่มเมื่อเกิดเหตุฉุกเฉิน จากนั้นจึงนำเงินที่เหลือไปทุ่มโปะหนี้ดอกเบี้ยสูง.":"Save a starter emergency fund first (e.g., 1-month expenses) to prevent going back into debt if an emergency hits. Then throw all remaining cash at high-interest debt."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 6. Retirement
export function RetirementCalculator({ lang }: { lang: Lang }) {
  const [currentAge, setCurrentAge] = useLocalState("rc_c_age", "");
  const [retireAge, setRetireAge] = useLocalState("rc_r_age", "");
  const [currentSavings, setCurrentSavings] = useLocalState("rc_sav", "");
  const [monthlyContribution, setMonthlyContribution] = useLocalState("rc_mon", "");
  const [expectedReturn, setExpectedReturn] = useLocalState("rc_ret", "5");
  
  const cAge = parseFloat(currentAge);
  const rAge = parseFloat(retireAge);
  const p = parseFloat(currentSavings) || 0;
  const pmt = parseFloat(monthlyContribution) || 0;
  const r = parseFloat(expectedReturn) / 100;
  
  let totalAtRetirement = 0;
  const years = rAge - cAge;

  if (cAge > 0 && rAge > cAge && !isNaN(r)) {
    const months = years * 12;
    const monthlyRate = r / 12;
    
    // Future value of current savings
    const fvSavings = p * Math.pow(1 + monthlyRate, months);
    
    // Future value of monthly contributions
    let fvContributions = 0;
    if (monthlyRate > 0) {
      fvContributions = pmt * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else {
      fvContributions = pmt * months;
    }
    
    totalAtRetirement = fvSavings + fvContributions;
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "วางแผนเกษียณอายุ" : "Retirement Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "อายุปัจจุบัน" : "Current Age"}</label>
            <input type="number" value={currentAge} onChange={e=>setCurrentAge(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "อายุที่อยากเกษียณ" : "Retirement Age"}</label>
            <input type="number" value={retireAge} onChange={e=>setRetireAge(e.target.value)} className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "เงินเก็บที่มีอยู่แล้ว" : "Current Savings Balance"}</label>
          <NumericInput value={currentSavings} onChange={setCurrentSavings} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "เงินออมเพิ่มต่อเดือน" : "Monthly Contribution"}</label>
          <NumericInput value={monthlyContribution} onChange={setMonthlyContribution} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ผลตอบแทนคาดหวังต่อปี (%)" : "Expected Annual Return (%)"}</label>
          <input type="number" step="0.1" value={expectedReturn} onChange={e=>setExpectedReturn(e.target.value)} className={inputClass} placeholder="e.g. 5" />
        </div>
      </div>
      
      {years > 0 && totalAtRetirement > 0 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center border border-green-200">
          <p className="text-gray-500 mb-2">{lang === "TH" ? "เงินรวมเมื่อเกษียณ (อายุ " + rAge + " ปี)" : "Total Balance at Retirement (Age " + rAge + ")"}</p>
          <div className="text-4xl font-black text-green-600 mb-2">฿{Math.floor(totalAtRetirement).toLocaleString()}</div>
          <div className="text-sm text-gray-500">
            {lang==="TH"?"ใช้เวลาออมทั้งหมด: ":"Total time saving: "} <span className="font-bold">{years}</span> {lang==="TH"?"ปี":"years"}
          </div>
        </motion.div>
      )}

      <div className="mt-8">
        <CalculationSteps 
          steps={lang === "TH" ? [
            "หาระยะเวลาออม: อายุเกษียณ - อายุปัจจุบัน = จำนวนปี (แปลงเป็นเดือน)",
            "เงินก้อนเดิมเติบโต (FV): เงินต้น × (1 + ดอกเบี้ยรายเดือน)^(จำนวนเดือน)",
            "เงินออมรายเดือนเติบโต (FVA): เงินออมรายเดือน × [((1 + ดอกเบี้ยรายเดือน)^(จำนวนเดือน) - 1) / ดอกเบี้ยรายเดือน]",
            "เงินรวมเมื่อเกษียณ = เงินก้อนเดิมเติบโต (FV) + เงินออมรายเดือนเติบโต (FVA)"
          ] : [
            "Saving Time: Retirement Age - Current Age = Years (convert to months)",
            "Future Value (Initial): Savings × (1 + Monthly Rate)^(Months)",
            "Future Value (Monthly): Contribution × [((1 + Monthly Rate)^(Months) - 1) / Monthly Rate]",
            "Total Retirement Balance = Future Value (Initial) + Future Value (Monthly)"
          ]}
        />
        <SEOFAQ title={lang==="TH"?"FAQ — การวางแผนเกษียณ":"Retirement Planning FAQ"}>
        <FAQItem q={lang==="TH"?"ต้องมีเงินเท่าไรถึงจะเกษียณได้?":"How much money do I need to retire?"} a={lang==="TH"?"กฎพื้นฐานคือ Rule of 25: ให้นำ 'ค่าใช้จ่ายรายปีที่คาดว่าจะใช้หลังเกษียณ' คูณด้วย 25 เช่น หากอยากใช้เดือนละ 30,000 บาท (ปีละ 360,000 บาท) เป้าหมายเงินเกษียณคือ 360,000 × 25 = 9,000,000 บาท.":"The rule of thumb is the 'Rule of 25'. Multiply your expected annual retirement expenses by 25. E.g., if you need 360k THB/year, your target portfolio is 360k × 25 = 9,000,000 THB."} />
        <FAQItem q={lang==="TH"?"กฎ 4% (The 4% Rule) คืออะไร?":"What is the 4% Rule?"} a={lang==="TH"?"กฎ 4% คือแนวคิดที่ว่า หากคุณดึงเงินออกจากพอร์ตเกษียณ (ที่ลงทุนในหุ้นและตราสารหนี้) ปีละ 4% ของมูลค่าพอร์ตเริ่มต้น โดยปรับตามอัตราเงินเฟ้อทุกปี เงินก้อนนี้จะมีโอกาสสูงมากที่จะพอใช้ไปตลอด 30 ปีโดยไม่หมด.":"The 4% Rule states you can withdraw 4% of your portfolio in year one, and adjust for inflation each subsequent year, and your money is highly likely to last 30 years."} />
        <FAQItem q={lang==="TH"?"ผลตอบแทนคาดหวัง 5-8% หาได้จากไหน?":"Where can I get 5-8% annual return?"} a={lang==="TH"?"โดยทั่วไป กองทุนรวมดัชนีหุ้น (Index Funds) เช่น S&P500 ให้ผลตอบแทนเฉลี่ยระยะยาว (10+ ปี) ประมาณ 7-10% ส่วนตราสารหนี้ให้ประมาณ 2-4% การจัดพอร์ตผสม (Asset Allocation) สามารถสร้างผลตอบแทนเฉลี่ย 5-8% ได้แบบความเสี่ยงเหมาะสม.":"Historically, broad stock index funds (like S&P 500) average 7-10% long-term. Bonds average 2-4%. A diversified portfolio can realistically target 5-8% average annualized returns."} />
        <FAQItem q={lang==="TH"?"เงินเฟ้อมีผลต่อเงินเกษียณอย่างไร?":"How does inflation affect retirement?"} a={lang==="TH"?"เงินเฟ้อทำให้ข้าวของแพงขึ้น (ค่าเงินลดลง) หากเงินเฟ้อเฉลี่ย 3% ต่อปี เงิน 1 ล้านบาทในอีก 20 ปีข้างหน้า จะมีอำนาจซื้อเทียบเท่าเงินแค่ประมาณ 5.5 แสนบาทในวันนี้ จึงต้องนำเงินเก็บไปลงทุนให้ชนะเงินเฟ้อ.":"Inflation reduces purchasing power. At 3% inflation, 1 million today will buy about half as much in 24 years. You must invest to outpace inflation, not just leave it in a savings account."} />
        <FAQItem q={lang==="TH"?"ควรเริ่มเก็บเงินเกษียณเมื่อไร?":"When should I start saving for retirement?"} a={lang==="TH"?"เริ่มเร็วที่สุดเท่าที่จะทำได้! พลังของ 'ดอกเบี้ยทบต้น' (Compound Interest) ทำงานได้ดีที่สุดเมื่อมี 'เวลา' การเริ่มเก็บเงินตอนอายุ 25 ปี จะใช้เงินต้นน้อยกว่าและเหนื่อยน้อยกว่าการไปเริ่มตอนอายุ 40 ปีมาก.":"As early as possible! Compound interest relies heavily on TIME. Starting at age 25 requires significantly less monthly effort than starting at age 40."} />
        <FAQItem q={lang==="TH"?"ประกันสังคมและกองทุนสำรองเลี้ยงชีพ (Provident Fund) นับเป็นเงินเกษียณไหม?":"Do Social Security and Provident Funds count?"} a={lang==="TH"?"นับแน่นอน! กองทุนสำรองเลี้ยงชีพ (PVD) / กบข. / ประกันสังคม (กรณีรับบำนาญ) เป็นเสาหลักสำคัญของการเกษียณ ควรสมทบ PVD ให้เต็มแม็กซ์ที่บริษัทให้ (เช่น 5-15%) เพราะเป็นเงินฟรีที่นายจ้างสมทบให้.":"Absolutely! Provident Funds (PVD), Social Security pensions, and RMFs are core pillars. Always maximize employer PVD match (e.g. 5-10%)—it's free money!"} />
        <FAQItem q={lang==="TH"?"ควรเก็บเงินเกษียณกี่เปอร์เซ็นต์ของรายได้?":"What percentage of income should I save for retirement?"} a={lang==="TH"?"ผู้เชี่ยวชาญแนะนำให้กันเงินไว้อย่างน้อย 10-15% ของรายได้ต่อเดือน (รวมเงินสมทบจากนายจ้างแล้ว) เพื่อการเกษียณโดยเฉพาะ แต่ถ้าเริ่มช้า อาจต้องเก็บเพิ่มเป็น 20-30%.":"Experts generally recommend saving 10-15% of your gross income (including employer match) strictly for retirement. If you start late, you may need to save 20-30%."} />
        <FAQItem q={lang==="TH"?"หลังเกษียณควรลงทุนต่อไหม หรือเก็บเป็นเงินสดทั้งหมด?":"Should I keep investing after retirement or hold cash?"} a={lang==="TH"?"ไม่ควรเก็บเป็นเงินสด 100% เพราะเงินเฟ้อจะกัดกิน ควรย้ายเงินส่วนใหญ่ไปสินทรัพย์เสี่ยงต่ำ (ตราสารหนี้, เงินฝาก) และเหลือสัดส่วนหุ้น (ประมาณ 30-40%) ไว้เพื่อให้พอร์ตยังคงเติบโตชนะเงินเฟ้อ.":"Never hold 100% cash due to inflation. Shift to a conservative portfolio (mostly bonds/fixed income), but retain some stocks (e.g., 30-40%) to ensure long-term growth outpaces inflation."} />
        <FAQItem q={lang==="TH"?"FIRE Movement คืออะไร?":"What is the FIRE movement?"} a={lang==="TH"?"FIRE (Financial Independence, Retire Early) คือกลุ่มคนที่ตั้งใจออมเงินอย่างหนัก (50-70% ของรายได้) และใช้ชีวิตแบบประหยัด เพื่อสะสมความมั่งคั่งให้ถึงเป้าหมายและเกษียณตัวเองในวัย 30-40 ปี.":"Financial Independence, Retire Early. A lifestyle movement focusing on extreme savings (50-70% of income) and frugal living to retire in your 30s or 40s instead of 60s."} />
        <FAQItem q={lang==="TH"?"อายุเยอะแล้วยังไม่ได้เริ่มเก็บเงินเกษียณเลย ทำอย่างไรดี?":"I'm older and have no savings, what do I do?"} a={lang==="TH"?"อย่าตื่นตระหนก 1) ลดรายจ่ายฟุ่มเฟือยลงทันที 2) โฟกัสไปที่การปิดหนี้ดอกเบี้ยสูง 3) หาช่องทางเพิ่มรายได้ 4) วางแผนลดขนาดที่อยู่อาศัย (Downsize) หรือทำงานหลังเกษียณเบาๆ ไม่มีคำว่าสายเกินไป.":"Don't panic. 1) Cut expenses aggressively. 2) Eliminate high-interest debt. 3) Increase income streams. 4) Plan to downsize your home or work a part-time job during retirement. It's never too late to start."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 7. Stock Profit
export function StockProfitCalculator({ lang }: { lang: Lang }) {
  const [buyPrice, setBuy] = useLocalState("stk_buy", "");
  const [sellPrice, setSell] = useLocalState("stk_sell", "");
  const [shares, setShares] = useLocalState("stk_shr", "");
  
  const profit = (parseFloat(sellPrice) - parseFloat(buyPrice)) * parseFloat(shares);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "กำไรหุ้น" : "Stock Profit"}</h2>
      <div className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "ราคาซื้อ" : "Buy Price"}</label><NumericInput value={buyPrice} onChange={setBuy} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "ราคาขาย" : "Sell Price"}</label><NumericInput value={sellPrice} onChange={setSell} className={inputClass} /></div>
        </div>
        <div><label className={labelClass}>{lang === "TH" ? "จำนวนหุ้น" : "Shares"}</label><NumericInput value={shares} onChange={setShares} className={inputClass} /></div>
      </div>
      {buyPrice && sellPrice && shares && !isNaN(profit) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "กำไร/ขาดทุน (ยังไม่หักค่าธรรมเนียม)" : "Profit/Loss (Excl. fees)"}</p>
          <div className={`text-4xl font-black ${profit >= 0 ? "text-green-600" : "text-red-500"}`}>{profit.toLocaleString()}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ภาษีมูลค่าเพิ่ม":"VAT FAQ"}>
          <FAQItem q={lang==="TH"?"VAT 7% ในไทยคิดอย่างไร?":"How is Thailand's 7% VAT calculated?"} a={lang==="TH"?"VAT ไทย 7% (ลดจาก 10% ตามพระราชกฤษฎีกา) คิดจากราคาสินค้า/บริการ สูตร: ราคารวม VAT = ราคา × 1.07 หรือ VAT = ราคารวม × 7/107 ธุรกิจที่มีรายได้เกิน 1.8 ล้าน/ปี ต้องจดทะเบียน VAT | อ้างอิง: กรมสรรพากร — ภาษีมูลค่าเพิ่ม; ประมวลรัษฎากร มาตรา 77-95.":"Thai VAT is 7% (reduced from 10%). Formula: Price with VAT = Price × 1.07. VAT amount = Total × 7/107. Businesses with >1.8M THB/yr revenue must register. | Source: Thai Revenue Dept.; Revenue Code §77-95."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 8. ROI
export function ROICalculator({ lang }: { lang: Lang }) {
  const [invested, setInv] = useLocalState("roi_inv", "");
  const [returned, setRet] = useLocalState("roi_ret", "");
  
  const roi = ((parseFloat(returned) - parseFloat(invested)) / parseFloat(invested)) * 100;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "ผลตอบแทน ROI" : "ROI"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "เงินลงทุน" : "Amount Invested"}</label><NumericInput value={invested} onChange={setInv} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "เงินที่ได้รับกลับมา" : "Amount Returned"}</label><NumericInput value={returned} onChange={setRet} className={inputClass} /></div>
      </div>
      {invested && returned && !isNaN(roi) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "ROI (%)" : "Return on Investment (%)"}</p>
          <div className={`text-4xl font-black ${roi >= 0 ? "text-green-600" : "text-red-500"}`}>{roi.toFixed(2)}%</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — สินเชื่อบ้าน":"Mortgage FAQ"}>
          <FAQItem q={lang==="TH"?"ดอกเบี้ยบ้านไทยปี 2024 เท่าไร?":"What are Thai mortgage rates in 2024?"} a={lang==="TH"?"ดอกเบี้ยบ้าน 2024: MRR ธนาคารใหญ่ 6.65-7.15% ปีแรกโปรโมชั่น 2.5-3.5% (คงที่ 1-3 ปี) สินเชื่อบ้านผ่อนได้สูงสุด 30-35 ปี วงเงินอนุมัติ 80-95% ของราคาประเมิน ค่างวดไม่ควรเกิน 40% ของรายได้ | อ้างอิง: ธนาคารแห่งประเทศไทย — อัตรา MRR; สมาคมธนาคารไทย — สินเชื่อที่อยู่อาศัย.":"2024 rates: MRR 6.65-7.15%, promotional first-year 2.5-3.5% (fixed 1-3 yrs). Max term 30-35 yrs, LTV 80-95%. Monthly payment should not exceed 40% of income. | Source: BOT — MRR rates; Thai Bankers Association."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

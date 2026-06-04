"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { AdPlaceholder } from "../AdPlaceholder";
import { 
  useLocalState, 
  NumericInput, 
  SEOFAQ, 
  FAQItem, 
  CalculationSteps, 
  ExportResult, 
  inputClass, 
  labelClass 
} from "./shared";

// ==========================================
// 1. RentalYieldNew (คำนวณ Rental Yield ห้องชุด)
// ==========================================
export function RentalYieldNew({ lang }: { lang: Lang }) {
  const [price, setPrice] = useLocalState("ry_price", "");
  const [rent, setRent] = useLocalState("ry_rent", "");
  const [months, setMonths] = useLocalState("ry_months", "12");
  const [fee, setFee] = useLocalState("ry_fee", "");
  const [other, setOther] = useLocalState("ry_other", "");

  const pVal = parseFloat(price) || 0;
  const rVal = parseFloat(rent) || 0;
  const mVal = parseFloat(months) || 0;
  const fVal = parseFloat(fee) || 0;
  const oVal = parseFloat(other) || 0;

  const grossRevenue = rVal * mVal;
  const grossYield = pVal > 0 ? (grossRevenue / pVal) * 100 : 0;
  const netRevenue = grossRevenue - fVal - oVal;
  const netYield = pVal > 0 ? (netRevenue / pVal) * 100 : 0;

  return (
    <div id="rental-yield-new-calc" className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-500 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="15" r="1"/></svg>
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            {lang === "TH" ? "คำนวณ Rental Yield คอนโด/ห้องชุด" : "Condo Rental Yield Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "หาอัตราผลตอบแทนจากการปล่อยเช่าห้องชุดแบบ Gross และ Net Yield" : "Calculate Gross and Net Rental Yield for condo investments."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ราคาซื้อห้องชุด (บาท)" : "Purchase Price (THB)"}</label>
            <NumericInput value={price} onChange={setPrice} placeholder="เช่น 3,000,000" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าเช่าต่อเดือน (บาท)" : "Monthly Rent (THB)"}</label>
            <NumericInput value={rent} onChange={setRent} placeholder="เช่น 15,000" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "จำนวนเดือนที่มีคนเช่าต่อปี" : "Occupied Months per Year"}</label>
            <select 
              value={months} 
              onChange={e => setMonths(e.target.value)} 
              className={inputClass}
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} {lang === "TH" ? "เดือน" : "Months"}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าส่วนกลางต่อปี (บาท)" : "Annual Maintenance Fee (THB)"}</label>
            <NumericInput value={fee} onChange={setFee} placeholder="เช่น 18,000" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าใช้จ่ายอื่นๆ ต่อปี เช่น ค่าซ่อมแซม, ภาษี (บาท)" : "Other Annual Expenses (THB)"}</label>
            <NumericInput value={other} onChange={setOther} placeholder="เช่น 5,000" />
          </div>
        </div>

        <div className="flex flex-col justify-between bg-gray-50/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{lang === "TH" ? "ผลการคำนวณผลตอบแทน" : "Rental Yield Results"}</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Gross Rental Yield</span>
                <span className="text-2xl font-black text-emerald-500">{grossYield.toFixed(2)}%</span>
              </div>
              <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Net Rental Yield</span>
                <span className="text-2xl font-black text-blue-500">{netYield.toFixed(2)}%</span>
              </div>
            </div>

            <div className="space-y-2 text-sm border-t border-gray-200 dark:border-white/10 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "รายได้ค่าเช่าต่อปี:" : "Gross Annual Rent:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">฿{grossRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "รายจ่ายในการถือครองต่อปี:" : "Total Annual Expenses:"}</span>
                <span className="font-bold text-red-500">฿{(fVal + oVal).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-white/10 pt-2 font-bold text-base">
                <span className="text-gray-900 dark:text-white">{lang === "TH" ? "รายได้สุทธิต่อปี:" : "Net Annual Income:"}</span>
                <span className="text-emerald-500">฿{netRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <ExportResult elementId="rental-yield-new-calc" fileName="condo-rental-yield" lang={lang} />
          </div>
        </div>
      </div>

      <CalculationSteps 
        title={lang === "TH" ? "สูตรที่ใช้คำนวณผลตอบแทนคอนโด" : "Rental Yield Formulas"}
        steps={lang === "TH" ? [
          "Gross Rental Yield = (ค่าเช่ารายเดือน × จำนวนเดือนที่ปล่อยเช่าต่อปี) ÷ ราคาซื้อคอนโด × 100",
          "Net Rental Yield = ((ค่าเช่ารายเดือน × จำนวนเดือนที่ปล่อยเช่าต่อปี) - ค่าส่วนกลางและรายจ่ายสะสมต่อปี) ÷ ราคาซื้อคอนโด × 100",
          "การคำนวณนี้แสดงอัตราผลตอบแทนเบื้องต้นต่อปี โดยไม่รวมการกู้ยืมและดอกเบี้ยธนาคาร"
        ] : [
          "Gross Rental Yield = (Monthly Rent × Occupied Months) ÷ Purchase Price × 100",
          "Net Rental Yield = ((Monthly Rent × Occupied Months) - Annual Expenses) ÷ Purchase Price × 100",
          "This estimate shows the basic annual yield without taking financing costs into account."
        ]}
      />

      <AdPlaceholder type="in-article" />

      <SEOFAQ title="ความรู้เกี่ยวกับการคำนวณ Rental Yield คอนโดมิเนียมเพื่อการลงทุน">
        <FAQItem 
          q="Rental Yield คืออะไร และสำคัญอย่างไรกับการลงทุนคอนโด?" 
          a="Rental Yield (อัตราผลตอบแทนจากการปล่อยเช่า) คือ อัตราส่วนร้อยละที่แสดงถึงรายได้จากค่าเช่าที่ได้รับจากอสังหาริมทรัพย์เมื่อเทียบกับราคาทุนที่ซื้อมา เครื่องมือนี้ช่วยให้นักลงทุนอสังหาริมทรัพย์สามารถเปรียบเทียบความคุ้มค่าของการลงทุนระหว่างโครงการคอนโดมิเนียมแต่ละแห่งได้อย่างเป็นธรรม ทำให้สามารถวิเคราะห์ได้ว่าการนำเงินไปซื้อห้องชุดนี้เพื่อปล่อยเช่าจะให้ผลตอบแทนคุ้มค่ากว่าการลงทุนในสินทรัพย์ประเภทอื่นหรือไม่ เช่น การฝากเงินในธนาคาร การซื้อพันธบัตรรัฐบาล หรือการซื้อหุ้นปันผล" 
        />
        <FAQItem 
          q="Gross Rental Yield กับ Net Rental Yield แตกต่างกันอย่างไร?" 
          a="Gross Rental Yield (อัตราผลตอบแทนขั้นต้น) จะคำนวณโดยใช้เพียงแค่รายได้ค่าเช่ารายปีทั้งหมดหารด้วยราคาซื้ออสังหาริมทรัพย์โดยไม่คำนึงถึงค่าใช้จ่ายใดๆ จึงเหมาะสำหรับการเปรียบเทียบในขั้นแรกที่รวดเร็ว ในขณะที่ Net Rental Yield (อัตราผลตอบแทนสุทธิ) จะมีความละเอียดและใกล้เคียงความเป็นจริงมากกว่า เนื่องจากจะนำรายได้ค่าเช่ารายปีไปหักลบกับค่าใช้จ่ายในการถือครองอสังหาริมทรัพย์นั้นๆ ก่อน เช่น ค่าส่วนกลางคอนโดรายปี ค่าประกันอัคคีภัย ค่าซ่อมแซมห้อง และค่าภาษีที่ดินและสิ่งปลูกสร้าง แล้วจึงนำผลลัพธ์สุทธิไปหารด้วยราคาซื้อ" 
        />
        <FAQItem 
          q="การปล่อยเช่าคอนโดในกรุงเทพฯ ควรได้ Rental Yield เท่าไรจึงจะเรียกว่าดี?" 
          a="โดยทั่วไปในพื้นที่กรุงเทพมหานครและปริมณฑล อัตราผลตอบแทนขั้นต้น (Gross Rental Yield) ของคอนโดมิเนียมมักจะอยู่ที่ประมาณ 4% ถึง 6% ต่อปี หากได้อัตราผลตอบแทนมากกว่า 6% ขึ้นไปจะถือว่าเป็นโครงการที่ให้ผลตอบแทนดีเยี่ยม (High Yield) ส่วนในพื้นที่ใจกลางเมืองธุรกิจ (CBD) เช่น สุขุมวิท สาทร สีลม อัตราผลตอบแทนอาจจะต่ำลงมาอยู่ที่ประมาณ 3% ถึง 4.5% เนื่องจากราคาซื้อขายของอสังหาริมทรัพย์สูงมาก แต่นักลงทุนมักยอมรับได้เนื่องจากโอกาสที่จะเกิดราคาอสังหาริมทรัพย์เติบโตขึ้นในอนาคต (Capital Gain) มีสูงกว่าพื้นที่รอบนอก" 
        />
        <FAQItem 
          q="มีปัจจัยใดบ้างที่ทำให้ค่า Rental Yield ที่คำนวณได้จริงต่ำกว่าเป้าหมาย?" 
          a="ปัจจัยหลักที่มักส่งผลกระทบต่อผลตอบแทนการปล่อยเช่าคือ 1) อัตราห้องว่าง (Vacancy Rate) คือการปล่อยเช่าไม่ได้เต็ม 12 เดือนต่อปี ซึ่งเป็นสาเหตุหลักที่ทำให้อัตราผลตอบแทนจริงตกลงอย่างน่าใจหาย 2) ค่าบำรุงรักษาและรีโนเวทห้องพัก เมื่อผู้เช่าคนเก่าย้ายออก ผู้เช่าใหม่อาจต้องการการทาสีใหม่ ซ่อมเฟอร์นิเจอร์ หรือล้างเครื่องปรับอากาศ 3) ค่าส่วนกลางคอนโดที่เพิ่มขึ้นตามมติของนิติบุคคล และ 4) ค่าธรรมเนียมเอเจนท์จัดหาผู้เช่า ซึ่งปกติมักคิดอัตราค่าบริการที่เท่ากับค่าเช่า 1 เดือนสำหรับสัญญาเช่าระยะเวลา 1 ปี" 
        />
        <FAQItem 
          q="จะสามารถเพิ่มอัตราผลตอบแทนการเช่า (Rental Yield) ได้อย่างไรบ้าง?" 
          a="แนวทางการเพิ่ม Rental Yield สามารถทำได้สองทางหลักคือ การลดต้นทุนและการเพิ่มราคาเช่า การลดต้นทุนสามารถทำได้โดยการต่อรองราคาซื้อห้องชุดตั้งแต่เริ่มต้น (เช่น การซื้อห้องมือสองสภาพดีที่มีการลดราคาลงมา หรือซื้อรอบ Investor ในราคาพรีเซล) ส่วนการเพิ่มค่าเช่าสามารถทำได้โดยการตกแต่งห้องให้น่าอยู่ มีสไตล์ที่โดดเด่น (Interior Styling) เพิ่มเครื่องใช้ไฟฟ้าที่อำนวยความสะดวกครบครัน เช่น เครื่องอบผ้า ไมโครเวฟประสิทธิภาพสูง และเครื่องกรองน้ำ หรือปรับเปลี่ยนรูปแบบการปล่อยเช่าเป็นแบบรายเดือนระยะสั้นร่วมกับแพลตฟอร์มต่างๆ เพื่อดึงดูดผู้เช่าชาวต่างชาติ" 
        />
      </SEOFAQ>
    </div>
  );
}

// ==========================================
// 2. CommercialCapRate (คำนวณ Cap Rate อสังหา)
// ==========================================
export function CommercialCapRate({ lang }: { lang: Lang }) {
  const [value, setValue] = useLocalState("cc_value", "");
  const [revenue, setRevenue] = useLocalState("cc_revenue", "");
  const [expense, setExpense] = useLocalState("cc_expense", "");

  const valNum = parseFloat(value) || 0;
  const revNum = parseFloat(revenue) || 0;
  const expNum = parseFloat(expense) || 0;

  const noi = revNum - expNum;
  const capRate = valNum > 0 ? (noi / valNum) * 100 : 0;

  return (
    <div id="commercial-cap-rate-calc" className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/10 dark:bg-blue-400/10 text-blue-500 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="18" x="3" y="3" rx="2"/><rect width="8" height="10" x="13" y="11" rx="2"/><path d="M9 9h.01"/><path d="M17 15h.01"/><path d="M9 13h.01"/><path d="M17 19h.01"/><path d="M9 17h.01"/></svg>
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            {lang === "TH" ? "คำนวณ Cap Rate อสังหาฯ เชิงพาณิชย์" : "Commercial Property Cap Rate Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "วิเคราะห์อัตราผลตอบแทนสินทรัพย์เชิงพาณิชย์ เช่น อาคารสำนักงาน ตึกแถว และหอพัก" : "Calculate capitalization rate for income-generating commercial real estate."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ราคาซื้อ / มูลค่าทรัพย์สินปัจจุบัน (บาท)" : "Property Purchase Price / Value (THB)"}</label>
            <NumericInput value={value} onChange={setValue} placeholder="เช่น 10,000,000" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "รายรับรวมทั้งหมดต่อปี (บาท)" : "Gross Annual Revenue (THB)"}</label>
            <NumericInput value={revenue} onChange={setRevenue} placeholder="เช่น 960,000" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าใช้จ่ายในการดำเนินงานต่อปี (บาท)" : "Annual Operating Expenses (THB)"}</label>
            <NumericInput value={expense} onChange={setExpense} placeholder="เช่น 180,000" />
          </div>
        </div>

        <div className="flex flex-col justify-between bg-gray-50/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{lang === "TH" ? "ผลการวิเคราะห์ Cap Rate" : "Cap Rate Analysis Results"}</h3>
            
            <div className="p-5 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 text-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Capitalization Rate (Cap Rate)</span>
              <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{capRate.toFixed(2)}%</span>
            </div>

            <div className="space-y-2 text-sm border-t border-gray-200 dark:border-white/10 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "รายได้สุทธิจากการดำเนินงาน (NOI):" : "Net Operating Income (NOI):"}</span>
                <span className="font-bold text-emerald-500">฿{noi.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "อัตราส่วนค่าใช้จ่ายต่อรายรับ:" : "Operating Expense Ratio:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {revNum > 0 ? ((expNum / revNum) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <ExportResult elementId="commercial-cap-rate-calc" fileName="commercial-cap-rate" lang={lang} />
          </div>
        </div>
      </div>

      <CalculationSteps 
        title={lang === "TH" ? "วิธีการคำนวณและขั้นตอนการหาค่า Cap Rate" : "Cap Rate Calculation Guide"}
        steps={lang === "TH" ? [
          "ขั้นตอนที่ 1: คำนวณหารายได้สุทธิจากการดำเนินงาน (Net Operating Income: NOI) = รายรับรวมต่อปี - ค่าใช้จ่ายดำเนินงานต่อปี (ไม่รวมยอดผ่อนส่งธนาคาร)",
          "ขั้นตอนที่ 2: คำนวณหา Cap Rate = (NOI ÷ มูลค่าหรือราคาซื้อทรัพย์สิน) × 100",
          "ค่าใช้จ่ายในการดำเนินงาน (Operating Expenses) ได้แก่ ค่าบำรุงรักษา, ค่าแม่บ้าน/คนดูแลตึก, ภาษีที่ดิน, ประกันภัยอาคาร และค่าน้ำไฟส่วนกลาง"
        ] : [
          "Step 1: Calculate Net Operating Income (NOI) = Gross Annual Revenue - Annual Operating Expenses (excluding mortgage debt service).",
          "Step 2: Calculate Capitalization Rate (Cap Rate) = (NOI ÷ Property Value) × 100",
          "Operating expenses include management fees, repairs, property taxes, insurance, and common utilities."
        ]}
      />

      <AdPlaceholder type="in-article" />

      <SEOFAQ title="แนวทางการลงทุนอสังหาฯ เชิงพาณิชย์และการประเมิน Cap Rate">
        <FAQItem 
          q="Capitalization Rate (Cap Rate) คืออะไร และแตกต่างจาก Rental Yield อย่างไร?" 
          a="Capitalization Rate หรืออัตราผลตอบแทนจากการลงทุนสะท้อนถึงผลตอบแทนทางการเงินที่อสังหาริมทรัพย์เชิงพาณิชย์จะสร้างขึ้นมาในระยะเวลาหนึ่งปีโดยใช้มูลค่าตลาดปัจจุบันเป็นเกณฑ์การเปรียบเทียบ จุดแตกต่างสำคัญกับ Rental Yield ทั่วไปคือ Cap Rate ถูกใช้สำหรับประเมินอาคารที่ก่อให้เกิดรายได้เชิงพาณิชย์ที่ซับซ้อน เช่น อาคารสำนักงานให้เช่า ห้างสรรพสินค้า โกดังสินค้า หรืออพาร์ตเมนต์ขนาดใหญ่ และเกณฑ์สำคัญคือตัวเลขค่าใช้จ่ายที่นำมาคิดจะต้องเป็น 'ค่าใช้จ่ายการดำเนินงานของสินทรัพย์' (Operating Expenses) จริงๆ และไม่คำนึงถึงโครงสร้างหนี้ (เช่น เงินกู้ หรือภาระดอกเบี้ยจ่ายส่วนบุคคล)" 
        />
        <FAQItem 
          q="ค่าใช้จ่ายดำเนินงานประเภทใดบ้างที่ต้องนำมาหักออกเพื่อให้ได้ NOI ที่ถูกต้อง?" 
          a="ค่าใช้จ่ายที่จะนำมาหักเพื่อหา Net Operating Income (NOI) จะต้องเกี่ยวข้องโดยตรงกับการทำงานและการรักษาเสถียรภาพของตัวทรัพย์สินเท่านั้น ได้แก่ ค่าประกันภัยอาคาร ค่าธรรมเนียมการจัดการและนิติบุคคล ค่าภาษีโรงเรือนและที่ดิน ค่าซ่อมแซมบำรุงรักษาระบบ (เช่น ลิฟต์ เครื่องปรับอากาศระบบใหญ่ สุขาภิบาล) ค่าบริการแม่บ้านและรักษาความปลอดภัย รวมถึงเงินสำรองเพื่อเปลี่ยนทดแทนอุปกรณ์ที่เสื่อมสภาพ (Capital Reserves) แต่สิ่งที่ 'ห้าม' นำมาคำนวณหักออกคือ ค่างวดผ่อนชำระหนี้กับธนาคาร (Debt Service) ภาษีเงินได้บุคคลธรรมดาของผู้ถือครอง และค่าเสื่อมราคาทางบัญชี (Depreciation)" 
        />
        <FAQItem 
          q="อัตรา Cap Rate ที่ดีสำหรับหอพักหรืออาคารพาณิชย์ในประเทศไทยควรเป็นเท่าไร?" 
          a="อัตรา Cap Rate ที่เหมาะสมจะแปรผันตามประเภทของอสังหาริมทรัพย์และระดับความเสี่ยงของทำเล โดยทั่วไปหอพักและอพาร์ตเมนต์ในไทยมักจะมีค่า Cap Rate คาดหวังเฉลี่ยอยู่ที่ 5% ถึง 7% ต่อปี สำหรับอาคารพาณิชย์หรือตึกแถวให้เช่าทำร้านสะดวกซื้ออาจจะอยู่ระหว่าง 4.5% ถึง 6% เนื่องจากมีความมั่นคงของผู้เช่าสูงกว่า ส่วนโกดังและโรงงานให้เช่า (Industrial Properties) มักจะมีอัตรา Cap Rate ที่สูงกว่า อยู่ที่ประมาณ 6.5% ถึง 9% ต่อปี เพื่อชดเชยกับความเสี่ยงในกรณีที่ผู้เช่าย้ายออกแล้วการหาผู้เช่าใหม่มาทดแทนทำได้ยากกว่าอาคารพาณิชย์ประเภทอื่นๆ" 
        />
        <FAQItem 
          q="ทำไมอสังหาริมทรัพย์ที่มีความเสี่ยงต่ำจึงมักจะมีอัตรา Cap Rate ที่ต่ำตามไปด้วย?" 
          a="ในทางการเงินและอสังหาริมทรัพย์ ความเสี่ยงกับผลตอบแทนเป็นของคู่กัน (Risk and Return) สินทรัพย์ที่ตั้งอยู่ในทำเลทองคำชั้นนำของประเทศ เช่น ตึกแถวสยามสแควร์ หรืออาคารสำนักงานระดับเกรด A ในย่านสาทร จะมีอัตราความเสี่ยงต่ำมากที่จะไม่มีผู้เช่า และมีสภาพคล่องสูงในการขายต่อ ทำให้ความเสี่ยงต่ำลง ส่งผลให้นักลงทุนส่วนใหญ่ยินดีที่จะยอมรับผลตอบแทนร้อยละที่ต่ำลง (Low Cap Rate) แต่ได้ความมั่นคงสูง ในทางตรงกันข้าม อสังหาริมทรัพย์ในเมืองท่องเที่ยวชายทะเลนอกฤดูกาล หรือโกดังในเขตพื้นที่ห่างไกล จะมีโอกาสห้องว่างสูง ทำให้นักลงทุนต้องการผลตอบแทนชดเชยความเสี่ยงในสัดส่วนที่สูงขึ้น (High Cap Rate)" 
        />
      </SEOFAQ>
    </div>
  );
}

// ==========================================
// 3. ValuationIncomeApproach (คำนวณมูลค่าอสังหา-income-approach)
// ==========================================
export function ValuationIncomeApproach({ lang }: { lang: Lang }) {
  const [noi, setNoi] = useLocalState("vi_noi", "");
  const [capRate, setCapRate] = useLocalState("vi_cap", "6");

  const noiVal = parseFloat(noi) || 0;
  const capVal = parseFloat(capRate) || 0;

  const estimatedValue = capVal > 0 ? noiVal / (capVal / 100) : 0;

  return (
    <div id="valuation-income-calc" className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-500/10 dark:bg-purple-400/10 text-purple-500 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            {lang === "TH" ? "คำนวณมูลค่าอสังหาฯ วิธีรายได้ (Income Approach)" : "Income Approach Property Valuation"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "ประเมินมูลค่าทรัพย์สินที่ก่อให้เกิดรายได้ตามหลักสากล" : "Estimate property value based on target yield and net operating income."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "รายได้สุทธิจากการดำเนินงานต่อปี (NOI) (บาท)" : "Net Operating Income per Year (THB)"}</label>
            <NumericInput value={noi} onChange={setNoi} placeholder="เช่น 600,000" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "อัตราผลตอบแทนคาดหวัง / อัตราคิดลด (Cap Rate) (%)" : "Target Yield / Cap Rate (%)"}</label>
            <input 
              type="number" 
              step="0.1" 
              value={capRate} 
              onChange={e => setCapRate(e.target.value)} 
              className={inputClass} 
              placeholder="เช่น 6.0" 
            />
          </div>
        </div>

        <div className="flex flex-col justify-between bg-gray-50/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="space-y-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-left">{lang === "TH" ? "มูลค่าประเมินที่ดินพร้อมสิ่งปลูกสร้าง" : "Estimated Valuation Result"}</h3>
            
            <div className="p-6 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">{lang === "TH" ? "มูลค่าทรัพย์สินตามเกณฑ์รายได้" : "Capitalized Property Value"}</span>
              <span className="text-3xl font-black text-purple-600 dark:text-purple-400">
                ฿{estimatedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              {lang === "TH" 
                ? "*สูตรนี้ใช้สำหรับการประเมินหามูลค่าทรัพย์สินที่เหมาะสมจากการคาดการณ์รายได้สุทธิประจำปีเท่านั้น"
                : "*This formula capitalizes the annual Net Operating Income into an estimated market value."}
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <ExportResult elementId="valuation-income-calc" fileName="property-valuation-income" lang={lang} />
          </div>
        </div>
      </div>

      <CalculationSteps 
        title={lang === "TH" ? "วิธีการคำนวณหามูลค่าอสังหาฯ ด้วยวิธีรายได้" : "Income Approach Valuation Steps"}
        steps={lang === "TH" ? [
          "สูตร: มูลค่าทรัพย์สินประเมิน = รายได้จากการดำเนินงานสุทธิต่อปี (NOI) ÷ อัตราผลตอบแทนเป้าหมาย (Cap Rate เป็นทศนิยม)",
          "ตัวอย่าง: หากโครงการตึกแถวให้เช่ามี NOI เท่ากับ 300,000 บาท/ปี และนักลงทุนคาดหวังอัตราผลตอบแทนจากการลงทุน 5% ต่อปี",
          "มูลค่าสินทรัพย์ที่เหมาะสมจะซื้อ = 300,000 ÷ 0.05 = 6,000,000 บาท"
        ] : [
          "Formula: Property Value = Net Operating Income (NOI) ÷ Cap Rate (as a decimal)",
          "Example: A commercial store brings in a yearly NOI of 300,000 THB. An investor expects a 5% capitalization rate.",
          "Estimated fair purchase value = 300,000 ÷ 0.05 = 6,000,000 THB."
        ]}
      />

      <AdPlaceholder type="in-article" />

      <SEOFAQ title="ข้อมูลเชิงลึกเกี่ยวกับการประเมินมูลค่าอสังหาริมทรัพย์ด้วยวิธีรายได้ (Income Approach)">
        <FAQItem 
          q="วิธีคิดแบบ Income Approach (หรือ Income Capitalization) คืออะไร?" 
          a="การประเมินมูลค่าทรัพย์สินด้วยวิธีรายได้ (Income Approach) คือ หนึ่งในสามวิธีมาตรฐานสากลในการประเมินมูลค่าอสังหาริมทรัพย์ วิธีนี้อิงหลักคิดสำคัญที่ว่า 'มูลค่าของสินทรัพย์ในปัจจุบันถูกกำหนดโดยผลประโยชน์และกระแสเงินสดที่สินทรัพย์นั้นจะสร้างขึ้นมาในอนาคต' วิธีการคำนวณนี้เป็นวิธีหลักที่ผู้ประเมินราคาอิสระ บริษัทหลักทรัพย์จัดการกองทุนรวมอสังหาริมทรัพย์ (REITs) และธนาคารพาณิชย์นำมาใช้เพื่อหาราคาตึกแถว อพาร์ตเมนต์ ออฟฟิศให้เช่า หรือโรงแรม เนื่องจากสินทรัพย์เหล่านี้ซื้อขายเพื่อวัตถุประสงค์ในการสร้างกระแสเงินสดมากกว่าการอยู่เอง" 
        />
        <FAQItem 
          q="เพราะเหตุใดเราจึงต้องใช้ Cap Rate ที่แตกต่างกันในการประเมินโครงการ?" 
          a="Cap Rate ทำหน้าที่เป็นทั้งอัตราคิดลดและตัวสะท้อนความเสี่ยงของทรัพย์สินและทำเล หากผู้เช่ามีความมั่นคงสูงมากและสัญญาเช่าระยะยาว (เช่น ธนาคารพาณิชย์ หรือร้านสะดวกซื้อแบรนด์ใหญ่) อัตรา Cap Rate ที่นำมาคิดจะต่ำลง (เช่น 4-5%) ซึ่งจะส่งผลให้มูลค่าประเมินของทรัพย์สินเพิ่มสูงขึ้น ในทางกลับกัน หากธุรกิจมีความไม่แน่นอนสูง ผู้เช่ามีการหมุนเวียนบ่อย อัตราคิดลดจะเพิ่มขึ้น (เช่น 8-10%) ส่งผลให้มูลค่าอสังหาริมทรัพย์ลดต่ำลงตามหลักความคุ้มค่าและความเสี่ยงของตัวนักลงทุนเอง" 
        />
        <FAQItem 
          q="วิธีคำนวณแบบตรงนี้ (Direct Capitalization) มีข้อจำกัดอย่างไรบ้าง?" 
          a="ข้อจำกัดหลักของวิธี Direct Capitalization คือ การสมมติว่ารายได้จากการดำเนินงานสุทธิ (NOI) จะมีค่าคงที่และสม่ำเสมอไปตลอดในอนาคต ซึ่งในโลกความเป็นจริง รายได้ค่าเช่าอาจเพิ่มขึ้นตามเงินเฟ้อหรือลดลงจากวิกฤตเศรษฐกิจ รวมถึงค่าใช้จ่ายอาจผันผวนอย่างไม่มีทิศทาง ดังนั้น หากเป็นสินทรัพย์ที่มีความซับซ้อนของโครงสร้างสัญญาเช่ามากๆ เช่น ห้างสรรพสินค้า นักประเมินราคาจะเปลี่ยนไปใช้วิธีคิดลดกระแสเงินสดขั้นสูง (Discounted Cash Flow: DCF) ซึ่งคิดกระแสเงินสดแยกเป็นรายปีตลอดช่วงเวลาถือครองโครงการแทน" 
        />
        <FAQItem 
          q="การปรับปรุงสิ่งปลูกสร้างส่งผลต่อมูลค่าอสังหาริมทรัพย์ด้วยวิธีรายได้อย่างไร?" 
          a="ในวิธีรายได้ การเพิ่มมูลค่าประเมินทำได้โดยการทำให้อัตรา NOI เพิ่มขึ้นหรือลดความเสี่ยงเพื่อให้ได้ Cap Rate ที่ดีขึ้น การปรับปรุงสภาพแวดล้อมหรือการติดโซลาร์รูฟเพื่อประหยัดไฟส่วนกลางของตึก จะทำให้รายจ่ายดำเนินงานลดลง ซึ่งช่วยดันตัวเลข NOI ให้สูงขึ้นโดยตรง หรือการรีโนเวทภายนอกตึกให้ดูทันสมัยขึ้นจะทำให้สามารถปรับอัตราค่าเช่าขึ้นได้ และดึงดูดผู้เช่าเกรดดีขึ้น ซึ่งทั้งหมดนี้จะส่งผลทำให้ราคาประเมินของสินทรัพย์ตามวิธีรายได้พุ่งสูงขึ้นอย่างชัดเจน" 
        />
      </SEOFAQ>
    </div>
  );
}

// ==========================================
// 4. ValuationCostApproach (คำนวณมูลค่าอสังหา-cost-approach)
// ==========================================
export function ValuationCostApproach({ lang }: { lang: Lang }) {
  const [landArea, setLandArea] = useLocalState("vc_land", "");
  const [landPrice, setLandPrice] = useLocalState("vc_price", "");
  const [buildArea, setBuildArea] = useLocalState("vc_build", "");
  const [buildCost, setBuildCost] = useLocalState("vc_cost", "");
  const [buildAge, setBuildAge] = useLocalState("vc_age", "");
  const [depRate, setDepRate] = useLocalState("vc_dep", "2");

  const lArea = parseFloat(landArea) || 0;
  const lPrice = parseFloat(landPrice) || 0;
  const bArea = parseFloat(buildArea) || 0;
  const bCost = parseFloat(buildCost) || 0;
  const bAge = parseFloat(buildAge) || 0;
  const dRate = parseFloat(depRate) || 0;

  const landValue = lArea * lPrice;
  const buildReplacementCost = bArea * bCost;
  const totalDepPercent = Math.min(100, bAge * dRate);
  const accumDepreciation = buildReplacementCost * (totalDepPercent / 100);
  const depreciatedBuildValue = buildReplacementCost - accumDepreciation;
  const totalValuation = landValue + depreciatedBuildValue;

  return (
    <div id="valuation-cost-calc" className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-amber-500/10 dark:bg-amber-400/10 text-amber-500 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            {lang === "TH" ? "คำนวณมูลค่าอสังหาฯ วิธีต้นทุน (Cost Approach)" : "Cost Approach Property Valuation"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "ประเมินมูลค่าบ้านและที่ดินด้วยหลักเกณฑ์ราคาประเมินและค่าเสื่อมอาคาร" : "Estimate property value using land value and depreciated building costs."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-white/10 pb-1">
            {lang === "TH" ? "ส่วนที่ 1: การประเมินมูลค่าที่ดิน" : "Part 1: Land Evaluation"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ขนาดที่ดิน (ตารางวา)" : "Land Area (Sq. Wah)"}</label>
              <NumericInput value={landArea} onChange={setLandArea} placeholder="เช่น 100" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ราคาประเมินที่ดิน/ตร.ว. (บาท)" : "Price per Sq. Wah (THB)"}</label>
              <NumericInput value={landPrice} onChange={setLandPrice} placeholder="เช่น 50,000" />
            </div>
          </div>

          <h3 className="text-base font-bold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-white/10 pb-1 pt-2">
            {lang === "TH" ? "ส่วนที่ 2: สิ่งปลูกสร้างและค่าเสื่อม" : "Part 2: Building & Depreciation"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "พื้นที่ใช้สอย (ตร.ม.)" : "Usage Area (sqm)"}</label>
              <NumericInput value={buildArea} onChange={setBuildArea} placeholder="เช่น 200" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าก่อสร้างใหม่/ตร.ม. (บาท)" : "Construction Cost/sqm"}</label>
              <NumericInput value={buildCost} onChange={setBuildCost} placeholder="เช่น 15,000" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "อายุสิ่งปลูกสร้าง (ปี)" : "Building Age (Years)"}</label>
              <NumericInput value={buildAge} onChange={setBuildAge} placeholder="เช่น 10" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "อัตราเสื่อมราคาต่อปี (%)" : "Annual Depr. Rate (%)"}</label>
              <input 
                type="number" 
                step="0.1" 
                value={depRate} 
                onChange={e => setDepRate(e.target.value)} 
                className={inputClass} 
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-gray-50/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{lang === "TH" ? "ผลการคำนวณมูลค่ารวม" : "Valuation Summary"}</h3>
            
            <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 text-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">{lang === "TH" ? "มูลค่าอสังหาริมทรัพย์รวมสุทธิ" : "Total Estimated Property Value"}</span>
              <span className="text-3xl font-black text-amber-500">฿{totalValuation.toLocaleString()}</span>
            </div>

            <div className="space-y-2 text-sm pt-2">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "มูลค่าที่ดินเปล่า:" : "Land Value:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">฿{landValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "มูลค่าสิ่งปลูกสร้างสร้างใหม่:" : "Building Replacement Cost:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">฿{buildReplacementCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "ค่าเสื่อมราคาสะสม:" : "Accumulated Depreciation:"}</span>
                <span className="font-bold text-red-500">- ฿{accumDepreciation.toLocaleString()} ({totalDepPercent.toFixed(0)}%)</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-white/10 pt-2">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "มูลค่าอาคารหลังหักค่าเสื่อม:" : "Depreciated Building Value:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">฿{depreciatedBuildValue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <ExportResult elementId="valuation-cost-calc" fileName="property-valuation-cost" lang={lang} />
          </div>
        </div>
      </div>

      <CalculationSteps 
        title={lang === "TH" ? "สูตรและทฤษฎีประเมินอสังหาฯ วิธีต้นทุน" : "Cost Approach Valuation Formula"}
        steps={lang === "TH" ? [
          "ขั้นตอนที่ 1: คำนวณมูลค่าที่ดิน = ขนาดที่ดิน (ตารางวา) × ราคาตลาดหรือประเมินต่อตารางวา",
          "ขั้นตอนที่ 2: คำนวณมูลค่าก่อสร้างทดแทนใหม่ = พื้นที่ใช้สอย (ตร.ม.) × ค่าวัสดุก่อสร้างและค่าแรงต่อ ตร.ม.",
          "ขั้นตอนที่ 3: คำนวณค่าเสื่อมสะสม = อายุอาคาร × เปอร์เซ็นต์ค่าเสื่อมรายปี (ปกติบ้านเดี่ยว/ปูน คิดที่ 1% - 3% ต่อปี)",
          "ขั้นตอนที่ 4: มูลค่าทรัพย์สินรวม = มูลค่าที่ดิน + (มูลค่าก่อสร้างทดแทนใหม่ - ค่าเสื่อมสะสม)"
        ] : [
          "Step 1: Calculate Land Value = Land Area (Sq. Wah) × Price per Sq. Wah.",
          "Step 2: Calculate Building Replacement Cost = Building Usage Area (sqm) × Construction Cost per sqm.",
          "Step 3: Calculate Accumulated Depreciation = Building Age × Depreciation rate (usually 1% - 3% per year).",
          "Step 4: Total Property Value = Land Value + (Building Replacement Cost - Accumulated Depreciation)."
        ]}
      />

      <AdPlaceholder type="in-article" />

      <SEOFAQ title="คู่มือความรู้การประเมินราคาบ้านด้วยวิธีต้นทุน (Cost Approach)">
        <FAQItem 
          q="วิธีประเมินแบบ Cost Approach คืออะไร และมักใช้กับอสังหาฯ ประเภทใด?" 
          a="การประเมินราคาด้วยวิธีคิดจากต้นทุน (Cost Approach) คือ วิธีการหาค่าอสังหาริมทรัพย์โดยประเมินแยกชิ้นส่วนกันระหว่าง มูลค่าของที่ดินเปล่า กับมูลค่าสิ่งปลูกสร้าง แล้วนำมารวมกัน โดยหลักการสำคัญมีอยู่ว่า 'ผู้ซื้อที่รอบคอบจะไม่ยอมจ่ายเงินเพื่อซื้ออสังหาริมทรัพย์นั้นในราคาที่สูงกว่าราคาซื้อที่ดินเปล่าและก่อสร้างอาคารที่มีลักษณะเดียวกันขึ้นมาทดแทนใหม่' วิธีนี้มักถูกนำมาใช้งานกับสินทรัพย์ที่ไม่มีการซื้อขายเปลี่ยนมือในตลาดบ่อยนัก หรือทรัพย์สินเฉพาะทาง เช่น บ้านเดี่ยวสร้างเองบนที่ดินส่วนบุคคล โรงงานอุตสาหกรรม คลังสินค้า วัด โรงเรียน หรือสถานีบริการน้ำมัน" 
        />
        <FAQItem 
          q="การคำนวณหามูลค่าที่ดินเปล่าในวิธีนี้อิงเกณฑ์จากอะไรเป็นสำคัญ?" 
          a="ในขั้นตอนการหาค่าที่ดินเปล่า นักประเมินจะไม่ได้ใช้ต้นทุนการซื้อที่ดินในอดีต แต่จะใช้วิธี 'เปรียบเทียบตลาด' (Market Comparison Approach) โดยดูว่าในปัจจุบันที่ดินเปล่าในทำเลใกล้เคียงกันที่คล้ายคลึงกัน มีการประกาศซื้อขายจริงหรือถูกประเมินโดยกรมธนารักษ์อยู่ที่เท่าใด เพื่อนำมาเป็นฐานตัวเลขราคาเฉลี่ยต่อตารางวา จากนั้นจึงนำมาคูณกับเนื้อที่ดินทั้งหมดตามโฉนดจริงเพื่อให้ได้มูลค่าที่ดินดิบ" 
        />
        <FAQItem 
          q="การหาค่าเสื่อมราคาสิ่งปลูกสร้างคิดอย่างไร และอัตราร้อยละเท่าใดที่นิยมใช้?" 
          a="ค่าเสื่อมราคาสิ่งปลูกสร้าง (Depreciation) ตามมาตรฐานของสมาคมผู้ประเมินค่าทรัพย์สินแห่งประเทศไทย จะถูกวิเคราะห์จากความเสื่อมสภาพทางกายภาพ (Physical Deterioration) ตามอายุขัยการใช้งานของวัสดุ โดยทั่วไปอาคารประเภทโครงสร้างคอนกรีตเสริมเหล็ก (ค.ส.ล.) จะถูกประเมินให้อายุการใช้งานเศรษฐกิจอยู่ที่ประมาณ 30-50 ปี ทำให้อัตราเสื่อมราคาวิ่งอยู่ที่ราวๆ 2% ถึง 3% ต่อปี ส่วนอาคารกึ่งไม้กึ่งปูนอาจจะคิดค่าเสื่อมสูงถึง 3-5% ต่อปี อย่างไรก็ตาม มูลค่าซากที่เหลือมักจะไม่ลดลงต่ำไปกว่า 10% ของมูลค่าก่อสร้างใหม่ทั้งหมด แม้อาคารจะมีอายุเกิน 50 ปีแล้วก็ตาม" 
        />
        <FAQItem 
          q="เพราะเหตุใดวิธี Cost Approach จึงอาจไม่สะท้อนราคาตลาดจริงในย่านธุรกิจ?" 
          a="สาเหตุสำคัญที่วิธีต้นทุนไม่ตรงกับราคาตลาดในย่านธุรกิจสำคัญ (CBD) เป็นเพราะ 'ค่าความต้องการและทำเล' (Locational Obsolescence) ย่านเมืองหลวงที่มีความเจริญหนาแน่นสูง มูลค่าของอสังหาริมทรัพย์จะพุ่งเกินกว่าต้นทุนวัสดุและที่ดินเปล่าไปมากเนื่องจากความสะดวกสบายและการเข้าถึงกลุ่มลูกค้า ดังนั้น หากนำวิธีต้นทุนไปประเมินตึกเก่าในย่านสยามสแควร์ มูลค่าที่คำนวณได้อาจจะต่ำกว่าราคาซื้อขายในตลาดจริงไปหลายเท่าตัว เพราะที่นั่นผู้ซื้อยินดีจ่ายตามกระแสรายได้ที่จะเกิดขึ้น (Income Approach) หรือจ่ายตามดีมานด์การประมูลแข่งกันในตลาด" 
        />
      </SEOFAQ>
    </div>
  );
}

// ==========================================
// 5. HouseFlippingROI (คำนวณกำไร-flip-บ้าน)
// ==========================================
export function HouseFlippingROI({ lang }: { lang: Lang }) {
  const [buyPrice, setBuyPrice] = useLocalState("hf_buy", "");
  const [reno, setReno] = useLocalState("hf_reno", "");
  const [hold, setHold] = useLocalState("hf_hold", "");
  const [buyFee, setBuyFee] = useLocalState("hf_buyfee", "");
  const [sellPrice, setSellPrice] = useLocalState("hf_sell", "");
  const [sellFee, setSellFee] = useLocalState("hf_sellfee", "");

  const bNum = parseFloat(buyPrice) || 0;
  const rNum = parseFloat(reno) || 0;
  const hNum = parseFloat(hold) || 0;
  const bfNum = parseFloat(buyFee) || 0;
  const sNum = parseFloat(sellPrice) || 0;
  const sfNum = parseFloat(sellFee) || 0;

  const totalCost = bNum + rNum + hNum + bfNum;
  const netProfit = sNum - totalCost - sfNum;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  return (
    <div id="house-flipping-calc" className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-500 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-7a3 3 0 0 0-3-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5g"/><path d="M18 10h-6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6Z"/><path d="M17 2h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4Z"/><path d="M13 6h.01"/><path d="m14 18 3-3 3 3"/></svg>
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            {lang === "TH" ? "คำนวณกำไรและ ROI ฟลิปบ้าน/คอนโด" : "House Flipping ROI Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "วิเคราะห์ต้นทุนการซื้อปรับปรุง และเปอร์เซ็นต์กำไรจากการขายต่ออสังหาฯ" : "Analyze buying, renovating, holding costs and flipping ROI."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-white/10 pb-1">
            {lang === "TH" ? "ต้นทุนซื้อและการปรับปรุง" : "Purchase & Rehab Costs"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ราคาซื้อทรัพย์ (บาท)" : "Acquisition Price"}</label>
              <NumericInput value={buyPrice} onChange={setBuyPrice} placeholder="เช่น 2,000,000" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าโอนวันซื้อ (บาท)" : "Buying Fees (THB)"}</label>
              <NumericInput value={buyFee} onChange={setBuyFee} placeholder="เช่น 40,000" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "งบรีโนเวทห้อง/บ้าน (บาท)" : "Renovation Cost (THB)"}</label>
              <NumericInput value={reno} onChange={setReno} placeholder="เช่น 300,000" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าถือครองสะสม (บาท)" : "Holding Costs (THB)"}</label>
              <NumericInput value={hold} onChange={setHold} placeholder="เช่น 20,000" />
            </div>
          </div>

          <h3 className="text-base font-bold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-white/10 pb-1 pt-2">
            {lang === "TH" ? "รายรับและรายจ่ายวันขาย" : "Sales Revenue & Expenses"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ราคาขายเป้าหมาย (บาท)" : "Selling Price (THB)"}</label>
              <NumericInput value={sellPrice} onChange={setSellPrice} placeholder="เช่น 2,800,000" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ภาษีและค่าโอนวันขาย (บาท)" : "Selling Fees & Taxes"}</label>
              <NumericInput value={sellFee} onChange={setSellFee} placeholder="เช่น 110,000" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-gray-50/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{lang === "TH" ? "บทสรุปโครงการ Flipping" : "Flipping Project Summary"}</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 text-center">
                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">{lang === "TH" ? "กำไรสุทธิคาดการณ์" : "Net Profit"}</span>
                <span className="text-2xl font-black text-emerald-500">฿{netProfit.toLocaleString()}</span>
              </div>
              <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 text-center">
                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Return on Investment</span>
                <span className="text-2xl font-black text-blue-500">{roi.toFixed(2)}%</span>
              </div>
            </div>

            <div className="space-y-2 text-sm border-t border-gray-200 dark:border-white/10 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "ราคาทรัพย์สินรวมค่าใช้จ่ายเบื้องต้น:" : "Total Acq. Cost:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">฿{totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "ราคาขายสุทธิหลังหักค่าธรรมเนียม:" : "Net Sale Price:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">฿{(sNum - sfNum).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-white/10 pt-2 font-bold text-base">
                <span className="text-gray-900 dark:text-white">{lang === "TH" ? "ผลตอบแทนรวมเฉลี่ย:" : "Overall Return:"}</span>
                <span className={netProfit >= 0 ? "text-emerald-500" : "text-red-500"}>
                  ฿{netProfit.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <ExportResult elementId="house-flipping-calc" fileName="house-flipping-roi" lang={lang} />
          </div>
        </div>
      </div>

      <CalculationSteps 
        title={lang === "TH" ? "การวางแผนคำนวณกำไรจากการฟลิปบ้าน" : "Flipping ROI Calculations"}
        steps={lang === "TH" ? [
          "ต้นทุนรวมทั้งหมด = ราคาซื้อทรัพย์ + ค่าธรรมเนียมซื้อ + ค่าใช้จ่ายปรับปรุง/รีโนเวท + ค่าใช้จ่ายการถือครอง (ดอกเบี้ยจ่าย น้ำ ไฟ)",
          "กำไรสุทธิ = ราคาขายสุทธิ - ต้นทุนรวมทั้งหมด - ภาษีและค่าใช้จ่ายวันขาย (ภาษีธุรกิจเฉพาะและค่านายหน้า)",
          "Return on Investment (ROI %) = (กำไรสุทธิ ÷ ต้นทุนรวมทั้งหมด) × 100"
        ] : [
          "Total Cost = Purchase Price + Acquisition Fee + Renovation Costs + Holding Costs (interest, utilities).",
          "Net Profit = Sale Price - Total Cost - Selling Expenses (taxes, agent commission).",
          "ROI % = (Net Profit ÷ Total Cost) × 100."
        ]}
      />

      <AdPlaceholder type="in-article" />

      <SEOFAQ title="กลยุทธ์การคำนวณและบริหารกำไรจากการฟลิปบ้าน (House Flipping)">
        <FAQItem 
          q="House Flipping คืออะไร และการคำนวณต้นทุนแฝงสำคัญอย่างไร?" 
          a="House Flipping (การฟลิปบ้าน) คือ รูปแบบธุรกิจการลงทุนในอสังหาริมทรัพย์ทางเลือกหนึ่ง โดยเป็นการซื้อบ้านเก่าหรืออสังหาริมทรัพย์ที่มีราคาต่ำกว่าตลาด นำมารีโนเวท ปรับปรุง ซ่อมแซม ตกแต่งใหม่ เพื่อนำไปเสนอขายต่อในราคาตลาดที่สมเหตุสมผลภายในระยะเวลาอันสั้น (ปกติไม่เกิน 6-12 เดือน) ความท้าทายหลักที่นักลงทุนหน้าใหม่มักทำผิดพลาดคือ การไม่นำต้นทุนแฝง เช่น ค่าจดจำนองธนาคาร ค่าใช้จ่ายถือครอง (Holding Costs) เช่น ดอกเบี้ยจ่ายธนาคารระหว่างปิดซ่อม ค่าน้ำค่าไฟรายเดือน และที่สำคัญที่สุดคือภาษีธุรกิจเฉพาะ 3.3% มาร่วมคำนวณ ทำให้ในบั้นปลายกำไรที่คาดคิดลดน้อยถอยลง" 
        />
        <FAQItem 
          q="กฎ 70% (70% Rule) ที่นักฟลิปบ้านนิยมใช้กันคืออะไร?" 
          a="กฎ 70% คือแนวทางการซื้อทรัพย์ขั้นต้นที่นักฟลิปบ้านมืออาชีพระดับสากลนิยมนำมาวิเคราะห์ความเสี่ยง กฎนี้ระบุว่า 'ราคาซื้อทรัพย์ที่ต่ำที่สุดที่คุณควรตัดสินใจจ่าย จะต้องไม่เกิน 70% ของมูลค่าทรัพย์หลังการรีโนเวทเสร็จสมบูรณ์แล้ว (After Repair Value: ARV) หักออกด้วยต้นทุนการรีโนเวทปรับปรุงทั้งหมด' เช่น หากคุณคิดว่าบ้านนี้ปรับปรุงแล้วจะขายได้ 3 ล้านบาท และต้องใช้งบซ่อมแซม 4 แสนบาท ราคาซื้อเข้าสูงสุดที่คุณยอมจ่ายได้คือ (3,000,000 * 0.70) - 400,000 = 1,700,000 บาท เพื่อสร้างหลักประกันด้านความปลอดภัยของกำไร" 
        />
        <FAQItem 
          q="งบรีโนเวทส่วนใหญ่สำหรับคอนโดและบ้านควรอยู่ที่ประมาณเท่าไร?" 
          a="งบประมาณการรีโนเวทขึ้นอยู่กับระดับการปรับปรุงและกลุ่มเป้าหมายผู้ซื้อ สำหรับห้องชุดคอนโดมิเนียมขนาด 30 ตร.ม. การรีโนเวทงานสถาปัตยกรรมภายในแบบทั่วไป (ขัดพื้น ทาสี ติดเฟอร์นิเจอร์ลอยตัว เปลี่ยนก๊อกน้ำ สุขภัณฑ์) มักมีต้นทุนอยู่ที่ประมาณ 100,000 - 250,000 บาท สำหรับบ้านทาวน์โฮมสองชั้น อาจต้องเตรียมไว้ประมาณ 300,000 - 600,000 บาท เพราะอาจมีส่วนต่อเติมครัวหลังบ้านและปรับปรุงทางเข้าหลัก นักฟลิปบ้านที่ดีจะกันงบประมาณสำรองเผื่อข้อผิดพลาดทางเทคนิค (Contingency Fund) ไว้เสมออย่างน้อย 15% ของงบก่อสร้างหลัก" 
        />
        <FAQItem 
          q="ความเสี่ยงหลักของการฟลิปอสังหาริมทรัพย์มีอะไรบ้าง?" 
          a="ความเสี่ยงหลัก 3 ประการในการฟลิปอสังหาฯ คือ 1) งบบานปลายในการซ่อมแซม (Renovation Cost Overruns) ที่เกิดจากการประเมินโครงสร้างบ้านเก่าผิดพลาด 2) ระยะเวลาการขายที่ยาวนานเกินคาด (Holding Time Risks) ส่งผลให้ดอกเบี้ยเงินกู้กินกำไรสะสมไปเรื่อยๆ และ 3) ตลาดชะลอตัวทำให้ราคาขายสุดท้ายตกลงต่ำกว่า ARV ที่ตั้งเป้าไว้ นักลงทุนจึงต้องวิเคราะห์ดีมานด์และราคาปิดการขายเฉลี่ยย้อนหลังของตลาดจริงในพื้นที่นั้นอย่างถี่ถ้วนก่อนวางมัดจำเงินก้อน" 
        />
      </SEOFAQ>
    </div>
  );
}

// ==========================================
// 6. AirbnbProfitEstimator (คำนวณกำไร-airbnb)
// ==========================================
export function AirbnbProfitEstimator({ lang }: { lang: Lang }) {
  const [dailyRate, setDailyRate] = useLocalState("ab_daily", "");
  const [occupancy, setOccupancy] = useLocalState("ab_occ", "50");
  const [rent, setRent] = useLocalState("ab_rent", "");
  const [platformFee, setPlatformFee] = useLocalState("ab_fee", "3");
  const [cleaning, setCleaning] = useLocalState("ab_clean", "");
  const [bookings, setBookings] = useLocalState("ab_books", "");
  const [utilities, setUtilities] = useLocalState("ab_util", "");
  const [supplies, setSupplies] = useLocalState("ab_supply", "");

  const drVal = parseFloat(dailyRate) || 0;
  const occVal = parseFloat(occupancy) || 0;
  const rentVal = parseFloat(rent) || 0;
  const pfVal = parseFloat(platformFee) || 0;
  const clVal = parseFloat(cleaning) || 0;
  const bkVal = parseFloat(bookings) || 0;
  const utVal = parseFloat(utilities) || 0;
  const spVal = parseFloat(supplies) || 0;

  const daysBooked = 30 * (occVal / 100);
  const roomRev = drVal * daysBooked;
  const cleaningRev = clVal * bkVal;
  const totalRev = roomRev + cleaningRev;

  const pfCost = roomRev * (pfVal / 100);
  const cleaningExpense = clVal * bkVal; 
  const totalExpenses = rentVal + pfCost + cleaningExpense + utVal + spVal;

  const netMonthlyProfit = totalRev - totalExpenses;
  const annualized = netMonthlyProfit * 12;

  return (
    <div id="airbnb-profit-calc" className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-rose-500/10 dark:bg-rose-400/10 text-rose-500 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3Z"/></svg>
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            {lang === "TH" ? "คำนวณกำไรโฮมสเตย์ Airbnb" : "Airbnb & Short-Term Rental Profit Estimator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "ประมาณการรายรับรายวันและค่าธรรมเนียมในการจัดการโฮมสเตย์" : "Estimate occupancy, daily rate, Airbnb fees, and net monthly profits."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-white/10 pb-1">
            {lang === "TH" ? "ตั้งค่ารายรับและจองพัก" : "Revenue & Booking Settings"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ราคาเฉลี่ยต่อคืน (บาท)" : "Daily Rate (THB)"}</label>
              <NumericInput value={dailyRate} onChange={setDailyRate} placeholder="เช่น 1,500" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "อัตราการเข้าพัก (%)" : "Occupancy Rate (%)"}</label>
              <input type="number" value={occupancy} onChange={e => setOccupancy(e.target.value)} min="0" max="100" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าทำความสะอาด" : "Cleaning Fee"}</label>
              <NumericInput value={cleaning} onChange={setCleaning} placeholder="เช่น 400" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "จำนวนบุ๊คกิ้ง/เดือน" : "Bookings/Month"}</label>
              <NumericInput value={bookings} onChange={setBookings} placeholder="เช่น 8" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าตงแพลตฟอร์ม (%)" : "Host Fee (%)"}</label>
              <input type="number" value={platformFee} onChange={e => setPlatformFee(e.target.value)} className={inputClass} />
            </div>
          </div>

          <h3 className="text-base font-bold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-white/10 pb-1 pt-2">
            {lang === "TH" ? "ค่าใช้จ่ายคงที่และการดำเนินงาน" : "Fixed & Operational Expenses"}
          </h3>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าเช่าห้องพักหรือค่าผ่อนธนาคารต่อเดือน (บาท)" : "Monthly Rent / Mortgage (THB)"}</label>
            <NumericInput value={rent} onChange={setRent} placeholder="เช่น 12,000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าน้ำ-ไฟ-อินเทอร์เน็ต (บาท)" : "Utilities & Wifi (THB)"}</label>
              <NumericInput value={utilities} onChange={setUtilities} placeholder="เช่น 4,000" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าของใช้และกาแฟห้องพัก (บาท)" : "Toiletries & Supplies (THB)"}</label>
              <NumericInput value={supplies} onChange={setSupplies} placeholder="เช่น 1,500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-gray-50/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{lang === "TH" ? "ประมาณการรายรับรายปี" : "Income Forecast"}</h3>
            
            <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 text-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">{lang === "TH" ? "กำไรสุทธิต่อเดือน" : "Net Monthly Profit"}</span>
              <span className={`text-2xl font-black ${netMonthlyProfit >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                ฿{netMonthlyProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "รายได้ค่าห้องรวมต่อเดือน:" : "Monthly Room revenue:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">฿{roomRev.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "ค่าธรรมเนียมแพลตฟอร์มรายเดือน:" : "Monthly Service Fee:"}</span>
                <span className="font-bold text-red-500">-฿{pfCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "ประมาณการจองเฉลี่ย:" : "Estimated Booked Days:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">{daysBooked.toFixed(0)} {lang === "TH" ? "วัน" : "days"}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-white/10 pt-2 font-bold text-base">
                <span className="text-gray-900 dark:text-white">{lang === "TH" ? "กำไรสุทธิโดยประมาณต่อปี:" : "Annualized Net Profit:"}</span>
                <span className="text-emerald-500">฿{annualized.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <ExportResult elementId="airbnb-profit-calc" fileName="airbnb-profit-estimator" lang={lang} />
          </div>
        </div>
      </div>

      <CalculationSteps 
        title={lang === "TH" ? "ทฤษฎีการคำนวณและหาจุดคุ้มทุน Airbnb" : "Airbnb Profit Formulation"}
        steps={lang === "TH" ? [
          "จำนวนวันที่มีผู้เช่าต่อเดือน = 30 วัน × อัตราการเข้าพัก (%)",
          "รายได้รวมประจำเดือน = (ค่าเช่าห้องต่อคืน × จำนวนวันมีผู้เช่า) + (ค่าบริการทำความสะอาดต่อครั้ง × จำนวนการจอง)",
          "ค่าธรรมเนียมโฮสต์ = รายได้ค่าห้องพัก × เปอร์เซ็นต์หักของแพลตฟอร์ม (มาตรฐาน Airbnb คิดที่ 3%)",
          "รายจ่ายทั้งหมด = ค่าเช่า/ค่าผ่อนตึก + ค่าธรรมเนียมโฮสต์ + ค่าน้ำไฟและเน็ต + ค่าของใช้เพิ่มเติม + ค่าจ้างคนทำความสะอาด",
          "กำไรสุทธิ = รายได้รวมทั้งหมด - รายจ่ายทั้งหมด"
        ] : [
          "Booked Days = 30 days × Occupancy Rate (%).",
          "Total Revenue = (Daily Room Rate × Booked Days) + (Cleaning Fee × Number of bookings).",
          "Platform Host Fee = Room revenue × Airbnb commission % (generally 3%).",
          "Total Expenses = Monthly rent/mortgage + Host fee + Utilities & Wifi + supplies + Cleaning service costs.",
          "Net Profit = Total Revenue - Total Expenses."
        ]}
      />

      <AdPlaceholder type="in-article" />

      <SEOFAQ title="ประเด็นสำคัญทางกฎหมายและการบริหารที่พักแบบปล่อยเช่ารายวัน (Airbnb) ในไทย">
        <FAQItem 
          q="การปล่อยเช่าคอนโดมิเนียมและบ้านพักรายวันผ่าน Airbnb ในประเทศไทยถูกกฎหมายหรือไม่?" 
          a="ภายใต้พระราชบัญญัติโรงแรม พ.ศ. 2547 การปล่อยเช่าสถานที่พักอาศัยรายวันที่มีระยะเวลาเช่าน้อยกว่า 30 วัน ถือว่าเข้าข่ายธุรกิจโรงแรม ซึ่งกฎหมายกำหนดให้ผู้ที่จะให้บริการต้องมีใบอนุญาตประกอบธุรกิจโรงแรม อย่างไรก็ดี ตามกฎกระทรวงฉบับใหม่ สถานที่พักอาศัยที่มีห้องพักรวมกันไม่เกิน 4 ห้อง และรองรับผู้เข้าพักได้รวมกันไม่เกิน 20 คน ซึ่งจดทะเบียนเป็น 'สถานที่พักที่ไม่เป็นโรงแรม' (Homestay/ที่พักสัมผัสวัฒนธรรม) จะได้รับการยกเว้นจากการขอใบอนุญาตโรงแรม แต่สำหรับผู้ปล่อยเช่าห้องชุดคอนโดมิเนียม ศาลฎีกาเคยมีคำพิพากษาว่าไม่สามารถปล่อยเช่ารายวันได้หากขัดต่อกฎระเบียบของนิติบุคคลอาคารชุดนั้นๆ เนื่องจากรบกวนความเป็นอยู่ของเจ้าของร่วมคนอื่นๆ" 
        />
        <FAQItem 
          q="ควรจะบริหารตั้งค่าบริการทำความสะอาด (Cleaning Fee) อย่างไรให้ไม่เสียเปรียบ?" 
          a="ค่าทำความสะอาด (Cleaning Fee) เป็นหนึ่งในเครื่องมือทางการตลาดที่สามารถช่วยควบคุมพฤติกรรมผู้เข้าพักได้ ค่าธรรมเนียมนี้ควรคิดคำนวณตามต้นทุนจริงในการว่าจ้างแม่บ้านหรือค่าทำความสะอาดด้วยตนเอง (รวมค่าซักผ้าปูที่นอน) ข้อดีของการแยกค่าทำความสะอาดออกจากค่าห้องพักคือ จะช่วยจูงใจให้ผู้เช่าเลือกจองพักระยะยาวหลายๆ คืนมากขึ้น เนื่องจากเมื่อหารเฉลี่ยค่าทำความสะอาดเป็นรายคืนแล้ว ค่าบริการทั้งหมดต่อคืนจะถูกลงอย่างเห็นได้ชัดเมื่อเทียบกับการจองเพียงคืนเดียว" 
        />
        <FAQItem 
          q="จะเพิ่มอัตราการเข้าพัก (Occupancy Rate) ในช่วงนอกฤดูกาลท่องเที่ยว (Low Season) ได้อย่างไร?" 
          a="กลยุทธ์หลักในการดึงดูดผู้เช่าช่วงมรสุมหรือช่วงนอกเทศกาลคือ 1) การตั้งค่าราคาแบบยืดหยุ่น (Dynamic Pricing) ซึ่งจะปรับค่าห้องลดลงโดยอัตโนมัติเพื่อให้ได้ความสามารถในการแข่งขัน 2) การกำหนดระยะเวลาขั้นต่ำในการเข้าพักเพิ่มขึ้นเป็น 3-5 คืน เพื่อแลกกับส่วนลดพิเศษ 3) การปรับเปลี่ยนหัวเรื่องและคำอธิบายให้น่าสนใจดึงดูดกลุ่มนักท่องเที่ยวที่เดินทางมาทำงานระยะไกล (Digital Nomads) ซึ่งไม่เน้นท่องเที่ยวชายหาดแต่เน้นการใช้อินเทอร์เน็ตที่เสถียรและบรรยากาศห้องพักที่เหมาะกับการทำงาน" 
        />
        <FAQItem 
          q="ค่าน้ำและค่าไฟฟ้าสำหรับที่พักปล่อยเช่ารายวันเฉลี่ยแล้วสูงกว่าที่อยู่อาศัยทั่วไปอย่างไร?" 
          a="เนื่องจากผู้เข้าพักที่ท่องเที่ยวหรือมาพักผ่อนมักจะเปิดเครื่องปรับอากาศทิ้งไว้ตลอดทั้งวันและปรับอุณหภูมิค่อนข้างต่ำ จากสถิติพบว่า อัตราการใช้ไฟฟ้าในห้องเช่ารายวันรายเที่ยวจะสูงกว่าปริมาณการใช้งานของคนไทยทั่วไปที่อยู่เองถึง 40% ถึง 70% ในช่วงฤดูร้อน นักลงทุนอสังหาฯ จึงแนะนำให้เลือกใช้เครื่องปรับอากาศประหยัดไฟเบอร์ 5 ระดับอินเวอร์เตอร์ (Inverter) รุ่นท็อป และติดตั้งระบบควบคุมไฟฟ้าในห้องโดยใช้คีย์การ์ด (Keycard Power Switch) หรือเครื่องเซนเซอร์ปิดแอร์อัตโนมัติเมื่อตรวจไม่พบความเคลื่อนไหวในห้องพัก" 
        />
      </SEOFAQ>
    </div>
  );
}

// ==========================================
// 7. PropertyTaxesNew (คำนวณภาษีที่ดินและธุรกิจเฉพาะ)
// ==========================================
export function PropertyTaxesNew({ lang }: { lang: Lang }) {
  const [price, setPrice] = useLocalState("pt_price", "");
  const [appraised, setAppraised] = useLocalState("pt_appraised", "");
  const [years, setYears] = useLocalState("pt_years", "1");
  const [registered, setRegistered] = useState(false);

  const priceNum = parseFloat(price) || 0;
  const appraisedNum = parseFloat(appraised) || 0;
  const yearsNum = parseInt(years) || 1;

  // 1. Transfer Fee (2% of Appraised Value)
  const transferFee = appraisedNum * 0.02;

  // 2. SBT vs Stamp Duty
  // SBT is 3.3% of the higher of sale price or appraised value. Applied if held < 5 years, unless in household registration for >= 1 year.
  const isSbtApplicable = yearsNum < 5 && !registered;
  const baseValue = Math.max(priceNum, appraisedNum);
  const sbt = isSbtApplicable ? baseValue * 0.033 : 0;
  const stampDuty = !isSbtApplicable ? baseValue * 0.005 : 0;

  // 3. Withholding Income Tax (WHT)
  // Appraised value is divided by years of ownership after applying a standard deduction
  // Deduction Table
  let deductionPct = 0.50;
  if (yearsNum === 1) deductionPct = 0.92;
  else if (yearsNum === 2) deductionPct = 0.84;
  else if (yearsNum === 3) deductionPct = 0.77;
  else if (yearsNum === 4) deductionPct = 0.71;
  else if (yearsNum === 5) deductionPct = 0.65;
  else if (yearsNum === 6) deductionPct = 0.60;
  else if (yearsNum === 7) deductionPct = 0.55;
  else deductionPct = 0.50;

  const deductions = appraisedNum * deductionPct;
  const assessable = appraisedNum - deductions;
  const incomePerYear = assessable / yearsNum;

  // Withholding Tax Brackets (No exemption on the first 150,000 THB for property sales withholding tax)
  let taxPerYear = 0;
  let remaining = incomePerYear;

  const bracket1 = Math.min(remaining, 300000);
  taxPerYear += bracket1 * 0.05;
  remaining -= bracket1;

  if (remaining > 0) {
    const bracket2 = Math.min(remaining, 200000); // 300k to 500k
    taxPerYear += bracket2 * 0.10;
    remaining -= bracket2;
  }
  if (remaining > 0) {
    const bracket3 = Math.min(remaining, 250000); // 500k to 750k
    taxPerYear += bracket3 * 0.15;
    remaining -= bracket3;
  }
  if (remaining > 0) {
    const bracket4 = Math.min(remaining, 250000); // 750k to 1M
    taxPerYear += bracket4 * 0.20;
    remaining -= bracket4;
  }
  if (remaining > 0) {
    const bracket5 = Math.min(remaining, 1000000); // 1M to 2M
    taxPerYear += bracket5 * 0.25;
    remaining -= bracket5;
  }
  if (remaining > 0) {
    const bracket6 = Math.min(remaining, 3000000); // 2M to 5M
    taxPerYear += bracket6 * 0.30;
    remaining -= bracket6;
  }
  if (remaining > 0) {
    taxPerYear += remaining * 0.35; // above 5M
  }

  const withholdingTax = taxPerYear * yearsNum;
  const totalFees = transferFee + sbt + stampDuty + withholdingTax;

  return (
    <div id="property-taxes-calc" className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-500 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            {lang === "TH" ? "คำนวณค่าโอนและภาษีอสังหาฯ (กรมที่ดิน)" : "Property Transfer Tax & Fees Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "คำนวณภาษีหัก ณ ที่จ่าย ภาษีธุรกิจเฉพาะ อากรแสตมป์ และค่าโอนในวันโอนกรรมสิทธิ์" : "Estimate government transfer fees, taxes, and withholding tax at the Land Department."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ราคาซื้อขายจริง (บาท)" : "Actual Selling Price (THB)"}</label>
            <NumericInput value={price} onChange={setPrice} placeholder="เช่น 2,500,000" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ราคาประเมินทุนทรัพย์กรมธนารักษ์ (บาท)" : "Appraised Value (Treasury Dept) (THB)"}</label>
            <NumericInput value={appraised} onChange={setAppraised} placeholder="เช่น 2,000,000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ระยะเวลาที่ถือครอง" : "Years Owned"}</label>
              <select value={years} onChange={e => setYears(e.target.value)} className={inputClass}>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {lang === "TH" ? "ปี" : "Years"} ({lang === "TH" ? `หักเหมา ${i === 0 ? "92%" : i === 1 ? "84%" : i === 2 ? "77%" : i === 3 ? "71%" : i === 4 ? "65%" : i === 5 ? "60%" : i === 6 ? "55%" : "50%"}` : "deduct"})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col justify-center">
              <label className="text-xs font-bold text-gray-500 mb-2">{lang === "TH" ? "ชื่ออยู่ในทะเบียนบ้าน" : "Registered in House doc"}</label>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={registered} 
                  onChange={e => setRegistered(e.target.checked)} 
                  className="sr-only peer" 
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                <span className="ms-2 text-sm text-gray-900 dark:text-gray-300">{lang === "TH" ? "เกิน 1 ปี" : "Yes (>= 1 year)"}</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-gray-50/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{lang === "TH" ? "สรุปค่าใช้จ่าย ณ กรมที่ดิน" : "Government Fees Summary"}</h3>
            
            <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 text-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">{lang === "TH" ? "รวมค่าใช้จ่ายทั้งหมดในวันโอน" : "Total Transfer Fees & Taxes"}</span>
              <span className="text-2xl font-black text-emerald-500">฿{totalFees.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "1. ค่าธรรมเนียมการโอน (2%):" : "1. Transfer Fee (2%):"}</span>
                <span className="font-bold text-gray-900 dark:text-white">฿{transferFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  {isSbtApplicable 
                    ? (lang === "TH" ? "2. ภาษีธุรกิจเฉพาะ (3.3%):" : "2. Specific Business Tax (3.3%):") 
                    : (lang === "TH" ? "2. อากรแสตมป์ (0.5%):" : "2. Stamp Duty (0.5%):")}
                </span>
                <span className="font-bold text-gray-900 dark:text-white">
                  ฿{isSbtApplicable ? sbt.toLocaleString(undefined, { maximumFractionDigits: 0 }) : stampDuty.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "3. ภาษีเงินได้หัก ณ ที่จ่าย (WHT):" : "3. Withholding Tax (WHT):"}</span>
                <span className="font-bold text-red-500">฿{withholdingTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <ExportResult elementId="property-taxes-calc" fileName="property-transfer-taxes" lang={lang} />
          </div>
        </div>
      </div>

      <CalculationSteps 
        title={lang === "TH" ? "ข้อกำหนดและขั้นตอนการคิดค่าโอนที่ดิน" : "Land Department Fee Structure"}
        steps={lang === "TH" ? [
          "ค่าโอนกรรมสิทธิ์ = 2% ของราคาประเมินกรมธนารักษ์ (ไม่ใช่ราคาซื้อขายจริง)",
          "อากรแสตมป์ = 0.5% ของราคาซื้อขายจริงหรือราคาประเมินที่สูงกว่า (ชำระเมื่อได้รับการยกเว้นภาษีธุรกิจเฉพาะเท่านั้น)",
          "ภาษีธุรกิจเฉพาะ = 3.3% ของราคาซื้อขายจริงหรือราคาประเมินที่สูงกว่า (ชำระเมื่อถือครองทรัพย์สินน้อยกว่า 5 ปีบริบูรณ์ เว้นแต่จะมีชื่อในทะเบียนบ้านของบ้านหลังนั้นเกิน 1 ปีเต็ม)",
          "ภาษีเงินได้หัก ณ ที่จ่ายบุคคลธรรมดา = คำนวณจากราคาประเมินลบค่าใช้จ่ายเหมาตามปี และคำนวณภาษีอัตราก้าวหน้าคูณจำนวนปีที่ถือครอง"
        ] : [
          "Transfer Fee = 2% of the appraised value (determined by the Treasury Department).",
          "Stamp Duty = 0.5% of the higher of purchase or appraised value. Only paid if exempt from SBT.",
          "Specific Business Tax (SBT) = 3.3% of the higher of purchase or appraised value. Applies if property owned < 5 years, unless owner's name has been in the household registration for >= 1 year.",
          "Withholding Tax = Computed by taking the appraised value, applying standard deductions, dividing by years held, tax calculated using progressive rates, then multiplied back by years held."
        ]}
      />

      <AdPlaceholder type="in-article" />

      <SEOFAQ title="ความรู้ด้านภาษีและค่าธรรมเนียมวันโอนอสังหาริมทรัพย์ ณ กรมที่ดิน">
        <FAQItem 
          q="ใครมีหน้าที่เป็นผู้รับผิดชอบค่าใช้จ่ายในการโอนบ้านและภาษี ณ กรมที่ดิน?" 
          a="ตามหลักกฎหมายและแนวทางทั่วไป ค่าธรรมเนียมการโอน 2% มักจะตกลงตกลงหารครึ่งกันระหว่างผู้ซื้อและผู้ขาย (ฝ่ายละ 1%) ส่วนภาษีเงินได้หัก ณ ที่จ่าย และภาษีธุรกิจเฉพาะ (หรือค่าอากรแสตมป์) ถือเป็นหน้าที่ตามประมวลรัษฎากรที่ผู้ขายจะต้องเป็นผู้ชำระเนื่องจากเป็นรายได้ของผู้ขายเอง อย่างไรก็ดี ในการซื้อขายจริง คู่สัญญาอาจตกลงแตกต่างไปจากนี้ได้ เช่น 'ผู้ซื้อรับผิดชอบค่าใช้จ่ายทุกอย่าง ณ กรมที่ดิน' หรือ 'ผู้ขายรับผิดชอบทั้งหมดทุกรายการ' ซึ่งควรระบุข้อตกลงนี้ลงในหนังสือสัญญาจะซื้อจะขายให้ชัดเจนก่อนวันไปทำธุรกรรม" 
        />
        <FAQItem 
          q="จะได้รับการยกเว้นภาษีธุรกิจเฉพาะได้อย่างไร และประหยัดเงินได้เท่าใด?" 
          a="ภาษีธุรกิจเฉพาะคิดสูงถึง 3.3% ของราคาประเมินหรือราคาซื้อขายจริงที่สูงกว่า ซึ่งถือเป็นจำนวนเงินมหาศาล (เช่น ซื้อขายจริง 3 ล้านบาท ภาษีธุรกิจเฉพาะจะสูงถึง 99,000 บาท) คุณจะได้รับการยกเว้นภาษีธุรกิจเฉพาะเมื่อ 1) ถือครองอสังหาริมทรัพย์นั้นเกิน 5 ปีเต็ม 2) มีชื่อในทะเบียนบ้านหลังที่ขายเป็นเวลาไม่น้อยกว่า 1 ปีบริบูรณ์นับแต่วันที่ได้กรรมสิทธิ์ หรือ 3) ได้รับมรดกมา หากได้รับการยกเว้นภาษีนี้ คุณจะเปลี่ยนไปจ่ายเพียงค่าอากรแสตมป์ในอัตรา 0.5% (หรือคิดเป็นเงินเพียง 15,000 บาทสำหรับทรัพย์สินราคา 3 ล้านบาท) แทน" 
        />
        <FAQItem 
          q="การจดจำนองธนาคารมีค่าใช้จ่ายเพิ่มเติมเท่าไร และคิดจากฐานราคาใด?" 
          a="หากผู้ซื้อบ้านใช้บริการสินเชื่อกับสถาบันการเงิน (ธนาคาร) ในวันโอนกรรมสิทธิ์จะมีขั้นตอนการจดจำนองเพิ่มเข้ามา ซึ่งกรมที่ดินจะจัดเก็บค่าธรรมเนียมจดจำนองในอัตรา 1% ของวงเงินกู้ยืมทั้งหมดที่ได้จากธนาคาร (ไม่ใช่ราคาซื้อขายหรือราคาประเมิน) เช่น ยื่นกู้และผ่านการอนุมัติวงเงินกู้ที่ 2,500,000 บาท จะมีค่าธรรมเนียมจดจำนองเพิ่มขึ้นมาอีก 25,000 บาท ซึ่งผู้ซื้อที่เป็นคนยื่นกู้มีหน้าที่เป็นผู้ชำระค่าธรรมเนียมในส่วนนี้" 
        />
        <FAQItem 
          q="ราคาประเมินทุนทรัพย์กรมธนารักษ์ตรวจสอบได้จากที่ไหนและใช้เพื่อการใด?" 
          a="ราคาประเมินทุนทรัพย์ที่ดินและสิ่งปลูกสร้างถูกกำหนดโดยกรมธนารักษ์ กระทรวงการคลัง เป็นตัวเลขมาตรฐานที่ถูกนำมาใช้เป็นฐานในการเก็บภาษีและค่าธรรมเนียมโอน ณ กรมที่ดิน เพื่อป้องกันไม่ให้บุคคลจงใจรายงานราคาซื้อขายจริงให้ต่ำลงเพื่อเลี่ยงภาษี คุณสามารถเข้าไปตรวจสอบราคาประเมินเบื้องต้นด้วยเลขที่โฉนดที่ดินหรือเลขทะเบียนบ้านได้โดยตรงผ่านทางระบบอินเทอร์เน็ตของกรมธนารักษ์ก่อนวันโอนจริง" 
        />
      </SEOFAQ>
    </div>
  );
}

// ==========================================
// 8. LandPriceValuation (คำนวณราคาประเมินที่ดิน)
// ==========================================
export function LandPriceValuation({ lang }: { lang: Lang }) {
  const [rai, setRai] = useLocalState("lp_rai", "");
  const [ngan, setNgan] = useLocalState("lp_ngan", "");
  const [wah, setWah] = useLocalState("lp_wah", "");
  const [pricePerWah, setPricePerWah] = useLocalState("lp_pricewah", "");
  const [marketFactor, setMarketFactor] = useLocalState("lp_factor", "1.5");

  const rVal = parseFloat(rai) || 0;
  const nVal = parseFloat(ngan) || 0;
  const wVal = parseFloat(wah) || 0;
  const pwVal = parseFloat(pricePerWah) || 0;
  const fVal = parseFloat(marketFactor) || 1;

  const totalSqWah = (rVal * 400) + (nVal * 100) + wVal;
  const totalAppraised = totalSqWah * pwVal;
  const estimatedMarket = totalAppraised * fVal;

  return (
    <div id="land-price-calc" className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/10 dark:bg-blue-400/10 text-blue-500 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/><path d="M2 12h20"/></svg>
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            {lang === "TH" ? "คำนวณราคาประเมินที่ดิน (ไร่-งาน-ตร.ว.)" : "Land Price Valuation Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "แปลงขนาดที่ดินและคำนวณหาค่ามูลค่าประเมินรวมกับราคาตลาด" : "Convert land units (Rai-Ngan-Wah) and calculate valuation."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-white/10 pb-1">
            {lang === "TH" ? "ขนาดพื้นที่ที่ดินตามโฉนด" : "Land Dimension from Title Deed"}
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ไร่" : "Rai"}</label>
              <NumericInput value={rai} onChange={setRai} placeholder="เช่น 2" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "งาน" : "Ngan"}</label>
              <NumericInput value={ngan} onChange={setNgan} placeholder="เช่น 1" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ตารางวา" : "Sq. Wah"}</label>
              <NumericInput value={wah} onChange={setWah} placeholder="เช่น 50" />
            </div>
          </div>

          <h3 className="text-base font-bold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-white/10 pb-1 pt-2">
            {lang === "TH" ? "การประเมินราคา" : "Pricing Valuation"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ราคาประเมินต่อตารางวา (บาท)" : "Price per Sq. Wah (THB)"}</label>
              <NumericInput value={pricePerWah} onChange={setPricePerWah} placeholder="เช่น 20,000" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ตัวคูณราคาตลาด (เท่า)" : "Market Multiplier"}</label>
              <input 
                type="number" 
                step="0.1" 
                value={marketFactor} 
                onChange={e => setMarketFactor(e.target.value)} 
                className={inputClass} 
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-gray-50/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{lang === "TH" ? "ผลการคำนวณและประเมินมูลค่า" : "Land Value Estimation"}</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 text-center col-span-2">
                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">{lang === "TH" ? "ราคาตลาดโดยประมาณ" : "Estimated Market Value"}</span>
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">฿{estimatedMarket.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2 text-sm pt-2">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "แปลงเป็นตารางวารวม:" : "Total Area in Sq. Wah:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">{totalSqWah.toLocaleString()} ตร.ว.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "แปลงเป็นตารางเมตรวม:" : "Total Area in Sq. Meters:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">{(totalSqWah * 4).toLocaleString()} ตร.ม.</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-white/10 pt-2 font-bold">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "มูลค่าราคาประเมินรวม:" : "Total Appraised Value:"}</span>
                <span className="text-gray-900 dark:text-white">฿{totalAppraised.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <ExportResult elementId="land-price-calc" fileName="land-price-valuation" lang={lang} />
          </div>
        </div>
      </div>

      <CalculationSteps 
        title={lang === "TH" ? "มาตราส่วนการวัดที่ดินของไทยและการคิดมูลค่า" : "Thai Land Units Math"}
        steps={lang === "TH" ? [
          "มาตราส่วนวัดที่ดินไทย: 1 ไร่ = 4 งาน = 400 ตารางวา = 1,600 ตารางเมตร",
          "พื้นที่ตารางวารวม = (จำนวนไร่ × 400) + (จำนวนงาน × 100) + จำนวนตารางวาเศษ",
          "มูลค่าประเมินรวม = พื้นที่ตารางวารวม × ราคาประเมินต่อตารางวา",
          "ราคาตลาดคาดการณ์ = มูลค่าประเมินรวม × ตัวคูณราคาตลาด (ปกติที่ดินเปล่าราคาซื้อขายจริงจะอยู่ที่ประมาณ 1.5 - 3 เท่าของราคาประเมิน)"
        ] : [
          "Thai Land Conversion: 1 Rai = 4 Ngan = 400 Sq. Wah = 1,600 Square Meters.",
          "Total Sq. Wah = (Rai × 400) + (Ngan × 100) + Sq. Wah.",
          "Total Appraised Value = Total Sq. Wah × Appraised Price per Sq. Wah.",
          "Estimated Market Value = Total Appraised Value × Market Multiplier."
        ]}
      />

      <AdPlaceholder type="in-article" />

      <SEOFAQ title="ความรู้และการคำนวณมาตราส่วนที่ดินไทย (ไร่ งาน ตารางวา)">
        <FAQItem 
          q="หน่วยวัดที่ดินของไทย ไร่ งาน ตารางวา มีความเกี่ยวข้องกันอย่างไร?" 
          a="ประเทศไทยใช้หน่วยวัดที่ดินเฉพาะตัวที่เป็นมาตรฐานตามโฉนดที่ดินของกรมที่ดิน โดยเรียงลำดับจากหน่วยใหญ่ที่สุดไปหาน้อยที่สุดคือ ไร่, งาน และ ตารางวา โดยความสัมพันธ์เชิงตัวเลขมีดังนี้คือ 1 ไร่ มีค่าเท่ากับ 4 งาน หรือเทียบเท่ากับ 400 ตารางวา และ 1 งาน จะมีเนื้อที่เท่ากับ 100 ตารางวาพอดี เมื่อนำไปเปรียบเทียบกับระบบเมตริกสากล 1 ตารางวาจะมีพื้นที่เท่ากับ 4 ตารางเมตร ดังนั้น 1 ไร่ จึงมีขนาดกว้างขวางเท่ากับ 1,600 ตารางเมตร" 
        />
        <FAQItem 
          q="ราคาตลาด (Market Value) และราคาประเมิน (Appraised Value) ทำไมจึงแตกต่างกัน?" 
          a="ราคาประเมินที่ดินถูกจัดตั้งและประกาศใช้โดยกรมธนารักษ์ ทุกๆ รอบ 4 ปี โดยวัตถุประสงค์เพื่อเป็นฐานในการเก็บภาษีและค่าธรรมเนียมโอนที่ดิน ราคาประเมินจึงมักจะเป็นราคาที่ต่ำกว่าความเป็นจริงและสะท้อนข้อมูลย้อนหลัง ในขณะที่ราคาตลาดเกิดจากกลไกราคาของความต้องการซื้อและความต้องการขายจริงในตลาดเสรีปัจจุบัน ซึ่งขึ้นอยู่กับโครงสร้างความเจริญใหม่ๆ เช่น ทางด่วนเปิดใหม่ หรือรถไฟฟ้าสายใหม่ ทำให้โดยทั่วไปที่ดินเปล่าในทำเลกำลังพัฒนาจะมีราคาซื้อขายจริงในตลาดสูงกว่าราคาประเมินตั้งแต่ 1.5 เท่าไปจนถึง 3 เท่า หรืออาจจะมากกว่า 10 เท่าในทำเลทองใจกลางเมือง" 
        />
        <FAQItem 
          q="จะสามารถตรวจสอบราคาประเมินที่ดินของตัวเองได้อย่างไร?" 
          a="คุณสามารถตรวจสอบราคาประเมินที่ดินแบบระบุพิกัดชัดเจนได้ด้วยตนเองอย่างง่ายดายผ่านแอปพลิเคชัน LandsMaps ของกรมที่ดิน หรือเว็บไซต์ระบบเผยแพร่ราคาประเมินทรัพย์สินของกรมธนารักษ์ โดยสิ่งที่คุณจำเป็นต้องมีเพื่อประกอบการค้นหาคือ เลขที่โฉนดที่ดิน เลขที่ดิน ระวางที่ดิน และจังหวัดที่ตั้งของที่ดินนั้นๆ ซึ่งทั้งหมดจะปรากฏอยู่บนหน้าแรกของตัวโฉนดที่ดิน (น.ส. 4)" 
        />
      </SEOFAQ>
    </div>
  );
}

// ==========================================
// 9. LandSubdivisionCost (คำนวณค่ารังวัดแบ่งแยกโฉนด)
// ==========================================
export function LandSubdivisionCost({ lang }: { lang: Lang }) {
  const [area, setArea] = useLocalState("ls_area", "");
  const [plots, setPlots] = useLocalState("ls_plots", "2");
  const [surveyor, setSurveyor] = useState("gov");
  const [isBkk, setIsBkk] = useState(true);

  const aVal = parseFloat(area) || 0;
  const pVal = parseInt(plots) || 2;

  // Government Fees Calculation
  let baseAppFee = 150; // including applications & certificates
  let surveyFee = 0;
  let perDiem = 0;
  let stoneFee = 0;

  if (surveyor === "gov") {
    // Government surveyor estimation
    surveyFee = isBkk ? 3000 + (pVal * 600) : 2000 + (pVal * 500);
    perDiem = isBkk ? 2000 + (aVal * 300) : 1500 + (aVal * 200);
    stoneFee = pVal * 4 * 60; // 60 THB per marker stone
  } else {
    // Private surveyor estimation
    surveyFee = isBkk ? 18000 + (pVal * 3000) : 15000 + (pVal * 2500);
    perDiem = 3000;
    stoneFee = pVal * 4 * 120; // Private stones are more expensive + markup
  }

  const totalCost = baseAppFee + surveyFee + perDiem + stoneFee;

  return (
    <div id="land-subdivision-calc" className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-500 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            {lang === "TH" ? "คำนวณค่ารังวัดแบ่งแยกโฉนดที่ดิน" : "Land Subdivision Survey Cost Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "ประมาณการค่าใช้จ่ายในการขอรังวัดที่ดินและแบ่งแยกโฉนดใหม่" : "Estimate government and private surveyor fees for land subdivision."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ขนาดที่ดินเดิมทั้งหมด (ไร่)" : "Original Land Area (Rai)"}</label>
            <NumericInput value={area} onChange={setArea} placeholder="เช่น 5" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "จำนวนแปลงที่จะแบ่งแยกออก (รวมแปลงเดิม)" : "Total Output Plots (including original)"}</label>
            <select value={plots} onChange={e => setPlots(e.target.value)} className={inputClass}>
              {[...Array(9)].map((_, i) => (
                <option key={i + 2} value={i + 2}>{i + 2} {lang === "TH" ? "แปลง" : "Plots"}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 mb-2">{lang === "TH" ? "ผู้ดำเนินการรังวัด" : "Surveyor Type"}</label>
              <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
                <button 
                  type="button"
                  onClick={() => setSurveyor("gov")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg ${surveyor === "gov" ? "bg-emerald-500 text-white shadow-sm" : "text-gray-500"}`}
                >
                  {lang === "TH" ? "ช่างที่ดินรัฐ" : "Government"}
                </button>
                <button 
                  type="button"
                  onClick={() => setSurveyor("private")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg ${surveyor === "private" ? "bg-emerald-500 text-white shadow-sm" : "text-gray-500"}`}
                >
                  {lang === "TH" ? "ช่างเอกชน" : "Private"}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-2">{lang === "TH" ? "พื้นที่ตั้งที่ดิน" : "Location Area"}</label>
              <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
                <button 
                  type="button"
                  onClick={() => setIsBkk(true)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg ${isBkk ? "bg-emerald-500 text-white shadow-sm" : "text-gray-500"}`}
                >
                  {lang === "TH" ? "กรุงเทพฯ" : "BKK"}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsBkk(false)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg ${!isBkk ? "bg-emerald-500 text-white shadow-sm" : "text-gray-500"}`}
                >
                  {lang === "TH" ? "ต่างจังหวัด" : "Provinces"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-gray-50/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{lang === "TH" ? "สรุปงบประมาณค่ารังวัด" : "Estimated Budget Summary"}</h3>
            
            <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 text-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">{lang === "TH" ? "ประมาณการค่าใช้จ่ายรวมทั้งหมด" : "Total Estimated Costs"}</span>
              <span className="text-2xl font-black text-emerald-500">฿{totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "ค่าคำขอและเอกสารราชการ:" : "Application Fees:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">฿{baseAppFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "ค่าธรรมเนียมและค่าจ้างช่างรังวัดหลัก:" : "Survey Fees:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">฿{surveyFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "ค่าเดินทางทีมช่างรังวัดและค่าคนงาน:" : "Travel & Per Diem:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">฿{perDiem.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "ค่าหลักหมุดปูนที่ดินสำรอง:" : "Estimated Boundary Stones:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">฿{stoneFee.toLocaleString()} ({pVal * 4} หมุด)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <ExportResult elementId="land-subdivision-calc" fileName="land-subdivision-cost" lang={lang} />
          </div>
        </div>
      </div>

      <CalculationSteps 
        title={lang === "TH" ? "ขั้นตอนทางเอกสารและการดำเนินการแบ่งโฉนด" : "Subdivision & Survey Process"}
        steps={lang === "TH" ? [
          "ขั้นตอนที่ 1: ยื่นคำขอรังวัดแบ่งแยก ณ สำนักงานที่ดินจังหวัดในเขตท้องที่ของท่าน",
          "ขั้นตอนที่ 2: เจ้าหน้าที่นัดหมายวันรังวัดที่ดิน (ช่างรังวัดหลวงปกติจะคิวยาว 2 - 4 เดือน ส่วนช่างเอกชนจะเข้าดำเนินการได้รวดเร็วกว่าใน 1 - 2 สัปดาห์)",
          "ขั้นตอนที่ 3: ช่างลงพื้นที่วัดระยะ ปักปันแนวเขต และบันทึกข้อมูลหลักหมุดรอบแปลงร่วมกับเจ้าของที่ดินแปลงข้างเคียง",
          "ขั้นตอนที่ 4: เสนอแบบรังวัดเข้าที่ประชุม ตรวจสอบข้อมูลพิกัด แตกรายละเอียด และออกเอกสารสิทธิ์โฉนดฉบับแยกใหม่"
        ] : [
          "Step 1: Submit a formal application for subdivision at your local land office.",
          "Step 2: The officer schedules the field survey (government queues take 2-4 months, private surveyors are faster at 1-2 weeks).",
          "Step 3: The surveyor measures boundaries, plants new concrete stones, and logs coordinate signatures with neighbors.",
          "Step 4: The new maps are processed, approved by the Land Department, and separate title deeds (Chanote) are issued."
        ]}
      />

      <AdPlaceholder type="in-article" />

      <SEOFAQ title="คู่มือรังวัดและแบ่งแยกโฉนดที่ดินในไทยแบบถูกต้องตามกฎหมาย">
        <FAQItem 
          q="ทำไมเราต้องทำเรื่องขอรังวัดแบ่งแยกที่ดิน และส่งผลดีอย่างไร?" 
          a="การขอรังวัดแบ่งแยกที่ดินทำเพื่อให้ที่ดินแปลงใหญ่ถูกตัดแบ่งออกเป็นแปลงย่อยที่มีอาณาเขตและโฉนดเป็นของตนเองอย่างชัดเจน การทำเช่นนี้ส่งผลดีและมีความสำคัญอย่างยิ่งเมื่อ 1) ครอบครัวต้องการยกแบ่งมรดกให้ลูกหลานแต่ละคนเป็นสัดส่วน 2) เพื่อประกอบการจัดสรรที่ดินสร้างโครงการบ้านจัดสรรเพื่อการพาณิชย์ หรือ 3) เพื่อแบ่งขายที่ดินบางส่วนออกไป การปักหมุดและรังวัดอย่างถูกต้องช่วยป้องกันการเกิดคดีความทะเลาะพิพาทเรื่องแนวเขตทับซ้อนกับที่ดินแปลงข้างเคียงในอนาคตได้อย่างเด็ดขาด" 
        />
        <FAQItem 
          q="ความแตกต่างหลักระหว่างการจ้างช่างรังวัดของกรมที่ดิน กับช่างรังวัดเอกชน?" 
          a="ความแตกต่างที่ชัดเจนที่สุดคือ 'เวลาและราคา' ช่างรังวัดของกรมที่ดิน (ช่างหลวง) จะมีอัตราค่าบริการตามพระราชกฤษฎีกาที่ถูกกว่ามาก (ประมาณ 5,000 - 8,000 บาทต่อวัน) แต่ข้อเสียคือมีคิวยื่นคำขอที่ยาวมาก ในบางจังหวัดอาจต้องรอนานถึง 3-6 เดือนจึงจะถึงคิวลงพื้นที่ ในขณะที่ช่างรังวัดเอกชนที่ได้รับใบอนุญาต (ช่างรังวัดเอกชน) จะมีอัตราค่าจ้างที่สูงกว่า (เฉลี่ยเริ่มต้น 15,000 - 25,000 บาทขึ้นไป) แต่สามารถนัดหมายและลงพื้นที่วัดหน้างานจริงได้รวดเร็วทันใจภายใน 7-14 วัน ซึ่งตอบโจทย์นักธุรกิจที่ต้องการรีบทำธุรกรรมทางการเงิน" 
        />
        <FAQItem 
          q="หลักหมุดที่ดิน (Boundary Stones) คืออะไร และมีความสำคัญอย่างไร?" 
          a="หลักหมุดที่ดินคือ แท่งคอนกรีตปูนทรงกระบอกขนาดเล็กที่ฝังจมลงในดิน โดยมีส่วนฝาเหล็กประทับรหัสอักษรและหมายเลขกำกับชัดเจน หมุดแต่ละหมุดทำหน้าที่เป็นตัวบอกพิกัดทางภูมิศาสตร์ (GPS Coordinates) ของแนวเขตที่ดิน หากมีการเคลื่อนย้าย ทำลาย หรือดึงออกโดยไม่ได้รับอนุญาตทางกฎหมายจากเจ้าพนักงานที่ดิน จะถือเป็นความผิดทางอาญา มีโทษจำคุกและปรับ" 
        />
      </SEOFAQ>
    </div>
  );
}

// ==========================================
// 10. DSCRCalculator (คำนวณ-dscr)
// ==========================================
export function DSCRCalculator({ lang }: { lang: Lang }) {
  const [grossIncome, setGrossIncome] = useLocalState("ds_income", "");
  const [expense, setExpense] = useLocalState("ds_expense", "");
  const [principal, setPrincipal] = useLocalState("ds_principal", "");
  const [interest, setInterest] = useLocalState("ds_interest", "");
  const [period, setPeriod] = useState("monthly");

  const incVal = parseFloat(grossIncome) || 0;
  const expVal = parseFloat(expense) || 0;
  const priVal = parseFloat(principal) || 0;
  const intVal = parseFloat(interest) || 0;

  const noi = incVal - expVal;
  const debtService = priVal + intVal;
  const dscr = debtService > 0 ? noi / debtService : 0;

  let statusText = lang === "TH" ? "กรอกข้อมูลเพื่อคำนวณ" : "Enter data to compute";
  let statusColor = "text-gray-500";
  let statusBg = "bg-gray-100 dark:bg-white/5";

  if (debtService > 0) {
    if (dscr >= 1.25) {
      statusText = lang === "TH" ? "ปลอดภัยสูงมาก (Strong Cash Flow)" : "Strong Cash Flow";
      statusColor = "text-emerald-500";
      statusBg = "bg-emerald-500/10";
    } else if (dscr >= 1.0 && dscr < 1.25) {
      statusText = lang === "TH" ? "ความเสี่ยงปานกลาง (Moderate Margin)" : "Moderate Margin";
      statusColor = "text-amber-500";
      statusBg = "bg-amber-500/10";
    } else {
      statusText = lang === "TH" ? "ความเสี่ยงสูง / กระแสเงินสดติดลบ (Deficit)" : "Cash Flow Deficit";
      statusColor = "text-red-500";
      statusBg = "bg-red-500/10";
    }
  }

  return (
    <div id="dscr-calc" className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/10 dark:bg-blue-400/10 text-blue-500 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/><path d="M19 15V9h-6"/></svg>
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            {lang === "TH" ? "คำนวณ DSCR (อัตราส่วนการชำระหนี้)" : "DSCR (Debt Service Coverage Ratio) Calculator"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lang === "TH" ? "วิเคราะห์ความสามารถในการชำระหนี้ของอสังหาริมทรัพย์เพื่อการกู้ยืมและขอสินเชื่อ" : "Analyze property's ability to cover debt payments from its rental income."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-500">{lang === "TH" ? "คาบเวลาที่ต้องการคำนวณ" : "Calculation Interval"}</span>
            <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
              <button 
                type="button"
                onClick={() => setPeriod("monthly")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg ${period === "monthly" ? "bg-blue-500 text-white shadow-sm" : "text-gray-500"}`}
              >
                {lang === "TH" ? "รายเดือน" : "Monthly"}
              </button>
              <button 
                type="button"
                onClick={() => setPeriod("yearly")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg ${period === "yearly" ? "bg-blue-500 text-white shadow-sm" : "text-gray-500"}`}
              >
                {lang === "TH" ? "รายปี" : "Yearly"}
              </button>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              {period === "monthly" 
                ? (lang === "TH" ? "รายรับค่าเช่ารวมต่อเดือน (บาท)" : "Monthly Gross Rent (THB)")
                : (lang === "TH" ? "รายรับค่าเช่ารวมต่อปี (บาท)" : "Yearly Gross Rent (THB)")}
            </label>
            <NumericInput value={grossIncome} onChange={setGrossIncome} placeholder="เช่น 50,000" />
          </div>
          <div>
            <label className={labelClass}>
              {period === "monthly" 
                ? (lang === "TH" ? "ค่าใช้จ่ายดำเนินงานส่วนกลางต่อเดือน (บาท)" : "Monthly Operating Expenses (THB)")
                : (lang === "TH" ? "ค่าใช้จ่ายดำเนินงานส่วนกลางต่อปี (บาท)" : "Yearly Operating Expenses (THB)")}
            </label>
            <NumericInput value={expense} onChange={setExpense} placeholder="เช่น 5,000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                {period === "monthly" ? (lang === "TH" ? "เงินต้นผ่อนชำระ/เดือน" : "Monthly Principal") : (lang === "TH" ? "เงินต้นผ่อนชำระ/ปี" : "Yearly Principal")}
              </label>
              <NumericInput value={principal} onChange={setPrincipal} placeholder="เช่น 25,000" />
            </div>
            <div>
              <label className={labelClass}>
                {period === "monthly" ? (lang === "TH" ? "ดอกเบี้ยจ่าย/เดือน" : "Monthly Interest") : (lang === "TH" ? "ดอกเบี้ยจ่าย/ปี" : "Yearly Interest")}
              </label>
              <NumericInput value={interest} onChange={setInterest} placeholder="เช่น 5,000" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-gray-50/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{lang === "TH" ? "การประเมินอัตราส่วน DSCR" : "DSCR Evaluation"}</h3>
            
            <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 text-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Debt Service Coverage Ratio</span>
              <span className="text-4xl font-black text-blue-600 dark:text-blue-400">{dscr.toFixed(2)}</span>
            </div>

            <div className={`p-4 rounded-xl text-center ${statusBg} ${statusColor} font-bold text-sm`}>
              {statusText}
            </div>

            <div className="space-y-2 text-sm pt-2 border-t border-gray-200 dark:border-white/10">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "รายได้ดำเนินงานสุทธิ (NOI):" : "Net Operating Income (NOI):"}</span>
                <span className="font-bold text-gray-900 dark:text-white">฿{noi.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{lang === "TH" ? "ยอดผ่อนชำระรวม (Debt Service):" : "Total Debt Service:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">฿{debtService.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <ExportResult elementId="dscr-calc" fileName="dscr-valuation" lang={lang} />
          </div>
        </div>
      </div>

      <CalculationSteps 
        title={lang === "TH" ? "เกณฑ์และวิธีการวิเคราะห์ DSCR" : "DSCR Evaluation Math"}
        steps={lang === "TH" ? [
          "รายได้ดำเนินงานสุทธิ (NOI) = รายได้จากค่าเช่ารวม - ค่าใช้จ่ายการดำเนินงาน (ไม่รวมภาษีบุคคลและค่าเสื่อม)",
          "ยอดชำระหนี้รวม (Debt Service) = เงินต้นที่ต้องผ่อนส่งธนาคาร + ดอกเบี้ยจ่ายทั้งหมด",
          "สูตร: DSCR = NOI ÷ ยอดชำระหนี้รวม (Debt Service)",
          "การตีความ: หาก DSCR น้อยกว่า 1.0 แปลว่าสินทรัพย์นั้นมีกระแสเงินสดติดลบและไม่เพียงพอชำระหนี้ (ธนาคารมักปฏิเสธเงินกู้)"
        ] : [
          "Net Operating Income (NOI) = Gross Rental Income - Operating Expenses.",
          "Total Debt Service = Principal payment + Interest payment.",
          "Formula: DSCR = NOI ÷ Total Debt Service.",
          "Interpretation: If DSCR < 1.0, the property has negative cash flow and does not generate enough income to cover the debt (banks generally reject loans with DSCR < 1.15)."
        ]}
      />

      <AdPlaceholder type="in-article" />

      <SEOFAQ title="ข้อมูลเชิงลึกเกี่ยวกับอัตราส่วนการชำระหนี้ (DSCR) เพื่อการกู้เงินซื้ออสังหาฯ">
        <FAQItem 
          q="DSCR คืออะไร และทำไมธนาคารจึงเข้มงวดกับตัวเลขนี้ในการปล่อยกู้?" 
          a="DSCR ย่อมาจาก Debt Service Coverage Ratio (อัตราส่วนความสามารถในการบริการหนี้) คือ ดัชนีทางการเงินตัวสำคัญที่ใช้วัดความสามารถของอสังหาริมทรัพย์ในการสร้างรายได้มาจ่ายคืนเงินกู้ของธนาคาร ธนาคารพาณิชย์ให้ความสำคัญกับตัวเลขนี้อย่างมากในกรณีการกู้ยืมเพื่อซื้ออสังหาริมทรัพย์เพื่อการลงทุน (เช่น การกู้ซื้ออาคารพาณิชย์ปล่อยเช่า หรือหอพัก) เนื่องจากธนาคารไม่ต้องการแบกรับความเสี่ยงจากการที่ผู้กู้ขาดสภาพคล่องจนเกิดเป็นหนี้เสีย (NPL) ธนาคารจึงประเมินว่าตัวตึกเองต้องหาเงินให้ได้มากเกินพอที่จะครอบคลุมค่างวดกู้ในแต่ละเดือนโดยมีส่วนต่างที่ปลอดภัย" 
        />
        <FAQItem 
          q="ตัวเลข DSCR เท่าใดที่เป็นเกณฑ์มาตรฐานที่ธนาคารมักจะอนุมัติเงินกู้?" 
          a="เกณฑ์อนุมัติมาตรฐานของธนาคารส่วนใหญ่จะกำหนดว่าอสังหาริมทรัพย์เชิงพาณิชย์ควรมีอัตราส่วน DSCR อยู่ที่อย่างน้อย 1.20 ถึง 1.25 เท่าขึ้นไป ซึ่งหมายความว่า ทุกๆ หนี้สินค่างวดผ่อนชำระ 100 บาท ตัวอาคารจะต้องมีรายได้สุทธิ (NOI) คืนกลับมาอย่างน้อย 120 ถึง 125 บาท ส่วนต่าง 20-25% ที่เกิดขึ้นทำหน้าที่เป็นเบาะรองรับความเสี่ยง (Buffer) ในกรณีที่มีผู้เช่าย้ายออก หรือค่าใช้จ่ายซ่อมบำรุงตึกสูงขึ้นฉับพลัน" 
        />
        <FAQItem 
          q="หาก DSCR ต่ำกว่า 1.0 จะส่งผลเสียต่อนักลงทุนอย่างไรบ้าง?" 
          a="หากค่า DSCR ต่ำกว่า 1.00 (เช่น ได้ 0.85) จะหมายความว่าอสังหาริมทรัพย์นั้นมีกระแสเงินสดจากการดำเนินงานติดลบ (Negative Cash Flow) รายได้ค่าเช่าไม่เพียงพอชำระค่างวดแก่ธนาคาร ส่งผลให้นักลงทุนต้องนำเงินเก็บส่วนตัวจากแหล่งรายได้อื่นมาโปะจ่ายค่างวดธนาคารในทุกๆ เดือน ซึ่งเพิ่มความตึงตัวทางการเงินอย่างมาก และหากสถานการณ์ยืดเยื้ออาจนำไปสู่การผิดนัดชำระหนี้ได้" 
        />
      </SEOFAQ>
    </div>
  );
}

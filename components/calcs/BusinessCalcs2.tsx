"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass , SEOFAQ, FAQItem } from "./shared";

// 1. Break Even
export function BreakEvenCalculator({ lang }: { lang: Lang }) {
  const [fixed, setFixed] = useLocalState("be_fixed", "");
  const [variable, setVar] = useLocalState("be_var", "");
  const [price, setPrice] = useLocalState("be_price", "");
  
  const be = parseFloat(fixed) / (parseFloat(price) - parseFloat(variable));

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "จุดคุ้มทุน (Break-even)" : "Break-Even"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ต้นทุนคงที่รวม" : "Total Fixed Costs"}</label><input type="number" value={fixed} onChange={e=>setFixed(e.target.value)} className={inputClass} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "ต้นทุนผันแปรต่อชิ้น" : "Variable Cost/Unit"}</label><input type="number" value={variable} onChange={e=>setVar(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "ราคาขายต่อชิ้น" : "Sale Price/Unit"}</label><input type="number" value={price} onChange={e=>setPrice(e.target.value)} className={inputClass} /></div>
        </div>
      </div>
      {fixed && variable && price && !isNaN(be) && be > 0 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "ต้องขายให้ได้กี่ชิ้นถึงจะคุ้มทุน?" : "Units to Break-Even"}</p>
          <div className="text-4xl font-black text-green-600">{Math.ceil(be).toLocaleString()}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ธุรกิจ)" : "Business FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลการคำนวณนี้เป็นการประมาณการตามทฤษฎีเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุนหรือคำแนะนำทางกฎหมาย กรุณาปรึกษาที่ปรึกษาทางการเงินหรือนักบัญชีสำหรับการตัดสินใจขั้นสุดท้าย" : "This calculation is a theoretical estimate and does not constitute financial or legal advice. Please consult a financial advisor or accountant for your final decisions."} 
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 2. Markup
export function MarkupCalculator({ lang }: { lang: Lang }) {
  const [cost, setCost] = useLocalState("mu_cost", "");
  const [markup, setMarkup] = useLocalState("mu_pct", "");
  
  const price = parseFloat(cost) * (1 + parseFloat(markup)/100);
  const margin = ((price - parseFloat(cost)) / price) * 100;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "ตั้งราคาจาก Markup" : "Markup Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ต้นทุน" : "Cost"}</label><input type="number" value={cost} onChange={e=>setCost(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "Markup (%)" : "Markup (%)"}</label><input type="number" value={markup} onChange={e=>setMarkup(e.target.value)} className={inputClass} /></div>
      </div>
      {cost && markup && !isNaN(price) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center space-y-4">
          <div>
            <p>{lang === "TH" ? "ราคาขายที่แนะนำ" : "Suggested Selling Price"}</p>
            <div className="text-4xl font-black text-green-600">{price.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
          </div>
          <div>
             <p className="text-sm text-gray-500">{lang==="TH"?"คิดเป็น Gross Margin":"Equals Gross Margin"}</p>
             <div className="text-xl font-bold text-gray-700">{margin.toFixed(2)}%</div>
          </div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ธุรกิจ)" : "Business FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลการคำนวณนี้เป็นการประมาณการตามทฤษฎีเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุนหรือคำแนะนำทางกฎหมาย กรุณาปรึกษาที่ปรึกษาทางการเงินหรือนักบัญชีสำหรับการตัดสินใจขั้นสุดท้าย" : "This calculation is a theoretical estimate and does not constitute financial or legal advice. Please consult a financial advisor or accountant for your final decisions."} 
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 3. Depreciation
export function DepreciationCalculator({ lang }: { lang: Lang }) {
  const [cost, setCost] = useLocalState("dep_cost", "");
  const [salvage, setSalvage] = useLocalState("dep_salv", "");
  const [years, setYears] = useLocalState("dep_yrs", "");
  
  const dep = (parseFloat(cost) - parseFloat(salvage)) / parseFloat(years);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "ค่าเสื่อมราคา (แบบเส้นตรง)" : "Depreciation"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ราคาทุนทรัพย์สิน" : "Asset Cost"}</label><input type="number" value={cost} onChange={e=>setCost(e.target.value)} className={inputClass} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "ราคาซาก" : "Salvage Value"}</label><input type="number" value={salvage} onChange={e=>setSalvage(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "อายุการใช้งาน (ปี)" : "Useful Life (Years)"}</label><input type="number" value={years} onChange={e=>setYears(e.target.value)} className={inputClass} /></div>
        </div>
      </div>
      {cost && salvage && years && !isNaN(dep) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "ค่าเสื่อมราคาต่อปี" : "Annual Depreciation"}</p>
          <div className="text-4xl font-black text-green-600">{dep.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ธุรกิจ)" : "Business FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลการคำนวณนี้เป็นการประมาณการตามทฤษฎีเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุนหรือคำแนะนำทางกฎหมาย กรุณาปรึกษาที่ปรึกษาทางการเงินหรือนักบัญชีสำหรับการตัดสินใจขั้นสุดท้าย" : "This calculation is a theoretical estimate and does not constitute financial or legal advice. Please consult a financial advisor or accountant for your final decisions."} 
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 4. Payroll
export function PayrollCalculator({ lang }: { lang: Lang }) {
  return <div><h2 className="text-3xl font-black mb-2 text-green-600">Payroll Calculator (WIP)</h2></div>;
}

// 5. COGS
export function COGSCalculator({ lang }: { lang: Lang }) {
  const [invBeg, setBeg] = useLocalState("cogs_beg", "");
  const [purchases, setPur] = useLocalState("cogs_pur", "");
  const [invEnd, setEnd] = useLocalState("cogs_end", "");
  
  const cogs = parseFloat(invBeg) + parseFloat(purchases) - parseFloat(invEnd);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "ต้นทุนขาย (COGS)" : "COGS"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "สินค้าคงเหลือต้นงวด" : "Beginning Inventory"}</label><input type="number" value={invBeg} onChange={e=>setBeg(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "การซื้อสุทธิ" : "Purchases"}</label><input type="number" value={purchases} onChange={e=>setPur(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "สินค้าคงเหลือปลายงวด" : "Ending Inventory"}</label><input type="number" value={invEnd} onChange={e=>setEnd(e.target.value)} className={inputClass} /></div>
      </div>
      {invBeg && purchases && invEnd && !isNaN(cogs) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "ต้นทุนขาย" : "Cost of Goods Sold"}</p>
          <div className="text-4xl font-black text-green-600">{cogs.toLocaleString()}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ธุรกิจ)" : "Business FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลการคำนวณนี้เป็นการประมาณการตามทฤษฎีเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุนหรือคำแนะนำทางกฎหมาย กรุณาปรึกษาที่ปรึกษาทางการเงินหรือนักบัญชีสำหรับการตัดสินใจขั้นสุดท้าย" : "This calculation is a theoretical estimate and does not constitute financial or legal advice. Please consult a financial advisor or accountant for your final decisions."} 
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 6. LTV
export function LTVCalculator({ lang }: { lang: Lang }) {
  const [arpu, setArpu] = useLocalState("ltv_arpu", "");
  const [churn, setChurn] = useLocalState("ltv_churn", "");
  
  const ltv = parseFloat(arpu) / (parseFloat(churn)/100);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "มูลค่าลูกค้าตลอดชีพ (LTV)" : "LTV"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "รายได้เฉลี่ยต่อลูกค้า (ARPU)" : "Avg Revenue Per User"}</label><input type="number" value={arpu} onChange={e=>setArpu(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "อัตราการยกเลิก Churn Rate (%)" : "Churn Rate (%)"}</label><input type="number" value={churn} onChange={e=>setChurn(e.target.value)} className={inputClass} /></div>
      </div>
      {arpu && churn && !isNaN(ltv) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "LTV โดยประมาณ" : "Estimated LTV"}</p>
          <div className="text-4xl font-black text-green-600">{ltv.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ธุรกิจ)" : "Business FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลการคำนวณนี้เป็นการประมาณการตามทฤษฎีเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุนหรือคำแนะนำทางกฎหมาย กรุณาปรึกษาที่ปรึกษาทางการเงินหรือนักบัญชีสำหรับการตัดสินใจขั้นสุดท้าย" : "This calculation is a theoretical estimate and does not constitute financial or legal advice. Please consult a financial advisor or accountant for your final decisions."} 
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 7. CAC
export function CACCalculator({ lang }: { lang: Lang }) {
  const [spend, setSpend] = useLocalState("cac_spend", "");
  const [cust, setCust] = useLocalState("cac_cust", "");
  
  const cac = parseFloat(spend) / parseFloat(cust);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "ต้นทุนได้ลูกค้าใหม่ (CAC)" : "CAC"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "งบการตลาด/ขายทั้งหมด" : "Total Marketing/Sales Spend"}</label><input type="number" value={spend} onChange={e=>setSpend(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ลูกค้าใหม่ที่ได้" : "New Customers Acquired"}</label><input type="number" value={cust} onChange={e=>setCust(e.target.value)} className={inputClass} /></div>
      </div>
      {spend && cust && !isNaN(cac) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "ต้นทุนต่อลูกค้า 1 คน" : "Cost Per Customer"}</p>
          <div className="text-4xl font-black text-green-600">{cac.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ธุรกิจ)" : "Business FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลการคำนวณนี้เป็นการประมาณการตามทฤษฎีเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุนหรือคำแนะนำทางกฎหมาย กรุณาปรึกษาที่ปรึกษาทางการเงินหรือนักบัญชีสำหรับการตัดสินใจขั้นสุดท้าย" : "This calculation is a theoretical estimate and does not constitute financial or legal advice. Please consult a financial advisor or accountant for your final decisions."} 
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 8. Conversion Rate
export function ConversionRateCalculator({ lang }: { lang: Lang }) {
  const [visits, setVisits] = useLocalState("cr_vis", "");
  const [conv, setConv] = useLocalState("cr_conv", "");
  
  const cr = (parseFloat(conv) / parseFloat(visits)) * 100;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "Conversion Rate" : "Conversion Rate"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "จำนวนผู้เข้าชม" : "Visitors"}</label><input type="number" value={visits} onChange={e=>setVisits(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "จำนวนการซื้อ/เป้าหมาย" : "Conversions"}</label><input type="number" value={conv} onChange={e=>setConv(e.target.value)} className={inputClass} /></div>
      </div>
      {visits && conv && !isNaN(cr) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "Conversion Rate" : "Conversion Rate"}</p>
          <div className="text-4xl font-black text-green-600">{cr.toFixed(2)}%</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ธุรกิจ)" : "Business FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลการคำนวณนี้เป็นการประมาณการตามทฤษฎีเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุนหรือคำแนะนำทางกฎหมาย กรุณาปรึกษาที่ปรึกษาทางการเงินหรือนักบัญชีสำหรับการตัดสินใจขั้นสุดท้าย" : "This calculation is a theoretical estimate and does not constitute financial or legal advice. Please consult a financial advisor or accountant for your final decisions."} 
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 9. Inventory Turnover
export function InventoryTurnoverCalculator({ lang }: { lang: Lang }) {
  const [cogs, setCogs] = useLocalState("inv_cogs", "");
  const [avgInv, setAvg] = useLocalState("inv_avg", "");
  
  const turn = parseFloat(cogs) / parseFloat(avgInv);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "อัตราหมุนเวียนสินค้า" : "Inventory Turnover"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ต้นทุนขาย (COGS)" : "Cost of Goods Sold"}</label><input type="number" value={cogs} onChange={e=>setCogs(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "สินค้าคงคลังเฉลี่ย" : "Average Inventory"}</label><input type="number" value={avgInv} onChange={e=>setAvg(e.target.value)} className={inputClass} /></div>
      </div>
      {cogs && avgInv && !isNaN(turn) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "อัตราการหมุนเวียน (รอบ)" : "Turnover Ratio"}</p>
          <div className="text-4xl font-black text-green-600">{turn.toFixed(2)}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ธุรกิจ)" : "Business FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลการคำนวณนี้เป็นการประมาณการตามทฤษฎีเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุนหรือคำแนะนำทางกฎหมาย กรุณาปรึกษาที่ปรึกษาทางการเงินหรือนักบัญชีสำหรับการตัดสินใจขั้นสุดท้าย" : "This calculation is a theoretical estimate and does not constitute financial or legal advice. Please consult a financial advisor or accountant for your final decisions."} 
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

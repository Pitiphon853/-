"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, NumericInput } from "./shared";

// 1. Financial Ratios
export function FinancialRatioCalculator({ lang }: { lang: Lang }) {
  const [currentAssets, setCurrentAssets] = useLocalState("fr_ca", "1000000");
  const [currentLiabilities, setCurrentLiabilities] = useLocalState("fr_cl", "500000");
  const [totalLiabilities, setTotalLiabilities] = useLocalState("fr_tl", "2000000");
  const [totalEquity, setTotalEquity] = useLocalState("fr_te", "3000000");
  const [netIncome, setNetIncome] = useLocalState("fr_ni", "500000");
  const [revenue, setRevenue] = useLocalState("fr_rev", "5000000");

  const [result, setResult] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const ca = parseFloat(currentAssets);
    const cl = parseFloat(currentLiabilities);
    const tl = parseFloat(totalLiabilities);
    const te = parseFloat(totalEquity);
    const ni = parseFloat(netIncome);
    const rev = parseFloat(revenue);

    if (cl > 0 && te > 0 && rev > 0) {
      setResult({
        currentRatio: ca / cl,
        deRatio: tl / te,
        netMargin: (ni / rev) * 100,
        roe: (ni / te) * 100
      });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-400">{lang === "TH" ? "อัตราส่วนทางการเงิน" : "Financial Ratios"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
           <div><label className={labelClass}>{lang==="TH"?"สินทรัพย์หมุนเวียน":"Current Assets"}</label><NumericInput value={currentAssets} onChange={setCurrentAssets} required className={inputClass} /></div>
           <div><label className={labelClass}>{lang==="TH"?"หนี้สินหมุนเวียน":"Current Liabilities"}</label><NumericInput value={currentLiabilities} onChange={setCurrentLiabilities} required className={inputClass} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <div><label className={labelClass}>{lang==="TH"?"หนี้สินรวม":"Total Liabilities"}</label><NumericInput value={totalLiabilities} onChange={setTotalLiabilities} required className={inputClass} /></div>
           <div><label className={labelClass}>{lang==="TH"?"ส่วนของผู้ถือหุ้นรวม":"Total Equity"}</label><NumericInput value={totalEquity} onChange={setTotalEquity} required className={inputClass} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <div><label className={labelClass}>{lang==="TH"?"กำไรสุทธิ":"Net Income"}</label><NumericInput value={netIncome} onChange={setNetIncome} required className={inputClass} /></div>
           <div><label className={labelClass}>{lang==="TH"?"รายได้รวม (ยอดขาย)":"Total Revenue"}</label><NumericInput value={revenue} onChange={setRevenue} required className={inputClass} /></div>
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded hover:bg-green-600">{lang==="TH"?"คำนวณ":"Calculate"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 space-y-3">
           <div className="p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm">
             <div className="font-bold text-gray-700 dark:text-gray-300">Current Ratio (สภาพคล่อง)</div>
             <div className="text-2xl font-black text-green-600">{result.currentRatio.toFixed(2)} <span className="text-sm font-normal text-gray-500">({result.currentRatio >= 1 ? 'ดี':'ต้องระวัง'})</span></div>
           </div>
           <div className="p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm">
             <div className="font-bold text-gray-700 dark:text-gray-300">D/E Ratio (หนี้สินต่อทุน)</div>
             <div className="text-2xl font-black text-green-600">{result.deRatio.toFixed(2)} <span className="text-sm font-normal text-gray-500">({result.deRatio <= 2 ? 'ดี':'หนี้สูง'})</span></div>
           </div>
           <div className="p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm">
             <div className="font-bold text-gray-700 dark:text-gray-300">Net Profit Margin (อัตรากำไรสุทธิ)</div>
             <div className="text-2xl font-black text-green-600">{result.netMargin.toFixed(2)}%</div>
           </div>
           <div className="p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm">
             <div className="font-bold text-gray-700 dark:text-gray-300">ROE (ผลตอบแทนต่อส่วนผู้ถือหุ้น)</div>
             <div className="text-2xl font-black text-green-600">{result.roe.toFixed(2)}%</div>
           </div>
        </motion.div>
      )}
      <SEOFAQ title={lang==="TH"?"FAQ — อัตราส่วนการเงิน":"Financial Ratios FAQ"}>
        <FAQItem q={lang==="TH"?"Current Ratio ที่ดีควรอยู่ที่เท่าไหร่?":"What is a healthy current ratio?"} a={lang==="TH"?"ค่าที่ดีคือ 1.5-3.0 หมายความว่าบริษัทมีสภาพคล่องดี สามารถจ่ายหนี้ระยะสั้นได้ ถ้า < 1 คืออันตรายทางเงินสด ถ้า > 3 อาจแสดงว่าจัดสินทรัพย์ไม่มีประสิทธิภาพ | อ้างอิง: Brigham EF. (2021). Financial Management: Theory & Practice. Cengage.":"Ideal range is 1.5-3.0. Below 1 = liquidity risk. Above 3 may indicate inefficient asset use. Source: Brigham (2021) Financial Management."} />
        <FAQItem q={lang==="TH"?"ROE ที่ดีคือเท่าไหร่?":"What is a good ROE?"} a={lang==="TH"?"โดยทั่วไป ROE ที่สูงกว่า 15% ถือว่าดี Warren Buffett นิยมลงทุนในบริษัทที่มี ROE > 15% ต่อเนื่องหลายปี | อ้างอิง: Buffett W. (1987). Berkshire Hathaway Annual Shareholder Letter.":"Generally ROE above 15% is good. Warren Buffett prefers companies with consistently high ROE over many years. Source: Buffett (1987) Berkshire Letter."} />
      </SEOFAQ>
    </div>
  );
}

// 2. Marketplace Fee
export function MarketplaceFeeCalculator({ lang }: { lang: Lang }) {
  const [price, setPrice] = useLocalState("mp_price", "1000");
  const [cost, setCost] = useLocalState("mp_cost", "600");
  const [platform, setPlatform] = useLocalState("mp_plat", "shopee");
  const [result, setResult] = useState<any>(null);

  // Simplified typical fees in Thailand (approximate 5-10% range + payment fee)
  const platforms: any = {
    "shopee": { name: "Shopee", feeRate: 0.10, flat: 0 },
    "lazada": { name: "Lazada", feeRate: 0.10, flat: 0 },
    "tiktok": { name: "TikTok Shop", feeRate: 0.08, flat: 0 },
    "line": { name: "LINE Shopping", feeRate: 0.03, flat: 0 }
  };

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(price);
    const c = parseFloat(cost);
    if (p > 0) {
      const pData = platforms[platform];
      const fee = p * pData.feeRate;
      const net = p - fee;
      const profit = net - c;
      const margin = (profit / p) * 100;
      setResult({ fee, net, profit, margin });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-400">{lang === "TH" ? "ค่าธรรมเนียม Marketplace" : "Marketplace Fees"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "แพลตฟอร์ม" : "Platform"}</label>
          <select value={platform} onChange={e=>setPlatform(e.target.value)} className={`${inputClass} focus:ring-green-400`}>
             {Object.keys(platforms).map(k => <option key={k} value={k}>{platforms[k].name}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "ราคาขาย (บาท)" : "Selling Price"}</label><NumericInput value={price} onChange={setPrice} required className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "ต้นทุนสินค้า (บาท)" : "Product Cost"}</label><NumericInput value={cost} onChange={setCost} required className={inputClass} /></div>
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded hover:bg-green-600">{lang==="TH"?"คำนวณกำไรสุทธิ":"Calculate Net Profit"}</button>
      </form>
      
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 space-y-4">
           <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-xl text-center border border-green-200">
             <div className="text-sm text-gray-500 mb-1">{lang==="TH"?"กำไรสุทธิ":"Net Profit"}</div>
             <div className="text-4xl font-black text-green-600">฿{result.profit.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
             <div className="mt-2 text-sm text-green-700 bg-green-200/50 inline-block px-3 py-1 rounded-full">Margin: {result.margin.toFixed(2)}%</div>
           </div>
           <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
             <div className="p-3 bg-white dark:bg-white/5 border rounded">- {lang==="TH"?"โดนหักค่าธรรมเนียม":"Fee Deduction"}: ฿{result.fee.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
             <div className="p-3 bg-white dark:bg-white/5 border rounded">+ {lang==="TH"?"เงินเข้าบัญชี (สุทธิ)":"Net Received"}: ฿{result.net.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
           </div>
           <p className="text-xs text-gray-400 text-center">*{lang==="TH"?"เป็นเพียงการประมาณการแบบง่าย (เฉลี่ย 8-10%) ไม่รวมค่าส่ง/โปรโมชั่น":"This is a simplified estimation (approx 8-10%) excluding shipping/promos."}</p>
        </motion.div>
      )}
      <SEOFAQ title={lang==="TH"?"FAQ — ค่าธรรมเนียม Marketplace":"Marketplace Fees FAQ"}>
        <FAQItem q={lang==="TH"?"Shopee หักค่าธรรมเนียมกี่เปอร์เซ็นต์?":"How much does Shopee charge?"} a={lang==="TH"?"Shopee เรียกเก็บรวมประมาณ 6-10% ขึ้นกับหมวดหมู่สินค้า แบ่งเป็นค่า Commission + ค่าบริการชำระเงิน ผู้ขายใหม่อาจได้ส่วนลด 60-90 วันแรก | อ้างอิง: Shopee Seller Centre (2024) Fee Policy.":"Shopee charges approximately 6-10% total depending on category, split between commission and payment processing. New sellers may get discounts for first 60-90 days. Source: Shopee Seller Centre (2024)."} />
        <FAQItem q={lang==="TH"?"ควรเลือกแพลตฟอร์มไหนดี?":"Which marketplace platform should I choose?"} a={lang==="TH"?"ขึ้นอยู่กับกลุ่มเป้าหมาย: Shopee เหมาะกับสินค้าราคาต่ำ-กลาง / Lazada เหมาะกับสินค้าแบรนด์เนม / TikTok Shop เหมาะกับสินค้าไวรัลที่โปรโมทผ่านวิดีโอ | อ้างอิง: eCommerceIQ (2023) SEA Report.":"Depends on target: Shopee for low-mid price items / Lazada for branded products / TikTok Shop for viral products via video. Source: eCommerceIQ (2023) SEA Report."} />
        <FAQItem q={lang==="TH"?"มีวิธีลดค่าธรรมเนียมไหม?":"How to reduce marketplace fees?"} a={lang==="TH"?"1) เข้าร่วม Preferred Seller 2) ขาย Bundle เพิ่ม AOV 3) ใช้ระบบจัดส่งของแพลตฟอร์ม 4) เข้าร่วมแคมเปญเพื่อเพิ่มยอดขาย | อ้างอิง: LazMall/Shopee Mall Guidelines.":"1) Join Preferred Seller programs 2) Sell bundles to increase AOV 3) Use platform logistics 4) Join campaigns. Source: LazMall/Shopee Mall Guidelines."} />
      </SEOFAQ>
    </div>
  );
}

// 3. Safety Stock
export function SafetyStockCalculator({ lang }: { lang: Lang }) {
  const [maxLead, setMaxLead] = useLocalState("ss_max_l", "14");
  const [avgLead, setAvgLead] = useLocalState("ss_avg_l", "10");
  const [maxSales, setMaxSales] = useLocalState("ss_max_s", "50");
  const [avgSales, setAvgSales] = useLocalState("ss_avg_s", "30");
  const [result, setResult] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const ml = parseFloat(maxLead);
    const al = parseFloat(avgLead);
    const ms = parseFloat(maxSales);
    const as = parseFloat(avgSales);
    if (ml > 0 && al > 0 && ms > 0 && as > 0) {
      const safetyStock = (ms * ml) - (as * al);
      const reorderPoint = (as * al) + safetyStock;
      setResult({ safetyStock: Math.max(0, Math.ceil(safetyStock)), reorderPoint: Math.max(0, Math.ceil(reorderPoint)) });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-400">{lang === "TH" ? "จุดสั่งซื้อ & สต็อกสำรอง" : "Reorder Point & Safety Stock"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang==="TH"?"ยอดขายสูงสุด/วัน":"Max Daily Sales"}</label><NumericInput value={maxSales} onChange={setMaxSales} required className={inputClass} /></div>
          <div><label className={labelClass}>{lang==="TH"?"ยอดขายเฉลี่ย/วัน":"Avg Daily Sales"}</label><NumericInput value={avgSales} onChange={setAvgSales} required className={inputClass} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang==="TH"?"รอสินค้านานสุด (วัน)":"Max Lead Time (Days)"}</label><input type="number" value={maxLead} onChange={e=>setMaxLead(e.target.value)} required className={inputClass} /></div>
          <div><label className={labelClass}>{lang==="TH"?"รอสินค้าเฉลี่ย (วัน)":"Avg Lead Time (Days)"}</label><input type="number" value={avgLead} onChange={e=>setAvgLead(e.target.value)} required className={inputClass} /></div>
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded hover:bg-green-600">{lang==="TH"?"คำนวณ":"Calculate"}</button>
      </form>
      
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 grid grid-cols-2 gap-4">
           <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-xl text-center border border-green-200">
             <div className="text-sm text-gray-500 mb-1">{lang==="TH"?"สต็อกสำรองกันของขาด":"Safety Stock"}</div>
             <div className="text-3xl font-black text-green-600">{result.safetyStock} <span className="text-lg font-normal">ชิ้น</span></div>
           </div>
           <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-xl text-center border border-blue-200">
             <div className="text-sm text-gray-500 mb-1">{lang==="TH"?"จุดที่ต้องสั่งซื้อของเพิ่ม":"Reorder Point"}</div>
             <div className="text-3xl font-black text-blue-600">{result.reorderPoint} <span className="text-lg font-normal">ชิ้น</span></div>
           </div>
        </motion.div>
      )}
      <SEOFAQ title={lang==="TH"?"FAQ — สต็อกสำรอง & จุดสั่งซื้อ":"Safety Stock FAQ"}>
        <FAQItem q={lang==="TH"?"Safety Stock คืออะไร?":"What is Safety Stock?"} a={lang==="TH"?"Safety Stock คือจำนวนสินค้าสำรองป้องกันการขาดสต็อกเมื่อยอดขายหรือ Lead Time ผันผวนเกินคาด สำคัญเพราะสินค้าขาดสต็อก = เสียรายได้ + เสียลูกค้าระยะยาว | อ้างอิง: Silver EA, Pyke DF. (2016). Inventory and Production Management. Wiley.":"Safety Stock is buffer inventory preventing stockouts when demand or lead time exceeds expectations. Source: Silver EA, Pyke DF. (2016) Inventory and Production Management."} />
        <FAQItem q={lang==="TH"?"Reorder Point คำนวณยังไง?":"How is Reorder Point calculated?"} a={lang==="TH"?"สูตร: Reorder Point = (ยอดขายเฉลี่ย/วัน × Lead Time เฉลี่ย) + Safety Stock เมื่อสต็อกลดลงถึงจุดนี้ ให้สั่งซื้อเพิ่มทันที | อ้างอิง: Chopra S. (2019). Supply Chain Management. Pearson.":"Formula: Reorder Point = (Avg Daily Sales × Avg Lead Time) + Safety Stock. When inventory drops to this level, place a new order immediately. Source: Chopra S. (2019)."} />
        <FAQItem q={lang==="TH"?"ถ้าเก็บสต็อกมากเกินไปมีผลเสียอย่างไร?":"What are the downsides of excess inventory?"} a={lang==="TH"?"1) ต้นทุนจมสูง (20-30% ต่อปีของมูลค่าสต็อก) 2) เสี่ยงสินค้าเสื่อมหรือตกยุค 3) ค่าเช่าคลังเพิ่ม | อ้างอิง: Ballou RH. (2004). Business Logistics Management.":"1) High carrying cost (20-30%/year) 2) Risk of obsolescence 3) Warehouse costs increase. Source: Ballou RH. (2004) Business Logistics Management."} />
      </SEOFAQ>
    </div>
  );
}

// 4. Shipping Cost Comparison
export function ShippingCostCalculator({ lang }: { lang: Lang }) {
  const [weight, setWeight] = useLocalState("shp_w", "1");
  const [result, setResult] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    if (w > 0) {
      // Very rough estimations for Thai domestic shipping
      setResult([
        { name: "Thailand Post (EMS)", cost: 40 + (w * 15) },
        { name: "Thailand Post (Reg)", cost: 20 + (w * 10) },
        { name: "Kerry Express", cost: 45 + (w * 20) },
        { name: "J&T Express", cost: 35 + (w * 12) },
        { name: "Flash Express", cost: 30 + (w * 12) }
      ].sort((a,b) => a.cost - b.cost));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-400">{lang === "TH" ? "เปรียบเทียบค่าส่งพัสดุ" : "Shipping Cost Comparison"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "น้ำหนัก (kg)" : "Weight (kg)"}</label>
          <input type="number" step="0.1" value={weight} onChange={e=>setWeight(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded hover:bg-green-600">{lang==="TH"?"เปรียบเทียบราคา":"Compare Rates"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 space-y-2">
           <p className="text-sm text-gray-500 mb-4">{lang==="TH"?"*ราคาประมาณการเบื้องต้น (ไม่รวมพื้นที่ห่างไกล)":"*Rough estimations (excluding remote areas)"}</p>
           {result.map((r:any, i:number) => (
           <div key={r.name} className={`flex justify-between p-4 border rounded-xl shadow-sm ${i === 0 ? 'bg-green-50 border-green-300' : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10'}`}>
                <span className="font-bold text-gray-700 dark:text-gray-300">{r.name}</span>
                <span className="text-green-600 font-black">฿{Math.round(r.cost)}</span>
             </div>
           ))}
         </motion.div>
      )}
      <SEOFAQ title={lang==="TH"?"FAQ — ค่าส่งพัสดุ":"Shipping Cost FAQ"}>
        <FAQItem q={lang==="TH"?"ส่งพัสดุขนส่งไหนถูกที่สุดในไทย?":"Which courier is cheapest in Thailand?"} a={lang==="TH"?"โดยทั่วไป Flash Express และ J&T Express มีราคาถูกที่สุดสำหรับพัสดุน้ำหนักเบา (< 3 kg) เริ่มต้นที่ 19-35 บาท สำหรับพัสดุหนัก Kerry Express และ EMS ให้บริการครอบคลุมกว่า | อ้างอิง: เว็บไซต์ผู้ให้บริการ 2024.":"Flash Express and J&T are cheapest for lightweight parcels (< 3kg) starting at 19-35 THB. For heavier items, Kerry Express and EMS offer better coverage. Source: Carrier websites 2024."} />
        <FAQItem q={lang==="TH"?"น้ำหนักตามปริมาตร (Volumetric Weight) คืออะไร?":"What is Volumetric Weight?"} a={lang==="TH"?"ขนส่งคิดค่าส่งจากน้ำหนักจริง หรือน้ำหนักตามปริมาตร อันไหนมากกว่าใช้อันนั้น สูตร: (กว้าง × ยาว × สูง cm) ÷ 5,000 = น้ำหนักตามปริมาตร (kg) | อ้างอิง: IATA Dimensional Weight Standard.":"Carriers charge based on actual or volumetric weight, whichever is greater. Formula: (L × W × H cm) ÷ 5,000 = volumetric weight (kg). Source: IATA Dimensional Weight Standard."} />
      </SEOFAQ>
    </div>
  );
}

// 5. Return Rate Impact
export function ReturnRateCalculator({ lang }: { lang: Lang }) {
  const [sales, setSales] = useLocalState("ret_sales", "100");
  const [price, setPrice] = useLocalState("ret_price", "500");
  const [cost, setCost] = useLocalState("ret_cost", "250");
  const [rate, setRate] = useLocalState("ret_rate", "5");
  const [shippingCost, setShippingCost] = useLocalState("ret_shp", "50");
  const [result, setResult] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const s = parseFloat(sales);
    const p = parseFloat(price);
    const c = parseFloat(cost);
    const r = parseFloat(rate) / 100;
    const sc = parseFloat(shippingCost);

    if (s > 0) {
      const returnItems = s * r;
      const normalProfitPerItem = p - c - sc;
      const lostProfit = returnItems * normalProfitPerItem;
      const extraShippingLoss = returnItems * sc * 2; // return shipping + reshipping maybe
      
      const totalProfitIfNoReturn = s * normalProfitPerItem;
      const actualProfit = totalProfitIfNoReturn - extraShippingLoss; // Assuming item is resalable but shipping is lost

      setResult({ returnItems, lostProfit, extraShippingLoss, actualProfit });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-400">{lang === "TH" ? "ผลกระทบจากการตีกลับ/คืนสินค้า" : "Return Rate Impact"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
           <div><label className={labelClass}>{lang==="TH"?"จำนวนออเดอร์ทั้งหมด":"Total Orders"}</label><NumericInput value={sales} onChange={setSales} required className={inputClass} /></div>
           <div><label className={labelClass}>{lang==="TH"?"อัตราการตีกลับ/คืน (%)":"Return Rate (%)"}</label><input type="number" value={rate} onChange={e=>setRate(e.target.value)} required className={inputClass} /></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
           <div><label className={labelClass}>{lang==="TH"?"ราคาขาย":"Price"}</label><NumericInput value={price} onChange={setPrice} required className={inputClass} /></div>
           <div><label className={labelClass}>{lang==="TH"?"ต้นทุน/ชิ้น":"Cost/Item"}</label><NumericInput value={cost} onChange={setCost} required className={inputClass} /></div>
           <div><label className={labelClass}>{lang==="TH"?"ค่าส่ง/ชิ้น":"Ship/Item"}</label><NumericInput value={shippingCost} onChange={setShippingCost} required className={inputClass} /></div>
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded hover:bg-green-600">{lang==="TH"?"คำนวณ":"Calculate"}</button>
      </form>
      
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 space-y-4">
           <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-xl text-center border border-red-200">
             <div className="text-sm text-red-500 mb-1">{lang==="TH"?"ค่าส่งที่สูญเสียไปฟรีๆ (บาท)":"Lost Shipping Costs"}</div>
             <div className="text-4xl font-black text-red-600">฿{Math.round(result.extraShippingLoss).toLocaleString()}</div>
           </div>
           <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
              {lang==="TH"?"จาก":"From"} {sales} {lang==="TH"?"ออเดอร์ จะมีการตีกลับประมาณ":"orders, approx returns:"} <span className="font-bold text-red-500">{Math.round(result.returnItems)} {lang==="TH"?"ชิ้น":"items"}</span>
           </div>
        </motion.div>
      )}
      <SEOFAQ title={lang==="TH"?"FAQ — อัตราการคืนสินค้า":"Return Rate FAQ"}>
        <FAQItem q={lang==="TH"?"อัตราการคืนสินค้าเฉลี่ยในอีคอมเมิร์ซไทยอยู่ที่เท่าไร?":"What's the average return rate for Thai e-commerce?"} a={lang==="TH"?"ในไทยอัตราคืนสินค้าเฉลี่ย 3-8%: แฟชั่น 15-30% / อิเล็กทรอนิกส์ 5-10% / อาหาร < 3% | อ้างอิง: Bain & Company (2022) SEA E-commerce Report.":"Thai average is 3-8% by category: Fashion 15-30% / Electronics 5-10% / Food < 3%. Source: Bain & Company (2022)."} />
        <FAQItem q={lang==="TH"?"วิธีลดอัตราการคืนสินค้า?":"How to reduce return rates?"} a={lang==="TH"?"1) ใส่รูปสินค้าจริงชัดเจน 2) ข้อมูลขนาด/สเปคละเอียด 3) Size Chart สำหรับเสื้อผ้า 4) QC ก่อนส่ง 5) แพ็คดี ช่วยลดอัตราคืนได้ถึง 50% | อ้างอิง: Narvar (2023) State of Returns Report.":"1) Clear real photos 2) Detailed specs 3) Size charts 4) Pre-shipment QC 5) Proper packaging. Reduces returns up to 50%. Source: Narvar (2023)."} />
      </SEOFAQ>
    </div>
  );
}

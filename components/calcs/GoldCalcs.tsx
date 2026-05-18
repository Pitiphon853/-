"use client";

import React, { useState, useEffect } from "react";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, RelatedCalcs } from "./shared";
import { TrendingUp, TrendingDown, DollarSign, RefreshCw, Calculator, Activity, Coins, ShieldAlert } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface GoldData {
  updateTime: string;
  thaiGold: {
    goldBar: { buy: number; sell: number; };
    goldOrnament: { buy: number; sell: number; };
  };
  globalSpot: {
    xauUsd: string;
    exchangeRateThb: string;
  };
  history: Array<{ date: string; price: number; }>;
}

export function GoldPriceCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [data, setData] = useState<GoldData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Calculator State
  const [calcType, setCalcType] = useLocalState("gold-calc-type", "buy"); // buy, sell
  const [goldType, setGoldType] = useLocalState("gold-type", "bar"); // bar, ornament
  const [weightType, setWeightType] = useLocalState("gold-weight-type", "baht"); // baht, salung, gram
  const [weightValue, setWeightValue] = useLocalState("gold-weight-value", "1");

  const fetchGoldData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/gold');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      if (json.status === 'success') {
        setData(json.data);
      } else {
        throw new Error('API Error');
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoldData();
  }, []);

  // Calculation Logic
  const getCalculatedPrice = () => {
    if (!data || !weightValue || isNaN(Number(weightValue))) return 0;
    
    let basePricePerBaht = 0;
    if (calcType === "buy") {
      basePricePerBaht = goldType === "bar" ? data.thaiGold.goldBar.sell : data.thaiGold.goldOrnament.sell;
    } else {
      basePricePerBaht = goldType === "bar" ? data.thaiGold.goldBar.buy : data.thaiGold.goldOrnament.buy;
    }

    let multiplier = 0;
    const val = Number(weightValue);
    if (weightType === "baht") multiplier = val;
    else if (weightType === "salung") multiplier = val / 4;
    else if (weightType === "gram") multiplier = val / 15.244;

    return basePricePerBaht * multiplier;
  };

  const calculatedResult = getCalculatedPrice();

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      
      {/* Header Section */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mb-4">
          <Coins className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "ราคาทองคำวันนี้ & โปรแกรมคำนวณ" : "Live Gold Price & Calculator"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "เช็คราคาทองคำแบบ Real-time, ดูกราฟแนวโน้ม และคำนวณราคาทองรูปพรรณ/ทองแท่ง" : "Real-time Thai gold prices, charts, and calculator."}</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-yellow-600">
          <RefreshCw className="w-10 h-10 animate-spin mb-4" />
          <p>{lang === "TH" ? "กำลังดึงข้อมูลราคาทองคำ..." : "Fetching live data..."}</p>
        </div>
      ) : error || !data ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-6 rounded-2xl text-center border border-red-200">
          <ShieldAlert className="w-10 h-10 mx-auto mb-2" />
          <p>{lang === "TH" ? "ไม่สามารถดึงข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง" : "Failed to load data. Please try again."}</p>
          <button onClick={fetchGoldData} className="mt-4 px-6 py-2 bg-red-100 dark:bg-red-800 rounded-full hover:bg-red-200 transition-colors">
            {lang === "TH" ? "ลองใหม่" : "Retry"}
          </button>
        </div>
      ) : (
        <>
          {/* Real-time Price Board */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-3xl p-6 md:p-8 shadow-sm border border-yellow-200 dark:border-yellow-700/50">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center gap-3">
                <Activity className="text-yellow-600 dark:text-yellow-400 w-6 h-6" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {lang === "TH" ? "ประกาศราคาทองคำ (สมาคมค้าทองคำ)" : "Thai Gold Traders Association"}
                </h3>
              </div>
              <div className="text-sm bg-white/50 dark:bg-black/20 px-4 py-2 rounded-full font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <RefreshCw className="w-3 h-3 text-yellow-600" />
                {lang === "TH" ? `อัปเดตเมื่อ: ${data.updateTime}` : `Updated: ${data.updateTime}`}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gold Bar */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h4 className="text-lg font-bold mb-4 text-center pb-4 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                  {lang === "TH" ? "ทองคำแท่ง (96.5%)" : "Gold Bar (96.5%)"}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{lang === "TH" ? "รับซื้อ (Buy)" : "Buy Price"}</p>
                    <p className="text-2xl font-bold text-green-600">{data.thaiGold.goldBar.buy.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{lang === "TH" ? "ขายออก (Sell)" : "Sell Price"}</p>
                    <p className="text-2xl font-bold text-red-500">{data.thaiGold.goldBar.sell.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Gold Ornament */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h4 className="text-lg font-bold mb-4 text-center pb-4 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                  {lang === "TH" ? "ทองรูปพรรณ (96.5%)" : "Gold Ornament (96.5%)"}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{lang === "TH" ? "รับซื้อ (Buy)" : "Buy Price"}</p>
                    <p className="text-2xl font-bold text-green-600">{data.thaiGold.goldOrnament.buy.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{lang === "TH" ? "ขายออก (Sell)" : "Sell Price"}</p>
                    <p className="text-2xl font-bold text-red-500">{data.thaiGold.goldOrnament.sell.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Spot Row */}
            <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-8 bg-white/60 dark:bg-black/20 p-4 rounded-xl border border-white/40 dark:border-white/5">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ราคาทองคำโลก (Spot Gold):" : "Spot Gold:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">${data.globalSpot.xauUsd} / oz</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "อัตราแลกเปลี่ยน:" : "Exchange Rate:"}</span>
                <span className="font-bold text-gray-900 dark:text-white">฿{data.globalSpot.exchangeRateThb} / $1</span>
              </div>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-6 h-6 text-indigo-500" />
                <h3 className="text-xl font-bold">{lang === "TH" ? "โปรแกรมคำนวณราคาทอง" : "Gold Calculator"}</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>{lang === "TH" ? "ความต้องการ (Action)" : "Action"}</label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <button onClick={() => setCalcType("buy")} className={`py-3 rounded-xl font-bold transition-all border-2 ${calcType === "buy" ? 'border-red-500 bg-red-50 text-red-600 dark:bg-red-900/30' : 'border-gray-200 text-gray-500 hover:border-red-200'}`}>
                      {lang === "TH" ? "ซื้อทอง (จ่ายเงิน)" : "Buy Gold"}
                    </button>
                    <button onClick={() => setCalcType("sell")} className={`py-3 rounded-xl font-bold transition-all border-2 ${calcType === "sell" ? 'border-green-500 bg-green-50 text-green-600 dark:bg-green-900/30' : 'border-gray-200 text-gray-500 hover:border-green-200'}`}>
                      {lang === "TH" ? "ขายทอง (รับเงิน)" : "Sell Gold"}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    * {lang === "TH" ? "ราคาซื้อทอง จะอิงจากราคาขายออกของร้าน / ราคาขายทอง จะอิงจากราคารับซื้อของร้าน" : "Buying uses shop's sell price, selling uses shop's buy price."}
                  </p>
                </div>

                <div>
                  <label className={labelClass}>{lang === "TH" ? "ประเภททอง (Gold Type)" : "Gold Type"}</label>
                  <select value={goldType} onChange={e => setGoldType(e.target.value)} className={inputClass}>
                    <option value="bar">{lang === "TH" ? "ทองคำแท่ง (Gold Bar)" : "Gold Bar"}</option>
                    <option value="ornament">{lang === "TH" ? "ทองรูปพรรณ (Gold Ornament)" : "Gold Ornament"}</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{lang === "TH" ? "จำนวน (Amount)" : "Amount"}</label>
                    <input type="number" value={weightValue} onChange={e => setWeightValue(e.target.value)} className={inputClass} placeholder="1" min="0" step="0.01" />
                  </div>
                  <div>
                    <label className={labelClass}>{lang === "TH" ? "หน่วยน้ำหนัก (Unit)" : "Unit"}</label>
                    <select value={weightType} onChange={e => setWeightType(e.target.value)} className={inputClass}>
                      <option value="baht">{lang === "TH" ? "บาท (Baht)" : "Baht (15.244g)"}</option>
                      <option value="salung">{lang === "TH" ? "สลึง (Salung)" : "Salung (3.811g)"}</option>
                      <option value="gram">{lang === "TH" ? "กรัม (Gram)" : "Gram"}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col justify-center items-center text-center">
              <h4 className="text-indigo-100 font-medium mb-4 text-lg">
                {lang === "TH" ? (calcType === "buy" ? "คุณจะต้องเตรียมเงินประมาณ" : "คุณจะได้รับเงินประมาณ") : (calcType === "buy" ? "Estimated Cost" : "Estimated Return")}
              </h4>
              <div className="text-5xl md:text-6xl font-black mb-4 tracking-tight text-white flex items-center justify-center gap-2">
                <span className="text-3xl font-normal opacity-80">฿</span>
                {calculatedResult.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
              <p className="text-sm text-indigo-200 max-w-sm">
                {lang === "TH" 
                  ? `* เป็นการประเมินราคาเบื้องต้นตามน้ำหนัก ${weightValue} ${weightType === 'baht' ? 'บาท' : weightType === 'salung' ? 'สลึง' : 'กรัม'} (ยังไม่รวมส่วนลด หรือค่ากำเหน็จเพิ่มเติมของแต่ละร้าน)`
                  : `* Estimate based on ${weightValue} ${weightType}. May not include shop-specific premiums.`}
              </p>
            </div>
          </div>

          {/* Historical Chart Section */}
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
              <h3 className="text-xl font-bold">{lang === "TH" ? "กราฟแนวโน้มราคาทองย้อนหลัง 30 วัน" : "30-Day Trend Chart"}</h3>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.history} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(val) => {
                      const d = new Date(val);
                      return `${d.getDate()}/${d.getMonth()+1}`;
                    }}
                    stroke="#9ca3af"
                    fontSize={12}
                    tickMargin={10}
                  />
                  <YAxis 
                    domain={['auto', 'auto']}
                    stroke="#9ca3af"
                    fontSize={12}
                    tickFormatter={(val) => val.toLocaleString()}
                    width={60}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => [`฿${Number(value).toLocaleString()}`, lang === "TH" ? 'ราคา' : 'Price']}
                    labelFormatter={(label) => {
                      const d = new Date(label);
                      return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    dot={{ r: 2, fill: '#f59e0b' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* SEO FAQ */}
      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ราคาทองคำ)" : "Gold Price FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "ราคาทองแท่งกับทองรูปพรรณต่างกันอย่างไร?" : "Difference between Gold Bar and Ornament?"} 
          a={lang === "TH" ? "ทองคำแท่งจะไม่มีค่าแรงในการขึ้นรูป (หรือมีค่าบล็อกแต่น้อยมาก) ทำให้ราคาซื้อขายถูกกว่าทองรูปพรรณที่ต้องบวก 'ค่ากำเหน็จ' เข้าไปด้วย แต่ทองรูปพรรณสามารถนำมาสวมใส่เป็นเครื่องประดับได้" : "Gold Bars don't have high craftsmanship fees (premium), making them cheaper to trade. Ornaments have a 'premium' (Kumned) added for craftsmanship."} 
        />
        <FAQItem 
          q={lang === "TH" ? "น้ำหนักทอง 1 บาท เท่ากับกี่กรัม?" : "How many grams is 1 Baht of gold?"} 
          a={lang === "TH" ? "ตามมาตรฐานสมาคมค้าทองคำแห่งประเทศไทย ทองคำแท่ง 1 บาท หนัก 15.244 กรัม ส่วนทองรูปพรรณ 1 บาท หนัก 15.16 กรัม (โดยประมาณ)" : "According to Thai standards, 1 Baht Gold Bar = 15.244 grams. 1 Baht Gold Ornament = 15.16 grams."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ทองรูปพรรณขายคืนโดนหักเท่าไหร่?" : "How much is deducted when selling ornaments?"} 
          a={lang === "TH" ? "โดยทั่วไปหากนำทองรูปพรรณไปขายคืนร้านที่ซื้อมา จะถูกหักประมาณ 5% จากราคารับซื้อทองคำแท่งในวันนั้น (ตามการคุ้มครองผู้บริโภค) แต่หากขายต่างร้านอาจโดนหักมากกว่านี้" : "Typically, selling an ornament back to the same shop will result in a ~5% deduction from the day's Gold Bar buy price."} 
        />
        <FAQItem 
          q={lang === "TH" ? "Gold Spot คืออะไร?" : "What is Spot Gold?"} 
          a={lang === "TH" ? "Gold Spot คือราคาทองคำในตลาดโลก (ซื้อขายเป็นดอลลาร์สหรัฐต่อทรอยออนซ์) ซึ่งราคาทองคำในไทยจะอิงจาก Gold Spot นี้ ร่วมกับอัตราแลกเปลี่ยนเงินบาท (USD/THB)" : "Spot Gold is the global market price for gold (USD per Troy Ounce). Thai prices are calculated based on Spot Gold and the USD/THB exchange rate."} 
        />
      </SEOFAQ>
      <RelatedCalcs links={[{id: "compound-interest", name: "Compound Interest"}, {id: "vat", name: "VAT Calculator"}]} lang={lang} setCalc={setCalc} />
    </div>
  );
}

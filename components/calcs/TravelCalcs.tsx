"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass , SEOFAQ, FAQItem } from "./shared";

// 1. Time Zone
export function TimeZoneConverter({ lang }: { lang: Lang }) {
  return <div><h2 className="text-3xl font-black mb-2 text-blue-600">Time Zone Converter (WIP)</h2></div>;
}

// 2. Travel Budget
export function TravelBudgetCalculator({ lang }: { lang: Lang }) {
  const [flights, setFlights] = useLocalState("tb_fl", "");
  const [hotel, setHotel] = useLocalState("tb_htl", "");
  const [daily, setDaily] = useLocalState("tb_day", "");
  const [days, setDays] = useLocalState("tb_days", "");
  
  const total = parseFloat(flights) + parseFloat(hotel) + (parseFloat(daily) * parseFloat(days));

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600">{lang === "TH" ? "งบท่องเที่ยว" : "Travel Budget"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ค่าเดินทาง (ตั๋วเครื่องบิน/รถ)" : "Transportation (Flights/Train)"}</label><input type="number" value={flights} onChange={e=>setFlights(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ค่าที่พัก (รวมทั้งหมด)" : "Total Accommodation"}</label><input type="number" value={hotel} onChange={e=>setHotel(e.target.value)} className={inputClass} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "ค่ากินเที่ยวต่อวัน" : "Daily Budget (Food/Fun)"}</label><input type="number" value={daily} onChange={e=>setDaily(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "จำนวนวัน" : "Number of Days"}</label><input type="number" value={days} onChange={e=>setDays(e.target.value)} className={inputClass} /></div>
        </div>
      </div>
      {flights && hotel && daily && days && !isNaN(total) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-blue-50 rounded-xl text-center">
          <p>{lang === "TH" ? "งบประมาณรวม" : "Total Budget"}</p>
          <div className="text-4xl font-black text-blue-600">{total.toLocaleString()}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — เวลาต่างประเทศ":"Time Zone FAQ"}>
          <FAQItem q={lang==="TH"?"ประเทศไทยใช้เวลา UTC+7 หมายความว่าอย่างไร?":"What does Thailand's UTC+7 mean?"} a={lang==="TH"?"ไทยใช้เวลามาตรฐาน UTC+7 (ICT - Indochina Time) เร็วกว่า London 7 ชม. ช้ากว่า Tokyo 2 ชม. เร็วกว่า New York 12 ชม. (EST) ไทยไม่มี Daylight Saving Time (DST) | อ้างอิง: IERS — Time Zone Database; สถาบันมาตรวิทยาแห่งชาติ — เวลามาตรฐานประเทศไทย.":"Thailand uses UTC+7 (ICT). 7 hrs ahead of London, 2 hrs behind Tokyo, 12 hrs ahead of New York (EST). Thailand has no DST. | Source: IERS Time Zone DB; Thai National Metrology Institute."} />
          <FAQItem q={lang==="TH"?"Jet Lag คืออะไร? แก้อย่างไร?":"What is jet lag? How to fix it?"} a={lang==="TH"?"Jet Lag เกิดจากนาฬิกาชีวภาพ (Circadian Rhythm) ไม่ตรงกับเวลาท้องถิ่น ร่างกายปรับตัวได้ ~1 ชม./วัน เดินทาง 6 ชม. ใช้เวลาปรับ ~6 วัน วิธีแก้: 1) ปรับเวลานอนล่วงหน้า 2) รับแสงแดดเช้า 3) ดื่มน้ำมาก 4) หลีกเลี่ยงคาเฟอีน/แอลกอฮอล์ | อ้างอิง: Mayo Clinic — Jet Lag Disorder; NASA — Circadian Rhythm Research.":"Jet lag occurs when circadian rhythm mismatches local time. Body adjusts ~1 hr/day. Fix: 1) Pre-adjust sleep 2) Morning sunlight 3) Hydrate 4) Avoid caffeine/alcohol. | Source: Mayo Clinic; NASA Circadian Research."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 3. Flight Time
export function FlightTimeCalculator({ lang }: { lang: Lang }) {
  const [dist, setDist] = useLocalState("ft_dist", "");
  const [speed, setSpeed] = useLocalState("ft_spd", "900"); // typical plane km/h
  
  const hours = parseFloat(dist) / parseFloat(speed);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600">{lang === "TH" ? "เวลาบิน" : "Flight Time"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ระยะทาง (km)" : "Distance (km)"}</label><input type="number" value={dist} onChange={e=>setDist(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ความเร็วเครื่องบิน (km/h)" : "Plane Speed (km/h)"}</label><input type="number" value={speed} onChange={e=>setSpeed(e.target.value)} className={inputClass} /></div>
      </div>
      {dist && speed && !isNaN(hours) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-blue-50 rounded-xl text-center">
          <p>{lang === "TH" ? "ใช้เวลาเดินทางประมาณ" : "Estimated Flight Time"}</p>
          <div className="text-4xl font-black text-blue-600">{hours.toFixed(1)} {lang==="TH"?"ชั่วโมง":"Hours"}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — งบท่องเที่ยว":"Travel Budget FAQ"}>
          <FAQItem q={lang==="TH"?"งบเที่ยวต่างประเทศควรเตรียมเท่าไร?":"How much budget for international travel?"} a={lang==="TH"?"เอเชีย (ลาว/เวียดนาม/กัมพูชา): 1,000-2,000 บาท/วัน | ญี่ปุ่น/เกาหลี: 3,000-5,000 บาท/วัน | ยุโรป: 4,000-8,000 บาท/วัน | อเมริกา: 5,000-10,000 บาท/วัน (ไม่รวมตั๋วเครื่องบิน) ควรซื้อประกันเดินทาง 200-500 บาท/ทริป | อ้างอิง: Numbeo — Cost of Living Index; Budget Your Trip — Average Daily Travel Costs.":"SE Asia: 1-2K THB/day, Japan/Korea: 3-5K, Europe: 4-8K, America: 5-10K (ex flights). Get travel insurance 200-500 THB/trip. | Source: Numbeo; Budget Your Trip."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 4. Packing List
export function PackingListGenerator({ lang }: { lang: Lang }) {
  return <div><h2 className="text-3xl font-black mb-2 text-blue-600">Packing List (WIP)</h2></div>;
}

// 5. Road Trip
export function RoadTripCostCalculator({ lang }: { lang: Lang }) {
  const [dist, setDist] = useLocalState("rt_dist", "");
  const [eff, setEff] = useLocalState("rt_eff", "15"); // km/l
  const [gas, setGas] = useLocalState("rt_gas", "35"); // price/l
  const [tolls, setTolls] = useLocalState("rt_tolls", "0");
  
  const cost = ((parseFloat(dist) / parseFloat(eff)) * parseFloat(gas)) + parseFloat(tolls);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600">{lang === "TH" ? "ค่าน้ำมัน Road Trip" : "Road Trip Cost"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ระยะทางไป-กลับ (km)" : "Total Distance (km)"}</label><input type="number" value={dist} onChange={e=>setDist(e.target.value)} className={inputClass} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "อัตราสิ้นเปลือง (km/l)" : "Fuel Efficiency (km/l)"}</label><input type="number" value={eff} onChange={e=>setEff(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "ราคาน้ำมัน (ต่อลิตร)" : "Gas Price (per liter)"}</label><input type="number" value={gas} onChange={e=>setGas(e.target.value)} className={inputClass} /></div>
        </div>
        <div><label className={labelClass}>{lang === "TH" ? "ค่าทางด่วน/จอดรถ" : "Tolls / Parking"}</label><input type="number" value={tolls} onChange={e=>setTolls(e.target.value)} className={inputClass} /></div>
      </div>
      {dist && eff && gas && tolls && !isNaN(cost) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-blue-50 rounded-xl text-center">
          <p>{lang === "TH" ? "ค่าใช้จ่ายทั้งหมด" : "Total Cost"}</p>
          <div className="text-4xl font-black text-blue-600">{cost.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ค่าเดินทางรถยนต์":"Road Trip FAQ"}>
          <FAQItem q={lang==="TH"?"ขับรถไกลเฉลี่ยค่าใช้จ่ายเท่าไร?":"What does a road trip typically cost?"} a={lang==="TH"?"ค่าน้ำมัน: รถเก๋ง ~7 ลิตร/100กม. × 40 บาท/ลิตร = 2.8 บาท/กม. | ค่าทางด่วน กรุงเทพ-หัวหิน ~200 บาท | ค่าผ่านทาง Motor Way กรุงเทพ-โคราช ~180 บาท | ควรพัก 15-30 นาทีทุก 2 ชม. เพื่อความปลอดภัย | อ้างอิง: กรมทางหลวง — อัตราค่าผ่านทาง; กรมธุรกิจพลังงาน — ราคาน้ำมัน.":"Fuel cost: Sedan ~7L/100km × 40 THB/L = 2.8 THB/km. Toll: BKK-Hua Hin ~200 THB, BKK-Korat ~180 THB. Rest 15-30 min every 2 hrs for safety. | Source: Thai Dept. of Highways; Dept. of Energy Business."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 6. น้ำหนักกระเป๋าเกินหรือไม่ (Baggage Weight Checker)
export function BaggageWeightChecker({ lang }: { lang: Lang }) {
  const [weight, setWeight] = useLocalState("bag_w", "20");
  const [airline, setAirline] = useLocalState("bag_air", "airasia_carryon");
  const [result, setResult] = useState<any>(null);

  const limits: any = {
    "airasia_carryon": { name: "AirAsia (Carry-on)", limit: 7, fee: 500, feeUnit: lang==="TH"?"บาท/kg":"THB/kg" },
    "airasia_check": { name: "AirAsia (Checked-in)", limit: 15, fee: 400, feeUnit: lang==="TH"?"บาท/kg":"THB/kg" },
    "thai_dom": { name: "Thai Airways (Domestic Economy)", limit: 20, fee: 100, feeUnit: lang==="TH"?"บาท/kg":"THB/kg" },
    "thai_intl": { name: "Thai Airways (Intl Economy)", limit: 30, fee: 1500, feeUnit: lang==="TH"?"บาท/kg (โดยประมาณ)":"THB/kg (approx)" },
    "lion_carryon": { name: "Thai Lion Air (Carry-on)", limit: 7, fee: 400, feeUnit: lang==="TH"?"บาท/kg":"THB/kg" },
    "lion_check": { name: "Thai Lion Air (Checked-in)", limit: 10, fee: 350, feeUnit: lang==="TH"?"บาท/kg":"THB/kg" }
  };

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    if (w > 0 && limits[airline]) {
      const limit = limits[airline].limit;
      const feeRate = limits[airline].fee;
      
      let excess = w - limit;
      if (excess <= 0) {
        setResult({ excess: 0, cost: 0, msg: lang==="TH"?"ผ่านฉลุย! ไม่เกินกำหนด":"Safe! Under the limit." });
      } else {
        setResult({ excess: excess.toFixed(1), cost: Math.ceil(excess) * feeRate, msg: lang==="TH"?"เกินกำหนด! ต้องจ่ายเพิ่ม":"Overweight! Extra charge applies." });
      }
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-cyan-600">{lang === "TH" ? "เช็คน้ำหนักกระเป๋า" : "Baggage Weight Checker"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "สายการบิน/ประเภท" : "Airline / Type"}</label>
          <select value={airline} onChange={e=>setAirline(e.target.value)} className={`${inputClass} focus:ring-cyan-400`}>
             {Object.keys(limits).map(k => (
                <option key={k} value={k}>{limits[k].name} ({limits[k].limit} kg)</option>
             ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "น้ำหนักกระเป๋าจริง (kg)" : "Actual Baggage Weight (kg)"}</label>
          <input type="number" step="0.1" value={weight} onChange={e=>setWeight(e.target.value)} required className={`${inputClass} focus:ring-cyan-400`} />
        </div>
        <button type="submit" className="w-full py-4 bg-cyan-500 font-bold text-white rounded hover:bg-cyan-600">{lang==="TH"?"ตรวจสอบ":"Check Baggage"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className={`mt-8 p-6 rounded-xl text-center border ${result.excess > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <div className="text-xl font-bold mb-2">{result.msg}</div>
          {result.excess > 0 ? (
             <>
               <div className="text-gray-600 dark:text-gray-500 text-sm mb-1">{lang==="TH"?"น้ำหนักส่วนเกิน":"Excess Weight"}: <span className="font-bold text-red-600">{result.excess} kg</span></div>
               <div className="text-gray-600 dark:text-gray-500 text-sm mb-2">{lang==="TH"?"ค่าปรับโดยประมาณ":"Estimated Fee"}: <span className="font-bold text-red-600">฿{result.cost.toLocaleString()}</span></div>
               <p className="text-xs text-gray-500">*{lang==="TH"?"ค่าปรับขึ้นอยู่กับเส้นทาง โปรดตรวจสอบกับสายการบินอีกครั้ง":"Fees vary by route. Please check with airline."}</p>
             </>
          ) : (
             <div className="text-4xl text-green-500">✅</div>
          )}
        </motion.div>
      )}
      <SEOFAQ title={lang==="TH"?"FAQ — น้ำหนักกระเป๋า":"Baggage Weight FAQ"}>
        <FAQItem q={lang==="TH"?"กระเป๋า Carry-on ขึ้นเครื่องได้กี่ kg?":"How much carry-on luggage is allowed?"} a={lang==="TH"?"สายการบินราคาประหยัด (AirAsia, Lion Air) อนุญาต 7 kg / สายการบินปกติ (Thai Airways, Bangkok Airways) อนุญาต 7-10 kg ขึ้นกับชั้นที่นั่ง ควรตรวจสอบกับสายการบินก่อนเดินทางเสมอ | อ้างอิง: เว็บไซต์สายการบินอย่างเป็นทางการ.":"Budget airlines (AirAsia, Lion Air) allow 7 kg / Full-service (Thai Airways, Bangkok Airways) allow 7-10 kg depending on class. Always check airline website before travel. Source: Official airline websites."} />
        <FAQItem q={lang==="TH"?"ถ้ากระเป๋าน้ำหนักเกิน ต้องจ่ายเท่าไร?":"How much are excess baggage fees?"} a={lang==="TH"?"ค่าปรับน้ำหนักเกินแตกต่างตามสายการบินและเส้นทาง: AirAsia 400-500 บาท/kg / Thai Airways 100-1,500 บาท/kg ตามเส้นทาง / วิธีประหยัดคือซื้อน้ำหนักล่วงหน้าทางออนไลน์ ถูกกว่าซื้อที่เคาน์เตอร์ 20-40% | อ้างอิง: AirAsia, Thai Airways Excess Baggage Policy.":"Fees vary by airline and route: AirAsia 400-500 THB/kg / Thai Airways 100-1,500 THB/kg. Book extra weight online in advance for 20-40% savings. Source: AirAsia, Thai Airways policies."} />
        <FAQItem q={lang==="TH"?"เทคนิคลดน้ำหนักกระเป๋ามีอะไรบ้าง?":"Tips to reduce luggage weight?"} a={lang==="TH"?"1) ใช้กระเป๋าน้ำหนักเบา (ผ้า/ซอฟต์เคส) 2) สวมเสื้อผ้าหนักๆ ขึ้นเครื่อง 3) ใช้ขวดแบ่งของเหลว 4) เลือกเสื้อผ้าที่ Mix & Match ได้ 5) ชั่งน้ำหนักที่บ้านก่อนออกเดินทาง | อ้างอิง: SmarterTravel (2023) Packing Guide.":"1) Use lightweight bags 2) Wear heaviest clothes 3) Use travel-size containers 4) Pack mix & match outfits 5) Weigh at home before leaving. Source: SmarterTravel (2023) Packing Guide."} />
      </SEOFAQ>
    </div>
  );
}

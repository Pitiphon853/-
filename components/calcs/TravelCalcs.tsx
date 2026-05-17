"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass , SEOFAQ, FAQItem } from "./shared";

// 1. Time Zone
export function TimeZoneConverter({ lang }: { lang: Lang }) {
  const [tz, setTz] = useLocalState("tz_target", "Asia/Tokyo");
  const [time, setTime] = useLocalState("tz_time", "12:00");
  const [date, setDate] = useLocalState("tz_date", new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<string | null>(null);
  
  const timezones = [
    { value: "Asia/Bangkok", label: "Bangkok (ICT)" },
    { value: "Asia/Tokyo", label: "Tokyo (JST)" },
    { value: "Asia/Seoul", label: "Seoul (KST)" },
    { value: "Asia/Singapore", label: "Singapore (SGT)" },
    { value: "Europe/London", label: "London (GMT/BST)" },
    { value: "Europe/Paris", label: "Paris (CET/CEST)" },
    { value: "America/New_York", label: "New York (EST/EDT)" },
    { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)" },
    { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
    { value: "Pacific/Auckland", label: "Auckland (NZST/NZDT)" }
  ];

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const d = new Date(`${date}T${time}:00`);
      const formatter = new Intl.DateTimeFormat(lang === "TH" ? "th-TH" : "en-US", {
        timeZone: tz,
        dateStyle: "full",
        timeStyle: "short"
      });
      setResult(formatter.format(d));
    } catch (err) {
      setResult(null);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600">{lang === "TH" ? "แปลงโซนเวลา (Local to Target)" : "Time Zone Converter"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "วันที่ (เครื่องของคุณ)" : "Local Date"}</label>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "เวลา (เครื่องของคุณ)" : "Local Time"}</label>
            <input type="time" value={time} onChange={e=>setTime(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
          </div>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "โซนเวลาปลายทาง" : "Target Time Zone"}</label>
          <select value={tz} onChange={e=>setTz(e.target.value)} className={`${inputClass} focus:ring-blue-400`}>
             {timezones.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600">{lang==="TH"?"แปลงเวลา":"Convert Time"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-blue-50 rounded-xl text-center border border-blue-200">
          <p className="text-gray-500 mb-2">{lang === "TH" ? "เวลาปลายทางคือ:" : "Target Time is:"}</p>
          <div className="text-3xl font-black text-blue-600">{result}</div>
        </motion.div>
      )}

      <SEOFAQ title={lang==="TH"?"FAQ — การแปลงโซนเวลา (Time Zone)":"Time Zone FAQ"}>
        <FAQItem q={lang==="TH"?"ประเทศไทยใช้โซนเวลาอะไร?":"What timezone does Thailand use?"} a={lang==="TH"?"ประเทศไทยใช้โซนเวลา UTC+7 หรือ Indochina Time (ICT) ซึ่งเร็วกว่าเวลาสากลเชิงพิกัด (UTC) 7 ชั่วโมง และไม่มีการปรับเวลาตามฤดูกาล (Daylight Saving Time).":"Thailand uses UTC+7 (Indochina Time), which is 7 hours ahead of Coordinated Universal Time. Thailand does not observe Daylight Saving Time (DST)."} />
        <FAQItem q={lang==="TH"?"Daylight Saving Time (DST) คืออะไร?":"What is Daylight Saving Time (DST)?"} a={lang==="TH"?"DST คือการปรับนาฬิกาให้เร็วขึ้น 1 ชั่วโมงในช่วงฤดูร้อน เพื่อให้มีแสงสว่างในตอนเย็นนานขึ้น มักใช้ในประเทศแถบยุโรปและอเมริกาตอนเหนือ/ใต้ ส่วนไทยไม่มีการใช้ระบบนี้.":"DST is the practice of advancing clocks during summer months so that evening daylight lasts longer. Common in North America and Europe. Thailand doesn't use it."} />
        <FAQItem q={lang==="TH"?"เวลาไทยต่างจากญี่ปุ่น (Tokyo) กี่ชั่วโมง?":"How many hours difference between Thailand and Japan?"} a={lang==="TH"?"เวลาประเทศญี่ปุ่น (JST) คือ UTC+9 ซึ่งเร็วกว่าประเทศไทย (UTC+7) เป็นเวลา 2 ชั่วโมงเสมอ เนื่องจากทั้งสองประเทศไม่มี DST.":"Japan Standard Time (JST) is UTC+9, which is exactly 2 hours ahead of Thailand (UTC+7) all year round since neither observes DST."} />
        <FAQItem q={lang==="TH"?"เวลาไทยต่างจากเกาหลีใต้ (Seoul) กี่ชั่วโมง?":"How many hours difference between Thailand and South Korea?"} a={lang==="TH"?"เวลาเกาหลีใต้ (KST) คือ UTC+9 เร็วกว่าประเทศไทย 2 ชั่วโมงเช่นเดียวกับประเทศญี่ปุ่น.":"South Korea (KST) is UTC+9, meaning it is 2 hours ahead of Thailand, same as Japan."} />
        <FAQItem q={lang==="TH"?"เวลาไทยต่างจากอังกฤษ (London) กี่ชั่วโมง?":"What is the time difference with London?"} a={lang==="TH"?"อังกฤษใช้ GMT (UTC+0) ในฤดูหนาว ซึ่งไทยจะเร็วกว่า 7 ชั่วโมง แต่ในฤดูร้อนอังกฤษจะปรับเป็น BST (UTC+1) ทำให้ไทยเร็วกว่า 6 ชั่วโมง.":"London uses GMT (UTC+0) in winter (Thailand is 7 hours ahead) and BST (UTC+1) in summer (Thailand is 6 hours ahead)."} />
        <FAQItem q={lang==="TH"?"เวลาไทยต่างจากนิวยอร์ก (New York) กี่ชั่วโมง?":"What is the time difference with New York?"} a={lang==="TH"?"นิวยอร์กใช้ EST (UTC-5) ในฤดูหนาว (ไทยเร็วกว่า 12 ชั่วโมง) และ EDT (UTC-4) ในฤดูร้อน (ไทยเร็วกว่า 11 ชั่วโมง).":"New York uses EST (UTC-5) in winter (Thailand is 12 hours ahead) and EDT (UTC-4) in summer (Thailand is 11 hours ahead)."} />
        <FAQItem q={lang==="TH"?"เวลา UTC และ GMT ต่างกันอย่างไร?":"Difference between UTC and GMT?"} a={lang==="TH"?"UTC คือมาตรฐานเวลาโลกทางวิทยาศาสตร์ที่แม่นยำด้วยนาฬิกาอะตอม ส่วน GMT คือโซนเวลาของเส้นเมริเดียนแรกที่เมืองกรีนิช ในทางปฏิบัติทั่วไปทั้งสองมีค่าเท่ากัน.":"UTC is a time standard kept by atomic clocks, while GMT is a time zone. In casual use, they are treated as the same."} />
        <FAQItem q={lang==="TH"?"ทำไมต้องมีการแปลงโซนเวลา?":"Why do we need to convert time zones?"} a={lang==="TH"?"เพื่อป้องกันความสับสนในการติดต่อสื่อสารข้ามประเทศ การนัดหมายประชุมออนไลน์ หรือการจองเที่ยวบิน ซึ่งตั๋วเครื่องบินมักแสดงเวลาท้องถิ่นเสมอ.":"To avoid confusion in international communication, scheduling online meetings, or booking flights (flight tickets always show local times)."} />
        <FAQItem q={lang==="TH"?"เวลาบนตั๋วเครื่องบินคือโซนเวลาไหน?":"Which timezone is printed on flight tickets?"} a={lang==="TH"?"เวลาบนตั๋วเครื่องบิน (เวลาออกเดินทางและเวลาถึง) จะแสดงเป็นเวลาท้องถิ่น (Local Time) ของสนามบินนั้นๆ เสมอ ไม่ใช่เวลาของประเทศต้นทาง.":"Flight tickets always display departure and arrival times in the local timezone of the respective airports."} />
        <FAQItem q={lang==="TH"?"วิธีลดอาการ Jet Lag ทำอย่างไร?":"How to reduce Jet Lag?"} a={lang==="TH"?"1. ปรับเวลานอนล่วงหน้าก่อนเดินทาง 2. นอนหลับพักผ่อนให้เพียงพอบนเครื่อง 3. เมื่อถึงที่หมายให้ออกไปเจอแสงแดด 4. หลีกเลี่ยงกาเฟอีนแอลกอฮอล์.":"1. Shift sleep schedule before trip 2. Sleep well on the flight 3. Get sunlight upon arrival 4. Avoid heavy caffeine/alcohol."} />
        <FAQItem q={lang==="TH"?"อาการ Jet Lag จะหายไปเมื่อไร?":"How long does Jet Lag last?"} a={lang==="TH"?"โดยทั่วไป ร่างกายมนุษย์จะสามารถปรับตัวกับโซนเวลาใหม่ได้ประมาณ 1 ชั่วโมงต่อ 1 วัน เช่น หากเดินทางต่างกัน 5 ชั่วโมง อาจต้องใช้เวลา 5 วัน.":"Typically, the body adjusts to a new timezone at a rate of 1 hour per day. A 5-hour difference might take 5 days to fully overcome."} />
      </SEOFAQ>
    </div>
  );
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
  const initialList = lang === "TH" ? [
    { id: "1", text: "พาสปอร์ต / วีซ่า / บัตรปชช.", checked: false, category: "เอกสารสำคัญ" },
    { id: "2", text: "ตั๋วเครื่องบิน / ใบจองโรงแรม", checked: false, category: "เอกสารสำคัญ" },
    { id: "3", text: "บัตรเครดิต / เงินสด / Travel Card", checked: false, category: "เอกสารสำคัญ" },
    { id: "4", text: "เสื้อยืด / เสื้อเชิ้ต", checked: false, category: "เครื่องแต่งกาย" },
    { id: "5", text: "กางเกง / กระโปรง", checked: false, category: "เครื่องแต่งกาย" },
    { id: "6", text: "ชุดชั้นใน / ถุงเท้า", checked: false, category: "เครื่องแต่งกาย" },
    { id: "7", text: "ชุดนอน", checked: false, category: "เครื่องแต่งกาย" },
    { id: "8", text: "รองเท้าเดินสบาย / รองเท้าแตะ", checked: false, category: "เครื่องแต่งกาย" },
    { id: "9", text: "แปรงสีฟัน / ยาสีฟัน", checked: false, category: "ของใช้ส่วนตัว" },
    { id: "10", text: "สบู่ / แชมพู / โฟมล้างหน้า", checked: false, category: "ของใช้ส่วนตัว" },
    { id: "11", text: "ครีมกันแดด / สกินแคร์", checked: false, category: "ของใช้ส่วนตัว" },
    { id: "12", text: "ยาสามัญประจำบ้าน / ยาประจำตัว", checked: false, category: "ของใช้ส่วนตัว" },
    { id: "13", text: "สายชาร์จ / อะแดปเตอร์ (Universal)", checked: false, category: "อุปกรณ์อิเล็กทรอนิกส์" },
    { id: "14", text: "พาวเวอร์แบงค์ (Power Bank)", checked: false, category: "อุปกรณ์อิเล็กทรอนิกส์" },
    { id: "15", text: "หูฟัง", checked: false, category: "อุปกรณ์อิเล็กทรอนิกส์" }
  ] : [
    { id: "1", text: "Passport / Visa / ID", checked: false, category: "Documents" },
    { id: "2", text: "Flight Tickets / Hotel Booking", checked: false, category: "Documents" },
    { id: "3", text: "Credit Cards / Cash", checked: false, category: "Documents" },
    { id: "4", text: "T-shirts / Shirts", checked: false, category: "Clothing" },
    { id: "5", text: "Pants / Skirts", checked: false, category: "Clothing" },
    { id: "6", text: "Underwear / Socks", checked: false, category: "Clothing" },
    { id: "7", text: "Sleepwear", checked: false, category: "Clothing" },
    { id: "8", text: "Walking Shoes / Sandals", checked: false, category: "Clothing" },
    { id: "9", text: "Toothbrush / Toothpaste", checked: false, category: "Toiletries" },
    { id: "10", text: "Soap / Shampoo", checked: false, category: "Toiletries" },
    { id: "11", text: "Sunscreen / Skincare", checked: false, category: "Toiletries" },
    { id: "12", text: "Personal Medications", checked: false, category: "Toiletries" },
    { id: "13", text: "Chargers / Universal Adapter", checked: false, category: "Electronics" },
    { id: "14", text: "Power Bank", checked: false, category: "Electronics" },
    { id: "15", text: "Headphones", checked: false, category: "Electronics" }
  ];

  const [items, setItems] = useLocalState("packing_list", initialList);
  const [newItem, setNewItem] = useState("");

  const toggleItem = (id: string) => {
    setItems(items.map((i: any) => i.id === id ? { ...i, checked: !i.checked } : i));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems([...items, { id: Date.now().toString(), text: newItem, checked: false, category: lang==="TH"?"อื่นๆ":"Other" }]);
    setNewItem("");
  };

  const removeItem = (id: string) => {
    setItems(items.filter((i: any) => i.id !== id));
  };

  const resetList = () => {
    if (confirm(lang==="TH"?"ต้องการรีเซ็ตเช็กลิสต์หรือไม่?":"Reset checklist?")) setItems(initialList);
  };

  const categories = Array.from(new Set(items.map((i: any) => i.category)));
  const progress = items.length === 0 ? 0 : Math.round((items.filter((i: any) => i.checked).length / items.length) * 100);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600">{lang === "TH" ? "เช็กลิสต์จัดกระเป๋าเดินทาง" : "Packing List Generator"}</h2>
      
      <div className="mt-4 mb-6">
        <div className="flex justify-between text-sm mb-1 font-bold text-gray-500">
          <span>{lang==="TH"?"ความคืบหน้า":"Progress"}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <form onSubmit={addItem} className="flex gap-2 mb-6">
        <input type="text" value={newItem} onChange={e=>setNewItem(e.target.value)} placeholder={lang==="TH"?"+ เพิ่มสิ่งของ...":"+ Add item..."} className={`${inputClass} flex-1 focus:ring-blue-400`} />
        <button type="submit" className="px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600">{lang==="TH"?"เพิ่ม":"Add"}</button>
      </form>

      <div className="space-y-6">
        {categories.map((cat: any) => (
          <div key={cat} className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10">
            <h3 className="font-bold text-lg mb-3 text-blue-600">{cat}</h3>
            <div className="space-y-2">
              {items.filter((i: any) => i.category === cat).map((item: any) => (
                <div key={item.id} className="flex items-center justify-between group">
                  <label className="flex items-center gap-3 cursor-pointer flex-1">
                    <input type="checkbox" checked={item.checked} onChange={() => toggleItem(item.id)} className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    <span className={`transition-all ${item.checked ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'}`}>{item.text}</span>
                  </label>
                  <button onClick={() => removeItem(item.id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600 text-sm">✖</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={resetList} className="mt-6 text-sm text-gray-400 hover:text-red-500 underline w-full text-center">{lang==="TH"?"รีเซ็ตค่าเริ่มต้น":"Reset to Default"}</button>

      <SEOFAQ title={lang==="TH"?"FAQ — การจัดกระเป๋าเดินทาง":"Packing List FAQ"}>
        <FAQItem q={lang==="TH"?"ต้องเตรียมเอกสารสำคัญอะไรบ้าง?":"What important documents to pack?"} a={lang==="TH"?"1. พาสปอร์ต (อายุเหลือ \u003E 6 เดือน) 2. วีซ่า (ถ้ามี) 3. บัตรประชาชน 4. ตั๋วเครื่องบิน (E-ticket) 5. ใบจองโรงแรม 6. กรมธรรม์ประกันการเดินทาง 7. บัตรเครดิต/Travel Card ถ่ายรูปเอกสารทั้งหมดเก็บไว้ในมือถือและอีเมลสำรองด้วย.":"1. Passport (valid \u003E 6 months) 2. Visa 3. ID card 4. E-ticket 5. Hotel booking 6. Travel insurance 7. Credit cards. Take photos of all documents as backup."} />
        <FAQItem q={lang==="TH"?"พาวเวอร์แบงค์ขึ้นเครื่องได้ขนาดเท่าไร?":"Power bank capacity allowed on planes?"} a={lang==="TH"?"พาวเวอร์แบงค์ห้ามโหลดใต้ท้องเครื่องเด็ดขาด! ต้องถือขึ้นเครื่อง (Carry-on) เท่านั้น ความจุที่อนุญาตคือไม่เกิน 20,000 mAh ถือได้ไม่จำกัดจำนวน หาก 20,000-32,000 mAh อนุญาตไม่เกิน 2 ก้อน เกิน 32,000 mAh ห้ามนำขึ้นเด็ดขาด.":"Power banks MUST be in carry-on. Strictly no check-in. Under 20,000 mAh (100 Wh) is allowed. 20,000-32,000 mAh limited to 2 pieces. \u003E 32,000 mAh is prohibited."} />
        <FAQItem q={lang==="TH"?"ของเหลวถือขึ้นเครื่อง (Carry-on) ได้เท่าไร?":"Liquid limit for carry-on?"} a={lang==="TH"?"ของเหลว เจล สเปรย์ ทุกชนิด ต้องบรรจุในขวดละไม่เกิน 100 ml (อิงจากป้ายฉลากขวด แม้ของเหลวจะเหลือน้อยก็ตาม) รวมทั้งหมดไม่เกิน 10 ขวด (1,000 ml) และต้องใส่ในถุงซิปล็อคใส.":"Liquids, gels, aerosols must be in containers of max 100 ml each (based on bottle label, not actual content). Total max 10 bottles (1,000 ml), placed in a clear zip-lock bag."} />
        <FAQItem q={lang==="TH"?"วิธีการจัดกระเป๋าให้ประหยัดพื้นที่ที่สุด?":"How to pack efficiently to save space?"} a={lang==="TH"?"วิธีม้วนเสื้อผ้า (Rolling) แทนการพับ จะช่วยลดรอยยับและประหยัดพื้นที่ได้มากที่สุด ใส่ถุงเท้าไว้ในรองเท้าเพื่อประหยัดพื้นที่ ใช้ Packing Cubes (ถุงจัดระเบียบ) และเลือกเสื้อผ้าโทนสีที่ Mix & Match กันได้.":"Rolling clothes instead of folding saves space and reduces wrinkles. Stuff socks inside shoes. Use packing cubes and choose mix-and-match neutral colored clothing."} />
        <FAQItem q={lang==="TH"?"ถ้าต้องเดินทางไปที่อากาศหนาว จัดกระเป๋าอย่างไร?":"How to pack for cold weather?"} a={lang==="TH"?"เน้นการแต่งกายแบบเลเยอร์ (Layering): 1. Base Layer (ฮีทเทคกักเก็บความร้อน) 2. Mid Layer (สเวตเตอร์/ไหมพรม) 3. Outer Layer (เสื้อโค้ท/ดาวน์กันลม) ไม่จำเป็นต้องเอาโค้ทไปหลายตัวเพราะเปลืองพื้นที่ ให้เปลี่ยนเลเยอร์ด้านในแทน.":"Use layering: 1. Base layer (thermal wear) 2. Mid layer (sweater/fleece) 3. Outer layer (wind/waterproof coat). Wear your heaviest coat on the plane to save luggage space."} />
        <FAQItem q={lang==="TH"?"สิ่งที่ห้ามนำขึ้นเครื่องบินเด็ดขาดมีอะไรบ้าง?":"What is strictly prohibited on planes?"} a={lang==="TH"?"1. อาวุธและของมีคมทุกชนิด (กรรไกร, คัตเตอร์) 2. วัตถุไวไฟ (ดอกไม้ไฟ, ไฟแช็กเกิน 1 อัน) 3. สารเคมีอันตราย 4. อาหารที่มีกลิ่นแรง (ทุเรียน) 5. พาวเวอร์แบงค์โหลดใต้ท้องเครื่อง.":"1. Weapons & sharp objects 2. Flammable items (fireworks) 3. Hazardous chemicals 4. Strong smelling food 5. Power banks in checked luggage."} />
        <FAQItem q={lang==="TH"?"ยารักษาโรคเอาขึ้นเครื่องได้ไหม?":"Can I bring medication on the plane?"} a={lang==="TH"?"ยาสามัญประจำบ้านและยาประจำตัวสามารถนำขึ้นเครื่องได้ หากเป็นยาน้ำที่เกิน 100 ml ต้องมีใบรับรองแพทย์กำกับ แนะนำให้พกยาพร้อมฉลากภาษาอังกฤษเพื่อความสะดวกในการตรวจ.":"Personal medication is allowed. Liquid meds over 100 ml require a doctor's prescription. Keep meds in original packaging with clear English labels."} />
        <FAQItem q={lang==="TH"?"การป้องกันกระเป๋าหาย หรือถูกงัดแงะ?":"How to prevent lost or tampered luggage?"} a={lang==="TH"?"ใช้แม่กุญแจแบบ TSA Lock ติดป้ายชื่อและเบอร์โทรที่กระเป๋า ถ่ายรูปกระเป๋าด้านนอกและของด้านในไว้เป็นหลักฐาน ใส่ Airtag หรือ Smart Tracker ไว้ในกระเป๋าเพื่อติดตามตำแหน่งได้เรียลไทม์.":"Use TSA-approved locks. Attach name/phone tags. Take photos of the bag and contents. Place an Airtag or smart tracker inside for real-time tracking."} />
        <FAQItem q={lang==="TH"?"น้ำหนักกระเป๋าควรเผื่อไว้สำหรับซื้อของฝากเท่าไร?":"How much weight to leave for souvenirs?"} a={lang==="TH"?"ควรเผื่อน้ำหนักกระเป๋าขากลับไว้อย่างน้อย 20-30% ของโควต้าทั้งหมด หรือพกถุงผ้าพับได้ (Duffle bag) เผื่อไว้ หากของเยอะเกินไปสามารถโหลดเพิ่มเป็นสัมภาระชิ้นที่ 2 ได้ (ตรวจสอบกฎสายการบิน).":"Leave at least 20-30% of your weight allowance empty for souvenirs, or pack a foldable duffle bag. You can use it as a carry-on or extra checked bag."} />
        <FAQItem q={lang==="TH"?"อาหารแห้งพกไปต่างประเทศได้ไหม?":"Can I bring dried food abroad?"} a={lang==="TH"?"อาหารสำเร็จรูป บะหมี่กึ่งสำเร็จรูป หรือขนม นำไปได้ แต่ต้องระวังผลิตภัณฑ์ที่มีส่วนผสมของ เนื้อหมู เนื้อวัว นม ไข่ สด/แปรรูป ซึ่งหลายประเทศ (เช่น ญี่ปุ่น ไต้หวัน ออสเตรเลีย) ห้ามนำเข้าเด็ดขาด หากฝ่าฝืนมีโทษปรับสูงมาก.":"Processed foods are usually fine, but strictly avoid bringing fresh/processed meat (pork, beef), dairy, or eggs to countries like Japan, Taiwan, or Australia. High fines apply."} />
      </SEOFAQ>
    </div>
  );
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

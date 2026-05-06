"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass } from "./shared";

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
    </div>
  );
}

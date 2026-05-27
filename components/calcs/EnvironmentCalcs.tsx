"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem } from "./shared";

// 1. Carbon Footprint Calculator
export function CarbonFootprintCalculator({ lang }: { lang: Lang }) {
  const [elec, setElec] = useLocalState("env_elec", "");
  const [fuel, setFuel] = useLocalState("env_fuel", "");
  const [flight, setFlight] = useLocalState("env_flight", "");

  // Estimates:
  // Elec (kWh): ~0.5 kg CO2/kWh
  // Fuel (Liters): ~2.3 kg CO2/L
  // Flight (Hours): ~90 kg CO2/Hour
  const co2Elec = (parseFloat(elec) || 0) * 0.5 * 12; // yearly
  const co2Fuel = (parseFloat(fuel) || 0) * 2.3 * 12; // yearly
  const co2Flight = (parseFloat(flight) || 0) * 90; // yearly
  const totalCO2 = co2Elec + co2Fuel + co2Flight;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-emerald-600">{lang === "TH" ? "คำนวณคาร์บอนฟุตพริ้นท์" : "Carbon Footprint Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ค่าไฟที่ใช้ต่อเดือน (หน่วย/kWh)" : "Monthly Electricity (kWh)"}</label><input type="number" value={elec} onChange={e=>setElec(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "น้ำมันรถที่ใช้ต่อเดือน (ลิตร)" : "Monthly Fuel (Liters)"}</label><input type="number" value={fuel} onChange={e=>setFuel(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "เวลาบินต่อปี (ชั่วโมง)" : "Yearly Flight Time (Hours)"}</label><input type="number" value={flight} onChange={e=>setFlight(e.target.value)} className={inputClass} /></div>
      </div>
      {(elec || fuel || flight) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-emerald-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "ปริมาณคาร์บอนต่อปี (kg CO2e)" : "Annual Carbon Footprint (kg CO2e)"}</p>
          <div className="text-4xl font-black text-emerald-600">{totalCO2.toLocaleString(undefined, {maximumFractionDigits: 2})} kg</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — คาร์บอนฟุตพริ้นท์":"Carbon Footprint FAQ"}>
          <FAQItem q={lang==="TH"?"คาร์บอนฟุตพริ้นท์ (Carbon Footprint) คืออะไร และมีความสำคัญอย่างไรต่อสภาวะโลกรวน?":"What is Carbon Footprint and why is it important?"} a={lang==="TH"?"คาร์บอนฟุตพริ้นท์ส่วนบุคคล หมายถึง ปริมาณรวมของก๊าซเรือนกระจก (Greenhouse Gases - GHGs) โดยเฉพาะอย่างยิ่งก๊าซคาร์บอนไดออกไซด์ (CO2) และก๊าซมีเทน (CH4) ที่ปล่อยออกสู่ชั้นบรรยากาศ ทั้งทางตรงและทางอ้อมอันเกิดจากกิจกรรมในชีวิตประจำวันของมนุษย์ เช่น การใช้ไฟฟ้าภายในบ้าน การขับขี่ยานพาหนะที่ใช้เชื้อเพลิงฟอสซิล การเดินทางโดยเครื่องบิน การบริโภคอาหาร (โดยเฉพาะเนื้อสัตว์ขนาดใหญ่) และการจัดการขยะ ความสำคัญของการวัดคาร์บอนฟุตพริ้นท์คือ การทำให้เราสามารถมองเห็นและประเมินผลกระทบที่วิถีชีวิตของเรามีต่อสิ่งแวดล้อมได้อย่างเป็นรูปธรรม เมื่อก๊าซเรือนกระจกสะสมในชั้นบรรยากาศมากขึ้น จะทำให้เกิดปรากฏการณ์เรือนกระจก (Greenhouse Effect) ที่รุนแรงขึ้น ส่งผลให้อุณหภูมิเฉลี่ยของโลกสูงขึ้น เกิดภาวะโลกรวนหรือการเปลี่ยนแปลงสภาพภูมิอากาศ (Climate Change) ที่นำไปสู่ภัยพิบัติทางธรรมชาติ ภัยแล้ง น้ำท่วม และระดับน้ำทะเลที่สูงขึ้น การลดคาร์บอนฟุตพริ้นท์ในระดับบุคคลจึงถือเป็นก้าวแรกที่สำคัญอย่างยิ่งในการร่วมมือกันแก้ไขปัญหาระดับโลกนี้ อ้างอิง: คณะกรรมการระหว่างรัฐบาลว่าด้วยการเปลี่ยนแปลงสภาพภูมิอากาศ (IPCC) รายงานการประเมินครั้งที่ 6 (AR6); องค์การปกป้องสิ่งแวดล้อมแห่งสหรัฐอเมริกา (EPA) แผนก Climate Change.":"Carbon footprint represents the total volume of greenhouse gases emitted by an individual's daily activities. Reducing it is crucial to combat global climate change and reduce extreme weather events. Source: IPCC AR6; US EPA."} />
          <FAQItem q={lang==="TH"?"กิจกรรมใดในชีวิตประจำวันที่สร้างปริมาณก๊าซเรือนกระจกมากที่สุด?":"Which daily activities generate the most greenhouse gases?"} a={lang==="TH"?"จากการศึกษาขององค์กรด้านสิ่งแวดล้อมหลายแห่งพบว่า กิจกรรมที่สร้างคาร์บอนฟุตพริ้นท์สูงสุดสำหรับบุคคลทั่วไปมักจะแบ่งออกเป็น 3 หมวดหมู่หลัก ได้แก่ 1) การคมนาคมขนส่ง (Transportation) การขับรถยนต์ส่วนตัวที่ใช้เครื่องยนต์สันดาปภายใน (น้ำมันเบนซินหรือดีเซล) เป็นแหล่งกำเนิดก๊าซ CO2 ที่ใหญ่ที่สุด โดยการเดินทางด้วยเครื่องบินก็มีอัตราการปล่อยก๊าซคาร์บอนต่อกิโลเมตรต่อผู้โดยสารที่สูงมากเช่นกัน 2) การใช้พลังงานในที่อยู่อาศัย (Home Energy) การใช้ไฟฟ้าที่ผลิตจากโรงไฟฟ้าพลังงานฟอสซิล (เช่น ถ่านหินและก๊าซธรรมชาติ) โดยเฉพาะการใช้เครื่องปรับอากาศ เครื่องทำน้ำอุ่น และเครื่องใช้ไฟฟ้าที่กินไฟมาก ส่งผลให้เกิดคาร์บอนฟุตพริ้นท์แฝงจำนวนมหาศาล 3) การบริโภคอาหาร (Diet) อุตสาหกรรมปศุสัตว์ โดยเฉพาะฟาร์มวัวและแกะ มีการปล่อยก๊าซมีเทนสูงมาก ซึ่งมีเทนมีศักยภาพในการทำให้เกิดภาวะโลกร้อน (GWP) มากกว่า CO2 ถึง 25-28 เท่าในช่วงเวลา 100 ปี นอกจากนี้ การขนส่งอาหารข้ามประเทศ (Food Miles) ก็มีส่วนเพิ่มคาร์บอนฟุตพริ้นท์เช่นกัน อ้างอิง: โครงการสิ่งแวดล้อมแห่งสหประชาชาติ (UNEP) รายงาน Emissions Gap Report; ศูนย์วิจัยร่วมของคณะกรรมาธิการยุโรป (JRC) EDGAR Database.":"Transportation, home energy consumption (especially from fossil fuel grids), and meat-heavy diets are the primary contributors to a personal carbon footprint. Source: UNEP Emissions Gap Report."} />
          <FAQItem q={lang==="TH"?"วิธีที่ปฏิบัติได้จริงและมีประสิทธิภาพสูงสุดในการลดคาร์บอนฟุตพริ้นท์ส่วนบุคคลในชีวิตประจำวันมีอะไรบ้าง?":"What are the most effective ways to reduce personal carbon footprint?"} a={lang==="TH"?"การลดคาร์บอนฟุตพริ้นท์สามารถเริ่มต้นได้จากพฤติกรรมง่ายๆ ที่ทำได้อย่างยั่งยืน ได้แก่ 1) การเปลี่ยนวิธีเดินทาง: หันมาใช้ระบบขนส่งสาธารณะ (รถไฟฟ้า รถบัส) การปั่นจักรยาน หรือการเดินสำหรับระยะทางสั้นๆ หากจำเป็นต้องใช้รถยนต์ส่วนตัว การเปลี่ยนไปใช้รถยนต์พลังงานไฟฟ้า (EV) หรือรถยนต์ไฮบริด จะช่วยลดการปล่อยไอเสียลงได้อย่างมหาศาล 2) การเพิ่มประสิทธิภาพการใช้พลังงานในบ้าน: เปลี่ยนหลอดไฟเป็น LED ซึ่งประหยัดพลังงานมากกว่าหลอดไส้ถึง 80% การตั้งอุณหภูมิเครื่องปรับอากาศให้เหมาะสม การถอดปลั๊กเครื่องใช้ไฟฟ้าเมื่อไม่ได้ใช้งานเพื่อลด Standby Power และหากเป็นไปได้ การติดตั้งแผงโซลาร์เซลล์บนหลังคา 3) การปรับเปลี่ยนพฤติกรรมการบริโภค: ลดการรับประทานเนื้อแดง เช่น เนื้อวัวและเนื้อหมู โดยหันมาบริโภคโปรตีนจากพืช (Plant-based) มากขึ้น เลือกซื้อผลิตภัณฑ์และอาหารที่ผลิตในท้องถิ่นเพื่อลด Food Miles และยึดหลัก 3R (Reduce, Reuse, Recycle) เพื่อลดปริมาณขยะที่ต้องนำไปฝังกลบหรือเผาทำลาย อ้างอิง: กองทุนสัตว์ป่าโลกสากล (WWF) Carbon Footprint Guide; คู่มือรักษ์โลกขององค์การสหประชาชาติ (UN Act Now).":"Using public transit, improving home energy efficiency (LEDs, reducing AC usage), eating more plant-based foods, and following the 3Rs are highly effective. Source: WWF; UN Act Now."} />
          <FAQItem q={lang==="TH"?"การคำนวณคาร์บอนฟุตพริ้นท์มีสูตรและหลักการคำนวณทางวิทยาศาสตร์เบื้องหลังอย่างไร?":"How is carbon footprint calculated scientifically?"} a={lang==="TH"?"หลักการคำนวณคาร์บอนฟุตพริ้นท์ใช้แนวคิดเรื่อง 'Emission Factor' (ค่าสัมประสิทธิ์การปล่อยก๊าซเรือนกระจก) ซึ่งเป็นค่ามาตรฐานที่ได้จากการวิจัยทางวิทยาศาสตร์ ตัวอย่างเช่น การคำนวณจากการใช้ไฟฟ้า: ปริมาณไฟฟ้าที่ใช้ (กิโลวัตต์-ชั่วโมง หรือหน่วย) × ค่า Emission Factor ของการผลิตไฟฟ้าในประเทศนั้นๆ (ในประเทศไทย ค่าเฉลี่ยอยู่ที่ประมาณ 0.5 กิโลกรัม CO2e ต่อ 1 kWh ตามข้อมูลของ อบก. หรือ TGO) การคำนวณจากการเติมน้ำมันรถยนต์: ปริมาณน้ำมันที่เติม (ลิตร) × ค่า Emission Factor ของชนิดน้ำมัน (เช่น น้ำมันเบนซิน 1 ลิตรปล่อย CO2 ประมาณ 2.2 กิโลกรัม, ดีเซลประมาณ 2.7 กิโลกรัม) การเดินทางด้วยเครื่องบิน จะคำนวณจากระยะทางบิน (กิโลเมตร) × ค่าสัมประสิทธิ์ต่อกิโลเมตรต่อผู้โดยสาร ซึ่งเที่ยวบินระยะสั้นมักมีค่าเฉลี่ยต่อกิโลเมตรสูงกว่าเที่ยวบินระยะยาวเนื่องจากการใช้เชื้อเพลิงปริมาณมากในตอนเครื่องขึ้น (Take-off) และลงจอด (Landing) การนำค่าเหล่านี้มารวมกันจะทำให้เราได้ปริมาณเทียบเท่าคาร์บอนไดออกไซด์ (CO2 Equivalent - CO2e) รวมทั้งหมดต่อปี อ้างอิง: องค์การบริหารจัดการก๊าซเรือนกระจก (องค์การมหาชน) TGO - คู่มือประเมินคาร์บอนฟุตพริ้นท์; แนวทาง IPCC Guidelines.":"It uses 'Emission Factors'—scientifically derived multipliers applied to usage data (e.g., kWh of electricity or liters of fuel) to estimate total CO2 equivalent emissions. Source: IPCC Guidelines; Thailand Greenhouse Gas Management Organization (TGO)."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 2. Wind Energy Calculator
export function WindEnergyCalculator({ lang }: { lang: Lang }) {
  const [velocity, setVelocity] = useLocalState("env_wind_v", "");
  const [bladeRadius, setBladeRadius] = useLocalState("env_wind_r", "");
  const [efficiency, setEfficiency] = useLocalState("env_wind_eff", "40"); // %

  const r = parseFloat(bladeRadius) || 0;
  const v = parseFloat(velocity) || 0;
  const eff = parseFloat(efficiency) || 0;
  
  const rho = 1.225; // Air density kg/m3
  const area = Math.PI * r * r;
  const powerWatts = 0.5 * rho * area * (v * v * v) * (eff / 100);
  const powerKW = powerWatts / 1000;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-emerald-600">{lang === "TH" ? "คำนวณพลังงานลม" : "Wind Energy Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ความเร็วลม (เมตร/วินาที)" : "Wind Velocity (m/s)"}</label><input type="number" value={velocity} onChange={e=>setVelocity(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ความยาวใบพัดหรือรัศมี (เมตร)" : "Blade Radius (m)"}</label><input type="number" value={bladeRadius} onChange={e=>setBladeRadius(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ประสิทธิภาพระบบ (%) (Max ~59.3%)" : "System Efficiency (%)"}</label><input type="number" max="59.3" value={efficiency} onChange={e=>setEfficiency(e.target.value)} className={inputClass} /></div>
      </div>
      {(velocity && bladeRadius) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-emerald-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "กำลังไฟฟ้าที่ผลิตได้ (kW)" : "Generated Power (kW)"}</p>
          <div className="text-4xl font-black text-emerald-600">{powerKW.toLocaleString(undefined, {maximumFractionDigits: 2})} kW</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — พลังงานลม":"Wind Energy FAQ"}>
          <FAQItem q={lang==="TH"?"พลังงานลม (Wind Energy) คืออะไร และสูตรคำนวณกำลังไฟฟ้ามีที่มาอย่างไร?":"What is wind energy and its formula?"} a={lang==="TH"?"พลังงานลมเกิดจากความแตกต่างของอุณหภูมิและความกดอากาศ ทำให้มวลอากาศเคลื่อนที่ เกิดเป็น 'ลม' ในทางฟิสิกส์ พลังงานในลมคือพลังงานจลน์ (Kinetic Energy) สูตรคำนวณกำลังไฟฟ้าคือ P = 1/2 × ρ × A × v³ โดย P คือกำลังไฟฟ้า (Watts), ρ (Rho) คือความหนาแน่นอากาศ (ประมาณ 1.225 kg/m³ ที่ระดับน้ำทะเล), A คือพื้นที่รับลม (πr² เมื่อ r คือความยาวใบพัด), และ v คือความเร็วลม (m/s) ข้อสังเกตสำคัญคือ พลังงานจะแปรผันตรงกับความเร็วลมยกกำลังสาม (v³) หากลมแรงขึ้น 2 เท่า พลังงานจะเพิ่มมหาศาลถึง 8 เท่า การเลือกสถานที่ตั้งกังหันในจุดที่มีลมแรงจึงสำคัญสูงสุด อ้างอิง: American Wind Energy Association (AWEA); หลักฟิสิกส์พลศาสตร์ของไหล.":"Wind energy is kinetic energy from moving air masses. The power formula is P = 1/2 × ρ × A × v³, showing power increases cubicly with wind speed. Source: AWEA."} />
          <FAQItem q={lang==="TH"?"กฎของเบตซ์ (Betz's Limit) คืออะไร ทำไมกังหันลมถึงมีประสิทธิภาพไม่ถึง 100%?":"What is Betz's Limit?"} a={lang==="TH"?"กฎของเบตซ์ หรือ Betz's Limit เป็นหลักการฟิสิกส์โดย Albert Betz (1919) ระบุว่า กังหันลมในอุดมคติจะดึงพลังงานสูงสุดได้เพียง 16/27 หรือ 59.3% ของลมทั้งหมด หากดึงมา 100% ลมจะหยุดนิ่ง ไม่สามารถพัดผ่านไปได้ ทำให้ใบพัดหยุดหมุน กังหันลมสมัยใหม่ที่ดีที่สุดทำงานได้ที่ประสิทธิภาพประมาณ 35%-45% เนื่องจากมีการสูญเสียทางกลไก (แรงเสียดทาน, ชุดเกียร์) และความปั่นป่วนของอากาศ (Aerodynamic Drag) อ้างอิง: สถาบันพลังงานหมุนเวียนแห่งชาติสหรัฐอเมริกา (NREL).":"Betz's Limit dictates that no wind turbine can capture more than 59.3% of the kinetic energy in wind. Modern turbines typically reach 35-45% efficiency. Source: NREL."} />
          <FAQItem q={lang==="TH"?"ปัจจัยใดบ้างที่มีผลต่อความหนาแน่นของพลังงานในการผลิตไฟฟ้าจากพลังงานลม?":"What factors affect wind energy production?"} a={lang==="TH"?"การผลิตไฟฟ้าพิจารณาจาก: 1) ความหนาแน่นของอากาศ อากาศเย็นและแห้งจะมีความหนาแน่นมากกว่า จึงผลิตไฟได้มากกว่าในฤดูหนาวที่ความเร็วลมเท่ากัน 2) ความสูงของเสา (Tower Height) ความเร็วลมจะเพิ่มตามความสูง กังหันพาณิชย์จึงมีเสาสูงเพื่อรับลมสม่ำเสมอ พ้นสิ่งกีดขวาง (เช่น ต้นไม้) ที่ทำให้เกิดลมหมุนวน (Turbulence) 3) ประสิทธิภาพของระบบรวม ตั้งแต่การออกแบบใบพัดด้วยวัสดุน้ำหนักเบา ชุดเกียร์ ไปจนถึงเครื่องกำเนิดไฟฟ้า (Generator) อ้างอิง: กรมพัฒนาพลังงานทดแทนและอนุรักษ์พลังงาน (DEDE); Global Wind Energy Council (GWEC).":"Factors include air density (cold air is denser), tower height (wind speeds increase with altitude), and overall system/aerodynamic efficiency. Source: GWEC; DEDE."} />
          <FAQItem q={lang==="TH"?"โรงไฟฟ้าพลังงานลมมีผลกระทบต่อสิ่งแวดล้อมอย่างไรบ้าง?":"What are the environmental impacts of wind farms?"} a={lang==="TH"?"พลังงานลมจัดเป็นพลังงานสะอาดที่ไม่ปล่อยก๊าซเรือนกระจกหรือมลพิษทางอากาศ แต่มีผลกระทบที่ต้องจัดการ ได้แก่ 1) ทัศนียภาพและเสียง กังหันขนาดใหญ่เปลี่ยนภูมิทัศน์และอาจเกิดเสียงรบกวน 2) ระบบนิเวศน์ นกและค้างคาวอาจบินชนใบพัด ต้องใช้เทคโนโลยีเรดาร์ตรวจสอบ 3) การจัดการซาก ใบพัดทำจากไฟเบอร์กลาสซึ่งปัจจุบันยังรีไซเคิลได้ยากเมื่อหมดอายุ (ประมาณ 20-25 ปี) แต่นักวิจัยกำลังพัฒนาใบพัดแบบรีไซเคิล 100% ในปัจจุบัน อ้างอิง: สำนักงานปกป้องสิ่งแวดล้อมแห่งสหรัฐอเมริกา (EPA); สหภาพสากลว่าด้วยการอนุรักษ์ธรรมชาติ (IUCN).":"While being a zero-emission energy source, wind farms can have visual/noise impacts, pose risks to birds/bats, and face challenges recycling composite blades at end-of-life. Source: EPA; IUCN."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 3. Water Savings Calculator
export function WaterSavingsCalculator({ lang }: { lang: Lang }) {
  const [oldFlow, setOldFlow] = useLocalState("env_wat_old", ""); // L/min
  const [newFlow, setNewFlow] = useLocalState("env_wat_new", ""); // L/min
  const [mins, setMins] = useLocalState("env_wat_min", ""); // minutes/day
  
  const savedPerDay = ((parseFloat(oldFlow) || 0) - (parseFloat(newFlow) || 0)) * (parseFloat(mins) || 0);
  const savedPerYearL = savedPerDay * 365;
  const savedPerYearM3 = savedPerYearL / 1000;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-emerald-600">{lang === "TH" ? "คำนวณการประหยัดน้ำ" : "Water Savings Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "อัตราการไหลของน้ำเดิม (ลิตร/นาที)" : "Old Flow Rate (L/min)"}</label><input type="number" value={oldFlow} onChange={e=>setOldFlow(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "อัตราการไหลของอุปกรณ์ใหม่ (ลิตร/นาที)" : "New Flow Rate (L/min)"}</label><input type="number" value={newFlow} onChange={e=>setNewFlow(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "เวลาที่ใช้งานต่อวัน (นาที)" : "Usage per day (Minutes)"}</label><input type="number" value={mins} onChange={e=>setMins(e.target.value)} className={inputClass} /></div>
      </div>
      {(oldFlow && newFlow && mins) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-emerald-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "ประหยัดน้ำได้ต่อปี (ลูกบาศก์เมตร)" : "Water Saved Annually (Cubic Meters)"}</p>
          <div className="text-4xl font-black text-emerald-600">{savedPerYearM3.toLocaleString(undefined, {maximumFractionDigits: 2})} m³</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — การประหยัดทรัพยากรน้ำ":"Water Conservation FAQ"}>
          <FAQItem q={lang==="TH"?"การประหยัดน้ำ (Water Conservation) คืออะไรและสำคัญอย่างไร?":"What is water conservation?"} a={lang==="TH"?"การอนุรักษ์ทรัพยากรน้ำเป็นแนวทางปฏิบัติที่มุ่งลดปริมาณการใช้น้ำสะอาดอย่างสูญเปล่า แม้โลกจะมีน้ำอยู่ถึง 71% ของพื้นผิว แต่น้ำจืดที่มนุษย์สามารถนำมาอุปโภคบริโภคได้จริงมีเพียง 1% เท่านั้น การเปลี่ยนแปลงสภาพภูมิอากาศทำให้รูปแบบฝนตกเปลี่ยนไป ส่งผลให้เกิดภัยแล้งรุนแรงขึ้นในหลายพื้นที่ การประหยัดน้ำไม่เพียงแต่ลดค่าใช้จ่ายในครัวเรือน แต่ยังช่วยลดพลังงานมหาศาลที่ต้องใช้ในกระบวนการสูบน้ำ การบำบัดน้ำประปา และการบำบัดน้ำเสีย ซึ่งพลังงานเหล่านี้มักมาจากฟอสซิลที่สร้างคาร์บอนฟุตพริ้นท์ อ้างอิง: องค์การอนามัยโลก (WHO) Water Scarcity Report; องค์การสหประชาชาติ (UN Water).":"Water conservation involves practices that reduce unnecessary fresh water usage. Only 1% of Earth's water is accessible fresh water. Saving water also saves the massive energy required to pump and treat it. Source: UN Water; WHO."} />
          <FAQItem q={lang==="TH"?"อุปกรณ์ประหยัดน้ำ (Low-flow fixtures) ทำงานอย่างไร?":"How do low-flow fixtures work?"} a={lang==="TH"?"ก๊อกน้ำและฝักบัวประหยัดน้ำ (Low-flow fixtures) ทำงานโดยใช้เทคโนโลยีผสมอากาศ (Aerators) หรือการบีบอัดรูน้ำให้เล็กลง เพื่อเพิ่มแรงดันน้ำในขณะที่ปล่อยปริมาณน้ำจริงออกน้อยลง อุปกรณ์ Aerator จะดึงอากาศเข้าไปผสมกับสายน้ำ ทำให้สายน้ำนุ่มนวลและกระจายตัวดี รู้สึกเหมือนได้น้ำปริมาณมากแต่ความจริงใช้น้ำน้อยลง 30-50% ฝักบัวรุ่นเก่าอาจใช้น้ำถึง 15-20 ลิตรต่อนาที ขณะที่ฝักบัวรุ่นใหม่มาตรฐานประหยัดน้ำจะใช้ไม่เกิน 9 ลิตรต่อนาที ชักโครกก็เช่นกัน จากที่เคยใช้ 12 ลิตรต่อครั้ง รุ่นใหม่แบบ Dual-flush ใช้เพียง 3-6 ลิตร อ้างอิง: มาตรฐานฉลากเขียวของประเทศไทย; US EPA WaterSense Program.":"Low-flow fixtures like aerators mix air into the water stream, maintaining high pressure while reducing actual water volume by 30-50%. Modern toilets use dual-flush mechanisms. Source: US EPA WaterSense."} />
          <FAQItem q={lang==="TH"?"โดยเฉลี่ยแล้วคนเราใช้น้ำวันละเท่าไร และกิจกรรมใดใช้น้ำมากที่สุด?":"How much water does an average person use?"} a={lang==="TH"?"ค่าเฉลี่ยการใช้น้ำในเขตเมืองของประเทศไทยอยู่ที่ประมาณ 200 ลิตรต่อคนต่อวัน กิจกรรมที่ใช้น้ำมากที่สุดในบ้านคือ การกดชักโครก (คิดเป็น 25-30% ของการใช้น้ำทั้งหมดในบ้าน) รองลงมาคือการอาบน้ำ (20-25%) การซักผ้า (15-20%) และการรั่วไหลที่มองไม่เห็น (เช่น ก๊อกน้ำหยด ชักโครกซึม) ซึ่งอาจทำให้สูญเสียน้ำได้หลายพันลิตรต่อเดือน การปรับเปลี่ยนพฤติกรรมง่ายๆ เช่น ปิดก๊อกน้ำขณะแปรงฟัน สามารถประหยัดน้ำได้ถึง 10-15 ลิตรต่อนาที อ้างอิง: การประปานครหลวง (MWA) สถิติการใช้น้ำ; American Water Works Association (AWWA).":"Urban residents average ~200 liters daily. Toilet flushing is the largest indoor use (25-30%), followed by bathing (20-25%) and laundry. Leaks also contribute significantly. Source: MWA; AWWA."} />
          <FAQItem q={lang==="TH"?"ประโยชน์ทางเศรษฐกิจและสิ่งแวดล้อมของการประหยัดน้ำมีอะไรบ้าง?":"What are the economic and environmental benefits of saving water?"} a={lang==="TH"?"ในแง่เศรษฐกิจ การลดใช้น้ำหมายถึงการลดค่าน้ำประปารายเดือนโดยตรง นอกจากนี้ การลดใช้น้ำอุ่นยังช่วยลดค่าไฟหรือค่าแก๊สที่ใช้ในการต้มน้ำด้วย ในระดับมหภาค การลดอุปสงค์น้ำช่วยยืดอายุโครงสร้างพื้นฐาน (โรงผลิตน้ำประปา ท่อส่งน้ำ) ให้ไม่ต้องขยายบ่อยครั้ง ในแง่สิ่งแวดล้อม การเหลือน้ำไว้ในแหล่งน้ำธรรมชาติ (แม่น้ำ ทะเลสาบ ชั้นน้ำบาดาล) ช่วยรักษาสมดุลของระบบนิเวศ ป้องกันแผ่นดินทรุด และให้ความชุ่มชื้นแก่ป่าไม้ ป้องกันปัญหาความเค็มรุกล้ำในแม่น้ำสายหลักช่วงฤดูแล้ง อ้างอิง: กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม; กรมชลประทาน.":"Economically, it lowers utility bills (both water and water-heating costs) and defers costly public infrastructure upgrades. Environmentally, it leaves more water in natural ecosystems, preventing subsidence and saltwater intrusion. Source: AWWA."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 4. Plastic Footprint Calculator
export function PlasticFootprintCalculator({ lang }: { lang: Lang }) {
  const [bottles, setBottles] = useLocalState("env_plas_bot", "");
  const [bags, setBags] = useLocalState("env_plas_bag", "");
  const [straws, setStraws] = useLocalState("env_plas_str", "");

  // Estimated weights: 
  // Bottle = 20g, Bag = 5g, Straw = 1g
  const dailyGrams = (parseFloat(bottles) || 0)*20 + (parseFloat(bags) || 0)*5 + (parseFloat(straws) || 0)*1;
  const yearlyKg = (dailyGrams * 365) / 1000;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-emerald-600">{lang === "TH" ? "คำนวณรอยเท้าพลาสติก" : "Plastic Footprint Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ขวดพลาสติกที่ใช้ต่อวัน (ขวด)" : "Plastic Bottles per day"}</label><input type="number" value={bottles} onChange={e=>setBottles(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ถุงพลาสติกหูหิ้วที่ใช้ต่อวัน (ใบ)" : "Plastic Bags per day"}</label><input type="number" value={bags} onChange={e=>setBags(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "หลอดพลาสติกที่ใช้ต่อวัน (หลอด)" : "Plastic Straws per day"}</label><input type="number" value={straws} onChange={e=>setStraws(e.target.value)} className={inputClass} /></div>
      </div>
      {(bottles || bags || straws) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-emerald-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "ขยะพลาสติกที่สร้างต่อปี (กิโลกรัม)" : "Annual Plastic Waste (kg)"}</p>
          <div className="text-4xl font-black text-emerald-600">{yearlyKg.toLocaleString(undefined, {maximumFractionDigits: 2})} kg</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ปัญหาขยะพลาสติก":"Plastic Footprint FAQ"}>
          <FAQItem q={lang==="TH"?"วิกฤตขยะพลาสติก (Plastic Crisis) และไมโครพลาสติก (Microplastics) คืออะไร?":"What is the plastic crisis and microplastics?"} a={lang==="TH"?"พลาสติกเป็นวัสดุที่คงทนมากและไม่ย่อยสลายทางชีวภาพ เมื่อถูกทิ้งลงสู่สิ่งแวดล้อม มันจะแตกตัวเป็นชิ้นเล็กๆ ด้วยแสงแดดและคลื่นทะเล กลายเป็น 'ไมโครพลาสติก' (Microplastics) ที่มีขนาดเล็กกว่า 5 มิลลิเมตร ไมโครพลาสติกเหล่านี้จะปนเปื้อนอยู่ในแหล่งน้ำ ดิน และถูกสัตว์น้ำกินเข้าไป ท้ายที่สุดมันจะย้อนกลับมาสู่ห่วงโซ่อาหารของมนุษย์ผ่านการบริโภคอาหารทะเล หรือแม้กระทั่งอยู่ในเกลือทะเลและน้ำดื่ม การสะสมของพลาสติกสร้างผลกระทบมหาศาลต่อระบบนิเวศทางทะเล ทำให้สัตว์ทะเลหายากเสียชีวิตจากการกินถุงพลาสติกที่เข้าใจผิดว่าเป็นแมงกะพรุน อ้างอิง: โครงการสิ่งแวดล้อมแห่งสหประชาชาติ (UNEP) - Beat Plastic Pollution; งานวิจัยจากสถาบันวิทยาศาสตร์ทางทะเล.":""} />
          <FAQItem q={lang==="TH"?"พลาสติกแต่ละชนิดใช้เวลาย่อยสลายนานเท่าใดในธรรมชาติ?":"How long does plastic take to decompose?"} a={lang==="TH"?"พลาสติกส่วนใหญ่ทำมาจากปิโตรเลียม มีโครงสร้างโพลีเมอร์ที่แบคทีเรียตามธรรมชาติไม่สามารถย่อยสลายได้ (Non-biodegradable) ถุงพลาสติกหูหิ้ว (HDPE/LDPE) ใช้เวลา 10-20 ปีในการแตกตัว ขวดพลาสติกใส (PET) ใช้เวลา 450 ปี ผ้าอ้อมสำเร็จรูปใช้เวลา 500 ปี และโฟม (Polystyrene) แทบจะไม่ย่อยสลายเลยในชั่วชีวิตมนุษย์ ดังนั้นขยะพลาสติกทุกชิ้นที่เคยถูกสร้างขึ้นมาบนโลกนี้ (และไม่ได้ถูกเผาทำลาย) ยังคงหลงเหลืออยู่ที่ไหนสักแห่งบนโลกในรูปแบบใดรูปแบบหนึ่ง อ้างอิง: สำนักงานบริหารมหาสมุทรและชั้นบรรยากาศแห่งชาติสหรัฐอเมริกา (NOAA) Marine Debris Program; กรมควบคุมมลพิษ.":""} />
          <FAQItem q={lang==="TH"?"พลาสติกแบบใช้ครั้งเดียวทิ้ง (Single-use Plastics) คืออะไร?":"What are single-use plastics?"} a={lang==="TH"?"พลาสติกแบบใช้ครั้งเดียวทิ้ง (Single-use Plastics) คือผลิตภัณฑ์ที่ออกแบบมาให้ใช้งานเพียงชั่วระยะเวลาสั้นๆ (หลายครั้งเพียงไม่กี่นาที) ก่อนที่จะถูกโยนทิ้ง ตัวอย่างเช่น หลอดดูดน้ำ แก้วกาแฟพลาสติก ช้อนส้อมพลาสติก และถุงหูหิ้ว แม้จะให้ความสะดวกสบายขั้นสุดยอด แต่มันกลายเป็นภาระหนักของระบบจัดการขยะทั่วโลก เพราะพลาสติกประเภทนี้มักมีขนาดเล็ก ปนเปื้อนเศษอาหาร นำไปรีไซเคิลได้ยากหรือไม่คุ้มทุน จึงมักจบลงที่หลุมฝังกลบหรือหลุดรอดลงสู่มหาสมุทร การลดหรือเลิกใช้ไอเทมเหล่านี้เป็นวิธีที่มีประสิทธิภาพที่สุด อ้างอิง: กรีนพีซ ประเทศไทย (Greenpeace Thailand); แผนปฏิบัติการจัดการขยะพลาสติกแห่งชาติ.":""} />
          <FAQItem q={lang==="TH"?"กระบวนการรีไซเคิลพลาสติกทำงานอย่างไร และแก้ปัญหาได้ทั้งหมดหรือไม่?":"How does recycling work, and does it solve the problem?"} a={lang==="TH"?"การรีไซเคิลคือกระบวนการนำขยะพลาสติกมาบด หลอม และขึ้นรูปเป็นผลิตภัณฑ์ใหม่ (เช่น ขวด PET นำไปทำเป็นเส้นใยโพลีเอสเตอร์ทอเสื้อผ้า) อย่างไรก็ตาม พลาสติกไม่ได้รีไซเคิลได้อย่างไม่มีที่สิ้นสุดเหมือนแก้วหรืออะลูมิเนียม ทุกครั้งที่หลอม คุณภาพพลาสติกจะลดลง (Downcycling) นอกจากนี้มีพลาสติกเพียง 9% ของทั่วโลกเท่านั้นที่ถูกรีไซเคิลจริง ส่วนที่เหลือถูกฝังกลบ เผา หรือทิ้งขว้าง ดังนั้น การรีไซเคิลจึงไม่ใช่ 'ทางออกเดียว' ที่สมบูรณ์แบบ เราต้องให้ความสำคัญกับ 'การลดการใช้' (Reduce) และ 'การใช้ซ้ำ' (Reuse) เป็นอันดับแรก ตามหลักเศรษฐกิจหมุนเวียน (Circular Economy) อ้างอิง: รายงานวงจรพลาสติกจากมูลนิธิ Ellen MacArthur Foundation; OECD Global Plastics Outlook.":""} />
        </SEOFAQ>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { ShareButtons } from "../ShareButtons";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, CalculationSteps } from "./shared";

// 1. BTU
export function BTUCalculator({ lang }: { lang: Lang }) {
  const [width, setWidth] = useLocalState("btu_w", "");
  const [length, setLength] = useLocalState("btu_l", "");
  const [roomType, setRoomType] = useLocalState("btu_type", "normal");
  const [btu, setBtu] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(width);
    const l = parseFloat(length);
    if (w > 0 && l > 0) {
      setBtu(Math.ceil((w * l) * (roomType === "sun" ? 900 : 800)));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "คำนวณ BTU แอร์" : "AC BTU Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-6 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "กว้าง (ม.)" : "Width (m)"}</label>
            <input type="number" value={width} onChange={e=>setWidth(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ยาว (ม.)" : "Length (m)"}</label>
            <input type="number" value={length} onChange={e=>setLength(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
          </div>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "สภาพห้อง" : "Room Condition"}</label>
          <select value={roomType} onChange={e=>setRoomType(e.target.value)} className={`${inputClass} focus:ring-blue-400`}>
            <option value="normal">{lang === "TH" ? "ห้องปกติ (ไม่ค่อยโดนแดด)" : "Normal Room"}</option>
            <option value="sun">{lang === "TH" ? "ห้องโดนแดด" : "Sunny Room"}</option>
          </select>
        </div>
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {btu && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center border border-blue-200 dark:border-blue-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "ขนาดแอร์ที่แนะนำ" : "Recommended BTU"}</p>
          <div className="text-5xl font-black text-blue-600 dark:text-blue-300">{btu.toLocaleString()} BTU</div>
          <ShareButtons title={`ขนาดแอร์ที่เหมาะกับห้องของฉันคือ ${btu.toLocaleString()} BTU`} />
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <div className="mt-8">
        <CalculationSteps 
          steps={lang === "TH" ? [
            "สูตรคำนวณเบื้องต้น: BTU = พื้นที่ห้อง (ตร.ม.) × ตัวคูณความร้อน",
            "ห้องปกติ (ไม่ค่อยโดนแดด) ใช้ตัวคูณ 800",
            "ห้องที่โดนแดดมาก ใช้ตัวคูณ 900",
            "ตัวอย่าง: ห้อง 4x5 ม. โดนแดด = 20 × 900 = 18,000 BTU"
          ] : [
            "Basic formula: BTU = Room Area (sq m) × Heat Factor",
            "Normal room (less sun): Factor = 800",
            "Sunny room: Factor = 900",
            "Example: 4x5m sunny room = 20 × 900 = 18,000 BTU"
          ]}
        />
        <SEOFAQ title={lang === "TH" ? "FAQ — การเลือกซื้อแอร์และการคำนวณ BTU" : "AC BTU FAQ"}>
          <FAQItem q={lang==="TH"?"BTU คืออะไร?":"What is BTU?"} a={lang==="TH"?"BTU (British Thermal Unit) คือหน่วยวัดปริมาณความร้อน สำหรับเครื่องปรับอากาศ 1 ตันความเย็น จะเท่ากับ 12,000 BTU ยิ่งห้องกว้าง ยิ่งต้องใช้ BTU สูงขึ้นเพื่อดึงความร้อนออกจากห้องให้เย็นลง":"BTU (British Thermal Unit) measures heat energy. In ACs, 1 ton of cooling equals 12,000 BTU. Larger rooms require higher BTU to effectively remove heat."} />
          <FAQItem q={lang==="TH"?"ทำไมห้องโดนแดดต้องเพิ่ม BTU?":"Why add BTU for sunny rooms?"} a={lang==="TH"?"ห้องที่โดนแดดโดยตรงจะสะสมความร้อนไว้ที่ผนังและเฟอร์นิเจอร์ หากใช้แอร์ BTU ต่ำ คอมเพรสเซอร์จะทำงานหนักตลอดเวลา ไม่ตัดการทำงาน ทำให้แอร์ไม่เย็น กินไฟ และอายุการใช้งานสั้นลง":"Sunny rooms store heat in walls and furniture. An undersized AC will run constantly without cycling off, leading to poor cooling, high electric bills, and a shorter lifespan."} />
          <FAQItem q={lang==="TH"?"ถ้าซื้อแอร์ BTU มากเกินไป (แอร์ใหญ่กว่าห้อง) จะเป็นไรไหม?":"What if the AC BTU is too high for the room?"} a={lang==="TH"?"ไม่ดีครับ เพราะคอมเพรสเซอร์จะตัดบ่อยเกินไป ทำให้ความชื้นในห้องยังไม่ทันถูกดูดออกไป (รู้สึกหนาวเหนอะหนะ) และกินไฟกระชากตอนสตาร์ทบ่อยครั้ง อีกทั้งค่าตัวเครื่องยังแพงเกินความจำเป็น":"It's bad. The compressor will cycle off too quickly before it can remove humidity, making the room feel cold and clammy. It also causes power spikes from frequent starts and costs more upfront."} />
          <FAQItem q={lang==="TH"?"ถ้าซื้อแอร์ BTU น้อยเกินไปล่ะ?":"What if the AC BTU is too low?"} a={lang==="TH"?"แอร์จะทำงานหนักตลอดเวลา (100% Load) เพื่อพยายามลดอุณหภูมิตามที่ตั้งไว้ แต่ก็ไม่เย็นถึงเป้าหมายสักที ทำให้เปลืองไฟอย่างมากและชิ้นส่วนพังเร็วกว่ากำหนด":"The AC will run continuously at 100% load trying to reach the set temperature but failing. This wastes a massive amount of electricity and wears out components prematurely."} />
          <FAQItem q={lang==="TH"?"ห้องเพดานสูง (Double Volume) ต้องคำนวณอย่างไร?":"How to calculate for high ceilings?"} a={lang==="TH"?"สำหรับห้องที่มีเพดานสูงเกิน 2.5-3 เมตร (เช่น แบบ Loft) ปริมาตรอากาศจะมากกว่าปกติ ต้องใช้สูตร: (กว้าง x ยาว x สูง x ตัวคูณ) / 3 หรือควรบวก BTU เพิ่ม 10-20% จากสูตรปกติ":"For ceilings higher than 2.5-3m, the air volume increases. Use: (W x L x H x Factor) / 3, or simply add 10-20% more BTU to the standard area-based calculation."} />
          <FAQItem q={lang==="TH"?"จำนวนคนในห้องมีผลต่อ BTU ไหม?":"Do people affect the required BTU?"} a={lang==="TH"?"มีผลมากครับ ร่างกายมนุษย์แผ่ความร้อนตลอดเวลา หากเป็นห้องประชุมหรือร้านอาหารที่มีคนเยอะ ควรบวกเพิ่ม 500-600 BTU ต่อคน (เกินจาก 2 คนแรก) เพื่อให้แอร์เอาชนะความร้อนได้":"Yes, heavily. Human bodies radiate heat. For meeting rooms or restaurants, you should add 500-600 BTU per person (beyond the first two people) to maintain cooling."} />
          <FAQItem q={lang==="TH"?"แอร์ Inverter ต่างกับแอร์ธรรมดาอย่างไร?":"Inverter vs. Non-Inverter AC?"} a={lang==="TH"?"แอร์ Inverter จะลดรอบคอมเพรสเซอร์ลงเมื่อเย็นถึงจุดที่ตั้งไว้ ทำให้ประหยัดไฟกว่า 20-30% และอุณหภูมิคงที่ ส่วนแอร์ธรรมดาจะใช้วิธี 'ตัด-ต่อ' ทำให้เดี๋ยวหนาวเดี๋ยวร้อน และกินไฟตอนสตาร์ท":"Inverters slow down the compressor when the target temp is reached, saving 20-30% energy and keeping temp stable. Non-inverters use a 'stop-start' method, causing temp fluctuations and power spikes."} />
          <FAQItem q={lang==="TH"?"ห้องกระจกเยอะๆ ต้องเผื่อ BTU เท่าไร?":"How much BTU for a room with lots of glass?"} a={lang==="TH"?"กระจกนำความร้อนได้ดีมาก หากมีหน้าต่างกระจกบานใหญ่ฝั่งทิศตะวันตกหรือทิศใต้ ควรเผื่อ BTU เพิ่มขึ้นอีก 10-15% หรือใช้ม่าน Blackout / ติดฟิล์มกันความร้อนช่วยลดโหลดแอร์":"Glass conducts heat rapidly. For large west/south-facing windows, add 10-15% more BTU. Using blackout curtains or thermal window films can drastically reduce the AC load."} />
          <FAQItem q={lang==="TH"?"ความหนาของฉนวนกันความร้อนบนฝ้าเพดาน ช่วยลด BTU ได้ไหม?":"Does ceiling insulation reduce required BTU?"} a={lang==="TH"?"ช่วยได้มหาศาลครับ การปูฉนวนใยแก้ว 6 นิ้วบนฝ้า จะลดความร้อนจากหลังคาได้ถึง 70% ทำให้คุณสามารถใช้แอร์ BTU ต่ำลงได้ และห้องเย็นเร็วขึ้นมาก":"Massively. Installing 6-inch fiberglass insulation above the ceiling blocks up to 70% of roof heat. This allows you to use a smaller AC, and the room cools much faster."} />
          <FAQItem q={lang==="TH"?"ควรล้างแอร์บ่อยแค่ไหนให้ประหยัดไฟ?":"How often to clean AC for energy savings?"} a={lang==="TH"?"ควรล้างฟิลเตอร์ด้วยตัวเองทุกๆ 2-4 สัปดาห์ และจ้างช่างมาล้างใหญ่ (ล้างรังผึ้ง/โบลเวอร์) ทุก 6 เดือน แอร์ที่สะอาดจะแลกเปลี่ยนความร้อนได้ดี ช่วยประหยัดไฟได้ 10-15%":"Clean the dust filters yourself every 2-4 weeks, and hire a pro for a deep clean (coils/blower) every 6 months. A clean AC exchanges heat efficiently, saving 10-15% on electricity."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 2. Electric Bill
export function ElectricCalculator({ lang }: { lang: Lang }) {
  const [units, setUnits] = useLocalState("elec_u", "");
  const [price, setPrice] = useLocalState("elec_p", "4.18");
  const [bill, setBill] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const u = parseFloat(units);
    const p = parseFloat(price);
    if (u > 0 && p > 0) setBill(u * p);
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "คำนวณค่าไฟฟ้า" : "Electricity Bill"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ปริมาณที่ใช้ (หน่วย/kWh)" : "Units Used (kWh)"}</label>
          <input type="number" value={units} onChange={e=>setUnits(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ราคาต่อหน่วย (บาท)" : "Price per Unit (฿)"}</label>
          <input type="number" step="0.01" value={price} onChange={e=>setPrice(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
        </div>
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600 shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {bill !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center border border-blue-200 dark:border-blue-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "ค่าไฟประเมินของคุณ" : "Estimated Bill"}</p>
          <div className="text-5xl font-black text-blue-600 dark:text-blue-400">{bill.toLocaleString(undefined, {maximumFractionDigits:2})} ฿</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <div className="mt-8">
        <CalculationSteps 
          steps={lang === "TH" ? [
            "1. ดูจำนวนหน่วยไฟฟ้าที่ใช้ (kWh) จากบิลค่าไฟหรือมิเตอร์",
            "2. นำจำนวนหน่วย × อัตราค่าไฟเฉลี่ยต่อหน่วย",
            "3. ค่าไฟที่คำนวณได้เป็นเพียงค่าไฟฐาน (Base Energy Charge) เท่านั้น",
            "4. ในบิลจริงจะมีการบวกค่า Ft, ภาษีมูลค่าเพิ่ม (VAT 7%) และค่าบริการรายเดือน"
          ] : [
            "1. Find units used (kWh) from your meter or bill.",
            "2. Multiply units × average price per unit.",
            "3. This calculates the Base Energy Charge only.",
            "4. Actual bills include Ft (Fuel adjustment), 7% VAT, and a monthly service fee."
          ]}
        />
        <SEOFAQ title={lang==="TH"?"FAQ — การคำนวณค่าไฟฟ้า":"Electricity Bill FAQ"}>
          <FAQItem q={lang==="TH"?"1 ยูนิต หรือ 1 หน่วยไฟฟ้า คืออะไร?":"What is 1 Unit (kWh) of electricity?"} a={lang==="TH"?"1 หน่วย (Unit) เท่ากับ 1 กิโลวัตต์-ชั่วโมง (kWh) หมายถึงการใช้เครื่องใช้ไฟฟ้าขนาด 1,000 วัตต์ อย่างต่อเนื่องเป็นเวลา 1 ชั่วโมง เช่น เตารีด 1,000W รีดผ้า 1 ชั่วโมง = กินไฟ 1 หน่วย":"1 Unit equals 1 Kilowatt-hour (kWh). It means using a 1,000-watt appliance continuously for 1 hour. Example: A 1,000W iron used for 1 hour = 1 unit of electricity."} />
          <FAQItem q={lang==="TH"?"ทำไมค่าไฟเฉลี่ยถึงตั้งไว้ที่ 4-5 บาท?":"Why is the average rate 4-5 THB?"} a={lang==="TH"?"อัตราค่าไฟของการไฟฟ้านครหลวง (กปน.) และภูมิภาค (กฟภ.) เป็นแบบอัตราก้าวหน้า ยิ่งใช้เยอะยิ่งแพง (หน่วยละ 2 ถึง 4 บาทกว่า) เมื่อรวมค่า Ft, ค่าบริการ และ VAT 7% ค่าเฉลี่ยสุทธิจะตกอยู่ประมาณ 4.18 - 5.00 บาท/หน่วย":"MEA/PEA rates are progressive; more usage = higher tiers (2 to 4+ THB/unit). Factoring in the Ft charge, service fee, and 7% VAT, the net average becomes ~4.18 - 5.00 THB/unit."} />
          <FAQItem q={lang==="TH"?"ค่า Ft (เอฟที) คืออะไร ทำไมต้องจ่าย?":"What is the Ft charge?"} a={lang==="TH"?"ค่า Ft (Float time / Fuel Adjustment Charge) คือค่าไฟฟ้าผันแปร ที่ปรับตามต้นทุนเชื้อเพลิง (เช่น ก๊าซธรรมชาติ, ถ่านหิน) และอัตราแลกเปลี่ยน ซึ่ง กกพ. จะทบทวนทุกๆ 4 เดือน อาจเป็นบวกหรือลบก็ได้":"Ft is a variable tariff adjusted every 4 months based on fuel costs (natural gas, coal) and exchange rates. It can be a positive addition or a negative discount on your bill."} />
          <FAQItem q={lang==="TH"?"ค่าบริการรายเดือนคืออะไร?":"What is the monthly service fee?"} a={lang==="TH"?"เป็นต้นทุนคงที่ของการไฟฟ้าในการจดหน่วยมิเตอร์ พิมพ์บิล และดูแลระบบ บ้านพักอาศัยทั่วไปจะเสีย 8.19 บาท หรือ 24.62 บาทต่อเดือน ขึ้นอยู่กับขนาดแอมป์ของมิเตอร์ (5(15)A หรือ 15(45)A)":"A fixed cost for meter reading, billing, and system maintenance. Standard homes pay 8.19 THB or 24.62 THB monthly, depending on meter capacity (e.g., 5(15)A vs 15(45)A)."} />
          <FAQItem q={lang==="TH"?"มิเตอร์ TOU (Time of Use) คืออะไร คุ้มไหม?":"What is a TOU meter? Is it worth it?"} a={lang==="TH"?"TOU คือมิเตอร์ที่คิดค่าไฟตามช่วงเวลา: กลางวัน (Peak) หน่วยละ ~5.8 บาท, กลางคืน/วันหยุด (Off-Peak) หน่วยละ ~2.6 บาท คุ้มมากหากคุณใช้ไฟกลางคืนเยอะ เช่น ชาร์จรถ EV (รถยนต์ไฟฟ้า) หรือซักผ้าตอนดึก":"TOU meters charge based on time: Day (Peak) ~5.8 THB, Night/Holidays (Off-Peak) ~2.6 THB. It's highly cost-effective if you consume heavily at night, like charging an EV or running ACs."} />
          <FAQItem q={lang==="TH"?"เครื่องใช้ไฟฟ้าอะไรกินไฟที่สุดในบ้าน?":"What appliances consume the most power?"} a={lang==="TH"?"เครื่องใช้ไฟฟ้าที่ทำความร้อนและความเย็นกินไฟมากที่สุด อันดับ 1 คือ แอร์ (เครื่องปรับอากาศ) ถัดมาคือ เครื่องทำน้ำอุ่น, เตารีด, ไมโครเวฟ, และตู้เย็น ควรเลือกฉลากประหยัดไฟเบอร์ 5 เสมอ":"Appliances generating heat/cold consume the most. #1 is the Air Conditioner, followed by water heaters, irons, microwaves, and refrigerators. Always choose 5-star energy ratings."} />
          <FAQItem q={lang==="TH"?"เปิดแอร์ 27 องศา พร้อมพัดลม ประหยัดไฟจริงไหม?":"Does AC at 27°C + Fan really save energy?"} a={lang==="TH"?"จริงครับ! การเปิดแอร์ 27°C คอมเพรสเซอร์จะทำงานน้อยลงมาก และการเปิดพัดลมช่วยเป่าให้ลมหมุนเวียน จะทำให้ร่างกายรู้สึกเย็นเหมือนอยู่ห้อง 24-25°C ช่วยประหยัดค่าไฟแอร์ได้ถึง 10-20%":"Yes! Setting the AC to 27°C greatly reduces compressor load. The fan's wind chill effect makes it feel like 24-25°C. This combination can save 10-20% on AC electricity costs."} />
          <FAQItem q={lang==="TH"?"เสียบปลั๊กทิ้งไว้ แม้ไม่ได้เปิดเครื่อง กินไฟไหม?":"Do plugged-in appliances consume power?"} a={lang==="TH"?"กินไฟครับ เรียกว่า Standby Power หรือ Vampire Load เครื่องใช้ไฟฟ้าที่มีไฟ LED โชว์ (เช่น ทีวี กล่องรับสัญญาณ ไมโครเวฟ) จะดึงไฟตลอดเวลา คิดเป็น 5-10% ของค่าไฟบ้าน ควรดึงปลั๊กออกเมื่อไม่ใช้":"Yes, called Standby Power or Vampire Load. Devices with LED displays or remote receivers (TVs, set-top boxes, microwaves) constantly draw power. It accounts for 5-10% of bills. Unplug when unused."} />
          <FAQItem q={lang==="TH"?"บ้านเช่า/หอพัก ทำไมค่าไฟแพงกว่าบ้านปกติ?":"Why is electricity dearer in dorms/rentals?"} a={lang==="TH"?"หอพักอพาร์ทเมนท์ส่วนใหญ่จะคิดค่าไฟเหมาจ่าย เช่น หน่วยละ 7-9 บาท เพื่อครอบคลุมค่าไฟส่วนกลาง (ทางเดิน ลิฟต์ ปั๊มน้ำ) และค่าบริหารจัดการ ซึ่งสูงกว่าเรทปกติของการไฟฟ้า (4-5 บาท)":"Dorms/Apartments usually charge a flat rate (e.g., 7-9 THB/unit) to cover common area electricity (hallways, elevators, water pumps) and management overheads, which is higher than the state rate (4-5 THB)."} />
          <FAQItem q={lang==="TH"?"โซลาร์เซลล์ (Solar Roof) คุ้มที่จะติดไหม?":"Is a Solar Roof worth installing?"} a={lang==="TH"?"หากค่าไฟบ้านคุณเกิน 3,000 บาท/เดือน และมีการใช้แอร์หรือทำงานอยู่บ้านช่วงกลางวัน (แดดออก) ถือว่าคุ้มมาก จุดคุ้มทุน (ROI) ปัจจุบันอยู่ที่ 4-6 ปี และสามารถประหยัดค่าไฟได้ระยะยาวกว่า 20 ปี":"If your bill exceeds 3,000 THB/month and you use AC/work from home during the day, it is highly worth it. Current ROI is 4-6 years, providing long-term savings for 20+ years."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 3. Water Bill
export function WaterCalculator({ lang }: { lang: Lang }) {
  const [units, setUnits] = useLocalState("water_u", "");
  const [price, setPrice] = useLocalState("water_p", "10.5");
  const [bill, setBill] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const u = parseFloat(units);
    const p = parseFloat(price);
    if (u > 0 && p > 0) setBill(u * p);
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "คำนวณค่าน้ำประปา" : "Water Bill"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ปริมาณน้ำที่ใช้ (คิว)" : "Units Used (Cubic Meters)"}</label>
          <input type="number" value={units} onChange={e=>setUnits(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ราคาต่อคิว (บาท)" : "Price per Unit (฿)"}</label>
          <input type="number" step="0.01" value={price} onChange={e=>setPrice(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
        </div>
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600 shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {bill !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center border border-blue-200 dark:border-blue-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "ค่าน้ำประเมินของคุณ" : "Estimated Bill"}</p>
          <div className="text-5xl font-black text-blue-600 dark:text-blue-400">{bill.toLocaleString(undefined, {maximumFractionDigits:2})} ฿</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 4. Base N — Full Feature
export function BaseNCalculator({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("basen_v", "255");
  const [fromBase, setFromBase] = useLocalState("basen_from", "10");
  const [customToBase, setCustomToBase] = useLocalState("basen_custom_to", "2");

  // Common bases to always show
  const commonBases = [
    { base: 2,  label: lang === "TH" ? "ฐาน 2 (Binary)" : "Base 2 (Binary)",         bg: "bg-blue-50 dark:bg-blue-900/20",     border: "border-blue-200 dark:border-blue-500/30",     text: "text-blue-600 dark:text-blue-400" },
    { base: 4,  label: lang === "TH" ? "ฐาน 4 (Quaternary)" : "Base 4 (Quaternary)", bg: "bg-purple-50 dark:bg-purple-900/20", border: "border-purple-200 dark:border-purple-500/30", text: "text-purple-600 dark:text-purple-400" },
    { base: 8,  label: lang === "TH" ? "ฐาน 8 (Octal)" : "Base 8 (Octal)",           bg: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-500/30", text: "text-orange-600 dark:text-orange-400" },
    { base: 10, label: lang === "TH" ? "ฐาน 10 (Decimal)" : "Base 10 (Decimal)",     bg: "bg-green-50 dark:bg-green-900/20",   border: "border-green-200 dark:border-green-500/30",   text: "text-green-600 dark:text-green-400" },
    { base: 16, label: lang === "TH" ? "ฐาน 16 (Hexadecimal)" : "Base 16 (Hex)",     bg: "bg-rose-50 dark:bg-rose-900/20",     border: "border-rose-200 dark:border-rose-500/30",     text: "text-rose-600 dark:text-rose-400" },
  ];

  const isValidForBase = (input: string, base: number): boolean => {
    if (!input) return false;
    const validChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, base);
    return input.toUpperCase().split("").every(c => validChars.includes(c));
  };

  const fb = parseInt(fromBase) || 10;
  const isValid = Boolean(val && isValidForBase(val, fb));
  const decimalValue = isValid ? parseInt(val.toUpperCase(), fb) : NaN;

  // Step-by-step: any base → decimal (positional notation)
  const getToDecimalSteps = () => {
    if (!isValid || isNaN(decimalValue) || fb === 10) return [];
    const digits = val.toUpperCase().split("").reverse();
    const rows = digits.map((d, i) => {
      const dVal = parseInt(d, fb);
      const power = Math.pow(fb, i);
      return { d, dVal, power, product: dVal * power };
    }).reverse();
    return rows;
  };

  // Step-by-step: decimal → any base (short division)
  const getDivisionSteps = (decimal: number, base: number) => {
    if (decimal === 0) return [{ dividend: 0, quotient: 0, remainder: "0" }];
    const steps: { dividend: number; quotient: number; remainder: string }[] = [];
    let n = decimal;
    while (n > 0) {
      const r = n % base;
      steps.push({ dividend: n, quotient: Math.floor(n / base), remainder: r.toString(base).toUpperCase() });
      n = Math.floor(n / base);
    }
    return steps;
  };

  const toDecimalRows = getToDecimalSteps();
  const customTo = Math.min(36, Math.max(2, parseInt(customToBase) || 2));
  const customResult = !isNaN(decimalValue) ? decimalValue.toString(customTo).toUpperCase() : "";
  const divSteps = !isNaN(decimalValue) && customTo !== 10 ? getDivisionSteps(decimalValue, customTo) : [];

  const quickBases = [2, 4, 8, 10, 16, 32, 36];

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">
        {lang === "TH" ? "แปลงเลขฐาน (ครบทุกฐาน)" : "Number Base Converter"}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {lang === "TH" ? "รองรับฐาน 2–36 พร้อมแสดงวิธีคำนวณทีละขั้น" : "Supports Base 2–36 with full step-by-step explanation"}
      </p>

      {/* ── Input Block ── */}
      <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-6">
        <label className={labelClass}>{lang === "TH" ? "ค่าที่ต้องการแปลง" : "Input Value"}</label>
        <input
          type="text"
          value={val}
          onChange={e => setVal(e.target.value.toUpperCase())}
          className={`${inputClass} font-mono text-xl text-center font-bold tracking-widest mb-4 ${
            val && !isValid ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-400"
          }`}
          placeholder="255 / FF / 11111111"
        />

        <label className={labelClass}>{lang === "TH" ? "จากฐาน (From Base)" : "From Base"}</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {quickBases.map(b => (
            <button
              key={b}
              type="button"
              onClick={() => setFromBase(String(b))}
              className={`px-3 py-1.5 rounded-lg font-bold text-sm border-2 transition-all ${
                fb === b ? "bg-blue-500 text-white border-blue-500" : "border-gray-200 dark:border-white/20 text-gray-600 dark:text-gray-300 hover:border-blue-400"
              }`}
            >
              {lang === "TH" ? `ฐาน ${b}` : `Base ${b}`}
            </button>
          ))}
        </div>
        <input
          type="number" min="2" max="36"
          value={fromBase}
          onChange={e => setFromBase(e.target.value)}
          className={`${inputClass} focus:ring-blue-400 w-28`}
          placeholder="2–36"
        />

        {val && !isValid && (
          <p className="mt-2 text-sm text-red-500 font-bold">
            ⚠️ {lang === "TH" ? `ตัวเลข "${val}" ไม่ถูกต้องสำหรับฐาน ${fb}` : `"${val}" contains invalid digit(s) for Base ${fb}`}
          </p>
        )}
      </div>

      {/* ── Results ── */}
      {isValid && !isNaN(decimalValue) && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

          {/* All common bases */}
          <h3 className="font-black text-gray-900 dark:text-white text-lg mb-3">
            🔢 {lang === "TH" ? "ผลลัพธ์ทุกฐานพร้อมกัน" : "Results in All Common Bases"}
          </h3>
          <div className="grid grid-cols-1 gap-3 mb-6">
            {commonBases.map(({ base, label, bg, border, text }) => {
              const result = decimalValue.toString(base).toUpperCase();
              const isSource = base === fb;
              return (
                <div
                  key={base}
                  className={`${bg} ${border} border-2 p-4 rounded-xl flex items-center justify-between gap-4 ${isSource ? "ring-2 ring-offset-2 ring-blue-400 dark:ring-blue-500" : ""}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">
                      {label}{isSource && <span className="ml-2 bg-blue-500 text-white px-2 py-0.5 rounded text-xs">INPUT</span>}
                    </p>
                    <p className={`text-xl font-black font-mono tracking-widest break-all ${text}`}>{result}</p>
                  </div>
                  <button
                    onClick={() => { setVal(result); setFromBase(String(base)); }}
                    className="text-xs font-bold bg-white dark:bg-white/10 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/20 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/20 transition-colors flex-shrink-0"
                  >
                    {lang === "TH" ? "ใช้ค่านี้" : "Use"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Step-by-step: Input → Decimal */}
          {toDecimalRows.length > 0 && (
            <CalculationSteps
              title={lang === "TH" ? `📐 วิธีแปลงฐาน ${fb} → ฐาน 10 ทีละขั้น` : `📐 How to Convert Base ${fb} → Base 10`}
              steps={
                <div>
                  <p className="mb-3 font-bold">
                    {lang === "TH"
                      ? `${val} (ฐาน ${fb}) = กระจายค่าประจำหลัก:`
                      : `${val} (Base ${fb}) = Expand positional values:`}
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm font-mono mb-3">
                      <thead>
                        <tr className="text-blue-800 dark:text-blue-300 text-xs font-bold border-b border-blue-300 dark:border-blue-700">
                          <th className="text-left py-1 pr-3">{lang === "TH" ? "หลัก" : "Digit"}</th>
                          <th className="text-left py-1 pr-3">{lang === "TH" ? "ตำแหน่ง" : "Position"}</th>
                          <th className="text-left py-1 pr-3">{lang === "TH" ? "ค่าประจำหลัก" : "Positional Value"}</th>
                          <th className="text-left py-1">{lang === "TH" ? "ผลคูณ" : "Product"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {toDecimalRows.map((row, i) => (
                          <tr key={i} className="border-b border-blue-100 dark:border-blue-800/30 text-blue-900 dark:text-blue-100">
                            <td className="py-1 pr-3 font-black">{row.d}</td>
                            <td className="py-1 pr-3">{fb}^{toDecimalRows.length - 1 - i}</td>
                            <td className="py-1 pr-3">{row.d} × {row.power}</td>
                            <td className="py-1 font-bold">{row.product}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="font-black text-green-700 dark:text-green-300 text-base border-t border-blue-300 dark:border-blue-700 pt-2">
                      {lang === "TH" ? "รวมทั้งหมด" : "Total"} = {toDecimalRows.map(r => r.product).join(" + ")} = <span className="text-xl">{decimalValue}</span>
                    </p>
                  </div>
                </div>
              }
            />
          )}

          {/* ── Custom base converter ── */}
          <div className="mt-6 bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10">
            <h3 className="font-black text-gray-900 dark:text-white text-lg mb-4">
              🎯 {lang === "TH" ? "แปลงเป็นฐานที่กำหนดเอง (ฐาน 2–36)" : "Convert to Any Custom Base (2–36)"}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {quickBases.map(b => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setCustomToBase(String(b))}
                  className={`px-3 py-1.5 rounded-lg font-bold text-sm border-2 transition-all ${
                    customTo === b ? "bg-purple-500 text-white border-purple-500" : "border-gray-200 dark:border-white/20 text-gray-600 dark:text-gray-300 hover:border-purple-400"
                  }`}
                >
                  {lang === "TH" ? `ฐาน ${b}` : `Base ${b}`}
                </button>
              ))}
            </div>
            <div className="flex gap-3 items-center mb-4">
              <input
                type="number" min="2" max="36"
                value={customToBase}
                onChange={e => setCustomToBase(e.target.value)}
                className={`${inputClass} focus:ring-purple-400 w-28`}
                placeholder="2–36"
              />
              <span className="text-gray-400 font-bold text-2xl">→</span>
              <div className="flex-1 p-4 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl text-center">
                <p className="text-3xl font-black font-mono text-purple-600 dark:text-purple-400 tracking-widest break-all">{customResult || "—"}</p>
                <p className="text-xs text-gray-500 mt-1">{lang === "TH" ? `ฐาน ${customTo}` : `Base ${customTo}`}</p>
              </div>
            </div>

            {/* Division table */}
            {divSteps.length > 0 && (
              <div className="mt-4 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-500/20">
                <p className="font-bold text-purple-800 dark:text-purple-300 mb-3 text-sm">
                  📐 {lang === "TH" ? `วิธีแปลงฐาน 10 → ฐาน ${customTo} (วิธีหารสั้น)` : `Base 10 → Base ${customTo} (Short Division Method)`}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-mono">
                    <thead>
                      <tr className="text-purple-700 dark:text-purple-300 text-xs font-bold border-b border-purple-200 dark:border-purple-700">
                        <th className="text-left pb-2 pr-4">{lang === "TH" ? "ตัวตั้ง" : "Dividend"}</th>
                        <th className="text-left pb-2 pr-4">÷ {customTo}</th>
                        <th className="text-left pb-2 pr-4">{lang === "TH" ? "ผลหาร" : "Quotient"}</th>
                        <th className="text-left pb-2">{lang === "TH" ? "เศษ" : "Remainder"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {divSteps.map((s, i) => (
                        <tr key={i} className={`border-b border-purple-100 dark:border-purple-800/30 ${i === divSteps.length - 1 ? "text-green-700 dark:text-green-300 font-black" : "text-purple-900 dark:text-purple-200"}`}>
                          <td className="py-1 pr-4">{s.dividend}</td>
                          <td className="py-1 pr-4">÷ {customTo}</td>
                          <td className="py-1 pr-4">{s.quotient}</td>
                          <td className="py-1 font-black">{s.remainder}{i === divSteps.length - 1 ? " ← MSB" : ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-3 pt-2 border-t border-purple-300 dark:border-purple-700">
                    <p className="text-sm text-purple-800 dark:text-purple-200">
                      {lang === "TH" ? "อ่านเศษจากล่างขึ้นบน →" : "Read remainders bottom-to-top →"}
                      <span className="ml-2 text-xl font-black tracking-widest">{customResult}</span>
                      <span className="ml-2 text-xs text-gray-500">(Base {customTo})</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {customTo === 10 && customResult && (
              <p className="text-sm text-gray-500 mt-3 italic">
                {lang === "TH" ? "*ฐาน 10 คือ Decimal อยู่แล้ว ไม่ต้องแปลง" : "*Base 10 is decimal — no conversion needed."}
              </p>
            )}
          </div>

          <AdPlaceholder type="in-article" />

          <div className="mt-8">
            <CalculationSteps 
              steps={lang === "TH" ? [
                "1. ตรวจสอบความถูกต้องของอักขระ (เช่น ฐาน 2 มีแค่ 0,1 | ฐาน 16 มี 0-9 และ A-F)",
                "2. หากไม่ใช่ฐาน 10 จะแปลงอินพุตเป็นฐาน 10 ก่อน ด้วยวิธี 'กระจายค่าประจำหลัก'",
                "3. นำค่าฐาน 10 ที่ได้ มาแปลงเป็นฐานปลายทาง ด้วยวิธี 'หารสั้น' แล้วนำเศษมาต่อกัน"
              ] : [
                "1. Validate digits (e.g., Base 2 allows 0,1 | Base 16 allows 0-9, A-F).",
                "2. Convert input to Base 10 first using positional expansion.",
                "3. Convert Base 10 to target base using short division and reading remainders."
              ]}
            />
            <SEOFAQ title={lang === "TH" ? "FAQ — การแปลงเลขฐาน (Base N)" : "Number Base Converter FAQ"}>
              <FAQItem q={lang === "TH" ? "เลขฐาน 2 (Binary) คืออะไร ทำไมคอมพิวเตอร์ใช้?" : "What is binary (Base 2) and why computers use it?"} a={lang === "TH" ? "คอมพิวเตอร์ทำงานด้วยวงจรไฟฟ้าที่มีแค่ 2 สถานะ: เปิด (1) และ ปิด (0) จึงใช้เลขฐาน 2 เก็บและประมวลผลข้อมูลทุกอย่าง ไม่ว่าตัวเลข ข้อความ หรือรูปภาพ" : "Computers use electrical circuits with only 2 states — ON (1) and OFF (0). Every piece of data is stored as combinations of these bits."} />
              <FAQItem q={lang === "TH" ? "เลขฐาน 16 (Hexadecimal) ใช้ที่ไหนบ้าง?" : "Where is Hexadecimal (Base 16) used?"} a={lang === "TH" ? "ใช้กันมากในการเขียนโปรแกรมและระบบเครือข่าย เช่น รหัสสีใน CSS (#FF5733), ที่อยู่หน่วยความจำ (Memory Address), ค่า Hash ในบล็อกเชน, และ MAC Address ของอุปกรณ์" : "Widely used in programming and networking: CSS color codes (#FF5733), memory addresses, Blockchain hash values, and MAC addresses."} />
              <FAQItem q={lang === "TH" ? "เลขฐาน 8 (Octal) ปัจจุบันยังใช้ไหม?" : "Is Octal (Base 8) still used?"} a={lang === "TH" ? "แม้ความนิยมจะลดลงเมื่อเทียบกับ Hex แต่ฐาน 8 ยังคงใช้ในระบบ Unix/Linux สำหรับกำหนดสิทธิ์ไฟล์ (File Permissions) เช่น chmod 777 (หมายถึง rwxrwxrwx)" : "Though less popular than Hex, Octal is still heavily used in Unix/Linux systems for setting file permissions, e.g., chmod 777 (rwxrwxrwx)."} />
              <FAQItem q={lang === "TH" ? "ตัวอักษร A-Z ในเลขฐานคืออะไร?" : "What do letters A-Z mean in bases?"} a={lang === "TH" ? "เนื่องจากตัวเลขมีแค่ 0-9 เมื่อถึงหลักที่ 10 ขึ้นไป จะใช้อักษรภาษาอังกฤษแทน เช่น A=10, B=11, C=12... ไปจนถึง Z=35 ทำให้เลขฐานสูงสุดที่เป็นไปได้คือฐาน 36 (Alphanumeric)" : "Since digits only go 0-9, English letters are used for values 10 and above. A=10, B=11, C=12... up to Z=35. This allows a maximum base of 36 (Alphanumeric)."} />
              <FAQItem q={lang === "TH" ? "วิธีแปลงเลขฐาน 2 → ฐาน 10 ด้วยมือทำอย่างไร?" : "How to convert binary to decimal manually?"} a={lang === "TH" ? "กระจายแต่ละหลักคูณด้วย 2 ยกกำลังตำแหน่ง (นับจาก 0 ทางขวา) แล้วบวกทุกค่า เช่น: 1011₂ = (1×2³) + (0×2²) + (1×2¹) + (1×2⁰) = 8 + 0 + 2 + 1 = 11" : "Multiply each digit by 2^position (from right, starting at 0) and sum all values. Ex: 1011₂ = (1×8) + (0×4) + (1×2) + (1×1) = 11."} />
              <FAQItem q={lang === "TH" ? "วิธีแปลงฐาน 10 → ฐานอื่น ด้วยมือทำอย่างไร?" : "How to convert decimal to another base?"} a={lang === "TH" ? "ใช้วิธี 'หารสั้น' นำเลขฐาน 10 มาตั้งหารด้วยฐานที่ต้องการ จดเศษเอาไว้ แล้วนำผลหารมาหารซ้ำจนกว่าจะเหลือ 0 จากนั้นให้อ่านเศษจาก 'ล่างขึ้นบน' ก็จะได้ผลลัพธ์" : "Use 'Short Division': divide the decimal number by the target base, note the remainder, repeat with the quotient until 0, then read remainders from bottom-to-top."} />
              <FAQItem q={lang === "TH" ? "มีวิธีลัดแปลงฐาน 2 เป็นฐาน 16 ไหม?" : "Is there a shortcut to convert Base 2 to Base 16?"} a={lang === "TH" ? "มีครับ! ให้แบ่งกลุ่มเลขฐาน 2 จากขวาไปซ้าย 'กลุ่มละ 4 ตัว' (ถ้าไม่ครบเติม 0 ข้างหน้า) แล้วแปลงแต่ละกลุ่มเป็น Hex โดยตรง เช่น 101111₂ แบ่งเป็น 0010 (2) และ 1111 (F) รวมเป็น 2F₁₆" : "Yes! Group the binary digits into 'chunks of 4' from right to left (pad with leading 0s). Convert each chunk to Hex. Ex: 101111₂ -> 0010 (2) and 1111 (F) -> 2F₁₆."} />
              <FAQItem q={lang === "TH" ? "มีวิธีลัดแปลงฐาน 2 เป็นฐาน 8 ไหม?" : "Is there a shortcut for Base 2 to Base 8?"} a={lang === "TH" ? "ใช้หลักการคล้ายกัน แต่แบ่งกลุ่ม 'กลุ่มละ 3 ตัว' จากขวาไปซ้าย แล้วแปลงทีละกลุ่ม เช่น 101111₂ แบ่งเป็น 101 (5) และ 111 (7) รวมเป็น 57₈" : "Similar to Hex, but group the binary digits into 'chunks of 3' from right to left. Convert each chunk. Ex: 101111₂ -> 101 (5) and 111 (7) -> 57₈."} />
              <FAQItem q={lang === "TH" ? "เลขฐาน 64 (Base64) จัดเป็นเลขฐานทางคณิตศาสตร์ไหม?" : "Is Base64 a mathematical number base?"} a={lang === "TH" ? "Base64 ไม่ใช่เลขฐานทางคณิตศาสตร์แท้จริง แต่เป็น 'วิธีการเข้ารหัสข้อมูล (Encoding)' เพื่อแปลงข้อมูลไบนารี (เช่น ไฟล์ภาพ) ให้อยู่ในรูปตัวอักษร 64 ตัว ที่สามารถส่งผ่าน HTTP หรือ Email ได้อย่างปลอดภัย" : "Base64 is an 'encoding scheme', not a strict mathematical base. It translates binary data (like images) into 64 safe ASCII characters for transmission over HTTP/Email."} />
              <FAQItem q={lang === "TH" ? "Bit กับ Byte ต่างกันอย่างไร?" : "Difference between Bit and Byte?"} a={lang === "TH" ? "Bit คือหน่วยเล็กที่สุดมีค่า 0 หรือ 1 ส่วน Byte คือการนำ Bit มาต่อกัน 8 ตัว (1 Byte = 8 Bits) ซึ่ง 1 Byte สามารถใช้แทนตัวอักษร 1 ตัว (ASCII) หรือค่า 0-255 ในเลขฐาน 10" : "A Bit is the smallest unit (0 or 1). A Byte is 8 bits grouped together (1 Byte = 8 Bits). One Byte can represent a single ASCII character or decimal values 0-255."} />
            </SEOFAQ>
          </div>
        </motion.div>
      )}
    </div>
  );
}


// 5. Ohm's Law
export function OhmCalculator({ lang }: { lang: Lang }) {
  const [v, setV] = useLocalState("ohm_v", "");
  const [i, setI] = useLocalState("ohm_i", "");
  const [r, setR] = useLocalState("ohm_r", "");
  const [res, setRes] = useState("");

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const V = parseFloat(v);
    const I = parseFloat(i);
    const R = parseFloat(r);
    
    if (!isNaN(I) && !isNaN(R)) setRes(`V = ${(I * R).toFixed(2)} Volts`);
    else if (!isNaN(V) && !isNaN(R)) setRes(`I = ${(V / R).toFixed(2)} Amps`);
    else if (!isNaN(V) && !isNaN(I)) setRes(`R = ${(V / I).toFixed(2)} Ohms`);
    else setRes("Please enter 2 values");
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-500">{lang === "TH" ? "กฎของโอห์ม" : "Ohm's Law"}</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{lang === "TH" ? "กรอก 2 ค่าเพื่อหาค่าที่เหลือ" : "Enter 2 values to find the 3rd"}</p>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <input type="number" step="any" placeholder="Voltage (V)" value={v} onChange={e=>setV(e.target.value)} className={`${inputClass} focus:ring-blue-500`} />
        <input type="number" step="any" placeholder="Current (I)" value={i} onChange={e=>setI(e.target.value)} className={`${inputClass} focus:ring-blue-500`} />
        <input type="number" step="any" placeholder="Resistance (R)" value={r} onChange={e=>setR(e.target.value)} className={`${inputClass} focus:ring-blue-500`} />
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600 shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {res && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center border border-blue-200 dark:border-blue-500/30">
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{res}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 6. Resistor
export function ResistorCalculator({ lang }: { lang: Lang }) {
  const [bandType, setBandType] = useLocalState("res_type", "4");
  const [b1, setB1] = useLocalState("res_b1", "1");
  const [b2, setB2] = useLocalState("res_b2", "0");
  const [b3, setB3] = useLocalState("res_b3", "0");
  const [mul, setMul] = useLocalState("res_mul", "1");
  const [tol, setTol] = useLocalState("res_tol", "5");
  const [res, setRes] = useState("");

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    let valStr = "";
    if (bandType === "4") valStr = `${b1}${b2}`;
    else valStr = `${b1}${b2}${b3}`;
    
    const val = parseInt(valStr) * parseFloat(mul);
    let displayVal = `${val} Ω`;
    if (val >= 1000000) displayVal = `${val/1000000} MΩ`;
    else if (val >= 1000) displayVal = `${val/1000} kΩ`;

    setRes(`${displayVal} ±${tol}%`);
  };

  const colors = [
    { name: "Black", val: "0", mul: "1" },
    { name: "Brown", val: "1", mul: "10" },
    { name: "Red", val: "2", mul: "100" },
    { name: "Orange", val: "3", mul: "1000" },
    { name: "Yellow", val: "4", mul: "10000" },
    { name: "Green", val: "5", mul: "100000" },
    { name: "Blue", val: "6", mul: "1000000" },
    { name: "Violet", val: "7", mul: "10000000" },
    { name: "Gray", val: "8", mul: "100000000" },
    { name: "White", val: "9", mul: "1000000000" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "อ่านค่าตัวต้านทาน" : "Resistor Color Code"}</h2>
      
      <div className="flex gap-4 mt-6 mb-4">
        <button onClick={() => setBandType("4")} className={`px-4 py-2 rounded-full font-bold text-sm ${bandType === "4" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300"}`}>4-Band</button>
        <button onClick={() => setBandType("5")} className={`px-4 py-2 rounded-full font-bold text-sm ${bandType === "5" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300"}`}>5-Band</button>
      </div>

      <form onSubmit={calculate} className="space-y-4">
        <select value={b1} onChange={e=>setB1(e.target.value)} className={`${inputClass} focus:ring-blue-500`}>
          {colors.map(c => <option key={c.name} value={c.val}>Band 1: {c.name}</option>)}
        </select>
        <select value={b2} onChange={e=>setB2(e.target.value)} className={`${inputClass} focus:ring-blue-500`}>
          {colors.map(c => <option key={c.name} value={c.val}>Band 2: {c.name}</option>)}
        </select>
        {bandType === "5" && (
          <select value={b3} onChange={e=>setB3(e.target.value)} className={`${inputClass} focus:ring-blue-500`}>
            {colors.map(c => <option key={c.name} value={c.val}>Band 3: {c.name}</option>)}
          </select>
        )}
        <select value={mul} onChange={e=>setMul(e.target.value)} className={`${inputClass} focus:ring-blue-500`}>
          {colors.map(c => <option key={c.name} value={c.mul}>Multiplier: {c.name}</option>)}
          <option value="0.1">Multiplier: Gold (0.1)</option>
          <option value="0.01">Multiplier: Silver (0.01)</option>
        </select>
        <select value={tol} onChange={e=>setTol(e.target.value)} className={`${inputClass} focus:ring-blue-500`}>
          <option value="1">Tolerance: Brown (±1%)</option>
          <option value="2">Tolerance: Red (±2%)</option>
          <option value="0.5">Tolerance: Green (±0.5%)</option>
          <option value="0.25">Tolerance: Blue (±0.25%)</option>
          <option value="5">Tolerance: Gold (±5%)</option>
          <option value="10">Tolerance: Silver (±10%)</option>
        </select>
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600 shadow-md">{lang === "TH" ? "อ่านค่า" : "Read Value"}</button>
      </form>
      {res && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center border border-blue-200 dark:border-blue-500/30">
          <div className="text-4xl font-black text-blue-600 dark:text-blue-400">{res}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 7. GPA
export function GPACalculator({ lang }: { lang: Lang }) {
  const [subjects, setSubjects] = useLocalState("gpa_subs", [{ name: "", credit: "", grade: "4" }]);
  const [gpa, setGpa] = useState<number | null>(null);

  const calculate = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    subjects.forEach(s => {
      const c = parseFloat(s.credit);
      const g = parseFloat(s.grade);
      if (!isNaN(c) && !isNaN(g)) {
        totalCredits += c;
        totalPoints += c * g;
      }
    });
    if (totalCredits > 0) setGpa(totalPoints / totalCredits);
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "จำลองเกรดเบื้องต้น (GPA)" : "GPA Simulator"}</h2>
      <div className="space-y-4 mt-6">
        {subjects.map((sub, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <input type="text" placeholder={lang==="TH"?"ชื่อวิชา (ไม่บังคับ)":"Subject Name"} value={sub.name} onChange={e => {
              const newSubs = [...subjects]; newSubs[i].name = e.target.value; setSubjects(newSubs);
            }} className={`sm:w-1/3 ${inputClass} focus:ring-blue-400`} />
            <div className="flex gap-2 sm:w-2/3">
              <input type="number" placeholder={lang==="TH"?"หน่วยกิต":"Credits"} value={sub.credit} onChange={e => {
                const newSubs = [...subjects]; newSubs[i].credit = e.target.value; setSubjects(newSubs);
              }} className={`w-1/2 ${inputClass} focus:ring-blue-400`} />
              <select value={sub.grade} onChange={e => {
                const newSubs = [...subjects]; newSubs[i].grade = e.target.value; setSubjects(newSubs);
              }} className={`w-1/2 ${inputClass} focus:ring-blue-400`}>
                <option value="4">A (4.0)</option>
                <option value="3.5">B+ (3.5)</option>
                <option value="3">B (3.0)</option>
                <option value="2.5">C+ (2.5)</option>
                <option value="2">C (2.0)</option>
                <option value="1.5">D+ (1.5)</option>
                <option value="1">D (1.0)</option>
                <option value="0">F (0.0)</option>
              </select>
              <button onClick={() => {
                const newSubs = subjects.filter((_, idx) => idx !== i);
                setSubjects(newSubs.length > 0 ? newSubs : [{ name: "", credit: "", grade: "4" }]);
              }} className="px-3 bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 rounded font-bold">X</button>
            </div>
          </div>
        ))}
        <button onClick={() => setSubjects([...subjects, { name: "", credit: "", grade: "4" }])} className="text-sm text-blue-600 dark:text-blue-400 font-bold hover:underline">+ {lang === "TH" ? "เพิ่มวิชา" : "Add Subject"}</button>
        <button onClick={calculate} className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600 shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </div>
      {gpa !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center border border-blue-200 dark:border-blue-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "เกรดเฉลี่ยของคุณคือ" : "Your GPA"}</p>
          <div className="text-5xl font-black text-blue-600 dark:text-blue-300">{gpa.toFixed(2)}</div>
          <ShareButtons title={`เทอมนี้ได้เกรด ${gpa.toFixed(2)} แหละทุกคน!`} />
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 8. Fuel Cost
export function FuelCostCalculator({ lang }: { lang: Lang }) {
  const [distance, setDistance] = useLocalState("fuel_dist", "");
  const [efficiency, setEfficiency] = useLocalState("fuel_eff", "15");
  const [price, setPrice] = useLocalState("fuel_price", "35.50");
  const [result, setResult] = useState<{liters: number, cost: number} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const d = parseFloat(distance);
    const eff = parseFloat(efficiency);
    const p = parseFloat(price);

    if (d > 0 && eff > 0 && p > 0) {
      const liters = d / eff;
      const cost = liters * p;
      setResult({ liters, cost });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "คำนวณค่าน้ำมันรถยนต์" : "Fuel Cost Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ระยะทาง (กม.)" : "Distance (km)"}</label>
          <input type="number" step="0.1" value={distance} onChange={e=>setDistance(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} placeholder={lang==="TH"?"เช่น 250":"e.g. 250"} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "อัตราสิ้นเปลือง (กม./ลิตร)" : "Fuel Efficiency (km/L)"}</label>
            <input type="number" step="0.1" value={efficiency} onChange={e=>setEfficiency(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ราคาน้ำมัน (บาท/ลิตร)" : "Fuel Price per Liter"}</label>
            <input type="number" step="0.01" value={price} onChange={e=>setPrice(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded-xl hover:bg-blue-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณค่าน้ำมัน" : "Calculate"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-500/30 p-6 rounded-2xl text-center shadow-neo mb-6">
            <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2 uppercase tracking-wide">
              {lang === "TH" ? "ค่าน้ำมันรวมทั้งหมด" : "Total Fuel Cost"}
            </p>
            <div className="text-5xl font-black text-blue-600 dark:text-blue-400 mb-4">
              ฿ {Math.ceil(result.cost).toLocaleString()}
            </div>
            <div className="w-full h-px bg-blue-200 dark:bg-blue-500/30 my-4"></div>
            <div className="flex justify-between items-center text-gray-600 dark:text-gray-300 font-bold">
              <span>{lang === "TH" ? "ใช้น้ำมันไปประมาณ:" : "Estimated Fuel Used:"}</span>
              <span className="text-xl text-blue-600 dark:text-blue-400">{result.liters.toFixed(1)} {lang === "TH" ? "ลิตร" : "Liters"}</span>
            </div>
          </div>

          <CalculationSteps 
            title={lang === "TH" ? "สูตรคำนวณ" : "How it works"}
            steps={
              <ul className="list-disc list-inside">
                <li>{lang === "TH" ? `จำนวนลิตร: ${distance} กม. ÷ ${efficiency} กม./ลิตร = ${result.liters.toFixed(2)} ลิตร` : `Liters: ${distance} km ÷ ${efficiency} km/l = ${result.liters.toFixed(2)} L`}</li>
                <li>{lang === "TH" ? `ค่าน้ำมัน: ${result.liters.toFixed(2)} ลิตร × ${price} บาท = ฿ ${result.cost.toFixed(2)}` : `Total: ${result.liters.toFixed(2)} L × ${price} = ฿ ${result.cost.toFixed(2)}`}</li>
              </ul>
            }
          />
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "คำนวณค่าน้ำมัน (FAQ)" : "Fuel Cost FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ดูอัตราสิ้นเปลืองน้ำมันของรถได้ที่ไหน?" : "Where to find fuel efficiency?"}
          a={lang === "TH" ? "รถยนต์ส่วนใหญ่สามารถดูได้ที่หน้าปัดดิจิตอล (เขียนว่า AVG. km/L) หรือถ้าไม่ทราบ รถเก๋งปกติจะอยู่ที่ประมาณ 12-15 กม./ลิตร ส่วนอีโคคาร์จะอยู่ที่ 18-22 กม./ลิตร" : "Check your car's dashboard (AVG km/L). Generally, sedans are 12-15 km/L, eco-cars 18-22 km/L."}
        />
        <FAQItem 
          q={lang === "TH" ? "คำนวณค่าน้ำมันรถยนต์ เดินทางต่างจังหวัดต้องเผื่อไหม?" : "Should I add margin for long trips?"}
          a={lang === "TH" ? "ควรเผื่อค่าน้ำมันไว้ประมาณ 10-15% จากที่คำนวณได้ เผื่อกรณีรถติด หลงทาง หรือแวะจอดพักปั๊ม" : "It's recommended to add 10-15% margin for traffic, stops, or detours."}
        />
      </SEOFAQ>
    </div>
  );
}

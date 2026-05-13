"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem } from "./shared";

// 1. Randomizer
export function RandomizerCalculator({ lang }: { lang: Lang }) {
  const [mode, setMode] = useLocalState("rand_mode", "number");
  const [min, setMin] = useLocalState("rand_min", "1");
  const [max, setMax] = useLocalState("rand_max", "100");
  const [names, setNames] = useLocalState("rand_names", "");
  const [res, setRes] = useState<string | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if(mode === "number") {
      const mn = parseInt(min);
      const mx = parseInt(max);
      if(mx >= mn) {
        setRes(Math.floor(Math.random() * (mx - mn + 1) + mn).toString());
      }
    } else {
      const list = names.split("\n").filter(n => n.trim() !== "");
      if(list.length > 0) {
        setRes(list[Math.floor(Math.random() * list.length)]);
      }
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600 dark:text-purple-400">{lang === "TH" ? "สุ่มเลข/สุ่มชื่อ" : "Randomizer"}</h2>
      
      <div className="flex gap-4 mt-6 mb-4">
        <button onClick={() => setMode("number")} className={`px-4 py-2 rounded-full font-bold text-sm ${mode === "number" ? "bg-purple-500 text-white" : "bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300"}`}>{lang==="TH"?"สุ่มตัวเลข":"Numbers"}</button>
        <button onClick={() => setMode("name")} className={`px-4 py-2 rounded-full font-bold text-sm ${mode === "name" ? "bg-purple-500 text-white" : "bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300"}`}>{lang==="TH"?"สุ่มชื่อ":"Names"}</button>
      </div>

      <form onSubmit={calculate} className="space-y-4">
        {mode === "number" ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าน้อยสุด" : "Min"}</label>
              <input type="number" value={min} onChange={e=>setMin(e.target.value)} required className={`${inputClass} focus:ring-purple-500`} />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่ามากสุด" : "Max"}</label>
              <input type="number" value={max} onChange={e=>setMax(e.target.value)} required className={`${inputClass} focus:ring-purple-500`} />
            </div>
          </div>
        ) : (
          <div>
            <label className={labelClass}>{lang === "TH" ? "รายชื่อ (กด Enter เพื่อขึ้นบรรทัดใหม่)" : "List of Names (One per line)"}</label>
            <textarea rows={5} value={names} onChange={e=>setNames(e.target.value)} required className={`${inputClass} focus:ring-purple-500 resize-none`} placeholder={lang==="TH"?"นาย เอ\nนาย บี\nนาย ซี":"Alice\nBob\nCharlie"} />
          </div>
        )}
        <button type="submit" className="w-full py-4 bg-purple-500 font-bold text-white rounded hover:bg-purple-600 shadow-md">{lang === "TH" ? "สุ่มเลย!" : "Randomize!"}</button>
      </form>
      {res !== null && (
        <motion.div initial={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}} className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/30 rounded-xl text-center border border-purple-200 dark:border-purple-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "ผู้โชคดีคือ..." : "The winner is..."}</p>
          <div className="text-5xl font-black text-purple-600 dark:text-purple-400">{res}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang==="TH"?"FAQ — สุ่มเลข/สุ่มชื่อ":"Randomizer FAQ"}>
        <FAQItem q={lang==="TH"?"ระบบสุ่มนี้ยุติธรรมจริงไหม?":"Is this randomizer truly fair?"} a={lang==="TH"?"ใช่ เครื่องมือนี้ใช้ Math.random() ของ JavaScript ซึ่งเป็น Pseudo-Random Number Generator (PRNG) ที่ให้ผลลัพธ์กระจายตัวสม่ำเสมอ (Uniform Distribution) เพียงพอสำหรับการใช้งานทั่วไป เช่น จับฉลาก สุ่มคิว สุ่มรางวัล แต่ไม่เหมาะสำหรับงานด้านความปลอดภัย/การเข้ารหัส ซึ่งต้องใช้ Crypto.getRandomValues() แทน | อ้างอิง: MDN Web Docs — Math.random(), NIST SP 800-90A (Recommendation for Random Number Generation).":"Yes. This uses JavaScript's Math.random() — a PRNG with uniform distribution, sufficient for lotteries, queues, and prizes. Not suitable for cryptographic use (use Crypto.getRandomValues() instead). | Source: MDN Web Docs — Math.random(), NIST SP 800-90A."} />
        <FAQItem q={lang==="TH"?"สุ่มแบบไม่ซ้ำได้ไหม?":"Can I randomize without repeats?"} a={lang==="TH"?"เวอร์ชันปัจจุบันเป็นการสุ่มแบบอิสระ (Independent Random) แต่ละครั้งมีโอกาสออกซ้ำได้ หากต้องการสุ่มแบบไม่ซ้ำ (Sampling Without Replacement) แนะนำให้ใส่รายชื่อทั้งหมดในโหมดสุ่มชื่อ แล้วลบชื่อที่ถูกสุ่มแล้วออก | อ้างอิง: Knuth DE. (1997). The Art of Computer Programming Vol. 2: Seminumerical Algorithms. Addison-Wesley.":"Current version uses independent random draws (may repeat). For sampling without replacement, use name mode and remove drawn names. | Source: Knuth (1997) The Art of Computer Programming Vol. 2."} />
        <FAQItem q={lang==="TH"?"ใช้สุ่มจับฉลากหรือแจกของรางวัลได้ไหม?":"Can I use this for giveaways?"} a={lang==="TH"?"ได้ครับ เหมาะสำหรับการจับฉลาก สุ่มลำดับ สุ่มห้อง สุ่มเลือกผู้โชคดี แต่สำหรับการจับรางวัลที่มีมูลค่าสูงหรือมีข้อกำหนดทางกฎหมาย ควรใช้ระบบสุ่มที่ได้รับการรับรอง (Certified RNG) | อ้างอิง: สำนักงานคณะกรรมการคุ้มครองผู้บริโภค (สคบ.) — กฎหมายการจัดกิจกรรมชิงรางวัล.":"Yes — suitable for lotteries, room assignments, and giveaways. For high-value prizes with legal requirements, use a certified RNG. | Source: Thai Consumer Protection Board — Lottery Activity Laws."} />
      </SEOFAQ>
    </div>
  );
}

// 2. Word Counter
export function WordCounter({ lang }: { lang: Lang }) {
  const [text, setText] = useLocalState("word_txt", "");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const noSpaceChars = text.replace(/\s/g, '').length;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600 dark:text-purple-400">{lang === "TH" ? "นับจำนวนคำ/ตัวอักษร" : "Word/Char Counter"}</h2>
      <div className="space-y-4 mt-6">
        <textarea rows={8} value={text} onChange={e=>setText(e.target.value)} className={`${inputClass} focus:ring-purple-500 resize-none`} placeholder={lang==="TH"?"พิมพ์หรือวางข้อความที่นี่...":"Type or paste text here..."} />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 text-center">
        <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
          <p className="text-xs text-gray-500 dark:text-gray-400">{lang==="TH"?"คำ (Words)":"Words"}</p>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{words}</div>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
          <p className="text-xs text-gray-500 dark:text-gray-400">{lang==="TH"?"ตัวอักษร":"Characters"}</p>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{chars}</div>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
          <p className="text-xs text-gray-500 dark:text-gray-400">{lang==="TH"?"ไม่รวมช่องว่าง":"No Spaces"}</p>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{noSpaceChars}</div>
        </div>
      </div>
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang==="TH"?"FAQ — นับจำนวนคำ/ตัวอักษร":"Word Counter FAQ"}>
        <FAQItem q={lang==="TH"?"นับคำภาษาไทยได้แม่นยำไหม?":"How accurate is Thai word counting?"} a={lang==="TH"?"เครื่องมือนี้ใช้การแยกคำโดยช่องว่าง (Whitespace Tokenization) ซึ่งแม่นยำสำหรับภาษาอังกฤษ แต่ภาษาไทยไม่ใช้ช่องว่างเป็นตัวแบ่งคำ จำนวนคำภาษาไทยจึงอาจไม่ตรง 100% สำหรับการตัดคำไทยที่แม่นยำ ควรใช้ไลบรารี เช่น PyThaiNLP หรือ deepcut | อ้างอิง: Haruechaiyasak C. et al. (2008). LexTo: Thai Lexeme Tokenizer. NECTEC.":"This tool uses whitespace tokenization — accurate for English but Thai doesn't use spaces between words. For precise Thai tokenization, use libraries like PyThaiNLP or deepcut. | Source: Haruechaiyasak et al. (2008) NECTEC."} />
        <FAQItem q={lang==="TH"?"ใช้ตรวจจำนวนคำสำหรับงานเขียนได้ไหม?":"Can I use this for writing assignments?"} a={lang==="TH"?"ได้ครับ เหมาะสำหรับตรวจสอบจำนวนคำในบทความ รายงาน เรียงความ หรือ Social Media Caption ที่มีข้อจำกัดจำนวนคำ เช่น Twitter/X (280 ตัวอักษร), Instagram Bio (150 ตัวอักษร), Meta Description (155-160 ตัวอักษร) | อ้างอิง: Google Search Central — Meta Description Best Practices (2024).":"Yes — great for checking articles, reports, essays, or social media limits like Twitter/X (280 chars), Instagram Bio (150 chars), Meta Description (155-160 chars). | Source: Google Search Central (2024)."} />
        <FAQItem q={lang==="TH"?"บทความ SEO ควรมีกี่คำ?":"How many words should an SEO article have?"} a={lang==="TH"?"จากการวิเคราะห์ของ Backlinko (2024) บทความที่ติดหน้าแรก Google มีค่าเฉลี่ย 1,447 คำ อย่างไรก็ตาม คุณภาพเนื้อหาสำคัญกว่าจำนวนคำ Google เน้น E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) มากกว่าความยาว | อ้างอิง: Backlinko (2024). Content Study; Google Search Quality Evaluator Guidelines.":"Backlinko (2024) analysis shows top Google results average 1,447 words. However, content quality matters more than length — Google prioritizes E-E-A-T. | Source: Backlinko (2024); Google Quality Evaluator Guidelines."} />
      </SEOFAQ>
    </div>
  );
}

// 3. Age Calculator
export function AgeCalculator({ lang }: { lang: Lang }) {
  const [dob, setDob] = useLocalState("age_dob", "");
  const [res, setRes] = useState<{y:number, m:number, d:number, totalDays:number} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (dob) {
      const birth = new Date(dob);
      const now = new Date();
      
      let y = now.getFullYear() - birth.getFullYear();
      let m = now.getMonth() - birth.getMonth();
      let d = now.getDate() - birth.getDate();

      if (d < 0) {
        m--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        d += lastMonth.getDate();
      }
      if (m < 0) {
        y--;
        m += 12;
      }

      const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
      setRes({ y, m, d, totalDays });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600 dark:text-purple-400">{lang === "TH" ? "คำนวณอายุแบบละเอียด" : "Age Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "วันเกิดของคุณ" : "Date of Birth"}</label>
          <input type="date" value={dob} onChange={e=>setDob(e.target.value)} required className={`${inputClass} focus:ring-purple-500`} />
        </div>
        <button type="submit" className="w-full py-4 bg-purple-500 font-bold text-white rounded hover:bg-purple-600 shadow-md">{lang === "TH" ? "คำนวณอายุ" : "Calculate Age"}</button>
      </form>
      {res && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 space-y-4">
          <div className="p-6 bg-purple-50 dark:bg-purple-900/30 rounded-xl text-center border border-purple-200 dark:border-purple-500/30">
            <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "อายุของคุณคือ" : "Your exact age is"}</p>
            <div className="text-3xl font-black text-purple-600 dark:text-purple-400">
              {res.y} {lang==="TH"?"ปี":"Years"} {res.m} {lang==="TH"?"เดือน":"Months"} {res.d} {lang==="TH"?"วัน":"Days"}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-xl text-center">
              <p className="text-sm text-gray-500">{lang==="TH"?"ใช้ชีวิตมาแล้วทั้งหมด":"Total Days Lived"}</p>
              <div className="text-xl font-bold text-gray-800 dark:text-white">{res.totalDays.toLocaleString()} {lang==="TH"?"วัน":"days"}</div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-xl text-center">
              <p className="text-sm text-gray-500">{lang==="TH"?"หรือประมาณ":"Or approx"}</p>
              <div className="text-xl font-bold text-gray-800 dark:text-white">{(res.totalDays * 24).toLocaleString()} {lang==="TH"?"ชั่วโมง":"hours"}</div>
            </div>
          </div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang==="TH"?"FAQ — คำนวณอายุ":"Age Calculator FAQ"}>
        <FAQItem q={lang==="TH"?"การคำนวณอายุแบบนี้ใช้กฎหมายอะไรอ้างอิง?":"What legal basis does age calculation use?"} a={lang==="TH"?"ตามประมวลกฎหมายแพ่งและพาณิชย์ไทย มาตรา 16 การนับอายุให้เริ่มนับวันเกิดเป็นวันแรก เช่น เกิดวันที่ 1 ม.ค. 2000 จะครบ 20 ปีบริบูรณ์ในวันที่ 1 ม.ค. 2020 เครื่องมือนี้ใช้การคำนวณแบบปฏิทิน (Calendar Calculation) ตามมาตรฐานสากล | อ้างอิง: ประมวลกฎหมายแพ่งและพาณิชย์ มาตรา 16; ISO 8601 Date and Time Standard.":"Under Thai Civil and Commercial Code Section 16, age counts from date of birth. This tool uses calendar-based calculation per ISO 8601. | Source: Thai Civil Code §16; ISO 8601."} />
        <FAQItem q={lang==="TH"?"ทำไมบางครั้งนับอายุได้ต่างจากที่คิด?":"Why might calculated age differ from expected?"} a={lang==="TH"?"เพราะคนมักนับปีเกิดเป็น 1 ขวบ (แบบเกาหลี/จีนดั้งเดิม) แต่สากลนับเป็น 0 ขวบ นอกจากนี้ปีอธิกสุรทิน (29 ก.พ.) ทำให้เดือนกุมภาพันธ์มี 28-29 วันไม่เท่ากัน อาจทำให้จำนวนวันต่างไปเล็กน้อย | อ้างอิง: Korean Age System — National Institute of Korean Language; Gregorian Calendar — Royal Observatory Greenwich.":"Common confusion: Korean/Chinese systems count from 1, while international standard counts from 0. Leap years (Feb 29) also affect day counts slightly. | Source: Korean Age System — National Institute of Korean Language; Gregorian Calendar — Royal Observatory Greenwich."} />
        <FAQItem q={lang==="TH"?"อายุเท่าไรถึงทำอะไรได้ตามกฎหมายไทย?":"At what age can you do things legally in Thailand?"} a={lang==="TH"?"ตามกฎหมายไทย: 15 ปี — สมัครบัตรประชาชน | 17 ปี — ขับรถจักรยานยนต์ | 18 ปี — ขับรถยนต์, ลงคะแนนเสียงเลือกตั้ง | 20 ปี — บรรลุนิติภาวะ สามารถทำนิติกรรมได้เต็มที่ ดื่มเครื่องดื่มแอลกอฮอล์ | 25 ปี — สมัครส.ส. | อ้างอิง: พ.ร.บ. จราจรทางบก; ประมวลกฎหมายแพ่งฯ; รัฐธรรมนูญแห่งราชอาณาจักรไทย.":"Thai legal ages: 15 — National ID | 17 — Motorcycle license | 18 — Car license, voting | 20 — Legal majority, alcohol | 25 — MP candidacy | Source: Thai Traffic Act; Civil Code; Thai Constitution."} />
      </SEOFAQ>
    </div>
  );
}

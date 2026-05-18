"use client";

import React, { useState, useEffect } from "react";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, NumericInput, SEOFAQ, FAQItem, CalculationSteps, ExportResult, RelatedCalcs } from "./shared";
import { Star, Sparkles, Moon, Sun } from "lucide-react";

// =========================================================================
// Horoscope Calculator (คำนวณดูดวงพื้นฐาน)
// =========================================================================
export function HoroscopeCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [birthDate, setBirthDate] = useLocalState("calc_horo_date", "");
  const [birthTime, setBirthTime] = useLocalState("calc_horo_time", "");
  const [gender, setGender] = useLocalState("calc_horo_gender", "male");

  let zodiacThai = "";
  let zodiacWestern = "";
  let chineseYear = "";
  let element = "";
  let luckyColors = "";
  let unluckyColors = "";
  let luckyNumbers = "";
  let fortune = "";

  if (birthDate) {
    const d = new Date(birthDate);
    const day = d.getDate();
    const month = d.getMonth() + 1; // 1-12
    const year = d.getFullYear(); // AD

    // 1. Thai Zodiac (ราศีแบบไทย - อิงวันที่ 13/14-13/14 ของเดือนถัดไป)
    if ((month === 4 && day >= 13) || (month === 5 && day <= 13)) zodiacThai = "ราศีเมษ (Aries)";
    else if ((month === 5 && day >= 14) || (month === 6 && day <= 13)) zodiacThai = "ราศีพฤษภ (Taurus)";
    else if ((month === 6 && day >= 14) || (month === 7 && day <= 14)) zodiacThai = "ราศีเมถุน (Gemini)";
    else if ((month === 7 && day >= 15) || (month === 8 && day <= 16)) zodiacThai = "ราศีกรกฎ (Cancer)";
    else if ((month === 8 && day >= 17) || (month === 9 && day <= 16)) zodiacThai = "ราศีสิงห์ (Leo)";
    else if ((month === 9 && day >= 17) || (month === 10 && day <= 16)) zodiacThai = "ราศีกันย์ (Virgo)";
    else if ((month === 10 && day >= 17) || (month === 11 && day <= 15)) zodiacThai = "ราศีตุลย์ (Libra)";
    else if ((month === 11 && day >= 16) || (month === 12 && day <= 15)) zodiacThai = "ราศีพิจิก (Scorpio)";
    else if ((month === 12 && day >= 16) || (month === 1 && day <= 13)) zodiacThai = "ราศีธนู (Sagittarius)";
    else if ((month === 1 && day >= 14) || (month === 2 && day <= 12)) zodiacThai = "ราศีมังกร (Capricorn)";
    else if ((month === 2 && day >= 13) || (month === 3 && day <= 13)) zodiacThai = "ราศีกุมภ์ (Aquarius)";
    else zodiacThai = "ราศีมีน (Pisces)";

    // 2. Western Zodiac
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiacWestern = "Aries";
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiacWestern = "Taurus";
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiacWestern = "Gemini";
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiacWestern = "Cancer";
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiacWestern = "Leo";
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiacWestern = "Virgo";
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiacWestern = "Libra";
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiacWestern = "Scorpio";
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiacWestern = "Sagittarius";
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zodiacWestern = "Capricorn";
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiacWestern = "Aquarius";
    else zodiacWestern = "Pisces";

    // 3. Chinese Zodiac (simplified AD year based)
    const chineseZodiacs = ["ชวด (Rat)", "ฉลู (Ox)", "ขาล (Tiger)", "เถาะ (Rabbit)", "มะโรง (Dragon)", "มะเส็ง (Snake)", "มะเมีย (Horse)", "มะแม (Goat)", "วอก (Monkey)", "ระกา (Rooster)", "จอ (Dog)", "กุน (Pig)"];
    chineseYear = chineseZodiacs[(year - 4) % 12];

    // 4. Element (based on last digit of Chinese calendar year, simplified to AD year)
    const lastDigit = year % 10;
    if (lastDigit === 0 || lastDigit === 1) element = "ทอง (Metal)";
    else if (lastDigit === 2 || lastDigit === 3) element = "น้ำ (Water)";
    else if (lastDigit === 4 || lastDigit === 5) element = "ไม้ (Wood)";
    else if (lastDigit === 6 || lastDigit === 7) element = "ไฟ (Fire)";
    else element = "ดิน (Earth)";

    // 5. Basic day-of-week logic for colors (using JS getDay)
    const dayOfWeek = d.getDay(); // 0=Sun, 1=Mon...
    const colorsObj = [
      { lucky: "แดง, เขียว", unlucky: "ฟ้า, น้ำเงิน" }, // Sun
      { lucky: "เหลือง, ดำ", unlucky: "แดง" }, // Mon
      { lucky: "ชมพู, เหลือง", unlucky: "ขาว, ครีม" }, // Tue
      { lucky: "เขียว, ส้ม", unlucky: "ชมพู" }, // Wed
      { lucky: "ส้ม, น้ำเงิน", unlucky: "ดำ, ม่วง" }, // Thu
      { lucky: "ฟ้า, ขาว", unlucky: "เทา, บรอนซ์" }, // Fri
      { lucky: "ม่วง, ดำ", unlucky: "เขียว" } // Sat
    ];
    luckyColors = colorsObj[dayOfWeek].lucky;
    unluckyColors = colorsObj[dayOfWeek].unlucky;

    // 6. Simple Lucky numbers based on day & month
    luckyNumbers = `${day % 9 === 0 ? 9 : day % 9}, ${month}, ${Math.floor(year % 100 / 10) + (year % 10)}`;

    // 7. General Fortune Generator based on Zodiac & Gender
    const fortunes = [
      "ดวงชะตามีเกณฑ์ได้เริ่มต้นสิ่งใหม่ๆ ความขยันจะนำพาโชคลาภมาให้ ระวังเรื่องอารมณ์ร้อน",
      "มีเสน่ห์ดึงดูดผู้คน การเงินมั่นคงดีแต่ระวังรายจ่ายจุกจิก สุขภาพแข็งแรง",
      "การสื่อสารโดดเด่น เจรจาค้าขายจะได้ผลดีมาก ช่วงนี้ชีพจรลงเท้ามีการเดินทางบ่อย",
      "ครอบครัวเป็นที่พึ่งหลัก มีโชคจากคนใกล้ชิด ช่วงนี้เซนส์แรงลางสังหรณ์มักแม่นยำ",
      "มีความเป็นผู้นำสูง การงานก้าวหน้า ได้รับการยอมรับจากผู้ใหญ่ แต่ระวังความทะนงตัว",
      "ละเอียดรอบคอบเป็นที่หนึ่ง การเงินค่อยๆ เติบโตอย่างมั่นคง ระวังความเครียดสะสม",
      "มีมนุษยสัมพันธ์ดีเยี่ยม เหมาะกับงานบริการหรือศิลปะ ความรักมีความสุขดี",
      "มีอำนาจลึกลับในตัว ตัดสินใจเด็ดขาด มีโชคจากการลงทุนหรือของเก่าเก็บ",
      "มองโลกในแง่ดี ชอบอิสระ การเดินทางจะนำพาโชคลาภและโอกาสทางธุรกิจมาให้",
      "มีความรับผิดชอบสูง มุ่งมั่นตั้งใจทำสิ่งใดมักสำเร็จ แต่ต้องเหนื่อยด้วยตัวเองก่อนเสมอ",
      "เพื่อนฝูงรักใคร่ มีไอเดียแปลกใหม่ในการทำงาน การเงินหมุนเวียนคล่องตัว",
      "ใจบุญสุนทาน มีโชคลาภแบบฟลุคๆ บ่อยครั้ง เป็นที่รักของผู้ใหญ่และเพื่อนร่วมงาน"
    ];
    fortune = fortunes[month - 1]; // very basic mock fortune based on month
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div id="horo-result">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "วัน/เดือน/ปีเกิด" : "Date of Birth"}</label>
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "เวลาเกิด (ไม่บังคับ)" : "Time of Birth (Optional)"}</label>
              <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "เพศ" : "Gender"}</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputClass}>
                <option value="male">{lang === "TH" ? "ชาย" : "Male"}</option>
                <option value="female">{lang === "TH" ? "หญิง" : "Female"}</option>
                <option value="other">{lang === "TH" ? "อื่นๆ" : "Other"}</option>
              </select>
            </div>
          </div>

          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <Star className="w-48 h-48 text-purple-500" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-center">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-purple-500" />
                <h3 className="text-xl font-bold">{lang === "TH" ? "ผลการทำนายพื้นดวง" : "Your Astrological Profile"}</h3>
              </div>

              {birthDate ? (
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-100 dark:border-white/10 pb-2">
                    <span className="text-gray-500">{lang === "TH" ? "ราศี (ไทย)" : "Thai Zodiac"}</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{zodiacThai}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 dark:border-white/10 pb-2">
                    <span className="text-gray-500">{lang === "TH" ? "ปีนักษัตร" : "Chinese Zodiac"}</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{chineseYear}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 dark:border-white/10 pb-2">
                    <span className="text-gray-500">{lang === "TH" ? "ธาตุประจำตัว" : "Element"}</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{element}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 dark:border-white/10 pb-2">
                    <span className="text-gray-500">{lang === "TH" ? "สีมงคล" : "Lucky Colors"}</span>
                    <span className="font-bold text-green-600">{luckyColors}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 dark:border-white/10 pb-2">
                    <span className="text-gray-500">{lang === "TH" ? "สีกาลกิณี" : "Unlucky Colors"}</span>
                    <span className="font-bold text-red-500">{unluckyColors}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 dark:border-white/10 pb-2">
                    <span className="text-gray-500">{lang === "TH" ? "เลขมงคล" : "Lucky Numbers"}</span>
                    <span className="font-bold text-yellow-600 dark:text-yellow-400">{luckyNumbers}</span>
                  </div>
                  
                  <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-sm leading-relaxed text-purple-800 dark:text-purple-200">
                    <strong>{lang === "TH" ? "คำทำนายพื้นดวง: " : "Basic Fortune: "}</strong>
                    {fortune}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">{lang === "TH" ? "กรุณาเลือกวันเกิดเพื่อดูผลทำนาย" : "Please select your birth date."}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ExportResult elementId="horo-result" fileName="horoscope-profile" lang={lang} />

      <CalculationSteps
        title={lang === "TH" ? "หลักการคำนวณ" : "Calculation Methods"}
        steps={lang === "TH" ? [
          "ราศีแบบไทย: อ้างอิงตามการโคจรของดวงอาทิตย์ย้ายราศีในวันที่ 13 หรือ 14 ของทุกเดือน (อิงดาราศาสตร์สายนะ)",
          "ปีนักษัตร: อ้างอิงตามปฏิทินจันทรคติจีน (ประยุกต์ใช้วิธีทางคณิตศาสตร์จากปี ค.ศ.)",
          "ธาตุประจำตัว: คำนวณจากเลขท้ายของปีเกิดตามหลักโหราศาสตร์จีน (ธาตุทั้ง 5)",
          "สีมงคล: อ้างอิงตามหลักทักษาปกรณ์ประจำวันเกิดในสัปดาห์"
        ] : [
          "Thai Zodiac: Based on the sun's actual transition mid-month (13th or 14th).",
          "Chinese Zodiac & Element: Calculated using modulo arithmetic based on your birth year.",
          "Lucky Colors: Derived from traditional Thai astrology principles based on the day of the week you were born."
        ]}
      />

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ดูดวงและโหราศาสตร์)" : "Horoscope FAQs"}>
        <FAQItem
          q={lang === "TH" ? "ราศีแบบไทยกับราศีแบบตะวันตกต่างกันอย่างไร ทำไมบางครั้งราศีไม่ตรงกัน?" : "What is the difference between Thai and Western Zodiac?"}
          a={lang === "TH"
            ? "การนับราศีของไทย (สายนะ) และตะวันตก (นิรายนะ) มีจุดเริ่มต้นที่แตกต่างกัน โหราศาสตร์ตะวันตกจะอ้างอิงจากฤดูกาล โดยให้จุดเริ่มต้นราศีเมษอยู่ที่วันที่กลางวันเท่ากับกลางคืนในฤดูใบไม้ผลิ (Vernal Equinox) ซึ่งตรงกับวันที่ 21 มีนาคม ในขณะที่โหราศาสตร์ไทยหรือโหราศาสตร์ภารตะ (อินเดีย) จะอ้างอิงจากกลุ่มดาวบนท้องฟ้าจริง ซึ่งแกนโลกมีการส่ายตัวเปลี่ยนไปตามกาลเวลา (Precession of the Equinoxes) ทำให้จุดเริ่มต้นราศีเมษเลื่อนไปอยู่ที่กลางเดือนเมษายน (ประมาณวันที่ 13-14) ด้วยเหตุนี้ คนที่เกิดต้นเดือนจึงมักจะมีราศีในแบบไทยช้ากว่าแบบตะวันตก 1 ราศีเสมอ การดูดวงจึงควรเลือกอ้างอิงตามศาสตร์ที่หมอดูท่านนั้นๆ ใช้เป็นหลัก"
            : "Thai (Vedic) and Western astrology use different zodiac systems. Western astrology uses the Tropical zodiac, tied to the seasons (Aries starts on the Vernal Equinox, ~March 21). Thai astrology uses the Sidereal zodiac, which accounts for the Earth's axial precession and aligns with the actual constellations in the sky (Aries starts mid-April). Therefore, your zodiac sign might differ depending on the system used."}
        />
        <FAQItem
          q={lang === "TH" ? "สีมงคลและสีกาลกิณี ส่งผลต่อชีวิตจริงหรือไม่?" : "Do lucky and unlucky colors really affect my life?"}
          a={lang === "TH"
            ? "ในทางโหราศาสตร์ไทยและหลักทักษาปกรณ์ 'สี' ถือเป็นพลังงานคลื่นแสงที่ส่งผลต่ออารมณ์และจิตวิทยาของผู้สวมใส่และผู้พบเห็น การสวมเสื้อผ้าสีมงคลตามวันเกิดหรือสีที่เสริมดวงในวันนั้นๆ (เช่น สีเสริมการเงิน หรือสีเสริมเสน่ห์) จะช่วยเพิ่มความมั่นใจ สร้างพลังบวก และทำให้ผู้พบเห็นรู้สึกเอ็นดูหรือน่าเชื่อถือ ในขณะที่สีกาลกิณีอาจเป็นสีที่ขัดแย้งกับพลังงานธาตุของวันนั้น ทำให้รู้สึกหม่นหมองหรือไม่ราบรื่น อย่างไรก็ตาม สีเป็นเพียงส่วนเสริม (Psychological Support) สิ่งที่สำคัญที่สุดคือความสามารถและความพยายามในการลงมือทำของตัวเราเอง"
            : "In Thai astrology, colors are believed to emit specific energetic frequencies that affect human psychology. Wearing a 'lucky' color can boost confidence, attract positive energy, and influence how others perceive you. While an 'unlucky' color might clash with the day's elemental energy. However, it is largely considered psychological support; your actions and efforts are still the primary drivers of success."}
        />
        <FAQItem
          q={lang === "TH" ? "ธาตุประจำตัวในดวงจีน (ดิน น้ำ ไม้ ไฟ ทอง) บอกอะไรเกี่ยวกับตัวเราได้บ้าง?" : "What do the 5 Chinese Elements (Earth, Water, Wood, Fire, Metal) tell about us?"}
          a={lang === "TH"
            ? "ธาตุประจำตัวตามหลักโหราศาสตร์จีน (Bazi / Four Pillars of Destiny) สามารถบอกบุคลิกภาพลึกๆ และจุดแข็งจุดอ่อนของเราได้ เช่น: คน 'ธาตุไฟ' มักจะกระตือรือร้น ร้อนแรง ชอบเป็นผู้นำ; คน 'ธาตุน้ำ' ปรับตัวเก่ง มีไหวพริบ มีศิลปะ; คน 'ธาตุไม้' ใจดี มีเมตตา ชอบช่วยเหลือ; คน 'ธาตุทอง (โลหะ)' เด็ดขาด มีระเบียบวินัย ยึดมั่นในหลักการ; และคน 'ธาตุดิน' มั่นคง หนักแน่น เป็นที่พึ่งพาได้ การรู้ธาตุของตนเองช่วยให้เราเลือกอาชีพที่เหมาะสม หรือเข้าใจวิธีปรับตัวเข้ากับคนที่มีธาตุส่งเสริมหรือข่มกันในที่ทำงานและครอบครัวได้ดีขึ้น"
            : "The 5 Elements reveal underlying personality traits: 'Fire' people are passionate and natural leaders. 'Water' people are adaptable, intelligent, and artistic. 'Wood' individuals are compassionate and growth-oriented. 'Metal' (Gold) people are decisive, organized, and principled. 'Earth' people are stable, reliable, and grounded. Knowing your element helps in understanding personal strengths and relationship dynamics."}
        />
      </SEOFAQ>
      
      <RelatedCalcs links={[{id: "age", name: "Age Calculator"}, {id: "love", name: "Love Calculator"}]} lang={lang} setCalc={setCalc} />
    </div>
  );
}

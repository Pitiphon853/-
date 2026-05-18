"use client";

import React, { useState, useEffect } from "react";
import { Lang } from "../dictionary";
import { inputClass, labelClass, SEOFAQ, FAQItem, CalculationSteps, ExportResult, RelatedCalcs } from "./shared";
import { Ticket, Search, AlertCircle, RefreshCw, Trophy } from "lucide-react";

// =========================================================================
// Lottery Checker (ตรวจผลสลากกินแบ่งรัฐบาล)
// =========================================================================
export function LotteryChecker({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [lottoNumber, setLottoNumber] = useState("");
  const [lottoData, setLottoData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resultMsg, setResultMsg] = useState("");
  const [resultColor, setResultColor] = useState("");

  const fetchLottery = async () => {
    setLoading(true);
    setError("");
    try {
      // Using our internal proxy to fetch from GLO official site
      const res = await fetch("/api/lottery");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      
      if (!data.success) throw new Error(data.error || "API Error");
      
      setLottoData(data.response);
    } catch (err) {
      setError(lang === "TH" 
        ? "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์สลากกินแบ่งรัฐบาลได้ในขณะนี้ กรุณาลองใหม่ภายหลัง" 
        : "Cannot connect to the Government Lottery server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLottery();
  }, []);

  const checkLotto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lottoData) return;
    if (lottoNumber.length !== 6) {
      setResultMsg(lang === "TH" ? "กรุณากรอกตัวเลข 6 หลักให้ครบถ้วน" : "Please enter exactly 6 digits.");
      setResultColor("text-red-500");
      return;
    }

    const { prizes, runningNumbers } = lottoData;
    let won = false;
    let messages: string[] = [];

    // Check Prize 1
    if (prizes[0].number.includes(lottoNumber)) {
      messages.push(lang === "TH" ? "รางวัลที่ 1" : "1st Prize");
      won = true;
    }
    // Check Prize 2
    if (prizes[1].number.includes(lottoNumber)) {
      messages.push(lang === "TH" ? "รางวัลที่ 2" : "2nd Prize");
      won = true;
    }
    // Check Prize 3
    if (prizes[2].number.includes(lottoNumber)) {
      messages.push(lang === "TH" ? "รางวัลที่ 3" : "3rd Prize");
      won = true;
    }
    // Check Prize 4
    if (prizes[3].number.includes(lottoNumber)) {
      messages.push(lang === "TH" ? "รางวัลที่ 4" : "4th Prize");
      won = true;
    }
    // Check Prize 5
    if (prizes[4].number.includes(lottoNumber)) {
      messages.push(lang === "TH" ? "รางวัลที่ 5" : "5th Prize");
      won = true;
    }

    // Check 3 digits front
    const first3 = lottoNumber.substring(0, 3);
    if (runningNumbers[0].number.includes(first3)) {
      messages.push(lang === "TH" ? "เลขหน้า 3 ตัว" : "First 3 Digits");
      won = true;
    }
    
    // Check 3 digits back
    const last3 = lottoNumber.substring(3, 6);
    if (runningNumbers[1].number.includes(last3)) {
      messages.push(lang === "TH" ? "เลขท้าย 3 ตัว" : "Last 3 Digits");
      won = true;
    }

    // Check 2 digits back
    const last2 = lottoNumber.substring(4, 6);
    if (runningNumbers[2].number.includes(last2)) {
      messages.push(lang === "TH" ? "เลขท้าย 2 ตัว" : "Last 2 Digits");
      won = true;
    }

    if (won) {
      setResultMsg((lang === "TH" ? "ยินดีด้วย! คุณถูก " : "Congratulations! You won ") + messages.join(", "));
      setResultColor("text-green-600");
    } else {
      setResultMsg(lang === "TH" ? "เสียใจด้วย คุณไม่ถูกรางวัลในงวดนี้" : "Sorry, no prize matched.");
      setResultColor("text-gray-500");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div id="lottery-result">
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <h3 className="font-bold text-lg">{lang === "TH" ? "งวดวันที่" : "Draw Date"}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {loading ? (lang === "TH" ? "กำลังโหลด..." : "Loading...") : (lottoData ? lottoData.date : "-")}
                </p>
              </div>
            </div>
            <button onClick={fetchLottery} disabled={loading} className="p-2 text-teal-600 bg-teal-50 dark:bg-teal-900/30 rounded-full hover:bg-teal-100 transition-colors">
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>

          {error && (
            <div className="p-3 mb-6 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          <form onSubmit={checkLotto} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className={labelClass}>{lang === "TH" ? "กรอกเลขสลาก 6 หลัก" : "Enter 6-digit Lottery Number"}</label>
              <input 
                type="text" 
                maxLength={6} 
                value={lottoNumber} 
                onChange={(e) => setLottoNumber(e.target.value.replace(/\D/g, ''))} 
                placeholder="000000" 
                className={`${inputClass} text-2xl tracking-widest text-center`} 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading || lottoNumber.length !== 6 || !lottoData}
              className="w-full md:w-auto px-8 py-4 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              {lang === "TH" ? "ตรวจผล" : "Check Result"}
            </button>
          </form>

          {resultMsg && (
            <div className={`mt-6 text-center p-6 rounded-xl font-bold text-xl ${resultColor === 'text-green-600' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-white/5'} ${resultColor}`}>
              {resultMsg}
            </div>
          )}
        </div>
      </div>

      <ExportResult elementId="lottery-result" fileName="lottery-check" lang={lang} />

      <CalculationSteps
        title={lang === "TH" ? "ข้อมูลการออกรางวัล" : "Draw Information"}
        steps={lang === "TH" ? [
          "ระบบอัปเดตข้อมูลอัตโนมัติจาก API สลากกินแบ่งรัฐบาล",
          "รองรับการตรวจรางวัลที่ 1 ถึง 5 รวมถึงเลขหน้า 3 ตัว, เลขท้าย 3 ตัว และเลขท้าย 2 ตัว",
          "ผลลัพธ์ใช้สำหรับตรวจสอบเบื้องต้น โปรดตรวจสอบกับสำนักงานสลากกินแบ่งรัฐบาลอีกครั้งเพื่อความถูกต้อง"
        ] : [
          "Automatically fetches the latest draw results from a public API.",
          "Checks 1st to 5th prizes, plus first 3 digits, last 3 digits, and last 2 digits.",
          "Results are for preliminary checking. Please verify with the official Government Lottery Office."
        ]}
      />

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ตรวจสลากกินแบ่งรัฐบาล)" : "Lottery FAQs"}>
        <FAQItem
          q={lang === "TH" ? "ระบบตรวจหวยนี้อัปเดตผลแบบ Realtime หรือไม่?" : "Is this lottery checker updated in real-time?"}
          a={lang === "TH"
            ? "ใช่ครับ ระบบของเราเชื่อมต่อกับ API ตรวจผลสลากกินแบ่งรัฐบาลโดยตรง ซึ่งจะดึงข้อมูลการออกรางวัลงวดล่าสุดมาแสดงผลแบบอัตโนมัติ (Realtime) ทันทีที่มีการประกาศผลอย่างเป็นทางการ อย่างไรก็ตาม ในวันออกรางวัล (วันที่ 1 และ 16 ของเดือน) เวลาประมาณ 14.30 - 16.00 น. ซึ่งเป็นช่วงที่มีผู้ใช้งานจำนวนมาก ข้อมูลอาจมีการอัปเดตล่าช้าเล็กน้อยจากต้นทาง หรืออาจเกิดอาการ API โหลดช้า แนะนำให้กดปุ่ม Refresh เพื่อดึงข้อมูลล่าสุดอีกครั้งหลังเวลา 16.00 น. เป็นต้นไป"
            : "Yes, our system connects directly to a public lottery API, which fetches the latest draw results automatically. However, during the live draw (on the 1st and 16th of each month between 2:30 PM - 4:00 PM), there might be a slight delay due to high traffic at the data source. We recommend checking again after 4:00 PM for the finalized results."}
        />
        <FAQItem
          q={lang === "TH" ? "หากถูกรางวัลหลายประเภทในสลากใบเดียว จะได้รับเงินรางวัลทั้งหมดหรือไม่?" : "If I win multiple prizes on one ticket, do I get all the prize money?"}
          a={lang === "TH"
            ? "ตามข้อบังคับของสำนักงานสลากกินแบ่งรัฐบาล หากสลาก 1 ใบของคุณถูกรางวัลมากกว่า 1 ประเภท คุณมีสิทธิ์รับเงินรางวัลครบทุกประเภทครับ (เช่น ถูกทั้งรางวัลที่ 2 และรางวัลเลขท้าย 2 ตัว) ยกเว้น 'รางวัลข้างเคียงรางวัลที่ 1' หากคุณถูกรางวัลที่ 1 ไปแล้ว จะไม่ได้รับรางวัลข้างเคียงซ้ำซ้อนในใบเดียวกัน การตรวจด้วยระบบของเราจะแสดงผลรางวัลทั้งหมดที่คุณถูกในสลากใบนั้นให้ทราบทันที"
            : "According to the Government Lottery Office rules, if a single ticket wins multiple prize categories (e.g., 2nd prize and a 2-digit suffix), you are entitled to claim the prize money for all winning categories combined. The only exception is the 'Prize adjacent to the 1st prize'; if you win the 1st prize, you cannot claim the adjacent prize on that same ticket. Our system checks and displays all matched prizes for your number."}
        />
        <FAQItem
          q={lang === "TH" ? "ถูกสลากกินแบ่งรัฐบาล ต้องเสียภาษีเท่าไหร่ และขึ้นเงินได้ที่ไหน?" : "How much is the tax on lottery winnings and where to claim?"}
          a={lang === "TH"
            ? "ผู้ที่ถูกรางวัลสลากกินแบ่งรัฐบาล (ลอตเตอรี่) จะต้องเสียภาษีในรูปแบบของ 'อากรแสตมป์' ในอัตรา 0.5% ของยอดเงินรางวัล (เช่น ถูกรางวัล 10,000 บาท เสียอากร 50 บาท) แต่หากเป็น 'สลากการกุศล' จะต้องหักภาษี ณ ที่จ่าย 1% สำหรับสถานที่ขึ้นเงิน: หากเงินรางวัลไม่เกิน 20,000 บาท สามารถขึ้นเงินได้ที่ร้านรับซื้อรางวัลทั่วไป (อาจโดนหักเปอร์เซ็นต์เพิ่ม 1-2%) หากเกิน 20,000 บาท หรือเป็นรางวัลใหญ่ แนะนำให้ขึ้นเงินที่ธนาคารกรุงไทย ธนาคารออมสิน หรือ ธ.ก.ส. ทุกสาขา (หักค่าธรรมเนียม 1%) หรือเดินทางไปรับเช็คโดยตรงที่สำนักงานสลากกินแบ่งรัฐบาล จ.นนทบุรี"
            : "Winning tickets are subject to a stamp duty of 0.5% for regular government lottery tickets, and a 1% withholding tax for charity lottery tickets. You can claim small prizes (under 20,000 THB) at local lottery dealers (who charge a small 1-2% commission). For larger amounts, it is recommended to claim at Krungthai, GSB, or BAAC banks (1% fee), or directly at the Government Lottery Office in Nonthaburi."}
        />
      </SEOFAQ>
      
      <RelatedCalcs links={[{id: "compound", name: "Compound Interest"}, {id: "horoscope", name: "Horoscope"}]} lang={lang} setCalc={setCalc} />
    </div>
  );
}

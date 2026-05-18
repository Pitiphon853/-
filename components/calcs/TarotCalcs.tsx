"use client";

import React, { useState } from "react";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, CalculationSteps, ExportResult, RelatedCalcs } from "./shared";
import { Sparkles, RefreshCw, Star } from "lucide-react";
import { majorArcana, TarotCard } from "./TarotData";

// Helper to shuffle array
function shuffle(array: any[]) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export function TarotReadingCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);

  const drawCards = () => {
    setIsDrawing(true);
    setFlipped([false, false, false]);
    setDrawnCards([]); // reset

    setTimeout(() => {
      const shuffled = shuffle([...majorArcana]);
      setDrawnCards([shuffled[0], shuffled[1], shuffled[2]]);
      setIsDrawing(false);
      
      // Auto flip cards one by one
      setTimeout(() => setFlipped([true, false, false]), 500);
      setTimeout(() => setFlipped([true, true, false]), 1200);
      setTimeout(() => setFlipped([true, true, true]), 1900);
    }, 800);
  };

  const CardView = ({ card, index, labelTh, labelEn }: { card: TarotCard | undefined, index: number, labelTh: string, labelEn: string }) => {
    const isFlipped = flipped[index];

    return (
      <div className="flex flex-col items-center group">
        <h4 className="text-lg font-bold mb-3 text-purple-700 dark:text-purple-400">{lang === "TH" ? labelTh : labelEn}</h4>
        
        <div className="relative w-48 h-80 rounded-2xl cursor-pointer perspective-1000" style={{ perspective: "1000px" }} onClick={() => {
          if (card && !isFlipped) {
            const newFlipped = [...flipped];
            newFlipped[index] = true;
            setFlipped(newFlipped);
          }
        }}>
          <div 
            className={`w-full h-full relative preserve-3d transition-transform duration-700 ease-in-out ${isFlipped ? 'rotate-y-180' : ''}`}
            style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            {/* Card Back */}
            <div className="absolute w-full h-full backface-hidden rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-900 to-indigo-900 shadow-xl overflow-hidden flex items-center justify-center" style={{ backfaceVisibility: "hidden" }}>
              <div className="absolute inset-2 border border-purple-300/30 rounded-xl"></div>
              <Sparkles className="w-12 h-12 text-purple-300/50" />
            </div>

            {/* Card Front */}
            <div className="absolute w-full h-full backface-hidden rounded-2xl border-2 border-purple-300 bg-white dark:bg-gray-800 shadow-2xl overflow-hidden flex flex-col items-center justify-between p-2" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
              {card ? (
                <>
                  <div className="w-full h-full relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 flex-grow">
                    <img src={card.image} alt={card.nameEn} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="text-center mt-2 w-full">
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{card.number === 0 ? "O" : card.number}</span>
                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight mt-0.5 line-clamp-1">{lang === "TH" ? card.nameTh.split(" ")[0] : card.nameEn}</p>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              )}
            </div>
          </div>
        </div>

        {/* Meaning Text */}
        <div className={`mt-6 p-4 bg-white dark:bg-white/5 border border-purple-100 dark:border-white/10 rounded-xl w-full text-sm leading-relaxed text-gray-700 dark:text-gray-300 shadow-sm transition-all duration-500 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {card && (
            lang === "TH" 
              ? (index === 0 ? card.meaning.past : index === 1 ? card.meaning.present : card.meaning.future)
              : (index === 0 ? card.meaning.past : index === 1 ? card.meaning.present : card.meaning.future) // Can translate later if needed, use TH for now as data
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div id="tarot-result" className="mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{lang === "TH" ? "ดูดวงไพ่ยิปซี (Tarot Card Reading)" : "Tarot Card Reading"}</h2>
          <p className="text-gray-500">{lang === "TH" ? "ตั้งสมาธิ นึกถึงเรื่องที่คุณอยากรู้ แล้วกดปุ่มเพื่อสุ่มไพ่ 3 ใบ" : "Focus on your question and draw 3 cards."}</p>
        </div>

        {drawnCards.length === 0 ? (
          <div className="flex justify-center my-12">
            <button 
              onClick={drawCards}
              disabled={isDrawing}
              className={`flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold text-lg transition-all shadow-[0_8px_30px_rgb(147,51,234,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(147,51,234,0.5)] ${isDrawing ? 'opacity-50 cursor-not-allowed scale-95' : ''}`}
            >
              {isDrawing ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Star className="w-6 h-6" />}
              {lang === "TH" ? (isDrawing ? "กำลังสับไพ่..." : "เริ่มสุ่มไพ่ 3 ใบ") : (isDrawing ? "Shuffling..." : "Draw 3 Cards")}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center mb-4">
              <button 
                onClick={drawCards}
                className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold hover:underline"
              >
                <RefreshCw className="w-4 h-4" /> {lang === "TH" ? "เริ่มใหม่" : "Draw Again"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <CardView card={drawnCards[0]} index={0} labelTh="ใบที่ 1: อดีต" labelEn="Card 1: Past" />
              <CardView card={drawnCards[1]} index={1} labelTh="ใบที่ 2: ปัจจุบัน" labelEn="Card 2: Present" />
              <CardView card={drawnCards[2]} index={2} labelTh="ใบที่ 3: อนาคต" labelEn="Card 3: Future" />
            </div>
          </div>
        )}
      </div>

      {drawnCards.length > 0 && <ExportResult elementId="tarot-result" fileName="tarot-reading" lang={lang} />}

      <CalculationSteps
        title={lang === "TH" ? "รูปแบบการดูดวงไพ่ยิปซี (3-Card Spread)" : "3-Card Spread Method"}
        steps={lang === "TH" ? [
          "ใบที่ 1 (อดีต): บอกเล่าถึงเหตุการณ์หรือพลังงานที่ผ่านมา ซึ่งเป็นรากฐานและส่งผลต่อสถานการณ์ในปัจจุบัน",
          "ใบที่ 2 (ปัจจุบัน): สะท้อนถึงสิ่งที่คุณกำลังเผชิญอยู่ ณ ตอนนี้ ทั้งความรู้สึก ปัญหา หรือจุดเด่นที่คุณมี",
          "ใบที่ 3 (อนาคต): ทำนายแนวโน้มหรือผลลัพธ์ที่จะเกิดขึ้นในอนาคตอันใกล้ หากสถานการณ์ยังคงดำเนินไปในทิศทางนี้",
          "ชุดไพ่ที่ใช้: Major Arcana (ไพ่ชุดใหญ่ 22 ใบ) ซึ่งเป็นไพ่ที่สื่อถึงเหตุการณ์สำคัญหรือจุดเปลี่ยนหลักในชีวิต"
        ] : [
          "Card 1 (Past): Represents past events or energies that have led to your current situation.",
          "Card 2 (Present): Reflects what you are currently facing, your feelings, or hidden influences.",
          "Card 3 (Future): Predicts the likely outcome or future path based on current trajectories.",
          "Deck: We use the 22 Major Arcana cards, which represent major life themes and spiritual lessons."
        ]}
      />

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ไพ่ยิปซี)" : "Tarot Reading FAQs"}>
        <FAQItem
          q={lang === "TH" ? "ไพ่ยิปซี (Tarot) มีความแม่นยำแค่ไหน?" : "How accurate is Tarot reading?"}
          a={lang === "TH"
            ? "ไพ่ยิปซีไม่ใช่เครื่องมือที่สามารถกำหนดอนาคตแบบตายตัวได้ 100% แต่ทำหน้าที่เสมือน 'กระจกสะท้อน' จิตใต้สำนึกและสถานการณ์ปัจจุบันของผู้ดู การตีความไพ่ช่วยให้เราเห็นมุมมองที่อาจถูกมองข้าม และเป็นแนวทางในการตัดสินใจ อนาคตสามารถเปลี่ยนแปลงได้เสมอตามการกระทำของเราในปัจจุบัน ความแม่นยำจึงอยู่ที่การตีความให้สอดคล้องกับบริบทชีวิตของแต่ละคน"
            : "Tarot is not a tool to predict a fixed future with 100% certainty. Instead, it acts as a mirror to your subconscious and current situation. It offers new perspectives and guidance. The future is always shaped by your present actions, so the accuracy depends on how the archetypes resonate with your personal context."}
        />
        <FAQItem
          q={lang === "TH" ? "ควรดูไพ่ยิปซีบ่อยแค่ไหน?" : "How often should I get a Tarot reading?"}
          a={lang === "TH"
            ? "ไม่แนะนำให้ดูดวงเรื่องเดียวกันซ้ำๆ ในระยะเวลาอันสั้น (เช่น ดูทุกวัน) เพราะอาจทำให้เกิดความสับสนและวิตกกังวล ควรดูเมื่อมีการเปลี่ยนแปลงครั้งสำคัญในชีวิต มีคำถามที่ต้องการแนวทางจริงๆ หรือเว้นระยะห่างประมาณ 1-3 เดือนต่อครั้ง เพื่อให้เวลาสถานการณ์ได้ดำเนินไปตามวิถีของมัน"
            : "It is not recommended to ask the same question frequently (e.g., every day) as it can lead to confusion and anxiety. It's best to read when facing a major crossroad, when you genuinely need guidance, or wait 1-3 months between readings to allow situations to unfold naturally."}
        />
        <FAQItem
          q={lang === "TH" ? "ได้ไพ่ที่ไม่ดี (เช่น ไพ่ Death หรือ Tower) หมายความว่าชีวิตจะพังทลายใช่ไหม?" : "Does a 'bad' card like Death or Tower mean doom?"}
          a={lang === "TH"
            ? "ไม่ใช่เสมอไป ในทางไพ่ยิปซี ไพ่ Death (ความตาย) มักหมายถึง 'การสิ้นสุดเพื่อเริ่มต้นใหม่' การเปลี่ยนแปลงครั้งใหญ่ หรือการจบจากสิ่งที่ไม่เวิร์คแล้ว ส่วน The Tower หมายถึงการพังทลายของโครงสร้างความเชื่อเดิมๆ หรือเหตุการณ์ฉับพลัน เพื่อเคลียร์พื้นที่ให้เราสร้างรากฐานชีวิตที่แข็งแรงกว่าเดิม ไพ่เหล่านี้จึงเป็นไพ่ที่ให้บทเรียนที่มีค่า ไม่ใช่คำสาปแช่ง"
            : "Not necessarily. In Tarot, the Death card usually symbolizes 'endings and new beginnings', transformation, or letting go of what no longer serves you. The Tower represents sudden change or the breaking down of false beliefs to build a stronger foundation. These cards offer valuable lessons, not doom."}
        />
      </SEOFAQ>
      
      <RelatedCalcs links={[{id: "horoscope", name: "Horoscope"}, {id: "zodiac", name: "Zodiac"}]} lang={lang} setCalc={setCalc} />
    </div>
  );
}

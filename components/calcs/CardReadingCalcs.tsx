"use client";

import React, { useState } from "react";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, CalculationSteps, ExportResult, RelatedCalcs } from "./shared";
import { Sparkles, RefreshCw, Star, Heart } from "lucide-react";
import { lenormandCards, oracleCards, playingCards, kipperCards, BaseCard, PlayingCard } from "./CardData";

// Helper to shuffle array
function shuffle(array: any[]) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const GenericCardView = ({ 
  card, 
  index, 
  labelTh, 
  labelEn, 
  flipped, 
  setFlipped, 
  lang,
  cardStyle,
  renderContent,
  meaning
}: { 
  card: BaseCard | undefined, 
  index: number, 
  labelTh: string, 
  labelEn: string, 
  flipped: boolean[], 
  setFlipped: (f: boolean[]) => void, 
  lang: Lang,
  cardStyle: string,
  renderContent: (c: any) => React.ReactNode,
  meaning: string
}) => {
  const isFlipped = flipped[index];

  return (
    <div className="flex flex-col items-center group">
      <h4 className="text-lg font-bold mb-3 text-purple-700 dark:text-purple-400">{lang === "TH" ? labelTh : labelEn}</h4>
      
      <div className="relative w-48 h-72 rounded-2xl cursor-pointer perspective-1000" style={{ perspective: "1000px" }} onClick={() => {
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
          <div className={`absolute w-full h-full backface-hidden rounded-2xl shadow-xl flex items-center justify-center ${cardStyle}`} style={{ backfaceVisibility: "hidden" }}>
            <div className="absolute inset-2 border border-white/30 rounded-xl"></div>
            <Sparkles className="w-10 h-10 text-white/50" />
          </div>

          {/* Card Front */}
          <div className="absolute w-full h-full backface-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl flex flex-col items-center justify-center p-4" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            {card ? renderContent(card) : <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>}
          </div>
        </div>
      </div>

      {/* Meaning Text */}
      <div className={`mt-6 p-4 bg-white dark:bg-white/5 border border-purple-100 dark:border-white/10 rounded-xl w-full text-sm leading-relaxed text-gray-700 dark:text-gray-300 shadow-sm transition-all duration-500 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {card && <strong>{lang === "TH" ? "คำทำนาย: " : "Meaning: "}</strong>}
        {card && meaning}
      </div>
    </div>
  );
};

// =========================================================================
// Lenormand Calculator
// =========================================================================
export function LenormandCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [drawnCards, setDrawnCards] = useState<BaseCard[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);

  const drawCards = () => {
    setIsDrawing(true);
    setFlipped([false, false, false]);
    setDrawnCards([]);

    setTimeout(() => {
      const shuffled = shuffle([...lenormandCards]);
      setDrawnCards([shuffled[0], shuffled[1], shuffled[2]]);
      setIsDrawing(false);
      setTimeout(() => setFlipped([true, false, false]), 500);
      setTimeout(() => setFlipped([true, true, false]), 1200);
      setTimeout(() => setFlipped([true, true, true]), 1900);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div id="lenormand-result" className="mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-4">
            <span className="text-3xl">🍀</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">{lang === "TH" ? "ไพ่เลอนอร์มองด์ (Lenormand Reading)" : "Lenormand Reading"}</h2>
          <p className="text-gray-500">{lang === "TH" ? "การอ่านไพ่แบบตรงไปตรงมา แม่นยำ สุ่มไพ่ 3 ใบเพื่อดูเหตุการณ์" : "Direct and accurate 3-card spread."}</p>
        </div>

        {drawnCards.length === 0 ? (
          <div className="flex justify-center my-12">
            <button onClick={drawCards} disabled={isDrawing} className={`flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-bold text-lg transition-all shadow-lg hover:-translate-y-1 ${isDrawing ? 'opacity-50 cursor-not-allowed scale-95' : ''}`}>
              {isDrawing ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Star className="w-6 h-6" />}
              {lang === "TH" ? (isDrawing ? "กำลังสับไพ่..." : "เริ่มสุ่มไพ่ 3 ใบ") : (isDrawing ? "Shuffling..." : "Draw 3 Cards")}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center mb-4">
              <button onClick={drawCards} className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                <RefreshCw className="w-4 h-4" /> {lang === "TH" ? "เริ่มใหม่" : "Draw Again"}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[0, 1, 2].map((idx) => (
                <GenericCardView 
                  key={idx} card={drawnCards[idx]} index={idx} labelTh={`ใบที่ ${idx+1}`} labelEn={`Card ${idx+1}`} 
                  flipped={flipped} setFlipped={setFlipped} lang={lang}
                  cardStyle="bg-gradient-to-br from-emerald-700 to-teal-900 border-2 border-emerald-500/30"
                  meaning={drawnCards[idx]?.meaning || ""}
                  renderContent={(c) => (
                    <>
                      <div className="text-5xl mb-4">{c.emoji}</div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white text-center">{lang === "TH" ? c.nameTh : c.nameEn}</div>
                      <div className="absolute top-2 left-2 text-xs font-bold text-gray-400">{c.id}</div>
                    </>
                  )}
                />
              ))}
            </div>
            
            {flipped[2] && (
              <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl text-center border border-emerald-100 dark:border-emerald-800/50">
                <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">{lang === "TH" ? "วิธีอ่านภาพรวม (อ่านแบบประโยค)" : "Overall Reading"}</h4>
                <p className="text-emerald-700 dark:text-emerald-400">
                  {lang === "TH" 
                    ? `เหตุการณ์เริ่มต้นด้วย [${drawnCards[0].nameTh}] นำไปสู่สถานการณ์หลักคือ [${drawnCards[1].nameTh}] และจะจบลง/มีผลลัพธ์คือ [${drawnCards[2].nameTh}]` 
                    : `The situation starts with [${drawnCards[0].nameEn}], leading to [${drawnCards[1].nameEn}], and results in [${drawnCards[2].nameEn}].`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ไพ่เลอนอร์มองด์)" : "Lenormand FAQs"}>
        <FAQItem q={lang === "TH" ? "ไพ่เลอนอร์มองด์ต่างจากไพ่ยิปซีอย่างไร?" : "How is Lenormand different from Tarot?"} a={lang === "TH" ? "ไพ่เลอนอร์มองด์มี 36 ใบ เน้นทายเรื่องราวในชีวิตประจำวันแบบตรงไปตรงมา แม่นยำ ไม่เน้นจิตวิทยาเหมือนไพ่ยิปซี และมักอ่านไพ่เรียงต่อกันเป็นประโยค แทนที่จะอ่านแยกความหมายทีละใบ" : "Lenormand has 36 cards and focuses on practical, everyday matters rather than psychological deep dives like Tarot. Cards are read together like words in a sentence."} />
        <FAQItem q={lang === "TH" ? "ควรใช้ไพ่เลอนอร์มองด์เมื่อไหร่?" : "When should I use Lenormand?"} a={lang === "TH" ? "เหมาะมากกับคำถามที่ต้องการคำตอบชัดเจน ฟันธง เช่น 'จะได้งานนี้ไหม', 'เขาคิดยังไง', หรือ 'สถานการณ์พรุ่งนี้จะเป็นอย่างไร' เพราะความหมายของไพ่มีความตายตัวสูง" : "It's best for clear, specific questions like 'Will I get the job?' or 'What will happen tomorrow?' because the meanings are direct."} />
      </SEOFAQ>
      <RelatedCalcs links={[{id: "tarot", name: "Tarot Reading"}, {id: "oracle", name: "Oracle Cards"}]} lang={lang} setCalc={setCalc} />
    </div>
  );
}

// =========================================================================
// Oracle Calculator
// =========================================================================
export function OracleCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [drawnCard, setDrawnCard] = useState<BaseCard | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [flipped, setFlipped] = useState<boolean[]>([false]);

  const drawCard = () => {
    setIsDrawing(true);
    setFlipped([false]);
    setDrawnCard(null);

    setTimeout(() => {
      const shuffled = shuffle([...oracleCards]);
      setDrawnCard(shuffled[0]);
      setIsDrawing(false);
      setTimeout(() => setFlipped([true]), 300);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div id="oracle-result" className="mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{lang === "TH" ? "ไพ่ออราเคิล (Oracle Cards)" : "Oracle Cards"}</h2>
          <p className="text-gray-500">{lang === "TH" ? "รับคำแนะนำและพลังงานบวกรักษาจิตใจประจำวัน (สุ่ม 1 ใบ)" : "Receive your daily healing advice."}</p>
        </div>

        {!drawnCard ? (
          <div className="flex justify-center my-12">
            <button onClick={drawCard} disabled={isDrawing} className={`flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-bold text-lg transition-all shadow-lg hover:-translate-y-1 ${isDrawing ? 'opacity-50 cursor-not-allowed scale-95' : ''}`}>
              {isDrawing ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Star className="w-6 h-6" />}
              {lang === "TH" ? (isDrawing ? "กำลังรับพลังงาน..." : "สุ่มรับคำแนะนำ 1 ใบ") : (isDrawing ? "Connecting..." : "Draw 1 Card")}
            </button>
          </div>
        ) : (
          <div className="space-y-8 flex flex-col items-center">
            <button onClick={drawCard} className="flex items-center gap-2 text-rose-500 dark:text-rose-400 font-bold hover:underline mb-4">
              <RefreshCw className="w-4 h-4" /> {lang === "TH" ? "สุ่มใบใหม่" : "Draw Again"}
            </button>
            <div className="w-full max-w-sm">
              <GenericCardView 
                card={drawnCard} index={0} labelTh="คำแนะนำสำหรับคุณ" labelEn="Advice for You" 
                flipped={flipped} setFlipped={setFlipped} lang={lang}
                cardStyle="bg-gradient-to-br from-rose-300 to-pink-500 border-2 border-white/40"
                meaning={drawnCard.meaning}
                renderContent={(c) => (
                  <>
                    <div className="text-6xl mb-6">{c.emoji}</div>
                    <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 text-center">{lang === "TH" ? c.nameTh : c.nameEn}</div>
                  </>
                )}
              />
            </div>
          </div>
        )}
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ไพ่ออราเคิล)" : "Oracle Card FAQs"}>
        <FAQItem q={lang === "TH" ? "ไพ่ออราเคิลคืออะไร?" : "What are Oracle Cards?"} a={lang === "TH" ? "ไพ่ออราเคิลคือไพ่พยากรณ์ที่ไม่มีโครงสร้างตายตัวเหมือนไพ่ยิปซี เน้นการให้คำแนะนำเชิงบวก การเยียวยาจิตใจ (Healing) และการเสริมสร้างกำลังใจ ภาพและข้อความมักจะอ่านง่ายและส่งพลังงานดีๆ ให้กับผู้เปิด" : "Oracle cards are fluid, non-structured decks used for reading and healing. They focus on positive affirmations, guidance, and emotional support."} />
        <FAQItem q={lang === "TH" ? "สามารถเปิดไพ่ออราเคิลทุกวันได้ไหม?" : "Can I draw an Oracle card every day?"} a={lang === "TH" ? "สามารถเปิดได้ทุกวันครับ เหมาะมากสำหรับเป็นข้อคิดประจำวัน (Card of the Day) เพื่อตั้งเป้าหมายหรือปรับอารมณ์ก่อนเริ่มวันใหม่" : "Yes! Drawing a daily Oracle card is highly recommended to set a positive intention for your day."} />
      </SEOFAQ>
      <RelatedCalcs links={[{id: "tarot", name: "Tarot Reading"}, {id: "horoscope", name: "Horoscope"}]} lang={lang} setCalc={setCalc} />
    </div>
  );
}

// =========================================================================
// Playing Card Calculator
// =========================================================================
export function PlayingCardCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [drawnCards, setDrawnCards] = useState<PlayingCard[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);

  const drawCards = () => {
    setIsDrawing(true);
    setFlipped([false, false, false]);
    setDrawnCards([]);

    setTimeout(() => {
      const shuffled = shuffle([...playingCards]);
      setDrawnCards([shuffled[0], shuffled[1], shuffled[2]]);
      setIsDrawing(false);
      setTimeout(() => setFlipped([true, false, false]), 500);
      setTimeout(() => setFlipped([true, true, false]), 1200);
      setTimeout(() => setFlipped([true, true, true]), 1900);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div id="playing-card-result" className="mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
            <span className="text-3xl">♠️</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">{lang === "TH" ? "ดูดวงไพ่ป๊อก (Playing Cards)" : "Playing Card Cartomancy"}</h2>
          <p className="text-gray-500">{lang === "TH" ? "ศาสตร์การพยากรณ์สุดคลาสสิกจากไพ่ 52 ใบ สุ่ม 3 ใบ" : "Classic cartomancy with a 52-card deck."}</p>
        </div>

        {drawnCards.length === 0 ? (
          <div className="flex justify-center my-12">
            <button onClick={drawCards} disabled={isDrawing} className={`flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full font-bold text-lg transition-all shadow-lg hover:-translate-y-1 ${isDrawing ? 'opacity-50 cursor-not-allowed scale-95' : ''}`}>
              {isDrawing ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Star className="w-6 h-6" />}
              {lang === "TH" ? (isDrawing ? "กำลังสับไพ่..." : "เริ่มสุ่มไพ่ 3 ใบ") : (isDrawing ? "Shuffling..." : "Draw 3 Cards")}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center mb-4">
              <button onClick={drawCards} className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold hover:underline">
                <RefreshCw className="w-4 h-4" /> {lang === "TH" ? "เริ่มใหม่" : "Draw Again"}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[0, 1, 2].map((idx) => (
                <GenericCardView 
                  key={idx} card={drawnCards[idx]} index={idx} labelTh={`ใบที่ ${idx+1}`} labelEn={`Card ${idx+1}`} 
                  flipped={flipped} setFlipped={setFlipped} lang={lang}
                  cardStyle="bg-gradient-to-br from-red-800 to-slate-900 border-2 border-red-500/30"
                  meaning={drawnCards[idx]?.meaning || ""}
                  renderContent={(c: any) => (
                    <div className={`w-full h-full flex flex-col justify-between ${c.color === 'red' ? 'text-red-600' : 'text-slate-900 dark:text-white'}`}>
                      <div className="text-2xl font-bold self-start">{c.nameTh.split(' ')[0]} {c.emoji}</div>
                      <div className="text-6xl self-center">{c.emoji}</div>
                      <div className="text-2xl font-bold self-end rotate-180">{c.nameTh.split(' ')[0]} {c.emoji}</div>
                    </div>
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ไพ่ป๊อก)" : "Playing Card FAQs"}>
        <FAQItem q={lang === "TH" ? "ไพ่ป๊อกดูดวงได้จริงหรือ?" : "Can playing cards really tell the future?"} a={lang === "TH" ? "ได้แน่นอนครับ! ศาสตร์การดูดวงด้วยไพ่ป๊อก (Cartomancy) มีประวัติศาสตร์ยาวนานหลายร้อยปีในยุโรป และเป็นต้นกำเนิดของไพ่ยิปซีชุดเล็ก (Minor Arcana) ไพ่แต่ละหน้ามีสัญลักษณ์และธาตุที่ซ่อนความหมายไว้" : "Absolutely! Cartomancy (reading playing cards) has been practiced for centuries in Europe. Each suit represents an element and life area, making it a very effective divination tool."} />
        <FAQItem q={lang === "TH" ? "หน้าไพ่ (ดอก) แต่ละแบบหมายถึงอะไร?" : "What do the suits mean?"} a={lang === "TH" ? "โพดำ (Spades) คือลม/ปัญหา, โพแดง (Hearts) คือน้ำ/ความรัก, ข้าวหลามตัด (Diamonds) คือดิน/เงินทอง, และดอกจิก (Clubs) คือไฟ/การงาน" : "Spades = Air/Obstacles, Hearts = Water/Emotions, Diamonds = Earth/Money, Clubs = Fire/Work."} />
      </SEOFAQ>
      <RelatedCalcs links={[{id: "tarot", name: "Tarot Reading"}, {id: "kipper", name: "Kipper Cards"}]} lang={lang} setCalc={setCalc} />
    </div>
  );
}

// =========================================================================
// Kipper Calculator
// =========================================================================
export function KipperCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [drawnCards, setDrawnCards] = useState<BaseCard[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);

  const drawCards = () => {
    setIsDrawing(true);
    setFlipped([false, false, false]);
    setDrawnCards([]);

    setTimeout(() => {
      const shuffled = shuffle([...kipperCards]);
      setDrawnCards([shuffled[0], shuffled[1], shuffled[2]]);
      setIsDrawing(false);
      setTimeout(() => setFlipped([true, false, false]), 500);
      setTimeout(() => setFlipped([true, true, false]), 1200);
      setTimeout(() => setFlipped([true, true, true]), 1900);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div id="kipper-result" className="mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mb-4">
            <span className="text-3xl">🤝</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">{lang === "TH" ? "ไพ่คิปเปอร์ (Kipper Cards)" : "Kipper Reading"}</h2>
          <p className="text-gray-500">{lang === "TH" ? "เน้นดูเรื่องความสัมพันธ์และสถานการณ์รอบตัว (สุ่ม 3 ใบ)" : "Focuses on social situations and relationships."}</p>
        </div>

        {drawnCards.length === 0 ? (
          <div className="flex justify-center my-12">
            <button onClick={drawCards} disabled={isDrawing} className={`flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold text-lg transition-all shadow-lg hover:-translate-y-1 ${isDrawing ? 'opacity-50 cursor-not-allowed scale-95' : ''}`}>
              {isDrawing ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Star className="w-6 h-6" />}
              {lang === "TH" ? (isDrawing ? "กำลังสับไพ่..." : "เริ่มสุ่มไพ่ 3 ใบ") : (isDrawing ? "Shuffling..." : "Draw 3 Cards")}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center mb-4">
              <button onClick={drawCards} className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold hover:underline">
                <RefreshCw className="w-4 h-4" /> {lang === "TH" ? "เริ่มใหม่" : "Draw Again"}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[0, 1, 2].map((idx) => (
                <GenericCardView 
                  key={idx} card={drawnCards[idx]} index={idx} labelTh={`ใบที่ ${idx+1}`} labelEn={`Card ${idx+1}`} 
                  flipped={flipped} setFlipped={setFlipped} lang={lang}
                  cardStyle="bg-gradient-to-br from-amber-600 to-orange-800 border-2 border-amber-300/40"
                  meaning={drawnCards[idx]?.meaning || ""}
                  renderContent={(c) => (
                    <>
                      <div className="text-6xl mb-4">{c.emoji}</div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white text-center leading-tight">{lang === "TH" ? c.nameTh : c.nameEn}</div>
                      <div className="absolute top-2 left-2 text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{c.id.replace('k', '')}</div>
                    </>
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ไพ่คิปเปอร์)" : "Kipper Card FAQs"}>
        <FAQItem q={lang === "TH" ? "ไพ่คิปเปอร์คืออะไร?" : "What are Kipper Cards?"} a={lang === "TH" ? "ไพ่คิปเปอร์เป็นไพ่สัญชาติเยอรมัน มี 36 ใบ มีโครงสร้างคล้ายเลอนอร์มองด์ แต่หน้าไพ่ส่วนใหญ่จะเป็น 'บุคคล' และ 'สถานการณ์สังคม' จึงเหมาะมากกับการดูเรื่องความสัมพันธ์ เพื่อนร่วมงาน หรือเรื่องครอบครัว" : "Kipper is a German cartomancy system of 36 cards. It heavily features people and daily situations, making it perfect for relationship and social dynamics readings."} />
        <FAQItem q={lang === "TH" ? "ไพ่คิปเปอร์แม่นไหม?" : "Are Kipper readings accurate?"} a={lang === "TH" ? "แม่นยำมากในเรื่องที่เกี่ยวกับคน! หากคุณมีคำถามประเภท 'เจ้านายคิดยังไง', 'คนรักมีท่าทีแบบไหน' ไพ่คิปเปอร์จะตอบได้ตรงประเด็นและเห็นภาพสถานการณ์ได้ชัดเจนกว่าไพ่อื่นๆ" : "Extremely accurate for people-related questions. If you need to know what someone is thinking or the dynamic of a relationship, Kipper gives direct answers."} />
      </SEOFAQ>
      <RelatedCalcs links={[{id: "lenormand", name: "Lenormand"}, {id: "tarot", name: "Tarot Reading"}]} lang={lang} setCalc={setCalc} />
    </div>
  );
}

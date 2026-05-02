"use client";

import { useState } from "react";
import { Coffee, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DonateButton({ lang, type = "button" }: { lang: "TH" | "EN", type?: "button" | "icon" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {type === "button" ? (
        <button 
          onClick={() => setIsOpen(true)} 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full hover:-translate-y-1 hover:shadow-lg transition-all text-sm font-bold w-full sm:w-auto"
        >
          <Coffee className="w-5 h-5" />
          {lang === "TH" ? "เลี้ยงกาแฟทีมงานสักแก้ว ☕" : "Buy us a coffee ☕"}
        </button>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-500 hover:text-amber-700 hover:underline font-bold"
          title={lang === "TH" ? "สนับสนุนเรา" : "Support Us"}
        >
          <Coffee className="w-5 h-5" /> {lang === "TH" ? "สนับสนุน" : "Support"}
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{scale:0.9, opacity:0, y: 20}} 
              animate={{scale:1, opacity:1, y: 0}} 
              exit={{scale:0.9, opacity:0, y: 20}} 
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl max-w-sm w-full shadow-2xl relative text-center border-2 border-amber-100 dark:border-amber-900/30"
            >
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
                <Coffee className="w-8 h-8 text-amber-500" />
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{lang === "TH" ? "สนับสนุน คำนวณ.com" : "Support Us"}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {lang === "TH" ? "หากเครื่องมือนี้ช่วยให้คุณประหยัดเวลา ช่วยเลี้ยงกาแฟทีมงานสักแก้ว เพื่อเป็นกำลังใจในการพัฒนาเครื่องมือดีๆ ให้ใช้ฟรีต่อไปนะครับ ❤️" : "If this tool helped you, consider buying us a coffee to keep this platform free for everyone ❤️"}
              </p>
              
              <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-200 dark:border-white/10 shadow-inner mb-4">
                <img src="/promptpay.jpg" alt="PromptPay QR" className="w-full aspect-square object-contain rounded-xl bg-white p-2" />
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{lang === "TH" ? "สแกนด้วยแอปธนาคารใดก็ได้" : "Scan with any Thai Banking App"}</p>
                  <p className="font-bold text-gray-800 dark:text-gray-200 text-lg">นาย ปิติพล โพธิ์ทอง</p>
                </div>
              </div>

              <p className="text-xs text-gray-400 flex items-center justify-center gap-1 mt-6">
                <Heart className="w-3 h-3 fill-pink-500 text-pink-500" /> ขอบคุณที่สนับสนุนครับ
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

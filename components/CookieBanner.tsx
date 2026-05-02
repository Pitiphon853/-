"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-7xl mx-auto glass-card border border-gray-200 dark:border-white/10 p-4 md:p-6 rounded-2xl shadow-neo flex flex-col md:flex-row items-center justify-between gap-4 bg-white/90 dark:bg-black/90 backdrop-blur-xl">
            <div className="text-sm text-gray-700 dark:text-gray-300 text-center md:text-left">
              เว็บไซต์นี้ใช้คุกกี้เพื่อนำเสนอโฆษณาที่ตรงใจและเพิ่มประสบการณ์การใช้งานที่ดียิ่งขึ้น ข้อมูลของคุณอาจถูกแชร์กับพาร์ทเนอร์เช่น Google เพื่อใช้สำหรับโฆษณา (Google AdSense) การใช้งานเว็บไซต์นี้ต่อไปถือว่าคุณยอมรับ <a href="/privacy" className="text-deep-teal dark:text-soft-mint underline font-bold">นโยบายความเป็นส่วนตัว</a> ของเรา
            </div>
            <button 
              onClick={accept}
              className="whitespace-nowrap px-8 py-3 bg-deep-teal text-white font-bold rounded-xl hover:-translate-y-1 hover:shadow-glow transition-all"
            >
              ยอมรับคุกกี้ (Accept)
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

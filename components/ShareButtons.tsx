"use client";

import { Share2 } from "lucide-react";

export function ShareButtons({ url = "https://xn--42c5b5bn8a.com", title = "คำนวณ.com ศูนย์รวมเครื่องมือคำนวณ" }: { url?: string, title?: string }) {
  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
  };

  const handleLine = () => {
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank', 'width=600,height=400');
  };

  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-bold">
        <Share2 className="w-4 h-4" /> แชร์ผลลัพธ์
      </div>
      <div className="flex gap-4">
        <button 
          onClick={handleFacebook}
          className="px-6 py-2 bg-[#1877F2] text-white font-bold rounded-full hover:bg-[#1865ce] transition-colors shadow-md"
        >
          Facebook
        </button>
        <button 
          onClick={handleLine}
          className="px-6 py-2 bg-[#06C755] text-white font-bold rounded-full hover:bg-[#05b34c] transition-colors shadow-md"
        >
          LINE
        </button>
      </div>
    </div>
  );
}

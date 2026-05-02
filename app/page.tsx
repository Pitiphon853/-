"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calculator, Heart, Home, BookOpen, Coins, Zap, Car, ArrowLeft, Star, Mail, Moon, Sun, Baby, Utensils, Briefcase, Hash, Lightbulb, Receipt } from "lucide-react";
import { dict, Lang } from "../components/dictionary";
import { Calculators } from "../components/calculators";
import { useTheme } from "../components/ThemeProvider";
import { AdPlaceholder } from "../components/AdPlaceholder";
import { DonateButton } from "../components/DonateButton";

type Category = "All" | "Health" | "Family" | "Finance" | "Business" | "Utility" | "General";

export default function CalculatorHub() {
  const [lang, setLang] = useState<Lang>("TH");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCalc, setActiveCalc] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { theme, toggleTheme } = useTheme();
  
  const t = dict[lang];

  useEffect(() => {
    const savedFavs = localStorage.getItem("fav_calcs");
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let newFavs = [...favorites];
    if (newFavs.includes(id)) newFavs = newFavs.filter(f => f !== id);
    else newFavs.push(id);
    setFavorites(newFavs);
    localStorage.setItem("fav_calcs", JSON.stringify(newFavs));
  };

  const getCalcs = () => [
    // Health & Diet (Pink)
    { id: "bmi", name: lang==="TH"?"คำนวณ BMI":"BMI Calculator", desc: lang==="TH"?"ดัชนีมวลกาย":"Body Mass Index", category: "Health", icon: Heart },
    { id: "sleep", name: lang==="TH"?"การนอนหลับ":"Sleep Cycle", desc: lang==="TH"?"คำนวณเวลานอน":"Sleep Time Calculator", category: "Health", icon: Heart },
    { id: "tdee", name: lang==="TH"?"คำนวณ TDEE":"TDEE Calculator", desc: lang==="TH"?"พลังงานที่ใช้ต่อวัน":"Daily Energy", category: "Health", icon: Zap },
    { id: "water-intake", name: lang==="TH"?"ปริมาณน้ำดื่ม":"Water Intake", desc: lang==="TH"?"ดื่มน้ำวันละกี่ลิตร":"Daily Water", category: "Health", icon: Heart },
    { id: "food-random", name: lang==="TH"?"สุ่มเมนูอาหาร":"Food Randomizer", desc: lang==="TH"?"สุ่มตามแคลอรี่":"By Calorie Limit", category: "Health", icon: Utensils },
    
    // Family (Pink)
    { id: "child-height", name: lang==="TH"?"ส่วนสูงลูก":"Child Height", desc: lang==="TH"?"ทำนายส่วนสูง":"Height Predictor", category: "Family", icon: Baby },

    // Finance (Green/Gold)
    { id: "discount", name: lang==="TH"?"ส่วนลด":"Discount", desc: lang==="TH"?"เปอร์เซ็นต์ส่วนลด":"Discount Percentage", category: "Finance", icon: Coins },
    { id: "car-loan", name: lang==="TH"?"ผ่อนรถยนต์":"Car Loan", desc: lang==="TH"?"ค่างวดรถ":"Auto Loan Calculator", category: "Finance", icon: Car },
    { id: "mortgage", name: lang==="TH"?"เงินกู้/บ้าน":"Mortgage", desc: lang==="TH"?"ยอดผ่อนรายเดือน":"Loan Calculator", category: "Finance", icon: Coins },

    // Business (Green/Gold)
    { id: "vat", name: lang==="TH"?"คำนวณ VAT":"VAT Calculator", desc: lang==="TH"?"ถอด/เพิ่ม VAT":"Value Added Tax", category: "Business", icon: Receipt },
    { id: "margin", name: lang==="TH"?"คำนวณราคาขาย":"Margin", desc: lang==="TH"?"ตั้งราคาจากต้นทุน":"Profit Margin", category: "Business", icon: Calculator },

    // Utility & Education (Blue)
    { id: "gpa", name: lang==="TH"?"จำลองเกรดเบื้องต้น":"GPA Simulator", desc: lang==="TH"?"จำลองเกรด (GPA)":"GPA Estimator", category: "Utility", icon: BookOpen },
    { id: "baseN", name: lang==="TH"?"แปลงเลขฐาน":"Base N", desc: lang==="TH"?"ฐาน 2-16":"Number Base Converter", category: "Utility", icon: Calculator },
    { id: "btu", name: lang==="TH"?"คำนวณ BTU":"AC BTU", desc: lang==="TH"?"ขนาดแอร์บ้าน":"Air Conditioner BTU", category: "Utility", icon: Home },
    { id: "electric", name: lang==="TH"?"ค่าไฟ":"Electricity", desc: lang==="TH"?"คำนวณค่าไฟฟ้า":"Electricity Bill", category: "Utility", icon: Zap },
    { id: "water-bill", name: lang==="TH"?"ค่าน้ำ":"Water Bill", desc: lang==="TH"?"ค่าน้ำประปา":"Water Usage Bill", category: "Utility", icon: Home },

    // General (Purple)
    { id: "randomizer", name: lang==="TH"?"สุ่มเลข/สุ่มชื่อ":"Randomizer", desc: lang==="TH"?"จับฉลาก":"Number/Name Picker", category: "General", icon: Hash },
    { id: "word-counter", name: lang==="TH"?"นับจำนวนคำ":"Word Counter", desc: lang==="TH"?"นับคำ/ตัวอักษร":"Words & Chars", category: "General", icon: BookOpen },
    { id: "age", name: lang==="TH"?"คำนวณอายุ":"Age Calculator", desc: lang==="TH"?"อายุละเอียด":"Exact Age", category: "General", icon: Calculator },
  ];

  const filteredCalcs = getCalcs().filter(c => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  }).sort((a, b) => {
    if (favorites.includes(a.id) && !favorites.includes(b.id)) return -1;
    if (!favorites.includes(a.id) && favorites.includes(b.id)) return 1;
    return 0;
  });

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Health":
      case "Family": return "pink";
      case "Finance":
      case "Business": return "green";
      case "General": return "purple";
      default: return "blue";
    }
  };

  const colorClasses = {
    pink: "text-pink-500 border-pink-500 hover:border-pink-500 focus:ring-pink-500 group-hover:text-pink-500 shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]",
    green: "text-green-500 border-green-500 hover:border-green-500 focus:ring-green-500 group-hover:text-green-500 shadow-[4px_4px_0px_0px_rgba(34,197,94,1)]",
    blue: "text-blue-500 border-blue-500 hover:border-blue-500 focus:ring-blue-500 group-hover:text-blue-500 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]",
    purple: "text-purple-500 border-purple-500 hover:border-purple-500 focus:ring-purple-500 group-hover:text-purple-500 shadow-[4px_4px_0px_0px_rgba(168,85,247,1)]"
  };

  const getActiveCalcColor = () => {
    if(!activeCalc) return "blue";
    const calc = getCalcs().find(c => c.id === activeCalc);
    return calc ? getCategoryColor(calc.category) : "blue";
  };

  const activeColor = getActiveCalcColor();

  return (
    <main className="min-h-screen pb-24 transition-colors duration-300">
      <nav className="fixed w-full z-40 glass px-4 md:px-6 py-4 flex flex-wrap justify-between items-center border-b border-black/10 dark:border-white/5 gap-4">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-deep-teal to-blue-600 dark:from-soft-mint dark:to-deep-teal cursor-pointer" onClick={() => setActiveCalc(null)}>
            {t.appName}
          </div>
          <button onClick={() => setActiveCalc(null)} className="hidden md:flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            <Home className="w-4 h-4" /> {t.home}
          </button>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <a href="mailto:zazadu917@gmail.com" className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-deep-teal dark:hover:text-soft-mint transition-colors">
            <Mail className="w-4 h-4" /> <span className="hidden sm:inline">{t.contact}</span>
          </a>
          
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>

          <div className="flex bg-black/5 dark:bg-white/10 rounded-full p-1">
            <button onClick={() => setLang("TH")} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === "TH" ? "bg-deep-teal text-white shadow-md" : "text-gray-500 dark:text-gray-400"}`}>TH</button>
            <button onClick={() => setLang("EN")} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === "EN" ? "bg-deep-teal text-white shadow-md" : "text-gray-500 dark:text-gray-400"}`}>EN</button>
          </div>
        </div>
      </nav>

      <div className="pt-28 px-4 md:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {!activeCalc ? (
              <motion.div 
                key="hub"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-12">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white"
                  >
                    {t.heroTitle1} <span className="text-deep-teal">{t.heroTitleHighlight}</span> {t.heroTitle2}
                  </motion.h1>
                  <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder={t.searchPlaceholder} 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-lg focus:outline-none focus:border-deep-teal focus:ring-1 focus:ring-deep-teal transition-all shadow-sm dark:shadow-neo hover:shadow-none text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
                  {[
                    { id: "All", label: t.all, color: "blue" },
                    { id: "Health", label: lang==="TH"?"สุขภาพ/อาหาร":"Health", color: "pink" },
                    { id: "Family", label: lang==="TH"?"ครอบครัว":"Family", color: "pink" },
                    { id: "Finance", label: t.finance, color: "green" },
                    { id: "Business", label: lang==="TH"?"ธุรกิจ/แม่ค้า":"Business", color: "green" },
                    { id: "Utility", label: t.utility, color: "blue" },
                    { id: "General", label: lang==="TH"?"ทั่วไป":"General", color: "purple" }
                  ].map((cat) => (
                    <button 
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id as Category)}
                      className={`px-4 md:px-6 py-2 rounded-full font-bold border-2 transition-all text-sm md:text-base ${
                        activeCategory === cat.id 
                        ? `border-${cat.color}-500 bg-${cat.color}-500/10 text-${cat.color}-500`
                        : "border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-gray-300"
                      }`}
                      style={{
                        borderColor: activeCategory === cat.id ? `var(--tw-colors-${cat.color}-500)` : undefined,
                        color: activeCategory === cat.id ? `var(--tw-colors-${cat.color}-500)` : undefined,
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Request a tool banner */}
                <div className="max-w-2xl mx-auto mb-12">
                   <a href={`mailto:zazadu917@gmail.com?subject=${lang==="TH"?"ขอเครื่องคำนวณใหม่ (คำนวณ.com)":"Request New Calculator"}`} className="block w-full p-4 bg-gradient-to-r from-deep-teal/10 to-blue-500/10 dark:from-soft-mint/10 dark:to-deep-teal/20 rounded-xl border border-deep-teal/20 text-center hover:-translate-y-1 transition-transform cursor-pointer">
                      <div className="flex items-center justify-center gap-2 text-deep-teal dark:text-soft-mint font-bold text-lg">
                         <Lightbulb className="w-5 h-5" />
                         {lang === "TH" ? "อยากให้เราคำนวณอะไรเพิ่ม? บอกได้ที่นี่เลย" : "Want a new calculator? Tell us here!"}
                      </div>
                   </a>
                </div>

                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredCalcs.length > 0 ? (
                      filteredCalcs.map((calc) => {
                        const color = getCategoryColor(calc.category);
                        
                        const cardClasses = {
                          pink: "hover:border-pink-500 hover:shadow-[4px_4px_0px_0px_#ec4899]",
                          green: "hover:border-green-500 hover:shadow-[4px_4px_0px_0px_#22c55e]",
                          blue: "hover:border-blue-500 hover:shadow-[4px_4px_0px_0px_#3b82f6]",
                          purple: "hover:border-purple-500 hover:shadow-[4px_4px_0px_0px_#a855f7]"
                        };

                        const textHoverClasses = {
                          pink: "group-hover:text-pink-500",
                          green: "group-hover:text-green-500",
                          blue: "group-hover:text-blue-500",
                          purple: "group-hover:text-purple-500"
                        };

                        const bgGlowClasses = {
                          pink: "bg-pink-500/5 group-hover:bg-pink-500/20",
                          green: "bg-green-500/5 group-hover:bg-green-500/20",
                          blue: "bg-blue-500/5 group-hover:bg-blue-500/20",
                          purple: "bg-purple-500/5 group-hover:bg-purple-500/20"
                        };
                        
                        return (
                        <motion.div
                          layout
                          key={calc.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => setActiveCalc(calc.id)}
                          className={`glass-card group cursor-pointer p-6 rounded-xl hover:-translate-y-1 transition-all border border-gray-200 dark:border-white/10 relative overflow-hidden bg-white dark:bg-transparent ${cardClasses[color as keyof typeof cardClasses]}`}
                        >
                          <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl -mr-8 -mt-8 transition-all ${bgGlowClasses[color as keyof typeof bgGlowClasses]}`} />
                          
                          <button 
                            onClick={(e) => toggleFav(calc.id, e)}
                            className="absolute top-4 right-4 z-10 p-2 -m-2"
                          >
                            <Star className={`w-6 h-6 transition-transform hover:scale-110 ${favorites.includes(calc.id) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-500 hover:text-gray-400 dark:hover:text-white'}`} />
                          </button>

                          <div className={`flex items-center gap-3 mb-4 relative z-10 text-gray-400 transition-colors ${textHoverClasses[color as keyof typeof textHoverClasses]}`}>
                            <calc.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                          </div>
                          <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors relative z-10 ${textHoverClasses[color as keyof typeof textHoverClasses]}`}>{calc.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 relative z-10">{calc.desc}</p>
                        </motion.div>
                      )})
                    ) : (
                      <div className="col-span-full py-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 mb-4">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{lang === "TH" ? "ไม่พบเครื่องมือที่คุณค้นหา" : "Calculator Not Found"}</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                          {lang === "TH" ? "ดูเหมือนว่าเราจะยังไม่มีเครื่องมือคำนวณตัวนี้... อยากให้เราทำเครื่องมือตัวนี้เพิ่มไหม? กดบอกเราได้เลย!" : "It seems we don't have this calculator yet... Want us to build it? Let us know!"}
                        </p>
                        <a href={`mailto:zazadu917@gmail.com?subject=${lang==="TH"?"ขอเสนอเครื่องมือคำนวณ: ":"Suggest a Calculator: "}${searchQuery}`} className="inline-flex items-center gap-2 px-6 py-3 bg-deep-teal text-white font-bold rounded-full hover:-translate-y-1 hover:shadow-glow transition-all">
                          <Lightbulb className="w-5 h-5" />
                          {lang === "TH" ? "ขอเครื่องมือนี้" : "Request this Tool"}
                        </a>
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Footer SEO Content & Disclaimer */}
                <div className="mt-20 pt-10 border-t border-gray-200 dark:border-white/10 text-center max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{lang === "TH" ? "เว็บเครื่องมือคำนวณออนไลน์ที่ใช้งานง่ายที่สุด" : "The Most Intuitive Online Calculators"}</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-sm">
                    {lang === "TH" 
                      ? "คำนวณ.com เป็นศูนย์รวมเครื่องมือคำนวณฟรีสำหรับชีวิตประจำวัน ไม่ว่าจะเป็นการคิดค่าไฟ คำนวณค่างวดรถ หรือหาดัชนีมวลกาย (BMI) เพื่อสุขภาพ เราออกแบบระบบให้ทำงานได้อย่างรวดเร็ว แม่นยำ และใช้งานได้ทุกอุปกรณ์ โดยไม่ต้องติดตั้งแอปพลิเคชัน"
                      : "Kamnuan.com is your free, all-in-one hub for daily calculations. From estimating your electricity bills and car loan payments to checking your Body Mass Index (BMI). We designed our tools to be fast, accurate, and mobile-friendly without any app installation required."
                    }
                  </p>
                  
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/30 rounded-xl text-xs text-red-600 dark:text-red-400 mb-6">
                    <span className="font-bold">Disclaimer (ข้อจำกัดความรับผิดชอบ):</span> {lang === "TH" ? "ข้อมูลและผลลัพธ์ที่ได้จากเว็บไซต์นี้ เป็นเพียงการประมาณการเบื้องต้นเพื่อใช้เป็นแนวทางเท่านั้น ไม่สามารถนำไปใช้อ้างอิงทางการแพทย์ ทางกฎหมาย หรือการทำธุรกรรมทางการเงินอย่างเป็นทางการได้ ผู้ใช้ควรตรวจสอบข้อมูลกับผู้เชี่ยวชาญเฉพาะทางอีกครั้ง" : "The results provided by this website are for informational and estimation purposes only. They should not be used as professional medical, legal, or financial advice."}
                  </div>

                  <div className="flex justify-center gap-6 text-sm font-bold">
                    <a href="/about" className="text-gray-500 hover:text-deep-teal transition-colors underline">About Us</a>
                    <a href="/privacy" className="text-gray-500 hover:text-deep-teal transition-colors underline">Privacy Policy</a>
                    <a href="/terms" className="text-gray-500 hover:text-deep-teal transition-colors underline">Terms of Service</a>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <DonateButton lang={lang} type="icon" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <button 
                  onClick={() => setActiveCalc(null)}
                  className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-deep-teal dark:hover:text-soft-mint transition-colors mb-6 font-bold"
                >
                  <ArrowLeft className="w-5 h-5" /> {t.back}
                </button>

                <div className={`glass-card p-6 md:p-8 rounded-2xl border-2 transition-colors shadow-neo dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] bg-white/80 dark:bg-black/50 backdrop-blur-xl ${colorClasses[activeColor as keyof typeof colorClasses]}`}>
                  <Calculators activeCalc={activeCalc} lang={lang} setCalc={setActiveCalc} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Ads on Large Screens */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <AdPlaceholder type="sidebar" />
          </div>
        </div>
      </div>
      
      {/* Mobile Sticky Ad */}
      <div className="lg:hidden">
        <AdPlaceholder type="sticky" />
      </div>
    </main>
  );
}

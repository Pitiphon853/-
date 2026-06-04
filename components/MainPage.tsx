"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calculator, Heart, Home, BookOpen, Coins, Zap, Car, ArrowLeft, Star, Mail, Moon, Sun, Baby, Utensils, Briefcase, Hash, Lightbulb, Receipt, Plane, Sparkles, Clock } from "lucide-react";
import { dict, Lang } from "../components/dictionary";
import { Calculators } from "../components/calculators";
import { useTheme } from "../components/ThemeProvider";
import { AdPlaceholder } from "../components/AdPlaceholder";
import { DonateButton } from "../components/DonateButton";
import { FinanceSEO } from "../components/seo/FinanceSEO";
import { HealthSEO } from "../components/seo/HealthSEO";
import { FamilySEO } from "../components/seo/FamilySEO";
import { BusinessSEO } from "../components/seo/BusinessSEO";
import { AgricultureSEO } from "../components/seo/AgricultureSEO";
import { ConstructionSEO } from "../components/seo/ConstructionSEO";
import { TechnologySEO } from "../components/seo/TechnologySEO";
import { TravelSEO } from "../components/seo/TravelSEO";
import { UtilitySEO } from "../components/seo/UtilitySEO";
import { GeneralSEO } from "../components/seo/GeneralSEO";
import { EnvironmentSEO } from "../components/seo/EnvironmentSEO";
import { ScienceSEO } from "../components/seo/ScienceSEO";

type Category = "All" | "Health" | "Family" | "Finance" | "Business" | "Agriculture" | "Construction" | "Technology" | "Travel" | "Environment" | "Science" | "Utility" | "General" | "Fortune" | "Gold" | "Education" | "Sports";

import { getCalcs } from "../lib/toolsData";
import Link from "next/link";

const slugMap: Record<string, string> = {
  "bmi-thai": "bmi",
  "tax-2026": "personal-tax",
  "net-salary-2026": "net-salary",
  "electricity-2026": "electric",
  "mortgage-2026": "mortgage",
  "area-converter": "area-unit",
  "used-car-loan": "car-loan",
  "cylinder-volume": "volume-shape"
};

export default function MainPage({ activeSlug = null }: { activeSlug?: string | null }) {
  const [lang, setLang] = useState<Lang>("TH");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const allCalcs = getCalcs(lang);

  const getMappedSlug = (slug: string | null) => {
    if (!slug) return null;
    const decoded = decodeURIComponent(slug);
    return slugMap[slug] || slugMap[decoded] || slug;
  };

  const mappedSlug = getMappedSlug(activeSlug);
  const initialCalc = mappedSlug ? (allCalcs.find(c => c.slug === mappedSlug || c.id === mappedSlug || c.slug === decodeURIComponent(mappedSlug) || c.id === decodeURIComponent(mappedSlug))?.id || null) : null;
  const [activeCalc, setActiveCalc] = useState<string | null>(initialCalc);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (activeSlug) {
      const mapped = getMappedSlug(activeSlug);
      if (mapped) {
        const decodedSlug = decodeURIComponent(mapped);
        const calc = allCalcs.find(c => 
          c.slug === mapped || 
          c.id === mapped || 
          c.slug === decodedSlug || 
          c.id === decodedSlug
        );
        if (calc) {
          setActiveCalc(calc.id);
        } else {
          setActiveCalc(null);
        }
      } else {
        setActiveCalc(null);
      }
    } else {
      setActiveCalc(null);
    }
  }, [activeSlug, allCalcs]);
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


  const filteredCalcs = allCalcs.filter(c => {
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
      case "Business":
      case "Agriculture": return "green";
      case "Environment": return "emerald";
      case "Construction": return "amber";
      case "Technology": 
      case "Sports": return "orange";
      case "Travel": return "cyan";
      case "General": return "purple";
      case "Fortune": return "indigo";
      case "Science": return "indigo";
      case "Gold": return "yellow";
      case "Education": return "blue";
      default: return "blue";
    }
  };

  const colorClasses = {
    pink: "text-pink-500 border-pink-500 hover:border-pink-500 focus:ring-pink-500 group-hover:text-pink-500 shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]",
    green: "text-green-500 border-green-500 hover:border-green-500 focus:ring-green-500 group-hover:text-green-500 shadow-[4px_4px_0px_0px_rgba(34,197,94,1)]",
    blue: "text-blue-500 border-blue-500 hover:border-blue-500 focus:ring-blue-500 group-hover:text-blue-500 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]",
    purple: "text-purple-500 border-purple-500 hover:border-purple-500 focus:ring-purple-500 group-hover:text-purple-500 shadow-[4px_4px_0px_0px_rgba(168,85,247,1)]",
    amber: "text-amber-500 border-amber-500 hover:border-amber-500 focus:ring-amber-500 group-hover:text-amber-500 shadow-[4px_4px_0px_0px_rgba(245,158,11,1)]",
    orange: "text-orange-500 border-orange-500 hover:border-orange-500 focus:ring-orange-500 group-hover:text-orange-500 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]",
    cyan: "text-cyan-500 border-cyan-500 hover:border-cyan-500 focus:ring-cyan-500 group-hover:text-cyan-500 shadow-[4px_4px_0px_0px_rgba(6,182,212,1)]",
    indigo: "text-indigo-500 border-indigo-500 hover:border-indigo-500 focus:ring-indigo-500 group-hover:text-indigo-500 shadow-[4px_4px_0px_0px_rgba(99,102,241,1)]",
    yellow: "text-yellow-500 border-yellow-500 hover:border-yellow-500 focus:ring-yellow-500 group-hover:text-yellow-500 shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]",
    emerald: "text-emerald-500 border-emerald-500 hover:border-emerald-500 focus:ring-emerald-500 group-hover:text-emerald-500 shadow-[4px_4px_0px_0px_rgba(16,185,129,1)]"
  };

  const getActiveCalcColor = () => {
    if(!activeCalc) return "blue";
    const calc = allCalcs.find(c => c.id === activeCalc);
    return calc ? getCategoryColor(calc.category) : "blue";
  };

  const activeColor = getActiveCalcColor();

  return (
    <main className="min-h-screen pb-24 transition-colors duration-300">
      <nav className="fixed w-full z-40 glass px-4 md:px-6 py-4 flex flex-wrap justify-between items-center border-b border-black/10 dark:border-white/5 gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-deep-teal to-blue-600 dark:from-soft-mint dark:to-deep-teal cursor-pointer">
            {t.appName}
          </Link>
          <Link href="/" className="hidden md:flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            <Home className="w-4 h-4" /> {t.home}
          </Link>
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
                    { id: "Sports", label: lang==="TH"?"กีฬา/ออกกำลังกาย":"Sports", color: "orange" },
                    { id: "Family", label: lang==="TH"?"ครอบครัว":"Family", color: "pink" },
                    { id: "Finance", label: t.finance, color: "green" },
                    { id: "Business", label: lang==="TH"?"ธุรกิจ/แม่ค้า":"Business", color: "green" },
                    { id: "Education", label: lang==="TH"?"การศึกษา":"Education", color: "blue" },
                    { id: "Agriculture", label: lang==="TH"?"เกษตร":"Agriculture", color: "green" },
                    { id: "Environment", label: lang==="TH"?"สิ่งแวดล้อม":"Environment", color: "emerald" },
                    { id: "Construction", label: lang==="TH"?"ก่อสร้าง":"Construction", color: "amber" },
                    { id: "Technology", label: lang==="TH"?"เทคโนโลยี":"Technology", color: "orange" },
                    { id: "Travel", label: lang==="TH"?"ท่องเที่ยว":"Travel", color: "cyan" },
                    { id: "Science", label: lang==="TH"?"คณิตศาสตร์/วิทย์":"Science", color: "indigo" },
                    { id: "Fortune", label: lang==="TH"?"ดูดวง/พยากรณ์":"Fortune", color: "indigo" },
                    { id: "Gold", label: lang==="TH"?"ราคาทองคำ":"Gold", color: "yellow" },
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
                          purple: "hover:border-purple-500 hover:shadow-[4px_4px_0px_0px_#a855f7]",
                          amber: "hover:border-amber-500 hover:shadow-[4px_4px_0px_0px_#f59e0b]",
                          orange: "hover:border-orange-500 hover:shadow-[4px_4px_0px_0px_#f97316]",
                          cyan: "hover:border-cyan-500 hover:shadow-[4px_4px_0px_0px_#06b6d4]",
                          indigo: "hover:border-indigo-500 hover:shadow-[4px_4px_0px_0px_#6366f1]",
                          yellow: "hover:border-yellow-500 hover:shadow-[4px_4px_0px_0px_#eab308]",
                          emerald: "hover:border-emerald-500 hover:shadow-[4px_4px_0px_0px_#10b981]"
                        };

                        const textHoverClasses = {
                          pink: "group-hover:text-pink-500",
                          green: "group-hover:text-green-500",
                          blue: "group-hover:text-blue-500",
                          purple: "group-hover:text-purple-500",
                          amber: "group-hover:text-amber-500",
                          orange: "group-hover:text-orange-500",
                          cyan: "group-hover:text-cyan-500",
                          indigo: "group-hover:text-indigo-500",
                          yellow: "group-hover:text-yellow-500",
                          emerald: "group-hover:text-emerald-500"
                        };

                        const bgGlowClasses = {
                          pink: "bg-pink-500/5 group-hover:bg-pink-500/20",
                          green: "bg-green-500/5 group-hover:bg-green-500/20",
                          blue: "bg-blue-500/5 group-hover:bg-blue-500/20",
                          purple: "bg-purple-500/5 group-hover:bg-purple-500/20",
                          amber: "bg-amber-500/5 group-hover:bg-amber-500/20",
                          orange: "bg-orange-500/5 group-hover:bg-orange-500/20",
                          cyan: "bg-cyan-500/5 group-hover:bg-cyan-500/20",
                          indigo: "bg-indigo-500/5 group-hover:bg-indigo-500/20",
                          yellow: "bg-yellow-500/5 group-hover:bg-yellow-500/20",
                          emerald: "bg-emerald-500/5 group-hover:bg-emerald-500/20"
                        };
                        
                        return (
                        <Link href={`/${calc.slug || calc.id}`}
                          key={calc.id} legacyBehavior><motion.div layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          
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
                        </motion.div></Link>
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

                {activeCategory === "Finance" && <FinanceSEO lang={lang} />}
                {activeCategory === "Health" && <HealthSEO lang={lang} />}
                {activeCategory === "Family" && <FamilySEO lang={lang} />}
                {activeCategory === "Business" && <BusinessSEO lang={lang} />}
                {activeCategory === "Agriculture" && <AgricultureSEO lang={lang} />}
                {activeCategory === "Construction" && <ConstructionSEO lang={lang} />}
                {activeCategory === "Technology" && <TechnologySEO lang={lang} />}
                {activeCategory === "Travel" && <TravelSEO lang={lang} />}
                {activeCategory === "Environment" && <EnvironmentSEO lang={lang} />}
                {activeCategory === "Science" && <ScienceSEO lang={lang} />}
                {activeCategory === "Utility" && <UtilitySEO lang={lang} />}
                {activeCategory === "General" && <GeneralSEO lang={lang} />}

                {/* Popular Dedicated Calculators (For SEO Internal Linking) */}
                <div className="mt-12 text-center text-sm">
                  <h3 className="font-bold text-gray-500 mb-4">{lang === "TH" ? "เครื่องมือยอดนิยม:" : "Popular Tools:"}</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a href="/area-converter" className="text-gray-400 hover:text-deep-teal transition-colors">วิธีแปลงไร่เป็นตารางเมตร</a>
                    <a href="/used-car-loan" className="text-gray-400 hover:text-deep-teal transition-colors">คำนวณค่างวดรถมือสอง</a>
                    <a href="/cylinder-volume" className="text-gray-400 hover:text-deep-teal transition-colors">สูตรหาปริมาตรทรงกระบอก</a>
                    <a href="/mortgage-2026" className="text-gray-400 hover:text-deep-teal transition-colors">คำนวณผ่อนบ้าน 2569</a>
                    <a href="/electricity-2026" className="text-gray-400 hover:text-deep-teal transition-colors">คำนวณค่าไฟ 2569</a>
                  </div>
                </div>

                {/* Footer SEO Content & Disclaimer */}
                <div className="mt-16 pt-10 border-t border-gray-200 dark:border-white/10 text-center max-w-3xl mx-auto">
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
                <Link href="/"
                  className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-deep-teal dark:hover:text-soft-mint transition-colors mb-6 font-bold"
                >
                  <ArrowLeft className="w-5 h-5" /> {t.back}
                </Link>

                <div className={`glass-card p-8 md:p-12 rounded-3xl border-2 transition-colors shadow-neo dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] bg-white/80 dark:bg-black/50 backdrop-blur-xl ${colorClasses[activeColor as keyof typeof colorClasses]}`}>
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

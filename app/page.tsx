"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calculator, Heart, Home, BookOpen, Coins, Zap, Car, ArrowLeft, Star, Mail, Moon, Sun, Baby, Utensils, Briefcase, Hash, Lightbulb, Receipt, Plane, Sparkles } from "lucide-react";
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

type Category = "All" | "Health" | "Family" | "Finance" | "Business" | "Agriculture" | "Construction" | "Technology" | "Travel" | "Utility" | "General";

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
    { id: "exercise-calories", name: lang==="TH"?"แคลอรี่ออกกำลังกาย":"Exercise Calories", desc: lang==="TH"?"เผาผลาญจากการออกกำลัง":"Calories Burned", category: "Health", icon: Zap },
    { id: "protein-daily", name: lang==="TH"?"โปรตีนที่ควรได้รับ":"Daily Protein", desc: lang==="TH"?"ตามเป้าหมาย/น้ำหนัก":"Protein Needs", category: "Health", icon: Utensils },
    { id: "body-fat", name: lang==="TH"?"เปอร์เซ็นต์ไขมัน":"Body Fat %", desc: lang==="TH"?"US Navy Method":"Body Fat %", category: "Health", icon: Heart },
    { id: "whr", name: lang==="TH"?"เอวต่อสะโพก":"WHR", desc: lang==="TH"?"ประเมินความเสี่ยงโรค":"Waist-Hip Ratio", category: "Health", icon: Heart },
    { id: "heart-rate-zone", name: lang==="TH"?"โซนหัวใจ":"Heart Rate Zones", desc: lang==="TH"?"อัตราการเต้นเป้าหมาย":"Target HR Zones", category: "Health", icon: Heart },
    { id: "macro", name: lang==="TH"?"สัดส่วนสารอาหาร":"Macro Split", desc: lang==="TH"?"คาร์บ/โปรตีน/ไขมัน":"Carb/Protein/Fat", category: "Health", icon: Utensils },
    { id: "blood-sugar", name: lang==="TH"?"ค่าน้ำตาลในเลือด":"Blood Sugar", desc: lang==="TH"?"แปลงหน่วย mg ↔ mmol":"mg/dL ↔ mmol/L", category: "Health", icon: Heart },
    { id: "ibw", name: lang==="TH"?"น้ำหนักอุดมคติ":"Ideal Body Weight", desc: lang==="TH"?"IBW (Devine, etc.)":"IBW Formulas", category: "Health", icon: Heart },
    { id: "steps-converter", name: lang==="TH"?"แปลงก้าวเดิน":"Steps Converter", desc: lang==="TH"?"ก้าว ↔ ระยะทาง ↔ แคล":"Steps to Distance", category: "Health", icon: Heart },
    { id: "1rm", name: lang==="TH"?"คำนวณ 1RM":"1RM Calculator", desc: lang==="TH"?"น้ำหนักยกสูงสุด":"One Rep Max", category: "Health", icon: Zap },
    { id: "pace", name: lang==="TH"?"Pace วิ่ง":"Pace Calculator", desc: lang==="TH"?"คำนวณความเร็ววิ่ง":"Running Pace", category: "Health", icon: Zap },

    // Family (Pink)
    { id: "child-height", name: lang==="TH"?"ส่วนสูงลูก":"Child Height", desc: lang==="TH"?"ทำนายส่วนสูง":"Height Predictor", category: "Family", icon: Baby },
    { id: "pregnancy-due", name: lang==="TH"?"กำหนดคลอด":"Due Date", desc: lang==="TH"?"ทำนายกำหนดคลอด":"Pregnancy Due Date", category: "Family", icon: Baby },
    { id: "ovulation", name: lang==="TH"?"วันตกไข่":"Ovulation", desc: lang==="TH"?"คำนวณวันไข่ตก":"Fertility Window", category: "Family", icon: Heart },
    { id: "blood-type", name: lang==="TH"?"ทำนายกรุ๊ปเลือด":"Blood Type", desc: lang==="TH"?"กรุ๊ปเลือดลูก":"Child Blood Predictor", category: "Family", icon: Heart },
    { id: "zodiac", name: lang==="TH"?"ราศีเกิด":"Zodiac", desc: lang==="TH"?"คำนวณราศี":"Star Sign", category: "Family", icon: BookOpen },
    { id: "horoscope", name: lang==="TH"?"ดูดวงและโชคชะตา":"Horoscope", desc: lang==="TH"?"ทำนายพื้นดวง":"Fortune Teller", category: "Family", icon: BookOpen },
    { id: "tarot", name: lang==="TH"?"ดูดวงไพ่ยิปซี":"Tarot Reading", desc: lang==="TH"?"อดีต ปัจจุบัน อนาคต":"3-Card Spread", category: "Family", icon: Sparkles },
    { id: "pet-age", name: lang==="TH"?"อายุสัตว์เลี้ยง":"Pet Age", desc: lang==="TH"?"เทียบอายุคน":"Human Years", category: "Family", icon: BookOpen },
    { id: "fetal-weight", name: lang==="TH"?"น้ำหนักทารกในครรภ์":"Fetal Weight", desc: lang==="TH"?"ตามอายุครรภ์ (สัปดาห์)":"WHO Fetal Dev", category: "Family", icon: Baby },
    { id: "child-cost", name: lang==="TH"?"ค่าเลี้ยงลูก":"Child Raising Cost", desc: lang==="TH"?"ประมาณการต่อปี":"Yearly Cost", category: "Family", icon: Coins },
    { id: "child-milestone", name: lang==="TH"?"พัฒนาการเด็ก":"Child Milestones", desc: lang==="TH"?"ตามช่วงอายุเดือน":"Development Check", category: "Family", icon: Baby },

    // Travel (Cyan)
    { id: "time-zone", name: lang==="TH"?"แปลงเวลาโลก":"Time Zone", desc: lang==="TH"?"เทียบเวลาประเทศต่างๆ":"Global Time", category: "Travel", icon: BookOpen },
    { id: "travel-budget", name: lang==="TH"?"งบท่องเที่ยว":"Travel Budget", desc: lang==="TH"?"คำนวณค่าใช้จ่ายทริป":"Trip Expenses", category: "Travel", icon: Coins },
    { id: "flight-time", name: lang==="TH"?"เวลาบิน":"Flight Time", desc: lang==="TH"?"เวลาเดินทางเครื่องบิน":"Plane Travel Time", category: "Travel", icon: Plane },
    { id: "packing-list", name: lang==="TH"?"จัดกระเป๋าเดินทาง":"Packing List", desc: lang==="TH"?"เช็กลิสต์จัดกระเป๋า":"Luggage Checklist", category: "Travel", icon: BookOpen },
    { id: "road-trip", name: lang==="TH"?"ค่าน้ำมัน Road Trip":"Road Trip", desc: lang==="TH"?"ค่าแก๊ส/ทางด่วน":"Fuel & Tolls", category: "Travel", icon: Car },
    { id: "baggage-weight", name: lang==="TH"?"เช็คน้ำหนักกระเป๋า":"Baggage Weight", desc: lang==="TH"?"เทียบลิมิตสายการบิน":"Baggage Fee Checker", category: "Travel", icon: Plane },

    // Finance (Green/Gold)
    { id: "discount", name: lang==="TH"?"ส่วนลด":"Discount", desc: lang==="TH"?"เปอร์เซ็นต์ส่วนลด":"Discount Percentage", category: "Finance", icon: Coins },
    { id: "car-loan", name: lang==="TH"?"ผ่อนรถยนต์":"Car Loan", desc: lang==="TH"?"ค่างวดรถ":"Auto Loan Calculator", category: "Finance", icon: Car },
    { id: "mortgage", name: lang==="TH"?"เงินกู้/บ้าน":"Mortgage", desc: lang==="TH"?"ยอดผ่อนรายเดือน":"Loan Calculator", category: "Finance", icon: Coins },
    { id: "compound-interest", name: lang==="TH"?"ดอกเบี้ยทบต้น":"Compound Interest", desc: lang==="TH"?"ผลตอบแทนลงทุน":"Investment Growth", category: "Finance", icon: Coins },
    { id: "bill-splitter", name: lang==="TH"?"หารค่าอาหาร":"Bill Splitter", desc: lang==="TH"?"แยกจ่าย + SC/VAT":"Split Bill + SC/VAT", category: "Finance", icon: Receipt },
    { id: "currency-converter", name: lang==="TH"?"แปลงสกุลเงิน":"Currency Converter", desc: lang==="TH"?"เรทเงินสดล่าสุด":"Live Exchange Rates", category: "Finance", icon: Coins },
    { id: "savings-goal", name: lang==="TH"?"เป้าหมายการออม":"Savings Goal", desc: lang==="TH"?"ต้องเก็บเดือนละเท่าไหร่":"Monthly Savings", category: "Finance", icon: Coins },
    { id: "inflation", name: lang==="TH"?"เงินเฟ้อ":"Inflation", desc: lang==="TH"?"มูลค่าเงินในอนาคต":"Future Money Value", category: "Finance", icon: Coins },
    { id: "salary-hourly", name: lang==="TH"?"เงินเดือน ↔ รายชั่วโมง":"Salary to Hourly", desc: lang==="TH"?"ค่าแรงรายชั่วโมง":"Hourly Rate", category: "Finance", icon: Calculator },
    { id: "net-worth", name: lang==="TH"?"ความมั่งคั่งสุทธิ":"Net Worth", desc: lang==="TH"?"ทรัพย์สินหักหนี้สิน":"Assets - Liabilities", category: "Finance", icon: Coins },
    { id: "debt-payoff", name: lang==="TH"?"วางแผนปลดหนี้":"Debt Payoff", desc: lang==="TH"?"จ่ายโปะแบบไหนดี":"Snowball/Avalanche", category: "Finance", icon: Coins },
    { id: "retirement", name: lang==="TH"?"เกษียณอายุ":"Retirement", desc: lang==="TH"?"ต้องมีเงินเท่าไหร่":"Needed for Retirement", category: "Finance", icon: Coins },
    { id: "stock-profit", name: lang==="TH"?"กำไรหุ้น/คริปโต":"Stock Profit", desc: lang==="TH"?"จุดคุ้มทุน/กำไรสุทธิ":"Trading Profit", category: "Finance", icon: Coins },
    { id: "roi", name: lang==="TH"?"ผลตอบแทน ROI":"ROI", desc: lang==="TH"?"ความคุ้มค่าการลงทุน":"Return on Investment", category: "Finance", icon: Calculator },
    { id: "dca", name: lang==="TH"?"DCA หุ้น/กองทุน":"DCA Calculator", desc: lang==="TH"?"ลงทุนรายเดือนสม่ำเสมอ":"Dollar Cost Average", category: "Finance", icon: Coins },
    { id: "stock-fee", name: lang==="TH"?"ค่าธรรมเนียมหุ้น":"Stock Trading Fee", desc: lang==="TH"?"คอมมิชชั่น + VAT":"Commission Fee", category: "Finance", icon: Receipt },
    { id: "net-salary", name: lang==="TH"?"เงินเดือนสุทธิ":"Net Salary", desc: lang==="TH"?"หักประกันสังคม/ภาษี":"Take-home Pay", category: "Finance", icon: Coins },
    { id: "expense-tracker", name: lang==="TH"?"จัดสรรเงิน 50/30/20":"Budget 50/30/20", desc: lang==="TH"?"แบ่งเงินออมและใช้จ่าย":"Rule Budgeting", category: "Finance", icon: Coins },

    // Business (Green/Gold)
    { id: "vat", name: lang==="TH"?"คำนวณ VAT":"VAT Calculator", desc: lang==="TH"?"ถอด/เพิ่ม VAT":"Value Added Tax", category: "Business", icon: Receipt },
    { id: "margin", name: lang==="TH"?"คำนวณราคาขาย":"Margin", desc: lang==="TH"?"ตั้งราคาจากต้นทุน":"Profit Margin", category: "Business", icon: Calculator },
    { id: "break-even", name: lang==="TH"?"จุดคุ้มทุน":"Break-even", desc: lang==="TH"?"ต้องขายกี่ชิ้น":"Units to Break-even", category: "Business", icon: Calculator },
    { id: "markup", name: lang==="TH"?"ตั้งราคาจากต้นทุน":"Markup Pricing", desc: lang==="TH"?"ราคาขายแนะนำ":"Suggested Price", category: "Business", icon: Calculator },
    { id: "depreciation", name: lang==="TH"?"ค่าเสื่อมราคา":"Depreciation", desc: lang==="TH"?"ตัดจ่ายรายปี":"Straight-line", category: "Business", icon: Calculator },
    { id: "payroll", name: lang==="TH"?"คำนวณเงินเดือนพนักงาน":"Payroll", desc: lang==="TH"?"หักประกันสังคม/ภาษี":"Net Salary", category: "Business", icon: Calculator },
    { id: "cogs", name: lang==="TH"?"ต้นทุนขาย (COGS)":"COGS", desc: lang==="TH"?"ต้นทุนสินค้าที่ขาย":"Cost of Goods Sold", category: "Business", icon: Calculator },
    { id: "ltv", name: lang==="TH"?"มูลค่าลูกค้าตลอดชีพ":"Customer LTV", desc: lang==="TH"?"Customer Lifetime Value":"Customer Lifetime Value", category: "Business", icon: Calculator },
    { id: "cac", name: lang==="TH"?"ต้นทุนได้ลูกค้าใหม่":"CAC", desc: lang==="TH"?"Customer Acquisition":"Acquisition Cost", category: "Business", icon: Coins },
    { id: "conversion-rate", name: lang==="TH"?"อัตราการเปลี่ยนเป็นยอดขาย":"Conversion Rate", desc: lang==="TH"?"% คนซื้อ":"Sales Conversion", category: "Business", icon: Calculator },
    { id: "inventory-turnover", name: lang==="TH"?"รอบหมุนเวียนสินค้า":"Inventory Turnover", desc: lang==="TH"?"ขายของออกเร็วแค่ไหน":"Turnover Ratio", category: "Business", icon: Calculator },
    { id: "financial-ratio", name: lang==="TH"?"อัตราส่วนการเงิน":"Financial Ratios", desc: lang==="TH"?"วิเคราะห์สภาพธุรกิจ":"Business Health", category: "Business", icon: Calculator },
    { id: "marketplace-fee", name: lang==="TH"?"ค่าธรรมเนียมขายของ":"Marketplace Fee", desc: lang==="TH"?"Shopee/Lazada/TikTok":"Platform Fees", category: "Business", icon: Receipt },
    { id: "safety-stock", name: lang==="TH"?"จุดสั่งซื้อ/สต็อกสำรอง":"Safety Stock", desc: lang==="TH"?"Reorder Point":"Inventory Control", category: "Business", icon: Calculator },
    { id: "shipping-cost", name: lang==="TH"?"เปรียบเทียบค่าส่ง":"Shipping Cost", desc: lang==="TH"?"Kerry, J&T, Flash, ปณ.":"Courier Rates", category: "Business", icon: Car },
    { id: "return-rate", name: lang==="TH"?"ผลกระทบตีกลับ":"Return Rate Impact", desc: lang==="TH"?"กำไรที่หายจากของตีกลับ":"Lost Profit Return", category: "Business", icon: Receipt },

    // Utility & Education (Blue)
    { id: "gpa", name: lang==="TH"?"จำลองเกรดเบื้องต้น":"GPA Simulator", desc: lang==="TH"?"จำลองเกรด (GPA)":"GPA Estimator", category: "Utility", icon: BookOpen },
    { id: "basen", name: lang==="TH"?"แปลงเลขฐาน":"Base Converter", desc: lang==="TH"?"ฐาน 2–36 ครบทุกฐาน":"Base 2–36, Step-by-Step", category: "Utility", icon: Calculator },
    { id: "btu", name: lang==="TH"?"คำนวณ BTU":"AC BTU", desc: lang==="TH"?"ขนาดแอร์บ้าน":"Air Conditioner BTU", category: "Utility", icon: Home },
    { id: "electric", name: lang==="TH"?"ค่าไฟ":"Electricity", desc: lang==="TH"?"คำนวณค่าไฟฟ้า":"Electricity Bill", category: "Utility", icon: Zap },
    { id: "lottery", name: lang==="TH"?"ตรวจผลสลาก":"Lottery Checker", desc: lang==="TH"?"ตรวจหวยล่าสุด":"Thai Lottery", category: "Utility", icon: Hash },
    { id: "water-bill", name: lang==="TH"?"ค่าน้ำ":"Water Bill", desc: lang==="TH"?"ค่าน้ำประปา":"Water Usage Bill", category: "Utility", icon: Home },
    { id: "fuel-cost", name: lang==="TH"?"ค่าน้ำมันรถ":"Fuel Cost", desc: lang==="TH"?"คำนวณค่าน้ำมันเดินทาง":"Trip Fuel Estimate", category: "Utility", icon: Car },
    { id: "cooking-unit", name: lang==="TH"?"แปลงหน่วยทำอาหาร":"Cooking Units", desc: lang==="TH"?"ถ้วยตวง ↔ กรัม":"Cups to Grams", category: "Utility", icon: Utensils },
    { id: "tile-area", name: lang==="TH"?"กระเบื้องปูพื้น":"Tile Area", desc: lang==="TH"?"คำนวณเผื่อกันพลาด":"Floor Tile Estimate", category: "Utility", icon: Home },
    { id: "grade-converter", name: lang==="TH"?"แปลงเกรดต่างประเทศ":"Grade Converter", desc: lang==="TH"?"TH ↔ US ↔ UK":"Intl Grade", category: "Utility", icon: BookOpen },
    { id: "target-gpa", name: lang==="TH"?"เป้าหมาย GPA":"Target GPA", desc: lang==="TH"?"เกรดที่ต้องทำเพิ่ม":"Required GPA", category: "Utility", icon: BookOpen },
    { id: "percentile", name: lang==="TH"?"Percentile/Z-Score":"Percentile Calculator", desc: lang==="TH"?"เทียบค่าเฉลี่ย":"Normal Distribution", category: "Utility", icon: Hash },
    { id: "reading-time", name: lang==="TH"?"เวลาอ่านหนังสือ":"Reading Time", desc: lang==="TH"?"คำนวณวันจบเล่ม":"Books Finishing Time", category: "Utility", icon: BookOpen },

    // Agriculture (Green)
    { id: "ferm-time", name: lang==="TH"?"เวลาหมักดอง":"Fermentation Time", desc: lang==="TH"?"อุณหภูมิ x เวลา":"Temp x Time", category: "Agriculture", icon: Zap },
    { id: "food-energy", name: lang==="TH"?"พลังงานอาหาร":"Food Energy", desc: lang==="TH"?"Joule ↔ kcal":"Joule ↔ kcal", category: "Agriculture", icon: Zap },
    { id: "fertilizer", name: lang==="TH"?"ปุ๋ยต่อไร่":"Fertilizer", desc: lang==="TH"?"NPK ตามชนิดพืช":"Fertilizer per Rai", category: "Agriculture", icon: Home },
    { id: "irrigation", name: lang==="TH"?"น้ำชลประทาน":"Irrigation", desc: lang==="TH"?"ปริมาณน้ำต่อไร่":"Water per Rai", category: "Agriculture", icon: Home },
    { id: "durian", name: lang==="TH"?"คำนวณทำสวนทุเรียน":"Durian Farming", desc: lang==="TH"?"วันตัด/การปลูก":"Harvest & Plant", category: "Agriculture", icon: Home },
    { id: "yield", name: lang==="TH"?"ผลผลิตต่อไร่":"Crop Yield", desc: lang==="TH"?"กำไรเกษตรกร":"Yield per Rai", category: "Agriculture", icon: Coins },

    // Construction (Amber)
    { id: "house-paint", name: lang==="TH"?"สีทาบ้าน":"House Paint", desc: lang==="TH"?"พื้นที่ผนัง → ลิตร":"Wall Area → Liters", category: "Construction", icon: Home },
    { id: "cement", name: lang==="TH"?"ปูนซีเมนต์":"Cement", desc: lang==="TH"?"ปริมาณปูนตามพื้นที่":"Cement Volume", category: "Construction", icon: Home },
    { id: "wallpaper", name: lang==="TH"?"วอลเปเปอร์":"Wallpaper", desc: lang==="TH"?"ม้วนที่ต้องการ":"Rolls Needed", category: "Construction", icon: Home },
    { id: "roof-area", name: lang==="TH"?"พื้นที่หลังคา":"Roof Area", desc: lang==="TH"?"ทรงต่างๆ":"Roof Shapes", category: "Construction", icon: Home },
    { id: "water-tank", name: lang==="TH"?"ถังน้ำ":"Water Tank", desc: lang==="TH"?"ขนาดถังที่เหมาะสม":"Tank Size", category: "Construction", icon: Home },
    { id: "pool-vol", name: lang==="TH"?"สระว่ายน้ำ":"Pool Volume", desc: lang==="TH"?"ปริมาตรน้ำ/คลอรีน":"Water Volume", category: "Construction", icon: Home },
    { id: "insulation", name: lang==="TH"?"ฉนวนกันความร้อน":"Insulation", desc: lang==="TH"?"R-value ที่ต้องการ":"R-Value Needed", category: "Construction", icon: Home },
    { id: "reno-cost", name: lang==="TH"?"ค่าใช้จ่ายรีโนเวท":"Renovation Cost", desc: lang==="TH"?"ประเมินงบก่อสร้าง":"Estimated Budget", category: "Construction", icon: Coins },

    // Technology (Orange)
    { id: "bandwidth", name: lang==="TH"?"คำนวณ Bandwidth":"Bandwidth", desc: lang==="TH"?"เวลาดาวน์โหลดไฟล์":"Download Time", category: "Technology", icon: Zap },
    { id: "server-cost", name: lang==="TH"?"คำนวณ Server Cost":"Server Cost", desc: lang==="TH"?"EC2/VM ต่อเดือน":"Monthly Cost", category: "Technology", icon: Calculator },
    { id: "image-size", name: lang==="TH"?"ขนาดรูปภาพ":"Image Size", desc: lang==="TH"?"Resolution x bit depth":"Resolution Size", category: "Technology", icon: Hash },
    { id: "ip-subnet", name: lang==="TH"?"คำนวณ IP Subnet":"IP Subnet", desc: lang==="TH"?"CIDR/subnet mask":"CIDR Network", category: "Technology", icon: Hash },
    { id: "video-bitrate", name: lang==="TH"?"FPS/Bitrate วิดีโอ":"Video Bitrate", desc: lang==="TH"?"คุณภาพ VS ขนาดไฟล์":"Video Size", category: "Technology", icon: Hash },
    { id: "battery-life", name: lang==="TH"?"คำนวณ Battery Life":"Battery Life", desc: lang==="TH"?"mAh ÷ การใช้งาน":"mAh Usage", category: "Technology", icon: Zap },
    { id: "hash-rate", name: lang==="TH"?"คำนวณ Hash Rate":"Hash Rate", desc: lang==="TH"?"เหมืองคริปโต":"Crypto Mining", category: "Technology", icon: Coins },

    // General (Purple)
    { id: "digital-unit", name: lang==="TH"?"แปลงหน่วยดิจิทัล":"Digital Unit", desc: lang==="TH"?"MB ↔ GB ↔ TB":"MB ↔ GB ↔ TB", category: "General", icon: Hash },
    { id: "angle", name: lang==="TH"?"คำนวณมุมและองศา":"Angle Converter", desc: lang==="TH"?"° ↔ radian":"° ↔ radian", category: "General", icon: Hash },
    { id: "color", name: lang==="TH"?"แปลงสีเฮกซ์/RGB":"Color Converter", desc: lang==="TH"?"HEX ↔ RGB ↔ HSL":"HEX ↔ RGB ↔ HSL", category: "General", icon: Hash },
    { id: "temperature", name: lang==="TH"?"แปลงหน่วยอุณหภูมิ":"Temperature", desc: lang==="TH"?"°C ↔ °F ↔ K":"°C ↔ °F ↔ K", category: "General", icon: Hash },
    { id: "speed", name: lang==="TH"?"แปลงหน่วยความเร็ว":"Speed Converter", desc: lang==="TH"?"km/h ↔ mph ↔ knot":"km/h ↔ mph", category: "General", icon: Hash },
    { id: "area-unit", name: lang==="TH"?"แปลงหน่วยพื้นที่":"Area Converter", desc: lang==="TH"?"ตร.ม. ↔ ไร่ ↔ acre":"sqm ↔ rai ↔ acre", category: "General", icon: Home },
    { id: "weight-unit", name: lang==="TH"?"แปลงหน่วยน้ำหนัก":"Weight Converter", desc: lang==="TH"?"กก. ↔ ปอนด์ ↔ ออนซ์":"kg ↔ lb ↔ oz", category: "General", icon: Hash },
    { id: "roman", name: lang==="TH"?"ตัวแปลงเลขโรมัน":"Roman Numeral", desc: lang==="TH"?"Roman ↔ อารบิก":"Roman ↔ Arabic", category: "General", icon: BookOpen },
    { id: "area-shape", name: lang==="TH"?"คำนวณพื้นที่รูปทรง":"Shape Area", desc: lang==="TH"?"วงกลม สามเหลี่ยม":"Circle, Triangle", category: "General", icon: Hash },
    { id: "volume-shape", name: lang==="TH"?"คำนวณปริมาตรภาชนะ":"Shape Volume", desc: lang==="TH"?"กล่อง กระบอก ทรงกลม":"Box, Cylinder", category: "General", icon: Hash },
    { id: "working-days", name: lang==="TH"?"คำนวณวันทำงาน":"Working Days", desc: lang==="TH"?"หักวันหยุดนักขัตฤกษ์":"Minus Holidays", category: "General", icon: Calculator },
    { id: "randomizer", name: lang==="TH"?"สุ่มเลข/สุ่มชื่อ":"Randomizer", desc: lang==="TH"?"จับฉลาก":"Number/Name Picker", category: "General", icon: Hash },
    { id: "word-counter", name: lang==="TH"?"นับจำนวนคำ":"Word Counter", desc: lang==="TH"?"นับคำ/ตัวอักษร":"Words & Chars", category: "General", icon: BookOpen },
    { id: "age", name: lang==="TH"?"คำนวณอายุ":"Age Calculator", desc: lang==="TH"?"อายุละเอียด":"Exact Age", category: "General", icon: Calculator },
    { id: "pantone", name: lang==="TH"?"แปลงสี Pantone":"Pantone Converter", desc: lang==="TH"?"HEX เป็น Pantone (Approx)":"Approx Pantone", category: "General", icon: Hash },
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
      case "Business":
      case "Agriculture": return "green";
      case "Construction": return "amber";
      case "Technology": return "orange";
      case "Travel": return "cyan";
      case "General": return "purple";
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
    cyan: "text-cyan-500 border-cyan-500 hover:border-cyan-500 focus:ring-cyan-500 group-hover:text-cyan-500 shadow-[4px_4px_0px_0px_rgba(6,182,212,1)]"
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
                    { id: "Agriculture", label: lang==="TH"?"เกษตร":"Agriculture", color: "green" },
                    { id: "Construction", label: lang==="TH"?"ก่อสร้าง":"Construction", color: "amber" },
                    { id: "Technology", label: lang==="TH"?"เทคโนโลยี":"Technology", color: "orange" },
                    { id: "Travel", label: lang==="TH"?"ท่องเที่ยว":"Travel", color: "cyan" },
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
                          cyan: "hover:border-cyan-500 hover:shadow-[4px_4px_0px_0px_#06b6d4]"
                        };

                        const textHoverClasses = {
                          pink: "group-hover:text-pink-500",
                          green: "group-hover:text-green-500",
                          blue: "group-hover:text-blue-500",
                          purple: "group-hover:text-purple-500",
                          amber: "group-hover:text-amber-500",
                          orange: "group-hover:text-orange-500",
                          cyan: "group-hover:text-cyan-500"
                        };

                        const bgGlowClasses = {
                          pink: "bg-pink-500/5 group-hover:bg-pink-500/20",
                          green: "bg-green-500/5 group-hover:bg-green-500/20",
                          blue: "bg-blue-500/5 group-hover:bg-blue-500/20",
                          purple: "bg-purple-500/5 group-hover:bg-purple-500/20",
                          amber: "bg-amber-500/5 group-hover:bg-amber-500/20",
                          orange: "bg-orange-500/5 group-hover:bg-orange-500/20",
                          cyan: "bg-cyan-500/5 group-hover:bg-cyan-500/20"
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

                {activeCategory === "Finance" && <FinanceSEO lang={lang} />}
                {activeCategory === "Health" && <HealthSEO lang={lang} />}
                {activeCategory === "Family" && <FamilySEO lang={lang} />}
                {activeCategory === "Business" && <BusinessSEO lang={lang} />}
                {activeCategory === "Agriculture" && <AgricultureSEO lang={lang} />}
                {activeCategory === "Construction" && <ConstructionSEO lang={lang} />}
                {activeCategory === "Technology" && <TechnologySEO lang={lang} />}
                {activeCategory === "Travel" && <TravelSEO lang={lang} />}
                {activeCategory === "Utility" && <UtilitySEO lang={lang} />}
                {activeCategory === "General" && <GeneralSEO lang={lang} />}

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

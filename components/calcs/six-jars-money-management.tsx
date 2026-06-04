"use client";

import React, { useState } from 'react';
import { PieChart, Home, Coins, Plane, BookOpen, Crown, Heart, DollarSign } from 'lucide-react';

export default function SixJarsCalculator({ lang = 'th' }: { lang?: string }) {
  const [income, setIncome] = useState<number | string>(30000);

  const jars = [
    { 
      id: 'necessities',
      percent: 55, 
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      icon: <Home className="w-6 h-6 text-blue-500" />,
      th: 'ค่าใช้จ่ายจำเป็น (Necessities)',
      en: 'Necessities (NEC)',
      descTh: 'ค่าอาหาร, ค่าเช่าบ้าน, ผ่อนรถ, ค่าน้ำ, ค่าไฟ, ของใช้ประจำวัน',
      descEn: 'Food, rent, utilities, transportation, basic needs'
    },
    { 
      id: 'financial-freedom',
      percent: 10, 
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      icon: <Crown className="w-6 h-6 text-amber-500" />,
      th: 'อิสรภาพทางการเงิน (Financial Freedom)',
      en: 'Financial Freedom (FFA)',
      descTh: 'เงินลงทุน, ซื้อหุ้น, กองทุนรวม, ทองคำ (ห้ามนำออกมาใช้เด็ดขาด)',
      descEn: 'Investments, stocks, mutual funds, passive income sources'
    },
    { 
      id: 'long-term',
      percent: 10, 
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-700',
      icon: <Coins className="w-6 h-6 text-green-500" />,
      th: 'เงินออมระยะยาว (Long-term Savings)',
      en: 'Long-term Savings (LTSS)',
      descTh: 'เงินสำรองฉุกเฉิน, ออมเงินซื้อบ้าน, ซื้อรถ, แต่งงาน',
      descEn: 'Emergency fund, saving for a house, car, big purchases'
    },
    { 
      id: 'play',
      percent: 10, 
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      icon: <Plane className="w-6 h-6 text-purple-500" />,
      th: 'ความสุขส่วนตัว (Play)',
      en: 'Play / Leisure (PLAY)',
      descTh: 'ท่องเที่ยว, ดูหนัง, กินหรู, ช้อปปิ้ง, นวดสปา (ต้องใช้ให้หมดทุกเดือน)',
      descEn: 'Travel, dining out, shopping, pampering yourself'
    },
    { 
      id: 'education',
      percent: 10, 
      color: 'bg-indigo-500',
      lightColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      icon: <BookOpen className="w-6 h-6 text-indigo-500" />,
      th: 'การศึกษาพัฒนาตัวเอง (Education)',
      en: 'Education (EDU)',
      descTh: 'ซื้อหนังสือ, คอร์สเรียน, สัมมนา, พัฒนาทักษะใหม่ๆ',
      descEn: 'Books, courses, seminars, personal development'
    },
    { 
      id: 'give',
      percent: 5, 
      color: 'bg-pink-500',
      lightColor: 'bg-pink-50',
      textColor: 'text-pink-700',
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      th: 'แบ่งปันคืนสู่สังคม (Give)',
      en: 'Give / Charity (GIVE)',
      descTh: 'บริจาค, ทำบุญ, ซื้อของขวัญให้ครอบครัว, เลี้ยงข้าวเพื่อน',
      descEn: 'Charity, donations, gifts for family and friends'
    }
  ];

  const totalIncome = Number(income) || 0;

  const isTh = lang === 'th';

  const texts = {
    title: isTh ? "สัดส่วนการจัดการเงินสูตร 6 Jars (หกไห)" : "Six Jars Money Management Calculator",
    subtitle: isTh ? "แบ่งเงินรายได้ออกเป็น 6 ส่วน ตามทฤษฎีของ T. Harv Eker" : "Allocate your income based on the 6 Jars system by T. Harv Eker",
    incomeLabel: isTh ? "รายรับรวมต่อเดือน (บาท)" : "Total Monthly Income",
    summaryTitle: isTh ? "การแบ่งเงินเข้าไหทั้ง 6 ใบของคุณ" : "Your 6 Jars Allocation",
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-8 border-b pb-4">
        <div className="p-3 bg-teal-100 rounded-full text-teal-600">
          <PieChart className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{texts.title}</h2>
          <p className="text-gray-500 text-sm mt-1">{texts.subtitle}</p>
        </div>
      </div>

      <div className="mb-10 max-w-md mx-auto">
        <label className="block text-center text-sm font-medium text-gray-700 mb-3 flex items-center justify-center gap-2">
          <DollarSign className="w-5 h-5 text-teal-600" /> {texts.incomeLabel}
        </label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full p-4 text-center text-2xl font-bold text-gray-800 border-2 border-teal-200 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all shadow-sm"
          min="0"
          placeholder="e.g. 30000"
        />
      </div>

      <h3 className="text-xl font-bold text-center text-gray-800 mb-6">{texts.summaryTitle}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {jars.map((jar) => {
          const amount = (totalIncome * jar.percent) / 100;
          return (
            <div key={jar.id} className={`${jar.lightColor} rounded-2xl p-5 border border-white/50 shadow-sm relative overflow-hidden transition-transform hover:-translate-y-1`}>
              <div className="absolute top-0 right-0 p-3 opacity-20">
                {jar.icon}
              </div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {jar.icon}
                </div>
                <span className={`font-bold text-lg ${jar.textColor}`}>{jar.percent}%</span>
              </div>
              
              <div className="relative z-10">
                <h4 className="font-bold text-gray-800 mb-1 leading-tight">{isTh ? jar.th : jar.en}</h4>
                <p className="text-xs text-gray-600 mb-4 h-10 line-clamp-2">{isTh ? jar.descTh : jar.descEn}</p>
                
                <div className="bg-white/80 backdrop-blur rounded-xl p-3 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">{isTh ? 'จำนวนเงิน' : 'Amount'}</span>
                  <span className={`text-xl font-bold ${jar.textColor}`}>
                    {amount.toLocaleString('th-TH', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isTh && (
        <div className="mt-12 pt-8 border-t border-gray-200 prose prose-teal max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ระบบ 6 Jars Money Management (ทฤษฎี 6 ไห) คืออะไร?</h2>
          
          <p>
            <strong>6 Jars Money Management</strong> หรือ <em>ระบบบริหารเงิน 6 ไห</em> เป็นแนวคิดการจัดการเงินระดับโลกที่คิดค้นโดย <strong>T. Harv Eker</strong> ผู้เขียนหนังสือ Bestseller ชื่อดัง <em>"Secrets of the Millionaire Mind (ถอดรหัสลับสมองเงินล้าน)"</em>
          </p>

          <p>
            หลักการของระบบนี้มีความเรียบง่ายแต่ทรงพลัง โดยเน้นให้เรา <strong>"จัดการเงิน" (Money Management)</strong> อย่างเป็นระบบทันทีที่มีรายได้เข้ามา ไม่ว่ารายได้นั้นจะมากหรือน้อยก็ตาม โดยแบ่งเงินออกเป็น 6 ส่วน (เปรียบเสมือนใส่ในขวดโหลหรือไห 6 ใบ) ตามสัดส่วนที่ชัดเจน ดังนี้:
          </p>

          <h3 className="text-lg font-bold text-blue-700 mt-6 mb-2">1. ไหค่าใช้จ่ายจำเป็น (Necessities) - 55%</h3>
          <p>
            เงินส่วนนี้ใช้สำหรับการดำรงชีวิตประจำวัน ได้แก่ ค่าอาหาร, ค่าเช่าบ้าน/ผ่อนบ้าน, ผ่อนรถ, ค่าน้ำ, ค่าไฟ, ค่าโทรศัพท์, ค่าเดินทาง และหนี้สินบัตรเครดิต <em>(เคล็ดลับ: หากค่าใช้จ่ายส่วนนี้ของคุณเกิน 55% คุณควรพิจารณาลดรายจ่ายที่ไม่จำเป็นลง หรือหาทางเพิ่มรายได้)</em>
          </p>

          <h3 className="text-lg font-bold text-amber-700 mt-4 mb-2">2. ไหอิสรภาพทางการเงิน (Financial Freedom) - 10%</h3>
          <p>
            <strong>นี่คือไหที่สำคัญที่สุด หรือ "ห่านทองคำ" ของคุณ!</strong> เงินส่วนนี้มีไว้สำหรับ <em>การลงทุน</em> เท่านั้น เช่น ซื้อหุ้น, กองทุนรวม, ทองคำ, อสังหาริมทรัพย์ หรือทำธุรกิจ กฎเหล็กของไหนี้คือ <strong>"ห้ามนำเงินต้นออกมาใช้เด็ดขาด"</strong> คุณจะใช้ได้ก็ต่อเมื่อมันผลิตผลตอบแทน (Passive Income) ออกมาจนคุณมีอิสรภาพทางการเงินแล้วเท่านั้น
          </p>

          <h3 className="text-lg font-bold text-green-700 mt-4 mb-2">3. ไหเงินออมระยะยาว (Long-term Savings for Spending) - 10%</h3>
          <p>
            เงินออมเพื่อเป้าหมายใหญ่ๆ ในอนาคต เช่น เก็บเงินดาวน์บ้าน, ซื้อรถยนต์คันใหม่, เป็นทุนการศึกษาบุตร หรือใช้เป็น <strong>เงินสำรองฉุกเฉิน (Emergency Fund)</strong> ในกรณีตกงานหรือเจ็บป่วย
          </p>

          <h3 className="text-lg font-bold text-purple-700 mt-4 mb-2">4. ไหความสุขส่วนตัว (Play) - 10%</h3>
          <p>
            หลายคนเก็บเงินจนเครียด ทฤษฎีนี้จึงบังคับให้คุณ <strong>ต้องให้รางวัลตัวเอง</strong> เงินส่วนนี้มีไว้ปรนเปรอตัวเอง เช่น ไปนวดสปาหรูๆ, ทานอาหารมื้อแพงๆ, ท่องเที่ยว หรือซื้อของที่อยากได้ กฎของไหนี้คือ <em>"ต้องใช้ให้หมดทุกเดือน (หรือสะสมไม่เกิน 3 เดือนแล้วใช้ให้หมด)"</em> เพื่อให้จิตใต้สำนึกรู้สึกว่าความรวยเป็นเรื่องสนุกและมีความสุข
          </p>

          <h3 className="text-lg font-bold text-indigo-700 mt-4 mb-2">5. ไหการศึกษา (Education) - 10%</h3>
          <p>
            <em>"การลงทุนที่คุ้มค่าที่สุด คือการลงทุนในตัวเอง"</em> เงินส่วนนี้ใช้เพื่อพัฒนาทักษะ ซื้อหนังสือ, ลงคอร์สเรียนออนไลน์, เข้าฟิตเนส หรือสัมมนาต่างๆ เพื่อเพิ่มศักยภาพในการหาเงินของคุณในอนาคต
          </p>

          <h3 className="text-lg font-bold text-pink-700 mt-4 mb-2">6. ไหแบ่งปัน (Give) - 5%</h3>
          <p>
            เมื่อเราได้รับ เราก็ควรเป็นผู้ให้ เงินส่วนนี้ใช้สำหรับการบริจาค, ทำบุญ, ช่วยเหลือสังคม, ให้เงินพ่อแม่ หรือซื้อของขวัญวันเกิดให้เพื่อน การให้จะช่วยขยายขอบเขตจิตใจและทำให้คุณรู้สึกมั่งคั่งจากภายใน
          </p>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mt-8 rounded-r-lg">
            <h4 className="font-bold text-teal-800">💡 คำแนะนำสำหรับมือใหม่</h4>
            <p className="text-teal-700 text-sm mt-1">
              หากรายได้ยังไม่เยอะ และค่าใช้จ่ายจำเป็น (Necessities) พุ่งเกิน 55% ไปมาก ไม่ต้องกังวล! ให้คุณปรับลดสัดส่วนไหอื่นๆ ลงก่อน เช่น เริ่มต้นที่ 1% สำหรับไหอิสรภาพทางการเงิน สิ่งสำคัญไม่ใช่ "จำนวนเงิน" แต่คือ <strong>"การสร้างนิสัย"</strong> ในการแบ่งเงินอย่างมีวินัย
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

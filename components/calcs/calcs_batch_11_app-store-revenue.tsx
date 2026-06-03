import React, { useState, useEffect } from 'react';
import { Calculator, Smartphone, DollarSign, Percent, PieChart, ShoppingBag } from 'lucide-react';

export default function AppStoreRevenueCalculator({ lang = 'th' }: any) {
  const [grossSales, setGrossSales] = useState<number>(50000); // Monthly Gross
  const [isSmallBusiness, setIsSmallBusiness] = useState<boolean>(true); // 15% vs 30%

  const [results, setResults] = useState({
    commissionRate: 15,
    commissionAmount: 0,
    netRevenueMonthly: 0,
    netRevenueYearly: 0
  });

  useEffect(() => {
    // Both Apple and Google generally take 15% for the first $1M per year.
    // Over $1M they take 30% (Standard rate).
    const commissionRate = isSmallBusiness ? 15 : 30;
    const commissionAmount = grossSales * (commissionRate / 100);
    const netRevenueMonthly = grossSales - commissionAmount;
    const netRevenueYearly = netRevenueMonthly * 12;

    setResults({
      commissionRate,
      commissionAmount,
      netRevenueMonthly,
      netRevenueYearly
    });
  }, [grossSales, isSmallBusiness]);

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const t = {
    th: {
      title: "เครื่องมือคำนวณรายได้แอปพลิเคชัน (App Store / Play Store)",
      desc: "คำนวณรายได้สุทธิหลังหักส่วนแบ่ง (Commission) ให้กับ Apple App Store และ Google Play Store",
      grossSales: "ยอดขายรวมต่อเดือน (Gross Revenue - USD)",
      smallBusiness: "โปรแกรมธุรกิจขนาดเล็ก (รายได้ไม่เกิน 1 ล้านเหรียญ/ปี)",
      smallBusinessDesc: "หากติ๊กเลือก จะหักส่วนแบ่ง 15% แทน 30%",
      results: "สรุปรายได้และส่วนแบ่ง",
      commissionRateLabel: "อัตราหักส่วนแบ่ง (Commission Rate)",
      commissionAmount: "ค่าส่วนแบ่ง Store ต่อเดือน",
      netRevenueMonthly: "รายได้สุทธิต่อเดือน (Net Revenue)",
      netRevenueYearly: "รายได้สุทธิต่อปีโดยประมาณ",
      articleTitle: "ส่วนแบ่งรายได้ 15% และ 30% บน App Store และ Google Play Store คืออะไร?",
    },
    en: {
      title: "App Store / Play Store Revenue Calculator",
      desc: "Calculate net revenue after Apple/Google commission fees.",
      grossSales: "Monthly Gross Revenue (USD)",
      smallBusiness: "Small Business Program (< $1M/year)",
      smallBusinessDesc: "If checked, commission is 15% instead of 30%.",
      results: "Revenue & Commission Summary",
      commissionRateLabel: "Commission Rate",
      commissionAmount: "Store Commission (Monthly)",
      netRevenueMonthly: "Net Revenue (Monthly)",
      netRevenueYearly: "Estimated Net Revenue (Yearly)",
      articleTitle: "Understanding the 15% vs 30% App Store and Google Play Commission Cuts",
    }
  };

  const langKey = lang === 'en' ? 'en' : 'th';
  const text = t[langKey];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
        <div className="p-3 bg-pink-100 text-pink-600 rounded-xl">
          <Smartphone className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{text.title}</h2>
          <p className="text-gray-500 mt-1 text-sm">{text.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.grossSales}</label>
            <div className="relative">
              <input
                type="number"
                value={grossSales}
                onChange={(e) => setGrossSales(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 pl-10"
                min="0"
              />
              <DollarSign className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center mt-1">
                <input
                  type="checkbox"
                  checked={isSmallBusiness}
                  onChange={(e) => setIsSmallBusiness(e.target.checked)}
                  className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500 cursor-pointer"
                />
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-800 group-hover:text-pink-600 transition-colors">
                  {text.smallBusiness}
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  {text.smallBusinessDesc}
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-pink-600 to-rose-700 p-6 rounded-xl text-white shadow-lg h-full">
            <h3 className="text-xl font-semibold mb-6 opacity-90">{text.results}</h3>
            
            <div className="bg-white/10 p-6 rounded-xl border border-white/20 mb-6 backdrop-blur-sm text-center">
              <p className="text-sm opacity-90 mb-1">{text.netRevenueMonthly}</p>
              <div className="flex justify-center items-start">
                <span className="text-2xl mt-1 mr-1 text-pink-200">$</span>
                <span className="text-5xl font-bold">{formatNumber(results.netRevenueMonthly)}</span>
              </div>
              <div className="mt-4 inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                Rate: {results.commissionRate}%
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="opacity-90">{text.commissionAmount} ({results.commissionRate}%)</span>
                <span className="font-medium text-lg text-pink-200">${formatNumber(results.commissionAmount)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="opacity-90">{text.netRevenueYearly}</span>
                <span className="font-semibold text-xl">${formatNumber(results.netRevenueYearly)}</span>
              </div>
            </div>
            
            <p className="text-xs text-white/60 mt-6 text-center">
              * Apple App Store and Google Play Store policies apply.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 text-gray-600 prose prose-pink max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{text.articleTitle}</h2>
        <p>
          สำหรับนักพัฒนาแอปพลิเคชัน (App Developers) และสตาร์ทอัพที่ต้องการสร้างรายได้จากการขายแอปพลิเคชัน (Paid Apps), การขายของในแอป (In-App Purchases - IAP), หรือระบบสมาชิก (Subscriptions) จำเป็นต้องหักส่วนแบ่งรายได้ให้กับเจ้าของแพลตฟอร์มอย่าง <strong>Apple (App Store)</strong> และ <strong>Google (Play Store)</strong> ซึ่งเป็นนโยบายที่ถูกพูดถึงอย่างกว้างขวางทั่วโลก (มักเรียกกันว่า "Apple Tax" หรือ "Google Tax")
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">อัตราส่วนแบ่ง 30% (Standard Rate)</h3>
        <p>
          โดยพื้นฐานแล้ว ทั้ง Apple และ Google จะหักส่วนแบ่งจากทุกยอดการซื้อแบบดิจิทัลที่เกิดขึ้นผ่านระบบชำระเงินของพวกเขาในอัตรา <strong>30%</strong> (หมายความว่านักพัฒนาจะได้รับเงิน 70%) นี่เป็นอัตรามาตรฐานมาเป็นเวลานาน ซึ่งใช้สำหรับบริษัทขนาดใหญ่และบริษัทที่ทำรายได้เกินเกณฑ์ที่กำหนด
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">โปรแกรมธุรกิจขนาดเล็กลดเหลือ 15% (Small Business Program)</h3>
        <p>
          ในช่วงปี 2020-2021 หลังจากเผชิญกับแรงกดดันและคดีความจากนักพัฒนาหลายราย ทั้ง Apple และ Google ได้เปิดตัวโปรแกรมช่วยเหลือธุรกิจขนาดเล็ก โดยปรับลดอัตราการหักส่วนแบ่งลงเหลือ <strong>15%</strong> (นักพัฒนาได้ 85%) ซึ่งมีเงื่อนไขหลักๆ ดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Apple App Store Small Business Program:</strong> นักพัฒนาหรือบัญชีองค์กรที่มีรายได้จากแอปบนแพลตฟอร์มของ Apple <strong>ไม่เกิน 1 ล้านดอลลาร์สหรัฐ (ประมาณ 35 ล้านบาท) ต่อปี</strong> จะมีสิทธิ์ลงทะเบียนเข้าร่วมโปรแกรมเพื่อเสียค่าคอมมิชชันแค่ 15% หากปีไหนทำรายได้ทะลุ 1 ล้านดอลลาร์ รายได้ส่วนที่เกินจะถูกหัก 30% ตามปกติในรอบปีปฏิทินถัดไป</li>
          <li><strong>Google Play 15% Tier:</strong> ฝั่ง Google มีความใจกว้างกว่าเล็กน้อย คือนักพัฒนาทุกคน (ไม่ว่าจะบริษัทเล็กหรือใหญ่) จะเสียคอมมิชชันแค่ 15% สำหรับ <strong>1 ล้านดอลลาร์แรกของทุกปี</strong> และจะเก็บ 30% เฉพาะส่วนที่เกิน 1 ล้านดอลลาร์ไปแล้วเท่านั้น</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">ข้อยกเว้นที่ควรรู้</h3>
        <div className="bg-pink-50 p-5 rounded-xl my-4 border border-pink-100 text-gray-700">
          <p>
            กฎการหักส่วนแบ่ง 15-30% นี้ จะบังคับใช้กับ <strong>"Digital Goods and Services"</strong> เท่านั้น (เช่น ไอเทมในเกม, ฟีเจอร์พรีเมียม, ค่าสมาชิกรายเดือน/ปี) 
          </p>
          <p className="mt-2">
            หากคุณขาย <strong>"Physical Goods" หรือ "Physical Services"</strong> เช่น เรียกรถ (Grab), สั่งอาหาร (Foodpanda), หรือแอปซื้อของออนไลน์ส่งถึงบ้าน (Shopee/Lazada) คุณไม่ต้องหักส่วนแบ่งนี้ให้กับ Apple หรือ Google และสามารถใช้ระบบชำระเงินของคุณเอง (บัตรเครดิต, พร้อมเพย์) ได้โดยตรง
          </p>
        </div>
      </div>
    </div>
  );
}

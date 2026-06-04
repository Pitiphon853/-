"use client";

import React, { useState, useEffect } from 'react';
import { PiggyBank, Plus, Trash2, TrendingUp } from 'lucide-react';

interface Tier {
  id: string;
  limit: number | string;
  rate: number | string;
}

export default function DigitalSavingsTierRate({ lang = 'th' }: { lang?: string }) {
  const [principal, setPrincipal] = useState<number | string>(100000);
  
  // Default tiers mimicking typical Thai digital savings (e.g. 0-100k = 1.5%, 100k+ = 0.5%)
  const [tiers, setTiers] = useState<Tier[]>([
    { id: '1', limit: 100000, rate: 1.5 },
    { id: '2', limit: '', rate: 0.5 } // Empty limit means "and above"
  ]);

  const [results, setResults] = useState<{
    totalInterest: number;
    effectiveRate: number;
    tierBreakdown: { amount: number; interest: number; rate: number }[];
  }>({
    totalInterest: 0,
    effectiveRate: 0,
    tierBreakdown: []
  });

  useEffect(() => {
    calculateInterest();
  }, [principal, tiers]);

  const calculateInterest = () => {
    const amount = Number(principal) || 0;
    
    // Sort tiers by limit (treating empty limit as Infinity)
    const sortedTiers = [...tiers].sort((a, b) => {
      const limitA = a.limit === '' ? Infinity : Number(a.limit);
      const limitB = b.limit === '' ? Infinity : Number(b.limit);
      return limitA - limitB;
    });

    let remainingAmount = amount;
    let totalInterest = 0;
    let currentFloor = 0;
    const breakdown = [];

    for (let i = 0; i < sortedTiers.length; i++) {
      if (remainingAmount <= 0) break;

      const tier = sortedTiers[i];
      const tierLimit = tier.limit === '' ? Infinity : Number(tier.limit);
      const tierRate = Number(tier.rate) || 0;

      // Calculate how much of the principal falls into this tier
      const tierMaxAmount = tierLimit - currentFloor;
      const amountInTier = Math.min(remainingAmount, tierMaxAmount);
      
      const interestForTier = amountInTier * (tierRate / 100);
      
      totalInterest += interestForTier;
      breakdown.push({
        amount: amountInTier,
        interest: interestForTier,
        rate: tierRate
      });

      remainingAmount -= amountInTier;
      currentFloor = tierLimit;
    }

    const effectiveRate = amount > 0 ? (totalInterest / amount) * 100 : 0;

    setResults({
      totalInterest,
      effectiveRate,
      tierBreakdown: breakdown
    });
  };

  const updateTier = (id: string, field: 'limit' | 'rate', value: string) => {
    setTiers(tiers.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const addTier = () => {
    const newId = Math.random().toString(36).substring(7);
    // Insert before the "infinity" tier if it exists
    const newTiers = [...tiers];
    const infIndex = newTiers.findIndex(t => t.limit === '');
    
    if (infIndex >= 0) {
      newTiers.splice(infIndex, 0, { id: newId, limit: 10000, rate: 1.0 });
    } else {
      newTiers.push({ id: newId, limit: '', rate: 1.0 });
    }
    setTiers(newTiers);
  };

  const removeTier = (id: string) => {
    if (tiers.length <= 1) return; // Prevent removing last tier
    setTiers(tiers.filter(t => t.id !== id));
  };

  const isTh = lang === 'th';

  const texts = {
    title: isTh ? "เครื่องคำนวณดอกเบี้ยออมทรัพย์ดิจิทัลแบบขั้นบันได" : "Tier Rate Digital Savings Calculator",
    subtitle: isTh ? "คำนวณผลตอบแทนจากบัญชีเงินฝากที่ให้ดอกเบี้ยตามขั้นบันได (Tier Rate)" : "Calculate interest for accounts with tiered rates",
    principal: isTh ? "เงินต้นที่ต้องการฝาก (บาท)" : "Deposit Amount",
    tiersTitle: isTh ? "ตั้งค่าขั้นบันไดดอกเบี้ย" : "Interest Rate Tiers",
    tierAmountUpTo: isTh ? "ยอดฝากส่วนที่ไม่เกิน" : "Amount up to",
    tierAndAbove: isTh ? "และส่วนที่เกินขึ้นไป" : "And above",
    interestRate: isTh ? "อัตราดอกเบี้ย (%)" : "Interest Rate (%)",
    addTier: isTh ? "เพิ่มขั้นบันได" : "Add Tier",
    summary: isTh ? "สรุปผลการคำนวณ (ต่อปี)" : "Annual Summary",
    totalInterest: isTh ? "ดอกเบี้ยรวมที่ได้รับต่อปี" : "Total Annual Interest",
    effectiveRate: isTh ? "อัตราดอกเบี้ยเฉลี่ย (Effective Rate)" : "Effective Interest Rate",
    breakdown: isTh ? "รายละเอียดดอกเบี้ยแต่ละขั้น" : "Tier Breakdown",
    tier: isTh ? "ขั้นที่" : "Tier",
    amount: isTh ? "เงินฝาก" : "Amount",
    interest: isTh ? "ดอกเบี้ย" : "Interest",
    perYear: isTh ? "ต่อปี" : "per year"
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <div className="p-3 bg-pink-100 rounded-full text-pink-600">
          <PiggyBank className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{texts.title}</h2>
          <p className="text-gray-500 text-sm mt-1">{texts.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{texts.principal}</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full p-4 text-lg font-semibold text-gray-800 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
              min="0"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-700">{texts.tiersTitle}</label>
              <button 
                onClick={addTier}
                className="flex items-center gap-1 text-xs text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-full transition"
              >
                <Plus className="w-3 h-3" /> {texts.addTier}
              </button>
            </div>
            
            <div className="space-y-3">
              {tiers.map((tier, index) => {
                const isInfinity = tier.limit === '';
                return (
                  <div key={tier.id} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">
                        {isInfinity ? texts.tierAndAbove : texts.tierAmountUpTo}
                      </div>
                      {isInfinity ? (
                        <div className="w-full p-2 bg-gray-200 text-gray-500 rounded text-sm text-center">∞</div>
                      ) : (
                        <input
                          type="number"
                          value={tier.limit}
                          onChange={(e) => updateTier(tier.id, 'limit', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-pink-500"
                          placeholder="Amount"
                        />
                      )}
                    </div>
                    <div className="w-24">
                      <div className="text-xs text-gray-500 mb-1">{texts.interestRate}</div>
                      <input
                        type="number"
                        value={tier.rate}
                        onChange={(e) => updateTier(tier.id, 'rate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-pink-500"
                        step="0.1"
                      />
                    </div>
                    <div className="w-8 flex justify-center pt-5">
                      <button 
                        onClick={() => removeTier(tier.id)}
                        disabled={tiers.length <= 1}
                        className={`p-1.5 rounded-md ${tiers.length <= 1 ? 'text-gray-300' : 'text-red-400 hover:text-red-600 hover:bg-red-50'}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100 h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-pink-600" /> {texts.summary}
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-pink-100 text-center">
              <p className="text-sm text-gray-500 mb-1">{texts.totalInterest}</p>
              <p className="text-3xl font-bold text-pink-600">
                {results.totalInterest.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-400 mt-1">บาท / ปี</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
              <p className="text-sm text-gray-600">{texts.effectiveRate}</p>
              <p className="text-xl font-semibold text-gray-800">
                {results.effectiveRate.toFixed(2)}%
              </p>
            </div>

            {results.tierBreakdown.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">{texts.breakdown}</h4>
                <div className="space-y-2">
                  {results.tierBreakdown.map((item, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg shadow-sm text-sm border border-gray-100 flex justify-between items-center">
                      <div>
                        <span className="font-medium text-gray-700">{texts.tier} {index + 1}</span>
                        <span className="text-xs text-gray-500 ml-2">({item.rate}%)</span>
                        <div className="text-xs text-gray-500 mt-0.5">{item.amount.toLocaleString('th-TH')} บาท</div>
                      </div>
                      <div className="font-semibold text-green-600">
                        +{item.interest.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isTh && (
        <div className="mt-12 pt-8 border-t border-gray-200 prose prose-pink max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ดอกเบี้ยออมทรัพย์แบบขั้นบันได (Tier Rate) คืออะไร?</h2>
          
          <p>
            ปัจจุบัน ธนาคารหลายแห่งนิยมออกผลิตภัณฑ์ <strong>บัญชีเงินฝากออมทรัพย์ดิจิทัล (Digital Savings)</strong> ที่ให้ดอกเบี้ยสูงกว่าบัญชีออมทรัพย์ปกติ โดยมักจะใช้วิธีการคิดดอกเบี้ยแบบ <strong>ขั้นบันได (Tier Rate หรือ Step-up Rate)</strong> ซึ่งหมายความว่า อัตราดอกเบี้ยที่คุณจะได้รับนั้น ขึ้นอยู่กับจำนวนเงินฝากในบัญชี โดยแบ่งเป็นช่วงๆ 
          </p>
          
          <p>
            หลายคนมักเข้าใจผิดว่า หากฝากเงิน 150,000 บาท แล้วธนาคารบอกว่า "ส่วนที่เกิน 1 แสนบาท ดอกเบี้ย 0.5%" หมายถึงเงินทั้งหมด 150,000 บาทจะได้ดอกเบี้ย 0.5% ซึ่งเป็นความเข้าใจที่ <strong>ผิด</strong> 
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีการคิดดอกเบี้ยแบบขั้นบันได</h3>
          <p>
            การคิดดอกเบี้ยขั้นบันได จะแบ่งเงินฝากของคุณออกเป็นส่วนๆ ตามเงื่อนไขของธนาคาร ยกตัวอย่างเช่น เงื่อนไขยอดฮิตของบัญชีดิจิทัล:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>ขั้นที่ 1:</strong> เงินฝากตั้งแต่ 1 บาท ถึง 100,000 บาท ได้ดอกเบี้ย 1.5% ต่อปี</li>
            <li><strong>ขั้นที่ 2:</strong> เงินฝากส่วนที่เกิน 100,000 บาทขึ้นไป ได้ดอกเบี้ย 0.5% ต่อปี</li>
          </ul>
          
          <p>หากคุณฝากเงิน <strong>150,000 บาท</strong> วิธีคำนวณจะเป็นดังนี้:</p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li><strong>เงิน 100,000 บาทแรก</strong> จะถูกนำไปคิดดอกเบี้ยที่ 1.5% = ได้ดอกเบี้ย 1,500 บาท/ปี</li>
            <li><strong>เงิน 50,000 บาทที่เหลือ</strong> (ส่วนที่เกิน 1 แสน) จะถูกนำไปคิดดอกเบี้ยที่ 0.5% = ได้ดอกเบี้ย 250 บาท/ปี</li>
            <li><strong>รวมดอกเบี้ยที่ได้รับทั้งสิ้น:</strong> 1,500 + 250 = 1,750 บาท/ปี</li>
          </ol>
          <p>
            เมื่อนำดอกเบี้ยรวมมาหารด้วยเงินต้น (1,750 / 150,000) จะได้ <strong>อัตราดอกเบี้ยเฉลี่ย (Effective Rate)</strong> อยู่ที่ประมาณ <strong>1.16% ต่อปี</strong> ซึ่งไม่ใช่ 1.5% อย่างที่หลายคนเข้าใจในตอนแรก
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ข้อแนะนำในการฝากเงินบัญชีขั้นบันได</h3>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li><strong>ฝากไม่เกินเพดานดอกเบี้ยสูง:</strong> เพื่อให้ได้ผลตอบแทนสูงสุด(เฉลี่ย) ควรฝากเงินให้พอดีหรือใกล้เคียงกับขีดจำกัดของขั้นที่ให้ดอกเบี้ยสูงสุด เช่น ถ้าให้ 1.5% ไม่เกิน 1 แสนบาท ก็ควรฝากไว้แค่ 1 แสนบาท</li>
            <li><strong>กระจายเงินฝาก (Diversification):</strong> หากมีเงินเกิน 1 แสนบาท ส่วนที่เกินควรนำไปเปิดบัญชีดิจิทัลของธนาคารอื่นที่ให้ดอกเบี้ยสูงสำหรับยอดไม่เกิน 1 แสนบาทเช่นกัน แทนที่จะปล่อยให้เงินส่วนเกินได้รับดอกเบี้ยเพียง 0.5%</li>
            <li><strong>ระวังเรื่องภาษีดอกเบี้ยเงินฝาก:</strong> สำหรับบุคคลธรรมดา ดอกเบี้ยเงินฝากออมทรัพย์หากรวมกันทุกบัญชี ทุกธนาคาร แล้วเกิน 20,000 บาทต่อปี จะต้องถูกหักภาษี ณ ที่จ่าย 15% ทันทีตั้งแต่บาทแรก ดังนั้นหากมีเงินฝากจำนวนมาก ควรคำนวณดอกเบี้ยรับรวมไม่ให้เกินเกณฑ์นี้</li>
          </ol>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Megaphone, Target, PieChart, TrendingUp, DollarSign } from 'lucide-react';

export default function AdvertisingBudgetAllocation({ lang }: any) {
  const [inputs, setInputs] = useState({
    salesTarget: 1000000,
    expectedRoas: 5, // Return on Ad Spend (multiplier)
    fbPercent: 50,
    googlePercent: 30,
    tiktokPercent: 20
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: Number(e.target.value) }));
  };

  // Calculate Total Budget required based on ROAS
  // ROAS = Sales / Ad Spend => Ad Spend = Sales / ROAS
  const totalBudget = inputs.salesTarget / inputs.expectedRoas;

  // Normalize percentages just in case they don't add up to 100
  const totalPercent = inputs.fbPercent + inputs.googlePercent + inputs.tiktokPercent;
  const fbActualPercent = totalPercent === 0 ? 0 : inputs.fbPercent / totalPercent;
  const googleActualPercent = totalPercent === 0 ? 0 : inputs.googlePercent / totalPercent;
  const tiktokActualPercent = totalPercent === 0 ? 0 : inputs.tiktokPercent / totalPercent;

  const fbBudget = totalBudget * fbActualPercent;
  const googleBudget = totalBudget * googleActualPercent;
  const tiktokBudget = totalBudget * tiktokActualPercent;

  const formatNumber = (num: number) => num.toLocaleString('th-TH', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="space-y-8 p-4 md:p-6 bg-slate-50 text-slate-800">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Megaphone className="w-8 h-8 text-pink-600" />
          <h2 className="text-2xl font-bold text-slate-800">คำนวณและจัดสรรงบโฆษณา (Ad Budget & ROAS)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-pink-50 p-5 rounded-xl space-y-4">
              <h3 className="font-semibold text-pink-900 flex items-center gap-2">
                <Target className="w-5 h-5" /> เป้าหมายยอดขายและ ROAS
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">เป้าหมายยอดขายที่ต้องการ (Sales Target)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-500">฿</span>
                    <input type="number" name="salesTarget" value={inputs.salesTarget} onChange={handleChange} className="w-full pl-8 pr-3 py-2 border rounded-md" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ROAS ที่คาดหวัง (เท่า)</label>
                  <input type="number" step="0.1" name="expectedRoas" value={inputs.expectedRoas} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                  <p className="text-xs text-slate-500 mt-1">ROAS 5 เท่า หมายถึง จ่ายค่าโฆษณา 1 บาท ได้ยอดขาย 5 บาท</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-slate-500" /> สัดส่วนการแบ่งงบรายช่องทาง (%)
              </h3>
              <div className="p-4 border rounded-lg bg-white space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-1/3 text-sm font-medium text-blue-700">Facebook / IG</div>
                  <input type="range" name="fbPercent" min="0" max="100" value={inputs.fbPercent} onChange={handleChange} className="w-1/2 accent-blue-600" />
                  <div className="w-1/6 text-right font-semibold">{inputs.fbPercent}%</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-1/3 text-sm font-medium text-amber-600">Google Ads</div>
                  <input type="range" name="googlePercent" min="0" max="100" value={inputs.googlePercent} onChange={handleChange} className="w-1/2 accent-amber-500" />
                  <div className="w-1/6 text-right font-semibold">{inputs.googlePercent}%</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-1/3 text-sm font-medium text-slate-800">TikTok Ads</div>
                  <input type="range" name="tiktokPercent" min="0" max="100" value={inputs.tiktokPercent} onChange={handleChange} className="w-1/2 accent-slate-800" />
                  <div className="w-1/6 text-right font-semibold">{inputs.tiktokPercent}%</div>
                </div>
                
                {totalPercent !== 100 && (
                  <div className="text-xs text-amber-600 text-center mt-2 bg-amber-50 p-2 rounded">
                    ผลรวมสัดส่วน = {totalPercent}% (ระบบจะปรับฐานเป็น 100% อัตโนมัติในการคำนวณเงิน)
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800 text-white p-6 rounded-xl text-center shadow-lg">
              <h3 className="text-sm font-medium text-slate-300 mb-2">งบโฆษณารวมที่ต้องเตรียม (Total Ad Budget)</h3>
              <div className="text-4xl font-bold text-pink-400 mb-2">
                {formatNumber(totalBudget)} <span className="text-xl">฿</span>
              </div>
              <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs text-slate-300">
                คิดเป็น {((totalBudget / inputs.salesTarget) * 100).toFixed(1)}% ของเป้ายอดขาย
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">งบประมาณรายช่องทาง</h3>
                <span className="text-xs text-slate-500">ปรับฐานแล้ว</span>
              </div>
              <div className="p-4 space-y-4">
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-blue-700">Facebook & Instagram ({(fbActualPercent * 100).toFixed(0)}%)</span>
                    <span className="font-bold text-slate-800">{formatNumber(fbBudget)} ฿</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${fbActualPercent * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-amber-600">Google Ads ({(googleActualPercent * 100).toFixed(0)}%)</span>
                    <span className="font-bold text-slate-800">{formatNumber(googleBudget)} ฿</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${googleActualPercent * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-slate-800">TikTok Ads ({(tiktokActualPercent * 100).toFixed(0)}%)</span>
                    <span className="font-bold text-slate-800">{formatNumber(tiktokBudget)} ฿</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-slate-800 h-2 rounded-full" style={{ width: `${tiktokActualPercent * 100}%` }}></div>
                  </div>
                </div>

              </div>
            </div>
            
            <div className="bg-pink-50 border border-pink-100 p-4 rounded-xl flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-pink-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-pink-900 text-sm mb-1">รู้หรือไม่? (Marketing Rule of Thumb)</h4>
                <p className="text-xs text-pink-800 leading-relaxed">
                  โดยทั่วไปธุรกิจ e-Commerce มักจะตั้งงบโฆษณาอยู่ที่ 15-25% ของเป้ายอดขาย (หรือคาดหวัง ROAS ที่ 4x - 6x) 
                  หากสินค้าคุณมีกำไรขั้นต้น (Gross Margin) ต่ำ คุณจำเป็นต้องทำ ROAS ให้สูงขึ้นเพื่อให้ครอบคลุมค่าโฆษณาและเหลือกำไรสุทธิ
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <article className="prose max-w-none bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">จัดสรรงบโฆษณาอย่างไรให้คุ้มค่า? เจาะลึก ROAS และกฎ 70-20-10</h2>
        
        <p>ในการทำการตลาดดิจิทัล คำถามยอดฮิตของเจ้าของแบรนด์คือ <strong>"ต้องใช้งบโฆษณาเท่าไหร่ถึงจะได้ยอดขายตามเป้า?"</strong> และ <strong>"จะแบ่งงบไปลงแพลตฟอร์มไหนดี?"</strong> การตั้งงบโดยไม่มีหลักการอาจทำให้คุณเสียเงินฟรี เครื่องมือในการหาคำตอบที่ดีที่สุดคือการเข้าใจ <strong>ROAS</strong></p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ROAS (Return on Ad Spend) คืออะไร?</h3>
        <p>ROAS คือ ตัวเลขที่บอกว่า <strong>"เราลงเงินค่าโฆษณาไป 1 บาท เราได้ยอดขายกลับมาคือกี่บาท"</strong></p>
        <div className="bg-slate-50 p-3 rounded font-mono text-sm text-center mb-4">
          ROAS = ยอดขายที่เกิดจากโฆษณา (Sales) ÷ ค่าโฆษณา (Ad Spend)
        </div>
        <p>ตัวอย่าง: หากคุณต้องการยอดขาย 1,000,000 บาท และข้อมูลในอดีตบอกว่า ROAS เฉลี่ยของคุณอยู่ที่ 5 เท่า แปลว่าคุณต้องเตรียมงบโฆษณาไว้ = 1,000,000 ÷ 5 = <strong>200,000 บาท</strong></p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ROAS เท่าไหร่ถึงจะเรียกว่า "กำไร"?</h3>
        <p className="text-gray-600 mb-4">มือใหม่หลายคนมักเข้าใจผิดว่า ROAS &gt; 1 คือกำไรแล้ว แต่ความเป็นจริง สินค้าทุกชิ้นมีต้นทุนแฝง (COGS, ค่าแพ็ค, ค่าส่ง, ค่าแอดมิน) ดังนั้นสิ่งที่คุณต้องหาคือ <strong>Break-even ROAS (ROAS จุดคุ้มทุน)</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Break-even ROAS</strong> = 1 ÷ กำไรขั้นต้น (%)</li>
          <li>ตัวอย่าง: สินค้ามีกำไรขั้นต้น 40% (0.4) -&gt; Break-even ROAS = 1 ÷ 0.4 = <strong>2.5 เท่า</strong></li>
          <li>หมายความว่า ถ้าคุณยิงแอดได้ ROAS 2.5 คือเท่าทุน ไม่ได้ไม่เสีย ดังนั้นคุณต้องทำ ROAS ให้ได้ 3 ขึ้นไปถึงจะมีกำไรสุทธิ</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">หลักการแบ่งงบโฆษณา 70-20-10 Rule</h3>
        <p>เมื่อรู้ภาพรวมของงบประมาณแล้ว การจัดสรรงบไปตามช่องทางต่างๆ หรือตาม Funnel แนะนำให้ใช้หลัก <strong>70-20-10</strong> เพื่อลดความเสี่ยง:</p>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800">70% - Proven Channels (ช่องทางหลักที่ทำเงินชัวร์ๆ)</h4>
            <p className="text-sm mt-1 text-slate-700">ทุ่มงบส่วนใหญ่ให้กับช่องทางหรือแคมเปญที่เคยทดสอบแล้วว่าสร้าง ROAS ได้ดี และมีฐานลูกค้าประจำ เช่น แคมเปญ Retargeting บน Facebook หรือ Google Search Ads คีย์เวิร์ดแบรนด์</p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-bold text-amber-800">20% - Safe Bets (ช่องทางที่มีแนวโน้มดี)</h4>
            <p className="text-sm mt-1 text-slate-700">แบ่งงบมาขยายฐานลูกค้าใหม่ (Prospecting / Broad Audience) หรือทดลองกลุ่มเป้าหมายที่ใกล้เคียงกับลูกค้าเดิม (Lookalike) แม้ ROAS อาจจะไม่สูงเท่างบ 70% แต่ช่วยหาเลือดใหม่เข้าธุรกิจ</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-bold text-purple-800">10% - Experimental (ทดลองนวัตกรรมใหม่ๆ)</h4>
            <p className="text-sm mt-1 text-slate-700">กันงบก้อนเล็กๆ ไว้ทดสอบแพลตฟอร์มใหม่ ฟีเจอร์ใหม่ หรือคอนเทนต์รูปแบบแปลกๆ (เช่น TikTok Ads แคมเปญใหม่, Influencer Niche) เพื่อหา Blue Ocean หากได้ผลดี ก็ค่อยๆ เลื่อนชั้นขึ้นไปเป็น 20% และ 70% ต่อไป</p>
          </div>
        </div>

      </article>
    </div>
  );
}

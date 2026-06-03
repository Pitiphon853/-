import React, { useState, useEffect } from 'react';
import { Calculator, BarChart3, TrendingUp, Search, DollarSign } from 'lucide-react';

export default function GoogleAdsRoiCalculator({ lang = 'th' }: any) {
  const [adSpend, setAdSpend] = useState<number>(20000);
  const [cpc, setCpc] = useState<number>(15);
  const [conversionRate, setConversionRate] = useState<number>(5.0);
  const [aov, setAov] = useState<number>(2000);
  const [profitMargin, setProfitMargin] = useState<number>(40);

  const [results, setResults] = useState({
    clicks: 0,
    conversions: 0,
    cpa: 0,
    revenue: 0,
    grossProfit: 0,
    netProfit: 0,
    roas: 0,
    roi: 0
  });

  useEffect(() => {
    const clicks = cpc > 0 ? adSpend / cpc : 0;
    const conversions = clicks * (conversionRate / 100);
    const cpa = conversions > 0 ? adSpend / conversions : 0;
    const revenue = conversions * aov;
    const grossProfit = revenue * (profitMargin / 100);
    const netProfit = grossProfit - adSpend;
    const roas = adSpend > 0 ? revenue / adSpend : 0;
    const roi = adSpend > 0 ? (netProfit / adSpend) * 100 : 0;

    setResults({
      clicks,
      conversions,
      cpa,
      revenue,
      grossProfit,
      netProfit,
      roas,
      roi
    });
  }, [adSpend, cpc, conversionRate, aov, profitMargin]);

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const t = {
    th: {
      title: "เครื่องมือคำนวณ ROI โฆษณา Google Ads",
      adSpend: "งบโฆษณารวม (บาท)",
      cpc: "ราคาต่อคลิกเฉลี่ย - CPC (บาท)",
      conversionRate: "Conversion Rate (อัตราการซื้อ %)",
      aov: "ยอดสั่งซื้อเฉลี่ย (AOV)",
      profitMargin: "อัตรากำไรขั้นต้น - Gross Margin (%)",
      results: "ผลลัพธ์การประเมินแคมเปญ",
      clicks: "จำนวนคลิกที่คาดหวัง",
      conversions: "จำนวนการสั่งซื้อ/Lead",
      cpa: "ต้นทุนต่อการได้ลูกค้า (CPA)",
      revenue: "ยอดขายรวม",
      grossProfit: "กำไรขั้นต้น (ก่อนหักค่าแอด)",
      netProfit: "กำไรสุทธิ (หลังหักค่าแอด)",
      roi: "ผลตอบแทนการลงทุน (ROI %)",
      roas: "ROAS (เท่า)",
      articleTitle: "วิธีวิเคราะห์และคำนวณ ROI สำหรับ Google Ads อย่างมืออาชีพ",
      profitStatus: results.netProfit >= 0 ? "มีกำไร" : "ขาดทุน"
    },
    en: {
      title: "Google Ads ROI & ROAS Calculator",
      adSpend: "Total Ad Spend ($)",
      cpc: "Average Cost Per Click (CPC)",
      conversionRate: "Conversion Rate (%)",
      aov: "Average Order Value (AOV)",
      profitMargin: "Gross Profit Margin (%)",
      results: "Campaign Estimates",
      clicks: "Estimated Clicks",
      conversions: "Estimated Conversions",
      cpa: "Cost Per Acquisition (CPA)",
      revenue: "Total Revenue",
      grossProfit: "Gross Profit (Before Ads)",
      netProfit: "Net Profit (After Ads)",
      roi: "Return on Investment (ROI %)",
      roas: "ROAS (Return on Ad Spend)",
      articleTitle: "How to Analyze and Calculate Google Ads ROI Professionally",
      profitStatus: results.netProfit >= 0 ? "Profitable" : "Loss"
    }
  };

  const langKey = lang === 'en' ? 'en' : 'th';
  const text = t[langKey];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-green-100 text-green-600 rounded-xl">
          <Search className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{text.title}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.adSpend}</label>
            <input
              type="number"
              value={adSpend}
              onChange={(e) => setAdSpend(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.cpc}</label>
            <input
              type="number"
              value={cpc}
              onChange={(e) => setCpc(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="0"
              step="0.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.conversionRate}</label>
            <input
              type="number"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.aov}</label>
            <input
              type="number"
              value={aov}
              onChange={(e) => setAov(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.profitMargin}</label>
            <div className="relative">
              <input
                type="number"
                value={profitMargin}
                onChange={(e) => setProfitMargin(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-10"
                min="0"
                max="100"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-6 rounded-xl text-white shadow-lg h-full">
            <h3 className="text-xl font-semibold mb-6 opacity-90">{text.results}</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/15 p-4 rounded-xl border border-white/20 backdrop-blur-sm">
                <p className="text-sm opacity-80 mb-1">{text.roi}</p>
                <p className={`text-2xl md:text-3xl font-bold ${results.roi >= 0 ? 'text-white' : 'text-red-200'}`}>
                  {formatNumber(results.roi)}%
                </p>
              </div>
              <div className="bg-white/15 p-4 rounded-xl border border-white/20 backdrop-blur-sm">
                <p className="text-sm opacity-80 mb-1">{text.roas}</p>
                <p className="text-2xl md:text-3xl font-bold">{formatNumber(results.roas)}x</p>
              </div>
            </div>

            <div className="bg-white/15 p-5 rounded-xl border border-white/20 backdrop-blur-sm mb-6">
              <p className="text-sm opacity-80 mb-1">{text.netProfit} <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full ml-2">{text.profitStatus}</span></p>
              <p className={`text-4xl font-bold ${results.netProfit >= 0 ? 'text-green-200' : 'text-red-300'}`}>
                {results.netProfit >= 0 ? '+' : ''}{formatNumber(results.netProfit)}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm mt-8">
              <div className="flex flex-col border-b border-white/20 pb-2">
                <span className="opacity-80 mb-1">{text.revenue}</span>
                <span className="font-semibold text-lg">{formatNumber(results.revenue)}</span>
              </div>
              <div className="flex flex-col border-b border-white/20 pb-2">
                <span className="opacity-80 mb-1">{text.grossProfit}</span>
                <span className="font-semibold text-lg">{formatNumber(results.grossProfit)}</span>
              </div>
              <div className="flex flex-col border-b border-white/20 pb-2">
                <span className="opacity-80 mb-1">{text.cpa}</span>
                <span className="font-semibold text-lg">{formatNumber(results.cpa)}</span>
              </div>
              <div className="flex flex-col border-b border-white/20 pb-2">
                <span className="opacity-80 mb-1">{text.conversions}</span>
                <span className="font-semibold text-lg">{formatNumber(results.conversions, 1)}</span>
              </div>
              <div className="flex flex-col">
                <span className="opacity-80 mb-1">{text.clicks}</span>
                <span className="font-semibold text-lg">{formatNumber(results.clicks, 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 text-gray-600 prose prose-green max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{text.articleTitle}</h2>
        <p>
          Google Ads เป็นหนึ่งในช่องทางการตลาดที่ทรงพลังที่สุด เนื่องจากสามารถเจาะจงกลุ่มเป้าหมายที่มี "ความต้องการซื้อ (Intent)" สูงได้อย่างแม่นยำ เช่น ผู้ใช้ที่กำลังค้นหาสินค้าหรือบริการบน Google Search อย่างไรก็ตาม การแข่งขันในการประมูลคีย์เวิร์ด (Bidding) ทำให้ราคาต่อคลิก (CPC) ในหลายอุตสาหกรรมพุ่งสูงขึ้นอย่างต่อเนื่อง การคำนวณและติดตามผลตอบแทนการลงทุน (ROI) และ ROAS (Return on Ad Spend) จึงมีความสำคัญอย่างยิ่งยวด
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">เจาะลึกตัวแปรสำคัญในสมการของ Google Ads</h3>
        <p>
          การใช้เครื่องคำนวณด้านบนต้องอาศัยความเข้าใจตัวแปรแต่ละตัว ซึ่งมีความสัมพันธ์กันโดยตรงต่อผลลัพธ์ของแคมเปญ:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>CPC (Cost Per Click):</strong> ค่าใช้จ่ายเฉลี่ยเมื่อมีคนคลิกโฆษณาของคุณ 1 ครั้ง ต้นทุนนี้ขึ้นอยู่กับหลายปัจจัย เช่น การแข่งขันของคีย์เวิร์ด และ Quality Score หรือคะแนนคุณภาพของโฆษณาของคุณ หากโฆษณาเกี่ยวข้องกับคำค้นหาและหน้าเว็บไซต์มาก Google จะคิดค่าคลิกถูกลง</li>
          <li><strong>Conversion Rate:</strong> อัตราส่วนของคนที่คลิกเข้ามาแล้วทำการสั่งซื้อหรือลงทะเบียน หาก Conversion Rate ต่ำ (เช่น ต่ำกว่า 1-2%) แปลว่าคนเข้ามาแล้วไม่สนใจ หรือสินค้า/บริการยังไม่ตอบโจทย์ รวมถึงหน้า Landing Page อาจจะใช้งานยากหรือโหลดช้า</li>
          <li><strong>Gross Profit Margin:</strong> สำหรับนักลงโฆษณาหลายคน มักจะดูเพียงแค่ ROAS แต่อาจจะลืมคำนวณต้นทุนสินค้าที่แท้จริง ทำให้ยอดขายเยอะแต่ไม่มีกำไร การระบุอัตรากำไรขั้นต้น (Gross Margin) จะทำให้คำนวณ ROI ได้อย่างแม่นยำ ว่าเงินที่ลงโฆษณาไปนั้น สร้างผลกำไรสุทธิกลับมาจริงๆ หรือไม่</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">ความแตกต่างระหว่าง ROAS และ ROI</h3>
        <p>หลายคนสับสนระหว่างสองตัวชี้วัดนี้:</p>
        <div className="bg-green-50 p-4 rounded-lg my-4 border border-green-100">
          <p><strong>ROAS (Return on Ad Spend)</strong> คือ ยอดขาย ÷ ค่าโฆษณา เช่น ลงโฆษณา 10,000 บาท ได้ยอดขาย 30,000 บาท เท่ากับ ROAS 3x หรือ 300% (ไม่ได้หักต้นทุนสินค้า)</p>
          <p className="mt-2"><strong>ROI (Return on Investment)</strong> คือ (กำไรสุทธิ - ค่าโฆษณา) ÷ ค่าโฆษณา ซึ่งจะพิจารณาต้นทุนทุกอย่างแล้ว เป็นตัวชี้วัดที่บอกว่าธุรกิจของคุณ "รอด" หรือ "ร่วง"</p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">กลยุทธ์การเพิ่ม ROI สำหรับ Google Ads</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>การทำ Negative Keywords:</strong> ใส่คำศัพท์ที่ไม่เกี่ยวข้องกับธุรกิจของคุณเพื่อป้องกันคลิกขยะ (Wasted Clicks) ช่วยประหยัดงบและเพิ่มอัตรา Conversion</li>
          <li><strong>ปรับปรุง Quality Score:</strong> เขียน Ad Copy ให้ตรงกับ Keyword และปรับหน้าเว็บปลายทาง (Landing Page) ให้เกี่ยวข้องและให้ประสบการณ์ผู้ใช้ (UX) ที่ดี</li>
          <li><strong>เน้น Long-tail Keywords:</strong> คีย์เวิร์ดที่ยาวและเจาะจงมากขึ้น มักจะมีค่า CPC ที่ถูกกว่า และมี Conversion Rate สูงกว่าคีย์เวิร์ดแบบกว้างๆ</li>
          <li><strong>Retargeting (Remarketing):</strong> นำส่งโฆษณาไปหาผู้ที่เคยเข้าเว็บไซต์แล้วแต่ยังไม่ตัดสินใจซื้อ มักจะได้ CPA ที่ถูกกว่าการหาลูกค้าใหม่ล้วนๆ</li>
        </ol>
        <p className="mt-4">
          การวิเคราะห์ตัวเลขเหล่านี้อย่างสม่ำเสมอ และนำผลมาปรับแต่งแคมเปญ (Optimization) จะช่วยให้คุณประหยัดงบประมาณและสร้างการเติบโตของธุรกิจจาก Google Ads ได้อย่างยั่งยืน
        </p>
      </div>
    </div>
  );
}

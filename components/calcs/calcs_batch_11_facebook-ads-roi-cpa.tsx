import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, BarChart2, Target, Percent } from 'lucide-react';

export default function FacebookAdsRoiCalculator({ lang = 'th' }: any) {
  const [adSpend, setAdSpend] = useState<number>(10000);
  const [cpm, setCpm] = useState<number>(100);
  const [ctr, setCtr] = useState<number>(2.0);
  const [conversionRate, setConversionRate] = useState<number>(3.0);
  const [aov, setAov] = useState<number>(1500);
  const [cogs, setCogs] = useState<number>(500);

  const [results, setResults] = useState({
    impressions: 0,
    clicks: 0,
    cpc: 0,
    conversions: 0,
    cpa: 0,
    revenue: 0,
    totalCost: 0,
    profit: 0,
    roi: 0,
    roas: 0
  });

  useEffect(() => {
    const impressions = cpm > 0 ? (adSpend / cpm) * 1000 : 0;
    const clicks = impressions * (ctr / 100);
    const cpc = clicks > 0 ? adSpend / clicks : 0;
    const conversions = clicks * (conversionRate / 100);
    const cpa = conversions > 0 ? adSpend / conversions : 0;
    const revenue = conversions * aov;
    const totalCost = adSpend + (conversions * cogs);
    const profit = revenue - totalCost;
    const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;
    const roas = adSpend > 0 ? revenue / adSpend : 0;

    setResults({
      impressions,
      clicks,
      cpc,
      conversions,
      cpa,
      revenue,
      totalCost,
      profit,
      roi,
      roas
    });
  }, [adSpend, cpm, ctr, conversionRate, aov, cogs]);

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const t = {
    th: {
      title: "เครื่องมือคำนวณ ROI โฆษณา Facebook Ads",
      adSpend: "งบโฆษณารวม (บาท)",
      cpm: "CPM (ต้นทุนต่อ 1,000 การมองเห็น)",
      ctr: "CTR (อัตราการคลิก %)",
      conversionRate: "Conversion Rate (อัตราการซื้อ %)",
      aov: "ยอดสั่งซื้อเฉลี่ย (AOV)",
      cogs: "ต้นทุนสินค้าต่อออเดอร์ (COGS)",
      results: "ผลลัพธ์การคำนวณ",
      impressions: "การมองเห็น (Impressions)",
      clicks: "จำนวนคลิก",
      cpc: "ต้นทุนต่อคลิก (CPC)",
      conversions: "จำนวนการสั่งซื้อ",
      cpa: "ต้นทุนต่อการสั่งซื้อ 1 ครั้ง (CPA)",
      revenue: "ยอดขายรวม",
      totalCost: "ต้นทุนรวม (ค่าโฆษณา + ค่าสินค้า)",
      profit: "กำไรสุทธิ",
      roi: "ผลตอบแทนการลงทุน (ROI %)",
      roas: "ROAS (เท่า)",
      articleTitle: "การคำนวณและวิเคราะห์ ROI สำหรับโฆษณา Facebook Ads",
      profitStatus: results.profit >= 0 ? "มีกำไร" : "ขาดทุน"
    },
    en: {
      title: "Facebook Ads ROI Calculator",
      adSpend: "Total Ad Spend ($)",
      cpm: "CPM (Cost Per 1,000 Impressions)",
      ctr: "CTR (Click-Through Rate %)",
      conversionRate: "Conversion Rate (%)",
      aov: "Average Order Value (AOV)",
      cogs: "Cost of Goods Sold per Order (COGS)",
      results: "Calculation Results",
      impressions: "Impressions",
      clicks: "Clicks",
      cpc: "Cost Per Click (CPC)",
      conversions: "Conversions (Orders)",
      cpa: "Cost Per Acquisition (CPA)",
      revenue: "Total Revenue",
      totalCost: "Total Cost (Ads + COGS)",
      profit: "Net Profit",
      roi: "Return on Investment (ROI %)",
      roas: "ROAS (Return on Ad Spend)",
      articleTitle: "Calculating and Analyzing Facebook Ads ROI",
      profitStatus: results.profit >= 0 ? "Profitable" : "Loss"
    }
  };

  const langKey = lang === 'en' ? 'en' : 'th';
  const text = t[langKey];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
          <Target className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{text.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.adSpend}</label>
            <input
              type="number"
              value={adSpend}
              onChange={(e) => setAdSpend(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.cpm}</label>
            <input
              type="number"
              value={cpm}
              onChange={(e) => setCpm(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.ctr}</label>
            <input
              type="number"
              value={ctr}
              onChange={(e) => setCtr(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.conversionRate}</label>
            <input
              type="number"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.cogs}</label>
            <input
              type="number"
              value={cogs}
              onChange={(e) => setCogs(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-xl text-white shadow-lg">
            <h3 className="text-xl font-semibold mb-4 opacity-90">{text.results}</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-sm opacity-80 mb-1">{text.roi}</p>
                <p className="text-2xl font-bold">{formatNumber(results.roi)}%</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-sm opacity-80 mb-1">{text.roas}</p>
                <p className="text-2xl font-bold">{formatNumber(results.roas)}x</p>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm mb-6">
              <p className="text-sm opacity-80 mb-1">{text.profit} ({text.profitStatus})</p>
              <p className={`text-3xl font-bold ${results.profit >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                {results.profit >= 0 ? '+' : ''}{formatNumber(results.profit)}
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span className="opacity-80">{text.revenue}</span>
                <span className="font-medium">{formatNumber(results.revenue)}</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span className="opacity-80">{text.totalCost}</span>
                <span className="font-medium">{formatNumber(results.totalCost)}</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span className="opacity-80">{text.cpa}</span>
                <span className="font-medium">{formatNumber(results.cpa)}</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span className="opacity-80">{text.cpc}</span>
                <span className="font-medium">{formatNumber(results.cpc)}</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span className="opacity-80">{text.conversions}</span>
                <span className="font-medium">{formatNumber(results.conversions, 0)}</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span className="opacity-80">{text.clicks}</span>
                <span className="font-medium">{formatNumber(results.clicks, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">{text.impressions}</span>
                <span className="font-medium">{formatNumber(results.impressions, 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 text-gray-600 prose prose-blue max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{text.articleTitle}</h2>
        <p>
          ในการทำการตลาดออนไลน์บนแพลตฟอร์ม Facebook Ads สิ่งที่สำคัญที่สุดอย่างหนึ่งคือการวัดผลตอบแทนจากการลงทุน หรือ Return on Investment (ROI) การยิงแอดโดยไม่รู้ต้นทุนและกำไรที่แท้จริงเปรียบเสมือนการขับรถในความมืด เครื่องมือคำนวณนี้ถูกออกแบบมาเพื่อช่วยให้นักการตลาด ผู้ประกอบการ และเจ้าของธุรกิจออนไลน์สามารถประเมินประสิทธิภาพของแคมเปญโฆษณาได้อย่างแม่นยำ
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">คำศัพท์ที่สำคัญใน Facebook Ads</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>CPM (Cost Per 1,000 Impressions):</strong> ต้นทุนต่อการแสดงผลโฆษณาครบ 1,000 ครั้ง เป็นตัวชี้วัดความถูกแพงของการนำส่งโฆษณา</li>
          <li><strong>CTR (Click-Through Rate):</strong> อัตราส่วนคนที่คลิกโฆษณาเทียบกับคนที่เห็น ยิ่ง CTR สูง แปลว่าคอนเทนต์โฆษณา (Creative/Copy) น่าสนใจและดึงดูดใจกลุ่มเป้าหมาย</li>
          <li><strong>CPC (Cost Per Click):</strong> ต้นทุนต่อ 1 คลิก หาก CTR สูง ค่า CPC มักจะถูกลง</li>
          <li><strong>Conversion Rate:</strong> อัตราส่วนคนที่สั่งซื้อเทียบกับคนที่คลิกเข้าเว็บไซต์หรือทักแชท เป็นตัวบ่งบอกคุณภาพของหน้า Landing Page หรือทักษะการปิดการขายของแอดมิน</li>
          <li><strong>CPA (Cost Per Acquisition):</strong> ต้นทุนในการได้ลูกค้าใหม่ 1 ราย (บางครั้งเรียกว่า Cost Per Purchase) ซึ่งเป็นตัวแปรสำคัญที่บอกว่าเราได้กำไรหรือขาดทุน</li>
          <li><strong>ROAS (Return on Ad Spend):</strong> ยอดขายรวมที่ได้กลับมาเทียบกับค่าโฆษณา เช่น ROAS 3x หมายถึงจ่ายค่าโฆษณา 1 บาท ได้ยอดขาย 3 บาท</li>
          <li><strong>ROI (Return on Investment):</strong> ผลตอบแทนการลงทุนสุทธิ คิดจากกำไรที่หักต้นทุนทุกอย่างแล้ว (ทั้งค่าแอดและต้นทุนสินค้า) หาก ROI เป็นบวก แปลว่าธุรกิจคุณมีกำไร</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">วิธีปรับปรุงประสิทธิภาพแคมเปญโฆษณา</h3>
        <p>หากเครื่องมือคำนวณพบว่าแคมเปญของคุณขาดทุน (ROI ติดลบ) คุณสามารถพิจารณาปรับปรุงปัจจัยดังต่อไปนี้:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>เพิ่มคุณภาพคอนเทนต์โฆษณา:</strong> เพื่อเพิ่ม CTR และลด CPC ลง ซึ่งจะทำให้คุณได้คลิกหรือคนทักแชทมากขึ้นในงบประมาณเท่าเดิม</li>
          <li><strong>ปรับแต่งการเลือกกลุ่มเป้าหมาย (Targeting):</strong> หากได้คลิกเยอะแต่คนไม่ซื้อ (Conversion Rate ต่ำ) อาจหมายความว่าโฆษณานำส่งไปยังคนที่ไม่ใช่กลุ่มเป้าหมายที่แท้จริง</li>
          <li><strong>เพิ่ม Average Order Value (AOV):</strong> การทำโปรโมชั่น ซื้อคู่ถูกกว่า หรือการทำ Upsell/Cross-sell จะช่วยเพิ่มรายได้ต่อหัว ทำให้จุดคุ้มทุนทำได้ง่ายขึ้น</li>
          <li><strong>เพิ่ม Conversion Rate ของร้าน:</strong> ปรับปรุงเว็บไซต์ให้โหลดเร็ว ซื้อง่าย หรือหากขายทางแชท ควรมีสคริปต์ตอบลูกค้าที่ชัดเจนและจูงใจ</li>
        </ol>

        <p className="mt-4">
          การทดลองสร้างสถานการณ์จำลอง (Scenario) ด้วยเครื่องมือคำนวณของเรา จะช่วยให้คุณเห็นภาพชัดเจนว่าต้องทำตัวเลขต่างๆ ให้อยู่ในระดับใดถึงจะมีกำไร เช่น หากต้นทุนสินค้าแพง อาจต้องดันยอด AOV ให้สูง หรือต้องกดค่า CPA ลงให้ได้ เพื่อสร้างความยั่งยืนให้กับการทำโฆษณาออนไลน์ของคุณ
        </p>
      </div>
    </div>
  );
}

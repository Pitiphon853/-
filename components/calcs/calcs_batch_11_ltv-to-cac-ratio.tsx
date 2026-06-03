import React, { useState, useEffect } from 'react';
import { Calculator, Users, Activity, TrendingUp, DollarSign } from 'lucide-react';

export default function LtvCacRatioCalculator({ lang = 'th' }: any) {
  const [arpa, setArpa] = useState<number>(1500); // Monthly Average Revenue Per Account
  const [grossMargin, setGrossMargin] = useState<number>(70); // %
  const [churnRate, setChurnRate] = useState<number>(5.0); // Monthly Churn %
  const [marketingSpend, setMarketingSpend] = useState<number>(50000);
  const [newCustomers, setNewCustomers] = useState<number>(100);

  const [results, setResults] = useState({
    customerLifespan: 0,
    ltv: 0,
    cac: 0,
    ratio: 0,
    healthStatus: 'Poor',
    paybackPeriod: 0
  });

  useEffect(() => {
    // Lifespan in months
    const customerLifespan = churnRate > 0 ? 1 / (churnRate / 100) : 0;
    
    // LTV = ARPA * Gross Margin * Lifespan
    const ltv = arpa * (grossMargin / 100) * customerLifespan;
    
    // CAC = Total Marketing & Sales Spend / New Customers Acquired
    const cac = newCustomers > 0 ? marketingSpend / newCustomers : 0;
    
    // Ratio LTV:CAC
    const ratio = cac > 0 ? ltv / cac : 0;

    // Payback Period (Months) = CAC / (ARPA * Gross Margin)
    const marginPerMonth = arpa * (grossMargin / 100);
    const paybackPeriod = marginPerMonth > 0 ? cac / marginPerMonth : 0;

    let healthStatus = 'Poor';
    if (ratio >= 3) healthStatus = 'Excellent';
    else if (ratio >= 1) healthStatus = 'Fair';

    setResults({
      customerLifespan,
      ltv,
      cac,
      ratio,
      healthStatus,
      paybackPeriod
    });
  }, [arpa, grossMargin, churnRate, marketingSpend, newCustomers]);

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const t = {
    th: {
      title: "เครื่องมือคำนวณอัตราส่วน LTV:CAC",
      arpa: "รายได้เฉลี่ยต่อลูกค้าต่อเดือน (ARPA)",
      grossMargin: "อัตรากำไรขั้นต้น (Gross Margin %)",
      churnRate: "อัตรายกเลิกบริการต่อเดือน (Churn Rate %)",
      marketingSpend: "ค่าใช้จ่ายการขายและการตลาดต่อเดือน",
      newCustomers: "จำนวนลูกค้าใหม่ที่หาได้ต่อเดือน",
      results: "ผลการวิเคราะห์ LTV:CAC",
      ltv: "มูลค่าตลอดชีพของลูกค้า (LTV)",
      cac: "ต้นทุนการได้ลูกค้า 1 ราย (CAC)",
      ratio: "อัตราส่วน LTV:CAC",
      lifespan: "อายุการเป็นลูกค้าเฉลี่ย (เดือน)",
      paybackPeriod: "ระยะเวลาคืนทุน (เดือน)",
      healthStatus: "สถานะธุรกิจ",
      excellent: "ดีเยี่ยม (3:1 ขึ้นไป)",
      fair: "ปานกลาง (1:1 ถึง 3:1)",
      poor: "ต้องปรับปรุง (น้อยกว่า 1:1)",
      articleTitle: "LTV:CAC Ratio คืออะไร และทำไมถึงสำคัญต่อธุรกิจและสตาร์ทอัพ?",
      statusText: {
        'Excellent': 'ดีเยี่ยม (ยั่งยืน โตได้อีก)',
        'Fair': 'ปานกลาง (พออยู่ได้ แต่อาจโตช้า)',
        'Poor': 'อันตราย (ขาดทุนระยะยาว)'
      }
    },
    en: {
      title: "LTV to CAC Ratio Calculator",
      arpa: "Average Revenue Per Account/User (Monthly ARPA)",
      grossMargin: "Gross Margin (%)",
      churnRate: "Monthly Churn Rate (%)",
      marketingSpend: "Total Monthly Sales & Marketing Spend",
      newCustomers: "New Customers Acquired (Monthly)",
      results: "LTV:CAC Analysis",
      ltv: "Customer Lifetime Value (LTV)",
      cac: "Customer Acquisition Cost (CAC)",
      ratio: "LTV to CAC Ratio",
      lifespan: "Avg. Customer Lifespan (Months)",
      paybackPeriod: "Payback Period (Months)",
      healthStatus: "Business Health",
      excellent: "Excellent (3:1 or higher)",
      fair: "Fair (1:1 to 3:1)",
      poor: "Poor (Less than 1:1)",
      articleTitle: "What is LTV:CAC Ratio and Why is it Important for SaaS & Startups?",
      statusText: {
        'Excellent': 'Excellent (Sustainable & Scalable)',
        'Fair': 'Fair (Surviving but low growth)',
        'Poor': 'Danger (Losing money long-term)'
      }
    }
  };

  const langKey = lang === 'en' ? 'en' : 'th';
  const text = t[langKey];

  const getStatusColor = (status: string) => {
    if (status === 'Excellent') return 'text-green-400 bg-green-400/10 border-green-400/20';
    if (status === 'Fair') return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
          <Activity className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{text.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.arpa}</label>
            <input
              type="number"
              value={arpa}
              onChange={(e) => setArpa(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.grossMargin}</label>
            <input
              type="number"
              value={grossMargin}
              onChange={(e) => setGrossMargin(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.churnRate}</label>
            <input
              type="number"
              value={churnRate}
              onChange={(e) => setChurnRate(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              min="0.1"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.marketingSpend}</label>
            <input
              type="number"
              value={marketingSpend}
              onChange={(e) => setMarketingSpend(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.newCustomers}</label>
            <input
              type="number"
              value={newCustomers}
              onChange={(e) => setNewCustomers(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              min="1"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-800 to-purple-900 p-6 rounded-xl text-white shadow-lg">
            <h3 className="text-xl font-semibold mb-6 opacity-90">{text.results}</h3>
            
            <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm mb-6 text-center">
              <p className="text-sm opacity-80 mb-2">{text.ratio}</p>
              <div className="flex justify-center items-end gap-2">
                <span className="text-5xl font-bold">{formatNumber(results.ratio, 1)}</span>
                <span className="text-2xl font-medium text-gray-300 mb-1">: 1</span>
              </div>
              <div className={`mt-4 inline-block px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(results.healthStatus)}`}>
                {text.statusText[results.healthStatus as keyof typeof text.statusText]}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-sm opacity-80 mb-1">{text.ltv}</p>
                <p className="text-xl font-bold">{formatNumber(results.ltv)}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-sm opacity-80 mb-1">{text.cac}</p>
                <p className="text-xl font-bold">{formatNumber(results.cac)}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="opacity-80">{text.lifespan}</span>
                <span className="font-medium">{formatNumber(results.customerLifespan, 1)}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="opacity-80">{text.paybackPeriod}</span>
                <span className="font-medium">{formatNumber(results.paybackPeriod, 1)}</span>
              </div>
            </div>
            
            <div className="mt-4 text-xs opacity-70">
              * LTV = ARPA × Gross Margin / Churn Rate<br />
              * CAC = Marketing Spend / New Customers
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 text-gray-600 prose prose-purple max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{text.articleTitle}</h2>
        <p>
          ในการบริหารธุรกิจ โดยเฉพาะธุรกิจแบบสมัครสมาชิก (Subscription), SaaS (Software as a Service) หรืออีคอมเมิร์ซที่มีการซื้อซ้ำ ตัวชี้วัดที่สำคัญที่สุดตัวหนึ่งที่นักลงทุนระดับโลกมักถามถึงคืออัตราส่วน <strong>LTV:CAC (Customer Lifetime Value to Customer Acquisition Cost Ratio)</strong>
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">LTV และ CAC คืออะไร?</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>LTV (Lifetime Value) หรือ CLV:</strong> คือ "มูลค่าตลอดยุคการเป็นลูกค้า" หรือจำนวนเงินทั้งหมดที่ลูกค้าคนหนึ่งจะจ่ายให้เรา (หักต้นทุนสินค้าแล้ว) ตั้งแต่เริ่มเป็นลูกค้าจนถึงวันเลิกใช้บริการ เช่น ถ้าลูกค้าจ่ายเดือนละ 1,000 บาท และอยู่กับเราเฉลี่ย 20 เดือน LTV จะเท่ากับ 20,000 บาท (หากกำไร 100%)
          </li>
          <li>
            <strong>CAC (Customer Acquisition Cost):</strong> คือ "ต้นทุนในการได้ลูกค้าใหม่ 1 คน" คำนวณจากค่าใช้จ่ายด้านการตลาดและการขายทั้งหมด หารด้วยจำนวนลูกค้าใหม่ที่ได้มา เช่น จ่ายค่าแอด 50,000 บาท ได้ลูกค้ามา 100 คน CAC จะเท่ากับ 500 บาทต่อคน
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">ทำไม LTV:CAC Ratio จึงสำคัญ?</h3>
        <p>
          อัตราส่วน LTV:CAC เป็นการเปรียบเทียบว่า "มูลค่าที่ลูกค้ามอบให้เรานั้น คุ้มค่ากับเงินที่เราลงทุนไปเพื่อหาพวกเขามาหรือไม่" กฎเหล็ก (Rule of Thumb) ของธุรกิจสตาร์ทอัพที่ประสบความสำเร็จคือ:
        </p>
        
        <div className="bg-purple-50 p-5 rounded-xl my-4 border border-purple-100">
          <ul className="space-y-3">
            <li><strong className="text-green-700">อัตราส่วน 3:1 (Excellent)</strong> ถือเป็นมาตรฐานทองคำ (Gold Standard) ที่ธุรกิจแข็งแรงและควรมี หมายความว่าลงทุนหาลูกค้า 1 บาท ลูกค้าจะสร้างกำไรให้เรา 3 บาท เป็นอัตราส่วนที่ยั่งยืน</li>
            <li><strong className="text-yellow-700">อัตราส่วน 1:1 หรือต่ำกว่า (Poor)</strong> หมายความว่าคุณกำลังจ่ายเงินหาลูกค้าแพงกว่าที่ลูกค้าจะจ่ายให้คุณ ยิ่งขายยิ่งขาดทุน ต้องรีบแก้ไขด่วน</li>
            <li><strong className="text-blue-700">อัตราส่วนที่สูงเกินไป เช่น 5:1 ขึ้นไป</strong> แม้จะฟังดูดี แต่ในมุมการลงทุนอาจแปลว่าคุณ "ลงทุนน้อยเกินไป" ในการหาลูกค้าใหม่ ทำให้เติบโตช้ากว่าศักยภาพที่ควรจะเป็น คู่แข่งอาจชิงส่วนแบ่งการตลาดไปได้</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">วิธีปรับปรุง LTV:CAC Ratio ให้ดีขึ้น</h3>
        <p>หากอัตราส่วนของคุณต่ำกว่า 3:1 คุณสามารถแก้ไขได้สองทางหลักๆ:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>การเพิ่ม LTV:</strong> เพิ่มอัตราการรักษาลูกค้า (Retention) เพื่อลด Churn Rate ให้ลูกค้าอยู่กับเรานานขึ้น, ทำการ Upsell หรือ Cross-sell เพื่อเพิ่มยอดใช้จ่ายเฉลี่ยต่อเดือน (ARPA), หรือปรับปรุงกระบวนการทำงานเพื่อเพิ่มอัตรากำไร (Gross Margin)</li>
          <li><strong>การลด CAC:</strong> ปรับปรุงประสิทธิภาพของโฆษณา, ทำ Inbound Marketing, ทำ SEO, หรือสร้างระบบ Referral ให้ลูกค้าเก่าชวนลูกค้าใหม่ ซึ่งเป็นช่องทางที่ใช้เงินน้อยแต่ได้ผลลัพธ์สูง</li>
        </ol>
        <p className="mt-4">
          นอกจากนี้ <strong>Payback Period</strong> หรือระยะเวลาคืนทุน ก็มีความสำคัญไม่แพ้กัน ปกติธุรกิจที่แข็งแรงควรจะคืนทุนค่าหาลูกค้าภายใน 6-12 เดือน หากนานกว่านั้นกระแสเงินสดของคุณอาจจะตึงตัวมากเกินไป เครื่องมือของเราสามารถช่วยให้คุณติดตามตัวเลขเหล่านี้ได้อย่างรวดเร็วและนำไปวางแผนธุรกิจต่อไปได้อย่างมีประสิทธิภาพ
        </p>
      </div>
    </div>
  );
}

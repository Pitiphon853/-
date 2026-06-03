import React, { useState, useEffect } from 'react';
import { Calculator, Globe, Server, Activity, DollarSign, Map } from 'lucide-react';

export default function CdnCostCalculator({ lang = 'th' }: any) {
  const [trafficTb, setTrafficTb] = useState<number>(10);
  const [region, setRegion] = useState<string>('na-eu');
  const [httpsReq, setHttpsReq] = useState<number>(50); // in millions

  // Example representative pricing (e.g., CloudFront Standard tier approximation)
  const RATES: Record<string, { bandwidth: number, req: number }> = {
    'na-eu': { bandwidth: 0.085, req: 0.010 }, // per GB, per 10k reqs
    'asia': { bandwidth: 0.114, req: 0.012 }, // Asia (Singapore/Japan)
    'sa': { bandwidth: 0.250, req: 0.022 }    // South America
  };

  const [results, setResults] = useState({
    bandwidthCost: 0,
    requestsCost: 0,
    totalCost: 0
  });

  useEffect(() => {
    const rate = RATES[region];
    const trafficGb = trafficTb * 1024;
    
    // Tiered pricing logic simplified to flat rate for estimation
    const bandwidthCost = trafficGb * rate.bandwidth;
    
    // httpsReq is in millions. Rate is per 10,000.
    // So 1 million req = 100 * 10,000
    const reqMultipliers = httpsReq * 100;
    const requestsCost = reqMultipliers * rate.req;

    const totalCost = bandwidthCost + requestsCost;

    setResults({
      bandwidthCost,
      requestsCost,
      totalCost
    });
  }, [trafficTb, region, httpsReq]);

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const t = {
    th: {
      title: "เครื่องมือคำนวณ CDN Cost",
      desc: "ประเมินค่าใช้จ่าย Content Delivery Network รายเดือน (ราคาอ้างอิงมาตรฐานระดับโลก)",
      trafficTb: "แบนด์วิดท์รายเดือน (TB)",
      region: "ภูมิภาคหลักของผู้ชม (Primary Region)",
      httpsReq: "จำนวน HTTPS Requests (ล้านครั้ง)",
      regions: {
        'na-eu': "อเมริกาเหนือ / ยุโรป (NA/EU)",
        'asia': "เอเชีย (Asia - SG, JP, TH)",
        'sa': "อเมริกาใต้ (South America)"
      },
      results: "ประมาณการค่าใช้จ่ายรายเดือน",
      bandwidthCost: "ค่าแบนด์วิดท์ (Data Transfer)",
      requestsCost: "ค่ารีเควส (HTTPS Requests)",
      totalCost: "รวมค่าใช้จ่ายโดยประมาณ (USD/เดือน)",
      articleTitle: "CDN คืออะไร และมีวิธีคำนวณค่าบริการอย่างไร?",
      hint: "หมายเหตุ: นี่คือการประเมินเบื้องต้นด้วยอัตราเฉลี่ย ค่าบริการจริงขึ้นอยู่กับผู้ให้บริการ (เช่น CloudFront, Fastly, Akamai) และโครงสร้างส่วนลดแบบขั้นบันได"
    },
    en: {
      title: "CDN Cost Calculator",
      desc: "Estimate monthly Content Delivery Network costs (based on standard global rates)",
      trafficTb: "Monthly Bandwidth (TB)",
      region: "Primary Audience Region",
      httpsReq: "HTTPS Requests (Millions)",
      regions: {
        'na-eu': "North America / Europe",
        'asia': "Asia (SG, JP, etc.)",
        'sa': "South America"
      },
      results: "Estimated Monthly Costs",
      bandwidthCost: "Bandwidth Cost (Data Transfer)",
      requestsCost: "Requests Cost (HTTPS)",
      totalCost: "Total Estimated Cost (USD/month)",
      articleTitle: "What is a CDN and How Are the Costs Calculated?",
      hint: "Note: This is a basic estimation using average rates. Actual costs depend on your provider (e.g., CloudFront, Fastly) and tiered discounts."
    }
  };

  const langKey = lang === 'en' ? 'en' : 'th';
  const text = t[langKey];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
          <Globe className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{text.title}</h2>
          <p className="text-gray-500 mt-1 text-sm">{text.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.trafficTb}</label>
            <div className="relative">
              <input
                type="number"
                value={trafficTb}
                onChange={(e) => setTrafficTb(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                min="0"
                step="0.1"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm font-medium">
                TB
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">1 TB = 1,024 GB</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.region}</label>
            <div className="relative">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pl-10"
              >
                <option value="na-eu">{text.regions['na-eu']}</option>
                <option value="asia">{text.regions['asia']}</option>
                <option value="sa">{text.regions['sa']}</option>
              </select>
              <Map className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Pricing varies significantly by geographic region.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.httpsReq}</label>
            <div className="relative">
              <input
                type="number"
                value={httpsReq}
                onChange={(e) => setHttpsReq(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-16"
                min="0"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm font-medium">
                Million
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-700 to-indigo-900 p-6 rounded-xl text-white shadow-lg h-full">
            <h3 className="text-xl font-semibold mb-6 text-blue-200">{text.results}</h3>
            
            <div className="bg-white/10 p-6 rounded-xl border border-white/20 mb-6 text-center backdrop-blur-sm">
              <p className="text-sm text-blue-100 mb-2">{text.totalCost}</p>
              <div className="flex justify-center items-start">
                <span className="text-2xl mt-1 mr-1 text-blue-300">$</span>
                <span className="text-5xl font-bold">{formatNumber(results.totalCost)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div className="flex flex-col">
                  <span className="font-medium text-white/90">{text.bandwidthCost}</span>
                  <span className="text-xs text-white/50">{formatNumber(trafficTb * 1024, 0)} GB</span>
                </div>
                <span className="font-medium text-lg">${formatNumber(results.bandwidthCost)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div className="flex flex-col">
                  <span className="font-medium text-white/90">{text.requestsCost}</span>
                  <span className="text-xs text-white/50">{formatNumber(httpsReq)}M Requests</span>
                </div>
                <span className="font-medium text-lg">${formatNumber(results.requestsCost)}</span>
              </div>
            </div>
            
            <p className="text-xs text-white/50 mt-6 leading-relaxed">{text.hint}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 text-gray-600 prose prose-blue max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{text.articleTitle}</h2>
        <p>
          Content Delivery Network (CDN) คือเครือข่ายของเซิร์ฟเวอร์ที่กระจายอยู่ทั่วโลก ทำหน้าที่เก็บสำเนา (Cache) ของข้อมูลคงที่จากเว็บไซต์ของคุณ เช่น รูปภาพ ไฟล์วิดีโอ CSS หรือ JavaScript ไว้ใกล้กับผู้ใช้งานมากที่สุด เมื่อมีคนเปิดเว็บไซต์ ระบบจะดึงข้อมูลจากเซิร์ฟเวอร์ CDN ที่ใกล้ที่สุดแทนที่จะไปดึงจากเซิร์ฟเวอร์หลักของคุณโดยตรง
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ทำไมเว็บไซต์และแอปพลิเคชันควรใช้ CDN?</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>เพิ่มความเร็วในการโหลด:</strong> ข้อมูลถูกส่งจากเซิร์ฟเวอร์ที่ใกล้ผู้ใช้ที่สุด ลด Latency ทำให้หน้าเว็บโหลดเร็วขึ้นมาก ส่งผลดีต่อประสบการณ์ผู้ใช้ (UX) และ SEO</li>
          <li><strong>ลดภาระเซิร์ฟเวอร์หลัก (Origin Offload):</strong> แทนที่เซิร์ฟเวอร์ของคุณจะต้องทำงานหนักตอบทุกรีเควส CDN จะช่วยรับภาระกว่า 70-90% ของ Traffic ทั้งหมด ป้องกันเว็บล่มเมื่อมีคนเข้าใช้งานพร้อมกันจำนวนมาก</li>
          <li><strong>ลดต้นทุน Bandwidth:</strong> หลายครั้งการส่งข้อมูลออกจาก CDN มีราคาถูกกว่าการส่งข้อมูลออกจาก Cloud Server ต้นทางโดยตรง</li>
          <li><strong>เพิ่มความปลอดภัย:</strong> CDN หลายเจ้ามีระบบป้องกัน DDoS และ Web Application Firewall (WAF) รวมมาให้ด้วย</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">โครงสร้างการคิดค่าบริการของ CDN</h3>
        <p>CDN โดยทั่วไปคิดค่าบริการตาม 2 ปัจจัยหลัก:</p>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>Data Transfer Out (แบนด์วิดท์):</strong> <br />
            เป็นค่าใช้จ่ายหลักในการใช้ CDN โดยจะคิดตามปริมาณข้อมูล (GB หรือ TB) ที่ถูกส่งจาก Edge Server ไปยังผู้ใช้งาน <strong>ข้อควรระวัง:</strong> ราคาแบนด์วิดท์แตกต่างกันไปตามภูมิภาค (Region) อย่างมาก เช่น ผู้เข้าชมจากอเมริกาเหนือและยุโรปจะมีต้นทุนที่ถูกที่สุด ในขณะที่ผู้ชมจากอเมริกาใต้, แอฟริกา, หรือเอเชียแปซิฟิก (รวมถึงไทย) จะมีค่าบริการที่แพงกว่า
          </li>
          <li>
            <strong>HTTP/HTTPS Requests:</strong> <br />
            คิดเงินตามจำนวนครั้งที่มีการเรียกขอข้อมูล (ทุกๆ ภาพ ทุกๆ ไฟล์นับเป็น 1 Request) โดยมักจะคิดเงินเป็นหน่วยต่อ 10,000 ครั้ง ราคาของการใช้ HTTPS (มี SSL) มักจะสูงกว่า HTTP ธรรมดาเล็กน้อย แต่ปัจจุบันเว็บไซต์ส่วนใหญ่ควรใช้ HTTPS ทั้งหมดแล้ว
          </li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">ทางเลือกของ CDN สำหรับธุรกิจ</h3>
        <p>
          สำหรับเว็บไซต์ขนาดเล็กถึงขนาดกลาง การใช้บริการอย่าง <strong>Cloudflare</strong> ในแพ็กเกจฟรี (หรือ Pro $20/เดือน) มักจะครอบคลุมการใช้งานและไม่คิดค่าแบนด์วิดท์เพิ่มเติม แต่สำหรับองค์กรขนาดใหญ่หรือแอปพลิเคชันที่ต้องการปรับแต่งระดับลึก มักจะเลือกใช้บริการ Enterprise CDN อย่าง Amazon CloudFront, Akamai, Fastly, หรือ Google Cloud CDN ซึ่งจะคิดค่าบริการตามเครื่องมือคำนวณด้านบน
        </p>
      </div>
    </div>
  );
}

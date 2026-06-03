import React, { useState, useEffect } from 'react';
import { Calculator, Smartphone, Globe, Code, Clock, DollarSign, PenTool } from 'lucide-react';

export default function AppDevCostCalculator({ lang = 'th' }: any) {
  const [platformIOS, setPlatformIOS] = useState<boolean>(true);
  const [platformAndroid, setPlatformAndroid] = useState<boolean>(true);
  const [platformWeb, setPlatformWeb] = useState<boolean>(false);
  
  const [appSize, setAppSize] = useState<string>('medium'); // small, medium, large
  const [developerRate, setDeveloperRate] = useState<number>(50); // USD per hour

  const [results, setResults] = useState({
    estimatedHours: 0,
    totalCost: 0,
    estimatedMonths: 0
  });

  useEffect(() => {
    // Base hours for one platform depending on size
    const SIZE_HOURS: Record<string, number> = {
      'small': 300, // Basic features, UI
      'medium': 600, // DB, Auth, Payments, API
      'large': 1200 // Complex, Realtime, Custom animations
    };

    let baseHours = SIZE_HOURS[appSize];
    
    let platformMultiplier = 0;
    if (platformIOS) platformMultiplier += 1;
    if (platformAndroid) platformMultiplier += 1;
    if (platformWeb) platformMultiplier += 0.8; // Web might share backend or be slightly less complex as frontend, just estimation.
    
    // If multiple platforms, usually some backend/design synergy (don't strictly multiply by 2 or 3)
    let synergyDiscount = 1;
    if (platformMultiplier > 1 && platformMultiplier <= 2) synergyDiscount = 0.85; // 15% synergy
    if (platformMultiplier > 2) synergyDiscount = 0.75; // 25% synergy (shared APIs, designs)

    if (platformMultiplier === 0) {
      setResults({ estimatedHours: 0, totalCost: 0, estimatedMonths: 0 });
      return;
    }

    const totalHours = Math.round(baseHours * platformMultiplier * synergyDiscount);
    const totalCost = totalHours * developerRate;
    
    // Assume a standard full-time dev works ~160 hours a month. 
    // To get calendar months, assume 1 dev or a small team (e.g. dividing by 160 means 1 dev equivalent months).
    // Let's assume a team of 2 for medium/large.
    const teamSize = appSize === 'small' ? 1 : 2;
    const estimatedMonths = totalHours / (160 * teamSize);

    setResults({
      estimatedHours: totalHours,
      totalCost,
      estimatedMonths: Math.ceil(estimatedMonths * 10) / 10 // round to 1 decimal
    });
  }, [platformIOS, platformAndroid, platformWeb, appSize, developerRate]);

  const formatNumber = (num: number, decimals: number = 0) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const t = {
    th: {
      title: "เครื่องมือประเมินงบประมาณพัฒนาแอป (App Dev Cost)",
      desc: "ประเมินค่าใช้จ่ายและระยะเวลาคร่าวๆ สำหรับการจ้างพัฒนาแอปพลิเคชันหรือโปรแกรม",
      platforms: "แพลตฟอร์มที่ต้องการพัฒนา",
      ios: "iOS (Apple)",
      android: "Android (Google)",
      web: "Web App (Browser)",
      appSize: "ขนาดและความซับซ้อนของแอป",
      sizeSmall: "แอปขนาดเล็ก (ฟีเจอร์พื้นฐาน, ไม่มีระบบล็อกอินซับซ้อน)",
      sizeMedium: "แอปขนาดกลาง (มีระบบล็อกอิน, ฐานข้อมูล, ตัดบัตรเครดิต)",
      sizeLarge: "แอปขนาดใหญ่ (ซับซ้อนสูง, Real-time, แชท, ระบบหลังบ้านใหญ่)",
      hourlyRate: "เรทค่าจ้างนักพัฒนาต่อชั่วโมง (USD/ชั่วโมง)",
      rateHint: "เรทอินเดีย/เอเชีย ~$20-50 | เรทไทย ~$30-80 | เรทอเมริกา ~$100-150",
      results: "ผลการประเมิน (ประมาณการ)",
      estimatedHours: "ชั่วโมงทำงานโดยประมาณ",
      estimatedMonths: "ระยะเวลาทำงานโดยประมาณ",
      monthsUnit: "เดือน",
      totalCost: "งบประมาณรวมโดยประมาณ (USD)",
      articleTitle: "ปัจจัยที่ส่งผลต่อราคาและค่าใช้จ่ายในการพัฒนาแอปพลิเคชัน",
      hours: "ชั่วโมง",
    },
    en: {
      title: "App Development Cost Calculator",
      desc: "Estimate costs and timelines for building a custom mobile or web application.",
      platforms: "Target Platforms",
      ios: "iOS (Apple)",
      android: "Android (Google)",
      web: "Web App (Browser)",
      appSize: "App Size & Complexity",
      sizeSmall: "Small App (Basic features, simple UI)",
      sizeMedium: "Medium App (Auth, Database, Payments)",
      sizeLarge: "Large App (Complex, Real-time, Custom Backend)",
      hourlyRate: "Developer Hourly Rate (USD/hr)",
      rateHint: "Asia/India ~$20-50 | Eastern Europe ~$40-80 | US ~$100-150",
      results: "Estimation Results",
      estimatedHours: "Estimated Work Hours",
      estimatedMonths: "Estimated Timeline",
      monthsUnit: "Months",
      totalCost: "Total Estimated Cost (USD)",
      articleTitle: "Factors Influencing App Development Costs",
      hours: "Hours",
    }
  };

  const langKey = lang === 'en' ? 'en' : 'th';
  const text = t[langKey];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
        <div className="p-3 bg-teal-100 text-teal-600 rounded-xl">
          <Code className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{text.title}</h2>
          <p className="text-gray-500 mt-1 text-sm">{text.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8 bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-100">
          
          {/* Platforms */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">{text.platforms}</h3>
            <div className="flex flex-wrap gap-4">
              <label className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-colors ${platformIOS ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                <input type="checkbox" checked={platformIOS} onChange={(e) => setPlatformIOS(e.target.checked)} className="hidden" />
                <Smartphone className={`w-5 h-5 ${platformIOS ? 'text-teal-600' : 'text-gray-400'}`} />
                <span className={`font-medium ${platformIOS ? 'text-teal-700' : 'text-gray-600'}`}>{text.ios}</span>
              </label>
              
              <label className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-colors ${platformAndroid ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                <input type="checkbox" checked={platformAndroid} onChange={(e) => setPlatformAndroid(e.target.checked)} className="hidden" />
                <Smartphone className={`w-5 h-5 ${platformAndroid ? 'text-teal-600' : 'text-gray-400'}`} />
                <span className={`font-medium ${platformAndroid ? 'text-teal-700' : 'text-gray-600'}`}>{text.android}</span>
              </label>

              <label className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-colors ${platformWeb ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                <input type="checkbox" checked={platformWeb} onChange={(e) => setPlatformWeb(e.target.checked)} className="hidden" />
                <Globe className={`w-5 h-5 ${platformWeb ? 'text-teal-600' : 'text-gray-400'}`} />
                <span className={`font-medium ${platformWeb ? 'text-teal-700' : 'text-gray-600'}`}>{text.web}</span>
              </label>
            </div>
          </div>

          {/* App Size */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">{text.appSize}</h3>
            <div className="space-y-3">
              <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${appSize === 'small' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                <input type="radio" name="appSize" value="small" checked={appSize === 'small'} onChange={() => setAppSize('small')} className="mt-1 text-teal-600 focus:ring-teal-500" />
                <div>
                  <div className={`font-medium ${appSize === 'small' ? 'text-teal-800' : 'text-gray-700'}`}>Small</div>
                  <div className="text-sm text-gray-500 mt-1">{text.sizeSmall}</div>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${appSize === 'medium' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                <input type="radio" name="appSize" value="medium" checked={appSize === 'medium'} onChange={() => setAppSize('medium')} className="mt-1 text-teal-600 focus:ring-teal-500" />
                <div>
                  <div className={`font-medium ${appSize === 'medium' ? 'text-teal-800' : 'text-gray-700'}`}>Medium</div>
                  <div className="text-sm text-gray-500 mt-1">{text.sizeMedium}</div>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${appSize === 'large' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                <input type="radio" name="appSize" value="large" checked={appSize === 'large'} onChange={() => setAppSize('large')} className="mt-1 text-teal-600 focus:ring-teal-500" />
                <div>
                  <div className={`font-medium ${appSize === 'large' ? 'text-teal-800' : 'text-gray-700'}`}>Large</div>
                  <div className="text-sm text-gray-500 mt-1">{text.sizeLarge}</div>
                </div>
              </label>
            </div>
          </div>

          {/* Rate */}
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-3">{text.hourlyRate}</label>
            <div className="relative max-w-xs">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <DollarSign className="w-5 h-5" />
              </div>
              <input
                type="number"
                value={developerRate}
                onChange={(e) => setDeveloperRate(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-0 focus:border-teal-500 text-lg font-medium"
                min="1"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">{text.rateHint}</p>
          </div>

        </div>

        <div className="lg:col-span-5">
          <div className="bg-gradient-to-br from-teal-700 to-emerald-900 p-6 md:p-8 rounded-2xl text-white shadow-xl sticky top-6">
            <h3 className="text-xl font-semibold mb-8 text-teal-100 flex items-center gap-2">
              <PenTool className="w-5 h-5" /> {text.results}
            </h3>
            
            <div className="bg-white/10 p-6 rounded-xl border border-white/20 mb-8 backdrop-blur-sm text-center transform transition-transform hover:scale-105 duration-300">
              <p className="text-sm text-teal-100 mb-2">{text.totalCost}</p>
              <div className="flex justify-center items-start">
                <span className="text-3xl mt-1 mr-1 text-teal-300">$</span>
                <span className="text-5xl lg:text-6xl font-bold">{formatNumber(results.totalCost)}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Clock className="w-6 h-6 text-teal-200" />
                </div>
                <div>
                  <p className="text-sm text-teal-100">{text.estimatedHours}</p>
                  <p className="text-xl font-semibold">{formatNumber(results.estimatedHours)} {text.hours}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Calculator className="w-6 h-6 text-teal-200" />
                </div>
                <div>
                  <p className="text-sm text-teal-100">{text.estimatedMonths}</p>
                  <p className="text-xl font-semibold">~{results.estimatedMonths} {text.monthsUnit}</p>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-white/50 mt-8 text-center leading-relaxed">
              * การคำนวณนี้เป็นเพียงการประมาณการเบื้องต้น ค่าใช้จ่ายจริงขึ้นอยู่กับรายละเอียดของความต้องการ (Requirements), เทคโนโลยีที่เลือกใช้ (Native vs Cross-platform) และประสบการณ์ของทีมพัฒนา
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 text-gray-600 prose prose-teal max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{text.articleTitle}</h2>
        <p>
          "ทำแอปพลิเคชันราคาเท่าไหร่?" นี่คือคำถามแรกที่ลูกค้าหรือผู้บริหารมักจะถามซอฟต์แวร์เฮาส์ ซึ่งในความเป็นจริง คำตอบของคำถามนี้คล้ายกับการถามว่า "สร้างบ้านราคาเท่าไหร่?" เพราะมันขึ้นอยู่กับขนาด, จำนวนชั้น, วัสดุ, และทำเลที่คุณต้องการสร้าง 
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ตัวแปรสำคัญที่กำหนดราคาแอปพลิเคชัน</h3>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>แพลตฟอร์ม (Platforms):</strong><br />
            การพัฒนาแอปให้รองรับทั้ง iOS (iPhone) และ Android หากใช้วิธีพัฒนาแบบ <strong>Native</strong> (เขียนโค้ดแยกกัน เช่น Swift สำหรับ iOS และ Kotlin สำหรับ Android) จะมีค่าใช้จ่ายเกือบ 2 เท่า แต่ปัจจุบันนิยมใช้ <strong>Cross-Platform Frameworks</strong> (เช่น Flutter หรือ React Native) ซึ่งเขียนโค้ดครั้งเดียวแล้วแปลงลงได้ทั้งสองระบบ ช่วยประหยัดเวลาและงบประมาณได้กว่า 30-40%
          </li>
          <li>
            <strong>ความซับซ้อนของฟีเจอร์ (Feature Complexity):</strong><br />
            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li><strong>แอปขนาดเล็ก:</strong> แสดงผลข้อมูล (Information), มีหน้าจอไม่กี่หน้า, ไม่มีฐานข้อมูลซับซ้อน</li>
              <li><strong>แอปขนาดกลาง:</strong> มีระบบล็อกอินสมาชิก (Auth), มีฐานข้อมูล (Database), ระบบค้นหา, ตัดบัตรเครดิต หรือต่อ API ภายนอก</li>
              <li><strong>แอปขนาดใหญ่:</strong> ต้องรองรับผู้ใช้จำนวนมาก, มีระบบเรียลไทม์ (แชท, แผนที่ GPS แบบสดๆ), หรือระบบสตรีมมิ่งวิดีโอ การพัฒนาแอปสเกลนี้ต้องใช้ทีมงานหลายคนและสถาปัตยกรรมระบบหลังบ้าน (Backend) ที่แข็งแกร่ง</li>
            </ul>
          </li>
          <li>
            <strong>เรทค่าตัวนักพัฒนา (Developer Hourly Rates):</strong><br />
            ค่าจ้างนักพัฒนาโปรแกรมมีความแตกต่างกันอย่างมากตามภูมิภาค หากจ้างทีมพัฒนาในสหรัฐอเมริกาหรือยุโรปตะวันตก อาจตกอยู่ที่ $100 - $150 ต่อชั่วโมง ในขณะที่ทีมพัฒนาในเอเชียตะวันออกเฉียงใต้ (เช่น ไทย, เวียดนาม) หรืออินเดีย มักจะมีเรทราคาที่ย่อมเยากว่ามาก (ประมาณ $20 - $80 ต่อชั่วโมง)
          </li>
          <li>
            <strong>ค่าใช้จ่ายอื่นๆ (Hidden Costs):</strong><br />
            นอกจากค่าเขียนโค้ดแล้ว อย่าลืมเผื่องบประมาณสำหรับการออกแบบ UI/UX, ค่าเซิร์ฟเวอร์รายเดือน, ค่าฝากแอปบน App Store ($99/ปี) / Play Store ($25 ครั้งเดียว), และค่าบำรุงรักษา (Maintenance) รายปี ซึ่งโดยปกติจะคิดเป็น 15-20% ของงบพัฒนาทั้งหมด
          </li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">คำแนะนำก่อนเริ่มโปรเจกต์</h3>
        <p>
          เพื่อลดความเสี่ยงในการลงทุนด้วยเงินก้อนใหญ่ แนะนำให้เริ่มต้นด้วยการทำ <strong>MVP (Minimum Viable Product)</strong> หรือแอปเวอร์ชันแรกที่มีเฉพาะฟีเจอร์ที่สำคัญที่สุด (Core Features) ปล่อยให้กลุ่มผู้ใช้เป้าหมายทดลองใช้งานจริง เพื่อรับ Feedback และนำมาปรับปรุงก่อนที่จะลงทุนพัฒนาระบบเต็มรูปแบบต่อไป
        </p>
      </div>
    </div>
  );
}

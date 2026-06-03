import React, { useState } from 'react';
import { Smartphone, Globe, Code2, Wrench, BarChart3 } from 'lucide-react';

export default function PwaVsNativeAppCostCalculator({ lang }: any) {
  const [devRate, setDevRate] = useState<number>(50);
  const [pwaHours, setPwaHours] = useState<number>(300);
  const [iosHours, setIosHours] = useState<number>(400);
  const [androidHours, setAndroidHours] = useState<number>(400);
  const [maintenancePercent, setMaintenancePercent] = useState<number>(20);

  // Initial Costs
  const pwaCost = pwaHours * devRate;
  const nativeCost = (iosHours + androidHours) * devRate;

  // Yearly Maintenance Costs
  const pwaMaintenance = pwaCost * (maintenancePercent / 100);
  const nativeMaintenanceBase = nativeCost * (maintenancePercent / 100);
  const nativeAppStoreFees = 99; // Apple Developer Program per year
  const nativeTotalMaintenance = nativeMaintenanceBase + nativeAppStoreFees;

  const costDifference = nativeCost - pwaCost;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {lang === 'TH' ? 'เครื่องมือเปรียบเทียบต้นทุน PWA vs Native App' : 'PWA vs Native App Cost Calculator'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'TH' ? 'วิเคราะห์ความแตกต่างของงบประมาณในการสร้างแอปพลิเคชันมือถือ' : 'Analyze the budget differences when building mobile applications.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-500" />
              {lang === 'TH' ? 'ข้อมูลทีมพัฒนา (Development Info)' : 'Development Info'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {lang === 'TH' ? 'ค่าจ้างนักพัฒนาเฉลี่ย / ชั่วโมง ($)' : 'Avg Developer Rate / Hour ($)'}
                </label>
                <input
                  type="number"
                  value={devRate}
                  onChange={(e) => setDevRate(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {lang === 'TH' ? 'เวลาทำงาน (ชั่วโมง) สำหรับ PWA' : 'Est. Hours for PWA (Web)'}
                </label>
                <input
                  type="number"
                  value={pwaHours}
                  onChange={(e) => setPwaHours(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {lang === 'TH' ? 'สร้างครั้งเดียว ใช้งานได้ทุกระบบปฏิบัติการ' : 'Code once, runs everywhere.'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-indigo-500" />
              {lang === 'TH' ? 'เวลาทำงานสำหรับ Native App' : 'Est. Hours for Native App'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  iOS (Swift)
                </label>
                <input
                  type="number"
                  value={iosHours}
                  onChange={(e) => setIosHours(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Android (Kotlin)
                </label>
                <input
                  type="number"
                  value={androidHours}
                  onChange={(e) => setAndroidHours(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-gray-500" />
              {lang === 'TH' ? 'ค่าบำรุงรักษารายปี (% ของต้นทุนการสร้าง)' : 'Annual Maintenance (% of Initial Cost)'}
            </label>
            <input
              type="number"
              value={maintenancePercent}
              onChange={(e) => setMaintenancePercent(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-750 p-6 rounded-xl border border-blue-100 dark:border-gray-700 h-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              {lang === 'TH' ? 'ผลการเปรียบเทียบต้นทุน' : 'Cost Comparison'}
            </h3>

            <div className="space-y-6">
              {/* PWA Row */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Progressive Web App (PWA)
                  </span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">${pwaCost.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${(pwaCost / Math.max(pwaCost, nativeCost)) * 100}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-right">
                  + ${pwaMaintenance.toLocaleString()} {lang === 'TH' ? '/ ปี ค่าบำรุงรักษา' : '/ yr maintenance'}
                </p>
              </div>

              {/* Native Row */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
                    <Smartphone className="w-4 h-4" /> Native App (iOS + Android)
                  </span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">${nativeCost.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-indigo-500 h-3 rounded-full" style={{ width: `${(nativeCost / Math.max(pwaCost, nativeCost)) * 100}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-right">
                  + ${nativeTotalMaintenance.toLocaleString()} {lang === 'TH' ? '/ ปี ค่าบำรุงรักษา (รวมสโตร์)' : '/ yr maintenance & app store'}
                </p>
              </div>

              <div className="pt-6">
                <div className={`p-4 rounded-lg ${costDifference > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'}`}>
                  <p className="text-sm font-medium mb-1">
                    {lang === 'TH' ? 'ส่วนต่างค่าพัฒนาเริ่มต้น:' : 'Initial Development Difference:'}
                  </p>
                  <p className="text-2xl font-bold">
                    ${Math.abs(costDifference).toLocaleString()}
                  </p>
                  <p className="text-sm mt-1">
                    {costDifference > 0 
                      ? (lang === 'TH' ? 'PWA ประหยัดกว่า Native App' : 'PWA is cheaper than Native App') 
                      : (lang === 'TH' ? 'Native App ประหยัดกว่า (หายาก)' : 'Native App is cheaper (Rare)')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose dark:prose-invert max-w-none">
        <h2>เครื่องมือคำนวณเปรียบเทียบ PWA กับ Native App คืออะไร?</h2>
        <p>สำหรับสตาร์ทอัพ หรือองค์กรธุรกิจที่ต้องการก้าวเข้าสู่แพลตฟอร์มมือถือ คำถามแรกๆ ที่มักจะเจอเสมอคือ "เราควรเขียนแอปพลิเคชันแบบไหนดี?" ระหว่าง <strong>Native App</strong> (การเขียนแอปพลิเคชันแบบดั้งเดิม แยกโค้ดเบสระหว่าง iOS และ Android) หรือ <strong>Progressive Web App - PWA</strong> (การนำเทคโนโลยีเว็บไซต์มาทำให้ออกมาเหมือนแอปพลิเคชัน) เครื่องมือนี้ออกแบบมาเพื่อแปลงข้อถกเถียงเชิงเทคนิคให้กลายเป็นตัวเลขต้นทุนที่จับต้องได้ง่ายขึ้น</p>

        <h3>ความแตกต่างระหว่าง PWA และ Native App</h3>
        <ul>
          <li><strong>Native App:</strong> ถูกพัฒนาขึ้นด้วยภาษาเฉพาะของแต่ละแพลตฟอร์ม (เช่น Swift/Objective-C สำหรับ iOS และ Kotlin/Java สำหรับ Android) หรืออาจใช้เครื่องมือ Cross-platform อย่าง Flutter หรือ React Native ก็ได้ ข้อดีคือสามารถดึงประสิทธิภาพของฮาร์ดแวร์มือถือ (เช่น กล้อง, GPS, Bluetooth) มาใช้ได้อย่างเต็มที่ และมอบประสบการณ์ผู้ใช้งาน (UX) ที่ลื่นไหลที่สุด แต่ข้อเสียคือต้องเสียค่าใช้จ่ายในการจ้างทีมนักพัฒนาหลายทีม และต้องปฏิบัติตามกฎเกณฑ์อันเข้มงวดของ App Store และ Play Store</li>
          <li><strong>Progressive Web App (PWA):</strong> คือเว็บไซต์ที่ถูกพัฒนาด้วยเทคโนโลยีสมัยใหม่ ให้สามารถทำงานและมีหน้าตาเหมือนแอปพลิเคชันบนมือถือ ผู้ใช้สามารถ "ติดตั้ง" PWA ลงบนหน้าจอมือถือ (Add to Home Screen) ได้โดยไม่ต้องดาวน์โหลดผ่าน App Store ข้อดีคือ "เขียนครั้งเดียว ใช้ได้ทุกแพลตฟอร์ม" ทำให้ประหยัดต้นทุนไปได้กว่าครึ่ง นอกจากนี้ยังอัปเดตเวอร์ชันได้ทันทีโดยไม่ต้องรอให้แอปเปิลหรือกูเกิลอนุมัติ</li>
        </ul>

        <h3>ทำไมต้นทุนของ Native ถึงแพงกว่ามาก?</h3>
        <p>จากผลการคำนวณด้านบน คุณจะสังเกตเห็นช่องว่างของต้นทุนที่ค่อนข้างกว้าง สาเหตุหลักมาจาก:</p>
        <ol>
          <li><strong>ทวีคูณจำนวนชั่วโมงทำงาน:</strong> หากคุณทำ Native App แท้ๆ คุณจะต้องเขียนโค้ดและออกแบบระบบใหม่ทั้งหมด 2 รอบ (รอบแรกสำหรับฝั่งแอปเปิล รอบสองสำหรับฝั่งหุ่นยนต์เขียว) ทำให้เสียเวลาและค่าแรงเพิ่มขึ้นเกือบ 2 เท่า</li>
          <li><strong>ค่าบำรุงรักษาระยะยาว (Maintenance):</strong> กฎทั่วไปคือคุณต้องเตรียมงบประมาณประมาณ 15-20% ของต้นทุนตั้งต้นไว้สำหรับการบำรุงรักษาและแก้บั๊กในแต่ละปี ในกรณีของ Native หาก iOS มีการอัปเดตระบบปฏิบัติการใหม่ (เช่น iOS 17 ไป iOS 18) คุณมักจะต้องรื้อโค้ดมาปรับปรุงเพื่อให้เข้ากันได้ ซึ่งค่าใช้จ่ายตรงนี้จะเบิ้ล 2 เท่าตามไปด้วย</li>
          <li><strong>ค่าธรรมเนียม App Store:</strong> Apple Developer Program มีค่าใช้จ่าย $99 ต่อปี (และ Google Play คิดค่าแรกเข้า $25) แม้จะเป็นจำนวนเงินที่ไม่เยอะสำหรับบริษัทใหญ่ แต่สำหรับโปรเจกต์ขนาดเล็ก ก็นับเป็นค่าใช้จ่ายแฝงที่ PWA ไม่มี</li>
        </ol>

        <h3>ธุรกิจของคุณเหมาะกับแบบไหน?</h3>
        <p><strong>คุณควรเลือก PWA หาก:</strong> คุณมีงบประมาณจำกัด หรือต้องการทดสอบตลาดอย่างรวดเร็ว (MVP) แอปพลิเคชันของคุณเน้นการแสดงผลข้อมูลเป็นหลัก (Content-heavy) ไม่ได้ต้องการเข้าถึงฟีเจอร์ระดับฮาร์ดแวร์ลึกๆ เช่น เกม 3D แบบเรียลไทม์ และต้องการให้ผู้ใช้งานค้นหาคุณเจอบน Google Search (เพราะ PWA มีพื้นฐานมาจากเว็บไซต์ ทำให้ทำ SEO ได้)</p>
        <p><strong>คุณควรเลือก Native App หาก:</strong> แอปพลิเคชันของคุณต้องการความลื่นไหลสูงระดับพรีเมียม, ต้องการเชื่อมต่อระบบ Bluetooth / AR / เลนส์กล้องประสิทธิภาพสูง, หรือผลิตภัณฑ์หลักของธุรกิจคุณคือตัวแอปพลิเคชันนั้นเอง (Core Product) ซึ่งการมีไอคอนปรากฏอยู่ใน App Store จะช่วยเสริมสร้างความน่าเชื่อถือให้แบรนด์ได้ดีกว่า</p>
      </div>
    </div>
  );
}

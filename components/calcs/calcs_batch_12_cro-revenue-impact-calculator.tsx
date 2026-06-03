import React, { useState } from 'react';
import { TrendingUp, Users, MousePointerClick, DollarSign, Rocket } from 'lucide-react';

export default function CroRevenueImpactCalculator({ lang }: any) {
  const [visitors, setVisitors] = useState<number>(50000);
  const [currentCr, setCurrentCr] = useState<number>(1.5);
  const [aov, setAov] = useState<number>(100);
  const [targetCr, setTargetCr] = useState<number>(2.0);

  const currentConversions = Math.round(visitors * (currentCr / 100));
  const currentRevenue = currentConversions * aov;

  const targetConversions = Math.round(visitors * (targetCr / 100));
  const targetRevenue = targetConversions * aov;

  const revenueUplift = targetRevenue - currentRevenue;
  const conversionsUplift = targetConversions - currentConversions;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {lang === 'TH' ? 'เครื่องมือคำนวณผลกระทบรายได้จาก CRO' : 'CRO Revenue Impact Calculator'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'TH' ? 'ประเมินรายได้ที่เพิ่มขึ้นจากการปรับปรุง Conversion Rate เพียงเล็กน้อย' : 'Estimate the revenue uplift from making small improvements to your Conversion Rate.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              {lang === 'TH' ? 'ข้อมูลปัจจุบัน (Current Metrics)' : 'Current Metrics'}
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'TH' ? 'จำนวนผู้เข้าชมต่อเดือน (Monthly Visitors)' : 'Monthly Visitors'}
              </label>
              <input
                type="number"
                value={visitors}
                onChange={(e) => setVisitors(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {lang === 'TH' ? 'อัตรา Conversion ปัจจุบัน (%)' : 'Current CR (%)'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={currentCr}
                  onChange={(e) => setCurrentCr(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {lang === 'TH' ? 'มูลค่าเฉลี่ยต่อออเดอร์ ($)' : 'Average Order Value ($)'}
                </label>
                <input
                  type="number"
                  value={aov}
                  onChange={(e) => setAov(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              {lang === 'TH' ? 'เป้าหมายการปรับปรุง (Optimization Goal)' : 'Optimization Goal'}
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'TH' ? 'อัตรา Conversion เป้าหมาย (%)' : 'Target CR (%)'}
              </label>
              <input
                type="number"
                step="0.1"
                value={targetCr}
                onChange={(e) => setTargetCr(Number(e.target.value))}
                className="w-full px-4 py-2 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-600 dark:bg-gray-800 dark:text-white"
              />
              <p className="text-xs text-orange-600 mt-1">
                {lang === 'TH' ? 'ลองเพิ่มค่านี้เพียง 0.5% เพื่อดูผลลัพธ์ที่เปลี่ยนไป' : 'Try increasing this by just 0.5% to see the impact.'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-gray-800 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-300 mb-6 flex items-center gap-2">
              <Rocket className="w-6 h-6" />
              {lang === 'TH' ? 'ผลกระทบเชิงรายได้' : 'Revenue Impact'}
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
                <span className="text-gray-600 dark:text-gray-300 text-sm">{lang === 'TH' ? 'รายได้ปัจจุบันต่อเดือน' : 'Current Monthly Revenue'}</span>
                <span className="font-semibold text-gray-900 dark:text-white">${currentRevenue.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
                <span className="text-gray-600 dark:text-gray-300 text-sm">{lang === 'TH' ? 'รายได้เป้าหมายต่อเดือน' : 'Target Monthly Revenue'}</span>
                <span className="font-semibold text-gray-900 dark:text-white">${targetRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="p-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white shadow-md">
              <p className="text-orange-100 text-sm font-medium mb-1">
                {lang === 'TH' ? 'รายได้ที่เพิ่มขึ้น (Revenue Uplift)' : 'Monthly Revenue Uplift'}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-8 h-8" />
                <span className="text-4xl font-bold">+${revenueUplift.toLocaleString()}</span>
              </div>
              <p className="text-sm bg-black/20 inline-block px-3 py-1 rounded-full">
                {lang === 'TH' ? `สร้างยอดขายเพิ่มได้อีก ${conversionsUplift.toLocaleString()} ออเดอร์` : `Generates ${conversionsUplift.toLocaleString()} more sales`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose dark:prose-invert max-w-none">
        <h2>เครื่องมือคำนวณรายได้จาก CRO คืออะไร?</h2>
        <p>CRO (Conversion Rate Optimization) หรือการเพิ่มประสิทธิภาพอัตราการแปลง คือกระบวนการปรับปรุงเว็บไซต์หรือหน้า Landing Page เพื่อกระตุ้นให้ผู้เข้าชม (Visitors) ทำสิ่งที่ธุรกิจต้องการให้สำเร็จมากขึ้น ไม่ว่าจะเป็นการกดสั่งซื้อสินค้า, กรอกแบบฟอร์มลงทะเบียน, หรือสมัครสมาชิก โดย <strong>CRO Revenue Impact Calculator</strong> จะช่วยจำลองผลลัพธ์ให้คุณเห็นว่า หากคุณปรับอัตราการแปลงนี้เพิ่มขึ้นได้เพียงเปอร์เซ็นต์เดียว รายได้ของบริษัทจะพุ่งสูงขึ้นมากแค่ไหน</p>

        <h3>ทำไม CRO ถึงมีความสำคัญเหนือกว่าการหาทราฟฟิกใหม่?</h3>
        <p>นักการตลาดส่วนใหญ่มักจะหมกมุ่นอยู่กับการยิงแอด หรือการอัดงบโฆษณาเพื่อหาคนเข้าเว็บไซต์ให้ได้มากที่สุด (เพิ่ม Top of Funnel) แต่นั่นหมายถึง "ต้นทุน" ที่เพิ่มเป็นเงาตามตัว ในทางกลับกัน การทำ CRO เป็นการทำงานกับปริมาณทราฟฟิกที่คุณมีอยู่แล้ว (Existing Traffic) ให้เกิดประสิทธิภาพสูงสุด ข้อดีหลักๆ คือ:</p>
        <ul>
          <li><strong>เพิ่มกำไรสุทธิโดยไม่เพิ่มค่าโฆษณา:</strong> หากเว็บไซต์คุณมีคนเข้า 10,000 คนต่อเดือน และมีคนซื้อ 1% (100 ออเดอร์) การเพิ่มคนซื้อเป็น 2% (200 ออเดอร์) โดยใช้เครื่องมือ A/B Testing จะทำให้รายได้คุณเพิ่มขึ้น 2 เท่าทันที โดยที่งบยิงแอดเท่าเดิม</li>
          <li><strong>เอาชนะคู่แข่งที่มีต้นทุนการหาลูกค้า (CAC) สูงกว่า:</strong> หากเว็บไซต์คุณ Convert ลูกค้าได้เก่งกว่า คุณจะสามารถสู้ราคาประมูลค่าโฆษณา (Bidding) ต่อคลิกได้แพงกว่าคู่แข่ง ซึ่งแปลว่าคุณสามารถผูกขาดส่วนแบ่งการตลาดในระยะยาวได้</li>
          <li><strong>มอบประสบการณ์ผู้ใช้ (UX) ที่ดีขึ้น:</strong> การทำ CRO มักเกี่ยวข้องกับการทำให้เว็บไซต์โหลดไวขึ้น, ลดขั้นตอนการชำระเงินให้สั้นลง, และทำให้เว็บไซต์ดูน่าเชื่อถือ ซึ่งผลพลอยได้คือความพึงพอใจของลูกค้าที่สูงขึ้นด้วย</li>
        </ul>

        <h3>กระบวนการทำ CRO เริ่มต้นอย่างไร?</h3>
        <p>การเพิ่ม Conversion Rate ไม่ใช่เรื่องของการนั่งเทียนเดา หรือแค่การเปลี่ยน "ปุ่มสีเขียวเป็นปุ่มสีแดง" แต่ต้องอาศัยหลักการทางวิทยาศาสตร์และข้อมูล (Data-driven) ดังนี้:</p>
        <ol>
          <li><strong>วิเคราะห์ปัญหา (Identify Bottlenecks):</strong> ใช้เครื่องมืออย่าง Google Analytics หรือ Heatmap (เช่น Hotjar, Clarity) เพื่อดูว่าผู้ใช้งานคลิกที่ไหน หรือเลื่อนเมาส์ลงมาลึกแค่ไหน ทำไมพวกเขาถึงทิ้งตะกร้าสินค้าไป</li>
          <li><strong>ตั้งสมมติฐาน (Formulate Hypotheses):</strong> เช่น "ถ้าเราระบุชัดเจนว่า 'ส่งฟรีไม่มีขั้นต่ำ' ไว้ใต้ปุ่มสั่งซื้อ ลูกค้าจะตัดสินใจง่ายขึ้นและยอดขายจะเพิ่มขึ้น"</li>
          <li><strong>ทดสอบแบบ A/B (A/B Testing):</strong> สร้างหน้าเว็บไซต์สองเวอร์ชันให้ผู้เข้าชมสุ่มเห็น (เวอร์ชัน A แบบเดิม, เวอร์ชัน B แบบใหม่) แล้วเก็บข้อมูลเปรียบเทียบว่าเวอร์ชันไหนสร้างยอดขายได้มากกว่ากัน</li>
          <li><strong>นำไปใช้งานจริงและทำซ้ำ (Implement & Iterate):</strong> เมื่อได้ผู้ชนะ (Winner) ก็นำเวอร์ชันนั้นไปใช้จริง แล้วเริ่มมองหาจุดอื่นของเว็บไซต์เพื่อทำการทดสอบต่อไป</li>
        </ol>

        <h3>เป้าหมาย Conversion Rate ควรอยู่ที่เท่าไหร่?</h3>
        <p>อัตรา Conversion ในฝันของแต่ละอุตสาหกรรมนั้นต่างกัน โดยทั่วไปแล้ว e-Commerce จะเฉลี่ยอยู่ที่ประมาณ 1% - 3% แต่หากเป็นธุรกิจ B2B หรือบริการที่ต้องให้ลูกค้ากรอก Lead Form อาจจะสูงถึง 5% - 10% อย่างไรก็ตาม กฎเหล็กของ CRO คือ "อย่าพยายามไปแข่งกับค่าเฉลี่ยของคนอื่น แต่จงแข่งกับเส้นฐาน (Baseline) ปัจจุบันของคุณเอง" เพียงแค่คุณขยับจาก 1% ไป 1.5% นั่นก็หมายถึงยอดขายที่เติบโตขึ้น 50% แล้ว ลองใช้เครื่องมือคำนวณด้านบนเพื่อดูตัวเลขแห่งความสำเร็จนั้นด้วยตาคุณเอง!</p>
      </div>
    </div>
  );
}

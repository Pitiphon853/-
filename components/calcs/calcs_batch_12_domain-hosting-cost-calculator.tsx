import React, { useState } from 'react';
import { Server, Globe, HardDrive, Shield, Calculator } from 'lucide-react';

export default function DomainHostingCostCalculator({ lang }: any) {
  const [domainCost, setDomainCost] = useState<number>(15);
  const [hostingMonthly, setHostingMonthly] = useState<number>(20);
  const [sslYearly, setSslYearly] = useState<number>(0);
  const [backupMonthly, setBackupMonthly] = useState<number>(5);
  const [emailMonthly, setEmailMonthly] = useState<number>(6);

  const totalMonthly = hostingMonthly + backupMonthly + emailMonthly;
  const totalYearlyRecurring = (totalMonthly * 12) + domainCost + sslYearly;
  const threeYearCost = totalYearlyRecurring * 3;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {lang === 'TH' ? 'เครื่องมือคำนวณค่าใช้จ่าย Domain & Hosting' : 'Domain & Hosting Cost Calculator'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'TH' ? 'ประเมินต้นทุนพื้นฐานในการดูแลเว็บไซต์ต่อปีเพื่อวางแผนงบประมาณ' : 'Estimate base annual costs for running and maintaining your website.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" />
              {lang === 'TH' ? 'ค่าใช้จ่ายรายปี (Yearly Costs)' : 'Yearly Costs'}
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'TH' ? 'ค่าต่ออายุโดเมนเนม / ปี ($)' : 'Domain Renewal / Year ($)'}
              </label>
              <input
                type="number"
                value={domainCost}
                onChange={(e) => setDomainCost(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'TH' ? 'ค่าบริการ SSL Certificate / ปี ($)' : 'SSL Certificate / Year ($)'}
              </label>
              <input
                type="number"
                value={sslYearly}
                onChange={(e) => setSslYearly(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'TH' ? 'ใส่ 0 หากใช้ฟรีจาก Hosting' : 'Enter 0 if using Free Let\'s Encrypt'}
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-500" />
              {lang === 'TH' ? 'ค่าใช้จ่ายรายเดือน (Monthly Costs)' : 'Monthly Costs'}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'TH' ? 'ค่าบริการ Web Hosting / เดือน ($)' : 'Web Hosting / Month ($)'}
              </label>
              <input
                type="number"
                value={hostingMonthly}
                onChange={(e) => setHostingMonthly(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                  <HardDrive className="w-4 h-4" /> {lang === 'TH' ? 'ค่าสำรองข้อมูล/เดือน' : 'Backup/Month'}
                </label>
                <input
                  type="number"
                  value={backupMonthly}
                  onChange={(e) => setBackupMonthly(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                  <Shield className="w-4 h-4" /> {lang === 'TH' ? 'ค่าอีเมลองค์กร/เดือน' : 'Biz Email/Month'}
                </label>
                <input
                  type="number"
                  value={emailMonthly}
                  onChange={(e) => setEmailMonthly(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-gray-800 p-6 rounded-xl space-y-6">
          <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-300 mb-4 flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            {lang === 'TH' ? 'สรุปงบประมาณรวม' : 'Total Budget Summary'}
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
              <span className="text-gray-600 dark:text-gray-300">{lang === 'TH' ? 'รวมค่าใช้จ่ายรายเดือน' : 'Total Monthly'}</span>
              <span className="font-bold text-gray-900 dark:text-white">${totalMonthly.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-purple-100 dark:bg-gray-600 rounded-lg border-l-4 border-purple-500">
              <span className="font-semibold text-purple-900 dark:text-purple-100">
                {lang === 'TH' ? 'ค่าใช้จ่ายรวมต่อปี (1 Year)' : 'Total Yearly Cost'}
              </span>
              <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                ${totalYearlyRecurring.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
              <span className="text-gray-600 dark:text-gray-300">
                {lang === 'TH' ? 'คาดการณ์งบประมาณ 3 ปี' : '3-Year Projection'}
              </span>
              <span className="font-bold text-gray-900 dark:text-white">${threeYearCost.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700/50">
            <strong>{lang === 'TH' ? 'ข้อควรระวัง:' : 'Note:'}</strong> {lang === 'TH' ? 'ผู้ให้บริการ Hosting ส่วนใหญ่มักจัดโปรโมชั่นลดราคาพิเศษในปีแรก และจะปรับราคาเป็นเรทปกติ (Renewal Rate) ที่สูงกว่าเดิมในปีถัดไป ควรตรวจสอบราคาต่ออายุเสมอ' : 'Hosting providers often offer heavy discounts for the first year. Always check the regular renewal rates to avoid surprise costs in year two.'}
          </div>
        </div>
      </div>

      <div className="mt-12 prose dark:prose-invert max-w-none">
        <h2>เครื่องมือคำนวณค่าใช้จ่าย Domain และ Hosting คืออะไร?</h2>
        <p>การสร้างเว็บไซต์หนึ่งเว็บ ไม่ใช่เพียงแค่การจ่ายเงินค่าออกแบบหรือพัฒนาโปรแกรมเพียงครั้งเดียว (One-time cost) แต่มี "ค่าบำรุงรักษารายปี (Recurring Costs)" ที่ต้องจ่ายเป็นประจำเพื่อให้เว็บไซต์ของคุณออนไลน์อยู่บนอินเทอร์เน็ตได้อย่างต่อเนื่อง เครื่องมือคำนวณนี้ออกแบบมาเพื่อช่วยให้ธุรกิจและฟรีแลนซ์สามารถประมาณการค่าใช้จ่ายพื้นฐานเหล่านี้ได้อย่างแม่นยำ เพื่อวางแผนงบประมาณล่วงหน้าได้อย่างมีประสิทธิภาพ</p>

        <h3>ส่วนประกอบหลักของค่าใช้จ่ายเว็บไซต์</h3>
        <p>โครงสร้างพื้นฐานที่ทำให้เว็บไซต์เข้าถึงได้ประกอบด้วย 3 องค์ประกอบหลัก ซึ่งมีราคาแตกต่างกันไปตามผู้ให้บริการและขนาดของสเปคที่คุณเลือกใช้งาน:</p>
        <ul>
          <li><strong>Domain Name (ชื่อโดเมน):</strong> คือ "ที่อยู่" ของเว็บไซต์ของคุณบนโลกอินเทอร์เน็ต (เช่น www.yourcompany.com) ค่าจดทะเบียนจะคิดเป็นรายปี นามสกุลที่ได้รับความนิยมอย่าง .com, .net มักจะอยู่ที่ประมาณ $10-$20 ต่อปี ในขณะที่นามสกุลพิเศษหรือโดเมนระดับประเทศ (เช่น .co.th) อาจจะมีราคาสูงกว่าและการจดทะเบียนมีขั้นตอนยุ่งยากกว่าเล็กน้อย</li>
          <li><strong>Web Hosting (พื้นที่จัดเก็บเว็บไซต์):</strong> เปรียบเสมือน "ที่ดิน" ที่คุณใช้สร้างบ้าน โฮสติ้งคือเซิร์ฟเวอร์ที่เก็บข้อมูลไฟล์ รูปภาพ และโค้ดของเว็บไซต์คุณ ประเภทของโฮสติ้งมีผลต่อราคาโดยตรง:
            <ul>
              <li><em>Shared Hosting:</em> ราคาถูกที่สุด (มักจะต่ำกว่า $10/เดือน) เหมาะสำหรับเว็บขนาดเล็ก แต่คุณต้องแชร์ทรัพยากรร่วมกับเว็บอื่น หากเว็บเพื่อนบ้านมีทราฟฟิกพุ่งสูง เว็บของคุณก็อาจจะช้าไปด้วย</li>
              <li><em>VPS Hosting (Virtual Private Server):</em> คุณจะได้พื้นที่และทรัพยากรที่เป็นส่วนตัวมากขึ้น ราคากลางๆ (ประมาณ $20-$50/เดือน) เหมาะสำหรับธุรกิจขนาดกลาง</li>
              <li><em>Dedicated / Cloud Hosting:</em> ทรงพลังที่สุดและแพงที่สุด เหมาะสำหรับเว็บ E-commerce ระดับใหญ่ หรือแอปพลิเคชันที่ต้องการประมวลผลสูง</li>
            </ul>
          </li>
          <li><strong>SSL Certificate:</strong> ใบรับรองความปลอดภัยที่ทำให้เว็บไซต์ของคุณเปลี่ยนจาก HTTP เป็น HTTPS เพื่อป้องกันข้อมูลลูกค้าถูกโจรกรรม ปัจจุบันโฮสติ้งหลายแห่งแถม SSL ฟรี (Let's Encrypt) แต่หากองค์กรต้องการใบรับรองแบบพิเศษ (EV SSL) ก็จะมีค่าใช้จ่ายเพิ่มเติมหลักร้อยดอลลาร์ต่อปี</li>
        </ul>

        <h3>ค่าใช้จ่ายแอบแฝง (Hidden Costs) ที่ควรระวัง</h3>
        <p>หลายคนตกหลุมพรางคำโฆษณา "โฮสติ้งเพียง $1.99 ต่อเดือน" แต่นั่นมักจะเป็นกลยุทธ์ทางการตลาดที่มาพร้อมกับเงื่อนไขบางอย่าง เช่น:</p>
        <ol>
          <li><strong>ราคาต่ออายุ (Renewal Rates) มักจะแพงหูฉี่:</strong> โปรโมชั่นมักจะถูกมากในปีแรก แต่เมื่อขึ้นปีที่ 2 ราคาอาจเด้งขึ้นไปถึง 3-5 เท่า! คุณจึงควรประเมินราคาที่ Renewal Rate เสมอ</li>
          <li><strong>ค่าบริการสำรองข้อมูล (Automated Backups):</strong> โฮสติ้งบางแห่งไม่ได้แบคอัปข้อมูลให้ฟรี และจะคิดค่าบริการเสริม หากเว็บไซต์คุณล่มและไม่มีแบคอัป ค่ากู้ข้อมูลจะมหาศาลกว่าค่าบริการรายเดือนมาก</li>
          <li><strong>อีเมลบริษัท (Professional Email):</strong> หลายแพลตฟอร์มไม่ได้แถมระบบอีเมล @yourdomain.com ให้ หรือให้พื้นที่น้อยมากจนคุณต้องย้ายไปใช้ Google Workspace หรือ Microsoft 365 ซึ่งมีค่าใช้จ่ายเพิ่มเติมเป็นรายผู้ใช้ (Per user per month)</li>
        </ol>

        <h3>คำแนะนำสำหรับผู้ประกอบการ</h3>
        <p>การเลือกโฮสติ้งไม่ควรดูแค่ "ราคาที่ถูกที่สุด" เพราะถ้าเว็บล่มหรือโหลดช้า ยอดขายที่คุณเสียไปจะแพงกว่าค่าโฮสติ้งที่คุณประหยัดได้หลายเท่าตัว สำหรับธุรกิจ SME แนะนำให้เริ่มต้นกับ Cloud Hosting ระดับเริ่มต้น (เช่น DigitalOcean, Vultr หรือโฮสต์คลาวด์ท้องถิ่น) หรือ Managed WordPress Hosting เพื่อความเสถียร จากนั้นเมื่อทราฟฟิกเพิ่มขึ้น จึงค่อยกดขยายสเปค (Scale up) ภายหลัง</p>
      </div>
    </div>
  );
}

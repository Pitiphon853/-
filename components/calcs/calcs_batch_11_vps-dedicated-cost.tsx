import React, { useState, useEffect } from 'react';
import { Calculator, Server, HardDrive, Cpu, DollarSign } from 'lucide-react';

export default function VpsDedicatedCostCalculator({ lang = 'th' }: any) {
  const [serverCount, setServerCount] = useState<number>(1);
  const [monthlyCost, setMonthlyCost] = useState<number>(40);
  const [setupFee, setSetupFee] = useState<number>(0);
  const [controlPanelCost, setControlPanelCost] = useState<number>(15); // e.g. cPanel or DirectAdmin
  const [backupCost, setBackupCost] = useState<number>(10);
  const [managementFee, setManagementFee] = useState<number>(0);

  const [results, setResults] = useState({
    monthlyTotal: 0,
    yearlyTotal: 0,
    firstYearTotal: 0,
    baseCostYearly: 0,
    addonsYearly: 0
  });

  useEffect(() => {
    // Costs per server per month
    const perServerMonthly = monthlyCost + controlPanelCost + backupCost + managementFee;
    
    // Total for all servers
    const totalMonthly = perServerMonthly * serverCount;
    
    // Setup fee is one-time per server
    const totalSetup = setupFee * serverCount;
    
    // Yearly total (without setup)
    const yearlyTotal = totalMonthly * 12;
    
    // First year includes setup
    const firstYearTotal = yearlyTotal + totalSetup;

    const baseCostYearly = (monthlyCost * serverCount) * 12;
    const addonsYearly = yearlyTotal - baseCostYearly;

    setResults({
      monthlyTotal: totalMonthly,
      yearlyTotal,
      firstYearTotal,
      baseCostYearly,
      addonsYearly
    });
  }, [serverCount, monthlyCost, setupFee, controlPanelCost, backupCost, managementFee]);

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const t = {
    th: {
      title: "เครื่องมือคำนวณค่าใช้จ่าย VPS / Dedicated Server",
      desc: "ประเมินค่าเช่าเซิร์ฟเวอร์รายเดือน/รายปี พร้อมรวมค่า Control Panel, Backup และบริการจัดการ",
      serverCount: "จำนวนเซิร์ฟเวอร์ (เครื่อง)",
      monthlyCost: "ค่าเช่าเซิร์ฟเวอร์พื้นฐานต่อเดือน (Base Cost)",
      setupFee: "ค่าติดตั้งระบบเริ่มต้น (Setup Fee) ต่อเครื่อง",
      controlPanelCost: "ค่าลิขสิทธิ์ Control Panel (เช่น cPanel/Plesk) ต่อเดือน",
      backupCost: "ค่าบริการ Backup & Storage ต่อเดือน",
      managementFee: "ค่าบริการดูแลระบบ (Server Management/Admin) ต่อเดือน",
      results: "สรุปค่าใช้จ่ายรวม",
      monthlyTotal: "ค่าใช้จ่ายรายเดือนสุทธิ",
      firstYearTotal: "ค่าใช้จ่ายรวมปีแรก (รวมค่าติดตั้ง)",
      yearlyTotal: "ค่าใช้จ่ายรายปี (ปีต่อไป)",
      baseCostYearly: "ค่าเช่าฮาร์ดแวร์รายปี",
      addonsYearly: "ค่า Add-ons & Service รายปี",
      articleTitle: "VPS และ Dedicated Server คืออะไร? มีต้นทุนแอบแฝงอะไรบ้าง?",
      currency: "USD"
    },
    en: {
      title: "VPS & Dedicated Server Cost Calculator",
      desc: "Estimate monthly and yearly server rental costs including Control Panel, Backups, and Management fees.",
      serverCount: "Number of Servers",
      monthlyCost: "Base Server Cost (Monthly per server)",
      setupFee: "One-time Setup Fee (per server)",
      controlPanelCost: "Control Panel License (e.g. cPanel/Plesk) Monthly",
      backupCost: "Backup & Storage Service Monthly",
      managementFee: "Server Management/Admin Fee Monthly",
      results: "Cost Summary",
      monthlyTotal: "Net Monthly Cost",
      firstYearTotal: "First Year Total (includes setup)",
      yearlyTotal: "Yearly Recurring Cost",
      baseCostYearly: "Yearly Hardware Base Cost",
      addonsYearly: "Yearly Add-ons & Management",
      articleTitle: "VPS vs Dedicated Server: What are the hidden costs?",
      currency: "USD"
    }
  };

  const langKey = lang === 'en' ? 'en' : 'th';
  const text = t[langKey];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
        <div className="p-3 bg-zinc-100 text-zinc-700 rounded-xl">
          <Server className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{text.title}</h2>
          <p className="text-gray-500 mt-1 text-sm">{text.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">{text.serverCount}</label>
              <input
                type="number"
                value={serverCount}
                onChange={(e) => setServerCount(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                min="1"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">{text.setupFee}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  value={setupFee}
                  onChange={(e) => setSetupFee(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <HardDrive className="w-4 h-4" /> Recurring Costs (Per Server)
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{text.monthlyCost}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    value={monthlyCost}
                    onChange={(e) => setMonthlyCost(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{text.controlPanelCost}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    value={controlPanelCost}
                    onChange={(e) => setControlPanelCost(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{text.backupCost}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    value={backupCost}
                    onChange={(e) => setBackupCost(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{text.managementFee}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    value={managementFee}
                    onChange={(e) => setManagementFee(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-800 p-6 rounded-xl text-white shadow-lg sticky top-6">
            <h3 className="text-xl font-semibold mb-6 text-zinc-100">{text.results}</h3>
            
            <div className="bg-zinc-900/60 p-6 rounded-xl border border-zinc-700 mb-6">
              <p className="text-sm text-zinc-400 mb-1">{text.monthlyTotal}</p>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold text-white">${formatNumber(results.monthlyTotal)}</span>
                <span className="text-sm text-zinc-500 mb-1">/mo</span>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-zinc-700/30 p-4 rounded-lg">
                <p className="text-zinc-400 mb-1">{text.firstYearTotal}</p>
                <p className="text-xl font-semibold text-zinc-100">${formatNumber(results.firstYearTotal)}</p>
                <p className="text-xs text-zinc-500 mt-1">Includes setup fees</p>
              </div>

              <div className="bg-zinc-700/30 p-4 rounded-lg">
                <p className="text-zinc-400 mb-1">{text.yearlyTotal}</p>
                <p className="text-xl font-semibold text-zinc-100">${formatNumber(results.yearlyTotal)}</p>
                <div className="flex justify-between text-xs text-zinc-500 mt-2 border-t border-zinc-600/50 pt-2">
                  <span>Base: ${formatNumber(results.baseCostYearly)}</span>
                  <span>Add-ons: ${formatNumber(results.addonsYearly)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 text-gray-600 prose prose-zinc max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{text.articleTitle}</h2>
        <p>
          ในการเลือกโฮสติ้งสำหรับเว็บไซต์หรือแอปพลิเคชัน ธุรกิจส่วนใหญ่มักเริ่มต้นจาก Shared Hosting และขยับขยายมาเป็น <strong>VPS (Virtual Private Server)</strong> หรือ <strong>Dedicated Server</strong> เมื่อมีผู้ใช้งานมากขึ้น ความแตกต่างของทั้งสองแบบคือ:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>VPS (Virtual Private Server):</strong> เป็นการจำลองเซิร์ฟเวอร์เสมือนบนเครื่องเซิร์ฟเวอร์จริงขนาดใหญ่ คุณจะได้ทรัพยากร (CPU, RAM) ที่ถูกจำกัดสิทธิ์ไว้เฉพาะคุณ ราคาถูกและยืดหยุ่นสูง (มักเริ่มต้นที่ $5 - $50 ต่อเดือน)</li>
          <li><strong>Dedicated Server:</strong> คือการเช่าเครื่องเซิร์ฟเวอร์ฮาร์ดแวร์จริงๆ ทั้งเครื่อง (Bare Metal) คุณจะควบคุมได้ 100% และได้ประสิทธิภาพสูงสุด เหมาะสำหรับเว็บที่มีทราฟฟิกสูงมากหรือรันฐานข้อมูลขนาดใหญ่ (มักเริ่มต้นที่ $100 - $500+ ต่อเดือน)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">ระวัง "ต้นทุนแอบแฝง (Hidden Costs)" ในการเช่าเซิร์ฟเวอร์</h3>
        <p>
          หลายคนดูแค่ "ราคา Base Cost" ของเซิร์ฟเวอร์ (เช่น เดือนละ $20) แล้วคิดว่านั่นคือรายจ่ายทั้งหมด แต่ในความเป็นจริง การรันระบบให้สมบูรณ์และปลอดภัยนั้นมีรายจ่ายแอบแฝงที่เรียกว่า Add-ons ที่บางครั้งอาจจะแพงกว่าค่าเช่าเครื่องเสียอีก:
        </p>
        
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>ค่าลิขสิทธิ์ Control Panel (cPanel, Plesk, DirectAdmin):</strong> 
            หากคุณไม่ถนัดใช้ Command Line การมีหน้าต่างจัดการช่วยให้ชีวิตง่ายขึ้นมาก แต่ปัจจุบันค่าไลเซนส์ของซอฟต์แวร์เหล่านี้มีการปรับราคาขึ้นบ่อยครั้ง (เช่น cPanel อาจจะตกเดือนละ $15 - $40 ขึ้นอยู่กับจำนวนบัญชีผู้ใช้)
          </li>
          <li>
            <strong>ค่าระบบสำรองข้อมูล (Backup / Storage):</strong> 
            ข้อมูลคือหัวใจสำคัญ คุณไม่ควรเก็บ Backup ไว้บนเครื่องเดียวกันเด็ดขาด ผู้ให้บริการมักมีบริการ Automated Backup หรือ Cloud Storage แยกต่างหาก ซึ่งจะคิดเงินตามความจุ
          </li>
          <li>
            <strong>ค่าบริการดูแลระบบ (Server Management / Sysadmin):</strong> 
            เซิร์ฟเวอร์แบบ "Unmanaged" แปลว่าผู้ให้บริการแค่เปิดเครื่องให้ติดแล้วให้พาสเวิร์ดคุณ หากเซิร์ฟเวอร์ล่ม โดนแฮ็ก หรือต้องอัปเดตความปลอดภัย คุณต้องจัดการเองทั้งหมด หากคุณไม่มีทักษะ ต้องซื้อแพ็กเกจ "Managed Service" หรือจ้างฟรีแลนซ์ดูแลรายเดือน ซึ่งอาจตกเดือนละหลักพันถึงหลักหมื่นบาท
          </li>
          <li>
            <strong>ค่า Setup Fee:</strong> 
            มักจะพบใน Dedicated Server เนื่องจากต้องมีคนไปเสียบสายและติดตั้งฮาร์ดแวร์ใน Data Center (มักจะเป็นการจ่ายครั้งแรกครั้งเดียว)
          </li>
        </ol>

        <p className="mt-4">
          เมื่อคุณใช้เครื่องมือคำนวณด้านบน คุณจะเห็นภาพรวมของรายจ่าย <strong>"Total Cost of Ownership"</strong> ตลอดทั้งปี ซึ่งช่วยให้คุณสามารถนำตัวเลขไปตัดสินใจเทียบกับการย้ายขึ้น Cloud แบบเต็มตัว (เช่น AWS, GCP) หรือการใช้บริการ Platform as a Service (PaaS) ว่าแบบไหนจะคุ้มค่าต่อธุรกิจคุณมากที่สุด
        </p>
      </div>
    </div>
  );
}

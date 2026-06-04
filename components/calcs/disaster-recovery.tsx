import React, { useState } from 'react';
import { ShieldAlert, Server, HardDrive, Users, CheckSquare, DollarSign, Calculator, AlertTriangle } from 'lucide-react';

export default function DisasterRecoveryCalculator({ lang }: any) {
  const isTH = lang === 'th';
  
  // Costs per year
  const [infraCost, setInfraCost] = useState<number | ''>(500000);
  const [softwareCost, setSoftwareCost] = useState<number | ''>(150000);
  const [staffCost, setStaffCost] = useState<number | ''>(200000);
  const [testingCost, setTestingCost] = useState<number | ''>(50000);

  const getNum = (val: number | '') => (typeof val === 'number' ? val : 0);

  const totalYearlyCost = getNum(infraCost) + getNum(softwareCost) + getNum(staffCost) + getNum(testingCost);
  const monthlyCost = totalYearlyCost / 12;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(isTH ? 'th-TH' : 'en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  const getPercentage = (cost: number) => {
    if (totalYearlyCost === 0) return 0;
    return ((cost / totalYearlyCost) * 100).toFixed(1);
  };

  const costBreakdown = [
    { label: isTH ? 'โครงสร้างพื้นฐาน (เซิร์ฟเวอร์, สตอเรจ, คลาวด์)' : 'Infrastructure (Servers, Storage, Cloud)', val: getNum(infraCost), icon: Server, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/50', border: 'border-blue-200 dark:border-blue-800' },
    { label: isTH ? 'ซอฟต์แวร์สำรองข้อมูล (ไลเซนส์)' : 'Backup Software & Licenses', val: getNum(softwareCost), icon: HardDrive, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/50', border: 'border-purple-200 dark:border-purple-800' },
    { label: isTH ? 'บุคลากรและการจัดการ (IT Staff)' : 'Personnel & Management', val: getNum(staffCost), icon: Users, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/50', border: 'border-orange-200 dark:border-orange-800' },
    { label: isTH ? 'การซ้อมและทดสอบแผน DR (Drills)' : 'DR Testing & Drills', val: getNum(testingCost), icon: CheckSquare, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/50', border: 'border-green-200 dark:border-green-800' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-colors duration-200">
      <div className="flex items-center gap-3 mb-6 border-b pb-4 dark:border-gray-700">
        <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-xl">
          <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {isTH ? 'เครื่องคำนวณต้นทุน Disaster Recovery' : 'Disaster Recovery Cost Calculator'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isTH 
              ? 'ประเมินต้นทุนรวมรายปีสำหรับการทำระบบสำรองฉุกเฉิน (DR Site)'
              : 'Estimate the total annual cost of maintaining a Disaster Recovery solution'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b dark:border-gray-700 pb-2">
            {isTH ? 'กรอกต้นทุนรายปี (บาท/ปี)' : 'Enter Annual Costs (Per Year)'}
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isTH ? 'ค่าโครงสร้างพื้นฐาน DR (เช่น ค่าเช่าตู้ Rack, เซิร์ฟเวอร์, Cloud DRaaS)' : 'DR Infrastructure (Servers, Colocation, Cloud DRaaS)'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Server className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                min="0"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500"
                value={infraCost}
                onChange={(e) => setInfraCost(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isTH ? 'ค่าซอฟต์แวร์สำรองข้อมูล (เช่น Veeam, Commvault License)' : 'Backup Software & Licenses'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HardDrive className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                min="0"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500"
                value={softwareCost}
                onChange={(e) => setSoftwareCost(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isTH ? 'ค่าบุคลากร IT และการบริหารจัดการดูแลระบบ DR' : 'IT Staff & Management Costs for DR'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                min="0"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500"
                value={staffCost}
                onChange={(e) => setStaffCost(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isTH ? 'ค่าใช้จ่ายในการซ้อมแผน DR (DR Testing & Drill) ต่อปี' : 'Annual DR Testing & Drill Costs'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CheckSquare className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                min="0"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500"
                value={testingCost}
                onChange={(e) => setTestingCost(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border-2 border-red-100 dark:border-red-900/50 flex-1">
            <h3 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              {isTH ? 'สรุปต้นทุนรวมการทำ DR' : 'Total DR Cost Summary'}
            </h3>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {isTH ? 'ต้นทุนเฉลี่ยรายเดือน' : 'Average Monthly Cost'}
              </p>
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {formatCurrency(monthlyCost)}
              </div>
            </div>
            
            <div className="pt-6 border-t border-red-200 dark:border-red-800/50">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 uppercase font-medium">
                {isTH ? 'ต้นทุนรวมต่อปี (Total Annual Cost)' : 'Total Annual Cost'}
              </p>
              <div className="text-4xl font-black text-red-600 dark:text-red-400">
                {formatCurrency(totalYearlyCost)}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-700">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {isTH ? 'สัดส่วนต้นทุน (%)' : 'Cost Breakdown (%)'}
            </h4>
            <div className="space-y-3">
              {costBreakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="truncate max-w-[150px] sm:max-w-[180px]">{item.label}</span>
                  </div>
                  <div className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    {getPercentage(item.val)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="mt-12 prose prose-red dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            การทำ Disaster Recovery (DR) คืออะไร และทำไมต้นทุนถึงมักบานปลาย?
          </h3>
          <p className="mb-4">
            <strong>Disaster Recovery (DR)</strong> หรือการกู้คืนระบบจากภัยพิบัติ เปรียบเสมือนการซื้อ "ประกันภัย" ให้กับระบบไอทีขององค์กร หน้าที่หลักคือการทำให้มั่นใจว่าหากไซต์หลัก (Primary Site) เกิดล่มสลายไป ไม่ว่าจะจากไฟไหม้ น้ำท่วม ไฟดับยาวนาน หรือการโจมตีจาก Ransomware องค์กรจะมีไซต์สำรอง (DR Site) ที่พร้อมจะสลับการทำงาน (Failover) ให้ธุรกิจดำเนินต่อไปได้โดยมีข้อมูลสูญหายและเวลาหยุดชะงักน้อยที่สุด
          </p>
          <p className="mb-4">
            อย่างไรก็ตาม การตั้งศูนย์ DR มักจะมาพร้อมกับ <strong>"ต้นทุนที่สูงมาก"</strong> หลายองค์กรมักตกหลุมพรางโดยคิดเพียงแค่ค่าซื้อเซิร์ฟเวอร์สำรองเท่านั้น แต่ในความเป็นจริง ต้นทุนของการทำ DR เป็นแบบ TCO (Total Cost of Ownership) ที่ประกอบไปด้วยหลายส่วน
          </p>
          
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            องค์ประกอบหลักของต้นทุน Disaster Recovery
          </h4>
          <ol className="list-decimal pl-6 space-y-4 mb-6">
            <li>
              <strong>ค่าโครงสร้างพื้นฐาน (Infrastructure):</strong> เป็นต้นทุนส่วนที่ใหญ่ที่สุด หากเป็น DR แบบดั้งเดิม (On-Premise) คุณต้องเช่าพื้นที่ศูนย์ข้อมูลแห่งที่สอง (Colocation), ซื้อเซิร์ฟเวอร์, สตอเรจ, สวิตช์เครือข่าย และจ่ายค่าวงจรเชื่อมต่อความเร็วสูง (Leased Line) เพื่อโอนถ่ายข้อมูลระหว่าง 2 ไซต์
            </li>
            <li>
              <strong>ค่าซอฟต์แวร์และลิขสิทธิ์ (Software Licenses):</strong> แค่มีฮาร์ดแวร์ยังกู้คืนไม่ได้ คุณต้องมีซอฟต์แวร์ในการทำ Replication ข้อมูล (เช่น Veeam, VMware Site Recovery, Commvault) ซึ่งซอฟต์แวร์ระดับ Enterprise เหล่านี้มักคิดค่าไลเซนส์เป็นรายปีหรือตามจำนวนข้อมูล/VM
            </li>
            <li>
              <strong>ค่าบุคลากร (IT Staff & Management):</strong> ระบบ DR ไม่ใช่ตั้งค่าเสร็จแล้วจบไป ต้องมีทีมวิศวกรคอยดูแลความเรียบร้อย ตรวจสอบสถานะการคัดลอกข้อมูลทุกวัน และดูแลอัปเดตระบบให้สอดคล้องกับฝั่งโปรดักชั่น (Production Site) อยู่เสมอ
            </li>
            <li>
              <strong>ค่าซ้อมแผนฉุกเฉิน (DR Testing / Drill):</strong> DR ที่ดีคือ DR ที่กู้ได้จริง องค์กรมาตรฐานควรมีการทดสอบซ้อมแผน DR (DR Drill) อย่างน้อยปีละ 1-2 ครั้ง ซึ่งการซ้อมแต่ละครั้งต้องใช้เวลา การวางแผน และการทำงานล่วงเวลาของพนักงานหลายฝ่าย
            </li>
          </ol>

          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            แนวทางลดต้นทุนด้วย DRaaS (Disaster Recovery as a Service)
          </h4>
          <p className="mb-4">
            หากประเมินดูแล้วพบว่าการสร้าง DR Site ของตัวเองมีค่าใช้จ่าย (CAPEX) ที่สูงเกินกว่างบประมาณ ปัจจุบันมีทางเลือกที่เรียกว่า <strong>DRaaS (Disaster Recovery as a Service)</strong> บนระบบ Cloud (เช่น AWS Elastic Disaster Recovery, Azure Site Recovery หรือผู้ให้บริการคลาวด์ในประเทศ)
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>เปลี่ยนค่าใช้จ่ายก้อนใหญ่ (CAPEX) ไปเป็นค่าบริการรายเดือน/รายปี (OPEX)</li>
            <li>ไม่ต้องเช่าตู้ Rack ไม่ต้องซื้อฮาร์ดแวร์ทิ้งไว้เฉยๆ (ในสถานการณ์ปกติจะเสียเฉพาะค่าเก็บข้อมูลและค่าซอฟต์แวร์)</li>
            <li>จะเสียค่าประมวลผล (Compute Cost) เต็มจำนวน ก็ต่อเมื่อเกิดภัยพิบัติและสั่งเปิดระบบขึ้นมาใช้งานจริงๆ เท่านั้น</li>
            <li>ลดภาระของทีมงาน IT ในการดูแลฮาร์ดแวร์ฝั่ง DR</li>
          </ul>

          <div className="mt-6 bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border border-red-100 dark:border-red-800/30">
            <p className="text-gray-700 dark:text-gray-300 italic">
              <strong>บทสรุป:</strong> ต้นทุนในการทำระบบ Disaster Recovery นั้นมีราคาสูง แต่สิ่งที่ <strong>"แพงกว่า"</strong> คือการที่องค์กรปล่อยให้ระบบล่มสลายโดยไม่มีแผนสำรอง ซึ่งอาจหมายถึงการปิดกิจการถาวร การประเมินต้นทุนรวมตามความเป็นจริงด้วยเครื่องมือด้านบน จะช่วยให้ผู้บริหารตัดสินใจเลือกรูปแบบ DR ที่เหมาะสมกับจุดคุ้มทุนและความเสี่ยงของธุรกิจได้อย่างแม่นยำที่สุด
            </p>
          </div>
        </article>
      )}
    </div>
  );
}

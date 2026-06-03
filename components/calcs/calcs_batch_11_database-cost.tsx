import React, { useState, useEffect } from 'react';
import { Calculator, Database, HardDrive, Clock, Activity } from 'lucide-react';

export default function DatabaseCostCalculator({ lang = 'th' }: any) {
  const [instanceCostPerHour, setInstanceCostPerHour] = useState<number>(0.05);
  const [hoursPerMonth, setHoursPerMonth] = useState<number>(730);
  const [storageGb, setStorageGb] = useState<number>(100);
  const [backupGb, setBackupGb] = useState<number>(100);
  const [dataTransferGb, setDataTransferGb] = useState<number>(50);

  // Standard rates roughly based on RDS Multi-AZ / Single-AZ typical pricing
  const RATES = {
    storage: 0.115, // $0.115 per GB-month
    backup: 0.095,  // $0.095 per GB-month
    transferOut: 0.09 // $0.09 per GB
  };

  const [results, setResults] = useState({
    instanceCost: 0,
    storageCost: 0,
    backupCost: 0,
    transferCost: 0,
    totalMonthlyCost: 0
  });

  useEffect(() => {
    const instanceCost = instanceCostPerHour * hoursPerMonth;
    const storageCost = storageGb * RATES.storage;
    const backupCost = backupGb * RATES.backup;
    const transferCost = dataTransferGb * RATES.transferOut;
    
    const totalMonthlyCost = instanceCost + storageCost + backupCost + transferCost;

    setResults({
      instanceCost,
      storageCost,
      backupCost,
      transferCost,
      totalMonthlyCost
    });
  }, [instanceCostPerHour, hoursPerMonth, storageGb, backupGb, dataTransferGb]);

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const t = {
    th: {
      title: "เครื่องมือคำนวณค่าบริการ Managed Database",
      desc: "ประเมินค่าใช้จ่ายสำหรับ Managed DB บนคลาวด์ (เช่น Amazon RDS, Google Cloud SQL)",
      instanceCost: "ค่าบริการ Instance ต่อชั่วโมง (USD)",
      hoursPerMonth: "จำนวนชั่วโมงที่เปิดใช้งานต่อเดือน (ปกติ 730 ชม.)",
      storageGb: "ขนาด Storage ฐานข้อมูล (GB)",
      backupGb: "ขนาด Storage สำหรับ Backup (GB)",
      dataTransferGb: "Data Transfer Out (GB/เดือน)",
      results: "ประมาณการค่าใช้จ่ายต่อเดือน",
      costInstance: "ค่า Compute Instance",
      costStorage: "ค่าพื้นที่เก็บข้อมูล (Storage)",
      costBackup: "ค่าพื้นที่สำรองข้อมูล (Backup)",
      costTransfer: "ค่าแบนด์วิดท์ (Data Transfer)",
      totalMonthlyCost: "รวมค่าใช้จ่ายต่อเดือน (USD)",
      articleTitle: "วิธีคิดค่าใช้จ่ายสำหรับ Managed Database (เช่น RDS, Cloud SQL)",
      hint: "ราคาอ้างอิงใช้อัตรามาตรฐาน (Storage ~$0.115/GB, Backup ~$0.095/GB, Egress ~$0.09/GB) อาจเปลี่ยนแปลงตาม Region และผู้ให้บริการ"
    },
    en: {
      title: "Managed Database Cost Calculator",
      desc: "Estimate costs for Cloud Managed DBs (e.g., Amazon RDS, Google Cloud SQL)",
      instanceCost: "Instance Hourly Cost (USD)",
      hoursPerMonth: "Hours active per month (Avg 730 hrs)",
      storageGb: "Database Storage Size (GB)",
      backupGb: "Backup Storage Size (GB)",
      dataTransferGb: "Data Transfer Out (GB/month)",
      results: "Estimated Monthly Costs",
      costInstance: "Compute Instance Cost",
      costStorage: "Storage Cost",
      costBackup: "Backup Cost",
      costTransfer: "Data Transfer Cost",
      totalMonthlyCost: "Total Monthly Cost (USD)",
      articleTitle: "Understanding Managed Database Costs (RDS, Cloud SQL)",
      hint: "References use standard rates (Storage ~$0.115/GB, Backup ~$0.095/GB, Egress ~$0.09/GB) and may vary by Region and Provider."
    }
  };

  const langKey = lang === 'en' ? 'en' : 'th';
  const text = t[langKey];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
        <div className="p-3 bg-red-100 text-red-600 rounded-xl">
          <Database className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{text.title}</h2>
          <p className="text-gray-500 mt-1 text-sm">{text.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.instanceCost}</label>
            <div className="relative">
              <input
                type="number"
                value={instanceCostPerHour}
                onChange={(e) => setInstanceCostPerHour(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 pl-10"
                min="0"
                step="0.01"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">$</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Example: db.t3.micro is ~$0.017/hr, db.m5.large is ~$0.24/hr</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.hoursPerMonth}</label>
            <div className="relative">
              <input
                type="number"
                value={hoursPerMonth}
                onChange={(e) => setHoursPerMonth(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 pl-10"
                min="0"
                max="744"
              />
              <Clock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.storageGb}</label>
            <div className="relative">
              <input
                type="number"
                value={storageGb}
                onChange={(e) => setStorageGb(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 pl-10"
                min="0"
              />
              <HardDrive className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.backupGb}</label>
            <div className="relative">
              <input
                type="number"
                value={backupGb}
                onChange={(e) => setBackupGb(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 pl-10"
                min="0"
              />
              <HardDrive className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.dataTransferGb}</label>
            <div className="relative">
              <input
                type="number"
                value={dataTransferGb}
                onChange={(e) => setDataTransferGb(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 pl-10"
                min="0"
              />
              <Activity className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-600 to-rose-800 p-6 rounded-xl text-white shadow-lg h-full">
            <h3 className="text-xl font-semibold mb-6 opacity-90">{text.results}</h3>
            
            <div className="bg-white/10 p-6 rounded-xl border border-white/20 mb-6 text-center backdrop-blur-sm">
              <p className="text-sm opacity-80 mb-2">{text.totalMonthlyCost}</p>
              <div className="flex justify-center items-start">
                <span className="text-2xl mt-1 mr-1 text-red-200">$</span>
                <span className="text-5xl font-bold">{formatNumber(results.totalMonthlyCost)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="opacity-90">{text.costInstance}</span>
                <span className="font-medium">${formatNumber(results.instanceCost)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="opacity-90">{text.costStorage}</span>
                <span className="font-medium">${formatNumber(results.storageCost)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="opacity-90">{text.costBackup}</span>
                <span className="font-medium">${formatNumber(results.backupCost)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="opacity-90">{text.costTransfer}</span>
                <span className="font-medium">${formatNumber(results.transferCost)}</span>
              </div>
            </div>
            
            <p className="text-xs text-white/50 mt-6 leading-relaxed">{text.hint}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 text-gray-600 prose prose-red max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{text.articleTitle}</h2>
        <p>
          สำหรับผู้พัฒนาแอปพลิเคชันหรือดูแลระบบเซิร์ฟเวอร์บนระบบคลาวด์ การเลือกใช้บริการ Managed Database (เช่น Amazon RDS, Google Cloud SQL, หรือ Azure SQL Database) ได้รับความนิยมสูงมาก เนื่องจากช่วยลดภาระหน้าที่ของผู้ดูแลระบบ (SysAdmin / DBA) ไม่ว่าจะเป็นการแพตช์ซอฟต์แวร์ อัปเดตความปลอดภัย การตั้งค่าการสำรองข้อมูล (Automated Backups) และการทำ High Availability (เช่น Multi-AZ)
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">แต่ความสะดวกสบาย...ก็มาพร้อมกับราคาที่ต้องจ่าย</h3>
        <p>
          การคิดราคาของ Managed Database มักจะมีองค์ประกอบมากกว่าการเปิดใช้งาน Compute Instance ธรรมดา นี่คือสิ่งที่ต้องระวัง:
        </p>
        
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>ค่า Compute Instance (รายชั่วโมง):</strong> <br />
            เป็นค่าใช้จ่ายหลักของคุณ คิดจากขนาดของ CPU และ RAM ของเซิร์ฟเวอร์ฐานข้อมูลที่คุณเลือก ยิ่งสเปคแรงราคาก็ยิ่งสูง (มักจะแพงกว่าการเช่า EC2 หรือ Compute ธรรมดาที่มีสเปคเท่ากันประมาณ 30-50% เพื่อเป็นค่าไลเซนส์ซอฟต์แวร์และการจัดการ) หมายเหตุ: 1 เดือนโดยเฉลี่ยจะมี 730 ชั่วโมง
          </li>
          <li>
            <strong>ค่า Storage:</strong> <br />
            พื้นที่สำหรับเก็บข้อมูลและ Index ของคุณ ราคาของ Storage มักจะคิดแยกต่างหากและมักมีราคาแพงกว่า Storage มาตรฐาน (ประมาณ $0.115 - $0.125 ต่อ GB ต่อเดือน สำหรับ SSD ทั่วไป)
          </li>
          <li>
            <strong>ค่า Backup Storage:</strong> <br />
            เมื่อคุณเปิดโหมด Automated Backup ระบบจะต้องใช้พื้นที่ในการเก็บ Snapshot ของฐานข้อมูล (คิดเป็น GB-Month) แม้หลายที่จะให้โควต้าฟรีมาบ้างตามขนาด Storage หลัก แต่ถ้าคุณเก็บย้อนหลังนานหลายวัน ค่าใช้จ่ายส่วนนี้จะบานปลายได้อย่างรวดเร็ว
          </li>
          <li>
            <strong>ค่า Data Transfer (Egress):</strong> <br />
            ถ้าเซิร์ฟเวอร์แอปพลิเคชัน (App Server) ของคุณอยู่ใน Region หรือ VPC เดียวกันกับฐานข้อมูล การดึงข้อมูลมักจะฟรี แต่ถ้าคุณมีการดึงข้อมูลออกจากฐานข้อมูลข้าม Region หรือออกไปยังอินเทอร์เน็ตโดยตรง คุณจะต้องเสียค่า Data Transfer Out ด้วย
          </li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">ทางเลือกเพื่อประหยัดต้นทุน</h3>
        <p>
          หากแอปพลิเคชันของคุณไม่ได้มีการใช้งานตลอด 24 ชั่วโมง (เช่น ระบบภายในบริษัท) คุณสามารถเขียนสคริปต์ให้ปิดฐานข้อมูล (Stop Instance) อัตโนมัติในเวลากลางคืนหรือวันหยุดสุดสัปดาห์ ซึ่งจะช่วยให้คุณประหยัดค่า Compute Instance ไปได้เกือบ 50-70% เลยทีเดียว (แต่คุณจะยังคงต้องเสียค่า Storage รายเดือนตามปกติ)
        </p>
      </div>
    </div>
  );
}

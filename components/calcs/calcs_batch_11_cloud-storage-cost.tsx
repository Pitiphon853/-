import React, { useState, useEffect } from 'react';
import { Calculator, Cloud, HardDrive, DownloadCloud, Activity } from 'lucide-react';

export default function CloudStorageCostCalculator({ lang = 'th' }: any) {
  const [storageGb, setStorageGb] = useState<number>(1000); // 1TB
  const [transferOutGb, setTransferOutGb] = useState<number>(500);
  const [putRequests, setPutRequests] = useState<number>(10); // in thousands
  const [getRequests, setGetRequests] = useState<number>(100); // in thousands

  // Standard pricing comparable to typical AWS S3 standard tier
  const RATES = {
    storage: 0.023, // per GB
    transferOut: 0.09, // per GB
    putReq: 0.005, // per 1,000 reqs
    getReq: 0.0004 // per 1,000 reqs
  };

  const [results, setResults] = useState({
    storageCost: 0,
    transferCost: 0,
    requestsCost: 0,
    totalCost: 0
  });

  useEffect(() => {
    const storageCost = storageGb * RATES.storage;
    // First 100GB of transfer out is typically free on AWS, but for simplicity we calculate flat rate or a simplified tier.
    // Let's use simple flat rate for generic estimation
    const transferCost = transferOutGb * RATES.transferOut;
    
    const putCost = putRequests * RATES.putReq;
    const getCost = getRequests * RATES.getReq;
    const requestsCost = putCost + getCost;
    
    const totalCost = storageCost + transferCost + requestsCost;

    setResults({
      storageCost,
      transferCost,
      requestsCost,
      totalCost
    });
  }, [storageGb, transferOutGb, putRequests, getRequests]);

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const t = {
    th: {
      title: "เครื่องมือคำนวณค่าบริการ Cloud Storage (มาตรฐาน)",
      desc: "ประมาณการค่าใช้จ่าย Object Storage (เทียบเท่า Amazon S3, Google Cloud Storage ระดับ Standard)",
      storageGb: "ขนาดพื้นที่จัดเก็บข้อมูล (GB ต่อเดือน)",
      transferOutGb: "ปริมาณข้อมูลที่ดาวน์โหลดออก (Data Transfer Out - GB)",
      putRequests: "คำขอเขียนข้อมูล - PUT/COPY/POST (จำนวน x 1,000 ครั้ง)",
      getRequests: "คำขออ่านข้อมูล - GET/SELECT (จำนวน x 1,000 ครั้ง)",
      results: "ประมาณการค่าใช้จ่ายต่อเดือน",
      storageCost: "ค่าพื้นที่จัดเก็บ (Storage)",
      transferCost: "ค่าโอนถ่ายข้อมูล (Data Transfer)",
      requestsCost: "ค่าดำเนินการ (API Requests)",
      totalCost: "รวมค่าใช้จ่ายโดยประมาณ (USD/เดือน)",
      articleTitle: "วิธีคำนวณและทำความเข้าใจค่าบริการ Cloud Storage (Object Storage)",
      hint: "หมายเหตุ: ราคาที่ใช้เป็นราคาอ้างอิงระดับ Standard Tier (เฉลี่ย) อาจแตกต่างกันไปตามผู้ให้บริการและ Region"
    },
    en: {
      title: "Cloud Storage Cost Calculator (Standard)",
      desc: "Estimate Object Storage costs (comparable to Amazon S3, Google Cloud Storage Standard Tier)",
      storageGb: "Storage Size (GB per month)",
      transferOutGb: "Data Transfer Out (GB per month)",
      putRequests: "Write Requests - PUT/COPY/POST (in thousands)",
      getRequests: "Read Requests - GET/SELECT (in thousands)",
      results: "Estimated Monthly Costs",
      storageCost: "Storage Cost",
      transferCost: "Data Transfer Cost",
      requestsCost: "API Requests Cost",
      totalCost: "Total Estimated Cost (USD/month)",
      articleTitle: "Understanding and Calculating Cloud Storage (Object Storage) Costs",
      hint: "Note: Rates used are average standard tier references and may vary by provider and region."
    }
  };

  const langKey = lang === 'en' ? 'en' : 'th';
  const text = t[langKey];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
        <div className="p-3 bg-cyan-100 text-cyan-600 rounded-xl">
          <Cloud className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{text.title}</h2>
          <p className="text-gray-500 mt-1 text-sm">{text.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.storageGb}</label>
            <div className="relative">
              <input
                type="number"
                value={storageGb}
                onChange={(e) => setStorageGb(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 pl-10"
                min="0"
              />
              <HardDrive className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">~ ${(RATES.storage).toFixed(3)} / GB</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.transferOutGb}</label>
            <div className="relative">
              <input
                type="number"
                value={transferOutGb}
                onChange={(e) => setTransferOutGb(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 pl-10"
                min="0"
              />
              <DownloadCloud className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">~ ${(RATES.transferOut).toFixed(2)} / GB</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.putRequests}</label>
            <div className="relative">
              <input
                type="number"
                value={putRequests}
                onChange={(e) => setPutRequests(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 pl-10"
                min="0"
              />
              <Activity className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">~ ${(RATES.putReq).toFixed(3)} / 1,000 Req</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text.getRequests}</label>
            <div className="relative">
              <input
                type="number"
                value={getRequests}
                onChange={(e) => setGetRequests(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 pl-10"
                min="0"
              />
              <Activity className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">~ ${(RATES.getReq).toFixed(4)} / 1,000 Req</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-xl text-white shadow-lg h-full">
            <h3 className="text-xl font-semibold mb-6 text-cyan-400">{text.results}</h3>
            
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 mb-6 text-center">
              <p className="text-sm text-slate-400 mb-2">{text.totalCost}</p>
              <div className="flex justify-center items-start">
                <span className="text-2xl mt-1 mr-1 text-cyan-400">$</span>
                <span className="text-5xl font-bold">{formatNumber(results.totalCost)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <div className="flex flex-col">
                  <span className="font-medium text-slate-300">{text.storageCost}</span>
                  <span className="text-xs text-slate-500">{storageGb} GB</span>
                </div>
                <span className="font-medium text-lg">${formatNumber(results.storageCost)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <div className="flex flex-col">
                  <span className="font-medium text-slate-300">{text.transferCost}</span>
                  <span className="text-xs text-slate-500">{transferOutGb} GB</span>
                </div>
                <span className="font-medium text-lg">${formatNumber(results.transferCost)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <div className="flex flex-col">
                  <span className="font-medium text-slate-300">{text.requestsCost}</span>
                  <span className="text-xs text-slate-500">API Operations</span>
                </div>
                <span className="font-medium text-lg">${formatNumber(results.requestsCost)}</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 mt-6">{text.hint}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 text-gray-600 prose prose-cyan max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{text.articleTitle}</h2>
        <p>
          บริการจัดเก็บข้อมูลบนคลาวด์ประเภท Object Storage เช่น Amazon S3, Google Cloud Storage (GCS) หรือ Azure Blob Storage ได้รับความนิยมอย่างแพร่หลายสำหรับนักพัฒนาแอปพลิเคชัน เนื่องจากมีความทนทานสูง ขยายตัวได้ไม่จำกัด (Scalability) และจ่ายตามที่ใช้งานจริง (Pay-as-you-go) อย่างไรก็ตาม การคำนวณต้นทุนให้ถูกต้องมักสร้างความปวดหัวให้กับผู้ใช้งานใหม่ เนื่องจากค่าบริการไม่ได้คิดแค่ "ขนาดพื้นที่" เพียงอย่างเดียว
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">องค์ประกอบของค่าบริการ Cloud Storage</h3>
        <p>โครงสร้างราคาของคลาวด์ส่วนใหญ่มักจะแบ่งออกเป็น 3 ส่วนหลัก ดังนี้:</p>
        
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>ค่าจัดเก็บข้อมูล (Storage Cost):</strong><br />
            เป็นค่าบริการที่คิดตามปริมาณข้อมูลจริงที่ถูกเก็บไว้ (คิดเป็น GB-Month) โดยปกติจะอยู่ที่ประมาณ $0.02 ถึง $0.025 ต่อ GB สำหรับ Storage ระดับ Standard หากคุณมีข้อมูลที่ไม่ได้เรียกใช้บ่อย สามารถประหยัดเงินได้โดยการย้ายไปอยู่ Tier ที่ถูกกว่า เช่น Infrequent Access (IA) หรือ Archive (เช่น Glacier)
          </li>
          <li>
            <strong>ค่าโอนถ่ายข้อมูล (Data Transfer Out / Bandwidth):</strong><br />
            สิ่งที่เป็น "กับดัก" สำหรับผู้ใช้ใหม่มากที่สุดคือค่า Bandwidth คลาวด์โดยทั่วไปจะให้เรา "อัปโหลด (Ingress)" ข้อมูลเข้าฟรี แต่เมื่อมีการ "ดาวน์โหลด (Egress)" ข้อมูลออกไปยังอินเทอร์เน็ต จะถูกคิดเงินในราคาที่ค่อนข้างสูง (ประมาณ $0.08 - $0.12 ต่อ GB) หากคุณใช้บริการเสิร์ฟรูปภาพหรือวิดีโอจำนวนมาก ค่า Data Transfer นี้อาจจะแพงกว่าค่าพื้นที่จัดเก็บหลายสิบเท่า
          </li>
          <li>
            <strong>ค่า API Requests (Operations):</strong><br />
            ทุกครั้งที่คุณเรียกใช้งานไฟล์ เช่น PUT (อัปโหลด), GET (ดาวน์โหลด), LIST (ดูรายการไฟล์) ทางคลาวด์จะคิดค่าธรรมเนียมเล็กน้อย (เช่น $0.0004 ต่อการอ่าน 1,000 ครั้ง) ซึ่งโดยทั่วไปมักจะไม่สูงมากนัก เว้นแต่ระบบของคุณจะมีลักษณะการเขียนอ่านไฟล์ขนาดเล็กจำนวนมหาศาลตลอดเวลา
          </li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">เคล็ดลับการประหยัดค่า Cloud Storage</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ใช้ CDN (Content Delivery Network):</strong> หากไฟล์ของคุณเป็น Static Asset (รูปภาพ, CSS, JS) ที่ถูกโหลดบ่อย การใช้ CDN เช่น Cloudflare หน้า Storage ของคุณ จะช่วยแคชไฟล์ไว้ที่ Edge ช่วยลดทั้งจำนวน GET Requests และปริมาณ Data Transfer Out จากต้นทางได้อย่างมหาศาล</li>
          <li><strong>ทำ Lifecycle Management:</strong> ตั้งกฎอัตโนมัติให้ระบบย้ายไฟล์ที่เก่าเกิน 30 วัน ไปยัง Storage Tier ที่ราคาถูกลง เช่น S3 Standard-IA</li>
          <li><strong>ตรวจสอบผู้ให้บริการรายอื่น:</strong> หากระบบของคุณมีการดาวน์โหลด (Egress) ข้อมูลหนักมาก ผู้ให้บริการทางเลือก เช่น Cloudflare R2 หรือ DigitalOcean Spaces อาจเป็นทางเลือกที่ประหยัดกว่า เนื่องจากผู้ให้บริการเหล่านี้มักจะฟรีหรือคิดค่า Data Transfer Out ในราคาที่ถูกกว่ายักษ์ใหญ่</li>
        </ul>
      </div>
    </div>
  );
}

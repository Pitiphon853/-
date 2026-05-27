"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem } from "./shared";
import { AdPlaceholder } from "../AdPlaceholder";

// 1. RAID Storage
export function RaidCalculator({ lang }: { lang: Lang }) {
  const [drives, setDrives] = useLocalState("raid_drives", "4");
  const [size, setSize] = useLocalState("raid_size", "4"); // TB
  const [type, setType] = useLocalState("raid_type", "5");

  const d = parseInt(drives);
  const s = parseFloat(size);
  let usable = 0;
  let fault = 0;

  if (d > 0 && s > 0) {
    if (type === "0" && d >= 2) { usable = d * s; fault = 0; }
    if (type === "1" && d >= 2 && d % 2 === 0) { usable = (d / 2) * s; fault = d / 2; }
    if (type === "5" && d >= 3) { usable = (d - 1) * s; fault = 1; }
    if (type === "6" && d >= 4) { usable = (d - 2) * s; fault = 2; }
    if (type === "10" && d >= 4 && d % 2 === 0) { usable = (d / 2) * s; fault = 1; } // 1 per mirror
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-orange-600">{lang === "TH" ? "คำนวณความจุ RAID" : "RAID Storage Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "จำนวนฮาร์ดดิสก์" : "Number of Drives"}</label><input type="number" value={drives} onChange={e=>setDrives(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "ความจุต่อลูก (TB)" : "Drive Size (TB)"}</label><input type="number" step="0.1" value={size} onChange={e=>setSize(e.target.value)} className={inputClass} /></div>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ประเภท RAID" : "RAID Type"}</label>
          <select value={type} onChange={e=>setType(e.target.value)} className={inputClass}>
            <option value="0">RAID 0 (Striping)</option>
            <option value="1">RAID 1 (Mirroring)</option>
            <option value="5">RAID 5 (Striping with Parity)</option>
            <option value="6">RAID 6 (Striping with Double Parity)</option>
            <option value="10">RAID 10 (Striping + Mirroring)</option>
          </select>
        </div>
      </div>
      {usable > 0 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-orange-50 rounded-xl text-center">
          <p className="text-gray-600 mb-2">{lang === "TH" ? "ความจุที่ใช้งานได้จริง (Usable Capacity)" : "Usable Capacity"}</p>
          <div className="text-4xl font-black text-orange-600 mb-4">{usable.toFixed(1)} TB</div>
          <p className="text-sm text-gray-500">
            {lang === "TH" ? `ทนทานต่อดิสก์เสียได้สูงสุด: ${fault} ลูก` : `Fault Tolerance: ${fault} Drive(s)`}
          </p>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ: ระบบ RAID Storage และการคำนวณความจุ":"RAID Storage FAQ"}>
          <FAQItem q={lang==="TH"?"RAID คืออะไร และทำไมองค์กรถึงต้องใช้?":"What is RAID and why is it used?"} a={lang==="TH"?"RAID ย่อมาจาก Redundant Array of Independent Disks คือเทคโนโลยีการนำฮาร์ดดิสก์ (HDD) หรือ Solid State Drive (SSD) หลายๆ ลูกมาเชื่อมต่อและทำงานร่วมกันเสมือนเป็นไดรฟ์เดียว เป้าหมายหลักของ RAID มีอยู่ 2 อย่างคือ 1. การเพิ่มประสิทธิภาพการอ่าน/เขียนข้อมูล (Performance) และ 2. การสร้างความทนทานต่อความเสียหาย (Fault Tolerance) หากมีฮาร์ดดิสก์ลูกใดลูกหนึ่งเสีย ข้อมูลก็จะไม่สูญหายและระบบยังสามารถทำงานต่อไปได้ ซึ่งเป็นสิ่งจำเป็นอย่างยิ่งสำหรับเครื่องเซิร์ฟเวอร์ (Server) ระบบคลาวด์ (Cloud Computing) และระบบจัดเก็บข้อมูลบนเครือข่าย (NAS) ในระดับองค์กร | อ้างอิง: SNIA (Storage Networking Industry Association) - RAID Dictionary; IEEE Computer Society - Storage Systems." : "RAID (Redundant Array of Independent Disks) combines multiple drives into a single logical unit to improve performance, data redundancy, or both. It is essential for enterprise servers, cloud computing, and NAS systems to prevent data loss in case of hardware failure. | Source: SNIA; IEEE."} />
          <FAQItem q={lang==="TH"?"RAID แต่ละประเภท (0, 1, 5, 6, 10) ต่างกันอย่างไร และควรเลือกใช้แบบไหน?":"What are the differences between RAID levels?"} a={lang==="TH"?"• RAID 0 (Striping): นำความจุทุกลูกมารวมกัน ทำให้อ่านเขียนได้เร็วมากที่สุด แต่ไม่มีการสำรองข้อมูล หากพัง 1 ลูก ข้อมูลจะหายทั้งหมด เหมาะสำหรับงานตัดต่อวิดีโอชั่วคราวที่เน้นความเร็วสูงสุด \n• RAID 1 (Mirroring): สำรองข้อมูลแบบ 1:1 ความจุหายไปครึ่งหนึ่ง อ่านเร็วแต่เขียนช้าลงเล็กน้อย เหมาะสำหรับเก็บไฟล์ระบบปฏิบัติการ (OS) หรือเอกสารสำคัญ \n• RAID 5 (Parity): ใช้พื้นที่ 1 ลูกในการเก็บข้อมูล Parity เพื่อกู้คืนข้อมูล ต้องใช้ดิสก์อย่างน้อย 3 ลูก ทนดิสก์เสียได้ 1 ลูก เป็นที่นิยมมากที่สุดใน NAS ทั่วไปเพราะบาลานซ์ความจุและความปลอดภัย \n• RAID 6 (Double Parity): คล้าย RAID 5 แต่ใช้พื้นที่ 2 ลูกเก็บ Parity ทนดิสก์เสียได้พร้อมกัน 2 ลูก เหมาะสำหรับองค์กรขนาดใหญ่ที่มีฮาร์ดดิสก์จำนวนมากเพื่อป้องกัน Rebuild failure \n• RAID 10 (1+0): รวมข้อดีของ RAID 1 และ 0 ได้ความเร็วสูงและความปลอดภัยสูง แต่สูญเสียความจุไป 50% เหมาะสำหรับฐานข้อมูล (Database) ที่ต้องการ I/O สูง | อ้างอิง: Intel - RAID Technology Guide; Western Digital - RAID Levels Explained." : "• RAID 0: Max speed, no redundancy. \n• RAID 1: 1:1 mirroring, 50% capacity lost. \n• RAID 5: 1 drive for parity, min 3 drives. Good balance. \n• RAID 6: 2 drives for parity, survives 2 failures. \n• RAID 10: Speed of 0 + safety of 1, 50% capacity lost. Ideal for databases. | Source: Intel; Western Digital."} />
          <FAQItem q={lang==="TH"?"การคำนวณพื้นที่จัดเก็บข้อมูลจริง ทำไมถึงได้ความจุน้อยกว่าหน้ากล่อง?":"Why is usable capacity less than advertised?"} a={lang==="TH"?"นี่เป็นความสับสนที่พบบ่อยมาก สาเหตุเกิดจากการนับหน่วยที่ต่างกันระหว่างผู้ผลิตฮาร์ดดิสก์และระบบปฏิบัติการ (OS) ผู้ผลิตฮาร์ดดิสก์ใช้ระบบเลขฐานสิบ (Decimal) โดยกำหนดให้ 1 Terabyte (TB) = 1,000,000,000,000 bytes แต่ระบบปฏิบัติการอย่าง Windows ใช้ระบบเลขฐานสอง (Binary) โดยกำหนดให้ 1 Tebibyte (TiB) = 1,099,511,627,776 bytes (มาจาก 1024 ยกกำลัง 4) เมื่อนำฮาร์ดดิสก์ขนาด 4TB ไปต่อใน Windows จะเห็นพื้นที่เพียงประมาณ 3.63 TiB นอกจากนี้ หากทำ RAID 5 หรือ RAID 6 ก็จะเสียความจุไปอีกตามจำนวน Parity drives นี่จึงเป็นเหตุผลที่คุณควรคำนวณเผื่อความจุไว้เสมอ | อ้างอิง: NIST - Prefixes for binary multiples; IEC 80000-13 Standard." : "Manufacturers use decimal (1 TB = 1,000,000,000,000 bytes), while operating systems use binary (1 TiB = 1,099,511,627,776 bytes). A 4TB drive shows as ~3.63 TiB in Windows. Additional space is lost to RAID parity overhead. | Source: NIST; IEC 80000-13."} />
          <FAQItem q={lang==="TH"?"RAID สามารถใช้ทดแทนการ Backup ข้อมูลได้หรือไม่?":"Is RAID a substitute for backup?"} a={lang==="TH"?"ไม่สามารถทดแทนได้อย่างเด็ดขาด (RAID is not Backup!) RAID ทำหน้าที่เพียงให้ระบบทำงานได้อย่างต่อเนื่อง (High Availability) หากฮาร์ดแวร์พัง แต่ไม่สามารถป้องกันความเสียหายจากปัจจัยอื่นได้เลย เช่น การเผลอลบไฟล์ผิดพลาด (Human Error), การถูกไวรัสเรียกค่าไถ่ (Ransomware) เข้ารหัสไฟล์, ไฟไหม้ตึก, หรือไฟกระชากจนฮาร์ดดิสก์พังพร้อมกันหลายลูก ดังนั้น กฎทองของคนไอทีคือต้องทำตามหลักการ 3-2-1 Backup Rule เสมอ ได้แก่ การมีข้อมูล 3 ชุด, เก็บไว้ในสื่อที่ต่างชนิดกัน 2 แบบ, และเก็บไว้นอกสถานที่ (Offsite/Cloud) อย่างน้อย 1 ชุด | อ้างอิง: CISA (Cybersecurity and Infrastructure Security Agency) - Data Backup Options; Veeam - 3-2-1 Backup Rule." : "No, RAID is not a backup! It only provides hardware redundancy. It cannot protect against human error, ransomware, accidental deletion, or disaster (fire/flood). Always follow the 3-2-1 backup rule: 3 copies, 2 different media, 1 offsite. | Source: CISA; Veeam."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 2. Pixel Density PPI
export function PpiCalculator({ lang }: { lang: Lang }) {
  const [width, setWidth] = useLocalState("ppi_w", "1920");
  const [height, setHeight] = useLocalState("ppi_h", "1080");
  const [diag, setDiag] = useLocalState("ppi_d", "15.6");

  const w = parseFloat(width);
  const h = parseFloat(height);
  const d = parseFloat(diag);
  
  const ppi = (d > 0 && w > 0 && h > 0) ? Math.sqrt((w * w) + (h * h)) / d : 0;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-orange-600">{lang === "TH" ? "ความหนาแน่นพิกเซล (PPI)" : "Pixel Density PPI"}</h2>
      <div className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "ความกว้าง (Pixels)" : "Width (px)"}</label><input type="number" value={width} onChange={e=>setWidth(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "ความสูง (Pixels)" : "Height (px)"}</label><input type="number" value={height} onChange={e=>setHeight(e.target.value)} className={inputClass} /></div>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ขนาดหน้าจอแนวทแยง (นิ้ว)" : "Diagonal Screen Size (inches)"}</label>
          <input type="number" step="0.1" value={diag} onChange={e=>setDiag(e.target.value)} className={inputClass} />
        </div>
      </div>
      {ppi > 0 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-orange-50 rounded-xl text-center">
          <p className="text-gray-600 mb-2">Pixel Density</p>
          <div className="text-4xl font-black text-orange-600 mb-4">{ppi.toFixed(2)} PPI</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ: ความหนาแน่นของเม็ดพิกเซล (PPI / DPI)":"Pixel Density FAQ"}>
          <FAQItem q={lang==="TH"?"PPI คืออะไร และมีความสำคัญอย่างไรกับหน้าจอมือถือหรือทีวี?":"What is PPI and why is it important?"} a={lang==="TH"?"PPI ย่อมาจาก Pixels Per Inch หรือความหนาแน่นของเม็ดพิกเซลต่อพื้นที่ 1 นิ้วบนหน้าจอแสดงผล เป็นค่าที่บ่งบอกถึง 'ความคมชัด' ของหน้าจอ ยิ่งค่า PPI สูง หมายความว่าในพื้นที่ 1 ตารางนิ้ว จะมีเม็ดพิกเซลอัดแน่นอยู่จำนวนมาก ส่งผลให้ภาพและตัวหนังสือดูคมชัด เนียนตา และไม่เห็นเป็นรอยหยัก (Pixelated) สมาร์ทโฟนระดับเรือธงในปัจจุบันมักจะมีค่า PPI สูงกว่า 400 ขึ้นไป (เช่น iPhone Retina Display อยู่ที่ประมาณ 460 PPI) ในขณะที่จอมอนิเตอร์คอมพิวเตอร์ทั่วไปอาจจะอยู่ที่ประมาณ 90-110 PPI เนื่องจากระยะการมองหน้าจอคอมพิวเตอร์นั้นห่างจากดวงตามากกว่าสมาร์ทโฟน | อ้างอิง: Apple Developer - Display Specifications; VESA (Video Electronics Standards Association)." : "PPI (Pixels Per Inch) measures the pixel density of a display, dictating its sharpness. Higher PPI means smoother text and images without visible jagged edges. Flagship smartphones often exceed 400 PPI (e.g., iPhone Retina displays), while desktop monitors sit around 90-110 PPI due to a further viewing distance. | Source: Apple Developer; VESA."} />
          <FAQItem q={lang==="TH"?"PPI กับ DPI แตกต่างกันอย่างไร ใช้แทนกันได้หรือไม่?":"What is the difference between PPI and DPI?"} a={lang==="TH"?"PPI (Pixels Per Inch) และ DPI (Dots Per Inch) มักถูกใช้สลับกันบ่อยครั้ง แต่ในทางเทคนิคแล้วทั้งสองมีความหมายที่ต่างกันอย่างชัดเจน \n• PPI ใช้สำหรับ 'จอแสดงผลดิจิทัล' (Monitors, Smartphones, TVs) เป็นการนับเม็ดพิกเซลที่ประกอบด้วยจุดสี RGB ส่องแสงออกมา \n• DPI ใช้สำหรับ 'งานพิมพ์' (Printers) เป็นการนับจำนวนจุดหมึก (Dots) ที่เครื่องพิมพ์พ่นลงไปบนกระดาษในระยะ 1 นิ้ว \nในการเตรียมไฟล์กราฟิกเพื่อนำไปพิมพ์ที่โรงพิมพ์ มักจะกำหนดมาตรฐานความละเอียดไว้ที่ 300 DPI เพื่อให้ภาพพิมพ์ออกมาคมชัดที่สุด แต่ถ้านำไปใช้บนเว็บไซต์ 72-144 PPI ก็เพียงพอแล้ว | อ้างอิง: Adobe Help Center - Resolution and Image Size; ISO 12647 Graphic technology." : "PPI refers to digital displays (pixels of light), while DPI (Dots Per Inch) refers to physical printing (dots of ink). While often confused, preparing a file for high-quality print requires 300 DPI, whereas web images only need 72-144 PPI. | Source: Adobe Help Center; ISO 12647."} />
          <FAQItem q={lang==="TH"?"'Retina Display' ของ Apple คืออะไร เกี่ยวกับ PPI อย่างไร?":"What is a Retina Display?"} a={lang==="TH"?"Retina Display เป็นชื่อทางการตลาดที่ Apple จดลิขสิทธิ์ไว้ ใช้เรียกหน้าจอที่มีความหนาแน่นของพิกเซล (PPI) สูงมากจนดวงตาของมนุษย์ไม่สามารถแยกแยะเม็ดพิกเซลเดี่ยวๆ ได้เมื่อมองจากระยะการใช้งานปกติ (Normal Viewing Distance) โดย Apple ระบุว่าสำหรับโทรศัพท์มือถือที่มองห่างประมาณ 10-12 นิ้ว ค่า Retina จะอยู่ที่ประมาณ 326 PPI (อิงจาก iPhone 4) ส่วน iPad ที่มองห่างออกมา จะอยู่ที่ 264 PPI และ MacBook จะอยู่ที่ประมาณ 220 PPI แนวคิดนี้อิงจากขีดจำกัดความละเอียดของสายตามนุษย์ (Visual Acuity) ตามหลักวิทยาศาสตร์ | อ้างอิง: Apple - About Retina displays; Journal of Vision - Human Visual Acuity." : "Retina Display is Apple's marketing term for a screen with pixel density so high that the human eye cannot distinguish individual pixels at a normal viewing distance. This is around 326 PPI for phones, 264 PPI for tablets, and 220 PPI for laptops, based on human visual acuity limits. | Source: Apple; Journal of Vision."} />
          <FAQItem q={lang==="TH"?"หากซื้อทีวี 4K ขนาด 85 นิ้ว ภาพจะยังคมชัดอยู่ไหม?":"Is a 85-inch 4K TV still sharp?"} a={lang==="TH"?"ทีวีความละเอียด 4K (3840 x 2160) เมื่อนำไปขยายใส่ในหน้าจอขนาดใหญ่มากถึง 85 นิ้ว จะมีค่า PPI อยู่ที่ประมาณ 52 PPI เท่านั้น ซึ่งถือว่าต่ำมากเมื่อเทียบกับหน้าจอมือถือ อย่างไรก็ตาม ความคมชัดนั้นขึ้นอยู่กับ 'ระยะการรับชม' (Viewing Distance) ด้วย ทีวี 85 นิ้วนั้นถูกออกแบบมาให้นั่งดูห่างออกไปประมาณ 3-4 เมตร ดังนั้นที่ระยะห่างระดับนี้ สายตาของคุณจะไม่สามารถสังเกตเห็นเม็ดพิกเซลที่แตกได้ ทำให้ภาพยังคงดูคมชัดกริบเช่นเดิม แต่ถ้าคุณเดินเข้าไปดูใกล้ๆ ในระยะ 1 ฟุต คุณจะเห็นรอยหยักของพิกเซลอย่างชัดเจน | อ้างอิง: SMPTE (Society of Motion Picture and Television Engineers); THX Ultimate Viewing Distance Guide." : "A 85-inch 4K TV has only about 52 PPI. However, sharpness depends on viewing distance. Since you sit 3-4 meters away, your eyes cannot resolve the individual pixels, making the image appear perfectly sharp. If you stand 1 foot away, it will look pixelated. | Source: SMPTE; THX."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 3. API Cost
export function ApiCostCalculator({ lang }: { lang: Lang }) {
  const [inTokens, setInTokens] = useLocalState("api_in", "10000");
  const [outTokens, setOutTokens] = useLocalState("api_out", "5000");
  const [inRate, setInRate] = useLocalState("api_in_rate", "0.50"); // $ per 1M
  const [outRate, setOutRate] = useLocalState("api_out_rate", "1.50"); // $ per 1M
  const [exchange, setExchange] = useLocalState("api_exchange", "35.5");

  const i = parseFloat(inTokens);
  const o = parseFloat(outTokens);
  const ir = parseFloat(inRate);
  const or = parseFloat(outRate);
  const ex = parseFloat(exchange);

  let costUsd = 0;
  if (i >= 0 && o >= 0 && ir >= 0 && or >= 0) {
    costUsd = (i / 1000000) * ir + (o / 1000000) * or;
  }
  const costThb = costUsd * ex;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-orange-600">{lang === "TH" ? "คำนวณค่าบริการ API (Token)" : "API Cost Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "Input Tokens (Prompt)" : "Input Tokens"}</label><input type="number" value={inTokens} onChange={e=>setInTokens(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "Output Tokens (Response)" : "Output Tokens"}</label><input type="number" value={outTokens} onChange={e=>setOutTokens(e.target.value)} className={inputClass} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "ราคา Input ($ ต่อ 1M)" : "Input Price ($ per 1M)"}</label><input type="number" step="0.01" value={inRate} onChange={e=>setInRate(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "ราคา Output ($ ต่อ 1M)" : "Output Price ($ per 1M)"}</label><input type="number" step="0.01" value={outRate} onChange={e=>setOutRate(e.target.value)} className={inputClass} /></div>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "อัตราแลกเปลี่ยน (บาท/USD)" : "Exchange Rate (THB/USD)"}</label>
          <input type="number" step="0.1" value={exchange} onChange={e=>setExchange(e.target.value)} className={inputClass} />
        </div>
      </div>
      {costUsd > 0 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-orange-50 rounded-xl text-center">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 mb-1">{lang === "TH" ? "ค่าใช้จ่าย (USD)" : "Cost (USD)"}</p>
              <div className="text-2xl font-bold text-gray-800">${costUsd.toFixed(6)}</div>
            </div>
            <div>
              <p className="text-orange-600 font-bold mb-1">{lang === "TH" ? "ค่าใช้จ่าย (เงินบาท)" : "Cost (THB)"}</p>
              <div className="text-3xl font-black text-orange-600">฿{costThb.toFixed(4)}</div>
            </div>
          </div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ: การคำนวณ Token ของ AI API":"LLM API Token Cost FAQ"}>
          <FAQItem q={lang==="TH"?"Token ในระบบ AI คืออะไร และต่างจากคำ (Word) อย่างไร?":"What is a token in AI, and how is it different from a word?"} a={lang==="TH"?"ในระบบ Large Language Models (LLM) เช่น OpenAI GPT-4, Google Gemini หรือ Anthropic Claude คำว่า Token ไม่ได้หมายถึงคำ 1 คำเสมอไป Token คือหน่วยย่อยที่สุดที่ AI ใช้ประมวลผลข้อความ โดยทั่วไปสำหรับภาษาอังกฤษ 1 Token จะเท่ากับตัวอักษรประมาณ 4 ตัว หรือประมาณ 0.75 คำ (เช่น คำว่า 'Hamburger' อาจถูกหั่นเป็น 3 tokens: 'Ham', 'bur', 'ger') แต่สำหรับภาษาไทยนั้นต่างออกไป เนื่องจากภาษาไทยไม่มีการเว้นวรรคคำที่ชัดเจน และโครงสร้างภาษาต่างจากภาษาอังกฤษ AI มักจะแปลงภาษาไทย 1 ตัวอักษรเป็น 1-3 Tokens ทำให้การประมวลผลภาษาไทยใช้จำนวน Token เปลืองกว่าภาษาอังกฤษถึง 3-5 เท่า ส่งผลให้ต้นทุน API แพงกว่าอย่างมีนัยสำคัญ | อ้างอิง: OpenAI Tokenizer Documentation; Google Vertex AI Token Limitations." : "A token is the smallest unit of text processed by an LLM. For English, 1 token ≈ 4 characters or 0.75 words. However, for non-Latin languages like Thai, AI often tokenizes at the byte or character level, making Thai text consume 3-5 times more tokens than the equivalent English text. This significantly increases API costs. | Source: OpenAI Tokenizer; Google Vertex AI."} />
          <FAQItem q={lang==="TH"?"Input Token และ Output Token คืออะไร ทำไมราคาจึงต่างกัน?":"What are Input and Output tokens, and why do their prices differ?"} a={lang==="TH"?"• Input Tokens (Prompt Tokens): คือข้อความ คำสั่ง (Prompt) และบริบท (Context) ทั้งหมดที่คุณส่งไปให้ AI ประมวลผล \n• Output Tokens (Completion Tokens): คือข้อความที่ AI สร้างและตอบกลับมาให้คุณ \nสาเหตุที่ Output Tokens มีราคาแพงกว่า Input Tokens เสมอ (มักจะแพงกว่า 3-4 เท่า) เป็นเพราะกระบวนการคำนวณทางคณิตศาสตร์ในโครงข่ายประสาทเทียม การรับข้อมูลเข้า (Input) สามารถประมวลผลแบบขนาน (Parallel Processing) ได้อย่างรวดเร็ว แต่การสร้างคำตอบ (Output) AI จะต้องประมวลผลและคาดเดาคำถัดไปทีละคำ (Autoregressive Generation) ซึ่งกินทรัพยากรประมวลผลของ GPU อย่างมหาศาลและช้ากว่ามาก ผู้ให้บริการ Cloud จึงคิดราคา Output แพงกว่า | อ้างอิง: Nvidia - Deep Learning Inference and Autoregressive Models; Anthropic Pricing Model." : "Input tokens are the text you send to the AI (Prompt). Output tokens are the text the AI generates in response (Completion). Output tokens are typically 3-4x more expensive because generating text autoregressively (one word at a time) is highly compute-intensive and serial, whereas processing input can be done in parallel. | Source: Nvidia Deep Learning; Anthropic."} />
          <FAQItem q={lang==="TH"?"จะควบคุมค่าใช้จ่าย API อย่างไรไม่ให้บานปลาย?":"How to optimize and reduce API costs?"} a={lang==="TH"?"การลดต้นทุน API ทำได้หลายวิธี: 1) การใช้โมเดลที่เล็กลงแต่เร็วขึ้น เช่น ใช้ GPT-4o-mini หรือ Claude 3 Haiku สำหรับงานที่ไม่ซับซ้อน 2) การทำ Prompt Engineering ให้กระชับ สั่งให้ AI ตอบเฉพาะสิ่งที่จำเป็น ไม่ต้องเกริ่นนำ 3) ใช้เทคนิค Caching สำหรับคำถามที่ถูกถามบ่อย (ปัจจุบันหลายค่ายเริ่มมี Prompt Caching ที่ลดราคา Input ได้ถึง 50%) 4) สำหรับข้อความยาวๆ ให้ประมวลผลเป็น Batch หากไม่ต้องรอผลแบบ Real-time ซึ่งจะได้ส่วนลดพิเศษจากผู้ให้บริการ 5) การสรุป Context หรือตัดประวัติแชทเก่าๆ ทิ้งก่อนส่ง Request เข้าไปใหม่ | อ้างอิง: Google Cloud - Optimizing LLM Costs; OpenAI Batch API Documentation." : "1) Use smaller, faster models (e.g., GPT-4o-mini, Haiku) for simple tasks. 2) Write concise prompts and instruct the AI to output only necessary data. 3) Utilize Prompt Caching if available. 4) Use Batch API for non-real-time processing for steep discounts. 5) Trim chat history to reduce input size. | Source: Google Cloud; OpenAI."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 4. UPS Runtime
export function UpsRuntimeCalculator({ lang }: { lang: Lang }) {
  const [va, setVa] = useLocalState("ups_va", "1000");
  const [pf, setPf] = useLocalState("ups_pf", "0.6");
  const [load, setLoad] = useLocalState("ups_load", "300"); // Watts
  const [battVoltage, setBattVoltage] = useLocalState("ups_v", "12");
  const [battAh, setBattAh] = useLocalState("ups_ah", "7");
  const [battQty, setBattQty] = useLocalState("ups_qty", "2");
  
  // Total Battery Wh = Voltage * Ah * Qty
  const totalWh = parseFloat(battVoltage) * parseFloat(battAh) * parseInt(battQty);
  // Runtime (mins) = (Total Wh * Efficiency (0.85)) / Load (W) * 60
  const l = parseFloat(load);
  const runtime = (l > 0) ? ((totalWh * 0.85) / l) * 60 : 0;
  const maxLoad = parseFloat(va) * parseFloat(pf);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-orange-600">{lang === "TH" ? "ระยะเวลาสำรองไฟ UPS" : "UPS Runtime Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "ขนาด UPS (VA)" : "UPS Size (VA)"}</label><input type="number" value={va} onChange={e=>setVa(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "Power Factor" : "Power Factor"}</label><input type="number" step="0.1" value={pf} onChange={e=>setPf(e.target.value)} className={inputClass} /></div>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "โหลดอุปกรณ์ที่ใช้งาน (Watts)" : "Device Load (Watts)"}</label>
          <input type="number" value={load} onChange={e=>setLoad(e.target.value)} className={inputClass} />
          <p className="text-xs text-gray-400 mt-1">{lang==="TH"?`รองรับโหลดสูงสุด: ${maxLoad} Watts`:`Max supported load: ${maxLoad} Watts`}</p>
        </div>
        <div className="border-t border-gray-200 dark:border-white/10 pt-4 mt-4">
          <p className="font-bold text-gray-700 dark:text-gray-300 mb-2">{lang === "TH" ? "ข้อมูลแบตเตอรี่ภายใน" : "Internal Battery Info"}</p>
          <div className="grid grid-cols-3 gap-2">
            <div><label className={labelClass}>Voltage (V)</label><input type="number" value={battVoltage} onChange={e=>setBattVoltage(e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Capacity (Ah)</label><input type="number" value={battAh} onChange={e=>setBattAh(e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>{lang === "TH" ? "จำนวนลูก" : "Quantity"}</label><input type="number" value={battQty} onChange={e=>setBattQty(e.target.value)} className={inputClass} /></div>
          </div>
        </div>
      </div>
      {runtime > 0 && l <= maxLoad && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-orange-50 rounded-xl text-center">
          <p className="text-gray-600 mb-1">{lang === "TH" ? "ระยะเวลาสำรองไฟโดยประมาณ" : "Estimated Backup Time"}</p>
          <div className="text-4xl font-black text-orange-600">{runtime.toFixed(1)} {lang === "TH" ? "นาที" : "Mins"}</div>
        </motion.div>
      )}
      {l > maxLoad && (
        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-center font-bold">
          {lang === "TH" ? "Overload! โหลดที่ใช้เกินสเปค UPS" : "Overload! Load exceeds UPS max capacity"}
        </div>
      )}
      <AdPlaceholder type="in-article" />
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ: เครื่องสำรองไฟ (UPS)":"UPS Backup Time FAQ"}>
          <FAQItem q={lang==="TH"?"VA กับ Watt ต่างกันอย่างไร ทำไม UPS ต้องบอกเป็น VA?":"What is the difference between VA and Watt?"} a={lang==="TH"?"ค่า Watt (W) คือพลังงานจริงที่อุปกรณ์ไฟฟ้าของคุณดึงไปใช้งาน (Real Power) ส่วน VA (Volt-Ampere) คือพลังงานปรากฏ (Apparent Power) ซึ่งเป็นผลคูณของแรงดันไฟฟ้าและกระแสไฟฟ้าที่ UPS จ่ายออกมา ในระบบไฟฟ้ากระแสสลับ (AC) จะมีความสูญเสียที่เรียกว่า Power Factor (PF) เข้ามาเกี่ยวข้อง สูตรคำนวณคือ Watt = VA × Power Factor เครื่อง UPS รุ่นประหยัดสำหรับใช้ตามบ้านมักจะมีค่า PF อยู่ที่ 0.5 - 0.6 เช่น UPS 1000VA / 600W หมายความว่ามันสามารถรับโหลดได้สูงสุดแค่ 600 วัตต์เท่านั้น หากคุณนำคอมพิวเตอร์ที่กินไฟ 800 วัตต์มาต่อ UPS เครื่องนี้จะร้องเตือน Overload ทันทีและตัดไฟ ดังนั้นเวลาซื้อ UPS ต้องดูที่ค่า Watt เป็นหลัก ไม่ใช่แค่ VA | อ้างอิง: Schneider Electric (APC) - Watt vs VA; IEEE Power & Energy Society." : "Watts (W) measure Real Power consumed by your devices, while VA (Volt-Ampere) measures Apparent Power output from the UPS. The relationship is Watts = VA × Power Factor. Budget UPS models have a Power Factor of 0.5 - 0.6. A 1000VA UPS might only support 600W. If you plug in an 800W PC, it will overload. Always buy a UPS based on the Watt rating, not just VA. | Source: APC by Schneider Electric; IEEE."} />
          <FAQItem q={lang==="TH"?"ทำไมเครื่อง UPS ที่บ้านถึงสำรองไฟได้แค่ 5-10 นาที ไม่ใช่เป็นชั่วโมง?":"Why does a home UPS only last 5-10 minutes?"} a={lang==="TH"?"UPS หรือ Uninterruptible Power Supply ถูกออกแบบมาเพื่อทำหน้าที่ 'ยื้อเวลา' ให้คุณสามารถเซฟงานและปิดเครื่องคอมพิวเตอร์ได้อย่างปลอดภัย หรือประคองระบบจนกว่าเครื่องปั่นไฟ (Generator) จะทำงาน ไม่ได้ถูกออกแบบมาให้เป็นแบตเตอรี่สำรอง (Power Station) สำหรับใช้งานยาวนาน เครื่อง UPS ขนาด 1000VA ทั่วไป มักจะใส่แบตเตอรี่ขนาด 12V 7Ah หรือ 9Ah เพียง 1-2 ลูกเท่านั้น ซึ่งมีพลังงานสำรองที่จำกัด หากต้องการให้สำรองไฟได้เป็นชั่วโมง คุณต้องใช้ UPS แบบ True Online ที่สามารถต่อแบตเตอรี่พ่วงภายนอก (External Battery Bank) ได้เพิ่มเติม ซึ่งจะมีราคาสูงกว่ามาก | อ้างอิง: Eaton - UPS Battery Runtime Fundamentals; NEMA (National Electrical Manufacturers Association)." : "A UPS is designed to provide just enough time to save your work and safely shut down your equipment, not to act as a long-term power station. A standard 1000VA home UPS usually contains only a small 12V 7Ah/9Ah battery. For hours of runtime, you need an enterprise True Online UPS with external battery banks. | Source: Eaton; NEMA."} />
          <FAQItem q={lang==="TH"?"เราจะยืดอายุการใช้งานแบตเตอรี่ UPS ได้อย่างไร?":"How to extend the lifespan of UPS batteries?"} a={lang==="TH"?"แบตเตอรี่ตะกั่วกรด (Lead-acid) ที่อยู่ใน UPS มีอายุการใช้งานเฉลี่ย 2-3 ปี ปัจจัยหลักที่ทำให้แบตเตอรี่เสื่อมไวคือ 1) ความร้อน อุณหภูมิห้องที่เหมาะสมคือ 20-25 องศาเซลเซียส อุณหภูมิที่สูงขึ้นทุกๆ 10 องศา จะบั่นทอนอายุแบตเตอรี่ลงครึ่งหนึ่ง 2) การดึงโหลด (Load) หากใช้งานโหลดใกล้เคียง 100% ของสเปค แบตเตอรี่จะร้อนและเสื่อมไว แนะนำให้คำนวณโหลดการใช้งานจริงไม่ให้เกิน 60-70% ของสเปคเครื่อง UPS เสมอ 3) ไม่ควรปล่อยให้แบตเตอรี่หมดเกลี้ยง (Deep Discharge) เพราะจะทำให้แผ่นธาตุภายในเสื่อมสภาพเร็วขึ้น | อ้างอิง: APC Battery Care and Maintenance; Battery University - Lead Acid Batteries." : "UPS lead-acid batteries typically last 2-3 years. Heat is the main enemy; ideal temp is 20-25°C. Every 10°C rise cuts lifespan in half. Avoid overloading the UPS (keep load at 60-70% max capacity). Never completely drain the battery (Deep Discharge), as it degrades the internal plates rapidly. | Source: APC; Battery University."} />
          <FAQItem q={lang==="TH"?"สามารถเอาปลั๊กพ่วงมาต่อออกจาก UPS ได้หรือไม่?":"Can I plug a power strip into a UPS?"} a={lang==="TH"?"สามารถทำได้ แต่ต้องระวังเรื่อง 'การดึงไฟเกิน' (Overload) อย่างมาก ห้ามนำอุปกรณ์ที่ใช้มอเตอร์หรือขดลวดความร้อนสูงมาต่อเด็ดขาด เช่น เครื่องพิมพ์เลเซอร์ (Laser Printer), ไดร์เป่าผม, ไมโครเวฟ, พัดลมขนาดใหญ่, หรือปั๊มน้ำ เพราะอุปกรณ์เหล่านี้ช่วงจังหวะสตาร์ท (Inrush Current) จะดึงกระแสไฟฟ้าสูงกระชากเกินสเปคของ UPS เป็นทวีคูณ ทำให้ UPS พัง วงจรไหม้ หรือแบตเตอรี่บวมระเบิดได้ ให้ต่อเฉพาะอุปกรณ์อิเล็กทรอนิกส์ เช่น คอมพิวเตอร์ จอภาพ หรือเราเตอร์อินเทอร์เน็ตเท่านั้น | อ้างอิง: NFPA 70 - National Electrical Code; CyberPower Systems - What not to plug into a UPS." : "Yes, but be extremely careful of overloading. NEVER plug high-drain appliances, motors, or heaters into a UPS (e.g., Laser Printers, hair dryers, microwaves, water pumps). These devices create massive inrush currents when starting up, which will fry the UPS inverter or destroy the battery. Only plug in electronics like PCs, monitors, and routers. | Source: NFPA 70; CyberPower."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 5. Morse Code
export function MorseCodeConverter({ lang }: { lang: Lang }) {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");

  const morseDict: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
  };

  const reverseDict = Object.fromEntries(Object.entries(morseDict).map(([k, v]) => [v, k]));

  const handleTextChange = (val: string) => {
    setText(val);
    const m = val.toUpperCase().split('').map(c => morseDict[c] || c).join(' ');
    setMorse(m);
  };

  const handleMorseChange = (val: string) => {
    setMorse(val);
    const t = val.split(' ').map(c => reverseDict[c] || c).join('').toLowerCase();
    setText(t);
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-orange-600">{lang === "TH" ? "รหัสมอร์ส (Morse Code)" : "Morse Code Translator"}</h2>
      <div className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ข้อความภาษาอังกฤษ (Text)" : "Text"}</label>
          <textarea rows={3} value={text} onChange={e=>handleTextChange(e.target.value)} className={inputClass} placeholder="SOS" />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "รหัสมอร์ส (ใช้จุด . และขีด -)" : "Morse Code (. and -)"}</label>
          <textarea rows={3} value={morse} onChange={e=>handleMorseChange(e.target.value)} className={inputClass} placeholder="... --- ..." />
        </div>
      </div>
      <AdPlaceholder type="in-article" />
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ: รหัสมอร์ส ประวัติศาสตร์และการใช้งาน":"Morse Code FAQ"}>
          <FAQItem q={lang==="TH"?"รหัสมอร์ส (Morse Code) คืออะไร และใครเป็นผู้คิดค้น?":"What is Morse Code and who invented it?"} a={lang==="TH"?"รหัสมอร์สเป็นวิธีการเข้ารหัสข้อความตัวอักษรเพื่อส่งผ่านระบบโทรเลข (Telegraph) โดยใช้สัญญาณสั้น (จุด หรือ Dot) และสัญญาณยาว (ขีด หรือ Dash) ผสมผสานกัน ถูกคิดค้นขึ้นในช่วงทศวรรษที่ 1830-1840 โดย Samuel Morse และ Alfred Vail การสื่อสารด้วยรหัสมอร์สครั้งแรกเกิดขึ้นในปี 1844 โดยส่งข้อความว่า 'What hath God wrought?' จากกรุงวอชิงตัน ดี.ซี. ไปยังเมืองบัลติมอร์ รหัสมอร์สเข้ามาปฏิวัติการสื่อสารของมวลมนุษยชาติ ทำให้เราสามารถส่งข่าวสารข้ามทวีปได้ในเสี้ยววินาที แทนที่จะต้องใช้เวลานั่งเรือเป็นเดือนๆ | อ้างอิง: Library of Congress - History of the Telegraph; ITU (International Telecommunication Union)." : "Morse code is a method of transmitting text using sequences of short signals (dots) and long signals (dashes) over telegraph systems. Invented in the 1830s by Samuel Morse and Alfred Vail, the first message 'What hath God wrought?' was sent in 1844. It revolutionized global communication, allowing instant transmission across continents. | Source: Library of Congress; ITU."} />
          <FAQItem q={lang==="TH"?"รหัส S.O.S ทำไมถึงมีความสำคัญ และแปลว่าอะไร?":"Why is S.O.S important and what does it mean?"} a={lang==="TH"?"S.O.S คือสัญญาณขอความช่วยเหลือสากลที่คุ้นเคยกันดีที่สุด ซึ่งเขียนด้วยรหัสมอร์สได้เป็น '... --- ...' (จุดสาม จุดสาม ขีดสาม) หลายคนเข้าใจผิดว่ามันย่อมาจาก 'Save Our Souls' หรือ 'Save Our Ship' แต่ความจริงแล้วตัวอักษร SOS ไม่ได้ย่อมาจากคำใดเลย มันถูกเลือกใช้เพราะเป็นรูปแบบจังหวะที่จดจำง่ายที่สุด ส่งง่ายที่สุด และตีความผิดพลาดได้ยากที่สุดในยามฉุกเฉิน สัญญาณ SOS ถูกกำหนดให้เป็นมาตรฐานสากลด้านความปลอดภัยทางทะเลในปี 1906 และถูกใช้ในการขอความช่วยเหลือจากเรือไททานิก (Titanic) ที่กำลังจมในปี 1912 ด้วย | อ้างอิง: International Maritime Organization (IMO); Maritime History Archives." : "S.O.S ('... --- ...') is the universal distress signal. Contrary to popular belief, it does not stand for 'Save Our Souls' or 'Save Our Ship'. It was chosen simply because its rhythmic pattern is incredibly easy to transmit and nearly impossible to misinterpret in emergencies. It became the international standard in 1906 and was famously used by the Titanic in 1912. | Source: IMO; Maritime History."} />
          <FAQItem q={lang==="TH"?"ปัจจุบันรหัสมอร์สยังมีการใช้งานอยู่หรือไม่?":"Is Morse code still used today?"} a={lang==="TH"?"แม้เทคโนโลยีการสื่อสารด้วยเสียงและอินเทอร์เน็ตจะพัฒนาไปมาก แต่รหัสมอร์สยังคงถูกใช้อย่างแพร่หลายในวงการนักวิทยุสมัครเล่น (Amateur Radio หรือ Ham Radio) เนื่องจากเป็นสัญญาณคลื่นวิทยุรูปแบบที่เรียบง่ายที่สุด (Continuous Wave - CW) สามารถทะลุทะลวงชั้นบรรยากาศ เดินทางได้ไกลข้ามโลก และใช้พลังงานต่ำมาก แม้สัญญาณจะขาดๆ หายๆ ก็ยังสามารถจับใจความได้ดีกว่าเสียงพูด นอกจากนี้ยังถูกใช้ในวงการทหาร กองทัพเรือ สัญญาณไฟฉุกเฉินของการบิน และสัญญาณเตือนภัยในระบบนำทางวิทยุ (NDB / VOR) | อ้างอิง: ARRL (American Radio Relay League); FAA (Federal Aviation Administration) Aeronautical Information Manual." : "Yes. While voice and digital comms dominate, Morse code (transmitted as Continuous Wave or CW) is still heavily used by Amateur Radio (Ham Radio) operators. It uses very little bandwidth, travels globally on low power, and is easier to copy than voice in poor conditions. It's also used in military signaling, aviation emergency lights, and NDB/VOR navigational beacons. | Source: ARRL; FAA."} />
          <FAQItem q={lang==="TH"?"กฎและจังหวะเวลาในการส่งสัญญาณรหัสมอร์สที่ถูกต้องคืออะไร?":"What are the timing rules of Morse code?"} a={lang==="TH"?"ความแม่นยำของรหัสมอร์สขึ้นอยู่กับจังหวะเวลา (Timing) โดยมีหน่วยพื้นฐานคือ 1 จุด (Dot / Dit) กฎสากลที่ International Telecommunication Union (ITU) กำหนดไว้มีดังนี้: 1) ความยาวของ 1 ขีด (Dash / Dah) = 3 จุด 2) ช่องว่างระหว่างจุดและขีดในตัวอักษรเดียวกัน = 1 จุด 3) ช่องว่างระหว่างตัวอักษร = 3 จุด 4) ช่องว่างระหว่างคำ = 7 จุด การเว้นจังหวะที่ถูกต้องจะทำให้ผู้รับสามารถแยกแยะความหมายได้อย่างไม่ผิดเพี้ยน | อ้างอิง: ITU-R M.1677-1 Standard - International Morse Code." : "The timing is crucial. The basic unit of time is the duration of a 'dot'. The ITU rules are: 1) A 'dash' is 3 dots long. 2) The space between parts of the same letter is 1 dot. 3) The space between letters is 3 dots. 4) The space between words is 7 dots. Proper timing prevents misinterpretation. | Source: ITU-R M.1677-1 Standard."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 6. ASCII/Unicode
export function AsciiConverter({ lang }: { lang: Lang }) {
  const [text, setText] = useState("");
  
  const chars = text.split('');
  const ascii = chars.map(c => c.charCodeAt(0).toString(10)).join(' ');
  const hex = chars.map(c => c.charCodeAt(0).toString(16).toUpperCase().padStart(2,'0')).join(' ');
  const bin = chars.map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ');

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-orange-600">{lang === "TH" ? "แปลงข้อความ (ASCII/Unicode)" : "ASCII/Unicode Converter"}</h2>
      <div className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ข้อความต้นฉบับ (Text)" : "Original Text"}</label>
          <textarea rows={2} value={text} onChange={e=>setText(e.target.value)} className={inputClass} placeholder="Hello" />
        </div>
        {text && (
          <div className="space-y-4 p-6 bg-orange-50 rounded-xl border border-orange-100">
            <div>
              <p className="font-bold text-gray-700">Decimal (ASCII / Unicode Base-10)</p>
              <div className="font-mono text-sm bg-white p-2 rounded border break-all">{ascii}</div>
            </div>
            <div>
              <p className="font-bold text-gray-700">Hexadecimal (Base-16)</p>
              <div className="font-mono text-sm bg-white p-2 rounded border break-all">{hex}</div>
            </div>
            <div>
              <p className="font-bold text-gray-700">Binary (Base-2)</p>
              <div className="font-mono text-sm bg-white p-2 rounded border break-all">{bin}</div>
            </div>
          </div>
        )}
      </div>
      <AdPlaceholder type="in-article" />
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ: ระบบเข้ารหัสข้อความ ASCII และ Unicode":"ASCII & Unicode FAQ"}>
          <FAQItem q={lang==="TH"?"ASCII คืออะไร และทำไมคอมพิวเตอร์ถึงต้องใช้?":"What is ASCII and why do computers use it?"} a={lang==="TH"?"ASCII ย่อมาจาก American Standard Code for Information Interchange เป็นมาตรฐานการเข้ารหัสตัวอักษรยุคแรกเริ่มที่คิดค้นขึ้นในปี 1963 คอมพิวเตอร์ไม่รู้จักตัวอักษร 'A' หรือ 'B' มันรู้จักเพียงตัวเลข 0 และ 1 (Binary) ASCII จึงเป็นเหมือนพจนานุกรมที่แปลงตัวอักษรภาษาอังกฤษ ตัวเลข และเครื่องหมายวรรคตอน รวม 128 ตัว ให้กลายเป็นตัวเลขตั้งแต่ 0 ถึง 127 เช่น ตัว 'A' พิมพ์ใหญ่ จะถูกคอมพิวเตอร์จำจดในรูปแบบเลขฐานสิบคือ 65 หรือในรูปแบบฐานสองคือ 01000001 เป็นต้น | อ้างอิง: ANSI X3.4-1986 Standard; Computer History Museum." : "ASCII (American Standard Code for Information Interchange) is a character encoding standard created in 1963. Computers only understand binary (0s and 1s). ASCII acts as a dictionary mapping 128 English characters, numbers, and symbols to numbers from 0 to 127. For example, 'A' is mapped to decimal 65, or binary 01000001. | Source: ANSI X3.4; Computer History Museum."} />
          <FAQItem q={lang==="TH"?"จุดอ่อนของ ASCII คืออะไร และทำไมจึงต้องเกิด Unicode ขึ้นมา?":"What are ASCII's limitations and why was Unicode created?"} a={lang==="TH"?"จุดอ่อนที่สำคัญที่สุดของ ASCII คือมันถูกออกแบบมาเพื่อรองรับแค่ 'ภาษาอังกฤษ' เท่านั้น โดยใช้ขนาดข้อมูลเพียง 7 บิต (เก็บอักขระได้ 128 ตัว) เมื่อคอมพิวเตอร์แพร่หลายไปทั่วโลก ประเทศต่างๆ ต้องการพิมพ์ภาษาของตนเอง เช่น ไทย ญี่ปุ่น จีน อาหรับ ซึ่ง 128 ตัวนั้นไม่เพียงพอ จึงเกิดปัญหาฟอนต์เพี้ยนหรือข้อความต่างดาว (Mojibake) บ่อยครั้งในยุคก่อน เพื่อแก้ปัญหานี้ 'Unicode' จึงถูกสร้างขึ้นมาให้เป็นมาตรฐานระดับโลก โดยสามารถจัดเก็บอักขระได้มากถึงกว่า 1.4 ล้านตัว ครอบคลุมทุกภาษาทั่วโลก รวมถึงอีโมจิ (Emoji) ที่เราใช้กันทุกวันนี้ด้วย | อ้างอิง: The Unicode Consortium - Unicode Standard; ISO/IEC 10646." : "ASCII's fatal flaw is that it only supports English, using 7 bits (128 characters). As computing went global, countries needed to type in Thai, Japanese, Arabic, etc., causing text corruption (Mojibake). 'Unicode' was invented as a global standard capable of storing over 1.4 million characters, covering every written language in the world, including Emojis. | Source: The Unicode Consortium; ISO/IEC 10646."} />
          <FAQItem q={lang==="TH"?"UTF-8 เกี่ยวข้องกับ Unicode อย่างไร?":"How is UTF-8 related to Unicode?"} a={lang==="TH"?"Unicode เป็นเพียง 'ตารางอ้างอิง' ที่บอกว่าอักษรตัวไหนมีรหัสอะไร แต่ UTF-8 (Unicode Transformation Format - 8-bit) คือ 'วิธีการจัดเก็บรหัสนั้นลงในหน่วยความจำ' UTF-8 เป็นเทคโนโลยีที่ชาญฉลาดมาก เพราะมันสามารถยืดหดขนาดไฟล์ได้ตามความจำเป็น (Variable-width encoding) ตัวอักษรภาษาอังกฤษจะใช้พื้นที่เพียง 1 Byte (เหมือน ASCII ทำให้เข้ากันได้กับระบบเก่า 100%) ส่วนภาษาไทยจะใช้ 3 Bytes และอีโมจิจะใช้ 4 Bytes ในปัจจุบัน เว็บไซต์กว่า 98% ทั่วโลกเลือกใช้ UTF-8 เป็นมาตรฐานหลัก | อ้างอิง: W3C - Character Encodings; IETF RFC 3629." : "Unicode is the reference index, assigning a unique number to every character. UTF-8 (Unicode Transformation Format) is the 'encoding method' used to store those numbers in memory. UTF-8 is brilliant because it's variable-width: English characters use 1 byte (making it 100% backwards compatible with ASCII), Thai uses 3 bytes, and Emojis use 4 bytes. Today, over 98% of all websites use UTF-8. | Source: W3C; IETF RFC 3629."} />
          <FAQItem q={lang==="TH"?"เลขฐาน 16 (Hexadecimal) ทำไมโปรแกรมเมอร์ถึงชอบใช้?":"Why do programmers use Hexadecimal?"} a={lang==="TH"?"เลขฐานสอง (Binary) มีแค่ 0 กับ 1 ทำให้อ่านยากและมีความยาวมากเกินไป เช่น เลข 255 ในฐานสองคือ 11111111 ส่วนเลขฐานสิบ (Decimal) ก็แปลงกลับเป็นฐานสองได้ยากในสมองมนุษย์ เลขฐานสิบหก (Hexadecimal) ประกอบด้วย 0-9 และ A-F ถูกสร้างมาเป็นสะพานเชื่อมที่สมบูรณ์แบบ เพราะเลข Hex 1 ตัวอักษร จะแทนเลขฐานสองได้ 4 บิตพอดี (1 Nibble) รหัสสีในเว็บไซต์อย่าง #FFFFFF จึงอ่านและจัดเก็บง่ายกว่าการเขียนเลขฐานสองยาวๆ 24 ตัว | อ้างอิง: IEEE Computer Society - Number Systems; MIT Computer Science Documentation." : "Binary (0s and 1s) is too long and hard for humans to read (e.g., 11111111). Decimal is hard to mentally convert back to binary. Hexadecimal (0-9, A-F) is the perfect middle ground because exactly one Hex digit perfectly represents 4 binary bits (1 Nibble). Web color codes like #FFFFFF are much easier to read than a string of 24 binary digits. | Source: IEEE; MIT CS Docs."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 7. Cache Hit Rate
export function CacheHitRateCalculator({ lang }: { lang: Lang }) {
  const [hits, setHits] = useLocalState("cache_hit", "");
  const [misses, setMisses] = useLocalState("cache_miss", "");

  const h = parseInt(hits);
  const m = parseInt(misses);
  
  let hitRate = 0;
  let missRate = 0;
  const total = h + m;

  if (total > 0) {
    hitRate = (h / total) * 100;
    missRate = (m / total) * 100;
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-orange-600">{lang === "TH" ? "คำนวณ Cache Hit Rate" : "Cache Hit Rate"}</h2>
      <div className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "จำนวน Cache Hits" : "Cache Hits"}</label><input type="number" value={hits} onChange={e=>setHits(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "จำนวน Cache Misses" : "Cache Misses"}</label><input type="number" value={misses} onChange={e=>setMisses(e.target.value)} className={inputClass} /></div>
        </div>
      </div>
      {total > 0 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-orange-50 rounded-xl text-center">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-green-600 font-bold mb-1">Hit Rate</p>
              <div className="text-4xl font-black text-green-600">{hitRate.toFixed(2)}%</div>
            </div>
            <div>
              <p className="text-red-500 font-bold mb-1">Miss Rate</p>
              <div className="text-3xl font-bold text-red-500">{missRate.toFixed(2)}%</div>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4">{lang === "TH" ? `คำขอทั้งหมด (Total Requests): ${total.toLocaleString()}` : `Total Requests: ${total.toLocaleString()}`}</p>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ: ระบบ Cache และการวัดประสิทธิภาพ":"Cache Performance FAQ"}>
          <FAQItem q={lang==="TH"?"Cache (แคช) คืออะไร ทำไมระบบคอมพิวเตอร์และเว็บไซต์ถึงต้องมี?":"What is a Cache and why is it necessary?"} a={lang==="TH"?"Cache คือหน่วยความจำความเร็วสูงมากที่ทำหน้าที่จัดเก็บข้อมูลที่ถูกเรียกใช้งานบ่อยๆ ไว้ชั่วคราว เพื่อลดระยะเวลาการเข้าถึงข้อมูล (Latency) ในครั้งต่อไป เนื่องจากหน่วยจัดเก็บข้อมูลหลัก เช่น ฮาร์ดดิสก์ (HDD) หรือฐานข้อมูล (Database) มักจะทำงานช้า เมื่อระบบประมวลผลข้อมูลเสร็จหนึ่งครั้ง มันจะเก็บผลลัพธ์ไว้ใน Cache หากมีคำขอข้อมูลเดิมเข้ามาอีก ระบบสามารถดึงข้อมูลจาก Cache ไปเสิร์ฟได้ทันทีโดยไม่ต้องไปค้นหาหรือประมวลผลใหม่ ช่วยลดภาระของเซิร์ฟเวอร์ และทำให้เว็บไซต์หรือแอปพลิเคชันโหลดเร็วขึ้นอย่างก้าวกระโดด ตัวอย่างที่เห็นได้ชัดคือ Redis, Memcached หรือ CDN อย่าง Cloudflare | อ้างอิง: AWS - What is Caching; Microsoft Azure Caching Best Practices." : "A Cache is a highly optimized, temporary high-speed storage layer. It stores frequently accessed data to drastically reduce data retrieval latency. Since main databases or HDDs are slow, processing data once and storing it in a cache allows subsequent identical requests to be served instantly without re-processing. This reduces server load and drastically improves web performance. Examples include Redis, Memcached, and CDNs like Cloudflare. | Source: AWS Caching; Microsoft Azure."} />
          <FAQItem q={lang==="TH"?"Cache Hit กับ Cache Miss คืออะไร?":"What are Cache Hit and Cache Miss?"} a={lang==="TH"?"• Cache Hit: คือสภาวะที่ระบบต้องการค้นหาข้อมูล แล้วพบว่ามีข้อมูลนั้นเตรียมพร้อมรออยู่ใน Cache เรียบร้อยแล้ว ทำให้สามารถส่งข้อมูลกลับไปได้ทันที (ถือเป็นสถานการณ์ที่ดีที่สุด) \n• Cache Miss: คือสภาวะที่ค้นหาข้อมูลใน Cache แล้ว 'ไม่พบ' ทำให้ระบบต้องเสียเวลาวิ่งกลับไปค้นหาข้อมูลจากฐานข้อมูลหลักหรือประมวลผลใหม่ ซึ่งกินเวลานานกว่า จากนั้นจึงค่อยนำข้อมูลนั้นมาเขียนลง Cache เพื่อเตรียมพร้อมสำหรับการเรียกใช้ครั้งต่อไป | อ้างอิง: MDN Web Docs - HTTP Caching; RFC 9111 HTTP Caching." : "• Cache Hit: Occurs when the requested data is successfully found in the cache memory, allowing for instant retrieval (the ideal scenario). \n• Cache Miss: Occurs when the requested data is NOT found in the cache. The system must then take the slow route to fetch the data from the primary database, calculate it, and then write it to the cache for future use. | Source: MDN Web Docs; RFC 9111."} />
          <FAQItem q={lang==="TH"?"Cache Hit Rate ที่ดีควรอยู่ที่ประมาณเท่าไร?":"What is considered a good Cache Hit Rate?"} a={lang==="TH"?"Cache Hit Rate คือเปอร์เซ็นต์ของคำขอที่ระบบสามารถตอบสนองได้จาก Cache ยิ่งค่านี้สูงยิ่งแปลว่าระบบมีประสิทธิภาพดี ไม่มีตัวเลขตายตัวที่เหมาะสมสำหรับทุกระบบ แต่โดยทั่วไปสำหรับ Web Server หรือ CDN (Content Delivery Network) การมี Hit Rate ที่ระดับ 80% - 95% ถือว่าระบบมีสุขภาพที่ยอดเยี่ยมมาก หากตัวเลขตกไปต่ำกว่า 50% อาจเป็นสัญญาณเตือนว่านโยบายการเก็บ Cache (Eviction Policy เช่น LRU, LFU) อาจมีปัญหา หรือพื้นที่ Cache เล็กเกินไปจนข้อมูลโดนเตะออกบ่อย หรือข้อมูลเปลี่ยนบ่อยเกินไป (Highly Dynamic) | อ้างอิง: Cloudflare - What is Cache Hit Ratio; NGINX Caching Guide." : "Cache Hit Rate is the percentage of requests successfully served from the cache. Higher is better. While it varies by application, a hit rate of 80% - 95% for Web Servers or CDNs is considered excellent. If it drops below 50%, it strongly indicates issues such as poor eviction policies (LRU, LFU), undersized cache memory, or data that is too dynamic to be effectively cached. | Source: Cloudflare; NGINX."} />
          <FAQItem q={lang==="TH"?"ปัญหา Cache Invalidation (การเคลียร์แคช) ทำไมโปรแกรมเมอร์ถึงบอกว่ามันยากที่สุด?":"Why is Cache Invalidation considered the hardest problem in computer science?"} a={lang==="TH"?"มีคำกล่าวตลกๆ ในวงการวิทยาการคอมพิวเตอร์ว่า 'มีเรื่องยากอยู่แค่ 2 เรื่องเท่านั้น คือ การตั้งชื่อตัวแปร และ Cache Invalidation' ปัญหาหลักของ Cache คือ เมื่อข้อมูลในฐานข้อมูลหลักถูกอัปเดต (เช่น มีคนเปลี่ยนราคาสินค้า) เราจะทำอย่างไรให้ข้อมูลใน Cache ถูกลบหรืออัปเดตตามทันที (Invalidation) หากลบช้าเกินไป ผู้ใช้จะเห็นราคาเก่าที่ผิดพลาด (Stale Data) แต่หากตั้งระบบให้ลบบ่อยเกินไป (TTL สั้น) Cache Hit Rate ก็จะตก และเซิร์ฟเวอร์ก็จะต้องรับภาระหนักในการประมวลผลใหม่ การหาสมดุลระหว่างข้อมูลที่สดใหม่ (Freshness) และประสิทธิภาพ (Performance) จึงเป็นความท้าทายระดับสถาปัตยกรรมระบบ | อ้างอิง: Martin Fowler - Cache Invalidation; ACM (Association for Computing Machinery) Publications." : "There's a famous joke: 'There are only two hard things in Computer Science: cache invalidation and naming things.' The challenge is: when primary database data is updated (e.g., a price change), how do you instantly ensure the cache is purged or updated? If done too late, users see stale, incorrect data. If invalidated too frequently (short TTL), the Cache Hit Rate plummets, overloading the main server. Balancing data freshness with optimal performance is a major architectural challenge. | Source: Martin Fowler; ACM."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { ShareButtons } from "../ShareButtons";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem } from "./shared";

// 1. Bandwidth / Download Time
export function BandwidthCalculator({ lang }: { lang: Lang }) {
  const [fileSize, setFileSize] = useLocalState("bw_size", "");
  const [speed, setSpeed] = useLocalState("bw_speed", "");
  
  // File Size (MB), Speed (Mbps) -> Time = (MB * 8) / Mbps
  const seconds = (parseFloat(fileSize) * 8) / parseFloat(speed);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600">{lang === "TH" ? "คำนวณ Bandwidth" : "Bandwidth Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ขนาดไฟล์ (MB)" : "File Size (MB)"}</label><input type="number" value={fileSize} onChange={e=>setFileSize(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ความเร็วเน็ต (Mbps)" : "Internet Speed (Mbps)"}</label><input type="number" value={speed} onChange={e=>setSpeed(e.target.value)} className={inputClass} /></div>
      </div>
      {fileSize && speed && !isNaN(seconds) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-blue-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "เวลาดาวน์โหลดโดยประมาณ" : "Estimated Download Time"}</p>
          <div className="text-4xl font-black text-blue-600">
            {seconds < 60 ? `${Math.ceil(seconds)} ${lang === "TH"?"วินาที":"Secs"}` : `${Math.floor(seconds/60)} ${lang === "TH"?"นาที":"Mins"} ${Math.ceil(seconds%60)} ${lang === "TH"?"วิ":"Secs"}`}
          </div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — Bandwidth":"Bandwidth FAQ"}>
          <FAQItem q={lang==="TH"?"Mbps กับ MBps ต่างกันอย่างไร?":"What's the difference between Mbps and MBps?"} a={lang==="TH"?"Mbps = Megabits per second (ใช้วัดความเร็วเน็ต), MBps = Megabytes per second (ใช้วัดขนาดไฟล์) โดย 1 MBps = 8 Mbps เช่น เน็ต 100 Mbps = ดาวน์โหลดได้ประมาณ 12.5 MBps ในทางปฏิบัติ overhead ของ protocol ทำให้ได้จริงประมาณ 85-90% | อ้างอิง: IEEE 802.3 Ethernet Standard; RFC 5765 IETF.":"Mbps = Megabits/sec (network speed), MBps = Megabytes/sec (file size). 1 MBps = 8 Mbps. 100 Mbps ≈ 12.5 MBps in theory, ~85-90% in practice due to protocol overhead. | Source: IEEE 802.3; IETF RFC 5765."} />
          <FAQItem q={lang==="TH"?"ทำไมดาวน์โหลดจริงช้ากว่าความเร็วเน็ตที่สมัคร?":"Why is actual download slower than advertised speed?"} a={lang==="TH"?"เพราะ 1) ISP ให้แค่ 'up to' ไม่รับประกัน 100% 2) จำนวนผู้ใช้ในช่วงเวลาเดียวกัน (Peak Hours) 3) ระยะทางจาก Server 4) คุณภาพ Router/สาย LAN 5) Latency ของเครือข่าย | อ้างอิง: NBTC Thailand (กสทช.) — มาตรฐานความเร็วอินเทอร์เน็ต.":"Due to 1) ISP 'up to' speeds 2) Peak hour congestion 3) Server distance 4) Router/cable quality 5) Network latency. | Source: NBTC Thailand — Internet Speed Standards."} />
          <FAQItem q={lang==="TH"?"ความเร็วเน็ตเท่าไรถึงเพียงพอสำหรับ Streaming 4K?":"What internet speed is needed for 4K streaming?"} a={lang==="TH"?"Netflix แนะนำ: SD = 3 Mbps, HD = 5 Mbps, 4K UHD = 25 Mbps ขึ้นไป สำหรับ YouTube 4K ต้องการ 20 Mbps+ และ Zoom HD ต้องการ 3.8 Mbps (upload+download) | อ้างอิง: Netflix Help Center (2024); YouTube System Requirements; Zoom Bandwidth Requirements.":"Netflix recommends: SD = 3 Mbps, HD = 5 Mbps, 4K = 25+ Mbps. YouTube 4K needs 20+ Mbps. Zoom HD needs 3.8 Mbps. | Source: Netflix Help (2024); YouTube; Zoom Requirements."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 2. Server Cost
export function ServerCostCalculator({ lang }: { lang: Lang }) {
  const [hourlyRate, setHourlyRate] = useLocalState("server_rate", "");
  const [hours, setHours] = useLocalState("server_hours", "730"); // 730h/month avg
  
  const cost = parseFloat(hourlyRate) * parseFloat(hours);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600">{lang === "TH" ? "คำนวณ Server Cost" : "Server Cost"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ค่าบริการต่อชั่วโมง ($)" : "Hourly Rate ($)"}</label><input type="number" step="0.001" value={hourlyRate} onChange={e=>setHourlyRate(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ชั่วโมงการใช้งานต่อเดือน" : "Hours per Month"}</label><input type="number" value={hours} onChange={e=>setHours(e.target.value)} className={inputClass} /></div>
      </div>
      {hourlyRate && hours && !isNaN(cost) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-blue-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "ค่าใช้จ่ายรายเดือน" : "Monthly Cost"}</p>
          <div className="text-4xl font-black text-blue-600">${cost.toFixed(2)}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ค่า Server":"Server Cost FAQ"}>
          <FAQItem q={lang==="TH"?"Cloud Server ราคาเท่าไรเป็นมาตรฐาน?":"What are typical cloud server prices?"} a={lang==="TH"?"AWS EC2 t3.micro เริ่มต้น $0.0104/ชม. (~$7.6/เดือน), DigitalOcean เริ่ม $4/เดือน, Google Cloud e2-micro มี Free Tier ราคาขึ้นอยู่กับ vCPU, RAM, Storage, Bandwidth | อ้างอิง: AWS Pricing Page (2024); DigitalOcean Pricing; Google Cloud Pricing Calculator.":"AWS EC2 t3.micro starts at $0.0104/hr (~$7.6/mo), DigitalOcean from $4/mo, GCP e2-micro has Free Tier. Price depends on vCPU, RAM, storage, bandwidth. | Source: AWS/DigitalOcean/GCP Pricing (2024)."} />
          <FAQItem q={lang==="TH"?"เลือก Cloud Provider ไหนดี?":"Which cloud provider should I choose?"} a={lang==="TH"?"AWS เหมาะสำหรับ Enterprise ที่ต้องการบริการครบ / GCP เหมาะสำหรับ AI/ML และ Big Data / Azure เหมาะสำหรับองค์กรที่ใช้ Microsoft / DigitalOcean เหมาะสำหรับ Startup ที่ต้องการความง่าย | อ้างอิง: Gartner Magic Quadrant for Cloud Infrastructure (2024).":"AWS for enterprise / GCP for AI/ML / Azure for Microsoft ecosystem / DigitalOcean for simplicity. | Source: Gartner Magic Quadrant for Cloud Infrastructure (2024)."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 3. Image Size
export function ImageSizeCalculator({ lang }: { lang: Lang }) {
  const [width, setWidth] = useLocalState("img_w", "");
  const [height, setHeight] = useLocalState("img_h", "");
  const [bitDepth, setBitDepth] = useLocalState("img_bit", "24");
  
  const sizeBytes = (parseFloat(width) * parseFloat(height) * parseFloat(bitDepth)) / 8;
  const sizeMB = sizeBytes / (1024 * 1024);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600">{lang === "TH" ? "คำนวณขนาดรูปภาพ" : "Image Size"}</h2>
      <div className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "กว้าง (px)" : "Width (px)"}</label><input type="number" value={width} onChange={e=>setWidth(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "สูง (px)" : "Height (px)"}</label><input type="number" value={height} onChange={e=>setHeight(e.target.value)} className={inputClass} /></div>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "Bit Depth" : "Bit Depth"}</label>
          <select value={bitDepth} onChange={e=>setBitDepth(e.target.value)} className={inputClass}>
            <option value="8">8-bit (Grayscale/Indexed)</option>
            <option value="24">24-bit (RGB)</option>
            <option value="32">32-bit (RGBA)</option>
          </select>
        </div>
      </div>
      {width && height && !isNaN(sizeMB) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-blue-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "ขนาดไฟล์ (Uncompressed)" : "Uncompressed Size"}</p>
          <div className="text-4xl font-black text-blue-600">{sizeMB.toFixed(2)} MB</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ขนาดรูปภาพ":"Image Size FAQ"}>
          <FAQItem q={lang==="TH"?"JPEG, PNG, WebP ต่างกันอย่างไร?":"What's the difference between JPEG, PNG, and WebP?"} a={lang==="TH"?"JPEG: บีบอัดแบบ Lossy เหมาะกับรูปถ่าย ขนาดเล็ก แต่เสียคุณภาพ / PNG: บีบอัดแบบ Lossless รองรับ Transparency เหมาะกับกราฟิก/โลโก้ / WebP: พัฒนาโดย Google รองรับทั้ง Lossy+Lossless ขนาดเล็กกว่า JPEG 25-34% | อ้างอิง: Google Developers — WebP Documentation; W3Techs Image Format Usage (2024).":"JPEG: Lossy compression for photos / PNG: Lossless with transparency for graphics / WebP: Google's format, 25-34% smaller than JPEG. | Source: Google WebP Docs; W3Techs (2024)."} />
          <FAQItem q={lang==="TH"?"ขนาดรูปที่เหมาะสำหรับเว็บไซต์คือเท่าไร?":"What image size is best for websites?"} a={lang==="TH"?"Google PageSpeed Insights แนะนำให้รูปแต่ละรูปไม่เกิน 200 KB สำหรับ Hero Image ควรไม่เกิน 500 KB ความละเอียดที่แนะนำ: Full-width = 1920px, Thumbnail = 300-400px, Social Media = 1200x630px | อ้างอิง: Google PageSpeed Insights; Web.dev Image Optimization Guide (2024).":"Google PageSpeed recommends <200KB per image. Hero images <500KB. Recommended sizes: Full-width 1920px, Thumbnail 300-400px, Social 1200x630px. | Source: Google PageSpeed; Web.dev (2024)."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 4. IP Subnet (Simplified Mask calculation)
export function IPSubnetCalculator({ lang }: { lang: Lang }) {
  const [cidr, setCidr] = useLocalState("ip_cidr", "24");
  
  const cidrNum = parseInt(cidr);
  const hosts = cidrNum <= 32 && cidrNum >= 0 ? Math.pow(2, 32 - cidrNum) - 2 : 0;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600">{lang === "TH" ? "คำนวณ IP Subnet" : "IP Subnet"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "CIDR Prefix (เช่น 24 สำหรับ /24)" : "CIDR Prefix (e.g. 24)"}</label><input type="number" min="0" max="32" value={cidr} onChange={e=>setCidr(e.target.value)} className={inputClass} /></div>
      </div>
      {cidr && !isNaN(cidrNum) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-blue-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "จำนวน Host ที่ใช้งานได้" : "Usable Hosts"}</p>
          <div className="text-4xl font-black text-blue-600">{Math.max(0, hosts).toLocaleString()}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — IP Subnet":"IP Subnet FAQ"}>
          <FAQItem q={lang==="TH"?"CIDR คืออะไร? /24 หมายความว่าอย่างไร?":"What is CIDR? What does /24 mean?"} a={lang==="TH"?"CIDR (Classless Inter-Domain Routing) คือวิธีระบุขนาดเครือข่าย /24 หมายถึง Subnet Mask 255.255.255.0 ใช้ได้ 254 hosts, /16 = 65,534 hosts, /8 = 16.7 ล้าน hosts สูตร: จำนวน host = 2^(32-CIDR) - 2 (ลบ Network+Broadcast) | อ้างอิง: RFC 4632 — CIDR Address Strategy; Cisco Networking Academy.":"CIDR notation /24 = 255.255.255.0 mask = 254 usable hosts. Formula: hosts = 2^(32-prefix) - 2. /16 = 65,534 hosts, /8 = 16.7M hosts. | Source: RFC 4632; Cisco Networking Academy."} />
          <FAQItem q={lang==="TH"?"IPv4 กับ IPv6 ต่างกันอย่างไร?":"What's the difference between IPv4 and IPv6?"} a={lang==="TH"?"IPv4 มี 32-bit (4.3 พันล้าน addresses) กำลังจะหมด IPv6 มี 128-bit (3.4×10^38 addresses) แทบไม่มีวันหมด IPv6 ไม่ต้องใช้ NAT มีความปลอดภัยมากกว่า (IPSec built-in) | อ้างอิง: IANA IPv4 Address Depletion; RFC 8200 — IPv6 Specification.":"IPv4: 32-bit (4.3B addresses, nearly exhausted). IPv6: 128-bit (3.4×10^38 addresses), no NAT needed, built-in IPSec. | Source: IANA; RFC 8200."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 5. Video Bitrate
export function VideoBitrateCalculator({ lang }: { lang: Lang }) {
  const [duration, setDuration] = useLocalState("vid_dur", "");
  const [bitrate, setBitrate] = useLocalState("vid_bitrate", ""); // Mbps
  
  // Size = duration(sec) * bitrate(Mbps) / 8 -> MB
  const size = (parseFloat(duration) * 60 * parseFloat(bitrate)) / 8;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600">{lang === "TH" ? "คำนวณ FPS/Bitrate" : "Video Bitrate"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ความยาววิดีโอ (นาที)" : "Duration (Mins)"}</label><input type="number" value={duration} onChange={e=>setDuration(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "Video Bitrate (Mbps)" : "Bitrate (Mbps)"}</label><input type="number" value={bitrate} onChange={e=>setBitrate(e.target.value)} className={inputClass} /></div>
      </div>
      {duration && bitrate && !isNaN(size) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-blue-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "ขนาดไฟล์โดยประมาณ" : "Estimated File Size"}</p>
          <div className="text-4xl font-black text-blue-600">{size >= 1024 ? (size/1024).toFixed(2)+' GB' : size.toFixed(2)+' MB'}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — Video Bitrate":"Video Bitrate FAQ"}>
          <FAQItem q={lang==="TH"?"Bitrate ที่เหมาะสมสำหรับ YouTube คือเท่าไร?":"What bitrate should I use for YouTube?"} a={lang==="TH"?"YouTube แนะนำ: 1080p SDR = 8 Mbps, 1080p HDR = 10 Mbps, 4K SDR = 35-45 Mbps, 4K HDR = 44-56 Mbps (H.264) สำหรับ H.265/HEVC ใช้ bitrate ต่ำกว่า 30-40% ที่คุณภาพเดียวกัน | อ้างอิง: YouTube Help — Recommended Upload Encoding Settings (2024).":"YouTube recommends: 1080p SDR = 8 Mbps, 4K SDR = 35-45 Mbps (H.264). H.265/HEVC uses 30-40% less bitrate at same quality. | Source: YouTube Upload Encoding Settings (2024)."} />
          <FAQItem q={lang==="TH"?"Codec H.264 กับ H.265 ต่างกันอย่างไร?":"H.264 vs H.265: what's the difference?"} a={lang==="TH"?"H.264 (AVC): รองรับทุกอุปกรณ์ ใช้ CPU น้อย / H.265 (HEVC): บีบอัดดีกว่า 30-40% แต่ encode ช้ากว่า ต้องใช้ CPU มากกว่า / AV1: Codec ใหม่ Open-Source บีบอัดดีกว่า H.265 อีก 20% | อ้างอิง: ITU-T H.264 Standard; ITU-T H.265 Standard; Alliance for Open Media — AV1.":"H.264: Universal support, fast encoding. H.265: 30-40% smaller files, slower encoding. AV1: Open-source, 20% better than H.265. | Source: ITU-T H.264/H.265; AOM AV1."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 6. Battery Life
export function BatteryLifeCalculator({ lang }: { lang: Lang }) {
  const [capacity, setCapacity] = useLocalState("bat_cap", "");
  const [consumption, setConsumption] = useLocalState("bat_cons", "");
  
  // Time = Capacity (mAh) / Consumption (mA) * 0.7 (efficiency)
  const hours = (parseFloat(capacity) / parseFloat(consumption)) * 0.7;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600">{lang === "TH" ? "คำนวณ Battery Life" : "Battery Life"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ความจุแบตเตอรี่ (mAh)" : "Capacity (mAh)"}</label><input type="number" value={capacity} onChange={e=>setCapacity(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "การกินกระแสไฟของอุปกรณ์ (mA)" : "Device Consumption (mA)"}</label><input type="number" value={consumption} onChange={e=>setConsumption(e.target.value)} className={inputClass} /></div>
      </div>
      {capacity && consumption && !isNaN(hours) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-blue-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "ระยะเวลาใช้งาน (เผื่อ Loss 30%)" : "Estimated Time (30% Loss)"}</p>
          <div className="text-4xl font-black text-blue-600">{hours.toFixed(1)} {lang === "TH" ? "ชั่วโมง" : "Hours"}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — แบตเตอรี่":"Battery Life FAQ"}>
          <FAQItem q={lang==="TH"?"mAh คืออะไร? ยิ่งมากยิ่งดีไหม?":"What is mAh? Is more always better?"} a={lang==="TH"?"mAh (milliAmpere-hour) คือหน่วยวัดความจุแบตเตอรี่ 4000 mAh จุไฟมากกว่า 3000 mAh แต่อายุการใช้งานจริงขึ้นอยู่กับประสิทธิภาพ CPU, หน้าจอ, และซอฟต์แวร์ด้วย เช่น iPhone 15 Pro (3274 mAh) อาจอยู่นานกว่า Android บางรุ่นที่มี 5000 mAh | อ้างอิง: Battery University — Understanding Battery Capacity; GSMArena Battery Tests (2024).":"mAh measures battery capacity. 4000 mAh > 3000 mAh, but real battery life depends on CPU efficiency, screen, and software. iPhone 15 Pro (3274 mAh) may outlast some 5000 mAh Androids. | Source: Battery University; GSMArena (2024)."} />
          <FAQItem q={lang==="TH"?"ชาร์จแบตอย่างไรให้อายุยืนที่สุด?":"How to maximize battery lifespan?"} a={lang==="TH"?"1) รักษาระดับแบต 20-80% (หลีกเลี่ยง 0% และ 100%) 2) ใช้สายชาร์จแท้หรือได้มาตรฐาน 3) หลีกเลี่ยงการชาร์จขณะใช้งานหนัก (ความร้อนทำลายแบต) 4) ปิด Fast Charge ตอนชาร์จข้ามคืน 5) อุณหภูมิ 20-25°C เหมาะที่สุด | อ้างอิง: Battery University — How to Prolong Lithium-based Batteries; Apple Battery Health (2024).":"1) Keep charge 20-80% 2) Use certified chargers 3) Avoid heavy use while charging 4) Disable fast charge overnight 5) 20-25°C optimal temp. | Source: Battery University; Apple Battery Health (2024)."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 7. Hash Rate
export function HashRateCalculator({ lang }: { lang: Lang }) {
  const [hash, setHash] = useLocalState("hash_rate", "");
  const [power, setPower] = useLocalState("hash_power", "");
  const [cost, setCost] = useLocalState("hash_cost", "");
  
  // Daily electricity cost
  const dailyCost = (parseFloat(power) / 1000) * 24 * parseFloat(cost);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600">{lang === "TH" ? "คำนวณ Hash Rate" : "Hash Rate Mining"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "Hash Rate (TH/s)" : "Hash Rate (TH/s)"}</label><input type="number" value={hash} onChange={e=>setHash(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "การกินไฟของเครื่อง (Watts)" : "Power Consumption (W)"}</label><input type="number" value={power} onChange={e=>setPower(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ค่าไฟต่อหน่วย (บาท/kWh)" : "Electricity Cost ($/kWh)"}</label><input type="number" step="0.1" value={cost} onChange={e=>setCost(e.target.value)} className={inputClass} /></div>
      </div>
      {power && cost && !isNaN(dailyCost) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-blue-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "ค่าไฟต่อวัน" : "Daily Electricity Cost"}</p>
          <div className="text-4xl font-black text-blue-600">{lang==="TH"?"฿":"$"}{dailyCost.toFixed(2)}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ขุด Crypto":"Hash Rate Mining FAQ"}>
          <FAQItem q={lang==="TH"?"Hash Rate คืออะไร? TH/s หมายความว่าอย่างไร?":"What is Hash Rate? What does TH/s mean?"} a={lang==="TH"?"Hash Rate คือจำนวนการคำนวณ hash ต่อวินาทีที่เครื่องขุดทำได้ 1 TH/s = 1 ล้านล้าน hashes/วินาที ยิ่งสูงยิ่งมีโอกาสขุดได้เหรียญมาก แต่ก็กินไฟมากตาม Difficulty ของเครือข่ายจะปรับตาม Hash Rate รวมทุก 2 สัปดาห์ (Bitcoin) | อ้างอิง: Bitcoin Whitepaper — Nakamoto S. (2008); Blockchain.com — Network Difficulty.":"Hash Rate = calculations per second. 1 TH/s = 1 trillion hashes/sec. Higher rate = more mining chance but more power. Network difficulty adjusts every ~2 weeks (Bitcoin). | Source: Bitcoin Whitepaper (2008); Blockchain.com."} />
          <FAQItem q={lang==="TH"?"ขุด Bitcoin ยังคุ้มไหมในปี 2024?":"Is Bitcoin mining still profitable in 2024?"} a={lang==="TH"?"ขึ้นอยู่กับ 3 ปัจจัย: 1) ราคา Bitcoin ปัจจุบัน 2) ค่าไฟต่อ kWh (ไทยเฉลี่ย 4-5 บาท/kWh ถือว่าสูง) 3) ประสิทธิภาพเครื่องขุด (J/TH) หลัง Halving 2024 รางวัลเหลือ 3.125 BTC/บล็อก ทำให้ต้องการเครื่องรุ่นใหม่ที่ประหยัดไฟมากขึ้น | อ้างอิง: Cambridge Bitcoin Electricity Consumption Index (CBECI); Bitcoin Block Reward Halving Schedule.":"Depends on 3 factors: 1) BTC price 2) Electricity cost (Thai average 4-5 THB/kWh is high) 3) Machine efficiency (J/TH). Post-2024 Halving: 3.125 BTC/block. | Source: CBECI; Bitcoin Halving Schedule."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

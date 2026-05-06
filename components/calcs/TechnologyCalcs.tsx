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
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (เทคโนโลยี)" : "Technology FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลลัพธ์นี้เป็นเพียงการประมาณการเบื้องต้น ปัจจัยแวดล้อมเช่นประสิทธิภาพของอุปกรณ์อาจส่งผลต่อผลลัพธ์จริง" : "This result is a basic estimation. Environmental factors such as device efficiency may affect actual results."} 
          />
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
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (เทคโนโลยี)" : "Technology FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลลัพธ์นี้เป็นเพียงการประมาณการเบื้องต้น ปัจจัยแวดล้อมเช่นประสิทธิภาพของอุปกรณ์อาจส่งผลต่อผลลัพธ์จริง" : "This result is a basic estimation. Environmental factors such as device efficiency may affect actual results."} 
          />
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
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (เทคโนโลยี)" : "Technology FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลลัพธ์นี้เป็นเพียงการประมาณการเบื้องต้น ปัจจัยแวดล้อมเช่นประสิทธิภาพของอุปกรณ์อาจส่งผลต่อผลลัพธ์จริง" : "This result is a basic estimation. Environmental factors such as device efficiency may affect actual results."} 
          />
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
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (เทคโนโลยี)" : "Technology FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลลัพธ์นี้เป็นเพียงการประมาณการเบื้องต้น ปัจจัยแวดล้อมเช่นประสิทธิภาพของอุปกรณ์อาจส่งผลต่อผลลัพธ์จริง" : "This result is a basic estimation. Environmental factors such as device efficiency may affect actual results."} 
          />
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
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (เทคโนโลยี)" : "Technology FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลลัพธ์นี้เป็นเพียงการประมาณการเบื้องต้น ปัจจัยแวดล้อมเช่นประสิทธิภาพของอุปกรณ์อาจส่งผลต่อผลลัพธ์จริง" : "This result is a basic estimation. Environmental factors such as device efficiency may affect actual results."} 
          />
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
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (เทคโนโลยี)" : "Technology FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลลัพธ์นี้เป็นเพียงการประมาณการเบื้องต้น ปัจจัยแวดล้อมเช่นประสิทธิภาพของอุปกรณ์อาจส่งผลต่อผลลัพธ์จริง" : "This result is a basic estimation. Environmental factors such as device efficiency may affect actual results."} 
          />
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
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (เทคโนโลยี)" : "Technology FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลลัพธ์นี้เป็นเพียงการประมาณการเบื้องต้น ปัจจัยแวดล้อมเช่นประสิทธิภาพของอุปกรณ์อาจส่งผลต่อผลลัพธ์จริง" : "This result is a basic estimation. Environmental factors such as device efficiency may affect actual results."} 
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

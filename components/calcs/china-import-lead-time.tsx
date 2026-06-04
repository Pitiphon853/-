"use client";

import React, { useState } from "react";
import { Ship, Calendar, Plane, Truck, Factory, PackageCheck } from "lucide-react";

export default function ChinaImportLeadTime({ lang = "th" }: any) {
  const [productionDays, setProductionDays] = useState<number>(3);
  const [chinaTransitDays, setChinaTransitDays] = useState<number>(3);
  const [transportType, setTransportType] = useState<"car" | "boat" | "air">("car");
  const [customsDays, setCustomsDays] = useState<number>(2);
  const [thaiTransitDays, setThaiTransitDays] = useState<number>(2);

  const getTransportDays = () => {
    switch (transportType) {
      case "air":
        return 3;
      case "car":
        return 5;
      case "boat":
        return 15;
      default:
        return 5;
    }
  };

  const getTransportRange = () => {
    switch (transportType) {
      case "air":
        return "3-5";
      case "car":
        return "4-7";
      case "boat":
        return "12-20";
      default:
        return "";
    }
  };

  const calculateLeadTime = () => {
    return (
      (productionDays || 0) +
      (chinaTransitDays || 0) +
      getTransportDays() +
      (customsDays || 0) +
      (thaiTransitDays || 0)
    );
  };

  const totalDays = calculateLeadTime();

  const getArrivalDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + totalDays);
    return date.toLocaleDateString(lang === "en" ? "en-US" : "th-TH", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-blue-100 rounded-full">
          <Ship className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          {lang === "en" ? "China Import Lead Time" : "คำนวณระยะเวลานำเข้าสินค้าจากจีน"}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          {/* Production */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Factory className="w-4 h-4 mr-2 text-gray-500" />
              {lang === "en" ? "1. Production / Supplier prep (days)" : "1. ระยะเวลาผลิต / ร้านค้าเตรียมจัดส่ง (วัน)"}
            </label>
            <input
              type="number"
              min="0"
              value={productionDays}
              onChange={(e) => setProductionDays(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* China Transit */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Truck className="w-4 h-4 mr-2 text-gray-500" />
              {lang === "en" ? "2. China Domestic Transport (days)" : "2. ระยะเวลาส่งในจีน ถึงโกดังชิปปิ้ง (วัน)"}
            </label>
            <input
              type="number"
              min="0"
              value={chinaTransitDays}
              onChange={(e) => setChinaTransitDays(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* International Transport Mode */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <label className="flex items-center text-sm font-semibold text-blue-900 mb-3">
              <Ship className="w-4 h-4 mr-2" />
              {lang === "en" ? "3. International Shipping Method" : "3. รูปแบบการนำเข้า (จีน -> ไทย)"}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTransportType("air")}
                className={`py-2 px-1 rounded-lg flex flex-col items-center justify-center border transition-all ${
                  transportType === "air"
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Plane className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{lang === "en" ? "Air" : "ทางอากาศ"}</span>
              </button>
              <button
                onClick={() => setTransportType("car")}
                className={`py-2 px-1 rounded-lg flex flex-col items-center justify-center border transition-all ${
                  transportType === "car"
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Truck className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{lang === "en" ? "Truck" : "ทางรถ"}</span>
              </button>
              <button
                onClick={() => setTransportType("boat")}
                className={`py-2 px-1 rounded-lg flex flex-col items-center justify-center border transition-all ${
                  transportType === "boat"
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Ship className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{lang === "en" ? "Sea" : "ทางเรือ"}</span>
              </button>
            </div>
            <p className="text-xs text-blue-700 mt-2 text-center">
              {lang === "en" ? `Est. ${getTransportRange()} days` : `ประมาณ ${getTransportRange()} วัน`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Customs */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                {lang === "en" ? "4. Customs clearance" : "4. ผ่านด่าน/ศุลกากร"}
              </label>
              <input
                type="number"
                min="0"
                value={customsDays}
                onChange={(e) => setCustomsDays(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            {/* Thai Transit */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                {lang === "en" ? "5. Thai Delivery" : "5. จัดส่งในไทย"}
              </label>
              <input
                type="number"
                min="0"
                value={thaiTransitDays}
                onChange={(e) => setThaiTransitDays(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Results Box */}
        <div className="flex flex-col h-full">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg flex-grow flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Calendar className="w-32 h-32" />
            </div>
            
            <h2 className="text-xl font-medium text-blue-100 mb-2 z-10">
              {lang === "en" ? "Total Estimated Lead Time" : "รวมระยะเวลาโดยประมาณ (Lead Time)"}
            </h2>
            
            <div className="flex items-end mb-6 z-10">
              <span className="text-7xl font-bold">{totalDays}</span>
              <span className="text-xl ml-3 mb-2 font-light text-blue-100">
                {lang === "en" ? "Days" : "วัน"}
              </span>
            </div>

            <div className="w-full bg-white/10 rounded-xl p-4 backdrop-blur-sm z-10 border border-white/20">
              <div className="flex items-center text-sm text-blue-100 mb-1">
                <PackageCheck className="w-4 h-4 mr-2" />
                {lang === "en" ? "If ordered today, expected arrival:" : "หากสั่งสินค้าวันนี้ คาดว่าจะได้รับของวันที่:"}
              </div>
              <div className="text-xl font-semibold text-white">
                {getArrivalDate()}
              </div>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200 text-sm text-yellow-800">
            <strong>{lang === "en" ? "Note: " : "หมายเหตุ: "}</strong>
            {lang === "en" 
              ? "This is an estimation. Actual times may vary due to weather, customs delays, or holidays." 
              : "การคำนวณนี้เป็นการประเมินเบื้องต้น ระยะเวลาจริงอาจคลาดเคลื่อนจากสภาพอากาศ, การตรวจปล่อยสินค้าล่าช้าของศุลกากร หรือวันหยุดเทศกาล"}
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <div className="mt-12 prose max-w-none border-t pt-8">
        <h2>ทำไมต้องคำนวณ Lead Time การนำเข้าสินค้าจากจีน? (Alibaba / 1688 / Taobao)</h2>
        <p>
          ในการทำธุรกิจนำเข้าสินค้าจากจีน ไม่ว่าจะเป็นการสั่งผ่านแพลตฟอร์มยอดนิยมอย่าง Alibaba, 1688 หรือ Taobao ปัจจัยหนึ่งที่ชี้วัดความสำเร็จของธุรกิจคือ <strong>Lead Time (ระยะเวลาตั้งแต่สั่งซื้อจนถึงได้รับสินค้า)</strong> 
          เพราะถ้ารู้ว่าสินค้าจะมาถึงเมื่อไหร่ คุณจะสามารถวางแผนการตลาด ยิงแอดโฆษณา และบริหารจัดการสต๊อกสินค้าได้อย่างมีประสิทธิภาพ ป้องกันปัญหาสินค้าขาดมือ (Out of Stock) ซึ่งส่งผลเสียต่อยอดขายและประสบการณ์ของลูกค้า
        </p>

        <h3>ปัจจัยที่มีผลต่อ Lead Time นำเข้าสินค้าจีน</h3>
        <p>การเดินทางของสินค้าจากจีนมาไทย มีหลายกระบวนการที่กินเวลาแตกต่างกันไป โดยสามารถแบ่งออกเป็น 5 ช่วงหลักๆ ได้แก่:</p>
        <ol>
          <li><strong>ระยะเวลาการผลิตหรือเตรียมสินค้า (Production Time):</strong> หากเป็นสินค้าพร้อมส่ง (In-stock) อาจใช้เวลาเพียง 1-3 วัน แต่ถ้าเป็นสินค้าสั่งผลิต (OEM/ODM) อาจใช้เวลา 15-30 วันขึ้นไป</li>
          <li><strong>การขนส่งภายในประเทศจีน (China Domestic Transport):</strong> ระยะเวลาจากโรงงานมายังโกดังของชิปปิ้งที่จีน มักใช้เวลาประมาณ 2-5 วัน ขึ้นอยู่กับระยะทางระหว่างโรงงานและโกดังชิปปิ้ง</li>
          <li><strong>รูปแบบการนำเข้าระหว่างประเทศ (International Shipping Method):</strong>
            <ul>
              <li><strong>ทางรถ (Truck):</strong> ใช้เวลาประมาณ 4-7 วัน เหมาะสำหรับสินค้าทั่วไป ต้องการความรวดเร็วปานกลาง ราคาคุ้มค่า</li>
              <li><strong>ทางเรือ (Sea Freight):</strong> ใช้เวลาประมาณ 12-20 วัน เหมาะสำหรับสินค้าที่มีน้ำหนักหรือปริมาตรมาก สินค้าล็อตใหญ่ ค่าขนส่งถูกสุด แต่ต้องรอสินค้านาน</li>
              <li><strong>ทางอากาศ (Air Freight):</strong> ใช้เวลาประมาณ 3-5 วัน รวดเร็วที่สุด แต่ค่าขนส่งก็แพงที่สุด เหมาะกับสินค้าแฟชั่น สินค้ากระแสที่ต้องรีบขาย หรือสินค้าที่มีมูลค่าสูง น้ำหนักเบา</li>
            </ul>
          </li>
          <li><strong>พิธีการทางศุลกากร (Customs Clearance):</strong> การตรวจปล่อยสินค้าที่ด่าน ปกติใช้เวลา 1-3 วัน แต่อาจล่าช้าได้หากมีการสุ่มตรวจ หรือเอกสารไม่ครบถ้วน</li>
          <li><strong>การจัดส่งในไทย (Thai Domestic Delivery):</strong> จากโกดังชิปปิ้งในไทย ถึงหน้าบ้านลูกค้าหรือคลังสินค้าของคุณ ใช้เวลาประมาณ 1-3 วัน</li>
        </ol>

        <h3>ประโยชน์ของการใช้เครื่องมือคำนวณ Lead Time</h3>
        <p>
          - <strong>วางแผนการเงินและกระแสเงินสด (Cash Flow):</strong> การรู้ว่าสินค้าจะมาถึงเมื่อไหร่ ช่วยให้คุณจัดการเงินทุนหมุนเวียนได้ดีขึ้น<br/>
          - <strong>ลดต้นทุนจม:</strong> การสั่งของมาเร็วเกินไป ทำให้เสียค่าพื้นที่จัดเก็บ แต่ถ้ามาเสร็จช้าเกินไปก็เสียโอกาสการขาย การคำนวณ Lead Time ที่แม่นยำจะช่วยหาจุดสมดุล<br/>
          - <strong>จัดการแคมเปญการตลาด:</strong> วางแผนเปิดตัวสินค้า (Product Launch) ได้ตรงตามเทศกาลสำคัญ เช่น 11.11, 12.12 หรือช่วงปีใหม่
        </p>
        
        <p>
          <em>ข้อควรระวัง:</em> ในช่วงเทศกาลสำคัญของจีน เช่น วันชาติจีน (Golden Week เดือนตุลาคม) หรือเทศกาลตรุษจีน (กุมภาพันธ์) โรงงานและขนส่งในจีนมักจะหยุดยาว ทำให้ Lead Time ยืดเยื้อกว่าปกติมาก ผู้ประกอบการควรเผื่อเวลาและสั่งตุนสินค้าล่วงหน้า 1-2 เดือนเพื่อป้องกันความผิดพลาด
        </p>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Box, Maximize, Weight, Truck, AlertTriangle, Info } from "lucide-react";

export default function ContainerCapacity({ lang = "th" }: any) {
  const [length, setLength] = useState<number>(50);
  const [width, setWidth] = useState<number>(40);
  const [height, setHeight] = useState<number>(30);
  const [weight, setWeight] = useState<number>(15);
  
  const [containerType, setContainerType] = useState<"20ft" | "40ft" | "40hq">("20ft");

  // Approximate internal limits for standard containers
  const containers = {
    "20ft": {
      name: "20ft Standard",
      maxVolCbm: 33.0, // 33 CBM
      maxWeightKg: 25000 // 25 tons
    },
    "40ft": {
      name: "40ft Standard",
      maxVolCbm: 67.0, // 67 CBM
      maxWeightKg: 27600 // 27.6 tons
    },
    "40hq": {
      name: "40ft High Cube",
      maxVolCbm: 76.0, // 76 CBM
      maxWeightKg: 28600 // 28.6 tons
    }
  };

  const currentContainer = containers[containerType];

  // Calculations
  const itemVolCbm = (length * width * height) / 1000000; // cm3 to m3
  
  const maxItemsByVolume = itemVolCbm > 0 ? Math.floor(currentContainer.maxVolCbm / itemVolCbm) : 0;
  const maxItemsByWeight = weight > 0 ? Math.floor(currentContainer.maxWeightKg / weight) : 0;

  // Real world max items is the minimum of the two constraints
  // Note: This is a rough estimation. True packing requires 3D bin packing algorithms, 
  // so we apply a 10% packing inefficiency penalty to volume.
  const usableVolRatio = 0.9;
  const practicalMaxItemsByVol = itemVolCbm > 0 ? Math.floor((currentContainer.maxVolCbm * usableVolRatio) / itemVolCbm) : 0;
  
  const finalMaxItems = Math.min(practicalMaxItemsByVol, maxItemsByWeight);
  
  // Determine bottleneck
  let bottleneck = "";
  if (finalMaxItems === practicalMaxItemsByVol && finalMaxItems < maxItemsByWeight) {
    bottleneck = "volume";
  } else if (finalMaxItems === maxItemsByWeight && finalMaxItems < practicalMaxItemsByVol) {
    bottleneck = "weight";
  } else {
    bottleneck = "both";
  }

  const totalWeight = finalMaxItems * weight;
  const totalVol = finalMaxItems * itemVolCbm;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-teal-100 rounded-full">
          <Truck className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          {lang === "en" ? "Container Capacity Calculator" : "คำนวณความจุตู้คอนเทนเนอร์ (CBM & น้ำหนัก)"}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Box className="w-5 h-5 mr-2 text-teal-600" />
              {lang === "en" ? "Carton Dimensions" : "ขนาดกล่องสินค้า"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{lang === "en" ? "Length (cm)" : "ความยาว (ซม.)"}</label>
                <input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{lang === "en" ? "Width (cm)" : "ความกว้าง (ซม.)"}</label>
                  <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{lang === "en" ? "Height (cm)" : "ความสูง (ซม.)"}</label>
                  <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center">
                  <Weight className="w-4 h-4 mr-1" />
                  {lang === "en" ? "Weight per carton (kg)" : "น้ำหนักต่อกล่อง (กก.)"}
                </label>
                <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="text-xs text-gray-500 bg-teal-50 p-2 rounded">
                1 Carton = {itemVolCbm.toFixed(4)} CBM
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">{lang === "en" ? "Container Type" : "ประเภทตู้คอนเทนเนอร์"}</h3>
            <div className="space-y-3">
              {(Object.keys(containers) as Array<keyof typeof containers>).map((key) => (
                <label key={key} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${containerType === key ? 'bg-teal-50 border-teal-500' : 'bg-white hover:bg-gray-50'}`}>
                  <input
                    type="radio"
                    name="containerType"
                    value={key}
                    checked={containerType === key}
                    onChange={() => setContainerType(key)}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                  />
                  <span className="ml-3 font-medium text-gray-700">{containers[key].name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-gray-900 to-teal-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <Truck className="w-64 h-64" />
            </div>
            
            <h2 className="text-xl font-medium text-teal-100 mb-6 z-10 relative">
              {lang === "en" ? "Estimated Capacity" : "จำนวนกล่องสูงสุดที่โหลดได้ (ประเมิน)"}
            </h2>
            
            <div className="flex flex-col items-center justify-center mb-8 z-10 relative">
              <span className="text-7xl font-bold text-white mb-2">{isNaN(finalMaxItems) || finalMaxItems < 0 ? 0 : finalMaxItems.toLocaleString()}</span>
              <span className="text-xl text-teal-200">{lang === "en" ? "Cartons" : "กล่อง (Cartons)"}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 z-10 relative">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                <div className="text-teal-200 text-sm mb-1 flex items-center">
                  <Maximize className="w-4 h-4 mr-1" />
                  {lang === "en" ? "Total Volume Used" : "ใช้พื้นที่ปริมาตรไป"}
                </div>
                <div className="text-2xl font-bold">
                  {totalVol.toFixed(2)} <span className="text-sm font-normal">/ {currentContainer.maxVolCbm} CBM</span>
                </div>
                <div className="w-full bg-gray-700 h-1.5 mt-2 rounded-full overflow-hidden">
                  <div className="bg-teal-400 h-full" style={{ width: `${Math.min(100, (totalVol/currentContainer.maxVolCbm)*100)}%` }}></div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                <div className="text-teal-200 text-sm mb-1 flex items-center">
                  <Weight className="w-4 h-4 mr-1" />
                  {lang === "en" ? "Total Weight Used" : "ใช้น้ำหนักไป"}
                </div>
                <div className="text-2xl font-bold">
                  {(totalWeight/1000).toFixed(2)} <span className="text-sm font-normal">/ {(currentContainer.maxWeightKg/1000).toFixed(1)} Tons</span>
                </div>
                <div className="w-full bg-gray-700 h-1.5 mt-2 rounded-full overflow-hidden">
                  <div className="bg-teal-400 h-full" style={{ width: `${Math.min(100, (totalWeight/currentContainer.maxWeightKg)*100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis insights */}
          <div className="bg-white border-2 border-teal-100 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
              {lang === "en" ? "Load Analysis" : "วิเคราะห์การโหลดตู้"}
            </h3>
            
            <p className="text-gray-600 mb-4">
              {lang === "en" 
                ? `For this specific cargo, your packing bottleneck is ` 
                : `สำหรับสินค้านี้ ข้อจำกัดหลักที่ทำให้โหลดของเพิ่มไม่ได้คือ `}
              <strong className="text-teal-700 text-lg uppercase px-2">
                {bottleneck === "volume" 
                  ? (lang === "en" ? "Space (Volume/CBM)" : "พื้นที่ตู้เต็มก่อน (Volume CBM)") 
                  : bottleneck === "weight"
                    ? (lang === "en" ? "Weight Limit" : "น้ำหนักตู้เกิน (Weight)")
                    : (lang === "en" ? "Balanced Load" : "สมดุลพอดีทั้งคู่")}
              </strong>
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 flex items-start">
              <Info className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p>
                  {lang === "en" 
                    ? "Calculations include a standard 10% packing inefficiency buffer for volume. Real world results depend on exact stacking arrangements, palletization, and carton rigidity."
                    : "การคำนวณพื้นที่ (Volume) ได้หักลบพื้นที่สูญเปล่าจากการเรียงกล่อง (Inefficiency Buffer) ไว้ 10% แล้ว ของจริงอาจบรรจุได้มากหรือน้อยกว่านี้ขึ้นอยู่กับการใช้พาเลท ความแข็งแรงของกล่อง และเทคนิคการเรียงของ"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <div className="mt-12 prose max-w-none border-t pt-8">
        <h2>วิธีคำนวณการโหลดสินค้าเข้าตู้คอนเทนเนอร์ (Container Loading)</h2>
        <p>
          สำหรับการนำเข้าหรือส่งออกสินค้าระหว่างประเทศแบบเต็มตู้ (FCL - Full Container Load) คำถามยอดฮิตที่ผู้ประกอบการมักจะถามบริษัทชิปปิ้งหรือโรงงานคือ <strong>"ตู้ 20 ฟุต หรือ 40 ฟุต ใส่ของได้กี่กล่อง?"</strong> 
          การคำนวณที่แม่นยำจะช่วยประหยัดค่าขนส่งต่อชิ้นได้อย่างมหาศาล เพราะถ้าโหลดตู้ไม่เต็ม คุณก็ยังต้องจ่ายค่าระวางเรือเหมาตู้เท่าเดิม
        </p>

        <h3>ข้อจำกัด 2 อย่างของตู้คอนเทนเนอร์ (Volume vs Weight)</h3>
        <p>การจะรู้ว่ายัดของเข้าตู้ได้เท่าไหร่นั้น ต้องพิจารณาข้อจำกัด 2 แกนหลัก ซึ่งตู้คอนเทนเนอร์จะ "เต็ม" เมื่อชนลิมิตข้อใดข้อหนึ่งก่อน:</p>
        <ul>
          <li><strong>1. ปริมาตร (Volume / CBM):</strong> คือพื้นที่กว้างxยาวxสูง ภายในตู้คอนเทนเนอร์ มีหน่วยเป็นลูกบาศก์เมตร (CBM)</li>
          <li><strong>2. น้ำหนัก (Weight / Ton):</strong> คือน้ำหนักบรรทุกสูงสุดที่พื้นตู้และเครนยกตู้สามารถรับได้ มีหน่วยเป็นตัน หรือกิโลกรัม</li>
        </ul>

        <h3>ความจุมาตรฐานของตู้คอนเทนเนอร์แต่ละประเภท</h3>
        <p>
          - <strong>ตู้ 20 ฟุต (20ft Standard):</strong> เหมาะสำหรับสินค้าที่มีน้ำหนักมากแต่ชิ้นเล็ก (Heavy cargo) เช่น เครื่องจักร, กระเบื้อง, เหล็ก ความจุประมาตรจะอยู่ที่ราวๆ 33 CBM รับน้ำหนักได้ประมาณ 25 ตัน (25,000 กก.)<br/>
          - <strong>ตู้ 40 ฟุต (40ft Standard):</strong> เหมาะสำหรับสินค้าทั่วไปที่น้ำหนักปานกลาง ความจุ 67 CBM รับน้ำหนักได้ประมาณ 27.6 ตัน<br/>
          - <strong>ตู้ 40 ฟุต HQ (40ft High Cube):</strong> เป็นตู้ที่สูงกว่าปกติ เหมาะสำหรับสินค้าชิ้นใหญ่ น้ำหนักเบา (Volumetric cargo) เช่น เฟอร์นิเจอร์, ตุ๊กตา, กล่องพลาสติก ความจุ 76 CBM รับน้ำหนักได้ประมาณ 28.6 ตัน
        </p>

        <h3>ตู้เต็มเพราะอะไร? (Bottleneck Analysis)</h3>
        <p>
          เครื่องมือของเราจะช่วยวิเคราะห์ว่า สินค้าของคุณชนลิมิตเรื่องใดก่อน
        </p>
        <p>
          <strong>กรณี "ตู้เต็มเพราะพื้นที่ (Volume)"</strong>: สินค้าของคุณจัดอยู่ในกลุ่ม "ของเบา" (เช่น หมอน, โฟม) โหลดตู้เต็มแล้วแต่น้ำหนักเพิ่งไปแค่ 5 ตัน กรณีนี้แนะนำให้เลือกใช้ตู้ 40HQ เพื่อให้ได้พื้นที่ CBM มากที่สุด คุ้มค่าที่สุด
        </p>
        <p>
          <strong>กรณี "ตู้เต็มเพราะน้ำหนัก (Weight)"</strong>: สินค้าของคุณจัดอยู่ในกลุ่ม "ของหนัก" (เช่น ข้าวสาร, เหล็ก) ใส่ของไปได้แค่ครึ่งตู้ แต่น้ำหนักทะลุ 25 ตันแล้ว กรณีแบบนี้ ถึงจะเช่าตู้ 40 ฟุต ก็ใส่ของเพิ่มไม่ได้มากนักเพราะน้ำหนักจะเกินลิมิตเครนยก ดังนั้นการใช้ตู้ 20 ฟุต หลายๆ ตู้ อาจจะคุ้มค่าและปลอดภัยกว่า
        </p>

        <h3>ข้อควรระวังในการจัดเรียง (Pallet vs Loose Carton)</h3>
        <p>
          การคำนวณด้านบนเป็นการคำนวณเรียงกล่องเปล่าๆ (Loose carton) ซึ่งพื้นที่จริงอาจมีช่องว่างสูญเปล่าตามมุมหรือซอกตู้ (เครื่องมือของเราหักเผื่อไว้ให้แล้ว 10%) แต่ถ้าคุณมีการตีพาเลทไม้ (Palletization) เพื่อใช้รถโฟล์คลิฟท์ยก จะเสียพื้นที่ CBM ไปกับฐานพาเลทอีกประมาณ 10-15% แลกมากับความรวดเร็วในการขนถ่ายสินค้าและลดความเสียหายของกล่อง
        </p>
      </div>
    </div>
  );
}

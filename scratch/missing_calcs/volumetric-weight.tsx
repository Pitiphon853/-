"use client";

import React, { useState } from 'react';
import { Box, Ruler, Scale, Truck, AlertTriangle, ArrowRight, Info } from 'lucide-react';

export default function VolumetricWeightCalculator({ lang }: any) {
  const [length, setLength] = useState<number | string>('30');
  const [width, setWidth] = useState<number | string>('20');
  const [height, setHeight] = useState<number | string>('15');
  const [actualWeight, setActualWeight] = useState<number | string>('2');
  
  // Carrier divisor. Standard is often 5000 (DHL, UPS standard) or 6000 (some post offices/domestic)
  const [divisor, setDivisor] = useState<number | string>('5000');

  const calculateWeight = () => {
    const l = parseFloat(length.toString()) || 0;
    const w = parseFloat(width.toString()) || 0;
    const h = parseFloat(height.toString()) || 0;
    const actW = parseFloat(actualWeight.toString()) || 0;
    const div = parseFloat(divisor.toString()) || 5000;

    const volume = l * w * h; // cm^3
    const volumetricWeight = div > 0 ? volume / div : 0;
    const chargeableWeight = Math.max(actW, volumetricWeight);

    return {
      volume,
      volumetricWeight,
      chargeableWeight,
      isVolumetricBigger: volumetricWeight > actW
    };
  };

  const results = calculateWeight();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white dark:bg-gray-900 shadow-xl rounded-2xl">
      <div className="text-center mb-8">
        <Box className="w-12 h-12 text-amber-500 dark:text-amber-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {lang === 'EN' ? 'Volumetric Weight Calculator' : 'คำนวณน้ำหนักตามปริมาตร'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'EN'
            ? 'Determine the volumetric weight of your parcel to calculate shipping costs accurately.'
            : 'คำนวณน้ำหนักตามปริมาตรของกล่องพัสดุ (DIM Weight) เพื่อเปรียบเทียบกับน้ำหนักจริงและประเมินค่าจัดส่ง'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-7 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
            <Ruler className="w-5 h-5 mr-2 text-amber-500" />
            {lang === 'EN' ? 'Parcel Dimensions & Weight' : 'ขนาดพัสดุและน้ำหนัก'}
          </h3>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'EN' ? 'Length' : 'ความยาว'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                  min="0"
                />
                <span className="absolute right-3 top-2.5 text-gray-500 text-xs mt-0.5">cm</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'EN' ? 'Width' : 'ความกว้าง'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                  min="0"
                />
                <span className="absolute right-3 top-2.5 text-gray-500 text-xs mt-0.5">cm</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'EN' ? 'Height' : 'ความสูง'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                  min="0"
                />
                <span className="absolute right-3 top-2.5 text-gray-500 text-xs mt-0.5">cm</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700 my-6" />

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <Scale className="w-4 h-4 mr-1 text-gray-500" />
                {lang === 'EN' ? 'Actual Weight (Gross Weight)' : 'น้ำหนักจริงของพัสดุรวมกล่อง (Actual Weight)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={actualWeight}
                  onChange={(e) => setActualWeight(e.target.value)}
                  className="w-full pl-3 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                  min="0"
                  step="0.1"
                />
                <span className="absolute right-3 top-2.5 text-gray-500">kg</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <Truck className="w-4 h-4 mr-1 text-gray-500" />
                {lang === 'EN' ? 'Carrier Divisor (DIM Factor)' : 'ตัวหารของบริษัทขนส่ง (DIM Factor)'}
              </label>
              <select
                value={divisor}
                onChange={(e) => setDivisor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white mb-2"
              >
                <option value="5000">5000 (DHL, UPS, FedEx Standard)</option>
                <option value="6000">6000 (Thai Post, Some Domestic)</option>
                <option value="4000">4000 (Some Air Freight)</option>
                <option value="custom">Custom</option>
              </select>
              {divisor === 'custom' && (
                <input
                  type="number"
                  placeholder="Enter custom divisor"
                  onChange={(e) => setDivisor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                />
              )}
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-5 bg-amber-600 p-6 rounded-xl text-white shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center text-amber-100">
              <Box className="w-5 h-5 mr-2" />
              {lang === 'EN' ? 'Weight Analysis' : 'ผลการวิเคราะห์น้ำหนัก'}
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center bg-amber-700/40 p-3 rounded-lg">
                <span className="text-amber-100 text-sm">{lang === 'EN' ? 'Actual Weight' : 'น้ำหนักจริง'}</span>
                <span className={`font-bold text-lg ${(parseFloat(actualWeight.toString()) || 0) >= results.volumetricWeight ? 'text-white' : 'text-amber-200 line-through opacity-70'}`}>
                  {(parseFloat(actualWeight.toString()) || 0).toFixed(2)} kg
                </span>
              </div>
              
              <div className="flex justify-between items-center bg-amber-700/40 p-3 rounded-lg">
                <span className="text-amber-100 text-sm">{lang === 'EN' ? 'Volumetric Weight' : 'น้ำหนักปริมาตร'}</span>
                <span className={`font-bold text-lg ${results.isVolumetricBigger ? 'text-white' : 'text-amber-200 line-through opacity-70'}`}>
                  {results.volumetricWeight.toFixed(2)} kg
                </span>
              </div>
            </div>

            <div className="bg-amber-500 p-5 rounded-lg border border-amber-400 shadow-inner mt-4">
              <div className="text-amber-100 text-sm font-medium mb-1">
                {lang === 'EN' ? 'Chargeable Weight' : 'น้ำหนักที่ใช้คิดค่าขนส่ง'}
              </div>
              <div className="text-4xl font-extrabold text-white flex items-baseline">
                {results.chargeableWeight.toFixed(2)}
                <span className="text-xl font-normal text-amber-200 ml-2">kg</span>
              </div>
              <div className="mt-2 text-xs text-amber-100 font-medium">
                ({lang === 'EN' ? 'Carrier will charge based on this weight' : 'บริษัทขนส่งจะคิดราคาจากน้ำหนักนี้'})
              </div>
            </div>
          </div>

          {results.isVolumetricBigger ? (
            <div className="mt-6 bg-white/20 p-3 rounded-lg flex items-start text-sm">
              <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 text-amber-200" />
              <p>
                {lang === 'EN' 
                  ? 'Your parcel is light but bulky. The carrier will charge based on volumetric weight. Consider using a smaller box to save costs.' 
                  : 'พัสดุของคุณกินพื้นที่มากเกินไปเมื่อเทียบกับน้ำหนัก บริษัทจะคิดราคาจากปริมาตร แนะนำให้เปลี่ยนกล่องให้เล็กลงพอดีกับสินค้าเพื่อประหยัดค่าจัดส่ง'}
              </p>
            </div>
          ) : (
            <div className="mt-6 bg-green-500/30 p-3 rounded-lg flex items-start text-sm border border-green-500/50">
              <Info className="w-5 h-5 mr-2 flex-shrink-0 text-green-100" />
              <p>
                {lang === 'EN'
                  ? 'Your parcel weight exceeds its volumetric weight. The carrier will charge based on actual weight.'
                  : 'พัสดุของคุณมีน้ำหนักจริงมากกว่าปริมาตร บริษัทจะคิดค่าจัดส่งตามน้ำหนักจริงของสินค้า (แพ็คเกจเหมาะสมแล้ว)'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-16 prose prose-amber max-w-none dark:prose-invert">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          น้ำหนักตามปริมาตร (Volumetric Weight / DIM Weight) คืออะไร?
        </h2>
        <p>
          สำหรับผู้ที่ขายของออนไลน์หรือต้องส่งพัสดุเป็นประจำ คงเคยเจอเหตุการณ์ที่ "ของน้ำหนักเบา แต่ทำไมค่าส่งถึงแพงหูฉี่?" คำตอบของปัญหานี้อยู่ที่หลักการคิดค่าจัดส่งของบริษัทขนส่ง ที่เรียกว่า <strong>Volumetric Weight</strong> (หรือ Dimensional Weight) ซึ่งเป็นการคำนวณน้ำหนักจาก <em>ขนาดความกว้าง ความยาว และความสูงของกล่อง</em> แทนที่จะดูแค่น้ำหนักจากเครื่องชั่งเพียงอย่างเดียว
        </p>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">ทำไมบริษัทขนส่งถึงต้องคิดน้ำหนักตามปริมาตร?</h3>
        <p>
          เครื่องบิน รถบรรทุก หรือตู้คอนเทนเนอร์ มีพื้นที่จำกัด หากบริษัทขนส่งรับฝากพัสดุที่มีน้ำหนักเบาแต่ชิ้นใหญ่มากๆ (เช่น ตุ๊กตาหมีตัวใหญ่ หรือ หมอน) พัสดุเหล่านี้จะไปกินพื้นที่ของพัสดุชิ้นอื่น ทำให้รถหนึ่งคันบรรทุกของได้น้อยลงและไม่คุ้มค่าใช้จ่ายในการวิ่งรถ ด้วยเหตุนี้ บริษัทขนส่งจึงต้องตั้งกฎ <strong>Chargeable Weight</strong> หรือน้ำหนักที่จะใช้ในการคิดเงิน โดยจะ <em>เปรียบเทียบระหว่าง "น้ำหนักจริง" และ "น้ำหนักปริมาตร" ว่าค่าใดมากกว่ากัน จะนำค่านั้นมาคิดค่าบริการ</em>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">สูตรการคำนวณ Volumetric Weight</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 font-mono text-sm border-l-4 border-amber-500">
          <p><strong>น้ำหนักปริมาตร (kg) = (กว้าง x ยาว x สูง เป็นเซนติเมตร) / ตัวหารของบริษัทขนส่ง</strong></p>
        </div>
        <p>
          ตัวหาร (DIM Factor) มักจะแตกต่างกันไปตามบริษัทขนส่งและประเภทของการจัดส่ง (เช่น ทางบก ทางเรือ หรือทางอากาศ):
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>หาร 5,000 :</strong> เป็นมาตรฐานสากลที่ใช้บ่อยที่สุด มักพบในบริการจัดส่งระหว่างประเทศ เช่น DHL, UPS, FedEx</li>
          <li><strong>หาร 6,000 :</strong> มักพบในบริการไปรษณีย์ไทย (สำหรับการส่งพัสดุระหว่างประเทศบางประเภท) และขนส่งเอกชนในประเทศบางราย</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">ตัวอย่างการคำนวณเพื่อเปรียบเทียบ</h3>
        <p>
          สมมติว่าคุณต้องการส่งกล่องพลาสติกเปล่า น้ำหนักจริง <strong>2 กิโลกรัม</strong><br/>
          บรรจุในกล่องขนาด <strong>กว้าง 40 ซม. x ยาว 50 ซม. x สูง 30 ซม.</strong><br/>
          ส่งผ่านบริษัทขนส่งที่ใช้ตัวหาร 5000
        </p>
        <ol className="list-decimal pl-6 space-y-2 mt-2">
          <li>คำนวณปริมาตร = 40 x 50 x 30 = 60,000 ลบ.ซม.</li>
          <li>หารด้วย 5000 = 60,000 / 5,000 = <strong>12 กิโลกรัม</strong></li>
        </ol>
        <p className="mt-4">
          <strong>สรุป:</strong> แม้ว่ากล่องจะหนักแค่ 2 กก. แต่บริษัทขนส่งจะคิดค่าส่งคุณที่น้ำหนัก <strong>12 กก.</strong> (Chargeable Weight)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">ทริคการลดค่าจัดส่งสำหรับพ่อค้าแม่ค้าออนไลน์</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>เลือกขนาดกล่องให้พอดี:</strong> นี่คือวิธีที่ดีที่สุด หลีกเลี่ยงการใช้กล่องใบใหญ่เกินความจำเป็นแล้วยัดบับเบิ้ลกันกระแทกเข้าไปเยอะๆ เพราะคุณจะเสียค่าอากาศเปล่าๆ</li>
          <li><strong>ยุบหรือบีบอัดสินค้า:</strong> หากสินค้าเป็นเสื้อผ้า ผ้าห่ม หรือตุ๊กตา การใช้ถุงสุญญากาศ (Vacuum Bag) ก่อนแพ็คลงกล่องหรือซอง จะช่วยลดพื้นที่และลด Volumetric Weight ได้มหาศาล</li>
          <li><strong>ใช้ซองพลาสติกแทนกล่อง:</strong> สำหรับสินค้าที่ไม่แตกหักง่าย เช่น เสื้อผ้า การใส่ซองพลาสติกมักจะไม่มีการคิดน้ำหนักปริมาตร หรือถ้าคิดก็จะมีขนาดที่แนบเนื้อไปกับสินค้า ทำให้ประหยัดได้มากกว่า</li>
        </ul>
        <p className="mt-4">
          ก่อนที่จะแพ็คสินค้าทุกครั้ง ลองใช้ <strong>เครื่องคำนวณ Volumetric Weight</strong> ของเรา เพื่อตรวจเช็คให้แน่ใจว่าคุณไม่ได้เผลอใช้กล่องที่ใหญ่เกินไป จนทำให้ต้นทุนค่าจัดส่งบานปลาย!
        </p>
      </article>
    </div>
  );
}

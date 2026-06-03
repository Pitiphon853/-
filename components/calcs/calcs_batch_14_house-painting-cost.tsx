import React, { useState } from 'react';
import { PaintRoller, Map, Brush, Calculator, Coins, AlertCircle, HardHat } from 'lucide-react';

export default function HousePaintingCost({ lang }: any) {
  const [area, setArea] = useState<number | ''>('');
  const [usePrimer, setUsePrimer] = useState<boolean>(true);
  const [primerPrice, setPrimerPrice] = useState<number | ''>(1500); // 18L bucket
  const [paintPrice, setPaintPrice] = useState<number | ''>(2500);   // 18L bucket
  const [laborCostPerSqm, setLaborCostPerSqm] = useState<number | ''>(120);

  // Constants
  const SQM_PER_BUCKET = 150; // 150 sqm per 18L bucket per coat
  const PAINT_COATS = 2; // Usually 2 coats of top paint

  const calculateCosts = () => {
    const a = Number(area) || 0;
    const pPrice = Number(primerPrice) || 0;
    const tPrice = Number(paintPrice) || 0;
    const labor = Number(laborCostPerSqm) || 0;

    if (a > 0) {
      // Primer (1 coat)
      const primerBuckets = usePrimer ? Math.ceil(a / SQM_PER_BUCKET) : 0;
      const primerCost = primerBuckets * pPrice;

      // Top Paint (2 coats)
      const totalTopPaintArea = a * PAINT_COATS;
      const paintBuckets = Math.ceil(totalTopPaintArea / SQM_PER_BUCKET);
      const paintCost = paintBuckets * tPrice;

      // Labor
      const laborCost = a * labor;

      const totalMaterialCost = primerCost + paintCost;
      const totalCost = totalMaterialCost + laborCost;
      const costPerSqm = totalCost / a;

      return {
        primerBuckets,
        primerCost,
        paintBuckets,
        paintCost,
        laborCost,
        totalMaterialCost,
        totalCost,
        costPerSqm
      };
    }
    return null;
  };

  const results = calculateCosts();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
            <PaintRoller className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            คำนวณงบประมาณทาสีบ้าน
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                พื้นที่ที่ต้องการทาสี (ตารางเมตร)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value) || '')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="เช่น 150"
                  min="1"
                />
                <Map className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">พื้นที่กำแพง (กว้าง x สูง) ลบด้วยพื้นที่หน้าต่าง/ประตู</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={usePrimer}
                  onChange={(e) => setUsePrimer(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="font-medium text-gray-800">ทาสีรองพื้นด้วย (แนะนำ)</span>
              </label>
            </div>

            {usePrimer && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ราคาสีรองพื้น (บาท / ถัง 18 ลิตร)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={primerPrice}
                    onChange={(e) => setPrimerPrice(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="เช่น 1500"
                    min="0"
                  />
                  <Brush className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ราคาสีทับหน้า (บาท / ถัง 18 ลิตร)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={paintPrice}
                  onChange={(e) => setPaintPrice(Number(e.target.value) || '')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="เช่น 2500"
                  min="0"
                />
                <Brush className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">โปรแกรมจะคำนวณการทาสีทับหน้า 2 รอบ</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ค่าแรงช่างทาสี (บาท / ตร.ม.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={laborCostPerSqm}
                  onChange={(e) => setLaborCostPerSqm(Number(e.target.value) || '')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="เช่น 120"
                  min="0"
                />
                <HardHat className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">กรณีซื้อสีเองและจ้างช่างเหมาค่าแรง</p>
            </div>

          </div>

          <div className="bg-slate-50 rounded-2xl p-6 h-fit sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-500" />
              ผลการคำนวณและประเมินราคา
            </h3>
            
            {results ? (
              <div className="space-y-4">
                
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
                  <p className="font-semibold text-gray-800 mb-3 border-b pb-2">ปริมาณสีที่ต้องใช้ (ถังใหญ่ 18 ลิตร)</p>
                  {usePrimer && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">สีรองพื้น (ทา 1 รอบ)</span>
                      <span className="font-bold text-gray-900">{results.primerBuckets} <span className="font-normal text-sm">ถัง</span></span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">สีทับหน้า (ทา 2 รอบ)</span>
                    <span className="font-bold text-gray-900">{results.paintBuckets} <span className="font-normal text-sm">ถัง</span></span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">รวมค่าสีและวัสดุ</span>
                    <span className="font-medium">฿{results.totalMaterialCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">รวมค่าแรงช่าง ({area} ตร.ม.)</span>
                    <span className="font-medium">฿{results.laborCost.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-5 rounded-xl shadow-sm mt-4 text-center">
                  <p className="text-sm text-orange-800 mb-1">งบประมาณรวม (ประเมิน)</p>
                  <p className="text-4xl font-bold text-orange-600">
                    ฿{results.totalCost.toLocaleString()}
                  </p>
                  <p className="text-xs text-orange-600 mt-2">
                    เฉลี่ย ฿{results.costPerSqm.toLocaleString(undefined, { maximumFractionDigits: 0 })} / ตารางเมตร
                  </p>
                </div>

                <div className="flex items-start gap-2 mt-4 text-xs text-gray-500 bg-gray-100 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>การคำนวณนี้อ้างอิงปริมาณสีถังใหญ่ 18 ลิตร (5 แกลลอน) ทาได้ประมาณ 150 ตร.ม./เที่ยว ปริมาณจริงอาจขึ้นอยู่กับสภาพพื้นผิวและชนิดของสี</p>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[250px] flex flex-col items-center justify-center text-gray-400 bg-white rounded-xl border border-dashed border-gray-200 p-6 text-center">
                <PaintRoller className="w-12 h-12 mb-3 text-gray-300" />
                <p>กรุณาระบุพื้นที่ (ตร.ม.)</p>
                <p className="text-sm">เพื่อคำนวณปริมาณสีและค่าใช้จ่าย</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Section */}
      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">วิธีคำนวณค่าทาสีบ้านใหม่ (House Painting Cost) เตรียมงบอย่างไรไม่ให้บานปลาย</h2>
        
        <p>เมื่อบ้านเริ่มเก่า สีผนังเริ่มซีดจาง หรือหลุดร่อน "การทาสีบ้านใหม่" คือวิธีที่คุ้มค่าที่สุดในการพลิกโฉมบ้านให้กลับมาดูใหม่และสวยงามอีกครั้ง แต่ก่อนที่จะเดินเข้าร้านวัสดุก่อสร้างหรือโทรเรียกช่าง สิ่งสำคัญคือการรู้วิธี <strong>คำนวณค่าทาสีบ้าน (House Painting Cost)</strong> เพื่อเตรียมงบประมาณได้อย่างถูกต้อง และป้องกันการถูกโกงราคา</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ขั้นตอนแรก: การหาพื้นที่ทาสี (ตารางเมตร)</h3>
        <p>ตัวแปรสำคัญที่สุดในการคำนวณปริมาณสีและค่าแรงช่างคือ "พื้นที่" ซึ่งมีวิธีการหาแบบง่ายๆ ดังนี้:</p>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 my-4">
          <p><strong>สูตร:</strong> (ความกว้างผนัง × ความสูงผนัง) - พื้นที่ประตูและหน้าต่าง = พื้นที่ทาสีสุทธิ (ตารางเมตร)</p>
          <p><em>ตัวอย่าง:</em> ผนังห้องกว้าง 4 เมตร สูง 3 เมตร = 12 ตร.ม. มีประตูขนาด 1x2 เมตร (2 ตร.ม.) พื้นที่ทาสีจริงจะเหลือเพียง 10 ตร.ม.</p>
        </div>
        <p>หากเป็นการทาสีภายนอกทั้งหลัง ให้คำนวณพื้นที่ผนังทั้ง 4 ด้านรวมกัน (อย่าลืมหักลบพื้นที่หน้าต่างและกระจก)</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เข้าใจหลักการทาสี: ทำไมต้องทาหลายรอบ?</h3>
        <p>การทาสีที่ถูกต้องตามมาตรฐานช่างมืออาชีพเพื่อให้สีติดทนทานและสวยงาม จะประกอบด้วย 2 ขั้นตอนหลัก คือ</p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>การทาสีรองพื้น (Primer): 1 เที่ยว (รอบ)</strong><br/>
          ทำหน้าที่เป็นกาวเชื่อมระหว่างพื้นผิวปูนกับสีทับหน้า ช่วยป้องกันความเป็นด่างจากปูน (ซึ่งทำให้สีด่างหรือซีดไว) กรณีบ้านเก่า ต้องใช้ "สีรองพื้นปูนเก่า" ลักษณะจะเป็นน้ำใสๆ กลิ่นค่อนข้างแรง</li>
          <li><strong>การทาสีทับหน้า (Top Coat): 2 เที่ยว (รอบ)</strong><br/>
          คือสีเฉดที่เราต้องการ การทา 2 รอบจะช่วยให้สีกลบพื้นผิวเดิมได้มิด เนียนเรียบ และได้เฉดสีที่ตรงตามแคตตาล็อกมากที่สุด</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">คำนวณปริมาณสี: ซื้อกี่ถังดี?</h3>
        <p>สีตามท้องตลาดมักขายเป็นไซส์ "แกลลอน" (3.785 ลิตร) และ "ถังใหญ่" หรือ 5 แกลลอน (ประมาณ 18 ลิตร)</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>สี 1 แกลลอน:</strong> ทาได้พื้นที่ประมาณ 30 ตารางเมตร (ต่อการทา 1 เที่ยว)</li>
          <li><strong>สี 1 ถังใหญ่ (18 ลิตร):</strong> ทาได้พื้นที่ประมาณ 150 ตารางเมตร (ต่อการทา 1 เที่ยว)</li>
        </ul>
        <p><em>ดังนั้น หากคุณมีพื้นที่ทาสี 150 ตร.ม. คุณจะต้องซื้อ สีรองพื้น 1 ถังใหญ่ (ทา 1 รอบ) และ สีทับหน้า 2 ถังใหญ่ (เพราะต้องทา 2 รอบ)</em></p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">จ้างช่างเหมา vs ซื้อสีเองจ้างแต่ค่าแรง</h3>
        <p><strong>1. จ้างช่างรับเหมาทาสี (รวมของรวมแรง):</strong> ราคาจะประเมินต่อตารางเมตร (ประมาณ 150 - 300 บาท/ตร.ม. ขึ้นอยู่กับเกรดสีที่เลือกและความยากง่ายของงาน) ข้อดีคือสะดวก ไม่ต้องวิ่งซื้อของเอง ช่างจะเตรียมอุปกรณ์มาให้ครบ</p>
        <p><strong>2. ซื้อสีเอง จ้างเฉพาะค่าแรง:</strong> ค่าแรงช่างมักจะตกอยู่ที่ 80 - 150 บาท/ตร.ม. (ถ้าทาภายนอกตึกสูงอาจมีค่านั่งร้านเพิ่ม) ข้อดีคือเราสามารถเลือกเกรดสีพรีเมียม (ที่รับประกัน 10-15 ปี) ได้ด้วยตัวเอง มั่นใจว่าช่างไม่แอบสลับเอาสีราคาถูกมาทาให้ และมักจะประหยัดงบรวมได้มากกว่าหากเรามีเวลาไปเลือกซื้อของเอง</p>

        <p className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
          <strong>ข้อควรระวัง:</strong> การลอกสีเก่า หรือการซ่อมแซมรอยร้าวบนผนัง (โป๊วสี) ก่อนทาสีใหม่ เป็นขั้นตอนที่สำคัญมากและอาจมีค่าแรงในส่วนนี้เพิ่มเติม ควรตกลงกับช่างให้ชัดเจนก่อนเริ่มงานว่า ค่าแรงครอบคลุมการเตรียมพื้นผิวเหล่านี้ด้วยหรือไม่
        </p>
      </article>
    </div>
  );
}

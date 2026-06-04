import React, { useState } from 'react';
import { Landmark, Info } from 'lucide-react';

export default function GovPensionGpf({ lang }: any) {
  const isTH = lang === 'TH';

  const [avgSalary, setAvgSalary] = useState<number | ''>(40000);
  const [yearsOfService, setYearsOfService] = useState<number | ''>(25);

  const calculatePension = () => {
    if (typeof avgSalary !== 'number' || typeof yearsOfService !== 'number') return null;

    // GPF Formula: (Avg 60 months salary * Years of service) / 50
    const rawPension = (avgSalary * yearsOfService) / 50;
    
    // Capped at 70% of average 60 months salary
    const maxCap = avgSalary * 0.7;
    const finalPension = Math.min(rawPension, maxCap);
    
    const isCapped = rawPension > maxCap;

    return {
      rawPension,
      finalPension,
      maxCap,
      isCapped
    };
  };

  const result = calculatePension();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-600 rounded-lg text-white">
              <Landmark size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isTH ? "คำนวณบำนาญข้าราชการ (กบข.)" : "GPF Pension Calculator"}
            </h2>
          </div>
          <p className="text-gray-600">
            {isTH 
              ? "คำนวณเงินบำนาญรายเดือนสำหรับข้าราชการที่เป็นสมาชิกกองทุนบำเหน็จบำนาญข้าราชการ (กบข.)" 
              : "Calculate the monthly pension for government officials who are members of the Government Pension Fund (GPF)."}
          </p>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "เงินเดือนเฉลี่ย 60 เดือนสุดท้าย (บาท)" : "Average salary of last 60 months (THB)"}
              </label>
              <input
                type="number"
                value={avgSalary}
                onChange={(e) => setAvgSalary(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg"
                placeholder={isTH ? "เช่น 40000" : "e.g. 40000"}
              />
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <Info size={14} className="mt-0.5 shrink-0" />
                {isTH ? "นำเงินเดือน 5 ปีสุดท้ายมารวมกันแล้วหาร 60" : "Sum of salary from the last 5 years divided by 60"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "อายุราชการ (ปี)" : "Years of service"}
              </label>
              <input
                type="number"
                value={yearsOfService}
                onChange={(e) => setYearsOfService(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg"
                placeholder={isTH ? "เช่น 25" : "e.g. 25"}
              />
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <Info size={14} className="mt-0.5 shrink-0" />
                {isTH ? "นับรวมวันทวีคูณ (ถ้ามี)" : "Including multiplied service days (if any)"}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 flex flex-col justify-center border border-gray-100">
            {result ? (
              <div className="text-center space-y-4">
                <h3 className="text-gray-500 font-medium">
                  {isTH ? "เงินบำนาญรายเดือนที่คาดว่าจะได้รับ" : "Estimated Monthly Pension"}
                </h3>
                <div className="text-4xl md:text-5xl font-bold text-emerald-600">
                  {result.finalPension.toLocaleString('en-US', { maximumFractionDigits: 2 })} <span className="text-xl md:text-2xl text-gray-600 font-normal">{isTH ? "บาท" : "THB"}</span>
                </div>
                
                {result.isCapped && (
                  <div className="text-sm bg-orange-50 text-orange-700 p-3 rounded-lg border border-orange-200 mt-4 text-left">
                    <p className="font-medium flex items-center gap-1">
                      <Info size={16} />
                      {isTH ? "ได้รับเงินบำนาญที่เพดานสูงสุด 70%" : "Capped at 70% maximum"}
                    </p>
                    <p className="mt-1">
                      {isTH 
                        ? `ตามสูตรปกติจะได้ ${result.rawPension.toLocaleString('en-US', { maximumFractionDigits: 2 })} บาท แต่กฎหมายกำหนดให้รับไม่เกิน 70% ของเงินเดือนเฉลี่ย 60 เดือนสุดท้าย` 
                        : `The raw formula gives ${result.rawPension.toLocaleString('en-US', { maximumFractionDigits: 2 })} THB, but law caps it at 70% of average salary.`}
                    </p>
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mt-4 text-left bg-white p-3 rounded-lg border border-gray-200">
                  <p className="font-semibold text-gray-700 mb-1">{isTH ? "สูตรคำนวณ กบข.:" : "GPF Formula:"}</p>
                  <p className="font-mono text-xs">(เงินเดือนเฉลี่ย 60 เดือนสุดท้าย × อายุราชการ) ÷ 50</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                {isTH ? "กรอกข้อมูลเพื่อดูผลลัพธ์" : "Enter details to see results"}
              </div>
            )}
          </div>
        </div>
      </div>

      {isTH && (
        <article className="prose prose-emerald max-w-none bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">บำนาญข้าราชการ สูตร กบข. คืออะไร คิดอย่างไรให้คุ้มค่า?</h2>
          
          <p>
            สำหรับข้าราชการไทย <strong>เงินบำนาญ</strong> ถือเป็นสวัสดิการสำคัญที่ช่วยรับประกันความมั่นคงในวัยเกษียณ 
            แต่หลังจากการก่อตั้ง <strong>กองทุนบำเหน็จบำนาญข้าราชการ (กบข.)</strong> ในปี พ.ศ. 2540 ระบบการคิดบำนาญก็ได้ถูกปรับเปลี่ยนไป 
            ทำให้ข้าราชการที่บรรจุหลังวันที่ 27 มีนาคม 2540 (รวมถึงผู้ที่สมัครใจเข้าเป็นสมาชิก กบข. ในภายหลัง) จะต้องใช้สูตรการคำนวณบำนาญแบบใหม่ หรือที่เรียกกันว่า "สูตร กบข."
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">สูตรการคำนวณเงินบำนาญ กบข.</h3>
          <p>
            สูตรคำนวณบำนาญสำหรับสมาชิก กบข. จะมีความแตกต่างจากสูตรดั้งเดิม โดยเปลี่ยนมาใช้เงินเดือนเฉลี่ย 60 เดือนสุดท้าย และมีเพดานสูงสุดที่รับได้ไม่เกิน 70% ของเงินเดือนเฉลี่ยนั้น โดยมีสูตรดังนี้:
          </p>
          
          <div className="bg-emerald-50 p-6 rounded-xl my-6 border border-emerald-100 text-center text-lg font-medium">
            เงินบำนาญ = (เงินเดือนเฉลี่ย 60 เดือนสุดท้าย × อายุราชการ) ÷ 50
            <p className="text-sm text-emerald-700 mt-2 font-normal">*โดยผลลัพธ์ต้องไม่เกิน 70% ของเงินเดือนเฉลี่ย 60 เดือนสุดท้าย</p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">เจาะลึกตัวแปรในสูตรคำนวณ</h3>
          <ul className="list-disc pl-6 mb-4 space-y-3">
            <li>
              <strong>เงินเดือนเฉลี่ย 60 เดือนสุดท้าย:</strong> 
              นำเงินเดือนในช่วง 5 ปีสุดท้ายก่อนเกษียณ (60 เดือน) มารวมกันแล้วหารด้วย 60 ซึ่งจะน้อยกว่าการใช้เงินเดือนเดือนสุดท้ายเพียงเดือนเดียว (แบบสูตรดั้งเดิม)
            </li>
            <li>
              <strong>อายุราชการ:</strong> 
              นับตั้งแต่เริ่มบรรจุเข้ารับราชการจนถึงวันเกษียณอายุ โดยจะนับเป็นจำนวนปี หากมีเศษของปีที่เกิน 6 เดือน ให้นับเป็น 1 ปีเต็ม นอกจากนี้ หากมี <em>เวลาราชการทวีคูณ</em> (เช่น การปฏิบัติงานในพื้นที่เสี่ยงภัยตามที่ประกาศ) ก็สามารถนำมาบวกเพิ่มในอายุราชการได้ด้วย
            </li>
            <li>
              <strong>เพดานสูงสุด 70%:</strong> 
              ไม่ว่าคุณจะมีอายุราชการยาวนานแค่ไหน (เช่น 40 ปี) เมื่อนำมาคำนวณตามสูตรแล้ว หากได้บำนาญเกินกว่า 70% ของเงินเดือนเฉลี่ย 60 เดือน ระบบจะตัดให้เหลือเพียง 70% เท่านั้น
            </li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">ทำไมสูตร กบข. จึงดูได้บำนาญน้อยกว่าสูตรเดิม?</h3>
          <p>
            หลายคนเมื่อนำสูตรนี้ไปเทียบกับสูตรดั้งเดิม จะพบว่าบำนาญที่ได้จากสูตร กบข. จะน้อยกว่า 
            แต่นั่นเป็นความตั้งใจของระบบ <strong>เนื่องจากสมาชิก กบข. จะได้รับเงินก้อนใหญ่อีกก้อนหนึ่งจาก กบข. ในวันเกษียณ</strong> 
            (ซึ่งประกอบด้วย เงินสะสม เงินสมทบ เงินชดเชย และผลประโยชน์ที่ กบข. นำไปลงทุน) 
            เป็นการเปลี่ยนรูปแบบจากที่รัฐเป็นผู้แบกรับภาระบำนาญเพียงฝ่ายเดียว มาเป็นการร่วมกันออมเงินระหว่างข้าราชการและรัฐนั่นเอง
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">เทคนิคการเพิ่มผลตอบแทนหลังเกษียณ</h3>
          <p>
            เนื่องจากเงินบำนาญรายเดือนอาจถูกจำกัดด้วยเพดาน 70% สมาชิก กบข. ควรให้ความสำคัญกับเงินก้อนที่จะได้จาก กบข. ด้วย 
            คุณสามารถเพิ่มพูนเงินก้อนนี้ได้โดยการ <strong>ออมเพิ่ม</strong> (สูงสุด 30% ของเงินเดือน) 
            หรือการเปลี่ยน <strong>แผนการลงทุน</strong> ของ กบข. ให้เหมาะสมกับช่วงอายุและระดับความเสี่ยงที่รับได้ 
            เพื่อเพิ่มโอกาสในการสร้างผลตอบแทนที่สูงขึ้น ชดเชยบำนาญรายเดือนที่อาจจะน้อยกว่าความคาดหวังได้
          </p>
        </article>
      )}
    </div>
  );
}

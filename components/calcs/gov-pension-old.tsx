import React, { useState } from 'react';
import { ScrollText, Info } from 'lucide-react';

export default function GovPensionOld({ lang }: any) {
  const isTH = lang === 'TH';

  const [finalSalary, setFinalSalary] = useState<number | ''>(40000);
  const [yearsOfService, setYearsOfService] = useState<number | ''>(25);

  const calculatePension = () => {
    if (typeof finalSalary !== 'number' || typeof yearsOfService !== 'number') return null;

    // Old Formula: (Final month salary * Years of service) / 50
    const rawPension = (finalSalary * yearsOfService) / 50;
    
    // Capped at 100% of final salary (cannot exceed last month's salary)
    const finalPension = Math.min(rawPension, finalSalary);
    
    const isCapped = rawPension > finalSalary;

    return {
      rawPension,
      finalPension,
      isCapped
    };
  };

  const result = calculatePension();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <ScrollText size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isTH ? "คำนวณบำนาญข้าราชการ (สูตรดั้งเดิม)" : "Old Government Pension Calculator"}
            </h2>
          </div>
          <p className="text-gray-600">
            {isTH 
              ? "คำนวณเงินบำนาญรายเดือนสำหรับข้าราชการที่ 'ไม่ได้' เป็นสมาชิกกองทุน กบข. โดยใช้ฐานเงินเดือนเดือนสุดท้าย" 
              : "Calculate the monthly pension for government officials who are NOT GPF members, using the final month's salary."}
          </p>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "เงินเดือนเดือนสุดท้าย (บาท)" : "Final month's salary (THB)"}
              </label>
              <input
                type="number"
                value={finalSalary}
                onChange={(e) => setFinalSalary(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg"
                placeholder={isTH ? "เช่น 40000" : "e.g. 40000"}
              />
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <Info size={14} className="mt-0.5 shrink-0" />
                {isTH ? "ใช้เงินเดือนเต็มจำนวนในเดือนสุดท้ายก่อนเกษียณ" : "Use the full salary of the last month before retirement."}
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg"
                placeholder={isTH ? "เช่น 25" : "e.g. 25"}
              />
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <Info size={14} className="mt-0.5 shrink-0" />
                {isTH ? "เศษของปีที่เกิน 6 เดือน ให้นับเป็น 1 ปีเต็ม" : "Fractions of a year over 6 months count as 1 full year."}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 flex flex-col justify-center border border-gray-100">
            {result ? (
              <div className="text-center space-y-4">
                <h3 className="text-gray-500 font-medium">
                  {isTH ? "เงินบำนาญรายเดือนที่คาดว่าจะได้รับ" : "Estimated Monthly Pension"}
                </h3>
                <div className="text-4xl md:text-5xl font-bold text-indigo-600">
                  {result.finalPension.toLocaleString('en-US', { maximumFractionDigits: 2 })} <span className="text-xl md:text-2xl text-gray-600 font-normal">{isTH ? "บาท" : "THB"}</span>
                </div>
                
                {result.isCapped && (
                  <div className="text-sm bg-orange-50 text-orange-700 p-3 rounded-lg border border-orange-200 mt-4 text-left">
                    <p className="font-medium flex items-center gap-1">
                      <Info size={16} />
                      {isTH ? "เงินบำนาญเกินเพดาน (รับได้สูงสุดเท่ากับเงินเดือนสุดท้าย)" : "Pension capped at 100% of final salary"}
                    </p>
                    <p className="mt-1">
                      {isTH 
                        ? `กฎหมายกำหนดให้รับเงินบำนาญได้สูงสุดไม่เกินเงินเดือนเดือนสุดท้าย แม้อายุราชการจะสูงมากก็ตาม` 
                        : `By law, pension cannot exceed the final month's salary regardless of years of service.`}
                    </p>
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mt-4 text-left bg-white p-3 rounded-lg border border-gray-200">
                  <p className="font-semibold text-gray-700 mb-1">{isTH ? "สูตรคำนวณแบบดั้งเดิม:" : "Old Formula:"}</p>
                  <p className="font-mono text-xs">(เงินเดือนเดือนสุดท้าย × อายุราชการ) ÷ 50</p>
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
        <article className="prose prose-indigo max-w-none bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">บำนาญข้าราชการ สูตรดั้งเดิม (พ.ศ. 2494) คืออะไร?</h2>
          
          <p>
            ก่อนหน้าที่จะมีการจัดตั้งกองทุนบำเหน็จบำนาญข้าราชการ (กบข.) ในปี พ.ศ. 2540 ข้าราชการไทยทุกคนจะอยู่ภายใต้ระบบบำเหน็จบำนาญที่อ้างอิงจาก <strong>พระราชบัญญัติบำเหน็จบำนาญข้าราชการ พ.ศ. 2494</strong> 
            ซึ่งปัจจุบันมักเรียกกันว่า <strong>"บำนาญสูตรดั้งเดิม"</strong> หรือ "บำนาญ พ.ร.บ. 2494" 
            ระบบนี้เป็นระบบที่รัฐรับภาระการจ่ายเงินบำนาญให้กับข้าราชการผู้เกษียณอายุเพียงฝ่ายเดียว 100% โดยที่ข้าราชการไม่ต้องถูกหักเงินเดือนเพื่อสมทบเข้ากองทุนแต่อย่างใด
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">สูตรการคำนวณเงินบำนาญสูตรดั้งเดิม</h3>
          <p>
            สูตรดั้งเดิมมีจุดเด่นสำคัญที่ทำให้ข้าราชการหลายคนชื่นชอบ นั่นคือการใช้ <strong>"เงินเดือนเดือนสุดท้าย"</strong> ในการคำนวณ ซึ่งมักจะเป็นอัตราเงินเดือนที่สูงที่สุดในชีวิตการรับราชการ โดยมีสูตรดังนี้:
          </p>
          
          <div className="bg-indigo-50 p-6 rounded-xl my-6 border border-indigo-100 text-center text-lg font-medium">
            เงินบำนาญ = (เงินเดือนเดือนสุดท้าย × อายุราชการ) ÷ 50
            <p className="text-sm text-indigo-700 mt-2 font-normal">*โดยผลลัพธ์ต้องไม่เกินเงินเดือนเดือนสุดท้าย (100%)</p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">เปรียบเทียบสูตรดั้งเดิม กับ สูตร กบข.</h3>
          <p>
            ผู้ที่ยังสามารถใช้สูตรดั้งเดิมนี้ได้ คือข้าราชการที่บรรจุก่อนวันที่ 27 มีนาคม 2540 และปฏิเสธการเข้าเป็นสมาชิก กบข. หรือผู้ที่ทำเรื่องขอลาออกจาก กบข. (ตามเงื่อนไขของกฎหมายในบางช่วงเวลา หรือโครงการ Undoing) 
            เมื่อเปรียบเทียบกับสูตร กบข. สูตรดั้งเดิมจะมีข้อแตกต่างหลักๆ 3 ประการ คือ:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border border-gray-300">ประเด็นการเปรียบเทียบ</th>
                  <th className="p-3 border border-gray-300 text-indigo-800">สูตรดั้งเดิม (พ.ร.บ. 2494)</th>
                  <th className="p-3 border border-gray-300 text-emerald-800">สูตร กบข.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-300 font-medium">ฐานเงินเดือนที่ใช้คำนวณ</td>
                  <td className="p-3 border border-gray-300">เงินเดือน <strong>เดือนสุดท้าย</strong></td>
                  <td className="p-3 border border-gray-300">เงินเดือนเฉลี่ย <strong>60 เดือนสุดท้าย</strong></td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-300 font-medium">เพดานสูงสุดของบำนาญ</td>
                  <td className="p-3 border border-gray-300">รับได้สูงสุดถึง <strong>100%</strong> ของเงินเดือนสุดท้าย</td>
                  <td className="p-3 border border-gray-300">จำกัดเพดานสูงสุดที่ <strong>70%</strong> ของเงินเดือนเฉลี่ย</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-300 font-medium">เงินก้อนตอนเกษียณ</td>
                  <td className="p-3 border border-gray-300">ไม่มีเงินก้อนแถมให้ (รับเฉพาะบำนาญรายเดือน)</td>
                  <td className="p-3 border border-gray-300">ได้เงินก้อนจากเงินสะสม, เงินสมทบ, ชดเชย และผลประโยชน์ (หลักแสนถึงล้านบาท)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">สรุปแล้วสูตรไหนดีกว่ากัน?</h3>
          <p>
            หากมองในมุมของ <strong>"รายรับรายเดือน"</strong> สูตรดั้งเดิมจะให้ตัวเลขที่สูงกว่าเสมอ เพราะฐานเงินเดือนเดือนสุดท้ายย่อมสูงกว่าค่าเฉลี่ย 60 เดือน และไม่มีเพดาน 70% มากดทับ 
            แต่หากมองในมุมของ <strong>"สภาพคล่อง"</strong> การอยู่ในระบบ กบข. จะทำให้คุณมี "เงินก้อน" ก้อนใหญ่ในวันเกษียณ ซึ่งสามารถนำไปปิดหนี้บ้าน ซื้อรถใหม่ หรือลงทุนต่อยอดได้ทันที 
            ในขณะที่ผู้รับบำนาญสูตรดั้งเดิมจะต้องอาศัยการค่อยๆ ทยอยรับเงินบำนาญไปเรื่อยๆ ในแต่ละเดือน 
            ดังนั้น ความคุ้มค่าจึงขึ้นอยู่กับแผนการเงิน, ภาระหนี้สินในวัยเกษียณ และวินัยการออมส่วนตัวของแต่ละบุคคลด้วย
          </p>
        </article>
      )}
    </div>
  );
}

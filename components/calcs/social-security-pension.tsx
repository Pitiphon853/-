import React, { useState } from 'react';
import { Calculator, Info, AlertTriangle } from 'lucide-react';

export default function SocialSecurityPension({ lang }: any) {
  const isTH = lang === 'TH';

  const [avgSalary, setAvgSalary] = useState<number | ''>(15000);
  const [monthsPaid, setMonthsPaid] = useState<number | ''>(180);

  const calculatePension = () => {
    if (typeof avgSalary !== 'number' || typeof monthsPaid !== 'number') return null;
    
    if (monthsPaid < 180) {
      return {
        eligible: false,
        message: isTH 
          ? "ไม่เข้าเกณฑ์รับบำนาญชราภาพ (ส่งเงินสมทบไม่ถึง 180 เดือน) จะได้รับเป็นเงินบำเหน็จก้อนแทน" 
          : "Not eligible for pension (contributed less than 180 months). You will receive a lump sum instead."
      };
    }

    const cappedSalary = Math.min(avgSalary, 15000);
    const extraYears = Math.floor((monthsPaid - 180) / 12);
    const totalPercentage = 20 + (extraYears * 1.5);
    const pensionAmount = (cappedSalary * totalPercentage) / 100;

    return {
      eligible: true,
      pensionAmount,
      totalPercentage,
      cappedSalary
    };
  };

  const result = calculatePension();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Calculator size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isTH ? "คำนวณเงินบำนาญชราภาพประกันสังคม" : "Social Security Pension Calculator"}
            </h2>
          </div>
          <p className="text-gray-600">
            {isTH 
              ? "คำนวณเงินบำนาญชราภาพที่คุณจะได้รับเป็นรายเดือนไปตลอดชีวิต เมื่อส่งเงินสมทบตั้งแต่ 180 เดือนขึ้นไป" 
              : "Calculate the monthly lifetime pension you will receive if you have contributed for 180 months or more."}
          </p>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "ค่าจ้างเฉลี่ย 60 เดือนสุดท้าย (บาท)" : "Average salary of last 60 months (THB)"}
              </label>
              <input
                type="number"
                value={avgSalary}
                onChange={(e) => setAvgSalary(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
                placeholder={isTH ? "เช่น 15000" : "e.g. 15000"}
              />
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <Info size={14} className="mt-0.5 shrink-0" />
                {isTH ? "สูงสุดไม่เกิน 15,000 บาท/เดือน ตามฐานเพดานประกันสังคม" : "Capped at 15,000 THB/month according to social security maximum base."}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "จำนวนเดือนที่ส่งเงินสมทบทั้งหมด (เดือน)" : "Total months contributed (months)"}
              </label>
              <input
                type="number"
                value={monthsPaid}
                onChange={(e) => setMonthsPaid(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
                placeholder={isTH ? "เช่น 180" : "e.g. 180"}
              />
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <Info size={14} className="mt-0.5 shrink-0" />
                {isTH ? "ต้องส่งตั้งแต่ 180 เดือนขึ้นไป (15 ปี) ถึงจะมีสิทธิรับบำนาญ" : "Must be at least 180 months (15 years) to be eligible for pension."}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 flex flex-col justify-center">
            {result ? (
              result.eligible ? (
                <div className="text-center space-y-4">
                  <h3 className="text-gray-500 font-medium">
                    {isTH ? "เงินบำนาญที่คุณจะได้รับต่อเดือน" : "Your Monthly Pension"}
                  </h3>
                  <div className="text-4xl md:text-5xl font-bold text-blue-600">
                    {result.pensionAmount!.toLocaleString('en-US', { maximumFractionDigits: 2 })} <span className="text-xl md:text-2xl text-gray-600 font-normal">{isTH ? "บาท" : "THB"}</span>
                  </div>
                  <div className="text-sm text-gray-500 space-y-1 mt-4">
                    <p>{isTH ? "คิดเป็น" : "Which is"} <b>{result.totalPercentage}%</b> {isTH ? "ของฐานค่าจ้างเฉลี่ย 60 เดือน" : "of your average salary base"}</p>
                    <p>{isTH ? "ฐานค่าจ้างที่ใช้คำนวณ:" : "Base salary used:"} {result.cappedSalary!.toLocaleString()} {isTH ? "บาท" : "THB"}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 text-amber-600">
                  <AlertTriangle size={48} className="mx-auto" />
                  <p className="font-medium text-lg">{result.message}</p>
                  <p className="text-sm text-gray-600">
                    {isTH 
                      ? "โปรดใช้เครื่องคำนวณเงินบำเหน็จชราภาพสำหรับกรณีที่ส่งเงินสมทบไม่ถึง 180 เดือน" 
                      : "Please use the Lump Sum Pension Calculator for contributions under 180 months."}
                  </p>
                </div>
              )
            ) : (
              <div className="text-center text-gray-400">
                {isTH ? "กรอกข้อมูลเพื่อดูผลลัพธ์" : "Enter details to see results"}
              </div>
            )}
          </div>
        </div>
      </div>

      {isTH && (
        <article className="prose prose-blue max-w-none bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">บำนาญชราภาพประกันสังคมคืออะไร? เงื่อนไขและการคำนวณที่คุณควรรู้</h2>
          
          <p>
            กองทุนประกันสังคมมีสิทธิประโยชน์มากมาย หนึ่งในนั้นที่สำคัญที่สุดสำหรับวัยเกษียณคือ <strong>"เงินบำนาญชราภาพ"</strong> 
            ซึ่งเป็นเงินที่สำนักงานประกันสังคมจะจ่ายให้กับผู้ประกันตนเป็นรายเดือนตลอดชีวิต เมื่อครบกำหนดอายุและปฏิบัติตามเงื่อนไขที่กำหนด 
            การทำความเข้าใจเรื่องเงินบำนาญชราภาพตั้งแต่วัยทำงานจะช่วยให้คุณสามารถวางแผนการเงินหลังเกษียณได้อย่างมีประสิทธิภาพมากยิ่งขึ้น
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">เงื่อนไขการเกิดสิทธิรับบำนาญชราภาพ</h3>
          <p>
            เพื่อให้ได้รับเงินบำนาญชราภาพเป็นรายเดือน ผู้ประกันตนจะต้องมีคุณสมบัติครบถ้วนตามเงื่อนไข 3 ข้อ ดังนี้:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>อายุครบ 55 ปีบริบูรณ์</strong>: ต้องมีอายุถึงเกณฑ์ที่กำหนดจึงจะสามารถยื่นขอรับสิทธิได้</li>
            <li><strong>ความเป็นผู้ประกันตนสิ้นสุดลง</strong>: ต้องลาออกหรือสิ้นสุดสภาพการเป็นลูกจ้าง (ผู้ประกันตนมาตรา 33 หรือ 39)</li>
            <li><strong>จ่ายเงินสมทบมาแล้วไม่น้อยกว่า 180 เดือน (15 ปี)</strong>: ไม่จำเป็นต้องจ่ายติดต่อกัน สามารถนับรวมระยะเวลาทั้งหมดที่เคยจ่ายเงินสมทบได้ หากส่งไม่ถึง 180 เดือน จะได้รับเป็นเงินบำเหน็จ (เงินก้อน) แทน</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">สูตรการคำนวณเงินบำนาญชราภาพประกันสังคม</h3>
          <p>
            การคำนวณเงินบำนาญชราภาพจะใช้ฐานค่าจ้างเฉลี่ย 60 เดือนสุดท้าย (แต่สูงสุดไม่เกิน 15,000 บาทต่อเดือน ตามเพดานของประกันสังคม) 
            มาคำนวณกับอัตราเปอร์เซ็นต์ตามระยะเวลาการส่งเงินสมทบ โดยมีสูตรดังนี้:
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg my-4 border border-gray-200">
            <p className="font-semibold text-blue-700">กรณีส่งเงินสมทบครบ 180 เดือน (15 ปี) พอดี</p>
            <p>จะได้รับเงินบำนาญชราภาพในอัตรา <strong>20% ของค่าจ้างเฉลี่ย 60 เดือนสุดท้าย</strong></p>
            <p className="mt-2 text-sm text-gray-600">ตัวอย่าง: ค่าจ้างเฉลี่ย 15,000 บาท x 20% = ได้รับบำนาญ 3,000 บาท/เดือน</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg my-4 border border-gray-200">
            <p className="font-semibold text-green-700">กรณีส่งเงินสมทบมากกว่า 180 เดือน (เกิน 15 ปี)</p>
            <p>จะได้รับเงินบำนาญชราภาพเพิ่มขึ้นอีก <strong>1.5% ต่อระยะเวลาการจ่ายเงินสมทบครบทุก 12 เดือน</strong></p>
            <p className="mt-2 text-sm text-gray-600">ตัวอย่าง: ส่งเงินสมทบมา 240 เดือน (20 ปี) ส่วนที่เกินคือ 60 เดือน (5 ปี) <br/>
            อัตราที่จะได้ = 20% + (5 x 1.5%) = 27.5% <br/>
            ค่าจ้างเฉลี่ย 15,000 บาท x 27.5% = ได้รับบำนาญ 4,125 บาท/เดือน</p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">คำแนะนำในการวางแผนรับบำนาญ</h3>
          <p>
            หลายคนอาจมองว่าเงินบำนาญจากประกันสังคมมีจำนวนไม่มากนัก (สูงสุดในปัจจุบันสำหรับคนที่ส่งมา 25-30 ปี จะอยู่ที่ประมาณ 5,000 - 7,000 บาทเศษ) 
            ดังนั้น เงินบำนาญชราภาพจึงควรเป็น <strong>"ฐาน"</strong> ของรายได้หลังเกษียณเท่านั้น คุณควรมีการออมเงินในช่องทางอื่นๆ ควบคู่ไปด้วย เช่น 
            กองทุนสำรองเลี้ยงชีพ (PVD), กองทุนรวมเพื่อการเลี้ยงชีพ (RMF), กองทุนรวมไทยเพื่อความยั่งยืน (TESG) หรือการทำประกันชีวิตแบบบำนาญ 
            เพื่อให้มีเงินใช้จ่ายอย่างเพียงพอและมีคุณภาพชีวิตที่ดีในยามเกษียณ
          </p>
          <p>
            <strong>หมายเหตุ:</strong> ข้อมูลนี้อ้างอิงจากกฎเกณฑ์ของสำนักงานประกันสังคมในปัจจุบัน หากมีการปรับฐานเพดานเงินเดือนในอนาคต เงินบำนาญสูงสุดที่จะได้รับก็จะมีโอกาสเพิ่มขึ้นตามไปด้วย ควรติดตามข่าวสารจากสำนักงานประกันสังคมอย่างใกล้ชิดเมื่อใกล้ถึงวัยเกษียณ
          </p>
        </article>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Coins, Info, AlertCircle } from 'lucide-react';

export default function SocialSecurityLumpSum({ lang }: any) {
  const isTH = lang === 'TH';

  const [avgSalary, setAvgSalary] = useState<number | ''>(15000);
  const [monthsPaid, setMonthsPaid] = useState<number | ''>(60);

  const calculateLumpSum = () => {
    if (typeof avgSalary !== 'number' || typeof monthsPaid !== 'number') return null;
    
    if (monthsPaid >= 180) {
      return {
        eligible: false,
        message: isTH 
          ? "คุณเข้าเกณฑ์รับบำนาญชราภาพรายเดือน (ส่งเงินสมทบตั้งแต่ 180 เดือนขึ้นไป) จะไม่ได้รับเป็นเงินก้อน" 
          : "You are eligible for monthly pension (180+ months). You will not receive a lump sum."
      };
    }

    const cappedSalary = Math.min(avgSalary, 15000);
    // Old age contribution is 3% from employee and 3% from employer (6% total)
    const employeeMonthly = cappedSalary * 0.03;
    const employerMonthly = cappedSalary * 0.03;

    let totalAmount = 0;
    let details = '';

    if (monthsPaid < 12) {
      totalAmount = employeeMonthly * monthsPaid;
      details = isTH ? 'ได้รับเฉพาะส่วนที่ผู้ประกันตนสมทบ (ไม่รวมส่วนนายจ้าง)' : 'Receives only employee contribution (excludes employer portion)';
    } else {
      totalAmount = (employeeMonthly + employerMonthly) * monthsPaid;
      // In reality there is yield/interest from SSO, but it's variable. We provide the principal estimate.
      details = isTH ? 'ได้รับส่วนของผู้ประกันตน + ส่วนของนายจ้าง + ผลประโยชน์ตอบแทน (ถ้ามี)' : 'Receives employee + employer contributions + returns (if any)';
    }

    return {
      eligible: true,
      totalAmount,
      details,
      cappedSalary
    };
  };

  const result = calculateLumpSum();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-500 rounded-lg text-white">
              <Coins size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isTH ? "คำนวณเงินบำเหน็จชราภาพประกันสังคม" : "Social Security Lump Sum Calculator"}
            </h2>
          </div>
          <p className="text-gray-600">
            {isTH 
              ? "คำนวณเงินก้อนบำเหน็จชราภาพ (ประมาณการ) สำหรับผู้ที่ส่งเงินสมทบไม่ถึง 180 เดือน (15 ปี)" 
              : "Calculate the estimated lump sum pension for those who have contributed for less than 180 months (15 years)."}
          </p>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "ค่าจ้างเฉลี่ยต่อเดือน (บาท)" : "Average monthly salary (THB)"}
              </label>
              <input
                type="number"
                value={avgSalary}
                onChange={(e) => setAvgSalary(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-lg"
                placeholder={isTH ? "เช่น 15000" : "e.g. 15000"}
              />
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <Info size={14} className="mt-0.5 shrink-0" />
                {isTH ? "สูงสุดไม่เกิน 15,000 บาท/เดือน ตามฐานเพดานประกันสังคม" : "Capped at 15,000 THB/month according to maximum base."}
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-lg"
                placeholder={isTH ? "เช่น 60" : "e.g. 60"}
              />
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <Info size={14} className="mt-0.5 shrink-0" />
                {isTH ? "ต้องน้อยกว่า 180 เดือน หากเกินจะได้รับเป็นบำนาญแทน" : "Must be less than 180 months. If more, you get a monthly pension."}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 flex flex-col justify-center border border-gray-100">
            {result ? (
              result.eligible ? (
                <div className="text-center space-y-4">
                  <h3 className="text-gray-500 font-medium">
                    {isTH ? "ประมาณการเงินบำเหน็จที่คุณจะได้รับ (เงินก้อน)" : "Estimated Lump Sum"}
                  </h3>
                  <div className="text-4xl md:text-5xl font-bold text-orange-500">
                    {result.totalAmount!.toLocaleString('en-US', { maximumFractionDigits: 0 })} <span className="text-xl md:text-2xl text-gray-600 font-normal">{isTH ? "บาท" : "THB"}</span>
                  </div>
                  <div className="text-sm text-gray-500 bg-white p-3 rounded-lg border border-gray-200 mt-4">
                    <p className="font-medium text-gray-700 mb-1">{isTH ? "เงื่อนไขที่ได้รับ:" : "Condition:"}</p>
                    <p>{result.details}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {isTH ? "*ตัวเลขนี้เป็นเพียงการประมาณการเงินต้นที่ส่งสมทบ ยังไม่รวมผลประโยชน์ตอบแทนสะสมรายปีที่ประกันสังคมจะประกาศเพิ่มให้" : "*This is an estimate of principal contributions. It does not include annual yields announced by SSO."}
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-4 text-blue-600">
                  <AlertCircle size={48} className="mx-auto" />
                  <p className="font-medium text-lg">{result.message}</p>
                  <p className="text-sm text-gray-600">
                    {isTH 
                      ? "โปรดใช้เครื่องคำนวณเงินบำนาญชราภาพสำหรับกรณีที่ส่งเงินสมทบตั้งแต่ 180 เดือนขึ้นไป" 
                      : "Please use the Pension Calculator for contributions of 180 months or more."}
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
        <article className="prose prose-orange max-w-none bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">เงินบำเหน็จชราภาพประกันสังคมคืออะไร? ใครบ้างที่มีสิทธิได้รับ</h2>
          
          <p>
            นอกจาก "เงินบำนาญชราภาพ" ที่จ่ายเป็นรายเดือนตลอดชีวิตแล้ว สำนักงานประกันสังคมยังมีสิทธิประโยชน์ที่เรียกว่า <strong>"เงินบำเหน็จชราภาพ"</strong> 
            ซึ่งเป็นการจ่ายเงินเป็นก้อนครั้งเดียวจบ สำหรับผู้ประกันตนที่เกษียณอายุแต่ส่งเงินสมทบไม่ครบตามเกณฑ์ที่จะได้รับบำนาญ 
            ทำให้มั่นใจได้ว่าเงินที่คุณส่งสมทบไปในแต่ละเดือนนั้นจะไม่สูญเปล่าเมื่อถึงวัยเกษียณ
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">เงื่อนไขการเกิดสิทธิรับบำเหน็จชราภาพ</h3>
          <p>
            ผู้ประกันตนจะมีสิทธิรับเงินบำเหน็จชราภาพเมื่อเข้าเงื่อนไขครบถ้วน ดังต่อไปนี้:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>อายุครบ 55 ปีบริบูรณ์</strong> หรือเป็นผู้ทุพพลภาพ หรือถึงแก่ความตาย</li>
            <li><strong>ความเป็นผู้ประกันตนสิ้นสุดลง</strong> (ลาออกหรือถูกเลิกจ้าง)</li>
            <li><strong>จ่ายเงินสมทบมาแล้ว "ไม่ถึง" 180 เดือน (น้อยกว่า 15 ปี)</strong></li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">วิธีคำนวณและการจ่ายเงินบำเหน็จชราภาพ</h3>
          <p>
            จำนวนเงินบำเหน็จที่คุณจะได้รับนั้น ขึ้นอยู่กับระยะเวลาที่คุณได้จ่ายเงินสมทบเข้ากองทุนชราภาพ โดยแบ่งออกเป็น 2 กรณีหลักๆ ดังนี้:
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg my-4 border border-gray-200">
            <h4 className="font-semibold text-orange-700 mb-2">กรณีที่ 1: จ่ายเงินสมทบต่ำกว่า 12 เดือน</h4>
            <p><strong>จะได้รับเงินบำเหน็จชราภาพเท่ากับ จำนวนเงินสมทบเฉพาะส่วนของผู้ประกันตนที่จ่ายเพื่อการชราภาพเท่านั้น</strong></p>
            <p className="mt-2 text-sm text-gray-600">
              ตัวอย่าง: หากเงินเดือนเกิน 15,000 บาท จะถูกหักสมทบชราภาพส่วนตัว 450 บาทต่อเดือน (3% ของ 15,000) 
              ถ้าทำงานและส่งเงินสมทบมา 10 เดือน เมื่อลาออกและอายุครบ 55 ปี จะได้เงินก้อนคืน = 4,500 บาท
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg my-4 border border-gray-200">
            <h4 className="font-semibold text-amber-700 mb-2">กรณีที่ 2: จ่ายเงินสมทบตั้งแต่ 12 เดือนขึ้นไป แต่ไม่ถึง 180 เดือน</h4>
            <p><strong>จะได้รับเงินบำเหน็จชราภาพเท่ากับ จำนวนเงินสมทบส่วนของผู้ประกันตน + ส่วนของนายจ้างที่จ่ายสมทบเพื่อการชราภาพ + ผลประโยชน์ตอบแทน (ตามที่สำนักงานประกันสังคมกำหนด)</strong></p>
            <p className="mt-2 text-sm text-gray-600">
              ตัวอย่าง: เงินเดือน 15,000 บาท ส่วนตัวส่ง 450 บาท นายจ้างส่ง 450 บาท รวมเป็น 900 บาทต่อเดือน
              ถ้าทำงานมา 60 เดือน (5 ปี) จะได้เงินต้น = 900 x 60 = 54,000 บาท 
              และจะได้รับผลประโยชน์ตอบแทนบวกเพิ่มเข้าไปอีก ตามประกาศของประกันสังคมในแต่ละปี
            </p>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">เงินสมทบชราภาพคือส่วนไหนของประกันสังคม?</h3>
          <p>
            หลายคนอาจสงสัยว่าเงิน 5% (สูงสุด 750 บาท) ที่ถูกหักไปทุกเดือนนั้น ไปอยู่ที่ไหนบ้าง? 
            แท้จริงแล้วเงิน 5% นี้ถูกแบ่งออกเป็น 3 ส่วน คือ:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>1.5% (สูงสุด 225 บาท)</strong>: สำหรับเจ็บป่วย ทุพพลภาพ ตาย คลอดบุตร</li>
            <li><strong>0.5% (สูงสุด 75 บาท)</strong>: สำหรับว่างงาน</li>
            <li><strong>3% (สูงสุด 450 บาท)</strong>: สำหรับสงเคราะห์บุตร และชราภาพ <strong>(นี่คือส่วนที่จะนำมาสะสมเป็นบำเหน็จบำนาญ)</strong></li>
          </ul>

          <p className="mt-4">
            ดังนั้น เงินที่คุณจะได้รับคืนเป็นบำเหน็จก้อนนี้ จะคำนวณจากส่วนที่หักไป 3% ต่อเดือนนั่นเอง
            หากคุณไม่แน่ใจว่าตนเองมียอดสะสมเงินชราภาพอยู่เท่าไหร่ สามารถตรวจสอบได้ด้วยตัวเองผ่านแอปพลิเคชัน <strong>SSO Connect</strong> 
            หรือเว็บไซต์ของสำนักงานประกันสังคมได้ตลอดเวลา
          </p>
        </article>
      )}
    </div>
  );
}

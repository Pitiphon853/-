import React, { useState } from 'react';
import { Scale, Info, AlertOctagon } from 'lucide-react';

export default function SeverancePayCalculator({ lang }: any) {
  const isTH = lang === 'TH';

  const [salary, setSalary] = useState<number | ''>(30000);
  const [years, setYears] = useState<number | ''>(5);
  const [months, setMonths] = useState<number | ''>(0);

  const calculateSeverance = () => {
    if (typeof salary !== 'number' || typeof years !== 'number' || typeof months !== 'number') return null;

    const totalDays = (years * 365) + (months * 30);
    const dailyWage = salary / 30; // Thai Labor law typically uses 30 days per month for daily wage calculation

    let daysCompensated = 0;
    let descriptionTH = '';
    let descriptionEN = '';

    if (totalDays < 120) {
      daysCompensated = 0;
      descriptionTH = "ทำงานติดต่อกันยังไม่ครบ 120 วัน (ไม่มีสิทธิได้รับเงินชดเชย)";
      descriptionEN = "Worked less than 120 days (No severance pay required)";
    } else if (totalDays >= 120 && totalDays < 365) {
      daysCompensated = 30;
      descriptionTH = "ทำงานติดต่อกันครบ 120 วัน แต่ไม่ครบ 1 ปี";
      descriptionEN = "Worked 120 days but less than 1 year";
    } else if (totalDays >= 365 && totalDays < (365 * 3)) {
      daysCompensated = 90;
      descriptionTH = "ทำงานติดต่อกันครบ 1 ปี แต่ไม่ครบ 3 ปี";
      descriptionEN = "Worked 1 year but less than 3 years";
    } else if (totalDays >= (365 * 3) && totalDays < (365 * 6)) {
      daysCompensated = 180;
      descriptionTH = "ทำงานติดต่อกันครบ 3 ปี แต่ไม่ครบ 6 ปี";
      descriptionEN = "Worked 3 years but less than 6 years";
    } else if (totalDays >= (365 * 6) && totalDays < (365 * 10)) {
      daysCompensated = 240;
      descriptionTH = "ทำงานติดต่อกันครบ 6 ปี แต่ไม่ครบ 10 ปี";
      descriptionEN = "Worked 6 years but less than 10 years";
    } else if (totalDays >= (365 * 10) && totalDays < (365 * 20)) {
      daysCompensated = 300;
      descriptionTH = "ทำงานติดต่อกันครบ 10 ปี แต่ไม่ครบ 20 ปี";
      descriptionEN = "Worked 10 years but less than 20 years";
    } else if (totalDays >= (365 * 20)) {
      daysCompensated = 400;
      descriptionTH = "ทำงานติดต่อกันครบ 20 ปีขึ้นไป";
      descriptionEN = "Worked 20 years or more";
    }

    const totalAmount = daysCompensated * dailyWage;
    const equivalentMonths = daysCompensated / 30;

    return {
      daysCompensated,
      description: isTH ? descriptionTH : descriptionEN,
      totalAmount,
      equivalentMonths,
      dailyWage
    };
  };

  const result = calculateSeverance();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-br from-rose-50 to-red-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-600 rounded-lg text-white">
              <Scale size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isTH ? "คำนวณเงินชดเชยถูกเลิกจ้าง (ตามกฎหมายแรงงาน)" : "Severance Pay Calculator (Thai Labor Law)"}
            </h2>
          </div>
          <p className="text-gray-600">
            {isTH 
              ? "คำนวณสิทธิประโยชน์และเงินชดเชยที่คุณควรได้รับ หากถูกเลิกจ้างโดยไม่มีความผิด ตามกฎหมายคุ้มครองแรงงาน พ.ศ. 2562" 
              : "Calculate the severance pay you are entitled to if terminated without cause, according to the Thai Labor Protection Act (2019)."}
          </p>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "เงินเดือนเดือนสุดท้าย (บาท)" : "Last Monthly Salary (THB)"}
              </label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-lg"
              />
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <Info size={14} className="mt-0.5 shrink-0" />
                {isTH ? "รวมค่าคอมมิชชั่นหรือเงินประจำอื่นๆ ที่ถือเป็นค่าจ้างด้วย (ถ้ามี)" : "Include fixed allowances or commissions considered as wages."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? "อายุงาน (ปี)" : "Tenure (Years)"}
                </label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? "เศษของเดือน (ถ้ามี)" : "Remaining Months"}
                </label>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  min="0"
                  max="11"
                />
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 mt-4 flex items-start gap-3">
              <AlertOctagon size={20} className="text-orange-500 shrink-0 mt-0.5" />
              <p className="text-sm text-orange-800">
                {isTH 
                  ? "เงินชดเชยนี้จะได้รับเฉพาะกรณีถูกเลิกจ้าง เลิกกิจการ หรือปลดออก โดยที่ลูกจ้างไม่ได้กระทำความผิด (หากลาออกเอง จะไม่ได้รับสิทธินี้)" 
                  : "Severance pay applies ONLY if terminated without cause, laid off, or company closure. (Resignation is not eligible)."}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 flex flex-col justify-center border border-gray-100">
            {result ? (
              result.daysCompensated > 0 ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-gray-500 font-medium mb-2">
                      {isTH ? "เงินชดเชยเลิกจ้างตามกฎหมาย" : "Legal Severance Pay"}
                    </h3>
                    <div className="text-4xl md:text-5xl font-bold text-rose-600 truncate">
                      {result.totalAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xl text-gray-600 font-normal mt-1">{isTH ? "บาท" : "THB"}</div>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-gray-200 space-y-3">
                    <div className="text-sm font-medium text-gray-800 border-b border-gray-100 pb-2">
                      {isTH ? "เงื่อนไขอายุงานของคุณ:" : "Your tenure bracket:"}
                    </div>
                    <p className="text-rose-700 font-medium">{result.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-3 mt-3 border-t border-gray-100">
                      <div>
                        <div className="text-xs text-gray-500">{isTH ? "สิทธิชดเชยที่ได้" : "Entitlement"}</div>
                        <div className="font-semibold">{result.daysCompensated} {isTH ? "วัน" : "days"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">{isTH ? "เทียบเท่าประมาณ" : "Equivalent to"}</div>
                        <div className="font-semibold">{result.equivalentMonths.toFixed(1)} {isTH ? "เดือน" : "months"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 h-full flex flex-col items-center justify-center space-y-4">
                  <AlertOctagon size={48} className="text-gray-300 mx-auto" />
                  <p className="font-medium">{result.description}</p>
                  <p className="text-sm">
                    {isTH 
                      ? "คุณยังไม่มีสิทธิได้รับเงินชดเชยตามกฎหมายแรงงาน เนื่องจากอายุงานไม่ถึง 120 วัน" 
                      : "You are not legally entitled to severance pay because your tenure is less than 120 days."}
                  </p>
                </div>
              )
            ) : (
              <div className="text-center text-gray-400 h-full flex flex-col items-center justify-center">
                <Scale size={48} className="mb-4 opacity-50" />
                <p>{isTH ? "กรุณากรอกข้อมูลให้ครบถ้วน" : "Please fill in all fields"}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isTH && (
        <article className="prose prose-rose max-w-none bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">เงินชดเชยถูกเลิกจ้าง (Severance Pay) สิทธิพื้นฐานที่ลูกจ้างต้องรู้!</h2>
          
          <p>
            ไม่มีใครอยากให้เกิดเหตุการณ์ถูกเลิกจ้าง หรือบริษัทปิดกิจการกะทันหัน แต่ในโลกของการทำงาน อะไรก็เกิดขึ้นได้ 
            กฎหมายคุ้มครองแรงงานของประเทศไทยจึงได้กำหนดเรื่อง <strong>"เงินชดเชยเลิกจ้าง" (Severance Pay)</strong> เอาไว้ 
            เพื่อให้ลูกจ้างมีเงินก้อนสำหรับตั้งตัวและใช้จ่ายในระหว่างที่กำลังหางานใหม่ 
            (หลายคนมักเรียกกันติดปากว่า <em>"ค่าตกใจ"</em> แต่ในทางกฎหมาย ค่าตกใจและเงินชดเชยเลิกจ้างเป็นคนละส่วนกัน)
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">ใครบ้างที่มีสิทธิได้รับเงินชดเชยนี้?</h3>
          <p>
            ตาม พ.ร.บ. คุ้มครองแรงงาน พ.ศ. 2541 (และที่แก้ไขเพิ่มเติมล่าสุด) ลูกจ้างจะมีสิทธิได้รับเงินชดเชย ก็ต่อเมื่อ:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 font-medium">
            <li>นายจ้างเป็นฝ่ายให้ออกจากงาน (เลิกจ้าง / ปลดออก / บริษัทปิดกิจการ)</li>
            <li>ลูกจ้างทำงานติดต่อกันมาแล้ว "เกิน 120 วันขึ้นไป"</li>
            <li><strong>ลูกจ้างไม่ได้กระทำความผิดร้ายแรง</strong> (เช่น ทุจริต, ทำลายทรัพย์สินบริษัท, ขัดคำสั่งร้ายแรง, ขาดงาน 3 วันติดโดยไม่มีเหตุผล)</li>
          </ul>
          
          <div className="bg-red-50 p-4 rounded-lg my-4 border border-red-200">
            <strong className="text-red-800">ข้อควรระวัง:</strong> หากคุณเป็นฝ่าย <strong>"ยื่นใบลาออกเอง"</strong> หรือเซ็นข้อตกลงสมัครใจลาออก (Mutual Agreement) 
            คุณจะ <em>หมดสิทธิ</em> ได้รับเงินชดเชยตามกฎหมายข้อนี้ทันที ดังนั้น หากถูกบีบให้ออก ห้ามเซ็นใบลาออกโดยเด็ดขาด!
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">อัตราเงินชดเชยเลิกจ้างตามอายุงาน (อัปเดตล่าสุด)</h3>
          <p>
            กฎหมายได้แบ่งอัตราการจ่ายเงินชดเชยออกเป็น 6 ขั้น ยิ่งทำงานนานยิ่งได้รับชดเชยเยอะ ดังนี้:
          </p>
          
          <div className="overflow-x-auto my-4">
            <table className="w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border border-gray-300">อายุงาน (ติดต่อกัน)</th>
                  <th className="p-3 border border-gray-300">เงินชดเชยที่ต้องได้รับ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-300">น้อยกว่า 120 วัน (ไม่ถึง 4 เดือน)</td>
                  <td className="p-3 border border-gray-300 text-gray-500">ไม่ได้เงินชดเชย</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-300">ครบ 120 วัน แต่ไม่ถึง 1 ปี</td>
                  <td className="p-3 border border-gray-300 font-semibold">ค่าจ้าง 30 วัน (ประมาณ 1 เดือน)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-300">ครบ 1 ปี แต่ไม่ถึง 3 ปี</td>
                  <td className="p-3 border border-gray-300 font-semibold">ค่าจ้าง 90 วัน (ประมาณ 3 เดือน)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-300">ครบ 3 ปี แต่ไม่ถึง 6 ปี</td>
                  <td className="p-3 border border-gray-300 font-semibold">ค่าจ้าง 180 วัน (ประมาณ 6 เดือน)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-300">ครบ 6 ปี แต่ไม่ถึง 10 ปี</td>
                  <td className="p-3 border border-gray-300 font-semibold">ค่าจ้าง 240 วัน (ประมาณ 8 เดือน)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-300">ครบ 10 ปี แต่ไม่ถึง 20 ปี</td>
                  <td className="p-3 border border-gray-300 font-semibold text-rose-600">ค่าจ้าง 300 วัน (ประมาณ 10 เดือน)</td>
                </tr>
                <tr className="bg-rose-50">
                  <td className="p-3 border border-gray-300 font-bold">ครบ 20 ปีขึ้นไป (อัตราใหม่!)</td>
                  <td className="p-3 border border-gray-300 font-bold text-rose-700">ค่าจ้าง 400 วัน (ประมาณ 13.3 เดือน)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">เงินชดเชยอื่นๆ ที่นายจ้างต้องจ่าย (ถ้ามี)</h3>
          <p>นอกจากเงินชดเชยเลิกจ้างตามตารางด้านบนแล้ว หากนายจ้างให้ออกกะทันหัน คุณยังอาจมีสิทธิได้รับ:</p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>
              <strong>สินจ้างแทนการบอกกล่าวล่วงหน้า (ค่าตกใจ):</strong> หากนายจ้างไม่ได้แจ้งล่วงหน้าอย่างน้อย 1 งวดการจ่ายเงินเดือน 
              นายจ้างต้องจ่ายเงินเดือนเพิ่มให้อีก 1 เดือนฟรีๆ เรียกว่าค่าตกใจ
            </li>
            <li>
              <strong>ค่าจ้างสำหรับวันหยุดพักผ่อนประจำปีที่เหลืออยู่:</strong> หากคุณมีวันลาพักร้อนสะสมที่ยังไม่ได้ใช้ นายจ้างต้องตีมูลค่าเป็นเงินสดและจ่ายคืนให้คุณด้วย
            </li>
          </ol>
          
          <p className="mt-6 text-sm text-gray-600 border-t border-gray-200 pt-4">
            <em>หมายเหตุ: เมื่อถูกเลิกจ้าง อย่าลืมไปขึ้นทะเบียนว่างงานกับสำนักงานประกันสังคมภายใน 30 วัน เพื่อรับเงินชดเชยกรณีว่างงานอีกทางหนึ่ง (ได้ 50% ของค่าจ้าง สูงสุดไม่เกิน 180 วัน)</em>
          </p>
        </article>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Calculator, Heart, Gift, Info, FileText } from 'lucide-react';

export default function TaxDeductionDonationCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  const [baseIncome, setBaseIncome] = useState<number | ''>('');
  const [donation2x, setDonation2x] = useState<number | ''>('');
  const [donation1x, setDonation1x] = useState<number | ''>('');

  const t = {
    title: lang === 'TH' ? 'คำนวณลดหย่อนภาษีเงินบริจาค (1 เท่า / 2 เท่า)' : 'Donation Tax Deduction Calculator',
    baseIncomeLabel: lang === 'TH' ? 'เงินได้หลังหักค่าใช้จ่ายและลดหย่อนอื่นแล้ว (บาท)' : 'Net Income Before Donations (THB)',
    donation2xLabel: lang === 'TH' ? 'บริจาค 2 เท่า (การศึกษา, รพ.รัฐ, กีฬา)' : '2x Donations (Edu, Hospitals)',
    donation1xLabel: lang === 'TH' ? 'บริจาค 1 เท่า (มูลนิธิ, องค์กรสาธารณกุศลทั่วไป)' : '1x Donations (General Charities)',
    results: lang === 'TH' ? 'สรุปสิทธิลดหย่อนเงินบริจาค' : 'Deduction Summary',
    allowed2x: lang === 'TH' ? 'สิทธิหักลดหย่อนบริจาค 2 เท่า ที่ใช้ได้จริง' : 'Allowed 2x Deduction',
    allowed1x: lang === 'TH' ? 'สิทธิหักลดหย่อนบริจาคทั่วไป ที่ใช้ได้จริง' : 'Allowed 1x Deduction',
    totalDonationDeduct: lang === 'TH' ? 'รวมเงินบริจาคที่นำไปหักลดหย่อนได้' : 'Total Allowed Donation Deduction',
    finalNetIncome: lang === 'TH' ? 'เงินได้สุทธิเพื่อคำนวณภาษี' : 'Final Net Taxable Income',
    max2xNote: lang === 'TH' ? '(สูงสุดไม่เกิน 10% ของเงินได้)' : '(Max 10% of Base Income)',
    max1xNote: lang === 'TH' ? '(สูงสุดไม่เกิน 10% ของเงินได้หลังหักบริจาค 2 เท่า)' : '(Max 10% of Income after 2x deduct)',
  };

  const calculateDonation = () => {
    const A = Number(baseIncome) || 0;
    const d2x = Number(donation2x) || 0;
    const d1x = Number(donation1x) || 0;

    // บริจาค 2 เท่า หักได้ 2 เท่าของที่จ่ายจริง แต่ไม่เกิน 10% ของ A
    const attempt2x = d2x * 2;
    const limit2x = A * 0.1;
    const actual2x = Math.min(attempt2x, limit2x);

    // เงินได้หลังหักบริจาค 2 เท่า
    const incomeAfter2x = A - actual2x;

    // บริจาคทั่วไป หักได้เท่าที่จ่ายจริง แต่ไม่เกิน 10% ของ incomeAfter2x
    const limit1x = incomeAfter2x * 0.1;
    const actual1x = Math.min(d1x, limit1x);

    const totalDonation = actual2x + actual1x;
    let finalNet = A - totalDonation;
    if (finalNet < 0) finalNet = 0;

    return {
      actual2x,
      actual1x,
      totalDonation,
      finalNet,
      limit2x,
      limit1x,
      d2x,
      d1x
    };
  };

  const { actual2x, actual1x, totalDonation, finalNet, limit2x, limit1x, d2x, d1x } = calculateDonation();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 flex items-center justify-center gap-3">
        <Heart className="w-8 h-8 text-rose-500" />
        {t.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
          
          <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-lg border border-rose-100 dark:border-rose-800 mb-2">
            <label className="block text-sm font-medium text-rose-800 dark:text-rose-300 mb-2">
              {t.baseIncomeLabel}
            </label>
            <input
              type="number"
              value={baseIncome}
              onChange={(e) => setBaseIncome(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="เช่น 500000"
              className="w-full px-4 py-3 border border-rose-300 dark:border-rose-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all text-lg font-semibold"
            />
            <p className="text-xs text-rose-600 dark:text-rose-400 mt-2">
              *รายได้รวมหักค่าใช้จ่ายและค่าลดหย่อนพื้นฐาน (เช่น ส่วนตัว, ประกัน, SSF) ก่อนนำมาหักเงินบริจาค
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.donation2xLabel}
            </label>
            <input
              type="number"
              value={donation2x}
              onChange={(e) => setDonation2x(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="0"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.donation1xLabel}
            </label>
            <input
              type="number"
              value={donation1x}
              onChange={(e) => setDonation1x(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="0"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
            />
          </div>

        </div>

        <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-xl border border-rose-100 dark:border-rose-800 flex flex-col">
          <h3 className="text-xl font-semibold text-rose-800 dark:text-rose-300 mb-6 flex items-center gap-2">
            <Gift className="w-5 h-5" />
            {t.results}
          </h3>
          
          <div className="space-y-5 flex-grow">
            <div>
              <div className="flex justify-between items-start mb-1">
                <span className="text-gray-700 dark:text-gray-300">{t.allowed2x}</span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">
                  {actual2x.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                ยอดบริจาคจริง: {d2x.toLocaleString()} × 2 = {(d2x*2).toLocaleString()} <br/>
                เพดาน 10%: {limit2x.toLocaleString()} {t.max2xNote}
              </div>
            </div>
            
            <div className="pt-3 border-t border-rose-200 dark:border-rose-800">
              <div className="flex justify-between items-start mb-1">
                <span className="text-gray-700 dark:text-gray-300">{t.allowed1x}</span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">
                  {actual1x.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                ยอดบริจาคจริง: {d1x.toLocaleString()} <br/>
                เพดาน 10%: {limit1x.toLocaleString()} {t.max1xNote}
              </div>
            </div>

            <div className="flex justify-between items-center py-3 border-b-2 border-rose-200 dark:border-rose-800 mt-2">
              <span className="font-bold text-rose-900 dark:text-rose-100">{t.totalDonationDeduct}</span>
              <span className="text-lg font-bold text-rose-700 dark:text-rose-300">
                {totalDonation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-4 bg-white dark:bg-gray-800 px-4 rounded-lg mt-4 shadow-sm border border-rose-100 dark:border-rose-800">
              <span className="font-bold text-gray-800 dark:text-gray-200">{t.finalNetIncome}</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {finalNet.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {lang === 'TH' && (
        <article className="mt-12 prose prose-rose dark:prose-invert max-w-none">
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <FileText className="w-7 h-7 text-rose-500" />
              การลดหย่อนภาษีด้วย "เงินบริจาค" (อัปเดตปีล่าสุด)
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              การบริจาคเงินนอกจากจะได้บุญและช่วยเหลือสังคมแล้ว กรมสรรพากรยังสนับสนุนให้คนไทยทำความดีด้วยการนำใบเสร็จรับเงินบริจาค 
              มาใช้เป็น <strong>"ค่าลดหย่อนภาษี"</strong> ได้อีกด้วย โดยปัจจุบันสิทธิลดหย่อนเงินบริจาคถูกแบ่งออกเป็น 2 ประเภทหลักๆ คือ บริจาคที่ได้ลดหย่อน 1 เท่า และบริจาคที่ได้ลดหย่อน 2 เท่า
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">1. สิทธิหักลดหย่อนเงินบริจาค 2 เท่า</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              บริจาคเงิน 100 บาท แต่สรรพากรใจดีให้คุณนำไปหักลดหย่อนภาษีได้ถึง 200 บาท! สิทธิพิเศษนี้ให้สำหรับการบริจาคสนับสนุนในด้านต่างๆ เช่น:
            </p>
            <ul className="space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2.5"></div>
                <span><strong>การศึกษา:</strong> สถานศึกษาของรัฐ โรงเรียนเอกชน มหาวิทยาลัย (ผ่านระบบ e-Donation)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2.5"></div>
                <span><strong>โรงพยาบาลรัฐ:</strong> สถานพยาบาลของทางราชการ สภากาชาดไทย ศิริราชพยาบาล รามาธิบดี เป็นต้น</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2.5"></div>
                <span><strong>การกีฬา:</strong> การกีฬาแห่งประเทศไทย, คณะกรรมการโอลิมปิก, สมาคมกีฬาที่รับรอง</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2.5"></div>
                <span><strong>กองทุนต่างๆ:</strong> กองทุนเพื่อความเสมอภาคทางการศึกษา (กสศ.), กองทุนยุติธรรม</span>
              </li>
            </ul>
            <div className="p-3 bg-white dark:bg-gray-700 border-l-4 border-rose-500 text-sm text-gray-700 dark:text-gray-300">
              <strong>เงื่อนไข:</strong> ลดหย่อนได้ 2 เท่าของเงินบริจาคจริง แต่เมื่อรวมกันแล้ว <strong>ต้องไม่เกิน 10% ของเงินได้พึงประเมินหลังหักค่าใช้จ่ายและค่าลดหย่อนอื่นๆ แล้ว</strong>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">2. สิทธิหักลดหย่อนเงินบริจาค 1 เท่า (บริจาคทั่วไป)</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              สำหรับการบริจาคให้แก่มูลนิธิ สมาคม หรือองค์กรสาธารณกุศลอื่นๆ ที่กระทรวงการคลังประกาศกำหนด (เช่น มูลนิธิกระจกเงา, มูลนิธิปวีณา, วัดวาอารามที่เข้าระบบ e-Donation) สามารถหักลดหย่อนได้ตามจริง
            </p>
            <div className="p-3 bg-white dark:bg-gray-700 border-l-4 border-rose-500 text-sm text-gray-700 dark:text-gray-300">
              <strong>เงื่อนไข:</strong> หักได้ตามที่จ่ายจริง แต่ต้อง <strong>ไม่เกิน 10% ของเงินได้สุทธิหลังจากหักเงินบริจาค 2 เท่าแล้ว</strong>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">ระบบ e-Donation คืออะไร?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              ปัจจุบันกรมสรรพากรผลักดันระบบ e-Donation อย่างมาก โดยหากคุณโอนเงินบริจาคผ่าน QR Code (ที่มีคำว่า e-Donation) หรือแจ้งเลขบัตรประชาชนให้หน่วยงานรับบริจาค ข้อมูลการบริจาคของคุณจะถูกส่งเข้าสู่ระบบของกรมสรรพากรโดยอัตโนมัติ ทำให้คุณไม่ต้องเก็บกระดาษใบเสร็จไว้เป็นหลักฐานตอนยื่นภาษีอีกต่อไป สะดวกและมั่นใจได้ว่าได้ลดหย่อนแน่นอน!
            </p>

            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-lg">
              <Info className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>ข้อควรระวัง:</strong> ลำดับการหักเงินบริจาคมีความสำคัญมาก โดยกฎหมายกำหนดให้หักการบริจาค 2 เท่าก่อน แล้วจึงค่อยหักการบริจาคทั่วไป หากคุณคำนวณสลับกัน อาจทำให้เพดานสิทธิลดหย่อนผิดเพี้ยนไป เครื่องมือนี้จึงถูกออกแบบมาเพื่อคำนวณตามลำดับที่สรรพากรกำหนดอย่างถูกต้องเป๊ะๆ
              </p>
            </div>
            
          </div>
        </article>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, Info } from 'lucide-react';

export default function CarInsuranceCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  const [carType, setCarType] = useState('sedan');
  const [insuranceType, setInsuranceType] = useState('class1');
  const [carValue, setCarValue] = useState(800000);
  const [driverAge, setDriverAge] = useState('30-40');
  const [hasCamera, setHasCamera] = useState(true);
  const [deductible, setDeductible] = useState(0);

  const [totalPremium, setTotalPremium] = useState(0);

  useEffect(() => {
    // Basic estimation logic
    let base = 0;
    
    // Base premium by coverage class
    if (insuranceType === 'class1') {
      base = carValue * 0.02; // approx 2% of car value
      if (base < 12000) base = 12000;
      if (base > 35000) base = 35000;
    } else if (insuranceType === 'class2plus') {
      base = 7500;
    } else if (insuranceType === 'class3plus') {
      base = 6500;
    } else if (insuranceType === 'class3') {
      base = 2500;
    }

    // Car type adjustment
    if (carType === 'suv') base *= 1.1;
    if (carType === 'pickup') base *= 1.05;

    // Driver age adjustment (Class 1 often has named driver discounts)
    if (insuranceType === 'class1') {
      if (driverAge === '18-24') base *= 1.2;
      if (driverAge === '25-29') base *= 1.05;
      if (driverAge === '30-40') base *= 0.95; // discount
      if (driverAge === '41+') base *= 0.9; // max discount
    }

    // Dashcam discount (5-10% mandated in TH)
    if (hasCamera) {
      base *= 0.95;
    }

    // Deductible discount (excess)
    if (deductible > 0 && insuranceType === 'class1') {
      base -= deductible * 0.5; // Rough estimate: 50% of deductible amount is discounted
    }

    // Compulsory (Por Ror Bor)
    let prb = 645; // Sedan standard
    if (carType === 'pickup') prb = 967;
    if (carType === 'van') prb = 1182;

    setTotalPremium(Math.max(base + prb, 1500)); // Minimum sanity check
  }, [carType, insuranceType, carValue, driverAge, hasCamera, deductible]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'TH' ? 'ประเมินค่าเบี้ยประกันรถยนต์' : 'Car Insurance Estimator'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'TH' ? 'ประเภทรถ' : 'Car Type'}
            </label>
            <select
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="sedan">{lang === 'TH' ? 'รถเก๋ง (Sedan / Hatchback)' : 'Sedan / Hatchback'}</option>
              <option value="suv">{lang === 'TH' ? 'รถอเนกประสงค์ (SUV / PPV)' : 'SUV / PPV'}</option>
              <option value="pickup">{lang === 'TH' ? 'รถกระบะ (Pickup)' : 'Pickup'}</option>
              <option value="van">{lang === 'TH' ? 'รถตู้ (Van)' : 'Van'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'TH' ? 'ประเภทประกันภัย' : 'Insurance Coverage'}
            </label>
            <select
              value={insuranceType}
              onChange={(e) => setInsuranceType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="class1">{lang === 'TH' ? 'ประกันชั้น 1 (ครอบคลุมสูงสุด)' : 'Class 1 (Comprehensive)'}</option>
              <option value="class2plus">{lang === 'TH' ? 'ประกันชั้น 2+ (ชนรถต้องมีคู่กรณี)' : 'Class 2+ (Vehicle Collision only)'}</option>
              <option value="class3plus">{lang === 'TH' ? 'ประกันชั้น 3+ (ซ่อมรถเรา+รถเขา เฉพาะชนรถ)' : 'Class 3+ (Vehicle Collision only, No theft/fire)'}</option>
              <option value="class3">{lang === 'TH' ? 'ประกันชั้น 3 (ซ่อมเฉพาะรถคู่กรณี)' : 'Class 3 (Third Party Property Only)'}</option>
            </select>
          </div>

          {insuranceType === 'class1' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'TH' ? 'มูลค่ารถปัจจุบัน / ทุนประกัน (บาท)' : 'Car Value / Sum Insured'}
              </label>
              <input
                type="number"
                value={carValue}
                onChange={(e) => setCarValue(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'TH' ? 'ช่วงอายุผู้ขับขี่หลัก (ระบุผู้ขับลดเบี้ยชั้น 1 ได้)' : 'Driver Age Range (Named Driver Discount)'}
            </label>
            <select
              value={driverAge}
              onChange={(e) => setDriverAge(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="18-24">18 - 24 {lang === 'TH' ? 'ปี' : 'years'}</option>
              <option value="25-29">25 - 29 {lang === 'TH' ? 'ปี' : 'years'}</option>
              <option value="30-40">30 - 40 {lang === 'TH' ? 'ปี' : 'years'}</option>
              <option value="41+">41 {lang === 'TH' ? 'ปีขึ้นไป' : 'years or more'}</option>
            </select>
          </div>

          {insuranceType === 'class1' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'TH' ? 'รับค่าเสียหายส่วนแรก (Deductible) เพื่อลดเบี้ย' : 'Deductible (Excess) to lower premium'}
              </label>
              <select
                value={deductible}
                onChange={(e) => setDeductible(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value={0}>{lang === 'TH' ? 'ไม่มี (0 บาท)' : 'None (0 THB)'}</option>
                <option value={3000}>3,000 {lang === 'TH' ? 'บาท/ครั้ง' : 'THB/claim'}</option>
                <option value={5000}>5,000 {lang === 'TH' ? 'บาท/ครั้ง' : 'THB/claim'}</option>
              </select>
            </div>
          )}

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border">
            <input
              type="checkbox"
              id="dashcam"
              checked={hasCamera}
              onChange={(e) => setHasCamera(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <label htmlFor="dashcam" className="text-sm font-medium text-gray-700">
              {lang === 'TH' ? 'มีกล้องติดหน้ารถ (ส่วนลด 5-10%)' : 'Has Dashcam (5-10% Discount)'}
            </label>
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg sticky top-6">
            <h3 className="text-lg font-medium opacity-90 mb-2">
              {lang === 'TH' ? 'ค่าเบี้ยประกันโดยประมาณ' : 'Estimated Annual Premium'}
            </h3>
            <p className="text-4xl font-bold mb-1">
              ฿{totalPremium.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-lg font-normal opacity-80">{lang === 'TH' ? '/ ปี' : '/ Year'}</span>
            </p>
            <p className="text-sm opacity-80 mb-6">
              {lang === 'TH' ? '* ราคานี้รวม พ.ร.บ. แล้ว' : '* Includes Compulsory Insurance (Por Ror Bor)'}
            </p>

            <div className="space-y-3 pt-6 border-t border-blue-400/30">
              <h4 className="font-medium text-blue-100">{lang === 'TH' ? 'ความคุ้มครองหลักๆ' : 'Key Coverages'}</h4>
              
              {insuranceType === 'class1' && (
                <>
                  <div className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-300 shrink-0" /><span className="text-sm">{lang === 'TH' ? 'ชนแบบไม่มีคู่กรณี (ชนเสา ขูดฟุตบาท)' : 'Collision without third party'}</span></div>
                  <div className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-300 shrink-0" /><span className="text-sm">{lang === 'TH' ? 'รถชนรถ (ซ่อมเขา ซ่อมเรา)' : 'Vehicle collision (Both parties)'}</span></div>
                  <div className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-300 shrink-0" /><span className="text-sm">{lang === 'TH' ? 'รถหาย ไฟไหม้ น้ำท่วม' : 'Theft, Fire, Flood'}</span></div>
                </>
              )}
              
              {insuranceType === 'class2plus' && (
                <>
                  <div className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-300 shrink-0" /><span className="text-sm">{lang === 'TH' ? 'รถชนรถยานพาหนะทางบกเท่านั้น' : 'Vehicle to vehicle collision only'}</span></div>
                  <div className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-300 shrink-0" /><span className="text-sm">{lang === 'TH' ? 'รถหาย ไฟไหม้' : 'Theft, Fire'}</span></div>
                </>
              )}

              {insuranceType === 'class3plus' && (
                <>
                  <div className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-300 shrink-0" /><span className="text-sm">{lang === 'TH' ? 'รถชนรถยานพาหนะทางบกเท่านั้น' : 'Vehicle to vehicle collision only'}</span></div>
                </>
              )}

              {insuranceType === 'class3' && (
                <>
                  <div className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-300 shrink-0" /><span className="text-sm">{lang === 'TH' ? 'ซ่อมเฉพาะรถและทรัพย์สินคู่กรณี' : 'Repairs third party only'}</span></div>
                </>
              )}
            </div>

            <div className="mt-6 flex gap-2 items-start text-xs text-blue-200">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                {lang === 'TH' 
                  ? 'นี่เป็นการประมาณการเบี้ยประกันเบื้องต้นเท่านั้น ราคาจริงขึ้นอยู่กับบริษัทประกันภัย ประวัติการเคลม ทุนประกัน และโปรโมชั่นในช่วงเวลานั้น' 
                  : 'This is a rough estimate. Actual premiums depend on the insurance company, claim history, and current promotions.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          คู่มือเลือกประกันภัยรถยนต์: เลือกแบบไหนให้คุ้มค่า?
        </h2>
        <p>
          ประกันภัยรถยนต์คือเกราะป้องกันความเสี่ยงทางการเงินที่สำคัญที่สุดสำหรับผู้ใช้รถ ในประเทศไทย การทำประกันภัยแบ่งออกเป็น 2 ส่วนหลักๆ คือ 
          <strong>ประกันภัยภาคบังคับ (พ.ร.บ.)</strong> ที่รถทุกคันต้องมีตามกฎหมาย และ <strong>ประกันภัยภาคสมัครใจ (ชั้น 1, 2+, 3+, 3)</strong> 
          ที่เราเลือกซื้อเพิ่มเพื่อความคุ้มครองที่ครอบคลุมมากขึ้น
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ความแตกต่างของประกันแต่ละชั้น</h3>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">ประเภท</th>
                <th className="p-3">ซ่อมเขา</th>
                <th className="p-3">ซ่อมเรา (ชนรถ)</th>
                <th className="p-3">ซ่อมเรา (ไม่มีคู่กรณี)</th>
                <th className="p-3">รถหาย/ไฟไหม้</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="p-3 font-semibold">ชั้น 1</td><td className="p-3">✅</td><td className="p-3">✅</td><td className="p-3">✅</td><td className="p-3">✅</td></tr>
              <tr className="border-b"><td className="p-3 font-semibold">ชั้น 2+</td><td className="p-3">✅</td><td className="p-3">✅</td><td className="p-3 text-red-500">❌</td><td className="p-3">✅</td></tr>
              <tr className="border-b"><td className="p-3 font-semibold">ชั้น 3+</td><td className="p-3">✅</td><td className="p-3">✅</td><td className="p-3 text-red-500">❌</td><td className="p-3 text-red-500">❌</td></tr>
              <tr className="border-b"><td className="p-3 font-semibold">ชั้น 3</td><td className="p-3">✅</td><td className="p-3 text-red-500">❌</td><td className="p-3 text-red-500">❌</td><td className="p-3 text-red-500">❌</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">ทริคการลดเบี้ยประกัน (Save Money)</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ระบุผู้ขับขี่ (Named Driver):</strong> หากรถคันนั้นใช้งานเพียง 1-2 คน การระบุชื่อและอายุผู้ขับขี่จะช่วยลดเบี้ยได้สูงสุดถึง 20% ยิ่งอายุมาก ยิ่งได้ส่วนลดมาก (เนื่องจากสถิติชี้ว่าขับรถระมัดระวังกว่า)</li>
          <li><strong>ระบุค่าเสียหายส่วนแรก (Deductible):</strong> หากคุณมั่นใจในฝีมือการขับขี่ การยอมจ่าย 3,000 - 5,000 บาทแรกเมื่อเป็นฝ่ายผิด (หรือไม่มีคู่กรณี) จะช่วยลดเบี้ยประกันตอนซื้อได้ทันทีหลายพันบาท</li>
          <li><strong>ติดกล้องหน้ารถ (Dashcam):</strong> คปภ. กำหนดให้บริษัทประกันต้องมอบส่วนลด 5-10% สำหรับรถที่ติดกล้องวงจรปิดหน้ารถ</li>
          <li><strong>รักษาประวัติดี (No Claim Bonus):</strong> หากไม่เคลมเลย หรือเคลมแต่ไม่ได้เป็นฝ่ายผิด คุณจะได้ส่วนลดประวัติดีในปีถัดไปสะสมสูงสุดถึง 50%</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">สรุป: ควรเลือกชั้นไหนดี?</h3>
        <p>
          หากเป็น <strong>รถใหม่ป้ายแดง หรืออายุไม่เกิน 5 ปี</strong> แนะนำให้ทำประกันชั้น 1 เพื่อความอุ่นใจสูงสุด แต่หาก <strong>รถอายุ 5-10 ปี</strong> 
          หรือใช้งานน้อย การลดระดับมาเป็นประกันชั้น 2+ ก็ถือเป็นทางเลือกที่คุ้มค่า เพราะเบี้ยประกันถูกลงเกือบครึ่ง แต่ยังคุ้มครองกรณีชนกับรถคันอื่น และรถหาย/ไฟไหม้อยู่
        </p>
      </article>
    </div>
  );
}

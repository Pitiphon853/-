import React, { useState } from 'react';
import { Building, Users, Calculator, DollarSign, ShieldCheck } from 'lucide-react';

export default function SocialSecurityM33M39({ lang }: any) {
  const isTH = lang === 'th' || lang === 'TH';

  const [type, setType] = useState<'m33' | 'm39'>('m33');
  const [salary, setSalary] = useState<number | ''>('');
  const [result, setResult] = useState<any>(null);

  const calculateSS = () => {
    if (type === 'm33') {
      const sal = Number(salary) || 0;
      // M33 constraints: min base 1,650, max base 15,000
      let base = sal;
      if (sal < 1650 && sal > 0) base = 1650;
      if (sal > 15000) base = 15000;
      
      const contribution = base * 0.05;
      
      setResult({
        type: 'm33',
        monthly: contribution,
        yearly: contribution * 12,
        employerMonthly: contribution, // Employer pays same amount
        totalMonthly: contribution * 2
      });
    } else {
      // M39 constraints: Fixed base 4,800, rate 9%
      const contribution = 4800 * 0.09; // 432
      setResult({
        type: 'm39',
        monthly: contribution,
        yearly: contribution * 12
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="p-4 bg-orange-50 text-orange-600 rounded-xl">
            <Building className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isTH ? 'คำนวณเงินสมทบประกันสังคม ม.33 / ม.39' : 'Social Security M33 & M39 Calculator'}
            </h1>
            <p className="text-gray-500 mt-1">
              {isTH ? 'คำนวณยอดเงินสมทบรายเดือนและรายปี สำหรับพนักงานประจำและผู้ประกันตนโดยสมัครใจ' : 'Calculate monthly and annual contributions for employees and voluntary insured persons'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                {isTH ? 'เลือกประเภทผู้ประกันตน' : 'Select Insured Type'}
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => { setType('m33'); setResult(null); }}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium border-2 transition-all ${
                    type === 'm33' 
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Building className="w-5 h-5 mx-auto mb-1" />
                  {isTH ? 'มาตรา 33 (พนักงาน)' : 'Section 33 (Employee)'}
                </button>
                <button
                  onClick={() => { setType('m39'); setResult(null); }}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium border-2 transition-all ${
                    type === 'm39' 
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-5 h-5 mx-auto mb-1" />
                  {isTH ? 'มาตรา 39 (สมัครใจ)' : 'Section 39 (Voluntary)'}
                </button>
              </div>
            </div>

            {type === 'm33' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-orange-500" />
                  {isTH ? 'เงินเดือน (บาท)' : 'Monthly Salary (THB)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="15000"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">THB</span>
                </div>
                <p className="text-xs text-gray-500">
                  {isTH ? '*ฐานเงินเดือนสูงสุดที่ใช้คำนวณคือ 15,000 บาท' : '*Maximum base salary for calculation is 15,000 THB'}
                </p>
              </div>
            )}

            <button
              onClick={calculateSS}
              className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors mt-4"
            >
              <Calculator className="w-5 h-5" />
              {isTH ? 'คำนวณเงินสมทบ' : 'Calculate Contribution'}
            </button>
          </div>

          <div>
            {result ? (
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 h-full border border-orange-100 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  {isTH ? 'ผลการคำนวณเงินสมทบ' : 'Contribution Result'}
                </h3>
                
                <div className="space-y-4 flex-grow">
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100 text-center">
                    <p className="text-sm text-gray-500 mb-1">{isTH ? 'คุณต้องจ่ายรายเดือน' : 'You pay monthly'}</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {result.monthly.toLocaleString()} <span className="text-base font-normal text-orange-400">THB/เดือน</span>
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-50">
                    <p className="text-sm text-gray-500 mb-1">{isTH ? 'รวมยอดจ่ายทั้งปี (สำหรับลดหย่อนภาษี)' : 'Total Yearly (For Tax Deduction)'}</p>
                    <p className="text-lg font-semibold text-gray-700">
                      {result.yearly.toLocaleString()} <span className="text-sm font-normal text-gray-400">THB/ปี</span>
                    </p>
                  </div>

                  {result.type === 'm33' && (
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-50 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{isTH ? 'นายจ้างสมทบให้' : 'Employer contributes'}</p>
                        <p className="text-lg font-semibold text-gray-700">
                          {result.employerMonthly.toLocaleString()} <span className="text-sm font-normal text-gray-400">THB/เดือน</span>
                        </p>
                      </div>
                      <ShieldCheck className="w-8 h-8 text-green-500 opacity-50" />
                    </div>
                  )}
                  
                  {result.type === 'm39' && (
                    <div className="bg-amber-100 p-4 rounded-xl border border-amber-200">
                      <p className="text-sm text-amber-800 text-center">
                        {isTH ? 'ส่งเงินสมทบด้วยตนเอง 432 บาท ทุกเดือน เพื่อรักษาสิทธิประกันสังคม' : 'Self-contribution of 432 THB monthly to maintain benefits.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-6 h-full border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
                <Building className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  {isTH ? 'เลือกประเภทและกรอกข้อมูล' : 'Select type and enter details'}
                </h3>
                <p className="text-gray-400 text-sm max-w-[250px]">
                  {isTH ? 'เพื่อคำนวณยอดเงินสมทบที่คุณต้องจ่ายเข้ากองทุนประกันสังคม' : 'To calculate your required social security contributions'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-orange max-w-none text-gray-700 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          คู่มือประกันสังคม มาตรา 33 และ มาตรา 39: สิทธิประโยชน์และอัตราเงินสมทบ
        </h2>
        
        <p>
          <strong>กองทุนประกันสังคม</strong> เป็นกองทุนที่ตั้งขึ้นเพื่อให้ความคุ้มครองแก่ลูกจ้างและผู้ประกันตนในกรณีต่างๆ ทั้งการเจ็บป่วย คลอดบุตร ทุพพลภาพ ตาย สงเคราะห์บุตร ชราภาพ และว่างงาน เพื่อสร้างความมั่นคงในการดำรงชีวิต โดยระบบประกันสังคมในประเทศไทยที่คุ้นเคยกันดีจะแบ่งออกเป็นหลายมาตรา แต่ที่เกี่ยวข้องกับคนทำงานมากที่สุดคือ <strong>มาตรา 33</strong> และ <strong>มาตรา 39</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          ประกันสังคม มาตรา 33 (สำหรับพนักงานประจำ)
        </h3>
        <p>
          ผู้ประกันตนมาตรา 33 คือ ลูกจ้างผู้ซึ่งทำงานให้กับนายจ้างที่อยู่ในสถานประกอบการที่มีลูกจ้างตั้งแต่ 1 คนขึ้นไป (อายุไม่ต่ำกว่า 15 ปีบริบูรณ์ และไม่เกิน 60 ปีบริบูรณ์ในวันเข้าทำงาน) 
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>อัตราเงินสมทบ:</strong> ลูกจ้างจ่าย 5% ของค่าจ้าง นายจ้างจ่ายสมทบอีก 5% และรัฐบาลสมทบ 2.75%</li>
          <li><strong>ฐานการคำนวณ:</strong> คำนวณจากฐานค่าจ้างขั้นต่ำ 1,650 บาท และ <strong>สูงสุดไม่เกิน 15,000 บาท</strong></li>
          <li><strong>ยอดหักรายเดือนสูงสุด:</strong> ดังนั้น ผู้ที่มีเงินเดือน 15,000 บาทขึ้นไป จะถูกหักเงินสมทบสูงสุดที่ <strong>750 บาทต่อเดือน</strong> (15,000 x 5%) หรือ 9,000 บาทต่อปี (ซึ่งสามารถนำไปลดหย่อนภาษีได้เต็มจำนวน)</li>
          <li><strong>สิทธิประโยชน์:</strong> คุ้มครองครบทั้ง 7 กรณี (เจ็บป่วย, คลอดบุตร, ทุพพลภาพ, ตาย, สงเคราะห์บุตร, ชราภาพ และ ว่างงาน)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          ประกันสังคม มาตรา 39 (ผู้ประกันตนโดยสมัครใจ)
        </h3>
        <p>
          ผู้ประกันตนมาตรา 39 คือ บุคคลที่เคยเป็นผู้ประกันตนมาตรา 33 มาก่อน (ส่งเงินสมทบมาแล้วไม่น้อยกว่า 12 เดือน) และได้ออกจากงานไม่เกิน 6 เดือน แต่ยังต้องการรักษาสิทธิประกันสังคมเอาไว้ จึงสมัครใจส่งเงินสมทบด้วยตนเอง
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>อัตราเงินสมทบ:</strong> จ่ายเงินสมทบเองในอัตรา 9% ของฐานค่าจ้างที่ใช้คำนวณ (รัฐบาลสมทบอีก 2.75%)</li>
          <li><strong>ฐานการคำนวณ:</strong> ประกันสังคมกำหนดฐานค่าจ้างมาตรฐานสำหรับมาตรา 39 ไว้ที่ 4,800 บาท ต่อเดือน</li>
          <li><strong>ยอดจ่ายรายเดือน:</strong> ผู้ประกันตนมาตรา 39 จะต้องส่งเงินสมทบ <strong>432 บาทต่อเดือน</strong> (4,800 x 9%) เท่ากันทุกคน</li>
          <li><strong>สิทธิประโยชน์:</strong> คุ้มครอง 6 กรณี ได้แก่ เจ็บป่วย, คลอดบุตร, ทุพพลภาพ, ตาย, สงเคราะห์บุตร และชราภาพ (<em>ไม่คุ้มครองกรณีว่างงาน</em> เพราะถือว่าไม่ได้เป็นลูกจ้างแล้ว)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          ข้อควรรู้เพิ่มเติมเกี่ยวกับการลดหย่อนภาษี
        </h3>
        <p>
          เงินสมทบประกันสังคมที่คุณจ่ายไปในแต่ละปี (ทั้งมาตรา 33 และมาตรา 39) <strong>สามารถนำไปใช้สิทธิหักลดหย่อนภาษีเงินได้บุคคลธรรมดาได้เต็มจำนวนตามที่จ่ายจริง</strong> 
        </p>
        <p>
          หากคุณต้องการทราบยอดรวมเงินสมทบทั้งปี เพื่อเตรียมตัวยื่นภาษี สามารถใช้ <strong>เครื่องมือคำนวณเงินสมทบประกันสังคม</strong> ของเรา เพื่อช่วยคำนวณและสรุปยอดได้อย่างรวดเร็ว ไม่ต้องปวดหัวกับการนั่งคูณตัวเลขเองอีกต่อไป!
        </p>
      </div>
    </div>
  );
}

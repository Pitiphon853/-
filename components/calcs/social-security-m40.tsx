import React, { useState } from 'react';
import { UserCheck, ShieldPlus, Heart, Baby, Coins, AlertCircle } from 'lucide-react';

export default function SocialSecurityM40({ lang }: any) {
  const isTH = lang === 'th' || lang === 'TH';

  const [choice, setChoice] = useState<number>(2); // Default to choice 2
  const [result, setResult] = useState<any>(null);

  const m40Data = [
    {
      id: 1,
      nameTH: 'ทางเลือกที่ 1',
      nameEN: 'Choice 1',
      monthly: 70,
      subsidy: 30,
      benefitsTH: ['เงินทดแทนกรณีเจ็บป่วย', 'เงินทดแทนกรณีทุพพลภาพ', 'ค่าทำศพ (เสียชีวิต)'],
      benefitsEN: ['Sickness Benefit', 'Disability Benefit', 'Death Benefit (Funeral)']
    },
    {
      id: 2,
      nameTH: 'ทางเลือกที่ 2',
      nameEN: 'Choice 2',
      monthly: 100,
      subsidy: 50,
      benefitsTH: ['เงินทดแทนกรณีเจ็บป่วย', 'เงินทดแทนกรณีทุพพลภาพ', 'ค่าทำศพ (เสียชีวิต)', 'บำเหน็จชราภาพ'],
      benefitsEN: ['Sickness Benefit', 'Disability Benefit', 'Death Benefit (Funeral)', 'Old Age Lump Sum']
    },
    {
      id: 3,
      nameTH: 'ทางเลือกที่ 3',
      nameEN: 'Choice 3',
      monthly: 300,
      subsidy: 150,
      benefitsTH: ['เงินทดแทนกรณีเจ็บป่วย', 'เงินทดแทนกรณีทุพพลภาพ', 'ค่าทำศพ (เสียชีวิต)', 'บำเหน็จชราภาพ', 'เงินสงเคราะห์บุตร'],
      benefitsEN: ['Sickness Benefit', 'Disability Benefit', 'Death Benefit (Funeral)', 'Old Age Lump Sum', 'Child Allowance']
    }
  ];

  const calculateM40 = () => {
    const selected = m40Data.find(d => d.id === choice);
    if (selected) {
      setResult({
        ...selected,
        yearly: selected.monthly * 12
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
            <UserCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isTH ? 'คำนวณเงินสมทบประกันสังคม ม.40' : 'Social Security M40 Calculator'}
            </h1>
            <p className="text-gray-500 mt-1">
              {isTH ? 'ตรวจสอบยอดส่งเงินสมทบและสิทธิประโยชน์สำหรับอาชีพอิสระ' : 'Check contributions and benefits for freelance workers'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              {isTH ? 'เลือกรูปแบบการส่งเงินสมทบ' : 'Select Contribution Plan'}
            </h3>
            
            <div className="space-y-4">
              {m40Data.map((plan) => (
                <label 
                  key={plan.id}
                  className={`block cursor-pointer p-4 rounded-xl border-2 transition-all ${
                    choice === plan.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-200 hover:bg-gray-50'
                  }`}
                  onClick={() => { setChoice(plan.id); setResult(null); }}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="m40choice" 
                      className="w-5 h-5 text-purple-600 focus:ring-purple-500" 
                      checked={choice === plan.id}
                      onChange={() => { setChoice(plan.id); setResult(null); }}
                    />
                    <div className="flex-grow flex justify-between items-center">
                      <span className="font-semibold text-gray-800">
                        {isTH ? plan.nameTH : plan.nameEN}
                      </span>
                      <span className="text-lg font-bold text-purple-600">
                        {plan.monthly} {isTH ? 'บาท/เดือน' : 'THB/Mo'}
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={calculateM40}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors mt-6"
            >
              <ShieldPlus className="w-5 h-5" />
              {isTH ? 'ดูสรุปและสิทธิประโยชน์' : 'View Summary & Benefits'}
            </button>
          </div>

          <div>
            {result ? (
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-6 h-full border border-purple-100 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  {isTH ? 'สรุปการสมัครมาตรา 40' : 'M40 Application Summary'}
                </h3>
                
                <div className="space-y-4 flex-grow">
                  <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-purple-100">
                    <div>
                      <p className="text-sm text-gray-500">{isTH ? 'เงินสมทบรายเดือน' : 'Monthly Contribution'}</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {result.monthly} <span className="text-base font-normal text-purple-400">THB</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{isTH ? 'รัฐสมทบให้เพิ่ม' : 'Gov Subsidy'}</p>
                      <p className="text-lg font-semibold text-green-600">
                        +{result.subsidy} <span className="text-sm font-normal text-green-400">THB</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow-sm border border-purple-50">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-pink-500" />
                      {isTH ? 'สิทธิประโยชน์ที่ได้รับ (ความคุ้มครอง)' : 'Benefits Included (Coverage)'}
                    </h4>
                    <ul className="space-y-2">
                      {(isTH ? result.benefitsTH : result.benefitsEN).map((benefit: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                          <div className="mt-1 bg-purple-100 p-1 rounded-full text-purple-600">
                            <ShieldPlus className="w-3 h-3" />
                          </div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-600 p-4 rounded-xl shadow-md text-white text-center">
                    <p className="text-sm text-purple-200 mb-1">{isTH ? 'รวมยอดจ่ายทั้งปี (สำหรับลดหย่อนภาษี)' : 'Total Yearly (For Tax Deduction)'}</p>
                    <p className="text-2xl font-bold">
                      {result.yearly.toLocaleString()} <span className="text-lg font-medium text-purple-300">THB/ปี</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-6 h-full border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
                <ShieldPlus className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  {isTH ? 'เลือกทางเลือกและกดปุ่ม' : 'Select a choice and submit'}
                </h3>
                <p className="text-gray-400 text-sm max-w-[250px]">
                  {isTH ? 'เพื่อดูสรุปสิทธิประโยชน์และความคุ้มครองที่คุณจะได้รับ' : 'To see a summary of benefits and coverage you will receive'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-purple max-w-none text-gray-700 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          คู่มือประกันสังคม มาตรา 40 สำหรับอาชีพอิสระและฟรีแลนซ์: คุ้มครองอะไรบ้าง?
        </h2>
        
        <p>
          ในยุคที่หลายคนผันตัวมาเป็น <strong>ฟรีแลนซ์ พ่อค้าแม่ค้าออนไลน์ ไรเดอร์ หรือผู้ประกอบอาชีพอิสระ</strong> ที่ไม่มีนายจ้างประจำ การสร้างความมั่นคงในชีวิตถือเป็นเรื่องสำคัญมาก <strong>"ประกันสังคม มาตรา 40"</strong> จึงถูกออกแบบมาเพื่อรองรับคนกลุ่มนี้โดยเฉพาะ ให้สามารถเข้าถึงสวัสดิการพื้นฐานจากรัฐบาลได้ ไม่ต่างจากพนักงานประจำ 
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          คุณสมบัติของผู้สมัครมาตรา 40
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>มีสัญชาติไทย (หรือเป็นผู้ถือบัตรประจำตัวคนซึ่งไม่มีสัญชาติไทยตามที่กำหนด)</li>
          <li>อายุไม่ต่ำกว่า 15 ปีบริบูรณ์ และไม่เกิน 65 ปีบริบูรณ์</li>
          <li><strong>ต้องไม่เป็นผู้ประกันตนมาตรา 33 หรือมาตรา 39</strong></li>
          <li>ไม่เป็นข้าราชการหรือบุคคลที่รับบำนาญจากรัฐ</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          3 ทางเลือกของประกันสังคม มาตรา 40
        </h3>
        <p>รัฐบาลได้ออกแบบทางเลือกการส่งเงินสมทบให้เหมาะสมกับกำลังทรัพย์ของแต่ละคน โดยแบ่งเป็น 3 ทางเลือก (ยิ่งจ่ายมาก ยิ่งได้รับความคุ้มครองมาก) ดังนี้:</p>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800">1. ทางเลือกที่ 1 (จ่าย 70 บาท/เดือน)</h4>
            <p className="text-sm mt-1">รัฐสมทบให้ 30 บาท ให้ความคุ้มครอง 3 กรณีพื้นฐาน ได้แก่ <strong>เจ็บป่วย ทุพพลภาพ และเสียชีวิต (ค่าทำศพ)</strong> เหมาะสำหรับผู้ที่มีงบน้อย แต่ต้องการความคุ้มครองพื้นฐานยามฉุกเฉิน</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800">2. ทางเลือกที่ 2 (จ่าย 100 บาท/เดือน)</h4>
            <p className="text-sm mt-1">รัฐสมทบให้ 50 บาท ให้ความคุ้มครองเพิ่มเป็น 4 กรณี ได้แก่ <strong>เจ็บป่วย ทุพพลภาพ เสียชีวิต และได้บำเหน็จชราภาพ</strong> (มีเงินออมสะสมไว้ใช้ตอนแก่ 50 บาท/เดือน) เป็นทางเลือกยอดนิยมที่คุ้มค่า</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800">3. ทางเลือกที่ 3 (จ่าย 300 บาท/เดือน)</h4>
            <p className="text-sm mt-1">รัฐสมทบให้ 150 บาท ให้ความคุ้มครองสูงสุด 5 กรณี ได้แก่ <strong>เจ็บป่วย ทุพพลภาพ เสียชีวิต บำเหน็จชราภาพ (เงินออม 150 บาท/เดือน) และเพิ่มเงินสงเคราะห์บุตร (200 บาท/เดือน/คน)</strong> เหมาะสำหรับผู้ที่มีครอบครัว หรือต้องการเงินเก็บตอนเกษียณที่มากขึ้น</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          ข้อดีของการทำประกันสังคม มาตรา 40
        </h3>
        <p>
          นอกจากคุณจะได้รับเงินชดเชยการขาดรายได้เมื่อต้องนอนโรงพยาบาล ได้รับเงินช่วยเหลือกรณีทุพพลภาพหรือเสียชีวิตแล้ว เงินสมทบที่คุณจ่ายไปในทุกๆ เดือน ยังสามารถ <strong>นำไปลดหย่อนภาษีเงินได้บุคคลธรรมดาตอนปลายปีได้เต็มจำนวนอีกด้วย</strong> ถือเป็นการยิงปืนนัดเดียวได้นกสองตัว ทั้งได้ความคุ้มครองชีวิตและช่วยประหยัดภาษี
        </p>
        <p>
          หากคุณยังลังเลว่าควรเลือกทางเลือกไหนดี สามารถใช้ <strong>โปรแกรมคำนวณและจำลองสิทธิประกันสังคม ม.40</strong> ด้านบน เพื่อเปรียบเทียบความคุ้มค่าและตัดสินใจเลือกแผนที่เหมาะกับตัวคุณที่สุดได้ทันที!
        </p>
      </div>
    </div>
  );
}

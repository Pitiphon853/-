import React, { useState } from 'react';
import { Building2, Calculator, CheckCircle, Leaf, Droplet, Sun, Info } from 'lucide-react';

export default function GreenBuildingScore({ lang }: any) {
  const [sustainableSites, setSustainableSites] = useState<number>(10); // max 26
  const [waterEfficiency, setWaterEfficiency] = useState<number>(5); // max 10
  const [energyAtmosphere, setEnergyAtmosphere] = useState<number>(15); // max 35
  const [materialsResources, setMaterialsResources] = useState<number>(5); // max 14
  const [indoorQuality, setIndoorQuality] = useState<number>(8); // max 15

  const totalScore = sustainableSites + waterEfficiency + energyAtmosphere + materialsResources + indoorQuality;

  let certification = '';
  let bgColor = 'bg-gray-400';
  let badgeColor = 'bg-gray-200 text-gray-800';

  if (totalScore >= 80) {
    certification = 'Platinum';
    bgColor = 'from-slate-400 to-slate-600';
    badgeColor = 'bg-slate-200 text-slate-800';
  } else if (totalScore >= 60) {
    certification = 'Gold';
    bgColor = 'from-yellow-400 to-yellow-600';
    badgeColor = 'bg-yellow-200 text-yellow-800';
  } else if (totalScore >= 50) {
    certification = 'Silver';
    bgColor = 'from-gray-300 to-gray-500';
    badgeColor = 'bg-gray-200 text-gray-800';
  } else if (totalScore >= 40) {
    certification = 'Certified';
    bgColor = 'from-emerald-400 to-emerald-600';
    badgeColor = 'bg-emerald-200 text-emerald-800';
  } else {
    certification = lang === 'EN' ? 'Not Certified' : 'ยังไม่ผ่านเกณฑ์';
    bgColor = 'from-red-400 to-red-600';
    badgeColor = 'bg-red-200 text-red-800';
  }

  const handleInput = (setter: any, max: number, value: string) => {
    let val = parseInt(value, 10);
    if (isNaN(val)) val = 0;
    if (val > max) val = max;
    if (val < 0) val = 0;
    setter(val);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-lime-100 p-3 rounded-full text-lime-600">
          <Building2 size={28} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {lang === 'EN' ? 'Green Building Score Simulator' : 'โปรแกรมจำลองคะแนนอาคารสีเขียว'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5 bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-100">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
              <span className="flex items-center gap-2"><Leaf size={16} className="text-green-600" /> {lang === 'EN' ? 'Sustainable Sites' : 'ความยั่งยืนของสถานที่ตั้ง'}</span>
              <span className="text-gray-500">(Max: 26)</span>
            </label>
            <input
              type="number"
              value={sustainableSites}
              onChange={(e) => handleInput(setSustainableSites, 26, e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
              <span className="flex items-center gap-2"><Droplet size={16} className="text-blue-500" /> {lang === 'EN' ? 'Water Efficiency' : 'ประสิทธิภาพการใช้น้ำ'}</span>
              <span className="text-gray-500">(Max: 10)</span>
            </label>
            <input
              type="number"
              value={waterEfficiency}
              onChange={(e) => handleInput(setWaterEfficiency, 10, e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
              <span className="flex items-center gap-2"><Sun size={16} className="text-orange-500" /> {lang === 'EN' ? 'Energy & Atmosphere' : 'พลังงานและบรรยากาศ'}</span>
              <span className="text-gray-500">(Max: 35)</span>
            </label>
            <input
              type="number"
              value={energyAtmosphere}
              onChange={(e) => handleInput(setEnergyAtmosphere, 35, e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
              <span className="flex items-center gap-2"><Building2 size={16} className="text-amber-700" /> {lang === 'EN' ? 'Materials & Resources' : 'วัสดุและทรัพยากร'}</span>
              <span className="text-gray-500">(Max: 14)</span>
            </label>
            <input
              type="number"
              value={materialsResources}
              onChange={(e) => handleInput(setMaterialsResources, 14, e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-teal-500" /> {lang === 'EN' ? 'Indoor Environmental Quality' : 'คุณภาพสภาพแวดล้อมในอาคาร'}</span>
              <span className="text-gray-500">(Max: 15)</span>
            </label>
            <input
              type="number"
              value={indoorQuality}
              onChange={(e) => handleInput(setIndoorQuality, 15, e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all"
            />
          </div>

        </div>

        <div className="space-y-6">
          <div className={`bg-gradient-to-br ${bgColor} rounded-xl p-6 text-white shadow-md transition-colors duration-500`}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calculator size={24} />
              {lang === 'EN' ? 'Simulated Certification Level' : 'ผลการจำลองระดับการรับรอง'}
            </h2>
            
            <div className="space-y-4">
              <div className="bg-black/20 p-6 rounded-lg flex flex-col justify-center items-center border border-white/20">
                <span className="font-semibold mb-2 text-center text-white/90">
                  {lang === 'EN' ? 'Total Score' : 'คะแนนรวมทั้งหมด'}
                </span>
                <div className="text-6xl font-extrabold text-center">
                  {totalScore} <span className="text-xl font-normal text-white/80">/ 100</span>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <span className={`px-6 py-3 rounded-full text-xl font-bold uppercase tracking-wider ${badgeColor}`}>
                  {certification}
                </span>
              </div>
            </div>
            
            <div className="mt-6 text-xs text-white/80 flex items-start gap-2">
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <p>
                {lang === 'EN'
                  ? 'This tool simulates a simplified 100-point scoring system based on LEED v4 (excluding Innovation and Regional Priority credits for simplicity).'
                  : 'โปรแกรมนี้เป็นการจำลองเกณฑ์คะแนนเบื้องต้น 100 คะแนน อ้างอิงจากหลักเกณฑ์ LEED v4 (ไม่รวมคะแนนหมวดนวัตกรรมและโบนัสภูมิภาคเพื่อความเรียบง่าย)'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-lime max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          มาตรฐานอาคารสีเขียว (Green Building) คืออะไร?
        </h2>
        <p>
          เมื่อพูดถึง "อาคารสีเขียว" หรือ Green Building หลายคนอาจจะนึกถึงอาคารที่มีต้นไม้ปลูกอยู่ตามระเบียงหรือดาดฟ้าเยอะๆ แต่แท้จริงแล้ว อาคารสีเขียวหมายถึงอาคารที่ถูกออกแบบ ก่อสร้าง และบริหารจัดการโดยคำนึงถึง <strong>การใช้ทรัพยากรอย่างมีประสิทธิภาพ และลดผลกระทบเชิงลบต่อสิ่งแวดล้อมและสุขภาพของผู้ใช้อาคาร</strong> ตลอดทั้งวงจรชีวิตของตัวอาคารเอง
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เกณฑ์การประเมินอาคารสีเขียวระดับสากล (LEED)</h3>
        <p>
          ในปัจจุบัน มีมาตรฐานระดับสากลหลายตัวที่ใช้วัดและรับรองความเป็นอาคารสีเขียว ที่เป็นที่นิยมและได้รับการยอมรับมากที่สุดระดับโลกคือ <strong>LEED (Leadership in Energy and Environmental Design)</strong> ซึ่งพัฒนาโดย U.S. Green Building Council (USGBC) ของสหรัฐอเมริกา และในประเทศไทยก็มีมาตรฐานของตนเองที่เรียกว่า <strong>TREES (Thai’s Rating of Energy and Environmental Sustainability)</strong> ซึ่งอ้างอิงหลักการใกล้เคียงกัน
        </p>
        <p>
          เกณฑ์การประเมินหลักๆ (ซึ่งเรานำมาใช้จำลองในโปรแกรมคำนวณด้านบน) จะถูกแบ่งออกเป็นหมวดหมู่หลักๆ เพื่อให้คะแนน ดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ความยั่งยืนของสถานที่ตั้ง (Sustainable Sites):</strong> การเลือกทำเลที่ไม่ทำลายระบบนิเวศเดิม ใกล้ระบบขนส่งสาธารณะเพื่อลดการใช้รถยนต์ส่วนตัว การจัดการพื้นที่สีเขียว และลดปรากฏการณ์เกาะความร้อน (Heat Island Effect)</li>
          <li><strong>ประสิทธิภาพการใช้น้ำ (Water Efficiency):</strong> การออกแบบระบบสุขาภิบาลให้ประหยัดน้ำ การนำน้ำเสียกลับมาบำบัดใช้ใหม่ หรือการรองน้ำฝนมาใช้รดน้ำต้นไม้</li>
          <li><strong>พลังงานและบรรยากาศ (Energy & Atmosphere):</strong> (เป็นหมวดที่มีน้ำหนักคะแนนสูงสุด) การออกแบบอาคารเพื่อประหยัดพลังงาน การใช้แสงธรรมชาติ การกันความร้อน และการใช้พลังงานหมุนเวียน เช่น โซลาร์เซลล์ </li>
          <li><strong>วัสดุและทรัพยากร (Materials & Resources):</strong> การใช้วัสดุก่อสร้างที่เป็นมิตรต่อสิ่งแวดล้อม วัสดุรีไซเคิล วัสดุท้องถิ่นเพื่อลดการขนส่ง รวมถึงการจัดการขยะระหว่างก่อสร้างอย่างถูกวิธี</li>
          <li><strong>คุณภาพสภาพแวดล้อมในอาคาร (Indoor Environmental Quality):</strong> การออกแบบระบบระบายอากาศที่ดี การควบคุมอุณหภูมิและความชื้นที่เหมาะสม การใช้วัสดุที่ไม่มีสารระเหยเป็นพิษ (Low-VOCs) เพื่อให้ผู้อยู่อาศัยมีสุขภาพและคุณภาพชีวิตที่ดี</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ระดับการรับรอง (Certification Levels)</h3>
        <p>
          เมื่อนำคะแนนจากทุกหมวดมารวมกัน อาคารที่ยื่นขอการรับรองจะถูกจัดเกรดตามระดับความสำเร็จ ดังนี้ (จากคะแนนเต็ม 100+ โบนัส):
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Certified (ผ่านการรับรอง):</strong> 40 - 49 คะแนน</li>
          <li><strong>Silver (ระดับเงิน):</strong> 50 - 59 คะแนน</li>
          <li><strong>Gold (ระดับทอง):</strong> 60 - 79 คะแนน</li>
          <li><strong>Platinum (ระดับแพลทินัม):</strong> 80 คะแนนขึ้นไป ซึ่งถือเป็นระดับสูงสุดของอาคารสีเขียว</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมถึงควรลงทุนพัฒนาเป็นอาคารสีเขียว?</h3>
        <p>
          แม้ว่าต้นทุนในการออกแบบและก่อสร้างอาคารสีเขียวอาจจะสูงกว่าอาคารปกติเล็กน้อย (ประมาณ 1-5%) แต่มันคือการลงทุนที่คุ้มค่าในระยะยาว อาคารสีเขียวสามารถลดค่าใช้จ่ายด้านพลังงานได้ถึง 20-30% ลดการใช้น้ำได้ 30-50% นอกจากนี้ การได้รับใบรับรอง (Certification) ยังช่วยเพิ่มมูลค่าทรัพย์สิน ดึงดูดผู้เช่าหรือผู้ซื้อที่ให้ความสำคัญกับ ESG และที่สำคัญที่สุดคือ เป็นการรับผิดชอบต่อโลกและสังคม ช่วยลดการปล่อยก๊าซเรือนกระจกอย่างเป็นรูปธรรม
        </p>
      </div>
    </div>
  );
}

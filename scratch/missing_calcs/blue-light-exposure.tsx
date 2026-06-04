import React, { useState } from 'react';
import { MonitorSmartphone, Smartphone, Laptop, Tv, Eye, AlertCircle, Info, Sun, Moon } from 'lucide-react';

export default function BlueLightExposure({ lang }: { lang: 'TH' | 'EN' }) {
  const [smartphoneHours, setSmartphoneHours] = useState<number>(4);
  const [computerHours, setComputerHours] = useState<number>(6);
  const [tabletHours, setTabletHours] = useState<number>(1);
  const [tvHours, setTvHours] = useState<number>(2);
  const [useFilter, setUseFilter] = useState<boolean>(false);

  const totalHours = smartphoneHours + computerHours + tabletHours + tvHours;
  const effectiveHours = useFilter ? totalHours * 0.7 : totalHours;

  const t = {
    title: lang === 'TH' ? 'คำนวณการสัมผัสแสงสีฟ้า (Blue Light Exposure)' : 'Blue Light Exposure Calculator',
    smartphone: lang === 'TH' ? 'สมาร์ทโฟน (ชั่วโมง/วัน)' : 'Smartphone (hours/day)',
    computer: lang === 'TH' ? 'คอมพิวเตอร์/แล็ปท็อป (ชั่วโมง/วัน)' : 'Computer/Laptop (hours/day)',
    tablet: lang === 'TH' ? 'แท็บเล็ต (ชั่วโมง/วัน)' : 'Tablet (hours/day)',
    tv: lang === 'TH' ? 'โทรทัศน์ (ชั่วโมง/วัน)' : 'TV (hours/day)',
    filter: lang === 'TH' ? 'ใช้แว่นกรองแสง/โหมดถนอมสายตา' : 'Use Blue Light Filter/Glasses',
    results: lang === 'TH' ? 'ผลลัพธ์การสัมผัสแสงสีฟ้าของคุณ' : 'Your Blue Light Exposure Results',
    totalExposure: lang === 'TH' ? 'เวลารวมหน้าจอ' : 'Total Screen Time',
    effectiveExposure: lang === 'TH' ? 'เวลาสัมผัสแสงสีฟ้าสุทธิ' : 'Effective Blue Light Exposure',
    hours: lang === 'TH' ? 'ชั่วโมง/วัน' : 'hours/day',
    riskLevel: lang === 'TH' ? 'ระดับความเสี่ยงต่อดวงตา' : 'Eye Risk Level',
    lowRisk: lang === 'TH' ? 'ต่ำ (ปลอดภัย)' : 'Low (Safe)',
    modRisk: lang === 'TH' ? 'ปานกลาง (ควรพักสายตา)' : 'Moderate (Should rest eyes)',
    highRisk: lang === 'TH' ? 'สูง (เสี่ยงตาล้า/นอนไม่หลับ)' : 'High (Risk of eye strain/insomnia)',
    recommendation: lang === 'TH' ? 'คำแนะนำ' : 'Recommendation',
    recLow: lang === 'TH' ? 'เวลาหน้าจอของคุณอยู่ในเกณฑ์ที่ดีเยี่ยม อย่าลืมพักสายตาเป็นระยะด้วยกฎ 20-20-20' : 'Your screen time is in a great range. Remember to rest your eyes periodically using the 20-20-20 rule.',
    recMod: lang === 'TH' ? 'การใช้งานหน้าจอของคุณอยู่ในระดับปานกลาง ควรพักสายตาทุก 20 นาที และหลีกเลี่ยงการใช้หน้าจอก่อนนอน 1 ชั่วโมง' : 'Your screen usage is moderate. You should rest your eyes every 20 minutes and avoid screens 1 hour before bed.',
    recHigh: lang === 'TH' ? 'คุณมีการใช้งานหน้าจอมากเกินไป! เสี่ยงต่อภาวะตาล้า (Digital Eye Strain) แนะนำให้ลดเวลาหน้าจอที่ไม่จำเป็น หรือใช้แว่นกรองแสงสีฟ้า' : 'You have excessive screen usage! High risk of Digital Eye Strain. Recommended to reduce unnecessary screen time or use blue light blocking glasses.',
  };

  const getRiskLevel = (hours: number) => {
    if (hours < 4) return { text: t.lowRisk, color: 'text-green-600', bg: 'bg-green-100', rec: t.recLow };
    if (hours < 8) return { text: t.modRisk, color: 'text-yellow-600', bg: 'bg-yellow-100', rec: t.recMod };
    return { text: t.highRisk, color: 'text-red-600', bg: 'bg-red-100', rec: t.recHigh };
  };

  const risk = getRiskLevel(effectiveHours);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <MonitorSmartphone className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Smartphone className="w-4 h-4 mr-2 text-gray-500" />
                {t.smartphone}
              </label>
              <input
                type="number"
                min="0"
                max="24"
                value={smartphoneHours}
                onChange={(e) => setSmartphoneHours(Number(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Laptop className="w-4 h-4 mr-2 text-gray-500" />
                {t.computer}
              </label>
              <input
                type="number"
                min="0"
                max="24"
                value={computerHours}
                onChange={(e) => setComputerHours(Number(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MonitorSmartphone className="w-4 h-4 mr-2 text-gray-500" />
                {t.tablet}
              </label>
              <input
                type="number"
                min="0"
                max="24"
                value={tabletHours}
                onChange={(e) => setTabletHours(Number(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Tv className="w-4 h-4 mr-2 text-gray-500" />
                {t.tv}
              </label>
              <input
                type="number"
                min="0"
                max="24"
                value={tvHours}
                onChange={(e) => setTvHours(Number(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg">
              <input
                type="checkbox"
                id="filter"
                checked={useFilter}
                onChange={(e) => setUseFilter(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="filter" className="text-sm font-medium text-gray-700 flex items-center">
                <Eye className="w-4 h-4 mr-2 text-blue-500" />
                {t.filter}
              </label>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
              {t.results}
            </h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600">{t.totalExposure}</span>
                <span className="text-2xl font-bold text-gray-800">{totalHours.toFixed(1)} <span className="text-sm font-normal text-gray-500">{t.hours}</span></span>
              </div>
              
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600">{t.effectiveExposure}</span>
                <span className="text-2xl font-bold text-blue-600">{effectiveHours.toFixed(1)} <span className="text-sm font-normal text-gray-500">{t.hours}</span></span>
              </div>

              <div>
                <span className="block text-gray-600 mb-2">{t.riskLevel}</span>
                <div className={`px-4 py-3 rounded-lg ${risk.bg} ${risk.color} font-semibold text-center flex items-center justify-center`}>
                  {risk.text}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2 text-gray-400" />
                  {t.recommendation}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {risk.rec}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lang === 'TH' && (
        <article className="prose prose-blue max-w-none bg-white rounded-2xl shadow-sm p-6 md:p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
            <Sun className="w-6 h-6 mr-3 text-yellow-500" />
            แสงสีฟ้า (Blue Light) ภัยเงียบจากหน้าจอและการดูแลสายตาในยุคดิจิทัล
          </h2>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            ในยุคที่ทุกอย่างขับเคลื่อนด้วยเทคโนโลยีดิจิทัล เราแทบทุกคนต้องใช้เวลาหลายชั่วโมงต่อวันไปกับการจ้องมองหน้าจอสมาร์ทโฟน คอมพิวเตอร์ แท็บเล็ต หรือโทรทัศน์ ซึ่งหน้าจอเหล่านี้ล้วนเป็นแหล่งกำเนิดของ <strong>"แสงสีฟ้า" (Blue Light)</strong> ที่อาจส่งผลกระทบต่อสุขภาพดวงตาและการนอนหลับของเรามากกว่าที่เราคิด
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">แสงสีฟ้าคืออะไร?</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            แสงสีฟ้า คือ คลื่นแสงที่มีความยาวคลื่นสั้น (ประมาณ 380-500 นาโนเมตร) และมีพลังงานสูง ซึ่งสามารถทะลุทะลวงผ่านกระจกตาและเลนส์ตาเข้าไปถึงจอประสาทตา (Retina) ได้ลึกกว่าแสงสีอื่น แหล่งกำเนิดแสงสีฟ้าที่ใหญ่ที่สุดในธรรมชาติคือดวงอาทิตย์ แต่ในปัจจุบันแหล่งกำเนิดแสงสีฟ้าใกล้ตัวที่ส่งผลกระทบต่อเรามากที่สุดคือ หน้าจออุปกรณ์อิเล็กทรอนิกส์และหลอดไฟ LED
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">ผลกระทบของการสัมผัสแสงสีฟ้ามากเกินไป</h3>
          <ul className="space-y-3 text-gray-600 mb-6">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <div>
                <strong>ภาวะตาล้า (Digital Eye Strain)</strong> การจ้องหน้าจอเป็นเวลานานทำให้กระพริบตาน้อยลง นำไปสู่อาการตาแห้ง ปวดตา แสบตา และตามัว
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <div>
                <strong>รบกวนการนอนหลับ (Circadian Rhythm Disruption)</strong> แสงสีฟ้าจะไปยับยั้งการหลั่งฮอร์โมนเมลาโทนิน (Melatonin) ซึ่งเป็นฮอร์โมนที่ควบคุมการนอนหลับ ทำให้ร่างกายตื่นตัว หลับยาก และคุณภาพการนอนลดลง โดยเฉพาะการเล่นมือถือก่อนนอน
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <div>
                <strong>ความเสี่ยงต่อจอประสาทตา</strong> งานวิจัยบางส่วนชี้ว่าการได้รับแสงสีฟ้าพลังงานสูงเป็นเวลานานๆ อาจเพิ่มความเสี่ยงในการเกิดโรคจอประสาทตาเสื่อม (Macular Degeneration) ได้ในระยะยาว
              </div>
            </li>
          </ul>

          <div className="bg-blue-50 p-6 rounded-xl my-8 border border-blue-100">
            <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              เคล็ดลับถนอมสายตาด้วย "กฎ 20-20-20"
            </h3>
            <p className="text-blue-700 leading-relaxed">
              วิธีพักสายตาที่จักษุแพทย์แนะนำ คือ <strong>ทุกๆ 20 นาที</strong> ที่ทำงานกับหน้าจอ ให้พักสายตาโดยการ <strong>มองออกไปไกลๆ อย่างน้อย 20 ฟุต (ประมาณ 6 เมตร)</strong> เป็นระยะเวลา <strong>อย่างน้อย 20 วินาที</strong> เพื่อให้กล้ามเนื้อตาได้ผ่อนคลายจากการเพ่งมองระยะใกล้
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">วิธีลดผลกระทบจากแสงสีฟ้า</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            แม้เราจะหลีกเลี่ยงการใช้หน้าจอได้ยาก แต่เราสามารถปรับพฤติกรรมเพื่อลดผลกระทบได้ดังนี้:
          </p>
          <ul className="space-y-3 text-gray-600 mb-6">
            <li>1. <strong>เปิดโหมดถนอมสายตา (Night Shift / Eye Comfort)</strong> บนอุปกรณ์ เพื่อลดการปล่อยแสงสีฟ้า โดยเฉพาะในช่วงเย็นและกลางคืน</li>
            <li>2. <strong>สวมแว่นตากรองแสงสีฟ้า</strong> หากต้องทำงานหน้าจอคอมพิวเตอร์เป็นเวลานานติดต่อกันหลายชั่วโมง</li>
            <li>3. <strong>จัดแสงสว่างในห้องให้เหมาะสม</strong> ไม่ควรเล่นมือถือในห้องมืด เพราะรูม่านตาจะขยาย ทำให้รับแสงสีฟ้าเข้าสู่ดวงตามากขึ้น</li>
            <li>4. <strong>งดใช้หน้าจอก่อนนอน 1-2 ชั่วโมง</strong> เพื่อให้ร่างกายเริ่มหลั่งเมลาโทนินตามธรรมชาติ ช่วยให้นอนหลับได้ลึกขึ้น</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-6">
            การใช้เครื่องมือคำนวณการสัมผัสแสงสีฟ้าของเรา จะช่วยให้คุณตระหนักถึงระยะเวลาที่คุณใช้ไปกับหน้าจอต่างๆ ในแต่ละวัน เพื่อเป็นจุดเริ่มต้นในการปรับเปลี่ยนพฤติกรรม และหันมาใส่ใจดูแลสุขภาพดวงตา ซึ่งเป็นอวัยวะที่สำคัญและต้องอยู่กับเราไปตลอดชีวิตให้มากขึ้น
          </p>
        </article>
      )}
    </div>
  );
}

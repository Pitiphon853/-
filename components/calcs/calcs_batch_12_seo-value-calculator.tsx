import React, { useState } from 'react';
import { Search, TrendingUp, DollarSign, MousePointerClick } from 'lucide-react';

export default function SeoValueCalculator({ lang }: any) {
  const [searchVolume, setSearchVolume] = useState<number>(10000);
  const [ctr, setCtr] = useState<number>(3.5);
  const [cpc, setCpc] = useState<number>(1.5);

  const estimatedTraffic = Math.round(searchVolume * (ctr / 100));
  const seoValue = estimatedTraffic * cpc;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {lang === 'TH' ? 'เครื่องมือคำนวณมูลค่า SEO (SEO Value)' : 'SEO Value Calculator'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'TH' ? 'ประเมินมูลค่าของทราฟฟิกออร์แกนิกเปรียบเทียบกับการลงโฆษณา' : 'Estimate organic traffic value compared to paid advertising.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'TH' ? 'ปริมาณการค้นหาต่อเดือน (Search Volume)' : 'Monthly Search Volume'}
            </label>
            <input
              type="number"
              value={searchVolume}
              onChange={(e) => setSearchVolume(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'TH' ? 'อัตราการคลิก (Estimated CTR %)' : 'Estimated CTR (%)'}
            </label>
            <input
              type="number"
              step="0.1"
              value={ctr}
              onChange={(e) => setCtr(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'TH' ? 'ราคาต่อคลิกเฉลี่ย (Average CPC)' : 'Average CPC ($)'}
            </label>
            <input
              type="number"
              step="0.1"
              value={cpc}
              onChange={(e) => setCpc(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-gray-800 p-6 rounded-xl space-y-6">
          <h3 className="text-xl font-semibold text-indigo-900 dark:text-indigo-300 mb-4">
            {lang === 'TH' ? 'ผลลัพธ์การคำนวณ' : 'Calculation Results'}
          </h3>
          
          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <MousePointerClick className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {lang === 'TH' ? 'ทราฟฟิกคาดการณ์ต่อเดือน' : 'Estimated Monthly Traffic'}
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {estimatedTraffic.toLocaleString()} {lang === 'TH' ? 'คลิก' : 'clicks'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {lang === 'TH' ? 'มูลค่า SEO ต่อเดือน (SEO Value)' : 'Monthly SEO Value'}
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${seoValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose dark:prose-invert max-w-none">
        <h2>เครื่องมือคำนวณ SEO Value คืออะไร?</h2>
        <p>SEO Value Calculator คือเครื่องมือที่ช่วยประเมินมูลค่าของทราฟฟิกที่ได้จากการทำ Search Engine Optimization (SEO) หรือการทำให้เว็บไซต์ติดอันดับบนหน้าแรกของ Google โดยไม่เสียค่าโฆษณา การคำนวณนี้ใช้วิธีการเปรียบเทียบว่าหากคุณต้องซื้อทราฟฟิกจำนวนเท่านี้ผ่าน Google Ads (PPC) คุณจะต้องเสียค่าใช้จ่ายเป็นเงินเท่าไหร่ ซึ่งตัวเลขนี้จะช่วยให้คุณเห็นถึงความคุ้มค่าและผลตอบแทนจากการลงทุน (ROI) ในการทำ SEO ได้อย่างชัดเจนมากยิ่งขึ้น</p>

        <h3>ปัจจัยในการคำนวณ SEO Value</h3>
        <ul>
          <li><strong>Search Volume (ปริมาณการค้นหาต่อเดือน):</strong> จำนวนครั้งที่ผู้ใช้งานค้นหาคีย์เวิร์ดเป้าหมายในแต่ละเดือน ยิ่งมีปริมาณการค้นหาสูง โอกาสที่คนจะคลิกเข้ามายังเว็บไซต์ของคุณก็ยิ่งมากขึ้น</li>
          <li><strong>Estimated CTR (อัตราการคลิกคาดการณ์):</strong> อัตราส่วนร้อยละของผู้ที่คลิกเว็บไซต์ของคุณจากจำนวนคนที่เห็นผลลัพธ์การค้นหาทั้งหมด (Impressions) โดยทั่วไปเว็บไซต์ที่อยู่อันดับ 1 จะมี CTR อยู่ที่ประมาณ 25% - 30% อันดับ 2 จะอยู่ที่ 15% และลดหลั่นลงไป</li>
          <li><strong>Average CPC (ราคาต่อคลิกเฉลี่ย):</strong> Cost Per Click หรือราคาต่อ 1 คลิก หากคุณเลือกลงโฆษณาผ่าน Google Ads ในคีย์เวิร์ดนั้นๆ คีย์เวิร์ดที่มีการแข่งขันสูงจะมี CPC สูงตามไปด้วย</li>
        </ul>

        <h3>ทำไม SEO Value ถึงมีความสำคัญต่อธุรกิจ?</h3>
        <p>สำหรับธุรกิจในยุคดิจิทัล การทำ SEO ไม่ใช่แค่การสร้างยอดเข้าชมเว็บไซต์ (Traffic) เท่านั้น แต่คือการสร้างสินทรัพย์ดิจิทัลระยะยาว การคำนวณ SEO Value มีประโยชน์ดังนี้:</p>
        <ol>
          <li><strong>พิสูจน์ความคุ้มค่าของการทำ SEO:</strong> หลายคนมองว่าการทำ SEO ใช้เวลานานและมีค่าใช้จ่ายจ้างผู้เชี่ยวชาญ แต่เมื่อแปลงอันดับให้เป็นมูลค่าเงิน (SEO Value) ผู้บริหารหรือเจ้าของธุรกิจจะเห็นภาพทันทีว่า การที่เว็บไซต์ติดอันดับ ช่วยประหยัดค่าโฆษณาไปได้มหาศาลในแต่ละเดือน</li>
          <li><strong>วางแผนงบประมาณการตลาด:</strong> หากคุณมีคีย์เวิร์ดเป้าหมายที่อยากเจาะตลาด คุณสามารถประเมินได้ว่าการลงงบทำ SEO ให้ติดหน้าแรกเทียบกับการลงโฆษณาไปเรื่อยๆ อย่างไหนจะคุ้มค่ากว่ากันในระยะ 1-3 ปี</li>
          <li><strong>เลือกคีย์เวิร์ดที่มีมูลค่าสูง (High-intent Keywords):</strong> คีย์เวิร์ดบางคำอาจมี Search Volume ไม่สูงมาก แต่มี CPC สูงลิ่ว (เช่น คีย์เวิร์ดที่เกี่ยวกับการเงิน ประกันภัย หรือ B2B Software) การนำคีย์เวิร์ดเหล่านี้มาทำ SEO จะช่วยให้ได้ SEO Value ที่สูงลิ่ว และมีโอกาสเกิด Conversion สูงกว่าคีย์เวิร์ดทั่วไป</li>
        </ol>

        <h3>วิธีเพิ่ม SEO Value ให้กับเว็บไซต์ของคุณ</h3>
        <p>หากคุณต้องการเพิ่มมูลค่า SEO ของคุณให้สูงขึ้น สิ่งที่คุณต้องโฟกัสไม่ได้มีเพียงแค่การเขียนบทความหรือหา Backlink เท่านั้น แต่รวมถึง:</p>
        <ul>
          <li><strong>ปรับปรุง Title และ Meta Description:</strong> แม้เว็บไซต์จะติดหน้าแรก แต่ถ้าไม่มีคนคลิก (CTR ต่ำ) คุณก็จะไม่ได้ทราฟฟิก การเขียนหัวข้อให้น่าสนใจ ดึงดูดสายตา มีผลโดยตรงต่อการเพิ่มทราฟฟิก</li>
          <li><strong>โฟกัสที่ Long-tail Keywords ที่มีคุณภาพ:</strong> คีย์เวิร์ดแบบยาวและเจาะจงมักมีคู่แข่งน้อยกว่า แต่อัตราการแปลง (Conversion Rate) สูงกว่า ซึ่งจะสร้างกำไรให้ธุรกิจได้เป็นกอบเป็นกำแม้ Search Volume อาจจะไม่สูงเท่าคีย์เวิร์ดกว้างๆ</li>
          <li><strong>พัฒนา User Experience (UX) และ Core Web Vitals:</strong> Google ให้ความสำคัญกับเว็บไซต์ที่โหลดเร็ว ใช้งานง่าย และรองรับมือถือ เว็บไซต์ที่ดีจะทำให้อันดับของคุณยั่งยืนและรักษามูลค่า SEO ไว้ได้ในระยะยาว</li>
        </ul>
        <p>สรุปได้ว่า เครื่องมือคำนวณ SEO Value เป็นตัวช่วยสำคัญที่จะเปลี่ยนเป้าหมายทางการตลาดแบบนามธรรมให้กลายเป็นตัวเลขทางการเงินที่จับต้องได้ เพื่อให้ธุรกิจของคุณเติบโตและประหยัดงบประมาณได้อย่างยั่งยืน</p>
      </div>
    </div>
  );
}

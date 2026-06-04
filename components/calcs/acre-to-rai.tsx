import React, { useState } from 'react';
import { Calculator, ArrowRight, Info } from 'lucide-react';

export default function AcreToRai({ lang }: { lang: 'TH' | 'EN' }) {
  const [acres, setAcres] = useState<string>('');

  const calculateRai = (acreValue: number) => {
    // 1 Acre = 4046.8564224 sq meters
    // 1 Rai = 1600 sq meters
    // 1 Ngan = 400 sq meters
    // 1 Sq Wa = 4 sq meters
    const totalSqMeters = acreValue * 4046.8564224;
    const totalRai = Math.floor(totalSqMeters / 1600);
    const remainingAfterRai = totalSqMeters % 1600;
    const totalNgan = Math.floor(remainingAfterRai / 400);
    const remainingAfterNgan = remainingAfterRai % 400;
    const totalSqWa = remainingAfterNgan / 4;

    return { rai: totalRai, ngan: totalNgan, sqWa: totalSqWa, exactRai: totalSqMeters / 1600 };
  };

  const val = parseFloat(acres);
  const result = !isNaN(val) && val >= 0 ? calculateRai(val) : null;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
            <Calculator className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {lang === 'TH' ? 'เครื่องคิดเลขแปลงเอเคอร์เป็นไร่' : 'Acre to Rai Converter'}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {lang === 'TH' ? 'พื้นที่ (เอเคอร์)' : 'Area (Acres)'}
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={acres}
                onChange={(e) => setAcres(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg"
                placeholder="0.00"
              />
            </div>

            <div className="bg-blue-50 text-blue-800 p-4 rounded-lg flex items-start space-x-3 text-sm">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>
                {lang === 'TH' 
                  ? '1 เอเคอร์ (Acre) มีค่าเท่ากับ 4,046.86 ตารางเมตร หรือประมาณ 2.53 ไร่' 
                  : '1 Acre is equivalent to 4,046.86 square meters or approximately 2.53 Rai.'}
              </p>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex flex-col justify-center">
            <h2 className="text-sm font-semibold text-emerald-800 mb-4 uppercase tracking-wider">
              {lang === 'TH' ? 'ผลลัพธ์ (หน่วยไทย)' : 'Result (Thai Units)'}
            </h2>
            
            {result ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-emerald-600">{result.rai}</div>
                    <div className="text-sm text-gray-600">{lang === 'TH' ? 'ไร่' : 'Rai'}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-emerald-600">{result.ngan}</div>
                    <div className="text-sm text-gray-600">{lang === 'TH' ? 'งาน' : 'Ngan'}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-emerald-600">{result.sqWa.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">{lang === 'TH' ? 'ตร.ว.' : 'Sq.Wa'}</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-emerald-200/50">
                  <div className="flex justify-between items-center text-emerald-800 font-medium text-lg">
                    <span>{lang === 'TH' ? 'หรือประมาณ:' : 'Or approx:'}</span>
                    <span>{result.exactRai.toLocaleString(undefined, { maximumFractionDigits: 4 })} {lang === 'TH' ? 'ไร่' : 'Rai'}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-emerald-600/60 py-8">
                <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>{lang === 'TH' ? 'กรุณาระบุพื้นที่เอเคอร์เพื่อคำนวณ' : 'Enter acres to see the result'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100 prose prose-emerald max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          การแปลงหน่วยพื้นที่จาก เอเคอร์ (Acre) เป็น ไร่ (Rai) สำคัญอย่างไร และมีวิธีคำนวณแบบใด?
        </h2>
        
        <p>
          ในยุคปัจจุบันที่การสื่อสารและการลงทุนทางด้านอสังหาริมทรัพย์ขยายตัวไปทั่วโลก การทำความเข้าใจหน่วยวัดพื้นที่ที่แตกต่างกันจึงเป็นเรื่องสำคัญมาก โดยเฉพาะอย่างยิ่งสำหรับประเทศไทยที่มีระบบหน่วยวัดพื้นที่ที่เป็นเอกลักษณ์ของตนเอง นั่นคือ <strong>"ไร่ งาน ตารางวา"</strong> ในขณะที่ชาวต่างชาติ โดยเฉพาะในประเทศแถบตะวันตก นิยมใช้หน่วย <strong>"เอเคอร์" (Acre)</strong> เป็นหลัก 
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำความรู้จักกับ "เอเคอร์" (Acre)</h3>
        <p>
          <strong>เอเคอร์ (Acre)</strong> เป็นหน่วยวัดพื้นที่ในระบบอังกฤษ (Imperial System) และระบบการวัดของสหรัฐอเมริกา (US Customary System) ซึ่งมีการใช้งานอย่างแพร่หลายในสหรัฐอเมริกา สหราชอาณาจักร และประเทศอื่นๆ ในเครือจักรภพ หรือพื้นที่ที่มีประวัติศาสตร์ความเกี่ยวพันกับระบบของอังกฤษ
        </p>
        <p>
          ในอดีต 1 เอเคอร์ถูกกำหนดให้เป็นพื้นที่ที่ผู้ชายหนึ่งคนพร้อมด้วยวัวหนึ่งตัวสามารถไถนาได้ในหนึ่งวัน แต่ในมาตรฐานปัจจุบัน 1 เอเคอร์ ถูกกำหนดให้มีค่าเท่ากับ <strong>43,560 ตารางฟุต</strong> หรือเทียบเป็นตารางเมตรจะได้ประมาณ <strong>4,046.8564 ตารางเมตร</strong> ซึ่งเป็นขนาดที่ค่อนข้างใหญ่และมักใช้ในการระบุพื้นที่ทางการเกษตร ฟาร์ม ป่าไม้ หรือที่ดินเปล่าผืนใหญ่
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">หน่วยวัดพื้นที่ของไทย: ไร่ งาน ตารางวา</h3>
        <p>
          สำหรับประเทศไทย เรามีระบบการวัดที่ดินแบบไทยที่ใช้มาตั้งแต่โบราณและยังคงเป็นหน่วยตามกฎหมายที่ใช้ในโฉนดที่ดินจนถึงปัจจุบัน โดยแบ่งเป็น ไร่ งาน และตารางวา ซึ่งสามารถเทียบกับระบบเมตริก (ตารางเมตร) ได้อย่างลงตัว ดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>1 ตารางวา</strong> = 4 ตารางเมตร</li>
          <li><strong>1 งาน</strong> = 100 ตารางวา (หรือ 400 ตารางเมตร)</li>
          <li><strong>1 ไร่</strong> = 4 งาน (หรือ 400 ตารางวา หรือ 1,600 ตารางเมตร)</li>
        </ul>
        <p>
          จะเห็นได้ว่าระบบการวัดแบบไทยมีความเชื่อมโยงกับตารางเมตรอย่างชัดเจน ทำให้การแปลงหน่วยไปมาระหว่างระบบเมตริกกับระบบไทยเป็นเรื่องที่ทำได้ง่ายและแม่นยำ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีคำนวณและแปลงหน่วย เอเคอร์ เป็น ไร่</h3>
        <p>
          เมื่อเราทราบแล้วว่า 1 เอเคอร์ เท่ากับประมาณ 4,046.86 ตารางเมตร และ 1 ไร่ เท่ากับ 1,600 ตารางเมตร เราก็สามารถหาความสัมพันธ์ระหว่างสองหน่วยนี้ได้โดยการนำตารางเมตรของเอเคอร์มาหารด้วยตารางเมตรของไร่:
        </p>
        <blockquote className="bg-gray-50 border-l-4 border-emerald-500 p-4 my-4 rounded-r-lg font-mono text-sm">
          สูตรคำนวณ: 4,046.8564 ÷ 1,600 = 2.52928525 
        </blockquote>
        <p>
          ดังนั้น <strong>1 เอเคอร์ จะมีค่าเท่ากับ 2.52928525 ไร่</strong> โดยประมาณ หรือหากจะตีเป็นตัวเลขกลมๆ ที่จำง่ายๆ ก็คือ <strong>1 เอเคอร์ ≈ 2.53 ไร่</strong>
        </p>
        <p>
          ในการแปลงหน่วยที่ดินจากเอเคอร์ให้เป็นหน่วย "ไร่-งาน-ตารางวา" อย่างละเอียด เราจะต้องทำการแตกทศนิยมออกมา ตัวอย่างเช่น หากมีที่ดิน 1 เอเคอร์:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>นำ 1 เอเคอร์ แปลงเป็นไร่ ได้ 2.52928525 ไร่</li>
          <li>ส่วนที่เป็นจำนวนเต็มคือ <strong>2 ไร่</strong> (เท่ากับ 3,200 ตารางเมตร)</li>
          <li>เหลือเศษ 0.52928525 ไร่ (ประมาณ 846.86 ตารางเมตร)</li>
          <li>นำเศษที่เหลือแปลงเป็นงาน (846.86 ÷ 400) จะได้ <strong>2 งาน</strong></li>
          <li>เหลือเศษอีกประมาณ 46.86 ตารางเมตร นำมาแปลงเป็นตารางวา (หาร 4) จะได้ประมาณ <strong>11.7 ตารางวา</strong></li>
        </ul>
        <p>สรุปได้ว่า 1 เอเคอร์ มีขนาดเทียบเท่ากับ <strong>2 ไร่ 2 งาน 11.7 ตารางวา</strong></p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมการแปลงหน่วยนี้จึงมีความสำคัญ?</h3>
        <p>
          การทราบวิธีการแปลงหน่วยที่ดินจากเอเคอร์เป็นไร่ มีประโยชน์อย่างมหาศาลในหลายๆ ด้าน:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mb-6">
          <li><strong>ธุรกิจอสังหาริมทรัพย์ระหว่างประเทศ:</strong> ปัจจุบันมีชาวต่างชาติให้ความสนใจในการซื้อหรือเช่าที่ดินในประเทศไทย (ตามกฎหมายที่อนุญาต) การพูดคุยกับลูกค้าชาวต่างชาติมักจะต้องแปลงหน่วยไร่ให้เป็นเอเคอร์ หรือเอเคอร์เป็นไร่ เพื่อให้เขาเข้าใจขนาดที่ดินได้ชัดเจนตามความคุ้นเคย</li>
          <li><strong>การแปลเอกสารและบทความ:</strong> ในการอ่านข่าว บทความ หรือเอกสารทางวิชาการเกี่ยวกับการเกษตร ป่าไม้ หรือข่าวไฟป่าในต่างประเทศ มักรายงานพื้นที่เสียหายเป็น "เอเคอร์" การแปลงกลับมาเป็น "ไร่" จะช่วยให้คนไทยจินตนาการภาพความกว้างใหญ่ของพื้นที่ได้ดีขึ้น</li>
          <li><strong>อุตสาหกรรมการเกษตร:</strong> การเปรียบเทียบผลผลิตต่อพื้นที่ทางการเกษตร เช่น ผลผลิตข้าวต่อเอเคอร์ เทียบกับผลผลิตข้าวต่อไร่ เป็นข้อมูลสำคัญสำหรับนักเศรษฐศาสตร์และนักวิจัยทางการเกษตร เพื่อประเมินประสิทธิภาพการเพาะปลูกในระดับสากล</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สรุป</h3>
        <p>
          ไม่ว่าคุณจะเป็นตัวแทนอสังหาริมทรัพย์ เกษตรกร นักลงทุน หรือเพียงแค่ผู้ที่สนใจศึกษาหาความรู้ การมีความเข้าใจเกี่ยวกับหน่วยวัดพื้นที่ที่แตกต่างกันอย่างเอเคอร์และไร่ พร้อมทั้งทราบหลักการคำนวณเบื้องต้น ถือเป็นทักษะที่มีประโยชน์อย่างยิ่ง เครื่องมือแปลงหน่วยบนเว็บไซต์ของเราถูกออกแบบมาเพื่อช่วยลดความซับซ้อนในการคำนวณ เพียงแค่กรอกตัวเลข คุณก็จะได้ผลลัพธ์ที่แม่นยำออกมาเป็นไร่ งาน และตารางวาในทันที ประหยัดเวลาและลดข้อผิดพลาดในการคำนวณด้วยตนเอง
        </p>
      </article>
    </div>
  );
}

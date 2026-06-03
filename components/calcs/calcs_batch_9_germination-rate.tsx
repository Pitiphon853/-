import React, { useState } from 'react';
import { Sprout, Calculator, RotateCcw, Info, Percent } from 'lucide-react';

export default function GerminationRate({ lang }: { lang: 'TH' | 'EN' }) {
  const [planted, setPlanted] = useState<number | ''>(100);
  const [germinated, setGerminated] = useState<number | ''>(85);

  const t = {
    title: lang === 'TH' ? 'คำนวณอัตราการงอกของเมล็ดพันธุ์' : 'Germination Rate Calculator',
    planted: lang === 'TH' ? 'จำนวนเมล็ดที่เพาะทั้งหมด' : 'Total Seeds Planted',
    germinated: lang === 'TH' ? 'จำนวนเมล็ดที่งอก' : 'Seeds Germinated',
    calculate: lang === 'TH' ? 'คำนวณ' : 'Calculate',
    reset: lang === 'TH' ? 'เริ่มใหม่' : 'Reset',
    result: lang === 'TH' ? 'อัตราการงอก' : 'Germination Rate',
    status: lang === 'TH' ? 'สถานะคุณภาพ' : 'Quality Status',
    excellent: lang === 'TH' ? 'ดีเยี่ยม' : 'Excellent',
    good: lang === 'TH' ? 'ดี' : 'Good',
    fair: lang === 'TH' ? 'พอใช้' : 'Fair',
    poor: lang === 'TH' ? 'ควรปรับปรุง' : 'Poor',
    error: lang === 'TH' ? 'จำนวนเมล็ดที่งอกต้องไม่เกินเมล็ดที่เพาะ' : 'Germinated seeds cannot exceed planted seeds'
  };

  const rate = planted && germinated ? (Number(germinated) / Number(planted)) * 100 : 0;
  
  let status = '';
  let statusColor = '';
  if (rate >= 80) {
    status = t.excellent;
    statusColor = 'text-green-600';
  } else if (rate >= 60) {
    status = t.good;
    statusColor = 'text-blue-600';
  } else if (rate >= 40) {
    status = t.fair;
    statusColor = 'text-yellow-600';
  } else {
    status = t.poor;
    statusColor = 'text-red-600';
  }

  const isError = Number(germinated) > Number(planted);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-100 rounded-lg">
            <Sprout className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.planted}
              </label>
              <input
                type="number"
                value={planted}
                onChange={(e) => setPlanted(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                min="1"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.germinated}
              </label>
              <input
                type="number"
                value={germinated}
                onChange={(e) => setGerminated(e.target.value ? Number(e.target.value) : '')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${isError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'}`}
                min="0"
                placeholder="85"
              />
              {isError && (
                <p className="mt-1 text-sm text-red-500">{t.error}</p>
              )}
            </div>

            <button
              onClick={() => {
                setPlanted(100);
                setGerminated(85);
              }}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t.reset}
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 flex flex-col justify-center items-center text-center space-y-4 border border-gray-100">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-2">
              <Percent className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{t.result}</p>
              <p className="text-5xl font-bold text-gray-800">
                {!isError && planted && germinated ? rate.toFixed(1) : '0.0'}%
              </p>
            </div>
            {!isError && rate > 0 && (
              <div className="pt-4 border-t border-gray-200 w-full">
                <p className="text-gray-500 text-sm mb-1">{t.status}</p>
                <p className={`text-xl font-bold ${statusColor}`}>{status}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose prose-green max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {lang === 'TH' ? 'อัตราการงอกของเมล็ดพันธุ์: ความสำคัญและวิธีคำนวณสำหรับเกษตรกร' : 'Seed Germination Rate: Importance and Calculation for Farmers'}
        </h2>
        
        {lang === 'TH' ? (
          <>
            <p>
              <strong>อัตราการงอกของเมล็ดพันธุ์ (Germination Rate)</strong> เป็นหนึ่งในตัวชี้วัดที่สำคัญที่สุดสำหรับเกษตรกรและผู้เพาะปลูกทุกคน ก่อนที่จะลงมือปลูกพืชลงในแปลงจริง การทราบอัตราการงอกจะช่วยให้สามารถวางแผนปริมาณเมล็ดพันธุ์ที่ต้องใช้ได้อย่างแม่นยำ ประหยัดต้นทุน และหลีกเลี่ยงปัญหาจำนวนต้นกล้าไม่เพียงพอต่อพื้นที่เพาะปลูก
            </p>

            <h3>ทำไมต้องทดสอบอัตราการงอก?</h3>
            <ul>
              <li><strong>ประเมินคุณภาพเมล็ดพันธุ์:</strong> เมล็ดพันธุ์ที่เก็บไว้นาน หรือเก็บในสภาพแวดล้อมที่ไม่เหมาะสม อาจมีความมีชีวิต (Viability) ลดลง การทดสอบจะบอกได้ว่าเมล็ดเหล่านั้นยังมีคุณภาพดีหรือไม่</li>
              <li><strong>คำนวณปริมาณที่ต้องใช้:</strong> หากอัตราการงอกต่ำ เกษตรกรจำเป็นต้องเผื่อปริมาณเมล็ดพันธุ์ให้มากขึ้น เพื่อให้ได้จำนวนต้นตามที่ตั้งเป้าไว้</li>
              <li><strong>ประหยัดเวลาและแรงงาน:</strong> การรู้ล่วงหน้าช่วยป้องกันปัญหาการต้องมาปลูกซ่อมทีหลัง ซึ่งทำให้ต้นพืชโตไม่พร้อมกันและจัดการยาก</li>
            </ul>

            <h3>วิธีการทดสอบการงอกแบบง่ายๆ</h3>
            <p>
              การทดสอบสามารถทำได้โดยไม่ต้องใช้อุปกรณ์พิเศษ วิธีที่นิยมที่สุดคือ <strong>Topographical Tetrazolium Test</strong> หรือวิธีเพาะในกระดาษเพาะ (Paper Towel Method)
            </p>
            <ol>
              <li>สุ่มนับเมล็ดพันธุ์จำนวน 100 เมล็ด (เพื่อให้คิดเป็นเปอร์เซ็นต์ได้ง่าย)</li>
              <li>นำกระดาษทิชชู่แผ่นหนาพรมน้ำให้ชุ่มแต่น้ำไม่หยด</li>
              <li>วางเมล็ดพันธุ์ที่เตรียมไว้ลงบนกระดาษ โดยเว้นระยะห่างให้พอดี</li>
              <li>ม้วนหรือพับกระดาษ แล้วใส่ในถุงพลาสติกหรือกล่องพลาสติกเพื่อรักษาความชื้น</li>
              <li>เก็บในที่ร่ม อุณหภูมิเหมาะสมสำหรับพืชชนิดนั้นๆ ทิ้งไว้ประมาณ 3-7 วัน (ขึ้นอยู่กับชนิดพืช)</li>
              <li>เปิดนับจำนวนเมล็ดที่งอกรากและยอดออกมาอย่างสมบูรณ์</li>
            </ol>

            <h3>สูตรคำนวณอัตราการงอก</h3>
            <p>
              การคำนวณสามารถทำได้ด้วยสมการง่ายๆ ดังนี้:<br />
              <strong>อัตราการงอก (%) = (จำนวนเมล็ดที่งอกปกติ / จำนวนเมล็ดที่เพาะทั้งหมด) × 100</strong>
            </p>
            <p>
              เช่น หากเพาะเมล็ดไป 200 เมล็ด และงอกเป็นต้นกล้าที่แข็งแรง 160 เมล็ด<br />
              อัตราการงอก = (160 / 200) × 100 = 80%
            </p>

            <h3>เกณฑ์การประเมินคุณภาพ</h3>
            <ul>
              <li><strong>80% ขึ้นไป:</strong> คุณภาพดีเยี่ยม เหมาะสำหรับการเพาะปลูกทั่วไป</li>
              <li><strong>60% - 79%:</strong> คุณภาพปานกลาง อาจต้องเพิ่มอัตราการใช้เมล็ดพันธุ์ต่อไร่</li>
              <li><strong>ต่ำกว่า 60%:</strong> คุณภาพต่ำ ควรพิจารณาซื้อเมล็ดพันธุ์ใหม่ หรือเพาะกล้าในถาดก่อนลงแปลงเพื่อคัดต้นที่แข็งแรง</li>
            </ul>

            <p>
              ด้วยเครื่องมือคำนวณอัตราการงอก (Germination Rate Calculator) ของเรา คุณสามารถกรอกตัวเลขเพื่อทราบผลลัพธ์พร้อมคำแนะนำได้อย่างรวดเร็ว ช่วยให้การจัดการแปลงเกษตรของคุณมีประสิทธิภาพและเป็นมืออาชีพมากยิ่งขึ้น
            </p>
          </>
        ) : (
          <>
            <p>
              The <strong>Germination Rate</strong> is one of the most critical metrics for farmers, gardeners, and commercial growers. Before committing resources to field planting, knowing the germination rate of a seed batch allows for precise planning of seed requirements, cost optimization, and avoids the problem of suboptimal plant populations.
            </p>

            <h3>Why Test Seed Germination?</h3>
            <ul>
              <li><strong>Assess Seed Quality:</strong> Seeds stored for long periods or under improper conditions can lose their viability. Testing reveals if the seeds are still vigorous.</li>
              <li><strong>Calculate Sowing Rates:</strong> If the germination rate is lower than optimal, growers must increase the seeding rate to achieve the desired plant density per acre or hectare.</li>
              <li><strong>Save Time and Labor:</strong> Knowing the rate in advance prevents the need for costly replanting, which can lead to uneven crop growth and complicated harvest logistics.</li>
            </ul>

            <h3>A Simple At-Home Germination Test</h3>
            <p>
              Testing seed viability doesn't require a laboratory. The most common at-home method is the Paper Towel Test:
            </p>
            <ol>
              <li>Randomly select exactly 100 seeds from your batch (this makes calculating percentages effortless).</li>
              <li>Moisten a thick paper towel so it is damp but not dripping wet.</li>
              <li>Place the seeds on the towel, spacing them evenly.</li>
              <li>Fold or roll the towel and place it inside a plastic bag or container to retain moisture.</li>
              <li>Store in a warm, dark place (or as required by the specific plant species) for 3 to 14 days.</li>
              <li>Count the number of seeds that have developed a healthy radicle (root) and shoot.</li>
            </ol>

            <h3>The Germination Rate Formula</h3>
            <p>
              The calculation uses a straightforward equation:<br />
              <strong>Germination Rate (%) = (Number of Germinated Seeds / Total Number of Seeds Tested) × 100</strong>
            </p>
            <p>
              For example, if you tested 200 seeds and 160 successfully germinated:<br />
              Germination Rate = (160 / 200) × 100 = 80%
            </p>

            <h3>Evaluating Your Results</h3>
            <ul>
              <li><strong>80% and above:</strong> Excellent quality. Ideal for direct field sowing.</li>
              <li><strong>60% - 79%:</strong> Moderate quality. You will need to increase your seeding rate to compensate for the unviable seeds.</li>
              <li><strong>Below 60%:</strong> Poor quality. It is usually recommended to purchase new seeds, or start them in trays where you can select only the strong seedlings for transplanting.</li>
            </ul>

            <p>
              Use our interactive Germination Rate Calculator to instantly find out the viability of your seeds. Just enter the total seeds tested and the number that sprouted, and let our tool help you make informed agricultural decisions.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

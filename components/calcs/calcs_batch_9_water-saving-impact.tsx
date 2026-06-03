import React, { useState } from 'react';
import { Droplets, Bath, Calculator, RotateCcw, Droplet, CheckCircle2 } from 'lucide-react';

export default function WaterSavingImpact({ lang }: { lang: 'TH' | 'EN' }) {
  const [reducedShowerMins, setReducedShowerMins] = useState<number | ''>(5);
  const [tapOffBrushingDays, setTapOffBrushingDays] = useState<number | ''>(30); // days per month
  const [familyMembers, setFamilyMembers] = useState<number | ''>(3);
  const [waterRate, setWaterRate] = useState<number | ''>(15); // Baht per cubic meter (1000L)

  const t = {
    title: lang === 'TH' ? 'คำนวณการประหยัดน้ำจากพฤติกรรม' : 'Water Saving Impact Calculator',
    shower: lang === 'TH' ? 'ลดเวลาอาบน้ำฝักบัวลง (นาที/ครั้ง)' : 'Reduce shower time by (mins/shower)',
    brushing: lang === 'TH' ? 'ปิดน้ำขณะแปรงฟัน (วัน/เดือน)' : 'Turn off tap while brushing (days/month)',
    family: lang === 'TH' ? 'จำนวนสมาชิกในบ้าน (คน)' : 'Number of family members',
    rate: lang === 'TH' ? 'ค่าน้ำประปา (บาท/ลูกบาศก์เมตร)' : 'Water rate (per cubic meter/1000L)',
    calculate: lang === 'TH' ? 'คำนวณ' : 'Calculate',
    reset: lang === 'TH' ? 'เริ่มใหม่' : 'Reset',
    waterSaved: lang === 'TH' ? 'ปริมาณน้ำที่ประหยัดได้ต่อเดือน' : 'Water Saved per Month',
    moneySaved: lang === 'TH' ? 'เงินที่ประหยัดได้ต่อเดือน' : 'Money Saved per Month',
    moneyYear: lang === 'TH' ? 'ประหยัดได้ต่อปี' : 'Saved per Year',
    liters: lang === 'TH' ? 'ลิตร' : 'Liters',
    currency: lang === 'TH' ? 'บาท' : 'Unit',
  };

  // Standard assumptions
  // Shower head uses ~9 liters per minute
  // Leaving tap on while brushing uses ~6 liters per minute (2 mins brushing twice a day = 24 liters/day)
  
  const calculateSavings = () => {
    const members = Number(familyMembers) || 0;
    const showerMins = Number(reducedShowerMins) || 0;
    const brushDays = Number(tapOffBrushingDays) || 0;
    const rate = Number(waterRate) || 0;

    // Daily savings per person
    const showerSavingsLitersPerDay = showerMins * 9;
    const monthlyShowerSavings = showerSavingsLitersPerDay * 30 * members;

    const dailyBrushSavingsLiters = 24; // 2 mins * 2 times * 6L
    const monthlyBrushSavings = dailyBrushSavingsLiters * brushDays * members;

    const totalLitersMonthly = monthlyShowerSavings + monthlyBrushSavings;
    const totalCubicMetersMonthly = totalLitersMonthly / 1000;
    const monthlyMoneySaved = totalCubicMetersMonthly * rate;

    return { totalLitersMonthly, monthlyMoneySaved };
  };

  const { totalLitersMonthly, monthlyMoneySaved } = calculateSavings();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-cyan-100 rounded-lg">
            <Droplets className="w-6 h-6 text-cyan-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.family}
              </label>
              <input
                type="number"
                value={familyMembers}
                onChange={(e) => setFamilyMembers(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                min="1"
                placeholder="3"
              />
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.shower}
                </label>
                <input
                  type="number"
                  value={reducedShowerMins}
                  onChange={(e) => setReducedShowerMins(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.brushing}
                </label>
                <input
                  type="number"
                  value={tapOffBrushingDays}
                  onChange={(e) => setTapOffBrushingDays(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  min="0"
                  max="31"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.rate}
              </label>
              <input
                type="number"
                value={waterRate}
                onChange={(e) => setWaterRate(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                min="0"
              />
            </div>

            <button
              onClick={() => {
                setFamilyMembers(3);
                setReducedShowerMins(5);
                setTapOffBrushingDays(30);
                setWaterRate(15);
              }}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t.reset}
            </button>
          </div>

          <div className="bg-cyan-50 rounded-xl p-6 flex flex-col justify-center items-center text-center space-y-6 border border-cyan-100">
            <div className="w-full">
              <p className="text-cyan-800 text-sm font-medium mb-2">{t.waterSaved}</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-blue-600">
                  {totalLitersMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </span>
                <span className="text-lg text-blue-700 font-medium">{t.liters}</span>
              </div>
            </div>
            
            {totalLitersMonthly > 0 && (
              <div className="w-full pt-4 border-t border-cyan-200/60 flex flex-col gap-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{t.moneySaved}</p>
                  <p className="text-2xl font-bold text-green-600">
                    {monthlyMoneySaved.toLocaleString('en-US', { maximumFractionDigits: 2 })} {t.currency}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs mb-1">{t.moneyYear}</p>
                  <p className="text-lg font-semibold text-green-700">
                    {(monthlyMoneySaved * 12).toLocaleString('en-US', { maximumFractionDigits: 2 })} {t.currency}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose prose-cyan max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {lang === 'TH' ? 'เปลี่ยนพฤติกรรมเล็กน้อย เซฟน้ำได้มหาศาล (และเซฟเงินในกระเป๋าด้วย!)' : 'Small Habits, Massive Water Savings (And More Money in Your Pocket!)'}
        </h2>
        
        {lang === 'TH' ? (
          <>
            <p>
              "น้ำคือชีวิต" เป็นคำกล่าวที่ไม่เกินจริง แต่ในขณะที่โลกกำลังเผชิญกับวิกฤตภัยแล้งและการขาดแคลนน้ำจืด หลายคนอาจคิดว่าการประหยัดน้ำเป็นเรื่องยากและต้องลงทุนซื้ออุปกรณ์ราคาแพง ทั้งที่ความจริงแล้ว <strong>"การเปลี่ยนพฤติกรรมในชีวิตประจำวัน"</strong> เพียงเล็กน้อย สามารถสร้างผลลัพธ์ที่ยิ่งใหญ่ได้อย่างไม่น่าเชื่อ
            </p>

            <h3>สถิติการใช้น้ำที่คุณอาจไม่เคยรู้</h3>
            <p>
              กิจกรรมในห้องน้ำถือเป็นแหล่งผลาญน้ำอันดับต้นๆ ของบ้าน ลองมาดูตัวเลขที่ซ่อนอยู่ในกิจวัตรประจำวันของคุณ:
            </p>
            <ul>
              <li><strong>ฝักบัวอาบน้ำ (Shower):</strong> ฝักบัวมาตรฐานทั่วไป ปล่อยน้ำประมาณ <strong>9 ถึง 12 ลิตรต่อนาที</strong> หากคุณชอบยืนอาบน้ำเพลินๆ ร้องเพลงสัก 2 เพลง (ประมาณ 10 นาที) คุณจะใช้น้ำไปเกือบ 100 ลิตร!</li>
              <li><strong>การแปรงฟัน (Brushing Teeth):</strong> ทันตแพทย์แนะนำให้แปรงฟันครั้งละ 2 นาที หากคุณเปิดก๊อกน้ำทิ้งไว้ตลอด ก๊อกน้ำอ่างล้างหน้าจะปล่อยน้ำประมาณ <strong>6 ลิตรต่อนาที</strong> เท่ากับว่าน้ำสะอาด 24 ลิตรต่อวัน (เช้า-เย็น) จะไหลทิ้งลงท่อไปโดยเปล่าประโยชน์</li>
            </ul>

            <h3>แค่ "ลด" และ "ปิด" สร้างการเปลี่ยนแปลงได้อย่างไร?</h3>
            <p>
              เครื่องมือ <em>คำนวณการประหยัดน้ำ (Water Saving Impact)</em> ของเรา ใช้สมมติฐานทางคณิตศาสตร์ง่ายๆ แต่ให้ภาพที่ชัดเจน:
            </p>
            <ol>
              <li><strong>ลดเวลาอาบน้ำลง 5 นาที:</strong> คุณจะประหยัดน้ำได้ถึง 45 ลิตรต่อการอาบ 1 ครั้ง หากบ้านคุณมีสมาชิก 3 คน จะช่วยประหยัดน้ำได้มากกว่า 4,000 ลิตรต่อเดือน!</li>
              <li><strong>ปิดก๊อกขณะแปรงฟัน:</strong> เพียงแค่คุณรองน้ำใส่แก้ว หรือเปิดก๊อกเฉพาะตอนบ้วนปาก บ้านที่มี 3 คน จะประหยัดน้ำได้อีกกว่า 2,100 ลิตรต่อเดือน</li>
            </ol>
            <p>
              รวมๆ แล้ว ครอบครัวเล็กๆ สามารถรักษาน้ำจืดให้โลกได้ถึง <strong>6,000 ลิตร (6 ลูกบาศก์เมตร) ต่อเดือน</strong> ซึ่งตัวเลขนี้ไม่เพียงแต่ช่วยอนุรักษ์สิ่งแวดล้อม แต่ยังสะท้อนกลับมาเป็น "ค่าน้ำประปาที่ลดลง" อย่างเห็นได้ชัดในทุกๆ บิลสิ้นเดือน
            </p>

            <h3>เริ่มต้นวันนี้ เพื่อความยั่งยืน</h3>
            <p>
              นอกจากการลดเวลาอาบน้ำและปิดก๊อกตอนแปรงฟันแล้ว การเปลี่ยนไปใช้ฝักบัวแบบประหยัดน้ำ (Low-flow showerhead) การนำน้ำล้างผักไปรดน้ำต้นไม้ และการซ่อมแซมก๊อกน้ำที่รั่วซึมทันที ล้วนเป็นจิ๊กซอว์ชิ้นสำคัญที่จะช่วยให้โลกใบนี้มีน้ำสะอาดใช้อย่างเพียงพอไปจนถึงรุ่นลูกหลาน
            </p>
          </>
        ) : (
          <>
            <p>
              "Water is life" is not an exaggeration. As the world increasingly grapples with droughts and freshwater scarcity, many believe that conserving water requires expensive plumbing retrofits or smart home gadgets. The reality is that <strong>small behavioral changes in our daily routines</strong> can yield incredibly massive impacts.
            </p>

            <h3>The Hidden Statistics in Your Bathroom</h3>
            <p>
              The bathroom is the primary culprit for indoor water consumption. Let's look at the numbers flowing down your drain:
            </p>
            <ul>
              <li><strong>The Shower:</strong> A standard showerhead dispenses about <strong>9 to 12 liters of water every minute</strong>. If you enjoy a long, relaxing 10-minute shower, you are easily washing almost 100 liters of perfectly clean, treated water down the drain!</li>
              <li><strong>Brushing Your Teeth:</strong> Dentists recommend brushing for two minutes. A standard bathroom faucet flows at about <strong>6 liters per minute</strong>. If you leave the tap running while brushing twice a day, that's 24 liters of water wasted per person, every single day.</li>
            </ul>

            <h3>How Do "Reducing" and "Turning Off" Make a Difference?</h3>
            <p>
              Our <em>Water Saving Impact Calculator</em> uses straightforward math to illustrate a powerful point:
            </p>
            <ol>
              <li><strong>Cut 5 minutes from your shower:</strong> You instantly save 45 liters per shower. In a household of 3 people, that simple act saves over 4,000 liters of water every month!</li>
              <li><strong>Turn off the tap while brushing:</strong> By simply wetting your brush and using a cup to rinse, a family of 3 avoids wasting another 2,100 liters monthly.</li>
            </ol>
            <p>
              Combined, a small family can conserve over <strong>6,000 liters (6 cubic meters) of freshwater per month</strong>. This doesn't just relieve stress on municipal water treatment plants and local reservoirs; it also directly translates into noticeable savings on your monthly utility bill.
            </p>

            <h3>Start Today for a Sustainable Tomorrow</h3>
            <p>
              Beyond taking shorter showers and being mindful of the faucet, installing low-flow aerators, repurposing water used for washing vegetables to hydrate your garden, and promptly fixing leaky plumbing are all vital pieces of the puzzle. Every drop saved today secures a sustainable water future for generations to come.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

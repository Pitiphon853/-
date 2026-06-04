import React, { useState } from 'react';
import { Sun, Battery, Zap, DollarSign, Clock, Info } from 'lucide-react';

export default function OnGridSolarPayback({ lang = 'TH' }: any) {
  const [capacity, setCapacity] = useState<number>(5); // kW
  const [cost, setCost] = useState<number>(150000); // Baht
  const [sunlightHours, setSunlightHours] = useState<number>(4.5); // hours/day
  const [elecRate, setElecRate] = useState<number>(4.5); // Baht/kWh
  const [selfConsumption, setSelfConsumption] = useState<number>(80); // %
  const [sellRate, setSellRate] = useState<number>(2.2); // Baht/kWh

  // Calculate daily generation
  const dailyGen = capacity * sunlightHours; // kWh/day
  
  // Calculate daily savings
  const selfUseRatio = selfConsumption / 100;
  const sellRatio = 1 - selfUseRatio;
  const dailySavingSelf = dailyGen * selfUseRatio * elecRate;
  const dailySavingSell = dailyGen * sellRatio * sellRate;
  const dailyTotalSaving = dailySavingSelf + dailySavingSell;

  // Calculate monthly & yearly savings
  const monthlySaving = dailyTotalSaving * 30;
  const yearlySaving = dailyTotalSaving * 365;

  // Calculate payback period
  const paybackYears = cost / yearlySaving;

  const t = {
    TH: {
      title: "คำนวณจุดคุ้มทุนแผงโซลาร์ออนกริด",
      systemCapacity: "ขนาดระบบติดตั้ง (กิโลวัตต์ - kW)",
      installCost: "ค่าติดตั้งรวมทั้งหมด (บาท)",
      sunlightHours: "ชั่วโมงแดดเฉลี่ยต่อวัน (ชั่วโมง)",
      elecRate: "ค่าไฟหน่วยละ (บาท/kWh)",
      selfConsumption: "สัดส่วนการใช้ไฟตอนกลางวัน (%)",
      sellRate: "ราคารับซื้อไฟคืน (บาท/kWh) *ถ้ามี",
      results: "ผลการคำนวณ",
      dailyGen: "ผลิตไฟได้ต่อวัน",
      monthlySaving: "ประหยัดเงินต่อเดือน",
      yearlySaving: "ประหยัดเงินต่อปี",
      paybackPeriod: "ระยะเวลาคืนทุน",
      years: "ปี",
      months: "เดือน",
      kwh: "หน่วย (kWh)",
      baht: "บาท",
      infoSelfUse: "การใช้ไฟเอง",
      infoSell: "การขายไฟ",
      seoTitle: "คำนวณจุดคุ้มทุนแผงโซลาร์ออนกริด - โซลาร์เซลล์ คุ้มไหม?",
      seoH2_1: "ติดตั้งโซลาร์เซลล์ออนกริด คุ้มค่าแค่ไหน?",
      seoP_1: "ในยุคที่ค่าไฟปรับตัวสูงขึ้นอย่างต่อเนื่อง การติดตั้งระบบโซลาร์เซลล์ (Solar Rooftop) เพื่อผลิตไฟฟ้าใช้เองกลายเป็นทางเลือกที่ได้รับความนิยมมากที่สุด โดยเฉพาะระบบ 'ออนกริด (On-Grid)' ซึ่งเป็นการเชื่อมต่อระบบโซลาร์เซลล์เข้ากับการไฟฟ้า ช่วยให้เราประหยัดค่าไฟในตอนกลางวันได้อย่างเห็นผล และยังสามารถขายไฟส่วนเกินคืนให้กับการไฟฟ้าได้ในกรณีที่เข้าร่วมโครงการโซลาร์ภาคประชาชน เครื่องมือคำนวณนี้ออกแบบมาเพื่อช่วยให้คุณวิเคราะห์จุดคุ้มทุนเบื้องต้นว่า หากลงทุนติดตั้งโซลาร์เซลล์ด้วยงบประมาณเท่านี้ จะสามารถคืนทุนได้ในระยะเวลาประมาณกี่ปี",
      seoH2_2: "ระบบโซลาร์เซลล์ ออนกริด (On-Grid) คืออะไร?",
      seoP_2: "ระบบโซลาร์เซลล์ออนกริด คือ ระบบที่มีการเชื่อมโยงกับระบบจำหน่ายไฟของการไฟฟ้านครหลวง (กฟน.) หรือ การไฟฟ้าส่วนภูมิภาค (กฟภ.) อุปกรณ์สำคัญในระบบนี้ประกอบด้วยแผงโซลาร์เซลล์และอินเวอร์เตอร์ (Inverter) ที่ทำหน้าที่แปลงกระแสไฟฟ้าตรง (DC) เป็นกระแสไฟฟ้าสลับ (AC) เพื่อจ่ายให้กับเครื่องใช้ไฟฟ้าภายในบ้าน ข้อดีของระบบนี้คือไม่มีการใช้แบตเตอรี่ ทำให้ประหยัดค่าใช้จ่ายในการติดตั้งและบำรุงรักษา หากไฟจากโซลาร์เซลล์ไม่พอ ระบบจะดึงไฟจากการไฟฟ้ามาใช้ร่วมด้วยอัตโนมัติ ทำให้หมดปัญหาเรื่องไฟตกหรือไฟดับ",
      seoH2_3: "ปัจจัยที่มีผลต่อระยะเวลาคืนทุนของโซลาร์เซลล์",
      seoP_3: "1. ขนาดระบบและเงินลงทุน (System Size & Cost) การติดตั้งขนาดใหญ่ขึ้นมักจะมีราคาต่อกิโลวัตต์ที่ถูกลง \n2. ปริมาณแสงแดด (Sunlight Hours) ประเทศไทยมีแดดเฉลี่ยประมาณ 4-5 ชั่วโมงต่อวัน พื้นที่ที่แดดจัดจะผลิตไฟได้มาก \n3. พฤติกรรมการใช้ไฟ (Self-Consumption) การคืนทุนจะเร็วที่สุดเมื่อคุณใช้ไฟที่ผลิตได้ในตอนกลางวันทั้งหมด เนื่องจากเป็นการทดแทนการซื้อไฟที่แพง (ประมาณ 4-5 บาท/หน่วย) แทนที่จะขายคืนซึ่งได้ราคาต่ำกว่า (ประมาณ 2.2 บาท/หน่วย) \n4. ค่าไฟฟ้า (Electricity Rate) ยิ่งค่าไฟแพงขึ้น การติดตั้งโซลาร์เซลล์ก็จะยิ่งคุ้มค่าและคืนทุนเร็วขึ้น",
      seoH2_4: "ข้อควรรู้ก่อนตัดสินใจติดตั้ง",
      seoP_4: "ก่อนติดตั้งควรตรวจสอบโครงสร้างหลังคาว่ามีความแข็งแรงเพียงพอหรือไม่ และควรขออนุญาตติดตั้งให้ถูกต้องตามกฎหมายกับทางหน่วยงานราชการ ทั้งการไฟฟ้านครหลวง หรือส่วนภูมิภาค รวมถึงคณะกรรมการกำกับกิจการพลังงาน (กกพ.) เพื่อความปลอดภัยและสามารถเข้าร่วมโครงการขายไฟคืนได้อย่างถูกต้อง นอกจากนี้ควรเลือกบริษัทรับติดตั้งที่มีความน่าเชื่อถือ มีวิศวกรรับรอง และมีการรับประกันทั้งอุปกรณ์และงานติดตั้งอย่างชัดเจน"
    },
    EN: {
      title: "On-Grid Solar Payback Calculator",
      systemCapacity: "System Capacity (kW)",
      installCost: "Total Installation Cost (Baht)",
      sunlightHours: "Average Daily Sunlight (Hours)",
      elecRate: "Electricity Rate (Baht/kWh)",
      selfConsumption: "Daytime Self-Consumption (%)",
      sellRate: "Feed-in Tariff (Baht/kWh) *if any",
      results: "Calculation Results",
      dailyGen: "Daily Generation",
      monthlySaving: "Monthly Savings",
      yearlySaving: "Yearly Savings",
      paybackPeriod: "Payback Period",
      years: "Years",
      months: "Months",
      kwh: "kWh",
      baht: "Baht",
      infoSelfUse: "Self Use",
      infoSell: "Selling",
      seoTitle: "On-Grid Solar Payback Calculator - Is it worth it?",
      seoH2_1: "Is installing an on-grid solar system worth the investment?",
      seoP_1: "With continuously rising electricity costs, installing a Solar Rooftop system to generate your own electricity has become highly popular. The 'On-Grid' system, in particular, connects your solar system with the utility grid, significantly reducing daytime electricity bills. You can also sell excess power back to the grid. This calculator helps you estimate the payback period for your initial investment.",
      seoH2_2: "What is an On-Grid Solar System?",
      seoP_2: "An on-grid solar system is tied to the local utility grid. Key components include solar panels and an inverter that converts DC to AC power for home use. The major advantage is that it doesn't require batteries, reducing initial and maintenance costs. If solar power is insufficient, the system automatically draws supplementary power from the grid.",
      seoH2_3: "Factors Affecting Solar Payback Period",
      seoP_3: "1. System Size & Cost: Larger installations often cost less per kW. \n2. Sunlight Hours: Thailand averages 4-5 hours of peak sunlight daily. \n3. Self-Consumption: The fastest payback occurs when you consume all generated power during the day, replacing expensive grid electricity. \n4. Electricity Rate: Higher grid rates mean faster solar payback.",
      seoH2_4: "Things to Consider Before Installing",
      seoP_4: "Ensure your roof structure is strong enough. Obtain necessary legal permits from relevant authorities (MEA/PEA and ERC) for safety and to legally participate in feed-in tariff programs. Choose a reliable installation company with certified engineers and clear warranties for equipment and workmanship."
    }
  };

  const text = t[lang as keyof typeof t] || t.TH;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-2">
          <Sun className="w-8 h-8 text-yellow-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{text.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.systemCapacity}</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.installCost}</label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                min="0"
                step="1000"
              />
            </div>

            <div className="pt-4 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.sunlightHours}</label>
              <input
                type="number"
                value={sunlightHours}
                onChange={(e) => setSunlightHours(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                min="1"
                max="12"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.elecRate}</label>
              <input
                type="number"
                value={elecRate}
                onChange={(e) => setElecRate(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                min="0"
                step="0.1"
              />
            </div>

            <div className="pt-4 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {text.selfConsumption} ({selfConsumption}%)
              </label>
              <input
                type="range"
                value={selfConsumption}
                onChange={(e) => setSelfConsumption(Number(e.target.value))}
                className="w-full accent-yellow-500"
                min="0"
                max="100"
                step="1"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0% ({text.infoSell})</span>
                <span>100% ({text.infoSelfUse})</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.sellRate}</label>
              <input
                type="number"
                value={sellRate}
                onChange={(e) => setSellRate(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                min="0"
                step="0.1"
                disabled={selfConsumption === 100}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
            <h3 className="text-lg font-semibold text-yellow-800 mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              {text.results}
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-sm text-gray-500 mb-1">{text.paybackPeriod}</div>
                <div className="text-3xl font-bold text-yellow-600 flex items-end gap-2">
                  {Math.floor(paybackYears)} <span className="text-lg font-medium">{text.years}</span>
                  {Math.round((paybackYears % 1) * 12) > 0 && (
                    <> {Math.round((paybackYears % 1) * 12)} <span className="text-lg font-medium">{text.months}</span></>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">{text.monthlySaving}</div>
                  <div className="text-xl font-bold text-green-600">
                    {monthlySaving.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{text.baht}</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">{text.yearlySaving}</div>
                  <div className="text-xl font-bold text-green-600">
                    {yearlySaving.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{text.baht}</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500 mb-1">{text.dailyGen}</div>
                  <div className="text-lg font-semibold text-gray-800">
                    {dailyGen.toFixed(1)} <span className="text-sm font-normal text-gray-500">{text.kwh}</span>
                  </div>
                </div>
                <Battery className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 leading-relaxed">
              {lang === 'EN' 
                ? "This calculation is an estimate. Actual savings may vary based on weather conditions, seasonal changes, panel degradation, and real electricity usage patterns."
                : "การคำนวณนี้เป็นการประเมินเบื้องต้น ผลลัพธ์จริงอาจเปลี่ยนแปลงตามสภาพอากาศ ฤดูกาล ประสิทธิภาพของแผงที่ลดลงตามกาลเวลา และพฤติกรรมการใช้ไฟจริง"
              }
            </p>
          </div>
        </div>
      </div>

      <article className="mt-12 prose prose-stone max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{text.seoTitle}</h2>
        <p className="mb-6 leading-relaxed">{text.seoP_1}</p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">{text.seoH2_2}</h3>
        <p className="mb-6 leading-relaxed">{text.seoP_2}</p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">{text.seoH2_3}</h3>
        <p className="mb-6 leading-relaxed whitespace-pre-line">{text.seoP_3}</p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">{text.seoH2_4}</h3>
        <p className="mb-6 leading-relaxed">{text.seoP_4}</p>
      </article>
    </div>
  );
}

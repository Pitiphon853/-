import React, { useState } from 'react';
import { Zap, Calculator, RotateCcw, Factory, Clock } from 'lucide-react';

export default function MillStorageElectricity({ lang }: { lang: 'TH' | 'EN' }) {
  const [powerWatt, setPowerWatt] = useState<number | ''>(5000); // Watts (5 kW)
  const [hoursPerDay, setHoursPerDay] = useState<number | ''>(8);
  const [daysPerMonth, setDaysPerMonth] = useState<number | ''>(25);
  const [ratePerUnit, setRatePerUnit] = useState<number | ''>(4.5); // Baht/kWh

  const t = {
    title: lang === 'TH' ? 'คำนวณการใช้ไฟฟ้าโรงสีและไซโล' : 'Mill & Storage Electricity Cost',
    powerWatt: lang === 'TH' ? 'กำลังไฟฟ้าของเครื่องจักร (วัตต์ - W)' : 'Machinery Power Rating (Watts)',
    hoursPerDay: lang === 'TH' ? 'ชั่วโมงการทำงานต่อวัน' : 'Operating Hours per Day',
    daysPerMonth: lang === 'TH' ? 'จำนวนวันทำงานต่อเดือน' : 'Operating Days per Month',
    ratePerUnit: lang === 'TH' ? 'ค่าไฟฟ้าระบุต่อหน่วย (บาท/kWh)' : 'Electricity Rate (per kWh)',
    calculate: lang === 'TH' ? 'คำนวณ' : 'Calculate',
    reset: lang === 'TH' ? 'เริ่มใหม่' : 'Reset',
    dailyCost: lang === 'TH' ? 'ค่าไฟฟ้าต่อวัน' : 'Daily Cost',
    monthlyCost: lang === 'TH' ? 'ค่าไฟฟ้าต่อเดือน' : 'Monthly Cost',
    unitsPerMonth: lang === 'TH' ? 'หน่วยไฟฟ้าที่ใช้ (kWh)' : 'Energy Used (kWh/Month)',
    currency: lang === 'TH' ? 'บาท' : 'Unit',
    errorHours: lang === 'TH' ? 'ชั่วโมงต่อวันต้องไม่เกิน 24' : 'Hours per day cannot exceed 24',
    errorDays: lang === 'TH' ? 'วันต่อเดือนต้องไม่เกิน 31' : 'Days per month cannot exceed 31',
  };

  const isErrorHours = Number(hoursPerDay) > 24;
  const isErrorDays = Number(daysPerMonth) > 31;
  const isError = isErrorHours || isErrorDays;

  const calculateCost = () => {
    if (isError || !powerWatt || !hoursPerDay || !daysPerMonth || !ratePerUnit) {
      return { dailyUnits: 0, monthlyUnits: 0, dailyCost: 0, monthlyCost: 0 };
    }
    const kw = Number(powerWatt) / 1000;
    const hrs = Number(hoursPerDay);
    const days = Number(daysPerMonth);
    const rate = Number(ratePerUnit);

    const dailyUnits = kw * hrs;
    const monthlyUnits = dailyUnits * days;
    const dailyCost = dailyUnits * rate;
    const monthlyCost = monthlyUnits * rate;

    return { dailyUnits, monthlyUnits, dailyCost, monthlyCost };
  };

  const { monthlyUnits, dailyCost, monthlyCost } = calculateCost();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Factory className="w-6 h-6 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.powerWatt}
              </label>
              <input
                type="number"
                value={powerWatt}
                onChange={(e) => setPowerWatt(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                min="0"
                placeholder="5000"
              />
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'TH' ? '* 1 กิโลวัตต์ (kW) = 1,000 วัตต์ (W)' : '* 1 Kilowatt (kW) = 1,000 Watts (W)'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.hoursPerDay}
                </label>
                <input
                  type="number"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(e.target.value ? Number(e.target.value) : '')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${isErrorHours ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'}`}
                  min="0"
                  max="24"
                />
                {isErrorHours && <p className="text-xs text-red-500 mt-1">{t.errorHours}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.daysPerMonth}
                </label>
                <input
                  type="number"
                  value={daysPerMonth}
                  onChange={(e) => setDaysPerMonth(e.target.value ? Number(e.target.value) : '')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${isErrorDays ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'}`}
                  min="0"
                  max="31"
                />
                {isErrorDays && <p className="text-xs text-red-500 mt-1">{t.errorDays}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.ratePerUnit}
              </label>
              <input
                type="number"
                value={ratePerUnit}
                onChange={(e) => setRatePerUnit(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                min="0"
                step="0.1"
              />
            </div>

            <button
              onClick={() => {
                setPowerWatt(5000);
                setHoursPerDay(8);
                setDaysPerMonth(25);
                setRatePerUnit(4.5);
              }}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t.reset}
            </button>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 flex flex-col justify-center gap-6 border border-yellow-100">
            <div className="text-center">
              <p className="text-yellow-800 text-sm font-medium mb-1">{t.monthlyCost}</p>
              <p className="text-4xl font-bold text-gray-800">
                {!isError ? monthlyCost.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '0.00'}
                <span className="text-xl text-gray-500 ml-2">{t.currency}</span>
              </p>
            </div>
            
            {!isError && powerWatt && Number(hoursPerDay) > 0 && (
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-yellow-200">
                <div className="text-center">
                  <p className="text-gray-600 text-xs mb-1">{t.dailyCost}</p>
                  <p className="text-lg font-bold text-yellow-600">
                    {dailyCost.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="text-center border-l border-yellow-200">
                  <p className="text-gray-600 text-xs mb-1">{t.unitsPerMonth}</p>
                  <p className="text-lg font-bold text-blue-600">
                    {monthlyUnits.toLocaleString('en-US', { maximumFractionDigits: 1 })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose prose-yellow max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {lang === 'TH' ? 'การคำนวณค่าไฟเครื่องจักรเกษตร: โรงสี โรงอบ และไซโลเก็บพืชผล' : 'Calculating Electricity Costs for Agricultural Machinery, Mills, and Silos'}
        </h2>
        
        {lang === 'TH' ? (
          <>
            <p>
              ในยุคที่เกษตรกรและผู้ประกอบการหันมาแปรรูปผลผลิตด้วยตนเองเพื่อเพิ่มมูลค่า เช่น การทำโรงสีข้าวชุมชน การใช้ตู้อบพืชผล หรือไซโลเป่าลมเพื่อลดความชื้น "ค่าไฟฟ้า" กลายเป็นหนึ่งในต้นทุนแฝง (Hidden Cost) ที่สูงที่สุด หากไม่มีการประเมินการใช้ไฟฟ้าของมอเตอร์และเครื่องจักรอย่างถูกต้อง อาจทำให้ต้นทุนการผลิตบานปลายจนขาดทุนได้
            </p>

            <h3>ทำไมต้องรู้ค่าไฟฟ้าของเครื่องจักรล่วงหน้า?</h3>
            <ul>
              <li><strong>คำนวณจุดคุ้มทุน (Break-even Point):</strong> การรู้ว่าเครื่องสีข้าว 1 ชั่วโมงกินไฟกี่บาท ช่วยให้คุณตั้งราคาค่าบริการรับจ้างสีข้าวได้อย่างเหมาะสม ไม่ขาดทุน</li>
              <li><strong>วางแผนการทำงาน (Operating Schedule):</strong> หากพบว่ามอเตอร์ขนาดใหญ่กินไฟมาก อาจเลือกเดินเครื่องในช่วง Off-Peak (ช่วงเวลาที่มีอัตราค่าไฟถูก) สำหรับระบบ TOU (Time of Use)</li>
              <li><strong>เลือกซื้ออุปกรณ์:</strong> เปรียบเทียบได้ว่าการลงทุนซื้อเครื่องจักรที่แพงกว่าแต่เป็นมอเตอร์ประหยัดไฟ (High Efficiency) จะคุ้มค่าในระยะยาวหรือไม่</li>
            </ul>

            <h3>หลักการคำนวณหน่วยไฟฟ้า (kWh)</h3>
            <p>
              การไฟฟ้าคิดค่าใช้จ่ายตาม <strong>"ยูนิต"</strong> หรือ <strong>กิโลวัตต์-ชั่วโมง (kWh)</strong> ซึ่งมีสูตรการคำนวณที่ง่ายมาก ดังนี้:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4">
              <strong>1. แปลงกำลังไฟฟ้าเป็นกิโลวัตต์:</strong> (วัตต์ของเครื่องจักร ÷ 1,000) = กิโลวัตต์ (kW) <br/>
              <strong>2. คำนวณหน่วยที่ใช้:</strong> กิโลวัตต์ (kW) × จำนวนชั่วโมงที่ใช้งาน = หน่วยไฟฟ้า (kWh) <br/>
              <strong>3. คำนวณเป็นเงิน:</strong> หน่วยไฟฟ้า (kWh) × ราคาค่าไฟต่อหน่วย = ค่าไฟ (บาท)
            </div>

            <h3>ตัวอย่างการคำนวณโรงสีชุมชน</h3>
            <p>
              สมมติว่าคุณมีมอเตอร์โรงสีขนาด <strong>5,000 วัตต์ (หรือ 5 กิโลวัตต์)</strong> ใช้งานวันละ <strong>8 ชั่วโมง</strong> ทำงาน <strong>25 วัน</strong> ใน 1 เดือน อัตราค่าไฟเฉลี่ย <strong>4.5 บาท/หน่วย</strong>
            </p>
            <ul>
              <li>มอเตอร์ 5 kW × 8 ชั่วโมง = ใช้ไฟวันละ <strong>40 หน่วย (kWh)</strong></li>
              <li>ค่าไฟต่อวัน = 40 หน่วย × 4.5 บาท = <strong>180 บาท/วัน</strong></li>
              <li>ค่าไฟต่อเดือน (25 วัน) = 180 × 25 = <strong>4,500 บาท/เดือน</strong></li>
            </ul>
            <p>
              ดังนั้น หากใน 1 วัน (8 ชั่วโมง) โรงสีของคุณสีข้าวได้ 2 ตัน ต้นทุนค่าไฟจะตกอยู่ที่ 90 บาทต่อตันข้าวสาร ซึ่งข้อมูลนี้สำคัญมากต่อการตั้งราคารับจ้างสีข้าว
            </p>
            
            <p>
              ใช้ <em>เครื่องคำนวณค่าไฟฟ้าโรงสี/โรงเก็บ</em> ของเรา กรอกข้อมูลกำลังวัตต์ (W) ที่ระบุไว้บนป้ายเนมเพลท (Nameplate) ของมอเตอร์ เพื่อประเมินต้นทุนค่าพลังงานรายเดือนได้อย่างแม่นยำรวดเร็ว!
            </p>
          </>
        ) : (
          <>
            <p>
              As farmers and agricultural co-ops increasingly adopt on-farm processing to add value—such as community rice mills, crop dryers, and aerated storage silos—"electricity" has emerged as one of the most significant variable costs. Failing to accurately estimate the power consumption of heavy machinery can quickly erode profit margins.
            </p>

            <h3>Why Calculate Machinery Electricity Costs in Advance?</h3>
            <ul>
              <li><strong>Determining Break-Even Pricing:</strong> Knowing exactly how much it costs to run a mill for an hour allows you to set competitive yet profitable custom processing rates.</li>
              <li><strong>Optimizing Operating Schedules:</strong> If high-powered motors consume massive amounts of energy, you might choose to operate them during Off-Peak hours if your utility provider offers Time of Use (TOU) tariffs.</li>
              <li><strong>Equipment Investment Decisions:</strong> Calculating power costs helps you decide whether paying a premium for a High-Efficiency motor will pay for itself over time through energy savings.</li>
            </ul>

            <h3>The Principle of Calculating Kilowatt-Hours (kWh)</h3>
            <p>
              Utility companies bill you based on <strong>Units</strong>, technically known as <strong>Kilowatt-Hours (kWh)</strong>. The math to find this is straightforward:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4">
              <strong>1. Convert Watts to Kilowatts:</strong> Machinery Watts ÷ 1,000 = Kilowatts (kW) <br/>
              <strong>2. Calculate Energy Used:</strong> Kilowatts (kW) × Hours Operated = Energy Units (kWh) <br/>
              <strong>3. Calculate Cost:</strong> Energy Units (kWh) × Electricity Rate = Total Cost
            </div>

            <h3>Example: A Community Rice Mill</h3>
            <p>
              Suppose you operate a mill with a motor rated at <strong>5,000 Watts (5 kW)</strong>. You run it for <strong>8 hours a day</strong>, for <strong>25 days a month</strong>. Your utility rate is <strong>$0.15 per kWh</strong>.
            </p>
            <ul>
              <li>Energy used per day: 5 kW × 8 hours = <strong>40 kWh</strong></li>
              <li>Cost per day: 40 kWh × $0.15 = <strong>$6.00/day</strong></li>
              <li>Cost per month (25 days): $6.00 × 25 = <strong>$150.00/month</strong></li>
            </ul>
            <p>
              If that 8-hour shift processes 2 tons of grain, your energy cost is $3.00 per ton. This figure is crucial for accurately costing your inventory and services.
            </p>
            
            <p>
              Simply check the nameplate on your electric motor for its Wattage (W) rating, plug the numbers into our <em>Mill & Storage Electricity Cost Calculator</em>, and instantly discover your energy overhead!
            </p>
          </>
        )}
      </article>
    </div>
  );
}

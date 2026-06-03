import React, { useState } from 'react';
import { Wrench, Settings } from 'lucide-react';

export default function CarMaintenanceCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  const [kmPerYear, setKmPerYear] = useState(20000);
  
  // Costs
  const [oilChangeCost, setOilChangeCost] = useState(2000);
  const [oilInterval, setOilInterval] = useState(10000); // km

  const [tiresCost, setTiresCost] = useState(12000);
  const [tiresInterval, setTiresInterval] = useState(50000); // km

  const [batteryCost, setBatteryCost] = useState(2500);
  const [batteryIntervalYears, setBatteryIntervalYears] = useState(2); // years

  const [brakeCost, setBrakeCost] = useState(3000);
  const [brakeInterval, setBrakeInterval] = useState(40000); // km

  const [otherYearlyCost, setOtherYearlyCost] = useState(5000);

  // Calc annual cost
  const oilAnnual = (kmPerYear / oilInterval) * oilChangeCost;
  const tiresAnnual = (kmPerYear / tiresInterval) * tiresCost;
  const brakeAnnual = (kmPerYear / brakeInterval) * brakeCost;
  const batteryAnnual = batteryCost / batteryIntervalYears;
  
  const totalAnnual = oilAnnual + tiresAnnual + brakeAnnual + batteryAnnual + otherYearlyCost;
  const totalMonthly = totalAnnual / 12;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Wrench className="w-8 h-8 text-orange-500" />
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'TH' ? 'ประเมินค่าบำรุงรักษารถยนต์ (Car Maintenance)' : 'Car Maintenance Cost Estimator'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-xl border">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'TH' ? 'ระยะทางที่ขับต่อปี (กิโลเมตร)' : 'Distance driven per year (km)'}
            </label>
            <input
              type="number"
              value={kmPerYear}
              onChange={(e) => setKmPerYear(Number(e.target.value))}
              className="w-full px-4 py-2 text-lg border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Settings className="w-4 h-4" /> 
              {lang === 'TH' ? 'ระบุค่าใช้จ่ายและรอบการเปลี่ยน' : 'Costs and Intervals'}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">{lang === 'TH' ? 'ถ่ายน้ำมันเครื่อง (บาท/ครั้ง)' : 'Oil Change Cost'}</label>
                <input type="number" value={oilChangeCost} onChange={(e) => setOilChangeCost(Number(e.target.value))} className="w-full px-3 py-1.5 text-sm border rounded-md" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{lang === 'TH' ? 'รอบเปลี่ยน (ทุกๆ กม.)' : 'Interval (km)'}</label>
                <input type="number" value={oilInterval} onChange={(e) => setOilInterval(Number(e.target.value))} className="w-full px-3 py-1.5 text-sm border rounded-md" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">{lang === 'TH' ? 'เปลี่ยนยาง 4 เส้น (บาท)' : 'Tires Cost (4 pcs)'}</label>
                <input type="number" value={tiresCost} onChange={(e) => setTiresCost(Number(e.target.value))} className="w-full px-3 py-1.5 text-sm border rounded-md" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{lang === 'TH' ? 'รอบเปลี่ยน (ทุกๆ กม.)' : 'Interval (km)'}</label>
                <input type="number" value={tiresInterval} onChange={(e) => setTiresInterval(Number(e.target.value))} className="w-full px-3 py-1.5 text-sm border rounded-md" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">{lang === 'TH' ? 'ผ้าเบรก (บาท/ครั้ง)' : 'Brake Pads Cost'}</label>
                <input type="number" value={brakeCost} onChange={(e) => setBrakeCost(Number(e.target.value))} className="w-full px-3 py-1.5 text-sm border rounded-md" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{lang === 'TH' ? 'รอบเปลี่ยน (ทุกๆ กม.)' : 'Interval (km)'}</label>
                <input type="number" value={brakeInterval} onChange={(e) => setBrakeInterval(Number(e.target.value))} className="w-full px-3 py-1.5 text-sm border rounded-md" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">{lang === 'TH' ? 'แบตเตอรี่ (บาท)' : 'Battery Cost'}</label>
                <input type="number" value={batteryCost} onChange={(e) => setBatteryCost(Number(e.target.value))} className="w-full px-3 py-1.5 text-sm border rounded-md" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{lang === 'TH' ? 'รอบเปลี่ยน (ทุกๆ ปี)' : 'Interval (Years)'}</label>
                <input type="number" value={batteryIntervalYears} onChange={(e) => setBatteryIntervalYears(Number(e.target.value))} className="w-full px-3 py-1.5 text-sm border rounded-md" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">{lang === 'TH' ? 'ซ่อมจุกจิกอื่นๆ/ล้างรถ (บาท/ปี)' : 'Other/Washing (Yr)'}</label>
              <input type="number" value={otherYearlyCost} onChange={(e) => setOtherYearlyCost(Number(e.target.value))} className="w-full px-3 py-1.5 text-sm border rounded-md" />
            </div>
          </div>
        </div>

        <div>
          <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200 h-full">
            <h3 className="text-xl font-bold text-orange-800 mb-6 text-center">
              {lang === 'TH' ? 'สรุปค่าใช้จ่ายที่ต้องเตรียม' : 'Estimated Maintenance Budget'}
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center border-b border-orange-200 pb-2">
                <span className="text-gray-700">{lang === 'TH' ? 'น้ำมันเครื่อง (ต่อปี)' : 'Oil Change (Yr)'}</span>
                <span className="font-medium text-gray-900">฿{Math.round(oilAnnual).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-b border-orange-200 pb-2">
                <span className="text-gray-700">{lang === 'TH' ? 'กันเงินค่าเปลี่ยนยาง (ต่อปี)' : 'Tires Savings (Yr)'}</span>
                <span className="font-medium text-gray-900">฿{Math.round(tiresAnnual).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-b border-orange-200 pb-2">
                <span className="text-gray-700">{lang === 'TH' ? 'กันเงินค่าผ้าเบรก (ต่อปี)' : 'Brakes Savings (Yr)'}</span>
                <span className="font-medium text-gray-900">฿{Math.round(brakeAnnual).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-b border-orange-200 pb-2">
                <span className="text-gray-700">{lang === 'TH' ? 'แบตเตอรี่ (ต่อปี)' : 'Battery Savings (Yr)'}</span>
                <span className="font-medium text-gray-900">฿{Math.round(batteryAnnual).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-b border-orange-200 pb-2">
                <span className="text-gray-700">{lang === 'TH' ? 'อื่นๆ (ต่อปี)' : 'Others (Yr)'}</span>
                <span className="font-medium text-gray-900">฿{otherYearlyCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <p className="text-sm text-gray-500 mb-1">{lang === 'TH' ? 'รวมเฉลี่ยต่อปี' : 'Total Yearly Average'}</p>
              <p className="text-3xl font-bold text-orange-600 mb-4">
                ฿{Math.round(totalAnnual).toLocaleString()}
              </p>
              <div className="border-t pt-3">
                <p className="text-sm text-gray-500 mb-1">{lang === 'TH' ? 'หักเก็บเฉลี่ยต่อเดือน' : 'Save Per Month'}</p>
                <p className="text-2xl font-bold text-gray-800">
                  ฿{Math.round(totalMonthly).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ค่าบำรุงรักษารถยนต์: ทำไมต้อง "หักเงินเก็บ" ล่วงหน้า?
        </h2>
        <p>
          คนที่เพิ่งซื้อรถคันแรกมักจะตกใจเมื่อเจอบิลค่าเปลี่ยนยาง 4 เส้นที่ราคาหลักหมื่นบาท หรือเข้าศูนย์เช็คระยะครั้งใหญ่แล้วต้องจ่ายหลายพันบาท 
          เหตุการณ์เหล่านี้มักจะทำให้สภาพคล่องทางการเงินสะดุด หากไม่ได้เตรียมเงินสำรองไว้ล่วงหน้า
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">หลักการ Sinking Fund (เงินออมเพื่อเป้าหมายเฉพาะ)</h3>
        <p>
          ค่าใช้จ่ายในการบำรุงรักษารถยนต์ ไม่ใช่สิ่งที่เกิดขึ้นทุกเดือน (ยกเว้นค่าน้ำมัน) บางอย่างเปลี่ยนทุกๆ 6 เดือน 
          บางอย่างเปลี่ยนทุก 2 ปี หรือ 3 ปี หลักการที่ถูกต้องในการบริหารจัดการเงินส่วนนี้คือ <strong>การเฉลี่ยค่าใช้จ่ายทั้งหมดออกมาเป็นรายปี หรือรายเดือน</strong> 
          แล้วโอนเงินจำนวนนี้ไปเก็บไว้ในบัญชีแยกต่างหาก (Sinking Fund)
        </p>
        <p>
          ตัวอย่างเช่น ถ้ายางรถยนต์ราคา 12,000 บาท มีอายุใช้งาน 2 ปี (24 เดือน) คุณควรหักเงินเก็บไว้เดือนละ 500 บาท 
          เมื่อครบ 2 ปี ยางเสื่อมสภาพ คุณก็จะมีเงิน 12,000 บาทพร้อมจ่ายทันทีโดยไม่กระทบเงินเดือนในเดือนนั้นๆ เลย
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">รอบการบำรุงรักษาพื้นฐานที่ควรรู้</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>น้ำมันเครื่องและไส้กรอง:</strong> ทุก 10,000 กม. หรือ 6 เดือน (แล้วแต่ระยะใดถึงก่อน) รถที่จอดติดในเมืองควรเปลี่ยนตามกำหนดเวลาแม้เลขไมล์ไม่ถึง</li>
          <li><strong>แบตเตอรี่รถยนต์:</strong> อายุเฉลี่ย 1.5 - 2 ปี หากสตาร์ทติดยากขึ้น หรือระบบไฟในรถหรี่ลง เป็นสัญญาณเตือนว่าใกล้หมดอายุ</li>
          <li><strong>ยางรถยนต์:</strong> อายุการใช้งานประมาณ 40,000 - 50,000 กม. หรือ 2-3 ปี ควรเช็คดอกยาง รอยแตกลายงา และลมยางอย่างสม่ำเสมอ</li>
          <li><strong>ผ้าเบรก:</strong> โดยเฉลี่ย 40,000 กม. หรือเปลี่ยนเมื่อมีเสียงดังแหลมขณะเหยียบเบรก</li>
          <li><strong>ของเหลวอื่นๆ:</strong> เช่น น้ำมันเกียร์ น้ำมันเบรก น้ำยาหล่อเย็น มักจะเปลี่ยนทุกๆ 40,000 - 80,000 กม. แล้วแต่รุ่นรถ</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">เคล็ดลับประหยัดค่าซ่อมบำรุง</h3>
        <p>
          หากรถหมดประกันศูนย์ (Warranty) แล้ว การนำรถเข้าซ่อมที่ <strong>อู่นอกที่ได้มาตรฐาน</strong> หรืออู่เฉพาะทางของรถยี่ห้อนั้นๆ 
          สามารถช่วยประหยัดค่าแรงและค่าอะไหล่ได้ถึง 20-40% เมื่อเทียบกับการเข้าศูนย์บริการอย่างเป็นทางการ
        </p>
      </article>
    </div>
  );
}

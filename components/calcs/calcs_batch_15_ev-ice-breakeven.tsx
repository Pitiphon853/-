import React, { useState } from 'react';
import { Scale, Car, Zap, CheckCircle } from 'lucide-react';

export default function EvIceBreakevenCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  // Car Price
  const [evPrice, setEvPrice] = useState(1000000);
  const [icePrice, setIcePrice] = useState(800000);
  
  // Running cost per km
  const [evCostPerKm, setEvCostPerKm] = useState(0.8);
  const [iceCostPerKm, setIceCostPerKm] = useState(2.5);
  
  // Yearly Maint & Ins
  const [evYearlyMaint, setEvYearlyMaint] = useState(25000); // Ins 20k + maint 5k
  const [iceYearlyMaint, setIceYearlyMaint] = useState(22000); // Ins 15k + maint 7k

  // Usage
  const [yearlyKm, setYearlyKm] = useState(20000);

  // Calculations
  const priceDifference = evPrice - icePrice;
  
  const evYearlyEnergyCost = evCostPerKm * yearlyKm;
  const iceYearlyEnergyCost = iceCostPerKm * yearlyKm;
  
  const evTotalYearlyCost = evYearlyEnergyCost + evYearlyMaint;
  const iceTotalYearlyCost = iceYearlyEnergyCost + iceYearlyMaint;

  const yearlySavings = iceTotalYearlyCost - evTotalYearlyCost;
  
  const breakevenYears = yearlySavings > 0 ? priceDifference / yearlySavings : -1;

  // Generate chart data up to 10 years
  const chartData = [];
  for (let year = 0; year <= 10; year++) {
    chartData.push({
      year,
      evTotal: evPrice + (evTotalYearlyCost * year),
      iceTotal: icePrice + (iceTotalYearlyCost * year)
    });
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Scale className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'TH' ? 'คำนวณจุดคุ้มทุน รถยนต์ไฟฟ้า (EV) vs รถน้ำมัน' : 'EV vs ICE Break-even Calculator'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h3 className="font-semibold text-blue-800 flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4" /> {lang === 'TH' ? 'รถ EV' : 'EV'}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-blue-700 mb-1">{lang === 'TH' ? 'ราคารถ (บาท)' : 'Car Price'}</label>
                  <input type="number" value={evPrice} onChange={(e) => setEvPrice(Number(e.target.value))} className="w-full px-3 py-1.5 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-blue-700 mb-1">{lang === 'TH' ? 'ค่าไฟ (บาท/กม.)' : 'Energy (THB/km)'}</label>
                  <input type="number" step="0.1" value={evCostPerKm} onChange={(e) => setEvCostPerKm(Number(e.target.value))} className="w-full px-3 py-1.5 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-blue-700 mb-1">{lang === 'TH' ? 'ประกัน+บำรุง/ปี' : 'Ins. & Maint/Yr'}</label>
                  <input type="number" value={evYearlyMaint} onChange={(e) => setEvYearlyMaint(Number(e.target.value))} className="w-full px-3 py-1.5 border rounded-md" />
                </div>
              </div>
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <h3 className="font-semibold text-stone-800 flex items-center gap-2 mb-3">
                <Car className="w-4 h-4" /> {lang === 'TH' ? 'รถน้ำมัน (ICE)' : 'ICE'}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-stone-700 mb-1">{lang === 'TH' ? 'ราคารถ (บาท)' : 'Car Price'}</label>
                  <input type="number" value={icePrice} onChange={(e) => setIcePrice(Number(e.target.value))} className="w-full px-3 py-1.5 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-stone-700 mb-1">{lang === 'TH' ? 'ค่าน้ำมัน (บาท/กม.)' : 'Fuel (THB/km)'}</label>
                  <input type="number" step="0.1" value={iceCostPerKm} onChange={(e) => setIceCostPerKm(Number(e.target.value))} className="w-full px-3 py-1.5 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-stone-700 mb-1">{lang === 'TH' ? 'ประกัน+บำรุง/ปี' : 'Ins. & Maint/Yr'}</label>
                  <input type="number" value={iceYearlyMaint} onChange={(e) => setIceYearlyMaint(Number(e.target.value))} className="w-full px-3 py-1.5 border rounded-md" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'TH' ? 'ระยะทางที่ใช้งานเฉลี่ยต่อปี (กิโลเมตร)' : 'Yearly Mileage (km)'}
            </label>
            <input 
              type="number" 
              value={yearlyKm} 
              onChange={(e) => setYearlyKm(Number(e.target.value))} 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
        </div>

        <div>
          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-200 h-full">
            <h3 className="text-xl font-bold text-indigo-900 mb-6 text-center">
              {lang === 'TH' ? 'บทสรุปความคุ้มค่า' : 'Break-even Analysis'}
            </h3>

            {priceDifference <= 0 ? (
              <div className="text-center p-4 bg-green-100 text-green-800 rounded-xl mb-6">
                <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-600" />
                <p className="font-bold text-lg">{lang === 'TH' ? 'รถ EV คุ้มค่าตั้งแต่วันแรก!' : 'EV is cheaper from Day 1!'}</p>
                <p className="text-sm mt-1">{lang === 'TH' ? 'เพราะราคารถ EV ถูกกว่าหรือเท่ากับรถน้ำมัน' : 'Because EV price is lower or equal to ICE.'}</p>
              </div>
            ) : yearlySavings <= 0 ? (
              <div className="text-center p-4 bg-red-100 text-red-800 rounded-xl mb-6">
                <p className="font-bold text-lg">{lang === 'TH' ? 'ไม่เกิดจุดคุ้มทุน' : 'Will never break even'}</p>
                <p className="text-sm mt-1">{lang === 'TH' ? 'ค่าใช้จ่ายรายปีของ EV สูงกว่ารถน้ำมัน' : 'EV yearly running cost is higher than ICE.'}</p>
              </div>
            ) : (
              <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-indigo-100 mb-6">
                <p className="text-sm text-gray-600 mb-2">{lang === 'TH' ? 'ส่วนต่างราคารถ' : 'Price Difference'}: ฿{priceDifference.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mb-4">{lang === 'TH' ? 'ประหยัดเงินได้ปีละ' : 'Yearly Savings'}: ฿{yearlySavings.toLocaleString()}</p>
                
                <p className="text-sm font-medium text-indigo-600 mb-1">{lang === 'TH' ? 'จุดคุ้มทุนอยู่ที่' : 'Breaks even in'}</p>
                <div className="text-5xl font-extrabold text-indigo-700 flex items-baseline justify-center gap-2">
                  {breakevenYears.toFixed(1)} <span className="text-xl font-medium text-indigo-500">{lang === 'TH' ? 'ปี' : 'Years'}</span>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  {lang === 'TH' ? `หรือวิ่งไปแล้ว ${(breakevenYears * yearlyKm).toLocaleString(undefined, {maximumFractionDigits:0})} กม.` : `Or approx. ${(breakevenYears * yearlyKm).toLocaleString(undefined, {maximumFractionDigits:0})} km`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mb-8">
        <h3 className="font-semibold text-gray-800 mb-3">{lang === 'TH' ? 'ตารางสะสมต้นทุน (ราคารถ + ค่าใช้จ่ายรวมรายปี)' : 'Cumulative Cost Table (Price + Running Costs)'}</h3>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">{lang === 'TH' ? 'ปีที่' : 'Year'}</th>
              <th className="p-2 border text-blue-700">{lang === 'TH' ? 'ต้นทุนสะสม EV' : 'Cumulative EV Cost'}</th>
              <th className="p-2 border text-stone-700">{lang === 'TH' ? 'ต้นทุนสะสม รถน้ำมัน' : 'Cumulative ICE Cost'}</th>
              <th className="p-2 border">{lang === 'TH' ? 'สถานะ' : 'Status'}</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((row) => (
              <tr key={row.year} className={row.evTotal < row.iceTotal ? 'bg-green-50' : ''}>
                <td className="p-2 border font-medium">
                  {row.year === 0 ? (lang === 'TH' ? 'วันออกรถ' : 'Day 1') : row.year}
                </td>
                <td className="p-2 border">฿{row.evTotal.toLocaleString()}</td>
                <td className="p-2 border">฿{row.iceTotal.toLocaleString()}</td>
                <td className="p-2 border">
                  {row.evTotal < row.iceTotal ? (
                    <span className="text-green-600 font-semibold">{lang === 'TH' ? 'EV คุ้มกว่า' : 'EV is cheaper'}</span>
                  ) : row.evTotal > row.iceTotal ? (
                    <span className="text-stone-500">{lang === 'TH' ? 'รถน้ำมันคุ้มกว่า' : 'ICE is cheaper'}</span>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <article className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          จุดคุ้มทุนรถ EV (Break-even Point): ซื้อตอนไหนถึงจะคุ้ม?
        </h2>
        <p>
          "รถ EV ประหยัดค่าน้ำมันได้เยอะ แต่ราคารถแพงกว่า จะคุ้มจริงไหม?" นี่คือคำถามยอดฮิตสำหรับคนที่กำลังพิจารณาเปลี่ยนจากรถน้ำมัน (ICE) 
          มาใช้รถยนต์ไฟฟ้า การหาคำตอบที่ชัดเจนที่สุดคือการหา <strong>จุดคุ้มทุน (Break-even Point)</strong>
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">จุดคุ้มทุนคืออะไร?</h3>
        <p>
          คือระยะเวลา (ปี) หรือระยะทาง (กิโลเมตร) ที่ <strong>"เงินที่ประหยัดได้จากค่าน้ำมัน"</strong> มีมูลค่าเท่ากับ <strong>"ส่วนต่างราคารถ EV ที่จ่ายแพงกว่าตอนซื้อ"</strong> 
          เมื่อผ่านจุดนี้ไปแล้ว การใช้รถ EV ของคุณคือกำไร (ประหยัดเงินในกระเป๋าได้จริงๆ)
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ตัวอย่างการคำนวณ</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>รถ EV ราคา 1,000,000 บาท / รถน้ำมันสเปคใกล้เคียง ราคา 800,000 บาท (ส่วนต่าง 200,000 บาท)</li>
          <li>คุณขับรถปีละ 20,000 กม.</li>
          <li>รถ EV จ่ายค่าไฟกม.ละ 0.8 บาท + ประกันแพงกว่า (ค่าใช้จ่าย 40,000 บาท/ปี)</li>
          <li>รถน้ำมัน จ่ายค่าน้ำมันกม.ละ 2.5 บาท (ค่าใช้จ่าย 70,000 บาท/ปี)</li>
          <li>ส่วนต่างความประหยัดคือ 30,000 บาทต่อปี</li>
          <li><strong>จุดคุ้มทุน = 200,000 / 30,000 = 6.6 ปี</strong></li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">ปัจจัยที่ทำให้คืนทุนเร็วขึ้น</h3>
        <p>
          <strong>1. ระยะทางวิ่งเยอะ:</strong> ยิ่งคุณใช้งานรถหนัก (เช่น เซลส์, รถรับจ้าง, วิ่งต่างจังหวัดบ่อย) คุณจะกวาดส่วนต่างค่าน้ำมันมาหักลบราคารถได้เร็วมาก บางคนอาจคืนทุนภายใน 2-3 ปี
        </p>
        <p>
          <strong>2. สงครามราคา EV:</strong> ปัจจุบันค่ายรถ EV มีการลดราคาลงมาแข่งขันกับรถน้ำมันอย่างดุเดือด หากคุณซื้อ EV ในราคาที่ใกล้เคียงหรือถูกกว่ารถน้ำมันในเซกเมนต์เดียวกัน จุดคุ้มทุนจะเกิดขึ้นตั้งแต่วันแรกที่คุณออกรถ!
        </p>
      </article>
    </div>
  );
}

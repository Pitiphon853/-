import React, { useState } from 'react';
import { ShoppingCart, Clock, Wallet, AlertCircle, PiggyBank } from 'lucide-react';

export default function FomoCost({ lang = 'TH' }: any) {
  const isTH = lang === 'TH';

  const [purchasesPerMonth, setPurchasesPerMonth] = useState<number>(2);
  const [costPerPurchase, setCostPerPurchase] = useState<number>(1500);
  const [hoursSpentPerPurchase, setHoursSpentPerPurchase] = useState<number>(3);
  const [hourlyRate, setHourlyRate] = useState<number>(150);

  const calculateCost = () => {
    const financialCostMonthly = purchasesPerMonth * costPerPurchase;
    const timeCostMonthly = purchasesPerMonth * hoursSpentPerPurchase * hourlyRate;
    
    const totalCostMonthly = financialCostMonthly + timeCostMonthly;
    const totalCostYearly = totalCostMonthly * 12;

    const financialCostYearly = financialCostMonthly * 12;
    
    // Future value if invested for 10 years at 5% annually
    const monthlyInvestment = financialCostMonthly;
    const years = 10;
    const annualRate = 0.05;
    const monthlyRate = annualRate / 12;
    const months = years * 12;
    
    // FV = PMT * (((1 + r)^n - 1) / r)
    const futureValue = monthlyRate > 0 
      ? monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate)
      : monthlyInvestment * months;

    return {
      financialCostMonthly,
      timeCostMonthly,
      totalCostMonthly,
      totalCostYearly,
      financialCostYearly,
      futureValue
    };
  };

  const results = calculateCost();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isTH ? "เครื่องคำนวณต้นทุนความกลัวตกกระแส (FOMO Cost)" : "FOMO Cost Calculator"}
            </h1>
            <p className="text-gray-500 mt-1">
              {isTH ? "คำนวณจำนวนเงินและเวลาที่เสียไปกับการซื้อของตามกระแส" : "Calculate the financial and time cost of Fear Of Missing Out purchases."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "จำนวนครั้งที่คุณซื้อของเพราะ FOMO ต่อเดือน" : "Number of FOMO purchases per month"}
              </label>
              <input
                type="number"
                min="0"
                value={purchasesPerMonth}
                onChange={(e) => setPurchasesPerMonth(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "ราคาเฉลี่ยต่อชิ้น (บาท)" : "Average cost per purchase (THB)"}
              </label>
              <input
                type="number"
                min="0"
                value={costPerPurchase}
                onChange={(e) => setCostPerPurchase(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "เวลาเฉลี่ยที่ใช้นั่งดู/หารีวิวต่อชิ้น (ชั่วโมง)" : "Time spent researching/obsessing per item (Hours)"}
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={hoursSpentPerPurchase}
                onChange={(e) => setHoursSpentPerPurchase(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "มูลค่าเวลาของคุณต่อชั่วโมง (บาท)" : "Hourly value of your time (THB)"}
              </label>
              <input
                type="number"
                min="0"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">
              {isTH ? "ต้นทุน FOMO ของคุณ" : "Your FOMO Cost"}
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0 mt-1">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{isTH ? "ต้นทุนทางการเงินต่อปี" : "Financial Cost per Year"}</p>
                  <p className="text-xl font-bold text-gray-900">{results.financialCostYearly.toLocaleString()} {isTH ? "บาท" : "THB"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{isTH ? "ต้นทุนด้านเวลาต่อปี (คิดเป็นเงิน)" : "Time Cost per Year (in value)"}</p>
                  <p className="text-xl font-bold text-gray-900">{(results.timeCostMonthly * 12).toLocaleString()} {isTH ? "บาท" : "THB"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-gray-200 pt-4">
                <div className="p-2 bg-red-600 text-white rounded-lg shrink-0 mt-1">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-600">{isTH ? "ต้นทุน FOMO รวมต่อปี" : "Total FOMO Cost per Year"}</p>
                  <p className="text-2xl font-bold text-red-600">{results.totalCostYearly.toLocaleString()} {isTH ? "บาท" : "THB"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-gray-200 pt-4 bg-green-50 p-4 rounded-xl border border-green-100">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg shrink-0 mt-1">
                  <PiggyBank className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-green-800 font-medium">
                    {isTH ? "หากนำเงินก้อนนี้ไปลงทุน (ผลตอบแทน 5% ต่อปี เป็นเวลา 10 ปี) คุณจะมีเงิน:" : "If invested (5% APY for 10 years), you would have:"}
                  </p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{Math.round(results.futureValue).toLocaleString()} {isTH ? "บาท" : "THB"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="prose prose-red max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2>FOMO (Fear Of Missing Out) อาการกลัวตกกระแสที่สูบเงินในกระเป๋าคุณ</h2>
          <p>
            เคยไหมที่เห็นเพื่อนในโซเชียลแห่กันไปซื้อรองเท้าผ้าใบรุ่นฮิต แก้วน้ำเก็บความเย็นสีใหม่ล่าสุด หรือกล่องสุ่มอาร์ตทอยที่กำลังมาแรง แล้วรู้สึกกระวนกระวายใจจนต้องรีบกดสั่งซื้อ ทั้งที่ความจริงแล้วเราอาจจะไม่ได้อยากได้มันขนาดนั้น อาการแบบนี้เรียกว่า <strong>FOMO (Fear Of Missing Out)</strong> หรืออาการกลัวพลาด กลัวตกกระแส กลัวคุยกับคนอื่นไม่รู้เรื่อง
          </p>

          <h3>ต้นทุนที่มองไม่เห็นของ FOMO</h3>
          <p>
            เมื่อเกิดอาการ FOMO ต้นทุนที่เราเสียไปไม่ได้มีแค่ <strong>"ตัวเงิน" (Financial Cost)</strong> ที่จ่ายค่าสินค้าเท่านั้น แต่ยังแฝงไปด้วย <strong>"ต้นทุนทางเวลา" (Time Cost)</strong> อีกด้วย
          </p>
          <p>
            ลองนึกภาพตาม เมื่อมีของเล่นชิ้นใหม่กำลังฮิต เรามักจะใช้เวลาเป็นชั่วโมงๆ ในการหารีวิว ดูคลิปแกะกล่อง ตามล่าหาร้านที่ยังพอมีของ หรือเทียบราคาในแต่ละแอปพลิเคชัน เวลาเหล่านี้คือต้นทุนค่าเสียโอกาส (Opportunity Cost) ที่สามารถนำไปทำงาน หาเงิน หรือพักผ่อนเพื่อฟื้นฟูร่างกายได้ หากคุณนำเวลาเหล่านี้มาคูณกับมูลค่าเวลาของคุณต่อชั่วโมง คุณจะตกใจที่พบว่าต้นทุนแฝงนี้อาจจะแพงกว่าราคาสินค้าเสียอีก
          </p>

          <h3>จากของสะสม สู่ขยะที่บ้าน (Clutter)</h3>
          <p>
            สินค้าที่ถูกซื้อด้วยอารมณ์ FOMO มักมีวงจรชีวิตที่สั้นมาก เมื่อกระแสจบลง ความตื่นเต้นก็หายไป สิ่งของเหล่านั้นก็จะถูกวางทิ้งไว้ กลายเป็นของฝุ่นเกาะที่กินพื้นที่ในบ้าน นอกจากจะสูญเสียเงินและเวลาแล้ว ยังสร้างภาระในการจัดเก็บและทำความสะอาดในระยะยาวอีกด้วย
          </p>

          <h3>วิธีรับมือกับอาการ FOMO อุดรอยรั่วทางการเงิน</h3>
          <ul>
            <li><strong>กฎ 24 ชั่วโมง (The 24-Hour Rule):</strong> เมื่อเจอของที่อยากได้ตามกระแส ให้บังคับตัวเองรออย่างน้อย 24 หรือ 48 ชั่วโมงก่อนกดซื้อ บ่อยครั้งที่เมื่ออารมณ์ชั่ววูบผ่านไป ความอยากได้จะลดลงจนคุณเปลี่ยนใจไม่ซื้อ</li>
            <li><strong>Unfollow ต้นตอ:</strong> หากมี Influencer หรือเพจป้ายยาที่กระตุ้นให้คุณรู้สึกอยากซื้อของที่ไม่จำเป็นอยู่เสมอ การกด Unfollow หรือ Mute ชั่วคราวจะช่วยให้จิตใจสงบขึ้น</li>
            <li><strong>ตั้งคำถามกับตัวเอง:</strong> ก่อนซื้อให้ถามตัวเอง 3 ข้อ: 1. เราจะใช้มันเกิน 10 ครั้งไหม? 2. ถ้าไม่มีใครเห็นว่าเรามีสิ่งนี้ เรายังจะอยากได้มันอยู่ไหม? 3. มีของชิ้นอื่นในบ้านที่ทำหน้าที่แทนกันได้หรือเปล่า?</li>
            <li><strong>เห็นภาพอนาคตของเงิน:</strong> ดังที่เครื่องคำนวณด้านบนได้แสดงให้เห็น หากนำเงินที่จ่ายไปกับอารมณ์ชั่ววูบไปลงทุนอย่างเป็นระบบ ในระยะยาวมันสามารถเติบโตเป็นเงินก้อนใหญ่ที่ช่วยสร้างความมั่นคงในชีวิตได้จริง</li>
          </ul>

          <h3>สรุป</h3>
          <p>
            กระแสสังคมผ่านมาแล้วก็ผ่านไป การวิ่งตามทุกเทรนด์ไม่เพียงแต่ทำให้เราเหนื่อย แต่ยังทำให้เป้าหมายทางการเงินของเราช้าลง การรู้เท่าทันอาการ FOMO และมีสติก่อนการใช้จ่าย จะช่วยให้เราเก็บรักษาความมั่งคั่งและมีเวลาให้กับสิ่งที่สำคัญกับชีวิตของเราอย่างแท้จริง
          </p>
        </article>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Calculator, Tractor, Scale, ThumbsUp } from 'lucide-react';

export default function TractorRentVsBuy({ lang }: { lang: any }) {
  const [tractorPrice, setTractorPrice] = useState(850000); // baht
  const [maintenanceYearly, setMaintenanceYearly] = useState(20000); // baht per year
  const [fuelPerRai, setFuelPerRai] = useState(60); // baht per rai
  const [laborPerRai, setLaborPerRai] = useState(40); // baht per rai (if driving yourself, set to 0 or opportunity cost)
  const [rentPricePerRai, setRentPricePerRai] = useState(250); // baht per rai
  const [workingAreaRai, setWorkingAreaRai] = useState(500); // expected rai per year

  // Variable cost of owning per rai
  const ownVariableCostPerRai = fuelPerRai + laborPerRai;
  
  // Margin (Savings) per rai by owning instead of renting
  const savingsPerRai = rentPricePerRai - ownVariableCostPerRai;
  
  // Break-even analysis (How many Rais to pay off the tractor price + 1 year maintenance)
  // Simplified ROI based on savings per rai.
  // Actually, let's calculate Years to Break-even based on a fixed working area:
  const yearlySavings = workingAreaRai > 0 && savingsPerRai > 0 ? (workingAreaRai * savingsPerRai) - maintenanceYearly : 0;
  
  const breakEvenYears = yearlySavings > 0 ? tractorPrice / yearlySavings : 0;

  // Or Break-even Rai per year to cover maintenance + depreciation? 
  // Let's assume 5-year depreciation for break-even rai per year
  const yearlyDepreciation = tractorPrice / 5;
  const breakEvenRaiPerYear = savingsPerRai > 0 ? (yearlyDepreciation + maintenanceYearly) / savingsPerRai : 0;

  // Total cost comparison for 1 year
  const costToRentYearly = workingAreaRai * rentPricePerRai;
  const costToOwnYearly = (yearlyDepreciation + maintenanceYearly) + (workingAreaRai * ownVariableCostPerRai);

  const isBetterToBuy = costToOwnYearly < costToRentYearly;

  const t = lang === 'EN' ? {
    title: "Tractor Rent vs Buy Calculator",
    inputs: "Cost Parameters",
    tractorPrice: "Tractor Purchase Price (Baht)",
    maintenanceYearly: "Yearly Maintenance (Baht/Year)",
    fuelPerRai: "Fuel Cost (Baht/Rai)",
    laborPerRai: "Driver Labor Cost (Baht/Rai)",
    rentPricePerRai: "Contractor Rent Price (Baht/Rai)",
    workingAreaRai: "Your Working Area (Rai/Year)",
    summary: "Financial Comparison",
    rentYearly: "Cost to Rent (Yearly)",
    ownYearly: "Cost to Own & Run (Yearly)*",
    savingsPerRai: "Savings per Rai (Own vs Rent)",
    breakEvenRai: "Break-even Area (Rai/Year)",
    breakEvenYears: "Payback Period (Years)",
    verdictBuy: "Buying is more cost-effective",
    verdictRent: "Renting is more cost-effective",
    note: "* Owning cost includes 5-year straight-line depreciation",
    baht: "Baht",
    desc: "Determine whether it makes financial sense to buy a tractor or hire a contractor based on your farm size."
  } : {
    title: "ต้นทุนรถไถเช่า vs ซื้อ — คุ้มกี่ไร่?",
    inputs: "ข้อมูลค่าใช้จ่าย",
    tractorPrice: "ราคาซื้อรถไถ (บาท)",
    maintenanceYearly: "ค่าบำรุงรักษาและประกัน (บาท/ปี)",
    fuelPerRai: "ค่าน้ำมันเชื้อเพลิง (บาท/ไร่)",
    laborPerRai: "ค่าแรงคนขับ (บาท/ไร่) (ขับเองใส่ 0)",
    rentPricePerRai: "ค่าจ้างเหมารถไถรับจ้าง (บาท/ไร่)",
    workingAreaRai: "พื้นที่ทำงานที่คาดไว้ (ไร่/ปี)",
    summary: "ผลการเปรียบเทียบ (ต่อ 1 ปี)",
    rentYearly: "ต้นทุนกรณีจ้างเหมา (บาท/ปี)",
    ownYearly: "ต้นทุนกรณีซื้อขับเอง (บาท/ปี)*",
    savingsPerRai: "ส่วนต่างประหยัดได้ (บาท/ไร่)",
    breakEvenRai: "จุดคุ้มทุน (ไร่/ปี)",
    breakEvenYears: "ระยะเวลาคืนทุนรถไถ (ปี)",
    verdictBuy: "ซื้อรถไถเอง คุ้มค่ากว่า!",
    verdictRent: "จ้างเหมารถไถ คุ้มค่ากว่า!",
    note: "* ต้นทุนกรณีซื้อ รวมการคิดค่าเสื่อมราคารถไถที่ 5 ปี",
    baht: "บาท",
    desc: "วิเคราะห์จุดคุ้มทุน เปรียบเทียบระหว่างการลงทุนซื้อรถแทรกเตอร์กับการจ้างเหมาทำงาน"
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-100 text-red-600 rounded-lg">
          <Tractor className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
          <p className="text-gray-500">{t.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-red-500" />
            {t.inputs}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.tractorPrice}</label>
              <input type="number" value={tractorPrice} onChange={(e) => setTractorPrice(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.workingAreaRai}</label>
                <input type="number" value={workingAreaRai} onChange={(e) => setWorkingAreaRai(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:outline-none bg-yellow-50 font-semibold text-yellow-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.rentPricePerRai}</label>
                <input type="number" value={rentPricePerRai} onChange={(e) => setRentPricePerRai(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:outline-none" />
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border border-red-100 mt-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">ต้นทุนแปรผันกรณีซื้อเอง</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">{t.fuelPerRai}</label>
                  <input type="number" value={fuelPerRai} onChange={(e) => setFuelPerRai(Number(e.target.value) || 0)} className="w-full px-3 py-1 rounded-lg border focus:ring-1 focus:ring-red-500 focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">{t.laborPerRai}</label>
                  <input type="number" value={laborPerRai} onChange={(e) => setLaborPerRai(Number(e.target.value) || 0)} className="w-full px-3 py-1 rounded-lg border focus:ring-1 focus:ring-red-500 focus:outline-none text-sm" />
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-xs text-gray-500 mb-1">{t.maintenanceYearly}</label>
                <input type="number" value={maintenanceYearly} onChange={(e) => setMaintenanceYearly(Number(e.target.value) || 0)} className="w-full px-3 py-1 rounded-lg border focus:ring-1 focus:ring-red-500 focus:outline-none text-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-500" />
            {t.summary}
          </h2>

          <div className="space-y-4">
            {/* Verdict Box */}
            <div className={`p-4 rounded-xl flex items-center gap-3 border ${isBetterToBuy ? 'bg-green-50 border-green-200 text-green-800' : 'bg-orange-50 border-orange-200 text-orange-800'}`}>
              <ThumbsUp className={`w-8 h-8 ${isBetterToBuy ? 'text-green-600' : 'text-orange-600'}`} />
              <div>
                <div className="font-bold text-lg">
                  {isBetterToBuy ? t.verdictBuy : t.verdictRent}
                </div>
                <div className="text-sm opacity-80">
                  ที่พื้นที่การทำงาน {workingAreaRai.toLocaleString()} ไร่/ปี
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-gray-50 rounded-lg text-center border">
                <div className="text-sm text-gray-600 mb-1">{t.rentYearly}</div>
                <div className="font-semibold text-gray-800">
                  {costToRentYearly.toLocaleString()} {t.baht}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center border">
                <div className="text-sm text-gray-600 mb-1">{t.ownYearly}</div>
                <div className="font-semibold text-gray-800">
                  {Math.round(costToOwnYearly).toLocaleString()} {t.baht}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-gray-700">{t.savingsPerRai}</span>
              <span className="font-semibold text-blue-700">{savingsPerRai.toFixed(2)} {t.baht}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <span className="text-indigo-900 font-medium">{t.breakEvenRai}</span>
              <span className="font-bold text-indigo-700">~{Math.ceil(breakEvenRaiPerYear).toLocaleString()} ไร่/ปี</span>
            </div>

            {isBetterToBuy && breakEvenYears > 0 && (
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                <span className="text-green-900 font-medium">{t.breakEvenYears}</span>
                <span className="font-bold text-green-700">{breakEvenYears.toFixed(1)} ปี</span>
              </div>
            )}

            <div className="text-xs text-gray-400 mt-2">
              {t.note}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-red max-w-none mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ตัดสินใจอย่างไร? ระหว่าง "ซื้อรถไถเอง" กับ "จ้างเหมารถรับจ้าง"
        </h2>
        
        <p className="mb-4">
          สำหรับเกษตรกรผู้ปลูกพืชไร่ (เช่น อ้อย มันสำปะหลัง ข้าวโพด) หรือทำนา รถแทรกเตอร์หรือ "รถไถ" เป็นเครื่องจักรกลเกษตรที่ขาดไม่ได้ แต่ด้วยราคาที่สูงหลักหลายแสนไปจนถึงหลักล้านบาท ทำให้เกิดคำถามยอดฮิตว่า <strong>"เราควรลงทุนซื้อรถไถเอง หรือใช้บริการจ้างเหมาดีกว่ากัน?"</strong> การตัดสินใจด้วยความรู้สึกอาจทำให้เกิดภาระหนี้สินระยะยาวได้ การใช้ตัวเลขทางคณิตศาสตร์มาวิเคราะห์จุดคุ้มทุนจึงเป็นวิธีที่ปลอดภัยที่สุด
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          ต้นทุนแฝงของการ "ซื้อรถไถ"
        </h3>
        <p className="mb-4">
          การซื้อรถไถไม่ได้จบแค่ราคาตัวรถ แต่ยังมี <strong>ต้นทุนคงที่ (Fixed Costs)</strong> และ <strong>ต้นทุนแปรผัน (Variable Costs)</strong> ที่ต้องนำมาคำนวณ:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>ค่าเสื่อมราคา (Depreciation):</strong> รถไถมีอายุการใช้งานจำกัด (มักคิดที่ 5-10 ปี) มูลค่าจะลดลงทุกปี ถือเป็นต้นทุนที่คุณต้องแบกรับ</li>
          <li><strong>ค่าบำรุงรักษาซ่อมแซม:</strong> เปลี่ยนถ่ายน้ำมันเครื่อง ยาง อะไหล่สิ้นเปลือง และค่าประกันภัย</li>
          <li><strong>ค่าน้ำมันและค่าแรงคนขับ:</strong> เป็นต้นทุนแปรผันตามจำนวนไร่ที่ทำงาน ยิ่งทำมาก ยิ่งจ่ายมาก</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          แนวคิดเรื่อง "จุดคุ้มทุน" (Break-even Point)
        </h3>
        <p className="mb-4">
          สมมติว่าคุณจ้างเหมารถไถในราคา 250 บาท/ไร่ แต่ถ้าคุณซื้อรถไถมาขับเอง ค่าน้ำมันและค่าแรงของคุณอาจจะตกอยู่แค่ 100 บาท/ไร่ แปลว่าคุณจะ "ประหยัดเงิน" ได้ 150 บาทต่อไร่ 
        </p>
        <p className="mb-4">
          คำถามคือ คุณต้องทำไร่จำนวนกี่ไร่ใน 1 ปี ถึงจะนำเงินที่ประหยัดได้ 150 บาทนี้ ไปจ่ายค่าเสื่อมราคารถและค่าบำรุงรักษารายปีได้หมด? ตัวเลขจำนวนไร่นี้เรียกว่า <strong>"พื้นที่คุ้มทุน" (Break-even Area)</strong> หากคุณมีพื้นที่ทำกินน้อยกว่าจุดคุ้มทุน การจ้างเหมาจะถูกกว่าและสบายใจกว่าไม่ต้องรับความเสี่ยงเรื่องรถเสีย แต่ถ้าคุณมีพื้นที่ทำกินมาก (หรือสามารถนำรถไปรับจ้างเพื่อนบ้านต่อได้) การซื้อรถจะเป็นการลงทุนที่ชาญฉลาดและคืนทุนไว
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          โปรแกรมเปรียบเทียบช่วยคุณได้
        </h3>
        <p className="mb-4">
          <em>โปรแกรมต้นทุนรถไถเช่า vs ซื้อ</em> ของเราออกแบบมาเพื่อช่วยคุณจำลองสถานการณ์ คุณสามารถใส่ราคาจริงของพื้นที่คุณ (เช่น ค่าจ้างเหมาในหมู่บ้าน ค่าน้ำมันปัจจุบัน) และ <strong>พื้นที่ที่คุณมีอยู่จริง</strong> ระบบจะสรุปทันทีว่าใน 1 ปี ต้นทุนแบบไหนถูกกว่ากัน และหากซื้อรถไถ จะใช้เวลากี่ปีจึงจะคืนทุน หวังว่าเครื่องมือนี้จะช่วยให้เกษตรกรยุคใหม่วางแผนการเงินได้อย่างรัดกุมและก้าวสู่การเป็นสมาร์ทฟาร์มเมอร์อย่างเต็มตัว
        </p>
      </article>
    </div>
  );
}

import React, { useState } from 'react';
import { Train, Car, Coins, ArrowRight, CheckCircle2, TrendingDown } from 'lucide-react';

export default function BtsMrtVsCar({ lang = 'TH' }: any) {
  // Transit Inputs
  const [transitFare, setTransitFare] = useState<number>(45); // Baht/trip
  const [connectFare, setConnectFare] = useState<number>(20); // Baht/trip
  const [workDays, setWorkDays] = useState<number>(22); // Days/month

  // Car Inputs
  const [distance, setDistance] = useState<number>(40); // km/day (round trip)
  const [fuelEfficiency, setFuelEfficiency] = useState<number>(12); // km/L
  const [fuelPrice, setFuelPrice] = useState<number>(38); // Baht/L
  const [tollFee, setTollFee] = useState<number>(100); // Baht/day
  const [parkingFee, setParkingFee] = useState<number>(1500); // Baht/month
  const [maintenance, setMaintenance] = useState<number>(2000); // Baht/month (approx maintenance, insurance, tax)

  // Calculations
  const dailyTransitCost = (transitFare + connectFare) * 2; // round trip
  const monthlyTransitCost = dailyTransitCost * workDays;

  const dailyFuelCost = (distance / fuelEfficiency) * fuelPrice;
  const monthlyFuelCost = dailyFuelCost * workDays;
  const monthlyTollCost = tollFee * workDays;
  const monthlyCarCost = monthlyFuelCost + monthlyTollCost + parkingFee + maintenance;

  const diff = Math.abs(monthlyCarCost - monthlyTransitCost);
  const isTransitCheaper = monthlyTransitCost < monthlyCarCost;

  const t = {
    TH: {
      title: "เปรียบเทียบค่าเดินทาง รถไฟฟ้า vs รถส่วนตัว",
      transitSection: "ค่าใช้จ่ายรถสาธารณะ",
      carSection: "ค่าใช้จ่ายรถส่วนตัว",
      transitFare: "ค่ารถไฟฟ้าต่อเที่ยว (บาท)",
      connectFare: "ค่าต่อรถ/วินมอไซค์ต่อเที่ยว (บาท)",
      workDays: "วันทำงานต่อเดือน (วัน)",
      distance: "ระยะทางไป-กลับต่อวัน (กม.)",
      fuelEfficiency: "อัตรากินน้ำมัน (กม./ลิตร)",
      fuelPrice: "ราคาน้ำมัน (บาท/ลิตร)",
      tollFee: "ค่าทางด่วนไป-กลับต่อวัน (บาท)",
      parkingFee: "ค่าที่จอดรถต่อเดือน (บาท)",
      maintenance: "ค่าบำรุงรักษา/ประกัน/ภาษี (เฉลี่ยต่อเดือน)",
      results: "สรุปเปรียบเทียบค่าใช้จ่ายรายเดือน",
      monthlyTransit: "รวมค่าเดินทางสาธารณะ",
      monthlyCar: "รวมค่าใช้จ่ายรถส่วนตัว",
      savingTitle: "ทางเลือกที่คุ้มค่ากว่า",
      saveText: "ประหยัดกว่าเดือนละ",
      baht: "บาท/เดือน",
      transitWinner: "เดินทางด้วยรถสาธารณะ",
      carWinner: "ขับรถส่วนตัว",
      seoTitle: "นั่งรถไฟฟ้า BTS/MRT หรือ ขับรถไปทำงาน แบบไหนคุ้มกว่ากัน?",
      seoH2_1: "ทำไมต้องเปรียบเทียบค่าใช้จ่ายในการเดินทาง?",
      seoP_1: "ปัญหาโลกแตกของคนกรุงเทพฯ และปริมณฑล คือการเลือกระหว่างความสะดวกสบายในการขับรถส่วนตัว กับการกะเวลาที่แน่นอนได้ของการใช้ระบบขนส่งสาธารณะอย่างรถไฟฟ้า BTS หรือ MRT หลายคนคิดว่าขับรถแพงกว่า แต่ในบางกรณี หากจุดเริ่มต้นหรือที่ทำงานอยู่ไกลจากสถานีรถไฟฟ้ามากๆ ทำให้ต้องต่อรถหลายต่อ ค่าใช้จ่ายรวมอาจสูงกว่าการขับรถอีโคคาร์หรือติดแก๊สก็เป็นได้ เครื่องมือนี้จะช่วยคำนวณต้นทุนแฝงต่างๆ เพื่อให้คุณตัดสินใจได้ง่ายขึ้น",
      seoH2_2: "ต้นทุนแฝงของการขับรถส่วนตัว (Hidden Costs)",
      seoP_2: "การประเมินค่าใช้จ่ายของรถส่วนตัว ไม่ควรดูแค่ค่าน้ำมัน หรือค่าทางด่วนรายวัน แต่ควรนำต้นทุนแฝงมาหารเฉลี่ยเป็นรายเดือนด้วย เช่น \n1. ค่าประกันภัยรถยนต์ (ประมาณ 10,000 - 20,000 บาท/ปี) \n2. ค่าต่อ พ.ร.บ. และภาษีประจำปี \n3. ค่าบำรุงรักษาตามระยะทาง (เปลี่ยนถ่ายน้ำมันเครื่อง ยาง แบตเตอรี่) \n4. ค่าที่จอดรถรายเดือน (หากออฟฟิศไม่มีที่จอดให้) \nเมื่อนำทั้งหมดมารวมกัน จะเห็นต้นทุนที่แท้จริงของการใช้รถในแต่ละเดือน",
      seoH2_3: "ข้อดี-ข้อเสีย ของแต่ละทางเลือก",
      seoP_3: "รถสาธารณะ (รถไฟฟ้า): \nข้อดี - ไม่ต้องเครียดกับรถติด ควบคุมเวลาเดินทางได้ สามารถงีบหลับหรือทำอย่างอื่นระหว่างเดินทางได้ \nข้อเสีย - ต้องเบียดเสียดในชั่วโมงเร่งด่วน หากฝนตกจะเดินทางลำบากขึ้น และอาจเหนื่อยกับการเดินหรือต่อรถ \n\nรถส่วนตัว: \nข้อดี - เป็นส่วนตัว สะดวกสบาย ปลอดภัยจากสภาพอากาศ พกพาสัมภาระได้เยอะ \nข้อเสีย - ต้องเผชิญกับรถติด ต้องหาที่จอดรถ และมีค่าใช้จ่ายจุกจิกมากกว่า",
      seoH2_4: "สรุป",
      seoP_4: "ไม่มีคำตอบที่ถูกต้องที่สุดสำหรับทุกคน หากผลคำนวณออกมาว่าค่าใช้จ่ายใกล้เคียงกัน คุณอาจต้องพิจารณาปัจจัยเรื่อง 'เวลา' และ 'สุขภาพจิต' มาเป็นตัวช่วยตัดสินใจ หากขับรถแล้วต้องเจอรถติดหนักวันละ 3 ชั่วโมง การเปลี่ยนมานั่งรถไฟฟ้าอาจช่วยซื้อเวลาชีวิตกลับคืนมาได้มหาศาล"
    },
    EN: {
      title: "BTS/MRT vs Personal Car Calculator",
      transitSection: "Public Transit Costs",
      carSection: "Personal Car Costs",
      transitFare: "BTS/MRT Fare per Trip (Baht)",
      connectFare: "Connecting Transit per Trip (Baht)",
      workDays: "Work Days per Month",
      distance: "Round Trip Distance per Day (km)",
      fuelEfficiency: "Fuel Efficiency (km/L)",
      fuelPrice: "Fuel Price (Baht/L)",
      tollFee: "Round Trip Toll Fee per Day (Baht)",
      parkingFee: "Monthly Parking Fee (Baht)",
      maintenance: "Avg. Monthly Maintenance/Insurance",
      results: "Monthly Expense Comparison",
      monthlyTransit: "Total Transit Cost",
      monthlyCar: "Total Car Cost",
      savingTitle: "More Cost-Effective Option",
      saveText: "Saves per month",
      baht: "Baht/mo",
      transitWinner: "Public Transit",
      carWinner: "Personal Car",
      seoTitle: "Public Transit vs Driving to Work: Which is more cost-effective?",
      seoH2_1: "Why compare commuting costs?",
      seoP_1: "A common dilemma for city dwellers is choosing between the comfort of driving and the predictable timing of public transit like BTS or MRT. While driving is often assumed to be more expensive, multi-leg transit commutes can sometimes exceed the cost of driving a fuel-efficient car. This calculator helps uncover hidden costs to make an informed decision.",
      seoH2_2: "The Hidden Costs of Driving",
      seoP_2: "When estimating car expenses, look beyond daily fuel and tolls. Consider monthly averages of hidden costs: \n1. Car Insurance \n2. Annual Tax and Registration \n3. Regular Maintenance (oil changes, tires) \n4. Monthly Parking Fees \nFactoring these in reveals the true monthly cost of driving.",
      seoH2_3: "Pros and Cons",
      seoP_3: "Public Transit: \nPros - Avoid traffic stress, predictable timing, time to rest/read. \nCons - Crowded during rush hours, vulnerable to weather, physical fatigue from walking/transfers. \n\nDriving: \nPros - Privacy, comfort, weather protection, carrying capacity. \nCons - Traffic jams, parking hassles, unexpected maintenance costs.",
      seoH2_4: "Conclusion",
      seoP_4: "There is no one-size-fits-all answer. If costs are similar, weigh factors like 'time' and 'mental health'. Escaping 3 hours of daily gridlock by taking the train might be worth any minor cost difference."
    }
  };

  const text = t[lang as keyof typeof t] || t.TH;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-2">
          <Train className="w-8 h-8 text-indigo-600" />
          <span className="mx-2 text-indigo-300 font-bold">VS</span>
          <Car className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{text.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Transit Inputs */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 space-y-6">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
            <Train className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-semibold text-gray-800">{text.transitSection}</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{text.transitFare}</label>
            <input
              type="number"
              value={transitFare}
              onChange={(e) => setTransitFare(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{text.connectFare}</label>
            <input
              type="number"
              value={connectFare}
              onChange={(e) => setConnectFare(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{text.workDays}</label>
            <input
              type="number"
              value={workDays}
              onChange={(e) => setWorkDays(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              min="1"
              max="31"
            />
          </div>
        </div>

        {/* Car Inputs */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100 space-y-6">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
            <Car className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-semibold text-gray-800">{text.carSection}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.distance}</label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.fuelEfficiency}</label>
              <input
                type="number"
                value={fuelEfficiency}
                onChange={(e) => setFuelEfficiency(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                min="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.fuelPrice}</label>
              <input
                type="number"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.tollFee}</label>
              <input
                type="number"
                value={tollFee}
                onChange={(e) => setTollFee(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.parkingFee}</label>
              <input
                type="number"
                value={parkingFee}
                onChange={(e) => setParkingFee(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{text.maintenance}</label>
              <input
                type="number"
                value={maintenance}
                onChange={(e) => setMaintenance(Number(e.target.value))}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Coins className="w-32 h-32" />
        </div>
        
        <h3 className="text-xl font-medium text-slate-300 mb-8">{text.results}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
          <div className={`p-6 rounded-2xl border-2 transition-all ${isTransitCheaper ? 'border-green-400 bg-slate-800/80' : 'border-slate-700 bg-slate-800/50'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Train className={`w-6 h-6 ${isTransitCheaper ? 'text-green-400' : 'text-slate-400'}`} />
                <span className="text-slate-300 font-medium">{text.monthlyTransit}</span>
              </div>
              {isTransitCheaper && <CheckCircle2 className="w-6 h-6 text-green-400" />}
            </div>
            <div className={`text-4xl font-bold ${isTransitCheaper ? 'text-white' : 'text-slate-300'}`}>
              {monthlyTransitCost.toLocaleString()} <span className="text-lg font-normal text-slate-400">{text.baht.split('/')[0]}</span>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border-2 transition-all ${!isTransitCheaper ? 'border-green-400 bg-slate-800/80' : 'border-slate-700 bg-slate-800/50'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Car className={`w-6 h-6 ${!isTransitCheaper ? 'text-green-400' : 'text-slate-400'}`} />
                <span className="text-slate-300 font-medium">{text.monthlyCar}</span>
              </div>
              {!isTransitCheaper && <CheckCircle2 className="w-6 h-6 text-green-400" />}
            </div>
            <div className={`text-4xl font-bold ${!isTransitCheaper ? 'text-white' : 'text-slate-300'}`}>
              {monthlyCarCost.toLocaleString()} <span className="text-lg font-normal text-slate-400">{text.baht.split('/')[0]}</span>
            </div>
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-emerald-300 text-sm mb-1">{text.savingTitle}</div>
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              {isTransitCheaper ? text.transitWinner : text.carWinner}
            </div>
          </div>
          <div className="text-center sm:text-right">
            <div className="text-emerald-300 text-sm mb-1">{text.saveText}</div>
            <div className="text-3xl font-bold text-emerald-400 flex items-center justify-center sm:justify-end gap-2">
              <TrendingDown className="w-6 h-6" />
              {diff.toLocaleString()} <span className="text-lg font-normal">{text.baht.split('/')[0]}</span>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-12 prose prose-stone max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{text.seoTitle}</h2>
        <p className="mb-6 leading-relaxed">{text.seoP_1}</p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">{text.seoH2_2}</h3>
        <p className="mb-6 leading-relaxed whitespace-pre-line">{text.seoP_2}</p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">{text.seoH2_3}</h3>
        <p className="mb-6 leading-relaxed whitespace-pre-line">{text.seoP_3}</p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">{text.seoH2_4}</h3>
        <p className="mb-6 leading-relaxed">{text.seoP_4}</p>
      </article>
    </div>
  );
}

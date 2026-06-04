import React, { useState } from 'react';
import { HeartPulse, Calculator, Info, TrendingUp, DollarSign, Activity } from 'lucide-react';

export default function LifetimeHealthcareCost({ lang = 'TH' }: any) {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(80);
  const [annualCost, setAnnualCost] = useState<number>(25000);
  const [medicalInflation, setMedicalInflation] = useState<number>(6);

  const calculateCost = () => {
    const years = lifeExpectancy - currentAge;
    if (years <= 0) return { totalCost: 0, years: 0, chartData: [] };

    let totalCost = 0;
    let currentCost = annualCost;
    const chartData = [];

    for (let i = 1; i <= years; i++) {
      totalCost += currentCost;
      if (i % 10 === 0 || i === years) {
        chartData.push({
          age: currentAge + i,
          accumulated: totalCost,
          currentYearCost: currentCost
        });
      }
      currentCost = currentCost * (1 + medicalInflation / 100);
    }

    return { totalCost, years, chartData };
  };

  const result = calculateCost();

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('th-TH', { maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <HeartPulse className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {lang === 'EN' ? 'Lifetime Healthcare Cost Calculator' : 'เครื่องมือคำนวณต้นทุนดูแลสุขภาพตลอดชีวิต'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Current Age' : 'อายุปัจจุบัน (ปี)'}
              </label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Life Expectancy' : 'อายุขัยที่คาดการณ์ (ปี)'}
              </label>
              <input
                type="number"
                value={lifeExpectancy}
                onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                min={currentAge}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Current Annual Healthcare Cost (THB)' : 'ค่าใช้จ่ายสุขภาพต่อปีในปัจจุบัน (บาท)'}
              </label>
              <input
                type="number"
                value={annualCost}
                onChange={(e) => setAnnualCost(Number(e.target.value))}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Expected Medical Inflation Rate (%)' : 'อัตราเงินเฟ้อค่ารักษาพยาบาลต่อปี (%)'}
              </label>
              <input
                type="number"
                value={medicalInflation}
                onChange={(e) => setMedicalInflation(Number(e.target.value))}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                min="0"
                step="0.1"
              />
            </div>
          </div>

          <div className="bg-red-50 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity className="w-32 h-32 text-red-600" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                {lang === 'EN' ? 'Estimated Total Lifetime Cost' : 'ประมาณการค่าใช้จ่ายสุขภาพรวมตลอดชีพ'}
              </h3>
              <div className="text-4xl font-bold text-red-600 mb-4">
                ฿{formatCurrency(result.totalCost)}
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm text-red-800 bg-white/50 p-3 rounded-lg">
                  <span>{lang === 'EN' ? 'Years to Plan' : 'ระยะเวลาที่ต้องวางแผน'}</span>
                  <span className="font-semibold">{result.years} {lang === 'EN' ? 'Years' : 'ปี'}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-red-800 bg-white/50 p-3 rounded-lg">
                  <span>{lang === 'EN' ? 'Est. Annual Cost in Final Year' : 'ค่าใช้จ่ายรายปีในปีสุดท้าย (โดยประมาณ)'}</span>
                  <span className="font-semibold">฿{result.chartData.length > 0 ? formatCurrency(result.chartData[result.chartData.length - 1].currentYearCost) : 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {result.chartData.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {lang === 'EN' ? 'Cost Accumulation Timeline' : 'ไทม์ไลน์การสะสมค่าใช้จ่ายตามช่วงอายุ'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">{lang === 'EN' ? 'Age' : 'อายุ'}</th>
                    <th className="px-4 py-3">{lang === 'EN' ? 'Cost for that Year' : 'ค่าใช้จ่ายในปีนั้น'}</th>
                    <th className="px-4 py-3 rounded-r-lg">{lang === 'EN' ? 'Total Accumulated Cost' : 'ค่าใช้จ่ายสะสมรวม'}</th>
                  </tr>
                </thead>
                <tbody>
                  {result.chartData.map((data, index) => (
                    <tr key={index} className="border-b border-gray-50 last:border-0">
                      <td className="px-4 py-3 font-medium">{data.age}</td>
                      <td className="px-4 py-3 text-red-600">฿{formatCurrency(data.currentYearCost)}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">฿{formatCurrency(data.accumulated)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4 flex items-start gap-1">
              <Info className="w-4 h-4 flex-shrink-0" />
              {lang === 'EN' 
                ? 'Calculations assume a constant medical inflation rate and annual cost. Actual costs may vary significantly due to unforeseen medical conditions or economic changes.'
                : 'การคำนวณนี้ใช้สมมติฐานที่ว่าอัตราเงินเฟ้อทางการแพทย์และค่าใช้จ่ายรายปีคงที่ ค่าใช้จ่ายจริงอาจแตกต่างกันอย่างมากเนื่องจากปัญหาสุขภาพที่คาดไม่ถึงหรือการเปลี่ยนแปลงทางเศรษฐกิจ'}
            </p>
          </div>
        )}
      </div>

      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ความสำคัญของการคำนวณต้นทุนดูแลสุขภาพตลอดชีวิต (Lifetime Healthcare Cost)
        </h2>
        
        <p>
          เมื่อพูดถึงการวางแผนการเงินเพื่อการเกษียณอายุ คนส่วนใหญ่มักจะนึกถึงค่าใช้จ่ายในชีวิตประจำวัน เช่น ค่าอาหาร ค่าเดินทาง หรือค่าท่องเที่ยว แต่สิ่งหนึ่งที่มักถูกมองข้ามหรือประเมินไว้ต่ำกว่าความเป็นจริงคือ <strong>"ค่าใช้จ่ายด้านสุขภาพและค่ารักษาพยาบาล"</strong> ซึ่งถือเป็นรายจ่ายก้อนใหญ่ที่มีแนวโน้มเพิ่มสูงขึ้นอย่างต่อเนื่อง เครื่องมือคำนวณต้นทุนดูแลสุขภาพตลอดชีวิต (Lifetime Healthcare Cost Calculator) ถูกออกแบบมาเพื่อช่วยให้คุณสามารถประเมินค่าใช้จ่ายเหล่านี้ได้อย่างแม่นยำและเป็นรูปธรรมมากขึ้น
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          ทำไมค่ารักษาพยาบาลถึงมีราคาสูงขึ้นทุกปี?
        </h3>
        <p>
          สาเหตุหลักที่ทำให้ค่าใช้จ่ายด้านสุขภาพเป็นเรื่องที่น่ากังวลคือ <strong>"อัตราเงินเฟ้อทางการแพทย์ (Medical Inflation)"</strong> ซึ่งโดยปกติแล้วมักจะสูงกว่าอัตราเงินเฟ้อทั่วไป (General Inflation) ของประเทศถึง 2-3 เท่า ปัจจัยที่ทำให้อัตราเงินเฟ้อทางการแพทย์พุ่งสูงขึ้น ได้แก่:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>เทคโนโลยีทางการแพทย์ที่ก้าวหน้า:</strong> การพัฒนาเครื่องมือแพทย์ใหม่ๆ ยารักษาโรคที่ตรงจุด (Targeted Therapy) หรือเทคโนโลยีทางพันธุกรรม ทำให้ต้นทุนการรักษาสูงขึ้น</li>
          <li><strong>สังคมผู้สูงอายุ (Aging Society):</strong> ความต้องการบริการทางการแพทย์เพิ่มขึ้นอย่างรวดเร็วเมื่อสัดส่วนประชากรผู้สูงอายุเพิ่มขึ้น</li>
          <li><strong>ต้นทุนการดำเนินงานของโรงพยาบาล:</strong> ทั้งค่าแรงของบุคลากรทางการแพทย์เฉพาะทาง และค่าบริหารจัดการที่มีมาตรฐานสูง</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          การเตรียมตัวรับมือกับค่าใช้จ่ายด้านสุขภาพ
        </h3>
        <p>
          การทราบถึงตัวเลขประมาณการค่าใช้จ่ายด้านสุขภาพตลอดช่วงชีวิต จะช่วยให้เราสามารถวางแผนรับมือได้อย่างมีประสิทธิภาพ โดยมีวิธีการที่ผู้เชี่ยวชาญทางการเงินมักแนะนำดังนี้:
        </p>
        <ol className="list-decimal pl-6 space-y-3 mb-6">
          <li>
            <strong>การทำประกันสุขภาพ (Health Insurance):</strong> ถือเป็นเครื่องมือในการโอนย้ายความเสี่ยงที่คุ้มค่าที่สุด โดยเฉพาะการเลือกซื้อประกันสุขภาพแบบเหมาจ่ายที่มีวงเงินสูงเพียงพอต่อค่ารักษาพยาบาลในอนาคต การทำประกันตั้งแต่อายุยังน้อยและสุขภาพแข็งแรง จะช่วยให้ได้รับการคุ้มครองที่ครอบคลุมในเบี้ยประกันที่เหมาะสม
          </li>
          <li>
            <strong>การจัดสรรพอร์ตการลงทุนเพื่อสุขภาพ (Healthcare Fund):</strong> นอกเหนือจากการออมเงินเพื่อการเกษียณทั่วไป ควรมีการแยกบัญชีหรือพอร์ตการลงทุนที่ตั้งเป้าหมายไว้สำหรับค่ารักษาพยาบาลโดยเฉพาะ โดยเลือกลงทุนในสินทรัพย์ที่สามารถชนะอัตราเงินเฟ้อทางการแพทย์ได้ในระยะยาว
          </li>
          <li>
            <strong>การดูแลสุขภาพเชิงป้องกัน (Preventive Healthcare):</strong> "กันไว้ดีกว่าแก้" การลงทุนกับการดูแลสุขภาพในปัจจุบัน เช่น การทานอาหารที่มีประโยชน์ การออกกำลังกายสม่ำเสมอ และการตรวจสุขภาพประจำปี ช่วยลดความเสี่ยงในการเกิดโรคร้ายแรง ซึ่งเป็นสาเหตุหลักของค่าใช้จ่ายก้อนโตในอนาคตได้อย่างมหาศาล
          </li>
        </ol>

        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 my-6">
          <h4 className="text-lg font-bold text-blue-900 mb-2">ข้อควรระวังในการใช้เครื่องมือประเมิน</h4>
          <p className="text-blue-800 m-0">
            ตัวเลขที่ได้จากการคำนวณนี้เป็นเพียงการประมาณการเบื้องต้นที่อิงจากสมมติฐานที่คุณระบุ ค่าใช้จ่ายจริงอาจสูงหรือต่ำกว่านี้ได้ขึ้นอยู่กับประวัติสุขภาพ โรคทางพันธุกรรม และอุบัติเหตุที่ไม่อาจคาดเดาได้ ดังนั้น การมีแผนสำรอง (Contingency Plan) เช่น การมีเงินสำรองฉุกเฉินควบคู่ไปกับการทำประกันสุขภาพ จึงเป็นกลยุทธ์ที่ดีที่สุดในการปกป้องความมั่งคั่งของคุณในยามเกษียณ
          </p>
        </div>

        <p>
          อย่าปล่อยให้ความมั่งคั่งที่คุณสร้างมาตลอดชีวิต ต้องสูญสิ้นไปกับค่ารักษาพยาบาลในบั้นปลายชีวิต เริ่มต้นวางแผนและประเมินค่าใช้จ่ายด้านสุขภาพของคุณตั้งแต่วันนี้ เพื่อให้คุณสามารถใช้ชีวิตวัยเกษียณได้อย่างมีคุณภาพและปราศจากความกังวลใจด้านการเงิน
        </p>
      </article>
    </div>
  );
}

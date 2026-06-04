import React, { useState } from 'react';
import { TrendingDown, Calculator, Info, DollarSign, ArrowRight } from 'lucide-react';

export default function InflationImpactSavings({ lang = 'TH' }: any) {
  const [currentSavings, setCurrentSavings] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(2);
  const [inflationRate, setInflationRate] = useState<number>(3.5);
  const [years, setYears] = useState<number>(10);

  const calculateImpact = () => {
    if (years <= 0 || currentSavings < 0) {
      return { nominalValue: 0, realValue: 0, purchasingPowerLost: 0, chartData: [] };
    }

    let nominalValue = currentSavings;
    let realValue = currentSavings;
    const chartData = [];

    for (let i = 1; i <= years; i++) {
      nominalValue = nominalValue * (1 + interestRate / 100);
      realValue = realValue * ((1 + interestRate / 100) / (1 + inflationRate / 100));
      
      chartData.push({
        year: i,
        nominal: nominalValue,
        real: realValue
      });
    }

    const purchasingPowerLost = nominalValue - realValue;

    return {
      nominalValue,
      realValue,
      purchasingPowerLost,
      chartData
    };
  };

  const result = calculateImpact();

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('th-TH', { maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
            <TrendingDown className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {lang === 'EN' ? 'Inflation Impact on Savings' : 'เครื่องมือคำนวณผลกระทบเงินเฟ้อต่อเงินออม'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Current Savings Amount (THB)' : 'จำนวนเงินออมปัจจุบัน (บาท)'}
              </label>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Annual Interest/Return Rate (%)' : 'อัตราดอกเบี้ยหรือผลตอบแทนต่อปี (%)'}
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Expected Annual Inflation Rate (%)' : 'อัตราเงินเฟ้อคาดการณ์ต่อปี (%)'}
              </label>
              <input
                type="number"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Time Horizon (Years)' : 'ระยะเวลา (ปี)'}
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                min="1"
                max="100"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex-1 flex flex-col justify-center">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                {lang === 'EN' ? 'Future Nominal Value (Number in bank)' : 'มูลค่าเงินในอนาคตตามตัวเลขบัญชี'}
              </h3>
              <div className="text-3xl font-bold text-gray-900">
                ฿{formatCurrency(result.nominalValue)}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {lang === 'EN' ? 'This is what your bank balance will show.' : 'ตัวเลขที่จะแสดงในสมุดบัญชีธนาคารของคุณ'}
              </p>
            </div>

            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 flex-1 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute right-0 bottom-0 p-4 opacity-10">
                <TrendingDown className="w-24 h-24 text-orange-600" />
              </div>
              <div className="relative z-10">
                <h3 className="text-sm font-medium text-orange-800 mb-1">
                  {lang === 'EN' ? 'Future Real Value (Purchasing Power)' : 'มูลค่าเงินที่แท้จริง (อำนาจซื้อที่เหลืออยู่)'}
                </h3>
                <div className={`text-4xl font-bold ${result.realValue < currentSavings ? 'text-red-600' : 'text-green-600'}`}>
                  ฿{formatCurrency(result.realValue)}
                </div>
                <div className="mt-3 inline-block bg-white/60 px-3 py-1.5 rounded-lg text-sm text-orange-900 font-medium">
                  {lang === 'EN' ? 'Value lost to inflation: ' : 'มูลค่าที่สูญเสียไปจากเงินเฟ้อ: '} 
                  <span className="text-red-600">฿{formatCurrency(result.purchasingPowerLost)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {result.chartData.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {lang === 'EN' ? 'Value Projection Over Time' : 'แนวโน้มมูลค่าเงินในแต่ละปี'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">{lang === 'EN' ? 'Year' : 'ปีที่'}</th>
                    <th className="px-4 py-3">{lang === 'EN' ? 'Nominal Value' : 'มูลค่าตามตัวเลข'}</th>
                    <th className="px-4 py-3 rounded-r-lg">{lang === 'EN' ? 'Real Value (Purchasing Power)' : 'มูลค่าที่แท้จริง (อำนาจซื้อ)'}</th>
                  </tr>
                </thead>
                <tbody>
                  {result.chartData.filter((_, idx) => idx < 5 || idx % 5 === 4 || idx === result.chartData.length - 1).map((data, index) => (
                    <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{data.year}</td>
                      <td className="px-4 py-3 text-gray-600">฿{formatCurrency(data.nominal)}</td>
                      <td className={`px-4 py-3 font-semibold ${data.real < currentSavings ? 'text-red-600' : 'text-green-600'}`}>
                        ฿{formatCurrency(data.real)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ผลกระทบของเงินเฟ้อต่อเงินออม: ภัยเงียบที่กัดกินความมั่งคั่งของคุณ
        </h2>
        
        <p>
          ในการวางแผนการเงิน คำว่า <strong>"เงินเฟ้อ (Inflation)"</strong> เป็นหนึ่งในปัจจัยที่สำคัญที่สุดแต่มักจะถูกประเมินความเสี่ยงต่ำเกินไปอยู่เสมอ หลายคนภูมิใจกับตัวเลขในบัญชีเงินฝากที่เพิ่มขึ้นจากการออมและดอกเบี้ย แต่แท้จริงแล้ว ตัวเลขที่เพิ่มขึ้นนั้นอาจไม่ได้สะท้อนถึงความมั่งคั่งที่แท้จริง หากอัตราดอกเบี้ยที่คุณได้รับนั้น <em>ต่ำกว่า</em> อัตราเงินเฟ้อ เครื่องมือคำนวณผลกระทบเงินเฟ้อต่อเงินออม (Inflation Impact on Savings Calculator) นี้ จะช่วยเผยให้เห็นความเป็นจริงของ <strong>"อำนาจซื้อ (Purchasing Power)"</strong> ที่คุณจะมีในอนาคต
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          ความแตกต่างระหว่าง Nominal Value และ Real Value
        </h3>
        <p>
          เพื่อให้เข้าใจผลกระทบของเงินเฟ้ออย่างชัดเจน เราต้องเข้าใจความแตกต่างของสองคำนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Nominal Value (มูลค่าตามตัวเลข):</strong> คือจำนวนเงินตามหน้าบัญชีของคุณ ตัวอย่างเช่น หากคุณฝากเงิน 100,000 บาท ได้ดอกเบี้ย 2% ต่อปี ปีหน้าตัวเลขในบัญชีจะเป็น 102,000 บาท นี่คือตัวเลขที่คุณจะเห็นบนแอปธนาคาร</li>
          <li><strong>Real Value (มูลค่าที่แท้จริง หรือ อำนาจซื้อ):</strong> คือมูลค่าของเงินเมื่อหักลบกับค่าครองชีพที่สูงขึ้น (เงินเฟ้อ) หากเงินเฟ้ออยู่ที่ 3.5% ของชิ้นเดียวกันที่เคยราคา 100,000 บาท จะแพงขึ้นเป็น 103,500 บาท ทำให้เงิน 102,000 บาทในบัญชีของคุณ ซื้อของชิ้นนั้นไม่ได้อีกต่อไป นั่นหมายความว่าอำนาจซื้อของคุณ "ลดลง" แม้ตัวเลขเงินจะเพิ่มขึ้นก็ตาม</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          เงินเฟ้อ: ภาษีที่มองไม่เห็น (The Invisible Tax)
        </h3>
        <p>
          เงินเฟ้อเปรียบเสมือนปลวกที่ค่อยๆ กัดกินบ้าน หรือภาษีล่องหนที่รัฐบาลไม่ต้องออกกฎหมายเก็บ เมื่ออัตราเงินเฟ้อสูงขึ้น เงินจำนวนเท่าเดิมจะซื้อสินค้าและบริการได้น้อยลง หากคุณเก็บเงินออมทั้งหมดไว้ในบัญชีออมทรัพย์หรือเงินฝากประจำที่ให้ผลตอบแทนต่ำกว่าอัตราเงินเฟ้อ ในระยะยาว 10 ปี หรือ 20 ปี เงินของคุณอาจสูญเสียมูลค่าที่แท้จริงไปมากกว่า 30-50% ซึ่งเป็นอันตรายอย่างยิ่งสำหรับเงินก้อนที่เตรียมไว้ใช้ในยามเกษียณ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          วิธีเอาชนะเงินเฟ้อเพื่อปกป้องเงินออมของคุณ
        </h3>
        <p>
          การปกป้องเงินออมจากเงินเฟ้อ ไม่ใช่การหยุดออมเงิน แต่เป็นการ <strong>"เปลี่ยนที่เก็บเงิน"</strong> ให้เงินทำงานได้มีประสิทธิภาพมากขึ้น กลยุทธ์ในการเอาชนะเงินเฟ้อ ได้แก่:
        </p>
        <ol className="list-decimal pl-6 space-y-3 mb-6">
          <li>
            <strong>ลงทุนในสินทรัพย์ที่ให้ผลตอบแทนสูงกว่าเงินเฟ้อ:</strong> เช่น กองทุนรวมตราสารทุน (หุ้น) อสังหาริมทรัพย์ หรือพันธบัตรรัฐบาล/หุ้นกู้บริษัทเอกชนที่มีความน่าเชื่อถือสูง แม้จะมีความเสี่ยงเพิ่มขึ้น แต่ก็เป็นหนทางเดียวในการรักษาและเพิ่มอำนาจซื้อในระยะยาว
          </li>
          <li>
            <strong>กระจายความเสี่ยง (Asset Allocation):</strong> ไม่ควรทุ่มเงินทั้งหมดไปกับการลงทุนเสี่ยงสูง ควรแบ่งเงินเป็นส่วนๆ เช่น เงินสำรองฉุกเฉิน (ฝากในบัญชีสภาพคล่องสูง แม้ดอกเบี้ยต่ำ) เงินลงทุนระยะกลาง และเงินลงทุนระยะยาวสำหรับเกษียณ
          </li>
          <li>
            <strong>ลงทุนในตนเอง (Invest in Yourself):</strong> การพัฒนาทักษะและความรู้เพื่อเพิ่มความสามารถในการหารายได้ เป็นการป้องกันความเสี่ยงจากเงินเฟ้อที่ดีที่สุด เพราะรายได้ของคุณจะสามารถเติบโตตามหรือสูงกว่าสภาวะเศรษฐกิจได้
          </li>
        </ol>

        <div className="bg-orange-50 p-5 rounded-xl border border-orange-100 my-6">
          <h4 className="text-lg font-bold text-orange-900 mb-2">บทสรุปของการวางแผน</h4>
          <p className="text-orange-800 m-0">
            การตระหนักรู้ถึงผลกระทบของเงินเฟ้อคือจุดเริ่มต้นของความสำเร็จทางการเงิน อย่าปล่อยให้ความกลัวความเสี่ยงจากการลงทุน ทำให้คุณตกเป็นเหยื่อของความเสี่ยงที่แน่นอนที่สุดอย่าง <strong>"เงินเฟ้อ"</strong> เริ่มต้นศึกษาการลงทุนและวางแผนจัดสรรเงินออมของคุณเสียตั้งแต่วันนี้ เพื่อให้อำนาจซื้อของคุณยังคงอยู่ ไม่ว่ากาลเวลาจะผ่านไปนานแค่ไหนก็ตาม
          </p>
        </div>
      </article>
    </div>
  );
}

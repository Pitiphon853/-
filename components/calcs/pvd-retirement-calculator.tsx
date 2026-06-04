import React, { useState } from 'react';
import { Briefcase, Info, TrendingUp, DollarSign } from 'lucide-react';

export default function PvdRetirementCalculator({ lang }: any) {
  const isTH = lang === 'TH';

  const [currentAge, setCurrentAge] = useState<number | ''>(30);
  const [retireAge, setRetireAge] = useState<number | ''>(60);
  const [currentSalary, setCurrentSalary] = useState<number | ''>(30000);
  const [salaryGrowth, setSalaryGrowth] = useState<number | ''>(5);
  const [empRate, setEmpRate] = useState<number | ''>(5);
  const [employerRate, setEmployerRate] = useState<number | ''>(5);
  const [expectedReturn, setExpectedReturn] = useState<number | ''>(4);
  const [currentBalance, setCurrentBalance] = useState<number | ''>(0);

  const calculatePvd = () => {
    if (
      typeof currentAge !== 'number' || typeof retireAge !== 'number' || 
      typeof currentSalary !== 'number' || typeof salaryGrowth !== 'number' || 
      typeof empRate !== 'number' || typeof employerRate !== 'number' || 
      typeof expectedReturn !== 'number' || typeof currentBalance !== 'number'
    ) return null;

    if (currentAge >= retireAge) return null;

    let balance = currentBalance;
    let totalEmpCont = 0;
    let totalEmployerCont = 0;
    
    let salary = currentSalary;
    const returnRate = expectedReturn / 100;
    const growthRate = salaryGrowth / 100;

    for (let age = currentAge; age < retireAge; age++) {
      // Annual contributions
      const annualSalary = salary * 12;
      const empContForYear = annualSalary * (empRate / 100);
      const employerContForYear = annualSalary * (employerRate / 100);

      totalEmpCont += empContForYear;
      totalEmployerCont += employerContForYear;

      // Add to balance (assuming contributions made throughout the year, so approximate half year interest on new contributions)
      const yearlyContribution = empContForYear + employerContForYear;
      
      // Interest on existing balance
      const interestOnBalance = balance * returnRate;
      // Interest on new contributions (roughly half)
      const interestOnNew = yearlyContribution * (returnRate / 2);

      balance += yearlyContribution + interestOnBalance + interestOnNew;

      // Increase salary for next year
      salary = salary * (1 + growthRate);
    }

    const totalInterest = balance - currentBalance - totalEmpCont - totalEmployerCont;

    return {
      finalBalance: balance,
      totalEmpCont,
      totalEmployerCont,
      totalInterest,
      initialBalance: currentBalance,
      finalSalary: salary
    };
  };

  const result = calculatePvd();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-br from-violet-50 to-fuchsia-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-violet-600 rounded-lg text-white">
              <Briefcase size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isTH ? "คำนวณเงินกองทุนสำรองเลี้ยงชีพ (PVD)" : "Provident Fund (PVD) Calculator"}
            </h2>
          </div>
          <p className="text-gray-600">
            {isTH 
              ? "ประมาณการเงินก้อนที่คุณจะได้รับจากกองทุนสำรองเลี้ยงชีพในวันเกษียณอายุ เพื่อใช้วางแผนการเงินล่วงหน้า" 
              : "Estimate the lump sum you will receive from your Provident Fund upon retirement."}
          </p>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? "อายุปัจจุบัน (ปี)" : "Current Age"}
                </label>
                <input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? "อายุเกษียณ (ปี)" : "Retirement Age"}
                </label>
                <input
                  type="number"
                  value={retireAge}
                  onChange={(e) => setRetireAge(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? "เงินเดือนปัจจุบัน" : "Current Salary"}
                </label>
                <input
                  type="number"
                  value={currentSalary}
                  onChange={(e) => setCurrentSalary(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? "เงินเดือนขึ้นปีละ (%)" : "Salary Growth (%)"}
                </label>
                <input
                  type="number"
                  value={salaryGrowth}
                  onChange={(e) => setSalaryGrowth(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-violet-700">
                  {isTH ? "คุณหักสะสม (%)" : "Your Contrib. (%)"}
                </label>
                <input
                  type="number"
                  value={empRate}
                  onChange={(e) => setEmpRate(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-violet-300 bg-violet-50 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-fuchsia-700">
                  {isTH ? "บริษัทสมทบ (%)" : "Employer Contrib (%)"}
                </label>
                <input
                  type="number"
                  value={employerRate}
                  onChange={(e) => setEmployerRate(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-fuchsia-300 bg-fuchsia-50 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? "ผลตอบแทนคาดหวัง (%)" : "Expected Return (%)"}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? "ยอดเงินปัจจุบันที่มี (บาท)" : "Current Balance"}
                </label>
                <input
                  type="number"
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  placeholder={isTH ? "ถ้าพึ่งเริ่มให้ใส่ 0" : "0 if just started"}
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 flex flex-col justify-center border border-gray-100">
            {result ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-gray-500 font-medium mb-2">
                    {isTH ? "ประมาณการเงินก้อน PVD วันเกษียณ" : "Estimated PVD Balance at Retirement"}
                  </h3>
                  <div className="text-4xl md:text-5xl font-bold text-violet-600 truncate">
                    {result.finalBalance.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xl text-gray-600 font-normal mt-1">{isTH ? "บาท" : "THB"}</div>
                </div>

                <div className="bg-white rounded-lg p-5 border border-gray-200 space-y-4">
                  
                  {result.initialBalance > 0 && (
                    <div className="flex justify-between items-center text-sm pb-3 border-b border-gray-100">
                      <span className="text-gray-600">{isTH ? "เงินต้นยกมา:" : "Initial Balance:"}</span>
                      <span className="font-semibold text-gray-800">{result.initialBalance.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-violet-400"></div>
                      {isTH ? "ส่วนที่คุณสะสมเพิ่ม:" : "Your Contributions:"}
                    </span>
                    <span className="font-semibold text-violet-700">{result.totalEmpCont.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-fuchsia-400"></div>
                      {isTH ? "ส่วนที่บริษัทสมทบ:" : "Employer Match:"}
                    </span>
                    <span className="font-semibold text-fuchsia-700">{result.totalEmployerCont.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm pt-3 border-t border-gray-100">
                    <span className="text-gray-600 flex items-center gap-1.5">
                      <TrendingUp size={16} className="text-emerald-500" />
                      {isTH ? "ผลตอบแทนจากการลงทุน:" : "Investment Returns:"}
                    </span>
                    <span className="font-bold text-emerald-600">+{result.totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center text-gray-400 h-full flex flex-col items-center justify-center">
                <Briefcase size={48} className="mb-4 opacity-50" />
                <p>{isTH ? "กรุณากรอกข้อมูลให้ครบถ้วน" : "Please fill in all fields"}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isTH && (
        <article className="prose prose-violet max-w-none bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">กองทุนสำรองเลี้ยงชีพ (PVD) เครื่องมือสร้างความมั่งคั่งเพื่อวัยเกษียณ</h2>
          
          <p>
            <strong>กองทุนสำรองเลี้ยงชีพ (Provident Fund หรือ PVD)</strong> เป็นสวัสดิการที่นายจ้างจัดตั้งขึ้นร่วมกับลูกจ้าง 
            เพื่อส่งเสริมให้ลูกจ้างมีการออมเงินไว้ใช้จ่ายในยามเกษียณอายุ ทุพพลภาพ หรือออกจากงาน 
            ถือเป็นหนึ่งในเครื่องมือทางการเงินที่ดีที่สุดสำหรับมนุษย์เงินเดือน เพราะเปรียบเสมือนคุณได้รับ <strong>"เงินเดือนเพิ่มฟรีๆ"</strong> จากส่วนที่บริษัทสมทบให้ทุกเดือน
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">กลไกการทำงานของกองทุนสำรองเลี้ยงชีพ</h3>
          <p>
            เงินที่ไหลเข้าสู่กองทุน PVD ในแต่ละเดือนจะมาจาก 2 ส่วนหลักๆ คือ:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>เงินสะสม (ส่วนของพนักงาน):</strong> คือเงินที่ถูกหักจากเงินเดือนของคุณทุกเดือน โดยสามารถเลือกอัตราหักได้ตั้งแต่ 2% - 15% (ขึ้นอยู่กับนโยบายของแต่ละบริษัท)</li>
            <li><strong>เงินสมทบ (ส่วนของนายจ้าง):</strong> คือเงินที่บริษัทจ่ายสมทบเข้าไปในกองทุนให้คุณฟรีๆ ในอัตรา 2% - 15% เช่นกัน โดยบางบริษัทอาจปรับเพิ่มเปอร์เซ็นต์การสมทบให้ตามอายุงานของคุณ ยิ่งอยู่นานก็ยิ่งได้สมทบเยอะขึ้น</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">ทำไมควรหักเงิน PVD เต็มเพดานสูงสุด (Max Contribution)?</h3>
          <p>
            หลายคนเลือกที่จะหักเงินเข้า PVD ในอัตราที่ต่ำที่สุดเพื่อจะได้มีเงินสดเหลือใช้ในแต่ละเดือน 
            แต่ในทางกลับกัน ผู้เชี่ยวชาญทางการเงินมักจะแนะนำให้มนุษย์เงินเดือน <strong>"หัก PVD ให้เต็มเพดานมากที่สุดเท่าที่บริษัทอนุญาต"</strong> ด้วยเหตุผล 3 ข้อหลัก:
          </p>
          
          <ol className="list-decimal pl-6 mb-4 space-y-4">
            <li>
              <strong>ได้สิทธิลดหย่อนภาษี:</strong> 
              เงินสะสม PVD ที่ถูกหักไป สามารถนำไปลดหย่อนภาษีเงินได้ประจำปีได้เต็มจำนวน ตามที่จ่ายจริง (แต่เมื่อรวมกับกองทุนเพื่อการเกษียณอื่นๆ เช่น RMF, SSF, ประกันบำนาญ ต้องไม่เกิน 500,000 บาท) 
              เสมือนว่าคุณได้เงินคืนกลับมาในรูปแบบของภาษีที่ลดลง
            </li>
            <li>
              <strong>พลังของดอกเบี้ยทบต้นระยะยาว:</strong> 
              เงินใน PVD ไม่ได้ถูกเก็บไว้เฉยๆ แต่บริษัทจัดการกองทุนจะนำไปลงทุนในสินทรัพย์ต่างๆ (เช่น ตราสารหนี้, หุ้นไทย, หุ้นต่างประเทศ) ตามแผนที่คุณเลือก 
              ระยะเวลาหลายสิบปีตั้งแต่เริ่มทำงานจนถึงเกษียณ จะทำให้ดอกเบี้ยทบต้นทำงานได้อย่างเต็มประสิทธิภาพ
            </li>
            <li>
              <strong>เงินฟรีจากนายจ้าง:</strong> 
              เงื่อนไขการรับเงินสมทบจากนายจ้าง มักจะผูกกับอายุงาน หากคุณลาออกก่อนกำหนด อาจจะได้รับเงินส่วนนี้ไม่เต็ม 100% 
              แต่หากคุณอยู่จนครบเงื่อนไข (Vesting Period) หรืออยู่จนเกษียณ คุณจะได้เงินส่วนนี้พร้อมผลตอบแทนกลับมาทั้งหมด
            </li>
          </ol>

          <div className="bg-violet-50 p-4 rounded-lg my-6 border border-violet-200">
            <h4 className="font-semibold text-violet-900 mb-2">เคล็ดลับการจัดพอร์ต PVD (Employee's Choice)</h4>
            <p className="text-sm text-violet-800">
              หากบริษัทของคุณมีนโยบายให้เลือกแผนการลงทุนได้เอง (Employee's Choice) <strong>"อายุของคุณ"</strong> คือปัจจัยสำคัญในการเลือกพอร์ต:
            </p>
            <ul className="text-sm text-violet-800 list-disc pl-5 mt-2 space-y-1">
              <li><strong>อายุน้อย (20-30 ปี):</strong> รับความเสี่ยงได้สูง ควรเลือกพอร์ตที่มีสัดส่วน "หุ้น" สูง (70-80%) เพื่อโอกาสรับผลตอบแทนระยะยาว</li>
              <li><strong>วัยกลางคน (30-45 ปี):</strong> ควรปรับพอร์ตให้สมดุลขึ้น มีตราสารหนี้ผสมกับหุ้นแบบละครึ่ง (50:50)</li>
              <li><strong>ใกล้เกษียณ (50 ปีขึ้นไป):</strong> ควรเน้นรักษาเงินต้นเป็นหลัก ลดสัดส่วนหุ้นลง และเน้น "ตราสารหนี้" ที่มีความมั่นคงสูง</li>
            </ul>
          </div>
        </article>
      )}
    </div>
  );
}

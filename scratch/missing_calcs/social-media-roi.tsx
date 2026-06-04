import React, { useState } from 'react';
import { Smartphone, Clock, TrendingDown, TrendingUp, DollarSign } from 'lucide-react';

export default function SocialMediaROI({ lang = 'TH' }: any) {
  const isTH = lang === 'TH';

  const [hoursPerDay, setHoursPerDay] = useState<number>(3);
  const [hourlyRate, setHourlyRate] = useState<number>(150);
  const [monthlyGain, setMonthlyGain] = useState<number>(0);

  const calculateROI = () => {
    const hoursPerMonth = hoursPerDay * 30;
    const hoursPerYear = hoursPerDay * 365;
    
    const monthlyCost = hoursPerMonth * hourlyRate;
    const yearlyCost = hoursPerYear * hourlyRate;
    
    const yearlyGain = monthlyGain * 12;
    
    const monthlyNet = monthlyGain - monthlyCost;
    const yearlyNet = yearlyGain - yearlyCost;
    
    const roiPercentage = monthlyCost > 0 ? ((monthlyNet) / monthlyCost) * 100 : 0;

    return {
      hoursPerMonth,
      hoursPerYear,
      monthlyCost,
      yearlyCost,
      yearlyGain,
      monthlyNet,
      yearlyNet,
      roiPercentage
    };
  };

  const results = calculateROI();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Smartphone className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isTH ? "เครื่องคำนวณความคุ้มค่าของการเล่นโซเชียล (Personal Social Media ROI)" : "Personal Social Media ROI Calculator"}
            </h1>
            <p className="text-gray-500 mt-1">
              {isTH ? "ประเมินมูลค่าเวลาที่คุณใช้ไปกับโซเชียลมีเดียเทียบกับผลตอบแทนที่ได้รับ" : "Calculate the value of time spent on social media versus your hourly worth."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "เวลาที่ใช้บนโซเชียลต่อวัน (ชั่วโมง)" : "Time spent on social media per day (Hours)"}
              </label>
              <input
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                {isTH ? "* เช่น เอาเงินเดือนหารด้วยชั่วโมงทำงานทั้งหมด หรือคิดจากค่าจ้างรายชั่วโมงที่คุณควรได้รับ" : "* E.g. your monthly salary divided by working hours, or your freelance hourly rate."}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "ผลตอบแทนที่ได้จากโซเชียลต่อเดือน (บาท)" : "Monthly gain from social media (THB)"}
              </label>
              <input
                type="number"
                min="0"
                value={monthlyGain}
                onChange={(e) => setMonthlyGain(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                {isTH ? "* เช่น รายได้จากการขายของ, คอนเทนต์, หรืองานที่ได้จากคอนเนคชั่น" : "* E.g. income from selling products, content creation, or network opportunities."}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">
              {isTH ? "ผลลัพธ์ของคุณ" : "Your Results"}
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{isTH ? "เวลาที่ใช้ไปต่อปี" : "Time spent per year"}</p>
                  <p className="text-xl font-bold text-gray-900">{results.hoursPerYear.toLocaleString()} {isTH ? "ชั่วโมง" : "Hours"}</p>
                  <p className="text-xs text-gray-500">
                    ({Math.round(results.hoursPerYear / 24)} {isTH ? "วันเต็มๆ!" : "full days!"})
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0 mt-1">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{isTH ? "ต้นทุนค่าเสียโอกาสต่อปี" : "Opportunity cost per year"}</p>
                  <p className="text-xl font-bold text-gray-900">{results.yearlyCost.toLocaleString()} {isTH ? "บาท" : "THB"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg shrink-0 mt-1">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{isTH ? "ผลตอบแทนสุทธิต่อปี (กำไร/ขาดทุนเวลา)" : "Net Yearly Return"}</p>
                  <p className={`text-xl font-bold ${results.yearlyNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {results.yearlyNet > 0 ? '+' : ''}{results.yearlyNet.toLocaleString()} {isTH ? "บาท" : "THB"}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">ROI (Return on Investment)</span>
                  <span className={`text-lg font-bold ${results.roiPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {results.roiPercentage.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="prose prose-blue max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2>ทำไมคุณถึงควรคำนวณ Personal Social Media ROI?</h2>
          <p>
            ในยุคดิจิทัล โซเชียลมีเดียเปรียบเสมือนอวัยวะที่ 33 ของมนุษย์เรา การตื่นเช้ามาเช็คฟีด การไถหน้าจอระหว่างรอรถ หรือการดูคลิปสั้นก่อนนอน ล้วนเป็นพฤติกรรมที่เราทำจนชิน 
            แต่คุณเคยตั้งคำถามไหมว่า "เวลาเหล่านั้นมีมูลค่าเท่าไหร่?" เครื่องคำนวณ Personal Social Media ROI ออกแบบมาเพื่อให้คุณเห็นตัวเลขที่แท้จริงของ "ต้นทุนค่าเสียโอกาส" (Opportunity Cost) ที่เกิดขึ้นจากการใช้งานโซเชียลมีเดีย
          </p>

          <h3>Personal Social Media ROI คืออะไร?</h3>
          <p>
            ROI ย่อมาจาก Return on Investment ซึ่งในทางธุรกิจใช้คำนวณความคุ้มค่าของการลงทุน แต่สำหรับบุคคลทั่วไป Personal Social Media ROI คือการเปรียบเทียบระหว่าง 
            <strong>"มูลค่าเวลาที่เราเสียไป"</strong> กับ <strong>"สิ่งที่เราได้กลับมา"</strong> 
          </p>
          <p>
            หากเราตีค่าตัวของเราเป็นรายชั่วโมง เช่น ชั่วโมงละ 150 บาท การเล่นโซเชียลมีเดียวันละ 3 ชั่วโมง จะคิดเป็นต้นทุนถึง 450 บาทต่อวัน หรือกว่า 13,500 บาทต่อเดือน! ซึ่งหากตลอดเดือนนั้นเราได้ความรู้หรือรายได้จากการเล่นโซเชียลมีเดียไม่คุ้มกับ 13,500 บาท นั่นแปลว่าเรากำลังติดลบหรือมี ROI ที่เป็นลบนั่นเอง
          </p>

          <h3>ผลกระทบที่ซ่อนอยู่ของการเลื่อนจอ (Endless Scrolling)</h3>
          <ul>
            <li><strong>สูญเสียเวลาที่สามารถนำไปพัฒนาตนเอง:</strong> เวลา 3 ชั่วโมงต่อวัน สามารถนำไปเรียนภาษาใหม่ อ่านหนังสือได้ 1 เล่ม หรือออกกำลังกายได้สบายๆ</li>
            <li><strong>ความเหนื่อยล้าทางสมอง:</strong> การรับข้อมูลมหาศาลตลอดเวลา ทำให้สมองทำงานหนัก ส่งผลต่อสมาธิและประสิทธิภาพในการทำงานหลักของคุณ</li>
            <li><strong>ผลกระทบต่อสุขภาพจิต:</strong> การเปรียบเทียบชีวิตตัวเองกับภาพลักษณ์ที่สมบูรณ์แบบบนโซเชียลมีเดียอาจทำให้เกิดความเครียดและความไม่พึงพอใจในตัวเอง</li>
          </ul>

          <h3>วิธีเพิ่ม ROI ให้กับการเล่นโซเชียลมีเดียของคุณ</h3>
          <p>
            การมี ROI ติดลบไม่ได้หมายความว่าคุณต้องเลิกเล่นโซเชียลมีเดียเด็ดขาด แต่หมายถึงการปรับเปลี่ยนวิธีการใช้งานให้เกิดประโยชน์สูงสุด
          </p>
          <ol>
            <li><strong>เปลี่ยนจากผู้บริโภคเป็นผู้สร้าง (Consumer to Creator):</strong> ลองแบ่งเวลาจากการดูคอนเทนต์ของคนอื่น มาสร้างคอนเทนต์ของตัวเอง ไม่ว่าจะเป็นการเขียนบทความ ทำวิดีโอ หรือแชร์ความรู้ ซึ่งอาจนำไปสู่รายได้ในอนาคต</li>
            <li><strong>คัดกรองสิ่งที่ติดตาม (Curate your feed):</strong> เลิกติดตามเพจหรือแอคเคาท์ที่ทำให้เสียสุขภาพจิต แล้วหันมาติดตามเพจให้ความรู้ ข่าวสารในสายอาชีพ หรือสิ่งที่เป็นแรงบันดาลใจให้คุณพัฒนาตัวเอง</li>
            <li><strong>กำหนดเวลาใช้งานที่ชัดเจน (Time-boxing):</strong> ใช้ฟีเจอร์จำกัดเวลาของสมาร์ทโฟน เพื่อไม่ให้ตัวเองเผลอไถหน้าจอเพลินจนเกินเวลาที่ตั้งใจไว้</li>
            <li><strong>ใช้เป็นเครื่องมือสร้างเครือข่าย (Networking):</strong> ใช้แพลตฟอร์มอย่าง LinkedIn หรือกลุ่ม Facebook เฉพาะทางในการทำความรู้จักกับคนในสายงาน ซึ่งอาจสร้างโอกาสทางธุรกิจหรือการงานที่มีมูลค่าสูงในอนาคต</li>
          </ol>

          <h3>สรุป</h3>
          <p>
            เวลาคือสินทรัพย์เดียวที่เราไม่สามารถหาเพิ่มได้ การคำนวณ Personal Social Media ROI ไม่ได้ทำเพื่อให้เรารู้สึกผิดที่ใช้เวลาพักผ่อน แต่เพื่อให้เรามี <strong>ความตระหนักรู้ (Self-awareness)</strong> 
            ว่าเรากำลังนำสินทรัพย์ที่มีค่าที่สุดไปลงทุนกับสิ่งใด และปรับสมดุลให้โซเชียลมีเดียเป็นเครื่องมือที่รับใช้เรา ไม่ใช่ให้เราตกเป็นทาสของมัน
          </p>
        </article>
      )}
    </div>
  );
}

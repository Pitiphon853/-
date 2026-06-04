"use client";
import { useState } from "react";
import { Calculator, BookOpen, TrendingUp, DollarSign, Clock } from "lucide-react";

export default function OnlineCourseRoi({ lang }: any) {
  const [courseCost, setCourseCost] = useState<number>(5000);
  const [studyHours, setStudyHours] = useState<number>(40);
  const [hourlyRate, setHourlyRate] = useState<number>(300);
  const [salaryIncrease, setSalaryIncrease] = useState<number>(5000);
  const [monthsToApply, setMonthsToApply] = useState<number>(12);
  const [otherCosts, setOtherCosts] = useState<number>(500);

  const opportunityCost = studyHours * hourlyRate;
  const totalCost = courseCost + opportunityCost + otherCosts;
  const totalBenefit = salaryIncrease * monthsToApply;
  const netGain = totalBenefit - totalCost;
  const roi = totalCost > 0 ? ((netGain / totalCost) * 100) : 0;
  const paybackMonths = salaryIncrease > 0 ? totalCost / salaryIncrease : 0;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="text-indigo-600 w-8 h-8" />
          <h2 className="text-2xl font-bold text-gray-800">Online Course ROI Calculator</h2>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ค่าคอร์สเรียน (บาท)</label>
            <input type="number" value={courseCost} onChange={e => setCourseCost(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">เวลาเรียนทั้งหมด (ชั่วโมง)</label>
              <input type="number" value={studyHours} onChange={e => setStudyHours(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ค่าแรง/ชม. ของคุณ (บาท)</label>
              <input type="number" value={hourlyRate} onChange={e => setHourlyRate(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">รายได้เพิ่ม/เดือน หลังเรียน (บาท)</label>
              <input type="number" value={salaryIncrease} onChange={e => setSalaryIncrease(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ระยะเวลาใช้ประโยชน์ (เดือน)</label>
              <input type="number" value={monthsToApply} onChange={e => setMonthsToApply(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ค่าใช้จ่ายอื่นๆ เช่น หนังสือ, อุปกรณ์ (บาท)</label>
            <input type="number" value={otherCosts} onChange={e => setOtherCosts(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" /> ผลการวิเคราะห์
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">ค่าเสียโอกาส (เวลาเรียน)</p>
              <p className="text-xl font-bold text-gray-700">{opportunityCost.toLocaleString()} บาท</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">ต้นทุนรวมทั้งหมด</p>
              <p className="text-xl font-bold text-red-600">{totalCost.toLocaleString()} บาท</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">ผลประโยชน์รวม</p>
              <p className="text-xl font-bold text-green-600">{totalBenefit.toLocaleString()} บาท</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">กำไร/ขาดทุนสุทธิ</p>
              <p className={`text-xl font-bold ${netGain >= 0 ? "text-green-600" : "text-red-600"}`}>{netGain.toLocaleString()} บาท</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={`rounded-xl p-5 text-center ${roi >= 0 ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
              <DollarSign className={`w-8 h-8 mx-auto mb-1 ${roi >= 0 ? "text-green-500" : "text-red-500"}`} />
              <p className="text-sm text-gray-600">ROI</p>
              <p className={`text-3xl font-extrabold ${roi >= 0 ? "text-green-700" : "text-red-700"}`}>{roi.toFixed(1)}%</p>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 text-center">
              <Clock className="w-8 h-8 mx-auto mb-1 text-indigo-500" />
              <p className="text-sm text-gray-600">ระยะเวลาคืนทุน</p>
              <p className="text-3xl font-extrabold text-indigo-700">{paybackMonths.toFixed(1)} เดือน</p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="prose max-w-2xl mx-auto text-gray-700">
        <h2>ค่าใช้จ่ายเรียน Online Course ROI คืออะไร? ทำไมต้องคำนวณก่อนลงทุน</h2>
        <p>
          ในยุคที่การเรียนรู้ออนไลน์เฟื่องฟู แพลตฟอร์มอย่าง Udemy, Coursera, Skillshare และ edX ต่างนำเสนอคอร์สมากมายให้เลือกเรียน
          ตั้งแต่ทักษะด้านเทคโนโลยี การตลาดดิจิทัล ไปจนถึงการพัฒนาตัวเอง หลายคนมักกระโจนซื้อคอร์สโดยไม่ได้คิดคำนวณว่า
          จริงๆ แล้วการลงทุนนี้คุ้มค่าหรือไม่ นี่คือเหตุผลที่คุณควรใช้เครื่องมือคำนวณ Online Course ROI ก่อนตัดสินใจจ่ายเงิน
        </p>
        <h3>ROI ของการเรียนออนไลน์คำนวณอย่างไร?</h3>
        <p>
          ROI (Return on Investment) คือตัวเลขที่บ่งบอกว่าเงินที่ลงทุนไปนั้นได้ผลตอบแทนกลับมาเท่าไหร่ สำหรับคอร์สเรียนออนไลน์
          ต้นทุนไม่ได้มีเพียงค่าคอร์สเท่านั้น แต่ยังรวมถึง "ค่าเสียโอกาส" (Opportunity Cost) ซึ่งคือเวลาที่คุณใช้ไปในการเรียน
          หากเวลาเดียวกันนั้นคุณสามารถทำงานหาเงินได้ ค่าเสียโอกาสจึงเท่ากับ จำนวนชั่วโมงเรียน คูณด้วย อัตราค่าแรงต่อชั่วโมง
          นอกจากนี้ยังมีค่าใช้จ่ายเพิ่มเติม เช่น ค่าหนังสือ ค่าอุปกรณ์ ค่า Software License ต่างๆ
        </p>
        <h3>ทำไมต้องคิดเรื่อง Payback Period?</h3>
        <p>
          Payback Period หรือระยะเวลาคืนทุน บอกให้คุณรู้ว่าต้องใช้เวลากี่เดือนกว่าผลตอบแทนจากการเรียนจะชดเชยต้นทุนที่จ่ายไปทั้งหมด
          หากคอร์สราคา 10,000 บาท มีค่าเสียโอกาส 12,000 บาท แต่ช่วยให้คุณมีรายได้เพิ่มเดือนละ 5,000 บาท Payback Period จะอยู่ที่
          ประมาณ 4.4 เดือน ซึ่งถือว่าเป็นการลงทุนที่คุ้มค่ามาก
        </p>
        <h3>ปัจจัยที่มีผลต่อ ROI ของคอร์สเรียน</h3>
        <p>
          ปัจจัยสำคัญที่ส่งผลต่อ ROI ได้แก่ คุณภาพของเนื้อหาคอร์ส ความสามารถในการนำไปประยุกต์ใช้งานจริง ระดับ Demand ของทักษะนั้นๆ ในตลาดแรงงาน
          และระยะเวลาที่ทักษะดังกล่าวยังคงมีคุณค่า ตัวอย่างเช่น คอร์ส Data Science หรือ AI มักมี ROI สูงเพราะตลาดต้องการทักษะเหล่านี้อย่างมาก
          ในขณะที่คอร์สบางประเภทอาจมีผลตอบแทนทางอ้อม เช่น เพิ่มความมั่นใจ หรือสร้าง Network ใหม่
        </p>
        <h3>เคล็ดลับเพิ่ม ROI ของการเรียนออนไลน์</h3>
        <p>
          เพื่อเพิ่ม ROI ควรเลือกคอร์สที่มีรีวิวดี มี Project-Based Learning ที่สามารถนำผลงานไปใส่ Portfolio ได้ เรียนให้จบภายในกรอบเวลาที่กำหนด
          และนำความรู้ไปใช้ทำโปรเจคจริงทันที อย่าลืมว่าคอร์สที่ดีที่สุดคือคอร์สที่คุณเรียนจบและนำไปใช้ได้จริง ไม่ใช่คอร์สที่ราคาถูกที่สุด
          การคำนวณ ROI ก่อนตัดสินใจจะช่วยให้คุณเลือกลงทุนในการเรียนรู้อย่างชาญฉลาดและคุ้มค่าที่สุด
        </p>
      </article>
    </div>
  );
}

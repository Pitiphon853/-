import React, { useState } from 'react';
import { Heart, DollarSign, Clock, ThumbsUp } from 'lucide-react';

export default function HappinessRoi({ lang }: any) {
  const [cost, setCost] = useState<number>(0);
  const [lifespan, setLifespan] = useState<number>(1);
  const [usageFreq, setUsageFreq] = useState<number>(1); // Uses per week
  const [joyLevel, setJoyLevel] = useState<number>(5); // 1-10

  const calculate = () => {
    const totalUses = usageFreq * 52 * lifespan;
    if (totalUses === 0 || cost === 0) return { costPerUse: 0, happinessScore: 0, totalUses: 0 };
    
    const costPerUse = cost / totalUses;
    const happinessScore = (joyLevel * totalUses) / cost; // arbitrary formula

    return { costPerUse, happinessScore, totalUses };
  };

  const { costPerUse, happinessScore, totalUses } = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Heart className="w-6 h-6 mr-2 text-red-500" />
        {lang === 'EN' ? 'Happiness ROI from Purchases' : 'คำนวณผลตอบแทนความสุขจากการซื้อของ'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'EN' ? 'Item Cost' : 'ราคาสิ่งของ'}
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={cost || ''}
                onChange={(e) => setCost(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="0"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'EN' ? 'Expected Lifespan (Years)' : 'อายุการใช้งานที่คาดหวัง (ปี)'}
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={lifespan || ''}
                onChange={(e) => setLifespan(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="1"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'EN' ? 'Usage Frequency (Times per week)' : 'ความถี่ในการใช้งาน (ครั้งต่อสัปดาห์)'}
            </label>
            <input
              type="number"
              value={usageFreq || ''}
              onChange={(e) => setUsageFreq(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'EN' ? 'Joy Level (1-10)' : 'ระดับความสุข (1-10)'}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={joyLevel}
              onChange={(e) => setJoyLevel(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-1 text-red-500 font-semibold">{joyLevel}</div>
          </div>
        </div>

        <div className="bg-red-50 p-6 rounded-xl border border-red-100 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-red-800 mb-4 text-center">
            {lang === 'EN' ? 'Happiness Return' : 'ผลตอบแทนความสุข'}
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
              <div className="text-sm text-gray-500 mb-1">{lang === 'EN' ? 'Cost Per Use' : 'ต้นทุนต่อการใช้งาน'}</div>
              <div className="text-2xl font-bold text-gray-800">
                {costPerUse.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {lang === 'EN' ? 'units' : 'บาท'}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
              <div className="text-sm text-gray-500 mb-1">{lang === 'EN' ? 'Total Uses' : 'จำนวนครั้งที่ใช้งานทั้งหมด'}</div>
              <div className="text-xl font-bold text-gray-800">
                {totalUses.toLocaleString()} {lang === 'EN' ? 'times' : 'ครั้ง'}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
              <div className="text-sm text-gray-500 mb-1">{lang === 'EN' ? 'Happiness Score (Joy × Uses / Cost)' : 'คะแนนความสุข'}</div>
              <div className="text-2xl font-bold text-red-600 flex items-center">
                <ThumbsUp className="w-5 h-5 mr-2" />
                {happinessScore.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-red max-w-none text-gray-700">
        <h2>{lang === 'EN' ? 'Understanding Happiness ROI' : 'ความเข้าใจเรื่องผลตอบแทนความสุขจากการซื้อของ (Happiness ROI)'}</h2>
        {lang === 'EN' ? (
          <>
            <p>Happiness Return on Investment (ROI) is a concept that goes beyond financial metrics. It's about evaluating purchases not just by their price tag, but by the joy and utility they bring to your life over time.</p>
            <p>Many of us fall into the trap of buying things impulsively without considering how much actual use we will get out of them. A low-cost item might seem like a bargain, but if it breaks quickly or brings no joy, its Happiness ROI is low. Conversely, an expensive item that you use daily and love can have an incredibly high Happiness ROI.</p>
            <h3>How to Evaluate Happiness ROI?</h3>
            <ul>
              <li><strong>Cost Per Use:</strong> Divide the total cost of the item by the estimated number of times you will use it.</li>
              <li><strong>Joy Factor:</strong> Does the item genuinely make you happy, solve a problem, or improve your quality of life?</li>
              <li><strong>Longevity:</strong> Will this item last for years, or will it need to be replaced soon?</li>
            </ul>
            <p>By shifting our perspective from "How much does it cost?" to "How much joy and utility will it bring over its lifetime?", we can make more mindful purchasing decisions. This approach can lead to saving money in the long run and filling our lives with items that truly matter and enhance our well-being.</p>
            <p>Next time you are considering a purchase, use this Happiness ROI calculator to estimate its true value. Ask yourself if the investment aligns with your personal happiness and lifestyle goals. You might find that some expensive items are incredibly worth it, while many cheap ones are just a waste of money.</p>
          </>
        ) : (
          <>
            <p>ผลตอบแทนความสุขจากการลงทุน (Happiness ROI) เป็นแนวคิดที่ก้าวข้ามเพียงแค่ตัวชี้วัดทางการเงิน มันคือการประเมินการซื้อสิ่งของต่างๆ ไม่ใช่แค่ดูที่ป้ายราคา แต่ดูที่ความสุขและประโยชน์ใช้สอยที่สิ่งนั้นนำมาสู่ชีวิตของคุณเมื่อเวลาผ่านไป</p>
            <p>หลายคนมักตกหลุมพรางของการซื้อของตามอารมณ์โดยไม่ได้พิจารณาว่าเราจะได้ใช้งานมันจริงๆ มากน้อยแค่ไหน ของราคาถูกอาจดูเหมือนคุ้มค่า แต่ถ้ามันพังเร็วหรือไม่ได้ทำให้เรามีความสุขเลย Happiness ROI ของมันก็ต่ำมาก ในทางกลับกัน ของราคาแพงที่คุณใช้ทุกวันและรักมันมาก อาจมี Happiness ROI ที่สูงอย่างไม่น่าเชื่อ</p>
            <h3>วิธีการประเมิน Happiness ROI?</h3>
            <ul>
              <li><strong>ต้นทุนต่อการใช้งาน (Cost Per Use):</strong> หารต้นทุนรวมของสิ่งของด้วยจำนวนครั้งโดยประมาณที่คุณจะได้ใช้งานมัน</li>
              <li><strong>ปัจจัยความสุข (Joy Factor):</strong> สิ่งของชิ้นนั้นทำให้คุณมีความสุขอย่างแท้จริง ช่วยแก้ปัญหา หรือพัฒนาคุณภาพชีวิตของคุณหรือไม่?</li>
              <li><strong>ความทนทาน (Longevity):</strong> สิ่งของชิ้นนี้จะอยู่ได้นานหลายปี หรือจะต้องเปลี่ยนใหม่ในเร็วๆ นี้?</li>
            </ul>
            <p>ด้วยการเปลี่ยนมุมมองจาก "ราคาเท่าไหร่?" ไปเป็น "มันจะนำความสุขและประโยชน์มาให้มากแค่ไหนตลอดอายุการใช้งาน?" เราจะสามารถตัดสินใจซื้ออย่างมีสติมากขึ้น แนวทางนี้อาจนำไปสู่การประหยัดเงินในระยะยาวและเติมเต็มชีวิตของเราด้วยสิ่งของที่มีความหมายและยกระดับความเป็นอยู่ของเราอย่างแท้จริง</p>
            <p>การคำนวณต้นทุนต่อการใช้งานจะช่วยให้คุณเห็นภาพชัดเจนขึ้นว่า สิ่งของที่คุณซื้อมานั้นคุ้มค่าหรือไม่ ตัวอย่างเช่น รองเท้าราคา 3,000 บาทที่คุณใส่ทุกวันเป็นเวลาหนึ่งปี (365 ครั้ง) จะมีต้นทุนต่อการใช้งานเพียงประมาณ 8 บาท ในขณะที่รองเท้าราคา 1,000 บาทที่คุณใส่เพียงครั้งเดียวจะมีต้นทุนต่อการใช้งานถึง 1,000 บาท การพิจารณาระดับความสุขประกอบด้วยจะยิ่งทำให้เห็นความคุ้มค่าที่แท้จริง</p>
            <p>ครั้งต่อไปที่คุณกำลังพิจารณาจะซื้อของ ลองใช้เครื่องคำนวณ Happiness ROI นี้เพื่อประเมินมูลค่าที่แท้จริงของมัน ถามตัวเองว่าการลงทุนนั้นสอดคล้องกับความสุขส่วนตัวและเป้าหมายในการใช้ชีวิตของคุณหรือไม่ คุณอาจพบว่าของแพงบางชิ้นก็คุ้มค่าอย่างยิ่ง ในขณะที่ของถูกหลายชิ้นอาจเป็นเพียงการเสียเงินเปล่า การใช้จ่ายอย่างชาญฉลาดไม่ใช่การซื้อของที่ถูกที่สุด แต่คือการซื้อของที่ให้ผลตอบแทนเป็นความสุขที่คุ้มค่าที่สุด</p>
          </>
        )}
      </div>
    </div>
  );
}

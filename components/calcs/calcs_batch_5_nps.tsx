import React, { useState } from 'react';
import { Smile, Frown, Meh, Calculator, BarChart, Info, Heart } from 'lucide-react';

export default function NPSCalculator({ lang }: any) {
  const [promoters, setPromoters] = useState<number>(50);
  const [passives, setPassives] = useState<number>(30);
  const [detractors, setDetractors] = useState<number>(20);

  const totalResponses = promoters + passives + detractors;
  
  const promoterPercent = totalResponses > 0 ? (promoters / totalResponses) * 100 : 0;
  const passivePercent = totalResponses > 0 ? (passives / totalResponses) * 100 : 0;
  const detractorPercent = totalResponses > 0 ? (detractors / totalResponses) * 100 : 0;

  const npsScore = Math.round(promoterPercent - detractorPercent);

  // Determine NPS Category
  let npsColor = 'text-gray-600';
  let npsBg = 'bg-gray-100';
  let npsStatus = '';
  
  if (npsScore >= 70) {
    npsColor = 'text-green-600';
    npsBg = 'bg-green-100';
    npsStatus = 'ยอดเยี่ยม (Excellent)';
  } else if (npsScore >= 30) {
    npsColor = 'text-blue-600';
    npsBg = 'bg-blue-100';
    npsStatus = 'ดีมาก (Great)';
  } else if (npsScore > 0) {
    npsColor = 'text-yellow-600';
    npsBg = 'bg-yellow-100';
    npsStatus = 'ดี (Good)';
  } else {
    npsColor = 'text-red-600';
    npsBg = 'bg-red-100';
    npsStatus = 'ต้องปรับปรุงด่วน (Needs Improvement)';
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-sm">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-pink-100 text-pink-600 rounded-full mx-auto mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Net Promoter Score (NPS) Calculator</h2>
        <p className="text-gray-600">คำนวณคะแนนความพึงพอใจและความภักดีของลูกค้า</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <Calculator className="w-5 h-5 mr-2 text-pink-500" />
            ข้อมูลผลสำรวจลูกค้า
          </h3>
          <p className="text-xs text-gray-500 mb-4">ใส่จำนวนลูกค้าที่โหวตคะแนน 0-10 ให้กับธุรกิจของคุณ</p>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-medium text-green-700 mb-1">
                <Smile className="w-4 h-4 mr-1" /> ลูกค้าที่ให้คะแนน 9-10 (Promoters)
              </label>
              <input
                type="number"
                min="0"
                value={promoters}
                onChange={(e) => setPromoters(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-gray-500 mt-1">กลุ่มแฟนคลับ พร้อมบอกต่อ</p>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-yellow-700 mb-1">
                <Meh className="w-4 h-4 mr-1" /> ลูกค้าที่ให้คะแนน 7-8 (Passives)
              </label>
              <input
                type="number"
                min="0"
                value={passives}
                onChange={(e) => setPassives(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
              <p className="text-xs text-gray-500 mt-1">กลุ่มเฉยๆ อาจย้ายไปใช้คู่แข่งได้</p>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-red-700 mb-1">
                <Frown className="w-4 h-4 mr-1" /> ลูกค้าที่ให้คะแนน 0-6 (Detractors)
              </label>
              <input
                type="number"
                min="0"
                value={detractors}
                onChange={(e) => setDetractors(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
              <p className="text-xs text-gray-500 mt-1">กลุ่มไม่พอใจ มีโอกาสพูดถึงแบรนด์ในแง่ลบ</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-pink-50 p-6 rounded-xl border border-pink-100">
            <h3 className="text-lg font-semibold text-pink-900 mb-4 flex items-center">
              <BarChart className="w-5 h-5 mr-2" />
              ผลลัพธ์ NPS
            </h3>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100 mb-6 text-center">
              <p className="text-sm text-gray-500 mb-2">คะแนน NPS (จาก -100 ถึง 100)</p>
              <div className="flex flex-col items-center justify-center">
                <p className={`text-6xl font-bold ${npsColor}`}>
                  {npsScore}
                </p>
                <span className={`mt-3 px-3 py-1 rounded-full text-sm font-medium ${npsBg} ${npsColor}`}>
                  {npsStatus}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">สัดส่วนลูกค้า (รวม {totalResponses} คน)</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Smile className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-gray-600">Promoters</span>
                </div>
                <span className="font-medium text-green-600">{promoterPercent.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${promoterPercent}%` }}></div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Meh className="w-4 h-4 mr-2 text-yellow-500" />
                  <span className="text-gray-600">Passives</span>
                </div>
                <span className="font-medium text-yellow-600">{passivePercent.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${passivePercent}%` }}></div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Frown className="w-4 h-4 mr-2 text-red-500" />
                  <span className="text-gray-600">Detractors</span>
                </div>
                <span className="font-medium text-red-600">{detractorPercent.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${detractorPercent}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              <strong>วิธีคำนวณ:</strong> นำเปอร์เซ็นต์ของ Promoters มาลบด้วยเปอร์เซ็นต์ของ Detractors โดยไม่ต้องนำกลุ่ม Passives มาคำนวณ (NPS = %Promoters - %Detractors)
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-pink max-w-none">
        <h2>NPS (Net Promoter Score) คืออะไร? ดัชนีชี้วัดความภักดีของลูกค้า</h2>
        <p>
          ในยุคที่ผู้บริโภคมีตัวเลือกมากมาย การทำธุรกิจไม่สามารถวัดความสำเร็จด้วย "ยอดขาย" เพียงอย่างเดียวอีกต่อไป ธุรกิจชั้นนำระดับโลกจึงหันมาให้ความสำคัญกับ <strong>NPS (Net Promoter Score)</strong> ซึ่งเป็นดัชนีชี้วัดความพึงพอใจและ "ความภักดี" (Loyalty) ของลูกค้าที่มีต่อแบรนด์
        </p>

        <h3>NPS มาจากคำถามเพียงข้อเดียว</h3>
        <p>
          หลักการของ NPS ถูกคิดค้นขึ้นโดย Fred Reichheld ร่วมกับ Bain & Company โดยอิงจากการถามลูกค้าด้วยคำถามที่ทรงพลังที่สุดเพียง 1 ข้อ คือ:
        </p>
        <blockquote className="bg-pink-50 border-l-4 border-pink-500 italic p-4 text-pink-900 rounded-r">
          "จากคะแนน 0-10 คุณมีโอกาสที่จะแนะนำสินค้า/บริการของเรา ให้เพื่อนหรือคนรู้จักมากน้อยแค่ไหน?"
        </blockquote>
        
        <p>จากนั้นนำคะแนนที่ได้มาแบ่งกลุ่มลูกค้าเป็น 3 ประเภท:</p>
        <ul>
          <li><strong>Promoters (ให้คะแนน 9-10):</strong> กลุ่มลูกค้าที่มีความจงรักภักดีสูง (Loyal Fans) ชอบสินค้ามากจนพร้อมที่จะกลายเป็น "กระบอกเสียง" แนะนำคนอื่นให้มาซื้อ (Word-of-Mouth) กลุ่มนี้จะซื้อซ้ำและช่วยสร้างการเติบโตให้ธุรกิจอย่างยั่งยืน</li>
          <li><strong>Passives (ให้คะแนน 7-8):</strong> กลุ่มลูกค้าที่พึงพอใจแต่ "เฉยๆ" ไม่ได้ผูกพันกับแบรนด์เป็นพิเศษ พร้อมที่จะย้ายไปใช้สินค้าของคู่แข่งทันทีที่มีโปรโมชันหรือข้อเสนอที่ดีกว่า กลุ่มนี้จะไม่ถูกนำมาคิดในสูตร NPS</li>
          <li><strong>Detractors (ให้คะแนน 0-6):</strong> กลุ่มลูกค้าที่ไม่พอใจ (Unhappy Customers) นอกจากพวกเขาจะไม่กลับมาซื้อซ้ำแล้ว ยังมีความเสี่ยงสูงมากที่จะไปรีวิวในแง่ลบ หรือบอกต่อเพื่อนๆ ไม่ให้มาใช้บริการแบรนด์ของคุณ</li>
        </ul>

        <h3>สูตรและวิธีคำนวณ NPS</h3>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-center my-4 border border-gray-200">
          NPS = (% ลูกค้ากลุ่ม Promoters) - (% ลูกค้ากลุ่ม Detractors)
        </div>
        <p>
          ผลลัพธ์ของคะแนน NPS จะไม่ออกมาเป็นเปอร์เซ็นต์ แต่จะเป็น "ตัวเลขดิบ" ที่มีค่าตั้งแต่ <strong>-100</strong> (ทุกคนเป็น Detractor หมด) จนถึง <strong>+100</strong> (ทุกคนเป็น Promoter หมด)
        </p>

        <h3>เกณฑ์การประเมินคะแนน NPS</h3>
        <p>
          คะแนน NPS เท่าไหร่ถึงจะเรียกว่าดี? เกณฑ์มาตรฐานอาจแตกต่างกันไปตามอุตสาหกรรม (Industry Benchmark) แต่โดยหลักสากลแล้ว:
        </p>
        <ul>
          <li><strong>คะแนนต่ำกว่า 0:</strong> สัญญาณอันตราย! แสดงว่าธุรกิจของคุณมีคนต่อต้านและด่ามากกว่าคนชม ต้องรีบแก้ไขคุณภาพสินค้าหรือการบริการโดยด่วน</li>
          <li><strong>คะแนน 1 - 30:</strong> ถือว่า <strong>ดี (Good)</strong> ธุรกิจสอบผ่าน มีฐานลูกค้าที่ชื่นชอบแบรนด์</li>
          <li><strong>คะแนน 31 - 70:</strong> ถือว่า <strong>ดีมาก (Great)</strong> ธุรกิจแข็งแกร่ง มีฐานลูกค้าประจำสูง คู่แข่งแย่งตลาดได้ยาก</li>
          <li><strong>คะแนน 71 - 100:</strong> ถือว่า <strong>ยอดเยี่ยมระดับโลก (Excellent)</strong> ระดับเดียวกับ Apple, Tesla, หรือ Starbucks ซึ่งแบรนด์เหล่านี้แทบไม่ต้องใช้งบโฆษณาหาลูกค้าใหม่ เพราะลูกค้าเก่าจะชักชวนเพื่อนมาให้เอง</li>
        </ul>

        <p>
          <strong>สรุป:</strong> การวัดผล NPS เป็นประจำ (เช่น ทุกไตรมาส) และการตามไปสอบถาม (Follow-up) เหตุผลเชิงลึกว่าทำไมลูกค้าถึงให้คะแนน 0-6 เพื่อนำมาปรับปรุง จะช่วยอุดรอยรั่วของธุรกิจ และดันให้แบรนด์เติบโตไปข้างหน้าได้อย่างมั่นคง
        </p>
      </div>
    </div>
  );
}

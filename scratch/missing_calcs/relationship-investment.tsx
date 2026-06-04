import React, { useState } from 'react';
import { Users, Heart, MessageCircle } from 'lucide-react';

export default function RelationshipInvestment({ lang }: any) {
  const [partnerHours, setPartnerHours] = useState<number>(10);
  const [familyHours, setFamilyHours] = useState<number>(5);
  const [friendHours, setFriendHours] = useState<number>(3);
  const [qualityLevel, setQualityLevel] = useState<number>(7); // 1-10

  const calculate = () => {
    const totalHours = partnerHours + familyHours + friendHours;
    const baseScore = totalHours * qualityLevel;
    
    // Normalize to a max of roughly 100 for a healthy active person (e.g., 20 hours * 10 = 200)
    const investmentScore = Math.min(100, (baseScore / 200) * 100);

    let status = '';
    let advice = '';

    if (investmentScore >= 80) {
      status = lang === 'EN' ? 'Deeply Connected' : 'เชื่อมโยงอย่างลึกซึ้ง';
      advice = lang === 'EN' ? 'You invest significantly in your relationships with high quality time.' : 'คุณลงทุนในความสัมพันธ์อย่างมากด้วยเวลาที่มีคุณภาพสูง';
    } else if (investmentScore >= 50) {
      status = lang === 'EN' ? 'Well Balanced' : 'สมดุลดีเยี่ยม';
      advice = lang === 'EN' ? 'You maintain good connections, though there is always room to deepen them.' : 'คุณรักษาความสัมพันธ์ได้ดี แม้ว่าจะมีพื้นที่ให้พัฒนาให้ลึกซึ้งยิ่งขึ้นเสมอ';
    } else if (investmentScore >= 25) {
      status = lang === 'EN' ? 'Needs Attention' : 'ต้องการความใส่ใจ';
      advice = lang === 'EN' ? 'Your relationships might be feeling neglected. Try to carve out more dedicated time.' : 'ความสัมพันธ์ของคุณอาจถูกละเลย ลองพยายามจัดสรรเวลาให้มากขึ้น';
    } else {
      status = lang === 'EN' ? 'Disconnected' : 'ห่างเหิน';
      advice = lang === 'EN' ? 'You are currently not investing much time in your relationships. It is time to reconnect.' : 'ปัจจุบันคุณไม่ค่อยได้ลงทุนเวลาในความสัมพันธ์ ถึงเวลาต้องสานสัมพันธ์ใหม่แล้ว';
    }

    return { totalHours, investmentScore, status, advice };
  };

  const { totalHours, investmentScore, status, advice } = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Users className="w-6 h-6 mr-2 text-pink-500" />
        {lang === 'EN' ? 'Relationship Time Investment' : 'คำนวณเวลาลงทุนในความสัมพันธ์'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'EN' ? 'Hours with Partner / Spouse (Weekly)' : 'เวลาที่ใช้กับคู่รัก (ชั่วโมงต่อสัปดาห์)'}
            </label>
            <div className="relative">
              <Heart className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={partnerHours || ''}
                onChange={(e) => setPartnerHours(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'EN' ? 'Hours with Family / Kids (Weekly)' : 'เวลาที่ใช้กับครอบครัว / ลูก (ชั่วโมงต่อสัปดาห์)'}
            </label>
            <input
              type="number"
              value={familyHours || ''}
              onChange={(e) => setFamilyHours(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'EN' ? 'Hours with Friends (Weekly)' : 'เวลาที่ใช้กับเพื่อน (ชั่วโมงต่อสัปดาห์)'}
            </label>
            <input
              type="number"
              value={friendHours || ''}
              onChange={(e) => setFriendHours(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'EN' ? 'Quality of Time (1-10)' : 'คุณภาพของเวลา (1-10)'}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={qualityLevel}
              onChange={(e) => setQualityLevel(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-1 text-pink-500 font-semibold">{qualityLevel} {lang === 'EN' ? '(10 = Highly present & engaged)' : '(10 = ใส่ใจและมีส่วนร่วมอย่างเต็มที่)'}</div>
          </div>
        </div>

        <div className="bg-pink-50 p-6 rounded-xl border border-pink-100 flex flex-col justify-center text-center">
          <MessageCircle className="w-12 h-12 text-pink-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-pink-900 mb-2">
            {status}
          </h3>
          <p className="text-pink-700 mb-6">{advice}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-pink-100">
              <div className="text-sm text-gray-500 mb-1">{lang === 'EN' ? 'Total Hours' : 'ชั่วโมงรวม'}</div>
              <div className="text-2xl font-bold text-gray-800">{totalHours}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-pink-100">
              <div className="text-sm text-gray-500 mb-1">{lang === 'EN' ? 'Investment Score' : 'คะแนนการลงทุน'}</div>
              <div className="text-2xl font-bold text-pink-600">{investmentScore.toFixed(0)}/100</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-pink max-w-none text-gray-700">
        <h2>{lang === 'EN' ? 'Why Invest in Relationships?' : 'ทำไมต้องลงทุนในความสัมพันธ์?'}</h2>
        {lang === 'EN' ? (
          <>
            <p>Human beings are inherently social creatures. The quality of our relationships is one of the strongest predictors of our overall happiness, health, and longevity. However, strong relationships do not happen by accident; they require intentional investment of our most precious resource: time.</p>
            <p>It's easy to get caught up in the hustle of daily life—career ambitions, personal errands, and screen time—leaving our relationships with the leftover scraps of our time and energy. Over time, this lack of investment can lead to emotional distance, misunderstandings, and feelings of isolation.</p>
            <h3>Quantity vs. Quality</h3>
            <ul>
              <li><strong>Quantity of Time:</strong> You need enough time together to build a shared history, create memories, and foster trust.</li>
              <li><strong>Quality of Time:</strong> This means being truly present. Putting away your phone, actively listening, and engaging in meaningful conversations or activities together.</li>
            </ul>
            <p>Using the Relationship Time Investment Calculator helps you face the reality of how much time you are actually dedicating to the people who matter most. Are you spending 10 hours a week with your partner but scoring the quality as a 2 because you're always scrolling through your phone? That's a sign that the investment needs to change in quality, not just quantity.</p>
            <p>To improve your relationship investment, try scheduling "unplugged" time with loved ones. Establish rituals like weekly date nights, Sunday family dinners, or a regular coffee catch-up with a close friend. Small, consistent investments of high-quality time compound over the years, yielding deep, resilient bonds that support you through life's challenges and multiply your joys.</p>
          </>
        ) : (
          <>
            <p>มนุษย์เป็นสัตว์สังคมโดยธรรมชาติ คุณภาพของความสัมพันธ์ของเราเป็นหนึ่งในตัวบ่งชี้ที่แข็งแกร่งที่สุดสำหรับความสุข สุขภาพ และอายุยืนยาวโดยรวมของเรา อย่างไรก็ตาม ความสัมพันธ์ที่แข็งแกร่งไม่ได้เกิดขึ้นโดยบังเอิญ มันต้องการความตั้งใจในการลงทุนด้วยทรัพยากรที่มีค่าที่สุดของเรา นั่นคือ เวลา</p>
            <p>เป็นเรื่องง่ายที่เราจะถูกดึงดูดเข้าสู่วงจรความวุ่นวายของชีวิตประจำวัน ไม่ว่าจะเป็นความทะเยอทะยานในหน้าที่การงาน ธุระส่วนตัว และการใช้เวลากับหน้าจอ จนเหลือเวลาและพลังงานเพียงเศษเสี้ยวให้กับความสัมพันธ์ของเรา เมื่อเวลาผ่านไป การขาดการลงทุนนี้อาจนำไปสู่ความห่างเหินทางอารมณ์ ความเข้าใจผิด และความรู้สึกโดดเดี่ยว</p>
            <h3>ปริมาณ vs คุณภาพ</h3>
            <ul>
              <li><strong>ปริมาณของเวลา:</strong> คุณต้องการเวลามากพอที่จะสร้างประวัติศาสตร์ร่วมกัน สร้างความทรงจำ และส่งเสริมความไว้วางใจ</li>
              <li><strong>คุณภาพของเวลา:</strong> หมายถึงการอยู่ตรงนั้นอย่างแท้จริง การวางโทรศัพท์มือถือลง การรับฟังอย่างตั้งใจ และการมีส่วนร่วมในการสนทนาหรือกิจกรรมที่มีความหมายร่วมกัน</li>
            </ul>
            <p>การใช้เครื่องคำนวณเวลาลงทุนในความสัมพันธ์จะช่วยให้คุณเผชิญกับความเป็นจริงว่า คุณได้อุทิศเวลาให้กับคนสำคัญมากแค่ไหน คุณอาจใช้เวลากับคู่รัก 10 ชั่วโมงต่อสัปดาห์ แต่ประเมินคุณภาพไว้เพียงแค่ระดับ 2 เพราะคุณเอาแต่เลื่อนดูหน้าจอโทรศัพท์อยู่เสมอ นั่นคือสัญญาณว่าการลงทุนนั้นจำเป็นต้องเปลี่ยนในเรื่องคุณภาพ ไม่ใช่แค่ปริมาณ</p>
            <p>เพื่อปรับปรุงการลงทุนในความสัมพันธ์ของคุณ ลองกำหนดเวลา "งดใช้เทคโนโลยี" กับคนที่คุณรัก สร้างกิจวัตร เช่น คืนออกเดทประจำสัปดาห์ อาหารค่ำวันอาทิตย์กับครอบครัว หรือการไปดื่มกาแฟกับเพื่อนสนิทเป็นประจำ การลงทุนเล็กๆ น้อยๆ อย่างสม่ำเสมอด้วยเวลาคุณภาพสูง จะทบต้นขึ้นเรื่อยๆ เมื่อเวลาผ่านไป ก่อให้เกิดความผูกพันที่ลึกซึ้งและยืดหยุ่น ซึ่งจะคอยสนับสนุนคุณผ่านความท้าทายของชีวิตและเพิ่มพูนความสุขของคุณในระยะยาว</p>
          </>
        )}
      </div>
    </div>
  );
}

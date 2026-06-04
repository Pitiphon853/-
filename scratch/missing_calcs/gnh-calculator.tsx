import React, { useState } from 'react';
import { Smile, Sun, Heart, Users, DollarSign, Activity, Briefcase, Leaf } from 'lucide-react';

export default function GNHCalculator({ lang = 'TH' }: any) {
  const [scores, setScores] = useState({
    lifeSatisfaction: 5,
    physicalHealth: 5,
    mentalHealth: 5,
    financialSecurity: 5,
    communityVitality: 5,
    environmentalQuality: 5,
    timeUse: 5
  });

  const handleScoreChange = (domain: string, value: number) => {
    setScores(prev => ({
      ...prev,
      [domain]: value
    }));
  };

  const calculateGNH = () => {
    const total = Object.values(scores).reduce((acc, curr) => acc + curr, 0);
    const maxTotal = Object.keys(scores).length * 10;
    const percentage = (total / maxTotal) * 100;
    return percentage;
  };

  const gnhScore = calculateGNH();

  const getFeedback = (score: number) => {
    if (score >= 80) return lang === 'EN' ? 'Excellent Happiness Levels' : 'ระดับความสุขยอดเยี่ยม';
    if (score >= 60) return lang === 'EN' ? 'Good Happiness Levels' : 'ระดับความสุขดี';
    if (score >= 40) return lang === 'EN' ? 'Moderate Happiness Levels' : 'ระดับความสุขปานกลาง';
    return lang === 'EN' ? 'Needs Attention' : 'ควรได้รับการดูแลและปรับปรุง';
  };

  const domains = [
    { key: 'lifeSatisfaction', label: lang === 'EN' ? 'Life Satisfaction' : 'ความพึงพอใจในชีวิตโดยรวม', icon: Smile, color: 'bg-yellow-500' },
    { key: 'physicalHealth', label: lang === 'EN' ? 'Physical Health' : 'สุขภาพร่างกาย', icon: Activity, color: 'bg-red-500' },
    { key: 'mentalHealth', label: lang === 'EN' ? 'Mental Health' : 'สุขภาพจิตใจ', icon: Heart, color: 'bg-pink-500' },
    { key: 'financialSecurity', label: lang === 'EN' ? 'Financial Security' : 'ความมั่นคงทางการเงิน', icon: DollarSign, color: 'bg-green-500' },
    { key: 'communityVitality', label: lang === 'EN' ? 'Community & Relationships' : 'ความสัมพันธ์และสังคม', icon: Users, color: 'bg-blue-500' },
    { key: 'environmentalQuality', label: lang === 'EN' ? 'Environmental Quality' : 'สภาพแวดล้อมที่อยู่อาศัย', icon: Leaf, color: 'bg-teal-500' },
    { key: 'timeUse', label: lang === 'EN' ? 'Time Use / Work-Life Balance' : 'การบริหารเวลาและสมดุลชีวิต', icon: Briefcase, color: 'bg-purple-500' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
            <Sun className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {lang === 'EN' ? 'Gross National Happiness (GNH) Proxy' : 'แบบประเมินดัชนีความสุขมวลรวมจำลอง (GNH Proxy)'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {lang === 'EN' ? 'Rate each area of your life from 1 (lowest) to 10 (highest).' : 'ให้คะแนนความพึงพอใจในแต่ละด้านของชีวิตคุณ จาก 1 (น้อยที่สุด) ถึง 10 (มากที่สุด)'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            {domains.map((domain) => {
              const Icon = domain.icon;
              return (
                <div key={domain.key} className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-800">{domain.label}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{scores[domain.key as keyof typeof scores]} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={scores[domain.key as keyof typeof scores]}
                    onChange={(e) => handleScoreChange(domain.key, Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1 ({lang === 'EN' ? 'Poor' : 'แย่มาก'})</span>
                    <span>10 ({lang === 'EN' ? 'Excellent' : 'ดีเยี่ยม'})</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-6">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 text-center border border-yellow-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {lang === 'EN' ? 'Your GNH Score' : 'คะแนนความสุขมวลรวมของคุณ'}
                </h3>
                
                <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-full bg-white shadow-inner mb-4">
                  <svg className="w-full h-full absolute transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-yellow-500 transition-all duration-1000 ease-out"
                      strokeWidth="3"
                      strokeDasharray={`${gnhScore}, 100`}
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-gray-900">{Math.round(gnhScore)}</span>
                    <span className="text-sm text-gray-500">/ 100</span>
                  </div>
                </div>

                <div className="px-4 py-2 bg-white rounded-lg inline-block border border-gray-100">
                  <span className="font-semibold text-gray-800">{getFeedback(gnhScore)}</span>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-2 text-sm">
                  {lang === 'EN' ? 'Insights' : 'การวิเคราะห์เบื้องต้น'}
                </h4>
                <p className="text-sm text-blue-800 leading-relaxed">
                  {lang === 'EN' 
                    ? 'Happiness is multidimensional. While financial security is important, true well-being requires a balance across physical health, mental health, relationships, and how you use your time.'
                    : 'ความสุขประกอบด้วยหลากหลายมิติ แม้ความมั่นคงทางการเงินจะสำคัญ แต่สุขภาวะที่แท้จริงต้องอาศัยความสมดุลทั้งสุขภาพกาย จิตใจ ความสัมพันธ์ และการใช้เวลาอย่างมีคุณค่า'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ทำความรู้จักกับ Gross National Happiness (GNH) ดัชนีความสุขที่มากกว่าเรื่องเงินทอง
        </h2>
        
        <p>
          เป็นเวลาหลายทศวรรษที่ทั่วโลกใช้ <strong>GDP (Gross Domestic Product - ผลิตภัณฑ์มวลรวมในประเทศ)</strong> เป็นมาตรวัดความสำเร็จและการพัฒนาของประเทศ แต่ตัวเลขทางเศรษฐกิจเพียงอย่างเดียว ไม่สามารถตอบโจทย์ "คุณภาพชีวิต" หรือ "ความสุข" ที่แท้จริงของประชากรได้ แนวคิดเรื่อง <strong>Gross National Happiness (GNH) หรือ ความสุขมวลรวมประชาชาติ</strong> จึงถือกำเนิดขึ้น เพื่อเสนอมาตรวัดการพัฒนาแบบองค์รวมที่ให้ความสำคัญกับจิตใจ สังคม และสิ่งแวดล้อมควบคู่ไปกับเศรษฐกิจ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          จุดกำเนิดของแนวคิด GNH
        </h3>
        <p>
          แนวคิด GNH ถูกริเริ่มขึ้นในทศวรรษ 1970 โดยสมเด็จพระราชาธิบดีจิกมี ซิงเย วังชุก แห่งประเทศภูฏาน ผู้ทรงมองเห็นว่าการมุ่งเน้นการเติบโตทางเศรษฐกิจเพียงอย่างเดียว อาจนำไปสู่การทำลายทรัพยากรธรรมชาติและวัฒนธรรมอันดีงามของประเทศ ทรงมีพระราชดำรัสอันโด่งดังว่า <em>"ความสุขมวลรวมประชาชาติมีความสำคัญยิ่งกว่าผลิตภัณฑ์มวลรวมในประเทศ (Gross National Happiness is more important than Gross Domestic Product)"</em>
        </p>
        <p>
          ตั้งแต่นั้นมา ภูฏานได้พัฒนาดัชนี GNH อย่างเป็นระบบ โดยพิจารณาจากหลัก 4 ประการ (Four Pillars) ได้แก่ การพัฒนาเศรษฐกิจและสังคมอย่างยั่งยืน, การอนุรักษ์สิ่งแวดล้อม, การส่งเสริมและอนุรักษ์วัฒนธรรม และ ธรรมาภิบาลที่ดี (Good Governance)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          9 โดเมนหลักแห่งความสุข (The 9 Domains of GNH)
        </h3>
        <p>
          ในการวัดผลทางสถิติของดัชนี GNH ได้มีการแตกย่อยเสาหลักทั้งสี่ออกเป็น 9 มิติ (Domains) เพื่อประเมินความอยู่ดีมีสุขของประชาชนอย่างครอบคลุม ซึ่งแบบประเมินจำลอง (GNH Proxy Calculator) ด้านบน ได้หยิบยกมิติที่สำคัญมาปรับใช้ให้เข้ากับชีวิตระดับบุคคล ได้แก่:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Psychological Wellbeing (สุขภาวะทางจิตวิทยา):</strong> ความพึงพอใจในชีวิต อารมณ์เชิงบวกและลบ</li>
          <li><strong>Health (สุขภาพ):</strong> สุขภาพร่างกาย สุขภาพจิต และการเข้าถึงบริการสาธารณสุข</li>
          <li><strong>Time Use (การใช้เวลา):</strong> สมดุลระหว่างเวลาทำงาน เวลาพักผ่อน และเวลาสำหรับครอบครัว</li>
          <li><strong>Education (การศึกษา):</strong> การมีความรู้ ทักษะ และภูมิปัญญา</li>
          <li><strong>Cultural Diversity and Resilience (ความหลากหลายทางวัฒนธรรม):</strong> การมีส่วนร่วมทางประเพณีและศิลปวัฒนธรรม</li>
          <li><strong>Good Governance (ธรรมาภิบาลที่ดี):</strong> ความเชื่อมั่นในสถาบัน ความโปร่งใสทางการเมือง</li>
          <li><strong>Community Vitality (ความมีชีวิตชีวาของชุมชน):</strong> ความไว้วางใจในชุมชน ความสัมพันธ์ที่แน่นแฟ้น และความปลอดภัย</li>
          <li><strong>Ecological Diversity and Resilience (ความหลากหลายทางนิเวศวิทยา):</strong> คุณภาพสิ่งแวดล้อม การเข้าถึงพื้นที่สีเขียว</li>
          <li><strong>Living Standards (มาตรฐานการครองชีพ):</strong> รายได้ สินทรัพย์ และความมั่นคงด้านที่อยู่อาศัย</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          การนำแนวคิด GNH มาปรับใช้ในชีวิตประจำวัน
        </h3>
        <p>
          แม้ GNH จะเป็นเครื่องมือระดับชาติ แต่เราสามารถนำแนวคิดนี้มาเป็น "เข็มทิศ" ในการดำเนินชีวิตส่วนบุคคลได้ แทนที่จะตั้งเป้าหมายในชีวิตเพียงแค่ "ต้องรวย" หรือ "หน้าที่การงานก้าวหน้าสูงสุด" ลองกลับมาทบทวนคะแนนในมิติต่างๆ ของคุณ:
        </p>
        <ol className="list-decimal pl-6 space-y-3 mb-6">
          <li><strong>สำรวจความไม่สมดุล:</strong> หากคุณมีคะแนนความมั่นคงทางการเงินเต็ม 10 แต่คะแนนสุขภาพและสมดุลเวลาทำงาน (Time Use) ต่ำมาก นั่นคือสัญญาณอันตรายที่คุณอาจกำลังเอาสุขภาพไปแลกกับเงินทอง</li>
          <li><strong>ลงทุนในความสัมพันธ์:</strong> มิติเรื่อง Community Vitality ย้ำเตือนว่ามนุษย์เป็นสัตว์สังคม การมีครอบครัวที่อบอุ่นและเพื่อนฝูงที่เกื้อกูล ส่งผลต่อความสุขในระยะยาวอย่างมาก</li>
          <li><strong>ดูแลจิตใจและสิ่งแวดล้อม:</strong> การใกล้ชิดธรรมชาติ (Ecological Diversity) และการดูแลอารมณ์ของตนเอง (Psychological Wellbeing) เป็นพื้นฐานความสุขที่หลายคนมักมองข้ามเมื่อมีชีวิตที่เร่งรีบ</li>
        </ol>

        <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100 my-6">
          <h4 className="text-lg font-bold text-yellow-900 mb-2">บทสรุป</h4>
          <p className="text-yellow-800 m-0">
            การประเมิน GNH ของตนเองเป็นประจำ จะช่วยดึงสติเรากลับมามองภาพรวมของชีวิต ว่าเรากำลังทุ่มเททรัพยากร (เวลาและพลังงาน) ไปในทิศทางที่สร้าง <strong>"ความสุขที่แท้จริงและยั่งยืน"</strong> ให้กับตัวเราเองและคนรอบข้างหรือไม่ ความสำเร็จที่ปราศจากความสุขย่อมไม่ใช่ความสำเร็จที่สมบูรณ์แบบ
          </p>
        </div>
      </article>
    </div>
  );
}

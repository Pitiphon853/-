import React, { useState } from 'react';
import { Award, Globe, Users, HeartHandshake, Briefcase, Heart, CheckCircle2 } from 'lucide-react';

export default function LegacyScore({ lang = 'EN' }: { lang?: 'EN' | 'TH' }) {
  const [scores, setScores] = useState({
    community: 5,
    mentorship: 5,
    philanthropy: 5,
    works: 5,
    family: 5
  });

  const handleScoreChange = (field: keyof typeof scores, value: number) => {
    setScores(prev => ({ ...prev, [field]: value }));
  };

  const t = {
    title: lang === 'TH' ? 'เครื่องประเมินคะแนนมรดกชีวิต' : 'Personal Legacy Score Calculator',
    subtitle: lang === 'TH' ? 'ประเมินสิ่งที่มีคุณค่าที่คุณทิ้งไว้ให้กับโลกใบนี้' : 'Assess the valuable impact you are leaving on the world',
    communityTitle: lang === 'TH' ? '1. ผลกระทบต่อชุมชนและสังคม' : '1. Community & Social Impact',
    communityDesc: lang === 'TH' ? 'การมีส่วนร่วม การพัฒนา หรือการช่วยเหลือชุมชนรอบตัวคุณ' : 'Involvement, development, or assistance provided to your local community.',
    mentorshipTitle: lang === 'TH' ? '2. การเป็นที่ปรึกษาและถ่ายทอดความรู้' : '2. Mentorship & Teaching',
    mentorshipDesc: lang === 'TH' ? 'การให้คำแนะนำ เป็นแบบอย่าง หรือสอนทักษะให้กับผู้อื่น' : 'Guiding, inspiring, or teaching skills to the next generation.',
    philTitle: lang === 'TH' ? '3. การกุศลและการบริจาค' : '3. Philanthropy & Donations',
    philDesc: lang === 'TH' ? 'การบริจาคเงิน สิ่งของ หรือเวลาเพื่อสนับสนุนสาธารณกุศล' : 'Giving financial resources, items, or time to charitable causes.',
    worksTitle: lang === 'TH' ? '4. ผลงานสร้างสรรค์และวิชาชีพ' : '4. Creative & Professional Works',
    worksDesc: lang === 'TH' ? 'สิ่งประดิษฐ์ งานศิลปะ งานเขียน หรือความสำเร็จในสายอาชีพที่มีประโยชน์' : 'Inventions, art, writings, or professional achievements that benefit others.',
    familyTitle: lang === 'TH' ? '5. ครอบครัวและความสัมพันธ์' : '5. Family & Relationships',
    familyDesc: lang === 'TH' ? 'ความรัก การดูแลเอาใจใส่ และรากฐานที่มั่นคงที่คุณสร้างให้กับคนใกล้ชิด' : 'The love, care, and strong foundation built for your family and close friends.',
    scoreLabel: lang === 'TH' ? 'คะแนน:' : 'Score:',
    resultTitle: lang === 'TH' ? 'คะแนนมรดกชีวิตของคุณ' : 'Your Legacy Score',
    outOf: lang === 'TH' ? 'จาก 100' : 'out of 100',
    evalTitle: lang === 'TH' ? 'การประเมิน:' : 'Evaluation:',
    levels: {
      low: lang === 'TH' ? 'คุณอยู่ในจุดเริ่มต้นของการสร้างคุณค่า ลองหาโอกาสช่วยเหลือผู้อื่นมากขึ้น' : 'You are at the beginning of building your legacy. Look for more opportunities to help others.',
      mid: lang === 'TH' ? 'คุณได้สร้างผลกระทบเชิงบวกที่น่าชื่นชม คุณเป็นส่วนสำคัญของคนรอบข้าง' : 'You have made a commendable positive impact and are an important part of your community.',
      high: lang === 'TH' ? 'ยอดเยี่ยมมาก! คุณได้ทิ้งมรดกที่ยิ่งใหญ่และน่าจดจำไว้ให้กับโลกใบนี้' : 'Outstanding! You are leaving a significant and memorable legacy in the world.'
    }
  };

  const calculateScore = () => {
    const total = scores.community + scores.mentorship + scores.philanthropy + scores.works + scores.family;
    const finalScore = (total / 50) * 100;
    
    let evaluation = t.levels.low;
    if (finalScore >= 80) evaluation = t.levels.high;
    else if (finalScore >= 50) evaluation = t.levels.mid;

    return { score: finalScore.toFixed(0), evaluation };
  };

  const result = calculateScore();

  const RangeSlider = ({ field, title, desc, icon: Icon }: any) => (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <p className="text-sm text-gray-500 mt-1">{desc}</p>
        </div>
        <div className="text-xl font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-lg">
          {scores[field as keyof typeof scores]}
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        value={scores[field as keyof typeof scores]}
        onChange={(e) => handleScoreChange(field as keyof typeof scores, parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>0</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-12">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-amber-100">
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
            <Award size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
            <p className="text-gray-500 mt-1">{t.subtitle}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <RangeSlider field="community" title={t.communityTitle} desc={t.communityDesc} icon={Globe} />
          <RangeSlider field="mentorship" title={t.mentorshipTitle} desc={t.mentorshipDesc} icon={Users} />
          <RangeSlider field="philanthropy" title={t.philTitle} desc={t.philDesc} icon={HeartHandshake} />
          <RangeSlider field="works" title={t.worksTitle} desc={t.worksDesc} icon={Briefcase} />
          <RangeSlider field="family" title={t.familyTitle} desc={t.familyDesc} icon={Heart} />
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8 border border-amber-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Award size={120} />
          </div>
          
          <h3 className="text-lg font-medium text-amber-800 mb-2">{t.resultTitle}</h3>
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <span className="text-6xl font-extrabold text-amber-600">{result.score}</span>
            <span className="text-xl text-amber-700/60 font-medium">{t.outOf}</span>
          </div>
          
          <div className="inline-flex items-center gap-2 bg-white/60 px-4 py-3 rounded-xl">
            <CheckCircle2 className="text-amber-500" size={20} />
            <p className="font-medium text-amber-900">{result.evaluation}</p>
          </div>
        </div>
      </div>

      <article className="prose prose-amber max-w-none prose-headings:text-amber-900 prose-a:text-amber-600">
        {lang === 'TH' ? (
          <>
            <h2>มรดกชีวิต (Personal Legacy) คืออะไร?</h2>
            <p>
              เมื่อพูดถึงคำว่า <strong>"มรดก" (Legacy)</strong> หลายคนอาจนึกถึงทรัพย์สิน เงินทอง หรือที่ดินที่ทิ้งไว้ให้กับลูกหลาน แต่ในความเป็นจริง มรดกที่ยิ่งใหญ่และยั่งยืนที่สุดคือ "คุณค่า" ที่คุณได้สร้างและมอบให้กับผู้คนและสังคมรอบตัวตลอดช่วงชีวิตของคุณ <strong>เครื่องประเมินคะแนนมรดกชีวิต (Personal Legacy Score Calculator)</strong> ถูกออกแบบมาเพื่อช่วยให้คุณได้หยุดทบทวนและให้คะแนนผลกระทบเชิงบวกที่คุณได้สร้างไว้ในมิติต่างๆ ของชีวิต
            </p>

            <h3>องค์ประกอบของมรดกชีวิตที่สมบูรณ์</h3>
            <p>
              การสร้างมรดกชีวิตไม่ได้จำกัดอยู่เพียงแค่ชื่อเสียงหรือความมั่งคั่ง แต่ประกอบไปด้วย 5 มิติหลักที่แสดงถึงความเชื่อมโยงระหว่างคุณกับโลกใบนี้ ได้แก่:
            </p>
            <ul>
              <li><strong>ผลกระทบต่อชุมชนและสังคม:</strong> สิ่งที่คุณทำเพื่อส่วนรวม ไม่ว่าจะเป็นการร่วมเป็นจิตอาสา การพัฒนาชุมชน หรือการเป็นกระบอกเสียงในเรื่องที่สำคัญ การกระทำเหล่านี้จะยังคงอยู่ในความทรงจำของสังคม</li>
              <li><strong>การเป็นที่ปรึกษาและถ่ายทอดความรู้:</strong> ความรู้และประสบการณ์ของคุณเป็นสิ่งมีค่า การถ่ายทอดสิ่งเหล่านี้ให้กับคนรุ่นหลัง จะช่วยสร้างผู้นำและคนเก่งหน้าใหม่ ซึ่งถือเป็นการสร้างผลกระทบที่ส่งต่อกันเป็นทอดๆ (Ripple Effect)</li>
              <li><strong>การกุศลและการบริจาค:</strong> การแบ่งปันทรัพยากรที่คุณมี ไม่ว่าจะเป็นเงิน สิ่งของ หรือเวลา เพื่อช่วยเหลือผู้ที่ขาดแคลน เป็นการแสดงออกถึงความเมตตาและเพื่อนมนุษย์</li>
              <li><strong>ผลงานสร้างสรรค์และวิชาชีพ:</strong> สิ่งประดิษฐ์ งานเขียน ศิลปะ หรืองานในสายอาชีพที่มีประโยชน์ต่อผู้อื่น จะเป็นสิ่งที่หลงเหลืออยู่แม้วันที่คุณไม่อยู่แล้ว ผลงานเหล่านี้คือตัวแทนทางความคิดและความพยายามของคุณ</li>
              <li><strong>ครอบครัวและความสัมพันธ์:</strong> รากฐานที่สำคัญที่สุด ความรัก ความอบอุ่น และการเอาใจใส่ที่คุณมอบให้กับครอบครัวและเพื่อนฝูง จะกลายเป็นความทรงจำที่มีค่าที่สุดสำหรับพวกเขา</li>
            </ul>

            <h3>ทำไมเราจึงควรประเมินมรดกชีวิต?</h3>
            <p>
              การประเมินสิ่งที่เราทำ ไม่ได้ทำเพื่อเปรียบเทียบกับใคร แต่ทำเพื่อให้เรา <strong>มองเห็นเป้าหมายในชีวิต (Purpose of Life)</strong> ที่ชัดเจนขึ้น หากคะแนนของคุณยังไม่สูงนัก นั่นไม่ใช่เรื่องผิด แต่เป็นโอกาสที่ดีที่คุณจะได้เริ่มตั้งคำถามกับตัวเองว่า <em>"ฉันอยากให้ผู้คนจดจำฉันในรูปแบบไหน?"</em> และ <em>"ฉันสามารถเริ่มทำอะไรได้บ้างตั้งแต่วันนี้?"</em>
            </p>
            <p>
              การสร้าง Legacy ไม่จำเป็นต้องเริ่มจากสิ่งที่ยิ่งใหญ่ระดับโลก การเป็นพ่อแม่ที่ดี เป็นเพื่อนที่รับฟัง หรือเป็นอาสาสมัครในชุมชนเล็กๆ ก็ถือเป็นมรดกชีวิตที่มีคุณค่ามหาศาลแล้ว ลองใช้เครื่องมือนี้เป็นเข็มทิศนำทาง เพื่อสร้างชีวิตที่มีความหมายและทรงคุณค่าในแบบของคุณเอง
            </p>
          </>
        ) : (
          <>
            <h2>What is a Personal Legacy?</h2>
            <p>
              When people hear the word <strong>"Legacy"</strong>, they often think of financial wealth, estates, or physical assets left behind for descendants. However, the most profound and enduring legacy is the "value" and positive impact you imprint on the people and the society around you during your lifetime. The <strong>Personal Legacy Score Calculator</strong> is designed to help you pause, reflect, and evaluate the positive mark you are leaving across various dimensions of your life.
            </p>

            <h3>The Core Dimensions of a Fulfilling Legacy</h3>
            <p>
              Building a meaningful legacy is not confined to fame or fortune. It encompasses five primary dimensions that illustrate your connection with the world:
            </p>
            <ul>
              <li><strong>Community & Social Impact:</strong> What you do for the collective good—whether volunteering, developing community projects, or advocating for important causes—leaves a lasting memory in society.</li>
              <li><strong>Mentorship & Teaching:</strong> Your knowledge and experiences are invaluable. Passing them down to the next generation creates future leaders and skilled individuals, generating a powerful ripple effect.</li>
              <li><strong>Philanthropy & Donations:</strong> Sharing your resources (money, goods, or time) to support those in need is a pure expression of compassion and shared humanity.</li>
              <li><strong>Creative & Professional Works:</strong> Inventions, writings, art, or professional contributions that benefit others will outlive you, serving as enduring representatives of your thoughts and efforts.</li>
              <li><strong>Family & Relationships:</strong> The most fundamental foundation. The love, warmth, and care you provide to family and friends become their most cherished memories and strengths.</li>
            </ul>

            <h3>Why Evaluate Your Legacy?</h3>
            <p>
              Assessing your legacy isn't about comparing yourself to others; it's about gaining a clearer vision of your <strong>Purpose in Life</strong>. If your score isn't as high as you'd like, it's not a failure—it's a beautiful opportunity to ask yourself, <em>"How do I want to be remembered?"</em> and <em>"What can I start doing today?"</em>
            </p>
            <p>
              Creating a legacy doesn't require world-changing feats. Being a supportive parent, a listening friend, or a volunteer in a small community are all incredibly valuable legacies. Use this tool as a compass to guide you toward a life of deeper meaning and purposeful impact.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

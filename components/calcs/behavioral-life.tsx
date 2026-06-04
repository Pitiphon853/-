import React, { useState } from 'react';
import { Activity, Heart, Clock, AlertCircle, Info } from 'lucide-react';

export default function BehavioralLife({ lang = 'EN' }: { lang?: 'EN' | 'TH' }) {
  const [age, setAge] = useState<number | ''>(30);
  const [sex, setSex] = useState<'Male' | 'Female'>('Male');
  const [diet, setDiet] = useState<'Poor' | 'Average' | 'Excellent'>('Average');
  const [exercise, setExercise] = useState<'None' | '1-2' | '3-4' | '5+'>('1-2');
  const [sleep, setSleep] = useState<'<6' | '6-8' | '>8'>('6-8');
  const [smoking, setSmoking] = useState<'Yes' | 'No' | 'Former'>('No');
  const [alcohol, setAlcohol] = useState<'None' | 'Moderate' | 'Heavy'>('None');
  const [stress, setStress] = useState<'Low' | 'Moderate' | 'High'>('Moderate');

  const t = {
    title: lang === 'TH' ? 'เครื่องคำนวณอายุขัยจากพฤติกรรม' : 'Behavioral Life Expectancy Calculator',
    age: lang === 'TH' ? 'อายุปัจจุบัน' : 'Current Age',
    sex: lang === 'TH' ? 'เพศกำเนิด' : 'Biological Sex',
    male: lang === 'TH' ? 'ชาย' : 'Male',
    female: lang === 'TH' ? 'หญิง' : 'Female',
    diet: lang === 'TH' ? 'คุณภาพอาหาร' : 'Diet Quality',
    dietPoor: lang === 'TH' ? 'แย่' : 'Poor',
    dietAverage: lang === 'TH' ? 'ปานกลาง' : 'Average',
    dietExcellent: lang === 'TH' ? 'ดีเยี่ยม' : 'Excellent',
    exercise: lang === 'TH' ? 'การออกกำลังกาย (ครั้ง/สัปดาห์)' : 'Exercise (times/week)',
    exerciseNone: lang === 'TH' ? 'ไม่ออกกำลังกายเลย' : 'None',
    sleep: lang === 'TH' ? 'เวลานอน (ชั่วโมง/วัน)' : 'Sleep (hours/night)',
    smoking: lang === 'TH' ? 'การสูบบุหรี่' : 'Smoking',
    smokingYes: lang === 'TH' ? 'สูบ' : 'Yes',
    smokingNo: lang === 'TH' ? 'ไม่สูบ' : 'No',
    smokingFormer: lang === 'TH' ? 'เคยสูบ (เลิกแล้ว)' : 'Former',
    alcohol: lang === 'TH' ? 'การดื่มแอลกอฮอล์' : 'Alcohol',
    alcoholNone: lang === 'TH' ? 'ไม่ดื่ม' : 'None',
    alcoholModerate: lang === 'TH' ? 'ดื่มปานกลาง' : 'Moderate',
    alcoholHeavy: lang === 'TH' ? 'ดื่มหนัก' : 'Heavy',
    stress: lang === 'TH' ? 'ระดับความเครียด' : 'Stress Level',
    stressLow: lang === 'TH' ? 'ต่ำ' : 'Low',
    stressModerate: lang === 'TH' ? 'ปานกลาง' : 'Moderate',
    stressHigh: lang === 'TH' ? 'สูง' : 'High',
    calculate: lang === 'TH' ? 'คำนวณอายุขัย' : 'Calculate Life Expectancy',
    resultTitle: lang === 'TH' ? 'ผลการประเมินอายุขัยของคุณ' : 'Your Estimated Life Expectancy',
    years: lang === 'TH' ? 'ปี' : 'years',
    baseTitle: lang === 'TH' ? 'อายุขัยพื้นฐาน:' : 'Base Expectancy:',
    modifierTitle: lang === 'TH' ? 'การปรับเปลี่ยนจากพฤติกรรม:' : 'Behavioral Modifier:',
    adviceTitle: lang === 'TH' ? 'คำแนะนำ:' : 'Recommendations:',
    adviceImprove: lang === 'TH' ? 'ปรับปรุงพฤติกรรมบางอย่างเพื่อเพิ่มอายุขัยของคุณ' : 'Improve some behaviors to increase your life expectancy.',
    adviceGood: lang === 'TH' ? 'คุณมีวิถีชีวิตที่ดีเยี่ยม รักษามันไว้!' : 'You have an excellent lifestyle. Keep it up!'
  };

  const calculateLifeExpectancy = () => {
    let base = sex === 'Male' ? 75 : 80;
    let modifier = 0;

    if (diet === 'Poor') modifier -= 3;
    if (diet === 'Excellent') modifier += 3;

    if (exercise === 'None') modifier -= 2;
    if (exercise === '1-2') modifier += 1;
    if (exercise === '3-4') modifier += 3;
    if (exercise === '5+') modifier += 4;

    if (sleep === '<6') modifier -= 2;
    if (sleep === '6-8') modifier += 1;

    if (smoking === 'Yes') modifier -= 10;
    if (smoking === 'Former') modifier -= 3;

    if (alcohol === 'Moderate') modifier += 1;
    if (alcohol === 'Heavy') modifier -= 5;

    if (stress === 'Low') modifier += 2;
    if (stress === 'High') modifier -= 3;

    return { base, modifier, total: base + modifier };
  };

  const result = calculateLifeExpectancy();
  const currentAgeNum = Number(age) || 0;
  const yearsRemaining = Math.max(0, result.total - currentAgeNum);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-12">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <Activity size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
            <p className="text-gray-500 mt-1">
              {lang === 'TH' ? 'วิเคราะห์ผลกระทบของไลฟ์สไตล์ต่ออายุขัยของคุณ' : 'Analyze the impact of your lifestyle on your life expectancy'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.age}</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                min="0"
                max="120"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.sex}</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setSex('Male')}
                  className={`flex-1 py-3 rounded-xl border ${sex === 'Male' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-gray-200 text-gray-600'}`}
                >
                  {t.male}
                </button>
                <button
                  onClick={() => setSex('Female')}
                  className={`flex-1 py-3 rounded-xl border ${sex === 'Female' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-gray-200 text-gray-600'}`}
                >
                  {t.female}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.diet}</label>
              <select
                value={diet}
                onChange={(e: any) => setDiet(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="Poor">{t.dietPoor}</option>
                <option value="Average">{t.dietAverage}</option>
                <option value="Excellent">{t.dietExcellent}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.exercise}</label>
              <select
                value={exercise}
                onChange={(e: any) => setExercise(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="None">{t.exerciseNone}</option>
                <option value="1-2">1-2</option>
                <option value="3-4">3-4</option>
                <option value="5+">5+</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.sleep}</label>
              <select
                value={sleep}
                onChange={(e: any) => setSleep(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="<6">&lt; 6</option>
                <option value="6-8">6 - 8</option>
                <option value=">8">&gt; 8</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.smoking}</label>
              <select
                value={smoking}
                onChange={(e: any) => setSmoking(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="Yes">{t.smokingYes}</option>
                <option value="No">{t.smokingNo}</option>
                <option value="Former">{t.smokingFormer}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.alcohol}</label>
              <select
                value={alcohol}
                onChange={(e: any) => setAlcohol(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="None">{t.alcoholNone}</option>
                <option value="Moderate">{t.alcoholModerate}</option>
                <option value="Heavy">{t.alcoholHeavy}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.stress}</label>
              <select
                value={stress}
                onChange={(e: any) => setStress(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="Low">{t.stressLow}</option>
                <option value="Moderate">{t.stressModerate}</option>
                <option value="High">{t.stressHigh}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 md:p-8 mt-8 border border-indigo-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t.resultTitle}</h3>
              <div className="flex flex-col gap-2 mt-4 text-gray-600">
                <div className="flex justify-between w-64">
                  <span>{t.baseTitle}</span>
                  <span className="font-semibold">{result.base} {t.years}</span>
                </div>
                <div className="flex justify-between w-64">
                  <span>{t.modifierTitle}</span>
                  <span className={`font-semibold ${result.modifier >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {result.modifier > 0 ? '+' : ''}{result.modifier} {t.years}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-center bg-white p-6 rounded-2xl shadow-sm border border-indigo-50 min-w-[200px]">
              <div className="text-5xl font-bold text-indigo-600 mb-2">{result.total}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{t.years}</div>
            </div>
          </div>

          <div className="mt-8 bg-white/60 p-4 rounded-xl flex gap-4 items-start">
            <Info className="text-indigo-500 shrink-0 mt-1" size={24} />
            <div>
              <p className="font-medium text-indigo-900 mb-1">{t.adviceTitle}</p>
              <p className="text-indigo-800/80 text-sm">
                {result.modifier < 0 ? t.adviceImprove : t.adviceGood}
                {lang === 'TH' ? ` (คาดการณ์ว่าคุณมีเวลาเหลือประมาณ ${yearsRemaining} ปี)` : ` (Estimated ~${yearsRemaining} years remaining based on current age)`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-indigo max-w-none prose-headings:text-indigo-900 prose-a:text-indigo-600">
        {lang === 'TH' ? (
          <>
            <h2>เครื่องคำนวณอายุขัยจากพฤติกรรม (Behavioral Life Expectancy Calculator) คืออะไร?</h2>
            <p>
              ในยุคที่การดูแลสุขภาพเป็นสิ่งที่ทุกคนให้ความสำคัญ การทราบถึง <strong>อายุขัย (Life Expectancy)</strong> ที่คาดหวังไม่ได้มีประโยชน์เพียงแค่การวางแผนการเงินหรือเกษียณอายุเท่านั้น แต่ยังเป็นกระจกสะท้อนให้เห็นว่าพฤติกรรมและวิถีชีวิต (Lifestyle) ในปัจจุบันของเรา ส่งผลดีหรือผลเสียต่อสุขภาพในระยะยาวอย่างไร เครื่องคำนวณอายุขัยจากพฤติกรรมนี้ ถูกออกแบบมาเพื่อนำปัจจัยต่างๆ ในชีวิตประจำวันมาประเมินร่วมกับอายุขัยพื้นฐาน เพื่อให้คุณมองเห็นภาพรวมของสุขภาพในอนาคตได้อย่างชัดเจนยิ่งขึ้น
            </p>

            <h3>ปัจจัยทางพฤติกรรมที่ส่งผลต่ออายุขัย</h3>
            <p>
              พันธุกรรมอาจเป็นส่วนหนึ่งที่กำหนดความแข็งแรงของร่างกาย แต่ <strong>พฤติกรรม (Behavior)</strong> คือสิ่งที่เราสามารถควบคุมและปรับเปลี่ยนได้ ปัจจัยหลักที่นำมาใช้ในการคำนวณประกอบด้วย:
            </p>
            <ul>
              <li><strong>คุณภาพของอาหาร (Diet Quality):</strong> การรับประทานอาหารที่มีประโยชน์ เช่น ผัก ผลไม้ ธัญพืชขัดสีน้อย จะช่วยลดความเสี่ยงโรคเรื้อรัง ในขณะที่การทานอาหารขยะหรือไขมันสูงจะลดทอนอายุขัยของคุณ</li>
              <li><strong>การออกกำลังกาย (Exercise):</strong> กิจกรรมทางกายเป็นกุญแจสำคัญสู่สุขภาพที่ดี การออกกำลังกายอย่างน้อย 3-4 ครั้งต่อสัปดาห์ช่วยให้หัวใจแข็งแรงและเพิ่มอายุขัยได้หลายปี</li>
              <li><strong>การนอนหลับ (Sleep):</strong> การนอนหลับที่เพียงพอ 6-8 ชั่วโมงต่อวัน เป็นช่วงเวลาที่ร่างกายซ่อมแซมตัวเอง การนอนน้อยกว่า 6 ชั่วโมงจะเพิ่มความเสี่ยงของโรคหลอดเลือดหัวใจและภาวะซึมเศร้า</li>
              <li><strong>การสูบบุหรี่และการดื่มแอลกอฮอล์ (Smoking & Alcohol):</strong> สารพิษจากบุหรี่เป็นปัจจัยเสี่ยงอันดับต้นๆ ที่ทำให้อายุขัยสั้นลงอย่างมาก ในขณะที่การดื่มแอลกอฮอล์ในปริมาณมากส่งผลเสียต่อตับและสมอง</li>
              <li><strong>ระดับความเครียด (Stress Level):</strong> ความเครียดเรื้อรัง (Chronic Stress) ปล่อยฮอร์โมนคอร์ติซอลที่ทำลายระบบภูมิคุ้มกัน การจัดการความเครียดได้ดีจึงเป็นอีกวิธีในการยืดอายุขัย</li>
            </ul>

            <h3>ประโยชน์ของการทราบอายุขัยประเมิน</h3>
            <p>
              การใช้เครื่องคำนวณนี้ไม่ได้มีจุดประสงค์เพื่อทำนายอนาคตอย่างแม่นยำ 100% (เนื่องจากยังมีปัจจัยด้านพันธุกรรมและอุบัติเหตุที่ไม่สามารถคำนวณได้) แต่มีจุดประสงค์หลักเพื่อ <strong>สร้างความตระหนักรู้ (Awareness)</strong> หากผลลัพธ์แสดงให้เห็นว่าพฤติกรรมปัจจุบันของคุณทำให้อายุขัยลดลง นี่คือสัญญาณเตือนว่าคุณควรเริ่มต้นปรับเปลี่ยนวิถีชีวิต หันมาทานอาหารที่มีประโยชน์ ออกกำลังกาย และเลิกบุหรี่ การเปลี่ยนแปลงเพียงเล็กน้อยในวันนี้ สามารถเพิ่มเวลาคุณภาพให้กับชีวิตคุณและคนที่คุณรักได้อีกหลายปี
            </p>
            <p>
              เริ่มคำนวณอายุขัยของคุณวันนี้ เพื่อวางแผนปรับปรุงสุขภาพให้ดียิ่งขึ้น และอย่าลืมปรึกษาแพทย์หรือผู้เชี่ยวชาญด้านสุขภาพสำหรับการตรวจเช็คสภาพร่างกายอย่างสม่ำเสมอ
            </p>
          </>
        ) : (
          <>
            <h2>What is the Behavioral Life Expectancy Calculator?</h2>
            <p>
              In an era where personal health is a top priority, understanding your expected <strong>Life Expectancy</strong> is crucial not just for financial or retirement planning, but as a reflection of how your current lifestyle choices impact your long-term well-being. The Behavioral Life Expectancy Calculator is designed to evaluate various daily habits alongside baseline life expectancies to give you a clearer picture of your future health trajectory.
            </p>

            <h3>Behavioral Factors Influencing Life Expectancy</h3>
            <p>
              While genetics play a role in determining our baseline health, <strong>behavior</strong> is what we can control and change. The key factors considered in this calculation include:
            </p>
            <ul>
              <li><strong>Diet Quality:</strong> Consuming a balanced diet rich in vegetables, fruits, and whole grains reduces the risk of chronic diseases, whereas a poor diet high in junk food and saturated fats can deduct years from your life.</li>
              <li><strong>Exercise:</strong> Physical activity is the cornerstone of good health. Exercising at least 3-4 times a week strengthens the cardiovascular system and can add several years to your life expectancy.</li>
              <li><strong>Sleep:</strong> Getting adequate sleep (6-8 hours per night) allows the body to repair itself. Chronically sleeping less than 6 hours increases the risk of heart disease and metabolic issues.</li>
              <li><strong>Smoking & Alcohol:</strong> Toxins from smoking are among the leading causes of preventable early death, significantly shortening life span. Heavy alcohol consumption severely damages the liver and other vital organs.</li>
              <li><strong>Stress Level:</strong> Chronic stress releases cortisol, which can compromise the immune system. Effective stress management is a proven method to improve both quality of life and longevity.</li>
            </ul>

            <h3>Benefits of Knowing Your Estimated Life Expectancy</h3>
            <p>
              The purpose of this calculator is not to predict the future with 100% accuracy (as genetics and unforeseen events also play roles), but rather to <strong>create awareness</strong>. If the results indicate that your current behaviors are reducing your life expectancy, it serves as a wake-up call to start making healthier choices. Simple changes—such as improving your diet, starting a regular exercise routine, or quitting smoking—can add years of high-quality life, giving you more time to spend with loved ones and achieve your goals.
            </p>
            <p>
              Use this tool today to evaluate your lifestyle and start making positive changes. Always remember to consult with healthcare professionals for comprehensive medical advice and regular health check-ups.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

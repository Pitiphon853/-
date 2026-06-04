import React, { useState } from 'react';
import { HeartPulse, Activity, ShieldCheck, Info } from 'lucide-react';

export default function HaleCalculator({ lang = 'EN' }: { lang?: 'EN' | 'TH' }) {
  const [age, setAge] = useState<number | ''>(35);
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [chronic, setChronic] = useState<'0' | '1' | '2' | '3+'>('0');
  const [mobility, setMobility] = useState<'None' | 'Mild' | 'Severe'>('None');
  const [weight, setWeight] = useState<number | ''>(70);
  const [height, setHeight] = useState<number | ''>(170);
  const [activity, setActivity] = useState<'Sedentary' | 'Active'>('Active');

  const t = {
    title: lang === 'TH' ? 'เครื่องคำนวณอายุขัยที่มีสุขภาพดี (HALE)' : 'Healthy Life Expectancy (HALE) Calculator',
    age: lang === 'TH' ? 'อายุปัจจุบัน' : 'Current Age',
    gender: lang === 'TH' ? 'เพศ' : 'Gender',
    male: lang === 'TH' ? 'ชาย' : 'Male',
    female: lang === 'TH' ? 'หญิง' : 'Female',
    chronic: lang === 'TH' ? 'โรคเรื้อรังที่ได้รับการวินิจฉัย (เช่น เบาหวาน, ความดัน)' : 'Diagnosed Chronic Conditions',
    mobility: lang === 'TH' ? 'ปัญหาด้านการเคลื่อนไหว' : 'Mobility Issues',
    mobNone: lang === 'TH' ? 'ไม่มีปัญหา' : 'None',
    mobMild: lang === 'TH' ? 'มีปัญหาเล็กน้อย (เดินช้า, ปวดข้อ)' : 'Mild (Slow walking, joint pain)',
    mobSevere: lang === 'TH' ? 'รุนแรง (ต้องใช้อุปกรณ์ช่วยเดิน)' : 'Severe (Needs walking aids)',
    weight: lang === 'TH' ? 'น้ำหนัก (กก.)' : 'Weight (kg)',
    height: lang === 'TH' ? 'ส่วนสูง (ซม.)' : 'Height (cm)',
    activity: lang === 'TH' ? 'กิจกรรมทางกาย' : 'Physical Activity',
    actSedentary: lang === 'TH' ? 'นั่งเป็นส่วนใหญ่ ไม่ออกกำลังกาย' : 'Sedentary (Mostly sitting)',
    actActive: lang === 'TH' ? 'กระฉับกระเฉง ออกกำลังกายประจำ' : 'Active (Regular exercise)',
    resultTitle: lang === 'TH' ? 'จำนวนปีที่คุณจะมีสุขภาพดี (โดยประมาณ)' : 'Estimated Healthy Years Remaining',
    years: lang === 'TH' ? 'ปี' : 'years',
    totalHale: lang === 'TH' ? 'HALE รวม (อายุขัยสุขภาพดี):' : 'Total HALE (Health Adjusted Life Expectancy):',
    bmiLabel: lang === 'TH' ? 'ค่าดัชนีมวลกาย (BMI) ของคุณ:' : 'Your BMI:',
    warning: lang === 'TH' ? 'หมายเหตุ: นี่เป็นการประเมินเบื้องต้นตามสถิติ ไม่ใช่คำแนะนำทางการแพทย์' : 'Note: This is a statistical estimation, not medical advice.'
  };

  const calculateHale = () => {
    let baseHale = gender === 'Male' ? 67 : 71; // Approximate baseline HALE
    let modifier = 0;

    if (chronic === '0') modifier += 1;
    if (chronic === '1') modifier -= 2;
    if (chronic === '2') modifier -= 4;
    if (chronic === '3+') modifier -= 6;

    if (mobility === 'Mild') modifier -= 3;
    if (mobility === 'Severe') modifier -= 7;

    let bmi = 0;
    if (weight && height) {
      const hMetres = Number(height) / 100;
      bmi = Number(weight) / (hMetres * hMetres);
      if (bmi < 18.5) modifier -= 1;
      else if (bmi >= 18.5 && bmi < 25) modifier += 1;
      else if (bmi >= 25 && bmi < 30) modifier -= 2;
      else if (bmi >= 30) modifier -= 4;
    }

    if (activity === 'Sedentary') modifier -= 2;
    if (activity === 'Active') modifier += 2;

    const totalHale = baseHale + modifier;
    const currentAgeNum = Number(age) || 0;
    const remaining = Math.max(0, totalHale - currentAgeNum);

    return { totalHale, remaining, bmi: bmi.toFixed(1) };
  };

  const result = calculateHale();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-12">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-teal-100">
          <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
            <HeartPulse size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
            <p className="text-gray-500 mt-1">
              {lang === 'TH' ? 'คำนวณช่วงเวลาชีวิตที่ปราศจากโรคภัยและสุขภาพดี' : 'Calculate your expected years of life in good health'}
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                min="0"
                max="120"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.gender}</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setGender('Male')}
                  className={`flex-1 py-3 rounded-xl border transition-colors ${gender === 'Male' ? 'bg-teal-50 border-teal-500 text-teal-700' : 'border-gray-200 text-gray-600'}`}
                >
                  {t.male}
                </button>
                <button
                  onClick={() => setGender('Female')}
                  className={`flex-1 py-3 rounded-xl border transition-colors ${gender === 'Female' ? 'bg-teal-50 border-teal-500 text-teal-700' : 'border-gray-200 text-gray-600'}`}
                >
                  {t.female}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.weight}</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.height}</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.chronic}</label>
              <select
                value={chronic}
                onChange={(e: any) => setChronic(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none bg-white"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.mobility}</label>
              <select
                value={mobility}
                onChange={(e: any) => setMobility(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none bg-white"
              >
                <option value="None">{t.mobNone}</option>
                <option value="Mild">{t.mobMild}</option>
                <option value="Severe">{t.mobSevere}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.activity}</label>
              <select
                value={activity}
                onChange={(e: any) => setActivity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none bg-white"
              >
                <option value="Active">{t.actActive}</option>
                <option value="Sedentary">{t.actSedentary}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 md:p-8 mt-8 border border-teal-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t.resultTitle}</h3>
              <div className="flex flex-col gap-2 mt-4 text-gray-600">
                <div className="flex justify-between w-64">
                  <span>{t.totalHale}</span>
                  <span className="font-semibold text-teal-700">{result.totalHale} {t.years}</span>
                </div>
                <div className="flex justify-between w-64">
                  <span>{t.bmiLabel}</span>
                  <span className="font-semibold">{result.bmi}</span>
                </div>
              </div>
            </div>
            
            <div className="text-center bg-white p-6 rounded-2xl shadow-sm border border-teal-100 min-w-[200px]">
              <div className="text-6xl font-bold text-teal-600 mb-2">{result.remaining}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{t.years}</div>
            </div>
          </div>

          <div className="mt-8 bg-white/60 p-4 rounded-xl flex gap-4 items-start">
            <Info className="text-teal-500 shrink-0 mt-1" size={24} />
            <div>
              <p className="text-teal-800 text-sm leading-relaxed">
                {t.warning}
              </p>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-teal max-w-none prose-headings:text-teal-900 prose-a:text-teal-600">
        {lang === 'TH' ? (
          <>
            <h2>ทำความรู้จักกับ HALE (Health-Adjusted Life Expectancy)</h2>
            <p>
              คนส่วนใหญ่มักคุ้นเคยกับคำว่า <strong>อายุขัย (Life Expectancy)</strong> ซึ่งหมายถึงจำนวนปีโดยเฉลี่ยที่คนเราจะมีชีวิตอยู่ แต่ในความเป็นจริง การมีอายุยืนยาวเพียงอย่างเดียวอาจไม่เพียงพอหากบั้นปลายชีวิตต้องเผชิญกับความเจ็บป่วยหรือความพิการ นี่คือจุดที่ <strong>HALE (Health-Adjusted Life Expectancy)</strong> หรือ อายุขัยเฉลี่ยที่มีสุขภาพดี เข้ามามีบทบาทสำคัญ
            </p>

            <h3>HALE คืออะไร?</h3>
            <p>
              HALE คือตัวชี้วัดด้านสาธารณสุขที่องค์การอนามัยโลก (WHO) ใช้เพื่อประเมิน "จำนวนปีที่คาดว่าบุคคลหนึ่งจะสามารถมีชีวิตอยู่ได้อย่างมีสุขภาพดี" โดยหักลบจำนวนปีที่คาดว่าจะต้องอยู่อย่างเจ็บป่วยหรือมีภาวะทุพพลภาพออกไปจากอายุขัยรวม พูดง่ายๆ คือ HALE บอกเราว่าเราจะมีช่วงเวลาที่ร่างกายแข็งแรง สามารถทำกิจกรรมต่างๆ ได้ตามปกติยาวนานแค่ไหน
            </p>

            <h3>ปัจจัยที่ส่งผลต่อ HALE ในเครื่องคำนวณนี้</h3>
            <ul>
              <li><strong>โรคเรื้อรัง (Chronic Conditions):</strong> การมีโรคประจำตัว เช่น เบาหวาน โรคความดันโลหิตสูง หรือโรคหัวใจ จะลดทอนคุณภาพชีวิตและทำให้อายุขัยสุขภาพดีสั้นลง</li>
              <li><strong>ปัญหาด้านการเคลื่อนไหว (Mobility Issues):</strong> ความสามารถในการเคลื่อนไหวที่ลดลง บ่งบอกถึงภาวะเสื่อมถอยของร่างกายและเพิ่มความเสี่ยงต่อการเกิดอุบัติเหตุหรือโรคแทรกซ้อน</li>
              <li><strong>ค่าดัชนีมวลกาย (BMI):</strong> การมีน้ำหนักตัวที่อยู่ในเกณฑ์มาตรฐาน (BMI 18.5 - 24.9) ช่วยลดความเสี่ยงของโรคอ้วนและโรคเรื้อรังต่างๆ ในขณะที่น้ำหนักเกินเกณฑ์หรือต่ำกว่าเกณฑ์ล้วนส่งผลเสียต่อ HALE</li>
              <li><strong>กิจกรรมทางกาย (Physical Activity):</strong> วิถีชีวิตที่กระฉับกระเฉงและการออกกำลังกายอย่างสม่ำเสมอ เป็นปัจจัยบวกที่ช่วยยืดอายุขัยสุขภาพดีได้อย่างมีนัยสำคัญ</li>
            </ul>

            <h3>เราจะเพิ่ม HALE หรืออายุขัยสุขภาพดีได้อย่างไร?</h3>
            <p>
              แม้ว่าเราจะไม่สามารถหยุดยั้งอายุที่เพิ่มขึ้นได้ แต่เราสามารถเพิ่ม HALE หรือช่วงเวลาที่เราจะมีสุขภาพดีได้โดยการปรับเปลี่ยนพฤติกรรมในชีวิตประจำวัน:
            </p>
            <ol>
              <li><strong>รับประทานอาหารที่มีประโยชน์:</strong> เน้นอาหารครบ 5 หมู่ ลดหวาน มัน เค็ม และเพิ่มการทานผักผลไม้</li>
              <li><strong>เคลื่อนไหวร่างกายอยู่เสมอ:</strong> พยายามไม่อยู่นิ่งเป็นเวลานาน หากทำงานออฟฟิศ ควรลุกเดินทุกๆ 1-2 ชั่วโมง และหาเวลาออกกำลังกายอย่างน้อย 150 นาทีต่อสัปดาห์</li>
              <li><strong>ตรวจสุขภาพประจำปี:</strong> การตรวจพบโรคตั้งแต่เนิ่นๆ จะช่วยให้การรักษามีประสิทธิภาพและป้องกันภาวะแทรกซ้อนที่รุนแรงได้</li>
              <li><strong>ควบคุมน้ำหนัก:</strong> รักษาน้ำหนักตัวให้อยู่ในเกณฑ์มาตรฐานเพื่อลดภาระการทำงานของข้อต่อและอวัยวะภายใน</li>
            </ol>
            <p>
              การประเมิน HALE เป็นเพียงเครื่องมือเบื้องต้นที่ช่วยกระตุ้นให้เราหันมาใส่ใจสุขภาพมากยิ่งขึ้น ผลลัพธ์ที่ได้ควรนำไปใช้เป็นแรงบันดาลใจในการปรับปรุงรูปแบบการใช้ชีวิต เพื่อให้คุณมีชีวิตที่ยืนยาวและเปี่ยมไปด้วยคุณภาพอย่างแท้จริง
            </p>
          </>
        ) : (
          <>
            <h2>Understanding HALE (Health-Adjusted Life Expectancy)</h2>
            <p>
              While most people are familiar with the concept of <strong>Life Expectancy</strong> (the total number of years a person is expected to live), living a long life is not always synonymous with living a good life. If the later years are plagued by severe illnesses or disabilities, the quality of life significantly diminishes. This is where <strong>HALE (Health-Adjusted Life Expectancy)</strong> becomes a vital metric.
            </p>

            <h3>What is HALE?</h3>
            <p>
              HALE is a public health indicator used by the World Health Organization (WHO) to estimate the number of years a person can expect to live in "full health." It subtracts the years lived with disease and disability from the overall life expectancy. In simpler terms, HALE tells you how many years you can expect to be healthy and fully active.
            </p>

            <h3>Factors Influencing HALE in This Calculator</h3>
            <ul>
              <li><strong>Chronic Conditions:</strong> Having diagnosed diseases such as diabetes, hypertension, or heart disease significantly reduces the years you live in optimal health.</li>
              <li><strong>Mobility Issues:</strong> Difficulties in moving around can be a strong indicator of physical decline and increase the risk of falls and related complications.</li>
              <li><strong>Body Mass Index (BMI):</strong> Maintaining a healthy weight (a BMI between 18.5 and 24.9) mitigates the risk of metabolic syndromes. Both underweight and obese categories negatively impact your HALE.</li>
              <li><strong>Physical Activity:</strong> A sedentary lifestyle decreases health quality, whereas regular physical activity is one of the most effective ways to boost your healthy years.</li>
            </ul>

            <h3>How Can You Improve Your Healthy Years?</h3>
            <p>
              While aging is inevitable, you have significant control over your HALE through lifestyle modifications:
            </p>
            <ol>
              <li><strong>Adopt a Nutritious Diet:</strong> Focus on whole foods, vegetables, lean proteins, and minimize processed foods and excessive sugars.</li>
              <li><strong>Stay Active:</strong> Incorporate regular cardiovascular and strength-training exercises into your weekly routine. Avoid prolonged sitting.</li>
              <li><strong>Preventive Healthcare:</strong> Regular medical check-ups can catch potential health issues early before they develop into chronic, debilitating conditions.</li>
              <li><strong>Weight Management:</strong> Keeping your BMI in check reduces the strain on your joints and cardiovascular system.</li>
            </ol>
            <p>
              This calculator provides a statistical estimation designed to motivate healthier lifestyle choices. Use it as a guide to take proactive steps today, ensuring that your future years are lived with vitality and high quality of life.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

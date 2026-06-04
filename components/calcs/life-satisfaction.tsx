import React, { useState } from 'react';
import { Smile, HelpCircle, CheckCircle } from 'lucide-react';

export default function LifeSatisfaction({ lang = 'EN' }: { lang?: 'EN' | 'TH' }) {
  const [answers, setAnswers] = useState<number[]>([4, 4, 4, 4, 4]);

  const t = {
    title: lang === 'TH' ? 'แบบประเมินความพึงพอใจในชีวิต' : 'Life Satisfaction Index',
    subtitle: lang === 'TH' ? 'ประเมินมุมมองและความรู้สึกที่คุณมีต่อชีวิตของตัวเองโดยรวม' : 'Evaluate your overall perspective and feelings about your life.',
    questions: lang === 'TH' ? [
      '1. ชีวิตของฉันใกล้เคียงกับอุดมคติของฉัน',
      '2. สภาพชีวิตของฉันอยู่ในระดับที่ยอดเยี่ยม',
      '3. ฉันพึงพอใจกับชีวิตของตัวเองที่เป็นอยู่',
      '4. ที่ผ่านมาฉันได้รับสิ่งที่สำคัญตามที่ต้องการในชีวิตแล้ว',
      '5. หากย้อนเวลากลับไปได้ ฉันแทบจะไม่เปลี่ยนแปลงอะไรเลยในชีวิต'
    ] : [
      '1. In most ways my life is close to my ideal.',
      '2. The conditions of my life are excellent.',
      '3. I am satisfied with my life.',
      '4. So far I have gotten the important things I want in life.',
      '5. If I could live my life over, I would change almost nothing.'
    ],
    scale: lang === 'TH' ? [
      'ไม่เห็นด้วยอย่างยิ่ง',
      'ไม่เห็นด้วย',
      'ค่อนข้างไม่เห็นด้วย',
      'เฉยๆ / เป็นกลาง',
      'ค่อนข้างเห็นด้วย',
      'เห็นด้วย',
      'เห็นด้วยอย่างยิ่ง'
    ] : [
      'Strongly disagree',
      'Disagree',
      'Slightly disagree',
      'Neither agree nor disagree',
      'Slightly agree',
      'Agree',
      'Strongly agree'
    ],
    resultTitle: lang === 'TH' ? 'ผลประเมินของคุณ' : 'Your Results',
    score: lang === 'TH' ? 'คะแนนรวม:' : 'Total Score:',
    meaning: lang === 'TH' ? 'การแปลผล:' : 'Interpretation:',
    interpretations: lang === 'TH' ? [
      { max: 9, text: 'ไม่พึงพอใจอย่างยิ่ง (Extremely dissatisfied)' },
      { max: 14, text: 'ไม่พึงพอใจ (Dissatisfied)' },
      { max: 19, text: 'ไม่พึงพอใจเล็กน้อย (Slightly dissatisfied)' },
      { max: 20, text: 'เป็นกลาง (Neutral)' },
      { max: 25, text: 'พึงพอใจเล็กน้อย (Slightly satisfied)' },
      { max: 30, text: 'พึงพอใจ (Satisfied)' },
      { max: 35, text: 'พึงพอใจอย่างยิ่ง (Extremely satisfied)' }
    ] : [
      { max: 9, text: 'Extremely dissatisfied' },
      { max: 14, text: 'Dissatisfied' },
      { max: 19, text: 'Slightly dissatisfied' },
      { max: 20, text: 'Neutral' },
      { max: 25, text: 'Slightly satisfied' },
      { max: 30, text: 'Satisfied' },
      { max: 35, text: 'Extremely satisfied' }
    ]
  };

  const handleAnswerChange = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const resultInterp = t.interpretations.find(i => totalScore <= i.max)?.text || t.interpretations[6].text;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-12">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-sky-100">
          <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600">
            <Smile size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
            <p className="text-gray-500 mt-1">{t.subtitle}</p>
          </div>
        </div>

        <div className="space-y-10 mb-10">
          {t.questions.map((q, qIndex) => (
            <div key={qIndex} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="font-semibold text-gray-800 mb-4 text-lg">{q}</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleAnswerChange(qIndex, val)}
                    className={`flex-1 py-2 px-1 text-xs sm:text-sm rounded-xl border transition-all ${
                      answers[qIndex] === val
                        ? 'bg-sky-500 border-sky-500 text-white shadow-md'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-sky-300 hover:bg-sky-50'
                    }`}
                  >
                    <div className="font-bold mb-1">{val}</div>
                    <div className="leading-tight opacity-90">{t.scale[val - 1]}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Smile size={160} />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2 text-sky-50">{t.resultTitle}</h3>
              <p className="text-sky-100 mb-4 text-sm md:text-base">
                {lang === 'TH' 
                  ? 'คะแนนอ้างอิงจากมาตรวัดความพึงพอใจในชีวิต (Satisfaction with Life Scale - SWLS) ของ Ed Diener' 
                  : 'Scores are based on the Satisfaction with Life Scale (SWLS) developed by Ed Diener.'}
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-lg font-medium">
                <span>{t.meaning}</span>
                <span className="font-bold text-white">{resultInterp}</span>
              </div>
            </div>
            
            <div className="text-center bg-white text-sky-600 p-6 rounded-2xl shadow-sm min-w-[160px]">
              <div className="text-5xl font-black mb-1">{totalScore}</div>
              <div className="text-sm font-medium uppercase tracking-wider text-slate-400">/ 35</div>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-sky max-w-none prose-headings:text-sky-900 prose-a:text-sky-600">
        {lang === 'TH' ? (
          <>
            <h2>การประเมินความพึงพอใจในชีวิต (Satisfaction with Life Scale) คืออะไร?</h2>
            <p>
              ความสุขของมนุษย์เป็นเรื่องที่ลึกซึ้งและมีความเป็นปัจเจกสูง (Subjective) สิ่งที่ทำให้คนหนึ่งมีความสุขอาจไม่ได้ทำให้แก่อีกคนหนึ่งมีความสุขเสมอไป ด้วยเหตุนี้ นักจิตวิทยาชื่อดัง <strong>Ed Diener</strong> จึงได้พัฒนาเครื่องมือที่เรียกว่า <strong>Satisfaction with Life Scale (SWLS)</strong> ขึ้นมาในปี 1985 เพื่อใช้วัดความพึงพอใจในชีวิตแบบองค์รวม โดยให้ผู้ประเมินใช้เกณฑ์หรือมาตรฐานของตนเองเป็นตัวตัดสิน
            </p>

            <h3>ทำไมเครื่องมือนี้จึงเป็นที่นิยมระดับโลก?</h3>
            <p>
              แบบประเมิน SWLS ได้รับการยอมรับอย่างกว้างขวางในวงการจิตวิทยาเชิงบวก (Positive Psychology) เพราะมีข้อคำถามที่สั้น กระชับ เพียง 5 ข้อ แต่สามารถสะท้อนภาพรวมของความรู้สึกที่บุคคลมีต่อชีวิตของตนเองได้อย่างแม่นยำ เครื่องมือนี้ไม่ได้ถามถึงอารมณ์ชั่ววูบ (เช่น วันนี้คุณอารมณ์ดีหรือไม่) แต่ถามถึง <strong>การประเมินภาพรวม (Cognitive Judgment)</strong> ของชีวิตที่ผ่านมาจนถึงปัจจุบัน
            </p>

            <h3>การตีความหมายของคะแนน</h3>
            <p>
              เมื่อคุณทำแบบประเมินเสร็จสิ้น คะแนนรวมจะอยู่ระหว่าง 5 ถึง 35 คะแนน ซึ่งสามารถแปลความหมายได้ดังนี้:
            </p>
            <ul>
              <li><strong>31-35 คะแนน (พึงพอใจอย่างยิ่ง):</strong> คุณรักชีวิตของตัวเองอย่างมาก รู้สึกว่าทุกอย่างเป็นไปตามที่หวังและมีความสุขอย่างแท้จริง</li>
              <li><strong>26-30 คะแนน (พึงพอใจ):</strong> โดยรวมแล้วชีวิตของคุณดีมาก แม้จะมีบางสิ่งที่ยังอยากปรับปรุง แต่คุณก็มีความสุขกับสิ่งที่มีอยู่</li>
              <li><strong>21-25 คะแนน (พึงพอใจเล็กน้อย):</strong> ชีวิตโดยทั่วไปถือว่าดี แต่อาจมีบางเรื่องหรือบางด้านที่คุณยังรู้สึกว่าสามารถดีกว่านี้ได้อีก</li>
              <li><strong>20 คะแนน (เป็นกลาง):</strong> คุณไม่ได้รู้สึกแย่ แต่ก็ไม่ได้รู้สึกพึงพอใจเป็นพิเศษ ชีวิตดำเนินไปเรื่อยๆ</li>
              <li><strong>15-19 คะแนน (ไม่พึงพอใจเล็กน้อย):</strong> เริ่มมีบางปัญหาในชีวิตที่คุณรู้สึกกังวลหรือไม่สบายใจ ซึ่งส่งผลกระทบต่อความสุขโดยรวม</li>
              <li><strong>10-14 คะแนน (ไม่พึงพอใจ):</strong> คุณอาจกำลังเผชิญกับช่วงเวลาที่ยากลำบาก หรือมีความขัดแย้งในชีวิตที่ต้องได้รับการแก้ไข</li>
              <li><strong>5-9 คะแนน (ไม่พึงพอใจอย่างยิ่ง):</strong> คุณรู้สึกผิดหวังกับสภาพชีวิตในปัจจุบันอย่างมาก เป็นสัญญาณว่าคุณอาจต้องการความช่วยเหลือ หรือต้องปรับเปลี่ยนวิถีชีวิตครั้งใหญ่</li>
            </ul>

            <h3>เราจะเพิ่มความพึงพอใจในชีวิตได้อย่างไร?</h3>
            <p>
              หากคะแนนของคุณไม่อยู่ในระดับที่คุณหวังไว้ ไม่ต้องกังวล ความพึงพอใจในชีวิตสามารถเปลี่ยนแปลงและพัฒนาได้เสมอ ลองเริ่มต้นจากการ <strong>ฝึกฝนความรู้สึกขอบคุณ (Gratitude)</strong> มองหาสิ่งดีๆ รอบตัวแม้เพียงเล็กน้อยในแต่ละวัน ตั้งเป้าหมายที่มีความหมายต่อตัวคุณเอง (Purpose) และใช้เวลาที่มีคุณภาพกับคนที่คุณรัก การปรับมุมมองเพียงเล็กน้อยอาจช่วยให้คะแนนความพึงพอใจในชีวิตของคุณเพิ่มสูงขึ้นในอนาคต
            </p>
          </>
        ) : (
          <>
            <h2>What is the Satisfaction with Life Scale (SWLS)?</h2>
            <p>
              Human happiness is profoundly subjective. What brings joy to one person might not necessarily do the same for another. Recognizing this, renowned psychologist <strong>Ed Diener</strong> developed the <strong>Satisfaction with Life Scale (SWLS)</strong> in 1985. This tool was designed to measure global cognitive judgments of satisfaction with one's life, allowing individuals to evaluate their lives according to their own subjective criteria and standards.
            </p>

            <h3>Why is this tool globally recognized?</h3>
            <p>
              The SWLS is widely accepted in the field of Positive Psychology because it is concise—consisting of just 5 statements—yet it accurately captures a person's overall evaluation of their life. It does not measure fleeting emotions (e.g., whether you are having a good or bad day), but rather focuses on a <strong>global cognitive judgment</strong> of life spanning from the past to the present.
            </p>

            <h3>Interpreting Your Score</h3>
            <p>
              Upon completing the assessment, your total score will range from 5 to 35. This score can be interpreted as follows:
            </p>
            <ul>
              <li><strong>31-35 (Extremely satisfied):</strong> You love your life. You feel that things are going exactly as you hoped and you experience genuine, deep-seated happiness.</li>
              <li><strong>26-30 (Satisfied):</strong> Overall, your life is going very well. While there might be minor areas for improvement, you are happy with what you have.</li>
              <li><strong>21-25 (Slightly satisfied):</strong> Life is generally good, but you might feel that certain aspects could be better or are missing.</li>
              <li><strong>20 (Neutral):</strong> You neither feel particularly satisfied nor dissatisfied. You are at a neutral midpoint.</li>
              <li><strong>15-19 (Slightly dissatisfied):</strong> There are specific problems or issues in your life that are causing you concern and impacting your overall happiness.</li>
              <li><strong>10-14 (Dissatisfied):</strong> You may be going through a particularly challenging phase or experiencing significant conflicts that need resolution.</li>
              <li><strong>5-9 (Extremely dissatisfied):</strong> You are highly disappointed with your current life circumstances. This is a strong signal that significant changes or professional support might be needed.</li>
            </ul>

            <h3>How Can You Improve Life Satisfaction?</h3>
            <p>
              If your score is lower than you desire, do not despair. Life satisfaction is fluid and can be developed over time. Start by <strong>practicing gratitude</strong>—actively looking for and appreciating the small, positive things in your everyday life. Set meaningful, personal goals, and spend quality time with loved ones. Sometimes, a small shift in perspective is all it takes to significantly boost your life satisfaction in the future.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

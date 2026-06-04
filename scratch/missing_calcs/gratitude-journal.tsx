import React, { useState } from 'react';
import { BookOpen, Sparkles, Smile } from 'lucide-react';

export default function GratitudeJournal({ lang }: any) {
  const [entriesPerWeek, setEntriesPerWeek] = useState<number>(3);
  const [minutesPerEntry, setMinutesPerEntry] = useState<number>(5);
  const [weeksMaintained, setWeeksMaintained] = useState<number>(4);

  const calculate = () => {
    const totalEntries = entriesPerWeek * weeksMaintained;
    const totalMinutes = entriesPerWeek * minutesPerEntry * weeksMaintained;
    
    let impactLevel = '';
    let description = '';
    let happinessBoost = 0; // percentage approximation based on literature

    if (totalEntries >= 60) {
      impactLevel = lang === 'EN' ? 'Profound Impact' : 'ผลลัพธ์ลึกซึ้ง';
      description = lang === 'EN' ? 'You have established a strong gratitude habit, leading to long-term well-being.' : 'คุณสร้างนิสัยแห่งความขอบคุณที่แข็งแกร่ง นำไปสู่ความเป็นอยู่ที่ดีในระยะยาว';
      happinessBoost = 15;
    } else if (totalEntries >= 20) {
      impactLevel = lang === 'EN' ? 'Noticeable Shift' : 'การเปลี่ยนแปลงที่ชัดเจน';
      description = lang === 'EN' ? 'You should start feeling more optimistic and resilient to daily stressors.' : 'คุณควรเริ่มรู้สึกมองโลกในแง่ดีมากขึ้นและรับมือกับความเครียดได้ดีขึ้น';
      happinessBoost = 10;
    } else if (totalEntries >= 5) {
      impactLevel = lang === 'EN' ? 'Early Benefits' : 'ประโยชน์ในระยะเริ่มต้น';
      description = lang === 'EN' ? 'You are planting the seeds of positive thinking. Keep going!' : 'คุณกำลังหว่านเมล็ดพันธุ์แห่งการคิดบวก ทำต่อไป!';
      happinessBoost = 5;
    } else {
      impactLevel = lang === 'EN' ? 'Just Starting' : 'เพิ่งเริ่มต้น';
      description = lang === 'EN' ? 'Every entry counts. Begin your journey toward a more thankful mindset.' : 'ทุกการบันทึกมีความหมาย เริ่มต้นการเดินทางสู่กรอบความคิดที่เต็มไปด้วยความขอบคุณ';
      happinessBoost = 1;
    }

    return { totalEntries, totalMinutes, impactLevel, description, happinessBoost };
  };

  const { totalEntries, totalMinutes, impactLevel, description, happinessBoost } = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <BookOpen className="w-6 h-6 mr-2 text-teal-500" />
        {lang === 'EN' ? 'Gratitude Journal Impact' : 'คำนวณผลกระทบจากบันทึกความขอบคุณ'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'EN' ? 'Journal Entries per Week' : 'จำนวนครั้งที่จดบันทึกต่อสัปดาห์'}
            </label>
            <div className="relative">
              <Sparkles className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={entriesPerWeek || ''}
                onChange={(e) => setEntriesPerWeek(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="3"
                max="21"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'EN' ? 'Minutes per Entry' : 'เวลาที่ใช้จดบันทึกแต่ละครั้ง (นาที)'}
            </label>
            <input
              type="number"
              value={minutesPerEntry || ''}
              onChange={(e) => setMinutesPerEntry(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              placeholder="5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'EN' ? 'Weeks Maintained' : 'จำนวนสัปดาห์ที่ทำต่อเนื่อง'}
            </label>
            <input
              type="number"
              value={weeksMaintained || ''}
              onChange={(e) => setWeeksMaintained(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              placeholder="4"
            />
          </div>
        </div>

        <div className="bg-teal-50 p-6 rounded-xl border border-teal-100 flex flex-col justify-center text-center">
          <Smile className="w-12 h-12 text-teal-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-teal-900 mb-2">
            {impactLevel}
          </h3>
          <p className="text-teal-700 mb-6">{description}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-100">
              <div className="text-sm text-gray-500 mb-1">{lang === 'EN' ? 'Total Entries' : 'จำนวนครั้งที่บันทึก'}</div>
              <div className="text-2xl font-bold text-gray-800">{totalEntries}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-100">
              <div className="text-sm text-gray-500 mb-1">{lang === 'EN' ? 'Est. Happiness Boost' : 'ความสุขที่เพิ่มขึ้น (โดยประมาณ)'}</div>
              <div className="text-2xl font-bold text-teal-600">+{happinessBoost}%</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {lang === 'EN' ? `Total time invested: ${totalMinutes} minutes` : `เวลาทั้งหมดที่ใช้: ${totalMinutes} นาที`}
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-teal max-w-none text-gray-700">
        <h2>{lang === 'EN' ? 'The Power of a Gratitude Journal' : 'พลังของการบันทึกความขอบคุณ (Gratitude Journal)'}</h2>
        {lang === 'EN' ? (
          <>
            <p>Keeping a gratitude journal is one of the simplest yet most effective practices for improving psychological well-being. Positive psychology research suggests that consistently writing down things you are thankful for can rewire your brain to focus on the good, rather than ruminating on the negative.</p>
            <p>We have a natural "negativity bias," meaning our brains are wired to notice and remember threats and problems more vividly than positive events. Gratitude journaling actively counteracts this bias. By taking just a few minutes a day to reflect on positive experiences, you train your mind to spot the silver linings.</p>
            <h3>Proven Benefits of Gratitude</h3>
            <ul>
              <li><strong>Increased Happiness:</strong> Studies show a significant increase in baseline happiness and a reduction in depressive symptoms for those who practice gratitude regularly.</li>
              <li><strong>Better Sleep:</strong> Spending 15 minutes noting a few grateful sentiments before bed can help you sleep longer and better.</li>
              <li><strong>Enhanced Resilience:</strong> Grateful people bounce back faster from stress and trauma, as they maintain a broader perspective on life.</li>
              <li><strong>Stronger Relationships:</strong> Expressing gratitude makes us more empathetic and less aggressive, fostering deeper social connections.</li>
            </ul>
            <p>The key to reaping these benefits is consistency and specificity. Writing "I am grateful for my family" every day will quickly lose its emotional impact. Instead, aim for specifics: "I am grateful that my partner made me coffee this morning before I woke up." The more detail and emotion you can inject into your entries, the stronger the psychological effect.</p>
            <p>Use this Gratitude Journal Impact Calculator to track your progress and estimate the cumulative effect of your positive habits. Even dedicating 5 minutes a day, three times a week, can lead to noticeable shifts in your mood and outlook within a month. Start small, stay consistent, and watch how gratitude transforms your life.</p>
          </>
        ) : (
          <>
            <p>การเขียนบันทึกความขอบคุณเป็นหนึ่งในวิธีการที่เรียบง่ายแต่มีประสิทธิภาพที่สุดในการพัฒนาความเป็นอยู่ที่ดีทางจิตวิทยา งานวิจัยทางจิตวิทยาเชิงบวกชี้ให้เห็นว่าการจดบันทึกสิ่งที่คุณรู้สึกขอบคุณอย่างสม่ำเสมอ สามารถปรับเปลี่ยนการทำงานของสมองให้จดจ่อกับสิ่งดีๆ ได้ มากกว่าที่จะจมอยู่กับเรื่องแง่ลบ</p>
            <p>มนุษย์เรามี "อคติเชิงลบ" (Negativity Bias) ตามธรรมชาติ ซึ่งหมายความว่าสมองของเราถูกสร้างมาให้สังเกตและจดจำภัยคุกคามหรือปัญหาได้ชัดเจนกว่าเหตุการณ์เชิงบวก การจดบันทึกความขอบคุณเป็นการต่อต้านอคตินี้อย่างแข็งขัน การใช้เวลาเพียงไม่กี่นาทีต่อวันเพื่อทบทวนประสบการณ์เชิงบวก จะเป็นการฝึกฝนให้จิตใจของคุณมองเห็นแสงสว่างในความมืดมน</p>
            <h3>ประโยชน์ที่ได้รับการพิสูจน์แล้วของความขอบคุณ</h3>
            <ul>
              <li><strong>ความสุขเพิ่มขึ้น:</strong> การศึกษาพบว่าผู้ที่ฝึกฝนความขอบคุณเป็นประจำ มีระดับความสุขพื้นฐานเพิ่มขึ้นอย่างมีนัยสำคัญ และลดอาการซึมเศร้าลงได้</li>
              <li><strong>การนอนหลับดีขึ้น:</strong> การใช้เวลา 15 นาทีจดบันทึกความรู้สึกขอบคุณก่อนนอน จะช่วยให้คุณนอนหลับได้นานขึ้นและหลับสนิทขึ้น</li>
              <li><strong>ความยืดหยุ่นทางจิตใจสูงขึ้น:</strong> ผู้ที่มีความขอบคุณมักจะฟื้นตัวจากความเครียดและความบอบช้ำทางจิตใจได้เร็วกว่า เนื่องจากพวกเขารักษามุมมองต่อชีวิตที่กว้างขึ้น</li>
              <li><strong>ความสัมพันธ์แข็งแกร่งขึ้น:</strong> การแสดงความขอบคุณทำให้เรามีความเห็นอกเห็นใจมากขึ้นและก้าวร้าวน้อยลง ส่งเสริมความสัมพันธ์ทางสังคมที่ลึกซึ้งยิ่งขึ้น</li>
            </ul>
            <p>กุญแจสำคัญในการรับประโยชน์เหล่านี้คือความสม่ำเสมอและความเฉพาะเจาะจง การเขียนว่า "ฉันขอบคุณครอบครัวของฉัน" ทุกวันจะทำให้ผลกระทบทางอารมณ์ลดลงอย่างรวดเร็ว ลองตั้งเป้าหมายที่ความเฉพาะเจาะจงแทน เช่น "ฉันรู้สึกขอบคุณที่คนรักชงกาแฟให้ฉันเมื่อเช้านี้ก่อนที่ฉันจะตื่น" ยิ่งคุณสามารถใส่รายละเอียดและอารมณ์ลงไปในบันทึกได้มากเท่าไร ผลกระทบทางจิตวิทยาก็จะยิ่งแข็งแกร่งขึ้นเท่านั้น</p>
            <p>ใช้เครื่องคำนวณผลกระทบจากบันทึกความขอบคุณนี้เพื่อติดตามความคืบหน้าของคุณ และประเมินผลสะสมของนิสัยเชิงบวกนี้ แม้แต่การใช้เวลาเพียง 5 นาทีต่อวัน สามครั้งต่อสัปดาห์ ก็สามารถนำไปสู่การเปลี่ยนแปลงที่สังเกตเห็นได้ในอารมณ์และมุมมองของคุณภายในหนึ่งเดือน เริ่มต้นจากสิ่งเล็กๆ รักษาความสม่ำเสมอ และเฝ้าดูว่าความขอบคุณจะเปลี่ยนแปลงชีวิตคุณไปในทิศทางที่ดีขึ้นได้อย่างไร</p>
          </>
        )}
      </div>
    </div>
  );
}

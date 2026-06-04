"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Info, Clock, CheckCircle, ListTodo } from "lucide-react";

const FIXED_HOLIDAYS = [
  { month: 1, date: 1, name: "วันขึ้นปีใหม่", en: "New Year's Day" },
  { month: 4, date: 6, name: "วันจักรี", en: "Chakri Memorial Day" },
  { month: 4, date: 13, name: "วันสงกรานต์", en: "Songkran Festival" },
  { month: 4, date: 14, name: "วันสงกรานต์", en: "Songkran Festival" },
  { month: 4, date: 15, name: "วันสงกรานต์", en: "Songkran Festival" },
  { month: 5, date: 1, name: "วันแรงงานแห่งชาติ", en: "National Labour Day" },
  { month: 5, date: 4, name: "วันฉัตรมงคล", en: "Coronation Day" },
  { month: 6, date: 3, name: "วันเฉลิมพระชนมพรรษา สมเด็จพระนางเจ้าสุทิดาฯ", en: "Queen Suthida's Birthday" },
  { month: 7, date: 28, name: "วันเฉลิมพระชนมพรรษา ร.10", en: "King Maha Vajiralongkorn's Birthday" },
  { month: 8, date: 12, name: "วันแม่แห่งชาติ", en: "Her Majesty the Queen Mother's Birthday" },
  { month: 10, date: 13, name: "วันนวมินทรมหาราช", en: "Navamindra Maharaj Day" },
  { month: 10, date: 23, name: "วันปิยมหาราช", en: "Chulalongkorn Day" },
  { month: 12, date: 5, name: "วันพ่อแห่งชาติ", en: "King Bhumibol Adulyadej's Birthday" },
  { month: 12, date: 10, name: "วันรัฐธรรมนูญ", en: "Constitution Day" },
  { month: 12, date: 31, name: "วันสิ้นปี", en: "New Year's Eve" }
];

export default function ThaiPublicHolidays({ lang }: { lang?: string }) {
  const isEn = lang === "en";
  const [currentDate, setCurrentDate] = useState<string>("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [holidays, setHolidays] = useState<{dateStr: string, name: string, passed: boolean}[]>([]);

  useEffect(() => {
    const today = new Date();
    const tzOffset = today.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(today.getTime() - tzOffset)).toISOString().split("T")[0];
    setCurrentDate(localISOTime);
  }, []);

  useEffect(() => {
    if (!currentDate) return;
    const generated = FIXED_HOLIDAYS.map(h => {
      const dateStr = `${year}-${String(h.month).padStart(2, "0")}-${String(h.date).padStart(2, "0")}`;
      const passed = dateStr < currentDate;
      return { dateStr, name: isEn ? h.en : h.name, passed };
    });
    setHolidays(generated);
  }, [year, currentDate, isEn]);

  const passedCount = holidays.filter(h => h.passed).length;
  const remainingCount = holidays.length - passedCount;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          {isEn ? "Thai Public Holidays Calculator" : "เช็ควันหยุดนักขัตฤกษ์"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {isEn ? "Select Year" : "เลือกปี (ค.ศ.)"}
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {isEn ? "Current Date (for comparison)" : "วันที่ปัจจุบัน (ใช้เปรียบเทียบ)"}
            </label>
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col items-center justify-center">
            <span className="text-blue-800 font-semibold mb-1">{isEn ? "Total Holidays" : "วันหยุดทั้งหมด"}</span>
            <span className="text-3xl font-bold text-blue-600">{holidays.length}</span>
            <span className="text-sm text-blue-600/80">{isEn ? "days" : "วัน"}</span>
          </div>
          <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex flex-col items-center justify-center">
            <span className="text-green-800 font-semibold mb-1">{isEn ? "Passed" : "ผ่านมาแล้ว"}</span>
            <span className="text-3xl font-bold text-green-600">{passedCount}</span>
            <span className="text-sm text-green-600/80">{isEn ? "days" : "วัน"}</span>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex flex-col items-center justify-center">
            <span className="text-orange-800 font-semibold mb-1">{isEn ? "Remaining" : "เหลืออีก"}</span>
            <span className="text-3xl font-bold text-orange-600">{remainingCount}</span>
            <span className="text-sm text-orange-600/80">{isEn ? "days" : "วัน"}</span>
          </div>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-slate-50 p-4 font-semibold text-slate-700 border-b border-slate-200 flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-slate-500" />
            {isEn ? `Holidays in ${year}` : `รายการวันหยุดประจำปี ${year}`}
          </div>
          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {holidays.map((h, i) => (
              <div key={i} className={`p-4 flex justify-between items-center ${h.passed ? 'bg-slate-50/50 opacity-70' : 'bg-white'}`}>
                <div className="flex items-center gap-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${h.passed ? 'bg-slate-200 text-slate-500' : 'bg-blue-100 text-blue-600'}`}>
                    {h.passed ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className={`font-medium ${h.passed ? 'text-slate-600 line-through' : 'text-slate-800'}`}>
                      {h.name}
                    </div>
                    <div className="text-sm text-slate-500">
                      {new Date(h.dateStr).toLocaleDateString(isEn ? 'en-US' : 'th-TH', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
                <div>
                  {h.passed ? (
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">{isEn ? "Passed" : "ผ่านมาแล้ว"}</span>
                  ) : (
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">{isEn ? "Upcoming" : "กำลังจะถึง"}</span>
                  )}
                </div>
              </div>
            ))}
            {holidays.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                {isEn ? "No holiday data available." : "ไม่มีข้อมูลวันหยุด"}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 text-xs text-slate-500 flex items-start gap-1">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>
            {isEn ? 
              "Note: This tool lists standard fixed-date Thai public holidays. Some holidays based on the lunar calendar (e.g., Makha Bucha, Visakha Bucha, Asanha Bucha) or ad-hoc cabinet decisions are not included by default as their dates vary each year." : 
              "หมายเหตุ: เครื่องมือนี้แสดงรายการวันหยุดนักขัตฤกษ์ไทยแบบวันที่คงที่เท่านั้น วันหยุดที่อิงตามปฏิทินจันทรคติ (เช่น มาฆบูชา วิสาขบูชา อาสาฬหบูชา) หรือวันหยุดพิเศษตามมติ ครม. อาจไม่มีในรายการนี้ เนื่องจากมีการเปลี่ยนแปลงในแต่ละปี"}
          </p>
        </div>
      </div>

      <article className="prose prose-slate max-w-none p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
        <h2>{isEn ? "Checking Remaining Thai Public Holidays" : "ตรวจสอบวันหยุดนักขัตฤกษ์ปีนี้เหลือกี่วัน"}</h2>
        <p>
          {isEn ? 
            "Planning vacations, long weekends, and knowing how many public holidays are left in the year is a favorite activity for many workers. Thailand has a generous amount of public holidays, some of which are fixed dates, and others which change according to the lunar calendar. Using our calculator helps you instantly see which holidays have already passed and which ones you can look forward to for your next getaway." : 
            "การวางแผนการลาพักผ่อน การจัดทริปเที่ยวในวันหยุดยาว หรือแค่การได้รู้ว่าปีนี้เรายังเหลือวันหยุดนักขัตฤกษ์อีกกี่วัน เป็นสิ่งที่คนทำงานหรือมนุษย์เงินเดือนหลายคนตั้งตารอคอย ประเทศไทยนับเป็นหนึ่งในประเทศที่มีวันหยุดนักขัตฤกษ์ค่อนข้างมากในแต่ละปี โดยแบ่งออกเป็นวันหยุดที่มีวันที่คงที่ตายตัว และวันหยุดที่เปลี่ยนแปลงไปตามปฏิทินจันทรคติ การใช้เครื่องมือตรวจสอบวันหยุดของเราจะช่วยให้คุณมองเห็นภาพรวมได้อย่างรวดเร็วว่า มีวันหยุดไหนบ้างที่ผ่านมาแล้ว และมีวันหยุดไหนที่กำลังจะมาถึงให้คุณได้เตรียมตัว"}
        </p>
        <h3>{isEn ? "Why Do We Need to Plan Ahead for Holidays?" : "ทำไมถึงควรวางแผนวันหยุดล่วงหน้า?"}</h3>
        <p>
          {isEn ? 
            "Knowing your upcoming holidays well in advance allows you to book flights and accommodation at lower prices. It also enables you to coordinate with your colleagues and HR department so your workload is effectively managed. If a public holiday falls on a Tuesday or Thursday, taking a leave day on Monday or Friday can give you a fantastic 4-day long weekend!" : 
            "การรู้วันหยุดล่วงหน้าเป็นเวลานานช่วยให้คุณสามารถจองตั๋วเครื่องบินและที่พักได้ในราคาที่ถูกกว่า อีกทั้งยังช่วยให้คุณสามารถประสานงานกับเพื่อนร่วมงานและฝ่ายบุคคลเพื่อจัดการภาระงานได้อย่างมีประสิทธิภาพ นอกจากนี้ หากวันหยุดนักขัตฤกษ์ตรงกับวันอังคารหรือวันพฤหัสบดี การใช้วันลาพักร้อนเพิ่มเติมในวันจันทร์หรือวันศุกร์ก็จะช่วยให้คุณได้หยุดยาวต่อเนื่องถึง 4 วันเลยทีเดียว เรียกว่าเป็นการใช้วันลาให้คุ้มค่าที่สุด"}
        </p>
        <h3>{isEn ? "Standard Fixed-Date Holidays in Thailand" : "วันหยุดนักขัตฤกษ์ไทยแบบวันที่คงที่"}</h3>
        <ul>
          <li><strong>{isEn ? "January 1 - New Year's Day" : "1 มกราคม - วันขึ้นปีใหม่"}</strong>: {isEn ? "The beginning of the new calendar year." : "การเริ่มต้นปีปฏิทินใหม่"}</li>
          <li><strong>{isEn ? "April 6 - Chakri Memorial Day" : "6 เมษายน - วันจักรี"}</strong>: {isEn ? "Commemorating the establishment of the Chakri Dynasty." : "รำลึกถึงการสถาปนาราชวงศ์จักรี"}</li>
          <li><strong>{isEn ? "April 13-15 - Songkran Festival" : "13-15 เมษายน - วันสงกรานต์"}</strong>: {isEn ? "Traditional Thai New Year and famous water festival." : "วันปีใหม่ไทยและเทศกาลสาดน้ำที่โด่งดังไปทั่วโลก"}</li>
          <li><strong>{isEn ? "May 1 - National Labour Day" : "1 พฤษภาคม - วันแรงงานแห่งชาติ"}</strong>: {isEn ? "Recognizing the contributions of workers." : "เพื่อยกย่องและเห็นความสำคัญของผู้ใช้แรงงาน"}</li>
          <li><strong>{isEn ? "May 4 - Coronation Day" : "4 พฤษภาคม - วันฉัตรมงคล"}</strong>: {isEn ? "Commemorating the coronation of the current monarch." : "รำลึกถึงพระราชพิธีบรมราชาภิเษก"}</li>
          <li><strong>{isEn ? "June 3 - Queen Suthida's Birthday" : "3 มิถุนายน - วันเฉลิมพระชนมพรรษา สมเด็จพระนางเจ้าสุทิดาฯ"}</strong></li>
          <li><strong>{isEn ? "July 28 - King Maha Vajiralongkorn's Birthday" : "28 กรกฎาคม - วันเฉลิมพระชนมพรรษา ร.10"}</strong></li>
          <li><strong>{isEn ? "August 12 - Mother's Day" : "12 สิงหาคม - วันแม่แห่งชาติ"}</strong>: {isEn ? "Also the birthday of Her Majesty the Queen Mother." : "ตรงกับวันคล้ายวันพระราชสมภพของสมเด็จพระบรมราชชนนีพันปีหลวง"}</li>
          <li><strong>{isEn ? "October 13 - Navamindra Maharaj Day" : "13 ตุลาคม - วันนวมินทรมหาราช"}</strong>: {isEn ? "Commemorating King Bhumibol Adulyadej the Great." : "วันคล้ายวันสวรรคตของพระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร"}</li>
          <li><strong>{isEn ? "October 23 - Chulalongkorn Day" : "23 ตุลาคม - วันปิยมหาราช"}</strong>: {isEn ? "Commemorating King Chulalongkorn (Rama V)." : "รำลึกถึงพระบาทสมเด็จพระจุลจอมเกล้าเจ้าอยู่หัว"}</li>
          <li><strong>{isEn ? "December 5 - Father's Day" : "5 ธันวาคม - วันพ่อแห่งชาติ"}</strong>: {isEn ? "Birthday of King Bhumibol Adulyadej the Great." : "ตรงกับวันคล้ายวันพระราชสมภพของในหลวงรัชกาลที่ 9"}</li>
          <li><strong>{isEn ? "December 10 - Constitution Day" : "10 ธันวาคม - วันรัฐธรรมนูญ"}</strong>: {isEn ? "Commemorating the first permanent constitution." : "รำลึกถึงการพระราชทานรัฐธรรมนูญฉบับถาวรฉบับแรก"}</li>
          <li><strong>{isEn ? "December 31 - New Year's Eve" : "31 ธันวาคม - วันสิ้นปี"}</strong>: {isEn ? "The final day of the year." : "วันสุดท้ายของปี เตรียมก้าวเข้าสู่ปีใหม่"}</li>
        </ul>
        <p>
          {isEn ? 
            "Besides these fixed dates, Thailand also has important Buddhist holidays like Makha Bucha, Visakha Bucha, and Asanha Bucha, as well as Khao Phansa (Buddhist Lent) which change dates every year according to the lunar phases. In some years, the government may also announce special ad-hoc public holidays to stimulate domestic tourism. By regularly checking your holiday calendar, you ensure you never miss out on well-deserved rest!" : 
            "นอกเหนือจากวันที่คงที่เหล่านี้ ประเทศไทยยังมีวันหยุดสำคัญทางพุทธศาสนา เช่น วันมาฆบูชา วันวิสาขบูชา วันอาสาฬหบูชา และวันเข้าพรรษา ซึ่งจะมีการเปลี่ยนแปลงวันที่ไปในแต่ละปีตามปฏิทินจันทรคติ และในบางปี คณะรัฐมนตรีอาจมีการประกาศวันหยุดราชการกรณีพิเศษเพิ่มเติมเพื่อกระตุ้นเศรษฐกิจและการท่องเที่ยวภายในประเทศ การหมั่นตรวจสอบปฏิทินวันหยุดอยู่เสมอจะช่วยให้คุณไม่พลาดโอกาสที่จะได้รับการพักผ่อนอย่างเต็มที่!"}
        </p>
      </article>
    </div>
  );
}

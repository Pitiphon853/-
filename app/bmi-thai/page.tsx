"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Activity, ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    q: "BMI ปกติของคนไทยอยู่ที่เท่าไหร่?",
    a: "สำหรับคนไทยและคนเอเชีย เกณฑ์ BMI ที่ปกติและสุขภาพดีคือ 18.5 - 22.9 (ต่างจากฝรั่งที่ให้ถึง 24.9) หากค่า BMI ของคุณแตะ 23.0 จะถือว่าเริ่มท้วมหรือน้ำหนักเกินเกณฑ์มาตรฐานเอเชีย",
  },
  {
    q: "BMI กับเปอร์เซ็นต์ไขมันต่างกันยังไง?",
    a: "BMI คิดจากน้ำหนักรวมหารด้วยส่วนสูง ไม่ได้แยกสัดส่วนไขมันและกล้ามเนื้อ ส่วนเปอร์เซ็นต์ไขมัน (Body Fat %) คือปริมาณไขมันจริงๆ ในร่างกาย ดังนั้นคนที่มี BMI ปกติก็อาจมีไขมันแฝงเยอะได้ (Skinny Fat)",
  },
  {
    q: "นักกีฬากล้ามโตค่า BMI สูงผิดปกติจริงไหม?",
    a: "จริงครับ นักเพาะกายหรือผู้ที่มีมวลกล้ามเนื้อเยอะมาก น้ำหนักตัวจะมากตาม ทำให้คำนวณ BMI ออกมาแล้วอาจตกอยู่ในเกณฑ์ 'อ้วน' ได้ ทั้งที่จริงๆ แล้วสุขภาพดีมาก กรณีนี้ควรดูค่าเปอร์เซ็นต์ไขมันประกอบจะแม่นยำกว่า",
  },
  {
    q: "เด็กและผู้สูงอายุใช้เกณฑ์ BMI เดียวกันไหม?",
    a: "ผู้ใหญ่อายุ 20 ปีขึ้นไปสามารถใช้เกณฑ์มาตรฐานนี้ได้ แต่สำหรับเด็กและวัยรุ่น (อายุน้อยกว่า 20 ปี) จะต้องใช้เกณฑ์ BMI-for-age Percentile ตามกราฟการเจริญเติบโตของกรมอนามัย ไม่สามารถใช้ตารางผู้ใหญ่โดยตรงได้",
  },
  {
    q: "ลด BMI ให้ได้ผลเร็วที่สุดต้องทำอะไร?",
    a: "วิธีที่ยั่งยืนที่สุดคือการคำนวณ TDEE (พลังงานที่ใช้ต่อวัน) แล้วกินให้น้อยกว่า TDEE ประมาณ 300-500 แคลอรี่ (Caloric Deficit) ควบคู่กับการกินโปรตีนให้ถึง และออกกำลังกายแบบเวทเทรนนิ่งเพื่อรักษามวลกล้ามเนื้อ",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "คำนวณ BMI ดัชนีมวลกาย เกณฑ์คนไทย",
      "url": "https://คำนวณ.com/คำนวณ-bmi",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "THB" },
    },
    {
      "@type": "HowTo",
      "name": "วิธีคำนวณ BMI ดัชนีมวลกาย",
      "step": [
        { "@type": "HowToStep", "text": "ใส่น้ำหนักตัวเป็นกิโลกรัม" },
        { "@type": "HowToStep", "text": "ใส่ส่วนสูงเป็นเซนติเมตร" },
        { "@type": "HowToStep", "text": "กดคำนวณ ระบบจะนำน้ำหนักหารด้วย (ส่วนสูงเป็นเมตรยกกำลังสอง)" },
        { "@type": "HowToStep", "text": "เทียบค่าที่ได้กับเกณฑ์มาตรฐานคนเอเชีย" },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqData.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  ],
};

function FAQAccordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 md:p-5 text-left font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
        <span>{q}</span>
        {open ? <ChevronUp className="w-5 h-5 shrink-0 ml-2" /> : <ChevronDown className="w-5 h-5 shrink-0 ml-2" />}
      </button>
      {open && <div className="px-4 md:px-5 pb-4 md:pb-5 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{a}</div>}
    </div>
  );
}

const inputCls = "w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all";
const labelCls = "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1";

export default function BMIPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("25");
  const [result, setResult] = useState<null | {
    bmi: number;
    category: string;
    color: string;
    desc: string;
  }>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const bmi = w / (h * h);
      let category = "";
      let color = "";
      let desc = "";

      // Asian criteria
      if (bmi < 18.5) {
        category = "น้ำหนักน้อย / ผอม";
        color = "text-blue-500";
        desc = "คุณควรทานอาหารที่มีประโยชน์ให้มากขึ้น เพื่อเพิ่มน้ำหนักตัวให้อยู่ในเกณฑ์ปกติ";
      } else if (bmi >= 18.5 && bmi <= 22.9) {
        category = "ปกติ (สุขภาพดี)";
        color = "text-green-500";
        desc = "เยี่ยมมาก! น้ำหนักตัวของคุณอยู่ในเกณฑ์มาตรฐานเอเชียแล้ว พยายามรักษาระดับนี้ไว้";
      } else if (bmi >= 23.0 && bmi <= 24.9) {
        category = "ท้วม / โรคอ้วนระดับ 1";
        color = "text-yellow-500";
        desc = "คุณเริ่มมีน้ำหนักเกินเกณฑ์ ควรเริ่มควบคุมอาหารและออกกำลังกายเพื่อลดไขมันสะสม";
      } else if (bmi >= 25.0 && bmi <= 29.9) {
        category = "อ้วน / โรคอ้วนระดับ 2";
        color = "text-orange-500";
        desc = "มีความเสี่ยงต่อโรคอ้วนลงพุง โรคเบาหวาน และความดันโลหิตสูง ควรลดน้ำหนักอย่างจริงจัง";
      } else {
        category = "อ้วนมาก / โรคอ้วนระดับ 3";
        color = "text-red-600";
        desc = "มีความเสี่ยงสูงมากต่อโรคแทรกซ้อนต่างๆ ควรปรึกษาแพทย์และนักโภชนาการเพื่อลดน้ำหนักโดยด่วน";
      }

      setResult({ bmi, category, color, desc });
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen pt-20 pb-24 px-4 md:px-6 max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
        <Link href="/" className="inline-flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold hover:underline mb-6">
          <ArrowLeft className="w-5 h-5" /> กลับสู่หน้าหลัก
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Activity className="w-4 h-4" /> Health Tools
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-3">
            คำนวณ BMI ดัชนีมวลกาย<br className="hidden md:block" />
            <span className="text-rose-600 dark:text-rose-400">เกณฑ์มาตรฐานคนไทยและเอเชีย</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">เช็คความสมดุลของน้ำหนักและส่วนสูงของคุณได้อย่างรวดเร็ว โดยใช้เกณฑ์เอเชียที่แม่นยำกว่าสำหรับสรีระคนไทย พร้อมคำแนะนำในการดูแลสุขภาพ</p>
        </div>

        {/* Calculator */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 md:p-8 shadow-lg mb-10">
          <form onSubmit={calculate} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>เพศ</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputCls}>
                  <option value="male">ชาย</option>
                  <option value="female">หญิง</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>อายุ (ปี)</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="เช่น 25" min="15" className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>น้ำหนัก (กิโลกรัม) *</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required placeholder="เช่น 65" min="10" step="0.1" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>ส่วนสูง (เซนติเมตร) *</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required placeholder="เช่น 170" min="50" step="0.1" className={inputCls} />
              </div>
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-lg rounded-xl hover:from-rose-600 hover:to-pink-600 shadow-lg transition-all active:scale-[0.98]">
              คำนวณ BMI
            </button>
          </form>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl border border-rose-200 dark:border-rose-500/30 p-6 md:p-8 mb-10 animate-in text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">ดัชนีมวลกายของคุณคือ</p>
            <div className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-4">
              {result.bmi.toFixed(2)}
            </div>
            <div className={`text-2xl font-bold mb-4 ${result.color}`}>
              เกณฑ์: {result.category}
            </div>
            <p className="text-gray-700 dark:text-gray-300 max-w-lg mx-auto leading-relaxed">
              {result.desc}
            </p>
            
            <div className="mt-8 pt-6 border-t border-rose-200 dark:border-rose-800/30">
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-3">คำนวณขั้นต่อไปเพื่อเป้าหมายของคุณ:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/" className="px-4 py-2 bg-white dark:bg-black/30 rounded-lg border border-rose-100 dark:border-white/10 text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-50 dark:hover:bg-white/5 transition-colors">
                  คำนวณ TDEE
                </Link>
                <Link href="/" className="px-4 py-2 bg-white dark:bg-black/30 rounded-lg border border-rose-100 dark:border-white/10 text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-50 dark:hover:bg-white/5 transition-colors">
                  คำนวณ % ไขมัน
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 md:p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">ตารางเกณฑ์ BMI เอเชียเทียบกับสากล</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead><tr className="bg-rose-50 dark:bg-rose-900/20">
                <th className="py-3 px-4 font-bold text-rose-800 dark:text-rose-300 rounded-tl-lg">เกณฑ์</th>
                <th className="py-3 px-4 font-bold text-rose-800 dark:text-rose-300">เกณฑ์เอเชีย (คนไทย)</th>
                <th className="py-3 px-4 font-bold text-gray-500 rounded-tr-lg">เกณฑ์สากล (WHO)</th>
              </tr></thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <td className="py-3 px-4 text-blue-600 dark:text-blue-400 font-bold">น้ำหนักน้อย / ผอม</td>
                  <td className="py-3 px-4 font-bold">น้อยกว่า 18.5</td>
                  <td className="py-3 px-4 text-gray-500">น้อยกว่า 18.5</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <td className="py-3 px-4 text-green-600 dark:text-green-400 font-bold">ปกติ (สุขภาพดี)</td>
                  <td className="py-3 px-4 font-bold bg-green-50 dark:bg-green-900/20">18.5 - 22.9</td>
                  <td className="py-3 px-4 text-gray-500">18.5 - 24.9</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <td className="py-3 px-4 text-yellow-600 dark:text-yellow-400 font-bold">ท้วม / โรคอ้วน 1</td>
                  <td className="py-3 px-4 font-bold bg-yellow-50 dark:bg-yellow-900/20">23.0 - 24.9</td>
                  <td className="py-3 px-4 text-gray-500">25.0 - 29.9</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <td className="py-3 px-4 text-orange-600 dark:text-orange-400 font-bold">อ้วน / โรคอ้วน 2</td>
                  <td className="py-3 px-4 font-bold bg-orange-50 dark:bg-orange-900/20">25.0 - 29.9</td>
                  <td className="py-3 px-4 text-gray-500">30.0 - 34.9</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-red-600 dark:text-red-400 font-bold">อ้วนมาก / โรคอ้วน 3</td>
                  <td className="py-3 px-4 font-bold bg-red-50 dark:bg-red-900/20">30.0 ขึ้นไป</td>
                  <td className="py-3 px-4 text-gray-500">35.0 ขึ้นไป</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">* องค์การอนามัยโลก (WHO) กำหนดเกณฑ์สำหรับคนเอเชียให้ต่ำกว่าเกณฑ์สากล เนื่องจากคนเอเชียมีความเสี่ยงโรคเบาหวานและโรคหัวใจมากกว่าแม้จะมี BMI เท่ากัน</p>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">คำถามที่พบบ่อย (FAQ)</h2>
          <div className="space-y-3">
            {faqData.map((f, i) => <FAQAccordion key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </main>
    </>
  );
}

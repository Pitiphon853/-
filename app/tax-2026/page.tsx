"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, ChevronDown, ChevronUp } from "lucide-react";


const brackets = [
  { min: 0, max: 150000, rate: 0, label: "0 - 150,000" },
  { min: 150000, max: 300000, rate: 5, label: "150,001 - 300,000" },
  { min: 300000, max: 500000, rate: 10, label: "300,001 - 500,000" },
  { min: 500000, max: 750000, rate: 15, label: "500,001 - 750,000" },
  { min: 750000, max: 1000000, rate: 20, label: "750,001 - 1,000,000" },
  { min: 1000000, max: 2000000, rate: 25, label: "1,000,001 - 2,000,000" },
  { min: 2000000, max: 5000000, rate: 30, label: "2,000,001 - 5,000,000" },
  { min: 5000000, max: Infinity, rate: 35, label: "5,000,001 ขึ้นไป" },
];

function calcTax(netIncome: number) {
  let tax = 0;
  const breakdown: { bracket: string; rate: number; taxable: number; tax: number }[] = [];
  for (const b of brackets) {
    if (netIncome <= b.min) break;
    const taxable = Math.min(netIncome, b.max) - b.min;
    const t = taxable * (b.rate / 100);
    tax += t;
    if (taxable > 0) breakdown.push({ bracket: b.label, rate: b.rate, taxable, tax: t });
  }
  return { tax, breakdown };
}

const faqData = [
  {
    q: "มนุษย์เงินเดือนเงินเดือนเท่าไหร่ถึงต้องเสียภาษี?",
    a: "หากมีรายได้จากเงินเดือนอย่างเดียว หักค่าใช้จ่าย 50% (ไม่เกิน 100,000 บาท) และค่าลดหย่อนส่วนตัว 60,000 บาท รายได้สุทธิที่ไม่เกิน 150,000 บาทจะได้รับยกเว้นภาษี คิดคร่าวๆ เงินเดือนไม่เกินประมาณ 26,583 บาท/เดือน (รายได้รวม 319,000 บาท/ปี) จะยังไม่ต้องเสียภาษี แต่ยังคงต้องยื่นแบบ ภ.ง.ด.91 อ้างอิง: กรมสรรพากร - คู่มือการยื่นภาษีเงินได้บุคคลธรรมดา",
  },
  {
    q: "ค่าลดหย่อนส่วนตัว 2569 ได้เท่าไหร่?",
    a: "ค่าลดหย่อนส่วนตัว 60,000 บาท, คู่สมรส (ไม่มีรายได้) 60,000 บาท, บุตร 30,000 บาท/คน (คนที่ 2 ขึ้นไปเกิดปี 2561+ ได้ 60,000), ประกันสังคมสูงสุด 9,000 บาท, เบี้ยประกันชีวิตสูงสุด 100,000 บาท, เบี้ยประกันสุขภาพสูงสุด 25,000 บาท, กองทุน RMF สูงสุด 30% ของรายได้ (ไม่เกิน 500,000), SSF สูงสุด 30% ของรายได้ (ไม่เกิน 200,000) อ้างอิง: กรมสรรพากร - รายการลดหย่อนภาษี ปีภาษี 2569",
  },
  {
    q: "ฟรีแลนซ์คำนวณภาษียังไง?",
    a: "ฟรีแลนซ์ (เงินได้ประเภท 40(2) หรือ 40(8)) สามารถเลือกหักค่าใช้จ่ายได้ 2 แบบ: 1) หักแบบเหมา 60% (มาตรา 40(8) บางประเภท) หรือ 2) หักตามจริง (ต้องมีหลักฐาน) เลือกแบบที่หักได้มากกว่า จากนั้นหักค่าลดหย่อนเหมือนมนุษย์เงินเดือน แล้วคำนวณภาษีตามอัตราขั้นบันไดเดียวกัน ต้องยื่นแบบ ภ.ง.ด.90 อ้างอิง: กรมสรรพากร - คู่มือภาษีสำหรับผู้ประกอบอาชีพอิสระ",
  },
  {
    q: "RMF กับ SSF ลดหย่อนได้สูงสุดเท่าไหร่?",
    a: "RMF (กองทุนรวมเพื่อการเลี้ยงชีพ): ลดหย่อนได้สูงสุด 30% ของรายได้ ไม่เกิน 500,000 บาท / SSF (กองทุนรวมเพื่อการออม): ลดหย่อนได้สูงสุด 30% ของรายได้ ไม่เกิน 200,000 บาท ทั้ง RMF+SSF+PVD+กบข.+ประกันบำนาญ รวมกันไม่เกิน 500,000 บาท/ปี อ้างอิง: สำนักงาน ก.ล.ต. - กองทุนรวมเพื่อสิทธิประโยชน์ทางภาษี; กรมสรรพากร",
  },
  {
    q: "ยื่นภาษีออนไลน์ได้ที่ไหน?",
    a: "ยื่นภาษีออนไลน์ได้ที่เว็บไซต์กรมสรรพากร efiling.rd.go.th ตลอด 24 ชั่วโมง กำหนดยื่นแบบ: ภ.ง.ด.90/91 ภายใน 31 มีนาคม ของปีถัดไป (ยื่นออนไลน์ขยายถึง 8 เมษายน) สามารถยื่นผ่านแอป RD Smart Tax บนมือถือได้ หากยื่นล่าช้ามีค่าปรับ 200 บาท + เงินเพิ่ม 1.5%/เดือน อ้างอิง: กรมสรรพากร - efiling.rd.go.th",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "คำนวณภาษีเงินได้ 2569",
      "url": "https://คำนวณ.com/คำนวณ-ภาษี-2569",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "THB" },
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqData.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
    {
      "@type": "HowTo",
      "name": "วิธีคำนวณภาษีเงินได้บุคคลธรรมดา 2569",
      "step": [
        { "@type": "HowToStep", "text": "กรอกรายได้ต่อปี (เงินเดือน × 12)" },
        { "@type": "HowToStep", "text": "หักค่าใช้จ่าย 50% ไม่เกิน 100,000 บาท" },
        { "@type": "HowToStep", "text": "หักค่าลดหย่อนต่างๆ (ส่วนตัว ประกันสังคม ประกันชีวิต RMF/SSF)" },
        { "@type": "HowToStep", "text": "ได้รายได้สุทธิ นำไปคำนวณภาษีตามอัตราขั้นบันได" },
      ],
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

const inputCls = "w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all";
const labelCls = "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1";

export default function TaxPage() {
  const [income, setIncome] = useState("");
  const [socialSec, setSocialSec] = useState("9000");
  const [lifeIns, setLifeIns] = useState("0");
  const [rmfSsf, setRmfSsf] = useState("0");
  const [personalDed] = useState("60000");
  const [expenseRate] = useState("100000");
  const [result, setResult] = useState<null | { netIncome: number; tax: number; effectiveRate: number; breakdown: { bracket: string; rate: number; taxable: number; tax: number }[] }>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const inc = parseFloat(income) || 0;
    const expense = Math.min(inc * 0.5, parseFloat(expenseRate));
    const deductions = parseFloat(personalDed) + (parseFloat(socialSec) || 0) + (parseFloat(lifeIns) || 0) + (parseFloat(rmfSsf) || 0);
    const netIncome = Math.max(0, inc - expense - deductions);
    const { tax, breakdown } = calcTax(netIncome);
    const effectiveRate = inc > 0 ? (tax / inc) * 100 : 0;
    setResult({ netIncome, tax, effectiveRate, breakdown });
  };

  const fmt = (n: number) => n.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen pt-20 pb-24 px-4 md:px-6 max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
        <Link href="/" className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold hover:underline mb-6">
          <ArrowLeft className="w-5 h-5" /> กลับสู่หน้าหลัก
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Calculator className="w-4 h-4" /> ปีภาษี 2569
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-3">
            คำนวณภาษีเงินได้ 2569 ฟรี<br className="hidden md:block" />
            <span className="text-teal-600 dark:text-teal-400">สำหรับมนุษย์เงินเดือนและฟรีแลนซ์</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">ใส่รายได้ เลือกค่าลดหย่อน รู้ผลทันที ฟรีไม่ต้องสมัครสมาชิก คำนวณตามอัตราภาษีขั้นบันไดปี 2569 ของกรมสรรพากร</p>
        </div>

        {/* Calculator */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 md:p-8 shadow-lg mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><Calculator className="w-5 h-5 text-teal-500" /> กรอกข้อมูลรายได้</h2>
          <form onSubmit={calculate} className="space-y-5">
            <div>
              <label className={labelCls}>รายได้ต่อปี (บาท) *</label>
              <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} required placeholder="เช่น 600000" className={inputCls} />
              <p className="text-xs text-gray-500 mt-1">เงินเดือน × 12 เดือน หรือรายได้รวมทั้งปี</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>ค่าลดหย่อนส่วนตัว</label>
                <input type="number" value={personalDed} disabled className={inputCls + " opacity-60"} />
                <p className="text-xs text-gray-500 mt-1">คงที่ 60,000 บาท</p>
              </div>
              <div>
                <label className={labelCls}>ประกันสังคม (สูงสุด 9,000)</label>
                <input type="number" value={socialSec} onChange={(e) => setSocialSec(e.target.value)} max="9000" className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>เบี้ยประกันชีวิต (สูงสุด 100,000)</label>
                <input type="number" value={lifeIns} onChange={(e) => setLifeIns(e.target.value)} max="100000" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>RMF / SSF (สูงสุด 500,000)</label>
                <input type="number" value={rmfSsf} onChange={(e) => setRmfSsf(e.target.value)} max="500000" className={inputCls} />
              </div>
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-lg rounded-xl hover:from-teal-600 hover:to-emerald-600 shadow-lg transition-all active:scale-[0.98]">
              คำนวณภาษี
            </button>
          </form>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-2xl border border-teal-200 dark:border-teal-500/30 p-6 md:p-8 mb-10 animate-in">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">ผลการคำนวณภาษี</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-black/30 rounded-xl p-4 text-center border border-teal-100 dark:border-teal-800/30">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">รายได้สุทธิ</p>
                <p className="text-2xl font-black text-teal-600 dark:text-teal-400">฿{fmt(result.netIncome)}</p>
              </div>
              <div className="bg-white dark:bg-black/30 rounded-xl p-4 text-center border border-red-100 dark:border-red-800/30">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">ภาษีที่ต้องจ่าย</p>
                <p className="text-2xl font-black text-red-500">{result.tax === 0 ? "ไม่ต้องเสียภาษี" : `฿${fmt(result.tax)}`}</p>
              </div>
              <div className="bg-white dark:bg-black/30 rounded-xl p-4 text-center border border-amber-100 dark:border-amber-800/30">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">อัตราภาษีที่แท้จริง</p>
                <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{result.effectiveRate.toFixed(2)}%</p>
              </div>
            </div>
            {result.breakdown.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">รายละเอียดภาษีแต่ละขั้น</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-teal-200 dark:border-teal-800/30">
                      <th className="text-left py-2 px-3 font-bold text-gray-700 dark:text-gray-300">ขั้นรายได้ (บาท)</th>
                      <th className="text-right py-2 px-3 font-bold text-gray-700 dark:text-gray-300">อัตรา</th>
                      <th className="text-right py-2 px-3 font-bold text-gray-700 dark:text-gray-300">รายได้ในขั้น</th>
                      <th className="text-right py-2 px-3 font-bold text-gray-700 dark:text-gray-300">ภาษี</th>
                    </tr></thead>
                    <tbody>
                      {result.breakdown.map((b, i) => (
                        <tr key={i} className="border-b border-gray-100 dark:border-white/5">
                          <td className="py-2 px-3">{b.bracket}</td>
                          <td className="py-2 px-3 text-right">{b.rate}%</td>
                          <td className="py-2 px-3 text-right">฿{fmt(b.taxable)}</td>
                          <td className="py-2 px-3 text-right font-bold text-red-500">฿{fmt(b.tax)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tax Bracket Table */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 md:p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">อัตราภาษีเงินได้แบบขั้นบันได ปี 2569</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">ตามประมวลรัษฎากร มาตรา 48 - คำนวณจากเงินได้สุทธิ (หลังหักค่าใช้จ่ายและค่าลดหย่อน)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-teal-50 dark:bg-teal-900/30">
                <th className="text-left py-3 px-4 font-bold text-teal-700 dark:text-teal-300 rounded-tl-lg">เงินได้สุทธิ (บาท)</th>
                <th className="text-right py-3 px-4 font-bold text-teal-700 dark:text-teal-300">อัตราภาษี</th>
                <th className="text-right py-3 px-4 font-bold text-teal-700 dark:text-teal-300 rounded-tr-lg">ภาษีสะสมสูงสุด</th>
              </tr></thead>
              <tbody>
                {[
                  ["0 - 150,000", "ยกเว้น", "0"],
                  ["150,001 - 300,000", "5%", "7,500"],
                  ["300,001 - 500,000", "10%", "27,500"],
                  ["500,001 - 750,000", "15%", "65,000"],
                  ["750,001 - 1,000,000", "20%", "115,000"],
                  ["1,000,001 - 2,000,000", "25%", "365,000"],
                  ["2,000,001 - 5,000,000", "30%", "1,265,000"],
                  ["5,000,001 ขึ้นไป", "35%", "-"],
                ].map(([bracket, rate, cum], i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                    <td className="py-3 px-4">{bracket}</td>
                    <td className="py-3 px-4 text-right font-bold">{rate}</td>
                    <td className="py-3 px-4 text-right text-gray-500">{cum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">อ้างอิง: กรมสรรพากร - ประมวลรัษฎากร มาตรา 48; พระราชกฤษฎีกาลดอัตราภาษีเงินได้</p>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">คำถามที่พบบ่อย (FAQ)</h2>
          <div className="space-y-3">
            {faqData.map((f, i) => <FAQAccordion key={i} q={f.q} a={f.a} />)}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-800/30 p-4 text-sm text-amber-800 dark:text-amber-200 mb-6">
          <strong>ข้อสงวนสิทธิ์:</strong> ผลการคำนวณเป็นการประมาณการเบื้องต้นเท่านั้น ไม่ถือเป็นคำแนะนำทางภาษีอย่างเป็นทางการ กรุณาตรวจสอบกับกรมสรรพากร (rd.go.th) หรือปรึกษานักบัญชี/ที่ปรึกษาภาษีก่อนการยื่นแบบ
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="text-teal-600 dark:text-teal-400 hover:underline font-bold">คำนวณ.com</Link> - ศูนย์รวมเครื่องมือคำนวณออนไลน์ฟรี
        </div>
      </main>
    </>
  );
}

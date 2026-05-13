"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Home, ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    q: "ดอกเบี้ยบ้าน 2569 แต่ละธนาคารอยู่ที่เท่าไหร่?",
    a: "อัตราดอกเบี้ยเฉลี่ย 3 ปีแรกมักจะอยู่ที่ราว 2.5% - 3.5% (โปรโมชั่น Fixed Rate) แต่หลังจากปีที่ 3 เป็นต้นไป มักจะเป็นแบบลอยตัว (MRR ลบ x%) ซึ่งอาจจะสูงถึง 5-6% ดังนั้นคนส่วนใหญ่จึงเลือกที่จะ Refinance ทุกๆ 3 ปี",
  },
  {
    q: "กู้บ้านได้สูงสุดกี่เท่าของเงินเดือน?",
    a: "โดยทั่วไปธนาคารจะประเมินให้ภาระหนี้รวมทั้งหมดของคุณ (DSR) ไม่เกิน 40-50% ของรายได้ต่อเดือน หากคุณไม่มีหนี้อื่นเลย เงินเดือน 30,000 บาท อาจผ่อนได้สูงสุดประมาณ 15,000 บาท/เดือน ซึ่งเทียบเท่ากับวงเงินกู้ประมาณ 2-3 ล้านบาท (คร่าวๆ คือกู้ได้ 60-100 เท่าของเงินเดือน)",
  },
  {
    q: "refinance บ้านคุ้มไหม?",
    a: "ส่วนใหญ่จะ 'คุ้มมาก' เพราะดอกเบี้ยบ้านในปีที่ 4 เป็นต้นไปจะกระโดดขึ้นสูง การ Refinance ไปธนาคารใหม่จะช่วยให้ได้ดอกเบี้ยโปรโมชั่น 3 ปีแรกกลับมาอีกครั้ง ซึ่งประหยัดดอกเบี้ยไปได้หลักแสนบาท แต่ต้องคำนวณค่าธรรมเนียมจดจำนองและค่าประเมินใหม่ด้วยว่าคุ้มกับดอกเบี้ยที่ลดลงหรือไม่",
  },
  {
    q: "ดาวน์บ้านต่ำสุดได้กี่เปอร์เซ็นต์?",
    a: "ตามมาตรการ LTV ของแบงก์ชาติ บ้านหลังแรกราคาไม่เกิน 10 ล้านบาท สามารถกู้ได้ 100% (แถมกู้ตกแต่งเพิ่มได้อีก 10%) แปลว่าไม่ต้องใช้เงินดาวน์เลยก็ได้ แต่สำหรับบ้านหลังที่ 2 หรือ 3 อาจต้องดาวน์ 10-30%",
  },
  {
    q: "ผ่อนบ้านแล้วลดหย่อนภาษีได้เท่าไหร่?",
    a: "ดอกเบี้ยที่คุณจ่ายให้ธนาคารจากการผ่อนบ้าน สามารถนำมาลดหย่อนภาษีเงินได้บุคคลธรรมดาได้ 'ตามที่จ่ายจริง แต่ไม่เกิน 100,000 บาทต่อปี' (ลดหย่อนได้เฉพาะส่วนที่เป็นดอกเบี้ย ไม่รวมเงินต้น)",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "คำนวณผ่อนบ้าน 2569",
      "url": "https://คำนวณ.com/คำนวณ-ผ่อนบ้าน-2569",
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

function calculateMortgage(principal: number, yearlyRate: number, years: number) {
  const monthlyRate = yearlyRate / 100 / 12;
  const numPayments = years * 12;
  
  if (monthlyRate === 0) return { pmt: principal / numPayments, totalInterest: 0, totalPayment: principal, schedule: [] };
  
  const pmt = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  
  const schedule = [];
  let balance = principal;
  let yearlyInterest = 0;
  let yearlyPrincipal = 0;
  
  for (let month = 1; month <= numPayments; month++) {
    const interestForMonth = balance * monthlyRate;
    const principalForMonth = pmt - interestForMonth;
    
    yearlyInterest += interestForMonth;
    yearlyPrincipal += principalForMonth;
    balance -= principalForMonth;
    
    // Group by year for the table
    if (month % 12 === 0 || month === numPayments) {
      schedule.push({
        year: Math.ceil(month / 12),
        payment: (yearlyPrincipal + yearlyInterest),
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        balance: balance > 0 ? balance : 0
      });
      yearlyInterest = 0;
      yearlyPrincipal = 0;
    }
  }
  
  const totalPayment = pmt * numPayments;
  const totalInterest = totalPayment - principal;
  
  return { pmt, totalInterest, totalPayment, schedule };
}

const inputCls = "w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all";
const labelCls = "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1";

export default function MortgagePage() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("3.0");
  const [years, setYears] = useState("30");
  const [result, setResult] = useState<ReturnType<typeof calculateMortgage> | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate);
    const y = parseFloat(years);
    
    if (p > 0 && r >= 0 && y > 0) {
      setResult(calculateMortgage(p, r, y));
    }
  };

  const fmt = (n: number) => n.toLocaleString("th-TH", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtDec = (n: number) => n.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen pt-20 pb-24 px-4 md:px-6 max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline mb-6">
          <ArrowLeft className="w-5 h-5" /> กลับสู่หน้าหลัก
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Home className="w-4 h-4" /> สินเชื่อที่อยู่อาศัย
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-3">
            คำนวณผ่อนบ้าน 2569<br className="hidden md:block" />
            <span className="text-indigo-600 dark:text-indigo-400">ค่างวดรายเดือน ดอกเบี้ย และระยะเวลา</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">คำนวณค่างวดผ่อนบ้าน คอนโด หรือสินเชื่อที่อยู่อาศัยแบบลดต้นลดดอก (Amortization) เพื่อดูว่าคุณต้องจ่ายดอกเบี้ยทั้งหมดเท่าไหร่ตลอดสัญญา</p>
        </div>

        {/* Calculator */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 md:p-8 shadow-lg mb-10">
          <form onSubmit={calculate} className="space-y-5">
            <div>
              <label className={labelCls}>วงเงินกู้ (บาท) *</label>
              <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} required placeholder="เช่น 3000000" min="10000" className={inputCls} />
              <p className="text-xs text-gray-500 mt-1">ราคาบ้านหักเงินดาวน์ หรือยอดจัดสินเชื่อที่ธนาคารอนุมัติ</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>อัตราดอกเบี้ย (% ต่อปี) *</label>
                <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} required placeholder="เช่น 3.0" min="0" step="0.01" className={inputCls} />
                <p className="text-xs text-gray-500 mt-1">แนะนำให้ใช้อัตราดอกเบี้ยเฉลี่ย 3 ปีแรก</p>
              </div>
              <div>
                <label className={labelCls}>ระยะเวลาผ่อน (ปี) *</label>
                <input type="number" value={years} onChange={(e) => setYears(e.target.value)} required placeholder="เช่น 30" min="1" max="40" className={inputCls} />
                <p className="text-xs text-gray-500 mt-1">สูงสุดมักจะไม่เกิน 30-40 ปี</p>
              </div>
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-indigo-600 hover:to-purple-700 shadow-lg transition-all active:scale-[0.98]">
              คำนวณค่างวด
            </button>
          </form>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-500/30 p-6 md:p-8 mb-10 animate-in">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">ค่างวดที่คุณต้องจ่ายต่อเดือน</h2>
            <div className="text-5xl md:text-6xl font-black text-indigo-600 dark:text-indigo-400 text-center mb-8">
              ฿{fmtDec(result.pmt)}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-black/30 rounded-xl p-4 text-center border border-indigo-100 dark:border-indigo-800/30">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">ยอดจัดสินเชื่อ (เงินต้น)</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">฿{fmt(parseFloat(loanAmount))}</p>
              </div>
              <div className="bg-white dark:bg-black/30 rounded-xl p-4 text-center border border-red-100 dark:border-red-800/30">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">ดอกเบี้ยรวมตลอดสัญญา</p>
                <p className="text-xl font-bold text-red-500">฿{fmt(result.totalInterest)}</p>
              </div>
              <div className="bg-white dark:bg-black/30 rounded-xl p-4 text-center border border-indigo-100 dark:border-indigo-800/30">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">ยอดชำระทั้งหมด</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">฿{fmt(result.totalPayment)}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">ตารางผ่อนชำระสรุปรายปี (ลดต้นลดดอก)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-right">
                  <thead><tr className="border-b border-indigo-200 dark:border-indigo-800/30">
                    <th className="text-center py-2 px-2 font-bold text-gray-700 dark:text-gray-300">ปีที่</th>
                    <th className="py-2 px-2 font-bold text-gray-700 dark:text-gray-300">เงินต้นที่จ่าย (บาท)</th>
                    <th className="py-2 px-2 font-bold text-gray-700 dark:text-gray-300">ดอกเบี้ยที่จ่าย (บาท)</th>
                    <th className="py-2 px-2 font-bold text-gray-700 dark:text-gray-300">ยอดหนี้คงเหลือ (บาท)</th>
                  </tr></thead>
                  <tbody>
                    {result.schedule.map((s, i) => (
                      <tr key={i} className="border-b border-gray-100 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/5">
                        <td className="text-center py-2 px-2">{s.year}</td>
                        <td className="py-2 px-2 text-indigo-600 dark:text-indigo-400">฿{fmt(s.principal)}</td>
                        <td className="py-2 px-2 text-red-500">฿{fmt(s.interest)}</td>
                        <td className="py-2 px-2 font-bold text-gray-800 dark:text-gray-200">฿{fmt(s.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 md:p-8 mb-10 prose dark:prose-invert max-w-none">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 mt-0">ข้อควรรู้เกี่ยวกับดอกเบี้ยบ้าน (Fixed vs Float)</h2>
          <p>
            การเลือกประเภทดอกเบี้ยบ้านมีผลอย่างมากต่อจำนวนเงินที่คุณต้องจ่ายตลอดสัญญา โดยทั่วไปจะมี 2 รูปแบบหลัก:
          </p>
          <ul>
            <li><strong>ดอกเบี้ยคงที่ (Fixed Rate):</strong> อัตราดอกเบี้ยจะถูกล็อคไว้ตายตัวในช่วงระยะเวลาหนึ่ง (มักจะเป็น 1-3 ปีแรก) ข้อดีคือค่างวดแน่นอน ไม่ผันผวนตามเศรษฐกิจ</li>
            <li><strong>ดอกเบี้ยลอยตัว (Floating Rate):</strong> มักจะอิงกับค่า MRR (Minimum Retail Rate) ลบด้วยเปอร์เซ็นต์ที่ธนาคารกำหนด (เช่น MRR - 1.5%) ข้อดีคือถ้าดอกเบี้ยนโยบายปรับลด ดอกเบี้ยบ้านคุณก็จะลดตามไปด้วย แต่ถ้าดอกเบี้ยขึ้น คุณก็ต้องจ่ายแพงขึ้นเช่นกัน</li>
          </ul>
          <p>
            <em>คำแนะนำ:</em> คนส่วนใหญ่มักจะเลือกโปรโมชั่นดอกเบี้ยคงที่ใน 3 ปีแรกเพราะราคาถูก และเมื่อเข้าปีที่ 4 ที่ดอกเบี้ยกลายเป็นลอยตัวเต็มอัตรา ก็จะทำการ <strong>Refinance</strong> (กู้ที่ใหม่มาโปะที่เดิม) เพื่อขอรับโปรโมชั่นดอกเบี้ยต่ำ 3 ปีแรกอีกครั้งนั่นเอง
          </p>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">คำถามที่พบบ่อย (FAQ)</h2>
          <div className="space-y-3">
            {faqData.map((f, i) => <FAQAccordion key={i} q={f.q} a={f.a} />)}
          </div>
        </div>

        {/* Internal Link */}
        <div className="mt-8 text-center">
          <Link href="/tax-2026" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
            → คำนวณภาษีเงินได้บุคคลธรรมดา 2569 (สำหรับลดหย่อนภาษีบ้าน)
          </Link>
        </div>
      </main>
    </>
  );
}

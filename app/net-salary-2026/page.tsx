"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Wallet, ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    q: "ประกันสังคม 2569 หักกี่เปอร์เซ็นต์?",
    a: "ประกันสังคม (มาตรา 33) หักในอัตรา 5% ของค่าจ้าง โดยใช้ฐานค่าจ้างขั้นต่ำ 1,650 บาท และสูงสุดไม่เกิน 15,000 บาท ดังนั้นจะถูกหักต่ำสุดเดือนละ 83 บาท และสูงสุดไม่เกิน 750 บาทต่อเดือน (อ้างอิง: สำนักงานประกันสังคม)",
  },
  {
    q: "เพดานประกันสังคม 2569 อยู่ที่เท่าไหร่?",
    a: "ณ ปี 2569 เพดานฐานค่าจ้างในการคำนวณเงินสมทบประกันสังคมยังคงอยู่ที่ 15,000 บาท (ทำให้หักสูงสุดที่ 750 บาท/เดือน) แม้จะมีการพิจารณาปรับฐานขึ้นในอนาคต แต่ในปัจจุบันยังคงใช้เกณฑ์เดิม",
  },
  {
    q: "ภาษีหัก ณ ที่จ่ายคำนวณยังไง?",
    a: "ฝ่ายบุคคล (HR) จะนำรายได้ต่อเดือนของคุณคูณ 12 (ทำเป็นรายได้ทั้งปี) รวมกับโบนัส จากนั้นหักค่าใช้จ่าย 50% (ไม่เกิน 100,000) หักลดหย่อนส่วนตัว 60,000 หักประกันสังคม และค่าลดหย่อนอื่นๆ ที่คุณแจ้ง HR ไว้ เพื่อหา 'รายได้สุทธิ' จากนั้นนำไปคำนวณภาษีตามขั้นบันได แล้วนำภาษีทั้งปีที่ได้มาหาร 12 เพื่อหักในแต่ละเดือน",
  },
  {
    q: "โบนัสต้องเสียภาษีไหม?",
    a: "โบนัสถือเป็นเงินได้พึงประเมินประเภทที่ 1 (มาตรา 40(1)) เช่นเดียวกับเงินเดือน ดังนั้นต้องนำไปรวมคำนวณภาษีเงินได้บุคคลธรรมดาด้วย และจะถูกหักภาษี ณ ที่จ่ายในเดือนที่ได้รับโบนัส (ทำให้เดือนนั้นถูกหักภาษีมากกว่าปกติ)",
  },
  {
    q: "ถ้าทำงานพาร์ทไทม์ต้องจ่ายประกันสังคมไหม?",
    a: "หากเป็นลูกจ้างชั่วคราวหรือพาร์ทไทม์ที่ทำงานกับนายจ้างอย่างเป็นกิจจะลักษณะ ถือเป็นผู้ประกันตนมาตรา 33 นายจ้างมีหน้าที่ต้องขึ้นทะเบียนและหักเงินสมทบประกันสังคมให้ แต่หากเป็นผู้รับเหมาอิสระ (ฟรีแลนซ์) จะไม่เข้าข่ายมาตรา 33 (อาจสมัคร ม.39 หรือ ม.40 แทนได้)",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "คำนวณเงินเดือนสุทธิ 2569",
      "url": "https://คำนวณ.com/คำนวณ-เงินเดือนสุทธิ-2569",
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

function calcYearlyTax(monthlySalary: number, monthlyOT: number, yearlyBonus: number, extraDeductions: number) {
  const yearlySalary = (monthlySalary + monthlyOT) * 12 + yearlyBonus;
  const expense = Math.min(yearlySalary * 0.5, 100000);
  const personalDed = 60000;
  
  // Social security base max 15,000 per month
  const ssMonthly = Math.min(Math.max(monthlySalary, 1650), 15000) * 0.05;
  const ssYearly = ssMonthly * 12;

  const totalDeductions = personalDed + ssYearly + extraDeductions;
  const netIncome = Math.max(0, yearlySalary - expense - totalDeductions);

  let tax = 0;
  const brackets = [
    { min: 0, max: 150000, rate: 0 },
    { min: 150000, max: 300000, rate: 5 },
    { min: 300000, max: 500000, rate: 10 },
    { min: 500000, max: 750000, rate: 15 },
    { min: 750000, max: 1000000, rate: 20 },
    { min: 1000000, max: 2000000, rate: 25 },
    { min: 2000000, max: 5000000, rate: 30 },
    { min: 5000000, max: Infinity, rate: 35 },
  ];

  for (const b of brackets) {
    if (netIncome <= b.min) break;
    const taxable = Math.min(netIncome, b.max) - b.min;
    tax += taxable * (b.rate / 100);
  }

  return { taxYearly: tax, ssMonthly };
}

const inputCls = "w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all";
const labelCls = "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1";

export default function NetSalaryPage() {
  const [salary, setSalary] = useState("");
  const [ot, setOt] = useState("0");
  const [bonus, setBonus] = useState("0");
  const [extraDed, setExtraDed] = useState("0");
  const [result, setResult] = useState<null | {
    gross: number;
    ss: number;
    taxMonthly: number;
    net: number;
  }>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const sal = parseFloat(salary) || 0;
    const otVal = parseFloat(ot) || 0;
    const bonusVal = parseFloat(bonus) || 0;
    const extraDedVal = parseFloat(extraDed) || 0;

    const { taxYearly, ssMonthly } = calcYearlyTax(sal, otVal, bonusVal, extraDedVal);
    
    // Monthly tax is roughly yearly tax / 12 (this is a simplified HR estimation)
    // If there is a bonus, the tax for the bonus month is higher, but here we show average monthly withholding or regular month withholding.
    // For a regular month, tax withholding = tax(salary without bonus) / 12.
    // Let's compute regular month tax vs bonus month tax for better accuracy, but for simplicity we will just show average monthly tax without bonus, and note it.
    const regularTax = calcYearlyTax(sal, otVal, 0, extraDedVal).taxYearly;
    const taxMonthly = regularTax / 12;

    const gross = sal + otVal;
    const ss = sal > 0 ? ssMonthly : 0;
    const net = gross - ss - taxMonthly;

    setResult({ gross, ss, taxMonthly, net });
  };

  const fmt = (n: number) => n.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen pt-20 pb-24 px-4 md:px-6 max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:underline mb-6">
          <ArrowLeft className="w-5 h-5" /> กลับสู่หน้าหลัก
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Wallet className="w-4 h-4" /> ปีภาษี 2569
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-3">
            คำนวณเงินเดือนสุทธิ 2569<br className="hidden md:block" />
            <span className="text-emerald-600 dark:text-emerald-400">หักประกันสังคมและภาษี ณ ที่จ่าย</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">ใส่เงินเดือนของคุณแล้วรู้ทันทีว่าสิ้นเดือนจะได้รับเงินโอนเข้าบัญชีจริงๆ เท่าไหร่ ระบบจะหักประกันสังคมและประเมินภาษีหัก ณ ที่จ่ายให้อัตโนมัติ</p>
        </div>

        {/* Calculator */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 md:p-8 shadow-lg mb-10">
          <form onSubmit={calculate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>เงินเดือน (บาท/เดือน) *</label>
                <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required placeholder="เช่น 30000" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>โอที/รายได้พิเศษ (บาท/เดือน)</label>
                <input type="number" value={ot} onChange={(e) => setOt(e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>โบนัส (บาท/ปี)</label>
                <input type="number" value={bonus} onChange={(e) => setBonus(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>ลดหย่อนอื่นๆ เพิ่มเติม (บาท/ปี)</label>
                <input type="number" value={extraDed} onChange={(e) => setExtraDed(e.target.value)} placeholder="เช่น กองทุน, ประกันชีวิต" className={inputCls} />
              </div>
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-xl hover:from-emerald-600 hover:to-teal-600 shadow-lg transition-all active:scale-[0.98]">
              คำนวณเงินเดือนสุทธิ
            </button>
          </form>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-500/30 p-6 md:p-8 mb-10 animate-in">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">สรุปรายได้รายเดือน (เดือนปกติ)</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-emerald-200 dark:border-emerald-800/30">
                <span className="text-gray-600 dark:text-gray-400">รายรับรวม (เงินเดือน + OT)</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">฿{fmt(result.gross)}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-emerald-200 dark:border-emerald-800/30">
                <span className="text-gray-600 dark:text-gray-400">หัก ประกันสังคม (5%)</span>
                <span className="text-lg font-bold text-red-500">- ฿{fmt(result.ss)}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-emerald-200 dark:border-emerald-800/30">
                <span className="text-gray-600 dark:text-gray-400">หัก ภาษี ณ ที่จ่าย (ประเมิน)</span>
                <span className="text-lg font-bold text-red-500">- ฿{fmt(result.taxMonthly)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-bold text-gray-900 dark:text-white">เงินเดือนรับจริง (Net Salary)</span>
                <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">฿{fmt(result.net)}</span>
              </div>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-4 text-center">
              * การคำนวณภาษีเป็นเพียงการประเมินเบื้องต้นตามโครงสร้างภาษีปี 2569 ฝ่ายบุคคลของแต่ละบริษัทอาจมีวิธีปัดเศษหรือคำนวณภาษีรายเดือนที่แตกต่างกันเล็กน้อย
            </p>
          </div>
        )}

        {/* SS Table */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 md:p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">อัตราหักเงินสมทบประกันสังคม มาตรา 33 (ปี 2569)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead><tr className="bg-gray-50 dark:bg-white/5">
                <th className="py-3 px-4 font-bold text-gray-700 dark:text-gray-300 rounded-tl-lg">ฐานเงินเดือน (บาท)</th>
                <th className="py-3 px-4 font-bold text-gray-700 dark:text-gray-300">อัตราหัก</th>
                <th className="py-3 px-4 font-bold text-gray-700 dark:text-gray-300 rounded-tr-lg">จำนวนเงินที่ถูกหัก (บาท/เดือน)</th>
              </tr></thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <td className="py-3 px-4">ต่ำกว่า 1,650</td>
                  <td className="py-3 px-4">5% ของ 1,650</td>
                  <td className="py-3 px-4 font-bold">83</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <td className="py-3 px-4">1,650 - 15,000</td>
                  <td className="py-3 px-4">5% ของเงินเดือน</td>
                  <td className="py-3 px-4 font-bold">83 - 750</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">15,000 ขึ้นไป</td>
                  <td className="py-3 px-4">5% ของ 15,000 (เพดาน)</td>
                  <td className="py-3 px-4 font-bold text-red-500">750 (สูงสุด)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Content Section */}
        <div className="prose dark:prose-invert max-w-none mb-10">
          <h3>วิธีคำนวณเงินเดือนสุทธิ</h3>
          <p>
            เงินเดือนสุทธิ (Net Salary) คือ จำนวนเงินที่คุณจะได้รับโอนเข้าบัญชีธนาคารจริงๆ ในแต่ละเดือน หลังจากที่ถูกหักค่าใช้จ่ายภาคบังคับต่างๆ แล้ว โดยสูตรคำนวณพื้นฐานคือ:
            <br />
            <strong>เงินเดือนสุทธิ = (เงินเดือน + รายได้อื่นๆ) - ประกันสังคม - ภาษีหัก ณ ที่จ่าย - กองทุนสำรองเลี้ยงชีพ (ถ้ามี)</strong>
          </p>
          <ul>
            <li><strong>ประกันสังคม:</strong> หัก 5% ของเงินเดือน โดยมีเพดานสูงสุดที่ 750 บาท (คิดจากฐานเงินเดือนสูงสุด 15,000 บาท)</li>
            <li><strong>ภาษีหัก ณ ที่จ่าย:</strong> ฝ่ายบุคคลจะประเมินรายได้ทั้งปีของคุณ หักค่าใช้จ่ายและค่าลดหย่อน เพื่อหาภาษีที่ต้องเสียทั้งปี แล้วนำมาหาร 12 เพื่อหักออกในแต่ละเดือน</li>
          </ul>
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
          <Link href="/tax-2026" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
            → คำนวณภาษีเงินได้บุคคลธรรมดา 2569 ฉบับเต็ม
          </Link>
        </div>
      </main>
    </>
  );
}

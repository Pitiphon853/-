"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    q: "ค่า Ft 2569 อยู่ที่เท่าไหร่?",
    a: "ค่า Ft (Float time) มีการปรับเปลี่ยนทุกๆ 4 เดือน (ม.ค.-เม.ย., พ.ค.-ส.ค., ก.ย.-ธ.ค.) โดยเฉลี่ยในปี 2569 จะอยู่ที่ประมาณ 0.3972 บาทต่อหน่วย (ขึ้นอยู่กับประกาศของ กกพ. ในแต่ละรอบ)",
  },
  {
    q: "MEA กับ PEA คิดค่าไฟต่างกันไหม?",
    a: "การไฟฟ้านครหลวง (MEA) และการไฟฟ้าส่วนภูมิภาค (PEA) ใช้อัตราค่าไฟฐานและค่า Ft ในอัตราที่เท่ากันสำหรับผู้ใช้ไฟฟ้าประเภทบ้านอยู่อาศัย แต่ค่าบริการรายเดือนอาจแตกต่างกันเล็กน้อยในบางประเภทผู้ใช้",
  },
  {
    q: "ทำไมค่าไฟแต่ละเดือนไม่เท่ากัน?",
    a: "ค่าไฟฟ้าคิดแบบ 'อัตราก้าวหน้า' ยิ่งใช้หน่วย (kWh) เยอะ อัตราค่าไฟต่อหน่วยในขั้นที่สูงขึ้นจะยิ่งแพง ดังนั้นหากเดือนไหนอากาศร้อนและเปิดแอร์นานขึ้นจนหน่วยทะลุไปขั้นที่แพงขึ้น ค่าไฟจะกระโดดขึ้นอย่างเห็นได้ชัด",
  },
  {
    q: "แอร์ 1 ตัวกินไฟเดือนละกี่บาท?",
    a: "แอร์ 9000 BTU แบบ Inverter กินไฟประมาณ 0.6-0.8 หน่วย/ชม. หากเปิดวันละ 8 ชม. จะใช้ไฟราว 140-190 หน่วย/เดือน คิดเป็นเงินประมาณ 600-900 บาท ขึ้นอยู่กับอัตราค่าไฟในขั้นที่คุณใช้อยู่",
  },
  {
    q: "ติดโซลาร์เซลล์ช่วยลดค่าไฟได้จริงไหม?",
    a: "ได้จริง โดยเฉพาะหากคุณมีการใช้ไฟฟ้าในช่วงกลางวัน (เช่น เปิดแอร์ WFH) ระบบโซลาร์เซลล์แบบ On-grid จะนำไฟจากแผงมาใช้โดยตรง ช่วยตัดยอดหน่วยการใช้ไฟในขั้นที่แพงที่สุดออกไป ทำให้ประหยัดค่าไฟได้มาก",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "คำนวณค่าไฟ 2569",
      "url": "https://คำนวณ.com/คำนวณ-ค่าไฟ-2569",
      "applicationCategory": "UtilityApplication",
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

// Rate 1.2: Normal household > 150 units per month
const brackets12 = [
  { max: 150, rate: 3.2484 },
  { max: 400, rate: 4.2218 },
  { max: Infinity, rate: 4.4217 },
];

function calcElec(units: number, ftRate: number) {
  let baseElec = 0;
  let remaining = units;
  let prevMax = 0;

  const breakdown = [];

  for (const b of brackets12) {
    const range = b.max - prevMax;
    const inThisBracket = Math.min(remaining, range);
    if (inThisBracket > 0) {
      const cost = inThisBracket * b.rate;
      baseElec += cost;
      breakdown.push({ units: inThisBracket, rate: b.rate, cost });
      remaining -= inThisBracket;
    }
    prevMax = b.max;
    if (remaining <= 0) break;
  }

  const service = 38.22;
  const ft = units * ftRate;
  const subTotal = baseElec + service + ft;
  const vat = subTotal * 0.07;
  const total = subTotal + vat;

  return { baseElec, service, ft, subTotal, vat, total, breakdown };
}

const inputCls = "w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all";
const labelCls = "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1";

export default function ElectricityPage() {
  const [units, setUnits] = useState("");
  const [ftValue, setFtValue] = useState("0.3972");
  const [result, setResult] = useState<ReturnType<typeof calcElec> | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const u = parseFloat(units) || 0;
    const f = parseFloat(ftValue) || 0;
    setResult(calcElec(u, f));
  };

  const fmt = (n: number) => n.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen pt-20 pb-24 px-4 md:px-6 max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
        <Link href="/" className="inline-flex items-center gap-2 text-yellow-600 dark:text-yellow-500 font-bold hover:underline mb-6">
          <ArrowLeft className="w-5 h-5" /> กลับสู่หน้าหลัก
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Lightbulb className="w-4 h-4" /> อัปเดตปี 2569
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-3">
            คำนวณค่าไฟ 2569<br className="hidden md:block" />
            <span className="text-yellow-600 dark:text-yellow-500">อัตราค่าไฟล่าสุด (MEA/PEA)</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">คำนวณค่าไฟฟ้าประเภทบ้านอยู่อาศัยแบบใหม่ล่าสุด (1.2) รองรับทั้งการไฟฟ้านครหลวงและการไฟฟ้าส่วนภูมิภาค เพียงใส่จำนวนหน่วย (kWh) ที่ใช้</p>
        </div>

        {/* Calculator */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 md:p-8 shadow-lg mb-10">
          <form onSubmit={calculate} className="space-y-5">
            <div>
              <label className={labelCls}>จำนวนหน่วยไฟฟ้าที่ใช้ (kWh/หน่วย) *</label>
              <input type="number" value={units} onChange={(e) => setUnits(e.target.value)} required placeholder="เช่น 350" min="0" step="1" className={inputCls} />
              <p className="text-xs text-gray-500 mt-1">ดูได้จากบิลค่าไฟเดือนก่อน หรือจดเลขจากมิเตอร์</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>ประเภทผู้ใช้ไฟฟ้า</label>
                <select disabled className={inputCls + " opacity-60"}>
                  <option>บ้านอยู่อาศัย (ใช้เกิน 150 หน่วย/เดือน)</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>ค่า Ft (บาท/หน่วย)</label>
                <input type="number" value={ftValue} onChange={(e) => setFtValue(e.target.value)} step="0.0001" className={inputCls} />
              </div>
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg rounded-xl hover:from-yellow-500 hover:to-orange-600 shadow-lg transition-all active:scale-[0.98]">
              คำนวณค่าไฟ
            </button>
          </form>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-500/30 p-6 md:p-8 mb-10 animate-in">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">บิลค่าไฟของคุณ (ประมาณการ)</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-2 border-b border-yellow-200 dark:border-yellow-800/30">
                <span className="text-gray-600 dark:text-gray-400">ค่าพลังงานไฟฟ้า (ค่าไฟฐาน)</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">฿{fmt(result.baseElec)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-yellow-200 dark:border-yellow-800/30">
                <span className="text-gray-600 dark:text-gray-400">ค่า Ft ({fmt(parseFloat(ftValue))} บาท/หน่วย)</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">฿{fmt(result.ft)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-yellow-200 dark:border-yellow-800/30">
                <span className="text-gray-600 dark:text-gray-400">ค่าบริการรายเดือน</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">฿{fmt(result.service)}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-yellow-200 dark:border-yellow-800/30">
                <span className="text-gray-600 dark:text-gray-400">ภาษีมูลค่าเพิ่ม (VAT 7%)</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">฿{fmt(result.vat)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-bold text-gray-900 dark:text-white">รวมเงินที่ต้องชำระทั้งสิ้น</span>
                <span className="text-3xl font-black text-yellow-600 dark:text-yellow-500">฿{fmt(result.total)}</span>
              </div>
            </div>

            {result.breakdown.length > 0 && (
              <div className="mt-6 bg-white dark:bg-black/30 p-4 rounded-xl border border-yellow-100 dark:border-white/5">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-2">รายละเอียดการคิดค่าไฟฐาน (แบบอัตราก้าวหน้า)</h3>
                <div className="text-sm space-y-1">
                  {result.breakdown.map((b, i) => (
                    <div key={i} className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>{b.units} หน่วย @ {b.rate} บาท</span>
                      <span>฿{fmt(b.cost)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Rate Table */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 md:p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">อัตราค่าไฟฟ้าประเภท 1.2 (บ้านอยู่อาศัยใช้เกิน 150 หน่วย)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead><tr className="bg-yellow-50 dark:bg-yellow-900/20">
                <th className="py-3 px-4 font-bold text-yellow-800 dark:text-yellow-400 rounded-tl-lg">ปริมาณการใช้พลังงานไฟฟ้า (หน่วย/เดือน)</th>
                <th className="py-3 px-4 font-bold text-yellow-800 dark:text-yellow-400 rounded-tr-lg">ค่าพลังงานไฟฟ้า (บาท/หน่วย)</th>
              </tr></thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <td className="py-3 px-4">150 หน่วยแรก (หน่วยที่ 1 - 150)</td>
                  <td className="py-3 px-4 font-bold">3.2484</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <td className="py-3 px-4">250 หน่วยต่อไป (หน่วยที่ 151 - 400)</td>
                  <td className="py-3 px-4 font-bold">4.2218</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">เกินกว่า 400 หน่วย (หน่วยที่ 401 เป็นต้นไป)</td>
                  <td className="py-3 px-4 font-bold text-red-500">4.4217</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">* ค่าบริการรายเดือน: 38.22 บาท / ยังไม่รวมค่า Ft และภาษีมูลค่าเพิ่ม 7% (อ้างอิง: กกพ.)</p>
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

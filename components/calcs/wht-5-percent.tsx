import React, { useState } from 'react';
import { Calculator, DollarSign, Receipt, Info, FileText } from 'lucide-react';

export default function WHT5PercentCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  const [amount, setAmount] = useState<number | ''>('');
  const [hasVat, setHasVat] = useState<boolean>(false); // Rent usually doesn't have VAT by default
  const [calcType, setCalcType] = useState<'base' | 'total'>('base');

  const t = {
    title: lang === 'TH' ? 'คำนวณภาษีหัก ณ ที่จ่าย 5% (ค่าเช่า)' : '5% Withholding Tax Calculator',
    amountInput: lang === 'TH' ? 'ระบุยอดเงิน (บาท)' : 'Enter Amount (THB)',
    calcTypeTitle: lang === 'TH' ? 'ประเภทการคำนวณ' : 'Calculation Type',
    calcTypeBase: lang === 'TH' ? 'ยอดก่อนภาษี' : 'Base Amount',
    calcTypeTotal: lang === 'TH' ? 'ยอดรวมภาษีมูลค่าเพิ่ม (VAT 7%) แล้ว' : 'Total Amount (Incl. VAT 7%)',
    vatToggle: lang === 'TH' ? 'มีภาษีมูลค่าเพิ่ม VAT 7%' : 'Has VAT 7%',
    results: lang === 'TH' ? 'ผลการคำนวณ' : 'Results',
    baseAmount: lang === 'TH' ? 'ยอดเงินค่าเช่าก่อนภาษี (Base Amount)' : 'Base Amount',
    vatAmount: lang === 'TH' ? 'ภาษีมูลค่าเพิ่ม 7% (VAT)' : 'VAT (7%)',
    whtAmount: lang === 'TH' ? 'หัก ณ ที่จ่าย 5% (WHT)' : 'WHT (5%)',
    netAmount: lang === 'TH' ? 'ยอดเงินที่ต้องชำระสุทธิ' : 'Net Payable Amount',
  };

  const calculateWHT = () => {
    const val = Number(amount) || 0;
    let base = 0;
    let vat = 0;
    
    if (calcType === 'base') {
      base = val;
      vat = hasVat ? base * 0.07 : 0;
    } else {
      if (hasVat) {
        base = val / 1.07;
        vat = val - base;
      } else {
        base = val;
        vat = 0;
      }
    }
    
    const wht = base * 0.05;
    const net = base + vat - wht;

    return { base, vat, wht, net };
  };

  const { base, vat, wht, net } = calculateWHT();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 flex items-center justify-center gap-3">
        <Calculator className="w-8 h-8 text-indigo-500" />
        {t.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.calcTypeTitle}
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={calcType === 'base'}
                  onChange={() => setCalcType('base')}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-full"
                />
                <span className="text-gray-700 dark:text-gray-300">{t.calcTypeBase}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={calcType === 'total'}
                  onChange={() => setCalcType('total')}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-full"
                  disabled={!hasVat}
                />
                <span className={`text-gray-700 dark:text-gray-300 ${!hasVat ? 'opacity-50' : ''}`}>
                  {t.calcTypeTotal}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              {t.amountInput}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="20000"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all text-lg"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <input
              type="checkbox"
              checked={hasVat}
              onChange={(e) => {
                setHasVat(e.target.checked);
                if (!e.target.checked) setCalcType('base');
              }}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <span className="font-medium text-gray-700 dark:text-gray-300">{t.vatToggle}</span>
          </label>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800">
          <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300 mb-6 flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            {t.results}
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-indigo-200 dark:border-indigo-800">
              <span className="text-gray-600 dark:text-gray-400">{t.baseAmount}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {base.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            {hasVat && (
              <div className="flex justify-between items-center py-2 border-b border-indigo-200 dark:border-indigo-800">
                <span className="text-gray-600 dark:text-gray-400">{t.vatAmount}</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  +{vat.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-2 border-b border-indigo-200 dark:border-indigo-800">
              <span className="text-gray-600 dark:text-gray-400">{t.whtAmount}</span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                -{wht.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-4 bg-indigo-100 dark:bg-indigo-800/50 px-4 rounded-lg mt-4">
              <span className="font-bold text-indigo-900 dark:text-indigo-100">{t.netAmount}</span>
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {net.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {lang === 'TH' && (
        <article className="mt-12 prose prose-indigo dark:prose-invert max-w-none">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <FileText className="w-7 h-7 text-indigo-500" />
              การหักภาษี ณ ที่จ่าย 5% คืออะไร? ใช้กับกรณีไหนบ้าง?
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              ภาษีหัก ณ ที่จ่าย อัตรา 5% เป็นอัตราภาษีที่มักจะคุ้นเคยกันดีในกลุ่มนักธุรกิจหรือผู้ที่ทำสัญญาเช่าต่างๆ 
              กฎหมายกำหนดให้ผู้จ่ายเงินซึ่งเป็นนิติบุคคล มีหน้าที่ต้องหักภาษีจากผู้รับเงินในอัตรา 5% จากยอดก่อนภาษีมูลค่าเพิ่ม (ถ้ามี) 
              และนำส่งกรมสรรพากร เพื่อเป็นกลไกในการจัดเก็บภาษีล่วงหน้า
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">กรณีที่ต้องหัก ณ ที่จ่าย 5% ที่พบบ่อย</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                <span className="text-gray-700 dark:text-gray-300"><strong>ค่าเช่าทรัพย์สิน:</strong> เช่น ค่าเช่าอาคารสำนักงาน ค่าเช่าบ้าน ค่าเช่าโกดัง ค่าเช่ารถยนต์ ค่าเช่าเครื่องจักรหรืออุปกรณ์ต่างๆ (หมายเหตุ: การเช่าอสังหาริมทรัพย์ทั่วไปมักจะได้รับยกเว้นภาษีมูลค่าเพิ่ม VAT แต่ยังคงต้องหัก ณ ที่จ่าย 5%)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                <span className="text-gray-700 dark:text-gray-300"><strong>เงินรางวัลจากการชิงโชค:</strong> การจ่ายเงินรางวัล หรือการให้ของรางวัลจากการประกวด แข่งขัน หรือชิงโชคต่างๆ ที่มีมูลค่าตั้งแต่ 1,000 บาทขึ้นไป</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5"></div>
                <span className="text-gray-700 dark:text-gray-300"><strong>ค่าแสดงของนักแสดงสาธารณะ:</strong> เช่น ดารา นักร้อง นักแสดง ที่มีภูมิลำเนาในไทย</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">ค่าเช่า กับ ภาษีมูลค่าเพิ่ม (VAT 7%)</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              ตามกฎหมายแล้ว "การเช่าอสังหาริมทรัพย์" (เช่น อาคาร บ้าน ที่ดิน) จะ<strong>ได้รับยกเว้นภาษีมูลค่าเพิ่ม</strong> 
              ดังนั้นใบแจ้งหนี้ค่าเช่าออฟฟิศมักจะไม่มี VAT 7% ทำให้ยอดที่นำมาคำนวณหัก ณ ที่จ่าย 5% คือยอดค่าเช่าสุทธิเลย
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              แต่ถ้าเป็นการ "เช่าสังหาริมทรัพย์" (เช่น เช่ารถยนต์ เช่าเครื่องถ่ายเอกสาร) 
              หรือสัญญาเช่าพื้นที่ที่มีบริการเสริมพ่วงมาด้วย (เช่น ค่าเช่าพื้นที่ + ค่าบริการพื้นที่ส่วนกลาง) 
              กรณีนี้มักจะมี VAT 7% เข้ามาเกี่ยวข้อง การคำนวณหัก ณ ที่จ่ายจะต้องคิดจากยอดก่อนรวม VAT เสมอ
            </p>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm mb-6 border border-gray-100 dark:border-gray-600">
              <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-3">ตัวอย่างการคำนวณ (กรณีไม่มี VAT)</h4>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>ค่าเช่าอาคารสำนักงาน = 20,000 บาท</li>
                <li>ไม่มี VAT 7% = 0 บาท</li>
                <li>ภาษีหัก ณ ที่จ่าย 5% (20,000 x 5%) = 1,000 บาท</li>
                <li><strong>ยอดสุทธิที่ต้องโอน = 20,000 - 1,000 = 19,000 บาท</strong></li>
              </ul>
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-lg">
              <Info className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>ทริกสำหรับธุรกิจ:</strong> การหักภาษี ณ ที่จ่าย 5% ผู้หัก (บริษัท) จะต้องออกเอกสาร 50 ทวิ ให้ผู้ให้เช่า 
                และนำส่งสรรพากรด้วยแบบ ภ.ง.ด.3 (ถ้าผู้ให้เช่าเป็นบุคคลธรรมดา) หรือ ภ.ง.ด.53 (ถ้าผู้ให้เช่าเป็นนิติบุคคล) ภายในวันที่ 7 ของเดือนถัดไป (หรือวันที่ 15 หากยื่นออนไลน์)
              </p>
            </div>
            
          </div>
        </article>
      )}
    </div>
  );
}

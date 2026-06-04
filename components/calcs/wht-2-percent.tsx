import React, { useState } from 'react';
import { Calculator, DollarSign, Receipt, Info, FileText } from 'lucide-react';

export default function WHT2PercentCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  const [amount, setAmount] = useState<number | ''>('');
  const [hasVat, setHasVat] = useState<boolean>(true); // Advertising usually has VAT
  const [calcType, setCalcType] = useState<'base' | 'total'>('base');

  const t = {
    title: lang === 'TH' ? 'คำนวณภาษีหัก ณ ที่จ่าย 2% (ค่าโฆษณา)' : '2% Withholding Tax Calculator',
    amountInput: lang === 'TH' ? 'ระบุยอดเงิน (บาท)' : 'Enter Amount (THB)',
    calcTypeTitle: lang === 'TH' ? 'ประเภทการคำนวณ' : 'Calculation Type',
    calcTypeBase: lang === 'TH' ? 'ยอดก่อนภาษี' : 'Base Amount',
    calcTypeTotal: lang === 'TH' ? 'ยอดรวมภาษีมูลค่าเพิ่ม (VAT 7%) แล้ว' : 'Total Amount (Incl. VAT 7%)',
    vatToggle: lang === 'TH' ? 'มีภาษีมูลค่าเพิ่ม VAT 7%' : 'Has VAT 7%',
    results: lang === 'TH' ? 'ผลการคำนวณ' : 'Results',
    baseAmount: lang === 'TH' ? 'ยอดเงินค่าโฆษณาก่อนภาษี (Base Amount)' : 'Base Amount',
    vatAmount: lang === 'TH' ? 'ภาษีมูลค่าเพิ่ม 7% (VAT)' : 'VAT (7%)',
    whtAmount: lang === 'TH' ? 'หัก ณ ที่จ่าย 2% (WHT)' : 'WHT (2%)',
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
    
    const wht = base * 0.02;
    const net = base + vat - wht;

    return { base, vat, wht, net };
  };

  const { base, vat, wht, net } = calculateWHT();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 flex items-center justify-center gap-3">
        <Calculator className="w-8 h-8 text-orange-500" />
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
                  className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded-full"
                />
                <span className="text-gray-700 dark:text-gray-300">{t.calcTypeBase}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={calcType === 'total'}
                  onChange={() => setCalcType('total')}
                  className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded-full"
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
              placeholder="10000"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all text-lg"
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
              className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
            />
            <span className="font-medium text-gray-700 dark:text-gray-300">{t.vatToggle}</span>
          </label>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border border-orange-100 dark:border-orange-800">
          <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-300 mb-6 flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            {t.results}
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-orange-200 dark:border-orange-800">
              <span className="text-gray-600 dark:text-gray-400">{t.baseAmount}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {base.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            {hasVat && (
              <div className="flex justify-between items-center py-2 border-b border-orange-200 dark:border-orange-800">
                <span className="text-gray-600 dark:text-gray-400">{t.vatAmount}</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  +{vat.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-2 border-b border-orange-200 dark:border-orange-800">
              <span className="text-gray-600 dark:text-gray-400">{t.whtAmount}</span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                -{wht.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-4 bg-orange-100 dark:bg-orange-800/50 px-4 rounded-lg mt-4">
              <span className="font-bold text-orange-900 dark:text-orange-100">{t.netAmount}</span>
              <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {net.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {lang === 'TH' && (
        <article className="mt-12 prose prose-orange dark:prose-invert max-w-none">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <FileText className="w-7 h-7 text-orange-500" />
              การหักภาษี ณ ที่จ่าย 2% สำหรับ "ค่าโฆษณา"
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              ในยุคดิจิทัลที่ทุกธุรกิจต้องพึ่งพาการโปรโมทสินค้าและบริการ "ค่าโฆษณา" จึงเป็นรายจ่ายที่พบได้แทบทุกบริษัท 
              ตามประมวลรัษฎากรของไทย เมื่อนิติบุคคลมีการจ่ายเงินค่าโฆษณา จะต้องทำการหักภาษี ณ ที่จ่าย ในอัตรา 2% 
              จากยอดเงินก่อนภาษีมูลค่าเพิ่ม (VAT) แล้วนำส่งกรมสรรพากร
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">ค่าโฆษณาที่ต้องหัก 2% ครอบคลุมอะไรบ้าง?</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>โฆษณาผ่านสื่อดั้งเดิม:</strong> เช่น การลงโฆษณาในหนังสือพิมพ์ นิตยสาร โทรทัศน์ วิทยุ ป้ายบิลบอร์ด (Billboard)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>โฆษณาผ่านสื่อออนไลน์:</strong> เช่น การลงแบนเนอร์โฆษณาบนเว็บไซต์ การซื้อพื้นที่โฆษณาบนโซเชียลมีเดีย หรือ แพลตฟอร์มต่างๆ (กรณีจ่ายให้บริษัทในไทย)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>การรับจ้างทำสื่อโฆษณาพร้อมเผยแพร่:</strong> หากจ้างผลิตสื่อโฆษณาพร้อมเผยแพร่ในลักษณะเช่าเหมา อาจถือเป็นค่าโฆษณาทั้งก้อน
                </span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">ความแตกต่างระหว่าง ค่าโฆษณา (2%) และ ค่าบริการส่งเสริมการขาย (3%)</h3>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm mb-6 border border-gray-100 dark:border-gray-600">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                เส้นแบ่งระหว่างค่าโฆษณากับค่าบริการบางครั้งอาจดูคลุมเครือ แต่สรรพากรมีหลักเกณฑ์ในการพิจารณาดังนี้:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>ค่าโฆษณา (2%):</strong> ต้องเป็นการเผยแพร่ข้อมูลของสินค้าหรือบริการสู่สาธารณชน เพื่อหวังผลทางการค้าโดยตรง (เช่น ซื้อพื้นที่ป้ายโฆษณา)</li>
                <li><strong>ค่าส่งเสริมการขาย/ประชาสัมพันธ์ (3%):</strong> เช่น จ้าง Influencer หรือ PR Agency มารีวิวสินค้า หรือรับจ้างเขียนบทความเชียร์สินค้า จะถือเป็นการรับจ้างทำของ/บริการ ต้องหัก 3%</li>
                <li><strong>ค่าจ้างผลิตสื่ออย่างเดียว (3%):</strong> ถ้าจ้างถ่ายทำคลิปโฆษณาแต่ไม่ได้เป็นผู้เผยแพร่ ถือเป็นรับจ้างทำของ หัก 3%</li>
              </ul>
            </div>

            <div className="flex items-start gap-3 p-4 bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-100 rounded-lg">
              <Info className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>การจ่ายค่าโฆษณาให้แพลตฟอร์มต่างประเทศ:</strong> เช่น Facebook, Google ปกติบริษัทเหล่านี้จะไม่มีการให้เราหัก ณ ที่จ่าย (เราต้องจ่ายเต็มยอด) แต่บริษัทในไทยมีหน้าที่ต้องนำส่ง <strong>ภ.พ.36 (นำส่ง VAT แทน)</strong> และหากเข้าเงื่อนไขอาจต้องนำส่ง ภ.ง.ด.54 ด้วย ควรปรึกษานักบัญชีเพื่อความถูกต้อง
              </p>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
              เครื่องมือนี้ช่วยให้การคำนวณภาษีหัก ณ ที่จ่าย 2% ง่ายและแม่นยำยิ่งขึ้น เพียงกรอกยอดที่ตกลงกันไว้ ก็สามารถคำนวณหักภาษี พร้อมแสดงยอด VAT 7% และยอดสุทธิที่ต้องจ่ายเงินให้เอเจนซี่หรือผู้ให้บริการพื้นที่โฆษณาได้อย่างถูกต้องตามกฎหมาย
            </p>
          </div>
        </article>
      )}
    </div>
  );
}

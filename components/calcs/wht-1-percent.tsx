import React, { useState } from 'react';
import { Calculator, DollarSign, Receipt, Info, FileText } from 'lucide-react';

export default function WHT1PercentCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  const [amount, setAmount] = useState<number | ''>('');
  const [hasVat, setHasVat] = useState<boolean>(false); // Transport usually doesn't have VAT by default
  const [calcType, setCalcType] = useState<'base' | 'total'>('base');

  const t = {
    title: lang === 'TH' ? 'คำนวณภาษีหัก ณ ที่จ่าย 1% (ค่าขนส่ง)' : '1% Withholding Tax Calculator',
    amountInput: lang === 'TH' ? 'ระบุยอดเงิน (บาท)' : 'Enter Amount (THB)',
    calcTypeTitle: lang === 'TH' ? 'ประเภทการคำนวณ' : 'Calculation Type',
    calcTypeBase: lang === 'TH' ? 'ยอดก่อนภาษี' : 'Base Amount',
    calcTypeTotal: lang === 'TH' ? 'ยอดรวมภาษีมูลค่าเพิ่ม (VAT 7%) แล้ว' : 'Total Amount (Incl. VAT 7%)',
    vatToggle: lang === 'TH' ? 'มีภาษีมูลค่าเพิ่ม VAT 7%' : 'Has VAT 7%',
    results: lang === 'TH' ? 'ผลการคำนวณ' : 'Results',
    baseAmount: lang === 'TH' ? 'ยอดเงินค่าขนส่งก่อนภาษี (Base Amount)' : 'Base Amount',
    vatAmount: lang === 'TH' ? 'ภาษีมูลค่าเพิ่ม 7% (VAT)' : 'VAT (7%)',
    whtAmount: lang === 'TH' ? 'หัก ณ ที่จ่าย 1% (WHT)' : 'WHT (1%)',
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
    
    const wht = base * 0.01;
    const net = base + vat - wht;

    return { base, vat, wht, net };
  };

  const { base, vat, wht, net } = calculateWHT();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 flex items-center justify-center gap-3">
        <Calculator className="w-8 h-8 text-teal-500" />
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
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded-full"
                />
                <span className="text-gray-700 dark:text-gray-300">{t.calcTypeBase}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={calcType === 'total'}
                  onChange={() => setCalcType('total')}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded-full"
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
              placeholder="5000"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all text-lg"
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
              className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
            />
            <span className="font-medium text-gray-700 dark:text-gray-300">{t.vatToggle}</span>
          </label>
        </div>

        <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-xl border border-teal-100 dark:border-teal-800">
          <h3 className="text-xl font-semibold text-teal-800 dark:text-teal-300 mb-6 flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            {t.results}
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-teal-200 dark:border-teal-800">
              <span className="text-gray-600 dark:text-gray-400">{t.baseAmount}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {base.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            {hasVat && (
              <div className="flex justify-between items-center py-2 border-b border-teal-200 dark:border-teal-800">
                <span className="text-gray-600 dark:text-gray-400">{t.vatAmount}</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  +{vat.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-2 border-b border-teal-200 dark:border-teal-800">
              <span className="text-gray-600 dark:text-gray-400">{t.whtAmount}</span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                -{wht.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-4 bg-teal-100 dark:bg-teal-800/50 px-4 rounded-lg mt-4">
              <span className="font-bold text-teal-900 dark:text-teal-100">{t.netAmount}</span>
              <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                {net.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {lang === 'TH' && (
        <article className="mt-12 prose prose-teal dark:prose-invert max-w-none">
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <FileText className="w-7 h-7 text-teal-500" />
              การหักภาษี ณ ที่จ่าย 1% (ค่าขนส่ง) ที่คนทำธุรกิจควรรู้
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              การขนส่งสินค้าเป็นหัวใจสำคัญของธุรกิจจำนวนมาก ไม่ว่าจะเป็นธุรกิจซื้อมาขายไป โรงงานอุตสาหกรรม หรือธุรกิจ E-commerce 
              เมื่อบริษัทหรือนิติบุคคลมีการจ่าย "ค่าขนส่ง" ให้แก่ผู้ให้บริการขนส่ง กฎหมายสรรพากรกำหนดให้มีหน้าที่ต้องหักภาษี ณ ที่จ่ายในอัตรา 1% 
              ก่อนที่จะจ่ายเงินสุทธิให้กับบริษัทขนส่ง
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">ค่าขนส่งที่ต้องหักภาษี 1% คืออะไร?</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2.5"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>การขนส่งโดยบริษัทขนส่งที่ขึ้นทะเบียน:</strong> เช่น บริษัทที่รับจ้างขนส่งสินค้าโดยเฉพาะ มียานพาหนะเป็นของตนเอง และให้บริการขนส่งเป็นปกติธุระ
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2.5"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>กรณีผู้รับจ้างขนส่งเป็นนิติบุคคลหรือบุคคลธรรมดา:</strong> นิติบุคคลผู้จ่ายเงินต้องหัก 1% ทั้งสิ้น ตราบใดที่เข้าลักษณะสัญญารับขนส่ง
                </span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">จุดสังเกตระหว่าง ค่าขนส่ง (1%) กับ ค่าบริการ (3%)</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              หลายครั้งนักบัญชีมักสับสนว่าควรหัก 1% หรือ 3% สำหรับการขนส่ง จุดแบ่งที่สำคัญคือ:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg border border-teal-100 dark:border-gray-600">
                <h4 className="font-semibold text-teal-700 dark:text-teal-400 mb-2">หัก 1% (สัญญารับขน)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ผู้รับจ้างทำหน้าที่เพียงเคลื่อนย้ายสิ่งของจากจุดหนึ่งไปอีกจุดหนึ่ง ไม่ต้องรับผิดชอบเรื่องอื่น เช่น บริการไปรษณีย์ หรือบริษัทรถบรรทุกรับจ้าง
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg border border-blue-100 dark:border-gray-600">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">หัก 3% (รับจ้างทำของ/บริการ)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  หากการขนส่งนั้นพ่วงมากับบริการอื่นที่เด่นกว่า เช่น การจ้างขนย้ายบ้าน (มีบริการบรรจุหีบห่อ ถอดประกอบเฟอร์นิเจอร์) จะถือเป็นค่าบริการ ต้องหัก 3%
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">ค่าขนส่ง ไม่มีภาษีมูลค่าเพิ่ม (VAT 7%) ใช่หรือไม่?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              ใช่ครับ ตามมาตรา 81(1)(ณ) แห่งประมวลรัษฎากร <strong>การให้บริการขนส่งในราชอาณาจักร ได้รับยกเว้นภาษีมูลค่าเพิ่ม (VAT)</strong> 
              ดังนั้นใบแจ้งหนี้ค่าขนส่งจะไม่มี VAT 7% ปรากฏอยู่ การคำนวณหัก ณ ที่จ่าย 1% จึงคิดจากยอดค่าขนส่งรวมได้เลย
              (ยกเว้นในบางกรณีที่เป็น Logistics แบบครบวงจรที่ไม่ได้แยกค่าขนส่งชัดเจน อาจตีเป็นค่าบริการที่มี VAT ได้)
            </p>

            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-lg">
              <Info className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>ข้อยกเว้น:</strong> หากการจ่ายค่าขนส่งมีมูลค่าต่ำกว่า 1,000 บาท (และไม่ได้มีสัญญาต่อเนื่อง) ผู้จ่ายเงินไม่ต้องหักภาษี ณ ที่จ่าย 1%
              </p>
            </div>
            
          </div>
        </article>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Calculator, DollarSign, Receipt, Info, FileText } from 'lucide-react';

export default function WHT3PercentCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  const [amount, setAmount] = useState<number | ''>('');
  const [hasVat, setHasVat] = useState<boolean>(true);
  const [calcType, setCalcType] = useState<'base' | 'total'>('base');

  const t = {
    title: lang === 'TH' ? 'คำนวณภาษีหัก ณ ที่จ่าย 3% (ค่าบริการ)' : '3% Withholding Tax Calculator',
    amountInput: lang === 'TH' ? 'ระบุยอดเงิน (บาท)' : 'Enter Amount (THB)',
    calcTypeTitle: lang === 'TH' ? 'ประเภทการคำนวณ' : 'Calculation Type',
    calcTypeBase: lang === 'TH' ? 'ยอดก่อนภาษี' : 'Base Amount',
    calcTypeTotal: lang === 'TH' ? 'ยอดรวมภาษีมูลค่าเพิ่ม (VAT 7%) แล้ว' : 'Total Amount (Incl. VAT 7%)',
    vatToggle: lang === 'TH' ? 'กิจการมี VAT 7%' : 'Has VAT 7%',
    results: lang === 'TH' ? 'ผลการคำนวณ' : 'Results',
    baseAmount: lang === 'TH' ? 'ยอดเงินก่อนภาษี (Base Amount)' : 'Base Amount',
    vatAmount: lang === 'TH' ? 'ภาษีมูลค่าเพิ่ม 7% (VAT)' : 'VAT (7%)',
    whtAmount: lang === 'TH' ? 'หัก ณ ที่จ่าย 3% (WHT)' : 'WHT (3%)',
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
    
    const wht = base * 0.03;
    const net = base + vat - wht;

    return { base, vat, wht, net };
  };

  const { base, vat, wht, net } = calculateWHT();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 flex items-center justify-center gap-3">
        <Calculator className="w-8 h-8 text-blue-500" />
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
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full"
                />
                <span className="text-gray-700 dark:text-gray-300">{t.calcTypeBase}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={calcType === 'total'}
                  onChange={() => setCalcType('total')}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full"
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
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all text-lg"
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
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="font-medium text-gray-700 dark:text-gray-300">{t.vatToggle}</span>
          </label>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-6 flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            {t.results}
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-blue-200 dark:border-blue-800">
              <span className="text-gray-600 dark:text-gray-400">{t.baseAmount}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {base.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-blue-200 dark:border-blue-800">
              <span className="text-gray-600 dark:text-gray-400">{t.vatAmount}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                +{vat.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-blue-200 dark:border-blue-800">
              <span className="text-gray-600 dark:text-gray-400">{t.whtAmount}</span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                -{wht.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-4 bg-blue-100 dark:bg-blue-800/50 px-4 rounded-lg mt-4">
              <span className="font-bold text-blue-900 dark:text-blue-100">{t.netAmount}</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {net.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {lang === 'TH' && (
        <article className="mt-12 prose prose-blue dark:prose-invert max-w-none">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <FileText className="w-7 h-7 text-blue-500" />
              การหักภาษี ณ ที่จ่าย 3% คืออะไร? (ข้อมูลปีล่าสุด)
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              การหักภาษี ณ ที่จ่าย 3% เป็นหนึ่งในอัตราภาษีที่พบบ่อยที่สุดในการทำธุรกิจในประเทศไทย 
              มักใช้สำหรับการจ่ายค่าบริการ ค่ารับจ้างทำของ หรือค่าวิชาชีพอิสระต่างๆ เช่น ช่างภาพ ฟรีแลนซ์ นักออกแบบ หรือที่ปรึกษาทางธุรกิจ 
              ผู้จ่ายเงินที่เป็นนิติบุคคลจะมีหน้าที่หักภาษีนี้ไว้ 3% จากยอดก่อนรวมภาษีมูลค่าเพิ่ม (VAT) แล้วนำส่งกรมสรรพากรภายในวันที่ 7 หรือ 15 ของเดือนถัดไป
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">กรณีใดบ้างที่ต้องหัก ณ ที่จ่าย 3%</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5"></div>
                <span className="text-gray-700 dark:text-gray-300"><strong>ค่าบริการทั่วไป:</strong> เช่น ค่าทำความสะอาด ค่ารักษาความปลอดภัย ค่านายหน้าหรือค่าคอมมิชชั่น</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5"></div>
                <span className="text-gray-700 dark:text-gray-300"><strong>ค่ารับจ้างทำของ:</strong> เป็นการจ้างที่มุ่งเน้นผลสำเร็จของงานเป็นหลัก เช่น จ้างออกแบบเว็บไซต์ จ้างเขียนโปรแกรม จ้างวาดภาพประกอบ</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5"></div>
                <span className="text-gray-700 dark:text-gray-300"><strong>ค่าวิชาชีพอิสระ:</strong> เช่น ค่าจ้างวิศวกร สถาปนิก นักบัญชี ทนายความ หรือนักประเมินราคา</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5"></div>
                <span className="text-gray-700 dark:text-gray-300"><strong>ค่าลิขสิทธิ์:</strong> เช่น ค่าตอบแทนจากการให้สิทธิการใช้ลิขสิทธิ์ต่างๆ</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">วิธีการคำนวณภาษีหัก ณ ที่จ่าย 3% อย่างถูกต้อง</h3>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm mb-6 border border-gray-100 dark:border-gray-600">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>หลักการสำคัญ:</strong> การหัก ณ ที่จ่าย จะต้องคำนวณจาก "ยอดเงินก่อนรวมภาษีมูลค่าเพิ่ม (VAT)" เสมอ
              </p>
              <div className="space-y-4 text-sm sm:text-base">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">ตัวอย่างที่ 1: กรณีเสนองาน 10,000 บาท (ยังไม่รวม VAT)</p>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                    <li>ยอดค่าบริการ = 10,000 บาท</li>
                    <li>VAT 7% (10,000 x 7%) = 700 บาท</li>
                    <li>ภาษีหัก ณ ที่จ่าย 3% (10,000 x 3%) = 300 บาท</li>
                    <li><strong>ยอดสุทธิที่ต้องโอนให้ผู้รับเงิน = (10,000 + 700) - 300 = 10,400 บาท</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-lg">
              <Info className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>ข้อควรระวัง:</strong> ผู้หักภาษี (นิติบุคคล) จะต้องออก "หนังสือรับรองการหักภาษี ณ ที่จ่าย" (ใบ 50 ทวิ) ให้แก่ผู้ถูกหัก เพื่อให้ผู้ถูกหักนำไปใช้เป็นหลักฐานในการเครดิตภาษีตอนสิ้นปี หากไม่ดำเนินการอาจมีโทษปรับตามกฎหมายกรมสรรพากร
              </p>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
              ด้วยเครื่องมือคำนวณภาษีหัก ณ ที่จ่าย 3% ของเรา คุณสามารถคำนวณยอดสุทธิที่ต้องโอนได้อย่างรวดเร็ว ไม่ว่ายอดเงินเริ่มต้นจะเป็นยอดก่อน VAT หรือยอดรวม VAT แล้วก็ตาม ช่วยลดข้อผิดพลาดในการคำนวณและประหยัดเวลาในการทำงานเอกสารบัญชีของคุณ
            </p>
          </div>
        </article>
      )}
    </div>
  );
}

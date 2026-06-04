"use client";

import React, { useState, useEffect } from 'react';
import { Landmark, Calendar, Percent, CheckCircle, Calculator } from 'lucide-react';

export default function FixedDepositCalculator({ lang = 'th' }: { lang?: string }) {
  const [principal, setPrincipal] = useState<number | string>(100000);
  const [rate, setRate] = useState<number | string>(2.5);
  const [termMonths, setTermMonths] = useState<number | string>(12);
  const [isTaxExempt, setIsTaxExempt] = useState<boolean>(false);

  const [grossInterest, setGrossInterest] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [netInterest, setNetInterest] = useState<number>(0);
  const [maturityValue, setMaturityValue] = useState<number>(0);

  useEffect(() => {
    calculateFixedDeposit();
  }, [principal, rate, termMonths, isTaxExempt]);

  const calculateFixedDeposit = () => {
    const p = Number(principal) || 0;
    const r = Number(rate) || 0;
    const t = Number(termMonths) || 0;

    // Simple interest formula for fixed deposits: Principal * Rate * (Months / 12)
    const gross = p * (r / 100) * (t / 12);
    
    // 15% Withholding Tax (if applicable)
    const tax = isTaxExempt ? 0 : gross * 0.15;
    
    const net = gross - tax;

    setGrossInterest(gross);
    setTaxAmount(tax);
    setNetInterest(net);
    setMaturityValue(p + net);
  };

  const isTh = lang === 'th';

  const texts = {
    title: isTh ? "เครื่องคำนวณเงินฝากประจำ (หักภาษี 15%)" : "Fixed Deposit Calculator (15% Tax)",
    subtitle: isTh ? "คำนวณดอกเบี้ยเงินฝากประจำ พร้อมหักภาษี ณ ที่จ่าย 15%" : "Calculate FD interest with withholding tax deduction",
    principal: isTh ? "เงินต้น (บาท)" : "Principal Amount",
    rate: isTh ? "อัตราดอกเบี้ยต่อปี (%)" : "Annual Interest Rate (%)",
    term: isTh ? "ระยะเวลาฝาก (เดือน)" : "Term (Months)",
    termCommon: isTh ? "ระยะเวลายอดนิยม:" : "Common terms:",
    taxExempt: isTh ? "บัญชีเงินฝากปลอดภาษี (ไม่ต้องหักภาษี 15%)" : "Tax-exempt account (No 15% tax)",
    summary: isTh ? "ผลการคำนวณเมื่อครบกำหนด" : "Maturity Summary",
    grossInterest: isTh ? "ดอกเบี้ยรับรวม (ก่อนหักภาษี)" : "Gross Interest",
    taxDeducted: isTh ? "ภาษีหัก ณ ที่จ่าย (15%)" : "Withholding Tax (15%)",
    netInterest: isTh ? "ดอกเบี้ยสุทธิ (หลังหักภาษี)" : "Net Interest Earned",
    maturityValue: isTh ? "เงินต้น + ดอกเบี้ยสุทธิ" : "Total Maturity Value",
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <div className="p-3 bg-amber-100 rounded-full text-amber-600">
          <Landmark className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{texts.title}</h2>
          <p className="text-gray-500 text-sm mt-1">{texts.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-500" /> {texts.principal}
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
              min="0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Percent className="w-4 h-4 text-blue-500" /> {texts.rate}
              </label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                min="0"
                step="0.05"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-500" /> {texts.term}
              </label>
              <input
                type="number"
                value={termMonths}
                onChange={(e) => setTermMonths(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                min="1"
                step="1"
              />
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">{texts.termCommon}</p>
            <div className="flex flex-wrap gap-2">
              {[3, 6, 12, 24, 36].map(m => (
                <button
                  key={m}
                  onClick={() => setTermMonths(m)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors border ${Number(termMonths) === m ? 'bg-amber-100 border-amber-300 text-amber-800 font-medium' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                >
                  {m} {isTh ? 'เดือน' : 'mo'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={isTaxExempt}
                  onChange={(e) => setIsTaxExempt(e.target.checked)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 checked:border-amber-500 checked:bg-amber-500 transition-all"
                />
                <CheckCircle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
              </div>
              <span className="text-sm font-medium text-gray-700">{texts.taxExempt}</span>
            </label>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">{texts.summary}</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-amber-200/50">
              <span className="text-gray-600 text-sm">{texts.grossInterest}</span>
              <span className="font-semibold text-gray-800">{grossInterest.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            
            <div className="flex justify-between items-center pb-3 border-b border-amber-200/50">
              <span className="text-gray-600 text-sm">{texts.taxDeducted}</span>
              <span className="font-medium text-red-500">
                {taxAmount > 0 ? '-' : ''}{taxAmount.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between items-center pb-3">
              <span className="text-gray-800 font-medium">{texts.netInterest}</span>
              <span className="font-bold text-green-600 text-lg">
                {netInterest.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="mt-4 bg-white p-5 rounded-xl shadow-sm border border-amber-200 text-center">
              <p className="text-sm text-gray-500 mb-1">{texts.maturityValue}</p>
              <p className="text-3xl font-bold text-amber-600">
                {maturityValue.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isTh && (
        <div className="mt-12 pt-8 border-t border-gray-200 prose prose-amber max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ดอกเบี้ยเงินฝากประจำ กับการหักภาษี ณ ที่จ่าย 15%</h2>
          
          <p>
            <strong>บัญชีเงินฝากประจำ (Fixed Deposit Account)</strong> เป็นทางเลือกการออมเงินที่ได้รับความนิยมสูงสำหรับผู้ที่ต้องการความมั่นคง ไม่เสี่ยงต่อการสูญเสียเงินต้น และได้ผลตอบแทน (ดอกเบี้ย) ที่แน่นอนสูงกว่าบัญชีออมทรัพย์ทั่วไป แลกกับการที่ต้องฝากเงินไว้ตามระยะเวลาที่กำหนด เช่น 3 เดือน, 6 เดือน, 12 เดือน หรือ 24 เดือน โดยห้ามถอนก่อนกำหนด (หากถอนก่อน มักจะไม่ได้รับดอกเบี้ยหรือได้รับในอัตราออมทรัพย์ปกติ)
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมต้องหักภาษี 15%?</h3>
          <p>
            ตามประมวลรัษฎากรของประเทศไทย รายได้ที่เกิดจาก <strong>"ดอกเบี้ยเงินฝากประจำ"</strong> ถือเป็นเงินได้พึงประเมินมาตรา 40(4)(ก) ซึ่งกฎหมายกำหนดให้ธนาคารหรือสถาบันการเงิน มีหน้าที่ <strong>หักภาษีเงินได้ ณ ที่จ่าย ในอัตรา 15% ทันที</strong> เมื่อมีการจ่ายดอกเบี้ยเข้าบัญชีของคุณ 
          </p>
          <p>
            ตัวอย่างเช่น หากคุณฝากเงิน 100,000 บาท ดอกเบี้ย 2% ต่อปี เมื่อครบ 1 ปี คุณควรได้ดอกเบี้ย 2,000 บาท แต่คุณจะได้รับเงินเข้าบัญชีจริงเพียง 1,700 บาท (ถูกหักภาษี 15% คือ 300 บาทนำส่งกรมสรรพากร)
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การขอคืนภาษีดอกเบี้ยเงินฝาก</h3>
          <p>
            ภาษี 15% ที่ถูกหักไปนี้ คุณสามารถ <strong>เลือกได้</strong> ว่าจะนำไปรวมคำนวณภาษีเงินได้บุคคลธรรมดาตอนสิ้นปี (ยื่น ภ.ง.ด.90) หรือไม่ (Final Tax)
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>หากฐานภาษีคุณต่ำกว่า 15%:</strong> (เช่น มีรายได้สุทธิไม่ถึง 300,000 บาทต่อปี หรือไม่มีรายได้อื่น) คุณควรนำดอกเบี้ยไปยื่นรวมเป็นรายได้ประจำปี เพื่อขอคืนภาษีที่ถูกหักไป 15% กลับคืนมาได้</li>
            <li><strong>หากฐานภาษีคุณสูงกว่า 15%:</strong> (เช่น 20%, 25%, 30%) คุณ <strong>ไม่ควร</strong> นำดอกเบี้ยไปยื่นรวม ปล่อยให้เสีย Final Tax ที่ 15% ไปเลยจะคุ้มกว่า เพราะถ้านำไปยื่นรวม คุณจะต้องเสียภาษีเพิ่มตามฐานภาษีที่สูงขึ้น</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ข้อยกเว้น: บัญชีเงินฝากประจำปลอดภาษี (Tax-Free)</h3>
          <p>
            หากคุณไม่ต้องการถูกหักภาษี 15% ธนาคารมีผลิตภัณฑ์ <strong>"บัญชีเงินฝากประจำปลอดภาษี"</strong> ให้เลือก ซึ่งได้รับการยกเว้นภาษีจากกรมสรรพากร แต่มีเงื่อนไขสำคัญคือ:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>ต้องฝากเงินจำนวน <strong>เท่ากันทุกเดือน</strong> อย่างต่อเนื่อง ขาดฝากได้ไม่เกิน 1-2 ครั้ง (แล้วแต่ธนาคาร)</li>
            <li>ระยะเวลาฝากต้องไม่น้อยกว่า 24 เดือน (บางธนาคารมี 36 หรือ 48 เดือน)</li>
            <li>ยอดเงินฝากแต่ละเดือน เมื่อรวมกันตลอดโครงการแล้ว ต้องไม่เกิน 600,000 บาท (ฝากได้สูงสุด 25,000 บาท/เดือน สำหรับแบบ 24 เดือน)</li>
            <li>บุคคลธรรมดา 1 คน สามารถเปิดบัญชีประเภทนี้ได้เพียง <strong>1 บัญชีเท่านั้น</strong> (รวมทุกธนาคาร)</li>
          </ol>
          <p>
            เครื่องคำนวณด้านบน มีตัวเลือก <em>"บัญชีเงินฝากปลอดภาษี"</em> ให้คุณติกติ๊ก หากคุณกำลังคำนวณดอกเบี้ยสำหรับบัญชีประเภทนี้ เพื่อให้ระบบคำนวณดอกเบี้ยรับสุทธิแบบเต็มเม็ดเต็มหน่วย 100%
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import { Printer, Calculator, RefreshCw, FileText, Settings, Info } from 'lucide-react';

export default function PrintCostPerPageCalculator({ lang }: any) {
  const [paperCost, setPaperCost] = useState<number | string>('100');
  const [paperSheets, setPaperSheets] = useState<number | string>('500');
  const [cartridgeCost, setCartridgeCost] = useState<number | string>('1500');
  const [cartridgeYield, setCartridgeYield] = useState<number | string>('2000');
  const [otherCost, setOtherCost] = useState<number | string>('0'); // Electricity, maintenance

  const calculateCost = () => {
    const pCost = parseFloat(paperCost.toString());
    const pSheets = parseFloat(paperSheets.toString());
    const cCost = parseFloat(cartridgeCost.toString());
    const cYield = parseFloat(cartridgeYield.toString());
    const oCost = parseFloat(otherCost.toString()) || 0;

    let costPerPaper = 0;
    if (pSheets > 0 && !isNaN(pCost)) {
      costPerPaper = pCost / pSheets;
    }

    let costPerInk = 0;
    if (cYield > 0 && !isNaN(cCost)) {
      costPerInk = cCost / cYield;
    }

    const totalCost = costPerPaper + costPerInk + oCost;

    return {
      costPerPaper,
      costPerInk,
      totalCost,
    };
  };

  const results = calculateCost();

  const handleReset = () => {
    setPaperCost('100');
    setPaperSheets('500');
    setCartridgeCost('1500');
    setCartridgeYield('2000');
    setOtherCost('0');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white dark:bg-gray-900 shadow-xl rounded-2xl">
      <div className="text-center mb-8">
        <Printer className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {lang === 'EN' ? 'Print Cost Per Page Calculator' : 'เครื่องมือคำนวณต้นทุนการพิมพ์ต่อแผ่น'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'EN'
            ? 'Calculate the exact cost of printing per page including paper, ink, and other expenses.'
            : 'คำนวณต้นทุนกระดาษ หมึก และค่าใช้จ่ายอื่นๆ ในการพิมพ์แต่ละหน้าอย่างละเอียด'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-500" />
            {lang === 'EN' ? 'Input Variables' : 'ตัวแปรการคำนวณ'}
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <FileText className="w-4 h-4 mr-1 text-gray-500" />
                {lang === 'EN' ? 'Paper Cost (per pack/ream)' : 'ราคากระดาษ (ต่อแพ็ค/รีม)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={paperCost}
                  onChange={(e) => setPaperCost(e.target.value)}
                  className="w-full pl-3 pr-16 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. 100"
                  min="0"
                />
                <span className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400">
                  {lang === 'EN' ? 'THB' : 'บาท'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'EN' ? 'Sheets per pack/ream' : 'จำนวนแผ่นกระดาษต่อแพ็ค'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={paperSheets}
                  onChange={(e) => setPaperSheets(e.target.value)}
                  className="w-full pl-3 pr-16 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. 500"
                  min="1"
                />
                <span className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400">
                  {lang === 'EN' ? 'Sheets' : 'แผ่น'}
                </span>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700 my-4" />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <Settings className="w-4 h-4 mr-1 text-gray-500" />
                {lang === 'EN' ? 'Ink/Toner Cartridge Cost' : 'ราคาตลับหมึก / โทนเนอร์'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={cartridgeCost}
                  onChange={(e) => setCartridgeCost(e.target.value)}
                  className="w-full pl-3 pr-16 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. 1500"
                  min="0"
                />
                <span className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400">
                  {lang === 'EN' ? 'THB' : 'บาท'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'EN' ? 'Estimated Yield (Pages per Cartridge)' : 'จำนวนหน้าที่พิมพ์ได้ต่อตลับ'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={cartridgeYield}
                  onChange={(e) => setCartridgeYield(e.target.value)}
                  className="w-full pl-3 pr-16 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. 2000"
                  min="1"
                />
                <span className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400">
                  {lang === 'EN' ? 'Pages' : 'แผ่น'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <Info className="w-3 h-3 mr-1" />
                {lang === 'EN' ? 'Usually found on the cartridge box.' : 'ดูข้อมูลนี้ได้จากกล่องตลับหมึก'}
              </p>
            </div>

            <hr className="border-gray-200 dark:border-gray-700 my-4" />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'EN' ? 'Other Costs Per Page (Optional)' : 'ค่าใช้จ่ายอื่นๆ ต่อหน้า (เลือกกรอก)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={otherCost}
                  onChange={(e) => setOtherCost(e.target.value)}
                  className="w-full pl-3 pr-16 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. 0.05"
                  min="0"
                  step="0.01"
                />
                <span className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400">
                  {lang === 'EN' ? 'THB' : 'บาท'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'EN' ? 'e.g., electricity, maintenance, wear and tear.' : 'เช่น ค่าไฟ ค่าบำรุงรักษา หรือค่าเสื่อมเครื่องพิมพ์'}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center justify-center transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              {lang === 'EN' ? 'Reset Variables' : 'รีเซ็ตค่าเริ่มต้น'}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-blue-600 p-6 rounded-xl text-white shadow-lg flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-6 flex items-center text-blue-100">
            <Calculator className="w-5 h-5 mr-2" />
            {lang === 'EN' ? 'Calculation Results' : 'ผลลัพธ์การคำนวณ'}
          </h3>

          <div className="space-y-6">
            <div className="bg-blue-700/50 p-4 rounded-lg">
              <div className="text-blue-200 text-sm mb-1">{lang === 'EN' ? 'Paper Cost per Page' : 'ต้นทุนกระดาษต่อแผ่น'}</div>
              <div className="text-2xl font-bold">
                {results.costPerPaper.toFixed(4)} {lang === 'EN' ? 'THB' : 'บาท'}
              </div>
            </div>

            <div className="bg-blue-700/50 p-4 rounded-lg">
              <div className="text-blue-200 text-sm mb-1">{lang === 'EN' ? 'Ink/Toner Cost per Page' : 'ต้นทุนหมึกพิมพ์ต่อแผ่น'}</div>
              <div className="text-2xl font-bold">
                {results.costPerInk.toFixed(4)} {lang === 'EN' ? 'THB' : 'บาท'}
              </div>
            </div>

            <div className="bg-blue-500 p-5 rounded-lg border border-blue-400 shadow-inner">
              <div className="text-blue-100 text-lg mb-1">{lang === 'EN' ? 'Total Cost per Page' : 'ต้นทุนรวมทั้งหมดต่อแผ่น'}</div>
              <div className="text-4xl font-extrabold text-white">
                {results.totalCost.toFixed(4)} {lang === 'EN' ? 'THB' : 'บาท'}
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-blue-200 bg-blue-800/30 p-3 rounded-lg flex items-start">
            <Info className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <p>
              {lang === 'EN'
                ? 'These results are estimates based on standard 5% page coverage. Actual ink usage may vary depending on what you print (e.g., photos vs. text).'
                : 'ผลลัพธ์นี้เป็นเพียงการประเมินเบื้องต้น โดยอ้างอิงจากการพิมพ์ที่ครอบคลุมพื้นที่ 5% ของหน้ากระดาษ (มาตรฐาน ISO) ปริมาณการใช้หมึกจริงอาจแตกต่างกันไปตามเนื้อหาที่พิมพ์ (เช่น พิมพ์รูปภาพเทียบกับข้อความ)'}
            </p>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-16 prose prose-blue max-w-none dark:prose-invert">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          การคำนวณต้นทุนการพิมพ์ต่อแผ่น (Print Cost Per Page)
        </h2>
        <p>
          การทราบ <strong>ต้นทุนการพิมพ์ต่อแผ่น (Cost Per Page - CPP)</strong> มีความสำคัญอย่างยิ่งทั้งสำหรับผู้ใช้งานตามบ้าน ธุรกิจขนาดเล็ก และองค์กรขนาดใหญ่ เพราะค่าใช้จ่ายในส่วนของกระดาษและหมึกพิมพ์ มักจะเป็นต้นทุนแฝง (Hidden Cost) ที่หลายคนมองข้าม การคำนวณที่แม่นยำจะช่วยให้คุณควบคุมงบประมาณ เลือกซื้อเครื่องพิมพ์ที่เหมาะสม และพิจารณาว่าคุ้มค่าหรือไม่ที่จะใช้บริการร้านรับปริ้นท์เอกสารแทน
        </p>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">ปัจจัยหลักที่มีผลต่อต้นทุนการพิมพ์</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ต้นทุนกระดาษ (Paper Cost):</strong> กระดาษ A4 มีหลากหลายความหนาและคุณภาพ (เช่น 70 แกรม หรือ 80 แกรม) ราคาต่อรีม (500 แผ่น) จะแตกต่างกัน การคำนวณทำได้ง่ายๆ โดยนำราคาต่อรีมหารด้วย 500</li>
          <li><strong>ต้นทุนหมึกพิมพ์หรือโทนเนอร์ (Ink / Toner Cost):</strong> ตลับหมึก 1 ตลับจะมีสเปคระบุว่าสามารถพิมพ์ได้กี่แผ่น (Page Yield) ซึ่งอ้างอิงจากมาตรฐาน ISO ที่กำหนดให้พื้นที่ที่มีหมึกคิดเป็น 5% ของกระดาษ A4 (ประมาณจดหมายธุรกิจที่มีข้อความ 1 หน้า) การคำนวณคือ นำราคาตลับหมึกหารด้วยจำนวนแผ่นที่พิมพ์ได้</li>
          <li><strong>ค่าใช้จ่ายอื่นๆ (Other Expenses):</strong> เช่น ค่าเสื่อมสภาพของเครื่องพิมพ์ (Drum Unit หรือ Printhead) ค่าบำรุงรักษา และค่าไฟฟ้า แม้จะมีสัดส่วนน้อย แต่สำหรับองค์กรที่มีการพิมพ์ปริมาณมาก ค่าใช้จ่ายเหล่านี้รวมกันก็อาจมีนัยสำคัญ</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">สูตรการคำนวณต้นทุนต่อแผ่น</h3>
        <p className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm border-l-4 border-blue-500">
          ต้นทุนรวมต่อแผ่น = (ราคากระดาษ / จำนวนแผ่นในแพ็ค) + (ราคาตลับหมึก / จำนวนหน้าที่พิมพ์ได้ตามสเปค) + ค่าใช้จ่ายแฝงอื่นๆ
        </p>
        <p className="mt-4">
          ยกตัวอย่างเช่น: กระดาษ 1 รีม (500 แผ่น) ราคา 100 บาท (ต้นทุนกระดาษ 0.20 บาท/แผ่น) ตลับหมึกราคา 1,500 บาท พิมพ์ได้ 2,000 หน้า (ต้นทุนหมึก 0.75 บาท/แผ่น) ดังนั้น ต้นทุนการพิมพ์สุทธิจะอยู่ที่ <strong>0.95 บาทต่อแผ่น</strong> (ยังไม่รวมค่าไฟและค่าเสื่อมสภาพของเครื่อง)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">วิธีประหยัดต้นทุนการพิมพ์เอกสาร</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>ใช้โหมดประหยัดหมึก (Draft Mode):</strong> เหมาะสำหรับการพิมพ์เอกสารเพื่ออ่านภายใน หรือการตรวจทานเนื้อหาก่อนพิมพ์จริง</li>
          <li><strong>พิมพ์สองหน้า (Duplex Printing):</strong> การพิมพ์หน้า-หลัง จะช่วยลดค่ากระดาษลงได้ถึง 50% และยังเป็นมิตรต่อสิ่งแวดล้อม</li>
          <li><strong>เลือกใช้เครื่องพิมพ์อิงค์แทงค์ (Ink Tank System):</strong> สำหรับผู้ที่พิมพ์งานบ่อย เครื่องพิมพ์แบบแทงค์แท้จากโรงงานมักจะมีต้นทุนค่าหมึกต่อแผ่นที่ถูกกว่าตลับหมึกอิงค์เจ็ตแบบดั้งเดิมมาก (อาจเหลือเพียง 0.05 - 0.10 บาทต่อแผ่น)</li>
          <li><strong>ตรวจสอบความถูกต้องก่อนพิมพ์:</strong> ใช้ฟีเจอร์ Print Preview หรือตรวจสอบคำผิดให้เรียบร้อยก่อนสั่งพิมพ์ เพื่อลดการเสียกระดาษและหมึกไปโดยเปล่าประโยชน์</li>
        </ol>

        <p className="mt-6">
          เครื่องมือ <strong>เครื่องคำนวณต้นทุนการพิมพ์ต่อแผ่น</strong> นี้ ถูกออกแบบมาให้ใช้งานง่าย เพียงแค่คุณกรอกข้อมูลราคาจากแพ็กเกจที่คุณซื้อมา ระบบจะคำนวณตัวเลขออกมาให้ทันที ช่วยให้คุณบริหารจัดการค่าใช้จ่ายในสำนักงาน หรือแม้แต่คำนวณจุดคุ้มทุนสำหรับผู้ที่ทำธุรกิจรับจ้างพิมพ์เอกสารได้อย่างมีประสิทธิภาพ
        </p>
      </article>
    </div>
  );
}

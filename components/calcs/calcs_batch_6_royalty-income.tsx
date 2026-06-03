import React, { useState } from 'react';
import { Coins, FileText, Percent, Info } from 'lucide-react';

const RoyaltyIncomeCalculator = ({ lang }: any) => {
  const [salesVolume, setSalesVolume] = useState<number>(1000);
  const [pricePerUnit, setPricePerUnit] = useState<number>(500);
  const [royaltyRate, setRoyaltyRate] = useState<number>(10); // percentage
  const [withholdingTax, setWithholdingTax] = useState<number>(3); // percentage, default 3% for copyright/royalty in TH
  const [deductions, setDeductions] = useState<number>(0);

  // Calculations
  const grossSales = salesVolume * pricePerUnit;
  const grossRoyalty = (grossSales * royaltyRate) / 100;
  const netRoyaltyBeforeTax = grossRoyalty - deductions;
  const taxDeducted = (netRoyaltyBeforeTax * withholdingTax) / 100;
  const netIncome = netRoyaltyBeforeTax - taxDeducted;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6 text-yellow-600">
        <Coins className="w-8 h-8 mr-3" />
        <h1 className="text-2xl font-bold">เครื่องมือคำนวณรายได้ค่าลิขสิทธิ์ (Royalty Income)</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">จำนวนที่ขายได้ / ยอดการใช้งาน (หน่วย)</label>
            <input
              type="number"
              value={salesVolume}
              onChange={(e) => setSalesVolume(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              min="0"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">ราคาขายต่อหน่วย (บาท)</label>
            <input
              type="number"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              min="0"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              อัตราค่าลิขสิทธิ์ (%) <Percent className="w-4 h-4 ml-1" />
            </label>
            <input
              type="number"
              value={royaltyRate}
              onChange={(e) => setRoyaltyRate(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              min="0"
              max="100"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">ค่าธรรมเนียมแพลตฟอร์ม/เอเจนซี่หักออก (บาท)</label>
            <input
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              min="0"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">ภาษีหัก ณ ที่จ่าย (%)</label>
            <select
              value={withholdingTax}
              onChange={(e) => setWithholdingTax(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value={3}>3% (บุคคลธรรมดา/นิติบุคคลทั่วไป ค่าลิขสิทธิ์)</option>
              <option value={5}>5% (อัตราอื่นๆ / ผู้รับเงินอยู่ต่างประเทศบางกรณี)</option>
              <option value={15}>15% (ส่งรายได้ไปต่างประเทศ ไม่มีอนุสัญญาฯ)</option>
              <option value={0}>0% (ได้รับยกเว้น)</option>
            </select>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" /> สรุปรายได้ค่าลิขสิทธิ์
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">ยอดขายรวม (Gross Sales):</span>
              <span className="font-semibold text-gray-800">฿{grossSales.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-yellow-200">
              <span className="text-gray-600">ส่วนแบ่งลิขสิทธิ์ ({royaltyRate}%):</span>
              <span className="font-semibold text-gray-800">฿{grossRoyalty.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm text-red-600">
              <span>หัก ค่าธรรมเนียม/เอเจนซี่:</span>
              <span>-฿{deductions.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm text-red-600 pb-2 border-b border-yellow-200">
              <span>หัก ภาษี ณ ที่จ่าย ({withholdingTax}%):</span>
              <span>-฿{taxDeducted.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-bold text-gray-800">รายได้สุทธิ (Net Income):</span>
              <span className="text-2xl font-bold text-green-600">฿{netIncome.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-md flex items-start text-sm text-gray-600 border border-yellow-100">
            <Info className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-yellow-500" />
            <p>
              ภาษีหัก ณ ที่จ่าย <strong>฿{taxDeducted.toLocaleString()}</strong> คุณสามารถขอหนังสือรับรองการหักภาษี ณ ที่จ่าย (50 ทวิ) จากผู้จ่ายเงิน เพื่อนำไปเครดิตภาษีตอนสิ้นปีได้
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 prose max-w-none text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-yellow-700">ค่าลิขสิทธิ์ (Royalty Fee) คืออะไร และคำนวณอย่างไร?</h2>
        <p>
          <strong>ค่าลิขสิทธิ์ (Royalty Fee)</strong> คือ ผลตอบแทนหรือรายได้ที่เจ้าของผลงาน ทรัพย์สินทางปัญญา (Intellectual Property) หรือเจ้าของสิทธิ์ ได้รับจากการอนุญาตให้บุคคลอื่นนำผลงานนั้นไปใช้ ผลิตซ้ำ ทำซ้ำ ดัดแปลง หรือจัดจำหน่ายเพื่อแสวงหาผลกำไร โดยมักจะตกลงจ่ายเป็นสัดส่วนเปอร์เซ็นต์จากยอดขาย (Sales Revenue) หรือจำนวนชิ้นที่ขายได้
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ตัวอย่างการจ่ายค่าลิขสิทธิ์ที่พบบ่อยในธุรกิจ</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>วงการหนังสือ:</strong> นักเขียนได้รับค่าลิขสิทธิ์ (Royalty) จากสำนักพิมพ์ เช่น 10% ของราคาปก คูณด้วยจำนวนเล่มที่พิมพ์หรือขายได้</li>
          <li><strong>วงการดนตรีและสื่อ:</strong> ศิลปิน นักแต่งเพลง ได้รับส่วนแบ่งจากการสตรีมเพลง ยอดวิว หรือการนำเพลงไปใช้ในโฆษณา</li>
          <li><strong>ธุรกิจแฟรนไชส์ (Franchise):</strong> ผู้ซื้อแฟรนไชส์ (Franchisee) ต้องจ่าย Royalty Fee ให้แก่เจ้าของแบรนด์ (Franchisor) เป็นรายเดือน เช่น 3-5% ของยอดขายสุทธิ</li>
          <li><strong>เทคโนโลยีและสิทธิบัตร:</strong> การอนุญาตให้บริษัทอื่นใช้สิทธิบัตรทางเทคโนโลยี (Patent Licensing) เพื่อผลิตสินค้า</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">กลไกและวิธีการคำนวณรายได้ค่าลิขสิทธิ์</h3>
        <p>การคำนวณค่าลิขสิทธิ์มักจะระบุไว้อย่างชัดเจนใน <strong>"สัญญาอนุญาตให้ใช้สิทธิ์" (Licensing Agreement)</strong> ซึ่งประกอบด้วยตัวแปรสำคัญ ดังนี้:</p>
        <div className="bg-gray-100 p-4 rounded-md my-4 font-mono text-sm">
          <p>1. ยอดขายรวม (Gross Sales) = จำนวนที่ขายได้ × ราคาต่อหน่วย</p>
          <p>2. ค่าลิขสิทธิ์ขั้นต้น (Gross Royalty) = ยอดขายรวม × อัตราค่าลิขสิทธิ์ (%)</p>
          <p>3. หักค่าธรรมเนียม (Deductions) เช่น ส่วนแบ่งเอเจนซี่ หรือแพลตฟอร์ม</p>
          <p>4. ภาษีหัก ณ ที่จ่าย (Withholding Tax) = (ค่าลิขสิทธิ์ขั้นต้น - ค่าธรรมเนียม) × อัตราภาษี (%)</p>
          <p className="font-bold text-yellow-700 mt-2">รายได้สุทธิที่ได้รับจริง = ค่าลิขสิทธิ์ขั้นต้น - ค่าธรรมเนียม - ภาษีหัก ณ ที่จ่าย</p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">ประเด็นสำคัญเรื่อง "ภาษี" ที่คนรับค่าลิขสิทธิ์ต้องรู้</h3>
        <p>
          ตามประมวลรัษฎากรของประเทศไทย รายได้ที่เกิดจาก <strong>"ค่าลิขสิทธิ์" หรือ "เงินได้ค่าแห่งกู๊ดวิลล์ สิทธิบัตร ฯลฯ"</strong> จัดเป็นเงินได้พึงประเมินมาตรา 40(3) ซึ่งมีข้อบังคับทางภาษีดังนี้:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>ภาษีหัก ณ ที่จ่าย (Withholding Tax):</strong> โดยปกติหากผู้จ่ายเงินเป็นนิติบุคคล จะต้องหักภาษี ณ ที่จ่ายในอัตรา <strong>3%</strong> สำหรับค่าลิขสิทธิ์ หรือ <strong>15%</strong> กรณีจ่ายให้บริษัทในต่างประเทศ (ขึ้นอยู่กับอนุสัญญาภาษีซ้อน)
          </li>
          <li>
            <strong>การหักค่าใช้จ่าย:</strong> สำหรับบุคคลธรรมดา เงินได้มาตรา 40(3) เฉพาะค่าลิขสิทธิ์ สามารถหักค่าใช้จ่ายแบบเหมาได้ 50% แต่สูงสุดไม่เกิน 100,000 บาท (หรือตามเงื่อนไขที่กฎหมายกำหนดล่าสุด)
          </li>
          <li>
            <strong>ภาษีมูลค่าเพิ่ม (VAT):</strong> หากรายได้รวมของปีนั้นเกิน 1.8 ล้านบาท ผู้รับสิทธิ์ที่เป็นบุคคลธรรมดาหรือนิติบุคคลอาจมีหน้าที่ต้องจดทะเบียนภาษีมูลค่าเพิ่ม เว้นแต่จะเป็นการยกเว้นตามประเภทธุรกิจบางประเภท
          </li>
        </ol>

        <p className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-sm">
          <strong>ข้อแนะนำก่อนเซ็นสัญญา:</strong> ควรตรวจสอบให้แน่ชัดว่า อัตราเปอร์เซ็นต์ค่าลิขสิทธิ์นั้นคำนวณจากยอดขายรวม (Gross Sales) หรือยอดขายสุทธิหลังหักส่วนลดแล้ว (Net Sales) เพราะจะทำให้ตัวเลขรายได้ที่คุณจะได้รับแตกต่างกันอย่างมาก
        </p>
      </div>
    </div>
  );
};

export default RoyaltyIncomeCalculator;

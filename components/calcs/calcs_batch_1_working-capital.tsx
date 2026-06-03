import React, { useState } from 'react';
import { Briefcase, AlertCircle } from 'lucide-react';

export default function WorkingCapital({ lang }: any) {
  const [cash, setCash] = useState<number | string>('');
  const [accountsReceivable, setAccountsReceivable] = useState<number | string>('');
  const [inventory, setInventory] = useState<number | string>('');
  const [otherCurrentAssets, setOtherCurrentAssets] = useState<number | string>('');

  const [accountsPayable, setAccountsPayable] = useState<number | string>('');
  const [shortTermDebt, setShortTermDebt] = useState<number | string>('');
  const [otherCurrentLiabilities, setOtherCurrentLiabilities] = useState<number | string>('');

  const currentAssets = 
    (Number(cash) || 0) + 
    (Number(accountsReceivable) || 0) + 
    (Number(inventory) || 0) + 
    (Number(otherCurrentAssets) || 0);

  const currentLiabilities = 
    (Number(accountsPayable) || 0) + 
    (Number(shortTermDebt) || 0) + 
    (Number(otherCurrentLiabilities) || 0);

  const workingCapital = currentAssets - currentLiabilities;
  const currentRatio = currentLiabilities > 0 ? (currentAssets / currentLiabilities) : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-teal-100 rounded-full">
          <Briefcase className="w-8 h-8 text-teal-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">เครื่องมือคำนวณเงินทุนหมุนเวียน (Working Capital)</h1>
          <p className="text-gray-500">ประเมินสภาพคล่องระยะสั้นของธุรกิจ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-green-50 p-5 rounded-xl border border-green-100">
          <h2 className="text-lg font-semibold text-green-800 mb-4 border-b border-green-200 pb-2">สินทรัพย์หมุนเวียน (Current Assets)</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">เงินสดและรายการเทียบเท่า (Cash)</label>
              <input type="number" value={cash} onChange={(e) => setCash(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-green-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">ลูกหนี้การค้า (Accounts Receivable)</label>
              <input type="number" value={accountsReceivable} onChange={(e) => setAccountsReceivable(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-green-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">สินค้าคงเหลือ (Inventory)</label>
              <input type="number" value={inventory} onChange={(e) => setInventory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-green-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">สินทรัพย์หมุนเวียนอื่นๆ</label>
              <input type="number" value={otherCurrentAssets} onChange={(e) => setOtherCurrentAssets(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-green-500" placeholder="0" />
            </div>
            <div className="pt-3 flex justify-between font-bold text-green-900 border-t border-green-200">
              <span>รวมสินทรัพย์หมุนเวียน:</span>
              <span>{currentAssets.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-5 rounded-xl border border-red-100">
          <h2 className="text-lg font-semibold text-red-800 mb-4 border-b border-red-200 pb-2">หนี้สินหมุนเวียน (Current Liabilities)</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">เจ้าหนี้การค้า (Accounts Payable)</label>
              <input type="number" value={accountsPayable} onChange={(e) => setAccountsPayable(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-red-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">หนี้สินระยะสั้น (Short-term Debt)</label>
              <input type="number" value={shortTermDebt} onChange={(e) => setShortTermDebt(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-red-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">หนี้สินหมุนเวียนอื่นๆ</label>
              <input type="number" value={otherCurrentLiabilities} onChange={(e) => setOtherCurrentLiabilities(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-red-500" placeholder="0" />
            </div>
            <div className="pt-3 flex justify-between font-bold text-red-900 border-t border-red-200 mt-auto">
              <span>รวมหนี้สินหมุนเวียน:</span>
              <span>{currentLiabilities.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {(currentAssets > 0 || currentLiabilities > 0) && (
        <div className="bg-gray-800 text-white p-6 rounded-xl mb-8 flex flex-col md:flex-row items-center justify-around gap-6">
          <div className="text-center">
            <p className="text-gray-400 mb-1 text-sm uppercase tracking-wider">เงินทุนหมุนเวียนสุทธิ (Net Working Capital)</p>
            <p className={`text-3xl font-bold ${workingCapital < 0 ? 'text-red-400' : 'text-teal-400'}`}>
              {workingCapital.toLocaleString()} บาท
            </p>
          </div>
          
          <div className="hidden md:block w-px h-16 bg-gray-600"></div>
          
          <div className="text-center">
            <p className="text-gray-400 mb-1 text-sm uppercase tracking-wider">อัตราส่วนทุนหมุนเวียน (Current Ratio)</p>
            <p className={`text-3xl font-bold ${currentRatio < 1 ? 'text-red-400' : currentRatio > 2 ? 'text-blue-400' : 'text-teal-400'}`}>
              {currentRatio.toFixed(2)} : 1
            </p>
          </div>
        </div>
      )}

      {currentRatio > 0 && currentRatio < 1 && (
        <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
          <p><strong>คำเตือนสภาพคล่อง:</strong> อัตราส่วน Current Ratio ต่ำกว่า 1 หมายความว่าธุรกิจของคุณมีหนี้สินระยะสั้นที่ต้องจ่าย มากกว่าสินทรัพย์ระยะสั้นที่แปลงเป็นเงินสดได้ อาจเกิดปัญหาขาดแคลนเงินสดรุนแรงได้</p>
        </div>
      )}

      <hr className="my-8 border-gray-200" />

      <article className="prose prose-teal max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">เงินทุนหมุนเวียน (Working Capital) คืออะไร และทำไมถึงสำคัญกับธุรกิจ</h2>
        
        <p>
          หนึ่งในสาเหตุหลักที่ทำให้ธุรกิจขนาดกลางและขนาดย่อม (SME) ไปไม่รอด ไม่ใช่เพราะขายของไม่ได้ หรือไม่มีกำไร แต่เป็นเพราะ <strong>"ขาดสภาพคล่อง"</strong> หรือพูดง่ายๆ คือไม่มีเงินสดจ่ายหนี้ระยะสั้น 
          ตัวชี้วัดที่สำคัญที่สุดตัวหนึ่งที่สะท้อนถึงสุขภาพทางการเงินระยะสั้นของธุรกิจคือ <strong>เงินทุนหมุนเวียน (Working Capital)</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">นิยามของเงินทุนหมุนเวียน</h3>
        <p>
          เงินทุนหมุนเวียน (Net Working Capital) คือผลต่างระหว่าง <strong>สินทรัพย์หมุนเวียน (Current Assets)</strong> และ <strong>หนี้สินหมุนเวียน (Current Liabilities)</strong> 
          เป็นการวัดความสามารถของกิจการในการชำระหนี้ระยะสั้น (ภายใน 1 ปี) และประเมินว่ามีเงินทุนเหลือเพียงพอสำหรับการดำเนินงานประจำวันหรือไม่
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ส่วนประกอบของการคำนวณ</h3>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>สินทรัพย์หมุนเวียน:</strong> สิ่งที่เป็นเงินสด หรือคาดว่าจะแปลงเป็นเงินสดได้ภายใน 1 ปี เช่น เงินฝากธนาคาร ลูกหนี้การค้า (ลูกค้าที่ยังไม่จ่ายเงิน) และสินค้าคงเหลือ (สต็อก)</li>
          <li><strong>หนี้สินหมุนเวียน:</strong> ภาระผูกพันที่ต้องจ่ายภายใน 1 ปี เช่น เจ้าหนี้การค้า (เงินที่คุณค้างซัพพลายเออร์) เงินกู้ระยะสั้น ค่าใช้จ่ายค้างจ่ายต่างๆ</li>
        </ul>
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center text-lg">
          เงินทุนหมุนเวียน = สินทรัพย์หมุนเวียน - หนี้สินหมุนเวียน
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การตีความผลลัพธ์</h3>
        <p>
          <strong>1. เงินทุนหมุนเวียนเป็นบวก (Positive Working Capital):</strong> สินทรัพย์มีมากกว่าหนี้สิน แสดงว่าธุรกิจมีสภาพคล่องดี สามารถจ่ายหนี้ระยะสั้นได้สบายๆ และยังมีเงินเหลือสำหรับต่อยอดธุรกิจ<br/><br/>
          <strong>2. เงินทุนหมุนเวียนเป็นลบ (Negative Working Capital):</strong> หนี้สินระยะสั้นมีมากกว่าสินทรัพย์ระยะสั้น นี่คือสัญญาณอันตราย (Red Flag) ธุรกิจอาจเจอปัญหาในการหาเงินมาจ่ายหนี้ หรือจ่ายเงินเดือนพนักงาน หากปล่อยไว้อาจนำไปสู่การล้มละลายได้
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">อัตราส่วนทุนหมุนเวียน (Current Ratio)</h3>
        <p>
          อีกหนึ่งค่าที่ควรดูควบคู่กันคือ Current Ratio ซึ่งเกิดจากการนำ สินทรัพย์หมุนเวียน หารด้วย หนี้สินหมุนเวียน
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>อัตราส่วน 1.5 - 2.0:</strong> ถือเป็นเกณฑ์มาตรฐานที่ดี ธุรกิจมีความมั่นคง สภาพคล่องเพียงพอ</li>
          <li><strong>อัตราส่วน ต่ำกว่า 1.0:</strong> อันตราย มีโอกาสผิดนัดชำระหนี้สูง</li>
          <li><strong>อัตราส่วน สูงกว่า 2.0 มากๆ:</strong> อาจจะดูดี แต่ในแง่การบริหารจัดการอาจหมายถึงธุรกิจกำลัง "แช่แข็ง" เงินไว้ในสต็อกสินค้าที่ระบายไม่ออก หรือปล่อยเครดิตให้ลูกค้ามากเกินไป โดยไม่นำเงินไปลงทุนให้เกิดประโยชน์สูงสุด</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สรุป: การบริหารเงินทุนหมุนเวียนให้มีประสิทธิภาพ</h3>
        <p>
          การมีสินค้าคงคลังเยอะๆ หรือยอดขายดีแต่เก็บเงินไม่ได้ (ลูกหนี้การค้าสูง) จะทำให้เงินทุนหมุนเวียนจม ดังนั้น เคล็ดลับในการบริหารคือ <strong>เร่งเก็บเงินลูกค้าให้เร็วที่สุด ควบคุมปริมาณสต็อกสินค้าให้พอดี และเจรจายืดระยะเวลาจ่ายเงินซัพพลายเออร์ (เครดิตเทอม) ให้ยาวขึ้นอย่างสมเหตุสมผล</strong> 
          เพียงเท่านี้ธุรกิจก็จะมีสายป่านที่ยาวขึ้นและเติบโตได้อย่างยั่งยืน
        </p>
      </article>
    </div>
  );
}

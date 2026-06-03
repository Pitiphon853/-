import React, { useState } from 'react';
import { Layers, ArrowRightLeft, AlignLeft, Info } from 'lucide-react';

const InventoryCostingCalculator = ({ lang }: any) => {
  // Batch 1 (Oldest)
  const [b1Qty, setB1Qty] = useState<number>(100);
  const [b1Price, setB1Price] = useState<number>(50);
  // Batch 2 
  const [b2Qty, setB2Qty] = useState<number>(150);
  const [b2Price, setB2Price] = useState<number>(55);
  // Batch 3 (Newest)
  const [b3Qty, setB3Qty] = useState<number>(200);
  const [b3Price, setB3Price] = useState<number>(60);

  const [unitsSold, setUnitsSold] = useState<number>(220);

  const totalInventoryUnits = b1Qty + b2Qty + b3Qty;
  const totalInventoryValue = (b1Qty * b1Price) + (b2Qty * b2Price) + (b3Qty * b3Price);

  // Guard against selling more than inventory
  const actualSold = Math.min(unitsSold, totalInventoryUnits);

  // FIFO Calculation
  let fifoCOGS = 0;
  let remainingToSell = actualSold;
  
  if (remainingToSell <= b1Qty) {
    fifoCOGS += remainingToSell * b1Price;
  } else {
    fifoCOGS += b1Qty * b1Price;
    remainingToSell -= b1Qty;
    
    if (remainingToSell <= b2Qty) {
      fifoCOGS += remainingToSell * b2Price;
    } else {
      fifoCOGS += b2Qty * b2Price;
      remainingToSell -= b2Qty;
      
      fifoCOGS += remainingToSell * b3Price;
    }
  }

  // AVCO (Average Cost) Calculation
  const avcoUnitCost = totalInventoryUnits > 0 ? totalInventoryValue / totalInventoryUnits : 0;
  const avcoCOGS = actualSold * avcoUnitCost;

  // Ending Inventory
  const fifoEnding = totalInventoryValue - fifoCOGS;
  const avcoEnding = totalInventoryValue - avcoCOGS;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <Layers className="w-8 h-8 text-teal-600" />
        <h2 className="text-2xl font-bold text-gray-800">Inventory Costing (FIFO vs AVCO)</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4" /> Inventory Purchases
            </h3>
            
            {/* Batch 1 */}
            <div className="flex gap-3 mb-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Batch 1 (Oldest) Qty</label>
                <input type="number" value={b1Qty} onChange={(e) => setB1Qty(Number(e.target.value))} className="w-full px-2 py-1.5 border rounded text-sm focus:ring-1 focus:ring-teal-500" />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Unit Cost ฿</label>
                <input type="number" value={b1Price} onChange={(e) => setB1Price(Number(e.target.value))} className="w-full px-2 py-1.5 border rounded text-sm focus:ring-1 focus:ring-teal-500" />
              </div>
            </div>

            {/* Batch 2 */}
            <div className="flex gap-3 mb-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Batch 2 Qty</label>
                <input type="number" value={b2Qty} onChange={(e) => setB2Qty(Number(e.target.value))} className="w-full px-2 py-1.5 border rounded text-sm focus:ring-1 focus:ring-teal-500" />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Unit Cost ฿</label>
                <input type="number" value={b2Price} onChange={(e) => setB2Price(Number(e.target.value))} className="w-full px-2 py-1.5 border rounded text-sm focus:ring-1 focus:ring-teal-500" />
              </div>
            </div>

            {/* Batch 3 */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Batch 3 (Newest) Qty</label>
                <input type="number" value={b3Qty} onChange={(e) => setB3Qty(Number(e.target.value))} className="w-full px-2 py-1.5 border rounded text-sm focus:ring-1 focus:ring-teal-500" />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Unit Cost ฿</label>
                <input type="number" value={b3Price} onChange={(e) => setB3Price(Number(e.target.value))} className="w-full px-2 py-1.5 border rounded text-sm focus:ring-1 focus:ring-teal-500" />
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t text-sm flex justify-between font-medium text-gray-600">
              <span>Total Available: {totalInventoryUnits} units</span>
              <span>Value: ฿{totalInventoryValue.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
            <label className="block text-sm font-semibold text-teal-800 mb-2">
              Units Sold (จำนวนที่ขายออกไป)
            </label>
            <input
              type="number"
              value={unitsSold}
              onChange={(e) => setUnitsSold(Number(e.target.value))}
              max={totalInventoryUnits}
              className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg font-bold text-gray-800"
            />
            {unitsSold > totalInventoryUnits && (
              <p className="text-xs text-red-500 mt-1">Cannot sell more than total available ({totalInventoryUnits})</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {/* FIFO Results */}
          <div className="bg-white border-2 border-indigo-100 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-100 flex items-center justify-between">
              <h3 className="font-bold text-indigo-800 flex items-center gap-2">
                <AlignLeft className="w-5 h-5" /> FIFO (เข้าก่อน-ออกก่อน)
              </h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Cost of Goods Sold</div>
                <div className="text-2xl font-bold text-red-500">฿{fifoCOGS.toLocaleString()}</div>
                <div className="text-xs text-gray-400 mt-1">ต้นทุนขาย</div>
              </div>
              <div className="border-l pl-4">
                <div className="text-xs text-gray-500 uppercase font-semibold">Ending Inventory</div>
                <div className="text-2xl font-bold text-indigo-600">฿{fifoEnding.toLocaleString()}</div>
                <div className="text-xs text-gray-400 mt-1">มูลค่าสินค้าคงเหลือ</div>
              </div>
            </div>
          </div>

          {/* AVCO Results */}
          <div className="bg-white border-2 border-emerald-100 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-100 flex items-center justify-between">
              <h3 className="font-bold text-emerald-800 flex items-center gap-2">
                <Layers className="w-5 h-5" /> AVCO (ต้นทุนถัวเฉลี่ย)
              </h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Cost of Goods Sold</div>
                <div className="text-2xl font-bold text-red-500">฿{avcoCOGS.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                <div className="text-xs text-gray-400 mt-1">ต้นทุนขาย (@ ฿{avcoUnitCost.toFixed(2)}/unit)</div>
              </div>
              <div className="border-l pl-4">
                <div className="text-xs text-gray-500 uppercase font-semibold">Ending Inventory</div>
                <div className="text-2xl font-bold text-emerald-600">฿{avcoEnding.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                <div className="text-xs text-gray-400 mt-1">มูลค่าสินค้าคงเหลือ</div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 flex gap-2 items-start">
            <Info className="w-5 h-5 shrink-0 mt-0.5" />
            <p><strong>Note:</strong> In a period of rising prices (inflation), FIFO yields lower COGS and higher profit, while AVCO smooths out price fluctuations.</p>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-teal max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">การตีราคาสินค้าคงคลัง: FIFO vs AVCO</h2>
        <p>
          ในทางธุรกิจและการบัญชี เมื่อเราซื้อสินค้าล็อตใหม่ๆ เข้ามาเรื่อยๆ ในราคาต้นทุนที่ "ไม่เท่ากัน" (ส่วนใหญ่มักจะแพงขึ้นตามภาวะเงินเฟ้อ) เมื่อเราขายสินค้าออกไป คำถามคือ <strong>"เราจะใช้ต้นทุนของล็อตไหนมาคำนวณเป็น ต้นทุนขาย (COGS)?"</strong> และมูลค่าสินค้าคงเหลือในโกดัง (Ending Inventory) ควรจะเป็นเท่าไหร่? วิธีการที่นิยมใช้กันทั่วโลกมี 2 วิธีหลัก คือ <strong>FIFO</strong> และ <strong>AVCO (หรือ Weighted Average)</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. FIFO (First-In, First-Out)</h3>
        <p>
          <strong>เข้าก่อน-ออกก่อน:</strong> สมมติฐานของวิธีนี้คือ สินค้าล็อตแรกที่ซื้อเข้ามา (ซึ่งมักจะราคาถูกกว่า) จะถูกนำไปขายก่อน ดังนั้น ต้นทุนของสินค้าที่ขายไป (COGS) จะสะท้อนราคาต้นทุนเก่าที่ต่ำกว่า ในขณะที่สินค้าคงเหลือปลายงวดในโกดัง จะถูกตีมูลค่าด้วยราคาล่าสุดของล็อตใหม่
        </p>
        <ul>
          <li><strong>ข้อดี:</strong> มูลค่าสินค้าคงเหลือในงบดุล (Balance Sheet) จะใกล้เคียงกับราคาตลาดปัจจุบันมากที่สุด</li>
          <li><strong>ผลกระทบ:</strong> ในยุคที่ของแพงขึ้น (Inflation) วิธี FIFO จะทำให้ต้นทุนขาย (COGS) ต่ำ ส่งผลให้ "กำไรสุทธิ (Net Profit)" สูงขึ้น ซึ่งอาจทำให้ต้องเสียภาษีเงินได้นิติบุคคลมากขึ้นด้วย</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. AVCO (Average Cost / Weighted Average)</h3>
        <p>
          <strong>ต้นทุนถัวเฉลี่ยถ่วงน้ำหนัก:</strong> วิธีนี้จะไม่สนว่าของล็อตไหนเข้าก่อนหรือเข้าหลัง แต่นำมูลค่าสินค้าทั้งหมดที่มี หารด้วยจำนวนชิ้นทั้งหมด เพื่อหา "ราคาเฉลี่ยต่อชิ้น" แล้วใช้ราคาเฉลี่ยนั้นเป็นทั้งต้นทุนขาย (COGS) และมูลค่าสินค้าคงเหลือ
        </p>
        <ul>
          <li><strong>ข้อดี:</strong> เรียบง่าย ลดความผันผวนของต้นทุน ช่วยเกลี่ยตัวเลขกำไรไม่ให้กระโดดไปมาเมื่อมีการเปลี่ยนแปลงราคาซื้ออย่างรวดเร็ว</li>
          <li><strong>ผลกระทบ:</strong> กำไรที่แสดงในงบกำไรขาดทุนจะอยู่ตรงกลาง ไม่สูงหรือต่ำจนเกินไป เหมาะกับสินค้าที่แยกแยะล็อตการผลิตได้ยาก เช่น น้ำมัน หรือสารเคมี</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ควรเลือกใช้วิธีไหน?</h3>
        <p>
          มาตรฐานการบัญชี (เช่น TFRS หรือ IFRS) อนุญาตให้ใช้ทั้ง 2 วิธี (ไม่อนุญาตให้ใช้ LIFO) การเลือกใช้วิธีใดจะต้องใช้วิธีนั้นอย่างสม่ำเสมอ (Consistency) ไม่สามารถเปลี่ยนไปมาได้ตามใจชอบ ธุรกิจส่วนใหญ่ โดยเฉพาะที่มีระบบ POS หรือ WMS มักจะนิยมใช้ FIFO เพราะสะท้อนความเป็นจริงของการระบายสต็อกสินค้า (โดยเฉพาะสินค้าที่มีวันหมดอายุ) 
        </p>
        
        <p className="mt-4 text-sm text-gray-500">
          อ้างอิง: มาตรฐานการบัญชี ฉบับที่ 2 (TAS 2) เรื่อง สินค้าคงเหลือ (Inventories)
        </p>
      </div>
    </div>
  );
};

export default InventoryCostingCalculator;

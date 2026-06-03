import React, { useState } from 'react';
import { Activity } from 'lucide-react';

export default function QuickCurrentRatio({ lang }: any) {
  const [currentAssets, setCurrentAssets] = useState<number | ''>(500000);
  const [inventory, setInventory] = useState<number | ''>(200000);
  const [currentLiabilities, setCurrentLiabilities] = useState<number | ''>(250000);
  
  const ca = Number(currentAssets) || 0;
  const inv = Number(inventory) || 0;
  const cl = Number(currentLiabilities) || 0;

  const quickAssets = Math.max(0, ca - inv);

  const currentRatio = cl > 0 ? ca / cl : 0;
  const quickRatio = cl > 0 ? quickAssets / cl : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Activity className="mr-2" />
          คำนวณอัตราส่วนสภาพคล่อง (Current & Quick Ratio)
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                สินทรัพย์หมุนเวียนรวม (Current Assets)
              </label>
              <input
                type="number"
                value={currentAssets}
                onChange={(e) => setCurrentAssets(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                สินค้าคงเหลือ (Inventory)
              </label>
              <input
                type="number"
                value={inventory}
                onChange={(e) => setInventory(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              หนี้สินหมุนเวียน (Current Liabilities)
            </label>
            <input
              type="number"
              value={currentLiabilities}
              onChange={(e) => setCurrentLiabilities(Number(e.target.value))}
              className="w-full md:w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className={`p-4 rounded-md border text-center ${currentRatio >= 1.5 ? 'bg-green-50 border-green-200' : currentRatio >= 1 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Current Ratio (อัตราส่วนทุนหมุนเวียน)</h3>
              <div className="text-3xl font-bold my-2">{currentRatio.toFixed(2)} เท่า</div>
              <p className="text-xs text-gray-600">
                {currentRatio >= 1.5 ? 'สภาพคล่องดีมาก (แนะนำ > 1.5)' : currentRatio >= 1 ? 'สภาพคล่องพอใช้ (ควรเฝ้าระวัง)' : 'สภาพคล่องต่ำ (เสี่ยงชำระหนี้ระยะสั้นไม่ได้)'}
              </p>
            </div>
            
            <div className={`p-4 rounded-md border text-center ${quickRatio >= 1 ? 'bg-green-50 border-green-200' : quickRatio >= 0.8 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Quick Ratio (อัตราส่วนทุนหมุนเวียนเร็ว)</h3>
              <div className="text-3xl font-bold my-2">{quickRatio.toFixed(2)} เท่า</div>
              <p className="text-xs text-gray-600">
                {quickRatio >= 1 ? 'สภาพคล่องระยะสั้นดีมาก (แนะนำ > 1)' : quickRatio >= 0.8 ? 'สภาพคล่องระยะสั้นพอใช้' : 'สภาพคล่องระยะสั้นต่ำ (อาจขาดเงินสดกะทันหัน)'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md prose max-w-none">
        <h2>อัตราส่วนสภาพคล่อง (Liquidity Ratios) คืออะไร ทำไมธุรกิจต้องใส่ใจ?</h2>
        <p>หลายธุรกิจที่ "กำไรดี" แต่กลับต้อง "ปิดกิจการ" มักเกิดจากปัญหาเดียวกันคือ <strong>"ขาดสภาพคล่อง"</strong> (เงินสดหมุนเวียนไม่ทัน) การติดตามอัตราส่วนสภาพคล่องจึงเป็นเหมือนการตรวจเช็คชีพจรทางการเงินของธุรกิจ เพื่อดูว่าเรามีความสามารถในการชำระหนี้ระยะสั้น (หนี้ที่ต้องจ่ายภายใน 1 ปี) ได้ดีแค่ไหน โดยมี 2 อัตราส่วนที่นิยมใช้มากที่สุดคือ Current Ratio และ Quick Ratio</p>
        
        <h3>1. อัตราส่วนทุนหมุนเวียน (Current Ratio)</h3>
        <p><strong>สูตร:</strong> สินทรัพย์หมุนเวียน (Current Assets) / หนี้สินหมุนเวียน (Current Liabilities)</p>
        <p>Current Ratio เป็นการเทียบแบบง่ายๆ ว่า "สินทรัพย์ที่เปลี่ยนเป็นเงินสดได้ภายใน 1 ปี (เช่น เงินสด, ลูกหนี้การค้า, สินค้าคงเหลือ)" มีมากกว่า "หนี้ที่ต้องจ่ายภายใน 1 ปี (เช่น เจ้าหนี้การค้า, เงินเบิกเกินบัญชี)" หรือไม่</p>
        <ul>
          <li><strong>Current Ratio &gt; 1:</strong> (เช่น 1.5 เท่า) หมายความว่า ธุรกิจมีสินทรัพย์ระยะสั้นมากกว่าหนี้ระยะสั้น ถือว่ามีสภาพคล่องดี ปลอดภัย</li>
          <li><strong>Current Ratio &lt; 1:</strong> (เช่น 0.8 เท่า) หมายความว่า หนี้ระยะสั้นมีมากกว่าสินทรัพย์ระยะสั้น ธุรกิจอาจมีปัญหาในการหาเงินมาจ่ายหนี้ในเร็วๆ นี้</li>
        </ul>
        <p><em>เกณฑ์มาตรฐานโดยทั่วไป:</em> ควรมีค่ามากกว่า 1.5 ถึง 2 เท่า อย่างไรก็ตาม ธุรกิจบางประเภทอย่างค้าปลีกที่ขายเป็นเงินสดตลอด อาจมีค่านี้ต่ำกว่า 1 ได้โดยไม่เป็นอันตราย</p>

        <h3>2. อัตราส่วนทุนหมุนเวียนเร็ว (Quick Ratio หรือ Acid-Test Ratio)</h3>
        <p><strong>สูตร:</strong> (สินทรัพย์หมุนเวียน - สินค้าคงเหลือ) / หนี้สินหมุนเวียน</p>
        <p>แม้ Current Ratio จะบอกสภาพคล่องได้ แต่สินทรัพย์หมุนเวียนบางตัวอย่าง <strong>"สินค้าคงเหลือ" (Inventory)</strong> อาจไม่ได้ขายออกและเปลี่ยนเป็นเงินสดได้ง่ายๆ หรือเร็วทันใจ โดยเฉพาะสินค้าแฟชั่น หรือสินค้าที่เสื่อมสภาพง่าย Quick Ratio จึงถูกคิดค้นขึ้นมาเพื่อประเมิน "สภาพคล่องแบบรวดเร็ว" โดยการหักสินค้าคงเหลือออกไป เหลือเพียง เงินสด และ ลูกหนี้การค้า เป็นหลัก</p>
        <ul>
          <li><strong>Quick Ratio &gt; 1:</strong> หมายความว่า แม้พรุ่งนี้ขายสินค้าไม่ได้เลยสักชิ้น ธุรกิจก็ยังมีเงินสดและลูกหนี้ที่เก็บเงินได้ เพียงพอที่จะไปจ่ายหนี้ระยะสั้นทั้งหมดได้ทันที ถือว่ามีโครงสร้างการเงินที่แข็งแกร่งมาก</li>
        </ul>

        <h3>ข้อควรระวังในการบริหารสภาพคล่อง</h3>
        <ol>
          <li><strong>สภาพคล่องสูงเกินไปก็ไม่ดี:</strong> หาก Current Ratio สูงปรี๊ด (เช่น 4-5 เท่า) อาจแปลว่าธุรกิจเก็บเงินสดไว้เฉยๆ มากเกินไป หรือมีสินค้าคงเหลือค้างสต๊อกมหาศาล (Dead Stock) ซึ่งทำให้เสียโอกาสในการนำเงินไปลงทุนเพื่อสร้างผลตอบแทนที่สูงกว่า</li>
          <li><strong>ดูตัวเลขลูกหนี้การค้าประกอบ:</strong> แม้ Quick Ratio จะดูดี แต่ถ้า "ลูกหนี้การค้า" ที่มีอยู่เป็นหนี้เสีย (NPL) หรือเป็นลูกหนี้ที่ตามทวงเงินยาก สภาพคล่องที่เห็นอาจเป็นเพียงภาพลวงตา</li>
        </ol>
        <p>ผู้บริหารควรประเมินสภาพคล่องทั้ง Current Ratio และ Quick Ratio ควบคู่กันไป และเปรียบเทียบกับรอบระยะเวลาที่ผ่านมา เพื่อให้มั่นใจว่ากระแสเงินสดของกิจการจะไหลลื่น ไม่มีสะดุด</p>
      </div>
    </div>
  );
}

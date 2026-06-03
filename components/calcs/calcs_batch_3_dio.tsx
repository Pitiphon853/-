import React, { useState } from 'react';
import { Warehouse, DollarSign, Activity, PackageCheck } from 'lucide-react';

const DIOCalculator = ({ lang }: any) => {
  const [averageInventory, setAverageInventory] = useState<number>(800000);
  const [cogs, setCogs] = useState<number>(3500000);
  const [daysInPeriod, setDaysInPeriod] = useState<number>(365);

  const dio = cogs > 0 ? (averageInventory / cogs) * daysInPeriod : 0;
  const inventoryTurnover = averageInventory > 0 ? cogs / averageInventory : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <Warehouse className="w-8 h-8 text-orange-600" />
        <h2 className="text-2xl font-bold text-gray-800">DIO (Days Inventory Outstanding) Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Average Inventory (สินค้าคงคลังเฉลี่ย)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={averageInventory}
                onChange={(e) => setAverageInventory(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">มักคำนวณจาก (สินค้าต้นงวด + สินค้าปลายงวด) / 2</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cost of Goods Sold - COGS (ต้นทุนขาย)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={cogs}
                onChange={(e) => setCogs(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">ต้นทุนขายรวมตลอดรอบระยะเวลา</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Days in Period (จำนวนวันในรอบระยะเวลา)
            </label>
            <select
              value={daysInPeriod}
              onChange={(e) => setDaysInPeriod(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value={30}>1 Month (30 วัน)</option>
              <option value={90}>1 Quarter (90 วัน)</option>
              <option value={365}>1 Year (365 วัน)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-orange-50 p-6 rounded-xl flex-1 flex flex-col justify-center items-center text-center border border-orange-100">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
              <PackageCheck className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-sm font-semibold text-orange-800 mb-1">Days Inventory Outstanding</h3>
            <div className="text-5xl font-bold text-orange-600 mb-1">
              {dio.toFixed(1)}
            </div>
            <p className="text-sm font-medium text-orange-700">วัน (Days)</p>
            <p className="text-xs text-orange-600 mt-2 px-2">
              ระยะเวลาเฉลี่ยที่สินค้าจมอยู่ในสต็อกก่อนที่จะขายออกไป
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-200">
            <h4 className="text-sm text-gray-600 font-medium">Inventory Turnover Ratio (อัตราหมุนเวียนสินค้าคงคลัง)</h4>
            <div className="text-2xl font-bold text-gray-800 mt-1">{inventoryTurnover.toFixed(2)} รอบ</div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-orange max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">DIO (Days Inventory Outstanding) คืออะไร?</h2>
        <p>
          <strong>Days Inventory Outstanding (DIO)</strong> หรือระยะเวลาขายสินค้าเฉลี่ย (บางครั้งเรียกว่า Days Sales of Inventory - DSI) คือ ตัวชี้วัดทางการเงินที่บอกให้รู้ว่า โดยเฉลี่ยแล้วธุรกิจใช้เวลากี่วันในการเปลี่ยนสินค้าคงคลัง (Inventory) ให้กลายเป็นยอดขาย (Sales) หรืออีกนัยหนึ่งคือ <strong>"สินค้าค้างอยู่ในโกดังนานกี่วันก่อนจะถูกขายออกไป"</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการคำนวณ DIO</h3>
        <p>การคำนวณ DIO นิยมใช้สูตรดังนี้:</p>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4 flex justify-center text-lg">
          <div className="text-center font-mono font-semibold text-orange-700">
            DIO = ( Average Inventory / Cost of Goods Sold ) × Number of Days
          </div>
        </div>
        <ul>
          <li><strong>Average Inventory:</strong> สินค้าคงคลังเฉลี่ย คำนวณจาก (สินค้าคงคลังต้นงวด + สินค้าคงคลังปลายงวด) / 2</li>
          <li><strong>COGS (ต้นทุนขาย):</strong> ต้นทุนของสินค้าที่ขายออกไปแล้วในช่วงเวลานั้น</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิเคราะห์ผลลัพธ์ DIO</h3>
        <p>
          <strong>DIO ต่ำ (Low DIO):</strong> โดยทั่วไปถือว่าเป็นสัญญาณที่ดี แสดงว่าสินค้าขายออกเร็ว ไม่ค้างสต็อกนาน ธุรกิจมีสภาพคล่องสูง ลดความเสี่ยงจากสินค้าล้าสมัย (Obsolescence) และประหยัดค่าใช้จ่ายในการจัดเก็บ (Holding Cost) อย่างไรก็ตาม หาก DIO ต่ำเกินไป อาจเสี่ยงต่อภาวะสินค้าขาดสต็อก (Stockout) ทำให้เสียโอกาสในการขาย
        </p>
        <p>
          <strong>DIO สูง (High DIO):</strong> มักเป็นสัญญาณเตือนว่าธุรกิจเก็บสต็อกมากเกินไป หรือยอดขายเริ่มตกลง ทำให้มีเงินทุนจม (Tied-up Capital) อยู่ในโกดัง สินค้าอาจเสื่อมสภาพหรือล้าสมัยได้ง่าย (เช่น สินค้าแฟชั่นหรืออิเล็กทรอนิกส์)
        </p>
        <p>
          <em>หมายเหตุ:</em> ค่า DIO ที่เหมาะสมจะแตกต่างกันไปตามแต่ละอุตสาหกรรม (Industry Benchmark) เช่น ธุรกิจซุปเปอร์มาร์เก็ตขายของสดจะมี DIO ต่ำมาก (เพียงไม่กี่วัน) ในขณะที่ธุรกิจขายเครื่องจักรขนาดใหญ่ หรือรถยนต์ อาจมี DIO ที่สูงหลักร้อยวัน
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">DIO สำคัญต่อธุรกิจอย่างไร?</h3>
        <p>
          DIO เป็นหนึ่งในสามองค์ประกอบสำคัญของการคำนวณ <strong>วงจรเงินสด (Cash Conversion Cycle - CCC)</strong> (ร่วมกับ DSO และ DPO) ผู้บริหารคลังสินค้าและนักวิเคราะห์การเงินมักใช้ตัวเลขนี้ประเมินประสิทธิภาพการจัดการสินค้าคงคลัง (Inventory Management Efficiency) หากธุรกิจสามารถปรับลด DIO ลงได้ในระดับที่พอดี จะช่วยเพิ่มกระแสเงินสดอิสระ (Free Cash Flow) กลับเข้าสู่ธุรกิจได้อย่างมหาศาล
        </p>
        
        <p className="mt-4 text-sm text-gray-500">
          อ้างอิง: ทฤษฎีการจัดการคลังสินค้า (Inventory Management) และการวิเคราะห์อัตราส่วนสภาพคล่อง (Liquidity Ratios)
        </p>
      </div>
    </div>
  );
};

export default DIOCalculator;

"use client";
import { useState } from "react";
import { Calendar, Calculator, RotateCcw, Info } from "lucide-react";

export default function RemainingAnnualLeave({ lang }: any) {
  const [totalDays, setTotalDays] = useState<number>(10);
  const [usedDays, setUsedDays] = useState<number>(0);
  const [pendingDays, setPendingDays] = useState<number>(0);
  const [carryOver, setCarryOver] = useState<number>(0);
  const [showResult, setShowResult] = useState(false);

  const remaining = totalDays + carryOver - usedDays - pendingDays;
  const usedPercent = totalDays + carryOver > 0 ? ((usedDays + pendingDays) / (totalDays + carryOver)) * 100 : 0;

  const handleCalculate = () => setShowResult(true);
  const handleReset = () => {
    setTotalDays(10);
    setUsedDays(0);
    setPendingDays(0);
    setCarryOver(0);
    setShowResult(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-100 rounded-xl">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">คำนวณวันลาพักร้อนเหลือ</h2>
            <p className="text-sm text-gray-500">ตรวจสอบวันลาพักร้อนคงเหลือของคุณ</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันลาพักร้อนทั้งปี (วัน)
            </label>
            <input
              type="number"
              min={0}
              value={totalDays}
              onChange={(e) => setTotalDays(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันลาสะสมจากปีก่อน (วัน)
            </label>
            <input
              type="number"
              min={0}
              value={carryOver}
              onChange={(e) => setCarryOver(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันลาที่ใช้ไปแล้ว (วัน)
            </label>
            <input
              type="number"
              min={0}
              value={usedDays}
              onChange={(e) => setUsedDays(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันลาที่รออนุมัติ (วัน)
            </label>
            <input
              type="number"
              min={0}
              value={pendingDays}
              onChange={(e) => setPendingDays(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCalculate}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Calculator className="w-5 h-5" /> คำนวณ
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg flex items-center gap-2 transition"
          >
            <RotateCcw className="w-4 h-4" /> ล้าง
          </button>
        </div>

        {showResult && (
          <div className="mt-6 space-y-4">
            <div className={`p-5 rounded-xl text-center ${remaining >= 0 ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
              <p className="text-sm text-gray-600 mb-1">วันลาพักร้อนคงเหลือ</p>
              <p className={`text-4xl font-bold ${remaining >= 0 ? "text-green-700" : "text-red-700"}`}>
                {remaining} <span className="text-lg font-normal">วัน</span>
              </p>
              {remaining < 0 && (
                <p className="text-sm text-red-500 mt-1">⚠️ คุณใช้วันลาเกินสิทธิ์แล้ว</p>
              )}
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>ใช้ไปแล้ว {usedDays + pendingDays} วัน</span>
                <span>{usedPercent.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${usedPercent > 100 ? "bg-red-500" : usedPercent > 75 ? "bg-yellow-500" : "bg-green-500"}`}
                  style={{ width: `${Math.min(usedPercent, 100)}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">สิทธิ์ทั้งหมด</p>
                <p className="text-lg font-bold text-blue-700">{totalDays + carryOver}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">ใช้แล้ว</p>
                <p className="text-lg font-bold text-gray-700">{usedDays}</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">รออนุมัติ</p>
                <p className="text-lg font-bold text-yellow-700">{pendingDays}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">คงเหลือ</p>
                <p className="text-lg font-bold text-green-700">{remaining}</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">เกร็ดน่ารู้</p>
                <p>ตามกฎหมายแรงงานไทย ลูกจ้างที่ทำงานครบ 1 ปี มีสิทธิ์ลาพักร้อนอย่างน้อย 6 วันทำงานต่อปี</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <article className="prose max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">คำนวณวันลาพักร้อนคงเหลือ: เครื่องมือวางแผนวันหยุดอย่างมืออาชีพ</h2>

        <p>
          วันลาพักร้อน (Annual Leave) เป็นสิทธิ์สำคัญของพนักงานทุกคนตามกฎหมายแรงงานไทย พ.ร.บ.คุ้มครองแรงงาน พ.ศ.2541 กำหนดให้ลูกจ้างที่ทำงานครบ 1 ปี มีสิทธิ์หยุดพักผ่อนประจำปีไม่น้อยกว่า 6 วันทำงาน ทั้งนี้หลายบริษัทให้สิทธิ์มากกว่ากฎหมายกำหนด โดยอาจให้ 10-20 วันขึ้นอยู่กับอายุงานและนโยบายองค์กร
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ทำไมต้องติดตามวันลาพักร้อน?</h3>
        <p>
          การติดตามวันลาพักร้อนอย่างสม่ำเสมอช่วยให้คุณวางแผนการท่องเที่ยวหรือพักผ่อนได้ล่วงหน้า ป้องกันการใช้วันลาเกินสิทธิ์ที่อาจทำให้ถูกหักเงินเดือน รวมถึงช่วยบริหารจัดการตารางงานให้สมดุลกับการพักผ่อน หลายองค์กรกำหนดให้วันลาพักร้อนที่ไม่ได้ใช้สามารถสะสมข้ามปีได้ตามเงื่อนไขที่กำหนด (Carry Over) ดังนั้นการรู้จำนวนวันลาที่เหลืออยู่จึงสำคัญมาก
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">วิธีใช้งานเครื่องมือคำนวณวันลาพักร้อน</h3>
        <p>
          เพียงกรอกจำนวนวันลาพักร้อนทั้งปีที่คุณได้รับสิทธิ์ จำนวนวันลาสะสมจากปีก่อน (ถ้ามี) จำนวนวันที่ใช้ไปแล้ว และจำนวนวันที่อยู่ระหว่างรออนุมัติ ระบบจะคำนวณวันลาคงเหลือและแสดงแถบสถานะให้เห็นอย่างชัดเจน
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">สิทธิ์วันลาตามกฎหมายแรงงานไทย</h3>
        <p>
          นอกจากวันลาพักร้อนแล้ว พนักงานยังมีสิทธิ์ลาป่วย (ไม่เกิน 30 วัน/ปี โดยได้รับค่าจ้าง), ลากิจ (ตามข้อบังคับบริษัท), ลาคลอด (ไม่เกิน 98 วัน), และลาเพื่อรับราชการทหาร การเข้าใจสิทธิ์ของตัวเองทำให้สามารถวางแผนการใช้วันลาได้อย่างมีประสิทธิภาพ
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">เคล็ดลับการบริหารวันลาพักร้อน</h3>
        <p>
          วางแผนลาล่วงหน้าตั้งแต่ต้นปี ใช้วันลาให้กระจายตลอดทั้งปีเพื่อป้องกันอาการ burnout หมั่นตรวจสอบยอดคงเหลือเป็นประจำ และอย่าลืมสอบถาม HR เกี่ยวกับนโยบายการสะสมวันลา เพราะบางบริษัทกำหนดให้วันลาที่ไม่ได้ใช้จะหมดอายุเมื่อสิ้นปี เครื่องมือนี้ช่วยให้คุณบริหารจัดการวันลาพักร้อนได้อย่างง่ายดายและแม่นยำ
        </p>
      </article>
    </div>
  );
}

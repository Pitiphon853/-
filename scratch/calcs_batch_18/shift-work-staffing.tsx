"use client";
import { useState } from "react";
import { Users, Calculator, RotateCcw, Clock, Info } from "lucide-react";

export default function ShiftWorkStaffing({ lang }: any) {
  const [hoursPerDay, setHoursPerDay] = useState<number>(24);
  const [shiftLength, setShiftLength] = useState<number>(8);
  const [staffPerShift, setStaffPerShift] = useState<number>(5);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(7);
  const [maxWorkDays, setMaxWorkDays] = useState<number>(5);
  const [absentRate, setAbsentRate] = useState<number>(5);
  const [showResult, setShowResult] = useState(false);

  const shiftsPerDay = hoursPerDay / shiftLength;
  const totalShiftsPerWeek = shiftsPerDay * daysPerWeek;
  const shiftsPerWorkerPerWeek = maxWorkDays;
  const minWorkersNeeded = Math.ceil((totalShiftsPerWeek * staffPerShift) / shiftsPerWorkerPerWeek);
  const withAbsent = Math.ceil(minWorkersNeeded / (1 - absentRate / 100));

  const handleCalculate = () => setShowResult(true);
  const handleReset = () => {
    setHoursPerDay(24);
    setShiftLength(8);
    setStaffPerShift(5);
    setDaysPerWeek(7);
    setMaxWorkDays(5);
    setAbsentRate(5);
    setShowResult(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 rounded-xl">
            <Users className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">คำนวณจำนวนคนต่อกะ</h2>
            <p className="text-sm text-gray-500">วางแผนกำลังคนสำหรับงานกะอย่างเหมาะสม</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชั่วโมงเปิดให้บริการ/วัน
            </label>
            <input
              type="number"
              min={1}
              max={24}
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชั่วโมงต่อกะ
            </label>
            <select
              value={shiftLength}
              onChange={(e) => setShiftLength(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
            >
              <option value={6}>6 ชั่วโมง</option>
              <option value={8}>8 ชั่วโมง</option>
              <option value={12}>12 ชั่วโมง</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              จำนวนคนต่อกะที่ต้องการ
            </label>
            <input
              type="number"
              min={1}
              value={staffPerShift}
              onChange={(e) => setStaffPerShift(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันเปิดทำการ/สัปดาห์
            </label>
            <input
              type="number"
              min={1}
              max={7}
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันทำงานสูงสุดของพนักงาน/สัปดาห์
            </label>
            <input
              type="number"
              min={1}
              max={7}
              value={maxWorkDays}
              onChange={(e) => setMaxWorkDays(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              อัตราขาดงาน/ลา (%)
            </label>
            <input
              type="number"
              min={0}
              max={50}
              value={absentRate}
              onChange={(e) => setAbsentRate(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCalculate}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition"
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
            <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-xl text-center">
              <p className="text-sm text-gray-600 mb-1">จำนวนพนักงานทั้งหมดที่ต้องมี</p>
              <p className="text-4xl font-bold text-indigo-700">
                {withAbsent} <span className="text-lg font-normal">คน</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">(รวมสำรองขาดงาน {absentRate}%)</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">จำนวนกะ/วัน</p>
                <p className="text-lg font-bold text-blue-700">{shiftsPerDay}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">กะรวม/สัปดาห์</p>
                <p className="text-lg font-bold text-purple-700">{totalShiftsPerWeek}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">คนขั้นต่ำ (ไม่รวมสำรอง)</p>
                <p className="text-lg font-bold text-green-700">{minWorkersNeeded}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" /> ตารางกะ
              </h4>
              <div className="space-y-2">
                {Array.from({ length: shiftsPerDay }, (_, i) => {
                  const startHour = i * shiftLength;
                  const endHour = startHour + shiftLength;
                  return (
                    <div key={i} className="flex items-center justify-between text-sm bg-white px-3 py-2 rounded-lg">
                      <span className="font-medium text-gray-700">กะที่ {i + 1}</span>
                      <span className="text-gray-500">
                        {String(startHour).padStart(2, "0")}:00 - {String(endHour % 24).padStart(2, "0")}:00
                      </span>
                      <span className="text-indigo-600 font-semibold">{staffPerShift} คน</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 flex items-start gap-2">
              <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-800">
                ควรมีพนักงานสำรองเพิ่มเติมสำหรับกรณีฉุกเฉิน เช่น ลาป่วยกะทันหัน หรือเหตุการณ์ไม่คาดคิด
              </p>
            </div>
          </div>
        )}
      </div>

      <article className="prose max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">คำนวณเวรยาม จำนวนคนต่อกะ: วางแผนกำลังคนอย่างมืออาชีพ</h2>

        <p>
          การจัดตารางเวรยามหรือกะทำงาน (Shift Scheduling) เป็นหัวใจสำคัญของธุรกิจที่เปิดให้บริการตลอด 24 ชั่วโมง ไม่ว่าจะเป็นโรงงาน โรงพยาบาล ร้านสะดวกซื้อ ศูนย์ Call Center หรืองานรักษาความปลอดภัย การคำนวณจำนวนคนต่อกะที่เหมาะสมช่วยให้ธุรกิจดำเนินงานได้อย่างราบรื่นโดยไม่ขาดกำลังคน
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ปัจจัยสำคัญในการคำนวณกำลังคนต่อกะ</h3>
        <p>
          ปัจจัยหลักที่ต้องพิจารณาได้แก่ จำนวนชั่วโมงเปิดให้บริการต่อวัน ความยาวของแต่ละกะ (โดยทั่วไป 8 หรือ 12 ชั่วโมง) จำนวนพนักงานขั้นต่ำที่ต้องมีในแต่ละกะ จำนวนวันทำงานสูงสุดของพนักงานต่อสัปดาห์ และอัตราการขาดงานหรือลา ซึ่งโดยทั่วไปอยู่ที่ 3-10%
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">รูปแบบการจัดกะที่นิยม</h3>
        <p>
          รูปแบบที่พบบ่อยที่สุดคือระบบ 3 กะ (กะละ 8 ชั่วโมง) สำหรับธุรกิจ 24 ชั่วโมง ได้แก่ กะเช้า 06:00-14:00 กะบ่าย 14:00-22:00 และกะดึก 22:00-06:00 บางธุรกิจใช้ระบบ 2 กะ (กะละ 12 ชั่วโมง) เพื่อลดจำนวนการเปลี่ยนกะ
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">วิธีคำนวณจำนวนพนักงานที่ต้องการ</h3>
        <p>
          สูตรพื้นฐานคือ นำจำนวนกะรวมต่อสัปดาห์ คูณด้วยจำนวนคนต่อกะ แล้วหารด้วยจำนวนวันที่พนักงานทำได้ต่อสัปดาห์ จากนั้นบวกเพิ่มตามอัตราการขาดงานเพื่อให้มีพนักงานสำรองเพียงพอ เครื่องมือนี้ช่วยคำนวณทุกอย่างให้คุณอัตโนมัติ เพียงกรอกข้อมูลก็สามารถวางแผนกำลังคนได้ทันที
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">กฎหมายแรงงานไทยกับการจัดกะ</h3>
        <p>
          ตามกฎหมายแรงงานไทย ลูกจ้างไม่ควรทำงานเกิน 8 ชั่วโมงต่อวัน และไม่เกิน 48 ชั่วโมงต่อสัปดาห์ สำหรับงานกะดึก นายจ้างต้องจ่ายค่าตอบแทนพิเศษตามที่กฎหมายกำหนด การวางแผนกำลังคนที่ดีจึงต้องคำนึงถึงข้อกฎหมายเหล่านี้ด้วย
        </p>
      </article>
    </div>
  );
}

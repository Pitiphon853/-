
"use client";
import { useState } from "react";
import { Calculator, Zap, Sun, Moon, Clock } from "lucide-react";

export default function TouElectricityCost({ lang }: any) {
  const [peakUnits, setPeakUnits] = useState<number>(200);
  const [offPeakUnits, setOffPeakUnits] = useState<number>(300);
  const [voltage, setVoltage] = useState<string>("below22");
  const [holidayUnits, setHolidayUnits] = useState<number>(100);

  // TOU rates (THB per unit) — approximate MEA/PEA rates
  const rates: Record<string, { peak: number; offPeak: number; holiday: number }> = {
    below22: { peak: 5.7982, offPeak: 2.6369, holiday: 2.6369 },
    above22: { peak: 5.7095, offPeak: 2.6107, holiday: 2.6107 },
  };

  const r = rates[voltage];
  const peakCost = peakUnits * r.peak;
  const offPeakCost = offPeakUnits * r.offPeak;
  const holidayCost = holidayUnits * r.holiday;
  const totalUnits = peakUnits + offPeakUnits + holidayUnits;
  const totalCost = peakCost + offPeakCost + holidayCost;
  const ft = totalUnits * -0.0116; // Ft charge example
  const serviceFee = voltage === "below22" ? 46.16 : 312.24;
  const vat = (totalCost + ft + serviceFee) * 0.07;
  const grandTotal = totalCost + ft + serviceFee + vat;

  // compare with normal rate (~4.15 baht avg)
  const normalCost = totalUnits * 4.15;
  const saving = normalCost - grandTotal;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-yellow-500 text-white rounded-xl p-2"><Zap className="w-6 h-6" /></div>
          <h2 className="text-xl font-bold text-gray-800">คำนวณค่าไฟฟ้า TOU (Peak/Off-Peak)</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ระดับแรงดัน</label>
            <select
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
            >
              <option value="below22">ต่ำกว่า 22 kV (บ้านพักอาศัย)</option>
              <option value="above22">22-33 kV (กิจการ)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Sun className="inline w-4 h-4 text-orange-500 mr-1" />
                Peak (หน่วย)
              </label>
              <input
                type="number"
                value={peakUnits}
                onChange={(e) => setPeakUnits(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                min={0}
              />
              <p className="text-xs text-gray-500 mt-1">จ-ศ 09:00-22:00</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Moon className="inline w-4 h-4 text-indigo-500 mr-1" />
                Off-Peak (หน่วย)
              </label>
              <input
                type="number"
                value={offPeakUnits}
                onChange={(e) => setOffPeakUnits(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                min={0}
              />
              <p className="text-xs text-gray-500 mt-1">จ-ศ 22:00-09:00</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Clock className="inline w-4 h-4 text-green-500 mr-1" />
                วันหยุด (หน่วย)
              </label>
              <input
                type="number"
                value={holidayUnits}
                onChange={(e) => setHolidayUnits(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                min={0}
              />
              <p className="text-xs text-gray-500 mt-1">ส-อา ตลอดวัน</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow space-y-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-yellow-600" /> ผลการคำนวณ
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">ค่า Peak</p>
            <p className="text-xl font-bold text-orange-600">฿{peakCost.toLocaleString("th-TH", { maximumFractionDigits: 2 })}</p>
            <p className="text-xs text-gray-500">{peakUnits} หน่วย × ฿{r.peak}</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">ค่า Off-Peak</p>
            <p className="text-xl font-bold text-indigo-600">฿{offPeakCost.toLocaleString("th-TH", { maximumFractionDigits: 2 })}</p>
            <p className="text-xs text-gray-500">{offPeakUnits} หน่วย × ฿{r.offPeak}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">ค่าวันหยุด</p>
            <p className="text-xl font-bold text-green-600">฿{holidayCost.toLocaleString("th-TH", { maximumFractionDigits: 2 })}</p>
            <p className="text-xs text-gray-500">{holidayUnits} หน่วย × ฿{r.holiday}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">ค่าบริการ + Ft</p>
            <p className="text-xl font-bold text-gray-700">฿{(serviceFee + ft).toLocaleString("th-TH", { maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">รวมก่อน VAT</span>
            <span className="font-semibold">฿{(totalCost + ft + serviceFee).toLocaleString("th-TH", { maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">VAT 7%</span>
            <span className="font-semibold">฿{vat.toLocaleString("th-TH", { maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span className="text-gray-800">รวมทั้งสิ้น</span>
            <span className="text-yellow-600">฿{grandTotal.toLocaleString("th-TH", { maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        {saving > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-sm text-green-700">ประหยัดกว่าอัตราปกติประมาณ</p>
            <p className="text-2xl font-bold text-green-600">฿{saving.toLocaleString("th-TH", { maximumFractionDigits: 0 })}/เดือน</p>
          </div>
        )}
      </div>

      {/* SEO Article */}
      <article className="prose max-w-none bg-white rounded-2xl border border-gray-200 p-6 shadow">
        <h2>ค่าไฟฟ้า TOU คืออะไร? เลือกใช้ Peak/Off-Peak ประหยัดค่าไฟได้จริงหรือ?</h2>
        <p>
          อัตราค่าไฟฟ้า TOU (Time of Use) คือระบบคิดค่าไฟตามช่วงเวลาการใช้งาน โดยแบ่งเป็น 2 ช่วงหลัก ได้แก่ ช่วง Peak (จันทร์-ศุกร์ 09:00-22:00)
          ซึ่งมีอัตราค่าไฟสูงกว่า และช่วง Off-Peak (จันทร์-ศุกร์ 22:00-09:00 และวันหยุดเสาร์-อาทิตย์ตลอดวัน) ซึ่งมีอัตราค่าไฟต่ำกว่ามาก
          การไฟฟ้านครหลวง (กฟน.) และการไฟฟ้าส่วนภูมิภาค (กฟภ.) ได้เปิดให้ผู้ใช้ไฟฟ้าสมัครเปลี่ยนจากอัตราปกติมาใช้อัตรา TOU ได้
        </p>

        <h3>ใครเหมาะกับอัตรา TOU?</h3>
        <p>
          ผู้ที่เหมาะสมกับอัตรา TOU มากที่สุด คือผู้ที่สามารถเลื่อนการใช้ไฟฟ้าหนักไปช่วง Off-Peak ได้ เช่น เปิดเครื่องซักผ้า เครื่องอบผ้า
          เครื่องปรับอากาศ หรือชาร์จรถยนต์ไฟฟ้า (EV) ในช่วงกลางคืนหลัง 22:00 น. ผู้ที่ติดตั้งแผงโซลาร์เซลล์ก็ได้ประโยชน์เช่นกัน
          เพราะช่วงกลางวันที่แผงผลิตไฟ ตรงกับช่วง Peak ที่ค่าไฟแพง ทำให้ประหยัดได้มากขึ้น
        </p>

        <h3>วิธีคำนวณค่าไฟ TOU</h3>
        <p>
          การคำนวณค่าไฟ TOU ไม่ซับซ้อน เพียงแยกหน่วยไฟฟ้า (kWh) ที่ใช้ในช่วง Peak และ Off-Peak แล้วคูณด้วยอัตราค่าไฟแต่ละช่วง
          สำหรับบ้านพักอาศัยที่ใช้แรงดันต่ำกว่า 22 kV อัตรา Peak จะอยู่ที่ประมาณ 5.80 บาท/หน่วย และ Off-Peak ประมาณ 2.64 บาท/หน่วย
          นอกจากนี้ยังมีค่า Ft (ค่าไฟฟ้าผันแปร) ค่าบริการรายเดือน และ VAT 7% รวมอยู่ในบิลด้วย
        </p>

        <h3>เปรียบเทียบ TOU กับอัตราปกติ</h3>
        <p>
          อัตราปกติคิดค่าไฟแบบก้าวหน้า (Progressive Rate) ยิ่งใช้มากยิ่งแพง โดยเฉลี่ยอยู่ที่ประมาณ 4-5 บาท/หน่วย
          หากคุณสามารถเลื่อนการใช้ไฟ 60-70% ไปช่วง Off-Peak ได้ การเปลี่ยนมาใช้ TOU อาจช่วยประหยัดได้ 15-30%
          แต่หากใช้ไฟช่วง Peak เป็นหลัก ค่าไฟอาจแพงกว่าอัตราปกติ ดังนั้นควรวิเคราะห์พฤติกรรมการใช้ไฟก่อนตัดสินใจ
        </p>

        <h3>ขั้นตอนสมัครอัตรา TOU</h3>
        <p>
          ผู้ใช้ไฟฟ้าสามารถสมัครเปลี่ยนอัตราค่าไฟเป็น TOU ได้ที่สำนักงานการไฟฟ้าในพื้นที่ของคุณ โดยนำบัตรประจำตัวประชาชน
          สำเนาทะเบียนบ้าน และใบแจ้งค่าไฟฟ้าล่าสุดไปยื่นคำร้อง การเปลี่ยนมิเตอร์เป็นแบบ TOU มีค่าใช้จ่ายเริ่มต้นประมาณ 4,000-7,000 บาท
          ขึ้นอยู่กับขนาดมิเตอร์ และจะต้องใช้อัตรา TOU อย่างน้อย 12 เดือนก่อนจะขอเปลี่ยนกลับได้
        </p>

        <h3>เคล็ดลับประหยัดค่าไฟ TOU</h3>
        <p>
          ใช้เครื่องใช้ไฟฟ้าขนาดใหญ่หลัง 22:00 น. ตั้งเวลาเครื่องซักผ้าและเครื่องล้างจาน ชาร์จ EV ช่วงกลางคืน
          ติดตั้งแผงโซลาร์เพื่อลดการใช้ไฟช่วง Peak และหมั่นตรวจสอบบิลค่าไฟเพื่อเปรียบเทียบความคุ้มค่า
          เครื่องคำนวณด้านบนจะช่วยให้คุณประเมินค่าไฟ TOU เบื้องต้นได้ง่ายขึ้น ลองกรอกตัวเลขจริงจากบิลค่าไฟเดือนล่าสุดของคุณ
        </p>
      </article>
    </div>
  );
}

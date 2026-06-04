"use client";
import { useState } from "react";
import { Calculator, Briefcase, FileText, Truck, Info } from "lucide-react";

export default function CustomsBrokerFeeCalculator({ lang }: any) {
  const [cifValue, setCifValue] = useState<number>(100000);
  const [brokerFeeType, setBrokerFeeType] = useState<"percent" | "flat">("flat");
  const [brokerFeeFlat, setBrokerFeeFlat] = useState<number>(3500);
  const [brokerFeePercent, setBrokerFeePercent] = useState<number>(2);
  const [docFee, setDocFee] = useState<number>(500);
  const [inspectionFee, setInspectionFee] = useState<number>(1000);
  const [deliveryFee, setDeliveryFee] = useState<number>(2000);
  const [otherFees, setOtherFees] = useState<number>(0);

  const brokerFee =
    brokerFeeType === "flat"
      ? brokerFeeFlat
      : cifValue * (brokerFeePercent / 100);

  const totalFees = brokerFee + docFee + inspectionFee + deliveryFee + otherFees;
  const feePercentOfCIF = cifValue > 0 ? (totalFees / cifValue) * 100 : 0;

  const fmt = (n: number) =>
    n.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-amber-100 rounded-xl">
            <Briefcase className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">ค่าธรรมเนียม Customs Broker</h2>
            <p className="text-sm text-gray-500">Customs Broker Fee Calculator</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">มูลค่า CIF (บาท)</label>
            <input
              type="number"
              value={cifValue}
              onChange={(e) => setCifValue(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              min={0}
            />
          </div>

          {/* Broker Fee Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ค่าธรรมเนียม Broker</label>
            <div className="flex gap-4 mb-2">
              <button
                onClick={() => setBrokerFeeType("flat")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  brokerFeeType === "flat"
                    ? "bg-amber-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                เหมาจ่าย (บาท)
              </button>
              <button
                onClick={() => setBrokerFeeType("percent")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  brokerFeeType === "percent"
                    ? "bg-amber-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                คิดเป็น % ของ CIF
              </button>
            </div>
            {brokerFeeType === "flat" ? (
              <input
                type="number"
                value={brokerFeeFlat}
                onChange={(e) => setBrokerFeeFlat(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                min={0}
              />
            ) : (
              <input
                type="number"
                value={brokerFeePercent}
                onChange={(e) => setBrokerFeePercent(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                min={0}
                max={100}
                step={0.1}
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FileText className="w-4 h-4 inline mr-1" />ค่าเอกสาร (บาท)
              </label>
              <input
                type="number"
                value={docFee}
                onChange={(e) => setDocFee(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ค่าตรวจสอบสินค้า (บาท)</label>
              <input
                type="number"
                value={inspectionFee}
                onChange={(e) => setInspectionFee(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                min={0}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Truck className="w-4 h-4 inline mr-1" />ค่าขนส่ง/รับสินค้า (บาท)
              </label>
              <input
                type="number"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ค่าใช้จ่ายอื่นๆ (บาท)</label>
              <input
                type="number"
                value={otherFees}
                onChange={(e) => setOtherFees(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 space-y-3">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-600" />ผลลัพธ์
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">ค่า Broker</span>
              <span className="font-medium">{fmt(brokerFee)} บาท</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ค่าเอกสาร</span>
              <span className="font-medium">{fmt(docFee)} บาท</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ค่าตรวจสอบสินค้า</span>
              <span className="font-medium">{fmt(inspectionFee)} บาท</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ค่าขนส่ง/รับสินค้า</span>
              <span className="font-medium">{fmt(deliveryFee)} บาท</span>
            </div>
            {otherFees > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">ค่าใช้จ่ายอื่นๆ</span>
                <span className="font-medium">{fmt(otherFees)} บาท</span>
              </div>
            )}
            <hr className="border-gray-300" />
            <div className="flex justify-between bg-white rounded-lg p-3">
              <span className="text-gray-700 font-semibold">ค่าธรรมเนียมรวม</span>
              <span className="font-bold text-green-600 text-lg">{fmt(totalFees)} บาท</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">คิดเป็น % ของ CIF</span>
              <span className="font-medium text-blue-600">{feePercentOfCIF.toFixed(2)}%</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start gap-2">
          <Info className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
          <p className="text-xs text-yellow-700">
            ค่าธรรมเนียม Customs Broker อาจแตกต่างกันในแต่ละบริษัท ควรเปรียบเทียบราคาจากหลายเจ้า
          </p>
        </div>
      </div>

      <article className="prose max-w-2xl mx-auto mb-8">
        <h2>ค่าธรรมเนียม Customs Broker — ค่าใช้จ่ายที่ผู้นำเข้าต้องรู้</h2>
        <p>
          Customs Broker หรือตัวแทนออกของ คือผู้ที่ได้รับใบอนุญาตจากกรมศุลกากรให้ทำหน้าที่ดำเนินพิธีการศุลกากรแทนผู้นำเข้า
          ตั้งแต่การจัดเตรียมเอกสาร ยื่นใบขนสินค้า ตรวจปล่อยสินค้า จนถึงการรับมอบสินค้าออกจากท่าเรือหรือสนามบิน
          ค่าธรรมเนียม Customs Broker เป็นต้นทุนที่หลีกเลี่ยงไม่ได้สำหรับผู้นำเข้าส่วนใหญ่
        </p>
        <h3>โครงสร้างค่าธรรมเนียม</h3>
        <p>
          ค่าธรรมเนียม Customs Broker มักแบ่งเป็น 2 รูปแบบหลัก ได้แก่ แบบเหมาจ่าย (Flat Fee) ซึ่งเป็นราคาคงที่ต่อใบขน
          โดยทั่วไปอยู่ที่ 2,000-5,000 บาท และแบบคิดเป็นเปอร์เซ็นต์ของมูลค่า CIF ซึ่งมักอยู่ที่ 1-3%
          บางบริษัทอาจคิดแบบเหมาจ่ายแต่กำหนดมูลค่าขั้นต่ำและขั้นสูง นอกจากนี้ยังมีค่าใช้จ่ายเพิ่มเติม เช่น ค่าเอกสาร
          ค่าตรวจสอบสินค้า ค่าขนส่งจากท่าเรือ ซึ่งผู้นำเข้าต้องสอบถามรายละเอียดให้ชัดเจน
        </p>
        <h3>เลือก Customs Broker อย่างไร?</h3>
        <p>
          การเลือก Customs Broker ที่ดีต้องพิจารณาหลายปัจจัย ได้แก่ ประสบการณ์ในสินค้าประเภทที่คุณนำเข้า ใบอนุญาตที่ถูกต้อง
          ความโปร่งใสในเรื่องค่าใช้จ่าย ระบบติดตามสถานะสินค้า และความรวดเร็วในการดำเนินการ ควรขอใบเสนอราคาจากหลายเจ้า
          เปรียบเทียบราคาและบริการก่อนตัดสินใจ อย่ามองแค่ราคาถูกที่สุดเพราะอาจได้บริการที่ไม่ดี
        </p>
        <h3>เครื่องมือนี้ช่วยอะไร?</h3>
        <p>
          เครื่องมือคำนวณค่าธรรมเนียม Customs Broker ช่วยให้ผู้นำเข้าสามารถประเมินค่าใช้จ่ายทั้งหมดที่เกี่ยวข้องกับ
          การจ้าง Customs Broker ได้ล่วงหน้า ทั้งแบบเหมาจ่ายและแบบเปอร์เซ็นต์ รวมถึงค่าใช้จ่ายเพิ่มเติมต่างๆ
          ช่วยให้วางแผนงบประมาณได้อย่างแม่นยำและเปรียบเทียบราคาระหว่างผู้ให้บริการได้สะดวก
        </p>
      </article>
    </div>
  );
}

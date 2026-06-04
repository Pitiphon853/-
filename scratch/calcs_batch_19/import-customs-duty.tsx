"use client";
import { useState } from "react";
import { Calculator, Package, Ship, ShieldCheck, Info } from "lucide-react";

export default function ImportCustomsDutyCalculator({ lang }: any) {
  const [productValue, setProductValue] = useState<number>(100000);
  const [shippingCost, setShippingCost] = useState<number>(5000);
  const [insuranceCost, setInsuranceCost] = useState<number>(1000);
  const [dutyRate, setDutyRate] = useState<number>(10);
  const [vatRate, setVatRate] = useState<number>(7);
  const [exciseTaxRate, setExciseTaxRate] = useState<number>(0);

  const cifValue = productValue + shippingCost + insuranceCost;
  const customsDuty = cifValue * (dutyRate / 100);
  const exciseTax = (cifValue + customsDuty) * (exciseTaxRate / 100);
  const vatBase = cifValue + customsDuty + exciseTax;
  const vat = vatBase * (vatRate / 100);
  const totalTax = customsDuty + exciseTax + vat;
  const totalCost = cifValue + totalTax;

  const fmt = (n: number) =>
    n.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">คำนวณค่าศุลกากรนำเข้าสินค้า</h2>
            <p className="text-sm text-gray-500">Import Customs Duty Calculator</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">มูลค่าสินค้า (บาท)</label>
            <input
              type="number"
              value={productValue}
              onChange={(e) => setProductValue(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              min={0}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Ship className="w-4 h-4 inline mr-1" />ค่าขนส่ง (บาท)
              </label>
              <input
                type="number"
                value={shippingCost}
                onChange={(e) => setShippingCost(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <ShieldCheck className="w-4 h-4 inline mr-1" />ค่าประกันภัย (บาท)
              </label>
              <input
                type="number"
                value={insuranceCost}
                onChange={(e) => setInsuranceCost(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                min={0}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">อัตราอากร (%)</label>
              <input
                type="number"
                value={dutyRate}
                onChange={(e) => setDutyRate(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                min={0}
                max={100}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">VAT (%)</label>
              <input
                type="number"
                value={vatRate}
                onChange={(e) => setVatRate(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                min={0}
                max={100}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ภาษีสรรพสามิต (%)</label>
              <input
                type="number"
                value={exciseTaxRate}
                onChange={(e) => setExciseTaxRate(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                min={0}
                max={100}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 space-y-3">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />ผลลัพธ์
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">มูลค่า CIF</span>
              <span className="font-medium">{fmt(cifValue)} บาท</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">อากรศุลกากร ({dutyRate}%)</span>
              <span className="font-medium text-orange-600">{fmt(customsDuty)} บาท</span>
            </div>
            {exciseTaxRate > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">ภาษีสรรพสามิต ({exciseTaxRate}%)</span>
                <span className="font-medium text-orange-600">{fmt(exciseTax)} บาท</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">VAT ({vatRate}%)</span>
              <span className="font-medium text-orange-600">{fmt(vat)} บาท</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between">
              <span className="text-gray-700 font-semibold">ภาษีรวม</span>
              <span className="font-bold text-red-600">{fmt(totalTax)} บาท</span>
            </div>
            <div className="flex justify-between bg-white rounded-lg p-3">
              <span className="text-gray-700 font-semibold">ต้นทุนรวมทั้งหมด</span>
              <span className="font-bold text-green-600 text-lg">{fmt(totalCost)} บาท</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start gap-2">
          <Info className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
          <p className="text-xs text-yellow-700">
            CIF = มูลค่าสินค้า + ค่าขนส่ง + ค่าประกันภัย ใช้เป็นฐานคำนวณอากรศุลกากร
          </p>
        </div>
      </div>

      <article className="prose max-w-2xl mx-auto mb-8">
        <h2>คำนวณค่าศุลกากรนำเข้าสินค้า — คู่มือฉบับสมบูรณ์</h2>
        <p>
          การนำเข้าสินค้าจากต่างประเทศเข้ามาในราชอาณาจักรไทย ไม่ว่าจะเป็นสินค้าจากจีน ญี่ปุ่น สหรัฐอเมริกา หรือยุโรป
          ผู้นำเข้าจำเป็นต้องเสียค่าศุลกากร (Customs Duty) ให้กับกรมศุลกากร ซึ่งเป็นหน่วยงานรัฐที่ดูแลเรื่องการนำเข้าส่งออก
          ค่าศุลกากรเป็นหนึ่งในต้นทุนหลักที่ผู้ประกอบการต้องคำนวณให้ถูกต้องก่อนสั่งซื้อสินค้า เพื่อไม่ให้เกิดปัญหาต้นทุนบานปลาย
        </p>
        <h3>CIF Value คืออะไร?</h3>
        <p>
          CIF ย่อมาจาก Cost, Insurance and Freight หมายถึงมูลค่ารวมของสินค้าที่ประกอบด้วยราคาสินค้า (Cost)
          ค่าประกันภัย (Insurance) และค่าขนส่ง (Freight) มูลค่า CIF จะถูกใช้เป็นฐานในการคำนวณภาษีอากรทุกประเภท
          ผู้นำเข้าจึงต้องรู้ค่าเหล่านี้อย่างแม่นยำ หากไม่ทราบค่าประกันภัย กรมศุลกากรอาจประเมินให้อัตโนมัติ
        </p>
        <h3>ขั้นตอนการคำนวณภาษีนำเข้า</h3>
        <p>
          ขั้นแรกคือการหามูลค่า CIF จากนั้นคูณด้วยอัตราอากรศุลกากรที่กำหนดตาม HS Code ของสินค้า เช่น สินค้าอิเล็กทรอนิกส์อาจมีอัตรา 0-5%
          ส่วนสินค้าอุปโภคบริโภคอาจสูงถึง 20-60% ขั้นที่สองคือการคำนวณภาษีสรรพสามิต (ถ้ามี) โดยใช้ฐาน CIF + อากร
          และขั้นสุดท้ายคือ VAT 7% ที่คำนวณจากฐานรวมทั้งหมด
        </p>
        <h3>สิ่งที่ต้องรู้เพิ่มเติม</h3>
        <p>
          สินค้านำเข้าทุกรายการต้องมี HS Code ซึ่งเป็นรหัสสินค้าสากลที่ใช้ในการกำหนดอัตราอากร ผู้นำเข้าสามารถค้นหา HS Code
          ได้จากเว็บไซต์กรมศุลกากร หรือสอบถามจาก Customs Broker ที่มีใบอนุญาต นอกจากนี้ยังมีสิทธิพิเศษทางภาษีสำหรับ
          สินค้าจากประเทศที่มี FTA กับไทย เช่น ASEAN, จีน, ออสเตรเลีย ซึ่งอาจลดอัตราอากรลงเหลือ 0%
        </p>
        <h3>ทำไมต้องใช้เครื่องมือนี้?</h3>
        <p>
          เครื่องมือคำนวณค่าศุลกากรนำเข้าสินค้าช่วยให้ผู้ประกอบการและผู้นำเข้าสามารถประเมินต้นทุนทั้งหมดได้ก่อนสั่งซื้อ
          ลดความเสี่ยงจากการตั้งราคาผิดพลาด และช่วยวางแผนการเงินได้อย่างแม่นยำ เหมาะสำหรับทั้งมือใหม่และมืออาชีพ
          ที่ต้องการความรวดเร็วในการคำนวณ ไม่ต้องเปิดตาราง Excel ให้ยุ่งยาก เพียงกรอกข้อมูลก็ได้ผลลัพธ์ทันที
        </p>
      </article>
    </div>
  );
}

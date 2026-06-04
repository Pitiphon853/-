"use client";
import { useState } from "react";
import { Calculator, Search, Tag, Info, ChevronDown } from "lucide-react";

const hsCategories = [
  { code: "01-05", name: "สัตว์มีชีวิตและผลิตภัณฑ์จากสัตว์", rate: 30 },
  { code: "06-14", name: "ผลิตภัณฑ์จากพืช", rate: 30 },
  { code: "15", name: "ไขมันและน้ำมัน", rate: 20 },
  { code: "16-24", name: "อาหารแปรรูป เครื่องดื่ม ยาสูบ", rate: 40 },
  { code: "25-27", name: "แร่ธาตุ", rate: 5 },
  { code: "28-38", name: "เคมีภัณฑ์", rate: 5 },
  { code: "39-40", name: "พลาสติกและยาง", rate: 10 },
  { code: "41-43", name: "หนังดิบ หนังฟอก", rate: 20 },
  { code: "44-46", name: "ไม้และผลิตภัณฑ์จากไม้", rate: 10 },
  { code: "50-63", name: "สิ่งทอและเครื่องนุ่งห่ม", rate: 30 },
  { code: "64-67", name: "รองเท้า หมวก ร่ม", rate: 30 },
  { code: "68-70", name: "หิน เซรามิก แก้ว", rate: 10 },
  { code: "71", name: "อัญมณีและโลหะมีค่า", rate: 5 },
  { code: "72-83", name: "โลหะสามัญ", rate: 10 },
  { code: "84-85", name: "เครื่องจักรและอุปกรณ์ไฟฟ้า", rate: 5 },
  { code: "86-89", name: "ยานพาหนะ", rate: 30 },
  { code: "90-92", name: "เครื่องมือวิทยาศาสตร์ นาฬิกา ดนตรี", rate: 5 },
  { code: "94-96", name: "เฟอร์นิเจอร์ ของเล่น สินค้าเบ็ดเตล็ด", rate: 20 },
  { code: "97", name: "ศิลปกรรม ของสะสม", rate: 0 },
];

export default function HsCodeImportTaxCalculator({ lang }: any) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [customRate, setCustomRate] = useState<number | null>(null);
  const [cifValue, setCifValue] = useState<number>(50000);
  const [keyword, setKeyword] = useState("");

  const category = hsCategories[selectedCategory];
  const effectiveRate = customRate !== null ? customRate : category.rate;
  const duty = cifValue * (effectiveRate / 100);
  const vat = (cifValue + duty) * 0.07;
  const totalTax = duty + vat;
  const totalCost = cifValue + totalTax;

  const filtered = keyword
    ? hsCategories.filter(
        (c) =>
          c.name.includes(keyword) || c.code.includes(keyword)
      )
    : hsCategories;

  const fmt = (n: number) =>
    n.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-100 rounded-xl">
            <Tag className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">HS Code ภาษีนำเข้า</h2>
            <p className="text-sm text-gray-500">HS Code Import Tax Calculator</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Search className="w-4 h-4 inline mr-1" />ค้นหาหมวดสินค้า
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="พิมพ์ชื่อหมวดหรือรหัส HS..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Category List */}
          <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg divide-y">
            {filtered.map((cat, i) => {
              const realIndex = hsCategories.indexOf(cat);
              return (
                <button
                  key={cat.code}
                  onClick={() => {
                    setSelectedCategory(realIndex);
                    setCustomRate(null);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex justify-between items-center hover:bg-purple-50 transition ${
                    selectedCategory === realIndex ? "bg-purple-100 font-semibold" : ""
                  }`}
                >
                  <span>
                    <span className="text-purple-600 font-mono mr-2">{cat.code}</span>
                    {cat.name}
                  </span>
                  <span className="text-gray-500">{cat.rate}%</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">มูลค่า CIF (บาท)</label>
              <input
                type="number"
                value={cifValue}
                onChange={(e) => setCifValue(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ปรับอัตราอากร (%) <span className="text-xs text-gray-400">ถ้าต้องการ</span></label>
              <input
                type="number"
                value={customRate !== null ? customRate : category.rate}
                onChange={(e) => setCustomRate(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                min={0}
                max={100}
              />
            </div>
          </div>
        </div>

        {/* Selected Info */}
        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-800">
            <span className="font-semibold">หมวดที่เลือก:</span> {category.code} — {category.name} | อัตราอากร: {effectiveRate}%
          </p>
        </div>

        {/* Results */}
        <div className="mt-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 space-y-3">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-purple-600" />ผลลัพธ์
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">มูลค่า CIF</span>
              <span className="font-medium">{fmt(cifValue)} บาท</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">อากรศุลกากร ({effectiveRate}%)</span>
              <span className="font-medium text-orange-600">{fmt(duty)} บาท</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">VAT (7%)</span>
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
            อัตราอากรที่แสดงเป็นอัตราเฉลี่ยของหมวด HS ตรวจสอบอัตราจริงได้จากเว็บไซต์กรมศุลกากร
          </p>
        </div>
      </div>

      <article className="prose max-w-2xl mx-auto mb-8">
        <h2>HS Code ภาษีนำเข้า — รหัสสินค้าศุลกากรที่ผู้นำเข้าต้องรู้</h2>
        <p>
          HS Code (Harmonized System Code) หรือพิกัดศุลกากร คือรหัสตัวเลขที่ใช้จำแนกประเภทสินค้าในการค้าระหว่างประเทศ
          ทุกประเทศทั่วโลกใช้ระบบ HS Code เดียวกันใน 6 หลักแรก แต่ละประเทศอาจเพิ่มตัวเลขหลังจากนั้นเพื่อระบุรายละเอียดเฉพาะ
          สำหรับประเทศไทย ใช้ 8 หลักในระบบพิกัดศุลกากร HS Code เป็นกุญแจสำคัญในการกำหนดอัตราอากรและภาษีนำเข้า
        </p>
        <h3>ทำไม HS Code ถึงสำคัญ?</h3>
        <p>
          HS Code มีผลโดยตรงต่ออัตราภาษีที่ต้องจ่าย สินค้าเดียวกันแต่ต่าง HS Code อาจเสียภาษีต่างกันหลายเท่า
          ตัวอย่างเช่น ชิ้นส่วนอิเล็กทรอนิกส์ในหมวด 84-85 อาจเสียอากรเพียง 0-5% แต่สินค้าสำเร็จรูปอย่างเฟอร์นิเจอร์อาจสูงถึง 20%
          และเครื่องนุ่งห่มหรือรองเท้าอาจสูงถึง 30% ดังนั้นการเลือก HS Code ที่ถูกต้องจึงมีความสำคัญอย่างยิ่ง
        </p>
        <h3>วิธีค้นหา HS Code</h3>
        <p>
          ผู้นำเข้าสามารถค้นหา HS Code ได้หลายวิธี ได้แก่ ค้นหาจากเว็บไซต์กรมศุลกากร customs.go.th
          สอบถาม Customs Broker ที่มีใบอนุญาต หรือใช้ฐานข้อมูลออนไลน์ต่างๆ ควรตรวจสอบกับเจ้าหน้าที่ศุลกากรก่อนนำเข้าจริง
          เพื่อป้องกันปัญหาการจัดประเภทผิดพลาดซึ่งอาจทำให้ถูกปรับหรือสินค้าถูกกักไว้
        </p>
        <h3>FTA และสิทธิพิเศษทางภาษี</h3>
        <p>
          ประเทศไทยมีความตกลงการค้าเสรี (FTA) กับหลายประเทศและกลุ่มประเทศ เช่น ASEAN-China FTA, ASEAN-Japan,
          Thai-Australia FTA เป็นต้น สินค้าที่นำเข้าจากประเทศคู่สัญญาอาจได้รับสิทธิลดหรือยกเว้นอากร
          แต่ต้องมีหนังสือรับรองแหล่งกำเนิดสินค้า (Certificate of Origin) ประกอบการขอสิทธิ
          เครื่องมือนี้ช่วยให้คุณเข้าใจโครงสร้างพิกัดศุลกากรเบื้องต้นและประมาณภาษีได้อย่างรวดเร็ว
        </p>
      </article>
    </div>
  );
}

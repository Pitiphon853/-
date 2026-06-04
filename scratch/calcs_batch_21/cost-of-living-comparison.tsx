"use client";
import { useState } from "react";
import { Calculator, Home, ShoppingCart, Car, Utensils, Zap, Droplets, Wifi, GraduationCap, ArrowRightLeft } from "lucide-react";

interface CostItem {
  label: string;
  icon: React.ReactNode;
  bangkok: number;
  province: number;
  userBangkok: string;
  userProvince: string;
}

export default function CostOfLivingComparison({ lang }: any) {
  const [items, setItems] = useState<CostItem[]>([
    { label: "ค่าเช่าที่พัก", icon: <Home className="w-4 h-4" />, bangkok: 12000, province: 5000, userBangkok: "12000", userProvince: "5000" },
    { label: "ค่าอาหาร", icon: <Utensils className="w-4 h-4" />, bangkok: 6000, province: 3500, userBangkok: "6000", userProvince: "3500" },
    { label: "ค่าเดินทาง", icon: <Car className="w-4 h-4" />, bangkok: 3000, province: 1500, userBangkok: "3000", userProvince: "1500" },
    { label: "ค่าสาธารณูปโภค", icon: <Zap className="w-4 h-4" />, bangkok: 2500, province: 1800, userBangkok: "2500", userProvince: "1800" },
    { label: "ค่าน้ำ", icon: <Droplets className="w-4 h-4" />, bangkok: 300, province: 200, userBangkok: "300", userProvince: "200" },
    { label: "ค่าอินเทอร์เน็ต/โทรศัพท์", icon: <Wifi className="w-4 h-4" />, bangkok: 1000, province: 800, userBangkok: "1000", userProvince: "800" },
    { label: "ของใช้ทั่วไป", icon: <ShoppingCart className="w-4 h-4" />, bangkok: 2000, province: 1500, userBangkok: "2000", userProvince: "1500" },
    { label: "การศึกษา/พัฒนาตนเอง", icon: <GraduationCap className="w-4 h-4" />, bangkok: 1500, province: 800, userBangkok: "1500", userProvince: "800" },
  ]);

  const updateItem = (index: number, field: "userBangkok" | "userProvince", value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const getVal = (s: string) => parseFloat(s) || 0;

  const totalBangkok = items.reduce((sum, item) => sum + getVal(item.userBangkok), 0);
  const totalProvince = items.reduce((sum, item) => sum + getVal(item.userProvince), 0);
  const diff = totalBangkok - totalProvince;
  const pctDiff = totalProvince > 0 ? ((diff / totalProvince) * 100).toFixed(1) : "0";
  const annualSaving = diff * 12;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <ArrowRightLeft className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">เปรียบเทียบค่าครองชีพ</h2>
            <p className="text-gray-500 text-sm">กรุงเทพฯ vs ต่างจังหวัด</p>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto_auto] gap-2 mb-4 items-center">
          <div className="font-semibold text-gray-600 text-sm">รายการ</div>
          <div className="font-semibold text-gray-600 text-sm text-center w-28 sm:w-32">กรุงเทพฯ (฿)</div>
          <div className="font-semibold text-gray-600 text-sm text-center w-28 sm:w-32">ต่างจังหวัด (฿)</div>
        </div>

        {items.map((item, idx) => (
          <div key={idx} className="grid grid-cols-[1fr_auto_auto] gap-2 mb-2 items-center">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              {item.icon}
              <span>{item.label}</span>
            </div>
            <input
              type="number"
              value={item.userBangkok}
              onChange={(e) => updateItem(idx, "userBangkok", e.target.value)}
              className="w-28 sm:w-32 px-3 py-2 border border-gray-300 rounded-lg text-right text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="number"
              value={item.userProvince}
              onChange={(e) => updateItem(idx, "userProvince", e.target.value)}
              className="w-28 sm:w-32 px-3 py-2 border border-gray-300 rounded-lg text-right text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>
        ))}

        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
            <div className="font-bold text-gray-800">รวมทั้งหมด/เดือน</div>
            <div className="w-28 sm:w-32 text-right font-bold text-blue-600 text-lg">
              ฿{totalBangkok.toLocaleString()}
            </div>
            <div className="w-28 sm:w-32 text-right font-bold text-green-600 text-lg">
              ฿{totalProvince.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
          <p className="text-sm text-orange-600 mb-1">ส่วนต่างต่อเดือน</p>
          <p className="text-2xl font-bold text-orange-700">฿{Math.abs(diff).toLocaleString()}</p>
          <p className="text-xs text-orange-500 mt-1">
            {diff > 0 ? "กรุงเทพฯ แพงกว่า" : diff < 0 ? "ต่างจังหวัดแพงกว่า" : "เท่ากัน"}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
          <p className="text-sm text-purple-600 mb-1">แพงกว่า (%)</p>
          <p className="text-2xl font-bold text-purple-700">{pctDiff}%</p>
          <p className="text-xs text-purple-500 mt-1">เมื่อเปรียบเทียบกัน</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-5 border border-emerald-200">
          <p className="text-sm text-emerald-600 mb-1">ประหยัดได้ต่อปี</p>
          <p className="text-2xl font-bold text-emerald-700">฿{Math.abs(annualSaving).toLocaleString()}</p>
          <p className="text-xs text-emerald-500 mt-1">
            {annualSaving > 0 ? "ถ้าย้ายไปต่างจังหวัด" : annualSaving < 0 ? "ถ้าอยู่กรุงเทพฯ" : "ไม่ต่างกัน"}
          </p>
        </div>
      </div>

      {/* Bar comparison */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">กราฟเปรียบเทียบรายหมวด</h3>
        {items.map((item, idx) => {
          const maxVal = Math.max(getVal(item.userBangkok), getVal(item.userProvince), 1);
          return (
            <div key={idx} className="mb-3">
              <p className="text-xs text-gray-600 mb-1">{item.label}</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs w-16 text-gray-400">กรุงเทพฯ</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-4">
                    <div
                      className="bg-blue-500 h-4 rounded-full transition-all"
                      style={{ width: `${(getVal(item.userBangkok) / maxVal) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs w-16 text-right text-gray-600">฿{getVal(item.userBangkok).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs w-16 text-gray-400">ต่างจังหวัด</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-4">
                    <div
                      className="bg-green-500 h-4 rounded-full transition-all"
                      style={{ width: `${(getVal(item.userProvince) / maxVal) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs w-16 text-right text-gray-600">฿{getVal(item.userProvince).toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SEO Article */}
      <article className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 prose prose-gray max-w-none">
        <h2 className="text-xl font-bold text-gray-800 mb-4">เปรียบเทียบค่าครองชีพกรุงเทพฯ กับต่างจังหวัด คำนวณให้ชัดก่อนตัดสินใจ</h2>
        <p>
          ค่าครองชีพเป็นปัจจัยสำคัญที่ส่งผลต่อคุณภาพชีวิตของทุกคน โดยเฉพาะในประเทศไทยที่มีความแตกต่างของค่าใช้จ่ายระหว่างกรุงเทพมหานครกับจังหวัดอื่น ๆ อย่างเห็นได้ชัด การเปรียบเทียบค่าครองชีพอย่างละเอียดจะช่วยให้คุณวางแผนการเงินได้ดีขึ้น ไม่ว่าจะเป็นการตัดสินใจย้ายถิ่น การเลือกทำงานแบบ Remote Work หรือการวางแผนเกษียณ
        </p>
        <h3 className="text-lg font-semibold text-gray-700 mt-4">ค่าเช่าที่พัก: ตัวแปรหลักที่ต่างกันมาก</h3>
        <p>
          ค่าเช่าห้องพักหรืออพาร์ตเมนต์ในกรุงเทพฯ เฉลี่ยอยู่ที่ 8,000-15,000 บาทสำหรับห้องขนาดมาตรฐาน ขณะที่ในต่างจังหวัดอาจเริ่มต้นเพียง 2,500-6,000 บาท ส่วนต่างตรงนี้เพียงอย่างเดียวก็สามารถสร้างเงินออมได้หลายหมื่นบาทต่อปี ยิ่งถ้ารวมค่าน้ำ ค่าไฟ และค่าอินเทอร์เน็ตเข้าไปด้วย ก็ยิ่งเห็นความแตกต่างชัดเจน
        </p>
        <h3 className="text-lg font-semibold text-gray-700 mt-4">ค่าอาหารและค่าเดินทาง</h3>
        <p>
          ค่าอาหารในกรุงเทพฯ โดยเฉลี่ยแพงกว่าต่างจังหวัดราว 30-50% ข้าวแกงมื้อละ 50-70 บาท ในต่างจังหวัดอาจเพียง 35-45 บาท ค่าเดินทางก็เช่นกัน แม้กรุงเทพฯ จะมีระบบรถไฟฟ้า แต่ค่าใช้จ่ายรวมยังสูงกว่า เนื่องจากระยะทางในการเดินทางที่ไกลกว่าและเวลาที่ใช้มากกว่า
        </p>
        <h3 className="text-lg font-semibold text-gray-700 mt-4">สิ่งที่ต้องพิจารณาเพิ่มเติม</h3>
        <p>
          อย่างไรก็ตาม กรุงเทพฯ ยังมีข้อดีที่ไม่อาจวัดเป็นตัวเงินได้ง่าย ได้แก่ โอกาสในการทำงานที่มากกว่า สถานพยาบาลชั้นนำ สถานศึกษาคุณภาพ และความบันเทิงที่หลากหลาย ในขณะที่ต่างจังหวัดมีจุดเด่นเรื่องอากาศบริสุทธิ์ พื้นที่กว้างขวาง ความเงียบสงบ และชุมชนที่เข้มแข็ง
        </p>
        <h3 className="text-lg font-semibold text-gray-700 mt-4">ใช้เครื่องมือนี้อย่างไร</h3>
        <p>
          เครื่องมือเปรียบเทียบค่าครองชีพนี้ให้คุณปรับตัวเลขได้ตามค่าใช้จ่ายจริงของคุณ เพื่อเห็นภาพรวมที่ชัดเจนว่าการอยู่ในแต่ละพื้นที่มีค่าใช้จ่ายต่างกันเท่าไร คุณสามารถแก้ไขทุกหมวดหมู่ได้ ทั้งค่าเช่า ค่าอาหาร ค่าเดินทาง สาธารณูปโภค และอื่น ๆ ผลลัพธ์จะแสดงทั้งส่วนต่างรายเดือน เปอร์เซ็นต์ความแตกต่าง และเงินที่สามารถประหยัดได้ต่อปี ช่วยให้คุณตัดสินใจบนข้อมูลจริง ไม่ใช่แค่ความรู้สึก การวางแผนการเงินที่ดีเริ่มต้นจากการรู้ตัวเลขที่แท้จริง เครื่องมือนี้จะเป็นตัวช่วยสำคัญในการวางแผนชีวิตของคุณ
        </p>
      </article>
    </div>
  );
}

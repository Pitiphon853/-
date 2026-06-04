"use client";

import React, { useState } from "react";
import { Truck, Scale, Info, CheckCircle2 } from "lucide-react";

export default function ThaiPostEmsCost({ lang = "th" }: any) {
  const [weight, setWeight] = useState<number>(0);
  const [cost, setCost] = useState<number | null>(null);

  const calculateEms = (w: number) => {
    if (w <= 0) return 0;
    if (w <= 20) return 32;
    if (w <= 100) return 37;
    if (w <= 250) return 42;
    if (w <= 500) return 52;
    if (w <= 1000) return 67;
    if (w <= 1500) return 82;
    if (w <= 2000) return 97;
    if (w <= 2500) return 122;
    if (w <= 3000) return 137;
    if (w <= 3500) return 157;
    if (w <= 4000) return 177;
    if (w <= 4500) return 197;
    if (w <= 5000) return 217;
    if (w <= 5500) return 242;
    if (w <= 6000) return 267;
    if (w <= 6500) return 292;
    if (w <= 7000) return 317;
    if (w <= 7500) return 342;
    if (w <= 8000) return 367;
    if (w <= 8500) return 392;
    if (w <= 9000) return 417;
    if (w <= 9500) return 442;
    if (w <= 10000) return 467;
    if (w <= 11000) return 482;
    if (w <= 12000) return 497;
    if (w <= 13000) return 512;
    if (w <= 14000) return 527;
    if (w <= 15000) return 542;
    if (w <= 16000) return 557;
    if (w <= 17000) return 572;
    if (w <= 18000) return 587;
    if (w <= 19000) return 602;
    if (w <= 20000) return 617;
    return null; // Over 20kg usually requires special logistics
  };

  const handleCalculate = () => {
    setCost(calculateEms(weight));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-red-100 rounded-full">
          <Truck className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          {lang === "en" ? "Thai Post EMS Cost Calculator" : "คำนวณค่าส่งพัสดุ EMS ไปรษณีย์ไทย"}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === "en" ? "Weight (grams)" : "น้ำหนักพัสดุ (กรัม)"}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Scale className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={weight || ""}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-red-500 focus:border-red-500 transition-colors"
                placeholder={lang === "en" ? "e.g., 500" : "เช่น 500"}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {lang === "en" ? "Maximum weight: 20,000g (20kg)" : "น้ำหนักสูงสุดไม่เกิน 20,000 กรัม (20 กิโลกรัม)"}
            </p>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-red-200 flex justify-center items-center space-x-2"
          >
            <span>{lang === "en" ? "Calculate Shipping Cost" : "คำนวณค่าจัดส่ง"}</span>
          </button>
        </div>

        <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <CheckCircle2 className="w-6 h-6 text-green-500 mr-2" />
            {lang === "en" ? "Estimated EMS Cost" : "ค่าจัดส่ง EMS โดยประมาณ"}
          </h2>
          
          {cost !== null ? (
            cost > 0 ? (
              <div className="text-center py-6">
                <span className="text-5xl font-bold text-red-600">{cost}</span>
                <span className="text-xl text-gray-600 ml-2">{lang === "en" ? "THB" : "บาท"}</span>
                <p className="text-gray-500 mt-4 text-sm">
                  {lang === "en" 
                    ? `For package weight up to ${weight} grams.` 
                    : `สำหรับพัสดุน้ำหนักไม่เกิน ${weight} กรัม`}
                </p>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <Info className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                <p>{lang === "en" ? "Please enter a valid weight over 0g. Maximum 20kg." : "กรุณาระบุน้ำหนักให้ถูกต้อง มากกว่า 0 กรัม และไม่เกิน 20kg"}</p>
              </div>
            )
          ) : (
            <div className="text-center py-10 text-gray-400">
              <Truck className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>{lang === "en" ? "Enter weight and calculate to see results" : "ระบุน้ำหนักแล้วกดคำนวณเพื่อดูผลลัพธ์"}</p>
            </div>
          )}
          
          <div className="mt-6 bg-white rounded-lg p-4 text-sm text-gray-600 border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-2">{lang === "en" ? "Note:" : "หมายเหตุ:"}</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>{lang === "en" ? "Prices are based on standard domestic EMS rates." : "ราคาอ้างอิงจากอัตราค่าบริการ EMS ภายในประเทศปกติ"}</li>
              <li>{lang === "en" ? "Actual cost may vary depending on dimensions or additional services." : "ราคาจริงอาจเปลี่ยนแปลงตามขนาดกล่องหรือบริการเสริม"}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <div className="mt-12 prose max-w-none border-t pt-8">
        <h2>ค่าส่งพัสดุ EMS ไปรษณีย์ไทย (Thai Post EMS Cost) คิดยังไง? ปีล่าสุด</h2>
        <p>
          ในการทำธุรกิจขายของออนไลน์หรืออีคอมเมิร์ซ (E-commerce) เรื่องของ "ค่าจัดส่งสินค้า" ถือเป็นต้นทุนสำคัญที่ส่งผลกระทบโดยตรงต่อกำไรและราคาขายของสินค้า หากผู้ประกอบการสามารถคำนวณค่าจัดส่งได้อย่างแม่นยำ จะช่วยให้ตั้งราคาขายได้อย่างเหมาะสม และไม่ขาดทุนค่าส่ง 
          ไปรษณีย์ไทย (Thailand Post) บริการ EMS ถือเป็นทางเลือกยอดนิยม เพราะส่งไว เช็คสถานะได้ และมีความน่าเชื่อถือสูง
        </p>

        <h3>หลักการคำนวณค่าส่ง EMS</h3>
        <p>
          อัตราค่าบริการ EMS ของไปรษณีย์ไทยในประเทศ โดยพื้นฐานจะคิดตาม <strong>"น้ำหนักรวมของพัสดุ" (รวมกล่องและวัสดุกันกระแทก)</strong> เป็นหลัก แต่ถ้ากล่องมีขนาดใหญ่ผิดปกติ อาจมีการคำนวณด้วยปริมาตร (Dimensional Weight) เพิ่มเติมตามเงื่อนไขของสาขา 
          โดยปกติน้ำหนักเริ่มต้นที่ 0 - 20 กรัม จะมีค่าส่งที่ประมาณ 32 บาท และจะเพิ่มขึ้นตามขั้นบันไดของน้ำหนัก
        </p>
        <p>ตัวอย่างเรทราคามาตรฐานเบื้องต้น (อาจมีการปรับปรุงตามโปรโมชั่น):</p>
        <ul>
          <li>ไม่เกิน 20 กรัม = 32 บาท</li>
          <li>21 - 100 กรัม = 37 บาท</li>
          <li>101 - 250 กรัม = 42 บาท</li>
          <li>251 - 500 กรัม = 52 บาท</li>
          <li>501 - 1,000 กรัม (1 กิโลกรัม) = 67 บาท</li>
          <li>น้ำหนักสูงสุดไม่เกิน 20 กิโลกรัม จะมีราคาที่สูงขึ้นตามลำดับ</li>
        </ul>

        <h3>ทำไมแม่ค้าออนไลน์ต้องให้ความสำคัญกับค่าส่ง EMS?</h3>
        <p>
          1. <strong>ควบคุมต้นทุนได้:</strong> การทราบค่าส่งล่วงหน้า ทำให้เราบวกค่าส่งเข้าไปในราคาสินค้าได้พอดี (Free Shipping) หรือเรียกเก็บจากลูกค้าได้ตามจริง โดยไม่เข้าเนื้อตัวเอง<br/>
          2. <strong>ช่วยตัดสินใจโปรโมชั่น:</strong> หากเราทราบว่าส่งสินค้า 3 ชิ้น น้ำหนักไม่เกิน 1 กิโลกรัม ค่าส่งอยู่ที่ 67 บาท เราอาจจัดโปรโมชั่น "ซื้อ 3 ชิ้น ส่งฟรี" เพื่อกระตุ้นยอดขายได้<br/>
          3. <strong>เปรียบเทียบขนส่งอื่น:</strong> ปัจจุบันมีขนส่งเอกชนหลายเจ้า การมีข้อมูลอัตราค่าส่ง EMS ไว้เทียบ จะช่วยให้เลือกขนส่งที่คุ้มค่าที่สุดในแต่ละเรทน้ำหนัก
        </p>

        <h3>วิธีประหยัดค่าขนส่งสำหรับธุรกิจ</h3>
        <p>
          - <strong>ลดน้ำหนักกล่องบรรจุภัณฑ์:</strong> เลือกใช้กล่องหรือซองพลาสติกที่มีน้ำหนักเบา แต่มีความเหนียวทนทาน เพื่อลดน้ำหนักรวมของพัสดุ<br/>
          - <strong>Drop-off / สมัครสมาชิก:</strong> หากมียอดส่งจำนวนมาก ควรสมัครสมาชิกกับขนส่งหรือแพลตฟอร์มจัดการหลังบ้าน เพื่อรับส่วนลดค่าส่งพิเศษ (VIP Rate)<br/>
          - <strong>ใช้เครื่องคำนวณออนไลน์:</strong> ใช้เครื่องมือคำนวณค่าส่ง EMS ของเราเพื่อประเมินราคาก่อนแพ็คของจริง เพื่อความสะดวกรวดเร็ว
        </p>
        <p>
          สุดท้ายนี้ อย่าลืมเผื่อน้ำหนักของกล่องพัสดุ บับเบิ้ลกันกระแทก และเทปกาวไว้ในการคำนวณเสมอ เพราะบ่อยครั้งที่น้ำหนักสินค้าพอดีเกณฑ์ แต่เมื่อแพ็คเสร็จน้ำหนักรวมกลับกระโดดข้ามไปอีกเรทราคา ทำให้ต้องจ่ายค่าส่งเพิ่มโดยไม่ตั้งใจ การใช้ระบบคำนวณค่าส่งพัสดุ EMS ที่แม่นยำจึงเป็นเรื่องจำเป็นสำหรับธุรกิจออนไลน์ทุกคน
        </p>
      </div>
    </div>
  );
}

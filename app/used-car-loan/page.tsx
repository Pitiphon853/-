import { Metadata } from "next";
import { CarLoanCalculator } from "../../components/calcs/FinanceCalcs";

export const metadata: Metadata = {
  title: "คำนวณค่างวดรถมือสอง | เครื่องคิดเลขสินเชื่อรถยนต์",
  description: "คำนวณค่างวดรถมือสอง รถใหม่ พร้อมดอกเบี้ยและ VAT 7% คำนวณง่าย แม่นยำ ช่วยวางแผนก่อนจัดไฟแนนซ์",
  alternates: {
    canonical: '/used-car-loan',
  }
};

export default function UsedCarLoanPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-black text-center mb-6 text-gray-900 dark:text-white">คำนวณค่างวดรถมือสอง (Car Loan)</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          เครื่องมือช่วยคำนวณค่างวดรถยนต์รายเดือน สำหรับรถมือสองและรถใหม่ โดยสามารถเลือกคำนวณรวมภาษีมูลค่าเพิ่ม (VAT 7%) 
          สำหรับรถมือสองได้อย่างแม่นยำ
        </p>
        
        <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-800/30">
          <CarLoanCalculator lang="TH" />
        </div>
        
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400 leading-relaxed space-y-4">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">เกร็ดความรู้: ดอกเบี้ยรถมือสอง</h3>
          <p>
            การซื้อรถมือสอง จะมีข้อแตกต่างจากรถใหม่คือ <strong>การคิดภาษีมูลค่าเพิ่ม (VAT 7%)</strong> 
            เนื่องจากยอดจัดไฟแนนซ์ของรถมือสองนั้น ยังไม่รวม VAT (ต่างจากรถป้ายแดงที่ราคารวม VAT มาจากโรงงานแล้ว) 
            ทำให้เวลาจ่ายค่างวดรถมือสอง จะต้องนำค่างวดสุทธิไปบวก VAT อีก 7% เสมอ
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li><strong>ดอกเบี้ย:</strong> รถมือสองมักจะมีอัตราดอกเบี้ยสูงกว่ารถใหม่ 1-3% ขึ้นอยู่กับปีรถและสภาพ</li>
            <li><strong>การคำนวณแบบ Flat Rate:</strong> สินเชื่อรถยนต์ในไทยคิดดอกเบี้ยแบบคงที่ (Flat Rate) คือเอาเงินต้นคูณดอกเบี้ยรายปี คูณจำนวนปี แล้วนำมารวมกับเงินต้น ก่อนหารเป็นงวด</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

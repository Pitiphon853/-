import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-4 md:px-6 max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
      <Link href="/" className="inline-flex items-center gap-2 text-deep-teal dark:text-soft-mint font-bold hover:underline mb-8">
        <ArrowLeft className="w-5 h-5" /> กลับสู่หน้าหลัก
      </Link>
      
      <div className="glass-card p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/50">
        <h1 className="text-4xl font-black mb-8 text-gray-900 dark:text-white">ข้อกำหนดและเงื่อนไข (Terms of Service)</h1>
        
        <div className="space-y-6 leading-relaxed">
          <p>
            กรุณาอ่านข้อกำหนดและเงื่อนไขการใช้งานเหล่านี้อย่างละเอียดก่อนใช้งานเว็บไซต์ <strong>คำนวณ.com</strong> การเข้าถึงและใช้งานเว็บไซต์นี้หมายความว่าคุณได้ยอมรับข้อกำหนดและเงื่อนไขทั้งหมดที่ระบุไว้ ณ ที่นี้ หากคุณไม่เห็นด้วยกับเงื่อนไขใดๆ กรุณายุติการใช้งานเว็บไซต์ทันที
          </p>

          <div className="p-6 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-xl my-8">
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">ข้อจำกัดความรับผิดชอบ (Disclaimer) - สำคัญมาก</h2>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
              ผลการคำนวณ ข้อมูล และเครื่องมือทั้งหมดบนเว็บไซต์นี้ เป็นเพียง <strong>"การประมาณการเบื้องต้น"</strong> เพื่อใช้เป็นแนวทางและให้ข้อมูลประกอบการตัดสินใจเท่านั้น 
              <br /><br />
              <strong>ไม่สามารถนำผลลัพธ์จากเว็บไซต์นี้ไปใช้เป็นเอกสารอ้างอิงทางกฎหมาย ทางการแพทย์ หรือแทนคำปรึกษาจากผู้เชี่ยวชาญ (เช่น แพทย์ เภสัชกร หรือ นักบัญชี) ได้ในทุกกรณี</strong>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-deep-teal dark:text-soft-mint mt-8">1. ความถูกต้องของข้อมูล (Accuracy of Information)</h2>
          <p>
            แม้ว่าทีมงานจะพยายามอย่างเต็มที่ในการตรวจสอบและพัฒนาสูตรการคำนวณให้ถูกต้องและเป็นไปตามมาตรฐานสากล แต่เรา <strong>ไม่รับประกันความถูกต้องแม่นยำ 100%</strong> ของผลลัพธ์ใดๆ ที่ได้จากเครื่องมือของเรา 
            <br />
            เราจะไม่รับผิดชอบต่อความสูญเสีย ความเสียหาย การบาดเจ็บ หรือค่าใช้จ่ายใดๆ ที่เกิดขึ้น ไม่ว่าทางตรงหรือทางอ้อม จากการนำผลการคำนวณไปใช้งานหรืออ้างอิงผิดประเภท
          </p>

          <h2 className="text-2xl font-bold text-deep-teal dark:text-soft-mint mt-8">2. ลิขสิทธิ์และทรัพย์สินทางปัญญา</h2>
          <p>
            โค้ด เลย์เอาต์ ดีไซน์ และเนื้อหาบางส่วน (ที่ไม่ใช่ข้อมูลสาธารณะ) บนเว็บไซต์นี้ถือเป็นทรัพย์สินทางปัญญาของ คำนวณ.com ห้ามมิให้ทำซ้ำ ดัดแปลง หรือเผยแพร่เพื่อการพาณิชย์โดยไม่ได้รับอนุญาต 
          </p>

          <h2 className="text-2xl font-bold text-deep-teal dark:text-soft-mint mt-8">3. การเปลี่ยนแปลงข้อกำหนด</h2>
          <p>
            เราขอสงวนสิทธิ์ในการแก้ไขหรือเปลี่ยนแปลงข้อกำหนดและเงื่อนไข รวมถึงแก้ไขสูตรคำนวณ หรือยกเลิกบริการเครื่องมือใดๆ บนเว็บไซต์ โดยไม่จำเป็นต้องแจ้งให้ทราบล่วงหน้า
          </p>

          <h2 className="text-2xl font-bold text-deep-teal dark:text-soft-mint mt-8">4. การติดต่อเรา</h2>
          <p>
            หากคุณพบข้อผิดพลาดในสูตรคำนวณ หรือมีคำถามเกี่ยวกับข้อกำหนดการใช้งาน สามารถติดต่อเราได้ที่:
            <br />อีเมล: <a href="mailto:zazadu917@gmail.com" className="text-deep-teal dark:text-soft-mint hover:underline font-bold">zazadu917@gmail.com</a>
          </p>
        </div>
      </div>
    </main>
  );
}

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-4 md:px-6 max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
      <Link href="/" className="inline-flex items-center gap-2 text-deep-teal dark:text-soft-mint font-bold hover:underline mb-8">
        <ArrowLeft className="w-5 h-5" /> กลับสู่หน้าหลัก
      </Link>
      
      <div className="glass-card p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/50">
        <h1 className="text-4xl font-black mb-8 text-gray-900 dark:text-white">นโยบายความเป็นส่วนตัว (Privacy Policy)</h1>
        
        <div className="space-y-6 leading-relaxed">
          <p>
            เว็บไซต์ <strong>คำนวณ.com</strong> ("เรา") เคารพสิทธิความเป็นส่วนตัวของผู้ใช้งาน การแจ้งเตือนนี้มีจุดประสงค์เพื่อให้ผู้ใช้งาน ("คุณ") เข้าใจถึงการเก็บรวบรวม การใช้งาน และการเปิดเผยข้อมูลส่วนบุคคลที่อาจเกิดขึ้นจากการใช้เว็บไซต์ของเรา (เพื่อให้สอดคล้องกับ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล หรือ PDPA)
          </p>

          <h2 className="text-2xl font-bold text-deep-teal dark:text-soft-mint mt-8">1. ข้อมูลที่เราเก็บรวบรวม</h2>
          <p>
            เรา <strong>ไม่มีนโยบายการให้ผู้ใช้งานสมัครสมาชิก</strong> หรือเก็บข้อมูลที่สามารถระบุตัวตนของคุณได้โดยตรง (เช่น ชื่อ-นามสกุล, ที่อยู่, เบอร์โทรศัพท์) 
            ข้อมูลที่คุณกรอกในหน้าต่างคำนวณทั้งหมดจะถูกประมวลผลบนเบราว์เซอร์ (Client-side) หรือถูกจัดเก็บลงใน <strong>Local Storage</strong> ของอุปกรณ์คุณเท่านั้น เพื่อให้คุณสามารถกลับมาใช้งานต่อได้โดยข้อมูลไม่หาย เราไม่ส่งข้อมูลเหล่านี้ไปเก็บไว้ในเซิร์ฟเวอร์ของเรา
          </p>
          <p>
            อย่างไรก็ตาม เราอาจมีการเก็บ <strong>ข้อมูลที่ไม่สามารถระบุตัวบุคคลได้ (Non-Personally Identifiable Information)</strong> โดยอัตโนมัติเมื่อคุณเข้าชมเว็บไซต์ เช่น:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>หมายเลข IP Address</li>
            <li>ข้อมูลประเภทเบราว์เซอร์และอุปกรณ์ที่คุณใช้งาน</li>
            <li>ประวัติการเข้าชมและสถิติการใช้งานบนเว็บไซต์ของเรา</li>
            <li>คุ้กกี้ (Cookies)</li>
          </ul>

          <h2 className="text-2xl font-bold text-deep-teal dark:text-soft-mint mt-8">2. การใช้คุ้กกี้ (Cookies) และบุคคลที่สาม (Third-Party)</h2>
          <p>
            เรามีการใช้งาน <strong>Google AdSense</strong> เพื่อแสดงโฆษณาบนเว็บไซต์ของเรา ซึ่งเป็นผู้ให้บริการจากบุคคลที่สาม Google อาจมีการใช้คุ้กกี้ (รวมถึงคุ้กกี้ DART) เพื่อแสดงโฆษณาที่เกี่ยวข้องกับความสนใจของคุณ โดยพิจารณาจากการเข้าชมเว็บไซต์นี้และเว็บไซต์อื่นๆ บนอินเทอร์เน็ต
          </p>
          <p>
            ข้อมูลที่รวบรวมโดย Google AdSense จะถูกประมวลผลภายใต้นโยบายความเป็นส่วนตัวของ Google เราไม่สามารถเข้าถึงหรือควบคุมคุ้กกี้ที่ใช้งานโดยผู้ลงโฆษณาที่เป็นบุคคลที่สามได้ หากคุณต้องการยกเลิกการใช้คุ้กกี้เพื่อการแสดงโฆษณาที่ปรับให้เหมาะกับคุณ สามารถจัดการได้ที่ <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Google Ad Settings</a>
          </p>

          <h2 className="text-2xl font-bold text-deep-teal dark:text-soft-mint mt-8">3. วัตถุประสงค์ของการเก็บข้อมูล</h2>
          <p>เราเก็บและวิเคราะห์ข้อมูลพฤติกรรมการใช้งานผ่านเครื่องมือสถิติ (Analytics) เพื่อจุดประสงค์ดังนี้:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>เพื่อปรับปรุงและพัฒนาเครื่องมือคำนวณให้ตอบโจทย์ผู้ใช้งานมากขึ้น</li>
            <li>เพื่อนำเสนอโฆษณา (Google AdSense) ให้ตรงกับความสนใจของคุณ ซึ่งเป็นช่องทางสนับสนุนให้เว็บไซต์ของเราเปิดให้บริการได้ฟรี</li>
          </ul>

          <h2 className="text-2xl font-bold text-deep-teal dark:text-soft-mint mt-8">4. การรักษาความปลอดภัยของข้อมูล</h2>
          <p>
            เนื่องจากเราไม่มีการเก็บข้อมูลที่ระบุตัวบุคคลลงบนเซิร์ฟเวอร์ ความเสี่ยงในการหลุดรั่วของข้อมูลส่วนตัวจึงมีน้อยมาก อย่างไรก็ตาม เราใช้มาตรฐานความปลอดภัย HTTPS เพื่อเข้ารหัสการเชื่อมต่อระหว่างอุปกรณ์ของคุณกับเซิร์ฟเวอร์ของเรา
          </p>

          <h2 className="text-2xl font-bold text-deep-teal dark:text-soft-mint mt-8">5. การติดต่อเรา</h2>
          <p>
            หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ สามารถติดต่อเราได้ที่:
            <br />อีเมล: <a href="mailto:zazadu917@gmail.com" className="text-deep-teal dark:text-soft-mint hover:underline font-bold">zazadu917@gmail.com</a>
          </p>
        </div>
      </div>
    </main>
  );
}

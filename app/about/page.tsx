import { ArrowLeft, Users, Shield, Heart } from "lucide-react";
import Link from "next/link";
import { DonateButton } from "../../components/DonateButton";

export default function AboutUs() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-4 md:px-6 max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
      <Link href="/" className="inline-flex items-center gap-2 text-deep-teal dark:text-soft-mint font-bold hover:underline mb-8">
        <ArrowLeft className="w-5 h-5" /> กลับสู่หน้าหลัก
      </Link>
      
      <div className="glass-card p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/50">
        <h1 className="text-4xl font-black mb-8 text-gray-900 dark:text-white">เกี่ยวกับเรา (About Us)</h1>
        
        <div className="space-y-8 leading-relaxed">
          <p className="text-lg">
            ยินดีต้อนรับสู่ <strong>คำนวณ.com</strong> ศูนย์รวมเครื่องมือคำนวณออนไลน์ที่ใช้งานง่ายและแม่นยำที่สุดในประเทศไทย 
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
              <Users className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">ทำเพื่อใคร?</h3>
              <p className="text-sm">เราตั้งใจสร้างเครื่องมือนี้ขึ้นมาเพื่อคนไทยทุกคน ไม่ว่าจะเป็นพ่อค้าแม่ค้าออนไลน์ พนักงานออฟฟิศ หรือแม่บ้าน เพื่อประหยัดเวลาในการคำนวณเรื่องยากๆ ในชีวิตประจำวัน</p>
            </div>
            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/30">
              <Shield className="w-10 h-10 text-green-500 mb-4" />
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">ปลอดภัย 100%</h3>
              <p className="text-sm">เราไม่เก็บข้อมูลส่วนตัวที่สามารถระบุตัวตนได้ การคำนวณทั้งหมดเกิดขึ้นและจบลงบนอุปกรณ์ของคุณเอง มั่นใจได้ในความเป็นส่วนตัว (PDPA Compliant)</p>
            </div>
            <div className="p-6 bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-100 dark:border-pink-800/30">
              <Heart className="w-10 h-10 text-pink-500 mb-4" />
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">ใช้งานฟรีตลอดไป</h3>
              <p className="text-sm">เป้าหมายของเราคือการเป็นสาธารณูปโภคดิจิทัลพื้นฐานที่คุณสามารถพึ่งพาได้ฟรี เว็บไซต์ของเราอยู่รอดได้ด้วยการสนับสนุนโฆษณาเล็กๆ น้อยๆ จากคุณ</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-deep-teal dark:text-soft-mint mt-12">จุดเริ่มต้นของเรา</h2>
          <p>
            ไอเดียของคำนวณ.com เกิดขึ้นจากการที่เราพบว่า ในแต่ละวันเราต้องค้นหาสูตรคำนวณต่างๆ มากมาย ไม่ว่าจะเป็นการคิดค่าคอมมิชชั่น การตั้งราคาสินค้า หรือแม้แต่การดูว่าแอร์บ้านต้องใช้ขนาดกี่ BTU เราจึงได้รวบรวมเครื่องมือทั้งหมดนี้มารวมไว้ในที่เดียว ออกแบบใหม่ให้มีหน้าตาที่สวยงาม ทันสมัย และตอบโจทย์การใช้งานบนมือถือเป็นหลัก
          </p>

          <h2 className="text-2xl font-bold text-deep-teal dark:text-soft-mint mt-8">ร่วมพัฒนาไปกับเรา</h2>
          <p>
            เราเชื่อมั่นในการรับฟังเสียงของผู้ใช้งาน หากคุณมีไอเดียหรืออยากให้เราสร้างเครื่องมือคำนวณประเภทใดเพิ่มเติม อย่าลังเลที่จะติดต่อเราครับ เราพร้อมที่จะพัฒนาเว็บนี้ให้ดีขึ้นในทุกๆ วัน
          </p>

          <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border-2 border-amber-100 dark:border-amber-900/30 text-center my-8">
            <h3 className="text-xl font-bold text-amber-700 dark:text-amber-500 mb-3">สนับสนุนค่าเซิร์ฟเวอร์</h3>
            <p className="text-amber-800/80 dark:text-amber-200/70 mb-6 text-sm">เราตั้งใจทำเว็บนี้ด้วยตัวคนเดียว เพื่อให้ทุกคนได้ใช้ฟรีแบบไม่มีกั๊ก หากเว็บนี้เป็นประโยชน์กับคุณ สามารถช่วยเลี้ยงกาแฟเราสักแก้วเพื่อให้โปรเจกต์นี้เดินหน้าต่อไปได้นะครับ</p>
            <DonateButton lang="TH" type="button" />
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10">
            <p>
              <strong>ทีมงานผู้จัดทำ คำนวณ.com</strong><br />
              อีเมลติดต่อ: <a href="mailto:zazadu917@gmail.com" className="text-deep-teal dark:text-soft-mint hover:underline font-bold">zazadu917@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

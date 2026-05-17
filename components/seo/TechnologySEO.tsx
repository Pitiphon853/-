import React from 'react';

export const TechnologySEO = ({ lang }: { lang: "TH" | "EN" }) => {
  if (lang !== "TH") return null;

  return (
    <article className="prose prose-gray dark:prose-invert max-w-4xl mx-auto mt-16 p-6 md:p-10 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm transition-colors">
      
      {/* 1. บทนำ */}
      <h2 className="text-3xl font-black text-orange-600 dark:text-orange-500 mb-6">1. บทนำ: เจาะลึกโลกไอทีและคริปโต ทำไมต้องคำนวณตัวเลขดิจิทัล?</h2>
      <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
        ในโลกของเทคโนโลยี ข้อมูล (Data) คือขุมทรัพย์ที่มีมูลค่ามหาศาล แต่ข้อมูลเหล่านั้นมักจะมาในรูปแบบของหน่วยที่ซับซ้อน ปัญหาหลัก (Pain Point) ของคนทำงานสายไอที คอนเทนต์ครีเอเตอร์ หรือนักขุดคริปโต 
        คือการคำนวณทรัพยากรผิดพลาด เช่น อัปโหลดวิดีโอที่มี <strong>FPS/Bitrate (Video Bitrate)</strong> สูงเกินไปจนไฟล์ใหญ่เกินขีดจำกัดของแพลตฟอร์ม, การคำนวณ <strong>IP Subnet</strong> ผิดจนระบบเครือข่ายล่ม, 
        หรือแม้กระทั่งการเช่าคลาวด์โดยไม่คำนวณ <strong>Server Cost</strong> ล่วงหน้า ทำให้เจอบิลค่าเซิร์ฟเวอร์ย้อนหลังหลักแสนบาท
      </p>
      <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
        เพื่อแก้ปัญหาเหล่านี้ เว็บไซต์ของเราจึงสร้างเครื่องมือหมวด "เทคโนโลยี" ที่ตอบโจทย์การทำงานในยุคดิจิทัลอย่างครบวงจร ไม่ว่าคุณจะต้องการประเมินความเร็วอินเทอร์เน็ตผ่าน <strong>Bandwidth</strong>, 
        หา <strong>ขนาดรูปภาพ (Image Size)</strong> เพื่อทำเว็บไซต์ให้โหลดเร็ว, คำนวณความจุแบตเตอรี่ <strong>Battery Life</strong> ของอุปกรณ์ IoT หรือแม้แต่นักลงทุนคริปโตที่ต้องการหาค่า <strong>Hash Rate</strong> 
        เพื่อประเมินจุดคุ้มทุนในการทำเหมืองขุด (Mining) เครื่องมือของเราจะทำให้ตัวเลขที่ดูซับซ้อน กลายเป็นผลลัพธ์ที่เข้าใจง่ายและนำไปใช้งานได้จริงทันที
      </p>

      {/* 2. วิธีใช้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">2. วิธีใช้เครื่องมือคำนวณ "เทคโนโลยีและระบบเครือข่าย"</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">เครื่องมือหมวดเทคโนโลยีของเราถูกออกแบบมาสำหรับทั้งมือใหม่และมือโปร โดยแบ่งตามลักษณะการทำงานดังนี้:</p>
      
      <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-orange-700 dark:text-orange-500 mb-3">ช่วงที่ 1: งานเครือข่ายและระบบเซิร์ฟเวอร์ (IP Subnet, Bandwidth, Server Cost)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>ออกแบบระบบ Network:</strong> ให้ใช้เครื่องมือ <strong>IP Subnet</strong> โดยกรอกหมายเลข IP และเลือก CIDR Notation (/24, /16) ระบบจะบอกช่วง IP ที่ใช้งานได้ (Usable Host Range) พร้อม Subnet Mask ทันที</li>
          <li><strong>คำนวณเวลาดาวน์โหลด:</strong> ใช้เครื่องมือ <strong>Bandwidth</strong> โดยกรอกขนาดไฟล์และสปีดอินเทอร์เน็ต เพื่อประเมินเวลาดาวน์โหลด หรือคำนวณทราฟฟิก (Traffic) สำหรับเว็บไซต์</li>
          <li><strong>คุมงบ Cloud Server:</strong> ก่อนเปิดเซิร์ฟเวอร์ ให้ใช้เครื่องมือ <strong>Server Cost</strong> เพื่อประมาณการค่าใช้จ่ายรายเดือนของ AWS, GCP หรือ DigitalOcean โดยอ้างอิงจากชั่วโมงที่เปิดใช้งาน</li>
        </ol>
      </div>

      <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-red-700 dark:text-red-500 mb-3">ช่วงที่ 2: งานมัลติมีเดียและกราฟิก (Video Bitrate, Image Size)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>สตรีมมิ่งและตัดต่อ:</strong> ใช้เครื่องมือ <strong>Video Bitrate</strong> เพื่อคำนวณหาค่าบิตเรตที่เหมาะสมที่สุดกับความละเอียดวิดีโอ (1080p, 4K) และ Framerate (FPS) ป้องกันไม่ให้วิดีโอกระตุกเมื่อสตรีม</li>
          <li><strong>ปรับแต่งรูปภาพ:</strong> ใช้เครื่องมือ <strong>ขนาดรูปภาพ (Image Size)</strong> กรอกความกว้าง ความสูง (Pixels) และ Bit Depth ระบบจะประเมินขนาดไฟล์รูปภาพแบบไม่ถูกบีบอัด (Uncompressed) ให้ทราบทันที</li>
        </ol>
      </div>

      <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-2xl mb-8">
        <h3 className="text-xl font-bold text-rose-700 dark:text-rose-500 mb-3">ช่วงที่ 3: อุปกรณ์ฮาร์ดแวร์และคริปโต (Battery Life, Hash Rate)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>ประเมินอายุแบตเตอรี่:</strong> สำหรับนักสร้างอุปกรณ์ IoT และโดรน ใช้เครื่องมือ <strong>Battery Life</strong> กรอกความจุแบต (mAh) และอัตราการกินไฟ ระบบจะบอกว่าอุปกรณ์จะทำงานได้นานกี่ชั่วโมง</li>
          <li><strong>ขุดเหรียญคริปโต:</strong> ใช้เครื่องมือ <strong>Hash Rate</strong> กรอกพลังขุดของการ์ดจอ (MH/s, TH/s) และค่าไฟ เพื่อประเมินรายได้และระยะเวลาคืนทุนของเหมืองคริปโตเคอร์เรนซี</li>
        </ol>
      </div>

      {/* 3. สูตรคำนวณ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">3. แจกสูตรคำนวณทางเทคโนโลยีและคอมพิวเตอร์ด้วยตัวเอง</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">ความรู้ด้านคณิตศาสตร์คอมพิวเตอร์คือพื้นฐานของ IT นี่คือสูตรสากลที่คุณสามารถใช้อ้างอิงได้ตลอดชีพ:</p>

      <h3 className="text-xl font-bold mt-8 mb-3 text-gray-900 dark:text-white flex items-center gap-2">🌐 สูตรคำนวณเวลาดาวน์โหลด/อัปโหลดไฟล์ (Bandwidth)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">คนส่วนใหญ่มักสับสนระหว่าง Megabyte (MB) กับ Megabit (Mb) ซึ่งอินเทอร์เน็ตที่โฆษณากันมักใช้หน่วย "บิต (bit)" แต่ไฟล์ในเครื่องเราใช้หน่วย "ไบต์ (Byte)":</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-orange-500 text-gray-800 dark:text-gray-200">
        <ul className="list-none space-y-3">
          <li><strong>กฎเหล็ก:</strong> 1 Byte (ไบต์) = 8 bits (บิต)</li>
          <li><strong>สูตรเวลาดาวน์โหลด (วินาที) =</strong> ขนาดไฟล์ (Megabytes) ÷ (ความเร็วอินเทอร์เน็ต (Megabits/s) ÷ 8)</li>
        </ul>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่าง:</strong> คุณต้องการโหลดเกมขนาด 10 GB (10,000 MB) ด้วยความเร็วเน็ตบ้าน 1,000 Mbps<br/><br/>
        ความเร็วจริงที่โหลดได้ต่อวินาที = 1000 ÷ 8 = 125 MB/s<br/>
        เวลาที่ใช้ = 10,000 ÷ 125 = <strong>80 วินาที (ประมาณ 1 นาที 20 วินาที)</strong><br/>
        *(คำแนะนำ: นี่คือความเร็วตามทฤษฎี ในความเป็นจริงอาจใช้เวลานานกว่านี้ 10-20% เนื่องจากคอขวดของเซิร์ฟเวอร์และ Header ของโปรโตคอล)*
      </p>

      <h3 className="text-xl font-bold mt-10 mb-3 text-gray-900 dark:text-white flex items-center gap-2">🎥 สูตรคำนวณขนาดไฟล์วิดีโอจาก Bitrate</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">บิตเรต (Bitrate) คือปริมาณข้อมูลวิดีโอใน 1 วินาที ยิ่งบิตเรตสูง ภาพยิ่งชัด แต่ไฟล์ก็จะใหญ่ตามไปด้วย:</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-red-500 font-mono text-center overflow-x-auto">
        <span className="text-xl font-bold text-gray-900 dark:text-white">ขนาดไฟล์ (MB) = [บิตเรต (Kbps) × ความยาววิดีโอ (วินาที)] ÷ 8,192</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่าง:</strong> อัดวิดีโอ 1080p ความยาว 10 นาที (600 วินาที) โดยตั้งค่า <strong>Video Bitrate</strong> ไว้ที่ 6,000 Kbps<br/><br/>
        ขนาดไฟล์ = (6,000 × 600) ÷ 8,192<br/>
        ขนาดไฟล์ = 3,600,000 ÷ 8,192 = <strong>439.45 MB</strong><br/>
        *(หากคุณต้องการอัปโหลดขึ้น YouTube ค่า Bitrate แนะนำสำหรับ 1080p 60fps คือ 12,000 Kbps หรือประมาณ 12 Mbps)*
      </p>

      <h3 className="text-xl font-bold mt-10 mb-3 text-gray-900 dark:text-white flex items-center gap-2">🔋 สูตรคำนวณอายุการใช้งานแบตเตอรี่ (Battery Life)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">สำหรับอุปกรณ์พกพา การคำนวณเวลาแบตหมดเป็นสิ่งจำเป็นอย่างยิ่ง โดยเฉพาะในวงการโดรน และเครื่องมือถือ:</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-rose-500">
        <ul className="list-none space-y-3 text-gray-800 dark:text-gray-200">
          <li><strong>สูตรหาเวลาทำงาน (ชั่วโมง) =</strong> ความจุแบตเตอรี่ (mAh) ÷ อัตราการกินกระแสไฟ (mA) × 0.7</li>
          <li><em>*คูณ 0.7 (70%) เพื่อเป็นค่า Safety Factor เผื่อความร้อนและการสูญเสียพลังงานในวงจร</em></li>
        </ul>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่าง:</strong> กล้องวงจรปิดไร้สายใช้แบต 10,000 mAh และตัวกล้องกินไฟเฉลี่ย 200 mA<br/><br/>
        เวลาทำงานทฤษฎี = 10,000 ÷ 200 = 50 ชั่วโมง<br/>
        เวลาทำงานจริง (หัก Loss) = 50 × 0.7 = <strong>35 ชั่วโมง</strong><br/>
        *(อุปกรณ์นี้จะเปิดได้ต่อเนื่องประมาณ 1 วันครึ่ง ก่อนที่จะต้องชาร์จไฟใหม่)*
      </p>

      {/* 4. ข้อควรรู้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">4. ข้อควรรู้และคำแนะนำเพิ่มเติม ด้านเทคโนโลยี</h2>
      <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300">
        <li>
          <strong>การแบ่ง IP Subnet คือเกราะป้องกันเครือข่าย:</strong> อย่าใช้ /24 (254 Hosts) พร่ำเพรื่อ หากในแผนกมีคอมพิวเตอร์แค่ 10 เครื่อง ควรซอย <strong>IP Subnet</strong> ให้เล็กลง เช่น /28 เพื่อลด Broadcast Traffic ที่ทำให้เครือข่ายอืด และป้องกันการถูกแฮ็กข้ามแผนก
        </li>
        <li>
          <strong>ขนาดรูปภาพ (Image Size) ส่งผลโดยตรงต่อ SEO:</strong> หน้าเว็บไซต์ที่รูปภาพใหญ่เกิน 200 KB จะโหลดช้า และโดน Google ตัดคะแนน SEO (Core Web Vitals) เสมอ ควรใช้เครื่องมือคำนวณขนาดรูป และแปลงไฟล์เป็นฟอร์แมต WebP เพื่อลดขนาดโดยไม่เสียคุณภาพ
        </li>
        <li>
          <strong>Hash Rate สูงไม่ได้แปลว่ากำไร:</strong> สำหรับนักขุดคริปโต การมี <strong>Hash Rate</strong> ของการ์ดจอสูงๆ แต่กินไฟมหาศาล อาจทำให้ขาดทุนค่าไฟได้ หัวใจสำคัญของการทำเหมืองคือค่า "Efficiency" หรือ MH/s ต่อวัตต์ (W) ยิ่งได้ Hash Rate สูงโดยกินไฟน้อย ยิ่งคืนทุนไว
        </li>
        <li>
          <strong>ระวังค่า Data Transfer ของ Cloud:</strong> การคำนวณ <strong>Server Cost</strong> คนส่วนใหญ่มักคำนวณแค่ค่าเช่า CPU และ RAM แต่ลืมคำนวณค่า แบนด์วิดท์ (Egress Network Traffic) ซึ่งแพลตฟอร์มคลาวด์จะคิดเงินแพงมากเมื่อมีคนโหลดข้อมูลออกจากเซิร์ฟเวอร์ของคุณ
        </li>
      </ul>

      {/* 5. FAQ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">5. คำถามที่พบบ่อย (FAQ เกี่ยวกับคอมพิวเตอร์และระบบเครือข่าย)</h2>
      <div className="space-y-5">
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q1: เน็ตบ้าน 1 Gbps ทำไมเทสต์สปีดผ่าน Wi-Fi แล้วได้แค่ 300 Mbps?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: เป็นเรื่องของเทคโนโลยีคลื่นไร้สายครับ หากคุณใช้มือถือที่รองรับแค่ Wi-Fi 5 (802.11ac) สปีดสูงสุดจริงที่ได้จะอยู่ราวๆ 300-500 Mbps เท่านั้น หากต้องการความเร็วเต็ม 1 Gbps ต้องใช้สายแลน (LAN Cat6) หรืออุปกรณ์ที่รองรับ Wi-Fi 6 (802.11ax) ขึ้นไปครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q2: ทำไมตั้งค่า Video Bitrate สูงสุดๆ ตอนตัดต่อ แต่พออัปขึ้นโซเชียลภาพกลับแตก?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: แพลตฟอร์มโซเชียลมีเดีย (เช่น Facebook, TikTok) จะมีอัลกอริทึมบีบอัดไฟล์ซ้ำอีกรอบครับ หากคุณอัปโหลดไฟล์ที่ <strong>Video Bitrate</strong> สูงเกินกว่าที่แพลตฟอร์มรองรับ ระบบจะบังคับบีบอัดอย่างรุนแรงจนภาพแตก ทางที่ดีควรเรนเดอร์วิดีโอตามค่าที่แต่ละแพลตฟอร์มแนะนำเป๊ะๆ ครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q3: เครื่องคำนวณ Server Cost ระหว่าง EC2 (AWS) กับ DigitalOcean (Droplets) แบบไหนคุ้มกว่า?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: สำหรับผู้เริ่มต้นหรือบริษัทขนาดเล็ก DigitalOcean หรือ Linode จะคุ้มค่าและคำนวณ <strong>Server Cost</strong> ง่ายกว่ามากเพราะเป็นราคาเหมาจ่าย (Flat rate) ส่วน AWS EC2 จะซับซ้อนกว่า มีค่า Network ยิบย่อย แต่มีข้อดีเรื่องระบบ Ecosystem ที่ยืดหยุ่นกว่ามากสำหรับ Enterprise ครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q4: ทำไม IP Subnet Address 192.168.1.0 และ 192.168.1.255 ถึงใช้งานไม่ได้?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: ในระบบ <strong>IP Subnet</strong> (IPv4) หมายเลขแรกของวง (ในที่นี้คือ .0) จะถูกจองไว้เป็น "Network Address" เพื่อระบุตัวตนของวงนั้น และหมายเลขสุดท้าย (.255) ถูกจองไว้เป็น "Broadcast Address" สำหรับส่งข้อมูลกระจายหาทุกเครื่อง ดังนั้น IP ที่คอมพิวเตอร์นำไปใช้ได้จริงจึงเริ่มที่ .1 ถึง .254 เท่านั้นครับ
          </p>
        </div>
      </div>
    </article>
  );
};

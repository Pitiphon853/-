import React from 'react';

export const ConstructionSEO = ({ lang }: { lang: "TH" | "EN" }) => {
  if (lang !== "TH") return null;

  return (
    <article className="prose prose-gray dark:prose-invert max-w-4xl mx-auto mt-16 p-6 md:p-10 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm transition-colors">
      
      {/* 1. บทนำ */}
      <h2 className="text-3xl font-black text-amber-600 dark:text-amber-500 mb-6">1. บทนำ: รีโนเวทบ้านและงานก่อสร้าง ทำไมต้องเป๊ะเรื่องการคำนวณวัสดุ?</h2>
      <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
        การสร้างบ้านหรือรีโนเวทห้องใหม่ เป็นความฝันของใครหลายคน แต่ในความเป็นจริงมันมักจะมาพร้อมกับ "ฝันร้าย" หากคุณขาดการวางแผนที่ดี ปัญหาคลาสสิก (Pain Point) ที่เจ้าของบ้าน 100 ทั้ง 100 ต้องเจอคืออาการ "งบบานปลาย" 
        ซึ่งสาเหตุหลักมาจากการกะปริมาณวัสดุก่อสร้างผิดพลาด เช่น สั่ง <strong>สีทาบ้าน (House Paint)</strong> มาเยอะเกินไปจนเหลือทิ้ง สั่ง <strong>ปูนซีเมนต์ (Cement)</strong> มาไม่พอจนช่างต้องหยุดงานรอของ หรือกะ <strong>พื้นที่หลังคา (Roof Area)</strong> ผิดจนกระเบื้องขาด 
        ปัญหาเหล่านี้ไม่เพียงทำให้คุณเสียเงินฟรีๆ แต่ยังทำให้งานล่าช้าและเกิดข้อพิพาทกับผู้รับเหมาได้ง่ายๆ
      </p>
      <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
        เพื่อป้องกันอาการงบบานปลาย เว็บไซต์ของเราจึงสร้างเครื่องมือคำนวณหมวด "ก่อสร้างและรีโนเวท" ที่จะเปลี่ยนคุณให้เป็นวิศวกรและสถาปนิกส่วนตัว ไม่ว่าคุณจะต้องการคำนวณม้วน <strong>วอลเปเปอร์ (Wallpaper)</strong> 
        หาขนาด <strong>ถังน้ำ (Water Tank)</strong> ที่เหมาะกับคนในบ้าน ประเมิน <strong>ปริมาตรสระว่ายน้ำ (Pool Volume)</strong> หรือคำนวณ <strong>ฉนวนกันความร้อน (Insulation)</strong> เพื่อสู้กับอากาศเมืองไทย 
        ไปจนถึงการสรุป <strong>ค่าใช้จ่ายรีโนเวท (Renovation Cost)</strong> เครื่องมือของเราจะทำให้การประเมินราคากลาง (BOQ) กลายเป็นเรื่องง่ายและแม่นยำในระดับมืออาชีพ
      </p>

      {/* 2. วิธีใช้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">2. วิธีใช้เครื่องมือคำนวณ "ก่อสร้างและต่อเติมบ้าน" อย่างถูกต้อง</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">เพื่อให้ครอบคลุมทุกสเตปของการสร้างบ้าน เราได้แบ่งหมวดหมู่เครื่องมือออกเป็น 3 ส่วนหลัก ให้คุณเลือกใช้ตามหน้างานจริง:</p>
      
      <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-amber-700 dark:text-amber-500 mb-3">ช่วงที่ 1: งานโครงสร้างและภายนอก (ปูนซีเมนต์, พื้นที่หลังคา, ถังน้ำ, สระว่ายน้ำ)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>งานเทพื้นและโครงสร้าง:</strong> ใช้เครื่องมือ <strong>ปูนซีเมนต์</strong> โดยกรอก กว้าง × ยาว × ความหนา ของพื้นที่ที่ต้องการเท ระบบจะบอกจำนวนคิว (ลูกบาศก์เมตร) หรือจำนวนถังปูนที่ต้องใช้ผสม</li>
          <li><strong>งานมุงหลังคา:</strong> ใช้เครื่องมือ <strong>พื้นที่หลังคา</strong> เลือกทรงหลังคา (หมาแหงน, จั่ว, ปั้นหยา) แล้วใส่ความกว้าง/ยาวของตัวบ้าน รวมถึงระยะชายคา ระบบจะคำนวณตารางเมตรที่แท้จริงให้ทันที</li>
          <li><strong>งานระบบสาธารณูปโภค:</strong> ใช้เครื่องมือ <strong>ถังน้ำ (Water Tank)</strong> โดยระบุจำนวนสมาชิกในบ้าน เพื่อหาขนาดลิตรสำรองที่เพียงพอ หรือใช้ <strong>สระว่ายน้ำ</strong> เพื่อคำนวณปริมาตรน้ำสำหรับเติมคลอรีน</li>
        </ol>
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-orange-700 dark:text-orange-500 mb-3">ช่วงที่ 2: งานตกแต่งภายใน (สีทาบ้าน, วอลเปเปอร์, ฉนวนกันความร้อน)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>งานสีและผนัง:</strong> ใช้เครื่องมือ <strong>สีทาบ้าน</strong> โดยใส่ความกว้างและความสูงของผนัง 4 ด้าน (หักลบประตูหน้าต่างด้วย) ระบบจะคำนวณว่าต้องใช้สีรองพื้นและสีทับหน้ากี่แกลลอน</li>
          <li><strong>งานติดวอลเปเปอร์:</strong> หากเลือก <strong>วอลเปเปอร์</strong> เพียงใส่พื้นที่ผนังรวมและขนาดของม้วนวอลเปเปอร์ (ปกติกว้าง 0.53 ม.) ระบบจะคำนวณจำนวนม้วนที่ต้องซื้อ (รวมเผื่อลวดลายต่อกันแล้ว)</li>
          <li><strong>งานฝ้าและกันความร้อน:</strong> ใช้เครื่องมือ <strong>ฉนวนกันความร้อน</strong> เพื่อหาค่า R-Value ที่เหมาะสม ช่วยบล็อกความร้อนจากหลังคา ลดภาระค่าแอร์ในระยะยาว</li>
        </ol>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-2xl mb-8">
        <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-500 mb-3">ช่วงที่ 3: งานประเมินงบประมาณ (ค่าใช้จ่ายรีโนเวท)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>สรุปงบประมาณรวม:</strong> หลังจากได้ตัวเลขปริมาณวัสดุทั้งหมด ให้นำมาใส่ในเครื่องมือ <strong>ค่าใช้จ่ายรีโนเวท (Renovation Cost)</strong></li>
          <li><strong>แยกหมวดหมู่:</strong> แยกกรอกค่าวัสดุและค่าแรง (ปกติช่างมักจะเหมาค่าแรงประมาณ 30-40% ของค่าวัสดุ) เพื่อให้เห็นตัวเลขสุทธิก่อนตัดสินใจเซ็นสัญญาจ้างผู้รับเหมา</li>
        </ol>
      </div>

      {/* 3. สูตรคำนวณ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">3. แจกสูตรคำนวณวัสดุก่อสร้างฉบับนายช่าง (ทำเองได้ไม่ง้อใคร)</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">ความลับของการไม่โดนผู้รับเหมาโกง คือการที่คุณสามารถคำนวณวัสดุเบื้องต้นเป็น นี่คือ 3 สูตรพื้นฐานที่คุณต้องรู้:</p>

      <h3 className="text-xl font-bold mt-8 mb-3 text-gray-900 dark:text-white flex items-center gap-2">🎨 สูตรคำนวณปริมาณสีทาบ้าน (แกลลอน/ถัง)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">สีทาบ้าน 1 แกลลอน (3.785 ลิตร) ปกติจะทาได้พื้นที่ประมาณ 30-35 ตารางเมตร (ต่อการทา 1 รอบ) วิธีคำนวณที่ถูกต้องคือ:</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-orange-500">
        <ul className="list-none space-y-3 text-gray-800 dark:text-gray-200">
          <li><strong>พื้นที่ผนังรวม =</strong> (ความกว้างห้อง × ความสูงห้อง × 2 ด้าน) + (ความยาวห้อง × ความสูงห้อง × 2 ด้าน)</li>
          <li><strong>พื้นที่ต้องทาจริง =</strong> พื้นที่ผนังรวม - (พื้นที่ประตู + พื้นที่หน้าต่าง)</li>
          <li><strong>ปริมาณสีที่ต้องใช้ (แกลลอน) =</strong> (พื้นที่ต้องทาจริง ÷ 30) × จำนวนรอบที่ต้องการทา (ปกติทา 2 รอบ)</li>
        </ul>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่าง:</strong> ห้องนอนกว้าง 4 ม. ยาว 5 ม. สูง 2.8 ม. มีประตู 1 บาน (2 ตร.ม.) หน้าต่าง 1 บาน (2 ตร.ม.)<br/>
        1. พื้นที่ผนังรวม = (4 × 2.8 × 2) + (5 × 2.8 × 2) = 22.4 + 28 = 50.4 ตร.ม.<br/>
        2. พื้นที่ทาจริง = 50.4 - (2 + 2) = 46.4 ตร.ม.<br/>
        3. ถ้าทา 2 รอบ = (46.4 ÷ 30) × 2 = <strong>3.09 แกลลอน</strong> (ควรซื้อแบบถัง 9 ลิตร 1 ถัง และแกลลอนเล็ก 1 แกลลอน)
      </p>

      <h3 className="text-xl font-bold mt-10 mb-3 text-gray-900 dark:text-white flex items-center gap-2">🧱 สูตรคำนวณปูนซีเมนต์สำหรับเทพื้น (คิวบิกเมตร)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">การสั่งรถปูนผสมเสร็จ (Ready Mix) คุณต้องสั่งเป็นหน่วย "คิว" (Cubic Meter) ถ้าสั่งขาดไปแค่คิวเดียว ช่างจะทำงานต่อไม่ได้ทันที:</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-amber-500 font-mono text-center overflow-x-auto">
        <span className="text-xl font-bold text-gray-900 dark:text-white">ปริมาณปูน (คิว) = กว้าง (ม.) × ยาว (ม.) × ความหนา (ม.)</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่าง:</strong> ต้องการเทพื้นลานจอดรถหน้าบ้าน ขนาดกว้าง 4 เมตร ยาว 5 เมตร โดยเทหนา 10 เซนติเมตร (0.1 เมตร)<br/><br/>
        ปริมาณปูน = 4 × 5 × 0.1 = <strong>2 คิว</strong><br/>
        *(คำแนะนำ: เวลาสั่งปูน ควรบวกเผื่อการยุบตัวหรือเทหก อีกประมาณ 5-10% เสมอ เช่น อาจจะสั่งที่ 2.25 คิว หรือ 2.5 คิว เพื่อความชัวร์)*
      </p>

      <h3 className="text-xl font-bold mt-10 mb-3 text-gray-900 dark:text-white flex items-center gap-2">🚰 สูตรหาขนาดถังเก็บน้ำสำรอง (Water Tank)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">การเลือกซื้อแท็งก์น้ำให้พอดีกับคนในบ้าน ต้องคำนวณจากอัตราการใช้น้ำเฉลี่ยต่อคนต่อวัน (ประมาณ 200 ลิตร/คน/วัน):</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-blue-500 font-mono text-center overflow-x-auto">
        <span className="text-xl font-bold text-gray-900 dark:text-white">ขนาดถังน้ำ (ลิตร) = จำนวนสมาชิกในบ้าน × 200 ลิตร × จำนวนวันที่ต้องการสำรองน้ำ</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่าง:</strong> บ้านมีสมาชิก 4 คน และเผื่อน้ำประปาไม่ไหล 2 วัน<br/><br/>
        ขนาดถังน้ำ = 4 × 200 × 2 = <strong>1,600 ลิตร</strong><br/>
        *(คุณควรเลือกซื้อถังเก็บน้ำขนาด 2,000 ลิตร เผื่อไว้สำหรับการรดน้ำต้นไม้หรือล้างรถเพิ่มเติม)*
      </p>

      {/* 4. ข้อควรรู้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">4. ข้อควรรู้และคำแนะนำเพิ่มเติม สำหรับงานก่อสร้าง</h2>
      <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300">
        <li>
          <strong>กฎของการบวกเผื่อ (Wastage):</strong> ไม่ว่าคุณจะคำนวณกระเบื้อง วอลเปเปอร์ หรือสีเป๊ะแค่ไหน ในหน้างานจริงจะมีการ "ตัดเศษทิ้ง" เสมอ กฎเหล็กของงานก่อสร้างคือต้องบวกเผื่อ (Wastage) ประมาณ 10% เพื่อกันพลาด หากเป็นกระเบื้องปูทแยงมุม อาจต้องบวกเผื่อถึง 15%
        </li>
        <li>
          <strong>ความหนาของฉนวนกันความร้อนสำคัญมาก:</strong> การปู <strong>ฉนวนกันความร้อน (Insulation)</strong> บนฝ้าเพดาน ควรเลือกความหนาอย่างน้อย 3 นิ้ว ถึง 6 นิ้ว (R-Value สูงๆ) แม้จะลงทุนสูงในครั้งแรก แต่จะช่วยประหยัดค่าไฟแอร์ไปได้หลักหมื่นบาทในระยะยาว
        </li>
        <li>
          <strong>พื้นที่หลังคา ไม่ใช่พื้นที่บ้าน:</strong> การคำนวณ <strong>พื้นที่หลังคา (Roof Area)</strong> จะมีเรื่องของ "องศาความลาดชัน" (Pitch) เข้ามาเกี่ยวข้อง ยิ่งหลังคามีความชันมาก พื้นที่ตารางเมตรของหลังคาก็จะยิ่งเยอะกว่าพื้นที่พื้นราบของตัวบ้าน จึงต้องใช้เครื่องมือคำนวณที่แม่นยำ
        </li>
        <li>
          <strong>ทำ BOQ เสมอก่อนรีโนเวท:</strong> ไม่ว่าจะเป็นการทำห้องน้ำใหม่หรือต่อเติมครัว ต้องทำ <strong>ค่าใช้จ่ายรีโนเวท (Renovation Cost)</strong> แบบแตกย่อย (BOQ - Bill of Quantities) เสมอ เพื่อป้องกันผู้รับเหมาเบิกเงินเกินงวดงาน
        </li>
      </ul>

      {/* 5. FAQ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">5. คำถามที่พบบ่อย (FAQ เกี่ยวกับวัสดุก่อสร้างและต่อเติมบ้าน)</h2>
      <div className="space-y-5">
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q1: ทำไมคำนวณสีทาบ้านเป๊ะแล้ว แต่หน้างานจริงสีมักจะไม่พอ?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: สาเหตุหลักมาจาก 1) ผนังเดิมเป็นสีเข้มแล้วต้องการทาสีอ่อนทับ ทำให้ต้องทาถึง 3-4 รอบ 2) ผนังปูนใหม่ที่ยังไม่ได้ทาสีรองพื้น จะดูดซึมสีทับหน้าเยอะมาก 3) ช่างผสมน้ำน้อยหรือกลิ้งสีหนาเกินไป ดังนั้นควรเช็คสภาพผนังก่อนคำนวณ <strong>สีทาบ้าน</strong> ทุกครั้งครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q2: ปริมาตรสระว่ายน้ำ (Pool Volume) มีผลอย่างไรกับการบำรุงรักษา?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: <strong>สระว่ายน้ำ</strong> ไม่ใช่แค่ขุดบ่อใส่น้ำครับ การรู้ปริมาตรน้ำที่แน่ชัด (กว้าง × ยาว × ความลึกเฉลี่ย) สำคัญมากต่อการคำนวณปริมาณสารเคมี เช่น คลอรีน เกลือ และโซดาแอช เพื่อปรับสภาพน้ำ หากใส่ผิดสัดส่วน น้ำจะเขียวหรือกัดผิวผู้ใช้งานได้ครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q3: วอลเปเปอร์ 1 ม้วน ติดได้กี่ตารางเมตร?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: โดยมาตรฐาน <strong>วอลเปเปอร์</strong> แบบม้วนหน้าแคบ (กว้าง 0.53 ม. ยาว 10 ม.) จะมีพื้นที่ 5.3 ตารางเมตร แต่ในการติดจริงเราจะหักเศษต่อลายออก ดังนั้น 1 ม้วนจะติดผนังจริงได้ประมาณ 4.5 ตารางเมตรเท่านั้น ห้ามนำ 5.3 ไปหารพื้นที่โดยตรงเด็ดขาดครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q4: ถ้าจะเทพื้นหน้าบ้าน ใช้ปูนถุงผสมเอง หรือ สั่งปูนมิกซ์ (รถปูน) ดีกว่ากัน?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: หากพื้นที่เทเกิน 1-2 คิว (Cubic Meter) แนะนำให้ใช้เครื่องมือ <strong>ปูนซีเมนต์</strong> คำนวณดูครับ ถ้าเกินกว่านี้การสั่งรถปูนผสมเสร็จ (Ready Mix) จะคุ้มค่ากว่ามาก เพราะได้ความแข็งแรง (Strength) ที่สม่ำเสมอ ประหยัดเวลา และประหยัดค่าแรงช่างกว่าการนั่งโม่ปูนเองครับ
          </p>
        </div>
      </div>
    </article>
  );
};

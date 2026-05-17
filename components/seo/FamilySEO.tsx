import React from 'react';

export const FamilySEO = ({ lang }: { lang: "TH" | "EN" }) => {
  if (lang !== "TH") return null;

  return (
    <article className="prose prose-gray dark:prose-invert max-w-4xl mx-auto mt-16 p-6 md:p-10 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm transition-colors">
      
      {/* 1. บทนำ */}
      <h2 className="text-3xl font-black text-pink-600 dark:text-pink-400 mb-6">1. บทนำ: ทำไมเรื่องของครอบครัวและการตั้งครรภ์ จึงต้องมีการคำนวณและวางแผน?</h2>
      <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
        การสร้างครอบครัวและการดูแลลูกน้อยเป็นความท้าทายที่ยิ่งใหญ่ที่สุดในชีวิตของพ่อแม่ทุกคน ปัญหาหลัก (Pain Point) ที่คู่รักหลายคู่พบเจอคือ "ความกังวลและความไม่แน่นอน" 
        ตั้งแต่เรื่องการวางแผนมีบุตร การนับ <strong>วันตกไข่ (Ovulation)</strong> ที่คลาดเคลื่อน ทำให้พลาดโอกาสทองในการตั้งครรภ์ หรือเมื่อตั้งครรภ์แล้วก็เกิดความสับสนเรื่อง <strong>กำหนดคลอด (Pregnancy Due Date)</strong> 
        ไปจนถึงความกังวลว่า <strong>น้ำหนักทารกในครรภ์</strong> หรือ <strong>ส่วนสูงลูก (Child Height)</strong> ในอนาคตจะเติบโตได้ตามเกณฑ์มาตรฐานหรือไม่ นอกเหนือจากเรื่องพัฒนาการแล้ว อีกหนึ่งปัญหาใหญ่ระดับชาติคือเรื่อง "งบประมาณ" 
        คู่รักหลายคู่ไม่ได้คำนวณ <strong>ค่าเลี้ยงลูก (Child Raising Cost)</strong> ไว้ล่วงหน้า ทำให้เกิดปัญหาสภาพคล่องทางการเงินเมื่อลูกคลอดออกมา
      </p>
      <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
        เพื่อขจัดความกังวลและช่วยให้คุณพ่อคุณแม่เตรียมความพร้อมได้อย่างดีที่สุด เว็บไซต์ของเราจึงได้พัฒนาชุดเครื่องมือคำนวณหมวด "ครอบครัว" แบบครบวงจร ที่ขับเคลื่อนด้วยฐานข้อมูลจากองค์การอนามัยโลก (WHO) และกุมารแพทย์ 
        ไม่ว่าคุณจะต้องการทำนาย <strong>กรุ๊ปเลือดลูก (Blood Type)</strong> เช็ค <strong>พัฒนาการเด็ก (Child Milestones)</strong> ตรวจสอบ <strong>ราศีเกิด (Zodiac)</strong> หรือแม้แต่เครื่องมือสำหรับทาสหมาทาสแมวอย่างการเทียบ <strong>อายุสัตว์เลี้ยง (Pet Age)</strong> 
        ระบบของเราจะช่วยไขทุกข้อสงสัย เปลี่ยนความไม่แน่นอนให้กลายเป็นตัวเลขที่คุณสามารถนำไปวางแผนอนาคตของครอบครัวได้อย่างมั่นใจ
      </p>

      {/* 2. วิธีใช้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">2. วิธีใช้เครื่องมือคำนวณ "ครอบครัวและพัฒนาการเด็ก" แบบง่ายๆ</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">เครื่องมือหมวดครอบครัวของเราออกแบบมาให้ใช้งานง่ายและให้ผลลัพธ์ทันที โดยแบ่งการใช้งานออกเป็น 3 ช่วงเวลาสำคัญของครอบครัว ดังนี้:</p>
      
      <div className="bg-pink-50 dark:bg-pink-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-pink-700 dark:text-pink-400 mb-3">ช่วงที่ 1: วางแผนครอบครัวและการตั้งครรภ์ (วันตกไข่, กำหนดคลอด, กรุ๊ปเลือดลูก)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>คำนวณโอกาสตั้งครรภ์:</strong> เลือกเครื่องมือ <strong>วันตกไข่ (Ovulation)</strong> เพียงกรอกวันแรกของประจำเดือนรอบล่าสุด และความยาวรอบเดือนปกติ ระบบจะแสดงไฮไลต์ "ช่วงไข่ตก (Fertile Window)" ที่มีโอกาสตั้งครรภ์สูงที่สุดให้ทันที</li>
          <li><strong>กำหนดอายุครรภ์และวันคลอด:</strong> เมื่อทราบว่าตั้งครรภ์ ให้ใช้เครื่องมือ <strong>กำหนดคลอด</strong> โดยใส่วันแรกของประจำเดือนครั้งสุดท้าย (LMP) ระบบจะคำนวณวันกำหนดคลอดตามหลักสูตรสูติแพทย์ (Naegele's rule) และบอกอายุครรภ์ปัจจุบันของคุณแม่</li>
          <li><strong>สนุกกับการทำนาย:</strong> คุณสามารถใช้เครื่องมือทำนาย <strong>กรุ๊ปเลือดลูก</strong> โดยใส่กรุ๊ปเลือดของคุณพ่อและคุณแม่ เพื่อดูความน่าจะเป็นทั้งหมดของกรุ๊ปเลือดลูกที่กำลังจะเกิดมา</li>
        </ol>
      </div>

      <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-rose-700 dark:text-rose-400 mb-3">ช่วงที่ 2: ติดตามพัฒนาการทารก (น้ำหนักทารกในครรภ์, ส่วนสูงลูก, พัฒนาการเด็ก)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>เช็คการเจริญเติบโตในครรภ์:</strong> เลือกเครื่องมือ <strong>น้ำหนักทารกในครรภ์</strong> และระบุอายุครรภ์เป็นสัปดาห์ เพื่อประเมินน้ำหนักตัวทารกเปรียบเทียบกับเกณฑ์มาตรฐาน ป้องกันภาวะทารกโตช้าในครรภ์ (FGR)</li>
          <li><strong>ทำนายส่วนสูงเมื่อโตเต็มวัย:</strong> ใช้เครื่องมือ <strong>ส่วนสูงลูก (Child Height)</strong> โดยใส่ส่วนสูงของคุณพ่อและคุณแม่ ระบบจะคำนวณค่า Mid-Parental Height เพื่อทำนายส่วนสูงเป้าหมายของลูกเมื่อเป็นผู้ใหญ่</li>
          <li><strong>เช็คลิสต์พัฒนาการ:</strong> เมื่อลูกคลอดออกมา สามารถใช้เครื่องมือ <strong>พัฒนาการเด็ก (Child Milestones)</strong> เพื่อตรวจสอบว่าลูกน้อยวัยนี้ควรคลาน นั่ง ยืน หรือพูดคำแรกได้หรือยัง</li>
        </ol>
      </div>

      <div className="bg-fuchsia-50 dark:bg-fuchsia-900/10 p-6 rounded-2xl mb-8">
        <h3 className="text-xl font-bold text-fuchsia-700 dark:text-fuchsia-400 mb-3">ช่วงที่ 3: วางแผนการเงินและไลฟ์สไตล์ (ค่าเลี้ยงลูก, ราศีเกิด, อายุสัตว์เลี้ยง)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>ประเมินค่าใช้จ่าย:</strong> นี่คือสิ่งที่สำคัญที่สุด ให้ใช้เครื่องมือ <strong>ค่าเลี้ยงลูก</strong> เพื่อประเมินค่าฝากครรภ์, ค่าคลอด, ค่าแพมเพิส, นมผง, และค่าเล่าเรียนในอนาคต เพื่อตั้งเป้าหมายการเก็บเงิน</li>
          <li><strong>เทียบอายุลูกรักสี่ขา:</strong> สำหรับทาสแมวทาสหมา ใช้เครื่องมือ <strong>อายุสัตว์เลี้ยง (Pet Age)</strong> เพื่อเทียบอายุสัตว์เลี้ยงของคุณกับอายุคน จะได้เข้าใจถึงวัยและการดูแลที่เหมาะสม (เช่น อาหารสูตรลูกแมว หรือสูตรแมวสูงวัย)</li>
        </ol>
      </div>

      {/* 3. สูตรคำนวณ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">3. สูตรคำนวณทางการแพทย์และพันธุกรรมด้วยตัวเอง (แจกสูตรแบบละเอียด)</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">หากคุณอยากรู้ว่าเบื้องหลังแอปพลิเคชันของคุณหมอเขาใช้วิธีใดในการคำนวณ เราขอนำเสนอ 3 สูตรทางการแพทย์ยอดฮิต ที่คุณสามารถกดเครื่องคิดเลขคิดตามได้ที่บ้าน:</p>

      <h3 className="text-xl font-bold mt-8 mb-3 text-gray-900 dark:text-white flex items-center gap-2">👶 สูตรคำนวณวันกำหนดคลอด (Naegele's Rule)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">นี่คือสูตรคลาสสิกที่สูตินรีแพทย์ทั่วโลกใช้ในการกำหนดวันคลอด (Estimated Date of Delivery - EDD) โดยอ้างอิงจากรอบเดือน 28 วัน:</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-pink-500 font-mono text-center overflow-x-auto">
        <span className="text-xl font-bold text-gray-900 dark:text-white">กำหนดคลอด = วันแรกของประจำเดือนครั้งสุดท้าย (LMP) + 7 วัน - 3 เดือน + 1 ปี</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่างการคำนวณ:</strong> สมมติประจำเดือนมาวันแรกของรอบสุดท้ายคือวันที่ 10 สิงหาคม 2026 (10/08/2026)<br/><br/>
        1. นำวันที่ 10 บวกเพิ่มไป 7 วัน = วันที่ 17<br/>
        2. นำเดือนสิงหาคม (เดือน 8) ย้อนกลับไป 3 เดือน = เดือนพฤษภาคม (เดือน 5)<br/>
        3. บวกปีเพิ่มอีก 1 ปี = 2027<br/>
        ดังนั้น วันกำหนดคลอดโดยประมาณของคุณแม่คือ <strong>วันที่ 17 พฤษภาคม 2027</strong> นั่นเองครับ
      </p>

      <h3 className="text-xl font-bold mt-10 mb-3 text-gray-900 dark:text-white flex items-center gap-2">📏 สูตรทำนายส่วนสูงลูกเมื่อเป็นผู้ใหญ่ (Target Height)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">ส่วนสูงของเด็กถูกกำหนดด้วยพันธุกรรมถึง 60-80% กุมารแพทย์จึงมีสูตร Mid-Parental Height เพื่อใช้ทำนายส่วนสูงเป้าหมายของลูก (± 7-10 เซนติเมตร ขึ้นอยู่กับโภชนาการและการนอนหลับ):</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-rose-500">
        <ul className="list-none space-y-3 text-gray-800 dark:text-gray-200">
          <li><strong>ทำนายส่วนสูงลูกชาย:</strong> (ส่วนสูงพ่อ + ส่วนสูงแม่ + 13) ÷ 2</li>
          <li><strong>ทำนายส่วนสูงลูกสาว:</strong> (ส่วนสูงพ่อ + ส่วนสูงแม่ - 13) ÷ 2</li>
        </ul>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่างการคำนวณ:</strong> คุณพ่อสูง 175 ซม. และคุณแม่สูง 160 ซม.<br/><br/>
        - ถ้ามีลูกชาย: (175 + 160 + 13) ÷ 2 = 348 ÷ 2 = <strong>174 เซนติเมตร</strong> (บวกลบ 7 ซม.)<br/>
        - ถ้ามีลูกสาว: (175 + 160 - 13) ÷ 2 = 322 ÷ 2 = <strong>161 เซนติเมตร</strong> (บวกลบ 7 ซม.)<br/>
        *(หากลูกดื่มนม ออกกำลังกาย เล่นบาสเกตบอล และนอนหลับเพียงพอ ก็มีโอกาสสูงถึง 181 ซม. สำหรับลูกชายได้เลยครับ!)*
      </p>

      <h3 className="text-xl font-bold mt-10 mb-3 text-gray-900 dark:text-white flex items-center gap-2">🐶 สูตรคำนวณอายุสุนัข/แมวเทียบกับอายุคน (Pet Age Formula)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">หลายคนเคยได้ยินว่า 1 ปีของสุนัขเท่ากับ 7 ปีของคน ซึ่งเป็นความเชื่อที่ "ผิด" ครับ! เพราะสัตว์เลี้ยงจะโตเร็วมากในช่วง 2 ปีแรก โดยสูตรใหม่ที่นักวิทยาศาสตร์ยอมรับมีดังนี้:</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-orange-500 font-mono text-center overflow-x-auto">
        <span className="text-xl font-bold text-gray-900 dark:text-white">อายุคน = 16 × ln(อายุสุนัข/แมว) + 31</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        หรือคิดแบบจำง่ายๆ สำหรับแมวและสุนัขพันธุ์เล็ก:<br/>
        - อายุ 1 ปีแรก เทียบเท่าคนอายุ 15 ปี<br/>
        - อายุ 2 ปี เทียบเท่าคนอายุ 24 ปี<br/>
        - ตั้งแต่ปีที่ 3 เป็นต้นไป ให้นำจำนวนปีที่เกิน 2 ปี ไปคูณด้วย 4 แล้วบวก 24<br/>
        <strong>ตัวอย่าง:</strong> แมวของคุณอายุ 5 ปี (เกิน 2 ปีมา 3 ปี) ดังนั้นอายุคนคือ (3 × 4) + 24 = <strong>36 ปี</strong> (เข้าสู่วัยผู้ใหญ่เต็มตัวแล้ว!)
      </p>

      {/* 4. ข้อควรรู้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">4. ข้อควรรู้และคำแนะนำเพิ่มเติม สำหรับการดูแลครอบครัว</h2>
      <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300">
        <li>
          <strong>ประจำเดือนมาไม่ปกติ ควรใช้แอปช่วยหรือตรวจไข่ตก:</strong> สูตรการนับ <strong>วันตกไข่ (Ovulation)</strong> มักจะอ้างอิงกับผู้หญิงที่มีรอบเดือน 28 วันเป๊ะๆ หากรอบเดือนของคุณสวิง ควรกดใช้เครื่องมือคำนวณของเราโดยใส่วันย้อนหลังเพื่อหาค่าเฉลี่ย หรือใช้ที่ตรวจครรภ์ (LH Test) ตรวจปัสสาวะควบคู่ไปด้วยเพื่อความแม่นยำ 100%
        </li>
        <li>
          <strong>เตรียมเงินสำรองก่อนมีบุตร:</strong> จากผลสำรวจการคำนวณ <strong>ค่าเลี้ยงลูก</strong> ในประเทศไทย การเลี้ยงเด็ก 1 คนตั้งแต่แรกเกิดจนจบปริญญาตรี อาจใช้เงินตั้งแต่ 1.5 ล้าน ไปจนถึง 10 ล้านบาท! คุณควรเริ่มออมเงินและทำประกันสุขภาพให้ลูกตั้งแต่แรกเกิด เพื่อรับมือกับโรคไวรัสเด็ก (เช่น RSV, มือเท้าปาก) ที่อาจทำให้สูญเสียเงินค่ารักษาจำนวนมาก
        </li>
        <li>
          <strong>พัฒนาการเด็กไม่ได้เหมือนกันทุกคน:</strong> เครื่องมือ <strong>พัฒนาการเด็ก (Child Milestones)</strong> เป็นเพียงค่าเฉลี่ยกลางเท่านั้น หากลูกเดินช้ากว่าเกณฑ์ไป 1-2 เดือน อย่าเพิ่งตื่นตระหนก เด็กแต่ละคนมีความพร้อมต่างกัน ให้สังเกตภาพรวม หากพบความผิดปกติหลายด้านพร้อมกันจึงค่อยปรึกษากุมารแพทย์พัฒนาการเด็ก
        </li>
        <li>
          <strong>ความมหัศจรรย์ของกรุ๊ปเลือด:</strong> พ่อกรุ๊ป A แม่กรุ๊ป B มีโอกาสที่ลูกจะเกิดมาเป็น <strong>กรุ๊ปเลือด (Blood Type)</strong> O ได้! (หากพ่อและแม่มีพันธุกรรมแฝงแบบ AO และ BO) ดังนั้นการใช้เครื่องมือทำนายกรุ๊ปเลือดจะช่วยให้คุณเข้าใจหลักพันธุศาสตร์เบื้องต้น และลดข้อกังขาหรือความเข้าใจผิดในครอบครัวได้ครับ
        </li>
      </ul>

      {/* 5. FAQ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">5. คำถามที่พบบ่อย (FAQ เกี่ยวกับครอบครัวและการตั้งครรภ์)</h2>
      <div className="space-y-5">
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-pink-300 dark:hover:border-pink-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q1: นับวันไข่ตกอย่างไรให้มีโอกาสตั้งครรภ์สูงที่สุด (หน้า 7 หลัง 7 คืออะไร?)</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: "หน้า 7 หลัง 7" คือวิธีคุมกำเนิดแบบโบราณที่มีโอกาสพลาดสูงมากครับ! หากคุณอยากตั้งครรภ์ คุณต้องโฟกัสที่ <strong>"วันตกไข่"</strong> ซึ่งปกติจะเกิดขึ้นในวันที่ 14 ก่อนประจำเดือนรอบถัดไปจะมา การมีเพศสัมพันธ์ล่วงหน้า 1-2 วันก่อนไข่ตก จะเพิ่มโอกาสตั้งครรภ์ได้สูงที่สุด เพราะอสุจิสามารถมีชีวิตรอในรังไข่ได้ถึง 3-5 วันครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-pink-300 dark:hover:border-pink-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q2: ทำไมวันคลอดจริงถึงไม่ตรงกับ วันกำหนดคลอด ที่แพทย์คำนวณให้?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: เป็นเรื่องปกติมากครับ! <strong>กำหนดคลอด</strong> ที่คำนวณไว้จะเป็นวันที่อายุครรภ์ครบ 40 สัปดาห์เป๊ะๆ แต่ในความเป็นจริง มีทารกเพียง 4-5% เท่านั้นที่คลอดตรงวันเป๊ะ ทารกส่วนใหญ่ที่มีสุขภาพแข็งแรงดีจะคลอดในช่วงสัปดาห์ที่ 37 ถึง 41 ซึ่งถือเป็นการคลอดครบกำหนดและปลอดภัยครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-pink-300 dark:hover:border-pink-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q3: ถ้าพ่อแม่ตัวเตี้ย ลูกมีโอกาสที่จะตัวสูงได้ไหม?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: มีโอกาสแน่นอนครับ! แม้พันธุกรรมจะมีผลถึง 70% (ตามสูตร <strong>ทำนายส่วนสูงลูก</strong>) แต่อีก 30% ที่เหลือคือเรื่องของ Epigenetics (สิ่งแวดล้อมและโภชนาการ) หากให้ลูกทานโปรตีนและแคลเซียมให้เพียงพอ นอนหลับก่อน 3 ทุ่ม (เพื่อให้ Growth Hormone หลั่งเต็มที่) และกระโดดแทรมโพลีนหรือเล่นกีฬาที่ยืดกระดูก ลูกก็สามารถเอาชนะพันธุกรรมและสูงกว่าพ่อแม่ได้สบายๆ ครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-pink-300 dark:hover:border-pink-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q4: เลี้ยงสัตว์ (หมา/แมว) ร่วมกับเด็กทารกแรกเกิด จะมีอันตรายหรือไม่?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: สามารถเลี้ยงด้วยกันได้และมีประโยชน์ต่อพัฒนาการเด็กด้วยซ้ำครับ! งานวิจัยพบว่าเด็กที่เติบโตมากับสัตว์เลี้ยงมักจะมีภูมิต้านทานโรคภูมิแพ้ที่ดีกว่า มีระดับความเห็นอกเห็นใจผู้อื่นสูง สิ่งสำคัญคือความสะอาด ต้องฉีดวัคซีนสัตว์เลี้ยงให้ครบ ถ่ายพยาธิเป็นประจำ และไม่ปล่อยให้สัตว์เลี้ยงอยู่กับเด็กทารกตามลำพังโดยไม่มีผู้ใหญ่คอยดูแลครับ
          </p>
        </div>
      </div>
    </article>
  );
};

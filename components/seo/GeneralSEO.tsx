import React from 'react';

export const GeneralSEO = ({ lang }: { lang: "TH" | "EN" }) => {
  if (lang !== "TH") return null;

  return (
    <article className="prose prose-gray dark:prose-invert max-w-4xl mx-auto mt-16 p-6 md:p-10 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm transition-colors">
      
      {/* 1. บทนำ */}
      <h2 className="text-3xl font-black text-purple-600 dark:text-purple-400 mb-6">1. บทนำ: ทำไมคณิตศาสตร์เบ็ดเตล็ดทั่วไป จึงมีความสำคัญในชีวิตประจำวัน?</h2>
      <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
        หลายคนมักบ่นว่า "เรียนคณิตศาสตร์ไปทำไม โตมาก็ไม่ได้ใช้" แต่ในความเป็นจริง ตัวเลขและการคำนวณแฝงอยู่ในทุกกิจกรรมของมนุษย์ ปัญหาหลัก (Pain Point) คือเมื่อเราต้องเผชิญหน้ากับโจทย์ง่ายๆ อย่างการหา <strong>ร้อยละและเปอร์เซ็นต์ (Percentage)</strong> เวลามีป้ายลดราคาในห้าง หรือการคำนวณ <strong>เกรดเฉลี่ยสะสม (GPA)</strong> เพื่อยื่นสมัครเรียนต่อ หลายคนกลับจำสูตรไม่ได้และต้องพึ่งพาคนอื่น 
        นอกจากนี้ ในยุคที่เราต้องแข่งกับเวลา การขาดเครื่องมืออย่าง <strong>จับเวลา (Timer)</strong> หรือ <strong>นาฬิกาจับเวลา (Stopwatch)</strong> ที่มีมาตรฐาน ก็อาจทำให้เราทำข้อสอบไม่ทัน หรือพลาดจังหวะสำคัญในการทำกิจกรรมไปอย่างน่าเสียดาย
      </p>
      <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
        เว็บไซต์คำนวณ.com ได้ตระหนักถึงความสำคัญของ "เครื่องมือสามัญประจำเครื่อง" จึงได้สร้างหมวดหมู่ "ทั่วไปและเบ็ดเตล็ด" ขึ้นมา เพื่อรวบรวมเครื่องมือสารพัดประโยชน์ที่คุณสามารถเรียกใช้ได้ตลอดเวลา ไม่ว่าจะเป็นการหาข้อสรุปในกลุ่มเพื่อนด้วยการ <strong>สุ่มตัวเลข (Random Number)</strong> หรือ <strong>ทอยลูกเต๋า (Dice Roll)</strong> 
        รวมถึงการติดต่อสื่อสารแบบไร้พรมแดนด้วย <strong>นาฬิกาโลก (World Clock)</strong> เพื่อเช็คเวลาในประเทศต่างๆ ทุกเครื่องมือถูกออกแบบมาให้ใช้งานผ่านเว็บเบราว์เซอร์ได้ทันทีโดยไม่ต้องโหลดแอปเพิ่ม ช่วยให้ชีวิตประจำวันของคุณลื่นไหลและไร้รอยต่อ
      </p>

      {/* 2. วิธีใช้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">2. วิธีใช้เครื่องมือคำนวณ "ทั่วไป (General)" ที่ทุกคนต้องมีติดตัว</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">เครื่องมือหมวดทั่วไปของเราครอบคลุมตั้งแต่คณิตศาสตร์ การเรียน ไปจนถึงการบริหารเวลา โดยแบ่งออกเป็น 3 หมวดการใช้งาน:</p>
      
      <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-3">ช่วงที่ 1: คณิตศาสตร์ในชีวิตจริง (Percentage, GPA)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>คำนวณส่วนลดและสัดส่วน:</strong> ใช้เครื่องมือ <strong>เปอร์เซ็นต์ (Percentage)</strong> สามารถเลือกคำนวณได้หลายแบบ เช่น "A เป็นกี่เปอร์เซ็นต์ของ B", "ลดราคา X% จากราคาเต็มเหลือเท่าไหร่" หมดปัญหาการยืนงงหน้าป้าย Sale ในห้างสรรพสินค้า</li>
          <li><strong>เช็คเกรดเรียนต่อ:</strong> นักเรียนนักศึกษา สามารถใช้เครื่องมือ <strong>เกรดเฉลี่ย (GPA)</strong> โดยกรอกหน่วยกิต (Credit) และเกรดที่ได้ของแต่ละวิชา ระบบจะคำนวณเกรดเฉลี่ยรวมให้ทันที ช่วยประเมินว่าเทอมหน้าต้องทำเกรดเท่าไหร่ถึงจะไม่โดนไทร์ (Retire)</li>
        </ol>
      </div>

      <div className="bg-fuchsia-50 dark:bg-fuchsia-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-fuchsia-700 dark:text-fuchsia-400 mb-3">ช่วงที่ 2: เครื่องมือสุ่มและตัดสินใจ (Random Number, Dice)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>หาผู้โชคดี:</strong> เวลาทำกิจกรรมจับฉลากหรือจับรางวัล ให้ใช้เครื่องมือ <strong>สุ่มตัวเลข (Random Number)</strong> เพียงตั้งค่าช่วงตัวเลข ต่ำสุด-สูงสุด ระบบจะสุ่มตัวเลขที่ไม่ซ้ำกันออกมาอย่างโปร่งใส</li>
          <li><strong>แก้ปัญหาคิดไม่ออก:</strong> เลิกเถียงกันว่าเที่ยงนี้กินอะไรดี ใช้ <strong>ทอยลูกเต๋า (Dice Roll)</strong> เพื่อเป็นตัวตัดสินชี้ขาด หรือใช้เพื่อเล่นบอร์ดเกม (Board Game) ในวงเพื่อนโดยไม่ต้องพกลูกเต๋าจริง</li>
        </ol>
      </div>

      <div className="bg-pink-50 dark:bg-pink-900/10 p-6 rounded-2xl mb-8">
        <h3 className="text-xl font-bold text-pink-700 dark:text-pink-400 mb-3">ช่วงที่ 3: การจัดการเวลา (Timer, Stopwatch, World Clock)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>อ่านหนังสือและทำงาน:</strong> ใช้เทคนิค Pomodoro ด้วยเครื่องมือ <strong>นับเวลาถอยหลัง (Timer)</strong> ตั้งค่าไว้ที่ 25 นาที และพัก 5 นาที เพื่อเพิ่มประสิทธิภาพการโฟกัสให้สูงสุด</li>
          <li><strong>จับเวลาการแข่งขัน:</strong> ใช้ <strong>นาฬิกาจับเวลา (Stopwatch)</strong> ที่มาพร้อมฟังก์ชันจับเวลาเป็นรอบ (Lap) เหมาะสำหรับโค้ชหรือผู้ที่ต้องการฝึกวิ่งจับเวลา</li>
          <li><strong>นัดประชุมต่างประเทศ:</strong> ใช้ <strong>นาฬิกาโลก (World Clock)</strong> เทียบเวลาไทยกับนิวยอร์กหรือลอนดอน เพื่อป้องกันการอีเมลหรือโทรไปหาลูกค้าในเวลาตี 3 ของบ้านเขา</li>
        </ol>
      </div>

      {/* 3. สูตรคำนวณ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">3. แจกสูตรคำนวณคณิตศาสตร์เบื้องต้น (เปอร์เซ็นต์และเกรดเฉลี่ย)</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">ความรู้ติดตัว 2 สูตรนี้ จะทำให้คุณกลายเป็นที่พึ่งของเพื่อนๆ ในยามคับขัน ไม่ว่าจะตอนช็อปปิ้งหรือตอนสอบไฟนอล:</p>

      <h3 className="text-xl font-bold mt-8 mb-3 text-gray-900 dark:text-white flex items-center gap-2">💯 สูตรคิดร้อยละและเปอร์เซ็นต์ส่วนลด</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">การหาเปอร์เซ็นต์คือการเทียบสัดส่วนกับจำนวนเต็ม 100 เสมอ กฎจำง่ายๆ ในการกดเครื่องคิดเลขคือ "ส่วนด้วย 100":</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-purple-500 font-mono text-center overflow-x-auto">
        <span className="text-xl font-bold text-gray-900 dark:text-white">ราคาหลังหักส่วนลด = ราคาเต็ม - (ราคาเต็ม × เปอร์เซ็นต์ส่วนลด ÷ 100)</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่าง:</strong> ป้ายติดราคากระเป๋า 3,500 บาท ลดราคา (Sale) 20% คุณต้องจ่ายเงินกี่บาท?<br/><br/>
        หาจำนวนเงินที่ลด = (3,500 × 20) ÷ 100 = 700 บาท<br/>
        ราคาที่ต้องจ่าย = 3,500 - 700 = <strong>2,800 บาท</strong><br/><br/>
        *(สูตรลัดบนเครื่องคิดเลขมือถือ: กด 3,500 - 20% แล้วกดเครื่องหมาย = จะได้คำตอบ 2,800 ทันที!)*
      </p>

      <h3 className="text-xl font-bold mt-10 mb-3 text-gray-900 dark:text-white flex items-center gap-2">🎓 สูตรคำนวณเกรดเฉลี่ยสะสม (GPA / Grade Point Average)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">นักศึกษาหลายคนพลาดเกียรตินิยมเพราะวิชาหน่วยกิตเยอะได้เกรดน้อย การคำนวณ GPA ไม่ใช่การเอาเกรดมาบวกกันแล้วหารจำนวนวิชา แต่ต้องคูณ "น้ำหนักหน่วยกิต" ด้วย:</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-pink-500 font-mono text-center overflow-x-auto">
        <span className="text-xl font-bold text-gray-900 dark:text-white">เกรดเฉลี่ย (GPA) = ผลรวมของ (หน่วยกิต × เกรดที่ได้) ÷ ผลรวมหน่วยกิตทั้งหมด</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่าง:</strong> เทอมนี้คุณลงเรียน 3 วิชา<br/>
        วิชาคณิตศาสตร์ (3 หน่วยกิต) ได้เกรด A (4.0)<br/>
        วิชาภาษาอังกฤษ (2 หน่วยกิต) ได้เกรด B (3.0)<br/>
        วิชาพละศึกษา (1 หน่วยกิต) ได้เกรด C (2.0)<br/><br/>
        ผลรวม (หน่วยกิต × เกรด) = (3×4.0) + (2×3.0) + (1×2.0) = 12 + 6 + 2 = 20<br/>
        ผลรวมหน่วยกิตทั้งหมด = 3 + 2 + 1 = 6 หน่วยกิต<br/>
        เกรดเฉลี่ย GPA = 20 ÷ 6 = <strong>3.33</strong>
      </p>

      {/* 4. ข้อควรรู้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">4. ข้อควรรู้และคำแนะนำเพิ่มเติม สำหรับการใช้เครื่องมือทั่วไป</h2>
      <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300">
        <li>
          <strong>การสุ่มตัวเลขแบบ Pseudo-random:</strong> เครื่องมือ <strong>สุ่มตัวเลข (Random Number)</strong> บนคอมพิวเตอร์ ทำงานโดยอิงจากอัลกอริทึมและค่าเวลาปัจจุบันของระบบ ซึ่งแม้จะไม่ใช่การสุ่มแบบแท้จริง (True Random) ระดับควอนตัม แต่ก็มีความยุติธรรมและโปร่งใส 100% เพียงพอสำหรับใช้จับรางวัลใหญ่ๆ ได้อย่างมั่นใจ
        </li>
        <li>
          <strong>ใช้ Timer เพิ่มประสิทธิภาพการทำงาน:</strong> หากคุณมีสมาธิสั้น แนะนำให้ใช้ <strong>นับเวลาถอยหลัง (Timer)</strong> ร่วมกับเทคนิค Timeboxing คือการซอยงานใหญ่ให้เล็กลง และจำกัดเวลาทำแค่ 25 นาที การมีตัวเลขเวลานับถอยหลังจะช่วยสร้างแรงกดดันบวก (Eustress) ทำให้สมองไม่กล้าวอกแวกไปเล่นโซเชียลมีเดีย
        </li>
        <li>
          <strong>ระวังตัวเลขหลอกตา (เปอร์เซ็นต์ซ้อนเปอร์เซ็นต์):</strong> หากป้ายโฆษณาเขียนว่า "ลดราคา 50% + On Top อีก 10%" นั่นไม่ได้แปลว่าลด 60% นะครับ! มันหมายถึงลด 50% ก่อน แล้วเอา "ราคาที่เหลือ" มาลดต่ออีก 10% (รวมแล้วเท่ากับลด 55% ของราคาป้ายเท่านั้น) ดังนั้นควรใช้เครื่องมือ <strong>เปอร์เซ็นต์</strong> ตรวจสอบความถูกต้องเสมอ
        </li>
      </ul>

      {/* 5. FAQ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">5. คำถามที่พบบ่อย (FAQ เกี่ยวกับตัวเลขและเวลา)</h2>
      <div className="space-y-5">
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q1: เวลาโลก (World Clock) ทำไมบางประเทศถึงเวลาเปลี่ยนไปมาในแต่ละฤดู?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: นั่นคือระบบ Daylight Saving Time (DST) หรือเวลาออมแสงครับ ประเทศเมืองหนาวจะมีการปรับนาฬิกาให้เร็วขึ้น 1 ชั่วโมงในช่วงฤดูร้อน เพื่อให้มีแสงสว่างในตอนเย็นมากขึ้น และจะปรับกลับในฤดูหนาว ดังนั้นการนัดหมายควรเช็คเครื่องมือทุกครั้งเพื่อไม่ให้พลาดครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q2: การหา GPAX กับ GPA ต่างกันอย่างไร?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: GPA คือเกรดเฉลี่ยของ "เทอมเดียว" ส่วน GPAX (Grade Point Average, Cumulative) คือเกรดเฉลี่ยสะสม "ทุกเทอม" ตั้งแต่ปี 1 จนถึงปัจจุบัน ซึ่งมักใช้เป็นเกณฑ์ในการจบการศึกษาและพิจารณาให้เกียรตินิยมครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q3: เครื่องคิดเลขเปอร์เซ็นต์ สามารถคำนวณ "มาร์กจิ้น (Margin)" ของแม่ค้าได้ไหม?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: ใช้งานแทนกันไม่ได้ครับ! เปอร์เซ็นต์ทั่วไปคือการเทียบส่วนจาก 100 แต่ Margin ของแม่ค้าคือการคำนวณหาราคาขายจากต้นทุน (ราคาขาย = ต้นทุน / (1 - %Margin)) หากต้องการตั้งราคาขาย แนะนำให้ใช้เครื่องมือในหมวด "ธุรกิจ/แม่ค้า" จะถูกต้องกว่าครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q4: ทอยลูกเต๋า (Dice) 2 ลูก พร้อมกัน โอกาสที่จะออกเลขอะไรสูงที่สุด?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: ตามหลักความน่าจะเป็น (Probability) โอกาสที่ผลรวมของเต๋า 2 ลูก จะออกมาเป็น "เลข 7" สูงที่สุดครับ (โอกาส 16.67%) เพราะมีรูปแบบการรวมกันได้มากที่สุดคือ (1+6, 2+5, 3+4, 4+3, 5+2, 6+1) ในขณะที่เลข 2 และ 12 มีโอกาสออกน้อยที่สุด (โอกาสเพียง 2.78%) ครับ
          </p>
        </div>
      </div>
    </article>
  );
};

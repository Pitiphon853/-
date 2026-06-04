import React, { useState } from 'react';
import { Box, Home, Trash2, Smile, AlertTriangle } from 'lucide-react';

export default function MinimalismScore({ lang = 'TH' }: any) {
  const isTH = lang === 'TH';

  const [unusedPercent, setUnusedPercent] = useState<number>(30);
  const [unnecessaryPurchases, setUnnecessaryPurchases] = useState<number>(3);
  const [monthsSinceDeclutter, setMonthsSinceDeclutter] = useState<number>(6);
  const [stressLevel, setStressLevel] = useState<number>(5);

  const calculateScore = () => {
    // Score logic: 0 = Minimalist, 100 = Extremely Cluttered
    let score = 0;
    
    // Q1: Unused items (max 40 points)
    score += unusedPercent * 0.4;
    
    // Q2: Unnecessary purchases per month (max 20 points)
    score += Math.min(unnecessaryPurchases * 2, 20);
    
    // Q3: Months since last declutter (max 20 points)
    score += Math.min(monthsSinceDeclutter * 1.5, 20);
    
    // Q4: Stress level 1-10 (max 20 points)
    score += stressLevel * 2;

    const finalScore = Math.round(score);

    let levelTH = "";
    let levelEN = "";
    let descTH = "";
    let descEN = "";
    let color = "text-blue-600";
    let bg = "bg-blue-100";
    let Icon = Home;

    if (finalScore <= 20) {
      levelTH = "มินิมอลตัวจริง (Extreme Minimalist)";
      levelEN = "Extreme Minimalist";
      descTH = "คุณมีของน้อยมากและควบคุมการซื้อได้อย่างสมบูรณ์แบบ พื้นที่ของคุณโล่งโปร่งสบาย";
      descEN = "You own very few items and have excellent control over your purchases.";
      color = "text-emerald-600";
      bg = "bg-emerald-100";
      Icon = Smile;
    } else if (finalScore <= 40) {
      levelTH = "ผู้เลือกใช้ชีวิตอย่างตั้งใจ (Moderate Minimalist)";
      levelEN = "Intentional Living";
      descTH = "คุณมีสิ่งของตามความจำเป็น จัดการพื้นที่ได้ดีเยี่ยม และคิดก่อนซื้อเสมอ";
      descEN = "You keep what you need, manage your space well, and buy intentionally.";
      color = "text-green-600";
      bg = "bg-green-100";
      Icon = Home;
    } else if (finalScore <= 60) {
      levelTH = "ระดับทั่วไป (Average)";
      levelEN = "Average / Normal";
      descTH = "บ้านคุณมีของสะสมบ้างตามปกติ อาจมีบางมุมที่รกแต่ยังจัดการได้ แนะนำให้เคลียร์ของบ้าง";
      descEN = "You have a normal amount of stuff. A bit cluttered but manageable.";
      color = "text-yellow-600";
      bg = "bg-yellow-100";
      Icon = Box;
    } else if (finalScore <= 80) {
      levelTH = "ค่อนข้างรก (Cluttered)";
      levelEN = "Cluttered";
      descTH = "ของเริ่มล้นพื้นที่และทำให้คุณรู้สึกเครียด ถึงเวลาจัดบ้านครั้งใหญ่แล้ว!";
      descEN = "Things are getting out of hand and causing stress. Time to declutter!";
      color = "text-orange-600";
      bg = "bg-orange-100";
      Icon = Trash2;
    } else {
      levelTH = "เข้าขั้นวิกฤต (Overwhelmed / Hoarding)";
      levelEN = "Overwhelmed / Hoarding";
      descTH = "ของเยอะเกินไปจนส่งผลเสียต่อการใช้ชีวิตและสุขภาพจิต ต้องรีบจัดการด่วน!";
      descEN = "Your belongings are negatively impacting your life. Urgent decluttering needed.";
      color = "text-red-600";
      bg = "bg-red-100";
      Icon = AlertTriangle;
    }

    return { finalScore, levelTH, levelEN, descTH, descEN, color, bg, Icon };
  };

  const result = calculateScore();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Box className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isTH ? "แบบประเมินระดับความมินิมอล (Minimalism Score)" : "Minimalism & Clutter Score"}
            </h1>
            <p className="text-gray-500 mt-1">
              {isTH ? "ประเมินความรกของบ้านและพฤติกรรมการบริโภคของคุณ" : "Assess your home's clutter level and consumption habits."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "เปอร์เซ็นต์ของในบ้านที่คุณไม่ได้ใช้เลยในรอบ 1 ปี (%)" : "Percentage of items in your home unused in the last year (%)"}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={unusedPercent}
                  onChange={(e) => setUnusedPercent(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-bold text-gray-700 w-12">{unusedPercent}%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "จำนวนสิ่งของที่ไม่จำเป็นที่คุณซื้อต่อเดือน (ชิ้น)" : "Number of unnecessary purchases per month"}
              </label>
              <input
                type="number"
                min="0"
                value={unnecessaryPurchases}
                onChange={(e) => setUnnecessaryPurchases(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "คุณจัดบ้าน/ทิ้งของครั้งล่าสุดเมื่อกี่เดือนที่แล้ว?" : "Months since your last major decluttering?"}
              </label>
              <input
                type="number"
                min="0"
                value={monthsSinceDeclutter}
                onChange={(e) => setMonthsSinceDeclutter(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "ระดับความเครียด/ความหงุดหงิดเวลาเห็นสภาพบ้าน (1 = ชิลมาก, 10 = เครียดสุดๆ)" : "Stress level caused by your home's physical clutter (1-10)"}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={stressLevel}
                  onChange={(e) => setStressLevel(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-bold text-gray-700 w-8">{stressLevel}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex-grow flex flex-col items-center justify-center text-center">
              <h2 className="text-lg font-medium text-gray-600 mb-2">
                {isTH ? "คะแนนความรกของคุณ (Clutter Score)" : "Your Clutter Score"}
              </h2>
              
              <div className="text-6xl font-black text-gray-900 mb-4">
                {result.finalScore}<span className="text-2xl text-gray-400 font-medium">/100</span>
              </div>
              <div className="text-sm text-gray-400 mb-6">
                {isTH ? "(0 = มินิมอลที่สุด, 100 = รกขั้นวิกฤต)" : "(0 = Pure Minimalist, 100 = Hoarder)"}
              </div>

              <div className={`p-4 rounded-xl flex flex-col items-center gap-3 w-full border ${result.bg} border-opacity-50`}>
                <result.Icon className={`w-10 h-10 ${result.color}`} />
                <div className={`text-xl font-bold ${result.color}`}>
                  {isTH ? result.levelTH : result.levelEN}
                </div>
                <p className={`text-sm ${result.color} opacity-80`}>
                  {isTH ? result.descTH : result.descEN}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="prose prose-indigo max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2>มินิมอล (Minimalism) ไม่ใช่แค่เทรนด์ แต่คือศิลปะแห่งการตัดทิ้ง</h2>
          <p>
            เรามักถูกปลูกฝังให้เชื่อว่า "ยิ่งมีเยอะ ยิ่งดี" แต่ในความเป็นจริง การมีสิ่งของมากเกินความจำเป็นกลับสร้างภาระมหาศาล ทั้งพื้นที่จัดเก็บ เวลาที่ใช้ในการทำความสะอาด และที่สำคัญที่สุดคือ "ความเหนื่อยล้าทางจิตใจ" เครื่องมือคำนวณ Minimalism Score นี้ไม่ได้สร้างขึ้นมาเพื่อตัดสินคุณ แต่เพื่อให้คุณได้ประเมินสภาพแวดล้อมรอบตัว ว่ามันกำลังรับใช้คุณ หรือคุณกำลังตกเป็นทาสของมันอยู่
          </p>

          <h3>ทำไมความรก (Clutter) ถึงทำร้ายเรา?</h3>
          <p>
            งานวิจัยหลายชิ้นชี้ให้เห็นว่า สภาพแวดล้อมทางกายภาพที่รกและเต็มไปด้วยสิ่งของ มีความสัมพันธ์โดยตรงกับระดับความเครียด (Cortisol) ในร่างกาย เมื่อตาเรามองเห็นของระเกะระกะ สมองจะรับรู้ว่ามี "งานที่ยังทำไม่เสร็จ" อยู่ตลอดเวลา ส่งผลให้เราโฟกัสกับงานปัจจุบันได้แย่ลง หงุดหงิดง่ายขึ้น และรู้สึกไม่สามารถพักผ่อนได้อย่างแท้จริงแม้จะอยู่บ้านของตัวเองก็ตาม
          </p>

          <h3>แนวทางการจัดบ้านตามวิถีมินิมอลแบบเริ่มได้ทันที</h3>
          <ol>
            <li><strong>กฎ 90/90 (The 90/90 Rule):</strong> ให้หยิบของขึ้นมา 1 ชิ้น แล้วถามตัวเองว่า "เราได้ใช้ของชิ้นนี้ใน 90 วันที่ผ่านมาหรือไม่?" ถ้าคำตอบคือไม่ ให้ถามต่อว่า "เราจะใช้มันในอีก 90 วันข้างหน้าหรือไม่?" ถ้าคำตอบคือไม่อีก ของชิ้นนั้นสมควรถูกบริจาคหรือทิ้ง</li>
            <li><strong>One In, One Out (ของเข้า 1 ต้องออก 1):</strong> กฎเหล็กในการป้องกันไม่ให้ของรกขึ้นกว่าเดิม หากคุณซื้อเสื้อใหม่ 1 ตัว คุณต้องบริจาคหรือทิ้งเสื้อเก่า 1 ตัวเสมอ วิธีนี้จะบังคับให้คุณคิดให้รอบคอบก่อนซื้อของชิ้นใหม่</li>
            <li><strong>เริ่มทีละลิ้นชัก (Start Small):</strong> อย่าตั้งเป้าหมายว่าจะจัดบ้านทั้งหลังในวันเดียว เพราะคุณจะเหนื่อยและถอดใจ ให้เริ่มจากพื้นที่เล็กๆ เช่น ลิ้นชักโต๊ะทำงาน หรือชั้นวางรองเท้า ความสำเร็จเล็กๆ จะเป็นแรงผลักดันให้คุณทำพื้นที่ต่อไป</li>
            <li><strong>เก็บเฉพาะของที่ Spark Joy (วิธีของ Marie Kondo):</strong> ของบางชิ้นแม้จะไม่ได้ใช้งานบ่อย แต่ถ้าจับแล้วยังรู้สึกใจฟู มีความสุข ก็ให้เก็บไว้ แต่ถ้าชิ้นไหนเห็นแล้วรู้สึกผิดเฉยๆ หรือเฉยชา ให้กล่าวขอบคุณแล้วปล่อยมันไป</li>
          </ol>

          <h3>ประโยชน์ที่คุณจะได้จากการมีของน้อยลง</h3>
          <ul>
            <li><strong>ประหยัดเงิน:</strong> เมื่อคุณหยุดซื้อของที่ไม่จำเป็น คุณจะมีเงินเหลือไปลงทุนหรือซื้อประสบการณ์ที่มีค่า (เช่น ท่องเที่ยว, เรียนรู้) มากขึ้น</li>
            <li><strong>ประหยัดเวลา:</strong> ใช้เวลาหาของน้อยลง ทำความสะอาดบ้านเสร็จเร็วขึ้น</li>
            <li><strong>จิตใจสงบ:</strong> บ้านจะกลายเป็นสถานที่พักผ่อนอย่างแท้จริง ไม่ใช่โกดังเก็บของที่สร้างความเครียด</li>
          </ul>

          <h3>สรุป</h3>
          <p>
            ความมินิมอลไม่ได้หมายถึงการต้องทิ้งของทุกอย่างจนบ้านว่างเปล่า หรือการห้ามซื้อของเด็ดขาด แต่มันคือ <strong>"การใช้ชีวิตอย่างตั้งใจ" (Intentionality)</strong> การเลือกเก็บเฉพาะสิ่งที่ให้คุณค่ากับชีวิต และกล้าที่จะปล่อยสิ่งที่เป็นเพียงภาระออกไป ลองนำคะแนนที่ได้จากแบบประเมินนี้ไปเป็นจุดเริ่มต้นในการเปลี่ยนแปลงพื้นที่ของคุณดูสิ แล้วคุณจะพบว่า การมีน้อยลง กลับทำให้คุณได้ชีวิตคืนมามากขึ้น
          </p>
        </article>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { MailCheck, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function EmailDeliverabilityScoreCalculator({ lang }: any) {
  const [bounceRate, setBounceRate] = useState<number>(2.5);
  const [spamRate, setSpamRate] = useState<number>(0.1);
  const [hasSpf, setHasSpf] = useState<boolean>(true);
  const [hasDkim, setHasDkim] = useState<boolean>(true);
  const [hasDmarc, setHasDmarc] = useState<boolean>(false);

  // Score Calculation
  let score = 100;

  // Deduct for missing auth (up to 30 points)
  if (!hasSpf) score -= 10;
  if (!hasDkim) score -= 10;
  if (!hasDmarc) score -= 10;

  // Deduct for bounce rate (industry standard < 2%)
  if (bounceRate > 5) score -= 30;
  else if (bounceRate > 2) score -= (bounceRate - 2) * 5; 

  // Deduct for spam rate (industry standard < 0.1%)
  if (spamRate > 0.3) score -= 40;
  else if (spamRate > 0.1) score -= (spamRate - 0.1) * 100; 

  score = Math.max(0, Math.min(100, Math.round(score)));

  let status = '';
  let statusColor = '';
  if (score >= 90) {
    status = lang === 'TH' ? 'ดีเยี่ยม (Excellent)' : 'Excellent';
    statusColor = 'text-green-500';
  } else if (score >= 70) {
    status = lang === 'TH' ? 'พอใช้ (Fair)' : 'Fair';
    statusColor = 'text-yellow-500';
  } else {
    status = lang === 'TH' ? 'วิกฤต (Critical)' : 'Critical / Poor';
    statusColor = 'text-red-500';
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {lang === 'TH' ? 'เครื่องมือคำนวณคะแนนการส่งอีเมล (Deliverability Score)' : 'Email Deliverability Score Calculator'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'TH' ? 'ประเมินโอกาสที่อีเมลจะรอดพ้นโฟลเดอร์สแปมและเข้าถึงกล่องจดหมายหลักของผู้รับ' : 'Evaluate the chances of your emails reaching the inbox instead of the spam folder.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
              {lang === 'TH' ? '1. การตั้งค่าความปลอดภัยโดเมน' : '1. Domain Authentication'}
            </h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasSpf}
                  onChange={(e) => setHasSpf(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {lang === 'TH' ? 'มีการตั้งค่า SPF Record' : 'SPF Record is Setup'}
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasDkim}
                  onChange={(e) => setHasDkim(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {lang === 'TH' ? 'มีการตั้งค่า DKIM Record' : 'DKIM Record is Setup'}
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasDmarc}
                  onChange={(e) => setHasDmarc(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {lang === 'TH' ? 'มีการตั้งค่า DMARC Policy' : 'DMARC Policy is Setup'}
                </span>
              </label>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              {lang === 'TH' ? '2. สถิติการส่งอีเมลแคมเปญล่าสุด' : '2. Recent Campaign Stats'}
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'TH' ? 'อัตราอีเมลตีกลับ (Bounce Rate %)' : 'Bounce Rate (%)'}
              </label>
              <input
                type="number"
                step="0.1"
                value={bounceRate}
                onChange={(e) => setBounceRate(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'TH' ? 'มาตรฐานไม่ควรเกิน 2%' : 'Should ideally be < 2%'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'TH' ? 'อัตราคนกดแจ้งสแปม (Spam Complaint Rate %)' : 'Spam Complaint Rate (%)'}
              </label>
              <input
                type="number"
                step="0.01"
                value={spamRate}
                onChange={(e) => setSpamRate(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'TH' ? 'มาตรฐานไม่ควรเกิน 0.1%' : 'Should strictly be < 0.1%'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border-2 border-gray-100 dark:border-gray-700 text-center flex-grow flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              {lang === 'TH' ? 'คะแนนความน่าเชื่อถือ' : 'Sender Reputation Score'}
            </h3>
            
            <div className="relative inline-flex items-center justify-center mb-6">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-200 dark:text-gray-700" />
                <circle
                  cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent"
                  strokeDasharray="440"
                  strokeDashoffset={440 - (440 * score) / 100}
                  className={`${statusColor} transition-all duration-1000 ease-out`}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">{score}</span>
                <span className="text-sm text-gray-500">/ 100</span>
              </div>
            </div>

            <p className={`text-xl font-bold ${statusColor} flex items-center gap-2`}>
              {score >= 90 ? <CheckCircle className="w-6 h-6" /> : (score >= 70 ? <AlertTriangle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />)}
              {status}
            </p>

            <div className="mt-8 text-left w-full space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>{lang === 'TH' ? 'คำแนะนำ:' : 'Recommendation:'}</strong>
              </p>
              {!hasSpf || !hasDkim || !hasDmarc ? (
                <p className="text-sm text-red-500 flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  {lang === 'TH' 
                    ? 'ตั้งค่า DNS Records (SPF, DKIM, DMARC) ให้ครบถ้วนเพื่อยืนยันตัวตน' 
                    : 'Configure missing DNS records (SPF, DKIM, DMARC) to authenticate your domain.'}
                </p>
              ) : null}
              {bounceRate > 2 && (
                <p className="text-sm text-yellow-600 dark:text-yellow-500 flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  {lang === 'TH' 
                    ? 'ทำความสะอาดรายชื่ออีเมล (List Cleaning) เพื่อลด Bounce Rate' 
                    : 'Clean your email list to reduce Bounce Rate.'}
                </p>
              )}
              {spamRate > 0.1 && (
                <p className="text-sm text-red-500 flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  {lang === 'TH' 
                    ? 'อัตราสแปมสูงเกินไป! ระวังโดเมนติดแบล็คลิสต์ (Blacklist)' 
                    : 'High spam rate! Warning: Risk of domain blacklisting.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose dark:prose-invert max-w-none">
        <h2>เครื่องมือคำนวณ Email Deliverability Score คืออะไร?</h2>
        <p>Email Deliverability หรือความสามารถในการส่งมอบอีเมลให้ไปถึงกล่องจดหมายเข้า (Inbox) ของผู้รับ คือหัวใจสำคัญที่สุดในการทำ Email Marketing เครื่องมือคำนวณคะแนนนี้ ถูกออกแบบมาเพื่อจำลองและประเมินว่า "ชื่อเสียงของผู้ส่ง (Sender Reputation)" ของคุณอยู่ในระดับใด เพราะต่อให้คุณจะเขียนอีเมลได้สวยงามหรือมีเนื้อหาดีแค่ไหน หากระบบอีเมลปลายทาง (เช่น Gmail, Outlook, Yahoo) มองว่าคุณคือสแปมเมอร์ อีเมลของคุณก็จะตกลงไปอยู่ในโฟลเดอร์ Junk/Spam ทันที ซึ่งหมายถึงศูนย์โอกาสในการสร้างยอดขาย</p>

        <h3>ปัจจัยชี้ชะตาการเข้า Inbox</h3>
        <p>การประเมินคะแนน Deliverability Score จำเป็นต้องอาศัยตัวชี้วัดทั้งในเชิงเทคนิค (Technical Setup) และในเชิงคุณภาพของรายชื่ออีเมล (List Quality):</p>
        <ul>
          <li><strong>SPF (Sender Policy Framework):</strong> เป็นการประกาศให้โลกรู้ว่า Server ใดหรือ IP ใดบ้างที่ได้รับอนุญาต (Authorized) ให้ส่งอีเมลในชื่อโดเมนของคุณ</li>
          <li><strong>DKIM (DomainKeys Identified Mail):</strong> เป็นการแนบลายเซ็นดิจิทัล (Digital Signature) ไปกับอีเมล เพื่อยืนยันว่าอีเมลไม่ได้ถูกแก้ไขหรือปลอมแปลงระหว่างทาง</li>
          <li><strong>DMARC (Domain-based Message Authentication, Reporting, and Conformance):</strong> นโยบายที่บอกผู้ให้บริการอีเมลปลายทางว่า ควรทำอย่างไรหากพบอีเมลที่สอบตก SPF หรือ DKIM (เช่น ให้รีเจ็กต์ทิ้ง หรือส่งเข้าสแปม) ปัจจุบัน Google และ Yahoo บังคับให้ผู้ส่งอีเมลปริมาณมากต้องมี DMARC แล้ว</li>
          <li><strong>Bounce Rate (อัตราการตีกลับ):</strong> แบ่งเป็น Hard Bounce (อีเมลไม่มีอยู่จริง) และ Soft Bounce (กล่องข้อความเต็ม) หากคุณส่งอีเมลไปหาที่อยู่ที่ไม่มีจริงบ่อยๆ ระบบปลายทางจะมองว่าคุณซื้อลิสต์อีเมลเถื่อนมา และจะบล็อกโดเมนคุณ อัตราตีกลับที่ยอมรับได้ไม่ควรเกิน 2%</li>
          <li><strong>Spam Complaint Rate:</strong> อัตราของผู้รับที่กดปุ่ม "Report Spam" สิ่งนี้ทำลายชื่อเสียงโดเมนได้รุนแรงที่สุด กฎเหล็กของนักการตลาดคือห้ามเกิน 0.1% (หรือ 1 ใน 1,000 คน)</li>
        </ul>

        <h3>ทำไมอีเมลของฉันถึงเข้าโฟลเดอร์ Spam?</h3>
        <p>ปัญหาที่พบบ่อยที่สุดที่ทำให้โดเมนถูกลงโทษและอีเมลถูกเด้งเข้าถังขยะ ได้แก่:</p>
        <ol>
          <li>ไม่เคยทำ Email Authentication: เป็นการทำผิดพลาดขั้นพื้นฐานที่สุด ผู้ส่งที่ใช้โดเมนตัวเอง (เช่น @yourcompany.com) แต่ไม่ตั้งค่า TXT Records ใน DNS มักจะถูกคัดทิ้งทันที</li>
          <li>ไม่เคยทำ List Cleaning: เก็บสะสมอีเมลลูกค้ามาหลายปีแต่ไม่เคยลบอีเมลที่ตายแล้วออก หรือส่งหาคนที่ไม่เคยเปิดอ่านอีเมลเลยมานานกว่า 6 เดือน ระบบพิจารณาว่าผู้รับไม่มีส่วนร่วม (Low Engagement)</li>
          <li>ใช้คำต้องห้ามในหัวข้ออีเมล (Spammy Subject Lines): เช่น ใช้คำว่า "ฟรี!!", "ถูกลอตเตอรี่", "คลิกที่นี่", หรือใช้อักษรตัวพิมพ์ใหญ่ทั้งหมด รวมถึงใส่เครื่องหมายตกใจ (!!!!) มากเกินไป</li>
        </ol>

        <h3>วิธีแก้ไขเมื่อคะแนนเข้าขั้น "วิกฤต"</h3>
        <p>หากโดเมนของคุณเริ่มติดสแปมแล้ว การกู้ชื่อเสียงกลับมาต้องใช้เวลา (บางครั้งกินเวลาหลายสัปดาห์หรือหลายเดือน) สิ่งแรกที่คุณต้องทำคือหยุดส่งอีเมลปริมาณมหาศาล (Mass Blast) หันมาคัดกรองเฉพาะลูกค้าประจำที่เปิดอ่านอีเมลคุณเป็นประจำในช่วง 30 วันที่ผ่านมา (Engaged Segment) เพื่อดึงคะแนนบวกกลับมาก่อน พร้อมทั้งปรึกษาผู้ดูแลระบบไอทีเพื่อตรวจสอบ DNS ของโดเมนคุณให้สมบูรณ์ 100%</p>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Calculator, Mail, MessageSquare, Send, PieChart, Users } from 'lucide-react';

export default function SmsEmailCostCalculator({ lang = 'th' }: any) {
  // SMS
  const [smsCount, setSmsCount] = useState<number>(10000);
  const [costPerSms, setCostPerSms] = useState<number>(0.7); // THB or Local currency
  
  // Email
  const [emailCount, setEmailCount] = useState<number>(50000);
  const [costPer1kEmails, setCostPer1kEmails] = useState<number>(10); // Typically emails are priced per 1,000 or 10,000

  const [results, setResults] = useState({
    totalSmsCost: 0,
    totalEmailCost: 0,
    totalCampaignCost: 0,
    costPerUserSms: 0,
    costPerUserEmail: 0,
    totalReach: 0
  });

  useEffect(() => {
    const totalSmsCost = smsCount * costPerSms;
    const totalEmailCost = (emailCount / 1000) * costPer1kEmails;
    const totalCampaignCost = totalSmsCost + totalEmailCost;
    
    const costPerUserSms = costPerSms; // Direct
    const costPerUserEmail = costPer1kEmails / 1000;
    
    const totalReach = smsCount + emailCount;

    setResults({
      totalSmsCost,
      totalEmailCost,
      totalCampaignCost,
      costPerUserSms,
      costPerUserEmail,
      totalReach
    });
  }, [smsCount, costPerSms, emailCount, costPer1kEmails]);

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const t = {
    th: {
      title: "เครื่องมือคำนวณต้นทุนแคมเปญ SMS & Email",
      desc: "ประเมินและเปรียบเทียบค่าใช้จ่ายการส่งข้อความโฆษณา/แจ้งเตือน ผ่าน SMS และ Email",
      smsSettings: "การตั้งค่า SMS",
      smsCount: "จำนวน SMS ที่ต้องการส่ง (ข้อความ)",
      costPerSms: "ต้นทุนต่อ 1 SMS (บาท)",
      emailSettings: "การตั้งค่า Email",
      emailCount: "จำนวน Email ที่ต้องการส่ง (ฉบับ)",
      costPer1kEmails: "ต้นทุนต่อ 1,000 Emails (บาท)",
      results: "สรุปงบประมาณแคมเปญ",
      totalSmsCost: "ต้นทุนแคมเปญ SMS",
      totalEmailCost: "ต้นทุนแคมเปญ Email",
      totalCost: "รวมค่าใช้จ่ายทั้งแคมเปญ",
      totalReach: "เข้าถึงกลุ่มเป้าหมายรวม (ครั้ง)",
      costPerReach: "ต้นทุนเฉลี่ยต่อ 1 การเข้าถึง",
      smsCpu: "ต้นทุน SMS / ผู้รับ",
      emailCpu: "ต้นทุน Email / ผู้รับ",
      articleTitle: "SMS vs Email Marketing เลือกช่องทางไหนให้คุ้มค่ากับธุรกิจ?",
    },
    en: {
      title: "SMS & Email Campaign Cost Calculator",
      desc: "Estimate and compare costs of sending marketing/notification messages via SMS and Email.",
      smsSettings: "SMS Settings",
      smsCount: "Number of SMS to Send",
      costPerSms: "Cost per 1 SMS",
      emailSettings: "Email Settings",
      emailCount: "Number of Emails to Send",
      costPer1kEmails: "Cost per 1,000 Emails",
      results: "Campaign Budget Summary",
      totalSmsCost: "Total SMS Cost",
      totalEmailCost: "Total Email Cost",
      totalCost: "Total Campaign Cost",
      totalReach: "Total Target Reach (Messages)",
      costPerReach: "Avg. Cost per Reach",
      smsCpu: "SMS Cost / User",
      emailCpu: "Email Cost / User",
      articleTitle: "SMS vs Email Marketing: Which channel is more cost-effective?",
    }
  };

  const langKey = lang === 'en' ? 'en' : 'th';
  const text = t[langKey];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
        <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
          <Send className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{text.title}</h2>
          <p className="text-gray-500 mt-1 text-sm">{text.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* SMS Section */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" /> {text.smsSettings}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{text.smsCount}</label>
                <input
                  type="number"
                  value={smsCount}
                  onChange={(e) => setSmsCount(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{text.costPerSms}</label>
                <input
                  type="number"
                  value={costPerSms}
                  onChange={(e) => setCostPerSms(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Email Section */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-500" /> {text.emailSettings}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{text.emailCount}</label>
                <input
                  type="number"
                  value={emailCount}
                  onChange={(e) => setEmailCount(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{text.costPer1kEmails}</label>
                <input
                  type="number"
                  value={costPer1kEmails}
                  onChange={(e) => setCostPer1kEmails(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-xl text-white shadow-lg h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-6 opacity-90">{text.results}</h3>
              
              <div className="bg-white/10 p-5 rounded-xl border border-white/20 mb-6 backdrop-blur-sm text-center">
                <p className="text-sm opacity-90 mb-1">{text.totalCost}</p>
                <p className="text-5xl font-bold text-white mb-1">
                  {formatNumber(results.totalCampaignCost)}
                </p>
                <p className="text-xs text-white/80 mt-2 flex items-center justify-center gap-1">
                  <Users className="w-4 h-4" /> {text.totalReach}: <span className="font-semibold">{formatNumber(results.totalReach, 0)}</span>
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="opacity-90">{text.totalSmsCost}</span>
                  <span className="font-semibold text-lg">{formatNumber(results.totalSmsCost)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="opacity-90">{text.totalEmailCost}</span>
                  <span className="font-semibold text-lg">{formatNumber(results.totalEmailCost)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="opacity-90">{text.costPerReach}</span>
                  <span className="font-medium">{formatNumber(results.totalReach > 0 ? results.totalCampaignCost / results.totalReach : 0, 4)}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-900/40 p-3 rounded-lg text-center">
                <p className="text-xs opacity-80 mb-1">{text.smsCpu}</p>
                <p className="font-bold">{formatNumber(results.costPerUserSms, 4)}</p>
              </div>
              <div className="bg-indigo-900/40 p-3 rounded-lg text-center">
                <p className="text-xs opacity-80 mb-1">{text.emailCpu}</p>
                <p className="font-bold">{formatNumber(results.costPerUserEmail, 4)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 text-gray-600 prose prose-amber max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{text.articleTitle}</h2>
        <p>
          ในการทำ CRM (Customer Relationship Management) หรือการทำ Retargeting เพื่อกระตุ้นยอดขายจากฐานลูกค้าเก่า สองเครื่องมือยอดฮิตที่ขาดไม่ได้คือ <strong>SMS Marketing</strong> และ <strong>Email Marketing</strong> แต่ละช่องทางมีจุดเด่นและโครงสร้างต้นทุนที่แตกต่างกันอย่างสิ้นเชิง
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">เปรียบเทียบข้อดีและข้อจำกัด</h3>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-left border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border border-gray-200 font-semibold text-gray-700">คุณสมบัติ</th>
                <th className="p-3 border border-gray-200 font-semibold text-gray-700">SMS Marketing</th>
                <th className="p-3 border border-gray-200 font-semibold text-gray-700">Email Marketing</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 font-medium">อัตราการเปิดอ่าน (Open Rate)</td>
                <td className="p-3 border border-gray-200 text-green-600 font-semibold">สูงมาก (90-98%)</td>
                <td className="p-3 border border-gray-200 text-amber-600">ปานกลางถึงต่ำ (15-25%)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 font-medium">ความเร็วในการตอบสนอง</td>
                <td className="p-3 border border-gray-200">ทันที (ภายใน 3 นาที)</td>
                <td className="p-3 border border-gray-200">หลักชั่วโมงถึงหลักวัน</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 font-medium">ความยาวเนื้อหา / สื่อ</td>
                <td className="p-3 border border-gray-200">จำกัดตัวอักษร (70-160 ตัว), ไม่มีรูป</td>
                <td className="p-3 border border-gray-200">เนื้อหายาวได้, ใส่รูปภาพสวยงามได้เต็มที่</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 font-medium">ต้นทุน (Cost per Message)</td>
                <td className="p-3 border border-gray-200 text-red-600 font-semibold">แพงกว่า (ราวๆ 0.50 - 1.00 บาท/ข้อความ)</td>
                <td className="p-3 border border-gray-200 text-green-600 font-semibold">ถูกมาก (ราวๆ 0.01 - 0.05 บาท/ฉบับ)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">กลยุทธ์การใช้งานร่วมกัน (Omnichannel Strategy)</h3>
        <p>
          เนื่องจาก SMS มีต้นทุนที่ค่อนข้างสูงแต่รับประกันการมองเห็น จึงเหมาะสำหรับการทำ <strong>Time-Sensitive Offers</strong> (โปรโมชันจำกัดเวลา), การแจ้งเตือนฉุกเฉิน, อัปเดตสถานะการส่งสินค้า, หรือแจ้งรหัส OTP
        </p>
        <p>
          ในทางตรงกันข้าม Email มีต้นทุนที่ถูกมาก ทำให้สามารถส่งได้บ่อยกว่า เหมาะสำหรับการส่ง <strong>Newsletter</strong>, โปรโมชันรายสัปดาห์, แนะนำสินค้าใหม่พร้อมแคตตาล็อกรูปภาพ หรือการทำ Lead Nurturing ให้ความรู้กับลูกค้าแบบค่อยเป็นค่อยไป
        </p>
        
        <p className="mt-4 font-medium text-gray-800">
          คำแนะนำ: คุณสามารถใช้ Email เป็นเครื่องมือหลักในการส่งสารให้ฐานลูกค้าทั้งหมด (Mass Broadcast) และใช้ SMS ส่งเฉพาะกับกลุ่มลูกค้า VIP หรือกลุ่มที่มีอัตราการตอบสนองสูง เพื่อบริหารต้นทุนแคมเปญให้คุ้มค่าและเกิด ROI สูงสุด
        </p>
      </div>
    </div>
  );
}

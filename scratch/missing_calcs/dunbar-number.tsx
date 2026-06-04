import React, { useState } from 'react';
import { Users, Heart, UsersRound, MessageCircle, UserSearch, AlertCircle } from 'lucide-react';

export default function DunbarNumber({ lang = 'TH' }: any) {
  const [friendsCount, setFriendsCount] = useState<number>(500);

  const t = {
    title: lang === 'TH' ? 'Dunbar Number ตรวจสอบเพื่อนบนโซเชียล' : 'Dunbar Number Calculator',
    desc: lang === 'TH' 
      ? 'สมองมนุษย์จำกัดให้เรารักษาความสัมพันธ์ที่มีความหมายได้แค่ 150 คน มาลองจัดระเบียบเพื่อนในโซเชียลของคุณกัน' 
      : 'The human brain limits meaningful relationships to 150 people. Analyze your social network size.',
    inputLabel: lang === 'TH' ? 'จำนวนเพื่อนบน Social Network (เช่น Facebook, IG)' : 'Number of friends on Social Network',
    analysisTitle: lang === 'TH' ? 'วิเคราะห์เครือข่ายสังคมของคุณ' : 'Network Analysis',
    exceedLimit: lang === 'TH' ? 'เกินขีดจำกัดทางสมอง' : 'Exceeds Cognitive Limit',
    withinLimit: lang === 'TH' ? 'อยู่ในเกณฑ์ปกติ' : 'Within Normal Limits',
    layer5: lang === 'TH' ? 'เพื่อนสนิท/ครอบครัวที่ผูกพันที่สุด' : 'Intimate friends',
    layer15: lang === 'TH' ? 'เพื่อนที่พึ่งพาได้ยามลำบาก' : 'Good friends',
    layer50: lang === 'TH' ? 'เพื่อนกลุ่มใหญ่ที่เจอกันบ่อย' : 'Close friends',
    layer150: lang === 'TH' ? 'ความสัมพันธ์ที่มีความหมาย (Dunbar Number)' : 'Meaningful contacts (Dunbar Number)',
    layer500: lang === 'TH' ? 'คนรู้จักผิวเผิน' : 'Acquaintances',
    layer1500: lang === 'TH' ? 'คนที่จำหน้าและชื่อได้' : 'People you can recognize',
    articleTitle: lang === 'TH' ? 'Dunbar\'s Number: ทำไมเราถึงมีเพื่อนแท้ได้ไม่เกิน 150 คน?' : 'Dunbar\'s Number: Why We Can Only Maintain 150 Friendships'
  };

  const safeCount = isNaN(friendsCount) || friendsCount < 0 ? 0 : friendsCount;
  
  const isExceeding150 = safeCount > 150;
  const isExceeding1500 = safeCount > 1500;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-teal-100 rounded-full mb-2">
          <Users className="w-10 h-10 text-teal-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{t.title}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.desc}</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
        <div className="max-w-md mx-auto">
          <label className="block text-center text-lg font-medium text-gray-700 mb-4">{t.inputLabel}</label>
          <div className="relative">
            <input
              type="number"
              min="0"
              value={friendsCount === 0 ? '' : friendsCount}
              onChange={(e) => setFriendsCount(parseInt(e.target.value))}
              className="w-full text-center text-2xl font-bold py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-teal-500 focus:border-teal-500 transition-all text-gray-900"
            />
          </div>
        </div>

        {safeCount > 0 && (
          <div className="space-y-6">
            <div className={`p-4 rounded-xl flex items-start gap-4 ${isExceeding1500 ? 'bg-red-50 border border-red-200' : isExceeding150 ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
              <AlertCircle className={`w-6 h-6 mt-0.5 flex-shrink-0 ${isExceeding1500 ? 'text-red-500' : isExceeding150 ? 'text-orange-500' : 'text-green-500'}`} />
              <div>
                <h3 className={`font-bold ${isExceeding1500 ? 'text-red-800' : isExceeding150 ? 'text-orange-800' : 'text-green-800'}`}>
                  {isExceeding150 ? t.exceedLimit : t.withinLimit}
                </h3>
                <p className={`text-sm mt-1 ${isExceeding1500 ? 'text-red-600' : isExceeding150 ? 'text-orange-600' : 'text-green-600'}`}>
                  {isExceeding1500 
                    ? `คุณมีเพื่อน ${safeCount.toLocaleString()} คน ซึ่งเกินขีดจำกัดสูงสุดของสมอง (1,500 คน) ไปมาก คนส่วนใหญ่ใน List ของคุณคือ "คนแปลกหน้า" ที่คุณอาจจำไม่ได้ด้วยซ้ำว่าเคยคุยกันตอนไหน`
                    : isExceeding150 
                    ? `คุณมีเพื่อน ${safeCount.toLocaleString()} คน ซึ่งมากกว่าจำนวน 150 คนที่คุณสามารถรักษาความสัมพันธ์ได้อย่างแท้จริง ส่วนที่เกินมามักเป็นเพียง "คนรู้จักผิวเผิน"`
                    : `ยอดเยี่ยม! จำนวนเพื่อน ${safeCount.toLocaleString()} คน อยู่ในขอบเขตที่สมองของคุณสามารถจดจำรายละเอียดและรักษาความสัมพันธ์ที่ดีเอาไว้ได้`
                  }
                </p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 text-center pt-4 border-t border-gray-100">โครงสร้างความสัมพันธ์ตามทฤษฎี Dunbar (วงกลมความสัมพันธ์)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-rose-100 bg-rose-50 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <div className="font-bold text-rose-900">5 คน</div>
                  <div className="text-sm text-rose-700">{t.layer5}</div>
                </div>
              </div>

              <div className="p-4 border border-orange-100 bg-orange-50 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <UsersRound className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="font-bold text-orange-900">15 คน</div>
                  <div className="text-sm text-orange-700">{t.layer15}</div>
                </div>
              </div>

              <div className="p-4 border border-amber-100 bg-amber-50 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="font-bold text-amber-900">50 คน</div>
                  <div className="text-sm text-amber-700">{t.layer50}</div>
                </div>
              </div>

              <div className="p-4 border border-teal-200 bg-teal-100 rounded-xl flex items-center gap-4 shadow-sm ring-2 ring-teal-500 ring-offset-2">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-teal-900">150 คน (ขีดจำกัด)</div>
                  <div className="text-sm text-teal-800">{t.layer150}</div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 bg-gray-50 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserSearch className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <div className="font-bold text-gray-700">500 คน</div>
                  <div className="text-sm text-gray-600">{t.layer500}</div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 bg-gray-50 rounded-xl flex items-center gap-4 opacity-75">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <div className="font-bold text-gray-700">1,500 คน</div>
                  <div className="text-sm text-gray-600">{t.layer1500}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800">
              <strong>ข้อคิด:</strong> หากคุณมีเพื่อนบน Facebook 2,000 คน ความเป็นจริงคืออีก 1,850 คนเป็นเพียงผู้ชมที่ผ่านไปมาในชีวิตของคุณ การที่คุณพยายามแคร์ทุกคน หรือกลัวว่าคนทั้งหมดนั้นจะคิดอย่างไรกับโพสต์ของคุณ เป็นการสิ้นเปลืองพลังงานสมองโดยใช่เหตุ
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mt-8 text-gray-700 leading-relaxed space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.articleTitle}</h2>
        
        <p>
          ในยุคที่โซเชียลมีเดียเฟื่องฟู เราสามารถเพิ่ม "เพื่อน" (Friends) หรือ "ผู้ติดตาม" (Followers) ได้ด้วยการกดปุ่มเพียงปุ่มเดียว บางคนมีเพื่อนในเฟซบุ๊กหลักพันคน และเรามักคิดว่าการมีเครือข่ายกว้างขวางคือข้อดี แต่ในทางมานุษยวิทยาและจิตวิทยา สมองของเราถูกออกแบบมาให้รับมือกับคนจำนวนมากขนาดนั้นได้จริงหรือ?
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">จุดกำเนิดของ Dunbar's Number</h3>
        <p>
          ในช่วงทศวรรษที่ 1990 <strong>โรบิน ดันบาร์ (Robin Dunbar)</strong> นักมานุษยวิทยาชาวอังกฤษ ได้ศึกษาขนาดของสมองส่วนนีโอคอร์เทกซ์ (Neocortex) ของสัตว์จำพวกลิง ซึ่งเป็นส่วนที่เกี่ยวข้องกับความฉลาดและการเข้าสังคม เขาพบว่าขนาดของสมองส่วนนี้แปรผันตรงกับขนาดของกลุ่มสังคมที่สัตว์เหล่านั้นอาศัยอยู่
        </p>
        <p>
          เมื่อเขานำสมการนี้มาคำนวณกับขนาดสมองของมนุษย์ ผลลัพธ์ที่ได้คือตัวเลข <strong>150</strong> ซึ่งหมายความว่า ขีดจำกัดทางชีววิทยาของมนุษย์ในการรักษา <em>"ความสัมพันธ์ที่มีเสถียรภาพ"</em> (รู้ว่าใครเป็นใคร มีความสัมพันธ์อย่างไรกับใครในกลุ่ม) คือประมาณ 150 คนเท่านั้น ตัวเลขนี้ถูกเรียกว่า <strong>Dunbar's Number</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">กฎของเลข 3 ในวงสังคม (The Rule of 3)</h3>
        <p>
          ดันบาร์ยังค้นพบอีกว่า ความสัมพันธ์จำนวน 150 คนนี้ ไม่ได้มีความสนิทสนมเท่ากันทั้งหมด แต่ถูกแบ่งออกเป็น <strong>"วงกลมที่ซ้อนทับกัน" (Layers of Relationships)</strong> โดยแต่ละชั้นจะมีจำนวนคนเพิ่มขึ้นประมาณ 3 เท่า:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>วงที่ 1 (5 คน): Support Clique</strong> - กลุ่มคนที่สนิทที่สุด เช่น คนรัก ครอบครัว หรือเพื่อนตายที่คุณพร้อมพึ่งพาในยามวิกฤต</li>
          <li><strong>วงที่ 2 (15 คน): Sympathy Group</strong> - กลุ่มเพื่อนสนิทที่คุณใช้เวลาด้วยบ่อยๆ มีความเห็นอกเห็นใจกัน หากพวกเขาเสียชีวิตคุณจะเศร้ามาก</li>
          <li><strong>วงที่ 3 (50 คน): Affinity Group</strong> - กลุ่มคนที่เจอกันบ่อยๆ เช่น เพื่อนร่วมงานกลุ่มใหญ่ หรือญาติพี่น้อง</li>
          <li><strong>วงที่ 4 (150 คน): Active Network</strong> - จุดสูงสุดของความสัมพันธ์ที่คุณยังสามารถเรียกได้ว่าเป็น "เพื่อน" คุณรู้ว่าเขาเป็นใคร ทำอะไร หากบังเอิญเจอกันที่บาร์คุณก็กล้าเดินเข้าไปทักทายและนั่งดื่มด้วยได้</li>
        </ul>
        <p>
          และเลยจุด 150 คนออกไป จะขยายเป็น 500 คน (คนรู้จักผิวเผิน) และ 1,500 คน (คนที่คุณแค่คุ้นหน้าและจำชื่อได้เท่านั้น)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">ทำไมโซเชียลมีเดียถึงหลอกสมองเรา?</h3>
        <p>
          โซเชียลมีเดียทำให้เราเห็นเรื่องราวของคนหลายร้อยหลายพันคนในฟีดข่าวทุกวัน ทำให้สมองเกิดภาพลวงตาว่า "เราสนิทกับพวกเขา" ทั้งที่จริงๆ แล้วเราไม่ได้คุยกันเลยเป็นปีๆ การพยายามรักษาสถานะทางสังคมกับคนจำนวนมากขนาดนี้ (เช่น การแคร์ยอดไลก์ หรือกังวลว่าคนอื่นจะมองเราอย่างไร) ทำให้เกิดภาวะที่เรียกว่า <strong>Social Exhaustion (ความเหนื่อยล้าทางสังคม)</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">วิธีนำทฤษฎีนี้ไปใช้ให้ชีวิตดีขึ้น</h3>
        <p>
          <strong>1. เลิกแคร์คนนอกวง 150 คน:</strong> อย่าปล่อยให้ความคิดเห็นของคนแปลกหน้าหรือคนรู้จักผิวเผินบนอินเทอร์เน็ต มามีผลกระทบต่อความสุขและวิถีชีวิตของคุณ <br/>
          <strong>2. ลงทุนเวลาให้ถูกคน:</strong> เวลาและพลังงานของคุณมีจำกัด จงจัดสรรเวลา 60% ให้กับเพื่อนในกลุ่ม 5 และ 15 คนแรก เพราะพวกเขาคือแกนหลักของความสุขและความมั่นคงทางอารมณ์ของคุณ <br/>
          <strong>3. หมั่นทำความสะอาด Social Network:</strong> การ Unfriend หรือ Mute คนที่คุณไม่ได้คุยด้วยหรือให้พลังงานลบ ไม่ใช่เรื่องผิด แต่เป็นการคืนพื้นที่ว่างให้สมองของคุณเอง
        </p>
        <p>
          สุดท้ายแล้ว ไม่ว่าเทคโนโลยีจะก้าวหน้าไปแค่ไหน ฮาร์ดแวร์ในสมองของเราก็ยังคงเป็นมนุษย์ยุคหินที่ดูแลคนได้เพียง 150 คน คุณภาพของเพื่อนจึงสำคัญกว่าจำนวนเสมอ
        </p>
      </div>
    </div>
  );
}

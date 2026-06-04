"use client";
import { useState } from "react";
import { Image, Copy, Check, Info } from "lucide-react";

interface SizeSpec {
  name: string;
  width: number;
  height: number;
  ratio: string;
}

interface PlatformData {
  name: string;
  color: string;
  sizes: SizeSpec[];
}

const platforms: PlatformData[] = [
  {
    name: "Facebook",
    color: "bg-blue-500",
    sizes: [
      { name: "Profile Picture", width: 320, height: 320, ratio: "1:1" },
      { name: "Cover Photo", width: 851, height: 315, ratio: "2.7:1" },
      { name: "Post Image", width: 1200, height: 630, ratio: "1.91:1" },
      { name: "Story", width: 1080, height: 1920, ratio: "9:16" },
      { name: "Event Cover", width: 1920, height: 1005, ratio: "1.91:1" },
      { name: "Shared Link", width: 1200, height: 628, ratio: "1.91:1" },
    ],
  },
  {
    name: "Instagram",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    sizes: [
      { name: "Profile Picture", width: 320, height: 320, ratio: "1:1" },
      { name: "Square Post", width: 1080, height: 1080, ratio: "1:1" },
      { name: "Portrait Post", width: 1080, height: 1350, ratio: "4:5" },
      { name: "Landscape Post", width: 1080, height: 566, ratio: "1.91:1" },
      { name: "Story / Reels", width: 1080, height: 1920, ratio: "9:16" },
      { name: "IGTV Cover", width: 420, height: 654, ratio: "1:1.55" },
    ],
  },
  {
    name: "X (Twitter)",
    color: "bg-gray-900",
    sizes: [
      { name: "Profile Picture", width: 400, height: 400, ratio: "1:1" },
      { name: "Header Photo", width: 1500, height: 500, ratio: "3:1" },
      { name: "In-Stream Photo", width: 1600, height: 900, ratio: "16:9" },
      { name: "Card Image", width: 800, height: 418, ratio: "1.91:1" },
    ],
  },
  {
    name: "YouTube",
    color: "bg-red-600",
    sizes: [
      { name: "Channel Profile", width: 800, height: 800, ratio: "1:1" },
      { name: "Channel Banner", width: 2560, height: 1440, ratio: "16:9" },
      { name: "Thumbnail", width: 1280, height: 720, ratio: "16:9" },
      { name: "Video (1080p)", width: 1920, height: 1080, ratio: "16:9" },
    ],
  },
  {
    name: "TikTok",
    color: "bg-black",
    sizes: [
      { name: "Profile Picture", width: 200, height: 200, ratio: "1:1" },
      { name: "Video", width: 1080, height: 1920, ratio: "9:16" },
    ],
  },
  {
    name: "LINE",
    color: "bg-green-500",
    sizes: [
      { name: "Profile Picture", width: 480, height: 480, ratio: "1:1" },
      { name: "Cover Photo", width: 1080, height: 878, ratio: "1.23:1" },
      { name: "Rich Message", width: 1040, height: 1040, ratio: "1:1" },
      { name: "Rich Menu (Large)", width: 2500, height: 1686, ratio: "1.48:1" },
    ],
  },
];

export default function SocialMediaImageSize({ lang }: any) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Facebook");
  const [copiedText, setCopiedText] = useState<string>("");

  const currentPlatform = platforms.find((p) => p.name === selectedPlatform)!;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-pink-100 rounded-xl">
            <Image className="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">ขนาดรูปภาพ Social Media</h2>
            <p className="text-sm text-gray-500">ค้นหาขนาดรูปภาพที่เหมาะสมสำหรับแต่ละแพลตฟอร์ม</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {platforms.map((p) => (
            <button
              key={p.name}
              onClick={() => setSelectedPlatform(p.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedPlatform === p.name
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {currentPlatform.sizes.map((size) => (
            <div
              key={size.name}
              className="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 ${currentPlatform.color} rounded-lg flex items-center justify-center`}
                >
                  <Image className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{size.name}</p>
                  <p className="text-sm text-gray-500">อัตราส่วน {size.ratio}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-800">
                  {size.width} × {size.height}
                </span>
                <span className="text-sm text-gray-400">px</span>
                <button
                  onClick={() => handleCopy(`${size.width}x${size.height}`)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition"
                  title="คัดลอก"
                >
                  {copiedText === `${size.width}x${size.height}` ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 rounded-xl p-4 flex items-start gap-2">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            ขนาดที่แสดงเป็นขนาดแนะนำล่าสุด ควรตรวจสอบจากเอกสารอย่างเป็นทางการของแต่ละแพลตฟอร์มเป็นระยะ เพราะอาจมีการเปลี่ยนแปลง
          </p>
        </div>
      </div>

      <article className="prose max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">ขนาดรูปภาพ Social Media ที่ถูกต้อง: เพิ่มการมองเห็นและ Engagement</h2>

        <p>
          ในยุคดิจิทัล การโพสต์รูปภาพบน Social Media เป็นส่วนสำคัญของกลยุทธ์การตลาดออนไลน์ แต่หากรูปภาพมีขนาดไม่ถูกต้อง อาจถูกครอปหรือบีบอัดจนเสียคุณภาพ ทำให้แบรนด์ดูไม่เป็นมืออาชีพ การใช้ขนาดรูปภาพที่ถูกต้องสำหรับแต่ละแพลตฟอร์มจึงสำคัญมาก
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ทำไมขนาดรูปภาพจึงสำคัญ?</h3>
        <p>
          แต่ละแพลตฟอร์ม Social Media มีการแสดงผลรูปภาพแตกต่างกัน Facebook, Instagram, X (Twitter), YouTube, TikTok และ LINE ต่างมีขนาดที่แนะนำเฉพาะ หากใช้ขนาดไม่ถูกต้อง รูปภาพอาจถูกครอปส่วนสำคัญออก หรือแสดงผลเป็นแถบดำ ซึ่งลด Engagement และความน่าสนใจของโพสต์
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ขนาดรูปภาพที่ใช้บ่อยที่สุด</h3>
        <p>
          สำหรับ Facebook โพสต์รูปภาพขนาด 1200×630 พิกเซลเป็นขนาดที่แนะนำ Instagram Square Post ใช้ 1080×1080 พิกเซล ส่วน Story ทุกแพลตฟอร์มมักใช้ 1080×1920 พิกเซล (9:16) YouTube Thumbnail ใช้ 1280×720 พิกเซล ขนาดเหล่านี้ช่วยให้รูปภาพแสดงผลได้คมชัดและสวยงามที่สุด
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">เคล็ดลับสร้างรูปภาพ Social Media ให้ปัง</h3>
        <p>
          ใช้ไฟล์ PNG สำหรับกราฟิกที่มีตัวอักษร และ JPEG สำหรับรูปถ่าย ออกแบบให้ข้อความหรือองค์ประกอบสำคัญอยู่ตรงกลาง เพราะบางแพลตฟอร์มจะครอปขอบรูป ใช้สีสดใส น่าดึงดูด และทดสอบการแสดงผลบนมือถือเสมอ เนื่องจากผู้ใช้งานกว่า 80% เข้าถึง Social Media ผ่านสมาร์ทโฟน
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">วิธีใช้เครื่องมือนี้</h3>
        <p>
          เพียงเลือกแพลตฟอร์มที่ต้องการ ระบบจะแสดงขนาดรูปภาพแนะนำสำหรับทุกตำแหน่ง ตั้งแต่รูปโปรไฟล์ รูปหน้าปก โพสต์ไปจนถึง Story คลิกปุ่มคัดลอกเพื่อนำขนาดไปใช้งานได้ทันที ช่วยประหยัดเวลาและลดข้อผิดพลาดในการออกแบบ
        </p>
      </article>
    </div>
  );
}

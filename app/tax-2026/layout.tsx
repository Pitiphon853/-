import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "คำนวณภาษีเงินได้ 2569 ฟรี | มนุษย์เงินเดือน-ฟรีแลนซ์ - คำนวณ.com",
  description: "คำนวณภาษีเงินได้ปี 2569 ง่ายๆ ใส่รายได้ เลือกค่าลดหย่อน รู้ผลทันที ฟรีไม่ต้องติดตั้ง รองรับมนุษย์เงินเดือนและฟรีแลนซ์",
  openGraph: {
    title: "คำนวณภาษีเงินได้ 2569 ฟรี | คำนวณ.com",
    description: "ใส่รายได้ เลือกค่าลดหย่อน รู้ภาษีที่ต้องจ่ายทันที ฟรี 100% รองรับมนุษย์เงินเดือนและฟรีแลนซ์",
    type: "website",
  },
};

export default function TaxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

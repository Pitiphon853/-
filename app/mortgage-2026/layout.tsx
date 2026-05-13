import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "คำนวณผ่อนบ้าน 2569 | ค่างวด ดอกเบี้ย ทุกธนาคาร — คำนวณ.com",
  description: "คำนวณค่างวดผ่อนบ้านปี 2569 ใส่วงเงิน ดอกเบี้ย ระยะเวลา รู้ค่างวดทันที พร้อมตารางผ่อนและดอกเบี้ยรวมตลอดสัญญา",
  openGraph: {
    title: "คำนวณผ่อนบ้าน 2569 | ค่างวด ดอกเบี้ย รวมทุกแบงก์",
    description: "คำนวณค่างวดผ่อนบ้านแบบลดต้นลดดอก แม่นยำ รู้ค่างวดและดอกเบี้ยรวมทันที",
    type: "website",
  },
};

export default function MortgageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "คำนวณค่าไฟ 2569 | อัตราล่าสุด MEA/PEA ครบทุกขั้น — คำนวณ.com",
  description: "คำนวณค่าไฟฟ้า 2569 อัตราใหม่ล่าสุด รองรับ MEA และ PEA ใส่จำนวนหน่วยรู้ค่าไฟทันที รวม Ft และ VAT แล้ว",
  openGraph: {
    title: "คำนวณค่าไฟ 2569 | คำนวณ.com",
    description: "คำนวณค่าไฟฟ้า 2569 ใส่หน่วยรู้ค่าไฟทันที รวม Ft และ VAT อัตโนมัติ",
    type: "website",
  },
};

export default function ElectricityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

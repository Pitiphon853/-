import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "คำนวณ BMI ดัชนีมวลกาย | เกณฑ์คนไทย ฟรีไม่ต้องติดตั้ง — คำนวณ.com",
  description: "คำนวณ BMI ดัชนีมวลกายออนไลน์ฟรี เกณฑ์มาตรฐานคนไทยและเอเชีย ใส่น้ำหนักส่วนสูงรู้ผลทันที พร้อมคำแนะนำ",
  openGraph: {
    title: "คำนวณ BMI ดัชนีมวลกาย | เกณฑ์คนไทย",
    description: "คำนวณ BMI ออนไลน์ฟรี เกณฑ์มาตรฐานเอเชีย ใส่น้ำหนักส่วนสูงรู้ผลทันที",
    type: "website",
  },
};

export default function BMILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

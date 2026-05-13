import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "คำนวณเงินเดือนสุทธิ 2569 | หักประกันสังคม + ภาษี — คำนวณ.com",
  description: "คำนวณเงินเดือนสุทธิ 2569 ใส่เงินเดือนแล้วรู้ทันทีว่าได้รับจริงเท่าไหร่ หักประกันสังคมและภาษี ณ ที่จ่ายอัตโนมัติ",
  openGraph: {
    title: "คำนวณเงินเดือนสุทธิ 2569 | คำนวณ.com",
    description: "คำนวณเงินเดือนสุทธิ 2569 หักประกันสังคมและภาษี ณ ที่จ่ายอัตโนมัติ",
    type: "website",
  },
};

export default function NetSalaryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

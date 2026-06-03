import MainPage from "../../components/MainPage";
import { getCalcs } from "../../lib/toolsData";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  // Use Thai by default for SEO metadata
  const allCalcs = getCalcs("TH");
  const calc = allCalcs.find(c => c.slug === decodeURIComponent(params.slug) || c.id === decodeURIComponent(params.slug));

  if (!calc) {
    return {
      title: "Not Found | คำนวณ.com",
    };
  }

  return {
    title: `${calc.name} - ใช้งานฟรี | คำนวณ.com`,
    description: `เครื่องมือ${calc.name} (${calc.desc}) คำนวณ.com ศูนย์รวมเครื่องมือคำนวณออนไลน์ที่ใช้งานง่ายที่สุด ฟรีและไม่ต้องติดตั้งแอป`,
  };
}

export default function SlugPage({ params }: Props) {
  return <MainPage activeSlug={decodeURIComponent(params.slug)} />;
}

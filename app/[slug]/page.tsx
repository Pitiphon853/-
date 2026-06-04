import MainPage from "../../components/MainPage";
import { getCalcs } from "../../lib/toolsData";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

const slugMap: Record<string, string> = {
  "bmi-thai": "bmi",
  "tax-2026": "personal-tax",
  "net-salary-2026": "net-salary",
  "electricity-2026": "electric",
  "mortgage-2026": "mortgage",
  "area-converter": "area-unit",
  "used-car-loan": "car-loan",
  "cylinder-volume": "volume-shape"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Use Thai by default for SEO metadata
  const allCalcs = getCalcs("TH");
  const decoded = decodeURIComponent(slug);
  const mapped = slugMap[slug] || slugMap[decoded] || decoded;
  const decodedMapped = decodeURIComponent(mapped);
  
  const calc = allCalcs.find((c: any) => 
    c.slug === mapped || 
    c.id === mapped || 
    c.slug === decodedMapped || 
    c.id === decodedMapped
  );

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

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  return <MainPage activeSlug={decodeURIComponent(slug)} />;
}

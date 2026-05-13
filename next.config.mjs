/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/คำนวณ-ภาษี-2569',
        destination: '/tax-2026',
      },
      {
        source: '/คำนวณ-เงินเดือนสุทธิ-2569',
        destination: '/net-salary-2026',
      },
      {
        source: '/คำนวณ-ค่าไฟ-2569',
        destination: '/electricity-2026',
      },
      {
        source: '/คำนวณ-bmi',
        destination: '/bmi-thai',
      },
      {
        source: '/คำนวณ-ผ่อนบ้าน-2569',
        destination: '/mortgage-2026',
      },
    ];
  },
};
export default nextConfig;

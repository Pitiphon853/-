/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/คำนวณ-ภาษี-2569',
        destination: '/tax-2026',
      },
    ];
  },
};
export default nextConfig;

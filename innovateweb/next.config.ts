const isVercel = process.env.VERCEL === '1';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  ...(isVercel
    ? {}
    : {
        basePath: '/web',
        assetPrefix: '/web/',
      }),
};

export default nextConfig;
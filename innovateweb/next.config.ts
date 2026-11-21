const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/web',      // el nombre de tu repositorio
  assetPrefix: '/web/',
};

export default nextConfig; // si usas .js con CommonJS: module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  // Remova ou comente a linha abaixo para desativar a exportação estática
  // output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  basePath: "",
  assetPrefix: "",
  images: {
    loader: "imgix",
    path: "/",
  },
  webpack: (config, { isServer }) => {
    // Configuração para react-pdf
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    
    // Ignorar canvas e outras dependências problemáticas no servidor
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('canvas', 'pdfjs-dist');
    }

    // Configurações adicionais para lidar com módulos ESM
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    return config;
  },
  experimental: {
    esmExternals: 'loose',
  },
  transpilePackages: ['react-pdf'],
};

module.exports = nextConfig;

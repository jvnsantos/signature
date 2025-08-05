/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Permitir acesso à câmera e geolocalização
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'camera=*, geolocation=*, microphone=*'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
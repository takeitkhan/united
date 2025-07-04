/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    },
    images : {
        domains : ['mathmozocms.test','admin.umbd.net']
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://admin.umbd.net/api/v1/:path*', // Proxy to Backend
                // destination: 'http://mathmozocms.test/api/v1/:path*', // Proxy to Backend
            },            
        ];
    },
    reactStrictMode: false,
};

export default nextConfig;

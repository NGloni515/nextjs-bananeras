/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_SECRET:"my_secret",
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PORTAL_URL: process.env.NEXT_PORTAL_URL,
    }
};

export default nextConfig;

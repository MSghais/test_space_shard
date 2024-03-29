/** @type {import('next').NextConfig} */
// const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
const nextConfig = {
  reactStrictMode: true,
  // ignoreDuringBuilds: true,
  // webpack: config => {
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    // if (isServer) {
    //   config.plugins = [...config.plugins, new PrismaPlugin()]
    // }
    return config;
  },
  // headers: () => {
  //   {
  //     return [
  //       {
  //         source: "https://api.huddle01.com/api/v1/",
  //         headers: [
  //           { key: "Access-Control-Allow-Credentials", value: "false" },
  //           {
  //             key: "Access-Control-Allow-Origin",
  //             value: "https://api.huddle01.com/api/v1",
  //           },
  //           {
  //             key: "Access-Control-Allow-Methods",
  //             value: "GET,DELETE,PATCH,POST,PUT",
  //           },
  //           {
  //             key: "Access-Control-Allow-Headers",
  //             value:
  //               "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date",
  //           },
  //         ],
  //       },
  //     ];
  //   }
  // },
  // images: {
  //   dangerouslyAllowSVG: true,
  //   contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       // hostname: "https://gateway.pinata.cloud/ipfs/",
  //       hostname: "**",
  //       // port: '',
  //       // pathname: 'gateway.pinata.cloud/ipfs/**',
  //       pathname: '**',
  //       // pathname: 'https://gateway.pinata.cloud/ipfs/**',
  //     },
  //     {
  //       protocol: 'https',
  //       // hostname: "https://gateway.pinata.cloud/ipfs/",
  //       hostname: "gateway.pinata.cloud",
  //       // port: '',
  //       pathname: 'gateway.pinata.cloud/ipfs/**',
  //       // pathname: 'https://gateway.pinata.cloud/ipfs/**',
  //     },
  //   ],
  //   domains: ["gateway.pinata.cloud"],
  // },
  // images: {
  //   dangerouslyAllowSVG: true,
  //   contentDispositionType: 'attachment',
  //   contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       // hostname: "https://gateway.pinata.cloud/ipfs/",
  //       hostname: "**",
  //       // port: '',
  //       // pathname: 'gateway.pinata.cloud/ipfs/**',
  //       pathname: '**',
  //       // pathname: 'https://gateway.pinata.cloud/ipfs/**',
  //     },
  //     {
  //       protocol: 'https',
  //       // hostname: "https://gateway.pinata.cloud/ipfs/",
  //       hostname: "gateway.pinata.cloud",
  //       // port: '',
  //       pathname: 'gateway.pinata.cloud/ipfs/**',
  //       // pathname: 'https://gateway.pinata.cloud/ipfs/**',
  //     },
  //   ],
  //   domains: ["gateway.pinata.cloud"],
  // },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback.fs = false;
  //   }
  //   return config;
  // },
  //   webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     // set 'fs' to an empty module on the client to prevent this error on build --> Error: Can't resolve 'fs'
  //     config.node = {
  //       fs: "empty",
  //     };
  //   }

  //   return config;
  // },
};

module.exports = nextConfig;

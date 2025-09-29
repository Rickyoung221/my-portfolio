const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "p.ipic.vip",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "fonts.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "fonts.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "www.recaptcha.net",
      },
      {
        protocol: "https",
        hostname: "recaptcha.net",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "google.com",
      },
      {
        protocol: "https",
        hostname: "p1.music.126.net",
      },
      {
        protocol: "https",
        hostname: "p2.music.126.net",
      },
      {
        protocol: "http",
        hostname: "p1.music.126.net",
      },
      {
        protocol: "http",
        hostname: "p2.music.126.net",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "127.0.0.1:3000",
        "localhost",
        "127.0.0.1",
        "fonts.googleapis.com",
        "www.google.com",
        "www.gstatic.com",
        "www.recaptcha.net",
        "recaptcha.net",
      ],
    },
    serverComponentsExternalPackages: [],
    webpackBuildWorker: false,
  },
  async rewrites() {
    return [
      {
        source: "/recaptcha/api.js",
        destination: "https://www.google.com/recaptcha/api.js",
      },
      {
        source: "/recaptcha/api2.js",
        destination: "https://www.google.com/recaptcha/api2.js",
      },
    ];
  },
  webpack: (config, { isServer, dev }) => {
    config.optimization = {
      ...config.optimization,
      moduleIds: "deterministic",
      minimize: !dev,
      minimizer: [...(config.optimization.minimizer || [])],
    };

    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }

    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: false, // 禁用轮询，使用原生文件系统事件
        aggregateTimeout: 300,
        ignored: ["**/node_modules", "**/.git", "**/.next"],
      };

      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
        layers: true,
      };
    }

    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 5,
  },
  productionBrowserSourceMaps: false,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  generateEtags: true,
  cacheMaxMemorySize: 50,
};

module.exports = withBundleAnalyzer(nextConfig);

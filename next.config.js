/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverMinification: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []),
        'rebrowser-playwright-core',
        '@playwright/browser-chromium',
        'electron',
        'chromium-bidi',
        'bufferutil',
        'utf-8-validate',
        'ghost-cursor-playwright',
        'tree-sitter',
        'tree-sitter-json',
        '@tree-sitter-grammars/tree-sitter-yaml',
        '@2captcha/captcha-solver',
        'pino',
        'pino-pretty',
      ];
    }
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      child_process: false,
    };
    return config;
  },
};

module.exports = nextConfig;

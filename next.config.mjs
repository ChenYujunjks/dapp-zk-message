/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["snarkjs", "circomlibjs", "ffjavascript"],

  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },

  // 👇 关键就在这里
  experimental: {
    outputFileTracingIncludes: {
      "/api/generate-proof": [
        "./src/server/zk/circuit/merkle_message.wasm",
        "./src/server/zk/circuit/merkle_message_final.zkey",
      ],
    },
  },
};

export default nextConfig;
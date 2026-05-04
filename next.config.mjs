/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["snarkjs", "circomlibjs", "ffjavascript"],

  outputFileTracingIncludes: {
    "/api/generate-proof": [
      "src/server/zk/circuit/merkle_message.wasm",
      "src/server/zk/circuit/merkle_message_final.zkey",
    ],
  },

  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
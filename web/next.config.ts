import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site estático para a hospedagem Hostinger (Apache/LiteSpeed + PHP).
  // O formulário envia para public/api/lead.php, que repassa ao Go High Level.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Permite acessar o servidor de dev via túnel (cloudflared).
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite acessar o servidor de dev via tunel (cloudflared) para preview
  // ao vivo. Next bloqueia por padrao recursos de dev vindos de host externo.
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;

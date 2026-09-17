import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-ink px-4 py-10 text-center text-paper">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-4">
        <Image
          src="/logo/home-angels-logo-negativo.png"
          alt="Home Angels Cuidadores de Idosos"
          width={180}
          height={80}
          className="h-10 w-auto"
        />
        <p className="text-sm text-paper/70">
          {siteConfig.unitName} · {siteConfig.whatsappDisplay} · {siteConfig.address}
        </p>
        <p className="font-script text-xl text-sand-light">
          Todo Cuidado é Nosso
        </p>
        <Link
          href="/privacidade"
          className="text-xs text-paper/50 underline hover:text-paper/80"
        >
          Política de Privacidade
        </Link>
      </div>
    </footer>
  );
}

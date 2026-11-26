import Image from "next/image";
import Link from "next/link";
import SocialLinks from "./SocialLinks";

const ACADEMIA = [
  { href: "/cursos", label: "Cursos" },
  { href: "/mi-curso", label: "Mi Curso" },
  { href: "/soporte", label: "Soporte" },
  { href: "/postula", label: "Postulaciones" },
  { href: "/familias", label: "Familias" },
];

const LEGAL = [
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/terminos-servicios", label: "Términos y servicios" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/cookies", label: "Cookies" },
  { href: "/desistimiento", label: "Desistimiento y reembolsos" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/LogoInnovateAcademy.png"
                alt="Innovate Academy"
                width={40}
                height={40}
                className="rounded-md"
              />
              <span className="text-base font-semibold">Innovate Academy</span>
            </div>
            <p className="mt-3 text-xs text-muted">
              Aprende a programar paso a paso.
            </p>
            <p className="mt-4 text-[11px] text-muted">
              © 2026 Innovate Academy
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider">Academia</h3>
            <ul className="mt-4 flex flex-col gap-2 text-xs text-muted">
              {ACADEMIA.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider">Redes</h3>
            <SocialLinks />
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 flex flex-col gap-2 text-xs text-muted">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

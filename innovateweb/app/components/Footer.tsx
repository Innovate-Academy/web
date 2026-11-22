import Image from "next/image";
import Link from "next/link";

const ACADEMIA = [
  { href: "/cursos", label: "Cursos" },
  { href: "/mi-curso", label: "Mi Curso" },
  { href: "/soporte", label: "Soporte" },
  { href: "/postula", label: "Postulaciones" },
];

const LEGAL = [
  { href: "/terminos-servicios", label: "Términos y servicios" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/cookies", label: "Cookies" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/LogoInnovateAcademy.png"
                alt="Innovate Academy"
                width={28}
                height={28}
              />
              <span className="text-sm font-semibold">Innovate Academy</span>
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

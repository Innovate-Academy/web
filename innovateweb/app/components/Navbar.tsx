"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/cursos", label: "Cursos" },
  { href: "/mi-curso", label: "Mi Curso" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/soporte", label: "Soporte" },
  { href: "/postula", label: "Postulaciones" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background">
      <nav className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/LogoInnovateAcademy.png"
            alt="Innovate Academy"
            width={32}
            height={32}
            priority
          />
          <span className="text-sm font-semibold">Innovate Academy</span>
        </Link>

        <ul className="hidden items-center gap-6 text-sm md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  pathname === link.href
                    ? "font-semibold text-brand"
                    : "text-muted hover:text-foreground"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/comunidad"
          className="hidden text-sm text-muted hover:text-foreground md:block"
        >
          Comunidad
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="text-sm font-semibold text-brand md:hidden"
        >
          Menú {open ? "−" : "+"}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-3 border-t border-border px-6 py-4 text-sm md:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={pathname === link.href ? "font-semibold text-brand" : "text-muted"}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/comunidad" onClick={() => setOpen(false)} className="text-muted">
              Comunidad
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}

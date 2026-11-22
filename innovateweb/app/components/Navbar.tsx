"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/cursos", label: "Cursos" },
  { href: "/mi-curso", label: "Mi Curso" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/soporte", label: "Soporte" },
  { href: "/postula", label: "Postulaciones" },
];

interface DiscordUser {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
  email: string | null;
  discriminator: string;
  avatar_url: string | null;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("/api/auth/session", {
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setUser(data.user ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  };

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

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
          ) : user ? (
            <div className="relative group">
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.username}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="ml-2 truncate max-w-[120px]">
                  {user.global_name ?? user.username}
                </span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-white p-2 shadow-lg z-50">
                  <a
                    href="/perfil"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    Ver perfil
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/login"
              className="rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
            >
              Iniciar sesión
            </a>
          )}
        </div>

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
          {loading || !user ? (
            <li>
              <a
                href="/login"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-brand hover:bg-gray-100 rounded"
              >
                Iniciar sesión
              </a>
            </li>
          ) : (
            <>
              <li>
                <a
                  href="/perfil"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  Ver perfil
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </header>
  );
}

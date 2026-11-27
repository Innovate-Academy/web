"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LockIcon = () => (
  <svg
    className="ml-1 h-4 w-4 text-muted"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/cursos", label: "Cursos" },
  { href: "/dashboard", label: "Mi panel", requiresAuth: true },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/soporte", label: "Soporte" },
  { href: "/postula", label: "Postulaciones" },
];

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string | null;
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("/api/auth/session", {
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
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
    setUserMenuOpen(false);
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <Image
            src="/LogoInnovateAcademy.png"
            alt="Innovate Academy"
            width={40}
            height={40}
            className="rounded-md"
            priority
          />
          <span className="hidden text-lg font-semibold tracking-tight sm:inline">
            Innovate Academy
          </span>
        </Link>

        <ul className="hidden items-center gap-6 text-sm md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              {link.requiresAuth && !user && !loading ? (
                <span className="flex cursor-not-allowed items-center gap-1 text-muted hover:text-foreground">
                  <Link
                    href="/login"
                    className="text-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                  <LockIcon />
                </span>
              ) : (
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
              )}
            </li>
          ))}
        </ul>

        <Link
          href="/comunidad"
          className="hidden text-sm text-muted hover:text-foreground md:block"
        >
          Comunidad
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {loading ? (
            <div className="h-2 w-2 animate-pulse rounded-full bg-brand" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-2 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 sm:px-3"
              >
                {user.picture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="ml-1 hidden max-w-[120px] truncate sm:inline">
                  {user.name}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-border bg-white p-2 shadow-lg">
                  <a
                    href="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mi panel
                  </a>
                  <a
                    href="/perfil"
                    onClick={() => setUserMenuOpen(false)}
                    className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Ver perfil
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full rounded px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/login"
              className="whitespace-nowrap rounded-lg bg-brand px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-hover sm:px-4 sm:py-2.5 sm:text-sm"
            >
              <span className="sm:hidden">Entrar</span>
              <span className="hidden sm:inline">Iniciar sesión</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-brand transition-colors hover:bg-panel md:hidden"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="flex flex-col gap-1 border-t border-border px-4 py-3 text-sm md:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              {link.requiresAuth && !user && !loading ? (
                <a
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center rounded-lg px-3 py-2.5 text-muted hover:bg-panel hover:text-foreground"
                >
                  {link.label}
                  <LockIcon />
                </a>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 ${
                    pathname === link.href
                      ? "bg-panel font-semibold text-brand"
                      : "text-muted hover:bg-panel hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <Link
              href="/comunidad"
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-muted hover:bg-panel hover:text-foreground"
            >
              Comunidad
            </Link>
          </li>
          {loading || !user ? (
            <li className="border-t border-border pt-2">
              <a
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg bg-brand px-3 py-2.5 text-center font-semibold text-white"
              >
                Iniciar sesión con Google
              </a>
            </li>
          ) : (
            <>
              <li className="border-t border-border pt-2">
                <a
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-100"
                >
                  Mi panel
                </a>
              </li>
              <li>
                <a
                  href="/perfil"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-100"
                >
                  Ver perfil
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-lg px-3 py-2.5 text-left text-red-600 hover:bg-red-50"
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

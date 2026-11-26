import Link from "next/link";
import type { ReactNode } from "react";
import { LEGAL_INFO } from "../lib/legal";

export const LEGAL_PAGES = [
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/terminos-servicios", label: "Términos y servicios" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/cookies", label: "Cookies" },
  { href: "/desistimiento", label: "Desistimiento y reembolsos" },
  { href: "/familias", label: "Familias" },
];

export function LegalLayout({
  title,
  intro,
  current,
  children,
}: {
  title: string;
  intro?: string;
  current: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand">
        Información legal
      </p>
      <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h1>
      {intro ? (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          {intro}
        </p>
      ) : null}
      <p className="mt-4 text-xs text-muted">
        Última actualización: {LEGAL_INFO.fecha} · Versión {LEGAL_INFO.version}
      </p>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted">
        {children}
      </div>

      <nav className="mt-14 border-t border-border pt-6">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
          Otras páginas legales
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs">
          {LEGAL_PAGES.filter((page) => page.href !== current).map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="font-semibold text-brand hover:text-brand-hover"
              >
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-base font-bold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-brand">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function LegalTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[560px] border-collapse text-left text-xs">
        <thead className="bg-panel text-foreground">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-3 py-2 font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="align-top">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-3 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LegalNote({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-panel p-4 text-xs leading-relaxed">
      {children}
    </div>
  );
}

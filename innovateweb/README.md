# Innovate Academy — Web

Sitio web construido con **Next.js 16**, **React 19**, **TypeScript** y **Tailwind CSS 4**. El catálogo de cursos se lee desde Supabase.

## Estructura

```text
innovateweb/
├── app/
│   ├── components/     # Navbar, Footer y componentes compartidos
│   ├── cursos/         # Página de cursos
│   ├── utils/supabase/ # Clientes de Supabase
│   ├── globals.css     # Tokens de color y estilos base
│   └── layout.tsx      # Navegación y pie compartidos
├── public/
└── next.config.ts
```

## Desarrollo local

```bash
pnpm install
pnpm dev
```

Abre `http://localhost:3000`.

## Despliegue en Vercel

- Root Directory: `innovateweb`
- Framework Preset: Next.js
- Sin `output: export`: el proyecto usa renderizado de Next.js en Vercel.

## Estado actual

La página `/cursos` sigue la maqueta de Figma: hero, selector de moneda de referencia, 9 cursos, packs y acceso a soporte. Los botones de inscripción son visualmente activos pero todavía no ejecutan ninguna acción ni conceden acceso.

Los precios y la moneda de cobro siguen pendientes de confirmación.

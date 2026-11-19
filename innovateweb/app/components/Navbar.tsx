
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-black">
      <div className="flex items-center gap-6">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/LogoInnovateAcademy.png"
            alt="Innovate Academy Logo"
            width={40}
            height={40}
            priority
          />
        </Link>

        {/* Menú de navegación */}
        <ul className="flex items-center gap-6">
          <li>
            <Link href="/" className="hover:underline">
              Inicio
            </Link>
          </li>

      <li>
        <Link href="/cursos" className="hover:underline">
          Cursos
        </Link>
      </li>

          <li>
            <Link href="/about" className="hover:underline">
              Sobre nosotros
            </Link>
          </li>

          <li>
            <Link href="/contact" className="hover:underline">
              Contacto
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}

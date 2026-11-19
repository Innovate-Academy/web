import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white text-black">
      <ul className="flex items-center gap-6">
        <li>
          <Link href="/">
            <Image
              src="/LogoInnovateAcademy.png"
              alt="Innovate Academy"
              width={40}
              height={40}
            />
          </Link>
        </li>

        <li>
          <Link href="/" className="font-bold">
            Innovate Academy
          </Link>
        </li>

<li>
          <Link href="/about" className="hover:underline">
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
    </nav>
  );
}
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-black">    
    <div className="flex items-center gap-4">
        <ul className="flex gap-4">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
        </ul>
    </div>
    </nav>
  )
  }
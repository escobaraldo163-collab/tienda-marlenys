import Link from "next/link";
import { categories } from "@/lib/data";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3 text-navy">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-2xl font-black text-gold">M</div>
          <div>
            <strong className="block text-lg leading-tight">Tienda MARLENYS</strong>
            <span className="block text-xs text-slate-500">Catálogo oficial</span>
          </div>
        </Link>
        <nav className="flex max-w-[70vw] items-center gap-2 overflow-x-auto text-sm font-black text-navy lg:gap-5 lg:text-base">
          <Link className="whitespace-nowrap" href="/">Inicio</Link>
          {categories.map((c) => (
            <Link className="whitespace-nowrap" key={c.slug} href={`/categoria/${c.slug}`}>
              {c.nombre === "Salas de estar" ? "Salas" : c.nombre}
            </Link>
          ))}
          <Link className="whitespace-nowrap" href="/#ubicacion">Ubicación</Link>
          <Link className="whitespace-nowrap rounded-full bg-cream px-4 py-2" href="/admin">Panel</Link>
        </nav>
      </div>
    </header>
  );
}

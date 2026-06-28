import Link from "next/link";
import { categories } from "@/lib/data";

export default function CategoryCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6">
        <span className="rounded-full bg-gold/20 px-3 py-2 text-xs font-black uppercase tracking-widest text-navy">Categorías</span>
        <h2 className="mt-4 text-4xl font-black text-navy">Compra por categoría</h2>
        <p className="mt-2 text-slate-600">Cada botón abre su apartado correspondiente.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((c) => (
          <Link key={c.slug} href={`/categoria/${c.slug}`} className="overflow-hidden rounded-[1.75rem] bg-white shadow-soft transition hover:-translate-y-1">
            <img src={c.imagen} alt={c.nombre} className="h-44 w-full object-cover" />
            <div className="p-5">
              <span className="text-xs font-black uppercase tracking-widest text-gold">{c.nombre}</span>
              <strong className="mt-2 block text-navy">{c.descripcion}</strong>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

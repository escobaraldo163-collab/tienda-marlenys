import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { categories, initialProducts } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);
  const list = initialProducts.filter((p) => p.slugCategoria === params.slug);

  if (!category) {
    return <main className="mx-auto max-w-7xl px-4 py-16"><h1 className="text-4xl font-black text-navy">Categoría no encontrada</h1></main>;
  }

  return (
    <main>
      <section className="bg-gradient-to-b from-white to-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-[1fr_.8fr]">
          <div>
            <Link href="/" className="font-black text-gold">← Inicio</Link>
            <h1 className="mt-4 text-5xl font-black text-navy md:text-7xl">{category.nombre}</h1>
            <p className="mt-4 max-w-2xl text-xl text-slate-700">{category.descripcion}</p>
          </div>
          <img src={category.imagen} alt={category.nombre} className="rounded-[2rem] bg-white p-3 shadow-soft" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex flex-wrap gap-3">
          {categories.map((c) => (
            <Link key={c.slug} href={`/categoria/${c.slug}`} className={`rounded-full px-4 py-3 font-black ${c.slug === params.slug ? "bg-navy text-white" : "bg-white text-navy"}`}>{c.nombre}</Link>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </main>
  );
}

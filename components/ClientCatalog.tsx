"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/data";
import { initialProducts } from "@/lib/data";

export default function ClientCatalog() {
  const [products, setProducts] = useState<Product[]>(initialProducts as Product[]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("marlenys_products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  const list = products.filter((p) => {
    const text = `${p.nombre} ${p.categoria} ${p.marca} ${p.descripcion}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_360px] lg:items-end">
        <div>
          <span className="rounded-full bg-gold/20 px-3 py-2 text-xs font-black uppercase tracking-widest text-navy">Catálogo</span>
          <h2 className="mt-4 text-4xl font-black text-navy">Productos destacados</h2>
        </div>
        <input className="rounded-2xl border border-slate-200 bg-white px-4 py-4" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar producto..." />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.slice(0, 9).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

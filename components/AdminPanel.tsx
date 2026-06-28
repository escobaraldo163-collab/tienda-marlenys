"use client";

import { useEffect, useState } from "react";
import { categories, initialProducts, type Product } from "@/lib/data";
import { slugify } from "@/lib/utils";

const blank: Product = {
  id: "",
  nombre: "",
  categoria: "Salas de estar",
  slugCategoria: "salas",
  subcategoria: "",
  marca: "",
  precio: "Consultar",
  etiqueta: "Disponible",
  descripcion: "",
  medidas: "Consultar",
  imagenes: ["/img/productos/sin-foto.jpg"],
};

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>(initialProducts as Product[]);
  const [form, setForm] = useState<Product>(blank);
  const [editing, setEditing] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("marlenys_products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  function saveProducts(next: Product[]) {
    setProducts(next);
    localStorage.setItem("marlenys_products", JSON.stringify(next));
  }

  function updateCategory(nombre: string) {
    const cat = categories.find((c) => c.nombre === nombre) || categories[0];
    setForm({ ...form, categoria: cat.nombre, slugCategoria: cat.slug });
  }

  function saveProduct(e: React.FormEvent) {
    e.preventDefault();
    const product = {
      ...form,
      id: editing || slugify(form.nombre) + "-" + Date.now(),
      imagenes: form.imagenes[0] ? form.imagenes : ["/img/productos/sin-foto.jpg"],
    };

    const next = editing ? products.map((p) => (p.id === editing ? product : p)) : [product, ...products];
    saveProducts(next);
    setForm(blank);
    setEditing("");
  }

  function editProduct(product: Product) {
    setForm(product);
    setEditing(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteProduct(id: string) {
    if (confirm("¿Eliminar este producto?")) {
      saveProducts(products.filter((p) => p.id !== id));
    }
  }

  function resetProducts() {
    if (confirm("¿Restaurar productos iniciales?")) {
      localStorage.removeItem("marlenys_products");
      setProducts(initialProducts as Product[]);
    }
  }

  function exportData() {
    const content = `export const exportedProducts = ${JSON.stringify(products, null, 2)};`;
    const blob = new Blob([content], { type: "text/typescript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "productos-exportados.ts"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <section className="rounded-[2rem] bg-white p-8 shadow-soft">
        <span className="rounded-full bg-gold/20 px-3 py-2 text-xs font-black uppercase tracking-widest text-navy">Panel administrativo</span>
        <h1 className="mt-4 text-5xl font-black text-navy">Administrar productos</h1>
        <p className="mt-4 max-w-3xl text-slate-700">
          Este panel ya funciona en modo local. Puedes agregar productos y verlos guardados en esta computadora. En la siguiente fase se conecta Supabase para guardarlos en internet.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <form onSubmit={saveProduct} className="grid gap-4 rounded-[2rem] bg-white p-6 shadow-soft">
          <h2 className="text-3xl font-black text-navy">{editing ? "Editar producto" : "Agregar producto"}</h2>

          <label className="grid gap-2 font-black text-navy">Nombre
            <input required className="rounded-2xl border border-slate-200 px-4 py-3" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          </label>

          <label className="grid gap-2 font-black text-navy">Categoría
            <select className="rounded-2xl border border-slate-200 px-4 py-3" value={form.categoria} onChange={(e) => updateCategory(e.target.value)}>
              {categories.map((c) => <option key={c.slug}>{c.nombre}</option>)}
            </select>
          </label>

          <label className="grid gap-2 font-black text-navy">Subcategoría
            <input className="rounded-2xl border border-slate-200 px-4 py-3" value={form.subcategoria} onChange={(e) => setForm({ ...form, subcategoria: e.target.value })} />
          </label>

          <label className="grid gap-2 font-black text-navy">Marca
            <input className="rounded-2xl border border-slate-200 px-4 py-3" value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })} />
          </label>

          <label className="grid gap-2 font-black text-navy">Precio
            <input className="rounded-2xl border border-slate-200 px-4 py-3" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} />
          </label>

          <label className="grid gap-2 font-black text-navy">Etiqueta
            <input className="rounded-2xl border border-slate-200 px-4 py-3" value={form.etiqueta} onChange={(e) => setForm({ ...form, etiqueta: e.target.value })} />
          </label>

          <label className="grid gap-2 font-black text-navy">Medidas
            <input className="rounded-2xl border border-slate-200 px-4 py-3" value={form.medidas} onChange={(e) => setForm({ ...form, medidas: e.target.value })} />
          </label>

          <label className="grid gap-2 font-black text-navy">Ruta de imagen
            <input className="rounded-2xl border border-slate-200 px-4 py-3" value={form.imagenes[0]} onChange={(e) => setForm({ ...form, imagenes: [e.target.value] })} placeholder="/img/productos/foto.jpg" />
          </label>

          <label className="grid gap-2 font-black text-navy">Descripción
            <textarea className="rounded-2xl border border-slate-200 px-4 py-3" rows={4} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
          </label>

          <button className="rounded-2xl bg-gold px-5 py-4 font-black text-navy">Guardar producto</button>
        </form>

        <section className="rounded-[2rem] bg-white p-6 shadow-soft">
          <div className="flex flex-wrap gap-3">
            <button onClick={exportData} className="rounded-2xl bg-navy px-5 py-3 font-black text-white">Exportar</button>
            <button onClick={resetProducts} className="rounded-2xl bg-red-100 px-5 py-3 font-black text-red-700">Restaurar</button>
          </div>

          <div className="mt-6 grid gap-3">
            {products.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 p-4">
                <div>
                  <strong className="text-navy">{p.nombre}</strong>
                  <span className="block text-sm text-slate-500">{p.categoria} • {p.marca} • {p.precio}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => editProduct(p)} className="rounded-xl bg-cream px-3 py-2 font-black text-navy">Editar</button>
                  <button onClick={() => deleteProduct(p.id)} className="rounded-xl bg-red-100 px-3 py-2 font-black text-red-700">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

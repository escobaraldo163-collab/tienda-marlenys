import Link from "next/link";
import { initialProducts } from "@/lib/data";
import { whatsappLink } from "@/lib/utils";

export function generateStaticParams() {
  return initialProducts.map((product) => ({ id: product.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = initialProducts.find((p) => p.id === params.id);

  if (!product) {
    return <main className="mx-auto max-w-7xl px-4 py-16"><h1 className="text-4xl font-black text-navy">Producto no encontrado</h1></main>;
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1fr_.85fr]">
      <div className="rounded-[2rem] bg-white p-3 shadow-soft">
        <img src={product.imagenes[0]} alt={product.nombre} className="w-full rounded-[1.5rem] object-cover" />
      </div>
      <div className="rounded-[2rem] bg-white p-8 shadow-soft">
        <Link href={`/categoria/${product.slugCategoria}`} className="font-black text-gold">← {product.categoria}</Link>
        <h1 className="mt-4 text-5xl font-black text-navy">{product.nombre}</h1>
        <p className="mt-3 text-slate-600">{product.descripcion}</p>
        <div className="mt-6 grid gap-3 rounded-2xl bg-cream p-5">
          <p><b>Marca:</b> {product.marca}</p>
          <p><b>Categoría:</b> {product.categoria}</p>
          <p><b>Subcategoría:</b> {product.subcategoria}</p>
          <p><b>Medidas:</b> {product.medidas}</p>
          <p className="text-2xl font-black text-navy"><b>Precio:</b> {product.precio}</p>
        </div>
        <a target="_blank" href={whatsappLink(`Hola Tienda MARLENYS, quiero información sobre: ${product.nombre}`)} className="mt-6 inline-flex w-full justify-center rounded-2xl bg-gold px-5 py-4 font-black text-navy">Consultar por WhatsApp</a>
      </div>
    </main>
  );
}

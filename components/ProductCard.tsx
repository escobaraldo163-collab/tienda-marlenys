import Link from "next/link";
import type { Product } from "@/lib/data";
import { whatsappLink } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] bg-white shadow-soft">
      <Link href={`/producto/${product.id}`}>
        <img src={product.imagenes[0]} alt={product.nombre} className="h-64 w-full bg-slate-200 object-cover" />
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-black uppercase tracking-widest text-gold">{product.categoria}</span>
          <span className="rounded-full border border-gold/30 bg-cream px-3 py-1 text-xs font-black text-navy">{product.etiqueta}</span>
        </div>
        <h3 className="mt-3 text-2xl font-black text-navy">{product.nombre}</h3>
        <p className="mt-2 leading-relaxed text-slate-600">{product.descripcion}</p>
        <p className="mt-3 text-sm text-slate-600"><b>Marca:</b> {product.marca} &nbsp; <b>Medidas:</b> {product.medidas}</p>
        <div className="mt-3 text-2xl font-black text-navy">{product.precio}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Link className="rounded-2xl bg-navy px-4 py-3 text-center font-black text-white" href={`/producto/${product.id}`}>Ver detalle</Link>
          <a className="rounded-2xl bg-gold px-4 py-3 text-center font-black text-navy" target="_blank" href={whatsappLink(`Hola Tienda MARLENYS, quiero información sobre: ${product.nombre}`)}>WhatsApp</a>
        </div>
      </div>
    </article>
  );
}

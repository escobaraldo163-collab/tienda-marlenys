import Link from "next/link";
import CategoryCards from "@/components/CategoryCards";
import ClientCatalog from "@/components/ClientCatalog";
import { settings } from "@/lib/data";
import { whatsappLink } from "@/lib/utils";

export default function HomePage() {
  return (
    <main>
      <section className="bg-gradient-to-b from-white to-cream">
        <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <span className="rounded-full bg-gold/20 px-3 py-2 text-xs font-black uppercase tracking-widest text-navy">Catálogo digital</span>
            <h1 className="mt-5 text-5xl font-black leading-none tracking-tight text-navy md:text-7xl">Muebles, electrodomésticos y maquinaria para tu hogar y negocio.</h1>
            <p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-700">Una forma moderna y rápida de conocer los productos de Tienda MARLENYS desde tu celular.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/categoria/salas" className="rounded-2xl bg-gold px-5 py-4 font-black text-navy">Ver productos</Link>
              <a target="_blank" href={whatsappLink("Hola Tienda MARLENYS, quiero información de un producto.")} className="rounded-2xl bg-white px-5 py-4 font-black text-navy shadow">Consultar por WhatsApp</a>
            </div>
          </div>
          <div className="relative rounded-[2rem] bg-white p-3 shadow-soft">
            <img src="/img/productos/hero.jpg" alt="Catálogo Tienda MARLENYS" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" />
            <div className="absolute bottom-8 left-8 rounded-2xl bg-white/95 p-4 shadow-xl">
              <strong className="block text-navy">Atención personalizada</strong>
              <span>Consulta disponibilidad, precios y medidas.</span>
            </div>
          </div>
        </div>
      </section>

      <CategoryCards />
      <ClientCatalog />

      <section className="mx-auto my-8 grid max-w-7xl gap-6 px-4 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-gradient-to-br from-navy to-green-900 p-8 text-white shadow-soft">
          <img src="/img/logos/revasa.png" alt="REVASA" className="mb-5 max-h-28 rounded-2xl bg-white p-3" />
          <span className="rounded-full bg-white/15 px-3 py-2 text-xs font-black uppercase tracking-widest">Línea agrícola</span>
          <h2 className="mt-4 text-5xl font-black">REVASA</h2>
          <p className="mt-4 text-lg leading-relaxed">Generadores, bombas de agua, chapeadoras y maquinaria agrícola para trabajo fuerte.</p>
          <Link href="/categoria/revasa" className="mt-6 inline-flex rounded-2xl bg-gold px-5 py-4 font-black text-navy">Ver REVASA</Link>
        </div>
        <img src="/img/productos/revasa.jpg" alt="REVASA" className="h-full min-h-80 rounded-[2rem] object-cover shadow-soft" />
      </section>

      <section id="ubicacion" className="mx-auto grid max-w-7xl gap-6 px-4 py-12 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[2rem] bg-white p-8 shadow-soft">
          <span className="rounded-full bg-gold/20 px-3 py-2 text-xs font-black uppercase tracking-widest text-navy">Visítanos</span>
          <h2 className="mt-4 text-4xl font-black text-navy">Ubicación y horario</h2>
          <p className="mt-4"><b>Dirección:</b> {settings.direccion}</p>
          <p><b>Horario:</b> {settings.horario}</p>
          <p><b>WhatsApp:</b> {settings.displayWhatsapp}</p>
        </div>
        <div className="rounded-[2rem] bg-navy p-8 text-white shadow-soft">
          <strong className="text-2xl">Tienda MARLENYS</strong>
          <span className="mt-2 block">Puerto Barrios, Izabal</span>
          <a target="_blank" href="https://www.google.com/maps/search/6+Avenida+entre+12+y+13+Calle+Puerto+Barrios" className="mt-6 inline-flex rounded-2xl bg-white px-5 py-4 font-black text-navy">Abrir mapa</a>
        </div>
      </section>
    </main>
  );
}

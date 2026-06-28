import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Tienda MARLENYS | Catálogo oficial",
  description: "Muebles, electrodomésticos y maquinaria REVASA en Puerto Barrios.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
        <WhatsAppFloat />
        <footer className="grid gap-1 bg-navy px-4 py-8 text-center text-white">
          <strong>Tienda MARLENYS</strong>
          <span className="opacity-75">Muebles • Electrodomésticos • REVASA</span>
        </footer>
      </body>
    </html>
  );
}

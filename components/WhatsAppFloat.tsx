import { whatsappLink } from "@/lib/utils";

export default function WhatsAppFloat() {
  return (
    <a href={whatsappLink("Hola Tienda MARLENYS, quiero información.")} target="_blank" className="fixed bottom-4 right-4 z-50 rounded-full bg-[#25D366] px-5 py-3 font-black text-white shadow-2xl">
      WhatsApp
    </a>
  );
}

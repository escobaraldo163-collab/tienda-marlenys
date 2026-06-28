import { settings } from "./data";

export function whatsappLink(message: string) {
  return `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

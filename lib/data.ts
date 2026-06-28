export const settings = {
  "whatsapp": "50279485723",
  "displayWhatsapp": "7948 5723",
  "direccion": "6 Avenida entre 12 y 13 Calle, Puerto Barrios, Izabal.",
  "horario": "Lunes a sábado, 8:00 AM a 6:00 PM."
} as const;

export const categories = [
  {
    "nombre": "Salas de estar",
    "slug": "salas",
    "descripcion": "Modulares, juegos de sala, mesas de centro y muebles para TV.",
    "imagen": "/img/productos/salas.jpg"
  },
  {
    "nombre": "Comedores",
    "slug": "comedores",
    "descripcion": "Comedores familiares, modernos y funcionales.",
    "imagen": "/img/productos/comedores.jpg"
  },
  {
    "nombre": "Dormitorios",
    "slug": "dormitorios",
    "descripcion": "Camas, closets, cómodas, mesas de noche y tocadores.",
    "imagen": "/img/productos/dormitorios.jpg"
  },
  {
    "nombre": "Electrodomésticos",
    "slug": "electrodomesticos",
    "descripcion": "Televisores, refrigeradoras, lavadoras, estufas y más.",
    "imagen": "/img/productos/electrodomesticos.jpg"
  },
  {
    "nombre": "REVASA",
    "slug": "revasa",
    "descripcion": "Generadores, bombas de agua, chapeadoras, motosierras y repuestos.",
    "imagen": "/img/productos/revasa.jpg"
  }
] as const;

export const initialProducts = [
  {
    "id": "sala-modular",
    "nombre": "Sala modular",
    "categoria": "Salas de estar",
    "slugCategoria": "salas",
    "subcategoria": "Modulares",
    "marca": "Muebles Primiun",
    "precio": "Consultar",
    "etiqueta": "Destacado",
    "descripcion": "Sala modular moderna para sala familiar. Reemplaza esta imagen por fotografías reales.",
    "medidas": "Consultar",
    "imagenes": [
      "/img/productos/salas.jpg"
    ]
  },
  {
    "id": "juego-sala-familiar",
    "nombre": "Juego de sala familiar",
    "categoria": "Salas de estar",
    "slugCategoria": "salas",
    "subcategoria": "Juegos de sala",
    "marca": "Muebles Primiun",
    "precio": "Consultar",
    "etiqueta": "Disponible",
    "descripcion": "Juego de sala cómodo para el hogar. Consulta colores y disponibilidad.",
    "medidas": "Consultar",
    "imagenes": [
      "/img/productos/salas.jpg"
    ]
  },
  {
    "id": "comedor-familiar",
    "nombre": "Comedor familiar",
    "categoria": "Comedores",
    "slugCategoria": "comedores",
    "subcategoria": "6 sillas",
    "marca": "Muebles Primiun",
    "precio": "Consultar",
    "etiqueta": "Nuevo",
    "descripcion": "Comedor elegante para compartir en familia. Disponible según inventario.",
    "medidas": "Consultar",
    "imagenes": [
      "/img/productos/comedores.jpg"
    ]
  },
  {
    "id": "cama-dormitorio",
    "nombre": "Cama para dormitorio",
    "categoria": "Dormitorios",
    "slugCategoria": "dormitorios",
    "subcategoria": "Camas",
    "marca": "Muebles Primiun",
    "precio": "Consultar",
    "etiqueta": "Disponible",
    "descripcion": "Cama cómoda y resistente para dormitorio principal o habitación secundaria.",
    "medidas": "Consultar",
    "imagenes": [
      "/img/productos/dormitorios.jpg"
    ]
  },
  {
    "id": "televisor-lg",
    "nombre": "Televisor LG",
    "categoria": "Electrodomésticos",
    "slugCategoria": "electrodomesticos",
    "subcategoria": "Televisores",
    "marca": "LG",
    "precio": "Consultar",
    "etiqueta": "Tecnología",
    "descripcion": "Televisor disponible en diferentes tamaños según inventario.",
    "medidas": "Varias pulgadas",
    "imagenes": [
      "/img/productos/electrodomesticos.jpg"
    ]
  },
  {
    "id": "generador-revasa",
    "nombre": "Generador REVASA",
    "categoria": "REVASA",
    "slugCategoria": "revasa",
    "subcategoria": "Generadores",
    "marca": "REVASA",
    "precio": "Consultar",
    "etiqueta": "Maquinaria",
    "descripcion": "Generador para trabajo, negocio o emergencia. Consulta potencia disponible.",
    "medidas": "Según modelo",
    "imagenes": [
      "/img/productos/revasa.jpg"
    ]
  },
  {
    "id": "bomba-agua-revasa",
    "nombre": "Bomba de agua REVASA",
    "categoria": "REVASA",
    "slugCategoria": "revasa",
    "subcategoria": "Bombas de agua",
    "marca": "REVASA",
    "precio": "Consultar",
    "etiqueta": "Agrícola",
    "descripcion": "Bomba de agua para uso agrícola, doméstico o comercial.",
    "medidas": "Según modelo",
    "imagenes": [
      "/img/productos/revasa.jpg"
    ]
  }
] as const;

export type Product = {
  id: string;
  nombre: string;
  categoria: string;
  slugCategoria: string;
  subcategoria: string;
  marca: string;
  precio: string;
  etiqueta: string;
  descripcion: string;
  medidas: string;
  imagenes: string[];
};

export type Category = typeof categories[number];

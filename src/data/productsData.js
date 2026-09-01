export const productCategories = [
  { id: "todos", label: "Todo el Catálogo" },
  { id: "trapos", label: "Trapos Industriales" },
  { id: "waypes", label: "Waypes y Huaypes" },
  { id: "algodon", label: "Algodón y Fibras" },
  { id: "limpieza", label: "Esponjas y Complementos" }
];

export const productsData = [
  {
    id: "trapo-cosido-color",
    category: "trapos",
    name: "Trapo Industrial Cosido de Color",
    badge: "Más Vendido",
    tagline: "Multicapa en costura espiral reforzada",
    image: "/Recursos/7251add01e3189093063cb478b20e673.jpg",
    gallery: [
      "/Recursos/7251add01e3189093063cb478b20e673.jpg",
      "/trapo.JPG",
      "/Recursos/acb92dd41f4808798e9007bf47f54bf7.jpg"
    ],
    description: "Trapo confeccionado con retazos seleccionados de punto de algodón cosidos en círculos continuos. Mayor durabilidad, absorción de grasas pesadas, aceites y lubricantes en maquinaria y talleres.",
    specs: [
      "Material: 100% Algodón de punto",
      "Costura: Espiral circular reforzada (no se deshilacha)",
      "Dimensiones: Aprox. 25x25 cm y 30x30 cm",
      "Presentaciones: Sacos de 20 kg, 25 kg, 50 kg y fardos"
    ],
    applications: ["Talleres Mecánicos", "Metalmecánica", "Plantas Industriales", "Minería"],
    priceReference: "S/ 8.50 por kg (escala por mayor)",
    unit: "kg"
  },
  {
    id: "trapo-blanco-fino",
    category: "trapos",
    name: "Trapo Industrial Blanco Fino / Punto",
    badge: "Calidad Premium",
    tagline: "100% libre de tintes y pelusa",
    image: "/trapo industrial fino.JPG",
    gallery: [
      "/trapo industrial fino.JPG",
      "/Recursos/bbc4f6152710f5949ccaada65e69858f.jpg"
    ],
    description: "Paño de algodón blanco puro de primera calidad. No destiñe ante la acción de thínner, aguarrás, alcohol isopropílico u otros solventes químicos. Ideal para acabados exigentes.",
    specs: [
      "Material: Algodón blanco puro de punto",
      "Garantía: Cero desteñido con solventes",
      "Costura: Disponible en versión cosida o en retazo suelto",
      "Presentaciones: Paquetes de 1 kg, sacos de 10 kg, 25 kg y 50 kg"
    ],
    applications: ["Artes Gráficas e Imprentas", "Pintura Automotriz", "Laboratorios", "Líneas de Envasado"],
    priceReference: "S/ 9.50 por kg",
    unit: "kg"
  },
  {
    id: "waype-pano-fino",
    category: "waypes",
    name: "Waype de Paño Fino Trapex",
    badge: "Marca Oficial",
    tagline: "Hilado fino de máxima suavidad para pulido",
    image: "/waype fino.JPG",
    gallery: [
      "/waype fino.JPG",
      "/Recursos/waype.jpg"
    ],
    description: "Hilado fino de algodón puro seleccionado, suave al tacto y de rápida absorción. Diseñado específicamente para pulir carrocerías, muebles finos y aplicar ceras o barnices sin rayar.",
    specs: [
      "Presentación Oficial: Bolsa con marca aprox. 400 g",
      "Presentación Mayorista: Fardos de 50 paquetes y sacos a granel",
      "Textura: Extra suave sin impurezas",
      "Uso: Pulido y limpieza de precisión"
    ],
    applications: ["Car Detailing", "Ebanistería", "Mantenimiento Eléctrico", "Acabados de Pintura"],
    priceReference: "S/ 7.90 unidad (descuentos por fardo)",
    unit: "unidad"
  },
  {
    id: "waype-cardado-granel",
    category: "waypes",
    name: "Waype Cardado Blanco por Mayor (50 kg)",
    badge: "Gran Volumen",
    tagline: "Fibra cardada en sacos industriales",
    image: "/Recursos/waypexmayor.jpg",
    gallery: [
      "/Recursos/waypexmayor.jpg",
      "/Recursos/121038667_3483036401755502_528553388152160698_n.jpg",
      "/Recursos/descarga.png"
    ],
    description: "Fibra de algodón cardada de alto volumen para consumo masivo en industrias, minas, flotas de transporte y distribuidoras. Excelente relación costo-rendimiento.",
    specs: [
      "Contenido: Saco prensado de 50 kg",
      "Color: Blanco natural",
      "Absorción: Alta capacidad para hidrocarburos",
      "Embalaje: Saco tejido resistente para transporte pesado"
    ],
    applications: ["Minería", "Empresas de Transporte", "Industria Pesada", "Distribuidores Ferreteros"],
    priceReference: "S/ 250.00 por saco 50kg",
    unit: "saco"
  },
  {
    id: "algodon-industrial",
    category: "algodon",
    name: "Algodón Industrial Trapex (400g / Sacos)",
    badge: "Alta Absorción",
    tagline: "Fibra natural para uso técnico",
    image: "/algodon industrial.JPG",
    gallery: [
      "/algodon industrial.JPG",
      "/Recursos/descarga.png"
    ],
    description: "Algodón puro procesado en empaque individual de 400 gramos o en fardos mayoristas. Proporciona una absorción rápida y uniforme de solventes y líquidos especiales.",
    specs: [
      "Formato: Paquetes de 400 gramos y sacos de 25 kg",
      "Composición: 100% fibra vegetal de algodón",
      "Pureza: Libre de aditivos químicos abrasivos"
    ],
    applications: ["Laboratorios", "Artesanías", "Aislamiento Térmico Ligero", "Limpieza Técnica"],
    priceReference: "S/ 12.90 paquete",
    unit: "paquete"
  },
  {
    id: "trapo-franela-color",
    category: "trapos",
    name: "Trapo Franela Color en Rollo / Sacos",
    badge: "Especial Carrocería",
    tagline: "Tejido perchado suave y absorbente",
    image: "/Recursos/acb92dd41f4808798e9007bf47f54bf7.jpg",
    gallery: [
      "/Recursos/acb92dd41f4808798e9007bf47f54bf7.jpg",
      "/Recursos/276195663_5094882450570881_3547849191141535746_n.png"
    ],
    description: "Franela de algodón perchada disponible en rollos de 50 metros o en sacos de retazos seleccionados. Ideal para desempolvado y limpieza de superficies delicadas.",
    specs: [
      "Formatos: Rollos de 50 m y sacos de 25 kg / 50 kg",
      "Textura: Aterciopelada suave",
      "Colores: Surtido industrial"
    ],
    applications: ["Autolavados", "Limpieza Institucional", "Mueblerías", "Vidrierías"],
    priceReference: "S/ 35.00 por rollo / S/ 7.50 kg en saco",
    unit: "rollo/kg"
  },
  {
    id: "esponjas-don-lupillo",
    category: "limpieza",
    name: "Esponjas de Limpieza Industrial (Pack x36 / x6)",
    badge: "Complemento",
    tagline: "Espuma flexible de alta densidad y fibra abrasiva",
    image: "/Recursos/121038668_3483036308422178_7087763716706551594_n.jpg",
    gallery: [
      "/Recursos/121038668_3483036308422178_7087763716706551594_n.jpg"
    ],
    description: "Esponjas multiusos de alta durabilidad por paquetes mayoristas de 36 y 6 unidades. Doble acción con cara de fibra para desincrustar grasa y espuma absorbente.",
    specs: [
      "Empaque Mayorista: Paquete sellado x 36 unidades",
      "Empaque Retail: Pack x 6 unidades",
      "Material: Poliuretano de alta densidad + fibra abrasiva"
    ],
    applications: ["Cocinas Industriales", "Limpieza de Maquinaria", "Lavaderos", "Servicios de Limpieza"],
    priceReference: "S/ 8.90 pack x6 / S/ 38.00 paquete x36",
    unit: "paquete"
  }
];

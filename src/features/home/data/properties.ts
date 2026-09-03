import type { Property, PropertyImage, PropertyImageCategory } from '../../../types/property'

interface PropertySeed {
  id: string
  title: string
  slug: string
  operation: Property['operation']
  alsoAvailableFor?: Property['alsoAvailableFor']
  propertyType: Property['propertyType']
  price: number
  rentalPrice?: number
  currency?: Property['currency']
  rentalCurrency?: Property['rentalCurrency']
  neighborhood: string
  city: string
  bedrooms: number
  bathrooms: number
  totalArea: number
  imageSet: number
  featured?: boolean
  location: Property['location']
}

const imageSets: string[][] = [
  [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=88',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=88',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=88',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=88',
  ],
  [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=88',
    'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2400&q=88',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=2400&q=88',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=88',
  ],
  [
    'https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=2400&q=88',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=2400&q=88',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2400&q=88',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=88',
  ],
]

const imageCategories: PropertyImageCategory[] = [
  'exterior',
  'living',
  'kitchen',
  'bedroom',
]

function createImages(
  propertyId: string,
  propertyTitle: string,
  imageSet: number,
): PropertyImage[] {
  const sources = imageSets[imageSet % imageSets.length]

  return sources.map(
    (
      src: string,
      index: number,
    ): PropertyImage => ({
      id: `${propertyId}-${index + 1}`,
      src,
      alt: `${propertyTitle} · ${imageCategories[index]}`,
      category: imageCategories[index],
    }),
  )
}

function createProperty(seed: PropertySeed): Property {
  const images = createImages(
    seed.id,
    seed.title,
    seed.imageSet,
  )

  return {
    id: seed.id,
    title: seed.title,
    slug: seed.slug,
    operation: seed.operation,
    alsoAvailableFor: seed.alsoAvailableFor,
    propertyType: seed.propertyType,
    price: seed.price,
    rentalPrice: seed.rentalPrice,
    currency: seed.currency ?? 'USD',
    rentalCurrency: seed.rentalCurrency ?? 'USD',
    neighborhood: seed.neighborhood,
    city: seed.city,
    bedrooms: seed.bedrooms,
    bathrooms: seed.bathrooms,
    totalArea: seed.totalArea,
    coverImage: images[0].src,
    images,
    featured: seed.featured ?? false,
    location: seed.location,
  }
}

const propertySeeds: PropertySeed[] = [
  /* =========================================================
     12 EXCLUSIVAS EN VENTA
     ========================================================= */

  {
    id: 'sale-01',
    title: 'Casa Horizonte',
    slug: 'casa-horizonte',
    operation: 'venta',
    propertyType: 'casa',
    price: 690000,
    neighborhood: 'Nordelta',
    city: 'Buenos Aires',
    bedrooms: 4,
    bathrooms: 3,
    totalArea: 420,
    imageSet: 0,
    featured: true,
    location: {
      latitude: -34.3996,
      longitude: -58.6507,
    },
  },
  {
    id: 'sale-02',
    title: 'Residencia Litoral',
    slug: 'residencia-litoral',
    operation: 'venta',
    propertyType: 'exclusiva',
    price: 1180000,
    neighborhood: 'Tigre',
    city: 'Buenos Aires',
    bedrooms: 5,
    bathrooms: 5,
    totalArea: 610,
    imageSet: 1,
    location: {
      latitude: -34.4265,
      longitude: -58.5797,
    },
  },
  {
    id: 'sale-03',
    title: 'Casa del Lago',
    slug: 'casa-del-lago',
    operation: 'venta',
    propertyType: 'casa',
    price: 840000,
    neighborhood: 'Nordelta',
    city: 'Buenos Aires',
    bedrooms: 4,
    bathrooms: 4,
    totalArea: 495,
    imageSet: 2,
    location: {
      latitude: -34.3937,
      longitude: -58.6439,
    },
  },
  {
    id: 'sale-04',
    title: 'Casa Mirador',
    slug: 'casa-mirador',
    operation: 'venta',
    propertyType: 'exclusiva',
    price: 940000,
    neighborhood: 'Villa Carlos Paz',
    city: 'Córdoba',
    bedrooms: 5,
    bathrooms: 4,
    totalArea: 560,
    imageSet: 0,
    featured: true,
    location: {
      latitude: -31.4201,
      longitude: -64.4998,
    },
  },
  {
    id: 'sale-05',
    title: 'Casa Piedra',
    slug: 'casa-piedra',
    operation: 'venta',
    propertyType: 'casa',
    price: 465000,
    neighborhood: 'La Calera',
    city: 'Córdoba',
    bedrooms: 3,
    bathrooms: 3,
    totalArea: 310,
    imageSet: 1,
    location: {
      latitude: -31.3432,
      longitude: -64.3354,
    },
  },
  {
    id: 'sale-06',
    title: 'Residencia Serena',
    slug: 'residencia-serena',
    operation: 'venta',
    propertyType: 'exclusiva',
    price: 1290000,
    neighborhood: 'Cerro de las Rosas',
    city: 'Córdoba',
    bedrooms: 5,
    bathrooms: 5,
    totalArea: 680,
    imageSet: 2,
    location: {
      latitude: -31.3686,
      longitude: -64.2363,
    },
  },
  {
    id: 'sale-07',
    title: 'Casa Jacarandá',
    slug: 'casa-jacaranda',
    operation: 'venta',
    propertyType: 'casa',
    price: 575000,
    neighborhood: 'San Isidro',
    city: 'Buenos Aires',
    bedrooms: 4,
    bathrooms: 3,
    totalArea: 370,
    imageSet: 0,
    location: {
      latitude: -34.4708,
      longitude: -58.5276,
    },
  },
  {
    id: 'sale-08',
    title: 'Ático Aura',
    slug: 'atico-aura',
    operation: 'venta',
    propertyType: 'departamento',
    price: 385000,
    neighborhood: 'Palermo',
    city: 'Buenos Aires',
    bedrooms: 3,
    bathrooms: 2,
    totalArea: 148,
    imageSet: 1,
    featured: true,
    location: {
      latitude: -34.5837,
      longitude: -58.4233,
    },
  },
  {
    id: 'sale-09',
    title: 'Penthouse Libertador',
    slug: 'penthouse-libertador',
    operation: 'venta',
    propertyType: 'departamento',
    price: 760000,
    neighborhood: 'Belgrano',
    city: 'Buenos Aires',
    bedrooms: 4,
    bathrooms: 4,
    totalArea: 275,
    imageSet: 2,
    location: {
      latitude: -34.5623,
      longitude: -58.4564,
    },
  },
  {
    id: 'sale-10',
    title: 'Casa del Valle',
    slug: 'casa-del-valle',
    operation: 'venta',
    propertyType: 'casa',
    price: 530000,
    neighborhood: 'Mendiolaza',
    city: 'Córdoba',
    bedrooms: 4,
    bathrooms: 3,
    totalArea: 390,
    imageSet: 0,
    location: {
      latitude: -31.2674,
      longitude: -64.3008,
    },
  },
  {
    id: 'sale-11',
    title: 'Residencia Barrancas',
    slug: 'residencia-barrancas',
    operation: 'venta',
    propertyType: 'exclusiva',
    price: 980000,
    neighborhood: 'Acassuso',
    city: 'Buenos Aires',
    bedrooms: 5,
    bathrooms: 4,
    totalArea: 520,
    imageSet: 1,
    location: {
      latitude: -34.4774,
      longitude: -58.4997,
    },
  },
  {
    id: 'sale-12',
    title: 'Casa Nativa',
    slug: 'casa-nativa',
    operation: 'venta',
    propertyType: 'casa',
    price: 445000,
    neighborhood: 'Villa Allende',
    city: 'Córdoba',
    bedrooms: 3,
    bathrooms: 3,
    totalArea: 325,
    imageSet: 2,
    location: {
      latitude: -31.2947,
      longitude: -64.2957,
    },
  },

  /* =========================================================
     12 EXCLUSIVAS EN ALQUILER
     price = precio mensual
     ========================================================= */

  {
    id: 'rent-01',
    title: 'Loft Botánico',
    slug: 'loft-botanico',
    operation: 'alquiler',
    propertyType: 'departamento',
    price: 1850,
    neighborhood: 'Palermo',
    city: 'Buenos Aires',
    bedrooms: 1,
    bathrooms: 1,
    totalArea: 82,
    imageSet: 1,
    location: {
      latitude: -34.5812,
      longitude: -58.4184,
    },
  },
  {
    id: 'rent-02',
    title: 'Departamento República',
    slug: 'departamento-republica',
    operation: 'alquiler',
    propertyType: 'departamento',
    price: 2400,
    neighborhood: 'Recoleta',
    city: 'Buenos Aires',
    bedrooms: 2,
    bathrooms: 2,
    totalArea: 125,
    imageSet: 2,
    location: {
      latitude: -34.5882,
      longitude: -58.3922,
    },
  },
  {
    id: 'rent-03',
    title: 'Casa del Parque',
    slug: 'casa-del-parque',
    operation: 'alquiler',
    propertyType: 'casa',
    price: 3100,
    neighborhood: 'San Isidro',
    city: 'Buenos Aires',
    bedrooms: 3,
    bathrooms: 3,
    totalArea: 280,
    imageSet: 0,
    location: {
      latitude: -34.4722,
      longitude: -58.5211,
    },
  },
  {
    id: 'rent-04',
    title: 'Ático Palermo',
    slug: 'atico-palermo',
    operation: 'alquiler',
    propertyType: 'departamento',
    price: 2850,
    neighborhood: 'Palermo',
    city: 'Buenos Aires',
    bedrooms: 2,
    bathrooms: 2,
    totalArea: 140,
    imageSet: 1,
    location: {
      latitude: -34.5864,
      longitude: -58.4283,
    },
  },
  {
    id: 'rent-05',
    title: 'Casa Sierras',
    slug: 'casa-sierras',
    operation: 'alquiler',
    propertyType: 'casa',
    price: 2200,
    neighborhood: 'Villa Carlos Paz',
    city: 'Córdoba',
    bedrooms: 3,
    bathrooms: 2,
    totalArea: 260,
    imageSet: 2,
    location: {
      latitude: -31.4107,
      longitude: -64.4974,
    },
  },
  {
    id: 'rent-06',
    title: 'Residencia Golf',
    slug: 'residencia-golf',
    operation: 'alquiler',
    propertyType: 'exclusiva',
    price: 4300,
    neighborhood: 'Villa Allende',
    city: 'Córdoba',
    bedrooms: 4,
    bathrooms: 4,
    totalArea: 470,
    imageSet: 0,
    location: {
      latitude: -31.2855,
      longitude: -64.3034,
    },
  },
  {
    id: 'rent-07',
    title: 'Departamento Cavia',
    slug: 'departamento-cavia',
    operation: 'alquiler',
    propertyType: 'departamento',
    price: 3200,
    neighborhood: 'Palermo Chico',
    city: 'Buenos Aires',
    bedrooms: 3,
    bathrooms: 3,
    totalArea: 175,
    imageSet: 1,
    location: {
      latitude: -34.5778,
      longitude: -58.4056,
    },
  },
  {
    id: 'rent-08',
    title: 'Casa Verde',
    slug: 'casa-verde',
    operation: 'alquiler',
    propertyType: 'casa',
    price: 2750,
    neighborhood: 'La Lucila',
    city: 'Buenos Aires',
    bedrooms: 3,
    bathrooms: 3,
    totalArea: 305,
    imageSet: 2,
    location: {
      latitude: -34.4973,
      longitude: -58.4899,
    },
  },
  {
    id: 'rent-09',
    title: 'Loft Güemes',
    slug: 'loft-guemes',
    operation: 'alquiler',
    propertyType: 'departamento',
    price: 1450,
    neighborhood: 'Güemes',
    city: 'Córdoba',
    bedrooms: 1,
    bathrooms: 1,
    totalArea: 74,
    imageSet: 0,
    location: {
      latitude: -31.4258,
      longitude: -64.1923,
    },
  },
  {
    id: 'rent-10',
    title: 'Casa Altos',
    slug: 'casa-altos',
    operation: 'alquiler',
    propertyType: 'casa',
    price: 2600,
    neighborhood: 'Cerro de las Rosas',
    city: 'Córdoba',
    bedrooms: 3,
    bathrooms: 3,
    totalArea: 295,
    imageSet: 1,
    location: {
      latitude: -31.3659,
      longitude: -64.2398,
    },
  },
  {
    id: 'rent-11',
    title: 'Penthouse Río',
    slug: 'penthouse-rio',
    operation: 'alquiler',
    propertyType: 'departamento',
    price: 3900,
    neighborhood: 'Puerto Madero',
    city: 'Buenos Aires',
    bedrooms: 3,
    bathrooms: 3,
    totalArea: 210,
    imageSet: 2,
    location: {
      latitude: -34.6121,
      longitude: -58.3621,
    },
  },
  {
    id: 'rent-12',
    title: 'Casa Los Aromos',
    slug: 'casa-los-aromos',
    operation: 'alquiler',
    propertyType: 'casa',
    price: 2350,
    neighborhood: 'Mendiolaza',
    city: 'Córdoba',
    bedrooms: 3,
    bathrooms: 2,
    totalArea: 270,
    imageSet: 0,
    location: {
      latitude: -31.2627,
      longitude: -64.2942,
    },
  },

  /* =========================================================
     4 VENTA + ALQUILER
     Son las únicas que aparecen en ambos listados.
     ========================================================= */

  {
    id: 'mixed-01',
    title: 'Casa Bosque',
    slug: 'casa-bosque',
    operation: 'venta',
    alsoAvailableFor: 'alquiler',
    propertyType: 'exclusiva',
    price: 790000,
    rentalPrice: 3900,
    neighborhood: 'Nordelta',
    city: 'Buenos Aires',
    bedrooms: 4,
    bathrooms: 4,
    totalArea: 460,
    imageSet: 1,
    location: {
      latitude: -34.3972,
      longitude: -58.6594,
    },
  },
  {
    id: 'mixed-02',
    title: 'Residencia del Cerro',
    slug: 'residencia-del-cerro',
    operation: 'venta',
    alsoAvailableFor: 'alquiler',
    propertyType: 'exclusiva',
    price: 870000,
    rentalPrice: 4100,
    neighborhood: 'Cerro de las Rosas',
    city: 'Córdoba',
    bedrooms: 4,
    bathrooms: 4,
    totalArea: 510,
    imageSet: 2,
    location: {
      latitude: -31.3718,
      longitude: -64.2435,
    },
  },
  {
    id: 'mixed-03',
    title: 'Penthouse Jardines',
    slug: 'penthouse-jardines',
    operation: 'venta',
    alsoAvailableFor: 'alquiler',
    propertyType: 'departamento',
    price: 620000,
    rentalPrice: 3400,
    neighborhood: 'Belgrano',
    city: 'Buenos Aires',
    bedrooms: 3,
    bathrooms: 3,
    totalArea: 195,
    imageSet: 0,
    location: {
      latitude: -34.5586,
      longitude: -58.4498,
    },
  },
  {
    id: 'mixed-04',
    title: 'Casa Vista',
    slug: 'casa-vista',
    operation: 'venta',
    alsoAvailableFor: 'alquiler',
    propertyType: 'casa',
    price: 680000,
    rentalPrice: 3200,
    neighborhood: 'Villa Carlos Paz',
    city: 'Córdoba',
    bedrooms: 4,
    bathrooms: 3,
    totalArea: 430,
    imageSet: 1,
    location: {
      latitude: -31.4142,
      longitude: -64.5118,
    },
  },
]

export const allProperties: Property[] = propertySeeds.map(createProperty)

export const featuredProperties: Property[] = allProperties.filter(
  (property: Property) => property.featured,
)
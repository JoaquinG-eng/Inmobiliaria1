export type PropertyOperation = 'venta' | 'alquiler'

export type PropertyType =
  | 'casa'
  | 'departamento'
  | 'desarrollo'
  | 'exclusiva'

export type PropertyImageCategory =
  | 'exterior'
  | 'living'
  | 'kitchen'
  | 'bedroom'
  | 'bathroom'
  | 'patio'
  | 'pool'
  | 'terrace'

export interface PropertyImage {
  id: string
  src: string
  alt: string
  category: PropertyImageCategory
}

export interface PropertyLocation {
  latitude: number
  longitude: number
}

export interface Property {
  id: string
  title: string
  slug: string
  operation: PropertyOperation
  alsoAvailableFor?: PropertyOperation
  propertyType: PropertyType
  price: number
  rentalPrice?: number
  currency: 'USD' | 'ARS'
  rentalCurrency?: 'USD' | 'ARS'
  neighborhood: string
  city: string
  bedrooms: number
  bathrooms: number
  totalArea: number
  coverImage: string
  images: PropertyImage[]
  featured: boolean
  location: PropertyLocation
}
import { useEffect } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'

import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

interface MapLocation {
  name: string
  lat: number
  lng: number
  zoom: number
}

interface PropertyMapProps {
  location: MapLocation
}

const markerIcon = L.icon({
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

function MapController({
  location,
}: PropertyMapProps) {
  const map = useMap()

  useEffect(() => {
    map.flyTo(
      [location.lat, location.lng],
      location.zoom,
      {
        duration: 1.4,
      },
    )
  }, [
    location.lat,
    location.lng,
    location.zoom,
    map,
  ])

  return null
}

export function PropertyMap({
  location,
}: PropertyMapProps) {
  return (
    <div className="property-map-shell">
      <MapContainer
        center={[
          location.lat,
          location.lng,
        ]}
        zoom={location.zoom}
        scrollWheelZoom={false}
        className="property-map"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController
          location={location}
        />

        <Marker
          position={[
            location.lat,
            location.lng,
          ]}
          icon={markerIcon}
        >
          <Popup>
            {location.name}
          </Popup>
        </Marker>
      </MapContainer>

      <div className="property-map-label">
        <span>
          UBICACIÓN
        </span>

        <strong>
          {location.name}
        </strong>
      </div>
    </div>
  )
}
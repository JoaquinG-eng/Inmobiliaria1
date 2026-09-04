# ESTUDIO-INMO

## Descripción general

**ESTUDIO-INMO** es una aplicación web inmobiliaria desarrollada como proyecto de frontend orientado a demostrar una experiencia digital moderna, visual, fluida y preparada para evolucionar hacia un producto inmobiliario real.

El proyecto fue pensado para representar una inmobiliaria que necesita mostrar propiedades de una manera más cuidada que un catálogo tradicional.

La propuesta combina:

- diseño editorial;
- experiencia cinematográfica;
- navegación fluida;
- propiedades en venta y alquiler;
- fichas detalladas;
- galerías;
- mapas;
- formularios;
- responsive design;
- SEO;
- performance;
- accesibilidad;
- manejo de estados y errores.

Actualmente funciona como una **demo frontend completamente navegable**. https://inmobiliariestudio.vercel.app/

Las propiedades, precios, fotografías y demás información utilizada son ficticios y fueron incorporados exclusivamente con fines de desarrollo y demostración.

---

# Objetivo del proyecto

El objetivo de ESTUDIO-INMO es construir una experiencia inmobiliaria donde el usuario pueda:

- descubrir propiedades;
- explorar inmuebles en venta;
- explorar inmuebles en alquiler;
- acceder al detalle de una propiedad;
- recorrer galerías fotográficas;
- visualizar su ubicación;
- realizar consultas;
- ofrecer una propiedad para su venta;
- navegar cómodamente desde desktop, tablet o mobile.

El proyecto prioriza tanto la parte visual como la experiencia de uso y la estabilidad del frontend.

---

# Tecnologías utilizadas

El proyecto está construido principalmente con:

- React
- TypeScript
- Vite
- CSS modular
- GSAP
- Framer Motion
- Leaflet
- OpenStreetMap
- Lucide React

También utiliza funcionalidades nativas del navegador como:

- IntersectionObserver
- History API
- Portals
- requestAnimationFrame
- Touch Events
- local browser APIs

---

# Estructura actual del proyecto

```text
proyecto inmo 1/
│
├── public/                                  # Archivos públicos servidos directamente por Vite
│   │
│   ├── images/                              # Imágenes públicas utilizadas por SEO y branding
│   │   ├── favicon-v2.png                   # Favicon del navegador
│   │   └── og-image.png                     # Imagen utilizada para Open Graph y redes sociales
│   │
│   ├── media/                               # Videos optimizados utilizados en la experiencia visual
│   │   ├── hero-1920.mp4                    # Video principal del Hero y página 404
│   │   ├── mountain-1080.mp4                # Video cinematográfico secundario
│   │   └── greenery-1920.mp4                # Video ambiental
│   │
│   ├── robots.txt                           # Reglas de rastreo para motores de búsqueda
│   ├── sitemap.xml                          # Sitemap básico del sitio
│   └── site.webmanifest                     # Información de la aplicación para el navegador
│
├── src/                                     # Código fuente principal
│   │
│   ├── app/
│   │   └── App.tsx                          # Orquestador principal de vistas y navegación
│   │                                        # Controla Home, Comprar, Alquilar, Vender,
│   │                                        # detalle de propiedad y página 404
│   │
│   ├── components/                          # Componentes reutilizables de toda la aplicación
│   │   │
│   │   ├── layout/
│   │   │   └── SiteHeader.tsx               # Header y navegación principal
│   │   │
│   │   ├── maps/
│   │   │   └── PropertyMap.tsx              # Mapa interactivo con Leaflet/OpenStreetMap
│   │   │
│   │   ├── motion/
│   │   │   └── CinematicVideo.tsx           # Manejo optimizado de videos cinematográficos
│   │   │
│   │   └── ui/
│   │       └── ScrollToTopHint.tsx           # Botón flotante para volver al inicio de la página
│   │
│   ├── features/                            # Funcionalidades principales separadas por dominio
│   │   │
│   │   ├── buy/
│   │   │   ├── BuyPage.tsx                  # Página principal de propiedades en venta
│   │   │   └── BuyPropertiesSection.tsx     # Catálogo y filtros de propiedades en venta
│   │   │
│   │   ├── rent/
│   │   │   ├── RentPage.tsx                 # Página principal de propiedades en alquiler
│   │   │   └── RentPropertiesSection.tsx    # Catálogo y filtros de propiedades en alquiler
│   │   │
│   │   ├── sell/
│   │   │   └── SellPage.tsx                 # Página destinada a propietarios que desean vender
│   │   │
│   │   ├── contact/
│   │   │   ├── GeneralContactForm.tsx        # Formulario general de contacto
│   │   │   └── SellerForm.tsx                # Formulario para propietarios/vendedores
│   │   │
│   │   ├── property/
│   │   │   ├── PropertyDetailPage.tsx        # Vista completa de una propiedad
│   │   │   └── PropertyInquiryForm.tsx       # Formulario de consulta sobre una propiedad
│   │   │
│   │   ├── not-found/
│   │   │   └── NotFoundPage.tsx              # Página 404 personalizada
│   │   │
│   │   └── home/
│   │       │
│   │       ├── HomePage.tsx                  # Composición principal de la Home
│   │       │
│   │       ├── data/
│   │       │   ├── media.ts                  # Referencias de videos y contenido multimedia
│   │       │   └── properties.ts             # Dataset demo de propiedades
│   │       │
│   │       └── sections/
│   │           ├── HeroSection.tsx            # Hero cinematográfico
│   │           ├── IntentSection.tsx          # Accesos Comprar / Alquilar / Vender
│   │           ├── FeaturedPropertiesSection.tsx
│   │           │                              # Propiedades destacadas y galería interactiva
│   │           ├── ManifestoSection.tsx       # Sección editorial de identidad
│   │           ├── VideoStorySection.tsx      # Sección narrativa con video
│   │           ├── LocationsSection.tsx       # Sección visual de ubicaciones
│   │           └── FooterSection.tsx          # Footer de la aplicación
│   │
│   ├── styles/
│   │   │
│   │   ├── global.css                        # Archivo central que importa los módulos CSS
│   │   │
│   │   └── modules/
│   │       ├── 00-foundation.css             # Reset, variables y estilos globales
│   │       ├── 01-home.css                   # Estilos principales de Home
│   │       ├── 02-home-responsive.css        # Responsive específico de Home
│   │       ├── 03-property-detail.css        # Detalle de propiedades
│   │       ├── 04-header-menu.css             # Header y menú fullscreen
│   │       ├── 05-map.css                    # Mapas
│   │       ├── 06-property-inquiry.css       # Formulario de consulta por propiedad
│   │       ├── 07-general-contact.css        # Formulario general
│   │       ├── 08-catalog-base.css           # Base visual de catálogos
│   │       ├── 09-catalog-pages.css          # Páginas de catálogo
│   │       ├── 10-rent-page.css              # Página Alquilar
│   │       ├── 11-sell-page.css              # Página Vender
│   │       ├── 12-scroll-top-hint.css        # Botón volver arriba
│   │       └── 13-not-found.css              # Página 404
│   │
│   ├── types/
│   │   └── property.ts                       # Tipos TypeScript relacionados con propiedades
│   │
│   └── main.tsx                              # Punto de entrada de React
│
├── index.html                                # HTML base, SEO, Open Graph y metadatos
├── package.json                              # Dependencias y scripts
├── package-lock.json                         # Versiones exactas de dependencias
├── tsconfig.json                             # Configuración TypeScript
├── vite.config.ts                            # Configuración de Vite
├── .gitignore                                # Archivos que no deben versionarse
└── DOCUMENTACION_ESTUDIO_INMO.md             # Documentación general del proyecto
Funcionalidades actuales
Home

La Home funciona como presentación principal del proyecto.

Incluye:

Hero con video;
navegación principal;
animaciones;
contenido editorial;
propiedades destacadas;
galerías;
secciones audiovisuales;
ubicaciones;
footer.

La Home permanece montada internamente durante determinadas navegaciones para evitar recargar innecesariamente videos, animaciones y contenido pesado.

Comprar

La sección Comprar permite explorar propiedades disponibles para venta.

Actualmente incluye:

catálogo;
propiedades ficticias;
filtros;
navegación al detalle;
imágenes;
precio;
ubicación;
información principal.
Alquilar

La sección Alquilar posee un catálogo independiente.

Permite:

explorar propiedades disponibles para alquiler;
aplicar filtros;
visualizar información resumida;
acceder al detalle.

Las propiedades pueden pertenecer exclusivamente a alquiler o encontrarse disponibles para ambas operaciones.

Vender

La sección Vender está orientada al propietario de un inmueble.

Incluye:

presentación comercial;
formulario;
captura de información básica;
experiencia responsive.

Actualmente el formulario es frontend y no envía información a un backend real.

Detalle de propiedad

Cada propiedad dispone de una vista detallada.

Incluye:

título;
precio;
operación;
ubicación;
dormitorios;
baños;
superficie;
imágenes;
galería;
mapa;
formulario de consulta;
navegación hacia otras propiedades.
Galerías

Las galerías fueron desarrolladas para funcionar tanto con mouse como con dispositivos táctiles.

Incluyen:

navegación mediante flechas;
thumbnails;
swipe horizontal;
loaders;
prevención de clicks involuntarios después de un swipe;
adaptación mobile.
Mapas

Los mapas utilizan:

Leaflet
+
OpenStreetMap

No se utiliza Google Maps.

Esto evita depender actualmente de una API key de Google para mostrar las ubicaciones de demostración.

El mapa permite:

zoom;
drag;
interacción táctil;
visualización de coordenadas.

La atribución de OpenStreetMap debe mantenerse.

Responsive

El proyecto fue desarrollado contemplando:

desktop;
notebooks;
tablets;
teléfonos;
dispositivos táctiles.

Se realizaron ajustes particulares para:

navegación;
galerías;
mapas;
formularios;
títulos;
spacing;
videos;
menú;
scroll.
Performance

Se realizaron diferentes optimizaciones para reducir cargas innecesarias y mejorar la fluidez.

Entre ellas:

videos optimizados con FFmpeg;
IntersectionObserver;
preload diferenciado;
montaje diferido de contenido;
reducción de blur en mobile;
reducción de sombras costosas;
requestAnimationFrame;
loaders optimizados;
tratamiento específico para prefers-reduced-motion.
SEO

La aplicación cuenta actualmente con una base SEO.

Incluye:

<title>;
meta description;
Open Graph;
Twitter Cards;
favicon;
canonical;
robots.txt;
sitemap.xml;
manifest;
idioma es-AR.

Dominio actual:

https://inmobiliariestudio.vercel.app/
Open Graph

La aplicación posee una imagen específica para compartir el proyecto en:

LinkedIn;
WhatsApp;
Facebook;
X;
otras plataformas compatibles.

Archivo:

public/images/og-image.png
Página 404

La aplicación incluye una página 404 personalizada.

Utiliza el mismo video cinematográfico del Hero como fondo y mantiene la identidad visual del resto de la experiencia.

Incluye:

video fullscreen;
mensaje de página no encontrada;
botón Volver al inicio;
metadata noindex, nofollow.
Datos actuales

Actualmente las propiedades están definidas localmente en:

src/features/home/data/properties.ts

El proyecto contiene actualmente:

12 propiedades únicamente en venta
12 propiedades únicamente en alquiler
4 propiedades disponibles para ambas operaciones

Total:

28 propiedades demo

Estos datos no son reales.

No existe conexión actual con una base de datos inmobiliaria.

Qué puede hacerse actualmente

El usuario puede:

navegar por toda la experiencia;
explorar Comprar;
explorar Alquilar;
acceder a Vender;
abrir propiedades;
recorrer galerías;
interactuar con mapas;
utilizar filtros;
abrir formularios;
navegar desde dispositivos táctiles;
utilizar menú responsive;
compartir la URL de la aplicación;
visualizar una página 404 personalizada.
Qué NO hace actualmente

ESTUDIO-INMO todavía no debe considerarse un sistema inmobiliario comercial completamente operativo.

Actualmente no existe:

backend inmobiliario real;
base de datos productiva;
panel de administración;
autenticación de agentes;
carga dinámica de propiedades;
almacenamiento propio de imágenes;
envío real de formularios;
CRM;
email transaccional;
gestión de clientes;
agenda de visitas;
gestión de vendedores;
favoritos persistentes;
historial de operaciones.

Esto es intencional.

La aplicación se desarrolló primero como una base frontend sólida antes de definir las necesidades particulares del futuro negocio que la utilice.

Limitación actual de routing

Actualmente Comprar, Alquilar, Vender y el detalle de las propiedades son vistas internas controladas desde React.

Por este motivo todavía no existen rutas independientes como:

/comprar
/alquilar
/vender
/propiedad/casa-horizonte

La implementación de routing real está prevista como una evolución posterior.

Esto permitiría:

URLs compartibles;
SEO individual por propiedad;
navegación directa;
sitemap completo;
Open Graph por inmueble.
Funcionalidades futuras

Cuando ESTUDIO-INMO pase de demo a producto inmobiliario real, las siguientes etapas previstas son:

Backend

Implementar una API encargada de:

propiedades;
consultas;
agentes;
usuarios;
imágenes;
estados;
operaciones.
Base de datos

Una posible implementación podría realizarse mediante:

Supabase
+
PostgreSQL

Entidades principales:

properties
property_images
property_features
inquiries
agents
users
Panel administrativo

Permitiría administrar propiedades sin modificar código.

Funciones previstas:

crear propiedad;
editar propiedad;
subir fotografías;
ordenar fotografías;
modificar precio;
publicar;
despublicar;
marcar destacadas;
archivar;
gestionar consultas.
Formularios conectados

Los formularios actuales deberán conectarse a servicios reales.

Flujo esperado:

Usuario
   ↓
Frontend
   ↓
Backend
   ↓
Base de datos
   ↓
Email / CRM / Panel administrativo
Gestión de imágenes

Las fotografías reales deberían migrar a almacenamiento administrado.

Posibles soluciones:

Supabase Storage;
Cloudinary;
CDN;
almacenamiento equivalente.
Autenticación

Será necesaria principalmente para:

administradores;
agentes;
propietarios autorizados.
Routing real

Implementar:

/
/comprar
/alquilar
/vender
/propiedad/:slug
SEO dinámico

Cada propiedad podrá tener:

título propio;
description;
canonical;
Open Graph;
imagen social;
Schema.org;
URL indexable.
Analytics

Podrán registrarse eventos como:

property_view
property_inquiry
seller_submit
contact_submit
whatsapp_click
buy_filter
rent_filter
CRM

Las consultas podrán conectarse opcionalmente con:

HubSpot;
Zoho;
Salesforce;
CRM propio.
Arquitectura futura esperada

La evolución natural del proyecto podría ser:

                    ESTUDIO-INMO
                         │
              ┌──────────┴──────────┐
              │                     │
          FRONTEND               BACKEND
              │                     │
       React + TypeScript          API
              │                     │
              │              ┌──────┴──────┐
              │              │             │
              │          DATABASE       STORAGE
              │              │             │
              │         PostgreSQL      Imágenes
              │
              └──────────────┐
                             │
                       PANEL ADMIN
                             │
                  Gestión inmobiliaria
Estado actual
HOME                              COMPLETO
COMPRAR                           COMPLETO
ALQUILAR                          COMPLETO
VENDER                            COMPLETO
DETALLE DE PROPIEDAD              COMPLETO
GALERÍAS                          COMPLETO
MAPAS                             COMPLETO
RESPONSIVE                        COMPLETO
PERFORMANCE                       COMPLETO
SEO BASE                          COMPLETO
OPEN GRAPH                        COMPLETO
FAVICON                           COMPLETO
ROBOTS                            COMPLETO
SITEMAP BASE                      COMPLETO
MANIFEST                          COMPLETO
404 PERSONALIZADA                 COMPLETO
BUILD PRODUCCIÓN                  COMPLETO
DEPLOY                            COMPLETO

PROPIEDAD NO ENCONTRADA           PENDIENTE
CATÁLOGO SIN RESULTADOS           PENDIENTE
FALLBACK DE IMÁGENES              PENDIENTE
ERROR GENÉRICO                    PENDIENTE
SKELETON / LOADING GLOBAL         PENDIENTE
QA FINAL DE ERRORES               PENDIENTE

BACKEND REAL                      FUTURO
BASE DE DATOS REAL                FUTURO
PANEL ADMINISTRATIVO              FUTURO
FORMULARIOS CONECTADOS            FUTURO
AUTENTICACIÓN                     FUTURO
ROUTING SEO                       FUTURO
SEO POR PROPIEDAD                 FUTURO
CRM                               SEGÚN CLIENTE
DOMINIO COMERCIAL                 SEGÚN CLIENTE
Autor



ESTUDIO-INMO fue diseñado y desarrollado como proyecto de software orientado a demostrar la construcción progresiva de una experiencia digital inmobiliaria, desde su concepto visual hasta una base frontend preparada para futuras integraciones reales.

Demo

La aplicación se encuentra desplegada en:

https://inmobiliariestudio.vercel.app/
Nota final

ESTUDIO-INMO se encuentra actualmente en una etapa de frontend demo avanzada.

La prioridad durante esta etapa fue construir primero una experiencia estable, visualmente consistente y técnicamente mantenible.

Las futuras conexiones con backend, almacenamiento, base de datos y servicios externos deberán realizarse preservando la experiencia existente y sustituyendo progresivamente los datos de demostración por fuentes reales.

La evolución del proyecto debe realizarse por etapas, procurando que cada nueva integración amplíe el producto sin reconstruir innecesariamente aquello que ya se encuentra estable.

Desarrollo de aplicaciones web con enfoque en:

Frontend Development;
React;
TypeScript;
UI/UX;
arquitectura frontend;
responsive design;
performance;
integración de APIs;
desarrollo full-stack.
### Nombre profesional

Joaquín Gonzalez
Software Developer
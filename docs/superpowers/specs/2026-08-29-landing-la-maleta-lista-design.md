# Landing y plantilla de ofertas — La Maleta Lista

Fecha: 2026-08-29

## Contexto y objetivo

La Maleta Lista es el relanzamiento (con nuevo nombre y marca) de un proyecto de contenido de viajes en TikTok/IG/FB con comisión de afiliado, tras un intento anterior que generó viralidad pero apenas 2-3 conversiones. Antes de reactivar contenido, hace falta una web mínima que:

1. Sirva de carta de presentación para que los programas de afiliados (Civitatis, Booking, Heymondo/IATI, DiscoverCars, etc.) acepten el alta.
2. Aloje una página por cada oferta/vídeo publicado, con tracking (UTM) hacia los afiliados, para poder medir clic→conversión desde el primer vídeo — el problema no diagnosticado la vez anterior.
3. Capture contacto (Telegram) de quien ve una oferta pero no compra en el momento.

Restricciones: presupuesto bajo (hosting gratis, sin dominio propio de entrada), sin conocimientos de programación más allá de HTML/CSS, ritmo de publicación alto (una oferta nueva por vídeo, potencialmente varias por semana).

## Alcance de esta spec

Incluye: estructura del proyecto, plantilla de landing (home), plantilla de página de oferta, esquema de datos de una oferta, resolución de links de afiliado (principal + extras), y el flujo para publicar una oferta nueva.

Fuera de alcance (decidido explícitamente, para fases posteriores): listado de ofertas en la home tipo agregador (ViajerosPiratas), buscador integrado, comparador propio, chat IA, newsletter (más allá de Telegram), multi-idioma, panel de administración. Estas quedan preparadas para añadirse sin rehacer la base, pero no se construyen ahora.

## Arquitectura

Generador de sitio estático **Eleventy (11ty)**. Sin framework de frontend, sin JS pesado para el visitante — el resultado del build es HTML/CSS plano, desplegable en cualquier hosting estático gratuito (Netlify o Cloudflare Pages). Sin dominio propio por ahora: se usa el subdominio gratuito del hosting elegido.

Se eligió Eleventy sobre HTML plano por el volumen esperado de páginas de oferta (una por vídeo, ritmo alto): con HTML plano, cada página duplicaría cabecera/menú/Telegram, haciendo el mantenimiento inviable a ese ritmo. Con Eleventy, esos bloques viven en una única plantilla compartida.

Estructura de carpetas:

```
la-maleta-lista/
├── _includes/
│   └── layout.njk          # plantilla base compartida: header (logo), redes, Telegram, footer
├── _data/
│   └── afiliados.js         # links base de seguro (Heymondo) y coche (DiscoverCars), reutilizados en todas las ofertas
├── ofertas/
│   ├── praga-noviembre.md
│   ├── marrakech-diciembre.md
│   └── ...
├── index.njk                 # home / landing
├── style.css                 # paleta y tipografía de marca
└── logo/                     # las 3 variantes del logo (horizontal, apilado, icono)
```

## Marca aplicada

- Nombre: **La Maleta Lista**
- Paleta: azul vuelo `#1B4B66` (principal), coral atardecer `#FF6B4A` (acento/CTA), arena cálida `#F7F1E8` (fondo), verde brújula `#3E7C74` (secundario), tinta noche `#1B2430` (texto).
- Tipografía: **Fraunces** para titulares/logo, **Work Sans** para cuerpo de texto.
- Logo: 3 variantes ya generadas (horizontal, apilado, icono solo), fondo transparente, mismo azul en las tres.

## Landing (home)

Página única, sin listado de ofertas (decisión explícita: no hay contenido todavía, y añadir el listado más adelante es una plantilla nueva sobre los mismos datos, no una reconstrucción). Tres bloques:

1. **Cabecera**: logo horizontal + tagline ("Cada semana busco las mejores ofertas de vuelos, hoteles y escapadas por Europa para que tú solo tengas que hacer la maleta"). Fondo arena, texto tinta noche.
2. **Redes**: botones a TikTok, Instagram y Facebook, acento coral.
3. **Telegram**: bloque destacado de captura de contacto ("Recibe los chollos antes que nadie"), mismo tratamiento visual que en la página de oferta, para consistencia entre plantillas.

Antes de solicitar el alta en los programas de afiliados, se publican 2-3 ofertas de ejemplo usando la plantilla de oferta (ver abajo), para que la web no se vea vacía durante la revisión.

## Página de oferta (plantilla más usada)

Orden de contenido, de arriba a abajo:

1. **Foto de cabecera**: imagen del destino a ancho completo, con el nombre del destino superpuesto en tipografía de marca.
2. **Opciones**: lista de combinaciones salida/fecha/precio, ordenadas por precio.
3. **CTA principal**: botón "Ver oferta" hacia el afiliado de vuelo/hotel (eDreams/Booking), con UTM.
4. **Enlace secundario**: "¿No te encajan estas fechas? Busca otras fechas para {destino} →", hacia una búsqueda del destino sin fechas fijas (para no perder a quien quiere el destino pero no esas fechas exactas).
5. **Extras**: tres tarjetas — Seguro de viaje (Heymondo), Alquiler de coche (DiscoverCars), Actividades en {destino} (Civitatis).
6. **Telegram**: mismo bloque de captura que en la home, como red de seguridad final.

### Esquema de datos de una oferta

Cada oferta es un archivo markdown en `ofertas/` con front matter:

```yaml
---
destino: "Praga"
imagen_cabecera: "/img/praga-hero.jpg"
opciones:
  - salida: "Madrid"
    fecha: "12-15 noviembre"
    precio: "49€"
  - salida: "Barcelona"
    fecha: "10-13 noviembre"
    precio: "39€"
link_afiliado: "https://tuenlace.com/praga?utm_source=tiktok&utm_content=praga-nov"
civitatis_url: ""        # opcional — si vacío, cae a búsqueda genérica de Civitatis por destino
buscar_fechas_url: ""    # opcional — si vacío, se genera una URL de búsqueda genérica por destino
---
Texto libre opcional sobre la oferta.
```

Los links de **seguro** y **coche** no van en cada archivo: viven una vez en `_data/afiliados.js` (son el mismo enlace base en todas las ofertas, solo varía el UTM, que se genera automáticamente a partir de `destino`). Esto mantiene el coste de crear una oferta nueva en: una foto + rellenar 4-6 campos.

### Resolución de campos opcionales

- `civitatis_url` vacío → se enlaza a la búsqueda de actividades de Civitatis usando `destino` como término de búsqueda.
- `buscar_fechas_url` vacío → se enlaza a una búsqueda genérica (eDreams o Skyscanner) usando `destino`, sin fechas fijas.
- Si `opciones` está vacío o falta algún campo dentro de una opción, esa opción no se renderiza (no se rompe la página por una fila incompleta).

## Flujo para publicar una oferta nueva

1. Crear un archivo `.md` nuevo en `ofertas/` con los campos del esquema.
2. Añadir la imagen de cabecera a `img/`.
3. Ejecutar el build de Eleventy (deploy automático si está conectado a Netlify/Cloudflare Pages vía repo Git).
4. La página queda disponible en su propia URL, con cabecera, opciones, CTAs y extras ya aplicados desde la plantilla compartida.

## Testing / verificación

- Revisión visual manual de cada plantilla (landing y oferta) en escritorio y móvil antes de publicar el sitio.
- Verificar que los links de afiliado y UTM apuntan correctamente (clic de prueba antes de publicar cada oferta).
- Comprobar que el sitio carga y no aparece como "en construcción" antes de solicitar el alta en los programas de afiliados.

## Decisiones explícitamente diferidas

- Listado de ofertas en home (agregador tipo ViajerosPiratas): añadir cuando haya 5-10 ofertas reales publicadas.
- Dominio propio: comprar si la prueba avanza; por ahora subdominio gratuito del hosting.
- Chat IA, comparador propio, buscador integrado, newsletter más allá de Telegram: fuera de alcance, considerados "ruido/hype" en la fase actual del proyecto.
- Aviso de cookies / banner de consentimiento RGPD: pendiente de añadir antes de tener tráfico en volumen (ahora mismo GA4 y Clarity están activos sin banner de consentimiento).

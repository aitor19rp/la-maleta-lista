# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Seguidores de la cuenta de TikTok/Instagram/Facebook La Maleta Lista (la cuenta original tenía 17,1K seguidores en TikTok). Entran sobre todo desde el móvil, desde un vídeo o desde la bio. Hay dos situaciones por igual:
- Vienen de un vídeo concreto y quieren ver ese chollo y pulsar "Ver oferta".
- Entran a la home a explorar y comparar varias ofertas.

## Product Purpose

Publicar cada día un chollo de vuelo o escapada que sale de España, con precio comprobado, y llevar al visitante a reservar a través de un enlace de afiliado. El éxito se mide en clics a "Ver oferta" y en reservas (Skyscanner para vuelos, Trivago para hoteles; también hay enlaces de eDreams, lastminute, Logitravel y otros).

## Positioning

"Chollos de vuelos y viajes que salen de España: precios que parecen un error." Cada oferta está verificada a mano (precio, aerolínea, hotel mínimo 4/5) antes de publicarse.

## Operating Context

- Una página por oferta (`ofertas/*.md` con datos en la cabecera y `ofertas.json`), con opciones de fecha y precio, botón principal "Ver oferta", enlaces secundarios para buscar otras fechas, otros aeropuertos o solo vuelo, y extras (coche, actividades, seguro).
- La home lista las ofertas por la última verificada.
- Se quiere automatizar la publicación: la web se actualiza sola al añadir una oferta, y el canal de Telegram se publica a la vez.
- Despliegue estático (Eleventy) en Cloudflare Pages, repositorio en GitHub.
- Analítica: Google Analytics 4 y Microsoft Clarity.

## Capabilities and Constraints

- Stack existente: Eleventy con plantillas Nunjucks y CSS en un solo archivo (`style.css`). No introducir un framework nuevo sin acordarlo.
- Los enlaces de afiliado llevan seguimiento propio por oferta (`clickref` en Awin, `sid` en CJ); no se debe romper al tocar plantillas.
- La mayoría de visitas son móviles: la página de oferta debe funcionar bien con una mano y conexión móvil.
- Programa de afiliados que no permiten ciertas prácticas: sin cuentas atrás ni urgencia falsas, y el precio debe mostrar la fecha de comprobación.
- Queda por decidir: si se añade una página de enlaces (sustituto de Linktree) y una sección de preguntas frecuentes.

## Brand Commitments

- Nombre: La Maleta Lista.
- Se conservan el logo (`logo/horizontal.png`, `logo/icono.png`) y los colores de marca: azul vuelo `#1B4B66`, coral `#FF6B4A`, arena `#F7F1E8`, verde brújula `#3E7C74`. Decisión del usuario.
- El usuario facilitará webs de ejemplo para replicar su diseño; esas referencias son vinculantes cuando las envíe.
- Sensación buscada al llegar: ganas de viajar.

## Evidence on Hand

- Fotos de destino con licencia en `img/` (Berlín, Bruselas, Marrakech, Milán, Múnich, Praga, Roma, Tenerife) y una foto de portada.
- No hay testimonios, reseñas de clientes ni cifras de ventas que mostrar. No inventarlos.

## Product Principles

1. El destino manda: la fotografía y la sensación de viaje van antes que el precio, pero el precio y el botón nunca se esconden.
2. Pensado para el móvil primero, para quien viene de un vídeo y quiere actuar en pocos segundos.
3. La confianza viene de datos reales (fecha de comprobación, aerolínea, qué incluye), no de trucos de urgencia.
4. Cada oferta nueva se añade sin tocar diseño: el diseño debe aguantar ofertas con distintos datos y fotos.

## Accessibility & Inclusion

Idioma: español de España. Contraste y tamaños legibles en móvil al sol. Sin requisito legal específico indicado.

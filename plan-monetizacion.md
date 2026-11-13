# Plan de monetización de La Maleta Lista (30/60/90 días)

Origen: `La_Maleta_Lista_Plan_Accion_Monetizacion_2026-11-13.pdf` (Descargas). Inicio: 2026-11-13. Los datos del PDF son los que pasaste tú; las proyecciones son escenarios, no garantías.

Apartado: la prospección a hoteles y marcas (`prospectos-colaboraciones.md`) queda aparcada y no forma parte de este plan por ahora.

## Objetivo
Medir qué tráfico vale dinero y priorizar ingreso por clic/redirect y acuerdos fijos o híbridos, sin depender de reservas ni mostrar la cara.

## Regla de oro
No llamar CPC a un EPC (ingreso medio por clic) si depende de ventas. Distinguir siempre: CPC real, pago por redirect, CPA/CPS, patrocinio fijo, híbrido.

## Estado de partida (lo que ya sabemos del proyecto)
| Dato | Valor | Fuente |
|---|---|---|
| TikTok | 10-50 k seguidores, ~2,5 M "visualizaciones" 28 días (métrica por confirmar) | PDF |
| Telegram | ~200 suscriptores, 50-100 vistas/post a 24 h | PDF |
| Web | ~1.500 usuarios activos, 53 s interacción | PDF |
| Trivago (TradeTracker) | 82,99 EUR, 73 ventas | informe 2026-11-13 |
| Spalopia (TradeTracker) | 0 ventas, paga por venta no por clic | informe 2026-11-13 |
| Skyscanner (Impact 13416) | redirect 25% -> 55% del 7 al 19 dic 2026 | captura 2026-11-13 |

## Tracking actual (revisado en el código)
- La web ya envía a GA4 el evento `affiliate_click` con `provider`, `offer_id`, `button_position`, `link_domain` (`_includes/layout.njk:110`). Eso cubre "clics salientes por oferta y proveedor".
- Cada enlace de afiliado lleva nombre de oferta (`clickref`, `subId1`, `r`), pero **no el canal**: no sabemos si el clic vino de Telegram, TikTok o la web.
- Los posts de Telegram enlazan a `lamaletalista.site/<slug>` **sin UTM** (`telegram/mensaje.js:53`), así que en GA4 los visitantes de Telegram no se separan de otros.
- Hueco principal: sin UTM no hay CTR por canal ni RPM por publicación.

## Fase 1: días 1-7 (13-20 nov) - medir
| Tarea | Quién | Estado |
|---|---|---|
| Hoja de control `hoja-control.csv` con las columnas del PDF | Claude | hecho (vacía, lista para rellenar) |
| Añadir UTM a los enlaces de Telegram: `?utm_source=telegram&utm_medium=social&utm_campaign=<slug>` | Claude | pendiente de tu OK (toca código que se publica) |
| Convención de IDs: `CANAL_CATEGORIA_OFERTA`, p. ej. `TG_CITY_BUDAPEST_20261114` | Claude | definida, aplicar a nuevas ofertas |
| Exportar Impact por SubID1 (clics, clics únicos, earnings, validaciones) | Tú | pendiente |
| Exportar TradeTracker por campaña (clics, transacciones, comisión, tipo de pago) | Tú | pendiente |
| GA4: sesiones, páginas vistas, fuente/medio, landing pages, `affiliate_click` | Tú (captura/CSV) | pendiente |
| TikTok Analytics: nombre exacto de la métrica 2,5 M, seguidores exactos, mediana de vistas de 10-20 vídeos, clics de bio | Tú | pendiente |
| Telegram: vistas a 24 h y 48 h por post | Tú | pendiente |
| Comprobar si TradeTracker/Impact aprueban Telegram y TikTok como fuentes | Tú (soporte de cada red) | pendiente |

Resultado esperado: mapa de campañas CPC/CPA y línea base de clics, ingresos y canales.

## Fase 2: días 8-15 (21-28 nov) - experimento de 20 publicaciones
- 20 publicaciones comparables: 5 vuelos, 5 hoteles, 5 escapadas, 5 spas, cada una con enlace diferenciado, solo si hay inventario real.
- 1-2 posts diarios en Telegram, con el calendario semanal del PDF (sección 5). Probar dos llamadas a la acción.
- Medir a 24 h y 72 h; registrar en `hoja-control.csv`.
- Aviso: ahora mismo el flujo publica sobre todo vuelos y escapadas; hoteles y spas con inventario real pueden ser difíciles de llegar a 5 cada uno.
- Resultado: CTR de salida y RPM por categoría y formato.

## Fase 3: días 16-30 (29 nov - 13 dic) - priorizar
- Ranking de anunciantes y categorías por EPC, RPM y beneficio neto.
- Quedarse con 2-3 campañas rentables. No cambiar una CPA por otra solo porque tenga más clics.
- Skyscanner paga 55% de redirect del 7 al 19 dic: aprovechar vuelos en esa ventana y medir el efecto.
- Media kit con las cifras ya confirmadas (necesita URL y @).
- Telegram: objetivo 350-500 miembros; vistas de 100-150 por post.

## Fase 4: días 31-60 (14 dic - 12 ene)
- Piloto pagado solo si se cierra algo (aparcado hasta que se retome la prospección).
- Mejorar páginas de oferta (fecha de actualización, condiciones) y captación a Telegram en portada y artículos.
- Newsletter con consentimiento: solo probar, con baja fácil.
- Repetir las categorías de mayor RPM.

## Fase 5: días 61-90 (13 ene - 13 feb)
- Renegociar con resultados, documentar SOP de publicaciones, revisar TikTok One (briefs faceless).
- TikTok Shop solo si el producto encaja.

## Lo que no se hace ahora
Creator Rewards con vídeos de 10 s, suscripción premium, 5-10 posts diarios en Telegram, pagar por tráfico o seguidores, prometer 2,5 M de impresiones a un anunciante.

## Fórmulas
- CTR de salida = clics salientes / visualizaciones x 100
- EPC = ingresos aprobados / clics válidos
- RPM de publicación = ingresos aprobados / visualizaciones x 1.000
- Beneficio neto = ingresos cobrados o aprobados - costes de producción y herramientas

## Cumplimiento
Marcar afiliación en cada post (ya hay aviso en la web; el PDF recomienda también en el post de Telegram), no usar urgencia falsa, comprobar fuentes admitidas por contrato, cookies/privacidad en la web.

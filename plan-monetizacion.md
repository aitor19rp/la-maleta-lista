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
| Exportar Impact por SubID1 (clics, clics únicos, earnings, validaciones) | Tú | hecho 2026-11-13 (ver línea base) |
| Exportar TradeTracker por campaña (clics, transacciones, comisión, tipo de pago) | Tú | hecho 2026-11-13 (ver línea base) |
| GA4: sesiones, páginas vistas, fuente/medio, landing pages, `affiliate_click` | Tú (captura/CSV) | hecho 2026-11-13 salvo `affiliate_click` (ver línea base) |
| TikTok Analytics: nombre exacto de la métrica 2,5 M, seguidores exactos, mediana de vistas de 10-20 vídeos, clics de bio | Tú | pendiente |
| Telegram: vistas a 24 h y 48 h por post | Tú | pendiente |
| Comprobar si TradeTracker/Impact aprueban Telegram y TikTok como fuentes | Tú (soporte de cada red) | pendiente |

Resultado esperado: mapa de campañas CPC/CPA y línea base de clics, ingresos y canales.

## Fase 2: días 8-15 (21-28 nov) - prueba de spas y hoteles (cambio de planteamiento 13 nov)
- Se descarta el experimento de 20 publicaciones comparables (5 vuelos, 5 hoteles, 5 escapadas, 5 spas).
- Nuevo planteamiento: prueba de 5 días (13-17 nov), mínimo 1 post al día de spa/hotel/similar en Telegram. El día 1 es el post de hoy (Burgo de Osma, 13 nov 12:43). Llevamos 1 de 5.
- Medir a 24 h y 72 h en `hoja-control.csv` (una fila por post, con UTM por oferta).
- Resultado: qué formato y categoría dan más clics salientes por visualización.

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

## Línea base (exportes del 2026-11-13)
Fuentes: `ga4.csv` (16 oct - 12 nov), `impact.csv` y `campañatt.csv` (TradeTracker). Los dos de afiliación no indican el periodo ni la moneda: confirmarlos. Ningún archivo es de TikTok.

**Web (GA4, 16 oct - 12 nov):** 1.546 usuarios activos (1.540 nuevos), ~2.130 sesiones, 53,9 s de interacción media. Origen de las sesiones: directo 2.051 (96%), Google orgánico 55, TikTok 8, TradeTracker 7, Telegram (t.me) 1.

**Ingresos por red**
| Red | Clics | Ventas/acciones | Ingreso | Notas |
|---|---|---|---|---|
| TradeTracker, Trivago España | 1.477 raw / 1.384 únicos | 74 ventas | 83,26 EUR | CTR 21,21%, EPC 0,06, GPC 1,13 |
| TradeTracker, Spalopia | 4 raw / 3 únicos | 0 | 0 EUR | |
| Impact, Skyscanner | 383 raw / 247 válidos | 52 acciones | 4,04 (moneda por confirmar, contrato en GBP) | EPC ~0,016 por clic válido |

Conclusión provisional: Trivago aporta ~95% del ingreso medido. Skyscanner genera clics pero casi no paga; el 55% de redirect del 7 al 19 dic mejora la tarifa pero sobre este volumen seguirá siendo pequeño.

**Skyscanner por destino (raw clics / ingreso):** Londres 86 / 0,31, Budapest 62 / 0,85, Roma 48 / 0,22, Dublín 36 / 0,31, París 25 / 0, Ámsterdam 23 / 0,02, Milán 22 / 0,12, Gdansk 6 / 1,67 (muestra mínima). París y Frankfurt: clics sin ingreso.

**Páginas más vistas (GA4):** portada 1.531, Belmonte 1.037 (765 usuarios), Budapest 244, Roma 199, Londres 111. Belmonte concentra la mayor parte del tráfico de ofertas.

**Ciudades:** Madrid 302, Valencia 219, Barcelona 127, Sevilla 53, Málaga 34.

**Qué dice sobre el plan**
- El 96% del tráfico es "directo": TikTok y Telegram no se están viendo. TikTok figura con solo 8 sesiones frente a ~2,5 M de visualizaciones (por confirmar). Falta poner UTM en el enlace de la bio de TikTok y en el de invitación de Telegram.
- Trivago registra "ventas" con 83,26 EUR y "Clics Comisión" a 0: confirmar en las condiciones de la campaña si cada venta es una reserva o un click-out a la web del hotel, para saber si es CPA o equivale a pago por clic.
- Faltan: GA4 `affiliate_click` por oferta, TikTok Analytics y vistas de Telegram.

## Origen del tráfico: enlaces con UTM para poner en cada sitio (2026-11-13)
Hallazgos: los posts de Telegram ya llevan UTM; la bio de TikTok, la descripción del canal de Telegram y YouTube/Instagram no. La web solo mide si la persona acepta cookies (`_includes/layout.njk`), y los navegadores integrados de TikTok y Telegram no envían referrer, por eso casi todo sale como "directo". Las redirecciones de la web conservan los UTM (probado).

| Dónde ponerlo | Enlace |
|---|---|
| Bio de TikTok (si apunta a la web) | `https://lamaletalista.site/?utm_source=tiktok&utm_medium=social&utm_campaign=bio` |
| Descripción del canal de Telegram | `https://lamaletalista.site/?utm_source=telegram&utm_medium=social&utm_campaign=descripcion` |
| Descripción de YouTube | `https://lamaletalista.site/?utm_source=youtube&utm_medium=social&utm_campaign=descripcion` |
| Bio de Instagram | `https://lamaletalista.site/?utm_source=instagram&utm_medium=social&utm_campaign=bio` |

Telegram ya separa las altas por enlace de invitación (`_data/site.js`: portada, ficha, tiktok, guia): ver Telegram > Estadísticas > "Unidos por enlace de invitación".

## Qué falta de TikTok (para el media kit y para saber cuánto vale cada vídeo)
1. Nombre exacto de la métrica de los 2,5 M (captura de TikTok Studio > Analytics > Resumen, 28 días, con la etiqueta visible).
2. Seguidores exactos y crecimiento neto en 28 días.
3. Visualizaciones de los últimos 10-20 vídeos (para la mediana, no el récord viral).
4. Origen de las visualizaciones (Para ti, Seguidores, Perfil, Búsqueda).
5. Seguidores: países, edad, sexo.
6. Adónde apunta ahora el enlace de la bio y si Analytics muestra clics en el enlace.

## TikTok (capturas del 2026-11-13, 28 días, 15 oct - 11 nov, hora UTC)
- Métrica de los 2,5 M: **"Visualizaciones de la publicación"** (visualizaciones de vídeo, no usuarios). Más 2.341.108 frente al periodo anterior (17 sep - 14 oct).
- Visualizaciones de perfil: 27.500. Me gusta 24.000. Comentarios 2.300. Veces compartido 15.600. Recompensas estimadas: 0,00 EUR.
- Espectadores: 1,4 M en total (1,3 M nuevos), es decir ~1,8 visualizaciones por persona.
- Seguidores: 25.737 en total; netos +7.800 en 28 días (+1.816,7%).
- Forma de la curva: pico a finales de octubre y descenso después; casi todo el alcance viene de unos pocos días. Aún faltan las vistas por vídeo (pestaña Contenido), origen de las visualizaciones, y sexo/edad/ubicación.
- Embudo: 27.500 visitas al perfil -> solo 8 sesiones etiquetadas como TikTok en GA4.

### Enlace de la bio: https://tiktok.lamaletalista.site
Es una página intermedia (no está en este repositorio). Dentro de TikTok enseña las instrucciones "Abrir en el navegador" y un botón "Copiar enlace"; fuera de TikTok en móvil redirige a `https://lamaletalista.site/` **sin UTM**, y el botón copia esa misma dirección sin UTM. Por eso las visitas llegan como "directo". Arreglo: en su script cambiar `const destino = 'https://lamaletalista.site/';` por `'https://lamaletalista.site/?utm_source=tiktok&utm_medium=social&utm_campaign=bio'`. Además tiene un botón a `t.me/lamaletalista` (Telegram) que también va sin etiquetar: usar el enlace de invitación `https://t.me/+Ruuu6G1avtwyNDM8` para ver las altas desde TikTok en las estadísticas de Telegram.

### TikTok: audiencia y contenido (capturas del 2026-11-13, horas en UTC)
- **Seguidores por país:** España 75,8%, Rumanía 10,5%, Francia 0,3%, Italia 0,3%, Suiza 0,2%. Rumanía llama la atención con contenido en español (revisar).
- **Edad:** 18-24 2,6%; 25-34 14,1%; 35-44 26,7%; **45-54 36,7%**; 55+ 19,9%. **Sexo:** mujeres 70%, hombres 30%.
- **Origen de las visualizaciones (28 días):** Para ti 96,2%, perfil 2,7%, búsqueda 1,0%, siguiendo 0,1%, sonido 0%. Todo el alcance depende del algoritmo, no de seguidores propios. Pico diario: ~491 mil visualizaciones.
- **Visualizaciones por vídeo** (lo que se ve en la parrilla; lista incompleta, solo 9 vídeos; los 3 anclados son virales): Hotel rural Cuenca 1 M (anclado), Marrakech 560,3 mil (anclado), Roma finde 533,5 mil (anclado), Milán Nochevieja 85,8 mil, París 68,7 mil, Roma mercados 44,9 mil, Alemania 23,1 mil, Budapest 3.575, Bruselas 2.393.
- **Mediana:** 68,7 mil con los 9 vídeos; **34 mil sin los 3 virales** (la cifra realista para tarifas). Hay que completar con la lista de 28 días de la pestaña Contenido.
- **Embudo (28 días):** 1,4 M espectadores -> 27.500 visitas al perfil (~2%) -> 8 sesiones etiquetadas TikTok en GA4. El vídeo de Cuenca (1 M) coincide con Belmonte como segunda página más vista (1.037 vistas) y el mayor ingreso de Trivago (36,62 EUR del informe).
- **Ingreso aproximado por 1.000 visualizaciones de TikTok:** ~0,035 EUR (83,26 Trivago + 4,04 Skyscanner, ~87 EUR entre 2,5 M), suponiendo que todo viene de TikTok; es una cota, no un dato medido.

### TikTok: top 10 de vídeos por visualizaciones en 28 días (captura 2026-11-13)
Corrige el apartado anterior: las cifras de la parrilla de perfil son visualizaciones de toda la vida del vídeo; estas son solo de los últimos 28 días.

| # | Vídeo | Vis. 28 días | Publicado |
|---|---|---|---|
| 1 | Hotel rural 5★ Cuenca | 1 M | hace 3 sem. |
| 2 | Roma fin de semana (170 EUR) | 335 mil | hace 3 sem. |
| 3 | Mercados navideños Budapest (163 EUR) | 308 mil | hace 2 sem. |
| 4 | Hotel cueva Granada, "Santorini sin avión" (107 EUR) | 159 mil | hace 2 sem. |
| 5 | Londres puente de diciembre (194 EUR) | 91 mil | hace 2 sem. |
| 6 | Mallorca fin de semana (78 EUR) | 79 mil | hace 2 sem. |
| 7 | Nochevieja Milán (168 EUR) | 77 mil | hace 3 días |
| 8 | Mercados navideños París (186 EUR) | 66 mil | hace 5 días |
| 9 | Festival de luces Ámsterdam (152 EUR) | 48 mil | hace 2 sem. |
| 10 | Finde low cost Dublín (74 EUR) | 38 mil | hace 1 sem. |

- Los 10 suman ~2,2 M de los 2,5 M (~88%): el alcance está concentrado en pocos vídeos. El hotel rural de Cuenca por sí solo es ~40%.
- Mediana: no se puede calcular con exactitud sin saber cuántos vídeos se publicaron en 28 días. El valor de referencia para tarifas es ~35-40 mil (los vídeos fuera del top 10 tienen menos de 38 mil), no el de los virales.
- Visitas web aproximadas por 1.000 visualizaciones del vídeo (páginas de oferta GA4 / visualizaciones): Cuenca-Belmonte ~1,0; Budapest ~0,8; Londres ~1,2; Roma ~0,6. Orden de magnitud: ~1 visita a la web por cada 1.000 visualizaciones (solo cuentan visitas con cookies aceptadas).
- Temas que funcionan: hoteles/cuevas únicos en España (Cuenca, Granada) y escapadas urbanas de fin de semana con precio claro.

### TikTok: cálculo de la mediana (27 vídeos en 28 días, dato del usuario)
- Media: 2,5 M / 27 = ~93 mil por vídeo (inflada por los virales; no usar como tarifa).
- Los 10 primeros suman ~2,2 M; los otros 17 se reparten ~0,3 M, es decir ~18 mil de media y cada uno por debajo de 38 mil.
- Mediana = vídeo nº 14 de 27 (el 4º de los 17 restantes): estimación **~15-25 mil visualizaciones**. Es una estimación; no hay lista de los puestos 11-27.
- Para una tarifa usar ~20 mil como "vídeo normal" y 91-335 mil como "vídeo que funciona", y avisar al anunciante de que el alcance depende del algoritmo (96% Para ti).


## Datos de Telegram (13 nov 2026, estadísticas del canal)
- Seguidores: 194 (+33, +20,5% del 5 al 12 nov). Notificaciones activadas: 86,6%. Vistas por post: 87 (-61, -41,2% frente al periodo anterior).
- Altas diarias: pico de 26 hacia el 30 oct; ahora 3-8 al día. Bajas casi nulas (0-2).
- Origen de las vistas: sobre todo seguidores; el resto por URL (enlaces), con algo de "otros", búsqueda y mensajes directos. Altas nuevas: casi todas por URL (enlaces de invitación).
- Idioma: español casi total (algo de catalán, italiano, francés, ucraniano).
- Horas con más vistas (UTC, 6-12 nov): pico 17-18 UTC (hacia las 18:00-19:00 en España) y segundo pico 11-12 UTC (12:00-13:00). Mínimo de 00:00 a 06:00 UTC.
- Interacción: compartidos 0-1 al día, reacciones 1-2 en dos semanas. Casi nadie reacciona.
- Últimos posts (vistas en el momento de la captura): 6 nov vuelo 113; 8 nov vuelo 108; 9 nov vuelo 106; 10 nov Milán 87; 11 nov Budapest 76 (1 reacción); 12 nov Roma 64; 12 nov Galatea (spa) 61; 13 nov Burgo (spa) 30 (publicado hace pocas horas).
- Lectura prudente: las vistas por post bajan según se acerca a hoy, pero los posts recientes llevan menos horas acumulando vistas. Hay que comparar a 24 h y 72 h, no con la cifra del momento.

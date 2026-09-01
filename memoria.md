# Memoria del proyecto — La Maleta Lista

Última actualización: 1 de septiembre de 2026

## Resumen

Relanzamiento de un proyecto de contenido de viajes con comisión de afiliado en TikTok/IG/FB. Cuenta original (@tripeconomy) tenía 17,1K seguidores y vídeos de hasta 500K+ visualizaciones, pero solo generó 2-3 ventas en toda su vida — el embudo era vídeo → Linktree → link de afiliado directo, sin landing propia ni tracking. Diagnóstico del primer consejo: el problema era de conversión/embudo, no de alcance.

## Decisiones clave

- **Nicho**: "Chollos de vuelos y viajes que salen de España — precios que parecen un error." Filtro: sale de España + precio anormalmente bajo (no importa duración ni fin de semana/entre semana).
- **Nombre de marca**: La Maleta Lista (cuenta de TikTok renombrada conservando seguidores/historial, no se creó de cero).
- **Duración de viaje objetivo**: 3-5 días (formato que ya funcionaba en la cuenta antigua).
- **Frecuencia de publicación objetivo**: 1 vídeo/día, mismo vídeo en TikTok/IG/FB. Si no es sostenible, bajar a 4-5/semana antes que fallar días sueltos.

## Lo construido

- **Web**: Eleventy (estático) desplegado en Netlify vía GitHub, CI/CD automático. Repo: github.com/aitor19rp/la-maleta-lista
- **Marca**: logo generado con IA (horizontal + icono), paleta (`#1B4B66` azul vuelo, `#FF6B4A` coral, `#F7F1E8` arena, `#3E7C74` verde), tipografía Fraunces + Work Sans.
- **Sistema de páginas de oferta**: una página por chollo, con foto real con licencia, opciones fecha/precio, CTA principal, "busca otras fechas" y "busca otros aeropuertos" (ambos monetizados vía afiliado, no se regalan a Google), extras (seguro/coche/actividades), captura de Telegram.
- **Tracking**: `clickref` de Awin y `sid` de CJ (NO utm genérico, eso no sirve para nada en estas redes). Cada oferta y cada fallback llevan tracking propio.
- **Analítica**: Google Analytics 4 + Microsoft Clarity, verificados funcionando en producción.
- **4 ofertas publicadas**: Praga, Marrakech, Tenerife (genéricas de prueba) y Roma (validada con proceso real completo: Google Flights "precio bajo" → confirmado en eDreams → comparado con mercado → hotel 4,2/5 elegido tras descartar dos peor valorados).

## Afiliados — estado

| Programa | Estado | Notas |
|---|---|---|
| eDreams (Awin) | ✅ Activo | Tracking con clickref funcionando |
| DiscoverCars | ✅ Activo | Aprobación instantánea |
| Booking (CJ) | ⏳ Pendiente | Revisión manual + verificación bancaria bloqueada |
| Civitatis | ⏳ Pendiente | Sin respuesta aún |
| Heymondo | ❌ Rechazado | Falta de tráfico/redes consolidadas |
| IATI | No solicitado | Decisión de esperar a tener tráfico |

## Rutina diaria de búsqueda de chollos

1. Google Flights → Explorar, sin destino fijo, fechas flexibles (prueba entre semana, suele ser más barato).
2. Entra en candidatos con precio bajo llamativo, confirma etiqueta "precios bajos" de Google Flights.
3. Descarta aerolíneas no vendibles (Ryanair, easyJet no suelen estar en eDreams/Booking).
4. Verifica el mismo precio en eDreams.
5. Compara con precios de mercado (Logitravel, Central de Vacaciones, etc.) como tercera validación.
6. Hotel: mínimo 4/5 de valoración, máximo ~5km del centro con buena conexión.
7. Descarta paquetes propios de otras webs (BuscounChollo, etc.) — no se pueden monetizar, solo sirven de inspiración de destino.

PDF completo con este proceso: `rutinadiariachollos.pdf`.

## Formatos de contenido (basados en análisis de vídeos reales de ViajerosPiratas/HolidayPirates)

- **Formato A** (rápido, 10-15s, solo texto): gancho sobre el lugar → escalada "es muy barato" → reveal del precio → CTA.
- **Formato B** (UGC con voz en off, 20-25s): cabecera fija con precio → narración describiendo el destino con subtítulos automáticos → b-roll variado → captura de "prueba" de la oferta → cierre.
- Instrucciones completas para generar guiones con estos formatos: ver proyecto de Claude dedicado (instrucciones en `instrucciones-proyecto-guiones.md`, entregado al usuario).
- Voz en off: ElevenLabs, misma voz siempre para reconocimiento de marca.

## Cuándo fiarse de las métricas

La cookie de afiliado de eDreams dura 60 días — un clic de hoy puede convertirse en venta semanas después.

- **2 semanas / 5 vídeos**: primera lectura de clics (no conversión).
- **4-6 semanas / 10 vídeos**: primera lectura de conversión (aún incompleta).
- **2-3 meses**: dato de conversión maduro, el primero en el que vale la pena tomar decisiones grandes (escalar, pivotar, parar).

No tomar decisiones grandes antes del punto de los 2-3 meses.

## Estimación de ingresos (honesta, no optimista)

- Escenario conservador (sin viralidad garantizada): ~120-240€/mes.
- Escenario si recupera algo de la viralidad histórica: ~750-1.500€/mes.
- Primer mes realista: podría ser 0-50€. No es un sueldo a corto plazo.

## Diagnóstico del segundo consejo (1 sept 2026)

Tras semanas de construcción, cero vídeos publicados con el sistema nuevo. El consejo diagnosticó desplazamiento de objetivo: "arregla el embudo antes de escalar" se convirtió en "construye el embudo perfecto antes de publicar" — patrón de evitación, no progreso real. Veredicto unánime: publicar ya, congelar todo desarrollo nuevo 2-3 semanas o hasta 5-10 vídeos publicados, definir de antemano la métrica que decide si el embudo funciona.

## Estado a fecha de esta memoria

- Primer vídeo (Roma) en montaje activo: clips reales grabados/descargados (`videos/roma/`: basílica, coliseo, panteón, trevi, Roma.mp4, voz en off grabada).
- Pendiente: terminar montaje en CapCut (subtítulos automáticos desde el audio), publicar en TikTok/IG/FB, anunciar en Telegram.
- Tras publicar: NO tocar código/afiliados nuevos hasta 5-10 vídeos publicados, según el checklist de "lo primero que hay que hacer" del segundo consejo.

## Notas técnicas para retomar el proyecto

- Placeholders pendientes de rellenar cuando existan: `afiliados.seguro` en `_data/afiliados.js` (activar `seguroActivo: true` cuando haya Heymondo/IATI real), links de Booking cuando se apruebe CJ, link de Civitatis cuando se apruebe.
- Filtros de tracking en `filters.js`: `clickrefLink` (Awin), `sidLink` (CJ), `civitatisUrl`, `buscarFechasUrl`, `buscarAeropuertosUrl` — todos con tests en `filters.test.js` (19 tests, todos pasando).
- Spec y plan originales del proyecto en `docs/superpowers/specs/` y `docs/superpowers/plans/`.

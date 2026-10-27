# Enlaces de afiliado que se usan para generar ofertas

Acordado el 2026-10-20. Todas las ofertas nuevas usan estos enlaces. En cada oferta solo cambia el nombre de seguimiento (el que va en negrita). No uses nunca `test`, `testkiwi` ni `testtrivago` en una oferta real.

## Vuelos con eDreams (Awin)
Va a la portada de eDreams. La guía de la oferta dice qué vuelo buscar.

```
https://www.awin1.com/cread.php?awinmid=10573&awinaffid=1692815&clickref=NOMBRE-OFERTA&ued=https%3A%2F%2Fwww.edreams.es%2F
```

- Nombre de seguimiento: `clickref`, por ejemplo `roma-20-22-noviembre`.
- Por qué la portada: eDreams bloqueó los enlaces con la búsqueda ya hecha.

## Vuelos con Skyscanner (Impact), desde el 27 de octubre de 2026
Va a la búsqueda de vuelos de skyscanner.es ya hecha. Redirect 25 % y Booking 40 % de lo que ingresa Skyscanner (contrato 13416, en libras).

```
https://skyscanner.pxf.io/c/5754733/1027991/13416?subId1=NOMBRE-OFERTA&u=URL-CODIFICADA&partnerpropertyid=6361569
```

- `u` es la URL de resultados de skyscanner.es con `%3A`, `%2F`, `%3F`, `%3D` y `%26` en vez de `:`, `/`, `?`, `=` y `&`. Ejemplo: `https://www.skyscanner.es/transporte/vuelos/mad/rome/270116/270118/?adultsv2=2&cabinclass=economy&rtn=1&preferdirects=true` (origen, destino, ida AAMMDD y vuelta AAMMDD).
- Nombre de seguimiento: `subId1`, por ejemplo `roma-mad`. Se ve en Impact, Informes, agrupando por SUBID1.
- Enlace base sin ruta: `https://skyscanner.pxf.io/JzgKkN`.
- Usa siempre el enlace corto o este formato. Nunca pegues la URL larga con `irclickid`.
- No uses `testroma` ni `romatest`: son de prueba.

## Vuelos con Kiwi.com (Travelpayouts), ya no se usa en ofertas nuevas
Va a la portada de Kiwi. Comisión del 3 %, no cuentan las reservas desde la app.

```
https://kiwi.tpo.lu/JmHgG2jt?sub_id=NOMBRE-OFERTA
```

- Sustituido por Skyscanner el 27 de octubre de 2026. Solo sigue en la oferta de Sofía, que se deja como está hasta que caduque. Está creado con el proyecto `la-maleta-lista.pages.dev` (el dominio actual de la web es `lamaletalista.site`).
- Nombre de seguimiento: `sub_id`. Se ve en Travelpayouts, en Informes, agrupando por SubID.
- Los enlaces antiguos (`66cUt6mt`, `qjG1n45A`, `LXW6Edl2`) ya no se usan.

## Buscador de vuelos de Skyscanner (widget)
Sale en cada página de oferta, en «¿Otras fechas u otro origen?», y en la portada. Solo se carga cuando la persona pulsa «Abrir el buscador de vuelos». Está en `_includes/oferta.njk` y `index.njk`. Sustituye al widget de Kiwi.

- Código de Skyscanner Partners (Travel Widget builder): `FlightSearchWidget`, es-ES, mercado ES, EUR, `data-associate-id="AFF_TRA_19354_00001"`, solo directos marcado, ida y vuelta, botón `#E9502D`.
- Seguimiento: `data-utm-term` con el nombre de la oferta sin guiones (Impact lo muestra como SubId2). En la portada, `portada`.
- Pendiente de confirmar con Skyscanner que el `associate-id` de tus enlaces vale para el widget.

## Hoteles con Trivago (TradeTracker)
Va a la página de un hotel concreto. Se paga por clic.

```
https://tc.tradetracker.net/?c=14416&m=12&a=478638&r=NOMBRE-OFERTA&u=%2Fes%2Facd%2Fhoteles-REGION-PAIS%3Fsearch%3D100-ID-HOTEL%3Bdr-AAAAMMDD-AAAAMMDD%3Bdrs-40%3Brc-1-2
```

- Nombre de seguimiento: `r`.
- Se obtiene buscando el hotel en trivago.es y copiando la URL de su página. Se quitan los parámetros `pceid` y `psrid`, que son de sesión.
- La `ñ` y otros acentos van codificados dos veces (`%25C3%25B1`).
- Ejemplo comprobado: Augusta Eco Wellness Resort, Sanxenxo, `search=100-156750`.

## Antes de publicar cualquier oferta
- Precio sin Prime, y fecha en que se comprobó.
- El vuelo no puede ser de Ryanair ni de easyJet. Excepción decidida el 27 de octubre de 2026: la oferta de Roma sí lleva vuelos de Ryanair y Wizz Air (los más baratos en Skyscanner), y debe decirlo en el consejo de reserva.
- Hotel con nota de 8,0 o más.
- Abrir los enlaces una vez y comprobar que llevan donde dicen.

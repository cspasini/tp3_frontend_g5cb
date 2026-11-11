# IFTS 29 — Front End 2026 — TP3

**Dos sentencias, dos soluciones**

| Dato | Valor |
| --- | --- |
| Institución | IFTS 29 — Instituto de Formación Técnica Superior N.º 29 |
| Materia | Front End 2026 |
| Comisión | B |
| Grupo | 5 |
| Bloque | S01-C — Vacantes y duplicados |
| Startup | ClickJr |
| Origen de la startup | Proyecto de estudiantes del IFTS 16 |
| Rubro | Empleo y desarrollo profesional |
| Modalidad de producción | 100 % agéntica |

ClickJr es un portal de empleo junior: ayuda a encontrar vacantes y a seguir el estado de las postulaciones. Este trabajo resuelve dos reglas de ese portal sin inventar resultados de selección y sin duplicar postulaciones.

## Integrantes y aportes

La modalidad del TP es agéntica: el código de `index.html`, `styles.css`, `script.js` y este README fue generado por el agente en Cursor. La tabla indica la responsabilidad de revisión que asume cada integrante sobre el resultado, no una autoría manual archivo por archivo.

| Integrante | Aporte |
| --- | --- |
| Álvaro Gabriel Mamani | Revisión de la sentencia R5: entradas, plazo vencido, marcado «En Revisión» y notificación sin resultado falso. |
| Rubén Darío Basconcelo | Revisión de la sentencia R6: clave `user_id` + `job_id`, bloqueo del duplicado y estado en vivo. |
| Juan Sebastián Páez Horvath | Revisión de semántica y acceso por teclado: encabezados, `details`/`summary`, foco visible y texto del simulador. |
| Sergio David Pasini Cabello | Integración del entregable: cuatro archivos, simulador de escenarios, créditos y registro de IA. |

## Cómo abrir el trabajo

No hay build ni dependencias. Hace falta el logo en `assets/logo.png`.

Abrir `index.html` en el navegador, o servir la carpeta:

```bash
python -m http.server 5500
```

Después entrar a `http://127.0.0.1:5500`.

La comprobación de las dos sentencias está en la sección **Comprobación técnica**. El selector resalta el camino en el diagrama y escribe el resultado en texto.

## Ficha lógica R5 — Plazo vencido sin respuesta

**Agente propuesto:** Agente Guardián de Plazos y Notificación Transparente.

**Sentencia:** Si vence el plazo de respuesta configurado para una vacante que sigue sin respuesta, el sistema la marca para revisión e informa la demora a sus postulantes, sin anunciar un resultado inexistente.

**Por qué esta solución.** Un postulante junior no puede distinguir el silencio de un rechazo. El agente nombra la demora real y mueve la vacante a una cola interna. «En Revisión» es un estado de seguimiento, no un resultado de selección. Por eso el flujo termina sin aprobar, rechazar ni contratar.

| Pieza | Definición |
| --- | --- |
| Entradas | ID de vacante, fecha límite configurada, estado de feedback, postulantes asociados, marca de tiempo de la última acción humana. |
| Condición | Verdadera solo si el plazo venció y la vacante sigue sin respuesta. |
| Consecuencia | Marcar «En Revisión», avisar la demora a los postulantes y no publicar un resultado inexistente. |
| Rama falsa | Si el plazo sigue vigente o ya hay respuesta, se mantiene el seguimiento habitual. |
| Caso límite | Si la vacante marcada sigue sin acción más de 48 h, el agente alerta a RRHH para intervención humana. |

## Ficha lógica R6 — Misma persona, misma vacante

**Agente propuesto:** Agente Validador de Duplicados y Estado en Vivo.

**Sentencia:** Si ya existe una postulación del mismo usuario a la misma vacante, el sistema muestra su estado e impide enviar otra.

**Por qué esta solución.** El duplicado no se resuelve con un mensaje genérico después de guardar. Se resuelve antes del insert, con la pareja `user_id` + `job_id`. Si esa pareja ya está, el botón de envío no llega a persistir y la pantalla muestra el estado del proceso que ya existe. Postularse a otra vacante, o que otra persona se postule a la misma, no es duplicado.

| Pieza | Definición |
| --- | --- |
| Entradas | `user_id`, `job_id`, intento de envío, tabla de postulaciones. |
| Validación | Existe un registro con esa pareja usuario + vacante. |
| Consecuencia | Bloquear el envío y renderizar la tarjeta con el estado actual. |
| Alternativa | Si no existe la pareja, habilitar el formulario de envío normal y guardar una sola postulación. |
| Casos que no bloquean | Mismo usuario en otra vacante, u otra persona en la misma vacante. |

## Decisiones de interfaz

- Escritorio primero, ancho máximo de 1100 px, tipografía Inter si está instalada y `system-ui` como respaldo. No se carga una fuente externa.
- Paleta de empleo tech: índigo `#0f172a` / `#1e293b`, cian `#0ea5e9`, teal `#06b6d4`, fondo `#f8fafc`, tarjetas `#ffffff`, borde `#e2e8f0`.
- La decisión se pinta en cian, la acción en blanco, la rama sí en verde y la rama no en naranja. La excepción de 48 h usa borde punteado ámbar.
- Cada camino activo agrega la palabra «Activo» y un texto en una región `status`, para no depender del color.
- Los `details` quedan abiertos de a varios. Cerrar los demás al abrir uno escondería contenido que la consigna pide leer.
- El JavaScript solo resalta escenarios y mueve el foco entre títulos de un mismo acordeón. Sin script, la página sigue completa.

## Registro de IA

| Campo | Registro |
| --- | --- |
| Herramienta | Cursor |
| Modelo | Grok 4.7 |
| Fecha | 11 de noviembre de 2026 |
| Alcance | Generación de los cuatro archivos del entregable. El logo ya estaba en `assets/logo.png`. |

### Prompt maestro inicial

El pedido que originó la generación fue producir, en modalidad 100 % agéntica y sin frameworks, el HTML, el CSS, el JavaScript y el README del TP3 «Dos sentencias, dos soluciones» para el Grupo 5 de la Comisión B (IFTS 29, Front End 2026).

Debía incluir:

- Hero con IFTS 29, Front End 2026, los cuatro integrantes, la tarjeta de ClickJr (`assets/logo.png`, rubro, portal de empleo junior, origen en el IFTS 16) y el bloque visible «Bloque S01-C: Vacantes y duplicados».
- Solución R5 con la sentencia textual del plazo vencido, el agente «Agente Guardián de Plazos y Notificación Transparente», su beneficio, el flujo Inicio → Consulta Cron Vacantes → ¿Plazo vencido Y sin respuesta? → rama sí (marcar «En Revisión» + notificar demora → fin) / rama no (seguimiento habitual → fin) / excepción de más de 48 h hacia RRHH, y un `details`/`summary` con entradas, condición, acciones y resultados.
- Solución R6 con la sentencia textual del duplicado, el agente «Agente Validador de Duplicados y Estado en Vivo», su beneficio, el flujo Inicio → Intento de postulación → Consulta DB postulaciones → ¿Existe `user_id` + `job_id`? → rama sí (bloquear envío + tarjeta de estado → fin) / rama no (formulario normal → fin), y un `details`/`summary` con entradas, validación y alternativas.
- Footer con repositorio, comprobación técnica y créditos.
- CSS desktop-first de la paleta indicada, flechas entre nodos y acordeón con foco visible.
- JavaScript vainilla: foco por teclado en los `summary` y un selector de escenarios que resalte el camino, incluyendo «Vacante vencida sin respuesta» y «Usuario ya postulado».
- README de nivel Propone, con carátula, fichas lógicas, registro de IA y enlaces para completar.

### Revisiones de diseño

1. La primera estructura separó hero, dos secciones y footer, y dejó las sentencias en `blockquote` para que el texto exigido no se mezcle con la propuesta.
2. El título de la segunda propuesta quedó en «Agente Validador de Duplicados y Estado en Vivo», y los beneficios se copiaron en la redacción final de la consigna.
3. La excepción de 48 h no se dibujó como un paso posterior al fin. Sale de la acción «En Revisión» como camino paralelo al cierre normal: o termina el aviso, o escala a RRHH si nadie actúa.
4. El selector cubre las dos ramas de cada sentencia, no solo los dos nombres de ejemplo, para poder comprobar también el plazo vigente y la primera postulación.
5. Se evitó un acordeón que cierre solo: en un trabajo para leer, varios `details` pueden permanecer abiertos.

### Mejoras implementadas

- Región `status` que explica el escenario en texto cuando el diagrama se resalta.
- Prefijo visible «Activo» en el nodo del camino elegido.
- Flechas arriba, abajo, Inicio y Fin entre los `summary` de cada solución, sin sacar el foco de ese grupo.
- `:focus-visible` en enlaces, selector, botón y títulos desplegables.
- `prefers-reduced-motion` para desactivar el desplazamiento suave.
- Mejora progresiva: sin `script.js` quedan las sentencias, los flujos y los desplegables.
- Enlaces institucionales a [IFTS 29](https://ifts29.edu.ar/) y [IFTS 16](https://ifts16.com/), más el [validador HTML del W3C](https://validator.w3.org/nu/).

## Enlaces para completar

Reemplazar estas URL en `index.html` (`#link-repo` y `#link-prod`) y en esta tabla cuando el grupo publique el trabajo.

| Recurso | URL |
| --- | --- |
| Repositorio de GitHub | `https://github.com/COMPLETAR-USUARIO/tp3-frontend-g5cb` |
| Despliegue en producción | `https://completar-despliegue.example.com` |
| Comprobación en la página | Sección `#comprobacion` del propio `index.html` |

## Archivos

| Archivo | Función |
| --- | --- |
| `index.html` | Estructura semántica, sentencias, diagramas y créditos. |
| `styles.css` | Paleta, diagramas, acordeón y foco visible. |
| `script.js` | Teclado de los desplegables y simulador de escenarios. |
| `assets/logo.png` | Logo local de ClickJr. |
| `README.md` | Carátula, fichas, registro de IA y enlaces. |

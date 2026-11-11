# IFTS 29 - Front End 2026

## TP3: Dos sentencias, dos soluciones

### 1. Enlaces del Proyecto

- **Landing en Producción (Vercel):** https://tp3frontendg5cb.vercel.app/
- **Repositorio (GitHub):** https://github.com/cspasini/tp3_frontend_g5cb

---

### 2. Startup y Asignación

- **Startup:** ClickJr (Proyecto original de estudiantes del IFTS 16)
- **Rubro:** Empleo y desarrollo profesional
- **Bloque Asignado:** S01-C — Vacantes y duplicados
- **Equipo:** Comisión B - Grupo 5

---

### 3. Integrantes y Aportes Individuales

- **Álvaro Gabriel Mamani:** Coordinación de la lógica proposicional, desglose analítico de las sentencias R5 y R6 y verificación de condiciones SÍ/NO.
- **Rubén Darío Basconcelo:** Supervisión de la estructura semántica de la landing y pruebas de accesibilidad por teclado (foco y apertura de componentes `<details>`).
- **Juan Sebastián Páez Horvath:** Control visual del layout desktop, comprobación de legibilidad del logo y de los diagramas de flujo sin desbordes.
- **Sergio David Pasini Cabello:** Configuración del entorno de trabajo con agentes en Cursor, control de versiones en Git, despliegue en Vercel y gestión de prompts iterativos.

*Nota de colaboración (Nivel Propone):* Durante la primera revisión conjunta en desktop, el equipo detectó que los diagramas requerían una diferenciación más evidente en los caminos de excepción (intervención humana en R5 y bloqueo de postulación en R6). Se ajustaron las instrucciones al agente para incluir etiquetas y estados visuales explícitos, mejorando la comprensión inmediata sin sobrecargar la lectura.

---

### 4. Análisis de Lógica de las Sentencias

#### Frase 1 (R5)

- **Sentencia Original:** "Si vence el plazo de respuesta configurado para una vacante que sigue sin respuesta, el sistema la marca para revisión e informa la demora a sus postulantes, sin anunciar un resultado inexistente."
- **Datos de entrada:** ID de vacante, fecha límite configurada, estado de respuesta de la empresa, listado de postulantes asociados.
- **Condición:** ¿Fecha actual > Fecha límite Y estado_respuesta == sin_respuesta?
- **Consecuencia (SÍ):** Cambiar estado a "En revisión" y enviar notificación de demora informativa a postulantes.
- **Excepción / Humano:** Si tras la alerta persiste sin respuesta por más de 48 hs, se deriva a intervención manual del equipo de soporte.

#### Frase 2 (R6)

- **Sentencia Original:** "Si ya existe una postulación del mismo usuario a la misma vacante, el sistema muestra su estado e impide enviar otra."
- **Datos de entrada:** ID de usuario, ID de vacante, historial de postulaciones.
- **Condición:** ¿Existe registro previo con (user_id, job_id)?
- **Consecuencia (SÍ):** Bloqueo de nuevo envío y renderizado del estado actual de la postulación existente.
- **Alternativa (NO):** Permitir la carga y envío del formulario regular.

---

### 5. Registro de Herramientas de IA y Construcción Agéntica

- **Entorno / Aplicación:** Cursor
- **Modelo:** Grok 4.7 High Fast (declarado según el selector de la plataforma)
- **Metodología 100% Agéntica:** El equipo no editó código manualmente. Todo el código HTML, CSS, JS y la documentación fue generado, estructurado e iterado mediante instrucciones al agente.
- **Evidencia de Iteración:**
  - *Instrucción Inicial:* Se solicitó la estructura semántica base, diagramas de flujo con divs/CSS y componentes accesibles para ambas sentencias.
  - *Problema Detectado:* Se requería asegurar que los diagramas fueran legibles en desktop sin librerías externas pesadas y con manejo claro de excepciones.
  - *Refinamiento:* Se instruyó al modelo para consolidar los estilos en variables CSS nativas, ordenar las flechas con pseudo-elementos limpios y dejar los desplegables funcionales por teclado.

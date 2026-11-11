"use strict";

const SCENARIOS = {
  "r5-yes": {
    flow: "r5",
    text: "Vacante vencida sin respuesta. El cron consulta la vacante, la condición es verdadera y el agente la marca En Revisión, informa la demora y termina. No publica un resultado de selección que no existe."
  },
  "r5-no": {
    flow: "r5",
    text: "Vacante dentro de plazo. La consulta encuentra que el plazo no venció o que ya hay respuesta. El sistema mantiene el seguimiento habitual y no envía un aviso de demora."
  },
  "r5-exception": {
    flow: "r5",
    text: "La vacante ya estaba vencida y sin respuesta, fue marcada En Revisión, y pasaron más de 48 horas sin acción. El agente alerta a RRHH para una intervención humana."
  },
  "r6-yes": {
    flow: "r6",
    text: "Usuario ya postulado. Existe un registro con el mismo user_id y el mismo job_id. El sistema bloquea un nuevo envío y muestra el estado actual de esa postulación."
  },
  "r6-no": {
    flow: "r6",
    text: "Primera postulación a la vacante. No hay registro de esa pareja usuario y vacante. El formulario de envío normal queda habilitado."
  }
};

const IDLE_TEXT = "Ningún escenario seleccionado. Los dos diagramas muestran el flujo completo.";

document.addEventListener("DOMContentLoaded", function () {
  initScenarioSimulator();
  initSummaryKeyboard();
});

function initScenarioSimulator() {
  const select = document.getElementById("escenario");
  const status = document.getElementById("resultado-escenario");
  const clearButton = document.getElementById("limpiar-escenario");
  const nodes = document.querySelectorAll("[data-scenario]");
  const flows = document.querySelectorAll(".flowchart");

  if (!select || !status || !clearButton) {
    return;
  }

  select.addEventListener("change", function () {
    applyScenario(select.value);
  });

  clearButton.addEventListener("click", function () {
    select.value = "";
    applyScenario("");
    select.focus();
  });

  function applyScenario(id) {
    const scenario = SCENARIOS[id];

    nodes.forEach(function (node) {
      const tokens = node.getAttribute("data-scenario").split(/\s+/);
      node.classList.toggle("is-active", Boolean(scenario) && tokens.indexOf(id) !== -1);
    });

    flows.forEach(function (flow) {
      flow.classList.toggle("is-filtering", Boolean(scenario));
      flow.classList.toggle("is-current-flow", Boolean(scenario) && flow.getAttribute("data-flow") === scenario.flow);
    });

    clearButton.disabled = !scenario;
    status.textContent = scenario ? scenario.text : IDLE_TEXT;

    if (!scenario) {
      return;
    }

    const figure = document.getElementById(scenario.flow === "r5" ? "figura-r5" : "figura-r6");
    if (!figure) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    figure.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start"
    });
  }
}

function initSummaryKeyboard() {
  document.querySelectorAll(".accordion").forEach(function (accordion) {
    const summaries = Array.prototype.slice.call(accordion.querySelectorAll("summary"));

    summaries.forEach(function (summary, index) {
      summary.addEventListener("keydown", function (event) {
        let target = null;

        if (event.key === "ArrowDown") {
          target = summaries[index + 1];
        } else if (event.key === "ArrowUp") {
          target = summaries[index - 1];
        } else if (event.key === "Home") {
          target = summaries[0];
        } else if (event.key === "End") {
          target = summaries[summaries.length - 1];
        }

        if (!target || target === summary) {
          return;
        }

        event.preventDefault();
        target.focus();
      });
    });
  });
}

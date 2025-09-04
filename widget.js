(function () {
  // pega a URL da app que vem no atributo do script
  const currentScript =
    document.currentScript ||
    (function () {
      const scripts = document.getElementsByTagName("script");
      return scripts[scripts.length - 1];
    })();

  const APP_URL =
    currentScript?.getAttribute("data-app-url") || "http://localhost:5173";

  let isOpen = false;
  let iframeEl = null;
  let buttonEl = null;

  // estilos básicos (botão + iframe)
  const style = document.createElement("style");
  style.textContent = `
    .bqw-btn {
      position: fixed; right: 16px; bottom: 16px; z-index: 2147483647;
      width: 56px; height: 56px; border-radius: 50%;
      background: #2563eb; color: #fff; border: none; cursor: pointer;
      box-shadow: 0 8px 20px rgba(0,0,0,.2); font-size: 22px; line-height: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .bqw-iframe {
      position: fixed; right: 16px; bottom: 84px; z-index: 2147483647;
      width: 320px; height: 600px; max-width: 90vw; max-height: 80vh;
      border: 0; border-radius: 12px; box-shadow: 0 16px 40px rgba(0,0,0,.3);
      background: transparent; overflow: hidden;
    }
    @media (max-width: 480px) {
      .bqw-iframe { width: 90vw; height: 70vh; }
    }
  `;
  document.head.appendChild(style);

  // cria o botão flutuante
  buttonEl = document.createElement("button");
  buttonEl.className = "bqw-btn";
  buttonEl.setAttribute("aria-label", "Abrir widget BonifiQ");
  buttonEl.setAttribute("tabindex", "-1"); // não deixa cursor piscar
  buttonEl.textContent = "+";
  document.body.appendChild(buttonEl);

  // abre/fecha no clique
  buttonEl.addEventListener("click", () =>
    isOpen ? closeWidget() : openWidget()
  );

  function openWidget() {
    if (iframeEl) return;
    iframeEl = document.createElement("iframe");
    iframeEl.className = "bqw-iframe";
    iframeEl.src = APP_URL; // carrega a app React
    document.body.appendChild(iframeEl);
    isOpen = true;
  }

  function closeWidget() {
    if (iframeEl && iframeEl.parentNode) {
      iframeEl.parentNode.removeChild(iframeEl);
    }
    iframeEl = null;
    isOpen = false;
  }

  // conversa entre host <-> iframe
  window.addEventListener("message", (event) => {
    const data = event.data || {};
    if (!data || typeof data !== "object") return;

    switch (data.type) {
      case "REQUEST_USER_ID":
        const id = Number(window.loggedUserId);
        event.source?.postMessage(
          {
            type: "RESPONSE_USER_ID",
            payload: { userId: Number.isFinite(id) ? id : null },
          },
          "*"
        );
        break;

      case "WIDGET_CLOSE":
        closeWidget();
        break;

      default:
        break;
    }
  });
})();

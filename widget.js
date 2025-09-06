(function () {
  // pega a URL da app que vem no atributo do script
  const currentScript =
    document.currentScript ||
    (function () {
      return document.querySelector('script[src*="widget.js"]');
    })();

  const APP_URL =
    currentScript?.getAttribute("data-app-url") || "http://localhost:5173";

  let isOpen = false;
  let iframeEl = null;
  let buttonEl = null;

  // estilos básicos (botão + iframe)
  const style = document.createElement("style");
  style.textContent = `
    .bqw-button {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #7c3aed;
      border: none;
      cursor: pointer;
      box-shadow: 0 8px 32px rgba(124, 58, 237, 0.3);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .bqw-button:hover {
      transform: translateY(-2px);
      background: #6d28d9;
    }

    .bqw-button svg {
      width: 24px;
      height: 24px;
    }

    .bqw-wrapper {
      position: fixed;
      bottom: 88px;
      right: 24px;
      width: 320px;
      height: 600px;
      border-radius: 16px;
      background: #1e1e2d;
      box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.25);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 999998;
      overflow: hidden;
      opacity: 0;
      transform: scale(0.95) translateY(16px);
      pointer-events: none;
    }

    .bqw-wrapper.is-open {
      opacity: 1;
      transform: scale(1) translateY(0);
      pointer-events: all;
    }

    .bqw-iframe {
      width: 100%;
      height: 100%;
      border: none;
      background: #1e1e2d;
    }

    .bqw-close {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: none;
      border: none;
      cursor: pointer;
      display: none; /* Escondendo o botão de fechar do widget.js */
      align-items: center;
      justify-content: center;
      color: #6B7280;
      transition: color 0.2s ease;
      z-index: 999999;
    }

    .bqw-close:hover {
      color: #9CA3AF;
    }

    .bqw-close svg {
      width: 16px;
      height: 16px;
    }
    
    /* Estilo do scrollbar */
    .bqw-wrapper ::-webkit-scrollbar {
      width: 6px;
    }

    .bqw-wrapper ::-webkit-scrollbar-track {
      background: #1e1e2d;
    }

    .bqw-wrapper ::-webkit-scrollbar-thumb {
      background: #373750;
      border-radius: 3px;
    }

    .bqw-wrapper ::-webkit-scrollbar-thumb:hover {
      background: #444463;
    }

    /* Firefox */
    .bqw-wrapper {
      scrollbar-width: thin;
      scrollbar-color: #373750 #1e1e2d;
    }

    @media (max-width: 640px) {
      .bqw-wrapper {
        bottom: 76px;
        right: 16px;
        width: calc(100vw - 32px);
        height: calc(100vh - 108px);
        max-width: 320px;
        max-height: 600px;
      }

      .bqw-button {
        bottom: 16px;
        right: 16px;
      }
    }
  `;

  document.head.appendChild(style);

  // cria o botão flutuante
  buttonEl = document.createElement("button");
  buttonEl.className = "bqw-button";
  buttonEl.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  `;

  // cria o wrapper e o botão de fechar
  function createWidget() {
    const wrapper = document.createElement("div");
    wrapper.className = "bqw-wrapper";

    const iframe = document.createElement("iframe");
    iframe.className = "bqw-iframe";
    iframe.src = APP_URL;

    const closeButton = document.createElement("button");
    closeButton.className = "bqw-close";
    closeButton.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    `;

    wrapper.appendChild(iframe);
    wrapper.appendChild(closeButton);
    document.body.appendChild(wrapper);

    closeButton.addEventListener("click", closeWidget);
    
    iframeEl = iframe;
    return wrapper;
  }

  // funções para abrir/fechar o widget
  function openWidget() {
    if (isOpen) return;
    
    const wrapper = createWidget();
    setTimeout(() => wrapper.classList.add("is-open"), 50);
    isOpen = true;
  }

  function closeWidget() {
    if (!isOpen) return;
    
    const wrapper = iframeEl.parentElement;
    wrapper.classList.remove("is-open");
    
    setTimeout(() => {
      wrapper.remove();
      iframeEl = null;
    }, 300);
    
    isOpen = false;
  }

  // adiciona o botão ao DOM e configura os eventos
  document.body.appendChild(buttonEl);
  buttonEl.addEventListener("click", () => !isOpen && openWidget());

  // comunicação com o iframe
  window.addEventListener("message", (event) => {
    if (event.data.type === "REQUEST_USER_ID") {
      event.source?.postMessage(
        {
          type: "RESPONSE_USER_ID",
          payload: { userId: window.loggedUserId }
        },
        { targetOrigin: "*" }
      );
    }

    if (event.data.type === "WIDGET_CLOSE") {
      closeWidget();
    }
  });
})();

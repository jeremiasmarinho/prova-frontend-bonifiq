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
  .bqw-overlay {
    position: fixed; inset: 0; z-index: 2147483646;
    backdrop-filter: blur(2px);
    background: rgba(2,6,23,.12);
    opacity: 0; pointer-events: none;
    transition: opacity .18s ease;
  }
  .bqw-overlay.on { opacity: 1; pointer-events: auto; }

  .bqw-btn {
    position: fixed; right: 18px; bottom: 18px; z-index: 2147483647;
    width: 56px; height: 56px; border-radius: 9999px; overflow: hidden;
    background: radial-gradient(120% 120% at 30% 20%, #3b82f6 0%, #2563eb 40%, #1d4ed8 100%);
    color: #fff; border: 0; cursor: pointer;
    display: grid; place-items: center; font-size: 22px; line-height: 0;
    box-shadow: 0 14px 28px rgba(37,99,235,.4);
    transition: transform .15s ease, box-shadow .15s ease, opacity .2s ease, filter .2s ease;
    opacity: .96;
  }
  .bqw-btn:hover { transform: translateY(-2px); box-shadow: 0 22px 44px rgba(37,99,235,.45); opacity: 1; filter: saturate(1.1); }
  .bqw-btn:active { transform: translateY(0); box-shadow: 0 10px 18px rgba(37,99,235,.35); }

  /* ripple */
  .bqw-btn::after {
    content: ""; position: absolute; inset: 0; border-radius: inherit;
    background: radial-gradient(circle at var(--x,50%) var(--y,50%), rgba(255,255,255,.45), transparent 40%);
    opacity: 0; transition: opacity .25s ease;
  }
  .bqw-btn:active::after { opacity: .6; }

  .bqw-iframe {
    position: fixed; right: 18px; bottom: 88px; z-index: 2147483647;
    width: 320px; height: 600px; max-width: 92vw; max-height: 82vh;
    border: 1px solid rgba(15,23,42,.08); border-radius: 18px;
    background: transparent; overflow: hidden;
    box-shadow:
      0 26px 56px rgba(2,6,23,.32),
      0 10px 26px rgba(2,6,23,.18);
    transform-origin: bottom right;
    animation: bqw-pop-in .18s ease-out both;
  }
  .bqw-iframe.leave { animation: bqw-pop-out .14s ease-in both; }

  @keyframes bqw-pop-in { from { opacity: 0; transform: translateY(10px) scale(.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes bqw-pop-out { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(10px) scale(.96); } }

  /* scrollbar compacta dentro do iframe (WebKit) */
  .bqw-iframe::-webkit-scrollbar { width: 10px; height: 10px; }
  .bqw-iframe::-webkit-scrollbar-thumb { background: rgba(100,116,139,.35); border-radius: 10px; }

  /* dark mode automático */
  @media (prefers-color-scheme: dark) {
    .bqw-overlay { background: rgba(0,0,0,.3); }
    .bqw-iframe { border-color: rgba(255,255,255,.08); box-shadow: 0 26px 56px rgba(0,0,0,.55), 0 10px 20px rgba(0,0,0,.35); }
  }

  @media (max-width: 480px) {
    .bqw-iframe { width: 92vw; height: 72vh; right: 4vw; bottom: 90px; }
    .bqw-btn { right: 4vw; bottom: 16px; }
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

  // overlay
  const overlayEl = document.createElement("div");
  overlayEl.className = "bqw-overlay";
  document.body.appendChild(overlayEl);

  // ripple position
  buttonEl.addEventListener("pointerdown", (e) => {
    const rect = buttonEl.getBoundingClientRect();
    buttonEl.style.setProperty("--x", `${e.clientX - rect.left}px`);
    buttonEl.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });

  // abre/fecha no clique
  buttonEl.addEventListener("click", () =>
    isOpen ? closeWidget() : openWidget()
  );

  function openWidget() {
    if (iframeEl) return;
    overlayEl.classList.add("on");

    iframeEl = document.createElement("iframe");
    iframeEl.className = "bqw-iframe";
    iframeEl.src = APP_URL;
    document.body.appendChild(iframeEl);
    isOpen = true;
  }

  function closeWidget() {
    if (!iframeEl) {
      overlayEl.classList.remove("on");
      return;
    }
    // animação de saída
    iframeEl.classList.add("leave");
    overlayEl.classList.remove("on");
    setTimeout(() => {
      iframeEl?.parentNode?.removeChild(iframeEl);
      iframeEl = null;
    }, 140);
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

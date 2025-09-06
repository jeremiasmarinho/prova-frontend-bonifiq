import { WIDGET_MESSAGES } from "../constants";

export function CloseButton() {
  const fechar = () => {
    // Certifica-se que a mensagem está sendo enviada para o pai correto
    if (window.parent !== window) {
      window.parent.postMessage({ type: WIDGET_MESSAGES.WIDGET_CLOSE }, "*");
    } else {
      console.error("Widget não está em um iframe");
    }
  };

  return (
    <button
      onClick={fechar}
      className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors p-2 -m-2"
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        className="w-5 h-5"
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
  );
}

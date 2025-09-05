import { WIDGET_MESSAGES } from "../constants";

export function CloseButton() {
  const fechar = () =>
    window.parent.postMessage({ type: WIDGET_MESSAGES.WIDGET_CLOSE }, "*");

  return (
    <button
      onClick={fechar}
      className="px-3 py-2 rounded-lg text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800
                 shadow-md hover:shadow-lg transition focus:outline-none focus:ring-2
                 focus:ring-rose-300 text-sm"
    >
      Fechar
    </button>
  );
}

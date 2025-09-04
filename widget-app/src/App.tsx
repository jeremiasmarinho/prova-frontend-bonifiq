export default function App() {
  // função que pede pro host fechar o iframe
  const fecharWidget = () => {
    window.parent.postMessage({ type: "WIDGET_CLOSE" }, "*");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-blue-600">Widget Bonifiq</h1>
      <p className="text-gray-700 mt-2">
        Aqui em breve vão aparecer os dados do usuário e os posts.
      </p>

      <button
        onClick={fecharWidget}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Fechar
      </button>
    </div>
  );
}

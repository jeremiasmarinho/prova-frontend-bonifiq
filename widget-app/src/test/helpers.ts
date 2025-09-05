export function dispatchUserId(id: number | null) {
  // Simula o host respondendo ao REQUEST_USER_ID (enviado pela App)
  window.dispatchEvent(
    new MessageEvent("message", {
      data: {
        type: "RESPONSE_USER_ID",
        payload: { userId: id },
      },
      origin: "http://localhost",
      source: window,
    })
  );
}

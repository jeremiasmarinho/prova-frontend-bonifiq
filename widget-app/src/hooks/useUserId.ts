import { useEffect, useState } from "react";

// define os formatos de mensagem que esperamos do host
type ResponseUserIdMsg = {
  type: "RESPONSE_USER_ID";
  payload: { userId: number | null };
};

// fallback genérico para qualquer outra mensagem
type OtherMsg = {
  type: string;
  [key: string]: unknown;
};

type WidgetMessage = ResponseUserIdMsg | OtherMsg;

export function useUserId() {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // pede o ID pro host (widget.js)
    window.parent.postMessage({ type: "REQUEST_USER_ID" }, "*");

    const onMessage = (event: MessageEvent<WidgetMessage>) => {
      if (event.data.type === "RESPONSE_USER_ID") {
        const id = event.data.payload.userId;
        setUserId(Number.isFinite(id) ? id : null);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return userId;
}

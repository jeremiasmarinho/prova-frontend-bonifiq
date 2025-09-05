import { useEffect, useState } from "react";
import { WIDGET_MESSAGES, type WidgetMessage } from "../constants";

export function useUserId() {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // pede o ID pro host (widget.js)
    window.parent.postMessage({ type: WIDGET_MESSAGES.REQUEST_USER_ID }, "*");

    const onMessage = (
      event: MessageEvent<
        WidgetMessage<
          typeof WIDGET_MESSAGES.RESPONSE_USER_ID,
          { userId: number | null }
        >
      >
    ) => {
      if (
        event.data.type === WIDGET_MESSAGES.RESPONSE_USER_ID &&
        event.data.payload
      ) {
        const id = event.data.payload.userId;
        setUserId(Number.isFinite(id) ? id : null);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return userId;
}

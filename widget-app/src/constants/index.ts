export const API_URL = "https://jsonplaceholder.typicode.com";

export const WIDGET_MESSAGES = {
  REQUEST_USER_ID: "REQUEST_USER_ID",
  RESPONSE_USER_ID: "RESPONSE_USER_ID",
  WIDGET_CLOSE: "WIDGET_CLOSE",
} as const;

export type WidgetMessageType =
  (typeof WIDGET_MESSAGES)[keyof typeof WIDGET_MESSAGES];

export type WidgetMessage<T extends WidgetMessageType, P = unknown> = {
  type: T;
  payload?: P;
};

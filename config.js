const config = {
  development: {
    widgetUrl: "http://localhost:5173",
  },
  production: {
    widgetUrl: `${window.location.origin}/widget`,
  },
};

window.CONFIG =
  config[
    window.location.hostname === "localhost" ? "development" : "production"
  ];

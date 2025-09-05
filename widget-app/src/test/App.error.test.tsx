import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { dispatchUserId } from "./helpers";

// como o App converte para mensagem genérica "Não foi possível carregar os dados."
vi.mock("../services/api", () => ({
  api: {
    getUser: vi.fn().mockRejectedValue(new Error("Erro de rede")),
    getUserPosts: vi.fn().mockRejectedValue(new Error("Erro de rede")),
  },
}));

describe("App (erro)", () => {
  it("exibe erro se uma das requisições falhar", async () => {
    render(<App />);
    dispatchUserId(1);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/não foi possível carregar os dados/i);
  });
});

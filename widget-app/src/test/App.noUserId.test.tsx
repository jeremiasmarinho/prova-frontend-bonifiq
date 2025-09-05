import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

// mocka o serviço para garantir que NÃO é chamado sem userId
vi.mock("../services/api", () => ({
  api: {
    getUser: vi.fn(),
    getUserPosts: vi.fn(),
  },
}));

describe("App (sem userId)", () => {
  it("não chama API e mostra instrução quando não existe userId", async () => {
    render(<App />);

    // mensagem do App quando não há userId
    const p = await screen.findByTestId("no-user");
    expect(p.textContent?.trim()).toBe(
      "Defina window.loggedUserId na página principal."
    );

    const { api } = await import("../services/api");
    expect(api.getUser).not.toHaveBeenCalled();
    expect(api.getUserPosts).not.toHaveBeenCalled();
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { dispatchUserId } from "./helpers";

vi.mock("../services/api", () => ({
  api: {
    getUser: vi.fn().mockResolvedValue({
      id: 1,
      name: "Leanne Graham",
      email: "Sincere@april.biz",
    }),
    getUserPosts: vi.fn().mockResolvedValue([
      { id: 101, userId: 1, title: "Primeiro post", body: "Conteúdo 1" },
      { id: 102, userId: 1, title: "Segundo post", body: "Conteúdo 2" },
    ]),
  },
}));

describe("App (sucesso)", () => {
  it("carrega usuário e posts ao receber userId", async () => {
    render(<App />);

    // simula o host enviando o id
    dispatchUserId(1);

    // valida dados do usuário
    expect(await screen.findByText(/Leanne Graham/i)).toBeInTheDocument();
    expect(screen.getByText(/Sincere@april\.biz/i)).toBeInTheDocument();

    // valida posts
    expect(screen.getByText(/Primeiro post/i)).toBeInTheDocument();
    expect(screen.getByText(/Conteúdo 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Segundo post/i)).toBeInTheDocument();
    expect(screen.getByText(/Conteúdo 2/i)).toBeInTheDocument();

    // opcional: garante que chamou com o id correto
    const { api } = await import("../services/api");
    await waitFor(() => {
      expect(api.getUser).toHaveBeenCalledWith(1);
      expect(api.getUserPosts).toHaveBeenCalledWith(1);
    });
  });
});

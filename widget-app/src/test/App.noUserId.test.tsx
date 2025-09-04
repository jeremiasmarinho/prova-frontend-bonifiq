// src/test/App.noUserId.test.tsx
import { render, screen } from "@testing-library/react";
import App from "../App";
import { mockParentPostMessage } from "./utils";

describe("App (sem userId)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockParentPostMessage();
  });

  test("não chama fetch e mostra instrução quando não existe userId", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<App />);

    // mais simples: valida que o <code> com o texto está presente
    expect(screen.getByText(/window\.loggedUserId/i)).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

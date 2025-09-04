import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react"; // <-- adicione
import App from "../App";
import { dispatchUserId, mockParentPostMessage, mockFetchError } from "./utils";

describe("App (erro)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockParentPostMessage();
  });

  test("exibe erro se uma das requisições falhar", async () => {
    mockFetchError();

    render(<App />);
    await act(async () => {
      dispatchUserId(99); // <-- envolve em act
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Não foi possível carregar os dados|Erro/i)
      ).toBeInTheDocument();
    });
  });
});

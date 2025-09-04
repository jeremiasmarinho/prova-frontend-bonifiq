import { render, screen } from "@testing-library/react";
import { act } from "react"; // <-- adicione
import App from "../App";
import {
  dispatchUserId,
  mockParentPostMessage,
  mockFetchSuccess,
} from "./utils";

describe("App (sucesso)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockParentPostMessage();
  });

  test("carrega usuário e posts ao receber userId", async () => {
    mockFetchSuccess(2);

    render(<App />);
    await act(async () => {
      dispatchUserId(2); // <-- envolve em act
    });

    await screen.findByText("Leanne Graham");
    expect(screen.getByText("leanne@example.com")).toBeInTheDocument();
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Body 1")).toBeInTheDocument();
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

// helper: simula host enviando o userId
function dispatchUserId(id: number | null) {
  window.dispatchEvent(
    new MessageEvent("message", {
      data: { type: "RESPONSE_USER_ID", payload: { userId: id } },
    })
  );
}

describe("App - requisições", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(window, "parent", {
      value: { postMessage: vi.fn() },
      writable: true,
    });
  });

  test("carrega usuário e posts ao receber userId", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(
      (url: RequestInfo | URL): Promise<Response> => {
        const s = String(url);
        if (s.includes("/users/2")) {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                id: 2,
                name: "Leanne Graham",
                email: "leanne@example.com",
              }),
              { status: 200 }
            )
          );
        }
        if (s.includes("/posts?userId=2")) {
          return Promise.resolve(
            new Response(
              JSON.stringify([
                { id: 1, title: "Post 1", body: "Body 1" },
                { id: 2, title: "Post 2", body: "Body 2" },
              ]),
              { status: 200 }
            )
          );
        }
        return Promise.resolve(new Response("Not found", { status: 404 }));
      }
    );

    render(<App />);
    dispatchUserId(2);

    await screen.findByText("Leanne Graham");
    expect(screen.getByText("leanne@example.com")).toBeInTheDocument();
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Body 1")).toBeInTheDocument();
  });

  test("exibe erro se fetch falhar", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("Internal error", { status: 500 })
    );

    render(<App />);
    dispatchUserId(99);

    await waitFor(() => {
      expect(
        screen.getByText(/Não foi possível carregar os dados|Erro/i)
      ).toBeInTheDocument();
    });
  });
});

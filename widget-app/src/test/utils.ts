// utils compartilhados para os testes do App
export function dispatchUserId(id: number | null) {
  window.dispatchEvent(
    new MessageEvent("message", {
      data: { type: "RESPONSE_USER_ID", payload: { userId: id } },
    })
  );
}

export function mockParentPostMessage() {
  Object.defineProperty(window, "parent", {
    value: { postMessage: vi.fn() },
    writable: true,
  });
}

export function mockFetchSuccess(userId: number) {
  return vi
    .spyOn(globalThis, "fetch")
    .mockImplementation((url: RequestInfo | URL): Promise<Response> => {
      const s = String(url);
      if (s.includes(`/users/${userId}`)) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              id: userId,
              name: "Leanne Graham",
              email: "leanne@example.com",
            }),
            { status: 200 }
          )
        );
      }
      if (s.includes(`/posts?userId=${userId}`)) {
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
    });
}

export function mockFetchError() {
  return vi
    .spyOn(globalThis, "fetch")
    .mockResolvedValue(new Response("Internal error", { status: 500 }));
}

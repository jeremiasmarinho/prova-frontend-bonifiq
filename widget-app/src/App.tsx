// src/App.tsx
import { useEffect, useState } from "react";
import { useUserId } from "./hooks/useUserId";
import type { User, Post } from "./types";
import { Loader } from "./components/Loader";
import { ErrorAlert } from "./components/ErrorAlert";
import { UserInfo } from "./components/UserInfo";
import { PostsList } from "./components/PostsList";
import { CloseButton } from "./components/CloseButton";
import { api } from "./services/api";

export default function App() {
  const userId = useUserId();

  // >>> garanta que estes nomes existem assim
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setUser(null);
      setPosts([]);
      setError(null);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        const [userData, postsData] = await Promise.all([
          api.getUser(userId),
          api.getUserPosts(userId),
        ]);

        if (cancelled) return;
        setUser(userData);
        setPosts(postsData);
        setError(null);
      } catch {
        if (cancelled) return;
        // mensagem genérica (alinha com os testes)
        setError("Não foi possível carregar os dados.");
        setUser(null);
        setPosts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return (
    <div
      className="
        w-[320px] h-[600px] max-w-full overflow-hidden
        flex flex-col
        bg-[#1e1e2d] text-white
      "
    >
      {/* Header */}
      <header className="flex-shrink-0 px-4 py-3 flex justify-between items-center border-b border-[#2a2a3b]">
        <h1 className="text-lg font-medium">Widget Bonifiq</h1>
        <CloseButton />
      </header>

      {/* Conteúdo rolável interno */}
      <main className="flex-1 min-h-0 overflow-y-auto px-4 py-2 space-y-3"
      >
        {!userId && (
          <p
            data-testid="no-user"
            className="text-sm text-slate-600 dark:text-slate-400"
          >
            Defina <code className="font-mono">window.loggedUserId</code> na
            página principal.
          </p>
        )}

        {loading && <Loader />}

        {error && <ErrorAlert message={error} />}

        {user && <UserInfo user={user} />}

        {posts.length > 0 && <PostsList posts={posts} />}
      </main>
    </div>
  );
}

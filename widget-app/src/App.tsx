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
        w-[320px] h-[596px] max-w-full overflow-hidden
        flex flex-col rounded-2xl shadow-2xl
        bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950
        text-slate-900 dark:text-slate-100
      "
    >
      {/* Header (fixo, sem consumir a altura rolável) */}
      <header
        className="
          flex-shrink-0 px-4 py-3 border-b border-slate-200/60
          bg-white/80 backdrop-blur rounded-t-2xl
          dark:border-slate-700/50 dark:bg-slate-900/70
        "
      >
        <h1 className="text-lg font-semibold text-blue-600 dark:text-blue-400 tracking-tight">
          Widget Bonifiq
        </h1>
      </header>

      {/* Conteúdo rolável interno */}
      <main
        className="
          flex-1 min-h-0 overflow-y-auto p-4 space-y-4
          [scrollbar-width:thin] [scrollbar-color:theme(colors.slate.400)_transparent]
        "
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

      {/* Footer (fixo) */}
      <footer
        className="
          flex-shrink-0 px-4 py-3 border-t border-slate-200/60
          bg-white/80 backdrop-blur rounded-b-2xl
          dark:border-slate-700/50 dark:bg-slate-900/70
        "
      >
        <div className="flex justify-end">
          <CloseButton />
        </div>
      </footer>
    </div>
  );
}

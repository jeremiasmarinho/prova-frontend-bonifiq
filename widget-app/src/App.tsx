import { useEffect, useState } from "react";
import { useUserId } from "./hooks/useUserId";
import type { User, Post } from "./types";
import { Loader } from "./components/Loader";
import { ErrorAlert } from "./components/ErrorAlert";
import { UserInfo } from "./components/UserInfo";
import { PostsList } from "./components/PostsList";
import { CloseButton } from "./components/CloseButton";

export default function App() {
  const userId = useUserId();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        setLoading(true);
        const [u, p] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
        ]);
        if (!u.ok || !p.ok)
          throw new Error("Não foi possível carregar os dados.");
        const userData = (await u.json()) as User;
        const postsData = (await p.json()) as Post[];
        setUser(userData);
        setPosts(postsData);
        setError(null);
      } catch (e) {
        setError((e as Error).message);
        setUser(null);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  return (
    <div
      className="w-[320px] h-[600px] max-w-full max-h-full
        bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950
        text-slate-900 dark:text-slate-100 flex flex-col rounded-2xl shadow-2xl"
    >
      {/* Header */}
      <header
        className="sticky top-0 z-10 px-4 py-3 border-b border-slate-200/60
                         bg-white/80 backdrop-blur rounded-t-2xl
                         dark:border-slate-700/50 dark:bg-slate-900/70"
      >
        <h1 className="text-lg font-semibold text-blue-600 dark:text-blue-400 tracking-tight">
          Widget Bonifiq
        </h1>
      </header>

      {/* Content */}
      <main
        className="flex-1 overflow-y-auto p-4 space-y-4
                       [scrollbar-width:thin] [scrollbar-color:theme(colors.slate.400)_transparent]"
      >
        {!userId && (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Defina <code className="font-mono">window.loggedUserId</code> na
            página principal.
          </p>
        )}

        {loading && <Loader />}

        {error && <ErrorAlert message={error} />}

        {user && <UserInfo user={user} />}

        {posts.length > 0 && <PostsList posts={posts} />}
      </main>

      {/* Footer */}
      <footer
        className="px-4 py-3 border-t border-slate-200/60 bg-white/80 backdrop-blur rounded-b-2xl
                         dark:border-slate-700/50 dark:bg-slate-900/70"
      >
        <div className="flex justify-end">
          <CloseButton />
        </div>
      </footer>
    </div>
  );
}

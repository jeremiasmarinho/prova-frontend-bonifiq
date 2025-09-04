import type { Post } from "../types";

export function PostsList({ posts }: { posts: Post[] }) {
  return (
    <section
      className="p-3 rounded-xl border bg-white shadow-sm transition hover:shadow-md
                        dark:bg-slate-900/60 dark:border-slate-700/50"
    >
      <h3 className="text-sm font-semibold mb-2">Posts</h3>
      <ul className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {posts.map((post) => (
          <li
            key={post.id}
            className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/60 dark:border-slate-700/50
                       transition hover:translate-y-0.5 hover:shadow-sm active:scale-[.995]"
          >
            <strong className="block text-sm">{post.title}</strong>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              {post.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

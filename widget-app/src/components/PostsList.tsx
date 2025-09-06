import type { Post } from "../types";

export function PostsList({ posts }: { posts: Post[] }) {
  return (
    <section
      role="region"
      aria-label="Posts"
      className="flex-1 overflow-hidden"
    >
      <h3 className="text-sm font-medium mb-3">Posts</h3>
      <ul className="space-y-3 overflow-y-auto h-[calc(100vh-220px)] md:h-[460px] pr-2 [scrollbar-width:thin] [scrollbar-color:theme(colors.slate.600)_transparent] hover:[scrollbar-color:theme(colors.slate.500)_transparent]">
        {posts.map((post) => (
          <li
            key={post.id}
            className="p-3 rounded-lg bg-[#2a2a3b] hover:bg-[#2f2f42] transition-colors"
          >
            <strong className="block text-sm mb-1">{post.title}</strong>
            <p className="text-sm text-gray-400 leading-relaxed">
              {post.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

import type { User } from "../types";

export function UserInfo({ user }: { user: User }) {
  return (
    <section
      role="region"
      aria-label="Informações do usuário"
      className="p-3 rounded-xl border bg-white shadow-sm transition hover:shadow-md
                        dark:bg-slate-900/60 dark:border-slate-700/50"
    >
      <h2 className="text-base font-semibold">{user.name}</h2>
      <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
    </section>
  );
}

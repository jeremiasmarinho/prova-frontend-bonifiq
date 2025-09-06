import type { User } from "../types";

export function UserInfo({ user }: { user: User }) {
  return (
    <section
      role="region"
      aria-label="Informações do usuário"
      className="pb-2"
    >
      <h2 className="text-base font-medium mb-1">{user.name}</h2>
      <p className="text-sm text-gray-400">{user.email}</p>
    </section>
  );
}

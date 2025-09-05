import type { User, Post } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com";

export const api = {
  async getUser(userId: number): Promise<User> {
    const response = await fetch(`${API_URL}/users/${userId}`);
    if (!response.ok)
      throw new Error(`Erro ao carregar usuário: ${response.statusText}`);
    return response.json();
  },

  async getUserPosts(userId: number): Promise<Post[]> {
    const response = await fetch(`${API_URL}/posts?userId=${userId}`);
    if (!response.ok)
      throw new Error(`Erro ao carregar posts: ${response.statusText}`);
    return response.json();
  },
};

import api from "../../../services/api";
import { Post } from "../../../types/Post";

export const postsService = {
  getAllPosts: async (): Promise<Post[]> => {
    const response = await api.get<Post[]>("/posts");
    return response.data;
  },

  getPostById: async (id: number): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
  },
};

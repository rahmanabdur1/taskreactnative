import { useFetch } from "../../../hooks/useFetch";
import { Post } from "../../../types/Post";
import { postsService } from "../services/postsService";

export const usePosts = () => {
  const { data, isLoading, error, refetch } = useFetch<Post[]>(
    postsService.getAllPosts,
  );

  return {
    posts: data || [],
    isLoading,
    error,
    refetch,
  };
};

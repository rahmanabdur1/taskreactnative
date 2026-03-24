import { useCallback } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { useCommentsStore } from "../../../store/commentsStore";
import { useLikesStore } from "../../../store/likesStore";
import { Post } from "../../../types/Post";
import { postsService } from "../services/postsService";

export const usePostDetail = (postId: number) => {
  const fetchPost = useCallback(
    () => postsService.getPostById(postId),
    [postId],
  );

  const { data: post, isLoading, error } = useFetch<Post>(fetchPost);

  const { isLiked, toggleLike } = useLikesStore();
  const { getComments, addComment } = useCommentsStore();

  return {
    post,
    isLoading,
    error,
    liked: isLiked(postId),
    toggleLike: () => toggleLike(postId),
    comments: getComments(postId),
    addComment: (text: string) => addComment(postId, text),
  };
};

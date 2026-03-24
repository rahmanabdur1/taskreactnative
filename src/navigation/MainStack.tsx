import React, { useState } from "react";
import { PostDetailScreen } from "../features/posts/screens/PostDetailScreen";
import { PostListScreen } from "../features/posts/screens/PostListScreen";
import { Post } from "../types/Post";

export const MainStack: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  if (selectedPost) {
    return (
      <PostDetailScreen
        postId={selectedPost.id}
        onBack={() => setSelectedPost(null)}
      />
    );
  }

  return <PostListScreen onPostPress={(post) => setSelectedPost(post)} />;
};

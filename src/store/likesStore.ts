import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface LikesState {
  likedPostIds: number[];
  toggleLike: (postId: number) => void;
  isLiked: (postId: number) => boolean;
  loadLikes: () => Promise<void>;
}

export const useLikesStore = create<LikesState>((set, get) => ({
  likedPostIds: [],

  toggleLike: async (postId) => {
    const current = get().likedPostIds;
    const isAlreadyLiked = current.includes(postId);
    const updated = isAlreadyLiked
      ? current.filter((id) => id !== postId)
      : [...current, postId];

    set({ likedPostIds: updated });
    await AsyncStorage.setItem("liked_posts", JSON.stringify(updated));
  },

  isLiked: (postId) => get().likedPostIds.includes(postId),

  loadLikes: async () => {
    const stored = await AsyncStorage.getItem("liked_posts");
    if (stored) {
      set({ likedPostIds: JSON.parse(stored) });
    }
  },
}));

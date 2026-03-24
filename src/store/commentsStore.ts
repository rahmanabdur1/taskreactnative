import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { Comment } from "../types/Post";

interface CommentsState {
  comments: Record<number, Comment[]>;
  addComment: (postId: number, text: string) => Promise<void>;
  getComments: (postId: number) => Comment[];
  loadComments: () => Promise<void>;
}

export const useCommentsStore = create<CommentsState>((set, get) => ({
  comments: {},

  addComment: async (postId, text) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      text,
      createdAt: new Date().toISOString(),
    };

    const current = get().comments;
    const postComments = current[postId] || [];
    const updated = {
      ...current,
      [postId]: [newComment, ...postComments],
    };

    set({ comments: updated });
    await AsyncStorage.setItem("comments", JSON.stringify(updated));
  },

  getComments: (postId) => get().comments[postId] || [],

  loadComments: async () => {
    const stored = await AsyncStorage.getItem("comments");
    if (stored) {
      set({ comments: JSON.parse(stored) });
    }
  },
}));

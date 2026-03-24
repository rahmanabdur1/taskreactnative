export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: string;
  postId: number;
  text: string;
  createdAt: string;
}

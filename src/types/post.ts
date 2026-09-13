// Sent by client
export interface CreatePostDto {
  title: string;
  content: string;
}

// Model existing in DB
export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

// Zod genera un tipo para TypeScript
export type CreatePostInput = z.infer<typeof createPostSchema>;

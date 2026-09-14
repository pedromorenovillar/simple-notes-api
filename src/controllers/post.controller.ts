import { Request, Response } from "express";
import { createPostSchema } from "../schemas/post.schema.js";
import { z } from "zod";
import { getAllPosts } from "../services/postService.js";

export const createPost = (req: Request, res: Response): void => {
  // Zod valida los datos del cliente basándose en el esquema
  const result = createPostSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      errors: z.treeifyError(result.error),
    });
    return;
  }

  // TypeScript sabe que aquí los datos son válidos
  const post = result.data;

  res.status(201).json({
    message: "Post created",
    post,
  });
};

export async function getPosts(req: Request, res: Response) {
  const posts = await getAllPosts();
  if (posts.length === 0) {
    res.status(200).json({
      message: "No posts available",
    });
  } else {
    res.status(200).json(posts);
  }
}

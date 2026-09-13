import { Request, Response } from "express";
import { createPostSchema } from "../schemas/post.schema";
import { z } from "zod";

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

export const getPosts = (req: Request, res: Response): void => {
  res.status(200).json({
    message: "Get posts endpoint",
  });
};

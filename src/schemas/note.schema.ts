import { number, z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

export const createIdSchema = z.object({
  id: z.coerce.number(),
});

// Zod genera un tipo para TypeScript
export type CreateNoteInput = z.infer<typeof createNoteSchema>;

export type CreateIdInput = z.infer<typeof createIdSchema>;

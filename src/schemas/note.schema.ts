import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

// Zod genera un tipo para TypeScript
export type CreateNoteInput = z.infer<typeof createNoteSchema>;

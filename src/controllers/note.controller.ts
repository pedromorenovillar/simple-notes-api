import { Request, Response } from "express";
import { createNoteSchema } from "../schemas/note.schema.js";
import { z } from "zod";
import { getAllNotes } from "../services/noteService.js";

export const createNote = (req: Request, res: Response): void => {
  // Zod valida los datos del cliente basándose en el esquema
  const result = createNoteSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      errors: z.treeifyError(result.error),
    });
    return;
  }

  // TypeScript sabe que aquí los datos son válidos
  const note = result.data;

  res.status(201).json({
    message: "Note created",
    note,
  });
};

export async function getNotes(req: Request, res: Response) {
  const notes = await getAllNotes();
  if (notes.length === 0) {
    res.status(200).json({
      message: "No notes available",
    });
  } else {
    res.status(200).json(notes);
  }
}

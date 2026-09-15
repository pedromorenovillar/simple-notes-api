import { Request, Response } from "express";
import { createNoteSchema } from "../schemas/note.schema.js";
import { z } from "zod";
import {
  findNoteById,
  getAllNotes,
  insertNote,
} from "../services/noteService.js";
import { prisma } from "../lib/prisma.js";

export async function createNote(req: Request, res: Response) {
  // Zod validates data from client using the schema
  const result = createNoteSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      errors: z.treeifyError(result.error),
    });
    return;
  }

  // TypeScript knows here that the data are valid
  const note = result.data;

  const createdNote = await insertNote(note);

  res.status(201).json({
    message: "Note created",
    createdNote,
  });
}

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

export async function getNoteById(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const foundNote = await findNoteById(Number(id));
  if (!foundNote) {
    res.status(404).json({ message: "No note found with that id" });
  } else {
    res.json(foundNote);
  }
}

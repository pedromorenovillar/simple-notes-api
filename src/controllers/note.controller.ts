import { Request, Response, NextFunction } from "express";
import { createIdSchema, createNoteSchema } from "../schemas/note.schema.js";
import { z } from "zod";
import {
  findNoteById,
  getAllNotes,
  insertNote,
  updateNote,
  deleteNote,
} from "../services/noteService.js";
import { NotFoundError } from "../errors/NotFoundError.js";

export async function createNote(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
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
  } catch (error) {
    next(error);
  }
}

export async function getNotes(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const notes = await getAllNotes();
    if (notes.length === 0) {
      res.status(200).json({
        message: "No notes available",
      });
    } else {
      res.status(200).json(notes);
    }
  } catch (error) {
    next(error);
  }
}

export async function getNoteById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = createIdSchema.safeParse(req.params);

    if (!result.success) {
      res.status(400).json({
        errors: z.treeifyError(result.error),
      });
      return;
    }
    const foundNote = await findNoteById(result.data.id);
    if (!foundNote) {
      throw new NotFoundError("Note not found");
    }
    res.json(foundNote);
  } catch (error) {
    next(error);
  }
}

export async function updateNoteById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = createNoteSchema.safeParse(req.body);
    const idResult = createIdSchema.safeParse(req.params);

    if (!result.success) {
      res.status(400).json({
        errors: z.treeifyError(result.error),
      });
      return;
    }
    if (!idResult.success) {
      res.status(400).json({
        errors: z.treeifyError(idResult.error),
      });
      return;
    }
    const foundNote = await findNoteById(idResult.data.id);
    if (!foundNote) {
      throw new NotFoundError("Note not found");
    }
    const note = result.data;
    const updatedNote = await updateNote(
      idResult.data.id,
      note.title,
      note.content,
    );

    res.status(200).json({
      message: "Note updated",
      updatedNote,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteNoteById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = createIdSchema.safeParse(req.params);

    if (!result.success) {
      res.status(400).json({
        errors: z.treeifyError(result.error),
      });
      return;
    }

    const foundNote = await findNoteById(result.data.id);
    if (!foundNote) {
      throw new NotFoundError("Note not found");
    }
    const deletedNote = await deleteNote(foundNote.id);
    res.status(200).json({
      message: "Note deleted",
      deletedNote,
    });
  } catch (error) {
    next(error);
  }
}

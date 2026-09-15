import { Router } from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
} from "../controllers/note.controller.js";

const router = Router();

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNoteById);
router.delete("/:id", deleteNoteById);

export default router;

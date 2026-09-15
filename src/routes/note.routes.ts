import { Router } from "express";
import {
  createNote,
  getNotes,
  getNoteById,
} from "../controllers/note.controller.js";

const router = Router();

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);

export default router;

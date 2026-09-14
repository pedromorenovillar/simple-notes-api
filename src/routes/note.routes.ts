import { Router } from "express";
import { createNote, getNotes } from "../controllers/note.controller.js";

const router = Router();

router.get("/", getNotes);
router.post("/", createNote);

export default router;

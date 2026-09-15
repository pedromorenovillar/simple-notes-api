import { prisma } from "../lib/prisma";
import { CreateNoteDto } from "../types/note";

export async function getAllNotes() {
  return await prisma.note.findMany();
}

export async function insertNote(note: CreateNoteDto) {
  return prisma.note.create({
    data: {
      title: note.title,
      content: note.content,
    },
  });
}

export async function findNoteById(id: number) {
  return await prisma.note.findUnique({ where: { id } });
}

import { prisma } from "../lib/prisma";

export async function getAllNotes() {
  return await prisma.note.findMany();
}

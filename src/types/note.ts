// Sent by client
export interface CreateNoteDto {
  title: string;
  content: string;
}

// Model existing in DB
export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

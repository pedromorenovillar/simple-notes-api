import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../app";

describe("GET /notes/:id", () => {
  it("returns 404 when the note does not exist", async () => {
    const response = await request(app).get("/notes/99999");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Note not found",
    });
  });
});

import express, { Request, Response } from "express";
import healthRouter from "./routes/health.routes.js";
import noteRouter from "./routes/note.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/health", healthRouter);
app.use("/notes", noteRouter);

// Root
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API running with TypeScript" });
});

app.use(errorMiddleware);

export default app;

import express, { Request, Response } from "express";
import healthRouter from "./routes/health.routes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use("/health", healthRouter);

// Root
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API running with TypeScript" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

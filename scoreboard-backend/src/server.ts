import http from "node:http";

import cors from "cors";
import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";
import { ZodError } from "zod";

import { env } from "./config/env.js";
import { createMatchRouter } from "./routes/matchRoutes.js";
import { MatchStateService } from "./services/matchStateService.js";
import { registerSocketHandlers } from "./socket/registerSocketHandlers.js";

export async function createServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const corsOptions = env.allowAllOrigins
    ? { origin: true, credentials: false }
    : { origin: env.frontendOrigins, credentials: true };

  const matchStateService = new MatchStateService(env.stateFilePath);
  await matchStateService.initialize();

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
  });

  const io = new Server(httpServer, {
    cors: corsOptions,
  });

  app.use(
    "/api/match",
    createMatchRouter(matchStateService, {
      onStateChanged: (nextState) => {
        io.emit("match:state", nextState);
      },
    })
  );

  app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: "Validation error", issues: error.issues });
    }
    return res.status(500).json({ message: "Internal server error" });
  });

  registerSocketHandlers(io, matchStateService);

  setInterval(() => {
    const nextState = matchStateService.incrementClock(1);
    io.emit("match:state", nextState);
  }, 1000);

  return { httpServer };
}

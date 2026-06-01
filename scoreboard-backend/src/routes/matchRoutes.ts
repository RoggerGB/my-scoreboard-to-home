import { Router } from "express";
import { ZodError } from "zod";

import { matchStateSchema, matchStatePatchSchema } from "../schemas/matchSchemas.js";
import { type MatchState } from "../types/match.js";
import { type MatchStateService } from "../services/matchStateService.js";

interface MatchRouterOptions {
  onStateChanged?: (nextState: MatchState) => void;
}

export function createMatchRouter(matchService: MatchStateService, options: MatchRouterOptions = {}) {
  const router = Router();

  router.get("/state", (_req, res) => {
    res.json(matchService.getState());
  });

  router.put("/state", async (req, res) => {
    try {
      const fullState = matchStateSchema.parse(req.body);
      const nextState = await matchService.setState(fullState);
      options.onStateChanged?.(nextState);
      res.json(nextState);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid payload", issues: error.issues });
      }
      return res.status(500).json({ message: "Could not update state" });
    }
  });

  router.patch("/state", async (req, res) => {
    try {
      const patch = matchStatePatchSchema.parse(req.body);
      const nextState = await matchService.patchState(patch);
      options.onStateChanged?.(nextState);
      res.json(nextState);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid payload", issues: error.issues });
      }
      return res.status(500).json({ message: "Could not patch state" });
    }
  });

  router.post("/reset", async (_req, res) => {
    try {
      const reset = await matchService.reset();
      options.onStateChanged?.(reset);
      res.json(reset);
    } catch {
      res.status(500).json({ message: "Could not reset state" });
    }
  });

  return router;
}

import { Server, type Socket } from "socket.io";
import { ZodError } from "zod";

import { matchStatePatchSchema, matchStateSchema } from "../schemas/matchSchemas.js";
import { type MatchStateService } from "../services/matchStateService.js";

function emitCurrentState(io: Server, stateService: MatchStateService) {
  io.emit("match:state", stateService.getState());
}

export function registerSocketHandlers(io: Server, stateService: MatchStateService) {
  io.on("connection", (socket: Socket) => {
    socket.emit("match:state", stateService.getState());

    socket.on("match:get", () => {
      socket.emit("match:state", stateService.getState());
    });

    socket.on("match:set", async (payload, ack) => {
      try {
        const nextState = await stateService.setState(matchStateSchema.parse(payload));
        emitCurrentState(io, stateService);
        ack?.({ ok: true, state: nextState });
      } catch (error) {
        if (error instanceof ZodError) {
          ack?.({ ok: false, message: "Invalid payload", issues: error.issues });
          return;
        }
        ack?.({ ok: false, message: "Could not set match state" });
      }
    });

    socket.on("match:patch", async (payload, ack) => {
      try {
        const patch = matchStatePatchSchema.parse(payload);
        const nextState = await stateService.patchState(patch);
        emitCurrentState(io, stateService);
        ack?.({ ok: true, state: nextState });
      } catch (error) {
        if (error instanceof ZodError) {
          ack?.({ ok: false, message: "Invalid payload", issues: error.issues });
          return;
        }
        ack?.({ ok: false, message: "Could not patch match state" });
      }
    });

    socket.on("match:reset", async (_payload, ack) => {
      try {
        const resetState = await stateService.reset();
        emitCurrentState(io, stateService);
        ack?.({ ok: true, state: resetState });
      } catch {
        ack?.({ ok: false, message: "Could not reset match state" });
      }
    });
  });
}

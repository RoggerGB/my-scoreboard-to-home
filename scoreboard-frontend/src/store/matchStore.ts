import { create } from "zustand";

import { socket } from "../services/socket";
import type { MatchState } from "../types/match";

interface MatchStore extends MatchState {
  setMatch: (data: Partial<MatchState>) => void;
  initRealtime: () => void;
}

let initialized = false;

export const useMatchStore = create<MatchStore>((set) => ({
  localName: "EQUIPO A",
  awayName: "EQUIPO B",

  localScore: 0,
  awayScore: 0,

  period: 1,

  timeSeconds: 0,
  startTime: "21:00",

  setMatch: (data) => {
    socket.emit("match:patch", data);

    set((state) => ({
      ...state,
      ...data,
    }));
  },

  initRealtime: () => {
    if (initialized) {
      return;
    }

    initialized = true;

    socket.on("match:state", (state: MatchState) => {
      set((prev) => ({
        ...prev,
        ...state,
      }));
    });

    socket.connect();
    socket.emit("match:get");
  },
}));
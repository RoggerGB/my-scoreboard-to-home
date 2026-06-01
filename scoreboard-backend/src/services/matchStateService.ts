import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { matchStatePatchSchema, matchStateSchema } from "../schemas/matchSchemas.js";
import { defaultMatchState, type MatchState } from "../types/match.js";

export class MatchStateService {
  private state: MatchState = defaultMatchState;

  constructor(private readonly filePath: string) {}

  async initialize() {
    try {
      const content = await readFile(this.filePath, "utf-8");
      const parsed = JSON.parse(content);
      this.state = matchStateSchema.parse(parsed);
    } catch {
      this.state = defaultMatchState;
      await this.persist();
    }
  }

  getState() {
    return this.state;
  }

  async setState(nextState: MatchState) {
    this.state = matchStateSchema.parse(nextState);
    await this.persist();
    return this.state;
  }

  async patchState(patch: Partial<MatchState>) {
    const validPatch = matchStatePatchSchema.parse(patch);
    this.state = matchStateSchema.parse({ ...this.state, ...validPatch });
    await this.persist();
    return this.state;
  }

  async reset() {
    this.state = defaultMatchState;
    await this.persist();
    return this.state;
  }

  incrementClock(stepSeconds = 1) {
    this.state = {
      ...this.state,
      timeSeconds: this.state.timeSeconds + Math.max(0, Math.floor(stepSeconds)),
    };

    return this.state;
  }

  private async persist() {
    await mkdir(path.dirname(this.filePath), { recursive: true });
    await writeFile(this.filePath, `${JSON.stringify(this.state, null, 2)}\n`, "utf-8");
  }
}

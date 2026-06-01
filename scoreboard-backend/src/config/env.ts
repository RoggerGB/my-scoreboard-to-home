import path from "node:path";
import { config } from "dotenv";

config();

const rawOrigins = process.env.FRONTEND_ORIGIN ?? "http://localhost:5173";
const frontendOrigins = rawOrigins.split(",").map((value) => value.trim()).filter(Boolean);
const allowAllOrigins = frontendOrigins.includes("*");

export const env = {
  port: Number(process.env.PORT ?? 4000),
  frontendOrigins,
  allowAllOrigins,
  stateFilePath: path.resolve(process.cwd(), process.env.STATE_FILE ?? "./data/match-state.json"),
};

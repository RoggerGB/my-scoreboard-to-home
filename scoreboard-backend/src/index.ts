import { env } from "./config/env.js";
import { createServer } from "./server.js";

async function start() {
  const { httpServer } = await createServer();

  httpServer.listen(env.port, () => {
    console.log(`Scoreboard backend running on http://localhost:${env.port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start backend", error);
  process.exit(1);
});

import { createLogger } from "./logger-utils.js";
import { run } from "./cli.js";
import { TestnetRemoteConfig } from "./config.js";
// import { currentDir } from "./config.js";
// import { DockerComposeEnvironment, Wait } from "testcontainers";
// import path from "node:path";

const config = new TestnetRemoteConfig();
// DockerComposeEnvironment setup for potential future use
// const dockerEnv = new DockerComposeEnvironment(
//   path.resolve(currentDir, ".."),
//   "proof-server-testnet.yml",
// ).withWaitStrategy(
//   "proof-server",
//   Wait.forLogMessage("Actix runtime found; starting in Actix runtime", 1),
// );
const logger = await createLogger(config.logDir);
await run(config, logger);

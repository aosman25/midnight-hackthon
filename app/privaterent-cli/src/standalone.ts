import { createLogger } from "./logger-utils.js";
import { run } from "./cli.js";
import { StandaloneConfig } from "./config.js";

const config = new StandaloneConfig();
const logger = await createLogger(config.logDir);
await run(config, logger);

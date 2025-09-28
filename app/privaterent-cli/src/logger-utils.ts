import * as path from "node:path";
import * as fs from "node:fs/promises";
import pinoPretty from "pino-pretty";
import pino from "pino";
import { createWriteStream } from "node:fs";

export const createLogger = async (logPath: string): Promise<pino.Logger> => {
  try {
    await fs.mkdir(path.dirname(logPath), { recursive: true });
  } catch (error) {
    console.warn(`Warning: Could not create log directory: ${error}`);
  }
  
  const pretty: pinoPretty.PrettyStream = pinoPretty({
    colorize: true,
    sync: true,
  });
  const level =
    process.env.DEBUG_LEVEL !== undefined &&
    process.env.DEBUG_LEVEL !== null &&
    process.env.DEBUG_LEVEL !== ""
      ? process.env.DEBUG_LEVEL
      : "info";
      
  // Create write stream with error handling
  let logStream;
  try {
    logStream = createWriteStream(logPath);
    logStream.on('error', (error) => {
      console.warn(`Warning: Log file write error: ${error}`);
    });
  } catch (error) {
    console.warn(`Warning: Could not create log file: ${error}`);
    // Fall back to console-only logging
    return pino(
      {
        level,
        depthLimit: 20,
      },
      pretty,
    );
  }
  
  return pino(
    {
      level,
      depthLimit: 20,
    },
    pino.multistream([
      { stream: pretty, level },
      { stream: logStream, level },
    ]),
  );
};

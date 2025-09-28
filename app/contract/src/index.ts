import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Export the runtime module
export const PrivateRent = require("./build/contract/index.cjs") as any;

// Re-export all witness functions and types
export * from "./witnesses.js";

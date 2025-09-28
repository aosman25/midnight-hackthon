import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  setNetworkId,
  NetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

export interface Config {
  logDir: string;
  indexer: string;
  indexerWS: string;
  node: string;
  proofServer: string;
}

export class TestnetRemoteConfig implements Config {
  logDir = path.resolve(
    currentDir,
    "..",
    "logs",
    "testnet-remote",
    `${new Date().toISOString()}.log`,
  );
  indexer = "https://indexer.testnet-02.midnight.network/api/v1/graphql";
  indexerWS = "wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws";
  node = "https://rpc.testnet-02.midnight.network";
  proofServer = "http://127.0.0.1:6300";

  constructor() {
    setNetworkId(NetworkId.TestNet);
  }
}

export class TestnetLocalConfig implements Config {
  logDir = path.resolve(
    currentDir,
    "..",
    "logs",
    "testnet-local",
    `${new Date().toISOString()}.log`,
  );
  indexer = "http://127.0.0.1:4000/api/v1/graphql";
  indexerWS = "ws://127.0.0.1:4000/api/v1/graphql/ws";
  node = "http://127.0.0.1:3333";
  proofServer = "http://127.0.0.1:6300";

  constructor() {
    setNetworkId(NetworkId.TestNet);
  }
}

export class StandaloneConfig implements Config {
  logDir = path.resolve(
    currentDir,
    "..",
    "logs",
    "standalone",
    `${new Date().toISOString()}.log`,
  );
  indexer = "http://127.0.0.1:8001/api/v1/graphql";
  indexerWS = "ws://127.0.0.1:8001/api/v1/graphql/ws";
  node = "http://127.0.0.1:3000";
  proofServer = "http://127.0.0.1:6300";

  constructor() {
    setNetworkId(NetworkId.TestNet);
  }
}

export const contractConfig = {
  privateStateStoreName: "privaterent-private-state",
  zkConfigPath: path.resolve(
    currentDir,
    "..",
    "..",
    "contract",
    "src",
    "managed",
    "privaterent",
  ),
};

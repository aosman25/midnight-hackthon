import { type PrivateRentPrivateState } from "@midnight-ntwrk/privaterent-contract";
import type {
  ImpureCircuitId,
  MidnightProviders,
} from "@midnight-ntwrk/midnight-js-types";
import type {
  DeployedContract,
  FoundContract,
} from "@midnight-ntwrk/midnight-js-contracts";

export type PrivateRentCircuits = ImpureCircuitId<any>;

export const PrivateRentPrivateStateId = "privateRentPrivateState";

export type PrivateRentProviders = MidnightProviders<
  PrivateRentCircuits,
  typeof PrivateRentPrivateStateId,
  PrivateRentPrivateState
>;

export type PrivateRentContract = any;

export type DeployedPrivateRentContract =
  | DeployedContract<PrivateRentContract>
  | FoundContract<PrivateRentContract>;

// Re-export the private state type for convenience
export type { PrivateRentPrivateState };

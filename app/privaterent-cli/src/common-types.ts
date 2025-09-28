import {
  PrivateRent,
  type PrivateRentPrivateState,
} from "@midnight-ntwrk/privaterent-contract";
import type {
  ImpureCircuitId,
  MidnightProviders,
} from "@midnight-ntwrk/midnight-js-types";
import type {
  DeployedContract,
  FoundContract,
} from "@midnight-ntwrk/midnight-js-contracts";

export type PrivateRentCircuits = ImpureCircuitId<
  PrivateRent.Contract<PrivateRentPrivateState>
>;

export const PrivateRentPrivateStateId = "privateRentPrivateState";

export type PrivateRentProviders = MidnightProviders<
  PrivateRentCircuits,
  typeof PrivateRentPrivateStateId,
  PrivateRentPrivateState
>;

export type PrivateRentContract = PrivateRent.Contract<PrivateRentPrivateState>;

export type DeployedPrivateRentContract =
  | DeployedContract<PrivateRentContract>
  | FoundContract<PrivateRentContract>;

// Re-export the private state type for convenience
export type { PrivateRentPrivateState };

import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
  getTenantIncome(context: __compactRuntime.WitnessContext<Ledger, T>): [T, bigint];
  getTenantCredit(context: __compactRuntime.WitnessContext<Ledger, T>): [T, bigint];
  getTenantContactInfo(context: __compactRuntime.WitnessContext<Ledger, T>): [T, string];
  getSecretKey(context: __compactRuntime.WitnessContext<Ledger, T>): [T, Uint8Array];
}

export type ImpureCircuits<T> = {
  createListing(context: __compactRuntime.CircuitContext<T>,
                rent_0: bigint,
                minIncome_0: bigint,
                minCredit_0: bigint): __compactRuntime.CircuitResults<T, bigint>;
  applyToListing(context: __compactRuntime.CircuitContext<T>,
                 listingId_0: bigint): __compactRuntime.CircuitResults<T, []>;
  acceptApplicant(context: __compactRuntime.CircuitContext<T>,
                  listingId_0: bigint,
                  tenantPk_0: Uint8Array): __compactRuntime.CircuitResults<T, string>;
  proveQualification(context: __compactRuntime.CircuitContext<T>,
                     listingId_0: bigint): __compactRuntime.CircuitResults<T, boolean>;
  getListingDetails(context: __compactRuntime.CircuitContext<T>,
                    listingId_0: bigint): __compactRuntime.CircuitResults<T, { landlord: Uint8Array,
                                                                               rent: bigint,
                                                                               minIncome: bigint,
                                                                               minCredit: bigint,
                                                                               isActive: boolean
                                                                             }>;
  hasApplied(context: __compactRuntime.CircuitContext<T>, listingId_0: bigint): __compactRuntime.CircuitResults<T, boolean>;
  getApplicationStatus(context: __compactRuntime.CircuitContext<T>,
                       listingId_0: bigint): __compactRuntime.CircuitResults<T, number>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  createListing(context: __compactRuntime.CircuitContext<T>,
                rent_0: bigint,
                minIncome_0: bigint,
                minCredit_0: bigint): __compactRuntime.CircuitResults<T, bigint>;
  applyToListing(context: __compactRuntime.CircuitContext<T>,
                 listingId_0: bigint): __compactRuntime.CircuitResults<T, []>;
  acceptApplicant(context: __compactRuntime.CircuitContext<T>,
                  listingId_0: bigint,
                  tenantPk_0: Uint8Array): __compactRuntime.CircuitResults<T, string>;
  proveQualification(context: __compactRuntime.CircuitContext<T>,
                     listingId_0: bigint): __compactRuntime.CircuitResults<T, boolean>;
  getListingDetails(context: __compactRuntime.CircuitContext<T>,
                    listingId_0: bigint): __compactRuntime.CircuitResults<T, { landlord: Uint8Array,
                                                                               rent: bigint,
                                                                               minIncome: bigint,
                                                                               minCredit: bigint,
                                                                               isActive: boolean
                                                                             }>;
  hasApplied(context: __compactRuntime.CircuitContext<T>, listingId_0: bigint): __compactRuntime.CircuitResults<T, boolean>;
  getApplicationStatus(context: __compactRuntime.CircuitContext<T>,
                       listingId_0: bigint): __compactRuntime.CircuitResults<T, number>;
}

export type Ledger = {
  listings: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): { landlord: Uint8Array,
                             rent: bigint,
                             minIncome: bigint,
                             minCredit: bigint,
                             isActive: boolean
                           };
    [Symbol.iterator](): Iterator<[bigint, { landlord: Uint8Array,
  rent: bigint,
  minIncome: bigint,
  minCredit: bigint,
  isActive: boolean
}]>
  };
  applicants: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): {
      isEmpty(): boolean;
      size(): bigint;
      member(key_1: Uint8Array): boolean;
      lookup(key_1: Uint8Array): { tenant: Uint8Array,
                                   status: number,
                                   applicationTime: bigint
                                 };
      [Symbol.iterator](): Iterator<[Uint8Array, { tenant: Uint8Array, status: number, applicationTime: bigint }]>
    }
  };
  readonly nextListingId: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;

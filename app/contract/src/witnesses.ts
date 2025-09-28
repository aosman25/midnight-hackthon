// Private state for PrivateRent - contains tenant's sensitive data
export type PrivateRentPrivateState = {
  // Tenant's private financial information
  income: bigint;
  creditScore: bigint;
  contactInfo: string;
  // Private key for generating public key
  secretKey: Uint8Array;
};

// Witness functions that provide private data to circuits
export const witnesses = {
  // Witness function to get tenant's income (kept private)
  getTenantIncome: (context: any): [PrivateRentPrivateState, bigint] => {
    const privateState = context.privateState;
    return [privateState, privateState.income];
  },

  // Witness function to get tenant's credit score (kept private)
  getTenantCredit: (context: any): [PrivateRentPrivateState, bigint] => {
    const privateState = context.privateState;
    return [privateState, privateState.creditScore];
  },

  // Witness function to get tenant's contact information (revealed only after acceptance)
  getTenantContactInfo: (context: any): [PrivateRentPrivateState, string] => {
    const privateState = context.privateState;
    return [privateState, privateState.contactInfo];
  },

  // Witness function to get the secret key for public key generation
  getSecretKey: (context: any): [PrivateRentPrivateState, Uint8Array] => {
    const privateState = context.privateState;
    return [privateState, privateState.secretKey];
  }
};

// Helper function to create initial private state for a tenant
export const createTenantPrivateState = (
  income: bigint,
  creditScore: bigint,
  contactInfo: string,
  secretKey?: Uint8Array
): PrivateRentPrivateState => {
  // Generate random secret key if not provided
  const generateSecretKey = (): Uint8Array => {
    const key = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
      key[i] = Math.floor(Math.random() * 256);
    }
    return key;
  };

  return {
    income,
    creditScore,
    contactInfo,
    secretKey: secretKey || generateSecretKey()
  };
};

// Helper function to validate private state
export const validatePrivateState = (
  privateState: PrivateRentPrivateState
): boolean => {
  return (
    privateState.income >= 0n &&
    privateState.creditScore >= 0n &&
    privateState.contactInfo.length > 0 &&
    privateState.secretKey.length === 32
  );
};

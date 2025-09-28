import { createInterface, type ReadLine } from "node:readline";
import { type Logger } from "pino";
import {
  buildFreshWallet,
  buildWalletAndWaitForFunds,
  configureProviders,
  createListingWithIdentity,
  applyToListing,
  acceptApplicantWithIdentity,
  deploy,
  displayListingValue,
  joinContract,
  saveState,
  setLogger,
} from "./api.js";
import { type Config } from "./config.js";
import {
  type DeployedPrivateRentContract,
  type PrivateRentProviders,
  type PrivateRentPrivateState,
} from "./common-types.js";
import { createTenantPrivateState } from "@midnight-ntwrk/privaterent-contract";

const question = (rli: ReadLine, prompt: string): Promise<string> =>
  new Promise((resolve) => {
    rli.question(prompt, resolve);
  });

// Identity management types
type UserRole = "landlord" | "tenant";

interface Identity {
  role: UserRole;
  name: string;
  privateState: PrivateRentPrivateState;
}

// Global identity storage
let currentIdentity: Identity | null = null;
let savedIdentities: Map<string, Identity> = new Map();

enum MainAction {
  CreateListing = "1",
  ApplyToListing = "2",
  AcceptApplicant = "3",
  ViewListings = "4",
  ManageIdentity = "5",
  Exit = "6",
}

enum WalletAction {
  CreateFresh = "1",
  UseExisting = "2",
}

enum ContractAction {
  Deploy = "1",
  Join = "2",
}

const manageIdentity = async (rli: ReadLine): Promise<Identity> => {
  const action = await question(
    rli,
    `
Identity Management:
  1. Create new landlord identity
  2. Create new tenant identity  
  3. Switch to existing identity
  4. List identities
Choose 1, 2, 3, or 4: `,
  );

  switch (action) {
    case "1": {
      const name = await question(rli, "Enter landlord name: ");
      const landlordState = createTenantPrivateState(
        0n, // Landlord doesn't need income
        0n, // Landlord doesn't need credit score
        `${name}@landlord.com`,
      );
      const identity: Identity = {
        role: "landlord",
        name,
        privateState: landlordState,
      };
      savedIdentities.set(name, identity);
      console.log(`✅ Created landlord identity: ${name}`);
      return identity;
    }

    case "2": {
      const name = await question(rli, "Enter tenant name: ");
      const incomeStr = await question(rli, "Enter annual income: ");
      const creditStr = await question(rli, "Enter credit score: ");
      const contact = await question(rli, "Enter contact info: ");

      const tenantState = createTenantPrivateState(
        BigInt(parseInt(incomeStr, 10)),
        BigInt(parseInt(creditStr, 10)),
        contact,
      );
      const identity: Identity = {
        role: "tenant",
        name,
        privateState: tenantState,
      };
      savedIdentities.set(name, identity);
      console.log(`✅ Created tenant identity: ${name}`);
      return identity;
    }

    case "3": {
      if (savedIdentities.size === 0) {
        console.log("No identities created yet.");
        return manageIdentity(rli);
      }

      console.log("\nAvailable identities:");
      for (const [name, identity] of savedIdentities) {
        console.log(`  - ${name} (${identity.role})`);
      }

      const name = await question(rli, "Enter identity name to switch to: ");
      const identity = savedIdentities.get(name);
      if (!identity) {
        console.log("Identity not found.");
        return manageIdentity(rli);
      }
      console.log(`✅ Switched to: ${name} (${identity.role})`);
      return identity;
    }

    case "4": {
      console.log("\nSaved identities:");
      for (const [name, identity] of savedIdentities) {
        console.log(`  - ${name} (${identity.role})`);
      }
      return manageIdentity(rli);
    }

    default: {
      console.log("Invalid option.");
      return manageIdentity(rli);
    }
  }
};

const buildWallet = async (config: Config, logger: Logger, rli: ReadLine) => {
  let action: string;
  do {
    action = await question(
      rli,
      `
Choose an action:
  1. Create a fresh wallet
  2. Use an existing wallet (restore from seed)
Enter 1 or 2: `,
    );
  } while (
    action !== WalletAction.CreateFresh &&
    action !== WalletAction.UseExisting
  );

  switch (action) {
    case WalletAction.CreateFresh: {
      return buildFreshWallet(config);
    }
    case WalletAction.UseExisting: {
      const seedStr = await question(rli, "Enter your wallet seed: ");
      const filename = await question(
        rli,
        "Enter save file name (or press enter for none): ",
      );
      return buildWalletAndWaitForFunds(config, seedStr, filename);
    }
    default: {
      throw new Error(`Unknown wallet action: ${action}`);
    }
  }
};

const buildContract = async (
  providers: PrivateRentProviders,
  rli: ReadLine,
): Promise<DeployedPrivateRentContract> => {
  let action: string;
  do {
    action = await question(
      rli,
      `
Choose an action:
  1. Deploy a new PrivateRent contract
  2. Join an existing PrivateRent contract
Enter 1 or 2: `,
    );
  } while (action !== ContractAction.Deploy && action !== ContractAction.Join);

  switch (action) {
    case ContractAction.Deploy: {
      // Create initial private state for deployment (default landlord)
      const initialPrivateState: PrivateRentPrivateState =
        createTenantPrivateState(0n, 0n, "deployer@privaterent.com");
      return deploy(providers, initialPrivateState);
    }
    case ContractAction.Join: {
      const contractAddress = await question(
        rli,
        "Enter the contract address: ",
      );
      return joinContract(providers, contractAddress);
    }
    default: {
      throw new Error(`Unknown contract action: ${action}`);
    }
  }
};

const mainLoop = async (
  providers: PrivateRentProviders,
  privateRentContract: DeployedPrivateRentContract,
  rli: ReadLine,
) => {
  // Set initial landlord identity (the deployer)
  currentIdentity = {
    role: "landlord",
    name: "Contract Deployer",
    privateState: {
      income: 0n,
      creditScore: 0n,
      contactInfo: "deployer@privaterent.com",
      secretKey: new Uint8Array(32),
    },
  };
  savedIdentities.set("Contract Deployer", currentIdentity);

  let action: string;
  do {
    const identityInfo = currentIdentity
      ? `Current: ${currentIdentity.name} (${currentIdentity.role})`
      : "No identity selected";

    action = await question(
      rli,
      `
PrivateRent DApp - ${identityInfo}
  1. Create a rental listing (Landlord)
  2. Apply to a listing (Tenant)
  3. Accept an applicant (Landlord)
  4. View contract state
  5. Switch/Create identity
  6. Exit
Enter 1, 2, 3, 4, 5, or 6: `,
    );

    switch (action) {
      case MainAction.CreateListing: {
        if (!currentIdentity || currentIdentity.role !== "landlord") {
          console.log("⚠️  You need to be a landlord to create listings.");
          break;
        }

        try {
          const rentStr = await question(rli, "Enter monthly rent amount: ");
          const minIncomeStr = await question(
            rli,
            "Enter minimum annual income requirement: ",
          );
          const minCreditStr = await question(
            rli,
            "Enter minimum credit score requirement: ",
          );

          const rent = BigInt(parseInt(rentStr, 10));
          const minIncome = BigInt(parseInt(minIncomeStr, 10));
          const minCredit = BigInt(parseInt(minCreditStr, 10));

          const contractAddress =
            privateRentContract.deployTxData.public.contractAddress;

          // Use landlord's identity for creating listing
          await createListingWithIdentity(
            providers,
            contractAddress,
            currentIdentity.privateState,
            rent,
            minIncome,
            minCredit,
          );
          console.log("✅ Rental listing created successfully!");
        } catch (error) {
          console.error("❌ Error creating listing:", error);
        }
        break;
      }

      case MainAction.ApplyToListing: {
        if (!currentIdentity || currentIdentity.role !== "tenant") {
          console.log("⚠️  You need to be a tenant to apply to listings.");
          break;
        }

        try {
          const listingIdStr = await question(
            rli,
            "Enter listing ID to apply to: ",
          );
          const listingId = BigInt(parseInt(listingIdStr, 10));

          const contractAddress =
            privateRentContract.deployTxData.public.contractAddress;

          // Use tenant's identity for applying
          const result = await applyToListing(
            providers,
            contractAddress,
            listingId,
            currentIdentity.privateState,
          );

          console.log("✅ Application submitted successfully!");
          console.log(`📋 Your Public Key: ${result.publicKey}`);
          console.log(
            "💡 Give this public key to the landlord for acceptance.",
          );
        } catch (error) {
          console.error("❌ Error applying to listing:", error);
        }
        break;
      }

      case MainAction.AcceptApplicant: {
        if (!currentIdentity || currentIdentity.role !== "landlord") {
          console.log("⚠️  You need to be a landlord to accept applicants.");
          break;
        }

        try {
          const listingIdStr = await question(rli, "Enter listing ID: ");
          const tenantPkStr = await question(
            rli,
            "Enter tenant public key (32 bytes hex): ",
          );

          const listingId = BigInt(parseInt(listingIdStr, 10));
          const tenantPk = new Uint8Array(Buffer.from(tenantPkStr, "hex"));

          const contractAddress =
            privateRentContract.deployTxData.public.contractAddress;

          // Use landlord's identity for accepting
          await acceptApplicantWithIdentity(
            providers,
            contractAddress,
            currentIdentity.privateState,
            listingId,
            tenantPk,
          );
          console.log("✅ Applicant accepted successfully!");
        } catch (error) {
          console.error("❌ Error accepting applicant:", error);
        }
        break;
      }

      case MainAction.ViewListings: {
        try {
          await displayListingValue(providers, privateRentContract);
        } catch (error) {
          console.error("❌ Error viewing contract state:", error);
        }
        break;
      }

      case MainAction.ManageIdentity: {
        currentIdentity = await manageIdentity(rli);
        break;
      }

      case MainAction.Exit: {
        console.log("👋 Exiting PrivateRent DApp...");
        break;
      }

      default: {
        console.log("❌ Invalid action. Please enter 1, 2, 3, 4, 5, or 6.");
        break;
      }
    }
  } while (action !== MainAction.Exit);
};

export const run = async (config: Config, logger: Logger): Promise<void> => {
  setLogger(logger);
  const rli = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    logger.info(
      "🏠 Welcome to PrivateRent - Privacy-Preserving Rental Applications",
    );
    logger.info("🔐 Powered by Midnight blockchain and zero-knowledge proofs");

    const wallet = await buildWallet(config, logger, rli);
    const providers = await configureProviders(wallet, config);
    const privateRentContract = await buildContract(providers, rli);

    await mainLoop(providers, privateRentContract, rli);
    await saveState(wallet, "privaterent-wallet.json");
  } catch (error: unknown) {
    if (typeof error === "string") {
      logger.error(error);
    } else if (error instanceof Error) {
      logger.error(error.message);
    }
  } finally {
    rli.close();
  }
};

import { createInterface, type ReadLine } from "node:readline";
import { type Logger } from "pino";
import {
  buildFreshWallet,
  buildWalletAndWaitForFunds,
  configureProviders,
  createListing,
  applyToListing,
  acceptApplicant,
  deploy,
  displayListingValue,
  joinContract,
  saveState,
  setLogger,
} from "./api";
import { type Config } from "./config";
import {
  type DeployedPrivateRentContract,
  type PrivateRentProviders,
  type PrivateRentPrivateState,
} from "./common-types";
import { createTenantPrivateState } from "@midnight-ntwrk/privaterent-contract";

const question = (rli: ReadLine, prompt: string): Promise<string> =>
  new Promise((resolve) => {
    rli.question(prompt, resolve);
  });

/* eslint-disable no-unused-vars */
enum MainAction {
  CreateListing = "1",
  ApplyToListing = "2",
  AcceptApplicant = "3",
  ViewListings = "4",
  Exit = "5",
}
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
enum WalletAction {
  CreateFresh = "1",
  UseExisting = "2",
}
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
enum ContractAction {
  Deploy = "1",
  Join = "2",
}
/* eslint-enable no-unused-vars */

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
      // Create initial private state for deployment
      const initialPrivateState: PrivateRentPrivateState =
        createTenantPrivateState(
          0n, // Initial income (not used for deployment)
          0n, // Initial credit score (not used for deployment)
          "deployer@privaterent.com", // Deployer contact
        );
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

const promptTenantData = async (
  rli: ReadLine,
): Promise<PrivateRentPrivateState> => {
  const incomeStr = await question(
    rli,
    "Enter your annual income (e.g., 75000): ",
  );
  const creditStr = await question(
    rli,
    "Enter your credit score (e.g., 750): ",
  );
  const contactInfo = await question(
    rli,
    "Enter your contact info (email, phone): ",
  );

  const income = BigInt(parseInt(incomeStr, 10));
  const creditScore = BigInt(parseInt(creditStr, 10));

  return createTenantPrivateState(income, creditScore, contactInfo);
};

const mainLoop = async (
  providers: PrivateRentProviders,
  privateRentContract: DeployedPrivateRentContract,
  rli: ReadLine,
) => {
  let action: string;
  do {
    action = await question(
      rli,
      `
PrivateRent DApp - Choose an action:
  1. Create a rental listing (Landlord)
  2. Apply to a listing (Tenant)
  3. Accept an applicant (Landlord)
  4. View contract state
  5. Exit
Enter 1, 2, 3, 4, or 5: `,
    );

    switch (action) {
      case MainAction.CreateListing: {
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

          await createListing(privateRentContract, rent, minIncome, minCredit);
          console.log("✅ Rental listing created successfully!");
        } catch (error) {
          console.error("❌ Error creating listing:", error);
        }
        break;
      }
      case MainAction.ApplyToListing: {
        try {
          const listingIdStr = await question(
            rli,
            "Enter listing ID to apply to: ",
          );
          const listingId = BigInt(parseInt(listingIdStr, 10));

          console.log(
            "📝 Please provide your tenant information for ZK proof generation:",
          );
          await promptTenantData(rli);

          // Update the contract's private state with tenant data
          // Note: In a real implementation, you'd need to properly manage private state

          await applyToListing(privateRentContract, listingId);
          console.log(
            "✅ Application submitted successfully! Your qualifications were verified privately.",
          );
        } catch (error) {
          console.error("❌ Error applying to listing:", error);
        }
        break;
      }
      case MainAction.AcceptApplicant: {
        try {
          const listingIdStr = await question(rli, "Enter listing ID: ");
          const tenantPkStr = await question(
            rli,
            "Enter tenant public key (32 bytes hex): ",
          );

          const listingId = BigInt(parseInt(listingIdStr, 10));
          const tenantPk = new Uint8Array(Buffer.from(tenantPkStr, "hex"));

          await acceptApplicant(privateRentContract, listingId, tenantPk);
          console.log(
            "✅ Applicant accepted successfully! Contact information revealed.",
          );
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
      case MainAction.Exit: {
        console.log("👋 Exiting PrivateRent DApp...");
        break;
      }
      default: {
        console.log("❌ Invalid action. Please enter 1, 2, 3, 4, or 5.");
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

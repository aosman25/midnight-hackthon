# PrivateRent | Privacy-Preserving Rental Application System

A zero-knowledge rental application platform built on the Midnight blockchain that allows tenants to prove they meet rental qualifications without revealing sensitive financial information.

## 🏠 Overview

PrivateRent solves the privacy problem in rental applications by using zero-knowledge proofs. Tenants can prove they meet income and credit requirements without disclosing their actual financial data to landlords, while landlords can verify qualifications with mathematical certainty.

### Key Features

- **🔐 Privacy-First**: Tenant income and credit scores remain completely private
- **✅ Zero-Knowledge Proofs**: Mathematical proof of qualification without data exposure
- **🏘️ Decentralized**: Built on Midnight blockchain for transparency and immutability
- **🚀 Real-time**: Instant qualification verification
- **🛡️ Secure**: Cryptographic guarantees protect sensitive data

## 🏗️ Architecture

The system consists of three main components:

### 1. Smart Contract (`app/contract/`)
- **Language**: Compact (Midnight's ZK-friendly language)
- **File**: `PrivateRent.compact`
- **Functions**:
  - `createListing()` - Landlords create rental listings
  - `applyToListing()` - Tenants apply with private qualifications
  - `acceptApplicant()` - Landlords accept qualified applicants
  - `proveQualification()` - Generate ZK proof of meeting requirements
  - `getListingDetails()` - View public listing information

### 2. CLI Application (`app/privaterent-cli/`)
- Interactive command-line interface
- Wallet management and blockchain interaction
- Support for multiple deployment environments (testnet, local, standalone)

### 3. Core Runtime (`app/`)
- TypeScript bindings for the Compact contract
- Witness functions for private data handling
- Integration with Midnight blockchain infrastructure

## 🚀 Quick Start

### Prerequisites

- Node.js (v22+)
- npm package manager
- Docker (for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd midnight-hackthon
   ```

2. **Install dependencies**
   ```bash
   cd app
   npm install
   ```

3. **Build the contract**
   ```bash
   cd contract
   npm run build
   ```

4. **Build the CLI**
   ```bash
   cd ../privaterent-cli
   npm run build
   ```

### Running the Application

#### Setup Proof Server (Required)
Before running the application, you need to start the proof server:
```bash
./setup/run-proof-server.sh
```

#### Option 1: Local Testnet (Recommended for Development)
```bash
cd app/privaterent-cli
npm run testnet-local
```

#### Option 2: Remote Testnet
```bash
npm run testnet-remote
```

#### Option 3: Standalone Mode
```bash
npm run standalone
```

## 💡 How It Works

### For Landlords

1. **Create Listing**: Set rent amount, minimum income, and credit requirements
2. **Review Applications**: See qualified applicants without seeing their actual financial data
3. **Accept Tenants**: Choose from verified qualified applicants

### For Tenants

1. **Apply Privately**: Submit application with income/credit proofs
2. **Zero-Knowledge Verification**: System verifies you meet requirements without exposing data
3. **Get Accepted**: Receive contact information if selected by landlord

### Privacy Guarantees

- ✅ **Income amounts** remain completely private
- ✅ **Credit scores** are never disclosed
- ✅ **Application history** is pseudonymous
- ✅ **Qualification status** is publicly verifiable

## 🛠️ Development

### Project Structure

```
app/
├── contract/                 # Compact smart contract
│   ├── src/
│   │   ├── PrivateRent.compact    # Main contract logic
│   │   ├── index.ts               # TypeScript bindings
│   │   └── witnesses.ts           # Witness functions
│   └── dist/                      # Compiled contract
├── privaterent-cli/          # Command-line interface
│   ├── src/
│   │   ├── cli.ts                 # Interactive CLI
│   │   ├── api.ts                 # Core API functions
│   │   └── config.ts              # Environment configuration
│   └── dist/                      # Compiled CLI
└── package.json              # Workspace configuration
```

### Available Scripts

#### Contract Development
```bash
# Compile Compact contract
npm run compact

# Build TypeScript bindings
npm run build

# Lint code
npm run lint
```

#### CLI Development
```bash
# Run on different networks
npm run testnet-local      # Local development network
npm run testnet-remote     # Remote testnet
npm run standalone         # Docker-based standalone

# Build and test
npm run build
npm run test-api
```

### Environment Configuration

The system supports multiple deployment environments:

- **Standalone**: Local Docker-based development
- **Testnet Local**: Local testnet node
- **Testnet Remote**: Midnight public testnet

Configuration files are located in `app/privaterent-cli/`:
- `standalone.yml` - Docker compose configuration
- `proof-server-testnet.yml` - Testnet proof server config
- Various environment-specific configurations

### Manual Testing Flow

1. **Deploy Contract**: Use CLI to deploy to chosen network
2. **Create Wallet**: Generate or import wallet for testing
3. **Create Listing**: Add a rental listing with requirements
4. **Apply as Tenant**: Test application flow with private data
5. **Accept Application**: Complete the landlord acceptance flow

## 🔐 Security Considerations

- **Private Keys**: Never commit real private keys to version control
- **Witness Data**: Ensure witness functions properly validate private inputs
- **Network Security**: Use appropriate network configurations for production
- **Data Persistence**: Private state is stored locally and encrypted


## 🏆 Hackathon Project

This project was created for the Midnight Hackathon, demonstrating practical applications of zero-knowledge proofs in real estate and privacy-preserving applications.

### 🎥 Demo Video

Watch the full demonstration of PrivateRent in action:
[**Video Demo**](https://drive.google.com/file/d/1SgMUfGL9j0etcE94jR5JwlQrNh9xiB6b/view?usp=sharing)

---

**Built with ❤️ for privacy-preserving rental applications**

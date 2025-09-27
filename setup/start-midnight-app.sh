#!/bin/bash
set -e

# Get the current directory name
CURRENT_DIR=$(basename "$PWD")

# If we're inside 'setup', step back one level
if [ "$CURRENT_DIR" = "setup" ]; then
  cd ..
fi

# Create the midnight-app folder if it doesn't exist
mkdir -p midnight-app
cd midnight-app

# Initialize Node project
npm init -y

# Install Midnight packages
npm i @midnight-ntwrk/compact-runtime \
      @midnight-ntwrk/wallet-api \
      @midnight-ntwrk/midnight-js-http-client-proof-provider \
      @midnight-ntwrk/midnight-js-contracts

echo "Midnight app created in: $(pwd)"

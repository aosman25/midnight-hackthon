#!/bin/bash
set -euo pipefail

# Create tools folder
mkdir -p ~/midnight-tools/compactc
cd ~/midnight-tools/compactc

# Download Compact compiler v0.24.0 for Linux (x86_64, musl build)
curl -L -o compactc_v0.24.0_x86_64-unknown-linux-musl.zip \
  https://github.com/midnightntwrk/compact/releases/download/compactc-v0.24.0/compactc_v0.24.0_x86_64-unknown-linux-musl.zip

# Unzip
unzip -o compactc_v0.24.0_x86_64-unknown-linux-musl.zip

# Copy all components into ~/.local/bin
mkdir -p ~/.local/bin
cp compactc compactc.bin zkir ~/.local/bin/

# Ensure ~/.local/bin is in PATH
if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
  export PATH="$HOME/.local/bin:$PATH"
fi

# Optional: symlink 'compact' -> 'compactc' for compatibility
if [ ! -f "$HOME/.local/bin/compact" ]; then
  ln -s "$HOME/.local/bin/compactc" "$HOME/.local/bin/compact"
fi

# Verify install
echo "Compactc version:"
~/.local/bin/compactc --version

echo "zkir version:"
~/.local/bin/zkir --version

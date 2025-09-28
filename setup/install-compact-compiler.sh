#!/bin/bash
set -euo pipefail

# Create tools folder
mkdir -p ~/midnight-tools/compactc
cd ~/midnight-tools/compactc

# Download and install Compact compiler
curl --proto '=https' --tlsv1.2 -LsSf \
  https://github.com/midnightntwrk/compact/releases/download/compact-v0.2.0/compact-installer.sh | sh

# Ensure ~/.local/bin is in PATH
if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
  export PATH="$HOME/.local/bin:$PATH"
fi

# Optional: symlink compact -> compactc for compatibility
if [ ! -f "$HOME/.local/bin/compactc" ]; then
  ln -s "$HOME/.local/bin/compact" "$HOME/.local/bin/compactc"
fi

# Verify install
echo "Compact compiler version:"
compact --version

echo "Compactc symlink version:"
compactc --version

echo "GLIBC version:"
ldd --version
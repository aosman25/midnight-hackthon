# pull the image
docker pull midnightnetwork/proof-server:latest

# run it in the background on port 6300
docker run -p 6300:6300 midnightnetwork/proof-server -- 'midnight-proof-server --network testnet'

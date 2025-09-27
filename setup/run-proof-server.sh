# pull the image
docker pull midnightnetwork/proof-server

# run it in the background on port 6300
docker run -d --restart unless-stopped --name midnight-proof \
  -p 6300:6300 midnightnetwork/proof-server

# verify it’s healthy
docker logs --tail=50 -f midnight-proof

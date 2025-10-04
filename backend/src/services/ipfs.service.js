const { create } = require('ipfs-http-client');
const { IPFS_PROJECT_ID, IPFS_PROJECT_SECRET } = require('../config');

let client = null;

function getIpfsClient(){
  if(client) return client;

  if(IPFS_PROJECT_ID && IPFS_PROJECT_SECRET){
    // Using Infura (or other provider) with basic auth
    const auth = 'Basic ' + Buffer.from(IPFS_PROJECT_ID + ':' + IPFS_PROJECT_SECRET).toString('base64');
    client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: { authorization: auth }});
  } else {
    // connects to local IPFS daemon (default)
    client = create(); // will use default multiaddr /dns/localhost/tcp/5001/http
  }
  return client;
}

async function addBuffer(buffer){
  const ipfs = getIpfsClient();
  const result = await ipfs.add(buffer);
  return result.cid.toString();
}

async function catJSON(cid){
  const ipfs = getIpfsClient();
  const stream = ipfs.cat(cid);
  let data = '';
  for await (const chunk of stream) data += chunk.toString();
  return JSON.parse(data);
}

module.exports = { addBuffer, catJSON };

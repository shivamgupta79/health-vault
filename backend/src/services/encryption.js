const crypto = require('crypto');
const ALGO = 'aes-256-gcm';

function genRandomKeyHex(){
  // 32 bytes for AES-256
  return crypto.randomBytes(32).toString('hex');
}

function encryptBuffer(buffer, keyHex){
  const key = Buffer.from(keyHex, 'hex');
  const iv = crypto.randomBytes(12); 
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    cipherText: encrypted.toString('base64'),
    iv: iv.toString('hex'),
    tag: tag.toString('hex')
  };
}

function decryptBuffer(cipherTextB64, keyHex, ivHex, tagHex){
  const key = Buffer.from(keyHex,'hex');
  const iv = Buffer.from(ivHex,'hex');
  const tag = Buffer.from(tagHex,'hex');
  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(tag);
  const buff = Buffer.concat([decipher.update(Buffer.from(cipherTextB64,'base64')), decipher.final()]);
  return buff; // Buffer of plaintext
}

module.exports = { genRandomKeyHex, encryptBuffer, decryptBuffer };

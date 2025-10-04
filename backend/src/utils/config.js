require('dotenv').config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/healthvault',
  JWT_SECRET: process.env.JWT_SECRET || 'dev_jwt_secret',
  IPFS_PROJECT_ID: process.env.IPFS_PROJECT_ID || '',
  IPFS_PROJECT_SECRET: process.env.IPFS_PROJECT_SECRET || '',
  PORT: process.env.PORT || 4000
};

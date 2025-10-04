const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cid: { type: String, required: true },       // IPFS CID pointing to encrypted payload
  metadata: { type: Object },                  // e.g., originalName, type, tags
  encryptedKey: { type: String },              // DEMO only: store data key (replace in prod)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Record', RecordSchema);

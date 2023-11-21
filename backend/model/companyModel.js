const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  legalNumber: {
    type: String,
    required: true,
    unique: true
  },
  incorporationCountry: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);

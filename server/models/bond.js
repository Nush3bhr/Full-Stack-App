const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const BondSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  partner: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Bond = mongoose.model("bonds", BondSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  images: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model("Product",productSchema)
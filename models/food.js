const { Schema, model } = require("mongoose");

const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  alergenics: {
    type: [String],
    required: true,
  },
}, { collection: "comidinhas" });

const Food = model("Comidinha", foodSchema);

module.exports = Food;

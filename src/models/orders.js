const { Schema, model } = require("mongoose");
/* const { User } = require("../models/users"); */

const Order = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    type: Object,
    default: {},
  },
});

module.exports = model("Orders", Order);

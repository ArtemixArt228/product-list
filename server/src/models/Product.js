const mongoose = require("mongoose");

const { CommentSchema } = require("./Comment");

const ProductSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  size: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  weight: {
    type: String,
    required: true,
  },
  comments: { type: [CommentSchema] },
});

module.exports = mongoose.model("Product", ProductSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name for the product"],
    maxlength: [120, "Product name shuld not be more than 120 characters"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "price is mandatory"],
    maxlenght: [6, "Product price should not be more than 6"],
  },
  descriptions: {
    type: String,
    required: [true, "descriptions is required"],
  },
  photos: [
    {
      id: {
        type: String,
        required: [true, "id is required"],
      },
      secur_url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [
      true,
      "please select category from short-sleeves, long-sleeves, sweat-shirts",
    ],
    enum: {
      values: ["shortsleeves", "longsleeves", "sweatshirt", "hoodies"],
      message:
        "please select category ONLY from - short-sleeves, long-sleeves, sweat-shirts and hoodies ",
    },
  },
  brand: {
    type: String,
    required: [true, "please provide a brand"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);

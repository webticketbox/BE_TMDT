const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    image: {
      type: String,
    },

    name: {
      type: String,
    },

    email: {
      type: String,
    },

    password: {
      type: String,
      require: true,
    },

    phone: {
      type: String,
      require: true,
    },

    // 0:Female 1:Male
    sex: {
      type: Number,
      default: 1,
    },

    // 0: user 1: admin
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
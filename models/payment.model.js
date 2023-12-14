const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        price: {
            type: String,
        },
        number: {
            type: String,
        },
        amount: {
            type: String,
        },
        event: { type: mongoose.Schema.Types.ObjectId, ref: "event" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("payment", paymentSchema);
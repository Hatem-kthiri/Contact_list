const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phone: {
        type: Number,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
});

module.exports = mongoose.model("contact", contactSchema);

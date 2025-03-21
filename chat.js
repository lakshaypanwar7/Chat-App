const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type:  String,
        required: true,
    },
    msg: {
        type: String,
        max: 50,
    },
    created_at: {
        type: Date,
    },
});

const Chat = mongoose.model("chat",chatSchema);
module.exports = Chat;
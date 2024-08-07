const mongoose = require('mongoose');

const chatScheme = new mongoose.Schema(
    {
    members: Array
    },
    {
        timestamps:true
    }
)

const chatModel = mongoose.model("Chat",chatScheme);
module.exports = chatModel
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema ({

    email: {
        type: String,
        unique: true,
        required: true
    },
    initialAmount: {
        type: Number,
        required: true
    },
    availableBalance: {
        type: Number,
        required:true
    }

})

const User = mongoose.model("User", UserSchema);

module.exports = User;
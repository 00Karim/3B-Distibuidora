const mongoose = require("mongoose");
const roleType = require("../enums/RoleType")

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String, enum: Object.values(roleType), required: true},
    creationDate: {type: Date, default: Date.now}
})

module.exports = new mongoose.model("User", userSchema);
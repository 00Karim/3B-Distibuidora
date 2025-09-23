const mongoose = require("mongoose");
const roleType = require("../enums/RoleType")

const userSchema = new mongoose.Schema({
    email: {type: string, require: true},
    password: {type: string, require: true},
    name: {type: string, require: true},
    role: {type: String, enum: Object.values(roleType) ,require: true},
    creationDate: {type: Date, default: Date.now}
})

module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//const Items = require("../item.model")
const User = require("../user.model")
const StatusType = require("../enums/StatusType")
const DeliveryType = require("../enums/DeliveryType")
const PackagingType = require("../packagingtype.model")

const orderSchema = new Schema({
    items: [Items],
    user: {type: User, require: true},
    assignedEmployees: [User],
    total: {type: Number, require: true},
    status: {type: StatusType, default: StatusType.REVISION, require: true},
    date: {type: Date, requier: true},
    delivery: {type: DeliveryType, default: DeliveryType.STORE_PICK_UP, require: true},
    client: {type: Client, require: true},
    remarks: {type: String},
    packaging: [PackagingType]
})

module.exports = mongoose.model("Order", orderSchema)
